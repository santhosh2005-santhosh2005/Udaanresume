import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { DownloadSimpleIcon, FileIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useFormBlocker } from "@/hooks/use-form-blocker";
import { useAIStore } from "@/integrations/ai/store";
import { JSONResumeImporter } from "@/integrations/import/json-resume";
import { ReactiveResumeJSONImporter } from "@/integrations/import/reactive-resume-json";
import { ReactiveResumeV4JSONImporter } from "@/integrations/import/reactive-resume-v4-json";
import { client, orpc } from "@/integrations/orpc/client";
import type { ResumeData } from "@/schema/resume/data";
import { defaultResumeData } from "@/schema/resume/data";
import { cn } from "@/utils/style";
import { type DialogProps, useDialogStore } from "../store";

const extractTextFromPdf = async (file: File): Promise<string> => {
	// Dynamic import to avoid SSR issues with pdfjs-dist (uses browser-only APIs like DOMMatrix)
	const pdfjs = await import("pdfjs-dist");
	pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
	let text = "";
	for (let i = 1; i <= pdf.numPages; i++) {
		const page = await pdf.getPage(i);
		const content = await page.getTextContent();
		const pageText = content.items.map((item: any) => item.str).join(" ");
		text += pageText + "\n\n";
	}
	return text;
};

const extractTextFromDocx = async (file: File): Promise<string> => {
	// Dynamic import to avoid SSR issues with mammoth
	const mammoth = await import("mammoth");
	const arrayBuffer = await file.arrayBuffer();
	const result = await mammoth.extractRawText({ arrayBuffer });
	return result.value;
};

// Helper function to convert ArrayBuffer to base64 without stack overflow for large files
const arrayBufferToBase64 = (buffer: ArrayBuffer): Promise<string> => {
	return new Promise((resolve, reject) => {
		const chunks: Uint8Array[] = [];
		const chunkSize = 8192;
		const uint8Array = new Uint8Array(buffer);
		
		let i = 0;
		while (i < uint8Array.length) {
			chunks.push(uint8Array.slice(i, i + chunkSize));
			i += chunkSize;
		}
		
		// Use FileReader to convert to base64
		const blob = new Blob(chunks);
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			// Remove the data URL prefix if present
			const base64 = result.includes(",") ? result.split(",")[1] : result;
			resolve(base64);
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};

const formSchema = z.discriminatedUnion("type", [
	z.object({ type: z.literal("") }),
	z.object({
		type: z.literal("pdf"),
		file: z.instanceof(File).refine((file) => file.type === "application/pdf", { message: "File must be a PDF" }),
	}),
	z.object({
		type: z.literal("pdf-text"),
		file: z.instanceof(File).refine((file) => file.type === "application/pdf", { message: "File must be a PDF" }),
	}),
	z.object({
		type: z.literal("docx"),
		file: z
			.instanceof(File)
			.refine(
				(file) =>
					file.type === "application/msword" ||
					file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				{ message: "File must be a Microsoft Word document" },
			),
	}),
	z.object({
		type: z.literal("docx-text"),
		file: z
			.instanceof(File)
			.refine(
				(file) =>
					file.type === "application/msword" ||
					file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				{ message: "File must be a Microsoft Word document" },
			),
	}),
	z.object({
		type: z.literal("reactive-resume-json"),
		file: z
			.instanceof(File)
			.refine((file) => file.type === "application/json", { message: "File must be a JSON file" }),
	}),
	z.object({
		type: z.literal("reactive-resume-v4-json"),
		file: z
			.instanceof(File)
			.refine((file) => file.type === "application/json", { message: "File must be a JSON file" }),
	}),
	z.object({
		type: z.literal("json-resume-json"),
		file: z
			.instanceof(File)
			.refine((file) => file.type === "application/json", { message: "File must be a JSON file" }),
	}),
]);

type FormValues = z.infer<typeof formSchema>;

export function ImportResumeDialog(_: DialogProps<"resume.import">) {
	const { enabled: isAIEnabled, provider, model, apiKey, baseURL } = useAIStore();
	const closeDialog = useDialogStore((state) => state.closeDialog);

	const prevTypeRef = useRef<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { mutateAsync: importResume } = useMutation(orpc.resume.import.mutationOptions());

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type: "",
		},
	});

	const type = useWatch({ control: form.control, name: "type" });

	useEffect(() => {
		if (prevTypeRef.current === type) return;
		prevTypeRef.current = type;
		form.resetField("file");
	}, [form.resetField, type]);

	const onSelectFile = () => {
		if (!inputRef.current) return;
		inputRef.current.click();
	};

	const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		form.setValue("file", file, { shouldDirty: true });
	};

	const { blockEvents } = useFormBlocker(form);

	const onSubmit = async (values: FormValues) => {
		if (values.type === "") return;

		setIsLoading(true);

		const toastId = toast.loading(t`Importing your resume...`, {
			description: isAIEnabled
				? t`This may take a few minutes, depending on the response of the AI provider. Please do not close the window or refresh the page.`
				: t`Importing file...`,
		});

		try {
			let data: ResumeData | undefined;

			if (values.type === "json-resume-json") {
				const json = await values.file.text();
				const importer = new JSONResumeImporter();
				data = importer.parse(json);
			}

			if (values.type === "reactive-resume-json") {
				const json = await values.file.text();
				const importer = new ReactiveResumeJSONImporter();
				data = importer.parse(json);
			}

			if (values.type === "reactive-resume-v4-json") {
				const json = await values.file.text();
				const importer = new ReactiveResumeV4JSONImporter();
				data = importer.parse(json);
			}

			if (values.type === "pdf" || values.type === "pdf-text") {
				const isAI = values.type === "pdf" && isAIEnabled;

				if (isAI) {
					// ... AI logic ...
					console.log("Starting PDF import (AI)...");
					const arrayBuffer = await values.file.arrayBuffer();
					// Use a more efficient method for large files to avoid stack overflow
					const base64 = await arrayBufferToBase64(arrayBuffer);

					data = await client.ai.parsePdf({
						provider,
						model,
						apiKey,
						baseURL,
						file: { name: values.file.name, data: base64 },
					});
					console.log("PDF parsed successfully by AI");
				} else {
					console.log("Starting PDF import (local client-side)...");
					try {
						const text = await extractTextFromPdf(values.file);
						const clone: ResumeData = JSON.parse(JSON.stringify(defaultResumeData));
						clone.basics.name = values.file.name.replace(/\.pdf$/i, "");
						// Simple cleanup of text for HTML display
						const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
						clone.summary.content = `<p><strong>Extracted Content:</strong></p><p>${safeText}</p>`;
						data = clone;
					} catch (e) {
						console.error("Local PDF extraction failed", e);
						toast.error("Failed to extract text from PDF locally.");
						return;
					}
				}
			}

			if (values.type === "docx" || values.type === "docx-text") {
				const isAI = values.type === "docx" && isAIEnabled;

				if (isAI) {
					// ... AI logic ...
					console.log("Starting DOCX import (AI)...");
					const arrayBuffer = await values.file.arrayBuffer();
					// Use a more efficient method for large files to avoid stack overflow
					const base64 = await arrayBufferToBase64(arrayBuffer);
					const mediaType =
						values.file.type === "application/msword"
							? ("application/msword" as const)
							: ("application/vnd.openxmlformats-officedocument.wordprocessingml.document" as const);

					data = await client.ai.parseDocx({
						provider,
						model,
						apiKey,
						baseURL,
						mediaType,
						file: { name: values.file.name, data: base64 },
					});
					console.log("DOCX parsed successfully by AI");
				} else {
					console.log("Starting DOCX import (local client-side)...");
					try {
						const text = await extractTextFromDocx(values.file);
						const clone: ResumeData = JSON.parse(JSON.stringify(defaultResumeData));
						clone.basics.name = values.file.name.replace(/\.docx?$/i, "");
						// Simple cleanup of text for HTML display
						const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
						clone.summary.content = `<p><strong>Extracted Content:</strong></p><p>${safeText}</p>`;
						data = clone;
					} catch (e) {
						console.error("Local DOCX extraction failed", e);
						toast.error("Failed to extract text from DOCX locally.");
						return;
					}
				}
			}

			if (!data) throw new Error("No data was returned from the AI provider.");

			// Ensure data is properly serializable before sending
			const serializedData = JSON.parse(JSON.stringify(data)) as ResumeData;

			console.log("Calling importResume mutation...");
			console.log("Data type:", typeof serializedData, "Keys:", Object.keys(serializedData));
			await importResume({ data: serializedData });
			console.log("importResume mutation completed.");
			toast.success(t`Your resume has been imported successfully.`, { id: toastId, description: null });
			closeDialog();
		} catch (error: unknown) {
			console.error("Import failed:", error);
			console.error("Error type:", typeof error);
			console.error("Error message:", error instanceof Error ? error.message : String(error));

			let errorMessage = "An unknown error occurred while importing your resume.";
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage;
				// Try to parse if it's a JSON string error
				try {
					const parsed = JSON.parse(error.message);
					if (parsed.message) errorMessage = parsed.message;
				} catch {
					// Not a JSON error message, use as is
				}
			}
			toast.error(errorMessage, { id: toastId, description: null });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DialogContent {...blockEvents}>
			<DialogHeader>
				<DialogTitle className="flex items-center gap-x-2">
					<DownloadSimpleIcon />
					<Trans>Import an existing resume</Trans>
				</DialogTitle>
				<DialogDescription>
					<Trans>
						Continue where you left off by importing an existing resume you created using UdaanResume or any another
						resume builder. Supported formats include PDF, Microsoft Word, as well as JSON files from UdaanResume.
					</Trans>
				</DialogDescription>
			</DialogHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<Trans>Type</Trans>
								</FormLabel>
								<FormControl>
									<Combobox
										clearable={false}
										value={field.value}
										onValueChange={field.onChange}
										options={[
											{ value: "reactive-resume-json", label: "UdaanResume (JSON)" },
											{ value: "json-resume-json", label: "JSON Resume" },
											{
												value: "pdf",
												label: (
													<div className="flex items-center gap-x-2">
														<span>PDF (AI Parser)</span>
														{isAIEnabled && (
															<Badge variant="outline" className="scale-90 text-[10px]">
																<Trans>AI</Trans>
															</Badge>
														)}
													</div>
												),
												disabled: !isAIEnabled,
											},
											{
												value: "pdf-text",
												label: (
													<div className="flex items-center gap-x-2">
														<span>PDF (Text Only)</span>
													</div>
												),
											},
											{
												value: "docx",
												label: (
													<div className="flex items-center gap-x-2">
														<span>Microsoft Word (AI Parser)</span>
														{isAIEnabled && (
															<Badge variant="outline" className="scale-90 text-[10px]">
																<Trans>AI</Trans>
															</Badge>
														)}
													</div>
												),
												disabled: !isAIEnabled,
											},
											{
												value: "docx-text",
												label: (
													<div className="flex items-center gap-x-2">
														<span>Microsoft Word (Text Only)</span>
													</div>
												),
											},
										]}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						key={type}
						control={form.control}
						name="file"
						render={({ field }) => (
							<FormItem className={cn(!type && "hidden")}>
								<FormControl>
									<div>
										<Input type="file" className="hidden" ref={inputRef} onChange={onUploadFile} />

										<Button
											variant="outline"
											className="h-auto w-full flex-col border-dashed py-8 font-normal"
											onClick={onSelectFile}
										>
											{field.value ? (
												<>
													<FileIcon weight="thin" size={32} />
													<p>{field.value.name}</p>
												</>
											) : (
												<>
													<UploadSimpleIcon weight="thin" size={32} />
													<Trans>Click here to select a file to import</Trans>
												</>
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<DialogFooter>
						<Button type="submit" disabled={!type || isLoading}>
							{isLoading ? <Spinner /> : null}
							{isLoading ? t`Importing...` : t`Import`}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}

// Default export for lazy loading
export default ImportResumeDialog;

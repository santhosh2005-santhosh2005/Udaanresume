 import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { streamToEventIterator } from "@orpc/server";
import {
	convertToModelMessages,
	createGateway,
	generateText,
	Output,
	stepCountIs,
	streamText,
	tool,
	type UIMessage,
} from "ai";
import { createOllama } from "ai-sdk-ollama";
import { match } from "ts-pattern";
import type { ZodError } from "zod";
import z, { flattenError } from "zod";
import chatSystemPromptTemplate from "@/integrations/ai/prompts/chat-system.md?raw";
import docxParserSystemPrompt from "@/integrations/ai/prompts/docx-parser-system.md?raw";
import docxParserUserPrompt from "@/integrations/ai/prompts/docx-parser-user.md?raw";
import pdfParserSystemPrompt from "@/integrations/ai/prompts/pdf-parser-system.md?raw";
import pdfParserUserPrompt from "@/integrations/ai/prompts/pdf-parser-user.md?raw";
import {
	executePatchResume,
	patchResumeDescription,
	patchResumeInputSchema,
} from "@/integrations/ai/tools/patch-resume";
import type { ResumeData } from "@/schema/resume/data";
import { defaultResumeData, resumeDataSchema } from "@/schema/resume/data";

export const aiProviderSchema = z.enum(["ollama", "openai", "gemini", "anthropic", "vercel-ai-gateway", "local", "openrouter"]);

type AIProvider = z.infer<typeof aiProviderSchema>;

type GetModelInput = {
	provider: AIProvider;
	model: string;
	apiKey: string;
	baseURL: string;
};

function getModel(input: GetModelInput) {
	const { provider, model, apiKey } = input;
	const baseURL = input.baseURL || undefined;

	if (provider === "local") {
		throw new Error("Local provider does not use an LLM model.");
	}

	return match(provider)
		.with("openai", () => createOpenAI({ apiKey, baseURL }).languageModel(model))
		.with("ollama", () => createOllama({ apiKey, baseURL }).languageModel(model))
		.with("anthropic", () => createAnthropic({ apiKey, baseURL }).languageModel(model))
		.with("vercel-ai-gateway", () => createGateway({ apiKey, baseURL }).languageModel(model))
		.with("gemini", () => 
			// Google AI SDK handles the model name directly - no prefix needed
			createGoogleGenerativeAI({ apiKey, baseURL }).languageModel(model)
		)
		.with("openrouter", () =>
			createOpenAI({
				apiKey,
				baseURL: baseURL || "https://openrouter.ai/api/v1",
				headers: {
					"HTTP-Referer": "https://rxresu.me",
					"X-Title": "UdaanResume",
				},
			}).languageModel(model)
		)
		.exhaustive();
}

export const aiCredentialsSchema = z.object({
	provider: aiProviderSchema,
	model: z.string(),
	apiKey: z.string(),
	baseURL: z.string(),
});

export const fileInputSchema = z.object({
	name: z.string(),
	data: z.string(), // base64 encoded
});

type TestConnectionInput = z.infer<typeof aiCredentialsSchema>;

async function testConnection(input: TestConnectionInput): Promise<boolean> {
	if (input.provider === "local") return true;

	try {
		const result = await generateText({
			model: getModel(input),
			messages: [{ role: "user", content: "Respond with 'Pong'" }],
			maxOutputTokens: 10,
		});

		// Handle different response formats from various providers
		// @ts-ignore - text property exists on the result
		const responseText = result.text || "";
		return responseText.toLowerCase().includes("pong");
	} catch (error) {
		console.error("Test connection failed:", error);
		throw error;
	}
}

type ParsePdfInput = z.infer<typeof aiCredentialsSchema> & {
	file: z.infer<typeof fileInputSchema>;
};

async function parsePdf(input: ParsePdfInput): Promise<ResumeData> {
	console.log("parsePdf called with provider:", input.provider);
	if (input.provider === "local") {
		const data = structuredClone(defaultResumeData);
		data.basics.name = input.file.name.replace(/\.pdf$/i, "");
		data.summary.content = "<p>Imported from " + input.file.name + ". Content parsing is unavailable without AI integration. Please fill in the details manually.</p>";
		return data;
	}

	const model = getModel(input);

	const result = await generateText({
		model,
		output: Output.object({ schema: resumeDataSchema }),
		maxOutputTokens: 450,
		messages: [
			{
				role: "system",
				content: pdfParserSystemPrompt,
			},
			{
				role: "user",
				content: [
					{ type: "text", text: pdfParserUserPrompt },
					{
						type: "file",
						filename: input.file.name,
						mediaType: "application/pdf",
						data: input.file.data,
					},
				],
			},
		],
	});

	return resumeDataSchema.parse({
		...result.output,
		customSections: [],
		picture: defaultResumeData.picture,
		metadata: defaultResumeData.metadata,
	});
}

type ParseDocxInput = z.infer<typeof aiCredentialsSchema> & {
	file: z.infer<typeof fileInputSchema>;
	mediaType: "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
};

async function parseDocx(input: ParseDocxInput): Promise<ResumeData> {
	console.log("parseDocx called with provider:", input.provider);
	if (input.provider === "local") {
		const data = structuredClone(defaultResumeData);
		data.basics.name = input.file.name.replace(/\.docx?$/i, "");
		data.summary.content = "<p>Imported from " + input.file.name + ". Content parsing is unavailable without AI integration. Please fill in the details manually.</p>";
		return data;
	}

	const model = getModel(input);

	const result = await generateText({
		model,
		output: Output.object({ schema: resumeDataSchema }),
		maxOutputTokens: 450,
		messages: [
			{ role: "system", content: docxParserSystemPrompt },
			{
				role: "user",
				content: [
					{ type: "text", text: docxParserUserPrompt },
					{
						type: "file",
						filename: input.file.name,
						mediaType: input.mediaType,
						data: input.file.data,
					},
				],
			},
		],
	});

	return resumeDataSchema.parse({
		...result.output,
		customSections: [],
		picture: defaultResumeData.picture,
		metadata: defaultResumeData.metadata,
	});
}

export function formatZodError(error: ZodError): string {
	return JSON.stringify(flattenError(error));
}

function buildChatSystemPrompt(resumeData: ResumeData): string {
	return chatSystemPromptTemplate.replace("{{RESUME_DATA}}", JSON.stringify(resumeData, null, 2));
}

type ChatInput = z.infer<typeof aiCredentialsSchema> & {
	messages: UIMessage[];
	resumeData: ResumeData;
};

async function chat(input: ChatInput) {
	const model = getModel(input);
	const systemPrompt = buildChatSystemPrompt(input.resumeData);

	const result = streamText({
		model,
		system: systemPrompt,
		messages: await convertToModelMessages(input.messages),
		maxOutputTokens: 450,
		tools: {
			patch_resume: tool({
				description: patchResumeDescription,
				inputSchema: patchResumeInputSchema,
				execute: async ({ operations }) => executePatchResume(input.resumeData, operations),
			}),
		},
		stopWhen: stepCountIs(3),
	});

	return streamToEventIterator(result.toUIMessageStream());
}

export const aiService = {
	testConnection,
	parsePdf,
	parseDocx,
	chat,
};

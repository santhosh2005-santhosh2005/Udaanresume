import { s as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/style-BJgMumzy.mjs";
import { i as require_jsx_runtime, n as Trans } from "./_libs/lingui__react+react.mjs";
import { s as require_react, t as useChat } from "./_libs/@ai-sdk/react+[...].mjs";
import { u as motion } from "./_libs/framer-motion.mjs";
import { t as Button } from "./_ssr/button-DEtZbRiH.mjs";
import { p as useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "./_libs/lingui__core.mjs";
import { Fn as r, Gt as o$3, I as t, Pn as r$1, St as o$2, Ut as p, Wt as o$4, dt as a$1, ft as n, gn as c$1, l as o$1, on as e, rt as a, vn as c, z as o } from "./_libs/phosphor-icons__react.mjs";
import "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover$1 } from "./_ssr/popover-UvYowcN0.mjs";
import { t as useAIStore } from "./_ssr/store-Bd1SnWMR.mjs";
import { r as client, t as applyResumePatches, u as orpc } from "./_ssr/client-C81uIMtx.mjs";
import { x as asyncIteratorToUnproxiedDataStream } from "./_libs/@orpc/client+[...].mjs";
import "./_libs/@aws-sdk/client-s3+[...].mjs";
import { t as authClient } from "./_ssr/client-DG0yed4f.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { o as useResumeStore, s as useTemporalStore } from "./_ssr/resume-Cl6X1iDE.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-BbxCMoa0.mjs";
import { t as useCopyToClipboard } from "./_libs/usehooks-ts.mjs";
import { t as ResumePreview } from "./_ssr/preview-C4kidToT.mjs";
import { n as downloadWithAnchor, r as generateFilename, t as downloadFromUrl } from "./_ssr/file-DpXjV8bX.mjs";
import { i as TooltipTrigger, n as TooltipContent, t as Tooltip$1 } from "./_ssr/tooltip-ughCtY3L.mjs";
import { r as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { t as fe } from "./_libs/react-hotkeys-hook.mjs";
import { n as TransformWrapper, r as useControls, t as TransformComponent } from "./_libs/react-zoom-pan-pinch.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Extract patch operations from the latest assistant messages' tool call parts.
* Returns operations that haven't been applied yet (tracked by processedToolCallIds).
*/
function extractNewPatchOperations(messages, processedIds) {
	const operations = [];
	const newIds = [];
	for (const message of messages) {
		if (message.role !== "assistant") continue;
		for (const part of message.parts) {
			if (part.type !== "tool-patch_resume") continue;
			const toolPart = part;
			if (toolPart.state !== "output-available") continue;
			const callId = toolPart.toolCallId;
			if (processedIds.has(callId)) continue;
			const result = toolPart.output;
			if (result?.success && result.appliedOperations) {
				operations.push(...result.appliedOperations);
				newIds.push(callId);
			}
		}
	}
	return {
		operations,
		newIds
	};
}
/**
* LocalStorage helpers for persisting chat messages per resume.
*/
var STORAGE_KEY_PREFIX = "ai-chat-messages";
function getStorageKey(resumeId) {
	return `${STORAGE_KEY_PREFIX}:${resumeId}`;
}
function loadStoredMessages(resumeId) {
	try {
		const stored = localStorage.getItem(getStorageKey(resumeId));
		if (!stored) return [];
		return JSON.parse(stored);
	} catch {
		return [];
	}
}
function saveStoredMessages(resumeId, messages) {
	try {
		localStorage.setItem(getStorageKey(resumeId), JSON.stringify(messages));
	} catch {}
}
function clearStoredMessages(resumeId) {
	localStorage.removeItem(getStorageKey(resumeId));
}
function formatPath(path) {
	return path.replace(/^\//, "").replace(/\//g, " › ");
}
function formatOperationLabel(op) {
	switch (op) {
		case "replace": return i18n._({ id: "+b7T3G" });
		case "add": return i18n._({ id: "hp8OtS" });
		case "remove": return i18n._({ id: "eps54V" });
		default: return op;
	}
}
function ToolBadge({ state, operations }) {
	const isDone = state === "output-available";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-0.5 flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-state": state,
			className: cn("inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium text-[11px]", "data-[state=output-available]:border-emerald-500/30 data-[state=output-available]:bg-emerald-500/10 data-[state=output-available]:text-emerald-600 dark:data-[state=output-available]:text-emerald-400"),
			children: [isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
				weight: "fill",
				className: "size-3"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$1, { className: "size-3 animate-spin" }), isDone ? "Changes applied" : "Applying changes..."]
		}), isDone && operations && operations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-0.5 pl-1 text-[11px] text-muted-foreground",
			children: operations.map((op, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-40",
						children: "•"
					}),
					formatOperationLabel(op.op),
					" ",
					formatPath(op.path)
				]
			}, i))
		})]
	});
}
function MessageParts({ message }) {
	const parts = message.parts;
	if (parts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-2",
		children: parts.map((part, i) => {
			if (part.type === "step-start") {
				if (i === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-0.5 border-border/40" }, i);
			}
			if (part.type === "text" && part.text.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-[13px] leading-relaxed",
				children: part.text
			}, i);
			if (part.type === "reasoning" && part.text.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-[11px] text-muted-foreground italic leading-relaxed",
				children: part.text
			}, i);
			if (part.type === "tool-patch_resume") {
				const toolPart = part;
				const state = toolPart.state;
				const operations = toolPart.input?.operations;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolBadge, {
					state,
					operations
				}, i);
			}
			return null;
		})
	});
}
function AIChat() {
	const enabled = useAIStore((s) => s.enabled);
	const provider = useAIStore((s) => s.provider);
	const model = useAIStore((s) => s.model);
	const apiKey = useAIStore((s) => s.apiKey);
	const baseURL = useAIStore((s) => s.baseURL);
	const resumeId = useResumeStore((s) => s.resume.id);
	const resumeData = useResumeStore((s) => s.resume.data);
	const updateResumeData = useResumeStore((s) => s.updateResumeData);
	const [input, setInput] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const bottomRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const processedToolCallIds = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const [initialMessages] = (0, import_react.useState)(() => {
		const stored = loadStoredMessages(resumeId);
		for (const msg of stored) {
			if (msg.role !== "assistant") continue;
			for (const part of msg.parts) {
				if (part.type !== "tool-patch_resume") continue;
				const toolPart = part;
				if (toolPart.state === "output-available") processedToolCallIds.current.add(toolPart.toolCallId);
			}
		}
		return stored;
	});
	const { messages, sendMessage, status, stop, setMessages } = useChat({
		messages: initialMessages,
		transport: {
			async sendMessages(options) {
				return asyncIteratorToUnproxiedDataStream(await client.ai.chat({
					provider,
					model,
					apiKey,
					baseURL,
					messages: options.messages,
					resumeData
				}, { signal: options.abortSignal }));
			},
			reconnectToStream() {
				throw new Error("Unsupported");
			}
		},
		onError(error) {
			toast.error("AI chat error", { description: error.message });
		}
	});
	(0, import_react.useEffect)(() => {
		const { operations, newIds } = extractNewPatchOperations(messages, processedToolCallIds.current);
		if (operations.length === 0) return;
		try {
			const patched = applyResumePatches(resumeData, operations);
			updateResumeData((draft) => {
				Object.assign(draft, patched);
			});
			for (const id of newIds) processedToolCallIds.current.add(id);
		} catch (error) {
			toast.error("Failed to apply resume changes", { description: error instanceof Error ? error.message : "Unknown error" });
		}
	}, [
		messages,
		resumeData,
		updateResumeData
	]);
	(0, import_react.useEffect)(() => {
		saveStoredMessages(resumeId, messages);
	}, [resumeId, messages]);
	(0, import_react.useEffect)(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	(0, import_react.useEffect)(() => {
		if (status === "ready") inputRef.current?.focus();
	}, [status]);
	const handleOpenChange = (0, import_react.useCallback)((nextOpen) => {
		setOpen(nextOpen);
	}, []);
	const handleClearMessages = (0, import_react.useCallback)(() => {
		setMessages([]);
		clearStoredMessages(resumeId);
		processedToolCallIds.current.clear();
	}, [resumeId, setMessages]);
	const handleSubmit = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		if (!input.trim() || status !== "ready") return;
		sendMessage({ text: input });
		setInput("");
	}, [
		input,
		status,
		sendMessage
	]);
	if (!enabled) return null;
	const isLoading = status === "submitted" || status === "streaming";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, {
		open,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			className: "flex h-128 w-md flex-col gap-y-0 overflow-hidden p-0",
			side: "top",
			align: "center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center justify-between border-b px-3 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-muted-foreground text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "V+Qj+q" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						className: "size-7",
						title: i18n._({ id: "5eg0kp" }),
						onClick: handleClearMessages,
						disabled: messages.length === 0 || isLoading,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, { className: "size-3" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
					className: "min-h-0 flex-1 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-y-4 pt-4",
						children: [messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center py-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-muted-foreground text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "V/14r9" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4",
							children: [
								messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("flex", message.role === "user" ? "justify-end" : "justify-start"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-role": message.role,
										className: cn("max-w-[85%] rounded-xl px-3.5 py-2.5", "data-[role=user]:rounded-br-sm data-[role=user]:bg-primary data-[role=user]:text-primary-foreground", "data-[role=assistant]:rounded-bl-sm data-[role=assistant]:bg-muted data-[role=assistant]:text-foreground"),
										children: message.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[13px] leading-relaxed",
											children: message.parts.map((part, i) => part.type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part.text }, i) : null)
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageParts, { message })
									})
								}, message.id)),
								status === "submitted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-xl rounded-bl-sm bg-muted px-3.5 py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-[13px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c$1, { className: "size-3 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Ed99mE" }) })]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									ref: bottomRef,
									"aria-hidden": true
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "flex shrink-0 items-center gap-1.5 border-t px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						value: input,
						disabled: !enabled || isLoading,
						onChange: (e) => setInput(e.target.value),
						placeholder: i18n._({ id: "nDzW8d" }),
						className: "flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "ghost",
						onClick: stop,
						className: "size-7 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, { className: "size-3.5" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						variant: "ghost",
						disabled: !input.trim(),
						className: "size-7 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, { className: "size-3.5" })
					})]
				})
			]
		})]
	});
}
function BuilderDock() {
	const { data: session } = authClient.useSession();
	const params = useParams({ from: "/builder/$resumeId" });
	const [_, copyToClipboard] = useCopyToClipboard();
	const { zoomIn, zoomOut, centerView } = useControls();
	const { data: resume } = useQuery(orpc.resume.getById.queryOptions({ input: { id: params.resumeId } }));
	const { mutateAsync: printResumeAsPDF, isPending: isPrinting } = useMutation(orpc.printer.printResumeAsPDF.mutationOptions());
	const { undo, redo, pastStates, futureStates } = useTemporalStore((state) => ({
		undo: state.undo,
		redo: state.redo,
		pastStates: state.pastStates,
		futureStates: state.futureStates
	}));
	const canUndo = pastStates.length > 1;
	const canRedo = futureStates.length > 0;
	fe("mod+z", () => undo(), {
		enabled: canUndo,
		preventDefault: true
	});
	fe(["mod+y", "mod+shift+z"], () => redo(), {
		enabled: canRedo,
		preventDefault: true
	});
	const publicUrl = (0, import_react.useMemo)(() => {
		if (!session?.user.username || !resume?.slug) return "";
		return `${window.location.origin}/${session.user.username}/${resume.slug}`;
	}, [session?.user.username, resume?.slug]);
	const onCopyUrl = (0, import_react.useCallback)(async () => {
		await copyToClipboard(publicUrl);
		toast.success(i18n._({ id: "VoRm7A" }));
	}, [publicUrl, copyToClipboard]);
	const onDownloadJSON = (0, import_react.useCallback)(async () => {
		if (!resume?.data) return;
		const filename = generateFilename(resume.data.basics.name, "json");
		const jsonString = JSON.stringify(resume.data, null, 2);
		downloadWithAnchor(new Blob([jsonString], { type: "application/json" }), filename);
	}, [resume?.data]);
	const onDownloadPDF = (0, import_react.useCallback)(async () => {
		if (!resume?.id) return;
		const filename = generateFilename(resume.data.basics.name, "pdf");
		const toastId = toast.loading(i18n._({ id: "UC7fTw" }), { description: i18n._({ id: "TNAt2N" }) });
		try {
			const { url } = await printResumeAsPDF({ id: resume.id });
			downloadFromUrl(url, filename);
		} catch {
			toast.error(i18n._({ id: "5VU+Oa" }));
		} finally {
			toast.dismiss(toastId);
		}
	}, [
		resume?.id,
		resume?.data.basics.name,
		printResumeAsPDF
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-4 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -50
			},
			animate: {
				opacity: .5,
				y: 0
			},
			whileHover: { opacity: 1 },
			transition: { duration: .2 },
			className: "flex items-center rounded-r-full rounded-l-full bg-popover px-2 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					disabled: !canUndo,
					onClick: () => undo(),
					icon: r,
					title: i18n._({ id: "dlfhKD" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					disabled: !canRedo,
					onClick: () => redo(),
					icon: r$1,
					title: i18n._({ id: "YKDpcE" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 h-8 w-px bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: a$1,
					title: i18n._({ id: "AWOSPo" }),
					onClick: () => zoomIn(.1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: n,
					title: i18n._({ id: "FjkaiT" }),
					onClick: () => zoomOut(.1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: e,
					title: i18n._({ id: "MOB4En" }),
					onClick: () => centerView()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 h-8 w-px bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIChat, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: o$2,
					title: i18n._({ id: "E6nRW7" }),
					onClick: () => onCopyUrl()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: o$3,
					title: i18n._({ id: "pkERVr" }),
					onClick: () => onDownloadJSON()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					title: i18n._({ id: "KMdYRY" }),
					disabled: isPrinting,
					onClick: () => onDownloadPDF(),
					icon: isPrinting ? c$1 : o$4,
					iconClassName: cn(isPrinting && "animate-spin")
				})
			]
		})
	});
}
function DockIcon({ icon: Icon, title, disabled, onClick, iconClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "icon",
			variant: "ghost",
			disabled,
			onClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", iconClassName) })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "top",
		align: "center",
		className: "font-medium",
		children: title
	})] });
}
function RouteComponent() {
	fe(["ctrl+s", "meta+s"], () => {
		toast.info(i18n._({ id: "p01AP+" }), {
			id: "auto-save",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p, {})
		});
	}, {
		preventDefault: true,
		enableOnFormTags: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TransformWrapper, {
			centerOnInit: true,
			limitToBounds: false,
			minScale: .3,
			initialScale: .6,
			maxScale: 6,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransformComponent, {
				wrapperClass: "h-full! w-full!",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreview, {
					showPageNumbers: true,
					className: "flex items-start space-x-10 space-y-10",
					pageClassName: "shadow-xl rounded-md overflow-hidden"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderDock, {})]
		})
	});
}
export { RouteComponent as component };

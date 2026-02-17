import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { u as motion } from "../_libs/framer-motion.mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { Dn as r, Ot as e, t as o, vn as c } from "../_libs/phosphor-icons__react.mjs";
import "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Input } from "./input-CtC-lcee.mjs";
import { t as useAIStore } from "./store-Bd1SnWMR.mjs";
import { u as orpc } from "./client-DOHyAGPS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useIsClient } from "../_libs/usehooks-ts.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Spinner } from "./spinner-EfdewK_4.mjs";
import { t as Combobox } from "./combobox-BKRnq7GA.mjs";
import { t as Label$1 } from "./label-Ce6ENJeJ.mjs";
import { t as Separator$1 } from "./separator-DIlfBRvu.mjs";
import { t as Switch$1 } from "./switch-CW2jHJFL.mjs";
import { t as DashboardHeader } from "./header-Fmv3KrUX.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var providerOptions = [
	{
		value: "openai",
		label: "OpenAI",
		keywords: [
			"openai",
			"gpt",
			"chatgpt"
		],
		defaultBaseURL: "https://api.openai.com/v1"
	},
	{
		value: "ollama",
		label: "Ollama",
		keywords: [
			"ollama",
			"ai",
			"local"
		],
		defaultBaseURL: "http://localhost:11434"
	},
	{
		value: "anthropic",
		label: "Anthropic Claude",
		keywords: [
			"anthropic",
			"claude",
			"ai"
		],
		defaultBaseURL: "https://api.anthropic.com/v1"
	},
	{
		value: "vercel-ai-gateway",
		label: "Vercel AI Gateway",
		keywords: [
			"vercel",
			"gateway",
			"ai"
		],
		defaultBaseURL: "https://ai-gateway.vercel.sh/v1/ai"
	},
	{
		value: "gemini",
		label: "Google Gemini",
		keywords: [
			"gemini",
			"google",
			"bard"
		],
		defaultBaseURL: "https://generativelanguage.googleapis.com/v1beta"
	},
	{
		value: "openrouter",
		label: "OpenRouter",
		keywords: [
			"openrouter",
			"openai",
			"claude",
			"gemini",
			"llama"
		],
		defaultBaseURL: "https://openrouter.ai/api/v1"
	}
];
function AIForm() {
	const { set, model, apiKey, baseURL, provider, enabled, testStatus } = useAIStore();
	const selectedOption = (0, import_react.useMemo)(() => {
		return providerOptions.find((option) => option.value === provider);
	}, [provider]);
	const { mutate: testConnection, isPending: isTesting } = useMutation(orpc.ai.testConnection.mutationOptions());
	const handleProviderChange = (value) => {
		if (!value) return;
		set((draft) => {
			draft.provider = value;
		});
	};
	const handleModelChange = (value) => {
		set((draft) => {
			draft.model = value;
		});
	};
	const handleApiKeyChange = (value) => {
		set((draft) => {
			draft.apiKey = value;
		});
	};
	const handleBaseURLChange = (value) => {
		set((draft) => {
			draft.baseURL = value;
		});
	};
	const handleTestConnection = () => {
		testConnection({
			provider,
			model,
			apiKey,
			baseURL
		}, {
			onSuccess: (data) => {
				set((draft) => {
					draft.testStatus = data ? "success" : "failure";
				});
			},
			onError: (error) => {
				set((draft) => {
					draft.testStatus = "failure";
				});
				toast.error(error.message);
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
					htmlFor: "provider",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "aemBRq" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
					id: "provider",
					value: provider,
					disabled: enabled,
					options: providerOptions,
					onValueChange: handleProviderChange
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
					htmlFor: "model",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "scu3wk" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "model",
					type: "text",
					value: model,
					disabled: enabled,
					onChange: (e) => handleModelChange(e.target.value),
					placeholder: "e.g., gpt-4, claude-3-opus, gemini-pro"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2 sm:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "api-key",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "yRnk5W" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "api-key",
						type: "password",
						value: apiKey,
						disabled: enabled,
						onChange: (e) => handleApiKeyChange(e.target.value)
					}),
					provider === "openrouter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
							id: "VyDMi2",
							components: {
								0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://openrouter.ai/keys",
									target: "_blank",
									rel: "noreferrer",
									className: "font-medium underline hover:text-primary"
								}),
								1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "font-mono text-xs underline hover:text-primary",
									onClick: () => handleModelChange("google/gemini-2.0-flash-001")
								}),
								2: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "font-mono text-xs underline hover:text-primary",
									onClick: () => handleModelChange("openai/gpt-4o")
								})
							}
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
					htmlFor: "base-url",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "aLSmnC" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "base-url",
					type: "url",
					value: baseURL,
					disabled: enabled,
					placeholder: selectedOption?.defaultBaseURL,
					onChange: (e) => handleBaseURLChange(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				disabled: isTesting || enabled,
				onClick: handleTestConnection,
				children: [isTesting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : testStatus === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { className: "text-success" }) : testStatus === "failure" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "text-destructive" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "s7uMvM" })]
			}) })
		]
	});
}
function RouteComponent() {
	const isClient = useIsClient();
	const enabled = useAIStore((state) => state.enabled);
	const canEnable = useAIStore((state) => state.canEnable());
	const setEnabled = useAIStore((state) => state.setEnabled);
	if (!isClient) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: r,
				title: i18n._({ id: "Jm1U+x" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .3 },
				className: "grid max-w-xl gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4 rounded-sm border bg-popover p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-sm bg-primary/10 p-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
								className: "text-primary",
								size: 24
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "jUBjoD" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-relaxed",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "/ZWeEA" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							htmlFor: "enable-ai",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "/Zv/dZ" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
							id: "enable-ai",
							checked: enabled,
							disabled: !canEnable,
							onCheckedChange: setEnabled
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("flex items-center gap-x-2", enabled ? "text-success" : "text-destructive"),
						children: [enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "RxzN1M" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "E/QGRL" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIForm, {})
				]
			})
		]
	});
}
export { RouteComponent as component };

import { o as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { In as r } from "../_libs/phosphor-icons__react.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as Input } from "./input-CtC-lcee.mjs";
import { t as authClient } from "./client-CBJmU-nl.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useForm, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, s as FormMessage, t as Form } from "./form-36WCL8kQ.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var formSchema = zod_default.object({ email: zod_default.email() });
function RouteComponent() {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: { email: "" }
	});
	const onSubmit = async (data) => {
		const toastId = toast.loading(i18n._({ id: "fGKKVV" }));
		const { error } = await authClient.requestPasswordReset({
			email: data.email,
			redirectTo: "/auth/reset-password"
		});
		if (error) {
			toast.error(error.message, { id: toastId });
			return;
		}
		setSubmitted(true);
		toast.dismiss(toastId);
	};
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostForgotPasswordScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "glx6on" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
				id: "Gt55qA",
				components: {
					0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "link",
						className: "h-auto gap-1.5 px-1! py-0"
					}),
					1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth/login" }),
					2: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {})
				}
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
		...form,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-6",
			onSubmit: form.handleSubmit(onSubmit),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "email",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hzKQCy" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						autoComplete: "email",
						placeholder: "john.doe@example.com",
						...field
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "oAkefL" })
			})]
		})
	})] });
}
function PostForgotPasswordScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "37ukDF" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Mp92ys" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "mailto:",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "yDsjJE" })
		})
	})] });
}
export { RouteComponent as component };

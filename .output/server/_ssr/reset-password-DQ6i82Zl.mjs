import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { Yt as o$1, Zt as o } from "../_libs/phosphor-icons__react.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as Input } from "./input-CtC-lcee.mjs";
import { t as authClient } from "./client-CBJmU-nl.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as useToggle } from "../_libs/usehooks-ts.mjs";
import { a as useForm, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, s as FormMessage, t as Form } from "./form-36WCL8kQ.mjs";
import { t as Route } from "./reset-password-BwkNgmhc.mjs";
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({ password: zod_default.string().min(6).max(64) });
function RouteComponent() {
	const navigate = useNavigate();
	const { token } = Route.useSearch();
	const [showPassword, toggleShowPassword] = useToggle(false);
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: { password: "" }
	});
	const onSubmit = async (data) => {
		const toastId = toast.loading(i18n._({ id: "qzR3YP" }));
		const { error } = await authClient.resetPassword({
			token,
			newPassword: data.password
		});
		if (error) {
			toast.error(error.message, { id: toastId });
			return;
		}
		toast.success(i18n._({ id: "X2cmDC" }), { id: toastId });
		navigate({ to: "/auth/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "slOprG" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "15fhbV" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
		...form,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-6",
			onSubmit: form.handleSubmit(onSubmit),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "password",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "7vhWI8" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-x-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							min: 6,
							max: 64,
							type: showPassword ? "text" : "password",
							autoComplete: "new-password",
							...field
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: toggleShowPassword,
							children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "KbS2K9" })
			})]
		})
	})] });
}
export { RouteComponent as component };

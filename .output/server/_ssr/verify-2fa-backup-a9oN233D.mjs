import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { t as Button } from "./button-DJsC0vRs.mjs";
import { d as Link, f as useNavigate, m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { Ln as r, yn as o } from "../_libs/phosphor-icons__react.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as authClient } from "./client-Ejf13jR5.mjs";
import { a as useForm, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as FormItem, i as FormField, n as FormControl, s as FormMessage, t as Form } from "./form-DiTXTpHo.mjs";
import { r as Qt } from "../_libs/input-otp.mjs";
import { i as InputOTPSlot, n as InputOTPGroup, r as InputOTPSeparator, t as InputOTP } from "./input-otp-CRG0ADRU.mjs";
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({ code: zod_default.string().trim() });
function RouteComponent() {
	const router = useRouter();
	const navigate = useNavigate();
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: { code: "" }
	});
	const onSubmit = async (data) => {
		const toastId = toast.loading(i18n._({ id: "SXcmcA" }));
		const formattedCode = `${data.code.slice(0, 5)}-${data.code.slice(5)}`;
		const { error } = await authClient.twoFactor.verifyBackupCode({ code: formattedCode });
		if (error) {
			toast.error(error.message, { id: toastId });
			return;
		}
		toast.dismiss(toastId);
		router.invalidate();
		navigate({
			to: "/dashboard",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FZNDIB" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8l+loI" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
		...form,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-6",
			onSubmit: form.handleSubmit(onSubmit),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				control: form.control,
				name: "code",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "justify-self-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputOTP, {
						maxLength: 10,
						value: field.value,
						pattern: Qt,
						onChange: field.onChange,
						onComplete: form.handleSubmit(onSubmit),
						pasteTransformer: (pasted) => pasted.replaceAll("-", ""),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputOTPGroup, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 0,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 1,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 2,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 3,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 4,
									className: "size-12"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputOTPGroup, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 5,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 6,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 7,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 8,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
									index: 9,
									className: "size-12"
								})
							] })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-x-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/auth/verify-2fa",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "sr0UJD" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "uSMfoN" })]
				})]
			})]
		})
	})] });
}
export { RouteComponent as component };

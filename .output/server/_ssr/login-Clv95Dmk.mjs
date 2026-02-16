import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { t as Button } from "./button-DJsC0vRs.mjs";
import { d as Link, f as useNavigate, m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { In as r, Yt as o$1, Zt as o } from "../_libs/phosphor-icons__react.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as Input } from "./input-CV38K_Qt.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as useToggle } from "../_libs/usehooks-ts.mjs";
import { t as authClient } from "./client-Ejf13jR5.mjs";
import { a as useForm, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, r as FormDescription, s as FormMessage, t as Form } from "./form-DiTXTpHo.mjs";
import { t as Route } from "./login-C83QvjvN.mjs";
import { t as SocialAuth } from "./social-auth-CFhTKnHV.mjs";
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({
	identifier: zod_default.string().trim().toLowerCase(),
	password: zod_default.string().trim().min(6).max(64)
});
function RouteComponent() {
	const router = useRouter();
	const navigate = useNavigate();
	const [showPassword, toggleShowPassword] = useToggle(false);
	const { flags } = Route.useRouteContext();
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: {
			identifier: "",
			password: ""
		}
	});
	const onSubmit = async (data) => {
		const toastId = toast.loading(i18n._({ id: "XOxZT4" }));
		const fetchOptions = {
			onSuccess: (context) => {
				if (context.data && "twoFactorRedirect" in context.data && context.data.twoFactorRedirect) {
					toast.dismiss(toastId);
					navigate({
						to: "/auth/verify-2fa",
						replace: true
					});
					return;
				}
				router.invalidate();
				toast.dismiss(toastId);
				navigate({
					to: "/dashboard",
					replace: true
				});
			},
			onError: ({ error }) => {
				toast.error(error.message, { id: toastId });
			}
		};
		if (data.identifier.includes("@")) await authClient.signIn.email({
			email: data.identifier,
			password: data.password,
			fetchOptions
		});
		else await authClient.signIn.username({
			username: data.identifier,
			password: data.password,
			fetchOptions
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-bold text-2xl tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NxCJcc" })
			}), !flags.disableSignups && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
					id: "gfvxY9",
					components: {
						0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "link",
							className: "h-auto gap-1.5 px-1! py-0"
						}),
						1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth/register" }),
						2: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {})
					}
				})
			})]
		}),
		!flags.disableEmailAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-6",
				onSubmit: form.handleSubmit(onSubmit),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "identifier",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hzKQCy" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoComplete: "email",
								placeholder: "john.doe@example.com",
								className: "lowercase",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "TNcvC0" }) })
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "password",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8ZsakT" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-x-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									min: 6,
									max: 64,
									type: showPassword ? "text" : "password",
									autoComplete: "current-password",
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "5lWFkC" })
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialAuth, {})
	] });
}
export { RouteComponent as component };

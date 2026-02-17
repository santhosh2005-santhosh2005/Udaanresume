import { o as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { f as AnimatePresence, u as motion } from "../_libs/framer-motion.mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { a as r, r as r$1, yn as o } from "../_libs/phosphor-icons__react.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Input } from "./input-CtC-lcee.mjs";
import { t as M } from "../_libs/ts-pattern.mjs";
import { t as authClient } from "./client-CBJmU-nl.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Separator$1 } from "./separator-DIlfBRvu.mjs";
import { t as DashboardHeader } from "./header-Fmv3KrUX.mjs";
import { a as useForm, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, s as FormMessage, t as Form } from "./form-36WCL8kQ.mjs";
import { t as Route } from "./profile-D8A6kSsJ.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var formSchema = zod_default.object({
	name: zod_default.string().trim().min(1).max(64),
	username: zod_default.string().trim().min(1).max(64).regex(/^[a-z0-9._-]+$/, { message: "Username can only contain lowercase letters, numbers, dots, hyphens and underscores." }),
	email: zod_default.email().trim()
});
function RouteComponent() {
	const router = useRouter();
	const { session } = Route.useRouteContext();
	const defaultValues = (0, import_react.useMemo)(() => {
		return {
			name: session.user.name,
			username: session.user.username,
			email: session.user.email
		};
	}, [session.user]);
	const form = useForm({
		resolver: a(formSchema),
		defaultValues
	});
	const onCancel = () => {
		form.reset(defaultValues);
	};
	const onSubmit = async (data) => {
		const { error } = await authClient.updateUser({
			name: data.name,
			username: data.username,
			displayUsername: data.username
		});
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(i18n._({ id: "R+Yx9f" }));
		form.reset({
			name: data.name,
			username: data.username,
			email: session.user.email
		});
		router.invalidate();
		if (data.email !== session.user.email) {
			const { error } = await authClient.changeEmail({
				newEmail: data.email,
				callbackURL: "/dashboard/settings/profile"
			});
			if (error) {
				toast.error(error.message);
				return;
			}
			toast.success(i18n._({ id: "H9l09X" }));
			form.reset({
				name: data.name,
				username: data.username,
				email: session.user.email
			});
			router.invalidate();
		}
	};
	const handleResendVerificationEmail = async () => {
		const toastId = toast.loading(i18n._({ id: "deDz65" }));
		const { error } = await authClient.sendVerificationEmail({
			email: session.user.email,
			callbackURL: "/dashboard/settings/profile"
		});
		if (error) {
			toast.error(error.message, { id: toastId });
			return;
		}
		toast.success(i18n._({ id: "hYxMTR" }), { id: toastId });
		router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: r,
				title: i18n._({ id: "vERlcd" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
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
					onSubmit: form.handleSubmit(onSubmit),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "name",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "6YtxFj" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									min: 3,
									max: 64,
									autoComplete: "name",
									placeholder: "John Doe",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "username",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "7sNhEz" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									min: 3,
									max: 64,
									autoComplete: "username",
									placeholder: "john.doe",
									className: "lowercase",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "email",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hzKQCy" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									autoComplete: "email",
									placeholder: "john.doe@example.com",
									className: "lowercase",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {}),
								M(session.user.emailVerified).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-x-1.5 text-green-700 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "QDEWii" })]
								})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-x-1.5 text-amber-600 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, { className: "size-3.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VBTGXl" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "|" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "link",
											className: "h-auto gap-x-1.5 p-0! text-inherit text-xs",
											onClick: handleResendVerificationEmail,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "TvnDiq" })
										})
									]
								})).exhaustive()
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: form.formState.isDirty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							exit: {
								opacity: 0,
								x: -20
							},
							className: "flex items-center gap-x-4 justify-self-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "reset",
								variant: "ghost",
								onClick: onCancel,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dEgA5A" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "IUwGEM" })
							})]
						}) })
					]
				})
			})
		]
	});
}
export { RouteComponent as component };

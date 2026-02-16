import { o as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { u as motion } from "../_libs/framer-motion.mjs";
import { t as Button } from "./button-DJsC0vRs.mjs";
import { f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { l as o, r } from "../_libs/phosphor-icons__react.mjs";
import "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Input } from "./input-CV38K_Qt.mjs";
import { u as orpc } from "./client-B0hja1xN.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as authClient } from "./client-Ejf13jR5.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Separator$1 } from "./separator-DCFkbV9t.mjs";
import { t as DashboardHeader } from "./header-BjFhzUIV.mjs";
import { n as useConfirm } from "./use-confirm-gQjUIBHm.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var CONFIRMATION_TEXT = "delete";
function RouteComponent() {
	const confirm = useConfirm();
	const navigate = useNavigate();
	const [confirmationText, setConfirmationText] = (0, import_react.useState)("");
	const isConfirmationValid = confirmationText === CONFIRMATION_TEXT;
	const { mutate: deleteAccount } = useMutation(orpc.auth.deleteAccount.mutationOptions());
	const handleDeleteAccount = async () => {
		if (!await confirm(i18n._({ id: "74F7N/" }), {
			description: i18n._({ id: "UvtmFw" }),
			confirmText: i18n._({ id: "7VpPHA" }),
			cancelText: i18n._({ id: "dEgA5A" })
		})) return;
		const toastId = toast.loading(i18n._({ id: "O71YIC" }));
		deleteAccount(void 0, {
			onSuccess: async () => {
				toast.success(i18n._({ id: "gmJH7Y" }), { id: toastId });
				await authClient.signOut();
				navigate({ to: "/" });
			},
			onError: (error) => {
				toast.error(error.message, { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: r,
				title: i18n._({ id: "ZQKLI1" })
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "WFHI0W" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "text",
						value: confirmationText,
						onChange: (e) => setConfirmationText(e.target.value),
						placeholder: i18n._({
							id: "o7xOt6",
							values: { CONFIRMATION_TEXT }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "justify-self-end",
						variant: "destructive",
						onClick: handleDeleteAccount,
						disabled: !isConfirmationValid,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vzX5FB" })]
					})
				]
			})
		]
	});
}
export { RouteComponent as component };

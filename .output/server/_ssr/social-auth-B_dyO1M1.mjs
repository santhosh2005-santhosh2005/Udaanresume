import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { Ft as e, Lt as t$1, i as t } from "../_libs/phosphor-icons__react.mjs";
import { u as orpc } from "./client-C81uIMtx.mjs";
import { t as authClient } from "./client-DG0yed4f.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
var import_jsx_runtime = require_jsx_runtime();
function SocialAuth() {
	const router = useRouter();
	const { data: authProviders = {} } = useQuery(orpc.auth.providers.list.queryOptions());
	const handleSocialLogin = async (provider) => {
		const toastId = toast.loading(i18n._({ id: "XOxZT4" }));
		const { error } = await authClient.signIn.social({
			provider,
			callbackURL: "/dashboard"
		});
		if (error) {
			toast.error(error.message, { id: toastId });
			return;
		}
		toast.dismiss(toastId);
		router.invalidate();
	};
	const handleOAuthLogin = async () => {
		const toastId = toast.loading(i18n._({ id: "XOxZT4" }));
		const { error } = await authClient.signIn.oauth2({
			providerId: "custom",
			callbackURL: "/dashboard"
		});
		if (error) {
			toast.error(error.message, { id: toastId });
			return;
		}
		toast.dismiss(toastId);
		router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-x-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-xs tracking-wide",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "3BEoB6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "flex-1" })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				onClick: handleOAuthLogin,
				className: cn("hidden", "custom" in authProviders && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {}), authProviders.custom]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => handleSocialLogin("google"),
				className: cn("hidden flex-1 bg-[#4285F4] text-white hover:bg-[#4285F4]/80", "google" in authProviders && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), "Google"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => handleSocialLogin("github"),
				className: cn("hidden flex-1 bg-[#2b3137] text-white hover:bg-[#2b3137]/80", "github" in authProviders && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$1, {}), "GitHub"]
			})
		]
	}) })] });
}
export { SocialAuth as t };

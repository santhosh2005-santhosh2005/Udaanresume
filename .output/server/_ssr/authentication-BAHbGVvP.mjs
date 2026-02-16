import { o as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { u as motion } from "../_libs/framer-motion.mjs";
import { t as Button } from "./button-DJsC0vRs.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { $ as i, Ct as o, Dt as o$1, Ft as e, Lt as t, W as o$3, _t as e$2, f as e$3, i as t$1, p as o$2, tt as r, wt as e$1 } from "../_libs/phosphor-icons__react.mjs";
import "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as M } from "../_libs/ts-pattern.mjs";
import { u as orpc } from "./client-B0hja1xN.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as authClient } from "./client-Ejf13jR5.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Separator$1 } from "./separator-DCFkbV9t.mjs";
import { t as DashboardHeader } from "./header-BjFhzUIV.mjs";
import { t as useDialogStore } from "./store-DH4owPqV.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Get the display name for a social provider
*/
function getProviderName(providerId) {
	return M(providerId).with("credential", () => "Password").with("google", () => "Google").with("github", () => "GitHub").with("custom", () => "Custom OAuth").exhaustive();
}
/**
* Get the icon component for a social provider
*/
function getProviderIcon(providerId) {
	return M(providerId).with("credential", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {})).with("google", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {})).with("github", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {})).with("custom", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$1, {})).exhaustive();
}
/**
* Hook to fetch and manage authentication accounts
*/
function useAuthAccounts() {
	const { data: accounts } = useQuery({
		queryKey: ["auth", "accounts"],
		queryFn: () => authClient.listAccounts(),
		select: ({ data }) => data ?? []
	});
	const getAccountByProviderId = (0, import_react.useCallback)((providerId) => accounts?.find((account) => account.providerId === providerId), [accounts]);
	return {
		accounts,
		hasAccount: (0, import_react.useCallback)((providerId) => !!getAccountByProviderId(providerId), [getAccountByProviderId]),
		getAccountByProviderId
	};
}
/**
* Hook to manage authentication provider linking/unlinking
*/
function useAuthProviderActions() {
	return {
		link: (0, import_react.useCallback)(async (provider) => {
			const providerName = getProviderName(provider);
			const toastId = toast.loading(i18n._({
				id: "RESom6",
				values: { providerName }
			}));
			const { error } = await authClient.linkSocial({
				provider,
				callbackURL: "/dashboard/settings/authentication"
			});
			if (error) {
				toast.error(error.message, { id: toastId });
				return;
			}
			toast.dismiss(toastId);
		}, []),
		unlink: (0, import_react.useCallback)(async (provider, accountId) => {
			const providerName = getProviderName(provider);
			const toastId = toast.loading(i18n._({
				id: "2SLv/w",
				values: { providerName }
			}));
			const { error } = await authClient.unlinkAccount({
				providerId: provider,
				accountId
			});
			if (error) {
				toast.error(error.message, { id: toastId });
				return;
			}
			toast.dismiss(toastId);
		}, [])
	};
}
/**
* Hook to get enabled social providers for the current user
* Possible values: "credential", "google", "github", "custom"
*/
function useEnabledProviders() {
	const { data: enabledProviders = [] } = useQuery(orpc.auth.providers.list.queryOptions());
	return { enabledProviders };
}
function PasswordSection() {
	const navigate = useNavigate();
	const { openDialog } = useDialogStore();
	const { hasAccount } = useAuthAccounts();
	const hasPassword = (0, import_react.useMemo)(() => hasAccount("credential"), [hasAccount]);
	const handleUpdatePassword = (0, import_react.useCallback)(() => {
		if (hasPassword) openDialog("auth.change-password", void 0);
		else navigate({ to: "/auth/forgot-password" });
	}, [
		hasPassword,
		navigate,
		openDialog
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .3,
			delay: .1
		},
		className: "flex items-center justify-between gap-x-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-x-3 font-medium text-base",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8ZsakT" })]
		}), M(hasPassword).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			onClick: handleUpdatePassword,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "KhtG3o" })]
		})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth/forgot-password",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "2gHjVM" })
			})
		})).exhaustive()]
	});
}
function SocialProviderSection({ provider, name, animationDelay = 0 }) {
	const { link, unlink } = useAuthProviderActions();
	const { hasAccount, getAccountByProviderId } = useAuthAccounts();
	const providerName = (0, import_react.useMemo)(() => name ?? getProviderName(provider), [name, provider]);
	const providerIcon = (0, import_react.useMemo)(() => getProviderIcon(provider), [provider]);
	const account = (0, import_react.useMemo)(() => getAccountByProviderId(provider), [getAccountByProviderId, provider]);
	const isConnected = (0, import_react.useMemo)(() => hasAccount(provider), [hasAccount, provider]);
	const handleLink = (0, import_react.useCallback)(() => {
		link(provider);
	}, [link, provider]);
	const handleUnlink = (0, import_react.useCallback)(() => {
		if (!account?.accountId) return;
		unlink(provider, account.accountId);
	}, [
		account,
		unlink,
		provider
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .3,
			delay: animationDelay
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between gap-x-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-x-3 font-medium text-base",
				children: [providerIcon, providerName]
			}), M(isConnected).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: handleUnlink,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "+K0AvT" })]
			})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: handleLink,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "iSLIjg" })]
			})).exhaustive()]
		})]
	});
}
function TwoFactorSection() {
	const { openDialog } = useDialogStore();
	const { hasAccount } = useAuthAccounts();
	const { data: session } = authClient.useSession();
	const hasPassword = (0, import_react.useMemo)(() => hasAccount("credential"), [hasAccount]);
	const hasTwoFactor = (0, import_react.useMemo)(() => session?.user.twoFactorEnabled ?? false, [session]);
	const handleTwoFactorAction = (0, import_react.useCallback)(() => {
		if (hasTwoFactor) openDialog("auth.two-factor.disable", void 0);
		else openDialog("auth.two-factor.enable", void 0);
	}, [hasTwoFactor, openDialog]);
	if (!hasPassword) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .3,
			delay: .2
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between gap-x-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-x-3 font-medium text-base",
				children: [hasTwoFactor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "C4pKXW" })]
			}), M(hasTwoFactor).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: handleTwoFactorAction,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "qERl58" })]
			})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: handleTwoFactorAction,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "DCRKbe" })]
			})).exhaustive()]
		})]
	});
}
function RouteComponent() {
	const { enabledProviders } = useEnabledProviders();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: o$3,
				title: i18n._({ id: "P8fBlG" })
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
				className: "grid max-w-xl gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwoFactorSection, {}),
					"google" in enabledProviders && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProviderSection, {
						provider: "google",
						animationDelay: .4
					}),
					"github" in enabledProviders && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProviderSection, {
						provider: "github",
						animationDelay: .5
					}),
					"custom" in enabledProviders && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProviderSection, {
						provider: "custom",
						animationDelay: .6,
						name: enabledProviders.custom
					})
				]
			})
		]
	});
}
export { RouteComponent as component };

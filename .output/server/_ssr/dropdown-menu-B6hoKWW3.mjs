import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime, n as Trans, r as useLingui } from "../_libs/lingui__react+react.mjs";
import { m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Image, r as Root, t as Fallback } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { H as t$1, d as e, it as t } from "../_libs/phosphor-icons__react.mjs";
import { a as localeMap, i as loadLocale, n as isLocale, o as setLocaleServerFn } from "./locale-C4um8W31.mjs";
import { t as authClient } from "./client-CBJmU-nl.mjs";
import { a as DropdownMenuItem, c as DropdownMenuSeparator, d as DropdownMenuSubTrigger, f as DropdownMenuTrigger, i as DropdownMenuGroup, l as DropdownMenuSub, o as DropdownMenuRadioGroup, r as DropdownMenuContent, s as DropdownMenuRadioItem, t as DropdownMenu$1, u as DropdownMenuSubContent } from "./dropdown-menu-DJSwXA6E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as useTheme, r as isTheme } from "./provider-_Gy2840Y.mjs";
var import_jsx_runtime = require_jsx_runtime();
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 select-none rounded-full after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full rounded-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
function UserDropdownMenu({ children }) {
	const router = useRouter();
	const { i18n: i18n$1 } = useLingui();
	const { theme, setTheme } = useTheme();
	const { data: session } = authClient.useSession();
	function handleThemeChange(value) {
		if (!isTheme(value)) return;
		setTheme(value);
	}
	async function handleLocaleChange(value) {
		if (!isLocale(value)) return;
		await Promise.all([loadLocale(value), setLocaleServerFn({ data: value })]);
		window.location.reload();
	}
	function handleLogout() {
		const toastId = toast.loading(i18n._({ id: "DZe/N+" }));
		authClient.signOut({ fetchOptions: {
			onSuccess: () => {
				toast.dismiss(toastId);
				router.invalidate();
			},
			onError: ({ error }) => {
				toast.error(error.message, { id: toastId });
			}
		} });
	}
	if (!session?.user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: children({ session })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "start",
		side: "top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vXIe7J" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, {
				className: "max-h-[400px] overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioGroup, {
					value: i18n$1.locale,
					onValueChange: handleLocaleChange,
					children: Object.entries(localeMap).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
						value,
						children: i18n$1.t(label)
					}, value))
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FEr96N" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioGroup, {
				value: theme,
				onValueChange: handleThemeChange,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
					value: "light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1njn7W" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
					value: "dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "pvnfJD" })
				})]
			}) })] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: handleLogout,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "nOhz3x" })]
			})
		]
	})] });
}
export { UserDropdownMenu as i, AvatarFallback as n, AvatarImage as r, Avatar$1 as t };

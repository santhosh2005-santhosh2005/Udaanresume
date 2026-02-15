import { i as require_jsx_runtime, n as Trans, r as useLingui } from "../_libs/lingui__react+react.mjs";
import { u as motion } from "../_libs/framer-motion.mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { In as r, Rt as o } from "../_libs/phosphor-icons__react.mjs";
import "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Combobox } from "./combobox-BKRnq7GA.mjs";
import { t as Label$1 } from "./label-Ce6ENJeJ.mjs";
import { t as Separator$1 } from "./separator-DIlfBRvu.mjs";
import { t as DashboardHeader } from "./header-CApnfpLs.mjs";
import { a as themeMap, i as setThemeServerFn, o as useTheme, r as isTheme } from "./provider-CMSD2_90.mjs";
import { t as LocaleCombobox } from "./combobox-DxCUDS32.mjs";
var import_jsx_runtime = require_jsx_runtime();
function ThemeCombobox(props) {
	const router = useRouter();
	const { i18n } = useLingui();
	const { theme, setTheme } = useTheme();
	const options = Object.entries(themeMap).map(([value, label]) => ({
		value,
		label: i18n.t(label),
		keywords: [i18n.t(label)]
	}));
	const onThemeChange = async (value) => {
		if (!value || !isTheme(value)) return;
		await setThemeServerFn({ data: value });
		setTheme(value);
		router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
		options,
		defaultValue: theme,
		onValueChange: onThemeChange,
		...props
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: o,
				title: i18n._({ id: "Q6hhn8" })
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						className: "mb-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FEr96N" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCombobox, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							className: "mb-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vXIe7J" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleCombobox, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "link",
							className: "h-5 justify-start text-muted-foreground text-xs active:scale-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://crowdin.com/project/reactive-resume",
								target: "_blank",
								rel: "noopener",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cLYXFH" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, { className: "size-3" })]
							})
						})
					]
				})]
			})
		]
	});
}
export { RouteComponent as component };

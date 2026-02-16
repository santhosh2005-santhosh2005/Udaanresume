import { i as require_jsx_runtime, r as useLingui } from "../_libs/lingui__react+react.mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { a as localeMap, i as loadLocale, n as isLocale, o as setLocaleServerFn } from "./locale-DeNUKNpZ.mjs";
import { t as Combobox } from "./combobox-DqfXinLv.mjs";
var import_jsx_runtime = require_jsx_runtime();
var getLocaleOptions = () => {
	return Object.entries(localeMap).map(([value, label]) => ({
		value,
		label: i18n.t(label),
		keywords: [i18n.t(label)]
	}));
};
function LocaleCombobox(props) {
	const { i18n } = useLingui();
	const onLocaleChange = async (value) => {
		if (!value || !isLocale(value)) return;
		await Promise.all([loadLocale(value), setLocaleServerFn({ data: value })]);
		window.location.reload();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
		options: getLocaleOptions(),
		defaultValue: i18n.locale,
		onValueChange: onLocaleChange,
		...props
	});
}
export { getLocaleOptions as n, LocaleCombobox as t };

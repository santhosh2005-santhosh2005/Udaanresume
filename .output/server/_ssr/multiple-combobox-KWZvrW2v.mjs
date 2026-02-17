import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { Sn as e, yn as o } from "../_libs/phosphor-icons__react.mjs";
import { n as useControlledState } from "./get-strict-context-CQJgnSDV.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover$1 } from "./popover-UvYowcN0.mjs";
import { a as CommandInput, c as CommandSeparator, i as CommandGroup, n as Command$1, o as CommandItem, r as CommandEmpty, s as CommandList } from "./combobox-BKRnq7GA.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var CLEAR_COMMAND_VALUE = "__command-clear-multi-select-combobox";
function MultipleCombobox({ options, value, defaultValue, placeholder = i18n._({ id: "O/7I0o" }), searchPlaceholder = i18n._({ id: "YIix5Y" }), emptyMessage = i18n._({ id: "MZbQHL" }), clearLabel = i18n._({ id: "FBIuPX" }), className, buttonProps, onValueChange, onOpenChange, disableClear = false, ...popoverProps }) {
	const [open, setOpen] = import_react.useState(false);
	const { children: buttonChildren, className: buttonClassName, ...buttonRest } = buttonProps ?? {};
	const resolvedDefaultValue = import_react.useMemo(() => defaultValue ? [...defaultValue] : [], [defaultValue]);
	const optionsByStringValue = import_react.useMemo(() => {
		return new Map(options.map((option) => [String(option.value), option]));
	}, [options]);
	const [selectedValues, setSelectedValues] = useControlledState({
		value,
		defaultValue: resolvedDefaultValue,
		onChange: (next) => onValueChange?.(next, next.map((item) => options.find((option) => option.value === item)).filter((option) => Boolean(option)))
	});
	const selectionSet = import_react.useMemo(() => new Set(selectedValues), [selectedValues]);
	const selectedOptions = import_react.useMemo(() => options.filter((option) => selectionSet.has(option.value)), [options, selectionSet]);
	const selectionCount = selectedOptions.length;
	const canClear = !disableClear && selectionCount > 0;
	const toggleOption = import_react.useCallback((option) => {
		if (option.disabled) return;
		setSelectedValues(selectionSet.has(option.value) ? selectedValues.filter((selected) => selected !== option.value) : [...selectedValues, option.value]);
	}, [
		selectionSet,
		selectedValues,
		setSelectedValues
	]);
	const handleSelect = import_react.useCallback((current) => {
		if (current === CLEAR_COMMAND_VALUE) {
			setSelectedValues([]);
			return;
		}
		const option = optionsByStringValue.get(current);
		if (!option) return;
		toggleOption(option);
	}, [
		optionsByStringValue,
		toggleOption,
		setSelectedValues
	]);
	const handleOpenChange = import_react.useCallback((nextOpen) => {
		setOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}, [onOpenChange]);
	const buttonContent = typeof buttonChildren === "function" ? buttonChildren(selectedValues, selectedOptions) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "truncate",
		children: selectionCount > 0 ? `${selectionCount} selected` : placeholder
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
		"aria-hidden": true,
		className: "ms-2 shrink-0 opacity-50"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, {
		open,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				role: "combobox",
				variant: "outline",
				"aria-expanded": open,
				"aria-label": "Multi-select Combobox",
				className: cn("justify-between gap-2 font-normal active:scale-100", buttonClassName),
				...buttonRest,
				children: buttonContent
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			role: "listbox",
			className: cn("w-[260px] p-0", className),
			"aria-multiselectable": "true",
			...popoverProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, { placeholder: searchPlaceholder }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: emptyMessage }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: options.map((option) => {
					const stringValue = String(option.value);
					const isSelected = selectionSet.has(option.value);
					const isDisabled = option.disabled ?? false;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						value: stringValue,
						keywords: option.keywords,
						onSelect: handleSelect,
						disabled: isDisabled,
						"data-selected": isSelected ? "" : void 0,
						"aria-selected": isSelected,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
							"aria-hidden": true,
							className: cn("size-4 shrink-0 transition-opacity", isSelected ? "opacity-100" : "opacity-0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("truncate", isDisabled && "opacity-60"),
							children: option.label
						})]
					}, stringValue);
				}) }),
				canClear ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandItem, {
					value: CLEAR_COMMAND_VALUE,
					onSelect: handleSelect,
					keywords: [],
					"data-selected": void 0,
					"aria-selected": "false",
					children: clearLabel
				}) })] }) : null
			] })] })
		})]
	});
}
export { MultipleCombobox as t };

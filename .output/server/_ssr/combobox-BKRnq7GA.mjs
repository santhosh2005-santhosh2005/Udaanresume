import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { Sn as e, pt as o, yn as o$1 } from "../_libs/phosphor-icons__react.mjs";
import { n as useControlledState } from "./get-strict-context-CQJgnSDV.mjs";
import { t as Input } from "./input-CtC-lcee.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover$1 } from "./popover-UvYowcN0.mjs";
import { n as _e } from "../_libs/cmdk.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group relative flex h-9 w-full min-w-0 items-center rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow] in-data-[slot=combobox-content]:focus-within:border-ring has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-[3px] has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3", className),
		...props
	});
}
var inputGroupAddonVariants = cva("flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 font-medium text-muted-foreground text-sm group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first ps-2 has-[>button]:-ms-1 has-[>kbd]:ms-[-0.15rem]",
		"inline-end": "order-last pe-2 has-[>button]:-me-1 has-[>kbd]:me-[-0.15rem]",
		"block-start": "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
		"block-end": "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		...props,
		type,
		asChild: false,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className)
	});
}
function InputGroupText({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none", className),
		...props
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		"data-slot": "input-group-control",
		className: cn("flex-1 rounded-none border-0 bg-transparent shadow-none hover:bg-secondary/40 focus-visible:bg-secondary/40 aria-invalid:ring-0", className),
		...props
	});
}
function Command$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
		"data-slot": "command",
		className: cn("flex size-full flex-col gap-y-1 overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground", className),
		...props
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "command-input-wrapper",
		className: "p-1 pb-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
			className: "h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:ps-2!",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
				"data-slot": "command-input",
				className: cn("w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className),
				...props
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "size-4 shrink-0 opacity-50" }) })]
		})
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
		"data-slot": "command-list",
		className: cn("no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overflow-x-hidden outline-none", className),
		...props
	});
}
function CommandEmpty({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
		"data-slot": "command-empty",
		className: cn("py-6 text-center text-sm", className),
		...props
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
		"data-slot": "command-group",
		className: cn("overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs", className),
		...props
	});
}
function CommandSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
		"data-slot": "command-separator",
		className: cn("-mx-1 h-px w-auto bg-border", className),
		...props
	});
}
function CommandItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
		"data-slot": "command-item",
		className: cn("group/command-item relative flex cursor-default select-none items-center gap-2 in-data-[slot=dialog-content]:rounded-lg! rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-selected:bg-muted data-selected:text-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-selected:**:[svg]:text-foreground", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, { className: "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" })]
	});
}
function CommandShortcut({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-slot": "command-shortcut",
		className: cn("ml-auto text-muted-foreground text-xs tracking-widest group-data-selected/command-item:text-foreground", className),
		...props
	});
}
function Combobox({ disabled = false, clearable = true, options, value, defaultValue = null, placeholder = i18n._({ id: "O/7I0o" }), searchPlaceholder = i18n._({ id: "YIix5Y" }), emptyMessage = i18n._({ id: "MZbQHL" }), className, buttonProps, onValueChange, ...props }) {
	const { className: buttonClassName, children: buttonChildren, ...buttonRestProps } = buttonProps ?? {};
	const [open, setOpen] = import_react.useState(false);
	const [selectedValue, setSelectedValue] = useControlledState({
		value,
		defaultValue,
		onChange: (next) => onValueChange?.(next, options.find((o) => o.value === next) ?? null)
	});
	const selectedOption = import_react.useMemo(() => {
		return options.find((option) => option.value === selectedValue) ?? null;
	}, [options, selectedValue]);
	const selectedLabel = selectedOption?.label;
	const onSelect = import_react.useCallback((current) => {
		const next = current ?? null;
		if (!clearable && selectedValue === next) {
			setOpen(false);
			return;
		}
		setSelectedValue(selectedValue === next ? null : next);
		setOpen(false);
	}, [
		clearable,
		selectedValue,
		setSelectedValue
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, {
		open,
		onOpenChange: import_react.useCallback((nextOpen) => {
			if (disabled) return;
			setOpen(nextOpen);
		}, [disabled]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				role: "combobox",
				variant: "outline",
				"aria-expanded": open,
				disabled,
				"aria-disabled": disabled,
				tapScale: 1,
				className: cn("font-normal active:scale-100", typeof buttonChildren === "function" ? "" : "justify-between", disabled && "pointer-events-none opacity-60", buttonClassName),
				...buttonRestProps,
				children: typeof buttonChildren === "function" ? buttonChildren(selectedValue, selectedOption) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [selectedLabel ?? placeholder, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { className: "ms-2 shrink-0 opacity-50" })] })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "start",
			"aria-disabled": disabled,
			tabIndex: disabled ? -1 : void 0,
			className: cn("min-w-[200px] p-0", className, disabled && "pointer-events-none select-none opacity-60"),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
				placeholder: searchPlaceholder,
				disabled
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: emptyMessage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: options.map((option) => {
				const isSelected = selectedValue === option.value;
				const isDisabled = option.disabled ?? disabled;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
					value: String(option.value),
					keywords: option.keywords,
					disabled: isDisabled,
					onSelect: isDisabled ? void 0 : onSelect,
					"aria-disabled": isDisabled,
					className: cn(isDisabled && "pointer-events-none opacity-60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {
						"aria-hidden": true,
						className: cn("size-4 shrink-0 transition-opacity", isSelected ? "opacity-100" : "opacity-0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("truncate", isDisabled && "opacity-60"),
						children: option.label
					})]
				}, String(option.value));
			}) })] })] })
		})]
	});
}
export { CommandInput as a, CommandSeparator as c, InputGroupAddon as d, InputGroupButton as f, CommandGroup as i, CommandShortcut as l, InputGroupText as m, Command$1 as n, CommandItem as o, InputGroupInput as p, CommandEmpty as r, CommandList as s, Combobox as t, InputGroup as u };

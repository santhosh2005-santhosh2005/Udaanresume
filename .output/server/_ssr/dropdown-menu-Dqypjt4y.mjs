import { t as cn } from "./style-CcnVTBXE.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { f as AnimatePresence, u as motion } from "../_libs/framer-motion.mjs";
import { Cn as e, _n as o$1, yn as o } from "../_libs/phosphor-icons__react.mjs";
import { n as useControlledState, t as getStrictContext } from "./get-strict-context-BzZxJugn.mjs";
import { a as ItemIndicator2, c as RadioItem2, d as Sub2, f as SubContent2, i as Item2, l as Root2, m as Trigger, n as Content2, o as Portal2, p as SubTrigger2, r as Group2, s as RadioGroup2, t as CheckboxItem2, u as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
var import_jsx_runtime = require_jsx_runtime();
var [DropdownMenuProvider, useDropdownMenu] = getStrictContext("DropdownMenuContext");
var [DropdownMenuSubProvider, useDropdownMenuSub] = getStrictContext("DropdownMenuSubContext");
function DropdownMenu$2(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
			"data-slot": "dropdown-menu",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function DropdownMenuTrigger$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuPortal(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		"data-slot": "dropdown-menu-portal",
		...props
	});
}
function DropdownMenuGroup$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group2, {
		"data-slot": "dropdown-menu-group",
		...props
	});
}
function DropdownMenuSub$1(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub2, {
			"data-slot": "dropdown-menu-sub",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function DropdownMenuRadioGroup$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup2, {
		"data-slot": "dropdown-menu-radio-group",
		...props
	});
}
function DropdownMenuSubTrigger$1({ disabled, textValue, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTrigger2, {
		disabled,
		textValue,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"data-slot": "dropdown-menu-sub-trigger",
			"data-disabled": disabled,
			...props
		})
	});
}
function DropdownMenuSubContent$1({ loop, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, sideOffset, alignOffset, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached, transition = { duration: .2 }, style, container, ...props }) {
	const { isOpen } = useDropdownMenuSub();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, {
		forceMount: true,
		container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
			asChild: true,
			forceMount: true,
			loop,
			onEscapeKeyDown,
			onPointerDownOutside,
			onFocusOutside,
			onInteractOutside,
			sideOffset,
			alignOffset,
			avoidCollisions,
			collisionBoundary,
			collisionPadding,
			arrowPadding,
			sticky,
			hideWhenDetached,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"data-slot": "dropdown-menu-sub-content",
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: .95
				},
				transition,
				style: {
					willChange: "opacity, transform",
					...style
				},
				...props
			}, "dropdown-menu-sub-content")
		})
	}) });
}
function DropdownMenuContent$1({ loop, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, side, sideOffset, align, alignOffset, avoidCollisions, collisionBoundary, collisionPadding, arrowPadding, sticky, hideWhenDetached, transition = { duration: .2 }, style, container, ...props }) {
	const { isOpen } = useDropdownMenu();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, {
		forceMount: true,
		container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
			asChild: true,
			loop,
			onCloseAutoFocus,
			onEscapeKeyDown,
			onPointerDownOutside,
			onFocusOutside,
			onInteractOutside,
			side,
			sideOffset,
			align,
			alignOffset,
			avoidCollisions,
			collisionBoundary,
			collisionPadding,
			arrowPadding,
			sticky,
			hideWhenDetached,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"data-slot": "dropdown-menu-content",
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: .95
				},
				transition,
				style: {
					willChange: "opacity, transform",
					...style
				},
				...props
			}, "dropdown-menu-content")
		})
	}) });
}
function DropdownMenuItem$1({ disabled, onSelect, textValue, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		disabled,
		onSelect,
		textValue,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"data-slot": "dropdown-menu-item",
			"data-disabled": disabled,
			...props
		})
	});
}
function DropdownMenuCheckboxItem$1({ checked, onCheckedChange, disabled, onSelect, textValue, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxItem2, {
		checked,
		onCheckedChange,
		disabled,
		onSelect,
		textValue,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"data-slot": "dropdown-menu-checkbox-item",
			"data-disabled": disabled,
			...props
		})
	});
}
function DropdownMenuRadioItem$1({ value, disabled, onSelect, textValue, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioItem2, {
		value,
		disabled,
		onSelect,
		textValue,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"data-slot": "dropdown-menu-radio-item",
			"data-disabled": disabled,
			...props
		})
	});
}
function DropdownMenuSeparator$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		"data-slot": "dropdown-menu-separator",
		...props
	});
}
function DropdownMenuItemIndicator(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, {
		"data-slot": "dropdown-menu-item-indicator",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, { ...props })
	});
}
function DropdownMenu$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu$2, { ...props });
}
function DropdownMenuTrigger(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger$1, { ...props });
}
function DropdownMenuContent({ sideOffset = 4, className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent$1, {
		sideOffset,
		className: cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none", className),
		...props,
		children
	});
}
function DropdownMenuGroup({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup$1, { ...props });
}
function DropdownMenuItem({ className, inset, variant = "default", disabled, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem$1, {
		disabled,
		"data-inset": inset,
		"data-variant": variant,
		className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-inset:ps-8 data-[variant=destructive]:text-destructive data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!", "data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive data-highlighted:bg-accent data-highlighted:text-accent-foreground dark:data-[variant=destructive]:data-highlighted:bg-destructive/20", className),
		...props
	});
}
function DropdownMenuCheckboxItem({ className, children, checked, disabled, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuCheckboxItem$1, {
		disabled,
		className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", "data-highlighted:bg-accent data-highlighted:text-accent-foreground", className),
		checked,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute start-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItemIndicator, {
				initial: {
					opacity: 0,
					scale: .5
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "size-4" })
			})
		}), children]
	});
}
function DropdownMenuRadioGroup(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioGroup$1, { ...props });
}
function DropdownMenuRadioItem({ className, children, disabled, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioItem$1, {
		disabled,
		className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", "data-highlighted:bg-accent data-highlighted:text-accent-foreground", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute start-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItemIndicator, {
				layoutId: "dropdown-menu-item-indicator-radio",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, { className: "size-2 fill-current" })
			})
		}), children]
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator$1, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function DropdownMenuSub(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSub$1, { ...props });
}
function DropdownMenuSubTrigger({ disabled, className, inset, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger$1, {
		disabled,
		"data-inset": inset,
		className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-inset:ps-8 data-[state=open]:text-accent-foreground", "data-[state=open]:**:data-[slot=chevron]:rotate-90 **:data-[slot=chevron]:transition-transform **:data-[slot=chevron]:duration-300 **:data-[slot=chevron]:ease-in-out", "data-highlighted:bg-accent data-highlighted:text-accent-foreground", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
			"data-slot": "chevron",
			className: "ml-auto size-4"
		})]
	});
}
function DropdownMenuSubContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent$1, {
		className: cn("z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg outline-none", className),
		...props
	});
}
export { DropdownMenuItem as a, DropdownMenuSeparator as c, DropdownMenuSubTrigger as d, DropdownMenuTrigger as f, DropdownMenuGroup as i, DropdownMenuSub as l, DropdownMenuCheckboxItem as n, DropdownMenuRadioGroup as o, DropdownMenuContent as r, DropdownMenuRadioItem as s, DropdownMenu$1 as t, DropdownMenuSubContent as u };

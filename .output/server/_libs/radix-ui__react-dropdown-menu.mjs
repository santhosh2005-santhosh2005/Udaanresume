import { o as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "./lingui__react+react.mjs";
import { s as require_react } from "./@ai-sdk/react+[...].mjs";
import { l as useControllableState, m as Primitive, p as createContextScope, s as useId, y as composeRefs } from "./@radix-ui/react-accordion+[...].mjs";
import { t as composeEventHandlers } from "./radix-ui__primitive.mjs";
import { C as createMenuScope, S as SubTrigger, _ as RadioItem, b as Sub, c as Arrow2, d as Group, f as Item2$1, g as RadioGroup, h as Portal, l as CheckboxItem, m as Label, p as ItemIndicator, s as Anchor2, u as Content2$1, v as Root3, x as SubContent, y as Separator } from "./@radix-ui/react-context-menu+[...].mjs";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DROPDOWN_MENU_NAME = "DropdownMenu";
var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(DROPDOWN_MENU_NAME, [createMenuScope]);
var useMenuScope = createMenuScope();
var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
var DropdownMenu = (props) => {
	const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const triggerRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DROPDOWN_MENU_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuProvider, {
		scope: __scopeDropdownMenu,
		triggerId: useId(),
		triggerRef,
		contentId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
			...menuScope,
			open,
			onOpenChange: setOpen,
			dir,
			modal,
			children
		})
	});
};
DropdownMenu.displayName = DROPDOWN_MENU_NAME;
var TRIGGER_NAME = "DropdownMenuTrigger";
var DropdownMenuTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
	const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor2, {
		asChild: true,
		...menuScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			id: context.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": context.open,
			"aria-controls": context.open ? context.contentId : void 0,
			"data-state": context.open ? "open" : "closed",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			...triggerProps,
			ref: composeRefs(forwardedRef, context.triggerRef),
			onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) {
					context.onOpenToggle();
					if (!context.open) event.preventDefault();
				}
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (disabled) return;
				if (["Enter", " "].includes(event.key)) context.onOpenToggle();
				if (event.key === "ArrowDown") context.onOpenChange(true);
				if ([
					"Enter",
					" ",
					"ArrowDown"
				].includes(event.key)) event.preventDefault();
			})
		})
	});
});
DropdownMenuTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DropdownMenuPortal";
var DropdownMenuPortal = (props) => {
	const { __scopeDropdownMenu, ...portalProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...menuScope,
		...portalProps
	});
};
DropdownMenuPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "DropdownMenuContent";
var DropdownMenuContent = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...contentProps } = props;
	const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const hasInteractedOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		id: context.contentId,
		"aria-labelledby": context.triggerId,
		...menuScope,
		...contentProps,
		ref: forwardedRef,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
			hasInteractedOutsideRef.current = false;
			event.preventDefault();
		}),
		onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
			if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
		}),
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuContent.displayName = CONTENT_NAME;
var GROUP_NAME = "DropdownMenuGroup";
var DropdownMenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...groupProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		...menuScope,
		...groupProps,
		ref: forwardedRef
	});
});
DropdownMenuGroup.displayName = GROUP_NAME;
var LABEL_NAME = "DropdownMenuLabel";
var DropdownMenuLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...labelProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		...menuScope,
		...labelProps,
		ref: forwardedRef
	});
});
DropdownMenuLabel.displayName = LABEL_NAME;
var ITEM_NAME = "DropdownMenuItem";
var DropdownMenuItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2$1, {
		...menuScope,
		...itemProps,
		ref: forwardedRef
	});
});
DropdownMenuItem.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
var DropdownMenuCheckboxItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...checkboxItemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxItem, {
		...menuScope,
		...checkboxItemProps,
		ref: forwardedRef
	});
});
DropdownMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
var DropdownMenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioGroupProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
		...menuScope,
		...radioGroupProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
var DropdownMenuRadioItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...radioItemProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioItem, {
		...menuScope,
		...radioItemProps,
		ref: forwardedRef
	});
});
DropdownMenuRadioItem.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "DropdownMenuItemIndicator";
var DropdownMenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
		...menuScope,
		...itemIndicatorProps,
		ref: forwardedRef
	});
});
DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "DropdownMenuSeparator";
var DropdownMenuSeparator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...separatorProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		...menuScope,
		...separatorProps,
		ref: forwardedRef
	});
});
DropdownMenuSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "DropdownMenuArrow";
var DropdownMenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...arrowProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, {
		...menuScope,
		...arrowProps,
		ref: forwardedRef
	});
});
DropdownMenuArrow.displayName = ARROW_NAME;
var DropdownMenuSub = (props) => {
	const { __scopeDropdownMenu, children, open: openProp, onOpenChange, defaultOpen } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
		...menuScope,
		open,
		onOpenChange: setOpen,
		children
	});
};
var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
var DropdownMenuSubTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subTriggerProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTrigger, {
		...menuScope,
		...subTriggerProps,
		ref: forwardedRef
	});
});
DropdownMenuSubTrigger.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "DropdownMenuSubContent";
var DropdownMenuSubContent = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDropdownMenu, ...subContentProps } = props;
	const menuScope = useMenuScope(__scopeDropdownMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent, {
		...menuScope,
		...subContentProps,
		ref: forwardedRef,
		style: {
			...props.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
DropdownMenuSubContent.displayName = SUB_CONTENT_NAME;
var Root2 = DropdownMenu;
var Trigger = DropdownMenuTrigger;
var Portal2 = DropdownMenuPortal;
var Content2 = DropdownMenuContent;
var Group2 = DropdownMenuGroup;
var Item2 = DropdownMenuItem;
var CheckboxItem2 = DropdownMenuCheckboxItem;
var RadioGroup2 = DropdownMenuRadioGroup;
var RadioItem2 = DropdownMenuRadioItem;
var ItemIndicator2 = DropdownMenuItemIndicator;
var Separator2 = DropdownMenuSeparator;
var Sub2 = DropdownMenuSub;
var SubTrigger2 = DropdownMenuSubTrigger;
var SubContent2 = DropdownMenuSubContent;
export { ItemIndicator2 as a, RadioItem2 as c, Sub2 as d, SubContent2 as f, Item2 as i, Root2 as l, Trigger as m, Content2 as n, Portal2 as o, SubTrigger2 as p, Group2 as r, RadioGroup2 as s, CheckboxItem2 as t, Separator2 as u };

import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { a as Root3, i as Provider, n as Content2, o as Trigger, r as Portal, t as Arrow2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
var import_jsx_runtime = require_jsx_runtime();
function TooltipProvider({ delayDuration = 0, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		"data-slot": "tooltip-provider",
		delayDuration,
		...props
	});
}
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
		"data-slot": "tooltip",
		...props
	}) });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
		"data-slot": "tooltip-content",
		sideOffset,
		className: cn("data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[state=delayed-open]:animate-in data-closed:animate-out data-open:animate-in", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })]
	}) });
}
export { TooltipTrigger as i, TooltipContent as n, TooltipProvider as r, Tooltip$1 as t };

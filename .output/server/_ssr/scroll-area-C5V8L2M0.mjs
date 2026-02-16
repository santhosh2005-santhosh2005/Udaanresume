import { t as cn } from "./style-CcnVTBXE.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
var import_jsx_runtime = require_jsx_runtime();
function ScrollArea$1({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		"data-slot": "scroll-area",
		className: cn("relative", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
				"data-slot": "scroll-area-viewport",
				className: "[&>div]:block! size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
		]
	});
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
		"data-slot": "scroll-area-scrollbar",
		"data-orientation": orientation,
		orientation,
		className: cn("flex touch-none select-none p-px transition-colors data-horizontal:h-2.5 data-vertical:h-full data-vertical:w-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:border-l data-vertical:border-l-transparent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
export { ScrollArea$1 as t };

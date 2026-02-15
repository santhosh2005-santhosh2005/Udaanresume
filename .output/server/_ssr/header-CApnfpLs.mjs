import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { m as SidebarTrigger } from "./sidebar-DpaBOXdy.mjs";
var import_jsx_runtime = require_jsx_runtime();
function DashboardHeader({ title, icon: IconComponent, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex items-center justify-center gap-x-2.5 md:justify-start", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, { className: "absolute start-0 md:hidden" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, {
				weight: "light",
				className: "size-5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-medium text-xl tracking-tight",
				children: title
			})
		]
	});
}
export { DashboardHeader as t };

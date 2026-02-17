import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BrandIcon } from "./brand-icon-Qp-55DA4.mjs";
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-svh w-dvw max-w-sm flex-col justify-center space-y-6 px-4 xs:px-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandIcon, { className: "mb-4 size-20 self-center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
	});
}
export { RouteComponent as component };

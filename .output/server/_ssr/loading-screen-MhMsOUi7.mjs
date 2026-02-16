import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { t as Spinner } from "./spinner-D1lc23Qp.mjs";
var import_jsx_runtime = require_jsx_runtime();
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex h-svh w-svw items-center justify-center gap-x-3 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Z3FXyt" })
		})]
	});
}
export { LoadingScreen as t };

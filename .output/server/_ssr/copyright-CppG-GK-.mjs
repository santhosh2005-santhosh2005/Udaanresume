import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
var import_jsx_runtime = require_jsx_runtime();
function Copyright({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("text-muted-foreground/80 text-xs leading-relaxed", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"© ",
			(/* @__PURE__ */ new Date()).getFullYear(),
			" UdaanResume by UdaanIQ"
		] })
	});
}
export { Copyright as t };

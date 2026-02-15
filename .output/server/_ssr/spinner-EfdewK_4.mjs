import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { R as o } from "../_libs/phosphor-icons__react.mjs";
var import_jsx_runtime = require_jsx_runtime();
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
export { Spinner as t };

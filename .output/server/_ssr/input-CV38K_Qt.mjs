import { t as cn } from "./style-CcnVTBXE.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-secondary/40 focus-visible:border-ring focus-visible:bg-secondary/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
export { Input as t };

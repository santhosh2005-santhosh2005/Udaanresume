import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
var import_jsx_runtime = require_jsx_runtime();
function BrandIcon({ variant = "logo", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/${variant}/dark.svg`,
		alt: "UdaanResume",
		className: cn("hidden size-12 dark:block", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/${variant}/light.svg`,
		alt: "UdaanResume",
		className: cn("block size-12 dark:hidden", className),
		...props
	})] });
}
export { BrandIcon as t };

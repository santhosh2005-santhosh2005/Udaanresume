import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { u as motion } from "../_libs/framer-motion.mjs";
import { t as BrandIcon } from "./brand-icon-Qp-55DA4.mjs";
import { t as Copyright } from "./copyright-CppG-GK-.mjs";
var import_jsx_runtime = require_jsx_runtime();
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.footer, {
		id: "footer",
		className: "p-4 pb-8 md:p-8 md:pb-12",
		initial: { opacity: 0 },
		whileInView: { opacity: 1 },
		viewport: { once: true },
		transition: { duration: .6 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-between gap-y-4 md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandIcon, {
				variant: "logo",
				className: "h-8 w-auto"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copyright, {})]
		})
	});
}
export { Footer };

import { s as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var MOBILE_QUERY = `(max-width: 767px)`;
function useIsMobile() {
	const [isMobile, setIsMobile] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		const mql = window.matchMedia(MOBILE_QUERY);
		const onChange = (e) => {
			setIsMobile(e.matches);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(mql.matches);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse rounded-md bg-muted", className),
		...props
	});
}
export { useIsMobile as n, Skeleton as t };

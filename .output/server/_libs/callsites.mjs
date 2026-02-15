import { t as __commonJSMin } from "../_runtime.mjs";
var require_callsites = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callsites = () => {
		const _prepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, stack) => stack;
		const stack = (/* @__PURE__ */ new Error()).stack.slice(1);
		Error.prepareStackTrace = _prepareStackTrace;
		return stack;
	};
	module.exports = callsites;
	module.exports.default = callsites;
}));
export { require_callsites as t };

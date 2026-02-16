import { o as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function useControlledState(props) {
	const { value, defaultValue, onChange } = props;
	const [state, setInternalState] = (0, import_react.useState)(value !== void 0 ? value : defaultValue);
	(0, import_react.useEffect)(() => {
		if (value !== void 0) setInternalState(value);
	}, [value]);
	return [state, (0, import_react.useCallback)((next, ...args) => {
		setInternalState(next);
		onChange?.(next, ...args);
	}, [onChange])];
}
function getStrictContext(name) {
	const Context = import_react.createContext(void 0);
	const Provider = ({ value, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
		value,
		children
	});
	const useSafeContext = () => {
		const ctx = import_react.useContext(Context);
		if (ctx === void 0) throw new Error(`useContext must be used within ${name ?? "a Provider"}`);
		return ctx;
	};
	return [Provider, useSafeContext];
}
export { useControlledState as n, getStrictContext as t };

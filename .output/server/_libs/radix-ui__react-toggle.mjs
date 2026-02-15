import { s as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "./lingui__react+react.mjs";
import { s as require_react } from "./@ai-sdk/react+[...].mjs";
import { l as useControllableState, m as Primitive } from "./@radix-ui/react-accordion+[...].mjs";
import { t as composeEventHandlers } from "./radix-ui__primitive.mjs";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Toggle";
var Toggle = import_react.forwardRef((props, forwardedRef) => {
	const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
	const [pressed, setPressed] = useControllableState({
		prop: pressedProp,
		onChange: onPressedChange,
		defaultProp: defaultPressed ?? false,
		caller: NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-pressed": pressed,
		"data-state": pressed ? "on" : "off",
		"data-disabled": props.disabled ? "" : void 0,
		...buttonProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => {
			if (!props.disabled) setPressed(!pressed);
		})
	});
});
Toggle.displayName = NAME;
var Root = Toggle;
export { Root as t };

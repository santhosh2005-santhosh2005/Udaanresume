import { s as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "./lingui__react+react.mjs";
import { s as require_react } from "./@ai-sdk/react+[...].mjs";
import { m as Primitive } from "./@radix-ui/react-accordion+[...].mjs";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator = import_react.forwardRef((props, forwardedRef) => {
	const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
	const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
	const ariaOrientation = orientation === "vertical" ? orientation : void 0;
	const semanticProps = decorative ? { role: "none" } : {
		"aria-orientation": ariaOrientation,
		role: "separator"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-orientation": orientation,
		...semanticProps,
		...domProps,
		ref: forwardedRef
	});
});
Separator.displayName = NAME;
function isValidOrientation(orientation) {
	return ORIENTATIONS.includes(orientation);
}
var Root = Separator;
export { Root as t };

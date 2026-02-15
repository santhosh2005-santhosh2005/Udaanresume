import { s as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { u as motion } from "../_libs/framer-motion.mjs";
import { n as useControlledState, t as getStrictContext } from "./get-strict-context-CQJgnSDV.mjs";
import { n as Thumb, t as Root } from "../_libs/radix-ui__react-switch.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var [SwitchProvider, useSwitch] = getStrictContext("SwitchContext");
function Switch$2(props) {
	const [isPressed, setIsPressed] = import_react.useState(false);
	const { checked, defaultChecked, onCheckedChange, ...restProps } = props;
	const [isChecked, setIsChecked] = useControlledState({
		value: checked,
		defaultValue: defaultChecked,
		onChange: onCheckedChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchProvider, {
		value: {
			isChecked,
			setIsChecked,
			isPressed,
			setIsPressed
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			...restProps,
			asChild: true,
			checked: isChecked,
			defaultChecked,
			onCheckedChange: setIsChecked,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				...restProps,
				whileTap: "tap",
				initial: false,
				"data-slot": "switch",
				onTap: () => setIsPressed(false),
				onTapStart: () => setIsPressed(true),
				onTapCancel: () => setIsPressed(false)
			})
		})
	});
}
function SwitchThumb({ pressedAnimation, transition = {
	type: "spring",
	stiffness: 300,
	damping: 25
}, ...props }) {
	const { isPressed } = useSwitch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			layout: true,
			whileTap: "tab",
			"data-slot": "switch-thumb",
			transition,
			animate: isPressed ? pressedAnimation : void 0,
			...props
		})
	});
}
function SwitchIcon({ position, transition = {
	type: "spring",
	bounce: 0
}, ...props }) {
	const { isChecked } = useSwitch();
	const isAnimated = import_react.useMemo(() => {
		if (position === "right") return !isChecked;
		if (position === "left") return isChecked;
		if (position === "thumb") return true;
		return false;
	}, [position, isChecked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		"data-slot": `switch-${position}-icon`,
		animate: isAnimated ? {
			scale: 1,
			opacity: 1
		} : {
			scale: 0,
			opacity: 0
		},
		transition,
		...props
	});
}
function Switch$1({ className, pressedWidth = 20, startIcon, endIcon, thumbIcon, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Switch$2, {
		className: cn("peer relative flex h-5 w-8 shrink-0 items-center justify-start rounded-full border border-transparent px-px shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:justify-end data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
				className: cn("pointer-events-none relative z-10 block size-4 rounded-full bg-background ring-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"),
				pressedAnimation: { width: pressedWidth },
				children: thumbIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchIcon, {
					position: "thumb",
					className: "-translate-1/2 absolute start-1/2 top-1/2 text-neutral-400 dark:text-neutral-500 [&_svg]:size-[9px]",
					children: thumbIcon
				})
			}),
			startIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchIcon, {
				position: "left",
				className: "absolute start-0.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 [&_svg]:size-[9px]",
				children: startIcon
			}),
			endIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchIcon, {
				position: "right",
				className: "absolute end-0.5 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 [&_svg]:size-[9px]",
				children: endIcon
			})
		]
	});
}
export { Switch$1 as t };

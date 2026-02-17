import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { f as AnimatePresence, u as motion } from "../_libs/framer-motion.mjs";
import { n as useControlledState, t as getStrictContext } from "./get-strict-context-CQJgnSDV.mjs";
import { d as Description, f as Overlay, h as Title, m as Root, p as Portal, u as Content } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
var import_jsx_runtime = require_jsx_runtime();
var [DialogProvider, useDialog] = getStrictContext("DialogContext");
function Dialog$2(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			"data-slot": "dialog",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function DialogPortal(props) {
	const { isOpen } = useDialog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		"data-slot": "dialog-portal",
		forceMount: true,
		...props
	}) });
}
function DialogOverlay$1({ transition = {
	duration: .2,
	ease: "easeInOut"
}, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		"data-slot": "dialog-overlay",
		asChild: true,
		forceMount: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				filter: "blur(4px)"
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)"
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)"
			},
			transition,
			...props
		}, "dialog-overlay")
	});
}
function DialogContent$1({ from = "top", onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, transition = {
	type: "spring",
	stiffness: 250,
	damping: 25
}, ...props }) {
	const initialRotation = from === "bottom" || from === "left" ? "20deg" : "-20deg";
	const rotateAxis = from === "top" || from === "bottom" ? "rotateX" : "rotateY";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		asChild: true,
		forceMount: true,
		onOpenAutoFocus,
		onCloseAutoFocus,
		onEscapeKeyDown,
		onPointerDownOutside,
		onInteractOutside,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"data-slot": "dialog-content",
			transition,
			initial: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)",
				transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			...props
		}, "dialog-content")
	});
}
function DialogHeader$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		...props
	});
}
function DialogFooter$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-footer",
		...props
	});
}
function DialogTitle$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		"data-slot": "dialog-title",
		...props
	});
}
function DialogDescription$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
		"data-slot": "dialog-description",
		...props
	});
}
function Dialog$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$2, { ...props });
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-black/50", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
		className: cn("fixed top-[50%] left-[50%] z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-auto rounded-lg border bg-background p-6 shadow-lg sm:max-w-2xl 2xl:max-w-4xl", className),
		...props,
		children
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader$1, {
		className: cn("flex flex-col gap-2 text-center sm:text-start", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter$1, {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-semibold text-lg leading-none", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-muted-foreground text-sm", className),
		...props
	});
}
export { DialogHeader as a, DialogFooter as i, DialogContent as n, DialogTitle as o, DialogDescription as r, Dialog$1 as t };

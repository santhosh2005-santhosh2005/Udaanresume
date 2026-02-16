import { t as cn } from "./style-CcnVTBXE.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { f as AnimatePresence, u as motion } from "../_libs/framer-motion.mjs";
import { n as buttonVariants } from "./button-DJsC0vRs.mjs";
import { n as useControlledState, t as getStrictContext } from "./get-strict-context-BzZxJugn.mjs";
import { a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
var import_jsx_runtime = require_jsx_runtime();
var [AlertDialogProvider, useAlertDialog] = getStrictContext("AlertDialogContext");
function AlertDialog$2(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
			"data-slot": "alert-dialog",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function AlertDialogPortal(props) {
	const { isOpen } = useAlertDialog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		"data-slot": "alert-dialog-portal",
		forceMount: true,
		...props
	}) });
}
function AlertDialogOverlay$1({ transition = {
	duration: .2,
	ease: "easeInOut"
}, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		"data-slot": "alert-dialog-overlay",
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
		}, "alert-dialog-overlay")
	});
}
function AlertDialogContent$1({ from = "top", onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, transition = {
	type: "spring",
	stiffness: 250,
	damping: 25
}, ...props }) {
	const initialRotation = from === "bottom" || from === "left" ? "20deg" : "-20deg";
	const rotateAxis = from === "top" || from === "bottom" ? "rotateX" : "rotateY";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		asChild: true,
		forceMount: true,
		onOpenAutoFocus,
		onCloseAutoFocus,
		onEscapeKeyDown,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"data-slot": "alert-dialog-content",
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
		}, "alert-dialog-content")
	});
}
function AlertDialogCancel$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		"data-slot": "alert-dialog-cancel",
		...props
	});
}
function AlertDialogAction$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		"data-slot": "alert-dialog-action",
		...props
	});
}
function AlertDialogHeader$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		...props
	});
}
function AlertDialogFooter$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		...props
	});
}
function AlertDialogTitle$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		"data-slot": "alert-dialog-title",
		...props
	});
}
function AlertDialogDescription$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		"data-slot": "alert-dialog-description",
		...props
	});
}
function AlertDialog$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog$2, { ...props });
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-black/50", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContent$1, {
		className: cn("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg sm:max-w-lg", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogHeader$1, {
		className: cn("flex flex-col gap-2 text-center sm:text-start", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogFooter$1, {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle$1, {
		className: cn("font-semibold text-lg", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription$1, {
		className: cn("text-muted-foreground text-sm", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction$1, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel$1, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
export { AlertDialogDescription as a, AlertDialogTitle as c, AlertDialogContent as i, AlertDialogAction as n, AlertDialogFooter as o, AlertDialogCancel as r, AlertDialogHeader as s, AlertDialog$1 as t };

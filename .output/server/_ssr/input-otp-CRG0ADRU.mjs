import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-CcnVTBXE.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { ct as e } from "../_libs/phosphor-icons__react.mjs";
import { i as jt, n as Lt } from "../_libs/input-otp.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function InputOTP({ className, containerClassName, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lt, {
		"data-slot": "input-otp",
		containerClassName: cn("cn-input-otp flex items-center has-disabled:opacity-50", containerClassName),
		spellCheck: false,
		className: cn("disabled:cursor-not-allowed", className),
		...props
	});
}
function InputOTPGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-otp-group",
		className: cn("flex items-center rounded-md has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40", className),
		...props
	});
}
function InputOTPSlot({ index, className, ...props }) {
	const { char, hasFakeCaret, isActive } = import_react.useContext(jt)?.slots[index] ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-slot": "input-otp-slot",
		"data-active": isActive,
		className: cn("relative flex size-9 items-center justify-center border-input border-y border-r text-sm shadow-xs outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-4 animate-caret-blink bg-foreground duration-1000" })
		})]
	});
}
function InputOTPSeparator({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-otp-separator",
		className: "mx-3 flex items-center [&_svg:not([class*='size-'])]:size-4",
		role: "separator",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {})
	});
}
export { InputOTPSlot as i, InputOTPGroup as n, InputOTPSeparator as r, InputOTP as t };

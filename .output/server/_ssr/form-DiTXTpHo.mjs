import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-CcnVTBXE.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { g as Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as isPlainObject } from "../_libs/es-toolkit.mjs";
import { t as Label$1 } from "./label-ChncApXE.mjs";
import { n as Controller, o as useFormContext, r as FormProvider, s as useFormState } from "../_libs/@hookform/resolvers+[...].mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var Form = FormProvider;
var FormFieldContext = import_react.createContext({});
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFieldContext.Provider, {
		value: { name: props.name },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, { ...props })
	});
};
var useFormField = () => {
	const fieldContext = import_react.useContext(FormFieldContext);
	const itemContext = import_react.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	};
};
var FormItemContext = import_react.createContext({});
function FormItem({ className, ...props }) {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItemContext.Provider, {
		value: { id },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "form-item",
			className: cn("grid gap-1.5", className),
			...props
		})
	});
}
function FormLabel({ className, ...props }) {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
		"data-slot": "form-label",
		"data-error": !!error,
		className: cn("mb-0.5 data-[error=true]:text-destructive", className),
		htmlFor: formItemId,
		...props
	});
}
function FormControl({ ...props }) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		"data-slot": "form-control",
		id: formItemId,
		"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
		"aria-invalid": !!error,
		...props
	});
}
function FormDescription({ className, ...props }) {
	const { formDescriptionId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-slot": "form-description",
		id: formDescriptionId,
		className: cn("text-muted-foreground text-xs leading-normal", className),
		...props
	});
}
function FormMessage({ className, ...props }) {
	const { error, formMessageId } = useFormField();
	function extractMessage(obj) {
		if (!obj || typeof obj !== "object") return void 0;
		if (isPlainObject(obj) && "message" in obj && typeof obj.message === "string") return obj.message;
		for (const value of Object.values(obj)) {
			const found = extractMessage(value);
			if (found) return found;
		}
	}
	const body = extractMessage(error);
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		id: formMessageId,
		"data-error": !!error,
		"data-slot": "form-message",
		className: cn("line-clamp-1 text-xs", error ? "text-destructive" : "text-muted-foreground", className),
		...props,
		children: body
	});
}
export { FormItem as a, FormField as i, FormControl as n, FormLabel as o, FormDescription as r, FormMessage as s, Form as t };

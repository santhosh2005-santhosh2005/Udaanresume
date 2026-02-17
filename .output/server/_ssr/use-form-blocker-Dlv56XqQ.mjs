import { o as __toESM } from "../_runtime.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as useDialogStore } from "./store-DKZsiGJR.mjs";
import { n as useConfirm } from "./use-confirm-Dh-CT6ud.mjs";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useFormBlocker(form, options) {
	const confirm = useConfirm();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const { isDirty, isSubmitting } = form.formState;
	const shouldBlock = (0, import_react.useCallback)(() => {
		if (options?.shouldBlock) return options.shouldBlock();
		return isDirty && !isSubmitting;
	}, [
		options,
		isDirty,
		isSubmitting
	]);
	const requestClose = (0, import_react.useCallback)(async () => {
		if (!shouldBlock()) {
			closeDialog();
			return;
		}
		if (await confirm(i18n._({ id: "GM1Rg+" }), {
			description: i18n._({ id: "LcV6TH" }),
			confirmText: i18n._({ id: "Mv8CyJ" }),
			cancelText: i18n._({ id: "GCJTE0" })
		})) closeDialog();
	}, [
		shouldBlock,
		closeDialog,
		confirm
	]);
	return {
		requestClose,
		blockEvents: {
			onEscapeKeyDown: (event) => {
				if (shouldBlock()) {
					event.preventDefault();
					requestClose();
				}
			},
			onPointerDownOutside: (event) => {
				if (shouldBlock()) {
					event.preventDefault();
					requestClose();
				}
			},
			onInteractOutside: (event) => {
				if (shouldBlock()) event.preventDefault();
			}
		}
	};
}
export { useFormBlocker as t };

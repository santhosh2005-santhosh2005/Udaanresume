import { s as __toESM } from "../_runtime.mjs";
import { s as require_react } from "./@ai-sdk/react+[...].mjs";
import { t as require_lodash_debounce } from "./lodash.debounce.mjs";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_lodash_debounce = /* @__PURE__ */ __toESM(require_lodash_debounce(), 1);
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useEventListener(eventName, handler, element, options) {
	const savedHandler = (0, import_react.useRef)(handler);
	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
	(0, import_react.useEffect)(() => {
		const targetElement = (element == null ? void 0 : element.current) ?? window;
		if (!(targetElement && targetElement.addEventListener)) return;
		const listener = (event) => {
			savedHandler.current(event);
		};
		targetElement.addEventListener(eventName, listener, options);
		return () => {
			targetElement.removeEventListener(eventName, listener, options);
		};
	}, [
		eventName,
		element,
		options
	]);
}
function useCopyToClipboard() {
	const [copiedText, setCopiedText] = (0, import_react.useState)(null);
	return [copiedText, (0, import_react.useCallback)(async (text) => {
		if (!(navigator == null ? void 0 : navigator.clipboard)) {
			console.warn("Clipboard not supported");
			return false;
		}
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			return false;
		}
	}, [])];
}
function useUnmount(func) {
	const funcRef = (0, import_react.useRef)(func);
	funcRef.current = func;
	(0, import_react.useEffect)(() => () => {
		funcRef.current();
	}, []);
}
function useDebounceCallback(func, delay = 500, options) {
	const debouncedFunc = (0, import_react.useRef)();
	useUnmount(() => {
		if (debouncedFunc.current) debouncedFunc.current.cancel();
	});
	const debounced = (0, import_react.useMemo)(() => {
		const debouncedFuncInstance = (0, import_lodash_debounce.default)(func, delay, options);
		const wrappedFunc = (...args) => {
			return debouncedFuncInstance(...args);
		};
		wrappedFunc.cancel = () => {
			debouncedFuncInstance.cancel();
		};
		wrappedFunc.isPending = () => {
			return !!debouncedFunc.current;
		};
		wrappedFunc.flush = () => {
			return debouncedFuncInstance.flush();
		};
		return wrappedFunc;
	}, [
		func,
		delay,
		options
	]);
	(0, import_react.useEffect)(() => {
		debouncedFunc.current = (0, import_lodash_debounce.default)(func, delay, options);
	}, [
		func,
		delay,
		options
	]);
	return debounced;
}
function useIsClient() {
	const [isClient, setClient] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setClient(true);
	}, []);
	return isClient;
}
function useIsMounted() {
	const isMounted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	return (0, import_react.useCallback)(() => isMounted.current, []);
}
var initialSize = {
	width: void 0,
	height: void 0
};
function useResizeObserver(options) {
	const { ref, box = "content-box" } = options;
	const [{ width, height }, setSize] = (0, import_react.useState)(initialSize);
	const isMounted = useIsMounted();
	const previousSize = (0, import_react.useRef)({ ...initialSize });
	const onResize = (0, import_react.useRef)(void 0);
	onResize.current = options.onResize;
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		if (typeof window === "undefined" || !("ResizeObserver" in window)) return;
		const observer = new ResizeObserver(([entry]) => {
			const boxProp = box === "border-box" ? "borderBoxSize" : box === "device-pixel-content-box" ? "devicePixelContentBoxSize" : "contentBoxSize";
			const newWidth = extractSize(entry, boxProp, "inlineSize");
			const newHeight = extractSize(entry, boxProp, "blockSize");
			if (previousSize.current.width !== newWidth || previousSize.current.height !== newHeight) {
				const newSize = {
					width: newWidth,
					height: newHeight
				};
				previousSize.current.width = newWidth;
				previousSize.current.height = newHeight;
				if (onResize.current) onResize.current(newSize);
				else if (isMounted()) setSize(newSize);
			}
		});
		observer.observe(ref.current, { box });
		return () => {
			observer.disconnect();
		};
	}, [
		box,
		ref,
		isMounted
	]);
	return {
		width,
		height
	};
}
function extractSize(entry, box, sizeType) {
	if (!entry[box]) {
		if (box === "contentBoxSize") return entry.contentRect[sizeType === "inlineSize" ? "width" : "height"];
		return;
	}
	return Array.isArray(entry[box]) ? entry[box][0][sizeType] : entry[box][sizeType];
}
function useToggle(defaultValue) {
	const [value, setValue] = (0, import_react.useState)(!!defaultValue);
	return [
		value,
		(0, import_react.useCallback)(() => {
			setValue((x) => !x);
		}, []),
		setValue
	];
}
var IS_SERVER7 = typeof window === "undefined";
function useWindowSize(options = {}) {
	let { initializeWithValue = true } = options;
	if (IS_SERVER7) initializeWithValue = false;
	const [windowSize, setWindowSize] = (0, import_react.useState)(() => {
		if (initializeWithValue) return {
			width: window.innerWidth,
			height: window.innerHeight
		};
		return {
			width: void 0,
			height: void 0
		};
	});
	const debouncedSetWindowSize = useDebounceCallback(setWindowSize, options.debounceDelay);
	function handleSize() {
		(options.debounceDelay ? debouncedSetWindowSize : setWindowSize)({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}
	useEventListener("resize", handleSize);
	useIsomorphicLayoutEffect(() => {
		handleSize();
	}, []);
	return windowSize;
}
export { useResizeObserver as a, useIsMounted as i, useDebounceCallback as n, useToggle as o, useIsClient as r, useWindowSize as s, useCopyToClipboard as t };

import { s as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { c as createSsrRpc, f as getCookie, o as createServerFn } from "./vendor-react-B2iInial.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var themeSchema = zod_default.union([zod_default.literal("light"), zod_default.literal("dark")]);
var storageKey = "theme";
var defaultTheme = "dark";
var themeMap = {
	light: { id: "1njn7W" },
	dark: { id: "pvnfJD" }
};
function isTheme(theme) {
	return themeSchema.safeParse(theme).success;
}
var getTheme = async () => {
	const cookieTheme = getCookie(storageKey);
	if (!cookieTheme || !isTheme(cookieTheme)) return defaultTheme;
	return cookieTheme;
};
var setThemeServerFn = createServerFn({ method: "POST" }).inputValidator(themeSchema).handler(createSsrRpc("71df1c81de1627f92aad64454efb0cbee53b33c45818d2ce8fd4e7ad46e6b1c9"));
var ThemeContext = (0, import_react.createContext)(null);
function ThemeProvider({ children, theme }) {
	const router = useRouter();
	async function setTheme(value, options = {}) {
		const { playSound = true } = options;
		document.documentElement.classList.toggle("dark", value === "dark");
		await setThemeServerFn({ data: value });
		router.invalidate();
		if (!playSound) return;
		try {
			const soundClip = value === "dark" ? "/sounds/switch-off.mp3" : "/sounds/switch-on.mp3";
			await new Audio(soundClip).play();
		} catch {}
	}
	function toggleTheme(options = {}) {
		setTheme(theme === "dark" ? "light" : "dark", options);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext, {
		value: {
			theme,
			setTheme,
			toggleTheme
		},
		children
	});
}
function useTheme() {
	const value = (0, import_react.use)(ThemeContext);
	if (!value) throw new Error("useTheme must be used within a ThemeProvider");
	return value;
}
export { themeMap as a, setThemeServerFn as i, getTheme as n, useTheme as o, isTheme as r, ThemeProvider as t };

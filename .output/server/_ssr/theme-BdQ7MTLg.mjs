import { H as setCookie, g as createServerRpc, h as createServerFn } from "./vendor-react-5BBUOSGM.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
var themeSchema = zod_default.union([zod_default.literal("light"), zod_default.literal("dark")]);
var storageKey = "theme";
var setThemeServerFn_createServerFn_handler = createServerRpc({
	id: "71df1c81de1627f92aad64454efb0cbee53b33c45818d2ce8fd4e7ad46e6b1c9",
	name: "setThemeServerFn",
	filename: "src/utils/theme.ts"
}, (opts) => setThemeServerFn.__executeServer(opts));
var setThemeServerFn = createServerFn({ method: "POST" }).inputValidator(themeSchema).handler(setThemeServerFn_createServerFn_handler, async ({ data }) => {
	setCookie(storageKey, data);
});
export { setThemeServerFn_createServerFn_handler };

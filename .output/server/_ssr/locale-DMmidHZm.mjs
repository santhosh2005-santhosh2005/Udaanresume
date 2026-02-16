import { H as setCookie, g as createServerRpc, h as createServerFn } from "./vendor-react-5BBUOSGM.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
var localeSchema = zod_default.union([
	zod_default.literal("af-ZA"),
	zod_default.literal("am-ET"),
	zod_default.literal("ar-SA"),
	zod_default.literal("az-AZ"),
	zod_default.literal("bg-BG"),
	zod_default.literal("bn-BD"),
	zod_default.literal("ca-ES"),
	zod_default.literal("cs-CZ"),
	zod_default.literal("da-DK"),
	zod_default.literal("de-DE"),
	zod_default.literal("el-GR"),
	zod_default.literal("en-US"),
	zod_default.literal("es-ES"),
	zod_default.literal("fa-IR"),
	zod_default.literal("fi-FI"),
	zod_default.literal("fr-FR"),
	zod_default.literal("he-IL"),
	zod_default.literal("hi-IN"),
	zod_default.literal("hu-HU"),
	zod_default.literal("id-ID"),
	zod_default.literal("it-IT"),
	zod_default.literal("ja-JP"),
	zod_default.literal("km-KH"),
	zod_default.literal("kn-IN"),
	zod_default.literal("ko-KR"),
	zod_default.literal("lt-LT"),
	zod_default.literal("lv-LV"),
	zod_default.literal("ml-IN"),
	zod_default.literal("mr-IN"),
	zod_default.literal("ms-MY"),
	zod_default.literal("ne-NP"),
	zod_default.literal("nl-NL"),
	zod_default.literal("no-NO"),
	zod_default.literal("or-IN"),
	zod_default.literal("pl-PL"),
	zod_default.literal("pt-BR"),
	zod_default.literal("pt-PT"),
	zod_default.literal("ro-RO"),
	zod_default.literal("ru-RU"),
	zod_default.literal("sk-SK"),
	zod_default.literal("sq-AL"),
	zod_default.literal("sr-SP"),
	zod_default.literal("sv-SE"),
	zod_default.literal("ta-IN"),
	zod_default.literal("te-IN"),
	zod_default.literal("th-TH"),
	zod_default.literal("tr-TR"),
	zod_default.literal("uk-UA"),
	zod_default.literal("uz-UZ"),
	zod_default.literal("vi-VN"),
	zod_default.literal("zh-CN"),
	zod_default.literal("zh-TW"),
	zod_default.literal("zu-ZA")
]);
var storageKey = "locale";
var setLocaleServerFn_createServerFn_handler = createServerRpc({
	id: "14080f89ae495ac5a5d573b2a10df3d783b0f8d025c02f37771c42e9f7e4faa7",
	name: "setLocaleServerFn",
	filename: "src/utils/locale.ts"
}, (opts) => setLocaleServerFn.__executeServer(opts));
var setLocaleServerFn = createServerFn({ method: "POST" }).inputValidator(localeSchema).handler(setLocaleServerFn_createServerFn_handler, async ({ data }) => {
	setCookie(storageKey, data);
});
export { setLocaleServerFn_createServerFn_handler };

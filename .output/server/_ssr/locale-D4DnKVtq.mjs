import { t as i18n } from "../_libs/lingui__core.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { c as createSsrRpc, f as getCookie, o as createServerFn } from "./vendor-react-B2iInial.mjs";
var _rolldown_dynamic_import_helper_default = (glob, path, segments) => {
	const query = path.lastIndexOf("?");
	const v = glob[query === -1 || query < path.lastIndexOf("/") ? path : path.slice(0, query)];
	if (v) return typeof v === "function" ? v() : Promise.resolve(v);
	return new Promise((_, reject) => {
		(typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path + (path.split("/").length !== segments ? ". Note that variables only represent file names one level deep." : ""))));
	});
};
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
var defaultLocale = "en-US";
var localeMap = {
	"af-ZA": { id: "1Cox/a" },
	"am-ET": { id: "UV0J8D" },
	"ar-SA": { id: "8HV3WN" },
	"az-AZ": { id: "/IkoRr" },
	"bg-BG": { id: "KhEBDR" },
	"bn-BD": { id: "Hds3Bq" },
	"ca-ES": { id: "M1RLfx" },
	"cs-CZ": { id: "w9VTXG" },
	"da-DK": { id: "Fo2vDn" },
	"de-DE": { id: "DDcvSo" },
	"el-GR": { id: "CZXzs4" },
	"en-US": { id: "lYGfRP" },
	"es-ES": { id: "65A04M" },
	"fa-IR": { id: "JFI3iH" },
	"fi-FI": { id: "USZ2N6" },
	"fr-FR": { id: "nLC6tu" },
	"he-IL": { id: "3oTCgM" },
	"hi-IN": { id: "tGjibo" },
	"hu-HU": { id: "mkWad2" },
	"id-ID": { id: "BQukYF" },
	"it-IT": { id: "Lj7sBL" },
	"ja-JP": { id: "dFtidv" },
	"km-KH": { id: "Fb6WVr" },
	"kn-IN": { id: "ffJEXe" },
	"ko-KR": { id: "h6S9Yz" },
	"lt-LT": { id: "Ot2qtY" },
	"lv-LV": { id: "/0YsGP" },
	"ml-IN": { id: "WQrafy" },
	"mr-IN": { id: "vKSpmV" },
	"ms-MY": { id: "tF97tn" },
	"ne-NP": { id: "3v9KAT" },
	"nl-NL": { id: "KIjvtr" },
	"no-NO": { id: "1IipHp" },
	"or-IN": { id: "S8nPbQ" },
	"pl-PL": { id: "trnWaw" },
	"pt-BR": { id: "R7+D0/" },
	"pt-PT": { id: "512Uma" },
	"ro-RO": { id: "uJc01W" },
	"ru-RU": { id: "nji0/X" },
	"sk-SK": { id: "paESr6" },
	"sq-AL": { id: "pVxf7b" },
	"sr-SP": { id: "9aBtdW" },
	"sv-SE": { id: "UaISq3" },
	"ta-IN": { id: "fb427h" },
	"te-IN": { id: "2SnOmG" },
	"th-TH": { id: "SUr44j" },
	"tr-TR": { id: "Kz91g/" },
	"uk-UA": { id: "V9+2pH" },
	"uz-UZ": { id: "b1dG47" },
	"vi-VN": { id: "fROFIL" },
	"zh-CN": { id: "6imsQS" },
	"zh-TW": { id: "DM4gBB" },
	"zu-ZA": { id: "+v7Dt7" }
};
function isLocale(locale) {
	return localeSchema.safeParse(locale).success;
}
var RTL_LANGUAGES = new Set([
	"ar",
	"ckb",
	"dv",
	"fa",
	"he",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function isRTL(locale) {
	const language = locale.split("-")[0].toLowerCase();
	return RTL_LANGUAGES.has(language);
}
var getLocale = async () => {
	const cookieLocale = getCookie(storageKey);
	if (!cookieLocale || !isLocale(cookieLocale)) return defaultLocale;
	return cookieLocale;
};
var setLocaleServerFn = createServerFn({ method: "POST" }).inputValidator(localeSchema).handler(createSsrRpc("14080f89ae495ac5a5d573b2a10df3d783b0f8d025c02f37771c42e9f7e4faa7"));
var loadLocale = async (locale) => {
	if (!isLocale(locale)) locale = defaultLocale;
	const { messages } = await _rolldown_dynamic_import_helper_default(/* @__PURE__ */ Object.assign({
		"../../locales/af-ZA.po": () => import("./af-ZA-C13UsWk4.mjs"),
		"../../locales/am-ET.po": () => import("./am-ET-cgWgomKw.mjs"),
		"../../locales/ar-SA.po": () => import("./ar-SA-DpQvqAry.mjs"),
		"../../locales/az-AZ.po": () => import("./az-AZ-BquxlZMB.mjs"),
		"../../locales/bg-BG.po": () => import("./bg-BG-D6xNJfRt.mjs"),
		"../../locales/bn-BD.po": () => import("./bn-BD-CmCc9v3s.mjs"),
		"../../locales/ca-ES.po": () => import("./ca-ES-C8po8Kvr.mjs"),
		"../../locales/cs-CZ.po": () => import("./cs-CZ-DOdSe-ww.mjs"),
		"../../locales/da-DK.po": () => import("./da-DK-CrUCbKxS.mjs"),
		"../../locales/de-DE.po": () => import("./de-DE-Dz4qxFzB.mjs"),
		"../../locales/el-GR.po": () => import("./el-GR-BrKy53HY.mjs"),
		"../../locales/en-US.po": () => import("./en-US-BGOMNueV.mjs"),
		"../../locales/es-ES.po": () => import("./es-ES-BC5hwaif.mjs"),
		"../../locales/fa-IR.po": () => import("./fa-IR-DYTZ3Q0w.mjs"),
		"../../locales/fi-FI.po": () => import("./fi-FI-jmTaPMic.mjs"),
		"../../locales/fr-FR.po": () => import("./fr-FR-2-Gfi0ty.mjs"),
		"../../locales/he-IL.po": () => import("./he-IL-4CVkobog.mjs"),
		"../../locales/hi-IN.po": () => import("./hi-IN-D5_dYpfl.mjs"),
		"../../locales/hu-HU.po": () => import("./hu-HU-CmidjQhG.mjs"),
		"../../locales/id-ID.po": () => import("./id-ID-CD1uYF_V.mjs"),
		"../../locales/it-IT.po": () => import("./it-IT-DMr-yCsI.mjs"),
		"../../locales/ja-JP.po": () => import("./ja-JP-C_Vt7VKV.mjs"),
		"../../locales/km-KH.po": () => import("./km-KH-CIdW7WmQ.mjs"),
		"../../locales/kn-IN.po": () => import("./kn-IN-B36Bs5Mw.mjs"),
		"../../locales/ko-KR.po": () => import("./ko-KR-DMlzo07q.mjs"),
		"../../locales/lt-LT.po": () => import("./lt-LT-B-1w50tj.mjs"),
		"../../locales/lv-LV.po": () => import("./lv-LV-YG2We5hj.mjs"),
		"../../locales/ml-IN.po": () => import("./ml-IN-BrVNJb0R.mjs"),
		"../../locales/mr-IN.po": () => import("./mr-IN-CZ_y84Bl.mjs"),
		"../../locales/ms-MY.po": () => import("./ms-MY-Cq8Bee43.mjs"),
		"../../locales/ne-NP.po": () => import("./ne-NP-BOJ8wbDB.mjs"),
		"../../locales/nl-NL.po": () => import("./nl-NL-DZjv3_8Q.mjs"),
		"../../locales/no-NO.po": () => import("./no-NO-2TOxc3fp.mjs"),
		"../../locales/or-IN.po": () => import("./or-IN-C4y0rFsn.mjs"),
		"../../locales/pl-PL.po": () => import("./pl-PL-CO2S-nI5.mjs"),
		"../../locales/pt-BR.po": () => import("./pt-BR-RUTf8mH2.mjs"),
		"../../locales/pt-PT.po": () => import("./pt-PT-B-HXSzKb.mjs"),
		"../../locales/ro-RO.po": () => import("./ro-RO-CCdqNq0X.mjs"),
		"../../locales/ru-RU.po": () => import("./ru-RU-VVB2SBrP.mjs"),
		"../../locales/sk-SK.po": () => import("./sk-SK-BCDW3QJj.mjs"),
		"../../locales/sl-SI.po": () => import("./sl-SI-B5FeNrQU.mjs"),
		"../../locales/sq-AL.po": () => import("./sq-AL-pKGyYQg8.mjs"),
		"../../locales/sr-SP.po": () => import("./sr-SP-DHbPeyAo.mjs"),
		"../../locales/sv-SE.po": () => import("./sv-SE-CwO-M5VY.mjs"),
		"../../locales/ta-IN.po": () => import("./ta-IN-T0BZEEls.mjs"),
		"../../locales/te-IN.po": () => import("./te-IN-Ce0scWEF.mjs"),
		"../../locales/th-TH.po": () => import("./th-TH-OWv_FnQc.mjs"),
		"../../locales/tr-TR.po": () => import("./tr-TR-4Jz_Ua8o.mjs"),
		"../../locales/uk-UA.po": () => import("./uk-UA-BnJzvmGH.mjs"),
		"../../locales/uz-UZ.po": () => import("./uz-UZ-HTjYx8NT.mjs"),
		"../../locales/vi-VN.po": () => import("./vi-VN-DawzQV4y.mjs"),
		"../../locales/zh-CN.po": () => import("./zh-CN-CvHxwOzY.mjs"),
		"../../locales/zh-TW.po": () => import("./zh-TW-Dg-Z3oif.mjs"),
		"../../locales/zu-ZA.po": () => import("./zu-ZA-QfDD5slh.mjs")
	}), `../../locales/${locale}.po`, 4);
	i18n.loadAndActivate({
		locale,
		messages
	});
};
export { localeMap as a, loadLocale as i, isLocale as n, setLocaleServerFn as o, isRTL as r, getLocale as t };

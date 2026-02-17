import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { f as getCookie, o as createServerFn, s as createServerRpc, v as setCookie } from "./vendor-react-DpiQ1Spv.mjs";
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var getDashboardSidebarServerFn_createServerFn_handler = createServerRpc({
	id: "513aca5e0aecd5ef992128f5d4c9f895e12f04155f3f4abd4b56c78ca99ffe64",
	name: "getDashboardSidebarServerFn",
	filename: "src/routes/dashboard/-components/functions.ts"
}, (opts) => getDashboardSidebarServerFn.__executeServer(opts));
var getDashboardSidebarServerFn = createServerFn({ method: "GET" }).handler(getDashboardSidebarServerFn_createServerFn_handler, async () => {
	return getCookie(SIDEBAR_COOKIE_NAME) !== "false";
});
var setDashboardSidebarServerFn_createServerFn_handler = createServerRpc({
	id: "0a9b531e4949df5a7e5b01de45fa3f757b2e20ce8fda163d34303c4021aaf35e",
	name: "setDashboardSidebarServerFn",
	filename: "src/routes/dashboard/-components/functions.ts"
}, (opts) => setDashboardSidebarServerFn.__executeServer(opts));
var setDashboardSidebarServerFn = createServerFn({ method: "POST" }).inputValidator(zod_default.boolean()).handler(setDashboardSidebarServerFn_createServerFn_handler, async ({ data }) => {
	setCookie(SIDEBAR_COOKIE_NAME, data.toString());
});
export { getDashboardSidebarServerFn_createServerFn_handler, setDashboardSidebarServerFn_createServerFn_handler };

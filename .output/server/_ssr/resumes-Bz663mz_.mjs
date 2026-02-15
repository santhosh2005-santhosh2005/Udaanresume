import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { f as getCookie, o as createServerFn, s as createServerRpc, v as setCookie } from "./vendor-react-B2iInial.mjs";
var RESUMES_VIEW_COOKIE_NAME = "resumes_view";
var viewSchema = zod_default.enum(["grid", "list"]).catch("grid");
var setViewServerFn_createServerFn_handler = createServerRpc({
	id: "756c704a65dc0d34a819db91bfae51022d981bb53c6ad8906dba70c85f0a9c84",
	name: "setViewServerFn",
	filename: "src/routes/dashboard/resumes/index.tsx"
}, (opts) => setViewServerFn.__executeServer(opts));
var setViewServerFn = createServerFn({ method: "POST" }).inputValidator(viewSchema).handler(setViewServerFn_createServerFn_handler, async ({ data }) => {
	setCookie(RESUMES_VIEW_COOKIE_NAME, JSON.stringify(data));
});
var getViewServerFn_createServerFn_handler = createServerRpc({
	id: "4b20519717d2ba2f6679a73ed58f69487c7fe8e6cc9cbbf048dd213fa980a675",
	name: "getViewServerFn",
	filename: "src/routes/dashboard/resumes/index.tsx"
}, (opts) => getViewServerFn.__executeServer(opts));
var getViewServerFn = createServerFn({ method: "GET" }).handler(getViewServerFn_createServerFn_handler, async () => {
	const view = getCookie(RESUMES_VIEW_COOKIE_NAME);
	if (!view) return "grid";
	return viewSchema.parse(JSON.parse(view));
});
export { getViewServerFn_createServerFn_handler, setViewServerFn_createServerFn_handler };

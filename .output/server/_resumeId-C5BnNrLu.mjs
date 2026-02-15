import { c as lazyRouteComponent, l as createFileRoute, v as redirect } from "./_libs/@tanstack/react-router+[...].mjs";
import { Br as string, Dr as object } from "./_libs/@ai-sdk/anthropic+[...].mjs";
import { a as env, h as verifyPrinterToken, o as getORPCClient } from "./_ssr/client-C81uIMtx.mjs";
import { t as zodValidator } from "./_libs/tanstack__zod-adapter.mjs";
var $$splitComponentImporter = () => import("./_resumeId-pz2fgaXC.mjs");
var searchSchema = object({ token: string().catch("") });
var Route = createFileRoute("/printer/$resumeId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: zodValidator(searchSchema),
	beforeLoad: async ({ params, search }) => {
		if (env.FLAG_DEBUG_PRINTER) return;
		try {
			if (verifyPrinterToken(search.token) !== params.resumeId) throw new Error();
		} catch {
			throw redirect({
				to: "/",
				search: {},
				throw: true
			});
		}
	},
	loader: async ({ params }) => {
		return { resume: await getORPCClient().resume.getByIdForPrinter({ id: params.resumeId }) };
	}
});
export { Route as t };

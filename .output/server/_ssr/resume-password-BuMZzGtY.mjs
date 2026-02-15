import { c as lazyRouteComponent, g as SearchParamError, l as createFileRoute, v as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as zodValidator } from "../_libs/tanstack__zod-adapter.mjs";
var $$splitComponentImporter = () => import("./resume-password-CC5IyeKS.mjs");
var searchSchema = zod_default.object({ redirect: zod_default.string().min(1).regex(/^\/[^/]+\/[^/]+$/) });
var Route = createFileRoute("/auth/resume-password")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: zodValidator(searchSchema),
	onError: (error) => {
		if (error instanceof SearchParamError) throw redirect({ to: "/" });
	}
});
zod_default.object({ password: zod_default.string().min(6).max(64) });
export { Route as t };

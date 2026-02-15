import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stripSearchParams } from "../_libs/tanstack__router-core.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { c as createSsrRpc, o as createServerFn } from "./vendor-react-B2iInial.mjs";
import { t as zodValidator } from "../_libs/tanstack__zod-adapter.mjs";
var $$splitComponentImporter = () => import("./resumes-DOvuKtB_.mjs");
var searchSchema = zod_default.object({
	tags: zod_default.array(zod_default.string()).default([]),
	sort: zod_default.enum([
		"lastUpdatedAt",
		"createdAt",
		"name"
	]).default("lastUpdatedAt")
});
var Route = createFileRoute("/dashboard/resumes/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: zodValidator(searchSchema),
	search: { middlewares: [stripSearchParams({
		tags: [],
		sort: "lastUpdatedAt"
	})] },
	loader: async () => {
		return { view: await getViewServerFn() };
	}
});
var getViewServerFn = createServerFn({ method: "GET" }).handler(createSsrRpc("4b20519717d2ba2f6679a73ed58f69487c7fe8e6cc9cbbf048dd213fa980a675"));
export { Route as t };

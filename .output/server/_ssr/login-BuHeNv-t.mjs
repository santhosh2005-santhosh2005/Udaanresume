import { c as lazyRouteComponent, l as createFileRoute, v as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
var $$splitComponentImporter = () => import("./login-eZ9vr9oy.mjs");
var Route = createFileRoute("/auth/login")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	beforeLoad: async ({ context }) => {
		if (context.session) throw redirect({
			to: "/dashboard",
			replace: true
		});
		return { session: null };
	}
});
zod_default.object({
	identifier: zod_default.string().trim().toLowerCase(),
	password: zod_default.string().trim().min(6).max(64)
});
export { Route as t };

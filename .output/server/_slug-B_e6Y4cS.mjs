import { c as lazyRouteComponent, l as createFileRoute, v as redirect, y as notFound } from "./_libs/@tanstack/react-router+[...].mjs";
import { u as orpc } from "./_ssr/client-C81uIMtx.mjs";
import { d as ORPCError } from "./_libs/@orpc/client+[...].mjs";
var $$splitComponentImporter = () => import("./_slug-BNIoBQXz.mjs");
var Route = createFileRoute("/$username/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ context, params: { username, slug } }) => {
		try {
			if (username === ".well-known") throw notFound();
			return { resume: await context.queryClient.ensureQueryData(orpc.resume.getBySlug.queryOptions({ input: {
				username,
				slug
			} })) };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.resume.name} - UdaanResume` : "UdaanResume" }] }),
	onError: (error) => {
		if (error instanceof ORPCError && error.code === "NEED_PASSWORD") {
			const data = error.data;
			const username = data?.username;
			const slug = data?.slug;
			if (username && slug) throw redirect({
				to: "/auth/resume-password",
				search: { redirect: `/${username}/${slug}` }
			});
		}
		throw notFound();
	}
});
export { Route as t };

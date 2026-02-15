import { n as HTTPError, o as toRequest } from "../_libs/h3+srvx.mjs";
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = (globalThis.__nitro_vite_envs__ || {})[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
export { ssrRenderer as default };

import { o as __toESM } from "./_runtime.mjs";
import { i as require_jsx_runtime } from "./_libs/lingui__react+react.mjs";
import { s as require_react } from "./_libs/@ai-sdk/react+[...].mjs";
import "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as LoadingScreen } from "./_ssr/loading-screen-MhMsOUi7.mjs";
import { o as useResumeStore } from "./_ssr/resume-DWS31J0Q.mjs";
import { t as Route } from "./_resumeId-Ca7RtRl4.mjs";
import { t as ResumePreview } from "./_ssr/preview-CdSJoNC8.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function RouteComponent() {
	const { resume } = Route.useLoaderData();
	const isReady = useResumeStore((state) => state.isReady);
	const initialize = useResumeStore((state) => state.initialize);
	(0, import_react.useEffect)(() => {
		if (!resume) return;
		initialize(resume);
		return () => initialize(null);
	}, [resume, initialize]);
	if (!isReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreview, { pageClassName: "print:w-full!" });
}
export { RouteComponent as component };

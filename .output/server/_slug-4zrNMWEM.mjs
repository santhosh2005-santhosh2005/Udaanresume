import { o as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/style-CcnVTBXE.mjs";
import { i as require_jsx_runtime, n as Trans } from "./_libs/lingui__react+react.mjs";
import { s as require_react } from "./_libs/@ai-sdk/react+[...].mjs";
import { t as Button } from "./_ssr/button-DJsC0vRs.mjs";
import { en as e } from "./_libs/phosphor-icons__react.mjs";
import "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Spinner } from "./_ssr/spinner-D1lc23Qp.mjs";
import { u as orpc } from "./_ssr/client-B0hja1xN.mjs";
import { t as LoadingScreen } from "./_ssr/loading-screen-MhMsOUi7.mjs";
import { o as useResumeStore } from "./_ssr/resume-DWS31J0Q.mjs";
import { t as ResumePreview } from "./_ssr/preview-CdSJoNC8.mjs";
import { t as downloadFromUrl } from "./_ssr/file-B01-m1Oc.mjs";
import { r as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { t as Route } from "./_slug-CMW8qSoc.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function RouteComponent() {
	const { username, slug } = Route.useParams();
	const isReady = useResumeStore((state) => state.isReady);
	const initialize = useResumeStore((state) => state.initialize);
	const { data: resume } = useQuery(orpc.resume.getBySlug.queryOptions({ input: {
		username,
		slug
	} }));
	const { mutateAsync: printResumeAsPDF, isPending: isPrinting } = useMutation(orpc.printer.printResumeAsPDF.mutationOptions());
	(0, import_react.useEffect)(() => {
		if (!resume) return;
		initialize(resume);
		return () => initialize(null);
	}, [resume, initialize]);
	const handleDownload = (0, import_react.useCallback)(async () => {
		if (!resume) return;
		const { url } = await printResumeAsPDF({ id: resume.id });
		downloadFromUrl(url, `resume-${resume.name}.pdf`);
	}, [resume, printResumeAsPDF]);
	if (!isReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto max-w-[210mm]", "print:m-0 print:block print:max-w-full print:px-0", "md:my-4 md:px-4"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreview, { pageClassName: "print:w-full! w-full max-w-full" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "lg",
		variant: "secondary",
		disabled: isPrinting,
		className: "fixed end-4 bottom-4 z-50 hidden rounded-full px-4 md:inline-flex print:hidden",
		onClick: handleDownload,
		children: [isPrinting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), isPrinting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cCfxH1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "mzI/c+" })]
	})] });
}
export { RouteComponent as component };

import { i as slugify } from "./string-De3qsJTq.mjs";
function getReadableTimestamp(now) {
	return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
}
function generateFilename(prefix, extension) {
	const now = /* @__PURE__ */ new Date();
	return `${slugify(prefix)}_${getReadableTimestamp(now)}${extension ? `.${extension}` : ""}`;
}
function downloadWithAnchor(blob, filename) {
	const a = document.createElement("a");
	const url = URL.createObjectURL(blob);
	a.href = url;
	a.rel = "noopener";
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => URL.revokeObjectURL(url), 500);
}
async function downloadFromUrl(url, filename) {
	downloadWithAnchor(await (await fetch(url)).blob(), filename);
}
export { downloadWithAnchor as n, generateFilename as r, downloadFromUrl as t };

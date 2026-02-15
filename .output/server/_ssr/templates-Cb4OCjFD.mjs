import { s as __toESM } from "../_runtime.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { u as motion } from "../_libs/framer-motion.mjs";
import { t as templates } from "./data-BgP8BYCQ.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function TemplateItem({ metadata }) {
	const [imageLoaded, setImageLoaded] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "group relative shrink-0",
		initial: {
			scale: 1,
			zIndex: 10
		},
		whileHover: {
			scale: 1.08,
			zIndex: 20
		},
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 25
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-page w-48 overflow-hidden rounded-lg border bg-card shadow-lg transition-all duration-300 group-hover:shadow-2xl sm:w-56 md:w-64 lg:w-72",
			children: [
				!imageLoaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-muted/50 to-muted animate-pulse" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: metadata.imageUrl,
					alt: metadata.name,
					loading: "lazy",
					decoding: "async",
					onLoad: () => setImageLoaded(true),
					className: `size-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute start-0 end-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-white drop-shadow-lg",
						children: metadata.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
			]
		})
	});
}
function MarqueeRow({ templates, rowId, direction, duration = 40 }) {
	const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "flex gap-x-4 will-change-transform sm:gap-x-6",
		animate: { x: animateX },
		transition: { x: {
			repeat: Infinity,
			repeatType: "loop",
			duration,
			ease: "linear"
		} },
		children: templates.map(([template, metadata], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateItem, { metadata }, `${rowId}-${template}-${index}`))
	});
}
function Templates() {
	const { row1, row2 } = (0, import_react.useMemo)(() => {
		const entries = Object.entries(templates);
		const half = Math.ceil(entries.length / 2);
		const firstHalf = entries.slice(0, half);
		const secondHalf = entries.slice(half);
		return {
			row1: [...firstHalf, ...firstHalf],
			row2: [...secondHalf, ...secondHalf]
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "templates",
		className: "overflow-hidden border-t-0! p-4 md:p-8 xl:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "space-y-4",
			initial: {
				opacity: 0,
				y: 20
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: { duration: .6 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-2xl tracking-tight md:text-4xl xl:text-5xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "iTylMl" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted-foreground leading-relaxed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "P7uCyf" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mt-8 -rotate-3 py-8 sm:-rotate-4 lg:mt-0 lg:-rotate-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[280px] flex-col gap-y-4 sm:min-h-[320px] sm:gap-y-6 md:min-h-[380px] lg:min-h-[420px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeRow, {
					templates: row1,
					rowId: "row1",
					direction: "left",
					duration: 45
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeRow, {
					templates: row2,
					rowId: "row2",
					direction: "right",
					duration: 50
				})]
			})
		})]
	});
}
export { Templates };

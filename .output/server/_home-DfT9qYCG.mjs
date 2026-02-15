import { s as __toESM } from "./_runtime.mjs";
import { i as require_jsx_runtime, n as Trans } from "./_libs/lingui__react+react.mjs";
import { s as require_react } from "./_libs/@ai-sdk/react+[...].mjs";
import { u as motion } from "./_libs/framer-motion.mjs";
import { t as Button } from "./_ssr/button-DEtZbRiH.mjs";
import { t as CometCard } from "./_ssr/comet-card-C6tyDUZq.mjs";
import { d as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "./_libs/lingui__core.mjs";
import { In as r } from "./_libs/phosphor-icons__react.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var Spotlight = ({ duration = 7, gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)", gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)", gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)", width = 560, height = 1380, smallWidth = 240, translateY = -350, xOffset = 100 }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 1.5 },
		className: "pointer-events-none absolute inset-0 h-full w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			animate: { x: [
				0,
				xOffset,
				0
			] },
			transition: {
				duration,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut"
			},
			className: "pointer-events-none absolute start-0 top-0 z-40 h-svh w-svw",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute start-0 top-0",
					style: {
						width: `${width}px`,
						height: `${height}px`,
						background: gradientFirst,
						transform: `translateY(${translateY}px) rotate(-45deg)`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute start-0 top-0 origin-top-left",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientSecond,
						transform: "rotate(-45deg) translate(5%, -50%)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute start-0 top-0 origin-top-left",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientThird,
						transform: "rotate(-45deg) translate(-180%, -70%)"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			animate: { x: [
				0,
				-xOffset,
				0
			] },
			className: "pointer-events-none absolute end-0 top-0 z-40 h-svh w-svw",
			transition: {
				duration,
				repeat: Infinity,
				ease: "easeInOut",
				repeatType: "reverse"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute end-0 top-0",
					style: {
						width: `${width}px`,
						height: `${height}px`,
						background: gradientFirst,
						transform: `translateY(${translateY}px) rotate(45deg)`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute end-0 top-0 origin-top-right",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientSecond,
						transform: "rotate(45deg) translate(-5%, -50%)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute end-0 top-0 origin-top-right",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientThird,
						transform: "rotate(45deg) translate(180%, -70%)"
					}
				})
			]
		})]
	});
};
function Hero() {
	const videoRef = (0, import_react.useRef)(null);
	const [isVideoLoaded, setIsVideoLoaded] = (0, import_react.useState)(false);
	const [shouldLoadVideo, setShouldLoadVideo] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setShouldLoadVideo(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "hero",
		className: "relative flex min-h-svh w-svw flex-col items-center justify-center overflow-hidden border-b py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spotlight, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 100
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: 1.5,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CometCard, {
					glareOpacity: 0,
					className: "relative -mb-12 3xl:max-w-7xl max-w-4xl px-8 md:-mb-24 md:px-12 lg:px-0",
					children: [
						!isVideoLoaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none size-full rounded-lg border bg-gradient-to-br from-primary/10 via-primary/5 to-background animate-pulse",
							style: { aspectRatio: "16/9" }
						}),
						shouldLoadVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							ref: videoRef,
							loop: true,
							muted: true,
							autoPlay: true,
							playsInline: true,
							preload: "metadata",
							onLoadedData: () => setIsVideoLoaded(true),
							src: "/videos/timelapse.mp4",
							"aria-label": i18n._({ id: "zL0tNq" }),
							className: `pointer-events-none size-full rounded-lg border object-cover transition-opacity duration-500 ${isVideoLoaded ? "opacity-100" : "opacity-0 absolute"}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": "true",
							className: "pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-40% via-transparent to-background"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex max-w-2xl flex-col items-center gap-y-6 px-4 xs:px-0 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: 1
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
							id: "IpKx5i",
							components: {
								0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-medium text-muted-foreground tracking-tight md:text-lg" }),
								1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mt-1 font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl" })
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: "max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: 1.2
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "q9FyN7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "flex flex-col items-center gap-3 sm:flex-row sm:gap-4",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: 1.4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "group relative overflow-hidden px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative z-10 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "c3b0B0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {
										"aria-hidden": "true",
										className: "size-4 transition-transform group-hover:translate-x-0.5"
									})]
								})
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": "true",
				role: "presentation",
				className: "absolute start-1/2 bottom-8 -translate-x-1/2",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					delay: 2,
					duration: 1
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "flex h-8 w-5 items-start justify-center rounded-full border border-muted-foreground/30 p-1.5",
					animate: { y: [
						0,
						5,
						0
					] },
					transition: {
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, { className: "h-1.5 w-1 rounded-full bg-muted-foreground/50" })
				})
			})
		]
	});
}
var Templates = (0, import_react.lazy)(() => import("./_ssr/templates-Cb4OCjFD.mjs").then((m) => ({ default: m.Templates })));
var Footer = (0, import_react.lazy)(() => import("./_ssr/footer-BqU47MwA.mjs").then((m) => ({ default: m.Footer })));
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-4 sm:px-6 lg:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border border-x [&>section:first-child]:border-t-0 [&>section]:border-border [&>section]:border-t",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-[400px] items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" })
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Templates, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-[200px]" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				})]
			})
		})]
	});
}
export { RouteComponent as component };

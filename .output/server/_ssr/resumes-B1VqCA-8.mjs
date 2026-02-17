import { o as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime, n as Trans, r as useLingui } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { f as AnimatePresence, u as motion } from "../_libs/framer-motion.mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { t as CometCard } from "./comet-card-C6tyDUZq.mjs";
import { d as Link, f as useNavigate, m as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { $ as i, B as e$5, Ht as e$1, J as e$4, M as a, Nt as r, Z as e, gn as c, gt as e$3, ht as o, l as o$1, rn as o$2, sn as e$2, xt as t } from "../_libs/phosphor-icons__react.mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { c as createSsrRpc, o as createServerFn } from "./vendor-react-DpiQ1Spv.mjs";
import "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Separator2, i as Root2, n as Item2, o as Trigger, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-context-menu+[...].mjs";
import { n as Root2$1, r as Trigger$1, t as List } from "../_libs/radix-ui__react-tabs.mjs";
import { u as orpc } from "./client-DOHyAGPS.mjs";
import { n as z, t as M } from "../_libs/ts-pattern.mjs";
import { a as DropdownMenuItem, c as DropdownMenuSeparator, f as DropdownMenuTrigger, r as DropdownMenuContent, t as DropdownMenu$1 } from "./dropdown-menu-DJSwXA6E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Combobox } from "./combobox-BKRnq7GA.mjs";
import { t as Separator$1 } from "./separator-DIlfBRvu.mjs";
import { t as DashboardHeader } from "./header-Fmv3KrUX.mjs";
import { t as useDialogStore } from "./store-DKZsiGJR.mjs";
import { n as useConfirm } from "./use-confirm-Dh-CT6ud.mjs";
import { t as Badge } from "./badge-zfFIh98v.mjs";
import { t as Route } from "./resumes-6HMdROUc.mjs";
import { t as MultipleCombobox } from "./multiple-combobox-KWZvrW2v.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function Tabs$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
		"data-slot": "tabs",
		"data-orientation": orientation,
		className: cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className),
		...props
	});
}
var tabsListVariants = cva("group/tabs-list inline-flex w-fit items-center justify-center rounded-full p-1 text-muted-foreground data-[variant=line]:rounded-none group-data-[orientation=vertical]/tabs:h-fit group-data-horizontal/tabs:h-9 group-data-[orientation=vertical]/tabs:flex-col", {
	variants: { variant: {
		default: "bg-card",
		line: "gap-1 bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function TabsList({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"data-slot": "tabs-list",
		"data-variant": variant,
		className: cn(tabsListVariants({ variant }), className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
		"data-slot": "tabs-trigger",
		className: cn("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-transparent px-3 py-1 font-medium text-foreground/60 text-sm transition-all hover:text-foreground focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-end-1 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100", className),
		...props
	});
}
function BaseCard({ title, description, tags, className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CometCard, {
		translateDepth: 3,
		rotateDepth: 6,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			...props,
			className: cn("relative flex aspect-page size-full overflow-hidden rounded-md bg-popover shadow transition-shadow hover:shadow-xl", className),
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 flex w-full flex-col justify-end space-y-0.5 bg-background/40 px-4 py-3 backdrop-blur-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate font-medium tracking-tight",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs opacity-80",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mt-2 hidden flex-wrap items-center gap-1", tags && tags.length > 0 && "flex"),
						children: tags?.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: tag
						}, tag))
					})
				]
			})]
		})
	});
}
function CreateResumeCard() {
	const { openDialog } = useDialogStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, {
		title: i18n._({ id: "VrBnBN" }),
		description: i18n._({ id: "/38hFE" }),
		onClick: () => openDialog("resume.create", void 0),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
				weight: "thin",
				className: "size-12"
			})
		})
	});
}
function ContextMenu$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "context-menu",
		...props
	});
}
function ContextMenuTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "context-menu-trigger",
		className: cn("select-none", className),
		...props
	});
}
function ContextMenuContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "context-menu-content",
		className: cn("data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-36 origin-(--radix-context-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in", className),
		...props
	}) });
}
function ContextMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-slot": "context-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("group/context-menu-item relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive", className),
		...props
	});
}
function ContextMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		"data-slot": "context-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function ResumeContextMenu({ resume, children }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const { mutate: deleteResume } = useMutation(orpc.resume.delete.mutationOptions());
	const { mutate: setLockedResume } = useMutation(orpc.resume.setLocked.mutationOptions());
	const handleUpdate = () => {
		openDialog("resume.update", resume);
	};
	const handleDuplicate = () => {
		openDialog("resume.duplicate", resume);
	};
	const handleToggleLock = async () => {
		if (!resume.isLocked) {
			if (!await confirm(i18n._({ id: "lRniaN" }), { description: i18n._({ id: "TeAHhB" }) })) return;
		}
		setLockedResume({
			id: resume.id,
			isLocked: !resume.isLocked
		}, { onError: (error) => {
			toast.error(error.message);
		} });
	};
	const handleDelete = async () => {
		if (!await confirm(i18n._({ id: "phpS3e" }), { description: i18n._({ id: "2xOCJW" }) })) return;
		const toastId = toast.loading(i18n._({ id: "X8fXNy" }));
		deleteResume({ id: resume.id }, {
			onSuccess: () => {
				toast.success(i18n._({ id: "mW+9mo" }), { id: toastId });
			},
			onError: (error) => {
				toast.error(error.message, { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenu$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/builder/$resumeId",
				params: { resumeId: resume.id },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1TNIig" })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			disabled: resume.isLocked,
			onSelect: handleUpdate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EkH9pt" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			onSelect: handleDuplicate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "euc6Ns" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			onSelect: handleToggleLock,
			children: [resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, {}), resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VAOn4r" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "HD2Tiz" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			variant: "destructive",
			disabled: resume.isLocked,
			onSelect: handleDelete,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
		})
	] })] });
}
function ResumeCard({ resume }) {
	const { i18n: i18n$2 } = useLingui();
	const { data: screenshotData, isLoading } = useQuery(orpc.printer.getResumeScreenshot.queryOptions({ input: { id: resume.id } }));
	const updatedAt = (0, import_react.useMemo)(() => {
		return Intl.DateTimeFormat(i18n$2.locale, {
			dateStyle: "long",
			timeStyle: "short"
		}).format(resume.updatedAt);
	}, [i18n$2.locale, resume.updatedAt]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeContextMenu, {
		resume,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/builder/$resumeId",
			params: { resumeId: resume.id },
			className: "cursor-default",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BaseCard, {
				title: resume.name,
				description: i18n._({
					id: "lYnXt3",
					values: { updatedAt }
				}),
				tags: resume.tags,
				children: [M({
					isLoading,
					imageSrc: screenshotData?.url
				}).with({ isLoading: true }, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-full items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, {
						weight: "thin",
						className: "size-12 animate-spin"
					})
				})).with({ imageSrc: z.string }, ({ imageSrc }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageSrc,
					alt: resume.name,
					className: cn("size-full object-cover transition-all", resume.isLocked && "blur-xs")
				})).otherwise(() => null), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeLockOverlay, { isLocked: resume.isLocked })]
			})
		})
	});
}
function ResumeLockOverlay({ isLocked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: .6 },
		exit: { opacity: 0 },
		className: "absolute inset-0 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center rounded-full bg-popover p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, {
				weight: "thin",
				className: "size-12 opacity-60"
			})
		})
	}, "resume-lock-overlay") });
}
function GridView({ resumes }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid 3xl:grid-cols-6 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				x: -50
			},
			animate: {
				opacity: 1,
				x: 0
			},
			exit: {
				opacity: 0,
				x: -50
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateResumeCard, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: resumes?.map((resume, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			layout: true,
			initial: {
				opacity: 0,
				x: -50
			},
			animate: {
				opacity: 1,
				x: 0
			},
			exit: {
				opacity: 0,
				y: -50,
				filter: "blur(12px)"
			},
			transition: { delay: (index + 2) * .05 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeCard, { resume })
		}, resume.id)) })]
	});
}
function ResumeDropdownMenu({ resume, children, ...props }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const { mutate: deleteResume } = useMutation(orpc.resume.delete.mutationOptions());
	const { mutate: setLockedResume } = useMutation(orpc.resume.setLocked.mutationOptions());
	const handleUpdate = () => {
		openDialog("resume.update", resume);
	};
	const handleDuplicate = () => {
		openDialog("resume.duplicate", resume);
	};
	const handleToggleLock = async () => {
		if (!resume.isLocked) {
			if (!await confirm(i18n._({ id: "lRniaN" }), { description: i18n._({ id: "TeAHhB" }) })) return;
		}
		setLockedResume({
			id: resume.id,
			isLocked: !resume.isLocked
		}, { onError: (error) => {
			toast.error(error.message);
		} });
	};
	const handleDelete = async () => {
		if (!await confirm(i18n._({ id: "phpS3e" }), { description: i18n._({ id: "2xOCJW" }) })) return;
		const toastId = toast.loading(i18n._({ id: "X8fXNy" }));
		deleteResume({ id: resume.id }, {
			onSuccess: () => {
				toast.success(i18n._({ id: "mW+9mo" }), { id: toastId });
			},
			onError: (error) => {
				toast.error(error.message, { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/builder/$resumeId",
				params: { resumeId: resume.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1TNIig" })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				disabled: resume.isLocked,
				onSelect: handleUpdate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EkH9pt" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: handleDuplicate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "euc6Ns" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: handleToggleLock,
				children: [resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, {}), resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VAOn4r" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "HD2Tiz" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				variant: "destructive",
				disabled: resume.isLocked,
				onSelect: handleDelete,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
			})
		]
	})] });
}
function ListView({ resumes }) {
	const { openDialog } = useDialogStore();
	const handleCreateResume = () => {
		openDialog("resume.create", void 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: -50
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -50
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				variant: "ghost",
				tapScale: .99,
				className: "h-12 w-full justify-start gap-x-4 text-start",
				onClick: handleCreateResume,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-80 truncate",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VrBnBN" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "/38hFE" })
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: resumes?.map((resume, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			layout: true,
			initial: {
				opacity: 0,
				y: -50
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				x: -50,
				filter: "blur(12px)"
			},
			transition: { delay: (index + 2) * .05 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeListItem, { resume })
		}, resume.id)) })]
	});
}
function ResumeListItem({ resume }) {
	const { i18n } = useLingui();
	const updatedAt = (0, import_react.useMemo)(() => {
		return Intl.DateTimeFormat(i18n.locale, {
			dateStyle: "long",
			timeStyle: "short"
		}).format(resume.updatedAt);
	}, [i18n.locale, resume.updatedAt]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-x-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "lg",
			variant: "ghost",
			tapScale: .99,
			className: "h-12 w-full flex-1 justify-start gap-x-4 text-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/builder/$resumeId",
				params: { resumeId: resume.id },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-80 truncate",
						children: resume.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
							id: "lYnXt3",
							values: { updatedAt }
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeDropdownMenu, {
			resume,
			align: "end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				className: "size-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, {})
			})
		})]
	});
}
function RouteComponent() {
	const router = useRouter();
	const { i18n: i18n$1 } = useLingui();
	const { view } = Route.useLoaderData();
	const { tags, sort } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { data: allTags } = useQuery(orpc.resume.tags.list.queryOptions());
	const { data: resumes } = useQuery(orpc.resume.list.queryOptions({ input: {
		tags,
		sort
	} }));
	const tagOptions = (0, import_react.useMemo)(() => {
		if (!allTags) return [];
		return allTags.map((tag) => ({
			value: tag,
			label: tag
		}));
	}, [allTags]);
	const sortOptions = (0, import_react.useMemo)(() => {
		return [
			{
				value: "lastUpdatedAt",
				label: i18n$1.t("Last Updated")
			},
			{
				value: "createdAt",
				label: i18n$1.t("Created")
			},
			{
				value: "name",
				label: i18n$1.t("Name")
			}
		];
	}, [i18n$1]);
	const onViewChange = (value) => {
		setViewServerFn({ data: value });
		router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: e$4,
				title: i18n._({ id: "oTBjeH" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-x-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
						value: sort,
						options: sortOptions,
						onValueChange: (value) => {
							if (!value) return;
							navigate({ search: {
								tags,
								sort: value
							} });
						},
						buttonProps: {
							title: i18n._({ id: "/HgF9q" }),
							variant: "ghost",
							children: (_, option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$5, {}), option?.label] })
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultipleCombobox, {
						value: tags,
						options: tagOptions,
						onValueChange: (value) => {
							navigate({ search: {
								tags: value,
								sort
							} });
						},
						buttonProps: {
							variant: "ghost",
							title: i18n._({ id: "0cVgUw" }),
							className: cn({ hidden: tagOptions.length === 0 }),
							children: (_, options) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: option.label
							}, option.value))] })
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
						className: "ltr:ms-auto rtl:me-auto",
						value: view,
						onValueChange: onViewChange,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "grid",
							className: "rounded-r-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "CXDHcv" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "list",
							className: "rounded-l-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "2BBAbc" })]
						})] })
					})
				]
			}),
			view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListView, { resumes: resumes ?? [] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridView, { resumes: resumes ?? [] })
		]
	});
}
var viewSchema = zod_default.enum(["grid", "list"]).catch("grid");
var setViewServerFn = createServerFn({ method: "POST" }).inputValidator(viewSchema).handler(createSsrRpc("756c704a65dc0d34a819db91bfae51022d981bb53c6ad8906dba70c85f0a9c84"));
export { RouteComponent as component };

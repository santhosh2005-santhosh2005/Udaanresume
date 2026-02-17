import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { $t as o, In as r$1, It as e$1, Q as e, Vn as o$1, r, ut as a } from "../_libs/phosphor-icons__react.mjs";
import { f as pageDimensionsAsPixels } from "./client-DOHyAGPS.mjs";
import { a as stripHtml } from "./string-De3qsJTq.mjs";
import { t as M } from "../_libs/ts-pattern.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-BlQmmyL6.mjs";
import { i as sanitizeCss, o as useResumeStore, r as TiptapContent } from "./resume-DjiYzdoS.mjs";
import { c as webfontlist_default, i as getSectionTitle, n as PageIcon, s as useCSSVariables, t as LevelDisplay } from "./section-CRNg6tAM.mjs";
import { a as useResizeObserver, i as useIsMounted } from "../_libs/usehooks-ts.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function useWebfonts(typography) {
	const isMounted = useIsMounted();
	(0, import_react.useEffect)(() => {
		if (!isMounted()) return;
		const body = document.body;
		if (body) body.setAttribute("data-wf-loaded", "false");
		async function loadFont(family, weights) {
			const font = webfontlist_default.find((font) => font.family === family);
			if (!font) return;
			const fontUrls = [];
			for (const weight of weights) for (const [fileWeight, url] of Object.entries(font.files)) {
				if (weight === fileWeight) fontUrls.push({
					url,
					weight,
					style: "normal"
				});
				if (fileWeight === `${weight}italic`) fontUrls.push({
					url,
					weight,
					style: "italic"
				});
			}
			for (const { url, weight, style } of fontUrls) {
				const fontFace = new FontFace(family, `url("${url}")`, {
					style,
					weight,
					display: "swap"
				});
				if (!document.fonts.has(fontFace)) document.fonts.add(await fontFace.load());
			}
		}
		const bodyTypography = typography.body;
		const headingTypography = typography.heading;
		Promise.all([loadFont(bodyTypography.fontFamily, bodyTypography.fontWeights), loadFont(headingTypography.fontFamily, headingTypography.fontWeights)]).then(() => {
			if (isMounted() && body) body.setAttribute("data-wf-loaded", "true");
		});
		return () => {
			if (isMounted()) {
				if (body) body.removeAttribute("data-wf-loaded");
			}
		};
	}, [isMounted, typography]);
}
var preview_module_default = { page: "_page_19uj5_1" };
function LinkedTitle({ title, website, showLinkInTitle, className }) {
	if (showLinkInTitle && website?.url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: website.url,
		target: "_blank",
		rel: "noopener",
		className: cn("inline-block", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
		className,
		children: title
	});
}
function PageLink({ url, label, className }) {
	if (!url) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: url,
		target: "_blank",
		rel: "noopener",
		className: cn("inline-block text-wrap break-all", className),
		children: label || url
	});
}
function AwardsItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("awards-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header awards-item-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.title,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title awards-item-title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata awards-item-date shrink-0 text-end",
						children: item.date
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata awards-item-awarder",
						children: item.awarder
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description awards-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			!item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-website awards-item-website",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label
				})
			})
		]
	});
}
function CertificationsItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("certifications-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header certifications-item-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.title,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title certifications-item-title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata certifications-item-date shrink-0 text-end",
						children: item.date
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata certifications-item-issuer",
						children: item.issuer
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description certifications-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			!item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-website certifications-item-website",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label
				})
			})
		]
	});
}
function CoverLetterItem({ className, ...item }) {
	if (!stripHtml(item.recipient) && !stripHtml(item.content)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("cover-letter-item", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("cover-letter-item-recipient mb-4", !stripHtml(item.recipient) && "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.recipient })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("cover-letter-item-content", !stripHtml(item.content) && "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.content })
		})]
	});
}
function EducationItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("education-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header education-item-header mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.school,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title education-item-title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata education-item-degree-grade shrink-0 text-end",
						children: [item.degree, item.grade].filter(Boolean).join(" • ")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata education-item-area",
						children: item.area
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata education-item-location-period shrink-0 text-end",
						children: [item.location, item.period].filter(Boolean).join(" • ")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description education-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			!item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-website education-item-website",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label
				})
			})
		]
	});
}
function ExperienceItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("experience-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header experience-item-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.company,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title experience-item-title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata experience-item-location shrink-0 text-end",
						children: item.location
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata experience-item-position",
						children: item.position
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata experience-item-period shrink-0 text-end",
						children: item.period
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description experience-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			!item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-website experience-item-website",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label
				})
			})
		]
	});
}
function InterestsItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("interests-item", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-item-header interests-item-header flex items-center gap-x-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, {
				icon: item.icon,
				className: "section-item-icon interests-item-icon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "section-item-title interests-item-name",
				children: item.name
			})]
		}), item.keywords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "section-item-keywords interests-item-keywords inline-block opacity-80",
			children: item.keywords.join(", ")
		})]
	});
}
function PageLevel({ level, className, ...props }) {
	const { icon, type } = useResumeStore((state) => state.resume.data.metadata.design.level);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelDisplay, {
		icon,
		type,
		level,
		className: cn("h-6", className),
		...props
	});
}
function LanguagesItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("languages-item", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-item-header languages-item-header flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "section-item-title languages-item-name",
				children: item.language
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "section-item-metadata languages-item-fluency opacity-80",
				children: item.fluency
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLevel, {
			level: item.level,
			className: "section-item-level languages-item-level"
		})]
	});
}
function ProfilesItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("profiles-item", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-item-header profiles-item-header flex items-center gap-x-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, {
				icon: item.icon,
				className: "section-item-icon profiles-item-icon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
				title: item.network,
				website: item.website,
				showLinkInTitle: item.options?.showLinkInTitle,
				className: "section-item-title profiles-item-network"
			})]
		}), !item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
			...item.website,
			label: item.website.label || item.username,
			className: "section-item-website profiles-item-website"
		})]
	});
}
function ProjectsItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("projects-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-header projects-item-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.name,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title projects-item-title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata projects-item-period shrink-0 text-end",
						children: item.period
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description projects-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			!item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-website projects-item-website",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label
				})
			})
		]
	});
}
function PublicationsItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("publications-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header publications-item-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.title,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title publications-item-title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata publications-item-date shrink-0 text-end",
						children: item.date
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata publications-item-publisher",
						children: item.publisher
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description publications-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			!item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-website publications-item-website",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label
				})
			})
		]
	});
}
function ReferencesItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("references-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header references-item-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.name,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title references-item-name"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata references-item-position",
						children: item.position
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description references-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-footer references-item-footer flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "section-item-metadata references-item-phone inline-block",
					children: item.phone
				}), !item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label,
					className: "section-item-website references-item-website"
				})]
			})
		]
	});
}
function SkillsItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("skills-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header flex items-center gap-x-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, {
					icon: item.icon,
					className: "section-item-icon skills-item-icon"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "section-item-title skills-item-name",
					children: item.name
				})]
			}),
			item.proficiency && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-metadata skills-item-proficiency",
				children: item.proficiency
			}),
			item.keywords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-keywords skills-item-keywords opacity-80",
				children: item.keywords.join(", ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLevel, {
				level: item.level,
				className: "section-item-level skills-item-level"
			})
		]
	});
}
function SummaryItem({ className, ...item }) {
	if (!stripHtml(item.content)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("summary-item", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.content })
	});
}
function VolunteerItem({ className, ...item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("volunteer-item", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-item-header volunteer-item-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedTitle, {
						title: item.organization,
						website: item.website,
						showLinkInTitle: item.options?.showLinkInTitle,
						className: "section-item-title volunteer-item-title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata volunteer-item-period shrink-0 text-end",
						children: item.period
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-x-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-item-metadata volunteer-item-location",
						children: item.location
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("section-item-description volunteer-item-description", !stripHtml(item.description) && "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, { content: item.description })
			}),
			!item.options?.showLinkInTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-item-website volunteer-item-website",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
					...item.website,
					label: item.website.label
				})
			})
		]
	});
}
function PageSection({ type, className, children }) {
	const section = useResumeStore((state) => state.resume.data.sections[type]);
	const items = section.items.filter((item) => !item.hidden);
	if (section.hidden) return null;
	if (items.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn(`page-section page-section-${type}`, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: "mb-1.5 text-(--page-primary-color)",
			children: section.title || getSectionTitle(type)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-content grid gap-x-(--page-gap-x) gap-y-(--page-gap-y)",
			style: { gridTemplateColumns: `repeat(${section.columns}, 1fr)` },
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn(`section-item section-item-${type} print:break-inside-avoid`),
				children: children(item)
			}, item.id))
		})]
	});
}
function PageSummary({ className }) {
	const section = useResumeStore((state) => state.resume.data.summary);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("page-section page-section-summary", section.hidden && "hidden", !stripHtml(section.content) && "hidden", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: "mb-1.5 text-(--page-primary-color)",
			children: section.title || getSectionTitle("summary")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-content",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContent, {
				style: { columnCount: section.columns },
				content: section.content
			})
		})]
	});
}
function renderItemByType(type, item, itemClassName) {
	return M(type).with("summary", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryItem, {
		...item,
		className: itemClassName
	})).with("profiles", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilesItem, {
		...item,
		className: itemClassName
	})).with("experience", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceItem, {
		...item,
		className: itemClassName
	})).with("education", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationItem, {
		...item,
		className: itemClassName
	})).with("projects", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsItem, {
		...item,
		className: itemClassName
	})).with("skills", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsItem, {
		...item,
		className: itemClassName
	})).with("languages", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagesItem, {
		...item,
		className: itemClassName
	})).with("interests", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterestsItem, {
		...item,
		className: itemClassName
	})).with("awards", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardsItem, {
		...item,
		className: itemClassName
	})).with("certifications", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationsItem, {
		...item,
		className: itemClassName
	})).with("publications", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationsItem, {
		...item,
		className: itemClassName
	})).with("volunteer", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerItem, {
		...item,
		className: itemClassName
	})).with("references", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferencesItem, {
		...item,
		className: itemClassName
	})).with("cover-letter", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverLetterItem, {
		...item,
		className: itemClassName
	})).exhaustive();
}
function getSectionComponent(section, { sectionClassName, itemClassName } = {}) {
	return M(section).with("summary", () => {
		const SummarySection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSummary, { className: sectionClassName });
		return SummarySection;
	}).with("profiles", () => {
		const ProfilesSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "profiles",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilesItem, {
				...item,
				className: itemClassName
			})
		});
		return ProfilesSection;
	}).with("experience", () => {
		const ExperienceSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "experience",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceItem, {
				...item,
				className: itemClassName
			})
		});
		return ExperienceSection;
	}).with("education", () => {
		const EducationSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "education",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationItem, {
				...item,
				className: itemClassName
			})
		});
		return EducationSection;
	}).with("projects", () => {
		const ProjectsSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "projects",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsItem, {
				...item,
				className: itemClassName
			})
		});
		return ProjectsSection;
	}).with("skills", () => {
		const SkillsSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "skills",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsItem, {
				...item,
				className: itemClassName
			})
		});
		return SkillsSection;
	}).with("languages", () => {
		const LanguagesSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "languages",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagesItem, {
				...item,
				className: itemClassName
			})
		});
		return LanguagesSection;
	}).with("interests", () => {
		const InterestsSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "interests",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterestsItem, {
				...item,
				className: itemClassName
			})
		});
		return InterestsSection;
	}).with("awards", () => {
		const AwardsSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "awards",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardsItem, {
				...item,
				className: itemClassName
			})
		});
		return AwardsSection;
	}).with("certifications", () => {
		const CertificationsSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "certifications",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationsItem, {
				...item,
				className: itemClassName
			})
		});
		return CertificationsSection;
	}).with("publications", () => {
		const PublicationsSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "publications",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationsItem, {
				...item,
				className: itemClassName
			})
		});
		return PublicationsSection;
	}).with("volunteer", () => {
		const VolunteerSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "volunteer",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerItem, {
				...item,
				className: itemClassName
			})
		});
		return VolunteerSection;
	}).with("references", () => {
		const ReferencesSection = ({ id: _id }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSection, {
			type: "references",
			className: sectionClassName,
			children: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferencesItem, {
				...item,
				className: itemClassName
			})
		});
		return ReferencesSection;
	}).otherwise(() => {
		const CustomSectionComponent = ({ id }) => {
			const customSection = useResumeStore((state) => state.resume.data.customSections.find((s) => s.id === id));
			if (!customSection) return null;
			if (customSection.hidden) return null;
			if (customSection.items.length === 0) return null;
			const visibleItems = customSection.items.filter((item) => !item.hidden);
			if (visibleItems.length === 0) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: cn(`page-section page-section-custom page-section-${id}`, sectionClassName),
				children: [customSection.type !== "summary" && customSection.type !== "cover-letter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "mb-1.5 text-(--page-primary-color)",
					children: customSection.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-content grid gap-x-(--page-gap-x) gap-y-(--page-gap-y)",
					style: { gridTemplateColumns: `repeat(${customSection.columns}, 1fr)` },
					children: visibleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn(`section-item section-item-${customSection.type} print:break-inside-avoid`),
						children: renderItemByType(customSection.type, item, itemClassName)
					}, item.id))
				})]
			});
		};
		return CustomSectionComponent;
	});
}
function PagePicture({ className, style }) {
	const name = useResumeStore((state) => state.resume.data.basics.name);
	const picture = useResumeStore((state) => state.resume.data.picture);
	if (picture.url === "") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("page-picture shrink-0 overflow-hidden", picture.hidden && "hidden", className),
		style: {
			maxWidth: `${picture.size}pt`,
			maxHeight: `${picture.size}pt`,
			aspectRatio: picture.aspectRatio,
			borderRadius: `${picture.borderRadius}%`,
			border: picture.borderWidth > 0 ? `${picture.borderWidth}pt solid ${picture.borderColor}` : "none",
			boxShadow: picture.shadowWidth > 0 ? `0 0 ${picture.shadowWidth}pt 0 ${picture.shadowColor}` : "none",
			...style
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			alt: name,
			src: picture.url,
			className: "size-full object-cover",
			style: { transform: `rotate(${picture.rotation}deg)` }
		})
	});
}
var sectionClassName$12 = cn("group-data-[layout=sidebar]:[&>h6]:px-4", "group-data-[layout=sidebar]:[&>h6]:relative", "group-data-[layout=sidebar]:[&>h6]:inline-flex", "group-data-[layout=sidebar]:[&>h6]:items-center", "group-data-[layout=sidebar]:[&>h6]:before:content-['']", "group-data-[layout=sidebar]:[&>h6]:before:absolute", "group-data-[layout=sidebar]:[&>h6]:before:left-0", "group-data-[layout=sidebar]:[&>h6]:before:rounded-full", "group-data-[layout=sidebar]:[&>h6]:before:size-2", "group-data-[layout=sidebar]:[&>h6]:before:border", "group-data-[layout=sidebar]:[&>h6]:before:border-(--page-primary-color)", "group-data-[layout=sidebar]:[&>h6]:after:content-['']", "group-data-[layout=sidebar]:[&>h6]:after:absolute", "group-data-[layout=sidebar]:[&>h6]:after:right-0", "group-data-[layout=sidebar]:[&>h6]:after:rounded-full", "group-data-[layout=sidebar]:[&>h6]:after:size-2", "group-data-[layout=sidebar]:[&>h6]:after:border", "group-data-[layout=sidebar]:[&>h6]:after:border-(--page-primary-color)", "group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col", "group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start", "group-data-[layout=main]:[&>.section-content]:relative", "group-data-[layout=main]:[&>.section-content]:ml-4", "group-data-[layout=main]:[&>.section-content]:pl-4", "group-data-[layout=main]:[&>.section-content]:border-l", "group-data-[layout=main]:[&>.section-content]:border-(--page-primary-color)", "group-data-[layout=main]:[&>.section-content]:after:content-['']", "group-data-[layout=main]:[&>.section-content]:after:absolute", "group-data-[layout=main]:[&>.section-content]:after:top-5", "group-data-[layout=main]:[&>.section-content]:after:left-0", "group-data-[layout=main]:[&>.section-content]:after:size-2.5", "group-data-[layout=main]:[&>.section-content]:after:translate-x-[-50%]", "group-data-[layout=main]:[&>.section-content]:after:translate-y-[-50%]", "group-data-[layout=main]:[&>.section-content]:after:rounded-full", "group-data-[layout=main]:[&>.section-content]:after:border", "group-data-[layout=main]:[&>.section-content]:after:border-(--page-primary-color)", "group-data-[layout=main]:[&>.section-content]:after:bg-(--page-background-color)");
/**
* Template: Azurill
*/
function AzurillTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-azurill page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$12, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-x-(--page-gap-x)",
			children: [!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar w-(--page-sidebar-width) shrink-0 space-y-(--page-gap-y) overflow-x-hidden",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$12 }), { id: section }, section);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main grow space-y-(--page-gap-y)",
				children: main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$12 }), { id: section }, section);
				})
			})]
		})]
	});
}
function Header$12() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header flex flex-col items-center gap-y-(--page-gap-y)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-basics space-y-(--page-gap-y) text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "basics-name",
					children: basics.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "basics-headline",
					children: basics.headline
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap justify-center gap-x-3 gap-y-1 *:flex *:items-center *:gap-x-1.5",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})]
		})]
	});
}
var sectionClassName$11 = cn("grid grid-cols-5 border-(--page-primary-color) border-t pt-1", "[&>.section-content]:col-span-4");
/**
* Template: Bronzor
*/
function BronzorTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-bronzor page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$11, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-(--page-gap-y)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$11 }), { id: section }, section);
				})
			}), !fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar space-y-(--page-gap-y)",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$11 }), { id: section }, section);
				})
			})]
		})]
	});
}
function Header$11() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header flex flex-col items-center gap-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-basics space-y-2 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "basics-name",
					children: basics.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "basics-headline",
					children: basics.headline
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap justify-center gap-x-3 gap-y-1 text-center *:flex *:items-center *:gap-x-1.5",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})]
		})]
	});
}
var sectionClassName$10 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b", "group-data-[layout=sidebar]:[&>h6]:text-(--page-background-color)", "group-data-[layout=sidebar]:[&>h6]:border-(--page-background-color)", "group-data-[layout=sidebar]:[&_.section-item_i]:text-(--page-background-color)!", "group-data-[layout=sidebar]:[&_.section-item-level>div]:border-(--page-background-color)", "group-data-[layout=sidebar]:[&_.section-item-level>div]:data-[active=true]:bg-(--page-background-color)", "group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col", "group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start");
/**
* Template: Chikorita
*/
function ChikoritaTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-chikorita page-content",
		children: [!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color) ltr:end-0 rtl:start-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				"data-layout": "main",
				className: "group page-main z-10 flex-1 space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$10, {}), main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$10 }), { id: section }, section);
				})]
			}), !fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar z-10 w-(--page-sidebar-width) shrink-0 space-y-4 overflow-x-hidden px-(--page-margin-x) pt-(--page-margin-y) text-(--page-background-color)",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$10 }), { id: section }, section);
				})
			})]
		})]
	});
}
function Header$10() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-header relative flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 items-center gap-x-(--page-margin-x)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-basics space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "basics-name",
					children: basics.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "basics-headline",
					children: basics.headline
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "basics-items flex flex-wrap gap-x-2 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
					children: [
						basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-email",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: `mailto:${basics.email}`,
								label: basics.email
							})]
						}),
						basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-phone",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: `tel:${basics.phone}`,
								label: basics.phone
							})]
						}),
						basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-location",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
						}),
						basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-website",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
						}),
						basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-custom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: field.link,
								label: field.text
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
						}, field.id))
					]
				})]
			})]
		})
	});
}
var sectionClassName$9 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b", "group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col", "group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start", "group-data-[layout=main]:[&_.section-item-header]:ps-2", "group-data-[layout=main]:[&_.section-item-header]:py-0.5", "group-data-[layout=main]:[&_.section-item-header]:-ms-2.5", "group-data-[layout=main]:[&_.section-item-header]:border-s-2", "group-data-[layout=main]:[&_.section-item-header]:border-(--page-primary-color)");
/**
* Template: Ditgar
*/
function DitgarTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	const SummaryComponent = getSectionComponent("summary", { sectionClassName: cn(sectionClassName$9, "px-(--page-margin-x) pt-(--page-margin-y)") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-ditgar page-content",
		children: [(!fullWidth || isFirstPage) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color)/20 ltr:start-0 rtl:end-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [(!fullWidth || isFirstPage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"data-layout": "sidebar",
				className: "sidebar group z-10 flex w-(--page-sidebar-width) shrink-0 flex-col",
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$9, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
					children: sidebar.map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$9 }), { id: section }, section);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				"data-layout": "main",
				className: cn("main group z-10", !fullWidth ? "col-span-2" : "col-span-3"),
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryComponent, { id: "summary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
					children: main.filter((section) => section !== "summary").map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$9 }), { id: section }, section);
					})
				})]
			})]
		})]
	});
}
function Header$9() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header space-y-4 bg-(--page-primary-color) px-(--page-margin-x) py-(--page-margin-y) text-(--page-background-color)",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-bold text-2xl",
				children: basics.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: basics.headline })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-y-2 text-sm [&>div>i]:text-(--page-background-color)!",
				children: [
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-x-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, {
							icon: "map-pin",
							className: "ph-bold"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: basics.location })]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-x-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, {
							icon: "phone",
							className: "ph-bold"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-x-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, {
							icon: "at",
							className: "ph-bold"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-x-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, {
							icon: "globe",
							className: "ph-bold"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					})
				]
			})
		]
	});
}
var sectionClassName$8 = cn("group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col", "group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start");
/**
* Template: Ditto
*/
function DittoTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-ditto page-content",
		children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$8, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex pt-(--page-margin-y)",
			children: [!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar w-(--page-sidebar-width) shrink-0 space-y-4 overflow-x-hidden ps-(--page-margin-x)",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$8 }), { id: section }, section);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main space-y-4 px-(--page-margin-x)",
				children: main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$8 }), { id: section }, section);
				})
			})]
		})]
	});
}
function Header$8() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-basics bg-(--page-primary-color) text-(--page-background-color)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-header flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-(--page-sidebar-width) shrink-0 justify-center ps-(--page-margin-x)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, { className: "absolute top-8" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-(--page-margin-x) py-(--page-margin-y)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "basics-name",
						children: basics.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "basics-headline",
						children: basics.headline
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-(--page-sidebar-width) shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap gap-x-3 gap-y-1 px-(--page-margin-x) pt-3 *:flex *:items-center *:gap-x-1.5",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})]
		})]
	});
}
var sectionClassName$7 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b", "group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col", "group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start");
/**
* Template: Gengar
*/
function GengarTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-gengar page-content",
		children: [(!fullWidth || isFirstPage) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color)/20 ltr:start-0 rtl:end-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [(!fullWidth || isFirstPage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar z-10 flex w-(--page-sidebar-width) shrink-0 flex-col",
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$7, {}), !fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 space-y-4 overflow-x-hidden px-(--page-margin-x) pt-(--page-margin-y)",
					children: sidebar.filter((section) => section !== "summary").map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$7 }), { id: section }, section);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				"data-layout": "main",
				className: "group page-main z-10",
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSummary, { className: cn(sectionClassName$7, "bg-(--page-primary-color)/20 px-(--page-margin-x) py-(--page-margin-y) [&>h6]:hidden") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
					children: main.filter((section) => section !== "summary").map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$7 }), { id: section }, section);
					})
				})]
			})]
		})]
	});
}
function Header$7() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-header relative flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full shrink-0 flex-col justify-center gap-y-2 bg-(--page-primary-color) px-(--page-margin-x) py-(--page-margin-y) text-(--page-background-color)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "basics-name",
					children: basics.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "basics-headline",
					children: basics.headline
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "basics-items flex flex-col gap-y-1 *:flex *:items-center *:gap-x-1.5",
					style: { "--page-primary-color": "var(--page-background-color)" },
					children: [
						basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-email",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: "envelope" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: `mailto:${basics.email}`,
								label: basics.email
							})]
						}),
						basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-phone",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: "phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: `tel:${basics.phone}`,
								label: basics.phone
							})]
						}),
						basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-location",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: "map-pin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
						}),
						basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-website",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: "globe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
						}),
						basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-custom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: field.link,
								label: field.text
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
						}, field.id))
					]
				})
			]
		})
	});
}
var sectionClassName$6 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b", "group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col", "group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start");
/**
* Template: Glalie
*/
function GlalieTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-glalie page-content",
		children: [(!fullWidth || isFirstPage) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sidebar-background pointer-events-none absolute inset-y-0 z-0 w-(--page-sidebar-width) shrink-0 bg-(--page-primary-color)/20 ltr:start-0 rtl:end-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [(!fullWidth || isFirstPage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar z-10 flex w-(--page-sidebar-width) shrink-0 flex-col space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$6, {}), !fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 space-y-4 overflow-x-hidden",
					children: sidebar.map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$6 }), { id: section }, section);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 px-(--page-margin-x) pt-(--page-margin-y)",
					children: main.map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$6 }), { id: section }, section);
					})
				})
			})]
		})]
	});
}
function Header$6() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-header relative flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full shrink-0 flex-col items-center justify-center gap-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "basics-name",
						children: basics.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "basics-headline",
						children: basics.headline
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { "--box-radius": "calc(var(--picture-border-radius) / 4)" },
					className: "basics-items flex w-full flex-col gap-y-1 rounded-(--box-radius) border border-(--page-primary-color) p-3 *:flex *:items-center *:gap-x-1.5",
					children: [
						basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-email",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: `mailto:${basics.email}`,
								label: basics.email
							})]
						}),
						basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-phone",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: `tel:${basics.phone}`,
								label: basics.phone
							})]
						}),
						basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-location",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
						}),
						basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-website",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
						}),
						basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "basics-item-custom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
								url: field.link,
								label: field.text
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
						}, field.id))
					]
				})
			]
		})
	});
}
var sectionClassName$5 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b [&>h6]:pb-0.5 [&>h6]:text-center");
/**
* Template: Kakuna
*/
function KakunaTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-kakuna page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: [
			isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$5, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$5 }), { id: section }, section);
				})
			}),
			!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar space-y-(--page-gap-y)",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$5 }), { id: section }, section);
				})
			})
		]
	});
}
function Header$5() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header flex flex-col items-center gap-y-(--page-gap-y)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-basics space-y-(--page-gap-y) text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "basics-name",
				children: basics.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "basics-headline",
				children: basics.headline
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap justify-center gap-x-3 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})]
		})]
	});
}
var sectionClassName$4 = cn("rounded-(--container-border-radius) border border-(--page-text-color)/10 bg-(--page-background-color) p-4", "[&>h6]:-mt-(--heading-negative-margin) [&>h6]:max-w-fit [&>h6]:bg-(--page-background-color) [&>h6]:px-4", "group-data-[layout=main]:first-of-type:mt-4");
/**
* Template: Lapras
*/
function LaprasTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	const containerBorderRadius = useResumeStore((state) => Math.min(state.resume.data.picture.borderRadius, 30));
	const headingNegativeMargin = useResumeStore((state) => state.resume.data.metadata.typography.heading.fontSize + 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: (0, import_react.useMemo)(() => {
			return {
				"--container-border-radius": `${containerBorderRadius}pt`,
				"--heading-negative-margin": `${headingNegativeMargin}pt`
			};
		}, [containerBorderRadius, headingNegativeMargin]),
		className: "template-lapras page-content space-y-6 px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: [
			isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$4, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main space-y-6",
				children: main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$4 }), { id: section }, section);
				})
			}),
			!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar space-y-6",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$4 }), { id: section }, section);
				})
			})
		]
	});
}
function Header$4() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("page-header flex items-center gap-x-(--page-margin-x)", "rounded-(--picture-border-radius) border border-(--page-text-color)/10 bg-(--page-background-color) p-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-basics space-y-(--page-gap-y)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "basics-name",
				children: basics.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "basics-headline",
				children: basics.headline
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap gap-x-2 gap-y-0.5 *:flex *:items-center *:gap-x-1.5 *:border-(--page-primary-color) *:border-e *:py-0.5 *:pe-2 *:last:border-e-0",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})]
		})]
	});
}
var sectionClassName$3 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b");
/**
* Template: Leafish
*/
function LeafishTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-leafish page-content",
		children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-x-(--page-margin-x) px-(--page-margin-x) pt-(--page-margin-y)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.filter((section) => section !== "summary").map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$3 }), { id: section }, section);
				})
			}), !fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar w-(--page-sidebar-width) shrink-0 space-y-(--page-gap-y)",
				children: sidebar.filter((section) => section !== "summary").map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$3 }), { id: section }, section);
				})
			})]
		})]
	});
}
function Header$3() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header bg-(--page-primary-color)/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-x-(--page-margin-x) px-(--page-margin-x) py-(--page-margin-y)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-(--page-gap-y)",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "basics-name",
					children: basics.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "basics-headline",
					children: basics.headline
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSummary, { className: "[&>h6]:hidden" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-basics bg-(--page-primary-color)/10 px-(--page-margin-x) py-(--page-margin-y)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap gap-x-4 gap-y-1 *:flex *:items-center *:gap-x-1.5",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})
		})]
	});
}
var sectionClassName$2 = cn();
/**
* Template: Onyx
*/
function OnyxTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-onyx page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: [
			isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$2, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$2 }), { id: section }, section);
				})
			}),
			!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar space-y-(--page-gap-y)",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$2 }), { id: section }, section);
				})
			})
		]
	});
}
function Header$2() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header flex items-center gap-x-(--page-margin-x) border-(--page-primary-color) border-b pb-(--page-margin-y)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-basics space-y-(--page-gap-y)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "basics-name",
				children: basics.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "basics-headline",
				children: basics.headline
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap gap-x-3 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})]
		})]
	});
}
var sectionClassName$1 = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b", "group-data-[layout=sidebar]:[&_.section-item-header>div]:flex-col", "group-data-[layout=sidebar]:[&_.section-item-header>div]:items-start");
/**
* Template: Pikachu
*/
function PikachuTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "template-pikachu page-content px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-x-(--page-margin-x)",
			children: [!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar flex w-(--page-sidebar-width) shrink-0 flex-col space-y-(--page-gap-y)",
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex max-w-(--page-sidebar-width) items-center justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {})
				}), !fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 space-y-(--page-gap-y) overflow-x-hidden",
					children: sidebar.map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$1 }), { id: section }, section);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				"data-layout": "main",
				className: "group page-main flex-1 space-y-(--page-gap-y)",
				children: [isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-x-6",
					children: [fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$1, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-(--page-gap-y)",
					children: main.map((section) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName: sectionClassName$1 }), { id: section }, section);
					})
				})]
			})]
		})
	});
}
function Header$1() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header w-full space-y-(--page-gap-y) rounded-(--picture-border-radius) bg-(--page-primary-color) px-(--page-margin-x) py-(--page-margin-y) text-(--page-background-color)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-(--page-background-color)/50 border-b pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "basics-name",
				children: basics.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "basics-headline",
				children: basics.headline
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "basics-items flex flex-wrap gap-x-3 gap-y-0.5 *:flex *:items-center *:gap-x-1.5",
			style: { "--page-primary-color": "var(--page-background-color)" },
			children: [
				basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "basics-item-email",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
						url: `mailto:${basics.email}`,
						label: basics.email
					})]
				}),
				basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "basics-item-phone",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
						url: `tel:${basics.phone}`,
						label: basics.phone
					})]
				}),
				basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "basics-item-location",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
				}),
				basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "basics-item-website",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
				}),
				basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "basics-item-custom",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
						url: field.link,
						label: field.text
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
				}, field.id))
			]
		})]
	});
}
var sectionClassName = cn("[&>h6]:border-(--page-primary-color) [&>h6]:border-b");
/**
* Template: Rhyhorn
*/
function RhyhornTemplate({ pageIndex, pageLayout }) {
	const isFirstPage = pageIndex === 0;
	const { main, sidebar, fullWidth } = pageLayout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-rhyhorn page-content space-y-(--page-gap-y) px-(--page-margin-x) pt-(--page-margin-y) print:p-0",
		children: [
			isFirstPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-layout": "main",
				className: "group page-main space-y-(--page-gap-y)",
				children: main.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName }), { id: section }, section);
				})
			}),
			!fullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				"data-layout": "sidebar",
				className: "group page-sidebar space-y-(--page-gap-y)",
				children: sidebar.map((section) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(getSectionComponent(section, { sectionClassName }), { id: section }, section);
				})
			})
		]
	});
}
function Header() {
	const basics = useResumeStore((state) => state.resume.data.basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-header flex items-center gap-x-(--page-gap-x)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-basics grow space-y-(--page-gap-y)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "basics-name",
				children: basics.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "basics-headline",
				children: basics.headline
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "basics-items flex flex-wrap gap-x-2 gap-y-0.5 *:flex *:items-center *:gap-x-1.5 *:border-(--page-primary-color) *:border-e *:py-0.5 *:pe-2 *:last:border-e-0",
				children: [
					basics.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-email",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `mailto:${basics.email}`,
							label: basics.email
						})]
					}),
					basics.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-phone",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: `tel:${basics.phone}`,
							label: basics.phone
						})]
					}),
					basics.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-location",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: basics.location })]
					}),
					basics.website.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, { ...basics.website })]
					}),
					basics.customFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "basics-item-custom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIcon, { icon: field.icon }), field.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLink, {
							url: field.link,
							label: field.text
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.text })]
					}, field.id))
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagePicture, {})]
	});
}
var CSS_RULE_SPLIT_PATTERN = /\n(?=\s*[.#a-zA-Z])/;
var CSS_SELECTOR_PATTERN = /^([^{]+)(\{)/;
function getTemplateComponent(template) {
	return M(template).with("azurill", () => AzurillTemplate).with("bronzor", () => BronzorTemplate).with("chikorita", () => ChikoritaTemplate).with("ditto", () => DittoTemplate).with("ditgar", () => DitgarTemplate).with("gengar", () => GengarTemplate).with("glalie", () => GlalieTemplate).with("kakuna", () => KakunaTemplate).with("lapras", () => LaprasTemplate).with("leafish", () => LeafishTemplate).with("onyx", () => OnyxTemplate).with("pikachu", () => PikachuTemplate).with("rhyhorn", () => RhyhornTemplate).exhaustive();
}
var ResumePreview = ({ showPageNumbers = false, pageClassName, className, ...props }) => {
	const picture = useResumeStore((state) => state.resume.data.picture);
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	useWebfonts(metadata.typography);
	const style = useCSSVariables({
		picture,
		metadata
	});
	const iconProps = (0, import_react.useMemo)(() => {
		return {
			weight: "regular",
			hidden: metadata.page.hideIcons,
			color: "var(--page-primary-color)",
			size: metadata.typography.body.fontSize * 1.5
		};
	}, [metadata.typography.body.fontSize, metadata.page.hideIcons]);
	const scopedCSS = (0, import_react.useMemo)(() => {
		if (!metadata.css.enabled || !metadata.css.value.trim()) return null;
		return sanitizeCss(metadata.css.value).split(CSS_RULE_SPLIT_PATTERN).map((rule) => {
			const trimmed = rule.trim();
			if (!trimmed || trimmed.startsWith("@")) return trimmed;
			return trimmed.replace(CSS_SELECTOR_PATTERN, (_match, selectors, brace) => {
				return `${selectors.split(",").map((selector) => `.resume-preview-container ${selector.trim()} `).join(", ")}${brace}`;
			});
		}).join("\n");
	}, [metadata.css.enabled, metadata.css.value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(o$1.Provider, {
		value: iconProps,
		children: [scopedCSS && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: scopedCSS } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style,
			className: cn("resume-preview-container", className),
			...props,
			children: metadata.layout.pages.map((pageLayout, pageIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, {
				pageIndex,
				pageLayout,
				pageClassName,
				showPageNumbers
			}, pageIndex))
		})]
	});
};
function PageContainer({ pageIndex, pageLayout, pageClassName, showPageNumbers = false }) {
	const pageRef = (0, import_react.useRef)(null);
	const [pageHeight, setPageHeight] = (0, import_react.useState)(0);
	const metadata = useResumeStore((state) => state.resume.data.metadata);
	const pageNumber = (0, import_react.useMemo)(() => pageIndex + 1, [pageIndex]);
	const maxPageHeight = (0, import_react.useMemo)(() => pageDimensionsAsPixels[metadata.page.format].height, [metadata.page.format]);
	const totalNumberOfPages = (0, import_react.useMemo)(() => metadata.layout.pages.length, [metadata.layout.pages]);
	const TemplateComponent = (0, import_react.useMemo)(() => getTemplateComponent(metadata.template), [metadata.template]);
	useResizeObserver({
		ref: pageRef,
		onResize: (size) => {
			if (!size.height) return;
			setPageHeight(size.height);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-page-index": pageIndex,
		className: "relative",
		children: [
			showPageNumbers && totalNumberOfPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute start-0 -top-6 print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
						id: "cnJfOz",
						values: {
							pageNumber,
							totalNumberOfPages
						}
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: pageRef,
				className: cn(`page page-${pageIndex}`, preview_module_default.page, pageClassName),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateComponent, {
					pageIndex,
					pageLayout
				})
			}),
			metadata.page.format !== "free-form" && pageHeight > maxPageHeight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute start-0 top-full mt-4 print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					rel: "noopener",
					target: "_blank",
					className: "group/link",
					href: "https://docs.rxresu.me/guides/fitting-content-on-a-page",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
						className: "max-w-sm text-yellow-600",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, { color: "currentColor" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "9y0oTl" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
								className: "text-xs underline-offset-2 group-hover/link:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "DiDD1p" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, {
									color: "currentColor",
									className: "ms-1 inline size-3"
								})]
							})
						]
					})
				})
			})
		]
	});
}
export { ResumePreview as t };

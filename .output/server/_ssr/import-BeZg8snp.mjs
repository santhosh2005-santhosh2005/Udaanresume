import { s as __toESM } from "../_runtime.mjs";
import { t as cn } from "./style-BJgMumzy.mjs";
import { i as require_jsx_runtime, n as Trans } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as Button } from "./button-DEtZbRiH.mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { en as e, qt as o, s as e$1 } from "../_libs/phosphor-icons__react.mjs";
import { Br as string, Da as flattenError, Gn as email, ei as url, kn as array, mr as looseObject, yi as ZodError } from "../_libs/@ai-sdk/anthropic+[...].mjs";
import { a as zod_default } from "../_libs/@ai-sdk/gateway+[...].mjs";
import "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription } from "./dialog-BY4yKua_.mjs";
import { t as Input } from "./input-CtC-lcee.mjs";
import { s as defaultResumeData, w as templateSchema, x as resumeDataSchema } from "./data-DwXlxXoW.mjs";
import { t as useAIStore } from "./store-Bd1SnWMR.mjs";
import { r as client, u as orpc } from "./client-C81uIMtx.mjs";
import { t as generateId } from "./string-De3qsJTq.mjs";
import "../_libs/@aws-sdk/client-s3+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Spinner } from "./spinner-EfdewK_4.mjs";
import { t as Combobox } from "./combobox-BKRnq7GA.mjs";
import { t as useDialogStore } from "./store-DKZsiGJR.mjs";
import { a as useForm, c as useWatch, t as a } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, s as FormMessage, t as Form } from "./form-36WCL8kQ.mjs";
import { t as Badge } from "./badge-zfFIh98v.mjs";
import { t as useFormBlocker } from "./use-form-blocker-Dlv56XqQ.mjs";
import { r as parseRgbString } from "./color-CKljVYos.mjs";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var iso8601 = string().regex(/^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/, "Must be a valid ISO 8601 date (YYYY, YYYY-MM, or YYYY-MM-DD)");
var locationSchema = looseObject({
	address: string().optional(),
	postalCode: string().optional(),
	city: string().optional(),
	countryCode: string().optional(),
	region: string().optional()
});
var profileSchema = looseObject({
	network: string().optional(),
	username: string().optional(),
	url: url().optional()
});
var basicsSchema = looseObject({
	name: string().optional(),
	label: string().optional(),
	image: string().optional(),
	email: email().optional(),
	phone: string().optional(),
	url: url().optional(),
	summary: string().optional(),
	location: locationSchema.optional(),
	profiles: array(profileSchema).optional()
});
var workSchema = looseObject({
	name: string().optional(),
	location: string().optional(),
	description: string().optional(),
	position: string().optional(),
	url: url().optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	summary: string().optional(),
	highlights: array(string()).optional()
});
var volunteerSchema = looseObject({
	organization: string().optional(),
	position: string().optional(),
	url: url().optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	summary: string().optional(),
	highlights: array(string()).optional()
});
var educationSchema = looseObject({
	institution: string().optional(),
	url: url().optional(),
	area: string().optional(),
	studyType: string().optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	score: string().optional(),
	courses: array(string()).optional()
});
var awardSchema = looseObject({
	title: string().optional(),
	date: iso8601.optional(),
	awarder: string().optional(),
	summary: string().optional()
});
var certificateSchema = looseObject({
	name: string().optional(),
	date: iso8601.optional(),
	url: url().optional(),
	issuer: string().optional()
});
var publicationSchema = looseObject({
	name: string().optional(),
	publisher: string().optional(),
	releaseDate: iso8601.optional(),
	url: url().optional(),
	summary: string().optional()
});
var skillSchema = looseObject({
	name: string().optional(),
	level: string().optional(),
	keywords: array(string()).optional()
});
var languageSchema = looseObject({
	language: string().optional(),
	fluency: string().optional()
});
var interestSchema = looseObject({
	name: string().optional(),
	keywords: array(string()).optional()
});
var referenceSchema = looseObject({
	name: string().optional(),
	reference: string().optional()
});
var projectSchema = looseObject({
	name: string().optional(),
	description: string().optional(),
	highlights: array(string()).optional(),
	keywords: array(string()).optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	url: url().optional(),
	roles: array(string()).optional(),
	entity: string().optional(),
	type: string().optional()
});
var metaSchema = looseObject({
	canonical: url().optional(),
	version: string().optional(),
	lastModified: string().optional()
});
var jsonResumeSchema = looseObject({
	$schema: url().optional(),
	basics: basicsSchema.optional(),
	work: array(workSchema).optional(),
	volunteer: array(volunteerSchema).optional(),
	education: array(educationSchema).optional(),
	awards: array(awardSchema).optional(),
	certificates: array(certificateSchema).optional(),
	publications: array(publicationSchema).optional(),
	skills: array(skillSchema).optional(),
	languages: array(languageSchema).optional(),
	interests: array(interestSchema).optional(),
	references: array(referenceSchema).optional(),
	projects: array(projectSchema).optional(),
	meta: metaSchema.optional()
});
function formatPeriod(startDate, endDate) {
	if (!startDate && !endDate) return "";
	if (!startDate) return endDate || "";
	if (!endDate) return `${startDate} - Present`;
	const formatDate = (date) => {
		const parts = date.split("-");
		if (parts.length === 3) {
			const [year, month] = parts;
			return `${[
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			][parseInt(month, 10) - 1]} ${year}`;
		}
		if (parts.length === 2) {
			const [year, month] = parts;
			return `${[
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			][parseInt(month, 10) - 1]} ${year}`;
		}
		return date;
	};
	return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
function formatSingleDate(date) {
	if (!date) return "";
	const parts = date.split("-");
	if (parts.length === 3) {
		const [year, month, day] = parts;
		return `${[
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		][parseInt(month, 10) - 1]} ${day}, ${year}`;
	}
	if (parts.length === 2) {
		const [year, month] = parts;
		return `${[
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		][parseInt(month, 10) - 1]} ${year}`;
	}
	return date;
}
function toHtmlDescription(summary, highlights) {
	const parts = [];
	if (summary) parts.push(`<p>${summary}</p>`);
	if (highlights && highlights.length > 0) {
		parts.push("<ul>");
		for (const highlight of highlights) parts.push(`<li>${highlight}</li>`);
		parts.push("</ul>");
	}
	return parts.join("");
}
function arrayToHtmlList(items) {
	if (!items || items.length === 0) return "";
	return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}
function formatLocation(location) {
	if (!location) return "";
	const parts = [];
	if (location.city) parts.push(location.city);
	if (location.region) parts.push(location.region);
	if (location.countryCode) parts.push(location.countryCode);
	return parts.join(", ");
}
function getNetworkIcon(network) {
	if (!network) return "star";
	const networkLower = network.toLowerCase();
	if (networkLower.includes("github")) return "github-logo";
	if (networkLower.includes("linkedin")) return "linkedin-logo";
	if (networkLower.includes("twitter") || networkLower.includes("x.com")) return "twitter-logo";
	if (networkLower.includes("facebook")) return "facebook-logo";
	if (networkLower.includes("instagram")) return "instagram-logo";
	if (networkLower.includes("youtube")) return "youtube-logo";
	if (networkLower.includes("stackoverflow") || networkLower.includes("stack-overflow")) return "stack-overflow-logo";
	if (networkLower.includes("medium")) return "medium-logo";
	if (networkLower.includes("dev.to") || networkLower.includes("devto")) return "code";
	if (networkLower.includes("dribbble")) return "dribbble-logo";
	if (networkLower.includes("behance")) return "behance-logo";
	if (networkLower.includes("gitlab")) return "git-branch";
	if (networkLower.includes("bitbucket")) return "code";
	if (networkLower.includes("codepen")) return "code";
	return "star";
}
function parseLevel(level) {
	if (!level) return 0;
	const levelLower = level.toLowerCase();
	const numeric = parseInt(levelLower, 10);
	if (!Number.isNaN(numeric) && numeric >= 0 && numeric <= 5) return numeric;
	if (levelLower.includes("native") || levelLower.includes("expert") || levelLower.includes("master")) return 5;
	if (levelLower.includes("fluent") || levelLower.includes("advanced") || levelLower.includes("proficient")) return 4;
	if (levelLower.includes("intermediate") || levelLower.includes("conversational")) return 3;
	if (levelLower.includes("beginner") || levelLower.includes("basic") || levelLower.includes("elementary")) return 2;
	if (levelLower.includes("novice")) return 1;
	if (levelLower.includes("c2")) return 5;
	if (levelLower.includes("c1")) return 4;
	if (levelLower.includes("b2")) return 3;
	if (levelLower.includes("b1")) return 2;
	if (levelLower.includes("a2")) return 1;
	if (levelLower.includes("a1")) return 1;
	return 0;
}
function createUrl(url, label) {
	if (!url) return {
		url: "",
		label: ""
	};
	return {
		url,
		label: label || url
	};
}
var JSONResumeImporter = class {
	convert(jsonResume) {
		const result = { ...defaultResumeData };
		if (jsonResume.basics) {
			const basics = jsonResume.basics;
			result.basics = {
				name: basics.name || "",
				headline: basics.label || "",
				email: basics.email || "",
				phone: basics.phone || "",
				location: basics.location ? formatLocation(basics.location) : "",
				website: createUrl(basics.url),
				customFields: []
			};
			if (basics.image) result.picture = {
				...defaultResumeData.picture,
				url: basics.image,
				hidden: false
			};
		}
		if (jsonResume.basics?.summary) result.summary = {
			...defaultResumeData.summary,
			content: `<p>${jsonResume.basics.summary}</p>`,
			hidden: false
		};
		if (jsonResume.work && jsonResume.work.length > 0) result.sections.experience = {
			...defaultResumeData.sections.experience,
			items: jsonResume.work.filter((work) => work.name || work.position).map((work) => ({
				id: generateId(),
				hidden: false,
				company: work.name || "",
				position: work.position || "",
				location: work.location || "",
				period: formatPeriod(work.startDate, work.endDate),
				website: createUrl(work.url),
				description: toHtmlDescription(work.summary, work.highlights)
			}))
		};
		if (jsonResume.education && jsonResume.education.length > 0) result.sections.education = {
			...defaultResumeData.sections.education,
			items: jsonResume.education.filter((edu) => edu.institution).map((edu) => ({
				id: generateId(),
				hidden: false,
				school: edu.institution || "",
				degree: [edu.studyType, edu.area].filter(Boolean).join(" in ") || "",
				area: edu.area || "",
				grade: edu.score || "",
				location: "",
				period: formatPeriod(edu.startDate, edu.endDate),
				website: createUrl(edu.url),
				description: edu.courses && edu.courses.length > 0 ? arrayToHtmlList(edu.courses) : ""
			}))
		};
		if (jsonResume.projects && jsonResume.projects.length > 0) result.sections.projects = {
			...defaultResumeData.sections.projects,
			items: jsonResume.projects.filter((project) => project.name).map((project) => ({
				id: generateId(),
				hidden: false,
				name: project.name || "",
				period: formatPeriod(project.startDate, project.endDate),
				website: createUrl(project.url),
				description: toHtmlDescription(project.description, project.highlights)
			}))
		};
		if (jsonResume.skills && jsonResume.skills.length > 0) result.sections.skills = {
			...defaultResumeData.sections.skills,
			items: jsonResume.skills.filter((skill) => skill.name).map((skill) => ({
				id: generateId(),
				hidden: false,
				icon: "star",
				name: skill.name || "",
				proficiency: skill.level || "",
				level: parseLevel(skill.level),
				keywords: skill.keywords || []
			}))
		};
		if (jsonResume.languages && jsonResume.languages.length > 0) result.sections.languages = {
			...defaultResumeData.sections.languages,
			items: jsonResume.languages.filter((lang) => lang.language).map((lang) => ({
				id: generateId(),
				hidden: false,
				language: lang.language || "",
				fluency: lang.fluency || "",
				level: parseLevel(lang.fluency)
			}))
		};
		if (jsonResume.interests && jsonResume.interests.length > 0) result.sections.interests = {
			...defaultResumeData.sections.interests,
			items: jsonResume.interests.filter((interest) => interest.name).map((interest) => ({
				id: generateId(),
				hidden: false,
				icon: "star",
				name: interest.name || "",
				keywords: interest.keywords || []
			}))
		};
		if (jsonResume.awards && jsonResume.awards.length > 0) result.sections.awards = {
			...defaultResumeData.sections.awards,
			items: jsonResume.awards.filter((award) => award.title).map((award) => ({
				id: generateId(),
				hidden: false,
				title: award.title || "",
				awarder: award.awarder || "",
				date: formatSingleDate(award.date),
				website: {
					url: "",
					label: ""
				},
				description: award.summary ? `<p>${award.summary}</p>` : ""
			}))
		};
		if (jsonResume.certificates && jsonResume.certificates.length > 0) result.sections.certifications = {
			...defaultResumeData.sections.certifications,
			items: jsonResume.certificates.filter((cert) => cert.name).map((cert) => ({
				id: generateId(),
				hidden: false,
				title: cert.name || "",
				issuer: cert.issuer || "",
				date: formatSingleDate(cert.date),
				website: createUrl(cert.url),
				description: ""
			}))
		};
		if (jsonResume.publications && jsonResume.publications.length > 0) result.sections.publications = {
			...defaultResumeData.sections.publications,
			items: jsonResume.publications.filter((pub) => pub.name).map((pub) => ({
				id: generateId(),
				hidden: false,
				title: pub.name || "",
				publisher: pub.publisher || "",
				date: formatSingleDate(pub.releaseDate),
				website: createUrl(pub.url),
				description: pub.summary ? `<p>${pub.summary}</p>` : ""
			}))
		};
		if (jsonResume.volunteer && jsonResume.volunteer.length > 0) result.sections.volunteer = {
			...defaultResumeData.sections.volunteer,
			items: jsonResume.volunteer.filter((vol) => vol.organization).map((vol) => ({
				id: generateId(),
				hidden: false,
				organization: vol.organization || "",
				location: "",
				period: formatPeriod(vol.startDate, vol.endDate),
				website: createUrl(vol.url),
				description: toHtmlDescription(vol.summary, vol.highlights)
			}))
		};
		if (jsonResume.references && jsonResume.references.length > 0) result.sections.references = {
			...defaultResumeData.sections.references,
			items: jsonResume.references.filter((ref) => ref.name || ref.reference).map((ref) => ({
				id: generateId(),
				hidden: false,
				name: ref.name || "",
				position: "",
				website: {
					url: "",
					label: ""
				},
				phone: "",
				description: ref.reference ? `<p>${ref.reference}</p>` : ""
			}))
		};
		if (jsonResume.basics?.profiles && jsonResume.basics.profiles.length > 0) result.sections.profiles = {
			...defaultResumeData.sections.profiles,
			items: jsonResume.basics.profiles.filter((profile) => profile.network).map((profile) => ({
				id: generateId(),
				hidden: false,
				icon: getNetworkIcon(profile.network),
				network: profile.network || "",
				username: profile.username || "",
				website: createUrl(profile.url, profile.username || profile.network)
			}))
		};
		return resumeDataSchema.parse(result);
	}
	parse(json) {
		try {
			const jsonResume = jsonResumeSchema.parse(JSON.parse(json));
			return this.convert(jsonResume);
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = flattenError(error);
				throw new Error(JSON.stringify(errors));
			}
			throw error;
		}
	}
};
var ReactiveResumeJSONImporter = class {
	parse(json) {
		try {
			return resumeDataSchema.parse(JSON.parse(json));
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = flattenError(error);
				throw new Error(JSON.stringify(errors));
			}
			throw error;
		}
	}
};
/** biome-ignore-all lint/style/noNonNullAssertion: only used in places where we know the value is not null */
function colorToRgba(color) {
	const parsed = parseRgbString(color);
	if (!parsed) return "rgba(0, 0, 0, 1)";
	return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${parsed.a})`;
}
var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
var nonNegative = (value) => Math.max(0, value);
var pxToPt = (px) => px * .75;
var clampPictureSize = (size) => clamp(size, 32, 512);
var clampRotation = (rotation) => clamp(rotation, 0, 360);
var clampAspectRatio = (ratio) => clamp(ratio, .5, 2.5);
var clampBorderRadius = (radius) => clamp(radius, 0, 100);
var clampFontSize = (size) => clamp(size, 6, 24);
var clampLineHeight = (height) => clamp(height, .5, 4);
var clampSidebarWidth = (width) => clamp(width, 10, 50);
var clampLevel = (level) => clamp(level, 0, 5);
var convertAndClampFontSize = (px) => clampFontSize(pxToPt(px));
var isValidEmail = (email) => {
	if (!email) return false;
	return zod_default.email().safeParse(email).success;
};
var sanitizeEmail = (email) => {
	if (!email) return "";
	return isValidEmail(email) ? email : "";
};
var FONT_WEIGHT_MAP = {
	regular: "400",
	italic: "400",
	"100": "100",
	"200": "200",
	"300": "300",
	"400": "400",
	"500": "500",
	"600": "600",
	"700": "700",
	"800": "800",
	"900": "900",
	bold: "700",
	"bold-italic": "700"
};
var convertFontVariantToWeight = (variant, defaultWeight = "400") => FONT_WEIGHT_MAP[variant.toLowerCase()] ?? defaultWeight;
var convertFontVariants = (variants, defaultWeight = "400") => {
	if (!variants || variants.length === 0) return [defaultWeight];
	return variants.map((v) => convertFontVariantToWeight(v, defaultWeight));
};
var convertFontVariantsForHeading = (variants) => {
	const filtered = convertFontVariants(variants, "600").filter((w) => Number.parseInt(w, 10) >= 600);
	return filtered.length > 0 ? filtered : ["600"];
};
var transformLayoutSectionId = (id) => {
	if (id.startsWith("custom.")) return id.slice(7);
	return id;
};
var transformLayoutColumn = (column) => {
	return column.filter((id) => id !== "summary").map(transformLayoutSectionId);
};
var ReactiveResumeV4JSONImporter = class {
	parse(json) {
		try {
			const v4Data = JSON.parse(json);
			const transformed = {
				picture: {
					hidden: v4Data.basics.picture?.effects?.hidden ?? false,
					url: v4Data.basics.picture?.url ?? "",
					size: clampPictureSize(v4Data.basics.picture?.size ?? 80),
					rotation: clampRotation(0),
					aspectRatio: clampAspectRatio(v4Data.basics.picture?.aspectRatio ?? 1),
					borderRadius: clampBorderRadius(v4Data.basics.picture?.borderRadius ?? 0),
					borderColor: v4Data.basics.picture?.effects?.border ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
					borderWidth: nonNegative(v4Data.basics.picture?.effects?.border ? 1 : 0),
					shadowColor: "rgba(0, 0, 0, 0.5)",
					shadowWidth: nonNegative(0)
				},
				basics: {
					name: v4Data.basics.name ?? "",
					headline: v4Data.basics.headline ?? "",
					email: sanitizeEmail(v4Data.basics.email),
					phone: v4Data.basics.phone ?? "",
					location: v4Data.basics.location ?? "",
					website: {
						url: v4Data.basics.url?.href ?? "",
						label: v4Data.basics.url?.label ?? ""
					},
					customFields: (v4Data.basics.customFields ?? []).map((field) => ({
						id: field.id ?? generateId(),
						icon: field.icon ?? "",
						text: field.text ?? "",
						link: ""
					}))
				},
				summary: {
					title: v4Data.sections.summary?.name ?? "",
					columns: v4Data.sections.summary?.columns ?? 1,
					hidden: !(v4Data.sections.summary?.visible ?? true),
					content: v4Data.sections.summary?.content ?? ""
				},
				sections: {
					profiles: {
						title: v4Data.sections.profiles?.name ?? "",
						columns: v4Data.sections.profiles?.columns ?? 1,
						hidden: !(v4Data.sections.profiles?.visible ?? true),
						items: (v4Data.sections.profiles?.items ?? []).filter((item) => item.network && item.network.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							icon: item.icon ?? "",
							network: item.network,
							username: item.username ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							}
						}))
					},
					experience: {
						title: v4Data.sections.experience?.name ?? "",
						columns: v4Data.sections.experience?.columns ?? 1,
						hidden: !(v4Data.sections.experience?.visible ?? true),
						items: (v4Data.sections.experience?.items ?? []).filter((item) => item.company && item.company.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							company: item.company,
							position: item.position ?? "",
							location: item.location ?? "",
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					education: {
						title: v4Data.sections.education?.name ?? "",
						columns: v4Data.sections.education?.columns ?? 1,
						hidden: !(v4Data.sections.education?.visible ?? true),
						items: (v4Data.sections.education?.items ?? []).filter((item) => item.institution && item.institution.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							school: item.institution,
							degree: item.studyType ?? "",
							area: item.area ?? "",
							grade: item.score ?? "",
							location: "",
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					projects: {
						title: v4Data.sections.projects?.name ?? "",
						columns: v4Data.sections.projects?.columns ?? 1,
						hidden: !(v4Data.sections.projects?.visible ?? true),
						items: (v4Data.sections.projects?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							name: item.name,
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? item.description ?? ""
						}))
					},
					skills: {
						title: v4Data.sections.skills?.name ?? "",
						columns: v4Data.sections.skills?.columns ?? 1,
						hidden: !(v4Data.sections.skills?.visible ?? true),
						items: (v4Data.sections.skills?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							icon: "",
							name: item.name,
							proficiency: item.description ?? "",
							level: clampLevel(item.level ?? 0),
							keywords: item.keywords ?? []
						}))
					},
					languages: {
						title: v4Data.sections.languages?.name ?? "",
						columns: v4Data.sections.languages?.columns ?? 1,
						hidden: !(v4Data.sections.languages?.visible ?? true),
						items: (v4Data.sections.languages?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							language: item.name,
							fluency: item.description ?? "",
							level: clampLevel(item.level ?? 0)
						}))
					},
					interests: {
						title: v4Data.sections.interests?.name ?? "",
						columns: v4Data.sections.interests?.columns ?? 1,
						hidden: !(v4Data.sections.interests?.visible ?? true),
						items: (v4Data.sections.interests?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							icon: "",
							name: item.name,
							keywords: item.keywords ?? []
						}))
					},
					awards: {
						title: v4Data.sections.awards?.name ?? "",
						columns: v4Data.sections.awards?.columns ?? 1,
						hidden: !(v4Data.sections.awards?.visible ?? true),
						items: (v4Data.sections.awards?.items ?? []).filter((item) => item.title && item.title.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							title: item.title,
							awarder: item.awarder ?? "",
							date: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					certifications: {
						title: v4Data.sections.certifications?.name ?? "",
						columns: v4Data.sections.certifications?.columns ?? 1,
						hidden: !(v4Data.sections.certifications?.visible ?? true),
						items: (v4Data.sections.certifications?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							title: item.name,
							issuer: item.issuer ?? "",
							date: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					publications: {
						title: v4Data.sections.publications?.name ?? "",
						columns: v4Data.sections.publications?.columns ?? 1,
						hidden: !(v4Data.sections.publications?.visible ?? true),
						items: (v4Data.sections.publications?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							title: item.name,
							publisher: item.publisher ?? "",
							date: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					volunteer: {
						title: v4Data.sections.volunteer?.name ?? "",
						columns: v4Data.sections.volunteer?.columns ?? 1,
						hidden: !(v4Data.sections.volunteer?.visible ?? true),
						items: (v4Data.sections.volunteer?.items ?? []).filter((item) => item.organization && item.organization.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							organization: item.organization,
							location: item.location ?? "",
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					references: {
						title: v4Data.sections.references?.name ?? "",
						columns: v4Data.sections.references?.columns ?? 1,
						hidden: !(v4Data.sections.references?.visible ?? true),
						items: (v4Data.sections.references?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId(),
							hidden: !(item.visible ?? true),
							name: item.name,
							position: item.description ?? "",
							phone: "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					}
				},
				customSections: Object.entries(v4Data.sections.custom ?? {}).map(([sectionId, section]) => ({
					id: section.id || sectionId,
					title: section.name ?? "",
					type: "experience",
					columns: section.columns ?? 1,
					hidden: !(section.visible ?? true),
					items: section.items.filter((item) => item.visible !== false).map((item, index) => ({
						id: item.id || generateId(),
						hidden: !item.visible,
						company: item.name?.trim() || `#${index + 1}`,
						position: item.description ?? "",
						location: item.location ?? "",
						period: item.date ?? "",
						website: {
							url: item.url?.href ?? "",
							label: item.url?.label ?? ""
						},
						description: item.summary ?? ""
					}))
				})),
				metadata: {
					template: templateSchema.safeParse(v4Data.metadata.template).success ? v4Data.metadata.template : "onyx",
					layout: {
						sidebarWidth: clampSidebarWidth(35),
						pages: (v4Data.metadata.layout ?? []).map((page) => {
							const main = transformLayoutColumn(page[0] ?? []);
							const sidebar = transformLayoutColumn(page[1] ?? []);
							return {
								fullWidth: sidebar.length === 0,
								main,
								sidebar
							};
						})
					},
					css: {
						enabled: v4Data.metadata.css?.visible ?? false,
						value: v4Data.metadata.css?.value ?? ""
					},
					page: {
						gapX: nonNegative(4),
						gapY: nonNegative(6),
						marginX: nonNegative(v4Data.metadata.page?.margin ?? 14),
						marginY: nonNegative(v4Data.metadata.page?.margin ?? 14),
						format: v4Data.metadata.page?.format ?? "a4",
						locale: "en-US",
						hideIcons: v4Data.metadata.typography?.hideIcons ?? false
					},
					design: {
						colors: {
							primary: v4Data.metadata.theme?.primary ? colorToRgba(v4Data.metadata.theme.primary) : "rgba(220, 38, 38, 1)",
							text: v4Data.metadata.theme?.text ? colorToRgba(v4Data.metadata.theme.text) : "rgba(0, 0, 0, 1)",
							background: v4Data.metadata.theme?.background ? colorToRgba(v4Data.metadata.theme.background) : "rgba(255, 255, 255, 1)"
						},
						level: {
							icon: "star",
							type: "circle"
						}
					},
					typography: {
						body: {
							fontFamily: v4Data.metadata.typography?.font?.family ?? "IBM Plex Serif",
							fontWeights: convertFontVariants(v4Data.metadata.typography?.font?.variants),
							fontSize: convertAndClampFontSize(v4Data.metadata.typography?.font?.size ?? 14.67),
							lineHeight: clampLineHeight(v4Data.metadata.typography?.lineHeight ?? 1.5)
						},
						heading: {
							fontFamily: v4Data.metadata.typography?.font?.family ?? "IBM Plex Serif",
							fontWeights: convertFontVariantsForHeading(v4Data.metadata.typography?.font?.variants),
							fontSize: clampFontSize(convertAndClampFontSize(v4Data.metadata.typography?.font?.size ?? 14.67) + 3),
							lineHeight: clampLineHeight(v4Data.metadata.typography?.lineHeight ?? 1.5)
						}
					},
					notes: v4Data.metadata.notes ?? ""
				}
			};
			if (v4Data.sections.summary?.visible && v4Data.sections.summary?.content) {
				if (transformed.metadata.layout.pages.length > 0) transformed.metadata.layout.pages[0].main.unshift("summary");
			}
			return resumeDataSchema.parse(transformed);
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = flattenError(error);
				throw new Error(JSON.stringify(errors));
			}
			throw error;
		}
	}
};
var extractTextFromPdf = async (file) => {
	const pdfjs = await import("../_libs/_21.mjs");
	pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
	let text = "";
	for (let i = 1; i <= pdf.numPages; i++) {
		const pageText = (await (await pdf.getPage(i)).getTextContent()).items.map((item) => item.str).join(" ");
		text += pageText + "\n\n";
	}
	return text;
};
var extractTextFromDocx = async (file) => {
	const mammoth = await import("../_libs/_20.mjs").then((m) => /* @__PURE__ */ __toESM(m.default));
	const arrayBuffer = await file.arrayBuffer();
	return (await mammoth.extractRawText({ arrayBuffer })).value;
};
var arrayBufferToBase64 = (buffer) => {
	return new Promise((resolve, reject) => {
		const chunks = [];
		const chunkSize = 8192;
		const uint8Array = new Uint8Array(buffer);
		let i = 0;
		while (i < uint8Array.length) {
			chunks.push(uint8Array.slice(i, i + chunkSize));
			i += chunkSize;
		}
		const blob = new Blob(chunks);
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;
			resolve(result.includes(",") ? result.split(",")[1] : result);
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};
var formSchema = zod_default.discriminatedUnion("type", [
	zod_default.object({ type: zod_default.literal("") }),
	zod_default.object({
		type: zod_default.literal("pdf"),
		file: zod_default.instanceof(File).refine((file) => file.type === "application/pdf", { message: "File must be a PDF" })
	}),
	zod_default.object({
		type: zod_default.literal("pdf-text"),
		file: zod_default.instanceof(File).refine((file) => file.type === "application/pdf", { message: "File must be a PDF" })
	}),
	zod_default.object({
		type: zod_default.literal("docx"),
		file: zod_default.instanceof(File).refine((file) => file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document", { message: "File must be a Microsoft Word document" })
	}),
	zod_default.object({
		type: zod_default.literal("docx-text"),
		file: zod_default.instanceof(File).refine((file) => file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document", { message: "File must be a Microsoft Word document" })
	}),
	zod_default.object({
		type: zod_default.literal("reactive-resume-json"),
		file: zod_default.instanceof(File).refine((file) => file.type === "application/json", { message: "File must be a JSON file" })
	}),
	zod_default.object({
		type: zod_default.literal("reactive-resume-v4-json"),
		file: zod_default.instanceof(File).refine((file) => file.type === "application/json", { message: "File must be a JSON file" })
	}),
	zod_default.object({
		type: zod_default.literal("json-resume-json"),
		file: zod_default.instanceof(File).refine((file) => file.type === "application/json", { message: "File must be a JSON file" })
	})
]);
function ImportResumeDialog(_) {
	const { enabled: isAIEnabled, provider, model, apiKey, baseURL } = useAIStore();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const prevTypeRef = (0, import_react.useRef)("");
	const inputRef = (0, import_react.useRef)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const { mutateAsync: importResume } = useMutation(orpc.resume.import.mutationOptions());
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: { type: "" }
	});
	const type = useWatch({
		control: form.control,
		name: "type"
	});
	(0, import_react.useEffect)(() => {
		if (prevTypeRef.current === type) return;
		prevTypeRef.current = type;
		form.resetField("file");
	}, [form.resetField, type]);
	const onSelectFile = () => {
		if (!inputRef.current) return;
		inputRef.current.click();
	};
	const onUploadFile = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		form.setValue("file", file, { shouldDirty: true });
	};
	const { blockEvents } = useFormBlocker(form);
	const onSubmit = async (values) => {
		if (values.type === "") return;
		setIsLoading(true);
		const toastId = toast.loading(i18n._({ id: "PLI0By" }), { description: isAIEnabled ? i18n._({ id: "qMiLNT" }) : i18n._({ id: "7oJ0I6" }) });
		try {
			let data;
			if (values.type === "json-resume-json") {
				const json = await values.file.text();
				data = new JSONResumeImporter().parse(json);
			}
			if (values.type === "reactive-resume-json") {
				const json = await values.file.text();
				data = new ReactiveResumeJSONImporter().parse(json);
			}
			if (values.type === "reactive-resume-v4-json") {
				const json = await values.file.text();
				data = new ReactiveResumeV4JSONImporter().parse(json);
			}
			if (values.type === "pdf" || values.type === "pdf-text") if (values.type === "pdf" && isAIEnabled) {
				console.log("Starting PDF import (AI)...");
				const base64 = await arrayBufferToBase64(await values.file.arrayBuffer());
				data = await client.ai.parsePdf({
					provider,
					model,
					apiKey,
					baseURL,
					file: {
						name: values.file.name,
						data: base64
					}
				});
				console.log("PDF parsed successfully by AI");
			} else {
				console.log("Starting PDF import (local client-side)...");
				try {
					const text = await extractTextFromPdf(values.file);
					const clone = JSON.parse(JSON.stringify(defaultResumeData));
					clone.basics.name = values.file.name.replace(/\.pdf$/i, "");
					const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
					clone.summary.content = `<p><strong>Extracted Content:</strong></p><p>${safeText}</p>`;
					data = clone;
				} catch (e) {
					console.error("Local PDF extraction failed", e);
					toast.error("Failed to extract text from PDF locally.");
					return;
				}
			}
			if (values.type === "docx" || values.type === "docx-text") if (values.type === "docx" && isAIEnabled) {
				console.log("Starting DOCX import (AI)...");
				const base64 = await arrayBufferToBase64(await values.file.arrayBuffer());
				const mediaType = values.file.type === "application/msword" ? "application/msword" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
				data = await client.ai.parseDocx({
					provider,
					model,
					apiKey,
					baseURL,
					mediaType,
					file: {
						name: values.file.name,
						data: base64
					}
				});
				console.log("DOCX parsed successfully by AI");
			} else {
				console.log("Starting DOCX import (local client-side)...");
				try {
					const text = await extractTextFromDocx(values.file);
					const clone = JSON.parse(JSON.stringify(defaultResumeData));
					clone.basics.name = values.file.name.replace(/\.docx?$/i, "");
					const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
					clone.summary.content = `<p><strong>Extracted Content:</strong></p><p>${safeText}</p>`;
					data = clone;
				} catch (e) {
					console.error("Local DOCX extraction failed", e);
					toast.error("Failed to extract text from DOCX locally.");
					return;
				}
			}
			if (!data) throw new Error("No data was returned from the AI provider.");
			const serializedData = JSON.parse(JSON.stringify(data));
			console.log("Calling importResume mutation...");
			console.log("Data type:", typeof serializedData, "Keys:", Object.keys(serializedData));
			await importResume({ data: serializedData });
			console.log("importResume mutation completed.");
			toast.success(i18n._({ id: "9GT8s1" }), {
				id: toastId,
				description: null
			});
			closeDialog();
		} catch (error) {
			console.error("Import failed:", error);
			console.error("Error type:", typeof error);
			console.error("Error message:", error instanceof Error ? error.message : String(error));
			let errorMessage = "An unknown error occurred while importing your resume.";
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage;
				try {
					const parsed = JSON.parse(error.message);
					if (parsed.message) errorMessage = parsed.message;
				} catch {}
			}
			toast.error(errorMessage, {
				id: toastId,
				description: null
			});
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "K03OvA" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "HifbWy" }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: form.handleSubmit(onSubmit),
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "type",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "+zy2Nq" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
								clearable: false,
								value: field.value,
								onValueChange: field.onChange,
								options: [
									{
										value: "reactive-resume-json",
										label: "UdaanResume (JSON)"
									},
									{
										value: "json-resume-json",
										label: "JSON Resume"
									},
									{
										value: "pdf",
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-x-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF (AI Parser)" }), isAIEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "scale-90 text-[10px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "jsQZMk" })
											})]
										}),
										disabled: !isAIEnabled
									},
									{
										value: "pdf-text",
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-x-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF (Text Only)" })
										})
									},
									{
										value: "docx",
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-x-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Microsoft Word (AI Parser)" }), isAIEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "scale-90 text-[10px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "jsQZMk" })
											})]
										}),
										disabled: !isAIEnabled
									},
									{
										value: "docx-text",
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-x-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Microsoft Word (Text Only)" })
										})
									}
								]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "file",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
							className: cn(!type && "hidden"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "file",
								className: "hidden",
								ref: inputRef,
								onChange: onUploadFile
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "h-auto w-full flex-col border-dashed py-8 font-normal",
								onClick: onSelectFile,
								children: field.value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
									weight: "thin",
									size: 32
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: field.value.name })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {
									weight: "thin",
									size: 32
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "P27Jj3" })] })
							})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})]
						})
					}, type),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: !type || isLoading,
						children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null, isLoading ? i18n._({ id: "hdsaJo" }) : i18n._({ id: "l3s5ri" })]
					}) })
				]
			})
		})]
	});
}
export { ImportResumeDialog, ImportResumeDialog as default };

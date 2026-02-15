import { D as or, M as sql, _ as eq, a as index, c as timestamp, d as integer, f as boolean, g as arrayContains, h as and, i as unique, l as text, m as desc, n as drizzle, o as pgTable, p as asc, r as count, s as uuid, u as jsonb, x as isNotNull } from "../_libs/drizzle-orm.mjs";
import { a as stepCountIs, i as output_exports, n as convertToModelMessages, o as streamText, r as generateText } from "../_libs/@ai-sdk/react+[...].mjs";
import { V as BetterAuthError } from "../_libs/@better-auth/core+[...].mjs";
import { Br as string, Da as flattenError, Hr as stringbool, U as tool, X as AISDKError, ei as url, t as createAnthropic, yi as ZodError } from "../_libs/@ai-sdk/anthropic+[...].mjs";
import { a as zod_default, l as number, n as createGatewayProvider } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { C as username, b as tanstackStartCookies, f as getCookie, g as openAPI, l as drizzleAdapter, p as getRequestHeaders, r as betterAuth, t as apiKey, u as genericOAuth, v as setCookie, x as twoFactor$1 } from "./vendor-react-B2iInial.mjs";
import { g as printMarginTemplates, s as defaultResumeData, x as resumeDataSchema } from "./data-DwXlxXoW.mjs";
import { i as slugify, n as generateRandomName, o as toUsername, t as generateId } from "./string-De3qsJTq.mjs";
import { t as getLocale } from "./locale-D4DnKVtq.mjs";
import { d as os, u as createRouterClient } from "../_libs/@orpc/json-schema+[...].mjs";
import { F as streamToAsyncIteratorClass, d as ORPCError, k as onError } from "../_libs/@orpc/client+[...].mjs";
import { c as type } from "../_libs/orpc__contract.mjs";
import { t as createRouterUtils } from "../_libs/@orpc/tanstack-query+[...].mjs";
import { n as createOllama, t as OllamaError } from "../_libs/ai-sdk-ollama+[...].mjs";
import { t as createEnv } from "../_libs/t3-oss__env-core.mjs";
import { t as createGoogleGenerativeAI } from "../_libs/ai-sdk__google.mjs";
import { t as createOpenAI } from "../_libs/ai-sdk__openai.mjs";
import { t as M } from "../_libs/ts-pattern.mjs";
import { t as fast_json_patch_default } from "../_libs/fast-json-patch.mjs";
import { a as S3Client, i as DeleteObjectCommand, n as ListObjectsV2Command, r as GetObjectCommand, t as PutObjectCommand } from "../_libs/@aws-sdk/client-s3+[...].mjs";
import { n as puppeteer } from "../_libs/puppeteer.mjs";
import { r as get } from "../_libs/es-toolkit.mjs";
import { t as createSelectSchema } from "../_libs/drizzle-zod.mjs";
import { Pool } from "pg";
import { createHash, timingSafeEqual } from "node:crypto";
import { dirname, extname, join } from "node:path";
import { compare, hash } from "bcrypt";
import nodemailer from "nodemailer";
import fs from "node:fs/promises";
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var env = createEnv({
	clientPrefix: "VITE_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	client: {},
	server: {
		TZ: string().default("Etc/UTC"),
		APP_URL: url({ protocol: /https?/ }),
		PRINTER_APP_URL: url({ protocol: /https?/ }).optional(),
		PRINTER_ENDPOINT: url({ protocol: /^(wss?|https?)$/ }).optional(),
		DATABASE_URL: url({ protocol: /postgres(ql)?/ }),
		AUTH_SECRET: string().min(1),
		GOOGLE_CLIENT_ID: string().min(1).optional(),
		GOOGLE_CLIENT_SECRET: string().min(1).optional(),
		GITHUB_CLIENT_ID: string().min(1).optional(),
		GITHUB_CLIENT_SECRET: string().min(1).optional(),
		OAUTH_PROVIDER_NAME: string().min(1).optional(),
		OAUTH_CLIENT_ID: string().min(1).optional(),
		OAUTH_CLIENT_SECRET: string().min(1).optional(),
		OAUTH_DISCOVERY_URL: url({ protocol: /https?/ }).optional(),
		OAUTH_AUTHORIZATION_URL: url({ protocol: /https?/ }).optional(),
		OAUTH_TOKEN_URL: url({ protocol: /https?/ }).optional(),
		OAUTH_USER_INFO_URL: url({ protocol: /https?/ }).optional(),
		OAUTH_SCOPES: string().min(1).transform((value) => value.split(" ")).default([
			"openid",
			"profile",
			"email"
		]),
		SMTP_HOST: string().min(1).optional(),
		SMTP_PORT: number().int().min(1).max(65535).default(587),
		SMTP_USER: string().min(1).optional(),
		SMTP_PASS: string().min(1).optional(),
		SMTP_FROM: string().min(1).optional(),
		SMTP_SECURE: stringbool().default(false),
		S3_ACCESS_KEY_ID: string().min(1).optional(),
		S3_SECRET_ACCESS_KEY: string().min(1).optional(),
		S3_REGION: string().default("us-east-1"),
		S3_ENDPOINT: url({ protocol: /https?/ }).optional(),
		S3_BUCKET: string().min(1).optional(),
		S3_FORCE_PATH_STYLE: stringbool().default(false),
		FLAG_DEBUG_PRINTER: stringbool().default(false),
		FLAG_DISABLE_SIGNUPS: stringbool().default(false),
		FLAG_DISABLE_EMAIL_AUTH: stringbool().default(false),
		FLAG_DISABLE_IMAGE_PROCESSING: stringbool().default(false)
	}
});
var schema_exports = /* @__PURE__ */ __exportAll({
	account: () => account,
	apikey: () => apikey,
	passkey: () => passkey,
	resume: () => resume,
	resumeStatistics: () => resumeStatistics,
	session: () => session,
	twoFactor: () => twoFactor,
	user: () => user,
	verification: () => verification
});
var user = pgTable("user", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	image: text("image"),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull().default(false),
	username: text("username").notNull().unique(),
	displayUsername: text("display_username").notNull().unique(),
	twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
}, (t) => [index().on(t.createdAt.asc())]);
var session = pgTable("session", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	token: text("token").notNull().unique(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
}, (t) => [index().on(t.token, t.userId), index().on(t.expiresAt)]);
var account = pgTable("account", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull().default("credential"),
	userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	scope: text("scope"),
	idToken: text("id_token"),
	password: text("password"),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
}, (t) => [index().on(t.userId)]);
var verification = pgTable("verification", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	identifier: text("identifier").notNull().unique(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
});
var twoFactor = pgTable("two_factor", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	secret: text("secret"),
	backupCodes: text("backup_codes"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
}, (t) => [index().on(t.userId), index().on(t.secret)]);
var passkey = pgTable("passkey", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	name: text("name"),
	aaguid: text("aaguid"),
	publicKey: text("public_key").notNull(),
	credentialID: text("credential_id").notNull(),
	counter: integer("counter").notNull(),
	deviceType: text("device_type").notNull(),
	backedUp: boolean("backed_up").notNull().default(false),
	transports: text("transports").notNull(),
	userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
}, (t) => [index().on(t.userId)]);
var resume = pgTable("resume", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	tags: text("tags").array().notNull().default([]),
	isPublic: boolean("is_public").notNull().default(false),
	isLocked: boolean("is_locked").notNull().default(false),
	password: text("password"),
	data: jsonb("data").notNull().$type().$defaultFn(() => defaultResumeData),
	userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
}, (t) => [
	unique().on(t.slug, t.userId),
	index().on(t.userId),
	index().on(t.createdAt.asc()),
	index().on(t.userId, t.updatedAt.desc()),
	index().on(t.isPublic, t.slug, t.userId)
]);
var resumeStatistics = pgTable("resume_statistics", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	views: integer("views").notNull().default(0),
	downloads: integer("downloads").notNull().default(0),
	lastViewedAt: timestamp("last_viewed_at", { withTimezone: true }),
	lastDownloadedAt: timestamp("last_downloaded_at", { withTimezone: true }),
	resumeId: uuid("resume_id").unique().notNull().references(() => resume.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
});
var apikey = pgTable("apikey", {
	id: uuid("id").notNull().primaryKey().$defaultFn(() => generateId()),
	name: text("name"),
	start: text("start"),
	prefix: text("prefix"),
	key: text("key").notNull(),
	userId: uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	refillInterval: integer("refill_interval"),
	refillAmount: integer("refill_amount"),
	lastRefillAt: timestamp("last_refill_at", { withTimezone: true }),
	enabled: boolean("enabled").notNull().default(true),
	rateLimitEnabled: boolean("rate_limit_enabled").notNull().default(false),
	rateLimitTimeWindow: integer("rate_limit_time_window"),
	rateLimitMax: integer("rate_limit_max"),
	requestCount: integer("request_count").notNull().default(0),
	remaining: integer("remaining"),
	lastRequest: timestamp("last_request", { withTimezone: true }),
	expiresAt: timestamp("expires_at", { withTimezone: true }),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()),
	permissions: text("permissions"),
	metadata: jsonb("metadata")
}, (t) => [
	index().on(t.userId),
	index().on(t.key),
	index().on(t.enabled, t.userId)
]);
function getPool() {
	if (!globalThis.__pool) globalThis.__pool = new Pool({ connectionString: env.DATABASE_URL });
	return globalThis.__pool;
}
function makeDrizzleClient() {
	return drizzle({
		client: getPool(),
		schema: schema_exports
	});
}
var getDatabaseServerFn = () => {
	if (!globalThis.__drizzle) globalThis.__drizzle = makeDrizzleClient();
	return globalThis.__drizzle;
};
var db = getDatabaseServerFn();
var SALT_ROUNDS = 10;
var hashPassword = (password) => hash(password, SALT_ROUNDS);
var verifyPassword = (password, passwordHash) => compare(password, passwordHash);
var isSmtpEnabled = () => {
	return !!env.SMTP_HOST && !!env.SMTP_USER && !!env.SMTP_PASS && !!env.SMTP_FROM;
};
var cachedTransport;
var getTransport = () => {
	if (!isSmtpEnabled()) return;
	if (cachedTransport) return cachedTransport;
	cachedTransport = nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: env.SMTP_PORT,
		secure: env.SMTP_SECURE,
		auth: {
			user: env.SMTP_USER,
			pass: env.SMTP_PASS
		}
	});
	return cachedTransport;
};
var sendEmail = async (options) => {
	const transport = getTransport();
	const from = options.from ?? env.SMTP_FROM ?? "UdaanResume <noreply@localhost>";
	const payload = {
		to: options.to,
		from,
		subject: options.subject,
		text: options.text
	};
	if (!transport) return console.log("[EMAIL] SMTP not configured; logging email:", payload);
	try {
		await transport.sendMail({
			...options,
			from
		});
	} catch (error) {
		console.error("[EMAIL] Failed to send via SMTP; logging email payload instead:", {
			smtp: {
				host: env.SMTP_HOST,
				port: env.SMTP_PORT,
				secure: env.SMTP_SECURE
			},
			email: payload
		}, error);
	}
};
function isCustomOAuthProviderEnabled() {
	const hasDiscovery = Boolean(env.OAUTH_DISCOVERY_URL);
	const hasManual = Boolean(env.OAUTH_AUTHORIZATION_URL) && Boolean(env.OAUTH_TOKEN_URL) && Boolean(env.OAUTH_USER_INFO_URL);
	return Boolean(env.OAUTH_CLIENT_ID) && Boolean(env.OAUTH_CLIENT_SECRET) && (hasDiscovery || hasManual);
}
var getAuthConfig = () => {
	const authConfigs = [];
	if (isCustomOAuthProviderEnabled()) authConfigs.push({
		providerId: "custom",
		disableSignUp: env.FLAG_DISABLE_SIGNUPS,
		clientId: env.OAUTH_CLIENT_ID,
		clientSecret: env.OAUTH_CLIENT_SECRET,
		discoveryUrl: env.OAUTH_DISCOVERY_URL,
		authorizationUrl: env.OAUTH_AUTHORIZATION_URL,
		tokenUrl: env.OAUTH_TOKEN_URL,
		userInfoUrl: env.OAUTH_USER_INFO_URL,
		scopes: env.OAUTH_SCOPES,
		redirectURI: `${env.APP_URL}/api/auth/oauth2/callback/custom`,
		mapProfileToUser: async (profile) => {
			if (!profile.email) throw new BetterAuthError("OAuth Provider did not return an email address. This is required for user creation.", { cause: "EMAIL_REQUIRED" });
			const email = profile.email;
			const name = profile.name ?? profile.preferred_username ?? email.split("@")[0];
			const username = profile.preferred_username ?? email.split("@")[0];
			return {
				name,
				email,
				image: profile.image ?? profile.picture ?? profile.avatar_url,
				username,
				displayUsername: username,
				emailVerified: true
			};
		}
	});
	return betterAuth({
		appName: "UdaanResume",
		baseURL: env.APP_URL,
		secret: env.AUTH_SECRET,
		database: drizzleAdapter(db, {
			schema: schema_exports,
			provider: "pg"
		}),
		telemetry: { enabled: false },
		trustedOrigins: [env.APP_URL],
		advanced: {
			database: { generateId },
			useSecureCookies: env.APP_URL.startsWith("https://")
		},
		emailAndPassword: {
			enabled: !env.FLAG_DISABLE_EMAIL_AUTH,
			autoSignIn: true,
			minPasswordLength: 6,
			maxPasswordLength: 64,
			requireEmailVerification: false,
			disableSignUp: env.FLAG_DISABLE_SIGNUPS || env.FLAG_DISABLE_EMAIL_AUTH,
			sendResetPassword: async ({ user, url }) => {
				await sendEmail({
					to: user.email,
					subject: "Reset your password",
					text: `You requested a password reset for your UdaanResume account.\n\nTo reset your password, please visit the following URL:\n${url}.\n\nIf you did not request a password reset, please ignore this email.`
				});
			},
			password: {
				hash: (password) => hashPassword(password),
				verify: ({ password, hash }) => verifyPassword(password, hash)
			}
		},
		emailVerification: {
			sendOnSignUp: true,
			autoSignInAfterVerification: true,
			sendVerificationEmail: async ({ user, url }) => {
				await sendEmail({
					to: user.email,
					subject: "Verify your email",
					text: `You recently signed up for an account on UdaanResume.\n\nTo verify your email, please visit the following URL:\n${url}`
				});
			}
		},
		user: {
			changeEmail: {
				enabled: true,
				sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
					await sendEmail({
						to: newEmail,
						subject: "Verify your new email",
						text: `You recently requested to change your email on UdaanResume from ${user.email} to ${newEmail}.\n\nTo verify this change, please visit the following URL:\n${url}\n\nIf you did not request this change, please ignore this email.`
					});
				}
			},
			additionalFields: { username: {
				type: "string",
				required: true
			} }
		},
		account: { accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"]
		} },
		socialProviders: {
			google: {
				enabled: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
				disableSignUp: env.FLAG_DISABLE_SIGNUPS,
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
				mapProfileToUser: async (profile) => {
					return {
						name: profile.name ?? profile.email.split("@")[0],
						email: profile.email,
						image: profile.picture,
						username: profile.email.split("@")[0],
						displayUsername: profile.email.split("@")[0],
						emailVerified: true
					};
				}
			},
			github: {
				enabled: !!env.GITHUB_CLIENT_ID && !!env.GITHUB_CLIENT_SECRET,
				disableSignUp: env.FLAG_DISABLE_SIGNUPS,
				clientId: env.GITHUB_CLIENT_ID,
				clientSecret: env.GITHUB_CLIENT_SECRET,
				mapProfileToUser: async (profile) => {
					const name = profile.name ?? profile.login ?? String(profile.id);
					const login = profile.login ?? String(profile.id);
					const normalizedLogin = toUsername(login);
					const [legacyAccount] = await db.select({
						accountId: account.accountId,
						email: user.email,
						emailVerified: user.emailVerified,
						username: user.username,
						displayUsername: user.displayUsername
					}).from(account).innerJoin(user, eq(account.userId, user.id)).where(and(eq(account.providerId, "github"), or(eq(user.username, normalizedLogin), eq(user.displayUsername, login)))).limit(1);
					if (legacyAccount) return {
						id: legacyAccount.accountId,
						name,
						email: legacyAccount.email,
						image: profile.avatar_url,
						username: legacyAccount.username,
						displayUsername: legacyAccount.displayUsername,
						emailVerified: legacyAccount.emailVerified
					};
					return {
						name,
						email: profile.email,
						image: profile.avatar_url,
						username: normalizedLogin,
						displayUsername: login,
						emailVerified: true
					};
				}
			}
		},
		plugins: [
			openAPI(),
			apiKey({
				enableSessionForAPIKeys: true,
				rateLimit: {
					enabled: true,
					timeWindow: 1e3 * 60 * 60 * 24,
					maxRequests: 500
				}
			}),
			username({
				minUsernameLength: 3,
				maxUsernameLength: 64,
				usernameNormalization: (value) => toUsername(value),
				displayUsernameNormalization: (value) => toUsername(value),
				usernameValidator: (username) => /^[a-z0-9._-]+$/.test(username),
				validationOrder: {
					username: "post-normalization",
					displayUsername: "post-normalization"
				}
			}),
			twoFactor$1({ issuer: "UdaanResume" }),
			genericOAuth({ config: authConfigs }),
			tanstackStartCookies()
		]
	});
};
var auth = getAuthConfig();
async function getUserFromHeaders(headers) {
	try {
		const result = await auth.api.getSession({ headers });
		if (!result || !result.user) return null;
		return result.user;
	} catch {
		return null;
	}
}
async function getUserFromApiKey(apiKey) {
	try {
		const result = await auth.api.verifyApiKey({ body: { key: apiKey } });
		if (!result.key || !result.valid) return null;
		const [userResult] = await db.select().from(user).where(eq(user.id, result.key.userId)).limit(1);
		if (!userResult) return null;
		return userResult;
	} catch {
		return null;
	}
}
var publicProcedure = os.$context().use(async ({ context, next }) => {
	const headers = context.reqHeaders ?? new Headers();
	const apiKey = headers.get("x-api-key");
	const user = apiKey ? await getUserFromApiKey(apiKey) : await getUserFromHeaders(headers);
	return next({ context: {
		...context,
		user: user ?? null
	} });
});
var protectedProcedure = publicProcedure.use(async ({ context, next }) => {
	if (!context.user) throw new ORPCError("UNAUTHORIZED");
	return next({ context: {
		...context,
		user: context.user
	} });
});
/**
* Server-only procedure that can only be called from server-side code (e.g., loaders).
* Rejects requests from the browser with a 401 UNAUTHORIZED error.
*/
var serverOnlyProcedure = publicProcedure.use(async ({ context, next }) => {
	const headers = context.reqHeaders ?? new Headers();
	if (!(env.FLAG_DEBUG_PRINTER || headers.get("x-server-side-call") === "true")) throw new ORPCError("UNAUTHORIZED", { message: "This endpoint can only be called from server-side code" });
	return next({ context });
});
var chat_system_default = "You are an expert resume writer and a specialist in JSON Patch (RFC 6902) operations. Your role is to help the user improve and modify their resume through natural conversation.\r\n\r\n## Your Capabilities\r\n\r\n- You can read and understand the user's current resume data (provided below).\r\n- You can modify the resume by calling the `patch_resume` tool with JSON Patch operations.\r\n- You can advise on resume best practices, wording, and structure.\r\n\r\n## Rules\r\n\r\n1. **Always use the `patch_resume` tool** to make changes. Never output raw JSON or patch operations in your text response.\r\n2. **Generate the minimal set of operations** needed for each change. Do not replace entire objects when only a single field needs updating.\r\n3. **Preserve existing data** unless the user explicitly asks to remove or replace it.\r\n4. **Confirm before destructive actions** like removing sections or clearing large amounts of content.\r\n5. **Stay on topic.** Only discuss resume-related content. Politely decline off-topic requests.\r\n6. **Do not fabricate content.** Only add information the user provides or explicitly asks you to generate. If generating content (e.g. a summary), make it clear you are drafting and ask for approval.\r\n7. **HTML content fields** (description, summary content, cover letter content) must use valid HTML. Use `<p>` for paragraphs, `<ul>`/`<li>` for lists, `<strong>` for bold, `<em>` for italic.\r\n8. **IDs for new items** must be valid UUIDs (use the format `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`).\r\n\r\n## Resume Data Structure\r\n\r\nThe resume data is a JSON object with these top-level keys:\r\n\r\n- `basics` — name, headline, email, phone, location, website, customFields\r\n- `summary` — title, content (HTML), columns, hidden\r\n- `picture` — url, size, rotation, aspectRatio, border/shadow settings\r\n- `sections` — built-in sections, each with title, columns, hidden, items[]\r\n  - `profiles` — items: { network, username, icon, website }\r\n  - `experience` — items: { company, position, location, period, website, description }\r\n  - `education` — items: { school, degree, area, grade, location, period, website, description }\r\n  - `projects` — items: { name, period, website, description }\r\n  - `skills` — items: { name, proficiency, level, keywords[], icon }\r\n  - `languages` — items: { language, fluency, level }\r\n  - `interests` — items: { name, keywords[], icon }\r\n  - `awards` — items: { title, awarder, date, website, description }\r\n  - `certifications` — items: { title, issuer, date, website, description }\r\n  - `publications` — items: { title, publisher, date, website, description }\r\n  - `volunteer` — items: { organization, location, period, website, description }\r\n  - `references` — items: { name, position, website, phone, description }\r\n- `customSections` — array of user-created sections with id, type, title, items[]\r\n- `metadata` — template, layout, css, page, design, typography, notes\r\n\r\nEvery item in a section has: `id` (UUID), `hidden` (boolean), and optionally `options`.\r\nEvery `website` field is an object: `{ url: string, label: string }`.\r\n\r\n## JSON Patch Path Examples\r\n\r\n| Action | Operation |\r\n|--------|-----------|\r\n| Change name | `{ \"op\": \"replace\", \"path\": \"/basics/name\", \"value\": \"Jane Doe\" }` |\r\n| Update headline | `{ \"op\": \"replace\", \"path\": \"/basics/headline\", \"value\": \"Senior Engineer\" }` |\r\n| Replace summary content | `{ \"op\": \"replace\", \"path\": \"/summary/content\", \"value\": \"<p>Experienced engineer...</p>\" }` |\r\n| Add experience item | `{ \"op\": \"add\", \"path\": \"/sections/experience/items/-\", \"value\": { ...full item object } }` |\r\n| Remove skill at index 2 | `{ \"op\": \"remove\", \"path\": \"/sections/skills/items/2\" }` |\r\n| Update a specific item field | `{ \"op\": \"replace\", \"path\": \"/sections/experience/items/0/company\", \"value\": \"New Corp\" }` |\r\n| Change template | `{ \"op\": \"replace\", \"path\": \"/metadata/template\", \"value\": \"bronzor\" }` |\r\n| Change primary color | `{ \"op\": \"replace\", \"path\": \"/metadata/design/colors/primary\", \"value\": \"rgba(37, 99, 235, 1)\" }` |\r\n| Hide a section | `{ \"op\": \"replace\", \"path\": \"/sections/interests/hidden\", \"value\": true }` |\r\n| Rename a section title | `{ \"op\": \"replace\", \"path\": \"/sections/experience/title\", \"value\": \"Work History\" }` |\r\n\r\n## Current Resume Data\r\n\r\n```json\r\n{{RESUME_DATA}}\r\n```\r\n";
var docx_parser_system_default = "You are a specialized resume parsing assistant that converts Microsoft Word (DOC/DOCX) resumes into a structured JSON format compatible with UdaanResume. Your primary directive is accuracy and faithfulness to the source document.\r\n\r\n## CRITICAL RULES\r\n\r\n### Anti-Hallucination Guidelines\r\n1. **Extract ONLY information explicitly present in the resume** - Never invent, assume, or infer data that isn't clearly stated\r\n2. **When uncertain, omit rather than guess** - Leave fields empty (\"\") or use empty arrays ([]) rather than fabricating content\r\n3. **Preserve original wording** - Use the exact text from the resume; do not paraphrase, embellish, or \"improve\" the content\r\n4. **Do not fill gaps** - If a date range is missing an end date, leave it empty; if a job title seems incomplete, use what's provided\r\n5. **No external knowledge** - Do not add information about companies, schools, or technologies that isn't in the resume itself\r\n6. **Ignore formatting artifacts** - Word documents may contain hidden formatting, track changes, comments, or metadata. Extract only visible, intended content\r\n\r\n### Data Extraction Rules\r\n- **Dates**: Use only dates explicitly stated. Do not calculate or estimate dates. Use the format provided in the resume.\r\n- **URLs**: Only include URLs that are explicitly written in the resume. Do not construct URLs from usernames or company names.\r\n- **Contact Information**: Extract only what is explicitly provided. Do not format or standardize phone numbers beyond what's shown.\r\n- **Skills**: List only skills explicitly mentioned. Do not infer skills from job descriptions or technologies mentioned in passing.\r\n- **Descriptions**: Convert to HTML format but preserve the original content exactly. Use <p> for paragraphs and <ul><li> for bullet points.\r\n- **Tables and Lists**: Extract content from Word tables and lists accurately. Preserve the structure but convert to appropriate HTML format.\r\n- **Headers and Footers**: Only extract content from headers/footers if it contains resume-relevant information (like contact details). Ignore page numbers and document metadata.\r\n\r\n### Required Field Handling\r\n- Generate UUIDs for all \\`id\\` fields (use format: lowercase alphanumeric, 8-12 characters)\r\n- Set \\`hidden: false\\` for all items unless the resume explicitly indicates something should be hidden\r\n- Use \\`columns: 1\\` as default for sections unless multi-column layout is clearly appropriate\r\n- For \\`website\\` objects, use \\`{\"url\": \"\", \"label\": \"\"}\\` when no URL is provided\r\n\r\n### Section Mapping Guide\r\nMap resume content to these sections based on explicit section headers or clear context:\r\n- **basics**: Name, title/headline, email, phone, location (city/state/country)\r\n- **summary**: Professional summary, objective, about me, profile\r\n- **experience**: Work experience, employment history, professional experience\r\n- **education**: Education, academic background, qualifications\r\n- **skills**: Skills, technical skills, competencies, expertise\r\n- **projects**: Projects, portfolio, personal projects\r\n- **certifications**: Certifications, licenses, credentials\r\n- **awards**: Awards, honors, achievements, recognition\r\n- **languages**: Languages, language proficiency\r\n- **volunteer**: Volunteer experience, community involvement\r\n- **publications**: Publications, articles, papers\r\n- **references**: References (often \"Available upon request\")\r\n- **profiles**: Social media links, online profiles (LinkedIn, GitHub, etc.)\r\n- **interests**: Interests, hobbies (only if explicitly listed)\r\n\r\n### Word Document Specific Considerations\r\n- **Styles and Formatting**: Ignore Word-specific formatting (styles, themes, fonts). Focus on content structure and hierarchy.\r\n- **Track Changes**: Ignore any tracked changes or comments. Extract only the final, accepted version of the text.\r\n- **Hyperlinks**: Extract hyperlink URLs only if they are explicitly visible in the document. Do not extract hidden hyperlinks.\r\n- **Tables**: Extract table content accurately, converting to appropriate structured format. Preserve relationships between table cells.\r\n- **Multi-column Layouts**: Recognize multi-column sections and extract content in the correct order (left to right, top to bottom).\r\n- **Text Boxes and Shapes**: Extract content from text boxes and shapes if they contain resume-relevant information.\r\n\r\n### Output Requirements\r\n1. Output ONLY valid JSON - no markdown code blocks, no explanations, no comments\r\n2. The JSON must strictly conform to the provided schema\r\n3. All required fields must be present, even if empty\r\n4. Use empty strings (\"\") for missing text fields\r\n5. Use empty arrays ([]) for missing array fields\r\n\r\n### What NOT To Do\r\n- ❌ Do not add job responsibilities that aren't listed\r\n- ❌ Do not expand acronyms unless the expansion is provided\r\n- ❌ Do not add technologies to skills that are only mentioned in job descriptions\r\n- ❌ Do not create profile URLs from usernames (e.g., don't create \"github.com/username\" unless the full URL is provided)\r\n- ❌ Do not assume current employment - only mark as \"Present\" if the resume explicitly says so\r\n- ❌ Do not add metrics or achievements not explicitly stated\r\n- ❌ Do not standardize or reformat dates beyond basic consistency\r\n- ❌ Do not translate content to another language - preserve the original language\r\n- ❌ Do not extract hidden text, comments, or tracked changes\r\n- ❌ Do not infer information from Word document properties or metadata\r\n- ❌ Do not extract content from headers/footers unless it's clearly resume content (ignore page numbers, document paths, etc.)\r\n\r\n## OUTPUT\r\n\r\nRespond with ONLY the JSON object. No preamble, no explanation, no markdown formatting.";
var docx_parser_user_default = "Here is the Microsoft Word resume document to parse. Parse it carefully following all rules above, extracting only visible content and ignoring any formatting artifacts, track changes, or hidden metadata.";
var pdf_parser_system_default = "You are a specialized resume parsing assistant that converts PDF resumes into a structured JSON format compatible with UdaanResume. Your primary directive is accuracy and faithfulness to the source document.\r\n\r\n## CRITICAL RULES\r\n\r\n### Anti-Hallucination Guidelines\r\n1. **Extract ONLY information explicitly present in the resume** - Never invent, assume, or infer data that isn't clearly stated\r\n2. **When uncertain, omit rather than guess** - Leave fields empty (\"\") or use empty arrays ([]) rather than fabricating content\r\n3. **Preserve original wording** - Use the exact text from the resume; do not paraphrase, embellish, or \"improve\" the content\r\n4. **Do not fill gaps** - If a date range is missing an end date, leave it empty; if a job title seems incomplete, use what's provided\r\n5. **No external knowledge** - Do not add information about companies, schools, or technologies that isn't in the resume itself\r\n\r\n### Data Extraction Rules\r\n- **Dates**: Use only dates explicitly stated. Do not calculate or estimate dates. Use the format provided in the resume.\r\n- **URLs**: Only include URLs that are explicitly written in the resume. Do not construct URLs from usernames or company names.\r\n- **Contact Information**: Extract only what is explicitly provided. Do not format or standardize phone numbers beyond what's shown.\r\n- **Skills**: List only skills explicitly mentioned. Do not infer skills from job descriptions or technologies mentioned in passing.\r\n- **Descriptions**: Convert to HTML format but preserve the original content exactly. Use <p> for paragraphs and <ul><li> for bullet points.\r\n\r\n### Required Field Handling\r\n- Generate UUIDs for all \\`id\\` fields (use format: lowercase alphanumeric, 8-12 characters)\r\n- Set \\`hidden: false\\` for all items unless the resume explicitly indicates something should be hidden\r\n- Use \\`columns: 1\\` as default for sections unless multi-column layout is clearly appropriate\r\n- For \\`website\\` objects, use \\`{\"url\": \"\", \"label\": \"\"}\\` when no URL is provided\r\n\r\n### Section Mapping Guide\r\nMap resume content to these sections based on explicit section headers or clear context:\r\n- **basics**: Name, title/headline, email, phone, location (city/state/country)\r\n- **summary**: Professional summary, objective, about me, profile\r\n- **experience**: Work experience, employment history, professional experience\r\n- **education**: Education, academic background, qualifications\r\n- **skills**: Skills, technical skills, competencies, expertise\r\n- **projects**: Projects, portfolio, personal projects\r\n- **certifications**: Certifications, licenses, credentials\r\n- **awards**: Awards, honors, achievements, recognition\r\n- **languages**: Languages, language proficiency\r\n- **volunteer**: Volunteer experience, community involvement\r\n- **publications**: Publications, articles, papers\r\n- **references**: References (often \"Available upon request\")\r\n- **profiles**: Social media links, online profiles (LinkedIn, GitHub, etc.)\r\n- **interests**: Interests, hobbies (only if explicitly listed)\r\n\r\n### Output Requirements\r\n1. Output ONLY valid JSON - no markdown code blocks, no explanations, no comments\r\n2. The JSON must strictly conform to the provided schema\r\n3. All required fields must be present, even if empty\r\n4. Use empty strings (\"\") for missing text fields\r\n5. Use empty arrays ([]) for missing array fields\r\n\r\n### What NOT To Do\r\n- ❌ Do not add job responsibilities that aren't listed\r\n- ❌ Do not expand acronyms unless the expansion is provided\r\n- ❌ Do not add technologies to skills that are only mentioned in job descriptions\r\n- ❌ Do not create profile URLs from usernames (e.g., don't create \"github.com/username\" unless the full URL is provided)\r\n- ❌ Do not assume current employment - only mark as \"Present\" if the resume explicitly says so\r\n- ❌ Do not add metrics or achievements not explicitly stated\r\n- ❌ Do not standardize or reformat dates beyond basic consistency\r\n- ❌ Do not translate content to another language - preserve the original language\r\n\r\n## OUTPUT\r\n\r\nRespond with ONLY the JSON object. No preamble, no explanation, no markdown formatting.";
var pdf_parser_user_default = "Here is the PDF resume document to parse. Parse it carefully following all rules above, extracting only information that is explicitly visible in the PDF. Ignore any artifacts caused by PDF formatting, scanned image noise, OCR errors, watermarks, or hidden content. Do not infer or assume any information beyond what is clearly present in the visible text of the PDF.";
/**
* A Zod schema that models JSON Patch (RFC 6902) operations as a discriminated union on `op`.
* This ensures required fields (`value` for add/replace/test, `from` for move/copy) are
* validated at the request boundary rather than failing later at the `fast-json-patch` layer.
*/
var jsonPatchOperationSchema = zod_default.discriminatedUnion("op", [
	zod_default.object({
		op: zod_default.literal("add"),
		path: zod_default.string(),
		value: zod_default.any()
	}),
	zod_default.object({
		op: zod_default.literal("remove"),
		path: zod_default.string()
	}),
	zod_default.object({
		op: zod_default.literal("replace"),
		path: zod_default.string(),
		value: zod_default.any()
	}),
	zod_default.object({
		op: zod_default.literal("move"),
		path: zod_default.string(),
		from: zod_default.string()
	}),
	zod_default.object({
		op: zod_default.literal("copy"),
		path: zod_default.string(),
		from: zod_default.string()
	}),
	zod_default.object({
		op: zod_default.literal("test"),
		path: zod_default.string(),
		value: zod_default.any()
	})
]);
/**
* A structured error thrown when a JSON Patch operation fails.
* Contains only the relevant details -- never the full document tree.
*/
var ResumePatchError = class extends Error {
	/** The error code from `fast-json-patch`, e.g. `TEST_OPERATION_FAILED`. */
	code;
	/** The zero-based index of the failing operation in the operations array. */
	index;
	/** The operation object that caused the failure. */
	operation;
	constructor(code, message, index, operation) {
		super(message);
		this.name = "ResumePatchError";
		this.code = code;
		this.index = index;
		this.operation = operation;
	}
};
/**
* Human-readable messages for each `fast-json-patch` error code.
* These are returned to the API consumer instead of the raw library output.
*/
var patchErrorMessages = {
	SEQUENCE_NOT_AN_ARRAY: "Patch sequence must be an array.",
	OPERATION_NOT_AN_OBJECT: "Operation is not an object.",
	OPERATION_OP_INVALID: "Operation `op` property is not one of the operations defined in RFC 6902.",
	OPERATION_PATH_INVALID: "Operation `path` property is not a valid JSON Pointer string.",
	OPERATION_FROM_REQUIRED: "Operation `from` property is required for `move` and `copy` operations.",
	OPERATION_VALUE_REQUIRED: "Operation `value` property is required for `add`, `replace`, and `test` operations.",
	OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED: "Operation `value` contains an `undefined` value, which is not valid in JSON.",
	OPERATION_PATH_CANNOT_ADD: "Cannot perform an `add` operation at the desired path.",
	OPERATION_PATH_UNRESOLVABLE: "Cannot perform the operation at a path that does not exist.",
	OPERATION_FROM_UNRESOLVABLE: "Cannot perform the operation from a path that does not exist.",
	OPERATION_PATH_ILLEGAL_ARRAY_INDEX: "Array index in path must be an unsigned base-10 integer.",
	OPERATION_VALUE_OUT_OF_BOUNDS: "The specified array index is greater than the number of elements in the array.",
	TEST_OPERATION_FAILED: "Test operation failed -- the value at the given path did not match the expected value."
};
/**
* Checks whether an error is a `JsonPatchError` from `fast-json-patch`.
* The library doesn't export the class directly, so we duck-type it.
*/
function isJsonPatchError(error) {
	return error instanceof Error && "index" in error && "operation" in error;
}
/**
* Converts a `JsonPatchError` into a clean `ResumePatchError` that omits the document tree.
*/
function toResumePatchError(error) {
	const code = error.name;
	const message = patchErrorMessages[code] ?? error.message;
	const index = error.index ?? 0;
	const operation = error.operation;
	return new ResumePatchError(code, message, index, operation);
}
/**
* Applies an array of JSON Patch (RFC 6902) operations to a `ResumeData` object.
*
* This function validates the operations before applying them, then validates the
* resulting document against the `resumeDataSchema` to ensure the patched data is
* still a valid resume.
*
* The original `data` object is not mutated; a deep clone is created internally.
*
* @see https://docs.rxresu.me/guides/using-the-patch-api — for usage examples and API details.
* @see https://datatracker.ietf.org/doc/html/rfc6902 — JSON Patch specification.
*
* @param data - The current resume data to patch.
* @param operations - An array of JSON Patch operations to apply.
* @returns The patched and validated `ResumeData` object.
* @throws {ResumePatchError} If the operations are structurally invalid or target non-existent paths.
* @throws {ResumePatchError} If a `test` operation does not match.
* @throws {Error} If the patched document does not conform to the `ResumeData` schema.
*/
function applyResumePatches(data, operations) {
	const validationError = fast_json_patch_default.validate(operations, data);
	if (validationError) throw toResumePatchError(validationError);
	let patched;
	try {
		patched = fast_json_patch_default.applyPatch(data, operations, false, false).newDocument;
	} catch (error) {
		if (isJsonPatchError(error)) throw toResumePatchError(error);
		throw error;
	}
	const parsed = resumeDataSchema.safeParse(patched);
	if (!parsed.success) throw new Error(`Patch produced invalid resume data: ${parsed.error.message}`);
	return parsed.data;
}
var patchResumeInputSchema = zod_default.object({ operations: zod_default.array(jsonPatchOperationSchema).min(1).describe("Array of JSON Patch (RFC 6902) operations to apply to the resume") });
var patchResumeDescription = `Apply JSON Patch (RFC 6902) operations to modify the user's resume data.
Use this tool whenever the user asks to change, add, or remove content from their resume.
Always generate the minimal set of operations needed. Prefer "replace" for updates, "add" for new content, "remove" for deletions.
Use the special "-" index to append to arrays (e.g. "/sections/experience/items/-").`;
function executePatchResume(resumeData, operations) {
	applyResumePatches(resumeData, operations);
	return {
		success: true,
		appliedOperations: operations
	};
}
var aiProviderSchema = zod_default.enum([
	"ollama",
	"openai",
	"gemini",
	"anthropic",
	"vercel-ai-gateway",
	"local",
	"openrouter"
]);
function getModel(input) {
	const { provider, model, apiKey } = input;
	const baseURL = input.baseURL || void 0;
	if (provider === "local") throw new Error("Local provider does not use an LLM model.");
	return M(provider).with("openai", () => createOpenAI({
		apiKey,
		baseURL
	}).languageModel(model)).with("ollama", () => createOllama({
		apiKey,
		baseURL
	}).languageModel(model)).with("anthropic", () => createAnthropic({
		apiKey,
		baseURL
	}).languageModel(model)).with("vercel-ai-gateway", () => createGatewayProvider({
		apiKey,
		baseURL
	}).languageModel(model)).with("gemini", () => createGoogleGenerativeAI({
		apiKey,
		baseURL
	}).languageModel(model)).with("openrouter", () => createOpenAI({
		apiKey,
		baseURL: baseURL || "https://openrouter.ai/api/v1",
		headers: {
			"HTTP-Referer": "https://rxresu.me",
			"X-Title": "UdaanResume"
		}
	}).languageModel(model)).exhaustive();
}
var aiCredentialsSchema = zod_default.object({
	provider: aiProviderSchema,
	model: zod_default.string(),
	apiKey: zod_default.string(),
	baseURL: zod_default.string()
});
var fileInputSchema = zod_default.object({
	name: zod_default.string(),
	data: zod_default.string()
});
async function testConnection(input) {
	if (input.provider === "local") return true;
	try {
		return ((await generateText({
			model: getModel(input),
			messages: [{
				role: "user",
				content: "Respond with 'Pong'"
			}],
			maxOutputTokens: 10
		})).text || "").toLowerCase().includes("pong");
	} catch (error) {
		console.error("Test connection failed:", error);
		throw error;
	}
}
async function parsePdf(input) {
	console.log("parsePdf called with provider:", input.provider);
	if (input.provider === "local") {
		const data = structuredClone(defaultResumeData);
		data.basics.name = input.file.name.replace(/\.pdf$/i, "");
		data.summary.content = "<p>Imported from " + input.file.name + ". Content parsing is unavailable without AI integration. Please fill in the details manually.</p>";
		return data;
	}
	const result = await generateText({
		model: getModel(input),
		output: output_exports.object({ schema: resumeDataSchema }),
		maxOutputTokens: 450,
		messages: [{
			role: "system",
			content: pdf_parser_system_default
		}, {
			role: "user",
			content: [{
				type: "text",
				text: pdf_parser_user_default
			}, {
				type: "file",
				filename: input.file.name,
				mediaType: "application/pdf",
				data: input.file.data
			}]
		}]
	});
	return resumeDataSchema.parse({
		...result.output,
		customSections: [],
		picture: defaultResumeData.picture,
		metadata: defaultResumeData.metadata
	});
}
async function parseDocx(input) {
	console.log("parseDocx called with provider:", input.provider);
	if (input.provider === "local") {
		const data = structuredClone(defaultResumeData);
		data.basics.name = input.file.name.replace(/\.docx?$/i, "");
		data.summary.content = "<p>Imported from " + input.file.name + ". Content parsing is unavailable without AI integration. Please fill in the details manually.</p>";
		return data;
	}
	const result = await generateText({
		model: getModel(input),
		output: output_exports.object({ schema: resumeDataSchema }),
		maxOutputTokens: 450,
		messages: [{
			role: "system",
			content: docx_parser_system_default
		}, {
			role: "user",
			content: [{
				type: "text",
				text: docx_parser_user_default
			}, {
				type: "file",
				filename: input.file.name,
				mediaType: input.mediaType,
				data: input.file.data
			}]
		}]
	});
	return resumeDataSchema.parse({
		...result.output,
		customSections: [],
		picture: defaultResumeData.picture,
		metadata: defaultResumeData.metadata
	});
}
function formatZodError(error) {
	return JSON.stringify(flattenError(error));
}
function buildChatSystemPrompt(resumeData) {
	return chat_system_default.replace("{{RESUME_DATA}}", JSON.stringify(resumeData, null, 2));
}
async function chat(input) {
	return streamToAsyncIteratorClass(streamText({
		model: getModel(input),
		system: buildChatSystemPrompt(input.resumeData),
		messages: await convertToModelMessages(input.messages),
		maxOutputTokens: 450,
		tools: { patch_resume: tool({
			description: patchResumeDescription,
			inputSchema: patchResumeInputSchema,
			execute: async ({ operations }) => executePatchResume(input.resumeData, operations)
		}) },
		stopWhen: stepCountIs(3)
	}).toUIMessageStream());
}
var aiService = {
	testConnection,
	parsePdf,
	parseDocx,
	chat
};
var aiRouter = {
	testConnection: protectedProcedure.route({
		method: "POST",
		path: "/ai/test-connection",
		tags: ["AI"],
		operationId: "testAiConnection",
		summary: "Test AI provider connection",
		description: "Validates the connection to an AI provider by sending a simple test prompt. Requires the provider type, model name, API key, and an optional base URL. Supported providers: OpenAI, Anthropic, Google Gemini, Ollama, and Vercel AI Gateway. Requires authentication.",
		successDescription: "The AI provider connection was successful."
	}).input(zod_default.object({
		provider: aiProviderSchema,
		model: zod_default.string(),
		apiKey: zod_default.string(),
		baseURL: zod_default.string()
	})).errors({ BAD_GATEWAY: {
		message: "The AI provider returned an error or is unreachable.",
		status: 502
	} }).handler(async ({ input }) => {
		try {
			return await aiService.testConnection(input);
		} catch (error) {
			if (error instanceof AISDKError || error instanceof OllamaError) throw new ORPCError("BAD_GATEWAY", { message: error.message });
			throw error;
		}
	}),
	parsePdf: protectedProcedure.route({
		method: "POST",
		path: "/ai/parse-pdf",
		tags: ["AI"],
		operationId: "parseResumePdf",
		summary: "Parse a PDF file into resume data",
		description: "Extracts structured resume data from a PDF file using the specified AI provider. The file should be sent as a base64-encoded string along with AI provider credentials. Returns a complete ResumeData object. Requires authentication.",
		successDescription: "The PDF was successfully parsed into structured resume data."
	}).input(zod_default.object({
		...aiCredentialsSchema.shape,
		file: fileInputSchema
	})).errors({ BAD_GATEWAY: {
		message: "The AI provider returned an error or is unreachable.",
		status: 502
	} }).handler(async ({ input }) => {
		try {
			return await aiService.parsePdf(input);
		} catch (error) {
			if (error instanceof AISDKError) throw new ORPCError("BAD_GATEWAY", { message: error.message });
			if (error instanceof ZodError) throw new Error(formatZodError(error));
			throw error;
		}
	}),
	parseDocx: protectedProcedure.route({
		method: "POST",
		path: "/ai/parse-docx",
		tags: ["AI"],
		operationId: "parseResumeDocx",
		summary: "Parse a DOCX file into resume data",
		description: "Extracts structured resume data from a DOCX or DOC file using the specified AI provider. The file should be sent as a base64-encoded string along with AI provider credentials and the document's media type. Returns a complete ResumeData object. Requires authentication.",
		successDescription: "The DOCX was successfully parsed into structured resume data."
	}).input(zod_default.object({
		...aiCredentialsSchema.shape,
		file: fileInputSchema,
		mediaType: zod_default.enum(["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])
	})).errors({ BAD_GATEWAY: {
		message: "The AI provider returned an error or is unreachable.",
		status: 502
	} }).handler(async ({ input }) => {
		try {
			return await aiService.parseDocx(input);
		} catch (error) {
			if (error instanceof AISDKError) throw new ORPCError("BAD_GATEWAY", { message: error.message });
			if (error instanceof ZodError) throw new Error(formatZodError(error));
			throw error;
		}
	}),
	chat: protectedProcedure.route({
		method: "POST",
		path: "/ai/chat",
		tags: ["AI"],
		operationId: "aiChat",
		summary: "Chat with AI to modify resume",
		description: "Streams a chat response from the configured AI provider. The LLM can call the patch_resume tool to generate JSON Patch operations that modify the resume. Requires authentication and AI provider credentials."
	}).input(type()).handler(async ({ input }) => {
		try {
			return await aiService.chat(input);
		} catch (error) {
			if (error instanceof AISDKError || error instanceof OllamaError) throw new ORPCError("BAD_GATEWAY", { message: error.message });
			throw error;
		}
	})
};
var CONTENT_TYPE_MAP = {
	".webp": "image/webp",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".pdf": "application/pdf"
};
var DEFAULT_CONTENT_TYPE = "application/octet-stream";
var IMAGE_MIME_TYPES = [
	"image/gif",
	"image/png",
	"image/jpeg",
	"image/webp"
];
function buildPictureKey(userId) {
	return `uploads/${userId}/pictures/${Date.now()}.webp`;
}
function buildScreenshotKey(userId, resumeId) {
	return `uploads/${userId}/screenshots/${resumeId}/${Date.now()}.webp`;
}
function buildPdfKey(userId, resumeId) {
	return `uploads/${userId}/pdfs/${resumeId}/${Date.now()}.pdf`;
}
function buildPublicUrl(path) {
	return new URL(path, env.APP_URL).toString();
}
function inferContentType(filename) {
	return CONTENT_TYPE_MAP[extname(filename).toLowerCase()] ?? DEFAULT_CONTENT_TYPE;
}
function isImageFile(mimeType) {
	return IMAGE_MIME_TYPES.includes(mimeType);
}
async function processImageForUpload(file) {
	const fileBuffer = await file.arrayBuffer();
	console.log("FLAG_DISABLE_IMAGE_PROCESSING", env.FLAG_DISABLE_IMAGE_PROCESSING);
	if (env.FLAG_DISABLE_IMAGE_PROCESSING) return {
		data: new Uint8Array(fileBuffer),
		contentType: file.type
	};
	const sharp = (await import("sharp")).default;
	const processedBuffer = await sharp(fileBuffer).resize(800, 800, {
		fit: "inside",
		withoutEnlargement: true
	}).webp({ preset: "picture" }).toBuffer();
	return {
		data: new Uint8Array(processedBuffer),
		contentType: "image/webp"
	};
}
var LocalStorageService = class {
	rootDirectory;
	constructor() {
		this.rootDirectory = join(process.cwd(), "data");
	}
	async list(prefix) {
		const fullPath = this.resolvePath(prefix);
		try {
			return (await fs.readdir(fullPath, { recursive: true })).map((file) => join(prefix, file));
		} catch (error) {
			if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return [];
			throw error;
		}
	}
	async write({ key, data }) {
		const fullPath = this.resolvePath(key);
		await fs.mkdir(dirname(fullPath), { recursive: true });
		await fs.writeFile(fullPath, data);
	}
	async read(key) {
		const fullPath = this.resolvePath(key);
		const [arrayBuffer, stats] = await Promise.all([fs.readFile(fullPath), fs.stat(fullPath)]);
		return {
			data: arrayBuffer,
			size: stats.size,
			etag: `"${stats.size}-${stats.mtime.getTime()}"`,
			lastModified: stats.mtime,
			contentType: inferContentType(key)
		};
	}
	async delete(key) {
		const fullPath = this.resolvePath(key);
		try {
			if ((await fs.stat(fullPath)).isDirectory()) {
				await fs.rm(fullPath, { recursive: true });
				return true;
			} else {
				await fs.unlink(fullPath);
				return true;
			}
		} catch {
			return false;
		}
	}
	async healthcheck() {
		try {
			await fs.mkdir(this.rootDirectory, { recursive: true });
			await fs.access(this.rootDirectory, fs.constants.R_OK | fs.constants.W_OK);
			return {
				type: "local",
				status: "healthy",
				message: "Local filesystem storage is accessible and has read/write permission."
			};
		} catch (error) {
			return {
				type: "local",
				status: "unhealthy",
				message: "Local filesystem storage is not accessible or lacks sufficient permissions.",
				error: error instanceof Error ? error.message : "Unknown error"
			};
		}
	}
	resolvePath(key) {
		const segments = key.replace(/^\/*/, "").split(/[/\\]+/).filter((segment) => segment.length > 0 && segment !== "." && segment !== "..");
		if (segments.length === 0) throw new Error("Invalid storage key");
		return join(this.rootDirectory, ...segments);
	}
};
var S3StorageService = class {
	bucket;
	client;
	constructor() {
		if (!env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY || !env.S3_BUCKET) throw new Error("S3 credentials are not set");
		this.bucket = env.S3_BUCKET;
		this.client = new S3Client({
			region: env.S3_REGION,
			endpoint: env.S3_ENDPOINT,
			forcePathStyle: env.S3_FORCE_PATH_STYLE,
			credentials: {
				accessKeyId: env.S3_ACCESS_KEY_ID,
				secretAccessKey: env.S3_SECRET_ACCESS_KEY
			}
		});
	}
	async list(prefix) {
		const command = new ListObjectsV2Command({
			Bucket: this.bucket,
			Prefix: prefix
		});
		const response = await this.client.send(command);
		if (!response.Contents) return [];
		return response.Contents.map((object) => object.Key ?? "");
	}
	async write({ key, data, contentType }) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: key,
			Body: data,
			ACL: "public-read",
			ContentType: contentType
		});
		await this.client.send(command);
	}
	async read(key) {
		try {
			const command = new GetObjectCommand({
				Bucket: this.bucket,
				Key: key
			});
			const response = await this.client.send(command);
			if (!response.Body) return null;
			return {
				data: await response.Body.transformToByteArray(),
				size: response.ContentLength ?? 0,
				etag: response.ETag,
				lastModified: response.LastModified,
				contentType: response.ContentType ?? inferContentType(key)
			};
		} catch {
			return null;
		}
	}
	async delete(keyOrPrefix) {
		const keys = await this.list(keyOrPrefix);
		if (keys.length === 0) return false;
		const deleteCommands = keys.map((k) => new DeleteObjectCommand({
			Bucket: this.bucket,
			Key: k
		}));
		return (await Promise.allSettled(deleteCommands.map((c) => this.client.send(c)))).some((r) => r.status === "fulfilled");
	}
	async healthcheck() {
		try {
			const putCommand = new PutObjectCommand({
				Bucket: this.bucket,
				Key: "healthcheck",
				Body: "OK"
			});
			await this.client.send(putCommand);
			const deleteCommand = new DeleteObjectCommand({
				Bucket: this.bucket,
				Key: "healthcheck"
			});
			await this.client.send(deleteCommand);
			return {
				type: "s3",
				status: "healthy",
				message: "S3 storage is accessible and credentials are valid."
			};
		} catch (error) {
			return {
				type: "s3",
				status: "unhealthy",
				message: "Failed to connect to S3 storage or invalid credentials.",
				error: error instanceof Error ? error.message : "Unknown error"
			};
		}
	}
};
function createStorageService() {
	if (env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY && env.S3_BUCKET) return new S3StorageService();
	return new LocalStorageService();
}
var cachedService = null;
function getStorageService() {
	if (cachedService) return cachedService;
	cachedService = createStorageService();
	return cachedService;
}
async function uploadFile(input) {
	const storageService = getStorageService();
	let key;
	switch (input.type) {
		case "picture":
			key = buildPictureKey(input.userId);
			break;
		case "screenshot":
			if (!input.resumeId) throw new Error("resumeId is required for screenshot uploads");
			key = buildScreenshotKey(input.userId, input.resumeId);
			break;
		case "pdf":
			if (!input.resumeId) throw new Error("resumeId is required for pdf uploads");
			key = buildPdfKey(input.userId, input.resumeId);
			break;
	}
	await storageService.write({
		key,
		data: input.data,
		contentType: input.contentType
	});
	return {
		key,
		url: buildPublicUrl(key)
	};
}
var authService = {
	providers: { list: () => {
		const providers = { credential: "Password" };
		if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) providers.google = "Google";
		if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) providers.github = "GitHub";
		if (env.OAUTH_CLIENT_ID && env.OAUTH_CLIENT_SECRET) providers.custom = env.OAUTH_PROVIDER_NAME ?? "Custom OAuth";
		return providers;
	} },
	deleteAccount: async (input) => {
		if (!input.userId || input.userId.length === 0) return;
		const storageService = getStorageService();
		try {
			await storageService.delete(`uploads/${input.userId}`);
		} catch {}
		try {
			await db.delete(user).where(eq(user.id, input.userId));
		} catch (err) {
			console.error(`Failed to delete user record for userId=${input.userId}:`, err);
			throw new ORPCError("INTERNAL_SERVER_ERROR");
		}
	}
};
var authRouter = {
	providers: { list: publicProcedure.route({
		method: "GET",
		path: "/auth/providers",
		tags: ["Authentication"],
		operationId: "listAuthProviders",
		summary: "List authentication providers",
		description: "Returns a list of all authentication providers enabled on this UdaanResume instance, along with their display names. Possible providers include password-based credentials, Google, GitHub, and custom OAuth. No authentication required.",
		successDescription: "A map of enabled authentication provider identifiers to their display names."
	}).handler(() => {
		return authService.providers.list();
	}) },
	deleteAccount: protectedProcedure.route({
		method: "DELETE",
		path: "/auth/account",
		tags: ["Authentication"],
		operationId: "deleteAccount",
		summary: "Delete user account",
		description: "Permanently deletes the authenticated user's account, including all resumes, uploaded files (profile pictures, screenshots, PDFs), and associated data. This action is irreversible. Requires authentication.",
		successDescription: "The user account and all associated data have been successfully deleted."
	}).handler(async ({ context }) => {
		return await authService.deleteAccount({ userId: context.user.id });
	})
};
var flagsService = { getFlags: () => ({
	disableSignups: env.FLAG_DISABLE_SIGNUPS,
	disableEmailAuth: env.FLAG_DISABLE_EMAIL_AUTH
}) };
var flagsRouter = { get: publicProcedure.route({
	method: "GET",
	path: "/flags",
	tags: ["Feature Flags"],
	operationId: "getFeatureFlags",
	summary: "Get feature flags",
	description: "Returns the current feature flags for this UdaanResume instance. Feature flags control instance-wide settings such as whether new user signups or email-based authentication are disabled. No authentication required.",
	successDescription: "The current feature flags for this instance."
}).output(zod_default.object({
	disableSignups: zod_default.boolean().describe("Whether new user signups are disabled on this instance."),
	disableEmailAuth: zod_default.boolean().describe("Whether email-based authentication is disabled on this instance.")
})).handler(() => flagsService.getFlags()) };
var pageDimensionsAsPixels = {
	a4: {
		width: 794,
		height: 1123
	},
	letter: {
		width: 816,
		height: 1056
	},
	"free-form": {
		width: 794,
		height: 1123
	}
};
var pageDimensionsAsMillimeters = {
	a4: {
		width: "210mm",
		height: "297mm"
	},
	letter: {
		width: "216mm",
		height: "279mm"
	},
	"free-form": {
		width: "210mm",
		height: "297mm"
	}
};
var PRINTER_TOKEN_TTL_MS = 300 * 1e3;
/**
* Generates a time-limited token for printer route access.
* Token format: base64(resumeId:timestamp).signature
*/
var generatePrinterToken = (resumeId) => {
	const payload = `${resumeId}:${Date.now()}`;
	const payloadBase64 = Buffer.from(payload).toString("base64url");
	return `${payloadBase64}.${createHash("sha256").update(`${payloadBase64}.${env.AUTH_SECRET}`).digest("hex")}`;
};
/**
* Verifies a printer token and returns the resume ID if valid.
* Throws an error if the token is invalid or expired.
*/
var verifyPrinterToken = (token) => {
	const parts = token.split(".");
	if (parts.length !== 2) throw new Error("Invalid token format");
	const [payloadBase64, signature] = parts;
	const expectedSignature = createHash("sha256").update(`${payloadBase64}.${env.AUTH_SECRET}`).digest("hex");
	const signatureBuffer = Buffer.from(signature);
	const expectedBuffer = Buffer.from(expectedSignature);
	if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) throw new Error("Invalid token signature");
	const [resumeId, timestampStr] = Buffer.from(payloadBase64, "base64url").toString("utf-8").split(":");
	if (!resumeId || !timestampStr) throw new Error("Invalid token payload");
	const timestamp = Number.parseInt(timestampStr, 10);
	if (Number.isNaN(timestamp)) throw new Error("Invalid timestamp");
	const age = Date.now() - timestamp;
	if (age < 0 || age > PRINTER_TOKEN_TTL_MS) throw new Error("Token expired");
	return resumeId;
};
var SCREENSHOT_TTL = 1e3 * 60 * 60 * 6;
var browserInstance = null;
async function getBrowser() {
	if (browserInstance?.connected) return browserInstance;
	if (env.PRINTER_ENDPOINT) {
		const args = ["--disable-dev-shm-usage", "--disable-features=LocalNetworkAccessChecks,site-per-process,FedCm"];
		const endpoint = new URL(env.PRINTER_ENDPOINT);
		const isWebSocket = endpoint.protocol.startsWith("ws");
		const connectOptions = { acceptInsecureCerts: true };
		endpoint.searchParams.append("launch", JSON.stringify({ args }));
		if (isWebSocket) connectOptions.browserWSEndpoint = endpoint.toString();
		else connectOptions.browserURL = endpoint.toString();
		browserInstance = await puppeteer.connect(connectOptions);
		return browserInstance;
	}
	browserInstance = await (await import("../_libs/_24.mjs")).default.launch({
		headless: true,
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage"
		]
	});
	return browserInstance;
}
async function closeBrowser() {
	if (browserInstance?.connected) {
		await browserInstance.close();
		browserInstance = null;
	}
}
process.on("SIGINT", async () => {
	await closeBrowser();
	process.exit(0);
});
process.on("SIGTERM", async () => {
	await closeBrowser();
	process.exit(0);
});
var printerService = {
	healthcheck: async () => {
		if (env.PRINTER_ENDPOINT) {
			const headers = new Headers({ Accept: "application/json" });
			const endpoint = new URL(env.PRINTER_ENDPOINT);
			endpoint.protocol = endpoint.protocol.replace("ws", "http");
			endpoint.pathname = "/json/version";
			return await (await fetch(endpoint, { headers })).json();
		}
		return {
			status: "local",
			message: "Using local Puppeteer instance"
		};
	},
	printResumeAsPDF: async (input) => {
		const { id, data, userId } = input;
		const storageService = getStorageService();
		const pdfPrefix = `uploads/${userId}/pdfs/${id}`;
		await storageService.delete(pdfPrefix);
		const baseUrl = env.PRINTER_APP_URL ?? env.APP_URL;
		const domain = new URL(baseUrl).hostname;
		const format = data.metadata.page.format;
		const locale = data.metadata.page.locale;
		const template = data.metadata.template;
		const url = `${baseUrl}/printer/${id}?token=${generatePrinterToken(id)}`;
		let marginX = 0;
		let marginY = 0;
		if (printMarginTemplates.includes(template)) {
			marginX = Math.round(data.metadata.page.marginX / .75);
			marginY = Math.round(data.metadata.page.marginY / .75);
		}
		let browser = null;
		try {
			browser = await getBrowser();
			await browser.setCookie({
				name: "locale",
				value: locale,
				domain
			});
			const page = await browser.newPage();
			await page.emulateMediaType("print");
			await page.setViewport(pageDimensionsAsPixels[format]);
			await page.goto(url, { waitUntil: "networkidle0" });
			await page.waitForFunction(() => document.body.getAttribute("data-wf-loaded") === "true", { timeout: 5e3 });
			const isFreeForm = format === "free-form";
			const contentHeight = await page.evaluate((marginY, isFreeForm, minPageHeight) => {
				const root = document.documentElement;
				const pageElements = document.querySelectorAll("[data-page-index]");
				const container = document.querySelector(".resume-preview-container");
				if (isFreeForm) {
					const marginYAsPixels = marginY * .75;
					const numberOfPages = pageElements.length;
					for (let i = 0; i < numberOfPages - 1; i++) {
						const pageEl = pageElements[i];
						pageEl.style.marginBottom = `${marginYAsPixels}px`;
					}
					let totalHeight = 0;
					for (const el of pageElements) {
						const pageEl = el;
						const style = getComputedStyle(pageEl);
						const marginBottom = Number.parseFloat(style.marginBottom) || 0;
						totalHeight += pageEl.offsetHeight + marginBottom;
					}
					return Math.max(totalHeight, minPageHeight);
				}
				const rootHeight = getComputedStyle(root).getPropertyValue("--page-height").trim();
				const currentHeight = (container ? getComputedStyle(container).getPropertyValue("--page-height").trim() : null) || rootHeight;
				const heightValue = Math.min(Number.parseFloat(currentHeight), minPageHeight);
				if (!Number.isNaN(heightValue)) {
					const newHeight = `${heightValue - marginY}px`;
					if (container) container.style.setProperty("--page-height", newHeight);
					root.style.setProperty("--page-height", newHeight);
				}
				for (const el of pageElements) {
					const element = el;
					if (Number.parseInt(element.getAttribute("data-page-index") ?? "0", 10) > 0) element.style.breakBefore = "page";
					element.style.breakInside = "auto";
				}
				return null;
			}, marginY, isFreeForm, pageDimensionsAsPixels[format].height);
			const pdfHeight = isFreeForm && contentHeight ? contentHeight : pageDimensionsAsPixels[format].height;
			const pdfBuffer = await page.pdf({
				width: `${pageDimensionsAsPixels[format].width}px`,
				height: `${pdfHeight}px`,
				tagged: true,
				waitForFonts: true,
				printBackground: true,
				margin: {
					bottom: 0,
					top: marginY,
					right: marginX,
					left: marginX
				}
			});
			await page.close();
			return (await uploadFile({
				userId,
				resumeId: id,
				data: new Uint8Array(pdfBuffer),
				contentType: "application/pdf",
				type: "pdf"
			})).url;
		} catch (error) {
			throw new ORPCError("INTERNAL_SERVER_ERROR", error);
		}
	},
	getResumeScreenshot: async (input) => {
		const { id, userId, data, updatedAt } = input;
		const storageService = getStorageService();
		const screenshotPrefix = `uploads/${userId}/screenshots/${id}`;
		const existingScreenshots = await storageService.list(screenshotPrefix);
		const now = Date.now();
		const resumeUpdatedAt = updatedAt.getTime();
		if (existingScreenshots.length > 0) {
			const sortedFiles = existingScreenshots.map((path) => {
				const match = path.split("/").pop()?.match(/^(\d+)\.webp$/);
				return match ? {
					path,
					timestamp: Number(match[1])
				} : null;
			}).filter((item) => item !== null).sort((a, b) => b.timestamp - a.timestamp);
			if (sortedFiles.length > 0) {
				const latest = sortedFiles[0];
				if (now - latest.timestamp < SCREENSHOT_TTL) return new URL(latest.path, env.APP_URL).toString();
				if (resumeUpdatedAt <= latest.timestamp) return new URL(latest.path, env.APP_URL).toString();
				await Promise.all(sortedFiles.map((file) => storageService.delete(file.path)));
			}
		}
		const baseUrl = env.PRINTER_APP_URL ?? env.APP_URL;
		const domain = new URL(baseUrl).hostname;
		const locale = data.metadata.page.locale;
		const url = `${baseUrl}/printer/${id}?token=${generatePrinterToken(id)}`;
		let browser = null;
		try {
			browser = await getBrowser();
			await browser.setCookie({
				name: "locale",
				value: locale,
				domain
			});
			const page = await browser.newPage();
			await page.setViewport(pageDimensionsAsPixels.a4);
			await page.goto(url, { waitUntil: "networkidle0" });
			await page.waitForFunction(() => document.body.getAttribute("data-wf-loaded") === "true", { timeout: 5e3 });
			const screenshotBuffer = await page.screenshot({
				type: "webp",
				quality: 80
			});
			await page.close();
			return (await uploadFile({
				userId,
				resumeId: id,
				data: new Uint8Array(screenshotBuffer),
				contentType: "image/webp",
				type: "screenshot"
			})).url;
		} catch (error) {
			throw new ORPCError("INTERNAL_SERVER_ERROR", error);
		}
	}
};
var RESUME_ACCESS_COOKIE_PREFIX = "resume_access";
var RESUME_ACCESS_TTL_SECONDS = 600;
var getResumeAccessCookieName = (resumeId) => `${RESUME_ACCESS_COOKIE_PREFIX}_${resumeId}`;
var signResumeAccessToken = (resumeId, passwordHash) => createHash("sha256").update(`${resumeId}:${passwordHash}`).digest("hex");
var safeEquals = (value, expected) => {
	const valueBuffer = Buffer.from(value);
	const expectedBuffer = Buffer.from(expected);
	if (valueBuffer.length !== expectedBuffer.length) return false;
	return timingSafeEqual(valueBuffer, expectedBuffer);
};
var hasResumeAccess = (resumeId, passwordHash) => {
	if (!passwordHash) return false;
	const cookieValue = getCookie(getResumeAccessCookieName(resumeId));
	if (!cookieValue) return false;
	return safeEquals(cookieValue, signResumeAccessToken(resumeId, passwordHash));
};
var grantResumeAccess = (resumeId, passwordHash) => setCookie(getResumeAccessCookieName(resumeId), signResumeAccessToken(resumeId, passwordHash), {
	path: "/",
	httpOnly: true,
	sameSite: "lax",
	maxAge: RESUME_ACCESS_TTL_SECONDS,
	secure: env.APP_URL.startsWith("https")
});
var resumeService = {
	tags: { list: async (input) => {
		const result = await db.select({ tags: resume.tags }).from(resume).where(eq(resume.userId, input.userId));
		const uniqueTags = new Set(result.flatMap((tag) => tag.tags));
		return Array.from(uniqueTags).sort((a, b) => a.localeCompare(b));
	} },
	statistics: {
		getById: async (input) => {
			const [statistics] = await db.select({
				isPublic: resume.isPublic,
				views: resumeStatistics.views,
				downloads: resumeStatistics.downloads,
				lastViewedAt: resumeStatistics.lastViewedAt,
				lastDownloadedAt: resumeStatistics.lastDownloadedAt
			}).from(resumeStatistics).rightJoin(resume, eq(resumeStatistics.resumeId, resume.id)).where(and(eq(resume.id, input.id), eq(resume.userId, input.userId)));
			return {
				isPublic: statistics.isPublic,
				views: statistics.views ?? 0,
				downloads: statistics.downloads ?? 0,
				lastViewedAt: statistics.lastViewedAt,
				lastDownloadedAt: statistics.lastDownloadedAt
			};
		},
		increment: async (input) => {
			const views = input.views ? 1 : 0;
			const downloads = input.downloads ? 1 : 0;
			const lastViewedAt = input.views ? sql`now()` : void 0;
			const lastDownloadedAt = input.downloads ? sql`now()` : void 0;
			await db.insert(resumeStatistics).values({
				resumeId: input.id,
				views,
				downloads,
				lastViewedAt,
				lastDownloadedAt
			}).onConflictDoUpdate({
				target: [resumeStatistics.resumeId],
				set: {
					views: sql`${resumeStatistics.views} + ${views}`,
					downloads: sql`${resumeStatistics.downloads} + ${downloads}`,
					lastViewedAt,
					lastDownloadedAt
				}
			});
		}
	},
	list: async (input) => {
		return await db.select({
			id: resume.id,
			name: resume.name,
			slug: resume.slug,
			tags: resume.tags,
			isPublic: resume.isPublic,
			isLocked: resume.isLocked,
			createdAt: resume.createdAt,
			updatedAt: resume.updatedAt
		}).from(resume).where(and(eq(resume.userId, input.userId), M(input.tags.length).with(0, () => void 0).otherwise(() => arrayContains(resume.tags, input.tags)))).orderBy(M(input.sort).with("lastUpdatedAt", () => desc(resume.updatedAt)).with("createdAt", () => asc(resume.createdAt)).with("name", () => asc(resume.name)).exhaustive());
	},
	getById: async (input) => {
		const [resume$2] = await db.select({
			id: resume.id,
			name: resume.name,
			slug: resume.slug,
			tags: resume.tags,
			data: resume.data,
			isPublic: resume.isPublic,
			isLocked: resume.isLocked,
			hasPassword: sql`${resume.password} IS NOT NULL`
		}).from(resume).where(and(eq(resume.id, input.id), eq(resume.userId, input.userId)));
		if (!resume$2) throw new ORPCError("NOT_FOUND");
		return resume$2;
	},
	getByIdForPrinter: async (input) => {
		const [resume$4] = await db.select({
			id: resume.id,
			name: resume.name,
			slug: resume.slug,
			tags: resume.tags,
			data: resume.data,
			userId: resume.userId,
			isLocked: resume.isLocked,
			updatedAt: resume.updatedAt
		}).from(resume).where(eq(resume.id, input.id));
		if (!resume$4) throw new ORPCError("NOT_FOUND");
		try {
			if (!resume$4.data.picture.url) throw new Error("Picture is not available");
			const url = resume$4.data.picture.url.replace(env.APP_URL, "http://localhost:3000");
			const base64 = await fetch(url).then((res) => res.arrayBuffer()).then((buffer) => Buffer.from(buffer).toString("base64"));
			resume$4.data.picture.url = `data:image/jpeg;base64,${base64}`;
		} catch {}
		return resume$4;
	},
	getBySlug: async (input) => {
		const [resume$5] = await db.select({
			id: resume.id,
			name: resume.name,
			slug: resume.slug,
			tags: resume.tags,
			data: resume.data,
			isPublic: resume.isPublic,
			isLocked: resume.isLocked,
			passwordHash: resume.password,
			hasPassword: sql`${resume.password} IS NOT NULL`
		}).from(resume).innerJoin(user, eq(resume.userId, user.id)).where(and(eq(resume.slug, input.slug), eq(user.username, input.username), input.currentUserId ? eq(resume.userId, input.currentUserId) : eq(resume.isPublic, true)));
		if (!resume$5) throw new ORPCError("NOT_FOUND");
		if (!resume$5.hasPassword) {
			await resumeService.statistics.increment({
				id: resume$5.id,
				views: true
			});
			return {
				id: resume$5.id,
				name: resume$5.name,
				slug: resume$5.slug,
				tags: resume$5.tags,
				data: resume$5.data,
				isPublic: resume$5.isPublic,
				isLocked: resume$5.isLocked,
				hasPassword: false
			};
		}
		if (hasResumeAccess(resume$5.id, resume$5.passwordHash)) {
			await resumeService.statistics.increment({
				id: resume$5.id,
				views: true
			});
			return {
				id: resume$5.id,
				name: resume$5.name,
				slug: resume$5.slug,
				tags: resume$5.tags,
				data: resume$5.data,
				isPublic: resume$5.isPublic,
				isLocked: resume$5.isLocked,
				hasPassword: true
			};
		}
		throw new ORPCError("NEED_PASSWORD", {
			status: 401,
			data: {
				username: input.username,
				slug: input.slug
			}
		});
	},
	create: async (input) => {
		const id = generateId();
		input.data = input.data ?? defaultResumeData;
		input.data.metadata.page.locale = input.locale;
		try {
			await db.insert(resume).values({
				id,
				name: input.name,
				slug: input.slug,
				tags: input.tags,
				userId: input.userId,
				data: input.data
			});
			return id;
		} catch (error) {
			if (get(error, "cause.constraint") === "resume_slug_user_id_unique") throw new ORPCError("RESUME_SLUG_ALREADY_EXISTS", { status: 400 });
			throw error;
		}
	},
	update: async (input) => {
		const [resume$1] = await db.select({ isLocked: resume.isLocked }).from(resume).where(and(eq(resume.id, input.id), eq(resume.userId, input.userId)));
		if (resume$1?.isLocked) throw new ORPCError("RESUME_LOCKED");
		const updateData = {
			name: input.name,
			slug: input.slug,
			tags: input.tags,
			data: input.data,
			isPublic: input.isPublic
		};
		try {
			const [resume$7] = await db.update(resume).set(updateData).where(and(eq(resume.id, input.id), eq(resume.isLocked, false), eq(resume.userId, input.userId))).returning({
				id: resume.id,
				name: resume.name,
				slug: resume.slug,
				tags: resume.tags,
				data: resume.data,
				isPublic: resume.isPublic,
				isLocked: resume.isLocked,
				hasPassword: sql`${resume.password} IS NOT NULL`
			});
			return resume$7;
		} catch (error) {
			if (get(error, "cause.constraint") === "resume_slug_user_id_unique") throw new ORPCError("RESUME_SLUG_ALREADY_EXISTS", { status: 400 });
			throw error;
		}
	},
	patch: async (input) => {
		const [existing] = await db.select({
			data: resume.data,
			isLocked: resume.isLocked
		}).from(resume).where(and(eq(resume.id, input.id), eq(resume.userId, input.userId)));
		if (!existing) throw new ORPCError("NOT_FOUND");
		if (existing.isLocked) throw new ORPCError("RESUME_LOCKED");
		let patchedData;
		try {
			patchedData = applyResumePatches(existing.data, input.operations);
		} catch (error) {
			if (error instanceof ResumePatchError) throw new ORPCError("INVALID_PATCH_OPERATIONS", {
				status: 400,
				message: error.message,
				data: {
					code: error.code,
					index: error.index,
					operation: error.operation
				}
			});
			throw new ORPCError("INVALID_PATCH_OPERATIONS", {
				status: 400,
				message: error instanceof Error ? error.message : "Failed to apply patch operations"
			});
		}
		const [resume$3] = await db.update(resume).set({ data: patchedData }).where(and(eq(resume.id, input.id), eq(resume.isLocked, false), eq(resume.userId, input.userId))).returning({
			id: resume.id,
			name: resume.name,
			slug: resume.slug,
			tags: resume.tags,
			data: resume.data,
			isPublic: resume.isPublic,
			isLocked: resume.isLocked,
			hasPassword: sql`${resume.password} IS NOT NULL`
		});
		return resume$3;
	},
	setLocked: async (input) => {
		await db.update(resume).set({ isLocked: input.isLocked }).where(and(eq(resume.id, input.id), eq(resume.userId, input.userId)));
	},
	setPassword: async (input) => {
		const hashedPassword = await hashPassword(input.password);
		await db.update(resume).set({ password: hashedPassword }).where(and(eq(resume.id, input.id), eq(resume.userId, input.userId)));
	},
	verifyPassword: async (input) => {
		const [resume$6] = await db.select({
			id: resume.id,
			password: resume.password
		}).from(resume).innerJoin(user, eq(resume.userId, user.id)).where(and(isNotNull(resume.password), eq(resume.slug, input.slug), eq(user.username, input.username)));
		if (!resume$6) throw new ORPCError("NOT_FOUND");
		const passwordHash = resume$6.password;
		if (!await verifyPassword(input.password, passwordHash)) throw new ORPCError("INVALID_PASSWORD");
		grantResumeAccess(resume$6.id, passwordHash);
		return true;
	},
	removePassword: async (input) => {
		await db.update(resume).set({ password: null }).where(and(eq(resume.id, input.id), eq(resume.userId, input.userId)));
	},
	delete: async (input) => {
		const storageService = getStorageService();
		const deleteResumePromise = db.delete(resume).where(and(eq(resume.id, input.id), eq(resume.isLocked, false), eq(resume.userId, input.userId)));
		const deleteScreenshotsPromise = storageService.delete(`uploads/${input.userId}/screenshots/${input.id}`);
		const deletePdfsPromise = storageService.delete(`uploads/${input.userId}/pdfs/${input.id}`);
		await Promise.allSettled([
			deleteResumePromise,
			deleteScreenshotsPromise,
			deletePdfsPromise
		]);
	}
};
var printerRouter = {
	printResumeAsPDF: publicProcedure.route({
		method: "GET",
		path: "/resumes/{id}/pdf",
		tags: ["Resume Export"],
		operationId: "exportResumePdf",
		summary: "Export resume as PDF",
		description: "Generates a PDF from the specified resume and uploads it to storage. Returns a URL to download the generated PDF file. If the request is made by an unauthenticated user (e.g. via a public share link), the resume's download count is incremented. Authentication is optional.",
		successDescription: "The PDF was generated successfully. Returns a URL to download the file."
	}).input(zod_default.object({ id: zod_default.string().describe("The unique identifier of the resume to export.") })).output(zod_default.object({ url: zod_default.string().describe("The URL to download the generated PDF file.") })).handler(async ({ input, context }) => {
		const { id, data, userId } = await resumeService.getByIdForPrinter({ id: input.id });
		const url = await printerService.printResumeAsPDF({
			id,
			data,
			userId
		});
		if (!context.user) await resumeService.statistics.increment({
			id: input.id,
			downloads: true
		});
		return { url };
	}),
	getResumeScreenshot: protectedProcedure.route({
		method: "GET",
		path: "/resumes/{id}/screenshot",
		tags: ["Resume Export"],
		operationId: "getResumeScreenshot",
		summary: "Get resume screenshot",
		description: "Returns a URL to a screenshot image of the first page of the specified resume. Screenshots are cached for up to 6 hours and regenerated automatically when the resume is updated. Returns null if the screenshot cannot be generated. Requires authentication.",
		successDescription: "The screenshot URL, or null if the screenshot could not be generated."
	}).input(zod_default.object({ id: zod_default.string().describe("The unique identifier of the resume.") })).output(zod_default.object({ url: zod_default.string().nullable().describe("The URL to the screenshot image, or null.") })).handler(async ({ input }) => {
		try {
			const { id, data, userId, updatedAt } = await resumeService.getByIdForPrinter({ id: input.id });
			return { url: await printerService.getResumeScreenshot({
				id,
				data,
				userId,
				updatedAt
			}) };
		} catch {}
		return { url: null };
	})
};
var sampleResumeData = {
	picture: {
		hidden: false,
		url: "https://i.imgur.com/o4Jpt1p.jpeg",
		size: 100,
		rotation: 0,
		aspectRatio: 1,
		borderRadius: 0,
		borderColor: "rgba(0, 0, 0, 0.5)",
		borderWidth: 0,
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowWidth: 0
	},
	basics: {
		name: "David Kowalski",
		headline: "Game Developer | Unity & Unreal Engine Specialist",
		email: "david.kowalski@email.com",
		phone: "+1 (555) 291-4756",
		location: "Seattle, WA",
		website: {
			url: "https://davidkowalski.games",
			label: "davidkowalski.games"
		},
		customFields: [{
			id: "019bef5a-0477-77e0-968b-5d0e2ecb34e3",
			icon: "github-logo",
			text: "github.com/dkowalski-dev",
			link: "https://github.com/dkowalski-dev"
		}, {
			id: "019bef5a-93e4-7746-ad39-3a132360f823",
			icon: "game-controller",
			text: "itch.io/dkowalski",
			link: "https://itch.io/dkowalski"
		}]
	},
	summary: {
		title: "",
		columns: 1,
		hidden: false,
		content: "<p>Passionate game developer with 5+ years of professional experience creating engaging gameplay systems and polished player experiences across multiple platforms. Specialized in Unity and Unreal Engine with strong expertise in C#, C++, and game design principles. Proven ability to collaborate effectively with cross-functional teams including designers, artists, and QA to deliver high-quality games on time and within scope. Est anim est quis nostrud ipsum deserunt do anim Lorem mollit nostrud minim. Est anim est quis nostrud ipsum.</p>"
	},
	sections: {
		profiles: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-3d42ddc9b4d8",
				hidden: false,
				icon: "github-logo",
				network: "GitHub",
				username: "dkowalski-dev",
				website: {
					url: "https://github.com/dkowalski-dev",
					label: "github.com/dkowalski-dev"
				}
			}, {
				id: "019bef5a-93e4-7746-ad39-43c470b77f4a",
				hidden: false,
				icon: "linkedin-logo",
				network: "LinkedIn",
				username: "davidkowalski",
				website: {
					url: "https://linkedin.com/in/davidkowalski",
					label: "linkedin.com/in/davidkowalski"
				}
			}]
		},
		experience: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-44d8cec98ca4",
				hidden: false,
				company: "Cascade Studios",
				position: "Senior Game Developer",
				location: "Seattle, WA",
				period: "March 2022 - Present",
				website: {
					url: "",
					label: ""
				},
				description: "<ul><li><p>Lead gameplay programmer on an unannounced AAA action-adventure title built in Unreal Engine 5 for PC and next-gen consoles</p></li><li><p>Architected and implemented core combat system including hit detection, combo mechanics, and enemy AI behavior trees serving 15+ enemy types</p></li><li><p>Developed custom editor tools in C++ that reduced level designer iteration time by 40% and improved workflow efficiency across the team</p></li><li><p>Optimized rendering pipeline and gameplay systems to maintain 60 FPS performance target on all supported platforms, achieving 95% frame rate stability</p></li><li><p>Ad nostrud enim adipisicing ea proident aliqua veniam nisi amet ea irure et mollit.</p></li></ul><p></p>"
			}]
		},
		education: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-48455f6cef9e",
				hidden: false,
				school: "University of Washington",
				degree: "Bachelor of Science",
				area: "Computer Science",
				grade: "3.6 GPA",
				location: "Seattle, WA",
				period: "2014 - 2018",
				website: {
					url: "",
					label: ""
				},
				description: "<p>Concentration in Game Development. Relevant Coursework: Game Engine Architecture, Computer Graphics, Artificial Intelligence, Physics Simulation, 3D Mathematics, Software Engineering, Data Structures & Algorithms</p>"
			}]
		},
		projects: {
			title: "",
			columns: 1,
			hidden: false,
			items: [
				{
					id: "019bef5a-93e4-7746-ad39-4d2603fe2801",
					hidden: false,
					options: { showLinkInTitle: true },
					name: "Echoes of the Void (Indie Game)",
					period: "2023 - Present",
					website: {
						url: "https://itch.io/echoes-of-the-void",
						label: "View on itch.io"
					},
					description: "<p>Solo developer for a narrative-driven 2D platformer built in Unity. Features custom dialogue system, branching story paths, and atmospheric pixel art. Currently in development with demo released on itch.io garnering 5K+ downloads and positive community feedback. Planned Steam release Q2 2025.</p>"
				},
				{
					id: "019bef5a-93e4-7746-ad39-524195dd7eff",
					hidden: false,
					name: "Open Source: Unity Dialogue Framework",
					period: "2021 - 2023",
					website: {
						url: "https://github.com/dkowalski-dev/unity-dialogue",
						label: "View on GitHub"
					},
					description: "<p>Created and maintain an open-source dialogue system for Unity with visual node-based editor, localization support, and voice acting integration. Project has 800+ GitHub stars and is actively used by indie developers worldwide. Includes comprehensive documentation and example projects.</p>"
				},
				{
					id: "019bef5a-93e4-7746-ad39-549106273c73",
					hidden: false,
					name: "Game Jam Participation",
					period: "2019 - Present",
					website: {
						url: "",
						label: ""
					},
					description: "<p>Regular participant in Ludum Dare and Global Game Jam events. Created 12+ game prototypes exploring experimental mechanics and art styles. Won 'Best Gameplay' award at Ludum Dare 48 with puzzle game 'Deeper and Deeper' that ranked in top 5% overall.</p>"
				}
			]
		},
		skills: {
			title: "",
			columns: 1,
			hidden: false,
			items: [
				{
					id: "019bef5a-93e4-7746-ad39-5a52dcf50ed4",
					hidden: false,
					icon: "code",
					name: "Unity Engine",
					proficiency: "Expert",
					level: 5,
					keywords: [
						"C#",
						"Editor Tools",
						"Performance Profiling"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-5e8bb7cacbc8",
					hidden: false,
					icon: "brackets-curly",
					name: "Unreal Engine",
					proficiency: "Advanced",
					level: 4,
					keywords: [
						"C++",
						"Blueprints",
						"UE5 Features"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-622f9d41da55",
					hidden: false,
					icon: "cpu",
					name: "Programming Languages",
					proficiency: "Expert",
					level: 5,
					keywords: [
						"C#",
						"C++",
						"Python",
						"HLSL/GLSL"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-6574ab6814bd",
					hidden: false,
					icon: "brain",
					name: "Game AI",
					proficiency: "Advanced",
					level: 4,
					keywords: [
						"Behavior Trees",
						"FSM",
						"Pathfinding",
						"Navigation"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-6a8e22bec684",
					hidden: false,
					icon: "shooting-star",
					name: "Physics & Mathematics",
					proficiency: "Advanced",
					level: 4,
					keywords: [
						"3D Math",
						"Collision Detection",
						"Rigid Body Dynamics"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-6d8bf7be7514",
					hidden: true,
					icon: "chart-line-up",
					name: "Performance Optimization",
					proficiency: "Advanced",
					level: 4,
					keywords: [
						"Profiling",
						"Memory Management",
						"Frame Rate"
					]
				}
			]
		},
		languages: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-73807ccc48b5",
				hidden: false,
				language: "English",
				fluency: "Native",
				level: 5
			}, {
				id: "019bef5a-93e4-7746-ad39-768670459358",
				hidden: false,
				language: "Polish",
				fluency: "Conversational",
				level: 3
			}]
		},
		interests: {
			title: "",
			columns: 1,
			hidden: false,
			items: [
				{
					id: "019bef5a-93e4-7746-ad39-7821b4de95f7",
					hidden: false,
					icon: "game-controller",
					name: "Game Design",
					keywords: [
						"Mechanics",
						"Level Design",
						"Player Psychology"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-7c64c1a607d3",
					hidden: false,
					icon: "robot",
					name: "AI & Procedural Generation",
					keywords: [
						"PCG",
						"Machine Learning",
						"Emergent Gameplay"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-80bccce3c0ef",
					hidden: false,
					icon: "book-open",
					name: "Indie Game Development",
					keywords: [
						"Solo Dev",
						"Game Jams",
						"Community"
					]
				},
				{
					id: "019bef5a-93e4-7746-ad39-84bb7e9af005",
					hidden: false,
					icon: "pen-nib",
					name: "Technical Art",
					keywords: [
						"Shaders",
						"VFX",
						"Optimization"
					]
				}
			]
		},
		awards: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-8a8bb9fbe182",
				hidden: false,
				title: "Best Gameplay - Ludum Dare 48",
				awarder: "Ludum Dare",
				date: "April 2021",
				website: {
					url: "",
					label: ""
				},
				description: "<p>Awarded for puzzle game 'Deeper and Deeper' which ranked in the top 5% overall among 3,000+ submissions</p>"
			}, {
				id: "019bef5a-93e4-7746-ad39-8dd81379c7c9",
				hidden: false,
				title: "Employee Excellence Award",
				awarder: "Pixel Forge Interactive",
				date: "December 2021",
				website: {
					url: "",
					label: ""
				},
				description: "<p>Recognized for exceptional contributions to 'Starbound Odyssey' development and dedication to code quality</p>"
			}]
		},
		certifications: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-91fe8a4dfea6",
				hidden: false,
				title: "Unity Certified Expert: Programmer",
				issuer: "Unity Technologies",
				date: "March 2022",
				website: {
					url: "",
					label: ""
				},
				description: ""
			}, {
				id: "019bef5a-93e4-7746-ad39-961afccc2508",
				hidden: false,
				title: "Unreal Engine 5 C++ Developer",
				issuer: "Epic Games (Udemy)",
				date: "June 2023",
				website: {
					url: "",
					label: ""
				},
				description: ""
			}]
		},
		publications: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-9816f0081895",
				hidden: false,
				title: "Optimizing Unity Games for Mobile: A Practical Guide",
				publisher: "Game Developer Magazine",
				date: "September 2021",
				website: {
					url: "",
					label: ""
				},
				description: "<p>Technical article covering mobile optimization techniques including draw call batching, LOD systems, and memory management</p>"
			}, {
				id: "019bef5a-93e4-7746-ad39-9cf55c272c05",
				hidden: false,
				title: "Building Modular Dialogue Systems",
				publisher: "Seattle Indie Game Developers Meetup",
				date: "May 2022",
				website: {
					url: "",
					label: ""
				},
				description: "<p>Presented talk on designing flexible dialogue systems for narrative games, attended by 60+ local developers</p>"
			}]
		},
		volunteer: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-a02580473e05",
				hidden: false,
				organization: "Seattle Indies",
				location: "Seattle, WA",
				period: "2020 - Present",
				website: {
					url: "",
					label: ""
				},
				description: "<p>Active member of local indie game development community. Organize monthly game showcases and provide mentorship to aspiring game developers through code reviews and technical guidance.</p>"
			}, {
				id: "019bef5a-93e4-7746-ad39-a731c5b1b286",
				hidden: false,
				organization: "Code.org Game Development Workshops",
				location: "Seattle, WA",
				period: "2021 - Present",
				website: {
					url: "",
					label: ""
				},
				description: "<p>Volunteer instructor teaching basic game programming concepts to middle school students. Led 8+ workshops introducing Unity fundamentals and game design principles.</p>"
			}]
		},
		references: {
			title: "",
			columns: 1,
			hidden: false,
			items: [{
				id: "019bef5a-93e4-7746-ad39-a945c0f42dd5",
				hidden: false,
				name: "Available upon request",
				position: "",
				website: {
					url: "",
					label: ""
				},
				phone: "",
				description: ""
			}]
		}
	},
	customSections: [{
		title: "Experience",
		columns: 1,
		hidden: false,
		id: "019becaf-0b87-769d-98a6-46ccf558c0e8",
		type: "experience",
		items: [{
			id: "019bef5a-d1fa-7289-a87c-2677688d9e75",
			hidden: false,
			company: "Pixel Forge Interactive",
			position: "Game Developer",
			location: "Bellevue, WA",
			period: "June 2020 - February 2022",
			website: {
				url: "",
				label: ""
			},
			description: "<ul><li>Core developer on 'Starbound Odyssey,' a sci-fi roguelike that achieved 500K+ sales on Steam with 'Very Positive' user reviews</li><li>Implemented procedural generation systems for level layouts, enemy encounters, and loot drops using Unity and C#</li><li>Designed and programmed player progression systems including skill trees, equipment upgrades, and meta-progression mechanics</li><li>Created robust save/load system supporting cloud saves and cross-platform play between PC and Nintendo Switch</li><li>Integrated third-party SDKs for analytics (GameAnalytics), achievements (Steamworks), and multiplayer networking (Photon)</li><li>Fixed critical bugs and balanced gameplay based on community feedback and telemetry data, releasing 12 post-launch content updates</li><li>Worked closely with artists to implement VFX, animations, and shaders that enhanced visual polish while maintaining performance targets</li></ul>"
		}, {
			id: "019bef5a-db0e-73c6-9b6e-4471703864f1",
			hidden: false,
			company: "Mobile Games Studio",
			position: "Junior Game Developer",
			location: "Remote",
			period: "September 2018 - May 2020",
			website: {
				url: "",
				label: ""
			},
			description: "<ul><li><p>Contributed to development of three mobile puzzle games built in Unity, collectively downloaded 2M+ times on iOS and Android</p></li><li><p>Implemented UI systems, touch controls, and gesture recognition optimized for mobile devices and various screen sizes</p></li><li><p>Developed monetization features including rewarded video ads, in-app purchases, and daily reward systems that increased retention by 25%</p></li><li><p>Optimized memory usage and load times for mobile platforms, reducing app size by 35% through asset compression and code optimization</p></li><li><p>Collaborated with game designers to balance puzzle difficulty curves and progression pacing using A/B testing data</p></li></ul><p></p>"
		}]
	}, {
		title: "Cover Letter",
		columns: 1,
		hidden: false,
		id: "019bef5b-0b3d-7e2a-8a7c-12d9e23a4f6b",
		type: "cover-letter",
		items: [{
			id: "019bef5b-0f8d-77d1-9b2a-4a1b65e1b8aa",
			hidden: false,
			recipient: "<p>Hiring Manager<br />Sunrise Games Studio<br />Seattle, WA<br /><a href=\"mailto:hiring@sunrisegames.com\">hiring@sunrisegames.com</a></p>",
			content: "<p>Dear Hiring Manager,</p><p>I'm excited to apply for the Senior Gameplay Engineer role at Sunrise Games Studio. Over the past five years, I have shipped cross-platform titles in Unity and Unreal Engine, leading core gameplay and tooling efforts that improved iteration speed and player experience. At Cascade Studios, I architected combat systems and optimized performance to maintain 60 FPS on console while partnering closely with design and art.</p><p>I thrive in collaborative, cross-disciplinary teams and enjoy mentoring junior engineers. I'd welcome the chance to bring my gameplay systems expertise and tooling focus to your next title.</p><p>Sincerely,<br />David Kowalski</p>"
		}]
	}],
	metadata: {
		template: "azurill",
		layout: {
			sidebarWidth: 30,
			pages: [
				{
					fullWidth: false,
					main: [
						"summary",
						"education",
						"experience"
					],
					sidebar: ["profiles", "skills"]
				},
				{
					fullWidth: false,
					main: ["019becaf-0b87-769d-98a6-46ccf558c0e8", "awards"],
					sidebar: [
						"languages",
						"certifications",
						"interests",
						"references"
					]
				},
				{
					fullWidth: true,
					main: [
						"projects",
						"publications",
						"volunteer"
					],
					sidebar: []
				},
				{
					fullWidth: true,
					main: ["019bef5b-0b3d-7e2a-8a7c-12d9e23a4f6b"],
					sidebar: []
				}
			]
		},
		css: {
			enabled: false,
			value: ""
		},
		page: {
			gapX: 4,
			gapY: 8,
			marginX: 16,
			marginY: 14,
			format: "a4",
			locale: "en-US",
			hideIcons: false
		},
		design: {
			level: {
				icon: "acorn",
				type: "circle"
			},
			colors: {
				primary: "rgba(0, 132, 209, 1)",
				text: "rgba(0, 0, 0, 1)",
				background: "rgba(255, 255, 255, 1)"
			}
		},
		typography: {
			body: {
				fontFamily: "IBM Plex Serif",
				fontWeights: ["400", "600"],
				fontSize: 11,
				lineHeight: 1.5
			},
			heading: {
				fontFamily: "Fira Sans Condensed",
				fontWeights: ["500"],
				fontSize: 18,
				lineHeight: 1.5
			}
		},
		notes: ""
	}
};
var resumeSchema = createSelectSchema(resume, {
	id: zod_default.string().describe("The ID of the resume."),
	name: zod_default.string().min(1).max(64).describe("The name of the resume."),
	slug: zod_default.string().min(1).max(64).describe("The slug of the resume."),
	tags: zod_default.array(zod_default.string()).describe("The tags of the resume."),
	isPublic: zod_default.boolean().describe("Whether the resume is public."),
	isLocked: zod_default.boolean().describe("Whether the resume is locked."),
	password: zod_default.string().min(6).max(64).nullable().describe("The password of the resume, if any."),
	data: resumeDataSchema,
	userId: zod_default.string().describe("The ID of the user who owns the resume."),
	createdAt: zod_default.date().describe("The date and time the resume was created."),
	updatedAt: zod_default.date().describe("The date and time the resume was last updated.")
});
var resumeDto = {
	list: {
		input: zod_default.object({
			tags: zod_default.array(zod_default.string()).optional().default([]),
			sort: zod_default.enum([
				"lastUpdatedAt",
				"createdAt",
				"name"
			]).optional().default("lastUpdatedAt")
		}).optional().default({
			tags: [],
			sort: "lastUpdatedAt"
		}),
		output: zod_default.array(resumeSchema.omit({
			data: true,
			password: true,
			userId: true
		}))
	},
	getById: {
		input: resumeSchema.pick({ id: true }),
		output: resumeSchema.omit({
			password: true,
			userId: true,
			createdAt: true,
			updatedAt: true
		}).extend({ hasPassword: zod_default.boolean() })
	},
	getBySlug: {
		input: zod_default.object({
			username: zod_default.string(),
			slug: zod_default.string()
		}),
		output: resumeSchema.omit({
			password: true,
			userId: true,
			createdAt: true,
			updatedAt: true
		})
	},
	create: {
		input: resumeSchema.pick({
			name: true,
			slug: true,
			tags: true
		}).extend({ withSampleData: zod_default.boolean().default(false) }),
		output: zod_default.string().describe("The ID of the created resume.")
	},
	import: {
		input: resumeSchema.pick({ data: true }),
		output: zod_default.string().describe("The ID of the imported resume.")
	},
	update: {
		input: resumeSchema.pick({
			name: true,
			slug: true,
			tags: true,
			data: true,
			isPublic: true
		}).partial().extend({ id: zod_default.string() }),
		output: resumeSchema.omit({
			password: true,
			userId: true,
			createdAt: true,
			updatedAt: true
		})
	},
	setLocked: {
		input: resumeSchema.pick({
			id: true,
			isLocked: true
		}),
		output: zod_default.void()
	},
	setPassword: {
		input: resumeSchema.pick({ id: true }).extend({ password: zod_default.string().min(6).max(64) }),
		output: zod_default.void()
	},
	removePassword: {
		input: resumeSchema.pick({ id: true }),
		output: zod_default.void()
	},
	patch: {
		input: zod_default.object({
			id: zod_default.string().describe("The ID of the resume to patch."),
			operations: zod_default.array(jsonPatchOperationSchema).min(1).describe("An array of JSON Patch (RFC 6902) operations to apply to the resume data.")
		}),
		output: resumeSchema.omit({
			password: true,
			userId: true,
			createdAt: true,
			updatedAt: true
		}).extend({ hasPassword: zod_default.boolean() })
	},
	duplicate: {
		input: resumeSchema.pick({
			id: true,
			name: true,
			slug: true,
			tags: true
		}),
		output: zod_default.string().describe("The ID of the duplicated resume.")
	},
	delete: {
		input: resumeSchema.pick({ id: true }),
		output: zod_default.void()
	}
};
var resumeRouter$1 = {
	tags: { list: protectedProcedure.route({
		method: "GET",
		path: "/resumes/tags",
		tags: ["Resumes"],
		operationId: "listResumeTags",
		summary: "List all resume tags",
		description: "Returns a sorted list of all unique tags across the authenticated user's resumes. Useful for populating tag filters in the dashboard. Requires authentication.",
		successDescription: "A sorted array of unique tag strings."
	}).output(zod_default.array(zod_default.string())).handler(async ({ context }) => {
		return await resumeService.tags.list({ userId: context.user.id });
	}) },
	statistics: {
		getById: protectedProcedure.route({
			method: "GET",
			path: "/resumes/{id}/statistics",
			tags: ["Resume Statistics"],
			operationId: "getResumeStatistics",
			summary: "Get resume statistics",
			description: "Returns view and download statistics for the specified resume, including total counts and the timestamps of the last view and download. Requires authentication.",
			successDescription: "The resume's view and download statistics."
		}).input(zod_default.object({ id: zod_default.string().describe("The unique identifier of the resume.") })).output(zod_default.object({
			isPublic: zod_default.boolean().describe("Whether the resume is currently public."),
			views: zod_default.number().describe("Total number of times the resume has been viewed."),
			downloads: zod_default.number().describe("Total number of times the resume has been downloaded."),
			lastViewedAt: zod_default.date().nullable().describe("Timestamp of the last view, or null if never viewed."),
			lastDownloadedAt: zod_default.date().nullable().describe("Timestamp of the last download, or null if never downloaded.")
		})).handler(async ({ context, input }) => {
			return await resumeService.statistics.getById({
				id: input.id,
				userId: context.user.id
			});
		}),
		increment: publicProcedure.route({
			tags: ["Internal"],
			operationId: "incrementResumeStatistics",
			summary: "Increment resume statistics"
		}).input(zod_default.object({
			id: zod_default.string(),
			views: zod_default.boolean().default(false),
			downloads: zod_default.boolean().default(false)
		})).handler(async ({ input }) => {
			return await resumeService.statistics.increment(input);
		})
	},
	list: protectedProcedure.route({
		method: "GET",
		path: "/resumes",
		tags: ["Resumes"],
		operationId: "listResumes",
		summary: "List all resumes",
		description: "Returns a list of all resumes belonging to the authenticated user. Results can be filtered by tags and sorted by last updated date, creation date, or name. Resume data is not included in the response for performance; use the get endpoint to fetch full resume data. Requires authentication.",
		successDescription: "A list of resumes with their metadata (without full resume data)."
	}).input(resumeDto.list.input.optional().default({
		tags: [],
		sort: "lastUpdatedAt"
	})).output(resumeDto.list.output).handler(async ({ input, context }) => {
		return await resumeService.list({
			userId: context.user.id,
			tags: input.tags,
			sort: input.sort
		});
	}),
	getById: protectedProcedure.route({
		method: "GET",
		path: "/resumes/{id}",
		tags: ["Resumes"],
		operationId: "getResume",
		summary: "Get resume by ID",
		description: "Returns a single resume with its full data, identified by its unique ID. Only resumes belonging to the authenticated user can be retrieved. Requires authentication.",
		successDescription: "The resume with its full data."
	}).input(resumeDto.getById.input).output(resumeDto.getById.output).handler(async ({ context, input }) => {
		return await resumeService.getById({
			id: input.id,
			userId: context.user.id
		});
	}),
	getByIdForPrinter: serverOnlyProcedure.route({
		tags: ["Internal"],
		operationId: "getResumeForPrinter",
		summary: "Get resume by ID for printer"
	}).input(resumeDto.getById.input).handler(async ({ input }) => {
		return await resumeService.getByIdForPrinter({ id: input.id });
	}),
	getBySlug: publicProcedure.route({
		method: "GET",
		path: "/resumes/{username}/{slug}",
		tags: ["Resume Sharing"],
		operationId: "getResumeBySlug",
		summary: "Get public resume by username and slug",
		description: "Returns a publicly shared resume identified by the owner's username and the resume's slug. If the resume is password-protected and the viewer has not yet verified the password, a 401 error with code NEED_PASSWORD is returned. No authentication required for public resumes; if authenticated as the owner, private resumes are also accessible.",
		successDescription: "The public resume with its full data."
	}).input(resumeDto.getBySlug.input).output(resumeDto.getBySlug.output).handler(async ({ input, context }) => {
		return await resumeService.getBySlug({
			...input,
			currentUserId: context.user?.id
		});
	}),
	create: protectedProcedure.route({
		method: "POST",
		path: "/resumes",
		tags: ["Resumes"],
		operationId: "createResume",
		summary: "Create a new resume",
		description: "Creates a new resume with the given name, slug, and tags. Optionally initializes the resume with sample data by setting withSampleData to true. The slug must be unique across the user's resumes. Returns the ID of the newly created resume. Requires authentication.",
		successDescription: "The ID of the newly created resume."
	}).input(resumeDto.create.input).output(resumeDto.create.output).errors({ RESUME_SLUG_ALREADY_EXISTS: {
		message: "A resume with this slug already exists.",
		status: 400
	} }).handler(async ({ context, input }) => {
		return await resumeService.create({
			name: input.name,
			slug: input.slug,
			tags: input.tags,
			locale: context.locale,
			userId: context.user.id,
			data: input.withSampleData ? sampleResumeData : void 0
		});
	}),
	import: protectedProcedure.route({
		method: "POST",
		path: "/resumes/import",
		tags: ["Resumes"],
		operationId: "importResume",
		summary: "Import a resume",
		description: "Creates a new resume from an existing ResumeData object (e.g. from a previously exported JSON file). A random name and slug are generated automatically. Returns the ID of the imported resume. Requires authentication.",
		successDescription: "The ID of the imported resume."
	}).input(resumeDto.import.input).output(resumeDto.import.output).errors({ RESUME_SLUG_ALREADY_EXISTS: {
		message: "A resume with this slug already exists.",
		status: 400
	} }).handler(async ({ context, input }) => {
		const name = generateRandomName();
		const slug = slugify(name);
		return await resumeService.create({
			name,
			slug,
			tags: [],
			data: input.data,
			locale: context.locale,
			userId: context.user.id
		});
	}),
	update: protectedProcedure.route({
		method: "PUT",
		path: "/resumes/{id}",
		tags: ["Resumes"],
		operationId: "updateResume",
		summary: "Update a resume",
		description: "Updates one or more fields of a resume identified by its ID. All fields are optional; only provided fields will be updated. Locked resumes cannot be updated. Requires authentication.",
		successDescription: "The updated resume with its full data."
	}).input(resumeDto.update.input).output(resumeDto.update.output).errors({ RESUME_SLUG_ALREADY_EXISTS: {
		message: "A resume with this slug already exists.",
		status: 400
	} }).handler(async ({ context, input }) => {
		return await resumeService.update({
			id: input.id,
			userId: context.user.id,
			name: input.name,
			slug: input.slug,
			tags: input.tags,
			data: input.data,
			isPublic: input.isPublic
		});
	}),
	patch: protectedProcedure.route({
		method: "PATCH",
		path: "/resumes/{id}",
		tags: ["Resumes"],
		operationId: "patchResume",
		summary: "Patch resume data",
		description: "Applies JSON Patch (RFC 6902) operations to partially update a resume's data. This allows small, targeted changes (e.g. updating a single field) without sending the entire resume object. Locked resumes cannot be patched. Requires authentication.",
		successDescription: "The patched resume with its full data."
	}).input(resumeDto.patch.input).output(resumeDto.patch.output).errors({ INVALID_PATCH_OPERATIONS: {
		message: "The patch operations are invalid or produced an invalid resume.",
		status: 400
	} }).handler(async ({ context, input }) => {
		return await resumeService.patch({
			id: input.id,
			userId: context.user.id,
			operations: input.operations
		});
	}),
	setLocked: protectedProcedure.route({
		method: "POST",
		path: "/resumes/{id}/lock",
		tags: ["Resumes"],
		operationId: "setResumeLocked",
		summary: "Set resume lock status",
		description: "Toggles the locked status of a resume. When locked, a resume cannot be updated, patched, or deleted. Useful for protecting finalized resumes from accidental edits. Requires authentication.",
		successDescription: "The resume lock status was updated successfully."
	}).input(resumeDto.setLocked.input).output(resumeDto.setLocked.output).handler(async ({ context, input }) => {
		return await resumeService.setLocked({
			id: input.id,
			userId: context.user.id,
			isLocked: input.isLocked
		});
	}),
	setPassword: protectedProcedure.route({
		method: "PUT",
		path: "/resumes/{id}/password",
		tags: ["Resume Sharing"],
		operationId: "setResumePassword",
		summary: "Set resume password",
		description: "Sets or updates a password on a resume. When a password is set, viewers of the public resume must enter the password before the resume data is revealed. The password must be between 6 and 64 characters. Requires authentication.",
		successDescription: "The resume password was set successfully."
	}).input(resumeDto.setPassword.input).output(resumeDto.setPassword.output).handler(async ({ context, input }) => {
		return await resumeService.setPassword({
			id: input.id,
			userId: context.user.id,
			password: input.password
		});
	}),
	verifyPassword: publicProcedure.route({
		method: "POST",
		path: "/resumes/{username}/{slug}/password/verify",
		tags: ["Resume Sharing"],
		operationId: "verifyResumePassword",
		summary: "Verify resume password",
		description: "Verifies a password for a password-protected public resume. On success, the viewer is granted access to view the resume data for the duration of their session. No authentication required.",
		successDescription: "The password was verified successfully and access has been granted."
	}).input(zod_default.object({
		username: zod_default.string().min(1).describe("The username of the resume owner."),
		slug: zod_default.string().min(1).describe("The slug of the resume."),
		password: zod_default.string().min(1).describe("The password to verify.")
	})).output(zod_default.boolean()).handler(async ({ input }) => {
		return await resumeService.verifyPassword({
			username: input.username,
			slug: input.slug,
			password: input.password
		});
	}),
	removePassword: protectedProcedure.route({
		method: "DELETE",
		path: "/resumes/{id}/password",
		tags: ["Resume Sharing"],
		operationId: "removeResumePassword",
		summary: "Remove resume password",
		description: "Removes password protection from a resume. After removal, the resume (if public) can be viewed without entering a password. Requires authentication.",
		successDescription: "The resume password was removed successfully."
	}).input(resumeDto.removePassword.input).output(resumeDto.removePassword.output).handler(async ({ context, input }) => {
		return await resumeService.removePassword({
			id: input.id,
			userId: context.user.id
		});
	}),
	duplicate: protectedProcedure.route({
		method: "POST",
		path: "/resumes/{id}/duplicate",
		tags: ["Resumes"],
		operationId: "duplicateResume",
		summary: "Duplicate a resume",
		description: "Creates a copy of an existing resume with the same data. Optionally override the name, slug, and tags for the duplicate. If not provided, the original resume's name, slug, and tags are used. Returns the ID of the duplicated resume. Requires authentication.",
		successDescription: "The ID of the duplicated resume."
	}).input(resumeDto.duplicate.input).output(resumeDto.duplicate.output).handler(async ({ context, input }) => {
		const original = await resumeService.getById({
			id: input.id,
			userId: context.user.id
		});
		return await resumeService.create({
			userId: context.user.id,
			name: input.name ?? original.name,
			slug: input.slug ?? original.slug,
			tags: input.tags ?? original.tags,
			locale: context.locale,
			data: original.data
		});
	}),
	delete: protectedProcedure.route({
		method: "DELETE",
		path: "/resumes/{id}",
		tags: ["Resumes"],
		operationId: "deleteResume",
		summary: "Delete a resume",
		description: "Permanently deletes a resume and its associated files (screenshots, PDFs) from storage. Locked resumes cannot be deleted; unlock the resume first. Requires authentication.",
		successDescription: "The resume and its associated files were deleted successfully."
	}).input(resumeDto.delete.input).output(resumeDto.delete.output).handler(async ({ context, input }) => {
		return await resumeService.delete({
			id: input.id,
			userId: context.user.id
		});
	})
};
var CACHE_DURATION_MS = 360 * 60 * 1e3;
var GITHUB_API_URL = "https://api.github.com/repos/amruthpillai/reactive-resume";
var LAST_KNOWN = {
	users: 978528,
	resumes: 1336307,
	stars: 34073
};
var getCachePath = (key) => join(process.cwd(), "data", "statistics", `${key}.txt`);
var readCache = async (key) => {
	try {
		const filePath = getCachePath(key);
		const [stats, contents] = await Promise.all([fs.stat(filePath), fs.readFile(filePath, "utf-8")]);
		if (stats.mtimeMs < Date.now() - CACHE_DURATION_MS) return null;
		const value = Number.parseInt(contents, 10);
		return Number.isFinite(value) && value > 0 ? value : null;
	} catch {
		return null;
	}
};
var writeCache = async (key, value) => {
	try {
		const filePath = getCachePath(key);
		await fs.mkdir(dirname(filePath), { recursive: true });
		await fs.writeFile(filePath, String(value), "utf-8");
	} catch {}
};
var getCachedCount = async (key, lastKnown, fetcher) => {
	const cached = await readCache(key);
	if (cached !== null) return cached;
	try {
		const value = await fetcher();
		if (value !== null) {
			await writeCache(key, value);
			return value;
		}
	} catch {}
	return lastKnown;
};
var getCountFromDatabase = async (table) => {
	const [result] = await db.select({ count: count() }).from(table);
	return result.count;
};
var getGitHubStars = async () => {
	const response = await fetch(GITHUB_API_URL, { headers: { Accept: "application/vnd.github+json" } });
	if (!response.ok) return null;
	const data = await response.json();
	const stars = Number(data.stargazers_count);
	return Number.isFinite(stars) && stars > 0 ? stars : null;
};
var statisticsService = {
	user: { getCount: () => {
		return getCachedCount("users", LAST_KNOWN.users, () => getCountFromDatabase(user));
	} },
	resume: { getCount: () => {
		return getCachedCount("resumes", LAST_KNOWN.resumes, () => getCountFromDatabase(resume));
	} },
	github: { getStarCount: () => {
		return getCachedCount("stars", LAST_KNOWN.stars, getGitHubStars);
	} }
};
var statisticsRouter = {
	user: { getCount: publicProcedure.route({
		method: "GET",
		path: "/statistics/users",
		tags: ["Platform Statistics"],
		operationId: "getUserCount",
		summary: "Get total number of users",
		description: "Returns the total number of registered users on this UdaanResume instance. The count is cached for up to 6 hours for performance. No authentication required.",
		successDescription: "The total number of registered users."
	}).output(zod_default.number().describe("The total number of registered users.")).handler(async () => {
		return await statisticsService.user.getCount();
	}) },
	resume: { getCount: publicProcedure.route({
		method: "GET",
		path: "/statistics/resumes",
		tags: ["Platform Statistics"],
		operationId: "getResumeCount",
		summary: "Get total number of resumes",
		description: "Returns the total number of resumes created on this UdaanResume instance. The count is cached for up to 6 hours for performance. No authentication required.",
		successDescription: "The total number of resumes created."
	}).output(zod_default.number().describe("The total number of resumes created.")).handler(async () => {
		return await statisticsService.resume.getCount();
	}) },
	github: { getStarCount: publicProcedure.route({
		method: "GET",
		path: "/statistics/github/stars",
		tags: ["Platform Statistics"],
		operationId: "getGitHubStarCount",
		summary: "Get GitHub star count",
		description: "Returns the number of GitHub stars for the UdaanResume repository. The count is cached for up to 6 hours and falls back to a last-known value if the GitHub API is unavailable. No authentication required.",
		successDescription: "The number of GitHub stars for the UdaanResume repository."
	}).output(zod_default.number().describe("The number of GitHub stars.")).handler(async () => {
		return await statisticsService.github.getStarCount();
	}) }
};
var storageService = getStorageService();
var fileSchema = zod_default.file().max(10 * 1024 * 1024, "File size must be less than 10MB");
var filenameSchema = zod_default.object({ filename: zod_default.string().min(1).describe("The path or filename of the file to delete.") });
var router_default = {
	ai: aiRouter,
	auth: authRouter,
	flags: flagsRouter,
	resume: resumeRouter$1,
	storage: {
		uploadFile: protectedProcedure.route({
			tags: ["Internal"],
			operationId: "uploadFile",
			summary: "Upload a file",
			description: "Uploads a file to storage. Images are automatically resized and converted to WebP format. Maximum file size is 10MB. Requires authentication.",
			successDescription: "The file was uploaded successfully."
		}).input(fileSchema).output(zod_default.object({
			url: zod_default.string().describe("The public URL to access the uploaded file."),
			path: zod_default.string().describe("The storage path of the uploaded file."),
			contentType: zod_default.string().describe("The MIME type of the uploaded file.")
		})).handler(async ({ context, input: file }) => {
			const originalMimeType = file.type;
			const isImage = isImageFile(originalMimeType);
			let data;
			let contentType;
			if (isImage) {
				const processed = await processImageForUpload(file);
				data = processed.data;
				contentType = processed.contentType;
			} else {
				const fileBuffer = await file.arrayBuffer();
				data = new Uint8Array(fileBuffer);
				contentType = originalMimeType;
			}
			const result = await uploadFile({
				userId: context.user.id,
				data,
				contentType,
				type: "picture"
			});
			return {
				url: result.url,
				path: result.key,
				contentType
			};
		}),
		deleteFile: protectedProcedure.route({
			tags: ["Internal"],
			operationId: "deleteFile",
			summary: "Delete a file",
			description: "Deletes a file from storage by its filename or path. If the filename does not start with 'uploads/', the user's picture directory is assumed. Requires authentication.",
			successDescription: "The file was deleted successfully."
		}).input(filenameSchema).output(zod_default.void()).errors({ NOT_FOUND: {
			message: "The specified file was not found in storage.",
			status: 404
		} }).handler(async ({ context, input }) => {
			const key = input.filename.startsWith("uploads/") ? input.filename : `uploads/${context.user.id}/pictures/${input.filename}`;
			if (!await storageService.delete(key)) throw new ORPCError("NOT_FOUND");
		})
	},
	printer: printerRouter,
	statistics: statisticsRouter
};
var getORPCClient = () => {
	return createRouterClient(router_default, {
		interceptors: [onError((error) => {
			console.error(`ERROR [oRPC]: ${error}`);
		})],
		context: async () => {
			const locale = await getLocale();
			const reqHeaders = getRequestHeaders();
			reqHeaders.set("x-server-side-call", "true");
			return {
				locale,
				reqHeaders
			};
		}
	});
};
var client = getORPCClient();
var orpc = createRouterUtils(client);
export { env as a, inferContentType as c, pageDimensionsAsMillimeters as d, pageDimensionsAsPixels as f, verifyPrinterToken as h, db as i, jsonPatchOperationSchema as l, router_default as m, auth as n, getORPCClient as o, printerService as p, client as r, getStorageService as s, applyResumePatches as t, orpc as u };

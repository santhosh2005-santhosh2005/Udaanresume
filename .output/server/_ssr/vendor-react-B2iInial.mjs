import { s as __toESM } from "../_runtime.mjs";
import { C as lt, D as or, E as notInArray, M as sql, S as like, T as ne, _ as eq, b as inArray, h as and, m as desc, p as asc, r as count, v as gt, w as lte, y as gte } from "../_libs/drizzle-orm.mjs";
import { i as require_jsx_runtime } from "../_libs/lingui__react+react.mjs";
import { s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { a as RouterProvider, b as invariant, t as renderRouterToStream } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as defineHandlerCallback } from "../_libs/tanstack__router-core.mjs";
import { A as createLogger, B as APIError, C as createRateLimitKey, D as safeJSONParse, E as createAdapterFactory, F as getBooleanEnvVar, H as BASE_ERROR_CODES, I as getEnvVar, L as isDevelopment, M as shouldPublishLog, N as ENV, O as getAuthTables, P as env, R as isProduction, S as db_exports$1, T as normalizeIP, U as defineErrorCodes, V as BetterAuthError, _ as runWithRequestState, a as refreshAccessToken, b as getBetterAuthVersion, c as createAuthEndpoint, d as getCurrentAdapter, f as queueAfterTransactionHook, g as hasRequestState, h as defineRequestState, i as validateAuthorizationCode, j as logger, k as generateId, l as createAuthMiddleware, m as runWithTransaction, n as SocialProviderListEnum, o as createAuthorizationURL, p as runWithAdapter, r as socialProviders, s as deprecate, t as capitalizeFirstLetter, u as normalizePathname, v as getCurrentAuthContext, w as isValidIP, x as filterOutputFields, y as runWithEndpointContext, z as isTest } from "../_libs/@better-auth/core+[...].mjs";
import { $r as unknown, Bn as custom, Br as string, Dr as object, En as _undefined, Er as number, Fr as record, Gn as email, Jt as ZodObject, Nn as boolean, On as any, Or as optional, Qr as union, Sn as _enum, Vn as date, Yt as ZodOptional, cr as json, kn as array, ln as ZodType, mr as looseObject, pr as literal, xt as ZodDefault } from "../_libs/@ai-sdk/anthropic+[...].mjs";
import { c as boolean$1, l as number$1, o as zod_exports, u as string$1 } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { PassThrough, Readable } from "node:stream";
import { AsyncLocalStorage } from "node:async_hooks";
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
function StartServer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
	request,
	router,
	responseHeaders,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartServer, { router })
}));
var stateIndexKey = "__TSR_index";
function createHistory(opts) {
	let location = opts.getLocation();
	const subscribers = /* @__PURE__ */ new Set();
	const notify = (action) => {
		location = opts.getLocation();
		subscribers.forEach((subscriber) => subscriber({
			location,
			action
		}));
	};
	const handleIndexChange = (action) => {
		if (opts.notifyOnIndexChange ?? true) notify(action);
		else location = opts.getLocation();
	};
	const tryNavigation = async ({ task, navigateOpts, ...actionInfo }) => {
		if (navigateOpts?.ignoreBlocker ?? false) {
			task();
			return;
		}
		const blockers = opts.getBlockers?.() ?? [];
		const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
		if (typeof document !== "undefined" && blockers.length && isPushOrReplace) for (const blocker of blockers) {
			const nextLocation = parseHref(actionInfo.path, actionInfo.state);
			if (await blocker.blockerFn({
				currentLocation: location,
				nextLocation,
				action: actionInfo.type
			})) {
				opts.onBlocked?.();
				return;
			}
		}
		task();
	};
	return {
		get location() {
			return location;
		},
		get length() {
			return opts.getLength();
		},
		subscribers,
		subscribe: (cb) => {
			subscribers.add(cb);
			return () => {
				subscribers.delete(cb);
			};
		},
		push: (path, state, navigateOpts) => {
			const currentIndex = location.state[stateIndexKey];
			state = assignKeyAndIndex(currentIndex + 1, state);
			tryNavigation({
				task: () => {
					opts.pushState(path, state);
					notify({ type: "PUSH" });
				},
				navigateOpts,
				type: "PUSH",
				path,
				state
			});
		},
		replace: (path, state, navigateOpts) => {
			const currentIndex = location.state[stateIndexKey];
			state = assignKeyAndIndex(currentIndex, state);
			tryNavigation({
				task: () => {
					opts.replaceState(path, state);
					notify({ type: "REPLACE" });
				},
				navigateOpts,
				type: "REPLACE",
				path,
				state
			});
		},
		go: (index, navigateOpts) => {
			tryNavigation({
				task: () => {
					opts.go(index);
					handleIndexChange({
						type: "GO",
						index
					});
				},
				navigateOpts,
				type: "GO"
			});
		},
		back: (navigateOpts) => {
			tryNavigation({
				task: () => {
					opts.back(navigateOpts?.ignoreBlocker ?? false);
					handleIndexChange({ type: "BACK" });
				},
				navigateOpts,
				type: "BACK"
			});
		},
		forward: (navigateOpts) => {
			tryNavigation({
				task: () => {
					opts.forward(navigateOpts?.ignoreBlocker ?? false);
					handleIndexChange({ type: "FORWARD" });
				},
				navigateOpts,
				type: "FORWARD"
			});
		},
		canGoBack: () => location.state[stateIndexKey] !== 0,
		createHref: (str) => opts.createHref(str),
		block: (blocker) => {
			if (!opts.setBlockers) return () => {};
			const blockers = opts.getBlockers?.() ?? [];
			opts.setBlockers([...blockers, blocker]);
			return () => {
				const blockers2 = opts.getBlockers?.() ?? [];
				opts.setBlockers?.(blockers2.filter((b) => b !== blocker));
			};
		},
		flush: () => opts.flush?.(),
		destroy: () => opts.destroy?.(),
		notify
	};
}
function assignKeyAndIndex(index, state) {
	if (!state) state = {};
	const key = createRandomKey();
	return {
		...state,
		key,
		__TSR_key: key,
		[stateIndexKey]: index
	};
}
function createMemoryHistory(opts = { initialEntries: ["/"] }) {
	const entries = opts.initialEntries;
	let index = opts.initialIndex ? Math.min(Math.max(opts.initialIndex, 0), entries.length - 1) : entries.length - 1;
	const states = entries.map((_entry, index2) => assignKeyAndIndex(index2, void 0));
	const getLocation = () => parseHref(entries[index], states[index]);
	let blockers = [];
	const _getBlockers = () => blockers;
	const _setBlockers = (newBlockers) => blockers = newBlockers;
	return createHistory({
		getLocation,
		getLength: () => entries.length,
		pushState: (path, state) => {
			if (index < entries.length - 1) {
				entries.splice(index + 1);
				states.splice(index + 1);
			}
			states.push(state);
			entries.push(path);
			index = Math.max(entries.length - 1, 0);
		},
		replaceState: (path, state) => {
			states[index] = state;
			entries[index] = path;
		},
		back: () => {
			index = Math.max(index - 1, 0);
		},
		forward: () => {
			index = Math.min(index + 1, entries.length - 1);
		},
		go: (n) => {
			index = Math.min(Math.max(index + n, 0), entries.length - 1);
		},
		createHref: (path) => path,
		getBlockers: _getBlockers,
		setBlockers: _setBlockers
	});
}
function sanitizePath(path) {
	let sanitized = path.replace(/[\x00-\x1f\x7f]/g, "");
	if (sanitized.startsWith("//")) sanitized = "/" + sanitized.replace(/^\/+/, "");
	return sanitized;
}
function parseHref(href, state) {
	const sanitizedHref = sanitizePath(href);
	const hashIndex = sanitizedHref.indexOf("#");
	const searchIndex = sanitizedHref.indexOf("?");
	const addedKey = createRandomKey();
	return {
		href: sanitizedHref,
		pathname: sanitizedHref.substring(0, hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : sanitizedHref.length),
		hash: hashIndex > -1 ? sanitizedHref.substring(hashIndex) : "",
		search: searchIndex > -1 ? sanitizedHref.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
		state: state || {
			[stateIndexKey]: 0,
			key: addedKey,
			__TSR_key: addedKey
		}
	};
}
function createRandomKey() {
	return (Math.random() + 1).toString(36).substring(7);
}
function splitSetCookieString(cookiesString) {
	if (Array.isArray(cookiesString)) return cookiesString.flatMap((c) => splitSetCookieString(c));
	if (typeof cookiesString !== "string") return [];
	const cookiesStrings = [];
	let pos = 0;
	let start;
	let ch;
	let lastComma;
	let nextStart;
	let cookiesSeparatorFound;
	const skipWhitespace = () => {
		while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
		return pos < cookiesString.length;
	};
	const notSpecialChar = () => {
		ch = cookiesString.charAt(pos);
		return ch !== "=" && ch !== ";" && ch !== ",";
	};
	while (pos < cookiesString.length) {
		start = pos;
		cookiesSeparatorFound = false;
		while (skipWhitespace()) {
			ch = cookiesString.charAt(pos);
			if (ch === ",") {
				lastComma = pos;
				pos += 1;
				skipWhitespace();
				nextStart = pos;
				while (pos < cookiesString.length && notSpecialChar()) pos += 1;
				if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
					cookiesSeparatorFound = true;
					pos = nextStart;
					cookiesStrings.push(cookiesString.slice(start, lastComma));
					start = pos;
				} else pos = lastComma + 1;
			} else pos += 1;
		}
		if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.slice(start));
	}
	return cookiesStrings;
}
function toHeadersInstance(init) {
	if (init instanceof Headers) return init;
	else if (Array.isArray(init)) return new Headers(init);
	else if (typeof init === "object") return new Headers(init);
	else return null;
}
function mergeHeaders(...headers) {
	return headers.reduce((acc, header) => {
		const headersInstance = toHeadersInstance(header);
		if (!headersInstance) return acc;
		for (const [key, value] of headersInstance.entries()) if (key === "set-cookie") splitSetCookieString(value).forEach((cookie) => acc.append("set-cookie", cookie));
		else acc.set(key, value);
		return acc;
	}, new Headers());
}
function isNotFound(obj) {
	return !!obj?.isNotFound;
}
function sanitizePathSegment(segment) {
	return segment.replace(/[\x00-\x1f\x7f]/g, "");
}
function decodeSegment(segment) {
	let decoded;
	try {
		decoded = decodeURI(segment);
	} catch {
		decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
			try {
				return decodeURI(match);
			} catch {
				return match;
			}
		});
	}
	return sanitizePathSegment(decoded);
}
function decodePath(path) {
	if (!path) return {
		path,
		handledProtocolRelativeURL: false
	};
	if (!/[%\\\x00-\x1f\x7f]/.test(path) && !path.startsWith("//")) return {
		path,
		handledProtocolRelativeURL: false
	};
	const re = /%25|%5C/gi;
	let cursor = 0;
	let result = "";
	let match;
	while (null !== (match = re.exec(path))) {
		result += decodeSegment(path.slice(cursor, match.index)) + match[0];
		cursor = re.lastIndex;
	}
	result = result + decodeSegment(cursor ? path.slice(cursor) : path);
	let handledProtocolRelativeURL = false;
	if (result.startsWith("//")) {
		handledProtocolRelativeURL = true;
		result = "/" + result.replace(/^\/+/, "");
	}
	return {
		path: result,
		handledProtocolRelativeURL
	};
}
function createLRUCache(max) {
	const cache = /* @__PURE__ */ new Map();
	let oldest;
	let newest;
	const touch = (entry) => {
		if (!entry.next) return;
		if (!entry.prev) {
			entry.next.prev = void 0;
			oldest = entry.next;
			entry.next = void 0;
			if (newest) {
				entry.prev = newest;
				newest.next = entry;
			}
		} else {
			entry.prev.next = entry.next;
			entry.next.prev = entry.prev;
			entry.next = void 0;
			if (newest) {
				newest.next = entry;
				entry.prev = newest;
			}
		}
		newest = entry;
	};
	return {
		get(key) {
			const entry = cache.get(key);
			if (!entry) return void 0;
			touch(entry);
			return entry.value;
		},
		set(key, value) {
			if (cache.size >= max && oldest) {
				const toDelete = oldest;
				cache.delete(toDelete.key);
				if (toDelete.next) {
					oldest = toDelete.next;
					toDelete.next.prev = void 0;
				}
				if (toDelete === newest) newest = void 0;
			}
			const existing = cache.get(key);
			if (existing) {
				existing.value = value;
				touch(existing);
			} else {
				const entry = {
					key,
					value,
					prev: newest
				};
				if (newest) newest.next = entry;
				newest = entry;
				if (!oldest) oldest = entry;
				cache.set(key, entry);
			}
		},
		clear() {
			cache.clear();
			oldest = void 0;
			newest = void 0;
		}
	};
}
var rootRouteId = "__root__";
function redirect$1(opts) {
	opts.statusCode = opts.statusCode || opts.code || 307;
	if (!opts._builtLocation && !opts.reloadDocument && typeof opts.href === "string") try {
		new URL(opts.href);
		opts.reloadDocument = true;
	} catch {}
	const headers = new Headers(opts.headers);
	if (opts.href && headers.get("Location") === null) headers.set("Location", opts.href);
	const response = new Response(null, {
		status: opts.statusCode,
		headers
	});
	response.options = opts;
	if (opts.throw) throw response;
	return response;
}
function isRedirect(obj) {
	return obj instanceof Response && !!obj.options;
}
function isResolvedRedirect(obj) {
	return isRedirect(obj) && !!obj.options.href;
}
function parseRedirect(obj) {
	if (obj !== null && typeof obj === "object" && obj.isSerializedRedirect) return redirect$1(obj);
}
function executeRewriteInput(rewrite, url) {
	const res = rewrite?.input?.({ url });
	if (res) {
		if (typeof res === "string") return new URL(res);
		else if (res instanceof URL) return res;
	}
	return url;
}
var L$1 = ((i) => (i[i.AggregateError = 1] = "AggregateError", i[i.ArrowFunction = 2] = "ArrowFunction", i[i.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", i[i.ObjectAssign = 8] = "ObjectAssign", i[i.BigIntTypedArray = 16] = "BigIntTypedArray", i[i.RegExp = 32] = "RegExp", i))(L$1 || {});
var v$1 = Symbol.asyncIterator, mr = Symbol.hasInstance, R = Symbol.isConcatSpreadable, C = Symbol.iterator, pr = Symbol.match, dr = Symbol.matchAll, gr = Symbol.replace, yr = Symbol.search, Nr = Symbol.species, br = Symbol.split, vr = Symbol.toPrimitive, P$1 = Symbol.toStringTag, Cr = Symbol.unscopables;
var rt = {
	0: "Symbol.asyncIterator",
	1: "Symbol.hasInstance",
	2: "Symbol.isConcatSpreadable",
	3: "Symbol.iterator",
	4: "Symbol.match",
	5: "Symbol.matchAll",
	6: "Symbol.replace",
	7: "Symbol.search",
	8: "Symbol.species",
	9: "Symbol.split",
	10: "Symbol.toPrimitive",
	11: "Symbol.toStringTag",
	12: "Symbol.unscopables"
}, ve = {
	[v$1]: 0,
	[mr]: 1,
	[R]: 2,
	[C]: 3,
	[pr]: 4,
	[dr]: 5,
	[gr]: 6,
	[yr]: 7,
	[Nr]: 8,
	[br]: 9,
	[vr]: 10,
	[P$1]: 11,
	[Cr]: 12
}, tt = {
	0: v$1,
	1: mr,
	2: R,
	3: C,
	4: pr,
	5: dr,
	6: gr,
	7: yr,
	8: Nr,
	9: br,
	10: vr,
	11: P$1,
	12: Cr
}, nt = {
	2: "!0",
	3: "!1",
	1: "void 0",
	0: "null",
	4: "-0",
	5: "1/0",
	6: "-1/0",
	7: "0/0"
}, o$1 = void 0, ot = {
	2: !0,
	3: !1,
	1: o$1,
	0: null,
	4: -0,
	5: Number.POSITIVE_INFINITY,
	6: Number.NEGATIVE_INFINITY,
	7: NaN
};
var Ce = {
	0: "Error",
	1: "EvalError",
	2: "RangeError",
	3: "ReferenceError",
	4: "SyntaxError",
	5: "TypeError",
	6: "URIError"
}, at = {
	0: Error,
	1: EvalError,
	2: RangeError,
	3: ReferenceError,
	4: SyntaxError,
	5: TypeError,
	6: URIError
};
function c$1(e, r, t, n, a, s, i, u, l, g, S, d) {
	return {
		t: e,
		i: r,
		s: t,
		c: n,
		m: a,
		p: s,
		e: i,
		a: u,
		f: l,
		b: g,
		o: S,
		l: d
	};
}
function F(e) {
	return c$1(2, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
var J = F(2), Z = F(3), Ae = F(1), Ee = F(0), st = F(4), it = F(5), ut = F(6), lt$1 = F(7);
function fn(e) {
	switch (e) {
		case "\"": return "\\\"";
		case "\\": return "\\\\";
		case `
`: return "\\n";
		case "\r": return "\\r";
		case "\b": return "\\b";
		case "	": return "\\t";
		case "\f": return "\\f";
		case "<": return "\\x3C";
		case "\u2028": return "\\u2028";
		case "\u2029": return "\\u2029";
		default: return o$1;
	}
}
function y$1(e) {
	let r = "", t = 0, n;
	for (let a = 0, s = e.length; a < s; a++) n = fn(e[a]), n && (r += e.slice(t, a) + n, t = a + 1);
	return t === 0 ? r = e : r += e.slice(t), r;
}
function Sn(e) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\\"": return "\"";
		case "\\n": return `
`;
		case "\\r": return "\r";
		case "\\b": return "\b";
		case "\\t": return "	";
		case "\\f": return "\f";
		case "\\x3C": return "<";
		case "\\u2028": return "\u2028";
		case "\\u2029": return "\u2029";
		default: return e;
	}
}
function B$1(e) {
	return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, Sn);
}
var U = "__SEROVAL_REFS__", ce = "$R", Ie = `self.${ce}`;
function mn(e) {
	return e == null ? `${Ie}=${Ie}||[]` : `(${Ie}=${Ie}||{})["${y$1(e)}"]=[]`;
}
var Ar = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map();
function Er(e) {
	return Ar.has(e);
}
function dn(e) {
	return j.has(e);
}
function ct(e) {
	if (Er(e)) return Ar.get(e);
	throw new Re(e);
}
function ft(e) {
	if (dn(e)) return j.get(e);
	throw new Pe(e);
}
typeof globalThis != "undefined" ? Object.defineProperty(globalThis, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof window != "undefined" ? Object.defineProperty(window, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof self != "undefined" ? Object.defineProperty(self, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof global != "undefined" && Object.defineProperty(global, U, {
	value: j,
	configurable: !0,
	writable: !1,
	enumerable: !1
});
function xe(e) {
	return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function gn(e) {
	let r = Ce[xe(e)];
	return e.name !== r ? { name: e.name } : e.constructor.name !== r ? { name: e.constructor.name } : {};
}
function $$1(e, r) {
	let t = gn(e), n = Object.getOwnPropertyNames(e);
	for (let a = 0, s = n.length, i; a < s; a++) i = n[a], i !== "name" && i !== "message" && (i === "stack" ? r & 4 && (t = t || {}, t[i] = e[i]) : (t = t || {}, t[i] = e[i]));
	return t;
}
function Oe(e) {
	return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function Te(e) {
	switch (e) {
		case Number.POSITIVE_INFINITY: return it;
		case Number.NEGATIVE_INFINITY: return ut;
	}
	return e !== e ? lt$1 : Object.is(e, -0) ? st : c$1(0, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function X(e) {
	return c$1(1, o$1, y$1(e), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function we(e) {
	return c$1(3, o$1, "" + e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function mt(e) {
	return c$1(4, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function he(e, r) {
	let t = r.valueOf();
	return c$1(5, e, t !== t ? "" : r.toISOString(), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function ze(e, r) {
	return c$1(6, e, o$1, y$1(r.source), r.flags, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function pt(e, r) {
	return c$1(17, e, ve[r], o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function dt(e, r) {
	return c$1(18, e, y$1(ct(r)), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function fe$1(e, r, t) {
	return c$1(25, e, t, y$1(r), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function _e(e, r, t) {
	return c$1(9, e, o$1, o$1, o$1, o$1, o$1, t, o$1, o$1, Oe(r), o$1);
}
function ke(e, r) {
	return c$1(21, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function De(e, r, t) {
	return c$1(15, e, o$1, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.length);
}
function Fe(e, r, t) {
	return c$1(16, e, o$1, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.byteLength);
}
function Be(e, r, t) {
	return c$1(20, e, o$1, o$1, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.byteLength);
}
function Ve(e, r, t) {
	return c$1(13, e, xe(r), o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Me(e, r, t) {
	return c$1(14, e, xe(r), o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Le(e, r) {
	return c$1(7, e, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1, o$1);
}
function Ue(e, r) {
	return c$1(28, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1, o$1);
}
function je(e, r) {
	return c$1(30, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1, o$1);
}
function Ye(e, r, t) {
	return c$1(31, e, o$1, o$1, o$1, o$1, o$1, t, r, o$1, o$1, o$1);
}
function qe(e, r) {
	return c$1(32, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function We(e, r) {
	return c$1(33, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function Ge(e, r) {
	return c$1(34, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function Ke(e, r, t, n) {
	return c$1(35, e, t, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1, n);
}
var { toString: ys } = Object.prototype;
var yn = {
	parsing: 1,
	serialization: 2,
	deserialization: 3
};
function Nn(e) {
	return `Seroval Error (step: ${yn[e]})`;
}
var bn = (e, r) => Nn(e), Se = class extends Error {
	constructor(t, n) {
		super(bn(t, n));
		this.cause = n;
	}
}, z$4 = class extends Se {
	constructor(r) {
		super("parsing", r);
	}
}, He = class extends Se {
	constructor(r) {
		super("deserialization", r);
	}
};
function _(e) {
	return `Seroval Error (specific: ${e})`;
}
var x$1 = class extends Error {
	constructor(t) {
		super(_(1));
		this.value = t;
	}
}, w$1 = class extends Error {
	constructor(r) {
		super(_(2));
	}
}, Q = class extends Error {
	constructor(r) {
		super(_(3));
	}
}, V = class extends Error {
	constructor(r) {
		super(_(4));
	}
}, Re = class extends Error {
	constructor(t) {
		super(_(5));
		this.value = t;
	}
}, Pe = class extends Error {
	constructor(r) {
		super(_(6));
	}
}, Je = class extends Error {
	constructor(r) {
		super(_(7));
	}
}, h$1 = class extends Error {
	constructor(r) {
		super(_(8));
	}
};
var ee = class extends Error {
	constructor(r) {
		super(_(9));
	}
};
var Y$1 = class {
	constructor(r, t) {
		this.value = r;
		this.replacement = t;
	}
};
var re = () => {
	let e = {
		p: 0,
		s: 0,
		f: 0
	};
	return e.p = new Promise((r, t) => {
		e.s = r, e.f = t;
	}), e;
}, vn = (e, r) => {
	e.s(r), e.p.s = 1, e.p.v = r;
}, Cn = (e, r) => {
	e.f(r), e.p.s = 2, e.p.v = r;
}, yt = re.toString(), Nt = vn.toString(), bt = Cn.toString(), Rr = () => {
	let e = [], r = [], t = !0, n = !1, a = 0, s = (l, g, S) => {
		for (S = 0; S < a; S++) r[S] && r[S][g](l);
	}, i = (l, g, S, d) => {
		for (g = 0, S = e.length; g < S; g++) d = e[g], !t && g === S - 1 ? l[n ? "return" : "throw"](d) : l.next(d);
	}, u = (l, g) => (t && (g = a++, r[g] = l), i(l), () => {
		t && (r[g] = r[a], r[a--] = void 0);
	});
	return {
		__SEROVAL_STREAM__: !0,
		on: (l) => u(l),
		next: (l) => {
			t && (e.push(l), s(l, "next"));
		},
		throw: (l) => {
			t && (e.push(l), s(l, "throw"), t = !1, n = !1, r.length = 0);
		},
		return: (l) => {
			t && (e.push(l), s(l, "return"), t = !1, n = !0, r.length = 0);
		}
	};
}, vt = Rr.toString(), Pr = (e) => (r) => () => {
	let t = 0, n = {
		[e]: () => n,
		next: () => {
			if (t > r.d) return {
				done: !0,
				value: void 0
			};
			let a = t++, s = r.v[a];
			if (a === r.t) throw s;
			return {
				done: a === r.d,
				value: s
			};
		}
	};
	return n;
}, Ct = Pr.toString(), xr = (e, r) => (t) => () => {
	let n = 0, a = -1, s = !1, i = [], u = [], l = (S = 0, d = u.length) => {
		for (; S < d; S++) u[S].s({
			done: !0,
			value: void 0
		});
	};
	t.on({
		next: (S) => {
			let d = u.shift();
			d && d.s({
				done: !1,
				value: S
			}), i.push(S);
		},
		throw: (S) => {
			let d = u.shift();
			d && d.f(S), l(), a = i.length, s = !0, i.push(S);
		},
		return: (S) => {
			let d = u.shift();
			d && d.s({
				done: !0,
				value: S
			}), l(), a = i.length, i.push(S);
		}
	});
	let g = {
		[e]: () => g,
		next: () => {
			if (a === -1) {
				let K = n++;
				if (K >= i.length) {
					let et = r();
					return u.push(et), et.p;
				}
				return {
					done: !1,
					value: i[K]
				};
			}
			if (n > a) return {
				done: !0,
				value: void 0
			};
			let S = n++, d = i[S];
			if (S !== a) return {
				done: !1,
				value: d
			};
			if (s) throw d;
			return {
				done: !0,
				value: d
			};
		}
	};
	return g;
}, At = xr.toString(), Or = (e) => {
	let r = atob(e), t = r.length, n = new Uint8Array(t);
	for (let a = 0; a < t; a++) n[a] = r.charCodeAt(a);
	return n.buffer;
}, Et = Or.toString();
function Ze(e) {
	return "__SEROVAL_SEQUENCE__" in e;
}
function Tr(e, r, t) {
	return {
		__SEROVAL_SEQUENCE__: !0,
		v: e,
		t: r,
		d: t
	};
}
function $e(e) {
	let r = [], t = -1, n = -1, a = e[C]();
	for (;;) try {
		let s = a.next();
		if (r.push(s.value), s.done) {
			n = r.length - 1;
			break;
		}
	} catch (s) {
		t = r.length, r.push(s);
	}
	return Tr(r, t, n);
}
var An = Pr(C);
function It(e) {
	return An(e);
}
var Rt = {}, Pt = {};
var xt = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
	5: {}
}, Ot = {
	0: "[]",
	1: yt,
	2: Nt,
	3: bt,
	4: vt,
	5: Et
};
function M(e) {
	return "__SEROVAL_STREAM__" in e;
}
function te$1() {
	return Rr();
}
function Xe(e) {
	let r = te$1(), t = e[v$1]();
	async function n() {
		try {
			let a = await t.next();
			a.done ? r.return(a.value) : (r.next(a.value), await n());
		} catch (a) {
			r.throw(a);
		}
	}
	return n().catch(() => {}), r;
}
var En = xr(v$1, re);
function Tt(e) {
	return En(e);
}
async function wr(e) {
	try {
		return [1, await e];
	} catch (r) {
		return [0, r];
	}
}
function pe$1(e, r) {
	return {
		plugins: r.plugins,
		mode: e,
		marked: /* @__PURE__ */ new Set(),
		features: 63 ^ (r.disabledFeatures || 0),
		refs: r.refs || /* @__PURE__ */ new Map(),
		depthLimit: r.depthLimit || 1e3
	};
}
function de(e, r) {
	e.marked.add(r);
}
function hr(e, r) {
	let t = e.refs.size;
	return e.refs.set(r, t), t;
}
function Qe(e, r) {
	let t = e.refs.get(r);
	return t != null ? (de(e, t), {
		type: 1,
		value: mt(t)
	}) : {
		type: 0,
		value: hr(e, r)
	};
}
function q$1(e, r) {
	let t = Qe(e, r);
	return t.type === 1 ? t : Er(r) ? {
		type: 2,
		value: dt(t.value, r)
	} : t;
}
function I(e, r) {
	let t = q$1(e, r);
	if (t.type !== 0) return t.value;
	if (r in ve) return pt(t.value, r);
	throw new x$1(r);
}
function k(e, r) {
	let t = Qe(e, xt[r]);
	return t.type === 1 ? t.value : c$1(26, t.value, r, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function er(e) {
	let r = Qe(e, Rt);
	return r.type === 1 ? r.value : c$1(27, r.value, o$1, o$1, o$1, o$1, o$1, o$1, I(e, C), o$1, o$1, o$1);
}
function rr(e) {
	let r = Qe(e, Pt);
	return r.type === 1 ? r.value : c$1(29, r.value, o$1, o$1, o$1, o$1, o$1, [k(e, 1), I(e, v$1)], o$1, o$1, o$1, o$1);
}
function tr(e, r, t, n) {
	return c$1(t ? 11 : 10, e, o$1, o$1, o$1, n, o$1, o$1, o$1, o$1, Oe(r), o$1);
}
function nr(e, r, t, n) {
	return c$1(8, r, o$1, o$1, o$1, o$1, {
		k: t,
		v: n
	}, o$1, k(e, 0), o$1, o$1, o$1);
}
function ht(e, r, t) {
	return c$1(22, r, t, o$1, o$1, o$1, o$1, o$1, k(e, 1), o$1, o$1, o$1);
}
function or$1(e, r, t) {
	let n = new Uint8Array(t), a = "";
	for (let s = 0, i = n.length; s < i; s++) a += String.fromCharCode(n[s]);
	return c$1(19, r, y$1(btoa(a)), o$1, o$1, o$1, o$1, o$1, k(e, 5), o$1, o$1, o$1);
}
function ne$2(e, r) {
	return {
		base: pe$1(e, r),
		child: void 0
	};
}
var _r = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return N$1(this._p, this.depth, r);
	}
};
async function Rn(e, r, t) {
	let n = [];
	for (let a = 0, s = t.length; a < s; a++) a in t ? n[a] = await N$1(e, r, t[a]) : n[a] = 0;
	return n;
}
async function Pn(e, r, t, n) {
	return _e(t, n, await Rn(e, r, n));
}
async function kr(e, r, t) {
	let n = Object.entries(t), a = [], s = [];
	for (let i = 0, u = n.length; i < u; i++) a.push(y$1(n[i][0])), s.push(await N$1(e, r, n[i][1]));
	return C in t && (a.push(I(e.base, C)), s.push(Ue(er(e.base), await N$1(e, r, $e(t))))), v$1 in t && (a.push(I(e.base, v$1)), s.push(je(rr(e.base), await N$1(e, r, Xe(t))))), P$1 in t && (a.push(I(e.base, P$1)), s.push(X(t[P$1]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? J : Z)), {
		k: a,
		v: s
	};
}
async function zr(e, r, t, n, a) {
	return tr(t, n, a, await kr(e, r, n));
}
async function xn(e, r, t, n) {
	return ke(t, await N$1(e, r, n.valueOf()));
}
async function On(e, r, t, n) {
	return De(t, n, await N$1(e, r, n.buffer));
}
async function Tn(e, r, t, n) {
	return Fe(t, n, await N$1(e, r, n.buffer));
}
async function wn(e, r, t, n) {
	return Be(t, n, await N$1(e, r, n.buffer));
}
async function zt(e, r, t, n) {
	let a = $$1(n, e.base.features);
	return Ve(t, n, a ? await kr(e, r, a) : o$1);
}
async function hn(e, r, t, n) {
	let a = $$1(n, e.base.features);
	return Me(t, n, a ? await kr(e, r, a) : o$1);
}
async function zn(e, r, t, n) {
	let a = [], s = [];
	for (let [i, u] of n.entries()) a.push(await N$1(e, r, i)), s.push(await N$1(e, r, u));
	return nr(e.base, t, a, s);
}
async function _n(e, r, t, n) {
	let a = [];
	for (let s of n.keys()) a.push(await N$1(e, r, s));
	return Le(t, a);
}
async function _t(e, r, t, n) {
	let a = e.base.plugins;
	if (a) for (let s = 0, i = a.length; s < i; s++) {
		let u = a[s];
		if (u.parse.async && u.test(n)) return fe$1(t, u.tag, await u.parse.async(n, new _r(e, r), { id: t }));
	}
	return o$1;
}
async function kn(e, r, t, n) {
	let [a, s] = await wr(n);
	return c$1(12, t, a, o$1, o$1, o$1, o$1, o$1, await N$1(e, r, s), o$1, o$1, o$1);
}
function Dn(e, r, t, n, a) {
	let s = [], i = t.on({
		next: (u) => {
			de(this.base, r), N$1(this, e, u).then((l) => {
				s.push(qe(r, l));
			}, (l) => {
				a(l), i();
			});
		},
		throw: (u) => {
			de(this.base, r), N$1(this, e, u).then((l) => {
				s.push(We(r, l)), n(s), i();
			}, (l) => {
				a(l), i();
			});
		},
		return: (u) => {
			de(this.base, r), N$1(this, e, u).then((l) => {
				s.push(Ge(r, l)), n(s), i();
			}, (l) => {
				a(l), i();
			});
		}
	});
}
async function Fn(e, r, t, n) {
	return Ye(t, k(e.base, 4), await new Promise(Dn.bind(e, r, t, n)));
}
async function Bn(e, r, t, n) {
	let a = [];
	for (let s = 0, i = n.v.length; s < i; s++) a[s] = await N$1(e, r, n.v[s]);
	return Ke(t, a, n.t, n.d);
}
async function Vn(e, r, t, n) {
	if (Array.isArray(n)) return Pn(e, r, t, n);
	if (M(n)) return Fn(e, r, t, n);
	if (Ze(n)) return Bn(e, r, t, n);
	let a = n.constructor;
	if (a === Y$1) return N$1(e, r, n.replacement);
	let s = await _t(e, r, t, n);
	if (s) return s;
	switch (a) {
		case Object: return zr(e, r, t, n, !1);
		case o$1: return zr(e, r, t, n, !0);
		case Date: return he(t, n);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return zt(e, r, t, n);
		case Number:
		case Boolean:
		case String:
		case BigInt: return xn(e, r, t, n);
		case ArrayBuffer: return or$1(e.base, t, n);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return On(e, r, t, n);
		case DataView: return wn(e, r, t, n);
		case Map: return zn(e, r, t, n);
		case Set: return _n(e, r, t, n);
		default: break;
	}
	if (a === Promise || n instanceof Promise) return kn(e, r, t, n);
	let i = e.base.features;
	if (i & 32 && a === RegExp) return ze(t, n);
	if (i & 16) switch (a) {
		case BigInt64Array:
		case BigUint64Array: return Tn(e, r, t, n);
		default: break;
	}
	if (i & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n instanceof AggregateError)) return hn(e, r, t, n);
	if (n instanceof Error) return zt(e, r, t, n);
	if (C in n || v$1 in n) return zr(e, r, t, n, !!a);
	throw new x$1(n);
}
async function Mn(e, r, t) {
	let n = q$1(e.base, t);
	if (n.type !== 0) return n.value;
	let a = await _t(e, r, n.value, t);
	if (a) return a;
	throw new x$1(t);
}
async function N$1(e, r, t) {
	switch (typeof t) {
		case "boolean": return t ? J : Z;
		case "undefined": return Ae;
		case "string": return X(t);
		case "number": return Te(t);
		case "bigint": return we(t);
		case "object":
			if (t) {
				let n = q$1(e.base, t);
				return n.type === 0 ? await Vn(e, r + 1, n.value, t) : n.value;
			}
			return Ee;
		case "symbol": return I(e.base, t);
		case "function": return Mn(e, r, t);
		default: throw new x$1(t);
	}
}
async function oe(e, r) {
	try {
		return await N$1(e, 0, r);
	} catch (t) {
		throw t instanceof z$4 ? t : new z$4(t);
	}
}
var ae = ((t) => (t[t.Vanilla = 1] = "Vanilla", t[t.Cross = 2] = "Cross", t))(ae || {});
function ni(e) {
	return e;
}
function kt(e, r) {
	for (let t = 0, n = r.length; t < n; t++) {
		let a = r[t];
		e.has(a) || (e.add(a), a.extends && kt(e, a.extends));
	}
}
function A(e) {
	if (e) {
		let r = /* @__PURE__ */ new Set();
		return kt(r, e), [...r];
	}
}
function Dt(e) {
	switch (e) {
		case "Int8Array": return Int8Array;
		case "Int16Array": return Int16Array;
		case "Int32Array": return Int32Array;
		case "Uint8Array": return Uint8Array;
		case "Uint16Array": return Uint16Array;
		case "Uint32Array": return Uint32Array;
		case "Uint8ClampedArray": return Uint8ClampedArray;
		case "Float32Array": return Float32Array;
		case "Float64Array": return Float64Array;
		case "BigInt64Array": return BigInt64Array;
		case "BigUint64Array": return BigUint64Array;
		default: throw new Je(e);
	}
}
var Ln = 1e6, Un = 1e4, jn = 2e4;
function Bt(e, r) {
	switch (r) {
		case 3: return Object.freeze(e);
		case 1: return Object.preventExtensions(e);
		case 2: return Object.seal(e);
		default: return e;
	}
}
var Yn = 1e3;
function Vt(e, r) {
	var t;
	return {
		mode: e,
		plugins: r.plugins,
		refs: r.refs || /* @__PURE__ */ new Map(),
		features: (t = r.features) != null ? t : 63 ^ (r.disabledFeatures || 0),
		depthLimit: r.depthLimit || Yn
	};
}
function Mt(e) {
	return {
		mode: 1,
		base: Vt(1, e),
		child: o$1,
		state: { marked: new Set(e.markedRefs) }
	};
}
var Dr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	deserialize(r) {
		return p$1(this._p, this.depth, r);
	}
};
function Ut(e, r) {
	if (r < 0 || !Number.isFinite(r) || !Number.isInteger(r)) throw new h$1({
		t: 4,
		i: r
	});
	if (e.refs.has(r)) throw new Error("Conflicted ref id: " + r);
}
function qn(e, r, t) {
	return Ut(e.base, r), e.state.marked.has(r) && e.base.refs.set(r, t), t;
}
function Wn(e, r, t) {
	return Ut(e.base, r), e.base.refs.set(r, t), t;
}
function b(e, r, t) {
	return e.mode === 1 ? qn(e, r, t) : Wn(e, r, t);
}
function Fr(e, r, t) {
	if (Object.hasOwn(r, t)) return r[t];
	throw new h$1(e);
}
function Gn(e, r) {
	return b(e, r.i, ft(B$1(r.s)));
}
function Kn(e, r, t) {
	let n = t.a, a = n.length, s = b(e, t.i, new Array(a));
	for (let i = 0, u; i < a; i++) u = n[i], u && (s[i] = p$1(e, r, u));
	return Bt(s, t.o), s;
}
function Hn(e) {
	switch (e) {
		case "constructor":
		case "__proto__":
		case "prototype":
		case "__defineGetter__":
		case "__defineSetter__":
		case "__lookupGetter__":
		case "__lookupSetter__": return !1;
		default: return !0;
	}
}
function Jn(e) {
	switch (e) {
		case v$1:
		case R:
		case P$1:
		case C: return !0;
		default: return !1;
	}
}
function Ft(e, r, t) {
	Hn(r) ? e[r] = t : Object.defineProperty(e, r, {
		value: t,
		configurable: !0,
		enumerable: !0,
		writable: !0
	});
}
function Zn(e, r, t, n, a) {
	if (typeof n == "string") Ft(t, n, p$1(e, r, a));
	else {
		let s = p$1(e, r, n);
		switch (typeof s) {
			case "string":
				Ft(t, s, p$1(e, r, a));
				break;
			case "symbol":
				Jn(s) && (t[s] = p$1(e, r, a));
				break;
			default: throw new h$1(n);
		}
	}
}
function jt(e, r, t, n) {
	let a = t.k;
	if (a.length > 0) for (let i = 0, u = t.v, l = a.length; i < l; i++) Zn(e, r, n, a[i], u[i]);
	return n;
}
function $n(e, r, t) {
	let n = b(e, t.i, t.t === 10 ? {} : Object.create(null));
	return jt(e, r, t.p, n), Bt(n, t.o), n;
}
function Xn(e, r) {
	return b(e, r.i, new Date(r.s));
}
function Qn(e, r) {
	if (e.base.features & 32) {
		let t = B$1(r.c);
		if (t.length > jn) throw new h$1(r);
		return b(e, r.i, new RegExp(t, r.m));
	}
	throw new w$1(r);
}
function eo(e, r, t) {
	let n = b(e, t.i, /* @__PURE__ */ new Set());
	for (let a = 0, s = t.a, i = s.length; a < i; a++) n.add(p$1(e, r, s[a]));
	return n;
}
function ro(e, r, t) {
	let n = b(e, t.i, /* @__PURE__ */ new Map());
	for (let a = 0, s = t.e.k, i = t.e.v, u = s.length; a < u; a++) n.set(p$1(e, r, s[a]), p$1(e, r, i[a]));
	return n;
}
function to(e, r) {
	if (r.s.length > Ln) throw new h$1(r);
	return b(e, r.i, Or(B$1(r.s)));
}
function no(e, r, t) {
	var u;
	let n = Dt(t.c), a = p$1(e, r, t.f), s = (u = t.b) != null ? u : 0;
	if (s < 0 || s > a.byteLength) throw new h$1(t);
	return b(e, t.i, new n(a, s, t.l));
}
function oo(e, r, t) {
	var i;
	let n = p$1(e, r, t.f), a = (i = t.b) != null ? i : 0;
	if (a < 0 || a > n.byteLength) throw new h$1(t);
	return b(e, t.i, new DataView(n, a, t.l));
}
function Yt(e, r, t, n) {
	if (t.p) {
		let a = jt(e, r, t.p, {});
		Object.defineProperties(n, Object.getOwnPropertyDescriptors(a));
	}
	return n;
}
function ao(e, r, t) {
	return Yt(e, r, t, b(e, t.i, new AggregateError([], B$1(t.m))));
}
function so(e, r, t) {
	let n = Fr(t, at, t.s);
	return Yt(e, r, t, b(e, t.i, new n(B$1(t.m))));
}
function io(e, r, t) {
	let n = re(), a = b(e, t.i, n.p), s = p$1(e, r, t.f);
	return t.s ? n.s(s) : n.f(s), a;
}
function uo(e, r, t) {
	return b(e, t.i, Object(p$1(e, r, t.f)));
}
function lo(e, r, t) {
	let n = e.base.plugins;
	if (n) {
		let a = B$1(t.c);
		for (let s = 0, i = n.length; s < i; s++) {
			let u = n[s];
			if (u.tag === a) return b(e, t.i, u.deserialize(t.s, new Dr(e, r), { id: t.i }));
		}
	}
	throw new Q(t.c);
}
function co(e, r) {
	return b(e, r.i, b(e, r.s, re()).p);
}
function fo(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n) return n.s(p$1(e, r, t.a[1])), o$1;
	throw new V("Promise");
}
function So(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n) return n.f(p$1(e, r, t.a[1])), o$1;
	throw new V("Promise");
}
function mo(e, r, t) {
	p$1(e, r, t.a[0]);
	return It(p$1(e, r, t.a[1]));
}
function po(e, r, t) {
	p$1(e, r, t.a[0]);
	return Tt(p$1(e, r, t.a[1]));
}
function go(e, r, t) {
	let n = b(e, t.i, te$1()), a = t.a, s = a.length;
	if (s) for (let i = 0; i < s; i++) p$1(e, r, a[i]);
	return n;
}
function yo(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n && M(n)) return n.next(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function No(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n && M(n)) return n.throw(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function bo(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n && M(n)) return n.return(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function vo(e, r, t) {
	return p$1(e, r, t.f), o$1;
}
function Co(e, r, t) {
	return p$1(e, r, t.a[1]), o$1;
}
function Ao(e, r, t) {
	let n = b(e, t.i, Tr([], t.s, t.l));
	for (let a = 0, s = t.a.length; a < s; a++) n.v[a] = p$1(e, r, t.a[a]);
	return n;
}
function p$1(e, r, t) {
	if (r > e.base.depthLimit) throw new ee(e.base.depthLimit);
	switch (r += 1, t.t) {
		case 2: return Fr(t, ot, t.s);
		case 0: return Number(t.s);
		case 1: return B$1(String(t.s));
		case 3:
			if (String(t.s).length > Un) throw new h$1(t);
			return BigInt(t.s);
		case 4: return e.base.refs.get(t.i);
		case 18: return Gn(e, t);
		case 9: return Kn(e, r, t);
		case 10:
		case 11: return $n(e, r, t);
		case 5: return Xn(e, t);
		case 6: return Qn(e, t);
		case 7: return eo(e, r, t);
		case 8: return ro(e, r, t);
		case 19: return to(e, t);
		case 16:
		case 15: return no(e, r, t);
		case 20: return oo(e, r, t);
		case 14: return ao(e, r, t);
		case 13: return so(e, r, t);
		case 12: return io(e, r, t);
		case 17: return Fr(t, tt, t.s);
		case 21: return uo(e, r, t);
		case 25: return lo(e, r, t);
		case 22: return co(e, t);
		case 23: return fo(e, r, t);
		case 24: return So(e, r, t);
		case 28: return mo(e, r, t);
		case 30: return po(e, r, t);
		case 31: return go(e, r, t);
		case 32: return yo(e, r, t);
		case 33: return No(e, r, t);
		case 34: return bo(e, r, t);
		case 27: return vo(e, r, t);
		case 29: return Co(e, r, t);
		case 35: return Ao(e, r, t);
		default: throw new w$1(t);
	}
}
function ar(e, r) {
	try {
		return p$1(e, 0, r);
	} catch (t) {
		throw new He(t);
	}
}
var Eo = () => T, Io = Eo.toString(), qt = /=>/.test(Io);
function sr(e, r) {
	return qt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + e.join(",") + "){return " + r + "}";
}
function Wt(e, r) {
	return qt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + r + "}" : "function(" + e.join(",") + "){" + r + "}";
}
var Ht = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_", Gt = Ht.length, Jt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_", Kt = Jt.length;
function Br(e) {
	let r = e % Gt, t = Ht[r];
	for (e = (e - r) / Gt; e > 0;) r = e % Kt, t += Jt[r], e = (e - r) / Kt;
	return t;
}
var Ro = /^[$A-Z_][0-9A-Z_$]*$/i;
function Vr(e) {
	let r = e[0];
	return (r === "$" || r === "_" || r >= "A" && r <= "Z" || r >= "a" && r <= "z") && Ro.test(e);
}
function ye(e) {
	switch (e.t) {
		case 0: return e.s + "=" + e.v;
		case 2: return e.s + ".set(" + e.k + "," + e.v + ")";
		case 1: return e.s + ".add(" + e.v + ")";
		case 3: return e.s + ".delete(" + e.k + ")";
	}
}
function Po(e) {
	let r = [], t = e[0];
	for (let n = 1, a = e.length, s, i = t; n < a; n++) s = e[n], s.t === 0 && s.v === i.v ? t = {
		t: 0,
		s: s.s,
		k: o$1,
		v: ye(t)
	} : s.t === 2 && s.s === i.s ? t = {
		t: 2,
		s: ye(t),
		k: s.k,
		v: s.v
	} : s.t === 1 && s.s === i.s ? t = {
		t: 1,
		s: ye(t),
		k: o$1,
		v: s.v
	} : s.t === 3 && s.s === i.s ? t = {
		t: 3,
		s: ye(t),
		k: s.k,
		v: o$1
	} : (r.push(t), t = s), i = s;
	return r.push(t), r;
}
function tn(e) {
	if (e.length) {
		let r = "", t = Po(e);
		for (let n = 0, a = t.length; n < a; n++) r += ye(t[n]) + ",";
		return r;
	}
	return o$1;
}
var xo = "Object.create(null)", Oo = "new Set", To = "new Map", wo = "Promise.resolve", ho = "Promise.reject", zo = {
	3: "Object.freeze",
	2: "Object.seal",
	1: "Object.preventExtensions",
	0: o$1
};
function nn(e, r) {
	return {
		mode: e,
		plugins: r.plugins,
		features: r.features,
		marked: new Set(r.markedRefs),
		stack: [],
		flags: [],
		assignments: []
	};
}
function ur(e) {
	return {
		mode: 2,
		base: nn(2, e),
		state: e,
		child: o$1
	};
}
var Mr = class {
	constructor(r) {
		this._p = r;
	}
	serialize(r) {
		return f$1(this._p, r);
	}
};
function ko(e, r) {
	let t = e.valid.get(r);
	t ?? (t = e.valid.size, e.valid.set(r, t));
	let n = e.vars[t];
	return n ?? (n = Br(t), e.vars[t] = n), n;
}
function Do(e) {
	return ce + "[" + e + "]";
}
function m$1(e, r) {
	return e.mode === 1 ? ko(e.state, r) : Do(r);
}
function O$1(e, r) {
	e.marked.add(r);
}
function Lr(e, r) {
	return e.marked.has(r);
}
function jr(e, r, t) {
	r !== 0 && (O$1(e.base, t), e.base.flags.push({
		type: r,
		value: m$1(e, t)
	}));
}
function Fo(e) {
	let r = "";
	for (let t = 0, n = e.flags, a = n.length; t < a; t++) {
		let s = n[t];
		r += zo[s.type] + "(" + s.value + "),";
	}
	return r;
}
function on$1(e) {
	let r = tn(e.assignments), t = Fo(e);
	return r ? t ? r + t : r : t;
}
function Yr(e, r, t) {
	e.assignments.push({
		t: 0,
		s: r,
		k: o$1,
		v: t
	});
}
function Bo(e, r, t) {
	e.base.assignments.push({
		t: 1,
		s: m$1(e, r),
		k: o$1,
		v: t
	});
}
function ge(e, r, t, n) {
	e.base.assignments.push({
		t: 2,
		s: m$1(e, r),
		k: t,
		v: n
	});
}
function Zt(e, r, t) {
	e.base.assignments.push({
		t: 3,
		s: m$1(e, r),
		k: t,
		v: o$1
	});
}
function Ne(e, r, t, n) {
	Yr(e.base, m$1(e, r) + "[" + t + "]", n);
}
function Ur(e, r, t, n) {
	Yr(e.base, m$1(e, r) + "." + t, n);
}
function Vo(e, r, t, n) {
	Yr(e.base, m$1(e, r) + ".v[" + t + "]", n);
}
function D$1(e, r) {
	return r.t === 4 && e.stack.includes(r.i);
}
function se(e, r, t) {
	return e.mode === 1 && !Lr(e.base, r) ? t : m$1(e, r) + "=" + t;
}
function Mo(e) {
	return U + ".get(\"" + e.s + "\")";
}
function $t(e, r, t, n) {
	return t ? D$1(e.base, t) ? (O$1(e.base, r), Ne(e, r, n, m$1(e, t.i)), "") : f$1(e, t) : "";
}
function Lo(e, r) {
	let t = r.i, n = r.a, a = n.length;
	if (a > 0) {
		e.base.stack.push(t);
		let s = $t(e, t, n[0], 0), i = s === "";
		for (let u = 1, l; u < a; u++) l = $t(e, t, n[u], u), s += "," + l, i = l === "";
		return e.base.stack.pop(), jr(e, r.o, r.i), "[" + s + (i ? ",]" : "]");
	}
	return "[]";
}
function Xt(e, r, t, n) {
	if (typeof t == "string") {
		let a = Number(t), s = a >= 0 && a.toString() === t || Vr(t);
		if (D$1(e.base, n)) {
			let i = m$1(e, n.i);
			return O$1(e.base, r.i), s && a !== a ? Ur(e, r.i, t, i) : Ne(e, r.i, s ? t : "\"" + t + "\"", i), "";
		}
		return (s ? t : "\"" + t + "\"") + ":" + f$1(e, n);
	}
	return "[" + f$1(e, t) + "]:" + f$1(e, n);
}
function an(e, r, t) {
	let n = t.k, a = n.length;
	if (a > 0) {
		let s = t.v;
		e.base.stack.push(r.i);
		let i = Xt(e, r, n[0], s[0]);
		for (let u = 1, l = i; u < a; u++) l = Xt(e, r, n[u], s[u]), i += (l && i && ",") + l;
		return e.base.stack.pop(), "{" + i + "}";
	}
	return "{}";
}
function Uo(e, r) {
	return jr(e, r.o, r.i), an(e, r, r.p);
}
function jo(e, r, t, n) {
	let a = an(e, r, t);
	return a !== "{}" ? "Object.assign(" + n + "," + a + ")" : n;
}
function Yo(e, r, t, n, a) {
	let s = e.base, i = f$1(e, a), u = Number(n), l = u >= 0 && u.toString() === n || Vr(n);
	if (D$1(s, a)) l && u !== u ? Ur(e, r.i, n, i) : Ne(e, r.i, l ? n : "\"" + n + "\"", i);
	else {
		let g = s.assignments;
		s.assignments = t, l && u !== u ? Ur(e, r.i, n, i) : Ne(e, r.i, l ? n : "\"" + n + "\"", i), s.assignments = g;
	}
}
function qo(e, r, t, n, a) {
	if (typeof n == "string") Yo(e, r, t, n, a);
	else {
		let s = e.base, i = s.stack;
		s.stack = [];
		let u = f$1(e, a);
		s.stack = i;
		let l = s.assignments;
		s.assignments = t, Ne(e, r.i, f$1(e, n), u), s.assignments = l;
	}
}
function Wo(e, r, t) {
	let n = t.k, a = n.length;
	if (a > 0) {
		let s = [], i = t.v;
		e.base.stack.push(r.i);
		for (let u = 0; u < a; u++) qo(e, r, s, n[u], i[u]);
		return e.base.stack.pop(), tn(s);
	}
	return o$1;
}
function qr(e, r, t) {
	if (r.p) {
		let n = e.base;
		if (n.features & 8) t = jo(e, r, r.p, t);
		else {
			O$1(n, r.i);
			let a = Wo(e, r, r.p);
			if (a) return "(" + se(e, r.i, t) + "," + a + m$1(e, r.i) + ")";
		}
	}
	return t;
}
function Go(e, r) {
	return jr(e, r.o, r.i), qr(e, r, xo);
}
function Ko(e) {
	return "new Date(\"" + e.s + "\")";
}
function Ho(e, r) {
	if (e.base.features & 32) return "/" + r.c + "/" + r.m;
	throw new w$1(r);
}
function Qt(e, r, t) {
	let n = e.base;
	return D$1(n, t) ? (O$1(n, r), Bo(e, r, m$1(e, t.i)), "") : f$1(e, t);
}
function Jo(e, r) {
	let t = Oo, n = r.a, a = n.length, s = r.i;
	if (a > 0) {
		e.base.stack.push(s);
		let i = Qt(e, s, n[0]);
		for (let u = 1, l = i; u < a; u++) l = Qt(e, s, n[u]), i += (l && i && ",") + l;
		e.base.stack.pop(), i && (t += "([" + i + "])");
	}
	return t;
}
function en(e, r, t, n, a) {
	let s = e.base;
	if (D$1(s, t)) {
		let i = m$1(e, t.i);
		if (O$1(s, r), D$1(s, n)) return ge(e, r, i, m$1(e, n.i)), "";
		if (n.t !== 4 && n.i != null && Lr(s, n.i)) {
			let l = "(" + f$1(e, n) + ",[" + a + "," + a + "])";
			return ge(e, r, i, m$1(e, n.i)), Zt(e, r, a), l;
		}
		let u = s.stack;
		return s.stack = [], ge(e, r, i, f$1(e, n)), s.stack = u, "";
	}
	if (D$1(s, n)) {
		let i = m$1(e, n.i);
		if (O$1(s, r), t.t !== 4 && t.i != null && Lr(s, t.i)) {
			let l = "(" + f$1(e, t) + ",[" + a + "," + a + "])";
			return ge(e, r, m$1(e, t.i), i), Zt(e, r, a), l;
		}
		let u = s.stack;
		return s.stack = [], ge(e, r, f$1(e, t), i), s.stack = u, "";
	}
	return "[" + f$1(e, t) + "," + f$1(e, n) + "]";
}
function Zo(e, r) {
	let t = To, n = r.e.k, a = n.length, s = r.i, i = r.f, u = m$1(e, i.i), l = e.base;
	if (a > 0) {
		let g = r.e.v;
		l.stack.push(s);
		let S = en(e, s, n[0], g[0], u);
		for (let d = 1, K = S; d < a; d++) K = en(e, s, n[d], g[d], u), S += (K && S && ",") + K;
		l.stack.pop(), S && (t += "([" + S + "])");
	}
	return i.t === 26 && (O$1(l, i.i), t = "(" + f$1(e, i) + "," + t + ")"), t;
}
function $o(e, r) {
	return W(e, r.f) + "(\"" + r.s + "\")";
}
function Xo(e, r) {
	return "new " + r.c + "(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function Qo(e, r) {
	return "new DataView(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function ea(e, r) {
	let t = r.i;
	e.base.stack.push(t);
	let n = qr(e, r, "new AggregateError([],\"" + r.m + "\")");
	return e.base.stack.pop(), n;
}
function ra(e, r) {
	return qr(e, r, "new " + Ce[r.s] + "(\"" + r.m + "\")");
}
function ta(e, r) {
	let t, n = r.f, a = r.i, s = r.s ? wo : ho, i = e.base;
	if (D$1(i, n)) {
		let u = m$1(e, n.i);
		t = s + (r.s ? "().then(" + sr([], u) + ")" : "().catch(" + Wt([], "throw " + u) + ")");
	} else {
		i.stack.push(a);
		let u = f$1(e, n);
		i.stack.pop(), t = s + "(" + u + ")";
	}
	return t;
}
function na(e, r) {
	return "Object(" + f$1(e, r.f) + ")";
}
function W(e, r) {
	let t = f$1(e, r);
	return r.t === 4 ? t : "(" + t + ")";
}
function oa(e, r) {
	if (e.mode === 1) throw new w$1(r);
	return "(" + se(e, r.s, W(e, r.f) + "()") + ").p";
}
function aa(e, r) {
	if (e.mode === 1) throw new w$1(r);
	return W(e, r.a[0]) + "(" + m$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function sa(e, r) {
	if (e.mode === 1) throw new w$1(r);
	return W(e, r.a[0]) + "(" + m$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function ia(e, r) {
	let t = e.base.plugins;
	if (t) for (let n = 0, a = t.length; n < a; n++) {
		let s = t[n];
		if (s.tag === r.c) return e.child ??= new Mr(e), s.serialize(r.s, e.child, { id: r.i });
	}
	throw new Q(r.c);
}
function ua(e, r) {
	let t = "", n = !1;
	return r.f.t !== 4 && (O$1(e.base, r.f.i), t = "(" + f$1(e, r.f) + ",", n = !0), t += se(e, r.i, "(" + Ct + ")(" + m$1(e, r.f.i) + ")"), n && (t += ")"), t;
}
function la(e, r) {
	return W(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function ca(e, r) {
	let t = r.a[0], n = r.a[1], a = e.base, s = "";
	t.t !== 4 && (O$1(a, t.i), s += "(" + f$1(e, t)), n.t !== 4 && (O$1(a, n.i), s += (s ? "," : "(") + f$1(e, n)), s && (s += ",");
	let i = se(e, r.i, "(" + At + ")(" + m$1(e, n.i) + "," + m$1(e, t.i) + ")");
	return s ? s + i + ")" : i;
}
function fa(e, r) {
	return W(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function Sa(e, r) {
	let t = se(e, r.i, W(e, r.f) + "()"), n = r.a.length;
	if (n) {
		let a = f$1(e, r.a[0]);
		for (let s = 1; s < n; s++) a += "," + f$1(e, r.a[s]);
		return "(" + t + "," + a + "," + m$1(e, r.i) + ")";
	}
	return t;
}
function ma(e, r) {
	return m$1(e, r.i) + ".next(" + f$1(e, r.f) + ")";
}
function pa(e, r) {
	return m$1(e, r.i) + ".throw(" + f$1(e, r.f) + ")";
}
function da(e, r) {
	return m$1(e, r.i) + ".return(" + f$1(e, r.f) + ")";
}
function rn(e, r, t, n) {
	let a = e.base;
	return D$1(a, n) ? (O$1(a, r), Vo(e, r, t, m$1(e, n.i)), "") : f$1(e, n);
}
function ga(e, r) {
	let t = r.a, n = t.length, a = r.i;
	if (n > 0) {
		e.base.stack.push(a);
		let s = rn(e, a, 0, t[0]);
		for (let i = 1, u = s; i < n; i++) u = rn(e, a, i, t[i]), s += (u && s && ",") + u;
		if (e.base.stack.pop(), s) return "{__SEROVAL_SEQUENCE__:!0,v:[" + s + "],t:" + r.s + ",d:" + r.l + "}";
	}
	return "{__SEROVAL_SEQUENCE__:!0,v:[],t:-1,d:0}";
}
function ya(e, r) {
	switch (r.t) {
		case 17: return rt[r.s];
		case 18: return Mo(r);
		case 9: return Lo(e, r);
		case 10: return Uo(e, r);
		case 11: return Go(e, r);
		case 5: return Ko(r);
		case 6: return Ho(e, r);
		case 7: return Jo(e, r);
		case 8: return Zo(e, r);
		case 19: return $o(e, r);
		case 16:
		case 15: return Xo(e, r);
		case 20: return Qo(e, r);
		case 14: return ea(e, r);
		case 13: return ra(e, r);
		case 12: return ta(e, r);
		case 21: return na(e, r);
		case 22: return oa(e, r);
		case 25: return ia(e, r);
		case 26: return Ot[r.s];
		case 35: return ga(e, r);
		default: throw new w$1(r);
	}
}
function f$1(e, r) {
	switch (r.t) {
		case 2: return nt[r.s];
		case 0: return "" + r.s;
		case 1: return "\"" + r.s + "\"";
		case 3: return r.s + "n";
		case 4: return m$1(e, r.i);
		case 23: return aa(e, r);
		case 24: return sa(e, r);
		case 27: return ua(e, r);
		case 28: return la(e, r);
		case 29: return ca(e, r);
		case 30: return fa(e, r);
		case 31: return Sa(e, r);
		case 32: return ma(e, r);
		case 33: return pa(e, r);
		case 34: return da(e, r);
		default: return se(e, r.i, ya(e, r));
	}
}
function cr(e, r) {
	let t = f$1(e, r), n = r.i;
	if (n == null) return t;
	let a = on$1(e.base), s = m$1(e, n), i = e.state.scopeId, u = i == null ? "" : ce, l = a ? "(" + t + "," + a + s + ")" : t;
	if (u === "") return r.t === 10 && !a ? "(" + l + ")" : l;
	let g = i == null ? "()" : "(" + ce + "[\"" + y$1(i) + "\"])";
	return "(" + sr([u], l) + ")" + g;
}
var Gr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return E$1(this._p, this.depth, r);
	}
}, Kr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return E$1(this._p, this.depth, r);
	}
	parseWithError(r) {
		return G(this._p, this.depth, r);
	}
	isAlive() {
		return this._p.state.alive;
	}
	pushPendingState() {
		Xr(this._p);
	}
	popPendingState() {
		be(this._p);
	}
	onParse(r) {
		ie(this._p, r);
	}
	onError(r) {
		Zr(this._p, r);
	}
};
function Na(e) {
	return {
		alive: !0,
		pending: 0,
		initial: !0,
		buffer: [],
		onParse: e.onParse,
		onError: e.onError,
		onDone: e.onDone
	};
}
function Hr(e) {
	return {
		type: 2,
		base: pe$1(2, e),
		state: Na(e)
	};
}
function ba(e, r, t) {
	let n = [];
	for (let a = 0, s = t.length; a < s; a++) a in t ? n[a] = E$1(e, r, t[a]) : n[a] = 0;
	return n;
}
function va(e, r, t, n) {
	return _e(t, n, ba(e, r, n));
}
function Jr(e, r, t) {
	let n = Object.entries(t), a = [], s = [];
	for (let i = 0, u = n.length; i < u; i++) a.push(y$1(n[i][0])), s.push(E$1(e, r, n[i][1]));
	return C in t && (a.push(I(e.base, C)), s.push(Ue(er(e.base), E$1(e, r, $e(t))))), v$1 in t && (a.push(I(e.base, v$1)), s.push(je(rr(e.base), E$1(e, r, e.type === 1 ? te$1() : Xe(t))))), P$1 in t && (a.push(I(e.base, P$1)), s.push(X(t[P$1]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? J : Z)), {
		k: a,
		v: s
	};
}
function Wr(e, r, t, n, a) {
	return tr(t, n, a, Jr(e, r, n));
}
function Ca(e, r, t, n) {
	return ke(t, E$1(e, r, n.valueOf()));
}
function Aa(e, r, t, n) {
	return De(t, n, E$1(e, r, n.buffer));
}
function Ea(e, r, t, n) {
	return Fe(t, n, E$1(e, r, n.buffer));
}
function Ia(e, r, t, n) {
	return Be(t, n, E$1(e, r, n.buffer));
}
function sn(e, r, t, n) {
	let a = $$1(n, e.base.features);
	return Ve(t, n, a ? Jr(e, r, a) : o$1);
}
function Ra(e, r, t, n) {
	let a = $$1(n, e.base.features);
	return Me(t, n, a ? Jr(e, r, a) : o$1);
}
function Pa(e, r, t, n) {
	let a = [], s = [];
	for (let [i, u] of n.entries()) a.push(E$1(e, r, i)), s.push(E$1(e, r, u));
	return nr(e.base, t, a, s);
}
function xa(e, r, t, n) {
	let a = [];
	for (let s of n.keys()) a.push(E$1(e, r, s));
	return Le(t, a);
}
function Oa(e, r, t, n) {
	let a = Ye(t, k(e.base, 4), []);
	return e.type === 1 || (Xr(e), n.on({
		next: (s) => {
			if (e.state.alive) {
				let i = G(e, r, s);
				i && ie(e, qe(t, i));
			}
		},
		throw: (s) => {
			if (e.state.alive) {
				let i = G(e, r, s);
				i && ie(e, We(t, i));
			}
			be(e);
		},
		return: (s) => {
			if (e.state.alive) {
				let i = G(e, r, s);
				i && ie(e, Ge(t, i));
			}
			be(e);
		}
	})), a;
}
function Ta(e, r, t) {
	if (this.state.alive) {
		let n = G(this, r, t);
		n && ie(this, c$1(23, e, o$1, o$1, o$1, o$1, o$1, [k(this.base, 2), n], o$1, o$1, o$1, o$1)), be(this);
	}
}
function wa(e, r, t) {
	if (this.state.alive) {
		let n = G(this, r, t);
		n && ie(this, c$1(24, e, o$1, o$1, o$1, o$1, o$1, [k(this.base, 3), n], o$1, o$1, o$1, o$1));
	}
	be(this);
}
function ha(e, r, t, n) {
	let a = hr(e.base, {});
	return e.type === 2 && (Xr(e), n.then(Ta.bind(e, a, r), wa.bind(e, a, r))), ht(e.base, t, a);
}
function za(e, r, t, n, a) {
	for (let s = 0, i = a.length; s < i; s++) {
		let u = a[s];
		if (u.parse.sync && u.test(n)) return fe$1(t, u.tag, u.parse.sync(n, new Gr(e, r), { id: t }));
	}
	return o$1;
}
function _a(e, r, t, n, a) {
	for (let s = 0, i = a.length; s < i; s++) {
		let u = a[s];
		if (u.parse.stream && u.test(n)) return fe$1(t, u.tag, u.parse.stream(n, new Kr(e, r), { id: t }));
	}
	return o$1;
}
function un(e, r, t, n) {
	let a = e.base.plugins;
	return a ? e.type === 1 ? za(e, r, t, n, a) : _a(e, r, t, n, a) : o$1;
}
function ka(e, r, t, n) {
	let a = [];
	for (let s = 0, i = n.v.length; s < i; s++) a[s] = E$1(e, r, n.v[s]);
	return Ke(t, a, n.t, n.d);
}
function Da(e, r, t, n, a) {
	switch (a) {
		case Object: return Wr(e, r, t, n, !1);
		case o$1: return Wr(e, r, t, n, !0);
		case Date: return he(t, n);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return sn(e, r, t, n);
		case Number:
		case Boolean:
		case String:
		case BigInt: return Ca(e, r, t, n);
		case ArrayBuffer: return or$1(e.base, t, n);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return Aa(e, r, t, n);
		case DataView: return Ia(e, r, t, n);
		case Map: return Pa(e, r, t, n);
		case Set: return xa(e, r, t, n);
		default: break;
	}
	if (a === Promise || n instanceof Promise) return ha(e, r, t, n);
	let s = e.base.features;
	if (s & 32 && a === RegExp) return ze(t, n);
	if (s & 16) switch (a) {
		case BigInt64Array:
		case BigUint64Array: return Ea(e, r, t, n);
		default: break;
	}
	if (s & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n instanceof AggregateError)) return Ra(e, r, t, n);
	if (n instanceof Error) return sn(e, r, t, n);
	if (C in n || v$1 in n) return Wr(e, r, t, n, !!a);
	throw new x$1(n);
}
function Fa(e, r, t, n) {
	if (Array.isArray(n)) return va(e, r, t, n);
	if (M(n)) return Oa(e, r, t, n);
	if (Ze(n)) return ka(e, r, t, n);
	let a = n.constructor;
	if (a === Y$1) return E$1(e, r, n.replacement);
	return un(e, r, t, n) || Da(e, r, t, n, a);
}
function Ba(e, r, t) {
	let n = q$1(e.base, t);
	if (n.type !== 0) return n.value;
	let a = un(e, r, n.value, t);
	if (a) return a;
	throw new x$1(t);
}
function E$1(e, r, t) {
	if (r >= e.base.depthLimit) throw new ee(e.base.depthLimit);
	switch (typeof t) {
		case "boolean": return t ? J : Z;
		case "undefined": return Ae;
		case "string": return X(t);
		case "number": return Te(t);
		case "bigint": return we(t);
		case "object":
			if (t) {
				let n = q$1(e.base, t);
				return n.type === 0 ? Fa(e, r + 1, n.value, t) : n.value;
			}
			return Ee;
		case "symbol": return I(e.base, t);
		case "function": return Ba(e, r, t);
		default: throw new x$1(t);
	}
}
function ie(e, r) {
	e.state.initial ? e.state.buffer.push(r) : $r(e, r, !1);
}
function Zr(e, r) {
	if (e.state.onError) e.state.onError(r);
	else throw r instanceof z$4 ? r : new z$4(r);
}
function ln(e) {
	e.state.onDone && e.state.onDone();
}
function $r(e, r, t) {
	try {
		e.state.onParse(r, t);
	} catch (n) {
		Zr(e, n);
	}
}
function Xr(e) {
	e.state.pending++;
}
function be(e) {
	--e.state.pending <= 0 && ln(e);
}
function G(e, r, t) {
	try {
		return E$1(e, r, t);
	} catch (n) {
		return Zr(e, n), o$1;
	}
}
function Qr(e, r) {
	let t = G(e, 0, r);
	t && ($r(e, t, !0), e.state.initial = !1, Va(e, e.state), e.state.pending <= 0 && fr(e));
}
function Va(e, r) {
	for (let t = 0, n = r.buffer.length; t < n; t++) $r(e, r.buffer[t], !1);
}
function fr(e) {
	e.state.alive && (ln(e), e.state.alive = !1);
}
async function ou(e, r = {}) {
	return await oe(ne$2(2, {
		plugins: A(r.plugins),
		disabledFeatures: r.disabledFeatures,
		refs: r.refs
	}), e);
}
function cn(e, r) {
	let t = A(r.plugins), n = Hr({
		plugins: t,
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		onParse(a, s) {
			let i = ur({
				plugins: t,
				features: n.base.features,
				scopeId: r.scopeId,
				markedRefs: n.base.marked
			}), u;
			try {
				u = cr(i, a);
			} catch (l) {
				r.onError && r.onError(l);
				return;
			}
			r.onSerialize(u, s);
		},
		onError: r.onError,
		onDone: r.onDone
	});
	return Qr(n, e), fr.bind(null, n);
}
function au(e, r) {
	let n = Hr({
		plugins: A(r.plugins),
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		onParse: r.onParse,
		onError: r.onError,
		onDone: r.onDone
	});
	return Qr(n, e), fr.bind(null, n);
}
function Iu(e, r = {}) {
	var i;
	let t = A(r.plugins), n = r.disabledFeatures || 0, a = (i = e.f) != null ? i : 63;
	return ar(Mt({
		plugins: t,
		markedRefs: e.m,
		features: a & ~n,
		disabledFeatures: n
	}), e.t);
}
var GLOBAL_TSR = "$_TSR";
var TSR_SCRIPT_BARRIER_ID = "$tsr-stream-barrier";
function createSerializationAdapter(opts) {
	return opts;
}
function makeSsrSerovalPlugin(serializationAdapter, options) {
	return ni({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: { stream(value, ctx) {
			return ctx.parse(serializationAdapter.toSerializable(value));
		} },
		serialize(node, ctx) {
			options.didRun = true;
			return GLOBAL_TSR + ".t.get(\"" + serializationAdapter.key + "\")(" + ctx.serialize(node) + ")";
		},
		deserialize: void 0
	});
}
function makeSerovalPlugin(serializationAdapter) {
	return ni({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: {
			sync(value, ctx) {
				return ctx.parse(serializationAdapter.toSerializable(value));
			},
			async async(value, ctx) {
				return await ctx.parse(serializationAdapter.toSerializable(value));
			},
			stream(value, ctx) {
				return ctx.parse(serializationAdapter.toSerializable(value));
			}
		},
		serialize: void 0,
		deserialize(node, ctx) {
			return serializationAdapter.fromSerializable(ctx.deserialize(node));
		}
	});
}
var u = (e) => {
	let r = new AbortController(), a = r.abort.bind(r);
	return e.then(a, a), r;
};
function E(e) {
	e(this.reason);
}
function D(e) {
	this.addEventListener("abort", E.bind(this, e), { once: !0 });
}
function c(e) {
	return new Promise(D.bind(e));
}
var i = {};
ni({
	tag: "seroval-plugins/web/AbortSignal",
	extends: [ni({
		tag: "seroval-plugins/web/AbortControllerFactoryPlugin",
		test(e) {
			return e === i;
		},
		parse: {
			sync() {
				return i;
			},
			async async() {
				return await Promise.resolve(i);
			},
			stream() {
				return i;
			}
		},
		serialize() {
			return u.toString();
		},
		deserialize() {
			return u;
		}
	})],
	test(e) {
		return typeof AbortSignal == "undefined" ? !1 : e instanceof AbortSignal;
	},
	parse: {
		sync(e, r) {
			return e.aborted ? { reason: r.parse(e.reason) } : {};
		},
		async async(e, r) {
			if (e.aborted) return { reason: await r.parse(e.reason) };
			let a = await c(e);
			return { reason: await r.parse(a) };
		},
		stream(e, r) {
			if (e.aborted) return { reason: r.parse(e.reason) };
			let a = c(e);
			return {
				factory: r.parse(i),
				controller: r.parse(a)
			};
		}
	},
	serialize(e, r) {
		return e.reason ? "AbortSignal.abort(" + r.serialize(e.reason) + ")" : e.controller && e.factory ? "(" + r.serialize(e.factory) + ")(" + r.serialize(e.controller) + ").signal" : "(new AbortController).signal";
	},
	deserialize(e, r) {
		return e.reason ? AbortSignal.abort(r.deserialize(e.reason)) : e.controller ? u(r.deserialize(e.controller)).signal : new AbortController().signal;
	}
});
ni({
	tag: "seroval-plugins/web/Blob",
	test(e) {
		return typeof Blob == "undefined" ? !1 : e instanceof Blob;
	},
	parse: { async async(e, r) {
		return {
			type: await r.parse(e.type),
			buffer: await r.parse(await e.arrayBuffer())
		};
	} },
	serialize(e, r) {
		return "new Blob([" + r.serialize(e.buffer) + "],{type:" + r.serialize(e.type) + "})";
	},
	deserialize(e, r) {
		return new Blob([r.deserialize(e.buffer)], { type: r.deserialize(e.type) });
	}
});
function d(e) {
	return {
		detail: e.detail,
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
ni({
	tag: "seroval-plugins/web/CustomEvent",
	test(e) {
		return typeof CustomEvent == "undefined" ? !1 : e instanceof CustomEvent;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(d(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(d(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(d(e))
			};
		}
	},
	serialize(e, r) {
		return "new CustomEvent(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new CustomEvent(r.deserialize(e.type), r.deserialize(e.options));
	}
});
ni({
	tag: "seroval-plugins/web/DOMException",
	test(e) {
		return typeof DOMException == "undefined" ? !1 : e instanceof DOMException;
	},
	parse: {
		sync(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		},
		async async(e, r) {
			return {
				name: await r.parse(e.name),
				message: await r.parse(e.message)
			};
		},
		stream(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		}
	},
	serialize(e, r) {
		return "new DOMException(" + r.serialize(e.message) + "," + r.serialize(e.name) + ")";
	},
	deserialize(e, r) {
		return new DOMException(r.deserialize(e.message), r.deserialize(e.name));
	}
});
function f(e) {
	return {
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
ni({
	tag: "seroval-plugins/web/Event",
	test(e) {
		return typeof Event == "undefined" ? !1 : e instanceof Event;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(f(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		}
	},
	serialize(e, r) {
		return "new Event(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Event(r.deserialize(e.type), r.deserialize(e.options));
	}
});
var m = ni({
	tag: "seroval-plugins/web/File",
	test(e) {
		return typeof File == "undefined" ? !1 : e instanceof File;
	},
	parse: { async async(e, r) {
		return {
			name: await r.parse(e.name),
			options: await r.parse({
				type: e.type,
				lastModified: e.lastModified
			}),
			buffer: await r.parse(await e.arrayBuffer())
		};
	} },
	serialize(e, r) {
		return "new File([" + r.serialize(e.buffer) + "]," + r.serialize(e.name) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new File([r.deserialize(e.buffer)], r.deserialize(e.name), r.deserialize(e.options));
	}
});
function y(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var o = {}, v = (e, r = new FormData(), a = 0, t = e.length, s) => {
	for (; a < t; a++) s = e[a], r.append(s[0], s[1]);
	return r;
};
ni({
	tag: "seroval-plugins/web/FormData",
	extends: [m, ni({
		tag: "seroval-plugins/web/FormDataFactory",
		test(e) {
			return e === o;
		},
		parse: {
			sync() {
				return o;
			},
			async async() {
				return await Promise.resolve(o);
			},
			stream() {
				return o;
			}
		},
		serialize() {
			return v.toString();
		},
		deserialize() {
			return o;
		}
	})],
	test(e) {
		return typeof FormData == "undefined" ? !1 : e instanceof FormData;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(o),
				entries: r.parse(y(e))
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(o),
				entries: await r.parse(y(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(o),
				entries: r.parse(y(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.entries) + ")";
	},
	deserialize(e, r) {
		return v(r.deserialize(e.entries));
	}
});
function g(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var l = ni({
	tag: "seroval-plugins/web/Headers",
	test(e) {
		return typeof Headers == "undefined" ? !1 : e instanceof Headers;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(g(e)) };
		},
		async async(e, r) {
			return { value: await r.parse(g(e)) };
		},
		stream(e, r) {
			return { value: r.parse(g(e)) };
		}
	},
	serialize(e, r) {
		return "new Headers(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new Headers(r.deserialize(e.value));
	}
});
ni({
	tag: "seroval-plugins/web/ImageData",
	test(e) {
		return typeof ImageData == "undefined" ? !1 : e instanceof ImageData;
	},
	parse: {
		sync(e, r) {
			return {
				data: r.parse(e.data),
				width: r.parse(e.width),
				height: r.parse(e.height),
				options: r.parse({ colorSpace: e.colorSpace })
			};
		},
		async async(e, r) {
			return {
				data: await r.parse(e.data),
				width: await r.parse(e.width),
				height: await r.parse(e.height),
				options: await r.parse({ colorSpace: e.colorSpace })
			};
		},
		stream(e, r) {
			return {
				data: r.parse(e.data),
				width: r.parse(e.width),
				height: r.parse(e.height),
				options: r.parse({ colorSpace: e.colorSpace })
			};
		}
	},
	serialize(e, r) {
		return "new ImageData(" + r.serialize(e.data) + "," + r.serialize(e.width) + "," + r.serialize(e.height) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new ImageData(r.deserialize(e.data), r.deserialize(e.width), r.deserialize(e.height), r.deserialize(e.options));
	}
});
var n = {}, P = (e) => new ReadableStream({ start: (r) => {
	e.on({
		next: (a) => {
			try {
				r.enqueue(a);
			} catch (t) {}
		},
		throw: (a) => {
			r.error(a);
		},
		return: () => {
			try {
				r.close();
			} catch (a) {}
		}
	});
} }), x = ni({
	tag: "seroval-plugins/web/ReadableStreamFactory",
	test(e) {
		return e === n;
	},
	parse: {
		sync() {
			return n;
		},
		async async() {
			return await Promise.resolve(n);
		},
		stream() {
			return n;
		}
	},
	serialize() {
		return P.toString();
	},
	deserialize() {
		return n;
	}
});
function w(e) {
	let r = te$1(), a = e.getReader();
	async function t() {
		try {
			let s = await a.read();
			s.done ? r.return(s.value) : (r.next(s.value), await t());
		} catch (s) {
			r.throw(s);
		}
	}
	return t().catch(() => {}), r;
}
var p = ni({
	tag: "seroval/plugins/web/ReadableStream",
	extends: [x],
	test(e) {
		return typeof ReadableStream == "undefined" ? !1 : e instanceof ReadableStream;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(n),
				stream: r.parse(te$1())
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(n),
				stream: await r.parse(w(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(n),
				stream: r.parse(w(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.stream) + ")";
	},
	deserialize(e, r) {
		return P(r.deserialize(e.stream));
	}
});
function N(e, r) {
	return {
		body: r,
		cache: e.cache,
		credentials: e.credentials,
		headers: e.headers,
		integrity: e.integrity,
		keepalive: e.keepalive,
		method: e.method,
		mode: e.mode,
		redirect: e.redirect,
		referrer: e.referrer,
		referrerPolicy: e.referrerPolicy
	};
}
ni({
	tag: "seroval-plugins/web/Request",
	extends: [p, l],
	test(e) {
		return typeof Request == "undefined" ? !1 : e instanceof Request;
	},
	parse: {
		async async(e, r) {
			return {
				url: await r.parse(e.url),
				options: await r.parse(N(e, e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null))
			};
		},
		stream(e, r) {
			return {
				url: r.parse(e.url),
				options: r.parse(N(e, e.body && !e.bodyUsed ? e.clone().body : null))
			};
		}
	},
	serialize(e, r) {
		return "new Request(" + r.serialize(e.url) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Request(r.deserialize(e.url), r.deserialize(e.options));
	}
});
function h(e) {
	return {
		headers: e.headers,
		status: e.status,
		statusText: e.statusText
	};
}
ni({
	tag: "seroval-plugins/web/Response",
	extends: [p, l],
	test(e) {
		return typeof Response == "undefined" ? !1 : e instanceof Response;
	},
	parse: {
		async async(e, r) {
			return {
				body: await r.parse(e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null),
				options: await r.parse(h(e))
			};
		},
		stream(e, r) {
			return {
				body: r.parse(e.body && !e.bodyUsed ? e.clone().body : null),
				options: r.parse(h(e))
			};
		}
	},
	serialize(e, r) {
		return "new Response(" + r.serialize(e.body) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Response(r.deserialize(e.body), r.deserialize(e.options));
	}
});
ni({
	tag: "seroval-plugins/web/URL",
	test(e) {
		return typeof URL == "undefined" ? !1 : e instanceof URL;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(e.href) };
		},
		async async(e, r) {
			return { value: await r.parse(e.href) };
		},
		stream(e, r) {
			return { value: r.parse(e.href) };
		}
	},
	serialize(e, r) {
		return "new URL(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new URL(r.deserialize(e.value));
	}
});
ni({
	tag: "seroval-plugins/web/URLSearchParams",
	test(e) {
		return typeof URLSearchParams == "undefined" ? !1 : e instanceof URLSearchParams;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(e.toString()) };
		},
		async async(e, r) {
			return { value: await r.parse(e.toString()) };
		},
		stream(e, r) {
			return { value: r.parse(e.toString()) };
		}
	},
	serialize(e, r) {
		return "new URLSearchParams(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new URLSearchParams(r.deserialize(e.value));
	}
});
var ShallowErrorPlugin = /* @__PURE__ */ ni({
	tag: "$TSR/Error",
	test(value) {
		return value instanceof Error;
	},
	parse: {
		sync(value, ctx) {
			return { message: ctx.parse(value.message) };
		},
		async async(value, ctx) {
			return { message: await ctx.parse(value.message) };
		},
		stream(value, ctx) {
			return { message: ctx.parse(value.message) };
		}
	},
	serialize(node, ctx) {
		return "new Error(" + ctx.serialize(node.message) + ")";
	},
	deserialize(node, ctx) {
		return new Error(ctx.deserialize(node.message));
	}
});
var RawStream = class {
	constructor(stream, options) {
		this.stream = stream;
		this.hint = options?.hint ?? "binary";
	}
};
var BufferCtor = globalThis.Buffer;
var hasNodeBuffer = !!BufferCtor && typeof BufferCtor.from === "function";
function uint8ArrayToBase64(bytes) {
	if (bytes.length === 0) return "";
	if (hasNodeBuffer) return BufferCtor.from(bytes).toString("base64");
	const CHUNK_SIZE = 32768;
	const chunks = [];
	for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
		const chunk = bytes.subarray(i, i + CHUNK_SIZE);
		chunks.push(String.fromCharCode.apply(null, chunk));
	}
	return btoa(chunks.join(""));
}
function base64ToUint8Array(base64) {
	if (base64.length === 0) return new Uint8Array(0);
	if (hasNodeBuffer) {
		const buf = BufferCtor.from(base64, "base64");
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
	}
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
var RAW_STREAM_FACTORY_BINARY = /* @__PURE__ */ Object.create(null);
var RAW_STREAM_FACTORY_TEXT = /* @__PURE__ */ Object.create(null);
var RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY = (stream) => new ReadableStream({ start(controller) {
	stream.on({
		next(base64) {
			try {
				controller.enqueue(base64ToUint8Array(base64));
			} catch {}
		},
		throw(error) {
			controller.error(error);
		},
		return() {
			try {
				controller.close();
			} catch {}
		}
	});
} });
var textEncoderForFactory = new TextEncoder();
var RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT = (stream) => {
	return new ReadableStream({ start(controller) {
		stream.on({
			next(value) {
				try {
					if (typeof value === "string") controller.enqueue(textEncoderForFactory.encode(value));
					else controller.enqueue(base64ToUint8Array(value.$b64));
				} catch {}
			},
			throw(error) {
				controller.error(error);
			},
			return() {
				try {
					controller.close();
				} catch {}
			}
		});
	} });
};
var FACTORY_BINARY = `(s=>new ReadableStream({start(c){s.on({next(b){try{const d=atob(b),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}catch(_){}},throw(e){c.error(e)},return(){try{c.close()}catch(_){}}})}}))`;
var FACTORY_TEXT = `(s=>{const e=new TextEncoder();return new ReadableStream({start(c){s.on({next(v){try{if(typeof v==='string'){c.enqueue(e.encode(v))}else{const d=atob(v.$b64),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}}catch(_){}},throw(x){c.error(x)},return(){try{c.close()}catch(_){}}})}})})`;
function toBinaryStream(readable) {
	const stream = te$1();
	const reader = readable.getReader();
	(async () => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					stream.return(void 0);
					break;
				}
				stream.next(uint8ArrayToBase64(value));
			}
		} catch (error) {
			stream.throw(error);
		} finally {
			reader.releaseLock();
		}
	})();
	return stream;
}
function toTextStream(readable) {
	const stream = te$1();
	const reader = readable.getReader();
	const decoder = new TextDecoder("utf-8", { fatal: true });
	(async () => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					try {
						const remaining = decoder.decode();
						if (remaining.length > 0) stream.next(remaining);
					} catch {}
					stream.return(void 0);
					break;
				}
				try {
					const text = decoder.decode(value, { stream: true });
					if (text.length > 0) stream.next(text);
				} catch {
					stream.next({ $b64: uint8ArrayToBase64(value) });
				}
			}
		} catch (error) {
			stream.throw(error);
		} finally {
			reader.releaseLock();
		}
	})();
	return stream;
}
var RawStreamSSRPlugin = ni({
	tag: "tss/RawStream",
	extends: [ni({
		tag: "tss/RawStreamFactory",
		test(value) {
			return value === RAW_STREAM_FACTORY_BINARY;
		},
		parse: {
			sync() {},
			async() {
				return Promise.resolve(void 0);
			},
			stream() {}
		},
		serialize() {
			return FACTORY_BINARY;
		},
		deserialize() {
			return RAW_STREAM_FACTORY_BINARY;
		}
	}), ni({
		tag: "tss/RawStreamFactoryText",
		test(value) {
			return value === RAW_STREAM_FACTORY_TEXT;
		},
		parse: {
			sync() {},
			async() {
				return Promise.resolve(void 0);
			},
			stream() {}
		},
		serialize() {
			return FACTORY_TEXT;
		},
		deserialize() {
			return RAW_STREAM_FACTORY_TEXT;
		}
	})],
	test(value) {
		return value instanceof RawStream;
	},
	parse: {
		sync(value, ctx) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			return {
				hint: value.hint,
				factory: ctx.parse(factory),
				stream: ctx.parse(te$1())
			};
		},
		async async(value, ctx) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
			return {
				hint: value.hint,
				factory: await ctx.parse(factory),
				stream: await ctx.parse(encodedStream)
			};
		},
		stream(value, ctx) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
			return {
				hint: value.hint,
				factory: ctx.parse(factory),
				stream: ctx.parse(encodedStream)
			};
		}
	},
	serialize(node, ctx) {
		return "(" + ctx.serialize(node.factory) + ")(" + ctx.serialize(node.stream) + ")";
	},
	deserialize(node, ctx) {
		const stream = ctx.deserialize(node.stream);
		return node.hint === "text" ? RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT(stream) : RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY(stream);
	}
});
function createRawStreamRPCPlugin(onRawStream) {
	let nextStreamId = 1;
	return ni({
		tag: "tss/RawStream",
		test(value) {
			return value instanceof RawStream;
		},
		parse: {
			async(value) {
				const streamId = nextStreamId++;
				onRawStream(streamId, value.stream);
				return Promise.resolve({ streamId });
			},
			stream(value) {
				const streamId = nextStreamId++;
				onRawStream(streamId, value.stream);
				return { streamId };
			}
		},
		serialize() {
			throw new Error("RawStreamRPCPlugin.serialize should not be called. RPC uses JSON serialization, not JS code generation.");
		},
		deserialize() {
			throw new Error("RawStreamRPCPlugin.deserialize should not be called. Use createRawStreamDeserializePlugin on client.");
		}
	});
}
var defaultSerovalPlugins = [
	ShallowErrorPlugin,
	RawStreamSSRPlugin,
	p
];
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION");
var TSS_SERVER_FUNCTION_FACTORY = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION_FACTORY");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
var TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed";
var FrameType = {
	JSON: 0,
	CHUNK: 1,
	END: 2,
	ERROR: 3
};
var TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`;
var GLOBAL_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:start-storage-context");
var globalObj$1 = globalThis;
if (!globalObj$1[GLOBAL_STORAGE_KEY]) globalObj$1[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage();
var startStorage = globalObj$1[GLOBAL_STORAGE_KEY];
async function runWithStartContext(context, fn) {
	return startStorage.run(context, fn);
}
function getStartContext(opts) {
	const context = startStorage.getStore();
	if (!context && opts?.throwIfNotFound !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return context;
}
var getStartOptions = () => getStartContext().startOptions;
var getStartContextServerOnly = getStartContext;
function isSafeKey(key) {
	return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
function safeObjectMerge(target, source) {
	const result = /* @__PURE__ */ Object.create(null);
	if (target) {
		for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key];
	}
	if (source && typeof source === "object") {
		for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key];
	}
	return result;
}
function createNullProtoObject(source) {
	if (!source) return /* @__PURE__ */ Object.create(null);
	const obj = /* @__PURE__ */ Object.create(null);
	for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key];
	return obj;
}
var createServerFn = (options, __opts) => {
	const resolvedOptions = __opts || options || {};
	if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET";
	const res = {
		options: resolvedOptions,
		middleware: (middleware) => {
			const newMiddleware = [...resolvedOptions.middleware || []];
			middleware.map((m) => {
				if (TSS_SERVER_FUNCTION_FACTORY in m) {
					if (m.options.middleware) newMiddleware.push(...m.options.middleware);
				} else newMiddleware.push(m);
			});
			const res2 = createServerFn(void 0, {
				...resolvedOptions,
				middleware: newMiddleware
			});
			res2[TSS_SERVER_FUNCTION_FACTORY] = true;
			return res2;
		},
		inputValidator: (inputValidator) => {
			return createServerFn(void 0, {
				...resolvedOptions,
				inputValidator
			});
		},
		handler: (...args) => {
			const [extractedFn, serverFn] = args;
			const newOptions = {
				...resolvedOptions,
				extractedFn,
				serverFn
			};
			const resolvedMiddleware = [...newOptions.middleware || [], serverFnBaseToMiddleware(newOptions)];
			return Object.assign(async (opts) => {
				const result = await executeMiddleware$1(resolvedMiddleware, "client", {
					...extractedFn,
					...newOptions,
					data: opts?.data,
					headers: opts?.headers,
					signal: opts?.signal,
					fetch: opts?.fetch,
					context: createNullProtoObject()
				});
				const redirect = parseRedirect(result.error);
				if (redirect) throw redirect;
				if (result.error) throw result.error;
				return result.result;
			}, {
				...extractedFn,
				__executeServer: async (opts) => {
					const startContext = getStartContextServerOnly();
					const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares;
					return await executeMiddleware$1(resolvedMiddleware, "server", {
						...extractedFn,
						...opts,
						serverFnMeta: extractedFn.serverFnMeta,
						context: safeObjectMerge(serverContextAfterGlobalMiddlewares, opts.context),
						request: startContext.request
					}).then((d) => ({
						result: d.result,
						error: d.error,
						context: d.sendContext
					}));
				}
			});
		}
	};
	const fun = (options2) => {
		return createServerFn(void 0, {
			...resolvedOptions,
			...options2
		});
	};
	return Object.assign(fun, res);
};
async function executeMiddleware$1(middlewares, env, opts) {
	let flattenedMiddlewares = flattenMiddlewares([...getStartOptions()?.functionMiddleware || [], ...middlewares]);
	if (env === "server") {
		const startContext = getStartContextServerOnly({ throwIfNotFound: false });
		if (startContext?.executedRequestMiddlewares) flattenedMiddlewares = flattenedMiddlewares.filter((m) => !startContext.executedRequestMiddlewares.has(m));
	}
	const callNextMiddleware = async (ctx) => {
		const nextMiddleware = flattenedMiddlewares.shift();
		if (!nextMiddleware) return ctx;
		try {
			if ("inputValidator" in nextMiddleware.options && nextMiddleware.options.inputValidator && env === "server") ctx.data = await execValidator(nextMiddleware.options.inputValidator, ctx.data);
			let middlewareFn = void 0;
			if (env === "client") {
				if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client;
			} else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server;
			if (middlewareFn) {
				const userNext = async (userCtx = {}) => {
					const result2 = await callNextMiddleware({
						...ctx,
						...userCtx,
						context: safeObjectMerge(ctx.context, userCtx.context),
						sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
						headers: mergeHeaders(ctx.headers, userCtx.headers),
						_callSiteFetch: ctx._callSiteFetch,
						fetch: ctx._callSiteFetch ?? userCtx.fetch ?? ctx.fetch,
						result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
						error: userCtx.error ?? ctx.error
					});
					if (result2.error) throw result2.error;
					return result2;
				};
				const result = await middlewareFn({
					...ctx,
					next: userNext
				});
				if (isRedirect(result)) return {
					...ctx,
					error: result
				};
				if (result instanceof Response) return {
					...ctx,
					result
				};
				if (!result) throw new Error("User middleware returned undefined. You must call next() or return a result in your middlewares.");
				return result;
			}
			return callNextMiddleware(ctx);
		} catch (error) {
			return {
				...ctx,
				error
			};
		}
	};
	return callNextMiddleware({
		...opts,
		headers: opts.headers || {},
		sendContext: opts.sendContext || {},
		context: opts.context || createNullProtoObject(),
		_callSiteFetch: opts.fetch
	});
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
	const seen = /* @__PURE__ */ new Set();
	const flattened = [];
	const recurse = (middleware, depth) => {
		if (depth > maxDepth) throw new Error(`Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`);
		middleware.forEach((m) => {
			if (m.options.middleware) recurse(m.options.middleware, depth + 1);
			if (!seen.has(m)) {
				seen.add(m);
				flattened.push(m);
			}
		});
	};
	recurse(middlewares, 0);
	return flattened;
}
async function execValidator(validator, input) {
	if (validator == null) return {};
	if ("~standard" in validator) {
		const result = await validator["~standard"].validate(input);
		if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
		return result.value;
	}
	if ("parse" in validator) return validator.parse(input);
	if (typeof validator === "function") return validator(input);
	throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
	return {
		"~types": void 0,
		options: {
			inputValidator: options.inputValidator,
			client: async ({ next, sendContext, fetch, ...ctx }) => {
				const payload = {
					...ctx,
					context: sendContext,
					fetch
				};
				return next(await options.extractedFn?.(payload));
			},
			server: async ({ next, ...ctx }) => {
				const result = await options.serverFn?.(ctx);
				return next({
					...ctx,
					result
				});
			}
		}
	};
}
function getDefaultSerovalPlugins() {
	return [...(getStartOptions()?.serializationAdapters)?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
var minifiedTsrBootStrapScript = "self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]};\n";
var SCOPE_ID = "tsr";
var TSR_PREFIX = GLOBAL_TSR + ".router=";
var P_PREFIX = GLOBAL_TSR + ".p(()=>";
var P_SUFFIX = ")";
function dehydrateMatch(match) {
	const dehydratedMatch = {
		i: match.id,
		u: match.updatedAt,
		s: match.status
	};
	for (const [key, shorthand] of [
		["__beforeLoadContext", "b"],
		["loaderData", "l"],
		["error", "e"],
		["ssr", "ssr"]
	]) if (match[key] !== void 0) dehydratedMatch[shorthand] = match[key];
	return dehydratedMatch;
}
var INITIAL_SCRIPTS = [mn(SCOPE_ID), minifiedTsrBootStrapScript];
var ScriptBuffer = class {
	constructor(router) {
		this._scriptBarrierLifted = false;
		this._cleanedUp = false;
		this._pendingMicrotask = false;
		this.router = router;
		this._queue = INITIAL_SCRIPTS.slice();
	}
	enqueue(script) {
		if (this._cleanedUp) return;
		this._queue.push(script);
		if (this._scriptBarrierLifted && !this._pendingMicrotask) {
			this._pendingMicrotask = true;
			queueMicrotask(() => {
				this._pendingMicrotask = false;
				this.injectBufferedScripts();
			});
		}
	}
	liftBarrier() {
		if (this._scriptBarrierLifted || this._cleanedUp) return;
		this._scriptBarrierLifted = true;
		if (this._queue.length > 0 && !this._pendingMicrotask) {
			this._pendingMicrotask = true;
			queueMicrotask(() => {
				this._pendingMicrotask = false;
				this.injectBufferedScripts();
			});
		}
	}
	/**
	* Flushes any pending scripts synchronously.
	* Call this before emitting onSerializationFinished to ensure all scripts are injected.
	*
	* IMPORTANT: Only injects if the barrier has been lifted. Before the barrier is lifted,
	* scripts should remain in the queue so takeBufferedScripts() can retrieve them
	*/
	flush() {
		if (!this._scriptBarrierLifted) return;
		if (this._cleanedUp) return;
		this._pendingMicrotask = false;
		const scriptsToInject = this.takeAll();
		if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
	}
	takeAll() {
		const bufferedScripts = this._queue;
		this._queue = [];
		if (bufferedScripts.length === 0) return;
		if (bufferedScripts.length === 1) return bufferedScripts[0] + ";document.currentScript.remove()";
		return bufferedScripts.join(";") + ";document.currentScript.remove()";
	}
	injectBufferedScripts() {
		if (this._cleanedUp) return;
		if (this._queue.length === 0) return;
		const scriptsToInject = this.takeAll();
		if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
	}
	cleanup() {
		this._cleanedUp = true;
		this._queue = [];
		this.router = void 0;
	}
};
var MANIFEST_CACHE_SIZE = 100;
var manifestCaches = /* @__PURE__ */ new WeakMap();
function getManifestCache(manifest) {
	const cache = manifestCaches.get(manifest);
	if (cache) return cache;
	const newCache = createLRUCache(MANIFEST_CACHE_SIZE);
	manifestCaches.set(manifest, newCache);
	return newCache;
}
function attachRouterServerSsrUtils({ router, manifest }) {
	router.ssr = { manifest };
	let _dehydrated = false;
	let _serializationFinished = false;
	const renderFinishedListeners = [];
	const serializationFinishedListeners = [];
	const scriptBuffer = new ScriptBuffer(router);
	let injectedHtmlBuffer = "";
	router.serverSsr = {
		injectHtml: (html) => {
			if (!html) return;
			injectedHtmlBuffer += html;
			router.emit({ type: "onInjectedHtml" });
		},
		injectScript: (script) => {
			if (!script) return;
			const html = `<script${router.options.ssr?.nonce ? ` nonce='${router.options.ssr.nonce}'` : ""}>${script}<\/script>`;
			router.serverSsr.injectHtml(html);
		},
		dehydrate: async () => {
			invariant(!_dehydrated, "router is already dehydrated!");
			let matchesToDehydrate = router.state.matches;
			if (router.isShell()) matchesToDehydrate = matchesToDehydrate.slice(0, 1);
			const matches = matchesToDehydrate.map(dehydrateMatch);
			let manifestToDehydrate = void 0;
			if (manifest) {
				const currentRouteIdsList = matchesToDehydrate.map((m) => m.routeId);
				const manifestCacheKey = currentRouteIdsList.join("\0");
				let filteredRoutes;
				filteredRoutes = getManifestCache(manifest).get(manifestCacheKey);
				if (!filteredRoutes) {
					const currentRouteIds = new Set(currentRouteIdsList);
					const nextFilteredRoutes = {};
					for (const routeId in manifest.routes) {
						const routeManifest = manifest.routes[routeId];
						if (currentRouteIds.has(routeId)) nextFilteredRoutes[routeId] = routeManifest;
						else if (routeManifest.assets && routeManifest.assets.length > 0) nextFilteredRoutes[routeId] = { assets: routeManifest.assets };
					}
					getManifestCache(manifest).set(manifestCacheKey, nextFilteredRoutes);
					filteredRoutes = nextFilteredRoutes;
				}
				manifestToDehydrate = { routes: filteredRoutes };
			}
			const dehydratedRouter = {
				manifest: manifestToDehydrate,
				matches
			};
			const lastMatchId = matchesToDehydrate[matchesToDehydrate.length - 1]?.id;
			if (lastMatchId) dehydratedRouter.lastMatchId = lastMatchId;
			const dehydratedData = await router.options.dehydrate?.();
			if (dehydratedData) dehydratedRouter.dehydratedData = dehydratedData;
			_dehydrated = true;
			const trackPlugins = { didRun: false };
			const serializationAdapters = router.options.serializationAdapters;
			const plugins = serializationAdapters ? serializationAdapters.map((t) => makeSsrSerovalPlugin(t, trackPlugins)).concat(defaultSerovalPlugins) : defaultSerovalPlugins;
			const signalSerializationComplete = () => {
				_serializationFinished = true;
				try {
					serializationFinishedListeners.forEach((l) => l());
					router.emit({ type: "onSerializationFinished" });
				} catch (err) {
					console.error("Serialization listener error:", err);
				} finally {
					serializationFinishedListeners.length = 0;
					renderFinishedListeners.length = 0;
				}
			};
			cn(dehydratedRouter, {
				refs: /* @__PURE__ */ new Map(),
				plugins,
				onSerialize: (data, initial) => {
					let serialized = initial ? TSR_PREFIX + data : data;
					if (trackPlugins.didRun) serialized = P_PREFIX + serialized + P_SUFFIX;
					scriptBuffer.enqueue(serialized);
				},
				scopeId: SCOPE_ID,
				onDone: () => {
					scriptBuffer.enqueue(GLOBAL_TSR + ".e()");
					scriptBuffer.flush();
					signalSerializationComplete();
				},
				onError: (err) => {
					console.error("Serialization error:", err);
					signalSerializationComplete();
				}
			});
		},
		isDehydrated() {
			return _dehydrated;
		},
		isSerializationFinished() {
			return _serializationFinished;
		},
		onRenderFinished: (listener) => renderFinishedListeners.push(listener),
		onSerializationFinished: (listener) => serializationFinishedListeners.push(listener),
		setRenderFinished: () => {
			try {
				renderFinishedListeners.forEach((l) => l());
			} catch (err) {
				console.error("Error in render finished listener:", err);
			} finally {
				renderFinishedListeners.length = 0;
			}
			scriptBuffer.liftBarrier();
		},
		takeBufferedScripts() {
			const scripts = scriptBuffer.takeAll();
			return {
				tag: "script",
				attrs: {
					nonce: router.options.ssr?.nonce,
					className: "$tsr",
					id: TSR_SCRIPT_BARRIER_ID
				},
				children: scripts
			};
		},
		liftScriptBarrier() {
			scriptBuffer.liftBarrier();
		},
		takeBufferedHtml() {
			if (!injectedHtmlBuffer) return;
			const buffered = injectedHtmlBuffer;
			injectedHtmlBuffer = "";
			return buffered;
		},
		cleanup() {
			if (!router.serverSsr) return;
			renderFinishedListeners.length = 0;
			serializationFinishedListeners.length = 0;
			injectedHtmlBuffer = "";
			scriptBuffer.cleanup();
			router.serverSsr = void 0;
		}
	};
}
function getOrigin$1(request) {
	try {
		return new URL(request.url).origin;
	} catch {}
	return "http://localhost";
}
function getNormalizedURL(url, base) {
	if (typeof url === "string") url = url.replace("\\", "%5C");
	const rawUrl = new URL(url, base);
	const { path: decodedPathname, handledProtocolRelativeURL } = decodePath(rawUrl.pathname);
	const searchParams = new URLSearchParams(rawUrl.search);
	const normalizedHref = decodedPathname + (searchParams.size > 0 ? "?" : "") + searchParams.toString() + rawUrl.hash;
	return {
		url: new URL(normalizedHref, rawUrl.origin),
		handledProtocolRelativeURL
	};
}
var NullProtoObj = /* @__PURE__ */ (() => {
	const e = function() {};
	return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
/**
* Create a new router context.
*/
function createRouter$2() {
	return {
		root: { key: "" },
		static: new NullProtoObj()
	};
}
function splitPath(path) {
	const [_, ...s] = path.split("/");
	return s[s.length - 1] === "" ? s.slice(0, -1) : s;
}
function getMatchParams(segments, paramsMap) {
	const params = new NullProtoObj();
	for (const [index, name] of paramsMap) {
		const segment = index < 0 ? segments.slice(-(index + 1)).join("/") : segments[index];
		if (typeof name === "string") params[name] = segment;
		else {
			const match = segment.match(name);
			if (match) for (const key in match.groups) params[key] = match.groups[key];
		}
	}
	return params;
}
/**
* Add a route to the router context.
*/
function addRoute(ctx, method = "", path, data) {
	method = method.toUpperCase();
	if (path.charCodeAt(0) !== 47) path = `/${path}`;
	path = path.replace(/\\:/g, "%3A");
	const segments = splitPath(path);
	let node = ctx.root;
	let _unnamedParamIndex = 0;
	const paramsMap = [];
	const paramsRegexp = [];
	for (let i = 0; i < segments.length; i++) {
		let segment = segments[i];
		if (segment.startsWith("**")) {
			if (!node.wildcard) node.wildcard = { key: "**" };
			node = node.wildcard;
			paramsMap.push([
				-(i + 1),
				segment.split(":")[1] || "_",
				segment.length === 2
			]);
			break;
		}
		if (segment === "*" || segment.includes(":")) {
			if (!node.param) node.param = { key: "*" };
			node = node.param;
			if (segment === "*") paramsMap.push([
				i,
				`_${_unnamedParamIndex++}`,
				true
			]);
			else if (segment.includes(":", 1)) {
				const regexp = getParamRegexp(segment);
				paramsRegexp[i] = regexp;
				node.hasRegexParam = true;
				paramsMap.push([
					i,
					regexp,
					false
				]);
			} else paramsMap.push([
				i,
				segment.slice(1),
				false
			]);
			continue;
		}
		if (segment === "\\*") segment = segments[i] = "*";
		else if (segment === "\\*\\*") segment = segments[i] = "**";
		const child = node.static?.[segment];
		if (child) node = child;
		else {
			const staticNode = { key: segment };
			if (!node.static) node.static = new NullProtoObj();
			node.static[segment] = staticNode;
			node = staticNode;
		}
	}
	const hasParams = paramsMap.length > 0;
	if (!node.methods) node.methods = new NullProtoObj();
	node.methods[method] ??= [];
	node.methods[method].push({
		data: data || null,
		paramsRegexp,
		paramsMap: hasParams ? paramsMap : void 0
	});
	if (!hasParams) ctx.static["/" + segments.join("/")] = node;
}
function getParamRegexp(segment) {
	const regex = segment.replace(/:(\w+)/g, (_, id) => `(?<${id}>[^/]+)`).replace(/\./g, "\\.");
	return /* @__PURE__ */ new RegExp(`^${regex}$`);
}
/**
* Find a route by path.
*/
function findRoute(ctx, method = "", path, opts) {
	if (path.charCodeAt(path.length - 1) === 47) path = path.slice(0, -1);
	const staticNode = ctx.static[path];
	if (staticNode && staticNode.methods) {
		const staticMatch = staticNode.methods[method] || staticNode.methods[""];
		if (staticMatch !== void 0) return staticMatch[0];
	}
	const segments = splitPath(path);
	const match = _lookupTree(ctx, ctx.root, method, segments, 0)?.[0];
	if (match === void 0) return;
	if (opts?.params === false) return match;
	return {
		data: match.data,
		params: match.paramsMap ? getMatchParams(segments, match.paramsMap) : void 0
	};
}
function _lookupTree(ctx, node, method, segments, index) {
	if (index === segments.length) {
		if (node.methods) {
			const match = node.methods[method] || node.methods[""];
			if (match) return match;
		}
		if (node.param && node.param.methods) {
			const match = node.param.methods[method] || node.param.methods[""];
			if (match) {
				const pMap = match[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) return match;
			}
		}
		if (node.wildcard && node.wildcard.methods) {
			const match = node.wildcard.methods[method] || node.wildcard.methods[""];
			if (match) {
				const pMap = match[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) return match;
			}
		}
		return;
	}
	const segment = segments[index];
	if (node.static) {
		const staticChild = node.static[segment];
		if (staticChild) {
			const match = _lookupTree(ctx, staticChild, method, segments, index + 1);
			if (match) return match;
		}
	}
	if (node.param) {
		const match = _lookupTree(ctx, node.param, method, segments, index + 1);
		if (match) {
			if (node.param.hasRegexParam) {
				const exactMatch = match.find((m) => m.paramsRegexp[index]?.test(segment)) || match.find((m) => !m.paramsRegexp[index]);
				return exactMatch ? [exactMatch] : void 0;
			}
			return match;
		}
	}
	if (node.wildcard && node.wildcard.methods) return node.wildcard.methods[method] || node.wildcard.methods[""];
}
/**
* Find all route patterns that match the given path.
*/
function findAllRoutes(ctx, method = "", path, opts) {
	if (path.charCodeAt(path.length - 1) === 47) path = path.slice(0, -1);
	const segments = splitPath(path);
	const matches = _findAll(ctx, ctx.root, method, segments, 0);
	if (opts?.params === false) return matches;
	return matches.map((m) => {
		return {
			data: m.data,
			params: m.paramsMap ? getMatchParams(segments, m.paramsMap) : void 0
		};
	});
}
function _findAll(ctx, node, method, segments, index, matches = []) {
	const segment = segments[index];
	if (node.wildcard && node.wildcard.methods) {
		const match = node.wildcard.methods[method] || node.wildcard.methods[""];
		if (match) matches.push(...match);
	}
	if (node.param) {
		_findAll(ctx, node.param, method, segments, index + 1, matches);
		if (index === segments.length && node.param.methods) {
			const match = node.param.methods[method] || node.param.methods[""];
			if (match) {
				const pMap = match[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) matches.push(...match);
			}
		}
	}
	const staticChild = node.static?.[segment];
	if (staticChild) _findAll(ctx, staticChild, method, segments, index + 1, matches);
	if (index === segments.length && node.methods) {
		const match = node.methods[method] || node.methods[""];
		if (match) matches.push(...match);
	}
	return matches;
}
function lazyInherit(target, source, sourceKey) {
	for (const key of [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]) {
		if (key === "constructor") continue;
		const targetDesc = Object.getOwnPropertyDescriptor(target, key);
		const desc = Object.getOwnPropertyDescriptor(source, key);
		let modified = false;
		if (desc.get) {
			modified = true;
			desc.get = targetDesc?.get || function() {
				return this[sourceKey][key];
			};
		}
		if (desc.set) {
			modified = true;
			desc.set = targetDesc?.set || function(value) {
				this[sourceKey][key] = value;
			};
		}
		if (!targetDesc?.value && typeof desc.value === "function") {
			modified = true;
			desc.value = function(...args) {
				return this[sourceKey][key](...args);
			};
		}
		if (modified) Object.defineProperty(target, key, desc);
	}
}
var FastURL = /* @__PURE__ */ (() => {
	const NativeURL = globalThis.URL;
	const FastURL = class URL {
		#url;
		#href;
		#protocol;
		#host;
		#pathname;
		#search;
		#searchParams;
		#pos;
		constructor(url) {
			if (typeof url === "string") this.#href = url;
			else {
				this.#protocol = url.protocol;
				this.#host = url.host;
				this.#pathname = url.pathname;
				this.#search = url.search;
			}
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeURL;
		}
		get _url() {
			if (this.#url) return this.#url;
			this.#url = new NativeURL(this.href);
			this.#href = void 0;
			this.#protocol = void 0;
			this.#host = void 0;
			this.#pathname = void 0;
			this.#search = void 0;
			this.#searchParams = void 0;
			this.#pos = void 0;
			return this.#url;
		}
		get href() {
			if (this.#url) return this.#url.href;
			if (!this.#href) this.#href = `${this.#protocol || "http:"}//${this.#host || "localhost"}${this.#pathname || "/"}${this.#search || ""}`;
			return this.#href;
		}
		#getPos() {
			if (!this.#pos) {
				const url = this.href;
				const protoIndex = url.indexOf("://");
				const pathnameIndex = protoIndex === -1 ? -1 : url.indexOf("/", protoIndex + 4);
				this.#pos = [
					protoIndex,
					pathnameIndex,
					pathnameIndex === -1 ? -1 : url.indexOf("?", pathnameIndex)
				];
			}
			return this.#pos;
		}
		get pathname() {
			if (this.#url) return this.#url.pathname;
			if (this.#pathname === void 0) {
				const [, pathnameIndex, queryIndex] = this.#getPos();
				if (pathnameIndex === -1) return this._url.pathname;
				this.#pathname = this.href.slice(pathnameIndex, queryIndex === -1 ? void 0 : queryIndex);
			}
			return this.#pathname;
		}
		get search() {
			if (this.#url) return this.#url.search;
			if (this.#search === void 0) {
				const [, pathnameIndex, queryIndex] = this.#getPos();
				if (pathnameIndex === -1) return this._url.search;
				const url = this.href;
				this.#search = queryIndex === -1 || queryIndex === url.length - 1 ? "" : url.slice(queryIndex);
			}
			return this.#search;
		}
		get searchParams() {
			if (this.#url) return this.#url.searchParams;
			if (!this.#searchParams) this.#searchParams = new URLSearchParams(this.search);
			return this.#searchParams;
		}
		get protocol() {
			if (this.#url) return this.#url.protocol;
			if (this.#protocol === void 0) {
				const [protocolIndex] = this.#getPos();
				if (protocolIndex === -1) return this._url.protocol;
				this.#protocol = this.href.slice(0, protocolIndex + 1);
			}
			return this.#protocol;
		}
		toString() {
			return this.href;
		}
		toJSON() {
			return this.href;
		}
	};
	lazyInherit(FastURL.prototype, NativeURL.prototype, "_url");
	Object.setPrototypeOf(FastURL.prototype, NativeURL.prototype);
	Object.setPrototypeOf(FastURL, NativeURL);
	return FastURL;
})();
var NodeResponse = /* @__PURE__ */ (() => {
	const NativeResponse = globalThis.Response;
	const STATUS_CODES = globalThis.process?.getBuiltinModule?.("node:http")?.STATUS_CODES || {};
	class NodeResponse {
		#body;
		#init;
		#headers;
		#response;
		constructor(body, init) {
			this.#body = body;
			this.#init = init;
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeResponse;
		}
		get status() {
			return this.#response?.status || this.#init?.status || 200;
		}
		get statusText() {
			return this.#response?.statusText || this.#init?.statusText || STATUS_CODES[this.status] || "";
		}
		get headers() {
			if (this.#response) return this.#response.headers;
			if (this.#headers) return this.#headers;
			const initHeaders = this.#init?.headers;
			return this.#headers = initHeaders instanceof Headers ? initHeaders : new Headers(initHeaders);
		}
		get ok() {
			if (this.#response) return this.#response.ok;
			const status = this.status;
			return status >= 200 && status < 300;
		}
		get _response() {
			if (this.#response) return this.#response;
			let body = this.#body;
			if (body && typeof body.pipe === "function" && !(body instanceof Readable)) {
				const stream = new PassThrough();
				body.pipe(stream);
				const abort = body.abort;
				if (abort) stream.once("close", () => abort());
				body = stream;
			}
			this.#response = new NativeResponse(body, this.#headers ? {
				...this.#init,
				headers: this.#headers
			} : this.#init);
			this.#init = void 0;
			this.#headers = void 0;
			this.#body = void 0;
			return this.#response;
		}
		_toNodeResponse() {
			const status = this.status;
			const statusText = this.statusText;
			let body;
			let contentType;
			let contentLength;
			if (this.#response) body = this.#response.body;
			else if (this.#body) if (this.#body instanceof ReadableStream) body = this.#body;
			else if (typeof this.#body === "string") {
				body = this.#body;
				contentType = "text/plain; charset=UTF-8";
				contentLength = Buffer.byteLength(this.#body);
			} else if (this.#body instanceof ArrayBuffer) {
				body = Buffer.from(this.#body);
				contentLength = this.#body.byteLength;
			} else if (this.#body instanceof Uint8Array) {
				body = this.#body;
				contentLength = this.#body.byteLength;
			} else if (this.#body instanceof DataView) {
				body = Buffer.from(this.#body.buffer);
				contentLength = this.#body.byteLength;
			} else if (this.#body instanceof Blob) {
				body = this.#body.stream();
				contentType = this.#body.type;
				contentLength = this.#body.size;
			} else if (typeof this.#body.pipe === "function") body = this.#body;
			else body = this._response.body;
			const headers = [];
			const initHeaders = this.#init?.headers;
			const headerEntries = this.#response?.headers || this.#headers || (initHeaders ? Array.isArray(initHeaders) ? initHeaders : initHeaders?.entries ? initHeaders.entries() : Object.entries(initHeaders).map(([k, v]) => [k.toLowerCase(), v]) : void 0);
			let hasContentTypeHeader;
			let hasContentLength;
			if (headerEntries) for (const [key, value] of headerEntries) {
				if (Array.isArray(value)) for (const v of value) headers.push([key, v]);
				else headers.push([key, value]);
				if (key === "content-type") hasContentTypeHeader = true;
				else if (key === "content-length") hasContentLength = true;
			}
			if (contentType && !hasContentTypeHeader) headers.push(["content-type", contentType]);
			if (contentLength && !hasContentLength) headers.push(["content-length", String(contentLength)]);
			this.#init = void 0;
			this.#headers = void 0;
			this.#response = void 0;
			this.#body = void 0;
			return {
				status,
				statusText,
				headers,
				body
			};
		}
	}
	lazyInherit(NodeResponse.prototype, NativeResponse.prototype, "_response");
	Object.setPrototypeOf(NodeResponse, NativeResponse);
	Object.setPrototypeOf(NodeResponse.prototype, NativeResponse.prototype);
	return NodeResponse;
})();
var kEventNS = "h3.internal.event.";
var kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
var kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
var H3Event = class {
	app;
	req;
	url;
	context;
	static __is_event__ = true;
	constructor(req, context, app) {
		this.context = context || req.context || new NullProtoObj();
		this.req = req;
		this.app = app;
		const _url = req._url;
		this.url = _url && _url instanceof URL ? _url : new FastURL(req.url);
	}
	get res() {
		return this[kEventRes] ||= new H3EventResponse();
	}
	get runtime() {
		return this.req.runtime;
	}
	waitUntil(promise) {
		this.req.waitUntil?.(promise);
	}
	toString() {
		return `[${this.req.method}] ${this.req.url}`;
	}
	toJSON() {
		return this.toString();
	}
	get node() {
		return this.req.runtime?.node;
	}
	get headers() {
		return this.req.headers;
	}
	get path() {
		return this.url.pathname + this.url.search;
	}
	get method() {
		return this.req.method;
	}
};
var H3EventResponse = class {
	status;
	statusText;
	get headers() {
		return this[kEventResHeaders] ||= new Headers();
	}
};
var DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = +statusCode;
	if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
	return statusCode;
}
var HTTPError = class HTTPError extends Error {
	get name() {
		return "HTTPError";
	}
	status;
	statusText;
	headers;
	cause;
	data;
	body;
	unhandled;
	static isError(input) {
		return input instanceof Error && input?.name === "HTTPError";
	}
	static status(status, statusText, details) {
		return new HTTPError({
			...details,
			statusText,
			status
		});
	}
	constructor(arg1, arg2) {
		let messageInput;
		let details;
		if (typeof arg1 === "string") {
			messageInput = arg1;
			details = arg2;
		} else details = arg1;
		const status = sanitizeStatusCode(details?.status || (details?.cause)?.status || details?.status || details?.statusCode, 500);
		const statusText = sanitizeStatusMessage(details?.statusText || (details?.cause)?.statusText || details?.statusText || details?.statusMessage);
		const message = messageInput || details?.message || (details?.cause)?.message || details?.statusText || details?.statusMessage || [
			"HTTPError",
			status,
			statusText
		].filter(Boolean).join(" ");
		super(message, { cause: details });
		this.cause = details;
		this.status = status;
		this.statusText = statusText || void 0;
		const rawHeaders = details?.headers || (details?.cause)?.headers;
		this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
		this.unhandled = details?.unhandled ?? (details?.cause)?.unhandled ?? void 0;
		this.data = details?.data;
		this.body = details?.body;
	}
	get statusCode() {
		return this.status;
	}
	get statusMessage() {
		return this.statusText;
	}
	toJSON() {
		const unhandled = this.unhandled;
		return {
			status: this.status,
			statusText: this.statusText,
			unhandled,
			message: unhandled ? "HTTPError" : this.message,
			data: unhandled ? void 0 : this.data,
			...unhandled ? void 0 : this.body
		};
	}
};
function isJSONSerializable$2(value, _type) {
	if (value === null || value === void 0) return true;
	if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
	if (typeof value.toJSON === "function") return true;
	if (Array.isArray(value)) return true;
	if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
	if (value instanceof NullProtoObj) return true;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
var kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
var kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse$1(val, event, config = {}) {
	if (typeof val?.then === "function") return (val.catch?.((error) => error) || Promise.resolve(val)).then((resolvedVal) => toResponse$1(resolvedVal, event, config));
	const response = prepareResponse(val, event, config);
	if (typeof response?.then === "function") return toResponse$1(response, event, config);
	const { onResponse } = config;
	return onResponse ? Promise.resolve(onResponse(response, event)).then(() => response) : response;
}
var HTTPResponse = class {
	#headers;
	#init;
	body;
	constructor(body, init) {
		this.body = body;
		this.#init = init;
	}
	get status() {
		return this.#init?.status || 200;
	}
	get statusText() {
		return this.#init?.statusText || "OK";
	}
	get headers() {
		return this.#headers ||= new Headers(this.#init?.headers);
	}
};
function prepareResponse(val, event, config, nested) {
	if (val === kHandled) return new NodeResponse(null);
	if (val === kNotFound) val = new HTTPError({
		status: 404,
		message: `Cannot find any route matching [${event.req.method}] ${event.url}`
	});
	if (val && val instanceof Error) {
		const isHTTPError = HTTPError.isError(val);
		const error = isHTTPError ? val : new HTTPError(val);
		if (!isHTTPError) {
			error.unhandled = true;
			if (val?.stack) error.stack = val.stack;
		}
		if (error.unhandled && !config.silent) console.error(error);
		const { onError } = config;
		return onError && !nested ? Promise.resolve(onError(error, event)).catch((error) => error).then((newVal) => prepareResponse(newVal ?? val, event, config, true)) : errorResponse(error, config.debug);
	}
	const preparedRes = event[kEventRes];
	const preparedHeaders = preparedRes?.[kEventResHeaders];
	event[kEventRes] = void 0;
	if (!(val instanceof Response)) {
		const res = prepareResponseBody(val, event, config);
		const status = res.status || preparedRes?.status;
		return new NodeResponse(nullBody(event.req.method, status) ? null : res.body, {
			status,
			statusText: res.statusText || preparedRes?.statusText,
			headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
		});
	}
	if (!preparedHeaders || nested || !val.ok) return val;
	try {
		mergeHeaders$1(val.headers, preparedHeaders, val.headers);
		return val;
	} catch {
		return new NodeResponse(nullBody(event.req.method, val.status) ? null : val.body, {
			status: val.status,
			statusText: val.statusText,
			headers: mergeHeaders$1(val.headers, preparedHeaders)
		});
	}
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
	for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
	else target.set(name, value);
	return target;
}
var frozen = (name) => (...args) => {
	throw new Error(`Headers are frozen (${name} ${args.join(", ")})`);
};
var FrozenHeaders = class extends Headers {
	set = frozen("set");
	append = frozen("append");
	delete = frozen("delete");
};
var emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
var jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
	if (val === null || val === void 0) return {
		body: "",
		headers: emptyHeaders
	};
	const valType = typeof val;
	if (valType === "string") return { body: val };
	if (val instanceof Uint8Array) {
		event.res.headers.set("content-length", val.byteLength.toString());
		return { body: val };
	}
	if (val instanceof HTTPResponse || val?.constructor?.name === "HTTPResponse") return val;
	if (isJSONSerializable$2(val, valType)) return {
		body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
		headers: jsonHeaders
	};
	if (valType === "bigint") return {
		body: val.toString(),
		headers: jsonHeaders
	};
	if (val instanceof Blob) {
		const headers = new Headers({
			"content-type": val.type,
			"content-length": val.size.toString()
		});
		let filename = val.name;
		if (filename) {
			filename = encodeURIComponent(filename);
			headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
		}
		return {
			body: val.stream(),
			headers
		};
	}
	if (valType === "symbol") return { body: val.toString() };
	if (valType === "function") return { body: `${val.name}()` };
	return { body: val };
}
function nullBody(method, status) {
	return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug) {
	return new NodeResponse(JSON.stringify({
		...error.toJSON(),
		stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
	}, void 0, debug ? 2 : void 0), {
		status: error.status,
		statusText: error.statusText,
		headers: error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders)
	});
}
function parse$1(str, options) {
	if (typeof str !== "string") throw new TypeError("argument str must be a string");
	const obj = {};
	const opt = options || {};
	const dec = opt.decode || decode$1;
	let index = 0;
	while (index < str.length) {
		const eqIdx = str.indexOf("=", index);
		if (eqIdx === -1) break;
		let endIdx = str.indexOf(";", index);
		if (endIdx === -1) endIdx = str.length;
		else if (endIdx < eqIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = str.slice(index, eqIdx).trim();
		if (opt?.filter && !opt?.filter(key)) {
			index = endIdx + 1;
			continue;
		}
		if (void 0 === obj[key]) {
			let val = str.slice(eqIdx + 1, endIdx).trim();
			if (val.codePointAt(0) === 34) val = val.slice(1, -1);
			obj[key] = tryDecode$1(val, dec);
		}
		index = endIdx + 1;
	}
	return obj;
}
function decode$1(str) {
	return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode$1(str, decode2) {
	try {
		return decode2(str);
	} catch {
		return str;
	}
}
var fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
	const opt = options || {};
	const enc = opt.encode || encodeURIComponent;
	if (typeof enc !== "function") throw new TypeError("option encode is invalid");
	if (!fieldContentRegExp.test(name)) throw new TypeError("argument name is invalid");
	const encodedValue = enc(value);
	if (encodedValue && !fieldContentRegExp.test(encodedValue)) throw new TypeError("argument val is invalid");
	let str = name + "=" + encodedValue;
	if (void 0 !== opt.maxAge && opt.maxAge !== null) {
		const maxAge = opt.maxAge - 0;
		if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) throw new TypeError("option maxAge is invalid");
		str += "; Max-Age=" + Math.floor(maxAge);
	}
	if (opt.domain) {
		if (!fieldContentRegExp.test(opt.domain)) throw new TypeError("option domain is invalid");
		str += "; Domain=" + opt.domain;
	}
	if (opt.path) {
		if (!fieldContentRegExp.test(opt.path)) throw new TypeError("option path is invalid");
		str += "; Path=" + opt.path;
	}
	if (opt.expires) {
		if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) throw new TypeError("option expires is invalid");
		str += "; Expires=" + opt.expires.toUTCString();
	}
	if (opt.httpOnly) str += "; HttpOnly";
	if (opt.secure) str += "; Secure";
	if (opt.priority) switch (typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority) {
		case "low":
			str += "; Priority=Low";
			break;
		case "medium":
			str += "; Priority=Medium";
			break;
		case "high":
			str += "; Priority=High";
			break;
		default: throw new TypeError("option priority is invalid");
	}
	if (opt.sameSite) switch (typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite) {
		case true:
			str += "; SameSite=Strict";
			break;
		case "lax":
			str += "; SameSite=Lax";
			break;
		case "strict":
			str += "; SameSite=Strict";
			break;
		case "none":
			str += "; SameSite=None";
			break;
		default: throw new TypeError("option sameSite is invalid");
	}
	if (opt.partitioned) str += "; Partitioned";
	return str;
}
function isDate(val) {
	return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}
function parseSetCookie(setCookieValue, options) {
	const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
	const parsed = _parseNameValuePair(parts.shift() || "");
	const name = parsed.name;
	let value = parsed.value;
	try {
		value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
	} catch {}
	const cookie = {
		name,
		value
	};
	for (const part of parts) {
		const sides = part.split("=");
		const partKey = (sides.shift() || "").trimStart().toLowerCase();
		const partValue = sides.join("=");
		switch (partKey) {
			case "expires":
				cookie.expires = new Date(partValue);
				break;
			case "max-age":
				cookie.maxAge = Number.parseInt(partValue, 10);
				break;
			case "secure":
				cookie.secure = true;
				break;
			case "httponly":
				cookie.httpOnly = true;
				break;
			case "samesite":
				cookie.sameSite = partValue;
				break;
			default: cookie[partKey] = partValue;
		}
	}
	return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
	let name = "";
	let value = "";
	const nameValueArr = nameValuePairStr.split("=");
	if (nameValueArr.length > 1) {
		name = nameValueArr.shift();
		value = nameValueArr.join("=");
	} else value = nameValuePairStr;
	return {
		name,
		value
	};
}
function parseCookies$1(event) {
	return parse$1(event.req.headers.get("cookie") || "");
}
function setCookie$1(event, name, value, options) {
	const newCookie = serialize(name, value, {
		path: "/",
		...options
	});
	const currentCookies = event.res.headers.getSetCookie();
	if (currentCookies.length === 0) {
		event.res.headers.set("set-cookie", newCookie);
		return;
	}
	const newCookieKey = _getDistinctCookieKey(name, options || {});
	event.res.headers.delete("set-cookie");
	for (const cookie of currentCookies) {
		if (_getDistinctCookieKey(cookie.split("=")?.[0], parseSetCookie(cookie)) === newCookieKey) continue;
		event.res.headers.append("set-cookie", cookie);
	}
	event.res.headers.append("set-cookie", newCookie);
}
function _getDistinctCookieKey(name, options) {
	return [
		name,
		options.domain || "",
		options.path || "/"
	].join(";");
}
new TextEncoder();
var GLOBAL_EVENT_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:event-storage");
var globalObj = globalThis;
if (!globalObj[GLOBAL_EVENT_STORAGE_KEY]) globalObj[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
	return typeof value.then === "function";
}
function getSetCookieValues(headers) {
	const headersWithSetCookie = headers;
	if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
	const value = headers.get("set-cookie");
	return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
	if (response.ok) return;
	const eventSetCookies = getSetCookieValues(event.res.headers);
	if (eventSetCookies.length === 0) return;
	const responseSetCookies = getSetCookieValues(response.headers);
	response.headers.delete("set-cookie");
	for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
	for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
	if (isPromiseLike(value)) return value.then((resolved) => {
		if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
		return resolved;
	});
	if (value instanceof Response) mergeEventResponseHeaders(value, event);
	return value;
}
function requestHandler(handler) {
	return (request, requestOpts) => {
		const h3Event = new H3Event(request);
		return toResponse$1(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
	};
}
function getH3Event() {
	const event = eventStorage.getStore();
	if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return event.h3Event;
}
function getRequestHeaders() {
	return getH3Event().req.headers;
}
function getCookies$1() {
	return parseCookies$1(getH3Event());
}
function getCookie(name) {
	return getCookies$1()[name] || void 0;
}
function setCookie(name, value, options) {
	setCookie$1(getH3Event(), name, value, options);
}
function getResponse$2() {
	return getH3Event().res;
}
async function getStartManifest(matchedRoutes) {
	const { tsrStartManifest } = await import("../_tanstack-start-manifest_v-CXmhJ3PR.mjs");
	const startManifest = tsrStartManifest();
	const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes["__root__"] || {};
	rootRoute.assets = rootRoute.assets || [];
	let injectedHeadScripts;
	return {
		manifest: { routes: Object.fromEntries(Object.entries(startManifest.routes).flatMap(([k, v]) => {
			const result = {};
			let hasData = false;
			if (v.preloads && v.preloads.length > 0) {
				result["preloads"] = v.preloads;
				hasData = true;
			}
			if (v.assets && v.assets.length > 0) {
				result["assets"] = v.assets;
				hasData = true;
			}
			if (!hasData) return [];
			return [[k, result]];
		})) },
		clientEntry: startManifest.clientEntry,
		injectedHeadScripts
	};
}
var textEncoder$1 = new TextEncoder();
var EMPTY_PAYLOAD = new Uint8Array(0);
function encodeFrame(type, streamId, payload) {
	const frame = new Uint8Array(9 + payload.length);
	frame[0] = type;
	frame[1] = streamId >>> 24 & 255;
	frame[2] = streamId >>> 16 & 255;
	frame[3] = streamId >>> 8 & 255;
	frame[4] = streamId & 255;
	frame[5] = payload.length >>> 24 & 255;
	frame[6] = payload.length >>> 16 & 255;
	frame[7] = payload.length >>> 8 & 255;
	frame[8] = payload.length & 255;
	frame.set(payload, 9);
	return frame;
}
function encodeJSONFrame(json) {
	return encodeFrame(FrameType.JSON, 0, textEncoder$1.encode(json));
}
function encodeChunkFrame(streamId, chunk) {
	return encodeFrame(FrameType.CHUNK, streamId, chunk);
}
function encodeEndFrame(streamId) {
	return encodeFrame(FrameType.END, streamId, EMPTY_PAYLOAD);
}
function encodeErrorFrame(streamId, error) {
	const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
	return encodeFrame(FrameType.ERROR, streamId, textEncoder$1.encode(message));
}
function createMultiplexedStream(jsonStream, rawStreams) {
	let activePumps = 1 + rawStreams.size;
	let controllerRef = null;
	let cancelled = false;
	const cancelReaders = [];
	const safeEnqueue = (chunk) => {
		if (cancelled || !controllerRef) return;
		try {
			controllerRef.enqueue(chunk);
		} catch {}
	};
	const safeError = (err) => {
		if (cancelled || !controllerRef) return;
		try {
			controllerRef.error(err);
		} catch {}
	};
	const safeClose = () => {
		if (cancelled || !controllerRef) return;
		try {
			controllerRef.close();
		} catch {}
	};
	const checkComplete = () => {
		activePumps--;
		if (activePumps === 0) safeClose();
	};
	return new ReadableStream({
		start(controller) {
			controllerRef = controller;
			cancelReaders.length = 0;
			const pumpJSON = async () => {
				const reader = jsonStream.getReader();
				cancelReaders.push(() => {
					reader.cancel().catch(() => {});
				});
				try {
					while (true) {
						const { done, value } = await reader.read();
						if (cancelled) break;
						if (done) break;
						safeEnqueue(encodeJSONFrame(value));
					}
				} catch (error) {
					safeError(error);
				} finally {
					reader.releaseLock();
					checkComplete();
				}
			};
			const pumpRawStream = async (streamId, stream) => {
				const reader = stream.getReader();
				cancelReaders.push(() => {
					reader.cancel().catch(() => {});
				});
				try {
					while (true) {
						const { done, value } = await reader.read();
						if (cancelled) break;
						if (done) {
							safeEnqueue(encodeEndFrame(streamId));
							break;
						}
						safeEnqueue(encodeChunkFrame(streamId, value));
					}
				} catch (error) {
					safeEnqueue(encodeErrorFrame(streamId, error));
				} finally {
					reader.releaseLock();
					checkComplete();
				}
			};
			pumpJSON();
			for (const [streamId, stream] of rawStreams) pumpRawStream(streamId, stream);
		},
		cancel() {
			cancelled = true;
			controllerRef = null;
			for (const cancelReader of cancelReaders) cancelReader();
			cancelReaders.length = 0;
		}
	});
}
var manifest = {
	"71df1c81de1627f92aad64454efb0cbee53b33c45818d2ce8fd4e7ad46e6b1c9": {
		functionName: "setThemeServerFn_createServerFn_handler",
		importer: () => import("./theme-DZiyI74U.mjs")
	},
	"14080f89ae495ac5a5d573b2a10df3d783b0f8d025c02f37771c42e9f7e4faa7": {
		functionName: "setLocaleServerFn_createServerFn_handler",
		importer: () => import("./locale-RgDOA4Zd.mjs")
	},
	"4cf8a2dd9971804ed852b0e8800e0801d53148f92b5cde984ecc2402a068ba3c": {
		functionName: "setBuilderLayoutServerFn_createServerFn_handler",
		importer: () => import("./route-B2kM-1OV.mjs")
	},
	"87b9e274e18165348265760f0c6066b95da714ecd2e1a1b30427498be3225e01": {
		functionName: "getBuilderLayoutServerFn_createServerFn_handler",
		importer: () => import("./route-B2kM-1OV.mjs")
	},
	"756c704a65dc0d34a819db91bfae51022d981bb53c6ad8906dba70c85f0a9c84": {
		functionName: "setViewServerFn_createServerFn_handler",
		importer: () => import("./resumes-Bz663mz_.mjs")
	},
	"4b20519717d2ba2f6679a73ed58f69487c7fe8e6cc9cbbf048dd213fa980a675": {
		functionName: "getViewServerFn_createServerFn_handler",
		importer: () => import("./resumes-Bz663mz_.mjs")
	},
	"513aca5e0aecd5ef992128f5d4c9f895e12f04155f3f4abd4b56c78ca99ffe64": {
		functionName: "getDashboardSidebarServerFn_createServerFn_handler",
		importer: () => import("./functions-Zh6kX_jE.mjs")
	},
	"0a9b531e4949df5a7e5b01de45fa3f757b2e20ce8fda163d34303c4021aaf35e": {
		functionName: "setDashboardSidebarServerFn_createServerFn_handler",
		importer: () => import("./functions-Zh6kX_jE.mjs")
	}
};
async function getServerFnById(id) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = await serverFnInfo.importer();
	if (!fnModule) {
		console.info("serverFnInfo", serverFnInfo);
		throw new Error("Server function module not resolved for " + id);
	}
	const action = fnModule[serverFnInfo.functionName];
	if (!action) {
		console.info("serverFnInfo", serverFnInfo);
		console.info("fnModule", fnModule);
		throw new Error(`Server function module export not resolved for serverFn ID: ${id}`);
	}
	return action;
}
var serovalPlugins = void 0;
var textEncoder = new TextEncoder();
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var handleServerAction = async ({ request, context, serverFnId }) => {
	const method = request.method;
	const methodUpper = method.toUpperCase();
	const methodLower = method.toLowerCase();
	const url = new URL(request.url);
	const action = await getServerFnById(serverFnId, { fromClient: true });
	const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
	if (!serovalPlugins) serovalPlugins = getDefaultSerovalPlugins();
	const contentType = request.headers.get("Content-Type");
	function parsePayload(payload) {
		return Iu(payload, { plugins: serovalPlugins });
	}
	return await (async () => {
		try {
			let serializeResult = function(res2) {
				let nonStreamingBody = void 0;
				const alsResponse = getResponse$2();
				if (res2 !== void 0) {
					const rawStreams = /* @__PURE__ */ new Map();
					const plugins = [createRawStreamRPCPlugin((id, stream2) => {
						rawStreams.set(id, stream2);
					}), ...serovalPlugins || []];
					let done = false;
					const callbacks = {
						onParse: (value) => {
							nonStreamingBody = value;
						},
						onDone: () => {
							done = true;
						},
						onError: (error) => {
							throw error;
						}
					};
					au(res2, {
						refs: /* @__PURE__ */ new Map(),
						plugins,
						onParse(value) {
							callbacks.onParse(value);
						},
						onDone() {
							callbacks.onDone();
						},
						onError: (error) => {
							callbacks.onError(error);
						}
					});
					if (done && rawStreams.size === 0) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": "application/json",
							[X_TSS_SERIALIZED]: "true"
						}
					});
					if (rawStreams.size > 0) {
						const multiplexedStream = createMultiplexedStream(new ReadableStream({ start(controller) {
							callbacks.onParse = (value) => {
								controller.enqueue(JSON.stringify(value) + "\n");
							};
							callbacks.onDone = () => {
								try {
									controller.close();
								} catch {}
							};
							callbacks.onError = (error) => controller.error(error);
							if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
						} }), rawStreams);
						return new Response(multiplexedStream, {
							status: alsResponse.status,
							statusText: alsResponse.statusText,
							headers: {
								"Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
								[X_TSS_SERIALIZED]: "true"
							}
						});
					}
					const stream = new ReadableStream({ start(controller) {
						callbacks.onParse = (value) => controller.enqueue(textEncoder.encode(JSON.stringify(value) + "\n"));
						callbacks.onDone = () => {
							try {
								controller.close();
							} catch (error) {
								controller.error(error);
							}
						};
						callbacks.onError = (error) => controller.error(error);
						if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
					} });
					return new Response(stream, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": "application/x-ndjson",
							[X_TSS_SERIALIZED]: "true"
						}
					});
				}
				return new Response(void 0, {
					status: alsResponse.status,
					statusText: alsResponse.statusText
				});
			};
			let res = await (async () => {
				if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
					invariant(methodLower !== "get", "GET requests with FormData payloads are not supported");
					const formData = await request.formData();
					const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
					formData.delete(TSS_FORMDATA_CONTEXT);
					const params = {
						context,
						data: formData,
						method: methodUpper
					};
					if (typeof serializedContext === "string") try {
						const deserializedContext = Iu(JSON.parse(serializedContext), { plugins: serovalPlugins });
						if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(context, deserializedContext);
					} catch (e) {}
					return await action(params);
				}
				if (methodLower === "get") {
					const payloadParam = url.searchParams.get("payload");
					if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
					const payload2 = payloadParam ? parsePayload(JSON.parse(payloadParam)) : {};
					payload2.context = safeObjectMerge(context, payload2.context);
					payload2.method = methodUpper;
					return await action(payload2);
				}
				if (methodLower !== "post") throw new Error("expected POST method");
				let jsonPayload;
				if (contentType?.includes("application/json")) jsonPayload = await request.json();
				const payload = jsonPayload ? parsePayload(jsonPayload) : {};
				payload.context = safeObjectMerge(payload.context, context);
				payload.method = methodUpper;
				return await action(payload);
			})();
			const unwrapped = res.result || res.error;
			if (isNotFound(res)) res = isNotFoundResponse(res);
			if (!isServerFn) return unwrapped;
			if (unwrapped instanceof Response) {
				if (isRedirect(unwrapped)) return unwrapped;
				unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
				return unwrapped;
			}
			return serializeResult(res);
		} catch (error) {
			if (error instanceof Response) return error;
			if (isNotFound(error)) return isNotFoundResponse(error);
			console.info();
			console.info("Server Fn Error!");
			console.info();
			console.error(error);
			console.info();
			const serializedError = JSON.stringify(await Promise.resolve(ou(error, {
				refs: /* @__PURE__ */ new Map(),
				plugins: serovalPlugins
			})));
			const response2 = getResponse$2();
			return new Response(serializedError, {
				status: response2.status ?? 500,
				statusText: response2.statusText,
				headers: {
					"Content-Type": "application/json",
					[X_TSS_SERIALIZED]: "true"
				}
			});
		}
	})();
};
function isNotFoundResponse(error) {
	const { headers, ...rest } = error;
	return new Response(JSON.stringify(rest), {
		status: 404,
		headers: {
			"Content-Type": "application/json",
			...headers || {}
		}
	});
}
function resolveTransformConfig(transform) {
	if (typeof transform === "string") {
		const prefix = transform;
		return {
			type: "transform",
			transformFn: ({ url }) => `${prefix}${url}`,
			cache: true
		};
	}
	if (typeof transform === "function") return {
		type: "transform",
		transformFn: transform,
		cache: true
	};
	if ("createTransform" in transform && transform.createTransform) return {
		type: "createTransform",
		createTransform: transform.createTransform,
		cache: transform.cache !== false
	};
	return {
		type: "transform",
		transformFn: typeof transform.transform === "string" ? (({ url }) => `${transform.transform}${url}`) : transform.transform,
		cache: transform.cache !== false
	};
}
function buildClientEntryScriptTag(clientEntry, injectedHeadScripts) {
	let script = `import(${JSON.stringify(clientEntry)})`;
	if (injectedHeadScripts) script = `${injectedHeadScripts};${script}`;
	return {
		tag: "script",
		attrs: {
			type: "module",
			async: true
		},
		children: script
	};
}
function transformManifestUrls(source, transformFn, opts) {
	return (async () => {
		const manifest = opts?.clone ? structuredClone(source.manifest) : source.manifest;
		for (const route of Object.values(manifest.routes)) {
			if (route.preloads) route.preloads = await Promise.all(route.preloads.map((url) => Promise.resolve(transformFn({
				url,
				type: "modulepreload"
			}))));
			if (route.assets) {
				for (const asset of route.assets) if (asset.tag === "link" && asset.attrs?.href) asset.attrs.href = await Promise.resolve(transformFn({
					url: asset.attrs.href,
					type: "stylesheet"
				}));
			}
		}
		const transformedClientEntry = await Promise.resolve(transformFn({
			url: source.clientEntry,
			type: "clientEntry"
		}));
		const rootRoute = manifest.routes[rootRouteId];
		if (rootRoute) {
			rootRoute.assets = rootRoute.assets || [];
			rootRoute.assets.push(buildClientEntryScriptTag(transformedClientEntry, source.injectedHeadScripts));
		}
		return manifest;
	})();
}
function buildManifestWithClientEntry(source) {
	const scriptTag = buildClientEntryScriptTag(source.clientEntry, source.injectedHeadScripts);
	const baseRootRoute = source.manifest.routes[rootRouteId];
	return { routes: {
		...source.manifest.routes,
		...baseRootRoute ? { [rootRouteId]: {
			...baseRootRoute,
			assets: [...baseRootRoute.assets || [], scriptTag]
		} } : {}
	} };
}
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
var ServerFunctionSerializationAdapter = createSerializationAdapter({
	key: "$TSS/serverfn",
	test: (v) => {
		if (typeof v !== "function") return false;
		if (!(TSS_SERVER_FUNCTION in v)) return false;
		return !!v[TSS_SERVER_FUNCTION];
	},
	toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
	fromSerializable: ({ functionId }) => {
		const fn = async (opts, signal) => {
			return (await (await getServerFnById(functionId, { fromClient: true }))(opts ?? {}, signal)).result;
		};
		return fn;
	}
});
function getStartResponseHeaders(opts) {
	return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ...opts.router.state.matches.map((match) => {
		return match.headers;
	}));
}
var entriesPromise;
var baseManifestPromise;
var cachedFinalManifestPromise;
async function loadEntries() {
	const routerEntry = await import("./router-Bfshy9P7.mjs");
	return {
		startEntry: await import("./start-BaqeGCRc.mjs"),
		routerEntry
	};
}
function getEntries() {
	if (!entriesPromise) entriesPromise = loadEntries();
	return entriesPromise;
}
function getBaseManifest(matchedRoutes) {
	if (!baseManifestPromise) baseManifestPromise = getStartManifest();
	return baseManifestPromise;
}
async function resolveManifest(matchedRoutes, transformFn, cache) {
	const base = await getBaseManifest(matchedRoutes);
	const computeFinalManifest = async () => {
		return transformFn ? await transformManifestUrls(base, transformFn, { clone: !cache }) : buildManifestWithClientEntry(base);
	};
	if (!transformFn || cache) {
		if (!cachedFinalManifestPromise) cachedFinalManifestPromise = computeFinalManifest();
		return cachedFinalManifestPromise;
	}
	return computeFinalManifest();
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var ERR_NO_RESPONSE = "Internal Server Error";
var ERR_NO_DEFER = "Internal Server Error";
function throwRouteHandlerError() {
	throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
	throw new Error(ERR_NO_DEFER);
}
function isSpecialResponse(value) {
	return value instanceof Response || isRedirect(value);
}
function handleCtxResult(result) {
	if (isSpecialResponse(result)) return { response: result };
	return result;
}
function executeMiddleware(middlewares, ctx) {
	let index = -1;
	const next = async (nextCtx) => {
		if (nextCtx) {
			if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
			for (const key of Object.keys(nextCtx)) if (key !== "context") ctx[key] = nextCtx[key];
		}
		index++;
		const middleware = middlewares[index];
		if (!middleware) return ctx;
		let result;
		try {
			result = await middleware({
				...ctx,
				next
			});
		} catch (err) {
			if (isSpecialResponse(err)) {
				ctx.response = err;
				return ctx;
			}
			throw err;
		}
		const normalized = handleCtxResult(result);
		if (normalized) {
			if (normalized.response !== void 0) ctx.response = normalized.response;
			if (normalized.context) ctx.context = safeObjectMerge(ctx.context, normalized.context);
		}
		return ctx;
	};
	return next();
}
function handlerToMiddleware(handler, mayDefer = false) {
	if (mayDefer) return handler;
	return async (ctx) => {
		const response = await handler({
			...ctx,
			next: throwIfMayNotDefer
		});
		if (!response) throwRouteHandlerError();
		return response;
	};
}
function createStartHandler(cbOrOptions) {
	const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
	const transformAssetUrlsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssetUrls;
	const warmupTransformManifest = !!transformAssetUrlsOption && typeof transformAssetUrlsOption === "object" && transformAssetUrlsOption.warmup === true;
	const resolvedTransformConfig = transformAssetUrlsOption ? resolveTransformConfig(transformAssetUrlsOption) : void 0;
	const cache = resolvedTransformConfig ? resolvedTransformConfig.cache : true;
	let cachedCreateTransformPromise;
	const getTransformFn = async (opts) => {
		if (!resolvedTransformConfig) return void 0;
		if (resolvedTransformConfig.type === "createTransform") {
			if (cache) {
				if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(resolvedTransformConfig.createTransform(opts));
				return cachedCreateTransformPromise;
			}
			return resolvedTransformConfig.createTransform(opts);
		}
		return resolvedTransformConfig.transformFn;
	};
	if (warmupTransformManifest && cache && !cachedFinalManifestPromise) {
		const warmupPromise = (async () => {
			const base = await getBaseManifest(void 0);
			const transformFn = await getTransformFn({ warmup: true });
			return transformFn ? await transformManifestUrls(base, transformFn, { clone: false }) : buildManifestWithClientEntry(base);
		})();
		cachedFinalManifestPromise = warmupPromise;
		warmupPromise.catch(() => {
			if (cachedFinalManifestPromise === warmupPromise) cachedFinalManifestPromise = void 0;
			cachedCreateTransformPromise = void 0;
		});
	}
	const startRequestResolver = async (request, requestOpts) => {
		let router = null;
		let cbWillCleanup = false;
		try {
			const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
			const href = url.pathname + url.search + url.hash;
			const origin = getOrigin$1(request);
			if (handledProtocolRelativeURL) return Response.redirect(url, 308);
			const entries = await getEntries();
			const startOptions = await entries.startEntry.startInstance?.getOptions() || {};
			const serializationAdapters = [...startOptions.serializationAdapters || [], ServerFunctionSerializationAdapter];
			const requestStartOptions = {
				...startOptions,
				serializationAdapters
			};
			const flattenedRequestMiddlewares = startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : [];
			const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
			const getRouter = async () => {
				if (router) return router;
				router = await entries.routerEntry.getRouter();
				let isShell = IS_SHELL_ENV;
				if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
				const history = createMemoryHistory({ initialEntries: [href] });
				router.update({
					history,
					isShell,
					isPrerendering: IS_PRERENDERING,
					origin: router.options.origin ?? origin,
					defaultSsr: requestStartOptions.defaultSsr,
					serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
					basepath: ROUTER_BASEPATH
				});
				return router;
			};
			if (url.pathname.startsWith(SERVER_FN_BASE)) {
				const serverFnId = url.pathname.slice(11).split("/")[0];
				if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
				const serverFnHandler = async ({ context }) => {
					return runWithStartContext({
						getRouter,
						startOptions: requestStartOptions,
						contextAfterGlobalMiddlewares: context,
						request,
						executedRequestMiddlewares
					}, () => handleServerAction({
						request,
						context: requestOpts?.context,
						serverFnId
					}));
				};
				return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), serverFnHandler], {
					request,
					pathname: url.pathname,
					context: createNullProtoObject(requestOpts?.context)
				})).response, request, getRouter);
			}
			const executeRouter = async (serverContext, matchedRoutes) => {
				const acceptParts = (request.headers.get("Accept") || "*/*").split(",");
				if (!["*/*", "text/html"].some((mimeType) => acceptParts.some((part) => part.trim().startsWith(mimeType)))) return Response.json({ error: "Only HTML requests are supported here" }, { status: 500 });
				const manifest = await resolveManifest(matchedRoutes, await getTransformFn({
					warmup: false,
					request
				}), cache);
				const routerInstance = await getRouter();
				attachRouterServerSsrUtils({
					router: routerInstance,
					manifest
				});
				routerInstance.update({ additionalContext: { serverContext } });
				await routerInstance.load();
				if (routerInstance.state.redirect) return routerInstance.state.redirect;
				await routerInstance.serverSsr.dehydrate();
				const responseHeaders = getStartResponseHeaders({ router: routerInstance });
				cbWillCleanup = true;
				return cb({
					request,
					router: routerInstance,
					responseHeaders
				});
			};
			const requestHandlerMiddleware = async ({ context }) => {
				return runWithStartContext({
					getRouter,
					startOptions: requestStartOptions,
					contextAfterGlobalMiddlewares: context,
					request,
					executedRequestMiddlewares
				}, async () => {
					try {
						return await handleServerRoutes({
							getRouter,
							request,
							url,
							executeRouter,
							context,
							executedRequestMiddlewares
						});
					} catch (err) {
						if (err instanceof Response) return err;
						throw err;
					}
				});
			};
			return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), requestHandlerMiddleware], {
				request,
				pathname: url.pathname,
				context: createNullProtoObject(requestOpts?.context)
			})).response, request, getRouter);
		} finally {
			if (router && !cbWillCleanup) router.serverSsr?.cleanup();
			router = null;
		}
	};
	return requestHandler(startRequestResolver);
}
async function handleRedirectResponse(response, request, getRouter) {
	if (!isRedirect(response)) return response;
	if (isResolvedRedirect(response)) {
		if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
			...response.options,
			isSerializedRedirect: true
		}, { headers: response.headers });
		return response;
	}
	const opts = response.options;
	if (opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
	if ([
		"params",
		"search",
		"hash"
	].some((d) => typeof opts[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d) => typeof opts[d] === "function").map((d) => `"${d}"`).join(", ")}`);
	const redirect = (await getRouter()).resolveRedirect(response);
	if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
		...response.options,
		isSerializedRedirect: true
	}, { headers: response.headers });
	return redirect;
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
	const router = await getRouter();
	const pathname = executeRewriteInput(router.rewrite, url).pathname;
	const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
	const isExactMatch = foundRoute && routeParams["**"] === void 0;
	const routeMiddlewares = [];
	for (const route of matchedRoutes) {
		const serverMiddleware = route.options.server?.middleware;
		if (serverMiddleware) {
			const flattened = flattenMiddlewares(serverMiddleware);
			for (const m of flattened) if (!executedRequestMiddlewares.has(m)) routeMiddlewares.push(m.options.server);
		}
	}
	const server = foundRoute?.options.server;
	if (server?.handlers && isExactMatch) {
		const handlers = typeof server.handlers === "function" ? server.handlers({ createHandlers: (d) => d }) : server.handlers;
		const handler = handlers[request.method.toUpperCase()] ?? handlers["ANY"];
		if (handler) {
			const mayDefer = !!foundRoute.options.component;
			if (typeof handler === "function") routeMiddlewares.push(handlerToMiddleware(handler, mayDefer));
			else {
				if (handler.middleware?.length) {
					const handlerMiddlewares = flattenMiddlewares(handler.middleware);
					for (const m of handlerMiddlewares) routeMiddlewares.push(m.options.server);
				}
				if (handler.handler) routeMiddlewares.push(handlerToMiddleware(handler.handler, mayDefer));
			}
		}
	}
	routeMiddlewares.push((ctx2) => executeRouter(ctx2.context, matchedRoutes));
	return (await executeMiddleware(routeMiddlewares, {
		request,
		context,
		params: routeParams,
		pathname
	})).response;
}
var fetch$1 = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
	return { async fetch(...args) {
		return await entry.fetch(...args);
	} };
}
var server_default = createServerEntry({ fetch: fetch$1 });
var memoryAdapter = (db, config) => {
	let lazyOptions = null;
	const adapterCreator = createAdapterFactory({
		config: {
			adapterId: "memory",
			adapterName: "Memory Adapter",
			usePlural: false,
			debugLogs: config?.debugLogs || false,
			supportsArrays: true,
			customTransformInput(props) {
				if (props.options.advanced?.database?.generateId === "serial" && props.field === "id" && props.action === "create") return db[props.model].length + 1;
				return props.data;
			},
			transaction: async (cb) => {
				const clone = structuredClone(db);
				try {
					return await cb(adapterCreator(lazyOptions));
				} catch (error) {
					Object.keys(db).forEach((key) => {
						db[key] = clone[key];
					});
					throw error;
				}
			}
		},
		adapter: ({ getFieldName, getDefaultFieldName, options, getModelName }) => {
			const applySortToRecords = (records, sortBy, model) => {
				if (!sortBy) return records;
				return records.sort((a, b) => {
					const field = getFieldName({
						model,
						field: sortBy.field
					});
					const aValue = a[field];
					const bValue = b[field];
					let comparison = 0;
					if (aValue == null && bValue == null) comparison = 0;
					else if (aValue == null) comparison = -1;
					else if (bValue == null) comparison = 1;
					else if (typeof aValue === "string" && typeof bValue === "string") comparison = aValue.localeCompare(bValue);
					else if (aValue instanceof Date && bValue instanceof Date) comparison = aValue.getTime() - bValue.getTime();
					else if (typeof aValue === "number" && typeof bValue === "number") comparison = aValue - bValue;
					else if (typeof aValue === "boolean" && typeof bValue === "boolean") comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
					else comparison = String(aValue).localeCompare(String(bValue));
					return sortBy.direction === "asc" ? comparison : -comparison;
				});
			};
			function convertWhereClause(where, model, join, select) {
				const baseRecords = (() => {
					const table = db[model];
					if (!table) {
						logger.error(`[MemoryAdapter] Model ${model} not found in the DB`, Object.keys(db));
						throw new Error(`Model ${model} not found`);
					}
					const evalClause = (record, clause) => {
						const { field, value, operator } = clause;
						switch (operator) {
							case "in":
								if (!Array.isArray(value)) throw new Error("Value must be an array");
								return value.includes(record[field]);
							case "not_in":
								if (!Array.isArray(value)) throw new Error("Value must be an array");
								return !value.includes(record[field]);
							case "contains": return record[field].includes(value);
							case "starts_with": return record[field].startsWith(value);
							case "ends_with": return record[field].endsWith(value);
							case "ne": return record[field] !== value;
							case "gt": return value != null && Boolean(record[field] > value);
							case "gte": return value != null && Boolean(record[field] >= value);
							case "lt": return value != null && Boolean(record[field] < value);
							case "lte": return value != null && Boolean(record[field] <= value);
							default: return record[field] === value;
						}
					};
					let records = table.filter((record) => {
						if (!where.length || where.length === 0) return true;
						let result = evalClause(record, where[0]);
						for (const clause of where) {
							const clauseResult = evalClause(record, clause);
							if (clause.connector === "OR") result = result || clauseResult;
							else result = result && clauseResult;
						}
						return result;
					});
					if (select?.length && select.length > 0) records = records.map((record) => Object.fromEntries(Object.entries(record).filter(([key]) => select.includes(getDefaultFieldName({
						model,
						field: key
					})))));
					return records;
				})();
				if (!join) return baseRecords;
				const grouped = /* @__PURE__ */ new Map();
				const seenIds = /* @__PURE__ */ new Map();
				for (const baseRecord of baseRecords) {
					const baseId = String(baseRecord.id);
					if (!grouped.has(baseId)) {
						const nested = { ...baseRecord };
						for (const [joinModel, joinAttr] of Object.entries(join)) {
							const joinModelName = getModelName(joinModel);
							if (joinAttr.relation === "one-to-one") nested[joinModelName] = null;
							else {
								nested[joinModelName] = [];
								seenIds.set(`${baseId}-${joinModel}`, /* @__PURE__ */ new Set());
							}
						}
						grouped.set(baseId, nested);
					}
					const nestedEntry = grouped.get(baseId);
					for (const [joinModel, joinAttr] of Object.entries(join)) {
						const joinModelName = getModelName(joinModel);
						const joinTable = db[joinModelName];
						if (!joinTable) {
							logger.error(`[MemoryAdapter] JoinOption model ${joinModelName} not found in the DB`, Object.keys(db));
							throw new Error(`JoinOption model ${joinModelName} not found`);
						}
						const matchingRecords = joinTable.filter((joinRecord) => joinRecord[joinAttr.on.to] === baseRecord[joinAttr.on.from]);
						if (joinAttr.relation === "one-to-one") nestedEntry[joinModelName] = matchingRecords[0] || null;
						else {
							const seenSet = seenIds.get(`${baseId}-${joinModel}`);
							const limit = joinAttr.limit ?? 100;
							let count = 0;
							for (const matchingRecord of matchingRecords) {
								if (count >= limit) break;
								if (!seenSet.has(matchingRecord.id)) {
									nestedEntry[joinModelName].push(matchingRecord);
									seenSet.add(matchingRecord.id);
									count++;
								}
							}
						}
					}
				}
				return Array.from(grouped.values());
			}
			return {
				create: async ({ model, data }) => {
					if (options.advanced?.database?.generateId === "serial") data.id = db[getModelName(model)].length + 1;
					if (!db[model]) db[model] = [];
					db[model].push(data);
					return data;
				},
				findOne: async ({ model, where, select, join }) => {
					const res = convertWhereClause(where, model, join, select);
					if (join) {
						const resArray = res;
						if (!resArray.length) return null;
						return resArray[0];
					}
					return res[0] || null;
				},
				findMany: async ({ model, where, sortBy, limit, select, offset, join }) => {
					const res = convertWhereClause(where || [], model, join, select);
					if (join) {
						const resArray = res;
						if (!resArray.length) return [];
						applySortToRecords(resArray, sortBy, model);
						let paginatedRecords = resArray;
						if (offset !== void 0) paginatedRecords = paginatedRecords.slice(offset);
						if (limit !== void 0) paginatedRecords = paginatedRecords.slice(0, limit);
						return paginatedRecords;
					}
					let table = applySortToRecords(res, sortBy, model);
					if (offset !== void 0) table = table.slice(offset);
					if (limit !== void 0) table = table.slice(0, limit);
					return table || [];
				},
				count: async ({ model, where }) => {
					if (where) return convertWhereClause(where, model).length;
					return db[model].length;
				},
				update: async ({ model, where, update }) => {
					const res = convertWhereClause(where, model);
					res.forEach((record) => {
						Object.assign(record, update);
					});
					return res[0] || null;
				},
				delete: async ({ model, where }) => {
					const table = db[model];
					const res = convertWhereClause(where, model);
					db[model] = table.filter((record) => !res.includes(record));
				},
				deleteMany: async ({ model, where }) => {
					const table = db[model];
					const res = convertWhereClause(where, model);
					let count = 0;
					db[model] = table.filter((record) => {
						if (res.includes(record)) {
							count++;
							return false;
						}
						return !res.includes(record);
					});
					return count;
				},
				updateMany({ model, where, update }) {
					const res = convertWhereClause(where, model);
					res.forEach((record) => {
						Object.assign(record, update);
					});
					return res[0] || null;
				}
			};
		}
	});
	return (options) => {
		lazyOptions = options;
		return adapterCreator(options);
	};
};
var startInstance = void 0;
var drizzleAdapter = (db, config) => {
	let lazyOptions = null;
	const createCustomAdapter = (db) => ({ getFieldName, getDefaultFieldName, options }) => {
		function getSchema(model) {
			const schema = config.schema || db._.fullSchema;
			if (!schema) throw new BetterAuthError("Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object.");
			const schemaModel = schema[model];
			if (!schemaModel) throw new BetterAuthError(`[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`);
			return schemaModel;
		}
		const withReturning = async (model, builder, data, where) => {
			if (config.provider !== "mysql") return (await builder.returning())[0];
			await builder.execute();
			const schemaModel = getSchema(model);
			const builderVal = builder.config?.values;
			if (where?.length) {
				const clause = convertWhereClause(where.map((w) => {
					if (data[w.field] !== void 0) return {
						...w,
						value: data[w.field]
					};
					return w;
				}), model);
				return (await db.select().from(schemaModel).where(...clause))[0];
			} else if (builderVal && builderVal[0]?.id?.value) {
				let tId = builderVal[0]?.id?.value;
				if (!tId) tId = (await db.select({ id: sql`LAST_INSERT_ID()` }).from(schemaModel).orderBy(desc(schemaModel.id)).limit(1))[0].id;
				return (await db.select().from(schemaModel).where(eq(schemaModel.id, tId)).limit(1).execute())[0];
			} else if (data.id) return (await db.select().from(schemaModel).where(eq(schemaModel.id, data.id)).limit(1).execute())[0];
			else {
				if (!("id" in schemaModel)) throw new BetterAuthError(`The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`);
				return (await db.select().from(schemaModel).orderBy(desc(schemaModel.id)).limit(1).execute())[0];
			}
		};
		function convertWhereClause(where, model) {
			const schemaModel = getSchema(model);
			if (!where) return [];
			if (where.length === 1) {
				const w = where[0];
				if (!w) return [];
				const field = getFieldName({
					model,
					field: w.field
				});
				if (!schemaModel[field]) throw new BetterAuthError(`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
				if (w.operator === "in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
					return [inArray(schemaModel[field], w.value)];
				}
				if (w.operator === "not_in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
					return [notInArray(schemaModel[field], w.value)];
				}
				if (w.operator === "contains") return [like(schemaModel[field], `%${w.value}%`)];
				if (w.operator === "starts_with") return [like(schemaModel[field], `${w.value}%`)];
				if (w.operator === "ends_with") return [like(schemaModel[field], `%${w.value}`)];
				if (w.operator === "lt") return [lt(schemaModel[field], w.value)];
				if (w.operator === "lte") return [lte(schemaModel[field], w.value)];
				if (w.operator === "ne") return [ne(schemaModel[field], w.value)];
				if (w.operator === "gt") return [gt(schemaModel[field], w.value)];
				if (w.operator === "gte") return [gte(schemaModel[field], w.value)];
				return [eq(schemaModel[field], w.value)];
			}
			const andGroup = where.filter((w) => w.connector === "AND" || !w.connector);
			const orGroup = where.filter((w) => w.connector === "OR");
			const andClause = and(...andGroup.map((w) => {
				const field = getFieldName({
					model,
					field: w.field
				});
				if (w.operator === "in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
					return inArray(schemaModel[field], w.value);
				}
				if (w.operator === "not_in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
					return notInArray(schemaModel[field], w.value);
				}
				if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
				if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
				if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
				if (w.operator === "lt") return lt(schemaModel[field], w.value);
				if (w.operator === "lte") return lte(schemaModel[field], w.value);
				if (w.operator === "gt") return gt(schemaModel[field], w.value);
				if (w.operator === "gte") return gte(schemaModel[field], w.value);
				if (w.operator === "ne") return ne(schemaModel[field], w.value);
				return eq(schemaModel[field], w.value);
			}));
			const orClause = or(...orGroup.map((w) => {
				const field = getFieldName({
					model,
					field: w.field
				});
				if (w.operator === "in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
					return inArray(schemaModel[field], w.value);
				}
				if (w.operator === "not_in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
					return notInArray(schemaModel[field], w.value);
				}
				if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
				if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
				if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
				if (w.operator === "lt") return lt(schemaModel[field], w.value);
				if (w.operator === "lte") return lte(schemaModel[field], w.value);
				if (w.operator === "gt") return gt(schemaModel[field], w.value);
				if (w.operator === "gte") return gte(schemaModel[field], w.value);
				if (w.operator === "ne") return ne(schemaModel[field], w.value);
				return eq(schemaModel[field], w.value);
			}));
			const clause = [];
			if (andGroup.length) clause.push(andClause);
			if (orGroup.length) clause.push(orClause);
			return clause;
		}
		function checkMissingFields(schema, model, values) {
			if (!schema) throw new BetterAuthError("Drizzle adapter failed to initialize. Drizzle Schema not found. Please provide a schema object in the adapter options object.");
			for (const key in values) if (!schema[key]) throw new BetterAuthError(`The field "${key}" does not exist in the "${model}" Drizzle schema. Please update your drizzle schema or re-generate using "npx @better-auth/cli@latest generate".`);
		}
		return {
			async create({ model, data: values }) {
				const schemaModel = getSchema(model);
				checkMissingFields(schemaModel, model, values);
				return await withReturning(model, db.insert(schemaModel).values(values), values);
			},
			async findOne({ model, where, select, join }) {
				const schemaModel = getSchema(model);
				const clause = convertWhereClause(where, model);
				if (options.experimental?.joins) if (!db.query || !db.query[model]) {
					logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx @better-auth/cli@latest generate".`);
					logger.info("Falling back to regular query");
				} else {
					let includes;
					const pluralJoinResults = [];
					if (join) {
						includes = {};
						const joinEntries = Object.entries(join);
						for (const [model, joinAttr] of joinEntries) {
							const limit = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
							const isUnique = joinAttr.relation === "one-to-one";
							const pluralSuffix = isUnique || config.usePlural ? "" : "s";
							includes[`${model}${pluralSuffix}`] = isUnique ? true : { limit };
							if (!isUnique) pluralJoinResults.push(`${model}${pluralSuffix}`);
						}
					}
					const res = await db.query[model].findFirst({
						where: clause[0],
						columns: select?.length && select.length > 0 ? select.reduce((acc, field) => {
							acc[getFieldName({
								model,
								field
							})] = true;
							return acc;
						}, {}) : void 0,
						with: includes
					});
					if (res) for (const pluralJoinResult of pluralJoinResults) {
						const singularKey = !config.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
						res[singularKey] = res[pluralJoinResult];
						if (pluralJoinResult !== singularKey) delete res[pluralJoinResult];
					}
					return res;
				}
				const res = await db.select(select?.length && select.length > 0 ? select.reduce((acc, field) => {
					const fieldName = getFieldName({
						model,
						field
					});
					return {
						...acc,
						[fieldName]: schemaModel[fieldName]
					};
				}, {}) : void 0).from(schemaModel).where(...clause);
				if (!res.length) return null;
				return res[0];
			},
			async findMany({ model, where, sortBy, limit, select, offset, join }) {
				const schemaModel = getSchema(model);
				const clause = where ? convertWhereClause(where, model) : [];
				const sortFn = sortBy?.direction === "desc" ? desc : asc;
				if (options.experimental?.joins) if (!db.query[model]) {
					logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx @better-auth/cli@latest generate".`);
					logger.info("Falling back to regular query");
				} else {
					let includes;
					const pluralJoinResults = [];
					if (join) {
						includes = {};
						const joinEntries = Object.entries(join);
						for (const [model, joinAttr] of joinEntries) {
							const isUnique = joinAttr.relation === "one-to-one";
							const limit = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
							const pluralSuffix = isUnique || config.usePlural ? "" : "s";
							includes[`${model}${pluralSuffix}`] = isUnique ? true : { limit };
							if (!isUnique) pluralJoinResults.push(`${model}${pluralSuffix}`);
						}
					}
					let orderBy = void 0;
					if (sortBy?.field) orderBy = [sortFn(schemaModel[getFieldName({
						model,
						field: sortBy?.field
					})])];
					const res = await db.query[model].findMany({
						where: clause[0],
						with: includes,
						columns: select?.length && select.length > 0 ? select.reduce((acc, field) => {
							acc[getFieldName({
								model,
								field
							})] = true;
							return acc;
						}, {}) : void 0,
						limit: limit ?? 100,
						offset: offset ?? 0,
						orderBy
					});
					if (res) for (const item of res) for (const pluralJoinResult of pluralJoinResults) {
						const singularKey = !config.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
						if (singularKey === pluralJoinResult) continue;
						item[singularKey] = item[pluralJoinResult];
						delete item[pluralJoinResult];
					}
					return res;
				}
				let builder = db.select(select?.length && select.length > 0 ? select.reduce((acc, field) => {
					const fieldName = getFieldName({
						model,
						field
					});
					return {
						...acc,
						[fieldName]: schemaModel[fieldName]
					};
				}, {}) : void 0).from(schemaModel);
				const effectiveLimit = limit;
				const effectiveOffset = offset;
				if (typeof effectiveLimit !== "undefined") builder = builder.limit(effectiveLimit);
				if (typeof effectiveOffset !== "undefined") builder = builder.offset(effectiveOffset);
				if (sortBy?.field) builder = builder.orderBy(sortFn(schemaModel[getFieldName({
					model,
					field: sortBy?.field
				})]));
				return await builder.where(...clause);
			},
			async count({ model, where }) {
				const schemaModel = getSchema(model);
				const clause = where ? convertWhereClause(where, model) : [];
				return (await db.select({ count: count() }).from(schemaModel).where(...clause))[0].count;
			},
			async update({ model, where, update: values }) {
				const schemaModel = getSchema(model);
				const clause = convertWhereClause(where, model);
				return await withReturning(model, db.update(schemaModel).set(values).where(...clause), values, where);
			},
			async updateMany({ model, where, update: values }) {
				const schemaModel = getSchema(model);
				const clause = convertWhereClause(where, model);
				return await db.update(schemaModel).set(values).where(...clause);
			},
			async delete({ model, where }) {
				const schemaModel = getSchema(model);
				const clause = convertWhereClause(where, model);
				return await db.delete(schemaModel).where(...clause);
			},
			async deleteMany({ model, where }) {
				const schemaModel = getSchema(model);
				const clause = convertWhereClause(where, model);
				const res = await db.delete(schemaModel).where(...clause);
				let count = 0;
				if (res && "rowCount" in res) count = res.rowCount;
				else if (Array.isArray(res)) count = res.length;
				else if (res && ("affectedRows" in res || "rowsAffected" in res || "changes" in res)) count = res.affectedRows ?? res.rowsAffected ?? res.changes;
				if (typeof count !== "number") logger.error("[Drizzle Adapter] The result of the deleteMany operation is not a number. This is likely a bug in the adapter. Please report this issue to the Better Auth team.", {
					res,
					model,
					where
				});
				return count;
			},
			options: config
		};
	};
	let adapterOptions = null;
	adapterOptions = {
		config: {
			adapterId: "drizzle",
			adapterName: "Drizzle Adapter",
			usePlural: config.usePlural ?? false,
			debugLogs: config.debugLogs ?? false,
			supportsUUIDs: config.provider === "pg" ? true : false,
			supportsJSON: config.provider === "pg" ? true : false,
			supportsArrays: config.provider === "pg" ? true : false,
			transaction: config.transaction ?? false ? (cb) => db.transaction((tx) => {
				return cb(createAdapterFactory({
					config: adapterOptions.config,
					adapter: createCustomAdapter(tx)
				})(lazyOptions));
			}) : false
		},
		adapter: createCustomAdapter(db)
	};
	const adapter = createAdapterFactory(adapterOptions);
	return (options) => {
		lazyOptions = options;
		return adapter(options);
	};
};
function checkHasPath(url) {
	try {
		return (new URL(url).pathname.replace(/\/+$/, "") || "/") !== "/";
	} catch {
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
	}
}
function assertHasProtocol(url) {
	try {
		const parsedUrl = new URL(url);
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new BetterAuthError(`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
	} catch (error) {
		if (error instanceof BetterAuthError) throw error;
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`, { cause: error });
	}
}
function withPath(url, path = "/api/auth") {
	assertHasProtocol(url);
	if (checkHasPath(url)) return url;
	const trimmedUrl = url.replace(/\/+$/, "");
	if (!path || path === "/") return trimmedUrl;
	path = path.startsWith("/") ? path : `/${path}`;
	return `${trimmedUrl}${path}`;
}
function validateProxyHeader(header, type) {
	if (!header || header.trim() === "") return false;
	if (type === "proto") return header === "http" || header === "https";
	if (type === "host") {
		if ([
			/\.\./,
			/\0/,
			/[\s]/,
			/^[.]/,
			/[<>'"]/,
			/javascript:/i,
			/file:/i,
			/data:/i
		].some((pattern) => pattern.test(header))) return false;
		return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(header) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(header) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(header) || /^localhost(:[0-9]{1,5})?$/i.test(header);
	}
	return false;
}
function getBaseURL(url, path, request, loadEnv, trustedProxyHeaders) {
	if (url) return withPath(url, path);
	if (loadEnv !== false) {
		const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
		if (fromEnv) return withPath(fromEnv, path);
	}
	const fromRequest = request?.headers.get("x-forwarded-host");
	const fromRequestProto = request?.headers.get("x-forwarded-proto");
	if (fromRequest && fromRequestProto && trustedProxyHeaders) {
		if (validateProxyHeader(fromRequestProto, "proto") && validateProxyHeader(fromRequest, "host")) try {
			return withPath(`${fromRequestProto}://${fromRequest}`, path);
		} catch (_error) {}
	}
	if (request) {
		const url = getOrigin(request.url);
		if (!url) throw new BetterAuthError("Could not get origin from request. Please provide a valid base URL.");
		return withPath(url, path);
	}
	if (typeof window !== "undefined" && window.location) return withPath(window.location.origin, path);
}
function getOrigin(url) {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.origin === "null" ? null : parsedUrl.origin;
	} catch {
		return null;
	}
}
function getProtocol(url) {
	try {
		return new URL(url).protocol;
	} catch {
		return null;
	}
}
function getHost(url) {
	try {
		return new URL(url).host;
	} catch {
		return null;
	}
}
var LOCALHOST_IP = "127.0.0.1";
function getIp(req, options) {
	if (options.advanced?.ipAddress?.disableIpTracking) return null;
	const headers = "headers" in req ? req.headers : req;
	const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || ["x-forwarded-for"];
	for (const key of ipHeaders) {
		const value = "get" in headers ? headers.get(key) : headers[key];
		if (typeof value === "string") {
			const ip = value.split(",")[0].trim();
			if (isValidIP(ip)) return normalizeIP(ip, { ipv6Subnet: options.advanced?.ipAddress?.ipv6Subnet });
		}
	}
	if (isTest() || isDevelopment()) return LOCALHOST_IP;
	return null;
}
var getDate = (span, unit = "ms") => {
	return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
var cache$1 = /* @__PURE__ */ new WeakMap();
function getFields(options, modelName, mode) {
	const cacheKey = `${modelName}:${mode}`;
	if (!cache$1.has(options)) cache$1.set(options, /* @__PURE__ */ new Map());
	const tableCache = cache$1.get(options);
	if (tableCache.has(cacheKey)) return tableCache.get(cacheKey);
	const coreSchema = mode === "output" ? getAuthTables(options)[modelName]?.fields ?? {} : {};
	const additionalFields = modelName === "user" || modelName === "session" || modelName === "account" ? options[modelName]?.additionalFields : void 0;
	let schema = {
		...coreSchema,
		...additionalFields ?? {}
	};
	for (const plugin of options.plugins || []) if (plugin.schema && plugin.schema[modelName]) schema = {
		...schema,
		...plugin.schema[modelName].fields
	};
	tableCache.set(cacheKey, schema);
	return schema;
}
function parseUserOutput(options, user) {
	return filterOutputFields(user, getFields(options, "user", "output"));
}
function parseSessionOutput(options, session) {
	return filterOutputFields(session, getFields(options, "session", "output"));
}
function parseAccountOutput(options, account) {
	const { accessToken: _accessToken, refreshToken: _refreshToken, idToken: _idToken, accessTokenExpiresAt: _accessTokenExpiresAt, refreshTokenExpiresAt: _refreshTokenExpiresAt, password: _password, ...rest } = filterOutputFields(account, getFields(options, "account", "output"));
	return rest;
}
function parseInputData(data, schema) {
	const action = schema.action || "create";
	const fields = schema.fields;
	const parsedData = Object.create(null);
	for (const key in fields) {
		if (key in data) {
			if (fields[key].input === false) {
				if (fields[key].defaultValue !== void 0) {
					if (action !== "update") {
						parsedData[key] = fields[key].defaultValue;
						continue;
					}
				}
				if (data[key]) throw APIError.from("BAD_REQUEST", {
					...BASE_ERROR_CODES.FIELD_NOT_ALLOWED,
					message: `${key} is not allowed to be set`
				});
				continue;
			}
			if (fields[key].validator?.input && data[key] !== void 0) {
				const result = fields[key].validator.input["~standard"].validate(data[key]);
				if (result instanceof Promise) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.ASYNC_VALIDATION_NOT_SUPPORTED);
				if ("issues" in result && result.issues) throw APIError.from("BAD_REQUEST", {
					...BASE_ERROR_CODES.VALIDATION_ERROR,
					message: result.issues[0]?.message || "Validation Error"
				});
				parsedData[key] = result.value;
				continue;
			}
			if (fields[key].transform?.input && data[key] !== void 0) {
				parsedData[key] = fields[key].transform?.input(data[key]);
				continue;
			}
			parsedData[key] = data[key];
			continue;
		}
		if (fields[key].defaultValue !== void 0 && action === "create") {
			if (typeof fields[key].defaultValue === "function") {
				parsedData[key] = fields[key].defaultValue();
				continue;
			}
			parsedData[key] = fields[key].defaultValue;
			continue;
		}
		if (fields[key].required && action === "create") throw APIError.from("BAD_REQUEST", {
			...BASE_ERROR_CODES.MISSING_FIELD,
			message: `${key} is required`
		});
	}
	return parsedData;
}
function parseUserInput(options, user = {}, action) {
	return parseInputData(user, {
		fields: getFields(options, "user", "input"),
		action
	});
}
function parseAdditionalUserInput(options, user) {
	const schema = getFields(options, "user", "input");
	return parseInputData(user || {}, { fields: schema });
}
function parseAccountInput(options, account) {
	return parseInputData(account, { fields: getFields(options, "account", "input") });
}
function parseSessionInput(options, session) {
	return parseInputData(session, { fields: getFields(options, "session", "input") });
}
function mergeSchema(schema, newSchema) {
	if (!newSchema) return schema;
	for (const table in newSchema) {
		const newModelName = newSchema[table]?.modelName;
		if (newModelName) schema[table].modelName = newModelName;
		for (const field in schema[table].fields) {
			const newField = newSchema[table]?.fields?.[field];
			if (!newField) continue;
			schema[table].fields[field].fieldName = newField;
		}
	}
	return schema;
}
function getAlphabet$1(urlSafe) {
	return urlSafe ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
}
function base64Encode(data, alphabet, padding) {
	let result = "";
	let buffer = 0;
	let shift = 0;
	for (const byte of data) {
		buffer = buffer << 8 | byte;
		shift += 8;
		while (shift >= 6) {
			shift -= 6;
			result += alphabet[buffer >> shift & 63];
		}
	}
	if (shift > 0) result += alphabet[buffer << 6 - shift & 63];
	if (padding) {
		const padCount = (4 - result.length % 4) % 4;
		result += "=".repeat(padCount);
	}
	return result;
}
function base64Decode(data, alphabet) {
	const decodeMap = /* @__PURE__ */ new Map();
	for (let i = 0; i < alphabet.length; i++) decodeMap.set(alphabet[i], i);
	const result = [];
	let buffer = 0;
	let bitsCollected = 0;
	for (const char of data) {
		if (char === "=") break;
		const value = decodeMap.get(char);
		if (value === void 0) throw new Error(`Invalid Base64 character: ${char}`);
		buffer = buffer << 6 | value;
		bitsCollected += 6;
		if (bitsCollected >= 8) {
			bitsCollected -= 8;
			result.push(buffer >> bitsCollected & 255);
		}
	}
	return Uint8Array.from(result);
}
var base64 = {
	encode(data, options = {}) {
		const alphabet = getAlphabet$1(false);
		return base64Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		if (typeof data !== "string") data = new TextDecoder().decode(data);
		const alphabet = getAlphabet$1(data.includes("-") || data.includes("_"));
		return base64Decode(data, alphabet);
	}
};
var base64Url = {
	encode(data, options = {}) {
		const alphabet = getAlphabet$1(true);
		return base64Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		return base64Decode(data, getAlphabet$1(data.includes("-") || data.includes("_")));
	}
};
function getWebcryptoSubtle() {
	const cr = typeof globalThis !== "undefined" && globalThis.crypto;
	if (cr && typeof cr.subtle === "object" && cr.subtle != null) return cr.subtle;
	throw new Error("crypto.subtle must be defined");
}
function createHash(algorithm, encoding) {
	return { digest: async (input) => {
		const encoder = new TextEncoder();
		const data = typeof input === "string" ? encoder.encode(input) : input;
		const hashBuffer = await getWebcryptoSubtle().digest(algorithm, data);
		if (encoding === "hex") return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
		if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
			if (encoding.includes("url")) return base64Url.encode(hashBuffer, { padding: encoding !== "base64urlnopad" });
			return base64.encode(hashBuffer);
		}
		return hashBuffer;
	} };
}
var defaultKeyHasher$2 = async (identifier) => {
	const hash = await createHash("SHA-256").digest(new TextEncoder().encode(identifier));
	return base64Url.encode(new Uint8Array(hash), { padding: false });
};
async function processIdentifier(identifier, option) {
	if (!option || option === "plain") return identifier;
	if (option === "hashed") return defaultKeyHasher$2(identifier);
	if (typeof option === "object" && "hash" in option) return option.hash(identifier);
	return identifier;
}
function getStorageOption(identifier, config) {
	if (!config) return;
	if (typeof config === "object" && "default" in config) {
		if (config.overrides) {
			for (const [prefix, option] of Object.entries(config.overrides)) if (identifier.startsWith(prefix)) return option;
		}
		return config.default;
	}
	return config;
}
function getWithHooks(adapter, ctx) {
	const hooks = ctx.hooks;
	async function createWithHooks(data, model, customCreateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const hook of hooks || []) {
			const toRun = hook[model]?.create?.before;
			if (toRun) {
				const result = await toRun(actualData, context);
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		let created = null;
		if (!customCreateFn || customCreateFn.executeMainFn) created = await (await getCurrentAdapter(adapter)).create({
			model,
			data: actualData,
			forceAllowId: true
		});
		if (customCreateFn?.fn) created = await customCreateFn.fn(created ?? actualData);
		for (const hook of hooks || []) {
			const toRun = hook[model]?.create?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await toRun(created, context);
			});
		}
		return created;
	}
	async function updateWithHooks(data, where, model, customUpdateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const hook of hooks || []) {
			const toRun = hook[model]?.update?.before;
			if (toRun) {
				const result = await toRun(data, context);
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
		const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).update({
			model,
			update: actualData,
			where
		}) : customUpdated;
		for (const hook of hooks || []) {
			const toRun = hook[model]?.update?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await toRun(updated, context);
			});
		}
		return updated;
	}
	async function updateManyWithHooks(data, where, model, customUpdateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const hook of hooks || []) {
			const toRun = hook[model]?.update?.before;
			if (toRun) {
				const result = await toRun(data, context);
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
		const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).updateMany({
			model,
			update: actualData,
			where
		}) : customUpdated;
		for (const hook of hooks || []) {
			const toRun = hook[model]?.update?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await toRun(updated, context);
			});
		}
		return updated;
	}
	async function deleteWithHooks(where, model, customDeleteFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let entityToDelete = null;
		try {
			entityToDelete = (await (await getCurrentAdapter(adapter)).findMany({
				model,
				where,
				limit: 1
			}))[0] || null;
		} catch {}
		if (entityToDelete) for (const hook of hooks || []) {
			const toRun = hook[model]?.delete?.before;
			if (toRun) {
				if (await toRun(entityToDelete, context) === false) return null;
			}
		}
		const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
		const deleted = (!customDeleteFn || customDeleteFn.executeMainFn) && entityToDelete ? await (await getCurrentAdapter(adapter)).delete({
			model,
			where
		}) : customDeleted;
		if (entityToDelete) for (const hook of hooks || []) {
			const toRun = hook[model]?.delete?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await toRun(entityToDelete, context);
			});
		}
		return deleted;
	}
	async function deleteManyWithHooks(where, model, customDeleteFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let entitiesToDelete = [];
		try {
			entitiesToDelete = await (await getCurrentAdapter(adapter)).findMany({
				model,
				where
			});
		} catch {}
		for (const entity of entitiesToDelete) for (const hook of hooks || []) {
			const toRun = hook[model]?.delete?.before;
			if (toRun) {
				if (await toRun(entity, context) === false) return null;
			}
		}
		const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
		const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).deleteMany({
			model,
			where
		}) : customDeleted;
		for (const entity of entitiesToDelete) for (const hook of hooks || []) {
			const toRun = hook[model]?.delete?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await toRun(entity, context);
			});
		}
		return deleted;
	}
	return {
		createWithHooks,
		updateWithHooks,
		updateManyWithHooks,
		deleteWithHooks,
		deleteManyWithHooks
	};
}
function getTTLSeconds(expiresAt, now = Date.now()) {
	const expiresMs = typeof expiresAt === "number" ? expiresAt : expiresAt.getTime();
	return Math.max(Math.floor((expiresMs - now) / 1e3), 0);
}
var createInternalAdapter = (adapter, ctx) => {
	const logger = ctx.logger;
	const options = ctx.options;
	const secondaryStorage = options.secondaryStorage;
	const sessionExpiration = options.session?.expiresIn || 3600 * 24 * 7;
	const { createWithHooks, updateWithHooks, updateManyWithHooks, deleteWithHooks, deleteManyWithHooks } = getWithHooks(adapter, ctx);
	async function refreshUserSessions(user) {
		if (!secondaryStorage) return;
		const listRaw = await secondaryStorage.get(`active-sessions-${user.id}`);
		if (!listRaw) return;
		const now = Date.now();
		const validSessions = (safeJSONParse(listRaw) || []).filter((s) => s.expiresAt > now);
		await Promise.all(validSessions.map(async ({ token }) => {
			const cached = await secondaryStorage.get(token);
			if (!cached) return;
			const parsed = safeJSONParse(cached);
			if (!parsed) return;
			const sessionTTL = getTTLSeconds(parsed.session.expiresAt, now);
			await secondaryStorage.set(token, JSON.stringify({
				session: parsed.session,
				user
			}), Math.floor(sessionTTL));
		}));
	}
	return {
		createOAuthUser: async (user, account) => {
			return runWithTransaction(adapter, async () => {
				const createdUser = await createWithHooks({
					createdAt: /* @__PURE__ */ new Date(),
					updatedAt: /* @__PURE__ */ new Date(),
					...user
				}, "user", void 0);
				return {
					user: createdUser,
					account: await createWithHooks({
						...account,
						userId: createdUser.id,
						createdAt: /* @__PURE__ */ new Date(),
						updatedAt: /* @__PURE__ */ new Date()
					}, "account", void 0)
				};
			});
		},
		createUser: async (user) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...user,
				email: user.email?.toLowerCase()
			}, "user", void 0);
		},
		createAccount: async (account) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...account
			}, "account", void 0);
		},
		listSessions: async (userId) => {
			if (secondaryStorage) {
				const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
				if (!currentList) return [];
				const list = safeJSONParse(currentList) || [];
				const now = Date.now();
				const seenTokens = /* @__PURE__ */ new Set();
				const sessions = [];
				for (const { token, expiresAt } of list) {
					if (expiresAt <= now || seenTokens.has(token)) continue;
					seenTokens.add(token);
					const data = await secondaryStorage.get(token);
					if (!data) continue;
					try {
						const parsed = typeof data === "string" ? JSON.parse(data) : data;
						if (!parsed?.session) continue;
						sessions.push(parseSessionOutput(ctx.options, {
							...parsed.session,
							expiresAt: new Date(parsed.session.expiresAt)
						}));
					} catch {
						continue;
					}
				}
				return sessions;
			}
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "session",
				where: [{
					field: "userId",
					value: userId
				}]
			});
		},
		listUsers: async (limit, offset, sortBy, where) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "user",
				limit,
				offset,
				sortBy,
				where
			});
		},
		countTotalUsers: async (where) => {
			const total = await (await getCurrentAdapter(adapter)).count({
				model: "user",
				where
			});
			if (typeof total === "string") return parseInt(total);
			return total;
		},
		deleteUser: async (userId) => {
			if (!secondaryStorage || options.session?.storeSessionInDatabase) await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "session", void 0);
			await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "account", void 0);
			await deleteWithHooks([{
				field: "id",
				value: userId
			}], "user", void 0);
		},
		createSession: async (userId, dontRememberMe, override, overrideAll) => {
			const headers = await (async () => {
				const ctx = await getCurrentAuthContext().catch(() => null);
				return ctx?.headers || ctx?.request?.headers;
			})();
			const storeInDb = options.session?.storeSessionInDatabase;
			const { id: _, ...rest } = override || {};
			const defaultAdditionalFields = parseSessionInput(options, {});
			const data = {
				ipAddress: headers ? getIp(headers, options) || "" : "",
				userAgent: headers?.get("user-agent") || "",
				...rest,
				expiresAt: dontRememberMe ? getDate(3600 * 24, "sec") : getDate(sessionExpiration, "sec"),
				userId,
				token: generateId(32),
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...defaultAdditionalFields,
				...overrideAll ? rest : {}
			};
			return await createWithHooks(data, "session", secondaryStorage ? {
				fn: async (sessionData) => {
					/**
					* store the session token for the user
					* so we can retrieve it later for listing sessions
					*/
					const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
					let list = [];
					const now = Date.now();
					if (currentList) {
						list = safeJSONParse(currentList) || [];
						list = list.filter((session) => session.expiresAt > now && session.token !== data.token);
					}
					const sorted = [...list, {
						token: data.token,
						expiresAt: data.expiresAt.getTime()
					}].sort((a, b) => a.expiresAt - b.expiresAt);
					const furthestSessionTTL = getTTLSeconds(sorted.at(-1)?.expiresAt ?? data.expiresAt.getTime(), now);
					if (furthestSessionTTL > 0) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(sorted), furthestSessionTTL);
					const user = await (await getCurrentAdapter(adapter)).findOne({
						model: "user",
						where: [{
							field: "id",
							value: userId
						}]
					});
					const sessionTTL = getTTLSeconds(data.expiresAt, now);
					if (sessionTTL > 0) await secondaryStorage.set(data.token, JSON.stringify({
						session: sessionData,
						user
					}), sessionTTL);
					return sessionData;
				},
				executeMainFn: storeInDb
			} : void 0);
		},
		findSession: async (token) => {
			if (secondaryStorage) {
				const sessionStringified = await secondaryStorage.get(token);
				if (!sessionStringified && !options.session?.storeSessionInDatabase) return null;
				if (sessionStringified) {
					const s = safeJSONParse(sessionStringified);
					if (!s) return null;
					return {
						session: parseSessionOutput(ctx.options, {
							...s.session,
							expiresAt: new Date(s.session.expiresAt),
							createdAt: new Date(s.session.createdAt),
							updatedAt: new Date(s.session.updatedAt)
						}),
						user: parseUserOutput(ctx.options, {
							...s.user,
							createdAt: new Date(s.user.createdAt),
							updatedAt: new Date(s.user.updatedAt)
						})
					};
				}
			}
			const result = await (await getCurrentAdapter(adapter)).findOne({
				model: "session",
				where: [{
					value: token,
					field: "token"
				}],
				join: { user: true }
			});
			if (!result) return null;
			const { user, ...session } = result;
			if (!user) return null;
			return {
				session: parseSessionOutput(ctx.options, session),
				user: parseUserOutput(ctx.options, user)
			};
		},
		findSessions: async (sessionTokens) => {
			if (secondaryStorage) {
				const sessions = [];
				for (const sessionToken of sessionTokens) {
					const sessionStringified = await secondaryStorage.get(sessionToken);
					if (sessionStringified) try {
						const s = typeof sessionStringified === "string" ? JSON.parse(sessionStringified) : sessionStringified;
						if (!s?.session) continue;
						const session = {
							session: {
								...s.session,
								expiresAt: new Date(s.session.expiresAt)
							},
							user: {
								...s.user,
								createdAt: new Date(s.user.createdAt),
								updatedAt: new Date(s.user.updatedAt)
							}
						};
						sessions.push(session);
					} catch {
						continue;
					}
				}
				return sessions;
			}
			const sessions = await (await getCurrentAdapter(adapter)).findMany({
				model: "session",
				where: [{
					field: "token",
					value: sessionTokens,
					operator: "in"
				}],
				join: { user: true }
			});
			if (!sessions.length) return [];
			if (sessions.some((session) => !session.user)) return [];
			return sessions.map((_session) => {
				const { user, ...session } = _session;
				return {
					session,
					user
				};
			});
		},
		updateSession: async (sessionToken, session) => {
			return await updateWithHooks(session, [{
				field: "token",
				value: sessionToken
			}], "session", secondaryStorage ? {
				async fn(data) {
					const currentSession = await secondaryStorage.get(sessionToken);
					if (!currentSession) return null;
					const parsedSession = safeJSONParse(currentSession);
					if (!parsedSession) return null;
					const mergedSession = {
						...parsedSession.session,
						...data,
						expiresAt: new Date(data.expiresAt ?? parsedSession.session.expiresAt),
						createdAt: new Date(parsedSession.session.createdAt),
						updatedAt: new Date(data.updatedAt ?? parsedSession.session.updatedAt)
					};
					const updatedSession = parseSessionOutput(ctx.options, mergedSession);
					const now = Date.now();
					const expiresMs = new Date(updatedSession.expiresAt).getTime();
					const sessionTTL = getTTLSeconds(expiresMs, now);
					if (sessionTTL > 0) {
						await secondaryStorage.set(sessionToken, JSON.stringify({
							session: updatedSession,
							user: parsedSession.user
						}), sessionTTL);
						const listKey = `active-sessions-${updatedSession.userId}`;
						const listRaw = await secondaryStorage.get(listKey);
						const sorted = (listRaw ? safeJSONParse(listRaw) || [] : []).filter((s) => s.token !== sessionToken && s.expiresAt > now).concat([{
							token: sessionToken,
							expiresAt: expiresMs
						}]).sort((a, b) => a.expiresAt - b.expiresAt);
						const furthestSessionExp = sorted.at(-1)?.expiresAt;
						if (furthestSessionExp && furthestSessionExp > now) await secondaryStorage.set(listKey, JSON.stringify(sorted), getTTLSeconds(furthestSessionExp, now));
						else await secondaryStorage.delete(listKey);
					}
					return updatedSession;
				},
				executeMainFn: options.session?.storeSessionInDatabase
			} : void 0);
		},
		deleteSession: async (token) => {
			if (secondaryStorage) {
				const data = await secondaryStorage.get(token);
				if (data) {
					const { session } = safeJSONParse(data) ?? {};
					if (!session) {
						logger.error("Session not found in secondary storage");
						return;
					}
					const userId = session.userId;
					const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
					if (currentList) {
						const list = safeJSONParse(currentList) || [];
						const now = Date.now();
						const filtered = list.filter((session) => session.expiresAt > now && session.token !== token);
						const furthestSessionExp = filtered.sort((a, b) => a.expiresAt - b.expiresAt).at(-1)?.expiresAt;
						if (filtered.length > 0 && furthestSessionExp && furthestSessionExp > Date.now()) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(filtered), getTTLSeconds(furthestSessionExp, now));
						else await secondaryStorage.delete(`active-sessions-${userId}`);
					} else logger.error("Active sessions list not found in secondary storage");
				}
				await secondaryStorage.delete(token);
				if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) return;
			}
			await deleteWithHooks([{
				field: "token",
				value: token
			}], "session", void 0);
		},
		deleteAccounts: async (userId) => {
			await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "account", void 0);
		},
		deleteAccount: async (accountId) => {
			await deleteWithHooks([{
				field: "id",
				value: accountId
			}], "account", void 0);
		},
		deleteSessions: async (userIdOrSessionTokens) => {
			if (secondaryStorage) {
				if (typeof userIdOrSessionTokens === "string") {
					const activeSession = await secondaryStorage.get(`active-sessions-${userIdOrSessionTokens}`);
					const sessions = activeSession ? safeJSONParse(activeSession) : [];
					if (!sessions) return;
					for (const session of sessions) await secondaryStorage.delete(session.token);
					await secondaryStorage.delete(`active-sessions-${userIdOrSessionTokens}`);
				} else for (const sessionToken of userIdOrSessionTokens) if (await secondaryStorage.get(sessionToken)) await secondaryStorage.delete(sessionToken);
				if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) return;
			}
			await deleteManyWithHooks([{
				field: Array.isArray(userIdOrSessionTokens) ? "token" : "userId",
				value: userIdOrSessionTokens,
				operator: Array.isArray(userIdOrSessionTokens) ? "in" : void 0
			}], "session", void 0);
		},
		findOAuthUser: async (email, accountId, providerId) => {
			const account = await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					value: accountId,
					field: "accountId"
				}, {
					value: providerId,
					field: "providerId"
				}],
				join: { user: true }
			});
			if (account) if (account.user) return {
				user: account.user,
				linkedAccount: account,
				accounts: [account]
			};
			else {
				const user = await (await getCurrentAdapter(adapter)).findOne({
					model: "user",
					where: [{
						value: email.toLowerCase(),
						field: "email"
					}]
				});
				if (user) return {
					user,
					linkedAccount: account,
					accounts: [account]
				};
				return null;
			}
			else {
				const user = await (await getCurrentAdapter(adapter)).findOne({
					model: "user",
					where: [{
						value: email.toLowerCase(),
						field: "email"
					}]
				});
				if (user) return {
					user,
					linkedAccount: null,
					accounts: await (await getCurrentAdapter(adapter)).findMany({
						model: "account",
						where: [{
							value: user.id,
							field: "userId"
						}]
					}) || []
				};
				else return null;
			}
		},
		findUserByEmail: async (email, options) => {
			const result = await (await getCurrentAdapter(adapter)).findOne({
				model: "user",
				where: [{
					value: email.toLowerCase(),
					field: "email"
				}],
				join: { ...options?.includeAccounts ? { account: true } : {} }
			});
			if (!result) return null;
			const { account: accounts, ...user } = result;
			return {
				user,
				accounts: accounts ?? []
			};
		},
		findUserById: async (userId) => {
			if (!userId) return null;
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "user",
				where: [{
					field: "id",
					value: userId
				}]
			});
		},
		linkAccount: async (account) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...account
			}, "account", void 0);
		},
		updateUser: async (userId, data) => {
			const user = await updateWithHooks(data, [{
				field: "id",
				value: userId
			}], "user", void 0);
			await refreshUserSessions(user);
			return user;
		},
		updateUserByEmail: async (email, data) => {
			const user = await updateWithHooks(data, [{
				field: "email",
				value: email.toLowerCase()
			}], "user", void 0);
			await refreshUserSessions(user);
			return user;
		},
		updatePassword: async (userId, password) => {
			await updateManyWithHooks({ password }, [{
				field: "userId",
				value: userId
			}, {
				field: "providerId",
				value: "credential"
			}], "account", void 0);
		},
		findAccounts: async (userId) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "account",
				where: [{
					field: "userId",
					value: userId
				}]
			});
		},
		findAccount: async (accountId) => {
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					field: "accountId",
					value: accountId
				}]
			});
		},
		findAccountByProviderId: async (accountId, providerId) => {
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					field: "accountId",
					value: accountId
				}, {
					field: "providerId",
					value: providerId
				}]
			});
		},
		findAccountByUserId: async (userId) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "account",
				where: [{
					field: "userId",
					value: userId
				}]
			});
		},
		updateAccount: async (id, data) => {
			return await updateWithHooks(data, [{
				field: "id",
				value: id
			}], "account", void 0);
		},
		createVerificationValue: async (data) => {
			const storageOption = getStorageOption(data.identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(data.identifier, storageOption);
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...data,
				identifier: storedIdentifier
			}, "verification", secondaryStorage ? {
				async fn(verificationData) {
					const ttl = getTTLSeconds(verificationData.expiresAt);
					if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify(verificationData), ttl);
					return verificationData;
				},
				executeMainFn: options.verification?.storeInDatabase
			} : void 0);
		},
		findVerificationValue: async (identifier) => {
			const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(identifier, storageOption);
			if (secondaryStorage) {
				const cached = await secondaryStorage.get(`verification:${storedIdentifier}`);
				if (cached) {
					const parsed = safeJSONParse(cached);
					if (parsed) return parsed;
				}
				if (storageOption && storageOption !== "plain") {
					const plainCached = await secondaryStorage.get(`verification:${identifier}`);
					if (plainCached) {
						const parsed = safeJSONParse(plainCached);
						if (parsed) return parsed;
					}
				}
				if (!options.verification?.storeInDatabase) return null;
			}
			const currentAdapter = await getCurrentAdapter(adapter);
			async function findByIdentifier(id) {
				return currentAdapter.findMany({
					model: "verification",
					where: [{
						field: "identifier",
						value: id
					}],
					sortBy: {
						field: "createdAt",
						direction: "desc"
					},
					limit: 1
				});
			}
			let verification = await findByIdentifier(storedIdentifier);
			if (!verification.length && storageOption && storageOption !== "plain") verification = await findByIdentifier(identifier);
			if (!options.verification?.disableCleanup) await deleteManyWithHooks([{
				field: "expiresAt",
				value: /* @__PURE__ */ new Date(),
				operator: "lt"
			}], "verification", void 0);
			return verification[0] || null;
		},
		deleteVerificationValue: async (id) => {
			if (!secondaryStorage || options.verification?.storeInDatabase) await deleteWithHooks([{
				field: "id",
				value: id
			}], "verification", void 0);
		},
		deleteVerificationByIdentifier: async (identifier) => {
			const storedIdentifier = await processIdentifier(identifier, getStorageOption(identifier, options.verification?.storeIdentifier));
			if (secondaryStorage) await secondaryStorage.delete(`verification:${storedIdentifier}`);
			if (!secondaryStorage || options.verification?.storeInDatabase) await deleteWithHooks([{
				field: "identifier",
				value: storedIdentifier
			}], "verification", void 0);
		},
		updateVerificationValue: async (id, data) => {
			return await updateWithHooks(data, [{
				field: "id",
				value: id
			}], "verification", void 0);
		}
	};
};
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __exportAll = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp$1(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp$1(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
function getSchema$1(config) {
	const tables = getAuthTables(config);
	const schema = {};
	for (const key in tables) {
		const table = tables[key];
		const fields = table.fields;
		const actualFields = {};
		Object.entries(fields).forEach(([key, field]) => {
			actualFields[field.fieldName || key] = field;
			if (field.references) {
				const refTable = tables[field.references.model];
				if (refTable) actualFields[field.fieldName || key].references = {
					...field.references,
					model: refTable.modelName,
					field: field.references.field
				};
			}
		});
		if (schema[table.modelName]) {
			schema[table.modelName].fields = {
				...schema[table.modelName].fields,
				...actualFields
			};
			continue;
		}
		schema[table.modelName] = {
			fields: actualFields,
			order: table.order || Infinity
		};
	}
	return schema;
}
function convertToDB(fields, values) {
	const result = values.id ? { id: values.id } : {};
	for (const key in fields) {
		const field = fields[key];
		const value = values[key];
		if (value === void 0) continue;
		result[field.fieldName || key] = value;
	}
	return result;
}
function convertFromDB(fields, values) {
	if (!values) return null;
	const result = { id: values.id };
	for (const [key, value] of Object.entries(fields)) result[key] = values[value.fieldName || key];
	return result;
}
function toZodSchema({ fields, isClientSide }) {
	return object(Object.keys(fields).reduce((acc, key) => {
		const field = fields[key];
		if (!field) return acc;
		if (isClientSide && field.input === false) return acc;
		let schema;
		if (field.type === "json") schema = json ? json() : any();
		else if (field.type === "string[]" || field.type === "number[]") schema = array(field.type === "string[]" ? string() : number());
		else if (Array.isArray(field.type)) schema = any();
		else schema = zod_exports[field.type]();
		if (field?.required === false) schema = schema.optional();
		if (!isClientSide && field?.returned === false) return acc;
		return {
			...acc,
			[key]: schema
		};
	}, {}));
}
var db_exports = /* @__PURE__ */ __exportAll({
	convertFromDB: () => convertFromDB,
	convertToDB: () => convertToDB,
	createInternalAdapter: () => createInternalAdapter,
	getSchema: () => getSchema$1,
	getWithHooks: () => getWithHooks,
	mergeSchema: () => mergeSchema,
	parseAccountInput: () => parseAccountInput,
	parseAccountOutput: () => parseAccountOutput,
	parseAdditionalUserInput: () => parseAdditionalUserInput,
	parseInputData: () => parseInputData,
	parseSessionInput: () => parseSessionInput,
	parseSessionOutput: () => parseSessionOutput,
	parseUserInput: () => parseUserInput,
	parseUserOutput: () => parseUserOutput,
	toZodSchema: () => toZodSchema
});
__reExport(db_exports, db_exports$1);
function isPromise(obj) {
	return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
function isPlainObject(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
	if (!isPlainObject(defaults)) return _defu(baseObject, {}, namespace, merger);
	const object = Object.assign({}, defaults);
	for (const key in baseObject) {
		if (key === "__proto__" || key === "constructor") continue;
		const value = baseObject[key];
		if (value === null || value === void 0) continue;
		if (merger && merger(object, key, value, namespace)) continue;
		if (Array.isArray(value) && Array.isArray(object[key])) object[key] = [...value, ...object[key]];
		else if (isPlainObject(value) && isPlainObject(object[key])) object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
		else object[key] = value;
	}
	return object;
}
function createDefu(merger) {
	return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
var defu = createDefu();
createDefu((object, key, currentValue) => {
	if (object[key] !== void 0 && typeof currentValue === "function") {
		object[key] = currentValue(object[key]);
		return true;
	}
});
createDefu((object, key, currentValue) => {
	if (Array.isArray(object[key]) && typeof currentValue === "function") {
		object[key] = currentValue(object[key]);
		return true;
	}
});
async function runPluginInit(context) {
	let options = context.options;
	const plugins = options.plugins || [];
	const dbHooks = [];
	for (const plugin of plugins) if (plugin.init) {
		const initPromise = plugin.init(context);
		let result;
		if (isPromise(initPromise)) result = await initPromise;
		else result = initPromise;
		if (typeof result === "object") {
			if (result.options) {
				const { databaseHooks, ...restOpts } = result.options;
				if (databaseHooks) dbHooks.push(databaseHooks);
				options = defu(options, restOpts);
			}
			if (result.context) Object.assign(context, result.context);
		}
	}
	dbHooks.push(options.databaseHooks);
	context.internalAdapter = createInternalAdapter(context.adapter, {
		options,
		logger: context.logger,
		hooks: dbHooks.filter((u) => u !== void 0),
		generateId: context.generateId
	});
	context.options = options;
}
function getInternalPlugins(options) {
	const plugins = [];
	if (options.advanced?.crossSubDomainCookies?.enabled) {}
	return plugins;
}
async function getTrustedOrigins(options, request) {
	const baseURL = getBaseURL(options.baseURL, options.basePath, request);
	const trustedOrigins = baseURL ? [new URL(baseURL).origin] : [];
	if (options.trustedOrigins) {
		if (Array.isArray(options.trustedOrigins)) trustedOrigins.push(...options.trustedOrigins);
		if (typeof options.trustedOrigins === "function") {
			const validOrigins = await options.trustedOrigins(request);
			trustedOrigins.push(...validOrigins);
		}
	}
	const envTrustedOrigins = env.BETTER_AUTH_TRUSTED_ORIGINS;
	if (envTrustedOrigins) trustedOrigins.push(...envTrustedOrigins.split(","));
	return trustedOrigins.filter((v) => Boolean(v));
}
async function getAwaitableValue(arr, item) {
	if (!arr) return void 0;
	for (const val of arr) {
		const value = typeof val === "function" ? await val() : val;
		if (value[item.field ?? "id"] === item.value) return value;
	}
}
function isErrorStackTraceLimitWritable() {
	const desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
	if (desc === void 0) return Object.isExtensible(Error);
	return Object.prototype.hasOwnProperty.call(desc, "writable") ? desc.writable : desc.set !== void 0;
}
/**
* Hide internal stack frames from the error stack trace.
*/
function hideInternalStackFrames(stack) {
	const lines = stack.split("\n    at ");
	if (lines.length <= 1) return stack;
	lines.splice(1, 1);
	return lines.join("\n    at ");
}
/**
* Creates a custom error class that hides stack frames.
*/
function makeErrorForHideStackFrame(Base, clazz) {
	class HideStackFramesError extends Base {
		#hiddenStack;
		constructor(...args) {
			if (isErrorStackTraceLimitWritable()) {
				const limit = Error.stackTraceLimit;
				Error.stackTraceLimit = 0;
				super(...args);
				Error.stackTraceLimit = limit;
			} else super(...args);
			const stack = (/* @__PURE__ */ new Error()).stack;
			if (stack) this.#hiddenStack = hideInternalStackFrames(stack.replace(/^Error/, this.name));
		}
		get errorStack() {
			return this.#hiddenStack;
		}
	}
	Object.defineProperty(HideStackFramesError.prototype, "constructor", {
		get() {
			return clazz;
		},
		enumerable: false,
		configurable: true
	});
	return HideStackFramesError;
}
var statusCodes = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	MULTIPLE_CHOICES: 300,
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	SEE_OTHER: 303,
	NOT_MODIFIED: 304,
	TEMPORARY_REDIRECT: 307,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	"I'M_A_TEAPOT": 418,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_ENTITY: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NOT_EXTENDED: 510,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var InternalAPIError = class extends Error {
	constructor(status = "INTERNAL_SERVER_ERROR", body = void 0, headers = {}, statusCode = typeof status === "number" ? status : statusCodes[status]) {
		super(body?.message, body?.cause ? { cause: body.cause } : void 0);
		this.status = status;
		this.body = body;
		this.headers = headers;
		this.statusCode = statusCode;
		this.name = "APIError";
		this.status = status;
		this.headers = headers;
		this.statusCode = statusCode;
		this.body = body ? {
			code: body?.message?.toUpperCase().replace(/ /g, "_").replace(/[^A-Z0-9_]/g, ""),
			...body
		} : void 0;
	}
};
var ValidationError$1 = class extends InternalAPIError {
	constructor(message, issues) {
		super(400, {
			message,
			code: "VALIDATION_ERROR"
		});
		this.message = message;
		this.issues = issues;
		this.issues = issues;
	}
};
var BetterCallError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "BetterCallError";
	}
};
var kAPIErrorHeaderSymbol = Symbol.for("better-call:api-error-headers");
var APIError$2 = makeErrorForHideStackFrame(InternalAPIError, Error);
var jsonContentTypeRegex = /^application\/([a-z0-9.+-]*\+)?json/i;
async function getBody$1(request, allowedMediaTypes) {
	const contentType = request.headers.get("content-type") || "";
	const normalizedContentType = contentType.toLowerCase();
	if (!request.body) return;
	if (allowedMediaTypes && allowedMediaTypes.length > 0) {
		if (!allowedMediaTypes.some((allowed) => {
			const normalizedContentTypeBase = normalizedContentType.split(";")[0].trim();
			const normalizedAllowed = allowed.toLowerCase().trim();
			return normalizedContentTypeBase === normalizedAllowed || normalizedContentTypeBase.includes(normalizedAllowed);
		})) {
			if (!normalizedContentType) throw new APIError$2(415, {
				message: `Content-Type is required. Allowed types: ${allowedMediaTypes.join(", ")}`,
				code: "UNSUPPORTED_MEDIA_TYPE"
			});
			throw new APIError$2(415, {
				message: `Content-Type "${contentType}" is not allowed. Allowed types: ${allowedMediaTypes.join(", ")}`,
				code: "UNSUPPORTED_MEDIA_TYPE"
			});
		}
	}
	if (jsonContentTypeRegex.test(normalizedContentType)) return await request.json();
	if (normalizedContentType.includes("application/x-www-form-urlencoded")) {
		const formData = await request.formData();
		const result = {};
		formData.forEach((value, key) => {
			result[key] = value.toString();
		});
		return result;
	}
	if (normalizedContentType.includes("multipart/form-data")) {
		const formData = await request.formData();
		const result = {};
		formData.forEach((value, key) => {
			result[key] = value;
		});
		return result;
	}
	if (normalizedContentType.includes("text/plain")) return await request.text();
	if (normalizedContentType.includes("application/octet-stream")) return await request.arrayBuffer();
	if (normalizedContentType.includes("application/pdf") || normalizedContentType.includes("image/") || normalizedContentType.includes("video/")) return await request.blob();
	if (normalizedContentType.includes("application/stream") || request.body instanceof ReadableStream) return request.body;
	return await request.text();
}
function isAPIError$1(error) {
	return error instanceof APIError$2 || error?.name === "APIError";
}
function tryDecode(str) {
	try {
		return str.includes("%") ? decodeURIComponent(str) : str;
	} catch {
		return str;
	}
}
async function tryCatch(promise) {
	try {
		return {
			data: await promise,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error
		};
	}
}
/**
* Check if an object is a `Request`
* - `instanceof`: works for native Request instances
* - `toString`: handles where instanceof check fails but the object is still a valid Request
*/
function isRequest(obj) {
	return obj instanceof Request || Object.prototype.toString.call(obj) === "[object Request]";
}
function isJSONSerializable$1(value) {
	if (value === void 0) return false;
	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
	if (t !== "object") return false;
	if (Array.isArray(value)) return true;
	if (value.buffer) return false;
	return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function safeStringify(obj, replacer, space) {
	let id = 0;
	const seen = /* @__PURE__ */ new WeakMap();
	const safeReplacer = (key, value) => {
		if (typeof value === "bigint") return value.toString();
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) return `[Circular ref-${seen.get(value)}]`;
			seen.set(value, id++);
		}
		if (replacer) return replacer(key, value);
		return value;
	};
	return JSON.stringify(obj, safeReplacer, space);
}
function isJSONResponse(value) {
	if (!value || typeof value !== "object") return false;
	return "_flag" in value && value._flag === "json";
}
function toResponse(data, init) {
	if (data instanceof Response) {
		if (init?.headers instanceof Headers) init.headers.forEach((value, key) => {
			data.headers.set(key, value);
		});
		return data;
	}
	if (isJSONResponse(data)) {
		const body$1 = data.body;
		const routerResponse = data.routerResponse;
		if (routerResponse instanceof Response) return routerResponse;
		const headers$1 = new Headers();
		if (routerResponse?.headers) {
			const headers$2 = new Headers(routerResponse.headers);
			for (const [key, value] of headers$2.entries()) headers$2.set(key, value);
		}
		if (data.headers) for (const [key, value] of new Headers(data.headers).entries()) headers$1.set(key, value);
		if (init?.headers) for (const [key, value] of new Headers(init.headers).entries()) headers$1.set(key, value);
		headers$1.set("Content-Type", "application/json");
		return new Response(JSON.stringify(body$1), {
			...routerResponse,
			headers: headers$1,
			status: data.status ?? init?.status ?? routerResponse?.status,
			statusText: init?.statusText ?? routerResponse?.statusText
		});
	}
	if (isAPIError$1(data)) return toResponse(data.body, {
		status: init?.status ?? data.statusCode,
		statusText: data.status.toString(),
		headers: init?.headers || data.headers
	});
	let body = data;
	let headers = new Headers(init?.headers);
	if (!data) {
		if (data === null) body = JSON.stringify(null);
		headers.set("content-type", "application/json");
	} else if (typeof data === "string") {
		body = data;
		headers.set("Content-Type", "text/plain");
	} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
		body = data;
		headers.set("Content-Type", "application/octet-stream");
	} else if (data instanceof Blob) {
		body = data;
		headers.set("Content-Type", data.type || "application/octet-stream");
	} else if (data instanceof FormData) body = data;
	else if (data instanceof URLSearchParams) {
		body = data;
		headers.set("Content-Type", "application/x-www-form-urlencoded");
	} else if (data instanceof ReadableStream) {
		body = data;
		headers.set("Content-Type", "application/octet-stream");
	} else if (isJSONSerializable$1(data)) {
		body = safeStringify(data);
		headers.set("Content-Type", "application/json");
	}
	return new Response(body, {
		...init,
		headers
	});
}
var algorithm = {
	name: "HMAC",
	hash: "SHA-256"
};
var getCryptoKey$2 = async (secret) => {
	const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
	return await getWebcryptoSubtle().importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
};
var verifySignature = async (base64Signature, value, secret) => {
	try {
		const signatureBinStr = atob(base64Signature);
		const signature = new Uint8Array(signatureBinStr.length);
		for (let i = 0, len = signatureBinStr.length; i < len; i++) signature[i] = signatureBinStr.charCodeAt(i);
		return await getWebcryptoSubtle().verify(algorithm, secret, signature, new TextEncoder().encode(value));
	} catch (e) {
		return false;
	}
};
var makeSignature = async (value, secret) => {
	const key = await getCryptoKey$2(secret);
	const signature = await getWebcryptoSubtle().sign(algorithm.name, key, new TextEncoder().encode(value));
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
};
var signCookieValue = async (value, secret) => {
	const signature = await makeSignature(value, secret);
	value = `${value}.${signature}`;
	value = encodeURIComponent(value);
	return value;
};
var getCookieKey = (key, prefix) => {
	let finalKey = key;
	if (prefix) if (prefix === "secure") finalKey = "__Secure-" + key;
	else if (prefix === "host") finalKey = "__Host-" + key;
	else return;
	return finalKey;
};
/**
* Parse an HTTP Cookie header string and returning an object of all cookie
* name-value pairs.
*
* Inspired by https://github.com/unjs/cookie-es/blob/main/src/cookie/parse.ts
*
* @param str the string representing a `Cookie` header value
*/
function parseCookies(str) {
	if (typeof str !== "string") throw new TypeError("argument str must be a string");
	const cookies = /* @__PURE__ */ new Map();
	let index = 0;
	while (index < str.length) {
		const eqIdx = str.indexOf("=", index);
		if (eqIdx === -1) break;
		let endIdx = str.indexOf(";", index);
		if (endIdx === -1) endIdx = str.length;
		else if (endIdx < eqIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = str.slice(index, eqIdx).trim();
		if (!cookies.has(key)) {
			let val = str.slice(eqIdx + 1, endIdx).trim();
			if (val.codePointAt(0) === 34) val = val.slice(1, -1);
			cookies.set(key, tryDecode(val));
		}
		index = endIdx + 1;
	}
	return cookies;
}
var _serialize = (key, value, opt = {}) => {
	let cookie;
	if (opt?.prefix === "secure") cookie = `${`__Secure-${key}`}=${value}`;
	else if (opt?.prefix === "host") cookie = `${`__Host-${key}`}=${value}`;
	else cookie = `${key}=${value}`;
	if (key.startsWith("__Secure-") && !opt.secure) opt.secure = true;
	if (key.startsWith("__Host-")) {
		if (!opt.secure) opt.secure = true;
		if (opt.path !== "/") opt.path = "/";
		if (opt.domain) opt.domain = void 0;
	}
	if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
		if (opt.maxAge > 3456e4) throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
		cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
	}
	if (opt.domain && opt.prefix !== "host") cookie += `; Domain=${opt.domain}`;
	if (opt.path) cookie += `; Path=${opt.path}`;
	if (opt.expires) {
		if (opt.expires.getTime() - Date.now() > 3456e7) throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
		cookie += `; Expires=${opt.expires.toUTCString()}`;
	}
	if (opt.httpOnly) cookie += "; HttpOnly";
	if (opt.secure) cookie += "; Secure";
	if (opt.sameSite) cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
	if (opt.partitioned) {
		if (!opt.secure) opt.secure = true;
		cookie += "; Partitioned";
	}
	return cookie;
};
var serializeCookie = (key, value, opt) => {
	value = encodeURIComponent(value);
	return _serialize(key, value, opt);
};
var serializeSignedCookie = async (key, value, secret, opt) => {
	value = await signCookieValue(value, secret);
	return _serialize(key, value, opt);
};
/**
* Runs validation on body and query
* @returns error and data object
*/
async function runValidation(options, context = {}) {
	let request = {
		body: context.body,
		query: context.query
	};
	if (options.body) {
		const result = await options.body["~standard"].validate(context.body);
		if (result.issues) return {
			data: null,
			error: fromError(result.issues, "body")
		};
		request.body = result.value;
	}
	if (options.query) {
		const result = await options.query["~standard"].validate(context.query);
		if (result.issues) return {
			data: null,
			error: fromError(result.issues, "query")
		};
		request.query = result.value;
	}
	if (options.requireHeaders && !context.headers) return {
		data: null,
		error: {
			message: "Headers is required",
			issues: []
		}
	};
	if (options.requireRequest && !context.request) return {
		data: null,
		error: {
			message: "Request is required",
			issues: []
		}
	};
	return {
		data: request,
		error: null
	};
}
function fromError(error, validating) {
	return {
		message: error.map((e) => {
			return `[${e.path?.length ? `${validating}.` + e.path.map((x) => typeof x === "object" ? x.key : x).join(".") : validating}] ${e.message}`;
		}).join("; "),
		issues: error
	};
}
var createInternalContext = async (context, { options, path }) => {
	const headers = new Headers();
	let responseStatus = void 0;
	const { data, error } = await runValidation(options, context);
	if (error) throw new ValidationError$1(error.message, error.issues);
	const requestHeaders = "headers" in context ? context.headers instanceof Headers ? context.headers : new Headers(context.headers) : "request" in context && isRequest(context.request) ? context.request.headers : null;
	const requestCookies = requestHeaders?.get("cookie");
	const parsedCookies = requestCookies ? parseCookies(requestCookies) : void 0;
	const internalContext = {
		...context,
		body: data.body,
		query: data.query,
		path: context.path || path || "virtual:",
		context: "context" in context && context.context ? context.context : {},
		returned: void 0,
		headers: context?.headers,
		request: context?.request,
		params: "params" in context ? context.params : void 0,
		method: context.method ?? (Array.isArray(options.method) ? options.method[0] : options.method === "*" ? "GET" : options.method),
		setHeader: (key, value) => {
			headers.set(key, value);
		},
		getHeader: (key) => {
			if (!requestHeaders) return null;
			return requestHeaders.get(key);
		},
		getCookie: (key, prefix) => {
			const finalKey = getCookieKey(key, prefix);
			if (!finalKey) return null;
			return parsedCookies?.get(finalKey) || null;
		},
		getSignedCookie: async (key, secret, prefix) => {
			const finalKey = getCookieKey(key, prefix);
			if (!finalKey) return null;
			const value = parsedCookies?.get(finalKey);
			if (!value) return null;
			const signatureStartPos = value.lastIndexOf(".");
			if (signatureStartPos < 1) return null;
			const signedValue = value.substring(0, signatureStartPos);
			const signature = value.substring(signatureStartPos + 1);
			if (signature.length !== 44 || !signature.endsWith("=")) return null;
			return await verifySignature(signature, signedValue, await getCryptoKey$2(secret)) ? signedValue : false;
		},
		setCookie: (key, value, options$1) => {
			const cookie = serializeCookie(key, value, options$1);
			headers.append("set-cookie", cookie);
			return cookie;
		},
		setSignedCookie: async (key, value, secret, options$1) => {
			const cookie = await serializeSignedCookie(key, value, secret, options$1);
			headers.append("set-cookie", cookie);
			return cookie;
		},
		redirect: (url) => {
			headers.set("location", url);
			return new APIError$2("FOUND", void 0, headers);
		},
		error: (status, body, headers$1) => {
			return new APIError$2(status, body, headers$1);
		},
		setStatus: (status) => {
			responseStatus = status;
		},
		json: (json, routerResponse) => {
			if (!context.asResponse) return json;
			return {
				body: routerResponse?.body || json,
				routerResponse,
				_flag: "json"
			};
		},
		responseHeaders: headers,
		get responseStatus() {
			return responseStatus;
		}
	};
	for (const middleware of options.use || []) {
		const response = await middleware({
			...internalContext,
			returnHeaders: true,
			asResponse: false
		});
		if (response.response) Object.assign(internalContext.context, response.response);
		/**
		* Apply headers from the middleware to the endpoint headers
		*/
		if (response.headers) response.headers.forEach((value, key) => {
			internalContext.responseHeaders.set(key, value);
		});
	}
	return internalContext;
};
function createEndpoint(pathOrOptions, handlerOrOptions, handlerOrNever) {
	const path = typeof pathOrOptions === "string" ? pathOrOptions : void 0;
	const options = typeof handlerOrOptions === "object" ? handlerOrOptions : pathOrOptions;
	const handler = typeof handlerOrOptions === "function" ? handlerOrOptions : handlerOrNever;
	if ((options.method === "GET" || options.method === "HEAD") && options.body) throw new BetterCallError("Body is not allowed with GET or HEAD methods");
	if (path && /\/{2,}/.test(path)) throw new BetterCallError("Path cannot contain consecutive slashes");
	const internalHandler = async (...inputCtx) => {
		const context = inputCtx[0] || {};
		const { data: internalContext, error: validationError } = await tryCatch(createInternalContext(context, {
			options,
			path
		}));
		if (validationError) {
			if (!(validationError instanceof ValidationError$1)) throw validationError;
			if (options.onValidationError) await options.onValidationError({
				message: validationError.message,
				issues: validationError.issues
			});
			throw new APIError$2(400, {
				message: validationError.message,
				code: "VALIDATION_ERROR"
			});
		}
		const response = await handler(internalContext).catch(async (e) => {
			if (isAPIError$1(e)) {
				const onAPIError = options.onAPIError;
				if (onAPIError) await onAPIError(e);
				if (context.asResponse) return e;
			}
			throw e;
		});
		const headers = internalContext.responseHeaders;
		const status = internalContext.responseStatus;
		return context.asResponse ? toResponse(response, {
			headers,
			status
		}) : context.returnHeaders ? context.returnStatus ? {
			headers,
			response,
			status
		} : {
			headers,
			response
		} : context.returnStatus ? {
			response,
			status
		} : response;
	};
	internalHandler.options = options;
	internalHandler.path = path;
	return internalHandler;
}
createEndpoint.create = (opts) => {
	return (path, options, handler) => {
		return createEndpoint(path, {
			...options,
			use: [...options?.use || [], ...opts?.use || []]
		}, handler);
	};
};
function createMiddleware(optionsOrHandler, handler) {
	const internalHandler = async (inputCtx) => {
		const context = inputCtx;
		const _handler = typeof optionsOrHandler === "function" ? optionsOrHandler : handler;
		const internalContext = await createInternalContext(context, {
			options: typeof optionsOrHandler === "function" ? {} : optionsOrHandler,
			path: "/"
		});
		if (!_handler) throw new Error("handler must be defined");
		try {
			const response = await _handler(internalContext);
			const headers = internalContext.responseHeaders;
			return context.returnHeaders ? {
				headers,
				response
			} : response;
		} catch (e) {
			if (isAPIError$1(e)) Object.defineProperty(e, kAPIErrorHeaderSymbol, {
				enumerable: false,
				configurable: false,
				get() {
					return internalContext.responseHeaders;
				}
			});
			throw e;
		}
	};
	internalHandler.options = typeof optionsOrHandler === "function" ? {} : optionsOrHandler;
	return internalHandler;
}
createMiddleware.create = (opts) => {
	function fn(optionsOrHandler, handler) {
		if (typeof optionsOrHandler === "function") return createMiddleware({ use: opts?.use }, optionsOrHandler);
		if (!handler) throw new Error("Middleware handler is required");
		return createMiddleware({
			...optionsOrHandler,
			method: "*",
			use: [...opts?.use || [], ...optionsOrHandler.use || []]
		}, handler);
	}
	return fn;
};
var paths = {};
function getTypeFromZodType$1(zodType) {
	switch (zodType.constructor.name) {
		case "ZodString": return "string";
		case "ZodNumber": return "number";
		case "ZodBoolean": return "boolean";
		case "ZodObject": return "object";
		case "ZodArray": return "array";
		default: return "string";
	}
}
function getParameters$1(options) {
	const parameters = [];
	if (options.metadata?.openapi?.parameters) {
		parameters.push(...options.metadata.openapi.parameters);
		return parameters;
	}
	if (options.query instanceof ZodObject) Object.entries(options.query.shape).forEach(([key, value]) => {
		if (value instanceof ZodObject) parameters.push({
			name: key,
			in: "query",
			schema: {
				type: getTypeFromZodType$1(value),
				..."minLength" in value && value.minLength ? { minLength: value.minLength } : {},
				description: value.description
			}
		});
	});
	return parameters;
}
function getRequestBody$1(options) {
	if (options.metadata?.openapi?.requestBody) return options.metadata.openapi.requestBody;
	if (!options.body) return void 0;
	if (options.body instanceof ZodObject || options.body instanceof ZodOptional) {
		const shape = options.body.shape;
		if (!shape) return void 0;
		const properties = {};
		const required = [];
		Object.entries(shape).forEach(([key, value]) => {
			if (value instanceof ZodObject) {
				properties[key] = {
					type: getTypeFromZodType$1(value),
					description: value.description
				};
				if (!(value instanceof ZodOptional)) required.push(key);
			}
		});
		return {
			required: options.body instanceof ZodOptional ? false : options.body ? true : false,
			content: { "application/json": { schema: {
				type: "object",
				properties,
				required
			} } }
		};
	}
}
function getResponse$1(responses) {
	return {
		"400": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } },
				required: ["message"]
			} } },
			description: "Bad Request. Usually due to missing parameters, or invalid parameters."
		},
		"401": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } },
				required: ["message"]
			} } },
			description: "Unauthorized. Due to missing or invalid authentication."
		},
		"403": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Forbidden. You do not have permission to access this resource or to perform this action."
		},
		"404": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Not Found. The requested resource was not found."
		},
		"429": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Too Many Requests. You have exceeded the rate limit. Try again later."
		},
		"500": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Internal Server Error. This is a problem with the server that you cannot fix."
		},
		...responses
	};
}
async function generator$1(endpoints, config) {
	const components = { schemas: {} };
	Object.entries(endpoints).forEach(([_, value]) => {
		const options = value.options;
		if (!value.path || options.metadata?.SERVER_ONLY) return;
		if (options.method === "GET") paths[value.path] = { get: {
			tags: ["Default", ...options.metadata?.openapi?.tags || []],
			description: options.metadata?.openapi?.description,
			operationId: options.metadata?.openapi?.operationId,
			security: [{ bearerAuth: [] }],
			parameters: getParameters$1(options),
			responses: getResponse$1(options.metadata?.openapi?.responses)
		} };
		if (options.method === "POST") {
			const body = getRequestBody$1(options);
			paths[value.path] = { post: {
				tags: ["Default", ...options.metadata?.openapi?.tags || []],
				description: options.metadata?.openapi?.description,
				operationId: options.metadata?.openapi?.operationId,
				security: [{ bearerAuth: [] }],
				parameters: getParameters$1(options),
				...body ? { requestBody: body } : { requestBody: { content: { "application/json": { schema: {
					type: "object",
					properties: {}
				} } } } },
				responses: getResponse$1(options.metadata?.openapi?.responses)
			} };
		}
	});
	return {
		openapi: "3.1.1",
		info: {
			title: "Better Auth",
			description: "API Reference for your Better Auth Instance",
			version: "1.1.0"
		},
		components,
		security: [{ apiKeyCookie: [] }],
		servers: [{ url: config?.url }],
		tags: [{
			name: "Default",
			description: "Default endpoints that are included with Better Auth by default. These endpoints are not part of any plugin."
		}],
		paths
	};
}
var getHTML$1 = (apiReference, config) => `<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json">
    ${JSON.stringify(apiReference)}
    <\/script>
	 <script>
      var configuration = {
	  	favicon: ${config?.logo ? `data:image/svg+xml;utf8,${encodeURIComponent(config.logo)}` : void 0} ,
	   	theme: ${config?.theme || "saturn"},
        metaData: {
			title: ${config?.title || "Open API Reference"},
			description: ${config?.description || "Better Call Open API"},
		}
      }
      document.getElementById('api-reference').dataset.configuration =
        JSON.stringify(configuration)
    <\/script>
	  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"><\/script>
  </body>
</html>`;
var createRouter$1 = (endpoints, config) => {
	if (!config?.openapi?.disabled) {
		const openapi = {
			path: "/api/reference",
			...config?.openapi
		};
		endpoints["openapi"] = createEndpoint(openapi.path, { method: "GET" }, async (c) => {
			const schema = await generator$1(endpoints);
			return new Response(getHTML$1(schema, openapi.scalar), { headers: { "Content-Type": "text/html" } });
		});
	}
	const router = createRouter$2();
	const middlewareRouter = createRouter$2();
	for (const endpoint of Object.values(endpoints)) {
		if (!endpoint.options || !endpoint.path) continue;
		if (endpoint.options?.metadata?.SERVER_ONLY) continue;
		const methods = Array.isArray(endpoint.options?.method) ? endpoint.options.method : [endpoint.options?.method];
		for (const method of methods) addRoute(router, method, endpoint.path, endpoint);
	}
	if (config?.routerMiddleware?.length) for (const { path, middleware } of config.routerMiddleware) addRoute(middlewareRouter, "*", path, middleware);
	const processRequest = async (request) => {
		const url = new URL(request.url);
		const pathname = url.pathname;
		const path = config?.basePath && config.basePath !== "/" ? pathname.split(config.basePath).reduce((acc, curr, index) => {
			if (index !== 0) if (index > 1) acc.push(`${config.basePath}${curr}`);
			else acc.push(curr);
			return acc;
		}, []).join("") : url.pathname;
		if (!path?.length) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		if (/\/{2,}/.test(path)) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		const route = findRoute(router, request.method, path);
		if (path.endsWith("/") !== route?.data?.path?.endsWith("/") && !config?.skipTrailingSlashes) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		if (!route?.data) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		const query = {};
		url.searchParams.forEach((value, key) => {
			if (key in query) if (Array.isArray(query[key])) query[key].push(value);
			else query[key] = [query[key], value];
			else query[key] = value;
		});
		const handler = route.data;
		try {
			const allowedMediaTypes = handler.options.metadata?.allowedMediaTypes || config?.allowedMediaTypes;
			const context = {
				path,
				method: request.method,
				headers: request.headers,
				params: route.params ? JSON.parse(JSON.stringify(route.params)) : {},
				request,
				body: handler.options.disableBody ? void 0 : await getBody$1(handler.options.cloneRequest ? request.clone() : request, allowedMediaTypes),
				query,
				_flag: "router",
				asResponse: true,
				context: config?.routerContext
			};
			const middlewareRoutes = findAllRoutes(middlewareRouter, "*", path);
			if (middlewareRoutes?.length) for (const { data: middleware, params } of middlewareRoutes) {
				const res = await middleware({
					...context,
					params,
					asResponse: false
				});
				if (res instanceof Response) return res;
			}
			return await handler(context);
		} catch (error) {
			if (config?.onError) try {
				const errorResponse = await config.onError(error);
				if (errorResponse instanceof Response) return toResponse(errorResponse);
			} catch (error$1) {
				if (isAPIError$1(error$1)) return toResponse(error$1);
				throw error$1;
			}
			if (config?.throwError) throw error;
			if (isAPIError$1(error)) return toResponse(error);
			console.error(`# SERVER_ERROR: `, error);
			return new Response(null, {
				status: 500,
				statusText: "Internal Server Error"
			});
		}
	};
	return {
		handler: async (request) => {
			const onReq = await config?.onRequest?.(request);
			if (onReq instanceof Response) return onReq;
			const res = await processRequest(isRequest(onReq) ? onReq : request);
			const onRes = await config?.onResponse?.(res);
			if (onRes instanceof Response) return onRes;
			return res;
		},
		endpoints
	};
};
function isAPIError(error) {
	return error instanceof APIError$2 || error instanceof APIError || error?.name === "APIError";
}
/**
* Escapes a character if it has a special meaning in regular expressions
* and returns the character as is if it doesn't
*/
function escapeRegExpChar(char) {
	if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") return `\\${char}`;
	else return char;
}
/**
* Escapes all characters in a given string that have a special meaning in regular expressions
*/
function escapeRegExpString(str) {
	let result = "";
	for (let i = 0; i < str.length; i++) result += escapeRegExpChar(str[i]);
	return result;
}
/**
* Transforms one or more glob patterns into a RegExp pattern
*/
function transform(pattern, separator = true) {
	if (Array.isArray(pattern)) return `(?:${pattern.map((p) => `^${transform(p, separator)}$`).join("|")})`;
	let separatorSplitter = "";
	let separatorMatcher = "";
	let wildcard = ".";
	if (separator === true) {
		separatorSplitter = "/";
		separatorMatcher = "[/\\\\]";
		wildcard = "[^/\\\\]";
	} else if (separator) {
		separatorSplitter = separator;
		separatorMatcher = escapeRegExpString(separatorSplitter);
		if (separatorMatcher.length > 1) {
			separatorMatcher = `(?:${separatorMatcher})`;
			wildcard = `((?!${separatorMatcher}).)`;
		} else wildcard = `[^${separatorMatcher}]`;
	}
	const requiredSeparator = separator ? `${separatorMatcher}+?` : "";
	const optionalSeparator = separator ? `${separatorMatcher}*?` : "";
	const segments = separator ? pattern.split(separatorSplitter) : [pattern];
	let result = "";
	for (let s = 0; s < segments.length; s++) {
		const segment = segments[s];
		const nextSegment = segments[s + 1];
		let currentSeparator = "";
		if (!segment && s > 0) continue;
		if (separator) if (s === segments.length - 1) currentSeparator = optionalSeparator;
		else if (nextSegment !== "**") currentSeparator = requiredSeparator;
		else currentSeparator = "";
		if (separator && segment === "**") {
			if (currentSeparator) {
				result += s === 0 ? "" : currentSeparator;
				result += `(?:${wildcard}*?${currentSeparator})*?`;
			}
			continue;
		}
		for (let c = 0; c < segment.length; c++) {
			const char = segment[c];
			if (char === "\\") {
				if (c < segment.length - 1) {
					result += escapeRegExpChar(segment[c + 1]);
					c++;
				}
			} else if (char === "?") result += wildcard;
			else if (char === "*") result += `${wildcard}*?`;
			else result += escapeRegExpChar(char);
		}
		result += currentSeparator;
	}
	return result;
}
function isMatch(regexp, sample) {
	if (typeof sample !== "string") throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
	return regexp.test(sample);
}
/**
* Compiles one or more glob patterns into a RegExp and returns an isMatch function.
* The isMatch function takes a sample string as its only argument and returns `true`
* if the string matches the pattern(s).
*
* ```js
* wildcardMatch('src/*.js')('src/index.js') //=> true
* ```
*
* ```js
* const isMatch = wildcardMatch('*.example.com', '.')
* isMatch('foo.example.com') //=> true
* isMatch('foo.bar.com') //=> false
* ```
*/
function wildcardMatch(pattern, options) {
	if (typeof pattern !== "string" && !Array.isArray(pattern)) throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
	if (typeof options === "string" || typeof options === "boolean") options = { separator: options };
	if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
	options = options || {};
	if (options.separator === "\\") throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
	const regexpPattern = transform(pattern, options.separator);
	const regexp = new RegExp(`^${regexpPattern}$`, options.flags);
	const fn = isMatch.bind(null, regexp);
	fn.options = options;
	fn.pattern = pattern;
	fn.regexp = regexp;
	return fn;
}
/**
* Matches the given url against an origin or origin pattern
* See "options.trustedOrigins" for details of supported patterns
*
* @param url The url to test
* @param pattern The origin pattern
* @param [settings] Specify supported pattern matching settings
* @returns {boolean} true if the URL matches the origin pattern, false otherwise.
*/
var matchesOriginPattern = (url, pattern, settings) => {
	if (url.startsWith("/")) {
		if (settings?.allowRelativePaths) return url.startsWith("/") && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url);
		return false;
	}
	if (pattern.includes("*") || pattern.includes("?")) {
		if (pattern.includes("://")) return wildcardMatch(pattern)(getOrigin(url) || url);
		const host = getHost(url);
		if (!host) return false;
		return wildcardMatch(pattern)(host);
	}
	const protocol = getProtocol(url);
	return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
};
/**
* Checks if CSRF should be skipped for backward compatibility.
* Previously, disableOriginCheck also disabled CSRF checks.
* This maintains that behavior when disableCSRFCheck isn't explicitly set.
* Only triggers for skipOriginCheck === true, not for path arrays.
*/
function shouldSkipCSRFForBackwardCompat(ctx) {
	return ctx.context.skipOriginCheck === true && ctx.context.options.advanced?.disableCSRFCheck === void 0;
}
/**
* Logs deprecation warning for users relying on coupled behavior.
* Only logs if user explicitly set disableOriginCheck (not test environment default).
*/
var logBackwardCompatWarning = deprecate(function logBackwardCompatWarning() {}, "disableOriginCheck: true currently also disables CSRF checks. In a future version, disableOriginCheck will ONLY disable URL validation. To keep CSRF disabled, add disableCSRFCheck: true to your config.");
/**
* A middleware to validate callbackURL and origin against trustedOrigins.
* Also handles CSRF protection using Fetch Metadata for first-login scenarios.
*/
var originCheckMiddleware = createAuthMiddleware(async (ctx) => {
	if (ctx.request?.method === "GET" || ctx.request?.method === "OPTIONS" || ctx.request?.method === "HEAD" || !ctx.request) return;
	await validateOrigin(ctx);
	if (ctx.context.skipOriginCheck) return;
	const { body, query } = ctx;
	const callbackURL = body?.callbackURL || query?.callbackURL;
	const redirectURL = body?.redirectTo;
	const errorCallbackURL = body?.errorCallbackURL;
	const newUserCallbackURL = body?.newUserCallbackURL;
	const validateURL = (url, label) => {
		if (!url) return;
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	callbackURL && validateURL(callbackURL, "callbackURL");
	redirectURL && validateURL(redirectURL, "redirectURL");
	errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
	newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
var originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	if (ctx.context.skipOriginCheck) return;
	const callbackURL = getValue(ctx);
	const validateURL = (url, label) => {
		if (!url) return;
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
	for (const url of callbacks) validateURL(url, "callbackURL");
});
/**
* Validates origin header against trusted origins.
* @param ctx - The endpoint context
* @param forceValidate - If true, always validate origin regardless of cookies/skip flags
*/
async function validateOrigin(ctx, forceValidate = false) {
	const headers = ctx.request?.headers;
	if (!headers || !ctx.request) return;
	const originHeader = headers.get("origin") || headers.get("referer") || "";
	const useCookies = headers.has("cookie");
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) {
		ctx.context.options.advanced?.disableOriginCheck === true && logBackwardCompatWarning();
		return;
	}
	const skipOriginCheck = ctx.context.skipOriginCheck;
	if (Array.isArray(skipOriginCheck)) try {
		const basePath = new URL(ctx.context.baseURL).pathname;
		const currentPath = normalizePathname(ctx.request.url, basePath);
		if (skipOriginCheck.some((skipPath) => currentPath.startsWith(skipPath))) return;
	} catch {}
	if (!(forceValidate || useCookies)) return;
	if (!originHeader || originHeader === "null") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.MISSING_OR_NULL_ORIGIN);
	const trustedOrigins = Array.isArray(ctx.context.options.trustedOrigins) ? ctx.context.trustedOrigins : [...ctx.context.trustedOrigins, ...(await ctx.context.options.trustedOrigins?.(ctx.request))?.filter((v) => Boolean(v)) || []];
	if (!trustedOrigins.some((origin) => matchesOriginPattern(originHeader, origin))) {
		ctx.context.logger.error(`Invalid origin: ${originHeader}`);
		ctx.context.logger.info(`If it's a valid URL, please add ${originHeader} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${trustedOrigins}`);
		throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
	}
}
/**
* Middleware for CSRF protection using Fetch Metadata headers.
* This prevents cross-site navigation login attacks while supporting progressive enhancement.
*/
var formCsrfMiddleware = createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	await validateFormCsrf(ctx);
});
/**
* Validates CSRF protection for first-login scenarios using Fetch Metadata headers.
* This prevents cross-site form submission attacks while supporting progressive enhancement.
*/
async function validateFormCsrf(ctx) {
	const req = ctx.request;
	if (!req) return;
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) return;
	const headers = req.headers;
	if (headers.has("cookie")) return await validateOrigin(ctx);
	const site = headers.get("Sec-Fetch-Site");
	const mode = headers.get("Sec-Fetch-Mode");
	const dest = headers.get("Sec-Fetch-Dest");
	if (Boolean(site && site.trim() || mode && mode.trim() || dest && dest.trim())) {
		if (site === "cross-site" && mode === "navigate") {
			ctx.context.logger.error("Blocked cross-site navigation login attempt (CSRF protection)", {
				secFetchSite: site,
				secFetchMode: mode,
				secFetchDest: dest
			});
			throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.CROSS_SITE_NAVIGATION_LOGIN_BLOCKED);
		}
		return await validateOrigin(ctx, true);
	}
}
var memory = /* @__PURE__ */ new Map();
function shouldRateLimit(max, window, rateLimitData) {
	const now = Date.now();
	const windowInMs = window * 1e3;
	return now - rateLimitData.lastRequest < windowInMs && rateLimitData.count >= max;
}
function rateLimitResponse(retryAfter) {
	return new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
		status: 429,
		statusText: "Too Many Requests",
		headers: { "X-Retry-After": retryAfter.toString() }
	});
}
function getRetryAfter(lastRequest, window) {
	const now = Date.now();
	const windowInMs = window * 1e3;
	return Math.ceil((lastRequest + windowInMs - now) / 1e3);
}
function createDatabaseStorageWrapper(ctx) {
	const model = "rateLimit";
	const db = ctx.adapter;
	return {
		get: async (key) => {
			const data = (await db.findMany({
				model,
				where: [{
					field: "key",
					value: key
				}]
			}))[0];
			if (typeof data?.lastRequest === "bigint") data.lastRequest = Number(data.lastRequest);
			return data;
		},
		set: async (key, value, _update) => {
			try {
				if (_update) await db.updateMany({
					model,
					where: [{
						field: "key",
						value: key
					}],
					update: {
						count: value.count,
						lastRequest: value.lastRequest
					}
				});
				else await db.create({
					model,
					data: {
						key,
						count: value.count,
						lastRequest: value.lastRequest
					}
				});
			} catch (e) {
				ctx.logger.error("Error setting rate limit", e);
			}
		}
	};
}
function getRateLimitStorage(ctx, rateLimitSettings) {
	if (ctx.options.rateLimit?.customStorage) return ctx.options.rateLimit.customStorage;
	const storage = ctx.rateLimit.storage;
	if (storage === "secondary-storage") return {
		get: async (key) => {
			const data = await ctx.options.secondaryStorage?.get(key);
			return data ? safeJSONParse(data) : null;
		},
		set: async (key, value, _update) => {
			const ttl = rateLimitSettings?.window ?? ctx.options.rateLimit?.window ?? 10;
			await ctx.options.secondaryStorage?.set?.(key, JSON.stringify(value), ttl);
		}
	};
	else if (storage === "memory") return {
		async get(key) {
			const entry = memory.get(key);
			if (!entry) return null;
			if (Date.now() >= entry.expiresAt) {
				memory.delete(key);
				return null;
			}
			return entry.data;
		},
		async set(key, value, _update) {
			const ttl = rateLimitSettings?.window ?? ctx.options.rateLimit?.window ?? 10;
			const expiresAt = Date.now() + ttl * 1e3;
			memory.set(key, {
				data: value,
				expiresAt
			});
		}
	};
	return createDatabaseStorageWrapper(ctx);
}
async function onRequestRateLimit(req, ctx) {
	if (!ctx.rateLimit.enabled) return;
	const basePath = new URL(ctx.baseURL).pathname;
	const path = normalizePathname(req.url, basePath);
	let currentWindow = ctx.rateLimit.window;
	let currentMax = ctx.rateLimit.max;
	const ip = getIp(req, ctx.options);
	if (!ip) return;
	const key = createRateLimitKey(ip, path);
	const specialRule = getDefaultSpecialRules().find((rule) => rule.pathMatcher(path));
	if (specialRule) {
		currentWindow = specialRule.window;
		currentMax = specialRule.max;
	}
	for (const plugin of ctx.options.plugins || []) if (plugin.rateLimit) {
		const matchedRule = plugin.rateLimit.find((rule) => rule.pathMatcher(path));
		if (matchedRule) {
			currentWindow = matchedRule.window;
			currentMax = matchedRule.max;
			break;
		}
	}
	if (ctx.rateLimit.customRules) {
		const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
			if (p.includes("*")) return wildcardMatch(p)(path);
			return p === path;
		});
		if (_path) {
			const customRule = ctx.rateLimit.customRules[_path];
			const resolved = typeof customRule === "function" ? await customRule(req, {
				window: currentWindow,
				max: currentMax
			}) : customRule;
			if (resolved) {
				currentWindow = resolved.window;
				currentMax = resolved.max;
			}
			if (resolved === false) return;
		}
	}
	const storage = getRateLimitStorage(ctx, { window: currentWindow });
	const data = await storage.get(key);
	const now = Date.now();
	if (!data) await storage.set(key, {
		key,
		count: 1,
		lastRequest: now
	});
	else {
		const timeSinceLastRequest = now - data.lastRequest;
		if (shouldRateLimit(currentMax, currentWindow, data)) return rateLimitResponse(getRetryAfter(data.lastRequest, currentWindow));
		else if (timeSinceLastRequest > currentWindow * 1e3) await storage.set(key, {
			...data,
			count: 1,
			lastRequest: now
		}, true);
		else await storage.set(key, {
			...data,
			count: data.count + 1,
			lastRequest: now
		}, true);
	}
}
function getDefaultSpecialRules() {
	return [{
		pathMatcher(path) {
			return path.startsWith("/sign-in") || path.startsWith("/sign-up") || path.startsWith("/change-password") || path.startsWith("/change-email");
		},
		window: 10,
		max: 3
	}];
}
var { get: getOAuthState, set: setOAuthState } = defineRequestState(() => null);
/**
* State for skipping session refresh
*
* In some cases, such as when using server-side rendering (SSR) or when dealing with
* certain types of requests, it may be necessary to skip session refresh to prevent
* potential inconsistencies between the session data in the database and the session
* data stored in cookies.
*/
var { get: getShouldSkipSessionRefresh, set: setShouldSkipSessionRefresh } = defineRequestState(() => false);
/**
* Utilities for hex, bytes, CSPRNG.
* @module
*/
/** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */
function isBytes$1(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
/** Asserts something is positive integer. */
function anumber$1(n, title = "") {
	if (!Number.isSafeInteger(n) || n < 0) {
		const prefix = title && `"${title}" `;
		throw new Error(`${prefix}expected integer >= 0, got ${n}`);
	}
}
/** Asserts something is Uint8Array. */
function abytes$1(value, length, title = "") {
	const bytes = isBytes$1(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
	}
	return value;
}
/** Asserts something is hash */
function ahash(h) {
	if (typeof h !== "function" || typeof h.create !== "function") throw new Error("Hash must wrapped by utils.createHasher");
	anumber$1(h.outputLen);
	anumber$1(h.blockLen);
}
/** Asserts a hash instance has not been destroyed / finished */
function aexists$1(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
/** Asserts output is properly-sized byte array */
function aoutput$1(out, instance) {
	abytes$1(out, void 0, "digestInto() output");
	const min = instance.outputLen;
	if (out.length < min) throw new Error("\"digestInto() output\" expected to be of length >=" + min);
}
/** Cast u8 / u16 / u32 to u32. */
function u32$1(arr) {
	return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
/** Zeroize a byte array. Warning: JS provides no guarantees. */
function clean$1(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/** Create DataView of an array for easy byte-level manipulation. */
function createView$1(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/** The rotate right (circular right shift) operation for uint32 */
function rotr(word, shift) {
	return word << 32 - shift | word >>> shift;
}
/** The rotate left (circular left shift) operation for uint32 */
function rotl$1(word, shift) {
	return word << shift | word >>> 32 - shift >>> 0;
}
/** Is current platform little-endian? Most are. Big-Endian platform: IBM */
var isLE$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
/** The byte swap operation for uint32 */
function byteSwap(word) {
	return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
/** In place byte swap for Uint32Array */
function byteSwap32(arr) {
	for (let i = 0; i < arr.length; i++) arr[i] = byteSwap(arr[i]);
	return arr;
}
var swap32IfBE = isLE$1 ? (u) => u : byteSwap32;
var hasHexBuiltin$1 = typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
var asciis$1 = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function asciiToBase16$1(ch) {
	if (ch >= asciis$1._0 && ch <= asciis$1._9) return ch - asciis$1._0;
	if (ch >= asciis$1.A && ch <= asciis$1.F) return ch - (asciis$1.A - 10);
	if (ch >= asciis$1.a && ch <= asciis$1.f) return ch - (asciis$1.a - 10);
}
/**
* Convert hex string to byte array. Uses built-in function, when available.
* @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
*/
function hexToBytes$1(hex) {
	if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
	if (hasHexBuiltin$1) return Uint8Array.fromHex(hex);
	const hl = hex.length;
	const al = hl / 2;
	if (hl % 2) throw new Error("hex string expected, got unpadded hex of length " + hl);
	const array = new Uint8Array(al);
	for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		const n1 = asciiToBase16$1(hex.charCodeAt(hi));
		const n2 = asciiToBase16$1(hex.charCodeAt(hi + 1));
		if (n1 === void 0 || n2 === void 0) {
			const char = hex[hi] + hex[hi + 1];
			throw new Error("hex string expected, got non-hex character \"" + char + "\" at index " + hi);
		}
		array[ai] = n1 * 16 + n2;
	}
	return array;
}
/**
* There is no setImmediate in browser and setTimeout is slow.
* Call of async fn will return Promise, which will be fullfiled only on
* next scheduler queue processing step and this is exactly what we need.
*/
var nextTick = async () => {};
/** Returns control to thread each 'tick' ms to avoid blocking. */
async function asyncLoop(iters, tick, cb) {
	let ts = Date.now();
	for (let i = 0; i < iters; i++) {
		cb(i);
		const diff = Date.now() - ts;
		if (diff >= 0 && diff < tick) continue;
		await nextTick();
		ts += diff;
	}
}
/**
* Converts string to bytes using UTF8 encoding.
* Built-in doesn't validate input to be string: we do the check.
* @example utf8ToBytes('abc') // Uint8Array.from([97, 98, 99])
*/
function utf8ToBytes$1(str) {
	if (typeof str !== "string") throw new Error("string expected");
	return new Uint8Array(new TextEncoder().encode(str));
}
/**
* Helper for KDFs: consumes uint8array or string.
* When string is passed, does utf8 decoding, using TextDecoder.
*/
function kdfInputToBytes(data, errorTitle = "") {
	if (typeof data === "string") return utf8ToBytes$1(data);
	return abytes$1(data, void 0, errorTitle);
}
/** Merges default options and passed options. */
function checkOpts$1(defaults, opts) {
	if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]") throw new Error("options must be object or undefined");
	return Object.assign(defaults, opts);
}
/** Creates function with outputLen, blockLen, create properties from a class constructor. */
function createHasher(hashCons, info = {}) {
	const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
	const tmp = hashCons(void 0);
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.create = (opts) => hashCons(opts);
	Object.assign(hashC, info);
	return Object.freeze(hashC);
}
/** Creates OID opts for NIST hashes, with prefix 06 09 60 86 48 01 65 03 04 02. */
var oidNist = (suffix) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	suffix
]) });
/**
* HMAC: RFC2104 message authentication code.
* @module
*/
/** Internal class for HMAC. */
var _HMAC = class {
	oHash;
	iHash;
	blockLen;
	outputLen;
	finished = false;
	destroyed = false;
	constructor(hash, key) {
		ahash(hash);
		abytes$1(key, void 0, "key");
		this.iHash = hash.create();
		if (typeof this.iHash.update !== "function") throw new Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen;
		this.outputLen = this.iHash.outputLen;
		const blockLen = this.blockLen;
		const pad = new Uint8Array(blockLen);
		pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
		for (let i = 0; i < pad.length; i++) pad[i] ^= 54;
		this.iHash.update(pad);
		this.oHash = hash.create();
		for (let i = 0; i < pad.length; i++) pad[i] ^= 106;
		this.oHash.update(pad);
		clean$1(pad);
	}
	update(buf) {
		aexists$1(this);
		this.iHash.update(buf);
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		abytes$1(out, this.outputLen, "output");
		this.finished = true;
		this.iHash.digestInto(out);
		this.oHash.update(out);
		this.oHash.digestInto(out);
		this.destroy();
	}
	digest() {
		const out = new Uint8Array(this.oHash.outputLen);
		this.digestInto(out);
		return out;
	}
	_cloneInto(to) {
		to ||= Object.create(Object.getPrototypeOf(this), {});
		const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
		to = to;
		to.finished = finished;
		to.destroyed = destroyed;
		to.blockLen = blockLen;
		to.outputLen = outputLen;
		to.oHash = oHash._cloneInto(to.oHash);
		to.iHash = iHash._cloneInto(to.iHash);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = true;
		this.oHash.destroy();
		this.iHash.destroy();
	}
};
/**
* HMAC: RFC2104 message authentication code.
* @param hash - function that would be used e.g. sha256
* @param key - message key
* @param message - message data
* @example
* import { hmac } from '@noble/hashes/hmac';
* import { sha256 } from '@noble/hashes/sha2';
* const mac1 = hmac(sha256, 'key', 'message');
*/
var hmac = (hash, key, message) => new _HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new _HMAC(hash, key);
/**
* HKDF (RFC 5869): extract + expand in one step.
* See https://soatok.blog/2021/11/17/understanding-hkdf/.
* @module
*/
/**
* HKDF-extract from spec. Less important part. `HKDF-Extract(IKM, salt) -> PRK`
* Arguments position differs from spec (IKM is first one, since it is not optional)
* @param hash - hash function that would be used (e.g. sha256)
* @param ikm - input keying material, the initial key
* @param salt - optional salt value (a non-secret random value)
*/
function extract(hash, ikm, salt) {
	ahash(hash);
	if (salt === void 0) salt = new Uint8Array(hash.outputLen);
	return hmac(hash, salt, ikm);
}
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.of(0);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
/**
* HKDF-expand from the spec. The most important part. `HKDF-Expand(PRK, info, L) -> OKM`
* @param hash - hash function that would be used (e.g. sha256)
* @param prk - a pseudorandom key of at least HashLen octets (usually, the output from the extract step)
* @param info - optional context and application specific information (can be a zero-length string)
* @param length - length of output keying material in bytes
*/
function expand(hash, prk, info, length = 32) {
	ahash(hash);
	anumber$1(length, "length");
	const olen = hash.outputLen;
	if (length > 255 * olen) throw new Error("Length must be <= 255*HashLen");
	const blocks = Math.ceil(length / olen);
	if (info === void 0) info = EMPTY_BUFFER;
	else abytes$1(info, void 0, "info");
	const okm = new Uint8Array(blocks * olen);
	const HMAC = hmac.create(hash, prk);
	const HMACTmp = HMAC._cloneInto();
	const T = new Uint8Array(HMAC.outputLen);
	for (let counter = 0; counter < blocks; counter++) {
		HKDF_COUNTER[0] = counter + 1;
		HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
		okm.set(T, olen * counter);
		HMAC._cloneInto(HMACTmp);
	}
	HMAC.destroy();
	HMACTmp.destroy();
	clean$1(T, HKDF_COUNTER);
	return okm.slice(0, length);
}
/**
* HKDF (RFC 5869): derive keys from an initial input.
* Combines hkdf_extract + hkdf_expand in one step
* @param hash - hash function that would be used (e.g. sha256)
* @param ikm - input keying material, the initial key
* @param salt - optional salt value (a non-secret random value)
* @param info - optional context and application specific information (can be a zero-length string)
* @param length - length of output keying material in bytes
* @example
* import { hkdf } from '@noble/hashes/hkdf';
* import { sha256 } from '@noble/hashes/sha2';
* import { randomBytes } from '@noble/hashes/utils';
* const inputKey = randomBytes(32);
* const salt = randomBytes(32);
* const info = 'application-key';
* const hk1 = hkdf(sha256, inputKey, salt, info, 32);
*/
var hkdf = (hash, ikm, salt, info, length) => expand(hash, extract(hash, ikm, salt), info, length);
/**
* Internal Merkle-Damgard hash utils.
* @module
*/
/** Choice: a ? b : c */
function Chi(a, b, c) {
	return a & b ^ ~a & c;
}
/** Majority function, true if any two inputs is true. */
function Maj(a, b, c) {
	return a & b ^ a & c ^ b & c;
}
/**
* Merkle-Damgard hash construction base class.
* Could be used to create MD5, RIPEMD, SHA1, SHA2.
*/
var HashMD = class {
	blockLen;
	outputLen;
	padOffset;
	isLE;
	buffer;
	view;
	finished = false;
	length = 0;
	pos = 0;
	destroyed = false;
	constructor(blockLen, outputLen, padOffset, isLE) {
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.padOffset = padOffset;
		this.isLE = isLE;
		this.buffer = new Uint8Array(blockLen);
		this.view = createView$1(this.buffer);
	}
	update(data) {
		aexists$1(this);
		abytes$1(data);
		const { view, buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				const dataView = createView$1(data);
				for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(view, 0);
				this.pos = 0;
			}
		}
		this.length += data.length;
		this.roundClean();
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		aoutput$1(out, this);
		this.finished = true;
		const { buffer, view, blockLen, isLE } = this;
		let { pos } = this;
		buffer[pos++] = 128;
		clean$1(this.buffer.subarray(pos));
		if (this.padOffset > blockLen - pos) {
			this.process(view, 0);
			pos = 0;
		}
		for (let i = pos; i < blockLen; i++) buffer[i] = 0;
		view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE);
		this.process(view, 0);
		const oview = createView$1(out);
		const len = this.outputLen;
		if (len % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
		const outLen = len / 4;
		const state = this.get();
		if (outLen > state.length) throw new Error("_sha2: outputLen bigger than state");
		for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		to ||= new this.constructor();
		to.set(...this.get());
		const { blockLen, buffer, length, finished, destroyed, pos } = this;
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		if (length % blockLen) to.buffer.set(buffer);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/**
* Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
* Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
*/
/** Initial SHA256 state. Bits 0..32 of frac part of sqrt of primes 2..19 */
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]);
/**
* Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
* @todo re-check https://issues.chromium.org/issues/42212588
* @module
*/
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
	if (le) return {
		h: Number(n & U32_MASK64),
		l: Number(n >> _32n & U32_MASK64)
	};
	return {
		h: Number(n >> _32n & U32_MASK64) | 0,
		l: Number(n & U32_MASK64) | 0
	};
}
function split(lst, le = false) {
	const len = lst.length;
	let Ah = new Uint32Array(len);
	let Al = new Uint32Array(len);
	for (let i = 0; i < len; i++) {
		const { h, l } = fromBig(lst[i], le);
		[Ah[i], Al[i]] = [h, l];
	}
	return [Ah, Al];
}
/**
* SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
* SHA256 is the fastest hash implementable in JS, even faster than Blake3.
* Check out [RFC 4634](https://www.rfc-editor.org/rfc/rfc4634) and
* [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
* @module
*/
/**
* Round constants:
* First 32 bits of fractional parts of the cube roots of the first 64 primes 2..311)
*/
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
/** Reusable temporary buffer. "W" comes straight from spec. */
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
/** Internal 32-byte base SHA2 hash class. */
var SHA2_32B = class extends HashMD {
	constructor(outputLen) {
		super(64, outputLen, 8, false);
	}
	get() {
		const { A, B, C, D, E, F, G, H } = this;
		return [
			A,
			B,
			C,
			D,
			E,
			F,
			G,
			H
		];
	}
	set(A, B, C, D, E, F, G, H) {
		this.A = A | 0;
		this.B = B | 0;
		this.C = C | 0;
		this.D = D | 0;
		this.E = E | 0;
		this.F = F | 0;
		this.G = G | 0;
		this.H = H | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
		for (let i = 16; i < 64; i++) {
			const W15 = SHA256_W[i - 15];
			const W2 = SHA256_W[i - 2];
			const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
			SHA256_W[i] = (rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10) + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
		}
		let { A, B, C, D, E, F, G, H } = this;
		for (let i = 0; i < 64; i++) {
			const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
			const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
			const T2 = (rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22)) + Maj(A, B, C) | 0;
			H = G;
			G = F;
			F = E;
			E = D + T1 | 0;
			D = C;
			C = B;
			B = A;
			A = T1 + T2 | 0;
		}
		A = A + this.A | 0;
		B = B + this.B | 0;
		C = C + this.C | 0;
		D = D + this.D | 0;
		E = E + this.E | 0;
		F = F + this.F | 0;
		G = G + this.G | 0;
		H = H + this.H | 0;
		this.set(A, B, C, D, E, F, G, H);
	}
	roundClean() {
		clean$1(SHA256_W);
	}
	destroy() {
		this.set(0, 0, 0, 0, 0, 0, 0, 0);
		clean$1(this.buffer);
	}
};
/** Internal SHA2-256 hash class. */
var _SHA256 = class extends SHA2_32B {
	A = SHA256_IV[0] | 0;
	B = SHA256_IV[1] | 0;
	C = SHA256_IV[2] | 0;
	D = SHA256_IV[3] | 0;
	E = SHA256_IV[4] | 0;
	F = SHA256_IV[5] | 0;
	G = SHA256_IV[6] | 0;
	H = SHA256_IV[7] | 0;
	constructor() {
		super(32);
	}
};
var K512 = split([
	"0x428a2f98d728ae22",
	"0x7137449123ef65cd",
	"0xb5c0fbcfec4d3b2f",
	"0xe9b5dba58189dbbc",
	"0x3956c25bf348b538",
	"0x59f111f1b605d019",
	"0x923f82a4af194f9b",
	"0xab1c5ed5da6d8118",
	"0xd807aa98a3030242",
	"0x12835b0145706fbe",
	"0x243185be4ee4b28c",
	"0x550c7dc3d5ffb4e2",
	"0x72be5d74f27b896f",
	"0x80deb1fe3b1696b1",
	"0x9bdc06a725c71235",
	"0xc19bf174cf692694",
	"0xe49b69c19ef14ad2",
	"0xefbe4786384f25e3",
	"0x0fc19dc68b8cd5b5",
	"0x240ca1cc77ac9c65",
	"0x2de92c6f592b0275",
	"0x4a7484aa6ea6e483",
	"0x5cb0a9dcbd41fbd4",
	"0x76f988da831153b5",
	"0x983e5152ee66dfab",
	"0xa831c66d2db43210",
	"0xb00327c898fb213f",
	"0xbf597fc7beef0ee4",
	"0xc6e00bf33da88fc2",
	"0xd5a79147930aa725",
	"0x06ca6351e003826f",
	"0x142929670a0e6e70",
	"0x27b70a8546d22ffc",
	"0x2e1b21385c26c926",
	"0x4d2c6dfc5ac42aed",
	"0x53380d139d95b3df",
	"0x650a73548baf63de",
	"0x766a0abb3c77b2a8",
	"0x81c2c92e47edaee6",
	"0x92722c851482353b",
	"0xa2bfe8a14cf10364",
	"0xa81a664bbc423001",
	"0xc24b8b70d0f89791",
	"0xc76c51a30654be30",
	"0xd192e819d6ef5218",
	"0xd69906245565a910",
	"0xf40e35855771202a",
	"0x106aa07032bbd1b8",
	"0x19a4c116b8d2d0c8",
	"0x1e376c085141ab53",
	"0x2748774cdf8eeb99",
	"0x34b0bcb5e19b48a8",
	"0x391c0cb3c5c95a63",
	"0x4ed8aa4ae3418acb",
	"0x5b9cca4f7763e373",
	"0x682e6ff3d6b2b8a3",
	"0x748f82ee5defb2fc",
	"0x78a5636f43172f60",
	"0x84c87814a1f0ab72",
	"0x8cc702081a6439ec",
	"0x90befffa23631e28",
	"0xa4506cebde82bde9",
	"0xbef9a3f7b2c67915",
	"0xc67178f2e372532b",
	"0xca273eceea26619c",
	"0xd186b8c721c0c207",
	"0xeada7dd6cde0eb1e",
	"0xf57d4f7fee6ed178",
	"0x06f067aa72176fba",
	"0x0a637dc5a2c898a6",
	"0x113f9804bef90dae",
	"0x1b710b35131c471b",
	"0x28db77f523047d84",
	"0x32caab7b40c72493",
	"0x3c9ebe0a15c9bebc",
	"0x431d67c49c100d4c",
	"0x4cc5d4becb3e42b6",
	"0x597f299cfc657e2a",
	"0x5fcb6fab3ad6faec",
	"0x6c44198c4a475817"
].map((n) => BigInt(n)));
K512[0];
K512[1];
/**
* SHA2-256 hash function from RFC 4634. In JS it's the fastest: even faster than Blake3. Some info:
*
* - Trying 2^128 hashes would get 50% chance of collision, using birthday attack.
* - BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
* - Each sha256 hash is executing 2^18 bit operations.
* - Good 2024 ASICs can do 200Th/sec with 3500 watts of power, corresponding to 2^36 hashes/joule.
*/
var sha256 = /* @__PURE__ */ createHasher(() => new _SHA256(), /* @__PURE__ */ oidNist(1));
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
	const size = buffers.reduce((acc, { length }) => acc + length, 0);
	const buf = new Uint8Array(size);
	let i = 0;
	for (const buffer of buffers) {
		buf.set(buffer, i);
		i += buffer.length;
	}
	return buf;
}
function writeUInt32BE(buf, value, offset) {
	if (value < 0 || value >= MAX_INT32) throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
	buf.set([
		value >>> 24,
		value >>> 16,
		value >>> 8,
		value & 255
	], offset);
}
function uint64be(value) {
	const high = Math.floor(value / MAX_INT32);
	const low = value % MAX_INT32;
	const buf = new Uint8Array(8);
	writeUInt32BE(buf, high, 0);
	writeUInt32BE(buf, low, 4);
	return buf;
}
function uint32be(value) {
	const buf = new Uint8Array(4);
	writeUInt32BE(buf, value);
	return buf;
}
function encode$1(string) {
	const bytes = new Uint8Array(string.length);
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		if (code > 127) throw new TypeError("non-ASCII string encountered in encode()");
		bytes[i] = code;
	}
	return bytes;
}
function encodeBase64(input) {
	if (Uint8Array.prototype.toBase64) return input.toBase64();
	const CHUNK_SIZE = 32768;
	const arr = [];
	for (let i = 0; i < input.length; i += CHUNK_SIZE) arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
	return btoa(arr.join(""));
}
function decodeBase64(encoded) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(encoded);
	const binary = atob(encoded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
function decode(input) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), { alphabet: "base64url" });
	let encoded = input;
	if (encoded instanceof Uint8Array) encoded = decoder.decode(encoded);
	encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
	try {
		return decodeBase64(encoded);
	} catch {
		throw new TypeError("The input to be decoded is not correctly encoded.");
	}
}
function encode(input) {
	let unencoded = input;
	if (typeof unencoded === "string") unencoded = encoder.encode(unencoded);
	if (Uint8Array.prototype.toBase64) return unencoded.toBase64({
		alphabet: "base64url",
		omitPadding: true
	});
	return encodeBase64(unencoded).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
var JOSEError = class extends Error {
	static code = "ERR_JOSE_GENERIC";
	code = "ERR_JOSE_GENERIC";
	constructor(message, options) {
		super(message, options);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
};
var JWTClaimValidationFailed = class extends JOSEError {
	static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	claim;
	reason;
	payload;
	constructor(message, payload, claim = "unspecified", reason = "unspecified") {
		super(message, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JWTExpired = class extends JOSEError {
	static code = "ERR_JWT_EXPIRED";
	code = "ERR_JWT_EXPIRED";
	claim;
	reason;
	payload;
	constructor(message, payload, claim = "unspecified", reason = "unspecified") {
		super(message, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JOSEAlgNotAllowed = class extends JOSEError {
	static code = "ERR_JOSE_ALG_NOT_ALLOWED";
	code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
	static code = "ERR_JOSE_NOT_SUPPORTED";
	code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWEDecryptionFailed = class extends JOSEError {
	static code = "ERR_JWE_DECRYPTION_FAILED";
	code = "ERR_JWE_DECRYPTION_FAILED";
	constructor(message = "decryption operation failed", options) {
		super(message, options);
	}
};
var JWEInvalid = class extends JOSEError {
	static code = "ERR_JWE_INVALID";
	code = "ERR_JWE_INVALID";
};
var JWSInvalid = class extends JOSEError {
	static code = "ERR_JWS_INVALID";
	code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
	static code = "ERR_JWT_INVALID";
	code = "ERR_JWT_INVALID";
};
var JWKInvalid = class extends JOSEError {
	static code = "ERR_JWK_INVALID";
	code = "ERR_JWK_INVALID";
};
var JWSSignatureVerificationFailed = class extends JOSEError {
	static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	constructor(message = "signature verification failed", options) {
		super(message, options);
	}
};
function bitLength(alg) {
	switch (alg) {
		case "A128GCM":
		case "A128GCMKW":
		case "A192GCM":
		case "A192GCMKW":
		case "A256GCM":
		case "A256GCMKW": return 96;
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512": return 128;
		default: throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
	}
}
var generateIv = (alg) => crypto.getRandomValues(new Uint8Array(bitLength(alg) >> 3));
function checkIvLength(enc, iv) {
	if (iv.length << 3 !== bitLength(enc)) throw new JWEInvalid("Invalid Initialization Vector length");
}
function checkCekLength(cek, expected) {
	const actual = cek.byteLength << 3;
	if (actual !== expected) throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
}
var unusable = (name, prop = "algorithm.name") => /* @__PURE__ */ new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
var isAlgorithm = (algorithm, name) => algorithm.name === name;
function getHashLength(hash) {
	return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
	switch (alg) {
		case "ES256": return "P-256";
		case "ES384": return "P-384";
		case "ES512": return "P-521";
		default: throw new Error("unreachable");
	}
}
function checkUsage(key, usage) {
	if (usage && !key.usages.includes(usage)) throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkSigCryptoKey(key, alg, usage) {
	switch (alg) {
		case "HS256":
		case "HS384":
		case "HS512": {
			if (!isAlgorithm(key.algorithm, "HMAC")) throw unusable("HMAC");
			const expected = parseInt(alg.slice(2), 10);
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		case "RS256":
		case "RS384":
		case "RS512": {
			if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5")) throw unusable("RSASSA-PKCS1-v1_5");
			const expected = parseInt(alg.slice(2), 10);
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		case "PS256":
		case "PS384":
		case "PS512": {
			if (!isAlgorithm(key.algorithm, "RSA-PSS")) throw unusable("RSA-PSS");
			const expected = parseInt(alg.slice(2), 10);
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		case "Ed25519":
		case "EdDSA":
			if (!isAlgorithm(key.algorithm, "Ed25519")) throw unusable("Ed25519");
			break;
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87":
			if (!isAlgorithm(key.algorithm, alg)) throw unusable(alg);
			break;
		case "ES256":
		case "ES384":
		case "ES512": {
			if (!isAlgorithm(key.algorithm, "ECDSA")) throw unusable("ECDSA");
			const expected = getNamedCurve(alg);
			if (key.algorithm.namedCurve !== expected) throw unusable(expected, "algorithm.namedCurve");
			break;
		}
		default: throw new TypeError("CryptoKey does not support this operation");
	}
	checkUsage(key, usage);
}
function checkEncCryptoKey(key, alg, usage) {
	switch (alg) {
		case "A128GCM":
		case "A192GCM":
		case "A256GCM": {
			if (!isAlgorithm(key.algorithm, "AES-GCM")) throw unusable("AES-GCM");
			const expected = parseInt(alg.slice(1, 4), 10);
			if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
			break;
		}
		case "A128KW":
		case "A192KW":
		case "A256KW": {
			if (!isAlgorithm(key.algorithm, "AES-KW")) throw unusable("AES-KW");
			const expected = parseInt(alg.slice(1, 4), 10);
			if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
			break;
		}
		case "ECDH":
			switch (key.algorithm.name) {
				case "ECDH":
				case "X25519": break;
				default: throw unusable("ECDH or X25519");
			}
			break;
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW":
			if (!isAlgorithm(key.algorithm, "PBKDF2")) throw unusable("PBKDF2");
			break;
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512": {
			if (!isAlgorithm(key.algorithm, "RSA-OAEP")) throw unusable("RSA-OAEP");
			const expected = parseInt(alg.slice(9), 10) || 1;
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		default: throw new TypeError("CryptoKey does not support this operation");
	}
	checkUsage(key, usage);
}
function message(msg, actual, ...types) {
	types = types.filter(Boolean);
	if (types.length > 2) {
		const last = types.pop();
		msg += `one of type ${types.join(", ")}, or ${last}.`;
	} else if (types.length === 2) msg += `one of type ${types[0]} or ${types[1]}.`;
	else msg += `of type ${types[0]}.`;
	if (actual == null) msg += ` Received ${actual}`;
	else if (typeof actual === "function" && actual.name) msg += ` Received function ${actual.name}`;
	else if (typeof actual === "object" && actual != null) {
		if (actual.constructor?.name) msg += ` Received an instance of ${actual.constructor.name}`;
	}
	return msg;
}
var invalidKeyInput = (actual, ...types) => message("Key must be ", actual, ...types);
var withAlg = (alg, actual, ...types) => message(`Key for the ${alg} algorithm must be `, actual, ...types);
function assertCryptoKey(key) {
	if (!isCryptoKey(key)) throw new Error("CryptoKey instance expected");
}
var isCryptoKey = (key) => {
	if (key?.[Symbol.toStringTag] === "CryptoKey") return true;
	try {
		return key instanceof CryptoKey;
	} catch {
		return false;
	}
};
var isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject";
var isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);
async function timingSafeEqual(a, b) {
	if (!(a instanceof Uint8Array)) throw new TypeError("First argument must be a buffer");
	if (!(b instanceof Uint8Array)) throw new TypeError("Second argument must be a buffer");
	const algorithm = {
		name: "HMAC",
		hash: "SHA-256"
	};
	const key = await crypto.subtle.generateKey(algorithm, false, ["sign"]);
	const aHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, a));
	const bHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, b));
	let out = 0;
	let i = -1;
	while (++i < 32) out |= aHmac[i] ^ bHmac[i];
	return out === 0;
}
async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
	if (!(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
	const keySize = parseInt(enc.slice(1, 4), 10);
	const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["decrypt"]);
	const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
		hash: `SHA-${keySize << 1}`,
		name: "HMAC"
	}, false, ["sign"]);
	const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
	const expectedTag = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
	let macCheckPassed;
	try {
		macCheckPassed = await timingSafeEqual(tag, expectedTag);
	} catch {}
	if (!macCheckPassed) throw new JWEDecryptionFailed();
	let plaintext;
	try {
		plaintext = new Uint8Array(await crypto.subtle.decrypt({
			iv,
			name: "AES-CBC"
		}, encKey, ciphertext));
	} catch {}
	if (!plaintext) throw new JWEDecryptionFailed();
	return plaintext;
}
async function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
	let encKey;
	if (cek instanceof Uint8Array) encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["decrypt"]);
	else {
		checkEncCryptoKey(cek, enc, "decrypt");
		encKey = cek;
	}
	try {
		return new Uint8Array(await crypto.subtle.decrypt({
			additionalData: aad,
			iv,
			name: "AES-GCM",
			tagLength: 128
		}, encKey, concat(ciphertext, tag)));
	} catch {
		throw new JWEDecryptionFailed();
	}
}
async function decrypt$1(enc, cek, ciphertext, iv, tag, aad) {
	if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
	if (!iv) throw new JWEInvalid("JWE Initialization Vector missing");
	if (!tag) throw new JWEInvalid("JWE Authentication Tag missing");
	checkIvLength(enc, iv);
	switch (enc) {
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(-3), 10));
			return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
		case "A128GCM":
		case "A192GCM":
		case "A256GCM":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
			return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
		default: throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
	}
}
function isDisjoint(...headers) {
	const sources = headers.filter(Boolean);
	if (sources.length === 0 || sources.length === 1) return true;
	let acc;
	for (const header of sources) {
		const parameters = Object.keys(header);
		if (!acc || acc.size === 0) {
			acc = new Set(parameters);
			continue;
		}
		for (const parameter of parameters) {
			if (acc.has(parameter)) return false;
			acc.add(parameter);
		}
	}
	return true;
}
var isObjectLike = (value) => typeof value === "object" && value !== null;
function isObject(input) {
	if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") return false;
	if (Object.getPrototypeOf(input) === null) return true;
	let proto = input;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(input) === proto;
}
function checkKeySize(key, alg) {
	if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) throw new TypeError(`Invalid key size for alg: ${alg}`);
}
function getCryptoKey$1(key, alg, usage) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, "AES-KW", true, [usage]);
	checkEncCryptoKey(key, alg, usage);
	return key;
}
async function wrap$2(alg, key, cek) {
	const cryptoKey = await getCryptoKey$1(key, alg, "wrapKey");
	checkKeySize(cryptoKey, alg);
	const cryptoKeyCek = await crypto.subtle.importKey("raw", cek, {
		hash: "SHA-256",
		name: "HMAC"
	}, true, ["sign"]);
	return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
}
async function unwrap$2(alg, key, encryptedKey) {
	const cryptoKey = await getCryptoKey$1(key, alg, "unwrapKey");
	checkKeySize(cryptoKey, alg);
	const cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", {
		hash: "SHA-256",
		name: "HMAC"
	}, true, ["sign"]);
	return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
}
async function digest(algorithm, data) {
	const subtleDigest = `SHA-${algorithm.slice(-3)}`;
	return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
}
function lengthAndInput(input) {
	return concat(uint32be(input.length), input);
}
async function concatKdf(Z, L, OtherInfo) {
	const dkLen = L >> 3;
	const hashLen = 32;
	const reps = Math.ceil(dkLen / hashLen);
	const dk = new Uint8Array(reps * hashLen);
	for (let i = 1; i <= reps; i++) {
		const hashInput = new Uint8Array(4 + Z.length + OtherInfo.length);
		hashInput.set(uint32be(i), 0);
		hashInput.set(Z, 4);
		hashInput.set(OtherInfo, 4 + Z.length);
		const hashResult = await digest("sha256", hashInput);
		dk.set(hashResult, (i - 1) * hashLen);
	}
	return dk.slice(0, dkLen);
}
async function deriveKey$1(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(), apv = new Uint8Array()) {
	checkEncCryptoKey(publicKey, "ECDH");
	checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
	const otherInfo = concat(lengthAndInput(encode$1(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength), new Uint8Array());
	return concatKdf(new Uint8Array(await crypto.subtle.deriveBits({
		name: publicKey.algorithm.name,
		public: publicKey
	}, privateKey, getEcdhBitLength(publicKey))), keyLength, otherInfo);
}
function getEcdhBitLength(publicKey) {
	if (publicKey.algorithm.name === "X25519") return 256;
	return Math.ceil(parseInt(publicKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3;
}
function allowed(key) {
	switch (key.algorithm.namedCurve) {
		case "P-256":
		case "P-384":
		case "P-521": return true;
		default: return key.algorithm.name === "X25519";
	}
}
function getCryptoKey(key, alg) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, "PBKDF2", false, ["deriveBits"]);
	checkEncCryptoKey(key, alg, "deriveBits");
	return key;
}
var concatSalt = (alg, p2sInput) => concat(encode$1(alg), Uint8Array.of(0), p2sInput);
async function deriveKey(p2s, alg, p2c, key) {
	if (!(p2s instanceof Uint8Array) || p2s.length < 8) throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
	const salt = concatSalt(alg, p2s);
	const keylen = parseInt(alg.slice(13, 16), 10);
	const subtleAlg = {
		hash: `SHA-${alg.slice(8, 11)}`,
		iterations: p2c,
		name: "PBKDF2",
		salt
	};
	const cryptoKey = await getCryptoKey(key, alg);
	return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
}
async function wrap$1(alg, key, cek, p2c = 2048, p2s = crypto.getRandomValues(new Uint8Array(16))) {
	const derived = await deriveKey(p2s, alg, p2c, key);
	return {
		encryptedKey: await wrap$2(alg.slice(-6), derived, cek),
		p2c,
		p2s: encode(p2s)
	};
}
async function unwrap$1(alg, key, encryptedKey, p2c, p2s) {
	const derived = await deriveKey(p2s, alg, p2c, key);
	return unwrap$2(alg.slice(-6), derived, encryptedKey);
}
function checkKeyLength(alg, key) {
	if (alg.startsWith("RS") || alg.startsWith("PS")) {
		const { modulusLength } = key.algorithm;
		if (typeof modulusLength !== "number" || modulusLength < 2048) throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
	}
}
var subtleAlgorithm$1 = (alg) => {
	switch (alg) {
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512": return "RSA-OAEP";
		default: throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
	}
};
async function encrypt$1(alg, key, cek) {
	checkEncCryptoKey(key, alg, "encrypt");
	checkKeyLength(alg, key);
	return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm$1(alg), key, cek));
}
async function decrypt(alg, key, encryptedKey) {
	checkEncCryptoKey(key, alg, "decrypt");
	checkKeyLength(alg, key);
	return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm$1(alg), key, encryptedKey));
}
function cekLength(alg) {
	switch (alg) {
		case "A128GCM": return 128;
		case "A192GCM": return 192;
		case "A256GCM":
		case "A128CBC-HS256": return 256;
		case "A192CBC-HS384": return 384;
		case "A256CBC-HS512": return 512;
		default: throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
	}
}
var generateCek = (alg) => crypto.getRandomValues(new Uint8Array(cekLength(alg) >> 3));
function subtleMapping(jwk) {
	let algorithm;
	let keyUsages;
	switch (jwk.kty) {
		case "AKP":
			switch (jwk.alg) {
				case "ML-DSA-44":
				case "ML-DSA-65":
				case "ML-DSA-87":
					algorithm = { name: jwk.alg };
					keyUsages = jwk.priv ? ["sign"] : ["verify"];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "RSA":
			switch (jwk.alg) {
				case "PS256":
				case "PS384":
				case "PS512":
					algorithm = {
						name: "RSA-PSS",
						hash: `SHA-${jwk.alg.slice(-3)}`
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "RS256":
				case "RS384":
				case "RS512":
					algorithm = {
						name: "RSASSA-PKCS1-v1_5",
						hash: `SHA-${jwk.alg.slice(-3)}`
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "RSA-OAEP":
				case "RSA-OAEP-256":
				case "RSA-OAEP-384":
				case "RSA-OAEP-512":
					algorithm = {
						name: "RSA-OAEP",
						hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
					};
					keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "EC":
			switch (jwk.alg) {
				case "ES256":
					algorithm = {
						name: "ECDSA",
						namedCurve: "P-256"
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ES384":
					algorithm = {
						name: "ECDSA",
						namedCurve: "P-384"
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ES512":
					algorithm = {
						name: "ECDSA",
						namedCurve: "P-521"
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					algorithm = {
						name: "ECDH",
						namedCurve: jwk.crv
					};
					keyUsages = jwk.d ? ["deriveBits"] : [];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "OKP":
			switch (jwk.alg) {
				case "Ed25519":
				case "EdDSA":
					algorithm = { name: "Ed25519" };
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					algorithm = { name: jwk.crv };
					keyUsages = jwk.d ? ["deriveBits"] : [];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		default: throw new JOSENotSupported("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
	}
	return {
		algorithm,
		keyUsages
	};
}
async function jwkToKey(jwk) {
	if (!jwk.alg) throw new TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	const { algorithm, keyUsages } = subtleMapping(jwk);
	const keyData = { ...jwk };
	if (keyData.kty !== "AKP") delete keyData.alg;
	delete keyData.use;
	return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? (jwk.d || jwk.priv ? false : true), jwk.key_ops ?? keyUsages);
}
async function importJWK(jwk, alg, options) {
	if (!isObject(jwk)) throw new TypeError("JWK must be an object");
	let ext;
	alg ??= jwk.alg;
	ext ??= options?.extractable ?? jwk.ext;
	switch (jwk.kty) {
		case "oct":
			if (typeof jwk.k !== "string" || !jwk.k) throw new TypeError("missing \"k\" (Key Value) Parameter value");
			return decode(jwk.k);
		case "RSA":
			if ("oth" in jwk && jwk.oth !== void 0) throw new JOSENotSupported("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
			return jwkToKey({
				...jwk,
				alg,
				ext
			});
		case "AKP":
			if (typeof jwk.alg !== "string" || !jwk.alg) throw new TypeError("missing \"alg\" (Algorithm) Parameter value");
			if (alg !== void 0 && alg !== jwk.alg) throw new TypeError("JWK alg and alg option value mismatch");
			return jwkToKey({
				...jwk,
				ext
			});
		case "EC":
		case "OKP": return jwkToKey({
			...jwk,
			alg,
			ext
		});
		default: throw new JOSENotSupported("Unsupported \"kty\" (Key Type) Parameter value");
	}
}
async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
	if (!(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
	const keySize = parseInt(enc.slice(1, 4), 10);
	const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["encrypt"]);
	const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
		hash: `SHA-${keySize << 1}`,
		name: "HMAC"
	}, false, ["sign"]);
	const ciphertext = new Uint8Array(await crypto.subtle.encrypt({
		iv,
		name: "AES-CBC"
	}, encKey, plaintext));
	const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
	return {
		ciphertext,
		tag: new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3)),
		iv
	};
}
async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
	let encKey;
	if (cek instanceof Uint8Array) encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
	else {
		checkEncCryptoKey(cek, enc, "encrypt");
		encKey = cek;
	}
	const encrypted = new Uint8Array(await crypto.subtle.encrypt({
		additionalData: aad,
		iv,
		name: "AES-GCM",
		tagLength: 128
	}, encKey, plaintext));
	const tag = encrypted.slice(-16);
	return {
		ciphertext: encrypted.slice(0, -16),
		tag,
		iv
	};
}
async function encrypt(enc, plaintext, cek, iv, aad) {
	if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
	if (iv) checkIvLength(enc, iv);
	else iv = generateIv(enc);
	switch (enc) {
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(-3), 10));
			return cbcEncrypt(enc, plaintext, cek, iv, aad);
		case "A128GCM":
		case "A192GCM":
		case "A256GCM":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
			return gcmEncrypt(enc, plaintext, cek, iv, aad);
		default: throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
	}
}
async function wrap(alg, key, cek, iv) {
	const wrapped = await encrypt(alg.slice(0, 7), cek, key, iv, new Uint8Array());
	return {
		encryptedKey: wrapped.ciphertext,
		iv: encode(wrapped.iv),
		tag: encode(wrapped.tag)
	};
}
async function unwrap(alg, key, encryptedKey, iv, tag) {
	return decrypt$1(alg.slice(0, 7), key, encryptedKey, iv, tag, new Uint8Array());
}
async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
	switch (alg) {
		case "dir":
			if (encryptedKey !== void 0) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
			return key;
		case "ECDH-ES": if (encryptedKey !== void 0) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			if (!isObject(joseHeader.epk)) throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
			assertCryptoKey(key);
			if (!allowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
			const epk = await importJWK(joseHeader.epk, alg);
			assertCryptoKey(epk);
			let partyUInfo;
			let partyVInfo;
			if (joseHeader.apu !== void 0) {
				if (typeof joseHeader.apu !== "string") throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
				try {
					partyUInfo = decode(joseHeader.apu);
				} catch {
					throw new JWEInvalid("Failed to base64url decode the apu");
				}
			}
			if (joseHeader.apv !== void 0) {
				if (typeof joseHeader.apv !== "string") throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
				try {
					partyVInfo = decode(joseHeader.apv);
				} catch {
					throw new JWEInvalid("Failed to base64url decode the apv");
				}
			}
			const sharedSecret = await deriveKey$1(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? cekLength(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
			if (alg === "ECDH-ES") return sharedSecret;
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			return unwrap$2(alg.slice(-6), sharedSecret, encryptedKey);
		}
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			assertCryptoKey(key);
			return decrypt(alg, key, encryptedKey);
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW": {
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			if (typeof joseHeader.p2c !== "number") throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
			const p2cLimit = options?.maxPBES2Count || 1e4;
			if (joseHeader.p2c > p2cLimit) throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
			if (typeof joseHeader.p2s !== "string") throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
			let p2s;
			try {
				p2s = decode(joseHeader.p2s);
			} catch {
				throw new JWEInvalid("Failed to base64url decode the p2s");
			}
			return unwrap$1(alg, key, encryptedKey, joseHeader.p2c, p2s);
		}
		case "A128KW":
		case "A192KW":
		case "A256KW":
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			return unwrap$2(alg, key, encryptedKey);
		case "A128GCMKW":
		case "A192GCMKW":
		case "A256GCMKW": {
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			if (typeof joseHeader.iv !== "string") throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
			if (typeof joseHeader.tag !== "string") throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
			let iv;
			try {
				iv = decode(joseHeader.iv);
			} catch {
				throw new JWEInvalid("Failed to base64url decode the iv");
			}
			let tag;
			try {
				tag = decode(joseHeader.tag);
			} catch {
				throw new JWEInvalid("Failed to base64url decode the tag");
			}
			return unwrap(alg, key, encryptedKey, iv, tag);
		}
		default: throw new JOSENotSupported("Invalid or unsupported \"alg\" (JWE Algorithm) header value");
	}
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
	if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) throw new Err("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!protectedHeader || protectedHeader.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) throw new Err("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let recognized;
	if (recognizedOption !== void 0) recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
	else recognized = recognizedDefault;
	for (const parameter of protectedHeader.crit) {
		if (!recognized.has(parameter)) throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
		if (joseHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" is missing`);
		if (recognized.get(parameter) && protectedHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
	}
	return new Set(protectedHeader.crit);
}
function validateAlgorithms(option, algorithms) {
	if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) throw new TypeError(`"${option}" option must be an array of strings`);
	if (!algorithms) return;
	return new Set(algorithms);
}
var isJWK = (key) => isObject(key) && typeof key.kty === "string";
var isPrivateJWK = (key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
var isPublicJWK = (key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0;
var isSecretJWK = (key) => key.kty === "oct" && typeof key.k === "string";
var cache;
var handleJWK = async (key, jwk, alg, freeze = false) => {
	cache ||= /* @__PURE__ */ new WeakMap();
	let cached = cache.get(key);
	if (cached?.[alg]) return cached[alg];
	const cryptoKey = await jwkToKey({
		...jwk,
		alg
	});
	if (freeze) Object.freeze(key);
	if (!cached) cache.set(key, { [alg]: cryptoKey });
	else cached[alg] = cryptoKey;
	return cryptoKey;
};
var handleKeyObject = (keyObject, alg) => {
	cache ||= /* @__PURE__ */ new WeakMap();
	let cached = cache.get(keyObject);
	if (cached?.[alg]) return cached[alg];
	const isPublic = keyObject.type === "public";
	const extractable = isPublic ? true : false;
	let cryptoKey;
	if (keyObject.asymmetricKeyType === "x25519") {
		switch (alg) {
			case "ECDH-ES":
			case "ECDH-ES+A128KW":
			case "ECDH-ES+A192KW":
			case "ECDH-ES+A256KW": break;
			default: throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		}
		cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : ["deriveBits"]);
	}
	if (keyObject.asymmetricKeyType === "ed25519") {
		if (alg !== "EdDSA" && alg !== "Ed25519") throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [isPublic ? "verify" : "sign"]);
	}
	switch (keyObject.asymmetricKeyType) {
		case "ml-dsa-44":
		case "ml-dsa-65":
		case "ml-dsa-87":
			if (alg !== keyObject.asymmetricKeyType.toUpperCase()) throw new TypeError("given KeyObject instance cannot be used for this algorithm");
			cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [isPublic ? "verify" : "sign"]);
	}
	if (keyObject.asymmetricKeyType === "rsa") {
		let hash;
		switch (alg) {
			case "RSA-OAEP":
				hash = "SHA-1";
				break;
			case "RS256":
			case "PS256":
			case "RSA-OAEP-256":
				hash = "SHA-256";
				break;
			case "RS384":
			case "PS384":
			case "RSA-OAEP-384":
				hash = "SHA-384";
				break;
			case "RS512":
			case "PS512":
			case "RSA-OAEP-512":
				hash = "SHA-512";
				break;
			default: throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		}
		if (alg.startsWith("RSA-OAEP")) return keyObject.toCryptoKey({
			name: "RSA-OAEP",
			hash
		}, extractable, isPublic ? ["encrypt"] : ["decrypt"]);
		cryptoKey = keyObject.toCryptoKey({
			name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
			hash
		}, extractable, [isPublic ? "verify" : "sign"]);
	}
	if (keyObject.asymmetricKeyType === "ec") {
		const namedCurve = new Map([
			["prime256v1", "P-256"],
			["secp384r1", "P-384"],
			["secp521r1", "P-521"]
		]).get(keyObject.asymmetricKeyDetails?.namedCurve);
		if (!namedCurve) throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		if (alg === "ES256" && namedCurve === "P-256") cryptoKey = keyObject.toCryptoKey({
			name: "ECDSA",
			namedCurve
		}, extractable, [isPublic ? "verify" : "sign"]);
		if (alg === "ES384" && namedCurve === "P-384") cryptoKey = keyObject.toCryptoKey({
			name: "ECDSA",
			namedCurve
		}, extractable, [isPublic ? "verify" : "sign"]);
		if (alg === "ES512" && namedCurve === "P-521") cryptoKey = keyObject.toCryptoKey({
			name: "ECDSA",
			namedCurve
		}, extractable, [isPublic ? "verify" : "sign"]);
		if (alg.startsWith("ECDH-ES")) cryptoKey = keyObject.toCryptoKey({
			name: "ECDH",
			namedCurve
		}, extractable, isPublic ? [] : ["deriveBits"]);
	}
	if (!cryptoKey) throw new TypeError("given KeyObject instance cannot be used for this algorithm");
	if (!cached) cache.set(keyObject, { [alg]: cryptoKey });
	else cached[alg] = cryptoKey;
	return cryptoKey;
};
async function normalizeKey(key, alg) {
	if (key instanceof Uint8Array) return key;
	if (isCryptoKey(key)) return key;
	if (isKeyObject(key)) {
		if (key.type === "secret") return key.export();
		if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") try {
			return handleKeyObject(key, alg);
		} catch (err) {
			if (err instanceof TypeError) throw err;
		}
		return handleJWK(key, key.export({ format: "jwk" }), alg);
	}
	if (isJWK(key)) {
		if (key.k) return decode(key.k);
		return handleJWK(key, key, alg, true);
	}
	throw new Error("unreachable");
}
var tag = (key) => key?.[Symbol.toStringTag];
var jwkMatchesOp = (alg, key, usage) => {
	if (key.use !== void 0) {
		let expected;
		switch (usage) {
			case "sign":
			case "verify":
				expected = "sig";
				break;
			case "encrypt":
			case "decrypt":
				expected = "enc";
				break;
		}
		if (key.use !== expected) throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
	}
	if (key.alg !== void 0 && key.alg !== alg) throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
	if (Array.isArray(key.key_ops)) {
		let expectedKeyOp;
		switch (true) {
			case usage === "sign" || usage === "verify":
			case alg === "dir":
			case alg.includes("CBC-HS"):
				expectedKeyOp = usage;
				break;
			case alg.startsWith("PBES2"):
				expectedKeyOp = "deriveBits";
				break;
			case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg):
				if (!alg.includes("GCM") && alg.endsWith("KW")) expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
				else expectedKeyOp = usage;
				break;
			case usage === "encrypt" && alg.startsWith("RSA"):
				expectedKeyOp = "wrapKey";
				break;
			case usage === "decrypt":
				expectedKeyOp = alg.startsWith("RSA") ? "unwrapKey" : "deriveBits";
				break;
		}
		if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
	}
	return true;
};
var symmetricTypeCheck = (alg, key, usage) => {
	if (key instanceof Uint8Array) return;
	if (isJWK(key)) {
		if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage)) return;
		throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
	}
	if (!isKeyLike(key)) throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
	if (key.type !== "secret") throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
};
var asymmetricTypeCheck = (alg, key, usage) => {
	if (isJWK(key)) switch (usage) {
		case "decrypt":
		case "sign":
			if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage)) return;
			throw new TypeError(`JSON Web Key for this operation must be a private JWK`);
		case "encrypt":
		case "verify":
			if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage)) return;
			throw new TypeError(`JSON Web Key for this operation must be a public JWK`);
	}
	if (!isKeyLike(key)) throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
	if (key.type === "secret") throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
	if (key.type === "public") switch (usage) {
		case "sign": throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
		case "decrypt": throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
	}
	if (key.type === "private") switch (usage) {
		case "verify": throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
		case "encrypt": throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
	}
};
function checkKeyType(alg, key, usage) {
	switch (alg.substring(0, 2)) {
		case "A1":
		case "A2":
		case "di":
		case "HS":
		case "PB":
			symmetricTypeCheck(alg, key, usage);
			break;
		default: asymmetricTypeCheck(alg, key, usage);
	}
}
async function flattenedDecrypt(jwe, key, options) {
	if (!isObject(jwe)) throw new JWEInvalid("Flattened JWE must be an object");
	if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) throw new JWEInvalid("JOSE Header missing");
	if (jwe.iv !== void 0 && typeof jwe.iv !== "string") throw new JWEInvalid("JWE Initialization Vector incorrect type");
	if (typeof jwe.ciphertext !== "string") throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
	if (jwe.tag !== void 0 && typeof jwe.tag !== "string") throw new JWEInvalid("JWE Authentication Tag incorrect type");
	if (jwe.protected !== void 0 && typeof jwe.protected !== "string") throw new JWEInvalid("JWE Protected Header incorrect type");
	if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") throw new JWEInvalid("JWE Encrypted Key incorrect type");
	if (jwe.aad !== void 0 && typeof jwe.aad !== "string") throw new JWEInvalid("JWE AAD incorrect type");
	if (jwe.header !== void 0 && !isObject(jwe.header)) throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
	if (jwe.unprotected !== void 0 && !isObject(jwe.unprotected)) throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
	let parsedProt;
	if (jwe.protected) try {
		const protectedHeader = decode(jwe.protected);
		parsedProt = JSON.parse(decoder.decode(protectedHeader));
	} catch {
		throw new JWEInvalid("JWE Protected Header is invalid");
	}
	if (!isDisjoint(parsedProt, jwe.header, jwe.unprotected)) throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
	const joseHeader = {
		...parsedProt,
		...jwe.header,
		...jwe.unprotected
	};
	validateCrit(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
	if (joseHeader.zip !== void 0) throw new JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
	const { alg, enc } = joseHeader;
	if (typeof alg !== "string" || !alg) throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
	if (typeof enc !== "string" || !enc) throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
	const keyManagementAlgorithms = options && validateAlgorithms("keyManagementAlgorithms", options.keyManagementAlgorithms);
	const contentEncryptionAlgorithms = options && validateAlgorithms("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
	if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) throw new JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) throw new JOSEAlgNotAllowed("\"enc\" (Encryption Algorithm) Header Parameter value not allowed");
	let encryptedKey;
	if (jwe.encrypted_key !== void 0) try {
		encryptedKey = decode(jwe.encrypted_key);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the encrypted_key");
	}
	let resolvedKey = false;
	if (typeof key === "function") {
		key = await key(parsedProt, jwe);
		resolvedKey = true;
	}
	checkKeyType(alg === "dir" ? enc : alg, key, "decrypt");
	const k = await normalizeKey(key, alg);
	let cek;
	try {
		cek = await decryptKeyManagement(alg, k, encryptedKey, joseHeader, options);
	} catch (err) {
		if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) throw err;
		cek = generateCek(enc);
	}
	let iv;
	let tag;
	if (jwe.iv !== void 0) try {
		iv = decode(jwe.iv);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the iv");
	}
	if (jwe.tag !== void 0) try {
		tag = decode(jwe.tag);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the tag");
	}
	const protectedHeader = jwe.protected !== void 0 ? encode$1(jwe.protected) : new Uint8Array();
	let additionalData;
	if (jwe.aad !== void 0) additionalData = concat(protectedHeader, encode$1("."), encode$1(jwe.aad));
	else additionalData = protectedHeader;
	let ciphertext;
	try {
		ciphertext = decode(jwe.ciphertext);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the ciphertext");
	}
	const result = { plaintext: await decrypt$1(enc, cek, ciphertext, iv, tag, additionalData) };
	if (jwe.protected !== void 0) result.protectedHeader = parsedProt;
	if (jwe.aad !== void 0) try {
		result.additionalAuthenticatedData = decode(jwe.aad);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the aad");
	}
	if (jwe.unprotected !== void 0) result.sharedUnprotectedHeader = jwe.unprotected;
	if (jwe.header !== void 0) result.unprotectedHeader = jwe.header;
	if (resolvedKey) return {
		...result,
		key: k
	};
	return result;
}
async function compactDecrypt(jwe, key, options) {
	if (jwe instanceof Uint8Array) jwe = decoder.decode(jwe);
	if (typeof jwe !== "string") throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
	const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
	if (length !== 5) throw new JWEInvalid("Invalid Compact JWE");
	const decrypted = await flattenedDecrypt({
		ciphertext,
		iv: iv || void 0,
		protected: protectedHeader,
		tag: tag || void 0,
		encrypted_key: encryptedKey || void 0
	}, key, options);
	const result = {
		plaintext: decrypted.plaintext,
		protectedHeader: decrypted.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: decrypted.key
	};
	return result;
}
var unprotected = Symbol();
async function keyToJWK(key) {
	if (isKeyObject(key)) if (key.type === "secret") key = key.export();
	else return key.export({ format: "jwk" });
	if (key instanceof Uint8Array) return {
		kty: "oct",
		k: encode(key)
	};
	if (!isCryptoKey(key)) throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "Uint8Array"));
	if (!key.extractable) throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
	const { ext, key_ops, alg, use, ...jwk } = await crypto.subtle.exportKey("jwk", key);
	if (jwk.kty === "AKP") jwk.alg = alg;
	return jwk;
}
async function exportJWK(key) {
	return keyToJWK(key);
}
async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
	let encryptedKey;
	let parameters;
	let cek;
	switch (alg) {
		case "dir":
			cek = key;
			break;
		case "ECDH-ES":
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			assertCryptoKey(key);
			if (!allowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
			const { apu, apv } = providedParameters;
			let ephemeralKey;
			if (providedParameters.epk) ephemeralKey = await normalizeKey(providedParameters.epk, alg);
			else ephemeralKey = (await crypto.subtle.generateKey(key.algorithm, true, ["deriveBits"])).privateKey;
			const { x, y, crv, kty } = await exportJWK(ephemeralKey);
			const sharedSecret = await deriveKey$1(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? cekLength(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
			parameters = { epk: {
				x,
				crv,
				kty
			} };
			if (kty === "EC") parameters.epk.y = y;
			if (apu) parameters.apu = encode(apu);
			if (apv) parameters.apv = encode(apv);
			if (alg === "ECDH-ES") {
				cek = sharedSecret;
				break;
			}
			cek = providedCek || generateCek(enc);
			encryptedKey = await wrap$2(alg.slice(-6), sharedSecret, cek);
			break;
		}
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			cek = providedCek || generateCek(enc);
			assertCryptoKey(key);
			encryptedKey = await encrypt$1(alg, key, cek);
			break;
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW": {
			cek = providedCek || generateCek(enc);
			const { p2c, p2s } = providedParameters;
			({encryptedKey, ...parameters} = await wrap$1(alg, key, cek, p2c, p2s));
			break;
		}
		case "A128KW":
		case "A192KW":
		case "A256KW":
			cek = providedCek || generateCek(enc);
			encryptedKey = await wrap$2(alg, key, cek);
			break;
		case "A128GCMKW":
		case "A192GCMKW":
		case "A256GCMKW": {
			cek = providedCek || generateCek(enc);
			const { iv } = providedParameters;
			({encryptedKey, ...parameters} = await wrap(alg, key, cek, iv));
			break;
		}
		default: throw new JOSENotSupported("Invalid or unsupported \"alg\" (JWE Algorithm) header value");
	}
	return {
		cek,
		encryptedKey,
		parameters
	};
}
var FlattenedEncrypt = class {
	#plaintext;
	#protectedHeader;
	#sharedUnprotectedHeader;
	#unprotectedHeader;
	#aad;
	#cek;
	#iv;
	#keyManagementParameters;
	constructor(plaintext) {
		if (!(plaintext instanceof Uint8Array)) throw new TypeError("plaintext must be an instance of Uint8Array");
		this.#plaintext = plaintext;
	}
	setKeyManagementParameters(parameters) {
		if (this.#keyManagementParameters) throw new TypeError("setKeyManagementParameters can only be called once");
		this.#keyManagementParameters = parameters;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		if (this.#protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setSharedUnprotectedHeader(sharedUnprotectedHeader) {
		if (this.#sharedUnprotectedHeader) throw new TypeError("setSharedUnprotectedHeader can only be called once");
		this.#sharedUnprotectedHeader = sharedUnprotectedHeader;
		return this;
	}
	setUnprotectedHeader(unprotectedHeader) {
		if (this.#unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
		this.#unprotectedHeader = unprotectedHeader;
		return this;
	}
	setAdditionalAuthenticatedData(aad) {
		this.#aad = aad;
		return this;
	}
	setContentEncryptionKey(cek) {
		if (this.#cek) throw new TypeError("setContentEncryptionKey can only be called once");
		this.#cek = cek;
		return this;
	}
	setInitializationVector(iv) {
		if (this.#iv) throw new TypeError("setInitializationVector can only be called once");
		this.#iv = iv;
		return this;
	}
	async encrypt(key, options) {
		if (!this.#protectedHeader && !this.#unprotectedHeader && !this.#sharedUnprotectedHeader) throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
		if (!isDisjoint(this.#protectedHeader, this.#unprotectedHeader, this.#sharedUnprotectedHeader)) throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
		const joseHeader = {
			...this.#protectedHeader,
			...this.#unprotectedHeader,
			...this.#sharedUnprotectedHeader
		};
		validateCrit(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this.#protectedHeader, joseHeader);
		if (joseHeader.zip !== void 0) throw new JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
		const { alg, enc } = joseHeader;
		if (typeof alg !== "string" || !alg) throw new JWEInvalid("JWE \"alg\" (Algorithm) Header Parameter missing or invalid");
		if (typeof enc !== "string" || !enc) throw new JWEInvalid("JWE \"enc\" (Encryption Algorithm) Header Parameter missing or invalid");
		let encryptedKey;
		if (this.#cek && (alg === "dir" || alg === "ECDH-ES")) throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
		checkKeyType(alg === "dir" ? enc : alg, key, "encrypt");
		let cek;
		{
			let parameters;
			const k = await normalizeKey(key, alg);
			({cek, encryptedKey, parameters} = await encryptKeyManagement(alg, enc, k, this.#cek, this.#keyManagementParameters));
			if (parameters) if (options && unprotected in options) if (!this.#unprotectedHeader) this.setUnprotectedHeader(parameters);
			else this.#unprotectedHeader = {
				...this.#unprotectedHeader,
				...parameters
			};
			else if (!this.#protectedHeader) this.setProtectedHeader(parameters);
			else this.#protectedHeader = {
				...this.#protectedHeader,
				...parameters
			};
		}
		let additionalData;
		let protectedHeaderS;
		let protectedHeaderB;
		let aadMember;
		if (this.#protectedHeader) {
			protectedHeaderS = encode(JSON.stringify(this.#protectedHeader));
			protectedHeaderB = encode$1(protectedHeaderS);
		} else {
			protectedHeaderS = "";
			protectedHeaderB = new Uint8Array();
		}
		if (this.#aad) {
			aadMember = encode(this.#aad);
			const aadMemberBytes = encode$1(aadMember);
			additionalData = concat(protectedHeaderB, encode$1("."), aadMemberBytes);
		} else additionalData = protectedHeaderB;
		const { ciphertext, tag, iv } = await encrypt(enc, this.#plaintext, cek, this.#iv, additionalData);
		const jwe = { ciphertext: encode(ciphertext) };
		if (iv) jwe.iv = encode(iv);
		if (tag) jwe.tag = encode(tag);
		if (encryptedKey) jwe.encrypted_key = encode(encryptedKey);
		if (aadMember) jwe.aad = aadMember;
		if (this.#protectedHeader) jwe.protected = protectedHeaderS;
		if (this.#sharedUnprotectedHeader) jwe.unprotected = this.#sharedUnprotectedHeader;
		if (this.#unprotectedHeader) jwe.header = this.#unprotectedHeader;
		return jwe;
	}
};
function subtleAlgorithm(alg, algorithm) {
	const hash = `SHA-${alg.slice(-3)}`;
	switch (alg) {
		case "HS256":
		case "HS384":
		case "HS512": return {
			hash,
			name: "HMAC"
		};
		case "PS256":
		case "PS384":
		case "PS512": return {
			hash,
			name: "RSA-PSS",
			saltLength: parseInt(alg.slice(-3), 10) >> 3
		};
		case "RS256":
		case "RS384":
		case "RS512": return {
			hash,
			name: "RSASSA-PKCS1-v1_5"
		};
		case "ES256":
		case "ES384":
		case "ES512": return {
			hash,
			name: "ECDSA",
			namedCurve: algorithm.namedCurve
		};
		case "Ed25519":
		case "EdDSA": return { name: "Ed25519" };
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87": return { name: alg };
		default: throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
	}
}
async function getSigKey(alg, key, usage) {
	if (key instanceof Uint8Array) {
		if (!alg.startsWith("HS")) throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
		return crypto.subtle.importKey("raw", key, {
			hash: `SHA-${alg.slice(-3)}`,
			name: "HMAC"
		}, false, [usage]);
	}
	checkSigCryptoKey(key, alg, usage);
	return key;
}
async function verify(alg, key, signature, data) {
	const cryptoKey = await getSigKey(alg, key, "verify");
	checkKeyLength(alg, cryptoKey);
	const algorithm = subtleAlgorithm(alg, cryptoKey.algorithm);
	try {
		return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
	} catch {
		return false;
	}
}
async function flattenedVerify(jws, key, options) {
	if (!isObject(jws)) throw new JWSInvalid("Flattened JWS must be an object");
	if (jws.protected === void 0 && jws.header === void 0) throw new JWSInvalid("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (jws.protected !== void 0 && typeof jws.protected !== "string") throw new JWSInvalid("JWS Protected Header incorrect type");
	if (jws.payload === void 0) throw new JWSInvalid("JWS Payload missing");
	if (typeof jws.signature !== "string") throw new JWSInvalid("JWS Signature missing or incorrect type");
	if (jws.header !== void 0 && !isObject(jws.header)) throw new JWSInvalid("JWS Unprotected Header incorrect type");
	let parsedProt = {};
	if (jws.protected) try {
		const protectedHeader = decode(jws.protected);
		parsedProt = JSON.parse(decoder.decode(protectedHeader));
	} catch {
		throw new JWSInvalid("JWS Protected Header is invalid");
	}
	if (!isDisjoint(parsedProt, jws.header)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	const joseHeader = {
		...parsedProt,
		...jws.header
	};
	const extensions = validateCrit(JWSInvalid, new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
	let b64 = true;
	if (extensions.has("b64")) {
		b64 = parsedProt.b64;
		if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	}
	const { alg } = joseHeader;
	if (typeof alg !== "string" || !alg) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	const algorithms = options && validateAlgorithms("algorithms", options.algorithms);
	if (algorithms && !algorithms.has(alg)) throw new JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (b64) {
		if (typeof jws.payload !== "string") throw new JWSInvalid("JWS Payload must be a string");
	} else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
	let resolvedKey = false;
	if (typeof key === "function") {
		key = await key(parsedProt, jws);
		resolvedKey = true;
	}
	checkKeyType(alg, key, "verify");
	const data = concat(jws.protected !== void 0 ? encode$1(jws.protected) : new Uint8Array(), encode$1("."), typeof jws.payload === "string" ? b64 ? encode$1(jws.payload) : encoder.encode(jws.payload) : jws.payload);
	let signature;
	try {
		signature = decode(jws.signature);
	} catch {
		throw new JWSInvalid("Failed to base64url decode the signature");
	}
	const k = await normalizeKey(key, alg);
	if (!await verify(alg, k, signature, data)) throw new JWSSignatureVerificationFailed();
	let payload;
	if (b64) try {
		payload = decode(jws.payload);
	} catch {
		throw new JWSInvalid("Failed to base64url decode the payload");
	}
	else if (typeof jws.payload === "string") payload = encoder.encode(jws.payload);
	else payload = jws.payload;
	const result = { payload };
	if (jws.protected !== void 0) result.protectedHeader = parsedProt;
	if (jws.header !== void 0) result.unprotectedHeader = jws.header;
	if (resolvedKey) return {
		...result,
		key: k
	};
	return result;
}
async function compactVerify(jws, key, options) {
	if (jws instanceof Uint8Array) jws = decoder.decode(jws);
	if (typeof jws !== "string") throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
	const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
	if (length !== 3) throw new JWSInvalid("Invalid Compact JWS");
	const verified = await flattenedVerify({
		payload,
		protected: protectedHeader,
		signature
	}, key, options);
	const result = {
		payload: verified.payload,
		protectedHeader: verified.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: verified.key
	};
	return result;
}
var epoch$1 = (date) => Math.floor(date.getTime() / 1e3);
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX$1 = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function secs(str) {
	const matched = REGEX$1.exec(str);
	if (!matched || matched[4] && matched[1]) throw new TypeError("Invalid time period format");
	const value = parseFloat(matched[2]);
	const unit = matched[3].toLowerCase();
	let numericDate;
	switch (unit) {
		case "sec":
		case "secs":
		case "second":
		case "seconds":
		case "s":
			numericDate = Math.round(value);
			break;
		case "minute":
		case "minutes":
		case "min":
		case "mins":
		case "m":
			numericDate = Math.round(value * minute);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			numericDate = Math.round(value * hour);
			break;
		case "day":
		case "days":
		case "d":
			numericDate = Math.round(value * day);
			break;
		case "week":
		case "weeks":
		case "w":
			numericDate = Math.round(value * week);
			break;
		default:
			numericDate = Math.round(value * year);
			break;
	}
	if (matched[1] === "-" || matched[4] === "ago") return -numericDate;
	return numericDate;
}
function validateInput(label, input) {
	if (!Number.isFinite(input)) throw new TypeError(`Invalid ${label} input`);
	return input;
}
var normalizeTyp = (value) => {
	if (value.includes("/")) return value.toLowerCase();
	return `application/${value.toLowerCase()}`;
};
var checkAudiencePresence = (audPayload, audOption) => {
	if (typeof audPayload === "string") return audOption.includes(audPayload);
	if (Array.isArray(audPayload)) return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
	return false;
};
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
	let payload;
	try {
		payload = JSON.parse(decoder.decode(encodedPayload));
	} catch {}
	if (!isObject(payload)) throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
	const { typ } = options;
	if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) throw new JWTClaimValidationFailed("unexpected \"typ\" JWT header value", payload, "typ", "check_failed");
	const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
	const presenceCheck = [...requiredClaims];
	if (maxTokenAge !== void 0) presenceCheck.push("iat");
	if (audience !== void 0) presenceCheck.push("aud");
	if (subject !== void 0) presenceCheck.push("sub");
	if (issuer !== void 0) presenceCheck.push("iss");
	for (const claim of new Set(presenceCheck.reverse())) if (!(claim in payload)) throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
	if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) throw new JWTClaimValidationFailed("unexpected \"iss\" claim value", payload, "iss", "check_failed");
	if (subject && payload.sub !== subject) throw new JWTClaimValidationFailed("unexpected \"sub\" claim value", payload, "sub", "check_failed");
	if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) throw new JWTClaimValidationFailed("unexpected \"aud\" claim value", payload, "aud", "check_failed");
	let tolerance;
	switch (typeof options.clockTolerance) {
		case "string":
			tolerance = secs(options.clockTolerance);
			break;
		case "number":
			tolerance = options.clockTolerance;
			break;
		case "undefined":
			tolerance = 0;
			break;
		default: throw new TypeError("Invalid clockTolerance option type");
	}
	const { currentDate } = options;
	const now = epoch$1(currentDate || /* @__PURE__ */ new Date());
	if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") throw new JWTClaimValidationFailed("\"iat\" claim must be a number", payload, "iat", "invalid");
	if (payload.nbf !== void 0) {
		if (typeof payload.nbf !== "number") throw new JWTClaimValidationFailed("\"nbf\" claim must be a number", payload, "nbf", "invalid");
		if (payload.nbf > now + tolerance) throw new JWTClaimValidationFailed("\"nbf\" claim timestamp check failed", payload, "nbf", "check_failed");
	}
	if (payload.exp !== void 0) {
		if (typeof payload.exp !== "number") throw new JWTClaimValidationFailed("\"exp\" claim must be a number", payload, "exp", "invalid");
		if (payload.exp <= now - tolerance) throw new JWTExpired("\"exp\" claim timestamp check failed", payload, "exp", "check_failed");
	}
	if (maxTokenAge) {
		const age = now - payload.iat;
		const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
		if (age - tolerance > max) throw new JWTExpired("\"iat\" claim timestamp check failed (too far in the past)", payload, "iat", "check_failed");
		if (age < 0 - tolerance) throw new JWTClaimValidationFailed("\"iat\" claim timestamp check failed (it should be in the past)", payload, "iat", "check_failed");
	}
	return payload;
}
var JWTClaimsBuilder = class {
	#payload;
	constructor(payload) {
		if (!isObject(payload)) throw new TypeError("JWT Claims Set MUST be an object");
		this.#payload = structuredClone(payload);
	}
	data() {
		return encoder.encode(JSON.stringify(this.#payload));
	}
	get iss() {
		return this.#payload.iss;
	}
	set iss(value) {
		this.#payload.iss = value;
	}
	get sub() {
		return this.#payload.sub;
	}
	set sub(value) {
		this.#payload.sub = value;
	}
	get aud() {
		return this.#payload.aud;
	}
	set aud(value) {
		this.#payload.aud = value;
	}
	set jti(value) {
		this.#payload.jti = value;
	}
	set nbf(value) {
		if (typeof value === "number") this.#payload.nbf = validateInput("setNotBefore", value);
		else if (value instanceof Date) this.#payload.nbf = validateInput("setNotBefore", epoch$1(value));
		else this.#payload.nbf = epoch$1(/* @__PURE__ */ new Date()) + secs(value);
	}
	set exp(value) {
		if (typeof value === "number") this.#payload.exp = validateInput("setExpirationTime", value);
		else if (value instanceof Date) this.#payload.exp = validateInput("setExpirationTime", epoch$1(value));
		else this.#payload.exp = epoch$1(/* @__PURE__ */ new Date()) + secs(value);
	}
	set iat(value) {
		if (value === void 0) this.#payload.iat = epoch$1(/* @__PURE__ */ new Date());
		else if (value instanceof Date) this.#payload.iat = validateInput("setIssuedAt", epoch$1(value));
		else if (typeof value === "string") this.#payload.iat = validateInput("setIssuedAt", epoch$1(/* @__PURE__ */ new Date()) + secs(value));
		else this.#payload.iat = validateInput("setIssuedAt", value);
	}
};
async function jwtVerify(jwt, key, options) {
	const verified = await compactVerify(jwt, key, options);
	if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
	const result = {
		payload: validateClaimsSet(verified.protectedHeader, verified.payload, options),
		protectedHeader: verified.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: verified.key
	};
	return result;
}
async function jwtDecrypt(jwt, key, options) {
	const decrypted = await compactDecrypt(jwt, key, options);
	const payload = validateClaimsSet(decrypted.protectedHeader, decrypted.plaintext, options);
	const { protectedHeader } = decrypted;
	if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) throw new JWTClaimValidationFailed("replicated \"iss\" claim header parameter mismatch", payload, "iss", "mismatch");
	if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) throw new JWTClaimValidationFailed("replicated \"sub\" claim header parameter mismatch", payload, "sub", "mismatch");
	if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) throw new JWTClaimValidationFailed("replicated \"aud\" claim header parameter mismatch", payload, "aud", "mismatch");
	const result = {
		payload,
		protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: decrypted.key
	};
	return result;
}
var CompactEncrypt = class {
	#flattened;
	constructor(plaintext) {
		this.#flattened = new FlattenedEncrypt(plaintext);
	}
	setContentEncryptionKey(cek) {
		this.#flattened.setContentEncryptionKey(cek);
		return this;
	}
	setInitializationVector(iv) {
		this.#flattened.setInitializationVector(iv);
		return this;
	}
	setProtectedHeader(protectedHeader) {
		this.#flattened.setProtectedHeader(protectedHeader);
		return this;
	}
	setKeyManagementParameters(parameters) {
		this.#flattened.setKeyManagementParameters(parameters);
		return this;
	}
	async encrypt(key, options) {
		const jwe = await this.#flattened.encrypt(key, options);
		return [
			jwe.protected,
			jwe.encrypted_key,
			jwe.iv,
			jwe.ciphertext,
			jwe.tag
		].join(".");
	}
};
async function sign(alg, key, data) {
	const cryptoKey = await getSigKey(alg, key, "sign");
	checkKeyLength(alg, cryptoKey);
	const signature = await crypto.subtle.sign(subtleAlgorithm(alg, cryptoKey.algorithm), cryptoKey, data);
	return new Uint8Array(signature);
}
var FlattenedSign = class {
	#payload;
	#protectedHeader;
	#unprotectedHeader;
	constructor(payload) {
		if (!(payload instanceof Uint8Array)) throw new TypeError("payload must be an instance of Uint8Array");
		this.#payload = payload;
	}
	setProtectedHeader(protectedHeader) {
		if (this.#protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setUnprotectedHeader(unprotectedHeader) {
		if (this.#unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
		this.#unprotectedHeader = unprotectedHeader;
		return this;
	}
	async sign(key, options) {
		if (!this.#protectedHeader && !this.#unprotectedHeader) throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
		if (!isDisjoint(this.#protectedHeader, this.#unprotectedHeader)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		const joseHeader = {
			...this.#protectedHeader,
			...this.#unprotectedHeader
		};
		const extensions = validateCrit(JWSInvalid, new Map([["b64", true]]), options?.crit, this.#protectedHeader, joseHeader);
		let b64 = true;
		if (extensions.has("b64")) {
			b64 = this.#protectedHeader.b64;
			if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		}
		const { alg } = joseHeader;
		if (typeof alg !== "string" || !alg) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		checkKeyType(alg, key, "sign");
		let payloadS;
		let payloadB;
		if (b64) {
			payloadS = encode(this.#payload);
			payloadB = encode$1(payloadS);
		} else {
			payloadB = this.#payload;
			payloadS = "";
		}
		let protectedHeaderString;
		let protectedHeaderBytes;
		if (this.#protectedHeader) {
			protectedHeaderString = encode(JSON.stringify(this.#protectedHeader));
			protectedHeaderBytes = encode$1(protectedHeaderString);
		} else {
			protectedHeaderString = "";
			protectedHeaderBytes = new Uint8Array();
		}
		const data = concat(protectedHeaderBytes, encode$1("."), payloadB);
		const jws = {
			signature: encode(await sign(alg, await normalizeKey(key, alg), data)),
			payload: payloadS
		};
		if (this.#unprotectedHeader) jws.header = this.#unprotectedHeader;
		if (this.#protectedHeader) jws.protected = protectedHeaderString;
		return jws;
	}
};
var CompactSign = class {
	#flattened;
	constructor(payload) {
		this.#flattened = new FlattenedSign(payload);
	}
	setProtectedHeader(protectedHeader) {
		this.#flattened.setProtectedHeader(protectedHeader);
		return this;
	}
	async sign(key, options) {
		const jws = await this.#flattened.sign(key, options);
		if (jws.payload === void 0) throw new TypeError("use the flattened module for creating JWS with b64: false");
		return `${jws.protected}.${jws.payload}.${jws.signature}`;
	}
};
var SignJWT = class {
	#protectedHeader;
	#jwt;
	constructor(payload = {}) {
		this.#jwt = new JWTClaimsBuilder(payload);
	}
	setIssuer(issuer) {
		this.#jwt.iss = issuer;
		return this;
	}
	setSubject(subject) {
		this.#jwt.sub = subject;
		return this;
	}
	setAudience(audience) {
		this.#jwt.aud = audience;
		return this;
	}
	setJti(jwtId) {
		this.#jwt.jti = jwtId;
		return this;
	}
	setNotBefore(input) {
		this.#jwt.nbf = input;
		return this;
	}
	setExpirationTime(input) {
		this.#jwt.exp = input;
		return this;
	}
	setIssuedAt(input) {
		this.#jwt.iat = input;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		this.#protectedHeader = protectedHeader;
		return this;
	}
	async sign(key, options) {
		const sig = new CompactSign(this.#jwt.data());
		sig.setProtectedHeader(this.#protectedHeader);
		if (Array.isArray(this.#protectedHeader?.crit) && this.#protectedHeader.crit.includes("b64") && this.#protectedHeader.b64 === false) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
		return sig.sign(key, options);
	}
};
var EncryptJWT = class {
	#cek;
	#iv;
	#keyManagementParameters;
	#protectedHeader;
	#replicateIssuerAsHeader;
	#replicateSubjectAsHeader;
	#replicateAudienceAsHeader;
	#jwt;
	constructor(payload = {}) {
		this.#jwt = new JWTClaimsBuilder(payload);
	}
	setIssuer(issuer) {
		this.#jwt.iss = issuer;
		return this;
	}
	setSubject(subject) {
		this.#jwt.sub = subject;
		return this;
	}
	setAudience(audience) {
		this.#jwt.aud = audience;
		return this;
	}
	setJti(jwtId) {
		this.#jwt.jti = jwtId;
		return this;
	}
	setNotBefore(input) {
		this.#jwt.nbf = input;
		return this;
	}
	setExpirationTime(input) {
		this.#jwt.exp = input;
		return this;
	}
	setIssuedAt(input) {
		this.#jwt.iat = input;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		if (this.#protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setKeyManagementParameters(parameters) {
		if (this.#keyManagementParameters) throw new TypeError("setKeyManagementParameters can only be called once");
		this.#keyManagementParameters = parameters;
		return this;
	}
	setContentEncryptionKey(cek) {
		if (this.#cek) throw new TypeError("setContentEncryptionKey can only be called once");
		this.#cek = cek;
		return this;
	}
	setInitializationVector(iv) {
		if (this.#iv) throw new TypeError("setInitializationVector can only be called once");
		this.#iv = iv;
		return this;
	}
	replicateIssuerAsHeader() {
		this.#replicateIssuerAsHeader = true;
		return this;
	}
	replicateSubjectAsHeader() {
		this.#replicateSubjectAsHeader = true;
		return this;
	}
	replicateAudienceAsHeader() {
		this.#replicateAudienceAsHeader = true;
		return this;
	}
	async encrypt(key, options) {
		const enc = new CompactEncrypt(this.#jwt.data());
		if (this.#protectedHeader && (this.#replicateIssuerAsHeader || this.#replicateSubjectAsHeader || this.#replicateAudienceAsHeader)) this.#protectedHeader = {
			...this.#protectedHeader,
			iss: this.#replicateIssuerAsHeader ? this.#jwt.iss : void 0,
			sub: this.#replicateSubjectAsHeader ? this.#jwt.sub : void 0,
			aud: this.#replicateAudienceAsHeader ? this.#jwt.aud : void 0
		};
		enc.setProtectedHeader(this.#protectedHeader);
		if (this.#iv) enc.setInitializationVector(this.#iv);
		if (this.#cek) enc.setContentEncryptionKey(this.#cek);
		if (this.#keyManagementParameters) enc.setKeyManagementParameters(this.#keyManagementParameters);
		return enc.encrypt(key, options);
	}
};
var check = (value, description) => {
	if (typeof value !== "string" || !value) throw new JWKInvalid(`${description} missing or invalid`);
};
async function calculateJwkThumbprint(key, digestAlgorithm) {
	let jwk;
	if (isJWK(key)) jwk = key;
	else if (isKeyLike(key)) jwk = await exportJWK(key);
	else throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
	digestAlgorithm ??= "sha256";
	if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") throw new TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
	let components;
	switch (jwk.kty) {
		case "AKP":
			check(jwk.alg, "\"alg\" (Algorithm) Parameter");
			check(jwk.pub, "\"pub\" (Public key) Parameter");
			components = {
				alg: jwk.alg,
				kty: jwk.kty,
				pub: jwk.pub
			};
			break;
		case "EC":
			check(jwk.crv, "\"crv\" (Curve) Parameter");
			check(jwk.x, "\"x\" (X Coordinate) Parameter");
			check(jwk.y, "\"y\" (Y Coordinate) Parameter");
			components = {
				crv: jwk.crv,
				kty: jwk.kty,
				x: jwk.x,
				y: jwk.y
			};
			break;
		case "OKP":
			check(jwk.crv, "\"crv\" (Subtype of Key Pair) Parameter");
			check(jwk.x, "\"x\" (Public Key) Parameter");
			components = {
				crv: jwk.crv,
				kty: jwk.kty,
				x: jwk.x
			};
			break;
		case "RSA":
			check(jwk.e, "\"e\" (Exponent) Parameter");
			check(jwk.n, "\"n\" (Modulus) Parameter");
			components = {
				e: jwk.e,
				kty: jwk.kty,
				n: jwk.n
			};
			break;
		case "oct":
			check(jwk.k, "\"k\" (Key Value) Parameter");
			components = {
				k: jwk.k,
				kty: jwk.kty
			};
			break;
		default: throw new JOSENotSupported("\"kty\" (Key Type) Parameter missing or unsupported");
	}
	const data = encode$1(JSON.stringify(components));
	return encode(await digest(digestAlgorithm, data));
}
function decodeJwt(jwt) {
	if (typeof jwt !== "string") throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
	const { 1: payload, length } = jwt.split(".");
	if (length === 5) throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
	if (length !== 3) throw new JWTInvalid("Invalid JWT");
	if (!payload) throw new JWTInvalid("JWTs must contain a payload");
	let decoded;
	try {
		decoded = decode(payload);
	} catch {
		throw new JWTInvalid("Failed to base64url decode the payload");
	}
	let result;
	try {
		result = JSON.parse(decoder.decode(decoded));
	} catch {
		throw new JWTInvalid("Failed to parse the decoded payload as JSON");
	}
	if (!isObject(result)) throw new JWTInvalid("Invalid JWT Claims Set");
	return result;
}
async function signJWT(payload, secret, expiresIn = 3600) {
	return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
}
async function verifyJWT(token, secret) {
	try {
		return (await jwtVerify(token, new TextEncoder().encode(secret))).payload;
	} catch {
		return null;
	}
}
var info = new Uint8Array([
	66,
	101,
	116,
	116,
	101,
	114,
	65,
	117,
	116,
	104,
	46,
	106,
	115,
	32,
	71,
	101,
	110,
	101,
	114,
	97,
	116,
	101,
	100,
	32,
	69,
	110,
	99,
	114,
	121,
	112,
	116,
	105,
	111,
	110,
	32,
	75,
	101,
	121
]);
var now$2 = () => Date.now() / 1e3 | 0;
var alg = "dir";
var enc = "A256CBC-HS512";
async function symmetricEncodeJWT(payload, secret, salt, expiresIn = 3600) {
	const encryptionSecret = hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
	const thumbprint = await calculateJwkThumbprint({
		kty: "oct",
		k: encode(encryptionSecret)
	}, "sha256");
	return await new EncryptJWT(payload).setProtectedHeader({
		alg,
		enc,
		kid: thumbprint
	}).setIssuedAt().setExpirationTime(now$2() + expiresIn).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
async function symmetricDecodeJWT(token, secret, salt) {
	if (!token) return null;
	try {
		const { payload } = await jwtDecrypt(token, async ({ kid }) => {
			const encryptionSecret = hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
			if (kid === void 0) return encryptionSecret;
			if (kid === await calculateJwkThumbprint({
				kty: "oct",
				k: encode(encryptionSecret)
			}, "sha256")) return encryptionSecret;
			throw new Error("no matching decryption secret");
		}, {
			clockTolerance: 15,
			keyManagementAlgorithms: [alg],
			contentEncryptionAlgorithms: [enc, "A256GCM"]
		});
		return payload;
	} catch {
		return null;
	}
}
/**
* Compare two buffers in constant time.
*/
function constantTimeEqual(a, b) {
	if (typeof a === "string") a = new TextEncoder().encode(a);
	if (typeof b === "string") b = new TextEncoder().encode(b);
	const aBuffer = new Uint8Array(a);
	const bBuffer = new Uint8Array(b);
	let c = aBuffer.length ^ bBuffer.length;
	const length = Math.max(aBuffer.length, bBuffer.length);
	for (let i = 0; i < length; i++) c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
	return c === 0;
}
var hexadecimal = "0123456789abcdef";
var hex = {
	encode: (data) => {
		if (typeof data === "string") data = new TextEncoder().encode(data);
		if (data.byteLength === 0) return "";
		const buffer = new Uint8Array(data);
		let result = "";
		for (const byte of buffer) result += byte.toString(16).padStart(2, "0");
		return result;
	},
	decode: (data) => {
		if (!data) return "";
		if (typeof data === "string") {
			if (data.length % 2 !== 0) throw new Error("Invalid hexadecimal string");
			if (!new RegExp(`^[${hexadecimal}]+$`).test(data)) throw new Error("Invalid hexadecimal string");
			const result = new Uint8Array(data.length / 2);
			for (let i = 0; i < data.length; i += 2) result[i / 2] = parseInt(data.slice(i, i + 2), 16);
			return new TextDecoder().decode(result);
		}
		return new TextDecoder().decode(data);
	}
};
/**
* PBKDF (RFC 2898). Can be used to create a key from password and salt.
* @module
*/
function pbkdf2Init(hash, _password, _salt, _opts) {
	ahash(hash);
	const { c, dkLen, asyncTick } = checkOpts$1({
		dkLen: 32,
		asyncTick: 10
	}, _opts);
	anumber$1(c, "c");
	anumber$1(dkLen, "dkLen");
	anumber$1(asyncTick, "asyncTick");
	if (c < 1) throw new Error("iterations (c) must be >= 1");
	const password = kdfInputToBytes(_password, "password");
	const salt = kdfInputToBytes(_salt, "salt");
	const DK = new Uint8Array(dkLen);
	const PRF = hmac.create(hash, password);
	return {
		c,
		dkLen,
		asyncTick,
		DK,
		PRF,
		PRFSalt: PRF._cloneInto().update(salt)
	};
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
	PRF.destroy();
	PRFSalt.destroy();
	if (prfW) prfW.destroy();
	clean$1(u);
	return DK;
}
/**
* PBKDF2-HMAC: RFC 2898 key derivation function
* @param hash - hash function that would be used e.g. sha256
* @param password - password from which a derived key is generated
* @param salt - cryptographic salt
* @param opts - {c, dkLen} where c is work factor and dkLen is output message size
* @example
* const key = pbkdf2(sha256, 'password', 'salt', { dkLen: 32, c: Math.pow(2, 18) });
*/
function pbkdf2(hash, password, salt, opts) {
	const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
	let prfW;
	const arr = new Uint8Array(4);
	const view = createView$1(arr);
	const u = new Uint8Array(PRF.outputLen);
	for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
		const Ti = DK.subarray(pos, pos + PRF.outputLen);
		view.setInt32(0, ti, false);
		(prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
		Ti.set(u.subarray(0, Ti.length));
		for (let ui = 1; ui < c; ui++) {
			PRF._cloneInto(prfW).update(u).digestInto(u);
			for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
		}
	}
	return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}
/**
* RFC 7914 Scrypt KDF. Can be used to create a key from password and salt.
* @module
*/
function XorAndSalsa(prev, pi, input, ii, out, oi) {
	let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
	let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
	let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
	let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
	let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
	let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
	let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
	let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
	let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
	for (let i = 0; i < 8; i += 2) {
		x04 ^= rotl$1(x00 + x12 | 0, 7);
		x08 ^= rotl$1(x04 + x00 | 0, 9);
		x12 ^= rotl$1(x08 + x04 | 0, 13);
		x00 ^= rotl$1(x12 + x08 | 0, 18);
		x09 ^= rotl$1(x05 + x01 | 0, 7);
		x13 ^= rotl$1(x09 + x05 | 0, 9);
		x01 ^= rotl$1(x13 + x09 | 0, 13);
		x05 ^= rotl$1(x01 + x13 | 0, 18);
		x14 ^= rotl$1(x10 + x06 | 0, 7);
		x02 ^= rotl$1(x14 + x10 | 0, 9);
		x06 ^= rotl$1(x02 + x14 | 0, 13);
		x10 ^= rotl$1(x06 + x02 | 0, 18);
		x03 ^= rotl$1(x15 + x11 | 0, 7);
		x07 ^= rotl$1(x03 + x15 | 0, 9);
		x11 ^= rotl$1(x07 + x03 | 0, 13);
		x15 ^= rotl$1(x11 + x07 | 0, 18);
		x01 ^= rotl$1(x00 + x03 | 0, 7);
		x02 ^= rotl$1(x01 + x00 | 0, 9);
		x03 ^= rotl$1(x02 + x01 | 0, 13);
		x00 ^= rotl$1(x03 + x02 | 0, 18);
		x06 ^= rotl$1(x05 + x04 | 0, 7);
		x07 ^= rotl$1(x06 + x05 | 0, 9);
		x04 ^= rotl$1(x07 + x06 | 0, 13);
		x05 ^= rotl$1(x04 + x07 | 0, 18);
		x11 ^= rotl$1(x10 + x09 | 0, 7);
		x08 ^= rotl$1(x11 + x10 | 0, 9);
		x09 ^= rotl$1(x08 + x11 | 0, 13);
		x10 ^= rotl$1(x09 + x08 | 0, 18);
		x12 ^= rotl$1(x15 + x14 | 0, 7);
		x13 ^= rotl$1(x12 + x15 | 0, 9);
		x14 ^= rotl$1(x13 + x12 | 0, 13);
		x15 ^= rotl$1(x14 + x13 | 0, 18);
	}
	out[oi++] = y00 + x00 | 0;
	out[oi++] = y01 + x01 | 0;
	out[oi++] = y02 + x02 | 0;
	out[oi++] = y03 + x03 | 0;
	out[oi++] = y04 + x04 | 0;
	out[oi++] = y05 + x05 | 0;
	out[oi++] = y06 + x06 | 0;
	out[oi++] = y07 + x07 | 0;
	out[oi++] = y08 + x08 | 0;
	out[oi++] = y09 + x09 | 0;
	out[oi++] = y10 + x10 | 0;
	out[oi++] = y11 + x11 | 0;
	out[oi++] = y12 + x12 | 0;
	out[oi++] = y13 + x13 | 0;
	out[oi++] = y14 + x14 | 0;
	out[oi++] = y15 + x15 | 0;
}
function BlockMix(input, ii, out, oi, r) {
	let head = oi + 0;
	let tail = oi + 16 * r;
	for (let i = 0; i < 16; i++) out[tail + i] = input[ii + (2 * r - 1) * 16 + i];
	for (let i = 0; i < r; i++, head += 16, ii += 16) {
		XorAndSalsa(out, tail, input, ii, out, head);
		if (i > 0) tail += 16;
		XorAndSalsa(out, head, input, ii += 16, out, tail);
	}
}
function scryptInit(password, salt, _opts) {
	const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = checkOpts$1({
		dkLen: 32,
		asyncTick: 10,
		maxmem: 1024 ** 3 + 1024
	}, _opts);
	anumber$1(N, "N");
	anumber$1(r, "r");
	anumber$1(p, "p");
	anumber$1(dkLen, "dkLen");
	anumber$1(asyncTick, "asyncTick");
	anumber$1(maxmem, "maxmem");
	if (onProgress !== void 0 && typeof onProgress !== "function") throw new Error("progressCb must be a function");
	const blockSize = 128 * r;
	const blockSize32 = blockSize / 4;
	const pow32 = Math.pow(2, 32);
	if (N <= 1 || (N & N - 1) !== 0 || N > pow32) throw new Error("\"N\" expected a power of 2, and 2^1 <= N <= 2^32");
	if (p < 1 || p > (pow32 - 1) * 32 / blockSize) throw new Error("\"p\" expected integer 1..((2^32 - 1) * 32) / (128 * r)");
	if (dkLen < 1 || dkLen > (pow32 - 1) * 32) throw new Error("\"dkLen\" expected integer 1..(2^32 - 1) * 32");
	if (blockSize * (N + p) > maxmem) throw new Error("\"maxmem\" limit was hit, expected 128*r*(N+p) <= \"maxmem\"=" + maxmem);
	const B = pbkdf2(sha256, password, salt, {
		c: 1,
		dkLen: blockSize * p
	});
	const B32 = u32$1(B);
	const V = u32$1(new Uint8Array(blockSize * N));
	const tmp = u32$1(new Uint8Array(blockSize));
	let blockMixCb = () => {};
	if (onProgress) {
		const totalBlockMix = 2 * N * p;
		const callbackPer = Math.max(Math.floor(totalBlockMix / 1e4), 1);
		let blockMixCnt = 0;
		blockMixCb = () => {
			blockMixCnt++;
			if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix)) onProgress(blockMixCnt / totalBlockMix);
		};
	}
	return {
		N,
		r,
		p,
		dkLen,
		blockSize32,
		V,
		B32,
		B,
		tmp,
		blockMixCb,
		asyncTick
	};
}
function scryptOutput(password, dkLen, B, V, tmp) {
	const res = pbkdf2(sha256, password, B, {
		c: 1,
		dkLen
	});
	clean$1(B, V, tmp);
	return res;
}
/**
* Scrypt KDF from RFC 7914. Async version. See {@link ScryptOpts}.
* @example
* await scryptAsync('password', 'salt', { N: 2**18, r: 8, p: 1, dkLen: 32 });
*/
async function scryptAsync(password, salt, opts) {
	const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick } = scryptInit(password, salt, opts);
	swap32IfBE(B32);
	for (let pi = 0; pi < p; pi++) {
		const Pi = blockSize32 * pi;
		for (let i = 0; i < blockSize32; i++) V[i] = B32[Pi + i];
		let pos = 0;
		await asyncLoop(N - 1, asyncTick, () => {
			BlockMix(V, pos, V, pos += blockSize32, r);
			blockMixCb();
		});
		BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
		blockMixCb();
		await asyncLoop(N, asyncTick, () => {
			const j = (B32[Pi + blockSize32 - 16] & N - 1) >>> 0;
			for (let k = 0; k < blockSize32; k++) tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
			BlockMix(tmp, 0, B32, Pi, r);
			blockMixCb();
		});
	}
	swap32IfBE(B32);
	return scryptOutput(password, dkLen, B, V, tmp);
}
var config = {
	N: 16384,
	r: 16,
	p: 1,
	dkLen: 64
};
async function generateKey(password, salt) {
	return await scryptAsync(password.normalize("NFKC"), salt, {
		N: config.N,
		p: config.p,
		r: config.r,
		dkLen: config.dkLen,
		maxmem: 128 * config.N * config.r * 2
	});
}
var hashPassword = async (password) => {
	const salt = hex.encode(crypto.getRandomValues(new Uint8Array(16)));
	const key = await generateKey(password, salt);
	return `${salt}:${hex.encode(key)}`;
};
var verifyPassword$1 = async ({ hash, password }) => {
	const [salt, key] = hash.split(":");
	if (!salt || !key) throw new BetterAuthError("Invalid password hash");
	return constantTimeEqual(await generateKey(password, salt), hexToBytes$1(key));
};
function expandAlphabet(alphabet) {
	switch (alphabet) {
		case "a-z": return "abcdefghijklmnopqrstuvwxyz";
		case "A-Z": return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		case "0-9": return "0123456789";
		case "-_": return "-_";
		default: throw new Error(`Unsupported alphabet: ${alphabet}`);
	}
}
function createRandomStringGenerator(...baseAlphabets) {
	const baseCharSet = baseAlphabets.map(expandAlphabet).join("");
	if (baseCharSet.length === 0) throw new Error("No valid characters provided for random string generation.");
	const baseCharSetLength = baseCharSet.length;
	return (length, ...alphabets) => {
		if (length <= 0) throw new Error("Length must be a positive integer.");
		let charSet = baseCharSet;
		let charSetLength = baseCharSetLength;
		if (alphabets.length > 0) {
			charSet = alphabets.map(expandAlphabet).join("");
			charSetLength = charSet.length;
		}
		const maxValid = Math.floor(256 / charSetLength) * charSetLength;
		const buf = new Uint8Array(length * 2);
		const bufLength = buf.length;
		let result = "";
		let bufIndex = bufLength;
		let rand;
		while (result.length < length) {
			if (bufIndex >= bufLength) {
				crypto.getRandomValues(buf);
				bufIndex = 0;
			}
			rand = buf[bufIndex++];
			if (rand < maxValid) result += charSet[rand % charSetLength];
		}
		return result;
	};
}
var generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");
/**
* Utilities for hex, bytes, CSPRNG.
* @module
*/
/** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */
function isBytes(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
/** Asserts something is boolean. */
function abool(b) {
	if (typeof b !== "boolean") throw new Error(`boolean expected, not ${b}`);
}
/** Asserts something is positive integer. */
function anumber(n) {
	if (!Number.isSafeInteger(n) || n < 0) throw new Error("positive integer expected, got " + n);
}
/** Asserts something is Uint8Array. */
function abytes(value, length, title = "") {
	const bytes = isBytes(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
	}
	return value;
}
/** Asserts a hash instance has not been destroyed / finished */
function aexists(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
/** Asserts output is properly-sized byte array */
function aoutput(out, instance) {
	abytes(out, void 0, "output");
	const min = instance.outputLen;
	if (out.length < min) throw new Error("digestInto() expects output buffer of length at least " + min);
}
/** Cast u8 / u16 / u32 to u32. */
function u32(arr) {
	return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
/** Zeroize a byte array. Warning: JS provides no guarantees. */
function clean(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/** Create DataView of an array for easy byte-level manipulation. */
function createView(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/** Is current platform little-endian? Most are. Big-Endian platform: IBM */
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
var hasHexBuiltin = typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
/**
* Convert byte array to hex string. Uses built-in function, when available.
* @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
*/
function bytesToHex(bytes) {
	abytes(bytes);
	if (hasHexBuiltin) return bytes.toHex();
	let hex = "";
	for (let i = 0; i < bytes.length; i++) hex += hexes[bytes[i]];
	return hex;
}
var asciis = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function asciiToBase16(ch) {
	if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0;
	if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10);
	if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10);
}
/**
* Convert hex string to byte array. Uses built-in function, when available.
* @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
*/
function hexToBytes(hex) {
	if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
	if (hasHexBuiltin) return Uint8Array.fromHex(hex);
	const hl = hex.length;
	const al = hl / 2;
	if (hl % 2) throw new Error("hex string expected, got unpadded hex of length " + hl);
	const array = new Uint8Array(al);
	for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		const n1 = asciiToBase16(hex.charCodeAt(hi));
		const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
		if (n1 === void 0 || n2 === void 0) {
			const char = hex[hi] + hex[hi + 1];
			throw new Error("hex string expected, got non-hex character \"" + char + "\" at index " + hi);
		}
		array[ai] = n1 * 16 + n2;
	}
	return array;
}
/**
* Converts string to bytes using UTF8 encoding.
* @example utf8ToBytes('abc') // new Uint8Array([97, 98, 99])
*/
function utf8ToBytes(str) {
	if (typeof str !== "string") throw new Error("string expected");
	return new Uint8Array(new TextEncoder().encode(str));
}
/**
* Copies several Uint8Arrays into one.
*/
function concatBytes(...arrays) {
	let sum = 0;
	for (let i = 0; i < arrays.length; i++) {
		const a = arrays[i];
		abytes(a);
		sum += a.length;
	}
	const res = new Uint8Array(sum);
	for (let i = 0, pad = 0; i < arrays.length; i++) {
		const a = arrays[i];
		res.set(a, pad);
		pad += a.length;
	}
	return res;
}
function checkOpts(defaults, opts) {
	if (opts == null || typeof opts !== "object") throw new Error("options must be defined");
	return Object.assign(defaults, opts);
}
/** Compares 2 uint8array-s in kinda constant time. */
function equalBytes(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
	return diff === 0;
}
/**
* Wraps a cipher: validates args, ensures encrypt() can only be called once.
* @__NO_SIDE_EFFECTS__
*/
var wrapCipher = (params, constructor) => {
	function wrappedCipher(key, ...args) {
		abytes(key, void 0, "key");
		if (!isLE) throw new Error("Non little-endian hardware is not yet supported");
		if (params.nonceLength !== void 0) {
			const nonce = args[0];
			abytes(nonce, params.varSizeNonce ? void 0 : params.nonceLength, "nonce");
		}
		const tagl = params.tagLength;
		if (tagl && args[1] !== void 0) abytes(args[1], void 0, "AAD");
		const cipher = constructor(key, ...args);
		const checkOutput = (fnLength, output) => {
			if (output !== void 0) {
				if (fnLength !== 2) throw new Error("cipher output not supported");
				abytes(output, void 0, "output");
			}
		};
		let called = false;
		return {
			encrypt(data, output) {
				if (called) throw new Error("cannot encrypt() twice with same key + nonce");
				called = true;
				abytes(data);
				checkOutput(cipher.encrypt.length, output);
				return cipher.encrypt(data, output);
			},
			decrypt(data, output) {
				abytes(data);
				if (tagl && data.length < tagl) throw new Error("\"ciphertext\" expected length bigger than tagLength=" + tagl);
				checkOutput(cipher.decrypt.length, output);
				return cipher.decrypt(data, output);
			}
		};
	}
	Object.assign(wrappedCipher, params);
	return wrappedCipher;
};
/**
* By default, returns u8a of length.
* When out is available, it checks it for validity and uses it.
*/
function getOutput(expectedLength, out, onlyAligned = true) {
	if (out === void 0) return new Uint8Array(expectedLength);
	if (out.length !== expectedLength) throw new Error("\"output\" expected Uint8Array of length " + expectedLength + ", got: " + out.length);
	if (onlyAligned && !isAligned32$1(out)) throw new Error("invalid output, must be aligned");
	return out;
}
function u64Lengths(dataLength, aadLength, isLE) {
	abool(isLE);
	const num = new Uint8Array(16);
	const view = createView(num);
	view.setBigUint64(0, BigInt(aadLength), isLE);
	view.setBigUint64(8, BigInt(dataLength), isLE);
	return num;
}
function isAligned32$1(bytes) {
	return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
	return Uint8Array.from(bytes);
}
/** Cryptographically secure PRNG. Uses internal OS-level `crypto.getRandomValues`. */
function randomBytes(bytesLength = 32) {
	const cr = typeof globalThis === "object" ? globalThis.crypto : null;
	if (typeof cr?.getRandomValues !== "function") throw new Error("crypto.getRandomValues must be defined");
	return cr.getRandomValues(new Uint8Array(bytesLength));
}
/**
* Uses CSPRG for nonce, nonce injected in ciphertext.
* For `encrypt`, a `nonceBytes`-length buffer is fetched from CSPRNG and
* prepended to encrypted ciphertext. For `decrypt`, first `nonceBytes` of ciphertext
* are treated as nonce.
*
* NOTE: Under the same key, using random nonces (e.g. `managedNonce`) with AES-GCM and ChaCha
* should be limited to `2**23` (8M) messages to get a collision chance of `2**-50`. Stretching to  * `2**32` (4B) messages, chance would become `2**-33` - still negligible, but creeping up.
* @example
* const gcm = managedNonce(aes.gcm);
* const ciphr = gcm(key).encrypt(data);
* const plain = gcm(key).decrypt(ciph);
*/
function managedNonce(fn, randomBytes_ = randomBytes) {
	const { nonceLength } = fn;
	anumber(nonceLength);
	const addNonce = (nonce, ciphertext) => {
		const out = concatBytes(nonce, ciphertext);
		ciphertext.fill(0);
		return out;
	};
	return ((key, ...args) => ({
		encrypt(plaintext) {
			abytes(plaintext);
			const nonce = randomBytes_(nonceLength);
			const encrypted = fn(key, nonce, ...args).encrypt(plaintext);
			if (encrypted instanceof Promise) return encrypted.then((ct) => addNonce(nonce, ct));
			return addNonce(nonce, encrypted);
		},
		decrypt(ciphertext) {
			abytes(ciphertext);
			const nonce = ciphertext.subarray(0, nonceLength);
			const decrypted = ciphertext.subarray(nonceLength);
			return fn(key, nonce, ...args).decrypt(decrypted);
		}
	}));
}
/**
* Basic utils for ARX (add-rotate-xor) salsa and chacha ciphers.

RFC8439 requires multi-step cipher stream, where
authKey starts with counter: 0, actual msg with counter: 1.

For this, we need a way to re-use nonce / counter:

const counter = new Uint8Array(4);
chacha(..., counter, ...); // counter is now 1
chacha(..., counter, ...); // counter is now 2

This is complicated:

- 32-bit counters are enough, no need for 64-bit: max ArrayBuffer size in JS is 4GB
- Original papers don't allow mutating counters
- Counter overflow is undefined [^1]
- Idea A: allow providing (nonce | counter) instead of just nonce, re-use it
- Caveat: Cannot be re-used through all cases:
- * chacha has (counter | nonce)
- * xchacha has (nonce16 | counter | nonce16)
- Idea B: separate nonce / counter and provide separate API for counter re-use
- Caveat: there are different counter sizes depending on an algorithm.
- salsa & chacha also differ in structures of key & sigma:
salsa20:      s[0] | k(4) | s[1] | nonce(2) | cnt(2) | s[2] | k(4) | s[3]
chacha:       s(4) | k(8) | cnt(1) | nonce(3)
chacha20orig: s(4) | k(8) | cnt(2) | nonce(2)
- Idea C: helper method such as `setSalsaState(key, nonce, sigma, data)`
- Caveat: we can't re-use counter array

xchacha [^2] uses the subkey and remaining 8 byte nonce with ChaCha20 as normal
(prefixed by 4 NUL bytes, since [RFC8439] specifies a 12-byte nonce).

[^1]: https://mailarchive.ietf.org/arch/msg/cfrg/gsOnTJzcbgG6OqD8Sc0GO5aR_tU/
[^2]: https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha#appendix-A.2

* @module
*/
var encodeStr = (str) => Uint8Array.from(str.split(""), (c) => c.charCodeAt(0));
var sigma16 = encodeStr("expand 16-byte k");
var sigma32 = encodeStr("expand 32-byte k");
var sigma16_32 = u32(sigma16);
var sigma32_32 = u32(sigma32);
/** Rotate left. */
function rotl(a, b) {
	return a << b | a >>> 32 - b;
}
function isAligned32(b) {
	return b.byteOffset % 4 === 0;
}
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = 2 ** 32 - 1;
var U32_EMPTY = Uint32Array.of();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
	const len = data.length;
	const block = new Uint8Array(BLOCK_LEN);
	const b32 = u32(block);
	const isAligned = isAligned32(data) && isAligned32(output);
	const d32 = isAligned ? u32(data) : U32_EMPTY;
	const o32 = isAligned ? u32(output) : U32_EMPTY;
	for (let pos = 0; pos < len; counter++) {
		core(sigma, key, nonce, b32, counter, rounds);
		if (counter >= MAX_COUNTER) throw new Error("arx: counter overflow");
		const take = Math.min(BLOCK_LEN, len - pos);
		if (isAligned && take === BLOCK_LEN) {
			const pos32 = pos / 4;
			if (pos % 4 !== 0) throw new Error("arx: invalid block position");
			for (let j = 0, posj; j < BLOCK_LEN32; j++) {
				posj = pos32 + j;
				o32[posj] = d32[posj] ^ b32[j];
			}
			pos += BLOCK_LEN;
			continue;
		}
		for (let j = 0, posj; j < take; j++) {
			posj = pos + j;
			output[posj] = data[posj] ^ block[j];
		}
		pos += take;
	}
}
/** Creates ARX-like (ChaCha, Salsa) cipher stream from core function. */
function createCipher(core, opts) {
	const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({
		allowShortKeys: false,
		counterLength: 8,
		counterRight: false,
		rounds: 20
	}, opts);
	if (typeof core !== "function") throw new Error("core must be a function");
	anumber(counterLength);
	anumber(rounds);
	abool(counterRight);
	abool(allowShortKeys);
	return (key, nonce, data, output, counter = 0) => {
		abytes(key, void 0, "key");
		abytes(nonce, void 0, "nonce");
		abytes(data, void 0, "data");
		const len = data.length;
		if (output === void 0) output = new Uint8Array(len);
		abytes(output, void 0, "output");
		anumber(counter);
		if (counter < 0 || counter >= MAX_COUNTER) throw new Error("arx: counter overflow");
		if (output.length < len) throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
		const toClean = [];
		let l = key.length;
		let k;
		let sigma;
		if (l === 32) {
			toClean.push(k = copyBytes(key));
			sigma = sigma32_32;
		} else if (l === 16 && allowShortKeys) {
			k = new Uint8Array(32);
			k.set(key);
			k.set(key, 16);
			sigma = sigma16_32;
			toClean.push(k);
		} else {
			abytes(key, 32, "arx key");
			throw new Error("invalid key size");
		}
		if (!isAligned32(nonce)) toClean.push(nonce = copyBytes(nonce));
		const k32 = u32(k);
		if (extendNonceFn) {
			if (nonce.length !== 24) throw new Error(`arx: extended nonce must be 24 bytes`);
			extendNonceFn(sigma, k32, u32(nonce.subarray(0, 16)), k32);
			nonce = nonce.subarray(16);
		}
		const nonceNcLen = 16 - counterLength;
		if (nonceNcLen !== nonce.length) throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
		if (nonceNcLen !== 12) {
			const nc = new Uint8Array(12);
			nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
			nonce = nc;
			toClean.push(nonce);
		}
		const n32 = u32(nonce);
		runCipher(core, sigma, k32, n32, data, output, counter, rounds);
		clean(...toClean);
		return output;
	};
}
/**
* Poly1305 ([PDF](https://cr.yp.to/mac/poly1305-20050329.pdf),
* [wiki](https://en.wikipedia.org/wiki/Poly1305))
* is a fast and parallel secret-key message-authentication code suitable for
* a wide variety of applications. It was standardized in
* [RFC 8439](https://www.rfc-editor.org/rfc/rfc8439) and is now used in TLS 1.3.
*
* Polynomial MACs are not perfect for every situation:
* they lack Random Key Robustness: the MAC can be forged, and can't be used in PAKE schemes.
* See [invisible salamanders attack](https://keymaterial.net/2020/09/07/invisible-salamanders-in-aes-gcm-siv/).
* To combat invisible salamanders, `hash(key)` can be included in ciphertext,
* however, this would violate ciphertext indistinguishability:
* an attacker would know which key was used - so `HKDF(key, i)`
* could be used instead.
*
* Check out [original website](https://cr.yp.to/mac.html).
* Based on Public Domain [poly1305-donna](https://github.com/floodyberry/poly1305-donna).
* @module
*/
function u8to16(a, i) {
	return a[i++] & 255 | (a[i++] & 255) << 8;
}
/** Poly1305 class. Prefer poly1305() function instead. */
var Poly1305 = class {
	blockLen = 16;
	outputLen = 16;
	buffer = new Uint8Array(16);
	r = new Uint16Array(10);
	h = new Uint16Array(10);
	pad = new Uint16Array(8);
	pos = 0;
	finished = false;
	constructor(key) {
		key = copyBytes(abytes(key, 32, "key"));
		const t0 = u8to16(key, 0);
		const t1 = u8to16(key, 2);
		const t2 = u8to16(key, 4);
		const t3 = u8to16(key, 6);
		const t4 = u8to16(key, 8);
		const t5 = u8to16(key, 10);
		const t6 = u8to16(key, 12);
		const t7 = u8to16(key, 14);
		this.r[0] = t0 & 8191;
		this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
		this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
		this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
		this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
		this.r[5] = t4 >>> 1 & 8190;
		this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
		this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
		this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
		this.r[9] = t7 >>> 5 & 127;
		for (let i = 0; i < 8; i++) this.pad[i] = u8to16(key, 16 + 2 * i);
	}
	process(data, offset, isLast = false) {
		const hibit = isLast ? 0 : 2048;
		const { h, r } = this;
		const r0 = r[0];
		const r1 = r[1];
		const r2 = r[2];
		const r3 = r[3];
		const r4 = r[4];
		const r5 = r[5];
		const r6 = r[6];
		const r7 = r[7];
		const r8 = r[8];
		const r9 = r[9];
		const t0 = u8to16(data, offset + 0);
		const t1 = u8to16(data, offset + 2);
		const t2 = u8to16(data, offset + 4);
		const t3 = u8to16(data, offset + 6);
		const t4 = u8to16(data, offset + 8);
		const t5 = u8to16(data, offset + 10);
		const t6 = u8to16(data, offset + 12);
		const t7 = u8to16(data, offset + 14);
		let h0 = h[0] + (t0 & 8191);
		let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
		let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
		let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
		let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
		let h5 = h[5] + (t4 >>> 1 & 8191);
		let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
		let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
		let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
		let h9 = h[9] + (t7 >>> 5 | hibit);
		let c = 0;
		let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
		c = d0 >>> 13;
		d0 &= 8191;
		d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
		c += d0 >>> 13;
		d0 &= 8191;
		let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
		c = d1 >>> 13;
		d1 &= 8191;
		d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
		c += d1 >>> 13;
		d1 &= 8191;
		let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
		c = d2 >>> 13;
		d2 &= 8191;
		d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
		c += d2 >>> 13;
		d2 &= 8191;
		let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
		c = d3 >>> 13;
		d3 &= 8191;
		d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
		c += d3 >>> 13;
		d3 &= 8191;
		let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
		c = d4 >>> 13;
		d4 &= 8191;
		d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
		c += d4 >>> 13;
		d4 &= 8191;
		let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
		c = d5 >>> 13;
		d5 &= 8191;
		d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
		c += d5 >>> 13;
		d5 &= 8191;
		let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
		c = d6 >>> 13;
		d6 &= 8191;
		d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
		c += d6 >>> 13;
		d6 &= 8191;
		let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
		c = d7 >>> 13;
		d7 &= 8191;
		d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
		c += d7 >>> 13;
		d7 &= 8191;
		let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
		c = d8 >>> 13;
		d8 &= 8191;
		d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
		c += d8 >>> 13;
		d8 &= 8191;
		let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
		c = d9 >>> 13;
		d9 &= 8191;
		d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
		c += d9 >>> 13;
		d9 &= 8191;
		c = (c << 2) + c | 0;
		c = c + d0 | 0;
		d0 = c & 8191;
		c = c >>> 13;
		d1 += c;
		h[0] = d0;
		h[1] = d1;
		h[2] = d2;
		h[3] = d3;
		h[4] = d4;
		h[5] = d5;
		h[6] = d6;
		h[7] = d7;
		h[8] = d8;
		h[9] = d9;
	}
	finalize() {
		const { h, pad } = this;
		const g = new Uint16Array(10);
		let c = h[1] >>> 13;
		h[1] &= 8191;
		for (let i = 2; i < 10; i++) {
			h[i] += c;
			c = h[i] >>> 13;
			h[i] &= 8191;
		}
		h[0] += c * 5;
		c = h[0] >>> 13;
		h[0] &= 8191;
		h[1] += c;
		c = h[1] >>> 13;
		h[1] &= 8191;
		h[2] += c;
		g[0] = h[0] + 5;
		c = g[0] >>> 13;
		g[0] &= 8191;
		for (let i = 1; i < 10; i++) {
			g[i] = h[i] + c;
			c = g[i] >>> 13;
			g[i] &= 8191;
		}
		g[9] -= 8192;
		let mask = (c ^ 1) - 1;
		for (let i = 0; i < 10; i++) g[i] &= mask;
		mask = ~mask;
		for (let i = 0; i < 10; i++) h[i] = h[i] & mask | g[i];
		h[0] = (h[0] | h[1] << 13) & 65535;
		h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
		h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
		h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
		h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
		h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
		h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
		h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
		let f = h[0] + pad[0];
		h[0] = f & 65535;
		for (let i = 1; i < 8; i++) {
			f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
			h[i] = f & 65535;
		}
		clean(g);
	}
	update(data) {
		aexists(this);
		abytes(data);
		data = copyBytes(data);
		const { buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				for (; blockLen <= len - pos; pos += blockLen) this.process(data, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(buffer, 0, false);
				this.pos = 0;
			}
		}
		return this;
	}
	destroy() {
		clean(this.h, this.r, this.buffer, this.pad);
	}
	digestInto(out) {
		aexists(this);
		aoutput(out, this);
		this.finished = true;
		const { buffer, h } = this;
		let { pos } = this;
		if (pos) {
			buffer[pos++] = 1;
			for (; pos < 16; pos++) buffer[pos] = 0;
			this.process(buffer, 0, true);
		}
		this.finalize();
		let opos = 0;
		for (let i = 0; i < 8; i++) {
			out[opos++] = h[i] >>> 0;
			out[opos++] = h[i] >>> 8;
		}
		return out;
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
};
function wrapConstructorWithKey(hashCons) {
	const hashC = (msg, key) => hashCons(key).update(msg).digest();
	const tmp = hashCons(new Uint8Array(32));
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.create = (key) => hashCons(key);
	return hashC;
}
/** Poly1305 MAC from RFC 8439. */
var poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));
/**
* ChaCha stream cipher, released
* in 2008. Developed after Salsa20, ChaCha aims to increase diffusion per round.
* It was standardized in [RFC 8439](https://www.rfc-editor.org/rfc/rfc8439) and
* is now used in TLS 1.3.
*
* [XChaCha20](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha)
* extended-nonce variant is also provided. Similar to XSalsa, it's safe to use with
* randomly-generated nonces.
*
* Check out [PDF](http://cr.yp.to/chacha/chacha-20080128.pdf) and
* [wiki](https://en.wikipedia.org/wiki/Salsa20) and
* [website](https://cr.yp.to/chacha.html).
*
* @module
*/
/** Identical to `chachaCore_small`. Unused. */
function chachaCore(s, k, n, out, cnt, rounds = 20) {
	let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
	let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
	for (let r = 0; r < rounds; r += 2) {
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 16);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 12);
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 8);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 7);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 16);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 12);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 8);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 7);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 16);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 12);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 8);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 7);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 16);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 12);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 8);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 7);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 16);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 12);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 8);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 7);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 16);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 12);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 8);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 7);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 16);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 12);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 8);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 7);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 16);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 12);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 8);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 7);
	}
	let oi = 0;
	out[oi++] = y00 + x00 | 0;
	out[oi++] = y01 + x01 | 0;
	out[oi++] = y02 + x02 | 0;
	out[oi++] = y03 + x03 | 0;
	out[oi++] = y04 + x04 | 0;
	out[oi++] = y05 + x05 | 0;
	out[oi++] = y06 + x06 | 0;
	out[oi++] = y07 + x07 | 0;
	out[oi++] = y08 + x08 | 0;
	out[oi++] = y09 + x09 | 0;
	out[oi++] = y10 + x10 | 0;
	out[oi++] = y11 + x11 | 0;
	out[oi++] = y12 + x12 | 0;
	out[oi++] = y13 + x13 | 0;
	out[oi++] = y14 + x14 | 0;
	out[oi++] = y15 + x15 | 0;
}
/**
* hchacha hashes key and nonce into key' and nonce' for xchacha20.
* Identical to `hchacha_small`.
* Need to find a way to merge it with `chachaCore` without 25% performance hit.
*/
function hchacha(s, k, i, out) {
	let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
	for (let r = 0; r < 20; r += 2) {
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 16);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 12);
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 8);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 7);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 16);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 12);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 8);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 7);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 16);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 12);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 8);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 7);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 16);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 12);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 8);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 7);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 16);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 12);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 8);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 7);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 16);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 12);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 8);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 7);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 16);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 12);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 8);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 7);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 16);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 12);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 8);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 7);
	}
	let oi = 0;
	out[oi++] = x00;
	out[oi++] = x01;
	out[oi++] = x02;
	out[oi++] = x03;
	out[oi++] = x12;
	out[oi++] = x13;
	out[oi++] = x14;
	out[oi++] = x15;
}
/**
* ChaCha stream cipher. Conforms to RFC 8439 (IETF, TLS). 12-byte nonce, 4-byte counter.
* With smaller nonce, it's not safe to make it random (CSPRNG), due to collision chance.
*/
var chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
	counterRight: false,
	counterLength: 4,
	allowShortKeys: false
});
/**
* XChaCha eXtended-nonce ChaCha. With 24-byte nonce, it's safe to make it random (CSPRNG).
* See [IRTF draft](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha).
*/
var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
	counterRight: false,
	counterLength: 8,
	extendNonceFn: hchacha,
	allowShortKeys: false
});
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var updatePadded = (h, msg) => {
	h.update(msg);
	const leftover = msg.length % 16;
	if (leftover) h.update(ZEROS16.subarray(leftover));
};
var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, ciphertext, AAD) {
	if (AAD !== void 0) abytes(AAD, void 0, "AAD");
	const authKey = fn(key, nonce, ZEROS32);
	const lengths = u64Lengths(ciphertext.length, AAD ? AAD.length : 0, true);
	const h = poly1305.create(authKey);
	if (AAD) updatePadded(h, AAD);
	updatePadded(h, ciphertext);
	h.update(lengths);
	const res = h.digest();
	clean(authKey, lengths);
	return res;
}
/**
* AEAD algorithm from RFC 8439.
* Salsa20 and chacha (RFC 8439) use poly1305 differently.
* We could have composed them, but it's hard because of authKey:
* In salsa20, authKey changes position in salsa stream.
* In chacha, authKey can't be computed inside computeTag, it modifies the counter.
*/
var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
	const tagLength = 16;
	return {
		encrypt(plaintext, output) {
			const plength = plaintext.length;
			output = getOutput(plength + tagLength, output, false);
			output.set(plaintext);
			const oPlain = output.subarray(0, -tagLength);
			xorStream(key, nonce, oPlain, oPlain, 1);
			const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
			output.set(tag, plength);
			clean(tag);
			return output;
		},
		decrypt(ciphertext, output) {
			output = getOutput(ciphertext.length - tagLength, output, false);
			const data = ciphertext.subarray(0, -tagLength);
			const passedTag = ciphertext.subarray(-tagLength);
			const tag = computeTag(xorStream, key, nonce, data, AAD);
			if (!equalBytes(passedTag, tag)) throw new Error("invalid tag");
			output.set(ciphertext.subarray(0, -tagLength));
			xorStream(key, nonce, output, output, 1);
			clean(tag);
			return output;
		}
	};
};
_poly1305_aead(chacha20);
/**
* XChaCha20-Poly1305 extended-nonce chacha.
*
* Can be safely used with random nonces (CSPRNG).
* See [IRTF draft](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha).
*/
var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({
	blockSize: 64,
	nonceLength: 24,
	tagLength: 16
}, _poly1305_aead(xchacha20));
var symmetricEncrypt = async ({ key, data }) => {
	const keyAsBytes = await createHash("SHA-256").digest(key);
	const dataAsBytes = utf8ToBytes(data);
	return bytesToHex(managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes)).encrypt(dataAsBytes));
};
var symmetricDecrypt = async ({ key, data }) => {
	const keyAsBytes = await createHash("SHA-256").digest(key);
	const dataAsBytes = hexToBytes(data);
	const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
	return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
};
var ALLOWED_COOKIE_SIZE = 4096;
var ESTIMATED_EMPTY_COOKIE_SIZE = 200;
var CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
/**
* Parse cookies from the request headers
*/
function parseCookiesFromContext(ctx) {
	const cookieHeader = ctx.headers?.get("cookie");
	if (!cookieHeader) return {};
	const cookies = {};
	const pairs = cookieHeader.split("; ");
	for (const pair of pairs) {
		const [name, ...valueParts] = pair.split("=");
		if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
	}
	return cookies;
}
/**
* Extract the chunk index from a cookie name
*/
function getChunkIndex(cookieName) {
	const parts = cookieName.split(".");
	const lastPart = parts[parts.length - 1];
	const index = parseInt(lastPart || "0", 10);
	return isNaN(index) ? 0 : index;
}
/**
* Read all existing chunks from cookies
*/
function readExistingChunks(cookieName, ctx) {
	const chunks = {};
	const cookies = parseCookiesFromContext(ctx);
	for (const [name, value] of Object.entries(cookies)) if (name.startsWith(cookieName)) chunks[name] = value;
	return chunks;
}
/**
* Get the full session data by joining all chunks
*/
function joinChunks(chunks) {
	return Object.keys(chunks).sort((a, b) => {
		return getChunkIndex(a) - getChunkIndex(b);
	}).map((key) => chunks[key]).join("");
}
/**
* Split a cookie value into chunks if needed
*/
function chunkCookie(storeName, cookie, chunks, logger) {
	const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
	if (chunkCount === 1) {
		chunks[cookie.name] = cookie.value;
		return [cookie];
	}
	const cookies = [];
	for (let i = 0; i < chunkCount; i++) {
		const name = `${cookie.name}.${i}`;
		const start = i * CHUNK_SIZE;
		const value = cookie.value.substring(start, start + CHUNK_SIZE);
		cookies.push({
			...cookie,
			name,
			value
		});
		chunks[name] = value;
	}
	logger.debug(`CHUNKING_${storeName.toUpperCase()}_COOKIE`, {
		message: `${storeName} cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
		emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
		valueSize: cookie.value.length,
		chunkCount,
		chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
	});
	return cookies;
}
/**
* Get all cookies that should be cleaned (removed)
*/
function getCleanCookies(chunks, cookieOptions) {
	const cleanedChunks = {};
	for (const name in chunks) cleanedChunks[name] = {
		name,
		value: "",
		attributes: {
			...cookieOptions,
			maxAge: 0
		}
	};
	return cleanedChunks;
}
/**
* Create a session store for handling cookie chunking.
* When session data exceeds 4KB, it automatically splits it into multiple cookies.
*
* Based on next-auth's SessionStore implementation.
* @see https://github.com/nextauthjs/next-auth/blob/27b2519b84b8eb9cf053775dea29d577d2aa0098/packages/next-auth/src/core/lib/cookie.ts
*/
var storeFactory = (storeName) => (cookieName, cookieOptions, ctx) => {
	const chunks = readExistingChunks(cookieName, ctx);
	const logger = ctx.context.logger;
	return {
		getValue() {
			return joinChunks(chunks);
		},
		hasChunks() {
			return Object.keys(chunks).length > 0;
		},
		chunk(value, options) {
			const cleanedChunks = getCleanCookies(chunks, cookieOptions);
			for (const name in chunks) delete chunks[name];
			const cookies = cleanedChunks;
			const chunked = chunkCookie(storeName, {
				name: cookieName,
				value,
				attributes: {
					...cookieOptions,
					...options
				}
			}, chunks, logger);
			for (const chunk of chunked) cookies[chunk.name] = chunk;
			return Object.values(cookies);
		},
		clean() {
			const cleanedChunks = getCleanCookies(chunks, cookieOptions);
			for (const name in chunks) delete chunks[name];
			return Object.values(cleanedChunks);
		},
		setCookies(cookies) {
			for (const cookie of cookies) ctx.setCookie(cookie.name, cookie.value, cookie.attributes);
		}
	};
};
var createSessionStore = storeFactory("Session");
var createAccountStore = storeFactory("Account");
function getChunkedCookie(ctx, cookieName) {
	const value = ctx.getCookie(cookieName);
	if (value) return value;
	const chunks = [];
	const cookieHeader = ctx.headers?.get("cookie");
	if (!cookieHeader) return null;
	const cookies = {};
	const pairs = cookieHeader.split("; ");
	for (const pair of pairs) {
		const [name, ...valueParts] = pair.split("=");
		if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
	}
	for (const [name, val] of Object.entries(cookies)) if (name.startsWith(cookieName + ".")) {
		const indexStr = name.split(".").at(-1);
		const index = parseInt(indexStr || "0", 10);
		if (!isNaN(index)) chunks.push({
			index,
			value: val
		});
	}
	if (chunks.length > 0) {
		chunks.sort((a, b) => a.index - b.index);
		return chunks.map((c) => c.value).join("");
	}
	return null;
}
async function setAccountCookie(c, accountData) {
	const accountDataCookie = c.context.authCookies.accountData;
	const options = {
		maxAge: 300,
		...accountDataCookie.attributes
	};
	const data = await symmetricEncodeJWT(accountData, c.context.secret, "better-auth-account", options.maxAge);
	if (data.length > ALLOWED_COOKIE_SIZE) {
		const accountStore = createAccountStore(accountDataCookie.name, options, c);
		const cookies = accountStore.chunk(data, options);
		accountStore.setCookies(cookies);
	} else {
		const accountStore = createAccountStore(accountDataCookie.name, options, c);
		if (accountStore.hasChunks()) {
			const cleanCookies = accountStore.clean();
			accountStore.setCookies(cleanCookies);
		}
		c.setCookie(accountDataCookie.name, data, options);
	}
}
async function getAccountCookie(c) {
	const accountCookie = getChunkedCookie(c, c.context.authCookies.accountData.name);
	if (accountCookie) {
		const accountData = safeJSONParse(await symmetricDecodeJWT(accountCookie, c.context.secret, "better-auth-account"));
		if (accountData) return accountData;
	}
	return null;
}
var getSessionQuerySchema$1 = optional(object({
	disableCookieCache: boolean$1().meta({ description: "Disable cookie cache and fetch session from database" }).optional(),
	disableRefresh: boolean$1().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
var SEC = 1e3;
var MIN = SEC * 60;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)(?: (ago|from now))?$/i;
function parse(value) {
	const match = REGEX.exec(value);
	if (!match || match[4] && match[1]) throw new TypeError(`Invalid time string format: "${value}". Use formats like "7d", "30m", "1 hour", etc.`);
	const n = parseFloat(match[2]);
	const unit = match[3].toLowerCase();
	let result;
	switch (unit) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y":
			result = n * YEAR;
			break;
		case "months":
		case "month":
		case "mo":
			result = n * MONTH;
			break;
		case "weeks":
		case "week":
		case "w":
			result = n * WEEK;
			break;
		case "days":
		case "day":
		case "d":
			result = n * DAY;
			break;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h":
			result = n * HOUR;
			break;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m":
			result = n * MIN;
			break;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s":
			result = n * SEC;
			break;
		default: throw new TypeError(`Unknown time unit: "${unit}"`);
	}
	if (match[1] === "-" || match[4] === "ago") return -result;
	return result;
}
/**
* Parse a time string and return the value in milliseconds.
*
* @param value - A time string like "7d", "30m", "1 hour", "2 hours ago"
* @returns The parsed value in milliseconds
* @throws TypeError if the string format is invalid
*
* @example
* ms("1d")          // 86400000
* ms("2 hours")     // 7200000
* ms("30s")         // 30000
* ms("2 hours ago") // -7200000
*/
function ms(value) {
	return parse(value);
}
/**
* Parse a time string and return the value in seconds.
*
* @param value - A time string like "7d", "30m", "1 hour", "2 hours ago"
* @returns The parsed value in seconds (rounded)
* @throws TypeError if the string format is invalid
*
* @example
* sec("1d")          // 86400
* sec("2 hours")     // 7200
* sec("-30s")        // -30
* sec("2 hours ago") // -7200
*/
function sec(value) {
	return Math.round(parse(value) / 1e3);
}
var SECURE_COOKIE_PREFIX = "__Secure-";
/**
* Split `Set-Cookie` header, handling commas in `Expires` dates.
*/
function splitSetCookieHeader(setCookie) {
	if (!setCookie) return [];
	const result = [];
	let current = "";
	let i = 0;
	while (i < setCookie.length) {
		const c = setCookie[i];
		if (c === ",") {
			const lower = current.toLowerCase();
			if (lower.includes("expires=") && !lower.includes("gmt")) {
				current += c;
				i++;
			} else {
				const trimmed = current.trim();
				if (trimmed) result.push(trimmed);
				current = "";
				i++;
				if (i < setCookie.length && setCookie[i] === " ") i++;
			}
			continue;
		}
		current += c;
		i++;
	}
	const trimmed = current.trim();
	if (trimmed) result.push(trimmed);
	return result;
}
function parseSetCookieHeader(setCookie) {
	const cookies = /* @__PURE__ */ new Map();
	splitSetCookieHeader(setCookie).forEach((cookieString) => {
		const [nameValue, ...attributes] = cookieString.split(";").map((part) => part.trim());
		const [name, ...valueParts] = (nameValue || "").split("=");
		const value = valueParts.join("=");
		if (!name || value === void 0) return;
		const attrObj = { value };
		attributes.forEach((attribute) => {
			const [attrName, ...attrValueParts] = attribute.split("=");
			const attrValue = attrValueParts.join("=");
			const normalizedAttrName = attrName.trim().toLowerCase();
			switch (normalizedAttrName) {
				case "max-age":
					attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
					break;
				case "expires":
					attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
					break;
				case "domain":
					attrObj.domain = attrValue ? attrValue.trim() : void 0;
					break;
				case "path":
					attrObj.path = attrValue ? attrValue.trim() : void 0;
					break;
				case "secure":
					attrObj.secure = true;
					break;
				case "httponly":
					attrObj.httponly = true;
					break;
				case "samesite":
					attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
					break;
				default:
					attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
					break;
			}
		});
		cookies.set(name, attrObj);
	});
	return cookies;
}
var decoders = /* @__PURE__ */ new Map();
var binary = {
	decode: (data, encoding = "utf-8") => {
		if (!decoders.has(encoding)) decoders.set(encoding, new TextDecoder(encoding));
		return decoders.get(encoding).decode(data);
	},
	encode: new TextEncoder().encode
};
var createHMAC = (algorithm = "SHA-256", encoding = "none") => {
	const hmac = {
		importKey: async (key, keyUsage) => {
			return getWebcryptoSubtle().importKey("raw", typeof key === "string" ? new TextEncoder().encode(key) : key, {
				name: "HMAC",
				hash: { name: algorithm }
			}, false, [keyUsage]);
		},
		sign: async (hmacKey, data) => {
			if (typeof hmacKey === "string") hmacKey = await hmac.importKey(hmacKey, "sign");
			const signature = await getWebcryptoSubtle().sign("HMAC", hmacKey, typeof data === "string" ? new TextEncoder().encode(data) : data);
			if (encoding === "hex") return hex.encode(signature);
			if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") return base64Url.encode(signature, { padding: encoding !== "base64urlnopad" });
			return signature;
		},
		verify: async (hmacKey, data, signature) => {
			if (typeof hmacKey === "string") hmacKey = await hmac.importKey(hmacKey, "verify");
			if (encoding === "hex") signature = hex.decode(signature);
			if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") signature = await base64.decode(signature);
			return getWebcryptoSubtle().verify("HMAC", hmacKey, typeof signature === "string" ? new TextEncoder().encode(signature) : signature, typeof data === "string" ? new TextEncoder().encode(data) : data);
		}
	};
	return hmac;
};
function createCookieGetter(options) {
	const secureCookiePrefix = (options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : options.baseURL ? options.baseURL.startsWith("https://") ? true : false : isProduction) ? SECURE_COOKIE_PREFIX : "";
	const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
	const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (options.baseURL ? new URL(options.baseURL).hostname : void 0) : void 0;
	if (crossSubdomainEnabled && !domain) throw new BetterAuthError("baseURL is required when crossSubdomainCookies are enabled");
	function createCookie(cookieName, overrideAttributes = {}) {
		const prefix = options.advanced?.cookiePrefix || "better-auth";
		const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
		const attributes = options.advanced?.cookies?.[cookieName]?.attributes ?? {};
		return {
			name: `${secureCookiePrefix}${name}`,
			attributes: {
				secure: !!secureCookiePrefix,
				sameSite: "lax",
				path: "/",
				httpOnly: true,
				...crossSubdomainEnabled ? { domain } : {},
				...options.advanced?.defaultCookieAttributes,
				...overrideAttributes,
				...attributes
			}
		};
	}
	return createCookie;
}
function getCookies(options) {
	const createCookie = createCookieGetter(options);
	const sessionToken = createCookie("session_token", { maxAge: options.session?.expiresIn || sec("7d") });
	const sessionData = createCookie("session_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
	const accountData = createCookie("account_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
	const dontRememberToken = createCookie("dont_remember");
	return {
		sessionToken: {
			name: sessionToken.name,
			attributes: sessionToken.attributes
		},
		sessionData: {
			name: sessionData.name,
			attributes: sessionData.attributes
		},
		dontRememberToken: {
			name: dontRememberToken.name,
			attributes: dontRememberToken.attributes
		},
		accountData: {
			name: accountData.name,
			attributes: accountData.attributes
		}
	};
}
async function setCookieCache(ctx, session, dontRememberMe) {
	if (!ctx.context.options.session?.cookieCache?.enabled) return;
	const filteredSession = filterOutputFields(session.session, ctx.context.options.session?.additionalFields);
	const filteredUser = parseUserOutput(ctx.context.options, session.user);
	const versionConfig = ctx.context.options.session?.cookieCache?.version;
	let version = "1";
	if (versionConfig) {
		if (typeof versionConfig === "string") version = versionConfig;
		else if (typeof versionConfig === "function") {
			const result = versionConfig(session.session, session.user);
			version = isPromise(result) ? await result : result;
		}
	}
	const sessionData = {
		session: filteredSession,
		user: filteredUser,
		updatedAt: Date.now(),
		version
	};
	const options = {
		...ctx.context.authCookies.sessionData.attributes,
		maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.attributes.maxAge
	};
	const expiresAtDate = getDate(options.maxAge || 60, "sec").getTime();
	const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
	let data;
	if (strategy === "jwe") data = await symmetricEncodeJWT(sessionData, ctx.context.secret, "better-auth-session", options.maxAge || 300);
	else if (strategy === "jwt") data = await signJWT(sessionData, ctx.context.secret, options.maxAge || 300);
	else data = base64Url.encode(JSON.stringify({
		session: sessionData,
		expiresAt: expiresAtDate,
		signature: await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
			...sessionData,
			expiresAt: expiresAtDate
		}))
	}), { padding: false });
	if (data.length > 4093) {
		const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
		const cookies = sessionStore.chunk(data, options);
		sessionStore.setCookies(cookies);
	} else {
		const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
		if (sessionStore.hasChunks()) {
			const cleanCookies = sessionStore.clean();
			sessionStore.setCookies(cleanCookies);
		}
		ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
	}
	if (ctx.context.options.account?.storeAccountCookie) {
		const accountData = await getAccountCookie(ctx);
		if (accountData) await setAccountCookie(ctx, accountData);
	}
}
async function setSessionCookie(ctx, session, dontRememberMe, overrides) {
	const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
	dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
	const options = ctx.context.authCookies.sessionToken.attributes;
	const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
	await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session.session.token, ctx.context.secret, {
		...options,
		maxAge,
		...overrides
	});
	if (dontRememberMe) await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.attributes);
	await setCookieCache(ctx, session, dontRememberMe);
	ctx.context.setNewSession(session);
}
/**
* Expires a cookie by setting `maxAge: 0` while preserving its attributes
*/
function expireCookie(ctx, cookie) {
	ctx.setCookie(cookie.name, "", {
		...cookie.attributes,
		maxAge: 0
	});
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
	expireCookie(ctx, ctx.context.authCookies.sessionToken);
	expireCookie(ctx, ctx.context.authCookies.sessionData);
	if (ctx.context.options.account?.storeAccountCookie) {
		expireCookie(ctx, ctx.context.authCookies.accountData);
		const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.attributes, ctx);
		const cleanCookies = accountStore.clean();
		accountStore.setCookies(cleanCookies);
	}
	if (ctx.context.oauthConfig.storeStateStrategy === "cookie") expireCookie(ctx, ctx.context.createAuthCookie("oauth_state"));
	const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.attributes, ctx);
	const cleanCookies = sessionStore.clean();
	sessionStore.setCookies(cleanCookies);
	if (!skipDontRememberMe) expireCookie(ctx, ctx.context.authCookies.dontRememberToken);
}
var getSession = () => createAuthEndpoint("/get-session", {
	method: ["GET", "POST"],
	operationId: "getSession",
	query: getSessionQuerySchema$1,
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "getSession",
		description: "Get the current session",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				nullable: true,
				properties: {
					session: { $ref: "#/components/schemas/Session" },
					user: { $ref: "#/components/schemas/User" }
				},
				required: ["session", "user"]
			} } }
		} }
	} }
}, async (ctx) => {
	const deferSessionRefresh = ctx.context.options.session?.deferSessionRefresh;
	const isPostRequest = ctx.method === "POST";
	if (isPostRequest && !deferSessionRefresh) throw APIError.from("METHOD_NOT_ALLOWED", BASE_ERROR_CODES.METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED);
	try {
		const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
		if (!sessionCookieToken) return null;
		const sessionDataCookie = getChunkedCookie(ctx, ctx.context.authCookies.sessionData.name);
		let sessionDataPayload = null;
		if (sessionDataCookie) {
			const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
			if (strategy === "jwe") {
				const payload = await symmetricDecodeJWT(sessionDataCookie, ctx.context.secret, "better-auth-session");
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			} else if (strategy === "jwt") {
				const payload = await verifyJWT(sessionDataCookie, ctx.context.secret);
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			} else {
				const parsed = safeJSONParse(binary.decode(base64Url.decode(sessionDataCookie)));
				if (parsed) if (await createHMAC("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
					...parsed.session,
					expiresAt: parsed.expiresAt
				}), parsed.signature)) sessionDataPayload = parsed;
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			}
		}
		const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
		/**
		* If session data is present in the cookie, check if it should be used or refreshed
		*/
		if (sessionDataPayload?.session && ctx.context.options.session?.cookieCache?.enabled && !ctx.query?.disableCookieCache) {
			const session = sessionDataPayload.session;
			const versionConfig = ctx.context.options.session?.cookieCache?.version;
			let expectedVersion = "1";
			if (versionConfig) {
				if (typeof versionConfig === "string") expectedVersion = versionConfig;
				else if (typeof versionConfig === "function") {
					const result = versionConfig(session.session, session.user);
					expectedVersion = result instanceof Promise ? await result : result;
				}
			}
			if ((session.version || "1") !== expectedVersion) expireCookie(ctx, ctx.context.authCookies.sessionData);
			else {
				const cachedSessionExpiresAt = new Date(session.session.expiresAt);
				if (sessionDataPayload.expiresAt < Date.now() || cachedSessionExpiresAt < /* @__PURE__ */ new Date()) expireCookie(ctx, ctx.context.authCookies.sessionData);
				else {
					const cookieRefreshCache = ctx.context.sessionConfig.cookieRefreshCache;
					if (cookieRefreshCache === false) {
						ctx.context.session = session;
						const parsedSession = parseSessionOutput(ctx.context.options, {
							...session.session,
							expiresAt: new Date(session.session.expiresAt),
							createdAt: new Date(session.session.createdAt),
							updatedAt: new Date(session.session.updatedAt)
						});
						const parsedUser = parseUserOutput(ctx.context.options, {
							...session.user,
							createdAt: new Date(session.user.createdAt),
							updatedAt: new Date(session.user.updatedAt)
						});
						return ctx.json({
							session: parsedSession,
							user: parsedUser
						});
					}
					const timeUntilExpiry = sessionDataPayload.expiresAt - Date.now();
					const updateAge = cookieRefreshCache.updateAge * 1e3;
					const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
					if (timeUntilExpiry < updateAge && !shouldSkipSessionRefresh) {
						const newExpiresAt = getDate(ctx.context.options.session?.cookieCache?.maxAge || 300, "sec");
						const refreshedSession = {
							session: {
								...session.session,
								expiresAt: newExpiresAt
							},
							user: session.user,
							updatedAt: Date.now()
						};
						await setCookieCache(ctx, refreshedSession, false);
						const parsedRefreshedSession = parseSessionOutput(ctx.context.options, {
							...refreshedSession.session,
							expiresAt: new Date(refreshedSession.session.expiresAt),
							createdAt: new Date(refreshedSession.session.createdAt),
							updatedAt: new Date(refreshedSession.session.updatedAt)
						});
						const parsedRefreshedUser = parseUserOutput(ctx.context.options, {
							...refreshedSession.user,
							createdAt: new Date(refreshedSession.user.createdAt),
							updatedAt: new Date(refreshedSession.user.updatedAt)
						});
						ctx.context.session = {
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						};
						return ctx.json({
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						});
					}
					const parsedSession = parseSessionOutput(ctx.context.options, {
						...session.session,
						expiresAt: new Date(session.session.expiresAt),
						createdAt: new Date(session.session.createdAt),
						updatedAt: new Date(session.session.updatedAt)
					});
					const parsedUser = parseUserOutput(ctx.context.options, {
						...session.user,
						createdAt: new Date(session.user.createdAt),
						updatedAt: new Date(session.user.updatedAt)
					});
					ctx.context.session = {
						session: parsedSession,
						user: parsedUser
					};
					return ctx.json({
						session: parsedSession,
						user: parsedUser
					});
				}
			}
		}
		const session = await ctx.context.internalAdapter.findSession(sessionCookieToken);
		ctx.context.session = session;
		if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
			deleteSessionCookie(ctx);
			if (session) {
				/**
				* if session expired clean up the session
				* Only delete on POST when deferSessionRefresh is enabled
				*/
				if (!deferSessionRefresh || isPostRequest) await ctx.context.internalAdapter.deleteSession(session.session.token);
			}
			return ctx.json(null);
		}
		/**
		* We don't need to update the session if the user doesn't want to be remembered
		* or if the session refresh is disabled
		*/
		if (dontRememberMe || ctx.query?.disableRefresh) {
			const parsedSession = parseSessionOutput(ctx.context.options, session.session);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedSession,
				user: parsedUser
			});
		}
		const expiresIn = ctx.context.sessionConfig.expiresIn;
		const updateAge = ctx.context.sessionConfig.updateAge;
		const shouldBeUpdated = session.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3 <= Date.now();
		const disableRefresh = ctx.query?.disableRefresh || ctx.context.options.session?.disableSessionRefresh;
		const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
		const needsRefresh = shouldBeUpdated && !disableRefresh && !shouldSkipSessionRefresh;
		/**
		* When deferSessionRefresh is enabled and this is a GET request,
		* return the session without performing writes, but include needsRefresh flag
		*/
		if (deferSessionRefresh && !isPostRequest) {
			await setCookieCache(ctx, session, !!dontRememberMe);
			const parsedSession = parseSessionOutput(ctx.context.options, session.session);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedSession,
				user: parsedUser,
				needsRefresh
			});
		}
		if (needsRefresh) {
			const updatedSession = await ctx.context.internalAdapter.updateSession(session.session.token, {
				expiresAt: getDate(ctx.context.sessionConfig.expiresIn, "sec"),
				updatedAt: /* @__PURE__ */ new Date()
			});
			if (!updatedSession) {
				/**
				* Handle case where session update fails (e.g., concurrent deletion)
				*/
				deleteSessionCookie(ctx);
				return ctx.json(null, { status: 401 });
			}
			const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1e3;
			await setSessionCookie(ctx, {
				session: updatedSession,
				user: session.user
			}, false, { maxAge });
			const parsedUpdatedSession = parseSessionOutput(ctx.context.options, updatedSession);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedUpdatedSession,
				user: parsedUser
			});
		}
		await setCookieCache(ctx, session, !!dontRememberMe);
		const parsedSession = parseSessionOutput(ctx.context.options, session.session);
		const parsedUser = parseUserOutput(ctx.context.options, session.user);
		return ctx.json({
			session: parsedSession,
			user: parsedUser
		});
	} catch (error) {
		ctx.context.logger.error("INTERNAL_SERVER_ERROR", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
	}
});
var getSessionFromCtx = async (ctx, config) => {
	if (ctx.context.session) return ctx.context.session;
	const session = await getSession()({
		...ctx,
		method: "GET",
		asResponse: false,
		headers: ctx.headers,
		returnHeaders: false,
		returnStatus: false,
		query: {
			...config,
			...ctx.query
		}
	}).catch((e) => {
		return null;
	});
	ctx.context.session = session;
	return session;
};
/**
* The middleware forces the endpoint to require a valid session.
*/
var sessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
/**
* This middleware forces the endpoint to require a valid session and ignores cookie cache.
* This should be used for sensitive operations like password changes, account deletion, etc.
* to ensure that revoked sessions cannot be used even if they're still cached in cookies.
*/
var sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx, { disableCookieCache: true });
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session && (ctx.request || ctx.headers)) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
/**
* This middleware forces the endpoint to require a valid session,
* as well as making sure the session is fresh before proceeding.
*
* Session freshness check will be skipped if the session config's freshAge
* is set to 0
*/
var freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	if (ctx.context.sessionConfig.freshAge === 0) return { session };
	const freshAge = ctx.context.sessionConfig.freshAge;
	const lastUpdated = new Date(session.session.updatedAt || session.session.createdAt).getTime();
	if (!(Date.now() - lastUpdated < freshAge * 1e3)) throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.SESSION_NOT_FRESH);
	return { session };
});
/**
* user active sessions list
*/
var listSessions = () => createAuthEndpoint("/list-sessions", {
	method: "GET",
	operationId: "listUserSessions",
	use: [sessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "listUserSessions",
		description: "List all active sessions for the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "array",
				items: { $ref: "#/components/schemas/Session" }
			} } }
		} }
	} }
}, async (ctx) => {
	try {
		const activeSessions = (await ctx.context.internalAdapter.listSessions(ctx.context.session.user.id)).filter((session) => {
			return session.expiresAt > /* @__PURE__ */ new Date();
		});
		return ctx.json(activeSessions.map((session) => parseSessionOutput(ctx.context.options, session)));
	} catch (e) {
		ctx.context.logger.error(e);
		throw ctx.error("INTERNAL_SERVER_ERROR");
	}
});
/**
* revoke a single session
*/
var revokeSession = createAuthEndpoint("/revoke-session", {
	method: "POST",
	body: object({ token: string().meta({ description: "The token to revoke" }) }),
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke a single session",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: { token: {
				type: "string",
				description: "The token to revoke"
			} },
			required: ["token"]
		} } } },
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if the session was revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token;
	if ((await ctx.context.internalAdapter.findSession(token))?.session.userId === ctx.context.session.user.id) try {
		await ctx.context.internalAdapter.deleteSession(token);
	} catch (error) {
		ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
/**
* revoke all user sessions
*/
var revokeSessions = createAuthEndpoint("/revoke-sessions", {
	method: "POST",
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke all sessions for the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	try {
		await ctx.context.internalAdapter.deleteSessions(ctx.context.session.user.id);
	} catch (error) {
		ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
var revokeOtherSessions = createAuthEndpoint("/revoke-other-sessions", {
	method: "POST",
	requireHeaders: true,
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		description: "Revoke all other sessions for the user except the current one",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all other sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const session = ctx.context.session;
	if (!session.user) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	const otherSessions = (await ctx.context.internalAdapter.listSessions(session.user.id)).filter((session) => {
		return session.expiresAt > /* @__PURE__ */ new Date();
	}).filter((session) => session.token !== ctx.context.session.session.token);
	await Promise.all(otherSessions.map((session) => ctx.context.internalAdapter.deleteSession(session.token)));
	return ctx.json({ status: true });
});
var stateDataSchema = looseObject({
	callbackURL: string(),
	codeVerifier: string(),
	errorURL: string().optional(),
	newUserURL: string().optional(),
	expiresAt: number(),
	link: object({
		email: string(),
		userId: string$1()
	}).optional(),
	requestSignUp: boolean().optional()
});
var StateError = class extends BetterAuthError {
	code;
	details;
	constructor(message, options) {
		super(message, options);
		this.code = options.code;
		this.details = options.details;
	}
};
async function generateGenericState(c, stateData, settings) {
	const state = generateRandomString(32);
	if (c.context.oauthConfig.storeStateStrategy === "cookie") {
		const encryptedData = await symmetricEncrypt({
			key: c.context.secret,
			data: JSON.stringify(stateData)
		});
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state", { maxAge: 600 });
		c.setCookie(stateCookie.name, encryptedData, stateCookie.attributes);
		return {
			state,
			codeVerifier: stateData.codeVerifier
		};
	}
	const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state", { maxAge: 300 });
	await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
	const expiresAt = /* @__PURE__ */ new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + 10);
	const verification = await c.context.internalAdapter.createVerificationValue({
		value: JSON.stringify(stateData),
		identifier: state,
		expiresAt
	});
	if (!verification) throw new StateError("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database", { code: "state_generation_error" });
	return {
		state: verification.identifier,
		codeVerifier: stateData.codeVerifier
	};
}
async function parseGenericState(c, state, settings) {
	const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
	let parsedData;
	if (storeStateStrategy === "cookie") {
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state");
		const encryptedData = c.getCookie(stateCookie.name);
		if (!encryptedData) throw new StateError("State mismatch: auth state cookie not found", {
			code: "state_mismatch",
			details: { state }
		});
		try {
			const decryptedData = await symmetricDecrypt({
				key: c.context.secret,
				data: encryptedData
			});
			parsedData = stateDataSchema.parse(JSON.parse(decryptedData));
		} catch (error) {
			throw new StateError("State invalid: Failed to decrypt or parse auth state", {
				code: "state_invalid",
				details: { state },
				cause: error
			});
		}
		expireCookie(c, stateCookie);
	} else {
		const data = await c.context.internalAdapter.findVerificationValue(state);
		if (!data) throw new StateError("State mismatch: verification not found", {
			code: "state_mismatch",
			details: { state }
		});
		parsedData = stateDataSchema.parse(JSON.parse(data.value));
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state");
		const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
		if (!c.context.oauthConfig.skipStateCookieCheck && (!stateCookieValue || stateCookieValue !== state)) throw new StateError("State mismatch: State not persisted correctly", {
			code: "state_security_mismatch",
			details: { state }
		});
		expireCookie(c, stateCookie);
		await c.context.internalAdapter.deleteVerificationValue(data.id);
	}
	if (parsedData.expiresAt < Date.now()) throw new StateError("Invalid state: request expired", {
		code: "state_mismatch",
		details: { expiresAt: parsedData.expiresAt }
	});
	return parsedData;
}
async function generateState(c, link, additionalData) {
	const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
	if (!callbackURL) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CALLBACK_URL_REQUIRED);
	const codeVerifier = generateRandomString(128);
	const stateData = {
		...additionalData ? additionalData : {},
		callbackURL,
		codeVerifier,
		errorURL: c.body?.errorCallbackURL,
		newUserURL: c.body?.newUserCallbackURL,
		link,
		expiresAt: Date.now() + 600 * 1e3,
		requestSignUp: c.body?.requestSignUp
	};
	await setOAuthState(stateData);
	try {
		return generateGenericState(c, stateData);
	} catch (error) {
		c.context.logger.error("Failed to create verification", error);
		throw new APIError("INTERNAL_SERVER_ERROR", {
			message: "Unable to create verification",
			cause: error
		});
	}
}
async function parseState(c) {
	const state = c.query.state || c.body.state;
	const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
	let parsedData;
	try {
		parsedData = await parseGenericState(c, state);
	} catch (error) {
		c.context.logger.error("Failed to parse state", error);
		if (error instanceof StateError && error.code === "state_security_mismatch") throw c.redirect(`${errorURL}?error=state_mismatch`);
		throw c.redirect(`${errorURL}?error=please_restart_the_process`);
	}
	if (!parsedData.errorURL) parsedData.errorURL = errorURL;
	if (parsedData) await setOAuthState(parsedData);
	return parsedData;
}
/**
* Check if a string looks like encrypted data
*/
function isLikelyEncrypted(token) {
	return token.length % 2 === 0 && /^[0-9a-f]+$/i.test(token);
}
function decryptOAuthToken(token, ctx) {
	if (!token) return token;
	if (ctx.options.account?.encryptOAuthTokens) {
		if (!isLikelyEncrypted(token)) return token;
		return symmetricDecrypt({
			key: ctx.secret,
			data: token
		});
	}
	return token;
}
function setTokenUtil(token, ctx) {
	if (ctx.options.account?.encryptOAuthTokens && token) return symmetricEncrypt({
		key: ctx.secret,
		data: token
	});
	return token;
}
var listUserAccounts = createAuthEndpoint("/list-accounts", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: {
		operationId: "listUserAccounts",
		description: "List all accounts linked to the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: { type: "string" },
						providerId: { type: "string" },
						createdAt: {
							type: "string",
							format: "date-time"
						},
						updatedAt: {
							type: "string",
							format: "date-time"
						},
						accountId: { type: "string" },
						userId: { type: "string" },
						scopes: {
							type: "array",
							items: { type: "string" }
						}
					},
					required: [
						"id",
						"providerId",
						"createdAt",
						"updatedAt",
						"accountId",
						"userId",
						"scopes"
					]
				}
			} } }
		} }
	} }
}, async (c) => {
	const session = c.context.session;
	const accounts = await c.context.internalAdapter.findAccounts(session.user.id);
	return c.json(accounts.map((a) => {
		const { scope, ...parsed } = parseAccountOutput(c.context.options, a);
		return {
			...parsed,
			scopes: scope?.split(",") || []
		};
	}));
});
var linkSocialAccount = createAuthEndpoint("/link-social", {
	method: "POST",
	requireHeaders: true,
	body: object({
		callbackURL: string().meta({ description: "The URL to redirect to after the user has signed in" }).optional(),
		provider: SocialProviderListEnum,
		idToken: object({
			token: string(),
			nonce: string().optional(),
			accessToken: string().optional(),
			refreshToken: string().optional(),
			scopes: array(string()).optional()
		}).optional(),
		requestSignUp: boolean().optional(),
		scopes: array(string()).meta({ description: "Additional scopes to request from the provider" }).optional(),
		errorCallbackURL: string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional(),
		disableRedirect: boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
		additionalData: record(string(), any()).optional()
	}),
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "Link a social account to the user",
		operationId: "linkSocialAccount",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					url: {
						type: "string",
						description: "The authorization URL to redirect the user to"
					},
					redirect: {
						type: "boolean",
						description: "Indicates if the user should be redirected to the authorization URL"
					},
					status: { type: "boolean" }
				},
				required: ["redirect"]
			} } }
		} }
	} }
}, async (c) => {
	const session = c.context.session;
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
	if (!provider) {
		c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
		throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	}
	if (c.body.idToken) {
		if (!provider.verifyIdToken) {
			c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
			throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
		}
		const { token, nonce } = c.body.idToken;
		if (!await provider.verifyIdToken(token, nonce)) {
			c.context.logger.error("Invalid id token", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
		}
		const linkingUserInfo = await provider.getUserInfo({
			idToken: token,
			accessToken: c.body.idToken.accessToken,
			refreshToken: c.body.idToken.refreshToken
		});
		if (!linkingUserInfo || !linkingUserInfo?.user) {
			c.context.logger.error("Failed to get user info", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
		}
		const linkingUserId = String(linkingUserInfo.user.id);
		if (!linkingUserInfo.user.email) {
			c.context.logger.error("User email not found", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
		}
		if ((await c.context.internalAdapter.findAccounts(session.user.id)).find((a) => a.providerId === provider.id && a.accountId === linkingUserId)) return c.json({
			url: "",
			status: true,
			redirect: false
		});
		if (!(c.context.options.account?.accountLinking?.trustedProviders)?.includes(provider.id) && !linkingUserInfo.user.emailVerified || c.context.options.account?.accountLinking?.enabled === false) throw APIError.from("UNAUTHORIZED", {
			message: "Account not linked - linking not allowed",
			code: "LINKING_NOT_ALLOWED"
		});
		if (linkingUserInfo.user.email !== session.user.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) throw APIError.from("UNAUTHORIZED", {
			message: "Account not linked - different emails not allowed",
			code: "LINKING_DIFFERENT_EMAILS_NOT_ALLOWED"
		});
		try {
			await c.context.internalAdapter.createAccount({
				userId: session.user.id,
				providerId: provider.id,
				accountId: linkingUserId,
				accessToken: c.body.idToken.accessToken,
				idToken: token,
				refreshToken: c.body.idToken.refreshToken,
				scope: c.body.idToken.scopes?.join(",")
			});
		} catch (_e) {
			throw APIError.from("EXPECTATION_FAILED", {
				message: "Account not linked - unable to create account",
				code: "LINKING_FAILED"
			});
		}
		if (c.context.options.account?.accountLinking?.updateUserInfoOnLink === true) try {
			await c.context.internalAdapter.updateUser(session.user.id, {
				name: linkingUserInfo.user?.name,
				image: linkingUserInfo.user?.image
			});
		} catch (e) {
			console.warn("Could not update user - " + e.toString());
		}
		return c.json({
			url: "",
			status: true,
			redirect: false
		});
	}
	const state = await generateState(c, {
		userId: session.user.id,
		email: session.user.email
	}, c.body.additionalData);
	const url = await provider.createAuthorizationURL({
		state: state.state,
		codeVerifier: state.codeVerifier,
		redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
		scopes: c.body.scopes
	});
	if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
	return c.json({
		url: url.toString(),
		redirect: !c.body.disableRedirect
	});
});
var unlinkAccount = createAuthEndpoint("/unlink-account", {
	method: "POST",
	body: object({
		providerId: string(),
		accountId: string().optional()
	}),
	use: [freshSessionMiddleware],
	metadata: { openapi: {
		description: "Unlink an account",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const { providerId, accountId } = ctx.body;
	const accounts = await ctx.context.internalAdapter.findAccounts(ctx.context.session.user.id);
	if (accounts.length === 1 && !ctx.context.options.account?.accountLinking?.allowUnlinkingAll) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT);
	const accountExist = accounts.find((account) => accountId ? account.accountId === accountId && account.providerId === providerId : account.providerId === providerId);
	if (!accountExist) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	await ctx.context.internalAdapter.deleteAccount(accountExist.id);
	return ctx.json({ status: true });
});
var getAccessToken = createAuthEndpoint("/get-access-token", {
	method: "POST",
	body: object({
		providerId: string().meta({ description: "The provider ID for the OAuth provider" }),
		accountId: string().meta({ description: "The account ID associated with the refresh token" }).optional(),
		userId: string().meta({ description: "The user ID associated with the account" }).optional()
	}),
	metadata: { openapi: {
		description: "Get a valid access token, doing a refresh if needed",
		responses: {
			200: {
				description: "A Valid access token",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						tokenType: { type: "string" },
						idToken: { type: "string" },
						accessToken: { type: "string" },
						accessTokenExpiresAt: {
							type: "string",
							format: "date-time"
						}
					}
				} } }
			},
			400: { description: "Invalid refresh token or provider configuration" }
		}
	} }
}, async (ctx) => {
	const { providerId, accountId, userId } = ctx.body || {};
	const req = ctx.request;
	const session = await getSessionFromCtx(ctx);
	if (req && !session) throw ctx.error("UNAUTHORIZED");
	const resolvedUserId = session?.user?.id || userId;
	if (!resolvedUserId) throw ctx.error("UNAUTHORIZED");
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: providerId });
	if (!provider) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} is not supported.`,
		code: "PROVIDER_NOT_SUPPORTED"
	});
	const accountData = await getAccountCookie(ctx);
	let account = void 0;
	if (accountData && providerId === accountData.providerId && (!accountId || accountData.id === accountId)) account = accountData;
	else account = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.accountId === accountId && acc.providerId === providerId : acc.providerId === providerId);
	if (!account) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	try {
		let newTokens = null;
		const accessTokenExpired = account.accessTokenExpiresAt && new Date(account.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
		if (account.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
			const refreshToken = await decryptOAuthToken(account.refreshToken, ctx.context);
			newTokens = await provider.refreshAccessToken(refreshToken);
			const updatedData = {
				accessToken: await setTokenUtil(newTokens?.accessToken, ctx.context),
				accessTokenExpiresAt: newTokens?.accessTokenExpiresAt,
				refreshToken: await setTokenUtil(newTokens?.refreshToken, ctx.context),
				refreshTokenExpiresAt: newTokens?.refreshTokenExpiresAt
			};
			let updatedAccount = null;
			if (account.id) updatedAccount = await ctx.context.internalAdapter.updateAccount(account.id, updatedData);
			if (ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
				...account,
				...updatedAccount ?? updatedData
			});
		}
		const accessTokenExpiresAt = (() => {
			if (newTokens?.accessTokenExpiresAt) {
				if (typeof newTokens.accessTokenExpiresAt === "string") return new Date(newTokens.accessTokenExpiresAt);
				return newTokens.accessTokenExpiresAt;
			}
			if (account.accessTokenExpiresAt) {
				if (typeof account.accessTokenExpiresAt === "string") return new Date(account.accessTokenExpiresAt);
				return account.accessTokenExpiresAt;
			}
		})();
		const tokens = {
			accessToken: newTokens?.accessToken ?? await decryptOAuthToken(account.accessToken ?? "", ctx.context),
			accessTokenExpiresAt,
			scopes: account.scope?.split(",") ?? [],
			idToken: newTokens?.idToken ?? account.idToken ?? void 0
		};
		return ctx.json(tokens);
	} catch (_error) {
		throw APIError.from("BAD_REQUEST", {
			message: "Failed to get a valid access token",
			code: "FAILED_TO_GET_ACCESS_TOKEN"
		});
	}
});
var refreshToken = createAuthEndpoint("/refresh-token", {
	method: "POST",
	body: object({
		providerId: string().meta({ description: "The provider ID for the OAuth provider" }),
		accountId: string().meta({ description: "The account ID associated with the refresh token" }).optional(),
		userId: string().meta({ description: "The user ID associated with the account" }).optional()
	}),
	metadata: { openapi: {
		description: "Refresh the access token using a refresh token",
		responses: {
			200: {
				description: "Access token refreshed successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						tokenType: { type: "string" },
						idToken: { type: "string" },
						accessToken: { type: "string" },
						refreshToken: { type: "string" },
						accessTokenExpiresAt: {
							type: "string",
							format: "date-time"
						},
						refreshTokenExpiresAt: {
							type: "string",
							format: "date-time"
						}
					}
				} } }
			},
			400: { description: "Invalid refresh token or provider configuration" }
		}
	} }
}, async (ctx) => {
	const { providerId, accountId, userId } = ctx.body;
	const req = ctx.request;
	const session = await getSessionFromCtx(ctx);
	if (req && !session) throw ctx.error("UNAUTHORIZED");
	const resolvedUserId = session?.user?.id || userId;
	if (!resolvedUserId) throw APIError.from("BAD_REQUEST", {
		message: `Either userId or session is required`,
		code: "USER_ID_OR_SESSION_REQUIRED"
	});
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: providerId });
	if (!provider) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} is not supported.`,
		code: "PROVIDER_NOT_SUPPORTED"
	});
	if (!provider.refreshAccessToken) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} does not support token refreshing.`,
		code: "TOKEN_REFRESH_NOT_SUPPORTED"
	});
	let account = void 0;
	const accountData = await getAccountCookie(ctx);
	if (accountData && (!providerId || providerId === accountData?.providerId)) account = accountData;
	else account = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.accountId === accountId && acc.providerId === providerId : acc.providerId === providerId);
	if (!account) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	let refreshToken = void 0;
	if (accountData && providerId === accountData.providerId) refreshToken = accountData.refreshToken ?? void 0;
	else refreshToken = account.refreshToken ?? void 0;
	if (!refreshToken) throw APIError.from("BAD_REQUEST", {
		message: "Refresh token not found",
		code: "REFRESH_TOKEN_NOT_FOUND"
	});
	try {
		const decryptedRefreshToken = await decryptOAuthToken(refreshToken, ctx.context);
		const tokens = await provider.refreshAccessToken(decryptedRefreshToken);
		if (account.id) {
			const updateData = {
				...account || {},
				accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
				refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
				scope: tokens.scopes?.join(",") || account.scope,
				idToken: tokens.idToken || account.idToken
			};
			await ctx.context.internalAdapter.updateAccount(account.id, updateData);
		}
		if (accountData && providerId === accountData.providerId && ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
			...accountData,
			accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
			refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
			scope: tokens.scopes?.join(",") || accountData.scope,
			idToken: tokens.idToken || accountData.idToken
		});
		return ctx.json({
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
			scope: tokens.scopes?.join(",") || account.scope,
			idToken: tokens.idToken || account.idToken,
			providerId: account.providerId,
			accountId: account.accountId
		});
	} catch (_error) {
		throw APIError.from("BAD_REQUEST", {
			message: "Failed to refresh access token",
			code: "FAILED_TO_REFRESH_ACCESS_TOKEN"
		});
	}
});
var accountInfoQuerySchema = optional(object({ accountId: string().meta({ description: "The provider given account id for which to get the account info" }).optional() }));
var accountInfo = createAuthEndpoint("/account-info", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "Get the account info provided by the provider",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						properties: {
							id: { type: "string" },
							name: { type: "string" },
							email: { type: "string" },
							image: { type: "string" },
							emailVerified: { type: "boolean" }
						},
						required: ["id", "emailVerified"]
					},
					data: {
						type: "object",
						properties: {},
						additionalProperties: true
					}
				},
				required: ["user", "data"],
				additionalProperties: false
			} } }
		} }
	} },
	query: accountInfoQuerySchema
}, async (ctx) => {
	const providedAccountId = ctx.query?.accountId;
	let account = void 0;
	if (!providedAccountId) {
		if (ctx.context.options.account?.storeAccountCookie) {
			const accountData = await getAccountCookie(ctx);
			if (accountData) account = accountData;
		}
	} else {
		const accountData = await ctx.context.internalAdapter.findAccount(providedAccountId);
		if (accountData) account = accountData;
	}
	if (!account || account.userId !== ctx.context.session.user.id) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: account.providerId });
	if (!provider) throw APIError.from("INTERNAL_SERVER_ERROR", {
		message: `Provider account provider is ${account.providerId} but it is not configured`,
		code: "PROVIDER_NOT_CONFIGURED"
	});
	const tokens = await getAccessToken({
		...ctx,
		method: "POST",
		body: {
			accountId: account.id,
			providerId: account.providerId
		},
		returnHeaders: false,
		returnStatus: false
	});
	if (!tokens.accessToken) throw APIError.from("BAD_REQUEST", {
		message: "Access token not found",
		code: "ACCESS_TOKEN_NOT_FOUND"
	});
	const info = await provider.getUserInfo({
		...tokens,
		accessToken: tokens.accessToken
	});
	return ctx.json(info);
});
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600, extraPayload) {
	return await signJWT({
		email: email.toLowerCase(),
		updateTo,
		...extraPayload
	}, secret, expiresIn);
}
/**
* A function to send a verification email to the user
*/
async function sendVerificationEmailFn(ctx, user) {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const token = await createEmailVerificationToken(ctx.context.secret, user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
	const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
	const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
		user,
		url,
		token
	}, ctx.request));
}
var sendVerificationEmail = createAuthEndpoint("/send-verification-email", {
	method: "POST",
	operationId: "sendVerificationEmail",
	body: object({
		email: email().meta({ description: "The email to send the verification email to" }),
		callbackURL: string().meta({ description: "The URL to use for email verification callback" }).optional()
	}),
	metadata: { openapi: {
		operationId: "sendVerificationEmail",
		description: "Send a verification email to the user",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: {
				email: {
					type: "string",
					description: "The email to send the verification email to",
					example: "user@example.com"
				},
				callbackURL: {
					type: "string",
					description: "The URL to use for email verification callback",
					example: "https://example.com/callback",
					nullable: true
				}
			},
			required: ["email"]
		} } } },
		responses: {
			"200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: {
						type: "boolean",
						description: "Indicates if the email was sent successfully",
						example: true
					} }
				} } }
			},
			"400": {
				description: "Bad Request",
				content: { "application/json": { schema: {
					type: "object",
					properties: { message: {
						type: "string",
						description: "Error message",
						example: "Verification email isn't enabled"
					} }
				} } }
			}
		}
	} }
}, async (ctx) => {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const { email } = ctx.body;
	const session = await getSessionFromCtx(ctx);
	if (!session) {
		const user = await ctx.context.internalAdapter.findUserByEmail(email);
		if (!user || user.user.emailVerified) {
			await createEmailVerificationToken(ctx.context.secret, email, void 0, ctx.context.options.emailVerification?.expiresIn);
			return ctx.json({ status: true });
		}
		await sendVerificationEmailFn(ctx, user.user);
		return ctx.json({ status: true });
	}
	if (session?.user.email !== email) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_MISMATCH);
	if (session?.user.emailVerified) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_ALREADY_VERIFIED);
	await sendVerificationEmailFn(ctx, session.user);
	return ctx.json({ status: true });
});
var verifyEmail = createAuthEndpoint("/verify-email", {
	method: "GET",
	operationId: "verifyEmail",
	query: object({
		token: string().meta({ description: "The token to verify the email" }),
		callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
	}),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		description: "Verify the email of the user",
		parameters: [{
			name: "token",
			in: "query",
			description: "The token to verify the email",
			required: true,
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			description: "The URL to redirect to after email verification",
			required: false,
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						$ref: "#/components/schemas/User"
					},
					status: {
						type: "boolean",
						description: "Indicates if the email was verified successfully"
					}
				},
				required: ["user", "status"]
			} } }
		} }
	} }
}, async (ctx) => {
	function redirectOnError(error) {
		if (ctx.query.callbackURL) {
			if (ctx.query.callbackURL.includes("?")) throw ctx.redirect(`${ctx.query.callbackURL}&error=${error.code}`);
			throw ctx.redirect(`${ctx.query.callbackURL}?error=${error.code}`);
		}
		throw APIError.from("UNAUTHORIZED", error);
	}
	const { token } = ctx.query;
	let jwt;
	try {
		jwt = await jwtVerify(token, new TextEncoder().encode(ctx.context.secret), { algorithms: ["HS256"] });
	} catch (e) {
		if (e instanceof JWTExpired) return redirectOnError(BASE_ERROR_CODES.TOKEN_EXPIRED);
		return redirectOnError(BASE_ERROR_CODES.INVALID_TOKEN);
	}
	const parsed = object({
		email: email(),
		updateTo: string().optional(),
		requestType: string().optional()
	}).parse(jwt.payload);
	const user = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
	if (!user) return redirectOnError(BASE_ERROR_CODES.USER_NOT_FOUND);
	if (parsed.updateTo) {
		const session = await getSessionFromCtx(ctx);
		if (session && session.user.email !== parsed.email) return redirectOnError(BASE_ERROR_CODES.INVALID_USER);
		switch (parsed.requestType) {
			case "change-email-confirmation": {
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.email, parsed.updateTo, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				const url = `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`;
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: {
						...user.user,
						email: parsed.updateTo
					},
					url,
					token: newToken
				}, ctx.request));
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({ status: true });
			}
			case "change-email-verification": {
				let activeSession = session;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user.user
					};
				}
				const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: true
				});
				if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: true
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser)
				});
			}
			default: {
				let activeSession = session;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user.user
					};
				}
				const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: false
				});
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo);
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: updatedUser,
					url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`,
					token: newToken
				}, ctx.request));
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: false
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser)
				});
			}
		}
	}
	if (user.user.emailVerified) {
		if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
		return ctx.json({
			status: true,
			user: null
		});
	}
	if (ctx.context.options.emailVerification?.beforeEmailVerification) await ctx.context.options.emailVerification.beforeEmailVerification(user.user, ctx.request);
	const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, { emailVerified: true });
	if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
	if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
		const currentSession = await getSessionFromCtx(ctx);
		if (!currentSession || currentSession.user.email !== parsed.email) {
			const session = await ctx.context.internalAdapter.createSession(user.user.id);
			if (!session) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
			await setSessionCookie(ctx, {
				session,
				user: {
					...user.user,
					emailVerified: true
				}
			});
		} else await setSessionCookie(ctx, {
			session: currentSession.session,
			user: {
				...currentSession.user,
				emailVerified: true
			}
		});
	}
	if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
	return ctx.json({
		status: true,
		user: null
	});
});
async function handleOAuthUserInfo(c, opts) {
	const { userInfo, account, callbackURL, disableSignUp, overrideUserInfo } = opts;
	const dbUser = await c.context.internalAdapter.findOAuthUser(userInfo.email.toLowerCase(), account.accountId, account.providerId).catch((e) => {
		logger.error("Better auth was unable to query your database.\nError: ", e);
		const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
		throw c.redirect(`${errorURL}?error=internal_server_error`);
	});
	let user = dbUser?.user;
	const isRegister = !user;
	if (dbUser) {
		const linkedAccount = dbUser.linkedAccount ?? dbUser.accounts.find((acc) => acc.providerId === account.providerId && acc.accountId === account.accountId);
		if (!linkedAccount) {
			const accountLinking = c.context.options.account?.accountLinking;
			const trustedProviders = c.context.options.account?.accountLinking?.trustedProviders;
			if (!(opts.isTrustedProvider || trustedProviders?.includes(account.providerId)) && !userInfo.emailVerified || accountLinking?.enabled === false || accountLinking?.disableImplicitLinking === true) {
				if (isDevelopment()) logger.warn(`User already exist but account isn't linked to ${account.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`);
				return {
					error: "account not linked",
					data: null
				};
			}
			try {
				await c.context.internalAdapter.linkAccount({
					providerId: account.providerId,
					accountId: userInfo.id.toString(),
					userId: dbUser.user.id,
					accessToken: await setTokenUtil(account.accessToken, c.context),
					refreshToken: await setTokenUtil(account.refreshToken, c.context),
					idToken: account.idToken,
					accessTokenExpiresAt: account.accessTokenExpiresAt,
					refreshTokenExpiresAt: account.refreshTokenExpiresAt,
					scope: account.scope
				});
			} catch (e) {
				logger.error("Unable to link account", e);
				return {
					error: "unable to link account",
					data: null
				};
			}
			if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
		} else {
			const freshTokens = c.context.options.account?.updateAccountOnSignIn !== false ? Object.fromEntries(Object.entries({
				idToken: account.idToken,
				accessToken: await setTokenUtil(account.accessToken, c.context),
				refreshToken: await setTokenUtil(account.refreshToken, c.context),
				accessTokenExpiresAt: account.accessTokenExpiresAt,
				refreshTokenExpiresAt: account.refreshTokenExpiresAt,
				scope: account.scope
			}).filter(([_, value]) => value !== void 0)) : {};
			if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, {
				...linkedAccount,
				...freshTokens
			});
			if (Object.keys(freshTokens).length > 0) await c.context.internalAdapter.updateAccount(linkedAccount.id, freshTokens);
			if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
		}
		if (overrideUserInfo) {
			const { id: _, ...restUserInfo } = userInfo;
			user = await c.context.internalAdapter.updateUser(dbUser.user.id, {
				...restUserInfo,
				email: userInfo.email.toLowerCase(),
				emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
			});
		}
	} else {
		if (disableSignUp) return {
			error: "signup disabled",
			data: null,
			isRegister: false
		};
		try {
			const { id: _, ...restUserInfo } = userInfo;
			const accountData = {
				accessToken: await setTokenUtil(account.accessToken, c.context),
				refreshToken: await setTokenUtil(account.refreshToken, c.context),
				idToken: account.idToken,
				accessTokenExpiresAt: account.accessTokenExpiresAt,
				refreshTokenExpiresAt: account.refreshTokenExpiresAt,
				scope: account.scope,
				providerId: account.providerId,
				accountId: userInfo.id.toString()
			};
			const { user: createdUser, account: createdAccount } = await c.context.internalAdapter.createOAuthUser({
				...restUserInfo,
				email: userInfo.email.toLowerCase()
			}, accountData);
			user = createdUser;
			if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, createdAccount);
			if (!userInfo.emailVerified && user && c.context.options.emailVerification?.sendOnSignUp && c.context.options.emailVerification?.sendVerificationEmail) {
				const token = await createEmailVerificationToken(c.context.secret, user.email, void 0, c.context.options.emailVerification?.expiresIn);
				const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
				await c.context.runInBackgroundOrAwait(c.context.options.emailVerification.sendVerificationEmail({
					user,
					url,
					token
				}, c.request));
			}
		} catch (e) {
			logger.error(e);
			if (isAPIError(e)) return {
				error: e.message,
				data: null,
				isRegister: false
			};
			return {
				error: "unable to create user",
				data: null,
				isRegister: false
			};
		}
	}
	if (!user) return {
		error: "unable to create user",
		data: null,
		isRegister: false
	};
	const session = await c.context.internalAdapter.createSession(user.id);
	if (!session) return {
		error: "unable to create session",
		data: null,
		isRegister: false
	};
	return {
		data: {
			session,
			user
		},
		error: null,
		isRegister
	};
}
var HIDE_METADATA = { scope: "server" };
var schema$1 = object({
	code: string().optional(),
	error: string().optional(),
	device_id: string().optional(),
	error_description: string().optional(),
	state: string().optional(),
	user: string().optional()
});
var callbackOAuth = createAuthEndpoint("/callback/:id", {
	method: ["GET", "POST"],
	operationId: "handleOAuthCallback",
	body: schema$1.optional(),
	query: schema$1.optional(),
	metadata: {
		...HIDE_METADATA,
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"]
	}
}, async (c) => {
	let queryOrBody;
	const defaultErrorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
	if (c.method === "POST") {
		const postData = c.body ? schema$1.parse(c.body) : {};
		const queryData = c.query ? schema$1.parse(c.query) : {};
		const mergedData = schema$1.parse({
			...postData,
			...queryData
		});
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(mergedData)) if (value !== void 0 && value !== null) params.set(key, String(value));
		const redirectURL = `${c.context.baseURL}/callback/${c.params.id}?${params.toString()}`;
		throw c.redirect(redirectURL);
	}
	try {
		if (c.method === "GET") queryOrBody = schema$1.parse(c.query);
		else if (c.method === "POST") queryOrBody = schema$1.parse(c.body);
		else throw new Error("Unsupported method");
	} catch (e) {
		c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
		throw c.redirect(`${defaultErrorURL}?error=invalid_callback_request`);
	}
	const { code, error, state, error_description, device_id, user: userData } = queryOrBody;
	if (!state) {
		c.context.logger.error("State not found", error);
		const url = `${defaultErrorURL}${defaultErrorURL.includes("?") ? "&" : "?"}state=state_not_found`;
		throw c.redirect(url);
	}
	const { codeVerifier, callbackURL, link, errorURL, newUserURL, requestSignUp } = await parseState(c);
	function redirectOnError(error, description) {
		const baseURL = errorURL ?? defaultErrorURL;
		const params = new URLSearchParams({ error });
		if (description) params.set("error_description", description);
		const url = `${baseURL}${baseURL.includes("?") ? "&" : "?"}${params.toString()}`;
		throw c.redirect(url);
	}
	if (error) redirectOnError(error, error_description);
	if (!code) {
		c.context.logger.error("Code not found");
		throw redirectOnError("no_code");
	}
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.params.id });
	if (!provider) {
		c.context.logger.error("Oauth provider with id", c.params.id, "not found");
		throw redirectOnError("oauth_provider_not_found");
	}
	let tokens;
	try {
		tokens = await provider.validateAuthorizationCode({
			code,
			codeVerifier,
			deviceId: device_id,
			redirectURI: `${c.context.baseURL}/callback/${provider.id}`
		});
	} catch (e) {
		c.context.logger.error("", e);
		throw redirectOnError("invalid_code");
	}
	if (!tokens) throw redirectOnError("invalid_code");
	const parsedUserData = userData ? safeJSONParse(userData) : null;
	const userInfo = await provider.getUserInfo({
		...tokens,
		user: parsedUserData ?? void 0
	}).then((res) => res?.user);
	if (!userInfo) {
		c.context.logger.error("Unable to get user info");
		return redirectOnError("unable_to_get_user_info");
	}
	if (!callbackURL) {
		c.context.logger.error("No callback URL found");
		throw redirectOnError("no_callback_url");
	}
	if (link) {
		if (!(c.context.options.account?.accountLinking?.trustedProviders)?.includes(provider.id) && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
			c.context.logger.error("Unable to link account - untrusted provider");
			return redirectOnError("unable_to_link_account");
		}
		if (userInfo.email !== link.email && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) return redirectOnError("email_doesn't_match");
		const existingAccount = await c.context.internalAdapter.findAccount(String(userInfo.id));
		if (existingAccount) {
			if (existingAccount.userId.toString() !== link.userId.toString()) return redirectOnError("account_already_linked_to_different_user");
			const updateData = Object.fromEntries(Object.entries({
				accessToken: await setTokenUtil(tokens.accessToken, c.context),
				refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
				idToken: tokens.idToken,
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
				scope: tokens.scopes?.join(",")
			}).filter(([_, value]) => value !== void 0));
			await c.context.internalAdapter.updateAccount(existingAccount.id, updateData);
		} else if (!await c.context.internalAdapter.createAccount({
			userId: link.userId,
			providerId: provider.id,
			accountId: String(userInfo.id),
			...tokens,
			accessToken: await setTokenUtil(tokens.accessToken, c.context),
			refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
			scope: tokens.scopes?.join(",")
		})) return redirectOnError("unable_to_link_account");
		let toRedirectTo;
		try {
			toRedirectTo = callbackURL.toString();
		} catch {
			toRedirectTo = callbackURL;
		}
		throw c.redirect(toRedirectTo);
	}
	if (!userInfo.email) {
		c.context.logger.error("Provider did not return email. This could be due to misconfiguration in the provider settings.");
		return redirectOnError("email_not_found");
	}
	const accountData = {
		providerId: provider.id,
		accountId: String(userInfo.id),
		...tokens,
		scope: tokens.scopes?.join(",")
	};
	const result = await handleOAuthUserInfo(c, {
		userInfo: {
			...userInfo,
			id: String(userInfo.id),
			email: userInfo.email,
			name: userInfo.name || userInfo.email
		},
		account: accountData,
		callbackURL,
		disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.options?.disableSignUp,
		overrideUserInfo: provider.options?.overrideUserInfoOnSignIn
	});
	if (result.error) {
		c.context.logger.error(result.error.split(" ").join("_"));
		return redirectOnError(result.error.split(" ").join("_"));
	}
	const { session, user } = result.data;
	await setSessionCookie(c, {
		session,
		user
	});
	let toRedirectTo;
	try {
		toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
	} catch {
		toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
	}
	throw c.redirect(toRedirectTo);
});
function sanitize(input) {
	return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&(?!amp;|lt;|gt;|quot;|#39;|#x[0-9a-fA-F]+;|#[0-9]+;)/g, "&amp;");
}
var html = (options, code = "Unknown", description = null) => {
	const custom = options.onAPIError?.customizeDefaultErrorPage;
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: ${custom?.font?.defaultFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
        background: ${custom?.colors?.background || "var(--background)"};
        color: var(--foreground);
        margin: 0;
      }
      :root,
      :host {
        --spacing: 0.25rem;
        --container-md: 28rem;
        --text-sm: ${custom?.size?.textSm || "0.875rem"};
        --text-sm--line-height: calc(1.25 / 0.875);
        --text-2xl: ${custom?.size?.text2xl || "1.5rem"};
        --text-2xl--line-height: calc(2 / 1.5);
        --text-4xl: ${custom?.size?.text4xl || "2.25rem"};
        --text-4xl--line-height: calc(2.5 / 2.25);
        --text-6xl: ${custom?.size?.text6xl || "3rem"};
        --text-6xl--line-height: 1;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --default-transition-duration: 150ms;
        --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        --radius: ${custom?.size?.radiusSm || "0.625rem"};
        --default-mono-font-family: ${custom?.font?.monoFamily || "var(--font-geist-mono)"};
        --primary: ${custom?.colors?.primary || "black"};
        --primary-foreground: ${custom?.colors?.primaryForeground || "white"};
        --background: ${custom?.colors?.background || "white"};
        --foreground: ${custom?.colors?.foreground || "oklch(0.271 0 0)"};
        --border: ${custom?.colors?.border || "oklch(0.89 0 0)"};
        --destructive: ${custom?.colors?.destructive || "oklch(0.55 0.15 25.723)"};
        --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.545 0 0)"};
        --corner-border: ${custom?.colors?.cornerBorder || "#404040"};
      }

      button, .btn {
        cursor: pointer;
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        transition: all var(--default-transition-duration)
          var(--default-transition-timing-function);
      }
      button:hover, .btn:hover {
        opacity: 0.8;
      }

      @media (prefers-color-scheme: dark) {
        :root,
        :host {
          --primary: ${custom?.colors?.primary || "white"};
          --primary-foreground: ${custom?.colors?.primaryForeground || "black"};
          --background: ${custom?.colors?.background || "oklch(0.15 0 0)"};
          --foreground: ${custom?.colors?.foreground || "oklch(0.98 0 0)"};
          --border: ${custom?.colors?.border || "oklch(0.27 0 0)"};
          --destructive: ${custom?.colors?.destructive || "oklch(0.65 0.15 25.723)"};
          --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.65 0 0)"};
          --corner-border: ${custom?.colors?.cornerBorder || "#a0a0a0"};
        }
      }
      @media (max-width: 640px) {
        :root, :host {
          --text-6xl: 2.5rem;
          --text-2xl: 1.25rem;
          --text-sm: 0.8125rem;
        }
      }
      @media (max-width: 480px) {
        :root, :host {
          --text-6xl: 2rem;
          --text-2xl: 1.125rem;
        }
      }
    </style>
  </head>
  <body style="width: 100vw; min-height: 100vh; overflow-x: hidden; overflow-y: auto;">
    <div
        style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            position: relative;
            width: 100%;
            min-height: 100vh;
            padding: 1rem;
        "
        >
${custom?.disableBackgroundGrid ? "" : `
      <div
        style="
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
          width: 100vw;
          height: 100vh;
        "
      ></div>
      <div
        style="
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${custom?.colors?.background || "var(--background)"};
          mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          pointer-events: none;
        "
      ></div>
`}

<div
  style="
    position: relative;
    z-index: 10;
    border: 2px solid var(--border);
    background: ${custom?.colors?.cardBackground || "var(--background)"};
    padding: 1.5rem;
    max-width: 42rem;
    width: 100%;
  "
>
    ${custom?.disableCornerDecorations ? "" : `
        <!-- Corner decorations -->
        <div
          style="
            position: absolute;
            top: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            top: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>
  
        <div
          style="
            position: absolute;
            bottom: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>`}

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="margin-bottom: 1.5rem;">
            <div
              style="
                display: inline-block;
                border: 2px solid ${custom?.disableTitleBorder ? "transparent" : custom?.colors?.titleBorder || "var(--destructive)"};
                padding: 0.375rem 1rem;
              "
            >
              <h1
                style="
                  font-size: var(--text-6xl);
                  font-weight: var(--font-weight-semibold);
                  color: ${custom?.colors?.titleColor || "var(--foreground)"};
                  letter-spacing: -0.02em;
                  margin: 0;
                "
              >
                ERROR
              </h1>
            </div>
            <div
              style="
                height: 2px;
                background-color: var(--border);
                width: calc(100% + 3rem);
                margin-left: -1.5rem;
                margin-top: 1.5rem;
              "
            ></div>
          </div>

          <h2
            style="
              font-size: var(--text-2xl);
              font-weight: var(--font-weight-semibold);
              color: var(--foreground);
              margin: 0 0 1rem;
            "
          >
            Something went wrong
          </h2>

          <div
            style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid var(--border);
                background-color: var(--muted);
                padding: 0.375rem 0.75rem;
                margin: 0 0 1rem;
                flex-wrap: wrap;
                justify-content: center;
            "
            >
            <span
                style="
                font-size: 0.75rem;
                color: var(--muted-foreground);
                font-weight: var(--font-weight-semibold);
                "
            >
                CODE:
            </span>
            <span
                style="
                font-size: var(--text-sm);
                font-family: var(--default-mono-font-family, monospace);
                color: var(--foreground);
                word-break: break-all;
                "
            >
                ${sanitize(code)}
            </span>
            </div>

          <p
            style="
              color: var(--muted-foreground);
              max-width: 28rem;
              margin: 0 auto;
              font-size: var(--text-sm);
              line-height: 1.5;
              text-wrap: pretty;
            "
          >
            ${!description ? `We encountered an unexpected error. Please try again or return to the home page. If you're a developer, you can find more information about the error <a href='https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}' target='_blank' rel="noopener noreferrer" style='color: var(--foreground); text-decoration: underline;'>here</a>.` : description}
          </p>
        </div>

        <div
          style="
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          "
        >
          <a
            href="/"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: var(--primary);
                color: var(--primary-foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Go Home
            </div>
          </a>
          <a
            href="https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}?askai=${encodeURIComponent(`What does the error code ${code} mean?`)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: transparent;
                color: var(--foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Ask AI
            </div>
          </a>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
var error = createAuthEndpoint("/error", {
	method: "GET",
	metadata: {
		...HIDE_METADATA,
		openapi: {
			description: "Displays an error page",
			responses: { "200": {
				description: "Success",
				content: { "text/html": { schema: {
					type: "string",
					description: "The HTML content of the error page"
				} } }
			} }
		}
	}
}, async (c) => {
	const url = new URL(c.request?.url || "");
	const unsanitizedCode = url.searchParams.get("error") || "UNKNOWN";
	const unsanitizedDescription = url.searchParams.get("error_description") || null;
	const safeCode = /^[\'A-Za-z0-9_-]+$/.test(unsanitizedCode || "") ? unsanitizedCode : "UNKNOWN";
	const safeDescription = unsanitizedDescription ? sanitize(unsanitizedDescription) : null;
	const queryParams = new URLSearchParams();
	queryParams.set("error", safeCode);
	if (unsanitizedDescription) queryParams.set("error_description", unsanitizedDescription);
	const options = c.context.options;
	const errorURL = options.onAPIError?.errorURL;
	if (errorURL) return new Response(null, {
		status: 302,
		headers: { Location: `${errorURL}${errorURL.includes("?") ? "&" : "?"}${queryParams.toString()}` }
	});
	if (isProduction && !options.onAPIError?.customizeDefaultErrorPage) return new Response(null, {
		status: 302,
		headers: { Location: `/?${queryParams.toString()}` }
	});
	return new Response(html(c.context.options, safeCode, safeDescription), { headers: { "Content-Type": "text/html" } });
});
var ok = createAuthEndpoint("/ok", {
	method: "GET",
	metadata: {
		...HIDE_METADATA,
		openapi: {
			description: "Check if the API is working",
			responses: { "200": {
				description: "API is working",
				content: { "application/json": { schema: {
					type: "object",
					properties: { ok: {
						type: "boolean",
						description: "Indicates if the API is working"
					} },
					required: ["ok"]
				} } }
			} }
		}
	}
}, async (ctx) => {
	return ctx.json({ ok: true });
});
async function validatePassword(ctx, data) {
	const credentialAccount = (await ctx.context.internalAdapter.findAccounts(data.userId))?.find((account) => account.providerId === "credential");
	const currentPassword = credentialAccount?.password;
	if (!credentialAccount || !currentPassword) return false;
	return await ctx.context.password.verify({
		hash: currentPassword,
		password: data.password
	});
}
async function checkPassword(userId, c) {
	const credentialAccount = (await c.context.internalAdapter.findAccounts(userId))?.find((account) => account.providerId === "credential");
	const currentPassword = credentialAccount?.password;
	if (!credentialAccount || !currentPassword || !c.body.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
	if (!await c.context.password.verify({
		hash: currentPassword,
		password: c.body.password
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	return true;
}
function redirectError(ctx, callbackURL, query) {
	const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
	const url = new URL(callbackURL, ctx.baseURL);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
var requestPasswordReset = createAuthEndpoint("/request-password-reset", {
	method: "POST",
	body: object({
		email: email().meta({ description: "The email address of the user to send a password reset email to" }),
		redirectTo: string().meta({ description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN" }).optional()
	}),
	metadata: { openapi: {
		operationId: "requestPasswordReset",
		description: "Send a password reset email to the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					status: { type: "boolean" },
					message: { type: "string" }
				}
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
		ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
		throw APIError.from("BAD_REQUEST", {
			message: "Reset password isn't enabled",
			code: "RESET_PASSWORD_DISABLED"
		});
	}
	const { email, redirectTo } = ctx.body;
	const user = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
	if (!user) {
		/**
		* We simulate the verification token generation and the database lookup
		* to mitigate timing attacks.
		*/
		generateId(24);
		await ctx.context.internalAdapter.findVerificationValue("dummy-verification-token");
		ctx.context.logger.error("Reset Password: User not found", { email });
		return ctx.json({
			status: true,
			message: "If this email exists in our system, check your email for the reset link"
		});
	}
	const expiresAt = getDate(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || 3600 * 1, "sec");
	const verificationToken = generateId(24);
	await ctx.context.internalAdapter.createVerificationValue({
		value: user.user.id,
		identifier: `reset-password:${verificationToken}`,
		expiresAt
	});
	const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
	const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.sendResetPassword({
		user: user.user,
		url,
		token: verificationToken
	}, ctx.request));
	return ctx.json({
		status: true,
		message: "If this email exists in our system, check your email for the reset link"
	});
});
var requestPasswordResetCallback = createAuthEndpoint("/reset-password/:token", {
	method: "GET",
	operationId: "forgetPasswordCallback",
	query: object({ callbackURL: string().meta({ description: "The URL to redirect the user to reset their password" }) }),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		operationId: "resetPasswordCallback",
		description: "Redirects the user to the callback URL with the token",
		parameters: [{
			name: "token",
			in: "path",
			required: true,
			description: "The token to reset the password",
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			required: true,
			description: "The URL to redirect the user to reset their password",
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { token: { type: "string" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const { token } = ctx.params;
	const { callbackURL } = ctx.query;
	if (!token || !callbackURL) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	const verification = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
	if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
});
var resetPassword = createAuthEndpoint("/reset-password", {
	method: "POST",
	operationId: "resetPassword",
	query: object({ token: string().optional() }).optional(),
	body: object({
		newPassword: string().meta({ description: "The new password to set" }),
		token: string().meta({ description: "The token to reset the password" }).optional()
	}),
	metadata: { openapi: {
		operationId: "resetPassword",
		description: "Reset the password for a user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token || ctx.query?.token;
	if (!token) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const { newPassword } = ctx.body;
	const minLength = ctx.context.password?.config.minPasswordLength;
	const maxLength = ctx.context.password?.config.maxPasswordLength;
	if (newPassword.length < minLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	if (newPassword.length > maxLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	const id = `reset-password:${token}`;
	const verification = await ctx.context.internalAdapter.findVerificationValue(id);
	if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const userId = verification.value;
	const hashedPassword = await ctx.context.password.hash(newPassword);
	if (!(await ctx.context.internalAdapter.findAccounts(userId)).find((ac) => ac.providerId === "credential")) await ctx.context.internalAdapter.createAccount({
		userId,
		providerId: "credential",
		password: hashedPassword,
		accountId: userId
	});
	else await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
	await ctx.context.internalAdapter.deleteVerificationValue(verification.id);
	if (ctx.context.options.emailAndPassword?.onPasswordReset) {
		const user = await ctx.context.internalAdapter.findUserById(userId);
		if (user) await ctx.context.options.emailAndPassword.onPasswordReset({ user }, ctx.request);
	}
	if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) await ctx.context.internalAdapter.deleteSessions(userId);
	return ctx.json({ status: true });
});
var verifyPassword = createAuthEndpoint("/verify-password", {
	method: "POST",
	body: object({ password: string().meta({ description: "The password to verify" }) }),
	metadata: {
		scope: "server",
		openapi: {
			operationId: "verifyPassword",
			description: "Verify the current user's password",
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: { type: "boolean" } }
				} } }
			} }
		}
	},
	use: [sensitiveSessionMiddleware]
}, async (ctx) => {
	const { password } = ctx.body;
	const session = ctx.context.session;
	if (!await validatePassword(ctx, {
		password,
		userId: session.user.id
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	return ctx.json({ status: true });
});
var socialSignInBodySchema = object({
	callbackURL: string().meta({ description: "Callback URL to redirect to after the user has signed in" }).optional(),
	newUserCallbackURL: string().optional(),
	errorCallbackURL: string().meta({ description: "Callback URL to redirect to if an error happens" }).optional(),
	provider: SocialProviderListEnum,
	disableRedirect: boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
	idToken: optional(object({
		token: string().meta({ description: "ID token from the provider" }),
		nonce: string().meta({ description: "Nonce used to generate the token" }).optional(),
		accessToken: string().meta({ description: "Access token from the provider" }).optional(),
		refreshToken: string().meta({ description: "Refresh token from the provider" }).optional(),
		expiresAt: number().meta({ description: "Expiry date of the token" }).optional()
	})),
	scopes: array(string()).meta({ description: "Array of scopes to request from the provider. This will override the default scopes passed." }).optional(),
	requestSignUp: boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider" }).optional(),
	loginHint: string().meta({ description: "The login hint to use for the authorization code request" }).optional(),
	additionalData: record(string(), any()).optional().meta({ description: "Additional data to be passed through the OAuth flow" })
});
var signInSocial = () => createAuthEndpoint("/sign-in/social", {
	method: "POST",
	operationId: "socialSignIn",
	body: socialSignInBodySchema,
	metadata: {
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			description: "Sign in with a social provider",
			operationId: "socialSignIn",
			responses: { "200": {
				description: "Success - Returns either session details or redirect URL",
				content: { "application/json": { schema: {
					type: "object",
					description: "Session response when idToken is provided",
					properties: {
						token: { type: "string" },
						user: {
							type: "object",
							$ref: "#/components/schemas/User"
						},
						url: { type: "string" },
						redirect: {
							type: "boolean",
							enum: [false]
						}
					},
					required: [
						"redirect",
						"token",
						"user"
					]
				} } }
			} }
		}
	}
}, async (c) => {
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
	if (!provider) {
		c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
		throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	}
	if (c.body.idToken) {
		if (!provider.verifyIdToken) {
			c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
			throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
		}
		const { token, nonce } = c.body.idToken;
		if (!await provider.verifyIdToken(token, nonce)) {
			c.context.logger.error("Invalid id token", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
		}
		const userInfo = await provider.getUserInfo({
			idToken: token,
			accessToken: c.body.idToken.accessToken,
			refreshToken: c.body.idToken.refreshToken
		});
		if (!userInfo || !userInfo?.user) {
			c.context.logger.error("Failed to get user info", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
		}
		if (!userInfo.user.email) {
			c.context.logger.error("User email not found", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
		}
		const data = await handleOAuthUserInfo(c, {
			userInfo: {
				...userInfo.user,
				email: userInfo.user.email,
				id: String(userInfo.user.id),
				name: userInfo.user.name || "",
				image: userInfo.user.image,
				emailVerified: userInfo.user.emailVerified || false
			},
			account: {
				providerId: provider.id,
				accountId: String(userInfo.user.id),
				accessToken: c.body.idToken.accessToken
			},
			callbackURL: c.body.callbackURL,
			disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.disableSignUp
		});
		if (data.error) throw APIError.from("UNAUTHORIZED", {
			message: data.error,
			code: "OAUTH_LINK_ERROR"
		});
		await setSessionCookie(c, data.data);
		return c.json({
			redirect: false,
			token: data.data.session.token,
			url: void 0,
			user: parseUserOutput(c.context.options, data.data.user)
		});
	}
	const { codeVerifier, state } = await generateState(c, void 0, c.body.additionalData);
	const url = await provider.createAuthorizationURL({
		state,
		codeVerifier,
		redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
		scopes: c.body.scopes,
		loginHint: c.body.loginHint
	});
	if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
	return c.json({
		url: url.toString(),
		redirect: !c.body.disableRedirect
	});
});
var signInEmail = () => createAuthEndpoint("/sign-in/email", {
	method: "POST",
	operationId: "signInEmail",
	use: [formCsrfMiddleware],
	body: object({
		email: string().meta({ description: "Email of the user" }),
		password: string().meta({ description: "Password of the user" }),
		callbackURL: string().meta({ description: "Callback URL to use as a redirect for email verification" }).optional(),
		rememberMe: boolean().meta({ description: "If this is false, the session will not be remembered. Default is `true`." }).default(true).optional()
	}),
	metadata: {
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			operationId: "signInEmail",
			description: "Sign in with email and password",
			responses: { "200": {
				description: "Success - Returns either session details or redirect URL",
				content: { "application/json": { schema: {
					type: "object",
					description: "Session response when idToken is provided",
					properties: {
						redirect: {
							type: "boolean",
							enum: [false]
						},
						token: {
							type: "string",
							description: "Session token"
						},
						url: {
							type: "string",
							nullable: true
						},
						user: {
							type: "object",
							$ref: "#/components/schemas/User"
						}
					},
					required: [
						"redirect",
						"token",
						"user"
					]
				} } }
			} }
		}
	}
}, async (ctx) => {
	if (!ctx.context.options?.emailAndPassword?.enabled) {
		ctx.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!");
		throw APIError.from("BAD_REQUEST", {
			code: "EMAIL_PASSWORD_DISABLED",
			message: "Email and password is not enabled"
		});
	}
	const { email: email$1, password } = ctx.body;
	if (!email().safeParse(email$1).success) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
	const user = await ctx.context.internalAdapter.findUserByEmail(email$1, { includeAccounts: true });
	if (!user) {
		await ctx.context.password.hash(password);
		ctx.context.logger.error("User not found", { email: email$1 });
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	const credentialAccount = user.accounts.find((a) => a.providerId === "credential");
	if (!credentialAccount) {
		await ctx.context.password.hash(password);
		ctx.context.logger.error("Credential account not found", { email: email$1 });
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	const currentPassword = credentialAccount?.password;
	if (!currentPassword) {
		await ctx.context.password.hash(password);
		ctx.context.logger.error("Password not found", { email: email$1 });
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	if (!await ctx.context.password.verify({
		hash: currentPassword,
		password
	})) {
		ctx.context.logger.error("Invalid password");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.user.emailVerified) {
		if (!ctx.context.options?.emailVerification?.sendVerificationEmail) throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
		if (ctx.context.options?.emailVerification?.sendOnSignIn) {
			const token = await createEmailVerificationToken(ctx.context.secret, user.user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
			const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
			await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
				user: user.user,
				url,
				token
			}, ctx.request));
		}
		throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
	}
	const session = await ctx.context.internalAdapter.createSession(user.user.id, ctx.body.rememberMe === false);
	if (!session) {
		ctx.context.logger.error("Failed to create session");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
	}
	await setSessionCookie(ctx, {
		session,
		user: user.user
	}, ctx.body.rememberMe === false);
	if (ctx.body.callbackURL) ctx.setHeader("Location", ctx.body.callbackURL);
	return ctx.json({
		redirect: !!ctx.body.callbackURL,
		token: session.token,
		url: ctx.body.callbackURL,
		user: parseUserOutput(ctx.context.options, user.user)
	});
});
var signOut = createAuthEndpoint("/sign-out", {
	method: "POST",
	operationId: "signOut",
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "signOut",
		description: "Sign out the current user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { success: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
	if (sessionCookieToken) try {
		await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
	} catch (e) {
		ctx.context.logger.error("Failed to delete session from database", e);
	}
	deleteSessionCookie(ctx);
	return ctx.json({ success: true });
});
var signUpEmailBodySchema = object({
	name: string(),
	email: email(),
	password: string().nonempty(),
	image: string().optional(),
	callbackURL: string().optional(),
	rememberMe: boolean().optional()
}).and(record(string(), any()));
var signUpEmail = () => createAuthEndpoint("/sign-up/email", {
	method: "POST",
	operationId: "signUpWithEmailAndPassword",
	use: [formCsrfMiddleware],
	body: signUpEmailBodySchema,
	metadata: {
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			operationId: "signUpWithEmailAndPassword",
			description: "Sign up a user using email and password",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "The name of the user"
					},
					email: {
						type: "string",
						description: "The email of the user"
					},
					password: {
						type: "string",
						description: "The password of the user"
					},
					image: {
						type: "string",
						description: "The profile image URL of the user"
					},
					callbackURL: {
						type: "string",
						description: "The URL to use for email verification callback"
					},
					rememberMe: {
						type: "boolean",
						description: "If this is false, the session will not be remembered. Default is `true`."
					}
				},
				required: [
					"name",
					"email",
					"password"
				]
			} } } },
			responses: {
				"200": {
					description: "Successfully created user",
					content: { "application/json": { schema: {
						type: "object",
						properties: {
							token: {
								type: "string",
								nullable: true,
								description: "Authentication token for the session"
							},
							user: {
								type: "object",
								properties: {
									id: {
										type: "string",
										description: "The unique identifier of the user"
									},
									email: {
										type: "string",
										format: "email",
										description: "The email address of the user"
									},
									name: {
										type: "string",
										description: "The name of the user"
									},
									image: {
										type: "string",
										format: "uri",
										nullable: true,
										description: "The profile image URL of the user"
									},
									emailVerified: {
										type: "boolean",
										description: "Whether the email has been verified"
									},
									createdAt: {
										type: "string",
										format: "date-time",
										description: "When the user was created"
									},
									updatedAt: {
										type: "string",
										format: "date-time",
										description: "When the user was last updated"
									}
								},
								required: [
									"id",
									"email",
									"name",
									"emailVerified",
									"createdAt",
									"updatedAt"
								]
							}
						},
						required: ["user"]
					} } }
				},
				"422": {
					description: "Unprocessable Entity. User already exists or failed to create user.",
					content: { "application/json": { schema: {
						type: "object",
						properties: { message: { type: "string" } }
					} } }
				}
			}
		}
	}
}, async (ctx) => {
	return runWithTransaction(ctx.context.adapter, async () => {
		if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) throw APIError.from("BAD_REQUEST", {
			message: "Email and password sign up is not enabled",
			code: "EMAIL_PASSWORD_SIGN_UP_DISABLED"
		});
		const body = ctx.body;
		const { name, email: email$2, password, image, callbackURL: _callbackURL, rememberMe, ...rest } = body;
		if (!email().safeParse(email$2).success) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
		if (!password || typeof password !== "string") throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
		const minPasswordLength = ctx.context.password.config.minPasswordLength;
		if (password.length < minPasswordLength) {
			ctx.context.logger.error("Password is too short");
			throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
		}
		const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
		if (password.length > maxPasswordLength) {
			ctx.context.logger.error("Password is too long");
			throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
		}
		if ((await ctx.context.internalAdapter.findUserByEmail(email$2))?.user) {
			ctx.context.logger.info(`Sign-up attempt for existing email: ${email$2}`);
			throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL);
		}
		/**
		* Hash the password
		*
		* This is done prior to creating the user
		* to ensure that any plugin that
		* may break the hashing should break
		* before the user is created.
		*/
		const hash = await ctx.context.password.hash(password);
		let createdUser;
		try {
			const data = parseUserInput(ctx.context.options, rest, "create");
			createdUser = await ctx.context.internalAdapter.createUser({
				email: email$2.toLowerCase(),
				name,
				image,
				...data,
				emailVerified: false
			});
			if (!createdUser) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		} catch (e) {
			if (isDevelopment()) ctx.context.logger.error("Failed to create user", e);
			if (isAPIError(e)) throw e;
			ctx.context.logger?.error("Failed to create user", e);
			throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		}
		if (!createdUser) throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		await ctx.context.internalAdapter.linkAccount({
			userId: createdUser.id,
			providerId: "credential",
			accountId: createdUser.id,
			password: hash
		});
		if (ctx.context.options.emailVerification?.sendOnSignUp ?? ctx.context.options.emailAndPassword.requireEmailVerification) {
			const token = await createEmailVerificationToken(ctx.context.secret, createdUser.email, void 0, ctx.context.options.emailVerification?.expiresIn);
			const callbackURL = body.callbackURL ? encodeURIComponent(body.callbackURL) : encodeURIComponent("/");
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
			if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
				user: createdUser,
				url,
				token
			}, ctx.request));
		}
		if (ctx.context.options.emailAndPassword.autoSignIn === false || ctx.context.options.emailAndPassword.requireEmailVerification) return ctx.json({
			token: null,
			user: parseUserOutput(ctx.context.options, createdUser)
		});
		const session = await ctx.context.internalAdapter.createSession(createdUser.id, rememberMe === false);
		if (!session) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
		await setSessionCookie(ctx, {
			session,
			user: createdUser
		}, rememberMe === false);
		return ctx.json({
			token: session.token,
			user: parseUserOutput(ctx.context.options, createdUser)
		});
	});
});
var updateUserBodySchema = record(string().meta({ description: "Field name must be a string" }), any());
var updateUser = () => createAuthEndpoint("/update-user", {
	method: "POST",
	operationId: "updateUser",
	body: updateUserBodySchema,
	use: [sessionMiddleware],
	metadata: {
		$Infer: { body: {} },
		openapi: {
			operationId: "updateUser",
			description: "Update the current user",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "The name of the user"
					},
					image: {
						type: "string",
						description: "The image of the user",
						nullable: true
					}
				}
			} } } },
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { user: {
						type: "object",
						$ref: "#/components/schemas/User"
					} }
				} } }
			} }
		}
	}
}, async (ctx) => {
	const body = ctx.body;
	if (typeof body !== "object" || Array.isArray(body)) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.BODY_MUST_BE_AN_OBJECT);
	if (body.email) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED);
	const { name, image, ...rest } = body;
	const session = ctx.context.session;
	const additionalFields = parseUserInput(ctx.context.options, rest, "update");
	if (image === void 0 && name === void 0 && Object.keys(additionalFields).length === 0) throw APIError.fromStatus("BAD_REQUEST", { message: "No fields to update" });
	const updatedUser = await ctx.context.internalAdapter.updateUser(session.user.id, {
		name,
		image,
		...additionalFields
	}) ?? {
		...session.user,
		...name !== void 0 && { name },
		...image !== void 0 && { image },
		...additionalFields
	};
	/**
	* Update the session cookie with the new user data
	*/
	await setSessionCookie(ctx, {
		session: session.session,
		user: updatedUser
	});
	return ctx.json({ status: true });
});
var changePassword = createAuthEndpoint("/change-password", {
	method: "POST",
	operationId: "changePassword",
	body: object({
		newPassword: string().meta({ description: "The new password to set" }),
		currentPassword: string().meta({ description: "The current password is required" }),
		revokeOtherSessions: boolean().meta({ description: "Must be a boolean value" }).optional()
	}),
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		operationId: "changePassword",
		description: "Change the password of the user",
		responses: { "200": {
			description: "Password successfully changed",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					token: {
						type: "string",
						nullable: true,
						description: "New session token if other sessions were revoked"
					},
					user: {
						type: "object",
						properties: {
							id: {
								type: "string",
								description: "The unique identifier of the user"
							},
							email: {
								type: "string",
								format: "email",
								description: "The email address of the user"
							},
							name: {
								type: "string",
								description: "The name of the user"
							},
							image: {
								type: "string",
								format: "uri",
								nullable: true,
								description: "The profile image URL of the user"
							},
							emailVerified: {
								type: "boolean",
								description: "Whether the email has been verified"
							},
							createdAt: {
								type: "string",
								format: "date-time",
								description: "When the user was created"
							},
							updatedAt: {
								type: "string",
								format: "date-time",
								description: "When the user was last updated"
							}
						},
						required: [
							"id",
							"email",
							"name",
							"emailVerified",
							"createdAt",
							"updatedAt"
						]
					}
				},
				required: ["user"]
			} } }
		} }
	} }
}, async (ctx) => {
	const { newPassword, currentPassword, revokeOtherSessions } = ctx.body;
	const session = ctx.context.session;
	const minPasswordLength = ctx.context.password.config.minPasswordLength;
	if (newPassword.length < minPasswordLength) {
		ctx.context.logger.error("Password is too short");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	}
	const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
	if (newPassword.length > maxPasswordLength) {
		ctx.context.logger.error("Password is too long");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	}
	const account = (await ctx.context.internalAdapter.findAccounts(session.user.id)).find((account) => account.providerId === "credential" && account.password);
	if (!account || !account.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
	const passwordHash = await ctx.context.password.hash(newPassword);
	if (!await ctx.context.password.verify({
		hash: account.password,
		password: currentPassword
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	await ctx.context.internalAdapter.updateAccount(account.id, { password: passwordHash });
	let token = null;
	if (revokeOtherSessions) {
		await ctx.context.internalAdapter.deleteSessions(session.user.id);
		const newSession = await ctx.context.internalAdapter.createSession(session.user.id);
		if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
		await setSessionCookie(ctx, {
			session: newSession,
			user: session.user
		});
		token = newSession.token;
	}
	return ctx.json({
		token,
		user: parseUserOutput(ctx.context.options, session.user)
	});
});
var setPassword = createAuthEndpoint({
	method: "POST",
	body: object({ newPassword: string().meta({ description: "The new password to set is required" }) }),
	use: [sensitiveSessionMiddleware]
}, async (ctx) => {
	const { newPassword } = ctx.body;
	const session = ctx.context.session;
	const minPasswordLength = ctx.context.password.config.minPasswordLength;
	if (newPassword.length < minPasswordLength) {
		ctx.context.logger.error("Password is too short");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	}
	const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
	if (newPassword.length > maxPasswordLength) {
		ctx.context.logger.error("Password is too long");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	}
	const account = (await ctx.context.internalAdapter.findAccounts(session.user.id)).find((account) => account.providerId === "credential" && account.password);
	const passwordHash = await ctx.context.password.hash(newPassword);
	if (!account) {
		await ctx.context.internalAdapter.linkAccount({
			userId: session.user.id,
			providerId: "credential",
			accountId: session.user.id,
			password: passwordHash
		});
		return ctx.json({ status: true });
	}
	throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_ALREADY_SET);
});
var deleteUser = createAuthEndpoint("/delete-user", {
	method: "POST",
	use: [sensitiveSessionMiddleware],
	body: object({
		callbackURL: string().meta({ description: "The callback URL to redirect to after the user is deleted" }).optional(),
		password: string().meta({ description: "The password of the user is required to delete the user" }).optional(),
		token: string().meta({ description: "The token to delete the user is required" }).optional()
	}),
	metadata: { openapi: {
		operationId: "deleteUser",
		description: "Delete the user",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: {
				callbackURL: {
					type: "string",
					description: "The callback URL to redirect to after the user is deleted"
				},
				password: {
					type: "string",
					description: "The user's password. Required if session is not fresh"
				},
				token: {
					type: "string",
					description: "The deletion verification token"
				}
			}
		} } } },
		responses: { "200": {
			description: "User deletion processed successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						description: "Indicates if the operation was successful"
					},
					message: {
						type: "string",
						enum: ["User deleted", "Verification email sent"],
						description: "Status message of the deletion process"
					}
				},
				required: ["success", "message"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.deleteUser?.enabled) {
		ctx.context.logger.error("Delete user is disabled. Enable it in the options");
		throw APIError.fromStatus("NOT_FOUND");
	}
	const session = ctx.context.session;
	if (ctx.body.password) {
		const account = (await ctx.context.internalAdapter.findAccounts(session.user.id)).find((account) => account.providerId === "credential" && account.password);
		if (!account || !account.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
		if (!await ctx.context.password.verify({
			hash: account.password,
			password: ctx.body.password
		})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	}
	if (ctx.body.token) {
		await deleteUserCallback({
			...ctx,
			query: { token: ctx.body.token }
		});
		return ctx.json({
			success: true,
			message: "User deleted"
		});
	}
	if (ctx.context.options.user.deleteUser?.sendDeleteAccountVerification) {
		const token = generateRandomString(32, "0-9", "a-z");
		await ctx.context.internalAdapter.createVerificationValue({
			value: session.user.id,
			identifier: `delete-account-${token}`,
			expiresAt: new Date(Date.now() + (ctx.context.options.user.deleteUser?.deleteTokenExpiresIn || 3600 * 24) * 1e3)
		});
		const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
		await ctx.context.runInBackgroundOrAwait(ctx.context.options.user.deleteUser.sendDeleteAccountVerification({
			user: session.user,
			url,
			token
		}, ctx.request));
		return ctx.json({
			success: true,
			message: "Verification email sent"
		});
	}
	if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
		const currentAge = new Date(session.session.createdAt).getTime();
		const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
		if (Date.now() - currentAge > freshAge * 1e3) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.SESSION_EXPIRED);
	}
	const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
	if (beforeDelete) await beforeDelete(session.user, ctx.request);
	await ctx.context.internalAdapter.deleteUser(session.user.id);
	await ctx.context.internalAdapter.deleteSessions(session.user.id);
	deleteSessionCookie(ctx);
	const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
	if (afterDelete) await afterDelete(session.user, ctx.request);
	return ctx.json({
		success: true,
		message: "User deleted"
	});
});
var deleteUserCallback = createAuthEndpoint("/delete-user/callback", {
	method: "GET",
	query: object({
		token: string().meta({ description: "The token to verify the deletion request" }),
		callbackURL: string().meta({ description: "The URL to redirect to after deletion" }).optional()
	}),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		description: "Callback to complete user deletion with verification token",
		responses: { "200": {
			description: "User successfully deleted",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						description: "Indicates if the deletion was successful"
					},
					message: {
						type: "string",
						enum: ["User deleted"],
						description: "Confirmation message"
					}
				},
				required: ["success", "message"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.deleteUser?.enabled) {
		ctx.context.logger.error("Delete user is disabled. Enable it in the options");
		throw APIError.from("NOT_FOUND", {
			message: "Not found",
			code: "NOT_FOUND"
		});
	}
	const session = await getSessionFromCtx(ctx);
	if (!session) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
	const token = await ctx.context.internalAdapter.findVerificationValue(`delete-account-${ctx.query.token}`);
	if (!token || token.expiresAt < /* @__PURE__ */ new Date()) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.INVALID_TOKEN);
	if (token.value !== session.user.id) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.INVALID_TOKEN);
	const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
	if (beforeDelete) await beforeDelete(session.user, ctx.request);
	await ctx.context.internalAdapter.deleteUser(session.user.id);
	await ctx.context.internalAdapter.deleteSessions(session.user.id);
	await ctx.context.internalAdapter.deleteAccounts(session.user.id);
	await ctx.context.internalAdapter.deleteVerificationValue(token.id);
	deleteSessionCookie(ctx);
	const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
	if (afterDelete) await afterDelete(session.user, ctx.request);
	if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL || "/");
	return ctx.json({
		success: true,
		message: "User deleted"
	});
});
var changeEmail = createAuthEndpoint("/change-email", {
	method: "POST",
	body: object({
		newEmail: email().meta({ description: "The new email address to set must be a valid email address" }),
		callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
	}),
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		operationId: "changeEmail",
		responses: {
			"200": {
				description: "Email change request processed successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						user: {
							type: "object",
							$ref: "#/components/schemas/User"
						},
						status: {
							type: "boolean",
							description: "Indicates if the request was successful"
						},
						message: {
							type: "string",
							enum: ["Email updated", "Verification email sent"],
							description: "Status message of the email change process",
							nullable: true
						}
					},
					required: ["status"]
				} } }
			},
			"422": {
				description: "Unprocessable Entity. Email already exists",
				content: { "application/json": { schema: {
					type: "object",
					properties: { message: { type: "string" } }
				} } }
			}
		}
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.changeEmail?.enabled) {
		ctx.context.logger.error("Change email is disabled.");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Change email is disabled" });
	}
	const newEmail = ctx.body.newEmail.toLowerCase();
	if (newEmail === ctx.context.session.user.email) {
		ctx.context.logger.error("Email is the same");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Email is the same" });
	}
	if (await ctx.context.internalAdapter.findUserByEmail(newEmail)) {
		ctx.context.logger.error("Email already exists");
		throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL);
	}
	/**
	* If the email is not verified, we can update the email if the option is enabled
	*/
	if (ctx.context.session.user.emailVerified !== true && ctx.context.options.user.changeEmail.updateEmailWithoutVerification) {
		await ctx.context.internalAdapter.updateUserByEmail(ctx.context.session.user.email, { email: newEmail });
		await setSessionCookie(ctx, {
			session: ctx.context.session.session,
			user: {
				...ctx.context.session.user,
				email: newEmail
			}
		});
		if (ctx.context.options.emailVerification?.sendVerificationEmail) {
			const token = await createEmailVerificationToken(ctx.context.secret, newEmail, void 0, ctx.context.options.emailVerification?.expiresIn);
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
			await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
				user: {
					...ctx.context.session.user,
					email: newEmail
				},
				url,
				token
			}, ctx.request));
		}
		return ctx.json({ status: true });
	}
	if (ctx.context.session.user.emailVerified && ctx.context.options.user.changeEmail.sendChangeEmailConfirmation) {
		const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-confirmation" });
		const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
		const sendFn = ctx.context.options.user.changeEmail.sendChangeEmailConfirmation;
		if (sendFn) await ctx.context.runInBackgroundOrAwait(sendFn({
			user: ctx.context.session.user,
			newEmail,
			url,
			token
		}, ctx.request));
		return ctx.json({ status: true });
	}
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Verification email isn't enabled" });
	}
	const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
	const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
		user: {
			...ctx.context.session.user,
			email: newEmail
		},
		url,
		token
	}, ctx.request));
	return ctx.json({ status: true });
});
var defuReplaceArrays = createDefu((obj, key, value) => {
	if (Array.isArray(obj[key]) && Array.isArray(value)) {
		obj[key] = value;
		return true;
	}
});
var hooksSourceWeakMap = /* @__PURE__ */ new WeakMap();
function toAuthEndpoints(endpoints, ctx) {
	const api = {};
	for (const [key, endpoint] of Object.entries(endpoints)) {
		api[key] = async (context) => {
			const run = async () => {
				const authContext = await ctx;
				let internalContext = {
					...context,
					context: {
						...authContext,
						returned: void 0,
						responseHeaders: void 0,
						session: null
					},
					path: endpoint.path,
					headers: context?.headers ? new Headers(context?.headers) : void 0
				};
				return runWithEndpointContext(internalContext, async () => {
					const { beforeHooks, afterHooks } = getHooks(authContext);
					const before = await runBeforeHooks(internalContext, beforeHooks);
					/**
					* If `before.context` is returned, it should
					* get merged with the original context
					*/
					if ("context" in before && before.context && typeof before.context === "object") {
						const { headers, ...rest } = before.context;
						/**
						* Headers should be merged differently
						* so the hook doesn't override the whole
						* header
						*/
						if (headers) headers.forEach((value, key) => {
							internalContext.headers.set(key, value);
						});
						internalContext = defuReplaceArrays(rest, internalContext);
					} else if (before) return context?.asResponse ? toResponse(before, { headers: context?.headers }) : context?.returnHeaders ? {
						headers: context?.headers,
						response: before
					} : before;
					internalContext.asResponse = false;
					internalContext.returnHeaders = true;
					internalContext.returnStatus = true;
					const result = await runWithEndpointContext(internalContext, () => endpoint(internalContext)).catch((e) => {
						if (isAPIError(e))
 /**
						* API Errors from response are caught
						* and returned to hooks
						*/
						return {
							response: e,
							status: e.statusCode,
							headers: e.headers ? new Headers(e.headers) : null
						};
						throw e;
					});
					if (result && result instanceof Response) return result;
					internalContext.context.returned = result.response;
					internalContext.context.responseHeaders = result.headers;
					const after = await runAfterHooks(internalContext, afterHooks);
					if (after.response) result.response = after.response;
					if (isAPIError(result.response) && shouldPublishLog(authContext.logger.level, "debug")) result.response.stack = result.response.errorStack;
					if (isAPIError(result.response) && !context?.asResponse) throw result.response;
					return context?.asResponse ? toResponse(result.response, {
						headers: result.headers,
						status: result.status
					}) : context?.returnHeaders ? context?.returnStatus ? {
						headers: result.headers,
						response: result.response,
						status: result.status
					} : {
						headers: result.headers,
						response: result.response
					} : context?.returnStatus ? {
						response: result.response,
						status: result.status
					} : result.response;
				});
			};
			if (await hasRequestState()) return run();
			else return runWithRequestState(/* @__PURE__ */ new WeakMap(), run);
		};
		api[key].path = endpoint.path;
		api[key].options = endpoint.options;
	}
	return api;
}
async function runBeforeHooks(context, hooks) {
	let modifiedContext = {};
	for (const hook of hooks) {
		let matched = false;
		try {
			matched = hook.matcher(context);
		} catch (error) {
			const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
			context.context.logger.error(`An error occurred during ${hookSource} hook matcher execution:`, error);
			throw new APIError("INTERNAL_SERVER_ERROR", { message: `An error occurred during hook matcher execution. Check the logs for more details.` });
		}
		if (matched) {
			const result = await hook.handler({
				...context,
				returnHeaders: false
			}).catch((e) => {
				if (isAPIError(e) && shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
				throw e;
			});
			if (result && typeof result === "object") {
				if ("context" in result && typeof result.context === "object") {
					const { headers, ...rest } = result.context;
					if (headers instanceof Headers) if (modifiedContext.headers) headers.forEach((value, key) => {
						modifiedContext.headers?.set(key, value);
					});
					else modifiedContext.headers = headers;
					modifiedContext = defuReplaceArrays(rest, modifiedContext);
					continue;
				}
				return result;
			}
		}
	}
	return { context: modifiedContext };
}
async function runAfterHooks(context, hooks) {
	for (const hook of hooks) if (hook.matcher(context)) {
		const result = await hook.handler(context).catch((e) => {
			if (isAPIError(e)) {
				const headers = e[kAPIErrorHeaderSymbol];
				if (shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
				return {
					response: e,
					headers: headers ? headers : e.headers ? new Headers(e.headers) : null
				};
			}
			throw e;
		});
		if (result.headers) result.headers.forEach((value, key) => {
			if (!context.context.responseHeaders) context.context.responseHeaders = new Headers({ [key]: value });
			else if (key.toLowerCase() === "set-cookie") context.context.responseHeaders.append(key, value);
			else context.context.responseHeaders.set(key, value);
		});
		if (result.response) context.context.returned = result.response;
	}
	return {
		response: context.context.returned,
		headers: context.context.responseHeaders
	};
}
function getHooks(authContext) {
	const plugins = authContext.options.plugins || [];
	const beforeHooks = [];
	const afterHooks = [];
	const beforeHookHandler = authContext.options.hooks?.before;
	if (beforeHookHandler) {
		hooksSourceWeakMap.set(beforeHookHandler, "user");
		beforeHooks.push({
			matcher: () => true,
			handler: beforeHookHandler
		});
	}
	const afterHookHandler = authContext.options.hooks?.after;
	if (afterHookHandler) {
		hooksSourceWeakMap.set(afterHookHandler, "user");
		afterHooks.push({
			matcher: () => true,
			handler: afterHookHandler
		});
	}
	const pluginBeforeHooks = plugins.filter((plugin) => plugin.hooks?.before).map((plugin) => plugin.hooks?.before).flat();
	const pluginAfterHooks = plugins.filter((plugin) => plugin.hooks?.after).map((plugin) => plugin.hooks?.after).flat();
	/**
	* Add plugin added hooks at last
	*/
	if (pluginBeforeHooks.length) beforeHooks.push(...pluginBeforeHooks);
	if (pluginAfterHooks.length) afterHooks.push(...pluginAfterHooks);
	return {
		beforeHooks,
		afterHooks
	};
}
function checkEndpointConflicts(options, logger) {
	const endpointRegistry = /* @__PURE__ */ new Map();
	options.plugins?.forEach((plugin) => {
		if (plugin.endpoints) {
			for (const [key, endpoint] of Object.entries(plugin.endpoints)) if (endpoint && "path" in endpoint && typeof endpoint.path === "string") {
				const path = endpoint.path;
				let methods = [];
				if (endpoint.options && "method" in endpoint.options) {
					if (Array.isArray(endpoint.options.method)) methods = endpoint.options.method;
					else if (typeof endpoint.options.method === "string") methods = [endpoint.options.method];
				}
				if (methods.length === 0) methods = ["*"];
				if (!endpointRegistry.has(path)) endpointRegistry.set(path, []);
				endpointRegistry.get(path).push({
					pluginId: plugin.id,
					endpointKey: key,
					methods
				});
			}
		}
	});
	const conflicts = [];
	for (const [path, entries] of endpointRegistry.entries()) if (entries.length > 1) {
		const methodMap = /* @__PURE__ */ new Map();
		let hasConflict = false;
		for (const entry of entries) for (const method of entry.methods) {
			if (!methodMap.has(method)) methodMap.set(method, []);
			methodMap.get(method).push(entry.pluginId);
			if (methodMap.get(method).length > 1) hasConflict = true;
			if (method === "*" && entries.length > 1) hasConflict = true;
			else if (method !== "*" && methodMap.has("*")) hasConflict = true;
		}
		if (hasConflict) {
			const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
			const conflictingMethods = [];
			for (const [method, plugins] of methodMap.entries()) if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) conflictingMethods.push(method);
			conflicts.push({
				path,
				plugins: uniquePlugins,
				conflictingMethods
			});
		}
	}
	if (conflicts.length > 0) {
		const conflictMessages = conflicts.map((conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`).join("\n");
		logger.error(`Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`);
	}
}
function getEndpoints(ctx, options) {
	const pluginEndpoints = options.plugins?.reduce((acc, plugin) => {
		return {
			...acc,
			...plugin.endpoints
		};
	}, {}) ?? {};
	const middlewares = options.plugins?.map((plugin) => plugin.middlewares?.map((m) => {
		const middleware = (async (context) => {
			const authContext = await ctx;
			return m.middleware({
				...context,
				context: {
					...authContext,
					...context.context
				}
			});
		});
		middleware.options = m.middleware.options;
		return {
			path: m.path,
			middleware
		};
	})).filter((plugin) => plugin !== void 0).flat() || [];
	return {
		api: toAuthEndpoints({
			signInSocial: signInSocial(),
			callbackOAuth,
			getSession: getSession(),
			signOut,
			signUpEmail: signUpEmail(),
			signInEmail: signInEmail(),
			resetPassword,
			verifyPassword,
			verifyEmail,
			sendVerificationEmail,
			changeEmail,
			changePassword,
			setPassword,
			updateUser: updateUser(),
			deleteUser,
			requestPasswordReset,
			requestPasswordResetCallback,
			listSessions: listSessions(),
			revokeSession,
			revokeSessions,
			revokeOtherSessions,
			linkSocialAccount,
			listUserAccounts,
			deleteUserCallback,
			unlinkAccount,
			refreshToken,
			getAccessToken,
			accountInfo,
			...pluginEndpoints,
			ok,
			error
		}, ctx),
		middlewares
	};
}
var router = (ctx, options) => {
	const { api, middlewares } = getEndpoints(ctx, options);
	const basePath = new URL(ctx.baseURL).pathname;
	return createRouter$1(api, {
		routerContext: ctx,
		openapi: { disabled: true },
		basePath,
		routerMiddleware: [{
			path: "/**",
			middleware: originCheckMiddleware
		}, ...middlewares],
		allowedMediaTypes: ["application/json"],
		skipTrailingSlashes: options.advanced?.skipTrailingSlashes ?? false,
		async onRequest(req) {
			const disabledPaths = ctx.options.disabledPaths || [];
			const normalizedPath = normalizePathname(req.url, basePath);
			if (disabledPaths.includes(normalizedPath)) return new Response("Not Found", { status: 404 });
			let currentRequest = req;
			for (const plugin of ctx.options.plugins || []) if (plugin.onRequest) {
				const response = await plugin.onRequest(currentRequest, ctx);
				if (response && "response" in response) return response.response;
				if (response && "request" in response) currentRequest = response.request;
			}
			const rateLimitResponse = await onRequestRateLimit(currentRequest, ctx);
			if (rateLimitResponse) return rateLimitResponse;
			return currentRequest;
		},
		async onResponse(res) {
			for (const plugin of ctx.options.plugins || []) if (plugin.onResponse) {
				const response = await plugin.onResponse(res, ctx);
				if (response) return response.response;
			}
			return res;
		},
		onError(e) {
			if (isAPIError(e) && e.status === "FOUND") return;
			if (options.onAPIError?.throw) throw e;
			if (options.onAPIError?.onError) {
				options.onAPIError.onError(e, ctx);
				return;
			}
			const optLogLevel = options.logger?.level;
			const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
			if (options.logger?.disabled !== true) {
				if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
					if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
						ctx.logger?.error(e.message);
						return;
					}
				}
				if (isAPIError(e)) {
					if (e.status === "INTERNAL_SERVER_ERROR") ctx.logger.error(e.status, e);
					log?.error(e.message);
				} else ctx.logger?.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
			}
		}
	});
};
var createBetterAuth = (options, initFn) => {
	const authContext = initFn(options);
	const { api } = getEndpoints(authContext, options);
	return {
		handler: async (request) => {
			const ctx = await authContext;
			const basePath = ctx.options.basePath || "/api/auth";
			if (!ctx.options.baseURL) {
				const baseURL = getBaseURL(void 0, basePath, request, void 0, ctx.options.advanced?.trustedProxyHeaders);
				if (baseURL) {
					ctx.baseURL = baseURL;
					ctx.options.baseURL = getOrigin(ctx.baseURL) || void 0;
				} else throw new BetterAuthError("Could not get base URL from request. Please provide a valid base URL.");
			}
			ctx.trustedOrigins = await getTrustedOrigins(ctx.options, request);
			const { handler } = router(ctx, options);
			return runWithAdapter(ctx.adapter, () => handler(request));
		},
		api,
		options,
		$context: authContext,
		$ERROR_CODES: {
			...options.plugins?.reduce((acc, plugin) => {
				if (plugin.$ERROR_CODES) return {
					...acc,
					...plugin.$ERROR_CODES
				};
				return acc;
			}, {}),
			...BASE_ERROR_CODES
		}
	};
};
async function getBaseAdapter(options, handleDirectDatabase) {
	let adapter;
	if (!options.database) {
		const tables = getAuthTables(options);
		const memoryDB = Object.keys(tables).reduce((acc, key) => {
			acc[key] = [];
			return acc;
		}, {});
		const { memoryAdapter } = await import("./dist-BadHIoVW.mjs");
		adapter = memoryAdapter(memoryDB)(options);
	} else if (typeof options.database === "function") adapter = options.database(options);
	else adapter = await handleDirectDatabase(options);
	if (!adapter.transaction) {
		logger.warn("Adapter does not correctly implement transaction function, patching it automatically. Please update your adapter implementation.");
		adapter.transaction = async (cb) => {
			return cb(adapter);
		};
	}
	return adapter;
}
var DEFAULT_SECRET = "better-auth-secret-12345678901234567890";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
	for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	if (__getOwnPropSymbols) {
		for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	}
	return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var BetterFetchError = class extends Error {
	constructor(status, statusText, error) {
		super(statusText || status.toString(), { cause: error });
		this.status = status;
		this.statusText = statusText;
		this.error = error;
		Error.captureStackTrace(this, this.constructor);
	}
};
var initializePlugins = async (url, options) => {
	var _a, _b, _c, _d, _e, _f;
	let opts = options || {};
	const hooks = {
		onRequest: [options == null ? void 0 : options.onRequest],
		onResponse: [options == null ? void 0 : options.onResponse],
		onSuccess: [options == null ? void 0 : options.onSuccess],
		onError: [options == null ? void 0 : options.onError],
		onRetry: [options == null ? void 0 : options.onRetry]
	};
	if (!options || !(options == null ? void 0 : options.plugins)) return {
		url,
		options: opts,
		hooks
	};
	for (const plugin of (options == null ? void 0 : options.plugins) || []) {
		if (plugin.init) {
			const pluginRes = await ((_a = plugin.init) == null ? void 0 : _a.call(plugin, url.toString(), options));
			opts = pluginRes.options || opts;
			url = pluginRes.url;
		}
		hooks.onRequest.push((_b = plugin.hooks) == null ? void 0 : _b.onRequest);
		hooks.onResponse.push((_c = plugin.hooks) == null ? void 0 : _c.onResponse);
		hooks.onSuccess.push((_d = plugin.hooks) == null ? void 0 : _d.onSuccess);
		hooks.onError.push((_e = plugin.hooks) == null ? void 0 : _e.onError);
		hooks.onRetry.push((_f = plugin.hooks) == null ? void 0 : _f.onRetry);
	}
	return {
		url,
		options: opts,
		hooks
	};
};
var LinearRetryStrategy = class {
	constructor(options) {
		this.options = options;
	}
	shouldAttemptRetry(attempt, response) {
		if (this.options.shouldRetry) return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
		return Promise.resolve(attempt < this.options.attempts);
	}
	getDelay() {
		return this.options.delay;
	}
};
var ExponentialRetryStrategy = class {
	constructor(options) {
		this.options = options;
	}
	shouldAttemptRetry(attempt, response) {
		if (this.options.shouldRetry) return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
		return Promise.resolve(attempt < this.options.attempts);
	}
	getDelay(attempt) {
		return Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** attempt);
	}
};
function createRetryStrategy(options) {
	if (typeof options === "number") return new LinearRetryStrategy({
		type: "linear",
		attempts: options,
		delay: 1e3
	});
	switch (options.type) {
		case "linear": return new LinearRetryStrategy(options);
		case "exponential": return new ExponentialRetryStrategy(options);
		default: throw new Error("Invalid retry strategy");
	}
}
var getAuthHeader = async (options) => {
	const headers = {};
	const getValue = async (value) => typeof value === "function" ? await value() : value;
	if (options == null ? void 0 : options.auth) {
		if (options.auth.type === "Bearer") {
			const token = await getValue(options.auth.token);
			if (!token) return headers;
			headers["authorization"] = `Bearer ${token}`;
		} else if (options.auth.type === "Basic") {
			const [username, password] = await Promise.all([getValue(options.auth.username), getValue(options.auth.password)]);
			if (!username || !password) return headers;
			headers["authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
		} else if (options.auth.type === "Custom") {
			const [prefix, value] = await Promise.all([getValue(options.auth.prefix), getValue(options.auth.value)]);
			if (!value) return headers;
			headers["authorization"] = `${prefix != null ? prefix : ""} ${value}`;
		}
	}
	return headers;
};
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(request) {
	const _contentType = request.headers.get("content-type");
	const textTypes = /* @__PURE__ */ new Set([
		"image/svg",
		"application/xml",
		"application/xhtml",
		"application/html"
	]);
	if (!_contentType) return "json";
	const contentType = _contentType.split(";").shift() || "";
	if (JSON_RE.test(contentType)) return "json";
	if (textTypes.has(contentType) || contentType.startsWith("text/")) return "text";
	return "blob";
}
function isJSONParsable(value) {
	try {
		JSON.parse(value);
		return true;
	} catch (error) {
		return false;
	}
}
function isJSONSerializable(value) {
	if (value === void 0) return false;
	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
	if (t !== "object") return false;
	if (Array.isArray(value)) return true;
	if (value.buffer) return false;
	return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function jsonParse(text) {
	try {
		return JSON.parse(text);
	} catch (error) {
		return text;
	}
}
function isFunction(value) {
	return typeof value === "function";
}
function getFetch(options) {
	if (options == null ? void 0 : options.customFetchImpl) return options.customFetchImpl;
	if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) return globalThis.fetch;
	if (typeof window !== "undefined" && isFunction(window.fetch)) return window.fetch;
	throw new Error("No fetch implementation found");
}
async function getHeaders(opts) {
	const headers = new Headers(opts == null ? void 0 : opts.headers);
	const authHeader = await getAuthHeader(opts);
	for (const [key, value] of Object.entries(authHeader || {})) headers.set(key, value);
	if (!headers.has("content-type")) {
		const t = detectContentType(opts == null ? void 0 : opts.body);
		if (t) headers.set("content-type", t);
	}
	return headers;
}
function detectContentType(body) {
	if (isJSONSerializable(body)) return "application/json";
	return null;
}
function getBody(options) {
	if (!(options == null ? void 0 : options.body)) return null;
	const headers = new Headers(options == null ? void 0 : options.headers);
	if (isJSONSerializable(options.body) && !headers.has("content-type")) {
		for (const [key, value] of Object.entries(options == null ? void 0 : options.body)) if (value instanceof Date) options.body[key] = value.toISOString();
		return JSON.stringify(options.body);
	}
	if (headers.has("content-type") && headers.get("content-type") === "application/x-www-form-urlencoded") {
		if (isJSONSerializable(options.body)) return new URLSearchParams(options.body).toString();
		return options.body;
	}
	return options.body;
}
function getMethod$1(url, options) {
	var _a;
	if (options == null ? void 0 : options.method) return options.method.toUpperCase();
	if (url.startsWith("@")) {
		const pMethod = (_a = url.split("@")[1]) == null ? void 0 : _a.split("/")[0];
		if (!methods.includes(pMethod)) return (options == null ? void 0 : options.body) ? "POST" : "GET";
		return pMethod.toUpperCase();
	}
	return (options == null ? void 0 : options.body) ? "POST" : "GET";
}
function getTimeout(options, controller) {
	let abortTimeout;
	if (!(options == null ? void 0 : options.signal) && (options == null ? void 0 : options.timeout)) abortTimeout = setTimeout(() => controller == null ? void 0 : controller.abort(), options == null ? void 0 : options.timeout);
	return {
		abortTimeout,
		clearTimeout: () => {
			if (abortTimeout) clearTimeout(abortTimeout);
		}
	};
}
var ValidationError = class _ValidationError extends Error {
	constructor(issues, message) {
		super(message || JSON.stringify(issues, null, 2));
		this.issues = issues;
		Object.setPrototypeOf(this, _ValidationError.prototype);
	}
};
async function parseStandardSchema(schema, input) {
	const result = await schema["~standard"].validate(input);
	if (result.issues) throw new ValidationError(result.issues);
	return result.value;
}
var methods = [
	"get",
	"post",
	"put",
	"patch",
	"delete"
];
var applySchemaPlugin = (config) => ({
	id: "apply-schema",
	name: "Apply Schema",
	version: "1.0.0",
	async init(url, options) {
		var _a, _b, _c, _d;
		const schema = ((_b = (_a = config.plugins) == null ? void 0 : _a.find((plugin) => {
			var _a2;
			return ((_a2 = plugin.schema) == null ? void 0 : _a2.config) ? url.startsWith(plugin.schema.config.baseURL || "") || url.startsWith(plugin.schema.config.prefix || "") : false;
		})) == null ? void 0 : _b.schema) || config.schema;
		if (schema) {
			let urlKey = url;
			if ((_c = schema.config) == null ? void 0 : _c.prefix) {
				if (urlKey.startsWith(schema.config.prefix)) {
					urlKey = urlKey.replace(schema.config.prefix, "");
					if (schema.config.baseURL) url = url.replace(schema.config.prefix, schema.config.baseURL);
				}
			}
			if ((_d = schema.config) == null ? void 0 : _d.baseURL) {
				if (urlKey.startsWith(schema.config.baseURL)) urlKey = urlKey.replace(schema.config.baseURL, "");
			}
			const keySchema = schema.schema[urlKey];
			if (keySchema) {
				let opts = __spreadProps(__spreadValues({}, options), {
					method: keySchema.method,
					output: keySchema.output
				});
				if (!(options == null ? void 0 : options.disableValidation)) opts = __spreadProps(__spreadValues({}, opts), {
					body: keySchema.input ? await parseStandardSchema(keySchema.input, options == null ? void 0 : options.body) : options == null ? void 0 : options.body,
					params: keySchema.params ? await parseStandardSchema(keySchema.params, options == null ? void 0 : options.params) : options == null ? void 0 : options.params,
					query: keySchema.query ? await parseStandardSchema(keySchema.query, options == null ? void 0 : options.query) : options == null ? void 0 : options.query
				});
				return {
					url,
					options: opts
				};
			}
		}
		return {
			url,
			options
		};
	}
});
var createFetch = (config) => {
	async function $fetch(url, options) {
		const opts = __spreadProps(__spreadValues(__spreadValues({}, config), options), { plugins: [
			...(config == null ? void 0 : config.plugins) || [],
			applySchemaPlugin(config || {}),
			...(options == null ? void 0 : options.plugins) || []
		] });
		if (config == null ? void 0 : config.catchAllError) try {
			return await betterFetch(url, opts);
		} catch (error) {
			return {
				data: null,
				error: {
					status: 500,
					statusText: "Fetch Error",
					message: "Fetch related error. Captured by catchAllError option. See error property for more details.",
					error
				}
			};
		}
		return await betterFetch(url, opts);
	}
	return $fetch;
};
function getURL2(url, option) {
	const { baseURL, params, query } = option || {
		query: {},
		params: {},
		baseURL: ""
	};
	let basePath = url.startsWith("http") ? url.split("/").slice(0, 3).join("/") : baseURL || "";
	if (url.startsWith("@")) {
		const m = url.toString().split("@")[1].split("/")[0];
		if (methods.includes(m)) url = url.replace(`@${m}/`, "/");
	}
	if (!basePath.endsWith("/")) basePath += "/";
	let [path, urlQuery] = url.replace(basePath, "").split("?");
	const queryParams = new URLSearchParams(urlQuery);
	for (const [key, value] of Object.entries(query || {})) {
		if (value == null) continue;
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else if (Array.isArray(value)) {
			for (const val of value) queryParams.append(key, val);
			continue;
		} else serializedValue = JSON.stringify(value);
		queryParams.set(key, serializedValue);
	}
	if (params) if (Array.isArray(params)) {
		const paramPaths = path.split("/").filter((p) => p.startsWith(":"));
		for (const [index, key] of paramPaths.entries()) {
			const value = params[index];
			path = path.replace(key, value);
		}
	} else for (const [key, value] of Object.entries(params)) path = path.replace(`:${key}`, String(value));
	path = path.split("/").map(encodeURIComponent).join("/");
	if (path.startsWith("/")) path = path.slice(1);
	let queryParamString = queryParams.toString();
	queryParamString = queryParamString.length > 0 ? `?${queryParamString}`.replace(/\+/g, "%20") : "";
	if (!basePath.startsWith("http")) return `${basePath}${path}${queryParamString}`;
	return new URL(`${path}${queryParamString}`, basePath);
}
var betterFetch = async (url, options) => {
	var _a, _b, _c, _d, _e, _f, _g, _h;
	const { hooks, url: __url, options: opts } = await initializePlugins(url, options);
	const fetch = getFetch(opts);
	const controller = new AbortController();
	const signal = (_a = opts.signal) != null ? _a : controller.signal;
	const _url = getURL2(__url, opts);
	const body = getBody(opts);
	const headers = await getHeaders(opts);
	const method = getMethod$1(__url, opts);
	let context = __spreadProps(__spreadValues({}, opts), {
		url: _url,
		headers,
		body,
		method,
		signal
	});
	for (const onRequest of hooks.onRequest) if (onRequest) {
		const res = await onRequest(context);
		if (typeof res === "object" && res !== null) context = res;
	}
	if ("pipeTo" in context && typeof context.pipeTo === "function" || typeof ((_b = options == null ? void 0 : options.body) == null ? void 0 : _b.pipe) === "function") {
		if (!("duplex" in context)) context.duplex = "half";
	}
	const { clearTimeout: clearTimeout2 } = getTimeout(opts, controller);
	let response = await fetch(context.url, context);
	clearTimeout2();
	const responseContext = {
		response,
		request: context
	};
	for (const onResponse of hooks.onResponse) if (onResponse) {
		const r = await onResponse(__spreadProps(__spreadValues({}, responseContext), { response: ((_c = options == null ? void 0 : options.hookOptions) == null ? void 0 : _c.cloneResponse) ? response.clone() : response }));
		if (r instanceof Response) response = r;
		else if (typeof r === "object" && r !== null) response = r.response;
	}
	if (response.ok) {
		if (!(context.method !== "HEAD")) return {
			data: "",
			error: null
		};
		const responseType = detectResponseType(response);
		const successContext = {
			data: null,
			response,
			request: context
		};
		if (responseType === "json" || responseType === "text") {
			const text = await response.text();
			successContext.data = await ((_d = context.jsonParser) != null ? _d : jsonParse)(text);
		} else successContext.data = await response[responseType]();
		if (context == null ? void 0 : context.output) {
			if (context.output && !context.disableValidation) successContext.data = await parseStandardSchema(context.output, successContext.data);
		}
		for (const onSuccess of hooks.onSuccess) if (onSuccess) await onSuccess(__spreadProps(__spreadValues({}, successContext), { response: ((_e = options == null ? void 0 : options.hookOptions) == null ? void 0 : _e.cloneResponse) ? response.clone() : response }));
		if (options == null ? void 0 : options.throw) return successContext.data;
		return {
			data: successContext.data,
			error: null
		};
	}
	const parser = (_f = options == null ? void 0 : options.jsonParser) != null ? _f : jsonParse;
	const responseText = await response.text();
	const isJSONResponse = isJSONParsable(responseText);
	const errorObject = isJSONResponse ? await parser(responseText) : null;
	const errorContext = {
		response,
		responseText,
		request: context,
		error: __spreadProps(__spreadValues({}, errorObject), {
			status: response.status,
			statusText: response.statusText
		})
	};
	for (const onError of hooks.onError) if (onError) await onError(__spreadProps(__spreadValues({}, errorContext), { response: ((_g = options == null ? void 0 : options.hookOptions) == null ? void 0 : _g.cloneResponse) ? response.clone() : response }));
	if (options == null ? void 0 : options.retry) {
		const retryStrategy = createRetryStrategy(options.retry);
		const _retryAttempt = (_h = options.retryAttempt) != null ? _h : 0;
		if (await retryStrategy.shouldAttemptRetry(_retryAttempt, response)) {
			for (const onRetry of hooks.onRetry) if (onRetry) await onRetry(responseContext);
			const delay = retryStrategy.getDelay(_retryAttempt);
			await new Promise((resolve) => setTimeout(resolve, delay));
			return await betterFetch(url, __spreadProps(__spreadValues({}, options), { retryAttempt: _retryAttempt + 1 }));
		}
	}
	if (options == null ? void 0 : options.throw) throw new BetterFetchError(response.status, response.statusText, isJSONResponse ? errorObject : responseText);
	return {
		data: null,
		error: __spreadProps(__spreadValues({}, errorObject), {
			status: response.status,
			statusText: response.statusText
		})
	};
};
async function getTelemetryAuthConfig(options, context) {
	return {
		database: context?.database,
		adapter: context?.adapter,
		emailVerification: {
			sendVerificationEmail: !!options.emailVerification?.sendVerificationEmail,
			sendOnSignUp: !!options.emailVerification?.sendOnSignUp,
			sendOnSignIn: !!options.emailVerification?.sendOnSignIn,
			autoSignInAfterVerification: !!options.emailVerification?.autoSignInAfterVerification,
			expiresIn: options.emailVerification?.expiresIn,
			beforeEmailVerification: !!options.emailVerification?.beforeEmailVerification,
			afterEmailVerification: !!options.emailVerification?.afterEmailVerification
		},
		emailAndPassword: {
			enabled: !!options.emailAndPassword?.enabled,
			disableSignUp: !!options.emailAndPassword?.disableSignUp,
			requireEmailVerification: !!options.emailAndPassword?.requireEmailVerification,
			maxPasswordLength: options.emailAndPassword?.maxPasswordLength,
			minPasswordLength: options.emailAndPassword?.minPasswordLength,
			sendResetPassword: !!options.emailAndPassword?.sendResetPassword,
			resetPasswordTokenExpiresIn: options.emailAndPassword?.resetPasswordTokenExpiresIn,
			onPasswordReset: !!options.emailAndPassword?.onPasswordReset,
			password: {
				hash: !!options.emailAndPassword?.password?.hash,
				verify: !!options.emailAndPassword?.password?.verify
			},
			autoSignIn: !!options.emailAndPassword?.autoSignIn,
			revokeSessionsOnPasswordReset: !!options.emailAndPassword?.revokeSessionsOnPasswordReset
		},
		socialProviders: await Promise.all(Object.keys(options.socialProviders || {}).map(async (key) => {
			const p = options.socialProviders?.[key];
			if (!p) return {};
			const provider = typeof p === "function" ? await p() : p;
			return {
				id: key,
				mapProfileToUser: !!provider.mapProfileToUser,
				disableDefaultScope: !!provider.disableDefaultScope,
				disableIdTokenSignIn: !!provider.disableIdTokenSignIn,
				disableImplicitSignUp: provider.disableImplicitSignUp,
				disableSignUp: provider.disableSignUp,
				getUserInfo: !!provider.getUserInfo,
				overrideUserInfoOnSignIn: !!provider.overrideUserInfoOnSignIn,
				prompt: provider.prompt,
				verifyIdToken: !!provider.verifyIdToken,
				scope: provider.scope,
				refreshAccessToken: !!provider.refreshAccessToken
			};
		})),
		plugins: options.plugins?.map((p) => p.id.toString()),
		user: {
			modelName: options.user?.modelName,
			fields: options.user?.fields,
			additionalFields: options.user?.additionalFields,
			changeEmail: {
				enabled: options.user?.changeEmail?.enabled,
				sendChangeEmailConfirmation: !!options.user?.changeEmail?.sendChangeEmailConfirmation
			}
		},
		verification: {
			modelName: options.verification?.modelName,
			disableCleanup: options.verification?.disableCleanup,
			fields: options.verification?.fields
		},
		session: {
			modelName: options.session?.modelName,
			additionalFields: options.session?.additionalFields,
			cookieCache: {
				enabled: options.session?.cookieCache?.enabled,
				maxAge: options.session?.cookieCache?.maxAge,
				strategy: options.session?.cookieCache?.strategy
			},
			disableSessionRefresh: options.session?.disableSessionRefresh,
			expiresIn: options.session?.expiresIn,
			fields: options.session?.fields,
			freshAge: options.session?.freshAge,
			preserveSessionInDatabase: options.session?.preserveSessionInDatabase,
			storeSessionInDatabase: options.session?.storeSessionInDatabase,
			updateAge: options.session?.updateAge
		},
		account: {
			modelName: options.account?.modelName,
			fields: options.account?.fields,
			encryptOAuthTokens: options.account?.encryptOAuthTokens,
			updateAccountOnSignIn: options.account?.updateAccountOnSignIn,
			accountLinking: {
				enabled: options.account?.accountLinking?.enabled,
				trustedProviders: options.account?.accountLinking?.trustedProviders,
				updateUserInfoOnLink: options.account?.accountLinking?.updateUserInfoOnLink,
				allowUnlinkingAll: options.account?.accountLinking?.allowUnlinkingAll
			}
		},
		hooks: {
			after: !!options.hooks?.after,
			before: !!options.hooks?.before
		},
		secondaryStorage: !!options.secondaryStorage,
		advanced: {
			cookiePrefix: !!options.advanced?.cookiePrefix,
			cookies: !!options.advanced?.cookies,
			crossSubDomainCookies: {
				domain: !!options.advanced?.crossSubDomainCookies?.domain,
				enabled: options.advanced?.crossSubDomainCookies?.enabled,
				additionalCookies: options.advanced?.crossSubDomainCookies?.additionalCookies
			},
			database: {
				generateId: options.advanced?.database?.generateId,
				defaultFindManyLimit: options.advanced?.database?.defaultFindManyLimit
			},
			useSecureCookies: options.advanced?.useSecureCookies,
			ipAddress: {
				disableIpTracking: options.advanced?.ipAddress?.disableIpTracking,
				ipAddressHeaders: options.advanced?.ipAddress?.ipAddressHeaders
			},
			disableCSRFCheck: options.advanced?.disableCSRFCheck,
			cookieAttributes: {
				expires: options.advanced?.defaultCookieAttributes?.expires,
				secure: options.advanced?.defaultCookieAttributes?.secure,
				sameSite: options.advanced?.defaultCookieAttributes?.sameSite,
				domain: !!options.advanced?.defaultCookieAttributes?.domain,
				path: options.advanced?.defaultCookieAttributes?.path,
				httpOnly: options.advanced?.defaultCookieAttributes?.httpOnly
			}
		},
		trustedOrigins: options.trustedOrigins?.length,
		rateLimit: {
			storage: options.rateLimit?.storage,
			modelName: options.rateLimit?.modelName,
			window: options.rateLimit?.window,
			customStorage: !!options.rateLimit?.customStorage,
			enabled: options.rateLimit?.enabled,
			max: options.rateLimit?.max
		},
		onAPIError: {
			errorURL: options.onAPIError?.errorURL,
			onError: !!options.onAPIError?.onError,
			throw: options.onAPIError?.throw
		},
		logger: {
			disabled: options.logger?.disabled,
			level: options.logger?.level,
			log: !!options.logger?.log
		},
		databaseHooks: {
			user: {
				create: {
					after: !!options.databaseHooks?.user?.create?.after,
					before: !!options.databaseHooks?.user?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.user?.update?.after,
					before: !!options.databaseHooks?.user?.update?.before
				}
			},
			session: {
				create: {
					after: !!options.databaseHooks?.session?.create?.after,
					before: !!options.databaseHooks?.session?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.session?.update?.after,
					before: !!options.databaseHooks?.session?.update?.before
				}
			},
			account: {
				create: {
					after: !!options.databaseHooks?.account?.create?.after,
					before: !!options.databaseHooks?.account?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.account?.update?.after,
					before: !!options.databaseHooks?.account?.update?.before
				}
			},
			verification: {
				create: {
					after: !!options.databaseHooks?.verification?.create?.after,
					before: !!options.databaseHooks?.verification?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.verification?.update?.after,
					before: !!options.databaseHooks?.verification?.update?.before
				}
			}
		}
	};
}
var packageJSONCache;
async function readRootPackageJson() {
	if (packageJSONCache) return packageJSONCache;
	try {
		const cwd = typeof process !== "undefined" && typeof process.cwd === "function" ? process.cwd() : "";
		if (!cwd) return void 0;
		const importRuntime = (m) => Function("mm", "return import(mm)")(m);
		const [{ default: fs }, { default: path }] = await Promise.all([importRuntime("fs/promises"), importRuntime("path")]);
		const raw = await fs.readFile(path.join(cwd, "package.json"), "utf-8");
		packageJSONCache = JSON.parse(raw);
		return packageJSONCache;
	} catch {}
}
async function getPackageVersion(pkg) {
	if (packageJSONCache) return packageJSONCache.dependencies?.[pkg] || packageJSONCache.devDependencies?.[pkg] || packageJSONCache.peerDependencies?.[pkg];
	try {
		const cwd = typeof process !== "undefined" && typeof process.cwd === "function" ? process.cwd() : "";
		if (!cwd) throw new Error("no-cwd");
		const importRuntime = (m) => Function("mm", "return import(mm)")(m);
		const [{ default: fs }, { default: path }] = await Promise.all([importRuntime("fs/promises"), importRuntime("path")]);
		const pkgJsonPath = path.join(cwd, "node_modules", pkg, "package.json");
		const raw = await fs.readFile(pkgJsonPath, "utf-8");
		return JSON.parse(raw).version || await getVersionFromLocalPackageJson(pkg) || void 0;
	} catch {}
	return await getVersionFromLocalPackageJson(pkg);
}
async function getVersionFromLocalPackageJson(pkg) {
	const json = await readRootPackageJson();
	if (!json) return void 0;
	return {
		...json.dependencies,
		...json.devDependencies,
		...json.peerDependencies
	}[pkg];
}
async function getNameFromLocalPackageJson() {
	return (await readRootPackageJson())?.name;
}
var DATABASES = {
	pg: "postgresql",
	mysql: "mysql",
	mariadb: "mariadb",
	sqlite3: "sqlite",
	"better-sqlite3": "sqlite",
	"@prisma/client": "prisma",
	mongoose: "mongodb",
	mongodb: "mongodb",
	"drizzle-orm": "drizzle"
};
async function detectDatabase() {
	for (const [pkg, name] of Object.entries(DATABASES)) {
		const version = await getPackageVersion(pkg);
		if (version) return {
			name,
			version
		};
	}
}
var FRAMEWORKS = {
	next: "next",
	nuxt: "nuxt",
	"react-router": "react-router",
	astro: "astro",
	"@sveltejs/kit": "sveltekit",
	"solid-start": "solid-start",
	"tanstack-start": "tanstack-start",
	hono: "hono",
	express: "express",
	elysia: "elysia",
	expo: "expo"
};
async function detectFramework() {
	for (const [pkg, name] of Object.entries(FRAMEWORKS)) {
		const version = await getPackageVersion(pkg);
		if (version) return {
			name,
			version
		};
	}
}
function detectPackageManager() {
	const userAgent = env.npm_config_user_agent;
	if (!userAgent) return;
	const pmSpec = userAgent.split(" ")[0];
	const separatorPos = pmSpec.lastIndexOf("/");
	const name = pmSpec.substring(0, separatorPos);
	return {
		name: name === "npminstall" ? "cnpm" : name,
		version: pmSpec.substring(separatorPos + 1)
	};
}
var importRuntime = (m) => {
	return Function("mm", "return import(mm)")(m);
};
function getVendor() {
	const hasAny = (...keys) => keys.some((k) => Boolean(env[k]));
	if (hasAny("CF_PAGES", "CF_PAGES_URL", "CF_ACCOUNT_ID") || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") return "cloudflare";
	if (hasAny("VERCEL", "VERCEL_URL", "VERCEL_ENV")) return "vercel";
	if (hasAny("NETLIFY", "NETLIFY_URL")) return "netlify";
	if (hasAny("RENDER", "RENDER_URL", "RENDER_INTERNAL_HOSTNAME", "RENDER_SERVICE_ID")) return "render";
	if (hasAny("AWS_LAMBDA_FUNCTION_NAME", "AWS_EXECUTION_ENV", "LAMBDA_TASK_ROOT")) return "aws";
	if (hasAny("GOOGLE_CLOUD_FUNCTION_NAME", "GOOGLE_CLOUD_PROJECT", "GCP_PROJECT", "K_SERVICE")) return "gcp";
	if (hasAny("AZURE_FUNCTION_NAME", "FUNCTIONS_WORKER_RUNTIME", "WEBSITE_INSTANCE_ID", "WEBSITE_SITE_NAME")) return "azure";
	if (hasAny("DENO_DEPLOYMENT_ID", "DENO_REGION")) return "deno-deploy";
	if (hasAny("FLY_APP_NAME", "FLY_REGION", "FLY_ALLOC_ID")) return "fly-io";
	if (hasAny("RAILWAY_STATIC_URL", "RAILWAY_ENVIRONMENT_NAME")) return "railway";
	if (hasAny("DYNO", "HEROKU_APP_NAME")) return "heroku";
	if (hasAny("DO_DEPLOYMENT_ID", "DO_APP_NAME", "DIGITALOCEAN")) return "digitalocean";
	if (hasAny("KOYEB", "KOYEB_DEPLOYMENT_ID", "KOYEB_APP_NAME")) return "koyeb";
	return null;
}
async function detectSystemInfo() {
	try {
		if (getVendor() === "cloudflare") return "cloudflare";
		const os = await importRuntime("os");
		const cpus = os.cpus();
		return {
			deploymentVendor: getVendor(),
			systemPlatform: os.platform(),
			systemRelease: os.release(),
			systemArchitecture: os.arch(),
			cpuCount: cpus.length,
			cpuModel: cpus.length ? cpus[0].model : null,
			cpuSpeed: cpus.length ? cpus[0].speed : null,
			memory: os.totalmem(),
			isWSL: await isWsl(),
			isDocker: await isDocker(),
			isTTY: typeof process !== "undefined" && process.stdout ? process.stdout.isTTY : null
		};
	} catch {
		return {
			systemPlatform: null,
			systemRelease: null,
			systemArchitecture: null,
			cpuCount: null,
			cpuModel: null,
			cpuSpeed: null,
			memory: null,
			isWSL: null,
			isDocker: null,
			isTTY: null
		};
	}
}
var isDockerCached;
async function hasDockerEnv() {
	if (getVendor() === "cloudflare") return false;
	try {
		(await importRuntime("fs")).statSync("/.dockerenv");
		return true;
	} catch {
		return false;
	}
}
async function hasDockerCGroup() {
	if (getVendor() === "cloudflare") return false;
	try {
		return (await importRuntime("fs")).readFileSync("/proc/self/cgroup", "utf8").includes("docker");
	} catch {
		return false;
	}
}
async function isDocker() {
	if (getVendor() === "cloudflare") return false;
	if (isDockerCached === void 0) isDockerCached = await hasDockerEnv() || await hasDockerCGroup();
	return isDockerCached;
}
async function isWsl() {
	try {
		if (getVendor() === "cloudflare") return false;
		if (typeof process === "undefined" || process?.platform !== "linux") return false;
		const fs = await importRuntime("fs");
		if ((await importRuntime("os")).release().toLowerCase().includes("microsoft")) {
			if (await isInsideContainer()) return false;
			return true;
		}
		return fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !await isInsideContainer() : false;
	} catch {
		return false;
	}
}
var isInsideContainerCached;
var hasContainerEnv = async () => {
	if (getVendor() === "cloudflare") return false;
	try {
		(await importRuntime("fs")).statSync("/run/.containerenv");
		return true;
	} catch {
		return false;
	}
};
async function isInsideContainer() {
	if (isInsideContainerCached === void 0) isInsideContainerCached = await hasContainerEnv() || await isDocker();
	return isInsideContainerCached;
}
function isCI() {
	return env.CI !== "false" && ("BUILD_ID" in env || "BUILD_NUMBER" in env || "CI" in env || "CI_APP_ID" in env || "CI_BUILD_ID" in env || "CI_BUILD_NUMBER" in env || "CI_NAME" in env || "CONTINUOUS_INTEGRATION" in env || "RUN_ID" in env);
}
function detectRuntime() {
	if (typeof Deno !== "undefined") return {
		name: "deno",
		version: Deno?.version?.deno ?? null
	};
	if (typeof Bun !== "undefined") return {
		name: "bun",
		version: Bun?.version ?? null
	};
	if (typeof process !== "undefined" && process?.versions?.node) return {
		name: "node",
		version: process.versions.node ?? null
	};
	return {
		name: "edge",
		version: null
	};
}
function detectEnvironment() {
	return getEnvVar("NODE_ENV") === "production" ? "production" : isCI() ? "ci" : isTest() ? "test" : "development";
}
async function hashToBase64(data) {
	const buffer = await createHash("SHA-256").digest(data);
	return base64.encode(buffer);
}
var generateId$1 = (size) => {
	return createRandomStringGenerator("a-z", "A-Z", "0-9")(size || 32);
};
var projectIdCached = null;
async function getProjectId(baseUrl) {
	if (projectIdCached) return projectIdCached;
	const projectName = await getNameFromLocalPackageJson();
	if (projectName) {
		projectIdCached = await hashToBase64(baseUrl ? baseUrl + projectName : projectName);
		return projectIdCached;
	}
	if (baseUrl) {
		projectIdCached = await hashToBase64(baseUrl);
		return projectIdCached;
	}
	projectIdCached = generateId$1(32);
	return projectIdCached;
}
var noop = async function noop() {};
async function createTelemetry(options, context) {
	const debugEnabled = options.telemetry?.debug || getBooleanEnvVar("BETTER_AUTH_TELEMETRY_DEBUG", false);
	const telemetryEndpoint = ENV.BETTER_AUTH_TELEMETRY_ENDPOINT;
	if (!telemetryEndpoint && !context?.customTrack) return { publish: noop };
	const track = async (event) => {
		if (context?.customTrack) await context.customTrack(event).catch(logger.error);
		else if (telemetryEndpoint) if (debugEnabled) logger.info("telemetry event", JSON.stringify(event, null, 2));
		else await betterFetch(telemetryEndpoint, {
			method: "POST",
			body: event
		}).catch(logger.error);
	};
	const isEnabled = async () => {
		const telemetryEnabled = options.telemetry?.enabled !== void 0 ? options.telemetry.enabled : false;
		return (getBooleanEnvVar("BETTER_AUTH_TELEMETRY", false) || telemetryEnabled) && (context?.skipTestCheck || !isTest());
	};
	const enabled = await isEnabled();
	let anonymousId;
	if (enabled) {
		anonymousId = await getProjectId(options.baseURL);
		track({
			type: "init",
			payload: {
				config: await getTelemetryAuthConfig(options, context),
				runtime: detectRuntime(),
				database: await detectDatabase(),
				framework: await detectFramework(),
				environment: detectEnvironment(),
				systemInfo: await detectSystemInfo(),
				packageManager: detectPackageManager()
			},
			anonymousId
		});
	}
	return { publish: async (event) => {
		if (!enabled) return;
		if (!anonymousId) anonymousId = await getProjectId(options.baseURL);
		await track({
			type: event.type,
			payload: event.payload,
			anonymousId
		});
	} };
}
/**
* Estimates the entropy of a string in bits.
* This is a simple approximation that helps detect low-entropy secrets.
*/
function estimateEntropy(str) {
	const unique = new Set(str).size;
	if (unique === 0) return 0;
	return Math.log2(Math.pow(unique, str.length));
}
/**
* Validates that the secret meets minimum security requirements.
* Throws BetterAuthError if the secret is invalid.
* Skips validation for DEFAULT_SECRET in test environments only.
* Only throws for DEFAULT_SECRET in production environment.
*/
function validateSecret(secret, logger) {
	const isDefaultSecret = secret === DEFAULT_SECRET;
	if (isTest()) return;
	if (isDefaultSecret && isProduction) throw new BetterAuthError("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config.");
	if (!secret) throw new BetterAuthError("BETTER_AUTH_SECRET is missing. Set it in your environment or pass `secret` to betterAuth({ secret }).");
	if (secret.length < 32) logger.warn(`[better-auth] Warning: your BETTER_AUTH_SECRET should be at least 32 characters long for adequate security. Generate one with \`npx @better-auth/cli secret\` or \`openssl rand -base64 32\`.`);
	if (estimateEntropy(secret) < 120) logger.warn("[better-auth] Warning: your BETTER_AUTH_SECRET appears low-entropy. Use a randomly generated secret for production.");
}
async function createAuthContext(adapter, options, getDatabaseType) {
	if (!options.database) options = defu(options, {
		session: { cookieCache: {
			enabled: true,
			strategy: "jwe",
			refreshCache: true
		} },
		account: {
			storeStateStrategy: "cookie",
			storeAccountCookie: true
		}
	});
	const plugins = options.plugins || [];
	const internalPlugins = getInternalPlugins(options);
	const logger = createLogger(options.logger);
	const baseURL = getBaseURL(options.baseURL, options.basePath);
	if (!baseURL) logger.warn(`[better-auth] Base URL could not be determined. Please set a valid base URL using the baseURL config option or the BETTER_AUTH_URL environment variable. Without this, callbacks and redirects may not work correctly.`);
	if (adapter.id === "memory" && options.advanced?.database?.generateId === false) logger.error(`[better-auth] Misconfiguration detected.
You are using the memory DB with generateId: false.
This will cause no id to be generated for any model.
Most of the features of Better Auth will not work correctly.`);
	const secret = options.secret || env.BETTER_AUTH_SECRET || env.AUTH_SECRET || "better-auth-secret-12345678901234567890";
	validateSecret(secret, logger);
	options = {
		...options,
		secret,
		baseURL: baseURL ? new URL(baseURL).origin : "",
		basePath: options.basePath || "/api/auth",
		plugins: plugins.concat(internalPlugins)
	};
	checkEndpointConflicts(options, logger);
	const cookies = getCookies(options);
	const tables = getAuthTables(options);
	const providers = (await Promise.all(Object.entries(options.socialProviders || {}).map(async ([key, originalConfig]) => {
		const config = typeof originalConfig === "function" ? await originalConfig() : originalConfig;
		if (config == null) return null;
		if (config.enabled === false) return null;
		if (!config.clientId) logger.warn(`Social provider ${key} is missing clientId or clientSecret`);
		const provider = socialProviders[key](config);
		provider.disableImplicitSignUp = config.disableImplicitSignUp;
		return provider;
	}))).filter((x) => x !== null);
	const generateIdFunc = ({ model, size }) => {
		if (typeof options.advanced?.generateId === "function") return options.advanced.generateId({
			model,
			size
		});
		const dbGenerateId = options?.advanced?.database?.generateId;
		if (typeof dbGenerateId === "function") return dbGenerateId({
			model,
			size
		});
		if (dbGenerateId === "uuid") return crypto.randomUUID();
		if (dbGenerateId === "serial" || dbGenerateId === false) return false;
		return generateId(size);
	};
	const { publish } = await createTelemetry(options, {
		adapter: adapter.id,
		database: typeof options.database === "function" ? "adapter" : getDatabaseType(options.database)
	});
	const pluginIds = new Set(options.plugins.map((p) => p.id));
	const getPluginFn = (id) => options.plugins.find((p) => p.id === id) ?? null;
	const hasPluginFn = (id) => pluginIds.has(id);
	const trustedOrigins = await getTrustedOrigins(options);
	const ctx = {
		appName: options.appName || "Better Auth",
		baseURL: baseURL || "",
		version: getBetterAuthVersion(),
		socialProviders: providers,
		options,
		oauthConfig: {
			storeStateStrategy: options.account?.storeStateStrategy || (options.database ? "database" : "cookie"),
			skipStateCookieCheck: !!options.account?.skipStateCookieCheck
		},
		tables,
		trustedOrigins,
		isTrustedOrigin(url, settings) {
			return this.trustedOrigins.some((origin) => matchesOriginPattern(url, origin, settings));
		},
		sessionConfig: {
			updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 1440 * 60,
			expiresIn: options.session?.expiresIn || 3600 * 24 * 7,
			freshAge: options.session?.freshAge === void 0 ? 3600 * 24 : options.session.freshAge,
			cookieRefreshCache: (() => {
				const refreshCache = options.session?.cookieCache?.refreshCache;
				const maxAge = options.session?.cookieCache?.maxAge || 300;
				if ((!!options.database || !!options.secondaryStorage) && refreshCache) {
					logger.warn("[better-auth] `session.cookieCache.refreshCache` is enabled while `database` or `secondaryStorage` is configured. `refreshCache` is meant for stateless (DB-less) setups. Disabling `refreshCache` — remove it from your config to silence this warning.");
					return false;
				}
				if (refreshCache === false || refreshCache === void 0) return false;
				if (refreshCache === true) return {
					enabled: true,
					updateAge: Math.floor(maxAge * .2)
				};
				return {
					enabled: true,
					updateAge: refreshCache.updateAge !== void 0 ? refreshCache.updateAge : Math.floor(maxAge * .2)
				};
			})()
		},
		secret,
		rateLimit: {
			...options.rateLimit,
			enabled: options.rateLimit?.enabled ?? isProduction,
			window: options.rateLimit?.window || 10,
			max: options.rateLimit?.max || 100,
			storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
		},
		authCookies: cookies,
		logger,
		generateId: generateIdFunc,
		session: null,
		secondaryStorage: options.secondaryStorage,
		password: {
			hash: options.emailAndPassword?.password?.hash || hashPassword,
			verify: options.emailAndPassword?.password?.verify || verifyPassword$1,
			config: {
				minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
				maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
			},
			checkPassword
		},
		setNewSession(session) {
			this.newSession = session;
		},
		newSession: null,
		adapter,
		internalAdapter: createInternalAdapter(adapter, {
			options,
			logger,
			hooks: options.databaseHooks ? [options.databaseHooks] : [],
			generateId: generateIdFunc
		}),
		createAuthCookie: createCookieGetter(options),
		async runMigrations() {
			throw new BetterAuthError("runMigrations will be set by the specific init implementation");
		},
		publishTelemetry: publish,
		skipCSRFCheck: !!options.advanced?.disableCSRFCheck,
		skipOriginCheck: options.advanced?.disableOriginCheck !== void 0 ? options.advanced.disableOriginCheck : isTest() ? true : false,
		runInBackground: options.advanced?.backgroundTasks?.handler ?? ((p) => {
			p.catch(() => {});
		}),
		async runInBackgroundOrAwait(promise) {
			try {
				if (options.advanced?.backgroundTasks?.handler) {
					if (promise instanceof Promise) options.advanced.backgroundTasks.handler(promise.catch((e) => {
						logger.error("Failed to run background task:", e);
					}));
				} else await promise;
			} catch (e) {
				logger.error("Failed to run background task:", e);
			}
		},
		getPlugin: getPluginFn,
		hasPlugin: hasPluginFn
	};
	const initOrPromise = runPluginInit(ctx);
	if (isPromise(initOrPromise)) await initOrPromise;
	return ctx;
}
var initMinimal = async (options) => {
	const adapter = await getBaseAdapter(options, async () => {
		throw new BetterAuthError("Direct database connection requires Kysely. Please use `better-auth` instead of `better-auth/minimal`, or provide an adapter (drizzleAdapter, prismaAdapter, etc.)");
	});
	const getDatabaseType = (_database) => "unknown";
	const ctx = await createAuthContext(adapter, options, getDatabaseType);
	ctx.runMigrations = async function() {
		throw new BetterAuthError("Migrations are not supported in 'better-auth/minimal'. Please use 'better-auth' for migration support.");
	};
	return ctx;
};
/**
* Better Auth initializer for minimal mode (without Kysely)
*/
var betterAuth = (options) => {
	return createBetterAuth(options, initMinimal);
};
function role(statements) {
	return {
		authorize(request, connector = "AND") {
			let success = false;
			for (const [requestedResource, requestedActions] of Object.entries(request)) {
				const allowedActions = statements[requestedResource];
				if (!allowedActions) return {
					success: false,
					error: `You are not allowed to access resource: ${requestedResource}`
				};
				if (Array.isArray(requestedActions)) success = requestedActions.every((requestedAction) => allowedActions.includes(requestedAction));
				else if (typeof requestedActions === "object") {
					const actions = requestedActions;
					if (actions.connector === "OR") success = actions.actions.some((requestedAction) => allowedActions.includes(requestedAction));
					else success = actions.actions.every((requestedAction) => allowedActions.includes(requestedAction));
				} else throw new BetterAuthError("Invalid access control request");
				if (success && connector === "OR") return { success };
				if (!success && connector === "AND") return {
					success: false,
					error: `unauthorized to access resource "${requestedResource}"`
				};
			}
			if (success) return { success };
			return {
				success: false,
				error: "Not authorized"
			};
		},
		statements
	};
}
function createAccessControl(s) {
	return {
		newRole(statements) {
			return role(statements);
		},
		statements: s
	};
}
var API_KEY_ERROR_CODES = defineErrorCodes({
	INVALID_METADATA_TYPE: "metadata must be an object or undefined",
	REFILL_AMOUNT_AND_INTERVAL_REQUIRED: "refillAmount is required when refillInterval is provided",
	REFILL_INTERVAL_AND_AMOUNT_REQUIRED: "refillInterval is required when refillAmount is provided",
	USER_BANNED: "User is banned",
	UNAUTHORIZED_SESSION: "Unauthorized or invalid session",
	KEY_NOT_FOUND: "API Key not found",
	KEY_DISABLED: "API Key is disabled",
	KEY_EXPIRED: "API Key has expired",
	USAGE_EXCEEDED: "API Key has reached its usage limit",
	KEY_NOT_RECOVERABLE: "API Key is not recoverable",
	EXPIRES_IN_IS_TOO_SMALL: "The expiresIn is smaller than the predefined minimum value.",
	EXPIRES_IN_IS_TOO_LARGE: "The expiresIn is larger than the predefined maximum value.",
	INVALID_REMAINING: "The remaining count is either too large or too small.",
	INVALID_PREFIX_LENGTH: "The prefix length is either too large or too small.",
	INVALID_NAME_LENGTH: "The name length is either too large or too small.",
	METADATA_DISABLED: "Metadata is disabled.",
	RATE_LIMIT_EXCEEDED: "Rate limit exceeded.",
	NO_VALUES_TO_UPDATE: "No values to update.",
	KEY_DISABLED_EXPIRATION: "Custom key expiration values are disabled.",
	INVALID_API_KEY: "Invalid API key.",
	INVALID_USER_ID_FROM_API_KEY: "The user id from the API key is invalid.",
	INVALID_API_KEY_GETTER_RETURN_TYPE: "API Key getter returned an invalid key type. Expected string.",
	SERVER_ONLY_PROPERTY: "The property you're trying to set can only be set from the server auth instance only.",
	FAILED_TO_UPDATE_API_KEY: "Failed to update API key",
	NAME_REQUIRED: "API Key name is required."
});
defineErrorCodes({ INVALID_SESSION_TOKEN: "Invalid session token" });
var TWO_FACTOR_ERROR_CODES = defineErrorCodes({
	OTP_NOT_ENABLED: "OTP not enabled",
	OTP_HAS_EXPIRED: "OTP has expired",
	TOTP_NOT_ENABLED: "TOTP not enabled",
	TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled",
	BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled",
	INVALID_BACKUP_CODE: "Invalid backup code",
	INVALID_CODE: "Invalid code",
	TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.",
	INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie"
});
var twoFactorClient = (options) => {
	return {
		id: "two-factor",
		$InferServerPlugin: {},
		atomListeners: [{
			matcher: (path) => path.startsWith("/two-factor/"),
			signal: "$sessionSignal"
		}],
		pathMethods: {
			"/two-factor/disable": "POST",
			"/two-factor/enable": "POST",
			"/two-factor/send-otp": "POST",
			"/two-factor/generate-backup-codes": "POST",
			"/two-factor/get-totp-uri": "POST",
			"/two-factor/verify-totp": "POST",
			"/two-factor/verify-otp": "POST",
			"/two-factor/verify-backup-code": "POST"
		},
		fetchPlugins: [{
			id: "two-factor",
			name: "two-factor",
			hooks: { async onSuccess(context) {
				if (context.data?.twoFactorRedirect) {
					if (options?.onTwoFactorRedirect) await options.onTwoFactorRedirect();
				}
			} }
		}],
		$ERROR_CODES: TWO_FACTOR_ERROR_CODES
	};
};
var USERNAME_ERROR_CODES = defineErrorCodes({
	INVALID_USERNAME_OR_PASSWORD: "Invalid username or password",
	EMAIL_NOT_VERIFIED: "Email not verified",
	UNEXPECTED_ERROR: "Unexpected error",
	USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.",
	USERNAME_TOO_SHORT: "Username is too short",
	USERNAME_TOO_LONG: "Username is too long",
	INVALID_USERNAME: "Username is invalid",
	INVALID_DISPLAY_USERNAME: "Display username is invalid"
});
var defaultAc$1 = createAccessControl({
	user: [
		"create",
		"list",
		"set-role",
		"ban",
		"impersonate",
		"delete",
		"set-password",
		"get",
		"update"
	],
	session: [
		"list",
		"revoke",
		"delete"
	]
});
defaultAc$1.newRole({
	user: [
		"create",
		"list",
		"set-role",
		"ban",
		"impersonate",
		"delete",
		"set-password",
		"get",
		"update"
	],
	session: [
		"list",
		"revoke",
		"delete"
	]
});
defaultAc$1.newRole({
	user: [],
	session: []
});
defineErrorCodes({
	FAILED_TO_CREATE_USER: "Failed to create user",
	USER_ALREADY_EXISTS: "User already exists.",
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.",
	YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself",
	YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role",
	YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users",
	YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users",
	YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions",
	YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users",
	YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users",
	YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions",
	YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users",
	YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password",
	BANNED_USER: "You have been banned from this application",
	YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user",
	NO_DATA_TO_UPDATE: "No data to update",
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users",
	YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself",
	YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value",
	YOU_CANNOT_IMPERSONATE_ADMINS: "You cannot impersonate admins",
	INVALID_ROLE_TYPE: "Invalid role type"
});
createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session) throw APIError.fromStatus("UNAUTHORIZED");
	return { session };
});
object({
	userId: string$1().meta({ description: "The user id" }),
	role: union([string().meta({ description: "The role to set. `admin` or `user` by default" }), array(string().meta({ description: "The roles to set. `admin` or `user` by default" }))]).meta({ description: "The role to set, this can be a string or an array of strings. Eg: `admin` or `[admin, user]`" })
});
object({ id: string().meta({ description: "The id of the User" }) });
object({
	email: string().meta({ description: "The email of the user" }),
	password: string().optional().meta({ description: "The password of the user. If not provided, the user will be created without a credential account (useful for magic link or social login only users)." }),
	name: string().meta({ description: "The name of the user" }),
	role: union([string().meta({ description: "The role of the user" }), array(string().meta({ description: "The roles of user" }))]).optional().meta({ description: `A string or array of strings representing the roles to apply to the new user. Eg: \"user\"` }),
	data: record(string(), any()).optional().meta({ description: "Extra fields for the user. Including custom additional fields." })
});
object({
	userId: string$1().meta({ description: "The user id" }),
	data: record(any(), any()).meta({ description: "The user data to update" })
});
object({
	searchValue: string().optional().meta({ description: "The value to search for. Eg: \"some name\"" }),
	searchField: _enum(["email", "name"]).meta({ description: "The field to search in, defaults to email. Can be `email` or `name`. Eg: \"name\"" }).optional(),
	searchOperator: _enum([
		"contains",
		"starts_with",
		"ends_with"
	]).meta({ description: "The operator to use for the search. Can be `contains`, `starts_with` or `ends_with`. Eg: \"contains\"" }).optional(),
	limit: string().meta({ description: "The number of users to return" }).or(number()).optional(),
	offset: string().meta({ description: "The offset to start from" }).or(number()).optional(),
	sortBy: string().meta({ description: "The field to sort by" }).optional(),
	sortDirection: _enum(["asc", "desc"]).meta({ description: "The direction to sort by" }).optional(),
	filterField: string().meta({ description: "The field to filter by" }).optional(),
	filterValue: string().meta({ description: "The value to filter by" }).or(number()).or(boolean()).optional(),
	filterOperator: _enum([
		"eq",
		"ne",
		"lt",
		"lte",
		"gt",
		"gte",
		"contains"
	]).meta({ description: "The operator to use for the filter" }).optional()
});
object({ userId: string$1().meta({ description: "The user id" }) });
object({ userId: string$1().meta({ description: "The user id" }) });
object({
	userId: string$1().meta({ description: "The user id" }),
	banReason: string().meta({ description: "The reason for the ban" }).optional(),
	banExpiresIn: number().meta({ description: "The number of seconds until the ban expires" }).optional()
});
object({ userId: string$1().meta({ description: "The user id" }) });
object({ sessionToken: string().meta({ description: "The session token" }) });
object({ userId: string$1().meta({ description: "The user id" }) });
object({ userId: string$1().meta({ description: "The user id" }) });
object({
	newPassword: string().nonempty("newPassword cannot be empty").meta({ description: "The new password" }),
	userId: string$1().nonempty("userId cannot be empty").meta({ description: "The user id" })
});
object({
	userId: string$1().optional().meta({ description: `The user id. Eg: "user-id"` }),
	role: string().optional().meta({ description: `The role to check permission for. Eg: "admin"` })
}).and(union([object({
	permission: record(string(), array(string())),
	permissions: _undefined()
}), object({
	permission: _undefined(),
	permissions: record(string(), array(string()))
})]));
defineErrorCodes({
	INVALID_EMAIL_FORMAT: "Email was not generated in a valid format",
	FAILED_TO_CREATE_USER: "Failed to create user",
	COULD_NOT_CREATE_SESSION: "Could not create session",
	ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY: "Anonymous users cannot sign in again anonymously",
	FAILED_TO_DELETE_ANONYMOUS_USER: "Failed to delete anonymous user",
	USER_IS_NOT_ANONYMOUS: "User is not anonymous",
	DELETE_ANONYMOUS_USER_DISABLED: "Deleting anonymous users is disabled"
});
/**
* Parses double-stringified metadata synchronously without updating the database.
* Use this for reading metadata, then call migrateLegacyMetadataInBackground for DB updates.
*
* @returns The properly parsed metadata object, or the original if already an object
*/
function parseDoubleStringifiedMetadata(metadata) {
	if (metadata == null) return null;
	if (typeof metadata === "object") return metadata;
	return safeJSONParse(metadata);
}
/**
* Checks if metadata needs migration (is a string instead of object)
*/
function needsMetadataMigration(metadata) {
	return metadata != null && typeof metadata === "string";
}
/**
* Batch migrates double-stringified metadata for multiple API keys.
* Runs all updates in parallel to avoid N sequential database calls.
*/
async function batchMigrateLegacyMetadata(ctx, apiKeys, opts) {
	if (opts.storage !== "database" && !opts.fallbackToDatabase) return;
	const keysToMigrate = apiKeys.filter((key) => needsMetadataMigration(key.metadata));
	if (keysToMigrate.length === 0) return;
	const migrationPromises = keysToMigrate.map(async (apiKey) => {
		const parsed = parseDoubleStringifiedMetadata(apiKey.metadata);
		try {
			await ctx.context.adapter.update({
				model: "apikey",
				where: [{
					field: "id",
					value: apiKey.id
				}],
				update: { metadata: parsed }
			});
		} catch (error) {
			ctx.context.logger.warn(`Failed to migrate double-stringified metadata for API key ${apiKey.id}:`, error);
		}
	});
	await Promise.all(migrationPromises);
}
/**
* Migrates double-stringified metadata to properly parsed object.
*
* This handles legacy data where metadata was incorrectly double-stringified.
* If metadata is a string (should be object after adapter's transform.output),
* it parses it and optionally updates the database.
*
* @returns The properly parsed metadata object
*/
async function migrateDoubleStringifiedMetadata(ctx, apiKey, opts) {
	const parsed = parseDoubleStringifiedMetadata(apiKey.metadata);
	if (needsMetadataMigration(apiKey.metadata) && (opts.storage === "database" || opts.fallbackToDatabase)) try {
		await ctx.context.adapter.update({
			model: "apikey",
			where: [{
				field: "id",
				value: apiKey.id
			}],
			update: { metadata: parsed }
		});
	} catch (error) {
		ctx.context.logger.warn(`Failed to migrate double-stringified metadata for API key ${apiKey.id}:`, error);
	}
	return parsed;
}
/**
* Generate storage key for API key by hashed key
*/
function getStorageKeyByHashedKey(hashedKey) {
	return `api-key:${hashedKey}`;
}
/**
* Generate storage key for API key by ID
*/
function getStorageKeyById(id) {
	return `api-key:by-id:${id}`;
}
/**
* Generate storage key for user's API key list
*/
function getStorageKeyByUserId(userId) {
	return `api-key:by-user:${userId}`;
}
/**
* Serialize API key for storage
*/
function serializeApiKey(apiKey) {
	return JSON.stringify({
		...apiKey,
		createdAt: apiKey.createdAt.toISOString(),
		updatedAt: apiKey.updatedAt.toISOString(),
		expiresAt: apiKey.expiresAt?.toISOString() ?? null,
		lastRefillAt: apiKey.lastRefillAt?.toISOString() ?? null,
		lastRequest: apiKey.lastRequest?.toISOString() ?? null
	});
}
/**
* Deserialize API key from storage
*/
function deserializeApiKey(data) {
	if (!data || typeof data !== "string") return null;
	try {
		const parsed = JSON.parse(data);
		return {
			...parsed,
			createdAt: new Date(parsed.createdAt),
			updatedAt: new Date(parsed.updatedAt),
			expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,
			lastRefillAt: parsed.lastRefillAt ? new Date(parsed.lastRefillAt) : null,
			lastRequest: parsed.lastRequest ? new Date(parsed.lastRequest) : null
		};
	} catch {
		return null;
	}
}
/**
* Get the storage instance to use (custom methods take precedence)
*/
function getStorageInstance(ctx, opts) {
	if (opts.customStorage) return opts.customStorage;
	return ctx.context.secondaryStorage || null;
}
/**
* Calculate TTL in seconds for an API key
*/
function calculateTTL(apiKey) {
	if (apiKey.expiresAt) {
		const now = Date.now();
		const expiresAt = new Date(apiKey.expiresAt).getTime();
		const ttlSeconds = Math.floor((expiresAt - now) / 1e3);
		if (ttlSeconds > 0) return ttlSeconds;
	}
}
/**
* Get API key from secondary storage by hashed key
*/
async function getApiKeyFromStorage(ctx, hashedKey, storage) {
	const key = getStorageKeyByHashedKey(hashedKey);
	return deserializeApiKey(await storage.get(key));
}
/**
* Get API key from secondary storage by ID
*/
async function getApiKeyByIdFromStorage(ctx, id, storage) {
	const key = getStorageKeyById(id);
	return deserializeApiKey(await storage.get(key));
}
/**
* Store API key in secondary storage
*/
async function setApiKeyInStorage(ctx, apiKey, storage, ttl) {
	const serialized = serializeApiKey(apiKey);
	const hashedKey = apiKey.key;
	const id = apiKey.id;
	await storage.set(getStorageKeyByHashedKey(hashedKey), serialized, ttl);
	await storage.set(getStorageKeyById(id), serialized, ttl);
	const userKey = getStorageKeyByUserId(apiKey.userId);
	const userListData = await storage.get(userKey);
	let userIds = [];
	if (userListData && typeof userListData === "string") try {
		userIds = JSON.parse(userListData);
	} catch {
		userIds = [];
	}
	else if (Array.isArray(userListData)) userIds = userListData;
	if (!userIds.includes(id)) {
		userIds.push(id);
		await storage.set(userKey, JSON.stringify(userIds));
	}
}
/**
* Delete API key from secondary storage
*/
async function deleteApiKeyFromStorage(ctx, apiKey, storage) {
	const hashedKey = apiKey.key;
	const id = apiKey.id;
	const userId = apiKey.userId;
	await storage.delete(getStorageKeyByHashedKey(hashedKey));
	await storage.delete(getStorageKeyById(id));
	const userKey = getStorageKeyByUserId(userId);
	const userListData = await storage.get(userKey);
	let userIds = [];
	if (userListData && typeof userListData === "string") try {
		userIds = JSON.parse(userListData);
	} catch {
		userIds = [];
	}
	else if (Array.isArray(userListData)) userIds = userListData;
	const filteredIds = userIds.filter((keyId) => keyId !== id);
	if (filteredIds.length === 0) await storage.delete(userKey);
	else await storage.set(userKey, JSON.stringify(filteredIds));
}
/**
* Unified getter for API keys with support for all storage modes
*/
async function getApiKey$1(ctx, hashedKey, opts) {
	const storage = getStorageInstance(ctx, opts);
	if (opts.storage === "database") return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "key",
			value: hashedKey
		}]
	});
	if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
		if (storage) {
			const cached = await getApiKeyFromStorage(ctx, hashedKey, storage);
			if (cached) return cached;
		}
		const dbKey = await ctx.context.adapter.findOne({
			model: "apikey",
			where: [{
				field: "key",
				value: hashedKey
			}]
		});
		if (dbKey && storage) await setApiKeyInStorage(ctx, dbKey, storage, calculateTTL(dbKey));
		return dbKey;
	}
	if (opts.storage === "secondary-storage") {
		if (!storage) return null;
		return await getApiKeyFromStorage(ctx, hashedKey, storage);
	}
	return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "key",
			value: hashedKey
		}]
	});
}
/**
* Unified getter for API keys by ID
*/
async function getApiKeyById(ctx, id, opts) {
	const storage = getStorageInstance(ctx, opts);
	if (opts.storage === "database") return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "id",
			value: id
		}]
	});
	if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
		if (storage) {
			const cached = await getApiKeyByIdFromStorage(ctx, id, storage);
			if (cached) return cached;
		}
		const dbKey = await ctx.context.adapter.findOne({
			model: "apikey",
			where: [{
				field: "id",
				value: id
			}]
		});
		if (dbKey && storage) await setApiKeyInStorage(ctx, dbKey, storage, calculateTTL(dbKey));
		return dbKey;
	}
	if (opts.storage === "secondary-storage") {
		if (!storage) return null;
		return await getApiKeyByIdFromStorage(ctx, id, storage);
	}
	return await ctx.context.adapter.findOne({
		model: "apikey",
		where: [{
			field: "id",
			value: id
		}]
	});
}
/**
* Unified setter for API keys with support for all storage modes
*/
async function setApiKey(ctx, apiKey, opts) {
	const storage = getStorageInstance(ctx, opts);
	const ttl = calculateTTL(apiKey);
	if (opts.storage === "database") return;
	if (opts.storage === "secondary-storage") {
		if (!storage) throw new Error("Secondary storage is required when storage mode is 'secondary-storage'");
		await setApiKeyInStorage(ctx, apiKey, storage, ttl);
		return;
	}
}
/**
* Unified deleter for API keys with support for all storage modes
*/
async function deleteApiKey$1(ctx, apiKey, opts) {
	const storage = getStorageInstance(ctx, opts);
	if (opts.storage === "database") return;
	if (opts.storage === "secondary-storage") {
		if (!storage) throw new Error("Secondary storage is required when storage mode is 'secondary-storage'");
		await deleteApiKeyFromStorage(ctx, apiKey, storage);
		return;
	}
}
/**
* Apply sorting and pagination to an array of API keys in memory
* Used for secondary storage mode where we can't rely on database operations
*/
function applySortingAndPagination(apiKeys, sortBy, sortDirection, limit, offset) {
	let result = [...apiKeys];
	if (sortBy) {
		const direction = sortDirection || "asc";
		result.sort((a, b) => {
			const aValue = a[sortBy];
			const bValue = b[sortBy];
			if (aValue == null && bValue == null) return 0;
			if (aValue == null) return direction === "asc" ? -1 : 1;
			if (bValue == null) return direction === "asc" ? 1 : -1;
			if (aValue < bValue) return direction === "asc" ? -1 : 1;
			if (aValue > bValue) return direction === "asc" ? 1 : -1;
			return 0;
		});
	}
	if (offset !== void 0) result = result.slice(offset);
	if (limit !== void 0) result = result.slice(0, limit);
	return result;
}
/**
* List API keys for a user with support for all storage modes
*/
async function listApiKeys$1(ctx, userId, opts, paginationOpts) {
	const storage = getStorageInstance(ctx, opts);
	const { limit, offset, sortBy, sortDirection } = paginationOpts || {};
	if (opts.storage === "database") {
		const [apiKeys, total] = await Promise.all([ctx.context.adapter.findMany({
			model: "apikey",
			where: [{
				field: "userId",
				value: userId
			}],
			limit,
			offset,
			sortBy: sortBy ? {
				field: sortBy,
				direction: sortDirection || "asc"
			} : void 0
		}), ctx.context.adapter.count({
			model: "apikey",
			where: [{
				field: "userId",
				value: userId
			}]
		})]);
		return {
			apiKeys,
			total
		};
	}
	if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
		const userKey = getStorageKeyByUserId(userId);
		if (storage) {
			const userListData = await storage.get(userKey);
			let userIds = [];
			if (userListData && typeof userListData === "string") try {
				userIds = JSON.parse(userListData);
			} catch {
				userIds = [];
			}
			else if (Array.isArray(userListData)) userIds = userListData;
			if (userIds.length > 0) {
				const apiKeys = [];
				for (const id of userIds) {
					const apiKey = await getApiKeyByIdFromStorage(ctx, id, storage);
					if (apiKey) apiKeys.push(apiKey);
				}
				return {
					apiKeys: applySortingAndPagination(apiKeys, sortBy, sortDirection, limit, offset),
					total: apiKeys.length
				};
			}
		}
		const [dbKeys, total] = await Promise.all([ctx.context.adapter.findMany({
			model: "apikey",
			where: [{
				field: "userId",
				value: userId
			}],
			limit,
			offset,
			sortBy: sortBy ? {
				field: sortBy,
				direction: sortDirection || "asc"
			} : void 0
		}), ctx.context.adapter.count({
			model: "apikey",
			where: [{
				field: "userId",
				value: userId
			}]
		})]);
		if (storage && dbKeys.length > 0) {
			const userIds = [];
			for (const apiKey of dbKeys) {
				await setApiKeyInStorage(ctx, apiKey, storage, calculateTTL(apiKey));
				userIds.push(apiKey.id);
			}
			await storage.set(userKey, JSON.stringify(userIds));
		}
		return {
			apiKeys: dbKeys,
			total
		};
	}
	if (opts.storage === "secondary-storage") {
		if (!storage) return {
			apiKeys: [],
			total: 0
		};
		const userKey = getStorageKeyByUserId(userId);
		const userListData = await storage.get(userKey);
		let userIds = [];
		if (userListData && typeof userListData === "string") try {
			userIds = JSON.parse(userListData);
		} catch {
			return {
				apiKeys: [],
				total: 0
			};
		}
		else if (Array.isArray(userListData)) userIds = userListData;
		else return {
			apiKeys: [],
			total: 0
		};
		const apiKeys = [];
		for (const id of userIds) {
			const apiKey = await getApiKeyByIdFromStorage(ctx, id, storage);
			if (apiKey) apiKeys.push(apiKey);
		}
		return {
			apiKeys: applySortingAndPagination(apiKeys, sortBy, sortDirection, limit, offset),
			total: apiKeys.length
		};
	}
	const [apiKeys, total] = await Promise.all([ctx.context.adapter.findMany({
		model: "apikey",
		where: [{
			field: "userId",
			value: userId
		}],
		limit,
		offset,
		sortBy: sortBy ? {
			field: sortBy,
			direction: sortDirection || "asc"
		} : void 0
	}), ctx.context.adapter.count({
		model: "apikey",
		where: [{
			field: "userId",
			value: userId
		}]
	})]);
	return {
		apiKeys,
		total
	};
}
/**
* Determines if a request is allowed based on rate limiting parameters.
*
* @returns An object indicating whether the request is allowed and, if not,
*          a message and updated ApiKey data.
*/
function isRateLimited(apiKey, opts) {
	const now = /* @__PURE__ */ new Date();
	const lastRequest = apiKey.lastRequest;
	const rateLimitTimeWindow = apiKey.rateLimitTimeWindow;
	const rateLimitMax = apiKey.rateLimitMax;
	let requestCount = apiKey.requestCount;
	if (opts.rateLimit.enabled === false) return {
		success: true,
		message: null,
		update: { lastRequest: now },
		tryAgainIn: null
	};
	if (apiKey.rateLimitEnabled === false) return {
		success: true,
		message: null,
		update: { lastRequest: now },
		tryAgainIn: null
	};
	if (rateLimitTimeWindow === null || rateLimitMax === null) return {
		success: true,
		message: null,
		update: null,
		tryAgainIn: null
	};
	if (lastRequest === null) return {
		success: true,
		message: null,
		update: {
			lastRequest: now,
			requestCount: 1
		},
		tryAgainIn: null
	};
	const timeSinceLastRequest = now.getTime() - new Date(lastRequest).getTime();
	if (timeSinceLastRequest > rateLimitTimeWindow) return {
		success: true,
		message: null,
		update: {
			lastRequest: now,
			requestCount: 1
		},
		tryAgainIn: null
	};
	if (requestCount >= rateLimitMax) return {
		success: false,
		message: API_KEY_ERROR_CODES.RATE_LIMIT_EXCEEDED.message,
		update: null,
		tryAgainIn: Math.ceil(rateLimitTimeWindow - timeSinceLastRequest)
	};
	requestCount++;
	return {
		success: true,
		message: null,
		tryAgainIn: null,
		update: {
			lastRequest: now,
			requestCount
		}
	};
}
async function validateApiKey({ hashedKey, ctx, opts, schema, permissions }) {
	const apiKey = await getApiKey$1(ctx, hashedKey, opts);
	if (!apiKey) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.INVALID_API_KEY);
	if (apiKey.enabled === false) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_DISABLED);
	if (apiKey.expiresAt) {
		if (Date.now() > new Date(apiKey.expiresAt).getTime()) {
			const deleteExpiredKey = async () => {
				if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
					await deleteApiKey$1(ctx, apiKey, opts);
					await ctx.context.adapter.delete({
						model: API_KEY_TABLE_NAME,
						where: [{
							field: "id",
							value: apiKey.id
						}]
					});
				} else if (opts.storage === "secondary-storage") await deleteApiKey$1(ctx, apiKey, opts);
				else await ctx.context.adapter.delete({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}]
				});
			};
			if (opts.deferUpdates) ctx.context.runInBackground(deleteExpiredKey().catch((error) => {
				ctx.context.logger.error("Deferred update failed:", error);
			}));
			else await deleteExpiredKey();
			throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_EXPIRED);
		}
	}
	if (permissions) {
		const apiKeyPermissions = apiKey.permissions ? safeJSONParse(apiKey.permissions) : null;
		if (!apiKeyPermissions) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		if (!role(apiKeyPermissions).authorize(permissions).success) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
	}
	let remaining = apiKey.remaining;
	let lastRefillAt = apiKey.lastRefillAt;
	if (apiKey.remaining === 0 && apiKey.refillAmount === null) {
		const deleteExhaustedKey = async () => {
			if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
				await deleteApiKey$1(ctx, apiKey, opts);
				await ctx.context.adapter.delete({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}]
				});
			} else if (opts.storage === "secondary-storage") await deleteApiKey$1(ctx, apiKey, opts);
			else await ctx.context.adapter.delete({
				model: API_KEY_TABLE_NAME,
				where: [{
					field: "id",
					value: apiKey.id
				}]
			});
		};
		if (opts.deferUpdates) ctx.context.runInBackground(deleteExhaustedKey().catch((error) => {
			ctx.context.logger.error("Deferred update failed:", error);
		}));
		else await deleteExhaustedKey();
		throw APIError.from("TOO_MANY_REQUESTS", API_KEY_ERROR_CODES.USAGE_EXCEEDED);
	} else if (remaining !== null) {
		const now = Date.now();
		const refillInterval = apiKey.refillInterval;
		const refillAmount = apiKey.refillAmount;
		const lastTime = new Date(lastRefillAt ?? apiKey.createdAt).getTime();
		if (refillInterval && refillAmount) {
			if (now - lastTime > refillInterval) {
				remaining = refillAmount;
				lastRefillAt = /* @__PURE__ */ new Date();
			}
		}
		if (remaining === 0) throw APIError.from("TOO_MANY_REQUESTS", API_KEY_ERROR_CODES.USAGE_EXCEEDED);
		else remaining--;
	}
	const { message, success, update, tryAgainIn } = isRateLimited(apiKey, opts);
	if (success === false) throw new APIError("UNAUTHORIZED", {
		message: message ?? void 0,
		code: "RATE_LIMITED",
		details: { tryAgainIn }
	});
	const updated = {
		...apiKey,
		...update,
		remaining,
		lastRefillAt,
		updatedAt: /* @__PURE__ */ new Date()
	};
	const performUpdate = async () => {
		if (opts.storage === "database") return ctx.context.adapter.update({
			model: API_KEY_TABLE_NAME,
			where: [{
				field: "id",
				value: apiKey.id
			}],
			update: {
				...updated,
				id: void 0
			}
		});
		else if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
			const dbUpdated = await ctx.context.adapter.update({
				model: API_KEY_TABLE_NAME,
				where: [{
					field: "id",
					value: apiKey.id
				}],
				update: {
					...updated,
					id: void 0
				}
			});
			if (dbUpdated) await setApiKey(ctx, dbUpdated, opts);
			return dbUpdated;
		} else {
			await setApiKey(ctx, updated, opts);
			return updated;
		}
	};
	let newApiKey = null;
	if (opts.deferUpdates) {
		ctx.context.runInBackground(performUpdate().catch((error) => {
			ctx.context.logger.error("Failed to update API key:", error);
		}));
		newApiKey = updated;
	} else {
		newApiKey = await performUpdate();
		if (!newApiKey) throw APIError.from("INTERNAL_SERVER_ERROR", API_KEY_ERROR_CODES.FAILED_TO_UPDATE_API_KEY);
	}
	return newApiKey;
}
var verifyApiKeyBodySchema = object({
	key: string().meta({ description: "The key to verify" }),
	permissions: record(string(), array(string())).meta({ description: "The permissions to verify." }).optional()
});
function verifyApiKey({ opts, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint({
		method: "POST",
		body: verifyApiKeyBodySchema
	}, async (ctx) => {
		const { key } = ctx.body;
		if (opts.customAPIKeyValidator) {
			if (!await opts.customAPIKeyValidator({
				ctx,
				key
			})) return ctx.json({
				valid: false,
				error: {
					message: API_KEY_ERROR_CODES.INVALID_API_KEY,
					code: "KEY_NOT_FOUND"
				},
				key: null
			});
		}
		const hashed = opts.disableKeyHashing ? key : await defaultKeyHasher$1(key);
		let apiKey = null;
		try {
			apiKey = await validateApiKey({
				hashedKey: hashed,
				permissions: ctx.body.permissions,
				ctx,
				opts,
				schema
			});
			if (opts.deferUpdates) ctx.context.runInBackground(deleteAllExpiredApiKeys(ctx.context).catch((err) => {
				ctx.context.logger.error("Failed to delete expired API keys:", err);
			}));
		} catch (error) {
			ctx.context.logger.error("Failed to validate API key:", error);
			if (isAPIError(error)) return ctx.json({
				valid: false,
				error: {
					...error.body,
					message: error.body?.message,
					code: error.body?.code
				},
				key: null
			});
			return ctx.json({
				valid: false,
				error: {
					message: API_KEY_ERROR_CODES.INVALID_API_KEY,
					code: "INVALID_API_KEY"
				},
				key: null
			});
		}
		const { key: _, ...returningApiKey } = apiKey ?? {
			key: 1,
			permissions: void 0
		};
		let migratedMetadata = null;
		if (apiKey) migratedMetadata = await migrateDoubleStringifiedMetadata(ctx, apiKey, opts);
		returningApiKey.permissions = returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null;
		return ctx.json({
			valid: true,
			error: null,
			key: apiKey === null ? null : {
				...returningApiKey,
				metadata: migratedMetadata
			}
		});
	});
}
var createApiKeyBodySchema = object({
	name: string().meta({ description: "Name of the Api Key" }).optional(),
	expiresIn: number().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable().default(null),
	userId: string$1().meta({ description: "User Id of the user that the Api Key belongs to. server-only. Eg: \"user-id\"" }).optional(),
	prefix: string().meta({ description: "Prefix of the Api Key" }).regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid prefix format, must be alphanumeric and contain only underscores and hyphens." }).optional(),
	remaining: number().meta({ description: "Remaining number of requests. Server side only" }).min(0).optional().nullable().default(null),
	metadata: any().optional(),
	refillAmount: number().meta({ description: "Amount to refill the remaining count of the Api Key. server-only. Eg: 100" }).min(1).optional(),
	refillInterval: number().meta({ description: "Interval to refill the Api Key in milliseconds. server-only. Eg: 1000" }).optional(),
	rateLimitTimeWindow: number().meta({ description: "The duration in milliseconds where each request is counted. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 1000" }).optional(),
	rateLimitMax: number().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
	rateLimitEnabled: boolean().meta({ description: "Whether the key has rate limiting enabled. server-only. Eg: true" }).optional(),
	permissions: record(string(), array(string())).meta({ description: "Permissions of the Api Key." }).optional()
});
function createApiKey({ keyGenerator, opts, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/create", {
		method: "POST",
		body: createApiKeyBodySchema,
		metadata: { openapi: {
			description: "Create a new API key for a user",
			responses: { "200": {
				description: "API key created successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "Unique identifier of the API key"
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "Creation timestamp"
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							description: "Last update timestamp"
						},
						name: {
							type: "string",
							nullable: true,
							description: "Name of the API key"
						},
						prefix: {
							type: "string",
							nullable: true,
							description: "Prefix of the API key"
						},
						start: {
							type: "string",
							nullable: true,
							description: "Starting characters of the key (if configured)"
						},
						key: {
							type: "string",
							description: "The full API key (only returned on creation)"
						},
						enabled: {
							type: "boolean",
							description: "Whether the key is enabled"
						},
						expiresAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Expiration timestamp"
						},
						userId: {
							type: "string",
							description: "ID of the user owning the key"
						},
						lastRefillAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Last refill timestamp"
						},
						lastRequest: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Last request timestamp"
						},
						metadata: {
							type: "object",
							nullable: true,
							additionalProperties: true,
							description: "Metadata associated with the key"
						},
						rateLimitMax: {
							type: "number",
							nullable: true,
							description: "Maximum requests in time window"
						},
						rateLimitTimeWindow: {
							type: "number",
							nullable: true,
							description: "Rate limit time window in milliseconds"
						},
						remaining: {
							type: "number",
							nullable: true,
							description: "Remaining requests"
						},
						refillAmount: {
							type: "number",
							nullable: true,
							description: "Amount to refill"
						},
						refillInterval: {
							type: "number",
							nullable: true,
							description: "Refill interval in milliseconds"
						},
						rateLimitEnabled: {
							type: "boolean",
							description: "Whether rate limiting is enabled"
						},
						requestCount: {
							type: "number",
							description: "Current request count in window"
						},
						permissions: {
							type: "object",
							nullable: true,
							additionalProperties: {
								type: "array",
								items: { type: "string" }
							},
							description: "Permissions associated with the key"
						}
					},
					required: [
						"id",
						"createdAt",
						"updatedAt",
						"key",
						"enabled",
						"userId",
						"rateLimitEnabled",
						"requestCount"
					]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { name, expiresIn, prefix, remaining, metadata, refillAmount, refillInterval, permissions, rateLimitMax, rateLimitTimeWindow, rateLimitEnabled } = ctx.body;
		const session = await getSessionFromCtx(ctx);
		const authRequired = ctx.request || ctx.headers;
		const user = authRequired && !session ? null : session?.user || { id: ctx.body.userId };
		if (!user?.id) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
		if (session && ctx.body.userId && session?.user.id !== ctx.body.userId) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
		if (authRequired) {
			if (refillAmount !== void 0 || refillInterval !== void 0 || rateLimitMax !== void 0 || rateLimitTimeWindow !== void 0 || rateLimitEnabled !== void 0 || permissions !== void 0 || remaining !== null) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.SERVER_ONLY_PROPERTY);
		}
		if (metadata) {
			if (opts.enableMetadata === false) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.METADATA_DISABLED);
			if (typeof metadata !== "object") throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_METADATA_TYPE);
		}
		if (refillAmount && !refillInterval) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.REFILL_AMOUNT_AND_INTERVAL_REQUIRED);
		if (refillInterval && !refillAmount) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.REFILL_INTERVAL_AND_AMOUNT_REQUIRED);
		if (expiresIn) {
			if (opts.keyExpiration.disableCustomExpiresTime === true) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.KEY_DISABLED_EXPIRATION);
			const expiresIn_in_days = expiresIn / (3600 * 24);
			if (opts.keyExpiration.minExpiresIn > expiresIn_in_days) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_SMALL);
			else if (opts.keyExpiration.maxExpiresIn < expiresIn_in_days) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_LARGE);
		}
		if (prefix) {
			if (prefix.length < opts.minimumPrefixLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_PREFIX_LENGTH);
			if (prefix.length > opts.maximumPrefixLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_PREFIX_LENGTH);
		}
		if (name) {
			if (name.length < opts.minimumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
			if (name.length > opts.maximumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
		} else if (opts.requireName) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.NAME_REQUIRED);
		deleteAllExpiredApiKeys(ctx.context);
		const key = await keyGenerator({
			length: opts.defaultKeyLength,
			prefix: prefix || opts.defaultPrefix
		});
		const hashed = opts.disableKeyHashing ? key : await defaultKeyHasher$1(key);
		let start = null;
		if (opts.startingCharactersConfig.shouldStore) start = key.substring(0, opts.startingCharactersConfig.charactersLength);
		const defaultPermissions = opts.permissions?.defaultPermissions ? typeof opts.permissions.defaultPermissions === "function" ? await opts.permissions.defaultPermissions(user.id, ctx) : opts.permissions.defaultPermissions : void 0;
		const permissionsToApply = permissions ? JSON.stringify(permissions) : defaultPermissions ? JSON.stringify(defaultPermissions) : void 0;
		const data = {
			createdAt: /* @__PURE__ */ new Date(),
			updatedAt: /* @__PURE__ */ new Date(),
			name: name ?? null,
			prefix: prefix ?? opts.defaultPrefix ?? null,
			start,
			key: hashed,
			enabled: true,
			expiresAt: expiresIn ? getDate(expiresIn, "sec") : opts.keyExpiration.defaultExpiresIn ? getDate(opts.keyExpiration.defaultExpiresIn, "sec") : null,
			userId: user.id,
			lastRefillAt: null,
			lastRequest: null,
			metadata: null,
			rateLimitMax: rateLimitMax ?? opts.rateLimit.maxRequests ?? null,
			rateLimitTimeWindow: rateLimitTimeWindow ?? opts.rateLimit.timeWindow ?? null,
			remaining: remaining === null ? remaining : remaining ?? refillAmount ?? null,
			refillAmount: refillAmount ?? null,
			refillInterval: refillInterval ?? null,
			rateLimitEnabled: rateLimitEnabled === void 0 ? opts.rateLimit.enabled ?? true : rateLimitEnabled,
			requestCount: 0,
			permissions: permissionsToApply
		};
		if (metadata) data.metadata = metadata;
		let apiKey;
		if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
			apiKey = await ctx.context.adapter.create({
				model: API_KEY_TABLE_NAME,
				data
			});
			await setApiKey(ctx, apiKey, opts);
		} else if (opts.storage === "secondary-storage") {
			const id = ctx.context.generateId({ model: "apikey" }) || generateId();
			apiKey = {
				...data,
				id
			};
			await setApiKey(ctx, apiKey, opts);
		} else apiKey = await ctx.context.adapter.create({
			model: API_KEY_TABLE_NAME,
			data
		});
		return ctx.json({
			...apiKey,
			key,
			metadata: metadata ?? null,
			permissions: apiKey.permissions ? safeJSONParse(apiKey.permissions) : null
		});
	});
}
function deleteAllExpiredApiKeysEndpoint({ deleteAllExpiredApiKeys }) {
	return createAuthEndpoint({ method: "POST" }, async (ctx) => {
		try {
			await deleteAllExpiredApiKeys(ctx.context, true);
		} catch (error) {
			ctx.context.logger.error("[API KEY PLUGIN] Failed to delete expired API keys:", error);
			return ctx.json({
				success: false,
				error
			});
		}
		return ctx.json({
			success: true,
			error: null
		});
	});
}
var deleteApiKeyBodySchema = object({ keyId: string().meta({ description: "The id of the Api Key" }) });
function deleteApiKey({ opts, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/delete", {
		method: "POST",
		body: deleteApiKeyBodySchema,
		use: [sessionMiddleware],
		metadata: { openapi: {
			description: "Delete an existing API key",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: { keyId: {
					type: "string",
					description: "The id of the API key to delete"
				} },
				required: ["keyId"]
			} } } },
			responses: { "200": {
				description: "API key deleted successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: { success: {
						type: "boolean",
						description: "Indicates if the API key was successfully deleted"
					} },
					required: ["success"]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { keyId } = ctx.body;
		const session = ctx.context.session;
		if (session.user.banned === true) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.USER_BANNED);
		let apiKey = null;
		apiKey = await getApiKeyById(ctx, keyId, opts);
		if (!apiKey || apiKey.userId !== session.user.id) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		try {
			if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
				await deleteApiKey$1(ctx, apiKey, opts);
				await ctx.context.adapter.delete({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}]
				});
			} else if (opts.storage === "database") await ctx.context.adapter.delete({
				model: API_KEY_TABLE_NAME,
				where: [{
					field: "id",
					value: apiKey.id
				}]
			});
			else await deleteApiKey$1(ctx, apiKey, opts);
		} catch (error) {
			throw APIError.fromStatus("INTERNAL_SERVER_ERROR", { message: error?.message });
		}
		deleteAllExpiredApiKeys(ctx.context);
		return ctx.json({ success: true });
	});
}
var getApiKeyQuerySchema = object({ id: string().meta({ description: "The id of the Api Key" }) });
function getApiKey({ opts, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/get", {
		method: "GET",
		query: getApiKeyQuerySchema,
		use: [sessionMiddleware],
		metadata: { openapi: {
			description: "Retrieve an existing API key by ID",
			responses: { "200": {
				description: "API key retrieved successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "ID"
						},
						name: {
							type: "string",
							nullable: true,
							description: "The name of the key"
						},
						start: {
							type: "string",
							nullable: true,
							description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
						},
						prefix: {
							type: "string",
							nullable: true,
							description: "The API Key prefix. Stored as plain text."
						},
						userId: {
							type: "string",
							description: "The owner of the user id"
						},
						refillInterval: {
							type: "number",
							nullable: true,
							description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
						},
						refillAmount: {
							type: "number",
							nullable: true,
							description: "The amount to refill"
						},
						lastRefillAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "The last refill date"
						},
						enabled: {
							type: "boolean",
							description: "Sets if key is enabled or disabled",
							default: true
						},
						rateLimitEnabled: {
							type: "boolean",
							description: "Whether the key has rate limiting enabled"
						},
						rateLimitTimeWindow: {
							type: "number",
							nullable: true,
							description: "The duration in milliseconds"
						},
						rateLimitMax: {
							type: "number",
							nullable: true,
							description: "Maximum amount of requests allowed within a window"
						},
						requestCount: {
							type: "number",
							description: "The number of requests made within the rate limit time window"
						},
						remaining: {
							type: "number",
							nullable: true,
							description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
						},
						lastRequest: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "When last request occurred"
						},
						expiresAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Expiry date of a key"
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "created at"
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							description: "updated at"
						},
						metadata: {
							type: "object",
							nullable: true,
							additionalProperties: true,
							description: "Extra metadata about the apiKey"
						},
						permissions: {
							type: "string",
							nullable: true,
							description: "Permissions for the api key (stored as JSON string)"
						}
					},
					required: [
						"id",
						"userId",
						"enabled",
						"rateLimitEnabled",
						"requestCount",
						"createdAt",
						"updatedAt"
					]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { id } = ctx.query;
		const session = ctx.context.session;
		let apiKey = null;
		apiKey = await getApiKeyById(ctx, id, opts);
		if (apiKey && apiKey.userId !== session.user.id) apiKey = null;
		if (!apiKey) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		deleteAllExpiredApiKeys(ctx.context);
		const metadata = await migrateDoubleStringifiedMetadata(ctx, apiKey, opts);
		const { key: _key, ...returningApiKey } = apiKey;
		return ctx.json({
			...returningApiKey,
			metadata,
			permissions: returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null
		});
	});
}
var listApiKeysQuerySchema = object({
	limit: number$1().int().nonnegative().meta({ description: "The number of API keys to return" }).optional(),
	offset: number$1().int().nonnegative().meta({ description: "The offset to start from" }).optional(),
	sortBy: string().meta({ description: "The field to sort by (e.g., createdAt, name, expiresAt)" }).optional(),
	sortDirection: _enum(["asc", "desc"]).meta({ description: "The direction to sort by" }).optional()
}).optional();
function listApiKeys({ opts, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/list", {
		method: "GET",
		use: [sessionMiddleware],
		query: listApiKeysQuerySchema,
		metadata: { openapi: {
			description: "List all API keys for the authenticated user",
			responses: { "200": {
				description: "API keys retrieved successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						apiKeys: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: {
										type: "string",
										description: "ID"
									},
									name: {
										type: "string",
										nullable: true,
										description: "The name of the key"
									},
									start: {
										type: "string",
										nullable: true,
										description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
									},
									prefix: {
										type: "string",
										nullable: true,
										description: "The API Key prefix. Stored as plain text."
									},
									userId: {
										type: "string",
										description: "The owner of the user id"
									},
									refillInterval: {
										type: "number",
										nullable: true,
										description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
									},
									refillAmount: {
										type: "number",
										nullable: true,
										description: "The amount to refill"
									},
									lastRefillAt: {
										type: "string",
										format: "date-time",
										nullable: true,
										description: "The last refill date"
									},
									enabled: {
										type: "boolean",
										description: "Sets if key is enabled or disabled",
										default: true
									},
									rateLimitEnabled: {
										type: "boolean",
										description: "Whether the key has rate limiting enabled"
									},
									rateLimitTimeWindow: {
										type: "number",
										nullable: true,
										description: "The duration in milliseconds"
									},
									rateLimitMax: {
										type: "number",
										nullable: true,
										description: "Maximum amount of requests allowed within a window"
									},
									requestCount: {
										type: "number",
										description: "The number of requests made within the rate limit time window"
									},
									remaining: {
										type: "number",
										nullable: true,
										description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
									},
									lastRequest: {
										type: "string",
										format: "date-time",
										nullable: true,
										description: "When last request occurred"
									},
									expiresAt: {
										type: "string",
										format: "date-time",
										nullable: true,
										description: "Expiry date of a key"
									},
									createdAt: {
										type: "string",
										format: "date-time",
										description: "created at"
									},
									updatedAt: {
										type: "string",
										format: "date-time",
										description: "updated at"
									},
									metadata: {
										type: "object",
										nullable: true,
										additionalProperties: true,
										description: "Extra metadata about the apiKey"
									},
									permissions: {
										type: "string",
										nullable: true,
										description: "Permissions for the api key (stored as JSON string)"
									}
								},
								required: [
									"id",
									"userId",
									"enabled",
									"rateLimitEnabled",
									"requestCount",
									"createdAt",
									"updatedAt"
								]
							}
						},
						total: {
							type: "number",
							description: "Total number of API keys"
						},
						limit: {
							type: "number",
							nullable: true,
							description: "The limit used for pagination"
						},
						offset: {
							type: "number",
							nullable: true,
							description: "The offset used for pagination"
						}
					},
					required: ["apiKeys", "total"]
				} } }
			} }
		} }
	}, async (ctx) => {
		const session = ctx.context.session;
		const limit = ctx.query?.limit != null ? Number(ctx.query.limit) : void 0;
		const offset = ctx.query?.offset != null ? Number(ctx.query.offset) : void 0;
		const { apiKeys, total } = await listApiKeys$1(ctx, session.user.id, opts, {
			limit,
			offset,
			sortBy: ctx.query?.sortBy,
			sortDirection: ctx.query?.sortDirection
		});
		deleteAllExpiredApiKeys(ctx.context);
		const returningApiKeys = apiKeys.map((apiKey) => {
			const { key: _key, ...rest } = apiKey;
			return {
				...rest,
				metadata: parseDoubleStringifiedMetadata(apiKey.metadata),
				permissions: rest.permissions ? safeJSONParse(rest.permissions) : null
			};
		});
		await ctx.context.runInBackgroundOrAwait(batchMigrateLegacyMetadata(ctx, apiKeys, opts));
		return ctx.json({
			apiKeys: returningApiKeys,
			total,
			limit,
			offset
		});
	});
}
var updateApiKeyBodySchema = object({
	keyId: string().meta({ description: "The id of the Api Key" }),
	userId: string$1().meta({ description: "The id of the user which the api key belongs to. server-only. Eg: \"some-user-id\"" }).optional(),
	name: string().meta({ description: "The name of the key" }).optional(),
	enabled: boolean().meta({ description: "Whether the Api Key is enabled or not" }).optional(),
	remaining: number().meta({ description: "The number of remaining requests" }).min(1).optional(),
	refillAmount: number().meta({ description: "The refill amount" }).optional(),
	refillInterval: number().meta({ description: "The refill interval" }).optional(),
	metadata: any().optional(),
	expiresIn: number().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable(),
	rateLimitEnabled: boolean().meta({ description: "Whether the key has rate limiting enabled." }).optional(),
	rateLimitTimeWindow: number().meta({ description: "The duration in milliseconds where each request is counted. server-only. Eg: 1000" }).optional(),
	rateLimitMax: number().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
	permissions: record(string(), array(string())).meta({ description: "Update the permissions on the API Key. server-only." }).optional().nullable()
});
function updateApiKey({ opts, schema, deleteAllExpiredApiKeys }) {
	return createAuthEndpoint("/api-key/update", {
		method: "POST",
		body: updateApiKeyBodySchema,
		metadata: { openapi: {
			description: "Update an existing API key by ID",
			responses: { "200": {
				description: "API key updated successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "ID"
						},
						name: {
							type: "string",
							nullable: true,
							description: "The name of the key"
						},
						start: {
							type: "string",
							nullable: true,
							description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
						},
						prefix: {
							type: "string",
							nullable: true,
							description: "The API Key prefix. Stored as plain text."
						},
						userId: {
							type: "string",
							description: "The owner of the user id"
						},
						refillInterval: {
							type: "number",
							nullable: true,
							description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
						},
						refillAmount: {
							type: "number",
							nullable: true,
							description: "The amount to refill"
						},
						lastRefillAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "The last refill date"
						},
						enabled: {
							type: "boolean",
							description: "Sets if key is enabled or disabled",
							default: true
						},
						rateLimitEnabled: {
							type: "boolean",
							description: "Whether the key has rate limiting enabled"
						},
						rateLimitTimeWindow: {
							type: "number",
							nullable: true,
							description: "The duration in milliseconds"
						},
						rateLimitMax: {
							type: "number",
							nullable: true,
							description: "Maximum amount of requests allowed within a window"
						},
						requestCount: {
							type: "number",
							description: "The number of requests made within the rate limit time window"
						},
						remaining: {
							type: "number",
							nullable: true,
							description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
						},
						lastRequest: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "When last request occurred"
						},
						expiresAt: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Expiry date of a key"
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "created at"
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							description: "updated at"
						},
						metadata: {
							type: "object",
							nullable: true,
							additionalProperties: true,
							description: "Extra metadata about the apiKey"
						},
						permissions: {
							type: "string",
							nullable: true,
							description: "Permissions for the api key (stored as JSON string)"
						}
					},
					required: [
						"id",
						"userId",
						"enabled",
						"rateLimitEnabled",
						"requestCount",
						"createdAt",
						"updatedAt"
					]
				} } }
			} }
		} }
	}, async (ctx) => {
		const { keyId, expiresIn, enabled, metadata, refillAmount, refillInterval, remaining, name, permissions, rateLimitEnabled, rateLimitTimeWindow, rateLimitMax } = ctx.body;
		const session = await getSessionFromCtx(ctx);
		const authRequired = ctx.request || ctx.headers;
		const user = authRequired && !session ? null : session?.user || { id: ctx.body.userId };
		if (!user?.id) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
		if (session && ctx.body.userId && session?.user.id !== ctx.body.userId) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.UNAUTHORIZED_SESSION);
		if (authRequired) {
			if (refillAmount !== void 0 || refillInterval !== void 0 || rateLimitMax !== void 0 || rateLimitTimeWindow !== void 0 || rateLimitEnabled !== void 0 || remaining !== void 0 || permissions !== void 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.SERVER_ONLY_PROPERTY);
		}
		let apiKey = null;
		apiKey = await getApiKeyById(ctx, keyId, opts);
		if (apiKey && apiKey.userId !== user.id) apiKey = null;
		if (!apiKey) throw APIError.from("NOT_FOUND", API_KEY_ERROR_CODES.KEY_NOT_FOUND);
		const newValues = {};
		if (name !== void 0) {
			if (name.length < opts.minimumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
			else if (name.length > opts.maximumNameLength) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_NAME_LENGTH);
			newValues.name = name;
		}
		if (enabled !== void 0) newValues.enabled = enabled;
		if (expiresIn !== void 0) {
			if (opts.keyExpiration.disableCustomExpiresTime === true) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.KEY_DISABLED_EXPIRATION);
			if (expiresIn !== null) {
				const expiresIn_in_days = expiresIn / (3600 * 24);
				if (expiresIn_in_days < opts.keyExpiration.minExpiresIn) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_SMALL);
				else if (expiresIn_in_days > opts.keyExpiration.maxExpiresIn) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.EXPIRES_IN_IS_TOO_LARGE);
			}
			newValues.expiresAt = expiresIn ? getDate(expiresIn, "sec") : null;
		}
		if (metadata !== void 0 && opts.enableMetadata === true) {
			if (typeof metadata !== "object") throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_METADATA_TYPE);
			newValues.metadata = metadata;
		}
		if (remaining !== void 0) newValues.remaining = remaining;
		if (refillAmount !== void 0 || refillInterval !== void 0) {
			if (refillAmount !== void 0 && refillInterval === void 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.REFILL_AMOUNT_AND_INTERVAL_REQUIRED);
			else if (refillInterval !== void 0 && refillAmount === void 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.REFILL_INTERVAL_AND_AMOUNT_REQUIRED);
			newValues.refillAmount = refillAmount;
			newValues.refillInterval = refillInterval;
		}
		if (rateLimitEnabled !== void 0) newValues.rateLimitEnabled = rateLimitEnabled;
		if (rateLimitTimeWindow !== void 0) newValues.rateLimitTimeWindow = rateLimitTimeWindow;
		if (rateLimitMax !== void 0) newValues.rateLimitMax = rateLimitMax;
		if (permissions !== void 0) newValues.permissions = JSON.stringify(permissions);
		if (Object.keys(newValues).length === 0) throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.NO_VALUES_TO_UPDATE);
		let newApiKey = apiKey;
		try {
			if (opts.storage === "secondary-storage" && opts.fallbackToDatabase) {
				const dbUpdated = await ctx.context.adapter.update({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}],
					update: newValues
				});
				if (dbUpdated) {
					await setApiKey(ctx, dbUpdated, opts);
					newApiKey = dbUpdated;
				}
			} else if (opts.storage === "database") {
				const result = await ctx.context.adapter.update({
					model: API_KEY_TABLE_NAME,
					where: [{
						field: "id",
						value: apiKey.id
					}],
					update: newValues
				});
				if (result) newApiKey = result;
			} else {
				const updated = {
					...apiKey,
					...newValues,
					updatedAt: /* @__PURE__ */ new Date()
				};
				await setApiKey(ctx, updated, opts);
				newApiKey = updated;
			}
		} catch (error) {
			throw APIError.fromStatus("INTERNAL_SERVER_ERROR", { message: error?.message });
		}
		deleteAllExpiredApiKeys(ctx.context);
		const migratedMetadata = await migrateDoubleStringifiedMetadata(ctx, newApiKey, opts);
		const { key: _key, ...returningApiKey } = newApiKey;
		return ctx.json({
			...returningApiKey,
			metadata: migratedMetadata,
			permissions: returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null
		});
	});
}
var lastChecked = null;
async function deleteAllExpiredApiKeys(ctx, byPassLastCheckTime = false) {
	if (lastChecked && !byPassLastCheckTime) {
		if ((/* @__PURE__ */ new Date()).getTime() - lastChecked.getTime() < 1e4) return;
	}
	lastChecked = /* @__PURE__ */ new Date();
	await ctx.adapter.deleteMany({
		model: API_KEY_TABLE_NAME,
		where: [{
			field: "expiresAt",
			operator: "lt",
			value: /* @__PURE__ */ new Date()
		}, {
			field: "expiresAt",
			operator: "ne",
			value: null
		}]
	}).catch((error) => {
		ctx.logger.error(`Failed to delete expired API keys:`, error);
	});
}
function createApiKeyRoutes({ keyGenerator, opts, schema }) {
	return {
		createApiKey: createApiKey({
			keyGenerator,
			opts,
			schema,
			deleteAllExpiredApiKeys
		}),
		verifyApiKey: verifyApiKey({
			opts,
			schema,
			deleteAllExpiredApiKeys
		}),
		getApiKey: getApiKey({
			opts,
			schema,
			deleteAllExpiredApiKeys
		}),
		updateApiKey: updateApiKey({
			opts,
			schema,
			deleteAllExpiredApiKeys
		}),
		deleteApiKey: deleteApiKey({
			opts,
			schema,
			deleteAllExpiredApiKeys
		}),
		listApiKeys: listApiKeys({
			opts,
			schema,
			deleteAllExpiredApiKeys
		}),
		deleteAllExpiredApiKeys: deleteAllExpiredApiKeysEndpoint({ deleteAllExpiredApiKeys })
	};
}
var PROTO_POLLUTION_PATTERNS = {
	proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	protoShort: /"__proto__"\s*:/,
	constructorShort: /"constructor"\s*:/
};
var JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var SPECIAL_VALUES = {
	true: true,
	false: false,
	null: null,
	undefined: void 0,
	nan: NaN,
	infinity: Number.POSITIVE_INFINITY,
	"-infinity": Number.NEGATIVE_INFINITY
};
var ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
	return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
	const match = ISO_DATE_REGEX.exec(value);
	if (!match) return null;
	const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
	const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
	if (offsetSign) {
		const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
		date.setUTCMinutes(date.getUTCMinutes() + offset);
	}
	return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
	const { strict = false, warnings = false, reviver, parseDates = true } = options;
	if (typeof value !== "string") return value;
	const trimmed = value.trim();
	if (trimmed.length > 0 && trimmed[0] === "\"" && trimmed.endsWith("\"") && !trimmed.slice(1, -1).includes("\"")) return trimmed.slice(1, -1);
	const lowerValue = trimmed.toLowerCase();
	if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
	if (!JSON_SIGNATURE.test(trimmed)) {
		if (strict) throw new SyntaxError("[better-json] Invalid JSON");
		return value;
	}
	if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
		const matches = pattern.test(trimmed);
		if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
		return matches;
	}) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
	try {
		const secureReviver = (key, value) => {
			if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
				if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
				return;
			}
			if (parseDates && typeof value === "string") {
				const date = parseISODate(value);
				if (date) return date;
			}
			return reviver ? reviver(key, value) : value;
		};
		return JSON.parse(trimmed, secureReviver);
	} catch (error) {
		if (strict) throw error;
		return value;
	}
}
function parseJSON(value, options = { strict: true }) {
	return betterJSONParse(value, options);
}
var apiKeySchema = ({ timeWindow, rateLimitMax }) => ({ apikey: { fields: {
	name: {
		type: "string",
		required: false,
		input: false
	},
	start: {
		type: "string",
		required: false,
		input: false
	},
	prefix: {
		type: "string",
		required: false,
		input: false
	},
	key: {
		type: "string",
		required: true,
		input: false,
		index: true
	},
	userId: {
		type: "string",
		references: {
			model: "user",
			field: "id",
			onDelete: "cascade"
		},
		required: true,
		input: false,
		index: true
	},
	refillInterval: {
		type: "number",
		required: false,
		input: false
	},
	refillAmount: {
		type: "number",
		required: false,
		input: false
	},
	lastRefillAt: {
		type: "date",
		required: false,
		input: false
	},
	enabled: {
		type: "boolean",
		required: false,
		input: false,
		defaultValue: true
	},
	rateLimitEnabled: {
		type: "boolean",
		required: false,
		input: false,
		defaultValue: true
	},
	rateLimitTimeWindow: {
		type: "number",
		required: false,
		input: false,
		defaultValue: timeWindow
	},
	rateLimitMax: {
		type: "number",
		required: false,
		input: false,
		defaultValue: rateLimitMax
	},
	requestCount: {
		type: "number",
		required: false,
		input: false,
		defaultValue: 0
	},
	remaining: {
		type: "number",
		required: false,
		input: false
	},
	lastRequest: {
		type: "date",
		required: false,
		input: false
	},
	expiresAt: {
		type: "date",
		required: false,
		input: false
	},
	createdAt: {
		type: "date",
		required: true,
		input: false
	},
	updatedAt: {
		type: "date",
		required: true,
		input: false
	},
	permissions: {
		type: "string",
		required: false,
		input: false
	},
	metadata: {
		type: "string",
		required: false,
		input: true,
		transform: {
			input(value) {
				return JSON.stringify(value);
			},
			output(value) {
				if (!value) return null;
				return parseJSON(value);
			}
		}
	}
} } });
var defaultKeyHasher$1 = async (key) => {
	const hash = await createHash("SHA-256").digest(new TextEncoder().encode(key));
	return base64Url.encode(new Uint8Array(hash), { padding: false });
};
var API_KEY_TABLE_NAME = "apikey";
var apiKey = (options) => {
	const opts = {
		...options,
		apiKeyHeaders: options?.apiKeyHeaders ?? "x-api-key",
		defaultKeyLength: options?.defaultKeyLength || 64,
		maximumPrefixLength: options?.maximumPrefixLength ?? 32,
		minimumPrefixLength: options?.minimumPrefixLength ?? 1,
		maximumNameLength: options?.maximumNameLength ?? 32,
		minimumNameLength: options?.minimumNameLength ?? 1,
		enableMetadata: options?.enableMetadata ?? false,
		disableKeyHashing: options?.disableKeyHashing ?? false,
		requireName: options?.requireName ?? false,
		storage: options?.storage ?? "database",
		rateLimit: {
			enabled: options?.rateLimit?.enabled === void 0 ? true : options?.rateLimit?.enabled,
			timeWindow: options?.rateLimit?.timeWindow ?? 1e3 * 60 * 60 * 24,
			maxRequests: options?.rateLimit?.maxRequests ?? 10
		},
		keyExpiration: {
			defaultExpiresIn: options?.keyExpiration?.defaultExpiresIn ?? null,
			disableCustomExpiresTime: options?.keyExpiration?.disableCustomExpiresTime ?? false,
			maxExpiresIn: options?.keyExpiration?.maxExpiresIn ?? 365,
			minExpiresIn: options?.keyExpiration?.minExpiresIn ?? 1
		},
		startingCharactersConfig: {
			shouldStore: options?.startingCharactersConfig?.shouldStore ?? true,
			charactersLength: options?.startingCharactersConfig?.charactersLength ?? 6
		},
		enableSessionForAPIKeys: options?.enableSessionForAPIKeys ?? false,
		fallbackToDatabase: options?.fallbackToDatabase ?? false,
		customStorage: options?.customStorage,
		deferUpdates: options?.deferUpdates ?? false
	};
	const schema = mergeSchema(apiKeySchema({
		rateLimitMax: opts.rateLimit.maxRequests,
		timeWindow: opts.rateLimit.timeWindow
	}), opts.schema);
	const getter = opts.customAPIKeyGetter || ((ctx) => {
		if (Array.isArray(opts.apiKeyHeaders)) for (const header of opts.apiKeyHeaders) {
			const value = ctx.headers?.get(header);
			if (value) return value;
		}
		else return ctx.headers?.get(opts.apiKeyHeaders);
	});
	const routes = createApiKeyRoutes({
		keyGenerator: opts.customKeyGenerator || (async (options) => {
			const key = generateRandomString(options.length, "a-z", "A-Z");
			return `${options.prefix || ""}${key}`;
		}),
		opts,
		schema
	});
	return {
		id: "api-key",
		$ERROR_CODES: API_KEY_ERROR_CODES,
		hooks: { before: [{
			matcher: (ctx) => !!getter(ctx) && opts.enableSessionForAPIKeys,
			handler: createAuthMiddleware(async (ctx) => {
				const key = getter(ctx);
				if (typeof key !== "string") throw APIError.from("BAD_REQUEST", API_KEY_ERROR_CODES.INVALID_API_KEY_GETTER_RETURN_TYPE);
				if (key.length < opts.defaultKeyLength) throw APIError.from("FORBIDDEN", API_KEY_ERROR_CODES.INVALID_API_KEY);
				if (opts.customAPIKeyValidator) {
					if (!await opts.customAPIKeyValidator({
						ctx,
						key
					})) throw APIError.from("FORBIDDEN", API_KEY_ERROR_CODES.INVALID_API_KEY);
				}
				const apiKey = await validateApiKey({
					hashedKey: opts.disableKeyHashing ? key : await defaultKeyHasher$1(key),
					ctx,
					opts,
					schema
				});
				const cleanupTask = deleteAllExpiredApiKeys(ctx.context).catch((err) => {
					ctx.context.logger.error("Failed to delete expired API keys:", err);
				});
				if (opts.deferUpdates) ctx.context.runInBackground(cleanupTask);
				const user = await ctx.context.internalAdapter.findUserById(apiKey.userId);
				if (!user) throw APIError.from("UNAUTHORIZED", API_KEY_ERROR_CODES.INVALID_USER_ID_FROM_API_KEY);
				const session = {
					user,
					session: {
						id: apiKey.id,
						token: key,
						userId: apiKey.userId,
						userAgent: ctx.request?.headers.get("user-agent") ?? null,
						ipAddress: ctx.request ? getIp(ctx.request, ctx.context.options) : null,
						createdAt: /* @__PURE__ */ new Date(),
						updatedAt: /* @__PURE__ */ new Date(),
						expiresAt: apiKey.expiresAt || getDate(ctx.context.options.session?.expiresIn || 3600 * 24 * 7, "ms")
					}
				};
				ctx.context.session = session;
				if (ctx.path === "/get-session") return session;
				else return { context: ctx };
			})
		}] },
		endpoints: {
			createApiKey: routes.createApiKey,
			verifyApiKey: routes.verifyApiKey,
			getApiKey: routes.getApiKey,
			updateApiKey: routes.updateApiKey,
			deleteApiKey: routes.deleteApiKey,
			listApiKeys: routes.listApiKeys,
			deleteAllExpiredApiKeys: routes.deleteAllExpiredApiKeys
		},
		schema,
		options
	};
};
var Providers = {
	CLOUDFLARE_TURNSTILE: "cloudflare-turnstile",
	GOOGLE_RECAPTCHA: "google-recaptcha",
	HCAPTCHA: "hcaptcha",
	CAPTCHAFOX: "captchafox"
};
Providers.CLOUDFLARE_TURNSTILE, Providers.GOOGLE_RECAPTCHA, Providers.HCAPTCHA, Providers.CAPTCHAFOX;
defineErrorCodes({
	VERIFICATION_FAILED: "Captcha verification failed",
	MISSING_RESPONSE: "Missing CAPTCHA response",
	UNKNOWN_ERROR: "Something went wrong"
});
defineErrorCodes({
	MISSING_SECRET_KEY: "Missing secret key",
	SERVICE_UNAVAILABLE: "CAPTCHA service unavailable"
});
optional(object({
	disableCookieCache: boolean().meta({ description: "Disable cookie cache and fetch session from database" }).or(string().transform((v) => v === "true")).optional(),
	disableRefresh: boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
var DEVICE_AUTHORIZATION_ERROR_CODES = defineErrorCodes({
	INVALID_DEVICE_CODE: "Invalid device code",
	EXPIRED_DEVICE_CODE: "Device code has expired",
	EXPIRED_USER_CODE: "User code has expired",
	AUTHORIZATION_PENDING: "Authorization pending",
	ACCESS_DENIED: "Access denied",
	INVALID_USER_CODE: "Invalid user code",
	DEVICE_CODE_ALREADY_PROCESSED: "Device code already processed",
	POLLING_TOO_FREQUENTLY: "Polling too frequently",
	USER_NOT_FOUND: "User not found",
	FAILED_TO_CREATE_SESSION: "Failed to create session",
	INVALID_DEVICE_CODE_STATUS: "Invalid device code status",
	AUTHENTICATION_REQUIRED: "Authentication required"
});
object({
	client_id: string().meta({ description: "The client ID of the application" }),
	scope: string().meta({ description: "Space-separated list of scopes" }).optional()
});
object({
	error: _enum(["invalid_request", "invalid_client"]).meta({ description: "Error code" }),
	error_description: string().meta({ description: "Detailed error description" })
});
object({
	grant_type: literal("urn:ietf:params:oauth:grant-type:device_code").meta({ description: "The grant type for device flow" }),
	device_code: string().meta({ description: "The device verification code" }),
	client_id: string().meta({ description: "The client ID of the application" })
});
object({
	error: _enum([
		"authorization_pending",
		"slow_down",
		"expired_token",
		"access_denied",
		"invalid_request",
		"invalid_grant"
	]).meta({ description: "Error code" }),
	error_description: string().meta({ description: "Detailed error description" })
});
createAuthEndpoint("/device", {
	method: "GET",
	query: object({ user_code: string().meta({ description: "The user code to verify" }) }),
	error: object({
		error: _enum(["invalid_request"]).meta({ description: "Error code" }),
		error_description: string().meta({ description: "Detailed error description" })
	}),
	metadata: { openapi: {
		description: "Verify user code and get device authorization status",
		responses: { 200: {
			description: "Device authorization status",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user_code: {
						type: "string",
						description: "The user code to verify"
					},
					status: {
						type: "string",
						enum: [
							"pending",
							"approved",
							"denied"
						],
						description: "Current status of the device authorization"
					}
				}
			} } }
		} }
	} }
}, async (ctx) => {
	const { user_code } = ctx.query;
	const cleanUserCode = user_code.replace(/-/g, "");
	const deviceCodeRecord = await ctx.context.adapter.findOne({
		model: "deviceCode",
		where: [{
			field: "userCode",
			value: cleanUserCode
		}]
	});
	if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
		error: "invalid_request",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE.message
	});
	if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
		error: "expired_token",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE.message
	});
	return ctx.json({
		user_code,
		status: deviceCodeRecord.status
	});
});
createAuthEndpoint("/device/approve", {
	method: "POST",
	body: object({ userCode: string().meta({ description: "The user code to approve" }) }),
	error: object({
		error: _enum([
			"invalid_request",
			"expired_token",
			"device_code_already_processed",
			"unauthorized",
			"access_denied"
		]).meta({ description: "Error code" }),
		error_description: string().meta({ description: "Detailed error description" })
	}),
	requireHeaders: true,
	metadata: { openapi: {
		description: "Approve device authorization",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { success: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session) throw new APIError("UNAUTHORIZED", {
		error: "unauthorized",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.AUTHENTICATION_REQUIRED.message
	});
	const { userCode } = ctx.body;
	const cleanUserCode = userCode.replace(/-/g, "");
	const deviceCodeRecord = await ctx.context.adapter.findOne({
		model: "deviceCode",
		where: [{
			field: "userCode",
			value: cleanUserCode
		}]
	});
	if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
		error: "invalid_request",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE.message
	});
	if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
		error: "expired_token",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE.message
	});
	if (deviceCodeRecord.status !== "pending") throw new APIError("BAD_REQUEST", {
		error: "invalid_request",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED.message
	});
	if (deviceCodeRecord.userId && deviceCodeRecord.userId !== session.user.id) throw new APIError("FORBIDDEN", {
		error: "access_denied",
		error_description: "You are not authorized to approve this device authorization"
	});
	await ctx.context.adapter.update({
		model: "deviceCode",
		where: [{
			field: "id",
			value: deviceCodeRecord.id
		}],
		update: {
			status: "approved",
			userId: session.user.id
		}
	});
	return ctx.json({ success: true });
});
createAuthEndpoint("/device/deny", {
	method: "POST",
	body: object({ userCode: string().meta({ description: "The user code to deny" }) }),
	error: object({
		error: _enum([
			"invalid_request",
			"expired_token",
			"unauthorized",
			"access_denied"
		]).meta({ description: "Error code" }),
		error_description: string().meta({ description: "Detailed error description" })
	}),
	requireHeaders: true,
	metadata: { openapi: {
		description: "Deny device authorization",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { success: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session) throw new APIError("UNAUTHORIZED", {
		error: "unauthorized",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.AUTHENTICATION_REQUIRED.message
	});
	const { userCode } = ctx.body;
	const cleanUserCode = userCode.replace(/-/g, "");
	const deviceCodeRecord = await ctx.context.adapter.findOne({
		model: "deviceCode",
		where: [{
			field: "userCode",
			value: cleanUserCode
		}]
	});
	if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
		error: "invalid_request",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE.message
	});
	if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
		error: "expired_token",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE.message
	});
	if (deviceCodeRecord.status !== "pending") throw new APIError("BAD_REQUEST", {
		error: "invalid_request",
		error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED.message
	});
	if (deviceCodeRecord.userId && deviceCodeRecord.userId !== session.user.id) throw new APIError("FORBIDDEN", {
		error: "access_denied",
		error_description: "You are not authorized to deny this device authorization"
	});
	await ctx.context.adapter.update({
		model: "deviceCode",
		where: [{
			field: "id",
			value: deviceCodeRecord.id
		}],
		update: {
			status: "denied",
			userId: deviceCodeRecord.userId || session.user.id
		}
	});
	return ctx.json({ success: true });
});
object({
	id: string(),
	deviceCode: string(),
	userCode: string(),
	userId: string().optional(),
	expiresAt: date(),
	status: string(),
	lastPolledAt: date().optional(),
	pollingInterval: number().optional(),
	clientId: string().optional(),
	scope: string().optional()
});
var timeStringSchema = custom((val) => {
	if (typeof val !== "string") return false;
	try {
		ms(val);
		return true;
	} catch {
		return false;
	}
}, { message: "Invalid time string format. Use formats like '30m', '5s', '1h', etc." });
object({
	expiresIn: timeStringSchema.default("30m").describe("Time in seconds until the device code expires. Use formats like '30m', '5s', '1h', etc."),
	interval: timeStringSchema.default("5s").describe("Time in seconds between polling attempts. Use formats like '30m', '5s', '1h', etc."),
	deviceCodeLength: number().int().positive().default(40).describe("Length of the device code to be generated. Default is 40 characters."),
	userCodeLength: number().int().positive().default(8).describe("Length of the user code to be generated. Default is 8 characters."),
	generateDeviceCode: custom((val) => typeof val === "function", { message: "generateDeviceCode must be a function that returns a string or a promise that resolves to a string." }).optional().describe("Function to generate a device code. If not provided, a default random string generator will be used."),
	generateUserCode: custom((val) => typeof val === "function", { message: "generateUserCode must be a function that returns a string or a promise that resolves to a string." }).optional().describe("Function to generate a user code. If not provided, a default random string generator will be used."),
	validateClient: custom((val) => typeof val === "function", { message: "validateClient must be a function that returns a boolean or a promise that resolves to a boolean." }).optional().describe("Function to validate the client ID. If not provided, no validation will be performed."),
	onDeviceAuthRequest: custom((val) => typeof val === "function", { message: "onDeviceAuthRequest must be a function that returns void or a promise that resolves to void." }).optional().describe("Function to handle device authorization requests. If not provided, no additional actions will be taken."),
	verificationUri: string().optional().describe("The URI where users verify their device code. Can be an absolute URL (https://example.com/device) or relative path (/custom-path). This will be returned as verification_uri in the device code response. If not provided, defaults to /device."),
	schema: custom(() => true)
});
defineErrorCodes({
	OTP_EXPIRED: "OTP expired",
	INVALID_OTP: "Invalid OTP",
	TOO_MANY_ATTEMPTS: "Too many attempts"
});
var types = [
	"email-verification",
	"sign-in",
	"forget-password"
];
object({
	email: string({}).meta({ description: "Email address to send the OTP" }),
	type: _enum(types).meta({ description: "Type of the OTP" })
});
object({
	email: string({}).meta({ description: "Email address to send the OTP" }),
	type: _enum(types).meta({
		required: true,
		description: "Type of the OTP"
	})
});
object({
	email: string({}).meta({ description: "Email address the OTP was sent to" }),
	type: _enum(types).meta({
		required: true,
		description: "Type of the OTP"
	})
});
object({
	email: string().meta({ description: "Email address the OTP was sent to" }),
	type: _enum(types).meta({
		required: true,
		description: "Type of the OTP"
	}),
	otp: string().meta({
		required: true,
		description: "OTP to verify"
	})
});
object({
	email: string({}).meta({ description: "Email address to verify" }),
	otp: string().meta({
		required: true,
		description: "OTP to verify"
	})
});
object({
	email: string({}).meta({ description: "Email address to sign in" }),
	otp: string().meta({
		required: true,
		description: "OTP sent to the email"
	})
});
object({ email: string().meta({ description: "Email address to send the OTP" }) });
object({ email: string().meta({ description: "Email address to send the OTP" }) });
object({
	email: string().meta({ description: "Email address to reset the password" }),
	otp: string().meta({ description: "OTP sent to the email" }),
	password: string().meta({ description: "New password" })
});
var GENERIC_OAUTH_ERROR_CODES = defineErrorCodes({
	INVALID_OAUTH_CONFIGURATION: "Invalid OAuth configuration",
	TOKEN_URL_NOT_FOUND: "Invalid OAuth configuration. Token URL not found.",
	PROVIDER_CONFIG_NOT_FOUND: "No config found for provider",
	PROVIDER_ID_REQUIRED: "Provider ID is required",
	INVALID_OAUTH_CONFIG: "Invalid OAuth configuration.",
	SESSION_REQUIRED: "Session is required",
	ISSUER_MISMATCH: "OAuth issuer mismatch. The authorization server issuer does not match the expected value (RFC 9207).",
	ISSUER_MISSING: "OAuth issuer parameter missing. The authorization server did not include the required iss parameter (RFC 9207)."
});
var signInWithOAuth2BodySchema = object({
	providerId: string().meta({ description: "The provider ID for the OAuth provider" }),
	callbackURL: string().meta({ description: "The URL to redirect to after sign in" }).optional(),
	errorCallbackURL: string().meta({ description: "The URL to redirect to if an error occurs" }).optional(),
	newUserCallbackURL: string().meta({ description: "The URL to redirect to after login if the user is new. Eg: \"/welcome\"" }).optional(),
	disableRedirect: boolean().meta({ description: "Disable redirect" }).optional(),
	scopes: array(string()).meta({ description: "Scopes to be passed to the provider authorization request." }).optional(),
	requestSignUp: boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. Eg: false" }).optional(),
	additionalData: record(string(), any()).optional()
});
/**
* ### Endpoint
*
* POST `/sign-in/oauth2`
*
* ### API Methods
*
* **server:**
* `auth.api.signInWithOAuth2`
*
* **client:**
* `authClient.signIn.oauth2`
*
* @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/sign-in#api-method-sign-in-oauth2)
*/
var signInWithOAuth2 = (options) => createAuthEndpoint("/sign-in/oauth2", {
	method: "POST",
	body: signInWithOAuth2BodySchema,
	metadata: { openapi: {
		description: "Sign in with OAuth2",
		responses: { 200: {
			description: "Sign in with OAuth2",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					url: { type: "string" },
					redirect: { type: "boolean" }
				}
			} } }
		} }
	} }
}, async (ctx) => {
	const { providerId } = ctx.body;
	const config = options.config.find((c) => c.providerId === providerId);
	if (!config) throw APIError.fromStatus("BAD_REQUEST", { message: `${GENERIC_OAUTH_ERROR_CODES.PROVIDER_CONFIG_NOT_FOUND} ${providerId}` });
	const { discoveryUrl, authorizationUrl, tokenUrl, clientId, clientSecret, scopes, redirectURI, responseType, pkce, prompt, accessType, authorizationUrlParams, responseMode } = config;
	let finalAuthUrl = authorizationUrl;
	let finalTokenUrl = tokenUrl;
	if (discoveryUrl) {
		const discovery = await betterFetch(discoveryUrl, {
			method: "GET",
			headers: config.discoveryHeaders,
			onError(context) {
				ctx.context.logger.error(context.error.message, context.error, { discoveryUrl });
			}
		});
		if (discovery.data) {
			finalAuthUrl = discovery.data.authorization_endpoint;
			finalTokenUrl = discovery.data.token_endpoint;
		}
	}
	if (!finalAuthUrl || !finalTokenUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
	if (authorizationUrlParams) {
		const withAdditionalParams = new URL(finalAuthUrl);
		for (const [paramName, paramValue] of Object.entries(authorizationUrlParams)) withAdditionalParams.searchParams.set(paramName, paramValue);
		finalAuthUrl = withAdditionalParams.toString();
	}
	const additionalParams = typeof authorizationUrlParams === "function" ? authorizationUrlParams(ctx) : authorizationUrlParams;
	const { state, codeVerifier } = await generateState(ctx, void 0, ctx.body.additionalData);
	const authUrl = await createAuthorizationURL({
		id: providerId,
		options: {
			clientId,
			clientSecret,
			redirectURI
		},
		authorizationEndpoint: finalAuthUrl,
		state,
		codeVerifier: pkce ? codeVerifier : void 0,
		scopes: ctx.body.scopes ? [...ctx.body.scopes, ...scopes || []] : scopes || [],
		redirectURI: `${ctx.context.baseURL}/oauth2/callback/${providerId}`,
		prompt,
		accessType,
		responseType,
		responseMode,
		additionalParams
	});
	return ctx.json({
		url: authUrl.toString(),
		redirect: !ctx.body.disableRedirect
	});
});
var OAuth2CallbackQuerySchema = object({
	code: string().meta({ description: "The OAuth2 code" }).optional(),
	error: string().meta({ description: "The error message, if any" }).optional(),
	error_description: string().meta({ description: "The error description, if any" }).optional(),
	state: string().meta({ description: "The state parameter from the OAuth2 request" }).optional(),
	iss: string().meta({ description: "The issuer identifier" }).optional()
});
var oAuth2Callback = (options) => createAuthEndpoint("/oauth2/callback/:providerId", {
	method: "GET",
	query: OAuth2CallbackQuerySchema,
	metadata: {
		...HIDE_METADATA,
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		openapi: {
			description: "OAuth2 callback",
			responses: { 200: {
				description: "OAuth2 callback",
				content: { "application/json": { schema: {
					type: "object",
					properties: { url: { type: "string" } }
				} } }
			} }
		}
	}
}, async (ctx) => {
	const defaultErrorURL = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
	if (ctx.query.error || !ctx.query.code) throw ctx.redirect(`${defaultErrorURL}?error=${ctx.query.error || "oAuth_code_missing"}&error_description=${ctx.query.error_description}`);
	const providerId = ctx.params?.providerId;
	if (!providerId) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.PROVIDER_ID_REQUIRED);
	const providerConfig = options.config.find((p) => p.providerId === providerId);
	if (!providerConfig) throw APIError.fromStatus("BAD_REQUEST", { message: `${GENERIC_OAUTH_ERROR_CODES.PROVIDER_CONFIG_NOT_FOUND} ${providerId}` });
	let tokens = void 0;
	const { callbackURL, codeVerifier, errorURL, requestSignUp, newUserURL, link } = await parseState(ctx);
	const code = ctx.query.code;
	function redirectOnError(error) {
		const defaultErrorURL = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
		let url = errorURL || defaultErrorURL;
		if (url.includes("?")) url = `${url}&error=${error}`;
		else url = `${url}?error=${error}`;
		throw ctx.redirect(url);
	}
	let finalTokenUrl = providerConfig.tokenUrl;
	let finalUserInfoUrl = providerConfig.userInfoUrl;
	let expectedIssuer = providerConfig.issuer;
	if (providerConfig.discoveryUrl) {
		const discovery = await betterFetch(providerConfig.discoveryUrl, {
			method: "GET",
			headers: providerConfig.discoveryHeaders
		});
		if (discovery.data) {
			finalTokenUrl = discovery.data.token_endpoint;
			finalUserInfoUrl = discovery.data.userinfo_endpoint;
			if (!expectedIssuer && discovery.data.issuer) expectedIssuer = discovery.data.issuer;
		}
	}
	if (expectedIssuer) {
		if (ctx.query.iss) {
			if (ctx.query.iss !== expectedIssuer) {
				ctx.context.logger.error("OAuth issuer mismatch", {
					expected: expectedIssuer,
					received: ctx.query.iss
				});
				return redirectOnError("issuer_mismatch");
			}
		} else if (providerConfig.requireIssuerValidation) {
			ctx.context.logger.error("OAuth issuer parameter missing", { expected: expectedIssuer });
			return redirectOnError("issuer_missing");
		}
	}
	try {
		if (providerConfig.getToken) tokens = await providerConfig.getToken({
			code,
			redirectURI: `${ctx.context.baseURL}/oauth2/callback/${providerConfig.providerId}`,
			codeVerifier: providerConfig.pkce ? codeVerifier : void 0
		});
		else {
			if (!finalTokenUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIG);
			const additionalParams = typeof providerConfig.tokenUrlParams === "function" ? providerConfig.tokenUrlParams(ctx) : providerConfig.tokenUrlParams;
			tokens = await validateAuthorizationCode({
				headers: providerConfig.authorizationHeaders,
				code,
				codeVerifier: providerConfig.pkce ? codeVerifier : void 0,
				redirectURI: `${ctx.context.baseURL}/oauth2/callback/${providerConfig.providerId}`,
				options: {
					clientId: providerConfig.clientId,
					clientSecret: providerConfig.clientSecret,
					redirectURI: providerConfig.redirectURI
				},
				tokenEndpoint: finalTokenUrl,
				authentication: providerConfig.authentication,
				additionalParams
			});
		}
	} catch (e) {
		ctx.context.logger.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
		throw redirectOnError("oauth_code_verification_failed");
	}
	if (!tokens) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIG);
	const userInfo = await (async function handleUserInfo() {
		const userInfo = providerConfig.getUserInfo ? await providerConfig.getUserInfo(tokens) : await getUserInfo(tokens, finalUserInfoUrl);
		if (!userInfo) throw redirectOnError("user_info_is_missing");
		const mapUser = providerConfig.mapProfileToUser ? await providerConfig.mapProfileToUser(userInfo) : userInfo;
		const email = mapUser.email ? mapUser.email.toLowerCase() : userInfo.email?.toLowerCase();
		if (!email) {
			ctx.context.logger.error("Unable to get user info", userInfo);
			throw redirectOnError("email_is_missing");
		}
		const id = mapUser.id ? String(mapUser.id) : String(userInfo.id);
		const name = mapUser.name ? mapUser.name : userInfo.name;
		if (!name) {
			ctx.context.logger.error("Unable to get user info", userInfo);
			throw redirectOnError("name_is_missing");
		}
		return {
			...userInfo,
			...mapUser,
			email,
			id,
			name
		};
	})();
	if (link) {
		if (ctx.context.options.account?.accountLinking?.allowDifferentEmails !== true && link.email !== userInfo.email) return redirectOnError("email_doesn't_match");
		const existingAccount = await ctx.context.internalAdapter.findAccountByProviderId(String(userInfo.id), providerConfig.providerId);
		if (existingAccount) {
			if (existingAccount.userId !== link.userId) return redirectOnError("account_already_linked_to_different_user");
			const updateData = Object.fromEntries(Object.entries({
				accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
				idToken: tokens.idToken,
				refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
				scope: tokens.scopes?.join(",")
			}).filter(([_, value]) => value !== void 0));
			await ctx.context.internalAdapter.updateAccount(existingAccount.id, updateData);
		} else if (!await ctx.context.internalAdapter.createAccount({
			userId: link.userId,
			providerId: providerConfig.providerId,
			accountId: userInfo.id,
			accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
			scope: tokens.scopes?.join(","),
			refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
			idToken: tokens.idToken
		})) return redirectOnError("unable_to_link_account");
		let toRedirectTo;
		try {
			toRedirectTo = callbackURL.toString();
		} catch {
			toRedirectTo = callbackURL;
		}
		throw ctx.redirect(toRedirectTo);
	}
	const result = await handleOAuthUserInfo(ctx, {
		userInfo,
		account: {
			providerId: providerConfig.providerId,
			accountId: userInfo.id,
			...tokens,
			scope: tokens.scopes?.join(",")
		},
		callbackURL,
		disableSignUp: providerConfig.disableImplicitSignUp && !requestSignUp || providerConfig.disableSignUp,
		overrideUserInfo: providerConfig.overrideUserInfo
	});
	if (result.error) return redirectOnError(result.error.split(" ").join("_"));
	const { session, user } = result.data;
	await setSessionCookie(ctx, {
		session,
		user
	});
	let toRedirectTo;
	try {
		toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
	} catch {
		toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
	}
	throw ctx.redirect(toRedirectTo);
});
var OAuth2LinkAccountBodySchema = object({
	providerId: string(),
	callbackURL: string(),
	scopes: array(string()).meta({ description: "Additional scopes to request when linking the account" }).optional(),
	errorCallbackURL: string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional()
});
/**
* ### Endpoint
*
* POST `/oauth2/link`
*
* ### API Methods
*
* **server:**
* `auth.api.oAuth2LinkAccount`
*
* **client:**
* `authClient.oauth2.link`
*
* @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/generic-oauth#api-method-oauth2-link)
*/
var oAuth2LinkAccount = (options) => createAuthEndpoint("/oauth2/link", {
	method: "POST",
	body: OAuth2LinkAccountBodySchema,
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "Link an OAuth2 account to the current user session",
		responses: { "200": {
			description: "Authorization URL generated successfully for linking an OAuth2 account",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					url: {
						type: "string",
						format: "uri",
						description: "The authorization URL to redirect the user to for linking the OAuth2 account"
					},
					redirect: {
						type: "boolean",
						description: "Indicates that the client should redirect to the provided URL",
						enum: [true]
					}
				},
				required: ["url", "redirect"]
			} } }
		} }
	} }
}, async (c) => {
	const session = c.context.session;
	if (!session) throw APIError.from("UNAUTHORIZED", GENERIC_OAUTH_ERROR_CODES.SESSION_REQUIRED);
	const provider = options.config.find((p) => p.providerId === c.body.providerId);
	if (!provider) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	const { providerId, clientId, clientSecret, redirectURI, authorizationUrl, discoveryUrl, pkce, scopes, prompt, accessType, authorizationUrlParams } = provider;
	let finalAuthUrl = authorizationUrl;
	if (!finalAuthUrl) {
		if (!discoveryUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
		const discovery = await betterFetch(discoveryUrl, {
			method: "GET",
			headers: provider.discoveryHeaders,
			onError(context) {
				c.context.logger.error(context.error.message, context.error, { discoveryUrl });
			}
		});
		if (discovery.data) finalAuthUrl = discovery.data.authorization_endpoint;
	}
	if (!finalAuthUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
	const state = await generateState(c, {
		userId: session.user.id,
		email: session.user.email
	}, void 0);
	const additionalParams = typeof authorizationUrlParams === "function" ? authorizationUrlParams(c) : authorizationUrlParams;
	const url = await createAuthorizationURL({
		id: providerId,
		options: {
			clientId,
			clientSecret,
			redirectURI: redirectURI || `${c.context.baseURL}/oauth2/callback/${providerId}`
		},
		authorizationEndpoint: finalAuthUrl,
		state: state.state,
		codeVerifier: pkce ? state.codeVerifier : void 0,
		scopes: c.body.scopes || scopes || [],
		redirectURI: redirectURI || `${c.context.baseURL}/oauth2/callback/${providerId}`,
		prompt,
		accessType,
		additionalParams
	});
	return c.json({
		url: url.toString(),
		redirect: true
	});
});
async function getUserInfo(tokens, finalUserInfoUrl) {
	if (tokens.idToken) {
		const decoded = decodeJwt(tokens.idToken);
		if (decoded) {
			if (decoded.sub && decoded.email) return {
				id: decoded.sub,
				emailVerified: decoded.email_verified,
				image: decoded.picture,
				...decoded
			};
		}
	}
	if (!finalUserInfoUrl) return null;
	const userInfo = await betterFetch(finalUserInfoUrl, {
		method: "GET",
		headers: { Authorization: `Bearer ${tokens.accessToken}` }
	});
	return {
		id: userInfo.data?.sub ?? "",
		emailVerified: userInfo.data?.email_verified ?? false,
		email: userInfo.data?.email,
		image: userInfo.data?.picture,
		name: userInfo.data?.name,
		...userInfo.data
	};
}
/**
* A generic OAuth plugin that can be used to add OAuth support to any provider
*/
var genericOAuth = (options) => {
	const seenIds = /* @__PURE__ */ new Set();
	const nonUniqueIds = /* @__PURE__ */ new Set();
	for (const config of options.config) {
		const id = config.providerId;
		if (seenIds.has(id)) nonUniqueIds.add(id);
		seenIds.add(id);
	}
	if (nonUniqueIds.size > 0) console.warn(`Duplicate provider IDs found: ${Array.from(nonUniqueIds).join(", ")}`);
	return {
		id: "generic-oauth",
		init: (ctx) => {
			return { context: { socialProviders: options.config.map((c) => {
				let finalUserInfoUrl = c.userInfoUrl;
				return {
					id: c.providerId,
					name: c.providerId,
					async createAuthorizationURL(data) {
						let finalAuthUrl = c.authorizationUrl;
						if (!finalAuthUrl && c.discoveryUrl) {
							const discovery = await betterFetch(c.discoveryUrl, {
								method: "GET",
								headers: c.discoveryHeaders
							});
							if (discovery.data) {
								finalAuthUrl = discovery.data.authorization_endpoint;
								finalUserInfoUrl = finalUserInfoUrl ?? discovery.data.userinfo_endpoint;
							}
						}
						if (!finalAuthUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
						return createAuthorizationURL({
							id: c.providerId,
							options: {
								clientId: c.clientId,
								clientSecret: c.clientSecret,
								redirectURI: c.redirectURI
							},
							authorizationEndpoint: finalAuthUrl,
							state: data.state,
							codeVerifier: c.pkce ? data.codeVerifier : void 0,
							scopes: c.scopes || [],
							redirectURI: `${ctx.baseURL}/oauth2/callback/${c.providerId}`
						});
					},
					async validateAuthorizationCode(data) {
						if (c.getToken) return c.getToken(data);
						let finalTokenUrl = c.tokenUrl;
						if (c.discoveryUrl) {
							const discovery = await betterFetch(c.discoveryUrl, {
								method: "GET",
								headers: c.discoveryHeaders
							});
							if (discovery.data) {
								finalTokenUrl = discovery.data.token_endpoint;
								finalUserInfoUrl = discovery.data.userinfo_endpoint;
							}
						}
						if (!finalTokenUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.TOKEN_URL_NOT_FOUND);
						return validateAuthorizationCode({
							headers: c.authorizationHeaders,
							code: data.code,
							codeVerifier: data.codeVerifier,
							redirectURI: data.redirectURI,
							options: {
								clientId: c.clientId,
								clientSecret: c.clientSecret,
								redirectURI: c.redirectURI
							},
							tokenEndpoint: finalTokenUrl,
							authentication: c.authentication
						});
					},
					async refreshAccessToken(refreshToken) {
						let finalTokenUrl = c.tokenUrl;
						if (c.discoveryUrl) {
							const discovery = await betterFetch(c.discoveryUrl, {
								method: "GET",
								headers: c.discoveryHeaders
							});
							if (discovery.data) finalTokenUrl = discovery.data.token_endpoint;
						}
						if (!finalTokenUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.TOKEN_URL_NOT_FOUND);
						return refreshAccessToken({
							refreshToken,
							options: {
								clientId: c.clientId,
								clientSecret: c.clientSecret
							},
							authentication: c.authentication,
							tokenEndpoint: finalTokenUrl
						});
					},
					async getUserInfo(tokens) {
						const userInfo = c.getUserInfo ? await c.getUserInfo(tokens) : await getUserInfo(tokens, finalUserInfoUrl);
						if (!userInfo) return null;
						const userMap = await c.mapProfileToUser?.(userInfo);
						return {
							user: {
								id: userInfo?.id,
								email: userInfo?.email,
								emailVerified: userInfo?.emailVerified,
								image: userInfo?.image,
								name: userInfo?.name,
								...userMap
							},
							data: userInfo
						};
					},
					options: { overrideUserInfoOnSignIn: c.overrideUserInfo }
				};
			}).concat(ctx.socialProviders) } };
		},
		endpoints: {
			signInWithOAuth2: signInWithOAuth2(options),
			oAuth2Callback: oAuth2Callback(options),
			oAuth2LinkAccount: oAuth2LinkAccount(options)
		},
		options,
		$ERROR_CODES: GENERIC_OAUTH_ERROR_CODES
	};
};
defineErrorCodes({ PASSWORD_COMPROMISED: "The password you entered has been compromised. Please choose a different password." });
object({
	payload: record(string(), any()),
	overrideOptions: record(string(), any()).optional()
});
object({
	token: string(),
	issuer: string().optional()
});
object({
	email: email().meta({ description: "Email address to send the magic link" }),
	name: string().meta({ description: "User display name. Only used if the user is registering for the first time. Eg: \"my-name\"" }).optional(),
	callbackURL: string().meta({ description: "URL to redirect after magic link verification" }).optional(),
	newUserCallbackURL: string().meta({ description: "URL to redirect after new user signup. Only used if the user is registering for the first time." }).optional(),
	errorCallbackURL: string().meta({ description: "URL to redirect after error." }).optional()
});
object({
	token: string().meta({ description: "Verification token" }),
	callbackURL: string().meta({ description: "URL to redirect after magic link verification, if not provided the user will be redirected to the root URL. Eg: \"/dashboard\"" }).optional(),
	errorCallbackURL: string().meta({ description: "URL to redirect after error." }).optional(),
	newUserCallbackURL: string().meta({ description: "URL to redirect after new user signup. Only used if the user is registering for the first time." }).optional()
});
object({
	clientId: string(),
	clientSecret: string().optional(),
	type: _enum([
		"web",
		"native",
		"user-agent-based",
		"public"
	]),
	name: string(),
	icon: string().optional(),
	metadata: string().optional(),
	disabled: boolean().optional().default(false),
	redirectUrls: string(),
	userId: string().optional(),
	createdAt: date(),
	updatedAt: date()
});
object({
	accept: boolean(),
	consent_code: string().optional().nullish()
});
record(any(), any());
object({
	redirect_uris: array(string()).meta({ description: "A list of redirect URIs. Eg: [\"https://client.example.com/callback\"]" }),
	token_endpoint_auth_method: _enum([
		"none",
		"client_secret_basic",
		"client_secret_post"
	]).meta({ description: "The authentication method for the token endpoint. Eg: \"client_secret_basic\"" }).default("client_secret_basic").optional(),
	grant_types: array(_enum([
		"authorization_code",
		"implicit",
		"password",
		"client_credentials",
		"refresh_token",
		"urn:ietf:params:oauth:grant-type:jwt-bearer",
		"urn:ietf:params:oauth:grant-type:saml2-bearer"
	])).meta({ description: "The grant types supported by the application. Eg: [\"authorization_code\"]" }).default(["authorization_code"]).optional(),
	response_types: array(_enum(["code", "token"])).meta({ description: "The response types supported by the application. Eg: [\"code\"]" }).default(["code"]).optional(),
	client_name: string().meta({ description: "The name of the application. Eg: \"My App\"" }).optional(),
	client_uri: string().meta({ description: "The URI of the application. Eg: \"https://client.example.com\"" }).optional(),
	logo_uri: string().meta({ description: "The URI of the application logo. Eg: \"https://client.example.com/logo.png\"" }).optional(),
	scope: string().meta({ description: "The scopes supported by the application. Separated by spaces. Eg: \"profile email\"" }).optional(),
	contacts: array(string()).meta({ description: "The contact information for the application. Eg: [\"admin@example.com\"]" }).optional(),
	tos_uri: string().meta({ description: "The URI of the application terms of service. Eg: \"https://client.example.com/tos\"" }).optional(),
	policy_uri: string().meta({ description: "The URI of the application privacy policy. Eg: \"https://client.example.com/policy\"" }).optional(),
	jwks_uri: string().meta({ description: "The URI of the application JWKS. Eg: \"https://client.example.com/jwks\"" }).optional(),
	jwks: record(any(), any()).meta({ description: "The JWKS of the application. Eg: {\"keys\": [{\"kty\": \"RSA\", \"alg\": \"RS256\", \"use\": \"sig\", \"n\": \"...\", \"e\": \"...\"}]}" }).optional(),
	metadata: record(any(), any()).meta({ description: "The metadata of the application. Eg: {\"key\": \"value\"}" }).optional(),
	software_id: string().meta({ description: "The software ID of the application. Eg: \"my-software\"" }).optional(),
	software_version: string().meta({ description: "The software version of the application. Eg: \"1.0.0\"" }).optional(),
	software_statement: string().meta({ description: "The software statement of the application." }).optional()
});
object({
	redirect_uris: array(string()),
	token_endpoint_auth_method: _enum([
		"none",
		"client_secret_basic",
		"client_secret_post"
	]).default("client_secret_basic").optional(),
	grant_types: array(_enum([
		"authorization_code",
		"implicit",
		"password",
		"client_credentials",
		"refresh_token",
		"urn:ietf:params:oauth:grant-type:jwt-bearer",
		"urn:ietf:params:oauth:grant-type:saml2-bearer"
	])).default(["authorization_code"]).optional(),
	response_types: array(_enum(["code", "token"])).default(["code"]).optional(),
	client_name: string().optional(),
	client_uri: string().optional(),
	logo_uri: string().optional(),
	scope: string().optional(),
	contacts: array(string()).optional(),
	tos_uri: string().optional(),
	policy_uri: string().optional(),
	jwks_uri: string().optional(),
	jwks: record(string(), any()).optional(),
	metadata: record(any(), any()).optional(),
	software_id: string().optional(),
	software_version: string().optional(),
	software_statement: string().optional()
});
record(any(), any());
object({ sessionToken: string().meta({ description: "The session token to set as active" }) });
object({ sessionToken: string().meta({ description: "The session token to revoke" }) });
object({
	callbackURL: string().meta({ description: "The URL to redirect to after the proxy" }),
	profile: string().optional().meta({ description: "Encrypted OAuth profile data" })
});
object({
	code: string().optional(),
	error: string().optional()
});
object({ idToken: string().meta({ description: "Google ID token, which the client obtains from the One Tap API" }) });
object({ token: string().meta({ description: "The token to verify. Eg: \"some-token\"" }) });
var allowedType = new Set([
	"string",
	"number",
	"boolean",
	"array",
	"object"
]);
function getTypeFromZodType(zodType) {
	if (zodType instanceof ZodDefault) return getTypeFromZodType(zodType.unwrap());
	const type = zodType.type;
	return allowedType.has(type) ? type : "string";
}
function getFieldSchema(field) {
	const schema = {
		type: field.type === "date" ? "string" : field.type,
		...field.type === "date" && { format: "date-time" }
	};
	if (field.defaultValue !== void 0) schema.default = typeof field.defaultValue === "function" ? "Generated at runtime" : field.defaultValue;
	if (field.input === false) schema.readOnly = true;
	return schema;
}
function getParameters(options) {
	const parameters = [];
	if (options.metadata?.openapi?.parameters) {
		parameters.push(...options.metadata.openapi.parameters);
		return parameters;
	}
	if (options.query instanceof ZodObject) Object.entries(options.query.shape).forEach(([key, value]) => {
		if (value instanceof ZodType) parameters.push({
			name: key,
			in: "query",
			schema: {
				...processZodType(value),
				..."minLength" in value && value.minLength ? { minLength: value.minLength } : {}
			}
		});
	});
	return parameters;
}
function getRequestBody(options) {
	if (options.metadata?.openapi?.requestBody) return options.metadata.openapi.requestBody;
	if (!options.body) return void 0;
	if (options.body instanceof ZodObject || options.body instanceof ZodOptional) {
		const shape = options.body.shape;
		if (!shape) return void 0;
		const properties = {};
		const required = [];
		Object.entries(shape).forEach(([key, value]) => {
			if (value instanceof ZodType) {
				properties[key] = processZodType(value);
				if (!(value instanceof ZodOptional)) required.push(key);
			}
		});
		return {
			required: options.body instanceof ZodOptional ? false : options.body ? true : false,
			content: { "application/json": { schema: {
				type: "object",
				properties,
				required
			} } }
		};
	}
}
function processZodType(zodType) {
	if (zodType instanceof ZodOptional) {
		const innerSchema = processZodType(zodType.unwrap());
		if (innerSchema.type) {
			const type = Array.isArray(innerSchema.type) ? innerSchema.type : [innerSchema.type];
			return {
				...innerSchema,
				type: Array.from(new Set([...type, "null"]))
			};
		}
		return { anyOf: [innerSchema, { type: "null" }] };
	}
	if (zodType instanceof ZodDefault) {
		const innerSchema = processZodType(zodType.unwrap());
		const defaultValueDef = zodType._def.defaultValue;
		const defaultValue = typeof defaultValueDef === "function" ? defaultValueDef() : defaultValueDef;
		return {
			...innerSchema,
			default: defaultValue
		};
	}
	if (zodType instanceof ZodObject) {
		const shape = zodType.shape;
		if (shape) {
			const properties = {};
			const required = [];
			Object.entries(shape).forEach(([key, value]) => {
				if (value instanceof ZodType) {
					properties[key] = processZodType(value);
					if (!(value instanceof ZodOptional)) required.push(key);
				}
			});
			return {
				type: "object",
				properties,
				...required.length > 0 ? { required } : {},
				description: zodType.description
			};
		}
	}
	return {
		type: getTypeFromZodType(zodType),
		description: zodType.description
	};
}
function getResponse(responses) {
	return {
		"400": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } },
				required: ["message"]
			} } },
			description: "Bad Request. Usually due to missing parameters, or invalid parameters."
		},
		"401": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } },
				required: ["message"]
			} } },
			description: "Unauthorized. Due to missing or invalid authentication."
		},
		"403": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Forbidden. You do not have permission to access this resource or to perform this action."
		},
		"404": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Not Found. The requested resource was not found."
		},
		"429": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Too Many Requests. You have exceeded the rate limit. Try again later."
		},
		"500": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Internal Server Error. This is a problem with the server that you cannot fix."
		},
		...responses
	};
}
function toOpenApiPath(path) {
	return path.split("/").map((part) => part.startsWith(":") ? `{${part.slice(1)}}` : part).join("/");
}
async function generator(ctx, options) {
	const baseEndpoints = getEndpoints(ctx, {
		...options,
		plugins: []
	});
	const tables = (0, db_exports.getAuthTables)({
		...options,
		session: {
			...options.session,
			storeSessionInDatabase: true
		}
	});
	const components = { schemas: { ...Object.entries(tables).reduce((acc, [key, value]) => {
		const modelName = key.charAt(0).toUpperCase() + key.slice(1);
		const fields = value.fields;
		const required = [];
		const properties = { id: { type: "string" } };
		Object.entries(fields).forEach(([fieldKey, fieldValue]) => {
			if (!fieldValue) return;
			properties[fieldKey] = getFieldSchema(fieldValue);
			if (fieldValue.required && fieldValue.input !== false) required.push(fieldKey);
		});
		Object.entries(properties).forEach(([key, prop]) => {
			const field = value.fields[key];
			if (field && field.type === "date" && prop.type === "string") prop.format = "date-time";
		});
		acc[modelName] = {
			type: "object",
			properties,
			required
		};
		return acc;
	}, {}) } };
	const paths = {};
	Object.entries(baseEndpoints.api).forEach(([_, value]) => {
		if (!value.path || ctx.options.disabledPaths?.includes(value.path)) return;
		const options = value.options;
		if (options.metadata?.SERVER_ONLY) return;
		const path = toOpenApiPath(value.path);
		const methods = Array.isArray(options.method) ? options.method : [options.method];
		for (const method of methods.filter((m) => m === "GET" || m === "DELETE")) paths[path] = {
			...paths[path],
			[method.toLowerCase()]: {
				tags: ["Default", ...options.metadata?.openapi?.tags || []],
				description: options.metadata?.openapi?.description,
				operationId: options.metadata?.openapi?.operationId,
				security: [{ bearerAuth: [] }],
				parameters: getParameters(options),
				responses: getResponse(options.metadata?.openapi?.responses)
			}
		};
		for (const method of methods.filter((m) => m === "POST" || m === "PATCH" || m === "PUT")) {
			const body = getRequestBody(options);
			paths[path] = {
				...paths[path],
				[method.toLowerCase()]: {
					tags: ["Default", ...options.metadata?.openapi?.tags || []],
					description: options.metadata?.openapi?.description,
					operationId: options.metadata?.openapi?.operationId,
					security: [{ bearerAuth: [] }],
					parameters: getParameters(options),
					...body ? { requestBody: body } : { requestBody: { content: { "application/json": { schema: {
						type: "object",
						properties: {}
					} } } } },
					responses: getResponse(options.metadata?.openapi?.responses)
				}
			};
		}
	});
	for (const plugin of options.plugins || []) {
		if (plugin.id === "open-api") continue;
		const pluginEndpoints = getEndpoints(ctx, {
			...options,
			plugins: [plugin]
		});
		const api = Object.keys(pluginEndpoints.api).map((key) => {
			if (baseEndpoints.api[key] === void 0) return pluginEndpoints.api[key];
			return null;
		}).filter((x) => x !== null);
		Object.entries(api).forEach(([key, value]) => {
			if (!value.path || ctx.options.disabledPaths?.includes(value.path)) return;
			const options = value.options;
			if (options.metadata?.SERVER_ONLY) return;
			const path = toOpenApiPath(value.path);
			const methods = Array.isArray(options.method) ? options.method : [options.method];
			for (const method of methods.filter((m) => m === "GET" || m === "DELETE")) paths[path] = {
				...paths[path],
				[method.toLowerCase()]: {
					tags: options.metadata?.openapi?.tags || [plugin.id.charAt(0).toUpperCase() + plugin.id.slice(1)],
					description: options.metadata?.openapi?.description,
					operationId: options.metadata?.openapi?.operationId,
					security: [{ bearerAuth: [] }],
					parameters: getParameters(options),
					responses: getResponse(options.metadata?.openapi?.responses)
				}
			};
			for (const method of methods.filter((m) => m === "POST" || m === "PATCH" || m === "PUT")) paths[path] = {
				...paths[path],
				[method.toLowerCase()]: {
					tags: options.metadata?.openapi?.tags || [plugin.id.charAt(0).toUpperCase() + plugin.id.slice(1)],
					description: options.metadata?.openapi?.description,
					operationId: options.metadata?.openapi?.operationId,
					security: [{ bearerAuth: [] }],
					parameters: getParameters(options),
					requestBody: getRequestBody(options),
					responses: getResponse(options.metadata?.openapi?.responses)
				}
			};
		});
	}
	return {
		openapi: "3.1.1",
		info: {
			title: "Better Auth",
			description: "API Reference for your Better Auth Instance",
			version: "1.1.0"
		},
		components: {
			...components,
			securitySchemes: {
				apiKeyCookie: {
					type: "apiKey",
					in: "cookie",
					name: "apiKeyCookie",
					description: "API Key authentication via cookie"
				},
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					description: "Bearer token authentication"
				}
			}
		},
		security: [{
			apiKeyCookie: [],
			bearerAuth: []
		}],
		servers: [{ url: ctx.baseURL }],
		tags: [{
			name: "Default",
			description: "Default endpoints that are included with Better Auth by default. These endpoints are not part of any plugin."
		}],
		paths
	};
}
var logo = `<svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="75" height="75" fill="url(#pattern0_21_12)"/>
<defs>
<pattern id="pattern0_21_12" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_21_12" transform="scale(0.00094697)"/>
</pattern>
<image id="image0_21_12" width="1056" height="1056" xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAEIKADAAQAAAABAAAEIAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICKElDQ19QUk9GSUxFAAEBAAACGGFwcGwEAAAAbW50clJHQiBYWVogB+YAAQABAAAAAAAAYWNzcEFQUEwAAAAAQVBQTAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBs7P2jjjiFR8NttL1PetoYLwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKZGVzYwAAAPwAAAAwY3BydAAAASwAAABQd3RwdAAAAXwAAAAUclhZWgAAAZAAAAAUZ1hZWgAAAaQAAAAUYlhZWgAAAbgAAAAUclRSQwAAAcwAAAAgY2hhZAAAAewAAAAsYlRSQwAAAcwAAAAgZ1RSQwAAAcwAAAAgbWx1YwAAAAAAAAABAAAADGVuVVMAAAAUAAAAHABEAGkAcwBwAGwAYQB5ACAAUAAzbWx1YwAAAAAAAAABAAAADGVuVVMAAAA0AAAAHABDAG8AcAB5AHIAaQBnAGgAdAAgAEEAcABwAGwAZQAgAEkAbgBjAC4ALAAgADIAMAAyADJYWVogAAAAAAAA9tUAAQAAAADTLFhZWiAAAAAAAACD3wAAPb////+7WFlaIAAAAAAAAEq/AACxNwAACrlYWVogAAAAAAAAKDgAABELAADIuXBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbc2YzMgAAAAAAAQxCAAAF3v//8yYAAAeTAAD9kP//+6L///2jAAAD3AAAwG7/wAARCAQgBCADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIDAgIDBAMDAwQFBAQEBAUHBQUFBQUHCAcHBwcHBwgICAgICAgICgoKCgoKCwsLCwsNDQ0NDQ0NDQ0N/9sAQwECAgIDAwMGAwMGDQkHCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0N/90ABABC/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9L9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9b9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9H9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9T9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Ln/gq38a/in8Dvgp4T8R/CfxFdeG9SvvFMdlcXFoELyW5srqQxnzEcY3op4Gciv1Gr8Z/+C2X/JvXgj/sc4v/AE33lAH4z/8ADwv9tD/oq2tf9823/wAZo/4eF/tof9FW1r/vm2/+M18Z0UAfZn/Dwv8AbQ/6KtrX/fNt/wDGaP8Ah4X+2h/0VbWv++bb/wCM18Z0UAfZn/Dwv9tD/oq2tf8AfNt/8Zo/4eF/tof9FW1r/vm2/wDjNfGdFAH2Z/w8L/bQ/wCira1/3zbf/GaP+Hhf7aH/AEVbWv8Avm2/+M18Z0UAfZn/AA8L/bQ/6KtrX/fNt/8AGaP+Hhf7aH/RVta/75tv/jNfGdFAH2Z/w8L/AG0P+ira1/3zbf8Axmj/AIeF/tof9FW1r/vm2/8AjNfGdFAH63/sVftq/tTfEb9qb4deCfG3xF1TVtD1bVGgvbKdYBHPGIJW2ttiVsblB4I6V/UbX8Z//BPT/k9D4U/9hpv/AEmmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+M/wD4eF/tof8ARVta/wC+bb/4zR/w8L/bQ/6KtrX/AHzbf/Ga+M6KAPsz/h4X+2h/0VbWv++bb/4zR/w8L/bQ/wCira1/3zbf/Ga+M6KAPsz/AIeF/tof9FW1r/vm2/8AjNH/AA8L/bQ/6KtrX/fNt/8AGa+M6KAPsz/h4X+2h/0VbWv++bb/AOM0f8PC/wBtD/oq2tf9823/AMZr4zooA+zP+Hhf7aH/AEVbWv8Avm2/+M0f8PC/20P+ira1/wB823/xmvjOigD7M/4eF/tof9FW1r/vm2/+M0f8PC/20P8Aoq2tf9823/xmvjOigD7M/wCHhf7aH/RVta/75tv/AIzR/wAPC/20P+ira1/3zbf/ABmvjOigD7M/4eF/tof9FW1r/vm2/wDjNH/Dwv8AbQ/6KtrX/fNt/wDGa+M6KAPsz/h4X+2h/wBFW1r/AL5tv/jNH/Dwv9tD/oq2tf8AfNt/8Zr4zooA+zP+Hhf7aH/RVta/75tv/jNH/Dwv9tD/AKKtrX/fNt/8Zr4zooA+zP8Ah4X+2h/0VbWv++bb/wCM0f8ADwv9tD/oq2tf9823/wAZr4zooA+zP+Hhf7aH/RVta/75tv8A4zR/w8L/AG0P+ira1/3zbf8AxmvjOigD7M/4eF/tof8ARVta/wC+bb/4zR/w8L/bQ/6KtrX/AHzbf/Ga+M6KAP6tv+CUnxr+Kfxx+CnizxH8WPEV14k1Kx8UyWVvcXYQPHbiytZBGPLRBje7HkZya/Uavxn/AOCJv/JvXjf/ALHOX/032dfsxQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfxn/APBPT/k9D4U/9hpv/Saav7MKACiiigAooooAKKKKACiiigAooooAKKKKAP4A6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfwq/BT4r638Dvin4d+LHhy0tb7UvDd0bu3t70ObeRzG0eJBGyPjDnowOa/Ub/h9l+0L/ANCR4M/79ah/8m0Af0yUV/M3/wAPsv2hf+hI8Gf9+tQ/+TaP+H2X7Qv/AEJHgz/v1qH/AMm0Af0yUV/M3/w+y/aF/wChI8Gf9+tQ/wDk2j/h9l+0L/0JHgz/AL9ah/8AJtAH9MlFfzN/8Psv2hf+hI8Gf9+tQ/8Ak2j/AIfZftC/9CR4M/79ah/8m0Af0yUV/M3/AMPsv2hf+hI8Gf8AfrUP/k2j/h9l+0L/ANCR4M/79ah/8m0Af0yUV/M3/wAPsv2hf+hI8Gf9+tQ/+TaP+H2X7Qv/AEJHgz/v1qH/AMm0Af0yUV/M3/w+y/aF/wChI8Gf9+tQ/wDk2j/h9l+0L/0JHgz/AL9ah/8AJtAH4z0V/TJ/w5N/Z6/6Hfxn/wB/dP8A/kKj/hyb+z1/0O/jP/v7p/8A8hUAfzN0V/TJ/wAOTf2ev+h38Z/9/dP/APkKj/hyb+z1/wBDv4z/AO/un/8AyFQB/M3RX9Mn/Dk39nr/AKHfxn/390//AOQqP+HJv7PX/Q7+M/8Av7p//wAhUAfzN0V/TJ/w5N/Z6/6Hfxn/AN/dP/8AkKj/AIcm/s9f9Dv4z/7+6f8A/IVAH8zdFf0yf8OTf2ev+h38Z/8Af3T/AP5Co/4cm/s9f9Dv4z/7+6f/APIVAH8zdFf0yf8ADk39nr/od/Gf/f3T/wD5Co/4cm/s9f8AQ7+M/wDv7p//AMhUAfzN0V/TJ/w5N/Z6/wCh38Z/9/dP/wDkKvwV/ag+FGifA74++M/hP4cu7q+03w3fi0t7i9KG4kQxRyZkMaomcueigYoA8FooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/AOxzl/8ATfZ1+zFfjP8A8ETf+TevG/8A2Ocv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/v8ooooAKKKKACiiigAooooAKKKKACiiigAr+M//goX/wAnofFb/sNL/wCk0Nf2YV/Gf/wUL/5PQ+K3/YaX/wBJoaAPjOiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP7/KKKKACiiigAooooAKKKKACiiigAooooAK/jP/4KF/8AJ6HxW/7DS/8ApNDX9mFfxn/8FC/+T0Pit/2Gl/8ASaGgD4zooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+/yiiigAooooAKKKKACiiigAooooAKKKKACv4z/+Chf/ACeh8Vv+w0v/AKTQ1/ZhX8Z//BQv/k9D4rf9hpf/AEmhoA+M6KKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/v8ooooAKKKKACiiigAooooAKKKKACiiigAr+M//goX/wAnofFb/sNL/wCk0Nf2YV/Gf/wUL/5PQ+K3/YaX/wBJoaAPjOiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP7/KKKKACiiigAooooAKKKKACiiigAooooAK/jP/4KF/8AJ6HxW/7DS/8ApNDX9mFfxn/8FC/+T0Pit/2Gl/8ASaGgD4zooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+/yiiigAooooAKKKKACiiigAooooAKKKKACv4z/+Chf/ACeh8Vv+w0v/AKTQ1/ZhX8Z//BQv/k9D4rf9hpf/AEmhoA+M6KKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD1L4KfCjW/jj8U/Dvwn8OXdrY6l4kujaW9xelxbxuI2kzIY1d8YQ9FJzX6jf8OTf2hf8Aod/Bn/f3UP8A5Cr4z/4J6f8AJ6Hwp/7DTf8ApNNX9mFAH8zf/Dk39oX/AKHfwZ/391D/AOQqP+HJv7Qv/Q7+DP8Av7qH/wAhV/TJRQB/M3/w5N/aF/6HfwZ/391D/wCQqP8Ahyb+0L/0O/gz/v7qH/yFX9MlFAH8zf8Aw5N/aF/6HfwZ/wB/dQ/+QqP+HJv7Qv8A0O/gz/v7qH/yFX9MlFAH8zf/AA5N/aF/6HfwZ/391D/5Co/4cm/tC/8AQ7+DP+/uof8AyFX9MlFAH8zf/Dk39oX/AKHfwZ/391D/AOQqP+HJv7Qv/Q7+DP8Av7qH/wAhV/TJRQB/M3/w5N/aF/6HfwZ/391D/wCQqP8Ahyb+0L/0O/gz/v7qH/yFX9MlFAH4z/8AD7L9nr/oSPGf/frT/wD5No/4fZfs9f8AQkeM/wDv1p//AMm1/M3RQB/TJ/w+y/Z6/wChI8Z/9+tP/wDk2j/h9l+z1/0JHjP/AL9af/8AJtfzN0UAf0yf8Psv2ev+hI8Z/wDfrT//AJNo/wCH2X7PX/QkeM/+/Wn/APybX8zdFAH9Mn/D7L9nr/oSPGf/AH60/wD+TaP+H2X7PX/QkeM/+/Wn/wDybX8zdFAH9Mn/AA+y/Z6/6Ejxn/360/8A+TaP+H2X7PX/AEJHjP8A79af/wDJtfzN0UAf0yf8Psv2ev8AoSPGf/frT/8A5No/4fZfs9f9CR4z/wC/Wn//ACbX8zdFAH9Mn/D7L9nr/oSPGf8A360//wCTa/BX9qD4r6J8cfj74z+LHhy0urHTfEl+Lu3t70ILiNBFHHiQRs6Zyh6MRivBaKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/ACb143/7HOX/ANN9nX7MV+M//BE3/k3rxv8A9jnL/wCm+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfxn/APBPT/k9D4U/9hpv/Saav7MKACiiigAooooAKKKKACiiigAooooAKKKKAP4A6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+XP/BVv4KfFP44/BTwn4c+E/h268SalY+KY724t7QoHjtxZXUZkPmOgxvdRwc5NAH8pNFfZn/DvT9tD/olOtf99W3/AMeo/wCHen7aH/RKda/76tv/AI9QB8Z0V9mf8O9P20P+iU61/wB9W3/x6j/h3p+2h/0SnWv++rb/AOPUAfGdFfZn/DvT9tD/AKJTrX/fVt/8eo/4d6ftof8ARKda/wC+rb/49QB8Z0V9mf8ADvT9tD/olOtf99W3/wAeo/4d6ftof9Ep1r/vq2/+PUAfGdFfZn/DvT9tD/olOtf99W3/AMeo/wCHen7aH/RKda/76tv/AI9QB8Z0V9mf8O9P20P+iU61/wB9W3/x6j/h3p+2h/0SnWv++rb/AOPUAH/BPT/k9D4U/wDYab/0mmr+zCv5cv2Kv2Kv2pvhz+1N8OvG3jb4dappOh6TqjT3t7O0BjgjMEq7m2ys2NzAcA9a/qNoAKKKKACiiigAooooAKKKKACiiigAooooA/gDor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD9mP+CJv/JvXjf8A7HOX/wBN9nX7MV+XP/BKT4KfFP4HfBTxZ4c+LHh268N6lfeKZL23t7soXktzZWsYkHlu4xvRhyc5FfqNQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9L9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9b9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9H9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9T9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9f9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q=="/>
</defs>
</svg>
`;
var getHTML = (apiReference, theme, nonce) => {
	const nonceAttr = nonce ? `nonce="${nonce}"` : "";
	return `<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json">
    ${JSON.stringify(apiReference)}
    <\/script>
	 <script ${nonceAttr}>
      var configuration = {
	  	favicon: "data:image/svg+xml;utf8,${encodeURIComponent(logo)}",
	   	theme: "${theme || "default"}",
        metaData: {
			title: "Better Auth API",
			description: "API Reference for your Better Auth Instance",
		}
      }

      document.getElementById('api-reference').dataset.configuration =
        JSON.stringify(configuration)
    <\/script>
	  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference" ${nonceAttr}><\/script>
  </body>
</html>`;
};
var openAPI = (options) => {
	const path = options?.path ?? "/reference";
	return {
		id: "open-api",
		endpoints: {
			generateOpenAPISchema: createAuthEndpoint("/open-api/generate-schema", { method: "GET" }, async (ctx) => {
				const schema = await generator(ctx.context, ctx.context.options);
				return ctx.json(schema);
			}),
			openAPIReference: createAuthEndpoint(path, {
				method: "GET",
				metadata: HIDE_METADATA
			}, async (ctx) => {
				if (options?.disableDefaultReference) throw new APIError("NOT_FOUND");
				const schema = await generator(ctx.context, ctx.context.options);
				return new Response(getHTML(schema, options?.theme, options?.nonce), { headers: { "Content-Type": "text/html" } });
			})
		},
		options
	};
};
var defaultAc = createAccessControl({
	organization: ["update", "delete"],
	member: [
		"create",
		"update",
		"delete"
	],
	invitation: ["create", "cancel"],
	team: [
		"create",
		"update",
		"delete"
	],
	ac: [
		"create",
		"read",
		"update",
		"delete"
	]
});
defaultAc.newRole({
	organization: ["update"],
	invitation: ["create", "cancel"],
	member: [
		"create",
		"update",
		"delete"
	],
	team: [
		"create",
		"update",
		"delete"
	],
	ac: [
		"create",
		"read",
		"update",
		"delete"
	]
});
defaultAc.newRole({
	organization: ["update", "delete"],
	member: [
		"create",
		"update",
		"delete"
	],
	invitation: ["create", "cancel"],
	team: [
		"create",
		"update",
		"delete"
	],
	ac: [
		"create",
		"read",
		"update",
		"delete"
	]
});
defaultAc.newRole({
	organization: [],
	member: [],
	invitation: [],
	team: [],
	ac: ["read"]
});
defineErrorCodes({
	YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: "You are not allowed to create a new organization",
	YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: "You have reached the maximum number of organizations",
	ORGANIZATION_ALREADY_EXISTS: "Organization already exists",
	ORGANIZATION_SLUG_ALREADY_TAKEN: "Organization slug already taken",
	ORGANIZATION_NOT_FOUND: "Organization not found",
	USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "User is not a member of the organization",
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: "You are not allowed to update this organization",
	YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: "You are not allowed to delete this organization",
	NO_ACTIVE_ORGANIZATION: "No active organization",
	USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: "User is already a member of this organization",
	MEMBER_NOT_FOUND: "Member not found",
	ROLE_NOT_FOUND: "Role not found",
	YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: "You are not allowed to create a new team",
	TEAM_ALREADY_EXISTS: "Team already exists",
	TEAM_NOT_FOUND: "Team not found",
	YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: "You cannot leave the organization as the only owner",
	YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: "You cannot leave the organization without an owner",
	YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: "You are not allowed to delete this member",
	YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: "You are not allowed to invite users to this organization",
	USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: "User is already invited to this organization",
	INVITATION_NOT_FOUND: "Invitation not found",
	YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: "You are not the recipient of the invitation",
	EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: "Email verification required before accepting or rejecting invitation",
	YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: "You are not allowed to cancel this invitation",
	INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: "Inviter is no longer a member of the organization",
	YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: "You are not allowed to invite a user with this role",
	FAILED_TO_RETRIEVE_INVITATION: "Failed to retrieve invitation",
	YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: "You have reached the maximum number of teams",
	UNABLE_TO_REMOVE_LAST_TEAM: "Unable to remove last team",
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: "You are not allowed to update this member",
	ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: "Organization membership limit reached",
	YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to create teams in this organization",
	YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to delete teams in this organization",
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: "You are not allowed to update this team",
	YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: "You are not allowed to delete this team",
	INVITATION_LIMIT_REACHED: "Invitation limit reached",
	TEAM_MEMBER_LIMIT_REACHED: "Team member limit reached",
	USER_IS_NOT_A_MEMBER_OF_THE_TEAM: "User is not a member of the team",
	YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: "You are not allowed to list the members of this team",
	YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "You do not have an active team",
	YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: "You are not allowed to create a new member",
	YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: "You are not allowed to remove a team member",
	YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: "You are not allowed to access this organization as an owner",
	YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: "You are not a member of this organization",
	MISSING_AC_INSTANCE: "Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information",
	YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: "You must be in an organization to create a role",
	YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: "You are not allowed to create a role",
	YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: "You are not allowed to update a role",
	YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: "You are not allowed to delete a role",
	YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: "You are not allowed to read a role",
	YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: "You are not allowed to list a role",
	YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: "You are not allowed to get a role",
	TOO_MANY_ROLES: "This organization has too many roles",
	INVALID_RESOURCE: "The provided permission includes an invalid resource",
	ROLE_NAME_IS_ALREADY_TAKEN: "That role name is already taken",
	CANNOT_DELETE_A_PRE_DEFINED_ROLE: "Cannot delete a pre-defined role",
	ROLE_IS_ASSIGNED_TO_MEMBERS: "Cannot delete a role that is assigned to members. Please reassign the members to a different role first"
});
createAuthMiddleware(async () => {
	return {};
});
createAuthMiddleware({ use: [sessionMiddleware] }, async (ctx) => {
	return { session: ctx.context.session };
});
Number.POSITIVE_INFINITY;
object({
	organizationId: string().optional().meta({ description: "The id of the organization to create the role in. If not provided, the user's active organization will be used." }),
	role: string().meta({ description: "The name of the role to create" }),
	permission: record(string(), array(string())).meta({ description: "The permission to assign to the role" })
});
object({ organizationId: string().optional().meta({ description: "The id of the organization to create the role in. If not provided, the user's active organization will be used." }) }).and(union([object({ roleName: string().nonempty().meta({ description: "The name of the role to delete" }) }), object({ roleId: string().nonempty().meta({ description: "The id of the role to delete" }) })]));
object({ organizationId: string().optional().meta({ description: "The id of the organization to list roles for. If not provided, the user's active organization will be used." }) }).optional();
object({ organizationId: string().optional().meta({ description: "The id of the organization to read a role for. If not provided, the user's active organization will be used." }) }).and(union([object({ roleName: string().nonempty().meta({ description: "The name of the role to read" }) }), object({ roleId: string().nonempty().meta({ description: "The id of the role to read" }) })])).optional();
union([object({ roleName: string().nonempty().meta({ description: "The name of the role to update" }) }), object({ roleId: string().nonempty().meta({ description: "The id of the role to update" }) })]);
object({
	email: string().meta({ description: "The email address of the user to invite" }),
	role: union([string().meta({ description: "The role to assign to the user" }), array(string().meta({ description: "The roles to assign to the user" }))]).meta({ description: "The role(s) to assign to the user. It can be `admin`, `member`, owner. Eg: \"member\"" }),
	organizationId: string().meta({ description: "The organization ID to invite the user to" }).optional(),
	resend: boolean().meta({ description: "Resend the invitation email, if the user is already invited. Eg: true" }).optional(),
	teamId: union([string().meta({ description: "The team ID to invite the user to" }).optional(), array(string()).meta({ description: "The team IDs to invite the user to" }).optional()])
});
object({ invitationId: string().meta({ description: "The ID of the invitation to accept" }) });
object({ invitationId: string().meta({ description: "The ID of the invitation to reject" }) });
object({ invitationId: string().meta({ description: "The ID of the invitation to cancel" }) });
object({ id: string().meta({ description: "The ID of the invitation to get" }) });
object({ organizationId: string().meta({ description: "The ID of the organization to list invitations for" }).optional() }).optional();
object({
	userId: string$1().meta({ description: "The user Id which represents the user to be added as a member. If `null` is provided, then it's expected to provide session headers. Eg: \"user-id\"" }),
	role: union([string(), array(string())]).meta({ description: "The role(s) to assign to the new member. Eg: [\"admin\", \"sale\"]" }),
	organizationId: string().meta({ description: "An optional organization ID to pass. If not provided, will default to the user's active organization. Eg: \"org-id\"" }).optional(),
	teamId: string().meta({ description: "An optional team ID to add the member to. Eg: \"team-id\"" }).optional()
});
object({
	memberIdOrEmail: string().meta({ description: "The ID or email of the member to remove" }),
	organizationId: string().meta({ description: "The ID of the organization to remove the member from. If not provided, the active organization will be used. Eg: \"org-id\"" }).optional()
});
object({
	role: union([string(), array(string())]).meta({ description: "The new role to be applied. This can be a string or array of strings representing the roles. Eg: [\"admin\", \"sale\"]" }),
	memberId: string().meta({ description: "The member id to apply the role update to. Eg: \"member-id\"" }),
	organizationId: string().meta({ description: "An optional organization ID which the member is a part of to apply the role update. If not provided, you must provide session headers to get the active organization. Eg: \"organization-id\"" }).optional()
});
object({ organizationId: string().meta({ description: "The organization Id for the member to leave. Eg: \"organization-id\"" }) });
object({
	userId: string().meta({ description: "The user ID to get the role for. If not provided, will default to the current user's" }).optional(),
	organizationId: string().meta({ description: "The organization ID to list members for. If not provided, will default to the user's active organization. Eg: \"organization-id\"" }).optional(),
	organizationSlug: string().meta({ description: "The organization slug to list members for. If not provided, will default to the user's active organization. Eg: \"organization-slug\"" }).optional()
}).optional();
object({
	name: string().min(1).meta({ description: "The name of the organization" }),
	slug: string().min(1).meta({ description: "The slug of the organization" }),
	userId: string$1().meta({ description: "The user id of the organization creator. If not provided, the current user will be used. Should only be used by admins or when called by the server. server-only. Eg: \"user-id\"" }).optional(),
	logo: string().meta({ description: "The logo of the organization" }).optional(),
	metadata: record(string(), any()).meta({ description: "The metadata of the organization" }).optional(),
	keepCurrentActiveOrganization: boolean().meta({ description: "Whether to keep the current active organization active after creating a new one. Eg: true" }).optional()
});
object({ slug: string().meta({ description: "The organization slug to check. Eg: \"my-org\"" }) });
object({
	name: string().min(1).meta({ description: "The name of the organization" }).optional(),
	slug: string().min(1).meta({ description: "The slug of the organization" }).optional(),
	logo: string().meta({ description: "The logo of the organization" }).optional(),
	metadata: record(string(), any()).meta({ description: "The metadata of the organization" }).optional()
});
object({ organizationId: string().meta({ description: "The organization id to delete" }) });
optional(object({
	organizationId: string().meta({ description: "The organization id to get" }).optional(),
	organizationSlug: string().meta({ description: "The organization slug to get" }).optional(),
	membersLimit: number().or(string().transform((val) => parseInt(val))).meta({ description: "The limit of members to get. By default, it uses the membershipLimit option." }).optional()
}));
object({
	organizationId: string().meta({ description: "The organization id to set as active. It can be null to unset the active organization. Eg: \"org-id\"" }).nullable().optional(),
	organizationSlug: string().meta({ description: "The organization slug to set as active. It can be null to unset the active organization if organizationId is not provided. Eg: \"org-slug\"" }).optional()
});
var roleSchema = string();
var invitationStatus = _enum([
	"pending",
	"accepted",
	"rejected",
	"canceled"
]).default("pending");
object({
	id: string().default(generateId),
	name: string(),
	slug: string(),
	logo: string().nullish().optional(),
	metadata: record(string(), unknown()).or(string().transform((v) => JSON.parse(v))).optional(),
	createdAt: date()
});
object({
	id: string().default(generateId),
	organizationId: string(),
	userId: string$1(),
	role: roleSchema,
	createdAt: date().default(() => /* @__PURE__ */ new Date())
});
object({
	id: string().default(generateId),
	organizationId: string(),
	email: string(),
	role: roleSchema,
	status: invitationStatus,
	teamId: string().nullish(),
	inviterId: string(),
	expiresAt: date(),
	createdAt: date().default(() => /* @__PURE__ */ new Date())
});
object({
	id: string().default(generateId),
	name: string().min(1),
	organizationId: string(),
	createdAt: date(),
	updatedAt: date().optional()
});
object({
	id: string().default(generateId),
	teamId: string(),
	userId: string(),
	createdAt: date().default(() => /* @__PURE__ */ new Date())
});
object({
	id: string().default(generateId),
	organizationId: string(),
	role: string(),
	permission: record(string(), array(string())),
	createdAt: date().default(() => /* @__PURE__ */ new Date()),
	updatedAt: date().optional()
});
var defaultRoles = [
	"admin",
	"member",
	"owner"
];
union([_enum(defaultRoles), array(_enum(defaultRoles))]);
object({
	name: string().meta({ description: "The name of the team. Eg: \"my-team\"" }),
	organizationId: string().meta({ description: "The organization ID which the team will be created in. Defaults to the active organization. Eg: \"organization-id\"" }).optional()
});
object({
	teamId: string().meta({ description: `The team ID of the team to remove. Eg: "team-id"` }),
	organizationId: string().meta({ description: `The organization ID which the team falls under. If not provided, it will default to the user's active organization. Eg: "organization-id"` }).optional()
});
optional(object({ organizationId: string().meta({ description: `The organization ID which the teams are under to list. Defaults to the users active organization. Eg: "organization-id"` }).optional() }));
object({ teamId: string().meta({ description: "The team id to set as active. It can be null to unset the active team" }).nullable().optional() });
optional(object({ teamId: string().optional().meta({ description: "The team whose members we should return. If this is not provided the members of the current active team get returned." }) }));
object({
	teamId: string().meta({ description: "The team the user should be a member of." }),
	userId: string$1().meta({ description: "The user Id which represents the user to be added as a member." })
});
object({
	teamId: string().meta({ description: "The team the user should be removed from." }),
	userId: string$1().meta({ description: "The user which should be removed from the team." })
});
object({ organizationId: string().optional() }).and(union([object({
	permission: record(string(), array(string())),
	permissions: _undefined()
}), object({
	permission: _undefined(),
	permissions: record(string(), array(string()))
})]));
defineErrorCodes({
	INVALID_PHONE_NUMBER: "Invalid phone number",
	PHONE_NUMBER_EXIST: "Phone number already exists",
	PHONE_NUMBER_NOT_EXIST: "phone number isn't registered",
	INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password",
	UNEXPECTED_ERROR: "Unexpected error",
	OTP_NOT_FOUND: "OTP not found",
	OTP_EXPIRED: "OTP expired",
	INVALID_OTP: "Invalid OTP",
	PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified",
	PHONE_NUMBER_CANNOT_BE_UPDATED: "Phone number cannot be updated",
	SEND_OTP_NOT_IMPLEMENTED: "sendOTP not implemented",
	TOO_MANY_ATTEMPTS: "Too many attempts"
});
object({
	phoneNumber: string().meta({ description: "Phone number to sign in. Eg: \"+1234567890\"" }),
	password: string().meta({ description: "Password to use for sign in." }),
	rememberMe: boolean().meta({ description: "Remember the session. Eg: true" }).optional()
});
object({ phoneNumber: string().meta({ description: "Phone number to send OTP. Eg: \"+1234567890\"" }) });
object({
	phoneNumber: string().meta({ description: "Phone number to verify. Eg: \"+1234567890\"" }),
	code: string().meta({ description: "OTP code. Eg: \"123456\"" }),
	disableSession: boolean().meta({ description: "Disable session creation after verification. Eg: false" }).optional(),
	updatePhoneNumber: boolean().meta({ description: "Check if there is a session and update the phone number. Eg: true" }).optional()
}).and(record(string(), any()));
object({ phoneNumber: string() });
object({
	otp: string().meta({ description: "The one time password to reset the password. Eg: \"123456\"" }),
	phoneNumber: string().meta({ description: "The phone number to the account which intends to reset the password for. Eg: \"+1234567890\"" }),
	newPassword: string().meta({ description: `The new password. Eg: "new-and-secure-password"` })
});
object({
	walletAddress: string().regex(/^0[xX][a-fA-F0-9]{40}$/i).length(42),
	chainId: number().int().positive().max(2147483647).optional().default(1)
});
var TWO_FACTOR_COOKIE_NAME = "two_factor";
var TRUST_DEVICE_COOKIE_NAME = "trust_device";
async function verifyTwoFactor(ctx) {
	const invalid = (errorKey) => {
		throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES[errorKey]);
	};
	const session = await getSessionFromCtx(ctx);
	if (!session) {
		const twoFactorCookie = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME);
		const signedTwoFactorCookie = await ctx.getSignedCookie(twoFactorCookie.name, ctx.context.secret);
		if (!signedTwoFactorCookie) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE);
		const verificationToken = await ctx.context.internalAdapter.findVerificationValue(signedTwoFactorCookie);
		if (!verificationToken) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE);
		const user = await ctx.context.internalAdapter.findUserById(verificationToken.value);
		if (!user) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE);
		const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
		return {
			valid: async (ctx) => {
				const session = await ctx.context.internalAdapter.createSession(verificationToken.value, !!dontRememberMe);
				if (!session) throw APIError.from("INTERNAL_SERVER_ERROR", {
					message: "failed to create session",
					code: "FAILED_TO_CREATE_SESSION"
				});
				await ctx.context.internalAdapter.deleteVerificationValue(verificationToken.id);
				await setSessionCookie(ctx, {
					session,
					user
				});
				expireCookie(ctx, twoFactorCookie);
				if (ctx.body.trustDevice) {
					const maxAge = ctx.context.getPlugin("two-factor").options.trustDeviceMaxAge ?? 2592e3;
					const trustDeviceCookie = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge });
					/**
					* Create a random identifier for the trust device record.
					* Store it in the verification table with an expiration
					* so the server can validate and revoke it.
					*/
					const trustIdentifier = `trust-device-${generateRandomString(32)}`;
					const token = await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${user.id}!${trustIdentifier}`);
					await ctx.context.internalAdapter.createVerificationValue({
						value: user.id,
						identifier: trustIdentifier,
						expiresAt: new Date(Date.now() + maxAge * 1e3)
					});
					await ctx.setSignedCookie(trustDeviceCookie.name, `${token}!${trustIdentifier}`, ctx.context.secret, trustDeviceCookie.attributes);
					expireCookie(ctx, ctx.context.authCookies.dontRememberToken);
				}
				return ctx.json({
					token: session.token,
					user: parseUserOutput(ctx.context.options, user)
				});
			},
			invalid,
			session: {
				session: null,
				user
			},
			key: signedTwoFactorCookie
		};
	}
	return {
		valid: async (ctx) => {
			return ctx.json({
				token: session.session.token,
				user: parseUserOutput(ctx.context.options, session.user)
			});
		},
		invalid,
		session,
		key: `${session.user.id}!${session.session.id}`
	};
}
function generateBackupCodesFn(options) {
	return Array.from({ length: options?.amount ?? 10 }).fill(null).map(() => generateRandomString(options?.length ?? 10, "a-z", "0-9", "A-Z")).map((code) => `${code.slice(0, 5)}-${code.slice(5)}`);
}
async function generateBackupCodes(secret, options) {
	const backupCodes = options?.customBackupCodesGenerate ? options.customBackupCodesGenerate() : generateBackupCodesFn(options);
	if (options?.storeBackupCodes === "encrypted") return {
		backupCodes,
		encryptedBackupCodes: await symmetricEncrypt({
			data: JSON.stringify(backupCodes),
			key: secret
		})
	};
	if (typeof options?.storeBackupCodes === "object" && "encrypt" in options?.storeBackupCodes) return {
		backupCodes,
		encryptedBackupCodes: await options?.storeBackupCodes.encrypt(JSON.stringify(backupCodes))
	};
	return {
		backupCodes,
		encryptedBackupCodes: JSON.stringify(backupCodes)
	};
}
async function verifyBackupCode(data, key, options) {
	const codes = await getBackupCodes(data.backupCodes, key, options);
	if (!codes) return {
		status: false,
		updated: null
	};
	return {
		status: codes.includes(data.code),
		updated: codes.filter((code) => code !== data.code)
	};
}
async function getBackupCodes(backupCodes, key, options) {
	if (options?.storeBackupCodes === "encrypted") return safeJSONParse(await symmetricDecrypt({
		key,
		data: backupCodes
	}));
	if (typeof options?.storeBackupCodes === "object" && "decrypt" in options?.storeBackupCodes) return safeJSONParse(await options?.storeBackupCodes.decrypt(backupCodes));
	return safeJSONParse(backupCodes);
}
var verifyBackupCodeBodySchema = object({
	code: string().meta({ description: `A backup code to verify. Eg: "123456"` }),
	disableSession: boolean().meta({ description: "If true, the session cookie will not be set." }).optional(),
	trustDevice: boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
var viewBackupCodesBodySchema = object({ userId: string$1().meta({ description: `The user ID to view all backup codes. Eg: "user-id"` }) });
var generateBackupCodesBodySchema = object({ password: string().meta({ description: "The users password." }) });
var backupCode2fa = (opts) => {
	const twoFactorTable = "twoFactor";
	return {
		id: "backup_code",
		endpoints: {
			verifyBackupCode: createAuthEndpoint("/two-factor/verify-backup-code", {
				method: "POST",
				body: verifyBackupCodeBodySchema,
				metadata: { openapi: {
					description: "Verify a backup code for two-factor authentication",
					responses: { "200": {
						description: "Backup code verified successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								user: {
									type: "object",
									properties: {
										id: {
											type: "string",
											description: "Unique identifier of the user"
										},
										email: {
											type: "string",
											format: "email",
											nullable: true,
											description: "User's email address"
										},
										emailVerified: {
											type: "boolean",
											nullable: true,
											description: "Whether the email is verified"
										},
										name: {
											type: "string",
											nullable: true,
											description: "User's name"
										},
										image: {
											type: "string",
											format: "uri",
											nullable: true,
											description: "User's profile image URL"
										},
										twoFactorEnabled: {
											type: "boolean",
											description: "Whether two-factor authentication is enabled for the user"
										},
										createdAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was created"
										},
										updatedAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was last updated"
										}
									},
									required: [
										"id",
										"twoFactorEnabled",
										"createdAt",
										"updatedAt"
									],
									description: "The authenticated user object with two-factor details"
								},
								session: {
									type: "object",
									properties: {
										token: {
											type: "string",
											description: "Session token"
										},
										userId: {
											type: "string",
											description: "ID of the user associated with the session"
										},
										createdAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the session was created"
										},
										expiresAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the session expires"
										}
									},
									required: [
										"token",
										"userId",
										"createdAt",
										"expiresAt"
									],
									description: "The current session object, included unless disableSession is true"
								}
							},
							required: ["user", "session"]
						} } }
					} }
				} }
			}, async (ctx) => {
				const { session, valid } = await verifyTwoFactor(ctx);
				const user = session.user;
				const twoFactor = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user.id
					}]
				});
				if (!twoFactor) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED);
				const validate = await verifyBackupCode({
					backupCodes: twoFactor.backupCodes,
					code: ctx.body.code
				}, ctx.context.secret, opts);
				if (!validate.status) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE);
				const updatedBackupCodes = await symmetricEncrypt({
					key: ctx.context.secret,
					data: JSON.stringify(validate.updated)
				});
				if (!await ctx.context.adapter.update({
					model: twoFactorTable,
					update: { backupCodes: updatedBackupCodes },
					where: [{
						field: "id",
						value: twoFactor.id
					}, {
						field: "backupCodes",
						value: twoFactor.backupCodes
					}]
				})) throw APIError.fromStatus("CONFLICT", { message: "Failed to verify backup code. Please try again." });
				if (!ctx.body.disableSession) return valid(ctx);
				return ctx.json({
					token: session.session?.token,
					user: parseUserOutput(ctx.context.options, session.user)
				});
			}),
			generateBackupCodes: createAuthEndpoint("/two-factor/generate-backup-codes", {
				method: "POST",
				body: generateBackupCodesBodySchema,
				use: [sessionMiddleware],
				metadata: { openapi: {
					description: "Generate new backup codes for two-factor authentication",
					responses: { "200": {
						description: "Backup codes generated successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								status: {
									type: "boolean",
									description: "Indicates if the backup codes were generated successfully",
									enum: [true]
								},
								backupCodes: {
									type: "array",
									items: { type: "string" },
									description: "Array of generated backup codes in plain text"
								}
							},
							required: ["status", "backupCodes"]
						} } }
					} }
				} }
			}, async (ctx) => {
				const user = ctx.context.session.user;
				if (!user.twoFactorEnabled) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TWO_FACTOR_NOT_ENABLED);
				await ctx.context.password.checkPassword(user.id, ctx);
				const twoFactor = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user.id
					}]
				});
				if (!twoFactor) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TWO_FACTOR_NOT_ENABLED);
				const backupCodes = await generateBackupCodes(ctx.context.secret, opts);
				await ctx.context.adapter.update({
					model: twoFactorTable,
					update: { backupCodes: backupCodes.encryptedBackupCodes },
					where: [{
						field: "id",
						value: twoFactor.id
					}]
				});
				return ctx.json({
					status: true,
					backupCodes: backupCodes.backupCodes
				});
			}),
			viewBackupCodes: createAuthEndpoint({
				method: "POST",
				body: viewBackupCodesBodySchema
			}, async (ctx) => {
				const twoFactor = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: ctx.body.userId
					}]
				});
				if (!twoFactor) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED);
				const decryptedBackupCodes = await getBackupCodes(twoFactor.backupCodes, ctx.context.secret, opts);
				if (!decryptedBackupCodes) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE);
				return ctx.json({
					status: true,
					backupCodes: decryptedBackupCodes
				});
			})
		}
	};
};
var defaultKeyHasher = async (token) => {
	const hash = await createHash("SHA-256").digest(new TextEncoder().encode(token));
	return base64Url.encode(new Uint8Array(hash), { padding: false });
};
var verifyOTPBodySchema = object({
	code: string().meta({ description: "The otp code to verify. Eg: \"012345\"" }),
	trustDevice: boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" })
});
var send2FaOTPBodySchema = object({ trustDevice: boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }) }).optional();
/**
* The otp adapter is created from the totp adapter.
*/
var otp2fa = (options) => {
	const opts = {
		storeOTP: "plain",
		digits: 6,
		...options,
		period: (options?.period || 3) * 60 * 1e3
	};
	async function storeOTP(ctx, otp) {
		if (opts.storeOTP === "hashed") return await defaultKeyHasher(otp);
		if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) return await opts.storeOTP.hash(otp);
		if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) return await opts.storeOTP.encrypt(otp);
		if (opts.storeOTP === "encrypted") return await symmetricEncrypt({
			key: ctx.context.secret,
			data: otp
		});
		return otp;
	}
	async function decryptOrHashForComparison(ctx, storedOtp, userInput) {
		if (opts.storeOTP === "hashed") return [storedOtp, await defaultKeyHasher(userInput)];
		if (opts.storeOTP === "encrypted") return [await symmetricDecrypt({
			key: ctx.context.secret,
			data: storedOtp
		}), userInput];
		if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) return [await opts.storeOTP.decrypt(storedOtp), userInput];
		if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) return [storedOtp, await opts.storeOTP.hash(userInput)];
		return [storedOtp, userInput];
	}
	return {
		id: "otp",
		endpoints: {
			sendTwoFactorOTP: createAuthEndpoint("/two-factor/send-otp", {
				method: "POST",
				body: send2FaOTPBodySchema,
				metadata: { openapi: {
					summary: "Send two factor OTP",
					description: "Send two factor OTP to the user",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { status: { type: "boolean" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (!options || !options.sendOTP) {
					ctx.context.logger.error("send otp isn't configured. Please configure the send otp function on otp options.");
					throw APIError.from("BAD_REQUEST", {
						message: "otp isn't configured",
						code: "OTP_NOT_CONFIGURED"
					});
				}
				const { session, key } = await verifyTwoFactor(ctx);
				const code = generateRandomString(opts.digits, "0-9");
				const hashedCode = await storeOTP(ctx, code);
				await ctx.context.internalAdapter.createVerificationValue({
					value: `${hashedCode}:0`,
					identifier: `2fa-otp-${key}`,
					expiresAt: new Date(Date.now() + opts.period)
				});
				const sendOTPResult = options.sendOTP({
					user: session.user,
					otp: code
				}, ctx);
				if (sendOTPResult instanceof Promise) await ctx.context.runInBackgroundOrAwait(sendOTPResult.catch((e) => {
					ctx.context.logger.error("Failed to send two-factor OTP", e);
				}));
				return ctx.json({ status: true });
			}),
			verifyTwoFactorOTP: createAuthEndpoint("/two-factor/verify-otp", {
				method: "POST",
				body: verifyOTPBodySchema,
				metadata: { openapi: {
					summary: "Verify two factor OTP",
					description: "Verify two factor OTP",
					responses: { "200": {
						description: "Two-factor OTP verified successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								token: {
									type: "string",
									description: "Session token for the authenticated session"
								},
								user: {
									type: "object",
									properties: {
										id: {
											type: "string",
											description: "Unique identifier of the user"
										},
										email: {
											type: "string",
											format: "email",
											nullable: true,
											description: "User's email address"
										},
										emailVerified: {
											type: "boolean",
											nullable: true,
											description: "Whether the email is verified"
										},
										name: {
											type: "string",
											nullable: true,
											description: "User's name"
										},
										image: {
											type: "string",
											format: "uri",
											nullable: true,
											description: "User's profile image URL"
										},
										createdAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was created"
										},
										updatedAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was last updated"
										}
									},
									required: [
										"id",
										"createdAt",
										"updatedAt"
									],
									description: "The authenticated user object"
								}
							},
							required: ["token", "user"]
						} } }
					} }
				} }
			}, async (ctx) => {
				const { session, key, valid, invalid } = await verifyTwoFactor(ctx);
				const toCheckOtp = await ctx.context.internalAdapter.findVerificationValue(`2fa-otp-${key}`);
				const [otp, counter] = toCheckOtp?.value?.split(":") ?? [];
				if (!toCheckOtp || toCheckOtp.expiresAt < /* @__PURE__ */ new Date()) {
					if (toCheckOtp) await ctx.context.internalAdapter.deleteVerificationValue(toCheckOtp.id);
					throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.OTP_HAS_EXPIRED);
				}
				const allowedAttempts = options?.allowedAttempts || 5;
				if (parseInt(counter) >= allowedAttempts) {
					await ctx.context.internalAdapter.deleteVerificationValue(toCheckOtp.id);
					throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE);
				}
				const [storedValue, inputValue] = await decryptOrHashForComparison(ctx, otp, ctx.body.code);
				if (constantTimeEqual(new TextEncoder().encode(storedValue), new TextEncoder().encode(inputValue))) {
					if (!session.user.twoFactorEnabled) {
						if (!session.session) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
						const updatedUser = await ctx.context.internalAdapter.updateUser(session.user.id, { twoFactorEnabled: true });
						const newSession = await ctx.context.internalAdapter.createSession(session.user.id, false, session.session);
						await ctx.context.internalAdapter.deleteSession(session.session.token);
						await setSessionCookie(ctx, {
							session: newSession,
							user: updatedUser
						});
						return ctx.json({
							token: newSession.token,
							user: parseUserOutput(ctx.context.options, updatedUser)
						});
					}
					return valid(ctx);
				} else {
					await ctx.context.internalAdapter.updateVerificationValue(toCheckOtp.id, { value: `${otp}:${(parseInt(counter, 10) || 0) + 1}` });
					return invalid("INVALID_CODE");
				}
			})
		}
	};
};
var schema = {
	user: { fields: { twoFactorEnabled: {
		type: "boolean",
		required: false,
		defaultValue: false,
		input: false
	} } },
	twoFactor: { fields: {
		secret: {
			type: "string",
			required: true,
			returned: false,
			index: true
		},
		backupCodes: {
			type: "string",
			required: true,
			returned: false
		},
		userId: {
			type: "string",
			required: true,
			returned: false,
			references: {
				model: "user",
				field: "id"
			},
			index: true
		}
	} }
};
function getAlphabet(hex) {
	return hex ? "0123456789ABCDEFGHIJKLMNOPQRSTUV" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
}
function createDecodeMap(alphabet) {
	const decodeMap = /* @__PURE__ */ new Map();
	for (let i = 0; i < alphabet.length; i++) decodeMap.set(alphabet[i], i);
	return decodeMap;
}
function base32Encode(data, alphabet, padding) {
	let result = "";
	let buffer = 0;
	let shift = 0;
	for (const byte of data) {
		buffer = buffer << 8 | byte;
		shift += 8;
		while (shift >= 5) {
			shift -= 5;
			result += alphabet[buffer >> shift & 31];
		}
	}
	if (shift > 0) result += alphabet[buffer << 5 - shift & 31];
	if (padding) {
		const padCount = (8 - result.length % 8) % 8;
		result += "=".repeat(padCount);
	}
	return result;
}
function base32Decode(data, alphabet) {
	const decodeMap = createDecodeMap(alphabet);
	const result = [];
	let buffer = 0;
	let bitsCollected = 0;
	for (const char of data) {
		if (char === "=") break;
		const value = decodeMap.get(char);
		if (value === void 0) throw new Error(`Invalid Base32 character: ${char}`);
		buffer = buffer << 5 | value;
		bitsCollected += 5;
		while (bitsCollected >= 8) {
			bitsCollected -= 8;
			result.push(buffer >> bitsCollected & 255);
		}
	}
	return Uint8Array.from(result);
}
var base32 = {
	encode(data, options = {}) {
		const alphabet = getAlphabet(false);
		return base32Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		if (typeof data !== "string") data = new TextDecoder().decode(data);
		const alphabet = getAlphabet(false);
		return base32Decode(data, alphabet);
	}
};
var defaultPeriod = 30;
var defaultDigits = 6;
async function generateHOTP(secret, { counter, digits, hash = "SHA-1" }) {
	const _digits = digits ?? defaultDigits;
	if (_digits < 1 || _digits > 8) throw new TypeError("Digits must be between 1 and 8");
	const buffer = /* @__PURE__ */ new ArrayBuffer(8);
	new DataView(buffer).setBigUint64(0, BigInt(counter), false);
	const bytes = new Uint8Array(buffer);
	const hmacResult = new Uint8Array(await createHMAC(hash).sign(secret, bytes));
	const offset = hmacResult[hmacResult.length - 1] & 15;
	return (((hmacResult[offset] & 127) << 24 | (hmacResult[offset + 1] & 255) << 16 | (hmacResult[offset + 2] & 255) << 8 | hmacResult[offset + 3] & 255) % 10 ** _digits).toString().padStart(_digits, "0");
}
async function generateTOTP(secret, options) {
	const digits = options?.digits ?? defaultDigits;
	const milliseconds = (options?.period ?? defaultPeriod) * 1e3;
	return await generateHOTP(secret, {
		counter: Math.floor(Date.now() / milliseconds),
		digits,
		hash: options?.hash
	});
}
async function verifyTOTP(otp, { window = 1, digits = defaultDigits, secret, period = defaultPeriod }) {
	const milliseconds = period * 1e3;
	const counter = Math.floor(Date.now() / milliseconds);
	for (let i = -window; i <= window; i++) if (otp === await generateHOTP(secret, {
		counter: counter + i,
		digits
	})) return true;
	return false;
}
function generateQRCode({ issuer, account, secret, digits = defaultDigits, period = defaultPeriod }) {
	const baseURI = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}`;
	const params = new URLSearchParams({
		secret: base32.encode(secret, { padding: false }),
		issuer
	});
	if (digits !== void 0) params.set("digits", digits.toString());
	if (period !== void 0) params.set("period", period.toString());
	return `${baseURI}?${params.toString()}`;
}
var createOTP = (secret, opts) => {
	const digits = opts?.digits ?? defaultDigits;
	const period = opts?.period ?? defaultPeriod;
	return {
		hotp: (counter) => generateHOTP(secret, {
			counter,
			digits
		}),
		totp: () => generateTOTP(secret, {
			digits,
			period
		}),
		verify: (otp, options) => verifyTOTP(otp, {
			secret,
			digits,
			period,
			...options
		}),
		url: (issuer, account) => generateQRCode({
			issuer,
			account,
			secret,
			digits,
			period
		})
	};
};
var generateTOTPBodySchema = object({ secret: string().meta({ description: "The secret to generate the TOTP code" }) });
var getTOTPURIBodySchema = object({ password: string().meta({ description: "User password" }) });
var verifyTOTPBodySchema = object({
	code: string().meta({ description: "The otp code to verify. Eg: \"012345\"" }),
	trustDevice: boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
var totp2fa = (options) => {
	const opts = {
		...options,
		digits: options?.digits || 6,
		period: options?.period || 30
	};
	const twoFactorTable = "twoFactor";
	return {
		id: "totp",
		endpoints: {
			generateTOTP: createAuthEndpoint({
				method: "POST",
				body: generateTOTPBodySchema,
				metadata: { openapi: {
					summary: "Generate TOTP code",
					description: "Use this endpoint to generate a TOTP code",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { code: { type: "string" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (options?.disable) {
					ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
					throw APIError.from("BAD_REQUEST", {
						message: "totp isn't configured",
						code: "TOTP_NOT_CONFIGURED"
					});
				}
				return { code: await createOTP(ctx.body.secret, {
					period: opts.period,
					digits: opts.digits
				}).totp() };
			}),
			getTOTPURI: createAuthEndpoint("/two-factor/get-totp-uri", {
				method: "POST",
				use: [sessionMiddleware],
				body: getTOTPURIBodySchema,
				metadata: { openapi: {
					summary: "Get TOTP URI",
					description: "Use this endpoint to get the TOTP URI",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { totpURI: { type: "string" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (options?.disable) {
					ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
					throw APIError.from("BAD_REQUEST", {
						message: "totp isn't configured",
						code: "TOTP_NOT_CONFIGURED"
					});
				}
				const user = ctx.context.session.user;
				const twoFactor = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user.id
					}]
				});
				if (!twoFactor) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED);
				const secret = await symmetricDecrypt({
					key: ctx.context.secret,
					data: twoFactor.secret
				});
				await ctx.context.password.checkPassword(user.id, ctx);
				return { totpURI: createOTP(secret, {
					digits: opts.digits,
					period: opts.period
				}).url(options?.issuer || ctx.context.appName, user.email) };
			}),
			verifyTOTP: createAuthEndpoint("/two-factor/verify-totp", {
				method: "POST",
				body: verifyTOTPBodySchema,
				metadata: { openapi: {
					summary: "Verify two factor TOTP",
					description: "Verify two factor TOTP",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { status: { type: "boolean" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (options?.disable) {
					ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
					throw APIError.from("BAD_REQUEST", {
						message: "totp isn't configured",
						code: "TOTP_NOT_CONFIGURED"
					});
				}
				const { session, valid, invalid } = await verifyTwoFactor(ctx);
				const user = session.user;
				const twoFactor = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user.id
					}]
				});
				if (!twoFactor) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED);
				if (!await createOTP(await symmetricDecrypt({
					key: ctx.context.secret,
					data: twoFactor.secret
				}), {
					period: opts.period,
					digits: opts.digits
				}).verify(ctx.body.code)) return invalid("INVALID_CODE");
				if (!user.twoFactorEnabled) {
					if (!session.session) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					const updatedUser = await ctx.context.internalAdapter.updateUser(user.id, { twoFactorEnabled: true });
					const newSession = await ctx.context.internalAdapter.createSession(user.id, false, session.session).catch((e) => {
						throw e;
					});
					await ctx.context.internalAdapter.deleteSession(session.session.token);
					await setSessionCookie(ctx, {
						session: newSession,
						user: updatedUser
					});
				}
				return valid(ctx);
			})
		}
	};
};
var enableTwoFactorBodySchema = object({
	password: string().meta({ description: "User password" }),
	issuer: string().meta({ description: "Custom issuer for the TOTP URI" }).optional()
});
var disableTwoFactorBodySchema = object({ password: string().meta({ description: "User password" }) });
var twoFactor = (options) => {
	const opts = { twoFactorTable: "twoFactor" };
	const trustDeviceMaxAge = options?.trustDeviceMaxAge ?? 2592e3;
	const backupCodeOptions = {
		storeBackupCodes: "encrypted",
		...options?.backupCodeOptions
	};
	const totp = totp2fa(options?.totpOptions);
	const backupCode = backupCode2fa(backupCodeOptions);
	const otp = otp2fa(options?.otpOptions);
	return {
		id: "two-factor",
		endpoints: {
			...totp.endpoints,
			...otp.endpoints,
			...backupCode.endpoints,
			enableTwoFactor: createAuthEndpoint("/two-factor/enable", {
				method: "POST",
				body: enableTwoFactorBodySchema,
				use: [sessionMiddleware],
				metadata: { openapi: {
					summary: "Enable two factor authentication",
					description: "Use this endpoint to enable two factor authentication. This will generate a TOTP URI and backup codes. Once the user verifies the TOTP URI, the two factor authentication will be enabled.",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								totpURI: {
									type: "string",
									description: "TOTP URI"
								},
								backupCodes: {
									type: "array",
									items: { type: "string" },
									description: "Backup codes"
								}
							}
						} } }
					} }
				} }
			}, async (ctx) => {
				const user = ctx.context.session.user;
				const { password, issuer } = ctx.body;
				if (!await validatePassword(ctx, {
					password,
					userId: user.id
				})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
				const secret = generateRandomString(32);
				const encryptedSecret = await symmetricEncrypt({
					key: ctx.context.secret,
					data: secret
				});
				const backupCodes = await generateBackupCodes(ctx.context.secret, backupCodeOptions);
				if (options?.skipVerificationOnEnable) {
					const updatedUser = await ctx.context.internalAdapter.updateUser(user.id, { twoFactorEnabled: true });
					/**
					* Update the session cookie with the new user data
					*/
					await setSessionCookie(ctx, {
						session: await ctx.context.internalAdapter.createSession(updatedUser.id, false, ctx.context.session.session),
						user: updatedUser
					});
					await ctx.context.internalAdapter.deleteSession(ctx.context.session.session.token);
				}
				await ctx.context.adapter.deleteMany({
					model: opts.twoFactorTable,
					where: [{
						field: "userId",
						value: user.id
					}]
				});
				await ctx.context.adapter.create({
					model: opts.twoFactorTable,
					data: {
						secret: encryptedSecret,
						backupCodes: backupCodes.encryptedBackupCodes,
						userId: user.id
					}
				});
				const totpURI = createOTP(secret, {
					digits: options?.totpOptions?.digits || 6,
					period: options?.totpOptions?.period
				}).url(issuer || options?.issuer || ctx.context.appName, user.email);
				return ctx.json({
					totpURI,
					backupCodes: backupCodes.backupCodes
				});
			}),
			disableTwoFactor: createAuthEndpoint("/two-factor/disable", {
				method: "POST",
				body: disableTwoFactorBodySchema,
				use: [sessionMiddleware],
				metadata: { openapi: {
					summary: "Disable two factor authentication",
					description: "Use this endpoint to disable two factor authentication.",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { status: { type: "boolean" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				const user = ctx.context.session.user;
				const { password } = ctx.body;
				if (!await validatePassword(ctx, {
					password,
					userId: user.id
				})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
				const updatedUser = await ctx.context.internalAdapter.updateUser(user.id, { twoFactorEnabled: false });
				await ctx.context.adapter.delete({
					model: opts.twoFactorTable,
					where: [{
						field: "userId",
						value: updatedUser.id
					}]
				});
				/**
				* Update the session cookie with the new user data
				*/
				await setSessionCookie(ctx, {
					session: await ctx.context.internalAdapter.createSession(updatedUser.id, false, ctx.context.session.session),
					user: updatedUser
				});
				await ctx.context.internalAdapter.deleteSession(ctx.context.session.session.token);
				const disableTrustCookie = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: trustDeviceMaxAge });
				const disableTrustValue = await ctx.getSignedCookie(disableTrustCookie.name, ctx.context.secret);
				if (disableTrustValue) {
					const [, trustId] = disableTrustValue.split("!");
					if (trustId) await ctx.context.internalAdapter.deleteVerificationByIdentifier(trustId);
					expireCookie(ctx, disableTrustCookie);
				}
				return ctx.json({ status: true });
			})
		},
		options,
		hooks: { after: [{
			matcher(context) {
				return context.path === "/sign-in/email" || context.path === "/sign-in/username" || context.path === "/sign-in/phone-number";
			},
			handler: createAuthMiddleware(async (ctx) => {
				const data = ctx.context.newSession;
				if (!data) return;
				if (!data?.user.twoFactorEnabled) return;
				const trustDeviceCookieAttrs = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: trustDeviceMaxAge });
				const trustDeviceCookie = await ctx.getSignedCookie(trustDeviceCookieAttrs.name, ctx.context.secret);
				if (trustDeviceCookie) {
					const [token, trustIdentifier] = trustDeviceCookie.split("!");
					if (token && trustIdentifier) {
						if (token === await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${trustIdentifier}`)) {
							const verificationRecord = await ctx.context.internalAdapter.findVerificationValue(trustIdentifier);
							if (verificationRecord && verificationRecord.value === data.user.id && verificationRecord.expiresAt > /* @__PURE__ */ new Date()) {
								await ctx.context.internalAdapter.deleteVerificationValue(verificationRecord.id);
								const newTrustIdentifier = `trust-device-${generateRandomString(32)}`;
								const newToken = await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${newTrustIdentifier}`);
								await ctx.context.internalAdapter.createVerificationValue({
									value: data.user.id,
									identifier: newTrustIdentifier,
									expiresAt: new Date(Date.now() + trustDeviceMaxAge * 1e3)
								});
								const newTrustDeviceCookie = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: trustDeviceMaxAge });
								await ctx.setSignedCookie(newTrustDeviceCookie.name, `${newToken}!${newTrustIdentifier}`, ctx.context.secret, trustDeviceCookieAttrs.attributes);
								return;
							}
						}
					}
					expireCookie(ctx, trustDeviceCookieAttrs);
				}
				/**
				* remove the session cookie. It's set by the sign in credential
				*/
				deleteSessionCookie(ctx, true);
				await ctx.context.internalAdapter.deleteSession(data.session.token);
				const maxAge = options?.twoFactorCookieMaxAge ?? 600;
				const twoFactorCookie = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME, { maxAge });
				const identifier = `2fa-${generateRandomString(20)}`;
				await ctx.context.internalAdapter.createVerificationValue({
					value: data.user.id,
					identifier,
					expiresAt: new Date(Date.now() + maxAge * 1e3)
				});
				await ctx.setSignedCookie(twoFactorCookie.name, identifier, ctx.context.secret, twoFactorCookie.attributes);
				return ctx.json({ twoFactorRedirect: true });
			})
		}] },
		schema: mergeSchema(schema, options?.schema),
		rateLimit: [{
			pathMatcher(path) {
				return path.startsWith("/two-factor/");
			},
			window: 10,
			max: 3
		}],
		$ERROR_CODES: TWO_FACTOR_ERROR_CODES
	};
};
var getSchema = (normalizer) => {
	return { user: { fields: {
		username: {
			type: "string",
			required: false,
			sortable: true,
			unique: true,
			returned: true,
			transform: { input(value) {
				return typeof value !== "string" ? value : normalizer.username(value);
			} }
		},
		displayUsername: {
			type: "string",
			required: false,
			transform: { input(value) {
				return typeof value !== "string" ? value : normalizer.displayUsername(value);
			} }
		}
	} } };
};
function defaultUsernameValidator(username) {
	return /^[a-zA-Z0-9_.]+$/.test(username);
}
var signInUsernameBodySchema = object({
	username: string().meta({ description: "The username of the user" }),
	password: string().meta({ description: "The password of the user" }),
	rememberMe: boolean().meta({ description: "Remember the user session" }).optional(),
	callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
});
var isUsernameAvailableBodySchema = object({ username: string().meta({ description: "The username to check" }) });
var username = (options) => {
	const normalizer = (username) => {
		if (options?.usernameNormalization === false) return username;
		if (options?.usernameNormalization) return options.usernameNormalization(username);
		return username.toLowerCase();
	};
	const displayUsernameNormalizer = (displayUsername) => {
		return options?.displayUsernameNormalization ? options.displayUsernameNormalization(displayUsername) : displayUsername;
	};
	return {
		id: "username",
		init(ctx) {
			return { options: { databaseHooks: { user: {
				create: { async before(user, context) {
					const username = "username" in user ? user.username : null;
					const displayUsername = "displayUsername" in user ? user.displayUsername : null;
					return { data: {
						...user,
						...username ? { username: normalizer(username) } : {},
						...displayUsername ? { displayUsername: displayUsernameNormalizer(displayUsername) } : {}
					} };
				} },
				update: { async before(user, context) {
					const username = "username" in user ? user.username : null;
					const displayUsername = "displayUsername" in user ? user.displayUsername : null;
					return { data: {
						...user,
						...username ? { username: normalizer(username) } : {},
						...displayUsername ? { displayUsername: displayUsernameNormalizer(displayUsername) } : {}
					} };
				} }
			} } } };
		},
		endpoints: {
			signInUsername: createAuthEndpoint("/sign-in/username", {
				method: "POST",
				body: signInUsernameBodySchema,
				metadata: { openapi: {
					summary: "Sign in with username",
					description: "Sign in with username",
					responses: {
						200: {
							description: "Success",
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									token: {
										type: "string",
										description: "Session token for the authenticated session"
									},
									user: { $ref: "#/components/schemas/User" }
								},
								required: ["token", "user"]
							} } }
						},
						422: {
							description: "Unprocessable Entity. Validation error",
							content: { "application/json": { schema: {
								type: "object",
								properties: { message: { type: "string" } }
							} } }
						}
					}
				} }
			}, async (ctx) => {
				if (!ctx.body.username || !ctx.body.password) {
					ctx.context.logger.error("Username or password not found");
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				const username = options?.validationOrder?.username === "pre-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
				const minUsernameLength = options?.minUsernameLength || 3;
				const maxUsernameLength = options?.maxUsernameLength || 30;
				if (username.length < minUsernameLength) {
					ctx.context.logger.error("Username too short", { username });
					throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_SHORT);
				}
				if (username.length > maxUsernameLength) {
					ctx.context.logger.error("Username too long", { username });
					throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_LONG);
				}
				if (!await (options?.usernameValidator || defaultUsernameValidator)(username)) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.INVALID_USERNAME);
				const user = await ctx.context.adapter.findOne({
					model: "user",
					where: [{
						field: "username",
						value: normalizer(username)
					}]
				});
				if (!user) {
					await ctx.context.password.hash(ctx.body.password);
					ctx.context.logger.error("User not found", { username });
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				const account = await ctx.context.adapter.findOne({
					model: "account",
					where: [{
						field: "userId",
						value: user.id
					}, {
						field: "providerId",
						value: "credential"
					}]
				});
				if (!account) throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				const currentPassword = account?.password;
				if (!currentPassword) {
					ctx.context.logger.error("Password not found", { username });
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				if (!await ctx.context.password.verify({
					hash: currentPassword,
					password: ctx.body.password
				})) {
					ctx.context.logger.error("Invalid password");
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.emailVerified) {
					if (!ctx.context.options?.emailVerification?.sendVerificationEmail) throw APIError.from("FORBIDDEN", USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED);
					if (ctx.context.options?.emailVerification?.sendOnSignIn) {
						const token = await createEmailVerificationToken(ctx.context.secret, user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
						const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
						await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
							user,
							url,
							token
						}, ctx.request));
					}
					throw APIError.from("FORBIDDEN", USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED);
				}
				const session = await ctx.context.internalAdapter.createSession(user.id, ctx.body.rememberMe === false);
				if (!session) return ctx.json(null, {
					status: 500,
					body: { message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION.message }
				});
				await setSessionCookie(ctx, {
					session,
					user
				}, ctx.body.rememberMe === false);
				return ctx.json({
					token: session.token,
					user: parseUserOutput(ctx.context.options, user)
				});
			}),
			isUsernameAvailable: createAuthEndpoint("/is-username-available", {
				method: "POST",
				body: isUsernameAvailableBodySchema
			}, async (ctx) => {
				const username = ctx.body.username;
				if (!username) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.INVALID_USERNAME);
				const minUsernameLength = options?.minUsernameLength || 3;
				const maxUsernameLength = options?.maxUsernameLength || 30;
				if (username.length < minUsernameLength) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_SHORT);
				if (username.length > maxUsernameLength) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_LONG);
				if (!await (options?.usernameValidator || defaultUsernameValidator)(username)) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.INVALID_USERNAME);
				if (await ctx.context.adapter.findOne({
					model: "user",
					where: [{
						field: "username",
						value: normalizer(username)
					}]
				})) return ctx.json({ available: false });
				return ctx.json({ available: true });
			})
		},
		schema: mergeSchema(getSchema({
			username: normalizer,
			displayUsername: displayUsernameNormalizer
		}), options?.schema),
		hooks: { before: [{
			matcher(context) {
				return context.path === "/sign-up/email" || context.path === "/update-user";
			},
			handler: createAuthMiddleware(async (ctx) => {
				const username = typeof ctx.body.username === "string" && options?.validationOrder?.username === "post-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
				if (username !== void 0 && typeof username === "string") {
					const minUsernameLength = options?.minUsernameLength || 3;
					const maxUsernameLength = options?.maxUsernameLength || 30;
					if (username.length < minUsernameLength) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.USERNAME_TOO_SHORT);
					if (username.length > maxUsernameLength) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.USERNAME_TOO_LONG);
					if (!await (options?.usernameValidator || defaultUsernameValidator)(username)) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.INVALID_USERNAME);
					const user = await ctx.context.adapter.findOne({
						model: "user",
						where: [{
							field: "username",
							value: username
						}]
					});
					const blockChangeSignUp = ctx.path === "/sign-up/email" && user;
					const blockChangeUpdateUser = ctx.path === "/update-user" && user && ctx.context.session && user.id !== ctx.context.session.session.userId;
					if (blockChangeSignUp || blockChangeUpdateUser) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.USERNAME_IS_ALREADY_TAKEN);
				}
				const displayUsername = typeof ctx.body.displayUsername === "string" && options?.validationOrder?.displayUsername === "post-normalization" ? displayUsernameNormalizer(ctx.body.displayUsername) : ctx.body.displayUsername;
				if (displayUsername !== void 0 && typeof displayUsername === "string") {
					if (options?.displayUsernameValidator) {
						if (!await options.displayUsernameValidator(displayUsername)) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.INVALID_DISPLAY_USERNAME);
					}
				}
			})
		}, {
			matcher(context) {
				return context.path === "/sign-up/email" || context.path === "/update-user";
			},
			handler: createAuthMiddleware(async (ctx) => {
				if (ctx.body.username && !ctx.body.displayUsername) ctx.body.displayUsername = ctx.body.username;
				if (ctx.body.displayUsername && !ctx.body.username) ctx.body.username = ctx.body.displayUsername;
			})
		}] },
		options,
		$ERROR_CODES: USERNAME_ERROR_CODES
	};
};
/**
* TanStack Start cookie plugin for React.
*
* This plugin automatically handles cookie setting for TanStack Start with React.
* It uses `@tanstack/react-start-server` to set cookies.
*
* For Solid.js, use `better-auth/tanstack-start/solid` instead.
*
* @example
* ```ts
* import { tanstackStartCookies } from "better-auth/tanstack-start";
*
* const auth = betterAuth({
*   plugins: [tanstackStartCookies()],
* });
* ```
*/
var tanstackStartCookies = () => {
	return {
		id: "tanstack-start-cookies",
		hooks: { after: [{
			matcher(ctx) {
				return true;
			},
			handler: createAuthMiddleware(async (ctx) => {
				const returned = ctx.context.responseHeaders;
				if ("_flag" in ctx && ctx._flag === "router") return;
				if (returned instanceof Headers) {
					const setCookies = returned?.get("set-cookie");
					if (!setCookies) return;
					const parsed = parseSetCookieHeader(setCookies);
					const { setCookie } = await import("./server-DkEu4uhV.mjs");
					parsed.forEach((value, key) => {
						if (!key) return;
						const opts = {
							sameSite: value.samesite,
							secure: value.secure,
							maxAge: value["max-age"],
							httpOnly: value.httponly,
							domain: value.domain,
							path: value.path
						};
						try {
							setCookie(key, decodeURIComponent(value.value), opts);
						} catch {}
					});
					return;
				}
			})
		}] }
	};
};
var createSsrRpc = (functionId, importer) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (importer ? await importer() : await getServerFnById(functionId))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var inferAdditionalFields = (schema) => {
	return {
		id: "additional-fields-client",
		$InferServerPlugin: {}
	};
};
var apiKeyClient = () => {
	return {
		id: "api-key",
		$InferServerPlugin: {},
		pathMethods: {
			"/api-key/create": "POST",
			"/api-key/delete": "POST",
			"/api-key/delete-all-expired-api-keys": "POST"
		},
		$ERROR_CODES: API_KEY_ERROR_CODES
	};
};
var genericOAuthClient = () => {
	return {
		id: "generic-oauth-client",
		$InferServerPlugin: {},
		$ERROR_CODES: GENERIC_OAUTH_ERROR_CODES
	};
};
var listenerQueue = [];
var lqIndex = 0;
var QUEUE_ITEMS_PER_LISTENER = 4;
var epoch = 0;
var atom = /* @__NO_SIDE_EFFECTS__ */ (initialValue) => {
	let listeners = [];
	let $atom = {
		get() {
			if (!$atom.lc) $atom.listen(() => {})();
			return $atom.value;
		},
		lc: 0,
		listen(listener) {
			$atom.lc = listeners.push(listener);
			return () => {
				for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;) if (listenerQueue[i] === listener) listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
				else i += QUEUE_ITEMS_PER_LISTENER;
				let index = listeners.indexOf(listener);
				if (~index) {
					listeners.splice(index, 1);
					if (!--$atom.lc) $atom.off();
				}
			};
		},
		notify(oldValue, changedKey) {
			epoch++;
			let runListenerQueue = !listenerQueue.length;
			for (let listener of listeners) listenerQueue.push(listener, $atom.value, oldValue, changedKey);
			if (runListenerQueue) {
				for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) listenerQueue[lqIndex](listenerQueue[lqIndex + 1], listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
				listenerQueue.length = 0;
			}
		},
		off() {},
		set(newValue) {
			let oldValue = $atom.value;
			if (oldValue !== newValue) {
				$atom.value = newValue;
				$atom.notify(oldValue);
			}
		},
		subscribe(listener) {
			let unbind = $atom.listen(listener);
			listener($atom.value);
			return unbind;
		},
		value: initialValue
	};
	return $atom;
};
var MOUNT = 5;
var UNMOUNT = 6;
var REVERT_MUTATION = 10;
var on = (object, listener, eventKey, mutateStore) => {
	object.events = object.events || {};
	if (!object.events[eventKey + REVERT_MUTATION]) object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
		object.events[eventKey].reduceRight((event, l) => (l(event), event), {
			shared: {},
			...eventProps
		});
	});
	object.events[eventKey] = object.events[eventKey] || [];
	object.events[eventKey].push(listener);
	return () => {
		let currentListeners = object.events[eventKey];
		let index = currentListeners.indexOf(listener);
		currentListeners.splice(index, 1);
		if (!currentListeners.length) {
			delete object.events[eventKey];
			object.events[eventKey + REVERT_MUTATION]();
			delete object.events[eventKey + REVERT_MUTATION];
		}
	};
};
var STORE_UNMOUNT_DELAY = 1e3;
var onMount = ($store, initialize) => {
	let listener = (payload) => {
		let destroy = initialize(payload);
		if (destroy) $store.events[UNMOUNT].push(destroy);
	};
	return on($store, listener, MOUNT, (runListeners) => {
		let originListen = $store.listen;
		$store.listen = (...args) => {
			if (!$store.lc && !$store.active) {
				$store.active = true;
				runListeners();
			}
			return originListen(...args);
		};
		let originOff = $store.off;
		$store.events[UNMOUNT] = [];
		$store.off = () => {
			originOff();
			setTimeout(() => {
				if ($store.active && !$store.lc) {
					$store.active = false;
					for (let destroy of $store.events[UNMOUNT]) destroy();
					$store.events[UNMOUNT] = [];
				}
			}, STORE_UNMOUNT_DELAY);
		};
		return () => {
			$store.listen = originListen;
			$store.off = originOff;
		};
	});
};
function listenKeys($store, keys, listener) {
	let keysSet = new Set(keys).add(void 0);
	return $store.listen((value, oldValue, changed) => {
		if (keysSet.has(changed)) listener(value, oldValue, changed);
	});
}
var isServer = () => typeof window === "undefined";
var useAuthQuery = (initializedAtom, path, $fetch, options) => {
	const value = /* @__PURE__ */ atom({
		data: null,
		error: null,
		isPending: true,
		isRefetching: false,
		refetch: (queryParams) => fn(queryParams)
	});
	const fn = async (queryParams) => {
		return new Promise((resolve) => {
			const opts = typeof options === "function" ? options({
				data: value.get().data,
				error: value.get().error,
				isPending: value.get().isPending
			}) : options;
			$fetch(path, {
				...opts,
				query: {
					...opts?.query,
					...queryParams?.query
				},
				async onSuccess(context) {
					value.set({
						data: context.data,
						error: null,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onSuccess?.(context);
				},
				async onError(context) {
					const { request } = context;
					const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
					const retryAttempt = request.retryAttempt || 0;
					if (retryAttempts && retryAttempt < retryAttempts) return;
					value.set({
						error: context.error,
						data: null,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onError?.(context);
				},
				async onRequest(context) {
					const currentValue = value.get();
					value.set({
						isPending: currentValue.data === null,
						data: currentValue.data,
						error: null,
						isRefetching: true,
						refetch: value.value.refetch
					});
					await opts?.onRequest?.(context);
				}
			}).catch((error) => {
				value.set({
					error,
					data: null,
					isPending: false,
					isRefetching: false,
					refetch: value.value.refetch
				});
			}).finally(() => {
				resolve(void 0);
			});
		});
	};
	initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [initializedAtom];
	let isMounted = false;
	for (const initAtom of initializedAtom) initAtom.subscribe(async () => {
		if (isServer()) return;
		if (isMounted) await fn();
		else onMount(value, () => {
			const timeoutId = setTimeout(async () => {
				if (!isMounted) {
					await fn();
					isMounted = true;
				}
			}, 0);
			return () => {
				value.off();
				initAtom.off();
				clearTimeout(timeoutId);
			};
		});
	});
	return value;
};
var kBroadcastChannel = Symbol.for("better-auth:broadcast-channel");
var now$1 = () => Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
	listeners = /* @__PURE__ */ new Set();
	name;
	constructor(name = "better-auth.message") {
		this.name = name;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	post(message) {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(this.name, JSON.stringify({
				...message,
				timestamp: now$1()
			}));
		} catch {}
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const handler = (event) => {
			if (event.key !== this.name) return;
			const message = JSON.parse(event.newValue ?? "{}");
			if (message?.event !== "session" || !message?.data) return;
			this.listeners.forEach((listener) => listener(message));
		};
		window.addEventListener("storage", handler);
		return () => {
			window.removeEventListener("storage", handler);
		};
	}
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
	if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
	return globalThis[kBroadcastChannel];
}
var kFocusManager = Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
	listeners = /* @__PURE__ */ new Set();
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setFocused(focused) {
		this.listeners.forEach((listener) => listener(focused));
	}
	setup() {
		if (typeof window === "undefined" || typeof document === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const visibilityHandler = () => {
			if (document.visibilityState === "visible") this.setFocused(true);
		};
		document.addEventListener("visibilitychange", visibilityHandler, false);
		return () => {
			document.removeEventListener("visibilitychange", visibilityHandler, false);
		};
	}
};
function getGlobalFocusManager() {
	if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
	return globalThis[kFocusManager];
}
var kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
	listeners = /* @__PURE__ */ new Set();
	isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setOnline(online) {
		this.isOnline = online;
		this.listeners.forEach((listener) => listener(online));
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const onOnline = () => this.setOnline(true);
		const onOffline = () => this.setOnline(false);
		window.addEventListener("online", onOnline, false);
		window.addEventListener("offline", onOffline, false);
		return () => {
			window.removeEventListener("online", onOnline, false);
			window.removeEventListener("offline", onOffline, false);
		};
	}
};
function getGlobalOnlineManager() {
	if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
	return globalThis[kOnlineManager];
}
var now = () => Math.floor(Date.now() / 1e3);
/**
* Rate limit: don't refetch on focus if a session request was made within this many seconds
*/
var FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
	const { sessionAtom, sessionSignal, $fetch, options = {} } = opts;
	const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
	const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
	const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
	const state = {
		lastSync: 0,
		lastSessionRequest: 0,
		cachedSession: void 0
	};
	const shouldRefetch = () => {
		return refetchWhenOffline || getGlobalOnlineManager().isOnline;
	};
	const triggerRefetch = (event) => {
		if (!shouldRefetch()) return;
		if (event?.event === "storage") {
			state.lastSync = now();
			sessionSignal.set(!sessionSignal.get());
			return;
		}
		const currentSession = sessionAtom.get();
		const fetchSessionWithRefresh = () => {
			state.lastSessionRequest = now();
			$fetch("/get-session").then(async (res) => {
				let data = res.data;
				let error = res.error || null;
				if (data?.needsRefresh) try {
					const refreshRes = await $fetch("/get-session", { method: "POST" });
					data = refreshRes.data;
					error = refreshRes.error || null;
				} catch {}
				const sessionData = data?.session && data?.user ? {
					session: data.session,
					user: data.user
				} : null;
				sessionAtom.set({
					...currentSession,
					data: sessionData,
					error
				});
				state.lastSync = now();
				sessionSignal.set(!sessionSignal.get());
			}).catch(() => {});
		};
		if (event?.event === "poll") {
			fetchSessionWithRefresh();
			return;
		}
		if (event?.event === "visibilitychange") {
			if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
			state.lastSessionRequest = now();
		}
		if (event?.event === "visibilitychange") {
			fetchSessionWithRefresh();
			return;
		}
		if (currentSession?.data === null || currentSession?.data === void 0) {
			state.lastSync = now();
			sessionSignal.set(!sessionSignal.get());
		}
	};
	const broadcastSessionUpdate = (trigger) => {
		getGlobalBroadcastChannel().post({
			event: "session",
			data: { trigger },
			clientId: Math.random().toString(36).substring(7)
		});
	};
	const setupPolling = () => {
		if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
			if (sessionAtom.get()?.data) triggerRefetch({ event: "poll" });
		}, refetchInterval * 1e3);
	};
	const setupBroadcast = () => {
		state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
			triggerRefetch({ event: "storage" });
		});
	};
	const setupFocusRefetch = () => {
		if (!refetchOnWindowFocus) return;
		state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
			triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupOnlineRefetch = () => {
		state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
			if (online) triggerRefetch({ event: "visibilitychange" });
		});
	};
	const init = () => {
		setupPolling();
		setupBroadcast();
		setupFocusRefetch();
		setupOnlineRefetch();
		getGlobalBroadcastChannel().setup();
		getGlobalFocusManager().setup();
		getGlobalOnlineManager().setup();
	};
	const cleanup = () => {
		if (state.pollInterval) {
			clearInterval(state.pollInterval);
			state.pollInterval = void 0;
		}
		if (state.unsubscribeBroadcast) {
			state.unsubscribeBroadcast();
			state.unsubscribeBroadcast = void 0;
		}
		if (state.unsubscribeFocus) {
			state.unsubscribeFocus();
			state.unsubscribeFocus = void 0;
		}
		if (state.unsubscribeOnline) {
			state.unsubscribeOnline();
			state.unsubscribeOnline = void 0;
		}
		state.lastSync = 0;
		state.lastSessionRequest = 0;
		state.cachedSession = void 0;
	};
	return {
		init,
		cleanup,
		triggerRefetch,
		broadcastSessionUpdate
	};
}
var redirectPlugin = {
	id: "redirect",
	name: "Redirect",
	hooks: { onSuccess(context) {
		if (context.data?.url && context.data?.redirect) {
			if (typeof window !== "undefined" && window.location) {
				if (window.location) try {
					window.location.href = context.data.url;
				} catch {}
			}
		}
	} }
};
function getSessionAtom($fetch, options) {
	const $signal = /* @__PURE__ */ atom(false);
	const session = useAuthQuery($signal, "/get-session", $fetch, { method: "GET" });
	onMount(session, () => {
		const refreshManager = createSessionRefreshManager({
			sessionAtom: session,
			sessionSignal: $signal,
			$fetch,
			options
		});
		refreshManager.init();
		return () => {
			refreshManager.cleanup();
		};
	});
	return {
		session,
		$sessionSignal: $signal
	};
}
var getClientConfig = (options, loadEnv) => {
	const isCredentialsSupported = "credentials" in Request.prototype;
	const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0, loadEnv) ?? "/api/auth";
	const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
	const lifeCyclePlugin = {
		id: "lifecycle-hooks",
		name: "lifecycle-hooks",
		hooks: {
			onSuccess: options?.fetchOptions?.onSuccess,
			onError: options?.fetchOptions?.onError,
			onRequest: options?.fetchOptions?.onRequest,
			onResponse: options?.fetchOptions?.onResponse
		}
	};
	const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
	const $fetch = createFetch({
		baseURL,
		...isCredentialsSupported ? { credentials: "include" } : {},
		method: "GET",
		jsonParser(text) {
			if (!text) return null;
			return parseJSON(text, { strict: false });
		},
		customFetchImpl: fetch,
		...restOfFetchOptions,
		plugins: [
			lifeCyclePlugin,
			...restOfFetchOptions.plugins || [],
			...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
			...pluginsFetchPlugins
		]
	});
	const { $sessionSignal, session } = getSessionAtom($fetch, options);
	const plugins = options?.plugins || [];
	let pluginsActions = {};
	const pluginsAtoms = {
		$sessionSignal,
		session
	};
	const pluginPathMethods = {
		"/sign-out": "POST",
		"/revoke-sessions": "POST",
		"/revoke-other-sessions": "POST",
		"/delete-user": "POST"
	};
	const atomListeners = [{
		signal: "$sessionSignal",
		matcher(path) {
			return path === "/sign-out" || path === "/update-user" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/change-email";
		}
	}];
	for (const plugin of plugins) {
		if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
		if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
		if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
	}
	const $store = {
		notify: (signal) => {
			pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
		},
		listen: (signal, listener) => {
			pluginsAtoms[signal].subscribe(listener);
		},
		atoms: pluginsAtoms
	};
	for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
	return {
		get baseURL() {
			return baseURL;
		},
		pluginsActions,
		pluginsAtoms,
		pluginPathMethods,
		atomListeners,
		$fetch,
		$store
	};
};
function isAtom(value) {
	return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
function getMethod(path, knownPathMethods, args) {
	const method = knownPathMethods[path];
	const { fetchOptions, query: _query, ...body } = args || {};
	if (method) return method;
	if (fetchOptions?.method) return fetchOptions.method;
	if (body && Object.keys(body).length > 0) return "POST";
	return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
	function createProxy(path = []) {
		return new Proxy(function() {}, {
			get(_, prop) {
				if (typeof prop !== "string") return;
				if (prop === "then" || prop === "catch" || prop === "finally") return;
				const fullPath = [...path, prop];
				let current = routes;
				for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
				else {
					current = void 0;
					break;
				}
				if (typeof current === "function") return current;
				if (isAtom(current)) return current;
				return createProxy(fullPath);
			},
			apply: async (_, __, args) => {
				const routePath = "/" + path.map((segment) => segment.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)).join("/");
				const arg = args[0] || {};
				const fetchOptions = args[1] || {};
				const { query, fetchOptions: argFetchOptions, ...body } = arg;
				const options = {
					...fetchOptions,
					...argFetchOptions
				};
				const method = getMethod(routePath, knownPathMethods, arg);
				return await client(routePath, {
					...options,
					body: method === "GET" ? void 0 : {
						...body,
						...options?.body || {}
					},
					query: query || options?.query,
					method,
					async onSuccess(context) {
						await options?.onSuccess?.(context);
						if (!atomListeners || options.disableSignal) return;
						/**
						* We trigger listeners
						*/
						const matches = atomListeners.filter((s) => s.matcher(routePath));
						if (!matches.length) return;
						const visited = /* @__PURE__ */ new Set();
						for (const match of matches) {
							const signal = atoms[match.signal];
							if (!signal) return;
							if (visited.has(match.signal)) continue;
							visited.add(match.signal);
							/**
							* To avoid race conditions we set the signal in a setTimeout
							*/
							const val = signal.get();
							setTimeout(() => {
								signal.set(!val);
							}, 10);
						}
					}
				});
			}
		});
	}
	return createProxy();
}
var usernameClient = () => {
	return {
		id: "username",
		$InferServerPlugin: {},
		atomListeners: [{
			matcher: (path) => path === "/sign-in/username",
			signal: "$sessionSignal"
		}],
		$ERROR_CODES: USERNAME_ERROR_CODES
	};
};
/**
* Subscribe to store changes and get store's value.
*
* Can be used with store builder too.
*
* ```js
* import { useStore } from 'nanostores/react'
*
* import { router } from '../store/router'
*
* export const Layout = () => {
*   let page = useStore(router)
*   if (page.route === 'home') {
*     return <HomePage />
*   } else {
*     return <Error404 />
*   }
* }
* ```
*
* @param store Store instance.
* @returns Store value.
*/
function useStore(store, options = {}) {
	const snapshotRef = (0, import_react.useRef)(store.get());
	const { keys, deps = [store, keys] } = options;
	const subscribe = (0, import_react.useCallback)((onChange) => {
		const emitChange = (value) => {
			if (snapshotRef.current === value) return;
			snapshotRef.current = value;
			onChange();
		};
		emitChange(store.value);
		if (keys?.length) return listenKeys(store, keys, emitChange);
		return store.listen(emitChange);
	}, deps);
	const get = () => snapshotRef.current;
	return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}
function getAtomKey(str) {
	return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
	const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = getClientConfig(options);
	const resolvedHooks = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
	return createDynamicPathProxy({
		...pluginsActions,
		...resolvedHooks,
		$fetch,
		$store
	}, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
export { username as C, twoFactorClient as S, server_default as _, createServerEntry as a, tanstackStartCookies as b, createSsrRpc as c, genericOAuthClient as d, getCookie as f, openAPI as g, memoryAdapter as h, createAuthClient as i, drizzleAdapter as l, inferAdditionalFields as m, apiKeyClient as n, createServerFn as o, getRequestHeaders as p, betterAuth as r, createServerRpc as s, apiKey as t, genericOAuth as u, setCookie as v, usernameClient as w, twoFactor as x, startInstance as y };

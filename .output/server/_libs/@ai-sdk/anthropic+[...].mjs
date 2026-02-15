import { r as __exportAll } from "../../_runtime.mjs";
/** A special constant with type `never` */
const NEVER = Object.freeze({ status: "aborted" });
function $constructor(name, initializer, params) {
	function init(inst, def) {
		if (!inst._zod) Object.defineProperty(inst, "_zod", {
			value: {
				def,
				constr: _,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: false
		});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
const $brand = Symbol("zod_brand");
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
const globalConfig = {};
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
var util_exports = /* @__PURE__ */ __exportAll({
	BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
	Class: () => Class,
	NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
	aborted: () => aborted,
	allowsEval: () => allowsEval,
	assert: () => assert,
	assertEqual: () => assertEqual,
	assertIs: () => assertIs,
	assertNever: () => assertNever,
	assertNotEqual: () => assertNotEqual,
	assignProp: () => assignProp,
	base64ToUint8Array: () => base64ToUint8Array,
	base64urlToUint8Array: () => base64urlToUint8Array,
	cached: () => cached,
	captureStackTrace: () => captureStackTrace,
	cleanEnum: () => cleanEnum,
	cleanRegex: () => cleanRegex,
	clone: () => clone,
	cloneDef: () => cloneDef,
	createTransparentProxy: () => createTransparentProxy,
	defineLazy: () => defineLazy,
	esc: () => esc,
	escapeRegex: () => escapeRegex,
	extend: () => extend,
	finalizeIssue: () => finalizeIssue,
	floatSafeRemainder: () => floatSafeRemainder$1,
	getElementAtPath: () => getElementAtPath,
	getEnumValues: () => getEnumValues,
	getLengthableOrigin: () => getLengthableOrigin,
	getParsedType: () => getParsedType$1,
	getSizableOrigin: () => getSizableOrigin,
	hexToUint8Array: () => hexToUint8Array,
	isObject: () => isObject,
	isPlainObject: () => isPlainObject,
	issue: () => issue,
	joinValues: () => joinValues,
	jsonStringifyReplacer: () => jsonStringifyReplacer,
	merge: () => merge,
	mergeDefs: () => mergeDefs,
	normalizeParams: () => normalizeParams,
	nullish: () => nullish$1,
	numKeys: () => numKeys,
	objectClone: () => objectClone,
	omit: () => omit,
	optionalKeys: () => optionalKeys,
	parsedType: () => parsedType,
	partial: () => partial,
	pick: () => pick,
	prefixIssues: () => prefixIssues,
	primitiveTypes: () => primitiveTypes,
	promiseAllObject: () => promiseAllObject,
	propertyKeyTypes: () => propertyKeyTypes,
	randomString: () => randomString,
	required: () => required,
	safeExtend: () => safeExtend,
	shallowClone: () => shallowClone,
	slugify: () => slugify,
	stringifyPrimitive: () => stringifyPrimitive,
	uint8ArrayToBase64: () => uint8ArrayToBase64,
	uint8ArrayToBase64url: () => uint8ArrayToBase64url,
	uint8ArrayToHex: () => uint8ArrayToHex,
	unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
	return val;
}
function assertNotEqual(val) {
	return val;
}
function assertIs(_arg) {}
function assertNever(_x) {
	throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {}
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function joinValues(array, separator = "|") {
	return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
		throw new Error("cached value already set");
	} };
}
function nullish$1(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder$1(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepString = step.toString();
	let stepDecCount = (stepString.split(".")[1] || "").length;
	if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
		const match = stepString.match(/\d?e-(\d?)/);
		if (match?.[1]) stepDecCount = Number.parseInt(match[1]);
	}
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
var EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
	let value = void 0;
	Object.defineProperty(object, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true
	});
}
function objectClone(obj) {
	return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
	return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
	if (!path) return obj;
	return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
	const keys = Object.keys(promisesObj);
	const promises = keys.map((key) => promisesObj[key]);
	return Promise.all(promises).then((results) => {
		const resolvedObj = {};
		for (let i = 0; i < keys.length; i++) resolvedObj[keys[i]] = results[i];
		return resolvedObj;
	});
}
function randomString(length = 10) {
	const chars = "abcdefghijklmnopqrstuvwxyz";
	let str = "";
	for (let i = 0; i < length; i++) str += chars[Math.floor(Math.random() * 26)];
	return str;
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached(() => {
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	return o;
}
function numKeys(data) {
	let keyCount = 0;
	for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) keyCount++;
	return keyCount;
}
const getParsedType$1 = (data) => {
	const t = typeof data;
	switch (t) {
		case "undefined": return "undefined";
		case "string": return "string";
		case "number": return Number.isNaN(data) ? "nan" : "number";
		case "boolean": return "boolean";
		case "function": return "function";
		case "bigint": return "bigint";
		case "symbol": return "symbol";
		case "object":
			if (Array.isArray(data)) return "array";
			if (data === null) return "null";
			if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return "promise";
			if (typeof Map !== "undefined" && data instanceof Map) return "map";
			if (typeof Set !== "undefined" && data instanceof Set) return "set";
			if (typeof Date !== "undefined" && data instanceof Date) return "date";
			if (typeof File !== "undefined" && data instanceof File) return "file";
			return "object";
		default: throw new Error(`Unknown data type: ${t}`);
	}
};
const propertyKeyTypes = new Set([
	"string",
	"number",
	"symbol"
]);
const primitiveTypes = new Set([
	"string",
	"number",
	"bigint",
	"boolean",
	"symbol",
	"undefined"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function createTransparentProxy(getter) {
	let target;
	return new Proxy({}, {
		get(_, prop, receiver) {
			target ?? (target = getter());
			return Reflect.get(target, prop, receiver);
		},
		set(_, prop, value, receiver) {
			target ?? (target = getter());
			return Reflect.set(target, prop, value, receiver);
		},
		has(_, prop) {
			target ?? (target = getter());
			return Reflect.has(target, prop);
		},
		deleteProperty(_, prop) {
			target ?? (target = getter());
			return Reflect.deleteProperty(target, prop);
		},
		ownKeys(_) {
			target ?? (target = getter());
			return Reflect.ownKeys(target);
		},
		getOwnPropertyDescriptor(_, prop) {
			target ?? (target = getter());
			return Reflect.getOwnPropertyDescriptor(target, prop);
		},
		defineProperty(_, prop, descriptor) {
			target ?? (target = getter());
			return Reflect.defineProperty(target, prop, descriptor);
		}
	});
}
function stringifyPrimitive(value) {
	if (typeof value === "bigint") return value.toString() + "n";
	if (typeof value === "string") return `"${value}"`;
	return `${value}`;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
const NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
const BIGINT_FORMAT_RANGES = {
	int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = {};
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				newShape[key] = currDef.shape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = { ...schema._zod.def.shape };
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				delete newShape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = schema._zod.def.shape;
		for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function merge(a, b) {
	return clone(a, mergeDefs(a._zod.def, {
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: []
	}));
}
function partial(Class, schema, mask) {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const oldShape = schema._zod.def.shape;
			const shape = { ...oldShape };
			if (mask) for (const key in mask) {
				if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				shape[key] = Class ? new Class({
					type: "optional",
					innerType: oldShape[key]
				}) : oldShape[key];
			}
			else for (const key in oldShape) shape[key] = Class ? new Class({
				type: "optional",
				innerType: oldShape[key]
			}) : oldShape[key];
			assignProp(this, "shape", shape);
			return shape;
		},
		checks: []
	}));
}
function required(Class, schema, mask) {
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const oldShape = schema._zod.def.shape;
		const shape = { ...oldShape };
		if (mask) for (const key in mask) {
			if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
			if (!mask[key]) continue;
			shape[key] = new Class({
				type: "nonoptional",
				innerType: oldShape[key]
			});
		}
		else for (const key in oldShape) shape[key] = new Class({
			type: "nonoptional",
			innerType: oldShape[key]
		});
		assignProp(this, "shape", shape);
		return shape;
	} }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const full = {
		...iss,
		path: iss.path ?? []
	};
	if (!iss.message) full.message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	delete full.inst;
	delete full.continue;
	if (!ctx?.reportInput) delete full.input;
	return full;
}
function getSizableOrigin(input) {
	if (input instanceof Set) return "set";
	if (input instanceof Map) return "map";
	if (input instanceof File) return "file";
	return "unknown";
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function parsedType(data) {
	const t = typeof data;
	switch (t) {
		case "number": return Number.isNaN(data) ? "nan" : "number";
		case "object": {
			if (data === null) return "null";
			if (Array.isArray(data)) return "array";
			const obj = data;
			if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
		}
	}
	return t;
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
function cleanEnum(obj) {
	return Object.entries(obj).filter(([k, _]) => {
		return Number.isNaN(Number.parseInt(k, 10));
	}).map((el) => el[1]);
}
function base64ToUint8Array(base64) {
	const binaryString = atob(base64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
	return bytes;
}
function uint8ArrayToBase64(bytes) {
	let binaryString = "";
	for (let i = 0; i < bytes.length; i++) binaryString += String.fromCharCode(bytes[i]);
	return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
	const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
	return base64ToUint8Array(base64 + "=".repeat((4 - base64.length % 4) % 4));
}
function uint8ArrayToBase64url(bytes) {
	return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
	const cleanHex = hex.replace(/^0x/, "");
	if (cleanHex.length % 2 !== 0) throw new Error("Invalid hex string length");
	const bytes = new Uint8Array(cleanHex.length / 2);
	for (let i = 0; i < cleanHex.length; i += 2) bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
	return bytes;
}
function uint8ArrayToHex(bytes) {
	return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var Class = class {
	constructor(..._args) {}
};
var initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues });
		else if (issue.code === "invalid_element") processError({ issues: issue.issues });
		else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
		else {
			let curr = fieldErrors;
			let i = 0;
			while (i < issue.path.length) {
				const el = issue.path[i];
				if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
				else {
					curr[el] = curr[el] || { _errors: [] };
					curr[el]._errors.push(mapper(issue));
				}
				curr = curr[el];
				i++;
			}
		}
	};
	processError(error);
	return fieldErrors;
}
function treeifyError(error, mapper = (issue) => issue.message) {
	const result = { errors: [] };
	const processError = (error, path = []) => {
		var _a, _b;
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, issue.path));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues }, issue.path);
		else if (issue.code === "invalid_element") processError({ issues: issue.issues }, issue.path);
		else {
			const fullpath = [...path, ...issue.path];
			if (fullpath.length === 0) {
				result.errors.push(mapper(issue));
				continue;
			}
			let curr = result;
			let i = 0;
			while (i < fullpath.length) {
				const el = fullpath[i];
				const terminal = i === fullpath.length - 1;
				if (typeof el === "string") {
					curr.properties ?? (curr.properties = {});
					(_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
					curr = curr.properties[el];
				} else {
					curr.items ?? (curr.items = []);
					(_b = curr.items)[el] ?? (_b[el] = { errors: [] });
					curr = curr.items[el];
				}
				if (terminal) curr.errors.push(mapper(issue));
				i++;
			}
		}
	};
	processError(error);
	return result;
}
/** Format a ZodError as a human-readable string in the following form.
*
* From
*
* ```ts
* ZodError {
*   issues: [
*     {
*       expected: 'string',
*       code: 'invalid_type',
*       path: [ 'username' ],
*       message: 'Invalid input: expected string'
*     },
*     {
*       expected: 'number',
*       code: 'invalid_type',
*       path: [ 'favoriteNumbers', 1 ],
*       message: 'Invalid input: expected number'
*     }
*   ];
* }
* ```
*
* to
*
* ```
* username
*   ✖ Expected number, received string at "username
* favoriteNumbers[0]
*   ✖ Invalid input: expected number
* ```
*/
function toDotPath(_path) {
	const segs = [];
	const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
	for (const seg of path) if (typeof seg === "number") segs.push(`[${seg}]`);
	else if (typeof seg === "symbol") segs.push(`[${JSON.stringify(String(seg))}]`);
	else if (/[^\w$]/.test(seg)) segs.push(`[${JSON.stringify(seg)}]`);
	else {
		if (segs.length) segs.push(".");
		segs.push(seg);
	}
	return segs.join("");
}
function prettifyError(error) {
	const lines = [];
	const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
	for (const issue of issues) {
		lines.push(`✖ ${issue.message}`);
		if (issue.path?.length) lines.push(`  → at ${toDotPath(issue.path)}`);
	}
	return lines.join("\n");
}
const _parse$1 = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
const parse$1 = /* @__PURE__ */ _parse$1($ZodRealError);
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
const parseAsync$1 = /* @__PURE__ */ _parseAsync($ZodRealError);
const _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? {
		success: false,
		error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParse$1 = /* @__PURE__ */ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? {
		success: false,
		error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParseAsync$1 = /* @__PURE__ */ _safeParseAsync($ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parse$1(_Err)(schema, value, ctx);
};
const encode$1 = /* @__PURE__ */ _encode($ZodRealError);
const _decode = (_Err) => (schema, value, _ctx) => {
	return _parse$1(_Err)(schema, value, _ctx);
};
const decode$1 = /* @__PURE__ */ _decode($ZodRealError);
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
const encodeAsync$1 = /* @__PURE__ */ _encodeAsync($ZodRealError);
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
const decodeAsync$1 = /* @__PURE__ */ _decodeAsync($ZodRealError);
const _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
const safeEncode$1 = /* @__PURE__ */ _safeEncode($ZodRealError);
const _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
const safeDecode$1 = /* @__PURE__ */ _safeDecode($ZodRealError);
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
const safeEncodeAsync$1 = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
const safeDecodeAsync$1 = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);
var regexes_exports = /* @__PURE__ */ __exportAll({
	base64: () => base64$1,
	base64url: () => base64url$1,
	bigint: () => bigint$1,
	boolean: () => boolean$1,
	browserEmail: () => browserEmail,
	cidrv4: () => cidrv4$1,
	cidrv6: () => cidrv6$1,
	cuid: () => cuid$1,
	cuid2: () => cuid2$1,
	date: () => date$2,
	datetime: () => datetime$1,
	domain: () => domain,
	duration: () => duration$1,
	e164: () => e164$1,
	email: () => email$1,
	emoji: () => emoji$1,
	extendedDuration: () => extendedDuration,
	guid: () => guid$1,
	hex: () => hex$1,
	hostname: () => hostname$1,
	html5Email: () => html5Email,
	idnEmail: () => idnEmail,
	integer: () => integer,
	ipv4: () => ipv4$1,
	ipv6: () => ipv6$1,
	ksuid: () => ksuid$1,
	lowercase: () => lowercase,
	mac: () => mac$1,
	md5_base64: () => md5_base64,
	md5_base64url: () => md5_base64url,
	md5_hex: () => md5_hex,
	nanoid: () => nanoid$1,
	null: () => _null$2,
	number: () => number$1,
	rfc5322Email: () => rfc5322Email,
	sha1_base64: () => sha1_base64,
	sha1_base64url: () => sha1_base64url,
	sha1_hex: () => sha1_hex,
	sha256_base64: () => sha256_base64,
	sha256_base64url: () => sha256_base64url,
	sha256_hex: () => sha256_hex,
	sha384_base64: () => sha384_base64,
	sha384_base64url: () => sha384_base64url,
	sha384_hex: () => sha384_hex,
	sha512_base64: () => sha512_base64,
	sha512_base64url: () => sha512_base64url,
	sha512_hex: () => sha512_hex,
	string: () => string$1,
	time: () => time$1,
	ulid: () => ulid$1,
	undefined: () => _undefined$2,
	unicodeEmail: () => unicodeEmail,
	uppercase: () => uppercase,
	uuid: () => uuid$1,
	uuid4: () => uuid4,
	uuid6: () => uuid6,
	uuid7: () => uuid7,
	xid: () => xid$1
});
const cuid$1 = /^[cC][^\s-]{8,}$/;
const cuid2$1 = /^[0-9a-z]+$/;
const ulid$1 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid$1 = /^[0-9a-vA-V]{20}$/;
const ksuid$1 = /^[A-Za-z0-9]{27}$/;
const nanoid$1 = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** Implements ISO 8601-2 extensions like explicit +- prefixes, mixing weeks with other units, and fractional/negative components. */
const extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
const guid$1 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
*
* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
const uuid$1 = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const uuid4 = /* @__PURE__ */ uuid$1(4);
const uuid6 = /* @__PURE__ */ uuid$1(6);
const uuid7 = /* @__PURE__ */ uuid$1(7);
/** Practical email validation */
const email$1 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
/** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
const html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/** The classic emailregex.com regex for RFC 5322-compliant emails */
const rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
const unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
const idnEmail = unicodeEmail;
const browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji$1() {
	return new RegExp(_emoji$1, "u");
}
const ipv4$1 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6$1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const mac$1 = (delimiter) => {
	const escapedDelim = escapeRegex(delimiter ?? ":");
	return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
const cidrv4$1 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6$1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64$1 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url$1 = /^[A-Za-z0-9_-]*$/;
const hostname$1 = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
const domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
const e164$1 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$2 = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const timeRegex = `${time}(?:${opts.join("|")})`;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return new RegExp(`^${regex}$`);
};
const bigint$1 = /^-?\d+n?$/;
const integer = /^-?\d+$/;
const number$1 = /^-?\d+(?:\.\d+)?$/;
const boolean$1 = /^(?:true|false)$/i;
var _null$2 = /^null$/i;
var _undefined$2 = /^undefined$/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
const hex$1 = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
	return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
	return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
const md5_hex = /^[0-9a-fA-F]{32}$/;
const md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
const md5_base64url = /* @__PURE__ */ fixedBase64url(22);
const sha1_hex = /^[0-9a-fA-F]{40}$/;
const sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
const sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
const sha256_hex = /^[0-9a-fA-F]{64}$/;
const sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
const sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
const sha384_hex = /^[0-9a-fA-F]{96}$/;
const sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
const sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
const sha512_hex = /^[0-9a-fA-F]{128}$/;
const sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
const sha512_base64url = /* @__PURE__ */ fixedBase64url(86);
const $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
const $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
		else bag.exclusiveMaximum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
		else bag.exclusiveMinimum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		var _a;
		(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
	});
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
		if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder$1(payload.value, def.value) === 0) return;
		payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
		if (isInt) bag.pattern = integer;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					continue: false,
					input,
					inst
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				if (input > 0) payload.issues.push({
					input,
					code: "too_big",
					maximum: Number.MAX_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				else payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				return;
			}
		}
		if (input < minimum) payload.issues.push({
			origin: "number",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "number",
			input,
			code: "too_big",
			maximum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input < minimum) payload.issues.push({
			origin: "bigint",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "bigint",
			input,
			code: "too_big",
			maximum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish$1(val) && val.size !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.size <= def.maximum) return;
		payload.issues.push({
			origin: getSizableOrigin(input),
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish$1(val) && val.size !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.size >= def.minimum) return;
		payload.issues.push({
			origin: getSizableOrigin(input),
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish$1(val) && val.size !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.minimum = def.size;
		bag.maximum = def.size;
		bag.size = def.size;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const size = input.size;
		if (size === def.size) return;
		const tooBig = size > def.size;
		payload.issues.push({
			origin: getSizableOrigin(input),
			...tooBig ? {
				code: "too_big",
				maximum: def.size
			} : {
				code: "too_small",
				minimum: def.size
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish$1(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish$1(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish$1(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.minimum = def.length;
		bag.maximum = def.length;
		bag.length = def.length;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(def.pattern);
		}
	});
	if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
const $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function handleCheckPropertyResult(result, payload, property) {
	if (result.issues.length) payload.issues.push(...prefixIssues(property, result.issues));
}
const $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		const result = def.schema._zod.run({
			value: payload.value[def.property],
			issues: []
		}, {});
		if (result instanceof Promise) return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
		handleCheckPropertyResult(result, payload, def.property);
	};
});
const $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
	$ZodCheck.init(inst, def);
	const mimeSet = new Set(def.mime);
	inst._zod.onattach.push((inst) => {
		inst._zod.bag.mime = def.mime;
	});
	inst._zod.check = (payload) => {
		if (mimeSet.has(payload.value.type)) return;
		payload.issues.push({
			code: "invalid_value",
			values: def.mime,
			input: payload.value.type,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
var Doc = class {
	constructor(args = []) {
		this.content = [];
		this.indent = 0;
		if (this) this.args = args;
	}
	indented(fn) {
		this.indent += 1;
		fn(this);
		this.indent -= 1;
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
const version = {
	major: 4,
	minor: 3,
	patch: 6
};
const $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const checks = [...inst._zod.def.checks ?? []];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.def.when) {
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse({
					value: payload.value,
					issues: []
				}, {
					...ctx,
					skipChecks: true
				});
				if (canary instanceof Promise) return canary.then((canary) => {
					return handleCanaryResult(canary, payload, ctx);
				});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	defineLazy(inst, "~standard", () => ({
		validate: (value) => {
			try {
				const r = safeParse$1(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
});
const $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
const $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
const $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid$1(v));
	} else def.pattern ?? (def.pattern = uuid$1());
	$ZodStringFormat.init(inst, def);
});
const $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			const url = new URL(trimmed);
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: def.hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.normalize) payload.value = url.href;
			else payload.value = trimmed;
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji$1());
	$ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$2);
	$ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4$1);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv4`;
});
const $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6$1);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv6`;
	inst._zod.check = (payload) => {
		try {
			new URL(`http://[${payload.value}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
	def.pattern ?? (def.pattern = mac$1(def.delimiter));
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `mac`;
});
const $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6$1);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const parts = payload.value.split("/");
		try {
			if (parts.length !== 2) throw new Error();
			const [address, prefix] = parts;
			if (!prefix) throw new Error();
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) throw new Error();
			if (prefixNum < 0 || prefixNum > 128) throw new Error();
			new URL(`http://[${address}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
const $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64$1);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64";
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64URL(data) {
	if (!base64url$1.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
const $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url$1);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64url";
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164$1);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT$1(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
const $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT$1(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (def.fn(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Number(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
		const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
		payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...received ? { received } : {}
		});
		return payload;
	};
});
const $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
const $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Boolean(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = bigint$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = BigInt(payload.value);
		} catch (_) {}
		if (typeof payload.value === "bigint") return payload;
		payload.issues.push({
			expected: "bigint",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
const $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
	$ZodCheckBigIntFormat.init(inst, def);
	$ZodBigInt.init(inst, def);
});
const $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (typeof input === "symbol") return payload;
		payload.issues.push({
			expected: "symbol",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = _undefined$2;
	inst._zod.values = new Set([void 0]);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (typeof input === "undefined") return payload;
		payload.issues.push({
			expected: "undefined",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = _null$2;
	inst._zod.values = new Set([null]);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (input === null) return payload;
		payload.issues.push({
			expected: "null",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
const $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
const $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
const $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (typeof input === "undefined") return payload;
		payload.issues.push({
			expected: "void",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = new Date(payload.value);
		} catch (_err) {}
		const input = payload.value;
		const isDate = input instanceof Date;
		if (isDate && !Number.isNaN(input.getTime())) return payload;
		payload.issues.push({
			expected: "date",
			code: "invalid_type",
			input,
			...isDate ? { received: "Invalid Date" } : {},
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
const $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = Array(input.length);
		const proms = [];
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
	if (result.issues.length) {
		if (isOptionalOut && !(key in input)) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (result.value === void 0) {
		if (key in input) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		keys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const isOptionalOut = _catchall.optout === "optional";
	for (const key in input) {
		if (keySet.has(key)) continue;
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalOut)));
		else handlePropertyResult(r, payload, key, input, isOptionalOut);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
const $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
		const sh = def.shape;
		Object.defineProperty(def, "shape", { get: () => {
			const newSh = { ...sh };
			Object.defineProperty(def, "shape", { value: newSh });
			return newSh;
		} });
	}
	const _normalized = cached(() => normalizeDef(def));
	defineLazy(inst._zod, "propValues", () => {
		const shape = def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
			}
		}
		return propValues;
	});
	const isObject$2 = isObject;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$2(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = {};
		const proms = [];
		const shape = value.shape;
		for (const key of value.keys) {
			const el = shape[key];
			const isOptionalOut = el._zod.optout === "optional";
			const r = el._zod.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalOut)));
			else handlePropertyResult(r, payload, key, input, isOptionalOut);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
	};
});
const $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached(() => normalizeDef(def));
	const generateFastpass = (shape) => {
		const doc = new Doc([
			"shape",
			"payload",
			"ctx"
		]);
		const normalized = _normalized.value;
		const parseStr = (key) => {
			const k = esc(key);
			return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		};
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.keys) ids[key] = `key_${counter++}`;
		doc.write(`const newResult = {};`);
		for (const key of normalized.keys) {
			const id = ids[key];
			const k = esc(key);
			const isOptionalOut = shape[key]?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(key)};`);
			if (isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject$1 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
const $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const single = def.options.length === 1;
	const first = def.options[0]._zod.run;
	inst._zod.parse = (payload, ctx) => {
		if (single) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
	const successes = results.filter((r) => r.issues.length === 0);
	if (successes.length === 1) {
		final.value = successes[0].value;
		return final;
	}
	if (successes.length === 0) final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	else final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: [],
		inclusive: false
	});
	return final;
}
const $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
	$ZodUnion.init(inst, def);
	def.inclusive = false;
	const single = def.options.length === 1;
	const first = def.options[0]._zod.run;
	inst._zod.parse = (payload, ctx) => {
		if (single) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else results.push(result);
		}
		if (!async) return handleExclusiveUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleExclusiveUnionResults(results, payload, inst, ctx);
		});
	};
});
const $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
	def.inclusive = false;
	$ZodUnion.init(inst, def);
	const _super = inst._zod.parse;
	defineLazy(inst._zod, "propValues", () => {
		const propValues = {};
		for (const option of def.options) {
			const pv = option._zod.propValues;
			if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
			for (const [k, v] of Object.entries(pv)) {
				if (!propValues[k]) propValues[k] = /* @__PURE__ */ new Set();
				for (const val of v) propValues[k].add(val);
			}
		}
		return propValues;
	});
	const disc = cached(() => {
		const opts = def.options;
		const map = /* @__PURE__ */ new Map();
		for (const o of opts) {
			const values = o._zod.propValues?.[def.discriminator];
			if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
			for (const v of values) {
				if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
				map.set(v, o);
			}
		}
		return map;
	});
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isObject(input)) {
			payload.issues.push({
				code: "invalid_type",
				expected: "object",
				input,
				inst
			});
			return payload;
		}
		const opt = disc.value.get(input?.[def.discriminator]);
		if (opt) return opt._zod.run(payload, ctx);
		if (def.unionFallback) return _super(payload, ctx);
		payload.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: def.discriminator,
			input,
			path: [def.discriminator],
			inst
		});
		return payload;
	};
});
const $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
			return handleIntersectionResults(payload, left, right);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues$1(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues$1(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues$1(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
		unrecIssue ?? (unrecIssue = iss);
		for (const k of iss.keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k).l = true;
		}
	} else result.issues.push(iss);
	for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
		if (!unrecKeys.has(k)) unrecKeys.set(k, {});
		unrecKeys.get(k).r = true;
	}
	else result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length && unrecIssue) result.issues.push({
		...unrecIssue,
		keys: bothKeys
	});
	if (aborted(result)) return result;
	const merged = mergeValues$1(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
const $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
	$ZodType.init(inst, def);
	const items = def.items;
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				input,
				inst,
				expected: "tuple",
				code: "invalid_type"
			});
			return payload;
		}
		payload.value = [];
		const proms = [];
		const reversedIndex = [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
		const optStart = reversedIndex === -1 ? 0 : items.length - reversedIndex;
		if (!def.rest) {
			const tooBig = input.length > items.length;
			const tooSmall = input.length < optStart - 1;
			if (tooBig || tooSmall) {
				payload.issues.push({
					...tooBig ? {
						code: "too_big",
						maximum: items.length,
						inclusive: true
					} : {
						code: "too_small",
						minimum: items.length
					},
					input,
					inst,
					origin: "array"
				});
				return payload;
			}
		}
		let i = -1;
		for (const item of items) {
			i++;
			if (i >= input.length) {
				if (i >= optStart) continue;
			}
			const result = item._zod.run({
				value: input[i],
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleTupleResult(result, payload, i)));
			else handleTupleResult(result, payload, i);
		}
		if (def.rest) {
			const rest = input.slice(items.length);
			for (const el of rest) {
				i++;
				const result = def.rest._zod.run({
					value: el,
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => handleTupleResult(result, payload, i)));
				else handleTupleResult(result, payload, i);
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleTupleResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
const $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isPlainObject(input)) {
			payload.issues.push({
				expected: "record",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		const values = def.keyType._zod.values;
		if (values) {
			payload.value = {};
			const recordKeys = /* @__PURE__ */ new Set();
			for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
				recordKeys.add(typeof key === "number" ? key.toString() : key);
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[key] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[key] = result.value;
				}
			}
			let unrecognized;
			for (const key in input) if (!recordKeys.has(key)) {
				unrecognized = unrecognized ?? [];
				unrecognized.push(key);
			}
			if (unrecognized && unrecognized.length > 0) payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized
			});
		} else {
			payload.value = {};
			for (const key of Reflect.ownKeys(input)) {
				if (key === "__proto__") continue;
				let keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
					const retryResult = def.keyType._zod.run({
						value: Number(key),
						issues: []
					}, ctx);
					if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (retryResult.issues.length === 0) keyResult = retryResult;
				}
				if (keyResult.issues.length) {
					if (def.mode === "loose") payload.value[key] = input[key];
					else payload.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					continue;
				}
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
const $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!(input instanceof Map)) {
			payload.issues.push({
				expected: "map",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		payload.value = /* @__PURE__ */ new Map();
		for (const [key, value] of input) {
			const keyResult = def.keyType._zod.run({
				value: key,
				issues: []
			}, ctx);
			const valueResult = def.valueType._zod.run({
				value,
				issues: []
			}, ctx);
			if (keyResult instanceof Promise || valueResult instanceof Promise) proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
				handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
			}));
			else handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
	if (keyResult.issues.length) if (propertyKeyTypes.has(typeof key)) final.issues.push(...prefixIssues(key, keyResult.issues));
	else final.issues.push({
		code: "invalid_key",
		origin: "map",
		input,
		inst,
		issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
	});
	if (valueResult.issues.length) if (propertyKeyTypes.has(typeof key)) final.issues.push(...prefixIssues(key, valueResult.issues));
	else final.issues.push({
		origin: "map",
		code: "invalid_element",
		input,
		inst,
		key,
		issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
	});
	final.value.set(keyResult.value, valueResult.value);
}
const $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!(input instanceof Set)) {
			payload.issues.push({
				input,
				inst,
				expected: "set",
				code: "invalid_type"
			});
			return payload;
		}
		const proms = [];
		payload.value = /* @__PURE__ */ new Set();
		for (const item of input) {
			const result = def.valueType._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleSetResult(result, payload)));
			else handleSetResult(result, payload);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleSetResult(result, final) {
	if (result.issues.length) final.issues.push(...result.issues);
	final.value.add(result.value);
}
const $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
	const values = new Set(def.values);
	inst._zod.values = values;
	inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (input instanceof File) return payload;
		payload.issues.push({
			expected: "file",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		return payload;
	};
});
function handleOptionalResult(result, input) {
	if (result.issues.length && input === void 0) return {
		issues: [],
		value: void 0
	};
	return result;
}
const $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (def.innerType._zod.optin === "optional") {
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, payload.value));
			return handleOptionalResult(result, payload.value);
		}
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			/**
			* $ZodDefault returns the default value immediately in forward direction.
			* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
const $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
const $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError("ZodSuccess");
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => {
			payload.value = result.issues.length === 0;
			return payload;
		});
		payload.value = result.issues.length === 0;
		return payload;
	};
});
const $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => {
			payload.value = result.value;
			if (result.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
					input: payload.value
				});
				payload.issues = [];
			}
			return payload;
		});
		payload.value = result.value;
		if (result.issues.length) {
			payload.value = def.catchValue({
				...payload,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			payload.issues = [];
		}
		return payload;
	};
});
const $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
			payload.issues.push({
				input: payload.value,
				inst,
				expected: "nan",
				code: "invalid_type"
			});
			return payload;
		}
		return payload;
	};
});
const $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues
	}, ctx);
}
const $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if ((ctx.direction || "forward") === "forward") {
			const left = def.in._zod.run(payload, ctx);
			if (left instanceof Promise) return left.then((left) => handleCodecAResult(left, def, ctx));
			return handleCodecAResult(left, def, ctx);
		} else {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handleCodecAResult(right, def, ctx));
			return handleCodecAResult(right, def, ctx);
		}
	};
});
function handleCodecAResult(result, def, ctx) {
	if (result.issues.length) {
		result.aborted = true;
		return result;
	}
	if ((ctx.direction || "forward") === "forward") {
		const transformed = def.transform(result.value, result);
		if (transformed instanceof Promise) return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
		return handleCodecTxResult(result, transformed, def.out, ctx);
	} else {
		const transformed = def.reverseTransform(result.value, result);
		if (transformed instanceof Promise) return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
		return handleCodecTxResult(result, transformed, def.in, ctx);
	}
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return nextSchema._zod.run({
		value,
		issues: left.issues
	}, ctx);
}
const $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
	defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
const $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	const regexParts = [];
	for (const part of def.parts) if (typeof part === "object" && part !== null) {
		if (!part._zod.pattern) throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
		const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
		if (!source) throw new Error(`Invalid template literal part: ${part._zod.traits}`);
		const start = source.startsWith("^") ? 1 : 0;
		const end = source.endsWith("$") ? source.length - 1 : source.length;
		regexParts.push(source.slice(start, end));
	} else if (part === null || primitiveTypes.has(typeof part)) regexParts.push(escapeRegex(`${part}`));
	else throw new Error(`Invalid template literal part: ${part}`);
	inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
	inst._zod.parse = (payload, _ctx) => {
		if (typeof payload.value !== "string") {
			payload.issues.push({
				input: payload.value,
				inst,
				expected: "string",
				code: "invalid_type"
			});
			return payload;
		}
		inst._zod.pattern.lastIndex = 0;
		if (!inst._zod.pattern.test(payload.value)) {
			payload.issues.push({
				input: payload.value,
				inst,
				code: "invalid_format",
				format: def.format ?? "template_literal",
				pattern: inst._zod.pattern.source
			});
			return payload;
		}
		return payload;
	};
});
const $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
	$ZodType.init(inst, def);
	inst._def = def;
	inst._zod.def = def;
	inst.implement = (func) => {
		if (typeof func !== "function") throw new Error("implement() must be called with a function");
		return function(...args) {
			const parsedArgs = inst._def.input ? parse$1(inst._def.input, args) : args;
			const result = Reflect.apply(func, this, parsedArgs);
			if (inst._def.output) return parse$1(inst._def.output, result);
			return result;
		};
	};
	inst.implementAsync = (func) => {
		if (typeof func !== "function") throw new Error("implementAsync() must be called with a function");
		return async function(...args) {
			const parsedArgs = inst._def.input ? await parseAsync$1(inst._def.input, args) : args;
			const result = await Reflect.apply(func, this, parsedArgs);
			if (inst._def.output) return await parseAsync$1(inst._def.output, result);
			return result;
		};
	};
	inst._zod.parse = (payload, _ctx) => {
		if (typeof payload.value !== "function") {
			payload.issues.push({
				code: "invalid_type",
				expected: "function",
				input: payload.value,
				inst
			});
			return payload;
		}
		if (inst._def.output && inst._def.output._zod.def.type === "promise") payload.value = inst.implementAsync(payload.value);
		else payload.value = inst.implement(payload.value);
		return payload;
	};
	inst.input = (...args) => {
		const F = inst.constructor;
		if (Array.isArray(args[0])) return new F({
			type: "function",
			input: new $ZodTuple({
				type: "tuple",
				items: args[0],
				rest: args[1]
			}),
			output: inst._def.output
		});
		return new F({
			type: "function",
			input: args[0],
			output: inst._def.output
		});
	};
	inst.output = (output) => {
		const F = inst.constructor;
		return new F({
			type: "function",
			input: inst._def.input,
			output
		});
	};
	return inst;
});
const $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({
			value: inner,
			issues: []
		}, ctx));
	};
});
const $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "innerType", () => def.getter());
	defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
	defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
	defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
	defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
	inst._zod.parse = (payload, ctx) => {
		return inst._zod.innerType._zod.run(payload, ctx);
	};
});
const $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
var error$46 = () => {
	const Sizable = {
		string: {
			unit: "حرف",
			verb: "أن يحوي"
		},
		file: {
			unit: "بايت",
			verb: "أن يحوي"
		},
		array: {
			unit: "عنصر",
			verb: "أن يحوي"
		},
		set: {
			unit: "عنصر",
			verb: "أن يحوي"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "مدخل",
		email: "بريد إلكتروني",
		url: "رابط",
		emoji: "إيموجي",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "تاريخ ووقت بمعيار ISO",
		date: "تاريخ بمعيار ISO",
		time: "وقت بمعيار ISO",
		duration: "مدة بمعيار ISO",
		ipv4: "عنوان IPv4",
		ipv6: "عنوان IPv6",
		cidrv4: "مدى عناوين بصيغة IPv4",
		cidrv6: "مدى عناوين بصيغة IPv6",
		base64: "نَص بترميز base64-encoded",
		base64url: "نَص بترميز base64url-encoded",
		json_string: "نَص على هيئة JSON",
		e164: "رقم هاتف بمعيار E.164",
		jwt: "JWT",
		template_literal: "مدخل"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue.expected}، ولكن تم إدخال ${received}`;
				return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `مدخلات غير مقبولة: يفترض إدخال ${stringifyPrimitive(issue.values[0])}`;
				return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return ` أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
				return `أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
				return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `نَص غير مقبول: يجب أن يبدأ بـ "${issue.prefix}"`;
				if (_issue.format === "ends_with") return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
				if (_issue.format === "includes") return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
				if (_issue.format === "regex") return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
				return `${FormatDictionary[_issue.format] ?? issue.format} غير مقبول`;
			}
			case "not_multiple_of": return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue.divisor}`;
			case "unrecognized_keys": return `معرف${issue.keys.length > 1 ? "ات" : ""} غريب${issue.keys.length > 1 ? "ة" : ""}: ${joinValues(issue.keys, "، ")}`;
			case "invalid_key": return `معرف غير مقبول في ${issue.origin}`;
			case "invalid_union": return "مدخل غير مقبول";
			case "invalid_element": return `مدخل غير مقبول في ${issue.origin}`;
			default: return "مدخل غير مقبول";
		}
	};
};
function ar_default() {
	return { localeError: error$46() };
}
var error$45 = () => {
	const Sizable = {
		string: {
			unit: "simvol",
			verb: "olmalıdır"
		},
		file: {
			unit: "bayt",
			verb: "olmalıdır"
		},
		array: {
			unit: "element",
			verb: "olmalıdır"
		},
		set: {
			unit: "element",
			verb: "olmalıdır"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Yanlış dəyər: gözlənilən instanceof ${issue.expected}, daxil olan ${received}`;
				return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Yanlış dəyər: gözlənilən ${stringifyPrimitive(issue.values[0])}`;
				return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
				return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
				if (_issue.format === "ends_with") return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
				if (_issue.format === "includes") return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
				if (_issue.format === "regex") return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
				return `Yanlış ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Yanlış ədəd: ${issue.divisor} ilə bölünə bilən olmalıdır`;
			case "unrecognized_keys": return `Tanınmayan açar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `${issue.origin} daxilində yanlış açar`;
			case "invalid_union": return "Yanlış dəyər";
			case "invalid_element": return `${issue.origin} daxilində yanlış dəyər`;
			default: return `Yanlış dəyər`;
		}
	};
};
function az_default() {
	return { localeError: error$45() };
}
function getBelarusianPlural(count, one, few, many) {
	const absCount = Math.abs(count);
	const lastDigit = absCount % 10;
	const lastTwoDigits = absCount % 100;
	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
	if (lastDigit === 1) return one;
	if (lastDigit >= 2 && lastDigit <= 4) return few;
	return many;
}
var error$44 = () => {
	const Sizable = {
		string: {
			unit: {
				one: "сімвал",
				few: "сімвалы",
				many: "сімвалаў"
			},
			verb: "мець"
		},
		array: {
			unit: {
				one: "элемент",
				few: "элементы",
				many: "элементаў"
			},
			verb: "мець"
		},
		set: {
			unit: {
				one: "элемент",
				few: "элементы",
				many: "элементаў"
			},
			verb: "мець"
		},
		file: {
			unit: {
				one: "байт",
				few: "байты",
				many: "байтаў"
			},
			verb: "мець"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "увод",
		email: "email адрас",
		url: "URL",
		emoji: "эмодзі",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO дата і час",
		date: "ISO дата",
		time: "ISO час",
		duration: "ISO працягласць",
		ipv4: "IPv4 адрас",
		ipv6: "IPv6 адрас",
		cidrv4: "IPv4 дыяпазон",
		cidrv6: "IPv6 дыяпазон",
		base64: "радок у фармаце base64",
		base64url: "радок у фармаце base64url",
		json_string: "JSON радок",
		e164: "нумар E.164",
		jwt: "JWT",
		template_literal: "увод"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "лік",
		array: "масіў"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Няправільны ўвод: чакаўся instanceof ${issue.expected}, атрымана ${received}`;
				return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Няправільны ўвод: чакалася ${stringifyPrimitive(issue.values[0])}`;
				return `Няправільны варыянт: чакаўся адзін з ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) {
					const unit = getBelarusianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue.maximum.toString()} ${unit}`;
				}
				return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна быць ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) {
					const unit = getBelarusianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `Занадта малы: чакалася, што ${issue.origin} павінна ${sizing.verb} ${adj}${issue.minimum.toString()} ${unit}`;
				}
				return `Занадта малы: чакалася, што ${issue.origin} павінна быць ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
				if (_issue.format === "regex") return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
				return `Няправільны ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Няправільны лік: павінен быць кратным ${issue.divisor}`;
			case "unrecognized_keys": return `Нераспазнаны ${issue.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Няправільны ключ у ${issue.origin}`;
			case "invalid_union": return "Няправільны ўвод";
			case "invalid_element": return `Няправільнае значэнне ў ${issue.origin}`;
			default: return `Няправільны ўвод`;
		}
	};
};
function be_default() {
	return { localeError: error$44() };
}
var error$43 = () => {
	const Sizable = {
		string: {
			unit: "символа",
			verb: "да съдържа"
		},
		file: {
			unit: "байта",
			verb: "да съдържа"
		},
		array: {
			unit: "елемента",
			verb: "да съдържа"
		},
		set: {
			unit: "елемента",
			verb: "да съдържа"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "вход",
		email: "имейл адрес",
		url: "URL",
		emoji: "емоджи",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO време",
		date: "ISO дата",
		time: "ISO време",
		duration: "ISO продължителност",
		ipv4: "IPv4 адрес",
		ipv6: "IPv6 адрес",
		cidrv4: "IPv4 диапазон",
		cidrv6: "IPv6 диапазон",
		base64: "base64-кодиран низ",
		base64url: "base64url-кодиран низ",
		json_string: "JSON низ",
		e164: "E.164 номер",
		jwt: "JWT",
		template_literal: "вход"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "число",
		array: "масив"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Невалиден вход: очакван instanceof ${issue.expected}, получен ${received}`;
				return `Невалиден вход: очакван ${expected}, получен ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Невалиден вход: очакван ${stringifyPrimitive(issue.values[0])}`;
				return `Невалидна опция: очаквано едно от ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да съдържа ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елемента"}`;
				return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да бъде ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Твърде малко: очаква се ${issue.origin} да съдържа ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Твърде малко: очаква се ${issue.origin} да бъде ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Невалиден низ: трябва да включва "${_issue.includes}"`;
				if (_issue.format === "regex") return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
				let invalid_adj = "Невалиден";
				if (_issue.format === "emoji") invalid_adj = "Невалидно";
				if (_issue.format === "datetime") invalid_adj = "Невалидно";
				if (_issue.format === "date") invalid_adj = "Невалидна";
				if (_issue.format === "time") invalid_adj = "Невалидно";
				if (_issue.format === "duration") invalid_adj = "Невалидна";
				return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Невалидно число: трябва да бъде кратно на ${issue.divisor}`;
			case "unrecognized_keys": return `Неразпознат${issue.keys.length > 1 ? "и" : ""} ключ${issue.keys.length > 1 ? "ове" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Невалиден ключ в ${issue.origin}`;
			case "invalid_union": return "Невалиден вход";
			case "invalid_element": return `Невалидна стойност в ${issue.origin}`;
			default: return `Невалиден вход`;
		}
	};
};
function bg_default() {
	return { localeError: error$43() };
}
var error$42 = () => {
	const Sizable = {
		string: {
			unit: "caràcters",
			verb: "contenir"
		},
		file: {
			unit: "bytes",
			verb: "contenir"
		},
		array: {
			unit: "elements",
			verb: "contenir"
		},
		set: {
			unit: "elements",
			verb: "contenir"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "entrada",
		email: "adreça electrònica",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data i hora ISO",
		date: "data ISO",
		time: "hora ISO",
		duration: "durada ISO",
		ipv4: "adreça IPv4",
		ipv6: "adreça IPv6",
		cidrv4: "rang IPv4",
		cidrv6: "rang IPv6",
		base64: "cadena codificada en base64",
		base64url: "cadena codificada en base64url",
		json_string: "cadena JSON",
		e164: "número E.164",
		jwt: "JWT",
		template_literal: "entrada"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Tipus invàlid: s'esperava instanceof ${issue.expected}, s'ha rebut ${received}`;
				return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Valor invàlid: s'esperava ${stringifyPrimitive(issue.values[0])}`;
				return `Opció invàlida: s'esperava una de ${joinValues(issue.values, " o ")}`;
			case "too_big": {
				const adj = issue.inclusive ? "com a màxim" : "menys de";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} contingués ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
				return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} fos ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? "com a mínim" : "més de";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Massa petit: s'esperava que ${issue.origin} contingués ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
				return `Massa petit: s'esperava que ${issue.origin} fos ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Format invàlid: ha d'incloure "${_issue.includes}"`;
				if (_issue.format === "regex") return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
				return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Número invàlid: ha de ser múltiple de ${issue.divisor}`;
			case "unrecognized_keys": return `Clau${issue.keys.length > 1 ? "s" : ""} no reconeguda${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Clau invàlida a ${issue.origin}`;
			case "invalid_union": return "Entrada invàlida";
			case "invalid_element": return `Element invàlid a ${issue.origin}`;
			default: return `Entrada invàlida`;
		}
	};
};
function ca_default() {
	return { localeError: error$42() };
}
var error$41 = () => {
	const Sizable = {
		string: {
			unit: "znaků",
			verb: "mít"
		},
		file: {
			unit: "bajtů",
			verb: "mít"
		},
		array: {
			unit: "prvků",
			verb: "mít"
		},
		set: {
			unit: "prvků",
			verb: "mít"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "regulární výraz",
		email: "e-mailová adresa",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "datum a čas ve formátu ISO",
		date: "datum ve formátu ISO",
		time: "čas ve formátu ISO",
		duration: "doba trvání ISO",
		ipv4: "IPv4 adresa",
		ipv6: "IPv6 adresa",
		cidrv4: "rozsah IPv4",
		cidrv6: "rozsah IPv6",
		base64: "řetězec zakódovaný ve formátu base64",
		base64url: "řetězec zakódovaný ve formátu base64url",
		json_string: "řetězec ve formátu JSON",
		e164: "číslo E.164",
		jwt: "JWT",
		template_literal: "vstup"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "číslo",
		string: "řetězec",
		function: "funkce",
		array: "pole"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Neplatný vstup: očekáváno instanceof ${issue.expected}, obdrženo ${received}`;
				return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Neplatný vstup: očekáváno ${stringifyPrimitive(issue.values[0])}`;
				return `Neplatná možnost: očekávána jedna z hodnot ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvků"}`;
				return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvků"}`;
				return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
				if (_issue.format === "regex") return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
				return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Neplatné číslo: musí být násobkem ${issue.divisor}`;
			case "unrecognized_keys": return `Neznámé klíče: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Neplatný klíč v ${issue.origin}`;
			case "invalid_union": return "Neplatný vstup";
			case "invalid_element": return `Neplatná hodnota v ${issue.origin}`;
			default: return `Neplatný vstup`;
		}
	};
};
function cs_default() {
	return { localeError: error$41() };
}
var error$40 = () => {
	const Sizable = {
		string: {
			unit: "tegn",
			verb: "havde"
		},
		file: {
			unit: "bytes",
			verb: "havde"
		},
		array: {
			unit: "elementer",
			verb: "indeholdt"
		},
		set: {
			unit: "elementer",
			verb: "indeholdt"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "e-mailadresse",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO dato- og klokkeslæt",
		date: "ISO-dato",
		time: "ISO-klokkeslæt",
		duration: "ISO-varighed",
		ipv4: "IPv4-område",
		ipv6: "IPv6-område",
		cidrv4: "IPv4-spektrum",
		cidrv6: "IPv6-spektrum",
		base64: "base64-kodet streng",
		base64url: "base64url-kodet streng",
		json_string: "JSON-streng",
		e164: "E.164-nummer",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = {
		nan: "NaN",
		string: "streng",
		number: "tal",
		boolean: "boolean",
		array: "liste",
		object: "objekt",
		set: "sæt",
		file: "fil"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Ugyldigt input: forventede instanceof ${issue.expected}, fik ${received}`;
				return `Ugyldigt input: forventede ${expected}, fik ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Ugyldig værdi: forventede ${stringifyPrimitive(issue.values[0])}`;
				return `Ugyldigt valg: forventede en af følgende ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				const origin = TypeDictionary[issue.origin] ?? issue.origin;
				if (sizing) return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
				return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				const origin = TypeDictionary[issue.origin] ?? issue.origin;
				if (sizing) return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
				return `For lille: forventede ${origin} havde ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
				if (_issue.format === "regex") return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
				return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Ugyldigt tal: skal være deleligt med ${issue.divisor}`;
			case "unrecognized_keys": return `${issue.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Ugyldig nøgle i ${issue.origin}`;
			case "invalid_union": return "Ugyldigt input: matcher ingen af de tilladte typer";
			case "invalid_element": return `Ugyldig værdi i ${issue.origin}`;
			default: return `Ugyldigt input`;
		}
	};
};
function da_default() {
	return { localeError: error$40() };
}
var error$39 = () => {
	const Sizable = {
		string: {
			unit: "Zeichen",
			verb: "zu haben"
		},
		file: {
			unit: "Bytes",
			verb: "zu haben"
		},
		array: {
			unit: "Elemente",
			verb: "zu haben"
		},
		set: {
			unit: "Elemente",
			verb: "zu haben"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "Eingabe",
		email: "E-Mail-Adresse",
		url: "URL",
		emoji: "Emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-Datum und -Uhrzeit",
		date: "ISO-Datum",
		time: "ISO-Uhrzeit",
		duration: "ISO-Dauer",
		ipv4: "IPv4-Adresse",
		ipv6: "IPv6-Adresse",
		cidrv4: "IPv4-Bereich",
		cidrv6: "IPv6-Bereich",
		base64: "Base64-codierter String",
		base64url: "Base64-URL-codierter String",
		json_string: "JSON-String",
		e164: "E.164-Nummer",
		jwt: "JWT",
		template_literal: "Eingabe"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "Zahl",
		array: "Array"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Ungültige Eingabe: erwartet instanceof ${issue.expected}, erhalten ${received}`;
				return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Ungültige Eingabe: erwartet ${stringifyPrimitive(issue.values[0])}`;
				return `Ungültige Option: erwartet eine von ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
				return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ist`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat`;
				return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
				if (_issue.format === "ends_with") return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
				if (_issue.format === "includes") return `Ungültiger String: muss "${_issue.includes}" enthalten`;
				if (_issue.format === "regex") return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
				return `Ungültig: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Ungültige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
			case "unrecognized_keys": return `${issue.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Ungültiger Schlüssel in ${issue.origin}`;
			case "invalid_union": return "Ungültige Eingabe";
			case "invalid_element": return `Ungültiger Wert in ${issue.origin}`;
			default: return `Ungültige Eingabe`;
		}
	};
};
function de_default() {
	return { localeError: error$39() };
}
var error$38 = () => {
	const Sizable = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				return `Invalid input: expected ${expected}, received ${TypeDictionary[receivedType] ?? receivedType}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
				return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
				return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
				if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
				return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${issue.origin}`;
			case "invalid_union": return "Invalid input";
			case "invalid_element": return `Invalid value in ${issue.origin}`;
			default: return `Invalid input`;
		}
	};
};
function en_default() {
	return { localeError: error$38() };
}
var error$37 = () => {
	const Sizable = {
		string: {
			unit: "karaktrojn",
			verb: "havi"
		},
		file: {
			unit: "bajtojn",
			verb: "havi"
		},
		array: {
			unit: "elementojn",
			verb: "havi"
		},
		set: {
			unit: "elementojn",
			verb: "havi"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "enigo",
		email: "retadreso",
		url: "URL",
		emoji: "emoĝio",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-datotempo",
		date: "ISO-dato",
		time: "ISO-tempo",
		duration: "ISO-daŭro",
		ipv4: "IPv4-adreso",
		ipv6: "IPv6-adreso",
		cidrv4: "IPv4-rango",
		cidrv6: "IPv6-rango",
		base64: "64-ume kodita karaktraro",
		base64url: "URL-64-ume kodita karaktraro",
		json_string: "JSON-karaktraro",
		e164: "E.164-nombro",
		jwt: "JWT",
		template_literal: "enigo"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "nombro",
		array: "tabelo",
		null: "senvalora"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Nevalida enigo: atendiĝis instanceof ${issue.expected}, riceviĝis ${received}`;
				return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Nevalida enigo: atendiĝis ${stringifyPrimitive(issue.values[0])}`;
				return `Nevalida opcio: atendiĝis unu el ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
				return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Tro malgranda: atendiĝis ke ${issue.origin} havu ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Tro malgranda: atendiĝis ke ${issue.origin} estu ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
				if (_issue.format === "regex") return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
				return `Nevalida ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Nevalida nombro: devas esti oblo de ${issue.divisor}`;
			case "unrecognized_keys": return `Nekonata${issue.keys.length > 1 ? "j" : ""} ŝlosilo${issue.keys.length > 1 ? "j" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Nevalida ŝlosilo en ${issue.origin}`;
			case "invalid_union": return "Nevalida enigo";
			case "invalid_element": return `Nevalida valoro en ${issue.origin}`;
			default: return `Nevalida enigo`;
		}
	};
};
function eo_default() {
	return { localeError: error$37() };
}
var error$36 = () => {
	const Sizable = {
		string: {
			unit: "caracteres",
			verb: "tener"
		},
		file: {
			unit: "bytes",
			verb: "tener"
		},
		array: {
			unit: "elementos",
			verb: "tener"
		},
		set: {
			unit: "elementos",
			verb: "tener"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "entrada",
		email: "dirección de correo electrónico",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "fecha y hora ISO",
		date: "fecha ISO",
		time: "hora ISO",
		duration: "duración ISO",
		ipv4: "dirección IPv4",
		ipv6: "dirección IPv6",
		cidrv4: "rango IPv4",
		cidrv6: "rango IPv6",
		base64: "cadena codificada en base64",
		base64url: "URL codificada en base64",
		json_string: "cadena JSON",
		e164: "número E.164",
		jwt: "JWT",
		template_literal: "entrada"
	};
	const TypeDictionary = {
		nan: "NaN",
		string: "texto",
		number: "número",
		boolean: "booleano",
		array: "arreglo",
		object: "objeto",
		set: "conjunto",
		file: "archivo",
		date: "fecha",
		bigint: "número grande",
		symbol: "símbolo",
		undefined: "indefinido",
		null: "nulo",
		function: "función",
		map: "mapa",
		record: "registro",
		tuple: "tupla",
		enum: "enumeración",
		union: "unión",
		literal: "literal",
		promise: "promesa",
		void: "vacío",
		never: "nunca",
		unknown: "desconocido",
		any: "cualquiera"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Entrada inválida: se esperaba instanceof ${issue.expected}, recibido ${received}`;
				return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Entrada inválida: se esperaba ${stringifyPrimitive(issue.values[0])}`;
				return `Opción inválida: se esperaba una de ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				const origin = TypeDictionary[issue.origin] ?? issue.origin;
				if (sizing) return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
				return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				const origin = TypeDictionary[issue.origin] ?? issue.origin;
				if (sizing) return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Cadena inválida: debe incluir "${_issue.includes}"`;
				if (_issue.format === "regex") return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
				return `Inválido ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Número inválido: debe ser múltiplo de ${issue.divisor}`;
			case "unrecognized_keys": return `Llave${issue.keys.length > 1 ? "s" : ""} desconocida${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Llave inválida en ${TypeDictionary[issue.origin] ?? issue.origin}`;
			case "invalid_union": return "Entrada inválida";
			case "invalid_element": return `Valor inválido en ${TypeDictionary[issue.origin] ?? issue.origin}`;
			default: return `Entrada inválida`;
		}
	};
};
function es_default() {
	return { localeError: error$36() };
}
var error$35 = () => {
	const Sizable = {
		string: {
			unit: "کاراکتر",
			verb: "داشته باشد"
		},
		file: {
			unit: "بایت",
			verb: "داشته باشد"
		},
		array: {
			unit: "آیتم",
			verb: "داشته باشد"
		},
		set: {
			unit: "آیتم",
			verb: "داشته باشد"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "ورودی",
		email: "آدرس ایمیل",
		url: "URL",
		emoji: "ایموجی",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "تاریخ و زمان ایزو",
		date: "تاریخ ایزو",
		time: "زمان ایزو",
		duration: "مدت زمان ایزو",
		ipv4: "IPv4 آدرس",
		ipv6: "IPv6 آدرس",
		cidrv4: "IPv4 دامنه",
		cidrv6: "IPv6 دامنه",
		base64: "base64-encoded رشته",
		base64url: "base64url-encoded رشته",
		json_string: "JSON رشته",
		e164: "E.164 عدد",
		jwt: "JWT",
		template_literal: "ورودی"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "عدد",
		array: "آرایه"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `ورودی نامعتبر: می‌بایست instanceof ${issue.expected} می‌بود، ${received} دریافت شد`;
				return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `ورودی نامعتبر: می‌بایست ${stringifyPrimitive(issue.values[0])} می‌بود`;
				return `گزینه نامعتبر: می‌بایست یکی از ${joinValues(issue.values, "|")} می‌بود`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
				return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} باشد`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} باشد`;
				return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} باشد`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
				if (_issue.format === "ends_with") return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
				if (_issue.format === "includes") return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
				if (_issue.format === "regex") return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
				return `${FormatDictionary[_issue.format] ?? issue.format} نامعتبر`;
			}
			case "not_multiple_of": return `عدد نامعتبر: باید مضرب ${issue.divisor} باشد`;
			case "unrecognized_keys": return `کلید${issue.keys.length > 1 ? "های" : ""} ناشناس: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `کلید ناشناس در ${issue.origin}`;
			case "invalid_union": return `ورودی نامعتبر`;
			case "invalid_element": return `مقدار نامعتبر در ${issue.origin}`;
			default: return `ورودی نامعتبر`;
		}
	};
};
function fa_default() {
	return { localeError: error$35() };
}
var error$34 = () => {
	const Sizable = {
		string: {
			unit: "merkkiä",
			subject: "merkkijonon"
		},
		file: {
			unit: "tavua",
			subject: "tiedoston"
		},
		array: {
			unit: "alkiota",
			subject: "listan"
		},
		set: {
			unit: "alkiota",
			subject: "joukon"
		},
		number: {
			unit: "",
			subject: "luvun"
		},
		bigint: {
			unit: "",
			subject: "suuren kokonaisluvun"
		},
		int: {
			unit: "",
			subject: "kokonaisluvun"
		},
		date: {
			unit: "",
			subject: "päivämäärän"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "säännöllinen lauseke",
		email: "sähköpostiosoite",
		url: "URL-osoite",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-aikaleima",
		date: "ISO-päivämäärä",
		time: "ISO-aika",
		duration: "ISO-kesto",
		ipv4: "IPv4-osoite",
		ipv6: "IPv6-osoite",
		cidrv4: "IPv4-alue",
		cidrv6: "IPv6-alue",
		base64: "base64-koodattu merkkijono",
		base64url: "base64url-koodattu merkkijono",
		json_string: "JSON-merkkijono",
		e164: "E.164-luku",
		jwt: "JWT",
		template_literal: "templaattimerkkijono"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Virheellinen tyyppi: odotettiin instanceof ${issue.expected}, oli ${received}`;
				return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Virheellinen syöte: täytyy olla ${stringifyPrimitive(issue.values[0])}`;
				return `Virheellinen valinta: täytyy olla yksi seuraavista: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue.maximum.toString()} ${sizing.unit}`.trim();
				return `Liian suuri: arvon täytyy olla ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue.minimum.toString()} ${sizing.unit}`.trim();
				return `Liian pieni: arvon täytyy olla ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
				if (_issue.format === "regex") return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
				return `Virheellinen ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Virheellinen luku: täytyy olla luvun ${issue.divisor} monikerta`;
			case "unrecognized_keys": return `${issue.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return "Virheellinen avain tietueessa";
			case "invalid_union": return "Virheellinen unioni";
			case "invalid_element": return "Virheellinen arvo joukossa";
			default: return `Virheellinen syöte`;
		}
	};
};
function fi_default() {
	return { localeError: error$34() };
}
var error$33 = () => {
	const Sizable = {
		string: {
			unit: "caractères",
			verb: "avoir"
		},
		file: {
			unit: "octets",
			verb: "avoir"
		},
		array: {
			unit: "éléments",
			verb: "avoir"
		},
		set: {
			unit: "éléments",
			verb: "avoir"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "entrée",
		email: "adresse e-mail",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "date et heure ISO",
		date: "date ISO",
		time: "heure ISO",
		duration: "durée ISO",
		ipv4: "adresse IPv4",
		ipv6: "adresse IPv6",
		cidrv4: "plage IPv4",
		cidrv6: "plage IPv6",
		base64: "chaîne encodée en base64",
		base64url: "chaîne encodée en base64url",
		json_string: "chaîne JSON",
		e164: "numéro E.164",
		jwt: "JWT",
		template_literal: "entrée"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "nombre",
		array: "tableau"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Entrée invalide : instanceof ${issue.expected} attendu, ${received} reçu`;
				return `Entrée invalide : ${expected} attendu, ${received} reçu`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Entrée invalide : ${stringifyPrimitive(issue.values[0])} attendu`;
				return `Option invalide : une valeur parmi ${joinValues(issue.values, "|")} attendue`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Trop grand : ${issue.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
				return `Trop grand : ${issue.origin ?? "valeur"} doit être ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Trop petit : ${issue.origin} doit ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Trop petit : ${issue.origin} doit être ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Chaîne invalide : doit inclure "${_issue.includes}"`;
				if (_issue.format === "regex") return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
				return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
			}
			case "not_multiple_of": return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
			case "unrecognized_keys": return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Clé invalide dans ${issue.origin}`;
			case "invalid_union": return "Entrée invalide";
			case "invalid_element": return `Valeur invalide dans ${issue.origin}`;
			default: return `Entrée invalide`;
		}
	};
};
function fr_default() {
	return { localeError: error$33() };
}
var error$32 = () => {
	const Sizable = {
		string: {
			unit: "caractères",
			verb: "avoir"
		},
		file: {
			unit: "octets",
			verb: "avoir"
		},
		array: {
			unit: "éléments",
			verb: "avoir"
		},
		set: {
			unit: "éléments",
			verb: "avoir"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "entrée",
		email: "adresse courriel",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "date-heure ISO",
		date: "date ISO",
		time: "heure ISO",
		duration: "durée ISO",
		ipv4: "adresse IPv4",
		ipv6: "adresse IPv6",
		cidrv4: "plage IPv4",
		cidrv6: "plage IPv6",
		base64: "chaîne encodée en base64",
		base64url: "chaîne encodée en base64url",
		json_string: "chaîne JSON",
		e164: "numéro E.164",
		jwt: "JWT",
		template_literal: "entrée"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Entrée invalide : attendu instanceof ${issue.expected}, reçu ${received}`;
				return `Entrée invalide : attendu ${expected}, reçu ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Entrée invalide : attendu ${stringifyPrimitive(issue.values[0])}`;
				return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "≤" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Trop grand : attendu que ${issue.origin ?? "la valeur"} ait ${adj}${issue.maximum.toString()} ${sizing.unit}`;
				return `Trop grand : attendu que ${issue.origin ?? "la valeur"} soit ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? "≥" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Trop petit : attendu que ${issue.origin} ait ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Trop petit : attendu que ${issue.origin} soit ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Chaîne invalide : doit inclure "${_issue.includes}"`;
				if (_issue.format === "regex") return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
				return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
			}
			case "not_multiple_of": return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
			case "unrecognized_keys": return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Clé invalide dans ${issue.origin}`;
			case "invalid_union": return "Entrée invalide";
			case "invalid_element": return `Valeur invalide dans ${issue.origin}`;
			default: return `Entrée invalide`;
		}
	};
};
function fr_CA_default() {
	return { localeError: error$32() };
}
var error$31 = () => {
	const TypeNames = {
		string: {
			label: "מחרוזת",
			gender: "f"
		},
		number: {
			label: "מספר",
			gender: "m"
		},
		boolean: {
			label: "ערך בוליאני",
			gender: "m"
		},
		bigint: {
			label: "BigInt",
			gender: "m"
		},
		date: {
			label: "תאריך",
			gender: "m"
		},
		array: {
			label: "מערך",
			gender: "m"
		},
		object: {
			label: "אובייקט",
			gender: "m"
		},
		null: {
			label: "ערך ריק (null)",
			gender: "m"
		},
		undefined: {
			label: "ערך לא מוגדר (undefined)",
			gender: "m"
		},
		symbol: {
			label: "סימבול (Symbol)",
			gender: "m"
		},
		function: {
			label: "פונקציה",
			gender: "f"
		},
		map: {
			label: "מפה (Map)",
			gender: "f"
		},
		set: {
			label: "קבוצה (Set)",
			gender: "f"
		},
		file: {
			label: "קובץ",
			gender: "m"
		},
		promise: {
			label: "Promise",
			gender: "m"
		},
		NaN: {
			label: "NaN",
			gender: "m"
		},
		unknown: {
			label: "ערך לא ידוע",
			gender: "m"
		},
		value: {
			label: "ערך",
			gender: "m"
		}
	};
	const Sizable = {
		string: {
			unit: "תווים",
			shortLabel: "קצר",
			longLabel: "ארוך"
		},
		file: {
			unit: "בייטים",
			shortLabel: "קטן",
			longLabel: "גדול"
		},
		array: {
			unit: "פריטים",
			shortLabel: "קטן",
			longLabel: "גדול"
		},
		set: {
			unit: "פריטים",
			shortLabel: "קטן",
			longLabel: "גדול"
		},
		number: {
			unit: "",
			shortLabel: "קטן",
			longLabel: "גדול"
		}
	};
	const typeEntry = (t) => t ? TypeNames[t] : void 0;
	const typeLabel = (t) => {
		const e = typeEntry(t);
		if (e) return e.label;
		return t ?? TypeNames.unknown.label;
	};
	const withDefinite = (t) => `ה${typeLabel(t)}`;
	const verbFor = (t) => {
		return (typeEntry(t)?.gender ?? "m") === "f" ? "צריכה להיות" : "צריך להיות";
	};
	const getSizing = (origin) => {
		if (!origin) return null;
		return Sizable[origin] ?? null;
	};
	const FormatDictionary = {
		regex: {
			label: "קלט",
			gender: "m"
		},
		email: {
			label: "כתובת אימייל",
			gender: "f"
		},
		url: {
			label: "כתובת רשת",
			gender: "f"
		},
		emoji: {
			label: "אימוג'י",
			gender: "m"
		},
		uuid: {
			label: "UUID",
			gender: "m"
		},
		nanoid: {
			label: "nanoid",
			gender: "m"
		},
		guid: {
			label: "GUID",
			gender: "m"
		},
		cuid: {
			label: "cuid",
			gender: "m"
		},
		cuid2: {
			label: "cuid2",
			gender: "m"
		},
		ulid: {
			label: "ULID",
			gender: "m"
		},
		xid: {
			label: "XID",
			gender: "m"
		},
		ksuid: {
			label: "KSUID",
			gender: "m"
		},
		datetime: {
			label: "תאריך וזמן ISO",
			gender: "m"
		},
		date: {
			label: "תאריך ISO",
			gender: "m"
		},
		time: {
			label: "זמן ISO",
			gender: "m"
		},
		duration: {
			label: "משך זמן ISO",
			gender: "m"
		},
		ipv4: {
			label: "כתובת IPv4",
			gender: "f"
		},
		ipv6: {
			label: "כתובת IPv6",
			gender: "f"
		},
		cidrv4: {
			label: "טווח IPv4",
			gender: "m"
		},
		cidrv6: {
			label: "טווח IPv6",
			gender: "m"
		},
		base64: {
			label: "מחרוזת בבסיס 64",
			gender: "f"
		},
		base64url: {
			label: "מחרוזת בבסיס 64 לכתובות רשת",
			gender: "f"
		},
		json_string: {
			label: "מחרוזת JSON",
			gender: "f"
		},
		e164: {
			label: "מספר E.164",
			gender: "m"
		},
		jwt: {
			label: "JWT",
			gender: "m"
		},
		ends_with: {
			label: "קלט",
			gender: "m"
		},
		includes: {
			label: "קלט",
			gender: "m"
		},
		lowercase: {
			label: "קלט",
			gender: "m"
		},
		starts_with: {
			label: "קלט",
			gender: "m"
		},
		uppercase: {
			label: "קלט",
			gender: "m"
		}
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expectedKey = issue.expected;
				const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `קלט לא תקין: צריך להיות instanceof ${issue.expected}, התקבל ${received}`;
				return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
			}
			case "invalid_value": {
				if (issue.values.length === 1) return `ערך לא תקין: הערך חייב להיות ${stringifyPrimitive(issue.values[0])}`;
				const stringified = issue.values.map((v) => stringifyPrimitive(v));
				if (issue.values.length === 2) return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
				const lastValue = stringified[stringified.length - 1];
				return `ערך לא תקין: האפשרויות המתאימות הן ${stringified.slice(0, -1).join(", ")} או ${lastValue}`;
			}
			case "too_big": {
				const sizing = getSizing(issue.origin);
				const subject = withDefinite(issue.origin ?? "value");
				if (issue.origin === "string") return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue.maximum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או פחות" : "לכל היותר"}`.trim();
				if (issue.origin === "number") return `גדול מדי: ${subject} צריך להיות ${issue.inclusive ? `קטן או שווה ל-${issue.maximum}` : `קטן מ-${issue.maximum}`}`;
				if (issue.origin === "array" || issue.origin === "set") return `גדול מדי: ${subject} ${issue.origin === "set" ? "צריכה" : "צריך"} להכיל ${issue.inclusive ? `${issue.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue.maximum} ${sizing?.unit ?? ""}`}`.trim();
				const adj = issue.inclusive ? "<=" : "<";
				const be = verbFor(issue.origin ?? "value");
				if (sizing?.unit) return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
				return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const sizing = getSizing(issue.origin);
				const subject = withDefinite(issue.origin ?? "value");
				if (issue.origin === "string") return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue.minimum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או יותר" : "לפחות"}`.trim();
				if (issue.origin === "number") return `קטן מדי: ${subject} צריך להיות ${issue.inclusive ? `גדול או שווה ל-${issue.minimum}` : `גדול מ-${issue.minimum}`}`;
				if (issue.origin === "array" || issue.origin === "set") {
					const verb = issue.origin === "set" ? "צריכה" : "צריך";
					if (issue.minimum === 1 && issue.inclusive) return `קטן מדי: ${subject} ${verb} להכיל ${issue.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד"}`;
					return `קטן מדי: ${subject} ${verb} להכיל ${issue.inclusive ? `${issue.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue.minimum} ${sizing?.unit ?? ""}`}`.trim();
				}
				const adj = issue.inclusive ? ">=" : ">";
				const be = verbFor(issue.origin ?? "value");
				if (sizing?.unit) return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
				if (_issue.format === "includes") return `המחרוזת חייבת לכלול "${_issue.includes}"`;
				if (_issue.format === "regex") return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
				const nounEntry = FormatDictionary[_issue.format];
				return `${nounEntry?.label ?? _issue.format} לא ${(nounEntry?.gender ?? "m") === "f" ? "תקינה" : "תקין"}`;
			}
			case "not_multiple_of": return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
			case "unrecognized_keys": return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `שדה לא תקין באובייקט`;
			case "invalid_union": return "קלט לא תקין";
			case "invalid_element": return `ערך לא תקין ב${withDefinite(issue.origin ?? "array")}`;
			default: return `קלט לא תקין`;
		}
	};
};
function he_default() {
	return { localeError: error$31() };
}
var error$30 = () => {
	const Sizable = {
		string: {
			unit: "karakter",
			verb: "legyen"
		},
		file: {
			unit: "byte",
			verb: "legyen"
		},
		array: {
			unit: "elem",
			verb: "legyen"
		},
		set: {
			unit: "elem",
			verb: "legyen"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "bemenet",
		email: "email cím",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO időbélyeg",
		date: "ISO dátum",
		time: "ISO idő",
		duration: "ISO időintervallum",
		ipv4: "IPv4 cím",
		ipv6: "IPv6 cím",
		cidrv4: "IPv4 tartomány",
		cidrv6: "IPv6 tartomány",
		base64: "base64-kódolt string",
		base64url: "base64url-kódolt string",
		json_string: "JSON string",
		e164: "E.164 szám",
		jwt: "JWT",
		template_literal: "bemenet"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "szám",
		array: "tömb"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Érvénytelen bemenet: a várt érték instanceof ${issue.expected}, a kapott érték ${received}`;
				return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Érvénytelen bemenet: a várt érték ${stringifyPrimitive(issue.values[0])}`;
				return `Érvénytelen opció: valamelyik érték várt ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Túl nagy: ${issue.origin ?? "érték"} mérete túl nagy ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elem"}`;
				return `Túl nagy: a bemeneti érték ${issue.origin ?? "érték"} túl nagy: ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Túl kicsi: a bemeneti érték ${issue.origin} mérete túl kicsi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Túl kicsi: a bemeneti érték ${issue.origin} túl kicsi ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
				if (_issue.format === "ends_with") return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
				if (_issue.format === "includes") return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
				if (_issue.format === "regex") return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
				return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Érvénytelen szám: ${issue.divisor} többszörösének kell lennie`;
			case "unrecognized_keys": return `Ismeretlen kulcs${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Érvénytelen kulcs ${issue.origin}`;
			case "invalid_union": return "Érvénytelen bemenet";
			case "invalid_element": return `Érvénytelen érték: ${issue.origin}`;
			default: return `Érvénytelen bemenet`;
		}
	};
};
function hu_default() {
	return { localeError: error$30() };
}
function getArmenianPlural(count, one, many) {
	return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
	if (!word) return "";
	const vowels = [
		"ա",
		"ե",
		"ը",
		"ի",
		"ո",
		"ու",
		"օ"
	];
	const lastChar = word[word.length - 1];
	return word + (vowels.includes(lastChar) ? "ն" : "ը");
}
var error$29 = () => {
	const Sizable = {
		string: {
			unit: {
				one: "նշան",
				many: "նշաններ"
			},
			verb: "ունենալ"
		},
		file: {
			unit: {
				one: "բայթ",
				many: "բայթեր"
			},
			verb: "ունենալ"
		},
		array: {
			unit: {
				one: "տարր",
				many: "տարրեր"
			},
			verb: "ունենալ"
		},
		set: {
			unit: {
				one: "տարր",
				many: "տարրեր"
			},
			verb: "ունենալ"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "մուտք",
		email: "էլ. հասցե",
		url: "URL",
		emoji: "էմոջի",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO ամսաթիվ և ժամ",
		date: "ISO ամսաթիվ",
		time: "ISO ժամ",
		duration: "ISO տևողություն",
		ipv4: "IPv4 հասցե",
		ipv6: "IPv6 հասցե",
		cidrv4: "IPv4 միջակայք",
		cidrv6: "IPv6 միջակայք",
		base64: "base64 ձևաչափով տող",
		base64url: "base64url ձևաչափով տող",
		json_string: "JSON տող",
		e164: "E.164 համար",
		jwt: "JWT",
		template_literal: "մուտք"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "թիվ",
		array: "զանգված"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue.expected}, ստացվել է ${received}`;
				return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Սխալ մուտքագրում․ սպասվում էր ${stringifyPrimitive(issue.values[1])}`;
				return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) {
					const unit = getArmenianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.many);
					return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} կունենա ${adj}${issue.maximum.toString()} ${unit}`;
				}
				return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} լինի ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) {
					const unit = getArmenianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.many);
					return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} կունենա ${adj}${issue.minimum.toString()} ${unit}`;
				}
				return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} լինի ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
				if (_issue.format === "ends_with") return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
				if (_issue.format === "includes") return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
				if (_issue.format === "regex") return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
				return `Սխալ ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue.divisor}-ի`;
			case "unrecognized_keys": return `Չճանաչված բանալի${issue.keys.length > 1 ? "ներ" : ""}. ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Սխալ բանալի ${withDefiniteArticle(issue.origin)}-ում`;
			case "invalid_union": return "Սխալ մուտքագրում";
			case "invalid_element": return `Սխալ արժեք ${withDefiniteArticle(issue.origin)}-ում`;
			default: return `Սխալ մուտքագրում`;
		}
	};
};
function hy_default() {
	return { localeError: error$29() };
}
var error$28 = () => {
	const Sizable = {
		string: {
			unit: "karakter",
			verb: "memiliki"
		},
		file: {
			unit: "byte",
			verb: "memiliki"
		},
		array: {
			unit: "item",
			verb: "memiliki"
		},
		set: {
			unit: "item",
			verb: "memiliki"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "alamat email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "tanggal dan waktu format ISO",
		date: "tanggal format ISO",
		time: "jam format ISO",
		duration: "durasi format ISO",
		ipv4: "alamat IPv4",
		ipv6: "alamat IPv6",
		cidrv4: "rentang alamat IPv4",
		cidrv6: "rentang alamat IPv6",
		base64: "string dengan enkode base64",
		base64url: "string dengan enkode base64url",
		json_string: "string JSON",
		e164: "angka E.164",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Input tidak valid: diharapkan instanceof ${issue.expected}, diterima ${received}`;
				return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Input tidak valid: diharapkan ${stringifyPrimitive(issue.values[0])}`;
				return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Terlalu besar: diharapkan ${issue.origin ?? "value"} memiliki ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
				return `Terlalu besar: diharapkan ${issue.origin ?? "value"} menjadi ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Terlalu kecil: diharapkan ${issue.origin} memiliki ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Terlalu kecil: diharapkan ${issue.origin} menjadi ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
				if (_issue.format === "includes") return `String tidak valid: harus menyertakan "${_issue.includes}"`;
				if (_issue.format === "regex") return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
				return `${FormatDictionary[_issue.format] ?? issue.format} tidak valid`;
			}
			case "not_multiple_of": return `Angka tidak valid: harus kelipatan dari ${issue.divisor}`;
			case "unrecognized_keys": return `Kunci tidak dikenali ${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Kunci tidak valid di ${issue.origin}`;
			case "invalid_union": return "Input tidak valid";
			case "invalid_element": return `Nilai tidak valid di ${issue.origin}`;
			default: return `Input tidak valid`;
		}
	};
};
function id_default() {
	return { localeError: error$28() };
}
var error$27 = () => {
	const Sizable = {
		string: {
			unit: "stafi",
			verb: "að hafa"
		},
		file: {
			unit: "bæti",
			verb: "að hafa"
		},
		array: {
			unit: "hluti",
			verb: "að hafa"
		},
		set: {
			unit: "hluti",
			verb: "að hafa"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "gildi",
		email: "netfang",
		url: "vefslóð",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO dagsetning og tími",
		date: "ISO dagsetning",
		time: "ISO tími",
		duration: "ISO tímalengd",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded strengur",
		base64url: "base64url-encoded strengur",
		json_string: "JSON strengur",
		e164: "E.164 tölugildi",
		jwt: "JWT",
		template_literal: "gildi"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "númer",
		array: "fylki"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue.expected}`;
				return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Rangt gildi: gert ráð fyrir ${stringifyPrimitive(issue.values[0])}`;
				return `Ógilt val: má vera eitt af eftirfarandi ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} hafi ${adj}${issue.maximum.toString()} ${sizing.unit ?? "hluti"}`;
				return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} sé ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Of lítið: gert er ráð fyrir að ${issue.origin} hafi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Of lítið: gert er ráð fyrir að ${issue.origin} sé ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
				if (_issue.format === "regex") return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
				return `Rangt ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Röng tala: verður að vera margfeldi af ${issue.divisor}`;
			case "unrecognized_keys": return `Óþekkt ${issue.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Rangur lykill í ${issue.origin}`;
			case "invalid_union": return "Rangt gildi";
			case "invalid_element": return `Rangt gildi í ${issue.origin}`;
			default: return `Rangt gildi`;
		}
	};
};
function is_default() {
	return { localeError: error$27() };
}
var error$26 = () => {
	const Sizable = {
		string: {
			unit: "caratteri",
			verb: "avere"
		},
		file: {
			unit: "byte",
			verb: "avere"
		},
		array: {
			unit: "elementi",
			verb: "avere"
		},
		set: {
			unit: "elementi",
			verb: "avere"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "indirizzo email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data e ora ISO",
		date: "data ISO",
		time: "ora ISO",
		duration: "durata ISO",
		ipv4: "indirizzo IPv4",
		ipv6: "indirizzo IPv6",
		cidrv4: "intervallo IPv4",
		cidrv6: "intervallo IPv6",
		base64: "stringa codificata in base64",
		base64url: "URL codificata in base64",
		json_string: "stringa JSON",
		e164: "numero E.164",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "numero",
		array: "vettore"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Input non valido: atteso instanceof ${issue.expected}, ricevuto ${received}`;
				return `Input non valido: atteso ${expected}, ricevuto ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Input non valido: atteso ${stringifyPrimitive(issue.values[0])}`;
				return `Opzione non valida: atteso uno tra ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Troppo grande: ${issue.origin ?? "valore"} deve avere ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementi"}`;
				return `Troppo grande: ${issue.origin ?? "valore"} deve essere ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Troppo piccolo: ${issue.origin} deve avere ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Troppo piccolo: ${issue.origin} deve essere ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Stringa non valida: deve includere "${_issue.includes}"`;
				if (_issue.format === "regex") return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
				return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Numero non valido: deve essere un multiplo di ${issue.divisor}`;
			case "unrecognized_keys": return `Chiav${issue.keys.length > 1 ? "i" : "e"} non riconosciut${issue.keys.length > 1 ? "e" : "a"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Chiave non valida in ${issue.origin}`;
			case "invalid_union": return "Input non valido";
			case "invalid_element": return `Valore non valido in ${issue.origin}`;
			default: return `Input non valido`;
		}
	};
};
function it_default() {
	return { localeError: error$26() };
}
var error$25 = () => {
	const Sizable = {
		string: {
			unit: "文字",
			verb: "である"
		},
		file: {
			unit: "バイト",
			verb: "である"
		},
		array: {
			unit: "要素",
			verb: "である"
		},
		set: {
			unit: "要素",
			verb: "である"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "入力値",
		email: "メールアドレス",
		url: "URL",
		emoji: "絵文字",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO日時",
		date: "ISO日付",
		time: "ISO時刻",
		duration: "ISO期間",
		ipv4: "IPv4アドレス",
		ipv6: "IPv6アドレス",
		cidrv4: "IPv4範囲",
		cidrv6: "IPv6範囲",
		base64: "base64エンコード文字列",
		base64url: "base64urlエンコード文字列",
		json_string: "JSON文字列",
		e164: "E.164番号",
		jwt: "JWT",
		template_literal: "入力値"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "数値",
		array: "配列"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `無効な入力: instanceof ${issue.expected}が期待されましたが、${received}が入力されました`;
				return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `無効な入力: ${stringifyPrimitive(issue.values[0])}が期待されました`;
				return `無効な選択: ${joinValues(issue.values, "、")}のいずれかである必要があります`;
			case "too_big": {
				const adj = issue.inclusive ? "以下である" : "より小さい";
				const sizing = getSizing(issue.origin);
				if (sizing) return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
				return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${adj}必要があります`;
			}
			case "too_small": {
				const adj = issue.inclusive ? "以上である" : "より大きい";
				const sizing = getSizing(issue.origin);
				if (sizing) return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${sizing.unit}${adj}必要があります`;
				return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${adj}必要があります`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
				if (_issue.format === "ends_with") return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
				if (_issue.format === "includes") return `無効な文字列: "${_issue.includes}"を含む必要があります`;
				if (_issue.format === "regex") return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
				return `無効な${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `無効な数値: ${issue.divisor}の倍数である必要があります`;
			case "unrecognized_keys": return `認識されていないキー${issue.keys.length > 1 ? "群" : ""}: ${joinValues(issue.keys, "、")}`;
			case "invalid_key": return `${issue.origin}内の無効なキー`;
			case "invalid_union": return "無効な入力";
			case "invalid_element": return `${issue.origin}内の無効な値`;
			default: return `無効な入力`;
		}
	};
};
function ja_default() {
	return { localeError: error$25() };
}
var error$24 = () => {
	const Sizable = {
		string: {
			unit: "სიმბოლო",
			verb: "უნდა შეიცავდეს"
		},
		file: {
			unit: "ბაიტი",
			verb: "უნდა შეიცავდეს"
		},
		array: {
			unit: "ელემენტი",
			verb: "უნდა შეიცავდეს"
		},
		set: {
			unit: "ელემენტი",
			verb: "უნდა შეიცავდეს"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "შეყვანა",
		email: "ელ-ფოსტის მისამართი",
		url: "URL",
		emoji: "ემოჯი",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "თარიღი-დრო",
		date: "თარიღი",
		time: "დრო",
		duration: "ხანგრძლივობა",
		ipv4: "IPv4 მისამართი",
		ipv6: "IPv6 მისამართი",
		cidrv4: "IPv4 დიაპაზონი",
		cidrv6: "IPv6 დიაპაზონი",
		base64: "base64-კოდირებული სტრინგი",
		base64url: "base64url-კოდირებული სტრინგი",
		json_string: "JSON სტრინგი",
		e164: "E.164 ნომერი",
		jwt: "JWT",
		template_literal: "შეყვანა"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "რიცხვი",
		string: "სტრინგი",
		boolean: "ბულეანი",
		function: "ფუნქცია",
		array: "მასივი"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue.expected}, მიღებული ${received}`;
				return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `არასწორი შეყვანა: მოსალოდნელი ${stringifyPrimitive(issue.values[0])}`;
				return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${joinValues(issue.values, "|")}-დან`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
				return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} იყოს ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `არასწორი სტრინგი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
				if (_issue.format === "ends_with") return `არასწორი სტრინგი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
				if (_issue.format === "includes") return `არასწორი სტრინგი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
				if (_issue.format === "regex") return `არასწორი სტრინგი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
				return `არასწორი ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `არასწორი რიცხვი: უნდა იყოს ${issue.divisor}-ის ჯერადი`;
			case "unrecognized_keys": return `უცნობი გასაღებ${issue.keys.length > 1 ? "ები" : "ი"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `არასწორი გასაღები ${issue.origin}-ში`;
			case "invalid_union": return "არასწორი შეყვანა";
			case "invalid_element": return `არასწორი მნიშვნელობა ${issue.origin}-ში`;
			default: return `არასწორი შეყვანა`;
		}
	};
};
function ka_default() {
	return { localeError: error$24() };
}
var error$23 = () => {
	const Sizable = {
		string: {
			unit: "តួអក្សរ",
			verb: "គួរមាន"
		},
		file: {
			unit: "បៃ",
			verb: "គួរមាន"
		},
		array: {
			unit: "ធាតុ",
			verb: "គួរមាន"
		},
		set: {
			unit: "ធាតុ",
			verb: "គួរមាន"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "ទិន្នន័យបញ្ចូល",
		email: "អាសយដ្ឋានអ៊ីមែល",
		url: "URL",
		emoji: "សញ្ញាអារម្មណ៍",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
		date: "កាលបរិច្ឆេទ ISO",
		time: "ម៉ោង ISO",
		duration: "រយៈពេល ISO",
		ipv4: "អាសយដ្ឋាន IPv4",
		ipv6: "អាសយដ្ឋាន IPv6",
		cidrv4: "ដែនអាសយដ្ឋាន IPv4",
		cidrv6: "ដែនអាសយដ្ឋាន IPv6",
		base64: "ខ្សែអក្សរអ៊ិកូដ base64",
		base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
		json_string: "ខ្សែអក្សរ JSON",
		e164: "លេខ E.164",
		jwt: "JWT",
		template_literal: "ទិន្នន័យបញ្ចូល"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "លេខ",
		array: "អារេ (Array)",
		null: "គ្មានតម្លៃ (null)"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue.expected} ប៉ុន្តែទទួលបាន ${received}`;
				return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${stringifyPrimitive(issue.values[0])}`;
				return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
				return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
				return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
				if (_issue.format === "includes") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
				if (_issue.format === "regex") return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
				return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue.divisor}`;
			case "unrecognized_keys": return `រកឃើញសោមិនស្គាល់៖ ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
			case "invalid_union": return `ទិន្នន័យមិនត្រឹមត្រូវ`;
			case "invalid_element": return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
			default: return `ទិន្នន័យមិនត្រឹមត្រូវ`;
		}
	};
};
function km_default() {
	return { localeError: error$23() };
}
/** @deprecated Use `km` instead. */
function kh_default() {
	return km_default();
}
var error$22 = () => {
	const Sizable = {
		string: {
			unit: "문자",
			verb: "to have"
		},
		file: {
			unit: "바이트",
			verb: "to have"
		},
		array: {
			unit: "개",
			verb: "to have"
		},
		set: {
			unit: "개",
			verb: "to have"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "입력",
		email: "이메일 주소",
		url: "URL",
		emoji: "이모지",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO 날짜시간",
		date: "ISO 날짜",
		time: "ISO 시간",
		duration: "ISO 기간",
		ipv4: "IPv4 주소",
		ipv6: "IPv6 주소",
		cidrv4: "IPv4 범위",
		cidrv6: "IPv6 범위",
		base64: "base64 인코딩 문자열",
		base64url: "base64url 인코딩 문자열",
		json_string: "JSON 문자열",
		e164: "E.164 번호",
		jwt: "JWT",
		template_literal: "입력"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `잘못된 입력: 예상 타입은 instanceof ${issue.expected}, 받은 타입은 ${received}입니다`;
				return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `잘못된 입력: 값은 ${stringifyPrimitive(issue.values[0])} 이어야 합니다`;
				return `잘못된 옵션: ${joinValues(issue.values, "또는 ")} 중 하나여야 합니다`;
			case "too_big": {
				const adj = issue.inclusive ? "이하" : "미만";
				const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
				const sizing = getSizing(issue.origin);
				const unit = sizing?.unit ?? "요소";
				if (sizing) return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()}${unit} ${adj}${suffix}`;
				return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()} ${adj}${suffix}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? "이상" : "초과";
				const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
				const sizing = getSizing(issue.origin);
				const unit = sizing?.unit ?? "요소";
				if (sizing) return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()}${unit} ${adj}${suffix}`;
				return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()} ${adj}${suffix}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
				if (_issue.format === "ends_with") return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
				if (_issue.format === "includes") return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
				if (_issue.format === "regex") return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
				return `잘못된 ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `잘못된 숫자: ${issue.divisor}의 배수여야 합니다`;
			case "unrecognized_keys": return `인식할 수 없는 키: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `잘못된 키: ${issue.origin}`;
			case "invalid_union": return `잘못된 입력`;
			case "invalid_element": return `잘못된 값: ${issue.origin}`;
			default: return `잘못된 입력`;
		}
	};
};
function ko_default() {
	return { localeError: error$22() };
}
var capitalizeFirstCharacter = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number) {
	const abs = Math.abs(number);
	const last = abs % 10;
	const last2 = abs % 100;
	if (last2 >= 11 && last2 <= 19 || last === 0) return "many";
	if (last === 1) return "one";
	return "few";
}
var error$21 = () => {
	const Sizable = {
		string: {
			unit: {
				one: "simbolis",
				few: "simboliai",
				many: "simbolių"
			},
			verb: {
				smaller: {
					inclusive: "turi būti ne ilgesnė kaip",
					notInclusive: "turi būti trumpesnė kaip"
				},
				bigger: {
					inclusive: "turi būti ne trumpesnė kaip",
					notInclusive: "turi būti ilgesnė kaip"
				}
			}
		},
		file: {
			unit: {
				one: "baitas",
				few: "baitai",
				many: "baitų"
			},
			verb: {
				smaller: {
					inclusive: "turi būti ne didesnis kaip",
					notInclusive: "turi būti mažesnis kaip"
				},
				bigger: {
					inclusive: "turi būti ne mažesnis kaip",
					notInclusive: "turi būti didesnis kaip"
				}
			}
		},
		array: {
			unit: {
				one: "elementą",
				few: "elementus",
				many: "elementų"
			},
			verb: {
				smaller: {
					inclusive: "turi turėti ne daugiau kaip",
					notInclusive: "turi turėti mažiau kaip"
				},
				bigger: {
					inclusive: "turi turėti ne mažiau kaip",
					notInclusive: "turi turėti daugiau kaip"
				}
			}
		},
		set: {
			unit: {
				one: "elementą",
				few: "elementus",
				many: "elementų"
			},
			verb: {
				smaller: {
					inclusive: "turi turėti ne daugiau kaip",
					notInclusive: "turi turėti mažiau kaip"
				},
				bigger: {
					inclusive: "turi turėti ne mažiau kaip",
					notInclusive: "turi turėti daugiau kaip"
				}
			}
		}
	};
	function getSizing(origin, unitType, inclusive, targetShouldBe) {
		const result = Sizable[origin] ?? null;
		if (result === null) return result;
		return {
			unit: result.unit[unitType],
			verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
		};
	}
	const FormatDictionary = {
		regex: "įvestis",
		email: "el. pašto adresas",
		url: "URL",
		emoji: "jaustukas",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO data ir laikas",
		date: "ISO data",
		time: "ISO laikas",
		duration: "ISO trukmė",
		ipv4: "IPv4 adresas",
		ipv6: "IPv6 adresas",
		cidrv4: "IPv4 tinklo prefiksas (CIDR)",
		cidrv6: "IPv6 tinklo prefiksas (CIDR)",
		base64: "base64 užkoduota eilutė",
		base64url: "base64url užkoduota eilutė",
		json_string: "JSON eilutė",
		e164: "E.164 numeris",
		jwt: "JWT",
		template_literal: "įvestis"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "skaičius",
		bigint: "sveikasis skaičius",
		string: "eilutė",
		boolean: "loginė reikšmė",
		undefined: "neapibrėžta reikšmė",
		function: "funkcija",
		symbol: "simbolis",
		array: "masyvas",
		object: "objektas",
		null: "nulinė reikšmė"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue.expected}`;
				return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Privalo būti ${stringifyPrimitive(issue.values[0])}`;
				return `Privalo būti vienas iš ${joinValues(issue.values, "|")} pasirinkimų`;
			case "too_big": {
				const origin = TypeDictionary[issue.origin] ?? issue.origin;
				const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.maximum)), issue.inclusive ?? false, "smaller");
				if (sizing?.verb) return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.maximum.toString()} ${sizing.unit ?? "elementų"}`;
				const adj = issue.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
				return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.maximum.toString()} ${sizing?.unit}`;
			}
			case "too_small": {
				const origin = TypeDictionary[issue.origin] ?? issue.origin;
				const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.minimum)), issue.inclusive ?? false, "bigger");
				if (sizing?.verb) return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.minimum.toString()} ${sizing.unit ?? "elementų"}`;
				const adj = issue.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
				return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.minimum.toString()} ${sizing?.unit}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Eilutė privalo prasidėti "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Eilutė privalo įtraukti "${_issue.includes}"`;
				if (_issue.format === "regex") return `Eilutė privalo atitikti ${_issue.pattern}`;
				return `Neteisingas ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Skaičius privalo būti ${issue.divisor} kartotinis.`;
			case "unrecognized_keys": return `Neatpažint${issue.keys.length > 1 ? "i" : "as"} rakt${issue.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return "Rastas klaidingas raktas";
			case "invalid_union": return "Klaidinga įvestis";
			case "invalid_element": return `${capitalizeFirstCharacter(TypeDictionary[issue.origin] ?? issue.origin ?? issue.origin ?? "reikšmė")} turi klaidingą įvestį`;
			default: return "Klaidinga įvestis";
		}
	};
};
function lt_default() {
	return { localeError: error$21() };
}
var error$20 = () => {
	const Sizable = {
		string: {
			unit: "знаци",
			verb: "да имаат"
		},
		file: {
			unit: "бајти",
			verb: "да имаат"
		},
		array: {
			unit: "ставки",
			verb: "да имаат"
		},
		set: {
			unit: "ставки",
			verb: "да имаат"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "внес",
		email: "адреса на е-пошта",
		url: "URL",
		emoji: "емоџи",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO датум и време",
		date: "ISO датум",
		time: "ISO време",
		duration: "ISO времетраење",
		ipv4: "IPv4 адреса",
		ipv6: "IPv6 адреса",
		cidrv4: "IPv4 опсег",
		cidrv6: "IPv6 опсег",
		base64: "base64-енкодирана низа",
		base64url: "base64url-енкодирана низа",
		json_string: "JSON низа",
		e164: "E.164 број",
		jwt: "JWT",
		template_literal: "внес"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "број",
		array: "низа"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Грешен внес: се очекува instanceof ${issue.expected}, примено ${received}`;
				return `Грешен внес: се очекува ${expected}, примено ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
				return `Грешана опција: се очекува една ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да има ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементи"}`;
				return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да биде ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Премногу мал: се очекува ${issue.origin} да има ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Премногу мал: се очекува ${issue.origin} да биде ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
				if (_issue.format === "regex") return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
				return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Грешен број: мора да биде делив со ${issue.divisor}`;
			case "unrecognized_keys": return `${issue.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Грешен клуч во ${issue.origin}`;
			case "invalid_union": return "Грешен внес";
			case "invalid_element": return `Грешна вредност во ${issue.origin}`;
			default: return `Грешен внес`;
		}
	};
};
function mk_default() {
	return { localeError: error$20() };
}
var error$19 = () => {
	const Sizable = {
		string: {
			unit: "aksara",
			verb: "mempunyai"
		},
		file: {
			unit: "bait",
			verb: "mempunyai"
		},
		array: {
			unit: "elemen",
			verb: "mempunyai"
		},
		set: {
			unit: "elemen",
			verb: "mempunyai"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "alamat e-mel",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "tarikh masa ISO",
		date: "tarikh ISO",
		time: "masa ISO",
		duration: "tempoh ISO",
		ipv4: "alamat IPv4",
		ipv6: "alamat IPv6",
		cidrv4: "julat IPv4",
		cidrv6: "julat IPv6",
		base64: "string dikodkan base64",
		base64url: "string dikodkan base64url",
		json_string: "string JSON",
		e164: "nombor E.164",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "nombor"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Input tidak sah: dijangka instanceof ${issue.expected}, diterima ${received}`;
				return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Input tidak sah: dijangka ${stringifyPrimitive(issue.values[0])}`;
				return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
				return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} adalah ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Terlalu kecil: dijangka ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Terlalu kecil: dijangka ${issue.origin} adalah ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
				if (_issue.format === "includes") return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
				if (_issue.format === "regex") return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
				return `${FormatDictionary[_issue.format] ?? issue.format} tidak sah`;
			}
			case "not_multiple_of": return `Nombor tidak sah: perlu gandaan ${issue.divisor}`;
			case "unrecognized_keys": return `Kunci tidak dikenali: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Kunci tidak sah dalam ${issue.origin}`;
			case "invalid_union": return "Input tidak sah";
			case "invalid_element": return `Nilai tidak sah dalam ${issue.origin}`;
			default: return `Input tidak sah`;
		}
	};
};
function ms_default() {
	return { localeError: error$19() };
}
var error$18 = () => {
	const Sizable = {
		string: {
			unit: "tekens",
			verb: "heeft"
		},
		file: {
			unit: "bytes",
			verb: "heeft"
		},
		array: {
			unit: "elementen",
			verb: "heeft"
		},
		set: {
			unit: "elementen",
			verb: "heeft"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "invoer",
		email: "emailadres",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datum en tijd",
		date: "ISO datum",
		time: "ISO tijd",
		duration: "ISO duur",
		ipv4: "IPv4-adres",
		ipv6: "IPv6-adres",
		cidrv4: "IPv4-bereik",
		cidrv6: "IPv6-bereik",
		base64: "base64-gecodeerde tekst",
		base64url: "base64 URL-gecodeerde tekst",
		json_string: "JSON string",
		e164: "E.164-nummer",
		jwt: "JWT",
		template_literal: "invoer"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "getal"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Ongeldige invoer: verwacht instanceof ${issue.expected}, ontving ${received}`;
				return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue.values[0])}`;
				return `Ongeldige optie: verwacht één van ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				const longName = issue.origin === "date" ? "laat" : issue.origin === "string" ? "lang" : "groot";
				if (sizing) return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
				return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				const shortName = issue.origin === "date" ? "vroeg" : issue.origin === "string" ? "kort" : "klein";
				if (sizing) return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
				return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
				if (_issue.format === "ends_with") return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
				if (_issue.format === "includes") return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
				if (_issue.format === "regex") return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
				return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
			case "unrecognized_keys": return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Ongeldige key in ${issue.origin}`;
			case "invalid_union": return "Ongeldige invoer";
			case "invalid_element": return `Ongeldige waarde in ${issue.origin}`;
			default: return `Ongeldige invoer`;
		}
	};
};
function nl_default() {
	return { localeError: error$18() };
}
var error$17 = () => {
	const Sizable = {
		string: {
			unit: "tegn",
			verb: "å ha"
		},
		file: {
			unit: "bytes",
			verb: "å ha"
		},
		array: {
			unit: "elementer",
			verb: "å inneholde"
		},
		set: {
			unit: "elementer",
			verb: "å inneholde"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "e-postadresse",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO dato- og klokkeslett",
		date: "ISO-dato",
		time: "ISO-klokkeslett",
		duration: "ISO-varighet",
		ipv4: "IPv4-område",
		ipv6: "IPv6-område",
		cidrv4: "IPv4-spekter",
		cidrv6: "IPv6-spekter",
		base64: "base64-enkodet streng",
		base64url: "base64url-enkodet streng",
		json_string: "JSON-streng",
		e164: "E.164-nummer",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "tall",
		array: "liste"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Ugyldig input: forventet instanceof ${issue.expected}, fikk ${received}`;
				return `Ugyldig input: forventet ${expected}, fikk ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Ugyldig verdi: forventet ${stringifyPrimitive(issue.values[0])}`;
				return `Ugyldig valg: forventet en av ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
				return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Ugyldig streng: må starte med "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Ugyldig streng: må ende med "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Ugyldig streng: må inneholde "${_issue.includes}"`;
				if (_issue.format === "regex") return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
				return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Ugyldig tall: må være et multiplum av ${issue.divisor}`;
			case "unrecognized_keys": return `${issue.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Ugyldig nøkkel i ${issue.origin}`;
			case "invalid_union": return "Ugyldig input";
			case "invalid_element": return `Ugyldig verdi i ${issue.origin}`;
			default: return `Ugyldig input`;
		}
	};
};
function no_default() {
	return { localeError: error$17() };
}
var error$16 = () => {
	const Sizable = {
		string: {
			unit: "harf",
			verb: "olmalıdır"
		},
		file: {
			unit: "bayt",
			verb: "olmalıdır"
		},
		array: {
			unit: "unsur",
			verb: "olmalıdır"
		},
		set: {
			unit: "unsur",
			verb: "olmalıdır"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "giren",
		email: "epostagâh",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO hengâmı",
		date: "ISO tarihi",
		time: "ISO zamanı",
		duration: "ISO müddeti",
		ipv4: "IPv4 nişânı",
		ipv6: "IPv6 nişânı",
		cidrv4: "IPv4 menzili",
		cidrv6: "IPv6 menzili",
		base64: "base64-şifreli metin",
		base64url: "base64url-şifreli metin",
		json_string: "JSON metin",
		e164: "E.164 sayısı",
		jwt: "JWT",
		template_literal: "giren"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "numara",
		array: "saf",
		null: "gayb"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Fâsit giren: umulan instanceof ${issue.expected}, alınan ${received}`;
				return `Fâsit giren: umulan ${expected}, alınan ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Fâsit giren: umulan ${stringifyPrimitive(issue.values[0])}`;
				return `Fâsit tercih: mûteberler ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
				return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} olmalıydı.`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
				return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} olmalıydı.`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
				if (_issue.format === "ends_with") return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
				if (_issue.format === "includes") return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
				if (_issue.format === "regex") return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
				return `Fâsit ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Fâsit sayı: ${issue.divisor} katı olmalıydı.`;
			case "unrecognized_keys": return `Tanınmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `${issue.origin} için tanınmayan anahtar var.`;
			case "invalid_union": return "Giren tanınamadı.";
			case "invalid_element": return `${issue.origin} için tanınmayan kıymet var.`;
			default: return `Kıymet tanınamadı.`;
		}
	};
};
function ota_default() {
	return { localeError: error$16() };
}
var error$15 = () => {
	const Sizable = {
		string: {
			unit: "توکي",
			verb: "ولري"
		},
		file: {
			unit: "بایټس",
			verb: "ولري"
		},
		array: {
			unit: "توکي",
			verb: "ولري"
		},
		set: {
			unit: "توکي",
			verb: "ولري"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "ورودي",
		email: "بریښنالیک",
		url: "یو آر ال",
		emoji: "ایموجي",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "نیټه او وخت",
		date: "نېټه",
		time: "وخت",
		duration: "موده",
		ipv4: "د IPv4 پته",
		ipv6: "د IPv6 پته",
		cidrv4: "د IPv4 ساحه",
		cidrv6: "د IPv6 ساحه",
		base64: "base64-encoded متن",
		base64url: "base64url-encoded متن",
		json_string: "JSON متن",
		e164: "د E.164 شمېره",
		jwt: "JWT",
		template_literal: "ورودي"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "عدد",
		array: "ارې"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `ناسم ورودي: باید instanceof ${issue.expected} وای, مګر ${received} ترلاسه شو`;
				return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `ناسم ورودي: باید ${stringifyPrimitive(issue.values[0])} وای`;
				return `ناسم انتخاب: باید یو له ${joinValues(issue.values, "|")} څخه وای`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
				return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} وي`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} ولري`;
				return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} وي`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
				if (_issue.format === "ends_with") return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
				if (_issue.format === "includes") return `ناسم متن: باید "${_issue.includes}" ولري`;
				if (_issue.format === "regex") return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
				return `${FormatDictionary[_issue.format] ?? issue.format} ناسم دی`;
			}
			case "not_multiple_of": return `ناسم عدد: باید د ${issue.divisor} مضرب وي`;
			case "unrecognized_keys": return `ناسم ${issue.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `ناسم کلیډ په ${issue.origin} کې`;
			case "invalid_union": return `ناسمه ورودي`;
			case "invalid_element": return `ناسم عنصر په ${issue.origin} کې`;
			default: return `ناسمه ورودي`;
		}
	};
};
function ps_default() {
	return { localeError: error$15() };
}
var error$14 = () => {
	const Sizable = {
		string: {
			unit: "znaków",
			verb: "mieć"
		},
		file: {
			unit: "bajtów",
			verb: "mieć"
		},
		array: {
			unit: "elementów",
			verb: "mieć"
		},
		set: {
			unit: "elementów",
			verb: "mieć"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "wyrażenie",
		email: "adres email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data i godzina w formacie ISO",
		date: "data w formacie ISO",
		time: "godzina w formacie ISO",
		duration: "czas trwania ISO",
		ipv4: "adres IPv4",
		ipv6: "adres IPv6",
		cidrv4: "zakres IPv4",
		cidrv6: "zakres IPv6",
		base64: "ciąg znaków zakodowany w formacie base64",
		base64url: "ciąg znaków zakodowany w formacie base64url",
		json_string: "ciąg znaków w formacie JSON",
		e164: "liczba E.164",
		jwt: "JWT",
		template_literal: "wejście"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "liczba",
		array: "tablica"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue.expected}, otrzymano ${received}`;
				return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Nieprawidłowe dane wejściowe: oczekiwano ${stringifyPrimitive(issue.values[0])}`;
				return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Za duża wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementów"}`;
				return `Zbyt duż(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Za mała wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.minimum.toString()} ${sizing.unit ?? "elementów"}`;
				return `Zbyt mał(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
				if (_issue.format === "regex") return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
				return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Nieprawidłowa liczba: musi być wielokrotnością ${issue.divisor}`;
			case "unrecognized_keys": return `Nierozpoznane klucze${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Nieprawidłowy klucz w ${issue.origin}`;
			case "invalid_union": return "Nieprawidłowe dane wejściowe";
			case "invalid_element": return `Nieprawidłowa wartość w ${issue.origin}`;
			default: return `Nieprawidłowe dane wejściowe`;
		}
	};
};
function pl_default() {
	return { localeError: error$14() };
}
var error$13 = () => {
	const Sizable = {
		string: {
			unit: "caracteres",
			verb: "ter"
		},
		file: {
			unit: "bytes",
			verb: "ter"
		},
		array: {
			unit: "itens",
			verb: "ter"
		},
		set: {
			unit: "itens",
			verb: "ter"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "padrão",
		email: "endereço de e-mail",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data e hora ISO",
		date: "data ISO",
		time: "hora ISO",
		duration: "duração ISO",
		ipv4: "endereço IPv4",
		ipv6: "endereço IPv6",
		cidrv4: "faixa de IPv4",
		cidrv6: "faixa de IPv6",
		base64: "texto codificado em base64",
		base64url: "URL codificada em base64",
		json_string: "texto JSON",
		e164: "número E.164",
		jwt: "JWT",
		template_literal: "entrada"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "número",
		null: "nulo"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Tipo inválido: esperado instanceof ${issue.expected}, recebido ${received}`;
				return `Tipo inválido: esperado ${expected}, recebido ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Entrada inválida: esperado ${stringifyPrimitive(issue.values[0])}`;
				return `Opção inválida: esperada uma das ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Muito grande: esperado que ${issue.origin ?? "valor"} tivesse ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
				return `Muito grande: esperado que ${issue.origin ?? "valor"} fosse ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Muito pequeno: esperado que ${issue.origin} tivesse ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Muito pequeno: esperado que ${issue.origin} fosse ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Texto inválido: deve começar com "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Texto inválido: deve terminar com "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Texto inválido: deve incluir "${_issue.includes}"`;
				if (_issue.format === "regex") return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
				return `${FormatDictionary[_issue.format] ?? issue.format} inválido`;
			}
			case "not_multiple_of": return `Número inválido: deve ser múltiplo de ${issue.divisor}`;
			case "unrecognized_keys": return `Chave${issue.keys.length > 1 ? "s" : ""} desconhecida${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Chave inválida em ${issue.origin}`;
			case "invalid_union": return "Entrada inválida";
			case "invalid_element": return `Valor inválido em ${issue.origin}`;
			default: return `Campo inválido`;
		}
	};
};
function pt_default() {
	return { localeError: error$13() };
}
function getRussianPlural(count, one, few, many) {
	const absCount = Math.abs(count);
	const lastDigit = absCount % 10;
	const lastTwoDigits = absCount % 100;
	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
	if (lastDigit === 1) return one;
	if (lastDigit >= 2 && lastDigit <= 4) return few;
	return many;
}
var error$12 = () => {
	const Sizable = {
		string: {
			unit: {
				one: "символ",
				few: "символа",
				many: "символов"
			},
			verb: "иметь"
		},
		file: {
			unit: {
				one: "байт",
				few: "байта",
				many: "байт"
			},
			verb: "иметь"
		},
		array: {
			unit: {
				one: "элемент",
				few: "элемента",
				many: "элементов"
			},
			verb: "иметь"
		},
		set: {
			unit: {
				one: "элемент",
				few: "элемента",
				many: "элементов"
			},
			verb: "иметь"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "ввод",
		email: "email адрес",
		url: "URL",
		emoji: "эмодзи",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO дата и время",
		date: "ISO дата",
		time: "ISO время",
		duration: "ISO длительность",
		ipv4: "IPv4 адрес",
		ipv6: "IPv6 адрес",
		cidrv4: "IPv4 диапазон",
		cidrv6: "IPv6 диапазон",
		base64: "строка в формате base64",
		base64url: "строка в формате base64url",
		json_string: "JSON строка",
		e164: "номер E.164",
		jwt: "JWT",
		template_literal: "ввод"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "число",
		array: "массив"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Неверный ввод: ожидалось instanceof ${issue.expected}, получено ${received}`;
				return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Неверный ввод: ожидалось ${stringifyPrimitive(issue.values[0])}`;
				return `Неверный вариант: ожидалось одно из ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) {
					const unit = getRussianPlural(Number(issue.maximum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет иметь ${adj}${issue.maximum.toString()} ${unit}`;
				}
				return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) {
					const unit = getRussianPlural(Number(issue.minimum), sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет иметь ${adj}${issue.minimum.toString()} ${unit}`;
				}
				return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Неверная строка: должна содержать "${_issue.includes}"`;
				if (_issue.format === "regex") return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
				return `Неверный ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Неверное число: должно быть кратным ${issue.divisor}`;
			case "unrecognized_keys": return `Нераспознанн${issue.keys.length > 1 ? "ые" : "ый"} ключ${issue.keys.length > 1 ? "и" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Неверный ключ в ${issue.origin}`;
			case "invalid_union": return "Неверные входные данные";
			case "invalid_element": return `Неверное значение в ${issue.origin}`;
			default: return `Неверные входные данные`;
		}
	};
};
function ru_default() {
	return { localeError: error$12() };
}
var error$11 = () => {
	const Sizable = {
		string: {
			unit: "znakov",
			verb: "imeti"
		},
		file: {
			unit: "bajtov",
			verb: "imeti"
		},
		array: {
			unit: "elementov",
			verb: "imeti"
		},
		set: {
			unit: "elementov",
			verb: "imeti"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "vnos",
		email: "e-poštni naslov",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datum in čas",
		date: "ISO datum",
		time: "ISO čas",
		duration: "ISO trajanje",
		ipv4: "IPv4 naslov",
		ipv6: "IPv6 naslov",
		cidrv4: "obseg IPv4",
		cidrv6: "obseg IPv6",
		base64: "base64 kodiran niz",
		base64url: "base64url kodiran niz",
		json_string: "JSON niz",
		e164: "E.164 številka",
		jwt: "JWT",
		template_literal: "vnos"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "število",
		array: "tabela"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Neveljaven vnos: pričakovano instanceof ${issue.expected}, prejeto ${received}`;
				return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Neveljaven vnos: pričakovano ${stringifyPrimitive(issue.values[0])}`;
				return `Neveljavna možnost: pričakovano eno izmed ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} imelo ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementov"}`;
				return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Premajhno: pričakovano, da bo ${issue.origin} imelo ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Premajhno: pričakovano, da bo ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
				if (_issue.format === "regex") return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
				return `Neveljaven ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Neveljavno število: mora biti večkratnik ${issue.divisor}`;
			case "unrecognized_keys": return `Neprepoznan${issue.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Neveljaven ključ v ${issue.origin}`;
			case "invalid_union": return "Neveljaven vnos";
			case "invalid_element": return `Neveljavna vrednost v ${issue.origin}`;
			default: return "Neveljaven vnos";
		}
	};
};
function sl_default() {
	return { localeError: error$11() };
}
var error$10 = () => {
	const Sizable = {
		string: {
			unit: "tecken",
			verb: "att ha"
		},
		file: {
			unit: "bytes",
			verb: "att ha"
		},
		array: {
			unit: "objekt",
			verb: "att innehålla"
		},
		set: {
			unit: "objekt",
			verb: "att innehålla"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "reguljärt uttryck",
		email: "e-postadress",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-datum och tid",
		date: "ISO-datum",
		time: "ISO-tid",
		duration: "ISO-varaktighet",
		ipv4: "IPv4-intervall",
		ipv6: "IPv6-intervall",
		cidrv4: "IPv4-spektrum",
		cidrv6: "IPv6-spektrum",
		base64: "base64-kodad sträng",
		base64url: "base64url-kodad sträng",
		json_string: "JSON-sträng",
		e164: "E.164-nummer",
		jwt: "JWT",
		template_literal: "mall-literal"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "antal",
		array: "lista"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Ogiltig inmatning: förväntat instanceof ${issue.expected}, fick ${received}`;
				return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Ogiltig inmatning: förväntat ${stringifyPrimitive(issue.values[0])}`;
				return `Ogiltigt val: förväntade en av ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `För stor(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
				return `För stor(t): förväntat ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
				if (_issue.format === "regex") return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
				return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Ogiltigt tal: måste vara en multipel av ${issue.divisor}`;
			case "unrecognized_keys": return `${issue.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Ogiltig nyckel i ${issue.origin ?? "värdet"}`;
			case "invalid_union": return "Ogiltig input";
			case "invalid_element": return `Ogiltigt värde i ${issue.origin ?? "värdet"}`;
			default: return `Ogiltig input`;
		}
	};
};
function sv_default() {
	return { localeError: error$10() };
}
var error$9 = () => {
	const Sizable = {
		string: {
			unit: "எழுத்துக்கள்",
			verb: "கொண்டிருக்க வேண்டும்"
		},
		file: {
			unit: "பைட்டுகள்",
			verb: "கொண்டிருக்க வேண்டும்"
		},
		array: {
			unit: "உறுப்புகள்",
			verb: "கொண்டிருக்க வேண்டும்"
		},
		set: {
			unit: "உறுப்புகள்",
			verb: "கொண்டிருக்க வேண்டும்"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "உள்ளீடு",
		email: "மின்னஞ்சல் முகவரி",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO தேதி நேரம்",
		date: "ISO தேதி",
		time: "ISO நேரம்",
		duration: "ISO கால அளவு",
		ipv4: "IPv4 முகவரி",
		ipv6: "IPv6 முகவரி",
		cidrv4: "IPv4 வரம்பு",
		cidrv6: "IPv6 வரம்பு",
		base64: "base64-encoded சரம்",
		base64url: "base64url-encoded சரம்",
		json_string: "JSON சரம்",
		e164: "E.164 எண்",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "எண்",
		array: "அணி",
		null: "வெறுமை"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue.expected}, பெறப்பட்டது ${received}`;
				return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${stringifyPrimitive(issue.values[0])}`;
				return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${joinValues(issue.values, "|")} இல் ஒன்று`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
				return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ஆக இருக்க வேண்டும்`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
				return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ஆக இருக்க வேண்டும்`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
				if (_issue.format === "ends_with") return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
				if (_issue.format === "includes") return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
				if (_issue.format === "regex") return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
				return `தவறான ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `தவறான எண்: ${issue.divisor} இன் பலமாக இருக்க வேண்டும்`;
			case "unrecognized_keys": return `அடையாளம் தெரியாத விசை${issue.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `${issue.origin} இல் தவறான விசை`;
			case "invalid_union": return "தவறான உள்ளீடு";
			case "invalid_element": return `${issue.origin} இல் தவறான மதிப்பு`;
			default: return `தவறான உள்ளீடு`;
		}
	};
};
function ta_default() {
	return { localeError: error$9() };
}
var error$8 = () => {
	const Sizable = {
		string: {
			unit: "ตัวอักษร",
			verb: "ควรมี"
		},
		file: {
			unit: "ไบต์",
			verb: "ควรมี"
		},
		array: {
			unit: "รายการ",
			verb: "ควรมี"
		},
		set: {
			unit: "รายการ",
			verb: "ควรมี"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "ข้อมูลที่ป้อน",
		email: "ที่อยู่อีเมล",
		url: "URL",
		emoji: "อิโมจิ",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "วันที่เวลาแบบ ISO",
		date: "วันที่แบบ ISO",
		time: "เวลาแบบ ISO",
		duration: "ช่วงเวลาแบบ ISO",
		ipv4: "ที่อยู่ IPv4",
		ipv6: "ที่อยู่ IPv6",
		cidrv4: "ช่วง IP แบบ IPv4",
		cidrv6: "ช่วง IP แบบ IPv6",
		base64: "ข้อความแบบ Base64",
		base64url: "ข้อความแบบ Base64 สำหรับ URL",
		json_string: "ข้อความแบบ JSON",
		e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
		jwt: "โทเคน JWT",
		template_literal: "ข้อมูลที่ป้อน"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "ตัวเลข",
		array: "อาร์เรย์ (Array)",
		null: "ไม่มีค่า (null)"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue.expected} แต่ได้รับ ${received}`;
				return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `ค่าไม่ถูกต้อง: ควรเป็น ${stringifyPrimitive(issue.values[0])}`;
				return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "ไม่เกิน" : "น้อยกว่า";
				const sizing = getSizing(issue.origin);
				if (sizing) return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
				return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? "อย่างน้อย" : "มากกว่า";
				const sizing = getSizing(issue.origin);
				if (sizing) return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()} ${sizing.unit}`;
				return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
				if (_issue.format === "includes") return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
				if (_issue.format === "regex") return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
				return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue.divisor} ได้ลงตัว`;
			case "unrecognized_keys": return `พบคีย์ที่ไม่รู้จัก: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `คีย์ไม่ถูกต้องใน ${issue.origin}`;
			case "invalid_union": return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
			case "invalid_element": return `ข้อมูลไม่ถูกต้องใน ${issue.origin}`;
			default: return `ข้อมูลไม่ถูกต้อง`;
		}
	};
};
function th_default() {
	return { localeError: error$8() };
}
var error$7 = () => {
	const Sizable = {
		string: {
			unit: "karakter",
			verb: "olmalı"
		},
		file: {
			unit: "bayt",
			verb: "olmalı"
		},
		array: {
			unit: "öğe",
			verb: "olmalı"
		},
		set: {
			unit: "öğe",
			verb: "olmalı"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "girdi",
		email: "e-posta adresi",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO tarih ve saat",
		date: "ISO tarih",
		time: "ISO saat",
		duration: "ISO süre",
		ipv4: "IPv4 adresi",
		ipv6: "IPv6 adresi",
		cidrv4: "IPv4 aralığı",
		cidrv6: "IPv6 aralığı",
		base64: "base64 ile şifrelenmiş metin",
		base64url: "base64url ile şifrelenmiş metin",
		json_string: "JSON dizesi",
		e164: "E.164 sayısı",
		jwt: "JWT",
		template_literal: "Şablon dizesi"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Geçersiz değer: beklenen instanceof ${issue.expected}, alınan ${received}`;
				return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Geçersiz değer: beklenen ${stringifyPrimitive(issue.values[0])}`;
				return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "öğe"}`;
				return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
				if (_issue.format === "ends_with") return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
				if (_issue.format === "includes") return `Geçersiz metin: "${_issue.includes}" içermeli`;
				if (_issue.format === "regex") return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
				return `Geçersiz ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Geçersiz sayı: ${issue.divisor} ile tam bölünebilmeli`;
			case "unrecognized_keys": return `Tanınmayan anahtar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `${issue.origin} içinde geçersiz anahtar`;
			case "invalid_union": return "Geçersiz değer";
			case "invalid_element": return `${issue.origin} içinde geçersiz değer`;
			default: return `Geçersiz değer`;
		}
	};
};
function tr_default() {
	return { localeError: error$7() };
}
var error$6 = () => {
	const Sizable = {
		string: {
			unit: "символів",
			verb: "матиме"
		},
		file: {
			unit: "байтів",
			verb: "матиме"
		},
		array: {
			unit: "елементів",
			verb: "матиме"
		},
		set: {
			unit: "елементів",
			verb: "матиме"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "вхідні дані",
		email: "адреса електронної пошти",
		url: "URL",
		emoji: "емодзі",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "дата та час ISO",
		date: "дата ISO",
		time: "час ISO",
		duration: "тривалість ISO",
		ipv4: "адреса IPv4",
		ipv6: "адреса IPv6",
		cidrv4: "діапазон IPv4",
		cidrv6: "діапазон IPv6",
		base64: "рядок у кодуванні base64",
		base64url: "рядок у кодуванні base64url",
		json_string: "рядок JSON",
		e164: "номер E.164",
		jwt: "JWT",
		template_literal: "вхідні дані"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "число",
		array: "масив"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Неправильні вхідні дані: очікується instanceof ${issue.expected}, отримано ${received}`;
				return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Неправильні вхідні дані: очікується ${stringifyPrimitive(issue.values[0])}`;
				return `Неправильна опція: очікується одне з ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Занадто велике: очікується, що ${issue.origin ?? "значення"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементів"}`;
				return `Занадто велике: очікується, що ${issue.origin ?? "значення"} буде ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Занадто мале: очікується, що ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Занадто мале: очікується, що ${issue.origin} буде ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Неправильний рядок: повинен містити "${_issue.includes}"`;
				if (_issue.format === "regex") return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
				return `Неправильний ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Неправильне число: повинно бути кратним ${issue.divisor}`;
			case "unrecognized_keys": return `Нерозпізнаний ключ${issue.keys.length > 1 ? "і" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Неправильний ключ у ${issue.origin}`;
			case "invalid_union": return "Неправильні вхідні дані";
			case "invalid_element": return `Неправильне значення у ${issue.origin}`;
			default: return `Неправильні вхідні дані`;
		}
	};
};
function uk_default() {
	return { localeError: error$6() };
}
/** @deprecated Use `uk` instead. */
function ua_default() {
	return uk_default();
}
var error$5 = () => {
	const Sizable = {
		string: {
			unit: "حروف",
			verb: "ہونا"
		},
		file: {
			unit: "بائٹس",
			verb: "ہونا"
		},
		array: {
			unit: "آئٹمز",
			verb: "ہونا"
		},
		set: {
			unit: "آئٹمز",
			verb: "ہونا"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "ان پٹ",
		email: "ای میل ایڈریس",
		url: "یو آر ایل",
		emoji: "ایموجی",
		uuid: "یو یو آئی ڈی",
		uuidv4: "یو یو آئی ڈی وی 4",
		uuidv6: "یو یو آئی ڈی وی 6",
		nanoid: "نینو آئی ڈی",
		guid: "جی یو آئی ڈی",
		cuid: "سی یو آئی ڈی",
		cuid2: "سی یو آئی ڈی 2",
		ulid: "یو ایل آئی ڈی",
		xid: "ایکس آئی ڈی",
		ksuid: "کے ایس یو آئی ڈی",
		datetime: "آئی ایس او ڈیٹ ٹائم",
		date: "آئی ایس او تاریخ",
		time: "آئی ایس او وقت",
		duration: "آئی ایس او مدت",
		ipv4: "آئی پی وی 4 ایڈریس",
		ipv6: "آئی پی وی 6 ایڈریس",
		cidrv4: "آئی پی وی 4 رینج",
		cidrv6: "آئی پی وی 6 رینج",
		base64: "بیس 64 ان کوڈڈ سٹرنگ",
		base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
		json_string: "جے ایس او این سٹرنگ",
		e164: "ای 164 نمبر",
		jwt: "جے ڈبلیو ٹی",
		template_literal: "ان پٹ"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "نمبر",
		array: "آرے",
		null: "نل"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `غلط ان پٹ: instanceof ${issue.expected} متوقع تھا، ${received} موصول ہوا`;
				return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `غلط ان پٹ: ${stringifyPrimitive(issue.values[0])} متوقع تھا`;
				return `غلط آپشن: ${joinValues(issue.values, "|")} میں سے ایک متوقع تھا`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `بہت بڑا: ${issue.origin ?? "ویلیو"} کے ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
				return `بہت بڑا: ${issue.origin ?? "ویلیو"} کا ${adj}${issue.maximum.toString()} ہونا متوقع تھا`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `بہت چھوٹا: ${issue.origin} کے ${adj}${issue.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
				return `بہت چھوٹا: ${issue.origin} کا ${adj}${issue.minimum.toString()} ہونا متوقع تھا`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
				if (_issue.format === "ends_with") return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
				if (_issue.format === "includes") return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
				if (_issue.format === "regex") return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
				return `غلط ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `غلط نمبر: ${issue.divisor} کا مضاعف ہونا چاہیے`;
			case "unrecognized_keys": return `غیر تسلیم شدہ کی${issue.keys.length > 1 ? "ز" : ""}: ${joinValues(issue.keys, "، ")}`;
			case "invalid_key": return `${issue.origin} میں غلط کی`;
			case "invalid_union": return "غلط ان پٹ";
			case "invalid_element": return `${issue.origin} میں غلط ویلیو`;
			default: return `غلط ان پٹ`;
		}
	};
};
function ur_default() {
	return { localeError: error$5() };
}
var error$4 = () => {
	const Sizable = {
		string: {
			unit: "belgi",
			verb: "bo‘lishi kerak"
		},
		file: {
			unit: "bayt",
			verb: "bo‘lishi kerak"
		},
		array: {
			unit: "element",
			verb: "bo‘lishi kerak"
		},
		set: {
			unit: "element",
			verb: "bo‘lishi kerak"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "kirish",
		email: "elektron pochta manzili",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO sana va vaqti",
		date: "ISO sana",
		time: "ISO vaqt",
		duration: "ISO davomiylik",
		ipv4: "IPv4 manzil",
		ipv6: "IPv6 manzil",
		mac: "MAC manzil",
		cidrv4: "IPv4 diapazon",
		cidrv6: "IPv6 diapazon",
		base64: "base64 kodlangan satr",
		base64url: "base64url kodlangan satr",
		json_string: "JSON satr",
		e164: "E.164 raqam",
		jwt: "JWT",
		template_literal: "kirish"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "raqam",
		array: "massiv"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Noto‘g‘ri kirish: kutilgan instanceof ${issue.expected}, qabul qilingan ${received}`;
				return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Noto‘g‘ri kirish: kutilgan ${stringifyPrimitive(issue.values[0])}`;
				return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
				return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
				return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
				if (_issue.format === "ends_with") return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
				if (_issue.format === "includes") return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
				if (_issue.format === "regex") return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
				return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Noto‘g‘ri raqam: ${issue.divisor} ning karralisi bo‘lishi kerak`;
			case "unrecognized_keys": return `Noma’lum kalit${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `${issue.origin} dagi kalit noto‘g‘ri`;
			case "invalid_union": return "Noto‘g‘ri kirish";
			case "invalid_element": return `${issue.origin} da noto‘g‘ri qiymat`;
			default: return `Noto‘g‘ri kirish`;
		}
	};
};
function uz_default() {
	return { localeError: error$4() };
}
var error$3 = () => {
	const Sizable = {
		string: {
			unit: "ký tự",
			verb: "có"
		},
		file: {
			unit: "byte",
			verb: "có"
		},
		array: {
			unit: "phần tử",
			verb: "có"
		},
		set: {
			unit: "phần tử",
			verb: "có"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "đầu vào",
		email: "địa chỉ email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ngày giờ ISO",
		date: "ngày ISO",
		time: "giờ ISO",
		duration: "khoảng thời gian ISO",
		ipv4: "địa chỉ IPv4",
		ipv6: "địa chỉ IPv6",
		cidrv4: "dải IPv4",
		cidrv6: "dải IPv6",
		base64: "chuỗi mã hóa base64",
		base64url: "chuỗi mã hóa base64url",
		json_string: "chuỗi JSON",
		e164: "số E.164",
		jwt: "JWT",
		template_literal: "đầu vào"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "số",
		array: "mảng"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Đầu vào không hợp lệ: mong đợi instanceof ${issue.expected}, nhận được ${received}`;
				return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Đầu vào không hợp lệ: mong đợi ${stringifyPrimitive(issue.values[0])}`;
				return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
				return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Quá nhỏ: mong đợi ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Quá nhỏ: mong đợi ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
				if (_issue.format === "regex") return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
				return `${FormatDictionary[_issue.format] ?? issue.format} không hợp lệ`;
			}
			case "not_multiple_of": return `Số không hợp lệ: phải là bội số của ${issue.divisor}`;
			case "unrecognized_keys": return `Khóa không được nhận dạng: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Khóa không hợp lệ trong ${issue.origin}`;
			case "invalid_union": return "Đầu vào không hợp lệ";
			case "invalid_element": return `Giá trị không hợp lệ trong ${issue.origin}`;
			default: return `Đầu vào không hợp lệ`;
		}
	};
};
function vi_default() {
	return { localeError: error$3() };
}
var error$2 = () => {
	const Sizable = {
		string: {
			unit: "字符",
			verb: "包含"
		},
		file: {
			unit: "字节",
			verb: "包含"
		},
		array: {
			unit: "项",
			verb: "包含"
		},
		set: {
			unit: "项",
			verb: "包含"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "输入",
		email: "电子邮件",
		url: "URL",
		emoji: "表情符号",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO日期时间",
		date: "ISO日期",
		time: "ISO时间",
		duration: "ISO时长",
		ipv4: "IPv4地址",
		ipv6: "IPv6地址",
		cidrv4: "IPv4网段",
		cidrv6: "IPv6网段",
		base64: "base64编码字符串",
		base64url: "base64url编码字符串",
		json_string: "JSON字符串",
		e164: "E.164号码",
		jwt: "JWT",
		template_literal: "输入"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "数字",
		array: "数组",
		null: "空值(null)"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `无效输入：期望 instanceof ${issue.expected}，实际接收 ${received}`;
				return `无效输入：期望 ${expected}，实际接收 ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `无效输入：期望 ${stringifyPrimitive(issue.values[0])}`;
				return `无效选项：期望以下之一 ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "个元素"}`;
				return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `无效字符串：必须以 "${_issue.prefix}" 开头`;
				if (_issue.format === "ends_with") return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
				if (_issue.format === "includes") return `无效字符串：必须包含 "${_issue.includes}"`;
				if (_issue.format === "regex") return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
				return `无效${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `无效数字：必须是 ${issue.divisor} 的倍数`;
			case "unrecognized_keys": return `出现未知的键(key): ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `${issue.origin} 中的键(key)无效`;
			case "invalid_union": return "无效输入";
			case "invalid_element": return `${issue.origin} 中包含无效值(value)`;
			default: return `无效输入`;
		}
	};
};
function zh_CN_default() {
	return { localeError: error$2() };
}
var error$1 = () => {
	const Sizable = {
		string: {
			unit: "字元",
			verb: "擁有"
		},
		file: {
			unit: "位元組",
			verb: "擁有"
		},
		array: {
			unit: "項目",
			verb: "擁有"
		},
		set: {
			unit: "項目",
			verb: "擁有"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "輸入",
		email: "郵件地址",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO 日期時間",
		date: "ISO 日期",
		time: "ISO 時間",
		duration: "ISO 期間",
		ipv4: "IPv4 位址",
		ipv6: "IPv6 位址",
		cidrv4: "IPv4 範圍",
		cidrv6: "IPv6 範圍",
		base64: "base64 編碼字串",
		base64url: "base64url 編碼字串",
		json_string: "JSON 字串",
		e164: "E.164 數值",
		jwt: "JWT",
		template_literal: "輸入"
	};
	const TypeDictionary = { nan: "NaN" };
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `無效的輸入值：預期為 instanceof ${issue.expected}，但收到 ${received}`;
				return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `無效的輸入值：預期為 ${stringifyPrimitive(issue.values[0])}`;
				return `無效的選項：預期為以下其中之一 ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "個元素"}`;
				return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
				if (_issue.format === "ends_with") return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
				if (_issue.format === "includes") return `無效的字串：必須包含 "${_issue.includes}"`;
				if (_issue.format === "regex") return `無效的字串：必須符合格式 ${_issue.pattern}`;
				return `無效的 ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `無效的數字：必須為 ${issue.divisor} 的倍數`;
			case "unrecognized_keys": return `無法識別的鍵值${issue.keys.length > 1 ? "們" : ""}：${joinValues(issue.keys, "、")}`;
			case "invalid_key": return `${issue.origin} 中有無效的鍵值`;
			case "invalid_union": return "無效的輸入值";
			case "invalid_element": return `${issue.origin} 中有無效的值`;
			default: return `無效的輸入值`;
		}
	};
};
function zh_TW_default() {
	return { localeError: error$1() };
}
var error = () => {
	const Sizable = {
		string: {
			unit: "àmi",
			verb: "ní"
		},
		file: {
			unit: "bytes",
			verb: "ní"
		},
		array: {
			unit: "nkan",
			verb: "ní"
		},
		set: {
			unit: "nkan",
			verb: "ní"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "ẹ̀rọ ìbáwọlé",
		email: "àdírẹ́sì ìmẹ́lì",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "àkókò ISO",
		date: "ọjọ́ ISO",
		time: "àkókò ISO",
		duration: "àkókò tó pé ISO",
		ipv4: "àdírẹ́sì IPv4",
		ipv6: "àdírẹ́sì IPv6",
		cidrv4: "àgbègbè IPv4",
		cidrv6: "àgbègbè IPv6",
		base64: "ọ̀rọ̀ tí a kọ́ ní base64",
		base64url: "ọ̀rọ̀ base64url",
		json_string: "ọ̀rọ̀ JSON",
		e164: "nọ́mbà E.164",
		jwt: "JWT",
		template_literal: "ẹ̀rọ ìbáwọlé"
	};
	const TypeDictionary = {
		nan: "NaN",
		number: "nọ́mbà",
		array: "akopọ"
	};
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": {
				const expected = TypeDictionary[issue.expected] ?? issue.expected;
				const receivedType = parsedType(issue.input);
				const received = TypeDictionary[receivedType] ?? receivedType;
				if (/^[A-Z]/.test(issue.expected)) return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue.expected}, àmọ̀ a rí ${received}`;
				return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
			}
			case "invalid_value":
				if (issue.values.length === 1) return `Ìbáwọlé aṣìṣe: a ní láti fi ${stringifyPrimitive(issue.values[0])}`;
				return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue.origin ?? "iye"} ${sizing.verb} ${adj}${issue.maximum} ${sizing.unit}`;
				return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue.maximum}`;
			}
			case "too_small": {
				const adj = issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Kéré ju: a ní láti jẹ́ pé ${issue.origin} ${sizing.verb} ${adj}${issue.minimum} ${sizing.unit}`;
				return `Kéré ju: a ní láti jẹ́ ${adj}${issue.minimum}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
				if (_issue.format === "regex") return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
				return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue.divisor}`;
			case "unrecognized_keys": return `Bọtìnì àìmọ̀: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Bọtìnì aṣìṣe nínú ${issue.origin}`;
			case "invalid_union": return "Ìbáwọlé aṣìṣe";
			case "invalid_element": return `Iye aṣìṣe nínú ${issue.origin}`;
			default: return "Ìbáwọlé aṣìṣe";
		}
	};
};
function yo_default() {
	return { localeError: error() };
}
var locales_exports = /* @__PURE__ */ __exportAll({
	ar: () => ar_default,
	az: () => az_default,
	be: () => be_default,
	bg: () => bg_default,
	ca: () => ca_default,
	cs: () => cs_default,
	da: () => da_default,
	de: () => de_default,
	en: () => en_default,
	eo: () => eo_default,
	es: () => es_default,
	fa: () => fa_default,
	fi: () => fi_default,
	fr: () => fr_default,
	frCA: () => fr_CA_default,
	he: () => he_default,
	hu: () => hu_default,
	hy: () => hy_default,
	id: () => id_default,
	is: () => is_default,
	it: () => it_default,
	ja: () => ja_default,
	ka: () => ka_default,
	kh: () => kh_default,
	km: () => km_default,
	ko: () => ko_default,
	lt: () => lt_default,
	mk: () => mk_default,
	ms: () => ms_default,
	nl: () => nl_default,
	no: () => no_default,
	ota: () => ota_default,
	pl: () => pl_default,
	ps: () => ps_default,
	pt: () => pt_default,
	ru: () => ru_default,
	sl: () => sl_default,
	sv: () => sv_default,
	ta: () => ta_default,
	th: () => th_default,
	tr: () => tr_default,
	ua: () => ua_default,
	uk: () => uk_default,
	ur: () => ur_default,
	uz: () => uz_default,
	vi: () => vi_default,
	yo: () => yo_default,
	zhCN: () => zh_CN_default,
	zhTW: () => zh_TW_default
});
var _a$2;
const $output = Symbol("ZodOutput");
const $input = Symbol("ZodInput");
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema)
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a$2 = globalThis).__zod_globalRegistry ?? (_a$2.__zod_globalRegistry = registry());
const globalRegistry = globalThis.__zod_globalRegistry;
/* @__NO_SIDE_EFFECTS__ */
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _coercedString(Class, params) {
	return new Class({
		type: "string",
		coerce: true,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _mac(Class, params) {
	return new Class({
		type: "string",
		format: "mac",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
const TimePrecision = {
	Any: null,
	Minute: -1,
	Second: 0,
	Millisecond: 3,
	Microsecond: 6
};
/* @__NO_SIDE_EFFECTS__ */
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _number(Class, params) {
	return new Class({
		type: "number",
		checks: [],
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _coercedNumber(Class, params) {
	return new Class({
		type: "number",
		coerce: true,
		checks: [],
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _float32(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "float32",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _float64(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "float64",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _int32(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "int32",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uint32(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "uint32",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _coercedBoolean(Class, params) {
	return new Class({
		type: "boolean",
		coerce: true,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _bigint(Class, params) {
	return new Class({
		type: "bigint",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _coercedBigint(Class, params) {
	return new Class({
		type: "bigint",
		coerce: true,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _int64(Class, params) {
	return new Class({
		type: "bigint",
		check: "bigint_format",
		abort: false,
		format: "int64",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uint64(Class, params) {
	return new Class({
		type: "bigint",
		check: "bigint_format",
		abort: false,
		format: "uint64",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _symbol(Class, params) {
	return new Class({
		type: "symbol",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _undefined$1(Class, params) {
	return new Class({
		type: "undefined",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _null$1(Class, params) {
	return new Class({
		type: "null",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _any(Class) {
	return new Class({ type: "any" });
}
/* @__NO_SIDE_EFFECTS__ */
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
/* @__NO_SIDE_EFFECTS__ */
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _void$1(Class, params) {
	return new Class({
		type: "void",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _date(Class, params) {
	return new Class({
		type: "date",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _coercedDate(Class, params) {
	return new Class({
		type: "date",
		coerce: true,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _nan(Class, params) {
	return new Class({
		type: "nan",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _positive(params) {
	return /* @__PURE__ */ _gt(0, params);
}
/* @__NO_SIDE_EFFECTS__ */
function _negative(params) {
	return /* @__PURE__ */ _lt(0, params);
}
/* @__NO_SIDE_EFFECTS__ */
function _nonpositive(params) {
	return /* @__PURE__ */ _lte(0, params);
}
/* @__NO_SIDE_EFFECTS__ */
function _nonnegative(params) {
	return /* @__PURE__ */ _gte(0, params);
}
/* @__NO_SIDE_EFFECTS__ */
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _maxSize(maximum, params) {
	return new $ZodCheckMaxSize({
		check: "max_size",
		...normalizeParams(params),
		maximum
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _minSize(minimum, params) {
	return new $ZodCheckMinSize({
		check: "min_size",
		...normalizeParams(params),
		minimum
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _size(size, params) {
	return new $ZodCheckSizeEquals({
		check: "size_equals",
		...normalizeParams(params),
		size
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _property(property, schema, params) {
	return new $ZodCheckProperty({
		check: "property",
		property,
		schema,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _mime(types, params) {
	return new $ZodCheckMimeType({
		check: "mime_type",
		mime: types,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
/* @__NO_SIDE_EFFECTS__ */
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
/* @__NO_SIDE_EFFECTS__ */
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
/* @__NO_SIDE_EFFECTS__ */
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
/* @__NO_SIDE_EFFECTS__ */
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
/* @__NO_SIDE_EFFECTS__ */
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _union(Class, options, params) {
	return new Class({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
function _xor(Class, options, params) {
	return new Class({
		type: "union",
		options,
		inclusive: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _discriminatedUnion(Class, discriminator, options, params) {
	return new Class({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _intersection(Class, left, right) {
	return new Class({
		type: "intersection",
		left,
		right
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _tuple(Class, items, _paramsOrRest, _params) {
	const hasRest = _paramsOrRest instanceof $ZodType;
	return new Class({
		type: "tuple",
		items,
		rest: hasRest ? _paramsOrRest : null,
		...normalizeParams(hasRest ? _params : _paramsOrRest)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _record(Class, keyType, valueType, params) {
	return new Class({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _map(Class, keyType, valueType, params) {
	return new Class({
		type: "map",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _set(Class, valueType, params) {
	return new Class({
		type: "set",
		valueType,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _enum$1(Class, values, params) {
	return new Class({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
*
* ```ts
* enum Colors { red, green, blue }
* z.enum(Colors);
* ```
*/
/* @__NO_SIDE_EFFECTS__ */
function _nativeEnum(Class, entries, params) {
	return new Class({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _literal(Class, value, params) {
	return new Class({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _file(Class, params) {
	return new Class({
		type: "file",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _transform(Class, fn) {
	return new Class({
		type: "transform",
		transform: fn
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _optional(Class, innerType) {
	return new Class({
		type: "optional",
		innerType
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _nullable(Class, innerType) {
	return new Class({
		type: "nullable",
		innerType
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _default$1(Class, innerType, defaultValue) {
	return new Class({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _nonoptional(Class, innerType, params) {
	return new Class({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _success(Class, innerType) {
	return new Class({
		type: "success",
		innerType
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _catch$1(Class, innerType, catchValue) {
	return new Class({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _pipe(Class, in_, out) {
	return new Class({
		type: "pipe",
		in: in_,
		out
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _readonly(Class, innerType) {
	return new Class({
		type: "readonly",
		innerType
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _templateLiteral(Class, parts, params) {
	return new Class({
		type: "template_literal",
		parts,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _lazy(Class, getter) {
	return new Class({
		type: "lazy",
		getter
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _promise(Class, innerType) {
	return new Class({
		type: "promise",
		innerType
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _custom(Class, fn, _params) {
	const norm = normalizeParams(_params);
	norm.abort ?? (norm.abort = true);
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...norm
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _superRefine(fn) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	});
	return ch;
}
/* @__NO_SIDE_EFFECTS__ */
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
/* @__NO_SIDE_EFFECTS__ */
function describe$1(description) {
	const ch = new $ZodCheck({ check: "describe" });
	ch._zod.onattach = [(inst) => {
		const existing = globalRegistry.get(inst) ?? {};
		globalRegistry.add(inst, {
			...existing,
			description
		});
	}];
	ch._zod.check = () => {};
	return ch;
}
/* @__NO_SIDE_EFFECTS__ */
function meta$1(metadata) {
	const ch = new $ZodCheck({ check: "meta" });
	ch._zod.onattach = [(inst) => {
		const existing = globalRegistry.get(inst) ?? {};
		globalRegistry.add(inst, {
			...existing,
			...metadata
		});
	}];
	ch._zod.check = () => {};
	return ch;
}
/* @__NO_SIDE_EFFECTS__ */
function _stringbool(Classes, _params) {
	const params = normalizeParams(_params);
	let truthyArray = params.truthy ?? [
		"true",
		"1",
		"yes",
		"on",
		"y",
		"enabled"
	];
	let falsyArray = params.falsy ?? [
		"false",
		"0",
		"no",
		"off",
		"n",
		"disabled"
	];
	if (params.case !== "sensitive") {
		truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
		falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
	}
	const truthySet = new Set(truthyArray);
	const falsySet = new Set(falsyArray);
	const _Codec = Classes.Codec ?? $ZodCodec;
	const _Boolean = Classes.Boolean ?? $ZodBoolean;
	const codec = new _Codec({
		type: "pipe",
		in: new (Classes.String ?? $ZodString)({
			type: "string",
			error: params.error
		}),
		out: new _Boolean({
			type: "boolean",
			error: params.error
		}),
		transform: ((input, payload) => {
			let data = input;
			if (params.case !== "sensitive") data = data.toLowerCase();
			if (truthySet.has(data)) return true;
			else if (falsySet.has(data)) return false;
			else {
				payload.issues.push({
					code: "invalid_value",
					expected: "stringbool",
					values: [...truthySet, ...falsySet],
					input: payload.value,
					inst: codec,
					continue: false
				});
				return {};
			}
		}),
		reverseTransform: ((input, _payload) => {
			if (input === true) return truthyArray[0] || "true";
			else return falsyArray[0] || "false";
		}),
		error: params.error
	});
	return codec;
}
/* @__NO_SIDE_EFFECTS__ */
function _stringFormat(Class, format, fnOrRegex, _params = {}) {
	const params = normalizeParams(_params);
	const def = {
		...normalizeParams(_params),
		check: "string_format",
		type: "string",
		format,
		fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
		...params
	};
	if (fnOrRegex instanceof RegExp) def.pattern = fnOrRegex;
	return new Class(def);
}
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		external: params?.external ?? void 0
	};
}
function process$1(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			process$1(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) Object.assign(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && result.schema._prefault) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
			};
		}
		if (entry[1] === root) return { ref: "#" };
		const defUriPrefix = `#/${defsSegment}/`;
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + defId
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") {
				extractToDef(entry);
				continue;
			}
		}
	}
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else Object.assign(schema, refSchema);
			Object.assign(schema, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? []
		});
	};
	for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	Object.assign(result, root.def ?? root.schema);
	const defs = ctx.external?.defs ?? {};
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) defs[seen.defId] = seen.def;
	}
	if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
	else result.definitions = defs;
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
/**
* Creates a toJSONSchema method for a schema instance.
* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
*/
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	process$1(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
var formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
const stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time") delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const regexes = [...patterns];
		if (regexes.length === 1) json.pattern = regexes[0].source;
		else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: regex.source
		}))];
	}
};
const numberProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
	if (typeof format === "string" && format.includes("int")) json.type = "integer";
	else json.type = "number";
	if (typeof exclusiveMinimum === "number") if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
		json.minimum = exclusiveMinimum;
		json.exclusiveMinimum = true;
	} else json.exclusiveMinimum = exclusiveMinimum;
	if (typeof minimum === "number") {
		json.minimum = minimum;
		if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") if (exclusiveMinimum >= minimum) delete json.minimum;
		else delete json.exclusiveMinimum;
	}
	if (typeof exclusiveMaximum === "number") if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
		json.maximum = exclusiveMaximum;
		json.exclusiveMaximum = true;
	} else json.exclusiveMaximum = exclusiveMaximum;
	if (typeof maximum === "number") {
		json.maximum = maximum;
		if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") if (exclusiveMaximum <= maximum) delete json.maximum;
		else delete json.exclusiveMaximum;
	}
	if (typeof multipleOf === "number") json.multipleOf = multipleOf;
};
const booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
const bigintProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("BigInt cannot be represented in JSON Schema");
};
const symbolProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Symbols cannot be represented in JSON Schema");
};
const nullProcessor = (_schema, ctx, json, _params) => {
	if (ctx.target === "openapi-3.0") {
		json.type = "string";
		json.nullable = true;
		json.enum = [null];
	} else json.type = "null";
};
const undefinedProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
};
const voidProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
};
const neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
const anyProcessor = (_schema, _ctx, _json, _params) => {};
const unknownProcessor = (_schema, _ctx, _json, _params) => {};
const dateProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Date cannot be represented in JSON Schema");
};
const enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
const literalProcessor = (schema, ctx, json, _params) => {
	const def = schema._zod.def;
	const vals = [];
	for (const val of def.values) if (val === void 0) {
		if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
	else vals.push(Number(val));
	else vals.push(val);
	if (vals.length === 0) {} else if (vals.length === 1) {
		const val = vals[0];
		json.type = val === null ? "null" : typeof val;
		if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
		else json.const = val;
	} else {
		if (vals.every((v) => typeof v === "number")) json.type = "number";
		if (vals.every((v) => typeof v === "string")) json.type = "string";
		if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
		if (vals.every((v) => v === null)) json.type = "null";
		json.enum = vals;
	}
};
const nanProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("NaN cannot be represented in JSON Schema");
};
const templateLiteralProcessor = (schema, _ctx, json, _params) => {
	const _json = json;
	const pattern = schema._zod.pattern;
	if (!pattern) throw new Error("Pattern not found in template literal");
	_json.type = "string";
	_json.pattern = pattern.source;
};
const fileProcessor = (schema, _ctx, json, _params) => {
	const _json = json;
	const file = {
		type: "string",
		format: "binary",
		contentEncoding: "binary"
	};
	const { minimum, maximum, mime } = schema._zod.bag;
	if (minimum !== void 0) file.minLength = minimum;
	if (maximum !== void 0) file.maxLength = maximum;
	if (mime) if (mime.length === 1) {
		file.contentMediaType = mime[0];
		Object.assign(_json, file);
	} else {
		Object.assign(_json, file);
		_json.anyOf = mime.map((m) => ({ contentMediaType: m }));
	}
	else Object.assign(_json, file);
};
const successProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
const customProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
const functionProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Function types cannot be represented in JSON Schema");
};
const transformProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
const mapProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Map cannot be represented in JSON Schema");
};
const setProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Set cannot be represented in JSON Schema");
};
const arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = process$1(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
const objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	json.properties = {};
	const shape = def.shape;
	for (const key in shape) json.properties[key] = process$1(shape[key], ctx, {
		...params,
		path: [
			...params.path,
			"properties",
			key
		]
	});
	const allKeys = new Set(Object.keys(shape));
	const requiredKeys = new Set([...allKeys].filter((key) => {
		const v = def.shape[key]._zod;
		if (ctx.io === "input") return v.optin === void 0;
		else return v.optout === void 0;
	}));
	if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall) json.additionalProperties = process$1(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
const unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => process$1(x, ctx, {
		...params,
		path: [
			...params.path,
			isExclusive ? "oneOf" : "anyOf",
			i
		]
	}));
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
const intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = process$1(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = process$1(def.right, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			1
		]
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
};
const tupleProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "array";
	const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
	const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
	const prefixItems = def.items.map((x, i) => process$1(x, ctx, {
		...params,
		path: [
			...params.path,
			prefixPath,
			i
		]
	}));
	const rest = def.rest ? process$1(def.rest, ctx, {
		...params,
		path: [
			...params.path,
			restPath,
			...ctx.target === "openapi-3.0" ? [def.items.length] : []
		]
	}) : null;
	if (ctx.target === "draft-2020-12") {
		json.prefixItems = prefixItems;
		if (rest) json.items = rest;
	} else if (ctx.target === "openapi-3.0") {
		json.items = { anyOf: prefixItems };
		if (rest) json.items.anyOf.push(rest);
		json.minItems = prefixItems.length;
		if (!rest) json.maxItems = prefixItems.length;
	} else {
		json.items = prefixItems;
		if (rest) json.additionalItems = rest;
	}
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
};
const recordProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	const keyType = def.keyType;
	const patterns = keyType._zod.bag?.patterns;
	if (def.mode === "loose" && patterns && patterns.size > 0) {
		const valueSchema = process$1(def.valueType, ctx, {
			...params,
			path: [
				...params.path,
				"patternProperties",
				"*"
			]
		});
		json.patternProperties = {};
		for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
	} else {
		if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process$1(def.keyType, ctx, {
			...params,
			path: [...params.path, "propertyNames"]
		});
		json.additionalProperties = process$1(def.valueType, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	}
	const keyValues = keyType._zod.values;
	if (keyValues) {
		const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
		if (validKeyValues.length > 0) json.required = validKeyValues;
	}
};
const nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
const prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
const catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		throw new Error("Dynamic catch values are not supported in JSON Schema");
	}
	json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
	process$1(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
const promiseProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process$1(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const lazyProcessor = (schema, ctx, _json, params) => {
	const innerType = schema._zod.innerType;
	process$1(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
const allProcessors = {
	string: stringProcessor,
	number: numberProcessor,
	boolean: booleanProcessor,
	bigint: bigintProcessor,
	symbol: symbolProcessor,
	null: nullProcessor,
	undefined: undefinedProcessor,
	void: voidProcessor,
	never: neverProcessor,
	any: anyProcessor,
	unknown: unknownProcessor,
	date: dateProcessor,
	enum: enumProcessor,
	literal: literalProcessor,
	nan: nanProcessor,
	template_literal: templateLiteralProcessor,
	file: fileProcessor,
	success: successProcessor,
	custom: customProcessor,
	function: functionProcessor,
	transform: transformProcessor,
	map: mapProcessor,
	set: setProcessor,
	array: arrayProcessor,
	object: objectProcessor,
	union: unionProcessor,
	intersection: intersectionProcessor,
	tuple: tupleProcessor,
	record: recordProcessor,
	nullable: nullableProcessor,
	nonoptional: nonoptionalProcessor,
	default: defaultProcessor,
	prefault: prefaultProcessor,
	catch: catchProcessor,
	pipe: pipeProcessor,
	readonly: readonlyProcessor,
	promise: promiseProcessor,
	optional: optionalProcessor,
	lazy: lazyProcessor
};
function toJSONSchema(input, params) {
	if ("_idmap" in input) {
		const registry = input;
		const ctx = initializeContext({
			...params,
			processors: allProcessors
		});
		const defs = {};
		for (const entry of registry._idmap.entries()) {
			const [_, schema] = entry;
			process$1(schema, ctx);
		}
		const schemas = {};
		ctx.external = {
			registry,
			uri: params?.uri,
			defs
		};
		for (const entry of registry._idmap.entries()) {
			const [key, schema] = entry;
			extractDefs(ctx, schema);
			schemas[key] = finalize(ctx, schema);
		}
		if (Object.keys(defs).length > 0) schemas.__shared = { [ctx.target === "draft-2020-12" ? "$defs" : "definitions"]: defs };
		return { schemas };
	}
	const ctx = initializeContext({
		...params,
		processors: allProcessors
	});
	process$1(input, ctx);
	extractDefs(ctx, input);
	return finalize(ctx, input);
}
/**
* Legacy class-based interface for JSON Schema generation.
* This class wraps the new functional implementation to provide backward compatibility.
*
* @deprecated Use the `toJSONSchema` function instead for new code.
*
* @example
* ```typescript
* // Legacy usage (still supported)
* const gen = new JSONSchemaGenerator({ target: "draft-07" });
* gen.process(schema);
* const result = gen.emit(schema);
*
* // Preferred modern usage
* const result = toJSONSchema(schema, { target: "draft-07" });
* ```
*/
var JSONSchemaGenerator = class {
	/** @deprecated Access via ctx instead */
	get metadataRegistry() {
		return this.ctx.metadataRegistry;
	}
	/** @deprecated Access via ctx instead */
	get target() {
		return this.ctx.target;
	}
	/** @deprecated Access via ctx instead */
	get unrepresentable() {
		return this.ctx.unrepresentable;
	}
	/** @deprecated Access via ctx instead */
	get override() {
		return this.ctx.override;
	}
	/** @deprecated Access via ctx instead */
	get io() {
		return this.ctx.io;
	}
	/** @deprecated Access via ctx instead */
	get counter() {
		return this.ctx.counter;
	}
	set counter(value) {
		this.ctx.counter = value;
	}
	/** @deprecated Access via ctx instead */
	get seen() {
		return this.ctx.seen;
	}
	constructor(params) {
		let normalizedTarget = params?.target ?? "draft-2020-12";
		if (normalizedTarget === "draft-4") normalizedTarget = "draft-04";
		if (normalizedTarget === "draft-7") normalizedTarget = "draft-07";
		this.ctx = initializeContext({
			processors: allProcessors,
			target: normalizedTarget,
			...params?.metadata && { metadata: params.metadata },
			...params?.unrepresentable && { unrepresentable: params.unrepresentable },
			...params?.override && { override: params.override },
			...params?.io && { io: params.io }
		});
	}
	/**
	* Process a schema to prepare it for JSON Schema generation.
	* This must be called before emit().
	*/
	process(schema, _params = {
		path: [],
		schemaPath: []
	}) {
		return process$1(schema, this.ctx, _params);
	}
	/**
	* Emit the final JSON Schema after processing.
	* Must call process() first.
	*/
	emit(schema, _params) {
		if (_params) {
			if (_params.cycles) this.ctx.cycles = _params.cycles;
			if (_params.reused) this.ctx.reused = _params.reused;
			if (_params.external) this.ctx.external = _params.external;
		}
		extractDefs(this.ctx, schema);
		const { "~standard": _, ...plainResult } = finalize(this.ctx, schema);
		return plainResult;
	}
};
var json_schema_exports = /* @__PURE__ */ __exportAll({});
var core_exports = /* @__PURE__ */ __exportAll({
	$ZodAny: () => $ZodAny,
	$ZodArray: () => $ZodArray,
	$ZodAsyncError: () => $ZodAsyncError,
	$ZodBase64: () => $ZodBase64,
	$ZodBase64URL: () => $ZodBase64URL,
	$ZodBigInt: () => $ZodBigInt,
	$ZodBigIntFormat: () => $ZodBigIntFormat,
	$ZodBoolean: () => $ZodBoolean,
	$ZodCIDRv4: () => $ZodCIDRv4,
	$ZodCIDRv6: () => $ZodCIDRv6,
	$ZodCUID: () => $ZodCUID,
	$ZodCUID2: () => $ZodCUID2,
	$ZodCatch: () => $ZodCatch,
	$ZodCheck: () => $ZodCheck,
	$ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
	$ZodCheckEndsWith: () => $ZodCheckEndsWith,
	$ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
	$ZodCheckIncludes: () => $ZodCheckIncludes,
	$ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
	$ZodCheckLessThan: () => $ZodCheckLessThan,
	$ZodCheckLowerCase: () => $ZodCheckLowerCase,
	$ZodCheckMaxLength: () => $ZodCheckMaxLength,
	$ZodCheckMaxSize: () => $ZodCheckMaxSize,
	$ZodCheckMimeType: () => $ZodCheckMimeType,
	$ZodCheckMinLength: () => $ZodCheckMinLength,
	$ZodCheckMinSize: () => $ZodCheckMinSize,
	$ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
	$ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
	$ZodCheckOverwrite: () => $ZodCheckOverwrite,
	$ZodCheckProperty: () => $ZodCheckProperty,
	$ZodCheckRegex: () => $ZodCheckRegex,
	$ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
	$ZodCheckStartsWith: () => $ZodCheckStartsWith,
	$ZodCheckStringFormat: () => $ZodCheckStringFormat,
	$ZodCheckUpperCase: () => $ZodCheckUpperCase,
	$ZodCodec: () => $ZodCodec,
	$ZodCustom: () => $ZodCustom,
	$ZodCustomStringFormat: () => $ZodCustomStringFormat,
	$ZodDate: () => $ZodDate,
	$ZodDefault: () => $ZodDefault,
	$ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
	$ZodE164: () => $ZodE164,
	$ZodEmail: () => $ZodEmail,
	$ZodEmoji: () => $ZodEmoji,
	$ZodEncodeError: () => $ZodEncodeError,
	$ZodEnum: () => $ZodEnum,
	$ZodError: () => $ZodError,
	$ZodExactOptional: () => $ZodExactOptional,
	$ZodFile: () => $ZodFile,
	$ZodFunction: () => $ZodFunction,
	$ZodGUID: () => $ZodGUID,
	$ZodIPv4: () => $ZodIPv4,
	$ZodIPv6: () => $ZodIPv6,
	$ZodISODate: () => $ZodISODate,
	$ZodISODateTime: () => $ZodISODateTime,
	$ZodISODuration: () => $ZodISODuration,
	$ZodISOTime: () => $ZodISOTime,
	$ZodIntersection: () => $ZodIntersection,
	$ZodJWT: () => $ZodJWT,
	$ZodKSUID: () => $ZodKSUID,
	$ZodLazy: () => $ZodLazy,
	$ZodLiteral: () => $ZodLiteral,
	$ZodMAC: () => $ZodMAC,
	$ZodMap: () => $ZodMap,
	$ZodNaN: () => $ZodNaN,
	$ZodNanoID: () => $ZodNanoID,
	$ZodNever: () => $ZodNever,
	$ZodNonOptional: () => $ZodNonOptional,
	$ZodNull: () => $ZodNull,
	$ZodNullable: () => $ZodNullable,
	$ZodNumber: () => $ZodNumber,
	$ZodNumberFormat: () => $ZodNumberFormat,
	$ZodObject: () => $ZodObject,
	$ZodObjectJIT: () => $ZodObjectJIT,
	$ZodOptional: () => $ZodOptional,
	$ZodPipe: () => $ZodPipe,
	$ZodPrefault: () => $ZodPrefault,
	$ZodPromise: () => $ZodPromise,
	$ZodReadonly: () => $ZodReadonly,
	$ZodRealError: () => $ZodRealError,
	$ZodRecord: () => $ZodRecord,
	$ZodRegistry: () => $ZodRegistry,
	$ZodSet: () => $ZodSet,
	$ZodString: () => $ZodString,
	$ZodStringFormat: () => $ZodStringFormat,
	$ZodSuccess: () => $ZodSuccess,
	$ZodSymbol: () => $ZodSymbol,
	$ZodTemplateLiteral: () => $ZodTemplateLiteral,
	$ZodTransform: () => $ZodTransform,
	$ZodTuple: () => $ZodTuple,
	$ZodType: () => $ZodType,
	$ZodULID: () => $ZodULID,
	$ZodURL: () => $ZodURL,
	$ZodUUID: () => $ZodUUID,
	$ZodUndefined: () => $ZodUndefined,
	$ZodUnion: () => $ZodUnion,
	$ZodUnknown: () => $ZodUnknown,
	$ZodVoid: () => $ZodVoid,
	$ZodXID: () => $ZodXID,
	$ZodXor: () => $ZodXor,
	$brand: () => $brand,
	$constructor: () => $constructor,
	$input: () => $input,
	$output: () => $output,
	Doc: () => Doc,
	JSONSchema: () => json_schema_exports,
	JSONSchemaGenerator: () => JSONSchemaGenerator,
	NEVER: () => NEVER,
	TimePrecision: () => TimePrecision,
	_any: () => _any,
	_array: () => _array,
	_base64: () => _base64,
	_base64url: () => _base64url,
	_bigint: () => _bigint,
	_boolean: () => _boolean,
	_catch: () => _catch$1,
	_check: () => _check,
	_cidrv4: () => _cidrv4,
	_cidrv6: () => _cidrv6,
	_coercedBigint: () => _coercedBigint,
	_coercedBoolean: () => _coercedBoolean,
	_coercedDate: () => _coercedDate,
	_coercedNumber: () => _coercedNumber,
	_coercedString: () => _coercedString,
	_cuid: () => _cuid,
	_cuid2: () => _cuid2,
	_custom: () => _custom,
	_date: () => _date,
	_decode: () => _decode,
	_decodeAsync: () => _decodeAsync,
	_default: () => _default$1,
	_discriminatedUnion: () => _discriminatedUnion,
	_e164: () => _e164,
	_email: () => _email,
	_emoji: () => _emoji,
	_encode: () => _encode,
	_encodeAsync: () => _encodeAsync,
	_endsWith: () => _endsWith,
	_enum: () => _enum$1,
	_file: () => _file,
	_float32: () => _float32,
	_float64: () => _float64,
	_gt: () => _gt,
	_gte: () => _gte,
	_guid: () => _guid,
	_includes: () => _includes,
	_int: () => _int,
	_int32: () => _int32,
	_int64: () => _int64,
	_intersection: () => _intersection,
	_ipv4: () => _ipv4,
	_ipv6: () => _ipv6,
	_isoDate: () => _isoDate,
	_isoDateTime: () => _isoDateTime,
	_isoDuration: () => _isoDuration,
	_isoTime: () => _isoTime,
	_jwt: () => _jwt,
	_ksuid: () => _ksuid,
	_lazy: () => _lazy,
	_length: () => _length,
	_literal: () => _literal,
	_lowercase: () => _lowercase,
	_lt: () => _lt,
	_lte: () => _lte,
	_mac: () => _mac,
	_map: () => _map,
	_max: () => _lte,
	_maxLength: () => _maxLength,
	_maxSize: () => _maxSize,
	_mime: () => _mime,
	_min: () => _gte,
	_minLength: () => _minLength,
	_minSize: () => _minSize,
	_multipleOf: () => _multipleOf,
	_nan: () => _nan,
	_nanoid: () => _nanoid,
	_nativeEnum: () => _nativeEnum,
	_negative: () => _negative,
	_never: () => _never,
	_nonnegative: () => _nonnegative,
	_nonoptional: () => _nonoptional,
	_nonpositive: () => _nonpositive,
	_normalize: () => _normalize,
	_null: () => _null$1,
	_nullable: () => _nullable,
	_number: () => _number,
	_optional: () => _optional,
	_overwrite: () => _overwrite,
	_parse: () => _parse$1,
	_parseAsync: () => _parseAsync,
	_pipe: () => _pipe,
	_positive: () => _positive,
	_promise: () => _promise,
	_property: () => _property,
	_readonly: () => _readonly,
	_record: () => _record,
	_refine: () => _refine,
	_regex: () => _regex,
	_safeDecode: () => _safeDecode,
	_safeDecodeAsync: () => _safeDecodeAsync,
	_safeEncode: () => _safeEncode,
	_safeEncodeAsync: () => _safeEncodeAsync,
	_safeParse: () => _safeParse,
	_safeParseAsync: () => _safeParseAsync,
	_set: () => _set,
	_size: () => _size,
	_slugify: () => _slugify,
	_startsWith: () => _startsWith,
	_string: () => _string,
	_stringFormat: () => _stringFormat,
	_stringbool: () => _stringbool,
	_success: () => _success,
	_superRefine: () => _superRefine,
	_symbol: () => _symbol,
	_templateLiteral: () => _templateLiteral,
	_toLowerCase: () => _toLowerCase,
	_toUpperCase: () => _toUpperCase,
	_transform: () => _transform,
	_trim: () => _trim,
	_tuple: () => _tuple,
	_uint32: () => _uint32,
	_uint64: () => _uint64,
	_ulid: () => _ulid,
	_undefined: () => _undefined$1,
	_union: () => _union,
	_unknown: () => _unknown,
	_uppercase: () => _uppercase,
	_url: () => _url,
	_uuid: () => _uuid,
	_uuidv4: () => _uuidv4,
	_uuidv6: () => _uuidv6,
	_uuidv7: () => _uuidv7,
	_void: () => _void$1,
	_xid: () => _xid,
	_xor: () => _xor,
	clone: () => clone,
	config: () => config,
	createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
	createToJSONSchemaMethod: () => createToJSONSchemaMethod,
	decode: () => decode$1,
	decodeAsync: () => decodeAsync$1,
	describe: () => describe$1,
	encode: () => encode$1,
	encodeAsync: () => encodeAsync$1,
	extractDefs: () => extractDefs,
	finalize: () => finalize,
	flattenError: () => flattenError,
	formatError: () => formatError,
	globalConfig: () => globalConfig,
	globalRegistry: () => globalRegistry,
	initializeContext: () => initializeContext,
	isValidBase64: () => isValidBase64,
	isValidBase64URL: () => isValidBase64URL,
	isValidJWT: () => isValidJWT$1,
	locales: () => locales_exports,
	meta: () => meta$1,
	parse: () => parse$1,
	parseAsync: () => parseAsync$1,
	prettifyError: () => prettifyError,
	process: () => process$1,
	regexes: () => regexes_exports,
	registry: () => registry,
	safeDecode: () => safeDecode$1,
	safeDecodeAsync: () => safeDecodeAsync$1,
	safeEncode: () => safeEncode$1,
	safeEncodeAsync: () => safeEncodeAsync$1,
	safeParse: () => safeParse$1,
	safeParseAsync: () => safeParseAsync$1,
	toDotPath: () => toDotPath,
	toJSONSchema: () => toJSONSchema,
	treeifyError: () => treeifyError,
	util: () => util_exports,
	version: () => version
});
var checks_exports = /* @__PURE__ */ __exportAll({
	endsWith: () => _endsWith,
	gt: () => _gt,
	gte: () => _gte,
	includes: () => _includes,
	length: () => _length,
	lowercase: () => _lowercase,
	lt: () => _lt,
	lte: () => _lte,
	maxLength: () => _maxLength,
	maxSize: () => _maxSize,
	mime: () => _mime,
	minLength: () => _minLength,
	minSize: () => _minSize,
	multipleOf: () => _multipleOf,
	negative: () => _negative,
	nonnegative: () => _nonnegative,
	nonpositive: () => _nonpositive,
	normalize: () => _normalize,
	overwrite: () => _overwrite,
	positive: () => _positive,
	property: () => _property,
	regex: () => _regex,
	size: () => _size,
	slugify: () => _slugify,
	startsWith: () => _startsWith,
	toLowerCase: () => _toLowerCase,
	toUpperCase: () => _toUpperCase,
	trim: () => _trim,
	uppercase: () => _uppercase
});
var iso_exports = /* @__PURE__ */ __exportAll({
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	date: () => date$1,
	datetime: () => datetime,
	duration: () => duration,
	time: () => time
});
const ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date$1(params) {
	return /* @__PURE__ */ _isoDate(ZodISODate, params);
}
const ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return /* @__PURE__ */ _isoTime(ZodISOTime, params);
}
const ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
}
var initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: { value: (issue) => {
			inst.issues.push(issue);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		addIssues: { value: (issues) => {
			inst.issues.push(...issues);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		isEmpty: { get() {
			return inst.issues.length === 0;
		} }
	});
};
const ZodError$1 = $constructor("ZodError", initializer);
const ZodRealError = $constructor("ZodError", initializer, { Parent: Error });
const parse = /* @__PURE__ */ _parse$1(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
const encode = /* @__PURE__ */ _encode(ZodRealError);
const decode = /* @__PURE__ */ _decode(ZodRealError);
const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
var schemas_exports = /* @__PURE__ */ __exportAll({
	ZodAny: () => ZodAny$1,
	ZodArray: () => ZodArray$1,
	ZodBase64: () => ZodBase64,
	ZodBase64URL: () => ZodBase64URL,
	ZodBigInt: () => ZodBigInt$1,
	ZodBigIntFormat: () => ZodBigIntFormat,
	ZodBoolean: () => ZodBoolean$1,
	ZodCIDRv4: () => ZodCIDRv4,
	ZodCIDRv6: () => ZodCIDRv6,
	ZodCUID: () => ZodCUID,
	ZodCUID2: () => ZodCUID2,
	ZodCatch: () => ZodCatch$1,
	ZodCodec: () => ZodCodec,
	ZodCustom: () => ZodCustom,
	ZodCustomStringFormat: () => ZodCustomStringFormat,
	ZodDate: () => ZodDate$1,
	ZodDefault: () => ZodDefault$1,
	ZodDiscriminatedUnion: () => ZodDiscriminatedUnion$1,
	ZodE164: () => ZodE164,
	ZodEmail: () => ZodEmail,
	ZodEmoji: () => ZodEmoji,
	ZodEnum: () => ZodEnum$1,
	ZodExactOptional: () => ZodExactOptional,
	ZodFile: () => ZodFile,
	ZodFunction: () => ZodFunction$1,
	ZodGUID: () => ZodGUID,
	ZodIPv4: () => ZodIPv4,
	ZodIPv6: () => ZodIPv6,
	ZodIntersection: () => ZodIntersection$1,
	ZodJWT: () => ZodJWT,
	ZodKSUID: () => ZodKSUID,
	ZodLazy: () => ZodLazy$1,
	ZodLiteral: () => ZodLiteral$1,
	ZodMAC: () => ZodMAC,
	ZodMap: () => ZodMap$1,
	ZodNaN: () => ZodNaN$1,
	ZodNanoID: () => ZodNanoID,
	ZodNever: () => ZodNever$1,
	ZodNonOptional: () => ZodNonOptional,
	ZodNull: () => ZodNull$1,
	ZodNullable: () => ZodNullable$1,
	ZodNumber: () => ZodNumber$1,
	ZodNumberFormat: () => ZodNumberFormat,
	ZodObject: () => ZodObject$1,
	ZodOptional: () => ZodOptional$1,
	ZodPipe: () => ZodPipe,
	ZodPrefault: () => ZodPrefault,
	ZodPromise: () => ZodPromise$1,
	ZodReadonly: () => ZodReadonly$1,
	ZodRecord: () => ZodRecord$1,
	ZodSet: () => ZodSet$1,
	ZodString: () => ZodString$1,
	ZodStringFormat: () => ZodStringFormat,
	ZodSuccess: () => ZodSuccess,
	ZodSymbol: () => ZodSymbol$1,
	ZodTemplateLiteral: () => ZodTemplateLiteral,
	ZodTransform: () => ZodTransform,
	ZodTuple: () => ZodTuple$1,
	ZodType: () => ZodType$1,
	ZodULID: () => ZodULID,
	ZodURL: () => ZodURL,
	ZodUUID: () => ZodUUID,
	ZodUndefined: () => ZodUndefined$1,
	ZodUnion: () => ZodUnion$1,
	ZodUnknown: () => ZodUnknown$1,
	ZodVoid: () => ZodVoid$1,
	ZodXID: () => ZodXID,
	ZodXor: () => ZodXor,
	_ZodString: () => _ZodString,
	_default: () => _default,
	_function: () => _function,
	any: () => any,
	array: () => array,
	base64: () => base64,
	base64url: () => base64url,
	bigint: () => bigint,
	boolean: () => boolean,
	catch: () => _catch,
	check: () => check,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	codec: () => codec,
	cuid: () => cuid,
	cuid2: () => cuid2,
	custom: () => custom,
	date: () => date,
	describe: () => describe,
	discriminatedUnion: () => discriminatedUnion,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	enum: () => _enum,
	exactOptional: () => exactOptional,
	file: () => file,
	float32: () => float32,
	float64: () => float64,
	function: () => _function,
	guid: () => guid,
	hash: () => hash,
	hex: () => hex,
	hostname: () => hostname,
	httpUrl: () => httpUrl,
	instanceof: () => _instanceof,
	int: () => int,
	int32: () => int32,
	int64: () => int64,
	intersection: () => intersection,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	json: () => json,
	jwt: () => jwt,
	keyof: () => keyof,
	ksuid: () => ksuid,
	lazy: () => lazy,
	literal: () => literal,
	looseObject: () => looseObject,
	looseRecord: () => looseRecord,
	mac: () => mac,
	map: () => map,
	meta: () => meta,
	nan: () => nan,
	nanoid: () => nanoid,
	nativeEnum: () => nativeEnum,
	never: () => never,
	nonoptional: () => nonoptional,
	null: () => _null,
	nullable: () => nullable,
	nullish: () => nullish,
	number: () => number,
	object: () => object,
	optional: () => optional,
	partialRecord: () => partialRecord,
	pipe: () => pipe,
	prefault: () => prefault,
	preprocess: () => preprocess,
	promise: () => promise,
	readonly: () => readonly,
	record: () => record,
	refine: () => refine,
	set: () => set,
	strictObject: () => strictObject,
	string: () => string,
	stringFormat: () => stringFormat,
	stringbool: () => stringbool,
	success: () => success,
	superRefine: () => superRefine,
	symbol: () => symbol$2,
	templateLiteral: () => templateLiteral,
	transform: () => transform,
	tuple: () => tuple,
	uint32: () => uint32,
	uint64: () => uint64,
	ulid: () => ulid,
	undefined: () => _undefined,
	union: () => union,
	unknown: () => unknown,
	url: () => url,
	uuid: () => uuid,
	uuidv4: () => uuidv4,
	uuidv6: () => uuidv6,
	uuidv7: () => uuidv7,
	void: () => _void,
	xid: () => xid,
	xor: () => xor
});
const ZodType$1 = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	Object.assign(inst["~standard"], { jsonSchema: {
		input: createStandardJSONSchemaMethod(inst, "input"),
		output: createStandardJSONSchemaMethod(inst, "output")
	} });
	inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
	inst.def = def;
	inst.type = def.type;
	Object.defineProperty(inst, "_def", { value: def });
	inst.check = (...checks) => {
		return inst.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...checks.map((ch) => typeof ch === "function" ? { _zod: {
			check: ch,
			def: { check: "custom" },
			onattach: []
		} } : ch)] }), { parent: true });
	};
	inst.with = inst.check;
	inst.clone = (def, params) => clone(inst, def, params);
	inst.brand = () => inst;
	inst.register = ((reg, meta) => {
		reg.add(inst, meta);
		return inst;
	});
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.encode = (data, params) => encode(inst, data, params);
	inst.decode = (data, params) => decode(inst, data, params);
	inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
	inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
	inst.safeEncode = (data, params) => safeEncode(inst, data, params);
	inst.safeDecode = (data, params) => safeDecode(inst, data, params);
	inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
	inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
	inst.refine = (check, params) => inst.check(refine(check, params));
	inst.superRefine = (refinement) => inst.check(superRefine(refinement));
	inst.overwrite = (fn) => inst.check(/* @__PURE__ */ _overwrite(fn));
	inst.optional = () => optional(inst);
	inst.exactOptional = () => exactOptional(inst);
	inst.nullable = () => nullable(inst);
	inst.nullish = () => optional(nullable(inst));
	inst.nonoptional = (params) => nonoptional(inst, params);
	inst.array = () => array(inst);
	inst.or = (arg) => union([inst, arg]);
	inst.and = (arg) => intersection(inst, arg);
	inst.transform = (tx) => pipe(inst, transform(tx));
	inst.default = (def) => _default(inst, def);
	inst.prefault = (def) => prefault(inst, def);
	inst.catch = (params) => _catch(inst, params);
	inst.pipe = (target) => pipe(inst, target);
	inst.readonly = () => readonly(inst);
	inst.describe = (description) => {
		const cl = inst.clone();
		globalRegistry.add(cl, { description });
		return cl;
	};
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true
	});
	inst.meta = (...args) => {
		if (args.length === 0) return globalRegistry.get(inst);
		const cl = inst.clone();
		globalRegistry.add(cl, args[0]);
		return cl;
	};
	inst.isOptional = () => inst.safeParse(void 0).success;
	inst.isNullable = () => inst.safeParse(null).success;
	inst.apply = (fn) => fn(inst);
	return inst;
});
/** @internal */
const _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	inst.regex = (...args) => inst.check(/* @__PURE__ */ _regex(...args));
	inst.includes = (...args) => inst.check(/* @__PURE__ */ _includes(...args));
	inst.startsWith = (...args) => inst.check(/* @__PURE__ */ _startsWith(...args));
	inst.endsWith = (...args) => inst.check(/* @__PURE__ */ _endsWith(...args));
	inst.min = (...args) => inst.check(/* @__PURE__ */ _minLength(...args));
	inst.max = (...args) => inst.check(/* @__PURE__ */ _maxLength(...args));
	inst.length = (...args) => inst.check(/* @__PURE__ */ _length(...args));
	inst.nonempty = (...args) => inst.check(/* @__PURE__ */ _minLength(1, ...args));
	inst.lowercase = (params) => inst.check(/* @__PURE__ */ _lowercase(params));
	inst.uppercase = (params) => inst.check(/* @__PURE__ */ _uppercase(params));
	inst.trim = () => inst.check(/* @__PURE__ */ _trim());
	inst.normalize = (...args) => inst.check(/* @__PURE__ */ _normalize(...args));
	inst.toLowerCase = () => inst.check(/* @__PURE__ */ _toLowerCase());
	inst.toUpperCase = () => inst.check(/* @__PURE__ */ _toUpperCase());
	inst.slugify = () => inst.check(/* @__PURE__ */ _slugify());
});
const ZodString$1 = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
	inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
	inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date$1(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return /* @__PURE__ */ _string(ZodString$1, params);
}
const ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
const ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function email(params) {
	return /* @__PURE__ */ _email(ZodEmail, params);
}
const ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function guid(params) {
	return /* @__PURE__ */ _guid(ZodGUID, params);
}
const ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function uuid(params) {
	return /* @__PURE__ */ _uuid(ZodUUID, params);
}
function uuidv4(params) {
	return /* @__PURE__ */ _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
	return /* @__PURE__ */ _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
	return /* @__PURE__ */ _uuidv7(ZodUUID, params);
}
const ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function url(params) {
	return /* @__PURE__ */ _url(ZodURL, params);
}
function httpUrl(params) {
	return /* @__PURE__ */ _url(ZodURL, {
		protocol: /^https?$/,
		hostname: domain,
		...normalizeParams(params)
	});
}
const ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function emoji(params) {
	return /* @__PURE__ */ _emoji(ZodEmoji, params);
}
const ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function nanoid(params) {
	return /* @__PURE__ */ _nanoid(ZodNanoID, params);
}
const ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cuid(params) {
	return /* @__PURE__ */ _cuid(ZodCUID, params);
}
const ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cuid2(params) {
	return /* @__PURE__ */ _cuid2(ZodCUID2, params);
}
const ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ulid(params) {
	return /* @__PURE__ */ _ulid(ZodULID, params);
}
const ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function xid(params) {
	return /* @__PURE__ */ _xid(ZodXID, params);
}
const ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ksuid(params) {
	return /* @__PURE__ */ _ksuid(ZodKSUID, params);
}
const ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ipv4(params) {
	return /* @__PURE__ */ _ipv4(ZodIPv4, params);
}
const ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
	$ZodMAC.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function mac(params) {
	return /* @__PURE__ */ _mac(ZodMAC, params);
}
const ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ipv6(params) {
	return /* @__PURE__ */ _ipv6(ZodIPv6, params);
}
const ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
	return /* @__PURE__ */ _cidrv4(ZodCIDRv4, params);
}
const ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
	return /* @__PURE__ */ _cidrv6(ZodCIDRv6, params);
}
const ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function base64(params) {
	return /* @__PURE__ */ _base64(ZodBase64, params);
}
const ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function base64url(params) {
	return /* @__PURE__ */ _base64url(ZodBase64URL, params);
}
const ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function e164(params) {
	return /* @__PURE__ */ _e164(ZodE164, params);
}
const ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function jwt(params) {
	return /* @__PURE__ */ _jwt(ZodJWT, params);
}
const ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
	$ZodCustomStringFormat.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
	return /* @__PURE__ */ _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname(_params) {
	return /* @__PURE__ */ _stringFormat(ZodCustomStringFormat, "hostname", hostname$1, _params);
}
function hex(_params) {
	return /* @__PURE__ */ _stringFormat(ZodCustomStringFormat, "hex", hex$1, _params);
}
function hash(alg, params) {
	const format = `${alg}_${params?.enc ?? "hex"}`;
	const regex = regexes_exports[format];
	if (!regex) throw new Error(`Unrecognized hash format: ${format}`);
	return /* @__PURE__ */ _stringFormat(ZodCustomStringFormat, format, regex, params);
}
const ZodNumber$1 = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
	inst.gt = (value, params) => inst.check(/* @__PURE__ */ _gt(value, params));
	inst.gte = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.min = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.lt = (value, params) => inst.check(/* @__PURE__ */ _lt(value, params));
	inst.lte = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
	inst.max = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
	inst.int = (params) => inst.check(int(params));
	inst.safe = (params) => inst.check(int(params));
	inst.positive = (params) => inst.check(/* @__PURE__ */ _gt(0, params));
	inst.nonnegative = (params) => inst.check(/* @__PURE__ */ _gte(0, params));
	inst.negative = (params) => inst.check(/* @__PURE__ */ _lt(0, params));
	inst.nonpositive = (params) => inst.check(/* @__PURE__ */ _lte(0, params));
	inst.multipleOf = (value, params) => inst.check(/* @__PURE__ */ _multipleOf(value, params));
	inst.step = (value, params) => inst.check(/* @__PURE__ */ _multipleOf(value, params));
	inst.finite = () => inst;
	const bag = inst._zod.bag;
	inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number(params) {
	return /* @__PURE__ */ _number(ZodNumber$1, params);
}
const ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber$1.init(inst, def);
});
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
function float32(params) {
	return /* @__PURE__ */ _float32(ZodNumberFormat, params);
}
function float64(params) {
	return /* @__PURE__ */ _float64(ZodNumberFormat, params);
}
function int32(params) {
	return /* @__PURE__ */ _int32(ZodNumberFormat, params);
}
function uint32(params) {
	return /* @__PURE__ */ _uint32(ZodNumberFormat, params);
}
const ZodBoolean$1 = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean$1, params);
}
const ZodBigInt$1 = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
	$ZodBigInt.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => bigintProcessor(inst, ctx, json, params);
	inst.gte = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.min = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.gt = (value, params) => inst.check(/* @__PURE__ */ _gt(value, params));
	inst.gte = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.min = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.lt = (value, params) => inst.check(/* @__PURE__ */ _lt(value, params));
	inst.lte = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
	inst.max = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
	inst.positive = (params) => inst.check(/* @__PURE__ */ _gt(BigInt(0), params));
	inst.negative = (params) => inst.check(/* @__PURE__ */ _lt(BigInt(0), params));
	inst.nonpositive = (params) => inst.check(/* @__PURE__ */ _lte(BigInt(0), params));
	inst.nonnegative = (params) => inst.check(/* @__PURE__ */ _gte(BigInt(0), params));
	inst.multipleOf = (value, params) => inst.check(/* @__PURE__ */ _multipleOf(value, params));
	const bag = inst._zod.bag;
	inst.minValue = bag.minimum ?? null;
	inst.maxValue = bag.maximum ?? null;
	inst.format = bag.format ?? null;
});
function bigint(params) {
	return /* @__PURE__ */ _bigint(ZodBigInt$1, params);
}
const ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
	$ZodBigIntFormat.init(inst, def);
	ZodBigInt$1.init(inst, def);
});
function int64(params) {
	return /* @__PURE__ */ _int64(ZodBigIntFormat, params);
}
function uint64(params) {
	return /* @__PURE__ */ _uint64(ZodBigIntFormat, params);
}
const ZodSymbol$1 = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
	$ZodSymbol.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => symbolProcessor(inst, ctx, json, params);
});
function symbol$2(params) {
	return /* @__PURE__ */ _symbol(ZodSymbol$1, params);
}
const ZodUndefined$1 = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
	$ZodUndefined.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
});
function _undefined(params) {
	return /* @__PURE__ */ _undefined$1(ZodUndefined$1, params);
}
const ZodNull$1 = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
	$ZodNull.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null(params) {
	return /* @__PURE__ */ _null$1(ZodNull$1, params);
}
const ZodAny$1 = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
	$ZodAny.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => anyProcessor(inst, ctx, json, params);
});
function any() {
	return /* @__PURE__ */ _any(ZodAny$1);
}
const ZodUnknown$1 = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown$1);
}
const ZodNever$1 = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever$1, params);
}
const ZodVoid$1 = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
	$ZodVoid.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
});
function _void(params) {
	return /* @__PURE__ */ _void$1(ZodVoid$1, params);
}
const ZodDate$1 = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
	$ZodDate.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => dateProcessor(inst, ctx, json, params);
	inst.min = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.max = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
	const c = inst._zod.bag;
	inst.minDate = c.minimum ? new Date(c.minimum) : null;
	inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date(params) {
	return /* @__PURE__ */ _date(ZodDate$1, params);
}
const ZodArray$1 = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
	inst.min = (minLength, params) => inst.check(/* @__PURE__ */ _minLength(minLength, params));
	inst.nonempty = (params) => inst.check(/* @__PURE__ */ _minLength(1, params));
	inst.max = (maxLength, params) => inst.check(/* @__PURE__ */ _maxLength(maxLength, params));
	inst.length = (len, params) => inst.check(/* @__PURE__ */ _length(len, params));
	inst.unwrap = () => inst.element;
});
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray$1, element, params);
}
function keyof(schema) {
	const shape = schema._zod.def.shape;
	return _enum(Object.keys(shape));
}
const ZodObject$1 = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
	$ZodObjectJIT.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	defineLazy(inst, "shape", () => {
		return def.shape;
	});
	inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
	inst.catchall = (catchall) => inst.clone({
		...inst._zod.def,
		catchall
	});
	inst.passthrough = () => inst.clone({
		...inst._zod.def,
		catchall: unknown()
	});
	inst.loose = () => inst.clone({
		...inst._zod.def,
		catchall: unknown()
	});
	inst.strict = () => inst.clone({
		...inst._zod.def,
		catchall: never()
	});
	inst.strip = () => inst.clone({
		...inst._zod.def,
		catchall: void 0
	});
	inst.extend = (incoming) => {
		return extend(inst, incoming);
	};
	inst.safeExtend = (incoming) => {
		return safeExtend(inst, incoming);
	};
	inst.merge = (other) => merge(inst, other);
	inst.pick = (mask) => pick(inst, mask);
	inst.omit = (mask) => omit(inst, mask);
	inst.partial = (...args) => partial(ZodOptional$1, inst, args[0]);
	inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
	return new ZodObject$1({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	});
}
function strictObject(shape, params) {
	return new ZodObject$1({
		type: "object",
		shape,
		catchall: never(),
		...normalizeParams(params)
	});
}
function looseObject(shape, params) {
	return new ZodObject$1({
		type: "object",
		shape,
		catchall: unknown(),
		...normalizeParams(params)
	});
}
const ZodUnion$1 = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion$1({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
const ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
	ZodUnion$1.init(inst, def);
	$ZodXor.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
/** Creates an exclusive union (XOR) where exactly one option must match.
* Unlike regular unions that succeed when any option matches, xor fails if
* zero or more than one option matches the input. */
function xor(options, params) {
	return new ZodXor({
		type: "union",
		options,
		inclusive: false,
		...normalizeParams(params)
	});
}
const ZodDiscriminatedUnion$1 = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion$1.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion$1({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
const ZodIntersection$1 = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection$1({
		type: "intersection",
		left,
		right
	});
}
const ZodTuple$1 = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
	$ZodTuple.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => tupleProcessor(inst, ctx, json, params);
	inst.rest = (rest) => inst.clone({
		...inst._zod.def,
		rest
	});
});
function tuple(items, _paramsOrRest, _params) {
	const hasRest = _paramsOrRest instanceof $ZodType;
	return new ZodTuple$1({
		type: "tuple",
		items,
		rest: hasRest ? _paramsOrRest : null,
		...normalizeParams(hasRest ? _params : _paramsOrRest)
	});
}
const ZodRecord$1 = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	return new ZodRecord$1({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
function partialRecord(keyType, valueType, params) {
	const k = clone(keyType);
	k._zod.values = void 0;
	return new ZodRecord$1({
		type: "record",
		keyType: k,
		valueType,
		...normalizeParams(params)
	});
}
function looseRecord(keyType, valueType, params) {
	return new ZodRecord$1({
		type: "record",
		keyType,
		valueType,
		mode: "loose",
		...normalizeParams(params)
	});
}
const ZodMap$1 = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
	$ZodMap.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => mapProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
	inst.min = (...args) => inst.check(/* @__PURE__ */ _minSize(...args));
	inst.nonempty = (params) => inst.check(/* @__PURE__ */ _minSize(1, params));
	inst.max = (...args) => inst.check(/* @__PURE__ */ _maxSize(...args));
	inst.size = (...args) => inst.check(/* @__PURE__ */ _size(...args));
});
function map(keyType, valueType, params) {
	return new ZodMap$1({
		type: "map",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
const ZodSet$1 = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
	$ZodSet.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => setProcessor(inst, ctx, json, params);
	inst.min = (...args) => inst.check(/* @__PURE__ */ _minSize(...args));
	inst.nonempty = (params) => inst.check(/* @__PURE__ */ _minSize(1, params));
	inst.max = (...args) => inst.check(/* @__PURE__ */ _maxSize(...args));
	inst.size = (...args) => inst.check(/* @__PURE__ */ _size(...args));
});
function set(valueType, params) {
	return new ZodSet$1({
		type: "set",
		valueType,
		...normalizeParams(params)
	});
}
const ZodEnum$1 = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum$1({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum$1({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	return new ZodEnum$1({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
*
* ```ts
* enum Colors { red, green, blue }
* z.enum(Colors);
* ```
*/
function nativeEnum(entries, params) {
	return new ZodEnum$1({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
const ZodLiteral$1 = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal(value, params) {
	return new ZodLiteral$1({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
const ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
	$ZodFile.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => fileProcessor(inst, ctx, json, params);
	inst.min = (size, params) => inst.check(/* @__PURE__ */ _minSize(size, params));
	inst.max = (size, params) => inst.check(/* @__PURE__ */ _maxSize(size, params));
	inst.mime = (types, params) => inst.check(/* @__PURE__ */ _mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
	return /* @__PURE__ */ _file(ZodFile, params);
}
const ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			return payload;
		});
		payload.value = output;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
const ZodOptional$1 = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional$1({
		type: "optional",
		innerType
	});
}
const ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
const ZodNullable$1 = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable$1({
		type: "nullable",
		innerType
	});
}
function nullish(innerType) {
	return optional(nullable(innerType));
}
const ZodDefault$1 = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault$1({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
const ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
	$ZodSuccess.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => successProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
	return new ZodSuccess({
		type: "success",
		innerType
	});
}
const ZodCatch$1 = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch$1({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
const ZodNaN$1 = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
	$ZodNaN.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nanProcessor(inst, ctx, json, params);
});
function nan(params) {
	return /* @__PURE__ */ _nan(ZodNaN$1, params);
}
const ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
const ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
	ZodPipe.init(inst, def);
	$ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
	return new ZodCodec({
		type: "pipe",
		in: in_,
		out,
		transform: params.decode,
		reverseTransform: params.encode
	});
}
const ZodReadonly$1 = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly$1({
		type: "readonly",
		innerType
	});
}
const ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
	$ZodTemplateLiteral.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => templateLiteralProcessor(inst, ctx, json, params);
});
function templateLiteral(parts, params) {
	return new ZodTemplateLiteral({
		type: "template_literal",
		parts,
		...normalizeParams(params)
	});
}
const ZodLazy$1 = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
	$ZodLazy.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
	return new ZodLazy$1({
		type: "lazy",
		getter
	});
}
const ZodPromise$1 = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
	$ZodPromise.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => promiseProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
	return new ZodPromise$1({
		type: "promise",
		innerType
	});
}
const ZodFunction$1 = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
	$ZodFunction.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => functionProcessor(inst, ctx, json, params);
});
function _function(params) {
	return new ZodFunction$1({
		type: "function",
		input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
		output: params?.output ?? unknown()
	});
}
const ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType$1.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function check(fn) {
	const ch = new $ZodCheck({ check: "custom" });
	ch._zod.check = fn;
	return ch;
}
function custom(fn, _params) {
	return /* @__PURE__ */ _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
	return /* @__PURE__ */ _superRefine(fn);
}
const describe = describe$1;
const meta = meta$1;
function _instanceof(cls, params = {}) {
	const inst = new ZodCustom({
		type: "custom",
		check: "custom",
		fn: (data) => data instanceof cls,
		abort: true,
		...normalizeParams(params)
	});
	inst._zod.bag.Class = cls;
	inst._zod.check = (payload) => {
		if (!(payload.value instanceof cls)) payload.issues.push({
			code: "invalid_type",
			expected: cls.name,
			input: payload.value,
			inst,
			path: [...inst._zod.def.path ?? []]
		});
	};
	return inst;
}
const stringbool = (...args) => /* @__PURE__ */ _stringbool({
	Codec: ZodCodec,
	Boolean: ZodBoolean$1,
	String: ZodString$1
}, ...args);
function json(params) {
	const jsonSchema = lazy(() => {
		return union([
			string(params),
			number(),
			boolean(),
			_null(),
			array(jsonSchema),
			record(string(), jsonSchema)
		]);
	});
	return jsonSchema;
}
function preprocess(fn, schema) {
	return pipe(transform(fn), schema);
}
var marker$1 = "vercel.ai.error";
var symbol$1 = Symbol.for(marker$1);
var _a$1, _b$1;
var AISDKError = class _AISDKError extends (_b$1 = Error, _a$1 = symbol$1, _b$1) {
	/**
	* Creates an AI SDK Error.
	*
	* @param {Object} params - The parameters for creating the error.
	* @param {string} params.name - The name of the error.
	* @param {string} params.message - The error message.
	* @param {unknown} [params.cause] - The underlying cause of the error.
	*/
	constructor({ name: name14, message, cause }) {
		super(message);
		this[_a$1] = true;
		this.name = name14;
		this.cause = cause;
	}
	/**
	* Checks if the given error is an AI SDK Error.
	* @param {unknown} error - The error to check.
	* @returns {boolean} True if the error is an AI SDK Error, false otherwise.
	*/
	static isInstance(error) {
		return _AISDKError.hasMarker(error, marker$1);
	}
	static hasMarker(error, marker15) {
		const markerSymbol = Symbol.for(marker15);
		return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
	}
};
var name$1 = "AI_APICallError";
var marker2 = `vercel.ai.error.${name$1}`;
var symbol2 = Symbol.for(marker2);
var _a2, _b2;
var APICallError = class extends (_b2 = AISDKError, _a2 = symbol2, _b2) {
	constructor({ message, url, requestBodyValues, statusCode, responseHeaders, responseBody, cause, isRetryable = statusCode != null && (statusCode === 408 || statusCode === 409 || statusCode === 429 || statusCode >= 500), data }) {
		super({
			name: name$1,
			message,
			cause
		});
		this[_a2] = true;
		this.url = url;
		this.requestBodyValues = requestBodyValues;
		this.statusCode = statusCode;
		this.responseHeaders = responseHeaders;
		this.responseBody = responseBody;
		this.isRetryable = isRetryable;
		this.data = data;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker2);
	}
};
var name2 = "AI_EmptyResponseBodyError";
var marker3 = `vercel.ai.error.${name2}`;
var symbol3 = Symbol.for(marker3);
var _a3, _b3;
var EmptyResponseBodyError = class extends (_b3 = AISDKError, _a3 = symbol3, _b3) {
	constructor({ message = "Empty response body" } = {}) {
		super({
			name: name2,
			message
		});
		this[_a3] = true;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker3);
	}
};
function getErrorMessage$1(error) {
	if (error == null) return "unknown error";
	if (typeof error === "string") return error;
	if (error instanceof Error) return error.message;
	return JSON.stringify(error);
}
var name3 = "AI_InvalidArgumentError";
var marker4 = `vercel.ai.error.${name3}`;
var symbol4 = Symbol.for(marker4);
var _a4, _b4;
var InvalidArgumentError = class extends (_b4 = AISDKError, _a4 = symbol4, _b4) {
	constructor({ message, cause, argument }) {
		super({
			name: name3,
			message,
			cause
		});
		this[_a4] = true;
		this.argument = argument;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker4);
	}
};
var name4 = "AI_InvalidPromptError";
var marker5 = `vercel.ai.error.${name4}`;
var symbol5 = Symbol.for(marker5);
var _a5, _b5;
var InvalidPromptError = class extends (_b5 = AISDKError, _a5 = symbol5, _b5) {
	constructor({ prompt, message, cause }) {
		super({
			name: name4,
			message: `Invalid prompt: ${message}`,
			cause
		});
		this[_a5] = true;
		this.prompt = prompt;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker5);
	}
};
var name5 = "AI_InvalidResponseDataError";
var marker6 = `vercel.ai.error.${name5}`;
var symbol6 = Symbol.for(marker6);
var _a6, _b6;
var InvalidResponseDataError = class extends (_b6 = AISDKError, _a6 = symbol6, _b6) {
	constructor({ data, message = `Invalid response data: ${JSON.stringify(data)}.` }) {
		super({
			name: name5,
			message
		});
		this[_a6] = true;
		this.data = data;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker6);
	}
};
var name6 = "AI_JSONParseError";
var marker7 = `vercel.ai.error.${name6}`;
var symbol7 = Symbol.for(marker7);
var _a7, _b7;
var JSONParseError = class extends (_b7 = AISDKError, _a7 = symbol7, _b7) {
	constructor({ text, cause }) {
		super({
			name: name6,
			message: `JSON parsing failed: Text: ${text}.
Error message: ${getErrorMessage$1(cause)}`,
			cause
		});
		this[_a7] = true;
		this.text = text;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker7);
	}
};
var name7 = "AI_LoadAPIKeyError";
var marker8 = `vercel.ai.error.${name7}`;
var symbol8 = Symbol.for(marker8);
var _a8, _b8;
var LoadAPIKeyError = class extends (_b8 = AISDKError, _a8 = symbol8, _b8) {
	constructor({ message }) {
		super({
			name: name7,
			message
		});
		this[_a8] = true;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker8);
	}
};
var name10 = "AI_NoSuchModelError";
var marker11 = `vercel.ai.error.${name10}`;
var symbol11 = Symbol.for(marker11);
var _a11, _b11;
var NoSuchModelError = class extends (_b11 = AISDKError, _a11 = symbol11, _b11) {
	constructor({ errorName = name10, modelId, modelType, message = `No such ${modelType}: ${modelId}` }) {
		super({
			name: errorName,
			message
		});
		this[_a11] = true;
		this.modelId = modelId;
		this.modelType = modelType;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker11);
	}
};
var name11 = "AI_TooManyEmbeddingValuesForCallError";
var marker12 = `vercel.ai.error.${name11}`;
var symbol12 = Symbol.for(marker12);
var _a12, _b12;
var TooManyEmbeddingValuesForCallError = class extends (_b12 = AISDKError, _a12 = symbol12, _b12) {
	constructor(options) {
		super({
			name: name11,
			message: `Too many values for a single embedding call. The ${options.provider} model "${options.modelId}" can only embed up to ${options.maxEmbeddingsPerCall} values per call, but ${options.values.length} values were provided.`
		});
		this[_a12] = true;
		this.provider = options.provider;
		this.modelId = options.modelId;
		this.maxEmbeddingsPerCall = options.maxEmbeddingsPerCall;
		this.values = options.values;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker12);
	}
};
var name12 = "AI_TypeValidationError";
var marker13 = `vercel.ai.error.${name12}`;
var symbol13 = Symbol.for(marker13);
var _a13, _b13;
var TypeValidationError = class _TypeValidationError extends (_b13 = AISDKError, _a13 = symbol13, _b13) {
	constructor({ value, cause, context }) {
		let contextPrefix = "Type validation failed";
		if (context == null ? void 0 : context.field) contextPrefix += ` for ${context.field}`;
		if ((context == null ? void 0 : context.entityName) || (context == null ? void 0 : context.entityId)) {
			contextPrefix += " (";
			const parts = [];
			if (context.entityName) parts.push(context.entityName);
			if (context.entityId) parts.push(`id: "${context.entityId}"`);
			contextPrefix += parts.join(", ");
			contextPrefix += ")";
		}
		super({
			name: name12,
			message: `${contextPrefix}: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage$1(cause)}`,
			cause
		});
		this[_a13] = true;
		this.value = value;
		this.context = context;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker13);
	}
	/**
	* Wraps an error into a TypeValidationError.
	* If the cause is already a TypeValidationError with the same value and context, it returns the cause.
	* Otherwise, it creates a new TypeValidationError.
	*
	* @param {Object} params - The parameters for wrapping the error.
	* @param {unknown} params.value - The value that failed validation.
	* @param {unknown} params.cause - The original error or cause of the validation failure.
	* @param {TypeValidationContext} params.context - Optional context about what is being validated.
	* @returns {TypeValidationError} A TypeValidationError instance.
	*/
	static wrap({ value, cause, context }) {
		var _a15, _b15, _c;
		if (_TypeValidationError.isInstance(cause) && cause.value === value && ((_a15 = cause.context) == null ? void 0 : _a15.field) === (context == null ? void 0 : context.field) && ((_b15 = cause.context) == null ? void 0 : _b15.entityName) === (context == null ? void 0 : context.entityName) && ((_c = cause.context) == null ? void 0 : _c.entityId) === (context == null ? void 0 : context.entityId)) return cause;
		return new _TypeValidationError({
			value,
			cause,
			context
		});
	}
};
var name13 = "AI_UnsupportedFunctionalityError";
var marker14 = `vercel.ai.error.${name13}`;
var symbol14 = Symbol.for(marker14);
var _a14, _b14;
var UnsupportedFunctionalityError = class extends (_b14 = AISDKError, _a14 = symbol14, _b14) {
	constructor({ functionality, message = `'${functionality}' functionality not supported.` }) {
		super({
			name: name13,
			message
		});
		this[_a14] = true;
		this.functionality = functionality;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker14);
	}
};
var util;
(function(util) {
	util.assertEqual = (_) => {};
	function assertIs(_arg) {}
	util.assertIs = assertIs;
	function assertNever(_x) {
		throw new Error();
	}
	util.assertNever = assertNever;
	util.arrayToEnum = (items) => {
		const obj = {};
		for (const item of items) obj[item] = item;
		return obj;
	};
	util.getValidEnumValues = (obj) => {
		const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
		const filtered = {};
		for (const k of validKeys) filtered[k] = obj[k];
		return util.objectValues(filtered);
	};
	util.objectValues = (obj) => {
		return util.objectKeys(obj).map(function(e) {
			return obj[e];
		});
	};
	util.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
		const keys = [];
		for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
		return keys;
	};
	util.find = (arr, checker) => {
		for (const item of arr) if (checker(item)) return item;
	};
	util.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
	function joinValues(array, separator = " | ") {
		return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
	}
	util.joinValues = joinValues;
	util.jsonStringifyReplacer = (_, value) => {
		if (typeof value === "bigint") return value.toString();
		return value;
	};
})(util || (util = {}));
var objectUtil;
(function(objectUtil) {
	objectUtil.mergeShapes = (first, second) => {
		return {
			...first,
			...second
		};
	};
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]);
const getParsedType = (data) => {
	switch (typeof data) {
		case "undefined": return ZodParsedType.undefined;
		case "string": return ZodParsedType.string;
		case "number": return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
		case "boolean": return ZodParsedType.boolean;
		case "function": return ZodParsedType.function;
		case "bigint": return ZodParsedType.bigint;
		case "symbol": return ZodParsedType.symbol;
		case "object":
			if (Array.isArray(data)) return ZodParsedType.array;
			if (data === null) return ZodParsedType.null;
			if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return ZodParsedType.promise;
			if (typeof Map !== "undefined" && data instanceof Map) return ZodParsedType.map;
			if (typeof Set !== "undefined" && data instanceof Set) return ZodParsedType.set;
			if (typeof Date !== "undefined" && data instanceof Date) return ZodParsedType.date;
			return ZodParsedType.object;
		default: return ZodParsedType.unknown;
	}
};
const ZodIssueCode = util.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]);
var ZodError = class ZodError extends Error {
	get errors() {
		return this.issues;
	}
	constructor(issues) {
		super();
		this.issues = [];
		this.addIssue = (sub) => {
			this.issues = [...this.issues, sub];
		};
		this.addIssues = (subs = []) => {
			this.issues = [...this.issues, ...subs];
		};
		const actualProto = new.target.prototype;
		if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto);
		else this.__proto__ = actualProto;
		this.name = "ZodError";
		this.issues = issues;
	}
	format(_mapper) {
		const mapper = _mapper || function(issue) {
			return issue.message;
		};
		const fieldErrors = { _errors: [] };
		const processError = (error) => {
			for (const issue of error.issues) if (issue.code === "invalid_union") issue.unionErrors.map(processError);
			else if (issue.code === "invalid_return_type") processError(issue.returnTypeError);
			else if (issue.code === "invalid_arguments") processError(issue.argumentsError);
			else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < issue.path.length) {
					const el = issue.path[i];
					if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
					else {
						curr[el] = curr[el] || { _errors: [] };
						curr[el]._errors.push(mapper(issue));
					}
					curr = curr[el];
					i++;
				}
			}
		};
		processError(this);
		return fieldErrors;
	}
	static assert(value) {
		if (!(value instanceof ZodError)) throw new Error(`Not a ZodError: ${value}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(mapper = (issue) => issue.message) {
		const fieldErrors = Object.create(null);
		const formErrors = [];
		for (const sub of this.issues) if (sub.path.length > 0) {
			const firstEl = sub.path[0];
			fieldErrors[firstEl] = fieldErrors[firstEl] || [];
			fieldErrors[firstEl].push(mapper(sub));
		} else formErrors.push(mapper(sub));
		return {
			formErrors,
			fieldErrors
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
ZodError.create = (issues) => {
	return new ZodError(issues);
};
var errorMap = (issue, _ctx) => {
	let message;
	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			if (issue.received === ZodParsedType.undefined) message = "Required";
			else message = `Expected ${issue.expected}, received ${issue.received}`;
			break;
		case ZodIssueCode.invalid_literal:
			message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
			break;
		case ZodIssueCode.unrecognized_keys:
			message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
			break;
		case ZodIssueCode.invalid_union:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_union_discriminator:
			message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
			break;
		case ZodIssueCode.invalid_enum_value:
			message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
			break;
		case ZodIssueCode.invalid_arguments:
			message = `Invalid function arguments`;
			break;
		case ZodIssueCode.invalid_return_type:
			message = `Invalid function return type`;
			break;
		case ZodIssueCode.invalid_date:
			message = `Invalid date`;
			break;
		case ZodIssueCode.invalid_string:
			if (typeof issue.validation === "object") if ("includes" in issue.validation) {
				message = `Invalid input: must include "${issue.validation.includes}"`;
				if (typeof issue.validation.position === "number") message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
			} else if ("startsWith" in issue.validation) message = `Invalid input: must start with "${issue.validation.startsWith}"`;
			else if ("endsWith" in issue.validation) message = `Invalid input: must end with "${issue.validation.endsWith}"`;
			else util.assertNever(issue.validation);
			else if (issue.validation !== "regex") message = `Invalid ${issue.validation}`;
			else message = "Invalid";
			break;
		case ZodIssueCode.too_small:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.too_big:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.custom:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_intersection_types:
			message = `Intersection results could not be merged`;
			break;
		case ZodIssueCode.not_multiple_of:
			message = `Number must be a multiple of ${issue.multipleOf}`;
			break;
		case ZodIssueCode.not_finite:
			message = "Number must be finite";
			break;
		default:
			message = _ctx.defaultError;
			util.assertNever(issue);
	}
	return { message };
};
var overrideErrorMap = errorMap;
function getErrorMap() {
	return overrideErrorMap;
}
const makeIssue = (params) => {
	const { data, path, errorMaps, issueData } = params;
	const fullPath = [...path, ...issueData.path || []];
	const fullIssue = {
		...issueData,
		path: fullPath
	};
	if (issueData.message !== void 0) return {
		...issueData,
		path: fullPath,
		message: issueData.message
	};
	let errorMessage = "";
	const maps = errorMaps.filter((m) => !!m).slice().reverse();
	for (const map of maps) errorMessage = map(fullIssue, {
		data,
		defaultError: errorMessage
	}).message;
	return {
		...issueData,
		path: fullPath,
		message: errorMessage
	};
};
function addIssueToContext(ctx, issueData) {
	const overrideMap = getErrorMap();
	const issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [
			ctx.common.contextualErrorMap,
			ctx.schemaErrorMap,
			overrideMap,
			overrideMap === errorMap ? void 0 : errorMap
		].filter((x) => !!x)
	});
	ctx.common.issues.push(issue);
}
var ParseStatus = class ParseStatus {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		if (this.value === "valid") this.value = "dirty";
	}
	abort() {
		if (this.value !== "aborted") this.value = "aborted";
	}
	static mergeArray(status, results) {
		const arrayValue = [];
		for (const s of results) {
			if (s.status === "aborted") return INVALID;
			if (s.status === "dirty") status.dirty();
			arrayValue.push(s.value);
		}
		return {
			status: status.value,
			value: arrayValue
		};
	}
	static async mergeObjectAsync(status, pairs) {
		const syncPairs = [];
		for (const pair of pairs) {
			const key = await pair.key;
			const value = await pair.value;
			syncPairs.push({
				key,
				value
			});
		}
		return ParseStatus.mergeObjectSync(status, syncPairs);
	}
	static mergeObjectSync(status, pairs) {
		const finalObject = {};
		for (const pair of pairs) {
			const { key, value } = pair;
			if (key.status === "aborted") return INVALID;
			if (value.status === "aborted") return INVALID;
			if (key.status === "dirty") status.dirty();
			if (value.status === "dirty") status.dirty();
			if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) finalObject[key.value] = value.value;
		}
		return {
			status: status.value,
			value: finalObject
		};
	}
};
const INVALID = Object.freeze({ status: "aborted" });
const DIRTY = (value) => ({
	status: "dirty",
	value
});
const OK = (value) => ({
	status: "valid",
	value
});
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil) {
	errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
	errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
	constructor(parent, value, path, key) {
		this._cachedPath = [];
		this.parent = parent;
		this.data = value;
		this._path = path;
		this._key = key;
	}
	get path() {
		if (!this._cachedPath.length) if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
		else this._cachedPath.push(...this._path, this._key);
		return this._cachedPath;
	}
};
var handleResult = (ctx, result) => {
	if (isValid(result)) return {
		success: true,
		data: result.value
	};
	else {
		if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
		return {
			success: false,
			get error() {
				if (this._error) return this._error;
				this._error = new ZodError(ctx.common.issues);
				return this._error;
			}
		};
	}
};
function processCreateParams(params) {
	if (!params) return {};
	const { errorMap, invalid_type_error, required_error, description } = params;
	if (errorMap && (invalid_type_error || required_error)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
	if (errorMap) return {
		errorMap,
		description
	};
	const customMap = (iss, ctx) => {
		const { message } = params;
		if (iss.code === "invalid_enum_value") return { message: message ?? ctx.defaultError };
		if (typeof ctx.data === "undefined") return { message: message ?? required_error ?? ctx.defaultError };
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return { message: message ?? invalid_type_error ?? ctx.defaultError };
	};
	return {
		errorMap: customMap,
		description
	};
}
var ZodType = class {
	get description() {
		return this._def.description;
	}
	_getType(input) {
		return getParsedType(input.data);
	}
	_getOrReturnCtx(input, ctx) {
		return ctx || {
			common: input.parent.common,
			data: input.data,
			parsedType: getParsedType(input.data),
			schemaErrorMap: this._def.errorMap,
			path: input.path,
			parent: input.parent
		};
	}
	_processInputParams(input) {
		return {
			status: new ParseStatus(),
			ctx: {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent
			}
		};
	}
	_parseSync(input) {
		const result = this._parse(input);
		if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
		return result;
	}
	_parseAsync(input) {
		const result = this._parse(input);
		return Promise.resolve(result);
	}
	parse(data, params) {
		const result = this.safeParse(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	safeParse(data, params) {
		const ctx = {
			common: {
				issues: [],
				async: params?.async ?? false,
				contextualErrorMap: params?.errorMap
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		return handleResult(ctx, this._parseSync({
			data,
			path: ctx.path,
			parent: ctx
		}));
	}
	"~validate"(data) {
		const ctx = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		if (!this["~standard"].async) try {
			const result = this._parseSync({
				data,
				path: [],
				parent: ctx
			});
			return isValid(result) ? { value: result.value } : { issues: ctx.common.issues };
		} catch (err) {
			if (err?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = true;
			ctx.common = {
				issues: [],
				async: true
			};
		}
		return this._parseAsync({
			data,
			path: [],
			parent: ctx
		}).then((result) => isValid(result) ? { value: result.value } : { issues: ctx.common.issues });
	}
	async parseAsync(data, params) {
		const result = await this.safeParseAsync(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	async safeParseAsync(data, params) {
		const ctx = {
			common: {
				issues: [],
				contextualErrorMap: params?.errorMap,
				async: true
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		const maybeAsyncResult = this._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
		return handleResult(ctx, await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult)));
	}
	refine(check, message) {
		const getIssueProperties = (val) => {
			if (typeof message === "string" || typeof message === "undefined") return { message };
			else if (typeof message === "function") return message(val);
			else return message;
		};
		return this._refinement((val, ctx) => {
			const result = check(val);
			const setError = () => ctx.addIssue({
				code: ZodIssueCode.custom,
				...getIssueProperties(val)
			});
			if (typeof Promise !== "undefined" && result instanceof Promise) return result.then((data) => {
				if (!data) {
					setError();
					return false;
				} else return true;
			});
			if (!result) {
				setError();
				return false;
			} else return true;
		});
	}
	refinement(check, refinementData) {
		return this._refinement((val, ctx) => {
			if (!check(val)) {
				ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
				return false;
			} else return true;
		});
	}
	_refinement(refinement) {
		return new ZodEffects({
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "refinement",
				refinement
			}
		});
	}
	superRefine(refinement) {
		return this._refinement(refinement);
	}
	constructor(def) {
		/** Alias of safeParseAsync */
		this.spa = this.safeParseAsync;
		this._def = def;
		this.parse = this.parse.bind(this);
		this.safeParse = this.safeParse.bind(this);
		this.parseAsync = this.parseAsync.bind(this);
		this.safeParseAsync = this.safeParseAsync.bind(this);
		this.spa = this.spa.bind(this);
		this.refine = this.refine.bind(this);
		this.refinement = this.refinement.bind(this);
		this.superRefine = this.superRefine.bind(this);
		this.optional = this.optional.bind(this);
		this.nullable = this.nullable.bind(this);
		this.nullish = this.nullish.bind(this);
		this.array = this.array.bind(this);
		this.promise = this.promise.bind(this);
		this.or = this.or.bind(this);
		this.and = this.and.bind(this);
		this.transform = this.transform.bind(this);
		this.brand = this.brand.bind(this);
		this.default = this.default.bind(this);
		this.catch = this.catch.bind(this);
		this.describe = this.describe.bind(this);
		this.pipe = this.pipe.bind(this);
		this.readonly = this.readonly.bind(this);
		this.isNullable = this.isNullable.bind(this);
		this.isOptional = this.isOptional.bind(this);
		this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (data) => this["~validate"](data)
		};
	}
	optional() {
		return ZodOptional.create(this, this._def);
	}
	nullable() {
		return ZodNullable.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return ZodArray.create(this);
	}
	promise() {
		return ZodPromise.create(this, this._def);
	}
	or(option) {
		return ZodUnion.create([this, option], this._def);
	}
	and(incoming) {
		return ZodIntersection.create(this, incoming, this._def);
	}
	transform(transform) {
		return new ZodEffects({
			...processCreateParams(this._def),
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "transform",
				transform
			}
		});
	}
	default(def) {
		const defaultValueFunc = typeof def === "function" ? def : () => def;
		return new ZodDefault({
			...processCreateParams(this._def),
			innerType: this,
			defaultValue: defaultValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodDefault
		});
	}
	brand() {
		return new ZodBranded({
			typeName: ZodFirstPartyTypeKind.ZodBranded,
			type: this,
			...processCreateParams(this._def)
		});
	}
	catch(def) {
		const catchValueFunc = typeof def === "function" ? def : () => def;
		return new ZodCatch({
			...processCreateParams(this._def),
			innerType: this,
			catchValue: catchValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodCatch
		});
	}
	describe(description) {
		const This = this.constructor;
		return new This({
			...this._def,
			description
		});
	}
	pipe(target) {
		return ZodPipeline.create(this, target);
	}
	readonly() {
		return ZodReadonly.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex$1;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
	let secondsRegexSource = `[0-5]\\d`;
	if (args.precision) secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
	else if (args.precision == null) secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
	const secondsQuantifier = args.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
	return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
	let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
	const opts = [];
	opts.push(args.local ? `Z?` : `Z`);
	if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
	regex = `${regex}(${opts.join("|")})`;
	return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
	if ((version === "v4" || !version) && ipv4Regex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6Regex.test(ip)) return true;
	return false;
}
function isValidJWT(jwt, alg) {
	if (!jwtRegex.test(jwt)) return false;
	try {
		const [header] = jwt.split(".");
		if (!header) return false;
		const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
		const decoded = JSON.parse(atob(base64));
		if (typeof decoded !== "object" || decoded === null) return false;
		if ("typ" in decoded && decoded?.typ !== "JWT") return false;
		if (!decoded.alg) return false;
		if (alg && decoded.alg !== alg) return false;
		return true;
	} catch {
		return false;
	}
}
function isValidCidr(ip, version) {
	if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) return true;
	return false;
}
var ZodString = class ZodString extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = String(input.data);
		if (this._getType(input) !== ZodParsedType.string) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.string,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.length < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.length > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "length") {
			const tooBig = input.data.length > check.value;
			const tooSmall = input.data.length < check.value;
			if (tooBig || tooSmall) {
				ctx = this._getOrReturnCtx(input, ctx);
				if (tooBig) addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				else if (tooSmall) addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "email") {
			if (!emailRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "email",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "emoji") {
			if (!emojiRegex$1) emojiRegex$1 = new RegExp(_emojiRegex, "u");
			if (!emojiRegex$1.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "emoji",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "uuid") {
			if (!uuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "uuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "nanoid") {
			if (!nanoidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "nanoid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid") {
			if (!cuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid2") {
			if (!cuid2Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid2",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ulid") {
			if (!ulidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ulid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "url") try {
			new URL(input.data);
		} catch {
			ctx = this._getOrReturnCtx(input, ctx);
			addIssueToContext(ctx, {
				validation: "url",
				code: ZodIssueCode.invalid_string,
				message: check.message
			});
			status.dirty();
		}
		else if (check.kind === "regex") {
			check.regex.lastIndex = 0;
			if (!check.regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "regex",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "trim") input.data = input.data.trim();
		else if (check.kind === "includes") {
			if (!input.data.includes(check.value, check.position)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: {
						includes: check.value,
						position: check.position
					},
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "toLowerCase") input.data = input.data.toLowerCase();
		else if (check.kind === "toUpperCase") input.data = input.data.toUpperCase();
		else if (check.kind === "startsWith") {
			if (!input.data.startsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { startsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "endsWith") {
			if (!input.data.endsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { endsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "datetime") {
			if (!datetimeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "datetime",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "date") {
			if (!dateRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "date",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "time") {
			if (!timeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "time",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "duration") {
			if (!durationRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "duration",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ip") {
			if (!isValidIP(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ip",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "jwt") {
			if (!isValidJWT(input.data, check.alg)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "jwt",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cidr") {
			if (!isValidCidr(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cidr",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64") {
			if (!base64Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64url") {
			if (!base64urlRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64url",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_regex(regex, validation, message) {
		return this.refinement((data) => regex.test(data), {
			validation,
			code: ZodIssueCode.invalid_string,
			...errorUtil.errToObj(message)
		});
	}
	_addCheck(check) {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	email(message) {
		return this._addCheck({
			kind: "email",
			...errorUtil.errToObj(message)
		});
	}
	url(message) {
		return this._addCheck({
			kind: "url",
			...errorUtil.errToObj(message)
		});
	}
	emoji(message) {
		return this._addCheck({
			kind: "emoji",
			...errorUtil.errToObj(message)
		});
	}
	uuid(message) {
		return this._addCheck({
			kind: "uuid",
			...errorUtil.errToObj(message)
		});
	}
	nanoid(message) {
		return this._addCheck({
			kind: "nanoid",
			...errorUtil.errToObj(message)
		});
	}
	cuid(message) {
		return this._addCheck({
			kind: "cuid",
			...errorUtil.errToObj(message)
		});
	}
	cuid2(message) {
		return this._addCheck({
			kind: "cuid2",
			...errorUtil.errToObj(message)
		});
	}
	ulid(message) {
		return this._addCheck({
			kind: "ulid",
			...errorUtil.errToObj(message)
		});
	}
	base64(message) {
		return this._addCheck({
			kind: "base64",
			...errorUtil.errToObj(message)
		});
	}
	base64url(message) {
		return this._addCheck({
			kind: "base64url",
			...errorUtil.errToObj(message)
		});
	}
	jwt(options) {
		return this._addCheck({
			kind: "jwt",
			...errorUtil.errToObj(options)
		});
	}
	ip(options) {
		return this._addCheck({
			kind: "ip",
			...errorUtil.errToObj(options)
		});
	}
	cidr(options) {
		return this._addCheck({
			kind: "cidr",
			...errorUtil.errToObj(options)
		});
	}
	datetime(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "datetime",
			precision: null,
			offset: false,
			local: false,
			message: options
		});
		return this._addCheck({
			kind: "datetime",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			offset: options?.offset ?? false,
			local: options?.local ?? false,
			...errorUtil.errToObj(options?.message)
		});
	}
	date(message) {
		return this._addCheck({
			kind: "date",
			message
		});
	}
	time(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "time",
			precision: null,
			message: options
		});
		return this._addCheck({
			kind: "time",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			...errorUtil.errToObj(options?.message)
		});
	}
	duration(message) {
		return this._addCheck({
			kind: "duration",
			...errorUtil.errToObj(message)
		});
	}
	regex(regex, message) {
		return this._addCheck({
			kind: "regex",
			regex,
			...errorUtil.errToObj(message)
		});
	}
	includes(value, options) {
		return this._addCheck({
			kind: "includes",
			value,
			position: options?.position,
			...errorUtil.errToObj(options?.message)
		});
	}
	startsWith(value, message) {
		return this._addCheck({
			kind: "startsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	endsWith(value, message) {
		return this._addCheck({
			kind: "endsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	min(minLength, message) {
		return this._addCheck({
			kind: "min",
			value: minLength,
			...errorUtil.errToObj(message)
		});
	}
	max(maxLength, message) {
		return this._addCheck({
			kind: "max",
			value: maxLength,
			...errorUtil.errToObj(message)
		});
	}
	length(len, message) {
		return this._addCheck({
			kind: "length",
			value: len,
			...errorUtil.errToObj(message)
		});
	}
	/**
	* Equivalent to `.min(1)`
	*/
	nonempty(message) {
		return this.min(1, errorUtil.errToObj(message));
	}
	trim() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((ch) => ch.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((ch) => ch.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((ch) => ch.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((ch) => ch.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((ch) => ch.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((ch) => ch.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((ch) => ch.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((ch) => ch.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((ch) => ch.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((ch) => ch.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((ch) => ch.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((ch) => ch.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((ch) => ch.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((ch) => ch.kind === "base64url");
	}
	get minLength() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxLength() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodString.create = (params) => {
	return new ZodString({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodString,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
var ZodNumber = class ZodNumber extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
		this.step = this.multipleOf;
	}
	_parse(input) {
		if (this._def.coerce) input.data = Number(input.data);
		if (this._getType(input) !== ZodParsedType.number) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.number,
				received: ctx.parsedType
			});
			return INVALID;
		}
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "int") {
			if (!util.isInteger(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: "integer",
					received: "float",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (floatSafeRemainder(input.data, check.value) !== 0) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "finite") {
			if (!Number.isFinite(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_finite,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	int(message) {
		return this._addCheck({
			kind: "int",
			message: errorUtil.toString(message)
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	finite(message) {
		return this._addCheck({
			kind: "finite",
			message: errorUtil.toString(message)
		});
	}
	safe(message) {
		return this._addCheck({
			kind: "min",
			inclusive: true,
			value: Number.MIN_SAFE_INTEGER,
			message: errorUtil.toString(message)
		})._addCheck({
			kind: "max",
			inclusive: true,
			value: Number.MAX_SAFE_INTEGER,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
	get isInt() {
		return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
	}
	get isFinite() {
		let max = null;
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return true;
		else if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		} else if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return Number.isFinite(min) && Number.isFinite(max);
	}
};
ZodNumber.create = (params) => {
	return new ZodNumber({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodNumber,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodBigInt = class ZodBigInt extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
	}
	_parse(input) {
		if (this._def.coerce) try {
			input.data = BigInt(input.data);
		} catch {
			return this._getInvalidInput(input);
		}
		if (this._getType(input) !== ZodParsedType.bigint) return this._getInvalidInput(input);
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					type: "bigint",
					minimum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					type: "bigint",
					maximum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (input.data % check.value !== BigInt(0)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_getInvalidInput(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.bigint,
			received: ctx.parsedType
		});
		return INVALID;
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodBigInt.create = (params) => {
	return new ZodBigInt({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodBigInt,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
var ZodBoolean = class extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = Boolean(input.data);
		if (this._getType(input) !== ZodParsedType.boolean) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.boolean,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodBoolean.create = (params) => {
	return new ZodBoolean({
		typeName: ZodFirstPartyTypeKind.ZodBoolean,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodDate = class ZodDate extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = new Date(input.data);
		if (this._getType(input) !== ZodParsedType.date) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.date,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (Number.isNaN(input.data.getTime())) {
			addIssueToContext(this._getOrReturnCtx(input), { code: ZodIssueCode.invalid_date });
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.getTime() < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					message: check.message,
					inclusive: true,
					exact: false,
					minimum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.getTime() > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					message: check.message,
					inclusive: true,
					exact: false,
					maximum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: new Date(input.data.getTime())
		};
	}
	_addCheck(check) {
		return new ZodDate({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	min(minDate, message) {
		return this._addCheck({
			kind: "min",
			value: minDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	max(maxDate, message) {
		return this._addCheck({
			kind: "max",
			value: maxDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	get minDate() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min != null ? new Date(min) : null;
	}
	get maxDate() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max != null ? new Date(max) : null;
	}
};
ZodDate.create = (params) => {
	return new ZodDate({
		checks: [],
		coerce: params?.coerce || false,
		typeName: ZodFirstPartyTypeKind.ZodDate,
		...processCreateParams(params)
	});
};
var ZodSymbol = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.symbol) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.symbol,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodSymbol.create = (params) => {
	return new ZodSymbol({
		typeName: ZodFirstPartyTypeKind.ZodSymbol,
		...processCreateParams(params)
	});
};
var ZodUndefined = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.undefined,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodUndefined.create = (params) => {
	return new ZodUndefined({
		typeName: ZodFirstPartyTypeKind.ZodUndefined,
		...processCreateParams(params)
	});
};
var ZodNull = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.null) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.null,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodNull.create = (params) => {
	return new ZodNull({
		typeName: ZodFirstPartyTypeKind.ZodNull,
		...processCreateParams(params)
	});
};
var ZodAny = class extends ZodType {
	constructor() {
		super(...arguments);
		this._any = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodAny.create = (params) => {
	return new ZodAny({
		typeName: ZodFirstPartyTypeKind.ZodAny,
		...processCreateParams(params)
	});
};
var ZodUnknown = class extends ZodType {
	constructor() {
		super(...arguments);
		this._unknown = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodUnknown.create = (params) => {
	return new ZodUnknown({
		typeName: ZodFirstPartyTypeKind.ZodUnknown,
		...processCreateParams(params)
	});
};
var ZodNever = class extends ZodType {
	_parse(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.never,
			received: ctx.parsedType
		});
		return INVALID;
	}
};
ZodNever.create = (params) => {
	return new ZodNever({
		typeName: ZodFirstPartyTypeKind.ZodNever,
		...processCreateParams(params)
	});
};
var ZodVoid = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.void,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodVoid.create = (params) => {
	return new ZodVoid({
		typeName: ZodFirstPartyTypeKind.ZodVoid,
		...processCreateParams(params)
	});
};
var ZodArray = class ZodArray extends ZodType {
	_parse(input) {
		const { ctx, status } = this._processInputParams(input);
		const def = this._def;
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (def.exactLength !== null) {
			const tooBig = ctx.data.length > def.exactLength.value;
			const tooSmall = ctx.data.length < def.exactLength.value;
			if (tooBig || tooSmall) {
				addIssueToContext(ctx, {
					code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
					minimum: tooSmall ? def.exactLength.value : void 0,
					maximum: tooBig ? def.exactLength.value : void 0,
					type: "array",
					inclusive: true,
					exact: true,
					message: def.exactLength.message
				});
				status.dirty();
			}
		}
		if (def.minLength !== null) {
			if (ctx.data.length < def.minLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.minLength.message
				});
				status.dirty();
			}
		}
		if (def.maxLength !== null) {
			if (ctx.data.length > def.maxLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.maxLength.message
				});
				status.dirty();
			}
		}
		if (ctx.common.async) return Promise.all([...ctx.data].map((item, i) => {
			return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		})).then((result) => {
			return ParseStatus.mergeArray(status, result);
		});
		const result = [...ctx.data].map((item, i) => {
			return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		});
		return ParseStatus.mergeArray(status, result);
	}
	get element() {
		return this._def.type;
	}
	min(minLength, message) {
		return new ZodArray({
			...this._def,
			minLength: {
				value: minLength,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxLength, message) {
		return new ZodArray({
			...this._def,
			maxLength: {
				value: maxLength,
				message: errorUtil.toString(message)
			}
		});
	}
	length(len, message) {
		return new ZodArray({
			...this._def,
			exactLength: {
				value: len,
				message: errorUtil.toString(message)
			}
		});
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodArray.create = (schema, params) => {
	return new ZodArray({
		type: schema,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: ZodFirstPartyTypeKind.ZodArray,
		...processCreateParams(params)
	});
};
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		const newShape = {};
		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: () => newShape
		});
	} else if (schema instanceof ZodArray) return new ZodArray({
		...schema._def,
		type: deepPartialify(schema.element)
	});
	else if (schema instanceof ZodOptional) return ZodOptional.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodNullable) return ZodNullable.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodTuple) return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	else return schema;
}
var ZodObject = class ZodObject extends ZodType {
	constructor() {
		super(...arguments);
		this._cached = null;
		/**
		* @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
		* If you want to pass through unknown properties, use `.passthrough()` instead.
		*/
		this.nonstrict = this.passthrough;
		/**
		* @deprecated Use `.extend` instead
		*  */
		this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const shape = this._def.shape();
		this._cached = {
			shape,
			keys: util.objectKeys(shape)
		};
		return this._cached;
	}
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.object) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const { status, ctx } = this._processInputParams(input);
		const { shape, keys: shapeKeys } = this._getCached();
		const extraKeys = [];
		if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
			for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
		}
		const pairs = [];
		for (const key of shapeKeys) {
			const keyValidator = shape[key];
			const value = ctx.data[key];
			pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
				alwaysSet: key in ctx.data
			});
		}
		if (this._def.catchall instanceof ZodNever) {
			const unknownKeys = this._def.unknownKeys;
			if (unknownKeys === "passthrough") for (const key of extraKeys) pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: {
					status: "valid",
					value: ctx.data[key]
				}
			});
			else if (unknownKeys === "strict") {
				if (extraKeys.length > 0) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.unrecognized_keys,
						keys: extraKeys
					});
					status.dirty();
				}
			} else if (unknownKeys === "strip") {} else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
		} else {
			const catchall = this._def.catchall;
			for (const key of extraKeys) {
				const value = ctx.data[key];
				pairs.push({
					key: {
						status: "valid",
						value: key
					},
					value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
					alwaysSet: key in ctx.data
				});
			}
		}
		if (ctx.common.async) return Promise.resolve().then(async () => {
			const syncPairs = [];
			for (const pair of pairs) {
				const key = await pair.key;
				const value = await pair.value;
				syncPairs.push({
					key,
					value,
					alwaysSet: pair.alwaysSet
				});
			}
			return syncPairs;
		}).then((syncPairs) => {
			return ParseStatus.mergeObjectSync(status, syncPairs);
		});
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get shape() {
		return this._def.shape();
	}
	strict(message) {
		errorUtil.errToObj;
		return new ZodObject({
			...this._def,
			unknownKeys: "strict",
			...message !== void 0 ? { errorMap: (issue, ctx) => {
				const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
				if (issue.code === "unrecognized_keys") return { message: errorUtil.errToObj(message).message ?? defaultError };
				return { message: defaultError };
			} } : {}
		});
	}
	strip() {
		return new ZodObject({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new ZodObject({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(augmentation) {
		return new ZodObject({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...augmentation
			})
		});
	}
	/**
	* Prior to zod@1.0.12 there was a bug in the
	* inferred type of merged objects. Please
	* upgrade if you are experiencing issues.
	*/
	merge(merging) {
		return new ZodObject({
			unknownKeys: merging._def.unknownKeys,
			catchall: merging._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...merging._def.shape()
			}),
			typeName: ZodFirstPartyTypeKind.ZodObject
		});
	}
	setKey(key, schema) {
		return this.augment({ [key]: schema });
	}
	catchall(index) {
		return new ZodObject({
			...this._def,
			catchall: index
		});
	}
	pick(mask) {
		const shape = {};
		for (const key of util.objectKeys(mask)) if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	omit(mask) {
		const shape = {};
		for (const key of util.objectKeys(this.shape)) if (!mask[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	/**
	* @deprecated
	*/
	deepPartial() {
		return deepPartialify(this);
	}
	partial(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) {
			const fieldSchema = this.shape[key];
			if (mask && !mask[key]) newShape[key] = fieldSchema;
			else newShape[key] = fieldSchema.optional();
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	required(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) if (mask && !mask[key]) newShape[key] = this.shape[key];
		else {
			let newField = this.shape[key];
			while (newField instanceof ZodOptional) newField = newField._def.innerType;
			newShape[key] = newField;
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	keyof() {
		return createZodEnum(util.objectKeys(this.shape));
	}
};
ZodObject.create = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.strictCreate = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strict",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.lazycreate = (shape, params) => {
	return new ZodObject({
		shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
var ZodUnion = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const options = this._def.options;
		function handleResults(results) {
			for (const result of results) if (result.result.status === "valid") return result.result;
			for (const result of results) if (result.result.status === "dirty") {
				ctx.common.issues.push(...result.ctx.common.issues);
				return result.result;
			}
			const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
		if (ctx.common.async) return Promise.all(options.map(async (option) => {
			const childCtx = {
				...ctx,
				common: {
					...ctx.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await option._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				}),
				ctx: childCtx
			};
		})).then(handleResults);
		else {
			let dirty = void 0;
			const issues = [];
			for (const option of options) {
				const childCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: []
					},
					parent: null
				};
				const result = option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				});
				if (result.status === "valid") return result;
				else if (result.status === "dirty" && !dirty) dirty = {
					result,
					ctx: childCtx
				};
				if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
			}
			if (dirty) {
				ctx.common.issues.push(...dirty.ctx.common.issues);
				return dirty.result;
			}
			const unionErrors = issues.map((issues) => new ZodError(issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
	}
	get options() {
		return this._def.options;
	}
};
ZodUnion.create = (types, params) => {
	return new ZodUnion({
		options: types,
		typeName: ZodFirstPartyTypeKind.ZodUnion,
		...processCreateParams(params)
	});
};
var getDiscriminator = (type) => {
	if (type instanceof ZodLazy) return getDiscriminator(type.schema);
	else if (type instanceof ZodEffects) return getDiscriminator(type.innerType());
	else if (type instanceof ZodLiteral) return [type.value];
	else if (type instanceof ZodEnum) return type.options;
	else if (type instanceof ZodNativeEnum) return util.objectValues(type.enum);
	else if (type instanceof ZodDefault) return getDiscriminator(type._def.innerType);
	else if (type instanceof ZodUndefined) return [void 0];
	else if (type instanceof ZodNull) return [null];
	else if (type instanceof ZodOptional) return [void 0, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodNullable) return [null, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodBranded) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodReadonly) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodCatch) return getDiscriminator(type._def.innerType);
	else return [];
};
var ZodDiscriminatedUnion = class ZodDiscriminatedUnion extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const discriminator = this.discriminator;
		const discriminatorValue = ctx.data[discriminator];
		const option = this.optionsMap.get(discriminatorValue);
		if (!option) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union_discriminator,
				options: Array.from(this.optionsMap.keys()),
				path: [discriminator]
			});
			return INVALID;
		}
		if (ctx.common.async) return option._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
		else return option._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	/**
	* The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
	* However, it only allows a union of objects, all of which need to share a discriminator property. This property must
	* have a different value for each object in the union.
	* @param discriminator the name of the discriminator property
	* @param types an array of object schemas
	* @param params
	*/
	static create(discriminator, options, params) {
		const optionsMap = /* @__PURE__ */ new Map();
		for (const type of options) {
			const discriminatorValues = getDiscriminator(type.shape[discriminator]);
			if (!discriminatorValues.length) throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
			for (const value of discriminatorValues) {
				if (optionsMap.has(value)) throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
				optionsMap.set(value, type);
			}
		}
		return new ZodDiscriminatedUnion({
			typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
			discriminator,
			options,
			optionsMap,
			...processCreateParams(params)
		});
	}
};
function mergeValues(a, b) {
	const aType = getParsedType(a);
	const bType = getParsedType(b);
	if (a === b) return {
		valid: true,
		data: a
	};
	else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return { valid: false };
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) return { valid: false };
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return { valid: false };
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) return {
		valid: true,
		data: a
	};
	else return { valid: false };
}
var ZodIntersection = class extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const handleParsed = (parsedLeft, parsedRight) => {
			if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
			const merged = mergeValues(parsedLeft.value, parsedRight.value);
			if (!merged.valid) {
				addIssueToContext(ctx, { code: ZodIssueCode.invalid_intersection_types });
				return INVALID;
			}
			if (isDirty(parsedLeft) || isDirty(parsedRight)) status.dirty();
			return {
				status: status.value,
				value: merged.data
			};
		};
		if (ctx.common.async) return Promise.all([this._def.left._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		})]).then(([left, right]) => handleParsed(left, right));
		else return handleParsed(this._def.left._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}));
	}
};
ZodIntersection.create = (left, right, params) => {
	return new ZodIntersection({
		left,
		right,
		typeName: ZodFirstPartyTypeKind.ZodIntersection,
		...processCreateParams(params)
	});
};
var ZodTuple = class ZodTuple extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (ctx.data.length < this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_small,
				minimum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			return INVALID;
		}
		if (!this._def.rest && ctx.data.length > this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_big,
				maximum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			status.dirty();
		}
		const items = [...ctx.data].map((item, itemIndex) => {
			const schema = this._def.items[itemIndex] || this._def.rest;
			if (!schema) return null;
			return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
		}).filter((x) => !!x);
		if (ctx.common.async) return Promise.all(items).then((results) => {
			return ParseStatus.mergeArray(status, results);
		});
		else return ParseStatus.mergeArray(status, items);
	}
	get items() {
		return this._def.items;
	}
	rest(rest) {
		return new ZodTuple({
			...this._def,
			rest
		});
	}
};
ZodTuple.create = (schemas, params) => {
	if (!Array.isArray(schemas)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new ZodTuple({
		items: schemas,
		typeName: ZodFirstPartyTypeKind.ZodTuple,
		rest: null,
		...processCreateParams(params)
	});
};
var ZodRecord = class ZodRecord extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const pairs = [];
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		for (const key in ctx.data) pairs.push({
			key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
			value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
			alwaysSet: key in ctx.data
		});
		if (ctx.common.async) return ParseStatus.mergeObjectAsync(status, pairs);
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get element() {
		return this._def.valueType;
	}
	static create(first, second, third) {
		if (second instanceof ZodType) return new ZodRecord({
			keyType: first,
			valueType: second,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(third)
		});
		return new ZodRecord({
			keyType: ZodString.create(),
			valueType: first,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(second)
		});
	}
};
var ZodMap = class extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.map) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.map,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		const pairs = [...ctx.data.entries()].map(([key, value], index) => {
			return {
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
				value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
			};
		});
		if (ctx.common.async) {
			const finalMap = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					if (key.status === "aborted" || value.status === "aborted") return INVALID;
					if (key.status === "dirty" || value.status === "dirty") status.dirty();
					finalMap.set(key.value, value.value);
				}
				return {
					status: status.value,
					value: finalMap
				};
			});
		} else {
			const finalMap = /* @__PURE__ */ new Map();
			for (const pair of pairs) {
				const key = pair.key;
				const value = pair.value;
				if (key.status === "aborted" || value.status === "aborted") return INVALID;
				if (key.status === "dirty" || value.status === "dirty") status.dirty();
				finalMap.set(key.value, value.value);
			}
			return {
				status: status.value,
				value: finalMap
			};
		}
	}
};
ZodMap.create = (keyType, valueType, params) => {
	return new ZodMap({
		valueType,
		keyType,
		typeName: ZodFirstPartyTypeKind.ZodMap,
		...processCreateParams(params)
	});
};
var ZodSet = class ZodSet extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.set) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.set,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const def = this._def;
		if (def.minSize !== null) {
			if (ctx.data.size < def.minSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.minSize.message
				});
				status.dirty();
			}
		}
		if (def.maxSize !== null) {
			if (ctx.data.size > def.maxSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.maxSize.message
				});
				status.dirty();
			}
		}
		const valueType = this._def.valueType;
		function finalizeSet(elements) {
			const parsedSet = /* @__PURE__ */ new Set();
			for (const element of elements) {
				if (element.status === "aborted") return INVALID;
				if (element.status === "dirty") status.dirty();
				parsedSet.add(element.value);
			}
			return {
				status: status.value,
				value: parsedSet
			};
		}
		const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
		if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
		else return finalizeSet(elements);
	}
	min(minSize, message) {
		return new ZodSet({
			...this._def,
			minSize: {
				value: minSize,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxSize, message) {
		return new ZodSet({
			...this._def,
			maxSize: {
				value: maxSize,
				message: errorUtil.toString(message)
			}
		});
	}
	size(size, message) {
		return this.min(size, message).max(size, message);
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodSet.create = (valueType, params) => {
	return new ZodSet({
		valueType,
		minSize: null,
		maxSize: null,
		typeName: ZodFirstPartyTypeKind.ZodSet,
		...processCreateParams(params)
	});
};
var ZodFunction = class ZodFunction extends ZodType {
	constructor() {
		super(...arguments);
		this.validate = this.implement;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.function) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.function,
				received: ctx.parsedType
			});
			return INVALID;
		}
		function makeArgsIssue(args, error) {
			return makeIssue({
				data: args,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_arguments,
					argumentsError: error
				}
			});
		}
		function makeReturnsIssue(returns, error) {
			return makeIssue({
				data: returns,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_return_type,
					returnTypeError: error
				}
			});
		}
		const params = { errorMap: ctx.common.contextualErrorMap };
		const fn = ctx.data;
		if (this._def.returns instanceof ZodPromise) {
			const me = this;
			return OK(async function(...args) {
				const error = new ZodError([]);
				const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
					error.addIssue(makeArgsIssue(args, e));
					throw error;
				});
				const result = await Reflect.apply(fn, this, parsedArgs);
				return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
					error.addIssue(makeReturnsIssue(result, e));
					throw error;
				});
			});
		} else {
			const me = this;
			return OK(function(...args) {
				const parsedArgs = me._def.args.safeParse(args, params);
				if (!parsedArgs.success) throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
				const result = Reflect.apply(fn, this, parsedArgs.data);
				const parsedReturns = me._def.returns.safeParse(result, params);
				if (!parsedReturns.success) throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
				return parsedReturns.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...items) {
		return new ZodFunction({
			...this._def,
			args: ZodTuple.create(items).rest(ZodUnknown.create())
		});
	}
	returns(returnType) {
		return new ZodFunction({
			...this._def,
			returns: returnType
		});
	}
	implement(func) {
		return this.parse(func);
	}
	strictImplement(func) {
		return this.parse(func);
	}
	static create(args, returns, params) {
		return new ZodFunction({
			args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
			returns: returns || ZodUnknown.create(),
			typeName: ZodFirstPartyTypeKind.ZodFunction,
			...processCreateParams(params)
		});
	}
};
var ZodLazy = class extends ZodType {
	get schema() {
		return this._def.getter();
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		return this._def.getter()._parse({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
};
ZodLazy.create = (getter, params) => {
	return new ZodLazy({
		getter,
		typeName: ZodFirstPartyTypeKind.ZodLazy,
		...processCreateParams(params)
	});
};
var ZodLiteral = class extends ZodType {
	_parse(input) {
		if (input.data !== this._def.value) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_literal,
				expected: this._def.value
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
	get value() {
		return this._def.value;
	}
};
ZodLiteral.create = (value, params) => {
	return new ZodLiteral({
		value,
		typeName: ZodFirstPartyTypeKind.ZodLiteral,
		...processCreateParams(params)
	});
};
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params)
	});
}
var ZodEnum = class ZodEnum extends ZodType {
	_parse(input) {
		if (typeof input.data !== "string") {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(this._def.values);
		if (!this._cache.has(input.data)) {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Values() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	extract(values, newDef = this._def) {
		return ZodEnum.create(values, {
			...this._def,
			...newDef
		});
	}
	exclude(values, newDef = this._def) {
		return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
			...this._def,
			...newDef
		});
	}
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
	_parse(input) {
		const nativeEnumValues = util.getValidEnumValues(this._def.values);
		const ctx = this._getOrReturnCtx(input);
		if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(util.getValidEnumValues(this._def.values));
		if (!this._cache.has(input.data)) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get enum() {
		return this._def.values;
	}
};
ZodNativeEnum.create = (values, params) => {
	return new ZodNativeEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
		...processCreateParams(params)
	});
};
var ZodPromise = class extends ZodType {
	unwrap() {
		return this._def.type;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.promise,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK((ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data)).then((data) => {
			return this._def.type.parseAsync(data, {
				path: ctx.path,
				errorMap: ctx.common.contextualErrorMap
			});
		}));
	}
};
ZodPromise.create = (schema, params) => {
	return new ZodPromise({
		type: schema,
		typeName: ZodFirstPartyTypeKind.ZodPromise,
		...processCreateParams(params)
	});
};
var ZodEffects = class extends ZodType {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const effect = this._def.effect || null;
		const checkCtx = {
			addIssue: (arg) => {
				addIssueToContext(ctx, arg);
				if (arg.fatal) status.abort();
				else status.dirty();
			},
			get path() {
				return ctx.path;
			}
		};
		checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
		if (effect.type === "preprocess") {
			const processed = effect.transform(ctx.data, checkCtx);
			if (ctx.common.async) return Promise.resolve(processed).then(async (processed) => {
				if (status.value === "aborted") return INVALID;
				const result = await this._def.schema._parseAsync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			});
			else {
				if (status.value === "aborted") return INVALID;
				const result = this._def.schema._parseSync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			}
		}
		if (effect.type === "refinement") {
			const executeRefinement = (acc) => {
				const result = effect.refinement(acc, checkCtx);
				if (ctx.common.async) return Promise.resolve(result);
				if (result instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return acc;
			};
			if (ctx.common.async === false) {
				const inner = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				executeRefinement(inner.value);
				return {
					status: status.value,
					value: inner.value
				};
			} else return this._def.schema._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}).then((inner) => {
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				return executeRefinement(inner.value).then(() => {
					return {
						status: status.value,
						value: inner.value
					};
				});
			});
		}
		if (effect.type === "transform") if (ctx.common.async === false) {
			const base = this._def.schema._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			if (!isValid(base)) return INVALID;
			const result = effect.transform(base.value, checkCtx);
			if (result instanceof Promise) throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
			return {
				status: status.value,
				value: result
			};
		} else return this._def.schema._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}).then((base) => {
			if (!isValid(base)) return INVALID;
			return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
				status: status.value,
				value: result
			}));
		});
		util.assertNever(effect);
	}
};
ZodEffects.create = (schema, effect, params) => {
	return new ZodEffects({
		schema,
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		effect,
		...processCreateParams(params)
	});
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
	return new ZodEffects({
		schema,
		effect: {
			type: "preprocess",
			transform: preprocess
		},
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		...processCreateParams(params)
	});
};
var ZodOptional = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.undefined) return OK(void 0);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodOptional.create = (type, params) => {
	return new ZodOptional({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodOptional,
		...processCreateParams(params)
	});
};
var ZodNullable = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.null) return OK(null);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodNullable.create = (type, params) => {
	return new ZodNullable({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodNullable,
		...processCreateParams(params)
	});
};
var ZodDefault = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		let data = ctx.data;
		if (ctx.parsedType === ZodParsedType.undefined) data = this._def.defaultValue();
		return this._def.innerType._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
ZodDefault.create = (type, params) => {
	return new ZodDefault({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodDefault,
		defaultValue: typeof params.default === "function" ? params.default : () => params.default,
		...processCreateParams(params)
	});
};
var ZodCatch = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const newCtx = {
			...ctx,
			common: {
				...ctx.common,
				issues: []
			}
		};
		const result = this._def.innerType._parse({
			data: newCtx.data,
			path: newCtx.path,
			parent: { ...newCtx }
		});
		if (isAsync(result)) return result.then((result) => {
			return {
				status: "valid",
				value: result.status === "valid" ? result.value : this._def.catchValue({
					get error() {
						return new ZodError(newCtx.common.issues);
					},
					input: newCtx.data
				})
			};
		});
		else return {
			status: "valid",
			value: result.status === "valid" ? result.value : this._def.catchValue({
				get error() {
					return new ZodError(newCtx.common.issues);
				},
				input: newCtx.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
ZodCatch.create = (type, params) => {
	return new ZodCatch({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodCatch,
		catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
		...processCreateParams(params)
	});
};
var ZodNaN = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.nan) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.nan,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
};
ZodNaN.create = (params) => {
	return new ZodNaN({
		typeName: ZodFirstPartyTypeKind.ZodNaN,
		...processCreateParams(params)
	});
};
var ZodBranded = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const data = ctx.data;
		return this._def.type._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	unwrap() {
		return this._def.type;
	}
};
var ZodPipeline = class ZodPipeline extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.common.async) {
			const handleAsync = async () => {
				const inResult = await this._def.in._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inResult.status === "aborted") return INVALID;
				if (inResult.status === "dirty") {
					status.dirty();
					return DIRTY(inResult.value);
				} else return this._def.out._parseAsync({
					data: inResult.value,
					path: ctx.path,
					parent: ctx
				});
			};
			return handleAsync();
		} else {
			const inResult = this._def.in._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			if (inResult.status === "aborted") return INVALID;
			if (inResult.status === "dirty") {
				status.dirty();
				return {
					status: "dirty",
					value: inResult.value
				};
			} else return this._def.out._parseSync({
				data: inResult.value,
				path: ctx.path,
				parent: ctx
			});
		}
	}
	static create(a, b) {
		return new ZodPipeline({
			in: a,
			out: b,
			typeName: ZodFirstPartyTypeKind.ZodPipeline
		});
	}
};
var ZodReadonly = class extends ZodType {
	_parse(input) {
		const result = this._def.innerType._parse(input);
		const freeze = (data) => {
			if (isValid(data)) data.value = Object.freeze(data.value);
			return data;
		};
		return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodReadonly.create = (type, params) => {
	return new ZodReadonly({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodReadonly,
		...processCreateParams(params)
	});
};
ZodObject.lazycreate;
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind) {
	ZodFirstPartyTypeKind["ZodString"] = "ZodString";
	ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
	ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
	ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
	ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
	ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
	ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
	ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
	ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
	ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
	ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
	ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
	ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
	ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
	ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
	ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
	ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
	ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
	ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
	ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
	ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
	ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
	ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
	ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
	ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
	ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
	ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
	ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
	ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
	ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
	ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
	ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
	ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
	ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
	ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
	ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
ZodString.create;
ZodNumber.create;
ZodNaN.create;
ZodBigInt.create;
ZodBoolean.create;
ZodDate.create;
ZodSymbol.create;
ZodUndefined.create;
ZodNull.create;
ZodAny.create;
ZodUnknown.create;
ZodNever.create;
ZodVoid.create;
ZodArray.create;
var objectType = ZodObject.create;
ZodObject.strictCreate;
ZodUnion.create;
ZodDiscriminatedUnion.create;
ZodIntersection.create;
ZodTuple.create;
ZodRecord.create;
ZodMap.create;
ZodSet.create;
ZodFunction.create;
ZodLazy.create;
ZodLiteral.create;
ZodEnum.create;
ZodNativeEnum.create;
ZodPromise.create;
ZodEffects.create;
ZodOptional.create;
ZodNullable.create;
ZodEffects.createWithPreprocess;
ZodPipeline.create;
var ParseError = class extends Error {
	constructor(message, options) {
		super(message), this.name = "ParseError", this.type = options.type, this.field = options.field, this.value = options.value, this.line = options.line;
	}
};
function noop(_arg) {}
function createParser(callbacks) {
	if (typeof callbacks == "function") throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");
	const { onEvent = noop, onError = noop, onRetry = noop, onComment } = callbacks;
	let incompleteLine = "", isFirstChunk = !0, id, data = "", eventType = "";
	function feed(newChunk) {
		const chunk = isFirstChunk ? newChunk.replace(/^\xEF\xBB\xBF/, "") : newChunk, [complete, incomplete] = splitLines(`${incompleteLine}${chunk}`);
		for (const line of complete) parseLine(line);
		incompleteLine = incomplete, isFirstChunk = !1;
	}
	function parseLine(line) {
		if (line === "") {
			dispatchEvent();
			return;
		}
		if (line.startsWith(":")) {
			onComment && onComment(line.slice(line.startsWith(": ") ? 2 : 1));
			return;
		}
		const fieldSeparatorIndex = line.indexOf(":");
		if (fieldSeparatorIndex !== -1) {
			const field = line.slice(0, fieldSeparatorIndex), offset = line[fieldSeparatorIndex + 1] === " " ? 2 : 1;
			processField(field, line.slice(fieldSeparatorIndex + offset), line);
			return;
		}
		processField(line, "", line);
	}
	function processField(field, value, line) {
		switch (field) {
			case "event":
				eventType = value;
				break;
			case "data":
				data = `${data}${value}
`;
				break;
			case "id":
				id = value.includes("\0") ? void 0 : value;
				break;
			case "retry":
				/^\d+$/.test(value) ? onRetry(parseInt(value, 10)) : onError(new ParseError(`Invalid \`retry\` value: "${value}"`, {
					type: "invalid-retry",
					value,
					line
				}));
				break;
			default:
				onError(new ParseError(`Unknown field "${field.length > 20 ? `${field.slice(0, 20)}\u2026` : field}"`, {
					type: "unknown-field",
					field,
					value,
					line
				}));
				break;
		}
	}
	function dispatchEvent() {
		data.length > 0 && onEvent({
			id,
			event: eventType || void 0,
			data: data.endsWith(`
`) ? data.slice(0, -1) : data
		}), id = void 0, data = "", eventType = "";
	}
	function reset(options = {}) {
		incompleteLine && options.consume && parseLine(incompleteLine), isFirstChunk = !0, id = void 0, data = "", eventType = "", incompleteLine = "";
	}
	return {
		feed,
		reset
	};
}
function splitLines(chunk) {
	const lines = [];
	let incompleteLine = "", searchIndex = 0;
	for (; searchIndex < chunk.length;) {
		const crIndex = chunk.indexOf("\r", searchIndex), lfIndex = chunk.indexOf(`
`, searchIndex);
		let lineEnd = -1;
		if (crIndex !== -1 && lfIndex !== -1 ? lineEnd = Math.min(crIndex, lfIndex) : crIndex !== -1 ? crIndex === chunk.length - 1 ? lineEnd = -1 : lineEnd = crIndex : lfIndex !== -1 && (lineEnd = lfIndex), lineEnd === -1) {
			incompleteLine = chunk.slice(searchIndex);
			break;
		} else {
			const line = chunk.slice(searchIndex, lineEnd);
			lines.push(line), searchIndex = lineEnd + 1, chunk[searchIndex - 1] === "\r" && chunk[searchIndex] === `
` && searchIndex++;
		}
	}
	return [lines, incompleteLine];
}
var EventSourceParserStream = class extends TransformStream {
	constructor({ onError, onRetry, onComment } = {}) {
		let parser;
		super({
			start(controller) {
				parser = createParser({
					onEvent: (event) => {
						controller.enqueue(event);
					},
					onError(error) {
						onError === "terminate" ? controller.error(error) : typeof onError == "function" && onError(error);
					},
					onRetry,
					onComment
				});
			},
			transform(chunk) {
				parser.feed(chunk);
			}
		});
	}
};
function combineHeaders(...headers) {
	return headers.reduce((combinedHeaders, currentHeaders) => ({
		...combinedHeaders,
		...currentHeaders != null ? currentHeaders : {}
	}), {});
}
function createToolNameMapping({ tools = [], providerToolNames }) {
	const customToolNameToProviderToolName = {};
	const providerToolNameToCustomToolName = {};
	for (const tool2 of tools) if (tool2.type === "provider" && tool2.id in providerToolNames) {
		const providerToolName = providerToolNames[tool2.id];
		customToolNameToProviderToolName[tool2.name] = providerToolName;
		providerToolNameToCustomToolName[providerToolName] = tool2.name;
	}
	return {
		toProviderToolName: (customToolName) => {
			var _a2;
			return (_a2 = customToolNameToProviderToolName[customToolName]) != null ? _a2 : customToolName;
		},
		toCustomToolName: (providerToolName) => {
			var _a2;
			return (_a2 = providerToolNameToCustomToolName[providerToolName]) != null ? _a2 : providerToolName;
		}
	};
}
async function delay(delayInMs, options) {
	if (delayInMs == null) return Promise.resolve();
	const signal = options == null ? void 0 : options.abortSignal;
	return new Promise((resolve2, reject) => {
		if (signal == null ? void 0 : signal.aborted) {
			reject(createAbortError());
			return;
		}
		const timeoutId = setTimeout(() => {
			cleanup();
			resolve2();
		}, delayInMs);
		const cleanup = () => {
			clearTimeout(timeoutId);
			signal?.removeEventListener("abort", onAbort);
		};
		const onAbort = () => {
			cleanup();
			reject(createAbortError());
		};
		signal?.addEventListener("abort", onAbort);
	});
}
function createAbortError() {
	return new DOMException("Delay was aborted", "AbortError");
}
var DelayedPromise = class {
	constructor() {
		this.status = { type: "pending" };
		this._resolve = void 0;
		this._reject = void 0;
	}
	get promise() {
		if (this._promise) return this._promise;
		this._promise = new Promise((resolve2, reject) => {
			if (this.status.type === "resolved") resolve2(this.status.value);
			else if (this.status.type === "rejected") reject(this.status.error);
			this._resolve = resolve2;
			this._reject = reject;
		});
		return this._promise;
	}
	resolve(value) {
		var _a2;
		this.status = {
			type: "resolved",
			value
		};
		if (this._promise) (_a2 = this._resolve) == null || _a2.call(this, value);
	}
	reject(error) {
		var _a2;
		this.status = {
			type: "rejected",
			error
		};
		if (this._promise) (_a2 = this._reject) == null || _a2.call(this, error);
	}
	isResolved() {
		return this.status.type === "resolved";
	}
	isRejected() {
		return this.status.type === "rejected";
	}
	isPending() {
		return this.status.type === "pending";
	}
};
function extractResponseHeaders(response) {
	return Object.fromEntries([...response.headers]);
}
var { btoa: btoa$1, atob: atob$1 } = globalThis;
function convertBase64ToUint8Array(base64String) {
	const latin1string = atob$1(base64String.replace(/-/g, "+").replace(/_/g, "/"));
	return Uint8Array.from(latin1string, (byte) => byte.codePointAt(0));
}
function convertUint8ArrayToBase64(array) {
	let latin1string = "";
	for (let i = 0; i < array.length; i++) latin1string += String.fromCodePoint(array[i]);
	return btoa$1(latin1string);
}
function convertToBase64(value) {
	return value instanceof Uint8Array ? convertUint8ArrayToBase64(value) : value;
}
function convertToFormData(input, options = {}) {
	const { useArrayBrackets = true } = options;
	const formData = new FormData();
	for (const [key, value] of Object.entries(input)) {
		if (value == null) continue;
		if (Array.isArray(value)) {
			if (value.length === 1) {
				formData.append(key, value[0]);
				continue;
			}
			const arrayKey = useArrayBrackets ? `${key}[]` : key;
			for (const item of value) formData.append(arrayKey, item);
			continue;
		}
		formData.append(key, value);
	}
	return formData;
}
var name = "AI_DownloadError";
var marker = `vercel.ai.error.${name}`;
var symbol = Symbol.for(marker);
var _a, _b;
var DownloadError = class extends (_b = AISDKError, _a = symbol, _b) {
	constructor({ url, statusCode, statusText, cause, message = cause == null ? `Failed to download ${url}: ${statusCode} ${statusText}` : `Failed to download ${url}: ${cause}` }) {
		super({
			name,
			message,
			cause
		});
		this[_a] = true;
		this.url = url;
		this.statusCode = statusCode;
		this.statusText = statusText;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker);
	}
};
var DEFAULT_MAX_DOWNLOAD_SIZE = 2 * 1024 * 1024 * 1024;
async function readResponseWithSizeLimit({ response, url, maxBytes = DEFAULT_MAX_DOWNLOAD_SIZE }) {
	const contentLength = response.headers.get("content-length");
	if (contentLength != null) {
		const length = parseInt(contentLength, 10);
		if (!isNaN(length) && length > maxBytes) throw new DownloadError({
			url,
			message: `Download of ${url} exceeded maximum size of ${maxBytes} bytes (Content-Length: ${length}).`
		});
	}
	const body = response.body;
	if (body == null) return new Uint8Array(0);
	const reader = body.getReader();
	const chunks = [];
	let totalBytes = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			totalBytes += value.length;
			if (totalBytes > maxBytes) throw new DownloadError({
				url,
				message: `Download of ${url} exceeded maximum size of ${maxBytes} bytes.`
			});
			chunks.push(value);
		}
	} finally {
		try {
			await reader.cancel();
		} finally {
			reader.releaseLock();
		}
	}
	const result = new Uint8Array(totalBytes);
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}
	return result;
}
async function downloadBlob(url, options) {
	var _a2, _b2;
	try {
		const response = await fetch(url, { signal: options == null ? void 0 : options.abortSignal });
		if (!response.ok) throw new DownloadError({
			url,
			statusCode: response.status,
			statusText: response.statusText
		});
		const data = await readResponseWithSizeLimit({
			response,
			url,
			maxBytes: (_a2 = options == null ? void 0 : options.maxBytes) != null ? _a2 : DEFAULT_MAX_DOWNLOAD_SIZE
		});
		const contentType = (_b2 = response.headers.get("content-type")) != null ? _b2 : void 0;
		return new Blob([data], contentType ? { type: contentType } : void 0);
	} catch (error) {
		if (DownloadError.isInstance(error)) throw error;
		throw new DownloadError({
			url,
			cause: error
		});
	}
}
var createIdGenerator = ({ prefix, size = 16, alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", separator = "-" } = {}) => {
	const generator = () => {
		const alphabetLength = alphabet.length;
		const chars = new Array(size);
		for (let i = 0; i < size; i++) chars[i] = alphabet[Math.random() * alphabetLength | 0];
		return chars.join("");
	};
	if (prefix == null) return generator;
	if (alphabet.includes(separator)) throw new InvalidArgumentError({
		argument: "separator",
		message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
	});
	return () => `${prefix}${separator}${generator()}`;
};
var generateId = createIdGenerator();
function getErrorMessage(error) {
	if (error == null) return "unknown error";
	if (typeof error === "string") return error;
	if (error instanceof Error) return error.message;
	return JSON.stringify(error);
}
function isAbortError(error) {
	return (error instanceof Error || error instanceof DOMException) && (error.name === "AbortError" || error.name === "ResponseAborted" || error.name === "TimeoutError");
}
var FETCH_FAILED_ERROR_MESSAGES = ["fetch failed", "failed to fetch"];
var BUN_ERROR_CODES = [
	"ConnectionRefused",
	"ConnectionClosed",
	"FailedToOpenSocket",
	"ECONNRESET",
	"ECONNREFUSED",
	"ETIMEDOUT",
	"EPIPE"
];
function isBunNetworkError(error) {
	if (!(error instanceof Error)) return false;
	const code = error.code;
	if (typeof code === "string" && BUN_ERROR_CODES.includes(code)) return true;
	return false;
}
function handleFetchError({ error, url, requestBodyValues }) {
	if (isAbortError(error)) return error;
	if (error instanceof TypeError && FETCH_FAILED_ERROR_MESSAGES.includes(error.message.toLowerCase())) {
		const cause = error.cause;
		if (cause != null) return new APICallError({
			message: `Cannot connect to API: ${cause.message}`,
			cause,
			url,
			requestBodyValues,
			isRetryable: true
		});
	}
	if (isBunNetworkError(error)) return new APICallError({
		message: `Cannot connect to API: ${error.message}`,
		cause: error,
		url,
		requestBodyValues,
		isRetryable: true
	});
	return error;
}
function getRuntimeEnvironmentUserAgent(globalThisAny = globalThis) {
	var _a2, _b2, _c;
	if (globalThisAny.window) return `runtime/browser`;
	if ((_a2 = globalThisAny.navigator) == null ? void 0 : _a2.userAgent) return `runtime/${globalThisAny.navigator.userAgent.toLowerCase()}`;
	if ((_c = (_b2 = globalThisAny.process) == null ? void 0 : _b2.versions) == null ? void 0 : _c.node) return `runtime/node.js/${globalThisAny.process.version.substring(0)}`;
	if (globalThisAny.EdgeRuntime) return `runtime/vercel-edge`;
	return "runtime/unknown";
}
function normalizeHeaders(headers) {
	if (headers == null) return {};
	const normalized = {};
	if (headers instanceof Headers) headers.forEach((value, key) => {
		normalized[key.toLowerCase()] = value;
	});
	else {
		if (!Array.isArray(headers)) headers = Object.entries(headers);
		for (const [key, value] of headers) if (value != null) normalized[key.toLowerCase()] = value;
	}
	return normalized;
}
function withUserAgentSuffix(headers, ...userAgentSuffixParts) {
	const normalizedHeaders = new Headers(normalizeHeaders(headers));
	const currentUserAgentHeader = normalizedHeaders.get("user-agent") || "";
	normalizedHeaders.set("user-agent", [currentUserAgentHeader, ...userAgentSuffixParts].filter(Boolean).join(" "));
	return Object.fromEntries(normalizedHeaders.entries());
}
var VERSION$1 = "4.0.15";
var getOriginalFetch = () => globalThis.fetch;
var getFromApi = async ({ url, headers = {}, successfulResponseHandler, failedResponseHandler, abortSignal, fetch: fetch2 = getOriginalFetch() }) => {
	try {
		const response = await fetch2(url, {
			method: "GET",
			headers: withUserAgentSuffix(headers, `ai-sdk/provider-utils/${VERSION$1}`, getRuntimeEnvironmentUserAgent()),
			signal: abortSignal
		});
		const responseHeaders = extractResponseHeaders(response);
		if (!response.ok) {
			let errorInformation;
			try {
				errorInformation = await failedResponseHandler({
					response,
					url,
					requestBodyValues: {}
				});
			} catch (error) {
				if (isAbortError(error) || APICallError.isInstance(error)) throw error;
				throw new APICallError({
					message: "Failed to process error response",
					cause: error,
					statusCode: response.status,
					url,
					responseHeaders,
					requestBodyValues: {}
				});
			}
			throw errorInformation.value;
		}
		try {
			return await successfulResponseHandler({
				response,
				url,
				requestBodyValues: {}
			});
		} catch (error) {
			if (error instanceof Error) {
				if (isAbortError(error) || APICallError.isInstance(error)) throw error;
			}
			throw new APICallError({
				message: "Failed to process successful response",
				cause: error,
				statusCode: response.status,
				url,
				responseHeaders,
				requestBodyValues: {}
			});
		}
	} catch (error) {
		throw handleFetchError({
			error,
			url,
			requestBodyValues: {}
		});
	}
};
function isNonNullable(value) {
	return value != null;
}
function isUrlSupported({ mediaType, url, supportedUrls }) {
	url = url.toLowerCase();
	mediaType = mediaType.toLowerCase();
	return Object.entries(supportedUrls).map(([key, value]) => {
		const mediaType2 = key.toLowerCase();
		return mediaType2 === "*" || mediaType2 === "*/*" ? {
			mediaTypePrefix: "",
			regexes: value
		} : {
			mediaTypePrefix: mediaType2.replace(/\*/, ""),
			regexes: value
		};
	}).filter(({ mediaTypePrefix }) => mediaType.startsWith(mediaTypePrefix)).flatMap(({ regexes }) => regexes).some((pattern) => pattern.test(url));
}
function loadApiKey({ apiKey, environmentVariableName, apiKeyParameterName = "apiKey", description }) {
	if (typeof apiKey === "string") return apiKey;
	if (apiKey != null) throw new LoadAPIKeyError({ message: `${description} API key must be a string.` });
	if (typeof process === "undefined") throw new LoadAPIKeyError({ message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter. Environment variables is not supported in this environment.` });
	apiKey = process.env[environmentVariableName];
	if (apiKey == null) throw new LoadAPIKeyError({ message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter or the ${environmentVariableName} environment variable.` });
	if (typeof apiKey !== "string") throw new LoadAPIKeyError({ message: `${description} API key must be a string. The value of the ${environmentVariableName} environment variable is not a string.` });
	return apiKey;
}
function loadOptionalSetting({ settingValue, environmentVariableName }) {
	if (typeof settingValue === "string") return settingValue;
	if (settingValue != null || typeof process === "undefined") return;
	settingValue = process.env[environmentVariableName];
	if (settingValue == null || typeof settingValue !== "string") return;
	return settingValue;
}
function mediaTypeToExtension(mediaType) {
	var _a2;
	const [_type, subtype = ""] = mediaType.toLowerCase().split("/");
	return (_a2 = {
		mpeg: "mp3",
		"x-wav": "wav",
		opus: "ogg",
		mp4: "m4a",
		"x-m4a": "m4a"
	}[subtype]) != null ? _a2 : subtype;
}
var suspectProtoRx = /"__proto__"\s*:/;
var suspectConstructorRx = /"constructor"\s*:/;
function _parse(text) {
	const obj = JSON.parse(text);
	if (obj === null || typeof obj !== "object") return obj;
	if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) return obj;
	return filter(obj);
}
function filter(obj) {
	let next = [obj];
	while (next.length) {
		const nodes = next;
		next = [];
		for (const node of nodes) {
			if (Object.prototype.hasOwnProperty.call(node, "__proto__")) throw new SyntaxError("Object contains forbidden prototype property");
			if (Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) throw new SyntaxError("Object contains forbidden prototype property");
			for (const key in node) {
				const value = node[key];
				if (value && typeof value === "object") next.push(value);
			}
		}
	}
	return obj;
}
function secureJsonParse(text) {
	const { stackTraceLimit } = Error;
	try {
		Error.stackTraceLimit = 0;
	} catch (e) {
		return _parse(text);
	}
	try {
		return _parse(text);
	} finally {
		Error.stackTraceLimit = stackTraceLimit;
	}
}
function addAdditionalPropertiesToJsonSchema(jsonSchema2) {
	if (jsonSchema2.type === "object" || Array.isArray(jsonSchema2.type) && jsonSchema2.type.includes("object")) {
		jsonSchema2.additionalProperties = false;
		const { properties } = jsonSchema2;
		if (properties != null) for (const key of Object.keys(properties)) properties[key] = visit(properties[key]);
	}
	if (jsonSchema2.items != null) jsonSchema2.items = Array.isArray(jsonSchema2.items) ? jsonSchema2.items.map(visit) : visit(jsonSchema2.items);
	if (jsonSchema2.anyOf != null) jsonSchema2.anyOf = jsonSchema2.anyOf.map(visit);
	if (jsonSchema2.allOf != null) jsonSchema2.allOf = jsonSchema2.allOf.map(visit);
	if (jsonSchema2.oneOf != null) jsonSchema2.oneOf = jsonSchema2.oneOf.map(visit);
	const { definitions } = jsonSchema2;
	if (definitions != null) for (const key of Object.keys(definitions)) definitions[key] = visit(definitions[key]);
	return jsonSchema2;
}
function visit(def) {
	if (typeof def === "boolean") return def;
	return addAdditionalPropertiesToJsonSchema(def);
}
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
	name: void 0,
	$refStrategy: "root",
	basePath: ["#"],
	effectStrategy: "input",
	pipeStrategy: "all",
	dateStrategy: "format:date-time",
	mapStrategy: "entries",
	removeAdditionalStrategy: "passthrough",
	allowedAdditionalProperties: true,
	rejectedAdditionalProperties: false,
	definitionPath: "definitions",
	strictUnions: false,
	definitions: {},
	errorMessages: false,
	patternStrategy: "escape",
	applyRegexFlags: false,
	emailStrategy: "format:email",
	base64Strategy: "contentEncoding:base64",
	nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
	...defaultOptions,
	name: options
} : {
	...defaultOptions,
	...options
};
function parseAnyDef() {
	return {};
}
function parseArrayDef(def, refs) {
	var _a2, _b2, _c;
	const res = { type: "array" };
	if (((_a2 = def.type) == null ? void 0 : _a2._def) && ((_c = (_b2 = def.type) == null ? void 0 : _b2._def) == null ? void 0 : _c.typeName) !== ZodFirstPartyTypeKind.ZodAny) res.items = parseDef(def.type._def, {
		...refs,
		currentPath: [...refs.currentPath, "items"]
	});
	if (def.minLength) res.minItems = def.minLength.value;
	if (def.maxLength) res.maxItems = def.maxLength.value;
	if (def.exactLength) {
		res.minItems = def.exactLength.value;
		res.maxItems = def.exactLength.value;
	}
	return res;
}
function parseBigintDef(def) {
	const res = {
		type: "integer",
		format: "int64"
	};
	if (!def.checks) return res;
	for (const check of def.checks) switch (check.kind) {
		case "min":
			if (check.inclusive) res.minimum = check.value;
			else res.exclusiveMinimum = check.value;
			break;
		case "max":
			if (check.inclusive) res.maximum = check.value;
			else res.exclusiveMaximum = check.value;
			break;
		case "multipleOf":
			res.multipleOf = check.value;
			break;
	}
	return res;
}
function parseBooleanDef() {
	return { type: "boolean" };
}
function parseBrandedDef(_def, refs) {
	return parseDef(_def.type._def, refs);
}
var parseCatchDef = (def, refs) => {
	return parseDef(def.innerType._def, refs);
};
function parseDateDef(def, refs, overrideDateStrategy) {
	const strategy = overrideDateStrategy != null ? overrideDateStrategy : refs.dateStrategy;
	if (Array.isArray(strategy)) return { anyOf: strategy.map((item, i) => parseDateDef(def, refs, item)) };
	switch (strategy) {
		case "string":
		case "format:date-time": return {
			type: "string",
			format: "date-time"
		};
		case "format:date": return {
			type: "string",
			format: "date"
		};
		case "integer": return integerDateParser(def);
	}
}
var integerDateParser = (def) => {
	const res = {
		type: "integer",
		format: "unix-time"
	};
	for (const check of def.checks) switch (check.kind) {
		case "min":
			res.minimum = check.value;
			break;
		case "max":
			res.maximum = check.value;
			break;
	}
	return res;
};
function parseDefaultDef(_def, refs) {
	return {
		...parseDef(_def.innerType._def, refs),
		default: _def.defaultValue()
	};
}
function parseEffectsDef(_def, refs) {
	return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : parseAnyDef();
}
function parseEnumDef(def) {
	return {
		type: "string",
		enum: Array.from(def.values)
	};
}
var isJsonSchema7AllOfType = (type) => {
	if ("type" in type && type.type === "string") return false;
	return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
	const allOf = [parseDef(def.left._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			"0"
		]
	}), parseDef(def.right._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			"1"
		]
	})].filter((x) => !!x);
	const mergedAllOf = [];
	allOf.forEach((schema) => {
		if (isJsonSchema7AllOfType(schema)) mergedAllOf.push(...schema.allOf);
		else {
			let nestedSchema = schema;
			if ("additionalProperties" in schema && schema.additionalProperties === false) {
				const { additionalProperties, ...rest } = schema;
				nestedSchema = rest;
			}
			mergedAllOf.push(nestedSchema);
		}
	});
	return mergedAllOf.length ? { allOf: mergedAllOf } : void 0;
}
function parseLiteralDef(def) {
	const parsedType = typeof def.value;
	if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") return { type: Array.isArray(def.value) ? "array" : "object" };
	return {
		type: parsedType === "bigint" ? "integer" : parsedType,
		const: def.value
	};
}
var emojiRegex = void 0;
var zodPatterns = {
	cuid: /^[cC][^\s-]{8,}$/,
	cuid2: /^[0-9a-z]+$/,
	ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
	email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
	emoji: () => {
		if (emojiRegex === void 0) emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
		return emojiRegex;
	},
	uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
	ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
	ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	nanoid: /^[a-zA-Z0-9_-]{21}$/,
	jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
	const res = { type: "string" };
	if (def.checks) for (const check of def.checks) switch (check.kind) {
		case "min":
			res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value;
			break;
		case "max":
			res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value;
			break;
		case "email":
			switch (refs.emailStrategy) {
				case "format:email":
					addFormat(res, "email", check.message, refs);
					break;
				case "format:idn-email":
					addFormat(res, "idn-email", check.message, refs);
					break;
				case "pattern:zod":
					addPattern(res, zodPatterns.email, check.message, refs);
					break;
			}
			break;
		case "url":
			addFormat(res, "uri", check.message, refs);
			break;
		case "uuid":
			addFormat(res, "uuid", check.message, refs);
			break;
		case "regex":
			addPattern(res, check.regex, check.message, refs);
			break;
		case "cuid":
			addPattern(res, zodPatterns.cuid, check.message, refs);
			break;
		case "cuid2":
			addPattern(res, zodPatterns.cuid2, check.message, refs);
			break;
		case "startsWith":
			addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
			break;
		case "endsWith":
			addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
			break;
		case "datetime":
			addFormat(res, "date-time", check.message, refs);
			break;
		case "date":
			addFormat(res, "date", check.message, refs);
			break;
		case "time":
			addFormat(res, "time", check.message, refs);
			break;
		case "duration":
			addFormat(res, "duration", check.message, refs);
			break;
		case "length":
			res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value;
			res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value;
			break;
		case "includes":
			addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
			break;
		case "ip":
			if (check.version !== "v6") addFormat(res, "ipv4", check.message, refs);
			if (check.version !== "v4") addFormat(res, "ipv6", check.message, refs);
			break;
		case "base64url":
			addPattern(res, zodPatterns.base64url, check.message, refs);
			break;
		case "jwt":
			addPattern(res, zodPatterns.jwt, check.message, refs);
			break;
		case "cidr":
			if (check.version !== "v6") addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
			if (check.version !== "v4") addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
			break;
		case "emoji":
			addPattern(res, zodPatterns.emoji(), check.message, refs);
			break;
		case "ulid":
			addPattern(res, zodPatterns.ulid, check.message, refs);
			break;
		case "base64":
			switch (refs.base64Strategy) {
				case "format:binary":
					addFormat(res, "binary", check.message, refs);
					break;
				case "contentEncoding:base64":
					res.contentEncoding = "base64";
					break;
				case "pattern:zod":
					addPattern(res, zodPatterns.base64, check.message, refs);
					break;
			}
			break;
		case "nanoid": addPattern(res, zodPatterns.nanoid, check.message, refs);
		case "toLowerCase":
		case "toUpperCase":
		case "trim": break;
		default:
	}
	return res;
}
function escapeLiteralCheckValue(literal, refs) {
	return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
var ALPHA_NUMERIC = /* @__PURE__ */ new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
	let result = "";
	for (let i = 0; i < source.length; i++) {
		if (!ALPHA_NUMERIC.has(source[i])) result += "\\";
		result += source[i];
	}
	return result;
}
function addFormat(schema, value, message, refs) {
	var _a2;
	if (schema.format || ((_a2 = schema.anyOf) == null ? void 0 : _a2.some((x) => x.format))) {
		if (!schema.anyOf) schema.anyOf = [];
		if (schema.format) {
			schema.anyOf.push({ format: schema.format });
			delete schema.format;
		}
		schema.anyOf.push({
			format: value,
			...message && refs.errorMessages && { errorMessage: { format: message } }
		});
	} else schema.format = value;
}
function addPattern(schema, regex, message, refs) {
	var _a2;
	if (schema.pattern || ((_a2 = schema.allOf) == null ? void 0 : _a2.some((x) => x.pattern))) {
		if (!schema.allOf) schema.allOf = [];
		if (schema.pattern) {
			schema.allOf.push({ pattern: schema.pattern });
			delete schema.pattern;
		}
		schema.allOf.push({
			pattern: stringifyRegExpWithFlags(regex, refs),
			...message && refs.errorMessages && { errorMessage: { pattern: message } }
		});
	} else schema.pattern = stringifyRegExpWithFlags(regex, refs);
}
function stringifyRegExpWithFlags(regex, refs) {
	var _a2;
	if (!refs.applyRegexFlags || !regex.flags) return regex.source;
	const flags = {
		i: regex.flags.includes("i"),
		m: regex.flags.includes("m"),
		s: regex.flags.includes("s")
	};
	const source = flags.i ? regex.source.toLowerCase() : regex.source;
	let pattern = "";
	let isEscaped = false;
	let inCharGroup = false;
	let inCharRange = false;
	for (let i = 0; i < source.length; i++) {
		if (isEscaped) {
			pattern += source[i];
			isEscaped = false;
			continue;
		}
		if (flags.i) {
			if (inCharGroup) {
				if (source[i].match(/[a-z]/)) {
					if (inCharRange) {
						pattern += source[i];
						pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
						inCharRange = false;
					} else if (source[i + 1] === "-" && ((_a2 = source[i + 2]) == null ? void 0 : _a2.match(/[a-z]/))) {
						pattern += source[i];
						inCharRange = true;
					} else pattern += `${source[i]}${source[i].toUpperCase()}`;
					continue;
				}
			} else if (source[i].match(/[a-z]/)) {
				pattern += `[${source[i]}${source[i].toUpperCase()}]`;
				continue;
			}
		}
		if (flags.m) {
			if (source[i] === "^") {
				pattern += `(^|(?<=[\r
]))`;
				continue;
			} else if (source[i] === "$") {
				pattern += `($|(?=[\r
]))`;
				continue;
			}
		}
		if (flags.s && source[i] === ".") {
			pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
			continue;
		}
		pattern += source[i];
		if (source[i] === "\\") isEscaped = true;
		else if (inCharGroup && source[i] === "]") inCharGroup = false;
		else if (!inCharGroup && source[i] === "[") inCharGroup = true;
	}
	try {
		new RegExp(pattern);
	} catch (e) {
		console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
		return regex.source;
	}
	return pattern;
}
function parseRecordDef(def, refs) {
	var _a2, _b2, _c, _d, _e, _f;
	const schema = {
		type: "object",
		additionalProperties: (_a2 = parseDef(def.valueType._def, {
			...refs,
			currentPath: [...refs.currentPath, "additionalProperties"]
		})) != null ? _a2 : refs.allowedAdditionalProperties
	};
	if (((_b2 = def.keyType) == null ? void 0 : _b2._def.typeName) === ZodFirstPartyTypeKind.ZodString && ((_c = def.keyType._def.checks) == null ? void 0 : _c.length)) {
		const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
		return {
			...schema,
			propertyNames: keyType
		};
	} else if (((_d = def.keyType) == null ? void 0 : _d._def.typeName) === ZodFirstPartyTypeKind.ZodEnum) return {
		...schema,
		propertyNames: { enum: def.keyType._def.values }
	};
	else if (((_e = def.keyType) == null ? void 0 : _e._def.typeName) === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && ((_f = def.keyType._def.type._def.checks) == null ? void 0 : _f.length)) {
		const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
		return {
			...schema,
			propertyNames: keyType
		};
	}
	return schema;
}
function parseMapDef(def, refs) {
	if (refs.mapStrategy === "record") return parseRecordDef(def, refs);
	return {
		type: "array",
		maxItems: 125,
		items: {
			type: "array",
			items: [parseDef(def.keyType._def, {
				...refs,
				currentPath: [
					...refs.currentPath,
					"items",
					"items",
					"0"
				]
			}) || parseAnyDef(), parseDef(def.valueType._def, {
				...refs,
				currentPath: [
					...refs.currentPath,
					"items",
					"items",
					"1"
				]
			}) || parseAnyDef()],
			minItems: 2,
			maxItems: 2
		}
	};
}
function parseNativeEnumDef(def) {
	const object = def.values;
	const actualValues = Object.keys(def.values).filter((key) => {
		return typeof object[object[key]] !== "number";
	}).map((key) => object[key]);
	const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
	return {
		type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
		enum: actualValues
	};
}
function parseNeverDef() {
	return { not: parseAnyDef() };
}
function parseNullDef() {
	return { type: "null" };
}
var primitiveMappings = {
	ZodString: "string",
	ZodNumber: "number",
	ZodBigInt: "integer",
	ZodBoolean: "boolean",
	ZodNull: "null"
};
function parseUnionDef(def, refs) {
	const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
	if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
		const types = options.reduce((types2, x) => {
			const type = primitiveMappings[x._def.typeName];
			return type && !types2.includes(type) ? [...types2, type] : types2;
		}, []);
		return { type: types.length > 1 ? types : types[0] };
	} else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
		const types = options.reduce((acc, x) => {
			const type = typeof x._def.value;
			switch (type) {
				case "string":
				case "number":
				case "boolean": return [...acc, type];
				case "bigint": return [...acc, "integer"];
				case "object": if (x._def.value === null) return [...acc, "null"];
				default: return acc;
			}
		}, []);
		if (types.length === options.length) {
			const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
			return {
				type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
				enum: options.reduce((acc, x) => {
					return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
				}, [])
			};
		}
	} else if (options.every((x) => x._def.typeName === "ZodEnum")) return {
		type: "string",
		enum: options.reduce((acc, x) => [...acc, ...x._def.values.filter((x2) => !acc.includes(x2))], [])
	};
	return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
	const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"anyOf",
			`${i}`
		]
	})).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
	return anyOf.length ? { anyOf } : void 0;
};
function parseNullableDef(def, refs) {
	if ([
		"ZodString",
		"ZodNumber",
		"ZodBigInt",
		"ZodBoolean",
		"ZodNull"
	].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) return { type: [primitiveMappings[def.innerType._def.typeName], "null"] };
	const base = parseDef(def.innerType._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"anyOf",
			"0"
		]
	});
	return base && { anyOf: [base, { type: "null" }] };
}
function parseNumberDef(def) {
	const res = { type: "number" };
	if (!def.checks) return res;
	for (const check of def.checks) switch (check.kind) {
		case "int":
			res.type = "integer";
			break;
		case "min":
			if (check.inclusive) res.minimum = check.value;
			else res.exclusiveMinimum = check.value;
			break;
		case "max":
			if (check.inclusive) res.maximum = check.value;
			else res.exclusiveMaximum = check.value;
			break;
		case "multipleOf":
			res.multipleOf = check.value;
			break;
	}
	return res;
}
function parseObjectDef(def, refs) {
	const result = {
		type: "object",
		properties: {}
	};
	const required = [];
	const shape = def.shape();
	for (const propName in shape) {
		let propDef = shape[propName];
		if (propDef === void 0 || propDef._def === void 0) continue;
		const propOptional = safeIsOptional(propDef);
		const parsedDef = parseDef(propDef._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"properties",
				propName
			],
			propertyPath: [
				...refs.currentPath,
				"properties",
				propName
			]
		});
		if (parsedDef === void 0) continue;
		result.properties[propName] = parsedDef;
		if (!propOptional) required.push(propName);
	}
	if (required.length) result.required = required;
	const additionalProperties = decideAdditionalProperties(def, refs);
	if (additionalProperties !== void 0) result.additionalProperties = additionalProperties;
	return result;
}
function decideAdditionalProperties(def, refs) {
	if (def.catchall._def.typeName !== "ZodNever") return parseDef(def.catchall._def, {
		...refs,
		currentPath: [...refs.currentPath, "additionalProperties"]
	});
	switch (def.unknownKeys) {
		case "passthrough": return refs.allowedAdditionalProperties;
		case "strict": return refs.rejectedAdditionalProperties;
		case "strip": return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
	}
}
function safeIsOptional(schema) {
	try {
		return schema.isOptional();
	} catch (e) {
		return true;
	}
}
var parseOptionalDef = (def, refs) => {
	var _a2;
	if (refs.currentPath.toString() === ((_a2 = refs.propertyPath) == null ? void 0 : _a2.toString())) return parseDef(def.innerType._def, refs);
	const innerSchema = parseDef(def.innerType._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"anyOf",
			"1"
		]
	});
	return innerSchema ? { anyOf: [{ not: parseAnyDef() }, innerSchema] } : parseAnyDef();
};
var parsePipelineDef = (def, refs) => {
	if (refs.pipeStrategy === "input") return parseDef(def.in._def, refs);
	else if (refs.pipeStrategy === "output") return parseDef(def.out._def, refs);
	const a = parseDef(def.in._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			"0"
		]
	});
	return { allOf: [a, parseDef(def.out._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			a ? "1" : "0"
		]
	})].filter((x) => x !== void 0) };
};
function parsePromiseDef(def, refs) {
	return parseDef(def.type._def, refs);
}
function parseSetDef(def, refs) {
	const schema = {
		type: "array",
		uniqueItems: true,
		items: parseDef(def.valueType._def, {
			...refs,
			currentPath: [...refs.currentPath, "items"]
		})
	};
	if (def.minSize) schema.minItems = def.minSize.value;
	if (def.maxSize) schema.maxItems = def.maxSize.value;
	return schema;
}
function parseTupleDef(def, refs) {
	if (def.rest) return {
		type: "array",
		minItems: def.items.length,
		items: def.items.map((x, i) => parseDef(x._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"items",
				`${i}`
			]
		})).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
		additionalItems: parseDef(def.rest._def, {
			...refs,
			currentPath: [...refs.currentPath, "additionalItems"]
		})
	};
	else return {
		type: "array",
		minItems: def.items.length,
		maxItems: def.items.length,
		items: def.items.map((x, i) => parseDef(x._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"items",
				`${i}`
			]
		})).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
	};
}
function parseUndefinedDef() {
	return { not: parseAnyDef() };
}
function parseUnknownDef() {
	return parseAnyDef();
}
var parseReadonlyDef = (def, refs) => {
	return parseDef(def.innerType._def, refs);
};
var selectParser = (def, typeName, refs) => {
	switch (typeName) {
		case ZodFirstPartyTypeKind.ZodString: return parseStringDef(def, refs);
		case ZodFirstPartyTypeKind.ZodNumber: return parseNumberDef(def);
		case ZodFirstPartyTypeKind.ZodObject: return parseObjectDef(def, refs);
		case ZodFirstPartyTypeKind.ZodBigInt: return parseBigintDef(def);
		case ZodFirstPartyTypeKind.ZodBoolean: return parseBooleanDef();
		case ZodFirstPartyTypeKind.ZodDate: return parseDateDef(def, refs);
		case ZodFirstPartyTypeKind.ZodUndefined: return parseUndefinedDef();
		case ZodFirstPartyTypeKind.ZodNull: return parseNullDef();
		case ZodFirstPartyTypeKind.ZodArray: return parseArrayDef(def, refs);
		case ZodFirstPartyTypeKind.ZodUnion:
		case ZodFirstPartyTypeKind.ZodDiscriminatedUnion: return parseUnionDef(def, refs);
		case ZodFirstPartyTypeKind.ZodIntersection: return parseIntersectionDef(def, refs);
		case ZodFirstPartyTypeKind.ZodTuple: return parseTupleDef(def, refs);
		case ZodFirstPartyTypeKind.ZodRecord: return parseRecordDef(def, refs);
		case ZodFirstPartyTypeKind.ZodLiteral: return parseLiteralDef(def);
		case ZodFirstPartyTypeKind.ZodEnum: return parseEnumDef(def);
		case ZodFirstPartyTypeKind.ZodNativeEnum: return parseNativeEnumDef(def);
		case ZodFirstPartyTypeKind.ZodNullable: return parseNullableDef(def, refs);
		case ZodFirstPartyTypeKind.ZodOptional: return parseOptionalDef(def, refs);
		case ZodFirstPartyTypeKind.ZodMap: return parseMapDef(def, refs);
		case ZodFirstPartyTypeKind.ZodSet: return parseSetDef(def, refs);
		case ZodFirstPartyTypeKind.ZodLazy: return () => def.getter()._def;
		case ZodFirstPartyTypeKind.ZodPromise: return parsePromiseDef(def, refs);
		case ZodFirstPartyTypeKind.ZodNaN:
		case ZodFirstPartyTypeKind.ZodNever: return parseNeverDef();
		case ZodFirstPartyTypeKind.ZodEffects: return parseEffectsDef(def, refs);
		case ZodFirstPartyTypeKind.ZodAny: return parseAnyDef();
		case ZodFirstPartyTypeKind.ZodUnknown: return parseUnknownDef();
		case ZodFirstPartyTypeKind.ZodDefault: return parseDefaultDef(def, refs);
		case ZodFirstPartyTypeKind.ZodBranded: return parseBrandedDef(def, refs);
		case ZodFirstPartyTypeKind.ZodReadonly: return parseReadonlyDef(def, refs);
		case ZodFirstPartyTypeKind.ZodCatch: return parseCatchDef(def, refs);
		case ZodFirstPartyTypeKind.ZodPipeline: return parsePipelineDef(def, refs);
		case ZodFirstPartyTypeKind.ZodFunction:
		case ZodFirstPartyTypeKind.ZodVoid:
		case ZodFirstPartyTypeKind.ZodSymbol: return;
		default: return /* @__PURE__ */ ((_) => void 0)(typeName);
	}
};
var getRelativePath = (pathA, pathB) => {
	let i = 0;
	for (; i < pathA.length && i < pathB.length; i++) if (pathA[i] !== pathB[i]) break;
	return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
function parseDef(def, refs, forceResolution = false) {
	var _a2;
	const seenItem = refs.seen.get(def);
	if (refs.override) {
		const overrideResult = (_a2 = refs.override) == null ? void 0 : _a2.call(refs, def, refs, seenItem, forceResolution);
		if (overrideResult !== ignoreOverride) return overrideResult;
	}
	if (seenItem && !forceResolution) {
		const seenSchema = get$ref(seenItem, refs);
		if (seenSchema !== void 0) return seenSchema;
	}
	const newItem = {
		def,
		path: refs.currentPath,
		jsonSchema: void 0
	};
	refs.seen.set(def, newItem);
	const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
	const jsonSchema2 = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
	if (jsonSchema2) addMeta(def, refs, jsonSchema2);
	if (refs.postProcess) {
		const postProcessResult = refs.postProcess(jsonSchema2, def, refs);
		newItem.jsonSchema = jsonSchema2;
		return postProcessResult;
	}
	newItem.jsonSchema = jsonSchema2;
	return jsonSchema2;
}
var get$ref = (item, refs) => {
	switch (refs.$refStrategy) {
		case "root": return { $ref: item.path.join("/") };
		case "relative": return { $ref: getRelativePath(refs.currentPath, item.path) };
		case "none":
		case "seen":
			if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
				console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
				return parseAnyDef();
			}
			return refs.$refStrategy === "seen" ? parseAnyDef() : void 0;
	}
};
var addMeta = (def, refs, jsonSchema2) => {
	if (def.description) jsonSchema2.description = def.description;
	return jsonSchema2;
};
var getRefs = (options) => {
	const _options = getDefaultOptions(options);
	const currentPath = _options.name !== void 0 ? [
		..._options.basePath,
		_options.definitionPath,
		_options.name
	] : _options.basePath;
	return {
		..._options,
		currentPath,
		propertyPath: void 0,
		seen: new Map(Object.entries(_options.definitions).map(([name2, def]) => [def._def, {
			def: def._def,
			path: [
				..._options.basePath,
				_options.definitionPath,
				name2
			],
			jsonSchema: void 0
		}]))
	};
};
var zod3ToJsonSchema = (schema, options) => {
	var _a2;
	const refs = getRefs(options);
	let definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name3, schema2]) => {
		var _a3;
		return {
			...acc,
			[name3]: (_a3 = parseDef(schema2._def, {
				...refs,
				currentPath: [
					...refs.basePath,
					refs.definitionPath,
					name3
				]
			}, true)) != null ? _a3 : parseAnyDef()
		};
	}, {}) : void 0;
	const name2 = typeof options === "string" ? options : (options == null ? void 0 : options.nameStrategy) === "title" ? void 0 : options == null ? void 0 : options.name;
	const main = (_a2 = parseDef(schema._def, name2 === void 0 ? refs : {
		...refs,
		currentPath: [
			...refs.basePath,
			refs.definitionPath,
			name2
		]
	}, false)) != null ? _a2 : parseAnyDef();
	const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
	if (title !== void 0) main.title = title;
	const combined = name2 === void 0 ? definitions ? {
		...main,
		[refs.definitionPath]: definitions
	} : main : {
		$ref: [
			...refs.$refStrategy === "relative" ? [] : refs.basePath,
			refs.definitionPath,
			name2
		].join("/"),
		[refs.definitionPath]: {
			...definitions,
			[name2]: main
		}
	};
	combined.$schema = "http://json-schema.org/draft-07/schema#";
	return combined;
};
var schemaSymbol = Symbol.for("vercel.ai.schema");
function lazySchema(createSchema) {
	let schema;
	return () => {
		if (schema == null) schema = createSchema();
		return schema;
	};
}
function jsonSchema(jsonSchema2, { validate } = {}) {
	return {
		[schemaSymbol]: true,
		_type: void 0,
		get jsonSchema() {
			if (typeof jsonSchema2 === "function") jsonSchema2 = jsonSchema2();
			return jsonSchema2;
		},
		validate
	};
}
function isSchema(value) {
	return typeof value === "object" && value !== null && schemaSymbol in value && value[schemaSymbol] === true && "jsonSchema" in value && "validate" in value;
}
function asSchema(schema) {
	return schema == null ? jsonSchema({
		properties: {},
		additionalProperties: false
	}) : isSchema(schema) ? schema : "~standard" in schema ? schema["~standard"].vendor === "zod" ? zodSchema(schema) : standardSchema(schema) : schema();
}
function standardSchema(standardSchema2) {
	return jsonSchema(() => addAdditionalPropertiesToJsonSchema(standardSchema2["~standard"].jsonSchema.input({ target: "draft-07" })), { validate: async (value) => {
		const result = await standardSchema2["~standard"].validate(value);
		return "value" in result ? {
			success: true,
			value: result.value
		} : {
			success: false,
			error: new TypeValidationError({
				value,
				cause: result.issues
			})
		};
	} });
}
function zod3Schema(zodSchema2, options) {
	var _a2;
	const useReferences = (_a2 = options == null ? void 0 : options.useReferences) != null ? _a2 : false;
	return jsonSchema(() => zod3ToJsonSchema(zodSchema2, { $refStrategy: useReferences ? "root" : "none" }), { validate: async (value) => {
		const result = await zodSchema2.safeParseAsync(value);
		return result.success ? {
			success: true,
			value: result.data
		} : {
			success: false,
			error: result.error
		};
	} });
}
function zod4Schema(zodSchema2, options) {
	var _a2;
	const useReferences = (_a2 = options == null ? void 0 : options.useReferences) != null ? _a2 : false;
	return jsonSchema(() => addAdditionalPropertiesToJsonSchema(toJSONSchema(zodSchema2, {
		target: "draft-7",
		io: "input",
		reused: useReferences ? "ref" : "inline"
	})), { validate: async (value) => {
		const result = await safeParseAsync(zodSchema2, value);
		return result.success ? {
			success: true,
			value: result.data
		} : {
			success: false,
			error: result.error
		};
	} });
}
function isZod4Schema(zodSchema2) {
	return "_zod" in zodSchema2;
}
function zodSchema(zodSchema2, options) {
	if (isZod4Schema(zodSchema2)) return zod4Schema(zodSchema2, options);
	else return zod3Schema(zodSchema2, options);
}
async function validateTypes({ value, schema, context }) {
	const result = await safeValidateTypes({
		value,
		schema,
		context
	});
	if (!result.success) throw TypeValidationError.wrap({
		value,
		cause: result.error,
		context
	});
	return result.value;
}
async function safeValidateTypes({ value, schema, context }) {
	const actualSchema = asSchema(schema);
	try {
		if (actualSchema.validate == null) return {
			success: true,
			value,
			rawValue: value
		};
		const result = await actualSchema.validate(value);
		if (result.success) return {
			success: true,
			value: result.value,
			rawValue: value
		};
		return {
			success: false,
			error: TypeValidationError.wrap({
				value,
				cause: result.error,
				context
			}),
			rawValue: value
		};
	} catch (error) {
		return {
			success: false,
			error: TypeValidationError.wrap({
				value,
				cause: error,
				context
			}),
			rawValue: value
		};
	}
}
async function parseJSON({ text, schema }) {
	try {
		const value = secureJsonParse(text);
		if (schema == null) return value;
		return validateTypes({
			value,
			schema
		});
	} catch (error) {
		if (JSONParseError.isInstance(error) || TypeValidationError.isInstance(error)) throw error;
		throw new JSONParseError({
			text,
			cause: error
		});
	}
}
async function safeParseJSON({ text, schema }) {
	try {
		const value = secureJsonParse(text);
		if (schema == null) return {
			success: true,
			value,
			rawValue: value
		};
		return await safeValidateTypes({
			value,
			schema
		});
	} catch (error) {
		return {
			success: false,
			error: JSONParseError.isInstance(error) ? error : new JSONParseError({
				text,
				cause: error
			}),
			rawValue: void 0
		};
	}
}
function isParsableJson(input) {
	try {
		secureJsonParse(input);
		return true;
	} catch (e) {
		return false;
	}
}
function parseJsonEventStream({ stream, schema }) {
	return stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).pipeThrough(new TransformStream({ async transform({ data }, controller) {
		if (data === "[DONE]") return;
		controller.enqueue(await safeParseJSON({
			text: data,
			schema
		}));
	} }));
}
async function parseProviderOptions({ provider, providerOptions, schema }) {
	if ((providerOptions == null ? void 0 : providerOptions[provider]) == null) return;
	const parsedProviderOptions = await safeValidateTypes({
		value: providerOptions[provider],
		schema
	});
	if (!parsedProviderOptions.success) throw new InvalidArgumentError({
		argument: "providerOptions",
		message: `invalid ${provider} provider options`,
		cause: parsedProviderOptions.error
	});
	return parsedProviderOptions.value;
}
var getOriginalFetch2 = () => globalThis.fetch;
var postJsonToApi = async ({ url, headers, body, failedResponseHandler, successfulResponseHandler, abortSignal, fetch: fetch2 }) => postToApi({
	url,
	headers: {
		"Content-Type": "application/json",
		...headers
	},
	body: {
		content: JSON.stringify(body),
		values: body
	},
	failedResponseHandler,
	successfulResponseHandler,
	abortSignal,
	fetch: fetch2
});
var postFormDataToApi = async ({ url, headers, formData, failedResponseHandler, successfulResponseHandler, abortSignal, fetch: fetch2 }) => postToApi({
	url,
	headers,
	body: {
		content: formData,
		values: Object.fromEntries(formData.entries())
	},
	failedResponseHandler,
	successfulResponseHandler,
	abortSignal,
	fetch: fetch2
});
var postToApi = async ({ url, headers = {}, body, successfulResponseHandler, failedResponseHandler, abortSignal, fetch: fetch2 = getOriginalFetch2() }) => {
	try {
		const response = await fetch2(url, {
			method: "POST",
			headers: withUserAgentSuffix(headers, `ai-sdk/provider-utils/${VERSION$1}`, getRuntimeEnvironmentUserAgent()),
			body: body.content,
			signal: abortSignal
		});
		const responseHeaders = extractResponseHeaders(response);
		if (!response.ok) {
			let errorInformation;
			try {
				errorInformation = await failedResponseHandler({
					response,
					url,
					requestBodyValues: body.values
				});
			} catch (error) {
				if (isAbortError(error) || APICallError.isInstance(error)) throw error;
				throw new APICallError({
					message: "Failed to process error response",
					cause: error,
					statusCode: response.status,
					url,
					responseHeaders,
					requestBodyValues: body.values
				});
			}
			throw errorInformation.value;
		}
		try {
			return await successfulResponseHandler({
				response,
				url,
				requestBodyValues: body.values
			});
		} catch (error) {
			if (error instanceof Error) {
				if (isAbortError(error) || APICallError.isInstance(error)) throw error;
			}
			throw new APICallError({
				message: "Failed to process successful response",
				cause: error,
				statusCode: response.status,
				url,
				responseHeaders,
				requestBodyValues: body.values
			});
		}
	} catch (error) {
		throw handleFetchError({
			error,
			url,
			requestBodyValues: body.values
		});
	}
};
function tool(tool2) {
	return tool2;
}
function createProviderToolFactory({ id, inputSchema }) {
	return ({ execute, outputSchema, needsApproval, toModelOutput, onInputStart, onInputDelta, onInputAvailable, ...args }) => tool({
		type: "provider",
		id,
		args,
		inputSchema,
		outputSchema,
		execute,
		needsApproval,
		toModelOutput,
		onInputStart,
		onInputDelta,
		onInputAvailable
	});
}
function createProviderToolFactoryWithOutputSchema({ id, inputSchema, outputSchema, supportsDeferredResults }) {
	return ({ execute, needsApproval, toModelOutput, onInputStart, onInputDelta, onInputAvailable, ...args }) => tool({
		type: "provider",
		id,
		args,
		inputSchema,
		outputSchema,
		execute,
		needsApproval,
		toModelOutput,
		onInputStart,
		onInputDelta,
		onInputAvailable,
		supportsDeferredResults
	});
}
async function resolve(value) {
	if (typeof value === "function") value = value();
	return Promise.resolve(value);
}
var createJsonErrorResponseHandler = ({ errorSchema, errorToMessage, isRetryable }) => async ({ response, url, requestBodyValues }) => {
	const responseBody = await response.text();
	const responseHeaders = extractResponseHeaders(response);
	if (responseBody.trim() === "") return {
		responseHeaders,
		value: new APICallError({
			message: response.statusText,
			url,
			requestBodyValues,
			statusCode: response.status,
			responseHeaders,
			responseBody,
			isRetryable: isRetryable == null ? void 0 : isRetryable(response)
		})
	};
	try {
		const parsedError = await parseJSON({
			text: responseBody,
			schema: errorSchema
		});
		return {
			responseHeaders,
			value: new APICallError({
				message: errorToMessage(parsedError),
				url,
				requestBodyValues,
				statusCode: response.status,
				responseHeaders,
				responseBody,
				data: parsedError,
				isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
			})
		};
	} catch (parseError) {
		return {
			responseHeaders,
			value: new APICallError({
				message: response.statusText,
				url,
				requestBodyValues,
				statusCode: response.status,
				responseHeaders,
				responseBody,
				isRetryable: isRetryable == null ? void 0 : isRetryable(response)
			})
		};
	}
};
var createEventSourceResponseHandler = (chunkSchema) => async ({ response }) => {
	const responseHeaders = extractResponseHeaders(response);
	if (response.body == null) throw new EmptyResponseBodyError({});
	return {
		responseHeaders,
		value: parseJsonEventStream({
			stream: response.body,
			schema: chunkSchema
		})
	};
};
var createJsonResponseHandler = (responseSchema) => async ({ response, url, requestBodyValues }) => {
	const responseBody = await response.text();
	const parsedResult = await safeParseJSON({
		text: responseBody,
		schema: responseSchema
	});
	const responseHeaders = extractResponseHeaders(response);
	if (!parsedResult.success) throw new APICallError({
		message: "Invalid JSON response",
		cause: parsedResult.error,
		statusCode: response.status,
		responseHeaders,
		responseBody,
		url,
		requestBodyValues
	});
	return {
		responseHeaders,
		value: parsedResult.value,
		rawValue: parsedResult.rawValue
	};
};
var createBinaryResponseHandler = () => async ({ response, url, requestBodyValues }) => {
	const responseHeaders = extractResponseHeaders(response);
	if (!response.body) throw new APICallError({
		message: "Response body is empty",
		url,
		requestBodyValues,
		statusCode: response.status,
		responseHeaders,
		responseBody: void 0
	});
	try {
		const buffer = await response.arrayBuffer();
		return {
			responseHeaders,
			value: new Uint8Array(buffer)
		};
	} catch (error) {
		throw new APICallError({
			message: "Failed to read response as array buffer",
			url,
			requestBodyValues,
			statusCode: response.status,
			responseHeaders,
			responseBody: void 0,
			cause: error
		});
	}
};
function withoutTrailingSlash(url) {
	return url == null ? void 0 : url.replace(/\/$/, "");
}
function isAsyncIterable(obj) {
	return obj != null && typeof obj[Symbol.asyncIterator] === "function";
}
async function* executeTool({ execute, input, options }) {
	const result = execute(input, options);
	if (isAsyncIterable(result)) {
		let lastOutput;
		for await (const output of result) {
			lastOutput = output;
			yield {
				type: "preliminary",
				output
			};
		}
		yield {
			type: "final",
			output: lastOutput
		};
	} else yield {
		type: "final",
		output: await result
	};
}
var VERSION = "3.0.44";
var anthropicFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: lazySchema(() => zodSchema(object({
		type: literal("error"),
		error: object({
			type: string(),
			message: string()
		})
	}))),
	errorToMessage: (data) => data.error.message
});
var anthropicMessagesResponseSchema = lazySchema(() => zodSchema(object({
	type: literal("message"),
	id: string().nullish(),
	model: string().nullish(),
	content: array(discriminatedUnion("type", [
		object({
			type: literal("text"),
			text: string(),
			citations: array(discriminatedUnion("type", [
				object({
					type: literal("web_search_result_location"),
					cited_text: string(),
					url: string(),
					title: string(),
					encrypted_index: string()
				}),
				object({
					type: literal("page_location"),
					cited_text: string(),
					document_index: number(),
					document_title: string().nullable(),
					start_page_number: number(),
					end_page_number: number()
				}),
				object({
					type: literal("char_location"),
					cited_text: string(),
					document_index: number(),
					document_title: string().nullable(),
					start_char_index: number(),
					end_char_index: number()
				})
			])).optional()
		}),
		object({
			type: literal("thinking"),
			thinking: string(),
			signature: string()
		}),
		object({
			type: literal("redacted_thinking"),
			data: string()
		}),
		object({
			type: literal("compaction"),
			content: string()
		}),
		object({
			type: literal("tool_use"),
			id: string(),
			name: string(),
			input: unknown(),
			caller: union([object({
				type: literal("code_execution_20250825"),
				tool_id: string()
			}), object({ type: literal("direct") })]).optional()
		}),
		object({
			type: literal("server_tool_use"),
			id: string(),
			name: string(),
			input: record(string(), unknown()).nullish()
		}),
		object({
			type: literal("mcp_tool_use"),
			id: string(),
			name: string(),
			input: unknown(),
			server_name: string()
		}),
		object({
			type: literal("mcp_tool_result"),
			tool_use_id: string(),
			is_error: boolean(),
			content: array(union([string(), object({
				type: literal("text"),
				text: string()
			})]))
		}),
		object({
			type: literal("web_fetch_tool_result"),
			tool_use_id: string(),
			content: union([object({
				type: literal("web_fetch_result"),
				url: string(),
				retrieved_at: string(),
				content: object({
					type: literal("document"),
					title: string().nullable(),
					citations: object({ enabled: boolean() }).optional(),
					source: union([object({
						type: literal("base64"),
						media_type: literal("application/pdf"),
						data: string()
					}), object({
						type: literal("text"),
						media_type: literal("text/plain"),
						data: string()
					})])
				})
			}), object({
				type: literal("web_fetch_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("web_search_tool_result"),
			tool_use_id: string(),
			content: union([array(object({
				type: literal("web_search_result"),
				url: string(),
				title: string(),
				encrypted_content: string(),
				page_age: string().nullish()
			})), object({
				type: literal("web_search_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("code_execution_tool_result"),
			tool_use_id: string(),
			content: union([object({
				type: literal("code_execution_result"),
				stdout: string(),
				stderr: string(),
				return_code: number(),
				content: array(object({
					type: literal("code_execution_output"),
					file_id: string()
				})).optional().default([])
			}), object({
				type: literal("code_execution_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("bash_code_execution_tool_result"),
			tool_use_id: string(),
			content: discriminatedUnion("type", [object({
				type: literal("bash_code_execution_result"),
				content: array(object({
					type: literal("bash_code_execution_output"),
					file_id: string()
				})),
				stdout: string(),
				stderr: string(),
				return_code: number()
			}), object({
				type: literal("bash_code_execution_tool_result_error"),
				error_code: string()
			})])
		}),
		object({
			type: literal("text_editor_code_execution_tool_result"),
			tool_use_id: string(),
			content: discriminatedUnion("type", [
				object({
					type: literal("text_editor_code_execution_tool_result_error"),
					error_code: string()
				}),
				object({
					type: literal("text_editor_code_execution_view_result"),
					content: string(),
					file_type: string(),
					num_lines: number().nullable(),
					start_line: number().nullable(),
					total_lines: number().nullable()
				}),
				object({
					type: literal("text_editor_code_execution_create_result"),
					is_file_update: boolean()
				}),
				object({
					type: literal("text_editor_code_execution_str_replace_result"),
					lines: array(string()).nullable(),
					new_lines: number().nullable(),
					new_start: number().nullable(),
					old_lines: number().nullable(),
					old_start: number().nullable()
				})
			])
		}),
		object({
			type: literal("tool_search_tool_result"),
			tool_use_id: string(),
			content: union([object({
				type: literal("tool_search_tool_search_result"),
				tool_references: array(object({
					type: literal("tool_reference"),
					tool_name: string()
				}))
			}), object({
				type: literal("tool_search_tool_result_error"),
				error_code: string()
			})])
		})
	])),
	stop_reason: string().nullish(),
	stop_sequence: string().nullish(),
	usage: looseObject({
		input_tokens: number(),
		output_tokens: number(),
		cache_creation_input_tokens: number().nullish(),
		cache_read_input_tokens: number().nullish(),
		iterations: array(object({
			type: union([literal("compaction"), literal("message")]),
			input_tokens: number(),
			output_tokens: number()
		})).nullish()
	}),
	container: object({
		expires_at: string(),
		id: string(),
		skills: array(object({
			type: union([literal("anthropic"), literal("custom")]),
			skill_id: string(),
			version: string()
		})).nullish()
	}).nullish(),
	context_management: object({ applied_edits: array(union([
		object({
			type: literal("clear_tool_uses_20250919"),
			cleared_tool_uses: number(),
			cleared_input_tokens: number()
		}),
		object({
			type: literal("clear_thinking_20251015"),
			cleared_thinking_turns: number(),
			cleared_input_tokens: number()
		}),
		object({ type: literal("compact_20260112") })
	])) }).nullish()
})));
var anthropicMessagesChunkSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [
	object({
		type: literal("message_start"),
		message: object({
			id: string().nullish(),
			model: string().nullish(),
			role: string().nullish(),
			usage: looseObject({
				input_tokens: number(),
				cache_creation_input_tokens: number().nullish(),
				cache_read_input_tokens: number().nullish()
			}),
			content: array(discriminatedUnion("type", [object({
				type: literal("tool_use"),
				id: string(),
				name: string(),
				input: unknown(),
				caller: union([object({
					type: literal("code_execution_20250825"),
					tool_id: string()
				}), object({ type: literal("direct") })]).optional()
			})])).nullish(),
			stop_reason: string().nullish(),
			container: object({
				expires_at: string(),
				id: string()
			}).nullish()
		})
	}),
	object({
		type: literal("content_block_start"),
		index: number(),
		content_block: discriminatedUnion("type", [
			object({
				type: literal("text"),
				text: string()
			}),
			object({
				type: literal("thinking"),
				thinking: string()
			}),
			object({
				type: literal("tool_use"),
				id: string(),
				name: string(),
				input: record(string(), unknown()).optional(),
				caller: union([object({
					type: literal("code_execution_20250825"),
					tool_id: string()
				}), object({ type: literal("direct") })]).optional()
			}),
			object({
				type: literal("redacted_thinking"),
				data: string()
			}),
			object({
				type: literal("compaction"),
				content: string().nullish()
			}),
			object({
				type: literal("server_tool_use"),
				id: string(),
				name: string(),
				input: record(string(), unknown()).nullish()
			}),
			object({
				type: literal("mcp_tool_use"),
				id: string(),
				name: string(),
				input: unknown(),
				server_name: string()
			}),
			object({
				type: literal("mcp_tool_result"),
				tool_use_id: string(),
				is_error: boolean(),
				content: array(union([string(), object({
					type: literal("text"),
					text: string()
				})]))
			}),
			object({
				type: literal("web_fetch_tool_result"),
				tool_use_id: string(),
				content: union([object({
					type: literal("web_fetch_result"),
					url: string(),
					retrieved_at: string(),
					content: object({
						type: literal("document"),
						title: string().nullable(),
						citations: object({ enabled: boolean() }).optional(),
						source: union([object({
							type: literal("base64"),
							media_type: literal("application/pdf"),
							data: string()
						}), object({
							type: literal("text"),
							media_type: literal("text/plain"),
							data: string()
						})])
					})
				}), object({
					type: literal("web_fetch_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("web_search_tool_result"),
				tool_use_id: string(),
				content: union([array(object({
					type: literal("web_search_result"),
					url: string(),
					title: string(),
					encrypted_content: string(),
					page_age: string().nullish()
				})), object({
					type: literal("web_search_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("code_execution_tool_result"),
				tool_use_id: string(),
				content: union([object({
					type: literal("code_execution_result"),
					stdout: string(),
					stderr: string(),
					return_code: number(),
					content: array(object({
						type: literal("code_execution_output"),
						file_id: string()
					})).optional().default([])
				}), object({
					type: literal("code_execution_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("bash_code_execution_tool_result"),
				tool_use_id: string(),
				content: discriminatedUnion("type", [object({
					type: literal("bash_code_execution_result"),
					content: array(object({
						type: literal("bash_code_execution_output"),
						file_id: string()
					})),
					stdout: string(),
					stderr: string(),
					return_code: number()
				}), object({
					type: literal("bash_code_execution_tool_result_error"),
					error_code: string()
				})])
			}),
			object({
				type: literal("text_editor_code_execution_tool_result"),
				tool_use_id: string(),
				content: discriminatedUnion("type", [
					object({
						type: literal("text_editor_code_execution_tool_result_error"),
						error_code: string()
					}),
					object({
						type: literal("text_editor_code_execution_view_result"),
						content: string(),
						file_type: string(),
						num_lines: number().nullable(),
						start_line: number().nullable(),
						total_lines: number().nullable()
					}),
					object({
						type: literal("text_editor_code_execution_create_result"),
						is_file_update: boolean()
					}),
					object({
						type: literal("text_editor_code_execution_str_replace_result"),
						lines: array(string()).nullable(),
						new_lines: number().nullable(),
						new_start: number().nullable(),
						old_lines: number().nullable(),
						old_start: number().nullable()
					})
				])
			}),
			object({
				type: literal("tool_search_tool_result"),
				tool_use_id: string(),
				content: union([object({
					type: literal("tool_search_tool_search_result"),
					tool_references: array(object({
						type: literal("tool_reference"),
						tool_name: string()
					}))
				}), object({
					type: literal("tool_search_tool_result_error"),
					error_code: string()
				})])
			})
		])
	}),
	object({
		type: literal("content_block_delta"),
		index: number(),
		delta: discriminatedUnion("type", [
			object({
				type: literal("input_json_delta"),
				partial_json: string()
			}),
			object({
				type: literal("text_delta"),
				text: string()
			}),
			object({
				type: literal("thinking_delta"),
				thinking: string()
			}),
			object({
				type: literal("signature_delta"),
				signature: string()
			}),
			object({
				type: literal("compaction_delta"),
				content: string()
			}),
			object({
				type: literal("citations_delta"),
				citation: discriminatedUnion("type", [
					object({
						type: literal("web_search_result_location"),
						cited_text: string(),
						url: string(),
						title: string(),
						encrypted_index: string()
					}),
					object({
						type: literal("page_location"),
						cited_text: string(),
						document_index: number(),
						document_title: string().nullable(),
						start_page_number: number(),
						end_page_number: number()
					}),
					object({
						type: literal("char_location"),
						cited_text: string(),
						document_index: number(),
						document_title: string().nullable(),
						start_char_index: number(),
						end_char_index: number()
					})
				])
			})
		])
	}),
	object({
		type: literal("content_block_stop"),
		index: number()
	}),
	object({
		type: literal("error"),
		error: object({
			type: string(),
			message: string()
		})
	}),
	object({
		type: literal("message_delta"),
		delta: object({
			stop_reason: string().nullish(),
			stop_sequence: string().nullish(),
			container: object({
				expires_at: string(),
				id: string(),
				skills: array(object({
					type: union([literal("anthropic"), literal("custom")]),
					skill_id: string(),
					version: string()
				})).nullish()
			}).nullish()
		}),
		usage: looseObject({
			input_tokens: number().nullish(),
			output_tokens: number(),
			cache_creation_input_tokens: number().nullish(),
			cache_read_input_tokens: number().nullish(),
			iterations: array(object({
				type: union([literal("compaction"), literal("message")]),
				input_tokens: number(),
				output_tokens: number()
			})).nullish()
		}),
		context_management: object({ applied_edits: array(union([
			object({
				type: literal("clear_tool_uses_20250919"),
				cleared_tool_uses: number(),
				cleared_input_tokens: number()
			}),
			object({
				type: literal("clear_thinking_20251015"),
				cleared_thinking_turns: number(),
				cleared_input_tokens: number()
			}),
			object({ type: literal("compact_20260112") })
		])) }).nullish()
	}),
	object({ type: literal("message_stop") }),
	object({ type: literal("ping") })
])));
var anthropicReasoningMetadataSchema = lazySchema(() => zodSchema(object({
	signature: string().optional(),
	redactedData: string().optional()
})));
var anthropicFilePartProviderOptions = object({
	citations: object({ enabled: boolean() }).optional(),
	title: string().optional(),
	context: string().optional()
});
var anthropicLanguageModelOptions = object({
	sendReasoning: boolean().optional(),
	structuredOutputMode: _enum([
		"outputFormat",
		"jsonTool",
		"auto"
	]).optional(),
	thinking: discriminatedUnion("type", [
		object({ type: literal("adaptive") }),
		object({
			type: literal("enabled"),
			budgetTokens: number().optional()
		}),
		object({ type: literal("disabled") })
	]).optional(),
	disableParallelToolUse: boolean().optional(),
	cacheControl: object({
		type: literal("ephemeral"),
		ttl: union([literal("5m"), literal("1h")]).optional()
	}).optional(),
	mcpServers: array(object({
		type: literal("url"),
		name: string(),
		url: string(),
		authorizationToken: string().nullish(),
		toolConfiguration: object({
			enabled: boolean().nullish(),
			allowedTools: array(string()).nullish()
		}).nullish()
	})).optional(),
	container: object({
		id: string().optional(),
		skills: array(object({
			type: union([literal("anthropic"), literal("custom")]),
			skillId: string(),
			version: string().optional()
		})).optional()
	}).optional(),
	toolStreaming: boolean().optional(),
	effort: _enum([
		"low",
		"medium",
		"high",
		"max"
	]).optional(),
	speed: _enum(["fast", "standard"]).optional(),
	contextManagement: object({ edits: array(discriminatedUnion("type", [
		object({
			type: literal("clear_tool_uses_20250919"),
			trigger: discriminatedUnion("type", [object({
				type: literal("input_tokens"),
				value: number()
			}), object({
				type: literal("tool_uses"),
				value: number()
			})]).optional(),
			keep: object({
				type: literal("tool_uses"),
				value: number()
			}).optional(),
			clearAtLeast: object({
				type: literal("input_tokens"),
				value: number()
			}).optional(),
			clearToolInputs: boolean().optional(),
			excludeTools: array(string()).optional()
		}),
		object({
			type: literal("clear_thinking_20251015"),
			keep: union([literal("all"), object({
				type: literal("thinking_turns"),
				value: number()
			})]).optional()
		}),
		object({
			type: literal("compact_20260112"),
			trigger: object({
				type: literal("input_tokens"),
				value: number()
			}).optional(),
			pauseAfterCompaction: boolean().optional(),
			instructions: string().optional()
		})
	])) }).optional()
});
var MAX_CACHE_BREAKPOINTS = 4;
function getCacheControl(providerMetadata) {
	var _a;
	const anthropic2 = providerMetadata == null ? void 0 : providerMetadata.anthropic;
	return (_a = anthropic2 == null ? void 0 : anthropic2.cacheControl) != null ? _a : anthropic2 == null ? void 0 : anthropic2.cache_control;
}
var CacheControlValidator = class {
	constructor() {
		this.breakpointCount = 0;
		this.warnings = [];
	}
	getCacheControl(providerMetadata, context) {
		const cacheControlValue = getCacheControl(providerMetadata);
		if (!cacheControlValue) return;
		if (!context.canCache) {
			this.warnings.push({
				type: "unsupported",
				feature: "cache_control on non-cacheable context",
				details: `cache_control cannot be set on ${context.type}. It will be ignored.`
			});
			return;
		}
		this.breakpointCount++;
		if (this.breakpointCount > MAX_CACHE_BREAKPOINTS) {
			this.warnings.push({
				type: "unsupported",
				feature: "cacheControl breakpoint limit",
				details: `Maximum ${MAX_CACHE_BREAKPOINTS} cache breakpoints exceeded (found ${this.breakpointCount}). This breakpoint will be ignored.`
			});
			return;
		}
		return cacheControlValue;
	}
	getWarnings() {
		return this.warnings;
	}
};
var textEditor_20250728ArgsSchema = lazySchema(() => zodSchema(object({ maxCharacters: number().optional() })));
var factory = createProviderToolFactory({
	id: "anthropic.text_editor_20250728",
	inputSchema: lazySchema(() => zodSchema(object({
		command: _enum([
			"view",
			"create",
			"str_replace",
			"insert"
		]),
		path: string(),
		file_text: string().optional(),
		insert_line: number().int().optional(),
		new_str: string().optional(),
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
});
var textEditor_20250728 = (args = {}) => {
	return factory(args);
};
var webSearch_20250305ArgsSchema = lazySchema(() => zodSchema(object({
	maxUses: number().optional(),
	allowedDomains: array(string()).optional(),
	blockedDomains: array(string()).optional(),
	userLocation: object({
		type: literal("approximate"),
		city: string().optional(),
		region: string().optional(),
		country: string().optional(),
		timezone: string().optional()
	}).optional()
})));
var webSearch_20250305OutputSchema = lazySchema(() => zodSchema(array(object({
	url: string(),
	title: string().nullable(),
	pageAge: string().nullable(),
	encryptedContent: string(),
	type: literal("web_search_result")
}))));
var factory2 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.web_search_20250305",
	inputSchema: lazySchema(() => zodSchema(object({ query: string() }))),
	outputSchema: webSearch_20250305OutputSchema,
	supportsDeferredResults: true
});
var webSearch_20250305 = (args = {}) => {
	return factory2(args);
};
var webFetch_20250910ArgsSchema = lazySchema(() => zodSchema(object({
	maxUses: number().optional(),
	allowedDomains: array(string()).optional(),
	blockedDomains: array(string()).optional(),
	citations: object({ enabled: boolean() }).optional(),
	maxContentTokens: number().optional()
})));
var webFetch_20250910OutputSchema = lazySchema(() => zodSchema(object({
	type: literal("web_fetch_result"),
	url: string(),
	content: object({
		type: literal("document"),
		title: string().nullable(),
		citations: object({ enabled: boolean() }).optional(),
		source: union([object({
			type: literal("base64"),
			mediaType: literal("application/pdf"),
			data: string()
		}), object({
			type: literal("text"),
			mediaType: literal("text/plain"),
			data: string()
		})])
	}),
	retrievedAt: string().nullable()
})));
var factory3 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.web_fetch_20250910",
	inputSchema: lazySchema(() => zodSchema(object({ url: string() }))),
	outputSchema: webFetch_20250910OutputSchema,
	supportsDeferredResults: true
});
var webFetch_20250910 = (args = {}) => {
	return factory3(args);
};
async function prepareTools({ tools, toolChoice, disableParallelToolUse, cacheControlValidator, supportsStructuredOutput }) {
	var _a;
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	const betas = /* @__PURE__ */ new Set();
	const validator = cacheControlValidator || new CacheControlValidator();
	if (tools == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings,
		betas
	};
	const anthropicTools2 = [];
	for (const tool of tools) switch (tool.type) {
		case "function": {
			const cacheControl = validator.getCacheControl(tool.providerOptions, {
				type: "tool definition",
				canCache: true
			});
			const anthropicOptions = (_a = tool.providerOptions) == null ? void 0 : _a.anthropic;
			const deferLoading = anthropicOptions == null ? void 0 : anthropicOptions.deferLoading;
			const allowedCallers = anthropicOptions == null ? void 0 : anthropicOptions.allowedCallers;
			anthropicTools2.push({
				name: tool.name,
				description: tool.description,
				input_schema: tool.inputSchema,
				cache_control: cacheControl,
				...supportsStructuredOutput === true && tool.strict != null ? { strict: tool.strict } : {},
				...deferLoading != null ? { defer_loading: deferLoading } : {},
				...allowedCallers != null ? { allowed_callers: allowedCallers } : {},
				...tool.inputExamples != null ? { input_examples: tool.inputExamples.map((example) => example.input) } : {}
			});
			if (supportsStructuredOutput === true) betas.add("structured-outputs-2025-11-13");
			if (tool.inputExamples != null || allowedCallers != null) betas.add("advanced-tool-use-2025-11-20");
			break;
		}
		case "provider":
			switch (tool.id) {
				case "anthropic.code_execution_20250522":
					betas.add("code-execution-2025-05-22");
					anthropicTools2.push({
						type: "code_execution_20250522",
						name: "code_execution",
						cache_control: void 0
					});
					break;
				case "anthropic.code_execution_20250825":
					betas.add("code-execution-2025-08-25");
					anthropicTools2.push({
						type: "code_execution_20250825",
						name: "code_execution"
					});
					break;
				case "anthropic.computer_20250124":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "computer",
						type: "computer_20250124",
						display_width_px: tool.args.displayWidthPx,
						display_height_px: tool.args.displayHeightPx,
						display_number: tool.args.displayNumber,
						cache_control: void 0
					});
					break;
				case "anthropic.computer_20251124":
					betas.add("computer-use-2025-11-24");
					anthropicTools2.push({
						name: "computer",
						type: "computer_20251124",
						display_width_px: tool.args.displayWidthPx,
						display_height_px: tool.args.displayHeightPx,
						display_number: tool.args.displayNumber,
						enable_zoom: tool.args.enableZoom,
						cache_control: void 0
					});
					break;
				case "anthropic.computer_20241022":
					betas.add("computer-use-2024-10-22");
					anthropicTools2.push({
						name: "computer",
						type: "computer_20241022",
						display_width_px: tool.args.displayWidthPx,
						display_height_px: tool.args.displayHeightPx,
						display_number: tool.args.displayNumber,
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20250124":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "str_replace_editor",
						type: "text_editor_20250124",
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20241022":
					betas.add("computer-use-2024-10-22");
					anthropicTools2.push({
						name: "str_replace_editor",
						type: "text_editor_20241022",
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20250429":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "str_replace_based_edit_tool",
						type: "text_editor_20250429",
						cache_control: void 0
					});
					break;
				case "anthropic.text_editor_20250728": {
					const args = await validateTypes({
						value: tool.args,
						schema: textEditor_20250728ArgsSchema
					});
					anthropicTools2.push({
						name: "str_replace_based_edit_tool",
						type: "text_editor_20250728",
						max_characters: args.maxCharacters,
						cache_control: void 0
					});
					break;
				}
				case "anthropic.bash_20250124":
					betas.add("computer-use-2025-01-24");
					anthropicTools2.push({
						name: "bash",
						type: "bash_20250124",
						cache_control: void 0
					});
					break;
				case "anthropic.bash_20241022":
					betas.add("computer-use-2024-10-22");
					anthropicTools2.push({
						name: "bash",
						type: "bash_20241022",
						cache_control: void 0
					});
					break;
				case "anthropic.memory_20250818":
					betas.add("context-management-2025-06-27");
					anthropicTools2.push({
						name: "memory",
						type: "memory_20250818"
					});
					break;
				case "anthropic.web_fetch_20250910": {
					betas.add("web-fetch-2025-09-10");
					const args = await validateTypes({
						value: tool.args,
						schema: webFetch_20250910ArgsSchema
					});
					anthropicTools2.push({
						type: "web_fetch_20250910",
						name: "web_fetch",
						max_uses: args.maxUses,
						allowed_domains: args.allowedDomains,
						blocked_domains: args.blockedDomains,
						citations: args.citations,
						max_content_tokens: args.maxContentTokens,
						cache_control: void 0
					});
					break;
				}
				case "anthropic.web_search_20250305": {
					const args = await validateTypes({
						value: tool.args,
						schema: webSearch_20250305ArgsSchema
					});
					anthropicTools2.push({
						type: "web_search_20250305",
						name: "web_search",
						max_uses: args.maxUses,
						allowed_domains: args.allowedDomains,
						blocked_domains: args.blockedDomains,
						user_location: args.userLocation,
						cache_control: void 0
					});
					break;
				}
				case "anthropic.tool_search_regex_20251119":
					betas.add("advanced-tool-use-2025-11-20");
					anthropicTools2.push({
						type: "tool_search_tool_regex_20251119",
						name: "tool_search_tool_regex"
					});
					break;
				case "anthropic.tool_search_bm25_20251119":
					betas.add("advanced-tool-use-2025-11-20");
					anthropicTools2.push({
						type: "tool_search_tool_bm25_20251119",
						name: "tool_search_tool_bm25"
					});
					break;
				default:
					toolWarnings.push({
						type: "unsupported",
						feature: `provider-defined tool ${tool.id}`
					});
					break;
			}
			break;
		default:
			toolWarnings.push({
				type: "unsupported",
				feature: `tool ${tool}`
			});
			break;
	}
	if (toolChoice == null) return {
		tools: anthropicTools2,
		toolChoice: disableParallelToolUse ? {
			type: "auto",
			disable_parallel_tool_use: disableParallelToolUse
		} : void 0,
		toolWarnings,
		betas
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto": return {
			tools: anthropicTools2,
			toolChoice: {
				type: "auto",
				disable_parallel_tool_use: disableParallelToolUse
			},
			toolWarnings,
			betas
		};
		case "required": return {
			tools: anthropicTools2,
			toolChoice: {
				type: "any",
				disable_parallel_tool_use: disableParallelToolUse
			},
			toolWarnings,
			betas
		};
		case "none": return {
			tools: void 0,
			toolChoice: void 0,
			toolWarnings,
			betas
		};
		case "tool": return {
			tools: anthropicTools2,
			toolChoice: {
				type: "tool",
				name: toolChoice.toolName,
				disable_parallel_tool_use: disableParallelToolUse
			},
			toolWarnings,
			betas
		};
		default: throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${type}` });
	}
}
function convertAnthropicMessagesUsage({ usage, rawUsage }) {
	var _a, _b;
	const cacheCreationTokens = (_a = usage.cache_creation_input_tokens) != null ? _a : 0;
	const cacheReadTokens = (_b = usage.cache_read_input_tokens) != null ? _b : 0;
	let inputTokens;
	let outputTokens;
	if (usage.iterations && usage.iterations.length > 0) {
		const totals = usage.iterations.reduce((acc, iter) => ({
			input: acc.input + iter.input_tokens,
			output: acc.output + iter.output_tokens
		}), {
			input: 0,
			output: 0
		});
		inputTokens = totals.input;
		outputTokens = totals.output;
	} else {
		inputTokens = usage.input_tokens;
		outputTokens = usage.output_tokens;
	}
	return {
		inputTokens: {
			total: inputTokens + cacheCreationTokens + cacheReadTokens,
			noCache: inputTokens,
			cacheRead: cacheReadTokens,
			cacheWrite: cacheCreationTokens
		},
		outputTokens: {
			total: outputTokens,
			text: void 0,
			reasoning: void 0
		},
		raw: rawUsage != null ? rawUsage : usage
	};
}
var codeExecution_20250522OutputSchema = lazySchema(() => zodSchema(object({
	type: literal("code_execution_result"),
	stdout: string(),
	stderr: string(),
	return_code: number(),
	content: array(object({
		type: literal("code_execution_output"),
		file_id: string()
	})).optional().default([])
})));
var factory4 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.code_execution_20250522",
	inputSchema: lazySchema(() => zodSchema(object({ code: string() }))),
	outputSchema: codeExecution_20250522OutputSchema
});
var codeExecution_20250522 = (args = {}) => {
	return factory4(args);
};
var codeExecution_20250825OutputSchema = lazySchema(() => zodSchema(discriminatedUnion("type", [
	object({
		type: literal("code_execution_result"),
		stdout: string(),
		stderr: string(),
		return_code: number(),
		content: array(object({
			type: literal("code_execution_output"),
			file_id: string()
		})).optional().default([])
	}),
	object({
		type: literal("bash_code_execution_result"),
		content: array(object({
			type: literal("bash_code_execution_output"),
			file_id: string()
		})),
		stdout: string(),
		stderr: string(),
		return_code: number()
	}),
	object({
		type: literal("bash_code_execution_tool_result_error"),
		error_code: string()
	}),
	object({
		type: literal("text_editor_code_execution_tool_result_error"),
		error_code: string()
	}),
	object({
		type: literal("text_editor_code_execution_view_result"),
		content: string(),
		file_type: string(),
		num_lines: number().nullable(),
		start_line: number().nullable(),
		total_lines: number().nullable()
	}),
	object({
		type: literal("text_editor_code_execution_create_result"),
		is_file_update: boolean()
	}),
	object({
		type: literal("text_editor_code_execution_str_replace_result"),
		lines: array(string()).nullable(),
		new_lines: number().nullable(),
		new_start: number().nullable(),
		old_lines: number().nullable(),
		old_start: number().nullable()
	})
])));
var factory5 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.code_execution_20250825",
	inputSchema: lazySchema(() => zodSchema(discriminatedUnion("type", [
		object({
			type: literal("programmatic-tool-call"),
			code: string()
		}),
		object({
			type: literal("bash_code_execution"),
			command: string()
		}),
		discriminatedUnion("command", [
			object({
				type: literal("text_editor_code_execution"),
				command: literal("view"),
				path: string()
			}),
			object({
				type: literal("text_editor_code_execution"),
				command: literal("create"),
				path: string(),
				file_text: string().nullish()
			}),
			object({
				type: literal("text_editor_code_execution"),
				command: literal("str_replace"),
				path: string(),
				old_str: string(),
				new_str: string()
			})
		])
	]))),
	outputSchema: codeExecution_20250825OutputSchema,
	supportsDeferredResults: true
});
var codeExecution_20250825 = (args = {}) => {
	return factory5(args);
};
var toolSearchRegex_20251119OutputSchema = lazySchema(() => zodSchema(array(object({
	type: literal("tool_reference"),
	toolName: string()
}))));
var factory6 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.tool_search_regex_20251119",
	inputSchema: lazySchema(() => zodSchema(object({
		pattern: string(),
		limit: number().optional()
	}))),
	outputSchema: toolSearchRegex_20251119OutputSchema,
	supportsDeferredResults: true
});
var toolSearchRegex_20251119 = (args = {}) => {
	return factory6(args);
};
function convertToString(data) {
	if (typeof data === "string") return Buffer.from(data, "base64").toString("utf-8");
	if (data instanceof Uint8Array) return new TextDecoder().decode(data);
	if (data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "URL-based text documents are not supported for citations" });
	throw new UnsupportedFunctionalityError({ functionality: `unsupported data type for text documents: ${typeof data}` });
}
function isUrlData(data) {
	return data instanceof URL || isUrlString(data);
}
function isUrlString(data) {
	return typeof data === "string" && /^https?:\/\//i.test(data);
}
function getUrlString(data) {
	return data instanceof URL ? data.toString() : data;
}
async function convertToAnthropicMessagesPrompt({ prompt, sendReasoning, warnings, cacheControlValidator, toolNameMapping }) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
	const betas = /* @__PURE__ */ new Set();
	const blocks = groupIntoBlocks(prompt);
	const validator = cacheControlValidator || new CacheControlValidator();
	let system = void 0;
	const messages = [];
	async function shouldEnableCitations(providerMetadata) {
		var _a2, _b2;
		const anthropicOptions = await parseProviderOptions({
			provider: "anthropic",
			providerOptions: providerMetadata,
			schema: anthropicFilePartProviderOptions
		});
		return (_b2 = (_a2 = anthropicOptions == null ? void 0 : anthropicOptions.citations) == null ? void 0 : _a2.enabled) != null ? _b2 : false;
	}
	async function getDocumentMetadata(providerMetadata) {
		const anthropicOptions = await parseProviderOptions({
			provider: "anthropic",
			providerOptions: providerMetadata,
			schema: anthropicFilePartProviderOptions
		});
		return {
			title: anthropicOptions == null ? void 0 : anthropicOptions.title,
			context: anthropicOptions == null ? void 0 : anthropicOptions.context
		};
	}
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		const isLastBlock = i === blocks.length - 1;
		const type = block.type;
		switch (type) {
			case "system":
				if (system != null) throw new UnsupportedFunctionalityError({ functionality: "Multiple system messages that are separated by user/assistant messages" });
				system = block.messages.map(({ content, providerOptions }) => ({
					type: "text",
					text: content,
					cache_control: validator.getCacheControl(providerOptions, {
						type: "system message",
						canCache: true
					})
				}));
				break;
			case "user": {
				const anthropicContent = [];
				for (const message of block.messages) {
					const { role, content } = message;
					switch (role) {
						case "user":
							for (let j = 0; j < content.length; j++) {
								const part = content[j];
								const isLastPart = j === content.length - 1;
								const cacheControl = (_a = validator.getCacheControl(part.providerOptions, {
									type: "user message part",
									canCache: true
								})) != null ? _a : isLastPart ? validator.getCacheControl(message.providerOptions, {
									type: "user message",
									canCache: true
								}) : void 0;
								switch (part.type) {
									case "text":
										anthropicContent.push({
											type: "text",
											text: part.text,
											cache_control: cacheControl
										});
										break;
									case "file":
										if (part.mediaType.startsWith("image/")) anthropicContent.push({
											type: "image",
											source: isUrlData(part.data) ? {
												type: "url",
												url: getUrlString(part.data)
											} : {
												type: "base64",
												media_type: part.mediaType === "image/*" ? "image/jpeg" : part.mediaType,
												data: convertToBase64(part.data)
											},
											cache_control: cacheControl
										});
										else if (part.mediaType === "application/pdf") {
											betas.add("pdfs-2024-09-25");
											const enableCitations = await shouldEnableCitations(part.providerOptions);
											const metadata = await getDocumentMetadata(part.providerOptions);
											anthropicContent.push({
												type: "document",
												source: isUrlData(part.data) ? {
													type: "url",
													url: getUrlString(part.data)
												} : {
													type: "base64",
													media_type: "application/pdf",
													data: convertToBase64(part.data)
												},
												title: (_b = metadata.title) != null ? _b : part.filename,
												...metadata.context && { context: metadata.context },
												...enableCitations && { citations: { enabled: true } },
												cache_control: cacheControl
											});
										} else if (part.mediaType === "text/plain") {
											const enableCitations = await shouldEnableCitations(part.providerOptions);
											const metadata = await getDocumentMetadata(part.providerOptions);
											anthropicContent.push({
												type: "document",
												source: isUrlData(part.data) ? {
													type: "url",
													url: getUrlString(part.data)
												} : {
													type: "text",
													media_type: "text/plain",
													data: convertToString(part.data)
												},
												title: (_c = metadata.title) != null ? _c : part.filename,
												...metadata.context && { context: metadata.context },
												...enableCitations && { citations: { enabled: true } },
												cache_control: cacheControl
											});
										} else throw new UnsupportedFunctionalityError({ functionality: `media type: ${part.mediaType}` });
										break;
								}
							}
							break;
						case "tool":
							for (let i2 = 0; i2 < content.length; i2++) {
								const part = content[i2];
								if (part.type === "tool-approval-response") continue;
								const isLastPart = i2 === content.length - 1;
								const cacheControl = (_d = validator.getCacheControl(part.providerOptions, {
									type: "tool result part",
									canCache: true
								})) != null ? _d : isLastPart ? validator.getCacheControl(message.providerOptions, {
									type: "tool result message",
									canCache: true
								}) : void 0;
								const output = part.output;
								let contentValue;
								switch (output.type) {
									case "content":
										contentValue = output.value.map((contentPart) => {
											var _a2;
											switch (contentPart.type) {
												case "text": return {
													type: "text",
													text: contentPart.text
												};
												case "image-data": return {
													type: "image",
													source: {
														type: "base64",
														media_type: contentPart.mediaType,
														data: contentPart.data
													}
												};
												case "image-url": return {
													type: "image",
													source: {
														type: "url",
														url: contentPart.url
													}
												};
												case "file-url": return {
													type: "document",
													source: {
														type: "url",
														url: contentPart.url
													}
												};
												case "file-data":
													if (contentPart.mediaType === "application/pdf") {
														betas.add("pdfs-2024-09-25");
														return {
															type: "document",
															source: {
																type: "base64",
																media_type: contentPart.mediaType,
																data: contentPart.data
															}
														};
													}
													warnings.push({
														type: "other",
														message: `unsupported tool content part type: ${contentPart.type} with media type: ${contentPart.mediaType}`
													});
													return;
												case "custom": {
													const anthropicOptions = (_a2 = contentPart.providerOptions) == null ? void 0 : _a2.anthropic;
													if ((anthropicOptions == null ? void 0 : anthropicOptions.type) === "tool-reference") return {
														type: "tool_reference",
														tool_name: anthropicOptions.toolName
													};
													warnings.push({
														type: "other",
														message: `unsupported custom tool content part`
													});
													return;
												}
												default:
													warnings.push({
														type: "other",
														message: `unsupported tool content part type: ${contentPart.type}`
													});
													return;
											}
										}).filter(isNonNullable);
										break;
									case "text":
									case "error-text":
										contentValue = output.value;
										break;
									case "execution-denied":
										contentValue = (_e = output.reason) != null ? _e : "Tool execution denied.";
										break;
									default:
										contentValue = JSON.stringify(output.value);
										break;
								}
								anthropicContent.push({
									type: "tool_result",
									tool_use_id: part.toolCallId,
									content: contentValue,
									is_error: output.type === "error-text" || output.type === "error-json" ? true : void 0,
									cache_control: cacheControl
								});
							}
							break;
						default: {
							const _exhaustiveCheck = role;
							throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
						}
					}
				}
				messages.push({
					role: "user",
					content: anthropicContent
				});
				break;
			}
			case "assistant": {
				const anthropicContent = [];
				const mcpToolUseIds = /* @__PURE__ */ new Set();
				for (let j = 0; j < block.messages.length; j++) {
					const message = block.messages[j];
					const isLastMessage = j === block.messages.length - 1;
					const { content } = message;
					for (let k = 0; k < content.length; k++) {
						const part = content[k];
						const isLastContentPart = k === content.length - 1;
						const cacheControl = (_f = validator.getCacheControl(part.providerOptions, {
							type: "assistant message part",
							canCache: true
						})) != null ? _f : isLastContentPart ? validator.getCacheControl(message.providerOptions, {
							type: "assistant message",
							canCache: true
						}) : void 0;
						switch (part.type) {
							case "text": {
								const textMetadata = (_g = part.providerOptions) == null ? void 0 : _g.anthropic;
								if ((textMetadata == null ? void 0 : textMetadata.type) === "compaction") anthropicContent.push({
									type: "compaction",
									content: part.text,
									cache_control: cacheControl
								});
								else anthropicContent.push({
									type: "text",
									text: isLastBlock && isLastMessage && isLastContentPart ? part.text.trim() : part.text,
									cache_control: cacheControl
								});
								break;
							}
							case "reasoning":
								if (sendReasoning) {
									const reasoningMetadata = await parseProviderOptions({
										provider: "anthropic",
										providerOptions: part.providerOptions,
										schema: anthropicReasoningMetadataSchema
									});
									if (reasoningMetadata != null) if (reasoningMetadata.signature != null) {
										validator.getCacheControl(part.providerOptions, {
											type: "thinking block",
											canCache: false
										});
										anthropicContent.push({
											type: "thinking",
											thinking: part.text,
											signature: reasoningMetadata.signature
										});
									} else if (reasoningMetadata.redactedData != null) {
										validator.getCacheControl(part.providerOptions, {
											type: "redacted thinking block",
											canCache: false
										});
										anthropicContent.push({
											type: "redacted_thinking",
											data: reasoningMetadata.redactedData
										});
									} else warnings.push({
										type: "other",
										message: "unsupported reasoning metadata"
									});
									else warnings.push({
										type: "other",
										message: "unsupported reasoning metadata"
									});
								} else warnings.push({
									type: "other",
									message: "sending reasoning content is disabled for this model"
								});
								break;
							case "tool-call": {
								if (part.providerExecuted) {
									const providerToolName = toolNameMapping.toProviderToolName(part.toolName);
									if (((_i = (_h = part.providerOptions) == null ? void 0 : _h.anthropic) == null ? void 0 : _i.type) === "mcp-tool-use") {
										mcpToolUseIds.add(part.toolCallId);
										const serverName = (_k = (_j = part.providerOptions) == null ? void 0 : _j.anthropic) == null ? void 0 : _k.serverName;
										if (serverName == null || typeof serverName !== "string") {
											warnings.push({
												type: "other",
												message: "mcp tool use server name is required and must be a string"
											});
											break;
										}
										anthropicContent.push({
											type: "mcp_tool_use",
											id: part.toolCallId,
											name: part.toolName,
											input: part.input,
											server_name: serverName,
											cache_control: cacheControl
										});
									} else if (providerToolName === "code_execution" && part.input != null && typeof part.input === "object" && "type" in part.input && typeof part.input.type === "string" && (part.input.type === "bash_code_execution" || part.input.type === "text_editor_code_execution")) anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: part.input.type,
										input: part.input,
										cache_control: cacheControl
									});
									else if (providerToolName === "code_execution" && part.input != null && typeof part.input === "object" && "type" in part.input && part.input.type === "programmatic-tool-call") {
										const { type: _, ...inputWithoutType } = part.input;
										anthropicContent.push({
											type: "server_tool_use",
											id: part.toolCallId,
											name: "code_execution",
											input: inputWithoutType,
											cache_control: cacheControl
										});
									} else if (providerToolName === "code_execution" || providerToolName === "web_fetch" || providerToolName === "web_search") anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: providerToolName,
										input: part.input,
										cache_control: cacheControl
									});
									else if (providerToolName === "tool_search_tool_regex" || providerToolName === "tool_search_tool_bm25") anthropicContent.push({
										type: "server_tool_use",
										id: part.toolCallId,
										name: providerToolName,
										input: part.input,
										cache_control: cacheControl
									});
									else warnings.push({
										type: "other",
										message: `provider executed tool call for tool ${part.toolName} is not supported`
									});
									break;
								}
								const callerOptions = (_l = part.providerOptions) == null ? void 0 : _l.anthropic;
								const caller = (callerOptions == null ? void 0 : callerOptions.caller) ? callerOptions.caller.type === "code_execution_20250825" && callerOptions.caller.toolId ? {
									type: "code_execution_20250825",
									tool_id: callerOptions.caller.toolId
								} : callerOptions.caller.type === "direct" ? { type: "direct" } : void 0 : void 0;
								anthropicContent.push({
									type: "tool_use",
									id: part.toolCallId,
									name: part.toolName,
									input: part.input,
									...caller && { caller },
									cache_control: cacheControl
								});
								break;
							}
							case "tool-result": {
								const providerToolName = toolNameMapping.toProviderToolName(part.toolName);
								if (mcpToolUseIds.has(part.toolCallId)) {
									const output = part.output;
									if (output.type !== "json" && output.type !== "error-json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									anthropicContent.push({
										type: "mcp_tool_result",
										tool_use_id: part.toolCallId,
										is_error: output.type === "error-json",
										content: output.value,
										cache_control: cacheControl
									});
								} else if (providerToolName === "code_execution") {
									const output = part.output;
									if (output.type === "error-text" || output.type === "error-json") {
										let errorInfo = {};
										try {
											if (typeof output.value === "string") errorInfo = JSON.parse(output.value);
											else if (typeof output.value === "object" && output.value !== null) errorInfo = output.value;
										} catch (e) {}
										if (errorInfo.type === "code_execution_tool_result_error") anthropicContent.push({
											type: "code_execution_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: "code_execution_tool_result_error",
												error_code: (_m = errorInfo.errorCode) != null ? _m : "unknown"
											},
											cache_control: cacheControl
										});
										else anthropicContent.push({
											type: "bash_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: {
												type: "bash_code_execution_tool_result_error",
												error_code: (_n = errorInfo.errorCode) != null ? _n : "unknown"
											}
										});
										break;
									}
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									if (output.value == null || typeof output.value !== "object" || !("type" in output.value) || typeof output.value.type !== "string") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output value is not a valid code execution result for tool ${part.toolName}`
										});
										break;
									}
									if (output.value.type === "code_execution_result") {
										const codeExecutionOutput = await validateTypes({
											value: output.value,
											schema: codeExecution_20250522OutputSchema
										});
										anthropicContent.push({
											type: "code_execution_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: codeExecutionOutput.type,
												stdout: codeExecutionOutput.stdout,
												stderr: codeExecutionOutput.stderr,
												return_code: codeExecutionOutput.return_code,
												content: (_o = codeExecutionOutput.content) != null ? _o : []
											},
											cache_control: cacheControl
										});
									} else {
										const codeExecutionOutput = await validateTypes({
											value: output.value,
											schema: codeExecution_20250825OutputSchema
										});
										if (codeExecutionOutput.type === "code_execution_result") anthropicContent.push({
											type: "code_execution_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: codeExecutionOutput.type,
												stdout: codeExecutionOutput.stdout,
												stderr: codeExecutionOutput.stderr,
												return_code: codeExecutionOutput.return_code,
												content: (_p = codeExecutionOutput.content) != null ? _p : []
											},
											cache_control: cacheControl
										});
										else if (codeExecutionOutput.type === "bash_code_execution_result" || codeExecutionOutput.type === "bash_code_execution_tool_result_error") anthropicContent.push({
											type: "bash_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: codeExecutionOutput
										});
										else anthropicContent.push({
											type: "text_editor_code_execution_tool_result",
											tool_use_id: part.toolCallId,
											cache_control: cacheControl,
											content: codeExecutionOutput
										});
									}
									break;
								}
								if (providerToolName === "web_fetch") {
									const output = part.output;
									if (output.type === "error-json") {
										let errorValue = {};
										try {
											if (typeof output.value === "string") errorValue = JSON.parse(output.value);
											else if (typeof output.value === "object" && output.value !== null) errorValue = output.value;
										} catch (e) {
											const extractedErrorCode = (_q = output.value) == null ? void 0 : _q.errorCode;
											errorValue = { errorCode: typeof extractedErrorCode === "string" ? extractedErrorCode : "unknown" };
										}
										anthropicContent.push({
											type: "web_fetch_tool_result",
											tool_use_id: part.toolCallId,
											content: {
												type: "web_fetch_tool_result_error",
												error_code: (_r = errorValue.errorCode) != null ? _r : "unknown"
											},
											cache_control: cacheControl
										});
										break;
									}
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									const webFetchOutput = await validateTypes({
										value: output.value,
										schema: webFetch_20250910OutputSchema
									});
									anthropicContent.push({
										type: "web_fetch_tool_result",
										tool_use_id: part.toolCallId,
										content: {
											type: "web_fetch_result",
											url: webFetchOutput.url,
											retrieved_at: webFetchOutput.retrievedAt,
											content: {
												type: "document",
												title: webFetchOutput.content.title,
												citations: webFetchOutput.content.citations,
												source: {
													type: webFetchOutput.content.source.type,
													media_type: webFetchOutput.content.source.mediaType,
													data: webFetchOutput.content.source.data
												}
											}
										},
										cache_control: cacheControl
									});
									break;
								}
								if (providerToolName === "web_search") {
									const output = part.output;
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									const webSearchOutput = await validateTypes({
										value: output.value,
										schema: webSearch_20250305OutputSchema
									});
									anthropicContent.push({
										type: "web_search_tool_result",
										tool_use_id: part.toolCallId,
										content: webSearchOutput.map((result) => ({
											url: result.url,
											title: result.title,
											page_age: result.pageAge,
											encrypted_content: result.encryptedContent,
											type: result.type
										})),
										cache_control: cacheControl
									});
									break;
								}
								if (providerToolName === "tool_search_tool_regex" || providerToolName === "tool_search_tool_bm25") {
									const output = part.output;
									if (output.type !== "json") {
										warnings.push({
											type: "other",
											message: `provider executed tool result output type ${output.type} for tool ${part.toolName} is not supported`
										});
										break;
									}
									const toolReferences = (await validateTypes({
										value: output.value,
										schema: toolSearchRegex_20251119OutputSchema
									})).map((ref) => ({
										type: "tool_reference",
										tool_name: ref.toolName
									}));
									anthropicContent.push({
										type: "tool_search_tool_result",
										tool_use_id: part.toolCallId,
										content: {
											type: "tool_search_tool_search_result",
											tool_references: toolReferences
										},
										cache_control: cacheControl
									});
									break;
								}
								warnings.push({
									type: "other",
									message: `provider executed tool result for tool ${part.toolName} is not supported`
								});
								break;
							}
						}
					}
				}
				messages.push({
					role: "assistant",
					content: anthropicContent
				});
				break;
			}
			default: {
				const _exhaustiveCheck = type;
				throw new Error(`content type: ${_exhaustiveCheck}`);
			}
		}
	}
	return {
		prompt: {
			system,
			messages
		},
		betas
	};
}
function groupIntoBlocks(prompt) {
	const blocks = [];
	let currentBlock = void 0;
	for (const message of prompt) {
		const { role } = message;
		switch (role) {
			case "system":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "system") {
					currentBlock = {
						type: "system",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "assistant":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "assistant") {
					currentBlock = {
						type: "assistant",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "user":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
					currentBlock = {
						type: "user",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "tool":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
					currentBlock = {
						type: "user",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			default: {
				const _exhaustiveCheck = role;
				throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
			}
		}
	}
	return blocks;
}
function mapAnthropicStopReason({ finishReason, isJsonResponseFromTool }) {
	switch (finishReason) {
		case "pause_turn":
		case "end_turn":
		case "stop_sequence": return "stop";
		case "refusal": return "content-filter";
		case "tool_use": return isJsonResponseFromTool ? "stop" : "tool-calls";
		case "max_tokens":
		case "model_context_window_exceeded": return "length";
		case "compaction": return "other";
		default: return "other";
	}
}
function createCitationSource(citation, citationDocuments, generateId3) {
	var _a;
	if (citation.type === "web_search_result_location") return {
		type: "source",
		sourceType: "url",
		id: generateId3(),
		url: citation.url,
		title: citation.title,
		providerMetadata: { anthropic: {
			citedText: citation.cited_text,
			encryptedIndex: citation.encrypted_index
		} }
	};
	if (citation.type !== "page_location" && citation.type !== "char_location") return;
	const documentInfo = citationDocuments[citation.document_index];
	if (!documentInfo) return;
	return {
		type: "source",
		sourceType: "document",
		id: generateId3(),
		mediaType: documentInfo.mediaType,
		title: (_a = citation.document_title) != null ? _a : documentInfo.title,
		filename: documentInfo.filename,
		providerMetadata: { anthropic: citation.type === "page_location" ? {
			citedText: citation.cited_text,
			startPageNumber: citation.start_page_number,
			endPageNumber: citation.end_page_number
		} : {
			citedText: citation.cited_text,
			startCharIndex: citation.start_char_index,
			endCharIndex: citation.end_char_index
		} }
	};
}
var AnthropicMessagesLanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v3";
		var _a;
		this.modelId = modelId;
		this.config = config;
		this.generateId = (_a = config.generateId) != null ? _a : generateId;
	}
	supportsUrl(url) {
		return url.protocol === "https:";
	}
	get provider() {
		return this.config.provider;
	}
	/**
	* Extracts the dynamic provider name from the config.provider string.
	* e.g., 'my-custom-anthropic.messages' -> 'my-custom-anthropic'
	*/
	get providerOptionsName() {
		const provider = this.config.provider;
		const dotIndex = provider.indexOf(".");
		return dotIndex === -1 ? provider : provider.substring(0, dotIndex);
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ userSuppliedBetas, prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions, stream }) {
		var _a, _b, _c, _d, _e, _f;
		const warnings = [];
		if (frequencyPenalty != null) warnings.push({
			type: "unsupported",
			feature: "frequencyPenalty"
		});
		if (presencePenalty != null) warnings.push({
			type: "unsupported",
			feature: "presencePenalty"
		});
		if (seed != null) warnings.push({
			type: "unsupported",
			feature: "seed"
		});
		if (temperature != null && temperature > 1) {
			warnings.push({
				type: "unsupported",
				feature: "temperature",
				details: `${temperature} exceeds anthropic maximum of 1.0. clamped to 1.0`
			});
			temperature = 1;
		} else if (temperature != null && temperature < 0) {
			warnings.push({
				type: "unsupported",
				feature: "temperature",
				details: `${temperature} is below anthropic minimum of 0. clamped to 0`
			});
			temperature = 0;
		}
		if ((responseFormat == null ? void 0 : responseFormat.type) === "json") {
			if (responseFormat.schema == null) warnings.push({
				type: "unsupported",
				feature: "responseFormat",
				details: "JSON response format requires a schema. The response format is ignored."
			});
		}
		const providerOptionsName = this.providerOptionsName;
		const canonicalOptions = await parseProviderOptions({
			provider: "anthropic",
			providerOptions,
			schema: anthropicLanguageModelOptions
		});
		const customProviderOptions = providerOptionsName !== "anthropic" ? await parseProviderOptions({
			provider: providerOptionsName,
			providerOptions,
			schema: anthropicLanguageModelOptions
		}) : null;
		const usedCustomProviderKey = customProviderOptions != null;
		const anthropicOptions = Object.assign({}, canonicalOptions != null ? canonicalOptions : {}, customProviderOptions != null ? customProviderOptions : {});
		const { maxOutputTokens: maxOutputTokensForModel, supportsStructuredOutput: modelSupportsStructuredOutput, isKnownModel } = getModelCapabilities(this.modelId);
		const supportsStructuredOutput = ((_a = this.config.supportsNativeStructuredOutput) != null ? _a : true) && modelSupportsStructuredOutput;
		const structureOutputMode = (_b = anthropicOptions == null ? void 0 : anthropicOptions.structuredOutputMode) != null ? _b : "auto";
		const useStructuredOutput = structureOutputMode === "outputFormat" || structureOutputMode === "auto" && supportsStructuredOutput;
		const jsonResponseTool = (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && !useStructuredOutput ? {
			type: "function",
			name: "json",
			description: "Respond with a JSON object.",
			inputSchema: responseFormat.schema
		} : void 0;
		const contextManagement = anthropicOptions == null ? void 0 : anthropicOptions.contextManagement;
		const cacheControlValidator = new CacheControlValidator();
		const toolNameMapping = createToolNameMapping({
			tools,
			providerToolNames: {
				"anthropic.code_execution_20250522": "code_execution",
				"anthropic.code_execution_20250825": "code_execution",
				"anthropic.computer_20241022": "computer",
				"anthropic.computer_20250124": "computer",
				"anthropic.text_editor_20241022": "str_replace_editor",
				"anthropic.text_editor_20250124": "str_replace_editor",
				"anthropic.text_editor_20250429": "str_replace_based_edit_tool",
				"anthropic.text_editor_20250728": "str_replace_based_edit_tool",
				"anthropic.bash_20241022": "bash",
				"anthropic.bash_20250124": "bash",
				"anthropic.memory_20250818": "memory",
				"anthropic.web_search_20250305": "web_search",
				"anthropic.web_fetch_20250910": "web_fetch",
				"anthropic.tool_search_regex_20251119": "tool_search_tool_regex",
				"anthropic.tool_search_bm25_20251119": "tool_search_tool_bm25"
			}
		});
		const { prompt: messagesPrompt, betas } = await convertToAnthropicMessagesPrompt({
			prompt,
			sendReasoning: (_c = anthropicOptions == null ? void 0 : anthropicOptions.sendReasoning) != null ? _c : true,
			warnings,
			cacheControlValidator,
			toolNameMapping
		});
		const thinkingType = (_d = anthropicOptions == null ? void 0 : anthropicOptions.thinking) == null ? void 0 : _d.type;
		const isThinking = thinkingType === "enabled" || thinkingType === "adaptive";
		let thinkingBudget = thinkingType === "enabled" ? (_e = anthropicOptions == null ? void 0 : anthropicOptions.thinking) == null ? void 0 : _e.budgetTokens : void 0;
		const maxTokens = maxOutputTokens != null ? maxOutputTokens : maxOutputTokensForModel;
		const baseArgs = {
			model: this.modelId,
			max_tokens: maxTokens,
			temperature,
			top_k: topK,
			top_p: topP,
			stop_sequences: stopSequences,
			...isThinking && { thinking: {
				type: thinkingType,
				...thinkingBudget != null && { budget_tokens: thinkingBudget }
			} },
			...(anthropicOptions == null ? void 0 : anthropicOptions.effort) && { output_config: { effort: anthropicOptions.effort } },
			...(anthropicOptions == null ? void 0 : anthropicOptions.speed) && { speed: anthropicOptions.speed },
			...useStructuredOutput && (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && { output_format: {
				type: "json_schema",
				schema: responseFormat.schema
			} },
			...(anthropicOptions == null ? void 0 : anthropicOptions.mcpServers) && anthropicOptions.mcpServers.length > 0 && { mcp_servers: anthropicOptions.mcpServers.map((server) => ({
				type: server.type,
				name: server.name,
				url: server.url,
				authorization_token: server.authorizationToken,
				tool_configuration: server.toolConfiguration ? {
					allowed_tools: server.toolConfiguration.allowedTools,
					enabled: server.toolConfiguration.enabled
				} : void 0
			})) },
			...(anthropicOptions == null ? void 0 : anthropicOptions.container) && { container: anthropicOptions.container.skills && anthropicOptions.container.skills.length > 0 ? {
				id: anthropicOptions.container.id,
				skills: anthropicOptions.container.skills.map((skill) => ({
					type: skill.type,
					skill_id: skill.skillId,
					version: skill.version
				}))
			} : anthropicOptions.container.id },
			system: messagesPrompt.system,
			messages: messagesPrompt.messages,
			...contextManagement && { context_management: { edits: contextManagement.edits.map((edit) => {
				const strategy = edit.type;
				switch (strategy) {
					case "clear_tool_uses_20250919": return {
						type: edit.type,
						...edit.trigger !== void 0 && { trigger: edit.trigger },
						...edit.keep !== void 0 && { keep: edit.keep },
						...edit.clearAtLeast !== void 0 && { clear_at_least: edit.clearAtLeast },
						...edit.clearToolInputs !== void 0 && { clear_tool_inputs: edit.clearToolInputs },
						...edit.excludeTools !== void 0 && { exclude_tools: edit.excludeTools }
					};
					case "clear_thinking_20251015": return {
						type: edit.type,
						...edit.keep !== void 0 && { keep: edit.keep }
					};
					case "compact_20260112": return {
						type: edit.type,
						...edit.trigger !== void 0 && { trigger: edit.trigger },
						...edit.pauseAfterCompaction !== void 0 && { pause_after_compaction: edit.pauseAfterCompaction },
						...edit.instructions !== void 0 && { instructions: edit.instructions }
					};
					default:
						warnings.push({
							type: "other",
							message: `Unknown context management strategy: ${strategy}`
						});
						return;
				}
			}).filter((edit) => edit !== void 0) } }
		};
		if (isThinking) {
			if (thinkingType === "enabled" && thinkingBudget == null) {
				warnings.push({
					type: "compatibility",
					feature: "extended thinking",
					details: "thinking budget is required when thinking is enabled. using default budget of 1024 tokens."
				});
				baseArgs.thinking = {
					type: "enabled",
					budget_tokens: 1024
				};
				thinkingBudget = 1024;
			}
			if (baseArgs.temperature != null) {
				baseArgs.temperature = void 0;
				warnings.push({
					type: "unsupported",
					feature: "temperature",
					details: "temperature is not supported when thinking is enabled"
				});
			}
			if (topK != null) {
				baseArgs.top_k = void 0;
				warnings.push({
					type: "unsupported",
					feature: "topK",
					details: "topK is not supported when thinking is enabled"
				});
			}
			if (topP != null) {
				baseArgs.top_p = void 0;
				warnings.push({
					type: "unsupported",
					feature: "topP",
					details: "topP is not supported when thinking is enabled"
				});
			}
			baseArgs.max_tokens = maxTokens + (thinkingBudget != null ? thinkingBudget : 0);
		} else if (topP != null && temperature != null) {
			warnings.push({
				type: "unsupported",
				feature: "topP",
				details: `topP is not supported when temperature is set. topP is ignored.`
			});
			baseArgs.top_p = void 0;
		}
		if (isKnownModel && baseArgs.max_tokens > maxOutputTokensForModel) {
			if (maxOutputTokens != null) warnings.push({
				type: "unsupported",
				feature: "maxOutputTokens",
				details: `${baseArgs.max_tokens} (maxOutputTokens + thinkingBudget) is greater than ${this.modelId} ${maxOutputTokensForModel} max output tokens. The max output tokens have been limited to ${maxOutputTokensForModel}.`
			});
			baseArgs.max_tokens = maxOutputTokensForModel;
		}
		if ((anthropicOptions == null ? void 0 : anthropicOptions.mcpServers) && anthropicOptions.mcpServers.length > 0) betas.add("mcp-client-2025-04-04");
		if (contextManagement) {
			betas.add("context-management-2025-06-27");
			if (contextManagement.edits.some((e) => e.type === "compact_20260112")) betas.add("compact-2026-01-12");
		}
		if ((anthropicOptions == null ? void 0 : anthropicOptions.container) && anthropicOptions.container.skills && anthropicOptions.container.skills.length > 0) {
			betas.add("code-execution-2025-08-25");
			betas.add("skills-2025-10-02");
			betas.add("files-api-2025-04-14");
			if (!(tools == null ? void 0 : tools.some((tool) => tool.type === "provider" && tool.id === "anthropic.code_execution_20250825"))) warnings.push({
				type: "other",
				message: "code execution tool is required when using skills"
			});
		}
		if (anthropicOptions == null ? void 0 : anthropicOptions.effort) betas.add("effort-2025-11-24");
		if ((anthropicOptions == null ? void 0 : anthropicOptions.speed) === "fast") betas.add("fast-mode-2026-02-01");
		if (stream && ((_f = anthropicOptions == null ? void 0 : anthropicOptions.toolStreaming) != null ? _f : true)) betas.add("fine-grained-tool-streaming-2025-05-14");
		if (useStructuredOutput && (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null) betas.add("structured-outputs-2025-11-13");
		const { tools: anthropicTools2, toolChoice: anthropicToolChoice, toolWarnings, betas: toolsBetas } = await prepareTools(jsonResponseTool != null ? {
			tools: [...tools != null ? tools : [], jsonResponseTool],
			toolChoice: { type: "required" },
			disableParallelToolUse: true,
			cacheControlValidator,
			supportsStructuredOutput: false
		} : {
			tools: tools != null ? tools : [],
			toolChoice,
			disableParallelToolUse: anthropicOptions == null ? void 0 : anthropicOptions.disableParallelToolUse,
			cacheControlValidator,
			supportsStructuredOutput
		});
		const cacheWarnings = cacheControlValidator.getWarnings();
		return {
			args: {
				...baseArgs,
				tools: anthropicTools2,
				tool_choice: anthropicToolChoice,
				stream: stream === true ? true : void 0
			},
			warnings: [
				...warnings,
				...toolWarnings,
				...cacheWarnings
			],
			betas: /* @__PURE__ */ new Set([
				...betas,
				...toolsBetas,
				...userSuppliedBetas
			]),
			usesJsonResponseTool: jsonResponseTool != null,
			toolNameMapping,
			providerOptionsName,
			usedCustomProviderKey
		};
	}
	async getHeaders({ betas, headers }) {
		return combineHeaders(await resolve(this.config.headers), headers, betas.size > 0 ? { "anthropic-beta": Array.from(betas).join(",") } : {});
	}
	async getBetasFromHeaders(requestHeaders) {
		var _a, _b;
		const configBetaHeader = (_a = (await resolve(this.config.headers))["anthropic-beta"]) != null ? _a : "";
		const requestBetaHeader = (_b = requestHeaders == null ? void 0 : requestHeaders["anthropic-beta"]) != null ? _b : "";
		return new Set([...configBetaHeader.toLowerCase().split(","), ...requestBetaHeader.toLowerCase().split(",")].map((beta) => beta.trim()).filter((beta) => beta !== ""));
	}
	buildRequestUrl(isStreaming) {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).buildRequestUrl) == null ? void 0 : _b.call(_a, this.config.baseURL, isStreaming)) != null ? _c : `${this.config.baseURL}/messages`;
	}
	transformRequestBody(args) {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).transformRequestBody) == null ? void 0 : _b.call(_a, args)) != null ? _c : args;
	}
	extractCitationDocuments(prompt) {
		const isCitationPart = (part) => {
			var _a, _b;
			if (part.type !== "file") return false;
			if (part.mediaType !== "application/pdf" && part.mediaType !== "text/plain") return false;
			const anthropic2 = (_a = part.providerOptions) == null ? void 0 : _a.anthropic;
			const citationsConfig = anthropic2 == null ? void 0 : anthropic2.citations;
			return (_b = citationsConfig == null ? void 0 : citationsConfig.enabled) != null ? _b : false;
		};
		return prompt.filter((message) => message.role === "user").flatMap((message) => message.content).filter(isCitationPart).map((part) => {
			var _a;
			const filePart = part;
			return {
				title: (_a = filePart.filename) != null ? _a : "Untitled Document",
				filename: filePart.filename,
				mediaType: filePart.mediaType
			};
		});
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f;
		const { args, warnings, betas, usesJsonResponseTool, toolNameMapping, providerOptionsName, usedCustomProviderKey } = await this.getArgs({
			...options,
			stream: false,
			userSuppliedBetas: await this.getBetasFromHeaders(options.headers)
		});
		const citationDocuments = [...this.extractCitationDocuments(options.prompt)];
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: this.buildRequestUrl(false),
			headers: await this.getHeaders({
				betas,
				headers: options.headers
			}),
			body: this.transformRequestBody(args),
			failedResponseHandler: anthropicFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(anthropicMessagesResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const content = [];
		const mcpToolCalls = {};
		const serverToolCalls = {};
		let isJsonResponseFromTool = false;
		for (const part of response.content) switch (part.type) {
			case "text":
				if (!usesJsonResponseTool) {
					content.push({
						type: "text",
						text: part.text
					});
					if (part.citations) for (const citation of part.citations) {
						const source = createCitationSource(citation, citationDocuments, this.generateId);
						if (source) content.push(source);
					}
				}
				break;
			case "thinking":
				content.push({
					type: "reasoning",
					text: part.thinking,
					providerMetadata: { anthropic: { signature: part.signature } }
				});
				break;
			case "redacted_thinking":
				content.push({
					type: "reasoning",
					text: "",
					providerMetadata: { anthropic: { redactedData: part.data } }
				});
				break;
			case "compaction":
				content.push({
					type: "text",
					text: part.content,
					providerMetadata: { anthropic: { type: "compaction" } }
				});
				break;
			case "tool_use":
				if (usesJsonResponseTool && part.name === "json") {
					isJsonResponseFromTool = true;
					content.push({
						type: "text",
						text: JSON.stringify(part.input)
					});
				} else {
					const caller = part.caller;
					const callerInfo = caller ? {
						type: caller.type,
						toolId: "tool_id" in caller ? caller.tool_id : void 0
					} : void 0;
					content.push({
						type: "tool-call",
						toolCallId: part.id,
						toolName: part.name,
						input: JSON.stringify(part.input),
						...callerInfo && { providerMetadata: { anthropic: { caller: callerInfo } } }
					});
				}
				break;
			case "server_tool_use":
				if (part.name === "text_editor_code_execution" || part.name === "bash_code_execution") content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					input: JSON.stringify({
						type: part.name,
						...part.input
					}),
					providerExecuted: true
				});
				else if (part.name === "web_search" || part.name === "code_execution" || part.name === "web_fetch") {
					const inputToSerialize = part.name === "code_execution" && part.input != null && typeof part.input === "object" && "code" in part.input && !("type" in part.input) ? {
						type: "programmatic-tool-call",
						...part.input
					} : part.input;
					content.push({
						type: "tool-call",
						toolCallId: part.id,
						toolName: toolNameMapping.toCustomToolName(part.name),
						input: JSON.stringify(inputToSerialize),
						providerExecuted: true
					});
				} else if (part.name === "tool_search_tool_regex" || part.name === "tool_search_tool_bm25") {
					serverToolCalls[part.id] = part.name;
					content.push({
						type: "tool-call",
						toolCallId: part.id,
						toolName: toolNameMapping.toCustomToolName(part.name),
						input: JSON.stringify(part.input),
						providerExecuted: true
					});
				}
				break;
			case "mcp_tool_use":
				mcpToolCalls[part.id] = {
					type: "tool-call",
					toolCallId: part.id,
					toolName: part.name,
					input: JSON.stringify(part.input),
					providerExecuted: true,
					dynamic: true,
					providerMetadata: { anthropic: {
						type: "mcp-tool-use",
						serverName: part.server_name
					} }
				};
				content.push(mcpToolCalls[part.id]);
				break;
			case "mcp_tool_result":
				content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: mcpToolCalls[part.tool_use_id].toolName,
					isError: part.is_error,
					result: part.content,
					dynamic: true,
					providerMetadata: mcpToolCalls[part.tool_use_id].providerMetadata
				});
				break;
			case "web_fetch_tool_result":
				if (part.content.type === "web_fetch_result") {
					citationDocuments.push({
						title: (_a = part.content.content.title) != null ? _a : part.content.url,
						mediaType: part.content.content.source.media_type
					});
					content.push({
						type: "tool-result",
						toolCallId: part.tool_use_id,
						toolName: toolNameMapping.toCustomToolName("web_fetch"),
						result: {
							type: "web_fetch_result",
							url: part.content.url,
							retrievedAt: part.content.retrieved_at,
							content: {
								type: part.content.content.type,
								title: part.content.content.title,
								citations: part.content.content.citations,
								source: {
									type: part.content.content.source.type,
									mediaType: part.content.content.source.media_type,
									data: part.content.content.source.data
								}
							}
						}
					});
				} else if (part.content.type === "web_fetch_tool_result_error") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("web_fetch"),
					isError: true,
					result: {
						type: "web_fetch_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			case "web_search_tool_result":
				if (Array.isArray(part.content)) {
					content.push({
						type: "tool-result",
						toolCallId: part.tool_use_id,
						toolName: toolNameMapping.toCustomToolName("web_search"),
						result: part.content.map((result) => {
							var _a2;
							return {
								url: result.url,
								title: result.title,
								pageAge: (_a2 = result.page_age) != null ? _a2 : null,
								encryptedContent: result.encrypted_content,
								type: result.type
							};
						})
					});
					for (const result of part.content) content.push({
						type: "source",
						sourceType: "url",
						id: this.generateId(),
						url: result.url,
						title: result.title,
						providerMetadata: { anthropic: { pageAge: (_b = result.page_age) != null ? _b : null } }
					});
				} else content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("web_search"),
					isError: true,
					result: {
						type: "web_search_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			case "code_execution_tool_result":
				if (part.content.type === "code_execution_result") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					result: {
						type: part.content.type,
						stdout: part.content.stdout,
						stderr: part.content.stderr,
						return_code: part.content.return_code,
						content: (_c = part.content.content) != null ? _c : []
					}
				});
				else if (part.content.type === "code_execution_tool_result_error") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					isError: true,
					result: {
						type: "code_execution_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			case "bash_code_execution_tool_result":
			case "text_editor_code_execution_tool_result":
				content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName("code_execution"),
					result: part.content
				});
				break;
			case "tool_search_tool_result": {
				let providerToolName = serverToolCalls[part.tool_use_id];
				if (providerToolName == null) {
					const bm25CustomName = toolNameMapping.toCustomToolName("tool_search_tool_bm25");
					const regexCustomName = toolNameMapping.toCustomToolName("tool_search_tool_regex");
					if (bm25CustomName !== "tool_search_tool_bm25") providerToolName = "tool_search_tool_bm25";
					else if (regexCustomName !== "tool_search_tool_regex") providerToolName = "tool_search_tool_regex";
					else providerToolName = "tool_search_tool_regex";
				}
				if (part.content.type === "tool_search_tool_search_result") content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName(providerToolName),
					result: part.content.tool_references.map((ref) => ({
						type: ref.type,
						toolName: ref.tool_name
					}))
				});
				else content.push({
					type: "tool-result",
					toolCallId: part.tool_use_id,
					toolName: toolNameMapping.toCustomToolName(providerToolName),
					isError: true,
					result: {
						type: "tool_search_tool_result_error",
						errorCode: part.content.error_code
					}
				});
				break;
			}
		}
		return {
			content,
			finishReason: {
				unified: mapAnthropicStopReason({
					finishReason: response.stop_reason,
					isJsonResponseFromTool
				}),
				raw: (_d = response.stop_reason) != null ? _d : void 0
			},
			usage: convertAnthropicMessagesUsage({ usage: response.usage }),
			request: { body: args },
			response: {
				id: (_e = response.id) != null ? _e : void 0,
				modelId: (_f = response.model) != null ? _f : void 0,
				headers: responseHeaders,
				body: rawResponse
			},
			warnings,
			providerMetadata: (() => {
				var _a2, _b2, _c2, _d2, _e2;
				const anthropicMetadata = {
					usage: response.usage,
					cacheCreationInputTokens: (_a2 = response.usage.cache_creation_input_tokens) != null ? _a2 : null,
					stopSequence: (_b2 = response.stop_sequence) != null ? _b2 : null,
					iterations: response.usage.iterations ? response.usage.iterations.map((iter) => ({
						type: iter.type,
						inputTokens: iter.input_tokens,
						outputTokens: iter.output_tokens
					})) : null,
					container: response.container ? {
						expiresAt: response.container.expires_at,
						id: response.container.id,
						skills: (_d2 = (_c2 = response.container.skills) == null ? void 0 : _c2.map((skill) => ({
							type: skill.type,
							skillId: skill.skill_id,
							version: skill.version
						}))) != null ? _d2 : null
					} : null,
					contextManagement: (_e2 = mapAnthropicResponseContextManagement(response.context_management)) != null ? _e2 : null
				};
				const providerMetadata = { anthropic: anthropicMetadata };
				if (usedCustomProviderKey && providerOptionsName !== "anthropic") providerMetadata[providerOptionsName] = anthropicMetadata;
				return providerMetadata;
			})()
		};
	}
	async doStream(options) {
		var _a, _b;
		const { args: body, warnings, betas, usesJsonResponseTool, toolNameMapping, providerOptionsName, usedCustomProviderKey } = await this.getArgs({
			...options,
			stream: true,
			userSuppliedBetas: await this.getBetasFromHeaders(options.headers)
		});
		const citationDocuments = [...this.extractCitationDocuments(options.prompt)];
		const url = this.buildRequestUrl(true);
		const { responseHeaders, value: response } = await postJsonToApi({
			url,
			headers: await this.getHeaders({
				betas,
				headers: options.headers
			}),
			body: this.transformRequestBody(body),
			failedResponseHandler: anthropicFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(anthropicMessagesChunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = {
			unified: "other",
			raw: void 0
		};
		const usage = {
			input_tokens: 0,
			output_tokens: 0,
			cache_creation_input_tokens: 0,
			cache_read_input_tokens: 0,
			iterations: null
		};
		const contentBlocks = {};
		const mcpToolCalls = {};
		const serverToolCalls = {};
		let contextManagement = null;
		let rawUsage = void 0;
		let cacheCreationInputTokens = null;
		let stopSequence = null;
		let container = null;
		let isJsonResponseFromTool = false;
		let blockType = void 0;
		const generateId3 = this.generateId;
		const [streamForFirstChunk, streamForConsumer] = response.pipeThrough(new TransformStream({
			start(controller) {
				controller.enqueue({
					type: "stream-start",
					warnings
				});
			},
			transform(chunk, controller) {
				var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
				if (options.includeRawChunks) controller.enqueue({
					type: "raw",
					rawValue: chunk.rawValue
				});
				if (!chunk.success) {
					controller.enqueue({
						type: "error",
						error: chunk.error
					});
					return;
				}
				const value = chunk.value;
				switch (value.type) {
					case "ping": return;
					case "content_block_start": {
						const part = value.content_block;
						const contentBlockType = part.type;
						blockType = contentBlockType;
						switch (contentBlockType) {
							case "text":
								if (usesJsonResponseTool) return;
								contentBlocks[value.index] = { type: "text" };
								controller.enqueue({
									type: "text-start",
									id: String(value.index)
								});
								return;
							case "thinking":
								contentBlocks[value.index] = { type: "reasoning" };
								controller.enqueue({
									type: "reasoning-start",
									id: String(value.index)
								});
								return;
							case "redacted_thinking":
								contentBlocks[value.index] = { type: "reasoning" };
								controller.enqueue({
									type: "reasoning-start",
									id: String(value.index),
									providerMetadata: { anthropic: { redactedData: part.data } }
								});
								return;
							case "compaction":
								contentBlocks[value.index] = { type: "text" };
								controller.enqueue({
									type: "text-start",
									id: String(value.index),
									providerMetadata: { anthropic: { type: "compaction" } }
								});
								return;
							case "tool_use":
								if (usesJsonResponseTool && part.name === "json") {
									isJsonResponseFromTool = true;
									contentBlocks[value.index] = { type: "text" };
									controller.enqueue({
										type: "text-start",
										id: String(value.index)
									});
								} else {
									const caller = part.caller;
									const callerInfo = caller ? {
										type: caller.type,
										toolId: "tool_id" in caller ? caller.tool_id : void 0
									} : void 0;
									const initialInput = part.input && Object.keys(part.input).length > 0 ? JSON.stringify(part.input) : "";
									contentBlocks[value.index] = {
										type: "tool-call",
										toolCallId: part.id,
										toolName: part.name,
										input: initialInput,
										firstDelta: initialInput.length === 0,
										...callerInfo && { caller: callerInfo }
									};
									controller.enqueue({
										type: "tool-input-start",
										id: part.id,
										toolName: part.name
									});
								}
								return;
							case "server_tool_use":
								if ([
									"web_fetch",
									"web_search",
									"code_execution",
									"text_editor_code_execution",
									"bash_code_execution"
								].includes(part.name)) {
									const providerToolName = part.name === "text_editor_code_execution" || part.name === "bash_code_execution" ? "code_execution" : part.name;
									const customToolName = toolNameMapping.toCustomToolName(providerToolName);
									contentBlocks[value.index] = {
										type: "tool-call",
										toolCallId: part.id,
										toolName: customToolName,
										input: "",
										providerExecuted: true,
										firstDelta: true,
										providerToolName: part.name
									};
									controller.enqueue({
										type: "tool-input-start",
										id: part.id,
										toolName: customToolName,
										providerExecuted: true
									});
								} else if (part.name === "tool_search_tool_regex" || part.name === "tool_search_tool_bm25") {
									serverToolCalls[part.id] = part.name;
									const customToolName = toolNameMapping.toCustomToolName(part.name);
									contentBlocks[value.index] = {
										type: "tool-call",
										toolCallId: part.id,
										toolName: customToolName,
										input: "",
										providerExecuted: true,
										firstDelta: true,
										providerToolName: part.name
									};
									controller.enqueue({
										type: "tool-input-start",
										id: part.id,
										toolName: customToolName,
										providerExecuted: true
									});
								}
								return;
							case "web_fetch_tool_result":
								if (part.content.type === "web_fetch_result") {
									citationDocuments.push({
										title: (_a2 = part.content.content.title) != null ? _a2 : part.content.url,
										mediaType: part.content.content.source.media_type
									});
									controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: toolNameMapping.toCustomToolName("web_fetch"),
										result: {
											type: "web_fetch_result",
											url: part.content.url,
											retrievedAt: part.content.retrieved_at,
											content: {
												type: part.content.content.type,
												title: part.content.content.title,
												citations: part.content.content.citations,
												source: {
													type: part.content.content.source.type,
													mediaType: part.content.content.source.media_type,
													data: part.content.content.source.data
												}
											}
										}
									});
								} else if (part.content.type === "web_fetch_tool_result_error") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("web_fetch"),
									isError: true,
									result: {
										type: "web_fetch_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							case "web_search_tool_result":
								if (Array.isArray(part.content)) {
									controller.enqueue({
										type: "tool-result",
										toolCallId: part.tool_use_id,
										toolName: toolNameMapping.toCustomToolName("web_search"),
										result: part.content.map((result) => {
											var _a3;
											return {
												url: result.url,
												title: result.title,
												pageAge: (_a3 = result.page_age) != null ? _a3 : null,
												encryptedContent: result.encrypted_content,
												type: result.type
											};
										})
									});
									for (const result of part.content) controller.enqueue({
										type: "source",
										sourceType: "url",
										id: generateId3(),
										url: result.url,
										title: result.title,
										providerMetadata: { anthropic: { pageAge: (_b2 = result.page_age) != null ? _b2 : null } }
									});
								} else controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("web_search"),
									isError: true,
									result: {
										type: "web_search_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							case "code_execution_tool_result":
								if (part.content.type === "code_execution_result") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("code_execution"),
									result: {
										type: part.content.type,
										stdout: part.content.stdout,
										stderr: part.content.stderr,
										return_code: part.content.return_code,
										content: (_c = part.content.content) != null ? _c : []
									}
								});
								else if (part.content.type === "code_execution_tool_result_error") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("code_execution"),
									isError: true,
									result: {
										type: "code_execution_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							case "bash_code_execution_tool_result":
							case "text_editor_code_execution_tool_result":
								controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName("code_execution"),
									result: part.content
								});
								return;
							case "tool_search_tool_result": {
								let providerToolName = serverToolCalls[part.tool_use_id];
								if (providerToolName == null) {
									const bm25CustomName = toolNameMapping.toCustomToolName("tool_search_tool_bm25");
									const regexCustomName = toolNameMapping.toCustomToolName("tool_search_tool_regex");
									if (bm25CustomName !== "tool_search_tool_bm25") providerToolName = "tool_search_tool_bm25";
									else if (regexCustomName !== "tool_search_tool_regex") providerToolName = "tool_search_tool_regex";
									else providerToolName = "tool_search_tool_regex";
								}
								if (part.content.type === "tool_search_tool_search_result") controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName(providerToolName),
									result: part.content.tool_references.map((ref) => ({
										type: ref.type,
										toolName: ref.tool_name
									}))
								});
								else controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: toolNameMapping.toCustomToolName(providerToolName),
									isError: true,
									result: {
										type: "tool_search_tool_result_error",
										errorCode: part.content.error_code
									}
								});
								return;
							}
							case "mcp_tool_use":
								mcpToolCalls[part.id] = {
									type: "tool-call",
									toolCallId: part.id,
									toolName: part.name,
									input: JSON.stringify(part.input),
									providerExecuted: true,
									dynamic: true,
									providerMetadata: { anthropic: {
										type: "mcp-tool-use",
										serverName: part.server_name
									} }
								};
								controller.enqueue(mcpToolCalls[part.id]);
								return;
							case "mcp_tool_result":
								controller.enqueue({
									type: "tool-result",
									toolCallId: part.tool_use_id,
									toolName: mcpToolCalls[part.tool_use_id].toolName,
									isError: part.is_error,
									result: part.content,
									dynamic: true,
									providerMetadata: mcpToolCalls[part.tool_use_id].providerMetadata
								});
								return;
							default: {
								const _exhaustiveCheck = contentBlockType;
								throw new Error(`Unsupported content block type: ${_exhaustiveCheck}`);
							}
						}
					}
					case "content_block_stop":
						if (contentBlocks[value.index] != null) {
							const contentBlock = contentBlocks[value.index];
							switch (contentBlock.type) {
								case "text":
									controller.enqueue({
										type: "text-end",
										id: String(value.index)
									});
									break;
								case "reasoning":
									controller.enqueue({
										type: "reasoning-end",
										id: String(value.index)
									});
									break;
								case "tool-call":
									if (!(usesJsonResponseTool && contentBlock.toolName === "json")) {
										controller.enqueue({
											type: "tool-input-end",
											id: contentBlock.toolCallId
										});
										let finalInput = contentBlock.input === "" ? "{}" : contentBlock.input;
										if (contentBlock.providerToolName === "code_execution") try {
											const parsed = JSON.parse(finalInput);
											if (parsed != null && typeof parsed === "object" && "code" in parsed && !("type" in parsed)) finalInput = JSON.stringify({
												type: "programmatic-tool-call",
												...parsed
											});
										} catch (e) {}
										controller.enqueue({
											type: "tool-call",
											toolCallId: contentBlock.toolCallId,
											toolName: contentBlock.toolName,
											input: finalInput,
											providerExecuted: contentBlock.providerExecuted,
											...contentBlock.caller && { providerMetadata: { anthropic: { caller: contentBlock.caller } } }
										});
									}
									break;
							}
							delete contentBlocks[value.index];
						}
						blockType = void 0;
						return;
					case "content_block_delta": {
						const deltaType = value.delta.type;
						switch (deltaType) {
							case "text_delta":
								if (usesJsonResponseTool) return;
								controller.enqueue({
									type: "text-delta",
									id: String(value.index),
									delta: value.delta.text
								});
								return;
							case "thinking_delta":
								controller.enqueue({
									type: "reasoning-delta",
									id: String(value.index),
									delta: value.delta.thinking
								});
								return;
							case "signature_delta":
								if (blockType === "thinking") controller.enqueue({
									type: "reasoning-delta",
									id: String(value.index),
									delta: "",
									providerMetadata: { anthropic: { signature: value.delta.signature } }
								});
								return;
							case "compaction_delta":
								controller.enqueue({
									type: "text-delta",
									id: String(value.index),
									delta: value.delta.content
								});
								return;
							case "input_json_delta": {
								const contentBlock = contentBlocks[value.index];
								let delta = value.delta.partial_json;
								if (delta.length === 0) return;
								if (isJsonResponseFromTool) {
									if ((contentBlock == null ? void 0 : contentBlock.type) !== "text") return;
									controller.enqueue({
										type: "text-delta",
										id: String(value.index),
										delta
									});
								} else {
									if ((contentBlock == null ? void 0 : contentBlock.type) !== "tool-call") return;
									if (contentBlock.firstDelta && (contentBlock.providerToolName === "bash_code_execution" || contentBlock.providerToolName === "text_editor_code_execution")) delta = `{"type": "${contentBlock.providerToolName}",${delta.substring(1)}`;
									controller.enqueue({
										type: "tool-input-delta",
										id: contentBlock.toolCallId,
										delta
									});
									contentBlock.input += delta;
									contentBlock.firstDelta = false;
								}
								return;
							}
							case "citations_delta": {
								const citation = value.delta.citation;
								const source = createCitationSource(citation, citationDocuments, generateId3);
								if (source) controller.enqueue(source);
								return;
							}
							default: {
								const _exhaustiveCheck = deltaType;
								throw new Error(`Unsupported delta type: ${_exhaustiveCheck}`);
							}
						}
					}
					case "message_start":
						usage.input_tokens = value.message.usage.input_tokens;
						usage.cache_read_input_tokens = (_d = value.message.usage.cache_read_input_tokens) != null ? _d : 0;
						usage.cache_creation_input_tokens = (_e = value.message.usage.cache_creation_input_tokens) != null ? _e : 0;
						rawUsage = { ...value.message.usage };
						cacheCreationInputTokens = (_f = value.message.usage.cache_creation_input_tokens) != null ? _f : null;
						if (value.message.container != null) container = {
							expiresAt: value.message.container.expires_at,
							id: value.message.container.id,
							skills: null
						};
						if (value.message.stop_reason != null) finishReason = {
							unified: mapAnthropicStopReason({
								finishReason: value.message.stop_reason,
								isJsonResponseFromTool
							}),
							raw: value.message.stop_reason
						};
						controller.enqueue({
							type: "response-metadata",
							id: (_g = value.message.id) != null ? _g : void 0,
							modelId: (_h = value.message.model) != null ? _h : void 0
						});
						if (value.message.content != null) for (let contentIndex = 0; contentIndex < value.message.content.length; contentIndex++) {
							const part = value.message.content[contentIndex];
							if (part.type === "tool_use") {
								const caller = part.caller;
								const callerInfo = caller ? {
									type: caller.type,
									toolId: "tool_id" in caller ? caller.tool_id : void 0
								} : void 0;
								controller.enqueue({
									type: "tool-input-start",
									id: part.id,
									toolName: part.name
								});
								const inputStr = JSON.stringify((_i = part.input) != null ? _i : {});
								controller.enqueue({
									type: "tool-input-delta",
									id: part.id,
									delta: inputStr
								});
								controller.enqueue({
									type: "tool-input-end",
									id: part.id
								});
								controller.enqueue({
									type: "tool-call",
									toolCallId: part.id,
									toolName: part.name,
									input: inputStr,
									...callerInfo && { providerMetadata: { anthropic: { caller: callerInfo } } }
								});
							}
						}
						return;
					case "message_delta":
						if (value.usage.input_tokens != null && usage.input_tokens !== value.usage.input_tokens) usage.input_tokens = value.usage.input_tokens;
						usage.output_tokens = value.usage.output_tokens;
						if (value.usage.cache_read_input_tokens != null) usage.cache_read_input_tokens = value.usage.cache_read_input_tokens;
						if (value.usage.cache_creation_input_tokens != null) {
							usage.cache_creation_input_tokens = value.usage.cache_creation_input_tokens;
							cacheCreationInputTokens = value.usage.cache_creation_input_tokens;
						}
						if (value.usage.iterations != null) usage.iterations = value.usage.iterations;
						finishReason = {
							unified: mapAnthropicStopReason({
								finishReason: value.delta.stop_reason,
								isJsonResponseFromTool
							}),
							raw: (_j = value.delta.stop_reason) != null ? _j : void 0
						};
						stopSequence = (_k = value.delta.stop_sequence) != null ? _k : null;
						container = value.delta.container != null ? {
							expiresAt: value.delta.container.expires_at,
							id: value.delta.container.id,
							skills: (_m = (_l = value.delta.container.skills) == null ? void 0 : _l.map((skill) => ({
								type: skill.type,
								skillId: skill.skill_id,
								version: skill.version
							}))) != null ? _m : null
						} : null;
						if (value.context_management) contextManagement = mapAnthropicResponseContextManagement(value.context_management);
						rawUsage = {
							...rawUsage,
							...value.usage
						};
						return;
					case "message_stop": {
						const anthropicMetadata = {
							usage: rawUsage != null ? rawUsage : null,
							cacheCreationInputTokens,
							stopSequence,
							iterations: usage.iterations ? usage.iterations.map((iter) => ({
								type: iter.type,
								inputTokens: iter.input_tokens,
								outputTokens: iter.output_tokens
							})) : null,
							container,
							contextManagement
						};
						const providerMetadata = { anthropic: anthropicMetadata };
						if (usedCustomProviderKey && providerOptionsName !== "anthropic") providerMetadata[providerOptionsName] = anthropicMetadata;
						controller.enqueue({
							type: "finish",
							finishReason,
							usage: convertAnthropicMessagesUsage({
								usage,
								rawUsage
							}),
							providerMetadata
						});
						return;
					}
					case "error":
						controller.enqueue({
							type: "error",
							error: value.error
						});
						return;
					default: {
						const _exhaustiveCheck = value;
						throw new Error(`Unsupported chunk type: ${_exhaustiveCheck}`);
					}
				}
			}
		})).tee();
		const firstChunkReader = streamForFirstChunk.getReader();
		try {
			await firstChunkReader.read();
			let result = await firstChunkReader.read();
			if (((_a = result.value) == null ? void 0 : _a.type) === "raw") result = await firstChunkReader.read();
			if (((_b = result.value) == null ? void 0 : _b.type) === "error") {
				const error = result.value.error;
				throw new APICallError({
					message: error.message,
					url,
					requestBodyValues: body,
					statusCode: error.type === "overloaded_error" ? 529 : 500,
					responseHeaders,
					responseBody: JSON.stringify(error),
					isRetryable: error.type === "overloaded_error"
				});
			}
		} finally {
			firstChunkReader.cancel().catch(() => {});
			firstChunkReader.releaseLock();
		}
		return {
			stream: streamForConsumer,
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
function getModelCapabilities(modelId) {
	if (modelId.includes("claude-opus-4-6")) return {
		maxOutputTokens: 128e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-sonnet-4-5") || modelId.includes("claude-opus-4-5") || modelId.includes("claude-haiku-4-5")) return {
		maxOutputTokens: 64e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-opus-4-1")) return {
		maxOutputTokens: 32e3,
		supportsStructuredOutput: true,
		isKnownModel: true
	};
	else if (modelId.includes("claude-sonnet-4-") || modelId.includes("claude-3-7-sonnet")) return {
		maxOutputTokens: 64e3,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else if (modelId.includes("claude-opus-4-")) return {
		maxOutputTokens: 32e3,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else if (modelId.includes("claude-3-5-haiku")) return {
		maxOutputTokens: 8192,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else if (modelId.includes("claude-3-haiku")) return {
		maxOutputTokens: 4096,
		supportsStructuredOutput: false,
		isKnownModel: true
	};
	else return {
		maxOutputTokens: 4096,
		supportsStructuredOutput: false,
		isKnownModel: false
	};
}
function mapAnthropicResponseContextManagement(contextManagement) {
	return contextManagement ? { appliedEdits: contextManagement.applied_edits.map((edit) => {
		switch (edit.type) {
			case "clear_tool_uses_20250919": return {
				type: edit.type,
				clearedToolUses: edit.cleared_tool_uses,
				clearedInputTokens: edit.cleared_input_tokens
			};
			case "clear_thinking_20251015": return {
				type: edit.type,
				clearedThinkingTurns: edit.cleared_thinking_turns,
				clearedInputTokens: edit.cleared_input_tokens
			};
			case "compact_20260112": return { type: edit.type };
		}
	}).filter((edit) => edit !== void 0) } : null;
}
var bash_20241022 = createProviderToolFactory({
	id: "anthropic.bash_20241022",
	inputSchema: lazySchema(() => zodSchema(object({
		command: string(),
		restart: boolean().optional()
	})))
});
var bash_20250124 = createProviderToolFactory({
	id: "anthropic.bash_20250124",
	inputSchema: lazySchema(() => zodSchema(object({
		command: string(),
		restart: boolean().optional()
	})))
});
var computer_20241022 = createProviderToolFactory({
	id: "anthropic.computer_20241022",
	inputSchema: lazySchema(() => zodSchema(object({
		action: _enum([
			"key",
			"type",
			"mouse_move",
			"left_click",
			"left_click_drag",
			"right_click",
			"middle_click",
			"double_click",
			"screenshot",
			"cursor_position"
		]),
		coordinate: array(number().int()).optional(),
		text: string().optional()
	})))
});
var computer_20250124 = createProviderToolFactory({
	id: "anthropic.computer_20250124",
	inputSchema: lazySchema(() => zodSchema(object({
		action: _enum([
			"key",
			"hold_key",
			"type",
			"cursor_position",
			"mouse_move",
			"left_mouse_down",
			"left_mouse_up",
			"left_click",
			"left_click_drag",
			"right_click",
			"middle_click",
			"double_click",
			"triple_click",
			"scroll",
			"wait",
			"screenshot"
		]),
		coordinate: tuple([number().int(), number().int()]).optional(),
		duration: number().optional(),
		scroll_amount: number().optional(),
		scroll_direction: _enum([
			"up",
			"down",
			"left",
			"right"
		]).optional(),
		start_coordinate: tuple([number().int(), number().int()]).optional(),
		text: string().optional()
	})))
});
var computer_20251124 = createProviderToolFactory({
	id: "anthropic.computer_20251124",
	inputSchema: lazySchema(() => zodSchema(object({
		action: _enum([
			"key",
			"hold_key",
			"type",
			"cursor_position",
			"mouse_move",
			"left_mouse_down",
			"left_mouse_up",
			"left_click",
			"left_click_drag",
			"right_click",
			"middle_click",
			"double_click",
			"triple_click",
			"scroll",
			"wait",
			"screenshot",
			"zoom"
		]),
		coordinate: tuple([number().int(), number().int()]).optional(),
		duration: number().optional(),
		region: tuple([
			number().int(),
			number().int(),
			number().int(),
			number().int()
		]).optional(),
		scroll_amount: number().optional(),
		scroll_direction: _enum([
			"up",
			"down",
			"left",
			"right"
		]).optional(),
		start_coordinate: tuple([number().int(), number().int()]).optional(),
		text: string().optional()
	})))
});
var memory_20250818 = createProviderToolFactory({
	id: "anthropic.memory_20250818",
	inputSchema: lazySchema(() => zodSchema(discriminatedUnion("command", [
		object({
			command: literal("view"),
			path: string(),
			view_range: tuple([number(), number()]).optional()
		}),
		object({
			command: literal("create"),
			path: string(),
			file_text: string()
		}),
		object({
			command: literal("str_replace"),
			path: string(),
			old_str: string(),
			new_str: string()
		}),
		object({
			command: literal("insert"),
			path: string(),
			insert_line: number(),
			insert_text: string()
		}),
		object({
			command: literal("delete"),
			path: string()
		}),
		object({
			command: literal("rename"),
			old_path: string(),
			new_path: string()
		})
	])))
});
var textEditor_20241022 = createProviderToolFactory({
	id: "anthropic.text_editor_20241022",
	inputSchema: lazySchema(() => zodSchema(object({
		command: _enum([
			"view",
			"create",
			"str_replace",
			"insert",
			"undo_edit"
		]),
		path: string(),
		file_text: string().optional(),
		insert_line: number().int().optional(),
		new_str: string().optional(),
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
});
var textEditor_20250124 = createProviderToolFactory({
	id: "anthropic.text_editor_20250124",
	inputSchema: lazySchema(() => zodSchema(object({
		command: _enum([
			"view",
			"create",
			"str_replace",
			"insert",
			"undo_edit"
		]),
		path: string(),
		file_text: string().optional(),
		insert_line: number().int().optional(),
		new_str: string().optional(),
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
});
var textEditor_20250429 = createProviderToolFactory({
	id: "anthropic.text_editor_20250429",
	inputSchema: lazySchema(() => zodSchema(object({
		command: _enum([
			"view",
			"create",
			"str_replace",
			"insert"
		]),
		path: string(),
		file_text: string().optional(),
		insert_line: number().int().optional(),
		new_str: string().optional(),
		insert_text: string().optional(),
		old_str: string().optional(),
		view_range: array(number().int()).optional()
	})))
});
var toolSearchBm25_20251119OutputSchema = lazySchema(() => zodSchema(array(object({
	type: literal("tool_reference"),
	toolName: string()
}))));
var factory7 = createProviderToolFactoryWithOutputSchema({
	id: "anthropic.tool_search_bm25_20251119",
	inputSchema: lazySchema(() => zodSchema(object({
		query: string(),
		limit: number().optional()
	}))),
	outputSchema: toolSearchBm25_20251119OutputSchema,
	supportsDeferredResults: true
});
var toolSearchBm25_20251119 = (args = {}) => {
	return factory7(args);
};
var anthropicTools = {
	bash_20241022,
	bash_20250124,
	codeExecution_20250522,
	codeExecution_20250825,
	computer_20241022,
	computer_20250124,
	computer_20251124,
	memory_20250818,
	textEditor_20241022,
	textEditor_20250124,
	textEditor_20250429,
	textEditor_20250728,
	webFetch_20250910,
	webSearch_20250305,
	toolSearchRegex_20251119,
	toolSearchBm25_20251119
};
function createAnthropic(options = {}) {
	var _a, _b;
	const baseURL = (_a = withoutTrailingSlash(loadOptionalSetting({
		settingValue: options.baseURL,
		environmentVariableName: "ANTHROPIC_BASE_URL"
	}))) != null ? _a : "https://api.anthropic.com/v1";
	const providerName = (_b = options.name) != null ? _b : "anthropic.messages";
	if (options.apiKey && options.authToken) throw new InvalidArgumentError({
		argument: "apiKey/authToken",
		message: "Both apiKey and authToken were provided. Please use only one authentication method."
	});
	const getHeaders = () => {
		const authHeaders = options.authToken ? { Authorization: `Bearer ${options.authToken}` } : { "x-api-key": loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "ANTHROPIC_API_KEY",
			description: "Anthropic"
		}) };
		return withUserAgentSuffix({
			"anthropic-version": "2023-06-01",
			...authHeaders,
			...options.headers
		}, `ai-sdk/anthropic/${VERSION}`);
	};
	const createChatModel = (modelId) => {
		var _a2;
		return new AnthropicMessagesLanguageModel(modelId, {
			provider: providerName,
			baseURL,
			headers: getHeaders,
			fetch: options.fetch,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId,
			supportedUrls: () => ({
				"image/*": [/^https?:\/\/.*$/],
				"application/pdf": [/^https?:\/\/.*$/]
			})
		});
	};
	const provider = function(modelId) {
		if (new.target) throw new Error("The Anthropic model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.specificationVersion = "v3";
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.messages = createChatModel;
	provider.embeddingModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "embeddingModel"
		});
	};
	provider.textEmbeddingModel = provider.embeddingModel;
	provider.imageModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "imageModel"
		});
	};
	provider.tools = anthropicTools;
	return provider;
}
createAnthropic();
export { InvalidResponseDataError as $, _normalize as $i, hex as $n, unknown as $r, ZodReadonly$1 as $t, lazySchema as A, treeifyError as Aa, TimePrecision as Ai, base64 as An, pipe as Ar, ZodGUID as At, resolve as B, _length as Bi, custom as Bn, string as Br, ZodNaN$1 as Bt, getErrorMessage as C, parseAsync$1 as Ca, ZodISODuration as Ci, _function as Cn, nonoptional as Cr, ZodE164 as Ct, isNonNullable as D, flattenError as Da, checks_exports as Di, _void as Dn, object as Dr, ZodExactOptional as Dt, isAbortError as E, $ZodError as Ea, iso_exports as Ei, _undefined as En, number as Er, ZodEnum$1 as Et, parseJsonEventStream as F, $brand as Fa, _coercedString as Fi, cidrv4 as Fn, record as Fr, ZodKSUID as Ft, withUserAgentSuffix as G, _maxSize as Gi, email as Gn, symbol$2 as Gr, ZodNullable$1 as Gt, safeValidateTypes as H, _lt as Hi, describe as Hn, stringbool as Hr, ZodNever$1 as Ht, parseProviderOptions as I, $constructor as Ia, _endsWith as Ii, cidrv6 as In, refine as Ir, ZodLazy$1 as It, ZodFirstPartyTypeKind as J, _minSize as Ji, file as Jn, tuple as Jr, ZodObject$1 as Jt, withoutTrailingSlash as K, _mime as Ki, emoji as Kn, templateLiteral as Kr, ZodNumber$1 as Kt, postFormDataToApi as L, NEVER as La, _gt as Li, codec as Ln, schemas_exports as Lr, ZodLiteral$1 as Lt, loadOptionalSetting as M, defineLazy as Ma, _coercedBoolean as Mi, bigint as Mn, preprocess as Mr, ZodIPv6 as Mt, mediaTypeToExtension as N, normalizeParams as Na, _coercedDate as Ni, boolean as Nn, promise as Nr, ZodIntersection$1 as Nt, isParsableJson as O, formatError as Oa, core_exports as Oi, any as On, optional as Or, ZodFile as Ot, normalizeHeaders as P, util_exports as Pa, _coercedNumber as Pi, check as Pn, readonly as Pr, ZodJWT as Pt, InvalidPromptError as Q, _nonpositive as Qi, hash as Qn, union as Qr, ZodPromise$1 as Qt, postJsonToApi as R, config as Ra, _gte as Ri, cuid as Rn, set as Rr, ZodMAC as Rt, generateId as S, parse$1 as Sa, ZodISODateTime as Si, _enum as Sn, never as Sr, ZodDiscriminatedUnion$1 as St, getRuntimeEnvironmentUserAgent as T, safeParseAsync$1 as Ta, datetime as Ti, _null as Tn, nullish as Tr, ZodEmoji as Tt, tool as U, _lte as Ui, discriminatedUnion as Un, success as Ur, ZodNonOptional as Ut, safeParseJSON as V, _lowercase as Vi, date as Vn, stringFormat as Vr, ZodNanoID as Vt, validateTypes as W, _maxLength as Wi, e164 as Wn, superRefine as Wr, ZodNull$1 as Wt, AISDKError as X, _negative as Xi, float64 as Xn, uint64 as Xr, ZodPipe as Xt, objectType as Y, _multipleOf as Yi, float32 as Yn, uint32 as Yr, ZodOptional$1 as Yt, APICallError as Z, _nonnegative as Zi, guid as Zn, ulid as Zr, ZodPrefault as Zt, createProviderToolFactoryWithOutputSchema as _, locales_exports as _a, safeParse as _i, ZodXID as _n, map as _r, ZodCodec as _t, asSchema as a, _slugify as aa, xid as ai, ZodSymbol$1 as an, intersection as ar, ZodAny$1 as at, downloadBlob as b, $ZodType as ba, ZodRealError as bi, _catch as bn, nanoid as br, ZodDate$1 as bt, convertToBase64 as c, _toUpperCase as ca, decodeAsync as ci, ZodTuple$1 as cn, json as cr, ZodBase64URL as ct, createBinaryResponseHandler as d, describe$1 as da, parse as di, ZodURL as dn, ksuid as dr, ZodBoolean$1 as dt, _overwrite as ea, url as ei, ZodRecord$1 as en, hostname as er, NoSuchModelError as et, createEventSourceResponseHandler as f, meta$1 as fa, parseAsync as fi, ZodUUID as fn, lazy as fr, ZodCIDRv4 as ft, createProviderToolFactory as g, registry as ga, safeEncodeAsync as gi, ZodVoid$1 as gn, mac as gr, ZodCatch$1 as gt, createJsonResponseHandler as h, globalRegistry as ha, safeEncode as hi, ZodUnknown$1 as hn, looseRecord as hr, ZodCUID2 as ht, DownloadError as i, _size as ia, uuidv7 as ii, ZodSuccess as in, int64 as ir, getErrorMessage$1 as it, loadApiKey as j, clone as ja, _coercedBigint as ji, base64url as jn, prefault as jr, ZodIPv4 as jt, isUrlSupported as k, prettifyError as ka, toJSONSchema as ki, array as kn, partialRecord as kr, ZodFunction$1 as kt, convertToFormData as l, _trim as la, encode as li, ZodType$1 as ln, jwt as lr, ZodBigInt$1 as lt, createJsonErrorResponseHandler as m, $output as ma, safeDecodeAsync as mi, ZodUnion$1 as mn, looseObject as mr, ZodCUID as mt, DEFAULT_MAX_DOWNLOAD_SIZE as n, _property as na, uuidv4 as ni, ZodString$1 as nn, int as nr, TypeValidationError as nt, combineHeaders as o, _startsWith as oa, xor as oi, ZodTemplateLiteral as on, ipv4 as or, ZodArray$1 as ot, createIdGenerator as p, $input as pa, safeDecode as pi, ZodUndefined$1 as pn, literal as pr, ZodCIDRv6 as pt, zodSchema as q, _minLength as qi, exactOptional as qn, transform as qr, ZodNumberFormat as qt, DelayedPromise as r, _regex as ra, uuidv6 as ri, ZodStringFormat as rn, int32 as rr, UnsupportedFunctionalityError as rt, convertBase64ToUint8Array as s, _toLowerCase as sa, decode as si, ZodTransform as sn, ipv6 as sr, ZodBase64 as st, createAnthropic as t, _positive as ta, uuid as ti, ZodSet$1 as tn, httpUrl as tr, TooManyEmbeddingValuesForCallError as tt, convertUint8ArrayToBase64 as u, _uppercase as ua, encodeAsync as ui, ZodULID as un, keyof as ur, ZodBigIntFormat as ut, createToolNameMapping as v, en_default as va, safeParseAsync as vi, ZodXor as vn, meta as vr, ZodCustom as vt, getFromApi as w, safeParse$1 as wa, ZodISOTime as wi, _instanceof as wn, nullable as wr, ZodEmail as wt, executeTool as x, regexes_exports as xa, ZodISODate as xi, _default as xn, nativeEnum as xr, ZodDefault$1 as xt, delay as y, $ZodObject as ya, ZodError$1 as yi, _ZodString as yn, nan as yr, ZodCustomStringFormat as yt, readResponseWithSizeLimit as z, _includes as zi, cuid2 as zn, strictObject as zr, ZodMap$1 as zt };

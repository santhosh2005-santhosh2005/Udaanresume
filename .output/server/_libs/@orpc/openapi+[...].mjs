import { _ as traverseContractProcedures, c as standardizeHTTPPath, f as createContractedProcedure, g as isProcedure, h as getRouter, l as StandardBracketNotationSerializer, m as getLazyMeta, o as StandardOpenAPIJsonSerializer, p as createProcedureClient, s as StandardOpenAPISerializer, v as unlazy } from "./json-schema+[...].mjs";
import { D as isAsyncIteratorObject, E as intercept, I as stringifyJSON, L as toArray, M as resolveMaybeOptionalOptions, N as runWithSpan, O as isObject, P as setSpanError, R as tryDecodeURIComponent, S as asyncIteratorWithSpan, _ as toORPCError, a as toFetchResponse, b as ORPC_NAME, d as ORPCError, g as isORPCErrorStatus, j as parseEmptyableJSON, n as StandardRPCSerializer, o as toStandardLazyRequest, r as toHttpPath, t as StandardRPCJsonSerializer, u as flattenHeader, v as AsyncIteratorClass, y as NullProtoObj$1, z as value } from "./client+[...].mjs";
import { n as fallbackContractConfig } from "../orpc__contract.mjs";
var NullProtoObj = /* @__PURE__ */ (() => {
	const e = function() {};
	return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
/**
* Create a new router context.
*/
function createRouter() {
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
function resolveFriendlyStandardHandleOptions(options) {
	return {
		...options,
		context: options.context ?? {}
	};
}
var CompositeStandardHandlerPlugin = class {
	plugins;
	constructor(plugins = []) {
		this.plugins = [...plugins].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	}
	init(options, router) {
		for (const plugin of this.plugins) plugin.init?.(options, router);
	}
};
var StandardHandler = class {
	constructor(router, matcher, codec, options) {
		this.matcher = matcher;
		this.codec = codec;
		new CompositeStandardHandlerPlugin(options.plugins).init(options, router);
		this.interceptors = toArray(options.interceptors);
		this.clientInterceptors = toArray(options.clientInterceptors);
		this.rootInterceptors = toArray(options.rootInterceptors);
		this.matcher.init(router);
	}
	interceptors;
	clientInterceptors;
	rootInterceptors;
	async handle(request, options) {
		const prefix = options.prefix?.replace(/\/$/, "") || void 0;
		if (prefix && !request.url.pathname.startsWith(`${prefix}/`) && request.url.pathname !== prefix) return {
			matched: false,
			response: void 0
		};
		return intercept(this.rootInterceptors, {
			...options,
			request,
			prefix
		}, async (interceptorOptions) => {
			return runWithSpan({ name: `${request.method} ${request.url.pathname}` }, async (span) => {
				let step;
				try {
					return await intercept(this.interceptors, interceptorOptions, async ({ request: request2, context, prefix: prefix2 }) => {
						const method = request2.method;
						const url = request2.url;
						const pathname = prefix2 ? url.pathname.replace(prefix2, "") : url.pathname;
						const match = await runWithSpan({ name: "find_procedure" }, () => this.matcher.match(method, `/${pathname.replace(/^\/|\/$/g, "")}`));
						if (!match) return {
							matched: false,
							response: void 0
						};
						span?.updateName(`${ORPC_NAME}.${match.path.join("/")}`);
						span?.setAttribute("rpc.system", ORPC_NAME);
						span?.setAttribute("rpc.method", match.path.join("."));
						step = "decode_input";
						let input = await runWithSpan({ name: "decode_input" }, () => this.codec.decode(request2, match.params, match.procedure));
						step = void 0;
						if (isAsyncIteratorObject(input)) input = asyncIteratorWithSpan({
							name: "consume_event_iterator_input",
							signal: request2.signal
						}, input);
						const client = createProcedureClient(match.procedure, {
							context,
							path: match.path,
							interceptors: this.clientInterceptors
						});
						step = "call_procedure";
						const output = await client(input, {
							signal: request2.signal,
							lastEventId: flattenHeader(request2.headers["last-event-id"])
						});
						step = void 0;
						return {
							matched: true,
							response: this.codec.encode(output, match.procedure)
						};
					});
				} catch (e) {
					if (step !== "call_procedure") setSpanError(span, e);
					const error = step === "decode_input" && !(e instanceof ORPCError) ? new ORPCError("BAD_REQUEST", {
						message: `Malformed request. Ensure the request body is properly formatted and the 'Content-Type' header is set correctly.`,
						cause: e
					}) : toORPCError(e);
					return {
						matched: true,
						response: this.codec.encodeError(error)
					};
				}
			});
		});
	}
};
var StandardRPCCodec = class {
	constructor(serializer) {
		this.serializer = serializer;
	}
	async decode(request, _params, _procedure) {
		const serialized = request.method === "GET" ? parseEmptyableJSON(request.url.searchParams.getAll("data").at(-1)) : await request.body();
		return this.serializer.deserialize(serialized);
	}
	encode(output, _procedure) {
		return {
			status: 200,
			headers: {},
			body: this.serializer.serialize(output)
		};
	}
	encodeError(error) {
		return {
			status: error.status,
			headers: {},
			body: this.serializer.serialize(error.toJSON())
		};
	}
};
var StandardRPCMatcher = class {
	filter;
	tree = new NullProtoObj$1();
	pendingRouters = [];
	constructor(options = {}) {
		this.filter = options.filter ?? true;
	}
	init(router, path = []) {
		const laziedOptions = traverseContractProcedures({
			router,
			path
		}, (traverseOptions) => {
			if (!value(this.filter, traverseOptions)) return;
			const { path: path2, contract } = traverseOptions;
			const httpPath = toHttpPath(path2);
			if (isProcedure(contract)) this.tree[httpPath] = {
				path: path2,
				contract,
				procedure: contract,
				router
			};
			else this.tree[httpPath] = {
				path: path2,
				contract,
				procedure: void 0,
				router
			};
		});
		this.pendingRouters.push(...laziedOptions.map((option) => ({
			...option,
			httpPathPrefix: toHttpPath(option.path)
		})));
	}
	async match(_method, pathname) {
		if (this.pendingRouters.length) {
			const newPendingRouters = [];
			for (const pendingRouter of this.pendingRouters) if (pathname.startsWith(pendingRouter.httpPathPrefix)) {
				const { default: router } = await unlazy(pendingRouter.router);
				this.init(router, pendingRouter.path);
			} else newPendingRouters.push(pendingRouter);
			this.pendingRouters = newPendingRouters;
		}
		const match = this.tree[pathname];
		if (!match) return;
		if (!match.procedure) {
			const { default: maybeProcedure } = await unlazy(getRouter(match.router, match.path));
			if (!isProcedure(maybeProcedure)) throw new Error(`
          [Contract-First] Missing or invalid implementation for procedure at path: ${toHttpPath(match.path)}.
          Ensure that the procedure is correctly defined and matches the expected contract.
        `);
			match.procedure = createContractedProcedure(maybeProcedure, match.contract);
		}
		return {
			path: match.path,
			procedure: match.procedure
		};
	}
};
var StandardRPCHandler = class extends StandardHandler {
	constructor(router, options = {}) {
		const serializer = new StandardRPCSerializer(new StandardRPCJsonSerializer(options));
		const matcher = new StandardRPCMatcher(options);
		const codec = new StandardRPCCodec(serializer);
		super(router, matcher, codec, options);
	}
};
function parseBatchRequest(request) {
	const items = request.method === "GET" ? parseEmptyableJSON(request.url.searchParams.getAll("batch").at(-1)) : request.body;
	if (!Array.isArray(items)) throw new TypeError("Invalid batch request");
	return items.map((item) => {
		return {
			method: item.method ?? request.method,
			url: new URL(item.url),
			headers: item.headers ?? {},
			body: item.body,
			signal: request.signal
		};
	});
}
function toBatchResponse(options) {
	const mode = options.mode ?? "streaming";
	const minifyResponseItem = (item) => {
		return {
			index: item.index,
			status: item.status === options.status ? void 0 : item.status,
			headers: Object.keys(item.headers).length ? item.headers : void 0,
			body: item.body
		};
	};
	if (mode === "buffered") return (async () => {
		try {
			const body = [];
			for await (const item of options.body) body.push(minifyResponseItem(item));
			return {
				headers: options.headers,
				status: options.status,
				body
			};
		} finally {
			await options.body.return?.();
		}
	})();
	return {
		headers: options.headers,
		status: options.status,
		body: new AsyncIteratorClass(async () => {
			const { done, value } = await options.body.next();
			if (done) return {
				done,
				value
			};
			return {
				done,
				value: {
					index: value.index,
					status: value.status === options.status ? void 0 : value.status,
					headers: Object.keys(value.headers).length ? value.headers : void 0,
					body: value.body
				}
			};
		}, async (reason) => {
			if (reason !== "next") await options.body.return?.();
		})
	};
}
var STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL = Symbol("STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT");
var StrictGetMethodPlugin = class {
	error;
	/**
	* make sure execute before batch plugin to get real method
	*/
	order = 7e6;
	constructor(options = {}) {
		this.error = options.error ?? new ORPCError("METHOD_NOT_SUPPORTED");
	}
	init(options) {
		options.rootInterceptors ??= [];
		options.clientInterceptors ??= [];
		options.rootInterceptors.unshift((options2) => {
			const isGetMethod = options2.request.method === "GET";
			return options2.next({
				...options2,
				context: {
					...options2.context,
					[STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL]: isGetMethod
				}
			});
		});
		options.clientInterceptors.unshift((options2) => {
			if (typeof options2.context[STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL] !== "boolean") throw new TypeError("[StrictGetMethodPlugin] strict GET method context has been corrupted or modified by another plugin or interceptor");
			const procedureMethod = fallbackContractConfig("defaultMethod", options2.procedure["~orpc"].route.method);
			if (options2.context[STRICT_GET_METHOD_PLUGIN_IS_GET_METHOD_CONTEXT_SYMBOL] && procedureMethod !== "GET") throw this.error;
			return options2.next();
		});
	}
};
var CompositeFetchHandlerPlugin = class extends CompositeStandardHandlerPlugin {
	initRuntimeAdapter(options) {
		for (const plugin of this.plugins) plugin.initRuntimeAdapter?.(options);
	}
};
var FetchHandler = class {
	constructor(standardHandler, options = {}) {
		this.standardHandler = standardHandler;
		new CompositeFetchHandlerPlugin(options.plugins).initRuntimeAdapter(options);
		this.adapterInterceptors = toArray(options.adapterInterceptors);
		this.toFetchResponseOptions = options;
	}
	toFetchResponseOptions;
	adapterInterceptors;
	async handle(request, ...rest) {
		return intercept(this.adapterInterceptors, {
			...resolveFriendlyStandardHandleOptions(resolveMaybeOptionalOptions(rest)),
			request,
			toFetchResponseOptions: this.toFetchResponseOptions
		}, async ({ request: request2, toFetchResponseOptions, ...options }) => {
			const standardRequest = toStandardLazyRequest(request2);
			const result = await this.standardHandler.handle(standardRequest, options);
			if (!result.matched) return result;
			return {
				matched: true,
				response: toFetchResponse(result.response, toFetchResponseOptions)
			};
		});
	}
};
var RPCHandler = class extends FetchHandler {
	constructor(router, options = {}) {
		if (options.strictGetMethodPluginEnabled ?? true) {
			options.plugins ??= [];
			options.plugins.push(new StrictGetMethodPlugin());
		}
		super(new StandardRPCHandler(router, options), options);
	}
};
var StandardOpenAPICodec = class {
	constructor(serializer, options = {}) {
		this.serializer = serializer;
		this.customErrorResponseBodyEncoder = options.customErrorResponseBodyEncoder;
	}
	customErrorResponseBodyEncoder;
	async decode(request, params, procedure) {
		if (fallbackContractConfig("defaultInputStructure", procedure["~orpc"].route.inputStructure) === "compact") {
			const data = request.method === "GET" ? this.serializer.deserialize(request.url.searchParams) : this.serializer.deserialize(await request.body());
			if (data === void 0) return params;
			if (isObject(data)) return {
				...params,
				...data
			};
			return data;
		}
		const deserializeSearchParams = () => {
			return this.serializer.deserialize(request.url.searchParams);
		};
		return {
			params,
			get query() {
				const value = deserializeSearchParams();
				Object.defineProperty(this, "query", {
					value,
					writable: true
				});
				return value;
			},
			set query(value) {
				Object.defineProperty(this, "query", {
					value,
					writable: true
				});
			},
			headers: request.headers,
			body: this.serializer.deserialize(await request.body())
		};
	}
	encode(output, procedure) {
		const successStatus = fallbackContractConfig("defaultSuccessStatus", procedure["~orpc"].route.successStatus);
		if (fallbackContractConfig("defaultOutputStructure", procedure["~orpc"].route.outputStructure) === "compact") return {
			status: successStatus,
			headers: {},
			body: this.serializer.serialize(output)
		};
		if (!this.#isDetailedOutput(output)) throw new Error(`
        Invalid "detailed" output structure:
        \u2022 Expected an object with optional properties:
          - status (number 200-399)
          - headers (Record<string, string | string[]>)
          - body (any)
        \u2022 No extra keys allowed.

        Actual value:
          ${stringifyJSON(output)}
      `);
		return {
			status: output.status ?? successStatus,
			headers: output.headers ?? {},
			body: this.serializer.serialize(output.body)
		};
	}
	encodeError(error) {
		const body = this.customErrorResponseBodyEncoder?.(error) ?? error.toJSON();
		return {
			status: error.status,
			headers: {},
			body: this.serializer.serialize(body, { outputFormat: "plain" })
		};
	}
	#isDetailedOutput(output) {
		if (!isObject(output)) return false;
		if (output.headers && !isObject(output.headers)) return false;
		if (output.status !== void 0 && (typeof output.status !== "number" || !Number.isInteger(output.status) || isORPCErrorStatus(output.status))) return false;
		return true;
	}
};
function toRou3Pattern(path) {
	return standardizeHTTPPath(path).replace(/\/\{\+([^}]+)\}/g, "/**:$1").replace(/\/\{([^}]+)\}/g, "/:$1");
}
function decodeParams(params) {
	return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, tryDecodeURIComponent(value)]));
}
var StandardOpenAPIMatcher = class {
	filter;
	tree = createRouter();
	pendingRouters = [];
	constructor(options = {}) {
		this.filter = options.filter ?? true;
	}
	init(router, path = []) {
		const laziedOptions = traverseContractProcedures({
			router,
			path
		}, (traverseOptions) => {
			if (!value(this.filter, traverseOptions)) return;
			const { path: path2, contract } = traverseOptions;
			const method = fallbackContractConfig("defaultMethod", contract["~orpc"].route.method);
			const httpPath = toRou3Pattern(contract["~orpc"].route.path ?? toHttpPath(path2));
			if (isProcedure(contract)) addRoute(this.tree, method, httpPath, {
				path: path2,
				contract,
				procedure: contract,
				router
			});
			else addRoute(this.tree, method, httpPath, {
				path: path2,
				contract,
				procedure: void 0,
				router
			});
		});
		this.pendingRouters.push(...laziedOptions.map((option) => ({
			...option,
			httpPathPrefix: toHttpPath(option.path),
			laziedPrefix: getLazyMeta(option.router).prefix
		})));
	}
	async match(method, pathname) {
		if (this.pendingRouters.length) {
			const newPendingRouters = [];
			for (const pendingRouter of this.pendingRouters) if (!pendingRouter.laziedPrefix || pathname.startsWith(pendingRouter.laziedPrefix) || pathname.startsWith(pendingRouter.httpPathPrefix)) {
				const { default: router } = await unlazy(pendingRouter.router);
				this.init(router, pendingRouter.path);
			} else newPendingRouters.push(pendingRouter);
			this.pendingRouters = newPendingRouters;
		}
		const match = findRoute(this.tree, method, pathname);
		if (!match) return;
		if (!match.data.procedure) {
			const { default: maybeProcedure } = await unlazy(getRouter(match.data.router, match.data.path));
			if (!isProcedure(maybeProcedure)) throw new Error(`
          [Contract-First] Missing or invalid implementation for procedure at path: ${toHttpPath(match.data.path)}.
          Ensure that the procedure is correctly defined and matches the expected contract.
        `);
			match.data.procedure = createContractedProcedure(maybeProcedure, match.data.contract);
		}
		return {
			path: match.data.path,
			procedure: match.data.procedure,
			params: match.params ? decodeParams(match.params) : void 0
		};
	}
};
var StandardOpenAPIHandler = class extends StandardHandler {
	constructor(router, options) {
		const serializer = new StandardOpenAPISerializer(new StandardOpenAPIJsonSerializer(options), new StandardBracketNotationSerializer(options));
		const matcher = new StandardOpenAPIMatcher(options);
		const codec = new StandardOpenAPICodec(serializer, options);
		super(router, matcher, codec, options);
	}
};
var OpenAPIHandler = class extends FetchHandler {
	constructor(router, options = {}) {
		super(new StandardOpenAPIHandler(router, options), options);
	}
};
export { toBatchResponse as a, parseBatchRequest as i, RPCHandler as n, NullProtoObj as o, StrictGetMethodPlugin as r, OpenAPIHandler as t };

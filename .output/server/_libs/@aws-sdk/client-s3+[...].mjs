import { i as __reExport, n as __esmMin, o as __toCommonJS, r as __exportAll, s as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { i as numToUint8, n as AwsCrc32, t as Crc32 } from "../@aws-crypto/crc32+[...].mjs";
import { t as AwsCrc32c } from "../aws-crypto__crc32c.mjs";
import { Readable } from "node:stream";
import { ReadStream, fstatSync, lstatSync } from "node:fs";
import crypto$1, { createHash, createHmac } from "crypto";
import { Duplex, PassThrough as PassThrough$1, Readable as Readable$1, Writable } from "stream";
import { readFile } from "node:fs/promises";
import { Buffer as Buffer$1 } from "buffer";
import { Agent, request } from "http";
import { Agent as Agent$1, request as request$1 } from "https";
import http2, { constants } from "http2";
import * as zlib from "zlib";
import { homedir, platform, release } from "os";
import { join, sep } from "path";
import { readFile as readFile$1 } from "fs/promises";
import { env, versions } from "process";
var getHttpHandlerExtensionConfiguration, resolveHttpHandlerRuntimeConfig;
var init_httpExtensionConfiguration = __esmMin((() => {
	getHttpHandlerExtensionConfiguration = (runtimeConfig) => {
		return {
			setHttpHandler(handler) {
				runtimeConfig.httpHandler = handler;
			},
			httpHandler() {
				return runtimeConfig.httpHandler;
			},
			updateHttpClientConfig(key, value) {
				runtimeConfig.httpHandler?.updateHttpClientConfig(key, value);
			},
			httpHandlerConfigs() {
				return runtimeConfig.httpHandler.httpHandlerConfigs();
			}
		};
	};
	resolveHttpHandlerRuntimeConfig = (httpHandlerExtensionConfiguration) => {
		return { httpHandler: httpHandlerExtensionConfiguration.httpHandler() };
	};
}));
var init_extensions$3 = __esmMin((() => {
	init_httpExtensionConfiguration();
}));
var init_abort = __esmMin((() => {}));
var HttpAuthLocation;
var init_auth$1 = __esmMin((() => {
	(function(HttpAuthLocation) {
		HttpAuthLocation["HEADER"] = "header";
		HttpAuthLocation["QUERY"] = "query";
	})(HttpAuthLocation || (HttpAuthLocation = {}));
}));
var HttpApiKeyAuthLocation;
var init_HttpApiKeyAuth = __esmMin((() => {
	(function(HttpApiKeyAuthLocation) {
		HttpApiKeyAuthLocation["HEADER"] = "header";
		HttpApiKeyAuthLocation["QUERY"] = "query";
	})(HttpApiKeyAuthLocation || (HttpApiKeyAuthLocation = {}));
}));
var init_HttpAuthScheme = __esmMin((() => {}));
var init_HttpAuthSchemeProvider = __esmMin((() => {}));
var init_HttpSigner = __esmMin((() => {}));
var init_IdentityProviderConfig = __esmMin((() => {}));
var init_auth = __esmMin((() => {
	init_auth$1();
	init_HttpApiKeyAuth();
	init_HttpAuthScheme();
	init_HttpAuthSchemeProvider();
	init_HttpSigner();
	init_IdentityProviderConfig();
}));
var init_blob_payload_input_types = __esmMin((() => {}));
var init_checksum$2 = __esmMin((() => {}));
var init_client$1 = __esmMin((() => {}));
var init_command$1 = __esmMin((() => {}));
var init_config$2 = __esmMin((() => {}));
var init_manager = __esmMin((() => {}));
var init_pool = __esmMin((() => {}));
var init_connection = __esmMin((() => {
	init_config$2();
	init_manager();
	init_pool();
}));
var init_crypto = __esmMin((() => {}));
var init_encode = __esmMin((() => {}));
var EndpointURLScheme;
var init_endpoint = __esmMin((() => {
	(function(EndpointURLScheme) {
		EndpointURLScheme["HTTP"] = "http";
		EndpointURLScheme["HTTPS"] = "https";
	})(EndpointURLScheme || (EndpointURLScheme = {}));
}));
var init_EndpointRuleObject$2 = __esmMin((() => {}));
var init_ErrorRuleObject$2 = __esmMin((() => {}));
var init_RuleSetObject$2 = __esmMin((() => {}));
var init_shared$2 = __esmMin((() => {}));
var init_TreeRuleObject$2 = __esmMin((() => {}));
var init_endpoints = __esmMin((() => {
	init_EndpointRuleObject$2();
	init_ErrorRuleObject$2();
	init_RuleSetObject$2();
	init_shared$2();
	init_TreeRuleObject$2();
}));
var init_eventStream = __esmMin((() => {}));
var AlgorithmId, getChecksumConfiguration$1, resolveChecksumRuntimeConfig$1;
var init_checksum$1 = __esmMin((() => {
	(function(AlgorithmId) {
		AlgorithmId["MD5"] = "md5";
		AlgorithmId["CRC32"] = "crc32";
		AlgorithmId["CRC32C"] = "crc32c";
		AlgorithmId["SHA1"] = "sha1";
		AlgorithmId["SHA256"] = "sha256";
	})(AlgorithmId || (AlgorithmId = {}));
	getChecksumConfiguration$1 = (runtimeConfig) => {
		const checksumAlgorithms = [];
		if (runtimeConfig.sha256 !== void 0) checksumAlgorithms.push({
			algorithmId: () => AlgorithmId.SHA256,
			checksumConstructor: () => runtimeConfig.sha256
		});
		if (runtimeConfig.md5 != void 0) checksumAlgorithms.push({
			algorithmId: () => AlgorithmId.MD5,
			checksumConstructor: () => runtimeConfig.md5
		});
		return {
			addChecksumAlgorithm(algo) {
				checksumAlgorithms.push(algo);
			},
			checksumAlgorithms() {
				return checksumAlgorithms;
			}
		};
	};
	resolveChecksumRuntimeConfig$1 = (clientConfig) => {
		const runtimeConfig = {};
		clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
			runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
		});
		return runtimeConfig;
	};
}));
var getDefaultClientConfiguration$1, resolveDefaultRuntimeConfig$1;
var init_defaultClientConfiguration = __esmMin((() => {
	init_checksum$1();
	getDefaultClientConfiguration$1 = (runtimeConfig) => {
		return getChecksumConfiguration$1(runtimeConfig);
	};
	resolveDefaultRuntimeConfig$1 = (config) => {
		return resolveChecksumRuntimeConfig$1(config);
	};
}));
var init_defaultExtensionConfiguration$1 = __esmMin((() => {}));
var init_extensions$2 = __esmMin((() => {
	init_defaultClientConfiguration();
	init_defaultExtensionConfiguration$1();
	init_checksum$1();
}));
var init_feature_ids = __esmMin((() => {}));
var FieldPosition;
var init_http = __esmMin((() => {
	(function(FieldPosition) {
		FieldPosition[FieldPosition["HEADER"] = 0] = "HEADER";
		FieldPosition[FieldPosition["TRAILER"] = 1] = "TRAILER";
	})(FieldPosition || (FieldPosition = {}));
}));
var init_httpHandlerInitialization = __esmMin((() => {}));
var init_apiKeyIdentity = __esmMin((() => {}));
var init_awsCredentialIdentity = __esmMin((() => {}));
var init_identity$1 = __esmMin((() => {}));
var init_tokenIdentity = __esmMin((() => {}));
var init_identity = __esmMin((() => {
	init_apiKeyIdentity();
	init_awsCredentialIdentity();
	init_identity$1();
	init_tokenIdentity();
}));
var init_logger = __esmMin((() => {}));
var SMITHY_CONTEXT_KEY;
var init_middleware = __esmMin((() => {
	SMITHY_CONTEXT_KEY = "__smithy_context";
}));
var init_pagination = __esmMin((() => {}));
var IniSectionType;
var init_profile = __esmMin((() => {
	(function(IniSectionType) {
		IniSectionType["PROFILE"] = "profile";
		IniSectionType["SSO_SESSION"] = "sso-session";
		IniSectionType["SERVICES"] = "services";
	})(IniSectionType || (IniSectionType = {}));
}));
var init_response = __esmMin((() => {}));
var init_retry$1 = __esmMin((() => {}));
var init_schema = __esmMin((() => {}));
var init_traits = __esmMin((() => {}));
var init_schema_deprecated = __esmMin((() => {}));
var init_sentinels = __esmMin((() => {}));
var init_static_schemas = __esmMin((() => {}));
var init_serde = __esmMin((() => {}));
var init_shapes = __esmMin((() => {}));
var init_signature = __esmMin((() => {}));
var init_stream = __esmMin((() => {}));
var init_streaming_blob_common_types = __esmMin((() => {}));
var init_streaming_blob_payload_input_types = __esmMin((() => {}));
var init_streaming_blob_payload_output_types = __esmMin((() => {}));
var RequestHandlerProtocol;
var init_transfer = __esmMin((() => {
	(function(RequestHandlerProtocol) {
		RequestHandlerProtocol["HTTP_0_9"] = "http/0.9";
		RequestHandlerProtocol["HTTP_1_0"] = "http/1.0";
		RequestHandlerProtocol["TDS_8_0"] = "tds/8.0";
	})(RequestHandlerProtocol || (RequestHandlerProtocol = {}));
}));
var init_client_payload_blob_type_narrow = __esmMin((() => {}));
var init_mutable = __esmMin((() => {}));
var init_no_undefined = __esmMin((() => {}));
var init_type_transform = __esmMin((() => {}));
var init_uri = __esmMin((() => {}));
var init_util$2 = __esmMin((() => {}));
var init_waiter = __esmMin((() => {}));
var dist_es_exports$31 = /* @__PURE__ */ __exportAll({
	AlgorithmId: () => AlgorithmId,
	EndpointURLScheme: () => EndpointURLScheme,
	FieldPosition: () => FieldPosition,
	HttpApiKeyAuthLocation: () => HttpApiKeyAuthLocation,
	HttpAuthLocation: () => HttpAuthLocation,
	IniSectionType: () => IniSectionType,
	RequestHandlerProtocol: () => RequestHandlerProtocol,
	SMITHY_CONTEXT_KEY: () => SMITHY_CONTEXT_KEY,
	getDefaultClientConfiguration: () => getDefaultClientConfiguration$1,
	resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig$1
});
var init_dist_es$42 = __esmMin((() => {
	init_abort();
	init_auth();
	init_blob_payload_input_types();
	init_checksum$2();
	init_client$1();
	init_command$1();
	init_connection();
	init_crypto();
	init_encode();
	init_endpoint();
	init_endpoints();
	init_eventStream();
	init_extensions$2();
	init_feature_ids();
	init_http();
	init_httpHandlerInitialization();
	init_identity();
	init_logger();
	init_middleware();
	init_pagination();
	init_profile();
	init_response();
	init_retry$1();
	init_schema();
	init_traits();
	init_schema_deprecated();
	init_sentinels();
	init_static_schemas();
	init_serde();
	init_shapes();
	init_signature();
	init_stream();
	init_streaming_blob_common_types();
	init_streaming_blob_payload_input_types();
	init_streaming_blob_payload_output_types();
	init_transfer();
	init_client_payload_blob_type_narrow();
	init_mutable();
	init_no_undefined();
	init_type_transform();
	init_uri();
	init_util$2();
	init_waiter();
}));
var Field;
var init_Field = __esmMin((() => {
	init_dist_es$42();
	Field = class {
		name;
		kind;
		values;
		constructor({ name, kind = FieldPosition.HEADER, values = [] }) {
			this.name = name;
			this.kind = kind;
			this.values = values;
		}
		add(value) {
			this.values.push(value);
		}
		set(values) {
			this.values = values;
		}
		remove(value) {
			this.values = this.values.filter((v) => v !== value);
		}
		toString() {
			return this.values.map((v) => v.includes(",") || v.includes(" ") ? `"${v}"` : v).join(", ");
		}
		get() {
			return this.values;
		}
	};
}));
var Fields;
var init_Fields = __esmMin((() => {
	Fields = class {
		entries = {};
		encoding;
		constructor({ fields = [], encoding = "utf-8" }) {
			fields.forEach(this.setField.bind(this));
			this.encoding = encoding;
		}
		setField(field) {
			this.entries[field.name.toLowerCase()] = field;
		}
		getField(name) {
			return this.entries[name.toLowerCase()];
		}
		removeField(name) {
			delete this.entries[name.toLowerCase()];
		}
		getByType(kind) {
			return Object.values(this.entries).filter((field) => field.kind === kind);
		}
	};
}));
var init_httpHandler = __esmMin((() => {}));
function cloneQuery(query) {
	return Object.keys(query).reduce((carry, paramName) => {
		const param = query[paramName];
		return {
			...carry,
			[paramName]: Array.isArray(param) ? [...param] : param
		};
	}, {});
}
var HttpRequest;
var init_httpRequest = __esmMin((() => {
	HttpRequest = class HttpRequest {
		method;
		protocol;
		hostname;
		port;
		path;
		query;
		headers;
		username;
		password;
		fragment;
		body;
		constructor(options) {
			this.method = options.method || "GET";
			this.hostname = options.hostname || "localhost";
			this.port = options.port;
			this.query = options.query || {};
			this.headers = options.headers || {};
			this.body = options.body;
			this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
			this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
			this.username = options.username;
			this.password = options.password;
			this.fragment = options.fragment;
		}
		static clone(request) {
			const cloned = new HttpRequest({
				...request,
				headers: { ...request.headers }
			});
			if (cloned.query) cloned.query = cloneQuery(cloned.query);
			return cloned;
		}
		static isInstance(request) {
			if (!request) return false;
			const req = request;
			return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
		}
		clone() {
			return HttpRequest.clone(this);
		}
	};
}));
var HttpResponse;
var init_httpResponse = __esmMin((() => {
	HttpResponse = class {
		statusCode;
		reason;
		headers;
		body;
		constructor(options) {
			this.statusCode = options.statusCode;
			this.reason = options.reason;
			this.headers = options.headers || {};
			this.body = options.body;
		}
		static isInstance(response) {
			if (!response) return false;
			const resp = response;
			return typeof resp.statusCode === "number" && typeof resp.headers === "object";
		}
	};
}));
function isValidHostname(hostname) {
	return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(hostname);
}
var init_isValidHostname = __esmMin((() => {}));
var init_types$6 = __esmMin((() => {}));
var dist_es_exports$30 = /* @__PURE__ */ __exportAll({
	Field: () => Field,
	Fields: () => Fields,
	HttpRequest: () => HttpRequest,
	HttpResponse: () => HttpResponse,
	getHttpHandlerExtensionConfiguration: () => getHttpHandlerExtensionConfiguration,
	isValidHostname: () => isValidHostname,
	resolveHttpHandlerRuntimeConfig: () => resolveHttpHandlerRuntimeConfig
});
var init_dist_es$41 = __esmMin((() => {
	init_extensions$3();
	init_Field();
	init_Fields();
	init_httpHandler();
	init_httpRequest();
	init_httpResponse();
	init_isValidHostname();
	init_types$6();
}));
init_dist_es$41();
function addExpectContinueMiddleware(options) {
	return (next) => async (args) => {
		const { request } = args;
		if (options.expectContinueHeader !== false && HttpRequest.isInstance(request) && request.body && options.runtime === "node" && options.requestHandler?.constructor?.name !== "FetchHttpHandler") {
			let sendHeader = true;
			if (typeof options.expectContinueHeader === "number") try {
				sendHeader = (Number(request.headers?.["content-length"]) ?? options.bodyLengthChecker?.(request.body) ?? Infinity) >= options.expectContinueHeader;
			} catch (e) {}
			else sendHeader = !!options.expectContinueHeader;
			if (sendHeader) request.headers.Expect = "100-continue";
		}
		return next({
			...args,
			request
		});
	};
}
const addExpectContinueMiddlewareOptions = {
	step: "build",
	tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"],
	name: "addExpectContinueMiddleware",
	override: true
};
const getAddExpectContinuePlugin = (options) => ({ applyToStack: (clientStack) => {
	clientStack.add(addExpectContinueMiddleware(options), addExpectContinueMiddlewareOptions);
} });
const RequestChecksumCalculation = {
	WHEN_SUPPORTED: "WHEN_SUPPORTED",
	WHEN_REQUIRED: "WHEN_REQUIRED"
};
const DEFAULT_REQUEST_CHECKSUM_CALCULATION = RequestChecksumCalculation.WHEN_SUPPORTED;
const ResponseChecksumValidation = {
	WHEN_SUPPORTED: "WHEN_SUPPORTED",
	WHEN_REQUIRED: "WHEN_REQUIRED"
};
const DEFAULT_RESPONSE_CHECKSUM_VALIDATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ChecksumAlgorithm;
(function(ChecksumAlgorithm) {
	ChecksumAlgorithm["MD5"] = "MD5";
	ChecksumAlgorithm["CRC32"] = "CRC32";
	ChecksumAlgorithm["CRC32C"] = "CRC32C";
	ChecksumAlgorithm["CRC64NVME"] = "CRC64NVME";
	ChecksumAlgorithm["SHA1"] = "SHA1";
	ChecksumAlgorithm["SHA256"] = "SHA256";
})(ChecksumAlgorithm || (ChecksumAlgorithm = {}));
var ChecksumLocation;
(function(ChecksumLocation) {
	ChecksumLocation["HEADER"] = "header";
	ChecksumLocation["TRAILER"] = "trailer";
})(ChecksumLocation || (ChecksumLocation = {}));
const DEFAULT_CHECKSUM_ALGORITHM = ChecksumAlgorithm.CRC32;
var SelectorType$1;
(function(SelectorType) {
	SelectorType["ENV"] = "env";
	SelectorType["CONFIG"] = "shared config entry";
})(SelectorType$1 || (SelectorType$1 = {}));
const stringUnionSelector = (obj, key, union, type) => {
	if (!(key in obj)) return void 0;
	const value = obj[key].toUpperCase();
	if (!Object.values(union).includes(value)) throw new TypeError(`Cannot load ${type} '${key}'. Expected one of ${Object.values(union)}, got '${obj[key]}'.`);
	return value;
};
const ENV_REQUEST_CHECKSUM_CALCULATION = "AWS_REQUEST_CHECKSUM_CALCULATION";
const CONFIG_REQUEST_CHECKSUM_CALCULATION = "request_checksum_calculation";
const NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS = {
	environmentVariableSelector: (env) => stringUnionSelector(env, ENV_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType$1.ENV),
	configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType$1.CONFIG),
	default: DEFAULT_REQUEST_CHECKSUM_CALCULATION
};
const ENV_RESPONSE_CHECKSUM_VALIDATION = "AWS_RESPONSE_CHECKSUM_VALIDATION";
const CONFIG_RESPONSE_CHECKSUM_VALIDATION = "response_checksum_validation";
const NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS = {
	environmentVariableSelector: (env) => stringUnionSelector(env, ENV_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType$1.ENV),
	configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType$1.CONFIG),
	default: DEFAULT_RESPONSE_CHECKSUM_VALIDATION
};
var getSmithyContext;
var init_getSmithyContext = __esmMin((() => {
	init_dist_es$42();
	getSmithyContext = (context) => context["__smithy_context"] || (context["__smithy_context"] = {});
}));
var normalizeProvider$1;
var init_normalizeProvider = __esmMin((() => {
	normalizeProvider$1 = (input) => {
		if (typeof input === "function") return input;
		const promisified = Promise.resolve(input);
		return () => promisified;
	};
}));
var dist_es_exports$29 = /* @__PURE__ */ __exportAll({
	getSmithyContext: () => getSmithyContext,
	normalizeProvider: () => normalizeProvider$1
});
var init_dist_es$40 = __esmMin((() => {
	init_getSmithyContext();
	init_normalizeProvider();
}));
var deserializerMiddleware, findHeader;
var init_deserializerMiddleware = __esmMin((() => {
	init_dist_es$41();
	deserializerMiddleware = (options, deserializer) => (next, context) => async (args) => {
		const { response } = await next(args);
		try {
			return {
				response,
				output: await deserializer(response, options)
			};
		} catch (error) {
			Object.defineProperty(error, "$response", {
				value: response,
				enumerable: false,
				writable: false,
				configurable: false
			});
			if (!("$metadata" in error)) {
				const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
				try {
					error.message += "\n  " + hint;
				} catch (e) {
					if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") console.warn(hint);
					else context.logger?.warn?.(hint);
				}
				if (typeof error.$responseBodyText !== "undefined") {
					if (error.$response) error.$response.body = error.$responseBodyText;
				}
				try {
					if (HttpResponse.isInstance(response)) {
						const { headers = {} } = response;
						const headerEntries = Object.entries(headers);
						error.$metadata = {
							httpStatusCode: response.statusCode,
							requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
							extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
							cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
						};
					}
				} catch (e) {}
			}
			throw error;
		}
	};
	findHeader = (pattern, headers) => {
		return (headers.find(([k]) => {
			return k.match(pattern);
		}) || [void 0, void 0])[1];
	};
}));
var serializerMiddleware;
var init_serializerMiddleware = __esmMin((() => {
	serializerMiddleware = (options, serializer) => (next, context) => async (args) => {
		const endpointConfig = options;
		const endpoint = context.endpointV2?.url && endpointConfig.urlParser ? async () => endpointConfig.urlParser(context.endpointV2.url) : endpointConfig.endpoint;
		if (!endpoint) throw new Error("No valid endpoint provider available.");
		const request = await serializer(args.input, {
			...options,
			endpoint
		});
		return next({
			...args,
			request
		});
	};
}));
function getSerdePlugin(config, serializer, deserializer) {
	return { applyToStack: (commandStack) => {
		commandStack.add(deserializerMiddleware(config, deserializer), deserializerMiddlewareOption);
		commandStack.add(serializerMiddleware(config, serializer), serializerMiddlewareOption);
	} };
}
var deserializerMiddlewareOption, serializerMiddlewareOption;
var init_serdePlugin = __esmMin((() => {
	init_deserializerMiddleware();
	init_serializerMiddleware();
	deserializerMiddlewareOption = {
		name: "deserializerMiddleware",
		step: "deserialize",
		tags: ["DESERIALIZER"],
		override: true
	};
	serializerMiddlewareOption = {
		name: "serializerMiddleware",
		step: "serialize",
		tags: ["SERIALIZER"],
		override: true
	};
}));
var dist_es_exports$28 = /* @__PURE__ */ __exportAll({
	deserializerMiddleware: () => deserializerMiddleware,
	deserializerMiddlewareOption: () => deserializerMiddlewareOption,
	getSerdePlugin: () => getSerdePlugin,
	serializerMiddleware: () => serializerMiddleware,
	serializerMiddlewareOption: () => serializerMiddlewareOption
});
var init_dist_es$39 = __esmMin((() => {
	init_deserializerMiddleware();
	init_serdePlugin();
	init_serializerMiddleware();
}));
var isArrayBuffer;
var init_dist_es$38 = __esmMin((() => {
	isArrayBuffer = (arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
}));
var fromArrayBuffer, fromString;
var init_dist_es$37 = __esmMin((() => {
	init_dist_es$38();
	fromArrayBuffer = (input, offset = 0, length = input.byteLength - offset) => {
		if (!isArrayBuffer(input)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
		return Buffer$1.from(input, offset, length);
	};
	fromString = (input, encoding) => {
		if (typeof input !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
		return encoding ? Buffer$1.from(input, encoding) : Buffer$1.from(input);
	};
}));
var BASE64_REGEX, fromBase64;
var init_fromBase64 = __esmMin((() => {
	init_dist_es$37();
	BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
	fromBase64 = (input) => {
		if (input.length * 3 % 4 !== 0) throw new TypeError(`Incorrect padding on base64 string.`);
		if (!BASE64_REGEX.exec(input)) throw new TypeError(`Invalid base64 string.`);
		const buffer = fromString(input, "base64");
		return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
	};
}));
var fromUtf8;
var init_fromUtf8 = __esmMin((() => {
	init_dist_es$37();
	fromUtf8 = (input) => {
		const buf = fromString(input, "utf8");
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
	};
}));
var toUint8Array;
var init_toUint8Array = __esmMin((() => {
	init_fromUtf8();
	toUint8Array = (data) => {
		if (typeof data === "string") return fromUtf8(data);
		if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
		return new Uint8Array(data);
	};
}));
var toUtf8;
var init_toUtf8 = __esmMin((() => {
	init_dist_es$37();
	toUtf8 = (input) => {
		if (typeof input === "string") return input;
		if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
		return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
	};
}));
var dist_es_exports$27 = /* @__PURE__ */ __exportAll({
	fromUtf8: () => fromUtf8,
	toUint8Array: () => toUint8Array,
	toUtf8: () => toUtf8
});
var init_dist_es$36 = __esmMin((() => {
	init_fromUtf8();
	init_toUint8Array();
	init_toUtf8();
}));
var toBase64;
var init_toBase64 = __esmMin((() => {
	init_dist_es$37();
	init_dist_es$36();
	toBase64 = (_input) => {
		let input;
		if (typeof _input === "string") input = fromUtf8(_input);
		else input = _input;
		if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
		return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("base64");
	};
}));
var dist_es_exports$26 = /* @__PURE__ */ __exportAll({
	fromBase64: () => fromBase64,
	toBase64: () => toBase64
});
var init_dist_es$35 = __esmMin((() => {
	init_fromBase64();
	init_toBase64();
}));
var Uint8ArrayBlobAdapter;
var init_Uint8ArrayBlobAdapter = __esmMin((() => {
	init_dist_es$35();
	init_dist_es$36();
	Uint8ArrayBlobAdapter = class Uint8ArrayBlobAdapter extends Uint8Array {
		static fromString(source, encoding = "utf-8") {
			if (typeof source === "string") {
				if (encoding === "base64") return Uint8ArrayBlobAdapter.mutate(fromBase64(source));
				return Uint8ArrayBlobAdapter.mutate(fromUtf8(source));
			}
			throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
		}
		static mutate(source) {
			Object.setPrototypeOf(source, Uint8ArrayBlobAdapter.prototype);
			return source;
		}
		transformToString(encoding = "utf-8") {
			if (encoding === "base64") return toBase64(this);
			return toUtf8(this);
		}
	};
}));
var ChecksumStream$1;
var init_ChecksumStream = __esmMin((() => {
	init_dist_es$35();
	ChecksumStream$1 = class extends Duplex {
		expectedChecksum;
		checksumSourceLocation;
		checksum;
		source;
		base64Encoder;
		constructor({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder }) {
			super();
			if (typeof source.pipe === "function") this.source = source;
			else throw new Error(`@smithy/util-stream: unsupported source type ${source?.constructor?.name ?? source} in ChecksumStream.`);
			this.base64Encoder = base64Encoder ?? toBase64;
			this.expectedChecksum = expectedChecksum;
			this.checksum = checksum;
			this.checksumSourceLocation = checksumSourceLocation;
			this.source.pipe(this);
		}
		_read(size) {}
		_write(chunk, encoding, callback) {
			try {
				this.checksum.update(chunk);
				this.push(chunk);
			} catch (e) {
				return callback(e);
			}
			return callback();
		}
		async _final(callback) {
			try {
				const digest = await this.checksum.digest();
				const received = this.base64Encoder(digest);
				if (this.expectedChecksum !== received) return callback(/* @__PURE__ */ new Error(`Checksum mismatch: expected "${this.expectedChecksum}" but received "${received}" in response header "${this.checksumSourceLocation}".`));
			} catch (e) {
				return callback(e);
			}
			this.push(null);
			return callback();
		}
	};
}));
var isReadableStream, isBlob;
var init_stream_type_check = __esmMin((() => {
	isReadableStream = (stream) => typeof ReadableStream === "function" && (stream?.constructor?.name === ReadableStream.name || stream instanceof ReadableStream);
	isBlob = (blob) => {
		return typeof Blob === "function" && (blob?.constructor?.name === Blob.name || blob instanceof Blob);
	};
}));
var ReadableStreamRef, ChecksumStream;
var init_ChecksumStream_browser = __esmMin((() => {
	ReadableStreamRef = typeof ReadableStream === "function" ? ReadableStream : function() {};
	ChecksumStream = class extends ReadableStreamRef {};
}));
var createChecksumStream$1;
var init_createChecksumStream_browser = __esmMin((() => {
	init_dist_es$35();
	init_stream_type_check();
	init_ChecksumStream_browser();
	createChecksumStream$1 = ({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder }) => {
		if (!isReadableStream(source)) throw new Error(`@smithy/util-stream: unsupported source type ${source?.constructor?.name ?? source} in ChecksumStream.`);
		const encoder = base64Encoder ?? toBase64;
		if (typeof TransformStream !== "function") throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
		const transform = new TransformStream({
			start() {},
			async transform(chunk, controller) {
				checksum.update(chunk);
				controller.enqueue(chunk);
			},
			async flush(controller) {
				const received = encoder(await checksum.digest());
				if (expectedChecksum !== received) {
					const error = /* @__PURE__ */ new Error(`Checksum mismatch: expected "${expectedChecksum}" but received "${received}" in response header "${checksumSourceLocation}".`);
					controller.error(error);
				} else controller.terminate();
			}
		});
		source.pipeThrough(transform);
		const readable = transform.readable;
		Object.setPrototypeOf(readable, ChecksumStream.prototype);
		return readable;
	};
}));
function createChecksumStream(init) {
	if (typeof ReadableStream === "function" && isReadableStream(init.source)) return createChecksumStream$1(init);
	return new ChecksumStream$1(init);
}
var init_createChecksumStream = __esmMin((() => {
	init_stream_type_check();
	init_ChecksumStream();
	init_createChecksumStream_browser();
}));
var ByteArrayCollector;
var init_ByteArrayCollector = __esmMin((() => {
	ByteArrayCollector = class {
		allocByteArray;
		byteLength = 0;
		byteArrays = [];
		constructor(allocByteArray) {
			this.allocByteArray = allocByteArray;
		}
		push(byteArray) {
			this.byteArrays.push(byteArray);
			this.byteLength += byteArray.byteLength;
		}
		flush() {
			if (this.byteArrays.length === 1) {
				const bytes = this.byteArrays[0];
				this.reset();
				return bytes;
			}
			const aggregation = this.allocByteArray(this.byteLength);
			let cursor = 0;
			for (let i = 0; i < this.byteArrays.length; ++i) {
				const bytes = this.byteArrays[i];
				aggregation.set(bytes, cursor);
				cursor += bytes.byteLength;
			}
			this.reset();
			return aggregation;
		}
		reset() {
			this.byteArrays = [];
			this.byteLength = 0;
		}
	};
}));
function createBufferedReadableStream(upstream, size, logger) {
	const reader = upstream.getReader();
	let streamBufferingLoggedWarning = false;
	let bytesSeen = 0;
	const buffers = ["", new ByteArrayCollector((size) => new Uint8Array(size))];
	let mode = -1;
	const pull = async (controller) => {
		const { value, done } = await reader.read();
		const chunk = value;
		if (done) {
			if (mode !== -1) {
				const remainder = flush(buffers, mode);
				if (sizeOf(remainder) > 0) controller.enqueue(remainder);
			}
			controller.close();
		} else {
			const chunkMode = modeOf(chunk, false);
			if (mode !== chunkMode) {
				if (mode >= 0) controller.enqueue(flush(buffers, mode));
				mode = chunkMode;
			}
			if (mode === -1) {
				controller.enqueue(chunk);
				return;
			}
			const chunkSize = sizeOf(chunk);
			bytesSeen += chunkSize;
			const bufferSize = sizeOf(buffers[mode]);
			if (chunkSize >= size && bufferSize === 0) controller.enqueue(chunk);
			else {
				const newSize = merge(buffers, mode, chunk);
				if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
					streamBufferingLoggedWarning = true;
					logger?.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
				}
				if (newSize >= size) controller.enqueue(flush(buffers, mode));
				else await pull(controller);
			}
		}
	};
	return new ReadableStream({ pull });
}
function merge(buffers, mode, chunk) {
	switch (mode) {
		case 0:
			buffers[0] += chunk;
			return sizeOf(buffers[0]);
		case 1:
		case 2:
			buffers[mode].push(chunk);
			return sizeOf(buffers[mode]);
	}
}
function flush(buffers, mode) {
	switch (mode) {
		case 0:
			const s = buffers[0];
			buffers[0] = "";
			return s;
		case 1:
		case 2: return buffers[mode].flush();
	}
	throw new Error(`@smithy/util-stream - invalid index ${mode} given to flush()`);
}
function sizeOf(chunk) {
	return chunk?.byteLength ?? chunk?.length ?? 0;
}
function modeOf(chunk, allowBuffer = true) {
	if (allowBuffer && typeof Buffer !== "undefined" && chunk instanceof Buffer) return 2;
	if (chunk instanceof Uint8Array) return 1;
	if (typeof chunk === "string") return 0;
	return -1;
}
var init_createBufferedReadableStream = __esmMin((() => {
	init_ByteArrayCollector();
}));
function createBufferedReadable(upstream, size, logger) {
	if (isReadableStream(upstream)) return createBufferedReadableStream(upstream, size, logger);
	const downstream = new Readable({ read() {} });
	let streamBufferingLoggedWarning = false;
	let bytesSeen = 0;
	const buffers = [
		"",
		new ByteArrayCollector((size) => new Uint8Array(size)),
		new ByteArrayCollector((size) => Buffer.from(new Uint8Array(size)))
	];
	let mode = -1;
	upstream.on("data", (chunk) => {
		const chunkMode = modeOf(chunk, true);
		if (mode !== chunkMode) {
			if (mode >= 0) downstream.push(flush(buffers, mode));
			mode = chunkMode;
		}
		if (mode === -1) {
			downstream.push(chunk);
			return;
		}
		const chunkSize = sizeOf(chunk);
		bytesSeen += chunkSize;
		const bufferSize = sizeOf(buffers[mode]);
		if (chunkSize >= size && bufferSize === 0) downstream.push(chunk);
		else {
			const newSize = merge(buffers, mode, chunk);
			if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
				streamBufferingLoggedWarning = true;
				logger?.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
			}
			if (newSize >= size) downstream.push(flush(buffers, mode));
		}
	});
	upstream.on("end", () => {
		if (mode !== -1) {
			const remainder = flush(buffers, mode);
			if (sizeOf(remainder) > 0) downstream.push(remainder);
		}
		downstream.push(null);
	});
	return downstream;
}
var init_createBufferedReadable = __esmMin((() => {
	init_ByteArrayCollector();
	init_createBufferedReadableStream();
	init_stream_type_check();
}));
var getAwsChunkedEncodingStream$1;
var init_getAwsChunkedEncodingStream_browser = __esmMin((() => {
	getAwsChunkedEncodingStream$1 = (readableStream, options) => {
		const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
		const checksumRequired = base64Encoder !== void 0 && bodyLengthChecker !== void 0 && checksumAlgorithmFn !== void 0 && checksumLocationName !== void 0 && streamHasher !== void 0;
		const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : void 0;
		const reader = readableStream.getReader();
		return new ReadableStream({ async pull(controller) {
			const { value, done } = await reader.read();
			if (done) {
				controller.enqueue(`0\r\n`);
				if (checksumRequired) {
					const checksum = base64Encoder(await digest);
					controller.enqueue(`${checksumLocationName}:${checksum}\r\n`);
					controller.enqueue(`\r\n`);
				}
				controller.close();
			} else controller.enqueue(`${(bodyLengthChecker(value) || 0).toString(16)}\r\n${value}\r\n`);
		} });
	};
}));
function getAwsChunkedEncodingStream(stream, options) {
	const readable = stream;
	const readableStream = stream;
	if (isReadableStream(readableStream)) return getAwsChunkedEncodingStream$1(readableStream, options);
	const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
	const checksumRequired = base64Encoder !== void 0 && checksumAlgorithmFn !== void 0 && checksumLocationName !== void 0 && streamHasher !== void 0;
	const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readable) : void 0;
	const awsChunkedEncodingStream = new Readable({ read: () => {} });
	readable.on("data", (data) => {
		const length = bodyLengthChecker(data) || 0;
		if (length === 0) return;
		awsChunkedEncodingStream.push(`${length.toString(16)}\r\n`);
		awsChunkedEncodingStream.push(data);
		awsChunkedEncodingStream.push("\r\n");
	});
	readable.on("end", async () => {
		awsChunkedEncodingStream.push(`0\r\n`);
		if (checksumRequired) {
			const checksum = base64Encoder(await digest);
			awsChunkedEncodingStream.push(`${checksumLocationName}:${checksum}\r\n`);
			awsChunkedEncodingStream.push(`\r\n`);
		}
		awsChunkedEncodingStream.push(null);
	});
	return awsChunkedEncodingStream;
}
var init_getAwsChunkedEncodingStream = __esmMin((() => {
	init_getAwsChunkedEncodingStream_browser();
	init_stream_type_check();
}));
async function headStream$1(stream, bytes) {
	let byteLengthCounter = 0;
	const chunks = [];
	const reader = stream.getReader();
	let isDone = false;
	while (!isDone) {
		const { done, value } = await reader.read();
		if (value) {
			chunks.push(value);
			byteLengthCounter += value?.byteLength ?? 0;
		}
		if (byteLengthCounter >= bytes) break;
		isDone = done;
	}
	reader.releaseLock();
	const collected = new Uint8Array(Math.min(bytes, byteLengthCounter));
	let offset = 0;
	for (const chunk of chunks) {
		if (chunk.byteLength > collected.byteLength - offset) {
			collected.set(chunk.subarray(0, collected.byteLength - offset), offset);
			break;
		} else collected.set(chunk, offset);
		offset += chunk.length;
	}
	return collected;
}
var init_headStream_browser = __esmMin((() => {}));
var headStream, Collector$1;
var init_headStream = __esmMin((() => {
	init_headStream_browser();
	init_stream_type_check();
	headStream = (stream, bytes) => {
		if (isReadableStream(stream)) return headStream$1(stream, bytes);
		return new Promise((resolve, reject) => {
			const collector = new Collector$1();
			collector.limit = bytes;
			stream.pipe(collector);
			stream.on("error", (err) => {
				collector.end();
				reject(err);
			});
			collector.on("error", reject);
			collector.on("finish", function() {
				resolve(new Uint8Array(Buffer.concat(this.buffers)));
			});
		});
	};
	Collector$1 = class extends Writable {
		buffers = [];
		limit = Infinity;
		bytesBuffered = 0;
		_write(chunk, encoding, callback) {
			this.buffers.push(chunk);
			this.bytesBuffered += chunk.byteLength ?? 0;
			if (this.bytesBuffered >= this.limit) {
				const excess = this.bytesBuffered - this.limit;
				const tailBuffer = this.buffers[this.buffers.length - 1];
				this.buffers[this.buffers.length - 1] = tailBuffer.subarray(0, tailBuffer.byteLength - excess);
				this.emit("finish");
			}
			callback();
		}
	};
}));
var escapeUri, hexEncode;
var init_escape_uri = __esmMin((() => {
	escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
	hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
}));
var init_escape_uri_path = __esmMin((() => {}));
var init_dist_es$34 = __esmMin((() => {
	init_escape_uri();
	init_escape_uri_path();
}));
function buildQueryString(query) {
	const parts = [];
	for (let key of Object.keys(query).sort()) {
		const value = query[key];
		key = escapeUri(key);
		if (Array.isArray(value)) for (let i = 0, iLen = value.length; i < iLen; i++) parts.push(`${key}=${escapeUri(value[i])}`);
		else {
			let qsEntry = key;
			if (value || typeof value === "string") qsEntry += `=${escapeUri(value)}`;
			parts.push(qsEntry);
		}
	}
	return parts.join("&");
}
var init_dist_es$33 = __esmMin((() => {
	init_dist_es$34();
}));
var NODEJS_TIMEOUT_ERROR_CODES$1;
var init_constants$7 = __esmMin((() => {
	NODEJS_TIMEOUT_ERROR_CODES$1 = [
		"ECONNRESET",
		"EPIPE",
		"ETIMEDOUT"
	];
}));
var getTransformedHeaders;
var init_get_transformed_headers = __esmMin((() => {
	getTransformedHeaders = (headers) => {
		const transformedHeaders = {};
		for (const name of Object.keys(headers)) {
			const headerValues = headers[name];
			transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
		}
		return transformedHeaders;
	};
}));
var timing;
var init_timing = __esmMin((() => {
	timing = {
		setTimeout: (cb, ms) => setTimeout(cb, ms),
		clearTimeout: (timeoutId) => clearTimeout(timeoutId)
	};
}));
var DEFER_EVENT_LISTENER_TIME$2, setConnectionTimeout;
var init_set_connection_timeout = __esmMin((() => {
	init_timing();
	DEFER_EVENT_LISTENER_TIME$2 = 1e3;
	setConnectionTimeout = (request, reject, timeoutInMs = 0) => {
		if (!timeoutInMs) return -1;
		const registerTimeout = (offset) => {
			const timeoutId = timing.setTimeout(() => {
				request.destroy();
				reject(Object.assign(/* @__PURE__ */ new Error(`@smithy/node-http-handler - the request socket did not establish a connection with the server within the configured timeout of ${timeoutInMs} ms.`), { name: "TimeoutError" }));
			}, timeoutInMs - offset);
			const doWithSocket = (socket) => {
				if (socket?.connecting) socket.on("connect", () => {
					timing.clearTimeout(timeoutId);
				});
				else timing.clearTimeout(timeoutId);
			};
			if (request.socket) doWithSocket(request.socket);
			else request.on("socket", doWithSocket);
		};
		if (timeoutInMs < 2e3) {
			registerTimeout(0);
			return 0;
		}
		return timing.setTimeout(registerTimeout.bind(null, DEFER_EVENT_LISTENER_TIME$2), DEFER_EVENT_LISTENER_TIME$2);
	};
}));
var setRequestTimeout;
var init_set_request_timeout = __esmMin((() => {
	init_timing();
	setRequestTimeout = (req, reject, timeoutInMs = 0, throwOnRequestTimeout, logger) => {
		if (timeoutInMs) return timing.setTimeout(() => {
			let msg = `@smithy/node-http-handler - [${throwOnRequestTimeout ? "ERROR" : "WARN"}] a request has exceeded the configured ${timeoutInMs} ms requestTimeout.`;
			if (throwOnRequestTimeout) {
				const error = Object.assign(new Error(msg), {
					name: "TimeoutError",
					code: "ETIMEDOUT"
				});
				req.destroy(error);
				reject(error);
			} else {
				msg += ` Init client requestHandler with throwOnRequestTimeout=true to turn this into an error.`;
				logger?.warn?.(msg);
			}
		}, timeoutInMs);
		return -1;
	};
}));
var DEFER_EVENT_LISTENER_TIME$1, setSocketKeepAlive;
var init_set_socket_keep_alive = __esmMin((() => {
	init_timing();
	DEFER_EVENT_LISTENER_TIME$1 = 3e3;
	setSocketKeepAlive = (request, { keepAlive, keepAliveMsecs }, deferTimeMs = DEFER_EVENT_LISTENER_TIME$1) => {
		if (keepAlive !== true) return -1;
		const registerListener = () => {
			if (request.socket) request.socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
			else request.on("socket", (socket) => {
				socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
			});
		};
		if (deferTimeMs === 0) {
			registerListener();
			return 0;
		}
		return timing.setTimeout(registerListener, deferTimeMs);
	};
}));
var DEFER_EVENT_LISTENER_TIME, setSocketTimeout;
var init_set_socket_timeout = __esmMin((() => {
	init_timing();
	DEFER_EVENT_LISTENER_TIME = 3e3;
	setSocketTimeout = (request, reject, timeoutInMs = 0) => {
		const registerTimeout = (offset) => {
			const timeout = timeoutInMs - offset;
			const onTimeout = () => {
				request.destroy();
				reject(Object.assign(/* @__PURE__ */ new Error(`@smithy/node-http-handler - the request socket timed out after ${timeoutInMs} ms of inactivity (configured by client requestHandler).`), { name: "TimeoutError" }));
			};
			if (request.socket) {
				request.socket.setTimeout(timeout, onTimeout);
				request.on("close", () => request.socket?.removeListener("timeout", onTimeout));
			} else request.setTimeout(timeout, onTimeout);
		};
		if (0 < timeoutInMs && timeoutInMs < 6e3) {
			registerTimeout(0);
			return 0;
		}
		return timing.setTimeout(registerTimeout.bind(null, timeoutInMs === 0 ? 0 : DEFER_EVENT_LISTENER_TIME), DEFER_EVENT_LISTENER_TIME);
	};
}));
async function writeRequestBody(httpRequest, request, maxContinueTimeoutMs = MIN_WAIT_TIME, externalAgent = false) {
	const headers = request.headers ?? {};
	const expect = headers.Expect || headers.expect;
	let timeoutId = -1;
	let sendBody = true;
	if (!externalAgent && expect === "100-continue") sendBody = await Promise.race([new Promise((resolve) => {
		timeoutId = Number(timing.setTimeout(() => resolve(true), Math.max(MIN_WAIT_TIME, maxContinueTimeoutMs)));
	}), new Promise((resolve) => {
		httpRequest.on("continue", () => {
			timing.clearTimeout(timeoutId);
			resolve(true);
		});
		httpRequest.on("response", () => {
			timing.clearTimeout(timeoutId);
			resolve(false);
		});
		httpRequest.on("error", () => {
			timing.clearTimeout(timeoutId);
			resolve(false);
		});
	})]);
	if (sendBody) writeBody(httpRequest, request.body);
}
function writeBody(httpRequest, body) {
	if (body instanceof Readable$1) {
		body.pipe(httpRequest);
		return;
	}
	if (body) {
		const isBuffer = Buffer.isBuffer(body);
		if (isBuffer || typeof body === "string") {
			if (isBuffer && body.byteLength === 0) httpRequest.end();
			else httpRequest.end(body);
			return;
		}
		const uint8 = body;
		if (typeof uint8 === "object" && uint8.buffer && typeof uint8.byteOffset === "number" && typeof uint8.byteLength === "number") {
			httpRequest.end(Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength));
			return;
		}
		httpRequest.end(Buffer.from(body));
		return;
	}
	httpRequest.end();
}
var MIN_WAIT_TIME;
var init_write_request_body = __esmMin((() => {
	init_timing();
	MIN_WAIT_TIME = 6e3;
})), NodeHttpHandler;
var init_node_http_handler = __esmMin((() => {
	init_dist_es$41();
	init_dist_es$33();
	init_constants$7();
	init_get_transformed_headers();
	init_set_connection_timeout();
	init_set_request_timeout();
	init_set_socket_keep_alive();
	init_set_socket_timeout();
	init_timing();
	init_write_request_body();
	NodeHttpHandler = class NodeHttpHandler {
		config;
		configProvider;
		socketWarningTimestamp = 0;
		externalAgent = false;
		metadata = { handlerProtocol: "http/1.1" };
		static create(instanceOrOptions) {
			if (typeof instanceOrOptions?.handle === "function") return instanceOrOptions;
			return new NodeHttpHandler(instanceOrOptions);
		}
		static checkSocketUsage(agent, socketWarningTimestamp, logger = console) {
			const { sockets, requests, maxSockets } = agent;
			if (typeof maxSockets !== "number" || maxSockets === Infinity) return socketWarningTimestamp;
			if (Date.now() - 15e3 < socketWarningTimestamp) return socketWarningTimestamp;
			if (sockets && requests) for (const origin in sockets) {
				const socketsInUse = sockets[origin]?.length ?? 0;
				const requestsEnqueued = requests[origin]?.length ?? 0;
				if (socketsInUse >= maxSockets && requestsEnqueued >= 2 * maxSockets) {
					logger?.warn?.(`@smithy/node-http-handler:WARN - socket usage at capacity=${socketsInUse} and ${requestsEnqueued} additional requests are enqueued.
See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.`);
					return Date.now();
				}
			}
			return socketWarningTimestamp;
		}
		constructor(options) {
			this.configProvider = new Promise((resolve, reject) => {
				if (typeof options === "function") options().then((_options) => {
					resolve(this.resolveDefaultConfig(_options));
				}).catch(reject);
				else resolve(this.resolveDefaultConfig(options));
			});
		}
		resolveDefaultConfig(options) {
			const { requestTimeout, connectionTimeout, socketTimeout, socketAcquisitionWarningTimeout, httpAgent, httpsAgent, throwOnRequestTimeout, logger } = options || {};
			const keepAlive = true;
			const maxSockets = 50;
			return {
				connectionTimeout,
				requestTimeout,
				socketTimeout,
				socketAcquisitionWarningTimeout,
				throwOnRequestTimeout,
				httpAgent: (() => {
					if (httpAgent instanceof Agent || typeof httpAgent?.destroy === "function") {
						this.externalAgent = true;
						return httpAgent;
					}
					return new Agent({
						keepAlive,
						maxSockets,
						...httpAgent
					});
				})(),
				httpsAgent: (() => {
					if (httpsAgent instanceof Agent$1 || typeof httpsAgent?.destroy === "function") {
						this.externalAgent = true;
						return httpsAgent;
					}
					return new Agent$1({
						keepAlive,
						maxSockets,
						...httpsAgent
					});
				})(),
				logger
			};
		}
		destroy() {
			this.config?.httpAgent?.destroy();
			this.config?.httpsAgent?.destroy();
		}
		async handle(request$2, { abortSignal, requestTimeout } = {}) {
			if (!this.config) this.config = await this.configProvider;
			return new Promise((_resolve, _reject) => {
				const config = this.config;
				let writeRequestBodyPromise = void 0;
				const timeouts = [];
				const resolve = async (arg) => {
					await writeRequestBodyPromise;
					timeouts.forEach(timing.clearTimeout);
					_resolve(arg);
				};
				const reject = async (arg) => {
					await writeRequestBodyPromise;
					timeouts.forEach(timing.clearTimeout);
					_reject(arg);
				};
				if (abortSignal?.aborted) {
					const abortError = /* @__PURE__ */ new Error("Request aborted");
					abortError.name = "AbortError";
					reject(abortError);
					return;
				}
				const isSSL = request$2.protocol === "https:";
				const headers = request$2.headers ?? {};
				const expectContinue = (headers.Expect ?? headers.expect) === "100-continue";
				let agent = isSSL ? config.httpsAgent : config.httpAgent;
				if (expectContinue && !this.externalAgent) agent = new (isSSL ? Agent$1 : Agent)({
					keepAlive: false,
					maxSockets: Infinity
				});
				timeouts.push(timing.setTimeout(() => {
					this.socketWarningTimestamp = NodeHttpHandler.checkSocketUsage(agent, this.socketWarningTimestamp, config.logger);
				}, config.socketAcquisitionWarningTimeout ?? (config.requestTimeout ?? 2e3) + (config.connectionTimeout ?? 1e3)));
				const queryString = buildQueryString(request$2.query || {});
				let auth = void 0;
				if (request$2.username != null || request$2.password != null) auth = `${request$2.username ?? ""}:${request$2.password ?? ""}`;
				let path = request$2.path;
				if (queryString) path += `?${queryString}`;
				if (request$2.fragment) path += `#${request$2.fragment}`;
				let hostname = request$2.hostname ?? "";
				if (hostname[0] === "[" && hostname.endsWith("]")) hostname = request$2.hostname.slice(1, -1);
				else hostname = request$2.hostname;
				const nodeHttpsOptions = {
					headers: request$2.headers,
					host: hostname,
					method: request$2.method,
					path,
					port: request$2.port,
					agent,
					auth
				};
				const req = (isSSL ? request$1 : request)(nodeHttpsOptions, (res) => {
					resolve({ response: new HttpResponse({
						statusCode: res.statusCode || -1,
						reason: res.statusMessage,
						headers: getTransformedHeaders(res.headers),
						body: res
					}) });
				});
				req.on("error", (err) => {
					if (NODEJS_TIMEOUT_ERROR_CODES$1.includes(err.code)) reject(Object.assign(err, { name: "TimeoutError" }));
					else reject(err);
				});
				if (abortSignal) {
					const onAbort = () => {
						req.destroy();
						const abortError = /* @__PURE__ */ new Error("Request aborted");
						abortError.name = "AbortError";
						reject(abortError);
					};
					if (typeof abortSignal.addEventListener === "function") {
						const signal = abortSignal;
						signal.addEventListener("abort", onAbort, { once: true });
						req.once("close", () => signal.removeEventListener("abort", onAbort));
					} else abortSignal.onabort = onAbort;
				}
				const effectiveRequestTimeout = requestTimeout ?? config.requestTimeout;
				timeouts.push(setConnectionTimeout(req, reject, config.connectionTimeout));
				timeouts.push(setRequestTimeout(req, reject, effectiveRequestTimeout, config.throwOnRequestTimeout, config.logger ?? console));
				timeouts.push(setSocketTimeout(req, reject, config.socketTimeout));
				const httpAgent = nodeHttpsOptions.agent;
				if (typeof httpAgent === "object" && "keepAlive" in httpAgent) timeouts.push(setSocketKeepAlive(req, {
					keepAlive: httpAgent.keepAlive,
					keepAliveMsecs: httpAgent.keepAliveMsecs
				}));
				writeRequestBodyPromise = writeRequestBody(req, request$2, effectiveRequestTimeout, this.externalAgent).catch((e) => {
					timeouts.forEach(timing.clearTimeout);
					return _reject(e);
				});
			});
		}
		updateHttpClientConfig(key, value) {
			this.config = void 0;
			this.configProvider = this.configProvider.then((config) => {
				return {
					...config,
					[key]: value
				};
			});
		}
		httpHandlerConfigs() {
			return this.config ?? {};
		}
	};
}));
var NodeHttp2ConnectionPool;
var init_node_http2_connection_pool = __esmMin((() => {
	NodeHttp2ConnectionPool = class {
		sessions = [];
		constructor(sessions) {
			this.sessions = sessions ?? [];
		}
		poll() {
			if (this.sessions.length > 0) return this.sessions.shift();
		}
		offerLast(session) {
			this.sessions.push(session);
		}
		contains(session) {
			return this.sessions.includes(session);
		}
		remove(session) {
			this.sessions = this.sessions.filter((s) => s !== session);
		}
		[Symbol.iterator]() {
			return this.sessions[Symbol.iterator]();
		}
		destroy(connection) {
			for (const session of this.sessions) if (session === connection) {
				if (!session.destroyed) session.destroy();
			}
		}
	};
}));
var NodeHttp2ConnectionManager;
var init_node_http2_connection_manager = __esmMin((() => {
	init_node_http2_connection_pool();
	NodeHttp2ConnectionManager = class {
		constructor(config) {
			this.config = config;
			if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrency must be greater than zero.");
		}
		config;
		sessionCache = /* @__PURE__ */ new Map();
		lease(requestContext, connectionConfiguration) {
			const url = this.getUrlString(requestContext);
			const existingPool = this.sessionCache.get(url);
			if (existingPool) {
				const existingSession = existingPool.poll();
				if (existingSession && !this.config.disableConcurrency) return existingSession;
			}
			const session = http2.connect(url);
			if (this.config.maxConcurrency) session.settings({ maxConcurrentStreams: this.config.maxConcurrency }, (err) => {
				if (err) throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + requestContext.destination.toString());
			});
			session.unref();
			const destroySessionCb = () => {
				session.destroy();
				this.deleteSession(url, session);
			};
			session.on("goaway", destroySessionCb);
			session.on("error", destroySessionCb);
			session.on("frameError", destroySessionCb);
			session.on("close", () => this.deleteSession(url, session));
			if (connectionConfiguration.requestTimeout) session.setTimeout(connectionConfiguration.requestTimeout, destroySessionCb);
			const connectionPool = this.sessionCache.get(url) || new NodeHttp2ConnectionPool();
			connectionPool.offerLast(session);
			this.sessionCache.set(url, connectionPool);
			return session;
		}
		deleteSession(authority, session) {
			const existingConnectionPool = this.sessionCache.get(authority);
			if (!existingConnectionPool) return;
			if (!existingConnectionPool.contains(session)) return;
			existingConnectionPool.remove(session);
			this.sessionCache.set(authority, existingConnectionPool);
		}
		release(requestContext, session) {
			const cacheKey = this.getUrlString(requestContext);
			this.sessionCache.get(cacheKey)?.offerLast(session);
		}
		destroy() {
			for (const [key, connectionPool] of this.sessionCache) {
				for (const session of connectionPool) {
					if (!session.destroyed) session.destroy();
					connectionPool.remove(session);
				}
				this.sessionCache.delete(key);
			}
		}
		setMaxConcurrentStreams(maxConcurrentStreams) {
			if (maxConcurrentStreams && maxConcurrentStreams <= 0) throw new RangeError("maxConcurrentStreams must be greater than zero.");
			this.config.maxConcurrency = maxConcurrentStreams;
		}
		setDisableConcurrentStreams(disableConcurrentStreams) {
			this.config.disableConcurrency = disableConcurrentStreams;
		}
		getUrlString(request) {
			return request.destination.toString();
		}
	};
}));
var NodeHttp2Handler;
var init_node_http2_handler = __esmMin((() => {
	init_dist_es$41();
	init_dist_es$33();
	init_get_transformed_headers();
	init_node_http2_connection_manager();
	init_write_request_body();
	NodeHttp2Handler = class NodeHttp2Handler {
		config;
		configProvider;
		metadata = { handlerProtocol: "h2" };
		connectionManager = new NodeHttp2ConnectionManager({});
		static create(instanceOrOptions) {
			if (typeof instanceOrOptions?.handle === "function") return instanceOrOptions;
			return new NodeHttp2Handler(instanceOrOptions);
		}
		constructor(options) {
			this.configProvider = new Promise((resolve, reject) => {
				if (typeof options === "function") options().then((opts) => {
					resolve(opts || {});
				}).catch(reject);
				else resolve(options || {});
			});
		}
		destroy() {
			this.connectionManager.destroy();
		}
		async handle(request, { abortSignal, requestTimeout } = {}) {
			if (!this.config) {
				this.config = await this.configProvider;
				this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || false);
				if (this.config.maxConcurrentStreams) this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams);
			}
			const { requestTimeout: configRequestTimeout, disableConcurrentStreams } = this.config;
			const effectiveRequestTimeout = requestTimeout ?? configRequestTimeout;
			return new Promise((_resolve, _reject) => {
				let fulfilled = false;
				let writeRequestBodyPromise = void 0;
				const resolve = async (arg) => {
					await writeRequestBodyPromise;
					_resolve(arg);
				};
				const reject = async (arg) => {
					await writeRequestBodyPromise;
					_reject(arg);
				};
				if (abortSignal?.aborted) {
					fulfilled = true;
					const abortError = /* @__PURE__ */ new Error("Request aborted");
					abortError.name = "AbortError";
					reject(abortError);
					return;
				}
				const { hostname, method, port, protocol, query } = request;
				let auth = "";
				if (request.username != null || request.password != null) auth = `${request.username ?? ""}:${request.password ?? ""}@`;
				const authority = `${protocol}//${auth}${hostname}${port ? `:${port}` : ""}`;
				const requestContext = { destination: new URL(authority) };
				const session = this.connectionManager.lease(requestContext, {
					requestTimeout: this.config?.sessionTimeout,
					disableConcurrentStreams: disableConcurrentStreams || false
				});
				const rejectWithDestroy = (err) => {
					if (disableConcurrentStreams) this.destroySession(session);
					fulfilled = true;
					reject(err);
				};
				const queryString = buildQueryString(query || {});
				let path = request.path;
				if (queryString) path += `?${queryString}`;
				if (request.fragment) path += `#${request.fragment}`;
				const req = session.request({
					...request.headers,
					[constants.HTTP2_HEADER_PATH]: path,
					[constants.HTTP2_HEADER_METHOD]: method
				});
				session.ref();
				req.on("response", (headers) => {
					const httpResponse = new HttpResponse({
						statusCode: headers[":status"] || -1,
						headers: getTransformedHeaders(headers),
						body: req
					});
					fulfilled = true;
					resolve({ response: httpResponse });
					if (disableConcurrentStreams) {
						session.close();
						this.connectionManager.deleteSession(authority, session);
					}
				});
				if (effectiveRequestTimeout) req.setTimeout(effectiveRequestTimeout, () => {
					req.close();
					const timeoutError = /* @__PURE__ */ new Error(`Stream timed out because of no activity for ${effectiveRequestTimeout} ms`);
					timeoutError.name = "TimeoutError";
					rejectWithDestroy(timeoutError);
				});
				if (abortSignal) {
					const onAbort = () => {
						req.close();
						const abortError = /* @__PURE__ */ new Error("Request aborted");
						abortError.name = "AbortError";
						rejectWithDestroy(abortError);
					};
					if (typeof abortSignal.addEventListener === "function") {
						const signal = abortSignal;
						signal.addEventListener("abort", onAbort, { once: true });
						req.once("close", () => signal.removeEventListener("abort", onAbort));
					} else abortSignal.onabort = onAbort;
				}
				req.on("frameError", (type, code, id) => {
					rejectWithDestroy(/* @__PURE__ */ new Error(`Frame type id ${type} in stream id ${id} has failed with code ${code}.`));
				});
				req.on("error", rejectWithDestroy);
				req.on("aborted", () => {
					rejectWithDestroy(/* @__PURE__ */ new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${req.rstCode}.`));
				});
				req.on("close", () => {
					session.unref();
					if (disableConcurrentStreams) session.destroy();
					if (!fulfilled) rejectWithDestroy(/* @__PURE__ */ new Error("Unexpected error: http2 request did not get a response"));
				});
				writeRequestBodyPromise = writeRequestBody(req, request, effectiveRequestTimeout);
			});
		}
		updateHttpClientConfig(key, value) {
			this.config = void 0;
			this.configProvider = this.configProvider.then((config) => {
				return {
					...config,
					[key]: value
				};
			});
		}
		httpHandlerConfigs() {
			return this.config ?? {};
		}
		destroySession(session) {
			if (!session.destroyed) session.destroy();
		}
	};
}));
var Collector;
var init_collector = __esmMin((() => {
	Collector = class extends Writable {
		bufferedBytes = [];
		_write(chunk, encoding, callback) {
			this.bufferedBytes.push(chunk);
			callback();
		}
	};
}));
async function collectReadableStream(stream) {
	const chunks = [];
	const reader = stream.getReader();
	let isDone = false;
	let length = 0;
	while (!isDone) {
		const { done, value } = await reader.read();
		if (value) {
			chunks.push(value);
			length += value.length;
		}
		isDone = done;
	}
	const collected = new Uint8Array(length);
	let offset = 0;
	for (const chunk of chunks) {
		collected.set(chunk, offset);
		offset += chunk.length;
	}
	return collected;
}
var streamCollector$1, isReadableStreamInstance;
var init_stream_collector$1 = __esmMin((() => {
	init_collector();
	streamCollector$1 = (stream) => {
		if (isReadableStreamInstance(stream)) return collectReadableStream(stream);
		return new Promise((resolve, reject) => {
			const collector = new Collector();
			stream.pipe(collector);
			stream.on("error", (err) => {
				collector.end();
				reject(err);
			});
			collector.on("error", reject);
			collector.on("finish", function() {
				resolve(new Uint8Array(Buffer.concat(this.bufferedBytes)));
			});
		});
	};
	isReadableStreamInstance = (stream) => typeof ReadableStream === "function" && stream instanceof ReadableStream;
}));
var dist_es_exports$25 = /* @__PURE__ */ __exportAll({
	DEFAULT_REQUEST_TIMEOUT: () => 0,
	NodeHttp2Handler: () => NodeHttp2Handler,
	NodeHttpHandler: () => NodeHttpHandler,
	streamCollector: () => streamCollector$1
});
var init_dist_es$32 = __esmMin((() => {
	init_node_http_handler();
	init_node_http2_handler();
	init_stream_collector$1();
}));
var init_fetch_http_handler = __esmMin((() => {}));
async function collectBlob(blob) {
	const arrayBuffer = fromBase64(await readToBase64(blob));
	return new Uint8Array(arrayBuffer);
}
async function collectStream(stream) {
	const chunks = [];
	const reader = stream.getReader();
	let isDone = false;
	let length = 0;
	while (!isDone) {
		const { done, value } = await reader.read();
		if (value) {
			chunks.push(value);
			length += value.length;
		}
		isDone = done;
	}
	const collected = new Uint8Array(length);
	let offset = 0;
	for (const chunk of chunks) {
		collected.set(chunk, offset);
		offset += chunk.length;
	}
	return collected;
}
function readToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (reader.readyState !== 2) return reject(/* @__PURE__ */ new Error("Reader aborted too early"));
			const result = reader.result ?? "";
			const commaIndex = result.indexOf(",");
			const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
			resolve(result.substring(dataOffset));
		};
		reader.onabort = () => reject(/* @__PURE__ */ new Error("Read aborted"));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(blob);
	});
}
var streamCollector;
var init_stream_collector = __esmMin((() => {
	init_dist_es$35();
	streamCollector = async (stream) => {
		if (typeof Blob === "function" && stream instanceof Blob || stream.constructor?.name === "Blob") {
			if (Blob.prototype.arrayBuffer !== void 0) return new Uint8Array(await stream.arrayBuffer());
			return collectBlob(stream);
		}
		return collectStream(stream);
	};
}));
var init_dist_es$31 = __esmMin((() => {
	init_fetch_http_handler();
	init_stream_collector();
}));
function fromHex(encoded) {
	if (encoded.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
	const out = new Uint8Array(encoded.length / 2);
	for (let i = 0; i < encoded.length; i += 2) {
		const encodedByte = encoded.slice(i, i + 2).toLowerCase();
		if (encodedByte in HEX_TO_SHORT) out[i / 2] = HEX_TO_SHORT[encodedByte];
		else throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
	}
	return out;
}
function toHex(bytes) {
	let out = "";
	for (let i = 0; i < bytes.byteLength; i++) out += SHORT_TO_HEX[bytes[i]];
	return out;
}
var SHORT_TO_HEX, HEX_TO_SHORT;
var init_dist_es$30 = __esmMin((() => {
	SHORT_TO_HEX = {};
	HEX_TO_SHORT = {};
	for (let i = 0; i < 256; i++) {
		let encodedByte = i.toString(16).toLowerCase();
		if (encodedByte.length === 1) encodedByte = `0${encodedByte}`;
		SHORT_TO_HEX[i] = encodedByte;
		HEX_TO_SHORT[encodedByte] = i;
	}
}));
var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED$1, sdkStreamMixin$1, isBlobInstance;
var init_sdk_stream_mixin_browser = __esmMin((() => {
	init_dist_es$31();
	init_dist_es$35();
	init_dist_es$30();
	init_dist_es$36();
	init_stream_type_check();
	ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED$1 = "The stream has already been transformed.";
	sdkStreamMixin$1 = (stream) => {
		if (!isBlobInstance(stream) && !isReadableStream(stream)) {
			const name = stream?.__proto__?.constructor?.name || stream;
			throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${name}`);
		}
		let transformed = false;
		const transformToByteArray = async () => {
			if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED$1);
			transformed = true;
			return await streamCollector(stream);
		};
		const blobToWebStream = (blob) => {
			if (typeof blob.stream !== "function") throw new Error("Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\nIf you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body");
			return blob.stream();
		};
		return Object.assign(stream, {
			transformToByteArray,
			transformToString: async (encoding) => {
				const buf = await transformToByteArray();
				if (encoding === "base64") return toBase64(buf);
				else if (encoding === "hex") return toHex(buf);
				else if (encoding === void 0 || encoding === "utf8" || encoding === "utf-8") return toUtf8(buf);
				else if (typeof TextDecoder === "function") return new TextDecoder(encoding).decode(buf);
				else throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
			},
			transformToWebStream: () => {
				if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED$1);
				transformed = true;
				if (isBlobInstance(stream)) return blobToWebStream(stream);
				else if (isReadableStream(stream)) return stream;
				else throw new Error(`Cannot transform payload to web stream, got ${stream}`);
			}
		});
	};
	isBlobInstance = (stream) => typeof Blob === "function" && stream instanceof Blob;
}));
var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED, sdkStreamMixin;
var init_sdk_stream_mixin = __esmMin((() => {
	init_dist_es$32();
	init_dist_es$37();
	init_sdk_stream_mixin_browser();
	ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
	sdkStreamMixin = (stream) => {
		if (!(stream instanceof Readable$1)) try {
			return sdkStreamMixin$1(stream);
		} catch (e) {
			const name = stream?.__proto__?.constructor?.name || stream;
			throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${name}`);
		}
		let transformed = false;
		const transformToByteArray = async () => {
			if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
			transformed = true;
			return await streamCollector$1(stream);
		};
		return Object.assign(stream, {
			transformToByteArray,
			transformToString: async (encoding) => {
				const buf = await transformToByteArray();
				if (encoding === void 0 || Buffer.isEncoding(encoding)) return fromArrayBuffer(buf.buffer, buf.byteOffset, buf.byteLength).toString(encoding);
				else return new TextDecoder(encoding).decode(buf);
			},
			transformToWebStream: () => {
				if (transformed) throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
				if (stream.readableFlowing !== null) throw new Error("The stream has been consumed by other callbacks.");
				if (typeof Readable$1.toWeb !== "function") throw new Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");
				transformed = true;
				return Readable$1.toWeb(stream);
			}
		});
	};
}));
async function splitStream$1(stream) {
	if (typeof stream.stream === "function") stream = stream.stream();
	return stream.tee();
}
var init_splitStream_browser = __esmMin((() => {}));
async function splitStream(stream) {
	if (isReadableStream(stream) || isBlob(stream)) return splitStream$1(stream);
	const stream1 = new PassThrough$1();
	const stream2 = new PassThrough$1();
	stream.pipe(stream1);
	stream.pipe(stream2);
	return [stream1, stream2];
}
var init_splitStream = __esmMin((() => {
	init_splitStream_browser();
	init_stream_type_check();
}));
var dist_es_exports$24 = /* @__PURE__ */ __exportAll({
	ChecksumStream: () => ChecksumStream$1,
	Uint8ArrayBlobAdapter: () => Uint8ArrayBlobAdapter,
	createBufferedReadable: () => createBufferedReadable,
	createChecksumStream: () => createChecksumStream,
	getAwsChunkedEncodingStream: () => getAwsChunkedEncodingStream,
	headStream: () => headStream,
	isBlob: () => isBlob,
	isReadableStream: () => isReadableStream,
	sdkStreamMixin: () => sdkStreamMixin,
	splitStream: () => splitStream
});
var init_dist_es$29 = __esmMin((() => {
	init_Uint8ArrayBlobAdapter();
	init_ChecksumStream();
	init_createChecksumStream();
	init_createBufferedReadable();
	init_getAwsChunkedEncodingStream();
	init_headStream();
	init_sdk_stream_mixin();
	init_splitStream();
	init_stream_type_check();
}));
var require_schema = /* @__PURE__ */ __commonJSMin(((exports) => {
	var protocolHttp = (init_dist_es$41(), __toCommonJS(dist_es_exports$30));
	var utilMiddleware = (init_dist_es$40(), __toCommonJS(dist_es_exports$29));
	var deref = (schemaRef) => {
		if (typeof schemaRef === "function") return schemaRef();
		return schemaRef;
	};
	var operation = (namespace, name, traits, input, output) => ({
		name,
		namespace,
		traits,
		input,
		output
	});
	var schemaDeserializationMiddleware = (config) => (next, context) => async (args) => {
		const { response } = await next(args);
		const { operationSchema } = utilMiddleware.getSmithyContext(context);
		const [, ns, n, t, i, o] = operationSchema ?? [];
		try {
			return {
				response,
				output: await config.protocol.deserializeResponse(operation(ns, n, t, i, o), {
					...config,
					...context
				}, response)
			};
		} catch (error) {
			Object.defineProperty(error, "$response", {
				value: response,
				enumerable: false,
				writable: false,
				configurable: false
			});
			if (!("$metadata" in error)) {
				const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
				try {
					error.message += "\n  " + hint;
				} catch (e) {
					if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") console.warn(hint);
					else context.logger?.warn?.(hint);
				}
				if (typeof error.$responseBodyText !== "undefined") {
					if (error.$response) error.$response.body = error.$responseBodyText;
				}
				try {
					if (protocolHttp.HttpResponse.isInstance(response)) {
						const { headers = {} } = response;
						const headerEntries = Object.entries(headers);
						error.$metadata = {
							httpStatusCode: response.statusCode,
							requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
							extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
							cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
						};
					}
				} catch (e) {}
			}
			throw error;
		}
	};
	var findHeader = (pattern, headers) => {
		return (headers.find(([k]) => {
			return k.match(pattern);
		}) || [void 0, void 0])[1];
	};
	var schemaSerializationMiddleware = (config) => (next, context) => async (args) => {
		const { operationSchema } = utilMiddleware.getSmithyContext(context);
		const [, ns, n, t, i, o] = operationSchema ?? [];
		const endpoint = context.endpointV2?.url && config.urlParser ? async () => config.urlParser(context.endpointV2.url) : config.endpoint;
		const request = await config.protocol.serializeRequest(operation(ns, n, t, i, o), args.input, {
			...config,
			...context,
			endpoint
		});
		return next({
			...args,
			request
		});
	};
	var deserializerMiddlewareOption = {
		name: "deserializerMiddleware",
		step: "deserialize",
		tags: ["DESERIALIZER"],
		override: true
	};
	var serializerMiddlewareOption = {
		name: "serializerMiddleware",
		step: "serialize",
		tags: ["SERIALIZER"],
		override: true
	};
	function getSchemaSerdePlugin(config) {
		return { applyToStack: (commandStack) => {
			commandStack.add(schemaSerializationMiddleware(config), serializerMiddlewareOption);
			commandStack.add(schemaDeserializationMiddleware(config), deserializerMiddlewareOption);
			config.protocol.setSerdeContext(config);
		} };
	}
	var Schema = class {
		name;
		namespace;
		traits;
		static assign(instance, values) {
			return Object.assign(instance, values);
		}
		static [Symbol.hasInstance](lhs) {
			const isPrototype = this.prototype.isPrototypeOf(lhs);
			if (!isPrototype && typeof lhs === "object" && lhs !== null) return lhs.symbol === this.symbol;
			return isPrototype;
		}
		getName() {
			return this.namespace + "#" + this.name;
		}
	};
	var ListSchema = class ListSchema extends Schema {
		static symbol = Symbol.for("@smithy/lis");
		name;
		traits;
		valueSchema;
		symbol = ListSchema.symbol;
	};
	var list = (namespace, name, traits, valueSchema) => Schema.assign(new ListSchema(), {
		name,
		namespace,
		traits,
		valueSchema
	});
	var MapSchema = class MapSchema extends Schema {
		static symbol = Symbol.for("@smithy/map");
		name;
		traits;
		keySchema;
		valueSchema;
		symbol = MapSchema.symbol;
	};
	var map = (namespace, name, traits, keySchema, valueSchema) => Schema.assign(new MapSchema(), {
		name,
		namespace,
		traits,
		keySchema,
		valueSchema
	});
	var OperationSchema = class OperationSchema extends Schema {
		static symbol = Symbol.for("@smithy/ope");
		name;
		traits;
		input;
		output;
		symbol = OperationSchema.symbol;
	};
	var op = (namespace, name, traits, input, output) => Schema.assign(new OperationSchema(), {
		name,
		namespace,
		traits,
		input,
		output
	});
	var StructureSchema = class StructureSchema extends Schema {
		static symbol = Symbol.for("@smithy/str");
		name;
		traits;
		memberNames;
		memberList;
		symbol = StructureSchema.symbol;
	};
	var struct = (namespace, name, traits, memberNames, memberList) => Schema.assign(new StructureSchema(), {
		name,
		namespace,
		traits,
		memberNames,
		memberList
	});
	var ErrorSchema = class ErrorSchema extends StructureSchema {
		static symbol = Symbol.for("@smithy/err");
		ctor;
		symbol = ErrorSchema.symbol;
	};
	var error = (namespace, name, traits, memberNames, memberList, ctor) => Schema.assign(new ErrorSchema(), {
		name,
		namespace,
		traits,
		memberNames,
		memberList,
		ctor: null
	});
	function translateTraits(indicator) {
		if (typeof indicator === "object") return indicator;
		indicator = indicator | 0;
		const traits = {};
		let i = 0;
		for (const trait of [
			"httpLabel",
			"idempotent",
			"idempotencyToken",
			"sensitive",
			"httpPayload",
			"httpResponseCode",
			"httpQueryParams"
		]) if ((indicator >> i++ & 1) === 1) traits[trait] = 1;
		return traits;
	}
	var anno = { it: Symbol.for("@smithy/nor-struct-it") };
	var NormalizedSchema = class NormalizedSchema {
		ref;
		memberName;
		static symbol = Symbol.for("@smithy/nor");
		symbol = NormalizedSchema.symbol;
		name;
		schema;
		_isMemberSchema;
		traits;
		memberTraits;
		normalizedTraits;
		constructor(ref, memberName) {
			this.ref = ref;
			this.memberName = memberName;
			const traitStack = [];
			let _ref = ref;
			let schema = ref;
			this._isMemberSchema = false;
			while (isMemberSchema(_ref)) {
				traitStack.push(_ref[1]);
				_ref = _ref[0];
				schema = deref(_ref);
				this._isMemberSchema = true;
			}
			if (traitStack.length > 0) {
				this.memberTraits = {};
				for (let i = traitStack.length - 1; i >= 0; --i) {
					const traitSet = traitStack[i];
					Object.assign(this.memberTraits, translateTraits(traitSet));
				}
			} else this.memberTraits = 0;
			if (schema instanceof NormalizedSchema) {
				const computedMemberTraits = this.memberTraits;
				Object.assign(this, schema);
				this.memberTraits = Object.assign({}, computedMemberTraits, schema.getMemberTraits(), this.getMemberTraits());
				this.normalizedTraits = void 0;
				this.memberName = memberName ?? schema.memberName;
				return;
			}
			this.schema = deref(schema);
			if (isStaticSchema(this.schema)) {
				this.name = `${this.schema[1]}#${this.schema[2]}`;
				this.traits = this.schema[3];
			} else {
				this.name = this.memberName ?? String(schema);
				this.traits = 0;
			}
			if (this._isMemberSchema && !memberName) throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
		}
		static [Symbol.hasInstance](lhs) {
			const isPrototype = this.prototype.isPrototypeOf(lhs);
			if (!isPrototype && typeof lhs === "object" && lhs !== null) return lhs.symbol === this.symbol;
			return isPrototype;
		}
		static of(ref) {
			const sc = deref(ref);
			if (sc instanceof NormalizedSchema) return sc;
			if (isMemberSchema(sc)) {
				const [ns, traits] = sc;
				if (ns instanceof NormalizedSchema) {
					Object.assign(ns.getMergedTraits(), translateTraits(traits));
					return ns;
				}
				throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(ref, null, 2)}.`);
			}
			return new NormalizedSchema(sc);
		}
		getSchema() {
			const sc = this.schema;
			if (Array.isArray(sc) && sc[0] === 0) return sc[4];
			return sc;
		}
		getName(withNamespace = false) {
			const { name } = this;
			return !withNamespace && name && name.includes("#") ? name.split("#")[1] : name || void 0;
		}
		getMemberName() {
			return this.memberName;
		}
		isMemberSchema() {
			return this._isMemberSchema;
		}
		isListSchema() {
			const sc = this.getSchema();
			return typeof sc === "number" ? sc >= 64 && sc < 128 : sc[0] === 1;
		}
		isMapSchema() {
			const sc = this.getSchema();
			return typeof sc === "number" ? sc >= 128 && sc <= 255 : sc[0] === 2;
		}
		isStructSchema() {
			const sc = this.getSchema();
			if (typeof sc !== "object") return false;
			const id = sc[0];
			return id === 3 || id === -3 || id === 4;
		}
		isUnionSchema() {
			const sc = this.getSchema();
			if (typeof sc !== "object") return false;
			return sc[0] === 4;
		}
		isBlobSchema() {
			const sc = this.getSchema();
			return sc === 21 || sc === 42;
		}
		isTimestampSchema() {
			const sc = this.getSchema();
			return typeof sc === "number" && sc >= 4 && sc <= 7;
		}
		isUnitSchema() {
			return this.getSchema() === "unit";
		}
		isDocumentSchema() {
			return this.getSchema() === 15;
		}
		isStringSchema() {
			return this.getSchema() === 0;
		}
		isBooleanSchema() {
			return this.getSchema() === 2;
		}
		isNumericSchema() {
			return this.getSchema() === 1;
		}
		isBigIntegerSchema() {
			return this.getSchema() === 17;
		}
		isBigDecimalSchema() {
			return this.getSchema() === 19;
		}
		isStreaming() {
			const { streaming } = this.getMergedTraits();
			return !!streaming || this.getSchema() === 42;
		}
		isIdempotencyToken() {
			return !!this.getMergedTraits().idempotencyToken;
		}
		getMergedTraits() {
			return this.normalizedTraits ?? (this.normalizedTraits = {
				...this.getOwnTraits(),
				...this.getMemberTraits()
			});
		}
		getMemberTraits() {
			return translateTraits(this.memberTraits);
		}
		getOwnTraits() {
			return translateTraits(this.traits);
		}
		getKeySchema() {
			const [isDoc, isMap] = [this.isDocumentSchema(), this.isMapSchema()];
			if (!isDoc && !isMap) throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(true)}`);
			const schema = this.getSchema();
			return member([isDoc ? 15 : schema[4] ?? 0, 0], "key");
		}
		getValueSchema() {
			const sc = this.getSchema();
			const [isDoc, isMap, isList] = [
				this.isDocumentSchema(),
				this.isMapSchema(),
				this.isListSchema()
			];
			const memberSchema = typeof sc === "number" ? 63 & sc : sc && typeof sc === "object" && (isMap || isList) ? sc[3 + sc[0]] : isDoc ? 15 : void 0;
			if (memberSchema != null) return member([memberSchema, 0], isMap ? "value" : "member");
			throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
		}
		getMemberSchema(memberName) {
			const struct = this.getSchema();
			if (this.isStructSchema() && struct[4].includes(memberName)) {
				const i = struct[4].indexOf(memberName);
				const memberSchema = struct[5][i];
				return member(isMemberSchema(memberSchema) ? memberSchema : [memberSchema, 0], memberName);
			}
			if (this.isDocumentSchema()) return member([15, 0], memberName);
			throw new Error(`@smithy/core/schema - ${this.getName(true)} has no no member=${memberName}.`);
		}
		getMemberSchemas() {
			const buffer = {};
			try {
				for (const [k, v] of this.structIterator()) buffer[k] = v;
			} catch (ignored) {}
			return buffer;
		}
		getEventStreamMember() {
			if (this.isStructSchema()) {
				for (const [memberName, memberSchema] of this.structIterator()) if (memberSchema.isStreaming() && memberSchema.isStructSchema()) return memberName;
			}
			return "";
		}
		*structIterator() {
			if (this.isUnitSchema()) return;
			if (!this.isStructSchema()) throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
			const struct = this.getSchema();
			const z = struct[4].length;
			let it = struct[anno.it];
			if (it && z === it.length) {
				yield* it;
				return;
			}
			it = Array(z);
			for (let i = 0; i < z; ++i) {
				const k = struct[4][i];
				const v = member([struct[5][i], 0], k);
				yield it[i] = [k, v];
			}
			struct[anno.it] = it;
		}
	};
	function member(memberSchema, memberName) {
		if (memberSchema instanceof NormalizedSchema) return Object.assign(memberSchema, {
			memberName,
			_isMemberSchema: true
		});
		return new NormalizedSchema(memberSchema, memberName);
	}
	var isMemberSchema = (sc) => Array.isArray(sc) && sc.length === 2;
	var isStaticSchema = (sc) => Array.isArray(sc) && sc.length >= 5;
	var SimpleSchema = class SimpleSchema extends Schema {
		static symbol = Symbol.for("@smithy/sim");
		name;
		schemaRef;
		traits;
		symbol = SimpleSchema.symbol;
	};
	var sim = (namespace, name, schemaRef, traits) => Schema.assign(new SimpleSchema(), {
		name,
		namespace,
		traits,
		schemaRef
	});
	var simAdapter = (namespace, name, traits, schemaRef) => Schema.assign(new SimpleSchema(), {
		name,
		namespace,
		traits,
		schemaRef
	});
	var SCHEMA = {
		BLOB: 21,
		STREAMING_BLOB: 42,
		BOOLEAN: 2,
		STRING: 0,
		NUMERIC: 1,
		BIG_INTEGER: 17,
		BIG_DECIMAL: 19,
		DOCUMENT: 15,
		TIMESTAMP_DEFAULT: 4,
		TIMESTAMP_DATE_TIME: 5,
		TIMESTAMP_HTTP_DATE: 6,
		TIMESTAMP_EPOCH_SECONDS: 7,
		LIST_MODIFIER: 64,
		MAP_MODIFIER: 128
	};
	var TypeRegistry = class TypeRegistry {
		namespace;
		schemas;
		exceptions;
		static registries = /* @__PURE__ */ new Map();
		constructor(namespace, schemas = /* @__PURE__ */ new Map(), exceptions = /* @__PURE__ */ new Map()) {
			this.namespace = namespace;
			this.schemas = schemas;
			this.exceptions = exceptions;
		}
		static for(namespace) {
			if (!TypeRegistry.registries.has(namespace)) TypeRegistry.registries.set(namespace, new TypeRegistry(namespace));
			return TypeRegistry.registries.get(namespace);
		}
		copyFrom(other) {
			const { schemas, exceptions } = this;
			for (const [k, v] of other.schemas) if (!schemas.has(k)) schemas.set(k, v);
			for (const [k, v] of other.exceptions) if (!exceptions.has(k)) exceptions.set(k, v);
		}
		register(shapeId, schema) {
			const qualifiedName = this.normalizeShapeId(shapeId);
			for (const r of [this, TypeRegistry.for(qualifiedName.split("#")[0])]) r.schemas.set(qualifiedName, schema);
		}
		getSchema(shapeId) {
			const id = this.normalizeShapeId(shapeId);
			if (!this.schemas.has(id)) throw new Error(`@smithy/core/schema - schema not found for ${id}`);
			return this.schemas.get(id);
		}
		registerError(es, ctor) {
			const $error = es;
			const ns = $error[1];
			for (const r of [this, TypeRegistry.for(ns)]) {
				r.schemas.set(ns + "#" + $error[2], $error);
				r.exceptions.set($error, ctor);
			}
		}
		getErrorCtor(es) {
			const $error = es;
			if (this.exceptions.has($error)) return this.exceptions.get($error);
			return TypeRegistry.for($error[1]).exceptions.get($error);
		}
		getBaseException() {
			for (const exceptionKey of this.exceptions.keys()) if (Array.isArray(exceptionKey)) {
				const [, ns, name] = exceptionKey;
				const id = ns + "#" + name;
				if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) return exceptionKey;
			}
		}
		find(predicate) {
			return [...this.schemas.values()].find(predicate);
		}
		clear() {
			this.schemas.clear();
			this.exceptions.clear();
		}
		normalizeShapeId(shapeId) {
			if (shapeId.includes("#")) return shapeId;
			return this.namespace + "#" + shapeId;
		}
	};
	exports.ErrorSchema = ErrorSchema;
	exports.ListSchema = ListSchema;
	exports.MapSchema = MapSchema;
	exports.NormalizedSchema = NormalizedSchema;
	exports.OperationSchema = OperationSchema;
	exports.SCHEMA = SCHEMA;
	exports.Schema = Schema;
	exports.SimpleSchema = SimpleSchema;
	exports.StructureSchema = StructureSchema;
	exports.TypeRegistry = TypeRegistry;
	exports.deref = deref;
	exports.deserializerMiddlewareOption = deserializerMiddlewareOption;
	exports.error = error;
	exports.getSchemaSerdePlugin = getSchemaSerdePlugin;
	exports.isStaticSchema = isStaticSchema;
	exports.list = list;
	exports.map = map;
	exports.op = op;
	exports.operation = operation;
	exports.serializerMiddlewareOption = serializerMiddlewareOption;
	exports.sim = sim;
	exports.simAdapter = simAdapter;
	exports.struct = struct;
	exports.translateTraits = translateTraits;
}));
var randomUUID;
var init_randomUUID = __esmMin((() => {
	randomUUID = crypto$1.randomUUID.bind(crypto$1);
}));
var decimalToHex, v4;
var init_v4 = __esmMin((() => {
	init_randomUUID();
	decimalToHex = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
	v4 = () => {
		if (randomUUID) return randomUUID();
		const rnds = new Uint8Array(16);
		crypto.getRandomValues(rnds);
		rnds[6] = rnds[6] & 15 | 64;
		rnds[8] = rnds[8] & 63 | 128;
		return decimalToHex[rnds[0]] + decimalToHex[rnds[1]] + decimalToHex[rnds[2]] + decimalToHex[rnds[3]] + "-" + decimalToHex[rnds[4]] + decimalToHex[rnds[5]] + "-" + decimalToHex[rnds[6]] + decimalToHex[rnds[7]] + "-" + decimalToHex[rnds[8]] + decimalToHex[rnds[9]] + "-" + decimalToHex[rnds[10]] + decimalToHex[rnds[11]] + decimalToHex[rnds[12]] + decimalToHex[rnds[13]] + decimalToHex[rnds[14]] + decimalToHex[rnds[15]];
	};
}));
var dist_es_exports$23 = /* @__PURE__ */ __exportAll({ v4: () => v4 });
var init_dist_es$28 = __esmMin((() => {
	init_v4();
}));
var require_serde = /* @__PURE__ */ __commonJSMin(((exports) => {
	var uuid = (init_dist_es$28(), __toCommonJS(dist_es_exports$23));
	var copyDocumentWithTransform = (source, schemaRef, transform = (_) => _) => source;
	var parseBoolean = (value) => {
		switch (value) {
			case "true": return true;
			case "false": return false;
			default: throw new Error(`Unable to parse boolean value "${value}"`);
		}
	};
	var expectBoolean = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "number") {
			if (value === 0 || value === 1) logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
			if (value === 0) return false;
			if (value === 1) return true;
		}
		if (typeof value === "string") {
			const lower = value.toLowerCase();
			if (lower === "false" || lower === "true") logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
			if (lower === "false") return false;
			if (lower === "true") return true;
		}
		if (typeof value === "boolean") return value;
		throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
	};
	var expectNumber = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "string") {
			const parsed = parseFloat(value);
			if (!Number.isNaN(parsed)) {
				if (String(parsed) !== String(value)) logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
				return parsed;
			}
		}
		if (typeof value === "number") return value;
		throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
	};
	var MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
	var expectFloat32 = (value) => {
		const expected = expectNumber(value);
		if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
			if (Math.abs(expected) > MAX_FLOAT) throw new TypeError(`Expected 32-bit float, got ${value}`);
		}
		return expected;
	};
	var expectLong = (value) => {
		if (value === null || value === void 0) return;
		if (Number.isInteger(value) && !Number.isNaN(value)) return value;
		throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
	};
	var expectInt = expectLong;
	var expectInt32 = (value) => expectSizedInt(value, 32);
	var expectShort = (value) => expectSizedInt(value, 16);
	var expectByte = (value) => expectSizedInt(value, 8);
	var expectSizedInt = (value, size) => {
		const expected = expectLong(value);
		if (expected !== void 0 && castInt(expected, size) !== expected) throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
		return expected;
	};
	var castInt = (value, size) => {
		switch (size) {
			case 32: return Int32Array.of(value)[0];
			case 16: return Int16Array.of(value)[0];
			case 8: return Int8Array.of(value)[0];
		}
	};
	var expectNonNull = (value, location) => {
		if (value === null || value === void 0) {
			if (location) throw new TypeError(`Expected a non-null value for ${location}`);
			throw new TypeError("Expected a non-null value");
		}
		return value;
	};
	var expectObject = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "object" && !Array.isArray(value)) return value;
		const receivedType = Array.isArray(value) ? "array" : typeof value;
		throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
	};
	var expectString = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value === "string") return value;
		if ([
			"boolean",
			"number",
			"bigint"
		].includes(typeof value)) {
			logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
			return String(value);
		}
		throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
	};
	var expectUnion = (value) => {
		if (value === null || value === void 0) return;
		const asObject = expectObject(value);
		const setKeys = Object.entries(asObject).filter(([, v]) => v != null).map(([k]) => k);
		if (setKeys.length === 0) throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
		if (setKeys.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
		return asObject;
	};
	var strictParseDouble = (value) => {
		if (typeof value == "string") return expectNumber(parseNumber(value));
		return expectNumber(value);
	};
	var strictParseFloat = strictParseDouble;
	var strictParseFloat32 = (value) => {
		if (typeof value == "string") return expectFloat32(parseNumber(value));
		return expectFloat32(value);
	};
	var NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
	var parseNumber = (value) => {
		const matches = value.match(NUMBER_REGEX);
		if (matches === null || matches[0].length !== value.length) throw new TypeError(`Expected real number, got implicit NaN`);
		return parseFloat(value);
	};
	var limitedParseDouble = (value) => {
		if (typeof value == "string") return parseFloatString(value);
		return expectNumber(value);
	};
	var handleFloat = limitedParseDouble;
	var limitedParseFloat = limitedParseDouble;
	var limitedParseFloat32 = (value) => {
		if (typeof value == "string") return parseFloatString(value);
		return expectFloat32(value);
	};
	var parseFloatString = (value) => {
		switch (value) {
			case "NaN": return NaN;
			case "Infinity": return Infinity;
			case "-Infinity": return -Infinity;
			default: throw new Error(`Unable to parse float value: ${value}`);
		}
	};
	var strictParseLong = (value) => {
		if (typeof value === "string") return expectLong(parseNumber(value));
		return expectLong(value);
	};
	var strictParseInt = strictParseLong;
	var strictParseInt32 = (value) => {
		if (typeof value === "string") return expectInt32(parseNumber(value));
		return expectInt32(value);
	};
	var strictParseShort = (value) => {
		if (typeof value === "string") return expectShort(parseNumber(value));
		return expectShort(value);
	};
	var strictParseByte = (value) => {
		if (typeof value === "string") return expectByte(parseNumber(value));
		return expectByte(value);
	};
	var stackTraceWarning = (message) => {
		return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s) => !s.includes("stackTraceWarning")).join("\n");
	};
	var logger = { warn: console.warn };
	var DAYS = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	];
	var MONTHS = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	function dateToUtcString(date) {
		const year = date.getUTCFullYear();
		const month = date.getUTCMonth();
		const dayOfWeek = date.getUTCDay();
		const dayOfMonthInt = date.getUTCDate();
		const hoursInt = date.getUTCHours();
		const minutesInt = date.getUTCMinutes();
		const secondsInt = date.getUTCSeconds();
		const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
		const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
		const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
		const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
		return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
	}
	var RFC3339 = /* @__PURE__ */ new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
	var parseRfc3339DateTime = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
		const match = RFC3339.exec(value);
		if (!match) throw new TypeError("Invalid RFC-3339 date-time value");
		const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
		return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseDateValue(monthStr, "month", 1, 12), parseDateValue(dayStr, "day", 1, 31), {
			hours,
			minutes,
			seconds,
			fractionalMilliseconds
		});
	};
	var RFC3339_WITH_OFFSET$1 = /* @__PURE__ */ new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
	var parseRfc3339DateTimeWithOffset = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
		const match = RFC3339_WITH_OFFSET$1.exec(value);
		if (!match) throw new TypeError("Invalid RFC-3339 date-time value");
		const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
		const date = buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseDateValue(monthStr, "month", 1, 12), parseDateValue(dayStr, "day", 1, 31), {
			hours,
			minutes,
			seconds,
			fractionalMilliseconds
		});
		if (offsetStr.toUpperCase() != "Z") date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
		return date;
	};
	var IMF_FIXDATE$1 = /* @__PURE__ */ new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
	var RFC_850_DATE$1 = /* @__PURE__ */ new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
	var ASC_TIME$1 = /* @__PURE__ */ new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
	var parseRfc7231DateTime = (value) => {
		if (value === null || value === void 0) return;
		if (typeof value !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
		let match = IMF_FIXDATE$1.exec(value);
		if (match) {
			const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
			return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
				hours,
				minutes,
				seconds,
				fractionalMilliseconds
			});
		}
		match = RFC_850_DATE$1.exec(value);
		if (match) {
			const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
			return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
				hours,
				minutes,
				seconds,
				fractionalMilliseconds
			}));
		}
		match = ASC_TIME$1.exec(value);
		if (match) {
			const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
			return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), {
				hours,
				minutes,
				seconds,
				fractionalMilliseconds
			});
		}
		throw new TypeError("Invalid RFC-7231 date-time value");
	};
	var parseEpochTimestamp = (value) => {
		if (value === null || value === void 0) return;
		let valueAsDouble;
		if (typeof value === "number") valueAsDouble = value;
		else if (typeof value === "string") valueAsDouble = strictParseDouble(value);
		else if (typeof value === "object" && value.tag === 1) valueAsDouble = value.value;
		else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
		if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
		return new Date(Math.round(valueAsDouble * 1e3));
	};
	var buildDate = (year, month, day, time) => {
		const adjustedMonth = month - 1;
		validateDayOfMonth(year, adjustedMonth, day);
		return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
	};
	var parseTwoDigitYear = (value) => {
		const thisYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
		const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
		if (valueInThisCentury < thisYear) return valueInThisCentury + 100;
		return valueInThisCentury;
	};
	var FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
	var adjustRfc850Year = (input) => {
		if (input.getTime() - (/* @__PURE__ */ new Date()).getTime() > FIFTY_YEARS_IN_MILLIS) return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
		return input;
	};
	var parseMonthByShortName = (value) => {
		const monthIdx = MONTHS.indexOf(value);
		if (monthIdx < 0) throw new TypeError(`Invalid month: ${value}`);
		return monthIdx + 1;
	};
	var DAYS_IN_MONTH = [
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	var validateDayOfMonth = (year, month, day) => {
		let maxDays = DAYS_IN_MONTH[month];
		if (month === 1 && isLeapYear(year)) maxDays = 29;
		if (day > maxDays) throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
	};
	var isLeapYear = (year) => {
		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	};
	var parseDateValue = (value, type, lower, upper) => {
		const dateVal = strictParseByte(stripLeadingZeroes(value));
		if (dateVal < lower || dateVal > upper) throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
		return dateVal;
	};
	var parseMilliseconds = (value) => {
		if (value === null || value === void 0) return 0;
		return strictParseFloat32("0." + value) * 1e3;
	};
	var parseOffsetToMilliseconds = (value) => {
		const directionStr = value[0];
		let direction = 1;
		if (directionStr == "+") direction = 1;
		else if (directionStr == "-") direction = -1;
		else throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
		const hour = Number(value.substring(1, 3));
		const minute = Number(value.substring(4, 6));
		return direction * (hour * 60 + minute) * 60 * 1e3;
	};
	var stripLeadingZeroes = (value) => {
		let idx = 0;
		while (idx < value.length - 1 && value.charAt(idx) === "0") idx++;
		if (idx === 0) return value;
		return value.slice(idx);
	};
	var LazyJsonString = function LazyJsonString(val) {
		return Object.assign(new String(val), {
			deserializeJSON() {
				return JSON.parse(String(val));
			},
			toString() {
				return String(val);
			},
			toJSON() {
				return String(val);
			}
		});
	};
	LazyJsonString.from = (object) => {
		if (object && typeof object === "object" && (object instanceof LazyJsonString || "deserializeJSON" in object)) return object;
		else if (typeof object === "string" || Object.getPrototypeOf(object) === String.prototype) return LazyJsonString(String(object));
		return LazyJsonString(JSON.stringify(object));
	};
	LazyJsonString.fromObject = LazyJsonString.from;
	function quoteHeader(part) {
		if (part.includes(",") || part.includes("\"")) part = `"${part.replace(/"/g, "\\\"")}"`;
		return part;
	}
	var ddd = `(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:[ne|u?r]?s?day)?`;
	var mmm = `(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)`;
	var time = `(\\d?\\d):(\\d{2}):(\\d{2})(?:\\.(\\d+))?`;
	var date = `(\\d?\\d)`;
	var year = `(\\d{4})`;
	var RFC3339_WITH_OFFSET = /* @__PURE__ */ new RegExp(/^(\d{4})-(\d\d)-(\d\d)[tT](\d\d):(\d\d):(\d\d)(\.(\d+))?(([-+]\d\d:\d\d)|[zZ])$/);
	var IMF_FIXDATE = new RegExp(`^${ddd}, ${date} ${mmm} ${year} ${time} GMT$`);
	var RFC_850_DATE = new RegExp(`^${ddd}, ${date}-${mmm}-(\\d\\d) ${time} GMT$`);
	var ASC_TIME = new RegExp(`^${ddd} ${mmm} ( [1-9]|\\d\\d) ${time} ${year}$`);
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	var _parseEpochTimestamp = (value) => {
		if (value == null) return;
		let num = NaN;
		if (typeof value === "number") num = value;
		else if (typeof value === "string") {
			if (!/^-?\d*\.?\d+$/.test(value)) throw new TypeError(`parseEpochTimestamp - numeric string invalid.`);
			num = Number.parseFloat(value);
		} else if (typeof value === "object" && value.tag === 1) num = value.value;
		if (isNaN(num) || Math.abs(num) === Infinity) throw new TypeError("Epoch timestamps must be valid finite numbers.");
		return new Date(Math.round(num * 1e3));
	};
	var _parseRfc3339DateTimeWithOffset = (value) => {
		if (value == null) return;
		if (typeof value !== "string") throw new TypeError("RFC3339 timestamps must be strings");
		const matches = RFC3339_WITH_OFFSET.exec(value);
		if (!matches) throw new TypeError(`Invalid RFC3339 timestamp format ${value}`);
		const [, yearStr, monthStr, dayStr, hours, minutes, seconds, , ms, offsetStr] = matches;
		range(monthStr, 1, 12);
		range(dayStr, 1, 31);
		range(hours, 0, 23);
		range(minutes, 0, 59);
		range(seconds, 0, 60);
		const date = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr), Number(hours), Number(minutes), Number(seconds), Number(ms) ? Math.round(parseFloat(`0.${ms}`) * 1e3) : 0));
		date.setUTCFullYear(Number(yearStr));
		if (offsetStr.toUpperCase() != "Z") {
			const [, sign, offsetH, offsetM] = /([+-])(\d\d):(\d\d)/.exec(offsetStr) || [
				void 0,
				"+",
				0,
				0
			];
			const scalar = sign === "-" ? 1 : -1;
			date.setTime(date.getTime() + scalar * (Number(offsetH) * 60 * 60 * 1e3 + Number(offsetM) * 60 * 1e3));
		}
		return date;
	};
	var _parseRfc7231DateTime = (value) => {
		if (value == null) return;
		if (typeof value !== "string") throw new TypeError("RFC7231 timestamps must be strings.");
		let day;
		let month;
		let year;
		let hour;
		let minute;
		let second;
		let fraction;
		let matches;
		if (matches = IMF_FIXDATE.exec(value)) [, day, month, year, hour, minute, second, fraction] = matches;
		else if (matches = RFC_850_DATE.exec(value)) {
			[, day, month, year, hour, minute, second, fraction] = matches;
			year = (Number(year) + 1900).toString();
		} else if (matches = ASC_TIME.exec(value)) [, month, day, hour, minute, second, fraction, year] = matches;
		if (year && second) {
			const timestamp = Date.UTC(Number(year), months.indexOf(month), Number(day), Number(hour), Number(minute), Number(second), fraction ? Math.round(parseFloat(`0.${fraction}`) * 1e3) : 0);
			range(day, 1, 31);
			range(hour, 0, 23);
			range(minute, 0, 59);
			range(second, 0, 60);
			const date = new Date(timestamp);
			date.setUTCFullYear(Number(year));
			return date;
		}
		throw new TypeError(`Invalid RFC7231 date-time value ${value}.`);
	};
	function range(v, min, max) {
		const _v = Number(v);
		if (_v < min || _v > max) throw new Error(`Value ${_v} out of range [${min}, ${max}]`);
	}
	function splitEvery(value, delimiter, numDelimiters) {
		if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
		const segments = value.split(delimiter);
		if (numDelimiters === 1) return segments;
		const compoundSegments = [];
		let currentSegment = "";
		for (let i = 0; i < segments.length; i++) {
			if (currentSegment === "") currentSegment = segments[i];
			else currentSegment += delimiter + segments[i];
			if ((i + 1) % numDelimiters === 0) {
				compoundSegments.push(currentSegment);
				currentSegment = "";
			}
		}
		if (currentSegment !== "") compoundSegments.push(currentSegment);
		return compoundSegments;
	}
	var splitHeader = (value) => {
		const z = value.length;
		const values = [];
		let withinQuotes = false;
		let prevChar = void 0;
		let anchor = 0;
		for (let i = 0; i < z; ++i) {
			const char = value[i];
			switch (char) {
				case `"`:
					if (prevChar !== "\\") withinQuotes = !withinQuotes;
					break;
				case ",":
					if (!withinQuotes) {
						values.push(value.slice(anchor, i));
						anchor = i + 1;
					}
					break;
			}
			prevChar = char;
		}
		values.push(value.slice(anchor));
		return values.map((v) => {
			v = v.trim();
			const z = v.length;
			if (z < 2) return v;
			if (v[0] === `"` && v[z - 1] === `"`) v = v.slice(1, z - 1);
			return v.replace(/\\"/g, "\"");
		});
	};
	var format = /^-?\d*(\.\d+)?$/;
	var NumericValue = class NumericValue {
		string;
		type;
		constructor(string, type) {
			this.string = string;
			this.type = type;
			if (!format.test(string)) throw new Error(`@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".`);
		}
		toString() {
			return this.string;
		}
		static [Symbol.hasInstance](object) {
			if (!object || typeof object !== "object") return false;
			const _nv = object;
			return NumericValue.prototype.isPrototypeOf(object) || _nv.type === "bigDecimal" && format.test(_nv.string);
		}
	};
	function nv(input) {
		return new NumericValue(String(input), "bigDecimal");
	}
	Object.defineProperty(exports, "generateIdempotencyToken", {
		enumerable: true,
		get: function() {
			return uuid.v4;
		}
	});
	exports.LazyJsonString = LazyJsonString;
	exports.NumericValue = NumericValue;
	exports._parseEpochTimestamp = _parseEpochTimestamp;
	exports._parseRfc3339DateTimeWithOffset = _parseRfc3339DateTimeWithOffset;
	exports._parseRfc7231DateTime = _parseRfc7231DateTime;
	exports.copyDocumentWithTransform = copyDocumentWithTransform;
	exports.dateToUtcString = dateToUtcString;
	exports.expectBoolean = expectBoolean;
	exports.expectByte = expectByte;
	exports.expectFloat32 = expectFloat32;
	exports.expectInt = expectInt;
	exports.expectInt32 = expectInt32;
	exports.expectLong = expectLong;
	exports.expectNonNull = expectNonNull;
	exports.expectNumber = expectNumber;
	exports.expectObject = expectObject;
	exports.expectShort = expectShort;
	exports.expectString = expectString;
	exports.expectUnion = expectUnion;
	exports.handleFloat = handleFloat;
	exports.limitedParseDouble = limitedParseDouble;
	exports.limitedParseFloat = limitedParseFloat;
	exports.limitedParseFloat32 = limitedParseFloat32;
	exports.logger = logger;
	exports.nv = nv;
	exports.parseBoolean = parseBoolean;
	exports.parseEpochTimestamp = parseEpochTimestamp;
	exports.parseRfc3339DateTime = parseRfc3339DateTime;
	exports.parseRfc3339DateTimeWithOffset = parseRfc3339DateTimeWithOffset;
	exports.parseRfc7231DateTime = parseRfc7231DateTime;
	exports.quoteHeader = quoteHeader;
	exports.splitEvery = splitEvery;
	exports.splitHeader = splitHeader;
	exports.strictParseByte = strictParseByte;
	exports.strictParseDouble = strictParseDouble;
	exports.strictParseFloat = strictParseFloat;
	exports.strictParseFloat32 = strictParseFloat32;
	exports.strictParseInt = strictParseInt;
	exports.strictParseInt32 = strictParseInt32;
	exports.strictParseLong = strictParseLong;
	exports.strictParseShort = strictParseShort;
}));
var require_protocols$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var utilStream = (init_dist_es$29(), __toCommonJS(dist_es_exports$24));
	var schema = require_schema();
	var serde = require_serde();
	var protocolHttp = (init_dist_es$41(), __toCommonJS(dist_es_exports$30));
	var utilBase64 = (init_dist_es$35(), __toCommonJS(dist_es_exports$26));
	var utilUtf8 = (init_dist_es$36(), __toCommonJS(dist_es_exports$27));
	var collectBody = async (streamBody = new Uint8Array(), context) => {
		if (streamBody instanceof Uint8Array) return utilStream.Uint8ArrayBlobAdapter.mutate(streamBody);
		if (!streamBody) return utilStream.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
		const fromContext = context.streamCollector(streamBody);
		return utilStream.Uint8ArrayBlobAdapter.mutate(await fromContext);
	};
	function extendedEncodeURIComponent(str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
			return "%" + c.charCodeAt(0).toString(16).toUpperCase();
		});
	}
	var SerdeContext = class {
		serdeContext;
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
		}
	};
	var HttpProtocol = class extends SerdeContext {
		options;
		compositeErrorRegistry;
		constructor(options) {
			super();
			this.options = options;
			this.compositeErrorRegistry = schema.TypeRegistry.for(options.defaultNamespace);
			for (const etr of options.errorTypeRegistries ?? []) this.compositeErrorRegistry.copyFrom(etr);
		}
		getRequestType() {
			return protocolHttp.HttpRequest;
		}
		getResponseType() {
			return protocolHttp.HttpResponse;
		}
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
			this.serializer.setSerdeContext(serdeContext);
			this.deserializer.setSerdeContext(serdeContext);
			if (this.getPayloadCodec()) this.getPayloadCodec().setSerdeContext(serdeContext);
		}
		updateServiceEndpoint(request, endpoint) {
			if ("url" in endpoint) {
				request.protocol = endpoint.url.protocol;
				request.hostname = endpoint.url.hostname;
				request.port = endpoint.url.port ? Number(endpoint.url.port) : void 0;
				request.path = endpoint.url.pathname;
				request.fragment = endpoint.url.hash || void 0;
				request.username = endpoint.url.username || void 0;
				request.password = endpoint.url.password || void 0;
				if (!request.query) request.query = {};
				for (const [k, v] of endpoint.url.searchParams.entries()) request.query[k] = v;
				return request;
			} else {
				request.protocol = endpoint.protocol;
				request.hostname = endpoint.hostname;
				request.port = endpoint.port ? Number(endpoint.port) : void 0;
				request.path = endpoint.path;
				request.query = { ...endpoint.query };
				return request;
			}
		}
		setHostPrefix(request, operationSchema, input) {
			if (this.serdeContext?.disableHostPrefix) return;
			const inputNs = schema.NormalizedSchema.of(operationSchema.input);
			const opTraits = schema.translateTraits(operationSchema.traits ?? {});
			if (opTraits.endpoint) {
				let hostPrefix = opTraits.endpoint?.[0];
				if (typeof hostPrefix === "string") {
					const hostLabelInputs = [...inputNs.structIterator()].filter(([, member]) => member.getMergedTraits().hostLabel);
					for (const [name] of hostLabelInputs) {
						const replacement = input[name];
						if (typeof replacement !== "string") throw new Error(`@smithy/core/schema - ${name} in input must be a string as hostLabel.`);
						hostPrefix = hostPrefix.replace(`{${name}}`, replacement);
					}
					request.hostname = hostPrefix + request.hostname;
				}
			}
		}
		deserializeMetadata(output) {
			return {
				httpStatusCode: output.statusCode,
				requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
				extendedRequestId: output.headers["x-amz-id-2"],
				cfId: output.headers["x-amz-cf-id"]
			};
		}
		async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
			return (await this.loadEventStreamCapability()).serializeEventStream({
				eventStream,
				requestSchema,
				initialRequest
			});
		}
		async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
			return (await this.loadEventStreamCapability()).deserializeEventStream({
				response,
				responseSchema,
				initialResponseContainer
			});
		}
		async loadEventStreamCapability() {
			const { EventStreamSerde } = await import("../_16.mjs").then((m) => /* @__PURE__ */ __toESM(m.default));
			return new EventStreamSerde({
				marshaller: this.getEventStreamMarshaller(),
				serializer: this.serializer,
				deserializer: this.deserializer,
				serdeContext: this.serdeContext,
				defaultContentType: this.getDefaultContentType()
			});
		}
		getDefaultContentType() {
			throw new Error(`@smithy/core/protocols - ${this.constructor.name} getDefaultContentType() implementation missing.`);
		}
		async deserializeHttpMessage(schema, context, response, arg4, arg5) {
			return [];
		}
		getEventStreamMarshaller() {
			const context = this.serdeContext;
			if (!context.eventStreamMarshaller) throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
			return context.eventStreamMarshaller;
		}
	};
	var HttpBindingProtocol = class extends HttpProtocol {
		async serializeRequest(operationSchema, _input, context) {
			const input = { ..._input ?? {} };
			const serializer = this.serializer;
			const query = {};
			const headers = {};
			const endpoint = await context.endpoint();
			const ns = schema.NormalizedSchema.of(operationSchema?.input);
			const schema$1 = ns.getSchema();
			let hasNonHttpBindingMember = false;
			let payload;
			const request = new protocolHttp.HttpRequest({
				protocol: "",
				hostname: "",
				port: void 0,
				path: "",
				fragment: void 0,
				query,
				headers,
				body: void 0
			});
			if (endpoint) {
				this.updateServiceEndpoint(request, endpoint);
				this.setHostPrefix(request, operationSchema, input);
				const opTraits = schema.translateTraits(operationSchema.traits);
				if (opTraits.http) {
					request.method = opTraits.http[0];
					const [path, search] = opTraits.http[1].split("?");
					if (request.path == "/") request.path = path;
					else request.path += path;
					const traitSearchParams = new URLSearchParams(search ?? "");
					Object.assign(query, Object.fromEntries(traitSearchParams));
				}
			}
			for (const [memberName, memberNs] of ns.structIterator()) {
				const memberTraits = memberNs.getMergedTraits() ?? {};
				const inputMemberValue = input[memberName];
				if (inputMemberValue == null && !memberNs.isIdempotencyToken()) {
					if (memberTraits.httpLabel) {
						if (request.path.includes(`{${memberName}+}`) || request.path.includes(`{${memberName}}`)) throw new Error(`No value provided for input HTTP label: ${memberName}.`);
					}
					continue;
				}
				if (memberTraits.httpPayload) {
					if (memberNs.isStreaming()) if (memberNs.isStructSchema()) {
						if (input[memberName]) payload = await this.serializeEventStream({
							eventStream: input[memberName],
							requestSchema: ns
						});
					} else payload = inputMemberValue;
					else {
						serializer.write(memberNs, inputMemberValue);
						payload = serializer.flush();
					}
					delete input[memberName];
				} else if (memberTraits.httpLabel) {
					serializer.write(memberNs, inputMemberValue);
					const replacement = serializer.flush();
					if (request.path.includes(`{${memberName}+}`)) request.path = request.path.replace(`{${memberName}+}`, replacement.split("/").map(extendedEncodeURIComponent).join("/"));
					else if (request.path.includes(`{${memberName}}`)) request.path = request.path.replace(`{${memberName}}`, extendedEncodeURIComponent(replacement));
					delete input[memberName];
				} else if (memberTraits.httpHeader) {
					serializer.write(memberNs, inputMemberValue);
					headers[memberTraits.httpHeader.toLowerCase()] = String(serializer.flush());
					delete input[memberName];
				} else if (typeof memberTraits.httpPrefixHeaders === "string") {
					for (const [key, val] of Object.entries(inputMemberValue)) {
						const amalgam = memberTraits.httpPrefixHeaders + key;
						serializer.write([memberNs.getValueSchema(), { httpHeader: amalgam }], val);
						headers[amalgam.toLowerCase()] = serializer.flush();
					}
					delete input[memberName];
				} else if (memberTraits.httpQuery || memberTraits.httpQueryParams) {
					this.serializeQuery(memberNs, inputMemberValue, query);
					delete input[memberName];
				} else hasNonHttpBindingMember = true;
			}
			if (hasNonHttpBindingMember && input) {
				serializer.write(schema$1, input);
				payload = serializer.flush();
			}
			request.headers = headers;
			request.query = query;
			request.body = payload;
			return request;
		}
		serializeQuery(ns, data, query) {
			const serializer = this.serializer;
			const traits = ns.getMergedTraits();
			if (traits.httpQueryParams) {
				for (const [key, val] of Object.entries(data)) if (!(key in query)) {
					const valueSchema = ns.getValueSchema();
					Object.assign(valueSchema.getMergedTraits(), {
						...traits,
						httpQuery: key,
						httpQueryParams: void 0
					});
					this.serializeQuery(valueSchema, val, query);
				}
				return;
			}
			if (ns.isListSchema()) {
				const sparse = !!ns.getMergedTraits().sparse;
				const buffer = [];
				for (const item of data) {
					serializer.write([ns.getValueSchema(), traits], item);
					const serializable = serializer.flush();
					if (sparse || serializable !== void 0) buffer.push(serializable);
				}
				query[traits.httpQuery] = buffer;
			} else {
				serializer.write([ns, traits], data);
				query[traits.httpQuery] = serializer.flush();
			}
		}
		async deserializeResponse(operationSchema, context, response) {
			const deserializer = this.deserializer;
			const ns = schema.NormalizedSchema.of(operationSchema.output);
			const dataObject = {};
			if (response.statusCode >= 300) {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(15, bytes));
				await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
				throw new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.");
			}
			for (const header in response.headers) {
				const value = response.headers[header];
				delete response.headers[header];
				response.headers[header.toLowerCase()] = value;
			}
			const nonHttpBindingMembers = await this.deserializeHttpMessage(ns, context, response, dataObject);
			if (nonHttpBindingMembers.length) {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) {
					const dataFromBody = await deserializer.read(ns, bytes);
					for (const member of nonHttpBindingMembers) dataObject[member] = dataFromBody[member];
				}
			} else if (nonHttpBindingMembers.discardResponseBody) await collectBody(response.body, context);
			dataObject.$metadata = this.deserializeMetadata(response);
			return dataObject;
		}
		async deserializeHttpMessage(schema$1, context, response, arg4, arg5) {
			let dataObject;
			if (arg4 instanceof Set) dataObject = arg5;
			else dataObject = arg4;
			let discardResponseBody = true;
			const deserializer = this.deserializer;
			const ns = schema.NormalizedSchema.of(schema$1);
			const nonHttpBindingMembers = [];
			for (const [memberName, memberSchema] of ns.structIterator()) {
				const memberTraits = memberSchema.getMemberTraits();
				if (memberTraits.httpPayload) {
					discardResponseBody = false;
					if (memberSchema.isStreaming()) if (memberSchema.isStructSchema()) dataObject[memberName] = await this.deserializeEventStream({
						response,
						responseSchema: ns
					});
					else dataObject[memberName] = utilStream.sdkStreamMixin(response.body);
					else if (response.body) {
						const bytes = await collectBody(response.body, context);
						if (bytes.byteLength > 0) dataObject[memberName] = await deserializer.read(memberSchema, bytes);
					}
				} else if (memberTraits.httpHeader) {
					const key = String(memberTraits.httpHeader).toLowerCase();
					const value = response.headers[key];
					if (null != value) if (memberSchema.isListSchema()) {
						const headerListValueSchema = memberSchema.getValueSchema();
						headerListValueSchema.getMergedTraits().httpHeader = key;
						let sections;
						if (headerListValueSchema.isTimestampSchema() && headerListValueSchema.getSchema() === 4) sections = serde.splitEvery(value, ",", 2);
						else sections = serde.splitHeader(value);
						const list = [];
						for (const section of sections) list.push(await deserializer.read(headerListValueSchema, section.trim()));
						dataObject[memberName] = list;
					} else dataObject[memberName] = await deserializer.read(memberSchema, value);
				} else if (memberTraits.httpPrefixHeaders !== void 0) {
					dataObject[memberName] = {};
					for (const [header, value] of Object.entries(response.headers)) if (header.startsWith(memberTraits.httpPrefixHeaders)) {
						const valueSchema = memberSchema.getValueSchema();
						valueSchema.getMergedTraits().httpHeader = header;
						dataObject[memberName][header.slice(memberTraits.httpPrefixHeaders.length)] = await deserializer.read(valueSchema, value);
					}
				} else if (memberTraits.httpResponseCode) dataObject[memberName] = response.statusCode;
				else nonHttpBindingMembers.push(memberName);
			}
			nonHttpBindingMembers.discardResponseBody = discardResponseBody;
			return nonHttpBindingMembers;
		}
	};
	var RpcProtocol = class extends HttpProtocol {
		async serializeRequest(operationSchema, input, context) {
			const serializer = this.serializer;
			const query = {};
			const headers = {};
			const endpoint = await context.endpoint();
			const ns = schema.NormalizedSchema.of(operationSchema?.input);
			const schema$1 = ns.getSchema();
			let payload;
			const request = new protocolHttp.HttpRequest({
				protocol: "",
				hostname: "",
				port: void 0,
				path: "/",
				fragment: void 0,
				query,
				headers,
				body: void 0
			});
			if (endpoint) {
				this.updateServiceEndpoint(request, endpoint);
				this.setHostPrefix(request, operationSchema, input);
			}
			const _input = { ...input };
			if (input) {
				const eventStreamMember = ns.getEventStreamMember();
				if (eventStreamMember) {
					if (_input[eventStreamMember]) {
						const initialRequest = {};
						for (const [memberName, memberSchema] of ns.structIterator()) if (memberName !== eventStreamMember && _input[memberName]) {
							serializer.write(memberSchema, _input[memberName]);
							initialRequest[memberName] = serializer.flush();
						}
						payload = await this.serializeEventStream({
							eventStream: _input[eventStreamMember],
							requestSchema: ns,
							initialRequest
						});
					}
				} else {
					serializer.write(schema$1, _input);
					payload = serializer.flush();
				}
			}
			request.headers = headers;
			request.query = query;
			request.body = payload;
			request.method = "POST";
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			const deserializer = this.deserializer;
			const ns = schema.NormalizedSchema.of(operationSchema.output);
			const dataObject = {};
			if (response.statusCode >= 300) {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(15, bytes));
				await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
				throw new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
			}
			for (const header in response.headers) {
				const value = response.headers[header];
				delete response.headers[header];
				response.headers[header.toLowerCase()] = value;
			}
			const eventStreamMember = ns.getEventStreamMember();
			if (eventStreamMember) dataObject[eventStreamMember] = await this.deserializeEventStream({
				response,
				responseSchema: ns,
				initialResponseContainer: dataObject
			});
			else {
				const bytes = await collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(ns, bytes));
			}
			dataObject.$metadata = this.deserializeMetadata(response);
			return dataObject;
		}
	};
	var resolvedPath = (resolvedPath, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
		if (input != null && input[memberName] !== void 0) {
			const labelValue = labelValueProvider();
			if (labelValue.length <= 0) throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
			resolvedPath = resolvedPath.replace(uriLabel, isGreedyLabel ? labelValue.split("/").map((segment) => extendedEncodeURIComponent(segment)).join("/") : extendedEncodeURIComponent(labelValue));
		} else throw new Error("No value provided for input HTTP label: " + memberName + ".");
		return resolvedPath;
	};
	function requestBuilder(input, context) {
		return new RequestBuilder(input, context);
	}
	var RequestBuilder = class {
		input;
		context;
		query = {};
		method = "";
		headers = {};
		path = "";
		body = null;
		hostname = "";
		resolvePathStack = [];
		constructor(input, context) {
			this.input = input;
			this.context = context;
		}
		async build() {
			const { hostname, protocol = "https", port, path: basePath } = await this.context.endpoint();
			this.path = basePath;
			for (const resolvePath of this.resolvePathStack) resolvePath(this.path);
			return new protocolHttp.HttpRequest({
				protocol,
				hostname: this.hostname || hostname,
				port,
				method: this.method,
				path: this.path,
				query: this.query,
				body: this.body,
				headers: this.headers
			});
		}
		hn(hostname) {
			this.hostname = hostname;
			return this;
		}
		bp(uriLabel) {
			this.resolvePathStack.push((basePath) => {
				this.path = `${basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath || ""}` + uriLabel;
			});
			return this;
		}
		p(memberName, labelValueProvider, uriLabel, isGreedyLabel) {
			this.resolvePathStack.push((path) => {
				this.path = resolvedPath(path, this.input, memberName, labelValueProvider, uriLabel, isGreedyLabel);
			});
			return this;
		}
		h(headers) {
			this.headers = headers;
			return this;
		}
		q(query) {
			this.query = query;
			return this;
		}
		b(body) {
			this.body = body;
			return this;
		}
		m(method) {
			this.method = method;
			return this;
		}
	};
	function determineTimestampFormat(ns, settings) {
		if (settings.timestampFormat.useTrait) {
			if (ns.isTimestampSchema() && (ns.getSchema() === 5 || ns.getSchema() === 6 || ns.getSchema() === 7)) return ns.getSchema();
		}
		const { httpLabel, httpPrefixHeaders, httpHeader, httpQuery } = ns.getMergedTraits();
		return (settings.httpBindings ? typeof httpPrefixHeaders === "string" || Boolean(httpHeader) ? 6 : Boolean(httpQuery) || Boolean(httpLabel) ? 5 : void 0 : void 0) ?? settings.timestampFormat.default;
	}
	var FromStringShapeDeserializer = class extends SerdeContext {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		read(_schema, data) {
			const ns = schema.NormalizedSchema.of(_schema);
			if (ns.isListSchema()) return serde.splitHeader(data).map((item) => this.read(ns.getValueSchema(), item));
			if (ns.isBlobSchema()) return (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(data);
			if (ns.isTimestampSchema()) switch (determineTimestampFormat(ns, this.settings)) {
				case 5: return serde._parseRfc3339DateTimeWithOffset(data);
				case 6: return serde._parseRfc7231DateTime(data);
				case 7: return serde._parseEpochTimestamp(data);
				default:
					console.warn("Missing timestamp format, parsing value with Date constructor:", data);
					return new Date(data);
			}
			if (ns.isStringSchema()) {
				const mediaType = ns.getMergedTraits().mediaType;
				let intermediateValue = data;
				if (mediaType) {
					if (ns.getMergedTraits().httpHeader) intermediateValue = this.base64ToUtf8(intermediateValue);
					if (mediaType === "application/json" || mediaType.endsWith("+json")) intermediateValue = serde.LazyJsonString.from(intermediateValue);
					return intermediateValue;
				}
			}
			if (ns.isNumericSchema()) return Number(data);
			if (ns.isBigIntegerSchema()) return BigInt(data);
			if (ns.isBigDecimalSchema()) return new serde.NumericValue(data, "bigDecimal");
			if (ns.isBooleanSchema()) return String(data).toLowerCase() === "true";
			return data;
		}
		base64ToUtf8(base64String) {
			return (this.serdeContext?.utf8Encoder ?? utilUtf8.toUtf8)((this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(base64String));
		}
	};
	var HttpInterceptingShapeDeserializer = class extends SerdeContext {
		codecDeserializer;
		stringDeserializer;
		constructor(codecDeserializer, codecSettings) {
			super();
			this.codecDeserializer = codecDeserializer;
			this.stringDeserializer = new FromStringShapeDeserializer(codecSettings);
		}
		setSerdeContext(serdeContext) {
			this.stringDeserializer.setSerdeContext(serdeContext);
			this.codecDeserializer.setSerdeContext(serdeContext);
			this.serdeContext = serdeContext;
		}
		read(schema$1, data) {
			const ns = schema.NormalizedSchema.of(schema$1);
			const traits = ns.getMergedTraits();
			const toString = this.serdeContext?.utf8Encoder ?? utilUtf8.toUtf8;
			if (traits.httpHeader || traits.httpResponseCode) return this.stringDeserializer.read(ns, toString(data));
			if (traits.httpPayload) {
				if (ns.isBlobSchema()) {
					const toBytes = this.serdeContext?.utf8Decoder ?? utilUtf8.fromUtf8;
					if (typeof data === "string") return toBytes(data);
					return data;
				} else if (ns.isStringSchema()) {
					if ("byteLength" in data) return toString(data);
					return data;
				}
			}
			return this.codecDeserializer.read(ns, data);
		}
	};
	var ToStringShapeSerializer = class extends SerdeContext {
		settings;
		stringBuffer = "";
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema$1, value) {
			const ns = schema.NormalizedSchema.of(schema$1);
			switch (typeof value) {
				case "object":
					if (value === null) {
						this.stringBuffer = "null";
						return;
					}
					if (ns.isTimestampSchema()) {
						if (!(value instanceof Date)) throw new Error(`@smithy/core/protocols - received non-Date value ${value} when schema expected Date in ${ns.getName(true)}`);
						switch (determineTimestampFormat(ns, this.settings)) {
							case 5:
								this.stringBuffer = value.toISOString().replace(".000Z", "Z");
								break;
							case 6:
								this.stringBuffer = serde.dateToUtcString(value);
								break;
							case 7:
								this.stringBuffer = String(value.getTime() / 1e3);
								break;
							default:
								console.warn("Missing timestamp format, using epoch seconds", value);
								this.stringBuffer = String(value.getTime() / 1e3);
						}
						return;
					}
					if (ns.isBlobSchema() && "byteLength" in value) {
						this.stringBuffer = (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
						return;
					}
					if (ns.isListSchema() && Array.isArray(value)) {
						let buffer = "";
						for (const item of value) {
							this.write([ns.getValueSchema(), ns.getMergedTraits()], item);
							const headerItem = this.flush();
							const serialized = ns.getValueSchema().isTimestampSchema() ? headerItem : serde.quoteHeader(headerItem);
							if (buffer !== "") buffer += ", ";
							buffer += serialized;
						}
						this.stringBuffer = buffer;
						return;
					}
					this.stringBuffer = JSON.stringify(value, null, 2);
					break;
				case "string":
					const mediaType = ns.getMergedTraits().mediaType;
					let intermediateValue = value;
					if (mediaType) {
						if (mediaType === "application/json" || mediaType.endsWith("+json")) intermediateValue = serde.LazyJsonString.from(intermediateValue);
						if (ns.getMergedTraits().httpHeader) {
							this.stringBuffer = (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(intermediateValue.toString());
							return;
						}
					}
					this.stringBuffer = value;
					break;
				default: if (ns.isIdempotencyToken()) this.stringBuffer = serde.generateIdempotencyToken();
				else this.stringBuffer = String(value);
			}
		}
		flush() {
			const buffer = this.stringBuffer;
			this.stringBuffer = "";
			return buffer;
		}
	};
	var HttpInterceptingShapeSerializer = class {
		codecSerializer;
		stringSerializer;
		buffer;
		constructor(codecSerializer, codecSettings, stringSerializer = new ToStringShapeSerializer(codecSettings)) {
			this.codecSerializer = codecSerializer;
			this.stringSerializer = stringSerializer;
		}
		setSerdeContext(serdeContext) {
			this.codecSerializer.setSerdeContext(serdeContext);
			this.stringSerializer.setSerdeContext(serdeContext);
		}
		write(schema$1, value) {
			const ns = schema.NormalizedSchema.of(schema$1);
			const traits = ns.getMergedTraits();
			if (traits.httpHeader || traits.httpLabel || traits.httpQuery) {
				this.stringSerializer.write(ns, value);
				this.buffer = this.stringSerializer.flush();
				return;
			}
			return this.codecSerializer.write(ns, value);
		}
		flush() {
			if (this.buffer !== void 0) {
				const buffer = this.buffer;
				this.buffer = void 0;
				return buffer;
			}
			return this.codecSerializer.flush();
		}
	};
	exports.FromStringShapeDeserializer = FromStringShapeDeserializer;
	exports.HttpBindingProtocol = HttpBindingProtocol;
	exports.HttpInterceptingShapeDeserializer = HttpInterceptingShapeDeserializer;
	exports.HttpInterceptingShapeSerializer = HttpInterceptingShapeSerializer;
	exports.HttpProtocol = HttpProtocol;
	exports.RequestBuilder = RequestBuilder;
	exports.RpcProtocol = RpcProtocol;
	exports.SerdeContext = SerdeContext;
	exports.ToStringShapeSerializer = ToStringShapeSerializer;
	exports.collectBody = collectBody;
	exports.determineTimestampFormat = determineTimestampFormat;
	exports.extendedEncodeURIComponent = extendedEncodeURIComponent;
	exports.requestBuilder = requestBuilder;
	exports.resolvedPath = resolvedPath;
}));
var require_dist_cjs$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var types = (init_dist_es$42(), __toCommonJS(dist_es_exports$31));
	var utilMiddleware = (init_dist_es$40(), __toCommonJS(dist_es_exports$29));
	var middlewareSerde = (init_dist_es$39(), __toCommonJS(dist_es_exports$28));
	var protocolHttp = (init_dist_es$41(), __toCommonJS(dist_es_exports$30));
	var protocols = require_protocols$1();
	var getSmithyContext = (context) => context[types.SMITHY_CONTEXT_KEY] || (context[types.SMITHY_CONTEXT_KEY] = {});
	var resolveAuthOptions = (candidateAuthOptions, authSchemePreference) => {
		if (!authSchemePreference || authSchemePreference.length === 0) return candidateAuthOptions;
		const preferredAuthOptions = [];
		for (const preferredSchemeName of authSchemePreference) for (const candidateAuthOption of candidateAuthOptions) if (candidateAuthOption.schemeId.split("#")[1] === preferredSchemeName) preferredAuthOptions.push(candidateAuthOption);
		for (const candidateAuthOption of candidateAuthOptions) if (!preferredAuthOptions.find(({ schemeId }) => schemeId === candidateAuthOption.schemeId)) preferredAuthOptions.push(candidateAuthOption);
		return preferredAuthOptions;
	};
	function convertHttpAuthSchemesToMap(httpAuthSchemes) {
		const map = /* @__PURE__ */ new Map();
		for (const scheme of httpAuthSchemes) map.set(scheme.schemeId, scheme);
		return map;
	}
	var httpAuthSchemeMiddleware = (config, mwOptions) => (next, context) => async (args) => {
		const resolvedOptions = resolveAuthOptions(config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input)), config.authSchemePreference ? await config.authSchemePreference() : []);
		const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
		const smithyContext = utilMiddleware.getSmithyContext(context);
		const failureReasons = [];
		for (const option of resolvedOptions) {
			const scheme = authSchemes.get(option.schemeId);
			if (!scheme) {
				failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
				continue;
			}
			const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
			if (!identityProvider) {
				failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
				continue;
			}
			const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
			option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
			option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
			smithyContext.selectedHttpAuthScheme = {
				httpAuthOption: option,
				identity: await identityProvider(option.identityProperties),
				signer: scheme.signer
			};
			break;
		}
		if (!smithyContext.selectedHttpAuthScheme) throw new Error(failureReasons.join("\n"));
		return next(args);
	};
	var httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
		step: "serialize",
		tags: ["HTTP_AUTH_SCHEME"],
		name: "httpAuthSchemeMiddleware",
		override: true,
		relation: "before",
		toMiddleware: "endpointV2Middleware"
	};
	var getHttpAuthSchemeEndpointRuleSetPlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
			httpAuthSchemeParametersProvider,
			identityProviderConfigProvider
		}), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
	} });
	var httpAuthSchemeMiddlewareOptions = {
		step: "serialize",
		tags: ["HTTP_AUTH_SCHEME"],
		name: "httpAuthSchemeMiddleware",
		override: true,
		relation: "before",
		toMiddleware: middlewareSerde.serializerMiddlewareOption.name
	};
	var getHttpAuthSchemePlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
			httpAuthSchemeParametersProvider,
			identityProviderConfigProvider
		}), httpAuthSchemeMiddlewareOptions);
	} });
	var defaultErrorHandler = (signingProperties) => (error) => {
		throw error;
	};
	var defaultSuccessHandler = (httpResponse, signingProperties) => {};
	var httpSigningMiddleware = (config) => (next, context) => async (args) => {
		if (!protocolHttp.HttpRequest.isInstance(args.request)) return next(args);
		const scheme = utilMiddleware.getSmithyContext(context).selectedHttpAuthScheme;
		if (!scheme) throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
		const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
		const output = await next({
			...args,
			request: await signer.sign(args.request, identity, signingProperties)
		}).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
		(signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
		return output;
	};
	var httpSigningMiddlewareOptions = {
		step: "finalizeRequest",
		tags: ["HTTP_SIGNING"],
		name: "httpSigningMiddleware",
		aliases: [
			"apiKeyMiddleware",
			"tokenMiddleware",
			"awsAuthMiddleware"
		],
		override: true,
		relation: "after",
		toMiddleware: "retryMiddleware"
	};
	var getHttpSigningPlugin = (config) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(httpSigningMiddleware(), httpSigningMiddlewareOptions);
	} });
	var normalizeProvider = (input) => {
		if (typeof input === "function") return input;
		const promisified = Promise.resolve(input);
		return () => promisified;
	};
	var makePagedClientRequest = async (CommandCtor, client, input, withCommand = (_) => _, ...args) => {
		let command = new CommandCtor(input);
		command = withCommand(command) ?? command;
		return await client.send(command, ...args);
	};
	function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
		return async function* paginateOperation(config, input, ...additionalArguments) {
			const _input = input;
			let token = config.startingToken ?? _input[inputTokenName];
			let hasNext = true;
			let page;
			while (hasNext) {
				_input[inputTokenName] = token;
				if (pageSizeTokenName) _input[pageSizeTokenName] = _input[pageSizeTokenName] ?? config.pageSize;
				if (config.client instanceof ClientCtor) page = await makePagedClientRequest(CommandCtor, config.client, input, config.withCommand, ...additionalArguments);
				else throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
				yield page;
				const prevToken = token;
				token = get(page, outputTokenName);
				hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
			}
			return void 0;
		};
	}
	var get = (fromObject, path) => {
		let cursor = fromObject;
		const pathComponents = path.split(".");
		for (const step of pathComponents) {
			if (!cursor || typeof cursor !== "object") return;
			cursor = cursor[step];
		}
		return cursor;
	};
	function setFeature(context, feature, value) {
		if (!context.__smithy_context) context.__smithy_context = { features: {} };
		else if (!context.__smithy_context.features) context.__smithy_context.features = {};
		context.__smithy_context.features[feature] = value;
	}
	var DefaultIdentityProviderConfig = class {
		authSchemes = /* @__PURE__ */ new Map();
		constructor(config) {
			for (const [key, value] of Object.entries(config)) if (value !== void 0) this.authSchemes.set(key, value);
		}
		getIdentityProvider(schemeId) {
			return this.authSchemes.get(schemeId);
		}
	};
	var HttpApiKeyAuthSigner = class {
		async sign(httpRequest, identity, signingProperties) {
			if (!signingProperties) throw new Error("request could not be signed with `apiKey` since the `name` and `in` signer properties are missing");
			if (!signingProperties.name) throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
			if (!signingProperties.in) throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
			if (!identity.apiKey) throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
			const clonedRequest = protocolHttp.HttpRequest.clone(httpRequest);
			if (signingProperties.in === types.HttpApiKeyAuthLocation.QUERY) clonedRequest.query[signingProperties.name] = identity.apiKey;
			else if (signingProperties.in === types.HttpApiKeyAuthLocation.HEADER) clonedRequest.headers[signingProperties.name] = signingProperties.scheme ? `${signingProperties.scheme} ${identity.apiKey}` : identity.apiKey;
			else throw new Error("request can only be signed with `apiKey` locations `query` or `header`, but found: `" + signingProperties.in + "`");
			return clonedRequest;
		}
	};
	var HttpBearerAuthSigner = class {
		async sign(httpRequest, identity, signingProperties) {
			const clonedRequest = protocolHttp.HttpRequest.clone(httpRequest);
			if (!identity.token) throw new Error("request could not be signed with `token` since the `token` is not defined");
			clonedRequest.headers["Authorization"] = `Bearer ${identity.token}`;
			return clonedRequest;
		}
	};
	var NoAuthSigner = class {
		async sign(httpRequest, identity, signingProperties) {
			return httpRequest;
		}
	};
	var createIsIdentityExpiredFunction = (expirationMs) => function isIdentityExpired(identity) {
		return doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
	};
	var EXPIRATION_MS = 3e5;
	var isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
	var doesIdentityRequireRefresh = (identity) => identity.expiration !== void 0;
	var memoizeIdentityProvider = (provider, isExpired, requiresRefresh) => {
		if (provider === void 0) return;
		const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
		let resolved;
		let pending;
		let hasResult;
		let isConstant = false;
		const coalesceProvider = async (options) => {
			if (!pending) pending = normalizedProvider(options);
			try {
				resolved = await pending;
				hasResult = true;
				isConstant = false;
			} finally {
				pending = void 0;
			}
			return resolved;
		};
		if (isExpired === void 0) return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider(options);
			return resolved;
		};
		return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider(options);
			if (isConstant) return resolved;
			if (!requiresRefresh(resolved)) {
				isConstant = true;
				return resolved;
			}
			if (isExpired(resolved)) {
				await coalesceProvider(options);
				return resolved;
			}
			return resolved;
		};
	};
	Object.defineProperty(exports, "requestBuilder", {
		enumerable: true,
		get: function() {
			return protocols.requestBuilder;
		}
	});
	exports.DefaultIdentityProviderConfig = DefaultIdentityProviderConfig;
	exports.EXPIRATION_MS = EXPIRATION_MS;
	exports.HttpApiKeyAuthSigner = HttpApiKeyAuthSigner;
	exports.HttpBearerAuthSigner = HttpBearerAuthSigner;
	exports.NoAuthSigner = NoAuthSigner;
	exports.createIsIdentityExpiredFunction = createIsIdentityExpiredFunction;
	exports.createPaginator = createPaginator;
	exports.doesIdentityRequireRefresh = doesIdentityRequireRefresh;
	exports.getHttpAuthSchemeEndpointRuleSetPlugin = getHttpAuthSchemeEndpointRuleSetPlugin;
	exports.getHttpAuthSchemePlugin = getHttpAuthSchemePlugin;
	exports.getHttpSigningPlugin = getHttpSigningPlugin;
	exports.getSmithyContext = getSmithyContext;
	exports.httpAuthSchemeEndpointRuleSetMiddlewareOptions = httpAuthSchemeEndpointRuleSetMiddlewareOptions;
	exports.httpAuthSchemeMiddleware = httpAuthSchemeMiddleware;
	exports.httpAuthSchemeMiddlewareOptions = httpAuthSchemeMiddlewareOptions;
	exports.httpSigningMiddleware = httpSigningMiddleware;
	exports.httpSigningMiddlewareOptions = httpSigningMiddlewareOptions;
	exports.isIdentityExpired = isIdentityExpired;
	exports.memoizeIdentityProvider = memoizeIdentityProvider;
	exports.normalizeProvider = normalizeProvider;
	exports.setFeature = setFeature;
}));
var ProviderError;
var init_ProviderError = __esmMin((() => {
	ProviderError = class ProviderError extends Error {
		name = "ProviderError";
		tryNextLink;
		constructor(message, options = true) {
			let logger;
			let tryNextLink = true;
			if (typeof options === "boolean") {
				logger = void 0;
				tryNextLink = options;
			} else if (options != null && typeof options === "object") {
				logger = options.logger;
				tryNextLink = options.tryNextLink ?? true;
			}
			super(message);
			this.tryNextLink = tryNextLink;
			Object.setPrototypeOf(this, ProviderError.prototype);
			logger?.debug?.(`@smithy/property-provider ${tryNextLink ? "->" : "(!)"} ${message}`);
		}
		static from(error, options = true) {
			return Object.assign(new this(error.message, options), error);
		}
	};
}));
var CredentialsProviderError;
var init_CredentialsProviderError = __esmMin((() => {
	init_ProviderError();
	CredentialsProviderError = class CredentialsProviderError extends ProviderError {
		name = "CredentialsProviderError";
		constructor(message, options = true) {
			super(message, options);
			Object.setPrototypeOf(this, CredentialsProviderError.prototype);
		}
	};
}));
var TokenProviderError;
var init_TokenProviderError = __esmMin((() => {
	init_ProviderError();
	TokenProviderError = class TokenProviderError extends ProviderError {
		name = "TokenProviderError";
		constructor(message, options = true) {
			super(message, options);
			Object.setPrototypeOf(this, TokenProviderError.prototype);
		}
	};
}));
var chain;
var init_chain = __esmMin((() => {
	init_ProviderError();
	chain = (...providers) => async () => {
		if (providers.length === 0) throw new ProviderError("No providers in chain");
		let lastProviderError;
		for (const provider of providers) try {
			return await provider();
		} catch (err) {
			lastProviderError = err;
			if (err?.tryNextLink) continue;
			throw err;
		}
		throw lastProviderError;
	};
}));
var fromStatic$1;
var init_fromStatic$1 = __esmMin((() => {
	fromStatic$1 = (staticValue) => () => Promise.resolve(staticValue);
}));
var memoize;
var init_memoize = __esmMin((() => {
	memoize = (provider, isExpired, requiresRefresh) => {
		let resolved;
		let pending;
		let hasResult;
		let isConstant = false;
		const coalesceProvider = async () => {
			if (!pending) pending = provider();
			try {
				resolved = await pending;
				hasResult = true;
				isConstant = false;
			} finally {
				pending = void 0;
			}
			return resolved;
		};
		if (isExpired === void 0) return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider();
			return resolved;
		};
		return async (options) => {
			if (!hasResult || options?.forceRefresh) resolved = await coalesceProvider();
			if (isConstant) return resolved;
			if (requiresRefresh && !requiresRefresh(resolved)) {
				isConstant = true;
				return resolved;
			}
			if (isExpired(resolved)) {
				await coalesceProvider();
				return resolved;
			}
			return resolved;
		};
	};
}));
var dist_es_exports$22 = /* @__PURE__ */ __exportAll({
	CredentialsProviderError: () => CredentialsProviderError,
	ProviderError: () => ProviderError,
	TokenProviderError: () => TokenProviderError,
	chain: () => chain,
	fromStatic: () => fromStatic$1,
	memoize: () => memoize
});
var init_dist_es$27 = __esmMin((() => {
	init_CredentialsProviderError();
	init_ProviderError();
	init_TokenProviderError();
	init_chain();
	init_fromStatic$1();
	init_memoize();
}));
var require_client = /* @__PURE__ */ __commonJSMin(((exports) => {
	var state = { warningEmitted: false };
	var emitWarningIfUnsupportedVersion = (version) => {
		if (version && !state.warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 20) {
			state.warningEmitted = true;
			process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js ${version} in January 2026.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/c895JFp`);
		}
	};
	function setCredentialFeature(credentials, feature, value) {
		if (!credentials.$source) credentials.$source = {};
		credentials.$source[feature] = value;
		return credentials;
	}
	function setFeature(context, feature, value) {
		if (!context.__aws_sdk_context) context.__aws_sdk_context = { features: {} };
		else if (!context.__aws_sdk_context.features) context.__aws_sdk_context.features = {};
		context.__aws_sdk_context.features[feature] = value;
	}
	function setTokenFeature(token, feature, value) {
		if (!token.$source) token.$source = {};
		token.$source[feature] = value;
		return token;
	}
	exports.emitWarningIfUnsupportedVersion = emitWarningIfUnsupportedVersion;
	exports.setCredentialFeature = setCredentialFeature;
	exports.setFeature = setFeature;
	exports.setTokenFeature = setTokenFeature;
	exports.state = state;
})), ALGORITHM_QUERY_PARAM, CREDENTIAL_QUERY_PARAM, AMZ_DATE_QUERY_PARAM, SIGNED_HEADERS_QUERY_PARAM, EXPIRES_QUERY_PARAM, SIGNATURE_QUERY_PARAM, TOKEN_QUERY_PARAM, REGION_SET_PARAM, AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER, GENERATED_HEADERS, SIGNATURE_HEADER, SHA256_HEADER, TOKEN_HEADER, HOST_HEADER, ALWAYS_UNSIGNABLE_HEADERS, PROXY_HEADER_PATTERN, SEC_HEADER_PATTERN, UNSIGNABLE_PATTERNS, ALGORITHM_IDENTIFIER, ALGORITHM_IDENTIFIER_V4A, EVENT_ALGORITHM_IDENTIFIER, UNSIGNED_PAYLOAD, KEY_TYPE_IDENTIFIER, MAX_PRESIGNED_TTL;
var init_constants$6 = __esmMin((() => {
	ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
	CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
	AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
	SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
	EXPIRES_QUERY_PARAM = "X-Amz-Expires";
	SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
	TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
	REGION_SET_PARAM = "X-Amz-Region-Set";
	AUTH_HEADER = "authorization";
	AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
	DATE_HEADER = "date";
	GENERATED_HEADERS = [
		AUTH_HEADER,
		AMZ_DATE_HEADER,
		DATE_HEADER
	];
	SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
	SHA256_HEADER = "x-amz-content-sha256";
	TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
	HOST_HEADER = "host";
	ALWAYS_UNSIGNABLE_HEADERS = {
		authorization: true,
		"cache-control": true,
		connection: true,
		expect: true,
		from: true,
		"keep-alive": true,
		"max-forwards": true,
		pragma: true,
		referer: true,
		te: true,
		trailer: true,
		"transfer-encoding": true,
		upgrade: true,
		"user-agent": true,
		"x-amzn-trace-id": true
	};
	PROXY_HEADER_PATTERN = /^proxy-/;
	SEC_HEADER_PATTERN = /^sec-/;
	UNSIGNABLE_PATTERNS = [/^proxy-/i, /^sec-/i];
	ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
	ALGORITHM_IDENTIFIER_V4A = "AWS4-ECDSA-P256-SHA256";
	EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
	UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
	KEY_TYPE_IDENTIFIER = "aws4_request";
	MAX_PRESIGNED_TTL = 3600 * 24 * 7;
}));
var signingKeyCache, cacheQueue, createScope, getSigningKey, clearCredentialCache, hmac;
var init_credentialDerivation = __esmMin((() => {
	init_dist_es$30();
	init_dist_es$36();
	init_constants$6();
	signingKeyCache = {};
	cacheQueue = [];
	createScope = (shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
	getSigningKey = async (sha256Constructor, credentials, shortDate, region, service) => {
		const cacheKey = `${shortDate}:${region}:${service}:${toHex(await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId))}:${credentials.sessionToken}`;
		if (cacheKey in signingKeyCache) return signingKeyCache[cacheKey];
		cacheQueue.push(cacheKey);
		while (cacheQueue.length > 50) delete signingKeyCache[cacheQueue.shift()];
		let key = `AWS4${credentials.secretAccessKey}`;
		for (const signable of [
			shortDate,
			region,
			service,
			KEY_TYPE_IDENTIFIER
		]) key = await hmac(sha256Constructor, key, signable);
		return signingKeyCache[cacheKey] = key;
	};
	clearCredentialCache = () => {
		cacheQueue.length = 0;
		Object.keys(signingKeyCache).forEach((cacheKey) => {
			delete signingKeyCache[cacheKey];
		});
	};
	hmac = (ctor, secret, data) => {
		const hash = new ctor(secret);
		hash.update(toUint8Array(data));
		return hash.digest();
	};
}));
var getCanonicalHeaders;
var init_getCanonicalHeaders = __esmMin((() => {
	init_constants$6();
	getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders) => {
		const canonical = {};
		for (const headerName of Object.keys(headers).sort()) {
			if (headers[headerName] == void 0) continue;
			const canonicalHeaderName = headerName.toLowerCase();
			if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || unsignableHeaders?.has(canonicalHeaderName) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
				if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) continue;
			}
			canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
		}
		return canonical;
	};
}));
var getPayloadHash;
var init_getPayloadHash = __esmMin((() => {
	init_dist_es$38();
	init_dist_es$30();
	init_dist_es$36();
	init_constants$6();
	getPayloadHash = async ({ headers, body }, hashConstructor) => {
		for (const headerName of Object.keys(headers)) if (headerName.toLowerCase() === "x-amz-content-sha256") return headers[headerName];
		if (body == void 0) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
		else if (typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body)) {
			const hashCtor = new hashConstructor();
			hashCtor.update(toUint8Array(body));
			return toHex(await hashCtor.digest());
		}
		return UNSIGNED_PAYLOAD;
	};
}));
function negate$1(bytes) {
	for (let i = 0; i < 8; i++) bytes[i] ^= 255;
	for (let i = 7; i > -1; i--) {
		bytes[i]++;
		if (bytes[i] !== 0) break;
	}
}
var HeaderFormatter, HEADER_VALUE_TYPE$1, UUID_PATTERN$1, Int64$1;
var init_HeaderFormatter = __esmMin((() => {
	init_dist_es$30();
	init_dist_es$36();
	HeaderFormatter = class {
		format(headers) {
			const chunks = [];
			for (const headerName of Object.keys(headers)) {
				const bytes = fromUtf8(headerName);
				chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
			}
			const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
			let position = 0;
			for (const chunk of chunks) {
				out.set(chunk, position);
				position += chunk.byteLength;
			}
			return out;
		}
		formatHeaderValue(header) {
			switch (header.type) {
				case "boolean": return Uint8Array.from([header.value ? 0 : 1]);
				case "byte": return Uint8Array.from([2, header.value]);
				case "short":
					const shortView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(3));
					shortView.setUint8(0, 3);
					shortView.setInt16(1, header.value, false);
					return new Uint8Array(shortView.buffer);
				case "integer":
					const intView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(5));
					intView.setUint8(0, 4);
					intView.setInt32(1, header.value, false);
					return new Uint8Array(intView.buffer);
				case "long":
					const longBytes = new Uint8Array(9);
					longBytes[0] = 5;
					longBytes.set(header.value.bytes, 1);
					return longBytes;
				case "binary":
					const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
					binView.setUint8(0, 6);
					binView.setUint16(1, header.value.byteLength, false);
					const binBytes = new Uint8Array(binView.buffer);
					binBytes.set(header.value, 3);
					return binBytes;
				case "string":
					const utf8Bytes = fromUtf8(header.value);
					const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
					strView.setUint8(0, 7);
					strView.setUint16(1, utf8Bytes.byteLength, false);
					const strBytes = new Uint8Array(strView.buffer);
					strBytes.set(utf8Bytes, 3);
					return strBytes;
				case "timestamp":
					const tsBytes = new Uint8Array(9);
					tsBytes[0] = 8;
					tsBytes.set(Int64$1.fromNumber(header.value.valueOf()).bytes, 1);
					return tsBytes;
				case "uuid":
					if (!UUID_PATTERN$1.test(header.value)) throw new Error(`Invalid UUID received: ${header.value}`);
					const uuidBytes = new Uint8Array(17);
					uuidBytes[0] = 9;
					uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
					return uuidBytes;
			}
		}
	};
	(function(HEADER_VALUE_TYPE) {
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
		HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
	})(HEADER_VALUE_TYPE$1 || (HEADER_VALUE_TYPE$1 = {}));
	UUID_PATTERN$1 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
	Int64$1 = class Int64$1 {
		bytes;
		constructor(bytes) {
			this.bytes = bytes;
			if (bytes.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
		}
		static fromNumber(number) {
			if (number > 0x8000000000000000 || number < -0x8000000000000000) throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
			const bytes = new Uint8Array(8);
			for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) bytes[i] = remaining;
			if (number < 0) negate$1(bytes);
			return new Int64$1(bytes);
		}
		valueOf() {
			const bytes = this.bytes.slice(0);
			const negative = bytes[0] & 128;
			if (negative) negate$1(bytes);
			return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
		}
		toString() {
			return String(this.valueOf());
		}
	};
}));
var hasHeader$1;
var init_headerUtil = __esmMin((() => {
	hasHeader$1 = (soughtHeader, headers) => {
		soughtHeader = soughtHeader.toLowerCase();
		for (const headerName of Object.keys(headers)) if (soughtHeader === headerName.toLowerCase()) return true;
		return false;
	};
}));
var moveHeadersToQuery;
var init_moveHeadersToQuery = __esmMin((() => {
	init_dist_es$41();
	moveHeadersToQuery = (request, options = {}) => {
		const { headers, query = {} } = HttpRequest.clone(request);
		for (const name of Object.keys(headers)) {
			const lname = name.toLowerCase();
			if (lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname) || options.hoistableHeaders?.has(lname)) {
				query[name] = headers[name];
				delete headers[name];
			}
		}
		return {
			...request,
			headers,
			query
		};
	};
}));
var prepareRequest;
var init_prepareRequest = __esmMin((() => {
	init_dist_es$41();
	init_constants$6();
	prepareRequest = (request) => {
		request = HttpRequest.clone(request);
		for (const headerName of Object.keys(request.headers)) if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) delete request.headers[headerName];
		return request;
	};
}));
var getCanonicalQuery;
var init_getCanonicalQuery = __esmMin((() => {
	init_dist_es$34();
	init_constants$6();
	getCanonicalQuery = ({ query = {} }) => {
		const keys = [];
		const serialized = {};
		for (const key of Object.keys(query)) {
			if (key.toLowerCase() === "x-amz-signature") continue;
			const encodedKey = escapeUri(key);
			keys.push(encodedKey);
			const value = query[key];
			if (typeof value === "string") serialized[encodedKey] = `${encodedKey}=${escapeUri(value)}`;
			else if (Array.isArray(value)) serialized[encodedKey] = value.slice(0).reduce((encoded, value) => encoded.concat([`${encodedKey}=${escapeUri(value)}`]), []).sort().join("&");
		}
		return keys.sort().map((key) => serialized[key]).filter((serialized) => serialized).join("&");
	};
}));
var iso8601, toDate;
var init_utilDate = __esmMin((() => {
	iso8601 = (time) => toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z");
	toDate = (time) => {
		if (typeof time === "number") return /* @__PURE__ */ new Date(time * 1e3);
		if (typeof time === "string") {
			if (Number(time)) return /* @__PURE__ */ new Date(Number(time) * 1e3);
			return new Date(time);
		}
		return time;
	};
}));
var SignatureV4Base;
var init_SignatureV4Base = __esmMin((() => {
	init_dist_es$30();
	init_dist_es$40();
	init_dist_es$34();
	init_dist_es$36();
	init_getCanonicalQuery();
	init_utilDate();
	SignatureV4Base = class {
		service;
		regionProvider;
		credentialProvider;
		sha256;
		uriEscapePath;
		applyChecksum;
		constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
			this.service = service;
			this.sha256 = sha256;
			this.uriEscapePath = uriEscapePath;
			this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
			this.regionProvider = normalizeProvider$1(region);
			this.credentialProvider = normalizeProvider$1(credentials);
		}
		createCanonicalRequest(request, canonicalHeaders, payloadHash) {
			const sortedHeaders = Object.keys(canonicalHeaders).sort();
			return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
		}
		async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
			const hash = new this.sha256();
			hash.update(toUint8Array(canonicalRequest));
			return `${algorithmIdentifier}
${longDate}
${credentialScope}
${toHex(await hash.digest())}`;
		}
		getCanonicalPath({ path }) {
			if (this.uriEscapePath) {
				const normalizedPathSegments = [];
				for (const pathSegment of path.split("/")) {
					if (pathSegment?.length === 0) continue;
					if (pathSegment === ".") continue;
					if (pathSegment === "..") normalizedPathSegments.pop();
					else normalizedPathSegments.push(pathSegment);
				}
				return escapeUri(`${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`).replace(/%2F/g, "/");
			}
			return path;
		}
		validateResolvedCredentials(credentials) {
			if (typeof credentials !== "object" || typeof credentials.accessKeyId !== "string" || typeof credentials.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid");
		}
		formatDate(now) {
			const longDate = iso8601(now).replace(/[\-:]/g, "");
			return {
				longDate,
				shortDate: longDate.slice(0, 8)
			};
		}
		getCanonicalHeaderList(headers) {
			return Object.keys(headers).sort().join(";");
		}
	};
}));
var SignatureV4;
var init_SignatureV4 = __esmMin((() => {
	init_dist_es$30();
	init_dist_es$36();
	init_constants$6();
	init_credentialDerivation();
	init_getCanonicalHeaders();
	init_getPayloadHash();
	init_HeaderFormatter();
	init_headerUtil();
	init_moveHeadersToQuery();
	init_prepareRequest();
	init_SignatureV4Base();
	SignatureV4 = class extends SignatureV4Base {
		headerFormatter = new HeaderFormatter();
		constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
			super({
				applyChecksum,
				credentials,
				region,
				service,
				sha256,
				uriEscapePath
			});
		}
		async presign(originalRequest, options = {}) {
			const { signingDate = /* @__PURE__ */ new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService } = options;
			const credentials = await this.credentialProvider();
			this.validateResolvedCredentials(credentials);
			const region = signingRegion ?? await this.regionProvider();
			const { longDate, shortDate } = this.formatDate(signingDate);
			if (expiresIn > 604800) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
			const scope = createScope(shortDate, region, signingService ?? this.service);
			const request = moveHeadersToQuery(prepareRequest(originalRequest), {
				unhoistableHeaders,
				hoistableHeaders
			});
			if (credentials.sessionToken) request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
			request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
			request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
			request.query[AMZ_DATE_QUERY_PARAM] = longDate;
			request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
			const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
			request.query[SIGNED_HEADERS_QUERY_PARAM] = this.getCanonicalHeaderList(canonicalHeaders);
			request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
			return request;
		}
		async sign(toSign, options) {
			if (typeof toSign === "string") return this.signString(toSign, options);
			else if (toSign.headers && toSign.payload) return this.signEvent(toSign, options);
			else if (toSign.message) return this.signMessage(toSign, options);
			else return this.signRequest(toSign, options);
		}
		async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService }) {
			const region = signingRegion ?? await this.regionProvider();
			const { shortDate, longDate } = this.formatDate(signingDate);
			const scope = createScope(shortDate, region, signingService ?? this.service);
			const hashedPayload = await getPayloadHash({
				headers: {},
				body: payload
			}, this.sha256);
			const hash = new this.sha256();
			hash.update(headers);
			const stringToSign = [
				EVENT_ALGORITHM_IDENTIFIER,
				longDate,
				scope,
				priorSignature,
				toHex(await hash.digest()),
				hashedPayload
			].join("\n");
			return this.signString(stringToSign, {
				signingDate,
				signingRegion: region,
				signingService
			});
		}
		async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService }) {
			return this.signEvent({
				headers: this.headerFormatter.format(signableMessage.message.headers),
				payload: signableMessage.message.body
			}, {
				signingDate,
				signingRegion,
				signingService,
				priorSignature: signableMessage.priorSignature
			}).then((signature) => {
				return {
					message: signableMessage.message,
					signature
				};
			});
		}
		async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService } = {}) {
			const credentials = await this.credentialProvider();
			this.validateResolvedCredentials(credentials);
			const region = signingRegion ?? await this.regionProvider();
			const { shortDate } = this.formatDate(signingDate);
			const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
			hash.update(toUint8Array(stringToSign));
			return toHex(await hash.digest());
		}
		async signRequest(requestToSign, { signingDate = /* @__PURE__ */ new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService } = {}) {
			const credentials = await this.credentialProvider();
			this.validateResolvedCredentials(credentials);
			const region = signingRegion ?? await this.regionProvider();
			const request = prepareRequest(requestToSign);
			const { longDate, shortDate } = this.formatDate(signingDate);
			const scope = createScope(shortDate, region, signingService ?? this.service);
			request.headers[AMZ_DATE_HEADER] = longDate;
			if (credentials.sessionToken) request.headers[TOKEN_HEADER] = credentials.sessionToken;
			const payloadHash = await getPayloadHash(request, this.sha256);
			if (!hasHeader$1("x-amz-content-sha256", request.headers) && this.applyChecksum) request.headers[SHA256_HEADER] = payloadHash;
			const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
			const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
			request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
			return request;
		}
		async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
			const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, ALGORITHM_IDENTIFIER);
			const hash = new this.sha256(await keyPromise);
			hash.update(toUint8Array(stringToSign));
			return toHex(await hash.digest());
		}
		getSigningKey(credentials, region, shortDate, service) {
			return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
		}
	};
}));
var signatureV4aContainer;
var init_signature_v4a_container = __esmMin((() => {
	signatureV4aContainer = { SignatureV4a: null };
}));
var dist_es_exports$21 = /* @__PURE__ */ __exportAll({
	ALGORITHM_IDENTIFIER: () => ALGORITHM_IDENTIFIER,
	ALGORITHM_IDENTIFIER_V4A: () => ALGORITHM_IDENTIFIER_V4A,
	ALGORITHM_QUERY_PARAM: () => ALGORITHM_QUERY_PARAM,
	ALWAYS_UNSIGNABLE_HEADERS: () => ALWAYS_UNSIGNABLE_HEADERS,
	AMZ_DATE_HEADER: () => AMZ_DATE_HEADER,
	AMZ_DATE_QUERY_PARAM: () => AMZ_DATE_QUERY_PARAM,
	AUTH_HEADER: () => AUTH_HEADER,
	CREDENTIAL_QUERY_PARAM: () => CREDENTIAL_QUERY_PARAM,
	DATE_HEADER: () => DATE_HEADER,
	EVENT_ALGORITHM_IDENTIFIER: () => EVENT_ALGORITHM_IDENTIFIER,
	EXPIRES_QUERY_PARAM: () => EXPIRES_QUERY_PARAM,
	GENERATED_HEADERS: () => GENERATED_HEADERS,
	HOST_HEADER: () => HOST_HEADER,
	KEY_TYPE_IDENTIFIER: () => KEY_TYPE_IDENTIFIER,
	MAX_CACHE_SIZE: () => 50,
	MAX_PRESIGNED_TTL: () => MAX_PRESIGNED_TTL,
	PROXY_HEADER_PATTERN: () => PROXY_HEADER_PATTERN,
	REGION_SET_PARAM: () => REGION_SET_PARAM,
	SEC_HEADER_PATTERN: () => SEC_HEADER_PATTERN,
	SHA256_HEADER: () => SHA256_HEADER,
	SIGNATURE_HEADER: () => SIGNATURE_HEADER,
	SIGNATURE_QUERY_PARAM: () => SIGNATURE_QUERY_PARAM,
	SIGNED_HEADERS_QUERY_PARAM: () => SIGNED_HEADERS_QUERY_PARAM,
	SignatureV4: () => SignatureV4,
	SignatureV4Base: () => SignatureV4Base,
	TOKEN_HEADER: () => TOKEN_HEADER,
	TOKEN_QUERY_PARAM: () => TOKEN_QUERY_PARAM,
	UNSIGNABLE_PATTERNS: () => UNSIGNABLE_PATTERNS,
	UNSIGNED_PAYLOAD: () => UNSIGNED_PAYLOAD,
	clearCredentialCache: () => clearCredentialCache,
	createScope: () => createScope,
	getCanonicalHeaders: () => getCanonicalHeaders,
	getCanonicalQuery: () => getCanonicalQuery,
	getPayloadHash: () => getPayloadHash,
	getSigningKey: () => getSigningKey,
	hasHeader: () => hasHeader$1,
	moveHeadersToQuery: () => moveHeadersToQuery,
	prepareRequest: () => prepareRequest,
	signatureV4aContainer: () => signatureV4aContainer
});
var init_dist_es$26 = __esmMin((() => {
	init_SignatureV4();
	init_constants$6();
	init_getCanonicalHeaders();
	init_getCanonicalQuery();
	init_getPayloadHash();
	init_moveHeadersToQuery();
	init_prepareRequest();
	init_credentialDerivation();
	init_SignatureV4Base();
	init_headerUtil();
	init_signature_v4a_container();
}));
var TEXT_ENCODER, calculateBodyLength$1;
var init_calculateBodyLength$1 = __esmMin((() => {
	TEXT_ENCODER = typeof TextEncoder == "function" ? new TextEncoder() : null;
	calculateBodyLength$1 = (body) => {
		if (typeof body === "string") {
			if (TEXT_ENCODER) return TEXT_ENCODER.encode(body).byteLength;
			let len = body.length;
			for (let i = len - 1; i >= 0; i--) {
				const code = body.charCodeAt(i);
				if (code > 127 && code <= 2047) len++;
				else if (code > 2047 && code <= 65535) len += 2;
				if (code >= 56320 && code <= 57343) i--;
			}
			return len;
		} else if (typeof body.byteLength === "number") return body.byteLength;
		else if (typeof body.size === "number") return body.size;
		throw new Error(`Body Length computation failed for ${body}`);
	};
}));
var dist_es_exports$20 = /* @__PURE__ */ __exportAll({ calculateBodyLength: () => calculateBodyLength$1 });
var init_dist_es$25 = __esmMin((() => {
	init_calculateBodyLength$1();
}));
var require_cbor = /* @__PURE__ */ __commonJSMin(((exports) => {
	var serde = require_serde();
	var utilUtf8 = (init_dist_es$36(), __toCommonJS(dist_es_exports$27));
	var protocols = require_protocols$1();
	var protocolHttp = (init_dist_es$41(), __toCommonJS(dist_es_exports$30));
	var utilBodyLengthBrowser = (init_dist_es$25(), __toCommonJS(dist_es_exports$20));
	var schema = require_schema();
	var utilMiddleware = (init_dist_es$40(), __toCommonJS(dist_es_exports$29));
	var utilBase64 = (init_dist_es$35(), __toCommonJS(dist_es_exports$26));
	var majorUint64 = 0;
	var majorNegativeInt64 = 1;
	var majorUnstructuredByteString = 2;
	var majorUtf8String = 3;
	var majorList = 4;
	var majorMap = 5;
	var majorTag = 6;
	var majorSpecial = 7;
	var specialFalse = 20;
	var specialTrue = 21;
	var specialNull = 22;
	var specialUndefined = 23;
	var extendedOneByte = 24;
	var extendedFloat16 = 25;
	var extendedFloat32 = 26;
	var extendedFloat64 = 27;
	var minorIndefinite = 31;
	function alloc(size) {
		return typeof Buffer !== "undefined" ? Buffer.alloc(size) : new Uint8Array(size);
	}
	var tagSymbol = Symbol("@smithy/core/cbor::tagSymbol");
	function tag(data) {
		data[tagSymbol] = true;
		return data;
	}
	var USE_TEXT_DECODER = typeof TextDecoder !== "undefined";
	var USE_BUFFER$1 = typeof Buffer !== "undefined";
	var payload = alloc(0);
	var dataView$1 = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
	var textDecoder = USE_TEXT_DECODER ? new TextDecoder() : null;
	var _offset = 0;
	function setPayload(bytes) {
		payload = bytes;
		dataView$1 = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
	}
	function decode(at, to) {
		if (at >= to) throw new Error("unexpected end of (decode) payload.");
		const major = (payload[at] & 224) >> 5;
		const minor = payload[at] & 31;
		switch (major) {
			case majorUint64:
			case majorNegativeInt64:
			case majorTag:
				let unsignedInt;
				let offset;
				if (minor < 24) {
					unsignedInt = minor;
					offset = 1;
				} else switch (minor) {
					case extendedOneByte:
					case extendedFloat16:
					case extendedFloat32:
					case extendedFloat64:
						const countLength = minorValueToArgumentLength[minor];
						const countOffset = countLength + 1;
						offset = countOffset;
						if (to - at < countOffset) throw new Error(`countLength ${countLength} greater than remaining buf len.`);
						const countIndex = at + 1;
						if (countLength === 1) unsignedInt = payload[countIndex];
						else if (countLength === 2) unsignedInt = dataView$1.getUint16(countIndex);
						else if (countLength === 4) unsignedInt = dataView$1.getUint32(countIndex);
						else unsignedInt = dataView$1.getBigUint64(countIndex);
						break;
					default: throw new Error(`unexpected minor value ${minor}.`);
				}
				if (major === majorUint64) {
					_offset = offset;
					return castBigInt(unsignedInt);
				} else if (major === majorNegativeInt64) {
					let negativeInt;
					if (typeof unsignedInt === "bigint") negativeInt = BigInt(-1) - unsignedInt;
					else negativeInt = -1 - unsignedInt;
					_offset = offset;
					return castBigInt(negativeInt);
				} else if (minor === 2 || minor === 3) {
					const length = decodeCount(at + offset, to);
					let b = BigInt(0);
					const start = at + offset + _offset;
					for (let i = start; i < start + length; ++i) b = b << BigInt(8) | BigInt(payload[i]);
					_offset = offset + _offset + length;
					return minor === 3 ? -b - BigInt(1) : b;
				} else if (minor === 4) {
					const [exponent, mantissa] = decode(at + offset, to);
					const normalizer = mantissa < 0 ? -1 : 1;
					const mantissaStr = "0".repeat(Math.abs(exponent) + 1) + String(BigInt(normalizer) * BigInt(mantissa));
					let numericString;
					const sign = mantissa < 0 ? "-" : "";
					numericString = exponent === 0 ? mantissaStr : mantissaStr.slice(0, mantissaStr.length + exponent) + "." + mantissaStr.slice(exponent);
					numericString = numericString.replace(/^0+/g, "");
					if (numericString === "") numericString = "0";
					if (numericString[0] === ".") numericString = "0" + numericString;
					numericString = sign + numericString;
					_offset = offset + _offset;
					return serde.nv(numericString);
				} else {
					const value = decode(at + offset, to);
					_offset = offset + _offset;
					return tag({
						tag: castBigInt(unsignedInt),
						value
					});
				}
			case majorUtf8String:
			case majorMap:
			case majorList:
			case majorUnstructuredByteString: if (minor === minorIndefinite) switch (major) {
				case majorUtf8String: return decodeUtf8StringIndefinite(at, to);
				case majorMap: return decodeMapIndefinite(at, to);
				case majorList: return decodeListIndefinite(at, to);
				case majorUnstructuredByteString: return decodeUnstructuredByteStringIndefinite(at, to);
			}
			else switch (major) {
				case majorUtf8String: return decodeUtf8String(at, to);
				case majorMap: return decodeMap(at, to);
				case majorList: return decodeList(at, to);
				case majorUnstructuredByteString: return decodeUnstructuredByteString(at, to);
			}
			default: return decodeSpecial(at, to);
		}
	}
	function bytesToUtf8(bytes, at, to) {
		if (USE_BUFFER$1 && bytes.constructor?.name === "Buffer") return bytes.toString("utf-8", at, to);
		if (textDecoder) return textDecoder.decode(bytes.subarray(at, to));
		return utilUtf8.toUtf8(bytes.subarray(at, to));
	}
	function demote(bigInteger) {
		const num = Number(bigInteger);
		if (num < Number.MIN_SAFE_INTEGER || Number.MAX_SAFE_INTEGER < num) console.warn(/* @__PURE__ */ new Error(`@smithy/core/cbor - truncating BigInt(${bigInteger}) to ${num} with loss of precision.`));
		return num;
	}
	var minorValueToArgumentLength = {
		[extendedOneByte]: 1,
		[extendedFloat16]: 2,
		[extendedFloat32]: 4,
		[extendedFloat64]: 8
	};
	function bytesToFloat16(a, b) {
		const sign = a >> 7;
		const exponent = (a & 124) >> 2;
		const fraction = (a & 3) << 8 | b;
		const scalar = sign === 0 ? 1 : -1;
		let exponentComponent;
		let summation;
		if (exponent === 0) if (fraction === 0) return 0;
		else {
			exponentComponent = Math.pow(2, -14);
			summation = 0;
		}
		else if (exponent === 31) if (fraction === 0) return scalar * Infinity;
		else return NaN;
		else {
			exponentComponent = Math.pow(2, exponent - 15);
			summation = 1;
		}
		summation += fraction / 1024;
		return scalar * (exponentComponent * summation);
	}
	function decodeCount(at, to) {
		const minor = payload[at] & 31;
		if (minor < 24) {
			_offset = 1;
			return minor;
		}
		if (minor === extendedOneByte || minor === extendedFloat16 || minor === extendedFloat32 || minor === extendedFloat64) {
			const countLength = minorValueToArgumentLength[minor];
			_offset = countLength + 1;
			if (to - at < _offset) throw new Error(`countLength ${countLength} greater than remaining buf len.`);
			const countIndex = at + 1;
			if (countLength === 1) return payload[countIndex];
			else if (countLength === 2) return dataView$1.getUint16(countIndex);
			else if (countLength === 4) return dataView$1.getUint32(countIndex);
			return demote(dataView$1.getBigUint64(countIndex));
		}
		throw new Error(`unexpected minor value ${minor}.`);
	}
	function decodeUtf8String(at, to) {
		const length = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		if (to - at < length) throw new Error(`string len ${length} greater than remaining buf len.`);
		const value = bytesToUtf8(payload, at, at + length);
		_offset = offset + length;
		return value;
	}
	function decodeUtf8StringIndefinite(at, to) {
		at += 1;
		const vector = [];
		for (const base = at; at < to;) {
			if (payload[at] === 255) {
				const data = alloc(vector.length);
				data.set(vector, 0);
				_offset = at - base + 2;
				return bytesToUtf8(data, 0, data.length);
			}
			const major = (payload[at] & 224) >> 5;
			const minor = payload[at] & 31;
			if (major !== majorUtf8String) throw new Error(`unexpected major type ${major} in indefinite string.`);
			if (minor === minorIndefinite) throw new Error("nested indefinite string.");
			const bytes = decodeUnstructuredByteString(at, to);
			at += _offset;
			for (let i = 0; i < bytes.length; ++i) vector.push(bytes[i]);
		}
		throw new Error("expected break marker.");
	}
	function decodeUnstructuredByteString(at, to) {
		const length = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		if (to - at < length) throw new Error(`unstructured byte string len ${length} greater than remaining buf len.`);
		const value = payload.subarray(at, at + length);
		_offset = offset + length;
		return value;
	}
	function decodeUnstructuredByteStringIndefinite(at, to) {
		at += 1;
		const vector = [];
		for (const base = at; at < to;) {
			if (payload[at] === 255) {
				const data = alloc(vector.length);
				data.set(vector, 0);
				_offset = at - base + 2;
				return data;
			}
			const major = (payload[at] & 224) >> 5;
			const minor = payload[at] & 31;
			if (major !== majorUnstructuredByteString) throw new Error(`unexpected major type ${major} in indefinite string.`);
			if (minor === minorIndefinite) throw new Error("nested indefinite string.");
			const bytes = decodeUnstructuredByteString(at, to);
			at += _offset;
			for (let i = 0; i < bytes.length; ++i) vector.push(bytes[i]);
		}
		throw new Error("expected break marker.");
	}
	function decodeList(at, to) {
		const listDataLength = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		const base = at;
		const list = Array(listDataLength);
		for (let i = 0; i < listDataLength; ++i) {
			const item = decode(at, to);
			const itemOffset = _offset;
			list[i] = item;
			at += itemOffset;
		}
		_offset = offset + (at - base);
		return list;
	}
	function decodeListIndefinite(at, to) {
		at += 1;
		const list = [];
		for (const base = at; at < to;) {
			if (payload[at] === 255) {
				_offset = at - base + 2;
				return list;
			}
			const item = decode(at, to);
			at += _offset;
			list.push(item);
		}
		throw new Error("expected break marker.");
	}
	function decodeMap(at, to) {
		const mapDataLength = decodeCount(at, to);
		const offset = _offset;
		at += offset;
		const base = at;
		const map = {};
		for (let i = 0; i < mapDataLength; ++i) {
			if (at >= to) throw new Error("unexpected end of map payload.");
			const major = (payload[at] & 224) >> 5;
			if (major !== majorUtf8String) throw new Error(`unexpected major type ${major} for map key at index ${at}.`);
			const key = decode(at, to);
			at += _offset;
			const value = decode(at, to);
			at += _offset;
			map[key] = value;
		}
		_offset = offset + (at - base);
		return map;
	}
	function decodeMapIndefinite(at, to) {
		at += 1;
		const base = at;
		const map = {};
		for (; at < to;) {
			if (at >= to) throw new Error("unexpected end of map payload.");
			if (payload[at] === 255) {
				_offset = at - base + 2;
				return map;
			}
			const major = (payload[at] & 224) >> 5;
			if (major !== majorUtf8String) throw new Error(`unexpected major type ${major} for map key.`);
			const key = decode(at, to);
			at += _offset;
			const value = decode(at, to);
			at += _offset;
			map[key] = value;
		}
		throw new Error("expected break marker.");
	}
	function decodeSpecial(at, to) {
		const minor = payload[at] & 31;
		switch (minor) {
			case specialTrue:
			case specialFalse:
				_offset = 1;
				return minor === specialTrue;
			case specialNull:
				_offset = 1;
				return null;
			case specialUndefined:
				_offset = 1;
				return null;
			case extendedFloat16:
				if (to - at < 3) throw new Error("incomplete float16 at end of buf.");
				_offset = 3;
				return bytesToFloat16(payload[at + 1], payload[at + 2]);
			case extendedFloat32:
				if (to - at < 5) throw new Error("incomplete float32 at end of buf.");
				_offset = 5;
				return dataView$1.getFloat32(at + 1);
			case extendedFloat64:
				if (to - at < 9) throw new Error("incomplete float64 at end of buf.");
				_offset = 9;
				return dataView$1.getFloat64(at + 1);
			default: throw new Error(`unexpected minor value ${minor}.`);
		}
	}
	function castBigInt(bigInt) {
		if (typeof bigInt === "number") return bigInt;
		const num = Number(bigInt);
		if (Number.MIN_SAFE_INTEGER <= num && num <= Number.MAX_SAFE_INTEGER) return num;
		return bigInt;
	}
	var USE_BUFFER = typeof Buffer !== "undefined";
	var data = alloc(2048);
	var dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
	var cursor = 0;
	function ensureSpace(bytes) {
		if (data.byteLength - cursor < bytes) if (cursor < 16e6) resize(Math.max(data.byteLength * 4, data.byteLength + bytes));
		else resize(data.byteLength + bytes + 16e6);
	}
	function toUint8Array() {
		const out = alloc(cursor);
		out.set(data.subarray(0, cursor), 0);
		cursor = 0;
		return out;
	}
	function resize(size) {
		const old = data;
		data = alloc(size);
		if (old) if (old.copy) old.copy(data, 0, 0, old.byteLength);
		else data.set(old, 0);
		dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
	}
	function encodeHeader(major, value) {
		if (value < 24) data[cursor++] = major << 5 | value;
		else if (value < 256) {
			data[cursor++] = major << 5 | 24;
			data[cursor++] = value;
		} else if (value < 65536) {
			data[cursor++] = major << 5 | extendedFloat16;
			dataView.setUint16(cursor, value);
			cursor += 2;
		} else if (value < 2 ** 32) {
			data[cursor++] = major << 5 | extendedFloat32;
			dataView.setUint32(cursor, value);
			cursor += 4;
		} else {
			data[cursor++] = major << 5 | extendedFloat64;
			dataView.setBigUint64(cursor, typeof value === "bigint" ? value : BigInt(value));
			cursor += 8;
		}
	}
	function encode(_input) {
		const encodeStack = [_input];
		while (encodeStack.length) {
			const input = encodeStack.pop();
			ensureSpace(typeof input === "string" ? input.length * 4 : 64);
			if (typeof input === "string") {
				if (USE_BUFFER) {
					encodeHeader(majorUtf8String, Buffer.byteLength(input));
					cursor += data.write(input, cursor);
				} else {
					const bytes = utilUtf8.fromUtf8(input);
					encodeHeader(majorUtf8String, bytes.byteLength);
					data.set(bytes, cursor);
					cursor += bytes.byteLength;
				}
				continue;
			} else if (typeof input === "number") {
				if (Number.isInteger(input)) {
					const nonNegative = input >= 0;
					const major = nonNegative ? majorUint64 : majorNegativeInt64;
					const value = nonNegative ? input : -input - 1;
					if (value < 24) data[cursor++] = major << 5 | value;
					else if (value < 256) {
						data[cursor++] = major << 5 | 24;
						data[cursor++] = value;
					} else if (value < 65536) {
						data[cursor++] = major << 5 | extendedFloat16;
						data[cursor++] = value >> 8;
						data[cursor++] = value;
					} else if (value < 4294967296) {
						data[cursor++] = major << 5 | extendedFloat32;
						dataView.setUint32(cursor, value);
						cursor += 4;
					} else {
						data[cursor++] = major << 5 | extendedFloat64;
						dataView.setBigUint64(cursor, BigInt(value));
						cursor += 8;
					}
					continue;
				}
				data[cursor++] = majorSpecial << 5 | extendedFloat64;
				dataView.setFloat64(cursor, input);
				cursor += 8;
				continue;
			} else if (typeof input === "bigint") {
				const nonNegative = input >= 0;
				const major = nonNegative ? majorUint64 : majorNegativeInt64;
				const value = nonNegative ? input : -input - BigInt(1);
				const n = Number(value);
				if (n < 24) data[cursor++] = major << 5 | n;
				else if (n < 256) {
					data[cursor++] = major << 5 | 24;
					data[cursor++] = n;
				} else if (n < 65536) {
					data[cursor++] = major << 5 | extendedFloat16;
					data[cursor++] = n >> 8;
					data[cursor++] = n & 255;
				} else if (n < 4294967296) {
					data[cursor++] = major << 5 | extendedFloat32;
					dataView.setUint32(cursor, n);
					cursor += 4;
				} else if (value < BigInt("18446744073709551616")) {
					data[cursor++] = major << 5 | extendedFloat64;
					dataView.setBigUint64(cursor, value);
					cursor += 8;
				} else {
					const binaryBigInt = value.toString(2);
					const bigIntBytes = new Uint8Array(Math.ceil(binaryBigInt.length / 8));
					let b = value;
					let i = 0;
					while (bigIntBytes.byteLength - ++i >= 0) {
						bigIntBytes[bigIntBytes.byteLength - i] = Number(b & BigInt(255));
						b >>= BigInt(8);
					}
					ensureSpace(bigIntBytes.byteLength * 2);
					data[cursor++] = nonNegative ? 194 : 195;
					if (USE_BUFFER) encodeHeader(majorUnstructuredByteString, Buffer.byteLength(bigIntBytes));
					else encodeHeader(majorUnstructuredByteString, bigIntBytes.byteLength);
					data.set(bigIntBytes, cursor);
					cursor += bigIntBytes.byteLength;
				}
				continue;
			} else if (input === null) {
				data[cursor++] = majorSpecial << 5 | specialNull;
				continue;
			} else if (typeof input === "boolean") {
				data[cursor++] = majorSpecial << 5 | (input ? specialTrue : specialFalse);
				continue;
			} else if (typeof input === "undefined") throw new Error("@smithy/core/cbor: client may not serialize undefined value.");
			else if (Array.isArray(input)) {
				for (let i = input.length - 1; i >= 0; --i) encodeStack.push(input[i]);
				encodeHeader(majorList, input.length);
				continue;
			} else if (typeof input.byteLength === "number") {
				ensureSpace(input.length * 2);
				encodeHeader(majorUnstructuredByteString, input.length);
				data.set(input, cursor);
				cursor += input.byteLength;
				continue;
			} else if (typeof input === "object") {
				if (input instanceof serde.NumericValue) {
					const decimalIndex = input.string.indexOf(".");
					const exponent = decimalIndex === -1 ? 0 : decimalIndex - input.string.length + 1;
					const mantissa = BigInt(input.string.replace(".", ""));
					data[cursor++] = 196;
					encodeStack.push(mantissa);
					encodeStack.push(exponent);
					encodeHeader(majorList, 2);
					continue;
				}
				if (input[tagSymbol]) if ("tag" in input && "value" in input) {
					encodeStack.push(input.value);
					encodeHeader(majorTag, input.tag);
					continue;
				} else throw new Error("tag encountered with missing fields, need 'tag' and 'value', found: " + JSON.stringify(input));
				const keys = Object.keys(input);
				for (let i = keys.length - 1; i >= 0; --i) {
					const key = keys[i];
					encodeStack.push(input[key]);
					encodeStack.push(key);
				}
				encodeHeader(majorMap, keys.length);
				continue;
			}
			throw new Error(`data type ${input?.constructor?.name ?? typeof input} not compatible for encoding.`);
		}
	}
	var cbor = {
		deserialize(payload) {
			setPayload(payload);
			return decode(0, payload.length);
		},
		serialize(input) {
			try {
				encode(input);
				return toUint8Array();
			} catch (e) {
				toUint8Array();
				throw e;
			}
		},
		resizeEncodingBuffer(size) {
			resize(size);
		}
	};
	var parseCborBody = (streamBody, context) => {
		return protocols.collectBody(streamBody, context).then(async (bytes) => {
			if (bytes.length) try {
				return cbor.deserialize(bytes);
			} catch (e) {
				Object.defineProperty(e, "$responseBodyText", { value: context.utf8Encoder(bytes) });
				throw e;
			}
			return {};
		});
	};
	var dateToTag = (date) => {
		return tag({
			tag: 1,
			value: date.getTime() / 1e3
		});
	};
	var parseCborErrorBody = async (errorBody, context) => {
		const value = await parseCborBody(errorBody, context);
		value.message = value.message ?? value.Message;
		return value;
	};
	var loadSmithyRpcV2CborErrorCode = (output, data) => {
		const sanitizeErrorCode = (rawValue) => {
			let cleanValue = rawValue;
			if (typeof cleanValue === "number") cleanValue = cleanValue.toString();
			if (cleanValue.indexOf(",") >= 0) cleanValue = cleanValue.split(",")[0];
			if (cleanValue.indexOf(":") >= 0) cleanValue = cleanValue.split(":")[0];
			if (cleanValue.indexOf("#") >= 0) cleanValue = cleanValue.split("#")[1];
			return cleanValue;
		};
		if (data["__type"] !== void 0) return sanitizeErrorCode(data["__type"]);
		const codeKey = Object.keys(data).find((key) => key.toLowerCase() === "code");
		if (codeKey && data[codeKey] !== void 0) return sanitizeErrorCode(data[codeKey]);
	};
	var checkCborResponse = (response) => {
		if (String(response.headers["smithy-protocol"]).toLowerCase() !== "rpc-v2-cbor") throw new Error("Malformed RPCv2 CBOR response, status: " + response.statusCode);
	};
	var buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
		const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
		const contents = {
			protocol,
			hostname,
			port,
			method: "POST",
			path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
			headers: { ...headers }
		};
		if (resolvedHostname !== void 0) contents.hostname = resolvedHostname;
		if (body !== void 0) {
			contents.body = body;
			try {
				contents.headers["content-length"] = String(utilBodyLengthBrowser.calculateBodyLength(body));
			} catch (e) {}
		}
		return new protocolHttp.HttpRequest(contents);
	};
	var CborCodec = class extends protocols.SerdeContext {
		createSerializer() {
			const serializer = new CborShapeSerializer();
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new CborShapeDeserializer();
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var CborShapeSerializer = class extends protocols.SerdeContext {
		value;
		write(schema, value) {
			this.value = this.serialize(schema, value);
		}
		serialize(schema$1, source) {
			const ns = schema.NormalizedSchema.of(schema$1);
			if (source == null) {
				if (ns.isIdempotencyToken()) return serde.generateIdempotencyToken();
				return source;
			}
			if (ns.isBlobSchema()) {
				if (typeof source === "string") return (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(source);
				return source;
			}
			if (ns.isTimestampSchema()) {
				if (typeof source === "number" || typeof source === "bigint") return dateToTag(/* @__PURE__ */ new Date(Number(source) / 1e3 | 0));
				return dateToTag(source);
			}
			if (typeof source === "function" || typeof source === "object") {
				const sourceObject = source;
				if (ns.isListSchema() && Array.isArray(sourceObject)) {
					const sparse = !!ns.getMergedTraits().sparse;
					const newArray = [];
					let i = 0;
					for (const item of sourceObject) {
						const value = this.serialize(ns.getValueSchema(), item);
						if (value != null || sparse) newArray[i++] = value;
					}
					return newArray;
				}
				if (sourceObject instanceof Date) return dateToTag(sourceObject);
				const newObject = {};
				if (ns.isMapSchema()) {
					const sparse = !!ns.getMergedTraits().sparse;
					for (const key of Object.keys(sourceObject)) {
						const value = this.serialize(ns.getValueSchema(), sourceObject[key]);
						if (value != null || sparse) newObject[key] = value;
					}
				} else if (ns.isStructSchema()) {
					for (const [key, memberSchema] of ns.structIterator()) {
						const value = this.serialize(memberSchema, sourceObject[key]);
						if (value != null) newObject[key] = value;
					}
					if (ns.isUnionSchema() && Array.isArray(sourceObject.$unknown)) {
						const [k, v] = sourceObject.$unknown;
						newObject[k] = v;
					} else if (typeof sourceObject.__type === "string") {
						for (const [k, v] of Object.entries(sourceObject)) if (!(k in newObject)) newObject[k] = this.serialize(15, v);
					}
				} else if (ns.isDocumentSchema()) for (const key of Object.keys(sourceObject)) newObject[key] = this.serialize(ns.getValueSchema(), sourceObject[key]);
				else if (ns.isBigDecimalSchema()) return sourceObject;
				return newObject;
			}
			return source;
		}
		flush() {
			const buffer = cbor.serialize(this.value);
			this.value = void 0;
			return buffer;
		}
	};
	var CborShapeDeserializer = class extends protocols.SerdeContext {
		read(schema, bytes) {
			const data = cbor.deserialize(bytes);
			return this.readValue(schema, data);
		}
		readValue(_schema, value) {
			const ns = schema.NormalizedSchema.of(_schema);
			if (ns.isTimestampSchema()) {
				if (typeof value === "number") return serde._parseEpochTimestamp(value);
				if (typeof value === "object") {
					if (value.tag === 1 && "value" in value) return serde._parseEpochTimestamp(value.value);
				}
			}
			if (ns.isBlobSchema()) {
				if (typeof value === "string") return (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(value);
				return value;
			}
			if (typeof value === "undefined" || typeof value === "boolean" || typeof value === "number" || typeof value === "string" || typeof value === "bigint" || typeof value === "symbol") return value;
			else if (typeof value === "object") {
				if (value === null) return null;
				if ("byteLength" in value) return value;
				if (value instanceof Date) return value;
				if (ns.isDocumentSchema()) return value;
				if (ns.isListSchema()) {
					const newArray = [];
					const memberSchema = ns.getValueSchema();
					const sparse = !!ns.getMergedTraits().sparse;
					for (const item of value) {
						const itemValue = this.readValue(memberSchema, item);
						if (itemValue != null || sparse) newArray.push(itemValue);
					}
					return newArray;
				}
				const newObject = {};
				if (ns.isMapSchema()) {
					const sparse = !!ns.getMergedTraits().sparse;
					const targetSchema = ns.getValueSchema();
					for (const key of Object.keys(value)) {
						const itemValue = this.readValue(targetSchema, value[key]);
						if (itemValue != null || sparse) newObject[key] = itemValue;
					}
				} else if (ns.isStructSchema()) {
					const isUnion = ns.isUnionSchema();
					let keys;
					if (isUnion) keys = new Set(Object.keys(value).filter((k) => k !== "__type"));
					for (const [key, memberSchema] of ns.structIterator()) {
						if (isUnion) keys.delete(key);
						if (value[key] != null) newObject[key] = this.readValue(memberSchema, value[key]);
					}
					if (isUnion && keys?.size === 1 && Object.keys(newObject).length === 0) {
						const k = keys.values().next().value;
						newObject.$unknown = [k, value[k]];
					} else if (typeof value.__type === "string") {
						for (const [k, v] of Object.entries(value)) if (!(k in newObject)) newObject[k] = v;
					}
				} else if (value instanceof serde.NumericValue) return value;
				return newObject;
			} else return value;
		}
	};
	var SmithyRpcV2CborProtocol = class extends protocols.RpcProtocol {
		codec = new CborCodec();
		serializer = this.codec.createSerializer();
		deserializer = this.codec.createDeserializer();
		constructor({ defaultNamespace, errorTypeRegistries }) {
			super({
				defaultNamespace,
				errorTypeRegistries
			});
		}
		getShapeId() {
			return "smithy.protocols#rpcv2Cbor";
		}
		getPayloadCodec() {
			return this.codec;
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			Object.assign(request.headers, {
				"content-type": this.getDefaultContentType(),
				"smithy-protocol": "rpc-v2-cbor",
				accept: this.getDefaultContentType()
			});
			if (schema.deref(operationSchema.input) === "unit") {
				delete request.body;
				delete request.headers["content-type"];
			} else {
				if (!request.body) {
					this.serializer.write(15, {});
					request.body = this.serializer.flush();
				}
				try {
					request.headers["content-length"] = String(request.body.byteLength);
				} catch (e) {}
			}
			const { service, operation } = utilMiddleware.getSmithyContext(context);
			const path = `/service/${service}/operation/${operation}`;
			if (request.path.endsWith("/")) request.path += path.slice(1);
			else request.path += path;
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			return super.deserializeResponse(operationSchema, context, response);
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorName = loadSmithyRpcV2CborErrorCode(response, dataObject) ?? "Unknown";
			const errorMetadata = {
				$metadata: metadata,
				$fault: response.statusCode <= 500 ? "client" : "server"
			};
			let namespace = this.options.defaultNamespace;
			if (errorName.includes("#")) [namespace] = errorName.split("#");
			const registry = this.compositeErrorRegistry;
			const nsRegistry = schema.TypeRegistry.for(namespace);
			registry.copyFrom(nsRegistry);
			let errorSchema;
			try {
				errorSchema = registry.getSchema(errorName);
			} catch (e) {
				if (dataObject.Message) dataObject.message = dataObject.Message;
				const syntheticRegistry = schema.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace);
				registry.copyFrom(syntheticRegistry);
				const baseExceptionSchema = registry.getBaseException();
				if (baseExceptionSchema) {
					const ErrorCtor = registry.getErrorCtor(baseExceptionSchema);
					throw Object.assign(new ErrorCtor({ name: errorName }), errorMetadata, dataObject);
				}
				throw Object.assign(new Error(errorName), errorMetadata, dataObject);
			}
			const ns = schema.NormalizedSchema.of(errorSchema);
			const ErrorCtor = registry.getErrorCtor(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ErrorCtor(message);
			const output = {};
			for (const [name, member] of ns.structIterator()) output[name] = this.deserializer.readValue(member, dataObject[name]);
			throw Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output);
		}
		getDefaultContentType() {
			return "application/cbor";
		}
	};
	exports.CborCodec = CborCodec;
	exports.CborShapeDeserializer = CborShapeDeserializer;
	exports.CborShapeSerializer = CborShapeSerializer;
	exports.SmithyRpcV2CborProtocol = SmithyRpcV2CborProtocol;
	exports.buildHttpRpcRequest = buildHttpRpcRequest;
	exports.cbor = cbor;
	exports.checkCborResponse = checkCborResponse;
	exports.dateToTag = dateToTag;
	exports.loadSmithyRpcV2CborErrorCode = loadSmithyRpcV2CborErrorCode;
	exports.parseCborBody = parseCborBody;
	exports.parseCborErrorBody = parseCborErrorBody;
	exports.tag = tag;
	exports.tagSymbol = tagSymbol;
}));
var getAllAliases, getMiddlewareNameWithAliases, constructStack, stepWeights, priorityWeights;
var init_MiddlewareStack = __esmMin((() => {
	getAllAliases = (name, aliases) => {
		const _aliases = [];
		if (name) _aliases.push(name);
		if (aliases) for (const alias of aliases) _aliases.push(alias);
		return _aliases;
	};
	getMiddlewareNameWithAliases = (name, aliases) => {
		return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
	};
	constructStack = () => {
		let absoluteEntries = [];
		let relativeEntries = [];
		let identifyOnResolve = false;
		const entriesNameSet = /* @__PURE__ */ new Set();
		const sort = (entries) => entries.sort((a, b) => stepWeights[b.step] - stepWeights[a.step] || priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]);
		const removeByName = (toRemove) => {
			let isRemoved = false;
			const filterCb = (entry) => {
				const aliases = getAllAliases(entry.name, entry.aliases);
				if (aliases.includes(toRemove)) {
					isRemoved = true;
					for (const alias of aliases) entriesNameSet.delete(alias);
					return false;
				}
				return true;
			};
			absoluteEntries = absoluteEntries.filter(filterCb);
			relativeEntries = relativeEntries.filter(filterCb);
			return isRemoved;
		};
		const removeByReference = (toRemove) => {
			let isRemoved = false;
			const filterCb = (entry) => {
				if (entry.middleware === toRemove) {
					isRemoved = true;
					for (const alias of getAllAliases(entry.name, entry.aliases)) entriesNameSet.delete(alias);
					return false;
				}
				return true;
			};
			absoluteEntries = absoluteEntries.filter(filterCb);
			relativeEntries = relativeEntries.filter(filterCb);
			return isRemoved;
		};
		const cloneTo = (toStack) => {
			absoluteEntries.forEach((entry) => {
				toStack.add(entry.middleware, { ...entry });
			});
			relativeEntries.forEach((entry) => {
				toStack.addRelativeTo(entry.middleware, { ...entry });
			});
			toStack.identifyOnResolve?.(stack.identifyOnResolve());
			return toStack;
		};
		const expandRelativeMiddlewareList = (from) => {
			const expandedMiddlewareList = [];
			from.before.forEach((entry) => {
				if (entry.before.length === 0 && entry.after.length === 0) expandedMiddlewareList.push(entry);
				else expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
			});
			expandedMiddlewareList.push(from);
			from.after.reverse().forEach((entry) => {
				if (entry.before.length === 0 && entry.after.length === 0) expandedMiddlewareList.push(entry);
				else expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
			});
			return expandedMiddlewareList;
		};
		const getMiddlewareList = (debug = false) => {
			const normalizedAbsoluteEntries = [];
			const normalizedRelativeEntries = [];
			const normalizedEntriesNameMap = {};
			absoluteEntries.forEach((entry) => {
				const normalizedEntry = {
					...entry,
					before: [],
					after: []
				};
				for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) normalizedEntriesNameMap[alias] = normalizedEntry;
				normalizedAbsoluteEntries.push(normalizedEntry);
			});
			relativeEntries.forEach((entry) => {
				const normalizedEntry = {
					...entry,
					before: [],
					after: []
				};
				for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) normalizedEntriesNameMap[alias] = normalizedEntry;
				normalizedRelativeEntries.push(normalizedEntry);
			});
			normalizedRelativeEntries.forEach((entry) => {
				if (entry.toMiddleware) {
					const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
					if (toMiddleware === void 0) {
						if (debug) return;
						throw new Error(`${entry.toMiddleware} is not found when adding ${getMiddlewareNameWithAliases(entry.name, entry.aliases)} middleware ${entry.relation} ${entry.toMiddleware}`);
					}
					if (entry.relation === "after") toMiddleware.after.push(entry);
					if (entry.relation === "before") toMiddleware.before.push(entry);
				}
			});
			return sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce((wholeList, expandedMiddlewareList) => {
				wholeList.push(...expandedMiddlewareList);
				return wholeList;
			}, []);
		};
		const stack = {
			add: (middleware, options = {}) => {
				const { name, override, aliases: _aliases } = options;
				const entry = {
					step: "initialize",
					priority: "normal",
					middleware,
					...options
				};
				const aliases = getAllAliases(name, _aliases);
				if (aliases.length > 0) {
					if (aliases.some((alias) => entriesNameSet.has(alias))) {
						if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
						for (const alias of aliases) {
							const toOverrideIndex = absoluteEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
							if (toOverrideIndex === -1) continue;
							const toOverride = absoluteEntries[toOverrideIndex];
							if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ${entry.priority} priority in ${entry.step} step.`);
							absoluteEntries.splice(toOverrideIndex, 1);
						}
					}
					for (const alias of aliases) entriesNameSet.add(alias);
				}
				absoluteEntries.push(entry);
			},
			addRelativeTo: (middleware, options) => {
				const { name, override, aliases: _aliases } = options;
				const entry = {
					middleware,
					...options
				};
				const aliases = getAllAliases(name, _aliases);
				if (aliases.length > 0) {
					if (aliases.some((alias) => entriesNameSet.has(alias))) {
						if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
						for (const alias of aliases) {
							const toOverrideIndex = relativeEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
							if (toOverrideIndex === -1) continue;
							const toOverride = relativeEntries[toOverrideIndex];
							if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} "${entry.toMiddleware}" middleware.`);
							relativeEntries.splice(toOverrideIndex, 1);
						}
					}
					for (const alias of aliases) entriesNameSet.add(alias);
				}
				relativeEntries.push(entry);
			},
			clone: () => cloneTo(constructStack()),
			use: (plugin) => {
				plugin.applyToStack(stack);
			},
			remove: (toRemove) => {
				if (typeof toRemove === "string") return removeByName(toRemove);
				else return removeByReference(toRemove);
			},
			removeByTag: (toRemove) => {
				let isRemoved = false;
				const filterCb = (entry) => {
					const { tags, name, aliases: _aliases } = entry;
					if (tags && tags.includes(toRemove)) {
						const aliases = getAllAliases(name, _aliases);
						for (const alias of aliases) entriesNameSet.delete(alias);
						isRemoved = true;
						return false;
					}
					return true;
				};
				absoluteEntries = absoluteEntries.filter(filterCb);
				relativeEntries = relativeEntries.filter(filterCb);
				return isRemoved;
			},
			concat: (from) => {
				const cloned = cloneTo(constructStack());
				cloned.use(from);
				cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
				return cloned;
			},
			applyToStack: cloneTo,
			identify: () => {
				return getMiddlewareList(true).map((mw) => {
					const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
					return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
				});
			},
			identifyOnResolve(toggle) {
				if (typeof toggle === "boolean") identifyOnResolve = toggle;
				return identifyOnResolve;
			},
			resolve: (handler, context) => {
				for (const middleware of getMiddlewareList().map((entry) => entry.middleware).reverse()) handler = middleware(handler, context);
				if (identifyOnResolve) console.log(stack.identify());
				return handler;
			}
		};
		return stack;
	};
	stepWeights = {
		initialize: 5,
		serialize: 4,
		build: 3,
		finalizeRequest: 2,
		deserialize: 1
	};
	priorityWeights = {
		high: 3,
		normal: 2,
		low: 1
	};
}));
var init_dist_es$24 = __esmMin((() => {
	init_MiddlewareStack();
}));
var Client;
var init_client = __esmMin((() => {
	init_dist_es$24();
	Client = class {
		config;
		middlewareStack = constructStack();
		initConfig;
		handlers;
		constructor(config) {
			this.config = config;
			const { protocol, protocolSettings } = config;
			if (protocolSettings) {
				if (typeof protocol === "function") config.protocol = new protocol(protocolSettings);
			}
		}
		send(command, optionsOrCb, cb) {
			const options = typeof optionsOrCb !== "function" ? optionsOrCb : void 0;
			const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
			const useHandlerCache = options === void 0 && this.config.cacheMiddleware === true;
			let handler;
			if (useHandlerCache) {
				if (!this.handlers) this.handlers = /* @__PURE__ */ new WeakMap();
				const handlers = this.handlers;
				if (handlers.has(command.constructor)) handler = handlers.get(command.constructor);
				else {
					handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
					handlers.set(command.constructor, handler);
				}
			} else {
				delete this.handlers;
				handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
			}
			if (callback) handler(command).then((result) => callback(null, result.output), (err) => callback(err)).catch(() => {});
			else return handler(command).then((result) => result.output);
		}
		destroy() {
			this.config?.requestHandler?.destroy?.();
			delete this.handlers;
		}
	};
}));
var import_protocols$3;
var init_collect_stream_body = __esmMin((() => {
	import_protocols$3 = require_protocols$1();
}));
function schemaLogFilter(schema, data) {
	if (data == null) return data;
	const ns = import_schema$1.NormalizedSchema.of(schema);
	if (ns.getMergedTraits().sensitive) return SENSITIVE_STRING$1;
	if (ns.isListSchema()) {
		if (!!ns.getValueSchema().getMergedTraits().sensitive) return SENSITIVE_STRING$1;
	} else if (ns.isMapSchema()) {
		if (!!ns.getKeySchema().getMergedTraits().sensitive || !!ns.getValueSchema().getMergedTraits().sensitive) return SENSITIVE_STRING$1;
	} else if (ns.isStructSchema() && typeof data === "object") {
		const object = data;
		const newObject = {};
		for (const [member, memberNs] of ns.structIterator()) if (object[member] != null) newObject[member] = schemaLogFilter(memberNs, object[member]);
		return newObject;
	}
	return data;
}
var import_schema$1, SENSITIVE_STRING$1;
var init_schemaLogFilter = __esmMin((() => {
	import_schema$1 = require_schema();
	SENSITIVE_STRING$1 = "***SensitiveInformation***";
}));
var Command, ClassBuilder;
var init_command = __esmMin((() => {
	init_dist_es$24();
	init_dist_es$42();
	init_schemaLogFilter();
	Command = class {
		middlewareStack = constructStack();
		schema;
		static classBuilder() {
			return new ClassBuilder();
		}
		resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor }) {
			for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) this.middlewareStack.use(mw);
			const stack = clientStack.concat(this.middlewareStack);
			const { logger } = configuration;
			const handlerExecutionContext = {
				logger,
				clientName,
				commandName,
				inputFilterSensitiveLog,
				outputFilterSensitiveLog,
				[SMITHY_CONTEXT_KEY]: {
					commandInstance: this,
					...smithyContext
				},
				...additionalContext
			};
			const { requestHandler } = configuration;
			return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
		}
	};
	ClassBuilder = class {
		_init = () => {};
		_ep = {};
		_middlewareFn = () => [];
		_commandName = "";
		_clientName = "";
		_additionalContext = {};
		_smithyContext = {};
		_inputFilterSensitiveLog = void 0;
		_outputFilterSensitiveLog = void 0;
		_serializer = null;
		_deserializer = null;
		_operationSchema;
		init(cb) {
			this._init = cb;
		}
		ep(endpointParameterInstructions) {
			this._ep = endpointParameterInstructions;
			return this;
		}
		m(middlewareSupplier) {
			this._middlewareFn = middlewareSupplier;
			return this;
		}
		s(service, operation, smithyContext = {}) {
			this._smithyContext = {
				service,
				operation,
				...smithyContext
			};
			return this;
		}
		c(additionalContext = {}) {
			this._additionalContext = additionalContext;
			return this;
		}
		n(clientName, commandName) {
			this._clientName = clientName;
			this._commandName = commandName;
			return this;
		}
		f(inputFilter = (_) => _, outputFilter = (_) => _) {
			this._inputFilterSensitiveLog = inputFilter;
			this._outputFilterSensitiveLog = outputFilter;
			return this;
		}
		ser(serializer) {
			this._serializer = serializer;
			return this;
		}
		de(deserializer) {
			this._deserializer = deserializer;
			return this;
		}
		sc(operation) {
			this._operationSchema = operation;
			this._smithyContext.operationSchema = operation;
			return this;
		}
		build() {
			const closure = this;
			let CommandRef;
			return CommandRef = class extends Command {
				input;
				static getEndpointParameterInstructions() {
					return closure._ep;
				}
				constructor(...[input]) {
					super();
					this.input = input ?? {};
					closure._init(this);
					this.schema = closure._operationSchema;
				}
				resolveMiddleware(stack, configuration, options) {
					const op = closure._operationSchema;
					const input = op?.[4] ?? op?.input;
					const output = op?.[5] ?? op?.output;
					return this.resolveMiddlewareWithContext(stack, configuration, options, {
						CommandCtor: CommandRef,
						middlewareFn: closure._middlewareFn,
						clientName: closure._clientName,
						commandName: closure._commandName,
						inputFilterSensitiveLog: closure._inputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, input) : (_) => _),
						outputFilterSensitiveLog: closure._outputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, output) : (_) => _),
						smithyContext: closure._smithyContext,
						additionalContext: closure._additionalContext
					});
				}
				serialize = closure._serializer;
				deserialize = closure._deserializer;
			};
		}
	};
}));
var SENSITIVE_STRING;
var init_constants$5 = __esmMin((() => {
	SENSITIVE_STRING = "***SensitiveInformation***";
}));
var createAggregatedClient;
var init_create_aggregated_client = __esmMin((() => {
	createAggregatedClient = (commands, Client, options) => {
		for (const [command, CommandCtor] of Object.entries(commands)) {
			const methodImpl = async function(args, optionsOrCb, cb) {
				const command = new CommandCtor(args);
				if (typeof optionsOrCb === "function") this.send(command, optionsOrCb);
				else if (typeof cb === "function") {
					if (typeof optionsOrCb !== "object") throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
					this.send(command, optionsOrCb || {}, cb);
				} else return this.send(command, optionsOrCb);
			};
			const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
			Client.prototype[methodName] = methodImpl;
		}
		const { paginators = {}, waiters = {} } = options ?? {};
		for (const [paginatorName, paginatorFn] of Object.entries(paginators)) if (Client.prototype[paginatorName] === void 0) Client.prototype[paginatorName] = function(commandInput = {}, paginationConfiguration, ...rest) {
			return paginatorFn({
				...paginationConfiguration,
				client: this
			}, commandInput, ...rest);
		};
		for (const [waiterName, waiterFn] of Object.entries(waiters)) if (Client.prototype[waiterName] === void 0) Client.prototype[waiterName] = async function(commandInput = {}, waiterConfiguration, ...rest) {
			let config = waiterConfiguration;
			if (typeof waiterConfiguration === "number") config = { maxWaitTime: waiterConfiguration };
			return waiterFn({
				...config,
				client: this
			}, commandInput, ...rest);
		};
	};
}));
var ServiceException, decorateServiceException;
var init_exceptions = __esmMin((() => {
	ServiceException = class ServiceException extends Error {
		$fault;
		$response;
		$retryable;
		$metadata;
		constructor(options) {
			super(options.message);
			Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype);
			this.name = options.name;
			this.$fault = options.$fault;
			this.$metadata = options.$metadata;
		}
		static isInstance(value) {
			if (!value) return false;
			const candidate = value;
			return ServiceException.prototype.isPrototypeOf(candidate) || Boolean(candidate.$fault) && Boolean(candidate.$metadata) && (candidate.$fault === "client" || candidate.$fault === "server");
		}
		static [Symbol.hasInstance](instance) {
			if (!instance) return false;
			const candidate = instance;
			if (this === ServiceException) return ServiceException.isInstance(instance);
			if (ServiceException.isInstance(instance)) {
				if (candidate.name && this.name) return this.prototype.isPrototypeOf(instance) || candidate.name === this.name;
				return this.prototype.isPrototypeOf(instance);
			}
			return false;
		}
	};
	decorateServiceException = (exception, additions = {}) => {
		Object.entries(additions).filter(([, v]) => v !== void 0).forEach(([k, v]) => {
			if (exception[k] == void 0 || exception[k] === "") exception[k] = v;
		});
		exception.message = exception.message || exception.Message || "UnknownError";
		delete exception.Message;
		return exception;
	};
}));
var throwDefaultError, withBaseException, deserializeMetadata;
var init_default_error_handler = __esmMin((() => {
	init_exceptions();
	throwDefaultError = ({ output, parsedBody, exceptionCtor, errorCode }) => {
		const $metadata = deserializeMetadata(output);
		const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : void 0;
		throw decorateServiceException(new exceptionCtor({
			name: parsedBody?.code || parsedBody?.Code || errorCode || statusCode || "UnknownError",
			$fault: "client",
			$metadata
		}), parsedBody);
	};
	withBaseException = (ExceptionCtor) => {
		return ({ output, parsedBody, errorCode }) => {
			throwDefaultError({
				output,
				parsedBody,
				exceptionCtor: ExceptionCtor,
				errorCode
			});
		};
	};
	deserializeMetadata = (output) => ({
		httpStatusCode: output.statusCode,
		requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
		extendedRequestId: output.headers["x-amz-id-2"],
		cfId: output.headers["x-amz-cf-id"]
	});
}));
var loadConfigsForDefaultMode;
var init_defaults_mode = __esmMin((() => {
	loadConfigsForDefaultMode = (mode) => {
		switch (mode) {
			case "standard": return {
				retryMode: "standard",
				connectionTimeout: 3100
			};
			case "in-region": return {
				retryMode: "standard",
				connectionTimeout: 1100
			};
			case "cross-region": return {
				retryMode: "standard",
				connectionTimeout: 3100
			};
			case "mobile": return {
				retryMode: "standard",
				connectionTimeout: 3e4
			};
			default: return {};
		}
	};
}));
var warningEmitted, emitWarningIfUnsupportedVersion;
var init_emitWarningIfUnsupportedVersion = __esmMin((() => {
	warningEmitted = false;
	emitWarningIfUnsupportedVersion = (version) => {
		if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 16) warningEmitted = true;
	};
}));
var import_protocols$2;
var init_extended_encode_uri_component = __esmMin((() => {
	import_protocols$2 = require_protocols$1();
}));
var getChecksumConfiguration, resolveChecksumRuntimeConfig;
var init_checksum = __esmMin((() => {
	init_dist_es$42();
	getChecksumConfiguration = (runtimeConfig) => {
		const checksumAlgorithms = [];
		for (const id in AlgorithmId) {
			const algorithmId = AlgorithmId[id];
			if (runtimeConfig[algorithmId] === void 0) continue;
			checksumAlgorithms.push({
				algorithmId: () => algorithmId,
				checksumConstructor: () => runtimeConfig[algorithmId]
			});
		}
		return {
			addChecksumAlgorithm(algo) {
				checksumAlgorithms.push(algo);
			},
			checksumAlgorithms() {
				return checksumAlgorithms;
			}
		};
	};
	resolveChecksumRuntimeConfig = (clientConfig) => {
		const runtimeConfig = {};
		clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
			runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
		});
		return runtimeConfig;
	};
}));
var getRetryConfiguration, resolveRetryRuntimeConfig;
var init_retry = __esmMin((() => {
	getRetryConfiguration = (runtimeConfig) => {
		return {
			setRetryStrategy(retryStrategy) {
				runtimeConfig.retryStrategy = retryStrategy;
			},
			retryStrategy() {
				return runtimeConfig.retryStrategy;
			}
		};
	};
	resolveRetryRuntimeConfig = (retryStrategyConfiguration) => {
		const runtimeConfig = {};
		runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
		return runtimeConfig;
	};
}));
var getDefaultExtensionConfiguration, getDefaultClientConfiguration, resolveDefaultRuntimeConfig;
var init_defaultExtensionConfiguration = __esmMin((() => {
	init_checksum();
	init_retry();
	getDefaultExtensionConfiguration = (runtimeConfig) => {
		return Object.assign(getChecksumConfiguration(runtimeConfig), getRetryConfiguration(runtimeConfig));
	};
	getDefaultClientConfiguration = getDefaultExtensionConfiguration;
	resolveDefaultRuntimeConfig = (config) => {
		return Object.assign(resolveChecksumRuntimeConfig(config), resolveRetryRuntimeConfig(config));
	};
}));
var init_extensions$1 = __esmMin((() => {
	init_defaultExtensionConfiguration();
}));
var getArrayIfSingleItem;
var init_get_array_if_single_item = __esmMin((() => {
	getArrayIfSingleItem = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
}));
var getValueFromTextNode;
var init_get_value_from_text_node = __esmMin((() => {
	getValueFromTextNode = (obj) => {
		const textNodeName = "#text";
		for (const key in obj) if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== void 0) obj[key] = obj[key][textNodeName];
		else if (typeof obj[key] === "object" && obj[key] !== null) obj[key] = getValueFromTextNode(obj[key]);
		return obj;
	};
}));
var isSerializableHeaderValue;
var init_is_serializable_header_value = __esmMin((() => {
	isSerializableHeaderValue = (value) => {
		return value != null;
	};
}));
var NoOpLogger;
var init_NoOpLogger = __esmMin((() => {
	NoOpLogger = class {
		trace() {}
		debug() {}
		info() {}
		warn() {}
		error() {}
	};
}));
function map(arg0, arg1, arg2) {
	let target;
	let filter;
	let instructions;
	if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
		target = {};
		instructions = arg0;
	} else {
		target = arg0;
		if (typeof arg1 === "function") {
			filter = arg1;
			instructions = arg2;
			return mapWithFilter(target, filter, instructions);
		} else instructions = arg1;
	}
	for (const key of Object.keys(instructions)) {
		if (!Array.isArray(instructions[key])) {
			target[key] = instructions[key];
			continue;
		}
		applyInstruction(target, null, instructions, key);
	}
	return target;
}
var convertMap, take, mapWithFilter, applyInstruction, nonNullish, pass;
var init_object_mapping = __esmMin((() => {
	convertMap = (target) => {
		const output = {};
		for (const [k, v] of Object.entries(target || {})) output[k] = [, v];
		return output;
	};
	take = (source, instructions) => {
		const out = {};
		for (const key in instructions) applyInstruction(out, source, instructions, key);
		return out;
	};
	mapWithFilter = (target, filter, instructions) => {
		return map(target, Object.entries(instructions).reduce((_instructions, [key, value]) => {
			if (Array.isArray(value)) _instructions[key] = value;
			else if (typeof value === "function") _instructions[key] = [filter, value()];
			else _instructions[key] = [filter, value];
			return _instructions;
		}, {}));
	};
	applyInstruction = (target, source, instructions, targetKey) => {
		if (source !== null) {
			let instruction = instructions[targetKey];
			if (typeof instruction === "function") instruction = [, instruction];
			const [filter = nonNullish, valueFn = pass, sourceKey = targetKey] = instruction;
			if (typeof filter === "function" && filter(source[sourceKey]) || typeof filter !== "function" && !!filter) target[targetKey] = valueFn(source[sourceKey]);
			return;
		}
		let [filter, value] = instructions[targetKey];
		if (typeof value === "function") {
			let _value;
			const defaultFilterPassed = filter === void 0 && (_value = value()) != null;
			const customFilterPassed = typeof filter === "function" && !!filter(void 0) || typeof filter !== "function" && !!filter;
			if (defaultFilterPassed) target[targetKey] = _value;
			else if (customFilterPassed) target[targetKey] = value();
		} else {
			const defaultFilterPassed = filter === void 0 && value != null;
			const customFilterPassed = typeof filter === "function" && !!filter(value) || typeof filter !== "function" && !!filter;
			if (defaultFilterPassed || customFilterPassed) target[targetKey] = value;
		}
	};
	nonNullish = (_) => _ != null;
	pass = (_) => _;
}));
var import_protocols$1;
var init_resolve_path = __esmMin((() => {
	import_protocols$1 = require_protocols$1();
}));
var serializeFloat, serializeDateTime;
var init_ser_utils = __esmMin((() => {
	serializeFloat = (value) => {
		if (value !== value) return "NaN";
		switch (value) {
			case Infinity: return "Infinity";
			case -Infinity: return "-Infinity";
			default: return value;
		}
	};
	serializeDateTime = (date) => date.toISOString().replace(".000Z", "Z");
}));
var _json;
var init_serde_json = __esmMin((() => {
	_json = (obj) => {
		if (obj == null) return {};
		if (Array.isArray(obj)) return obj.filter((_) => _ != null).map(_json);
		if (typeof obj === "object") {
			const target = {};
			for (const key of Object.keys(obj)) {
				if (obj[key] == null) continue;
				target[key] = _json(obj[key]);
			}
			return target;
		}
		return obj;
	};
}));
var dist_es_exports$19 = /* @__PURE__ */ __exportAll({
	Client: () => Client,
	Command: () => Command,
	NoOpLogger: () => NoOpLogger,
	SENSITIVE_STRING: () => SENSITIVE_STRING,
	ServiceException: () => ServiceException,
	_json: () => _json,
	collectBody: () => import_protocols$3.collectBody,
	convertMap: () => convertMap,
	createAggregatedClient: () => createAggregatedClient,
	decorateServiceException: () => decorateServiceException,
	emitWarningIfUnsupportedVersion: () => emitWarningIfUnsupportedVersion,
	extendedEncodeURIComponent: () => import_protocols$2.extendedEncodeURIComponent,
	getArrayIfSingleItem: () => getArrayIfSingleItem,
	getDefaultClientConfiguration: () => getDefaultClientConfiguration,
	getDefaultExtensionConfiguration: () => getDefaultExtensionConfiguration,
	getValueFromTextNode: () => getValueFromTextNode,
	isSerializableHeaderValue: () => isSerializableHeaderValue,
	loadConfigsForDefaultMode: () => loadConfigsForDefaultMode,
	map: () => map,
	resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig,
	resolvedPath: () => import_protocols$1.resolvedPath,
	serializeDateTime: () => serializeDateTime,
	serializeFloat: () => serializeFloat,
	take: () => take,
	throwDefaultError: () => throwDefaultError,
	withBaseException: () => withBaseException
});
var init_dist_es$23 = __esmMin((() => {
	init_client();
	init_collect_stream_body();
	init_command();
	init_constants$5();
	init_create_aggregated_client();
	init_default_error_handler();
	init_defaults_mode();
	init_emitWarningIfUnsupportedVersion();
	init_exceptions();
	init_extended_encode_uri_component();
	init_extensions$1();
	init_get_array_if_single_item();
	init_get_value_from_text_node();
	init_is_serializable_header_value();
	init_NoOpLogger();
	init_object_mapping();
	init_resolve_path();
	init_ser_utils();
	init_serde_json();
	__reExport(dist_es_exports$19, /* @__PURE__ */ __toESM(require_serde()));
}));
function escapeAttribute(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
var init_escape_attribute = __esmMin((() => {}));
function escapeElement(value) {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#x0D;").replace(/\n/g, "&#x0A;").replace(/\u0085/g, "&#x85;").replace(/\u2028/, "&#x2028;");
}
var init_escape_element = __esmMin((() => {}));
var XmlText;
var init_XmlText = __esmMin((() => {
	init_escape_element();
	XmlText = class {
		value;
		constructor(value) {
			this.value = value;
		}
		toString() {
			return escapeElement("" + this.value);
		}
	};
}));
var XmlNode$1;
var init_XmlNode = __esmMin((() => {
	init_escape_attribute();
	init_XmlText();
	XmlNode$1 = class XmlNode$1 {
		name;
		children;
		attributes = {};
		static of(name, childText, withName) {
			const node = new XmlNode$1(name);
			if (childText !== void 0) node.addChildNode(new XmlText(childText));
			if (withName !== void 0) node.withName(withName);
			return node;
		}
		constructor(name, children = []) {
			this.name = name;
			this.children = children;
		}
		withName(name) {
			this.name = name;
			return this;
		}
		addAttribute(name, value) {
			this.attributes[name] = value;
			return this;
		}
		addChildNode(child) {
			this.children.push(child);
			return this;
		}
		removeAttribute(name) {
			delete this.attributes[name];
			return this;
		}
		n(name) {
			this.name = name;
			return this;
		}
		c(child) {
			this.children.push(child);
			return this;
		}
		a(name, value) {
			if (value != null) this.attributes[name] = value;
			return this;
		}
		cc(input, field, withName = field) {
			if (input[field] != null) {
				const node = XmlNode$1.of(field, input[field]).withName(withName);
				this.c(node);
			}
		}
		l(input, listName, memberName, valueProvider) {
			if (input[listName] != null) valueProvider().map((node) => {
				node.withName(memberName);
				this.c(node);
			});
		}
		lc(input, listName, memberName, valueProvider) {
			if (input[listName] != null) {
				const nodes = valueProvider();
				const containerNode = new XmlNode$1(memberName);
				nodes.map((node) => {
					containerNode.c(node);
				});
				this.c(containerNode);
			}
		}
		toString() {
			const hasChildren = Boolean(this.children.length);
			let xmlText = `<${this.name}`;
			const attributes = this.attributes;
			for (const attributeName of Object.keys(attributes)) {
				const attribute = attributes[attributeName];
				if (attribute != null) xmlText += ` ${attributeName}="${escapeAttribute("" + attribute)}"`;
			}
			return xmlText += !hasChildren ? "/>" : `>${this.children.map((c) => c.toString()).join("")}</${this.name}>`;
		}
	};
}));
function getAllMatches(string, regex) {
	const matches = [];
	let match = regex.exec(string);
	while (match) {
		const allmatches = [];
		allmatches.startIndex = regex.lastIndex - match[0].length;
		const len = match.length;
		for (let index = 0; index < len; index++) allmatches.push(match[index]);
		matches.push(allmatches);
		match = regex.exec(string);
	}
	return matches;
}
function isExist(v) {
	return typeof v !== "undefined";
}
var nameStartChar, nameRegexp, regexName, isName;
var init_util$1 = __esmMin((() => {
	nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
	nameStartChar + "";
	nameRegexp = "[" + nameStartChar + "][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*";
	regexName = new RegExp("^" + nameRegexp + "$");
	isName = function(string) {
		const match = regexName.exec(string);
		return !(match === null || typeof match === "undefined");
	};
}));
function validate$1(xmlData, options) {
	options = Object.assign({}, defaultOptions$1, options);
	const tags = [];
	let tagFound = false;
	let reachedRoot = false;
	if (xmlData[0] === "﻿") xmlData = xmlData.substr(1);
	for (let i = 0; i < xmlData.length; i++) if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
		i += 2;
		i = readPI(xmlData, i);
		if (i.err) return i;
	} else if (xmlData[i] === "<") {
		let tagStartPos = i;
		i++;
		if (xmlData[i] === "!") {
			i = readCommentAndCDATA(xmlData, i);
			continue;
		} else {
			let closingTag = false;
			if (xmlData[i] === "/") {
				closingTag = true;
				i++;
			}
			let tagName = "";
			for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) tagName += xmlData[i];
			tagName = tagName.trim();
			if (tagName[tagName.length - 1] === "/") {
				tagName = tagName.substring(0, tagName.length - 1);
				i--;
			}
			if (!validateTagName(tagName)) {
				let msg;
				if (tagName.trim().length === 0) msg = "Invalid space after '<'.";
				else msg = "Tag '" + tagName + "' is an invalid name.";
				return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
			}
			const result = readAttributeStr(xmlData, i);
			if (result === false) return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
			let attrStr = result.value;
			i = result.index;
			if (attrStr[attrStr.length - 1] === "/") {
				const attrStrStart = i - attrStr.length;
				attrStr = attrStr.substring(0, attrStr.length - 1);
				const isValid = validateAttributeString(attrStr, options);
				if (isValid === true) tagFound = true;
				else return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
			} else if (closingTag) if (!result.tagClosed) return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
			else if (attrStr.trim().length > 0) return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
			else if (tags.length === 0) return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
			else {
				const otg = tags.pop();
				if (tagName !== otg.tagName) {
					let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
					return getErrorObject("InvalidTag", "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
				}
				if (tags.length == 0) reachedRoot = true;
			}
			else {
				const isValid = validateAttributeString(attrStr, options);
				if (isValid !== true) return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
				if (reachedRoot === true) return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
				else if (options.unpairedTags.indexOf(tagName) !== -1) {} else tags.push({
					tagName,
					tagStartPos
				});
				tagFound = true;
			}
			for (i++; i < xmlData.length; i++) if (xmlData[i] === "<") if (xmlData[i + 1] === "!") {
				i++;
				i = readCommentAndCDATA(xmlData, i);
				continue;
			} else if (xmlData[i + 1] === "?") {
				i = readPI(xmlData, ++i);
				if (i.err) return i;
			} else break;
			else if (xmlData[i] === "&") {
				const afterAmp = validateAmpersand(xmlData, i);
				if (afterAmp == -1) return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
				i = afterAmp;
			} else if (reachedRoot === true && !isWhiteSpace(xmlData[i])) return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
			if (xmlData[i] === "<") i--;
		}
	} else {
		if (isWhiteSpace(xmlData[i])) continue;
		return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
	}
	if (!tagFound) return getErrorObject("InvalidXml", "Start tag expected.", 1);
	else if (tags.length == 1) return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
	else if (tags.length > 0) return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", {
		line: 1,
		col: 1
	});
	return true;
}
function isWhiteSpace(char) {
	return char === " " || char === "	" || char === "\n" || char === "\r";
}
/**
* Read Processing insstructions and skip
* @param {*} xmlData
* @param {*} i
*/
function readPI(xmlData, i) {
	const start = i;
	for (; i < xmlData.length; i++) if (xmlData[i] == "?" || xmlData[i] == " ") {
		const tagname = xmlData.substr(start, i - start);
		if (i > 5 && tagname === "xml") return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
		else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
			i++;
			break;
		} else continue;
	}
	return i;
}
function readCommentAndCDATA(xmlData, i) {
	if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
		for (i += 3; i < xmlData.length; i++) if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
			i += 2;
			break;
		}
	} else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
		let angleBracketsCount = 1;
		for (i += 8; i < xmlData.length; i++) if (xmlData[i] === "<") angleBracketsCount++;
		else if (xmlData[i] === ">") {
			angleBracketsCount--;
			if (angleBracketsCount === 0) break;
		}
	} else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
		for (i += 8; i < xmlData.length; i++) if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
			i += 2;
			break;
		}
	}
	return i;
}
/**
* Keep reading xmlData until '<' is found outside the attribute value.
* @param {string} xmlData
* @param {number} i
*/
function readAttributeStr(xmlData, i) {
	let attrStr = "";
	let startChar = "";
	let tagClosed = false;
	for (; i < xmlData.length; i++) {
		if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) if (startChar === "") startChar = xmlData[i];
		else if (startChar !== xmlData[i]) {} else startChar = "";
		else if (xmlData[i] === ">") {
			if (startChar === "") {
				tagClosed = true;
				break;
			}
		}
		attrStr += xmlData[i];
	}
	if (startChar !== "") return false;
	return {
		value: attrStr,
		index: i,
		tagClosed
	};
}
function validateAttributeString(attrStr, options) {
	const matches = getAllMatches(attrStr, validAttrStrRegxp);
	const attrNames = {};
	for (let i = 0; i < matches.length; i++) {
		if (matches[i][1].length === 0) return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
		else if (matches[i][3] !== void 0 && matches[i][4] === void 0) return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
		else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
		const attrName = matches[i][2];
		if (!validateAttrName(attrName)) return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
		if (!attrNames.hasOwnProperty(attrName)) attrNames[attrName] = 1;
		else return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
	}
	return true;
}
function validateNumberAmpersand(xmlData, i) {
	let re = /\d/;
	if (xmlData[i] === "x") {
		i++;
		re = /[\da-fA-F]/;
	}
	for (; i < xmlData.length; i++) {
		if (xmlData[i] === ";") return i;
		if (!xmlData[i].match(re)) break;
	}
	return -1;
}
function validateAmpersand(xmlData, i) {
	i++;
	if (xmlData[i] === ";") return -1;
	if (xmlData[i] === "#") {
		i++;
		return validateNumberAmpersand(xmlData, i);
	}
	let count = 0;
	for (; i < xmlData.length; i++, count++) {
		if (xmlData[i].match(/\w/) && count < 20) continue;
		if (xmlData[i] === ";") break;
		return -1;
	}
	return i;
}
function getErrorObject(code, message, lineNumber) {
	return { err: {
		code,
		msg: message,
		line: lineNumber.line || lineNumber,
		col: lineNumber.col
	} };
}
function validateAttrName(attrName) {
	return isName(attrName);
}
function validateTagName(tagname) {
	return isName(tagname);
}
function getLineNumberForPosition(xmlData, index) {
	const lines = xmlData.substring(0, index).split(/\r?\n/);
	return {
		line: lines.length,
		col: lines[lines.length - 1].length + 1
	};
}
function getPositionFromMatch(match) {
	return match.startIndex + match[1].length;
}
var defaultOptions$1, doubleQuote, singleQuote, validAttrStrRegxp;
var init_validator = __esmMin((() => {
	init_util$1();
	defaultOptions$1 = {
		allowBooleanAttributes: false,
		unpairedTags: []
	};
	doubleQuote = "\"";
	singleQuote = "'";
	validAttrStrRegxp = /* @__PURE__ */ new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?", "g");
}));
var defaultOptions, buildOptions;
var init_OptionsBuilder = __esmMin((() => {
	defaultOptions = {
		preserveOrder: false,
		attributeNamePrefix: "@_",
		attributesGroupName: false,
		textNodeName: "#text",
		ignoreAttributes: true,
		removeNSPrefix: false,
		allowBooleanAttributes: false,
		parseTagValue: true,
		parseAttributeValue: false,
		trimValues: true,
		cdataPropName: false,
		numberParseOptions: {
			hex: true,
			leadingZeros: true,
			eNotation: true
		},
		tagValueProcessor: function(tagName, val) {
			return val;
		},
		attributeValueProcessor: function(attrName, val) {
			return val;
		},
		stopNodes: [],
		alwaysCreateTextNode: false,
		isArray: () => false,
		commentPropName: false,
		unpairedTags: [],
		processEntities: true,
		htmlEntities: false,
		ignoreDeclaration: false,
		ignorePiTags: false,
		transformTagName: false,
		transformAttributeName: false,
		updateTag: function(tagName, jPath, attrs) {
			return tagName;
		},
		captureMetaData: false
	};
	buildOptions = function(options) {
		return Object.assign({}, defaultOptions, options);
	};
}));
var METADATA_SYMBOL$1, XmlNode;
var init_xmlNode = __esmMin((() => {
	if (typeof Symbol !== "function") METADATA_SYMBOL$1 = "@@xmlMetadata";
	else METADATA_SYMBOL$1 = Symbol("XML Node Metadata");
	XmlNode = class {
		constructor(tagname) {
			this.tagname = tagname;
			this.child = [];
			this[":@"] = {};
		}
		add(key, val) {
			if (key === "__proto__") key = "#__proto__";
			this.child.push({ [key]: val });
		}
		addChild(node, startIndex) {
			if (node.tagname === "__proto__") node.tagname = "#__proto__";
			if (node[":@"] && Object.keys(node[":@"]).length > 0) this.child.push({
				[node.tagname]: node.child,
				[":@"]: node[":@"]
			});
			else this.child.push({ [node.tagname]: node.child });
			if (startIndex !== void 0) this.child[this.child.length - 1][METADATA_SYMBOL$1] = { startIndex };
		}
		/** symbol used for metadata */
		static getMetaDataSymbol() {
			return METADATA_SYMBOL$1;
		}
	};
}));
function hasSeq(data, seq, i) {
	for (let j = 0; j < seq.length; j++) if (seq[j] !== data[i + j + 1]) return false;
	return true;
}
function validateEntityName(name) {
	if (isName(name)) return name;
	else throw new Error(`Invalid entity name ${name}`);
}
var DocTypeReader, skipWhitespace;
var init_DocTypeReader = __esmMin((() => {
	init_util$1();
	DocTypeReader = class {
		constructor(processEntities) {
			this.suppressValidationErr = !processEntities;
		}
		readDocType(xmlData, i) {
			const entities = {};
			if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
				i = i + 9;
				let angleBracketsCount = 1;
				let hasBody = false, comment = false;
				let exp = "";
				for (; i < xmlData.length; i++) if (xmlData[i] === "<" && !comment) {
					if (hasBody && hasSeq(xmlData, "!ENTITY", i)) {
						i += 7;
						let entityName, val;
						[entityName, val, i] = this.readEntityExp(xmlData, i + 1, this.suppressValidationErr);
						if (val.indexOf("&") === -1) entities[entityName] = {
							regx: RegExp(`&${entityName};`, "g"),
							val
						};
					} else if (hasBody && hasSeq(xmlData, "!ELEMENT", i)) {
						i += 8;
						const { index } = this.readElementExp(xmlData, i + 1);
						i = index;
					} else if (hasBody && hasSeq(xmlData, "!ATTLIST", i)) i += 8;
					else if (hasBody && hasSeq(xmlData, "!NOTATION", i)) {
						i += 9;
						const { index } = this.readNotationExp(xmlData, i + 1, this.suppressValidationErr);
						i = index;
					} else if (hasSeq(xmlData, "!--", i)) comment = true;
					else throw new Error(`Invalid DOCTYPE`);
					angleBracketsCount++;
					exp = "";
				} else if (xmlData[i] === ">") {
					if (comment) {
						if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
							comment = false;
							angleBracketsCount--;
						}
					} else angleBracketsCount--;
					if (angleBracketsCount === 0) break;
				} else if (xmlData[i] === "[") hasBody = true;
				else exp += xmlData[i];
				if (angleBracketsCount !== 0) throw new Error(`Unclosed DOCTYPE`);
			} else throw new Error(`Invalid Tag instead of DOCTYPE`);
			return {
				entities,
				i
			};
		}
		readEntityExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			let entityName = "";
			while (i < xmlData.length && !/\s/.test(xmlData[i]) && xmlData[i] !== "\"" && xmlData[i] !== "'") {
				entityName += xmlData[i];
				i++;
			}
			validateEntityName(entityName);
			i = skipWhitespace(xmlData, i);
			if (!this.suppressValidationErr) {
				if (xmlData.substring(i, i + 6).toUpperCase() === "SYSTEM") throw new Error("External entities are not supported");
				else if (xmlData[i] === "%") throw new Error("Parameter entities are not supported");
			}
			let entityValue = "";
			[i, entityValue] = this.readIdentifierVal(xmlData, i, "entity");
			i--;
			return [
				entityName,
				entityValue,
				i
			];
		}
		readNotationExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			let notationName = "";
			while (i < xmlData.length && !/\s/.test(xmlData[i])) {
				notationName += xmlData[i];
				i++;
			}
			!this.suppressValidationErr && validateEntityName(notationName);
			i = skipWhitespace(xmlData, i);
			const identifierType = xmlData.substring(i, i + 6).toUpperCase();
			if (!this.suppressValidationErr && identifierType !== "SYSTEM" && identifierType !== "PUBLIC") throw new Error(`Expected SYSTEM or PUBLIC, found "${identifierType}"`);
			i += identifierType.length;
			i = skipWhitespace(xmlData, i);
			let publicIdentifier = null;
			let systemIdentifier = null;
			if (identifierType === "PUBLIC") {
				[i, publicIdentifier] = this.readIdentifierVal(xmlData, i, "publicIdentifier");
				i = skipWhitespace(xmlData, i);
				if (xmlData[i] === "\"" || xmlData[i] === "'") [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
			} else if (identifierType === "SYSTEM") {
				[i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
				if (!this.suppressValidationErr && !systemIdentifier) throw new Error("Missing mandatory system identifier for SYSTEM notation");
			}
			return {
				notationName,
				publicIdentifier,
				systemIdentifier,
				index: --i
			};
		}
		readIdentifierVal(xmlData, i, type) {
			let identifierVal = "";
			const startChar = xmlData[i];
			if (startChar !== "\"" && startChar !== "'") throw new Error(`Expected quoted string, found "${startChar}"`);
			i++;
			while (i < xmlData.length && xmlData[i] !== startChar) {
				identifierVal += xmlData[i];
				i++;
			}
			if (xmlData[i] !== startChar) throw new Error(`Unterminated ${type} value`);
			i++;
			return [i, identifierVal];
		}
		readElementExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			let elementName = "";
			while (i < xmlData.length && !/\s/.test(xmlData[i])) {
				elementName += xmlData[i];
				i++;
			}
			if (!this.suppressValidationErr && !isName(elementName)) throw new Error(`Invalid element name: "${elementName}"`);
			i = skipWhitespace(xmlData, i);
			let contentModel = "";
			if (xmlData[i] === "E" && hasSeq(xmlData, "MPTY", i)) i += 4;
			else if (xmlData[i] === "A" && hasSeq(xmlData, "NY", i)) i += 2;
			else if (xmlData[i] === "(") {
				i++;
				while (i < xmlData.length && xmlData[i] !== ")") {
					contentModel += xmlData[i];
					i++;
				}
				if (xmlData[i] !== ")") throw new Error("Unterminated content model");
			} else if (!this.suppressValidationErr) throw new Error(`Invalid Element Expression, found "${xmlData[i]}"`);
			return {
				elementName,
				contentModel: contentModel.trim(),
				index: i
			};
		}
		readAttlistExp(xmlData, i) {
			i = skipWhitespace(xmlData, i);
			let elementName = "";
			while (i < xmlData.length && !/\s/.test(xmlData[i])) {
				elementName += xmlData[i];
				i++;
			}
			validateEntityName(elementName);
			i = skipWhitespace(xmlData, i);
			let attributeName = "";
			while (i < xmlData.length && !/\s/.test(xmlData[i])) {
				attributeName += xmlData[i];
				i++;
			}
			if (!validateEntityName(attributeName)) throw new Error(`Invalid attribute name: "${attributeName}"`);
			i = skipWhitespace(xmlData, i);
			let attributeType = "";
			if (xmlData.substring(i, i + 8).toUpperCase() === "NOTATION") {
				attributeType = "NOTATION";
				i += 8;
				i = skipWhitespace(xmlData, i);
				if (xmlData[i] !== "(") throw new Error(`Expected '(', found "${xmlData[i]}"`);
				i++;
				let allowedNotations = [];
				while (i < xmlData.length && xmlData[i] !== ")") {
					let notation = "";
					while (i < xmlData.length && xmlData[i] !== "|" && xmlData[i] !== ")") {
						notation += xmlData[i];
						i++;
					}
					notation = notation.trim();
					if (!validateEntityName(notation)) throw new Error(`Invalid notation name: "${notation}"`);
					allowedNotations.push(notation);
					if (xmlData[i] === "|") {
						i++;
						i = skipWhitespace(xmlData, i);
					}
				}
				if (xmlData[i] !== ")") throw new Error("Unterminated list of notations");
				i++;
				attributeType += " (" + allowedNotations.join("|") + ")";
			} else {
				while (i < xmlData.length && !/\s/.test(xmlData[i])) {
					attributeType += xmlData[i];
					i++;
				}
				if (!this.suppressValidationErr && ![
					"CDATA",
					"ID",
					"IDREF",
					"IDREFS",
					"ENTITY",
					"ENTITIES",
					"NMTOKEN",
					"NMTOKENS"
				].includes(attributeType.toUpperCase())) throw new Error(`Invalid attribute type: "${attributeType}"`);
			}
			i = skipWhitespace(xmlData, i);
			let defaultValue = "";
			if (xmlData.substring(i, i + 8).toUpperCase() === "#REQUIRED") {
				defaultValue = "#REQUIRED";
				i += 8;
			} else if (xmlData.substring(i, i + 7).toUpperCase() === "#IMPLIED") {
				defaultValue = "#IMPLIED";
				i += 7;
			} else [i, defaultValue] = this.readIdentifierVal(xmlData, i, "ATTLIST");
			return {
				elementName,
				attributeName,
				attributeType,
				defaultValue,
				index: i
			};
		}
	};
	skipWhitespace = (data, index) => {
		while (index < data.length && /\s/.test(data[index])) index++;
		return index;
	};
}));
function toNumber(str, options = {}) {
	options = Object.assign({}, consider, options);
	if (!str || typeof str !== "string") return str;
	let trimmedStr = str.trim();
	if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) return str;
	else if (str === "0") return 0;
	else if (options.hex && hexRegex.test(trimmedStr)) return parse_int(trimmedStr, 16);
	else if (trimmedStr.includes("e") || trimmedStr.includes("E")) return resolveEnotation(str, trimmedStr, options);
	else {
		const match = numRegex.exec(trimmedStr);
		if (match) {
			const sign = match[1] || "";
			const leadingZeros = match[2];
			let numTrimmedByZeros = trimZeros(match[3]);
			const decimalAdjacentToLeadingZeros = sign ? str[leadingZeros.length + 1] === "." : str[leadingZeros.length] === ".";
			if (!options.leadingZeros && (leadingZeros.length > 1 || leadingZeros.length === 1 && !decimalAdjacentToLeadingZeros)) return str;
			else {
				const num = Number(trimmedStr);
				const parsedStr = String(num);
				if (num === 0) return num;
				if (parsedStr.search(/[eE]/) !== -1) if (options.eNotation) return num;
				else return str;
				else if (trimmedStr.indexOf(".") !== -1) if (parsedStr === "0") return num;
				else if (parsedStr === numTrimmedByZeros) return num;
				else if (parsedStr === `${sign}${numTrimmedByZeros}`) return num;
				else return str;
				let n = leadingZeros ? numTrimmedByZeros : trimmedStr;
				if (leadingZeros) return n === parsedStr || sign + n === parsedStr ? num : str;
				else return n === parsedStr || n === sign + parsedStr ? num : str;
			}
		} else return str;
	}
}
function resolveEnotation(str, trimmedStr, options) {
	if (!options.eNotation) return str;
	const notation = trimmedStr.match(eNotationRegx);
	if (notation) {
		let sign = notation[1] || "";
		const eChar = notation[3].indexOf("e") === -1 ? "E" : "e";
		const leadingZeros = notation[2];
		const eAdjacentToLeadingZeros = sign ? str[leadingZeros.length + 1] === eChar : str[leadingZeros.length] === eChar;
		if (leadingZeros.length > 1 && eAdjacentToLeadingZeros) return str;
		else if (leadingZeros.length === 1 && (notation[3].startsWith(`.${eChar}`) || notation[3][0] === eChar)) return Number(trimmedStr);
		else if (options.leadingZeros && !eAdjacentToLeadingZeros) {
			trimmedStr = (notation[1] || "") + notation[3];
			return Number(trimmedStr);
		} else return str;
	} else return str;
}
/**
* 
* @param {string} numStr without leading zeros
* @returns 
*/
function trimZeros(numStr) {
	if (numStr && numStr.indexOf(".") !== -1) {
		numStr = numStr.replace(/0+$/, "");
		if (numStr === ".") numStr = "0";
		else if (numStr[0] === ".") numStr = "0" + numStr;
		else if (numStr[numStr.length - 1] === ".") numStr = numStr.substring(0, numStr.length - 1);
		return numStr;
	}
	return numStr;
}
function parse_int(numStr, base) {
	if (parseInt) return parseInt(numStr, base);
	else if (Number.parseInt) return Number.parseInt(numStr, base);
	else if (window && window.parseInt) return window.parseInt(numStr, base);
	else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
var hexRegex, numRegex, consider, eNotationRegx;
var init_strnum = __esmMin((() => {
	hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
	numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
	consider = {
		hex: true,
		leadingZeros: true,
		decimalPoint: ".",
		eNotation: true
	};
	eNotationRegx = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
}));
function getIgnoreAttributesFn(ignoreAttributes) {
	if (typeof ignoreAttributes === "function") return ignoreAttributes;
	if (Array.isArray(ignoreAttributes)) return (attrName) => {
		for (const pattern of ignoreAttributes) {
			if (typeof pattern === "string" && attrName === pattern) return true;
			if (pattern instanceof RegExp && pattern.test(attrName)) return true;
		}
	};
	return () => false;
}
var init_ignoreAttributes = __esmMin((() => {}));
function addExternalEntities(externalEntities) {
	const entKeys = Object.keys(externalEntities);
	for (let i = 0; i < entKeys.length; i++) {
		const ent = entKeys[i];
		this.lastEntities[ent] = {
			regex: new RegExp("&" + ent + ";", "g"),
			val: externalEntities[ent]
		};
	}
}
/**
* @param {string} val
* @param {string} tagName
* @param {string} jPath
* @param {boolean} dontTrim
* @param {boolean} hasAttributes
* @param {boolean} isLeafNode
* @param {boolean} escapeEntities
*/
function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
	if (val !== void 0) {
		if (this.options.trimValues && !dontTrim) val = val.trim();
		if (val.length > 0) {
			if (!escapeEntities) val = this.replaceEntitiesValue(val);
			const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
			if (newval === null || newval === void 0) return val;
			else if (typeof newval !== typeof val || newval !== val) return newval;
			else if (this.options.trimValues) return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
			else if (val.trim() === val) return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
			else return val;
		}
	}
}
function resolveNameSpace(tagname) {
	if (this.options.removeNSPrefix) {
		const tags = tagname.split(":");
		const prefix = tagname.charAt(0) === "/" ? "/" : "";
		if (tags[0] === "xmlns") return "";
		if (tags.length === 2) tagname = prefix + tags[1];
	}
	return tagname;
}
function buildAttributesMap(attrStr, jPath) {
	if (this.options.ignoreAttributes !== true && typeof attrStr === "string") {
		const matches = getAllMatches(attrStr, attrsRegx);
		const len = matches.length;
		const attrs = {};
		for (let i = 0; i < len; i++) {
			const attrName = this.resolveNameSpace(matches[i][1]);
			if (this.ignoreAttributesFn(attrName, jPath)) continue;
			let oldVal = matches[i][4];
			let aName = this.options.attributeNamePrefix + attrName;
			if (attrName.length) {
				if (this.options.transformAttributeName) aName = this.options.transformAttributeName(aName);
				if (aName === "__proto__") aName = "#__proto__";
				if (oldVal !== void 0) {
					if (this.options.trimValues) oldVal = oldVal.trim();
					oldVal = this.replaceEntitiesValue(oldVal);
					const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
					if (newVal === null || newVal === void 0) attrs[aName] = oldVal;
					else if (typeof newVal !== typeof oldVal || newVal !== oldVal) attrs[aName] = newVal;
					else attrs[aName] = parseValue(oldVal, this.options.parseAttributeValue, this.options.numberParseOptions);
				} else if (this.options.allowBooleanAttributes) attrs[aName] = true;
			}
		}
		if (!Object.keys(attrs).length) return;
		if (this.options.attributesGroupName) {
			const attrCollection = {};
			attrCollection[this.options.attributesGroupName] = attrs;
			return attrCollection;
		}
		return attrs;
	}
}
function addChild(currentNode, childNode, jPath, startIndex) {
	if (!this.options.captureMetaData) startIndex = void 0;
	const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
	if (result === false) {} else if (typeof result === "string") {
		childNode.tagname = result;
		currentNode.addChild(childNode, startIndex);
	} else currentNode.addChild(childNode, startIndex);
}
function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
	if (textData) {
		if (isLeafNode === void 0) isLeafNode = currentNode.child.length === 0;
		textData = this.parseTextData(textData, currentNode.tagname, jPath, false, currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false, isLeafNode);
		if (textData !== void 0 && textData !== "") currentNode.add(this.options.textNodeName, textData);
		textData = "";
	}
	return textData;
}
/**
* @param {Set} stopNodesExact
* @param {Set} stopNodesWildcard
* @param {string} jPath
* @param {string} currentTagName
*/
function isItStopNode(stopNodesExact, stopNodesWildcard, jPath, currentTagName) {
	if (stopNodesWildcard && stopNodesWildcard.has(currentTagName)) return true;
	if (stopNodesExact && stopNodesExact.has(jPath)) return true;
	return false;
}
/**
* Returns the tag Expression and where it is ending handling single-double quotes situation
* @param {string} xmlData 
* @param {number} i starting index
* @returns 
*/
function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
	let attrBoundary;
	let tagExp = "";
	for (let index = i; index < xmlData.length; index++) {
		let ch = xmlData[index];
		if (attrBoundary) {
			if (ch === attrBoundary) attrBoundary = "";
		} else if (ch === "\"" || ch === "'") attrBoundary = ch;
		else if (ch === closingChar[0]) if (closingChar[1]) {
			if (xmlData[index + 1] === closingChar[1]) return {
				data: tagExp,
				index
			};
		} else return {
			data: tagExp,
			index
		};
		else if (ch === "	") ch = " ";
		tagExp += ch;
	}
}
function findClosingIndex(xmlData, str, i, errMsg) {
	const closingIndex = xmlData.indexOf(str, i);
	if (closingIndex === -1) throw new Error(errMsg);
	else return closingIndex + str.length - 1;
}
function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
	const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
	if (!result) return;
	let tagExp = result.data;
	const closeIndex = result.index;
	const separatorIndex = tagExp.search(/\s/);
	let tagName = tagExp;
	let attrExpPresent = true;
	if (separatorIndex !== -1) {
		tagName = tagExp.substring(0, separatorIndex);
		tagExp = tagExp.substring(separatorIndex + 1).trimStart();
	}
	const rawTagName = tagName;
	if (removeNSPrefix) {
		const colonIndex = tagName.indexOf(":");
		if (colonIndex !== -1) {
			tagName = tagName.substr(colonIndex + 1);
			attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
		}
	}
	return {
		tagName,
		tagExp,
		closeIndex,
		attrExpPresent,
		rawTagName
	};
}
/**
* find paired tag for a stop node
* @param {string} xmlData 
* @param {string} tagName 
* @param {number} i 
*/
function readStopNodeData(xmlData, tagName, i) {
	const startIndex = i;
	let openTagCount = 1;
	for (; i < xmlData.length; i++) if (xmlData[i] === "<") if (xmlData[i + 1] === "/") {
		const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
		if (xmlData.substring(i + 2, closeIndex).trim() === tagName) {
			openTagCount--;
			if (openTagCount === 0) return {
				tagContent: xmlData.substring(startIndex, i),
				i: closeIndex
			};
		}
		i = closeIndex;
	} else if (xmlData[i + 1] === "?") i = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
	else if (xmlData.substr(i + 1, 3) === "!--") i = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
	else if (xmlData.substr(i + 1, 2) === "![") i = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
	else {
		const tagData = readTagExp(xmlData, i, ">");
		if (tagData) {
			if ((tagData && tagData.tagName) === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") openTagCount++;
			i = tagData.closeIndex;
		}
	}
}
function parseValue(val, shouldParse, options) {
	if (shouldParse && typeof val === "string") {
		const newval = val.trim();
		if (newval === "true") return true;
		else if (newval === "false") return false;
		else return toNumber(val, options);
	} else if (isExist(val)) return val;
	else return "";
}
function fromCodePoint(str, base, prefix) {
	const codePoint = Number.parseInt(str, base);
	if (codePoint >= 0 && codePoint <= 1114111) return String.fromCodePoint(codePoint);
	else return prefix + str + ";";
}
var OrderedObjParser, attrsRegx, parseXml, replaceEntitiesValue;
var init_OrderedObjParser = __esmMin((() => {
	init_util$1();
	init_xmlNode();
	init_DocTypeReader();
	init_strnum();
	init_ignoreAttributes();
	OrderedObjParser = class {
		constructor(options) {
			this.options = options;
			this.currentNode = null;
			this.tagsNodeStack = [];
			this.docTypeEntities = {};
			this.lastEntities = {
				"apos": {
					regex: /&(apos|#39|#x27);/g,
					val: "'"
				},
				"gt": {
					regex: /&(gt|#62|#x3E);/g,
					val: ">"
				},
				"lt": {
					regex: /&(lt|#60|#x3C);/g,
					val: "<"
				},
				"quot": {
					regex: /&(quot|#34|#x22);/g,
					val: "\""
				}
			};
			this.ampEntity = {
				regex: /&(amp|#38|#x26);/g,
				val: "&"
			};
			this.htmlEntities = {
				"space": {
					regex: /&(nbsp|#160);/g,
					val: " "
				},
				"cent": {
					regex: /&(cent|#162);/g,
					val: "¢"
				},
				"pound": {
					regex: /&(pound|#163);/g,
					val: "£"
				},
				"yen": {
					regex: /&(yen|#165);/g,
					val: "¥"
				},
				"euro": {
					regex: /&(euro|#8364);/g,
					val: "€"
				},
				"copyright": {
					regex: /&(copy|#169);/g,
					val: "©"
				},
				"reg": {
					regex: /&(reg|#174);/g,
					val: "®"
				},
				"inr": {
					regex: /&(inr|#8377);/g,
					val: "₹"
				},
				"num_dec": {
					regex: /&#([0-9]{1,7});/g,
					val: (_, str) => fromCodePoint(str, 10, "&#")
				},
				"num_hex": {
					regex: /&#x([0-9a-fA-F]{1,6});/g,
					val: (_, str) => fromCodePoint(str, 16, "&#x")
				}
			};
			this.addExternalEntities = addExternalEntities;
			this.parseXml = parseXml;
			this.parseTextData = parseTextData;
			this.resolveNameSpace = resolveNameSpace;
			this.buildAttributesMap = buildAttributesMap;
			this.isItStopNode = isItStopNode;
			this.replaceEntitiesValue = replaceEntitiesValue;
			this.readStopNodeData = readStopNodeData;
			this.saveTextToParentTag = saveTextToParentTag;
			this.addChild = addChild;
			this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
			if (this.options.stopNodes && this.options.stopNodes.length > 0) {
				this.stopNodesExact = /* @__PURE__ */ new Set();
				this.stopNodesWildcard = /* @__PURE__ */ new Set();
				for (let i = 0; i < this.options.stopNodes.length; i++) {
					const stopNodeExp = this.options.stopNodes[i];
					if (typeof stopNodeExp !== "string") continue;
					if (stopNodeExp.startsWith("*.")) this.stopNodesWildcard.add(stopNodeExp.substring(2));
					else this.stopNodesExact.add(stopNodeExp);
				}
			}
		}
	};
	attrsRegx = /* @__PURE__ */ new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?", "gm");
	parseXml = function(xmlData) {
		xmlData = xmlData.replace(/\r\n?/g, "\n");
		const xmlObj = new XmlNode("!xml");
		let currentNode = xmlObj;
		let textData = "";
		let jPath = "";
		const docTypeReader = new DocTypeReader(this.options.processEntities);
		for (let i = 0; i < xmlData.length; i++) if (xmlData[i] === "<") if (xmlData[i + 1] === "/") {
			const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
			let tagName = xmlData.substring(i + 2, closeIndex).trim();
			if (this.options.removeNSPrefix) {
				const colonIndex = tagName.indexOf(":");
				if (colonIndex !== -1) tagName = tagName.substr(colonIndex + 1);
			}
			if (this.options.transformTagName) tagName = this.options.transformTagName(tagName);
			if (currentNode) textData = this.saveTextToParentTag(textData, currentNode, jPath);
			const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
			if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
			let propIndex = 0;
			if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
				propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
				this.tagsNodeStack.pop();
			} else propIndex = jPath.lastIndexOf(".");
			jPath = jPath.substring(0, propIndex);
			currentNode = this.tagsNodeStack.pop();
			textData = "";
			i = closeIndex;
		} else if (xmlData[i + 1] === "?") {
			let tagData = readTagExp(xmlData, i, false, "?>");
			if (!tagData) throw new Error("Pi Tag is not closed.");
			textData = this.saveTextToParentTag(textData, currentNode, jPath);
			if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {} else {
				const childNode = new XmlNode(tagData.tagName);
				childNode.add(this.options.textNodeName, "");
				if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath);
				this.addChild(currentNode, childNode, jPath, i);
			}
			i = tagData.closeIndex + 1;
		} else if (xmlData.substr(i + 1, 3) === "!--") {
			const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
			if (this.options.commentPropName) {
				const comment = xmlData.substring(i + 4, endIndex - 2);
				textData = this.saveTextToParentTag(textData, currentNode, jPath);
				currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
			}
			i = endIndex;
		} else if (xmlData.substr(i + 1, 2) === "!D") {
			const result = docTypeReader.readDocType(xmlData, i);
			this.docTypeEntities = result.entities;
			i = result.i;
		} else if (xmlData.substr(i + 1, 2) === "![") {
			const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
			const tagExp = xmlData.substring(i + 9, closeIndex);
			textData = this.saveTextToParentTag(textData, currentNode, jPath);
			let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
			if (val == void 0) val = "";
			if (this.options.cdataPropName) currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
			else currentNode.add(this.options.textNodeName, val);
			i = closeIndex + 2;
		} else {
			let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
			let tagName = result.tagName;
			const rawTagName = result.rawTagName;
			let tagExp = result.tagExp;
			let attrExpPresent = result.attrExpPresent;
			let closeIndex = result.closeIndex;
			if (this.options.transformTagName) {
				const newTagName = this.options.transformTagName(tagName);
				if (tagExp === tagName) tagExp = newTagName;
				tagName = newTagName;
			}
			if (currentNode && textData) {
				if (currentNode.tagname !== "!xml") textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
			}
			const lastTag = currentNode;
			if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
				currentNode = this.tagsNodeStack.pop();
				jPath = jPath.substring(0, jPath.lastIndexOf("."));
			}
			if (tagName !== xmlObj.tagname) jPath += jPath ? "." + tagName : tagName;
			const startIndex = i;
			if (this.isItStopNode(this.stopNodesExact, this.stopNodesWildcard, jPath, tagName)) {
				let tagContent = "";
				if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
					if (tagName[tagName.length - 1] === "/") {
						tagName = tagName.substr(0, tagName.length - 1);
						jPath = jPath.substr(0, jPath.length - 1);
						tagExp = tagName;
					} else tagExp = tagExp.substr(0, tagExp.length - 1);
					i = result.closeIndex;
				} else if (this.options.unpairedTags.indexOf(tagName) !== -1) i = result.closeIndex;
				else {
					const result = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
					if (!result) throw new Error(`Unexpected end of ${rawTagName}`);
					i = result.i;
					tagContent = result.tagContent;
				}
				const childNode = new XmlNode(tagName);
				if (tagName !== tagExp && attrExpPresent) childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
				if (tagContent) tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
				jPath = jPath.substr(0, jPath.lastIndexOf("."));
				childNode.add(this.options.textNodeName, tagContent);
				this.addChild(currentNode, childNode, jPath, startIndex);
			} else {
				if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
					if (tagName[tagName.length - 1] === "/") {
						tagName = tagName.substr(0, tagName.length - 1);
						jPath = jPath.substr(0, jPath.length - 1);
						tagExp = tagName;
					} else tagExp = tagExp.substr(0, tagExp.length - 1);
					if (this.options.transformTagName) {
						const newTagName = this.options.transformTagName(tagName);
						if (tagExp === tagName) tagExp = newTagName;
						tagName = newTagName;
					}
					const childNode = new XmlNode(tagName);
					if (tagName !== tagExp && attrExpPresent) childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
					this.addChild(currentNode, childNode, jPath, startIndex);
					jPath = jPath.substr(0, jPath.lastIndexOf("."));
				} else {
					const childNode = new XmlNode(tagName);
					this.tagsNodeStack.push(currentNode);
					if (tagName !== tagExp && attrExpPresent) childNode[":@"] = this.buildAttributesMap(tagExp, jPath);
					this.addChild(currentNode, childNode, jPath, startIndex);
					currentNode = childNode;
				}
				textData = "";
				i = closeIndex;
			}
		}
		else textData += xmlData[i];
		return xmlObj.child;
	};
	replaceEntitiesValue = function(val) {
		if (this.options.processEntities) {
			for (let entityName in this.docTypeEntities) {
				const entity = this.docTypeEntities[entityName];
				val = val.replace(entity.regx, entity.val);
			}
			for (let entityName in this.lastEntities) {
				const entity = this.lastEntities[entityName];
				val = val.replace(entity.regex, entity.val);
			}
			if (this.options.htmlEntities) for (let entityName in this.htmlEntities) {
				const entity = this.htmlEntities[entityName];
				val = val.replace(entity.regex, entity.val);
			}
			val = val.replace(this.ampEntity.regex, this.ampEntity.val);
		}
		return val;
	};
}));
/**
* 
* @param {array} node 
* @param {any} options 
* @returns 
*/
function prettify(node, options) {
	return compress(node, options);
}
/**
* 
* @param {array} arr 
* @param {object} options 
* @param {string} jPath 
* @returns object
*/
function compress(arr, options, jPath) {
	let text;
	const compressedObj = {};
	for (let i = 0; i < arr.length; i++) {
		const tagObj = arr[i];
		const property = propName(tagObj);
		let newJpath = "";
		if (jPath === void 0) newJpath = property;
		else newJpath = jPath + "." + property;
		if (property === options.textNodeName) if (text === void 0) text = tagObj[property];
		else text += "" + tagObj[property];
		else if (property === void 0) continue;
		else if (tagObj[property]) {
			let val = compress(tagObj[property], options, newJpath);
			const isLeaf = isLeafTag(val, options);
			if (tagObj[METADATA_SYMBOL] !== void 0) val[METADATA_SYMBOL] = tagObj[METADATA_SYMBOL];
			if (tagObj[":@"]) assignAttributes(val, tagObj[":@"], newJpath, options);
			else if (Object.keys(val).length === 1 && val[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) val = val[options.textNodeName];
			else if (Object.keys(val).length === 0) if (options.alwaysCreateTextNode) val[options.textNodeName] = "";
			else val = "";
			if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
				if (!Array.isArray(compressedObj[property])) compressedObj[property] = [compressedObj[property]];
				compressedObj[property].push(val);
			} else if (options.isArray(property, newJpath, isLeaf)) compressedObj[property] = [val];
			else compressedObj[property] = val;
		}
	}
	if (typeof text === "string") {
		if (text.length > 0) compressedObj[options.textNodeName] = text;
	} else if (text !== void 0) compressedObj[options.textNodeName] = text;
	return compressedObj;
}
function propName(obj) {
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (key !== ":@") return key;
	}
}
function assignAttributes(obj, attrMap, jpath, options) {
	if (attrMap) {
		const keys = Object.keys(attrMap);
		const len = keys.length;
		for (let i = 0; i < len; i++) {
			const atrrName = keys[i];
			if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) obj[atrrName] = [attrMap[atrrName]];
			else obj[atrrName] = attrMap[atrrName];
		}
	}
}
function isLeafTag(obj, options) {
	const { textNodeName } = options;
	const propCount = Object.keys(obj).length;
	if (propCount === 0) return true;
	if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) return true;
	return false;
}
var METADATA_SYMBOL;
var init_node2json = __esmMin((() => {
	init_xmlNode();
	METADATA_SYMBOL = XmlNode.getMetaDataSymbol();
}));
var XMLParser;
var init_XMLParser = __esmMin((() => {
	init_OptionsBuilder();
	init_OrderedObjParser();
	init_node2json();
	init_validator();
	init_xmlNode();
	XMLParser = class {
		constructor(options) {
			this.externalEntities = {};
			this.options = buildOptions(options);
		}
		/**
		* Parse XML dats to JS object 
		* @param {string|Uint8Array} xmlData 
		* @param {boolean|Object} validationOption 
		*/
		parse(xmlData, validationOption) {
			if (typeof xmlData !== "string" && xmlData.toString) xmlData = xmlData.toString();
			else if (typeof xmlData !== "string") throw new Error("XML data is accepted in String or Bytes[] form.");
			if (validationOption) {
				if (validationOption === true) validationOption = {};
				const result = validate$1(xmlData, validationOption);
				if (result !== true) throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
			}
			const orderedObjParser = new OrderedObjParser(this.options);
			orderedObjParser.addExternalEntities(this.externalEntities);
			const orderedResult = orderedObjParser.parseXml(xmlData);
			if (this.options.preserveOrder || orderedResult === void 0) return orderedResult;
			else return prettify(orderedResult, this.options);
		}
		/**
		* Add Entity which is not by default supported by this library
		* @param {string} key 
		* @param {string} value 
		*/
		addEntity(key, value) {
			if (value.indexOf("&") !== -1) throw new Error("Entity value can't have '&'");
			else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
			else if (value === "&") throw new Error("An entity with value '&' is not permitted");
			else this.externalEntities[key] = value;
		}
		/**
		* Returns a Symbol that can be used to access the metadata
		* property on a node.
		* 
		* If Symbol is not available in the environment, an ordinary property is used
		* and the name of the property is here returned.
		* 
		* The XMLMetaData property is only present when `captureMetaData`
		* is true in the options.
		*/
		static getMetaDataSymbol() {
			return XmlNode.getMetaDataSymbol();
		}
	};
}));
var init_fxp = __esmMin((() => {
	init_XMLParser();
}));
function parseXML(xmlString) {
	return parser.parse(xmlString, true);
}
var parser;
var init_xml_parser = __esmMin((() => {
	init_fxp();
	parser = new XMLParser({
		attributeNamePrefix: "",
		htmlEntities: true,
		ignoreAttributes: false,
		ignoreDeclaration: true,
		parseTagValue: false,
		trimValues: false,
		tagValueProcessor: (_, val) => val.trim() === "" && val.includes("\n") ? "" : void 0
	});
	parser.addEntity("#xD", "\r");
	parser.addEntity("#10", "\n");
}));
var dist_es_exports$18 = /* @__PURE__ */ __exportAll({
	XmlNode: () => XmlNode$1,
	XmlText: () => XmlText,
	parseXML: () => parseXML
});
var init_dist_es$22 = __esmMin((() => {
	init_XmlNode();
	init_XmlText();
	init_xml_parser();
}));
var require_dist_cjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var protocolHttp = (init_dist_es$41(), __toCommonJS(dist_es_exports$30));
	var core = require_dist_cjs$1();
	var propertyProvider = (init_dist_es$27(), __toCommonJS(dist_es_exports$22));
	var client = require_client();
	var signatureV4 = (init_dist_es$26(), __toCommonJS(dist_es_exports$21));
	var cbor = require_cbor();
	var schema = require_schema();
	var smithyClient = (init_dist_es$23(), __toCommonJS(dist_es_exports$19));
	var protocols = require_protocols$1();
	var serde = require_serde();
	var utilBase64 = (init_dist_es$35(), __toCommonJS(dist_es_exports$26));
	var utilUtf8 = (init_dist_es$36(), __toCommonJS(dist_es_exports$27));
	var xmlBuilder = (init_dist_es$22(), __toCommonJS(dist_es_exports$18));
	var state = { warningEmitted: false };
	var emitWarningIfUnsupportedVersion = (version) => {
		if (version && !state.warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 20) {
			state.warningEmitted = true;
			process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js ${version} in January 2026.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/c895JFp`);
		}
	};
	function setCredentialFeature(credentials, feature, value) {
		if (!credentials.$source) credentials.$source = {};
		credentials.$source[feature] = value;
		return credentials;
	}
	function setFeature(context, feature, value) {
		if (!context.__aws_sdk_context) context.__aws_sdk_context = { features: {} };
		else if (!context.__aws_sdk_context.features) context.__aws_sdk_context.features = {};
		context.__aws_sdk_context.features[feature] = value;
	}
	function setTokenFeature(token, feature, value) {
		if (!token.$source) token.$source = {};
		token.$source[feature] = value;
		return token;
	}
	var getDateHeader = (response) => protocolHttp.HttpResponse.isInstance(response) ? response.headers?.date ?? response.headers?.Date : void 0;
	var getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);
	var isClockSkewed = (clockTime, systemClockOffset) => Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 3e5;
	var getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset) => {
		const clockTimeInMs = Date.parse(clockTime);
		if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) return clockTimeInMs - Date.now();
		return currentSystemClockOffset;
	};
	var throwSigningPropertyError = (name, property) => {
		if (!property) throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
		return property;
	};
	var validateSigningProperties = async (signingProperties) => {
		const context = throwSigningPropertyError("context", signingProperties.context);
		const config = throwSigningPropertyError("config", signingProperties.config);
		const authScheme = context.endpointV2?.properties?.authSchemes?.[0];
		return {
			config,
			signer: await throwSigningPropertyError("signer", config.signer)(authScheme),
			signingRegion: signingProperties?.signingRegion,
			signingRegionSet: signingProperties?.signingRegionSet,
			signingName: signingProperties?.signingName
		};
	};
	var AwsSdkSigV4Signer = class {
		async sign(httpRequest, identity, signingProperties) {
			if (!protocolHttp.HttpRequest.isInstance(httpRequest)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
			const validatedProps = await validateSigningProperties(signingProperties);
			const { config, signer } = validatedProps;
			let { signingRegion, signingName } = validatedProps;
			const handlerExecutionContext = signingProperties.context;
			if (handlerExecutionContext?.authSchemes?.length ?? false) {
				const [first, second] = handlerExecutionContext.authSchemes;
				if (first?.name === "sigv4a" && second?.name === "sigv4") {
					signingRegion = second?.signingRegion ?? signingRegion;
					signingName = second?.signingName ?? signingName;
				}
			}
			return await signer.sign(httpRequest, {
				signingDate: getSkewCorrectedDate(config.systemClockOffset),
				signingRegion,
				signingService: signingName
			});
		}
		errorHandler(signingProperties) {
			return (error) => {
				const serverTime = error.ServerTime ?? getDateHeader(error.$response);
				if (serverTime) {
					const config = throwSigningPropertyError("config", signingProperties.config);
					const initialSystemClockOffset = config.systemClockOffset;
					config.systemClockOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
					if (config.systemClockOffset !== initialSystemClockOffset && error.$metadata) error.$metadata.clockSkewCorrected = true;
				}
				throw error;
			};
		}
		successHandler(httpResponse, signingProperties) {
			const dateHeader = getDateHeader(httpResponse);
			if (dateHeader) {
				const config = throwSigningPropertyError("config", signingProperties.config);
				config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
			}
		}
	};
	var AWSSDKSigV4Signer = AwsSdkSigV4Signer;
	var AwsSdkSigV4ASigner = class extends AwsSdkSigV4Signer {
		async sign(httpRequest, identity, signingProperties) {
			if (!protocolHttp.HttpRequest.isInstance(httpRequest)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
			const { config, signer, signingRegion, signingRegionSet, signingName } = await validateSigningProperties(signingProperties);
			const multiRegionOverride = (await config.sigv4aSigningRegionSet?.() ?? signingRegionSet ?? [signingRegion]).join(",");
			return await signer.sign(httpRequest, {
				signingDate: getSkewCorrectedDate(config.systemClockOffset),
				signingRegion: multiRegionOverride,
				signingService: signingName
			});
		}
	};
	var getArrayForCommaSeparatedString = (str) => typeof str === "string" && str.length > 0 ? str.split(",").map((item) => item.trim()) : [];
	var getBearerTokenEnvKey = (signingName) => `AWS_BEARER_TOKEN_${signingName.replace(/[\s-]/g, "_").toUpperCase()}`;
	var NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY = "AWS_AUTH_SCHEME_PREFERENCE";
	var NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY = "auth_scheme_preference";
	var NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = {
		environmentVariableSelector: (env, options) => {
			if (options?.signingName) {
				if (getBearerTokenEnvKey(options.signingName) in env) return ["httpBearerAuth"];
			}
			if (!(NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY in env)) return void 0;
			return getArrayForCommaSeparatedString(env[NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY]);
		},
		configFileSelector: (profile) => {
			if (!(NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY in profile)) return void 0;
			return getArrayForCommaSeparatedString(profile[NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY]);
		},
		default: []
	};
	var resolveAwsSdkSigV4AConfig = (config) => {
		config.sigv4aSigningRegionSet = core.normalizeProvider(config.sigv4aSigningRegionSet);
		return config;
	};
	var NODE_SIGV4A_CONFIG_OPTIONS = {
		environmentVariableSelector(env) {
			if (env.AWS_SIGV4A_SIGNING_REGION_SET) return env.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((_) => _.trim());
			throw new propertyProvider.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", { tryNextLink: true });
		},
		configFileSelector(profile) {
			if (profile.sigv4a_signing_region_set) return (profile.sigv4a_signing_region_set ?? "").split(",").map((_) => _.trim());
			throw new propertyProvider.ProviderError("sigv4a_signing_region_set not set in profile.", { tryNextLink: true });
		},
		default: void 0
	};
	var resolveAwsSdkSigV4Config = (config) => {
		let inputCredentials = config.credentials;
		let isUserSupplied = !!config.credentials;
		let resolvedCredentials = void 0;
		Object.defineProperty(config, "credentials", {
			set(credentials) {
				if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) isUserSupplied = true;
				inputCredentials = credentials;
				const boundProvider = bindCallerConfig(config, normalizeCredentialProvider(config, {
					credentials: inputCredentials,
					credentialDefaultProvider: config.credentialDefaultProvider
				}));
				if (isUserSupplied && !boundProvider.attributed) {
					const isCredentialObject = typeof inputCredentials === "object" && inputCredentials !== null;
					resolvedCredentials = async (options) => {
						const attributedCreds = await boundProvider(options);
						if (isCredentialObject && (!attributedCreds.$source || Object.keys(attributedCreds.$source).length === 0)) return client.setCredentialFeature(attributedCreds, "CREDENTIALS_CODE", "e");
						return attributedCreds;
					};
					resolvedCredentials.memoized = boundProvider.memoized;
					resolvedCredentials.configBound = boundProvider.configBound;
					resolvedCredentials.attributed = true;
				} else resolvedCredentials = boundProvider;
			},
			get() {
				return resolvedCredentials;
			},
			enumerable: true,
			configurable: true
		});
		config.credentials = inputCredentials;
		const { signingEscapePath = true, systemClockOffset = config.systemClockOffset || 0, sha256 } = config;
		let signer;
		if (config.signer) signer = core.normalizeProvider(config.signer);
		else if (config.regionInfoProvider) signer = () => core.normalizeProvider(config.region)().then(async (region) => [await config.regionInfoProvider(region, {
			useFipsEndpoint: await config.useFipsEndpoint(),
			useDualstackEndpoint: await config.useDualstackEndpoint()
		}) || {}, region]).then(([regionInfo, region]) => {
			const { signingRegion, signingService } = regionInfo;
			config.signingRegion = config.signingRegion || signingRegion || region;
			config.signingName = config.signingName || signingService || config.serviceId;
			const params = {
				...config,
				credentials: config.credentials,
				region: config.signingRegion,
				service: config.signingName,
				sha256,
				uriEscapePath: signingEscapePath
			};
			return new (config.signerConstructor || signatureV4.SignatureV4)(params);
		});
		else signer = async (authScheme) => {
			authScheme = Object.assign({}, {
				name: "sigv4",
				signingName: config.signingName || config.defaultSigningName,
				signingRegion: await core.normalizeProvider(config.region)(),
				properties: {}
			}, authScheme);
			const signingRegion = authScheme.signingRegion;
			const signingService = authScheme.signingName;
			config.signingRegion = config.signingRegion || signingRegion;
			config.signingName = config.signingName || signingService || config.serviceId;
			const params = {
				...config,
				credentials: config.credentials,
				region: config.signingRegion,
				service: config.signingName,
				sha256,
				uriEscapePath: signingEscapePath
			};
			return new (config.signerConstructor || signatureV4.SignatureV4)(params);
		};
		return Object.assign(config, {
			systemClockOffset,
			signingEscapePath,
			signer
		});
	};
	var resolveAWSSDKSigV4Config = resolveAwsSdkSigV4Config;
	function normalizeCredentialProvider(config, { credentials, credentialDefaultProvider }) {
		let credentialsProvider;
		if (credentials) if (!credentials?.memoized) credentialsProvider = core.memoizeIdentityProvider(credentials, core.isIdentityExpired, core.doesIdentityRequireRefresh);
		else credentialsProvider = credentials;
		else if (credentialDefaultProvider) credentialsProvider = core.normalizeProvider(credentialDefaultProvider(Object.assign({}, config, { parentClientConfig: config })));
		else credentialsProvider = async () => {
			throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
		};
		credentialsProvider.memoized = true;
		return credentialsProvider;
	}
	function bindCallerConfig(config, credentialsProvider) {
		if (credentialsProvider.configBound) return credentialsProvider;
		const fn = async (options) => credentialsProvider({
			...options,
			callerClientConfig: config
		});
		fn.memoized = credentialsProvider.memoized;
		fn.configBound = true;
		return fn;
	}
	var ProtocolLib = class {
		queryCompat;
		constructor(queryCompat = false) {
			this.queryCompat = queryCompat;
		}
		resolveRestContentType(defaultContentType, inputSchema) {
			const members = inputSchema.getMemberSchemas();
			const httpPayloadMember = Object.values(members).find((m) => {
				return !!m.getMergedTraits().httpPayload;
			});
			if (httpPayloadMember) {
				const mediaType = httpPayloadMember.getMergedTraits().mediaType;
				if (mediaType) return mediaType;
				else if (httpPayloadMember.isStringSchema()) return "text/plain";
				else if (httpPayloadMember.isBlobSchema()) return "application/octet-stream";
				else return defaultContentType;
			} else if (!inputSchema.isUnitSchema()) {
				if (Object.values(members).find((m) => {
					const { httpQuery, httpQueryParams, httpHeader, httpLabel, httpPrefixHeaders } = m.getMergedTraits();
					return !httpQuery && !httpQueryParams && !httpHeader && !httpLabel && httpPrefixHeaders === void 0;
				})) return defaultContentType;
			}
		}
		async getErrorSchemaOrThrowBaseException(errorIdentifier, defaultNamespace, response, dataObject, metadata, getErrorSchema) {
			let namespace = defaultNamespace;
			let errorName = errorIdentifier;
			if (errorIdentifier.includes("#")) [namespace, errorName] = errorIdentifier.split("#");
			const errorMetadata = {
				$metadata: metadata,
				$fault: response.statusCode < 500 ? "client" : "server"
			};
			const registry = schema.TypeRegistry.for(namespace);
			try {
				return {
					errorSchema: getErrorSchema?.(registry, errorName) ?? registry.getSchema(errorIdentifier),
					errorMetadata
				};
			} catch (e) {
				dataObject.message = dataObject.message ?? dataObject.Message ?? "UnknownError";
				const synthetic = schema.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace);
				const baseExceptionSchema = synthetic.getBaseException();
				if (baseExceptionSchema) {
					const ErrorCtor = synthetic.getErrorCtor(baseExceptionSchema) ?? Error;
					throw this.decorateServiceException(Object.assign(new ErrorCtor({ name: errorName }), errorMetadata), dataObject);
				}
				throw this.decorateServiceException(Object.assign(new Error(errorName), errorMetadata), dataObject);
			}
		}
		decorateServiceException(exception, additions = {}) {
			if (this.queryCompat) {
				const msg = exception.Message ?? additions.Message;
				const error = smithyClient.decorateServiceException(exception, additions);
				if (msg) error.message = msg;
				error.Error = {
					...error.Error,
					Type: error.Error.Type,
					Code: error.Error.Code,
					Message: error.Error.message ?? error.Error.Message ?? msg
				};
				const reqId = error.$metadata.requestId;
				if (reqId) error.RequestId = reqId;
				return error;
			}
			return smithyClient.decorateServiceException(exception, additions);
		}
		setQueryCompatError(output, response) {
			const queryErrorHeader = response.headers?.["x-amzn-query-error"];
			if (output !== void 0 && queryErrorHeader != null) {
				const [Code, Type] = queryErrorHeader.split(";");
				const entries = Object.entries(output);
				const Error = {
					Code,
					Type
				};
				Object.assign(output, Error);
				for (const [k, v] of entries) Error[k === "message" ? "Message" : k] = v;
				delete Error.__type;
				output.Error = Error;
			}
		}
		queryCompatOutput(queryCompatErrorData, errorData) {
			if (queryCompatErrorData.Error) errorData.Error = queryCompatErrorData.Error;
			if (queryCompatErrorData.Type) errorData.Type = queryCompatErrorData.Type;
			if (queryCompatErrorData.Code) errorData.Code = queryCompatErrorData.Code;
		}
		findQueryCompatibleError(registry, errorName) {
			try {
				return registry.getSchema(errorName);
			} catch (e) {
				return registry.find((schema$1) => schema.NormalizedSchema.of(schema$1).getMergedTraits().awsQueryError?.[0] === errorName);
			}
		}
	};
	var AwsSmithyRpcV2CborProtocol = class extends cbor.SmithyRpcV2CborProtocol {
		awsQueryCompatible;
		mixin;
		constructor({ defaultNamespace, awsQueryCompatible }) {
			super({ defaultNamespace });
			this.awsQueryCompatible = !!awsQueryCompatible;
			this.mixin = new ProtocolLib(this.awsQueryCompatible);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (this.awsQueryCompatible) request.headers["x-amzn-query-mode"] = "true";
			return request;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			if (this.awsQueryCompatible) this.mixin.setQueryCompatError(dataObject, response);
			const errorName = (() => {
				const compatHeader = response.headers["x-amzn-query-error"];
				if (compatHeader && this.awsQueryCompatible) return compatHeader.split(";")[0];
				return cbor.loadSmithyRpcV2CborErrorCode(response, dataObject) ?? "Unknown";
			})();
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorName, this.options.defaultNamespace, response, dataObject, metadata, this.awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			const output = {};
			for (const [name, member] of ns.structIterator()) if (dataObject[name] != null) output[name] = this.deserializer.readValue(member, dataObject[name]);
			if (this.awsQueryCompatible) this.mixin.queryCompatOutput(dataObject, output);
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
	};
	var _toStr = (val) => {
		if (val == null) return val;
		if (typeof val === "number" || typeof val === "bigint") {
			const warning = /* @__PURE__ */ new Error(`Received number ${val} where a string was expected.`);
			warning.name = "Warning";
			console.warn(warning);
			return String(val);
		}
		if (typeof val === "boolean") {
			const warning = /* @__PURE__ */ new Error(`Received boolean ${val} where a string was expected.`);
			warning.name = "Warning";
			console.warn(warning);
			return String(val);
		}
		return val;
	};
	var _toBool = (val) => {
		if (val == null) return val;
		if (typeof val === "string") {
			const lowercase = val.toLowerCase();
			if (val !== "" && lowercase !== "false" && lowercase !== "true") {
				const warning = /* @__PURE__ */ new Error(`Received string "${val}" where a boolean was expected.`);
				warning.name = "Warning";
				console.warn(warning);
			}
			return val !== "" && lowercase !== "false";
		}
		return val;
	};
	var _toNum = (val) => {
		if (val == null) return val;
		if (typeof val === "string") {
			const num = Number(val);
			if (num.toString() !== val) {
				const warning = /* @__PURE__ */ new Error(`Received string "${val}" where a number was expected.`);
				warning.name = "Warning";
				console.warn(warning);
				return val;
			}
			return num;
		}
		return val;
	};
	var SerdeContextConfig = class {
		serdeContext;
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
		}
	};
	var UnionSerde = class {
		from;
		to;
		keys;
		constructor(from, to) {
			this.from = from;
			this.to = to;
			this.keys = new Set(Object.keys(this.from).filter((k) => k !== "__type"));
		}
		mark(key) {
			this.keys.delete(key);
		}
		hasUnknown() {
			return this.keys.size === 1 && Object.keys(this.to).length === 0;
		}
		writeUnknown() {
			if (this.hasUnknown()) {
				const k = this.keys.values().next().value;
				const v = this.from[k];
				this.to.$unknown = [k, v];
			}
		}
	};
	function jsonReviver(key, value, context) {
		if (context?.source) {
			const numericString = context.source;
			if (typeof value === "number") {
				if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER || numericString !== String(value)) if (numericString.includes(".")) return new serde.NumericValue(numericString, "bigDecimal");
				else return BigInt(numericString);
			}
		}
		return value;
	}
	var collectBodyString = (streamBody, context) => smithyClient.collectBody(streamBody, context).then((body) => (context?.utf8Encoder ?? utilUtf8.toUtf8)(body));
	var parseJsonBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
		if (encoded.length) try {
			return JSON.parse(encoded);
		} catch (e) {
			if (e?.name === "SyntaxError") Object.defineProperty(e, "$responseBodyText", { value: encoded });
			throw e;
		}
		return {};
	});
	var parseJsonErrorBody = async (errorBody, context) => {
		const value = await parseJsonBody(errorBody, context);
		value.message = value.message ?? value.Message;
		return value;
	};
	var loadRestJsonErrorCode = (output, data) => {
		const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
		const sanitizeErrorCode = (rawValue) => {
			let cleanValue = rawValue;
			if (typeof cleanValue === "number") cleanValue = cleanValue.toString();
			if (cleanValue.indexOf(",") >= 0) cleanValue = cleanValue.split(",")[0];
			if (cleanValue.indexOf(":") >= 0) cleanValue = cleanValue.split(":")[0];
			if (cleanValue.indexOf("#") >= 0) cleanValue = cleanValue.split("#")[1];
			return cleanValue;
		};
		const headerKey = findKey(output.headers, "x-amzn-errortype");
		if (headerKey !== void 0) return sanitizeErrorCode(output.headers[headerKey]);
		if (data && typeof data === "object") {
			const codeKey = findKey(data, "code");
			if (codeKey && data[codeKey] !== void 0) return sanitizeErrorCode(data[codeKey]);
			if (data["__type"] !== void 0) return sanitizeErrorCode(data["__type"]);
		}
	};
	var JsonShapeDeserializer = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		async read(schema, data) {
			return this._read(schema, typeof data === "string" ? JSON.parse(data, jsonReviver) : await parseJsonBody(data, this.serdeContext));
		}
		readObject(schema, data) {
			return this._read(schema, data);
		}
		_read(schema$1, value) {
			const isObject = value !== null && typeof value === "object";
			const ns = schema.NormalizedSchema.of(schema$1);
			if (isObject) {
				if (ns.isStructSchema()) {
					const record = value;
					const union = ns.isUnionSchema();
					const out = {};
					let nameMap = void 0;
					const { jsonName } = this.settings;
					if (jsonName) nameMap = {};
					let unionSerde;
					if (union) unionSerde = new UnionSerde(record, out);
					for (const [memberName, memberSchema] of ns.structIterator()) {
						let fromKey = memberName;
						if (jsonName) {
							fromKey = memberSchema.getMergedTraits().jsonName ?? fromKey;
							nameMap[fromKey] = memberName;
						}
						if (union) unionSerde.mark(fromKey);
						if (record[fromKey] != null) out[memberName] = this._read(memberSchema, record[fromKey]);
					}
					if (union) unionSerde.writeUnknown();
					else if (typeof record.__type === "string") for (const [k, v] of Object.entries(record)) {
						const t = jsonName ? nameMap[k] ?? k : k;
						if (!(t in out)) out[t] = v;
					}
					return out;
				}
				if (Array.isArray(value) && ns.isListSchema()) {
					const listMember = ns.getValueSchema();
					const out = [];
					const sparse = !!ns.getMergedTraits().sparse;
					for (const item of value) if (sparse || item != null) out.push(this._read(listMember, item));
					return out;
				}
				if (ns.isMapSchema()) {
					const mapMember = ns.getValueSchema();
					const out = {};
					const sparse = !!ns.getMergedTraits().sparse;
					for (const [_k, _v] of Object.entries(value)) if (sparse || _v != null) out[_k] = this._read(mapMember, _v);
					return out;
				}
			}
			if (ns.isBlobSchema() && typeof value === "string") return utilBase64.fromBase64(value);
			const mediaType = ns.getMergedTraits().mediaType;
			if (ns.isStringSchema() && typeof value === "string" && mediaType) {
				if (mediaType === "application/json" || mediaType.endsWith("+json")) return serde.LazyJsonString.from(value);
				return value;
			}
			if (ns.isTimestampSchema() && value != null) switch (protocols.determineTimestampFormat(ns, this.settings)) {
				case 5: return serde.parseRfc3339DateTimeWithOffset(value);
				case 6: return serde.parseRfc7231DateTime(value);
				case 7: return serde.parseEpochTimestamp(value);
				default:
					console.warn("Missing timestamp format, parsing value with Date constructor:", value);
					return new Date(value);
			}
			if (ns.isBigIntegerSchema() && (typeof value === "number" || typeof value === "string")) return BigInt(value);
			if (ns.isBigDecimalSchema() && value != void 0) {
				if (value instanceof serde.NumericValue) return value;
				const untyped = value;
				if (untyped.type === "bigDecimal" && "string" in untyped) return new serde.NumericValue(untyped.string, untyped.type);
				return new serde.NumericValue(String(value), "bigDecimal");
			}
			if (ns.isNumericSchema() && typeof value === "string") {
				switch (value) {
					case "Infinity": return Infinity;
					case "-Infinity": return -Infinity;
					case "NaN": return NaN;
				}
				return value;
			}
			if (ns.isDocumentSchema()) if (isObject) {
				const out = Array.isArray(value) ? [] : {};
				for (const [k, v] of Object.entries(value)) if (v instanceof serde.NumericValue) out[k] = v;
				else out[k] = this._read(ns, v);
				return out;
			} else return structuredClone(value);
			return value;
		}
	};
	var NUMERIC_CONTROL_CHAR = String.fromCharCode(925);
	var JsonReplacer = class {
		values = /* @__PURE__ */ new Map();
		counter = 0;
		stage = 0;
		createReplacer() {
			if (this.stage === 1) throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
			if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
			this.stage = 1;
			return (key, value) => {
				if (value instanceof serde.NumericValue) {
					const v = `${NUMERIC_CONTROL_CHAR + "nv" + this.counter++}_` + value.string;
					this.values.set(`"${v}"`, value.string);
					return v;
				}
				if (typeof value === "bigint") {
					const s = value.toString();
					const v = `${NUMERIC_CONTROL_CHAR + "b" + this.counter++}_` + s;
					this.values.set(`"${v}"`, s);
					return v;
				}
				return value;
			};
		}
		replaceInJson(json) {
			if (this.stage === 0) throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
			if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
			this.stage = 2;
			if (this.counter === 0) return json;
			for (const [key, value] of this.values) json = json.replace(key, value);
			return json;
		}
	};
	var JsonShapeSerializer = class extends SerdeContextConfig {
		settings;
		buffer;
		useReplacer = false;
		rootSchema;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema$1, value) {
			this.rootSchema = schema.NormalizedSchema.of(schema$1);
			this.buffer = this._write(this.rootSchema, value);
		}
		writeDiscriminatedDocument(schema$1, value) {
			this.write(schema$1, value);
			if (typeof this.buffer === "object") this.buffer.__type = schema.NormalizedSchema.of(schema$1).getName(true);
		}
		flush() {
			const { rootSchema, useReplacer } = this;
			this.rootSchema = void 0;
			this.useReplacer = false;
			if (rootSchema?.isStructSchema() || rootSchema?.isDocumentSchema()) {
				if (!useReplacer) return JSON.stringify(this.buffer);
				const replacer = new JsonReplacer();
				return replacer.replaceInJson(JSON.stringify(this.buffer, replacer.createReplacer(), 0));
			}
			return this.buffer;
		}
		_write(schema$1, value, container) {
			const isObject = value !== null && typeof value === "object";
			const ns = schema.NormalizedSchema.of(schema$1);
			if (isObject) {
				if (ns.isStructSchema()) {
					const record = value;
					const out = {};
					const { jsonName } = this.settings;
					let nameMap = void 0;
					if (jsonName) nameMap = {};
					for (const [memberName, memberSchema] of ns.structIterator()) {
						const serializableValue = this._write(memberSchema, record[memberName], ns);
						if (serializableValue !== void 0) {
							let targetKey = memberName;
							if (jsonName) {
								targetKey = memberSchema.getMergedTraits().jsonName ?? memberName;
								nameMap[memberName] = targetKey;
							}
							out[targetKey] = serializableValue;
						}
					}
					if (ns.isUnionSchema() && Object.keys(out).length === 0) {
						const { $unknown } = record;
						if (Array.isArray($unknown)) {
							const [k, v] = $unknown;
							out[k] = this._write(15, v);
						}
					} else if (typeof record.__type === "string") for (const [k, v] of Object.entries(record)) {
						const targetKey = jsonName ? nameMap[k] ?? k : k;
						if (!(targetKey in out)) out[targetKey] = this._write(15, v);
					}
					return out;
				}
				if (Array.isArray(value) && ns.isListSchema()) {
					const listMember = ns.getValueSchema();
					const out = [];
					const sparse = !!ns.getMergedTraits().sparse;
					for (const item of value) if (sparse || item != null) out.push(this._write(listMember, item));
					return out;
				}
				if (ns.isMapSchema()) {
					const mapMember = ns.getValueSchema();
					const out = {};
					const sparse = !!ns.getMergedTraits().sparse;
					for (const [_k, _v] of Object.entries(value)) if (sparse || _v != null) out[_k] = this._write(mapMember, _v);
					return out;
				}
				if (value instanceof Uint8Array && (ns.isBlobSchema() || ns.isDocumentSchema())) {
					if (ns === this.rootSchema) return value;
					return (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
				}
				if (value instanceof Date && (ns.isTimestampSchema() || ns.isDocumentSchema())) switch (protocols.determineTimestampFormat(ns, this.settings)) {
					case 5: return value.toISOString().replace(".000Z", "Z");
					case 6: return serde.dateToUtcString(value);
					case 7: return value.getTime() / 1e3;
					default:
						console.warn("Missing timestamp format, using epoch seconds", value);
						return value.getTime() / 1e3;
				}
				if (value instanceof serde.NumericValue) this.useReplacer = true;
			}
			if (value === null && container?.isStructSchema()) return;
			if (ns.isStringSchema()) {
				if (typeof value === "undefined" && ns.isIdempotencyToken()) return serde.generateIdempotencyToken();
				const mediaType = ns.getMergedTraits().mediaType;
				if (value != null && mediaType) {
					if (mediaType === "application/json" || mediaType.endsWith("+json")) return serde.LazyJsonString.from(value);
				}
				return value;
			}
			if (typeof value === "number" && ns.isNumericSchema()) {
				if (Math.abs(value) === Infinity || isNaN(value)) return String(value);
				return value;
			}
			if (typeof value === "string" && ns.isBlobSchema()) {
				if (ns === this.rootSchema) return value;
				return (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
			}
			if (typeof value === "bigint") this.useReplacer = true;
			if (ns.isDocumentSchema()) if (isObject) {
				const out = Array.isArray(value) ? [] : {};
				for (const [k, v] of Object.entries(value)) if (v instanceof serde.NumericValue) {
					this.useReplacer = true;
					out[k] = v;
				} else out[k] = this._write(ns, v);
				return out;
			} else return structuredClone(value);
			return value;
		}
	};
	var JsonCodec = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		createSerializer() {
			const serializer = new JsonShapeSerializer(this.settings);
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new JsonShapeDeserializer(this.settings);
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var AwsJsonRpcProtocol = class extends protocols.RpcProtocol {
		serializer;
		deserializer;
		serviceTarget;
		codec;
		mixin;
		awsQueryCompatible;
		constructor({ defaultNamespace, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({ defaultNamespace });
			this.serviceTarget = serviceTarget;
			this.codec = jsonCodec ?? new JsonCodec({
				timestampFormat: {
					useTrait: true,
					default: 7
				},
				jsonName: false
			});
			this.serializer = this.codec.createSerializer();
			this.deserializer = this.codec.createDeserializer();
			this.awsQueryCompatible = !!awsQueryCompatible;
			this.mixin = new ProtocolLib(this.awsQueryCompatible);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (!request.path.endsWith("/")) request.path += "/";
			Object.assign(request.headers, {
				"content-type": `application/x-amz-json-${this.getJsonRpcVersion()}`,
				"x-amz-target": `${this.serviceTarget}.${operationSchema.name}`
			});
			if (this.awsQueryCompatible) request.headers["x-amzn-query-mode"] = "true";
			if (schema.deref(operationSchema.input) === "unit" || !request.body) request.body = "{}";
			return request;
		}
		getPayloadCodec() {
			return this.codec;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			if (this.awsQueryCompatible) this.mixin.setQueryCompatError(dataObject, response);
			const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata, this.awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			const output = {};
			for (const [name, member] of ns.structIterator()) if (dataObject[name] != null) output[name] = this.codec.createDeserializer().readObject(member, dataObject[name]);
			if (this.awsQueryCompatible) this.mixin.queryCompatOutput(dataObject, output);
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
	};
	var AwsJson1_0Protocol = class extends AwsJsonRpcProtocol {
		constructor({ defaultNamespace, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({
				defaultNamespace,
				serviceTarget,
				awsQueryCompatible,
				jsonCodec
			});
		}
		getShapeId() {
			return "aws.protocols#awsJson1_0";
		}
		getJsonRpcVersion() {
			return "1.0";
		}
		getDefaultContentType() {
			return "application/x-amz-json-1.0";
		}
	};
	var AwsJson1_1Protocol = class extends AwsJsonRpcProtocol {
		constructor({ defaultNamespace, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({
				defaultNamespace,
				serviceTarget,
				awsQueryCompatible,
				jsonCodec
			});
		}
		getShapeId() {
			return "aws.protocols#awsJson1_1";
		}
		getJsonRpcVersion() {
			return "1.1";
		}
		getDefaultContentType() {
			return "application/x-amz-json-1.1";
		}
	};
	var AwsRestJsonProtocol = class extends protocols.HttpBindingProtocol {
		serializer;
		deserializer;
		codec;
		mixin = new ProtocolLib();
		constructor({ defaultNamespace }) {
			super({ defaultNamespace });
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 7
				},
				httpBindings: true,
				jsonName: true
			};
			this.codec = new JsonCodec(settings);
			this.serializer = new protocols.HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
			this.deserializer = new protocols.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
		}
		getShapeId() {
			return "aws.protocols#restJson1";
		}
		getPayloadCodec() {
			return this.codec;
		}
		setSerdeContext(serdeContext) {
			this.codec.setSerdeContext(serdeContext);
			super.setSerdeContext(serdeContext);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			const inputSchema = schema.NormalizedSchema.of(operationSchema.input);
			if (!request.headers["content-type"]) {
				const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
				if (contentType) request.headers["content-type"] = contentType;
			}
			if (request.body == null && request.headers["content-type"] === this.getDefaultContentType()) request.body = "{}";
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			const output = await super.deserializeResponse(operationSchema, context, response);
			const outputSchema = schema.NormalizedSchema.of(operationSchema.output);
			for (const [name, member] of outputSchema.structIterator()) if (member.getMemberTraits().httpPayload && !(name in output)) output[name] = null;
			return output;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
			const output = {};
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().jsonName ?? name;
				output[name] = this.codec.createDeserializer().readObject(member, dataObject[target]);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		getDefaultContentType() {
			return "application/json";
		}
	};
	var awsExpectUnion = (value) => {
		if (value == null) return;
		if (typeof value === "object" && "__type" in value) delete value.__type;
		return smithyClient.expectUnion(value);
	};
	var XmlShapeDeserializer = class extends SerdeContextConfig {
		settings;
		stringDeserializer;
		constructor(settings) {
			super();
			this.settings = settings;
			this.stringDeserializer = new protocols.FromStringShapeDeserializer(settings);
		}
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
			this.stringDeserializer.setSerdeContext(serdeContext);
		}
		read(schema$1, bytes, key) {
			const ns = schema.NormalizedSchema.of(schema$1);
			const memberSchemas = ns.getMemberSchemas();
			if (ns.isStructSchema() && ns.isMemberSchema() && !!Object.values(memberSchemas).find((memberNs) => {
				return !!memberNs.getMemberTraits().eventPayload;
			})) {
				const output = {};
				const memberName = Object.keys(memberSchemas)[0];
				if (memberSchemas[memberName].isBlobSchema()) output[memberName] = bytes;
				else output[memberName] = this.read(memberSchemas[memberName], bytes);
				return output;
			}
			const xmlString = (this.serdeContext?.utf8Encoder ?? utilUtf8.toUtf8)(bytes);
			const parsedObject = this.parseXml(xmlString);
			return this.readSchema(schema$1, key ? parsedObject[key] : parsedObject);
		}
		readSchema(_schema, value) {
			const ns = schema.NormalizedSchema.of(_schema);
			if (ns.isUnitSchema()) return;
			const traits = ns.getMergedTraits();
			if (ns.isListSchema() && !Array.isArray(value)) return this.readSchema(ns, [value]);
			if (value == null) return value;
			if (typeof value === "object") {
				const sparse = !!traits.sparse;
				const flat = !!traits.xmlFlattened;
				if (ns.isListSchema()) {
					const listValue = ns.getValueSchema();
					const buffer = [];
					const sourceKey = listValue.getMergedTraits().xmlName ?? "member";
					const source = flat ? value : (value[0] ?? value)[sourceKey];
					const sourceArray = Array.isArray(source) ? source : [source];
					for (const v of sourceArray) if (v != null || sparse) buffer.push(this.readSchema(listValue, v));
					return buffer;
				}
				const buffer = {};
				if (ns.isMapSchema()) {
					const keyNs = ns.getKeySchema();
					const memberNs = ns.getValueSchema();
					let entries;
					if (flat) entries = Array.isArray(value) ? value : [value];
					else entries = Array.isArray(value.entry) ? value.entry : [value.entry];
					const keyProperty = keyNs.getMergedTraits().xmlName ?? "key";
					const valueProperty = memberNs.getMergedTraits().xmlName ?? "value";
					for (const entry of entries) {
						const key = entry[keyProperty];
						const value = entry[valueProperty];
						if (value != null || sparse) buffer[key] = this.readSchema(memberNs, value);
					}
					return buffer;
				}
				if (ns.isStructSchema()) {
					const union = ns.isUnionSchema();
					let unionSerde;
					if (union) unionSerde = new UnionSerde(value, buffer);
					for (const [memberName, memberSchema] of ns.structIterator()) {
						const memberTraits = memberSchema.getMergedTraits();
						const xmlObjectKey = !memberTraits.httpPayload ? memberSchema.getMemberTraits().xmlName ?? memberName : memberTraits.xmlName ?? memberSchema.getName();
						if (union) unionSerde.mark(xmlObjectKey);
						if (value[xmlObjectKey] != null) buffer[memberName] = this.readSchema(memberSchema, value[xmlObjectKey]);
					}
					if (union) unionSerde.writeUnknown();
					return buffer;
				}
				if (ns.isDocumentSchema()) return value;
				throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${ns.getName(true)}`);
			}
			if (ns.isListSchema()) return [];
			if (ns.isMapSchema() || ns.isStructSchema()) return {};
			return this.stringDeserializer.read(ns, value);
		}
		parseXml(xml) {
			if (xml.length) {
				let parsedObj;
				try {
					parsedObj = xmlBuilder.parseXML(xml);
				} catch (e) {
					if (e && typeof e === "object") Object.defineProperty(e, "$responseBodyText", { value: xml });
					throw e;
				}
				const textNodeName = "#text";
				const key = Object.keys(parsedObj)[0];
				const parsedObjToReturn = parsedObj[key];
				if (parsedObjToReturn[textNodeName]) {
					parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
					delete parsedObjToReturn[textNodeName];
				}
				return smithyClient.getValueFromTextNode(parsedObjToReturn);
			}
			return {};
		}
	};
	var QueryShapeSerializer = class extends SerdeContextConfig {
		settings;
		buffer;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema$1, value, prefix = "") {
			if (this.buffer === void 0) this.buffer = "";
			const ns = schema.NormalizedSchema.of(schema$1);
			if (prefix && !prefix.endsWith(".")) prefix += ".";
			if (ns.isBlobSchema()) {
				if (typeof value === "string" || value instanceof Uint8Array) {
					this.writeKey(prefix);
					this.writeValue((this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value));
				}
			} else if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isStringSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(String(value));
				} else if (ns.isIdempotencyToken()) {
					this.writeKey(prefix);
					this.writeValue(serde.generateIdempotencyToken());
				}
			} else if (ns.isBigIntegerSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(String(value));
				}
			} else if (ns.isBigDecimalSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(value instanceof serde.NumericValue ? value.string : String(value));
				}
			} else if (ns.isTimestampSchema()) {
				if (value instanceof Date) {
					this.writeKey(prefix);
					switch (protocols.determineTimestampFormat(ns, this.settings)) {
						case 5:
							this.writeValue(value.toISOString().replace(".000Z", "Z"));
							break;
						case 6:
							this.writeValue(smithyClient.dateToUtcString(value));
							break;
						case 7:
							this.writeValue(String(value.getTime() / 1e3));
							break;
					}
				}
			} else if (ns.isDocumentSchema()) if (Array.isArray(value)) this.write(79, value, prefix);
			else if (value instanceof Date) this.write(4, value, prefix);
			else if (value instanceof Uint8Array) this.write(21, value, prefix);
			else if (value && typeof value === "object") this.write(143, value, prefix);
			else {
				this.writeKey(prefix);
				this.writeValue(String(value));
			}
			else if (ns.isListSchema()) {
				if (Array.isArray(value)) if (value.length === 0) {
					if (this.settings.serializeEmptyLists) {
						this.writeKey(prefix);
						this.writeValue("");
					}
				} else {
					const member = ns.getValueSchema();
					const flat = this.settings.flattenLists || ns.getMergedTraits().xmlFlattened;
					let i = 1;
					for (const item of value) {
						if (item == null) continue;
						const traits = member.getMergedTraits();
						const suffix = this.getKey("member", traits.xmlName, traits.ec2QueryName);
						const key = flat ? `${prefix}${i}` : `${prefix}${suffix}.${i}`;
						this.write(member, item, key);
						++i;
					}
				}
			} else if (ns.isMapSchema()) {
				if (value && typeof value === "object") {
					const keySchema = ns.getKeySchema();
					const memberSchema = ns.getValueSchema();
					const flat = ns.getMergedTraits().xmlFlattened;
					let i = 1;
					for (const [k, v] of Object.entries(value)) {
						if (v == null) continue;
						const keyTraits = keySchema.getMergedTraits();
						const keySuffix = this.getKey("key", keyTraits.xmlName, keyTraits.ec2QueryName);
						const key = flat ? `${prefix}${i}.${keySuffix}` : `${prefix}entry.${i}.${keySuffix}`;
						const valTraits = memberSchema.getMergedTraits();
						const valueSuffix = this.getKey("value", valTraits.xmlName, valTraits.ec2QueryName);
						const valueKey = flat ? `${prefix}${i}.${valueSuffix}` : `${prefix}entry.${i}.${valueSuffix}`;
						this.write(keySchema, k, key);
						this.write(memberSchema, v, valueKey);
						++i;
					}
				}
			} else if (ns.isStructSchema()) {
				if (value && typeof value === "object") {
					let didWriteMember = false;
					for (const [memberName, member] of ns.structIterator()) {
						if (value[memberName] == null && !member.isIdempotencyToken()) continue;
						const traits = member.getMergedTraits();
						const suffix = this.getKey(memberName, traits.xmlName, traits.ec2QueryName, "struct");
						const key = `${prefix}${suffix}`;
						this.write(member, value[memberName], key);
						didWriteMember = true;
					}
					if (!didWriteMember && ns.isUnionSchema()) {
						const { $unknown } = value;
						if (Array.isArray($unknown)) {
							const [k, v] = $unknown;
							const key = `${prefix}${k}`;
							this.write(15, v, key);
						}
					}
				}
			} else if (ns.isUnitSchema());
			else throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${ns.getName(true)}`);
		}
		flush() {
			if (this.buffer === void 0) throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
			const str = this.buffer;
			delete this.buffer;
			return str;
		}
		getKey(memberName, xmlName, ec2QueryName, keySource) {
			const { ec2, capitalizeKeys } = this.settings;
			if (ec2 && ec2QueryName) return ec2QueryName;
			const key = xmlName ?? memberName;
			if (capitalizeKeys && keySource === "struct") return key[0].toUpperCase() + key.slice(1);
			return key;
		}
		writeKey(key) {
			if (key.endsWith(".")) key = key.slice(0, key.length - 1);
			this.buffer += `&${protocols.extendedEncodeURIComponent(key)}=`;
		}
		writeValue(value) {
			this.buffer += protocols.extendedEncodeURIComponent(value);
		}
	};
	var AwsQueryProtocol = class extends protocols.RpcProtocol {
		options;
		serializer;
		deserializer;
		mixin = new ProtocolLib();
		constructor(options) {
			super({ defaultNamespace: options.defaultNamespace });
			this.options = options;
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 5
				},
				httpBindings: false,
				xmlNamespace: options.xmlNamespace,
				serviceNamespace: options.defaultNamespace,
				serializeEmptyLists: true
			};
			this.serializer = new QueryShapeSerializer(settings);
			this.deserializer = new XmlShapeDeserializer(settings);
		}
		getShapeId() {
			return "aws.protocols#awsQuery";
		}
		setSerdeContext(serdeContext) {
			this.serializer.setSerdeContext(serdeContext);
			this.deserializer.setSerdeContext(serdeContext);
		}
		getPayloadCodec() {
			throw new Error("AWSQuery protocol has no payload codec.");
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (!request.path.endsWith("/")) request.path += "/";
			Object.assign(request.headers, { "content-type": `application/x-www-form-urlencoded` });
			if (schema.deref(operationSchema.input) === "unit" || !request.body) request.body = "";
			request.body = `Action=${operationSchema.name.split("#")[1] ?? operationSchema.name}&Version=${this.options.version}` + request.body;
			if (request.body.endsWith("&")) request.body = request.body.slice(-1);
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			const deserializer = this.deserializer;
			const ns = schema.NormalizedSchema.of(operationSchema.output);
			const dataObject = {};
			if (response.statusCode >= 300) {
				const bytes = await protocols.collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(15, bytes));
				await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
			}
			for (const header in response.headers) {
				const value = response.headers[header];
				delete response.headers[header];
				response.headers[header.toLowerCase()] = value;
			}
			const shortName = operationSchema.name.split("#")[1] ?? operationSchema.name;
			const awsQueryResultKey = ns.isStructSchema() && this.useNestedResult() ? shortName + "Result" : void 0;
			const bytes = await protocols.collectBody(response.body, context);
			if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(ns, bytes, awsQueryResultKey));
			return {
				$metadata: this.deserializeMetadata(response),
				...dataObject
			};
		}
		useNestedResult() {
			return true;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = this.loadQueryErrorCode(response, dataObject) ?? "Unknown";
			const errorData = this.loadQueryError(dataObject);
			const message = this.loadQueryErrorMessage(dataObject);
			errorData.message = message;
			errorData.Error = {
				Type: errorData.Type,
				Code: errorData.Code,
				Message: message
			};
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, errorData, metadata, this.mixin.findQueryCompatibleError);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			const output = {
				Type: errorData.Error.Type,
				Code: errorData.Error.Code,
				Error: errorData.Error
			};
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().xmlName ?? name;
				const value = errorData[target] ?? dataObject[target];
				output[name] = this.deserializer.readSchema(member, value);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		loadQueryErrorCode(output, data) {
			const code = (data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error)?.Code;
			if (code !== void 0) return code;
			if (output.statusCode == 404) return "NotFound";
		}
		loadQueryError(data) {
			return data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error;
		}
		loadQueryErrorMessage(data) {
			const errorData = this.loadQueryError(data);
			return errorData?.message ?? errorData?.Message ?? data.message ?? data.Message ?? "Unknown";
		}
		getDefaultContentType() {
			return "application/x-www-form-urlencoded";
		}
	};
	var AwsEc2QueryProtocol = class extends AwsQueryProtocol {
		options;
		constructor(options) {
			super(options);
			this.options = options;
			Object.assign(this.serializer.settings, {
				capitalizeKeys: true,
				flattenLists: true,
				serializeEmptyLists: false,
				ec2: true
			});
		}
		useNestedResult() {
			return false;
		}
	};
	var parseXmlBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
		if (encoded.length) {
			let parsedObj;
			try {
				parsedObj = xmlBuilder.parseXML(encoded);
			} catch (e) {
				if (e && typeof e === "object") Object.defineProperty(e, "$responseBodyText", { value: encoded });
				throw e;
			}
			const textNodeName = "#text";
			const key = Object.keys(parsedObj)[0];
			const parsedObjToReturn = parsedObj[key];
			if (parsedObjToReturn[textNodeName]) {
				parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
				delete parsedObjToReturn[textNodeName];
			}
			return smithyClient.getValueFromTextNode(parsedObjToReturn);
		}
		return {};
	});
	var parseXmlErrorBody = async (errorBody, context) => {
		const value = await parseXmlBody(errorBody, context);
		if (value.Error) value.Error.message = value.Error.message ?? value.Error.Message;
		return value;
	};
	var loadRestXmlErrorCode = (output, data) => {
		if (data?.Error?.Code !== void 0) return data.Error.Code;
		if (data?.Code !== void 0) return data.Code;
		if (output.statusCode == 404) return "NotFound";
	};
	var XmlShapeSerializer = class extends SerdeContextConfig {
		settings;
		stringBuffer;
		byteBuffer;
		buffer;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema$1, value) {
			const ns = schema.NormalizedSchema.of(schema$1);
			if (ns.isStringSchema() && typeof value === "string") this.stringBuffer = value;
			else if (ns.isBlobSchema()) this.byteBuffer = "byteLength" in value ? value : (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(value);
			else {
				this.buffer = this.writeStruct(ns, value, void 0);
				const traits = ns.getMergedTraits();
				if (traits.httpPayload && !traits.xmlName) this.buffer.withName(ns.getName());
			}
		}
		flush() {
			if (this.byteBuffer !== void 0) {
				const bytes = this.byteBuffer;
				delete this.byteBuffer;
				return bytes;
			}
			if (this.stringBuffer !== void 0) {
				const str = this.stringBuffer;
				delete this.stringBuffer;
				return str;
			}
			const buffer = this.buffer;
			if (this.settings.xmlNamespace) {
				if (!buffer?.attributes?.["xmlns"]) buffer.addAttribute("xmlns", this.settings.xmlNamespace);
			}
			delete this.buffer;
			return buffer.toString();
		}
		writeStruct(ns, value, parentXmlns) {
			const traits = ns.getMergedTraits();
			const name = ns.isMemberSchema() && !traits.httpPayload ? ns.getMemberTraits().xmlName ?? ns.getMemberName() : traits.xmlName ?? ns.getName();
			if (!name || !ns.isStructSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write struct with empty name or non-struct, schema=${ns.getName(true)}.`);
			const structXmlNode = xmlBuilder.XmlNode.of(name);
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
			for (const [memberName, memberSchema] of ns.structIterator()) {
				const val = value[memberName];
				if (val != null || memberSchema.isIdempotencyToken()) {
					if (memberSchema.getMergedTraits().xmlAttribute) {
						structXmlNode.addAttribute(memberSchema.getMergedTraits().xmlName ?? memberName, this.writeSimple(memberSchema, val));
						continue;
					}
					if (memberSchema.isListSchema()) this.writeList(memberSchema, val, structXmlNode, xmlns);
					else if (memberSchema.isMapSchema()) this.writeMap(memberSchema, val, structXmlNode, xmlns);
					else if (memberSchema.isStructSchema()) structXmlNode.addChildNode(this.writeStruct(memberSchema, val, xmlns));
					else {
						const memberNode = xmlBuilder.XmlNode.of(memberSchema.getMergedTraits().xmlName ?? memberSchema.getMemberName());
						this.writeSimpleInto(memberSchema, val, memberNode, xmlns);
						structXmlNode.addChildNode(memberNode);
					}
				}
			}
			const { $unknown } = value;
			if ($unknown && ns.isUnionSchema() && Array.isArray($unknown) && Object.keys(value).length === 1) {
				const [k, v] = $unknown;
				const node = xmlBuilder.XmlNode.of(k);
				if (typeof v !== "string") if (value instanceof xmlBuilder.XmlNode || value instanceof xmlBuilder.XmlText) structXmlNode.addChildNode(value);
				else throw new Error("@aws-sdk - $unknown union member in XML requires value of type string, @aws-sdk/xml-builder::XmlNode or XmlText.");
				this.writeSimpleInto(0, v, node, xmlns);
				structXmlNode.addChildNode(node);
			}
			if (xmlns) structXmlNode.addAttribute(xmlnsAttr, xmlns);
			return structXmlNode;
		}
		writeList(listMember, array, container, parentXmlns) {
			if (!listMember.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${listMember.getName(true)}`);
			const listTraits = listMember.getMergedTraits();
			const listValueSchema = listMember.getValueSchema();
			const listValueTraits = listValueSchema.getMergedTraits();
			const sparse = !!listValueTraits.sparse;
			const flat = !!listTraits.xmlFlattened;
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(listMember, parentXmlns);
			const writeItem = (container, value) => {
				if (listValueSchema.isListSchema()) this.writeList(listValueSchema, Array.isArray(value) ? value : [value], container, xmlns);
				else if (listValueSchema.isMapSchema()) this.writeMap(listValueSchema, value, container, xmlns);
				else if (listValueSchema.isStructSchema()) {
					const struct = this.writeStruct(listValueSchema, value, xmlns);
					container.addChildNode(struct.withName(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member"));
				} else {
					const listItemNode = xmlBuilder.XmlNode.of(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member");
					this.writeSimpleInto(listValueSchema, value, listItemNode, xmlns);
					container.addChildNode(listItemNode);
				}
			};
			if (flat) {
				for (const value of array) if (sparse || value != null) writeItem(container, value);
			} else {
				const listNode = xmlBuilder.XmlNode.of(listTraits.xmlName ?? listMember.getMemberName());
				if (xmlns) listNode.addAttribute(xmlnsAttr, xmlns);
				for (const value of array) if (sparse || value != null) writeItem(listNode, value);
				container.addChildNode(listNode);
			}
		}
		writeMap(mapMember, map, container, parentXmlns, containerIsMap = false) {
			if (!mapMember.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${mapMember.getName(true)}`);
			const mapTraits = mapMember.getMergedTraits();
			const mapKeySchema = mapMember.getKeySchema();
			const keyTag = mapKeySchema.getMergedTraits().xmlName ?? "key";
			const mapValueSchema = mapMember.getValueSchema();
			const mapValueTraits = mapValueSchema.getMergedTraits();
			const valueTag = mapValueTraits.xmlName ?? "value";
			const sparse = !!mapValueTraits.sparse;
			const flat = !!mapTraits.xmlFlattened;
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(mapMember, parentXmlns);
			const addKeyValue = (entry, key, val) => {
				const keyNode = xmlBuilder.XmlNode.of(keyTag, key);
				const [keyXmlnsAttr, keyXmlns] = this.getXmlnsAttribute(mapKeySchema, xmlns);
				if (keyXmlns) keyNode.addAttribute(keyXmlnsAttr, keyXmlns);
				entry.addChildNode(keyNode);
				let valueNode = xmlBuilder.XmlNode.of(valueTag);
				if (mapValueSchema.isListSchema()) this.writeList(mapValueSchema, val, valueNode, xmlns);
				else if (mapValueSchema.isMapSchema()) this.writeMap(mapValueSchema, val, valueNode, xmlns, true);
				else if (mapValueSchema.isStructSchema()) valueNode = this.writeStruct(mapValueSchema, val, xmlns);
				else this.writeSimpleInto(mapValueSchema, val, valueNode, xmlns);
				entry.addChildNode(valueNode);
			};
			if (flat) {
				for (const [key, val] of Object.entries(map)) if (sparse || val != null) {
					const entry = xmlBuilder.XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
					addKeyValue(entry, key, val);
					container.addChildNode(entry);
				}
			} else {
				let mapNode;
				if (!containerIsMap) {
					mapNode = xmlBuilder.XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
					if (xmlns) mapNode.addAttribute(xmlnsAttr, xmlns);
					container.addChildNode(mapNode);
				}
				for (const [key, val] of Object.entries(map)) if (sparse || val != null) {
					const entry = xmlBuilder.XmlNode.of("entry");
					addKeyValue(entry, key, val);
					(containerIsMap ? container : mapNode).addChildNode(entry);
				}
			}
		}
		writeSimple(_schema, value) {
			if (null === value) throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
			const ns = schema.NormalizedSchema.of(_schema);
			let nodeContents = null;
			if (value && typeof value === "object") if (ns.isBlobSchema()) nodeContents = (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
			else if (ns.isTimestampSchema() && value instanceof Date) switch (protocols.determineTimestampFormat(ns, this.settings)) {
				case 5:
					nodeContents = value.toISOString().replace(".000Z", "Z");
					break;
				case 6:
					nodeContents = smithyClient.dateToUtcString(value);
					break;
				case 7:
					nodeContents = String(value.getTime() / 1e3);
					break;
				default:
					console.warn("Missing timestamp format, using http date", value);
					nodeContents = smithyClient.dateToUtcString(value);
					break;
			}
			else if (ns.isBigDecimalSchema() && value) {
				if (value instanceof serde.NumericValue) return value.string;
				return String(value);
			} else if (ns.isMapSchema() || ns.isListSchema()) throw new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.");
			else throw new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${ns.getName(true)}`);
			if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isBigIntegerSchema() || ns.isBigDecimalSchema()) nodeContents = String(value);
			if (ns.isStringSchema()) if (value === void 0 && ns.isIdempotencyToken()) nodeContents = serde.generateIdempotencyToken();
			else nodeContents = String(value);
			if (nodeContents === null) throw new Error(`Unhandled schema-value pair ${ns.getName(true)}=${value}`);
			return nodeContents;
		}
		writeSimpleInto(_schema, value, into, parentXmlns) {
			const nodeContents = this.writeSimple(_schema, value);
			const ns = schema.NormalizedSchema.of(_schema);
			const content = new xmlBuilder.XmlText(nodeContents);
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
			if (xmlns) into.addAttribute(xmlnsAttr, xmlns);
			into.addChildNode(content);
		}
		getXmlnsAttribute(ns, parentXmlns) {
			const [prefix, xmlns] = ns.getMergedTraits().xmlNamespace ?? [];
			if (xmlns && xmlns !== parentXmlns) return [prefix ? `xmlns:${prefix}` : "xmlns", xmlns];
			return [void 0, void 0];
		}
	};
	var XmlCodec = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		createSerializer() {
			const serializer = new XmlShapeSerializer(this.settings);
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new XmlShapeDeserializer(this.settings);
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var AwsRestXmlProtocol = class extends protocols.HttpBindingProtocol {
		codec;
		serializer;
		deserializer;
		mixin = new ProtocolLib();
		constructor(options) {
			super(options);
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 5
				},
				httpBindings: true,
				xmlNamespace: options.xmlNamespace,
				serviceNamespace: options.defaultNamespace
			};
			this.codec = new XmlCodec(settings);
			this.serializer = new protocols.HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
			this.deserializer = new protocols.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
		}
		getPayloadCodec() {
			return this.codec;
		}
		getShapeId() {
			return "aws.protocols#restXml";
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			const inputSchema = schema.NormalizedSchema.of(operationSchema.input);
			if (!request.headers["content-type"]) {
				const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
				if (contentType) request.headers["content-type"] = contentType;
			}
			if (typeof request.body === "string" && request.headers["content-type"] === this.getDefaultContentType() && !request.body.startsWith("<?xml ") && !this.hasUnstructuredPayloadBinding(inputSchema)) request.body = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + request.body;
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			return super.deserializeResponse(operationSchema, context, response);
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = loadRestXmlErrorCode(response, dataObject) ?? "Unknown";
			if (dataObject.Error && typeof dataObject.Error === "object") for (const key of Object.keys(dataObject.Error)) {
				dataObject[key] = dataObject.Error[key];
				if (key.toLowerCase() === "message") dataObject.message = dataObject.Error[key];
			}
			if (dataObject.RequestId && !metadata.requestId) metadata.requestId = dataObject.RequestId;
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.Error?.message ?? dataObject.Error?.Message ?? dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
			const output = {};
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().xmlName ?? name;
				const value = dataObject.Error?.[target] ?? dataObject[target];
				output[name] = this.codec.createDeserializer().readSchema(member, value);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		getDefaultContentType() {
			return "application/xml";
		}
		hasUnstructuredPayloadBinding(ns) {
			for (const [, member] of ns.structIterator()) if (member.getMergedTraits().httpPayload) return !(member.isStructSchema() || member.isMapSchema() || member.isListSchema());
			return false;
		}
	};
	exports.AWSSDKSigV4Signer = AWSSDKSigV4Signer;
	exports.AwsEc2QueryProtocol = AwsEc2QueryProtocol;
	exports.AwsJson1_0Protocol = AwsJson1_0Protocol;
	exports.AwsJson1_1Protocol = AwsJson1_1Protocol;
	exports.AwsJsonRpcProtocol = AwsJsonRpcProtocol;
	exports.AwsQueryProtocol = AwsQueryProtocol;
	exports.AwsRestJsonProtocol = AwsRestJsonProtocol;
	exports.AwsRestXmlProtocol = AwsRestXmlProtocol;
	exports.AwsSdkSigV4ASigner = AwsSdkSigV4ASigner;
	exports.AwsSdkSigV4Signer = AwsSdkSigV4Signer;
	exports.AwsSmithyRpcV2CborProtocol = AwsSmithyRpcV2CborProtocol;
	exports.JsonCodec = JsonCodec;
	exports.JsonShapeDeserializer = JsonShapeDeserializer;
	exports.JsonShapeSerializer = JsonShapeSerializer;
	exports.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = NODE_AUTH_SCHEME_PREFERENCE_OPTIONS;
	exports.NODE_SIGV4A_CONFIG_OPTIONS = NODE_SIGV4A_CONFIG_OPTIONS;
	exports.XmlCodec = XmlCodec;
	exports.XmlShapeDeserializer = XmlShapeDeserializer;
	exports.XmlShapeSerializer = XmlShapeSerializer;
	exports._toBool = _toBool;
	exports._toNum = _toNum;
	exports._toStr = _toStr;
	exports.awsExpectUnion = awsExpectUnion;
	exports.emitWarningIfUnsupportedVersion = emitWarningIfUnsupportedVersion;
	exports.getBearerTokenEnvKey = getBearerTokenEnvKey;
	exports.loadRestJsonErrorCode = loadRestJsonErrorCode;
	exports.loadRestXmlErrorCode = loadRestXmlErrorCode;
	exports.parseJsonBody = parseJsonBody;
	exports.parseJsonErrorBody = parseJsonErrorBody;
	exports.parseXmlBody = parseXmlBody;
	exports.parseXmlErrorBody = parseXmlErrorBody;
	exports.resolveAWSSDKSigV4Config = resolveAWSSDKSigV4Config;
	exports.resolveAwsSdkSigV4AConfig = resolveAwsSdkSigV4AConfig;
	exports.resolveAwsSdkSigV4Config = resolveAwsSdkSigV4Config;
	exports.setCredentialFeature = setCredentialFeature;
	exports.setFeature = setFeature;
	exports.setTokenFeature = setTokenFeature;
	exports.state = state;
	exports.validateSigningProperties = validateSigningProperties;
}));
const CLIENT_SUPPORTED_ALGORITHMS = [
	ChecksumAlgorithm.CRC32,
	ChecksumAlgorithm.CRC32C,
	ChecksumAlgorithm.CRC64NVME,
	ChecksumAlgorithm.SHA1,
	ChecksumAlgorithm.SHA256
];
const PRIORITY_ORDER_ALGORITHMS = [
	ChecksumAlgorithm.SHA256,
	ChecksumAlgorithm.SHA1,
	ChecksumAlgorithm.CRC32,
	ChecksumAlgorithm.CRC32C,
	ChecksumAlgorithm.CRC64NVME
];
const getChecksumAlgorithmForRequest = (input, { requestChecksumRequired, requestAlgorithmMember, requestChecksumCalculation }) => {
	if (!requestAlgorithmMember) return requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired ? DEFAULT_CHECKSUM_ALGORITHM : void 0;
	if (!input[requestAlgorithmMember]) return;
	const checksumAlgorithm = input[requestAlgorithmMember];
	if (!CLIENT_SUPPORTED_ALGORITHMS.includes(checksumAlgorithm)) throw new Error(`The checksum algorithm "${checksumAlgorithm}" is not supported by the client. Select one of ${CLIENT_SUPPORTED_ALGORITHMS}.`);
	return checksumAlgorithm;
};
const getChecksumLocationName = (algorithm) => algorithm === ChecksumAlgorithm.MD5 ? "content-md5" : `x-amz-checksum-${algorithm.toLowerCase()}`;
const hasHeader = (header, headers) => {
	const soughtHeader = header.toLowerCase();
	for (const headerName of Object.keys(headers)) if (soughtHeader === headerName.toLowerCase()) return true;
	return false;
};
const hasHeaderWithPrefix = (headerPrefix, headers) => {
	const soughtHeaderPrefix = headerPrefix.toLowerCase();
	for (const headerName of Object.keys(headers)) if (headerName.toLowerCase().startsWith(soughtHeaderPrefix)) return true;
	return false;
};
init_dist_es$38();
const isStreaming = (body) => body !== void 0 && typeof body !== "string" && !ArrayBuffer.isView(body) && !isArrayBuffer(body);
var generateCRC64NVMETable = () => {
	const sliceLength = 8;
	const tables = new Array(sliceLength);
	for (let slice = 0; slice < sliceLength; slice++) {
		const table = new Array(512);
		for (let i = 0; i < 256; i++) {
			let crc = BigInt(i);
			for (let j = 0; j < 8 * (slice + 1); j++) if (crc & 1n) crc = crc >> 1n ^ 11127430586519243189n;
			else crc = crc >> 1n;
			table[i * 2] = Number(crc >> 32n & 4294967295n);
			table[i * 2 + 1] = Number(crc & 4294967295n);
		}
		tables[slice] = new Uint32Array(table);
	}
	return tables;
};
var CRC64_NVME_REVERSED_TABLE;
var t0, t1, t2, t3;
var t4, t5, t6, t7;
var ensureTablesInitialized = () => {
	if (!CRC64_NVME_REVERSED_TABLE) {
		CRC64_NVME_REVERSED_TABLE = generateCRC64NVMETable();
		[t0, t1, t2, t3, t4, t5, t6, t7] = CRC64_NVME_REVERSED_TABLE;
	}
};
var Crc64Nvme = class {
	c1 = 0;
	c2 = 0;
	constructor() {
		ensureTablesInitialized();
		this.reset();
	}
	update(data) {
		const len = data.length;
		let i = 0;
		let crc1 = this.c1;
		let crc2 = this.c2;
		while (i + 8 <= len) {
			const idx0 = ((crc2 ^ data[i++]) & 255) << 1;
			const idx1 = ((crc2 >>> 8 ^ data[i++]) & 255) << 1;
			const idx2 = ((crc2 >>> 16 ^ data[i++]) & 255) << 1;
			const idx3 = ((crc2 >>> 24 ^ data[i++]) & 255) << 1;
			const idx4 = ((crc1 ^ data[i++]) & 255) << 1;
			const idx5 = ((crc1 >>> 8 ^ data[i++]) & 255) << 1;
			const idx6 = ((crc1 >>> 16 ^ data[i++]) & 255) << 1;
			const idx7 = ((crc1 >>> 24 ^ data[i++]) & 255) << 1;
			crc1 = t7[idx0] ^ t6[idx1] ^ t5[idx2] ^ t4[idx3] ^ t3[idx4] ^ t2[idx5] ^ t1[idx6] ^ t0[idx7];
			crc2 = t7[idx0 + 1] ^ t6[idx1 + 1] ^ t5[idx2 + 1] ^ t4[idx3 + 1] ^ t3[idx4 + 1] ^ t2[idx5 + 1] ^ t1[idx6 + 1] ^ t0[idx7 + 1];
		}
		while (i < len) {
			const idx = ((crc2 ^ data[i]) & 255) << 1;
			crc2 = (crc2 >>> 8 | (crc1 & 255) << 24) >>> 0;
			crc1 = crc1 >>> 8 ^ t0[idx];
			crc2 ^= t0[idx + 1];
			i++;
		}
		this.c1 = crc1;
		this.c2 = crc2;
	}
	async digest() {
		const c1 = this.c1 ^ 4294967295;
		const c2 = this.c2 ^ 4294967295;
		return new Uint8Array([
			c1 >>> 24,
			c1 >>> 16 & 255,
			c1 >>> 8 & 255,
			c1 & 255,
			c2 >>> 24,
			c2 >>> 16 & 255,
			c2 >>> 8 & 255,
			c2 & 255
		]);
	}
	reset() {
		this.c1 = 4294967295;
		this.c2 = 4294967295;
	}
};
const crc64NvmeCrtContainer = { CrtCrc64Nvme: null };
var NodeCrc32 = class {
	checksum = 0;
	update(data) {
		this.checksum = zlib.crc32(data, this.checksum);
	}
	async digest() {
		return numToUint8(this.checksum);
	}
	reset() {
		this.checksum = 0;
	}
};
const getCrc32ChecksumAlgorithmFunction = () => {
	if (typeof zlib.crc32 === "undefined") return AwsCrc32;
	return NodeCrc32;
};
const selectChecksumAlgorithmFunction = (checksumAlgorithm, config) => {
	switch (checksumAlgorithm) {
		case ChecksumAlgorithm.MD5: return config.md5;
		case ChecksumAlgorithm.CRC32: return getCrc32ChecksumAlgorithmFunction();
		case ChecksumAlgorithm.CRC32C: return AwsCrc32c;
		case ChecksumAlgorithm.CRC64NVME:
			if (typeof crc64NvmeCrtContainer.CrtCrc64Nvme !== "function") return Crc64Nvme;
			return crc64NvmeCrtContainer.CrtCrc64Nvme;
		case ChecksumAlgorithm.SHA1: return config.sha1;
		case ChecksumAlgorithm.SHA256: return config.sha256;
		default: throw new Error(`Unsupported checksum algorithm: ${checksumAlgorithm}`);
	}
};
init_dist_es$36();
const stringHasher = (checksumAlgorithmFn, body) => {
	const hash = new checksumAlgorithmFn();
	hash.update(toUint8Array(body || ""));
	return hash.digest();
};
var import_dist_cjs$4 = require_dist_cjs();
init_dist_es$41();
init_dist_es$29();
const flexibleChecksumsMiddlewareOptions = {
	name: "flexibleChecksumsMiddleware",
	step: "build",
	tags: ["BODY_CHECKSUM"],
	override: true
};
const flexibleChecksumsMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
	if (!HttpRequest.isInstance(args.request)) return next(args);
	if (hasHeaderWithPrefix("x-amz-checksum-", args.request.headers)) return next(args);
	const { request, input } = args;
	const { body: requestBody, headers } = request;
	const { base64Encoder, streamHasher } = config;
	const { requestChecksumRequired, requestAlgorithmMember } = middlewareConfig;
	const requestChecksumCalculation = await config.requestChecksumCalculation();
	const requestAlgorithmMemberName = requestAlgorithmMember?.name;
	const requestAlgorithmMemberHttpHeader = requestAlgorithmMember?.httpHeader;
	if (requestAlgorithmMemberName && !input[requestAlgorithmMemberName]) {
		if (requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired) {
			input[requestAlgorithmMemberName] = DEFAULT_CHECKSUM_ALGORITHM;
			if (requestAlgorithmMemberHttpHeader) headers[requestAlgorithmMemberHttpHeader] = DEFAULT_CHECKSUM_ALGORITHM;
		}
	}
	const checksumAlgorithm = getChecksumAlgorithmForRequest(input, {
		requestChecksumRequired,
		requestAlgorithmMember: requestAlgorithmMember?.name,
		requestChecksumCalculation
	});
	let updatedBody = requestBody;
	let updatedHeaders = headers;
	if (checksumAlgorithm) {
		switch (checksumAlgorithm) {
			case ChecksumAlgorithm.CRC32:
				(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32", "U");
				break;
			case ChecksumAlgorithm.CRC32C:
				(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32C", "V");
				break;
			case ChecksumAlgorithm.CRC64NVME:
				(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_CRC64", "W");
				break;
			case ChecksumAlgorithm.SHA1:
				(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_SHA1", "X");
				break;
			case ChecksumAlgorithm.SHA256:
				(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_SHA256", "Y");
				break;
		}
		const checksumLocationName = getChecksumLocationName(checksumAlgorithm);
		const checksumAlgorithmFn = selectChecksumAlgorithmFunction(checksumAlgorithm, config);
		if (isStreaming(requestBody)) {
			const { getAwsChunkedEncodingStream, bodyLengthChecker } = config;
			updatedBody = getAwsChunkedEncodingStream(typeof config.requestStreamBufferSize === "number" && config.requestStreamBufferSize >= 8 * 1024 ? createBufferedReadable(requestBody, config.requestStreamBufferSize, context.logger) : requestBody, {
				base64Encoder,
				bodyLengthChecker,
				checksumLocationName,
				checksumAlgorithmFn,
				streamHasher
			});
			updatedHeaders = {
				...headers,
				"content-encoding": headers["content-encoding"] ? `${headers["content-encoding"]},aws-chunked` : "aws-chunked",
				"transfer-encoding": "chunked",
				"x-amz-decoded-content-length": headers["content-length"],
				"x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER",
				"x-amz-trailer": checksumLocationName
			};
			delete updatedHeaders["content-length"];
		} else if (!hasHeader(checksumLocationName, headers)) {
			const rawChecksum = await stringHasher(checksumAlgorithmFn, requestBody);
			updatedHeaders = {
				...headers,
				[checksumLocationName]: base64Encoder(rawChecksum)
			};
		}
	}
	try {
		return await next({
			...args,
			request: {
				...request,
				headers: updatedHeaders,
				body: updatedBody
			}
		});
	} catch (e) {
		if (e instanceof Error && e.name === "InvalidChunkSizeError") try {
			if (!e.message.endsWith(".")) e.message += ".";
			e.message += " Set [requestStreamBufferSize=number e.g. 65_536] in client constructor to instruct AWS SDK to buffer your input stream.";
		} catch (ignored) {}
		throw e;
	}
};
const flexibleChecksumsInputMiddlewareOptions = {
	name: "flexibleChecksumsInputMiddleware",
	toMiddleware: "serializerMiddleware",
	relation: "before",
	tags: ["BODY_CHECKSUM"],
	override: true
};
const flexibleChecksumsInputMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
	const input = args.input;
	const { requestValidationModeMember } = middlewareConfig;
	const requestChecksumCalculation = await config.requestChecksumCalculation();
	const responseChecksumValidation = await config.responseChecksumValidation();
	switch (requestChecksumCalculation) {
		case RequestChecksumCalculation.WHEN_REQUIRED:
			(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_REQUIRED", "a");
			break;
		case RequestChecksumCalculation.WHEN_SUPPORTED:
			(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_SUPPORTED", "Z");
			break;
	}
	switch (responseChecksumValidation) {
		case ResponseChecksumValidation.WHEN_REQUIRED:
			(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_REQUIRED", "c");
			break;
		case ResponseChecksumValidation.WHEN_SUPPORTED:
			(0, import_dist_cjs$4.setFeature)(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_SUPPORTED", "b");
			break;
	}
	if (requestValidationModeMember && !input[requestValidationModeMember]) {
		if (responseChecksumValidation === ResponseChecksumValidation.WHEN_SUPPORTED) input[requestValidationModeMember] = "ENABLED";
	}
	return next(args);
};
const getChecksumAlgorithmListForResponse = (responseAlgorithms = []) => {
	const validChecksumAlgorithms = [];
	for (const algorithm of PRIORITY_ORDER_ALGORITHMS) {
		if (!responseAlgorithms.includes(algorithm) || !CLIENT_SUPPORTED_ALGORITHMS.includes(algorithm)) continue;
		validChecksumAlgorithms.push(algorithm);
	}
	return validChecksumAlgorithms;
};
const isChecksumWithPartNumber = (checksum) => {
	const lastHyphenIndex = checksum.lastIndexOf("-");
	if (lastHyphenIndex !== -1) {
		const numberPart = checksum.slice(lastHyphenIndex + 1);
		if (!numberPart.startsWith("0")) {
			const number = parseInt(numberPart, 10);
			if (!isNaN(number) && number >= 1 && number <= 1e4) return true;
		}
	}
	return false;
};
const getChecksum = async (body, { checksumAlgorithmFn, base64Encoder }) => base64Encoder(await stringHasher(checksumAlgorithmFn, body));
init_dist_es$29();
const validateChecksumFromResponse = async (response, { config, responseAlgorithms, logger }) => {
	const checksumAlgorithms = getChecksumAlgorithmListForResponse(responseAlgorithms);
	const { body: responseBody, headers: responseHeaders } = response;
	for (const algorithm of checksumAlgorithms) {
		const responseHeader = getChecksumLocationName(algorithm);
		const checksumFromResponse = responseHeaders[responseHeader];
		if (checksumFromResponse) {
			let checksumAlgorithmFn;
			try {
				checksumAlgorithmFn = selectChecksumAlgorithmFunction(algorithm, config);
			} catch (error) {
				if (algorithm === ChecksumAlgorithm.CRC64NVME) {
					logger?.warn(`Skipping ${ChecksumAlgorithm.CRC64NVME} checksum validation: ${error.message}`);
					continue;
				}
				throw error;
			}
			const { base64Encoder } = config;
			if (isStreaming(responseBody)) {
				response.body = createChecksumStream({
					expectedChecksum: checksumFromResponse,
					checksumSourceLocation: responseHeader,
					checksum: new checksumAlgorithmFn(),
					source: responseBody,
					base64Encoder
				});
				return;
			}
			const checksum = await getChecksum(responseBody, {
				checksumAlgorithmFn,
				base64Encoder
			});
			if (checksum === checksumFromResponse) break;
			throw new Error(`Checksum mismatch: expected "${checksum}" but received "${checksumFromResponse}" in response header "${responseHeader}".`);
		}
	}
};
init_dist_es$41();
const flexibleChecksumsResponseMiddlewareOptions = {
	name: "flexibleChecksumsResponseMiddleware",
	toMiddleware: "deserializerMiddleware",
	relation: "after",
	tags: ["BODY_CHECKSUM"],
	override: true
};
const flexibleChecksumsResponseMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
	if (!HttpRequest.isInstance(args.request)) return next(args);
	const input = args.input;
	const result = await next(args);
	const response = result.response;
	const { requestValidationModeMember, responseAlgorithms } = middlewareConfig;
	if (requestValidationModeMember && input[requestValidationModeMember] === "ENABLED") {
		const { clientName, commandName } = context;
		if (clientName === "S3Client" && commandName === "GetObjectCommand" && getChecksumAlgorithmListForResponse(responseAlgorithms).every((algorithm) => {
			const responseHeader = getChecksumLocationName(algorithm);
			const checksumFromResponse = response.headers[responseHeader];
			return !checksumFromResponse || isChecksumWithPartNumber(checksumFromResponse);
		})) return result;
		await validateChecksumFromResponse(response, {
			config,
			responseAlgorithms,
			logger: context.logger
		});
	}
	return result;
};
const getFlexibleChecksumsPlugin = (config, middlewareConfig) => ({ applyToStack: (clientStack) => {
	clientStack.add(flexibleChecksumsMiddleware(config, middlewareConfig), flexibleChecksumsMiddlewareOptions);
	clientStack.addRelativeTo(flexibleChecksumsInputMiddleware(config, middlewareConfig), flexibleChecksumsInputMiddlewareOptions);
	clientStack.addRelativeTo(flexibleChecksumsResponseMiddleware(config, middlewareConfig), flexibleChecksumsResponseMiddlewareOptions);
} });
init_dist_es$40();
const resolveFlexibleChecksumsConfig = (input) => {
	const { requestChecksumCalculation, responseChecksumValidation, requestStreamBufferSize } = input;
	return Object.assign(input, {
		requestChecksumCalculation: normalizeProvider$1(requestChecksumCalculation ?? DEFAULT_REQUEST_CHECKSUM_CALCULATION),
		responseChecksumValidation: normalizeProvider$1(responseChecksumValidation ?? DEFAULT_RESPONSE_CHECKSUM_VALIDATION),
		requestStreamBufferSize: Number(requestStreamBufferSize ?? 0)
	});
};
var dist_es_exports$17 = /* @__PURE__ */ __exportAll({
	getHostHeaderPlugin: () => getHostHeaderPlugin,
	hostHeaderMiddleware: () => hostHeaderMiddleware,
	hostHeaderMiddlewareOptions: () => hostHeaderMiddlewareOptions,
	resolveHostHeaderConfig: () => resolveHostHeaderConfig
});
function resolveHostHeaderConfig(input) {
	return input;
}
var hostHeaderMiddleware, hostHeaderMiddlewareOptions, getHostHeaderPlugin;
var init_dist_es$21 = __esmMin((() => {
	init_dist_es$41();
	hostHeaderMiddleware = (options) => (next) => async (args) => {
		if (!HttpRequest.isInstance(args.request)) return next(args);
		const { request } = args;
		const { handlerProtocol = "" } = options.requestHandler.metadata || {};
		if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
			delete request.headers["host"];
			request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
		} else if (!request.headers["host"]) {
			let host = request.hostname;
			if (request.port != null) host += `:${request.port}`;
			request.headers["host"] = host;
		}
		return next(args);
	};
	hostHeaderMiddlewareOptions = {
		name: "hostHeaderMiddleware",
		step: "build",
		priority: "low",
		tags: ["HOST"],
		override: true
	};
	getHostHeaderPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
	} });
}));
var loggerMiddleware, loggerMiddlewareOptions, getLoggerPlugin;
var init_loggerMiddleware = __esmMin((() => {
	loggerMiddleware = () => (next, context) => async (args) => {
		try {
			const response = await next(args);
			const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
			const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
			const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
			const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
			const { $metadata, ...outputWithoutMetadata } = response.output;
			logger?.info?.({
				clientName,
				commandName,
				input: inputFilterSensitiveLog(args.input),
				output: outputFilterSensitiveLog(outputWithoutMetadata),
				metadata: $metadata
			});
			return response;
		} catch (error) {
			const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
			const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
			const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
			logger?.error?.({
				clientName,
				commandName,
				input: inputFilterSensitiveLog(args.input),
				error,
				metadata: error.$metadata
			});
			throw error;
		}
	};
	loggerMiddlewareOptions = {
		name: "loggerMiddleware",
		tags: ["LOGGER"],
		step: "initialize",
		override: true
	};
	getLoggerPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
	} });
}));
var dist_es_exports$16 = /* @__PURE__ */ __exportAll({
	getLoggerPlugin: () => getLoggerPlugin,
	loggerMiddleware: () => loggerMiddleware,
	loggerMiddlewareOptions: () => loggerMiddlewareOptions
});
var init_dist_es$20 = __esmMin((() => {
	init_loggerMiddleware();
}));
var recursionDetectionMiddlewareOptions;
var init_configuration = __esmMin((() => {
	recursionDetectionMiddlewareOptions = {
		step: "build",
		tags: ["RECURSION_DETECTION"],
		name: "recursionDetectionMiddleware",
		override: true,
		priority: "low"
	};
}));
var require_invoke_store = /* @__PURE__ */ __commonJSMin(((exports) => {
	var PROTECTED_KEYS = {
		REQUEST_ID: Symbol.for("_AWS_LAMBDA_REQUEST_ID"),
		X_RAY_TRACE_ID: Symbol.for("_AWS_LAMBDA_X_RAY_TRACE_ID"),
		TENANT_ID: Symbol.for("_AWS_LAMBDA_TENANT_ID")
	};
	var NO_GLOBAL_AWS_LAMBDA = ["true", "1"].includes(process.env?.AWS_LAMBDA_NODEJS_NO_GLOBAL_AWSLAMBDA ?? "");
	if (!NO_GLOBAL_AWS_LAMBDA) globalThis.awslambda = globalThis.awslambda || {};
	var InvokeStoreBase = class {
		static PROTECTED_KEYS = PROTECTED_KEYS;
		isProtectedKey(key) {
			return Object.values(PROTECTED_KEYS).includes(key);
		}
		getRequestId() {
			return this.get(PROTECTED_KEYS.REQUEST_ID) ?? "-";
		}
		getXRayTraceId() {
			return this.get(PROTECTED_KEYS.X_RAY_TRACE_ID);
		}
		getTenantId() {
			return this.get(PROTECTED_KEYS.TENANT_ID);
		}
	};
	var InvokeStoreSingle = class extends InvokeStoreBase {
		currentContext;
		getContext() {
			return this.currentContext;
		}
		hasContext() {
			return this.currentContext !== void 0;
		}
		get(key) {
			return this.currentContext?.[key];
		}
		set(key, value) {
			if (this.isProtectedKey(key)) throw new Error(`Cannot modify protected Lambda context field: ${String(key)}`);
			this.currentContext = this.currentContext || {};
			this.currentContext[key] = value;
		}
		run(context, fn) {
			this.currentContext = context;
			return fn();
		}
	};
	var InvokeStoreMulti = class InvokeStoreMulti extends InvokeStoreBase {
		als;
		static async create() {
			const instance = new InvokeStoreMulti();
			instance.als = new (await (import("node:async_hooks"))).AsyncLocalStorage();
			return instance;
		}
		getContext() {
			return this.als.getStore();
		}
		hasContext() {
			return this.als.getStore() !== void 0;
		}
		get(key) {
			return this.als.getStore()?.[key];
		}
		set(key, value) {
			if (this.isProtectedKey(key)) throw new Error(`Cannot modify protected Lambda context field: ${String(key)}`);
			const store = this.als.getStore();
			if (!store) throw new Error("No context available");
			store[key] = value;
		}
		run(context, fn) {
			return this.als.run(context, fn);
		}
	};
	exports.InvokeStore = void 0;
	(function(InvokeStore) {
		let instance = null;
		async function getInstanceAsync() {
			if (!instance) instance = (async () => {
				const newInstance = "AWS_LAMBDA_MAX_CONCURRENCY" in process.env ? await InvokeStoreMulti.create() : new InvokeStoreSingle();
				if (!NO_GLOBAL_AWS_LAMBDA && globalThis.awslambda?.InvokeStore) return globalThis.awslambda.InvokeStore;
				else if (!NO_GLOBAL_AWS_LAMBDA && globalThis.awslambda) {
					globalThis.awslambda.InvokeStore = newInstance;
					return newInstance;
				} else return newInstance;
			})();
			return instance;
		}
		InvokeStore.getInstanceAsync = getInstanceAsync;
		InvokeStore._testing = process.env.AWS_LAMBDA_BENCHMARK_MODE === "1" ? { reset: () => {
			instance = null;
			if (globalThis.awslambda?.InvokeStore) delete globalThis.awslambda.InvokeStore;
			globalThis.awslambda = { InvokeStore: void 0 };
		} } : void 0;
	})(exports.InvokeStore || (exports.InvokeStore = {}));
	exports.InvokeStoreBase = InvokeStoreBase;
}));
var import_invoke_store, TRACE_ID_HEADER_NAME, ENV_LAMBDA_FUNCTION_NAME, ENV_TRACE_ID, recursionDetectionMiddleware;
var init_recursionDetectionMiddleware = __esmMin((() => {
	import_invoke_store = require_invoke_store();
	init_dist_es$41();
	TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
	ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
	ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
	recursionDetectionMiddleware = () => (next) => async (args) => {
		const { request } = args;
		if (!HttpRequest.isInstance(request)) return next(args);
		const traceIdHeader = Object.keys(request.headers ?? {}).find((h) => h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ?? TRACE_ID_HEADER_NAME;
		if (request.headers.hasOwnProperty(traceIdHeader)) return next(args);
		const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
		const traceIdFromEnv = process.env[ENV_TRACE_ID];
		const traceId = (await import_invoke_store.InvokeStore.getInstanceAsync())?.getXRayTraceId() ?? traceIdFromEnv;
		const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
		if (nonEmptyString(functionName) && nonEmptyString(traceId)) request.headers[TRACE_ID_HEADER_NAME] = traceId;
		return next({
			...args,
			request
		});
	};
}));
var getRecursionDetectionPlugin;
var init_getRecursionDetectionPlugin = __esmMin((() => {
	init_configuration();
	init_recursionDetectionMiddleware();
	getRecursionDetectionPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(recursionDetectionMiddleware(), recursionDetectionMiddlewareOptions);
	} });
}));
var dist_es_exports$15 = /* @__PURE__ */ __exportAll({
	getRecursionDetectionPlugin: () => getRecursionDetectionPlugin,
	recursionDetectionMiddleware: () => recursionDetectionMiddleware
});
var init_dist_es$19 = __esmMin((() => {
	init_getRecursionDetectionPlugin();
	init_recursionDetectionMiddleware();
}));
init_dist_es$41();
init_dist_es$23();
var CONTENT_LENGTH_HEADER$1 = "content-length";
var DECODED_CONTENT_LENGTH_HEADER = "x-amz-decoded-content-length";
function checkContentLengthHeader() {
	return (next, context) => async (args) => {
		const { request } = args;
		if (HttpRequest.isInstance(request)) {
			if (!(CONTENT_LENGTH_HEADER$1 in request.headers) && !(DECODED_CONTENT_LENGTH_HEADER in request.headers)) {
				const message = `Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.`;
				if (typeof context?.logger?.warn === "function" && !(context.logger instanceof NoOpLogger)) context.logger.warn(message);
				else console.warn(message);
			}
		}
		return next({ ...args });
	};
}
const checkContentLengthHeaderMiddlewareOptions = {
	step: "finalizeRequest",
	tags: ["CHECK_CONTENT_LENGTH_HEADER"],
	name: "getCheckContentLengthHeaderPlugin",
	override: true
};
const getCheckContentLengthHeaderPlugin = (unused) => ({ applyToStack: (clientStack) => {
	clientStack.add(checkContentLengthHeader(), checkContentLengthHeaderMiddlewareOptions);
} });
const regionRedirectEndpointMiddleware = (config) => {
	return (next, context) => async (args) => {
		const originalRegion = await config.region();
		const regionProviderRef = config.region;
		let unlock = () => {};
		if (context.__s3RegionRedirect) {
			Object.defineProperty(config, "region", {
				writable: false,
				value: async () => {
					return context.__s3RegionRedirect;
				}
			});
			unlock = () => Object.defineProperty(config, "region", {
				writable: true,
				value: regionProviderRef
			});
		}
		try {
			const result = await next(args);
			if (context.__s3RegionRedirect) {
				unlock();
				if (originalRegion !== await config.region()) throw new Error("Region was not restored following S3 region redirect.");
			}
			return result;
		} catch (e) {
			unlock();
			throw e;
		}
	};
};
const regionRedirectEndpointMiddlewareOptions = {
	tags: ["REGION_REDIRECT", "S3"],
	name: "regionRedirectEndpointMiddleware",
	override: true,
	relation: "before",
	toMiddleware: "endpointV2Middleware"
};
function regionRedirectMiddleware(clientConfig) {
	return (next, context) => async (args) => {
		try {
			return await next(args);
		} catch (err) {
			if (clientConfig.followRegionRedirects) {
				const statusCode = err?.$metadata?.httpStatusCode;
				const isHeadBucket = context.commandName === "HeadBucketCommand";
				const bucketRegionHeader = err?.$response?.headers?.["x-amz-bucket-region"];
				if (bucketRegionHeader) {
					if (statusCode === 301 || statusCode === 400 && (err?.name === "IllegalLocationConstraintException" || isHeadBucket)) {
						try {
							const actualRegion = bucketRegionHeader;
							context.logger?.debug(`Redirecting from ${await clientConfig.region()} to ${actualRegion}`);
							context.__s3RegionRedirect = actualRegion;
						} catch (e) {
							throw new Error("Region redirect failed: " + e);
						}
						return next(args);
					}
				}
			}
			throw err;
		}
	};
}
const regionRedirectMiddlewareOptions = {
	step: "initialize",
	tags: ["REGION_REDIRECT", "S3"],
	name: "regionRedirectMiddleware",
	override: true
};
const getRegionRedirectMiddlewarePlugin = (clientConfig) => ({ applyToStack: (clientStack) => {
	clientStack.add(regionRedirectMiddleware(clientConfig), regionRedirectMiddlewareOptions);
	clientStack.addRelativeTo(regionRedirectEndpointMiddleware(clientConfig), regionRedirectEndpointMiddlewareOptions);
} });
init_dist_es$41();
init_dist_es$23();
const s3ExpiresMiddleware = (config) => {
	return (next, context) => async (args) => {
		const result = await next(args);
		const { response } = result;
		if (HttpResponse.isInstance(response)) {
			if (response.headers.expires) {
				response.headers.expiresstring = response.headers.expires;
				try {
					(0, dist_es_exports$19.parseRfc7231DateTime)(response.headers.expires);
				} catch (e) {
					context.logger?.warn(`AWS SDK Warning for ${context.clientName}::${context.commandName} response parsing (${response.headers.expires}): ${e}`);
					delete response.headers.expires;
				}
			}
		}
		return result;
	};
};
const s3ExpiresMiddlewareOptions = {
	tags: ["S3"],
	name: "s3ExpiresMiddleware",
	override: true,
	relation: "after",
	toMiddleware: "deserializerMiddleware"
};
const getS3ExpiresMiddlewarePlugin = (clientConfig) => ({ applyToStack: (clientStack) => {
	clientStack.addRelativeTo(s3ExpiresMiddleware(clientConfig), s3ExpiresMiddlewareOptions);
} });
var S3ExpressIdentityCache = class S3ExpressIdentityCache {
	data;
	lastPurgeTime = Date.now();
	static EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS = 3e4;
	constructor(data = {}) {
		this.data = data;
	}
	get(key) {
		const entry = this.data[key];
		if (!entry) return;
		return entry;
	}
	set(key, entry) {
		this.data[key] = entry;
		return entry;
	}
	delete(key) {
		delete this.data[key];
	}
	async purgeExpired() {
		const now = Date.now();
		if (this.lastPurgeTime + S3ExpressIdentityCache.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > now) return;
		for (const key in this.data) {
			const entry = this.data[key];
			if (!entry.isRefreshing) {
				const credential = await entry.identity;
				if (credential.expiration) {
					if (credential.expiration.getTime() < now) delete this.data[key];
				}
			}
		}
	}
};
var S3ExpressIdentityCacheEntry = class {
	_identity;
	isRefreshing;
	accessed;
	constructor(_identity, isRefreshing = false, accessed = Date.now()) {
		this._identity = _identity;
		this.isRefreshing = isRefreshing;
		this.accessed = accessed;
	}
	get identity() {
		this.accessed = Date.now();
		return this._identity;
	}
};
var S3ExpressIdentityProviderImpl = class S3ExpressIdentityProviderImpl {
	createSessionFn;
	cache;
	static REFRESH_WINDOW_MS = 6e4;
	constructor(createSessionFn, cache = new S3ExpressIdentityCache()) {
		this.createSessionFn = createSessionFn;
		this.cache = cache;
	}
	async getS3ExpressIdentity(awsIdentity, identityProperties) {
		const key = identityProperties.Bucket;
		const { cache } = this;
		const entry = cache.get(key);
		if (entry) return entry.identity.then((identity) => {
			if ((identity.expiration?.getTime() ?? 0) < Date.now()) return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
			if ((identity.expiration?.getTime() ?? 0) < Date.now() + S3ExpressIdentityProviderImpl.REFRESH_WINDOW_MS && !entry.isRefreshing) {
				entry.isRefreshing = true;
				this.getIdentity(key).then((id) => {
					cache.set(key, new S3ExpressIdentityCacheEntry(Promise.resolve(id)));
				});
			}
			return identity;
		});
		return cache.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
	}
	async getIdentity(key) {
		await this.cache.purgeExpired().catch((error) => {
			console.warn("Error while clearing expired entries in S3ExpressIdentityCache: \n" + error);
		});
		const session = await this.createSessionFn(key);
		if (!session.Credentials?.AccessKeyId || !session.Credentials?.SecretAccessKey) throw new Error("s3#createSession response credential missing AccessKeyId or SecretAccessKey.");
		return {
			accessKeyId: session.Credentials.AccessKeyId,
			secretAccessKey: session.Credentials.SecretAccessKey,
			sessionToken: session.Credentials.SessionToken,
			expiration: session.Credentials.Expiration ? new Date(session.Credentials.Expiration) : void 0
		};
	}
};
var booleanSelector;
var init_booleanSelector = __esmMin((() => {
	booleanSelector = (obj, key, type) => {
		if (!(key in obj)) return void 0;
		if (obj[key] === "true") return true;
		if (obj[key] === "false") return false;
		throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
	};
}));
var init_numberSelector = __esmMin((() => {}));
var SelectorType;
var init_types$5 = __esmMin((() => {
	(function(SelectorType) {
		SelectorType["ENV"] = "env";
		SelectorType["CONFIG"] = "shared config entry";
	})(SelectorType || (SelectorType = {}));
}));
var init_dist_es$18 = __esmMin((() => {
	init_booleanSelector();
	init_numberSelector();
	init_types$5();
}));
init_dist_es$18();
const S3_EXPRESS_AUTH_SCHEME = "sigv4-s3express";
const SESSION_TOKEN_QUERY_PARAM = "X-Amz-S3session-Token";
const SESSION_TOKEN_HEADER = SESSION_TOKEN_QUERY_PARAM.toLowerCase();
const NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME = "AWS_S3_DISABLE_EXPRESS_SESSION_AUTH";
const NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME = "s3_disable_express_session_auth";
const NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS = {
	environmentVariableSelector: (env) => booleanSelector(env, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME, SelectorType.ENV),
	configFileSelector: (profile) => booleanSelector(profile, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME, SelectorType.CONFIG),
	default: false
};
init_dist_es$26();
var SignatureV4S3Express = class extends SignatureV4 {
	async signWithCredentials(requestToSign, credentials, options) {
		const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
		requestToSign.headers[SESSION_TOKEN_HEADER] = credentials.sessionToken;
		const privateAccess = this;
		setSingleOverride(privateAccess, credentialsWithoutSessionToken);
		return privateAccess.signRequest(requestToSign, options ?? {});
	}
	async presignWithCredentials(requestToSign, credentials, options) {
		const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
		delete requestToSign.headers[SESSION_TOKEN_HEADER];
		requestToSign.headers[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
		requestToSign.query = requestToSign.query ?? {};
		requestToSign.query[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
		setSingleOverride(this, credentialsWithoutSessionToken);
		return this.presign(requestToSign, options);
	}
};
function getCredentialsWithoutSessionToken(credentials) {
	return {
		accessKeyId: credentials.accessKeyId,
		secretAccessKey: credentials.secretAccessKey,
		expiration: credentials.expiration
	};
}
function setSingleOverride(privateAccess, credentialsWithoutSessionToken) {
	const id = setTimeout(() => {
		throw new Error("SignatureV4S3Express credential override was created but not called.");
	}, 10);
	const currentCredentialProvider = privateAccess.credentialProvider;
	const overrideCredentialsProviderOnce = () => {
		clearTimeout(id);
		privateAccess.credentialProvider = currentCredentialProvider;
		return Promise.resolve(credentialsWithoutSessionToken);
	};
	privateAccess.credentialProvider = overrideCredentialsProviderOnce;
}
init_dist_es$41();
const s3ExpressMiddleware = (options) => {
	return (next, context) => async (args) => {
		if (context.endpointV2) {
			const endpoint = context.endpointV2;
			const isS3ExpressAuth = endpoint.properties?.authSchemes?.[0]?.name === S3_EXPRESS_AUTH_SCHEME;
			if (endpoint.properties?.backend === "S3Express" || endpoint.properties?.bucketType === "Directory") {
				(0, import_dist_cjs$4.setFeature)(context, "S3_EXPRESS_BUCKET", "J");
				context.isS3ExpressBucket = true;
			}
			if (isS3ExpressAuth) {
				const requestBucket = args.input.Bucket;
				if (requestBucket) {
					const s3ExpressIdentity = await options.s3ExpressIdentityProvider.getS3ExpressIdentity(await options.credentials(), { Bucket: requestBucket });
					context.s3ExpressIdentity = s3ExpressIdentity;
					if (HttpRequest.isInstance(args.request) && s3ExpressIdentity.sessionToken) args.request.headers[SESSION_TOKEN_HEADER] = s3ExpressIdentity.sessionToken;
				}
			}
		}
		return next(args);
	};
};
const s3ExpressMiddlewareOptions = {
	name: "s3ExpressMiddleware",
	step: "build",
	tags: ["S3", "S3_EXPRESS"],
	override: true
};
const getS3ExpressPlugin = (options) => ({ applyToStack: (clientStack) => {
	clientStack.add(s3ExpressMiddleware(options), s3ExpressMiddlewareOptions);
} });
const signS3Express = async (s3ExpressIdentity, signingOptions, request, sigV4MultiRegionSigner) => {
	const signedRequest = await sigV4MultiRegionSigner.signWithCredentials(request, s3ExpressIdentity, {});
	if (signedRequest.headers["X-Amz-Security-Token"] || signedRequest.headers["x-amz-security-token"]) throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
	return signedRequest;
};
var import_dist_cjs$3 = require_dist_cjs$1();
init_dist_es$41();
init_dist_es$40();
var defaultErrorHandler = (signingProperties) => (error) => {
	throw error;
};
var defaultSuccessHandler = (httpResponse, signingProperties) => {};
const s3ExpressHttpSigningMiddleware = (config) => (next, context) => async (args) => {
	if (!HttpRequest.isInstance(args.request)) return next(args);
	const scheme = getSmithyContext(context).selectedHttpAuthScheme;
	if (!scheme) throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
	const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
	let request;
	if (context.s3ExpressIdentity) request = await signS3Express(context.s3ExpressIdentity, signingProperties, args.request, await config.signer());
	else request = await signer.sign(args.request, identity, signingProperties);
	const output = await next({
		...args,
		request
	}).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
	(signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
	return output;
};
const getS3ExpressHttpSigningPlugin = (config) => ({ applyToStack: (clientStack) => {
	clientStack.addRelativeTo(s3ExpressHttpSigningMiddleware(config), import_dist_cjs$3.httpSigningMiddlewareOptions);
} });
const resolveS3Config = (input, { session }) => {
	const [s3ClientProvider, CreateSessionCommandCtor] = session;
	const { forcePathStyle, useAccelerateEndpoint, disableMultiregionAccessPoints, followRegionRedirects, s3ExpressIdentityProvider, bucketEndpoint, expectContinueHeader } = input;
	return Object.assign(input, {
		forcePathStyle: forcePathStyle ?? false,
		useAccelerateEndpoint: useAccelerateEndpoint ?? false,
		disableMultiregionAccessPoints: disableMultiregionAccessPoints ?? false,
		followRegionRedirects: followRegionRedirects ?? false,
		s3ExpressIdentityProvider: s3ExpressIdentityProvider ?? new S3ExpressIdentityProviderImpl(async (key) => s3ClientProvider().send(new CreateSessionCommandCtor({ Bucket: key }))),
		bucketEndpoint: bucketEndpoint ?? false,
		expectContinueHeader: expectContinueHeader ?? 2097152
	});
};
init_dist_es$41();
init_dist_es$29();
var THROW_IF_EMPTY_BODY = {
	CopyObjectCommand: true,
	UploadPartCopyCommand: true,
	CompleteMultipartUploadCommand: true
};
var MAX_BYTES_TO_INSPECT = 3e3;
const throw200ExceptionsMiddleware = (config) => (next, context) => async (args) => {
	const result = await next(args);
	const { response } = result;
	if (!HttpResponse.isInstance(response)) return result;
	const { statusCode, body: sourceBody } = response;
	if (statusCode < 200 || statusCode >= 300) return result;
	if (!(typeof sourceBody?.stream === "function" || typeof sourceBody?.pipe === "function" || typeof sourceBody?.tee === "function")) return result;
	let bodyCopy = sourceBody;
	let body = sourceBody;
	if (sourceBody && typeof sourceBody === "object" && !(sourceBody instanceof Uint8Array)) [bodyCopy, body] = await splitStream(sourceBody);
	response.body = body;
	const bodyBytes = await collectBody(bodyCopy, { streamCollector: async (stream) => {
		return headStream(stream, MAX_BYTES_TO_INSPECT);
	} });
	if (typeof bodyCopy?.destroy === "function") bodyCopy.destroy();
	const bodyStringTail = config.utf8Encoder(bodyBytes.subarray(bodyBytes.length - 16));
	if (bodyBytes.length === 0 && THROW_IF_EMPTY_BODY[context.commandName]) {
		const err = /* @__PURE__ */ new Error("S3 aborted request");
		err.name = "InternalError";
		throw err;
	}
	if (bodyStringTail && bodyStringTail.endsWith("</Error>")) response.statusCode = 400;
	return result;
};
var collectBody = (streamBody = new Uint8Array(), context) => {
	if (streamBody instanceof Uint8Array) return Promise.resolve(streamBody);
	return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
const throw200ExceptionsMiddlewareOptions = {
	relation: "after",
	toMiddleware: "deserializerMiddleware",
	tags: ["THROW_200_EXCEPTIONS", "S3"],
	name: "throw200ExceptionsMiddleware",
	override: true
};
const getThrow200ExceptionsPlugin = (config) => ({ applyToStack: (clientStack) => {
	clientStack.addRelativeTo(throw200ExceptionsMiddleware(config), throw200ExceptionsMiddlewareOptions);
} });
const validate = (str) => typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;
function bucketEndpointMiddleware(options) {
	return (next, context) => async (args) => {
		if (options.bucketEndpoint) {
			const endpoint = context.endpointV2;
			if (endpoint) {
				const bucket = args.input.Bucket;
				if (typeof bucket === "string") try {
					const bucketEndpointUrl = new URL(bucket);
					context.endpointV2 = {
						...endpoint,
						url: bucketEndpointUrl
					};
				} catch (e) {
					const warning = `@aws-sdk/middleware-sdk-s3: bucketEndpoint=true was set but Bucket=${bucket} could not be parsed as URL.`;
					if (context.logger?.constructor?.name === "NoOpLogger") console.warn(warning);
					else context.logger?.warn?.(warning);
					throw e;
				}
			}
		}
		return next(args);
	};
}
const bucketEndpointMiddlewareOptions = {
	name: "bucketEndpointMiddleware",
	override: true,
	relation: "after",
	toMiddleware: "endpointV2Middleware"
};
function validateBucketNameMiddleware({ bucketEndpoint }) {
	return (next) => async (args) => {
		const { input: { Bucket } } = args;
		if (!bucketEndpoint && typeof Bucket === "string" && !validate(Bucket) && Bucket.indexOf("/") >= 0) {
			const err = /* @__PURE__ */ new Error(`Bucket name shouldn't contain '/', received '${Bucket}'`);
			err.name = "InvalidBucketName";
			throw err;
		}
		return next({ ...args });
	};
}
const validateBucketNameMiddlewareOptions = {
	step: "initialize",
	tags: ["VALIDATE_BUCKET_NAME"],
	name: "validateBucketNameMiddleware",
	override: true
};
const getValidateBucketNamePlugin = (options) => ({ applyToStack: (clientStack) => {
	clientStack.add(validateBucketNameMiddleware(options), validateBucketNameMiddlewareOptions);
	clientStack.addRelativeTo(bucketEndpointMiddleware(options), bucketEndpointMiddlewareOptions);
} });
function isValidUserAgentAppId(appId) {
	if (appId === void 0) return true;
	return typeof appId === "string" && appId.length <= 50;
}
function resolveUserAgentConfig(input) {
	const normalizedAppIdProvider = (0, import_dist_cjs$2.normalizeProvider)(input.userAgentAppId ?? void 0);
	const { customUserAgent } = input;
	return Object.assign(input, {
		customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
		userAgentAppId: async () => {
			const appId = await normalizedAppIdProvider();
			if (!isValidUserAgentAppId(appId)) {
				const logger = input.logger?.constructor?.name === "NoOpLogger" || !input.logger ? console : input.logger;
				if (typeof appId !== "string") logger?.warn("userAgentAppId must be a string or undefined.");
				else if (appId.length > 50) logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
			}
			return appId;
		}
	});
}
var import_dist_cjs$2;
var init_configurations$1 = __esmMin((() => {
	import_dist_cjs$2 = require_dist_cjs$1();
}));
var EndpointCache;
var init_EndpointCache = __esmMin((() => {
	EndpointCache = class {
		capacity;
		data = /* @__PURE__ */ new Map();
		parameters = [];
		constructor({ size, params }) {
			this.capacity = size ?? 50;
			if (params) this.parameters = params;
		}
		get(endpointParams, resolver) {
			const key = this.hash(endpointParams);
			if (key === false) return resolver();
			if (!this.data.has(key)) {
				if (this.data.size > this.capacity + 10) {
					const keys = this.data.keys();
					let i = 0;
					while (true) {
						const { value, done } = keys.next();
						this.data.delete(value);
						if (done || ++i > 10) break;
					}
				}
				this.data.set(key, resolver());
			}
			return this.data.get(key);
		}
		size() {
			return this.data.size;
		}
		hash(endpointParams) {
			let buffer = "";
			const { parameters } = this;
			if (parameters.length === 0) return false;
			for (const param of parameters) {
				const val = String(endpointParams[param] ?? "");
				if (val.includes("|;")) return false;
				buffer += val + "|;";
			}
			return buffer;
		}
	};
}));
var IP_V4_REGEX, isIpAddress;
var init_isIpAddress$1 = __esmMin((() => {
	IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
	isIpAddress = (value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]");
}));
var VALID_HOST_LABEL_REGEX, isValidHostLabel;
var init_isValidHostLabel = __esmMin((() => {
	VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
	isValidHostLabel = (value, allowSubDomains = false) => {
		if (!allowSubDomains) return VALID_HOST_LABEL_REGEX.test(value);
		const labels = value.split(".");
		for (const label of labels) if (!isValidHostLabel(label)) return false;
		return true;
	};
}));
var customEndpointFunctions;
var init_customEndpointFunctions = __esmMin((() => {
	customEndpointFunctions = {};
}));
var debugId;
var init_debugId = __esmMin((() => {
	debugId = "endpoints";
}));
function toDebugString(input) {
	if (typeof input !== "object" || input == null) return input;
	if ("ref" in input) return `$${toDebugString(input.ref)}`;
	if ("fn" in input) return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
	return JSON.stringify(input, null, 2);
}
var init_toDebugString = __esmMin((() => {}));
var init_debug = __esmMin((() => {
	init_debugId();
	init_toDebugString();
}));
var EndpointError;
var init_EndpointError$1 = __esmMin((() => {
	EndpointError = class extends Error {
		constructor(message) {
			super(message);
			this.name = "EndpointError";
		}
	};
}));
var init_EndpointFunctions = __esmMin((() => {}));
var init_EndpointRuleObject$1 = __esmMin((() => {}));
var init_ErrorRuleObject$1 = __esmMin((() => {}));
var init_RuleSetObject$1 = __esmMin((() => {}));
var init_TreeRuleObject$1 = __esmMin((() => {}));
var init_shared$1 = __esmMin((() => {}));
var init_types$4 = __esmMin((() => {
	init_EndpointError$1();
	init_EndpointFunctions();
	init_EndpointRuleObject$1();
	init_ErrorRuleObject$1();
	init_RuleSetObject$1();
	init_TreeRuleObject$1();
	init_shared$1();
}));
var booleanEquals;
var init_booleanEquals = __esmMin((() => {
	booleanEquals = (value1, value2) => value1 === value2;
}));
var getAttrPathList;
var init_getAttrPathList = __esmMin((() => {
	init_types$4();
	getAttrPathList = (path) => {
		const parts = path.split(".");
		const pathList = [];
		for (const part of parts) {
			const squareBracketIndex = part.indexOf("[");
			if (squareBracketIndex !== -1) {
				if (part.indexOf("]") !== part.length - 1) throw new EndpointError(`Path: '${path}' does not end with ']'`);
				const arrayIndex = part.slice(squareBracketIndex + 1, -1);
				if (Number.isNaN(parseInt(arrayIndex))) throw new EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
				if (squareBracketIndex !== 0) pathList.push(part.slice(0, squareBracketIndex));
				pathList.push(arrayIndex);
			} else pathList.push(part);
		}
		return pathList;
	};
}));
var getAttr;
var init_getAttr = __esmMin((() => {
	init_types$4();
	init_getAttrPathList();
	getAttr = (value, path) => getAttrPathList(path).reduce((acc, index) => {
		if (typeof acc !== "object") throw new EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
		else if (Array.isArray(acc)) return acc[parseInt(index)];
		return acc[index];
	}, value);
}));
var isSet;
var init_isSet = __esmMin((() => {
	isSet = (value) => value != null;
}));
var not;
var init_not = __esmMin((() => {
	not = (value) => !value;
}));
var DEFAULT_PORTS, parseURL;
var init_parseURL = __esmMin((() => {
	init_dist_es$42();
	init_isIpAddress$1();
	DEFAULT_PORTS = {
		[EndpointURLScheme.HTTP]: 80,
		[EndpointURLScheme.HTTPS]: 443
	};
	parseURL = (value) => {
		const whatwgURL = (() => {
			try {
				if (value instanceof URL) return value;
				if (typeof value === "object" && "hostname" in value) {
					const { hostname, port, protocol = "", path = "", query = {} } = value;
					const url = new URL(`${protocol}//${hostname}${port ? `:${port}` : ""}${path}`);
					url.search = Object.entries(query).map(([k, v]) => `${k}=${v}`).join("&");
					return url;
				}
				return new URL(value);
			} catch (error) {
				return null;
			}
		})();
		if (!whatwgURL) {
			console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
			return null;
		}
		const urlString = whatwgURL.href;
		const { host, hostname, pathname, protocol, search } = whatwgURL;
		if (search) return null;
		const scheme = protocol.slice(0, -1);
		if (!Object.values(EndpointURLScheme).includes(scheme)) return null;
		const isIp = isIpAddress(hostname);
		return {
			scheme,
			authority: `${host}${urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`) ? `:${DEFAULT_PORTS[scheme]}` : ``}`,
			path: pathname,
			normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
			isIp
		};
	};
}));
var stringEquals;
var init_stringEquals = __esmMin((() => {
	stringEquals = (value1, value2) => value1 === value2;
}));
var substring;
var init_substring = __esmMin((() => {
	substring = (input, start, stop, reverse) => {
		if (start >= stop || input.length < stop) return null;
		if (!reverse) return input.substring(start, stop);
		return input.substring(input.length - stop, input.length - start);
	};
}));
var uriEncode;
var init_uriEncode = __esmMin((() => {
	uriEncode = (value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}));
var init_lib = __esmMin((() => {
	init_booleanEquals();
	init_getAttr();
	init_isSet();
	init_isValidHostLabel();
	init_not();
	init_parseURL();
	init_stringEquals();
	init_substring();
	init_uriEncode();
}));
var endpointFunctions;
var init_endpointFunctions = __esmMin((() => {
	init_lib();
	endpointFunctions = {
		booleanEquals,
		getAttr,
		isSet,
		isValidHostLabel,
		not,
		parseURL,
		stringEquals,
		substring,
		uriEncode
	};
}));
var evaluateTemplate;
var init_evaluateTemplate = __esmMin((() => {
	init_lib();
	evaluateTemplate = (template, options) => {
		const evaluatedTemplateArr = [];
		const templateContext = {
			...options.endpointParams,
			...options.referenceRecord
		};
		let currentIndex = 0;
		while (currentIndex < template.length) {
			const openingBraceIndex = template.indexOf("{", currentIndex);
			if (openingBraceIndex === -1) {
				evaluatedTemplateArr.push(template.slice(currentIndex));
				break;
			}
			evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
			const closingBraceIndex = template.indexOf("}", openingBraceIndex);
			if (closingBraceIndex === -1) {
				evaluatedTemplateArr.push(template.slice(openingBraceIndex));
				break;
			}
			if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
				evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
				currentIndex = closingBraceIndex + 2;
			}
			const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
			if (parameterName.includes("#")) {
				const [refName, attrName] = parameterName.split("#");
				evaluatedTemplateArr.push(getAttr(templateContext[refName], attrName));
			} else evaluatedTemplateArr.push(templateContext[parameterName]);
			currentIndex = closingBraceIndex + 1;
		}
		return evaluatedTemplateArr.join("");
	};
}));
var getReferenceValue;
var init_getReferenceValue = __esmMin((() => {
	getReferenceValue = ({ ref }, options) => {
		return {
			...options.endpointParams,
			...options.referenceRecord
		}[ref];
	};
}));
var evaluateExpression, callFunction, group$2;
var init_evaluateExpression = __esmMin((() => {
	init_types$4();
	init_customEndpointFunctions();
	init_endpointFunctions();
	init_evaluateTemplate();
	init_getReferenceValue();
	evaluateExpression = (obj, keyName, options) => {
		if (typeof obj === "string") return evaluateTemplate(obj, options);
		else if (obj["fn"]) return group$2.callFunction(obj, options);
		else if (obj["ref"]) return getReferenceValue(obj, options);
		throw new EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
	};
	callFunction = ({ fn, argv }, options) => {
		const evaluatedArgs = argv.map((arg) => ["boolean", "number"].includes(typeof arg) ? arg : group$2.evaluateExpression(arg, "arg", options));
		const fnSegments = fn.split(".");
		if (fnSegments[0] in customEndpointFunctions && fnSegments[1] != null) return customEndpointFunctions[fnSegments[0]][fnSegments[1]](...evaluatedArgs);
		return endpointFunctions[fn](...evaluatedArgs);
	};
	group$2 = {
		evaluateExpression,
		callFunction
	};
}));
var init_callFunction = __esmMin((() => {
	init_evaluateExpression();
}));
var evaluateCondition;
var init_evaluateCondition = __esmMin((() => {
	init_debug();
	init_types$4();
	init_callFunction();
	evaluateCondition = ({ assign, ...fnArgs }, options) => {
		if (assign && assign in options.referenceRecord) throw new EndpointError(`'${assign}' is already defined in Reference Record.`);
		const value = callFunction(fnArgs, options);
		options.logger?.debug?.(`${debugId} evaluateCondition: ${toDebugString(fnArgs)} = ${toDebugString(value)}`);
		return {
			result: value === "" ? true : !!value,
			...assign != null && { toAssign: {
				name: assign,
				value
			} }
		};
	};
}));
var evaluateConditions;
var init_evaluateConditions = __esmMin((() => {
	init_debug();
	init_evaluateCondition();
	evaluateConditions = (conditions = [], options) => {
		const conditionsReferenceRecord = {};
		for (const condition of conditions) {
			const { result, toAssign } = evaluateCondition(condition, {
				...options,
				referenceRecord: {
					...options.referenceRecord,
					...conditionsReferenceRecord
				}
			});
			if (!result) return { result };
			if (toAssign) {
				conditionsReferenceRecord[toAssign.name] = toAssign.value;
				options.logger?.debug?.(`${debugId} assign: ${toAssign.name} := ${toDebugString(toAssign.value)}`);
			}
		}
		return {
			result: true,
			referenceRecord: conditionsReferenceRecord
		};
	};
}));
var getEndpointHeaders;
var init_getEndpointHeaders = __esmMin((() => {
	init_types$4();
	init_evaluateExpression();
	getEndpointHeaders = (headers, options) => Object.entries(headers).reduce((acc, [headerKey, headerVal]) => ({
		...acc,
		[headerKey]: headerVal.map((headerValEntry) => {
			const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
			if (typeof processedExpr !== "string") throw new EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
			return processedExpr;
		})
	}), {});
}));
var getEndpointProperties, getEndpointProperty, group$1;
var init_getEndpointProperties = __esmMin((() => {
	init_types$4();
	init_evaluateTemplate();
	getEndpointProperties = (properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => ({
		...acc,
		[propertyKey]: group$1.getEndpointProperty(propertyVal, options)
	}), {});
	getEndpointProperty = (property, options) => {
		if (Array.isArray(property)) return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
		switch (typeof property) {
			case "string": return evaluateTemplate(property, options);
			case "object":
				if (property === null) throw new EndpointError(`Unexpected endpoint property: ${property}`);
				return group$1.getEndpointProperties(property, options);
			case "boolean": return property;
			default: throw new EndpointError(`Unexpected endpoint property type: ${typeof property}`);
		}
	};
	group$1 = {
		getEndpointProperty,
		getEndpointProperties
	};
}));
var getEndpointUrl;
var init_getEndpointUrl = __esmMin((() => {
	init_types$4();
	init_evaluateExpression();
	getEndpointUrl = (endpointUrl, options) => {
		const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
		if (typeof expression === "string") try {
			return new URL(expression);
		} catch (error) {
			console.error(`Failed to construct URL with ${expression}`, error);
			throw error;
		}
		throw new EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
	};
}));
var evaluateEndpointRule;
var init_evaluateEndpointRule = __esmMin((() => {
	init_debug();
	init_evaluateConditions();
	init_getEndpointHeaders();
	init_getEndpointProperties();
	init_getEndpointUrl();
	evaluateEndpointRule = (endpointRule, options) => {
		const { conditions, endpoint } = endpointRule;
		const { result, referenceRecord } = evaluateConditions(conditions, options);
		if (!result) return;
		const endpointRuleOptions = {
			...options,
			referenceRecord: {
				...options.referenceRecord,
				...referenceRecord
			}
		};
		const { url, properties, headers } = endpoint;
		options.logger?.debug?.(`${debugId} Resolving endpoint from template: ${toDebugString(endpoint)}`);
		return {
			...headers != void 0 && { headers: getEndpointHeaders(headers, endpointRuleOptions) },
			...properties != void 0 && { properties: getEndpointProperties(properties, endpointRuleOptions) },
			url: getEndpointUrl(url, endpointRuleOptions)
		};
	};
}));
var evaluateErrorRule;
var init_evaluateErrorRule = __esmMin((() => {
	init_types$4();
	init_evaluateConditions();
	init_evaluateExpression();
	evaluateErrorRule = (errorRule, options) => {
		const { conditions, error } = errorRule;
		const { result, referenceRecord } = evaluateConditions(conditions, options);
		if (!result) return;
		throw new EndpointError(evaluateExpression(error, "Error", {
			...options,
			referenceRecord: {
				...options.referenceRecord,
				...referenceRecord
			}
		}));
	};
}));
var evaluateRules, evaluateTreeRule, group;
var init_evaluateRules = __esmMin((() => {
	init_types$4();
	init_evaluateConditions();
	init_evaluateEndpointRule();
	init_evaluateErrorRule();
	evaluateRules = (rules, options) => {
		for (const rule of rules) if (rule.type === "endpoint") {
			const endpointOrUndefined = evaluateEndpointRule(rule, options);
			if (endpointOrUndefined) return endpointOrUndefined;
		} else if (rule.type === "error") evaluateErrorRule(rule, options);
		else if (rule.type === "tree") {
			const endpointOrUndefined = group.evaluateTreeRule(rule, options);
			if (endpointOrUndefined) return endpointOrUndefined;
		} else throw new EndpointError(`Unknown endpoint rule: ${rule}`);
		throw new EndpointError(`Rules evaluation failed`);
	};
	evaluateTreeRule = (treeRule, options) => {
		const { conditions, rules } = treeRule;
		const { result, referenceRecord } = evaluateConditions(conditions, options);
		if (!result) return;
		return group.evaluateRules(rules, {
			...options,
			referenceRecord: {
				...options.referenceRecord,
				...referenceRecord
			}
		});
	};
	group = {
		evaluateRules,
		evaluateTreeRule
	};
}));
var init_utils = __esmMin((() => {
	init_customEndpointFunctions();
	init_evaluateRules();
}));
var resolveEndpoint;
var init_resolveEndpoint$1 = __esmMin((() => {
	init_debug();
	init_types$4();
	init_utils();
	resolveEndpoint = (ruleSetObject, options) => {
		const { endpointParams, logger } = options;
		const { parameters, rules } = ruleSetObject;
		options.logger?.debug?.(`${debugId} Initial EndpointParams: ${toDebugString(endpointParams)}`);
		const paramsWithDefault = Object.entries(parameters).filter(([, v]) => v.default != null).map(([k, v]) => [k, v.default]);
		if (paramsWithDefault.length > 0) for (const [paramKey, paramDefaultValue] of paramsWithDefault) endpointParams[paramKey] = endpointParams[paramKey] ?? paramDefaultValue;
		const requiredParams = Object.entries(parameters).filter(([, v]) => v.required).map(([k]) => k);
		for (const requiredParam of requiredParams) if (endpointParams[requiredParam] == null) throw new EndpointError(`Missing required parameter: '${requiredParam}'`);
		const endpoint = evaluateRules(rules, {
			endpointParams,
			logger,
			referenceRecord: {}
		});
		options.logger?.debug?.(`${debugId} Resolved endpoint: ${toDebugString(endpoint)}`);
		return endpoint;
	};
}));
var dist_es_exports$14 = /* @__PURE__ */ __exportAll({
	EndpointCache: () => EndpointCache,
	EndpointError: () => EndpointError,
	customEndpointFunctions: () => customEndpointFunctions,
	isIpAddress: () => isIpAddress,
	isValidHostLabel: () => isValidHostLabel,
	resolveEndpoint: () => resolveEndpoint
});
var init_dist_es$17 = __esmMin((() => {
	init_EndpointCache();
	init_isIpAddress$1();
	init_isValidHostLabel();
	init_customEndpointFunctions();
	init_resolveEndpoint$1();
	init_types$4();
}));
var init_isIpAddress = __esmMin((() => {
	init_dist_es$17();
}));
var isVirtualHostableS3Bucket;
var init_isVirtualHostableS3Bucket = __esmMin((() => {
	init_dist_es$17();
	init_isIpAddress();
	isVirtualHostableS3Bucket = (value, allowSubDomains = false) => {
		if (allowSubDomains) {
			for (const label of value.split(".")) if (!isVirtualHostableS3Bucket(label)) return false;
			return true;
		}
		if (!isValidHostLabel(value)) return false;
		if (value.length < 3 || value.length > 63) return false;
		if (value !== value.toLowerCase()) return false;
		if (isIpAddress(value)) return false;
		return true;
	};
}));
var ARN_DELIMITER, RESOURCE_DELIMITER, parseArn;
var init_parseArn = __esmMin((() => {
	ARN_DELIMITER = ":";
	RESOURCE_DELIMITER = "/";
	parseArn = (value) => {
		const segments = value.split(ARN_DELIMITER);
		if (segments.length < 6) return null;
		const [arn, partition, service, region, accountId, ...resourcePath] = segments;
		if (arn !== "arn" || partition === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "") return null;
		return {
			partition,
			service,
			region,
			accountId,
			resourceId: resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat()
		};
	};
})), partitions, partitions_default;
var init_partitions = __esmMin((() => {
	partitions = [
		{
			"id": "aws",
			"outputs": {
				"dnsSuffix": "amazonaws.com",
				"dualStackDnsSuffix": "api.aws",
				"implicitGlobalRegion": "us-east-1",
				"name": "aws",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
			"regions": {
				"af-south-1": { "description": "Africa (Cape Town)" },
				"ap-east-1": { "description": "Asia Pacific (Hong Kong)" },
				"ap-east-2": { "description": "Asia Pacific (Taipei)" },
				"ap-northeast-1": { "description": "Asia Pacific (Tokyo)" },
				"ap-northeast-2": { "description": "Asia Pacific (Seoul)" },
				"ap-northeast-3": { "description": "Asia Pacific (Osaka)" },
				"ap-south-1": { "description": "Asia Pacific (Mumbai)" },
				"ap-south-2": { "description": "Asia Pacific (Hyderabad)" },
				"ap-southeast-1": { "description": "Asia Pacific (Singapore)" },
				"ap-southeast-2": { "description": "Asia Pacific (Sydney)" },
				"ap-southeast-3": { "description": "Asia Pacific (Jakarta)" },
				"ap-southeast-4": { "description": "Asia Pacific (Melbourne)" },
				"ap-southeast-5": { "description": "Asia Pacific (Malaysia)" },
				"ap-southeast-6": { "description": "Asia Pacific (New Zealand)" },
				"ap-southeast-7": { "description": "Asia Pacific (Thailand)" },
				"aws-global": { "description": "aws global region" },
				"ca-central-1": { "description": "Canada (Central)" },
				"ca-west-1": { "description": "Canada West (Calgary)" },
				"eu-central-1": { "description": "Europe (Frankfurt)" },
				"eu-central-2": { "description": "Europe (Zurich)" },
				"eu-north-1": { "description": "Europe (Stockholm)" },
				"eu-south-1": { "description": "Europe (Milan)" },
				"eu-south-2": { "description": "Europe (Spain)" },
				"eu-west-1": { "description": "Europe (Ireland)" },
				"eu-west-2": { "description": "Europe (London)" },
				"eu-west-3": { "description": "Europe (Paris)" },
				"il-central-1": { "description": "Israel (Tel Aviv)" },
				"me-central-1": { "description": "Middle East (UAE)" },
				"me-south-1": { "description": "Middle East (Bahrain)" },
				"mx-central-1": { "description": "Mexico (Central)" },
				"sa-east-1": { "description": "South America (Sao Paulo)" },
				"us-east-1": { "description": "US East (N. Virginia)" },
				"us-east-2": { "description": "US East (Ohio)" },
				"us-west-1": { "description": "US West (N. California)" },
				"us-west-2": { "description": "US West (Oregon)" }
			}
		},
		{
			"id": "aws-cn",
			"outputs": {
				"dnsSuffix": "amazonaws.com.cn",
				"dualStackDnsSuffix": "api.amazonwebservices.com.cn",
				"implicitGlobalRegion": "cn-northwest-1",
				"name": "aws-cn",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^cn\\-\\w+\\-\\d+$",
			"regions": {
				"aws-cn-global": { "description": "aws-cn global region" },
				"cn-north-1": { "description": "China (Beijing)" },
				"cn-northwest-1": { "description": "China (Ningxia)" }
			}
		},
		{
			"id": "aws-eusc",
			"outputs": {
				"dnsSuffix": "amazonaws.eu",
				"dualStackDnsSuffix": "api.amazonwebservices.eu",
				"implicitGlobalRegion": "eusc-de-east-1",
				"name": "aws-eusc",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^eusc\\-(de)\\-\\w+\\-\\d+$",
			"regions": { "eusc-de-east-1": { "description": "AWS European Sovereign Cloud (Germany)" } }
		},
		{
			"id": "aws-iso",
			"outputs": {
				"dnsSuffix": "c2s.ic.gov",
				"dualStackDnsSuffix": "api.aws.ic.gov",
				"implicitGlobalRegion": "us-iso-east-1",
				"name": "aws-iso",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^us\\-iso\\-\\w+\\-\\d+$",
			"regions": {
				"aws-iso-global": { "description": "aws-iso global region" },
				"us-iso-east-1": { "description": "US ISO East" },
				"us-iso-west-1": { "description": "US ISO WEST" }
			}
		},
		{
			"id": "aws-iso-b",
			"outputs": {
				"dnsSuffix": "sc2s.sgov.gov",
				"dualStackDnsSuffix": "api.aws.scloud",
				"implicitGlobalRegion": "us-isob-east-1",
				"name": "aws-iso-b",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^us\\-isob\\-\\w+\\-\\d+$",
			"regions": {
				"aws-iso-b-global": { "description": "aws-iso-b global region" },
				"us-isob-east-1": { "description": "US ISOB East (Ohio)" },
				"us-isob-west-1": { "description": "US ISOB West" }
			}
		},
		{
			"id": "aws-iso-e",
			"outputs": {
				"dnsSuffix": "cloud.adc-e.uk",
				"dualStackDnsSuffix": "api.cloud-aws.adc-e.uk",
				"implicitGlobalRegion": "eu-isoe-west-1",
				"name": "aws-iso-e",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^eu\\-isoe\\-\\w+\\-\\d+$",
			"regions": {
				"aws-iso-e-global": { "description": "aws-iso-e global region" },
				"eu-isoe-west-1": { "description": "EU ISOE West" }
			}
		},
		{
			"id": "aws-iso-f",
			"outputs": {
				"dnsSuffix": "csp.hci.ic.gov",
				"dualStackDnsSuffix": "api.aws.hci.ic.gov",
				"implicitGlobalRegion": "us-isof-south-1",
				"name": "aws-iso-f",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^us\\-isof\\-\\w+\\-\\d+$",
			"regions": {
				"aws-iso-f-global": { "description": "aws-iso-f global region" },
				"us-isof-east-1": { "description": "US ISOF EAST" },
				"us-isof-south-1": { "description": "US ISOF SOUTH" }
			}
		},
		{
			"id": "aws-us-gov",
			"outputs": {
				"dnsSuffix": "amazonaws.com",
				"dualStackDnsSuffix": "api.aws",
				"implicitGlobalRegion": "us-gov-west-1",
				"name": "aws-us-gov",
				"supportsDualStack": true,
				"supportsFIPS": true
			},
			"regionRegex": "^us\\-gov\\-\\w+\\-\\d+$",
			"regions": {
				"aws-us-gov-global": { "description": "aws-us-gov global region" },
				"us-gov-east-1": { "description": "AWS GovCloud (US-East)" },
				"us-gov-west-1": { "description": "AWS GovCloud (US-West)" }
			}
		}
	];
	partitions_default = {
		partitions,
		version: "1.1"
	};
}));
var selectedPartitionsInfo, selectedUserAgentPrefix, partition, setPartitionInfo, useDefaultPartitionInfo, getUserAgentPrefix;
var init_partition = __esmMin((() => {
	init_partitions();
	selectedPartitionsInfo = partitions_default;
	selectedUserAgentPrefix = "";
	partition = (value) => {
		const { partitions } = selectedPartitionsInfo;
		for (const partition of partitions) {
			const { regions, outputs } = partition;
			for (const [region, regionData] of Object.entries(regions)) if (region === value) return {
				...outputs,
				...regionData
			};
		}
		for (const partition of partitions) {
			const { regionRegex, outputs } = partition;
			if (new RegExp(regionRegex).test(value)) return { ...outputs };
		}
		const DEFAULT_PARTITION = partitions.find((partition) => partition.id === "aws");
		if (!DEFAULT_PARTITION) throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
		return { ...DEFAULT_PARTITION.outputs };
	};
	setPartitionInfo = (partitionsInfo, userAgentPrefix = "") => {
		selectedPartitionsInfo = partitionsInfo;
		selectedUserAgentPrefix = userAgentPrefix;
	};
	useDefaultPartitionInfo = () => {
		setPartitionInfo(partitions_default, "");
	};
	getUserAgentPrefix = () => selectedUserAgentPrefix;
}));
var awsEndpointFunctions;
var init_aws = __esmMin((() => {
	init_dist_es$17();
	init_isVirtualHostableS3Bucket();
	init_parseArn();
	init_partition();
	awsEndpointFunctions = {
		isVirtualHostableS3Bucket,
		parseArn,
		partition
	};
	customEndpointFunctions.aws = awsEndpointFunctions;
}));
function parseQueryString(querystring) {
	const query = {};
	querystring = querystring.replace(/^\?/, "");
	if (querystring) for (const pair of querystring.split("&")) {
		let [key, value = null] = pair.split("=");
		key = decodeURIComponent(key);
		if (value) value = decodeURIComponent(value);
		if (!(key in query)) query[key] = value;
		else if (Array.isArray(query[key])) query[key].push(value);
		else query[key] = [query[key], value];
	}
	return query;
}
var init_dist_es$16 = __esmMin((() => {}));
var dist_es_exports$13 = /* @__PURE__ */ __exportAll({ parseUrl: () => parseUrl });
var parseUrl;
var init_dist_es$15 = __esmMin((() => {
	init_dist_es$16();
	parseUrl = (url) => {
		if (typeof url === "string") return parseUrl(new URL(url));
		const { hostname, pathname, port, protocol, search } = url;
		let query;
		if (search) query = parseQueryString(search);
		return {
			hostname,
			port: port ? parseInt(port) : void 0,
			protocol,
			path: pathname,
			query
		};
	};
}));
var resolveDefaultAwsRegionalEndpointsConfig, toEndpointV1$1;
var init_resolveDefaultAwsRegionalEndpointsConfig = __esmMin((() => {
	init_dist_es$15();
	resolveDefaultAwsRegionalEndpointsConfig = (input) => {
		if (typeof input.endpointProvider !== "function") throw new Error("@aws-sdk/util-endpoint - endpointProvider and endpoint missing in config for this client.");
		const { endpoint } = input;
		if (endpoint === void 0) input.endpoint = async () => {
			return toEndpointV1$1(input.endpointProvider({
				Region: typeof input.region === "function" ? await input.region() : input.region,
				UseDualStack: typeof input.useDualstackEndpoint === "function" ? await input.useDualstackEndpoint() : input.useDualstackEndpoint,
				UseFIPS: typeof input.useFipsEndpoint === "function" ? await input.useFipsEndpoint() : input.useFipsEndpoint,
				Endpoint: void 0
			}, { logger: input.logger }));
		};
		return input;
	};
	toEndpointV1$1 = (endpoint) => parseUrl(endpoint.url);
}));
var init_resolveEndpoint = __esmMin((() => {
	init_dist_es$17();
}));
var init_EndpointError = __esmMin((() => {
	init_dist_es$17();
}));
var init_EndpointRuleObject = __esmMin((() => {}));
var init_ErrorRuleObject = __esmMin((() => {}));
var init_RuleSetObject = __esmMin((() => {}));
var init_TreeRuleObject = __esmMin((() => {}));
var init_shared = __esmMin((() => {}));
var init_types$3 = __esmMin((() => {
	init_EndpointError();
	init_EndpointRuleObject();
	init_ErrorRuleObject();
	init_RuleSetObject();
	init_TreeRuleObject();
	init_shared();
}));
var dist_es_exports$12 = /* @__PURE__ */ __exportAll({
	EndpointError: () => EndpointError,
	awsEndpointFunctions: () => awsEndpointFunctions,
	getUserAgentPrefix: () => getUserAgentPrefix,
	isIpAddress: () => isIpAddress,
	partition: () => partition,
	resolveDefaultAwsRegionalEndpointsConfig: () => resolveDefaultAwsRegionalEndpointsConfig,
	resolveEndpoint: () => resolveEndpoint,
	setPartitionInfo: () => setPartitionInfo,
	toEndpointV1: () => toEndpointV1$1,
	useDefaultPartitionInfo: () => useDefaultPartitionInfo
});
var init_dist_es$14 = __esmMin((() => {
	init_aws();
	init_partition();
	init_isIpAddress();
	init_resolveDefaultAwsRegionalEndpointsConfig();
	init_resolveEndpoint();
	init_types$3();
}));
async function checkFeatures(context, config, args) {
	if (args.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") (0, import_dist_cjs$1.setFeature)(context, "PROTOCOL_RPC_V2_CBOR", "M");
	if (typeof config.retryStrategy === "function") {
		const retryStrategy = await config.retryStrategy();
		if (typeof retryStrategy.acquireInitialRetryToken === "function") if (retryStrategy.constructor?.name?.includes("Adaptive")) (0, import_dist_cjs$1.setFeature)(context, "RETRY_MODE_ADAPTIVE", "F");
		else (0, import_dist_cjs$1.setFeature)(context, "RETRY_MODE_STANDARD", "E");
		else (0, import_dist_cjs$1.setFeature)(context, "RETRY_MODE_LEGACY", "D");
	}
	if (typeof config.accountIdEndpointMode === "function") {
		const endpointV2 = context.endpointV2;
		if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) (0, import_dist_cjs$1.setFeature)(context, "ACCOUNT_ID_ENDPOINT", "O");
		switch (await config.accountIdEndpointMode?.()) {
			case "disabled":
				(0, import_dist_cjs$1.setFeature)(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
				break;
			case "preferred":
				(0, import_dist_cjs$1.setFeature)(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
				break;
			case "required":
				(0, import_dist_cjs$1.setFeature)(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
				break;
		}
	}
	const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
	if (identity?.$source) {
		const credentials = identity;
		if (credentials.accountId) (0, import_dist_cjs$1.setFeature)(context, "RESOLVED_ACCOUNT_ID", "T");
		for (const [key, value] of Object.entries(credentials.$source ?? {})) (0, import_dist_cjs$1.setFeature)(context, key, value);
	}
}
var import_dist_cjs$1, ACCOUNT_ID_ENDPOINT_REGEX;
var init_check_features = __esmMin((() => {
	import_dist_cjs$1 = require_dist_cjs();
	ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
}));
var USER_AGENT, X_AMZ_USER_AGENT, UA_NAME_ESCAPE_REGEX, UA_VALUE_ESCAPE_REGEX;
var init_constants$4 = __esmMin((() => {
	USER_AGENT = "user-agent";
	X_AMZ_USER_AGENT = "x-amz-user-agent";
	UA_NAME_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w]/g;
	UA_VALUE_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w#]/g;
}));
function encodeFeatures(features) {
	let buffer = "";
	for (const key in features) {
		const val = features[key];
		if (buffer.length + val.length + 1 <= BYTE_LIMIT) {
			if (buffer.length) buffer += "," + val;
			else buffer += val;
			continue;
		}
		break;
	}
	return buffer;
}
var BYTE_LIMIT;
var init_encode_features = __esmMin((() => {
	BYTE_LIMIT = 1024;
}));
var userAgentMiddleware, escapeUserAgent, getUserAgentMiddlewareOptions, getUserAgentPlugin;
var init_user_agent_middleware = __esmMin((() => {
	init_dist_es$14();
	init_dist_es$41();
	init_check_features();
	init_constants$4();
	init_encode_features();
	userAgentMiddleware = (options) => (next, context) => async (args) => {
		const { request } = args;
		if (!HttpRequest.isInstance(request)) return next(args);
		const { headers } = request;
		const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
		const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
		await checkFeatures(context, options, args);
		const awsContext = context;
		defaultUserAgent.push(`m/${encodeFeatures(Object.assign({}, context.__smithy_context?.features, awsContext.__aws_sdk_context?.features))}`);
		const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
		const appId = await options.userAgentAppId();
		if (appId) defaultUserAgent.push(escapeUserAgent([`app`, `${appId}`]));
		const prefix = getUserAgentPrefix();
		const sdkUserAgentValue = (prefix ? [prefix] : []).concat([
			...defaultUserAgent,
			...userAgent,
			...customUserAgent
		]).join(" ");
		const normalUAValue = [...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")), ...customUserAgent].join(" ");
		if (options.runtime !== "browser") {
			if (normalUAValue) headers[X_AMZ_USER_AGENT] = headers["x-amz-user-agent"] ? `${headers[USER_AGENT]} ${normalUAValue}` : normalUAValue;
			headers[USER_AGENT] = sdkUserAgentValue;
		} else headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
		return next({
			...args,
			request
		});
	};
	escapeUserAgent = (userAgentPair) => {
		const name = userAgentPair[0].split("/").map((part) => part.replace(UA_NAME_ESCAPE_REGEX, "-")).join("/");
		const version = userAgentPair[1]?.replace(UA_VALUE_ESCAPE_REGEX, "-");
		const prefixSeparatorIndex = name.indexOf("/");
		const prefix = name.substring(0, prefixSeparatorIndex);
		let uaName = name.substring(prefixSeparatorIndex + 1);
		if (prefix === "api") uaName = uaName.toLowerCase();
		return [
			prefix,
			uaName,
			version
		].filter((item) => item && item.length > 0).reduce((acc, item, index) => {
			switch (index) {
				case 0: return item;
				case 1: return `${acc}/${item}`;
				default: return `${acc}#${item}`;
			}
		}, "");
	};
	getUserAgentMiddlewareOptions = {
		name: "getUserAgentMiddleware",
		step: "build",
		priority: "low",
		tags: ["SET_USER_AGENT", "USER_AGENT"],
		override: true
	};
	getUserAgentPlugin = (config) => ({ applyToStack: (clientStack) => {
		clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
	} });
}));
var dist_es_exports$11 = /* @__PURE__ */ __exportAll({
	DEFAULT_UA_APP_ID: () => void 0,
	getUserAgentMiddlewareOptions: () => getUserAgentMiddlewareOptions,
	getUserAgentPlugin: () => getUserAgentPlugin,
	resolveUserAgentConfig: () => resolveUserAgentConfig,
	userAgentMiddleware: () => userAgentMiddleware
});
var init_dist_es$13 = __esmMin((() => {
	init_configurations$1();
	init_user_agent_middleware();
})), ENV_USE_DUALSTACK_ENDPOINT, CONFIG_USE_DUALSTACK_ENDPOINT, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS;
var init_NodeUseDualstackEndpointConfigOptions = __esmMin((() => {
	init_dist_es$18();
	ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
	CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
	NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_DUALSTACK_ENDPOINT, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_DUALSTACK_ENDPOINT, SelectorType.CONFIG),
		default: false
	};
})), ENV_USE_FIPS_ENDPOINT, CONFIG_USE_FIPS_ENDPOINT, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS;
var init_NodeUseFipsEndpointConfigOptions = __esmMin((() => {
	init_dist_es$18();
	ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
	CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
	NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_FIPS_ENDPOINT, SelectorType.ENV),
		configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_FIPS_ENDPOINT, SelectorType.CONFIG),
		default: false
	};
}));
var resolveCustomEndpointsConfig;
var init_resolveCustomEndpointsConfig = __esmMin((() => {
	init_dist_es$40();
	resolveCustomEndpointsConfig = (input) => {
		const { tls, endpoint, urlParser, useDualstackEndpoint } = input;
		return Object.assign(input, {
			tls: tls ?? true,
			endpoint: normalizeProvider$1(typeof endpoint === "string" ? urlParser(endpoint) : endpoint),
			isCustomEndpoint: true,
			useDualstackEndpoint: normalizeProvider$1(useDualstackEndpoint ?? false)
		});
	};
}));
var getEndpointFromRegion;
var init_getEndpointFromRegion = __esmMin((() => {
	getEndpointFromRegion = async (input) => {
		const { tls = true } = input;
		const region = await input.region();
		if (!(/* @__PURE__ */ new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/)).test(region)) throw new Error("Invalid region in client config");
		const useDualstackEndpoint = await input.useDualstackEndpoint();
		const useFipsEndpoint = await input.useFipsEndpoint();
		const { hostname } = await input.regionInfoProvider(region, {
			useDualstackEndpoint,
			useFipsEndpoint
		}) ?? {};
		if (!hostname) throw new Error("Cannot resolve hostname from client config");
		return input.urlParser(`${tls ? "https:" : "http:"}//${hostname}`);
	};
}));
var resolveEndpointsConfig;
var init_resolveEndpointsConfig = __esmMin((() => {
	init_dist_es$40();
	init_getEndpointFromRegion();
	resolveEndpointsConfig = (input) => {
		const useDualstackEndpoint = normalizeProvider$1(input.useDualstackEndpoint ?? false);
		const { endpoint, useFipsEndpoint, urlParser, tls } = input;
		return Object.assign(input, {
			tls: tls ?? true,
			endpoint: endpoint ? normalizeProvider$1(typeof endpoint === "string" ? urlParser(endpoint) : endpoint) : () => getEndpointFromRegion({
				...input,
				useDualstackEndpoint,
				useFipsEndpoint
			}),
			isCustomEndpoint: !!endpoint,
			useDualstackEndpoint
		});
	};
}));
var init_endpointsConfig = __esmMin((() => {
	init_NodeUseDualstackEndpointConfigOptions();
	init_NodeUseFipsEndpointConfigOptions();
	init_resolveCustomEndpointsConfig();
	init_resolveEndpointsConfig();
}));
var REGION_ENV_NAME, REGION_INI_NAME, NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS;
var init_config$1 = __esmMin((() => {
	REGION_ENV_NAME = "AWS_REGION";
	REGION_INI_NAME = "region";
	NODE_REGION_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => env[REGION_ENV_NAME],
		configFileSelector: (profile) => profile[REGION_INI_NAME],
		default: () => {
			throw new Error("Region is missing");
		}
	};
	NODE_REGION_CONFIG_FILE_OPTIONS = { preferredFile: "credentials" };
}));
var validRegions, checkRegion;
var init_checkRegion = __esmMin((() => {
	init_dist_es$17();
	validRegions = /* @__PURE__ */ new Set();
	checkRegion = (region, check = isValidHostLabel) => {
		if (!validRegions.has(region) && !check(region)) if (region === "*") console.warn(`@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.`);
		else throw new Error(`Region not accepted: region="${region}" is not a valid hostname component.`);
		else validRegions.add(region);
	};
}));
var isFipsRegion;
var init_isFipsRegion = __esmMin((() => {
	isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));
}));
var getRealRegion;
var init_getRealRegion = __esmMin((() => {
	init_isFipsRegion();
	getRealRegion = (region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;
}));
var resolveRegionConfig;
var init_resolveRegionConfig = __esmMin((() => {
	init_checkRegion();
	init_getRealRegion();
	init_isFipsRegion();
	resolveRegionConfig = (input) => {
		const { region, useFipsEndpoint } = input;
		if (!region) throw new Error("Region is missing");
		return Object.assign(input, {
			region: async () => {
				const realRegion = getRealRegion(typeof region === "function" ? await region() : region);
				checkRegion(realRegion);
				return realRegion;
			},
			useFipsEndpoint: async () => {
				if (isFipsRegion(typeof region === "string" ? region : await region())) return true;
				return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
			}
		});
	};
}));
var init_regionConfig = __esmMin((() => {
	init_config$1();
	init_resolveRegionConfig();
}));
var init_PartitionHash = __esmMin((() => {}));
var init_RegionHash = __esmMin((() => {}));
var getHostnameFromVariants;
var init_getHostnameFromVariants = __esmMin((() => {
	getHostnameFromVariants = (variants = [], { useFipsEndpoint, useDualstackEndpoint }) => variants.find(({ tags }) => useFipsEndpoint === tags.includes("fips") && useDualstackEndpoint === tags.includes("dualstack"))?.hostname;
}));
var getResolvedHostname;
var init_getResolvedHostname = __esmMin((() => {
	getResolvedHostname = (resolvedRegion, { regionHostname, partitionHostname }) => regionHostname ? regionHostname : partitionHostname ? partitionHostname.replace("{region}", resolvedRegion) : void 0;
}));
var getResolvedPartition;
var init_getResolvedPartition = __esmMin((() => {
	getResolvedPartition = (region, { partitionHash }) => Object.keys(partitionHash || {}).find((key) => partitionHash[key].regions.includes(region)) ?? "aws";
}));
var getResolvedSigningRegion;
var init_getResolvedSigningRegion = __esmMin((() => {
	getResolvedSigningRegion = (hostname, { signingRegion, regionRegex, useFipsEndpoint }) => {
		if (signingRegion) return signingRegion;
		else if (useFipsEndpoint) {
			const regionRegexJs = regionRegex.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\.");
			const regionRegexmatchArray = hostname.match(regionRegexJs);
			if (regionRegexmatchArray) return regionRegexmatchArray[0].slice(1, -1);
		}
	};
}));
var getRegionInfo;
var init_getRegionInfo = __esmMin((() => {
	init_getHostnameFromVariants();
	init_getResolvedHostname();
	init_getResolvedPartition();
	init_getResolvedSigningRegion();
	getRegionInfo = (region, { useFipsEndpoint = false, useDualstackEndpoint = false, signingService, regionHash, partitionHash }) => {
		const partition = getResolvedPartition(region, { partitionHash });
		const resolvedRegion = region in regionHash ? region : partitionHash[partition]?.endpoint ?? region;
		const hostnameOptions = {
			useFipsEndpoint,
			useDualstackEndpoint
		};
		const hostname = getResolvedHostname(resolvedRegion, {
			regionHostname: getHostnameFromVariants(regionHash[resolvedRegion]?.variants, hostnameOptions),
			partitionHostname: getHostnameFromVariants(partitionHash[partition]?.variants, hostnameOptions)
		});
		if (hostname === void 0) throw new Error(`Endpoint resolution failed for: [object Object]`);
		const signingRegion = getResolvedSigningRegion(hostname, {
			signingRegion: regionHash[resolvedRegion]?.signingRegion,
			regionRegex: partitionHash[partition].regionRegex,
			useFipsEndpoint
		});
		return {
			partition,
			signingService,
			hostname,
			...signingRegion && { signingRegion },
			...regionHash[resolvedRegion]?.signingService && { signingService: regionHash[resolvedRegion].signingService }
		};
	};
}));
var init_regionInfo = __esmMin((() => {
	init_PartitionHash();
	init_RegionHash();
	init_getRegionInfo();
}));
var dist_es_exports$10 = /* @__PURE__ */ __exportAll({
	CONFIG_USE_DUALSTACK_ENDPOINT: () => CONFIG_USE_DUALSTACK_ENDPOINT,
	CONFIG_USE_FIPS_ENDPOINT: () => CONFIG_USE_FIPS_ENDPOINT,
	DEFAULT_USE_DUALSTACK_ENDPOINT: () => false,
	DEFAULT_USE_FIPS_ENDPOINT: () => false,
	ENV_USE_DUALSTACK_ENDPOINT: () => ENV_USE_DUALSTACK_ENDPOINT,
	ENV_USE_FIPS_ENDPOINT: () => ENV_USE_FIPS_ENDPOINT,
	NODE_REGION_CONFIG_FILE_OPTIONS: () => NODE_REGION_CONFIG_FILE_OPTIONS,
	NODE_REGION_CONFIG_OPTIONS: () => NODE_REGION_CONFIG_OPTIONS,
	NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,
	NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,
	REGION_ENV_NAME: () => REGION_ENV_NAME,
	REGION_INI_NAME: () => REGION_INI_NAME,
	getRegionInfo: () => getRegionInfo,
	resolveCustomEndpointsConfig: () => resolveCustomEndpointsConfig,
	resolveEndpointsConfig: () => resolveEndpointsConfig,
	resolveRegionConfig: () => resolveRegionConfig
});
var init_dist_es$12 = __esmMin((() => {
	init_endpointsConfig();
	init_regionConfig();
	init_regionInfo();
}));
const resolveEventStreamSerdeConfig = (input) => Object.assign(input, { eventStreamMarshaller: input.eventStreamSerdeProvider(input) });
var dist_es_exports$9 = /* @__PURE__ */ __exportAll({
	contentLengthMiddleware: () => contentLengthMiddleware,
	contentLengthMiddlewareOptions: () => contentLengthMiddlewareOptions,
	getContentLengthPlugin: () => getContentLengthPlugin
});
function contentLengthMiddleware(bodyLengthChecker) {
	return (next) => async (args) => {
		const request = args.request;
		if (HttpRequest.isInstance(request)) {
			const { body, headers } = request;
			if (body && Object.keys(headers).map((str) => str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) try {
				const length = bodyLengthChecker(body);
				request.headers = {
					...request.headers,
					[CONTENT_LENGTH_HEADER]: String(length)
				};
			} catch (error) {}
		}
		return next({
			...args,
			request
		});
	};
}
var CONTENT_LENGTH_HEADER, contentLengthMiddlewareOptions, getContentLengthPlugin;
var init_dist_es$11 = __esmMin((() => {
	init_dist_es$41();
	CONTENT_LENGTH_HEADER = "content-length";
	contentLengthMiddlewareOptions = {
		step: "build",
		tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
		name: "contentLengthMiddleware",
		override: true
	};
	getContentLengthPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
	} });
}));
var resolveParamsForS3, DOMAIN_PATTERN, IP_ADDRESS_PATTERN, DOTS_PATTERN, isDnsCompatibleBucketName, isArnBucketName;
var init_s3 = __esmMin((() => {
	resolveParamsForS3 = async (endpointParams) => {
		const bucket = endpointParams?.Bucket || "";
		if (typeof endpointParams.Bucket === "string") endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
		if (isArnBucketName(bucket)) {
			if (endpointParams.ForcePathStyle === true) throw new Error("Path-style addressing cannot be used with ARN buckets");
		} else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) endpointParams.ForcePathStyle = true;
		if (endpointParams.DisableMultiRegionAccessPoints) {
			endpointParams.disableMultiRegionAccessPoints = true;
			endpointParams.DisableMRAP = true;
		}
		return endpointParams;
	};
	DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
	IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
	DOTS_PATTERN = /\.\./;
	isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
	isArnBucketName = (bucketName) => {
		const [arn, partition, service, , , bucket] = bucketName.split(":");
		const isArn = arn === "arn" && bucketName.split(":").length >= 6;
		const isValidArn = Boolean(isArn && partition && service && bucket);
		if (isArn && !isValidArn) throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
		return isValidArn;
	};
}));
var init_service_customizations = __esmMin((() => {
	init_s3();
}));
var createConfigValueProvider;
var init_createConfigValueProvider = __esmMin((() => {
	createConfigValueProvider = (configKey, canonicalEndpointParamKey, config, isClientContextParam = false) => {
		const configProvider = async () => {
			let configValue;
			if (isClientContextParam) configValue = config.clientContextParams?.[configKey] ?? config[configKey] ?? config[canonicalEndpointParamKey];
			else configValue = config[configKey] ?? config[canonicalEndpointParamKey];
			if (typeof configValue === "function") return configValue();
			return configValue;
		};
		if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") return async () => {
			const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
			return credentials?.credentialScope ?? credentials?.CredentialScope;
		};
		if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") return async () => {
			const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
			return credentials?.accountId ?? credentials?.AccountId;
		};
		if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") return async () => {
			if (config.isCustomEndpoint === false) return;
			const endpoint = await configProvider();
			if (endpoint && typeof endpoint === "object") {
				if ("url" in endpoint) return endpoint.url.href;
				if ("hostname" in endpoint) {
					const { protocol, hostname, port, path } = endpoint;
					return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
				}
			}
			return endpoint;
		};
		return configProvider;
	};
}));
function getSelectorName(functionString) {
	try {
		const constants = new Set(Array.from(functionString.match(/([A-Z_]){3,}/g) ?? []));
		constants.delete("CONFIG");
		constants.delete("CONFIG_PREFIX_SEPARATOR");
		constants.delete("ENV");
		return [...constants].join(", ");
	} catch (e) {
		return functionString;
	}
}
var init_getSelectorName = __esmMin((() => {}));
var fromEnv$1;
var init_fromEnv = __esmMin((() => {
	init_dist_es$27();
	init_getSelectorName();
	fromEnv$1 = (envVarSelector, options) => async () => {
		try {
			const config = envVarSelector(process.env, options);
			if (config === void 0) throw new Error();
			return config;
		} catch (e) {
			throw new CredentialsProviderError(e.message || `Not found in ENV: ${getSelectorName(envVarSelector.toString())}`, { logger: options?.logger });
		}
	};
}));
var homeDirCache, getHomeDirCacheKey, getHomeDir;
var init_getHomeDir = __esmMin((() => {
	homeDirCache = {};
	getHomeDirCacheKey = () => {
		if (process && process.geteuid) return `${process.geteuid()}`;
		return "DEFAULT";
	};
	getHomeDir = () => {
		const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${sep}` } = process.env;
		if (HOME) return HOME;
		if (USERPROFILE) return USERPROFILE;
		if (HOMEPATH) return `${HOMEDRIVE}${HOMEPATH}`;
		const homeDirCacheKey = getHomeDirCacheKey();
		if (!homeDirCache[homeDirCacheKey]) homeDirCache[homeDirCacheKey] = homedir();
		return homeDirCache[homeDirCacheKey];
	};
})), getProfileName;
var init_getProfileName = __esmMin((() => {
	getProfileName = (init) => init.profile || process.env["AWS_PROFILE"] || "default";
}));
var getSSOTokenFilepath;
var init_getSSOTokenFilepath = __esmMin((() => {
	init_getHomeDir();
	getSSOTokenFilepath = (id) => {
		const cacheName = createHash("sha1").update(id).digest("hex");
		return join(getHomeDir(), ".aws", "sso", "cache", `${cacheName}.json`);
	};
}));
var tokenIntercept, getSSOTokenFromFile;
var init_getSSOTokenFromFile = __esmMin((() => {
	init_getSSOTokenFilepath();
	tokenIntercept = {};
	getSSOTokenFromFile = async (id) => {
		if (tokenIntercept[id]) return tokenIntercept[id];
		const ssoTokenText = await readFile$1(getSSOTokenFilepath(id), "utf8");
		return JSON.parse(ssoTokenText);
	};
}));
var init_constants$3 = __esmMin((() => {}));
var getConfigData;
var init_getConfigData = __esmMin((() => {
	init_dist_es$42();
	init_constants$3();
	getConfigData = (data) => Object.entries(data).filter(([key]) => {
		const indexOfSeparator = key.indexOf(".");
		if (indexOfSeparator === -1) return false;
		return Object.values(IniSectionType).includes(key.substring(0, indexOfSeparator));
	}).reduce((acc, [key, value]) => {
		const indexOfSeparator = key.indexOf(".");
		const updatedKey = key.substring(0, indexOfSeparator) === IniSectionType.PROFILE ? key.substring(indexOfSeparator + 1) : key;
		acc[updatedKey] = value;
		return acc;
	}, { ...data.default && { default: data.default } });
})), getConfigFilepath;
var init_getConfigFilepath = __esmMin((() => {
	init_getHomeDir();
	getConfigFilepath = () => process.env["AWS_CONFIG_FILE"] || join(getHomeDir(), ".aws", "config");
})), getCredentialsFilepath;
var init_getCredentialsFilepath = __esmMin((() => {
	init_getHomeDir();
	getCredentialsFilepath = () => process.env["AWS_SHARED_CREDENTIALS_FILE"] || join(getHomeDir(), ".aws", "credentials");
}));
var prefixKeyRegex, profileNameBlockList, parseIni;
var init_parseIni = __esmMin((() => {
	init_dist_es$42();
	init_constants$3();
	prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
	profileNameBlockList = ["__proto__", "profile __proto__"];
	parseIni = (iniData) => {
		const map = {};
		let currentSection;
		let currentSubSection;
		for (const iniLine of iniData.split(/\r?\n/)) {
			const trimmedLine = iniLine.split(/(^|\s)[;#]/)[0].trim();
			if (trimmedLine[0] === "[" && trimmedLine[trimmedLine.length - 1] === "]") {
				currentSection = void 0;
				currentSubSection = void 0;
				const sectionName = trimmedLine.substring(1, trimmedLine.length - 1);
				const matches = prefixKeyRegex.exec(sectionName);
				if (matches) {
					const [, prefix, , name] = matches;
					if (Object.values(IniSectionType).includes(prefix)) currentSection = [prefix, name].join(".");
				} else currentSection = sectionName;
				if (profileNameBlockList.includes(sectionName)) throw new Error(`Found invalid profile name "${sectionName}"`);
			} else if (currentSection) {
				const indexOfEqualsSign = trimmedLine.indexOf("=");
				if (![0, -1].includes(indexOfEqualsSign)) {
					const [name, value] = [trimmedLine.substring(0, indexOfEqualsSign).trim(), trimmedLine.substring(indexOfEqualsSign + 1).trim()];
					if (value === "") currentSubSection = name;
					else {
						if (currentSubSection && iniLine.trimStart() === iniLine) currentSubSection = void 0;
						map[currentSection] = map[currentSection] || {};
						const key = currentSubSection ? [currentSubSection, name].join(".") : name;
						map[currentSection][key] = value;
					}
				}
			}
		}
		return map;
	};
}));
var filePromises, fileIntercept, readFile$2;
var init_readFile = __esmMin((() => {
	filePromises = {};
	fileIntercept = {};
	readFile$2 = (path, options) => {
		if (fileIntercept[path] !== void 0) return fileIntercept[path];
		if (!filePromises[path] || options?.ignoreCache) filePromises[path] = readFile(path, "utf8");
		return filePromises[path];
	};
}));
var swallowError$1, loadSharedConfigFiles;
var init_loadSharedConfigFiles = __esmMin((() => {
	init_getConfigData();
	init_getConfigFilepath();
	init_getCredentialsFilepath();
	init_getHomeDir();
	init_parseIni();
	init_readFile();
	init_constants$3();
	swallowError$1 = () => ({});
	loadSharedConfigFiles = async (init = {}) => {
		const { filepath = getCredentialsFilepath(), configFilepath = getConfigFilepath() } = init;
		const homeDir = getHomeDir();
		const relativeHomeDirPrefix = "~/";
		let resolvedFilepath = filepath;
		if (filepath.startsWith(relativeHomeDirPrefix)) resolvedFilepath = join(homeDir, filepath.slice(2));
		let resolvedConfigFilepath = configFilepath;
		if (configFilepath.startsWith(relativeHomeDirPrefix)) resolvedConfigFilepath = join(homeDir, configFilepath.slice(2));
		const parsedFiles = await Promise.all([readFile$2(resolvedConfigFilepath, { ignoreCache: init.ignoreCache }).then(parseIni).then(getConfigData).catch(swallowError$1), readFile$2(resolvedFilepath, { ignoreCache: init.ignoreCache }).then(parseIni).catch(swallowError$1)]);
		return {
			configFile: parsedFiles[0],
			credentialsFile: parsedFiles[1]
		};
	};
}));
var getSsoSessionData;
var init_getSsoSessionData = __esmMin((() => {
	init_dist_es$42();
	init_loadSharedConfigFiles();
	getSsoSessionData = (data) => Object.entries(data).filter(([key]) => key.startsWith(IniSectionType.SSO_SESSION + ".")).reduce((acc, [key, value]) => ({
		...acc,
		[key.substring(key.indexOf(".") + 1)]: value
	}), {});
}));
var swallowError, loadSsoSessionData;
var init_loadSsoSessionData = __esmMin((() => {
	init_getConfigFilepath();
	init_getSsoSessionData();
	init_parseIni();
	init_readFile();
	swallowError = () => ({});
	loadSsoSessionData = async (init = {}) => readFile$2(init.configFilepath ?? getConfigFilepath()).then(parseIni).then(getSsoSessionData).catch(swallowError);
}));
var mergeConfigFiles;
var init_mergeConfigFiles = __esmMin((() => {
	mergeConfigFiles = (...files) => {
		const merged = {};
		for (const file of files) for (const [key, values] of Object.entries(file)) if (merged[key] !== void 0) Object.assign(merged[key], values);
		else merged[key] = values;
		return merged;
	};
}));
var parseKnownFiles;
var init_parseKnownFiles = __esmMin((() => {
	init_loadSharedConfigFiles();
	init_mergeConfigFiles();
	parseKnownFiles = async (init) => {
		const parsedFiles = await loadSharedConfigFiles(init);
		return mergeConfigFiles(parsedFiles.configFile, parsedFiles.credentialsFile);
	};
}));
var externalDataInterceptor;
var init_externalDataInterceptor = __esmMin((() => {
	init_getSSOTokenFromFile();
	init_readFile();
	externalDataInterceptor = {
		getFileRecord() {
			return fileIntercept;
		},
		interceptFile(path, contents) {
			fileIntercept[path] = Promise.resolve(contents);
		},
		getTokenRecord() {
			return tokenIntercept;
		},
		interceptToken(id, contents) {
			tokenIntercept[id] = contents;
		}
	};
}));
var init_types$2 = __esmMin((() => {}));
var init_dist_es$10 = __esmMin((() => {
	init_getHomeDir();
	init_getProfileName();
	init_getSSOTokenFilepath();
	init_getSSOTokenFromFile();
	init_loadSharedConfigFiles();
	init_loadSsoSessionData();
	init_parseKnownFiles();
	init_externalDataInterceptor();
	init_types$2();
	init_readFile();
}));
var fromSharedConfigFiles;
var init_fromSharedConfigFiles = __esmMin((() => {
	init_dist_es$27();
	init_dist_es$10();
	init_getSelectorName();
	fromSharedConfigFiles = (configSelector, { preferredFile = "config", ...init } = {}) => async () => {
		const profile = getProfileName(init);
		const { configFile, credentialsFile } = await loadSharedConfigFiles(init);
		const profileFromCredentials = credentialsFile[profile] || {};
		const profileFromConfig = configFile[profile] || {};
		const mergedProfile = preferredFile === "config" ? {
			...profileFromCredentials,
			...profileFromConfig
		} : {
			...profileFromConfig,
			...profileFromCredentials
		};
		try {
			const configValue = configSelector(mergedProfile, preferredFile === "config" ? configFile : credentialsFile);
			if (configValue === void 0) throw new Error();
			return configValue;
		} catch (e) {
			throw new CredentialsProviderError(e.message || `Not found in config files w/ profile [${profile}]: ${getSelectorName(configSelector.toString())}`, { logger: init.logger });
		}
	};
}));
var isFunction, fromStatic;
var init_fromStatic = __esmMin((() => {
	init_dist_es$27();
	isFunction = (func) => typeof func === "function";
	fromStatic = (defaultValue) => isFunction(defaultValue) ? async () => await defaultValue() : fromStatic$1(defaultValue);
}));
var loadConfig;
var init_configLoader = __esmMin((() => {
	init_dist_es$27();
	init_fromEnv();
	init_fromSharedConfigFiles();
	init_fromStatic();
	loadConfig = ({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {}) => {
		const { signingName, logger } = configuration;
		return memoize(chain(fromEnv$1(environmentVariableSelector, {
			signingName,
			logger
		}), fromSharedConfigFiles(configFileSelector, configuration), fromStatic(defaultValue)));
	};
}));
var dist_es_exports$8 = /* @__PURE__ */ __exportAll({ loadConfig: () => loadConfig });
var init_dist_es$9 = __esmMin((() => {
	init_configLoader();
}));
var ENV_ENDPOINT_URL, CONFIG_ENDPOINT_URL, getEndpointUrlConfig;
var init_getEndpointUrlConfig = __esmMin((() => {
	init_dist_es$10();
	ENV_ENDPOINT_URL = "AWS_ENDPOINT_URL";
	CONFIG_ENDPOINT_URL = "endpoint_url";
	getEndpointUrlConfig = (serviceId) => ({
		environmentVariableSelector: (env) => {
			const serviceEndpointUrl = env[[ENV_ENDPOINT_URL, ...serviceId.split(" ").map((w) => w.toUpperCase())].join("_")];
			if (serviceEndpointUrl) return serviceEndpointUrl;
			const endpointUrl = env[ENV_ENDPOINT_URL];
			if (endpointUrl) return endpointUrl;
		},
		configFileSelector: (profile, config) => {
			if (config && profile.services) {
				const servicesSection = config[["services", profile.services].join(".")];
				if (servicesSection) {
					const endpointUrl = servicesSection[[serviceId.split(" ").map((w) => w.toLowerCase()).join("_"), CONFIG_ENDPOINT_URL].join(".")];
					if (endpointUrl) return endpointUrl;
				}
			}
			const endpointUrl = profile[CONFIG_ENDPOINT_URL];
			if (endpointUrl) return endpointUrl;
		},
		default: void 0
	});
}));
var getEndpointFromConfig;
var init_getEndpointFromConfig = __esmMin((() => {
	init_dist_es$9();
	init_getEndpointUrlConfig();
	getEndpointFromConfig = async (serviceId) => loadConfig(getEndpointUrlConfig(serviceId ?? ""))();
}));
var toEndpointV1;
var init_toEndpointV1 = __esmMin((() => {
	init_dist_es$15();
	toEndpointV1 = (endpoint) => {
		if (typeof endpoint === "object") {
			if ("url" in endpoint) return parseUrl(endpoint.url);
			return endpoint;
		}
		return parseUrl(endpoint);
	};
}));
var getEndpointFromInstructions, resolveParams;
var init_getEndpointFromInstructions = __esmMin((() => {
	init_service_customizations();
	init_createConfigValueProvider();
	init_getEndpointFromConfig();
	init_toEndpointV1();
	getEndpointFromInstructions = async (commandInput, instructionsSupplier, clientConfig, context) => {
		if (!clientConfig.isCustomEndpoint) {
			let endpointFromConfig;
			if (clientConfig.serviceConfiguredEndpoint) endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
			else endpointFromConfig = await getEndpointFromConfig(clientConfig.serviceId);
			if (endpointFromConfig) {
				clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
				clientConfig.isCustomEndpoint = true;
			}
		}
		const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
		if (typeof clientConfig.endpointProvider !== "function") throw new Error("config.endpointProvider is not set.");
		return clientConfig.endpointProvider(endpointParams, context);
	};
	resolveParams = async (commandInput, instructionsSupplier, clientConfig) => {
		const endpointParams = {};
		const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
		for (const [name, instruction] of Object.entries(instructions)) switch (instruction.type) {
			case "staticContextParams":
				endpointParams[name] = instruction.value;
				break;
			case "contextParams":
				endpointParams[name] = commandInput[instruction.name];
				break;
			case "clientContextParams":
			case "builtInParams":
				endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig, instruction.type !== "builtInParams")();
				break;
			case "operationContextParams":
				endpointParams[name] = instruction.get(commandInput);
				break;
			default: throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
		}
		if (Object.keys(instructions).length === 0) Object.assign(endpointParams, clientConfig);
		if (String(clientConfig.serviceId).toLowerCase() === "s3") await resolveParamsForS3(endpointParams);
		return endpointParams;
	};
}));
var init_adaptors = __esmMin((() => {
	init_getEndpointFromInstructions();
	init_toEndpointV1();
}));
var import_dist_cjs, endpointMiddleware;
var init_endpointMiddleware = __esmMin((() => {
	import_dist_cjs = require_dist_cjs$1();
	init_dist_es$40();
	init_getEndpointFromInstructions();
	endpointMiddleware = ({ config, instructions }) => {
		return (next, context) => async (args) => {
			if (config.isCustomEndpoint) (0, import_dist_cjs.setFeature)(context, "ENDPOINT_OVERRIDE", "N");
			const endpoint = await getEndpointFromInstructions(args.input, { getEndpointParameterInstructions() {
				return instructions;
			} }, { ...config }, context);
			context.endpointV2 = endpoint;
			context.authSchemes = endpoint.properties?.authSchemes;
			const authScheme = context.authSchemes?.[0];
			if (authScheme) {
				context["signing_region"] = authScheme.signingRegion;
				context["signing_service"] = authScheme.signingName;
				const httpAuthOption = getSmithyContext(context)?.selectedHttpAuthScheme?.httpAuthOption;
				if (httpAuthOption) httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
					signing_region: authScheme.signingRegion,
					signingRegion: authScheme.signingRegion,
					signing_service: authScheme.signingName,
					signingName: authScheme.signingName,
					signingRegionSet: authScheme.signingRegionSet
				}, authScheme.properties);
			}
			return next({ ...args });
		};
	};
}));
var endpointMiddlewareOptions, getEndpointPlugin;
var init_getEndpointPlugin = __esmMin((() => {
	init_dist_es$39();
	init_endpointMiddleware();
	endpointMiddlewareOptions = {
		step: "serialize",
		tags: [
			"ENDPOINT_PARAMETERS",
			"ENDPOINT_V2",
			"ENDPOINT"
		],
		name: "endpointV2Middleware",
		override: true,
		relation: "before",
		toMiddleware: serializerMiddlewareOption.name
	};
	getEndpointPlugin = (config, instructions) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(endpointMiddleware({
			config,
			instructions
		}), endpointMiddlewareOptions);
	} });
}));
var resolveEndpointConfig;
var init_resolveEndpointConfig = __esmMin((() => {
	init_dist_es$40();
	init_getEndpointFromConfig();
	init_toEndpointV1();
	resolveEndpointConfig = (input) => {
		const tls = input.tls ?? true;
		const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
		const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await normalizeProvider$1(endpoint)()) : void 0;
		const isCustomEndpoint = !!endpoint;
		const resolvedConfig = Object.assign(input, {
			endpoint: customEndpointProvider,
			tls,
			isCustomEndpoint,
			useDualstackEndpoint: normalizeProvider$1(useDualstackEndpoint ?? false),
			useFipsEndpoint: normalizeProvider$1(useFipsEndpoint ?? false)
		});
		let configuredEndpointPromise = void 0;
		resolvedConfig.serviceConfiguredEndpoint = async () => {
			if (input.serviceId && !configuredEndpointPromise) configuredEndpointPromise = getEndpointFromConfig(input.serviceId);
			return configuredEndpointPromise;
		};
		return resolvedConfig;
	};
}));
var resolveEndpointRequiredConfig;
var init_resolveEndpointRequiredConfig = __esmMin((() => {
	resolveEndpointRequiredConfig = (input) => {
		const { endpoint } = input;
		if (endpoint === void 0) input.endpoint = async () => {
			throw new Error("@smithy/middleware-endpoint: (default endpointRuleSet) endpoint is not set - you must configure an endpoint.");
		};
		return input;
	};
}));
var init_types$1 = __esmMin((() => {}));
var dist_es_exports$7 = /* @__PURE__ */ __exportAll({
	endpointMiddleware: () => endpointMiddleware,
	endpointMiddlewareOptions: () => endpointMiddlewareOptions,
	getEndpointFromInstructions: () => getEndpointFromInstructions,
	getEndpointPlugin: () => getEndpointPlugin,
	resolveEndpointConfig: () => resolveEndpointConfig,
	resolveEndpointRequiredConfig: () => resolveEndpointRequiredConfig,
	resolveParams: () => resolveParams,
	toEndpointV1: () => toEndpointV1
});
var init_dist_es$8 = __esmMin((() => {
	init_adaptors();
	init_endpointMiddleware();
	init_getEndpointPlugin();
	init_resolveEndpointConfig();
	init_resolveEndpointRequiredConfig();
	init_types$1();
})), RETRY_MODES, DEFAULT_RETRY_MODE;
var init_config = __esmMin((() => {
	(function(RETRY_MODES) {
		RETRY_MODES["STANDARD"] = "standard";
		RETRY_MODES["ADAPTIVE"] = "adaptive";
	})(RETRY_MODES || (RETRY_MODES = {}));
	DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;
}));
var CLOCK_SKEW_ERROR_CODES, THROTTLING_ERROR_CODES, TRANSIENT_ERROR_CODES, TRANSIENT_ERROR_STATUS_CODES, NODEJS_TIMEOUT_ERROR_CODES, NODEJS_NETWORK_ERROR_CODES;
var init_constants$2 = __esmMin((() => {
	CLOCK_SKEW_ERROR_CODES = [
		"AuthFailure",
		"InvalidSignatureException",
		"RequestExpired",
		"RequestInTheFuture",
		"RequestTimeTooSkewed",
		"SignatureDoesNotMatch"
	];
	THROTTLING_ERROR_CODES = [
		"BandwidthLimitExceeded",
		"EC2ThrottledException",
		"LimitExceededException",
		"PriorRequestNotComplete",
		"ProvisionedThroughputExceededException",
		"RequestLimitExceeded",
		"RequestThrottled",
		"RequestThrottledException",
		"SlowDown",
		"ThrottledException",
		"Throttling",
		"ThrottlingException",
		"TooManyRequestsException",
		"TransactionInProgressException"
	];
	TRANSIENT_ERROR_CODES = [
		"TimeoutError",
		"RequestTimeout",
		"RequestTimeoutException"
	];
	TRANSIENT_ERROR_STATUS_CODES = [
		500,
		502,
		503,
		504
	];
	NODEJS_TIMEOUT_ERROR_CODES = [
		"ECONNRESET",
		"ECONNREFUSED",
		"EPIPE",
		"ETIMEDOUT"
	];
	NODEJS_NETWORK_ERROR_CODES = [
		"EHOSTUNREACH",
		"ENETUNREACH",
		"ENOTFOUND"
	];
}));
var isRetryableByTrait, isClockSkewError, isClockSkewCorrectedError, isBrowserNetworkError, isThrottlingError, isTransientError, isServerError;
var init_dist_es$7 = __esmMin((() => {
	init_constants$2();
	isRetryableByTrait = (error) => error?.$retryable !== void 0;
	isClockSkewError = (error) => CLOCK_SKEW_ERROR_CODES.includes(error.name);
	isClockSkewCorrectedError = (error) => error.$metadata?.clockSkewCorrected;
	isBrowserNetworkError = (error) => {
		const errorMessages = new Set([
			"Failed to fetch",
			"NetworkError when attempting to fetch resource",
			"The Internet connection appears to be offline",
			"Load failed",
			"Network request failed"
		]);
		if (!(error && error instanceof TypeError)) return false;
		return errorMessages.has(error.message);
	};
	isThrottlingError = (error) => error.$metadata?.httpStatusCode === 429 || THROTTLING_ERROR_CODES.includes(error.name) || error.$retryable?.throttling == true;
	isTransientError = (error, depth = 0) => isRetryableByTrait(error) || isClockSkewCorrectedError(error) || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") || NODEJS_NETWORK_ERROR_CODES.includes(error?.code || "") || TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0) || isBrowserNetworkError(error) || error.cause !== void 0 && depth <= 10 && isTransientError(error.cause, depth + 1);
	isServerError = (error) => {
		if (error.$metadata?.httpStatusCode !== void 0) {
			const statusCode = error.$metadata.httpStatusCode;
			if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) return true;
			return false;
		}
		return false;
	};
}));
var DefaultRateLimiter;
var init_DefaultRateLimiter = __esmMin((() => {
	init_dist_es$7();
	DefaultRateLimiter = class DefaultRateLimiter {
		static setTimeoutFn = setTimeout;
		beta;
		minCapacity;
		minFillRate;
		scaleConstant;
		smooth;
		currentCapacity = 0;
		enabled = false;
		lastMaxRate = 0;
		measuredTxRate = 0;
		requestCount = 0;
		fillRate;
		lastThrottleTime;
		lastTimestamp = 0;
		lastTxRateBucket;
		maxCapacity;
		timeWindow = 0;
		constructor(options) {
			this.beta = options?.beta ?? .7;
			this.minCapacity = options?.minCapacity ?? 1;
			this.minFillRate = options?.minFillRate ?? .5;
			this.scaleConstant = options?.scaleConstant ?? .4;
			this.smooth = options?.smooth ?? .8;
			this.lastThrottleTime = this.getCurrentTimeInSeconds();
			this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
			this.fillRate = this.minFillRate;
			this.maxCapacity = this.minCapacity;
		}
		getCurrentTimeInSeconds() {
			return Date.now() / 1e3;
		}
		async getSendToken() {
			return this.acquireTokenBucket(1);
		}
		async acquireTokenBucket(amount) {
			if (!this.enabled) return;
			this.refillTokenBucket();
			if (amount > this.currentCapacity) {
				const delay = (amount - this.currentCapacity) / this.fillRate * 1e3;
				await new Promise((resolve) => DefaultRateLimiter.setTimeoutFn(resolve, delay));
			}
			this.currentCapacity = this.currentCapacity - amount;
		}
		refillTokenBucket() {
			const timestamp = this.getCurrentTimeInSeconds();
			if (!this.lastTimestamp) {
				this.lastTimestamp = timestamp;
				return;
			}
			const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
			this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
			this.lastTimestamp = timestamp;
		}
		updateClientSendingRate(response) {
			let calculatedRate;
			this.updateMeasuredRate();
			if (isThrottlingError(response)) {
				const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
				this.lastMaxRate = rateToUse;
				this.calculateTimeWindow();
				this.lastThrottleTime = this.getCurrentTimeInSeconds();
				calculatedRate = this.cubicThrottle(rateToUse);
				this.enableTokenBucket();
			} else {
				this.calculateTimeWindow();
				calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
			}
			const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
			this.updateTokenBucketRate(newRate);
		}
		calculateTimeWindow() {
			this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
		}
		cubicThrottle(rateToUse) {
			return this.getPrecise(rateToUse * this.beta);
		}
		cubicSuccess(timestamp) {
			return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
		}
		enableTokenBucket() {
			this.enabled = true;
		}
		updateTokenBucketRate(newRate) {
			this.refillTokenBucket();
			this.fillRate = Math.max(newRate, this.minFillRate);
			this.maxCapacity = Math.max(newRate, this.minCapacity);
			this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
		}
		updateMeasuredRate() {
			const t = this.getCurrentTimeInSeconds();
			const timeBucket = Math.floor(t * 2) / 2;
			this.requestCount++;
			if (timeBucket > this.lastTxRateBucket) {
				const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
				this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
				this.requestCount = 0;
				this.lastTxRateBucket = timeBucket;
			}
		}
		getPrecise(num) {
			return parseFloat(num.toFixed(8));
		}
	};
})), MAXIMUM_RETRY_DELAY, INVOCATION_ID_HEADER, REQUEST_HEADER;
var init_constants$1 = __esmMin((() => {
	MAXIMUM_RETRY_DELAY = 20 * 1e3;
	INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
	REQUEST_HEADER = "amz-sdk-request";
}));
var getDefaultRetryBackoffStrategy;
var init_defaultRetryBackoffStrategy = __esmMin((() => {
	init_constants$1();
	getDefaultRetryBackoffStrategy = () => {
		let delayBase = 100;
		const computeNextBackoffDelay = (attempts) => {
			return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
		};
		const setDelayBase = (delay) => {
			delayBase = delay;
		};
		return {
			computeNextBackoffDelay,
			setDelayBase
		};
	};
}));
var createDefaultRetryToken;
var init_defaultRetryToken = __esmMin((() => {
	init_constants$1();
	createDefaultRetryToken = ({ retryDelay, retryCount, retryCost }) => {
		const getRetryCount = () => retryCount;
		const getRetryDelay = () => Math.min(MAXIMUM_RETRY_DELAY, retryDelay);
		const getRetryCost = () => retryCost;
		return {
			getRetryCount,
			getRetryDelay,
			getRetryCost
		};
	};
}));
var StandardRetryStrategy$1;
var init_StandardRetryStrategy$1 = __esmMin((() => {
	init_config();
	init_constants$1();
	init_defaultRetryBackoffStrategy();
	init_defaultRetryToken();
	StandardRetryStrategy$1 = class {
		maxAttempts;
		mode = RETRY_MODES.STANDARD;
		capacity = 500;
		retryBackoffStrategy = getDefaultRetryBackoffStrategy();
		maxAttemptsProvider;
		constructor(maxAttempts) {
			this.maxAttempts = maxAttempts;
			this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts;
		}
		async acquireInitialRetryToken(retryTokenScope) {
			return createDefaultRetryToken({
				retryDelay: 100,
				retryCount: 0
			});
		}
		async refreshRetryTokenForRetry(token, errorInfo) {
			const maxAttempts = await this.getMaxAttempts();
			if (this.shouldRetry(token, errorInfo, maxAttempts)) {
				const errorType = errorInfo.errorType;
				this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? 500 : 100);
				const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
				const retryDelay = errorInfo.retryAfterHint ? Math.max(errorInfo.retryAfterHint.getTime() - Date.now() || 0, delayFromErrorType) : delayFromErrorType;
				const capacityCost = this.getCapacityCost(errorType);
				this.capacity -= capacityCost;
				return createDefaultRetryToken({
					retryDelay,
					retryCount: token.getRetryCount() + 1,
					retryCost: capacityCost
				});
			}
			throw new Error("No retry token available");
		}
		recordSuccess(token) {
			this.capacity = Math.max(500, this.capacity + (token.getRetryCost() ?? 1));
		}
		getCapacity() {
			return this.capacity;
		}
		async getMaxAttempts() {
			try {
				return await this.maxAttemptsProvider();
			} catch (error) {
				console.warn(`Max attempts provider could not resolve. Using default of 3`);
				return 3;
			}
		}
		shouldRetry(tokenToRenew, errorInfo, maxAttempts) {
			return tokenToRenew.getRetryCount() + 1 < maxAttempts && this.capacity >= this.getCapacityCost(errorInfo.errorType) && this.isRetryableError(errorInfo.errorType);
		}
		getCapacityCost(errorType) {
			return errorType === "TRANSIENT" ? 10 : 5;
		}
		isRetryableError(errorType) {
			return errorType === "THROTTLING" || errorType === "TRANSIENT";
		}
	};
}));
var AdaptiveRetryStrategy$1;
var init_AdaptiveRetryStrategy$1 = __esmMin((() => {
	init_config();
	init_DefaultRateLimiter();
	init_StandardRetryStrategy$1();
	AdaptiveRetryStrategy$1 = class {
		maxAttemptsProvider;
		rateLimiter;
		standardRetryStrategy;
		mode = RETRY_MODES.ADAPTIVE;
		constructor(maxAttemptsProvider, options) {
			this.maxAttemptsProvider = maxAttemptsProvider;
			const { rateLimiter } = options ?? {};
			this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
			this.standardRetryStrategy = new StandardRetryStrategy$1(maxAttemptsProvider);
		}
		async acquireInitialRetryToken(retryTokenScope) {
			await this.rateLimiter.getSendToken();
			return this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
		}
		async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
			this.rateLimiter.updateClientSendingRate(errorInfo);
			return this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
		}
		recordSuccess(token) {
			this.rateLimiter.updateClientSendingRate({});
			this.standardRetryStrategy.recordSuccess(token);
		}
	};
}));
var ConfiguredRetryStrategy;
var init_ConfiguredRetryStrategy = __esmMin((() => {
	init_constants$1();
	init_StandardRetryStrategy$1();
	ConfiguredRetryStrategy = class extends StandardRetryStrategy$1 {
		computeNextBackoffDelay;
		constructor(maxAttempts, computeNextBackoffDelay = 100) {
			super(typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts);
			if (typeof computeNextBackoffDelay === "number") this.computeNextBackoffDelay = () => computeNextBackoffDelay;
			else this.computeNextBackoffDelay = computeNextBackoffDelay;
		}
		async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
			const token = await super.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
			token.getRetryDelay = () => this.computeNextBackoffDelay(token.getRetryCount());
			return token;
		}
	};
}));
var init_types = __esmMin((() => {}));
var dist_es_exports$6 = /* @__PURE__ */ __exportAll({
	AdaptiveRetryStrategy: () => AdaptiveRetryStrategy$1,
	ConfiguredRetryStrategy: () => ConfiguredRetryStrategy,
	DEFAULT_MAX_ATTEMPTS: () => 3,
	DEFAULT_RETRY_DELAY_BASE: () => 100,
	DEFAULT_RETRY_MODE: () => DEFAULT_RETRY_MODE,
	DefaultRateLimiter: () => DefaultRateLimiter,
	INITIAL_RETRY_TOKENS: () => 500,
	INVOCATION_ID_HEADER: () => INVOCATION_ID_HEADER,
	MAXIMUM_RETRY_DELAY: () => MAXIMUM_RETRY_DELAY,
	NO_RETRY_INCREMENT: () => 1,
	REQUEST_HEADER: () => REQUEST_HEADER,
	RETRY_COST: () => 5,
	RETRY_MODES: () => RETRY_MODES,
	StandardRetryStrategy: () => StandardRetryStrategy$1,
	THROTTLING_RETRY_DELAY_BASE: () => 500,
	TIMEOUT_RETRY_COST: () => 10
});
var init_dist_es$6 = __esmMin((() => {
	init_AdaptiveRetryStrategy$1();
	init_ConfiguredRetryStrategy();
	init_DefaultRateLimiter();
	init_StandardRetryStrategy$1();
	init_config();
	init_constants$1();
	init_types();
}));
var getDefaultRetryQuota;
var init_defaultRetryQuota = __esmMin((() => {
	init_dist_es$6();
	getDefaultRetryQuota = (initialRetryTokens, options) => {
		const MAX_CAPACITY = initialRetryTokens;
		const noRetryIncrement = options?.noRetryIncrement ?? 1;
		const retryCost = options?.retryCost ?? 5;
		const timeoutRetryCost = options?.timeoutRetryCost ?? 10;
		let availableCapacity = initialRetryTokens;
		const getCapacityAmount = (error) => error.name === "TimeoutError" ? timeoutRetryCost : retryCost;
		const hasRetryTokens = (error) => getCapacityAmount(error) <= availableCapacity;
		const retrieveRetryTokens = (error) => {
			if (!hasRetryTokens(error)) throw new Error("No retry token available");
			const capacityAmount = getCapacityAmount(error);
			availableCapacity -= capacityAmount;
			return capacityAmount;
		};
		const releaseRetryTokens = (capacityReleaseAmount) => {
			availableCapacity += capacityReleaseAmount ?? noRetryIncrement;
			availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
		};
		return Object.freeze({
			hasRetryTokens,
			retrieveRetryTokens,
			releaseRetryTokens
		});
	};
}));
var defaultDelayDecider;
var init_delayDecider = __esmMin((() => {
	init_dist_es$6();
	defaultDelayDecider = (delayBase, attempts) => Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
}));
var defaultRetryDecider;
var init_retryDecider = __esmMin((() => {
	init_dist_es$7();
	defaultRetryDecider = (error) => {
		if (!error) return false;
		return isRetryableByTrait(error) || isClockSkewError(error) || isThrottlingError(error) || isTransientError(error);
	};
}));
var asSdkError;
var init_util = __esmMin((() => {
	asSdkError = (error) => {
		if (error instanceof Error) return error;
		if (error instanceof Object) return Object.assign(/* @__PURE__ */ new Error(), error);
		if (typeof error === "string") return new Error(error);
		return /* @__PURE__ */ new Error(`AWS SDK error wrapper for ${error}`);
	};
}));
var StandardRetryStrategy, getDelayFromRetryAfterHeader;
var init_StandardRetryStrategy = __esmMin((() => {
	init_dist_es$41();
	init_dist_es$7();
	init_dist_es$6();
	init_dist_es$28();
	init_defaultRetryQuota();
	init_delayDecider();
	init_retryDecider();
	init_util();
	StandardRetryStrategy = class {
		maxAttemptsProvider;
		retryDecider;
		delayDecider;
		retryQuota;
		mode = RETRY_MODES.STANDARD;
		constructor(maxAttemptsProvider, options) {
			this.maxAttemptsProvider = maxAttemptsProvider;
			this.retryDecider = options?.retryDecider ?? defaultRetryDecider;
			this.delayDecider = options?.delayDecider ?? defaultDelayDecider;
			this.retryQuota = options?.retryQuota ?? getDefaultRetryQuota(500);
		}
		shouldRetry(error, attempts, maxAttempts) {
			return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
		}
		async getMaxAttempts() {
			let maxAttempts;
			try {
				maxAttempts = await this.maxAttemptsProvider();
			} catch (error) {
				maxAttempts = 3;
			}
			return maxAttempts;
		}
		async retry(next, args, options) {
			let retryTokenAmount;
			let attempts = 0;
			let totalDelay = 0;
			const maxAttempts = await this.getMaxAttempts();
			const { request } = args;
			if (HttpRequest.isInstance(request)) request.headers[INVOCATION_ID_HEADER] = v4();
			while (true) try {
				if (HttpRequest.isInstance(request)) request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
				if (options?.beforeRequest) await options.beforeRequest();
				const { response, output } = await next(args);
				if (options?.afterRequest) options.afterRequest(response);
				this.retryQuota.releaseRetryTokens(retryTokenAmount);
				output.$metadata.attempts = attempts + 1;
				output.$metadata.totalRetryDelay = totalDelay;
				return {
					response,
					output
				};
			} catch (e) {
				const err = asSdkError(e);
				attempts++;
				if (this.shouldRetry(err, attempts, maxAttempts)) {
					retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
					const delayFromDecider = this.delayDecider(isThrottlingError(err) ? 500 : 100, attempts);
					const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
					const delay = Math.max(delayFromResponse || 0, delayFromDecider);
					totalDelay += delay;
					await new Promise((resolve) => setTimeout(resolve, delay));
					continue;
				}
				if (!err.$metadata) err.$metadata = {};
				err.$metadata.attempts = attempts;
				err.$metadata.totalRetryDelay = totalDelay;
				throw err;
			}
		}
	};
	getDelayFromRetryAfterHeader = (response) => {
		if (!HttpResponse.isInstance(response)) return;
		const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
		if (!retryAfterHeaderName) return;
		const retryAfter = response.headers[retryAfterHeaderName];
		const retryAfterSeconds = Number(retryAfter);
		if (!Number.isNaN(retryAfterSeconds)) return retryAfterSeconds * 1e3;
		return new Date(retryAfter).getTime() - Date.now();
	};
}));
var AdaptiveRetryStrategy;
var init_AdaptiveRetryStrategy = __esmMin((() => {
	init_dist_es$6();
	init_StandardRetryStrategy();
	AdaptiveRetryStrategy = class extends StandardRetryStrategy {
		rateLimiter;
		constructor(maxAttemptsProvider, options) {
			const { rateLimiter, ...superOptions } = options ?? {};
			super(maxAttemptsProvider, superOptions);
			this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
			this.mode = RETRY_MODES.ADAPTIVE;
		}
		async retry(next, args) {
			return super.retry(next, args, {
				beforeRequest: async () => {
					return this.rateLimiter.getSendToken();
				},
				afterRequest: (response) => {
					this.rateLimiter.updateClientSendingRate(response);
				}
			});
		}
	};
}));
var ENV_MAX_ATTEMPTS, CONFIG_MAX_ATTEMPTS, NODE_MAX_ATTEMPT_CONFIG_OPTIONS, resolveRetryConfig, ENV_RETRY_MODE, CONFIG_RETRY_MODE, NODE_RETRY_MODE_CONFIG_OPTIONS;
var init_configurations = __esmMin((() => {
	init_dist_es$40();
	init_dist_es$6();
	ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
	CONFIG_MAX_ATTEMPTS = "max_attempts";
	NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => {
			const value = env[ENV_MAX_ATTEMPTS];
			if (!value) return void 0;
			const maxAttempt = parseInt(value);
			if (Number.isNaN(maxAttempt)) throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
			return maxAttempt;
		},
		configFileSelector: (profile) => {
			const value = profile[CONFIG_MAX_ATTEMPTS];
			if (!value) return void 0;
			const maxAttempt = parseInt(value);
			if (Number.isNaN(maxAttempt)) throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
			return maxAttempt;
		},
		default: 3
	};
	resolveRetryConfig = (input) => {
		const { retryStrategy, retryMode: _retryMode, maxAttempts: _maxAttempts } = input;
		const maxAttempts = normalizeProvider$1(_maxAttempts ?? 3);
		return Object.assign(input, {
			maxAttempts,
			retryStrategy: async () => {
				if (retryStrategy) return retryStrategy;
				if (await normalizeProvider$1(_retryMode)() === RETRY_MODES.ADAPTIVE) return new AdaptiveRetryStrategy$1(maxAttempts);
				return new StandardRetryStrategy$1(maxAttempts);
			}
		});
	};
	ENV_RETRY_MODE = "AWS_RETRY_MODE";
	CONFIG_RETRY_MODE = "retry_mode";
	NODE_RETRY_MODE_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
		configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
		default: DEFAULT_RETRY_MODE
	};
}));
var omitRetryHeadersMiddleware, omitRetryHeadersMiddlewareOptions, getOmitRetryHeadersPlugin;
var init_omitRetryHeadersMiddleware = __esmMin((() => {
	init_dist_es$41();
	init_dist_es$6();
	omitRetryHeadersMiddleware = () => (next) => async (args) => {
		const { request } = args;
		if (HttpRequest.isInstance(request)) {
			delete request.headers[INVOCATION_ID_HEADER];
			delete request.headers[REQUEST_HEADER];
		}
		return next(args);
	};
	omitRetryHeadersMiddlewareOptions = {
		name: "omitRetryHeadersMiddleware",
		tags: [
			"RETRY",
			"HEADERS",
			"OMIT_RETRY_HEADERS"
		],
		relation: "before",
		toMiddleware: "awsAuthMiddleware",
		override: true
	};
	getOmitRetryHeadersPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.addRelativeTo(omitRetryHeadersMiddleware(), omitRetryHeadersMiddlewareOptions);
	} });
}));
var isStreamingPayload;
var init_isStreamingPayload = __esmMin((() => {
	isStreamingPayload = (request) => request?.body instanceof Readable$1 || typeof ReadableStream !== "undefined" && request?.body instanceof ReadableStream;
}));
var retryMiddleware, isRetryStrategyV2, getRetryErrorInfo, getRetryErrorType, retryMiddlewareOptions, getRetryPlugin, getRetryAfterHint;
var init_retryMiddleware = __esmMin((() => {
	init_dist_es$41();
	init_dist_es$7();
	init_dist_es$23();
	init_dist_es$6();
	init_dist_es$28();
	init_isStreamingPayload();
	init_util();
	retryMiddleware = (options) => (next, context) => async (args) => {
		let retryStrategy = await options.retryStrategy();
		const maxAttempts = await options.maxAttempts();
		if (isRetryStrategyV2(retryStrategy)) {
			retryStrategy = retryStrategy;
			let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
			let lastError = /* @__PURE__ */ new Error();
			let attempts = 0;
			let totalRetryDelay = 0;
			const { request } = args;
			const isRequest = HttpRequest.isInstance(request);
			if (isRequest) request.headers[INVOCATION_ID_HEADER] = v4();
			while (true) try {
				if (isRequest) request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
				const { response, output } = await next(args);
				retryStrategy.recordSuccess(retryToken);
				output.$metadata.attempts = attempts + 1;
				output.$metadata.totalRetryDelay = totalRetryDelay;
				return {
					response,
					output
				};
			} catch (e) {
				const retryErrorInfo = getRetryErrorInfo(e);
				lastError = asSdkError(e);
				if (isRequest && isStreamingPayload(request)) {
					(context.logger instanceof NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
					throw lastError;
				}
				try {
					retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
				} catch (refreshError) {
					if (!lastError.$metadata) lastError.$metadata = {};
					lastError.$metadata.attempts = attempts + 1;
					lastError.$metadata.totalRetryDelay = totalRetryDelay;
					throw lastError;
				}
				attempts = retryToken.getRetryCount();
				const delay = retryToken.getRetryDelay();
				totalRetryDelay += delay;
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		} else {
			retryStrategy = retryStrategy;
			if (retryStrategy?.mode) context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
			return retryStrategy.retry(next, args);
		}
	};
	isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined";
	getRetryErrorInfo = (error) => {
		const errorInfo = {
			error,
			errorType: getRetryErrorType(error)
		};
		const retryAfterHint = getRetryAfterHint(error.$response);
		if (retryAfterHint) errorInfo.retryAfterHint = retryAfterHint;
		return errorInfo;
	};
	getRetryErrorType = (error) => {
		if (isThrottlingError(error)) return "THROTTLING";
		if (isTransientError(error)) return "TRANSIENT";
		if (isServerError(error)) return "SERVER_ERROR";
		return "CLIENT_ERROR";
	};
	retryMiddlewareOptions = {
		name: "retryMiddleware",
		tags: ["RETRY"],
		step: "finalizeRequest",
		priority: "high",
		override: true
	};
	getRetryPlugin = (options) => ({ applyToStack: (clientStack) => {
		clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
	} });
	getRetryAfterHint = (response) => {
		if (!HttpResponse.isInstance(response)) return;
		const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
		if (!retryAfterHeaderName) return;
		const retryAfter = response.headers[retryAfterHeaderName];
		const retryAfterSeconds = Number(retryAfter);
		if (!Number.isNaN(retryAfterSeconds)) return /* @__PURE__ */ new Date(retryAfterSeconds * 1e3);
		return new Date(retryAfter);
	};
}));
var dist_es_exports$5 = /* @__PURE__ */ __exportAll({
	AdaptiveRetryStrategy: () => AdaptiveRetryStrategy,
	CONFIG_MAX_ATTEMPTS: () => CONFIG_MAX_ATTEMPTS,
	CONFIG_RETRY_MODE: () => CONFIG_RETRY_MODE,
	ENV_MAX_ATTEMPTS: () => ENV_MAX_ATTEMPTS,
	ENV_RETRY_MODE: () => ENV_RETRY_MODE,
	NODE_MAX_ATTEMPT_CONFIG_OPTIONS: () => NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
	NODE_RETRY_MODE_CONFIG_OPTIONS: () => NODE_RETRY_MODE_CONFIG_OPTIONS,
	StandardRetryStrategy: () => StandardRetryStrategy,
	defaultDelayDecider: () => defaultDelayDecider,
	defaultRetryDecider: () => defaultRetryDecider,
	getOmitRetryHeadersPlugin: () => getOmitRetryHeadersPlugin,
	getRetryAfterHint: () => getRetryAfterHint,
	getRetryPlugin: () => getRetryPlugin,
	omitRetryHeadersMiddleware: () => omitRetryHeadersMiddleware,
	omitRetryHeadersMiddlewareOptions: () => omitRetryHeadersMiddlewareOptions,
	resolveRetryConfig: () => resolveRetryConfig,
	retryMiddleware: () => retryMiddleware,
	retryMiddlewareOptions: () => retryMiddlewareOptions
});
var init_dist_es$5 = __esmMin((() => {
	init_AdaptiveRetryStrategy();
	init_StandardRetryStrategy();
	init_configurations();
	init_delayDecider();
	init_omitRetryHeadersMiddleware();
	init_retryDecider();
	init_retryMiddleware();
}));
const signatureV4CrtContainer = { CrtSignerV4: null };
init_dist_es$26();
var SignatureV4MultiRegion = class {
	sigv4aSigner;
	sigv4Signer;
	signerOptions;
	static sigv4aDependency() {
		if (typeof signatureV4CrtContainer.CrtSignerV4 === "function") return "crt";
		else if (typeof signatureV4aContainer.SignatureV4a === "function") return "js";
		return "none";
	}
	constructor(options) {
		this.sigv4Signer = new SignatureV4S3Express(options);
		this.signerOptions = options;
	}
	async sign(requestToSign, options = {}) {
		if (options.signingRegion === "*") return this.getSigv4aSigner().sign(requestToSign, options);
		return this.sigv4Signer.sign(requestToSign, options);
	}
	async signWithCredentials(requestToSign, credentials, options = {}) {
		if (options.signingRegion === "*") {
			const signer = this.getSigv4aSigner();
			const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
			if (CrtSignerV4 && signer instanceof CrtSignerV4) return signer.signWithCredentials(requestToSign, credentials, options);
			else throw new Error("signWithCredentials with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the \"@aws-sdk/signature-v4-crt\" package explicitly. You must also register the package by calling [require(\"@aws-sdk/signature-v4-crt\");] or an ESM equivalent such as [import \"@aws-sdk/signature-v4-crt\";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
		}
		return this.sigv4Signer.signWithCredentials(requestToSign, credentials, options);
	}
	async presign(originalRequest, options = {}) {
		if (options.signingRegion === "*") {
			const signer = this.getSigv4aSigner();
			const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
			if (CrtSignerV4 && signer instanceof CrtSignerV4) return signer.presign(originalRequest, options);
			else throw new Error("presign with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the \"@aws-sdk/signature-v4-crt\" package explicitly. You must also register the package by calling [require(\"@aws-sdk/signature-v4-crt\");] or an ESM equivalent such as [import \"@aws-sdk/signature-v4-crt\";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
		}
		return this.sigv4Signer.presign(originalRequest, options);
	}
	async presignWithCredentials(originalRequest, credentials, options = {}) {
		if (options.signingRegion === "*") throw new Error("Method presignWithCredentials is not supported for [signingRegion=*].");
		return this.sigv4Signer.presignWithCredentials(originalRequest, credentials, options);
	}
	getSigv4aSigner() {
		if (!this.sigv4aSigner) {
			const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
			const JsSigV4aSigner = signatureV4aContainer.SignatureV4a;
			if (this.signerOptions.runtime === "node") {
				if (!CrtSignerV4 && !JsSigV4aSigner) throw new Error("Neither CRT nor JS SigV4a implementation is available. Please load either @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
				if (CrtSignerV4 && typeof CrtSignerV4 === "function") this.sigv4aSigner = new CrtSignerV4({
					...this.signerOptions,
					signingAlgorithm: 1
				});
				else if (JsSigV4aSigner && typeof JsSigV4aSigner === "function") this.sigv4aSigner = new JsSigV4aSigner({ ...this.signerOptions });
				else throw new Error("Available SigV4a implementation is not a valid constructor. Please ensure you've properly imported @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a.For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
			} else {
				if (!JsSigV4aSigner || typeof JsSigV4aSigner !== "function") throw new Error("JS SigV4a implementation is not available or not a valid constructor. Please check whether you have installed the @aws-sdk/signature-v4a package explicitly. The CRT implementation is not available for browsers. You must also register the package by calling [require('@aws-sdk/signature-v4a');] or an ESM equivalent such as [import '@aws-sdk/signature-v4a';]. For more information please go to https://github.com/aws/aws-sdk-js-v3#using-javascript-non-crt-implementation-of-sigv4a");
				this.sigv4aSigner = new JsSigV4aSigner({ ...this.signerOptions });
			}
		}
		return this.sigv4aSigner;
	}
};
var cs = "required", ct = "type", cu = "rules", cv = "conditions", cw = "fn", cx = "argv", cy = "ref", cz = "assign", cA = "url", cB = "properties", cC = "backend", cD = "authSchemes", cE = "disableDoubleEncoding", cF = "signingName", cG = "signingRegion", cH = "headers", cI = "signingRegionSet";
var a = 6, b = false, c = true, d = "isSet", e = "booleanEquals", f = "error", g = "aws.partition", h = "stringEquals", i = "getAttr", j = "name", k = "substring", l = "bucketSuffix", m = "parseURL", n = "endpoint", o = "tree", p = "aws.isVirtualHostableS3Bucket", q = "{url#scheme}://{Bucket}.{url#authority}{url#path}", r = "not", s = "accessPointSuffix", t = "{url#scheme}://{url#authority}{url#path}", u = "hardwareType", v = "regionPrefix", w = "bucketAliasSuffix", x = "outpostId", y = "isValidHostLabel", z = "sigv4a", A = "s3-outposts", B = "s3", C = "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}", D = "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}", E = "https://{Bucket}.s3.{partitionResult#dnsSuffix}", F = "aws.parseArn", G = "bucketArn", H = "arnType", I = "", J = "s3-object-lambda", K = "accesspoint", L = "accessPointName", M = "{url#scheme}://{accessPointName}-{bucketArn#accountId}.{url#authority}{url#path}", N = "mrapPartition", O = "outpostType", P = "arnPrefix", Q = "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}", R = "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", S = "https://s3.{partitionResult#dnsSuffix}", T = {
	[cs]: false,
	[ct]: "string"
}, U = {
	[cs]: true,
	"default": false,
	[ct]: "boolean"
}, V = {
	[cs]: false,
	[ct]: "boolean"
}, W = {
	[cw]: e,
	[cx]: [{ [cy]: "Accelerate" }, true]
}, X = {
	[cw]: e,
	[cx]: [{ [cy]: "UseFIPS" }, true]
}, Y = {
	[cw]: e,
	[cx]: [{ [cy]: "UseDualStack" }, true]
}, Z = {
	[cw]: d,
	[cx]: [{ [cy]: "Endpoint" }]
}, aa = {
	[cw]: g,
	[cx]: [{ [cy]: "Region" }],
	[cz]: "partitionResult"
}, ab = {
	[cw]: h,
	[cx]: [{
		[cw]: i,
		[cx]: [{ [cy]: "partitionResult" }, j]
	}, "aws-cn"]
}, ac = {
	[cw]: d,
	[cx]: [{ [cy]: "Bucket" }]
}, ad = { [cy]: "Bucket" }, ae = {
	[cv]: [W],
	[f]: "S3Express does not support S3 Accelerate.",
	[ct]: f
}, af = {
	[cv]: [Z, {
		[cw]: m,
		[cx]: [{ [cy]: "Endpoint" }],
		[cz]: "url"
	}],
	[cu]: [
		{
			[cv]: [{
				[cw]: d,
				[cx]: [{ [cy]: "DisableS3ExpressSessionAuth" }]
			}, {
				[cw]: e,
				[cx]: [{ [cy]: "DisableS3ExpressSessionAuth" }, true]
			}],
			[cu]: [
				{
					[cv]: [{
						[cw]: e,
						[cx]: [{
							[cw]: i,
							[cx]: [{ [cy]: "url" }, "isIp"]
						}, true]
					}],
					[cu]: [{
						[cv]: [{
							[cw]: "uriEncode",
							[cx]: [ad],
							[cz]: "uri_encoded_bucket"
						}],
						[cu]: [{
							[n]: {
								[cA]: "{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}",
								[cB]: {
									[cC]: "S3Express",
									[cD]: [{
										[cE]: true,
										[j]: "sigv4",
										[cF]: "s3express",
										[cG]: "{Region}"
									}]
								},
								[cH]: {}
							},
							[ct]: n
						}],
						[ct]: o
					}],
					[ct]: o
				},
				{
					[cv]: [{
						[cw]: p,
						[cx]: [ad, false]
					}],
					[cu]: [{
						[n]: {
							[cA]: q,
							[cB]: {
								[cC]: "S3Express",
								[cD]: [{
									[cE]: true,
									[j]: "sigv4",
									[cF]: "s3express",
									[cG]: "{Region}"
								}]
							},
							[cH]: {}
						},
						[ct]: n
					}],
					[ct]: o
				},
				{
					[f]: "S3Express bucket name is not a valid virtual hostable name.",
					[ct]: f
				}
			],
			[ct]: o
		},
		{
			[cv]: [{
				[cw]: e,
				[cx]: [{
					[cw]: i,
					[cx]: [{ [cy]: "url" }, "isIp"]
				}, true]
			}],
			[cu]: [{
				[cv]: [{
					[cw]: "uriEncode",
					[cx]: [ad],
					[cz]: "uri_encoded_bucket"
				}],
				[cu]: [{
					[n]: {
						[cA]: "{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}",
						[cB]: {
							[cC]: "S3Express",
							[cD]: [{
								[cE]: true,
								[j]: "sigv4-s3express",
								[cF]: "s3express",
								[cG]: "{Region}"
							}]
						},
						[cH]: {}
					},
					[ct]: n
				}],
				[ct]: o
			}],
			[ct]: o
		},
		{
			[cv]: [{
				[cw]: p,
				[cx]: [ad, false]
			}],
			[cu]: [{
				[n]: {
					[cA]: q,
					[cB]: {
						[cC]: "S3Express",
						[cD]: [{
							[cE]: true,
							[j]: "sigv4-s3express",
							[cF]: "s3express",
							[cG]: "{Region}"
						}]
					},
					[cH]: {}
				},
				[ct]: n
			}],
			[ct]: o
		},
		{
			[f]: "S3Express bucket name is not a valid virtual hostable name.",
			[ct]: f
		}
	],
	[ct]: o
}, ag = {
	[cw]: m,
	[cx]: [{ [cy]: "Endpoint" }],
	[cz]: "url"
}, ah = {
	[cw]: e,
	[cx]: [{
		[cw]: i,
		[cx]: [{ [cy]: "url" }, "isIp"]
	}, true]
}, ai = { [cy]: "url" }, aj = {
	[cw]: "uriEncode",
	[cx]: [ad],
	[cz]: "uri_encoded_bucket"
}, ak = {
	[cC]: "S3Express",
	[cD]: [{
		[cE]: true,
		[j]: "sigv4",
		[cF]: "s3express",
		[cG]: "{Region}"
	}]
}, al = {}, am = {
	[cw]: p,
	[cx]: [ad, false]
}, an = {
	[f]: "S3Express bucket name is not a valid virtual hostable name.",
	[ct]: f
}, ao = {
	[cw]: d,
	[cx]: [{ [cy]: "UseS3ExpressControlEndpoint" }]
}, ap = {
	[cw]: e,
	[cx]: [{ [cy]: "UseS3ExpressControlEndpoint" }, true]
}, aq = {
	[cw]: r,
	[cx]: [Z]
}, ar = {
	[cw]: e,
	[cx]: [{ [cy]: "UseDualStack" }, false]
}, as = {
	[cw]: e,
	[cx]: [{ [cy]: "UseFIPS" }, false]
}, at = {
	[f]: "Unrecognized S3Express bucket name format.",
	[ct]: f
}, au = {
	[cw]: r,
	[cx]: [ac]
}, av = { [cy]: u }, aw = {
	[cv]: [aq],
	[f]: "Expected a endpoint to be specified but no endpoint was found",
	[ct]: f
}, ax = { [cD]: [{
	[cE]: true,
	[j]: z,
	[cF]: A,
	[cI]: ["*"]
}, {
	[cE]: true,
	[j]: "sigv4",
	[cF]: A,
	[cG]: "{Region}"
}] }, ay = {
	[cw]: e,
	[cx]: [{ [cy]: "ForcePathStyle" }, false]
}, az = { [cy]: "ForcePathStyle" }, aA = {
	[cw]: e,
	[cx]: [{ [cy]: "Accelerate" }, false]
}, aB = {
	[cw]: h,
	[cx]: [{ [cy]: "Region" }, "aws-global"]
}, aC = { [cD]: [{
	[cE]: true,
	[j]: "sigv4",
	[cF]: B,
	[cG]: "us-east-1"
}] }, aD = {
	[cw]: r,
	[cx]: [aB]
}, aE = {
	[cw]: e,
	[cx]: [{ [cy]: "UseGlobalEndpoint" }, true]
}, aF = {
	[cA]: "https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}",
	[cB]: { [cD]: [{
		[cE]: true,
		[j]: "sigv4",
		[cF]: B,
		[cG]: "{Region}"
	}] },
	[cH]: {}
}, aG = { [cD]: [{
	[cE]: true,
	[j]: "sigv4",
	[cF]: B,
	[cG]: "{Region}"
}] }, aH = {
	[cw]: e,
	[cx]: [{ [cy]: "UseGlobalEndpoint" }, false]
}, aI = {
	[cA]: "https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, aJ = {
	[cA]: "https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, aK = {
	[cA]: "https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, aL = {
	[cw]: e,
	[cx]: [{
		[cw]: i,
		[cx]: [ai, "isIp"]
	}, false]
}, aM = {
	[cA]: C,
	[cB]: aG,
	[cH]: {}
}, aN = {
	[cA]: q,
	[cB]: aG,
	[cH]: {}
}, aO = {
	[n]: aN,
	[ct]: n
}, aP = {
	[cA]: D,
	[cB]: aG,
	[cH]: {}
}, aQ = {
	[cA]: "https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, aR = {
	[f]: "Invalid region: region was not a valid DNS name.",
	[ct]: f
}, aS = { [cy]: G }, aT = { [cy]: H }, aU = {
	[cw]: i,
	[cx]: [aS, "service"]
}, aV = { [cy]: L }, aW = {
	[cv]: [Y],
	[f]: "S3 Object Lambda does not support Dual-stack",
	[ct]: f
}, aX = {
	[cv]: [W],
	[f]: "S3 Object Lambda does not support S3 Accelerate",
	[ct]: f
}, aY = {
	[cv]: [{
		[cw]: d,
		[cx]: [{ [cy]: "DisableAccessPoints" }]
	}, {
		[cw]: e,
		[cx]: [{ [cy]: "DisableAccessPoints" }, true]
	}],
	[f]: "Access points are not supported for this operation",
	[ct]: f
}, aZ = {
	[cv]: [
		{
			[cw]: d,
			[cx]: [{ [cy]: "UseArnRegion" }]
		},
		{
			[cw]: e,
			[cx]: [{ [cy]: "UseArnRegion" }, false]
		},
		{
			[cw]: r,
			[cx]: [{
				[cw]: h,
				[cx]: [{
					[cw]: i,
					[cx]: [aS, "region"]
				}, "{Region}"]
			}]
		}
	],
	[f]: "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`",
	[ct]: f
}, ba = {
	[cw]: i,
	[cx]: [{ [cy]: "bucketPartition" }, j]
}, bb = {
	[cw]: i,
	[cx]: [aS, "accountId"]
}, bc = { [cD]: [{
	[cE]: true,
	[j]: "sigv4",
	[cF]: J,
	[cG]: "{bucketArn#region}"
}] }, bd = {
	[f]: "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName}`",
	[ct]: f
}, be = {
	[f]: "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`",
	[ct]: f
}, bf = {
	[f]: "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)",
	[ct]: f
}, bg = {
	[f]: "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`",
	[ct]: f
}, bh = {
	[f]: "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.",
	[ct]: f
}, bi = {
	[f]: "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided",
	[ct]: f
}, bj = { [cD]: [{
	[cE]: true,
	[j]: "sigv4",
	[cF]: B,
	[cG]: "{bucketArn#region}"
}] }, bk = { [cD]: [{
	[cE]: true,
	[j]: z,
	[cF]: A,
	[cI]: ["*"]
}, {
	[cE]: true,
	[j]: "sigv4",
	[cF]: A,
	[cG]: "{bucketArn#region}"
}] }, bl = {
	[cw]: F,
	[cx]: [ad]
}, bm = {
	[cA]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
	[cB]: aG,
	[cH]: {}
}, bn = {
	[cA]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
	[cB]: aG,
	[cH]: {}
}, bo = {
	[cA]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
	[cB]: aG,
	[cH]: {}
}, bp = {
	[cA]: Q,
	[cB]: aG,
	[cH]: {}
}, bq = {
	[cA]: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
	[cB]: aG,
	[cH]: {}
}, br = { [cy]: "UseObjectLambdaEndpoint" }, bs = { [cD]: [{
	[cE]: true,
	[j]: "sigv4",
	[cF]: J,
	[cG]: "{Region}"
}] }, bt = {
	[cA]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, bu = {
	[cA]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, bv = {
	[cA]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, bw = {
	[cA]: t,
	[cB]: aG,
	[cH]: {}
}, bx = {
	[cA]: "https://s3.{Region}.{partitionResult#dnsSuffix}",
	[cB]: aG,
	[cH]: {}
}, by = [{ [cy]: "Region" }], bz = [{ [cy]: "Endpoint" }], bA = [ad], bB = [W], bC = [Z, ag], bD = [{
	[cw]: d,
	[cx]: [{ [cy]: "DisableS3ExpressSessionAuth" }]
}, {
	[cw]: e,
	[cx]: [{ [cy]: "DisableS3ExpressSessionAuth" }, true]
}], bE = [aj], bF = [am], bG = [aa], bH = [X, Y], bI = [X, ar], bJ = [as, Y], bK = [as, ar], bL = [
	{
		[cw]: k,
		[cx]: [
			ad,
			6,
			14,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			14,
			16,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bM = [
	{
		[cv]: [X, Y],
		[n]: {
			[cA]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}",
			[cB]: ak,
			[cH]: {}
		},
		[ct]: n
	},
	{
		[cv]: bI,
		[n]: {
			[cA]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}",
			[cB]: ak,
			[cH]: {}
		},
		[ct]: n
	},
	{
		[cv]: bJ,
		[n]: {
			[cA]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}",
			[cB]: ak,
			[cH]: {}
		},
		[ct]: n
	},
	{
		[cv]: bK,
		[n]: {
			[cA]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}",
			[cB]: ak,
			[cH]: {}
		},
		[ct]: n
	}
], bN = [
	{
		[cw]: k,
		[cx]: [
			ad,
			6,
			15,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			15,
			17,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bO = [
	{
		[cw]: k,
		[cx]: [
			ad,
			6,
			19,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			19,
			21,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bP = [
	{
		[cw]: k,
		[cx]: [
			ad,
			6,
			20,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			20,
			22,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bQ = [
	{
		[cw]: k,
		[cx]: [
			ad,
			6,
			26,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			26,
			28,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bR = [
	{
		[cv]: [X, Y],
		[n]: {
			[cA]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}",
			[cB]: {
				[cC]: "S3Express",
				[cD]: [{
					[cE]: true,
					[j]: "sigv4-s3express",
					[cF]: "s3express",
					[cG]: "{Region}"
				}]
			},
			[cH]: {}
		},
		[ct]: n
	},
	{
		[cv]: bI,
		[n]: {
			[cA]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}",
			[cB]: {
				[cC]: "S3Express",
				[cD]: [{
					[cE]: true,
					[j]: "sigv4-s3express",
					[cF]: "s3express",
					[cG]: "{Region}"
				}]
			},
			[cH]: {}
		},
		[ct]: n
	},
	{
		[cv]: bJ,
		[n]: {
			[cA]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.dualstack.{Region}.{partitionResult#dnsSuffix}",
			[cB]: {
				[cC]: "S3Express",
				[cD]: [{
					[cE]: true,
					[j]: "sigv4-s3express",
					[cF]: "s3express",
					[cG]: "{Region}"
				}]
			},
			[cH]: {}
		},
		[ct]: n
	},
	{
		[cv]: bK,
		[n]: {
			[cA]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.{partitionResult#dnsSuffix}",
			[cB]: {
				[cC]: "S3Express",
				[cD]: [{
					[cE]: true,
					[j]: "sigv4-s3express",
					[cF]: "s3express",
					[cG]: "{Region}"
				}]
			},
			[cH]: {}
		},
		[ct]: n
	}
], bS = [
	ad,
	0,
	7,
	true
], bT = [
	{
		[cw]: k,
		[cx]: [
			ad,
			7,
			15,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			15,
			17,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bU = [
	{
		[cw]: k,
		[cx]: [
			ad,
			7,
			16,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			16,
			18,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bV = [
	{
		[cw]: k,
		[cx]: [
			ad,
			7,
			20,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			20,
			22,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bW = [
	{
		[cw]: k,
		[cx]: [
			ad,
			7,
			21,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			21,
			23,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bX = [
	{
		[cw]: k,
		[cx]: [
			ad,
			7,
			27,
			true
		],
		[cz]: "s3expressAvailabilityZoneId"
	},
	{
		[cw]: k,
		[cx]: [
			ad,
			27,
			29,
			true
		],
		[cz]: "s3expressAvailabilityZoneDelim"
	},
	{
		[cw]: h,
		[cx]: [{ [cy]: "s3expressAvailabilityZoneDelim" }, "--"]
	}
], bY = [ac], bZ = [{
	[cw]: y,
	[cx]: [{ [cy]: x }, false]
}], ca = [{
	[cw]: h,
	[cx]: [{ [cy]: v }, "beta"]
}], cb = ["*"], cc = [{
	[cw]: y,
	[cx]: [{ [cy]: "Region" }, false]
}], cd = [{
	[cw]: h,
	[cx]: [{ [cy]: "Region" }, "us-east-1"]
}], ce = [{
	[cw]: h,
	[cx]: [aT, K]
}], cf = [{
	[cw]: i,
	[cx]: [aS, "resourceId[1]"],
	[cz]: L
}, {
	[cw]: r,
	[cx]: [{
		[cw]: h,
		[cx]: [aV, I]
	}]
}], cg = [aS, "resourceId[1]"], ch = [Y], ci = [{
	[cw]: r,
	[cx]: [{
		[cw]: h,
		[cx]: [{
			[cw]: i,
			[cx]: [aS, "region"]
		}, I]
	}]
}], cj = [{
	[cw]: r,
	[cx]: [{
		[cw]: d,
		[cx]: [{
			[cw]: i,
			[cx]: [aS, "resourceId[2]"]
		}]
	}]
}], ck = [aS, "resourceId[2]"], cl = [{
	[cw]: g,
	[cx]: [{
		[cw]: i,
		[cx]: [aS, "region"]
	}],
	[cz]: "bucketPartition"
}], cm = [{
	[cw]: h,
	[cx]: [ba, {
		[cw]: i,
		[cx]: [{ [cy]: "partitionResult" }, j]
	}]
}], cn = [{
	[cw]: y,
	[cx]: [{
		[cw]: i,
		[cx]: [aS, "region"]
	}, true]
}], co = [{
	[cw]: y,
	[cx]: [bb, false]
}], cp = [{
	[cw]: y,
	[cx]: [aV, false]
}], cq = [X], cr = [{
	[cw]: y,
	[cx]: [{ [cy]: "Region" }, true]
}];
const ruleSet = {
	version: "1.0",
	parameters: {
		Bucket: T,
		Region: T,
		UseFIPS: U,
		UseDualStack: U,
		Endpoint: T,
		ForcePathStyle: U,
		Accelerate: U,
		UseGlobalEndpoint: U,
		UseObjectLambdaEndpoint: V,
		Key: T,
		Prefix: T,
		CopySource: T,
		DisableAccessPoints: V,
		DisableMultiRegionAccessPoints: U,
		UseArnRegion: V,
		UseS3ExpressControlEndpoint: V,
		DisableS3ExpressSessionAuth: V
	},
	[cu]: [{
		[cv]: [{
			[cw]: d,
			[cx]: by
		}],
		[cu]: [
			{
				[cv]: [W, X],
				error: "Accelerate cannot be used with FIPS",
				[ct]: f
			},
			{
				[cv]: [Y, Z],
				error: "Cannot set dual-stack in combination with a custom endpoint.",
				[ct]: f
			},
			{
				[cv]: [Z, X],
				error: "A custom endpoint cannot be combined with FIPS",
				[ct]: f
			},
			{
				[cv]: [Z, W],
				error: "A custom endpoint cannot be combined with S3 Accelerate",
				[ct]: f
			},
			{
				[cv]: [
					X,
					aa,
					ab
				],
				error: "Partition does not support FIPS",
				[ct]: f
			},
			{
				[cv]: [
					ac,
					{
						[cw]: k,
						[cx]: [
							ad,
							0,
							a,
							c
						],
						[cz]: l
					},
					{
						[cw]: h,
						[cx]: [{ [cy]: l }, "--x-s3"]
					}
				],
				[cu]: [
					ae,
					af,
					{
						[cv]: [ao, ap],
						[cu]: [{
							[cv]: bG,
							[cu]: [{
								[cv]: [aj, aq],
								[cu]: [
									{
										[cv]: bH,
										endpoint: {
											[cA]: "https://s3express-control-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
											[cB]: ak,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: bI,
										endpoint: {
											[cA]: "https://s3express-control-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
											[cB]: ak,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: bJ,
										endpoint: {
											[cA]: "https://s3express-control.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
											[cB]: ak,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: bK,
										endpoint: {
											[cA]: "https://s3express-control.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
											[cB]: ak,
											[cH]: al
										},
										[ct]: n
									}
								],
								[ct]: o
							}],
							[ct]: o
						}],
						[ct]: o
					},
					{
						[cv]: bF,
						[cu]: [{
							[cv]: bG,
							[cu]: [
								{
									[cv]: bD,
									[cu]: [
										{
											[cv]: bL,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bN,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bO,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bP,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bQ,
											[cu]: bM,
											[ct]: o
										},
										at
									],
									[ct]: o
								},
								{
									[cv]: bL,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bN,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bO,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bP,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bQ,
									[cu]: bR,
									[ct]: o
								},
								at
							],
							[ct]: o
						}],
						[ct]: o
					},
					an
				],
				[ct]: o
			},
			{
				[cv]: [
					ac,
					{
						[cw]: k,
						[cx]: bS,
						[cz]: s
					},
					{
						[cw]: h,
						[cx]: [{ [cy]: s }, "--xa-s3"]
					}
				],
				[cu]: [
					ae,
					af,
					{
						[cv]: bF,
						[cu]: [{
							[cv]: bG,
							[cu]: [
								{
									[cv]: bD,
									[cu]: [
										{
											[cv]: bT,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bU,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bV,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bW,
											[cu]: bM,
											[ct]: o
										},
										{
											[cv]: bX,
											[cu]: bM,
											[ct]: o
										},
										at
									],
									[ct]: o
								},
								{
									[cv]: bT,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bU,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bV,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bW,
									[cu]: bR,
									[ct]: o
								},
								{
									[cv]: bX,
									[cu]: bR,
									[ct]: o
								},
								at
							],
							[ct]: o
						}],
						[ct]: o
					},
					an
				],
				[ct]: o
			},
			{
				[cv]: [
					au,
					ao,
					ap
				],
				[cu]: [{
					[cv]: bG,
					[cu]: [
						{
							[cv]: bC,
							endpoint: {
								[cA]: t,
								[cB]: ak,
								[cH]: al
							},
							[ct]: n
						},
						{
							[cv]: bH,
							endpoint: {
								[cA]: "https://s3express-control-fips.dualstack.{Region}.{partitionResult#dnsSuffix}",
								[cB]: ak,
								[cH]: al
							},
							[ct]: n
						},
						{
							[cv]: bI,
							endpoint: {
								[cA]: "https://s3express-control-fips.{Region}.{partitionResult#dnsSuffix}",
								[cB]: ak,
								[cH]: al
							},
							[ct]: n
						},
						{
							[cv]: bJ,
							endpoint: {
								[cA]: "https://s3express-control.dualstack.{Region}.{partitionResult#dnsSuffix}",
								[cB]: ak,
								[cH]: al
							},
							[ct]: n
						},
						{
							[cv]: bK,
							endpoint: {
								[cA]: "https://s3express-control.{Region}.{partitionResult#dnsSuffix}",
								[cB]: ak,
								[cH]: al
							},
							[ct]: n
						}
					],
					[ct]: o
				}],
				[ct]: o
			},
			{
				[cv]: [
					ac,
					{
						[cw]: k,
						[cx]: [
							ad,
							49,
							50,
							c
						],
						[cz]: u
					},
					{
						[cw]: k,
						[cx]: [
							ad,
							8,
							12,
							c
						],
						[cz]: v
					},
					{
						[cw]: k,
						[cx]: bS,
						[cz]: w
					},
					{
						[cw]: k,
						[cx]: [
							ad,
							32,
							49,
							c
						],
						[cz]: x
					},
					{
						[cw]: g,
						[cx]: by,
						[cz]: "regionPartition"
					},
					{
						[cw]: h,
						[cx]: [{ [cy]: w }, "--op-s3"]
					}
				],
				[cu]: [{
					[cv]: bZ,
					[cu]: [{
						[cv]: bF,
						[cu]: [
							{
								[cv]: [{
									[cw]: h,
									[cx]: [av, "e"]
								}],
								[cu]: [{
									[cv]: ca,
									[cu]: [aw, {
										[cv]: bC,
										endpoint: {
											[cA]: "https://{Bucket}.ec2.{url#authority}",
											[cB]: ax,
											[cH]: al
										},
										[ct]: n
									}],
									[ct]: o
								}, {
									endpoint: {
										[cA]: "https://{Bucket}.ec2.s3-outposts.{Region}.{regionPartition#dnsSuffix}",
										[cB]: ax,
										[cH]: al
									},
									[ct]: n
								}],
								[ct]: o
							},
							{
								[cv]: [{
									[cw]: h,
									[cx]: [av, "o"]
								}],
								[cu]: [{
									[cv]: ca,
									[cu]: [aw, {
										[cv]: bC,
										endpoint: {
											[cA]: "https://{Bucket}.op-{outpostId}.{url#authority}",
											[cB]: ax,
											[cH]: al
										},
										[ct]: n
									}],
									[ct]: o
								}, {
									endpoint: {
										[cA]: "https://{Bucket}.op-{outpostId}.s3-outposts.{Region}.{regionPartition#dnsSuffix}",
										[cB]: ax,
										[cH]: al
									},
									[ct]: n
								}],
								[ct]: o
							},
							{
								error: "Unrecognized hardware type: \"Expected hardware type o or e but got {hardwareType}\"",
								[ct]: f
							}
						],
						[ct]: o
					}, {
						error: "Invalid Outposts Bucket alias - it must be a valid bucket name.",
						[ct]: f
					}],
					[ct]: o
				}, {
					error: "Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and `-`.",
					[ct]: f
				}],
				[ct]: o
			},
			{
				[cv]: bY,
				[cu]: [
					{
						[cv]: [Z, {
							[cw]: r,
							[cx]: [{
								[cw]: d,
								[cx]: [{
									[cw]: m,
									[cx]: bz
								}]
							}]
						}],
						error: "Custom endpoint `{Endpoint}` was not a valid URI",
						[ct]: f
					},
					{
						[cv]: [ay, am],
						[cu]: [{
							[cv]: bG,
							[cu]: [{
								[cv]: cc,
								[cu]: [
									{
										[cv]: [W, ab],
										error: "S3 Accelerate cannot be used in this region",
										[ct]: f
									},
									{
										[cv]: [
											Y,
											X,
											aA,
											aq,
											aB
										],
										endpoint: {
											[cA]: "https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}",
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											Y,
											X,
											aA,
											aq,
											aD,
											aE
										],
										[cu]: [{
											endpoint: aF,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											Y,
											X,
											aA,
											aq,
											aD,
											aH
										],
										endpoint: aF,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											X,
											aA,
											aq,
											aB
										],
										endpoint: {
											[cA]: "https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}",
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											X,
											aA,
											aq,
											aD,
											aE
										],
										[cu]: [{
											endpoint: aI,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											X,
											aA,
											aq,
											aD,
											aH
										],
										endpoint: aI,
										[ct]: n
									},
									{
										[cv]: [
											Y,
											as,
											W,
											aq,
											aB
										],
										endpoint: {
											[cA]: "https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}",
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											Y,
											as,
											W,
											aq,
											aD,
											aE
										],
										[cu]: [{
											endpoint: aJ,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											Y,
											as,
											W,
											aq,
											aD,
											aH
										],
										endpoint: aJ,
										[ct]: n
									},
									{
										[cv]: [
											Y,
											as,
											aA,
											aq,
											aB
										],
										endpoint: {
											[cA]: "https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}",
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											Y,
											as,
											aA,
											aq,
											aD,
											aE
										],
										[cu]: [{
											endpoint: aK,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											Y,
											as,
											aA,
											aq,
											aD,
											aH
										],
										endpoint: aK,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											Z,
											ag,
											ah,
											aB
										],
										endpoint: {
											[cA]: C,
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											Z,
											ag,
											aL,
											aB
										],
										endpoint: {
											[cA]: q,
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											Z,
											ag,
											ah,
											aD,
											aE
										],
										[cu]: [{
											[cv]: cd,
											endpoint: aM,
											[ct]: n
										}, {
											endpoint: aM,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											Z,
											ag,
											aL,
											aD,
											aE
										],
										[cu]: [{
											[cv]: cd,
											endpoint: aN,
											[ct]: n
										}, aO],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											Z,
											ag,
											ah,
											aD,
											aH
										],
										endpoint: aM,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											Z,
											ag,
											aL,
											aD,
											aH
										],
										endpoint: aN,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											W,
											aq,
											aB
										],
										endpoint: {
											[cA]: D,
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											W,
											aq,
											aD,
											aE
										],
										[cu]: [{
											[cv]: cd,
											endpoint: aP,
											[ct]: n
										}, {
											endpoint: aP,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											as,
											W,
											aq,
											aD,
											aH
										],
										endpoint: aP,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											aq,
											aB
										],
										endpoint: {
											[cA]: E,
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											aq,
											aD,
											aE
										],
										[cu]: [{
											[cv]: cd,
											endpoint: {
												[cA]: E,
												[cB]: aG,
												[cH]: al
											},
											[ct]: n
										}, {
											endpoint: aQ,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											as,
											aA,
											aq,
											aD,
											aH
										],
										endpoint: aQ,
										[ct]: n
									}
								],
								[ct]: o
							}, aR],
							[ct]: o
						}],
						[ct]: o
					},
					{
						[cv]: [
							Z,
							ag,
							{
								[cw]: h,
								[cx]: [{
									[cw]: i,
									[cx]: [ai, "scheme"]
								}, "http"]
							},
							{
								[cw]: p,
								[cx]: [ad, c]
							},
							ay,
							as,
							ar,
							aA
						],
						[cu]: [{
							[cv]: bG,
							[cu]: [{
								[cv]: cc,
								[cu]: [aO],
								[ct]: o
							}, aR],
							[ct]: o
						}],
						[ct]: o
					},
					{
						[cv]: [ay, {
							[cw]: F,
							[cx]: bA,
							[cz]: G
						}],
						[cu]: [{
							[cv]: [{
								[cw]: i,
								[cx]: [aS, "resourceId[0]"],
								[cz]: H
							}, {
								[cw]: r,
								[cx]: [{
									[cw]: h,
									[cx]: [aT, I]
								}]
							}],
							[cu]: [
								{
									[cv]: [{
										[cw]: h,
										[cx]: [aU, J]
									}],
									[cu]: [{
										[cv]: ce,
										[cu]: [{
											[cv]: cf,
											[cu]: [
												aW,
												aX,
												{
													[cv]: ci,
													[cu]: [
														aY,
														{
															[cv]: cj,
															[cu]: [aZ, {
																[cv]: cl,
																[cu]: [{
																	[cv]: bG,
																	[cu]: [{
																		[cv]: cm,
																		[cu]: [{
																			[cv]: cn,
																			[cu]: [
																				{
																					[cv]: [{
																						[cw]: h,
																						[cx]: [bb, I]
																					}],
																					error: "Invalid ARN: Missing account id",
																					[ct]: f
																				},
																				{
																					[cv]: co,
																					[cu]: [{
																						[cv]: cp,
																						[cu]: [
																							{
																								[cv]: bC,
																								endpoint: {
																									[cA]: M,
																									[cB]: bc,
																									[cH]: al
																								},
																								[ct]: n
																							},
																							{
																								[cv]: cq,
																								endpoint: {
																									[cA]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}",
																									[cB]: bc,
																									[cH]: al
																								},
																								[ct]: n
																							},
																							{
																								endpoint: {
																									[cA]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda.{bucketArn#region}.{bucketPartition#dnsSuffix}",
																									[cB]: bc,
																									[cH]: al
																								},
																								[ct]: n
																							}
																						],
																						[ct]: o
																					}, bd],
																					[ct]: o
																				},
																				be
																			],
																			[ct]: o
																		}, bf],
																		[ct]: o
																	}, bg],
																	[ct]: o
																}],
																[ct]: o
															}],
															[ct]: o
														},
														bh
													],
													[ct]: o
												},
												{
													error: "Invalid ARN: bucket ARN is missing a region",
													[ct]: f
												}
											],
											[ct]: o
										}, bi],
										[ct]: o
									}, {
										error: "Invalid ARN: Object Lambda ARNs only support `accesspoint` arn types, but found: `{arnType}`",
										[ct]: f
									}],
									[ct]: o
								},
								{
									[cv]: ce,
									[cu]: [{
										[cv]: cf,
										[cu]: [
											{
												[cv]: ci,
												[cu]: [{
													[cv]: ce,
													[cu]: [{
														[cv]: ci,
														[cu]: [
															aY,
															{
																[cv]: cj,
																[cu]: [aZ, {
																	[cv]: cl,
																	[cu]: [{
																		[cv]: bG,
																		[cu]: [{
																			[cv]: [{
																				[cw]: h,
																				[cx]: [ba, "{partitionResult#name}"]
																			}],
																			[cu]: [{
																				[cv]: cn,
																				[cu]: [{
																					[cv]: [{
																						[cw]: h,
																						[cx]: [aU, B]
																					}],
																					[cu]: [{
																						[cv]: co,
																						[cu]: [{
																							[cv]: cp,
																							[cu]: [
																								{
																									[cv]: bB,
																									error: "Access Points do not support S3 Accelerate",
																									[ct]: f
																								},
																								{
																									[cv]: bH,
																									endpoint: {
																										[cA]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}",
																										[cB]: bj,
																										[cH]: al
																									},
																									[ct]: n
																								},
																								{
																									[cv]: bI,
																									endpoint: {
																										[cA]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}",
																										[cB]: bj,
																										[cH]: al
																									},
																									[ct]: n
																								},
																								{
																									[cv]: bJ,
																									endpoint: {
																										[cA]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}",
																										[cB]: bj,
																										[cH]: al
																									},
																									[ct]: n
																								},
																								{
																									[cv]: [
																										as,
																										ar,
																										Z,
																										ag
																									],
																									endpoint: {
																										[cA]: M,
																										[cB]: bj,
																										[cH]: al
																									},
																									[ct]: n
																								},
																								{
																									[cv]: bK,
																									endpoint: {
																										[cA]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.{bucketArn#region}.{bucketPartition#dnsSuffix}",
																										[cB]: bj,
																										[cH]: al
																									},
																									[ct]: n
																								}
																							],
																							[ct]: o
																						}, bd],
																						[ct]: o
																					}, be],
																					[ct]: o
																				}, {
																					error: "Invalid ARN: The ARN was not for the S3 service, found: {bucketArn#service}",
																					[ct]: f
																				}],
																				[ct]: o
																			}, bf],
																			[ct]: o
																		}, bg],
																		[ct]: o
																	}],
																	[ct]: o
																}],
																[ct]: o
															},
															bh
														],
														[ct]: o
													}],
													[ct]: o
												}],
												[ct]: o
											},
											{
												[cv]: [{
													[cw]: y,
													[cx]: [aV, c]
												}],
												[cu]: [
													{
														[cv]: ch,
														error: "S3 MRAP does not support dual-stack",
														[ct]: f
													},
													{
														[cv]: cq,
														error: "S3 MRAP does not support FIPS",
														[ct]: f
													},
													{
														[cv]: bB,
														error: "S3 MRAP does not support S3 Accelerate",
														[ct]: f
													},
													{
														[cv]: [{
															[cw]: e,
															[cx]: [{ [cy]: "DisableMultiRegionAccessPoints" }, c]
														}],
														error: "Invalid configuration: Multi-Region Access Point ARNs are disabled.",
														[ct]: f
													},
													{
														[cv]: [{
															[cw]: g,
															[cx]: by,
															[cz]: N
														}],
														[cu]: [{
															[cv]: [{
																[cw]: h,
																[cx]: [{
																	[cw]: i,
																	[cx]: [{ [cy]: N }, j]
																}, {
																	[cw]: i,
																	[cx]: [aS, "partition"]
																}]
															}],
															[cu]: [{
																endpoint: {
																	[cA]: "https://{accessPointName}.accesspoint.s3-global.{mrapPartition#dnsSuffix}",
																	[cB]: { [cD]: [{
																		[cE]: c,
																		name: z,
																		[cF]: B,
																		[cI]: cb
																	}] },
																	[cH]: al
																},
																[ct]: n
															}],
															[ct]: o
														}, {
															error: "Client was configured for partition `{mrapPartition#name}` but bucket referred to partition `{bucketArn#partition}`",
															[ct]: f
														}],
														[ct]: o
													}
												],
												[ct]: o
											},
											{
												error: "Invalid Access Point Name",
												[ct]: f
											}
										],
										[ct]: o
									}, bi],
									[ct]: o
								},
								{
									[cv]: [{
										[cw]: h,
										[cx]: [aU, A]
									}],
									[cu]: [
										{
											[cv]: ch,
											error: "S3 Outposts does not support Dual-stack",
											[ct]: f
										},
										{
											[cv]: cq,
											error: "S3 Outposts does not support FIPS",
											[ct]: f
										},
										{
											[cv]: bB,
											error: "S3 Outposts does not support S3 Accelerate",
											[ct]: f
										},
										{
											[cv]: [{
												[cw]: d,
												[cx]: [{
													[cw]: i,
													[cx]: [aS, "resourceId[4]"]
												}]
											}],
											error: "Invalid Arn: Outpost Access Point ARN contains sub resources",
											[ct]: f
										},
										{
											[cv]: [{
												[cw]: i,
												[cx]: cg,
												[cz]: x
											}],
											[cu]: [{
												[cv]: bZ,
												[cu]: [aZ, {
													[cv]: cl,
													[cu]: [{
														[cv]: bG,
														[cu]: [{
															[cv]: cm,
															[cu]: [{
																[cv]: cn,
																[cu]: [{
																	[cv]: co,
																	[cu]: [{
																		[cv]: [{
																			[cw]: i,
																			[cx]: ck,
																			[cz]: O
																		}],
																		[cu]: [{
																			[cv]: [{
																				[cw]: i,
																				[cx]: [aS, "resourceId[3]"],
																				[cz]: L
																			}],
																			[cu]: [{
																				[cv]: [{
																					[cw]: h,
																					[cx]: [{ [cy]: O }, K]
																				}],
																				[cu]: [{
																					[cv]: bC,
																					endpoint: {
																						[cA]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.{url#authority}",
																						[cB]: bk,
																						[cH]: al
																					},
																					[ct]: n
																				}, {
																					endpoint: {
																						[cA]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.s3-outposts.{bucketArn#region}.{bucketPartition#dnsSuffix}",
																						[cB]: bk,
																						[cH]: al
																					},
																					[ct]: n
																				}],
																				[ct]: o
																			}, {
																				error: "Expected an outpost type `accesspoint`, found {outpostType}",
																				[ct]: f
																			}],
																			[ct]: o
																		}, {
																			error: "Invalid ARN: expected an access point name",
																			[ct]: f
																		}],
																		[ct]: o
																	}, {
																		error: "Invalid ARN: Expected a 4-component resource",
																		[ct]: f
																	}],
																	[ct]: o
																}, be],
																[ct]: o
															}, bf],
															[ct]: o
														}, bg],
														[ct]: o
													}],
													[ct]: o
												}],
												[ct]: o
											}, {
												error: "Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and `-`. Found: `{outpostId}`",
												[ct]: f
											}],
											[ct]: o
										},
										{
											error: "Invalid ARN: The Outpost Id was not set",
											[ct]: f
										}
									],
									[ct]: o
								},
								{
									error: "Invalid ARN: Unrecognized format: {Bucket} (type: {arnType})",
									[ct]: f
								}
							],
							[ct]: o
						}, {
							error: "Invalid ARN: No ARN type specified",
							[ct]: f
						}],
						[ct]: o
					},
					{
						[cv]: [
							{
								[cw]: k,
								[cx]: [
									ad,
									0,
									4,
									b
								],
								[cz]: P
							},
							{
								[cw]: h,
								[cx]: [{ [cy]: P }, "arn:"]
							},
							{
								[cw]: r,
								[cx]: [{
									[cw]: d,
									[cx]: [bl]
								}]
							}
						],
						error: "Invalid ARN: `{Bucket}` was not a valid ARN",
						[ct]: f
					},
					{
						[cv]: [{
							[cw]: e,
							[cx]: [az, c]
						}, bl],
						error: "Path-style addressing cannot be used with ARN buckets",
						[ct]: f
					},
					{
						[cv]: bE,
						[cu]: [{
							[cv]: bG,
							[cu]: [{
								[cv]: [aA],
								[cu]: [
									{
										[cv]: [
											Y,
											aq,
											X,
											aB
										],
										endpoint: {
											[cA]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											Y,
											aq,
											X,
											aD,
											aE
										],
										[cu]: [{
											endpoint: bm,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											Y,
											aq,
											X,
											aD,
											aH
										],
										endpoint: bm,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											aq,
											X,
											aB
										],
										endpoint: {
											[cA]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											aq,
											X,
											aD,
											aE
										],
										[cu]: [{
											endpoint: bn,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											aq,
											X,
											aD,
											aH
										],
										endpoint: bn,
										[ct]: n
									},
									{
										[cv]: [
											Y,
											aq,
											as,
											aB
										],
										endpoint: {
											[cA]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}",
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											Y,
											aq,
											as,
											aD,
											aE
										],
										[cu]: [{
											endpoint: bo,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											Y,
											aq,
											as,
											aD,
											aH
										],
										endpoint: bo,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											Z,
											ag,
											as,
											aB
										],
										endpoint: {
											[cA]: Q,
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											Z,
											ag,
											as,
											aD,
											aE
										],
										[cu]: [{
											[cv]: cd,
											endpoint: bp,
											[ct]: n
										}, {
											endpoint: bp,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											Z,
											ag,
											as,
											aD,
											aH
										],
										endpoint: bp,
										[ct]: n
									},
									{
										[cv]: [
											ar,
											aq,
											as,
											aB
										],
										endpoint: {
											[cA]: R,
											[cB]: aC,
											[cH]: al
										},
										[ct]: n
									},
									{
										[cv]: [
											ar,
											aq,
											as,
											aD,
											aE
										],
										[cu]: [{
											[cv]: cd,
											endpoint: {
												[cA]: R,
												[cB]: aG,
												[cH]: al
											},
											[ct]: n
										}, {
											endpoint: bq,
											[ct]: n
										}],
										[ct]: o
									},
									{
										[cv]: [
											ar,
											aq,
											as,
											aD,
											aH
										],
										endpoint: bq,
										[ct]: n
									}
								],
								[ct]: o
							}, {
								error: "Path-style addressing cannot be used with S3 Accelerate",
								[ct]: f
							}],
							[ct]: o
						}],
						[ct]: o
					}
				],
				[ct]: o
			},
			{
				[cv]: [{
					[cw]: d,
					[cx]: [br]
				}, {
					[cw]: e,
					[cx]: [br, c]
				}],
				[cu]: [{
					[cv]: bG,
					[cu]: [{
						[cv]: cr,
						[cu]: [
							aW,
							aX,
							{
								[cv]: bC,
								endpoint: {
									[cA]: t,
									[cB]: bs,
									[cH]: al
								},
								[ct]: n
							},
							{
								[cv]: cq,
								endpoint: {
									[cA]: "https://s3-object-lambda-fips.{Region}.{partitionResult#dnsSuffix}",
									[cB]: bs,
									[cH]: al
								},
								[ct]: n
							},
							{
								endpoint: {
									[cA]: "https://s3-object-lambda.{Region}.{partitionResult#dnsSuffix}",
									[cB]: bs,
									[cH]: al
								},
								[ct]: n
							}
						],
						[ct]: o
					}, aR],
					[ct]: o
				}],
				[ct]: o
			},
			{
				[cv]: [au],
				[cu]: [{
					[cv]: bG,
					[cu]: [{
						[cv]: cr,
						[cu]: [
							{
								[cv]: [
									X,
									Y,
									aq,
									aB
								],
								endpoint: {
									[cA]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}",
									[cB]: aC,
									[cH]: al
								},
								[ct]: n
							},
							{
								[cv]: [
									X,
									Y,
									aq,
									aD,
									aE
								],
								[cu]: [{
									endpoint: bt,
									[ct]: n
								}],
								[ct]: o
							},
							{
								[cv]: [
									X,
									Y,
									aq,
									aD,
									aH
								],
								endpoint: bt,
								[ct]: n
							},
							{
								[cv]: [
									X,
									ar,
									aq,
									aB
								],
								endpoint: {
									[cA]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}",
									[cB]: aC,
									[cH]: al
								},
								[ct]: n
							},
							{
								[cv]: [
									X,
									ar,
									aq,
									aD,
									aE
								],
								[cu]: [{
									endpoint: bu,
									[ct]: n
								}],
								[ct]: o
							},
							{
								[cv]: [
									X,
									ar,
									aq,
									aD,
									aH
								],
								endpoint: bu,
								[ct]: n
							},
							{
								[cv]: [
									as,
									Y,
									aq,
									aB
								],
								endpoint: {
									[cA]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}",
									[cB]: aC,
									[cH]: al
								},
								[ct]: n
							},
							{
								[cv]: [
									as,
									Y,
									aq,
									aD,
									aE
								],
								[cu]: [{
									endpoint: bv,
									[ct]: n
								}],
								[ct]: o
							},
							{
								[cv]: [
									as,
									Y,
									aq,
									aD,
									aH
								],
								endpoint: bv,
								[ct]: n
							},
							{
								[cv]: [
									as,
									ar,
									Z,
									ag,
									aB
								],
								endpoint: {
									[cA]: t,
									[cB]: aC,
									[cH]: al
								},
								[ct]: n
							},
							{
								[cv]: [
									as,
									ar,
									Z,
									ag,
									aD,
									aE
								],
								[cu]: [{
									[cv]: cd,
									endpoint: bw,
									[ct]: n
								}, {
									endpoint: bw,
									[ct]: n
								}],
								[ct]: o
							},
							{
								[cv]: [
									as,
									ar,
									Z,
									ag,
									aD,
									aH
								],
								endpoint: bw,
								[ct]: n
							},
							{
								[cv]: [
									as,
									ar,
									aq,
									aB
								],
								endpoint: {
									[cA]: S,
									[cB]: aC,
									[cH]: al
								},
								[ct]: n
							},
							{
								[cv]: [
									as,
									ar,
									aq,
									aD,
									aE
								],
								[cu]: [{
									[cv]: cd,
									endpoint: {
										[cA]: S,
										[cB]: aG,
										[cH]: al
									},
									[ct]: n
								}, {
									endpoint: bx,
									[ct]: n
								}],
								[ct]: o
							},
							{
								[cv]: [
									as,
									ar,
									aq,
									aD,
									aH
								],
								endpoint: bx,
								[ct]: n
							}
						],
						[ct]: o
					}, aR],
					[ct]: o
				}],
				[ct]: o
			}
		],
		[ct]: o
	}, {
		error: "A region must be set when sending requests to S3.",
		[ct]: f
	}]
};
init_dist_es$14();
init_dist_es$17();
var cache = new EndpointCache({
	size: 50,
	params: [
		"Accelerate",
		"Bucket",
		"DisableAccessPoints",
		"DisableMultiRegionAccessPoints",
		"DisableS3ExpressSessionAuth",
		"Endpoint",
		"ForcePathStyle",
		"Region",
		"UseArnRegion",
		"UseDualStack",
		"UseFIPS",
		"UseGlobalEndpoint",
		"UseObjectLambdaEndpoint",
		"UseS3ExpressControlEndpoint"
	]
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
	return cache.get(endpointParams, () => resolveEndpoint(ruleSet, {
		endpointParams,
		logger: context.logger
	}));
};
customEndpointFunctions.aws = awsEndpointFunctions;
init_dist_es$8();
init_dist_es$40();
var createEndpointRuleSetHttpAuthSchemeParametersProvider = (defaultHttpAuthSchemeParametersProvider) => async (config, context, input) => {
	if (!input) throw new Error("Could not find `input` for `defaultEndpointRuleSetHttpAuthSchemeParametersProvider`");
	const defaultParameters = await defaultHttpAuthSchemeParametersProvider(config, context, input);
	const instructionsFn = getSmithyContext(context)?.commandInstance?.constructor?.getEndpointParameterInstructions;
	if (!instructionsFn) throw new Error(`getEndpointParameterInstructions() is not defined on '${context.commandName}'`);
	const endpointParameters = await resolveParams(input, { getEndpointParameterInstructions: instructionsFn }, config);
	return Object.assign(defaultParameters, endpointParameters);
};
var _defaultS3HttpAuthSchemeParametersProvider = async (config, context, input) => {
	return {
		operation: getSmithyContext(context).operation,
		region: await normalizeProvider$1(config.region)() || (() => {
			throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
		})()
	};
};
const defaultS3HttpAuthSchemeParametersProvider = createEndpointRuleSetHttpAuthSchemeParametersProvider(_defaultS3HttpAuthSchemeParametersProvider);
function createAwsAuthSigv4HttpAuthOption(authParameters) {
	return {
		schemeId: "aws.auth#sigv4",
		signingProperties: {
			name: "s3",
			region: authParameters.region
		},
		propertiesExtractor: (config, context) => ({ signingProperties: {
			config,
			context
		} })
	};
}
function createAwsAuthSigv4aHttpAuthOption(authParameters) {
	return {
		schemeId: "aws.auth#sigv4a",
		signingProperties: {
			name: "s3",
			region: authParameters.region
		},
		propertiesExtractor: (config, context) => ({ signingProperties: {
			config,
			context
		} })
	};
}
var createEndpointRuleSetHttpAuthSchemeProvider = (defaultEndpointResolver, defaultHttpAuthSchemeResolver, createHttpAuthOptionFunctions) => {
	const endpointRuleSetHttpAuthSchemeProvider = (authParameters) => {
		const authSchemes = defaultEndpointResolver(authParameters).properties?.authSchemes;
		if (!authSchemes) return defaultHttpAuthSchemeResolver(authParameters);
		const options = [];
		for (const scheme of authSchemes) {
			const { name: resolvedName, properties = {}, ...rest } = scheme;
			const name = resolvedName.toLowerCase();
			if (resolvedName !== name) console.warn(`HttpAuthScheme has been normalized with lowercasing: '${resolvedName}' to '${name}'`);
			let schemeId;
			if (name === "sigv4a") {
				schemeId = "aws.auth#sigv4a";
				const sigv4Present = authSchemes.find((s) => {
					const name = s.name.toLowerCase();
					return name !== "sigv4a" && name.startsWith("sigv4");
				});
				if (SignatureV4MultiRegion.sigv4aDependency() === "none" && sigv4Present) continue;
			} else if (name.startsWith("sigv4")) schemeId = "aws.auth#sigv4";
			else throw new Error(`Unknown HttpAuthScheme found in '@smithy.rules#endpointRuleSet': '${name}'`);
			const createOption = createHttpAuthOptionFunctions[schemeId];
			if (!createOption) throw new Error(`Could not find HttpAuthOption create function for '${schemeId}'`);
			const option = createOption(authParameters);
			option.schemeId = schemeId;
			option.signingProperties = {
				...option.signingProperties || {},
				...rest,
				...properties
			};
			options.push(option);
		}
		return options;
	};
	return endpointRuleSetHttpAuthSchemeProvider;
};
var _defaultS3HttpAuthSchemeProvider = (authParameters) => {
	const options = [];
	switch (authParameters.operation) {
		default:
			options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
			options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
	}
	return options;
};
const defaultS3HttpAuthSchemeProvider = createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, _defaultS3HttpAuthSchemeProvider, {
	"aws.auth#sigv4": createAwsAuthSigv4HttpAuthOption,
	"aws.auth#sigv4a": createAwsAuthSigv4aHttpAuthOption
});
const resolveHttpAuthSchemeConfig = (config) => {
	const config_1 = (0, import_dist_cjs$4.resolveAwsSdkSigV4AConfig)((0, import_dist_cjs$4.resolveAwsSdkSigV4Config)(config));
	return Object.assign(config_1, { authSchemePreference: normalizeProvider$1(config.authSchemePreference ?? []) });
};
const resolveClientEndpointParameters = (options) => {
	return Object.assign(options, {
		useFipsEndpoint: options.useFipsEndpoint ?? false,
		useDualstackEndpoint: options.useDualstackEndpoint ?? false,
		forcePathStyle: options.forcePathStyle ?? false,
		useAccelerateEndpoint: options.useAccelerateEndpoint ?? false,
		useGlobalEndpoint: options.useGlobalEndpoint ?? false,
		disableMultiregionAccessPoints: options.disableMultiregionAccessPoints ?? false,
		defaultSigningName: "s3",
		clientContextParams: options.clientContextParams ?? {}
	});
};
const commonParams = {
	ForcePathStyle: {
		type: "clientContextParams",
		name: "forcePathStyle"
	},
	UseArnRegion: {
		type: "clientContextParams",
		name: "useArnRegion"
	},
	DisableMultiRegionAccessPoints: {
		type: "clientContextParams",
		name: "disableMultiregionAccessPoints"
	},
	Accelerate: {
		type: "clientContextParams",
		name: "useAccelerateEndpoint"
	},
	DisableS3ExpressSessionAuth: {
		type: "clientContextParams",
		name: "disableS3ExpressSessionAuth"
	},
	UseGlobalEndpoint: {
		type: "builtInParams",
		name: "useGlobalEndpoint"
	},
	UseFIPS: {
		type: "builtInParams",
		name: "useFipsEndpoint"
	},
	Endpoint: {
		type: "builtInParams",
		name: "endpoint"
	},
	Region: {
		type: "builtInParams",
		name: "region"
	},
	UseDualStack: {
		type: "builtInParams",
		name: "useDualstackEndpoint"
	}
};
init_dist_es$23();
var S3ServiceException = class S3ServiceException extends ServiceException {
	constructor(options) {
		super(options);
		Object.setPrototypeOf(this, S3ServiceException.prototype);
	}
};
var NoSuchUpload = class NoSuchUpload extends S3ServiceException {
	name = "NoSuchUpload";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NoSuchUpload",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NoSuchUpload.prototype);
	}
};
var AccessDenied = class AccessDenied extends S3ServiceException {
	name = "AccessDenied";
	$fault = "client";
	constructor(opts) {
		super({
			name: "AccessDenied",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, AccessDenied.prototype);
	}
};
var ObjectNotInActiveTierError = class ObjectNotInActiveTierError extends S3ServiceException {
	name = "ObjectNotInActiveTierError";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ObjectNotInActiveTierError",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ObjectNotInActiveTierError.prototype);
	}
};
var BucketAlreadyExists = class BucketAlreadyExists extends S3ServiceException {
	name = "BucketAlreadyExists";
	$fault = "client";
	constructor(opts) {
		super({
			name: "BucketAlreadyExists",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, BucketAlreadyExists.prototype);
	}
};
var BucketAlreadyOwnedByYou = class BucketAlreadyOwnedByYou extends S3ServiceException {
	name = "BucketAlreadyOwnedByYou";
	$fault = "client";
	constructor(opts) {
		super({
			name: "BucketAlreadyOwnedByYou",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, BucketAlreadyOwnedByYou.prototype);
	}
};
var NoSuchBucket = class NoSuchBucket extends S3ServiceException {
	name = "NoSuchBucket";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NoSuchBucket",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NoSuchBucket.prototype);
	}
};
var InvalidObjectState = class InvalidObjectState extends S3ServiceException {
	name = "InvalidObjectState";
	$fault = "client";
	StorageClass;
	AccessTier;
	constructor(opts) {
		super({
			name: "InvalidObjectState",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidObjectState.prototype);
		this.StorageClass = opts.StorageClass;
		this.AccessTier = opts.AccessTier;
	}
};
var NoSuchKey = class NoSuchKey extends S3ServiceException {
	name = "NoSuchKey";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NoSuchKey",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NoSuchKey.prototype);
	}
};
var NotFound = class NotFound extends S3ServiceException {
	name = "NotFound";
	$fault = "client";
	constructor(opts) {
		super({
			name: "NotFound",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, NotFound.prototype);
	}
};
var EncryptionTypeMismatch = class EncryptionTypeMismatch extends S3ServiceException {
	name = "EncryptionTypeMismatch";
	$fault = "client";
	constructor(opts) {
		super({
			name: "EncryptionTypeMismatch",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, EncryptionTypeMismatch.prototype);
	}
};
var InvalidRequest = class InvalidRequest extends S3ServiceException {
	name = "InvalidRequest";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidRequest",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidRequest.prototype);
	}
};
var InvalidWriteOffset = class InvalidWriteOffset extends S3ServiceException {
	name = "InvalidWriteOffset";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidWriteOffset",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidWriteOffset.prototype);
	}
};
var TooManyParts = class TooManyParts extends S3ServiceException {
	name = "TooManyParts";
	$fault = "client";
	constructor(opts) {
		super({
			name: "TooManyParts",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TooManyParts.prototype);
	}
};
var IdempotencyParameterMismatch = class IdempotencyParameterMismatch extends S3ServiceException {
	name = "IdempotencyParameterMismatch";
	$fault = "client";
	constructor(opts) {
		super({
			name: "IdempotencyParameterMismatch",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, IdempotencyParameterMismatch.prototype);
	}
};
var ObjectAlreadyInActiveTierError = class ObjectAlreadyInActiveTierError extends S3ServiceException {
	name = "ObjectAlreadyInActiveTierError";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ObjectAlreadyInActiveTierError",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ObjectAlreadyInActiveTierError.prototype);
	}
};
var import_schema = require_schema();
var _ACL_ = "ACL";
var _AD = "AccessDenied";
var _AKI = "AccessKeyId";
var _AR = "AcceptRanges";
var _AT = "AccessTier";
var _B = "Bucket";
var _BAE = "BucketAlreadyExists";
var _BAOBY = "BucketAlreadyOwnedByYou";
var _BGR = "BypassGovernanceRetention";
var _BKE = "BucketKeyEnabled";
var _Bo = "Body";
var _CA = "ChecksumAlgorithm";
var _CC = "CacheControl";
var _CCRC = "ChecksumCRC32";
var _CCRCC = "ChecksumCRC32C";
var _CCRCNVME = "ChecksumCRC64NVME";
var _CC_ = "Cache-Control";
var _CD_ = "Content-Disposition";
var _CDo = "ContentDisposition";
var _CE_ = "Content-Encoding";
var _CEo = "ContentEncoding";
var _CL = "ContentLanguage";
var _CL_ = "Content-Language";
var _CL__ = "Content-Length";
var _CLo = "ContentLength";
var _CM = "Content-MD5";
var _CMD = "ContentMD5";
var _CMh = "ChecksumMode";
var _CP = "CommonPrefix";
var _CPL = "CommonPrefixList";
var _CPom = "CommonPrefixes";
var _CR = "ContentRange";
var _CR_ = "Content-Range";
var _CSHA = "ChecksumSHA1";
var _CSHAh = "ChecksumSHA256";
var _CSO = "CreateSessionOutput";
var _CSR = "CreateSessionResult";
var _CSRr = "CreateSessionRequest";
var _CSr = "CreateSession";
var _CT = "ChecksumType";
var _CT_ = "Content-Type";
var _CTo = "ContentType";
var _CTon = "ContinuationToken";
var _Con = "Contents";
var _Cr = "Credentials";
var _DM = "DeleteMarker";
var _DN = "DisplayName";
var _DOO = "DeleteObjectOutput";
var _DOR = "DeleteObjectRequest";
var _DOel = "DeleteObject";
var _Deli = "Delimiter";
var _E = "Expiration";
var _EBO = "ExpectedBucketOwner";
var _ES = "ExpiresString";
var _ETM = "EncryptionTypeMismatch";
var _ETa = "ETag";
var _ETn = "EncodingType";
var _Ex = "Expires";
var _FO = "FetchOwner";
var _GFC = "GrantFullControl";
var _GO = "GetObject";
var _GOO = "GetObjectOutput";
var _GOR = "GetObjectRequest";
var _GR = "GrantRead";
var _GRACP = "GrantReadACP";
var _GWACP = "GrantWriteACP";
var _ID = "ID";
var _IM = "IfMatch";
var _IMLMT = "IfMatchLastModifiedTime";
var _IMS = "IfMatchSize";
var _IMS_ = "If-Modified-Since";
var _IMSf = "IfModifiedSince";
var _IM_ = "If-Match";
var _INM = "IfNoneMatch";
var _INM_ = "If-None-Match";
var _IOS = "InvalidObjectState";
var _IPM = "IdempotencyParameterMismatch";
var _IR = "InvalidRequest";
var _IRIP = "IsRestoreInProgress";
var _IT = "IsTruncated";
var _IUS = "IfUnmodifiedSince";
var _IUS_ = "If-Unmodified-Since";
var _IWO = "InvalidWriteOffset";
var _K = "Key";
var _KC = "KeyCount";
var _LBRi = "ListBucketResult";
var _LM = "LastModified";
var _LM_ = "Last-Modified";
var _LOV = "ListObjectsV2";
var _LOVO = "ListObjectsV2Output";
var _LOVR = "ListObjectsV2Request";
var _M = "Metadata";
var _MFA = "MFA";
var _MK = "MaxKeys";
var _MM = "MissingMeta";
var _N = "Name";
var _NCT = "NextContinuationToken";
var _NF = "NotFound";
var _NSB = "NoSuchBucket";
var _NSK = "NoSuchKey";
var _NSU = "NoSuchUpload";
var _O = "Owner";
var _OAIATE = "ObjectAlreadyInActiveTierError";
var _OLLHS = "ObjectLockLegalHoldStatus";
var _OLM = "ObjectLockMode";
var _OLRUD = "ObjectLockRetainUntilDate";
var _OLb = "ObjectList";
var _ONIATE = "ObjectNotInActiveTierError";
var _OOA = "OptionalObjectAttributes";
var _Obj = "Object";
var _P = "Prefix";
var _PC = "PartsCount";
var _PN = "PartNumber";
var _PO = "PutObject";
var _POO = "PutObjectOutput";
var _POR = "PutObjectRequest";
var _RC = "RequestCharged";
var _RCC = "ResponseCacheControl";
var _RCD = "ResponseContentDisposition";
var _RCE = "ResponseContentEncoding";
var _RCL = "ResponseContentLanguage";
var _RCT = "ResponseContentType";
var _RE = "ResponseExpires";
var _RED = "RestoreExpiryDate";
var _RP = "RequestPayer";
var _RS = "ReplicationStatus";
var _RSe = "RestoreStatus";
var _Ra = "Range";
var _Re = "Restore";
var _SA = "StartAfter";
var _SAK = "SecretAccessKey";
var _SB = "StreamingBlob";
var _SC = "StorageClass";
var _SCV = "SessionCredentialValue";
var _SCe = "SessionCredentials";
var _SM = "SessionMode";
var _SSE = "ServerSideEncryption";
var _SSECA = "SSECustomerAlgorithm";
var _SSECK = "SSECustomerKey";
var _SSECKMD = "SSECustomerKeyMD5";
var _SSEKMSEC = "SSEKMSEncryptionContext";
var _SSEKMSKI = "SSEKMSKeyId";
var _ST = "SessionToken";
var _Si = "Size";
var _TC = "TagCount";
var _TMP = "TooManyParts";
var _Tag = "Tagging";
var _VI = "VersionId";
var _WOB = "WriteOffsetBytes";
var _WRL = "WebsiteRedirectLocation";
var _ar = "accept-ranges";
var _c = "client";
var _ct = "continuation-token";
var _d = "delimiter";
var _e = "error";
var _et = "encoding-type";
var _fo = "fetch-owner";
var _h = "http";
var _hC = "httpChecksum";
var _hE = "httpError";
var _hH = "httpHeader";
var _hPH = "httpPrefixHeaders";
var _hQ = "httpQuery";
var _mk = "max-keys";
var _p = "prefix";
var _pN = "partNumber";
var _rcc = "response-cache-control";
var _rcd = "response-content-disposition";
var _rce = "response-content-encoding";
var _rcl = "response-content-language";
var _rct = "response-content-type";
var _re = "response-expires";
var _s = "smithy.ts.sdk.synthetic.com.amazonaws.s3";
var _sa = "start-after";
var _st = "streaming";
var _vI = "versionId";
var _xF = "xmlFlattened";
var _xN = "xmlName";
var _xaa = "x-amz-acl";
var _xabgr = "x-amz-bypass-governance-retention";
var _xacc = "x-amz-checksum-crc32";
var _xacc_ = "x-amz-checksum-crc32c";
var _xacc__ = "x-amz-checksum-crc64nvme";
var _xacm = "x-amz-checksum-mode";
var _xacs = "x-amz-checksum-sha1";
var _xacs_ = "x-amz-checksum-sha256";
var _xacsm = "x-amz-create-session-mode";
var _xact = "x-amz-checksum-type";
var _xadm = "x-amz-delete-marker";
var _xae = "x-amz-expiration";
var _xaebo = "x-amz-expected-bucket-owner";
var _xagfc = "x-amz-grant-full-control";
var _xagr = "x-amz-grant-read";
var _xagra = "x-amz-grant-read-acp";
var _xagwa = "x-amz-grant-write-acp";
var _xaimlmt = "x-amz-if-match-last-modified-time";
var _xaims = "x-amz-if-match-size";
var _xam = "x-amz-meta-";
var _xam_ = "x-amz-mfa";
var _xamm = "x-amz-missing-meta";
var _xampc = "x-amz-mp-parts-count";
var _xaollh = "x-amz-object-lock-legal-hold";
var _xaolm = "x-amz-object-lock-mode";
var _xaolrud = "x-amz-object-lock-retain-until-date";
var _xaooa = "x-amz-optional-object-attributes";
var _xaos = "x-amz-object-size";
var _xar = "x-amz-restore";
var _xarc = "x-amz-request-charged";
var _xarp = "x-amz-request-payer";
var _xars = "x-amz-replication-status";
var _xasc = "x-amz-storage-class";
var _xasca = "x-amz-sdk-checksum-algorithm";
var _xasse = "x-amz-server-side-encryption";
var _xasseakki = "x-amz-server-side-encryption-aws-kms-key-id";
var _xassebke = "x-amz-server-side-encryption-bucket-key-enabled";
var _xassec = "x-amz-server-side-encryption-context";
var _xasseca = "x-amz-server-side-encryption-customer-algorithm";
var _xasseck = "x-amz-server-side-encryption-customer-key";
var _xasseckM = "x-amz-server-side-encryption-customer-key-MD5";
var _xat = "x-amz-tagging";
var _xatc = "x-amz-tagging-count";
var _xavi = "x-amz-version-id";
var _xawob = "x-amz-write-offset-bytes";
var _xawrl = "x-amz-website-redirect-location";
var n0 = "com.amazonaws.s3";
var _s_registry = import_schema.TypeRegistry.for(_s);
var S3ServiceException$ = [
	-3,
	_s,
	"S3ServiceException",
	0,
	[],
	[]
];
_s_registry.registerError(S3ServiceException$, S3ServiceException);
var n0_registry = import_schema.TypeRegistry.for(n0);
var AccessDenied$ = [
	-3,
	n0,
	_AD,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[],
	[]
];
n0_registry.registerError(AccessDenied$, AccessDenied);
var BucketAlreadyExists$ = [
	-3,
	n0,
	_BAE,
	{
		[_e]: _c,
		[_hE]: 409
	},
	[],
	[]
];
n0_registry.registerError(BucketAlreadyExists$, BucketAlreadyExists);
var BucketAlreadyOwnedByYou$ = [
	-3,
	n0,
	_BAOBY,
	{
		[_e]: _c,
		[_hE]: 409
	},
	[],
	[]
];
n0_registry.registerError(BucketAlreadyOwnedByYou$, BucketAlreadyOwnedByYou);
var EncryptionTypeMismatch$ = [
	-3,
	n0,
	_ETM,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(EncryptionTypeMismatch$, EncryptionTypeMismatch);
var IdempotencyParameterMismatch$ = [
	-3,
	n0,
	_IPM,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(IdempotencyParameterMismatch$, IdempotencyParameterMismatch);
var InvalidObjectState$ = [
	-3,
	n0,
	_IOS,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[_SC, _AT],
	[0, 0]
];
n0_registry.registerError(InvalidObjectState$, InvalidObjectState);
var InvalidRequest$ = [
	-3,
	n0,
	_IR,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(InvalidRequest$, InvalidRequest);
var InvalidWriteOffset$ = [
	-3,
	n0,
	_IWO,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(InvalidWriteOffset$, InvalidWriteOffset);
var NoSuchBucket$ = [
	-3,
	n0,
	_NSB,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[],
	[]
];
n0_registry.registerError(NoSuchBucket$, NoSuchBucket);
var NoSuchKey$ = [
	-3,
	n0,
	_NSK,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[],
	[]
];
n0_registry.registerError(NoSuchKey$, NoSuchKey);
var NoSuchUpload$ = [
	-3,
	n0,
	_NSU,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[],
	[]
];
n0_registry.registerError(NoSuchUpload$, NoSuchUpload);
var NotFound$ = [
	-3,
	n0,
	_NF,
	{ [_e]: _c },
	[],
	[]
];
n0_registry.registerError(NotFound$, NotFound);
var ObjectAlreadyInActiveTierError$ = [
	-3,
	n0,
	_OAIATE,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[],
	[]
];
n0_registry.registerError(ObjectAlreadyInActiveTierError$, ObjectAlreadyInActiveTierError);
var ObjectNotInActiveTierError$ = [
	-3,
	n0,
	_ONIATE,
	{
		[_e]: _c,
		[_hE]: 403
	},
	[],
	[]
];
n0_registry.registerError(ObjectNotInActiveTierError$, ObjectNotInActiveTierError);
var TooManyParts$ = [
	-3,
	n0,
	_TMP,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[],
	[]
];
n0_registry.registerError(TooManyParts$, TooManyParts);
const errorTypeRegistries = [_s_registry, n0_registry];
var SessionCredentialValue = [
	0,
	n0,
	_SCV,
	8,
	0
];
var SSECustomerKey = [
	0,
	n0,
	_SSECK,
	8,
	0
];
var SSEKMSEncryptionContext = [
	0,
	n0,
	_SSEKMSEC,
	8,
	0
];
var SSEKMSKeyId = [
	0,
	n0,
	_SSEKMSKI,
	8,
	0
];
var StreamingBlob = [
	0,
	n0,
	_SB,
	{ [_st]: 1 },
	42
];
var CommonPrefix$ = [
	3,
	n0,
	_CP,
	0,
	[_P],
	[0]
];
var CreateSessionOutput$ = [
	3,
	n0,
	_CSO,
	{ [_xN]: _CSR },
	[
		_Cr,
		_SSE,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE
	],
	[
		[() => SessionCredentials$, { [_xN]: _Cr }],
		[0, { [_hH]: _xasse }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }]
	],
	1
];
var CreateSessionRequest$ = [
	3,
	n0,
	_CSRr,
	0,
	[
		_B,
		_SM,
		_SSE,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE
	],
	[
		[0, 1],
		[0, { [_hH]: _xacsm }],
		[0, { [_hH]: _xasse }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }]
	],
	1
];
var DeleteObjectOutput$ = [
	3,
	n0,
	_DOO,
	0,
	[
		_DM,
		_VI,
		_RC
	],
	[
		[2, { [_hH]: _xadm }],
		[0, { [_hH]: _xavi }],
		[0, { [_hH]: _xarc }]
	]
];
var DeleteObjectRequest$ = [
	3,
	n0,
	_DOR,
	0,
	[
		_B,
		_K,
		_MFA,
		_VI,
		_RP,
		_BGR,
		_EBO,
		_IM,
		_IMLMT,
		_IMS
	],
	[
		[0, 1],
		[0, 1],
		[0, { [_hH]: _xam_ }],
		[0, { [_hQ]: _vI }],
		[0, { [_hH]: _xarp }],
		[2, { [_hH]: _xabgr }],
		[0, { [_hH]: _xaebo }],
		[0, { [_hH]: _IM_ }],
		[6, { [_hH]: _xaimlmt }],
		[1, { [_hH]: _xaims }]
	],
	2
];
var GetObjectOutput$ = [
	3,
	n0,
	_GOO,
	0,
	[
		_Bo,
		_DM,
		_AR,
		_E,
		_Re,
		_LM,
		_CLo,
		_ETa,
		_CCRC,
		_CCRCC,
		_CCRCNVME,
		_CSHA,
		_CSHAh,
		_CT,
		_MM,
		_VI,
		_CC,
		_CDo,
		_CEo,
		_CL,
		_CR,
		_CTo,
		_Ex,
		_ES,
		_WRL,
		_SSE,
		_M,
		_SSECA,
		_SSECKMD,
		_SSEKMSKI,
		_BKE,
		_SC,
		_RC,
		_RS,
		_PC,
		_TC,
		_OLM,
		_OLRUD,
		_OLLHS
	],
	[
		[() => StreamingBlob, 16],
		[2, { [_hH]: _xadm }],
		[0, { [_hH]: _ar }],
		[0, { [_hH]: _xae }],
		[0, { [_hH]: _xar }],
		[4, { [_hH]: _LM_ }],
		[1, { [_hH]: _CL__ }],
		[0, { [_hH]: _ETa }],
		[0, { [_hH]: _xacc }],
		[0, { [_hH]: _xacc_ }],
		[0, { [_hH]: _xacc__ }],
		[0, { [_hH]: _xacs }],
		[0, { [_hH]: _xacs_ }],
		[0, { [_hH]: _xact }],
		[1, { [_hH]: _xamm }],
		[0, { [_hH]: _xavi }],
		[0, { [_hH]: _CC_ }],
		[0, { [_hH]: _CD_ }],
		[0, { [_hH]: _CE_ }],
		[0, { [_hH]: _CL_ }],
		[0, { [_hH]: _CR_ }],
		[0, { [_hH]: _CT_ }],
		[4, { [_hH]: _Ex }],
		[0, { [_hH]: _ES }],
		[0, { [_hH]: _xawrl }],
		[0, { [_hH]: _xasse }],
		[128, { [_hPH]: _xam }],
		[0, { [_hH]: _xasseca }],
		[0, { [_hH]: _xasseckM }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[2, { [_hH]: _xassebke }],
		[0, { [_hH]: _xasc }],
		[0, { [_hH]: _xarc }],
		[0, { [_hH]: _xars }],
		[1, { [_hH]: _xampc }],
		[1, { [_hH]: _xatc }],
		[0, { [_hH]: _xaolm }],
		[5, { [_hH]: _xaolrud }],
		[0, { [_hH]: _xaollh }]
	]
];
var GetObjectRequest$ = [
	3,
	n0,
	_GOR,
	0,
	[
		_B,
		_K,
		_IM,
		_IMSf,
		_INM,
		_IUS,
		_Ra,
		_RCC,
		_RCD,
		_RCE,
		_RCL,
		_RCT,
		_RE,
		_VI,
		_SSECA,
		_SSECK,
		_SSECKMD,
		_RP,
		_PN,
		_EBO,
		_CMh
	],
	[
		[0, 1],
		[0, 1],
		[0, { [_hH]: _IM_ }],
		[4, { [_hH]: _IMS_ }],
		[0, { [_hH]: _INM_ }],
		[4, { [_hH]: _IUS_ }],
		[0, { [_hH]: _Ra }],
		[0, { [_hQ]: _rcc }],
		[0, { [_hQ]: _rcd }],
		[0, { [_hQ]: _rce }],
		[0, { [_hQ]: _rcl }],
		[0, { [_hQ]: _rct }],
		[6, { [_hQ]: _re }],
		[0, { [_hQ]: _vI }],
		[0, { [_hH]: _xasseca }],
		[() => SSECustomerKey, { [_hH]: _xasseck }],
		[0, { [_hH]: _xasseckM }],
		[0, { [_hH]: _xarp }],
		[1, { [_hQ]: _pN }],
		[0, { [_hH]: _xaebo }],
		[0, { [_hH]: _xacm }]
	],
	2
];
var ListObjectsV2Output$ = [
	3,
	n0,
	_LOVO,
	{ [_xN]: _LBRi },
	[
		_IT,
		_Con,
		_N,
		_P,
		_Deli,
		_MK,
		_CPom,
		_ETn,
		_KC,
		_CTon,
		_NCT,
		_SA,
		_RC
	],
	[
		2,
		[() => ObjectList, { [_xF]: 1 }],
		0,
		0,
		0,
		1,
		[() => CommonPrefixList, { [_xF]: 1 }],
		0,
		1,
		0,
		0,
		0,
		[0, { [_hH]: _xarc }]
	]
];
var ListObjectsV2Request$ = [
	3,
	n0,
	_LOVR,
	0,
	[
		_B,
		_Deli,
		_ETn,
		_MK,
		_P,
		_CTon,
		_FO,
		_SA,
		_RP,
		_EBO,
		_OOA
	],
	[
		[0, 1],
		[0, { [_hQ]: _d }],
		[0, { [_hQ]: _et }],
		[1, { [_hQ]: _mk }],
		[0, { [_hQ]: _p }],
		[0, { [_hQ]: _ct }],
		[2, { [_hQ]: _fo }],
		[0, { [_hQ]: _sa }],
		[0, { [_hH]: _xarp }],
		[0, { [_hH]: _xaebo }],
		[64, { [_hH]: _xaooa }]
	],
	1
];
var _Object$ = [
	3,
	n0,
	_Obj,
	0,
	[
		_K,
		_LM,
		_ETa,
		_CA,
		_CT,
		_Si,
		_SC,
		_O,
		_RSe
	],
	[
		0,
		4,
		0,
		[64, { [_xF]: 1 }],
		0,
		1,
		0,
		() => Owner$,
		() => RestoreStatus$
	]
];
var Owner$ = [
	3,
	n0,
	_O,
	0,
	[_DN, _ID],
	[0, 0]
];
var PutObjectOutput$ = [
	3,
	n0,
	_POO,
	0,
	[
		_E,
		_ETa,
		_CCRC,
		_CCRCC,
		_CCRCNVME,
		_CSHA,
		_CSHAh,
		_CT,
		_SSE,
		_VI,
		_SSECA,
		_SSECKMD,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE,
		_Si,
		_RC
	],
	[
		[0, { [_hH]: _xae }],
		[0, { [_hH]: _ETa }],
		[0, { [_hH]: _xacc }],
		[0, { [_hH]: _xacc_ }],
		[0, { [_hH]: _xacc__ }],
		[0, { [_hH]: _xacs }],
		[0, { [_hH]: _xacs_ }],
		[0, { [_hH]: _xact }],
		[0, { [_hH]: _xasse }],
		[0, { [_hH]: _xavi }],
		[0, { [_hH]: _xasseca }],
		[0, { [_hH]: _xasseckM }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }],
		[1, { [_hH]: _xaos }],
		[0, { [_hH]: _xarc }]
	]
];
var PutObjectRequest$ = [
	3,
	n0,
	_POR,
	0,
	[
		_B,
		_K,
		_ACL_,
		_Bo,
		_CC,
		_CDo,
		_CEo,
		_CL,
		_CLo,
		_CMD,
		_CTo,
		_CA,
		_CCRC,
		_CCRCC,
		_CCRCNVME,
		_CSHA,
		_CSHAh,
		_Ex,
		_IM,
		_INM,
		_GFC,
		_GR,
		_GRACP,
		_GWACP,
		_WOB,
		_M,
		_SSE,
		_SC,
		_WRL,
		_SSECA,
		_SSECK,
		_SSECKMD,
		_SSEKMSKI,
		_SSEKMSEC,
		_BKE,
		_RP,
		_Tag,
		_OLM,
		_OLRUD,
		_OLLHS,
		_EBO
	],
	[
		[0, 1],
		[0, 1],
		[0, { [_hH]: _xaa }],
		[() => StreamingBlob, 16],
		[0, { [_hH]: _CC_ }],
		[0, { [_hH]: _CD_ }],
		[0, { [_hH]: _CE_ }],
		[0, { [_hH]: _CL_ }],
		[1, { [_hH]: _CL__ }],
		[0, { [_hH]: _CM }],
		[0, { [_hH]: _CT_ }],
		[0, { [_hH]: _xasca }],
		[0, { [_hH]: _xacc }],
		[0, { [_hH]: _xacc_ }],
		[0, { [_hH]: _xacc__ }],
		[0, { [_hH]: _xacs }],
		[0, { [_hH]: _xacs_ }],
		[4, { [_hH]: _Ex }],
		[0, { [_hH]: _IM_ }],
		[0, { [_hH]: _INM_ }],
		[0, { [_hH]: _xagfc }],
		[0, { [_hH]: _xagr }],
		[0, { [_hH]: _xagra }],
		[0, { [_hH]: _xagwa }],
		[1, { [_hH]: _xawob }],
		[128, { [_hPH]: _xam }],
		[0, { [_hH]: _xasse }],
		[0, { [_hH]: _xasc }],
		[0, { [_hH]: _xawrl }],
		[0, { [_hH]: _xasseca }],
		[() => SSECustomerKey, { [_hH]: _xasseck }],
		[0, { [_hH]: _xasseckM }],
		[() => SSEKMSKeyId, { [_hH]: _xasseakki }],
		[() => SSEKMSEncryptionContext, { [_hH]: _xassec }],
		[2, { [_hH]: _xassebke }],
		[0, { [_hH]: _xarp }],
		[0, { [_hH]: _xat }],
		[0, { [_hH]: _xaolm }],
		[5, { [_hH]: _xaolrud }],
		[0, { [_hH]: _xaollh }],
		[0, { [_hH]: _xaebo }]
	],
	2
];
var RestoreStatus$ = [
	3,
	n0,
	_RSe,
	0,
	[_IRIP, _RED],
	[2, 4]
];
var SessionCredentials$ = [
	3,
	n0,
	_SCe,
	0,
	[
		_AKI,
		_SAK,
		_ST,
		_E
	],
	[
		[0, { [_xN]: _AKI }],
		[() => SessionCredentialValue, { [_xN]: _SAK }],
		[() => SessionCredentialValue, { [_xN]: _ST }],
		[4, { [_xN]: _E }]
	],
	4
];
var CommonPrefixList = [
	1,
	n0,
	_CPL,
	0,
	() => CommonPrefix$
];
var ObjectList = [
	1,
	n0,
	_OLb,
	0,
	[() => _Object$, 0]
];
var CreateSession$ = [
	9,
	n0,
	_CSr,
	{ [_h]: [
		"GET",
		"/?session",
		200
	] },
	() => CreateSessionRequest$,
	() => CreateSessionOutput$
];
var DeleteObject$ = [
	9,
	n0,
	_DOel,
	{ [_h]: [
		"DELETE",
		"/{Key+}?x-id=DeleteObject",
		204
	] },
	() => DeleteObjectRequest$,
	() => DeleteObjectOutput$
];
var GetObject$ = [
	9,
	n0,
	_GO,
	{
		[_hC]: "-",
		[_h]: [
			"GET",
			"/{Key+}?x-id=GetObject",
			200
		]
	},
	() => GetObjectRequest$,
	() => GetObjectOutput$
];
var ListObjectsV2$ = [
	9,
	n0,
	_LOV,
	{ [_h]: [
		"GET",
		"/?list-type=2",
		200
	] },
	() => ListObjectsV2Request$,
	() => ListObjectsV2Output$
];
var PutObject$ = [
	9,
	n0,
	_PO,
	{
		[_hC]: "-",
		[_h]: [
			"PUT",
			"/{Key+}?x-id=PutObject",
			200
		]
	},
	() => PutObjectRequest$,
	() => PutObjectOutput$
];
init_dist_es$8();
init_dist_es$23();
var CreateSessionCommand = class extends Command.classBuilder().ep({
	...commonParams,
	DisableS3ExpressSessionAuth: {
		type: "staticContextParams",
		value: true
	},
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	}
}).m(function(Command, cs, config, o) {
	return [getEndpointPlugin(config, Command.getEndpointParameterInstructions()), getThrow200ExceptionsPlugin(config)];
}).s("AmazonS3", "CreateSession", {}).n("S3Client", "CreateSessionCommand").sc(CreateSession$).build() {};
const name = "@aws-sdk/client-s3";
const description = "AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native";
const version = "3.990.0";
const scripts = {
	"build": "concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs",
	"build:cjs": "node ../../scripts/compilation/inline client-s3",
	"build:es": "tsc -p tsconfig.es.json",
	"build:include:deps": "yarn g:turbo run build -F=\"$npm_package_name\"",
	"build:types": "tsc -p tsconfig.types.json",
	"build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
	"clean": "premove dist-cjs dist-es dist-types tsconfig.cjs.tsbuildinfo tsconfig.es.tsbuildinfo tsconfig.types.tsbuildinfo",
	"extract:docs": "api-extractor run --local",
	"generate:client": "node ../../scripts/generate-clients/single-service --solo s3",
	"test": "yarn g:vitest run",
	"test:browser": "node ./test/browser-build/esbuild && yarn g:vitest run -c vitest.config.browser.mts",
	"test:browser:watch": "node ./test/browser-build/esbuild && yarn g:vitest watch -c vitest.config.browser.mts",
	"test:e2e": "yarn g:vitest run -c vitest.config.e2e.mts && yarn test:browser",
	"test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.mts",
	"test:index": "tsc --noEmit ./test/index-types.ts && node ./test/index-objects.spec.mjs",
	"test:integration": "yarn g:vitest run -c vitest.config.integ.mts",
	"test:integration:watch": "yarn g:vitest watch -c vitest.config.integ.mts",
	"test:watch": "yarn g:vitest watch"
};
const main = "./dist-cjs/index.js";
const types = "./dist-types/index.d.ts";
const module = "./dist-es/index.js";
const dependencies = {
	"@aws-crypto/sha1-browser": "5.2.0",
	"@aws-crypto/sha256-browser": "5.2.0",
	"@aws-crypto/sha256-js": "5.2.0",
	"@aws-sdk/core": "^3.973.10",
	"@aws-sdk/credential-provider-node": "^3.972.9",
	"@aws-sdk/middleware-bucket-endpoint": "^3.972.3",
	"@aws-sdk/middleware-expect-continue": "^3.972.3",
	"@aws-sdk/middleware-flexible-checksums": "^3.972.8",
	"@aws-sdk/middleware-host-header": "^3.972.3",
	"@aws-sdk/middleware-location-constraint": "^3.972.3",
	"@aws-sdk/middleware-logger": "^3.972.3",
	"@aws-sdk/middleware-recursion-detection": "^3.972.3",
	"@aws-sdk/middleware-sdk-s3": "^3.972.10",
	"@aws-sdk/middleware-ssec": "^3.972.3",
	"@aws-sdk/middleware-user-agent": "^3.972.10",
	"@aws-sdk/region-config-resolver": "^3.972.3",
	"@aws-sdk/signature-v4-multi-region": "3.990.0",
	"@aws-sdk/types": "^3.973.1",
	"@aws-sdk/util-endpoints": "3.990.0",
	"@aws-sdk/util-user-agent-browser": "^3.972.3",
	"@aws-sdk/util-user-agent-node": "^3.972.8",
	"@smithy/config-resolver": "^4.4.6",
	"@smithy/core": "^3.23.0",
	"@smithy/eventstream-serde-browser": "^4.2.8",
	"@smithy/eventstream-serde-config-resolver": "^4.3.8",
	"@smithy/eventstream-serde-node": "^4.2.8",
	"@smithy/fetch-http-handler": "^5.3.9",
	"@smithy/hash-blob-browser": "^4.2.9",
	"@smithy/hash-node": "^4.2.8",
	"@smithy/hash-stream-node": "^4.2.8",
	"@smithy/invalid-dependency": "^4.2.8",
	"@smithy/md5-js": "^4.2.8",
	"@smithy/middleware-content-length": "^4.2.8",
	"@smithy/middleware-endpoint": "^4.4.14",
	"@smithy/middleware-retry": "^4.4.31",
	"@smithy/middleware-serde": "^4.2.9",
	"@smithy/middleware-stack": "^4.2.8",
	"@smithy/node-config-provider": "^4.3.8",
	"@smithy/node-http-handler": "^4.4.10",
	"@smithy/protocol-http": "^5.3.8",
	"@smithy/smithy-client": "^4.11.3",
	"@smithy/types": "^4.12.0",
	"@smithy/url-parser": "^4.2.8",
	"@smithy/util-base64": "^4.3.0",
	"@smithy/util-body-length-browser": "^4.2.0",
	"@smithy/util-body-length-node": "^4.2.1",
	"@smithy/util-defaults-mode-browser": "^4.3.30",
	"@smithy/util-defaults-mode-node": "^4.2.33",
	"@smithy/util-endpoints": "^3.2.8",
	"@smithy/util-middleware": "^4.2.8",
	"@smithy/util-retry": "^4.2.8",
	"@smithy/util-stream": "^4.5.12",
	"@smithy/util-utf8": "^4.2.0",
	"@smithy/util-waiter": "^4.2.8",
	"tslib": "^2.6.2"
};
const devDependencies = {
	"@aws-sdk/signature-v4-crt": "3.990.0",
	"@tsconfig/node20": "20.1.8",
	"@types/node": "^20.14.8",
	"concurrently": "7.0.0",
	"downlevel-dts": "0.10.1",
	"premove": "4.0.0",
	"typescript": "~5.8.3"
};
const engines = { "node": ">=20.0.0" };
const typesVersions = { "<4.0": { "dist-types/*": ["dist-types/ts3.4/*"] } };
const files = ["dist-*/**"];
const author = {
	"name": "AWS SDK for JavaScript Team",
	"url": "https://aws.amazon.com/javascript/"
};
const license = "Apache-2.0";
const browser = { "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser" };
const homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3";
const repository = {
	"type": "git",
	"url": "https://github.com/aws/aws-sdk-js-v3.git",
	"directory": "clients/client-s3"
};
var package_default = {
	name,
	description,
	version,
	scripts,
	main,
	types,
	module,
	sideEffects: false,
	dependencies,
	devDependencies,
	engines,
	typesVersions,
	files,
	author,
	license,
	browser,
	"react-native": { "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native" },
	homepage,
	repository
};
var import_client = require_client();
init_dist_es$27();
const ENV_KEY = "AWS_ACCESS_KEY_ID";
const ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
const ENV_SESSION = "AWS_SESSION_TOKEN";
const ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
const ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
const ENV_ACCOUNT_ID = "AWS_ACCOUNT_ID";
const fromEnv = (init) => async () => {
	init?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
	const accessKeyId = process.env[ENV_KEY];
	const secretAccessKey = process.env[ENV_SECRET];
	const sessionToken = process.env[ENV_SESSION];
	const expiry = process.env[ENV_EXPIRATION];
	const credentialScope = process.env[ENV_CREDENTIAL_SCOPE];
	const accountId = process.env[ENV_ACCOUNT_ID];
	if (accessKeyId && secretAccessKey) {
		const credentials = {
			accessKeyId,
			secretAccessKey,
			...sessionToken && { sessionToken },
			...expiry && { expiration: new Date(expiry) },
			...credentialScope && { credentialScope },
			...accountId && { accountId }
		};
		(0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_ENV_VARS", "g");
		return credentials;
	}
	throw new CredentialsProviderError("Unable to find environment variable credentials.", { logger: init?.logger });
};
init_dist_es$27();
const remoteProvider = async (init) => {
	const { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI, fromContainerMetadata, fromInstanceMetadata } = await import("../_17.mjs");
	if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
		init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
		const { fromHttp } = await import("../_7.mjs");
		return chain(fromHttp(init), fromContainerMetadata(init));
	}
	if (process.env["AWS_EC2_METADATA_DISABLED"] && process.env["AWS_EC2_METADATA_DISABLED"] !== "false") return async () => {
		throw new CredentialsProviderError("EC2 Instance Metadata Service access disabled", { logger: init.logger });
	};
	init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata");
	return fromInstanceMetadata(init);
};
function memoizeChain(providers, treatAsExpired) {
	const chain = internalCreateChain(providers);
	let activeLock;
	let passiveLock;
	let credentials;
	const provider = async (options) => {
		if (options?.forceRefresh) return await chain(options);
		if (credentials?.expiration) {
			if (credentials?.expiration?.getTime() < Date.now()) credentials = void 0;
		}
		if (activeLock) await activeLock;
		else if (!credentials || treatAsExpired?.(credentials)) if (credentials) {
			if (!passiveLock) passiveLock = chain(options).then((c) => {
				credentials = c;
			}).finally(() => {
				passiveLock = void 0;
			});
		} else {
			activeLock = chain(options).then((c) => {
				credentials = c;
			}).finally(() => {
				activeLock = void 0;
			});
			return provider(options);
		}
		return credentials;
	};
	return provider;
}
const internalCreateChain = (providers) => async (awsIdentityProperties) => {
	let lastProviderError;
	for (const provider of providers) try {
		return await provider(awsIdentityProperties);
	} catch (err) {
		lastProviderError = err;
		if (err?.tryNextLink) continue;
		throw err;
	}
	throw lastProviderError;
};
init_dist_es$27();
init_dist_es$10();
var multipleCredentialSourceWarningEmitted = false;
const defaultProvider = (init = {}) => memoizeChain([
	async () => {
		if (init.profile ?? process.env["AWS_PROFILE"]) {
			if (process.env["AWS_ACCESS_KEY_ID"] && process.env["AWS_SECRET_ACCESS_KEY"]) {
				if (!multipleCredentialSourceWarningEmitted) {
					(init.logger?.warn && init.logger?.constructor?.name !== "NoOpLogger" ? init.logger.warn.bind(init.logger) : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`);
					multipleCredentialSourceWarningEmitted = true;
				}
			}
			throw new CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
				logger: init.logger,
				tryNextLink: true
			});
		}
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv");
		return fromEnv(init)();
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
		const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
		if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) throw new CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", { logger: init.logger });
		const { fromSSO } = await import("../_10.mjs");
		return fromSSO(init)(awsIdentityProperties);
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
		const { fromIni } = await import("../_8.mjs");
		return fromIni(init)(awsIdentityProperties);
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
		const { fromProcess } = await import("../_9.mjs");
		return fromProcess(init)(awsIdentityProperties);
	},
	async (awsIdentityProperties) => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
		const { fromTokenFile } = await import("../_12.mjs");
		return fromTokenFile(init)(awsIdentityProperties);
	},
	async () => {
		init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider");
		return (await remoteProvider(init))();
	},
	async () => {
		throw new CredentialsProviderError("Could not load credentials from any providers", {
			tryNextLink: false,
			logger: init.logger
		});
	}
], credentialsTreatedAsExpired);
const credentialsTreatedAsExpired = (credentials) => credentials?.expiration !== void 0 && credentials.expiration.getTime() - Date.now() < 3e5;
init_dist_es$18();
const NODE_USE_ARN_REGION_ENV_NAME = "AWS_S3_USE_ARN_REGION";
const NODE_USE_ARN_REGION_INI_NAME = "s3_use_arn_region";
const NODE_USE_ARN_REGION_CONFIG_OPTIONS = {
	environmentVariableSelector: (env) => booleanSelector(env, NODE_USE_ARN_REGION_ENV_NAME, SelectorType.ENV),
	configFileSelector: (profile) => booleanSelector(profile, NODE_USE_ARN_REGION_INI_NAME, SelectorType.CONFIG),
	default: void 0
};
var crtAvailability;
var init_crt_availability = __esmMin((() => {
	crtAvailability = { isCrtAvailable: false };
}));
var isCrtAvailable;
var init_is_crt_available = __esmMin((() => {
	init_crt_availability();
	isCrtAvailable = () => {
		if (crtAvailability.isCrtAvailable) return ["md/crt-avail"];
		return null;
	};
}));
var createDefaultUserAgentProvider, defaultUserAgent;
var init_defaultUserAgent = __esmMin((() => {
	init_is_crt_available();
	init_crt_availability();
	createDefaultUserAgentProvider = ({ serviceId, clientVersion }) => {
		return async (config) => {
			const sections = [
				["aws-sdk-js", clientVersion],
				["ua", "2.1"],
				[`os/${platform()}`, release()],
				["lang/js"],
				["md/nodejs", `${versions.node}`]
			];
			const crtAvailable = isCrtAvailable();
			if (crtAvailable) sections.push(crtAvailable);
			if (serviceId) sections.push([`api/${serviceId}`, clientVersion]);
			if (env.AWS_EXECUTION_ENV) sections.push([`exec-env/${env.AWS_EXECUTION_ENV}`]);
			const appId = await config?.userAgentAppId?.();
			return appId ? [...sections, [`app/${appId}`]] : [...sections];
		};
	};
	defaultUserAgent = createDefaultUserAgentProvider;
}));
var UA_APP_ID_ENV_NAME, UA_APP_ID_INI_NAME, UA_APP_ID_INI_NAME_DEPRECATED, NODE_APP_ID_CONFIG_OPTIONS;
var init_nodeAppIdConfigOptions = __esmMin((() => {
	init_dist_es$13();
	UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
	UA_APP_ID_INI_NAME = "sdk_ua_app_id";
	UA_APP_ID_INI_NAME_DEPRECATED = "sdk-ua-app-id";
	NODE_APP_ID_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => env[UA_APP_ID_ENV_NAME],
		configFileSelector: (profile) => profile["sdk_ua_app_id"] ?? profile[UA_APP_ID_INI_NAME_DEPRECATED],
		default: void 0
	};
}));
var dist_es_exports$4 = /* @__PURE__ */ __exportAll({
	NODE_APP_ID_CONFIG_OPTIONS: () => NODE_APP_ID_CONFIG_OPTIONS,
	UA_APP_ID_ENV_NAME: () => UA_APP_ID_ENV_NAME,
	UA_APP_ID_INI_NAME: () => UA_APP_ID_INI_NAME,
	createDefaultUserAgentProvider: () => createDefaultUserAgentProvider,
	crtAvailability: () => crtAvailability,
	defaultUserAgent: () => defaultUserAgent
});
var init_dist_es$4 = __esmMin((() => {
	init_defaultUserAgent();
	init_nodeAppIdConfigOptions();
}));
init_dist_es$30();
var Int64 = class Int64 {
	bytes;
	constructor(bytes) {
		this.bytes = bytes;
		if (bytes.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes");
	}
	static fromNumber(number) {
		if (number > 0x8000000000000000 || number < -0x8000000000000000) throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
		const bytes = new Uint8Array(8);
		for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) bytes[i] = remaining;
		if (number < 0) negate(bytes);
		return new Int64(bytes);
	}
	valueOf() {
		const bytes = this.bytes.slice(0);
		const negative = bytes[0] & 128;
		if (negative) negate(bytes);
		return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
	}
	toString() {
		return String(this.valueOf());
	}
};
function negate(bytes) {
	for (let i = 0; i < 8; i++) bytes[i] ^= 255;
	for (let i = 7; i > -1; i--) {
		bytes[i]++;
		if (bytes[i] !== 0) break;
	}
}
init_dist_es$30();
var HeaderMarshaller = class {
	toUtf8;
	fromUtf8;
	constructor(toUtf8, fromUtf8) {
		this.toUtf8 = toUtf8;
		this.fromUtf8 = fromUtf8;
	}
	format(headers) {
		const chunks = [];
		for (const headerName of Object.keys(headers)) {
			const bytes = this.fromUtf8(headerName);
			chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
		}
		const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
		let position = 0;
		for (const chunk of chunks) {
			out.set(chunk, position);
			position += chunk.byteLength;
		}
		return out;
	}
	formatHeaderValue(header) {
		switch (header.type) {
			case "boolean": return Uint8Array.from([header.value ? 0 : 1]);
			case "byte": return Uint8Array.from([2, header.value]);
			case "short":
				const shortView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(3));
				shortView.setUint8(0, 3);
				shortView.setInt16(1, header.value, false);
				return new Uint8Array(shortView.buffer);
			case "integer":
				const intView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(5));
				intView.setUint8(0, 4);
				intView.setInt32(1, header.value, false);
				return new Uint8Array(intView.buffer);
			case "long":
				const longBytes = new Uint8Array(9);
				longBytes[0] = 5;
				longBytes.set(header.value.bytes, 1);
				return longBytes;
			case "binary":
				const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
				binView.setUint8(0, 6);
				binView.setUint16(1, header.value.byteLength, false);
				const binBytes = new Uint8Array(binView.buffer);
				binBytes.set(header.value, 3);
				return binBytes;
			case "string":
				const utf8Bytes = this.fromUtf8(header.value);
				const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
				strView.setUint8(0, 7);
				strView.setUint16(1, utf8Bytes.byteLength, false);
				const strBytes = new Uint8Array(strView.buffer);
				strBytes.set(utf8Bytes, 3);
				return strBytes;
			case "timestamp":
				const tsBytes = new Uint8Array(9);
				tsBytes[0] = 8;
				tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
				return tsBytes;
			case "uuid":
				if (!UUID_PATTERN.test(header.value)) throw new Error(`Invalid UUID received: ${header.value}`);
				const uuidBytes = new Uint8Array(17);
				uuidBytes[0] = 9;
				uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
				return uuidBytes;
		}
	}
	parse(headers) {
		const out = {};
		let position = 0;
		while (position < headers.byteLength) {
			const nameLength = headers.getUint8(position++);
			const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
			position += nameLength;
			switch (headers.getUint8(position++)) {
				case 0:
					out[name] = {
						type: BOOLEAN_TAG,
						value: true
					};
					break;
				case 1:
					out[name] = {
						type: BOOLEAN_TAG,
						value: false
					};
					break;
				case 2:
					out[name] = {
						type: BYTE_TAG,
						value: headers.getInt8(position++)
					};
					break;
				case 3:
					out[name] = {
						type: SHORT_TAG,
						value: headers.getInt16(position, false)
					};
					position += 2;
					break;
				case 4:
					out[name] = {
						type: INT_TAG,
						value: headers.getInt32(position, false)
					};
					position += 4;
					break;
				case 5:
					out[name] = {
						type: LONG_TAG,
						value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
					};
					position += 8;
					break;
				case 6:
					const binaryLength = headers.getUint16(position, false);
					position += 2;
					out[name] = {
						type: BINARY_TAG,
						value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
					};
					position += binaryLength;
					break;
				case 7:
					const stringLength = headers.getUint16(position, false);
					position += 2;
					out[name] = {
						type: STRING_TAG,
						value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
					};
					position += stringLength;
					break;
				case 8:
					out[name] = {
						type: TIMESTAMP_TAG,
						value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
					};
					position += 8;
					break;
				case 9:
					const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
					position += 16;
					out[name] = {
						type: UUID_TAG,
						value: `${toHex(uuidBytes.subarray(0, 4))}-${toHex(uuidBytes.subarray(4, 6))}-${toHex(uuidBytes.subarray(6, 8))}-${toHex(uuidBytes.subarray(8, 10))}-${toHex(uuidBytes.subarray(10))}`
					};
					break;
				default: throw new Error(`Unrecognized header type tag`);
			}
		}
		return out;
	}
};
var HEADER_VALUE_TYPE;
(function(HEADER_VALUE_TYPE) {
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
	HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
var BOOLEAN_TAG = "boolean";
var BYTE_TAG = "byte";
var SHORT_TAG = "short";
var INT_TAG = "integer";
var LONG_TAG = "long";
var BINARY_TAG = "binary";
var STRING_TAG = "string";
var TIMESTAMP_TAG = "timestamp";
var UUID_TAG = "uuid";
var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
var PRELUDE_MEMBER_LENGTH = 4;
var PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
var CHECKSUM_LENGTH = 4;
var MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
function splitMessage({ byteLength, byteOffset, buffer }) {
	if (byteLength < MINIMUM_MESSAGE_LENGTH) throw new Error("Provided message too short to accommodate event stream message overhead");
	const view = new DataView(buffer, byteOffset, byteLength);
	const messageLength = view.getUint32(0, false);
	if (byteLength !== messageLength) throw new Error("Reported message length does not match received message length");
	const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
	const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
	const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
	const checksummer = new Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
	if (expectedPreludeChecksum !== checksummer.digest()) throw new Error(`The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`);
	checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
	if (expectedMessageChecksum !== checksummer.digest()) throw new Error(`The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`);
	return {
		headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
		body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH))
	};
}
var EventStreamCodec = class {
	headerMarshaller;
	messageBuffer;
	isEndOfStream;
	constructor(toUtf8, fromUtf8) {
		this.headerMarshaller = new HeaderMarshaller(toUtf8, fromUtf8);
		this.messageBuffer = [];
		this.isEndOfStream = false;
	}
	feed(message) {
		this.messageBuffer.push(this.decode(message));
	}
	endOfStream() {
		this.isEndOfStream = true;
	}
	getMessage() {
		const message = this.messageBuffer.pop();
		const isEndOfStream = this.isEndOfStream;
		return {
			getMessage() {
				return message;
			},
			isEndOfStream() {
				return isEndOfStream;
			}
		};
	}
	getAvailableMessages() {
		const messages = this.messageBuffer;
		this.messageBuffer = [];
		const isEndOfStream = this.isEndOfStream;
		return {
			getMessages() {
				return messages;
			},
			isEndOfStream() {
				return isEndOfStream;
			}
		};
	}
	encode({ headers: rawHeaders, body }) {
		const headers = this.headerMarshaller.format(rawHeaders);
		const length = headers.byteLength + body.byteLength + 16;
		const out = new Uint8Array(length);
		const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
		const checksum = new Crc32();
		view.setUint32(0, length, false);
		view.setUint32(4, headers.byteLength, false);
		view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
		out.set(headers, 12);
		out.set(body, headers.byteLength + 12);
		view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
		return out;
	}
	decode(message) {
		const { headers, body } = splitMessage(message);
		return {
			headers: this.headerMarshaller.parse(headers),
			body
		};
	}
	formatHeaders(rawHeaders) {
		return this.headerMarshaller.format(rawHeaders);
	}
};
var MessageDecoderStream = class {
	options;
	constructor(options) {
		this.options = options;
	}
	[Symbol.asyncIterator]() {
		return this.asyncIterator();
	}
	async *asyncIterator() {
		for await (const bytes of this.options.inputStream) yield this.options.decoder.decode(bytes);
	}
};
var MessageEncoderStream = class {
	options;
	constructor(options) {
		this.options = options;
	}
	[Symbol.asyncIterator]() {
		return this.asyncIterator();
	}
	async *asyncIterator() {
		for await (const msg of this.options.messageStream) yield this.options.encoder.encode(msg);
		if (this.options.includeEndFrame) yield new Uint8Array(0);
	}
};
var SmithyMessageDecoderStream = class {
	options;
	constructor(options) {
		this.options = options;
	}
	[Symbol.asyncIterator]() {
		return this.asyncIterator();
	}
	async *asyncIterator() {
		for await (const message of this.options.messageStream) {
			const deserialized = await this.options.deserializer(message);
			if (deserialized === void 0) continue;
			yield deserialized;
		}
	}
};
var SmithyMessageEncoderStream = class {
	options;
	constructor(options) {
		this.options = options;
	}
	[Symbol.asyncIterator]() {
		return this.asyncIterator();
	}
	async *asyncIterator() {
		for await (const chunk of this.options.inputStream) yield this.options.serializer(chunk);
	}
};
function getChunkedStream(source) {
	let currentMessageTotalLength = 0;
	let currentMessagePendingLength = 0;
	let currentMessage = null;
	let messageLengthBuffer = null;
	const allocateMessage = (size) => {
		if (typeof size !== "number") throw new Error("Attempted to allocate an event message where size was not a number: " + size);
		currentMessageTotalLength = size;
		currentMessagePendingLength = 4;
		currentMessage = new Uint8Array(size);
		new DataView(currentMessage.buffer).setUint32(0, size, false);
	};
	const iterator = async function* () {
		const sourceIterator = source[Symbol.asyncIterator]();
		while (true) {
			const { value, done } = await sourceIterator.next();
			if (done) {
				if (!currentMessageTotalLength) return;
				else if (currentMessageTotalLength === currentMessagePendingLength) yield currentMessage;
				else throw new Error("Truncated event message received.");
				return;
			}
			const chunkLength = value.length;
			let currentOffset = 0;
			while (currentOffset < chunkLength) {
				if (!currentMessage) {
					const bytesRemaining = chunkLength - currentOffset;
					if (!messageLengthBuffer) messageLengthBuffer = new Uint8Array(4);
					const numBytesForTotal = Math.min(4 - currentMessagePendingLength, bytesRemaining);
					messageLengthBuffer.set(value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
					currentMessagePendingLength += numBytesForTotal;
					currentOffset += numBytesForTotal;
					if (currentMessagePendingLength < 4) break;
					allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
					messageLengthBuffer = null;
				}
				const numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, chunkLength - currentOffset);
				currentMessage.set(value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
				currentMessagePendingLength += numBytesToWrite;
				currentOffset += numBytesToWrite;
				if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
					yield currentMessage;
					currentMessage = null;
					currentMessageTotalLength = 0;
					currentMessagePendingLength = 0;
				}
			}
		}
	};
	return { [Symbol.asyncIterator]: iterator };
}
function getMessageUnmarshaller(deserializer, toUtf8) {
	return async function(message) {
		const { value: messageType } = message.headers[":message-type"];
		if (messageType === "error") {
			const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
			unmodeledError.name = message.headers[":error-code"].value;
			throw unmodeledError;
		} else if (messageType === "exception") {
			const code = message.headers[":exception-type"].value;
			const deserializedException = await deserializer({ [code]: message });
			if (deserializedException.$unknown) {
				const error = new Error(toUtf8(message.body));
				error.name = code;
				throw error;
			}
			throw deserializedException[code];
		} else if (messageType === "event") {
			const deserialized = await deserializer({ [message.headers[":event-type"].value]: message });
			if (deserialized.$unknown) return;
			return deserialized;
		} else throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
	};
}
var EventStreamMarshaller$1 = class {
	eventStreamCodec;
	utfEncoder;
	constructor({ utf8Encoder, utf8Decoder }) {
		this.eventStreamCodec = new EventStreamCodec(utf8Encoder, utf8Decoder);
		this.utfEncoder = utf8Encoder;
	}
	deserialize(body, deserializer) {
		return new SmithyMessageDecoderStream({
			messageStream: new MessageDecoderStream({
				inputStream: getChunkedStream(body),
				decoder: this.eventStreamCodec
			}),
			deserializer: getMessageUnmarshaller(deserializer, this.utfEncoder)
		});
	}
	serialize(inputStream, serializer) {
		return new MessageEncoderStream({
			messageStream: new SmithyMessageEncoderStream({
				inputStream,
				serializer
			}),
			encoder: this.eventStreamCodec,
			includeEndFrame: true
		});
	}
};
async function* readabletoIterable(readStream) {
	let streamEnded = false;
	let generationEnded = false;
	const records = new Array();
	readStream.on("error", (err) => {
		if (!streamEnded) streamEnded = true;
		if (err) throw err;
	});
	readStream.on("data", (data) => {
		records.push(data);
	});
	readStream.on("end", () => {
		streamEnded = true;
	});
	while (!generationEnded) {
		const value = await new Promise((resolve) => setTimeout(() => resolve(records.shift()), 0));
		if (value) yield value;
		generationEnded = streamEnded && records.length === 0;
	}
}
var EventStreamMarshaller = class {
	universalMarshaller;
	constructor({ utf8Encoder, utf8Decoder }) {
		this.universalMarshaller = new EventStreamMarshaller$1({
			utf8Decoder,
			utf8Encoder
		});
	}
	deserialize(body, deserializer) {
		const bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : readabletoIterable(body);
		return this.universalMarshaller.deserialize(bodyIterable, deserializer);
	}
	serialize(input, serializer) {
		return Readable$1.from(this.universalMarshaller.serialize(input, serializer));
	}
};
const eventStreamSerdeProvider = (options) => new EventStreamMarshaller(options);
var dist_es_exports$3 = /* @__PURE__ */ __exportAll({ Hash: () => Hash });
function castSourceData(toCast, encoding) {
	if (Buffer$1.isBuffer(toCast)) return toCast;
	if (typeof toCast === "string") return fromString(toCast, encoding);
	if (ArrayBuffer.isView(toCast)) return fromArrayBuffer(toCast.buffer, toCast.byteOffset, toCast.byteLength);
	return fromArrayBuffer(toCast);
}
var Hash;
var init_dist_es$3 = __esmMin((() => {
	init_dist_es$37();
	init_dist_es$36();
	Hash = class {
		algorithmIdentifier;
		secret;
		hash;
		constructor(algorithmIdentifier, secret) {
			this.algorithmIdentifier = algorithmIdentifier;
			this.secret = secret;
			this.reset();
		}
		update(toHash, encoding) {
			this.hash.update(toUint8Array(castSourceData(toHash, encoding)));
		}
		digest() {
			return Promise.resolve(this.hash.digest());
		}
		reset() {
			this.hash = this.secret ? createHmac(this.algorithmIdentifier, castSourceData(this.secret)) : createHash(this.algorithmIdentifier);
		}
	};
}));
init_dist_es$36();
var HashCalculator = class extends Writable {
	hash;
	constructor(hash, options) {
		super(options);
		this.hash = hash;
	}
	_write(chunk, encoding, callback) {
		try {
			this.hash.update(toUint8Array(chunk));
		} catch (err) {
			return callback(err);
		}
		callback();
	}
};
const readableStreamHasher = (hashCtor, readableStream) => {
	if (readableStream.readableFlowing !== null) throw new Error("Unable to calculate hash for flowing readable stream");
	const hash = new hashCtor();
	const hashCalculator = new HashCalculator(hash);
	readableStream.pipe(hashCalculator);
	return new Promise((resolve, reject) => {
		readableStream.on("error", (err) => {
			hashCalculator.end();
			reject(err);
		});
		hashCalculator.on("error", reject);
		hashCalculator.on("finish", () => {
			hash.digest().then(resolve).catch(reject);
		});
	});
};
var calculateBodyLength;
var init_calculateBodyLength = __esmMin((() => {
	calculateBodyLength = (body) => {
		if (!body) return 0;
		if (typeof body === "string") return Buffer.byteLength(body);
		else if (typeof body.byteLength === "number") return body.byteLength;
		else if (typeof body.size === "number") return body.size;
		else if (typeof body.start === "number" && typeof body.end === "number") return body.end + 1 - body.start;
		else if (body instanceof ReadStream) {
			if (body.path != null) return lstatSync(body.path).size;
			else if (typeof body.fd === "number") return fstatSync(body.fd).size;
		}
		throw new Error(`Body Length computation failed for ${body}`);
	};
}));
var dist_es_exports$2 = /* @__PURE__ */ __exportAll({ calculateBodyLength: () => calculateBodyLength });
var init_dist_es$2 = __esmMin((() => {
	init_calculateBodyLength();
})), DEFAULTS_MODE_OPTIONS, IMDS_REGION_PATH;
var init_constants = __esmMin((() => {
	DEFAULTS_MODE_OPTIONS = [
		"in-region",
		"cross-region",
		"mobile",
		"standard",
		"legacy"
	];
	IMDS_REGION_PATH = "/latest/meta-data/placement/region";
}));
var AWS_DEFAULTS_MODE_ENV, AWS_DEFAULTS_MODE_CONFIG, NODE_DEFAULTS_MODE_CONFIG_OPTIONS;
var init_defaultsModeConfig = __esmMin((() => {
	AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
	AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
	NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
		environmentVariableSelector: (env) => {
			return env[AWS_DEFAULTS_MODE_ENV];
		},
		configFileSelector: (profile) => {
			return profile[AWS_DEFAULTS_MODE_CONFIG];
		},
		default: "legacy"
	};
}));
var resolveDefaultsModeConfig, resolveNodeDefaultsModeAuto, inferPhysicalRegion;
var init_resolveDefaultsModeConfig = __esmMin((() => {
	init_dist_es$12();
	init_dist_es$9();
	init_dist_es$27();
	init_constants();
	init_defaultsModeConfig();
	resolveDefaultsModeConfig = ({ region = loadConfig(NODE_REGION_CONFIG_OPTIONS), defaultsMode = loadConfig(NODE_DEFAULTS_MODE_CONFIG_OPTIONS) } = {}) => memoize(async () => {
		const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
		switch (mode?.toLowerCase()) {
			case "auto": return resolveNodeDefaultsModeAuto(region);
			case "in-region":
			case "cross-region":
			case "mobile":
			case "standard":
			case "legacy": return Promise.resolve(mode?.toLocaleLowerCase());
			case void 0: return Promise.resolve("legacy");
			default: throw new Error(`Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
		}
	});
	resolveNodeDefaultsModeAuto = async (clientRegion) => {
		if (clientRegion) {
			const resolvedRegion = typeof clientRegion === "function" ? await clientRegion() : clientRegion;
			const inferredRegion = await inferPhysicalRegion();
			if (!inferredRegion) return "standard";
			if (resolvedRegion === inferredRegion) return "in-region";
			else return "cross-region";
		}
		return "standard";
	};
	inferPhysicalRegion = async () => {
		if (process.env["AWS_EXECUTION_ENV"] && (process.env["AWS_REGION"] || process.env["AWS_DEFAULT_REGION"])) return process.env["AWS_REGION"] ?? process.env["AWS_DEFAULT_REGION"];
		if (!process.env["AWS_EC2_METADATA_DISABLED"]) try {
			const { getInstanceMetadataEndpoint, httpRequest } = await import("../_17.mjs");
			return (await httpRequest({
				...await getInstanceMetadataEndpoint(),
				path: IMDS_REGION_PATH
			})).toString();
		} catch (e) {}
	};
}));
var dist_es_exports$1 = /* @__PURE__ */ __exportAll({ resolveDefaultsModeConfig: () => resolveDefaultsModeConfig });
var init_dist_es$1 = __esmMin((() => {
	init_resolveDefaultsModeConfig();
}));
var require_protocols = /* @__PURE__ */ __commonJSMin(((exports) => {
	var cbor = require_cbor();
	var schema = require_schema();
	var smithyClient = (init_dist_es$23(), __toCommonJS(dist_es_exports$19));
	var protocols = require_protocols$1();
	var serde = require_serde();
	var utilBase64 = (init_dist_es$35(), __toCommonJS(dist_es_exports$26));
	var utilUtf8 = (init_dist_es$36(), __toCommonJS(dist_es_exports$27));
	var xmlBuilder = (init_dist_es$22(), __toCommonJS(dist_es_exports$18));
	var ProtocolLib = class {
		queryCompat;
		constructor(queryCompat = false) {
			this.queryCompat = queryCompat;
		}
		resolveRestContentType(defaultContentType, inputSchema) {
			const members = inputSchema.getMemberSchemas();
			const httpPayloadMember = Object.values(members).find((m) => {
				return !!m.getMergedTraits().httpPayload;
			});
			if (httpPayloadMember) {
				const mediaType = httpPayloadMember.getMergedTraits().mediaType;
				if (mediaType) return mediaType;
				else if (httpPayloadMember.isStringSchema()) return "text/plain";
				else if (httpPayloadMember.isBlobSchema()) return "application/octet-stream";
				else return defaultContentType;
			} else if (!inputSchema.isUnitSchema()) {
				if (Object.values(members).find((m) => {
					const { httpQuery, httpQueryParams, httpHeader, httpLabel, httpPrefixHeaders } = m.getMergedTraits();
					return !httpQuery && !httpQueryParams && !httpHeader && !httpLabel && httpPrefixHeaders === void 0;
				})) return defaultContentType;
			}
		}
		async getErrorSchemaOrThrowBaseException(errorIdentifier, defaultNamespace, response, dataObject, metadata, getErrorSchema) {
			let namespace = defaultNamespace;
			let errorName = errorIdentifier;
			if (errorIdentifier.includes("#")) [namespace, errorName] = errorIdentifier.split("#");
			const errorMetadata = {
				$metadata: metadata,
				$fault: response.statusCode < 500 ? "client" : "server"
			};
			const registry = schema.TypeRegistry.for(namespace);
			try {
				return {
					errorSchema: getErrorSchema?.(registry, errorName) ?? registry.getSchema(errorIdentifier),
					errorMetadata
				};
			} catch (e) {
				dataObject.message = dataObject.message ?? dataObject.Message ?? "UnknownError";
				const synthetic = schema.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace);
				const baseExceptionSchema = synthetic.getBaseException();
				if (baseExceptionSchema) {
					const ErrorCtor = synthetic.getErrorCtor(baseExceptionSchema) ?? Error;
					throw this.decorateServiceException(Object.assign(new ErrorCtor({ name: errorName }), errorMetadata), dataObject);
				}
				throw this.decorateServiceException(Object.assign(new Error(errorName), errorMetadata), dataObject);
			}
		}
		decorateServiceException(exception, additions = {}) {
			if (this.queryCompat) {
				const msg = exception.Message ?? additions.Message;
				const error = smithyClient.decorateServiceException(exception, additions);
				if (msg) error.message = msg;
				error.Error = {
					...error.Error,
					Type: error.Error.Type,
					Code: error.Error.Code,
					Message: error.Error.message ?? error.Error.Message ?? msg
				};
				const reqId = error.$metadata.requestId;
				if (reqId) error.RequestId = reqId;
				return error;
			}
			return smithyClient.decorateServiceException(exception, additions);
		}
		setQueryCompatError(output, response) {
			const queryErrorHeader = response.headers?.["x-amzn-query-error"];
			if (output !== void 0 && queryErrorHeader != null) {
				const [Code, Type] = queryErrorHeader.split(";");
				const entries = Object.entries(output);
				const Error = {
					Code,
					Type
				};
				Object.assign(output, Error);
				for (const [k, v] of entries) Error[k === "message" ? "Message" : k] = v;
				delete Error.__type;
				output.Error = Error;
			}
		}
		queryCompatOutput(queryCompatErrorData, errorData) {
			if (queryCompatErrorData.Error) errorData.Error = queryCompatErrorData.Error;
			if (queryCompatErrorData.Type) errorData.Type = queryCompatErrorData.Type;
			if (queryCompatErrorData.Code) errorData.Code = queryCompatErrorData.Code;
		}
		findQueryCompatibleError(registry, errorName) {
			try {
				return registry.getSchema(errorName);
			} catch (e) {
				return registry.find((schema$1) => schema.NormalizedSchema.of(schema$1).getMergedTraits().awsQueryError?.[0] === errorName);
			}
		}
	};
	var AwsSmithyRpcV2CborProtocol = class extends cbor.SmithyRpcV2CborProtocol {
		awsQueryCompatible;
		mixin;
		constructor({ defaultNamespace, awsQueryCompatible }) {
			super({ defaultNamespace });
			this.awsQueryCompatible = !!awsQueryCompatible;
			this.mixin = new ProtocolLib(this.awsQueryCompatible);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (this.awsQueryCompatible) request.headers["x-amzn-query-mode"] = "true";
			return request;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			if (this.awsQueryCompatible) this.mixin.setQueryCompatError(dataObject, response);
			const errorName = (() => {
				const compatHeader = response.headers["x-amzn-query-error"];
				if (compatHeader && this.awsQueryCompatible) return compatHeader.split(";")[0];
				return cbor.loadSmithyRpcV2CborErrorCode(response, dataObject) ?? "Unknown";
			})();
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorName, this.options.defaultNamespace, response, dataObject, metadata, this.awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			const output = {};
			for (const [name, member] of ns.structIterator()) if (dataObject[name] != null) output[name] = this.deserializer.readValue(member, dataObject[name]);
			if (this.awsQueryCompatible) this.mixin.queryCompatOutput(dataObject, output);
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
	};
	var _toStr = (val) => {
		if (val == null) return val;
		if (typeof val === "number" || typeof val === "bigint") {
			const warning = /* @__PURE__ */ new Error(`Received number ${val} where a string was expected.`);
			warning.name = "Warning";
			console.warn(warning);
			return String(val);
		}
		if (typeof val === "boolean") {
			const warning = /* @__PURE__ */ new Error(`Received boolean ${val} where a string was expected.`);
			warning.name = "Warning";
			console.warn(warning);
			return String(val);
		}
		return val;
	};
	var _toBool = (val) => {
		if (val == null) return val;
		if (typeof val === "string") {
			const lowercase = val.toLowerCase();
			if (val !== "" && lowercase !== "false" && lowercase !== "true") {
				const warning = /* @__PURE__ */ new Error(`Received string "${val}" where a boolean was expected.`);
				warning.name = "Warning";
				console.warn(warning);
			}
			return val !== "" && lowercase !== "false";
		}
		return val;
	};
	var _toNum = (val) => {
		if (val == null) return val;
		if (typeof val === "string") {
			const num = Number(val);
			if (num.toString() !== val) {
				const warning = /* @__PURE__ */ new Error(`Received string "${val}" where a number was expected.`);
				warning.name = "Warning";
				console.warn(warning);
				return val;
			}
			return num;
		}
		return val;
	};
	var SerdeContextConfig = class {
		serdeContext;
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
		}
	};
	var UnionSerde = class {
		from;
		to;
		keys;
		constructor(from, to) {
			this.from = from;
			this.to = to;
			this.keys = new Set(Object.keys(this.from).filter((k) => k !== "__type"));
		}
		mark(key) {
			this.keys.delete(key);
		}
		hasUnknown() {
			return this.keys.size === 1 && Object.keys(this.to).length === 0;
		}
		writeUnknown() {
			if (this.hasUnknown()) {
				const k = this.keys.values().next().value;
				const v = this.from[k];
				this.to.$unknown = [k, v];
			}
		}
	};
	function jsonReviver(key, value, context) {
		if (context?.source) {
			const numericString = context.source;
			if (typeof value === "number") {
				if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER || numericString !== String(value)) if (numericString.includes(".")) return new serde.NumericValue(numericString, "bigDecimal");
				else return BigInt(numericString);
			}
		}
		return value;
	}
	var collectBodyString = (streamBody, context) => smithyClient.collectBody(streamBody, context).then((body) => (context?.utf8Encoder ?? utilUtf8.toUtf8)(body));
	var parseJsonBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
		if (encoded.length) try {
			return JSON.parse(encoded);
		} catch (e) {
			if (e?.name === "SyntaxError") Object.defineProperty(e, "$responseBodyText", { value: encoded });
			throw e;
		}
		return {};
	});
	var parseJsonErrorBody = async (errorBody, context) => {
		const value = await parseJsonBody(errorBody, context);
		value.message = value.message ?? value.Message;
		return value;
	};
	var loadRestJsonErrorCode = (output, data) => {
		const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
		const sanitizeErrorCode = (rawValue) => {
			let cleanValue = rawValue;
			if (typeof cleanValue === "number") cleanValue = cleanValue.toString();
			if (cleanValue.indexOf(",") >= 0) cleanValue = cleanValue.split(",")[0];
			if (cleanValue.indexOf(":") >= 0) cleanValue = cleanValue.split(":")[0];
			if (cleanValue.indexOf("#") >= 0) cleanValue = cleanValue.split("#")[1];
			return cleanValue;
		};
		const headerKey = findKey(output.headers, "x-amzn-errortype");
		if (headerKey !== void 0) return sanitizeErrorCode(output.headers[headerKey]);
		if (data && typeof data === "object") {
			const codeKey = findKey(data, "code");
			if (codeKey && data[codeKey] !== void 0) return sanitizeErrorCode(data[codeKey]);
			if (data["__type"] !== void 0) return sanitizeErrorCode(data["__type"]);
		}
	};
	var JsonShapeDeserializer = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		async read(schema, data) {
			return this._read(schema, typeof data === "string" ? JSON.parse(data, jsonReviver) : await parseJsonBody(data, this.serdeContext));
		}
		readObject(schema, data) {
			return this._read(schema, data);
		}
		_read(schema$1, value) {
			const isObject = value !== null && typeof value === "object";
			const ns = schema.NormalizedSchema.of(schema$1);
			if (isObject) {
				if (ns.isStructSchema()) {
					const record = value;
					const union = ns.isUnionSchema();
					const out = {};
					let nameMap = void 0;
					const { jsonName } = this.settings;
					if (jsonName) nameMap = {};
					let unionSerde;
					if (union) unionSerde = new UnionSerde(record, out);
					for (const [memberName, memberSchema] of ns.structIterator()) {
						let fromKey = memberName;
						if (jsonName) {
							fromKey = memberSchema.getMergedTraits().jsonName ?? fromKey;
							nameMap[fromKey] = memberName;
						}
						if (union) unionSerde.mark(fromKey);
						if (record[fromKey] != null) out[memberName] = this._read(memberSchema, record[fromKey]);
					}
					if (union) unionSerde.writeUnknown();
					else if (typeof record.__type === "string") for (const [k, v] of Object.entries(record)) {
						const t = jsonName ? nameMap[k] ?? k : k;
						if (!(t in out)) out[t] = v;
					}
					return out;
				}
				if (Array.isArray(value) && ns.isListSchema()) {
					const listMember = ns.getValueSchema();
					const out = [];
					const sparse = !!ns.getMergedTraits().sparse;
					for (const item of value) if (sparse || item != null) out.push(this._read(listMember, item));
					return out;
				}
				if (ns.isMapSchema()) {
					const mapMember = ns.getValueSchema();
					const out = {};
					const sparse = !!ns.getMergedTraits().sparse;
					for (const [_k, _v] of Object.entries(value)) if (sparse || _v != null) out[_k] = this._read(mapMember, _v);
					return out;
				}
			}
			if (ns.isBlobSchema() && typeof value === "string") return utilBase64.fromBase64(value);
			const mediaType = ns.getMergedTraits().mediaType;
			if (ns.isStringSchema() && typeof value === "string" && mediaType) {
				if (mediaType === "application/json" || mediaType.endsWith("+json")) return serde.LazyJsonString.from(value);
				return value;
			}
			if (ns.isTimestampSchema() && value != null) switch (protocols.determineTimestampFormat(ns, this.settings)) {
				case 5: return serde.parseRfc3339DateTimeWithOffset(value);
				case 6: return serde.parseRfc7231DateTime(value);
				case 7: return serde.parseEpochTimestamp(value);
				default:
					console.warn("Missing timestamp format, parsing value with Date constructor:", value);
					return new Date(value);
			}
			if (ns.isBigIntegerSchema() && (typeof value === "number" || typeof value === "string")) return BigInt(value);
			if (ns.isBigDecimalSchema() && value != void 0) {
				if (value instanceof serde.NumericValue) return value;
				const untyped = value;
				if (untyped.type === "bigDecimal" && "string" in untyped) return new serde.NumericValue(untyped.string, untyped.type);
				return new serde.NumericValue(String(value), "bigDecimal");
			}
			if (ns.isNumericSchema() && typeof value === "string") {
				switch (value) {
					case "Infinity": return Infinity;
					case "-Infinity": return -Infinity;
					case "NaN": return NaN;
				}
				return value;
			}
			if (ns.isDocumentSchema()) if (isObject) {
				const out = Array.isArray(value) ? [] : {};
				for (const [k, v] of Object.entries(value)) if (v instanceof serde.NumericValue) out[k] = v;
				else out[k] = this._read(ns, v);
				return out;
			} else return structuredClone(value);
			return value;
		}
	};
	var NUMERIC_CONTROL_CHAR = String.fromCharCode(925);
	var JsonReplacer = class {
		values = /* @__PURE__ */ new Map();
		counter = 0;
		stage = 0;
		createReplacer() {
			if (this.stage === 1) throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
			if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
			this.stage = 1;
			return (key, value) => {
				if (value instanceof serde.NumericValue) {
					const v = `${NUMERIC_CONTROL_CHAR + "nv" + this.counter++}_` + value.string;
					this.values.set(`"${v}"`, value.string);
					return v;
				}
				if (typeof value === "bigint") {
					const s = value.toString();
					const v = `${NUMERIC_CONTROL_CHAR + "b" + this.counter++}_` + s;
					this.values.set(`"${v}"`, s);
					return v;
				}
				return value;
			};
		}
		replaceInJson(json) {
			if (this.stage === 0) throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
			if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
			this.stage = 2;
			if (this.counter === 0) return json;
			for (const [key, value] of this.values) json = json.replace(key, value);
			return json;
		}
	};
	var JsonShapeSerializer = class extends SerdeContextConfig {
		settings;
		buffer;
		useReplacer = false;
		rootSchema;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema$1, value) {
			this.rootSchema = schema.NormalizedSchema.of(schema$1);
			this.buffer = this._write(this.rootSchema, value);
		}
		writeDiscriminatedDocument(schema$1, value) {
			this.write(schema$1, value);
			if (typeof this.buffer === "object") this.buffer.__type = schema.NormalizedSchema.of(schema$1).getName(true);
		}
		flush() {
			const { rootSchema, useReplacer } = this;
			this.rootSchema = void 0;
			this.useReplacer = false;
			if (rootSchema?.isStructSchema() || rootSchema?.isDocumentSchema()) {
				if (!useReplacer) return JSON.stringify(this.buffer);
				const replacer = new JsonReplacer();
				return replacer.replaceInJson(JSON.stringify(this.buffer, replacer.createReplacer(), 0));
			}
			return this.buffer;
		}
		_write(schema$1, value, container) {
			const isObject = value !== null && typeof value === "object";
			const ns = schema.NormalizedSchema.of(schema$1);
			if (isObject) {
				if (ns.isStructSchema()) {
					const record = value;
					const out = {};
					const { jsonName } = this.settings;
					let nameMap = void 0;
					if (jsonName) nameMap = {};
					for (const [memberName, memberSchema] of ns.structIterator()) {
						const serializableValue = this._write(memberSchema, record[memberName], ns);
						if (serializableValue !== void 0) {
							let targetKey = memberName;
							if (jsonName) {
								targetKey = memberSchema.getMergedTraits().jsonName ?? memberName;
								nameMap[memberName] = targetKey;
							}
							out[targetKey] = serializableValue;
						}
					}
					if (ns.isUnionSchema() && Object.keys(out).length === 0) {
						const { $unknown } = record;
						if (Array.isArray($unknown)) {
							const [k, v] = $unknown;
							out[k] = this._write(15, v);
						}
					} else if (typeof record.__type === "string") for (const [k, v] of Object.entries(record)) {
						const targetKey = jsonName ? nameMap[k] ?? k : k;
						if (!(targetKey in out)) out[targetKey] = this._write(15, v);
					}
					return out;
				}
				if (Array.isArray(value) && ns.isListSchema()) {
					const listMember = ns.getValueSchema();
					const out = [];
					const sparse = !!ns.getMergedTraits().sparse;
					for (const item of value) if (sparse || item != null) out.push(this._write(listMember, item));
					return out;
				}
				if (ns.isMapSchema()) {
					const mapMember = ns.getValueSchema();
					const out = {};
					const sparse = !!ns.getMergedTraits().sparse;
					for (const [_k, _v] of Object.entries(value)) if (sparse || _v != null) out[_k] = this._write(mapMember, _v);
					return out;
				}
				if (value instanceof Uint8Array && (ns.isBlobSchema() || ns.isDocumentSchema())) {
					if (ns === this.rootSchema) return value;
					return (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
				}
				if (value instanceof Date && (ns.isTimestampSchema() || ns.isDocumentSchema())) switch (protocols.determineTimestampFormat(ns, this.settings)) {
					case 5: return value.toISOString().replace(".000Z", "Z");
					case 6: return serde.dateToUtcString(value);
					case 7: return value.getTime() / 1e3;
					default:
						console.warn("Missing timestamp format, using epoch seconds", value);
						return value.getTime() / 1e3;
				}
				if (value instanceof serde.NumericValue) this.useReplacer = true;
			}
			if (value === null && container?.isStructSchema()) return;
			if (ns.isStringSchema()) {
				if (typeof value === "undefined" && ns.isIdempotencyToken()) return serde.generateIdempotencyToken();
				const mediaType = ns.getMergedTraits().mediaType;
				if (value != null && mediaType) {
					if (mediaType === "application/json" || mediaType.endsWith("+json")) return serde.LazyJsonString.from(value);
				}
				return value;
			}
			if (typeof value === "number" && ns.isNumericSchema()) {
				if (Math.abs(value) === Infinity || isNaN(value)) return String(value);
				return value;
			}
			if (typeof value === "string" && ns.isBlobSchema()) {
				if (ns === this.rootSchema) return value;
				return (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
			}
			if (typeof value === "bigint") this.useReplacer = true;
			if (ns.isDocumentSchema()) if (isObject) {
				const out = Array.isArray(value) ? [] : {};
				for (const [k, v] of Object.entries(value)) if (v instanceof serde.NumericValue) {
					this.useReplacer = true;
					out[k] = v;
				} else out[k] = this._write(ns, v);
				return out;
			} else return structuredClone(value);
			return value;
		}
	};
	var JsonCodec = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		createSerializer() {
			const serializer = new JsonShapeSerializer(this.settings);
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new JsonShapeDeserializer(this.settings);
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var AwsJsonRpcProtocol = class extends protocols.RpcProtocol {
		serializer;
		deserializer;
		serviceTarget;
		codec;
		mixin;
		awsQueryCompatible;
		constructor({ defaultNamespace, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({ defaultNamespace });
			this.serviceTarget = serviceTarget;
			this.codec = jsonCodec ?? new JsonCodec({
				timestampFormat: {
					useTrait: true,
					default: 7
				},
				jsonName: false
			});
			this.serializer = this.codec.createSerializer();
			this.deserializer = this.codec.createDeserializer();
			this.awsQueryCompatible = !!awsQueryCompatible;
			this.mixin = new ProtocolLib(this.awsQueryCompatible);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (!request.path.endsWith("/")) request.path += "/";
			Object.assign(request.headers, {
				"content-type": `application/x-amz-json-${this.getJsonRpcVersion()}`,
				"x-amz-target": `${this.serviceTarget}.${operationSchema.name}`
			});
			if (this.awsQueryCompatible) request.headers["x-amzn-query-mode"] = "true";
			if (schema.deref(operationSchema.input) === "unit" || !request.body) request.body = "{}";
			return request;
		}
		getPayloadCodec() {
			return this.codec;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			if (this.awsQueryCompatible) this.mixin.setQueryCompatError(dataObject, response);
			const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata, this.awsQueryCompatible ? this.mixin.findQueryCompatibleError : void 0);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			const output = {};
			for (const [name, member] of ns.structIterator()) if (dataObject[name] != null) output[name] = this.codec.createDeserializer().readObject(member, dataObject[name]);
			if (this.awsQueryCompatible) this.mixin.queryCompatOutput(dataObject, output);
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
	};
	var AwsJson1_0Protocol = class extends AwsJsonRpcProtocol {
		constructor({ defaultNamespace, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({
				defaultNamespace,
				serviceTarget,
				awsQueryCompatible,
				jsonCodec
			});
		}
		getShapeId() {
			return "aws.protocols#awsJson1_0";
		}
		getJsonRpcVersion() {
			return "1.0";
		}
		getDefaultContentType() {
			return "application/x-amz-json-1.0";
		}
	};
	var AwsJson1_1Protocol = class extends AwsJsonRpcProtocol {
		constructor({ defaultNamespace, serviceTarget, awsQueryCompatible, jsonCodec }) {
			super({
				defaultNamespace,
				serviceTarget,
				awsQueryCompatible,
				jsonCodec
			});
		}
		getShapeId() {
			return "aws.protocols#awsJson1_1";
		}
		getJsonRpcVersion() {
			return "1.1";
		}
		getDefaultContentType() {
			return "application/x-amz-json-1.1";
		}
	};
	var AwsRestJsonProtocol = class extends protocols.HttpBindingProtocol {
		serializer;
		deserializer;
		codec;
		mixin = new ProtocolLib();
		constructor({ defaultNamespace }) {
			super({ defaultNamespace });
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 7
				},
				httpBindings: true,
				jsonName: true
			};
			this.codec = new JsonCodec(settings);
			this.serializer = new protocols.HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
			this.deserializer = new protocols.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
		}
		getShapeId() {
			return "aws.protocols#restJson1";
		}
		getPayloadCodec() {
			return this.codec;
		}
		setSerdeContext(serdeContext) {
			this.codec.setSerdeContext(serdeContext);
			super.setSerdeContext(serdeContext);
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			const inputSchema = schema.NormalizedSchema.of(operationSchema.input);
			if (!request.headers["content-type"]) {
				const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
				if (contentType) request.headers["content-type"] = contentType;
			}
			if (request.body == null && request.headers["content-type"] === this.getDefaultContentType()) request.body = "{}";
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			const output = await super.deserializeResponse(operationSchema, context, response);
			const outputSchema = schema.NormalizedSchema.of(operationSchema.output);
			for (const [name, member] of outputSchema.structIterator()) if (member.getMemberTraits().httpPayload && !(name in output)) output[name] = null;
			return output;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
			const output = {};
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().jsonName ?? name;
				output[name] = this.codec.createDeserializer().readObject(member, dataObject[target]);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		getDefaultContentType() {
			return "application/json";
		}
	};
	var awsExpectUnion = (value) => {
		if (value == null) return;
		if (typeof value === "object" && "__type" in value) delete value.__type;
		return smithyClient.expectUnion(value);
	};
	var XmlShapeDeserializer = class extends SerdeContextConfig {
		settings;
		stringDeserializer;
		constructor(settings) {
			super();
			this.settings = settings;
			this.stringDeserializer = new protocols.FromStringShapeDeserializer(settings);
		}
		setSerdeContext(serdeContext) {
			this.serdeContext = serdeContext;
			this.stringDeserializer.setSerdeContext(serdeContext);
		}
		read(schema$1, bytes, key) {
			const ns = schema.NormalizedSchema.of(schema$1);
			const memberSchemas = ns.getMemberSchemas();
			if (ns.isStructSchema() && ns.isMemberSchema() && !!Object.values(memberSchemas).find((memberNs) => {
				return !!memberNs.getMemberTraits().eventPayload;
			})) {
				const output = {};
				const memberName = Object.keys(memberSchemas)[0];
				if (memberSchemas[memberName].isBlobSchema()) output[memberName] = bytes;
				else output[memberName] = this.read(memberSchemas[memberName], bytes);
				return output;
			}
			const xmlString = (this.serdeContext?.utf8Encoder ?? utilUtf8.toUtf8)(bytes);
			const parsedObject = this.parseXml(xmlString);
			return this.readSchema(schema$1, key ? parsedObject[key] : parsedObject);
		}
		readSchema(_schema, value) {
			const ns = schema.NormalizedSchema.of(_schema);
			if (ns.isUnitSchema()) return;
			const traits = ns.getMergedTraits();
			if (ns.isListSchema() && !Array.isArray(value)) return this.readSchema(ns, [value]);
			if (value == null) return value;
			if (typeof value === "object") {
				const sparse = !!traits.sparse;
				const flat = !!traits.xmlFlattened;
				if (ns.isListSchema()) {
					const listValue = ns.getValueSchema();
					const buffer = [];
					const sourceKey = listValue.getMergedTraits().xmlName ?? "member";
					const source = flat ? value : (value[0] ?? value)[sourceKey];
					const sourceArray = Array.isArray(source) ? source : [source];
					for (const v of sourceArray) if (v != null || sparse) buffer.push(this.readSchema(listValue, v));
					return buffer;
				}
				const buffer = {};
				if (ns.isMapSchema()) {
					const keyNs = ns.getKeySchema();
					const memberNs = ns.getValueSchema();
					let entries;
					if (flat) entries = Array.isArray(value) ? value : [value];
					else entries = Array.isArray(value.entry) ? value.entry : [value.entry];
					const keyProperty = keyNs.getMergedTraits().xmlName ?? "key";
					const valueProperty = memberNs.getMergedTraits().xmlName ?? "value";
					for (const entry of entries) {
						const key = entry[keyProperty];
						const value = entry[valueProperty];
						if (value != null || sparse) buffer[key] = this.readSchema(memberNs, value);
					}
					return buffer;
				}
				if (ns.isStructSchema()) {
					const union = ns.isUnionSchema();
					let unionSerde;
					if (union) unionSerde = new UnionSerde(value, buffer);
					for (const [memberName, memberSchema] of ns.structIterator()) {
						const memberTraits = memberSchema.getMergedTraits();
						const xmlObjectKey = !memberTraits.httpPayload ? memberSchema.getMemberTraits().xmlName ?? memberName : memberTraits.xmlName ?? memberSchema.getName();
						if (union) unionSerde.mark(xmlObjectKey);
						if (value[xmlObjectKey] != null) buffer[memberName] = this.readSchema(memberSchema, value[xmlObjectKey]);
					}
					if (union) unionSerde.writeUnknown();
					return buffer;
				}
				if (ns.isDocumentSchema()) return value;
				throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${ns.getName(true)}`);
			}
			if (ns.isListSchema()) return [];
			if (ns.isMapSchema() || ns.isStructSchema()) return {};
			return this.stringDeserializer.read(ns, value);
		}
		parseXml(xml) {
			if (xml.length) {
				let parsedObj;
				try {
					parsedObj = xmlBuilder.parseXML(xml);
				} catch (e) {
					if (e && typeof e === "object") Object.defineProperty(e, "$responseBodyText", { value: xml });
					throw e;
				}
				const textNodeName = "#text";
				const key = Object.keys(parsedObj)[0];
				const parsedObjToReturn = parsedObj[key];
				if (parsedObjToReturn[textNodeName]) {
					parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
					delete parsedObjToReturn[textNodeName];
				}
				return smithyClient.getValueFromTextNode(parsedObjToReturn);
			}
			return {};
		}
	};
	var QueryShapeSerializer = class extends SerdeContextConfig {
		settings;
		buffer;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema$1, value, prefix = "") {
			if (this.buffer === void 0) this.buffer = "";
			const ns = schema.NormalizedSchema.of(schema$1);
			if (prefix && !prefix.endsWith(".")) prefix += ".";
			if (ns.isBlobSchema()) {
				if (typeof value === "string" || value instanceof Uint8Array) {
					this.writeKey(prefix);
					this.writeValue((this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value));
				}
			} else if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isStringSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(String(value));
				} else if (ns.isIdempotencyToken()) {
					this.writeKey(prefix);
					this.writeValue(serde.generateIdempotencyToken());
				}
			} else if (ns.isBigIntegerSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(String(value));
				}
			} else if (ns.isBigDecimalSchema()) {
				if (value != null) {
					this.writeKey(prefix);
					this.writeValue(value instanceof serde.NumericValue ? value.string : String(value));
				}
			} else if (ns.isTimestampSchema()) {
				if (value instanceof Date) {
					this.writeKey(prefix);
					switch (protocols.determineTimestampFormat(ns, this.settings)) {
						case 5:
							this.writeValue(value.toISOString().replace(".000Z", "Z"));
							break;
						case 6:
							this.writeValue(smithyClient.dateToUtcString(value));
							break;
						case 7:
							this.writeValue(String(value.getTime() / 1e3));
							break;
					}
				}
			} else if (ns.isDocumentSchema()) if (Array.isArray(value)) this.write(79, value, prefix);
			else if (value instanceof Date) this.write(4, value, prefix);
			else if (value instanceof Uint8Array) this.write(21, value, prefix);
			else if (value && typeof value === "object") this.write(143, value, prefix);
			else {
				this.writeKey(prefix);
				this.writeValue(String(value));
			}
			else if (ns.isListSchema()) {
				if (Array.isArray(value)) if (value.length === 0) {
					if (this.settings.serializeEmptyLists) {
						this.writeKey(prefix);
						this.writeValue("");
					}
				} else {
					const member = ns.getValueSchema();
					const flat = this.settings.flattenLists || ns.getMergedTraits().xmlFlattened;
					let i = 1;
					for (const item of value) {
						if (item == null) continue;
						const traits = member.getMergedTraits();
						const suffix = this.getKey("member", traits.xmlName, traits.ec2QueryName);
						const key = flat ? `${prefix}${i}` : `${prefix}${suffix}.${i}`;
						this.write(member, item, key);
						++i;
					}
				}
			} else if (ns.isMapSchema()) {
				if (value && typeof value === "object") {
					const keySchema = ns.getKeySchema();
					const memberSchema = ns.getValueSchema();
					const flat = ns.getMergedTraits().xmlFlattened;
					let i = 1;
					for (const [k, v] of Object.entries(value)) {
						if (v == null) continue;
						const keyTraits = keySchema.getMergedTraits();
						const keySuffix = this.getKey("key", keyTraits.xmlName, keyTraits.ec2QueryName);
						const key = flat ? `${prefix}${i}.${keySuffix}` : `${prefix}entry.${i}.${keySuffix}`;
						const valTraits = memberSchema.getMergedTraits();
						const valueSuffix = this.getKey("value", valTraits.xmlName, valTraits.ec2QueryName);
						const valueKey = flat ? `${prefix}${i}.${valueSuffix}` : `${prefix}entry.${i}.${valueSuffix}`;
						this.write(keySchema, k, key);
						this.write(memberSchema, v, valueKey);
						++i;
					}
				}
			} else if (ns.isStructSchema()) {
				if (value && typeof value === "object") {
					let didWriteMember = false;
					for (const [memberName, member] of ns.structIterator()) {
						if (value[memberName] == null && !member.isIdempotencyToken()) continue;
						const traits = member.getMergedTraits();
						const suffix = this.getKey(memberName, traits.xmlName, traits.ec2QueryName, "struct");
						const key = `${prefix}${suffix}`;
						this.write(member, value[memberName], key);
						didWriteMember = true;
					}
					if (!didWriteMember && ns.isUnionSchema()) {
						const { $unknown } = value;
						if (Array.isArray($unknown)) {
							const [k, v] = $unknown;
							const key = `${prefix}${k}`;
							this.write(15, v, key);
						}
					}
				}
			} else if (ns.isUnitSchema());
			else throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${ns.getName(true)}`);
		}
		flush() {
			if (this.buffer === void 0) throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
			const str = this.buffer;
			delete this.buffer;
			return str;
		}
		getKey(memberName, xmlName, ec2QueryName, keySource) {
			const { ec2, capitalizeKeys } = this.settings;
			if (ec2 && ec2QueryName) return ec2QueryName;
			const key = xmlName ?? memberName;
			if (capitalizeKeys && keySource === "struct") return key[0].toUpperCase() + key.slice(1);
			return key;
		}
		writeKey(key) {
			if (key.endsWith(".")) key = key.slice(0, key.length - 1);
			this.buffer += `&${protocols.extendedEncodeURIComponent(key)}=`;
		}
		writeValue(value) {
			this.buffer += protocols.extendedEncodeURIComponent(value);
		}
	};
	var AwsQueryProtocol = class extends protocols.RpcProtocol {
		options;
		serializer;
		deserializer;
		mixin = new ProtocolLib();
		constructor(options) {
			super({ defaultNamespace: options.defaultNamespace });
			this.options = options;
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 5
				},
				httpBindings: false,
				xmlNamespace: options.xmlNamespace,
				serviceNamespace: options.defaultNamespace,
				serializeEmptyLists: true
			};
			this.serializer = new QueryShapeSerializer(settings);
			this.deserializer = new XmlShapeDeserializer(settings);
		}
		getShapeId() {
			return "aws.protocols#awsQuery";
		}
		setSerdeContext(serdeContext) {
			this.serializer.setSerdeContext(serdeContext);
			this.deserializer.setSerdeContext(serdeContext);
		}
		getPayloadCodec() {
			throw new Error("AWSQuery protocol has no payload codec.");
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			if (!request.path.endsWith("/")) request.path += "/";
			Object.assign(request.headers, { "content-type": `application/x-www-form-urlencoded` });
			if (schema.deref(operationSchema.input) === "unit" || !request.body) request.body = "";
			request.body = `Action=${operationSchema.name.split("#")[1] ?? operationSchema.name}&Version=${this.options.version}` + request.body;
			if (request.body.endsWith("&")) request.body = request.body.slice(-1);
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			const deserializer = this.deserializer;
			const ns = schema.NormalizedSchema.of(operationSchema.output);
			const dataObject = {};
			if (response.statusCode >= 300) {
				const bytes = await protocols.collectBody(response.body, context);
				if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(15, bytes));
				await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
			}
			for (const header in response.headers) {
				const value = response.headers[header];
				delete response.headers[header];
				response.headers[header.toLowerCase()] = value;
			}
			const shortName = operationSchema.name.split("#")[1] ?? operationSchema.name;
			const awsQueryResultKey = ns.isStructSchema() && this.useNestedResult() ? shortName + "Result" : void 0;
			const bytes = await protocols.collectBody(response.body, context);
			if (bytes.byteLength > 0) Object.assign(dataObject, await deserializer.read(ns, bytes, awsQueryResultKey));
			return {
				$metadata: this.deserializeMetadata(response),
				...dataObject
			};
		}
		useNestedResult() {
			return true;
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = this.loadQueryErrorCode(response, dataObject) ?? "Unknown";
			const errorData = this.loadQueryError(dataObject);
			const message = this.loadQueryErrorMessage(dataObject);
			errorData.message = message;
			errorData.Error = {
				Type: errorData.Type,
				Code: errorData.Code,
				Message: message
			};
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, errorData, metadata, this.mixin.findQueryCompatibleError);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			const output = {
				Type: errorData.Error.Type,
				Code: errorData.Error.Code,
				Error: errorData.Error
			};
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().xmlName ?? name;
				const value = errorData[target] ?? dataObject[target];
				output[name] = this.deserializer.readSchema(member, value);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		loadQueryErrorCode(output, data) {
			const code = (data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error)?.Code;
			if (code !== void 0) return code;
			if (output.statusCode == 404) return "NotFound";
		}
		loadQueryError(data) {
			return data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error;
		}
		loadQueryErrorMessage(data) {
			const errorData = this.loadQueryError(data);
			return errorData?.message ?? errorData?.Message ?? data.message ?? data.Message ?? "Unknown";
		}
		getDefaultContentType() {
			return "application/x-www-form-urlencoded";
		}
	};
	var AwsEc2QueryProtocol = class extends AwsQueryProtocol {
		options;
		constructor(options) {
			super(options);
			this.options = options;
			Object.assign(this.serializer.settings, {
				capitalizeKeys: true,
				flattenLists: true,
				serializeEmptyLists: false,
				ec2: true
			});
		}
		useNestedResult() {
			return false;
		}
	};
	var parseXmlBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
		if (encoded.length) {
			let parsedObj;
			try {
				parsedObj = xmlBuilder.parseXML(encoded);
			} catch (e) {
				if (e && typeof e === "object") Object.defineProperty(e, "$responseBodyText", { value: encoded });
				throw e;
			}
			const textNodeName = "#text";
			const key = Object.keys(parsedObj)[0];
			const parsedObjToReturn = parsedObj[key];
			if (parsedObjToReturn[textNodeName]) {
				parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
				delete parsedObjToReturn[textNodeName];
			}
			return smithyClient.getValueFromTextNode(parsedObjToReturn);
		}
		return {};
	});
	var parseXmlErrorBody = async (errorBody, context) => {
		const value = await parseXmlBody(errorBody, context);
		if (value.Error) value.Error.message = value.Error.message ?? value.Error.Message;
		return value;
	};
	var loadRestXmlErrorCode = (output, data) => {
		if (data?.Error?.Code !== void 0) return data.Error.Code;
		if (data?.Code !== void 0) return data.Code;
		if (output.statusCode == 404) return "NotFound";
	};
	var XmlShapeSerializer = class extends SerdeContextConfig {
		settings;
		stringBuffer;
		byteBuffer;
		buffer;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		write(schema$1, value) {
			const ns = schema.NormalizedSchema.of(schema$1);
			if (ns.isStringSchema() && typeof value === "string") this.stringBuffer = value;
			else if (ns.isBlobSchema()) this.byteBuffer = "byteLength" in value ? value : (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(value);
			else {
				this.buffer = this.writeStruct(ns, value, void 0);
				const traits = ns.getMergedTraits();
				if (traits.httpPayload && !traits.xmlName) this.buffer.withName(ns.getName());
			}
		}
		flush() {
			if (this.byteBuffer !== void 0) {
				const bytes = this.byteBuffer;
				delete this.byteBuffer;
				return bytes;
			}
			if (this.stringBuffer !== void 0) {
				const str = this.stringBuffer;
				delete this.stringBuffer;
				return str;
			}
			const buffer = this.buffer;
			if (this.settings.xmlNamespace) {
				if (!buffer?.attributes?.["xmlns"]) buffer.addAttribute("xmlns", this.settings.xmlNamespace);
			}
			delete this.buffer;
			return buffer.toString();
		}
		writeStruct(ns, value, parentXmlns) {
			const traits = ns.getMergedTraits();
			const name = ns.isMemberSchema() && !traits.httpPayload ? ns.getMemberTraits().xmlName ?? ns.getMemberName() : traits.xmlName ?? ns.getName();
			if (!name || !ns.isStructSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write struct with empty name or non-struct, schema=${ns.getName(true)}.`);
			const structXmlNode = xmlBuilder.XmlNode.of(name);
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
			for (const [memberName, memberSchema] of ns.structIterator()) {
				const val = value[memberName];
				if (val != null || memberSchema.isIdempotencyToken()) {
					if (memberSchema.getMergedTraits().xmlAttribute) {
						structXmlNode.addAttribute(memberSchema.getMergedTraits().xmlName ?? memberName, this.writeSimple(memberSchema, val));
						continue;
					}
					if (memberSchema.isListSchema()) this.writeList(memberSchema, val, structXmlNode, xmlns);
					else if (memberSchema.isMapSchema()) this.writeMap(memberSchema, val, structXmlNode, xmlns);
					else if (memberSchema.isStructSchema()) structXmlNode.addChildNode(this.writeStruct(memberSchema, val, xmlns));
					else {
						const memberNode = xmlBuilder.XmlNode.of(memberSchema.getMergedTraits().xmlName ?? memberSchema.getMemberName());
						this.writeSimpleInto(memberSchema, val, memberNode, xmlns);
						structXmlNode.addChildNode(memberNode);
					}
				}
			}
			const { $unknown } = value;
			if ($unknown && ns.isUnionSchema() && Array.isArray($unknown) && Object.keys(value).length === 1) {
				const [k, v] = $unknown;
				const node = xmlBuilder.XmlNode.of(k);
				if (typeof v !== "string") if (value instanceof xmlBuilder.XmlNode || value instanceof xmlBuilder.XmlText) structXmlNode.addChildNode(value);
				else throw new Error("@aws-sdk - $unknown union member in XML requires value of type string, @aws-sdk/xml-builder::XmlNode or XmlText.");
				this.writeSimpleInto(0, v, node, xmlns);
				structXmlNode.addChildNode(node);
			}
			if (xmlns) structXmlNode.addAttribute(xmlnsAttr, xmlns);
			return structXmlNode;
		}
		writeList(listMember, array, container, parentXmlns) {
			if (!listMember.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${listMember.getName(true)}`);
			const listTraits = listMember.getMergedTraits();
			const listValueSchema = listMember.getValueSchema();
			const listValueTraits = listValueSchema.getMergedTraits();
			const sparse = !!listValueTraits.sparse;
			const flat = !!listTraits.xmlFlattened;
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(listMember, parentXmlns);
			const writeItem = (container, value) => {
				if (listValueSchema.isListSchema()) this.writeList(listValueSchema, Array.isArray(value) ? value : [value], container, xmlns);
				else if (listValueSchema.isMapSchema()) this.writeMap(listValueSchema, value, container, xmlns);
				else if (listValueSchema.isStructSchema()) {
					const struct = this.writeStruct(listValueSchema, value, xmlns);
					container.addChildNode(struct.withName(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member"));
				} else {
					const listItemNode = xmlBuilder.XmlNode.of(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member");
					this.writeSimpleInto(listValueSchema, value, listItemNode, xmlns);
					container.addChildNode(listItemNode);
				}
			};
			if (flat) {
				for (const value of array) if (sparse || value != null) writeItem(container, value);
			} else {
				const listNode = xmlBuilder.XmlNode.of(listTraits.xmlName ?? listMember.getMemberName());
				if (xmlns) listNode.addAttribute(xmlnsAttr, xmlns);
				for (const value of array) if (sparse || value != null) writeItem(listNode, value);
				container.addChildNode(listNode);
			}
		}
		writeMap(mapMember, map, container, parentXmlns, containerIsMap = false) {
			if (!mapMember.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${mapMember.getName(true)}`);
			const mapTraits = mapMember.getMergedTraits();
			const mapKeySchema = mapMember.getKeySchema();
			const keyTag = mapKeySchema.getMergedTraits().xmlName ?? "key";
			const mapValueSchema = mapMember.getValueSchema();
			const mapValueTraits = mapValueSchema.getMergedTraits();
			const valueTag = mapValueTraits.xmlName ?? "value";
			const sparse = !!mapValueTraits.sparse;
			const flat = !!mapTraits.xmlFlattened;
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(mapMember, parentXmlns);
			const addKeyValue = (entry, key, val) => {
				const keyNode = xmlBuilder.XmlNode.of(keyTag, key);
				const [keyXmlnsAttr, keyXmlns] = this.getXmlnsAttribute(mapKeySchema, xmlns);
				if (keyXmlns) keyNode.addAttribute(keyXmlnsAttr, keyXmlns);
				entry.addChildNode(keyNode);
				let valueNode = xmlBuilder.XmlNode.of(valueTag);
				if (mapValueSchema.isListSchema()) this.writeList(mapValueSchema, val, valueNode, xmlns);
				else if (mapValueSchema.isMapSchema()) this.writeMap(mapValueSchema, val, valueNode, xmlns, true);
				else if (mapValueSchema.isStructSchema()) valueNode = this.writeStruct(mapValueSchema, val, xmlns);
				else this.writeSimpleInto(mapValueSchema, val, valueNode, xmlns);
				entry.addChildNode(valueNode);
			};
			if (flat) {
				for (const [key, val] of Object.entries(map)) if (sparse || val != null) {
					const entry = xmlBuilder.XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
					addKeyValue(entry, key, val);
					container.addChildNode(entry);
				}
			} else {
				let mapNode;
				if (!containerIsMap) {
					mapNode = xmlBuilder.XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
					if (xmlns) mapNode.addAttribute(xmlnsAttr, xmlns);
					container.addChildNode(mapNode);
				}
				for (const [key, val] of Object.entries(map)) if (sparse || val != null) {
					const entry = xmlBuilder.XmlNode.of("entry");
					addKeyValue(entry, key, val);
					(containerIsMap ? container : mapNode).addChildNode(entry);
				}
			}
		}
		writeSimple(_schema, value) {
			if (null === value) throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
			const ns = schema.NormalizedSchema.of(_schema);
			let nodeContents = null;
			if (value && typeof value === "object") if (ns.isBlobSchema()) nodeContents = (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
			else if (ns.isTimestampSchema() && value instanceof Date) switch (protocols.determineTimestampFormat(ns, this.settings)) {
				case 5:
					nodeContents = value.toISOString().replace(".000Z", "Z");
					break;
				case 6:
					nodeContents = smithyClient.dateToUtcString(value);
					break;
				case 7:
					nodeContents = String(value.getTime() / 1e3);
					break;
				default:
					console.warn("Missing timestamp format, using http date", value);
					nodeContents = smithyClient.dateToUtcString(value);
					break;
			}
			else if (ns.isBigDecimalSchema() && value) {
				if (value instanceof serde.NumericValue) return value.string;
				return String(value);
			} else if (ns.isMapSchema() || ns.isListSchema()) throw new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.");
			else throw new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${ns.getName(true)}`);
			if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isBigIntegerSchema() || ns.isBigDecimalSchema()) nodeContents = String(value);
			if (ns.isStringSchema()) if (value === void 0 && ns.isIdempotencyToken()) nodeContents = serde.generateIdempotencyToken();
			else nodeContents = String(value);
			if (nodeContents === null) throw new Error(`Unhandled schema-value pair ${ns.getName(true)}=${value}`);
			return nodeContents;
		}
		writeSimpleInto(_schema, value, into, parentXmlns) {
			const nodeContents = this.writeSimple(_schema, value);
			const ns = schema.NormalizedSchema.of(_schema);
			const content = new xmlBuilder.XmlText(nodeContents);
			const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
			if (xmlns) into.addAttribute(xmlnsAttr, xmlns);
			into.addChildNode(content);
		}
		getXmlnsAttribute(ns, parentXmlns) {
			const [prefix, xmlns] = ns.getMergedTraits().xmlNamespace ?? [];
			if (xmlns && xmlns !== parentXmlns) return [prefix ? `xmlns:${prefix}` : "xmlns", xmlns];
			return [void 0, void 0];
		}
	};
	var XmlCodec = class extends SerdeContextConfig {
		settings;
		constructor(settings) {
			super();
			this.settings = settings;
		}
		createSerializer() {
			const serializer = new XmlShapeSerializer(this.settings);
			serializer.setSerdeContext(this.serdeContext);
			return serializer;
		}
		createDeserializer() {
			const deserializer = new XmlShapeDeserializer(this.settings);
			deserializer.setSerdeContext(this.serdeContext);
			return deserializer;
		}
	};
	var AwsRestXmlProtocol = class extends protocols.HttpBindingProtocol {
		codec;
		serializer;
		deserializer;
		mixin = new ProtocolLib();
		constructor(options) {
			super(options);
			const settings = {
				timestampFormat: {
					useTrait: true,
					default: 5
				},
				httpBindings: true,
				xmlNamespace: options.xmlNamespace,
				serviceNamespace: options.defaultNamespace
			};
			this.codec = new XmlCodec(settings);
			this.serializer = new protocols.HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
			this.deserializer = new protocols.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
		}
		getPayloadCodec() {
			return this.codec;
		}
		getShapeId() {
			return "aws.protocols#restXml";
		}
		async serializeRequest(operationSchema, input, context) {
			const request = await super.serializeRequest(operationSchema, input, context);
			const inputSchema = schema.NormalizedSchema.of(operationSchema.input);
			if (!request.headers["content-type"]) {
				const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
				if (contentType) request.headers["content-type"] = contentType;
			}
			if (typeof request.body === "string" && request.headers["content-type"] === this.getDefaultContentType() && !request.body.startsWith("<?xml ") && !this.hasUnstructuredPayloadBinding(inputSchema)) request.body = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + request.body;
			return request;
		}
		async deserializeResponse(operationSchema, context, response) {
			return super.deserializeResponse(operationSchema, context, response);
		}
		async handleError(operationSchema, context, response, dataObject, metadata) {
			const errorIdentifier = loadRestXmlErrorCode(response, dataObject) ?? "Unknown";
			if (dataObject.Error && typeof dataObject.Error === "object") for (const key of Object.keys(dataObject.Error)) {
				dataObject[key] = dataObject.Error[key];
				if (key.toLowerCase() === "message") dataObject.message = dataObject.Error[key];
			}
			if (dataObject.RequestId && !metadata.requestId) metadata.requestId = dataObject.RequestId;
			const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
			const ns = schema.NormalizedSchema.of(errorSchema);
			const message = dataObject.Error?.message ?? dataObject.Error?.Message ?? dataObject.message ?? dataObject.Message ?? "Unknown";
			const exception = new ((schema.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema)) ?? Error)(message);
			await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
			const output = {};
			for (const [name, member] of ns.structIterator()) {
				const target = member.getMergedTraits().xmlName ?? name;
				const value = dataObject.Error?.[target] ?? dataObject[target];
				output[name] = this.codec.createDeserializer().readSchema(member, value);
			}
			throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
				$fault: ns.getMergedTraits().error,
				message
			}, output), dataObject);
		}
		getDefaultContentType() {
			return "application/xml";
		}
		hasUnstructuredPayloadBinding(ns) {
			for (const [, member] of ns.structIterator()) if (member.getMergedTraits().httpPayload) return !(member.isStructSchema() || member.isMapSchema() || member.isListSchema());
			return false;
		}
	};
	exports.AwsEc2QueryProtocol = AwsEc2QueryProtocol;
	exports.AwsJson1_0Protocol = AwsJson1_0Protocol;
	exports.AwsJson1_1Protocol = AwsJson1_1Protocol;
	exports.AwsJsonRpcProtocol = AwsJsonRpcProtocol;
	exports.AwsQueryProtocol = AwsQueryProtocol;
	exports.AwsRestJsonProtocol = AwsRestJsonProtocol;
	exports.AwsRestXmlProtocol = AwsRestXmlProtocol;
	exports.AwsSmithyRpcV2CborProtocol = AwsSmithyRpcV2CborProtocol;
	exports.JsonCodec = JsonCodec;
	exports.JsonShapeDeserializer = JsonShapeDeserializer;
	exports.JsonShapeSerializer = JsonShapeSerializer;
	exports.XmlCodec = XmlCodec;
	exports.XmlShapeDeserializer = XmlShapeDeserializer;
	exports.XmlShapeSerializer = XmlShapeSerializer;
	exports._toBool = _toBool;
	exports._toNum = _toNum;
	exports._toStr = _toStr;
	exports.awsExpectUnion = awsExpectUnion;
	exports.loadRestJsonErrorCode = loadRestJsonErrorCode;
	exports.loadRestXmlErrorCode = loadRestXmlErrorCode;
	exports.parseJsonBody = parseJsonBody;
	exports.parseJsonErrorBody = parseJsonErrorBody;
	exports.parseXmlBody = parseXmlBody;
	exports.parseXmlErrorBody = parseXmlErrorBody;
}));
var import_protocols = require_protocols();
init_dist_es$23();
init_dist_es$15();
init_dist_es$35();
init_dist_es$29();
init_dist_es$36();
const getRuntimeConfig$1 = (config) => {
	return {
		apiVersion: "2006-03-01",
		base64Decoder: config?.base64Decoder ?? fromBase64,
		base64Encoder: config?.base64Encoder ?? toBase64,
		disableHostPrefix: config?.disableHostPrefix ?? false,
		endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
		extensions: config?.extensions ?? [],
		getAwsChunkedEncodingStream: config?.getAwsChunkedEncodingStream ?? getAwsChunkedEncodingStream,
		httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultS3HttpAuthSchemeProvider,
		httpAuthSchemes: config?.httpAuthSchemes ?? [{
			schemeId: "aws.auth#sigv4",
			identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
			signer: new import_dist_cjs$4.AwsSdkSigV4Signer()
		}, {
			schemeId: "aws.auth#sigv4a",
			identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
			signer: new import_dist_cjs$4.AwsSdkSigV4ASigner()
		}],
		logger: config?.logger ?? new NoOpLogger(),
		protocol: config?.protocol ?? import_protocols.AwsRestXmlProtocol,
		protocolSettings: config?.protocolSettings ?? {
			defaultNamespace: "com.amazonaws.s3",
			errorTypeRegistries,
			xmlNamespace: "http://s3.amazonaws.com/doc/2006-03-01/",
			version: "2006-03-01",
			serviceTarget: "AmazonS3"
		},
		sdkStreamMixin: config?.sdkStreamMixin ?? sdkStreamMixin,
		serviceId: config?.serviceId ?? "S3",
		signerConstructor: config?.signerConstructor ?? SignatureV4MultiRegion,
		signingEscapePath: config?.signingEscapePath ?? false,
		urlParser: config?.urlParser ?? parseUrl,
		useArnRegion: config?.useArnRegion ?? void 0,
		utf8Decoder: config?.utf8Decoder ?? fromUtf8,
		utf8Encoder: config?.utf8Encoder ?? toUtf8
	};
};
init_dist_es$4();
init_dist_es$12();
init_dist_es$3();
init_dist_es$5();
init_dist_es$9();
init_dist_es$32();
init_dist_es$23();
init_dist_es$2();
init_dist_es$1();
init_dist_es$6();
const getRuntimeConfig = (config) => {
	emitWarningIfUnsupportedVersion(process.version);
	const defaultsMode = resolveDefaultsModeConfig(config);
	const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
	const clientSharedValues = getRuntimeConfig$1(config);
	(0, import_dist_cjs$4.emitWarningIfUnsupportedVersion)(process.version);
	const loaderConfig = {
		profile: config?.profile,
		logger: clientSharedValues.logger
	};
	return {
		...clientSharedValues,
		...config,
		runtime: "node",
		defaultsMode,
		authSchemePreference: config?.authSchemePreference ?? loadConfig(import_dist_cjs$4.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
		bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
		credentialDefaultProvider: config?.credentialDefaultProvider ?? defaultProvider,
		defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({
			serviceId: clientSharedValues.serviceId,
			clientVersion: package_default.version
		}),
		disableS3ExpressSessionAuth: config?.disableS3ExpressSessionAuth ?? loadConfig(NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS, loaderConfig),
		eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? eventStreamSerdeProvider,
		maxAttempts: config?.maxAttempts ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
		md5: config?.md5 ?? Hash.bind(null, "md5"),
		region: config?.region ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, {
			...NODE_REGION_CONFIG_FILE_OPTIONS,
			...loaderConfig
		}),
		requestChecksumCalculation: config?.requestChecksumCalculation ?? loadConfig(NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS, loaderConfig),
		requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
		responseChecksumValidation: config?.responseChecksumValidation ?? loadConfig(NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS, loaderConfig),
		retryMode: config?.retryMode ?? loadConfig({
			...NODE_RETRY_MODE_CONFIG_OPTIONS,
			default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
		}, config),
		sha1: config?.sha1 ?? Hash.bind(null, "sha1"),
		sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
		sigv4aSigningRegionSet: config?.sigv4aSigningRegionSet ?? loadConfig(import_dist_cjs$4.NODE_SIGV4A_CONFIG_OPTIONS, loaderConfig),
		streamCollector: config?.streamCollector ?? streamCollector$1,
		streamHasher: config?.streamHasher ?? readableStreamHasher,
		useArnRegion: config?.useArnRegion ?? loadConfig(NODE_USE_ARN_REGION_CONFIG_OPTIONS, loaderConfig),
		useDualstackEndpoint: config?.useDualstackEndpoint ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		useFipsEndpoint: config?.useFipsEndpoint ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		userAgentAppId: config?.userAgentAppId ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
	};
};
var getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration;
var init_extensions = __esmMin((() => {
	getAwsRegionExtensionConfiguration = (runtimeConfig) => {
		return {
			setRegion(region) {
				runtimeConfig.region = region;
			},
			region() {
				return runtimeConfig.region;
			}
		};
	};
	resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
		return { region: awsRegionExtensionConfiguration.region() };
	};
}));
var init_awsRegionConfig = __esmMin((() => {
	init_dist_es$12();
}));
function stsRegionDefaultResolver(loaderConfig = {}) {
	return loadConfig({
		...NODE_REGION_CONFIG_OPTIONS,
		async default() {
			if (!warning.silence) console.warn("@aws-sdk - WARN - default STS region of us-east-1 used. See @aws-sdk/credential-providers README and set a region explicitly.");
			return "us-east-1";
		}
	}, {
		...NODE_REGION_CONFIG_FILE_OPTIONS,
		...loaderConfig
	});
}
var warning;
var init_stsRegionDefaultResolver = __esmMin((() => {
	init_dist_es$12();
	init_dist_es$9();
	warning = { silence: false };
}));
var dist_es_exports = /* @__PURE__ */ __exportAll({
	NODE_REGION_CONFIG_FILE_OPTIONS: () => NODE_REGION_CONFIG_FILE_OPTIONS,
	NODE_REGION_CONFIG_OPTIONS: () => NODE_REGION_CONFIG_OPTIONS,
	REGION_ENV_NAME: () => REGION_ENV_NAME,
	REGION_INI_NAME: () => REGION_INI_NAME,
	getAwsRegionExtensionConfiguration: () => getAwsRegionExtensionConfiguration,
	resolveAwsRegionExtensionConfiguration: () => resolveAwsRegionExtensionConfiguration,
	resolveRegionConfig: () => resolveRegionConfig,
	stsRegionDefaultResolver: () => stsRegionDefaultResolver,
	warning: () => warning
});
var init_dist_es = __esmMin((() => {
	init_extensions();
	init_awsRegionConfig();
	init_stsRegionDefaultResolver();
}));
const getHttpAuthExtensionConfiguration = (runtimeConfig) => {
	const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
	let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
	let _credentials = runtimeConfig.credentials;
	return {
		setHttpAuthScheme(httpAuthScheme) {
			const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
			if (index === -1) _httpAuthSchemes.push(httpAuthScheme);
			else _httpAuthSchemes.splice(index, 1, httpAuthScheme);
		},
		httpAuthSchemes() {
			return _httpAuthSchemes;
		},
		setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
			_httpAuthSchemeProvider = httpAuthSchemeProvider;
		},
		httpAuthSchemeProvider() {
			return _httpAuthSchemeProvider;
		},
		setCredentials(credentials) {
			_credentials = credentials;
		},
		credentials() {
			return _credentials;
		}
	};
};
const resolveHttpAuthRuntimeConfig = (config) => {
	return {
		httpAuthSchemes: config.httpAuthSchemes(),
		httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
		credentials: config.credentials()
	};
};
init_dist_es();
init_dist_es$41();
init_dist_es$23();
const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
	const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
	extensions.forEach((extension) => extension.configure(extensionConfiguration));
	return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};
init_dist_es$21();
init_dist_es$20();
init_dist_es$19();
init_dist_es$13();
init_dist_es$12();
init_dist_es$11();
init_dist_es$8();
init_dist_es$5();
init_dist_es$23();
var S3Client = class extends Client {
	config;
	constructor(...[configuration]) {
		const _config_0 = getRuntimeConfig(configuration || {});
		super(_config_0);
		this.initConfig = _config_0;
		this.config = resolveRuntimeExtensions(resolveS3Config(resolveHttpAuthSchemeConfig(resolveEventStreamSerdeConfig(resolveEndpointConfig(resolveHostHeaderConfig(resolveRegionConfig(resolveRetryConfig(resolveFlexibleChecksumsConfig(resolveUserAgentConfig(resolveClientEndpointParameters(_config_0))))))))), { session: [() => this, CreateSessionCommand] }), configuration?.extensions || []);
		this.middlewareStack.use((0, import_schema.getSchemaSerdePlugin)(this.config));
		this.middlewareStack.use(getUserAgentPlugin(this.config));
		this.middlewareStack.use(getRetryPlugin(this.config));
		this.middlewareStack.use(getContentLengthPlugin(this.config));
		this.middlewareStack.use(getHostHeaderPlugin(this.config));
		this.middlewareStack.use(getLoggerPlugin(this.config));
		this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
		this.middlewareStack.use((0, import_dist_cjs$3.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
			httpAuthSchemeParametersProvider: defaultS3HttpAuthSchemeParametersProvider,
			identityProviderConfigProvider: async (config) => new import_dist_cjs$3.DefaultIdentityProviderConfig({
				"aws.auth#sigv4": config.credentials,
				"aws.auth#sigv4a": config.credentials
			})
		}));
		this.middlewareStack.use((0, import_dist_cjs$3.getHttpSigningPlugin)(this.config));
		this.middlewareStack.use(getValidateBucketNamePlugin(this.config));
		this.middlewareStack.use(getAddExpectContinuePlugin(this.config));
		this.middlewareStack.use(getRegionRedirectMiddlewarePlugin(this.config));
		this.middlewareStack.use(getS3ExpressPlugin(this.config));
		this.middlewareStack.use(getS3ExpressHttpSigningPlugin(this.config));
	}
	destroy() {
		super.destroy();
	}
};
function ssecMiddleware(options) {
	return (next) => async (args) => {
		const input = { ...args.input };
		for (const prop of [{
			target: "SSECustomerKey",
			hash: "SSECustomerKeyMD5"
		}, {
			target: "CopySourceSSECustomerKey",
			hash: "CopySourceSSECustomerKeyMD5"
		}]) {
			const value = input[prop.target];
			if (value) {
				let valueForHash;
				if (typeof value === "string") if (isValidBase64EncodedSSECustomerKey(value, options)) valueForHash = options.base64Decoder(value);
				else {
					valueForHash = options.utf8Decoder(value);
					input[prop.target] = options.base64Encoder(valueForHash);
				}
				else {
					valueForHash = ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength) : new Uint8Array(value);
					input[prop.target] = options.base64Encoder(valueForHash);
				}
				const hash = new options.md5();
				hash.update(valueForHash);
				input[prop.hash] = options.base64Encoder(await hash.digest());
			}
		}
		return next({
			...args,
			input
		});
	};
}
const ssecMiddlewareOptions = {
	name: "ssecMiddleware",
	step: "initialize",
	tags: ["SSE"],
	override: true
};
const getSsecPlugin = (config) => ({ applyToStack: (clientStack) => {
	clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
} });
function isValidBase64EncodedSSECustomerKey(str, options) {
	if (!/^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str)) return false;
	try {
		return options.base64Decoder(str).length === 32;
	} catch {
		return false;
	}
}
init_dist_es$8();
init_dist_es$23();
var DeleteObjectCommand = class extends Command.classBuilder().ep({
	...commonParams,
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	},
	Key: {
		type: "contextParams",
		name: "Key"
	}
}).m(function(Command, cs, config, o) {
	return [getEndpointPlugin(config, Command.getEndpointParameterInstructions()), getThrow200ExceptionsPlugin(config)];
}).s("AmazonS3", "DeleteObject", {}).n("S3Client", "DeleteObjectCommand").sc(DeleteObject$).build() {};
init_dist_es$8();
init_dist_es$23();
var GetObjectCommand = class extends Command.classBuilder().ep({
	...commonParams,
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	},
	Key: {
		type: "contextParams",
		name: "Key"
	}
}).m(function(Command, cs, config, o) {
	return [
		getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
		getFlexibleChecksumsPlugin(config, {
			requestChecksumRequired: false,
			requestValidationModeMember: "ChecksumMode",
			"responseAlgorithms": [
				"CRC64NVME",
				"CRC32",
				"CRC32C",
				"SHA256",
				"SHA1"
			]
		}),
		getSsecPlugin(config),
		getS3ExpiresMiddlewarePlugin(config)
	];
}).s("AmazonS3", "GetObject", {}).n("S3Client", "GetObjectCommand").sc(GetObject$).build() {};
init_dist_es$8();
init_dist_es$23();
var ListObjectsV2Command = class extends Command.classBuilder().ep({
	...commonParams,
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	},
	Prefix: {
		type: "contextParams",
		name: "Prefix"
	}
}).m(function(Command, cs, config, o) {
	return [getEndpointPlugin(config, Command.getEndpointParameterInstructions()), getThrow200ExceptionsPlugin(config)];
}).s("AmazonS3", "ListObjectsV2", {}).n("S3Client", "ListObjectsV2Command").sc(ListObjectsV2$).build() {};
init_dist_es$8();
init_dist_es$23();
var PutObjectCommand = class extends Command.classBuilder().ep({
	...commonParams,
	Bucket: {
		type: "contextParams",
		name: "Bucket"
	},
	Key: {
		type: "contextParams",
		name: "Key"
	}
}).m(function(Command, cs, config, o) {
	return [
		getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
		getFlexibleChecksumsPlugin(config, {
			requestAlgorithmMember: {
				"httpHeader": "x-amz-sdk-checksum-algorithm",
				"name": "ChecksumAlgorithm"
			},
			requestChecksumRequired: false
		}),
		getCheckContentLengthHeaderPlugin(config),
		getThrow200ExceptionsPlugin(config),
		getSsecPlugin(config)
	];
}).s("AmazonS3", "PutObject", {}).n("S3Client", "PutObjectCommand").sc(PutObject$).build() {};
export { getSSOTokenFilepath as $, require_dist_cjs$1 as $t, fromEnv as A, init_dist_es$20 as At, dist_es_exports$7 as B, getDefaultExtensionConfiguration as Bt, createDefaultUserAgentProvider as C, resolveHttpHandlerRuntimeConfig as Cn, customEndpointFunctions as Ct, ENV_KEY as D, init_dist_es$19 as Dt, ENV_EXPIRATION as E, dist_es_exports$15 as Et, NODE_RETRY_MODE_CONFIG_OPTIONS as F, resolveHostHeaderConfig as Ft, init_dist_es$9 as G, Command as Gt, resolveEndpointConfig as H, emitWarningIfUnsupportedVersion as Ht, resolveRetryConfig as I, require_dist_cjs as It, externalDataInterceptor as J, init_dist_es$27 as Jt, loadConfig as K, Client as Kt, dist_es_exports$6 as L, dist_es_exports$19 as Lt, init_dist_es$5 as M, dist_es_exports$17 as Mt, getRetryPlugin as N, getHostHeaderPlugin as Nt, ENV_SECRET as O, getRecursionDetectionPlugin as Ot, NODE_MAX_ATTEMPT_CONFIG_OPTIONS as P, init_dist_es$21 as Pt, getSSOTokenFromFile as Q, ProviderError as Qt, init_dist_es$6 as R, init_dist_es$23 as Rt, NODE_APP_ID_CONFIG_OPTIONS as S, getHttpHandlerExtensionConfiguration as Sn, resolveEndpoint as St, ENV_CREDENTIAL_SCOPE as T, resolveUserAgentConfig as Tt, getEndpointPlugin as U, loadConfigsForDefaultMode as Ut, init_dist_es$8 as V, resolveDefaultRuntimeConfig as Vt, dist_es_exports$8 as W, ServiceException as Wt, loadSsoSessionData as X, TokenProviderError as Xt, parseKnownFiles as Y, chain as Yt, readFile$2 as Z, CredentialsProviderError as Zt, Hash as _, normalizeProvider$1 as _n, init_dist_es$15 as _t, S3Client as a, streamCollector$1 as an, init_dist_es$12 as at, dist_es_exports$4 as b, init_dist_es$41 as bn, dist_es_exports$14 as bt, getAwsRegionExtensionConfiguration as c, init_dist_es$35 as cn, NODE_REGION_CONFIG_OPTIONS as ct, dist_es_exports$1 as d, init_dist_es$36 as dn, dist_es_exports$11 as dt, require_schema as en, getProfileName as et, init_dist_es$1 as f, toUtf8 as fn, init_dist_es$13 as ft, calculateBodyLength as g, init_dist_es$40 as gn, dist_es_exports$13 as gt, init_dist_es$2 as h, dist_es_exports$29 as hn, init_dist_es$14 as ht, DeleteObjectCommand as i, init_dist_es$32 as in, dist_es_exports$10 as it, dist_es_exports$5 as j, getLoggerPlugin as jt, ENV_SESSION as k, dist_es_exports$16 as kt, resolveAwsRegionExtensionConfiguration as l, toBase64 as ln, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS as lt, dist_es_exports$2 as m, fromBase64 as mn, dist_es_exports$12 as mt, ListObjectsV2Command as n, sdkStreamMixin as nn, getContentLengthPlugin as nt, dist_es_exports as o, NodeHttpHandler as on, resolveRegionConfig as ot, resolveDefaultsModeConfig as p, fromUtf8 as pn, getUserAgentPlugin as pt, init_dist_es$10 as q, require_client as qt, GetObjectCommand as r, dist_es_exports$25 as rn, init_dist_es$11 as rt, init_dist_es as s, dist_es_exports$26 as sn, NODE_REGION_CONFIG_FILE_OPTIONS as st, PutObjectCommand as t, init_dist_es$29 as tn, dist_es_exports$9 as tt, require_protocols as u, dist_es_exports$27 as un, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS as ut, dist_es_exports$3 as v, getSmithyContext as vn, parseUrl as vt, ENV_ACCOUNT_ID as w, EndpointCache as wt, init_dist_es$4 as x, HttpRequest as xn, init_dist_es$17 as xt, init_dist_es$3 as y, dist_es_exports$30 as yn, awsEndpointFunctions as yt, DEFAULT_RETRY_MODE as z, NoOpLogger as zt };

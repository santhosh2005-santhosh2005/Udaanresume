import { n as __esmMin, o as __toCommonJS, r as __exportAll, t as __commonJSMin } from "../_runtime.mjs";
import { p as require_tslib } from "./@aws-crypto/crc32+[...].mjs";
import { $t as require_dist_cjs$1, At as init_dist_es$17, B as dist_es_exports$21, Dt as init_dist_es$18, Et as dist_es_exports$18, G as init_dist_es$11, It as require_dist_cjs, L as dist_es_exports$15, Lt as dist_es_exports$3, M as init_dist_es$10, Mt as dist_es_exports$16, Pt as init_dist_es$16, R as init_dist_es$15, Rt as init_dist_es$3, V as init_dist_es$21, W as dist_es_exports$11, _t as init_dist_es$4, at as init_dist_es$8, b as dist_es_exports$7, bn as init_dist_es$23, bt as dist_es_exports$2, cn as init_dist_es$5, d as dist_es_exports$14, dn as init_dist_es$6, dt as dist_es_exports$19, en as require_schema, f as init_dist_es$14, ft as init_dist_es$19, gn as init_dist_es, gt as dist_es_exports$4, h as init_dist_es$13, hn as dist_es_exports, ht as init_dist_es$1, in as init_dist_es$12, it as dist_es_exports$8, j as dist_es_exports$10, kt as dist_es_exports$17, m as dist_es_exports$13, mt as dist_es_exports$1, o as dist_es_exports$22, qt as require_client, rn as dist_es_exports$12, rt as init_dist_es$20, s as init_dist_es$22, sn as dist_es_exports$5, tt as dist_es_exports$20, u as require_protocols, un as dist_es_exports$6, v as dist_es_exports$9, x as init_dist_es$7, xt as init_dist_es$2, y as init_dist_es$9, yn as dist_es_exports$23 } from "./@aws-sdk/client-s3+[...].mjs";
var require_httpAuthSchemeProvider$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthSchemeConfig = exports.defaultSigninHttpAuthSchemeProvider = exports.defaultSigninHttpAuthSchemeParametersProvider = void 0;
	var core_1 = require_dist_cjs();
	var util_middleware_1 = (init_dist_es(), __toCommonJS(dist_es_exports));
	var defaultSigninHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: (0, util_middleware_1.getSmithyContext)(context).operation,
			region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	exports.defaultSigninHttpAuthSchemeParametersProvider = defaultSigninHttpAuthSchemeParametersProvider;
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "signin",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createSmithyApiNoAuthHttpAuthOption(authParameters) {
		return { schemeId: "smithy.api#noAuth" };
	}
	var defaultSigninHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "CreateOAuth2Token":
				options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	exports.defaultSigninHttpAuthSchemeProvider = defaultSigninHttpAuthSchemeProvider;
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = (0, core_1.resolveAwsSdkSigV4Config)(config);
		return Object.assign(config_0, { authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? []) });
	};
	exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
}));
var package_exports = /* @__PURE__ */ __exportAll({
	author: () => author,
	browser: () => browser,
	default: () => package_default,
	dependencies: () => dependencies,
	description: () => description,
	devDependencies: () => devDependencies,
	engines: () => engines,
	exports: () => exports$1,
	files: () => files,
	homepage: () => homepage,
	license: () => license,
	main: () => main,
	module: () => module,
	name: () => name,
	repository: () => repository,
	scripts: () => scripts,
	sideEffects: () => false,
	types: () => types,
	typesVersions: () => typesVersions,
	version: () => version
}), name, version, description, main, module, types, scripts, engines, author, license, dependencies, devDependencies, typesVersions, files, browser, homepage, repository, exports$1, package_default;
var init_package = __esmMin((() => {
	name = "@aws-sdk/nested-clients";
	version = "3.990.0";
	description = "Nested clients for AWS SDK packages.";
	main = "./dist-cjs/index.js";
	module = "./dist-es/index.js";
	types = "./dist-types/index.d.ts";
	scripts = {
		"build": "yarn lint && concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs",
		"build:cjs": "node ../../scripts/compilation/inline nested-clients",
		"build:es": "tsc -p tsconfig.es.json",
		"build:include:deps": "yarn g:turbo run build -F=\"$npm_package_name\"",
		"build:types": "tsc -p tsconfig.types.json",
		"build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
		"clean": "premove dist-cjs dist-es dist-types tsconfig.cjs.tsbuildinfo tsconfig.es.tsbuildinfo tsconfig.types.tsbuildinfo",
		"lint": "node ../../scripts/validation/submodules-linter.js --pkg nested-clients",
		"test": "yarn g:vitest run",
		"test:watch": "yarn g:vitest watch"
	};
	engines = { "node": ">=20.0.0" };
	author = {
		"name": "AWS SDK for JavaScript Team",
		"url": "https://aws.amazon.com/javascript/"
	};
	license = "Apache-2.0";
	dependencies = {
		"@aws-crypto/sha256-browser": "5.2.0",
		"@aws-crypto/sha256-js": "5.2.0",
		"@aws-sdk/core": "^3.973.10",
		"@aws-sdk/middleware-host-header": "^3.972.3",
		"@aws-sdk/middleware-logger": "^3.972.3",
		"@aws-sdk/middleware-recursion-detection": "^3.972.3",
		"@aws-sdk/middleware-user-agent": "^3.972.10",
		"@aws-sdk/region-config-resolver": "^3.972.3",
		"@aws-sdk/types": "^3.973.1",
		"@aws-sdk/util-endpoints": "3.990.0",
		"@aws-sdk/util-user-agent-browser": "^3.972.3",
		"@aws-sdk/util-user-agent-node": "^3.972.8",
		"@smithy/config-resolver": "^4.4.6",
		"@smithy/core": "^3.23.0",
		"@smithy/fetch-http-handler": "^5.3.9",
		"@smithy/hash-node": "^4.2.8",
		"@smithy/invalid-dependency": "^4.2.8",
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
		"@smithy/util-utf8": "^4.2.0",
		"tslib": "^2.6.2"
	};
	devDependencies = {
		"concurrently": "7.0.0",
		"downlevel-dts": "0.10.1",
		"premove": "4.0.0",
		"typescript": "~5.8.3"
	};
	typesVersions = { "<4.0": { "dist-types/*": ["dist-types/ts3.4/*"] } };
	files = [
		"./signin.d.ts",
		"./signin.js",
		"./sso-oidc.d.ts",
		"./sso-oidc.js",
		"./sts.d.ts",
		"./sts.js",
		"dist-*/**"
	];
	browser = {
		"./dist-es/submodules/signin/runtimeConfig": "./dist-es/submodules/signin/runtimeConfig.browser",
		"./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser",
		"./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser"
	};
	homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients";
	repository = {
		"type": "git",
		"url": "https://github.com/aws/aws-sdk-js-v3.git",
		"directory": "packages/nested-clients"
	};
	exports$1 = {
		"./package.json": "./package.json",
		"./sso-oidc": {
			"types": "./dist-types/submodules/sso-oidc/index.d.ts",
			"module": "./dist-es/submodules/sso-oidc/index.js",
			"node": "./dist-cjs/submodules/sso-oidc/index.js",
			"import": "./dist-es/submodules/sso-oidc/index.js",
			"require": "./dist-cjs/submodules/sso-oidc/index.js"
		},
		"./sts": {
			"types": "./dist-types/submodules/sts/index.d.ts",
			"module": "./dist-es/submodules/sts/index.js",
			"node": "./dist-cjs/submodules/sts/index.js",
			"import": "./dist-es/submodules/sts/index.js",
			"require": "./dist-cjs/submodules/sts/index.js"
		},
		"./signin": {
			"types": "./dist-types/submodules/signin/index.d.ts",
			"module": "./dist-es/submodules/signin/index.js",
			"node": "./dist-cjs/submodules/signin/index.js",
			"import": "./dist-es/submodules/signin/index.js",
			"require": "./dist-cjs/submodules/signin/index.js"
		}
	};
	package_default = {
		name,
		version,
		description,
		main,
		module,
		types,
		scripts,
		engines,
		sideEffects: false,
		author,
		license,
		dependencies,
		devDependencies,
		typesVersions,
		files,
		browser,
		"react-native": {},
		homepage,
		repository,
		exports: exports$1
	};
}));
var require_ruleset$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ruleSet = void 0;
	var u = "required", v = "fn", w = "argv", x = "ref";
	var a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "stringEquals", i = {
		[u]: true,
		"default": false,
		"type": "boolean"
	}, j = {
		[u]: false,
		"type": "string"
	}, k = { [x]: "Endpoint" }, l = {
		[v]: c,
		[w]: [{ [x]: "UseFIPS" }, true]
	}, m = {
		[v]: c,
		[w]: [{ [x]: "UseDualStack" }, true]
	}, n = {}, o = {
		[v]: "getAttr",
		[w]: [{ [x]: g }, "name"]
	}, p = {
		[v]: c,
		[w]: [{ [x]: "UseFIPS" }, false]
	}, q = {
		[v]: c,
		[w]: [{ [x]: "UseDualStack" }, false]
	}, r = {
		[v]: "getAttr",
		[w]: [{ [x]: g }, "supportsFIPS"]
	}, s = {
		[v]: c,
		[w]: [true, {
			[v]: "getAttr",
			[w]: [{ [x]: g }, "supportsDualStack"]
		}]
	}, t = [{ [x]: "Region" }];
	exports.ruleSet = {
		version: "1.0",
		parameters: {
			UseDualStack: i,
			UseFIPS: i,
			Endpoint: j,
			Region: j
		},
		rules: [{
			conditions: [{
				[v]: b,
				[w]: [k]
			}],
			rules: [{
				conditions: [l],
				error: "Invalid Configuration: FIPS and custom endpoint are not supported",
				type: d
			}, {
				rules: [{
					conditions: [m],
					error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
					type: d
				}, {
					endpoint: {
						url: k,
						properties: n,
						headers: n
					},
					type: e
				}],
				type: f
			}],
			type: f
		}, {
			rules: [{
				conditions: [{
					[v]: b,
					[w]: t
				}],
				rules: [{
					conditions: [{
						[v]: "aws.partition",
						[w]: t,
						assign: g
					}],
					rules: [
						{
							conditions: [
								{
									[v]: h,
									[w]: [o, "aws"]
								},
								p,
								q
							],
							endpoint: {
								url: "https://{Region}.signin.aws.amazon.com",
								properties: n,
								headers: n
							},
							type: e
						},
						{
							conditions: [
								{
									[v]: h,
									[w]: [o, "aws-cn"]
								},
								p,
								q
							],
							endpoint: {
								url: "https://{Region}.signin.amazonaws.cn",
								properties: n,
								headers: n
							},
							type: e
						},
						{
							conditions: [
								{
									[v]: h,
									[w]: [o, "aws-us-gov"]
								},
								p,
								q
							],
							endpoint: {
								url: "https://{Region}.signin.amazonaws-us-gov.com",
								properties: n,
								headers: n
							},
							type: e
						},
						{
							conditions: [l, m],
							rules: [{
								conditions: [{
									[v]: c,
									[w]: [a, r]
								}, s],
								rules: [{
									endpoint: {
										url: "https://signin-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
										properties: n,
										headers: n
									},
									type: e
								}],
								type: f
							}, {
								error: "FIPS and DualStack are enabled, but this partition does not support one or both",
								type: d
							}],
							type: f
						},
						{
							conditions: [l, q],
							rules: [{
								conditions: [{
									[v]: c,
									[w]: [r, a]
								}],
								rules: [{
									endpoint: {
										url: "https://signin-fips.{Region}.{PartitionResult#dnsSuffix}",
										properties: n,
										headers: n
									},
									type: e
								}],
								type: f
							}, {
								error: "FIPS is enabled but this partition does not support FIPS",
								type: d
							}],
							type: f
						},
						{
							conditions: [p, m],
							rules: [{
								conditions: [s],
								rules: [{
									endpoint: {
										url: "https://signin.{Region}.{PartitionResult#dualStackDnsSuffix}",
										properties: n,
										headers: n
									},
									type: e
								}],
								type: f
							}, {
								error: "DualStack is enabled but this partition does not support DualStack",
								type: d
							}],
							type: f
						},
						{
							endpoint: {
								url: "https://signin.{Region}.{PartitionResult#dnsSuffix}",
								properties: n,
								headers: n
							},
							type: e
						}
					],
					type: f
				}],
				type: f
			}, {
				error: "Invalid Configuration: Missing Region",
				type: d
			}],
			type: f
		}]
	};
}));
var require_endpointResolver$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultEndpointResolver = void 0;
	var util_endpoints_1 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var util_endpoints_2 = (init_dist_es$2(), __toCommonJS(dist_es_exports$2));
	var ruleset_1 = require_ruleset$2();
	var cache = new util_endpoints_2.EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"Region",
			"UseDualStack",
			"UseFIPS"
		]
	});
	var defaultEndpointResolver = (endpointParams, context = {}) => {
		return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
			endpointParams,
			logger: context.logger
		}));
	};
	exports.defaultEndpointResolver = defaultEndpointResolver;
	util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
}));
var require_SigninServiceException = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SigninServiceException = exports.__ServiceException = void 0;
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__ServiceException", {
		enumerable: true,
		get: function() {
			return smithy_client_1.ServiceException;
		}
	});
	exports.SigninServiceException = class SigninServiceException extends smithy_client_1.ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SigninServiceException.prototype);
		}
	};
}));
var require_errors$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ValidationException = exports.TooManyRequestsError = exports.InternalServerException = exports.AccessDeniedException = void 0;
	var SigninServiceException_1 = require_SigninServiceException();
	exports.AccessDeniedException = class AccessDeniedException extends SigninServiceException_1.SigninServiceException {
		name = "AccessDeniedException";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "AccessDeniedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AccessDeniedException.prototype);
			this.error = opts.error;
		}
	};
	exports.InternalServerException = class InternalServerException extends SigninServiceException_1.SigninServiceException {
		name = "InternalServerException";
		$fault = "server";
		error;
		constructor(opts) {
			super({
				name: "InternalServerException",
				$fault: "server",
				...opts
			});
			Object.setPrototypeOf(this, InternalServerException.prototype);
			this.error = opts.error;
		}
	};
	exports.TooManyRequestsError = class TooManyRequestsError extends SigninServiceException_1.SigninServiceException {
		name = "TooManyRequestsError";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "TooManyRequestsError",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, TooManyRequestsError.prototype);
			this.error = opts.error;
		}
	};
	exports.ValidationException = class ValidationException extends SigninServiceException_1.SigninServiceException {
		name = "ValidationException";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "ValidationException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ValidationException.prototype);
			this.error = opts.error;
		}
	};
}));
var require_schemas_0$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateOAuth2Token$ = exports.CreateOAuth2TokenResponseBody$ = exports.CreateOAuth2TokenResponse$ = exports.CreateOAuth2TokenRequestBody$ = exports.CreateOAuth2TokenRequest$ = exports.AccessToken$ = exports.errorTypeRegistries = exports.ValidationException$ = exports.TooManyRequestsError$ = exports.InternalServerException$ = exports.AccessDeniedException$ = exports.SigninServiceException$ = void 0;
	var _ADE = "AccessDeniedException";
	var _AT = "AccessToken";
	var _COAT = "CreateOAuth2Token";
	var _COATR = "CreateOAuth2TokenRequest";
	var _COATRB = "CreateOAuth2TokenRequestBody";
	var _COATRBr = "CreateOAuth2TokenResponseBody";
	var _COATRr = "CreateOAuth2TokenResponse";
	var _ISE = "InternalServerException";
	var _RT = "RefreshToken";
	var _TMRE = "TooManyRequestsError";
	var _VE = "ValidationException";
	var _aKI = "accessKeyId";
	var _aT = "accessToken";
	var _c = "client";
	var _cI = "clientId";
	var _cV = "codeVerifier";
	var _co = "code";
	var _e = "error";
	var _eI = "expiresIn";
	var _gT = "grantType";
	var _h = "http";
	var _hE = "httpError";
	var _iT = "idToken";
	var _jN = "jsonName";
	var _m = "message";
	var _rT = "refreshToken";
	var _rU = "redirectUri";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.signin";
	var _sAK = "secretAccessKey";
	var _sT = "sessionToken";
	var _se = "server";
	var _tI = "tokenInput";
	var _tO = "tokenOutput";
	var _tT = "tokenType";
	var n0 = "com.amazonaws.signin";
	var schema_1 = require_schema();
	var errors_1 = require_errors$2();
	var SigninServiceException_1 = require_SigninServiceException();
	var _s_registry = schema_1.TypeRegistry.for(_s);
	exports.SigninServiceException$ = [
		-3,
		_s,
		"SigninServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(exports.SigninServiceException$, SigninServiceException_1.SigninServiceException);
	var n0_registry = schema_1.TypeRegistry.for(n0);
	exports.AccessDeniedException$ = [
		-3,
		n0,
		_ADE,
		{ [_e]: _c },
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.AccessDeniedException$, errors_1.AccessDeniedException);
	exports.InternalServerException$ = [
		-3,
		n0,
		_ISE,
		{
			[_e]: _se,
			[_hE]: 500
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.InternalServerException$, errors_1.InternalServerException);
	exports.TooManyRequestsError$ = [
		-3,
		n0,
		_TMRE,
		{
			[_e]: _c,
			[_hE]: 429
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.TooManyRequestsError$, errors_1.TooManyRequestsError);
	exports.ValidationException$ = [
		-3,
		n0,
		_VE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.ValidationException$, errors_1.ValidationException);
	exports.errorTypeRegistries = [_s_registry, n0_registry];
	var RefreshToken = [
		0,
		n0,
		_RT,
		8,
		0
	];
	exports.AccessToken$ = [
		3,
		n0,
		_AT,
		8,
		[
			_aKI,
			_sAK,
			_sT
		],
		[
			[0, { [_jN]: _aKI }],
			[0, { [_jN]: _sAK }],
			[0, { [_jN]: _sT }]
		],
		3
	];
	exports.CreateOAuth2TokenRequest$ = [
		3,
		n0,
		_COATR,
		0,
		[_tI],
		[[() => exports.CreateOAuth2TokenRequestBody$, 16]],
		1
	];
	exports.CreateOAuth2TokenRequestBody$ = [
		3,
		n0,
		_COATRB,
		0,
		[
			_cI,
			_gT,
			_co,
			_rU,
			_cV,
			_rT
		],
		[
			[0, { [_jN]: _cI }],
			[0, { [_jN]: _gT }],
			0,
			[0, { [_jN]: _rU }],
			[0, { [_jN]: _cV }],
			[() => RefreshToken, { [_jN]: _rT }]
		],
		2
	];
	exports.CreateOAuth2TokenResponse$ = [
		3,
		n0,
		_COATRr,
		0,
		[_tO],
		[[() => exports.CreateOAuth2TokenResponseBody$, 16]],
		1
	];
	exports.CreateOAuth2TokenResponseBody$ = [
		3,
		n0,
		_COATRBr,
		0,
		[
			_aT,
			_tT,
			_eI,
			_rT,
			_iT
		],
		[
			[() => exports.AccessToken$, { [_jN]: _aT }],
			[0, { [_jN]: _tT }],
			[1, { [_jN]: _eI }],
			[() => RefreshToken, { [_jN]: _rT }],
			[0, { [_jN]: _iT }]
		],
		4
	];
	exports.CreateOAuth2Token$ = [
		9,
		n0,
		_COAT,
		{ [_h]: [
			"POST",
			"/v1/token",
			200
		] },
		() => exports.CreateOAuth2TokenRequest$,
		() => exports.CreateOAuth2TokenResponse$
	];
}));
var require_runtimeConfig_shared$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var core_1 = require_dist_cjs();
	var protocols_1 = require_protocols();
	var core_2 = require_dist_cjs$1();
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var url_parser_1 = (init_dist_es$4(), __toCommonJS(dist_es_exports$4));
	var util_base64_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$5));
	var util_utf8_1 = (init_dist_es$6(), __toCommonJS(dist_es_exports$6));
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider$2();
	var endpointResolver_1 = require_endpointResolver$2();
	var schemas_0_1 = require_schemas_0$2();
	var getRuntimeConfig = (config) => {
		return {
			apiVersion: "2023-01-01",
			base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
			base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSigninHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [{
				schemeId: "aws.auth#sigv4",
				identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
				signer: new core_1.AwsSdkSigV4Signer()
			}, {
				schemeId: "smithy.api#noAuth",
				identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
				signer: new core_2.NoAuthSigner()
			}],
			logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
			protocol: config?.protocol ?? protocols_1.AwsRestJsonProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.signin",
				errorTypeRegistries: schemas_0_1.errorTypeRegistries,
				version: "2023-01-01",
				serviceTarget: "Signin"
			},
			serviceId: config?.serviceId ?? "Signin",
			urlParser: config?.urlParser ?? url_parser_1.parseUrl,
			utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
var require_runtimeConfig$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var package_json_1 = require_tslib().__importDefault((init_package(), __toCommonJS(package_exports).default));
	var core_1 = require_dist_cjs();
	var util_user_agent_node_1 = (init_dist_es$7(), __toCommonJS(dist_es_exports$7));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var hash_node_1 = (init_dist_es$9(), __toCommonJS(dist_es_exports$9));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var node_config_provider_1 = (init_dist_es$11(), __toCommonJS(dist_es_exports$11));
	var node_http_handler_1 = (init_dist_es$12(), __toCommonJS(dist_es_exports$12));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var util_body_length_node_1 = (init_dist_es$13(), __toCommonJS(dist_es_exports$13));
	var util_defaults_mode_node_1 = (init_dist_es$14(), __toCommonJS(dist_es_exports$14));
	var util_retry_1 = (init_dist_es$15(), __toCommonJS(dist_es_exports$15));
	var runtimeConfig_shared_1 = require_runtimeConfig_shared$2();
	var getRuntimeConfig = (config) => {
		(0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
		const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
		const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
		const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
		(0, core_1.emitWarningIfUnsupportedVersion)(process.version);
		const loaderConfig = {
			profile: config?.profile,
			logger: clientSharedValues.logger
		};
		return {
			...clientSharedValues,
			...config,
			runtime: "node",
			defaultsMode,
			authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
			bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
			defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({
				serviceId: clientSharedValues.serviceId,
				clientVersion: package_json_1.default.version
			}),
			maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
			region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, {
				...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS,
				...loaderConfig
			}),
			requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
			retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
				...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
				default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
			}, config),
			sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
			streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
var require_signin = /* @__PURE__ */ __commonJSMin(((exports) => {
	var middlewareHostHeader = (init_dist_es$16(), __toCommonJS(dist_es_exports$16));
	var middlewareLogger = (init_dist_es$17(), __toCommonJS(dist_es_exports$17));
	var middlewareRecursionDetection = (init_dist_es$18(), __toCommonJS(dist_es_exports$18));
	var middlewareUserAgent = (init_dist_es$19(), __toCommonJS(dist_es_exports$19));
	var configResolver = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core = require_dist_cjs$1();
	var schema = require_schema();
	var middlewareContentLength = (init_dist_es$20(), __toCommonJS(dist_es_exports$20));
	var middlewareEndpoint = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var middlewareRetry = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var smithyClient = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var httpAuthSchemeProvider = require_httpAuthSchemeProvider$2();
	var runtimeConfig = require_runtimeConfig$2();
	var regionConfigResolver = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var protocolHttp = (init_dist_es$23(), __toCommonJS(dist_es_exports$23));
	var schemas_0 = require_schemas_0$2();
	var errors = require_errors$2();
	var SigninServiceException = require_SigninServiceException();
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			defaultSigningName: "signin"
		});
	};
	var commonParams = {
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
	var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
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
	var resolveHttpAuthRuntimeConfig = (config) => {
		return {
			httpAuthSchemes: config.httpAuthSchemes(),
			httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
			credentials: config.credentials()
		};
	};
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign(regionConfigResolver.getAwsRegionExtensionConfiguration(runtimeConfig), smithyClient.getDefaultExtensionConfiguration(runtimeConfig), protocolHttp.getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, regionConfigResolver.resolveAwsRegionExtensionConfiguration(extensionConfiguration), smithyClient.resolveDefaultRuntimeConfig(extensionConfiguration), protocolHttp.resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
	};
	var SigninClient = class extends smithyClient.Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = runtimeConfig.getRuntimeConfig(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_1 = resolveClientEndpointParameters(_config_0);
			const _config_2 = middlewareUserAgent.resolveUserAgentConfig(_config_1);
			const _config_3 = middlewareRetry.resolveRetryConfig(_config_2);
			const _config_4 = configResolver.resolveRegionConfig(_config_3);
			const _config_5 = middlewareHostHeader.resolveHostHeaderConfig(_config_4);
			const _config_6 = middlewareEndpoint.resolveEndpointConfig(_config_5);
			this.config = resolveRuntimeExtensions(httpAuthSchemeProvider.resolveHttpAuthSchemeConfig(_config_6), configuration?.extensions || []);
			this.middlewareStack.use(schema.getSchemaSerdePlugin(this.config));
			this.middlewareStack.use(middlewareUserAgent.getUserAgentPlugin(this.config));
			this.middlewareStack.use(middlewareRetry.getRetryPlugin(this.config));
			this.middlewareStack.use(middlewareContentLength.getContentLengthPlugin(this.config));
			this.middlewareStack.use(middlewareHostHeader.getHostHeaderPlugin(this.config));
			this.middlewareStack.use(middlewareLogger.getLoggerPlugin(this.config));
			this.middlewareStack.use(middlewareRecursionDetection.getRecursionDetectionPlugin(this.config));
			this.middlewareStack.use(core.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
				httpAuthSchemeParametersProvider: httpAuthSchemeProvider.defaultSigninHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var CreateOAuth2TokenCommand = class extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("Signin", "CreateOAuth2Token", {}).n("SigninClient", "CreateOAuth2TokenCommand").sc(schemas_0.CreateOAuth2Token$).build() {};
	var commands = { CreateOAuth2TokenCommand };
	var Signin = class extends SigninClient {};
	smithyClient.createAggregatedClient(commands, Signin);
	var OAuth2ErrorCode = {
		AUTHCODE_EXPIRED: "AUTHCODE_EXPIRED",
		INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
		INVALID_REQUEST: "INVALID_REQUEST",
		SERVER_ERROR: "server_error",
		TOKEN_EXPIRED: "TOKEN_EXPIRED",
		USER_CREDENTIALS_CHANGED: "USER_CREDENTIALS_CHANGED"
	};
	Object.defineProperty(exports, "$Command", {
		enumerable: true,
		get: function() {
			return smithyClient.Command;
		}
	});
	Object.defineProperty(exports, "__Client", {
		enumerable: true,
		get: function() {
			return smithyClient.Client;
		}
	});
	Object.defineProperty(exports, "SigninServiceException", {
		enumerable: true,
		get: function() {
			return SigninServiceException.SigninServiceException;
		}
	});
	exports.CreateOAuth2TokenCommand = CreateOAuth2TokenCommand;
	exports.OAuth2ErrorCode = OAuth2ErrorCode;
	exports.Signin = Signin;
	exports.SigninClient = SigninClient;
	Object.keys(schemas_0).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return schemas_0[k];
			}
		});
	});
	Object.keys(errors).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return errors[k];
			}
		});
	});
}));
var require_httpAuthSchemeProvider$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthSchemeConfig = exports.defaultSSOOIDCHttpAuthSchemeProvider = exports.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
	var core_1 = require_dist_cjs();
	var util_middleware_1 = (init_dist_es(), __toCommonJS(dist_es_exports));
	var defaultSSOOIDCHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: (0, util_middleware_1.getSmithyContext)(context).operation,
			region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	exports.defaultSSOOIDCHttpAuthSchemeParametersProvider = defaultSSOOIDCHttpAuthSchemeParametersProvider;
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "sso-oauth",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createSmithyApiNoAuthHttpAuthOption(authParameters) {
		return { schemeId: "smithy.api#noAuth" };
	}
	var defaultSSOOIDCHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "CreateToken":
				options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	exports.defaultSSOOIDCHttpAuthSchemeProvider = defaultSSOOIDCHttpAuthSchemeProvider;
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = (0, core_1.resolveAwsSdkSigV4Config)(config);
		return Object.assign(config_0, { authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? []) });
	};
	exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
}));
var require_ruleset$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ruleSet = void 0;
	var u = "required", v = "fn", w = "argv", x = "ref";
	var a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "getAttr", i = {
		[u]: false,
		"type": "string"
	}, j = {
		[u]: true,
		"default": false,
		"type": "boolean"
	}, k = { [x]: "Endpoint" }, l = {
		[v]: c,
		[w]: [{ [x]: "UseFIPS" }, true]
	}, m = {
		[v]: c,
		[w]: [{ [x]: "UseDualStack" }, true]
	}, n = {}, o = {
		[v]: h,
		[w]: [{ [x]: g }, "supportsFIPS"]
	}, p = { [x]: g }, q = {
		[v]: c,
		[w]: [true, {
			[v]: h,
			[w]: [p, "supportsDualStack"]
		}]
	}, r = [l], s = [m], t = [{ [x]: "Region" }];
	exports.ruleSet = {
		version: "1.0",
		parameters: {
			Region: i,
			UseDualStack: j,
			UseFIPS: j,
			Endpoint: i
		},
		rules: [
			{
				conditions: [{
					[v]: b,
					[w]: [k]
				}],
				rules: [
					{
						conditions: r,
						error: "Invalid Configuration: FIPS and custom endpoint are not supported",
						type: d
					},
					{
						conditions: s,
						error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
						type: d
					},
					{
						endpoint: {
							url: k,
							properties: n,
							headers: n
						},
						type: e
					}
				],
				type: f
			},
			{
				conditions: [{
					[v]: b,
					[w]: t
				}],
				rules: [{
					conditions: [{
						[v]: "aws.partition",
						[w]: t,
						assign: g
					}],
					rules: [
						{
							conditions: [l, m],
							rules: [{
								conditions: [{
									[v]: c,
									[w]: [a, o]
								}, q],
								rules: [{
									endpoint: {
										url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
										properties: n,
										headers: n
									},
									type: e
								}],
								type: f
							}, {
								error: "FIPS and DualStack are enabled, but this partition does not support one or both",
								type: d
							}],
							type: f
						},
						{
							conditions: r,
							rules: [{
								conditions: [{
									[v]: c,
									[w]: [o, a]
								}],
								rules: [{
									conditions: [{
										[v]: "stringEquals",
										[w]: [{
											[v]: h,
											[w]: [p, "name"]
										}, "aws-us-gov"]
									}],
									endpoint: {
										url: "https://oidc.{Region}.amazonaws.com",
										properties: n,
										headers: n
									},
									type: e
								}, {
									endpoint: {
										url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
										properties: n,
										headers: n
									},
									type: e
								}],
								type: f
							}, {
								error: "FIPS is enabled but this partition does not support FIPS",
								type: d
							}],
							type: f
						},
						{
							conditions: s,
							rules: [{
								conditions: [q],
								rules: [{
									endpoint: {
										url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
										properties: n,
										headers: n
									},
									type: e
								}],
								type: f
							}, {
								error: "DualStack is enabled but this partition does not support DualStack",
								type: d
							}],
							type: f
						},
						{
							endpoint: {
								url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
								properties: n,
								headers: n
							},
							type: e
						}
					],
					type: f
				}],
				type: f
			},
			{
				error: "Invalid Configuration: Missing Region",
				type: d
			}
		]
	};
}));
var require_endpointResolver$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultEndpointResolver = void 0;
	var util_endpoints_1 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var util_endpoints_2 = (init_dist_es$2(), __toCommonJS(dist_es_exports$2));
	var ruleset_1 = require_ruleset$1();
	var cache = new util_endpoints_2.EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"Region",
			"UseDualStack",
			"UseFIPS"
		]
	});
	var defaultEndpointResolver = (endpointParams, context = {}) => {
		return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
			endpointParams,
			logger: context.logger
		}));
	};
	exports.defaultEndpointResolver = defaultEndpointResolver;
	util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
}));
var require_SSOOIDCServiceException = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SSOOIDCServiceException = exports.__ServiceException = void 0;
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__ServiceException", {
		enumerable: true,
		get: function() {
			return smithy_client_1.ServiceException;
		}
	});
	exports.SSOOIDCServiceException = class SSOOIDCServiceException extends smithy_client_1.ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SSOOIDCServiceException.prototype);
		}
	};
}));
var require_errors$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UnsupportedGrantTypeException = exports.UnauthorizedClientException = exports.SlowDownException = exports.InvalidScopeException = exports.InvalidRequestException = exports.InvalidGrantException = exports.InvalidClientException = exports.InternalServerException = exports.ExpiredTokenException = exports.AuthorizationPendingException = exports.AccessDeniedException = void 0;
	var SSOOIDCServiceException_1 = require_SSOOIDCServiceException();
	exports.AccessDeniedException = class AccessDeniedException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "AccessDeniedException";
		$fault = "client";
		error;
		reason;
		error_description;
		constructor(opts) {
			super({
				name: "AccessDeniedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AccessDeniedException.prototype);
			this.error = opts.error;
			this.reason = opts.reason;
			this.error_description = opts.error_description;
		}
	};
	exports.AuthorizationPendingException = class AuthorizationPendingException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "AuthorizationPendingException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "AuthorizationPendingException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AuthorizationPendingException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.ExpiredTokenException = class ExpiredTokenException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "ExpiredTokenException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "ExpiredTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ExpiredTokenException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InternalServerException = class InternalServerException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InternalServerException";
		$fault = "server";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InternalServerException",
				$fault: "server",
				...opts
			});
			Object.setPrototypeOf(this, InternalServerException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidClientException = class InvalidClientException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidClientException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidClientException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidClientException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidGrantException = class InvalidGrantException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidGrantException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidGrantException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidGrantException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidRequestException = class InvalidRequestException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidRequestException";
		$fault = "client";
		error;
		reason;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidRequestException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidRequestException.prototype);
			this.error = opts.error;
			this.reason = opts.reason;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidScopeException = class InvalidScopeException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidScopeException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidScopeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidScopeException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.SlowDownException = class SlowDownException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "SlowDownException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "SlowDownException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, SlowDownException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.UnauthorizedClientException = class UnauthorizedClientException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "UnauthorizedClientException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "UnauthorizedClientException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnauthorizedClientException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.UnsupportedGrantTypeException = class UnsupportedGrantTypeException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "UnsupportedGrantTypeException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "UnsupportedGrantTypeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnsupportedGrantTypeException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
}));
var require_schemas_0$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateToken$ = exports.CreateTokenResponse$ = exports.CreateTokenRequest$ = exports.errorTypeRegistries = exports.UnsupportedGrantTypeException$ = exports.UnauthorizedClientException$ = exports.SlowDownException$ = exports.InvalidScopeException$ = exports.InvalidRequestException$ = exports.InvalidGrantException$ = exports.InvalidClientException$ = exports.InternalServerException$ = exports.ExpiredTokenException$ = exports.AuthorizationPendingException$ = exports.AccessDeniedException$ = exports.SSOOIDCServiceException$ = void 0;
	var _ADE = "AccessDeniedException";
	var _APE = "AuthorizationPendingException";
	var _AT = "AccessToken";
	var _CS = "ClientSecret";
	var _CT = "CreateToken";
	var _CTR = "CreateTokenRequest";
	var _CTRr = "CreateTokenResponse";
	var _CV = "CodeVerifier";
	var _ETE = "ExpiredTokenException";
	var _ICE = "InvalidClientException";
	var _IGE = "InvalidGrantException";
	var _IRE = "InvalidRequestException";
	var _ISE = "InternalServerException";
	var _ISEn = "InvalidScopeException";
	var _IT = "IdToken";
	var _RT = "RefreshToken";
	var _SDE = "SlowDownException";
	var _UCE = "UnauthorizedClientException";
	var _UGTE = "UnsupportedGrantTypeException";
	var _aT = "accessToken";
	var _c = "client";
	var _cI = "clientId";
	var _cS = "clientSecret";
	var _cV = "codeVerifier";
	var _co = "code";
	var _dC = "deviceCode";
	var _e = "error";
	var _eI = "expiresIn";
	var _ed = "error_description";
	var _gT = "grantType";
	var _h = "http";
	var _hE = "httpError";
	var _iT = "idToken";
	var _r = "reason";
	var _rT = "refreshToken";
	var _rU = "redirectUri";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.ssooidc";
	var _sc = "scope";
	var _se = "server";
	var _tT = "tokenType";
	var n0 = "com.amazonaws.ssooidc";
	var schema_1 = require_schema();
	var errors_1 = require_errors$1();
	var SSOOIDCServiceException_1 = require_SSOOIDCServiceException();
	var _s_registry = schema_1.TypeRegistry.for(_s);
	exports.SSOOIDCServiceException$ = [
		-3,
		_s,
		"SSOOIDCServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(exports.SSOOIDCServiceException$, SSOOIDCServiceException_1.SSOOIDCServiceException);
	var n0_registry = schema_1.TypeRegistry.for(n0);
	exports.AccessDeniedException$ = [
		-3,
		n0,
		_ADE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[
			_e,
			_r,
			_ed
		],
		[
			0,
			0,
			0
		]
	];
	n0_registry.registerError(exports.AccessDeniedException$, errors_1.AccessDeniedException);
	exports.AuthorizationPendingException$ = [
		-3,
		n0,
		_APE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.AuthorizationPendingException$, errors_1.AuthorizationPendingException);
	exports.ExpiredTokenException$ = [
		-3,
		n0,
		_ETE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.ExpiredTokenException$, errors_1.ExpiredTokenException);
	exports.InternalServerException$ = [
		-3,
		n0,
		_ISE,
		{
			[_e]: _se,
			[_hE]: 500
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InternalServerException$, errors_1.InternalServerException);
	exports.InvalidClientException$ = [
		-3,
		n0,
		_ICE,
		{
			[_e]: _c,
			[_hE]: 401
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InvalidClientException$, errors_1.InvalidClientException);
	exports.InvalidGrantException$ = [
		-3,
		n0,
		_IGE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InvalidGrantException$, errors_1.InvalidGrantException);
	exports.InvalidRequestException$ = [
		-3,
		n0,
		_IRE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[
			_e,
			_r,
			_ed
		],
		[
			0,
			0,
			0
		]
	];
	n0_registry.registerError(exports.InvalidRequestException$, errors_1.InvalidRequestException);
	exports.InvalidScopeException$ = [
		-3,
		n0,
		_ISEn,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InvalidScopeException$, errors_1.InvalidScopeException);
	exports.SlowDownException$ = [
		-3,
		n0,
		_SDE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.SlowDownException$, errors_1.SlowDownException);
	exports.UnauthorizedClientException$ = [
		-3,
		n0,
		_UCE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.UnauthorizedClientException$, errors_1.UnauthorizedClientException);
	exports.UnsupportedGrantTypeException$ = [
		-3,
		n0,
		_UGTE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.UnsupportedGrantTypeException$, errors_1.UnsupportedGrantTypeException);
	exports.errorTypeRegistries = [_s_registry, n0_registry];
	var AccessToken = [
		0,
		n0,
		_AT,
		8,
		0
	];
	var ClientSecret = [
		0,
		n0,
		_CS,
		8,
		0
	];
	var CodeVerifier = [
		0,
		n0,
		_CV,
		8,
		0
	];
	var IdToken = [
		0,
		n0,
		_IT,
		8,
		0
	];
	var RefreshToken = [
		0,
		n0,
		_RT,
		8,
		0
	];
	exports.CreateTokenRequest$ = [
		3,
		n0,
		_CTR,
		0,
		[
			_cI,
			_cS,
			_gT,
			_dC,
			_co,
			_rT,
			_sc,
			_rU,
			_cV
		],
		[
			0,
			[() => ClientSecret, 0],
			0,
			0,
			0,
			[() => RefreshToken, 0],
			64,
			0,
			[() => CodeVerifier, 0]
		],
		3
	];
	exports.CreateTokenResponse$ = [
		3,
		n0,
		_CTRr,
		0,
		[
			_aT,
			_tT,
			_eI,
			_rT,
			_iT
		],
		[
			[() => AccessToken, 0],
			0,
			1,
			[() => RefreshToken, 0],
			[() => IdToken, 0]
		]
	];
	exports.CreateToken$ = [
		9,
		n0,
		_CT,
		{ [_h]: [
			"POST",
			"/token",
			200
		] },
		() => exports.CreateTokenRequest$,
		() => exports.CreateTokenResponse$
	];
}));
var require_runtimeConfig_shared$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var core_1 = require_dist_cjs();
	var protocols_1 = require_protocols();
	var core_2 = require_dist_cjs$1();
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var url_parser_1 = (init_dist_es$4(), __toCommonJS(dist_es_exports$4));
	var util_base64_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$5));
	var util_utf8_1 = (init_dist_es$6(), __toCommonJS(dist_es_exports$6));
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider$1();
	var endpointResolver_1 = require_endpointResolver$1();
	var schemas_0_1 = require_schemas_0$1();
	var getRuntimeConfig = (config) => {
		return {
			apiVersion: "2019-06-10",
			base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
			base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSSOOIDCHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [{
				schemeId: "aws.auth#sigv4",
				identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
				signer: new core_1.AwsSdkSigV4Signer()
			}, {
				schemeId: "smithy.api#noAuth",
				identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
				signer: new core_2.NoAuthSigner()
			}],
			logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
			protocol: config?.protocol ?? protocols_1.AwsRestJsonProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.ssooidc",
				errorTypeRegistries: schemas_0_1.errorTypeRegistries,
				version: "2019-06-10",
				serviceTarget: "AWSSSOOIDCService"
			},
			serviceId: config?.serviceId ?? "SSO OIDC",
			urlParser: config?.urlParser ?? url_parser_1.parseUrl,
			utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
var require_runtimeConfig$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var package_json_1 = require_tslib().__importDefault((init_package(), __toCommonJS(package_exports).default));
	var core_1 = require_dist_cjs();
	var util_user_agent_node_1 = (init_dist_es$7(), __toCommonJS(dist_es_exports$7));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var hash_node_1 = (init_dist_es$9(), __toCommonJS(dist_es_exports$9));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var node_config_provider_1 = (init_dist_es$11(), __toCommonJS(dist_es_exports$11));
	var node_http_handler_1 = (init_dist_es$12(), __toCommonJS(dist_es_exports$12));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var util_body_length_node_1 = (init_dist_es$13(), __toCommonJS(dist_es_exports$13));
	var util_defaults_mode_node_1 = (init_dist_es$14(), __toCommonJS(dist_es_exports$14));
	var util_retry_1 = (init_dist_es$15(), __toCommonJS(dist_es_exports$15));
	var runtimeConfig_shared_1 = require_runtimeConfig_shared$1();
	var getRuntimeConfig = (config) => {
		(0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
		const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
		const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
		const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
		(0, core_1.emitWarningIfUnsupportedVersion)(process.version);
		const loaderConfig = {
			profile: config?.profile,
			logger: clientSharedValues.logger
		};
		return {
			...clientSharedValues,
			...config,
			runtime: "node",
			defaultsMode,
			authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
			bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
			defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({
				serviceId: clientSharedValues.serviceId,
				clientVersion: package_json_1.default.version
			}),
			maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
			region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, {
				...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS,
				...loaderConfig
			}),
			requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
			retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
				...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
				default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
			}, config),
			sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
			streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
var require_sso_oidc = /* @__PURE__ */ __commonJSMin(((exports) => {
	var middlewareHostHeader = (init_dist_es$16(), __toCommonJS(dist_es_exports$16));
	var middlewareLogger = (init_dist_es$17(), __toCommonJS(dist_es_exports$17));
	var middlewareRecursionDetection = (init_dist_es$18(), __toCommonJS(dist_es_exports$18));
	var middlewareUserAgent = (init_dist_es$19(), __toCommonJS(dist_es_exports$19));
	var configResolver = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core = require_dist_cjs$1();
	var schema = require_schema();
	var middlewareContentLength = (init_dist_es$20(), __toCommonJS(dist_es_exports$20));
	var middlewareEndpoint = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var middlewareRetry = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var smithyClient = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var httpAuthSchemeProvider = require_httpAuthSchemeProvider$1();
	var runtimeConfig = require_runtimeConfig$1();
	var regionConfigResolver = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var protocolHttp = (init_dist_es$23(), __toCommonJS(dist_es_exports$23));
	var schemas_0 = require_schemas_0$1();
	var errors = require_errors$1();
	var SSOOIDCServiceException = require_SSOOIDCServiceException();
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			defaultSigningName: "sso-oauth"
		});
	};
	var commonParams = {
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
	var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
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
	var resolveHttpAuthRuntimeConfig = (config) => {
		return {
			httpAuthSchemes: config.httpAuthSchemes(),
			httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
			credentials: config.credentials()
		};
	};
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign(regionConfigResolver.getAwsRegionExtensionConfiguration(runtimeConfig), smithyClient.getDefaultExtensionConfiguration(runtimeConfig), protocolHttp.getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, regionConfigResolver.resolveAwsRegionExtensionConfiguration(extensionConfiguration), smithyClient.resolveDefaultRuntimeConfig(extensionConfiguration), protocolHttp.resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
	};
	var SSOOIDCClient = class extends smithyClient.Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = runtimeConfig.getRuntimeConfig(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_1 = resolveClientEndpointParameters(_config_0);
			const _config_2 = middlewareUserAgent.resolveUserAgentConfig(_config_1);
			const _config_3 = middlewareRetry.resolveRetryConfig(_config_2);
			const _config_4 = configResolver.resolveRegionConfig(_config_3);
			const _config_5 = middlewareHostHeader.resolveHostHeaderConfig(_config_4);
			const _config_6 = middlewareEndpoint.resolveEndpointConfig(_config_5);
			this.config = resolveRuntimeExtensions(httpAuthSchemeProvider.resolveHttpAuthSchemeConfig(_config_6), configuration?.extensions || []);
			this.middlewareStack.use(schema.getSchemaSerdePlugin(this.config));
			this.middlewareStack.use(middlewareUserAgent.getUserAgentPlugin(this.config));
			this.middlewareStack.use(middlewareRetry.getRetryPlugin(this.config));
			this.middlewareStack.use(middlewareContentLength.getContentLengthPlugin(this.config));
			this.middlewareStack.use(middlewareHostHeader.getHostHeaderPlugin(this.config));
			this.middlewareStack.use(middlewareLogger.getLoggerPlugin(this.config));
			this.middlewareStack.use(middlewareRecursionDetection.getRecursionDetectionPlugin(this.config));
			this.middlewareStack.use(core.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
				httpAuthSchemeParametersProvider: httpAuthSchemeProvider.defaultSSOOIDCHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var CreateTokenCommand = class extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").sc(schemas_0.CreateToken$).build() {};
	var commands = { CreateTokenCommand };
	var SSOOIDC = class extends SSOOIDCClient {};
	smithyClient.createAggregatedClient(commands, SSOOIDC);
	var AccessDeniedExceptionReason = { KMS_ACCESS_DENIED: "KMS_AccessDeniedException" };
	var InvalidRequestExceptionReason = {
		KMS_DISABLED_KEY: "KMS_DisabledException",
		KMS_INVALID_KEY_USAGE: "KMS_InvalidKeyUsageException",
		KMS_INVALID_STATE: "KMS_InvalidStateException",
		KMS_KEY_NOT_FOUND: "KMS_NotFoundException"
	};
	Object.defineProperty(exports, "$Command", {
		enumerable: true,
		get: function() {
			return smithyClient.Command;
		}
	});
	Object.defineProperty(exports, "__Client", {
		enumerable: true,
		get: function() {
			return smithyClient.Client;
		}
	});
	Object.defineProperty(exports, "SSOOIDCServiceException", {
		enumerable: true,
		get: function() {
			return SSOOIDCServiceException.SSOOIDCServiceException;
		}
	});
	exports.AccessDeniedExceptionReason = AccessDeniedExceptionReason;
	exports.CreateTokenCommand = CreateTokenCommand;
	exports.InvalidRequestExceptionReason = InvalidRequestExceptionReason;
	exports.SSOOIDC = SSOOIDC;
	exports.SSOOIDCClient = SSOOIDCClient;
	Object.keys(schemas_0).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return schemas_0[k];
			}
		});
	});
	Object.keys(errors).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return errors[k];
			}
		});
	});
}));
var require_httpAuthSchemeProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthSchemeConfig = exports.resolveStsAuthConfig = exports.defaultSTSHttpAuthSchemeProvider = exports.defaultSTSHttpAuthSchemeParametersProvider = void 0;
	var core_1 = require_dist_cjs();
	var util_middleware_1 = (init_dist_es(), __toCommonJS(dist_es_exports));
	var STSClient_1 = require_STSClient();
	var defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: (0, util_middleware_1.getSmithyContext)(context).operation,
			region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	exports.defaultSTSHttpAuthSchemeParametersProvider = defaultSTSHttpAuthSchemeParametersProvider;
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "sts",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createSmithyApiNoAuthHttpAuthOption(authParameters) {
		return { schemeId: "smithy.api#noAuth" };
	}
	var defaultSTSHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "AssumeRoleWithWebIdentity":
				options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	exports.defaultSTSHttpAuthSchemeProvider = defaultSTSHttpAuthSchemeProvider;
	var resolveStsAuthConfig = (input) => Object.assign(input, { stsClientCtor: STSClient_1.STSClient });
	exports.resolveStsAuthConfig = resolveStsAuthConfig;
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = (0, exports.resolveStsAuthConfig)(config);
		const config_1 = (0, core_1.resolveAwsSdkSigV4Config)(config_0);
		return Object.assign(config_1, { authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? []) });
	};
	exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
}));
var require_EndpointParameters = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.commonParams = exports.resolveClientEndpointParameters = void 0;
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			useGlobalEndpoint: options.useGlobalEndpoint ?? false,
			defaultSigningName: "sts"
		});
	};
	exports.resolveClientEndpointParameters = resolveClientEndpointParameters;
	exports.commonParams = {
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
}));
var require_ruleset = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ruleSet = void 0;
	var F = "required", G = "type", H = "fn", I = "argv", J = "ref";
	var a = false, b = true, c = "booleanEquals", d = "stringEquals", e = "sigv4", f = "sts", g = "us-east-1", h = "endpoint", i = "https://sts.{Region}.{PartitionResult#dnsSuffix}", j = "tree", k = "error", l = "getAttr", m = {
		[F]: false,
		[G]: "string"
	}, n = {
		[F]: true,
		"default": false,
		[G]: "boolean"
	}, o = { [J]: "Endpoint" }, p = {
		[H]: "isSet",
		[I]: [{ [J]: "Region" }]
	}, q = { [J]: "Region" }, r = {
		[H]: "aws.partition",
		[I]: [q],
		"assign": "PartitionResult"
	}, s = { [J]: "UseFIPS" }, t = { [J]: "UseDualStack" }, u = {
		"url": "https://sts.amazonaws.com",
		"properties": { "authSchemes": [{
			"name": e,
			"signingName": f,
			"signingRegion": g
		}] },
		"headers": {}
	}, v = {}, w = {
		"conditions": [{
			[H]: d,
			[I]: [q, "aws-global"]
		}],
		[h]: u,
		[G]: h
	}, x = {
		[H]: c,
		[I]: [s, true]
	}, y = {
		[H]: c,
		[I]: [t, true]
	}, z = {
		[H]: l,
		[I]: [{ [J]: "PartitionResult" }, "supportsFIPS"]
	}, A = { [J]: "PartitionResult" }, B = {
		[H]: c,
		[I]: [true, {
			[H]: l,
			[I]: [A, "supportsDualStack"]
		}]
	}, C = [{
		[H]: "isSet",
		[I]: [o]
	}], D = [x], E = [y];
	exports.ruleSet = {
		version: "1.0",
		parameters: {
			Region: m,
			UseDualStack: n,
			UseFIPS: n,
			Endpoint: m,
			UseGlobalEndpoint: n
		},
		rules: [
			{
				conditions: [
					{
						[H]: c,
						[I]: [{ [J]: "UseGlobalEndpoint" }, b]
					},
					{
						[H]: "not",
						[I]: C
					},
					p,
					r,
					{
						[H]: c,
						[I]: [s, a]
					},
					{
						[H]: c,
						[I]: [t, a]
					}
				],
				rules: [
					{
						conditions: [{
							[H]: d,
							[I]: [q, "ap-northeast-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "ap-south-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "ap-southeast-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "ap-southeast-2"]
						}],
						endpoint: u,
						[G]: h
					},
					w,
					{
						conditions: [{
							[H]: d,
							[I]: [q, "ca-central-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "eu-central-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "eu-north-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "eu-west-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "eu-west-2"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "eu-west-3"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "sa-east-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, g]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "us-east-2"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "us-west-1"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						conditions: [{
							[H]: d,
							[I]: [q, "us-west-2"]
						}],
						endpoint: u,
						[G]: h
					},
					{
						endpoint: {
							url: i,
							properties: { authSchemes: [{
								name: e,
								signingName: f,
								signingRegion: "{Region}"
							}] },
							headers: v
						},
						[G]: h
					}
				],
				[G]: j
			},
			{
				conditions: C,
				rules: [
					{
						conditions: D,
						error: "Invalid Configuration: FIPS and custom endpoint are not supported",
						[G]: k
					},
					{
						conditions: E,
						error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
						[G]: k
					},
					{
						endpoint: {
							url: o,
							properties: v,
							headers: v
						},
						[G]: h
					}
				],
				[G]: j
			},
			{
				conditions: [p],
				rules: [{
					conditions: [r],
					rules: [
						{
							conditions: [x, y],
							rules: [{
								conditions: [{
									[H]: c,
									[I]: [b, z]
								}, B],
								rules: [{
									endpoint: {
										url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
										properties: v,
										headers: v
									},
									[G]: h
								}],
								[G]: j
							}, {
								error: "FIPS and DualStack are enabled, but this partition does not support one or both",
								[G]: k
							}],
							[G]: j
						},
						{
							conditions: D,
							rules: [{
								conditions: [{
									[H]: c,
									[I]: [z, b]
								}],
								rules: [{
									conditions: [{
										[H]: d,
										[I]: [{
											[H]: l,
											[I]: [A, "name"]
										}, "aws-us-gov"]
									}],
									endpoint: {
										url: "https://sts.{Region}.amazonaws.com",
										properties: v,
										headers: v
									},
									[G]: h
								}, {
									endpoint: {
										url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
										properties: v,
										headers: v
									},
									[G]: h
								}],
								[G]: j
							}, {
								error: "FIPS is enabled but this partition does not support FIPS",
								[G]: k
							}],
							[G]: j
						},
						{
							conditions: E,
							rules: [{
								conditions: [B],
								rules: [{
									endpoint: {
										url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
										properties: v,
										headers: v
									},
									[G]: h
								}],
								[G]: j
							}, {
								error: "DualStack is enabled but this partition does not support DualStack",
								[G]: k
							}],
							[G]: j
						},
						w,
						{
							endpoint: {
								url: i,
								properties: v,
								headers: v
							},
							[G]: h
						}
					],
					[G]: j
				}],
				[G]: j
			},
			{
				error: "Invalid Configuration: Missing Region",
				[G]: k
			}
		]
	};
}));
var require_endpointResolver = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultEndpointResolver = void 0;
	var util_endpoints_1 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var util_endpoints_2 = (init_dist_es$2(), __toCommonJS(dist_es_exports$2));
	var ruleset_1 = require_ruleset();
	var cache = new util_endpoints_2.EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"Region",
			"UseDualStack",
			"UseFIPS",
			"UseGlobalEndpoint"
		]
	});
	var defaultEndpointResolver = (endpointParams, context = {}) => {
		return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
			endpointParams,
			logger: context.logger
		}));
	};
	exports.defaultEndpointResolver = defaultEndpointResolver;
	util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
}));
var require_STSServiceException = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.STSServiceException = exports.__ServiceException = void 0;
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__ServiceException", {
		enumerable: true,
		get: function() {
			return smithy_client_1.ServiceException;
		}
	});
	exports.STSServiceException = class STSServiceException extends smithy_client_1.ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, STSServiceException.prototype);
		}
	};
}));
var require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IDPCommunicationErrorException = exports.InvalidIdentityTokenException = exports.IDPRejectedClaimException = exports.RegionDisabledException = exports.PackedPolicyTooLargeException = exports.MalformedPolicyDocumentException = exports.ExpiredTokenException = void 0;
	var STSServiceException_1 = require_STSServiceException();
	exports.ExpiredTokenException = class ExpiredTokenException extends STSServiceException_1.STSServiceException {
		name = "ExpiredTokenException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "ExpiredTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ExpiredTokenException.prototype);
		}
	};
	exports.MalformedPolicyDocumentException = class MalformedPolicyDocumentException extends STSServiceException_1.STSServiceException {
		name = "MalformedPolicyDocumentException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "MalformedPolicyDocumentException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
		}
	};
	exports.PackedPolicyTooLargeException = class PackedPolicyTooLargeException extends STSServiceException_1.STSServiceException {
		name = "PackedPolicyTooLargeException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "PackedPolicyTooLargeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
		}
	};
	exports.RegionDisabledException = class RegionDisabledException extends STSServiceException_1.STSServiceException {
		name = "RegionDisabledException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "RegionDisabledException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, RegionDisabledException.prototype);
		}
	};
	exports.IDPRejectedClaimException = class IDPRejectedClaimException extends STSServiceException_1.STSServiceException {
		name = "IDPRejectedClaimException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "IDPRejectedClaimException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
		}
	};
	exports.InvalidIdentityTokenException = class InvalidIdentityTokenException extends STSServiceException_1.STSServiceException {
		name = "InvalidIdentityTokenException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "InvalidIdentityTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
		}
	};
	exports.IDPCommunicationErrorException = class IDPCommunicationErrorException extends STSServiceException_1.STSServiceException {
		name = "IDPCommunicationErrorException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "IDPCommunicationErrorException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
		}
	};
}));
var require_schemas_0 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AssumeRoleWithWebIdentity$ = exports.AssumeRole$ = exports.Tag$ = exports.ProvidedContext$ = exports.PolicyDescriptorType$ = exports.Credentials$ = exports.AssumeRoleWithWebIdentityResponse$ = exports.AssumeRoleWithWebIdentityRequest$ = exports.AssumeRoleResponse$ = exports.AssumeRoleRequest$ = exports.AssumedRoleUser$ = exports.errorTypeRegistries = exports.RegionDisabledException$ = exports.PackedPolicyTooLargeException$ = exports.MalformedPolicyDocumentException$ = exports.InvalidIdentityTokenException$ = exports.IDPRejectedClaimException$ = exports.IDPCommunicationErrorException$ = exports.ExpiredTokenException$ = exports.STSServiceException$ = void 0;
	var _A = "Arn";
	var _AKI = "AccessKeyId";
	var _AR = "AssumeRole";
	var _ARI = "AssumedRoleId";
	var _ARR = "AssumeRoleRequest";
	var _ARRs = "AssumeRoleResponse";
	var _ARU = "AssumedRoleUser";
	var _ARWWI = "AssumeRoleWithWebIdentity";
	var _ARWWIR = "AssumeRoleWithWebIdentityRequest";
	var _ARWWIRs = "AssumeRoleWithWebIdentityResponse";
	var _Au = "Audience";
	var _C = "Credentials";
	var _CA = "ContextAssertion";
	var _DS = "DurationSeconds";
	var _E = "Expiration";
	var _EI = "ExternalId";
	var _ETE = "ExpiredTokenException";
	var _IDPCEE = "IDPCommunicationErrorException";
	var _IDPRCE = "IDPRejectedClaimException";
	var _IITE = "InvalidIdentityTokenException";
	var _K = "Key";
	var _MPDE = "MalformedPolicyDocumentException";
	var _P = "Policy";
	var _PA = "PolicyArns";
	var _PAr = "ProviderArn";
	var _PC = "ProvidedContexts";
	var _PCLT = "ProvidedContextsListType";
	var _PCr = "ProvidedContext";
	var _PDT = "PolicyDescriptorType";
	var _PI = "ProviderId";
	var _PPS = "PackedPolicySize";
	var _PPTLE = "PackedPolicyTooLargeException";
	var _Pr = "Provider";
	var _RA = "RoleArn";
	var _RDE = "RegionDisabledException";
	var _RSN = "RoleSessionName";
	var _SAK = "SecretAccessKey";
	var _SFWIT = "SubjectFromWebIdentityToken";
	var _SI = "SourceIdentity";
	var _SN = "SerialNumber";
	var _ST = "SessionToken";
	var _T = "Tags";
	var _TC = "TokenCode";
	var _TTK = "TransitiveTagKeys";
	var _Ta = "Tag";
	var _V = "Value";
	var _WIT = "WebIdentityToken";
	var _a = "arn";
	var _aKST = "accessKeySecretType";
	var _aQE = "awsQueryError";
	var _c = "client";
	var _cTT = "clientTokenType";
	var _e = "error";
	var _hE = "httpError";
	var _m = "message";
	var _pDLT = "policyDescriptorListType";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.sts";
	var _tLT = "tagListType";
	var n0 = "com.amazonaws.sts";
	var schema_1 = require_schema();
	var errors_1 = require_errors();
	var STSServiceException_1 = require_STSServiceException();
	var _s_registry = schema_1.TypeRegistry.for(_s);
	exports.STSServiceException$ = [
		-3,
		_s,
		"STSServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(exports.STSServiceException$, STSServiceException_1.STSServiceException);
	var n0_registry = schema_1.TypeRegistry.for(n0);
	exports.ExpiredTokenException$ = [
		-3,
		n0,
		_ETE,
		{
			[_aQE]: [`ExpiredTokenException`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.ExpiredTokenException$, errors_1.ExpiredTokenException);
	exports.IDPCommunicationErrorException$ = [
		-3,
		n0,
		_IDPCEE,
		{
			[_aQE]: [`IDPCommunicationError`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.IDPCommunicationErrorException$, errors_1.IDPCommunicationErrorException);
	exports.IDPRejectedClaimException$ = [
		-3,
		n0,
		_IDPRCE,
		{
			[_aQE]: [`IDPRejectedClaim`, 403],
			[_e]: _c,
			[_hE]: 403
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.IDPRejectedClaimException$, errors_1.IDPRejectedClaimException);
	exports.InvalidIdentityTokenException$ = [
		-3,
		n0,
		_IITE,
		{
			[_aQE]: [`InvalidIdentityToken`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.InvalidIdentityTokenException$, errors_1.InvalidIdentityTokenException);
	exports.MalformedPolicyDocumentException$ = [
		-3,
		n0,
		_MPDE,
		{
			[_aQE]: [`MalformedPolicyDocument`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.MalformedPolicyDocumentException$, errors_1.MalformedPolicyDocumentException);
	exports.PackedPolicyTooLargeException$ = [
		-3,
		n0,
		_PPTLE,
		{
			[_aQE]: [`PackedPolicyTooLarge`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.PackedPolicyTooLargeException$, errors_1.PackedPolicyTooLargeException);
	exports.RegionDisabledException$ = [
		-3,
		n0,
		_RDE,
		{
			[_aQE]: [`RegionDisabledException`, 403],
			[_e]: _c,
			[_hE]: 403
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.RegionDisabledException$, errors_1.RegionDisabledException);
	exports.errorTypeRegistries = [_s_registry, n0_registry];
	var accessKeySecretType = [
		0,
		n0,
		_aKST,
		8,
		0
	];
	var clientTokenType = [
		0,
		n0,
		_cTT,
		8,
		0
	];
	exports.AssumedRoleUser$ = [
		3,
		n0,
		_ARU,
		0,
		[_ARI, _A],
		[0, 0],
		2
	];
	exports.AssumeRoleRequest$ = [
		3,
		n0,
		_ARR,
		0,
		[
			_RA,
			_RSN,
			_PA,
			_P,
			_DS,
			_T,
			_TTK,
			_EI,
			_SN,
			_TC,
			_SI,
			_PC
		],
		[
			0,
			0,
			() => policyDescriptorListType,
			0,
			1,
			() => tagListType,
			64,
			0,
			0,
			0,
			0,
			() => ProvidedContextsListType
		],
		2
	];
	exports.AssumeRoleResponse$ = [
		3,
		n0,
		_ARRs,
		0,
		[
			_C,
			_ARU,
			_PPS,
			_SI
		],
		[
			[() => exports.Credentials$, 0],
			() => exports.AssumedRoleUser$,
			1,
			0
		]
	];
	exports.AssumeRoleWithWebIdentityRequest$ = [
		3,
		n0,
		_ARWWIR,
		0,
		[
			_RA,
			_RSN,
			_WIT,
			_PI,
			_PA,
			_P,
			_DS
		],
		[
			0,
			0,
			[() => clientTokenType, 0],
			0,
			() => policyDescriptorListType,
			0,
			1
		],
		3
	];
	exports.AssumeRoleWithWebIdentityResponse$ = [
		3,
		n0,
		_ARWWIRs,
		0,
		[
			_C,
			_SFWIT,
			_ARU,
			_PPS,
			_Pr,
			_Au,
			_SI
		],
		[
			[() => exports.Credentials$, 0],
			0,
			() => exports.AssumedRoleUser$,
			1,
			0,
			0,
			0
		]
	];
	exports.Credentials$ = [
		3,
		n0,
		_C,
		0,
		[
			_AKI,
			_SAK,
			_ST,
			_E
		],
		[
			0,
			[() => accessKeySecretType, 0],
			0,
			4
		],
		4
	];
	exports.PolicyDescriptorType$ = [
		3,
		n0,
		_PDT,
		0,
		[_a],
		[0]
	];
	exports.ProvidedContext$ = [
		3,
		n0,
		_PCr,
		0,
		[_PAr, _CA],
		[0, 0]
	];
	exports.Tag$ = [
		3,
		n0,
		_Ta,
		0,
		[_K, _V],
		[0, 0],
		2
	];
	var policyDescriptorListType = [
		1,
		n0,
		_pDLT,
		0,
		() => exports.PolicyDescriptorType$
	];
	var ProvidedContextsListType = [
		1,
		n0,
		_PCLT,
		0,
		() => exports.ProvidedContext$
	];
	var tagListType = [
		1,
		n0,
		_tLT,
		0,
		() => exports.Tag$
	];
	exports.AssumeRole$ = [
		9,
		n0,
		_AR,
		0,
		() => exports.AssumeRoleRequest$,
		() => exports.AssumeRoleResponse$
	];
	exports.AssumeRoleWithWebIdentity$ = [
		9,
		n0,
		_ARWWI,
		0,
		() => exports.AssumeRoleWithWebIdentityRequest$,
		() => exports.AssumeRoleWithWebIdentityResponse$
	];
}));
var require_runtimeConfig_shared = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var core_1 = require_dist_cjs();
	var protocols_1 = require_protocols();
	var core_2 = require_dist_cjs$1();
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var url_parser_1 = (init_dist_es$4(), __toCommonJS(dist_es_exports$4));
	var util_base64_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$5));
	var util_utf8_1 = (init_dist_es$6(), __toCommonJS(dist_es_exports$6));
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
	var endpointResolver_1 = require_endpointResolver();
	var schemas_0_1 = require_schemas_0();
	var getRuntimeConfig = (config) => {
		return {
			apiVersion: "2011-06-15",
			base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
			base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [{
				schemeId: "aws.auth#sigv4",
				identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
				signer: new core_1.AwsSdkSigV4Signer()
			}, {
				schemeId: "smithy.api#noAuth",
				identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
				signer: new core_2.NoAuthSigner()
			}],
			logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
			protocol: config?.protocol ?? protocols_1.AwsQueryProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.sts",
				errorTypeRegistries: schemas_0_1.errorTypeRegistries,
				xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
				version: "2011-06-15",
				serviceTarget: "AWSSecurityTokenServiceV20110615"
			},
			serviceId: config?.serviceId ?? "STS",
			urlParser: config?.urlParser ?? url_parser_1.parseUrl,
			utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
var require_runtimeConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var package_json_1 = require_tslib().__importDefault((init_package(), __toCommonJS(package_exports).default));
	var core_1 = require_dist_cjs();
	var util_user_agent_node_1 = (init_dist_es$7(), __toCommonJS(dist_es_exports$7));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core_2 = require_dist_cjs$1();
	var hash_node_1 = (init_dist_es$9(), __toCommonJS(dist_es_exports$9));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var node_config_provider_1 = (init_dist_es$11(), __toCommonJS(dist_es_exports$11));
	var node_http_handler_1 = (init_dist_es$12(), __toCommonJS(dist_es_exports$12));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var util_body_length_node_1 = (init_dist_es$13(), __toCommonJS(dist_es_exports$13));
	var util_defaults_mode_node_1 = (init_dist_es$14(), __toCommonJS(dist_es_exports$14));
	var util_retry_1 = (init_dist_es$15(), __toCommonJS(dist_es_exports$15));
	var runtimeConfig_shared_1 = require_runtimeConfig_shared();
	var getRuntimeConfig = (config) => {
		(0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
		const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
		const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
		const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
		(0, core_1.emitWarningIfUnsupportedVersion)(process.version);
		const loaderConfig = {
			profile: config?.profile,
			logger: clientSharedValues.logger
		};
		return {
			...clientSharedValues,
			...config,
			runtime: "node",
			defaultsMode,
			authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
			bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
			defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({
				serviceId: clientSharedValues.serviceId,
				clientVersion: package_json_1.default.version
			}),
			httpAuthSchemes: config?.httpAuthSchemes ?? [{
				schemeId: "aws.auth#sigv4",
				identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") || (async (idProps) => await config.credentialDefaultProvider(idProps?.__config || {})()),
				signer: new core_1.AwsSdkSigV4Signer()
			}, {
				schemeId: "smithy.api#noAuth",
				identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
				signer: new core_2.NoAuthSigner()
			}],
			maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
			region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, {
				...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS,
				...loaderConfig
			}),
			requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
			retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
				...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
				default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
			}, config),
			sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
			streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
var require_httpAuthExtensionConfiguration = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthRuntimeConfig = exports.getHttpAuthExtensionConfiguration = void 0;
	var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
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
	exports.getHttpAuthExtensionConfiguration = getHttpAuthExtensionConfiguration;
	var resolveHttpAuthRuntimeConfig = (config) => {
		return {
			httpAuthSchemes: config.httpAuthSchemes(),
			httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
			credentials: config.credentials()
		};
	};
	exports.resolveHttpAuthRuntimeConfig = resolveHttpAuthRuntimeConfig;
}));
var require_runtimeExtensions = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveRuntimeExtensions = void 0;
	var region_config_resolver_1 = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var protocol_http_1 = (init_dist_es$23(), __toCommonJS(dist_es_exports$23));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var httpAuthExtensionConfiguration_1 = require_httpAuthExtensionConfiguration();
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign((0, region_config_resolver_1.getAwsRegionExtensionConfiguration)(runtimeConfig), (0, smithy_client_1.getDefaultExtensionConfiguration)(runtimeConfig), (0, protocol_http_1.getHttpHandlerExtensionConfiguration)(runtimeConfig), (0, httpAuthExtensionConfiguration_1.getHttpAuthExtensionConfiguration)(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, (0, region_config_resolver_1.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0, smithy_client_1.resolveDefaultRuntimeConfig)(extensionConfiguration), (0, protocol_http_1.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), (0, httpAuthExtensionConfiguration_1.resolveHttpAuthRuntimeConfig)(extensionConfiguration));
	};
	exports.resolveRuntimeExtensions = resolveRuntimeExtensions;
}));
var require_STSClient = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.STSClient = exports.__Client = void 0;
	var middleware_host_header_1 = (init_dist_es$16(), __toCommonJS(dist_es_exports$16));
	var middleware_logger_1 = (init_dist_es$17(), __toCommonJS(dist_es_exports$17));
	var middleware_recursion_detection_1 = (init_dist_es$18(), __toCommonJS(dist_es_exports$18));
	var middleware_user_agent_1 = (init_dist_es$19(), __toCommonJS(dist_es_exports$19));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core_1 = require_dist_cjs$1();
	var schema_1 = require_schema();
	var middleware_content_length_1 = (init_dist_es$20(), __toCommonJS(dist_es_exports$20));
	var middleware_endpoint_1 = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__Client", {
		enumerable: true,
		get: function() {
			return smithy_client_1.Client;
		}
	});
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
	var EndpointParameters_1 = require_EndpointParameters();
	var runtimeConfig_1 = require_runtimeConfig();
	var runtimeExtensions_1 = require_runtimeExtensions();
	var STSClient = class extends smithy_client_1.Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_1 = (0, EndpointParameters_1.resolveClientEndpointParameters)(_config_0);
			const _config_2 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_1);
			const _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
			const _config_4 = (0, config_resolver_1.resolveRegionConfig)(_config_3);
			const _config_5 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_4);
			const _config_6 = (0, middleware_endpoint_1.resolveEndpointConfig)(_config_5);
			const _config_7 = (0, httpAuthSchemeProvider_1.resolveHttpAuthSchemeConfig)(_config_6);
			this.config = (0, runtimeExtensions_1.resolveRuntimeExtensions)(_config_7, configuration?.extensions || []);
			this.middlewareStack.use((0, schema_1.getSchemaSerdePlugin)(this.config));
			this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
			this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
			this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
			this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
			this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
			this.middlewareStack.use((0, middleware_recursion_detection_1.getRecursionDetectionPlugin)(this.config));
			this.middlewareStack.use((0, core_1.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
				httpAuthSchemeParametersProvider: httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new core_1.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use((0, core_1.getHttpSigningPlugin)(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	exports.STSClient = STSClient;
}));
var require_sts = /* @__PURE__ */ __commonJSMin(((exports) => {
	var STSClient = require_STSClient();
	var smithyClient = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var middlewareEndpoint = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var EndpointParameters = require_EndpointParameters();
	var schemas_0 = require_schemas_0();
	var errors = require_errors();
	var client = require_client();
	var regionConfigResolver = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var STSServiceException = require_STSServiceException();
	var AssumeRoleCommand = class extends smithyClient.Command.classBuilder().ep(EndpointParameters.commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").sc(schemas_0.AssumeRole$).build() {};
	var AssumeRoleWithWebIdentityCommand = class extends smithyClient.Command.classBuilder().ep(EndpointParameters.commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").sc(schemas_0.AssumeRoleWithWebIdentity$).build() {};
	var commands = {
		AssumeRoleCommand,
		AssumeRoleWithWebIdentityCommand
	};
	var STS = class extends STSClient.STSClient {};
	smithyClient.createAggregatedClient(commands, STS);
	var getAccountIdFromAssumedRoleUser = (assumedRoleUser) => {
		if (typeof assumedRoleUser?.Arn === "string") {
			const arnComponents = assumedRoleUser.Arn.split(":");
			if (arnComponents.length > 4 && arnComponents[4] !== "") return arnComponents[4];
		}
	};
	var resolveRegion = async (_region, _parentRegion, credentialProviderLogger, loaderConfig = {}) => {
		const region = typeof _region === "function" ? await _region() : _region;
		const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
		let stsDefaultRegion = "";
		const resolvedRegion = region ?? parentRegion ?? (stsDefaultRegion = await regionConfigResolver.stsRegionDefaultResolver(loaderConfig)());
		credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (credential provider clientConfig)`, `${parentRegion} (contextual client)`, `${stsDefaultRegion} (STS default: AWS_REGION, profile region, or us-east-1)`);
		return resolvedRegion;
	};
	var getDefaultRoleAssumer$1 = (stsOptions, STSClient) => {
		let stsClient;
		let closureSourceCreds;
		return async (sourceCreds, params) => {
			closureSourceCreds = sourceCreds;
			if (!stsClient) {
				const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
				const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
					logger,
					profile
				});
				const isCompatibleRequestHandler = !isH2(requestHandler);
				stsClient = new STSClient({
					...stsOptions,
					userAgentAppId,
					profile,
					credentialDefaultProvider: () => async () => closureSourceCreds,
					region: resolvedRegion,
					requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
					logger
				});
			}
			const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleCommand(params));
			if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
			const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
			const credentials = {
				accessKeyId: Credentials.AccessKeyId,
				secretAccessKey: Credentials.SecretAccessKey,
				sessionToken: Credentials.SessionToken,
				expiration: Credentials.Expiration,
				...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
				...accountId && { accountId }
			};
			client.setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
			return credentials;
		};
	};
	var getDefaultRoleAssumerWithWebIdentity$1 = (stsOptions, STSClient) => {
		let stsClient;
		return async (params) => {
			if (!stsClient) {
				const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
				const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
					logger,
					profile
				});
				const isCompatibleRequestHandler = !isH2(requestHandler);
				stsClient = new STSClient({
					...stsOptions,
					userAgentAppId,
					profile,
					region: resolvedRegion,
					requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
					logger
				});
			}
			const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleWithWebIdentityCommand(params));
			if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
			const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
			const credentials = {
				accessKeyId: Credentials.AccessKeyId,
				secretAccessKey: Credentials.SecretAccessKey,
				sessionToken: Credentials.SessionToken,
				expiration: Credentials.Expiration,
				...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
				...accountId && { accountId }
			};
			if (accountId) client.setCredentialFeature(credentials, "RESOLVED_ACCOUNT_ID", "T");
			client.setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
			return credentials;
		};
	};
	var isH2 = (requestHandler) => {
		return requestHandler?.metadata?.handlerProtocol === "h2";
	};
	var getCustomizableStsClientCtor = (baseCtor, customizations) => {
		if (!customizations) return baseCtor;
		else return class CustomizableSTSClient extends baseCtor {
			constructor(config) {
				super(config);
				for (const customization of customizations) this.middlewareStack.use(customization);
			}
		};
	};
	var getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumer$1(stsOptions, getCustomizableStsClientCtor(STSClient.STSClient, stsPlugins));
	var getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumerWithWebIdentity$1(stsOptions, getCustomizableStsClientCtor(STSClient.STSClient, stsPlugins));
	var decorateDefaultCredentialProvider = (provider) => (input) => provider({
		roleAssumer: getDefaultRoleAssumer(input),
		roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input),
		...input
	});
	Object.defineProperty(exports, "$Command", {
		enumerable: true,
		get: function() {
			return smithyClient.Command;
		}
	});
	Object.defineProperty(exports, "STSServiceException", {
		enumerable: true,
		get: function() {
			return STSServiceException.STSServiceException;
		}
	});
	exports.AssumeRoleCommand = AssumeRoleCommand;
	exports.AssumeRoleWithWebIdentityCommand = AssumeRoleWithWebIdentityCommand;
	exports.STS = STS;
	exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;
	exports.getDefaultRoleAssumer = getDefaultRoleAssumer;
	exports.getDefaultRoleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity;
	Object.keys(STSClient).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return STSClient[k];
			}
		});
	});
	Object.keys(schemas_0).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return schemas_0[k];
			}
		});
	});
	Object.keys(errors).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
			enumerable: true,
			get: function() {
				return errors[k];
			}
		});
	});
}));
export { require_sso_oidc as n, require_signin as r, require_sts as t };

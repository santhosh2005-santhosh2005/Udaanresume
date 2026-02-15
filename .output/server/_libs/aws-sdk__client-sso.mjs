import { $t as require_dist_cjs$1, At as init_dist_es$19, Bt as getDefaultExtensionConfiguration, C as createDefaultUserAgentProvider, Cn as resolveHttpHandlerRuntimeConfig, Ct as customEndpointFunctions, Dt as init_dist_es$20, F as NODE_RETRY_MODE_CONFIG_OPTIONS, Ft as resolveHostHeaderConfig, G as init_dist_es$11, Gt as Command, H as resolveEndpointConfig, Ht as emitWarningIfUnsupportedVersion, I as resolveRetryConfig, It as require_dist_cjs, K as loadConfig, Kt as Client, M as init_dist_es$10, N as getRetryPlugin, Nt as getHostHeaderPlugin, Ot as getRecursionDetectionPlugin, P as NODE_MAX_ATTEMPT_CONFIG_OPTIONS, Pt as init_dist_es$18, R as init_dist_es$15, Rt as init_dist_es$3, S as NODE_APP_ID_CONFIG_OPTIONS, Sn as getHttpHandlerExtensionConfiguration, St as resolveEndpoint, Tt as resolveUserAgentConfig, U as getEndpointPlugin, Ut as loadConfigsForDefaultMode, V as init_dist_es$23, Vt as resolveDefaultRuntimeConfig, Wt as ServiceException, _ as Hash, _n as normalizeProvider, _t as init_dist_es$4, an as streamCollector, at as init_dist_es$8, bn as init_dist_es$17, c as getAwsRegionExtensionConfiguration, cn as init_dist_es$5, ct as NODE_REGION_CONFIG_OPTIONS, dn as init_dist_es$6, en as require_schema, f as init_dist_es$14, fn as toUtf8, ft as init_dist_es$21, g as calculateBodyLength, gn as init_dist_es, h as init_dist_es$13, ht as init_dist_es$1, in as init_dist_es$12, jt as getLoggerPlugin, l as resolveAwsRegionExtensionConfiguration, ln as toBase64, lt as NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, mn as fromBase64, nt as getContentLengthPlugin, on as NodeHttpHandler, ot as resolveRegionConfig, p as resolveDefaultsModeConfig, pn as fromUtf8, pt as getUserAgentPlugin, rt as init_dist_es$22, s as init_dist_es$16, st as NODE_REGION_CONFIG_FILE_OPTIONS, u as require_protocols, ut as NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, vn as getSmithyContext, vt as parseUrl, wt as EndpointCache, x as init_dist_es$7, xt as init_dist_es$2, y as init_dist_es$9, yt as awsEndpointFunctions, z as DEFAULT_RETRY_MODE, zt as NoOpLogger } from "./@aws-sdk/client-s3+[...].mjs";
var import_dist_cjs$1 = require_dist_cjs();
init_dist_es();
const defaultSSOHttpAuthSchemeParametersProvider = async (config, context, input) => {
	return {
		operation: getSmithyContext(context).operation,
		region: await normalizeProvider(config.region)() || (() => {
			throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
		})()
	};
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
	return {
		schemeId: "aws.auth#sigv4",
		signingProperties: {
			name: "awsssoportal",
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
const defaultSSOHttpAuthSchemeProvider = (authParameters) => {
	const options = [];
	switch (authParameters.operation) {
		case "GetRoleCredentials":
			options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
			break;
		case "ListAccountRoles":
			options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
			break;
		case "ListAccounts":
			options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
			break;
		case "Logout":
			options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
			break;
		default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
	}
	return options;
};
const resolveHttpAuthSchemeConfig = (config) => {
	const config_0 = (0, import_dist_cjs$1.resolveAwsSdkSigV4Config)(config);
	return Object.assign(config_0, { authSchemePreference: normalizeProvider(config.authSchemePreference ?? []) });
};
const resolveClientEndpointParameters = (options) => {
	return Object.assign(options, {
		useDualstackEndpoint: options.useDualstackEndpoint ?? false,
		useFipsEndpoint: options.useFipsEndpoint ?? false,
		defaultSigningName: "awsssoportal"
	});
};
const commonParams = {
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
const name = "@aws-sdk/client-sso";
const description = "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native";
const version = "3.990.0";
const scripts = {
	"build": "concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs",
	"build:cjs": "node ../../scripts/compilation/inline client-sso",
	"build:es": "tsc -p tsconfig.es.json",
	"build:include:deps": "yarn g:turbo run build -F=\"$npm_package_name\"",
	"build:types": "tsc -p tsconfig.types.json",
	"build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
	"clean": "premove dist-cjs dist-es dist-types tsconfig.cjs.tsbuildinfo tsconfig.es.tsbuildinfo tsconfig.types.tsbuildinfo",
	"extract:docs": "api-extractor run --local",
	"generate:client": "node ../../scripts/generate-clients/single-service --solo sso",
	"test:index": "tsc --noEmit ./test/index-types.ts && node ./test/index-objects.spec.mjs"
};
const main = "./dist-cjs/index.js";
const types = "./dist-types/index.d.ts";
const module = "./dist-es/index.js";
const dependencies = {
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
const devDependencies = {
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
const homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso";
const repository = {
	"type": "git",
	"url": "https://github.com/aws/aws-sdk-js-v3.git",
	"directory": "clients/client-sso"
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
const ruleSet = {
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
									url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
									url: "https://portal.sso.{Region}.amazonaws.com",
									properties: n,
									headers: n
								},
								type: e
							}, {
								endpoint: {
									url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
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
									url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
							url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
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
init_dist_es$1();
init_dist_es$2();
var cache = new EndpointCache({
	size: 50,
	params: [
		"Endpoint",
		"Region",
		"UseDualStack",
		"UseFIPS"
	]
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
	return cache.get(endpointParams, () => resolveEndpoint(ruleSet, {
		endpointParams,
		logger: context.logger
	}));
};
customEndpointFunctions.aws = awsEndpointFunctions;
init_dist_es$3();
var SSOServiceException = class SSOServiceException extends ServiceException {
	constructor(options) {
		super(options);
		Object.setPrototypeOf(this, SSOServiceException.prototype);
	}
};
var InvalidRequestException = class InvalidRequestException extends SSOServiceException {
	name = "InvalidRequestException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "InvalidRequestException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, InvalidRequestException.prototype);
	}
};
var ResourceNotFoundException = class ResourceNotFoundException extends SSOServiceException {
	name = "ResourceNotFoundException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "ResourceNotFoundException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
	}
};
var TooManyRequestsException = class TooManyRequestsException extends SSOServiceException {
	name = "TooManyRequestsException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "TooManyRequestsException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, TooManyRequestsException.prototype);
	}
};
var UnauthorizedException = class UnauthorizedException extends SSOServiceException {
	name = "UnauthorizedException";
	$fault = "client";
	constructor(opts) {
		super({
			name: "UnauthorizedException",
			$fault: "client",
			...opts
		});
		Object.setPrototypeOf(this, UnauthorizedException.prototype);
	}
};
var import_schema = require_schema();
var _ATT = "AccessTokenType";
var _GRC = "GetRoleCredentials";
var _GRCR = "GetRoleCredentialsRequest";
var _GRCRe = "GetRoleCredentialsResponse";
var _IRE = "InvalidRequestException";
var _RC = "RoleCredentials";
var _RNFE = "ResourceNotFoundException";
var _SAKT = "SecretAccessKeyType";
var _STT = "SessionTokenType";
var _TMRE = "TooManyRequestsException";
var _UE = "UnauthorizedException";
var _aI = "accountId";
var _aKI = "accessKeyId";
var _aT = "accessToken";
var _ai = "account_id";
var _c = "client";
var _e = "error";
var _ex = "expiration";
var _h = "http";
var _hE = "httpError";
var _hH = "httpHeader";
var _hQ = "httpQuery";
var _m = "message";
var _rC = "roleCredentials";
var _rN = "roleName";
var _rn = "role_name";
var _s = "smithy.ts.sdk.synthetic.com.amazonaws.sso";
var _sAK = "secretAccessKey";
var _sT = "sessionToken";
var _xasbt = "x-amz-sso_bearer_token";
var n0 = "com.amazonaws.sso";
var _s_registry = import_schema.TypeRegistry.for(_s);
var SSOServiceException$ = [
	-3,
	_s,
	"SSOServiceException",
	0,
	[],
	[]
];
_s_registry.registerError(SSOServiceException$, SSOServiceException);
var n0_registry = import_schema.TypeRegistry.for(n0);
var InvalidRequestException$ = [
	-3,
	n0,
	_IRE,
	{
		[_e]: _c,
		[_hE]: 400
	},
	[_m],
	[0]
];
n0_registry.registerError(InvalidRequestException$, InvalidRequestException);
var ResourceNotFoundException$ = [
	-3,
	n0,
	_RNFE,
	{
		[_e]: _c,
		[_hE]: 404
	},
	[_m],
	[0]
];
n0_registry.registerError(ResourceNotFoundException$, ResourceNotFoundException);
var TooManyRequestsException$ = [
	-3,
	n0,
	_TMRE,
	{
		[_e]: _c,
		[_hE]: 429
	},
	[_m],
	[0]
];
n0_registry.registerError(TooManyRequestsException$, TooManyRequestsException);
var UnauthorizedException$ = [
	-3,
	n0,
	_UE,
	{
		[_e]: _c,
		[_hE]: 401
	},
	[_m],
	[0]
];
n0_registry.registerError(UnauthorizedException$, UnauthorizedException);
const errorTypeRegistries = [_s_registry, n0_registry];
var AccessTokenType = [
	0,
	n0,
	_ATT,
	8,
	0
];
var SecretAccessKeyType = [
	0,
	n0,
	_SAKT,
	8,
	0
];
var SessionTokenType = [
	0,
	n0,
	_STT,
	8,
	0
];
var GetRoleCredentialsRequest$ = [
	3,
	n0,
	_GRCR,
	0,
	[
		_rN,
		_aI,
		_aT
	],
	[
		[0, { [_hQ]: _rn }],
		[0, { [_hQ]: _ai }],
		[() => AccessTokenType, { [_hH]: _xasbt }]
	],
	3
];
var GetRoleCredentialsResponse$ = [
	3,
	n0,
	_GRCRe,
	0,
	[_rC],
	[[() => RoleCredentials$, 0]]
];
var RoleCredentials$ = [
	3,
	n0,
	_RC,
	0,
	[
		_aKI,
		_sAK,
		_sT,
		_ex
	],
	[
		0,
		[() => SecretAccessKeyType, 0],
		[() => SessionTokenType, 0],
		1
	]
];
var GetRoleCredentials$ = [
	9,
	n0,
	_GRC,
	{ [_h]: [
		"GET",
		"/federation/credentials",
		200
	] },
	() => GetRoleCredentialsRequest$,
	() => GetRoleCredentialsResponse$
];
var import_protocols = require_protocols();
var import_dist_cjs = require_dist_cjs$1();
init_dist_es$3();
init_dist_es$4();
init_dist_es$5();
init_dist_es$6();
const getRuntimeConfig$1 = (config) => {
	return {
		apiVersion: "2019-06-10",
		base64Decoder: config?.base64Decoder ?? fromBase64,
		base64Encoder: config?.base64Encoder ?? toBase64,
		disableHostPrefix: config?.disableHostPrefix ?? false,
		endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
		extensions: config?.extensions ?? [],
		httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSSOHttpAuthSchemeProvider,
		httpAuthSchemes: config?.httpAuthSchemes ?? [{
			schemeId: "aws.auth#sigv4",
			identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
			signer: new import_dist_cjs$1.AwsSdkSigV4Signer()
		}, {
			schemeId: "smithy.api#noAuth",
			identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
			signer: new import_dist_cjs.NoAuthSigner()
		}],
		logger: config?.logger ?? new NoOpLogger(),
		protocol: config?.protocol ?? import_protocols.AwsRestJsonProtocol,
		protocolSettings: config?.protocolSettings ?? {
			defaultNamespace: "com.amazonaws.sso",
			errorTypeRegistries,
			version: "2019-06-10",
			serviceTarget: "SWBPortalService"
		},
		serviceId: config?.serviceId ?? "SSO",
		urlParser: config?.urlParser ?? parseUrl,
		utf8Decoder: config?.utf8Decoder ?? fromUtf8,
		utf8Encoder: config?.utf8Encoder ?? toUtf8
	};
};
init_dist_es$7();
init_dist_es$8();
init_dist_es$9();
init_dist_es$10();
init_dist_es$11();
init_dist_es$12();
init_dist_es$3();
init_dist_es$13();
init_dist_es$14();
init_dist_es$15();
const getRuntimeConfig = (config) => {
	emitWarningIfUnsupportedVersion(process.version);
	const defaultsMode = resolveDefaultsModeConfig(config);
	const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
	const clientSharedValues = getRuntimeConfig$1(config);
	(0, import_dist_cjs$1.emitWarningIfUnsupportedVersion)(process.version);
	const loaderConfig = {
		profile: config?.profile,
		logger: clientSharedValues.logger
	};
	return {
		...clientSharedValues,
		...config,
		runtime: "node",
		defaultsMode,
		authSchemePreference: config?.authSchemePreference ?? loadConfig(import_dist_cjs$1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
		bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
		defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({
			serviceId: clientSharedValues.serviceId,
			clientVersion: package_default.version
		}),
		maxAttempts: config?.maxAttempts ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
		region: config?.region ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, {
			...NODE_REGION_CONFIG_FILE_OPTIONS,
			...loaderConfig
		}),
		requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
		retryMode: config?.retryMode ?? loadConfig({
			...NODE_RETRY_MODE_CONFIG_OPTIONS,
			default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
		}, config),
		sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
		streamCollector: config?.streamCollector ?? streamCollector,
		useDualstackEndpoint: config?.useDualstackEndpoint ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		useFipsEndpoint: config?.useFipsEndpoint ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
		userAgentAppId: config?.userAgentAppId ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
	};
};
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
init_dist_es$16();
init_dist_es$17();
init_dist_es$3();
const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
	const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
	extensions.forEach((extension) => extension.configure(extensionConfiguration));
	return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};
init_dist_es$18();
init_dist_es$19();
init_dist_es$20();
init_dist_es$21();
init_dist_es$8();
init_dist_es$22();
init_dist_es$23();
init_dist_es$10();
init_dist_es$3();
var SSOClient = class extends Client {
	config;
	constructor(...[configuration]) {
		const _config_0 = getRuntimeConfig(configuration || {});
		super(_config_0);
		this.initConfig = _config_0;
		this.config = resolveRuntimeExtensions(resolveHttpAuthSchemeConfig(resolveEndpointConfig(resolveHostHeaderConfig(resolveRegionConfig(resolveRetryConfig(resolveUserAgentConfig(resolveClientEndpointParameters(_config_0))))))), configuration?.extensions || []);
		this.middlewareStack.use((0, import_schema.getSchemaSerdePlugin)(this.config));
		this.middlewareStack.use(getUserAgentPlugin(this.config));
		this.middlewareStack.use(getRetryPlugin(this.config));
		this.middlewareStack.use(getContentLengthPlugin(this.config));
		this.middlewareStack.use(getHostHeaderPlugin(this.config));
		this.middlewareStack.use(getLoggerPlugin(this.config));
		this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
		this.middlewareStack.use((0, import_dist_cjs.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
			httpAuthSchemeParametersProvider: defaultSSOHttpAuthSchemeParametersProvider,
			identityProviderConfigProvider: async (config) => new import_dist_cjs.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
		}));
		this.middlewareStack.use((0, import_dist_cjs.getHttpSigningPlugin)(this.config));
	}
	destroy() {
		super.destroy();
	}
};
init_dist_es$23();
init_dist_es$3();
var GetRoleCredentialsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
	return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
}).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").sc(GetRoleCredentials$).build() {};
export { SSOClient as n, GetRoleCredentialsCommand as t };

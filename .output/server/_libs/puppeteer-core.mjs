import { s as __toESM } from "../_runtime.mjs";
import { $n as isDate, An as AsyncIterableUtil, Ar as combineLatest, At as Realm$1, Br as raceWith, Cn as LazyArg, Cr as EventEmitter, Ct as ConsoleMessage, Dt as WebWorker, En as stringifyFunction, Er as DisposableStack, Et as Accessibility, Fn as BrowserContext, Fr as firstValueFrom, Gn as evaluationString, Gt as handleError, Hn as SOURCE_URL_REGEX, Ht as HTTPRequest, Ir as from, It as Keyboard, Jn as fromEmitterEvent, Ln as Deferred, Lr as map, Lt as Mouse, Mn as DeviceRequestPrompt, Mr as delayWhen, Nn as CDPSession, Nr as filter, Nt as Page, On as isErrorLike, Ot as Target, Pr as first, Qn as getSourceUrlComment, Rn as Browser$1, Rr as of, Rt as MouseButton, Sr as environment, St as FileChooser, Tn as interpolateFunction, Ut as InterceptResolutionAction, Vn as PuppeteerURL, Vr as switchMap, Vt as HTTPResponse, Wn as debugError, Wt as STATUS_TEXTS, Xt as ElementHandle, Yt as throwIfDetached, Zn as getSourcePuppeteerURLIfAvailable, Zt as bindIsolatedHandle, _r as debug, ar as timeout, bn as scriptInjector, br as stringToTypedArray, bt as CallbackRegistry, cn as inertIfDisposed, dr as ProtocolError, dt as EmulationManager, gr as UnsupportedOperation, hr as TouchError, ir as parsePDFOptions, jn as Dialog, jr as defer, k as Tracing, kr as disposeSymbol, kt as TargetType, ln as invokeAtMostOnceForArguments, mr as TimeoutError, mt as Coverage, nr as isRegExp, on as JSHandle, pr as TargetCloseError, qn as fromAbortSignal, qt as Frame, rr as isString, sn as bubble, tr as isPlainObject, un as throwIfDisposed, ur as ConnectionClosedError, xn as ARIAQueryHandler, xr as assert, yr as stringToBase64, z as SecurityDetails, zn as WEB_PERMISSION_TO_PROTOCOL_PERMISSION, zr as race, zt as Touchscreen } from "./puppeteer.mjs";
import { t as require_BidiMapper } from "./chromium-bidi+mitt.mjs";
/**
* @internal
*/
var BrowserWebSocketTransport = class BrowserWebSocketTransport {
	static create(url) {
		return new Promise((resolve, reject) => {
			const ws = new WebSocket(url);
			ws.addEventListener("open", () => {
				return resolve(new BrowserWebSocketTransport(ws));
			});
			ws.addEventListener("error", reject);
		});
	}
	#ws;
	onmessage;
	onclose;
	constructor(ws) {
		this.#ws = ws;
		this.#ws.addEventListener("message", (event) => {
			if (this.onmessage) this.onmessage.call(null, event.data);
		});
		this.#ws.addEventListener("close", () => {
			if (this.onclose) this.onclose.call(null);
		});
		this.#ws.addEventListener("error", () => {});
	}
	send(message) {
		this.#ws.send(message);
	}
	close() {
		this.#ws.close();
	}
};
/**
* @internal
*/
var BidiCdpSession = class BidiCdpSession extends CDPSession {
	static sessions = /* @__PURE__ */ new Map();
	#detached = false;
	#connection;
	#sessionId = Deferred.create();
	frame;
	constructor(frame, sessionId) {
		super();
		this.frame = frame;
		if (!this.frame.page().browser().cdpSupported) return;
		const connection = this.frame.page().browser().connection;
		this.#connection = connection;
		if (sessionId) {
			this.#sessionId.resolve(sessionId);
			BidiCdpSession.sessions.set(sessionId, this);
		} else (async () => {
			try {
				const { result } = await connection.send("goog:cdp.getSession", { context: frame._id });
				this.#sessionId.resolve(result.session);
				BidiCdpSession.sessions.set(result.session, this);
			} catch (error) {
				this.#sessionId.reject(error);
			}
		})();
		BidiCdpSession.sessions.set(this.#sessionId.value(), this);
	}
	connection() {}
	get detached() {
		return this.#detached;
	}
	async send(method, params, options) {
		if (this.#connection === void 0) throw new UnsupportedOperation("CDP support is required for this feature. The current browser does not support CDP.");
		if (this.#detached) throw new TargetCloseError(`Protocol error (${method}): Session closed. Most likely the page has been closed.`);
		const session = await this.#sessionId.valueOrThrow();
		const { result } = await this.#connection.send("goog:cdp.sendCommand", {
			method,
			params,
			session
		}, options?.timeout);
		return result.result;
	}
	async detach() {
		if (this.#connection === void 0 || this.#connection.closed || this.#detached) return;
		try {
			await this.frame.client.send("Target.detachFromTarget", { sessionId: this.id() });
		} finally {
			this.onClose();
		}
	}
	/**
	* @internal
	*/
	onClose = () => {
		BidiCdpSession.sessions.delete(this.id());
		this.#detached = true;
	};
	id() {
		const value = this.#sessionId.value();
		return typeof value === "string" ? value : "";
	}
};
/**
* @license
* Copyright 2017 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var debugProtocolSend = debug("puppeteer:webDriverBiDi:SEND ►");
var debugProtocolReceive = debug("puppeteer:webDriverBiDi:RECV ◀");
/**
* @internal
*/
var BidiConnection = class extends EventEmitter {
	#url;
	#transport;
	#delay;
	#timeout = 0;
	#closed = false;
	#callbacks;
	#emitters = [];
	constructor(url, transport, idGenerator, delay = 0, timeout) {
		super();
		this.#url = url;
		this.#delay = delay;
		this.#timeout = timeout ?? 18e4;
		this.#callbacks = new CallbackRegistry(idGenerator);
		this.#transport = transport;
		this.#transport.onmessage = this.onMessage.bind(this);
		this.#transport.onclose = this.unbind.bind(this);
	}
	get closed() {
		return this.#closed;
	}
	get url() {
		return this.#url;
	}
	pipeTo(emitter) {
		this.#emitters.push(emitter);
	}
	#toWebDriverOnlyEvent(event) {
		for (const key in event) if (key.startsWith("goog:")) delete event[key];
		else if (typeof event[key] === "object" && event[key] !== null) this.#toWebDriverOnlyEvent(event[key]);
	}
	emit(type, event) {
		if (process.env["PUPPETEER_WEBDRIVER_BIDI_ONLY"] === "true") this.#toWebDriverOnlyEvent(event);
		for (const emitter of this.#emitters) emitter.emit(type, event);
		return super.emit(type, event);
	}
	send(method, params, timeout) {
		if (this.#closed) return Promise.reject(new ConnectionClosedError("Connection closed."));
		return this.#callbacks.create(method, timeout ?? this.#timeout, (id) => {
			const stringifiedMessage = JSON.stringify({
				id,
				method,
				params
			});
			debugProtocolSend(stringifiedMessage);
			this.#transport.send(stringifiedMessage);
		});
	}
	/**
	* @internal
	*/
	async onMessage(message) {
		if (this.#delay) await new Promise((f) => {
			return setTimeout(f, this.#delay);
		});
		debugProtocolReceive(message);
		const object = JSON.parse(message);
		if ("type" in object) switch (object.type) {
			case "success":
				this.#callbacks.resolve(object.id, object);
				return;
			case "error":
				if (object.id === null) break;
				this.#callbacks.reject(object.id, createProtocolError(object), `${object.error}: ${object.message}`);
				return;
			case "event":
				if (isCdpEvent(object)) {
					BidiCdpSession.sessions.get(object.params.session)?.emit(object.params.event, object.params.params);
					return;
				}
				this.emit(object.method, object.params);
				return;
		}
		if ("id" in object) this.#callbacks.reject(object.id, `Protocol Error. Message is not in BiDi protocol format: '${message}'`, object.message);
		debugError(object);
	}
	/**
	* Unbinds the connection, but keeps the transport open. Useful when the transport will
	* be reused by other connection e.g. with different protocol.
	* @internal
	*/
	unbind() {
		if (this.#closed) return;
		this.#closed = true;
		this.#transport.onmessage = () => {};
		this.#transport.onclose = () => {};
		this.#callbacks.clear();
	}
	/**
	* Unbinds the connection and closes the transport.
	*/
	dispose() {
		this.unbind();
		this.#transport.close();
	}
	getPendingProtocolErrors() {
		return this.#callbacks.getPendingProtocolErrors();
	}
};
/**
* @internal
*/
function createProtocolError(object) {
	let message = `${object.error} ${object.message}`;
	if (object.stacktrace) message += ` ${object.stacktrace}`;
	return message;
}
function isCdpEvent(event) {
	return event.method.startsWith("goog:cdp.");
}
var import_BidiMapper = /* @__PURE__ */ __toESM(require_BidiMapper());
var bidiServerLogger = (prefix, ...args) => {
	debug(`bidi:${prefix}`)(args);
};
/**
* @internal
*/
async function connectBidiOverCdp(cdp) {
	const transportBiDi = new NoOpTransport();
	const cdpConnectionAdapter = new CdpConnectionAdapter(cdp);
	const pptrTransport = {
		send(message) {
			transportBiDi.emitMessage(JSON.parse(message));
		},
		close() {
			bidiServer.close();
			cdpConnectionAdapter.close();
			cdp.dispose();
		},
		onmessage(_message) {}
	};
	transportBiDi.on("bidiResponse", (message) => {
		pptrTransport.onmessage(JSON.stringify(message));
	});
	const pptrBiDiConnection = new BidiConnection(cdp.url(), pptrTransport, cdp._idGenerator, cdp.delay, cdp.timeout);
	const bidiServer = await import_BidiMapper.BidiServer.createAndStart(transportBiDi, cdpConnectionAdapter, cdpConnectionAdapter.browserClient(), "", void 0, bidiServerLogger);
	return pptrBiDiConnection;
}
/**
* Manages CDPSessions for BidiServer.
* @internal
*/
var CdpConnectionAdapter = class {
	#cdp;
	#adapters = /* @__PURE__ */ new Map();
	#browserCdpConnection;
	constructor(cdp) {
		this.#cdp = cdp;
		this.#browserCdpConnection = new CDPClientAdapter(cdp);
	}
	browserClient() {
		return this.#browserCdpConnection;
	}
	getCdpClient(id) {
		const session = this.#cdp.session(id);
		if (!session) throw new Error(`Unknown CDP session with id ${id}`);
		if (!this.#adapters.has(session)) {
			const adapter = new CDPClientAdapter(session, id, this.#browserCdpConnection);
			this.#adapters.set(session, adapter);
			return adapter;
		}
		return this.#adapters.get(session);
	}
	close() {
		this.#browserCdpConnection.close();
		for (const adapter of this.#adapters.values()) adapter.close();
	}
};
/**
* Wrapper on top of CDPSession/CDPConnection to satisfy CDP interface that
* BidiServer needs.
*
* @internal
*/
var CDPClientAdapter = class extends import_BidiMapper.EventEmitter {
	#closed = false;
	#client;
	sessionId = void 0;
	#browserClient;
	constructor(client, sessionId, browserClient) {
		super();
		this.#client = client;
		this.sessionId = sessionId;
		this.#browserClient = browserClient;
		this.#client.on("*", this.#forwardMessage);
	}
	browserClient() {
		return this.#browserClient;
	}
	#forwardMessage = (method, event) => {
		this.emit(method, event);
	};
	async sendCommand(method, ...params) {
		if (this.#closed) return;
		try {
			return await this.#client.send(method, ...params);
		} catch (err) {
			if (this.#closed) return;
			throw err;
		}
	}
	close() {
		this.#client.off("*", this.#forwardMessage);
		this.#closed = true;
	}
	isCloseError(error) {
		return error instanceof TargetCloseError;
	}
};
/**
* This transport is given to the BiDi server instance and allows Puppeteer
* to send and receive commands to the BiDiServer.
* @internal
*/
var NoOpTransport = class extends import_BidiMapper.EventEmitter {
	#onMessage = async (_m) => {};
	emitMessage(message) {
		this.#onMessage(message);
	}
	setOnMessage(onMessage) {
		this.#onMessage = onMessage;
	}
	async sendMessage(message) {
		this.emit("bidiResponse", message);
	}
	close() {
		this.#onMessage = async (_m) => {};
	}
};
/**
* @license
* Copyright 2025 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
var BidiBluetoothEmulation = class {
	#session;
	#contextId;
	constructor(contextId, session) {
		this.#contextId = contextId;
		this.#session = session;
	}
	async emulateAdapter(state, leSupported = true) {
		await this.#session.send("bluetooth.simulateAdapter", {
			context: this.#contextId,
			state,
			leSupported
		});
	}
	async disableEmulation() {
		await this.#session.send("bluetooth.disableSimulation", { context: this.#contextId });
	}
	async simulatePreconnectedPeripheral(preconnectedPeripheral) {
		await this.#session.send("bluetooth.simulatePreconnectedPeripheral", {
			context: this.#contextId,
			address: preconnectedPeripheral.address,
			name: preconnectedPeripheral.name,
			manufacturerData: preconnectedPeripheral.manufacturerData,
			knownServiceUuids: preconnectedPeripheral.knownServiceUuids
		});
	}
};
/**
* @license
* Copyright 2025 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
var BidiDeviceRequestPromptManager = class {
	#session;
	#contextId;
	#enabled = false;
	constructor(contextId, session) {
		this.#session = session;
		this.#contextId = contextId;
	}
	async #enableIfNeeded() {
		if (!this.#enabled) {
			this.#enabled = true;
			await this.#session.subscribe(["bluetooth.requestDevicePromptUpdated"], [this.#contextId]);
		}
	}
	async waitForDevicePrompt(timeout, signal) {
		const deferred = Deferred.create({
			message: `Waiting for \`DeviceRequestPrompt\` failed: ${timeout}ms exceeded`,
			timeout
		});
		const onRequestDevicePromptUpdated = (params) => {
			if (params.context === this.#contextId) {
				deferred.resolve(new BidiDeviceRequestPrompt(this.#contextId, params.prompt, this.#session, params.devices));
				this.#session.off("bluetooth.requestDevicePromptUpdated", onRequestDevicePromptUpdated);
			}
		};
		this.#session.on("bluetooth.requestDevicePromptUpdated", onRequestDevicePromptUpdated);
		if (signal) signal.addEventListener("abort", () => {
			deferred.reject(signal.reason);
		}, { once: true });
		await this.#enableIfNeeded();
		return await deferred.valueOrThrow();
	}
};
/**
* @internal
*/
var BidiDeviceRequestPrompt = class extends DeviceRequestPrompt {
	#session;
	#promptId;
	#contextId;
	constructor(contextId, promptId, session, devices) {
		super();
		this.#session = session;
		this.#promptId = promptId;
		this.#contextId = contextId;
		this.devices.push(...devices.map((d) => {
			return {
				id: d.id,
				name: d.name ?? "UNKNOWN"
			};
		}));
	}
	async cancel() {
		await this.#session.send("bluetooth.handleRequestDevicePrompt", {
			context: this.#contextId,
			prompt: this.#promptId,
			accept: false
		});
	}
	async select(device) {
		await this.#session.send("bluetooth.handleRequestDevicePrompt", {
			context: this.#contextId,
			prompt: this.#promptId,
			accept: true,
			device: device.id
		});
	}
	waitForDevice() {
		throw new UnsupportedOperation();
	}
};
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$13 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$13 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/**
* @internal
*/
var Navigation = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _dispose_decorators;
	return class Navigation extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			__esDecorate$13(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static from(context) {
			const navigation = new Navigation(context);
			navigation.#initialize();
			return navigation;
		}
		#request = __runInitializers$13(this, _instanceExtraInitializers);
		#navigation;
		#browsingContext;
		#disposables = new DisposableStack();
		#id;
		constructor(context) {
			super();
			this.#browsingContext = context;
		}
		#initialize() {
			const browsingContextEmitter = this.#disposables.use(new EventEmitter(this.#browsingContext));
			browsingContextEmitter.once("closed", () => {
				this.emit("failed", {
					url: this.#browsingContext.url,
					timestamp: /* @__PURE__ */ new Date()
				});
				this.dispose();
			});
			browsingContextEmitter.on("request", ({ request }) => {
				if (request.navigation === void 0 || !this.#matches(request.navigation)) return;
				this.#request = request;
				this.emit("request", request);
				this.#disposables.use(new EventEmitter(this.#request)).on("redirect", (request) => {
					this.#request = request;
				});
			});
			const sessionEmitter = this.#disposables.use(new EventEmitter(this.#session));
			sessionEmitter.on("browsingContext.navigationStarted", (info) => {
				if (info.context !== this.#browsingContext.id || this.#navigation !== void 0) return;
				this.#navigation = Navigation.from(this.#browsingContext);
			});
			for (const eventName of ["browsingContext.domContentLoaded", "browsingContext.load"]) sessionEmitter.on(eventName, (info) => {
				if (info.context !== this.#browsingContext.id || info.navigation === null || !this.#matches(info.navigation)) return;
				this.dispose();
			});
			for (const [eventName, event] of [
				["browsingContext.fragmentNavigated", "fragment"],
				["browsingContext.navigationFailed", "failed"],
				["browsingContext.navigationAborted", "aborted"]
			]) sessionEmitter.on(eventName, (info) => {
				if (info.context !== this.#browsingContext.id || !this.#matches(info.navigation)) return;
				this.emit(event, {
					url: info.url,
					timestamp: new Date(info.timestamp)
				});
				this.dispose();
			});
		}
		#matches(navigation) {
			if (this.#navigation !== void 0 && !this.#navigation.disposed) return false;
			if (this.#id === void 0) {
				this.#id = navigation;
				return true;
			}
			return this.#id === navigation;
		}
		get #session() {
			return this.#browsingContext.userContext.browser.session;
		}
		get disposed() {
			return this.#disposables.disposed;
		}
		get request() {
			return this.#request;
		}
		get navigation() {
			return this.#navigation;
		}
		dispose() {
			this[disposeSymbol]();
		}
		[(_dispose_decorators = [inertIfDisposed], disposeSymbol)]() {
			this.#disposables.dispose();
			super[disposeSymbol]();
		}
	};
})();
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$12 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$12 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var _a$1;
/**
* @internal
*/
var Realm = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _dispose_decorators;
	let _disown_decorators;
	let _callFunction_decorators;
	let _evaluate_decorators;
	let _resolveExecutionContextId_decorators;
	return class Realm extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			__esDecorate$12(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$12(this, null, _disown_decorators, {
				kind: "method",
				name: "disown",
				static: false,
				private: false,
				access: {
					has: (obj) => "disown" in obj,
					get: (obj) => obj.disown
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$12(this, null, _callFunction_decorators, {
				kind: "method",
				name: "callFunction",
				static: false,
				private: false,
				access: {
					has: (obj) => "callFunction" in obj,
					get: (obj) => obj.callFunction
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$12(this, null, _evaluate_decorators, {
				kind: "method",
				name: "evaluate",
				static: false,
				private: false,
				access: {
					has: (obj) => "evaluate" in obj,
					get: (obj) => obj.evaluate
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$12(this, null, _resolveExecutionContextId_decorators, {
				kind: "method",
				name: "resolveExecutionContextId",
				static: false,
				private: false,
				access: {
					has: (obj) => "resolveExecutionContextId" in obj,
					get: (obj) => obj.resolveExecutionContextId
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		#reason = __runInitializers$12(this, _instanceExtraInitializers);
		disposables = new DisposableStack();
		id;
		origin;
		executionContextId;
		constructor(id, origin) {
			super();
			this.id = id;
			this.origin = origin;
		}
		get disposed() {
			return this.#reason !== void 0;
		}
		get target() {
			return { realm: this.id };
		}
		dispose(reason) {
			this.#reason = reason;
			this[disposeSymbol]();
		}
		async disown(handles) {
			await this.session.send("script.disown", {
				target: this.target,
				handles
			});
		}
		async callFunction(functionDeclaration, awaitPromise, options = {}) {
			const { result } = await this.session.send("script.callFunction", {
				functionDeclaration,
				awaitPromise,
				target: this.target,
				...options
			});
			return result;
		}
		async evaluate(expression, awaitPromise, options = {}) {
			const { result } = await this.session.send("script.evaluate", {
				expression,
				awaitPromise,
				target: this.target,
				...options
			});
			return result;
		}
		async resolveExecutionContextId() {
			if (!this.executionContextId) {
				const { result } = await this.session.connection.send("goog:cdp.resolveRealm", { realm: this.id });
				this.executionContextId = result.executionContextId;
			}
			return this.executionContextId;
		}
		[(_dispose_decorators = [inertIfDisposed], _disown_decorators = [throwIfDisposed((realm) => {
			return realm.#reason;
		})], _callFunction_decorators = [throwIfDisposed((realm) => {
			return realm.#reason;
		})], _evaluate_decorators = [throwIfDisposed((realm) => {
			return realm.#reason;
		})], _resolveExecutionContextId_decorators = [throwIfDisposed((realm) => {
			return realm.#reason;
		})], disposeSymbol)]() {
			this.#reason ??= "Realm already destroyed, probably because all associated browsing contexts closed.";
			this.emit("destroyed", { reason: this.#reason });
			this.disposables.dispose();
			super[disposeSymbol]();
		}
	};
})();
/**
* @internal
*/
var WindowRealm = class WindowRealm extends Realm {
	static from(context, sandbox) {
		const realm = new WindowRealm(context, sandbox);
		realm.#initialize();
		return realm;
	}
	browsingContext;
	sandbox;
	#workers = /* @__PURE__ */ new Map();
	constructor(context, sandbox) {
		super("", "");
		this.browsingContext = context;
		this.sandbox = sandbox;
	}
	#initialize() {
		this.disposables.use(new EventEmitter(this.browsingContext)).on("closed", ({ reason }) => {
			this.dispose(reason);
		});
		const sessionEmitter = this.disposables.use(new EventEmitter(this.session));
		sessionEmitter.on("script.realmCreated", (info) => {
			if (info.type !== "window" || info.context !== this.browsingContext.id || info.sandbox !== this.sandbox) return;
			this.id = info.realm;
			this.origin = info.origin;
			this.executionContextId = void 0;
			this.emit("updated", this);
		});
		sessionEmitter.on("script.realmCreated", (info) => {
			if (info.type !== "dedicated-worker") return;
			if (!info.owners.includes(this.id)) return;
			const realm = DedicatedWorkerRealm.from(this, info.realm, info.origin);
			this.#workers.set(realm.id, realm);
			const realmEmitter = this.disposables.use(new EventEmitter(realm));
			realmEmitter.once("destroyed", () => {
				realmEmitter.removeAllListeners();
				this.#workers.delete(realm.id);
			});
			this.emit("worker", realm);
		});
	}
	get session() {
		return this.browsingContext.userContext.browser.session;
	}
	get target() {
		return {
			context: this.browsingContext.id,
			sandbox: this.sandbox
		};
	}
};
/**
* @internal
*/
var DedicatedWorkerRealm = class extends Realm {
	static from(owner, id, origin) {
		const realm = new _a$1(owner, id, origin);
		realm.#initialize();
		return realm;
	}
	#workers = /* @__PURE__ */ new Map();
	owners;
	constructor(owner, id, origin) {
		super(id, origin);
		this.owners = new Set([owner]);
	}
	#initialize() {
		const sessionEmitter = this.disposables.use(new EventEmitter(this.session));
		sessionEmitter.on("script.realmDestroyed", (info) => {
			if (info.realm !== this.id) return;
			this.dispose("Realm already destroyed.");
		});
		sessionEmitter.on("script.realmCreated", (info) => {
			if (info.type !== "dedicated-worker") return;
			if (!info.owners.includes(this.id)) return;
			const realm = _a$1.from(this, info.realm, info.origin);
			this.#workers.set(realm.id, realm);
			this.disposables.use(new EventEmitter(realm)).once("destroyed", () => {
				this.#workers.delete(realm.id);
			});
			this.emit("worker", realm);
		});
	}
	get session() {
		return this.owners.values().next().value.session;
	}
};
_a$1 = DedicatedWorkerRealm;
/**
* @internal
*/
var SharedWorkerRealm = class SharedWorkerRealm extends Realm {
	static from(browser, id, origin) {
		const realm = new SharedWorkerRealm(browser, id, origin);
		realm.#initialize();
		return realm;
	}
	#workers = /* @__PURE__ */ new Map();
	browser;
	constructor(browser, id, origin) {
		super(id, origin);
		this.browser = browser;
	}
	#initialize() {
		const sessionEmitter = this.disposables.use(new EventEmitter(this.session));
		sessionEmitter.on("script.realmDestroyed", (info) => {
			if (info.realm !== this.id) return;
			this.dispose("Realm already destroyed.");
		});
		sessionEmitter.on("script.realmCreated", (info) => {
			if (info.type !== "dedicated-worker") return;
			if (!info.owners.includes(this.id)) return;
			const realm = DedicatedWorkerRealm.from(this, info.realm, info.origin);
			this.#workers.set(realm.id, realm);
			this.disposables.use(new EventEmitter(realm)).once("destroyed", () => {
				this.#workers.delete(realm.id);
			});
			this.emit("worker", realm);
		});
	}
	get session() {
		return this.browser.session;
	}
};
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$11 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$11 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/**
* @internal
*/
var Request = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _dispose_decorators;
	return class Request extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			__esDecorate$11(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static from(browsingContext, event) {
			const request = new Request(browsingContext, event);
			request.#initialize();
			return request;
		}
		#responseContentPromise = (__runInitializers$11(this, _instanceExtraInitializers), null);
		#requestBodyPromise = null;
		#error;
		#redirect;
		#response;
		#browsingContext;
		#disposables = new DisposableStack();
		#event;
		constructor(browsingContext, event) {
			super();
			this.#browsingContext = browsingContext;
			this.#event = event;
		}
		#initialize() {
			this.#disposables.use(new EventEmitter(this.#browsingContext)).once("closed", ({ reason }) => {
				this.#error = reason;
				this.emit("error", this.#error);
				this.dispose();
			});
			const sessionEmitter = this.#disposables.use(new EventEmitter(this.#session));
			sessionEmitter.on("network.beforeRequestSent", (event) => {
				if (event.context !== this.#browsingContext.id || event.request.request !== this.id) return;
				const previousRequestHasAuth = this.#event.request.headers.find((header) => {
					return header.name.toLowerCase() === "authorization";
				});
				const isAfterAuth = event.request.headers.find((header) => {
					return header.name.toLowerCase() === "authorization";
				}) && !previousRequestHasAuth;
				if (event.redirectCount !== this.#event.redirectCount + 1 && !isAfterAuth) return;
				this.#redirect = Request.from(this.#browsingContext, event);
				this.emit("redirect", this.#redirect);
				this.dispose();
			});
			sessionEmitter.on("network.authRequired", (event) => {
				if (event.context !== this.#browsingContext.id || event.request.request !== this.id || !event.isBlocked) return;
				this.emit("authenticate", void 0);
			});
			sessionEmitter.on("network.fetchError", (event) => {
				if (event.context !== this.#browsingContext.id || event.request.request !== this.id || this.#event.redirectCount !== event.redirectCount) return;
				this.#error = event.errorText;
				this.emit("error", this.#error);
				this.dispose();
			});
			sessionEmitter.on("network.responseStarted", (event) => {
				if (event.context !== this.#browsingContext.id || event.request.request !== this.id || this.#event.redirectCount !== event.redirectCount) return;
				this.#response = event.response;
				this.#event.request.timings = event.request.timings;
				this.emit("response", this.#response);
			});
			sessionEmitter.on("network.responseCompleted", (event) => {
				if (event.context !== this.#browsingContext.id || event.request.request !== this.id || this.#event.redirectCount !== event.redirectCount) return;
				this.#response = event.response;
				this.#event.request.timings = event.request.timings;
				this.emit("success", this.#response);
				if (this.#response.status >= 300 && this.#response.status < 400) return;
				this.dispose();
			});
		}
		get #session() {
			return this.#browsingContext.userContext.browser.session;
		}
		get disposed() {
			return this.#disposables.disposed;
		}
		get error() {
			return this.#error;
		}
		get headers() {
			return this.#event.request.headers;
		}
		get id() {
			return this.#event.request.request;
		}
		get initiator() {
			return {
				...this.#event.initiator,
				url: this.#event.request["goog:resourceInitiator"]?.url,
				stack: this.#event.request["goog:resourceInitiator"]?.stack
			};
		}
		get method() {
			return this.#event.request.method;
		}
		get navigation() {
			return this.#event.navigation ?? void 0;
		}
		get redirect() {
			return this.#redirect;
		}
		get lastRedirect() {
			let redirect = this.#redirect;
			while (redirect) {
				if (redirect && !redirect.#redirect) return redirect;
				redirect = redirect.#redirect;
			}
			return redirect;
		}
		get response() {
			return this.#response;
		}
		get url() {
			return this.#event.request.url;
		}
		get isBlocked() {
			return this.#event.isBlocked;
		}
		get resourceType() {
			return this.#event.request["goog:resourceType"] ?? void 0;
		}
		get postData() {
			return this.#event.request["goog:postData"] ?? void 0;
		}
		get hasPostData() {
			return (this.#event.request.bodySize ?? 0) > 0;
		}
		async continueRequest({ url, method, headers, cookies, body }) {
			await this.#session.send("network.continueRequest", {
				request: this.id,
				url,
				method,
				headers,
				body,
				cookies
			});
		}
		async failRequest() {
			await this.#session.send("network.failRequest", { request: this.id });
		}
		async provideResponse({ statusCode, reasonPhrase, headers, body }) {
			await this.#session.send("network.provideResponse", {
				request: this.id,
				statusCode,
				reasonPhrase,
				headers,
				body
			});
		}
		async fetchPostData() {
			if (!this.hasPostData) return;
			if (!this.#requestBodyPromise) this.#requestBodyPromise = (async () => {
				const data = await this.#session.send("network.getData", {
					dataType: "request",
					request: this.id
				});
				if (data.result.bytes.type === "string") return data.result.bytes.value;
				throw new UnsupportedOperation(`Collected request body data of type ${data.result.bytes.type} is not supported`);
			})();
			return await this.#requestBodyPromise;
		}
		async getResponseContent() {
			if (!this.#responseContentPromise) this.#responseContentPromise = (async () => {
				try {
					const data = await this.#session.send("network.getData", {
						dataType: "response",
						request: this.id
					});
					return stringToTypedArray(data.result.bytes.value, data.result.bytes.type === "base64");
				} catch (error) {
					if (error instanceof ProtocolError && error.originalMessage.includes("No resource with given identifier found")) throw new ProtocolError("Could not load response body for this request. This might happen if the request is a preflight request.");
					throw error;
				}
			})();
			return await this.#responseContentPromise;
		}
		async continueWithAuth(parameters) {
			if (parameters.action === "provideCredentials") await this.#session.send("network.continueWithAuth", {
				request: this.id,
				action: parameters.action,
				credentials: parameters.credentials
			});
			else await this.#session.send("network.continueWithAuth", {
				request: this.id,
				action: parameters.action
			});
		}
		dispose() {
			this[disposeSymbol]();
		}
		[(_dispose_decorators = [inertIfDisposed], disposeSymbol)]() {
			this.#disposables.dispose();
			super[disposeSymbol]();
		}
		timing() {
			return this.#event.request.timings;
		}
	};
})();
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$10 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$10 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/**
* @internal
*/
var UserPrompt = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _dispose_decorators;
	let _handle_decorators;
	return class UserPrompt extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			__esDecorate$10(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$10(this, null, _handle_decorators, {
				kind: "method",
				name: "handle",
				static: false,
				private: false,
				access: {
					has: (obj) => "handle" in obj,
					get: (obj) => obj.handle
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static from(browsingContext, info) {
			const userPrompt = new UserPrompt(browsingContext, info);
			userPrompt.#initialize();
			return userPrompt;
		}
		#reason = __runInitializers$10(this, _instanceExtraInitializers);
		#result;
		#disposables = new DisposableStack();
		browsingContext;
		info;
		constructor(context, info) {
			super();
			this.browsingContext = context;
			this.info = info;
		}
		#initialize() {
			this.#disposables.use(new EventEmitter(this.browsingContext)).once("closed", ({ reason }) => {
				this.dispose(`User prompt already closed: ${reason}`);
			});
			this.#disposables.use(new EventEmitter(this.#session)).on("browsingContext.userPromptClosed", (parameters) => {
				if (parameters.context !== this.browsingContext.id) return;
				this.#result = parameters;
				this.emit("handled", parameters);
				this.dispose("User prompt already handled.");
			});
		}
		get #session() {
			return this.browsingContext.userContext.browser.session;
		}
		get closed() {
			return this.#reason !== void 0;
		}
		get disposed() {
			return this.closed;
		}
		get handled() {
			if (this.info.handler === "accept" || this.info.handler === "dismiss") return true;
			return this.#result !== void 0;
		}
		get result() {
			return this.#result;
		}
		dispose(reason) {
			this.#reason = reason;
			this[disposeSymbol]();
		}
		async handle(options = {}) {
			await this.#session.send("browsingContext.handleUserPrompt", {
				...options,
				context: this.info.context
			});
			return this.#result;
		}
		[(_dispose_decorators = [inertIfDisposed], _handle_decorators = [throwIfDisposed((prompt) => {
			return prompt.#reason;
		})], disposeSymbol)]() {
			this.#reason ??= "User prompt already closed, probably because the associated browsing context was destroyed.";
			this.emit("closed", { reason: this.#reason });
			this.#disposables.dispose();
			super[disposeSymbol]();
		}
	};
})();
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$9 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$9 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/**
* @internal
*/
var BrowsingContext = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _dispose_decorators;
	let _activate_decorators;
	let _captureScreenshot_decorators;
	let _close_decorators;
	let _traverseHistory_decorators;
	let _navigate_decorators;
	let _reload_decorators;
	let _setCacheBehavior_decorators;
	let _print_decorators;
	let _handleUserPrompt_decorators;
	let _setViewport_decorators;
	let _setTouchOverride_decorators;
	let _performActions_decorators;
	let _releaseActions_decorators;
	let _createWindowRealm_decorators;
	let _addPreloadScript_decorators;
	let _addIntercept_decorators;
	let _removePreloadScript_decorators;
	let _setGeolocationOverride_decorators;
	let _setTimezoneOverride_decorators;
	let _setScreenOrientationOverride_decorators;
	let _getCookies_decorators;
	let _setCookie_decorators;
	let _setFiles_decorators;
	let _subscribe_decorators;
	let _addInterception_decorators;
	let _deleteCookie_decorators;
	let _locateNodes_decorators;
	return class BrowsingContext extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_deleteCookie_decorators = [throwIfDisposed((context) => {
				return context.#reason;
			})];
			_locateNodes_decorators = [throwIfDisposed((context) => {
				return context.#reason;
			})];
			__esDecorate$9(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _activate_decorators, {
				kind: "method",
				name: "activate",
				static: false,
				private: false,
				access: {
					has: (obj) => "activate" in obj,
					get: (obj) => obj.activate
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _captureScreenshot_decorators, {
				kind: "method",
				name: "captureScreenshot",
				static: false,
				private: false,
				access: {
					has: (obj) => "captureScreenshot" in obj,
					get: (obj) => obj.captureScreenshot
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _close_decorators, {
				kind: "method",
				name: "close",
				static: false,
				private: false,
				access: {
					has: (obj) => "close" in obj,
					get: (obj) => obj.close
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _traverseHistory_decorators, {
				kind: "method",
				name: "traverseHistory",
				static: false,
				private: false,
				access: {
					has: (obj) => "traverseHistory" in obj,
					get: (obj) => obj.traverseHistory
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _navigate_decorators, {
				kind: "method",
				name: "navigate",
				static: false,
				private: false,
				access: {
					has: (obj) => "navigate" in obj,
					get: (obj) => obj.navigate
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _reload_decorators, {
				kind: "method",
				name: "reload",
				static: false,
				private: false,
				access: {
					has: (obj) => "reload" in obj,
					get: (obj) => obj.reload
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setCacheBehavior_decorators, {
				kind: "method",
				name: "setCacheBehavior",
				static: false,
				private: false,
				access: {
					has: (obj) => "setCacheBehavior" in obj,
					get: (obj) => obj.setCacheBehavior
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _print_decorators, {
				kind: "method",
				name: "print",
				static: false,
				private: false,
				access: {
					has: (obj) => "print" in obj,
					get: (obj) => obj.print
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _handleUserPrompt_decorators, {
				kind: "method",
				name: "handleUserPrompt",
				static: false,
				private: false,
				access: {
					has: (obj) => "handleUserPrompt" in obj,
					get: (obj) => obj.handleUserPrompt
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setViewport_decorators, {
				kind: "method",
				name: "setViewport",
				static: false,
				private: false,
				access: {
					has: (obj) => "setViewport" in obj,
					get: (obj) => obj.setViewport
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setTouchOverride_decorators, {
				kind: "method",
				name: "setTouchOverride",
				static: false,
				private: false,
				access: {
					has: (obj) => "setTouchOverride" in obj,
					get: (obj) => obj.setTouchOverride
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _performActions_decorators, {
				kind: "method",
				name: "performActions",
				static: false,
				private: false,
				access: {
					has: (obj) => "performActions" in obj,
					get: (obj) => obj.performActions
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _releaseActions_decorators, {
				kind: "method",
				name: "releaseActions",
				static: false,
				private: false,
				access: {
					has: (obj) => "releaseActions" in obj,
					get: (obj) => obj.releaseActions
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _createWindowRealm_decorators, {
				kind: "method",
				name: "createWindowRealm",
				static: false,
				private: false,
				access: {
					has: (obj) => "createWindowRealm" in obj,
					get: (obj) => obj.createWindowRealm
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _addPreloadScript_decorators, {
				kind: "method",
				name: "addPreloadScript",
				static: false,
				private: false,
				access: {
					has: (obj) => "addPreloadScript" in obj,
					get: (obj) => obj.addPreloadScript
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _addIntercept_decorators, {
				kind: "method",
				name: "addIntercept",
				static: false,
				private: false,
				access: {
					has: (obj) => "addIntercept" in obj,
					get: (obj) => obj.addIntercept
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _removePreloadScript_decorators, {
				kind: "method",
				name: "removePreloadScript",
				static: false,
				private: false,
				access: {
					has: (obj) => "removePreloadScript" in obj,
					get: (obj) => obj.removePreloadScript
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setGeolocationOverride_decorators, {
				kind: "method",
				name: "setGeolocationOverride",
				static: false,
				private: false,
				access: {
					has: (obj) => "setGeolocationOverride" in obj,
					get: (obj) => obj.setGeolocationOverride
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setTimezoneOverride_decorators, {
				kind: "method",
				name: "setTimezoneOverride",
				static: false,
				private: false,
				access: {
					has: (obj) => "setTimezoneOverride" in obj,
					get: (obj) => obj.setTimezoneOverride
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setScreenOrientationOverride_decorators, {
				kind: "method",
				name: "setScreenOrientationOverride",
				static: false,
				private: false,
				access: {
					has: (obj) => "setScreenOrientationOverride" in obj,
					get: (obj) => obj.setScreenOrientationOverride
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _getCookies_decorators, {
				kind: "method",
				name: "getCookies",
				static: false,
				private: false,
				access: {
					has: (obj) => "getCookies" in obj,
					get: (obj) => obj.getCookies
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setCookie_decorators, {
				kind: "method",
				name: "setCookie",
				static: false,
				private: false,
				access: {
					has: (obj) => "setCookie" in obj,
					get: (obj) => obj.setCookie
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _setFiles_decorators, {
				kind: "method",
				name: "setFiles",
				static: false,
				private: false,
				access: {
					has: (obj) => "setFiles" in obj,
					get: (obj) => obj.setFiles
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _subscribe_decorators, {
				kind: "method",
				name: "subscribe",
				static: false,
				private: false,
				access: {
					has: (obj) => "subscribe" in obj,
					get: (obj) => obj.subscribe
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _addInterception_decorators, {
				kind: "method",
				name: "addInterception",
				static: false,
				private: false,
				access: {
					has: (obj) => "addInterception" in obj,
					get: (obj) => obj.addInterception
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _deleteCookie_decorators, {
				kind: "method",
				name: "deleteCookie",
				static: false,
				private: false,
				access: {
					has: (obj) => "deleteCookie" in obj,
					get: (obj) => obj.deleteCookie
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$9(this, null, _locateNodes_decorators, {
				kind: "method",
				name: "locateNodes",
				static: false,
				private: false,
				access: {
					has: (obj) => "locateNodes" in obj,
					get: (obj) => obj.locateNodes
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static from(userContext, parent, id, url, originalOpener, clientWindow) {
			const browsingContext = new BrowsingContext(userContext, parent, id, url, originalOpener, clientWindow);
			browsingContext.#initialize();
			return browsingContext;
		}
		#navigation = __runInitializers$9(this, _instanceExtraInitializers);
		#reason;
		#url;
		#clientHintsAreSet = false;
		#children = /* @__PURE__ */ new Map();
		#disposables = new DisposableStack();
		#realms = /* @__PURE__ */ new Map();
		#requests = /* @__PURE__ */ new Map();
		defaultRealm;
		id;
		parent;
		userContext;
		originalOpener;
		windowId;
		#emulationState = { javaScriptEnabled: true };
		#bluetoothEmulation;
		#deviceRequestPromptManager;
		constructor(userContext, parent, id, url, originalOpener, clientWindow) {
			super();
			this.#url = url;
			this.id = id;
			this.parent = parent;
			this.userContext = userContext;
			this.originalOpener = originalOpener;
			this.windowId = clientWindow;
			this.defaultRealm = this.#createWindowRealm();
			this.#bluetoothEmulation = new BidiBluetoothEmulation(this.id, this.#session);
			this.#deviceRequestPromptManager = new BidiDeviceRequestPromptManager(this.id, this.#session);
		}
		#initialize() {
			this.#disposables.use(new EventEmitter(this.userContext)).once("closed", ({ reason }) => {
				this.dispose(`Browsing context already closed: ${reason}`);
			});
			const sessionEmitter = this.#disposables.use(new EventEmitter(this.#session));
			sessionEmitter.on("input.fileDialogOpened", (info) => {
				if (this.id !== info.context) return;
				this.emit("filedialogopened", info);
			});
			sessionEmitter.on("browsingContext.contextCreated", (info) => {
				if (info.parent !== this.id) return;
				const browsingContext = BrowsingContext.from(this.userContext, this, info.context, info.url, info.originalOpener, info.clientWindow);
				this.#children.set(info.context, browsingContext);
				const browsingContextEmitter = this.#disposables.use(new EventEmitter(browsingContext));
				browsingContextEmitter.once("closed", () => {
					browsingContextEmitter.removeAllListeners();
					this.#children.delete(browsingContext.id);
				});
				this.emit("browsingcontext", { browsingContext });
			});
			sessionEmitter.on("browsingContext.contextDestroyed", (info) => {
				if (info.context !== this.id) return;
				this.dispose("Browsing context already closed.");
			});
			sessionEmitter.on("browsingContext.historyUpdated", (info) => {
				if (info.context !== this.id) return;
				this.#url = info.url;
				this.emit("historyUpdated", void 0);
			});
			sessionEmitter.on("browsingContext.domContentLoaded", (info) => {
				if (info.context !== this.id) return;
				this.#url = info.url;
				this.emit("DOMContentLoaded", void 0);
			});
			sessionEmitter.on("browsingContext.load", (info) => {
				if (info.context !== this.id) return;
				this.#url = info.url;
				this.emit("load", void 0);
			});
			sessionEmitter.on("browsingContext.navigationStarted", (info) => {
				if (info.context !== this.id) return;
				for (const [id, request] of this.#requests) if (request.disposed) this.#requests.delete(id);
				if (this.#navigation !== void 0 && !this.#navigation.disposed) return;
				this.#navigation = Navigation.from(this);
				const navigationEmitter = this.#disposables.use(new EventEmitter(this.#navigation));
				for (const eventName of [
					"fragment",
					"failed",
					"aborted"
				]) navigationEmitter.once(eventName, ({ url }) => {
					navigationEmitter[disposeSymbol]();
					this.#url = url;
				});
				this.emit("navigation", { navigation: this.#navigation });
			});
			sessionEmitter.on("network.beforeRequestSent", (event) => {
				if (event.context !== this.id) return;
				if (this.#requests.has(event.request.request)) return;
				const request = Request.from(this, event);
				this.#requests.set(request.id, request);
				this.emit("request", { request });
			});
			sessionEmitter.on("log.entryAdded", (entry) => {
				if (entry.source.context !== this.id) return;
				this.emit("log", { entry });
			});
			sessionEmitter.on("browsingContext.userPromptOpened", (info) => {
				if (info.context !== this.id) return;
				const userPrompt = UserPrompt.from(this, info);
				this.emit("userprompt", { userPrompt });
			});
		}
		get #session() {
			return this.userContext.browser.session;
		}
		get children() {
			return this.#children.values();
		}
		get closed() {
			return this.#reason !== void 0;
		}
		get disposed() {
			return this.closed;
		}
		get realms() {
			const self = this;
			return (function* () {
				yield self.defaultRealm;
				yield* self.#realms.values();
			})();
		}
		get top() {
			let context = this;
			for (let { parent } = context; parent; {parent} = context) context = parent;
			return context;
		}
		get url() {
			return this.#url;
		}
		#createWindowRealm(sandbox) {
			const realm = WindowRealm.from(this, sandbox);
			realm.on("worker", (realm) => {
				this.emit("worker", { realm });
			});
			return realm;
		}
		dispose(reason) {
			this.#reason = reason;
			for (const context of this.#children.values()) context.dispose("Parent browsing context was disposed");
			this[disposeSymbol]();
		}
		async activate() {
			await this.#session.send("browsingContext.activate", { context: this.id });
		}
		async captureScreenshot(options = {}) {
			const { result: { data } } = await this.#session.send("browsingContext.captureScreenshot", {
				context: this.id,
				...options
			});
			return data;
		}
		async close(promptUnload) {
			await this.#session.send("browsingContext.close", {
				context: this.id,
				promptUnload
			});
		}
		async traverseHistory(delta) {
			await this.#session.send("browsingContext.traverseHistory", {
				context: this.id,
				delta
			});
		}
		async navigate(url, wait) {
			await this.#session.send("browsingContext.navigate", {
				context: this.id,
				url,
				wait
			});
		}
		async reload(options = {}) {
			await this.#session.send("browsingContext.reload", {
				context: this.id,
				...options
			});
		}
		async setCacheBehavior(cacheBehavior) {
			await this.#session.send("network.setCacheBehavior", {
				contexts: [this.id],
				cacheBehavior
			});
		}
		async print(options = {}) {
			const { result: { data } } = await this.#session.send("browsingContext.print", {
				context: this.id,
				...options
			});
			return data;
		}
		async handleUserPrompt(options = {}) {
			await this.#session.send("browsingContext.handleUserPrompt", {
				context: this.id,
				...options
			});
		}
		async setViewport(options = {}) {
			await this.#session.send("browsingContext.setViewport", {
				context: this.id,
				...options
			});
		}
		async setTouchOverride(maxTouchPoints) {
			await this.#session.send("emulation.setTouchOverride", {
				contexts: [this.id],
				maxTouchPoints
			});
		}
		async performActions(actions) {
			await this.#session.send("input.performActions", {
				context: this.id,
				actions
			});
		}
		async releaseActions() {
			await this.#session.send("input.releaseActions", { context: this.id });
		}
		createWindowRealm(sandbox) {
			return this.#createWindowRealm(sandbox);
		}
		async addPreloadScript(functionDeclaration, options = {}) {
			return await this.userContext.browser.addPreloadScript(functionDeclaration, {
				...options,
				contexts: [this]
			});
		}
		async addIntercept(options) {
			const { result: { intercept } } = await this.userContext.browser.session.send("network.addIntercept", {
				...options,
				contexts: [this.id]
			});
			return intercept;
		}
		async removePreloadScript(script) {
			await this.userContext.browser.removePreloadScript(script);
		}
		async setGeolocationOverride(options) {
			if (!("coordinates" in options)) throw new Error("Missing coordinates");
			await this.userContext.browser.session.send("emulation.setGeolocationOverride", {
				coordinates: options.coordinates,
				contexts: [this.id]
			});
		}
		async setTimezoneOverride(timezoneId) {
			if (timezoneId?.startsWith("GMT")) timezoneId = timezoneId?.replace("GMT", "");
			await this.userContext.browser.session.send("emulation.setTimezoneOverride", {
				timezone: timezoneId ?? null,
				contexts: [this.id]
			});
		}
		async setScreenOrientationOverride(screenOrientation) {
			await this.#session.send("emulation.setScreenOrientationOverride", {
				screenOrientation,
				contexts: [this.id]
			});
		}
		async getCookies(options = {}) {
			const { result: { cookies } } = await this.#session.send("storage.getCookies", {
				...options,
				partition: {
					type: "context",
					context: this.id
				}
			});
			return cookies;
		}
		async setCookie(cookie) {
			await this.#session.send("storage.setCookie", {
				cookie,
				partition: {
					type: "context",
					context: this.id
				}
			});
		}
		async setFiles(element, files) {
			await this.#session.send("input.setFiles", {
				context: this.id,
				element,
				files
			});
		}
		async subscribe(events) {
			await this.#session.subscribe(events, [this.id]);
		}
		async addInterception(events) {
			await this.#session.subscribe(events, [this.id]);
		}
		[(_dispose_decorators = [inertIfDisposed], _activate_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _captureScreenshot_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _close_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _traverseHistory_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _navigate_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _reload_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setCacheBehavior_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _print_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _handleUserPrompt_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setViewport_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setTouchOverride_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _performActions_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _releaseActions_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _createWindowRealm_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _addPreloadScript_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _addIntercept_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _removePreloadScript_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setGeolocationOverride_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setTimezoneOverride_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setScreenOrientationOverride_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _getCookies_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setCookie_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setFiles_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _subscribe_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _addInterception_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], disposeSymbol)]() {
			this.#reason ??= "Browsing context already closed, probably because the user context closed.";
			this.emit("closed", { reason: this.#reason });
			this.#disposables.dispose();
			super[disposeSymbol]();
		}
		async deleteCookie(...cookieFilters) {
			await Promise.all(cookieFilters.map(async (filter) => {
				await this.#session.send("storage.deleteCookies", {
					filter,
					partition: {
						type: "context",
						context: this.id
					}
				});
			}));
		}
		async locateNodes(locator, startNodes = []) {
			return (await this.#session.send("browsingContext.locateNodes", {
				context: this.id,
				locator,
				startNodes: startNodes.length ? startNodes : void 0
			})).result.nodes;
		}
		async setJavaScriptEnabled(enabled) {
			await this.userContext.browser.session.send("emulation.setScriptingEnabled", {
				enabled: enabled ? null : false,
				contexts: [this.id]
			});
			this.#emulationState.javaScriptEnabled = enabled;
		}
		isJavaScriptEnabled() {
			return this.#emulationState.javaScriptEnabled;
		}
		async setUserAgent(userAgent) {
			await this.#session.send("emulation.setUserAgentOverride", {
				userAgent,
				contexts: [this.id]
			});
		}
		async setClientHintsOverride(clientHints) {
			if (clientHints === null && !this.#clientHintsAreSet) return;
			this.#clientHintsAreSet = true;
			await this.#session.send("userAgentClientHints.setClientHintsOverride", {
				clientHints,
				contexts: [this.id]
			});
		}
		async setOfflineMode(enabled) {
			await this.#session.send("emulation.setNetworkConditions", {
				networkConditions: enabled ? { type: "offline" } : null,
				contexts: [this.id]
			});
		}
		get bluetooth() {
			return this.#bluetoothEmulation;
		}
		async waitForDevicePrompt(timeout, signal) {
			return await this.#deviceRequestPromptManager.waitForDevicePrompt(timeout, signal);
		}
		async setExtraHTTPHeaders(headers) {
			await this.#session.send("network.setExtraHeaders", {
				headers: Object.entries(headers).map(([key, value]) => {
					assert(isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
					return {
						name: key.toLowerCase(),
						value: {
							type: "string",
							value
						}
					};
				}),
				contexts: [this.id]
			});
		}
	};
})();
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$8 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$8 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/**
* @internal
*/
var UserContext = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _dispose_decorators;
	let _createBrowsingContext_decorators;
	let _remove_decorators;
	let _getCookies_decorators;
	let _setCookie_decorators;
	let _setPermissions_decorators;
	return class UserContext extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			__esDecorate$8(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$8(this, null, _createBrowsingContext_decorators, {
				kind: "method",
				name: "createBrowsingContext",
				static: false,
				private: false,
				access: {
					has: (obj) => "createBrowsingContext" in obj,
					get: (obj) => obj.createBrowsingContext
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$8(this, null, _remove_decorators, {
				kind: "method",
				name: "remove",
				static: false,
				private: false,
				access: {
					has: (obj) => "remove" in obj,
					get: (obj) => obj.remove
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$8(this, null, _getCookies_decorators, {
				kind: "method",
				name: "getCookies",
				static: false,
				private: false,
				access: {
					has: (obj) => "getCookies" in obj,
					get: (obj) => obj.getCookies
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$8(this, null, _setCookie_decorators, {
				kind: "method",
				name: "setCookie",
				static: false,
				private: false,
				access: {
					has: (obj) => "setCookie" in obj,
					get: (obj) => obj.setCookie
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$8(this, null, _setPermissions_decorators, {
				kind: "method",
				name: "setPermissions",
				static: false,
				private: false,
				access: {
					has: (obj) => "setPermissions" in obj,
					get: (obj) => obj.setPermissions
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static DEFAULT = "default";
		static create(browser, id) {
			const context = new UserContext(browser, id);
			context.#initialize();
			return context;
		}
		#reason = __runInitializers$8(this, _instanceExtraInitializers);
		#browsingContexts = /* @__PURE__ */ new Map();
		#disposables = new DisposableStack();
		#id;
		browser;
		constructor(browser, id) {
			super();
			this.#id = id;
			this.browser = browser;
		}
		#initialize() {
			const browserEmitter = this.#disposables.use(new EventEmitter(this.browser));
			browserEmitter.once("closed", ({ reason }) => {
				this.dispose(`User context was closed: ${reason}`);
			});
			browserEmitter.once("disconnected", ({ reason }) => {
				this.dispose(`User context was closed: ${reason}`);
			});
			this.#disposables.use(new EventEmitter(this.#session)).on("browsingContext.contextCreated", (info) => {
				if (info.parent) return;
				if (info.userContext !== this.#id) return;
				const browsingContext = BrowsingContext.from(this, void 0, info.context, info.url, info.originalOpener, info.clientWindow);
				this.#browsingContexts.set(browsingContext.id, browsingContext);
				const browsingContextEmitter = this.#disposables.use(new EventEmitter(browsingContext));
				browsingContextEmitter.on("closed", () => {
					browsingContextEmitter.removeAllListeners();
					this.#browsingContexts.delete(browsingContext.id);
				});
				this.emit("browsingcontext", { browsingContext });
			});
		}
		get #session() {
			return this.browser.session;
		}
		get browsingContexts() {
			return this.#browsingContexts.values();
		}
		get closed() {
			return this.#reason !== void 0;
		}
		get disposed() {
			return this.closed;
		}
		get id() {
			return this.#id;
		}
		dispose(reason) {
			this.#reason = reason;
			this[disposeSymbol]();
		}
		async createBrowsingContext(type, options = {}) {
			const { result: { context: contextId } } = await this.#session.send("browsingContext.create", {
				type,
				...options,
				referenceContext: options.referenceContext?.id,
				background: options.background,
				userContext: this.#id
			});
			const browsingContext = this.#browsingContexts.get(contextId);
			assert(browsingContext, "The WebDriver BiDi implementation is failing to create a browsing context correctly.");
			return browsingContext;
		}
		async remove() {
			try {
				await this.#session.send("browser.removeUserContext", { userContext: this.#id });
			} finally {
				this.dispose("User context already closed.");
			}
		}
		async getCookies(options = {}, sourceOrigin = void 0) {
			const { result: { cookies } } = await this.#session.send("storage.getCookies", {
				...options,
				partition: {
					type: "storageKey",
					userContext: this.#id,
					sourceOrigin
				}
			});
			return cookies;
		}
		async setCookie(cookie, sourceOrigin) {
			await this.#session.send("storage.setCookie", {
				cookie,
				partition: {
					type: "storageKey",
					sourceOrigin,
					userContext: this.id
				}
			});
		}
		async setPermissions(origin, descriptor, state) {
			await this.#session.send("permissions.setPermission", {
				origin,
				descriptor,
				state,
				userContext: this.#id
			});
		}
		[(_dispose_decorators = [inertIfDisposed], _createBrowsingContext_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _remove_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _getCookies_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setCookie_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], _setPermissions_decorators = [throwIfDisposed((context) => {
			return context.#reason;
		})], disposeSymbol)]() {
			this.#reason ??= "User context already closed, probably because the browser disconnected/closed.";
			this.emit("closed", { reason: this.#reason });
			this.#disposables.dispose();
			super[disposeSymbol]();
		}
	};
})();
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
var BidiDeserializer = class {
	static deserialize(result) {
		if (!result) {
			debugError("Service did not produce a result.");
			return;
		}
		switch (result.type) {
			case "array": return result.value?.map((value) => {
				return this.deserialize(value);
			});
			case "set": return result.value?.reduce((acc, value) => {
				return acc.add(this.deserialize(value));
			}, /* @__PURE__ */ new Set());
			case "object": return result.value?.reduce((acc, tuple) => {
				const { key, value } = this.#deserializeTuple(tuple);
				acc[key] = value;
				return acc;
			}, {});
			case "map": return result.value?.reduce((acc, tuple) => {
				const { key, value } = this.#deserializeTuple(tuple);
				return acc.set(key, value);
			}, /* @__PURE__ */ new Map());
			case "promise": return {};
			case "regexp": return new RegExp(result.value.pattern, result.value.flags);
			case "date": return new Date(result.value);
			case "undefined": return;
			case "null": return null;
			case "number": return this.#deserializeNumber(result.value);
			case "bigint": return BigInt(result.value);
			case "boolean": return Boolean(result.value);
			case "string": return result.value;
		}
		debugError(`Deserialization of type ${result.type} not supported.`);
	}
	static #deserializeNumber(value) {
		switch (value) {
			case "-0": return -0;
			case "NaN": return NaN;
			case "Infinity": return Infinity;
			case "-Infinity": return -Infinity;
			default: return value;
		}
	}
	static #deserializeTuple([serializedKey, serializedValue]) {
		return {
			key: typeof serializedKey === "string" ? serializedKey : this.deserialize(serializedKey),
			value: this.deserialize(serializedValue)
		};
	}
};
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
var BidiJSHandle = class BidiJSHandle extends JSHandle {
	static from(value, realm) {
		return new BidiJSHandle(value, realm);
	}
	#remoteValue;
	realm;
	#disposed = false;
	constructor(value, realm) {
		super();
		this.#remoteValue = value;
		this.realm = realm;
	}
	get disposed() {
		return this.#disposed;
	}
	async jsonValue() {
		return await this.evaluate((value) => {
			return value;
		});
	}
	asElement() {
		return null;
	}
	async dispose() {
		if (this.#disposed) return;
		this.#disposed = true;
		await this.realm.destroyHandles([this]);
	}
	get isPrimitiveValue() {
		switch (this.#remoteValue.type) {
			case "string":
			case "number":
			case "bigint":
			case "boolean":
			case "undefined":
			case "null": return true;
			default: return false;
		}
	}
	toString() {
		if (this.isPrimitiveValue) return "JSHandle:" + BidiDeserializer.deserialize(this.#remoteValue);
		return "JSHandle@" + this.#remoteValue.type;
	}
	get id() {
		return "handle" in this.#remoteValue ? this.#remoteValue.handle : void 0;
	}
	remoteValue() {
		return this.#remoteValue;
	}
	remoteObject() {
		throw new UnsupportedOperation("Not available in WebDriver BiDi");
	}
};
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$7 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$7 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var __addDisposableResource$5 = function(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
};
var __disposeResources$5 = (function(SuppressedError) {
	return function(env) {
		function fail(e) {
			env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
			env.hasError = true;
		}
		var r, s = 0;
		function next() {
			while (r = env.stack.pop()) try {
				if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
				if (r.dispose) {
					var result = r.dispose.call(r.value);
					if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
						fail(e);
						return next();
					});
				} else s |= 1;
			} catch (e) {
				fail(e);
			}
			if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
			if (env.hasError) throw env.error;
		}
		return next();
	};
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
	var e = new Error(message);
	return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
* @internal
*/
var BidiElementHandle = (() => {
	let _classSuper = ElementHandle;
	let _instanceExtraInitializers = [];
	let _autofill_decorators;
	let _contentFrame_decorators;
	return class BidiElementHandle extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_autofill_decorators = [throwIfDisposed()];
			_contentFrame_decorators = [throwIfDisposed(), bindIsolatedHandle];
			__esDecorate$7(this, null, _autofill_decorators, {
				kind: "method",
				name: "autofill",
				static: false,
				private: false,
				access: {
					has: (obj) => "autofill" in obj,
					get: (obj) => obj.autofill
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$7(this, null, _contentFrame_decorators, {
				kind: "method",
				name: "contentFrame",
				static: false,
				private: false,
				access: {
					has: (obj) => "contentFrame" in obj,
					get: (obj) => obj.contentFrame
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		#backendNodeId = __runInitializers$7(this, _instanceExtraInitializers);
		static from(value, realm) {
			return new BidiElementHandle(value, realm);
		}
		constructor(value, realm) {
			super(BidiJSHandle.from(value, realm));
		}
		get realm() {
			return this.handle.realm;
		}
		get frame() {
			return this.realm.environment;
		}
		remoteValue() {
			return this.handle.remoteValue();
		}
		async autofill(data) {
			const client = this.frame.client;
			const fieldId = (await client.send("DOM.describeNode", { objectId: this.handle.id })).node.backendNodeId;
			const frameId = this.frame._id;
			await client.send("Autofill.trigger", {
				fieldId,
				frameId,
				card: data.creditCard
			});
		}
		async contentFrame() {
			const env_1 = {
				stack: [],
				error: void 0,
				hasError: false
			};
			try {
				const value = __addDisposableResource$5(env_1, await this.evaluateHandle((element) => {
					if (element instanceof HTMLIFrameElement || element instanceof HTMLFrameElement) return element.contentWindow;
				}), false).remoteValue();
				if (value.type === "window") return this.frame.page().frames().find((frame) => {
					return frame._id === value.value.context;
				}) ?? null;
				return null;
			} catch (e_1) {
				env_1.error = e_1;
				env_1.hasError = true;
			} finally {
				__disposeResources$5(env_1);
			}
		}
		async uploadFile(...files) {
			const path = environment.value.path;
			if (path) files = files.map((file) => {
				if (path.win32.isAbsolute(file) || path.posix.isAbsolute(file)) return file;
				else return path.resolve(file);
			});
			await this.frame.setFiles(this, files);
		}
		async *queryAXTree(name, role) {
			const results = await this.frame.locateNodes(this, {
				type: "accessibility",
				value: {
					role,
					name
				}
			});
			return yield* AsyncIterableUtil.map(results, (node) => {
				return Promise.resolve(BidiElementHandle.from(node, this.realm));
			});
		}
		async backendNodeId() {
			if (!this.frame.page().browser().cdpSupported) throw new UnsupportedOperation();
			if (this.#backendNodeId) return this.#backendNodeId;
			const { node } = await this.frame.client.send("DOM.describeNode", { objectId: this.handle.id });
			this.#backendNodeId = node.backendNodeId;
			return this.#backendNodeId;
		}
	};
})();
/**
* @license
* Copyright 2017 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var BidiDialog = class BidiDialog extends Dialog {
	static from(prompt) {
		return new BidiDialog(prompt);
	}
	#prompt;
	constructor(prompt) {
		super(prompt.info.type, prompt.info.message, prompt.info.defaultValue);
		this.#prompt = prompt;
		this.handled = prompt.handled;
	}
	async handle(options) {
		await this.#prompt.handle({
			accept: options.accept,
			userText: options.text
		});
	}
};
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __addDisposableResource$4 = function(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
};
var __disposeResources$4 = (function(SuppressedError) {
	return function(env) {
		function fail(e) {
			env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
			env.hasError = true;
		}
		var r, s = 0;
		function next() {
			while (r = env.stack.pop()) try {
				if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
				if (r.dispose) {
					var result = r.dispose.call(r.value);
					if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
						fail(e);
						return next();
					});
				} else s |= 1;
			} catch (e) {
				fail(e);
			}
			if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
			if (env.hasError) throw env.error;
		}
		return next();
	};
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
	var e = new Error(message);
	return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
* @internal
*/
var ExposableFunction = class ExposableFunction {
	static async from(frame, name, apply, isolate = false) {
		const func = new ExposableFunction(frame, name, apply, isolate);
		await func.#initialize();
		return func;
	}
	#frame;
	name;
	#apply;
	#isolate;
	#channel;
	#scripts = [];
	#disposables = new DisposableStack();
	constructor(frame, name, apply, isolate = false) {
		this.#frame = frame;
		this.name = name;
		this.#apply = apply;
		this.#isolate = isolate;
		this.#channel = `__puppeteer__${this.#frame._id}_page_exposeFunction_${this.name}`;
	}
	async #initialize() {
		const connection = this.#connection;
		const channel = {
			type: "channel",
			value: {
				channel: this.#channel,
				ownership: "root"
			}
		};
		this.#disposables.use(new EventEmitter(connection)).on("script.message", this.#handleMessage);
		const functionDeclaration = stringifyFunction(interpolateFunction((callback) => {
			Object.assign(globalThis, { [PLACEHOLDER("name")]: function(...args) {
				return new Promise((resolve, reject) => {
					callback([
						resolve,
						reject,
						args
					]);
				});
			} });
		}, { name: JSON.stringify(this.name) }));
		const frames = [this.#frame];
		for (const frame of frames) frames.push(...frame.childFrames());
		await Promise.all(frames.map(async (frame) => {
			const realm = this.#isolate ? frame.isolatedRealm() : frame.mainRealm();
			try {
				const [script] = await Promise.all([frame.browsingContext.addPreloadScript(functionDeclaration, {
					arguments: [channel],
					sandbox: realm.sandbox
				}), realm.realm.callFunction(functionDeclaration, false, { arguments: [channel] })]);
				this.#scripts.push([frame, script]);
			} catch (error) {
				debugError(error);
			}
		}));
	}
	get #connection() {
		return this.#frame.page().browser().connection;
	}
	#handleMessage = async (params) => {
		const env_1 = {
			stack: [],
			error: void 0,
			hasError: false
		};
		try {
			if (params.channel !== this.#channel) return;
			const realm = this.#getRealm(params.source);
			if (!realm) return;
			const dataHandle = __addDisposableResource$4(env_1, BidiJSHandle.from(params.data, realm), false);
			const stack = __addDisposableResource$4(env_1, new DisposableStack(), false);
			const args = [];
			let result;
			try {
				const env_2 = {
					stack: [],
					error: void 0,
					hasError: false
				};
				try {
					const argsHandle = __addDisposableResource$4(env_2, await dataHandle.evaluateHandle(([, , args]) => {
						return args;
					}), false);
					for (const [index, handle] of await argsHandle.getProperties()) {
						stack.use(handle);
						if (handle instanceof BidiElementHandle) {
							args[+index] = handle;
							stack.use(handle);
							continue;
						}
						args[+index] = handle.jsonValue();
					}
					result = await this.#apply(...await Promise.all(args));
				} catch (e_1) {
					env_2.error = e_1;
					env_2.hasError = true;
				} finally {
					__disposeResources$4(env_2);
				}
			} catch (error) {
				try {
					if (error instanceof Error) await dataHandle.evaluate(([, reject], name, message, stack) => {
						const error = new Error(message);
						error.name = name;
						if (stack) error.stack = stack;
						reject(error);
					}, error.name, error.message, error.stack);
					else await dataHandle.evaluate(([, reject], error) => {
						reject(error);
					}, error);
				} catch (error) {
					debugError(error);
				}
				return;
			}
			try {
				await dataHandle.evaluate(([resolve], result) => {
					resolve(result);
				}, result);
			} catch (error) {
				debugError(error);
			}
		} catch (e_2) {
			env_1.error = e_2;
			env_1.hasError = true;
		} finally {
			__disposeResources$4(env_1);
		}
	};
	#getRealm(source) {
		const frame = this.#findFrame(source.context);
		if (!frame) return;
		return frame.realm(source.realm);
	}
	#findFrame(id) {
		const frames = [this.#frame];
		for (const frame of frames) {
			if (frame._id === id) return frame;
			frames.push(...frame.childFrames());
		}
	}
	[Symbol.dispose]() {
		this[Symbol.asyncDispose]().catch(debugError);
	}
	async [Symbol.asyncDispose]() {
		this.#disposables.dispose();
		await Promise.all(this.#scripts.map(async ([frame, script]) => {
			const realm = this.#isolate ? frame.isolatedRealm() : frame.mainRealm();
			try {
				await Promise.all([
					realm.evaluate((name) => {
						delete globalThis[name];
					}, this.name),
					...frame.childFrames().map((childFrame) => {
						return childFrame.evaluate((name) => {
							delete globalThis[name];
						}, this.name);
					}),
					frame.browsingContext.removePreloadScript(script)
				]);
			} catch (error) {
				debugError(error);
			}
		}));
	}
};
var __runInitializers$6 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$6 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/**
* @internal
*/
var BidiHTTPResponse = (() => {
	let _classSuper = HTTPResponse;
	let _instanceExtraInitializers = [];
	let _remoteAddress_decorators;
	return class BidiHTTPResponse extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_remoteAddress_decorators = [invokeAtMostOnceForArguments];
			__esDecorate$6(this, null, _remoteAddress_decorators, {
				kind: "method",
				name: "remoteAddress",
				static: false,
				private: false,
				access: {
					has: (obj) => "remoteAddress" in obj,
					get: (obj) => obj.remoteAddress
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		/**
		* Returns a new BidiHTTPResponse or updates the existing one if it already exists.
		*/
		static from(data, request, cdpSupported) {
			const existingResponse = request.response();
			if (existingResponse) {
				existingResponse.#data = data;
				return existingResponse;
			}
			const response = new BidiHTTPResponse(data, request, cdpSupported);
			response.#initialize();
			return response;
		}
		#data = __runInitializers$6(this, _instanceExtraInitializers);
		#request;
		#securityDetails;
		#cdpSupported = false;
		constructor(data, request, cdpSupported) {
			super();
			this.#data = data;
			this.#request = request;
			this.#cdpSupported = cdpSupported;
			const securityDetails = data["goog:securityDetails"];
			if (cdpSupported && securityDetails) this.#securityDetails = new SecurityDetails(securityDetails);
		}
		#initialize() {
			if (this.#data.fromCache) {
				this.#request._fromMemoryCache = true;
				this.#request.frame()?.page().trustedEmitter.emit("requestservedfromcache", this.#request);
			}
			this.#request.frame()?.page().trustedEmitter.emit("response", this);
		}
		remoteAddress() {
			return {
				ip: "",
				port: -1
			};
		}
		url() {
			return this.#data.url;
		}
		status() {
			return this.#data.status;
		}
		statusText() {
			return this.#data.statusText;
		}
		headers() {
			const headers = {};
			for (const header of this.#data.headers) if (header.value.type === "string") headers[header.name.toLowerCase()] = header.value.value;
			return headers;
		}
		request() {
			return this.#request;
		}
		fromCache() {
			return this.#data.fromCache;
		}
		timing() {
			const bidiTiming = this.#request.timing();
			return {
				requestTime: bidiTiming.requestTime,
				proxyStart: -1,
				proxyEnd: -1,
				dnsStart: bidiTiming.dnsStart,
				dnsEnd: bidiTiming.dnsEnd,
				connectStart: bidiTiming.connectStart,
				connectEnd: bidiTiming.connectEnd,
				sslStart: bidiTiming.tlsStart,
				sslEnd: -1,
				workerStart: -1,
				workerReady: -1,
				workerFetchStart: -1,
				workerRespondWithSettled: -1,
				workerRouterEvaluationStart: -1,
				workerCacheLookupStart: -1,
				sendStart: bidiTiming.requestStart,
				sendEnd: -1,
				pushStart: -1,
				pushEnd: -1,
				receiveHeadersStart: bidiTiming.responseStart,
				receiveHeadersEnd: bidiTiming.responseEnd
			};
		}
		frame() {
			return this.#request.frame();
		}
		fromServiceWorker() {
			return false;
		}
		securityDetails() {
			if (!this.#cdpSupported) throw new UnsupportedOperation();
			return this.#securityDetails ?? null;
		}
		async content() {
			return await this.#request.getResponseContent();
		}
	};
})();
var _a;
const requests = /* @__PURE__ */ new WeakMap();
/**
* @internal
*/
var BidiHTTPRequest = class extends HTTPRequest {
	static from(bidiRequest, frame, isNetworkInterceptionEnabled, redirect) {
		const request = new _a(bidiRequest, frame, isNetworkInterceptionEnabled, redirect);
		request.#initialize();
		return request;
	}
	#redirectChain;
	#response = null;
	id;
	#frame;
	#request;
	constructor(request, frame, isNetworkInterceptionEnabled, redirect) {
		super();
		requests.set(request, this);
		this.interception.enabled = isNetworkInterceptionEnabled;
		this.#request = request;
		this.#frame = frame;
		this.#redirectChain = redirect ? redirect.#redirectChain : [];
		this.id = request.id;
	}
	get client() {
		return this.#frame.client;
	}
	#initialize() {
		this.#request.on("redirect", (request) => {
			const httpRequest = _a.from(request, this.#frame, this.interception.enabled, this);
			this.#redirectChain.push(this);
			request.once("success", () => {
				this.#frame.page().trustedEmitter.emit("requestfinished", httpRequest);
			});
			request.once("error", () => {
				this.#frame.page().trustedEmitter.emit("requestfailed", httpRequest);
			});
			httpRequest.finalizeInterceptions();
		});
		this.#request.once("response", (data) => {
			this.#response = BidiHTTPResponse.from(data, this, this.#frame.page().browser().cdpSupported);
		});
		this.#request.once("success", (data) => {
			this.#response = BidiHTTPResponse.from(data, this, this.#frame.page().browser().cdpSupported);
		});
		this.#request.on("authenticate", this.#handleAuthentication);
		this.#frame.page().trustedEmitter.emit("request", this);
	}
	canBeIntercepted() {
		return this.#request.isBlocked;
	}
	interceptResolutionState() {
		if (!this.#request.isBlocked) return { action: InterceptResolutionAction.Disabled };
		return super.interceptResolutionState();
	}
	url() {
		return this.#request.url;
	}
	resourceType() {
		if (!this.#frame.page().browser().cdpSupported) throw new UnsupportedOperation();
		return (this.#request.resourceType || "other").toLowerCase();
	}
	method() {
		return this.#request.method;
	}
	postData() {
		if (!this.#frame.page().browser().cdpSupported) throw new UnsupportedOperation();
		return this.#request.postData;
	}
	hasPostData() {
		return this.#request.hasPostData;
	}
	async fetchPostData() {
		return await this.#request.fetchPostData();
	}
	headers() {
		const headers = {};
		for (const header of this.#request.headers) headers[header.name.toLowerCase()] = header.value.value;
		return { ...headers };
	}
	response() {
		return this.#response;
	}
	failure() {
		if (this.#request.error === void 0) return null;
		return { errorText: this.#request.error };
	}
	isNavigationRequest() {
		return this.#request.navigation !== void 0;
	}
	initiator() {
		return {
			...this.#request.initiator,
			type: this.#request.initiator?.type ?? "other"
		};
	}
	redirectChain() {
		return this.#redirectChain.slice();
	}
	frame() {
		return this.#frame;
	}
	async _continue(overrides = {}) {
		const headers = getBidiHeaders(overrides.headers);
		this.interception.handled = true;
		return await this.#request.continueRequest({
			url: overrides.url,
			method: overrides.method,
			body: overrides.postData ? {
				type: "base64",
				value: stringToBase64(overrides.postData)
			} : void 0,
			headers: headers.length > 0 ? headers : void 0
		}).catch((error) => {
			this.interception.handled = false;
			return handleError(error);
		});
	}
	async _abort() {
		this.interception.handled = true;
		return await this.#request.failRequest().catch((error) => {
			this.interception.handled = false;
			throw error;
		});
	}
	async _respond(response, _priority) {
		this.interception.handled = true;
		let parsedBody;
		if (response.body) parsedBody = HTTPRequest.getResponse(response.body);
		const headers = getBidiHeaders(response.headers);
		const hasContentLength = headers.some((header) => {
			return header.name === "content-length";
		});
		if (response.contentType) headers.push({
			name: "content-type",
			value: {
				type: "string",
				value: response.contentType
			}
		});
		if (parsedBody?.contentLength && !hasContentLength) headers.push({
			name: "content-length",
			value: {
				type: "string",
				value: String(parsedBody.contentLength)
			}
		});
		const status = response.status || 200;
		return await this.#request.provideResponse({
			statusCode: status,
			headers: headers.length > 0 ? headers : void 0,
			reasonPhrase: STATUS_TEXTS[status],
			body: parsedBody?.base64 ? {
				type: "base64",
				value: parsedBody?.base64
			} : void 0
		}).catch((error) => {
			this.interception.handled = false;
			throw error;
		});
	}
	#authenticationHandled = false;
	#handleAuthentication = async () => {
		if (!this.#frame) return;
		const credentials = this.#frame.page()._credentials;
		if (credentials && !this.#authenticationHandled) {
			this.#authenticationHandled = true;
			this.#request.continueWithAuth({
				action: "provideCredentials",
				credentials: {
					type: "password",
					username: credentials.username,
					password: credentials.password
				}
			});
		} else this.#request.continueWithAuth({ action: "cancel" });
	};
	timing() {
		return this.#request.timing();
	}
	getResponseContent() {
		return this.#request.getResponseContent();
	}
};
_a = BidiHTTPRequest;
function getBidiHeaders(rawHeaders) {
	const headers = [];
	for (const [name, value] of Object.entries(rawHeaders ?? [])) if (!Object.is(value, void 0)) {
		const values = Array.isArray(value) ? value : [value];
		for (const value of values) headers.push({
			name: name.toLowerCase(),
			value: {
				type: "string",
				value: String(value)
			}
		});
	}
	return headers;
}
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
var UnserializableError = class extends Error {};
/**
* @internal
*/
var BidiSerializer = class {
	static serialize(arg) {
		switch (typeof arg) {
			case "symbol":
			case "function": throw new UnserializableError(`Unable to serializable ${typeof arg}`);
			case "object": return this.#serializeObject(arg);
			case "undefined": return { type: "undefined" };
			case "number": return this.#serializeNumber(arg);
			case "bigint": return {
				type: "bigint",
				value: arg.toString()
			};
			case "string": return {
				type: "string",
				value: arg
			};
			case "boolean": return {
				type: "boolean",
				value: arg
			};
		}
	}
	static #serializeNumber(arg) {
		let value;
		if (Object.is(arg, -0)) value = "-0";
		else if (Object.is(arg, Infinity)) value = "Infinity";
		else if (Object.is(arg, -Infinity)) value = "-Infinity";
		else if (Object.is(arg, NaN)) value = "NaN";
		else value = arg;
		return {
			type: "number",
			value
		};
	}
	static #serializeObject(arg) {
		if (arg === null) return { type: "null" };
		else if (Array.isArray(arg)) return {
			type: "array",
			value: arg.map((subArg) => {
				return this.serialize(subArg);
			})
		};
		else if (isPlainObject(arg)) {
			try {
				JSON.stringify(arg);
			} catch (error) {
				if (error instanceof TypeError && error.message.startsWith("Converting circular structure to JSON")) error.message += " Recursive objects are not allowed.";
				throw error;
			}
			const parsedObject = [];
			for (const key in arg) parsedObject.push([this.serialize(key), this.serialize(arg[key])]);
			return {
				type: "object",
				value: parsedObject
			};
		} else if (isRegExp(arg)) return {
			type: "regexp",
			value: {
				pattern: arg.source,
				flags: arg.flags
			}
		};
		else if (isDate(arg)) return {
			type: "date",
			value: arg.toISOString()
		};
		throw new UnserializableError("Custom object serialization not possible. Use plain objects instead.");
	}
};
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
function createEvaluationError(details) {
	if (details.exception.type === "object" && !("value" in details.exception)) return new Error(details.text);
	if (details.exception.type !== "error") return BidiDeserializer.deserialize(details.exception);
	const [name = "", ...parts] = details.text.split(": ");
	const message = parts.join(": ");
	const error = new Error(message);
	error.name = name;
	const stackLines = [];
	if (details.stackTrace && stackLines.length < Error.stackTraceLimit) for (const frame of details.stackTrace.callFrames.reverse()) {
		if (PuppeteerURL.isPuppeteerURL(frame.url) && frame.url !== PuppeteerURL.INTERNAL_URL) {
			const url = PuppeteerURL.parse(frame.url);
			stackLines.unshift(`    at ${frame.functionName || url.functionName} (${url.functionName} at ${url.siteString}, <anonymous>:${frame.lineNumber}:${frame.columnNumber})`);
		} else stackLines.push(`    at ${frame.functionName || "<anonymous>"} (${frame.url}:${frame.lineNumber}:${frame.columnNumber})`);
		if (stackLines.length >= Error.stackTraceLimit) break;
	}
	error.stack = [details.text, ...stackLines].join("\n");
	return error;
}
/**
* @internal
*/
function rewriteNavigationError(message, ms) {
	return (error) => {
		if (error instanceof ProtocolError) error.message += ` at ${message}`;
		else if (error instanceof TimeoutError) error.message = `Navigation timeout of ${ms} ms exceeded`;
		throw error;
	};
}
var __addDisposableResource$3 = function(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
};
var __disposeResources$3 = (function(SuppressedError) {
	return function(env) {
		function fail(e) {
			env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
			env.hasError = true;
		}
		var r, s = 0;
		function next() {
			while (r = env.stack.pop()) try {
				if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
				if (r.dispose) {
					var result = r.dispose.call(r.value);
					if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
						fail(e);
						return next();
					});
				} else s |= 1;
			} catch (e) {
				fail(e);
			}
			if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
			if (env.hasError) throw env.error;
		}
		return next();
	};
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
	var e = new Error(message);
	return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
* @internal
*/
var BidiRealm = class extends Realm$1 {
	realm;
	constructor(realm, timeoutSettings) {
		super(timeoutSettings);
		this.realm = realm;
	}
	initialize() {
		this.realm.on("destroyed", ({ reason }) => {
			this.taskManager.terminateAll(new Error(reason));
			this.dispose();
		});
		this.realm.on("updated", () => {
			this.internalPuppeteerUtil = void 0;
			this.taskManager.rerunAll();
		});
	}
	internalPuppeteerUtil;
	get puppeteerUtil() {
		const promise = Promise.resolve();
		scriptInjector.inject((script) => {
			if (this.internalPuppeteerUtil) this.internalPuppeteerUtil.then((handle) => {
				handle.dispose();
			});
			this.internalPuppeteerUtil = promise.then(() => {
				return this.evaluateHandle(script);
			});
		}, !this.internalPuppeteerUtil);
		return this.internalPuppeteerUtil;
	}
	async evaluateHandle(pageFunction, ...args) {
		return await this.#evaluate(false, pageFunction, ...args);
	}
	async evaluate(pageFunction, ...args) {
		return await this.#evaluate(true, pageFunction, ...args);
	}
	async #evaluate(returnByValue, pageFunction, ...args) {
		const sourceUrlComment = getSourceUrlComment(getSourcePuppeteerURLIfAvailable(pageFunction)?.toString() ?? PuppeteerURL.INTERNAL_URL);
		let responsePromise;
		const resultOwnership = returnByValue ? "none" : "root";
		const serializationOptions = returnByValue ? {} : {
			maxObjectDepth: 0,
			maxDomDepth: 0
		};
		if (isString(pageFunction)) {
			const expression = SOURCE_URL_REGEX.test(pageFunction) ? pageFunction : `${pageFunction}\n${sourceUrlComment}\n`;
			responsePromise = this.realm.evaluate(expression, true, {
				resultOwnership,
				userActivation: true,
				serializationOptions
			});
		} else {
			let functionDeclaration = stringifyFunction(pageFunction);
			functionDeclaration = SOURCE_URL_REGEX.test(functionDeclaration) ? functionDeclaration : `${functionDeclaration}\n${sourceUrlComment}\n`;
			responsePromise = this.realm.callFunction(functionDeclaration, true, {
				arguments: args.some((arg) => {
					return arg instanceof LazyArg;
				}) ? await Promise.all(args.map((arg) => {
					return this.serializeAsync(arg);
				})) : args.map((arg) => {
					return this.serialize(arg);
				}),
				resultOwnership,
				userActivation: true,
				serializationOptions
			});
		}
		const result = await responsePromise;
		if ("type" in result && result.type === "exception") throw createEvaluationError(result.exceptionDetails);
		if (returnByValue) return BidiDeserializer.deserialize(result.result);
		return this.createHandle(result.result);
	}
	createHandle(result) {
		if ((result.type === "node" || result.type === "window") && this instanceof BidiFrameRealm) return BidiElementHandle.from(result, this);
		return BidiJSHandle.from(result, this);
	}
	async serializeAsync(arg) {
		if (arg instanceof LazyArg) arg = await arg.get(this);
		return this.serialize(arg);
	}
	serialize(arg) {
		if (arg instanceof BidiJSHandle || arg instanceof BidiElementHandle) {
			if (arg.realm !== this) {
				if (!(arg.realm instanceof BidiFrameRealm) || !(this instanceof BidiFrameRealm)) throw new Error("Trying to evaluate JSHandle from different global types. Usually this means you're using a handle from a worker in a page or vice versa.");
				if (arg.realm.environment !== this.environment) throw new Error("Trying to evaluate JSHandle from different frames. Usually this means you're using a handle from a page on a different page.");
			}
			if (arg.disposed) throw new Error("JSHandle is disposed!");
			return arg.remoteValue();
		}
		return BidiSerializer.serialize(arg);
	}
	async destroyHandles(handles) {
		if (this.disposed) return;
		const handleIds = handles.map(({ id }) => {
			return id;
		}).filter((id) => {
			return id !== void 0;
		});
		if (handleIds.length === 0) return;
		await this.realm.disown(handleIds).catch((error) => {
			debugError(error);
		});
	}
	async adoptHandle(handle) {
		return await this.evaluateHandle((node) => {
			return node;
		}, handle);
	}
	async transferHandle(handle) {
		if (handle.realm === this) return handle;
		const transferredHandle = this.adoptHandle(handle);
		await handle.dispose();
		return await transferredHandle;
	}
};
/**
* @internal
*/
var BidiFrameRealm = class BidiFrameRealm extends BidiRealm {
	static from(realm, frame) {
		const frameRealm = new BidiFrameRealm(realm, frame);
		frameRealm.#initialize();
		return frameRealm;
	}
	#frame;
	constructor(realm, frame) {
		super(realm, frame.timeoutSettings);
		this.#frame = frame;
	}
	#initialize() {
		super.initialize();
		this.realm.on("updated", () => {
			this.environment.clearDocumentHandle();
			this.#bindingsInstalled = false;
		});
	}
	#bindingsInstalled = false;
	get puppeteerUtil() {
		let promise = Promise.resolve();
		if (!this.#bindingsInstalled) {
			promise = Promise.all([ExposableFunction.from(this.environment, "__ariaQuerySelector", ARIAQueryHandler.queryOne, !!this.sandbox), ExposableFunction.from(this.environment, "__ariaQuerySelectorAll", async (element, selector) => {
				const results = ARIAQueryHandler.queryAll(element, selector);
				return await element.realm.evaluateHandle((...elements) => {
					return elements;
				}, ...await AsyncIterableUtil.collect(results));
			}, !!this.sandbox)]);
			this.#bindingsInstalled = true;
		}
		return promise.then(() => {
			return super.puppeteerUtil;
		});
	}
	get sandbox() {
		return this.realm.sandbox;
	}
	get environment() {
		return this.#frame;
	}
	async adoptBackendNode(backendNodeId) {
		const env_1 = {
			stack: [],
			error: void 0,
			hasError: false
		};
		try {
			const { object } = await this.#frame.client.send("DOM.resolveNode", {
				backendNodeId,
				executionContextId: await this.realm.resolveExecutionContextId()
			});
			return await __addDisposableResource$3(env_1, BidiElementHandle.from({
				handle: object.objectId,
				type: "node"
			}, this), false).evaluateHandle((element) => {
				return element;
			});
		} catch (e_1) {
			env_1.error = e_1;
			env_1.hasError = true;
		} finally {
			__disposeResources$3(env_1);
		}
	}
};
/**
* @internal
*/
var BidiWorkerRealm = class BidiWorkerRealm extends BidiRealm {
	static from(realm, worker) {
		const workerRealm = new BidiWorkerRealm(realm, worker);
		workerRealm.initialize();
		return workerRealm;
	}
	#worker;
	constructor(realm, frame) {
		super(realm, frame.timeoutSettings);
		this.#worker = frame;
	}
	get environment() {
		return this.#worker;
	}
	async adoptBackendNode() {
		throw new Error("Cannot adopt DOM nodes into a worker.");
	}
};
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
var BidiWebWorker = class BidiWebWorker extends WebWorker {
	static from(frame, realm) {
		return new BidiWebWorker(frame, realm);
	}
	#frame;
	#realm;
	constructor(frame, realm) {
		super(realm.origin);
		this.#frame = frame;
		this.#realm = BidiWorkerRealm.from(realm, this);
	}
	get frame() {
		return this.#frame;
	}
	mainRealm() {
		return this.#realm;
	}
	get client() {
		throw new UnsupportedOperation();
	}
};
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$5 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$5 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var __setFunctionName$1 = function(f, name, prefix) {
	if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
	return Object.defineProperty(f, "name", {
		configurable: true,
		value: prefix ? "".concat(prefix, " ", name) : name
	});
};
function convertConsoleMessageLevel(method) {
	switch (method) {
		case "group": return "startGroup";
		case "groupCollapsed": return "startGroupCollapsed";
		case "groupEnd": return "endGroup";
		default: return method;
	}
}
var BidiFrame = (() => {
	let _classSuper = Frame;
	let _instanceExtraInitializers = [];
	let _goto_decorators;
	let _setContent_decorators;
	let _waitForNavigation_decorators;
	let _private_waitForLoad$_decorators;
	let _private_waitForLoad$_descriptor;
	let _private_waitForNetworkIdle$_decorators;
	let _private_waitForNetworkIdle$_descriptor;
	let _setFiles_decorators;
	let _frameElement_decorators;
	let _locateNodes_decorators;
	return class BidiFrame extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_goto_decorators = [throwIfDetached];
			_setContent_decorators = [throwIfDetached];
			_waitForNavigation_decorators = [throwIfDetached];
			_private_waitForLoad$_decorators = [throwIfDetached];
			_private_waitForNetworkIdle$_decorators = [throwIfDetached];
			_setFiles_decorators = [throwIfDetached];
			_frameElement_decorators = [throwIfDetached];
			_locateNodes_decorators = [throwIfDetached];
			__esDecorate$5(this, null, _goto_decorators, {
				kind: "method",
				name: "goto",
				static: false,
				private: false,
				access: {
					has: (obj) => "goto" in obj,
					get: (obj) => obj.goto
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$5(this, null, _setContent_decorators, {
				kind: "method",
				name: "setContent",
				static: false,
				private: false,
				access: {
					has: (obj) => "setContent" in obj,
					get: (obj) => obj.setContent
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$5(this, null, _waitForNavigation_decorators, {
				kind: "method",
				name: "waitForNavigation",
				static: false,
				private: false,
				access: {
					has: (obj) => "waitForNavigation" in obj,
					get: (obj) => obj.waitForNavigation
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$5(this, _private_waitForLoad$_descriptor = { value: __setFunctionName$1(function(options = {}) {
				let { waitUntil = "load" } = options;
				const { timeout: ms = this.timeoutSettings.navigationTimeout() } = options;
				if (!Array.isArray(waitUntil)) waitUntil = [waitUntil];
				const events = /* @__PURE__ */ new Set();
				for (const lifecycleEvent of waitUntil) switch (lifecycleEvent) {
					case "load":
						events.add("load");
						break;
					case "domcontentloaded":
						events.add("DOMContentLoaded");
						break;
				}
				if (events.size === 0) return of(void 0);
				return combineLatest([...events].map((event) => {
					return fromEmitterEvent(this.browsingContext, event);
				})).pipe(map(() => {}), first(), raceWith(timeout(ms), this.#detached$().pipe(map(() => {
					throw new Error("Frame detached.");
				}))));
			}, "#waitForLoad$") }, _private_waitForLoad$_decorators, {
				kind: "method",
				name: "#waitForLoad$",
				static: false,
				private: true,
				access: {
					has: (obj) => #waitForLoad$ in obj,
					get: (obj) => obj.#waitForLoad$
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$5(this, _private_waitForNetworkIdle$_descriptor = { value: __setFunctionName$1(function(options = {}) {
				let { waitUntil = "load" } = options;
				if (!Array.isArray(waitUntil)) waitUntil = [waitUntil];
				let concurrency = Infinity;
				for (const event of waitUntil) switch (event) {
					case "networkidle0":
						concurrency = Math.min(0, concurrency);
						break;
					case "networkidle2":
						concurrency = Math.min(2, concurrency);
						break;
				}
				if (concurrency === Infinity) return of(void 0);
				return this.page().waitForNetworkIdle$({
					idleTime: 500,
					timeout: options.timeout ?? this.timeoutSettings.timeout(),
					concurrency
				});
			}, "#waitForNetworkIdle$") }, _private_waitForNetworkIdle$_decorators, {
				kind: "method",
				name: "#waitForNetworkIdle$",
				static: false,
				private: true,
				access: {
					has: (obj) => #waitForNetworkIdle$ in obj,
					get: (obj) => obj.#waitForNetworkIdle$
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$5(this, null, _setFiles_decorators, {
				kind: "method",
				name: "setFiles",
				static: false,
				private: false,
				access: {
					has: (obj) => "setFiles" in obj,
					get: (obj) => obj.setFiles
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$5(this, null, _frameElement_decorators, {
				kind: "method",
				name: "frameElement",
				static: false,
				private: false,
				access: {
					has: (obj) => "frameElement" in obj,
					get: (obj) => obj.frameElement
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$5(this, null, _locateNodes_decorators, {
				kind: "method",
				name: "locateNodes",
				static: false,
				private: false,
				access: {
					has: (obj) => "locateNodes" in obj,
					get: (obj) => obj.locateNodes
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static from(parent, browsingContext) {
			const frame = new BidiFrame(parent, browsingContext);
			frame.#initialize();
			return frame;
		}
		#parent = __runInitializers$5(this, _instanceExtraInitializers);
		browsingContext;
		#frames = /* @__PURE__ */ new WeakMap();
		realms;
		_id;
		client;
		accessibility;
		constructor(parent, browsingContext) {
			super();
			this.#parent = parent;
			this.browsingContext = browsingContext;
			this._id = browsingContext.id;
			this.client = new BidiCdpSession(this);
			this.realms = {
				default: BidiFrameRealm.from(this.browsingContext.defaultRealm, this),
				internal: BidiFrameRealm.from(this.browsingContext.createWindowRealm(`__puppeteer_internal_${Math.ceil(Math.random() * 1e4)}`), this)
			};
			this.accessibility = new Accessibility(this.realms.default, this._id);
		}
		#initialize() {
			for (const browsingContext of this.browsingContext.children) this.#createFrameTarget(browsingContext);
			this.browsingContext.on("browsingcontext", ({ browsingContext }) => {
				this.#createFrameTarget(browsingContext);
			});
			this.browsingContext.on("closed", () => {
				for (const session of BidiCdpSession.sessions.values()) if (session.frame === this) session.onClose();
				this.page().trustedEmitter.emit("framedetached", this);
			});
			this.browsingContext.on("request", ({ request }) => {
				const httpRequest = BidiHTTPRequest.from(request, this, this.page().isNetworkInterceptionEnabled);
				request.once("success", () => {
					this.page().trustedEmitter.emit("requestfinished", httpRequest);
				});
				request.once("error", () => {
					this.page().trustedEmitter.emit("requestfailed", httpRequest);
				});
				httpRequest.finalizeInterceptions();
			});
			this.browsingContext.on("navigation", ({ navigation }) => {
				navigation.once("fragment", () => {
					this.page().trustedEmitter.emit("framenavigated", this);
				});
			});
			this.browsingContext.on("load", () => {
				this.page().trustedEmitter.emit("load", void 0);
			});
			this.browsingContext.on("DOMContentLoaded", () => {
				this._hasStartedLoading = true;
				this.page().trustedEmitter.emit("domcontentloaded", void 0);
				this.page().trustedEmitter.emit("framenavigated", this);
			});
			this.browsingContext.on("userprompt", ({ userPrompt }) => {
				this.page().trustedEmitter.emit("dialog", BidiDialog.from(userPrompt));
			});
			this.browsingContext.on("log", ({ entry }) => {
				if (this._id !== entry.source.context) return;
				if (isConsoleLogEntry(entry)) {
					const args = entry.args.map((arg) => {
						return this.mainRealm().createHandle(arg);
					});
					const text = args.reduce((value, arg) => {
						return `${value} ${arg instanceof BidiJSHandle && arg.isPrimitiveValue ? BidiDeserializer.deserialize(arg.remoteValue()) : arg.toString()}`;
					}, "").slice(1);
					this.page().trustedEmitter.emit("console", new ConsoleMessage(convertConsoleMessageLevel(entry.method), text, args, getStackTraceLocations(entry.stackTrace), this, void 0));
				} else if (isJavaScriptLogEntry(entry)) {
					const error = new Error(entry.text ?? "");
					const messageHeight = error.message.split("\n").length;
					const messageLines = error.stack.split("\n").splice(0, messageHeight);
					const stackLines = [];
					if (entry.stackTrace) for (const frame of entry.stackTrace.callFrames) {
						stackLines.push(`    at ${frame.functionName || "<anonymous>"} (${frame.url}:${frame.lineNumber + 1}:${frame.columnNumber + 1})`);
						if (stackLines.length >= Error.stackTraceLimit) break;
					}
					error.stack = [...messageLines, ...stackLines].join("\n");
					this.page().trustedEmitter.emit("pageerror", error);
				} else debugError(`Unhandled LogEntry with type "${entry.type}", text "${entry.text}" and level "${entry.level}"`);
			});
			this.browsingContext.on("worker", ({ realm }) => {
				const worker = BidiWebWorker.from(this, realm);
				realm.on("destroyed", () => {
					this.page().trustedEmitter.emit("workerdestroyed", worker);
				});
				this.page().trustedEmitter.emit("workercreated", worker);
			});
		}
		#createFrameTarget(browsingContext) {
			const frame = BidiFrame.from(this, browsingContext);
			this.#frames.set(browsingContext, frame);
			this.page().trustedEmitter.emit("frameattached", frame);
			browsingContext.on("closed", () => {
				this.#frames.delete(browsingContext);
			});
			return frame;
		}
		get timeoutSettings() {
			return this.page()._timeoutSettings;
		}
		mainRealm() {
			return this.realms.default;
		}
		isolatedRealm() {
			return this.realms.internal;
		}
		realm(id) {
			for (const realm of Object.values(this.realms)) if (realm.realm.id === id) return realm;
		}
		page() {
			let parent = this.#parent;
			while (parent instanceof BidiFrame) parent = parent.#parent;
			return parent;
		}
		url() {
			return this.browsingContext.url;
		}
		parentFrame() {
			if (this.#parent instanceof BidiFrame) return this.#parent;
			return null;
		}
		childFrames() {
			return [...this.browsingContext.children].map((child) => {
				return this.#frames.get(child);
			});
		}
		#detached$() {
			return defer(() => {
				if (this.detached) return of(this);
				return fromEmitterEvent(this.page().trustedEmitter, "framedetached").pipe(filter((detachedFrame) => {
					return detachedFrame === this;
				}));
			});
		}
		async goto(url, options = {}) {
			const [response] = await Promise.all([this.waitForNavigation(options), this.browsingContext.navigate(url, "interactive").catch((error) => {
				if (isErrorLike(error) && error.message.includes("net::ERR_HTTP_RESPONSE_CODE_FAILURE")) return;
				if (error.message.includes("navigation canceled")) return;
				if (error.message.includes("Navigation was aborted by another navigation")) return;
				throw error;
			})]).catch(rewriteNavigationError(url, options.timeout ?? this.timeoutSettings.navigationTimeout()));
			return response;
		}
		async setContent(html, options = {}) {
			await Promise.all([this.setFrameContent(html), firstValueFrom(combineLatest([this.#waitForLoad$(options), this.#waitForNetworkIdle$(options)]))]);
		}
		async waitForNavigation(options = {}) {
			const { timeout: ms = this.timeoutSettings.navigationTimeout(), signal } = options;
			const frames = this.childFrames().map((frame) => {
				return frame.#detached$();
			});
			return await firstValueFrom(combineLatest([race(fromEmitterEvent(this.browsingContext, "navigation"), fromEmitterEvent(this.browsingContext, "historyUpdated").pipe(map(() => {
				return { navigation: null };
			}))).pipe(first()).pipe(switchMap(({ navigation }) => {
				if (navigation === null) return of(null);
				return this.#waitForLoad$(options).pipe(delayWhen(() => {
					if (frames.length === 0) return of(void 0);
					return combineLatest(frames);
				}), raceWith(fromEmitterEvent(navigation, "fragment"), fromEmitterEvent(navigation, "failed"), fromEmitterEvent(navigation, "aborted")), switchMap(() => {
					if (navigation.request) {
						function requestFinished$(request) {
							if (navigation === null) return of(null);
							if (request.response || request.error) return of(navigation);
							if (request.redirect) return requestFinished$(request.redirect);
							return fromEmitterEvent(request, "success").pipe(raceWith(fromEmitterEvent(request, "error")), raceWith(fromEmitterEvent(request, "redirect"))).pipe(switchMap(() => {
								return requestFinished$(request);
							}));
						}
						return requestFinished$(navigation.request);
					}
					return of(navigation);
				}));
			})), this.#waitForNetworkIdle$(options)]).pipe(map(([navigation]) => {
				if (!navigation) return null;
				const request = navigation.request;
				if (!request) return null;
				const lastRequest = request.lastRedirect ?? request;
				return requests.get(lastRequest).response();
			}), raceWith(timeout(ms), fromAbortSignal(signal), this.#detached$().pipe(map(() => {
				throw new TargetCloseError("Frame detached.");
			})))));
		}
		waitForDevicePrompt(options = {}) {
			const { timeout = this.timeoutSettings.timeout(), signal } = options;
			return this.browsingContext.waitForDevicePrompt(timeout, signal);
		}
		get detached() {
			return this.browsingContext.closed;
		}
		#exposedFunctions = /* @__PURE__ */ new Map();
		async exposeFunction(name, apply) {
			if (this.#exposedFunctions.has(name)) throw new Error(`Failed to add page binding with name ${name}: globalThis['${name}'] already exists!`);
			const exposable = await ExposableFunction.from(this, name, apply);
			this.#exposedFunctions.set(name, exposable);
		}
		async removeExposedFunction(name) {
			const exposedFunction = this.#exposedFunctions.get(name);
			if (!exposedFunction) throw new Error(`Failed to remove page binding with name ${name}: window['${name}'] does not exists!`);
			this.#exposedFunctions.delete(name);
			await exposedFunction[Symbol.asyncDispose]();
		}
		async createCDPSession() {
			if (!this.page().browser().cdpSupported) throw new UnsupportedOperation();
			return await this.page().browser().cdpConnection._createSession({ targetId: this._id });
		}
		get #waitForLoad$() {
			return _private_waitForLoad$_descriptor.value;
		}
		get #waitForNetworkIdle$() {
			return _private_waitForNetworkIdle$_descriptor.value;
		}
		async setFiles(element, files) {
			await this.browsingContext.setFiles(element.remoteValue(), files);
		}
		async frameElement() {
			const parentFrame = this.parentFrame();
			if (!parentFrame) return null;
			const [node] = await parentFrame.browsingContext.locateNodes({
				type: "context",
				value: { context: this._id }
			});
			if (!node) return null;
			return BidiElementHandle.from(node, parentFrame.mainRealm());
		}
		async locateNodes(element, locator) {
			return await this.browsingContext.locateNodes(locator, [element.remoteValue()]);
		}
	};
})();
function isConsoleLogEntry(event) {
	return event.type === "console";
}
function isJavaScriptLogEntry(event) {
	return event.type === "javascript";
}
function getStackTraceLocations(stackTrace) {
	const stackTraceLocations = [];
	if (stackTrace) for (const callFrame of stackTrace.callFrames) stackTraceLocations.push({
		url: callFrame.url,
		lineNumber: callFrame.lineNumber,
		columnNumber: callFrame.columnNumber
	});
	return stackTraceLocations;
}
/**
* @license
* Copyright 2017 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var SourceActionsType;
(function(SourceActionsType) {
	SourceActionsType["None"] = "none";
	SourceActionsType["Key"] = "key";
	SourceActionsType["Pointer"] = "pointer";
	SourceActionsType["Wheel"] = "wheel";
})(SourceActionsType || (SourceActionsType = {}));
var ActionType;
(function(ActionType) {
	ActionType["Pause"] = "pause";
	ActionType["KeyDown"] = "keyDown";
	ActionType["KeyUp"] = "keyUp";
	ActionType["PointerUp"] = "pointerUp";
	ActionType["PointerDown"] = "pointerDown";
	ActionType["PointerMove"] = "pointerMove";
	ActionType["Scroll"] = "scroll";
})(ActionType || (ActionType = {}));
var getBidiKeyValue = (key) => {
	switch (key) {
		case "\r":
		case "\n":
			key = "Enter";
			break;
	}
	if ([...key].length === 1) return key;
	switch (key) {
		case "Cancel": return "";
		case "Help": return "";
		case "Backspace": return "";
		case "Tab": return "";
		case "Clear": return "";
		case "Enter": return "";
		case "Shift":
		case "ShiftLeft": return "";
		case "Control":
		case "ControlLeft": return "";
		case "Alt":
		case "AltLeft": return "";
		case "Pause": return "";
		case "Escape": return "";
		case "PageUp": return "";
		case "PageDown": return "";
		case "End": return "";
		case "Home": return "";
		case "ArrowLeft": return "";
		case "ArrowUp": return "";
		case "ArrowRight": return "";
		case "ArrowDown": return "";
		case "Insert": return "";
		case "Delete": return "";
		case "NumpadEqual": return "";
		case "Numpad0": return "";
		case "Numpad1": return "";
		case "Numpad2": return "";
		case "Numpad3": return "";
		case "Numpad4": return "";
		case "Numpad5": return "";
		case "Numpad6": return "";
		case "Numpad7": return "";
		case "Numpad8": return "";
		case "Numpad9": return "";
		case "NumpadMultiply": return "";
		case "NumpadAdd": return "";
		case "NumpadSubtract": return "";
		case "NumpadDecimal": return "";
		case "NumpadDivide": return "";
		case "F1": return "";
		case "F2": return "";
		case "F3": return "";
		case "F4": return "";
		case "F5": return "";
		case "F6": return "";
		case "F7": return "";
		case "F8": return "";
		case "F9": return "";
		case "F10": return "";
		case "F11": return "";
		case "F12": return "";
		case "Meta":
		case "MetaLeft": return "";
		case "ShiftRight": return "";
		case "ControlRight": return "";
		case "AltRight": return "";
		case "MetaRight": return "";
		case "Digit0": return "0";
		case "Digit1": return "1";
		case "Digit2": return "2";
		case "Digit3": return "3";
		case "Digit4": return "4";
		case "Digit5": return "5";
		case "Digit6": return "6";
		case "Digit7": return "7";
		case "Digit8": return "8";
		case "Digit9": return "9";
		case "KeyA": return "a";
		case "KeyB": return "b";
		case "KeyC": return "c";
		case "KeyD": return "d";
		case "KeyE": return "e";
		case "KeyF": return "f";
		case "KeyG": return "g";
		case "KeyH": return "h";
		case "KeyI": return "i";
		case "KeyJ": return "j";
		case "KeyK": return "k";
		case "KeyL": return "l";
		case "KeyM": return "m";
		case "KeyN": return "n";
		case "KeyO": return "o";
		case "KeyP": return "p";
		case "KeyQ": return "q";
		case "KeyR": return "r";
		case "KeyS": return "s";
		case "KeyT": return "t";
		case "KeyU": return "u";
		case "KeyV": return "v";
		case "KeyW": return "w";
		case "KeyX": return "x";
		case "KeyY": return "y";
		case "KeyZ": return "z";
		case "Semicolon": return ";";
		case "Equal": return "=";
		case "Comma": return ",";
		case "Minus": return "-";
		case "Period": return ".";
		case "Slash": return "/";
		case "Backquote": return "`";
		case "BracketLeft": return "[";
		case "Backslash": return "\\";
		case "BracketRight": return "]";
		case "Quote": return "\"";
		default: throw new Error(`Unknown key: "${key}"`);
	}
};
/**
* @internal
*/
var BidiKeyboard = class extends Keyboard {
	#page;
	constructor(page) {
		super();
		this.#page = page;
	}
	async down(key, _options) {
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Key,
			id: "__puppeteer_keyboard",
			actions: [{
				type: ActionType.KeyDown,
				value: getBidiKeyValue(key)
			}]
		}]);
	}
	async up(key) {
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Key,
			id: "__puppeteer_keyboard",
			actions: [{
				type: ActionType.KeyUp,
				value: getBidiKeyValue(key)
			}]
		}]);
	}
	async press(key, options = {}) {
		const { delay = 0 } = options;
		const actions = [{
			type: ActionType.KeyDown,
			value: getBidiKeyValue(key)
		}];
		if (delay > 0) actions.push({
			type: ActionType.Pause,
			duration: delay
		});
		actions.push({
			type: ActionType.KeyUp,
			value: getBidiKeyValue(key)
		});
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Key,
			id: "__puppeteer_keyboard",
			actions
		}]);
	}
	async type(text, options = {}) {
		const { delay = 0 } = options;
		const values = [...text].map(getBidiKeyValue);
		const actions = [];
		if (delay <= 0) for (const value of values) actions.push({
			type: ActionType.KeyDown,
			value
		}, {
			type: ActionType.KeyUp,
			value
		});
		else for (const value of values) actions.push({
			type: ActionType.KeyDown,
			value
		}, {
			type: ActionType.Pause,
			duration: delay
		}, {
			type: ActionType.KeyUp,
			value
		});
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Key,
			id: "__puppeteer_keyboard",
			actions
		}]);
	}
	async sendCharacter(char) {
		if ([...char].length > 1) throw new Error("Cannot send more than 1 character.");
		await (await this.#page.focusedFrame()).isolatedRealm().evaluate(async (char) => {
			document.execCommand("insertText", false, char);
		}, char);
	}
};
var getBidiButton = (button) => {
	switch (button) {
		case MouseButton.Left: return 0;
		case MouseButton.Middle: return 1;
		case MouseButton.Right: return 2;
		case MouseButton.Back: return 3;
		case MouseButton.Forward: return 4;
	}
};
/**
* @internal
*/
var BidiMouse = class extends Mouse {
	#page;
	#lastMovePoint = {
		x: 0,
		y: 0
	};
	constructor(page) {
		super();
		this.#page = page;
	}
	async reset() {
		this.#lastMovePoint = {
			x: 0,
			y: 0
		};
		await this.#page.mainFrame().browsingContext.releaseActions();
	}
	async move(x, y, options = {}) {
		const from = this.#lastMovePoint;
		const to = {
			x: Math.round(x),
			y: Math.round(y)
		};
		const actions = [];
		const steps = options.steps ?? 0;
		for (let i = 0; i < steps; ++i) actions.push({
			type: ActionType.PointerMove,
			x: from.x + (to.x - from.x) * (i / steps),
			y: from.y + (to.y - from.y) * (i / steps),
			origin: options.origin
		});
		actions.push({
			type: ActionType.PointerMove,
			...to,
			origin: options.origin
		});
		this.#lastMovePoint = to;
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Pointer,
			id: "__puppeteer_mouse",
			actions
		}]);
	}
	async down(options = {}) {
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Pointer,
			id: "__puppeteer_mouse",
			actions: [{
				type: ActionType.PointerDown,
				button: getBidiButton(options.button ?? MouseButton.Left)
			}]
		}]);
	}
	async up(options = {}) {
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Pointer,
			id: "__puppeteer_mouse",
			actions: [{
				type: ActionType.PointerUp,
				button: getBidiButton(options.button ?? MouseButton.Left)
			}]
		}]);
	}
	async click(x, y, options = {}) {
		const actions = [{
			type: ActionType.PointerMove,
			x: Math.round(x),
			y: Math.round(y),
			origin: options.origin
		}];
		const pointerDownAction = {
			type: ActionType.PointerDown,
			button: getBidiButton(options.button ?? MouseButton.Left)
		};
		const pointerUpAction = {
			type: ActionType.PointerUp,
			button: pointerDownAction.button
		};
		for (let i = 1; i < (options.count ?? 1); ++i) actions.push(pointerDownAction, pointerUpAction);
		actions.push(pointerDownAction);
		if (options.delay) actions.push({
			type: ActionType.Pause,
			duration: options.delay
		});
		actions.push(pointerUpAction);
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Pointer,
			id: "__puppeteer_mouse",
			actions
		}]);
	}
	async wheel(options = {}) {
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Wheel,
			id: "__puppeteer_wheel",
			actions: [{
				type: ActionType.Scroll,
				...this.#lastMovePoint ?? {
					x: 0,
					y: 0
				},
				deltaX: options.deltaX ?? 0,
				deltaY: options.deltaY ?? 0
			}]
		}]);
	}
	drag() {
		throw new UnsupportedOperation();
	}
	dragOver() {
		throw new UnsupportedOperation();
	}
	dragEnter() {
		throw new UnsupportedOperation();
	}
	drop() {
		throw new UnsupportedOperation();
	}
	dragAndDrop() {
		throw new UnsupportedOperation();
	}
};
/**
* @internal
*/
var BidiTouchHandle = class {
	#started = false;
	#x;
	#y;
	#bidiId;
	#page;
	#touchScreen;
	#properties;
	constructor(page, touchScreen, id, x, y, properties) {
		this.#page = page;
		this.#touchScreen = touchScreen;
		this.#x = Math.round(x);
		this.#y = Math.round(y);
		this.#properties = properties;
		this.#bidiId = `__puppeteer_finger_${id}`;
	}
	async start(options = {}) {
		if (this.#started) throw new TouchError("Touch has already started");
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Pointer,
			id: this.#bidiId,
			parameters: { pointerType: "touch" },
			actions: [{
				type: ActionType.PointerMove,
				x: this.#x,
				y: this.#y,
				origin: options.origin
			}, {
				...this.#properties,
				type: ActionType.PointerDown,
				button: 0
			}]
		}]);
		this.#started = true;
	}
	move(x, y) {
		const newX = Math.round(x);
		const newY = Math.round(y);
		return this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Pointer,
			id: this.#bidiId,
			parameters: { pointerType: "touch" },
			actions: [{
				...this.#properties,
				type: ActionType.PointerMove,
				x: newX,
				y: newY
			}]
		}]);
	}
	async end() {
		await this.#page.mainFrame().browsingContext.performActions([{
			type: SourceActionsType.Pointer,
			id: this.#bidiId,
			parameters: { pointerType: "touch" },
			actions: [{
				type: ActionType.PointerUp,
				button: 0
			}]
		}]);
		this.#touchScreen.removeHandle(this);
	}
};
/**
* @internal
*/
var BidiTouchscreen = class extends Touchscreen {
	#page;
	constructor(page) {
		super();
		this.#page = page;
	}
	async touchStart(x, y, options = {}) {
		const id = this.idGenerator();
		const properties = {
			width: .5 * 2,
			height: .5 * 2,
			pressure: .5,
			altitudeAngle: Math.PI / 2
		};
		const touch = new BidiTouchHandle(this.#page, this, id, x, y, properties);
		await touch.start(options);
		this.touches.push(touch);
		return touch;
	}
};
/**
* @license
* Copyright 2022 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __esDecorate$4 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var __runInitializers$4 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __addDisposableResource$2 = function(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
};
var __disposeResources$2 = (function(SuppressedError) {
	return function(env) {
		function fail(e) {
			env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
			env.hasError = true;
		}
		var r, s = 0;
		function next() {
			while (r = env.stack.pop()) try {
				if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
				if (r.dispose) {
					var result = r.dispose.call(r.value);
					if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
						fail(e);
						return next();
					});
				} else s |= 1;
			} catch (e) {
				fail(e);
			}
			if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
			if (env.hasError) throw env.error;
		}
		return next();
	};
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
	var e = new Error(message);
	return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
* Implements Page using WebDriver BiDi.
*
* @internal
*/
var BidiPage = (() => {
	let _classSuper = Page;
	let _trustedEmitter_decorators;
	let _trustedEmitter_initializers = [];
	let _trustedEmitter_extraInitializers = [];
	return class BidiPage extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_trustedEmitter_decorators = [bubble()];
			__esDecorate$4(this, null, _trustedEmitter_decorators, {
				kind: "accessor",
				name: "trustedEmitter",
				static: false,
				private: false,
				access: {
					has: (obj) => "trustedEmitter" in obj,
					get: (obj) => obj.trustedEmitter,
					set: (obj, value) => {
						obj.trustedEmitter = value;
					}
				},
				metadata: _metadata
			}, _trustedEmitter_initializers, _trustedEmitter_extraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static from(browserContext, browsingContext) {
			const page = new BidiPage(browserContext, browsingContext);
			page.#initialize();
			return page;
		}
		#trustedEmitter_accessor_storage = __runInitializers$4(this, _trustedEmitter_initializers, new EventEmitter());
		get trustedEmitter() {
			return this.#trustedEmitter_accessor_storage;
		}
		set trustedEmitter(value) {
			this.#trustedEmitter_accessor_storage = value;
		}
		#browserContext = __runInitializers$4(this, _trustedEmitter_extraInitializers);
		#frame;
		#viewport = null;
		#workers = /* @__PURE__ */ new Set();
		keyboard;
		mouse;
		touchscreen;
		tracing;
		coverage;
		#cdpEmulationManager;
		#emulatedNetworkConditions;
		#fileChooserDeferreds = /* @__PURE__ */ new Set();
		_client() {
			return this.#frame.client;
		}
		constructor(browserContext, browsingContext) {
			super();
			this.#browserContext = browserContext;
			this.#frame = BidiFrame.from(this, browsingContext);
			this.#cdpEmulationManager = new EmulationManager(this.#frame.client);
			this.tracing = new Tracing(this.#frame.client);
			this.coverage = new Coverage(this.#frame.client);
			this.keyboard = new BidiKeyboard(this);
			this.mouse = new BidiMouse(this);
			this.touchscreen = new BidiTouchscreen(this);
		}
		#initialize() {
			this.#frame.browsingContext.on("closed", () => {
				this.trustedEmitter.emit("close", void 0);
				this.trustedEmitter.removeAllListeners();
			});
			this.trustedEmitter.on("workercreated", (worker) => {
				this.#workers.add(worker);
			});
			this.trustedEmitter.on("workerdestroyed", (worker) => {
				this.#workers.delete(worker);
			});
		}
		/**
		* @internal
		*/
		async setUserAgent(userAgentOrOptions, userAgentMetadata) {
			let userAgent;
			let clientHints;
			let platform;
			if (typeof userAgentOrOptions === "string") {
				userAgent = userAgentOrOptions;
				clientHints = userAgentMetadata;
			} else {
				userAgent = userAgentOrOptions.userAgent ?? null;
				clientHints = userAgentOrOptions.userAgentMetadata;
				platform = userAgentOrOptions.platform === "" ? void 0 : userAgentOrOptions.platform;
			}
			if (userAgent === "") userAgent = null;
			await this.#frame.browsingContext.setUserAgent(userAgent);
			if (platform && platform !== "") {
				clientHints = clientHints ?? {};
				clientHints.platform = platform;
			}
			await this.#frame.browsingContext.setClientHintsOverride(clientHints ?? null);
		}
		async setBypassCSP(enabled) {
			await this._client().send("Page.setBypassCSP", { enabled });
		}
		async queryObjects(prototypeHandle) {
			assert(!prototypeHandle.disposed, "Prototype JSHandle is disposed!");
			assert(prototypeHandle.id, "Prototype JSHandle must not be referencing primitive value");
			const response = await this.#frame.client.send("Runtime.queryObjects", { prototypeObjectId: prototypeHandle.id });
			return this.#frame.mainRealm().createHandle({
				type: "array",
				handle: response.objects.objectId
			});
		}
		browser() {
			return this.browserContext().browser();
		}
		browserContext() {
			return this.#browserContext;
		}
		mainFrame() {
			return this.#frame;
		}
		async emulateFocusedPage(enabled) {
			return await this.#cdpEmulationManager.emulateFocus(enabled);
		}
		resize(_params) {
			throw new UnsupportedOperation();
		}
		async windowId() {
			return this.#frame.browsingContext.windowId;
		}
		openDevTools() {
			throw new UnsupportedOperation();
		}
		async focusedFrame() {
			const env_1 = {
				stack: [],
				error: void 0,
				hasError: false
			};
			try {
				const value = __addDisposableResource$2(env_1, await this.mainFrame().isolatedRealm().evaluateHandle(() => {
					let win = window;
					while (win.document.activeElement instanceof win.HTMLIFrameElement || win.document.activeElement instanceof win.HTMLFrameElement) {
						if (win.document.activeElement.contentWindow === null) break;
						win = win.document.activeElement.contentWindow;
					}
					return win;
				}), false).remoteValue();
				assert(value.type === "window");
				const frame = this.frames().find((frame) => {
					return frame._id === value.value.context;
				});
				assert(frame);
				return frame;
			} catch (e_1) {
				env_1.error = e_1;
				env_1.hasError = true;
			} finally {
				__disposeResources$2(env_1);
			}
		}
		frames() {
			const frames = [this.#frame];
			for (const frame of frames) frames.push(...frame.childFrames());
			return frames;
		}
		isClosed() {
			return this.#frame.detached;
		}
		async close(options) {
			const env_2 = {
				stack: [],
				error: void 0,
				hasError: false
			};
			try {
				__addDisposableResource$2(env_2, await this.#browserContext.waitForScreenshotOperations(), false);
				try {
					await this.#frame.browsingContext.close(options?.runBeforeUnload);
				} catch {
					return;
				}
			} catch (e_2) {
				env_2.error = e_2;
				env_2.hasError = true;
			} finally {
				__disposeResources$2(env_2);
			}
		}
		async reload(options = {}) {
			const [response] = await Promise.all([this.#frame.waitForNavigation(options), this.#frame.browsingContext.reload({ ignoreCache: options.ignoreCache ? true : void 0 })]).catch(rewriteNavigationError(this.url(), options.timeout ?? this._timeoutSettings.navigationTimeout()));
			return response;
		}
		setDefaultNavigationTimeout(timeout) {
			this._timeoutSettings.setDefaultNavigationTimeout(timeout);
		}
		setDefaultTimeout(timeout) {
			this._timeoutSettings.setDefaultTimeout(timeout);
		}
		getDefaultTimeout() {
			return this._timeoutSettings.timeout();
		}
		getDefaultNavigationTimeout() {
			return this._timeoutSettings.navigationTimeout();
		}
		isJavaScriptEnabled() {
			return this.#frame.browsingContext.isJavaScriptEnabled();
		}
		async setGeolocation(options) {
			const { longitude, latitude, accuracy = 0 } = options;
			if (longitude < -180 || longitude > 180) throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
			if (latitude < -90 || latitude > 90) throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
			if (accuracy < 0) throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
			return await this.#frame.browsingContext.setGeolocationOverride({ coordinates: {
				latitude: options.latitude,
				longitude: options.longitude,
				accuracy: options.accuracy
			} });
		}
		async setJavaScriptEnabled(enabled) {
			return await this.#frame.browsingContext.setJavaScriptEnabled(enabled);
		}
		async emulateMediaType(type) {
			return await this.#cdpEmulationManager.emulateMediaType(type);
		}
		async emulateCPUThrottling(factor) {
			return await this.#cdpEmulationManager.emulateCPUThrottling(factor);
		}
		async emulateMediaFeatures(features) {
			return await this.#cdpEmulationManager.emulateMediaFeatures(features);
		}
		async emulateTimezone(timezoneId) {
			return await this.#frame.browsingContext.setTimezoneOverride(timezoneId);
		}
		async emulateIdleState(overrides) {
			return await this.#cdpEmulationManager.emulateIdleState(overrides);
		}
		async emulateVisionDeficiency(type) {
			return await this.#cdpEmulationManager.emulateVisionDeficiency(type);
		}
		async setViewport(viewport) {
			let needsReload = false;
			if (!this.browser().cdpSupported) {
				const viewportSize = viewport?.width && viewport?.height ? {
					width: viewport.width,
					height: viewport.height
				} : null;
				const devicePixelRatio = viewport?.deviceScaleFactor ? viewport.deviceScaleFactor : null;
				const screenOrientation = viewport ? viewport.isLandscape ? {
					natural: "landscape",
					type: "landscape-primary"
				} : {
					natural: "portrait",
					type: "portrait-primary"
				} : null;
				const commands = [this.#frame.browsingContext.setViewport({
					viewport: viewportSize,
					devicePixelRatio
				}), this.#frame.browsingContext.setScreenOrientationOverride(screenOrientation)];
				if ((this.#viewport?.hasTouch ?? false) !== (viewport?.hasTouch ?? false)) {
					needsReload = true;
					const maxTouchPoints = viewport?.hasTouch ? 1 : null;
					commands.push(this.#frame.browsingContext.setTouchOverride(maxTouchPoints).catch((error) => {
						if (error instanceof ProtocolError && (error.message.includes("unknown command") || error.message.includes("unsupported operation"))) return;
						throw error;
					}));
				}
				await Promise.all(commands);
			} else needsReload = await this.#cdpEmulationManager.emulateViewport(viewport);
			this.#viewport = viewport;
			if (needsReload) await this.reload();
		}
		viewport() {
			return this.#viewport;
		}
		async pdf(options = {}) {
			const { timeout: ms = this._timeoutSettings.timeout(), path = void 0 } = options;
			const { printBackground: background, margin, landscape, width, height, pageRanges: ranges, scale, preferCSSPageSize } = parsePDFOptions(options, "cm");
			const pageRanges = ranges ? ranges.split(", ") : [];
			await firstValueFrom(from(this.mainFrame().isolatedRealm().evaluate(() => {
				return document.fonts.ready;
			})).pipe(raceWith(timeout(ms))));
			const typedArray = stringToTypedArray(await firstValueFrom(from(this.#frame.browsingContext.print({
				background,
				margin,
				orientation: landscape ? "landscape" : "portrait",
				page: {
					width,
					height
				},
				pageRanges,
				scale,
				shrinkToFit: !preferCSSPageSize
			})).pipe(raceWith(timeout(ms)))), true);
			await this._maybeWriteTypedArrayToFile(path, typedArray);
			return typedArray;
		}
		async createPDFStream(options) {
			const typedArray = await this.pdf(options);
			return new ReadableStream({ start(controller) {
				controller.enqueue(typedArray);
				controller.close();
			} });
		}
		async _screenshot(options) {
			const { clip, type, captureBeyondViewport, quality } = options;
			if (options.omitBackground !== void 0 && options.omitBackground) throw new UnsupportedOperation(`BiDi does not support 'omitBackground'.`);
			if (options.optimizeForSpeed !== void 0 && options.optimizeForSpeed) throw new UnsupportedOperation(`BiDi does not support 'optimizeForSpeed'.`);
			if (options.fromSurface !== void 0 && !options.fromSurface) throw new UnsupportedOperation(`BiDi does not support 'fromSurface'.`);
			if (clip !== void 0 && clip.scale !== void 0 && clip.scale !== 1) throw new UnsupportedOperation(`BiDi does not support 'scale' in 'clip'.`);
			let box;
			if (clip) if (captureBeyondViewport) box = clip;
			else {
				const [pageLeft, pageTop] = await this.evaluate(() => {
					if (!window.visualViewport) throw new Error("window.visualViewport is not supported.");
					return [window.visualViewport.pageLeft, window.visualViewport.pageTop];
				});
				box = {
					...clip,
					x: clip.x - pageLeft,
					y: clip.y - pageTop
				};
			}
			return await this.#frame.browsingContext.captureScreenshot({
				origin: captureBeyondViewport ? "document" : "viewport",
				format: {
					type: `image/${type}`,
					...quality !== void 0 ? { quality: quality / 100 } : {}
				},
				...box ? { clip: {
					type: "box",
					...box
				} } : {}
			});
		}
		async createCDPSession() {
			return await this.#frame.createCDPSession();
		}
		async bringToFront() {
			await this.#frame.browsingContext.activate();
		}
		async evaluateOnNewDocument(pageFunction, ...args) {
			const expression = evaluationExpression(pageFunction, ...args);
			return { identifier: await this.#frame.browsingContext.addPreloadScript(expression) };
		}
		async removeScriptToEvaluateOnNewDocument(id) {
			await this.#frame.browsingContext.removePreloadScript(id);
		}
		async exposeFunction(name, pptrFunction) {
			return await this.mainFrame().exposeFunction(name, "default" in pptrFunction ? pptrFunction.default : pptrFunction);
		}
		isDragInterceptionEnabled() {
			return false;
		}
		async setCacheEnabled(enabled) {
			if (!this.#browserContext.browser().cdpSupported) {
				await this.#frame.browsingContext.setCacheBehavior(enabled ? "default" : "bypass");
				return;
			}
			await this._client().send("Network.setCacheDisabled", { cacheDisabled: !enabled });
		}
		async cookies(...urls) {
			const normalizedUrls = (urls.length ? urls : [this.url()]).map((url) => {
				return new URL(url);
			});
			return (await this.#frame.browsingContext.getCookies()).map((cookie) => {
				return bidiToPuppeteerCookie(cookie);
			}).filter((cookie) => {
				return normalizedUrls.some((url) => {
					return testUrlMatchCookie(cookie, url);
				});
			});
		}
		isServiceWorkerBypassed() {
			throw new UnsupportedOperation();
		}
		target() {
			throw new UnsupportedOperation();
		}
		async waitForFileChooser(options = {}) {
			const { timeout = this._timeoutSettings.timeout() } = options;
			const deferred = Deferred.create({
				message: `Waiting for \`FileChooser\` failed: ${timeout}ms exceeded`,
				timeout
			});
			this.#fileChooserDeferreds.add(deferred);
			if (options.signal) options.signal.addEventListener("abort", () => {
				deferred.reject(options.signal?.reason);
			}, { once: true });
			this.#frame.browsingContext.once("filedialogopened", (info) => {
				if (!info.element) return;
				const chooser = new FileChooser(BidiElementHandle.from({
					sharedId: info.element.sharedId,
					handle: info.element.handle,
					type: "node"
				}, this.#frame.mainRealm()), info.multiple);
				for (const deferred of this.#fileChooserDeferreds) {
					deferred.resolve(chooser);
					this.#fileChooserDeferreds.delete(deferred);
				}
			});
			try {
				return await deferred.valueOrThrow();
			} catch (error) {
				this.#fileChooserDeferreds.delete(deferred);
				throw error;
			}
		}
		workers() {
			return [...this.#workers];
		}
		get isNetworkInterceptionEnabled() {
			return Boolean(this.#requestInterception) || Boolean(this.#authInterception);
		}
		#requestInterception;
		async setRequestInterception(enable) {
			this.#requestInterception = await this.#toggleInterception(["beforeRequestSent"], this.#requestInterception, enable);
		}
		/**
		* @internal
		*/
		async setExtraHTTPHeaders(headers) {
			await this.#frame.browsingContext.setExtraHTTPHeaders(headers);
		}
		/**
		* @internal
		*/
		_credentials = null;
		#authInterception;
		async authenticate(credentials) {
			this.#authInterception = await this.#toggleInterception(["authRequired"], this.#authInterception, Boolean(credentials));
			this._credentials = credentials;
		}
		async #toggleInterception(phases, interception, expected) {
			if (expected && !interception) return await this.#frame.browsingContext.addIntercept({ phases });
			else if (!expected && interception) {
				await this.#frame.browsingContext.userContext.browser.removeIntercept(interception);
				return;
			}
			return interception;
		}
		setDragInterception() {
			throw new UnsupportedOperation();
		}
		setBypassServiceWorker() {
			throw new UnsupportedOperation();
		}
		async setOfflineMode(enabled) {
			if (!this.#browserContext.browser().cdpSupported) return await this.#frame.browsingContext.setOfflineMode(enabled);
			if (!this.#emulatedNetworkConditions) this.#emulatedNetworkConditions = {
				offline: false,
				upload: -1,
				download: -1,
				latency: 0
			};
			this.#emulatedNetworkConditions.offline = enabled;
			return await this.#applyNetworkConditions();
		}
		async emulateNetworkConditions(networkConditions) {
			if (!this.#browserContext.browser().cdpSupported) {
				if (!networkConditions?.offline && ((networkConditions?.upload ?? -1) >= 0 || (networkConditions?.download ?? -1) >= 0 || (networkConditions?.latency ?? 0) > 0)) throw new UnsupportedOperation();
				return await this.#frame.browsingContext.setOfflineMode(networkConditions?.offline ?? false);
			}
			if (!this.#emulatedNetworkConditions) this.#emulatedNetworkConditions = {
				offline: networkConditions?.offline ?? false,
				upload: -1,
				download: -1,
				latency: 0
			};
			this.#emulatedNetworkConditions.upload = networkConditions ? networkConditions.upload : -1;
			this.#emulatedNetworkConditions.download = networkConditions ? networkConditions.download : -1;
			this.#emulatedNetworkConditions.latency = networkConditions ? networkConditions.latency : 0;
			this.#emulatedNetworkConditions.offline = networkConditions?.offline ?? false;
			return await this.#applyNetworkConditions();
		}
		async #applyNetworkConditions() {
			if (!this.#emulatedNetworkConditions) return;
			await this._client().send("Network.emulateNetworkConditions", {
				offline: this.#emulatedNetworkConditions.offline,
				latency: this.#emulatedNetworkConditions.latency,
				uploadThroughput: this.#emulatedNetworkConditions.upload,
				downloadThroughput: this.#emulatedNetworkConditions.download
			});
		}
		async setCookie(...cookies) {
			const pageURL = this.url();
			const pageUrlStartsWithHTTP = pageURL.startsWith("http");
			for (const cookie of cookies) {
				let cookieUrl = cookie.url || "";
				if (!cookieUrl && pageUrlStartsWithHTTP) cookieUrl = pageURL;
				assert(cookieUrl !== "about:blank", `Blank page can not have cookie "${cookie.name}"`);
				assert(!String.prototype.startsWith.call(cookieUrl || "", "data:"), `Data URL page can not have cookie "${cookie.name}"`);
				assert(cookie.partitionKey === void 0 || typeof cookie.partitionKey === "string", "BiDi only allows domain partition keys");
				const normalizedUrl = URL.canParse(cookieUrl) ? new URL(cookieUrl) : void 0;
				const domain = cookie.domain ?? normalizedUrl?.hostname;
				assert(domain !== void 0, `At least one of the url and domain needs to be specified`);
				const bidiCookie = {
					domain,
					name: cookie.name,
					value: {
						type: "string",
						value: cookie.value
					},
					...cookie.path !== void 0 ? { path: cookie.path } : {},
					...cookie.httpOnly !== void 0 ? { httpOnly: cookie.httpOnly } : {},
					...cookie.secure !== void 0 ? { secure: cookie.secure } : {},
					...cookie.sameSite !== void 0 ? { sameSite: convertCookiesSameSiteCdpToBiDi(cookie.sameSite) } : {},
					expiry: convertCookiesExpiryCdpToBiDi(cookie.expires),
					...cdpSpecificCookiePropertiesFromPuppeteerToBidi(cookie, "sameParty", "sourceScheme", "priority", "url")
				};
				if (cookie.partitionKey !== void 0) await this.browserContext().userContext.setCookie(bidiCookie, cookie.partitionKey);
				else await this.#frame.browsingContext.setCookie(bidiCookie);
			}
		}
		async deleteCookie(...cookies) {
			await Promise.all(cookies.map(async (deleteCookieRequest) => {
				const cookieUrl = deleteCookieRequest.url ?? this.url();
				const normalizedUrl = URL.canParse(cookieUrl) ? new URL(cookieUrl) : void 0;
				const domain = deleteCookieRequest.domain ?? normalizedUrl?.hostname;
				assert(domain !== void 0, `At least one of the url and domain needs to be specified`);
				const filter = {
					domain,
					name: deleteCookieRequest.name,
					...deleteCookieRequest.path !== void 0 ? { path: deleteCookieRequest.path } : {}
				};
				await this.#frame.browsingContext.deleteCookie(filter);
			}));
		}
		async removeExposedFunction(name) {
			await this.#frame.removeExposedFunction(name);
		}
		metrics() {
			throw new UnsupportedOperation();
		}
		async captureHeapSnapshot(_options) {
			throw new UnsupportedOperation();
		}
		async goBack(options = {}) {
			return await this.#go(-1, options);
		}
		async goForward(options = {}) {
			return await this.#go(1, options);
		}
		async #go(delta, options) {
			const controller = new AbortController();
			try {
				const [response] = await Promise.all([this.waitForNavigation({
					...options,
					signal: controller.signal
				}), this.#frame.browsingContext.traverseHistory(delta)]);
				return response;
			} catch (error) {
				controller.abort();
				throw error;
			}
		}
		async waitForDevicePrompt(options = {}) {
			return await this.mainFrame().waitForDevicePrompt(options);
		}
		get bluetooth() {
			return this.mainFrame().browsingContext.bluetooth;
		}
	};
})();
function evaluationExpression(fun, ...args) {
	return `() => {${evaluationString(fun, ...args)}}`;
}
/**
* Check domains match.
*/
function testUrlMatchCookieHostname(cookie, normalizedUrl) {
	const cookieDomain = cookie.domain.toLowerCase();
	const urlHostname = normalizedUrl.hostname.toLowerCase();
	if (cookieDomain === urlHostname) return true;
	return cookieDomain.startsWith(".") && urlHostname.endsWith(cookieDomain);
}
/**
* Check paths match.
* Spec: https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4
*/
function testUrlMatchCookiePath(cookie, normalizedUrl) {
	const uriPath = normalizedUrl.pathname;
	const cookiePath = cookie.path;
	if (uriPath === cookiePath) return true;
	if (uriPath.startsWith(cookiePath)) {
		if (cookiePath.endsWith("/")) return true;
		if (uriPath[cookiePath.length] === "/") return true;
	}
	return false;
}
/**
* Checks the cookie matches the URL according to the spec:
*/
function testUrlMatchCookie(cookie, url) {
	const normalizedUrl = new URL(url);
	assert(cookie !== void 0);
	if (!testUrlMatchCookieHostname(cookie, normalizedUrl)) return false;
	return testUrlMatchCookiePath(cookie, normalizedUrl);
}
function bidiToPuppeteerCookie(bidiCookie, returnCompositePartitionKey = false) {
	const partitionKey = bidiCookie[CDP_SPECIFIC_PREFIX + "partitionKey"];
	function getPartitionKey() {
		if (typeof partitionKey === "string") return { partitionKey };
		if (typeof partitionKey === "object" && partitionKey !== null) {
			if (returnCompositePartitionKey) return { partitionKey: {
				sourceOrigin: partitionKey.topLevelSite,
				hasCrossSiteAncestor: partitionKey.hasCrossSiteAncestor ?? false
			} };
			return { partitionKey: partitionKey.topLevelSite };
		}
		return {};
	}
	return {
		name: bidiCookie.name,
		value: bidiCookie.value.value,
		domain: bidiCookie.domain,
		path: bidiCookie.path,
		size: bidiCookie.size,
		httpOnly: bidiCookie.httpOnly,
		secure: bidiCookie.secure,
		sameSite: convertCookiesSameSiteBiDiToCdp(bidiCookie.sameSite),
		expires: bidiCookie.expiry ?? -1,
		session: bidiCookie.expiry === void 0 || bidiCookie.expiry <= 0,
		...cdpSpecificCookiePropertiesFromBidiToPuppeteer(bidiCookie, "sameParty", "sourceScheme", "partitionKeyOpaque", "priority"),
		...getPartitionKey()
	};
}
var CDP_SPECIFIC_PREFIX = "goog:";
/**
* Gets CDP-specific properties from the BiDi cookie and returns them as a new object.
*/
function cdpSpecificCookiePropertiesFromBidiToPuppeteer(bidiCookie, ...propertyNames) {
	const result = {};
	for (const property of propertyNames) if (bidiCookie[CDP_SPECIFIC_PREFIX + property] !== void 0) result[property] = bidiCookie[CDP_SPECIFIC_PREFIX + property];
	if (!result.sameParty) result.sameParty = false;
	return result;
}
/**
* Gets CDP-specific properties from the cookie, adds CDP-specific prefixes and returns
* them as a new object which can be used in BiDi.
*/
function cdpSpecificCookiePropertiesFromPuppeteerToBidi(cookieParam, ...propertyNames) {
	const result = {};
	for (const property of propertyNames) if (cookieParam[property] !== void 0) result[CDP_SPECIFIC_PREFIX + property] = cookieParam[property];
	return result;
}
function convertCookiesSameSiteBiDiToCdp(sameSite) {
	switch (sameSite) {
		case "strict": return "Strict";
		case "lax": return "Lax";
		case "none": return "None";
		default: return "Default";
	}
}
function convertCookiesSameSiteCdpToBiDi(sameSite) {
	switch (sameSite) {
		case "Strict": return "strict";
		case "Lax": return "lax";
		case "None": return "none";
		default: return "default";
	}
}
function convertCookiesExpiryCdpToBiDi(expiry) {
	return [void 0, -1].includes(expiry) ? void 0 : expiry;
}
function convertCookiesPartitionKeyFromPuppeteerToBiDi(partitionKey) {
	if (partitionKey === void 0 || typeof partitionKey === "string") return partitionKey;
	if (partitionKey.hasCrossSiteAncestor) throw new UnsupportedOperation("WebDriver BiDi does not support `hasCrossSiteAncestor` yet.");
	return partitionKey.sourceOrigin;
}
/**
* @license
* Copyright 2023 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
/**
* @internal
*/
var BidiBrowserTarget = class extends Target {
	#browser;
	constructor(browser) {
		super();
		this.#browser = browser;
	}
	asPage() {
		throw new UnsupportedOperation();
	}
	url() {
		return "";
	}
	createCDPSession() {
		throw new UnsupportedOperation();
	}
	type() {
		return TargetType.BROWSER;
	}
	browser() {
		return this.#browser;
	}
	browserContext() {
		return this.#browser.defaultBrowserContext();
	}
	opener() {
		throw new UnsupportedOperation();
	}
};
/**
* @internal
*/
var BidiPageTarget = class extends Target {
	#page;
	constructor(page) {
		super();
		this.#page = page;
	}
	async page() {
		return this.#page;
	}
	async asPage() {
		return BidiPage.from(this.browserContext(), this.#page.mainFrame().browsingContext);
	}
	url() {
		return this.#page.url();
	}
	createCDPSession() {
		return this.#page.createCDPSession();
	}
	type() {
		return TargetType.PAGE;
	}
	browser() {
		return this.browserContext().browser();
	}
	browserContext() {
		return this.#page.browserContext();
	}
	opener() {
		throw new UnsupportedOperation();
	}
};
/**
* @internal
*/
var BidiFrameTarget = class extends Target {
	#frame;
	#page;
	constructor(frame) {
		super();
		this.#frame = frame;
	}
	async page() {
		if (this.#page === void 0) this.#page = BidiPage.from(this.browserContext(), this.#frame.browsingContext);
		return this.#page;
	}
	async asPage() {
		return BidiPage.from(this.browserContext(), this.#frame.browsingContext);
	}
	url() {
		return this.#frame.url();
	}
	createCDPSession() {
		return this.#frame.createCDPSession();
	}
	type() {
		return TargetType.PAGE;
	}
	browser() {
		return this.browserContext().browser();
	}
	browserContext() {
		return this.#frame.page().browserContext();
	}
	opener() {
		throw new UnsupportedOperation();
	}
};
/**
* @internal
*/
var BidiWorkerTarget = class extends Target {
	#worker;
	constructor(worker) {
		super();
		this.#worker = worker;
	}
	async page() {
		throw new UnsupportedOperation();
	}
	async asPage() {
		throw new UnsupportedOperation();
	}
	url() {
		return this.#worker.url();
	}
	createCDPSession() {
		throw new UnsupportedOperation();
	}
	type() {
		return TargetType.OTHER;
	}
	browser() {
		return this.browserContext().browser();
	}
	browserContext() {
		return this.#worker.frame.page().browserContext();
	}
	opener() {
		throw new UnsupportedOperation();
	}
};
/**
* @license
* Copyright 2022 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __esDecorate$3 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var __runInitializers$3 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __addDisposableResource$1 = function(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
};
var __disposeResources$1 = (function(SuppressedError) {
	return function(env) {
		function fail(e) {
			env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
			env.hasError = true;
		}
		var r, s = 0;
		function next() {
			while (r = env.stack.pop()) try {
				if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
				if (r.dispose) {
					var result = r.dispose.call(r.value);
					if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
						fail(e);
						return next();
					});
				} else s |= 1;
			} catch (e) {
				fail(e);
			}
			if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
			if (env.hasError) throw env.error;
		}
		return next();
	};
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
	var e = new Error(message);
	return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
* @internal
*/
var BidiBrowserContext = (() => {
	let _classSuper = BrowserContext;
	let _trustedEmitter_decorators;
	let _trustedEmitter_initializers = [];
	let _trustedEmitter_extraInitializers = [];
	return class BidiBrowserContext extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_trustedEmitter_decorators = [bubble()];
			__esDecorate$3(this, null, _trustedEmitter_decorators, {
				kind: "accessor",
				name: "trustedEmitter",
				static: false,
				private: false,
				access: {
					has: (obj) => "trustedEmitter" in obj,
					get: (obj) => obj.trustedEmitter,
					set: (obj, value) => {
						obj.trustedEmitter = value;
					}
				},
				metadata: _metadata
			}, _trustedEmitter_initializers, _trustedEmitter_extraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static from(browser, userContext, options) {
			const context = new BidiBrowserContext(browser, userContext, options);
			context.#initialize();
			return context;
		}
		#trustedEmitter_accessor_storage = __runInitializers$3(this, _trustedEmitter_initializers, new EventEmitter());
		get trustedEmitter() {
			return this.#trustedEmitter_accessor_storage;
		}
		set trustedEmitter(value) {
			this.#trustedEmitter_accessor_storage = value;
		}
		#browser = __runInitializers$3(this, _trustedEmitter_extraInitializers);
		#defaultViewport;
		userContext;
		#pages = /* @__PURE__ */ new WeakMap();
		#targets = /* @__PURE__ */ new Map();
		#overrides = [];
		constructor(browser, userContext, options) {
			super();
			this.#browser = browser;
			this.userContext = userContext;
			this.#defaultViewport = options.defaultViewport;
		}
		#initialize() {
			for (const browsingContext of this.userContext.browsingContexts) this.#createPage(browsingContext);
			this.userContext.on("browsingcontext", ({ browsingContext }) => {
				const page = this.#createPage(browsingContext);
				if (browsingContext.originalOpener) {
					for (const context of this.userContext.browsingContexts) if (context.id === browsingContext.originalOpener) this.#pages.get(context).trustedEmitter.emit("popup", page);
				}
			});
			this.userContext.on("closed", () => {
				this.trustedEmitter.removeAllListeners();
			});
		}
		#createPage(browsingContext) {
			const page = BidiPage.from(this, browsingContext);
			this.#pages.set(browsingContext, page);
			page.trustedEmitter.on("close", () => {
				this.#pages.delete(browsingContext);
			});
			const pageTarget = new BidiPageTarget(page);
			const pageTargets = /* @__PURE__ */ new Map();
			this.#targets.set(page, [pageTarget, pageTargets]);
			page.trustedEmitter.on("frameattached", (frame) => {
				const bidiFrame = frame;
				const target = new BidiFrameTarget(bidiFrame);
				pageTargets.set(bidiFrame, target);
				this.trustedEmitter.emit("targetcreated", target);
			});
			page.trustedEmitter.on("framenavigated", (frame) => {
				const bidiFrame = frame;
				const target = pageTargets.get(bidiFrame);
				if (target === void 0) this.trustedEmitter.emit("targetchanged", pageTarget);
				else this.trustedEmitter.emit("targetchanged", target);
			});
			page.trustedEmitter.on("framedetached", (frame) => {
				const bidiFrame = frame;
				const target = pageTargets.get(bidiFrame);
				if (target === void 0) return;
				pageTargets.delete(bidiFrame);
				this.trustedEmitter.emit("targetdestroyed", target);
			});
			page.trustedEmitter.on("workercreated", (worker) => {
				const bidiWorker = worker;
				const target = new BidiWorkerTarget(bidiWorker);
				pageTargets.set(bidiWorker, target);
				this.trustedEmitter.emit("targetcreated", target);
			});
			page.trustedEmitter.on("workerdestroyed", (worker) => {
				const bidiWorker = worker;
				const target = pageTargets.get(bidiWorker);
				if (target === void 0) return;
				pageTargets.delete(worker);
				this.trustedEmitter.emit("targetdestroyed", target);
			});
			page.trustedEmitter.on("close", () => {
				this.#targets.delete(page);
				this.trustedEmitter.emit("targetdestroyed", pageTarget);
			});
			this.trustedEmitter.emit("targetcreated", pageTarget);
			return page;
		}
		targets() {
			return [...this.#targets.values()].flatMap(([target, frames]) => {
				return [target, ...frames.values()];
			});
		}
		async newPage(options) {
			const env_1 = {
				stack: [],
				error: void 0,
				hasError: false
			};
			try {
				__addDisposableResource$1(env_1, await this.waitForScreenshotOperations(), false);
				const type = options?.type === "window" ? "window" : "tab";
				const context = await this.userContext.createBrowsingContext(type, { background: options?.background });
				const page = this.#pages.get(context);
				if (!page) throw new Error("Page is not found");
				if (this.#defaultViewport) try {
					await page.setViewport(this.#defaultViewport);
				} catch (error) {
					debugError(error);
				}
				if (options?.type === "window" && options?.windowBounds !== void 0) try {
					await this.browser().setWindowBounds(context.windowId, options.windowBounds);
				} catch (error) {
					debugError(error);
				}
				return page;
			} catch (e_1) {
				env_1.error = e_1;
				env_1.hasError = true;
			} finally {
				__disposeResources$1(env_1);
			}
		}
		async close() {
			assert(this.userContext.id !== UserContext.DEFAULT, "Default BrowserContext cannot be closed!");
			try {
				await this.userContext.remove();
			} catch (error) {
				debugError(error);
			}
			this.#targets.clear();
		}
		browser() {
			return this.#browser;
		}
		async pages(_includeAll = false) {
			return [...this.userContext.browsingContexts].map((context) => {
				return this.#pages.get(context);
			});
		}
		async overridePermissions(origin, permissions) {
			const permissionsSet = new Set(permissions.map((permission) => {
				if (!WEB_PERMISSION_TO_PROTOCOL_PERMISSION.get(permission)) throw new Error("Unknown permission: " + permission);
				return permission;
			}));
			await Promise.all(Array.from(WEB_PERMISSION_TO_PROTOCOL_PERMISSION.keys()).map((permission) => {
				const result = this.userContext.setPermissions(origin, { name: permission }, permissionsSet.has(permission) ? "granted" : "denied");
				this.#overrides.push({
					origin,
					permission
				});
				if (!permissionsSet.has(permission)) return result.catch(debugError);
				return result;
			}));
		}
		async setPermission(origin, ...permissions) {
			if (origin === "*") throw new UnsupportedOperation("Origin (*) is not supported by WebDriver BiDi");
			await Promise.all(permissions.map((permission) => {
				if (permission.permission.allowWithoutSanitization) throw new UnsupportedOperation("allowWithoutSanitization is not supported by WebDriver BiDi");
				if (permission.permission.panTiltZoom) throw new UnsupportedOperation("panTiltZoom is not supported by WebDriver BiDi");
				if (permission.permission.userVisibleOnly) throw new UnsupportedOperation("userVisibleOnly is not supported by WebDriver BiDi");
				return this.userContext.setPermissions(origin, { name: permission.permission.name }, permission.state);
			}));
		}
		async clearPermissionOverrides() {
			const promises = this.#overrides.map(({ permission, origin }) => {
				return this.userContext.setPermissions(origin, { name: permission }, "prompt").catch(debugError);
			});
			this.#overrides = [];
			await Promise.all(promises);
		}
		get id() {
			if (this.userContext.id === UserContext.DEFAULT) return;
			return this.userContext.id;
		}
		async cookies() {
			return (await this.userContext.getCookies()).map((cookie) => {
				return bidiToPuppeteerCookie(cookie, true);
			});
		}
		async setCookie(...cookies) {
			await Promise.all(cookies.map(async (cookie) => {
				const bidiCookie = {
					domain: cookie.domain,
					name: cookie.name,
					value: {
						type: "string",
						value: cookie.value
					},
					...cookie.path !== void 0 ? { path: cookie.path } : {},
					...cookie.httpOnly !== void 0 ? { httpOnly: cookie.httpOnly } : {},
					...cookie.secure !== void 0 ? { secure: cookie.secure } : {},
					...cookie.sameSite !== void 0 ? { sameSite: convertCookiesSameSiteCdpToBiDi(cookie.sameSite) } : {},
					expiry: convertCookiesExpiryCdpToBiDi(cookie.expires),
					...cdpSpecificCookiePropertiesFromPuppeteerToBidi(cookie, "sameParty", "sourceScheme", "priority", "url")
				};
				return await this.userContext.setCookie(bidiCookie, convertCookiesPartitionKeyFromPuppeteerToBiDi(cookie.partitionKey));
			}));
		}
	};
})();
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$2 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$2 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var __addDisposableResource = function(env, value, async) {
	if (value !== null && value !== void 0) {
		if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
		var dispose, inner;
		if (async) {
			if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
			dispose = value[Symbol.asyncDispose];
		}
		if (dispose === void 0) {
			if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
			dispose = value[Symbol.dispose];
			if (async) inner = dispose;
		}
		if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		env.stack.push({
			value,
			dispose,
			async
		});
	} else if (async) env.stack.push({ async: true });
	return value;
};
var __disposeResources = (function(SuppressedError) {
	return function(env) {
		function fail(e) {
			env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
			env.hasError = true;
		}
		var r, s = 0;
		function next() {
			while (r = env.stack.pop()) try {
				if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
				if (r.dispose) {
					var result = r.dispose.call(r.value);
					if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
						fail(e);
						return next();
					});
				} else s |= 1;
			} catch (e) {
				fail(e);
			}
			if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
			if (env.hasError) throw env.error;
		}
		return next();
	};
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
	var e = new Error(message);
	return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
* @internal
*/
var Browser = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _dispose_decorators;
	let _close_decorators;
	let _addPreloadScript_decorators;
	let _removeIntercept_decorators;
	let _removePreloadScript_decorators;
	let _createUserContext_decorators;
	let _installExtension_decorators;
	let _uninstallExtension_decorators;
	let _setClientWindowState_decorators;
	let _getClientWindowInfo_decorators;
	return class Browser extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			__esDecorate$2(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _close_decorators, {
				kind: "method",
				name: "close",
				static: false,
				private: false,
				access: {
					has: (obj) => "close" in obj,
					get: (obj) => obj.close
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _addPreloadScript_decorators, {
				kind: "method",
				name: "addPreloadScript",
				static: false,
				private: false,
				access: {
					has: (obj) => "addPreloadScript" in obj,
					get: (obj) => obj.addPreloadScript
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _removeIntercept_decorators, {
				kind: "method",
				name: "removeIntercept",
				static: false,
				private: false,
				access: {
					has: (obj) => "removeIntercept" in obj,
					get: (obj) => obj.removeIntercept
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _removePreloadScript_decorators, {
				kind: "method",
				name: "removePreloadScript",
				static: false,
				private: false,
				access: {
					has: (obj) => "removePreloadScript" in obj,
					get: (obj) => obj.removePreloadScript
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _createUserContext_decorators, {
				kind: "method",
				name: "createUserContext",
				static: false,
				private: false,
				access: {
					has: (obj) => "createUserContext" in obj,
					get: (obj) => obj.createUserContext
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _installExtension_decorators, {
				kind: "method",
				name: "installExtension",
				static: false,
				private: false,
				access: {
					has: (obj) => "installExtension" in obj,
					get: (obj) => obj.installExtension
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _uninstallExtension_decorators, {
				kind: "method",
				name: "uninstallExtension",
				static: false,
				private: false,
				access: {
					has: (obj) => "uninstallExtension" in obj,
					get: (obj) => obj.uninstallExtension
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _setClientWindowState_decorators, {
				kind: "method",
				name: "setClientWindowState",
				static: false,
				private: false,
				access: {
					has: (obj) => "setClientWindowState" in obj,
					get: (obj) => obj.setClientWindowState
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$2(this, null, _getClientWindowInfo_decorators, {
				kind: "method",
				name: "getClientWindowInfo",
				static: false,
				private: false,
				access: {
					has: (obj) => "getClientWindowInfo" in obj,
					get: (obj) => obj.getClientWindowInfo
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static async from(session) {
			const browser = new Browser(session);
			await browser.#initialize();
			return browser;
		}
		#closed = (__runInitializers$2(this, _instanceExtraInitializers), false);
		#reason;
		#disposables = new DisposableStack();
		#userContexts = /* @__PURE__ */ new Map();
		session;
		#sharedWorkers = /* @__PURE__ */ new Map();
		constructor(session) {
			super();
			this.session = session;
		}
		async #initialize() {
			const sessionEmitter = this.#disposables.use(new EventEmitter(this.session));
			sessionEmitter.once("ended", ({ reason }) => {
				this.dispose(reason);
			});
			sessionEmitter.on("script.realmCreated", (info) => {
				if (info.type !== "shared-worker") return;
				this.#sharedWorkers.set(info.realm, SharedWorkerRealm.from(this, info.realm, info.origin));
			});
			await this.#syncUserContexts();
			await this.#syncBrowsingContexts();
		}
		async #syncUserContexts() {
			const { result: { userContexts } } = await this.session.send("browser.getUserContexts", {});
			for (const context of userContexts) this.#createUserContext(context.userContext);
		}
		async #syncBrowsingContexts() {
			const contextIds = /* @__PURE__ */ new Set();
			let contexts;
			{
				const env_1 = {
					stack: [],
					error: void 0,
					hasError: false
				};
				try {
					__addDisposableResource(env_1, new EventEmitter(this.session), false).on("browsingContext.contextCreated", (info) => {
						contextIds.add(info.context);
					});
					const { result } = await this.session.send("browsingContext.getTree", {});
					contexts = result.contexts;
				} catch (e_1) {
					env_1.error = e_1;
					env_1.hasError = true;
				} finally {
					__disposeResources(env_1);
				}
			}
			for (const info of contexts) {
				if (!contextIds.has(info.context)) this.session.emit("browsingContext.contextCreated", info);
				if (info.children) contexts.push(...info.children);
			}
		}
		#createUserContext(id) {
			const userContext = UserContext.create(this, id);
			this.#userContexts.set(userContext.id, userContext);
			const userContextEmitter = this.#disposables.use(new EventEmitter(userContext));
			userContextEmitter.once("closed", () => {
				userContextEmitter.removeAllListeners();
				this.#userContexts.delete(userContext.id);
			});
			return userContext;
		}
		get closed() {
			return this.#closed;
		}
		get defaultUserContext() {
			return this.#userContexts.get(UserContext.DEFAULT);
		}
		get disconnected() {
			return this.#reason !== void 0;
		}
		get disposed() {
			return this.disconnected;
		}
		get userContexts() {
			return this.#userContexts.values();
		}
		dispose(reason, closed = false) {
			this.#closed = closed;
			this.#reason = reason;
			this[disposeSymbol]();
		}
		async close() {
			try {
				await this.session.send("browser.close", {});
			} finally {
				this.dispose("Browser already closed.", true);
			}
		}
		async addPreloadScript(functionDeclaration, options = {}) {
			const { result: { script } } = await this.session.send("script.addPreloadScript", {
				functionDeclaration,
				...options,
				contexts: options.contexts?.map((context) => {
					return context.id;
				})
			});
			return script;
		}
		async removeIntercept(intercept) {
			await this.session.send("network.removeIntercept", { intercept });
		}
		async removePreloadScript(script) {
			await this.session.send("script.removePreloadScript", { script });
		}
		async createUserContext(options) {
			const proxyConfig = options.proxyServer === void 0 ? void 0 : {
				proxyType: "manual",
				httpProxy: options.proxyServer,
				sslProxy: options.proxyServer,
				noProxy: options.proxyBypassList
			};
			const { result: { userContext } } = await this.session.send("browser.createUserContext", { proxy: proxyConfig });
			if (options.downloadBehavior?.policy === "allowAndName") throw new UnsupportedOperation("`allowAndName` is not supported in WebDriver BiDi");
			if (options.downloadBehavior?.policy === "allow") {
				if (options.downloadBehavior.downloadPath === void 0) throw new UnsupportedOperation("`downloadPath` is required in `allow` download behavior");
				await this.session.send("browser.setDownloadBehavior", {
					downloadBehavior: {
						type: "allowed",
						destinationFolder: options.downloadBehavior.downloadPath
					},
					userContexts: [userContext]
				});
			}
			if (options.downloadBehavior?.policy === "deny") await this.session.send("browser.setDownloadBehavior", {
				downloadBehavior: { type: "denied" },
				userContexts: [userContext]
			});
			return this.#createUserContext(userContext);
		}
		async installExtension(path) {
			const { result: { extension } } = await this.session.send("webExtension.install", { extensionData: {
				type: "path",
				path
			} });
			return extension;
		}
		async uninstallExtension(id) {
			await this.session.send("webExtension.uninstall", { extension: id });
		}
		async setClientWindowState(params) {
			await this.session.send("browser.setClientWindowState", params);
		}
		async getClientWindowInfo(windowId) {
			const { result: { clientWindows } } = await this.session.send("browser.getClientWindows", {});
			const window = clientWindows.find((window) => {
				return window.clientWindow === windowId;
			});
			if (!window) throw new Error("Window not found");
			return window;
		}
		[(_dispose_decorators = [inertIfDisposed], _close_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _addPreloadScript_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _removeIntercept_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _removePreloadScript_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _createUserContext_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _installExtension_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _uninstallExtension_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _setClientWindowState_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], _getClientWindowInfo_decorators = [throwIfDisposed((browser) => {
			return browser.#reason;
		})], disposeSymbol)]() {
			this.#reason ??= "Browser was disconnected, probably because the session ended.";
			if (this.closed) this.emit("closed", { reason: this.#reason });
			this.emit("disconnected", { reason: this.#reason });
			this.#disposables.dispose();
			super[disposeSymbol]();
		}
	};
})();
/**
* @license
* Copyright 2024 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __runInitializers$1 = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate$1 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
/**
* @internal
*/
var Session = (() => {
	let _classSuper = EventEmitter;
	let _instanceExtraInitializers = [];
	let _connection_decorators;
	let _connection_initializers = [];
	let _connection_extraInitializers = [];
	let _dispose_decorators;
	let _send_decorators;
	let _subscribe_decorators;
	let _addIntercepts_decorators;
	let _end_decorators;
	return class Session extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			__esDecorate$1(this, null, _connection_decorators, {
				kind: "accessor",
				name: "connection",
				static: false,
				private: false,
				access: {
					has: (obj) => "connection" in obj,
					get: (obj) => obj.connection,
					set: (obj, value) => {
						obj.connection = value;
					}
				},
				metadata: _metadata
			}, _connection_initializers, _connection_extraInitializers);
			__esDecorate$1(this, null, _dispose_decorators, {
				kind: "method",
				name: "dispose",
				static: false,
				private: false,
				access: {
					has: (obj) => "dispose" in obj,
					get: (obj) => obj.dispose
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _send_decorators, {
				kind: "method",
				name: "send",
				static: false,
				private: false,
				access: {
					has: (obj) => "send" in obj,
					get: (obj) => obj.send
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _subscribe_decorators, {
				kind: "method",
				name: "subscribe",
				static: false,
				private: false,
				access: {
					has: (obj) => "subscribe" in obj,
					get: (obj) => obj.subscribe
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _addIntercepts_decorators, {
				kind: "method",
				name: "addIntercepts",
				static: false,
				private: false,
				access: {
					has: (obj) => "addIntercepts" in obj,
					get: (obj) => obj.addIntercepts
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate$1(this, null, _end_decorators, {
				kind: "method",
				name: "end",
				static: false,
				private: false,
				access: {
					has: (obj) => "end" in obj,
					get: (obj) => obj.end
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static async from(connection, capabilities) {
			const { result } = await connection.send("session.new", { capabilities });
			const session = new Session(connection, result);
			await session.#initialize();
			return session;
		}
		#reason = __runInitializers$1(this, _instanceExtraInitializers);
		#disposables = new DisposableStack();
		#info;
		browser;
		#connection_accessor_storage = __runInitializers$1(this, _connection_initializers, void 0);
		get connection() {
			return this.#connection_accessor_storage;
		}
		set connection(value) {
			this.#connection_accessor_storage = value;
		}
		constructor(connection, info) {
			super();
			__runInitializers$1(this, _connection_extraInitializers);
			this.#info = info;
			this.connection = connection;
		}
		async #initialize() {
			this.browser = await Browser.from(this);
			this.#disposables.use(this.browser).once("closed", ({ reason }) => {
				this.dispose(reason);
			});
			const seen = /* @__PURE__ */ new WeakSet();
			this.on("browsingContext.fragmentNavigated", (info) => {
				if (seen.has(info)) return;
				seen.add(info);
				this.emit("browsingContext.navigationStarted", info);
				this.emit("browsingContext.fragmentNavigated", info);
			});
		}
		get capabilities() {
			return this.#info.capabilities;
		}
		get disposed() {
			return this.ended;
		}
		get ended() {
			return this.#reason !== void 0;
		}
		get id() {
			return this.#info.sessionId;
		}
		dispose(reason) {
			this.#reason = reason;
			this[disposeSymbol]();
		}
		/**
		* Currently, there is a 1:1 relationship between the session and the
		* session. In the future, we might support multiple sessions and in that
		* case we always needs to make sure that the session for the right session
		* object is used, so we implement this method here, although it's not defined
		* in the spec.
		*/
		async send(method, params) {
			return await this.connection.send(method, params);
		}
		async subscribe(events, contexts) {
			await this.send("session.subscribe", {
				events,
				contexts
			});
		}
		async addIntercepts(events, contexts) {
			await this.send("session.subscribe", {
				events,
				contexts
			});
		}
		async end() {
			try {
				await this.send("session.end", {});
			} finally {
				this.dispose(`Session already ended.`);
			}
		}
		[(_connection_decorators = [bubble()], _dispose_decorators = [inertIfDisposed], _send_decorators = [throwIfDisposed((session) => {
			return session.#reason;
		})], _subscribe_decorators = [throwIfDisposed((session) => {
			return session.#reason;
		})], _addIntercepts_decorators = [throwIfDisposed((session) => {
			return session.#reason;
		})], _end_decorators = [throwIfDisposed((session) => {
			return session.#reason;
		})], disposeSymbol)]() {
			this.#reason ??= "Session already destroyed, probably because the connection broke.";
			this.emit("ended", { reason: this.#reason });
			this.#disposables.dispose();
			super[disposeSymbol]();
		}
	};
})();
/**
* @license
* Copyright 2022 Google Inc.
* SPDX-License-Identifier: Apache-2.0
*/
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
var __runInitializers = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __setFunctionName = function(f, name, prefix) {
	if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
	return Object.defineProperty(f, "name", {
		configurable: true,
		value: prefix ? "".concat(prefix, " ", name) : name
	});
};
/**
* @internal
*/
var BidiBrowser = (() => {
	let _classSuper = Browser$1;
	let _private_trustedEmitter_decorators;
	let _private_trustedEmitter_initializers = [];
	let _private_trustedEmitter_extraInitializers = [];
	let _private_trustedEmitter_descriptor;
	return class BidiBrowser extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_private_trustedEmitter_decorators = [bubble()];
			__esDecorate(this, _private_trustedEmitter_descriptor = {
				get: __setFunctionName(function() {
					return this.#trustedEmitter_accessor_storage;
				}, "#trustedEmitter", "get"),
				set: __setFunctionName(function(value) {
					this.#trustedEmitter_accessor_storage = value;
				}, "#trustedEmitter", "set")
			}, _private_trustedEmitter_decorators, {
				kind: "accessor",
				name: "#trustedEmitter",
				static: false,
				private: true,
				access: {
					has: (obj) => #trustedEmitter in obj,
					get: (obj) => obj.#trustedEmitter,
					set: (obj, value) => {
						obj.#trustedEmitter = value;
					}
				},
				metadata: _metadata
			}, _private_trustedEmitter_initializers, _private_trustedEmitter_extraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		protocol = "webDriverBiDi";
		static subscribeModules = [
			"browsingContext",
			"network",
			"log",
			"script",
			"input"
		];
		static subscribeCdpEvents = [
			"goog:cdp.Debugger.scriptParsed",
			"goog:cdp.CSS.styleSheetAdded",
			"goog:cdp.Runtime.executionContextsCleared",
			"goog:cdp.Tracing.tracingComplete",
			"goog:cdp.Network.requestWillBeSent",
			"goog:cdp.Debugger.scriptParsed",
			"goog:cdp.Page.screencastFrame"
		];
		static async create(opts) {
			const session = await Session.from(opts.connection, {
				firstMatch: opts.capabilities?.firstMatch,
				alwaysMatch: {
					...opts.capabilities?.alwaysMatch,
					acceptInsecureCerts: opts.acceptInsecureCerts,
					unhandledPromptBehavior: { default: "ignore" },
					webSocketUrl: true,
					"goog:prerenderingDisabled": true,
					"goog:disableNetworkDurableMessages": true
				}
			});
			await session.subscribe((opts.cdpConnection ? [...BidiBrowser.subscribeModules, ...BidiBrowser.subscribeCdpEvents] : BidiBrowser.subscribeModules).filter((module) => {
				if (!opts.networkEnabled) return module !== "network" && module !== "goog:cdp.Network.requestWillBeSent";
				return true;
			}));
			await Promise.all(["request", "response"].map(async (dataType) => {
				try {
					await session.send("network.addDataCollector", {
						dataTypes: [dataType],
						maxEncodedDataSize: 2e7
					});
				} catch (err) {
					if (err instanceof ProtocolError) debugError(err);
					else throw err;
				}
			}));
			const browser = new BidiBrowser(session.browser, opts);
			browser.#initialize();
			return browser;
		}
		#trustedEmitter_accessor_storage = __runInitializers(this, _private_trustedEmitter_initializers, new EventEmitter());
		get #trustedEmitter() {
			return _private_trustedEmitter_descriptor.get.call(this);
		}
		set #trustedEmitter(value) {
			return _private_trustedEmitter_descriptor.set.call(this, value);
		}
		#process = __runInitializers(this, _private_trustedEmitter_extraInitializers);
		#closeCallback;
		#browserCore;
		#defaultViewport;
		#browserContexts = /* @__PURE__ */ new WeakMap();
		#target = new BidiBrowserTarget(this);
		#cdpConnection;
		#networkEnabled;
		constructor(browserCore, opts) {
			super();
			this.#process = opts.process;
			this.#closeCallback = opts.closeCallback;
			this.#browserCore = browserCore;
			this.#defaultViewport = opts.defaultViewport;
			this.#cdpConnection = opts.cdpConnection;
			this.#networkEnabled = opts.networkEnabled;
		}
		#initialize() {
			for (const userContext of this.#browserCore.userContexts) this.#createBrowserContext(userContext);
			this.#browserCore.once("disconnected", () => {
				this.#trustedEmitter.emit("disconnected", void 0);
				this.#trustedEmitter.removeAllListeners();
			});
			this.#process?.once("close", () => {
				this.#browserCore.dispose("Browser process exited.", true);
				this.connection.dispose();
			});
		}
		get #browserName() {
			return this.#browserCore.session.capabilities.browserName;
		}
		get #browserVersion() {
			return this.#browserCore.session.capabilities.browserVersion;
		}
		get cdpSupported() {
			return this.#cdpConnection !== void 0;
		}
		get cdpConnection() {
			return this.#cdpConnection;
		}
		async userAgent() {
			return this.#browserCore.session.capabilities.userAgent;
		}
		#createBrowserContext(userContext) {
			const browserContext = BidiBrowserContext.from(this, userContext, { defaultViewport: this.#defaultViewport });
			this.#browserContexts.set(userContext, browserContext);
			browserContext.trustedEmitter.on("targetcreated", (target) => {
				this.#trustedEmitter.emit("targetcreated", target);
			});
			browserContext.trustedEmitter.on("targetchanged", (target) => {
				this.#trustedEmitter.emit("targetchanged", target);
			});
			browserContext.trustedEmitter.on("targetdestroyed", (target) => {
				this.#trustedEmitter.emit("targetdestroyed", target);
			});
			return browserContext;
		}
		get connection() {
			return this.#browserCore.session.connection;
		}
		wsEndpoint() {
			return this.connection.url;
		}
		async close() {
			if (this.connection.closed) return;
			try {
				await this.#browserCore.close();
				await this.#closeCallback?.call(null);
			} catch (error) {
				debugError(error);
			} finally {
				this.connection.dispose();
			}
		}
		get connected() {
			return !this.#browserCore.disconnected;
		}
		process() {
			return this.#process ?? null;
		}
		async createBrowserContext(options = {}) {
			const userContext = await this.#browserCore.createUserContext(options);
			return this.#createBrowserContext(userContext);
		}
		async version() {
			return `${this.#browserName}/${this.#browserVersion}`;
		}
		browserContexts() {
			return [...this.#browserCore.userContexts].map((context) => {
				return this.#browserContexts.get(context);
			});
		}
		defaultBrowserContext() {
			return this.#browserContexts.get(this.#browserCore.defaultUserContext);
		}
		newPage(options) {
			return this.defaultBrowserContext().newPage(options);
		}
		installExtension(path) {
			return this.#browserCore.installExtension(path);
		}
		async uninstallExtension(id) {
			await this.#browserCore.uninstallExtension(id);
		}
		screens() {
			throw new UnsupportedOperation();
		}
		addScreen(_params) {
			throw new UnsupportedOperation();
		}
		removeScreen(_screenId) {
			throw new UnsupportedOperation();
		}
		async getWindowBounds(windowId) {
			const clientWindowInfo = await this.#browserCore.getClientWindowInfo(windowId);
			return {
				left: clientWindowInfo.x,
				top: clientWindowInfo.y,
				width: clientWindowInfo.width,
				height: clientWindowInfo.height,
				windowState: clientWindowInfo.state
			};
		}
		async setWindowBounds(windowId, windowBounds) {
			let params;
			const windowState = windowBounds.windowState ?? "normal";
			if (windowState === "normal") params = {
				clientWindow: windowId,
				state: "normal",
				x: windowBounds.left,
				y: windowBounds.top,
				width: windowBounds.width,
				height: windowBounds.height
			};
			else params = {
				clientWindow: windowId,
				state: windowState
			};
			await this.#browserCore.setClientWindowState(params);
		}
		targets() {
			return [this.#target, ...this.browserContexts().flatMap((context) => {
				return context.targets();
			})];
		}
		target() {
			return this.#target;
		}
		async disconnect() {
			try {
				await this.#browserCore.session.end();
			} catch (error) {
				debugError(error);
			} finally {
				this.connection.dispose();
			}
		}
		get debugInfo() {
			return { pendingProtocolErrors: this.connection.getPendingProtocolErrors() };
		}
		isNetworkEnabled() {
			return this.#networkEnabled;
		}
	};
})();
export { BrowserWebSocketTransport as C, BidiConnection as S, requests as _, cdpSpecificCookiePropertiesFromPuppeteerToBidi as a, BidiJSHandle as b, convertCookiesSameSiteCdpToBiDi as c, BidiTouchscreen as d, BidiFrame as f, BidiHTTPRequest as g, BidiWorkerRealm as h, bidiToPuppeteerCookie as i, BidiKeyboard as l, BidiRealm as m, BidiBrowserContext as n, convertCookiesExpiryCdpToBiDi as o, BidiFrameRealm as p, BidiPage as r, convertCookiesPartitionKeyFromPuppeteerToBiDi as s, BidiBrowser as t, BidiMouse as u, BidiHTTPResponse as v, connectBidiOverCdp as x, BidiElementHandle as y };

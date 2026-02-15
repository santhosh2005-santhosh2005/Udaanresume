import { a as __require, t as __commonJSMin } from "../_runtime.mjs";
var require_mitt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(n) {
		return {
			all: n = n || /* @__PURE__ */ new Map(),
			on: function(e, t) {
				var i = n.get(e);
				i ? i.push(t) : n.set(e, [t]);
			},
			off: function(e, t) {
				var i = n.get(e);
				i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : n.set(e, []));
			},
			emit: function(e, t) {
				var i = n.get(e);
				i && i.slice().map(function(n) {
					n(t);
				}), (i = n.get("*")) && i.slice().map(function(n) {
					n(e, t);
				});
			}
		};
	};
}));
var require_EventEmitter = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventEmitter = void 0;
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	var mitt_1 = __importDefault(require_mitt());
	var EventEmitter = class {
		#emitter = (0, mitt_1.default)();
		on(type, handler) {
			this.#emitter.on(type, handler);
			return this;
		}
		/**
		* Like `on` but the listener will only be fired once and then it will be removed.
		* @param event The event you'd like to listen to
		* @param handler The handler function to run when the event occurs
		* @return `this` to enable chaining method calls.
		*/
		once(event, handler) {
			const onceHandler = (eventData) => {
				handler(eventData);
				this.off(event, onceHandler);
			};
			return this.on(event, onceHandler);
		}
		off(type, handler) {
			this.#emitter.off(type, handler);
			return this;
		}
		/**
		* Emits an event and call any associated listeners.
		*
		* @param event The event to emit.
		* @param eventData Any data to emit with the event.
		* @return `true` if there are any listeners, `false` otherwise.
		*/
		emit(event, eventData) {
			this.#emitter.emit(event, eventData);
		}
		/**
		* Removes all listeners. If given an event argument, it will remove only
		* listeners for that event.
		* @param event - the event to remove listeners for.
		* @returns `this` to enable you to chain method calls.
		*/
		removeAllListeners(event) {
			if (event) this.#emitter.all.delete(event);
			else this.#emitter.all.clear();
			return this;
		}
	};
	exports.EventEmitter = EventEmitter;
}));
var require_log = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2021 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LogType = void 0;
	var LogType;
	(function(LogType) {
		LogType["bidi"] = "bidi";
		LogType["cdp"] = "cdp";
		LogType["debug"] = "debug";
		LogType["debugError"] = "debug:error";
		LogType["debugInfo"] = "debug:info";
		LogType["debugWarn"] = "debug:warn";
	})(LogType || (exports.LogType = LogType = {}));
}));
var require_ProcessingQueue = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProcessingQueue = void 0;
	var log_js_1 = require_log();
	var ProcessingQueue = class {
		static LOGGER_PREFIX = `${log_js_1.LogType.debug}:queue`;
		#logger;
		#processor;
		#queue = [];
		#isProcessing = false;
		constructor(processor, logger) {
			this.#processor = processor;
			this.#logger = logger;
		}
		add(entry, name) {
			this.#queue.push([entry, name]);
			this.#processIfNeeded();
		}
		async #processIfNeeded() {
			if (this.#isProcessing) return;
			this.#isProcessing = true;
			while (this.#queue.length > 0) {
				const arrayEntry = this.#queue.shift();
				if (!arrayEntry) continue;
				const [entryPromise, name] = arrayEntry;
				this.#logger?.(_a.LOGGER_PREFIX, "Processing event:", name);
				await entryPromise.then((entry) => {
					if (entry.kind === "error") {
						this.#logger?.(log_js_1.LogType.debugError, "Event threw before sending:", entry.error.message, entry.error.stack);
						return;
					}
					return this.#processor(entry.value);
				}).catch((error) => {
					this.#logger?.(log_js_1.LogType.debugError, "Event was not processed:", error?.message);
				});
			}
			this.#isProcessing = false;
		}
	};
	exports.ProcessingQueue = ProcessingQueue;
	_a = ProcessingQueue;
}));
var require_cdp = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
}));
var require_chromium_bidi = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EVENT_NAMES = exports.Speculation = exports.Bluetooth = exports.Network = exports.Input = exports.BrowsingContext = exports.Log = exports.Script = exports.BiDiModule = void 0;
	var BiDiModule;
	(function(BiDiModule) {
		BiDiModule["Bluetooth"] = "bluetooth";
		BiDiModule["Browser"] = "browser";
		BiDiModule["BrowsingContext"] = "browsingContext";
		BiDiModule["Cdp"] = "goog:cdp";
		BiDiModule["Input"] = "input";
		BiDiModule["Log"] = "log";
		BiDiModule["Network"] = "network";
		BiDiModule["Script"] = "script";
		BiDiModule["Session"] = "session";
		BiDiModule["Speculation"] = "speculation";
	})(BiDiModule || (exports.BiDiModule = BiDiModule = {}));
	var Script;
	(function(Script) {
		(function(EventNames) {
			EventNames["Message"] = "script.message";
			EventNames["RealmCreated"] = "script.realmCreated";
			EventNames["RealmDestroyed"] = "script.realmDestroyed";
		})(Script.EventNames || (Script.EventNames = {}));
	})(Script || (exports.Script = Script = {}));
	var Log;
	(function(Log) {
		(function(EventNames) {
			EventNames["LogEntryAdded"] = "log.entryAdded";
		})(Log.EventNames || (Log.EventNames = {}));
	})(Log || (exports.Log = Log = {}));
	var BrowsingContext;
	(function(BrowsingContext) {
		(function(EventNames) {
			EventNames["ContextCreated"] = "browsingContext.contextCreated";
			EventNames["ContextDestroyed"] = "browsingContext.contextDestroyed";
			EventNames["DomContentLoaded"] = "browsingContext.domContentLoaded";
			EventNames["DownloadEnd"] = "browsingContext.downloadEnd";
			EventNames["DownloadWillBegin"] = "browsingContext.downloadWillBegin";
			EventNames["FragmentNavigated"] = "browsingContext.fragmentNavigated";
			EventNames["HistoryUpdated"] = "browsingContext.historyUpdated";
			EventNames["Load"] = "browsingContext.load";
			EventNames["NavigationAborted"] = "browsingContext.navigationAborted";
			EventNames["NavigationCommitted"] = "browsingContext.navigationCommitted";
			EventNames["NavigationFailed"] = "browsingContext.navigationFailed";
			EventNames["NavigationStarted"] = "browsingContext.navigationStarted";
			EventNames["UserPromptClosed"] = "browsingContext.userPromptClosed";
			EventNames["UserPromptOpened"] = "browsingContext.userPromptOpened";
		})(BrowsingContext.EventNames || (BrowsingContext.EventNames = {}));
	})(BrowsingContext || (exports.BrowsingContext = BrowsingContext = {}));
	var Input;
	(function(Input) {
		(function(EventNames) {
			EventNames["FileDialogOpened"] = "input.fileDialogOpened";
		})(Input.EventNames || (Input.EventNames = {}));
	})(Input || (exports.Input = Input = {}));
	var Network;
	(function(Network) {
		(function(EventNames) {
			EventNames["AuthRequired"] = "network.authRequired";
			EventNames["BeforeRequestSent"] = "network.beforeRequestSent";
			EventNames["FetchError"] = "network.fetchError";
			EventNames["ResponseCompleted"] = "network.responseCompleted";
			EventNames["ResponseStarted"] = "network.responseStarted";
		})(Network.EventNames || (Network.EventNames = {}));
	})(Network || (exports.Network = Network = {}));
	var Bluetooth;
	(function(Bluetooth) {
		(function(EventNames) {
			EventNames["RequestDevicePromptUpdated"] = "bluetooth.requestDevicePromptUpdated";
			EventNames["GattConnectionAttempted"] = "bluetooth.gattConnectionAttempted";
			EventNames["CharacteristicEventGenerated"] = "bluetooth.characteristicEventGenerated";
			EventNames["DescriptorEventGenerated"] = "bluetooth.descriptorEventGenerated";
		})(Bluetooth.EventNames || (Bluetooth.EventNames = {}));
	})(Bluetooth || (exports.Bluetooth = Bluetooth = {}));
	var Speculation;
	(function(Speculation) {
		(function(EventNames) {
			EventNames["PrefetchStatusUpdated"] = "speculation.prefetchStatusUpdated";
		})(Speculation.EventNames || (Speculation.EventNames = {}));
	})(Speculation || (exports.Speculation = Speculation = {}));
	exports.EVENT_NAMES = new Set([
		...Object.values(BiDiModule),
		...Object.values(Bluetooth.EventNames),
		...Object.values(BrowsingContext.EventNames),
		...Object.values(Input.EventNames),
		...Object.values(Log.EventNames),
		...Object.values(Network.EventNames),
		...Object.values(Script.EventNames),
		...Object.values(Speculation.EventNames)
	]);
}));
var require_webdriver_bidi = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
}));
var require_ErrorResponse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UnavailableNetworkDataException = exports.NoSuchNetworkDataException = exports.NoSuchNetworkCollectorException = exports.NoSuchWebExtensionException = exports.InvalidWebExtensionException = exports.UnderspecifiedStoragePartitionException = exports.UnableToSetFileInputException = exports.UnableToSetCookieException = exports.NoSuchStoragePartitionException = exports.UnsupportedOperationException = exports.UnableToCloseBrowserException = exports.UnableToCaptureScreenException = exports.UnknownErrorException = exports.UnknownCommandException = exports.SessionNotCreatedException = exports.NoSuchUserContextException = exports.NoSuchScriptException = exports.NoSuchRequestException = exports.NoSuchNodeException = exports.NoSuchInterceptException = exports.NoSuchHistoryEntryException = exports.NoSuchHandleException = exports.NoSuchFrameException = exports.NoSuchElementException = exports.NoSuchAlertException = exports.MoveTargetOutOfBoundsException = exports.InvalidSessionIdException = exports.InvalidSelectorException = exports.InvalidArgumentException = exports.Exception = void 0;
	var Exception = class extends Error {
		error;
		message;
		stacktrace;
		constructor(error, message, stacktrace) {
			super();
			this.error = error;
			this.message = message;
			this.stacktrace = stacktrace;
		}
		toErrorResponse(commandId) {
			return {
				type: "error",
				id: commandId,
				error: this.error,
				message: this.message,
				stacktrace: this.stacktrace
			};
		}
	};
	exports.Exception = Exception;
	var InvalidArgumentException = class extends Exception {
		constructor(message, stacktrace) {
			super("invalid argument", message, stacktrace);
		}
	};
	exports.InvalidArgumentException = InvalidArgumentException;
	var InvalidSelectorException = class extends Exception {
		constructor(message, stacktrace) {
			super("invalid selector", message, stacktrace);
		}
	};
	exports.InvalidSelectorException = InvalidSelectorException;
	var InvalidSessionIdException = class extends Exception {
		constructor(message, stacktrace) {
			super("invalid session id", message, stacktrace);
		}
	};
	exports.InvalidSessionIdException = InvalidSessionIdException;
	var MoveTargetOutOfBoundsException = class extends Exception {
		constructor(message, stacktrace) {
			super("move target out of bounds", message, stacktrace);
		}
	};
	exports.MoveTargetOutOfBoundsException = MoveTargetOutOfBoundsException;
	var NoSuchAlertException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such alert", message, stacktrace);
		}
	};
	exports.NoSuchAlertException = NoSuchAlertException;
	var NoSuchElementException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such element", message, stacktrace);
		}
	};
	exports.NoSuchElementException = NoSuchElementException;
	var NoSuchFrameException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such frame", message, stacktrace);
		}
	};
	exports.NoSuchFrameException = NoSuchFrameException;
	var NoSuchHandleException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such handle", message, stacktrace);
		}
	};
	exports.NoSuchHandleException = NoSuchHandleException;
	var NoSuchHistoryEntryException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such history entry", message, stacktrace);
		}
	};
	exports.NoSuchHistoryEntryException = NoSuchHistoryEntryException;
	var NoSuchInterceptException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such intercept", message, stacktrace);
		}
	};
	exports.NoSuchInterceptException = NoSuchInterceptException;
	var NoSuchNodeException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such node", message, stacktrace);
		}
	};
	exports.NoSuchNodeException = NoSuchNodeException;
	var NoSuchRequestException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such request", message, stacktrace);
		}
	};
	exports.NoSuchRequestException = NoSuchRequestException;
	var NoSuchScriptException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such script", message, stacktrace);
		}
	};
	exports.NoSuchScriptException = NoSuchScriptException;
	var NoSuchUserContextException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such user context", message, stacktrace);
		}
	};
	exports.NoSuchUserContextException = NoSuchUserContextException;
	var SessionNotCreatedException = class extends Exception {
		constructor(message, stacktrace) {
			super("session not created", message, stacktrace);
		}
	};
	exports.SessionNotCreatedException = SessionNotCreatedException;
	var UnknownCommandException = class extends Exception {
		constructor(message, stacktrace) {
			super("unknown command", message, stacktrace);
		}
	};
	exports.UnknownCommandException = UnknownCommandException;
	var UnknownErrorException = class extends Exception {
		constructor(message, stacktrace = (/* @__PURE__ */ new Error()).stack) {
			super("unknown error", message, stacktrace);
		}
	};
	exports.UnknownErrorException = UnknownErrorException;
	var UnableToCaptureScreenException = class extends Exception {
		constructor(message, stacktrace) {
			super("unable to capture screen", message, stacktrace);
		}
	};
	exports.UnableToCaptureScreenException = UnableToCaptureScreenException;
	var UnableToCloseBrowserException = class extends Exception {
		constructor(message, stacktrace) {
			super("unable to close browser", message, stacktrace);
		}
	};
	exports.UnableToCloseBrowserException = UnableToCloseBrowserException;
	var UnsupportedOperationException = class extends Exception {
		constructor(message, stacktrace) {
			super("unsupported operation", message, stacktrace);
		}
	};
	exports.UnsupportedOperationException = UnsupportedOperationException;
	var NoSuchStoragePartitionException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such storage partition", message, stacktrace);
		}
	};
	exports.NoSuchStoragePartitionException = NoSuchStoragePartitionException;
	var UnableToSetCookieException = class extends Exception {
		constructor(message, stacktrace) {
			super("unable to set cookie", message, stacktrace);
		}
	};
	exports.UnableToSetCookieException = UnableToSetCookieException;
	var UnableToSetFileInputException = class extends Exception {
		constructor(message, stacktrace) {
			super("unable to set file input", message, stacktrace);
		}
	};
	exports.UnableToSetFileInputException = UnableToSetFileInputException;
	var UnderspecifiedStoragePartitionException = class extends Exception {
		constructor(message, stacktrace) {
			super("underspecified storage partition", message, stacktrace);
		}
	};
	exports.UnderspecifiedStoragePartitionException = UnderspecifiedStoragePartitionException;
	var InvalidWebExtensionException = class extends Exception {
		constructor(message, stacktrace) {
			super("invalid web extension", message, stacktrace);
		}
	};
	exports.InvalidWebExtensionException = InvalidWebExtensionException;
	var NoSuchWebExtensionException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such web extension", message, stacktrace);
		}
	};
	exports.NoSuchWebExtensionException = NoSuchWebExtensionException;
	var NoSuchNetworkCollectorException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such network collector", message, stacktrace);
		}
	};
	exports.NoSuchNetworkCollectorException = NoSuchNetworkCollectorException;
	var NoSuchNetworkDataException = class extends Exception {
		constructor(message, stacktrace) {
			super("no such network data", message, stacktrace);
		}
	};
	exports.NoSuchNetworkDataException = NoSuchNetworkDataException;
	var UnavailableNetworkDataException = class extends Exception {
		constructor(message, stacktrace) {
			super("unavailable network data", message, stacktrace);
		}
	};
	exports.UnavailableNetworkDataException = UnavailableNetworkDataException;
}));
var require_webdriver_bidi_permissions = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
}));
var require_webdriver_bidi_bluetooth = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
}));
var require_webdriver_bidi_nav_speculation = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
}));
var require_webdriver_bidi_ua_client_hints = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
}));
var require_protocol = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UAClientHints = exports.ChromiumBidi = exports.Cdp = void 0;
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	exports.Cdp = __importStar(require_cdp());
	exports.ChromiumBidi = __importStar(require_chromium_bidi());
	__exportStar(require_webdriver_bidi(), exports);
	__exportStar(require_ErrorResponse(), exports);
	__exportStar(require_webdriver_bidi_permissions(), exports);
	__exportStar(require_webdriver_bidi_bluetooth(), exports);
	__exportStar(require_webdriver_bidi_nav_speculation(), exports);
	exports.UAClientHints = __importStar(require_webdriver_bidi_ua_client_hints());
}));
var require_BidiNoOpParser = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BidiNoOpParser = void 0;
	var BidiNoOpParser = class {
		parseDisableSimulationParameters(params) {
			return params;
		}
		parseHandleRequestDevicePromptParams(params) {
			return params;
		}
		parseSimulateAdapterParameters(params) {
			return params;
		}
		parseSimulateAdvertisementParameters(params) {
			return params;
		}
		parseSimulateCharacteristicParameters(params) {
			return params;
		}
		parseSimulateCharacteristicResponseParameters(params) {
			return params;
		}
		parseSimulateDescriptorParameters(params) {
			return params;
		}
		parseSimulateDescriptorResponseParameters(params) {
			return params;
		}
		parseSimulateGattConnectionResponseParameters(params) {
			return params;
		}
		parseSimulateGattDisconnectionParameters(params) {
			return params;
		}
		parseSimulatePreconnectedPeripheralParameters(params) {
			return params;
		}
		parseSimulateServiceParameters(params) {
			return params;
		}
		parseCreateUserContextParameters(params) {
			return params;
		}
		parseRemoveUserContextParameters(params) {
			return params;
		}
		parseSetClientWindowStateParameters(params) {
			return params;
		}
		parseSetDownloadBehaviorParameters(params) {
			return params;
		}
		parseActivateParams(params) {
			return params;
		}
		parseCaptureScreenshotParams(params) {
			return params;
		}
		parseCloseParams(params) {
			return params;
		}
		parseCreateParams(params) {
			return params;
		}
		parseGetTreeParams(params) {
			return params;
		}
		parseHandleUserPromptParams(params) {
			return params;
		}
		parseLocateNodesParams(params) {
			return params;
		}
		parseNavigateParams(params) {
			return params;
		}
		parsePrintParams(params) {
			return params;
		}
		parseReloadParams(params) {
			return params;
		}
		parseSetViewportParams(params) {
			return params;
		}
		parseTraverseHistoryParams(params) {
			return params;
		}
		parseGetSessionParams(params) {
			return params;
		}
		parseResolveRealmParams(params) {
			return params;
		}
		parseSendCommandParams(params) {
			return params;
		}
		parseSetClientHintsOverrideParams(params) {
			return params;
		}
		parseSetForcedColorsModeThemeOverrideParams(params) {
			return params;
		}
		parseSetGeolocationOverrideParams(params) {
			return params;
		}
		parseSetLocaleOverrideParams(params) {
			return params;
		}
		parseSetNetworkConditionsParams(params) {
			return params;
		}
		parseSetScreenOrientationOverrideParams(params) {
			return params;
		}
		parseSetScreenSettingsOverrideParams(params) {
			return params;
		}
		parseSetScriptingEnabledParams(params) {
			return params;
		}
		parseSetTimezoneOverrideParams(params) {
			return params;
		}
		parseSetTouchOverrideParams(params) {
			return params;
		}
		parseSetUserAgentOverrideParams(params) {
			return params;
		}
		parseAddPreloadScriptParams(params) {
			return params;
		}
		parseCallFunctionParams(params) {
			return params;
		}
		parseDisownParams(params) {
			return params;
		}
		parseEvaluateParams(params) {
			return params;
		}
		parseGetRealmsParams(params) {
			return params;
		}
		parseRemovePreloadScriptParams(params) {
			return params;
		}
		parsePerformActionsParams(params) {
			return params;
		}
		parseReleaseActionsParams(params) {
			return params;
		}
		parseSetFilesParams(params) {
			return params;
		}
		parseAddDataCollectorParams(params) {
			return params;
		}
		parseAddInterceptParams(params) {
			return params;
		}
		parseContinueRequestParams(params) {
			return params;
		}
		parseContinueResponseParams(params) {
			return params;
		}
		parseContinueWithAuthParams(params) {
			return params;
		}
		parseDisownDataParams(params) {
			return params;
		}
		parseFailRequestParams(params) {
			return params;
		}
		parseGetDataParams(params) {
			return params;
		}
		parseProvideResponseParams(params) {
			return params;
		}
		parseRemoveDataCollectorParams(params) {
			return params;
		}
		parseRemoveInterceptParams(params) {
			return params;
		}
		parseSetCacheBehaviorParams(params) {
			return params;
		}
		parseSetExtraHeadersParams(params) {
			return params;
		}
		parseSetPermissionsParams(params) {
			return params;
		}
		parseSubscribeParams(params) {
			return params;
		}
		parseUnsubscribeParams(params) {
			return params;
		}
		parseDeleteCookiesParams(params) {
			return params;
		}
		parseGetCookiesParams(params) {
			return params;
		}
		parseSetCookieParams(params) {
			return params;
		}
		parseInstallParams(params) {
			return params;
		}
		parseUninstallParams(params) {
			return params;
		}
	};
	exports.BidiNoOpParser = BidiNoOpParser;
}));
var require_BrowserProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BrowserProcessor = void 0;
	exports.getProxyStr = getProxyStr;
	var protocol_js_1 = require_protocol();
	var BrowserProcessor = class {
		#browserCdpClient;
		#browsingContextStorage;
		#configStorage;
		#userContextStorage;
		constructor(browserCdpClient, browsingContextStorage, configStorage, userContextStorage) {
			this.#browserCdpClient = browserCdpClient;
			this.#browsingContextStorage = browsingContextStorage;
			this.#configStorage = configStorage;
			this.#userContextStorage = userContextStorage;
		}
		close() {
			setTimeout(() => this.#browserCdpClient.sendCommand("Browser.close").catch(() => {}), 0);
			return {};
		}
		async createUserContext(params) {
			const w3cParams = params;
			const globalConfig = this.#configStorage.getGlobalConfig();
			if (w3cParams.acceptInsecureCerts !== void 0) {
				if (w3cParams.acceptInsecureCerts === false && globalConfig.acceptInsecureCerts === true) throw new protocol_js_1.UnknownErrorException(`Cannot set user context's "acceptInsecureCerts" to false, when a capability "acceptInsecureCerts" is set to true`);
			}
			const request = {};
			if (w3cParams.proxy) {
				const proxyStr = getProxyStr(w3cParams.proxy);
				if (proxyStr) request.proxyServer = proxyStr;
				if (w3cParams.proxy.noProxy) request.proxyBypassList = w3cParams.proxy.noProxy.join(",");
			} else {
				if (params["goog:proxyServer"] !== void 0) request.proxyServer = params["goog:proxyServer"];
				const proxyBypassList = params["goog:proxyBypassList"] ?? void 0;
				if (proxyBypassList) request.proxyBypassList = proxyBypassList.join(",");
			}
			const context = await this.#browserCdpClient.sendCommand("Target.createBrowserContext", request);
			await this.#applyDownloadBehavior(globalConfig.downloadBehavior ?? null, context.browserContextId);
			this.#configStorage.updateUserContextConfig(context.browserContextId, {
				acceptInsecureCerts: params["acceptInsecureCerts"],
				userPromptHandler: params["unhandledPromptBehavior"]
			});
			return { userContext: context.browserContextId };
		}
		async removeUserContext(params) {
			const userContext = params.userContext;
			if (userContext === "default") throw new protocol_js_1.InvalidArgumentException("`default` user context cannot be removed");
			try {
				await this.#browserCdpClient.sendCommand("Target.disposeBrowserContext", { browserContextId: userContext });
			} catch (err) {
				if (err.message.startsWith("Failed to find context with id")) throw new protocol_js_1.NoSuchUserContextException(err.message);
				throw err;
			}
			return {};
		}
		async getUserContexts() {
			return { userContexts: await this.#userContextStorage.getUserContexts() };
		}
		async #getWindowInfo(targetId) {
			const windowInfo = await this.#browserCdpClient.sendCommand("Browser.getWindowForTarget", { targetId });
			return {
				active: false,
				clientWindow: `${windowInfo.windowId}`,
				state: windowInfo.bounds.windowState ?? "normal",
				height: windowInfo.bounds.height ?? 0,
				width: windowInfo.bounds.width ?? 0,
				x: windowInfo.bounds.left ?? 0,
				y: windowInfo.bounds.top ?? 0
			};
		}
		async setClientWindowState(params) {
			const { clientWindow } = params;
			const bounds = { windowState: params.state };
			if (params.state === "normal") {
				if (params.width !== void 0) bounds.width = params.width;
				if (params.height !== void 0) bounds.height = params.height;
				if (params.x !== void 0) bounds.left = params.x;
				if (params.y !== void 0) bounds.top = params.y;
			}
			const windowId = Number.parseInt(clientWindow);
			if (isNaN(windowId)) throw new protocol_js_1.InvalidArgumentException("no such client window");
			await this.#browserCdpClient.sendCommand("Browser.setWindowBounds", {
				windowId,
				bounds
			});
			const result = await this.#browserCdpClient.sendCommand("Browser.getWindowBounds", { windowId });
			return {
				active: false,
				clientWindow: `${windowId}`,
				state: result.bounds.windowState ?? "normal",
				height: result.bounds.height ?? 0,
				width: result.bounds.width ?? 0,
				x: result.bounds.left ?? 0,
				y: result.bounds.top ?? 0
			};
		}
		async getClientWindows() {
			const topLevelTargetIds = this.#browsingContextStorage.getTopLevelContexts().map((b) => b.cdpTarget.id);
			const clientWindows = await Promise.all(topLevelTargetIds.map(async (targetId) => await this.#getWindowInfo(targetId)));
			const uniqueClientWindowIds = /* @__PURE__ */ new Set();
			const uniqueClientWindows = new Array();
			for (const window of clientWindows) if (!uniqueClientWindowIds.has(window.clientWindow)) {
				uniqueClientWindowIds.add(window.clientWindow);
				uniqueClientWindows.push(window);
			}
			return { clientWindows: uniqueClientWindows };
		}
		#toCdpDownloadBehavior(downloadBehavior) {
			if (downloadBehavior === null) return { behavior: "default" };
			if (downloadBehavior?.type === "denied") return { behavior: "deny" };
			if (downloadBehavior?.type === "allowed") return {
				behavior: "allow",
				downloadPath: downloadBehavior.destinationFolder
			};
			throw new protocol_js_1.UnknownErrorException("Unexpected download behavior");
		}
		async #applyDownloadBehavior(downloadBehavior, userContext) {
			await this.#browserCdpClient.sendCommand("Browser.setDownloadBehavior", {
				...this.#toCdpDownloadBehavior(downloadBehavior),
				browserContextId: userContext === "default" ? void 0 : userContext,
				eventsEnabled: true
			});
		}
		async setDownloadBehavior(params) {
			let userContexts;
			if (params.userContexts === void 0) userContexts = (await this.#userContextStorage.getUserContexts()).map((c) => c.userContext);
			else userContexts = Array.from(await this.#userContextStorage.verifyUserContextIdList(params.userContexts));
			if (params.userContexts === void 0) this.#configStorage.updateGlobalConfig({ downloadBehavior: params.downloadBehavior });
			else params.userContexts.map((userContext) => this.#configStorage.updateUserContextConfig(userContext, { downloadBehavior: params.downloadBehavior }));
			await Promise.all(userContexts.map(async (userContext) => {
				const downloadBehavior = this.#configStorage.getActiveConfig(void 0, userContext).downloadBehavior ?? null;
				await this.#applyDownloadBehavior(downloadBehavior, userContext);
			}));
			return {};
		}
	};
	exports.BrowserProcessor = BrowserProcessor;
	/**
	* Proxy config parse implementation:
	* https://source.chromium.org/chromium/chromium/src/+/main:net/proxy_resolution/proxy_config.h;drc=743a82d08e59d803c94ee1b8564b8b11dd7b462f;l=107
	*/
	function getProxyStr(proxyConfig) {
		if (proxyConfig.proxyType === "direct" || proxyConfig.proxyType === "system") return;
		if (proxyConfig.proxyType === "pac") throw new protocol_js_1.UnsupportedOperationException(`PAC proxy configuration is not supported per user context`);
		if (proxyConfig.proxyType === "autodetect") throw new protocol_js_1.UnsupportedOperationException(`Autodetect proxy is not supported per user context`);
		if (proxyConfig.proxyType === "manual") {
			const servers = [];
			if (proxyConfig.httpProxy !== void 0) servers.push(`http=${proxyConfig.httpProxy}`);
			if (proxyConfig.sslProxy !== void 0) servers.push(`https=${proxyConfig.sslProxy}`);
			if (proxyConfig.socksProxy !== void 0 || proxyConfig.socksVersion !== void 0) {
				if (proxyConfig.socksProxy === void 0) throw new protocol_js_1.InvalidArgumentException(`'socksVersion' cannot be set without 'socksProxy'`);
				if (proxyConfig.socksVersion === void 0 || typeof proxyConfig.socksVersion !== "number" || !Number.isInteger(proxyConfig.socksVersion) || proxyConfig.socksVersion < 0 || proxyConfig.socksVersion > 255) throw new protocol_js_1.InvalidArgumentException(`'socksVersion' must be between 0 and 255`);
				servers.push(`socks=socks${proxyConfig.socksVersion}://${proxyConfig.socksProxy}`);
			}
			if (servers.length === 0) return;
			return servers.join(";");
		}
		throw new protocol_js_1.UnknownErrorException(`Unknown proxy type`);
	}
}));
var require_CdpProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CdpProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var CdpProcessor = class {
		#browsingContextStorage;
		#realmStorage;
		#cdpConnection;
		#browserCdpClient;
		constructor(browsingContextStorage, realmStorage, cdpConnection, browserCdpClient) {
			this.#browsingContextStorage = browsingContextStorage;
			this.#realmStorage = realmStorage;
			this.#cdpConnection = cdpConnection;
			this.#browserCdpClient = browserCdpClient;
		}
		getSession(params) {
			const context = params.context;
			const sessionId = this.#browsingContextStorage.getContext(context).cdpTarget.cdpSessionId;
			if (sessionId === void 0) return {};
			return { session: sessionId };
		}
		resolveRealm(params) {
			const context = params.realm;
			const realm = this.#realmStorage.getRealm({ realmId: context });
			if (realm === void 0) throw new protocol_js_1.UnknownErrorException(`Could not find realm ${params.realm}`);
			return { executionContextId: realm.executionContextId };
		}
		async sendCommand(params) {
			return {
				result: await (params.session ? this.#cdpConnection.getCdpClient(params.session) : this.#browserCdpClient).sendCommand(params.method, params.params),
				session: params.session
			};
		}
	};
	exports.CdpProcessor = CdpProcessor;
}));
var require_BrowsingContextProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BrowsingContextProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var BrowsingContextProcessor = class {
		#browserCdpClient;
		#browsingContextStorage;
		#contextConfigStorage;
		#eventManager;
		#userContextStorage;
		constructor(browserCdpClient, browsingContextStorage, userContextStorage, contextConfigStorage, eventManager) {
			this.#contextConfigStorage = contextConfigStorage;
			this.#userContextStorage = userContextStorage;
			this.#browserCdpClient = browserCdpClient;
			this.#browsingContextStorage = browsingContextStorage;
			this.#eventManager = eventManager;
			this.#eventManager.addSubscribeHook(protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.ContextCreated, this.#onContextCreatedSubscribeHook.bind(this));
		}
		getTree(params) {
			return { contexts: (params.root === void 0 ? this.#browsingContextStorage.getTopLevelContexts() : [this.#browsingContextStorage.getContext(params.root)]).map((c) => c.serializeToBidiValue(params.maxDepth ?? Number.MAX_VALUE)) };
		}
		async create(params) {
			let referenceContext;
			let userContext = "default";
			if (params.referenceContext !== void 0) {
				referenceContext = this.#browsingContextStorage.getContext(params.referenceContext);
				if (!referenceContext.isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException(`referenceContext should be a top-level context`);
				userContext = referenceContext.userContext;
			}
			if (params.userContext !== void 0) userContext = params.userContext;
			const existingContexts = this.#browsingContextStorage.getAllContexts().filter((context) => context.userContext === userContext);
			let newWindow = false;
			switch (params.type) {
				case "tab":
					newWindow = false;
					break;
				case "window":
					newWindow = true;
					break;
			}
			if (!existingContexts.length) newWindow = true;
			let result;
			try {
				result = await this.#browserCdpClient.sendCommand("Target.createTarget", {
					url: "about:blank",
					newWindow,
					browserContextId: userContext === "default" ? void 0 : userContext,
					background: params.background === true
				});
			} catch (err) {
				if (err.message.startsWith("Failed to find browser context with id") || err.message === "browserContextId") throw new protocol_js_1.NoSuchUserContextException(`The context ${userContext} was not found`);
				throw err;
			}
			const context = await this.#browsingContextStorage.waitForContext(result.targetId);
			await context.lifecycleLoaded();
			return { context: context.id };
		}
		navigate(params) {
			return this.#browsingContextStorage.getContext(params.context).navigate(params.url, params.wait ?? "none");
		}
		reload(params) {
			return this.#browsingContextStorage.getContext(params.context).reload(params.ignoreCache ?? false, params.wait ?? "none");
		}
		async activate(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			if (!context.isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException("Activation is only supported on the top-level context");
			await context.activate();
			return {};
		}
		async captureScreenshot(params) {
			return await this.#browsingContextStorage.getContext(params.context).captureScreenshot(params);
		}
		async print(params) {
			return await this.#browsingContextStorage.getContext(params.context).print(params);
		}
		async setViewport(params) {
			const maxDimensionSize = 1e7;
			if ((params.viewport?.height ?? 0) > maxDimensionSize || (params.viewport?.width ?? 0) > maxDimensionSize) throw new protocol_js_1.UnsupportedOperationException(`Viewport dimension over ${maxDimensionSize} are not supported`);
			const config = {};
			if (params.devicePixelRatio !== void 0) config.devicePixelRatio = params.devicePixelRatio;
			if (params.viewport !== void 0) config.viewport = params.viewport;
			const impactedTopLevelContexts = await this.#getRelatedTopLevelBrowsingContexts(params.context, params.userContexts);
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, config);
			if (params.context !== void 0) this.#contextConfigStorage.updateBrowsingContextConfig(params.context, config);
			await Promise.all(impactedTopLevelContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setViewport(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null);
			}));
			return {};
		}
		/**
		* Returns a list of top-level browsing context ids.
		*/
		async #getRelatedTopLevelBrowsingContexts(browsingContextId, userContextIds) {
			if (browsingContextId === void 0 && userContextIds === void 0) throw new protocol_js_1.InvalidArgumentException("Either userContexts or context must be provided");
			if (browsingContextId !== void 0 && userContextIds !== void 0) throw new protocol_js_1.InvalidArgumentException("userContexts and context are mutually exclusive");
			if (browsingContextId !== void 0) {
				const context = this.#browsingContextStorage.getContext(browsingContextId);
				if (!context.isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException("Emulating viewport is only supported on the top-level context");
				return [context];
			}
			await this.#userContextStorage.verifyUserContextIdList(userContextIds);
			const result = [];
			for (const userContextId of userContextIds) {
				const topLevelBrowsingContexts = this.#browsingContextStorage.getTopLevelContexts().filter((browsingContext) => browsingContext.userContext === userContextId);
				result.push(...topLevelBrowsingContexts);
			}
			return [...new Set(result).values()];
		}
		async traverseHistory(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			if (!context) throw new protocol_js_1.InvalidArgumentException(`No browsing context with id ${params.context}`);
			if (!context.isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException("Traversing history is only supported on the top-level context");
			await context.traverseHistory(params.delta);
			return {};
		}
		async handleUserPrompt(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			try {
				await context.handleUserPrompt(params.accept, params.userText);
			} catch (error) {
				if (error.message?.includes("No dialog is showing")) throw new protocol_js_1.NoSuchAlertException("No dialog is showing");
				throw error;
			}
			return {};
		}
		async close(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			if (!context.isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException(`Non top-level browsing context ${context.id} cannot be closed.`);
			const parentCdpClient = context.cdpTarget.parentCdpClient;
			try {
				const detachedFromTargetPromise = new Promise((resolve) => {
					const onContextDestroyed = (event) => {
						if (event.targetId === params.context) {
							parentCdpClient.off("Target.detachedFromTarget", onContextDestroyed);
							resolve();
						}
					};
					parentCdpClient.on("Target.detachedFromTarget", onContextDestroyed);
				});
				try {
					if (params.promptUnload) await context.close();
					else await parentCdpClient.sendCommand("Target.closeTarget", { targetId: params.context });
				} catch (error) {
					if (!parentCdpClient.isCloseError(error)) throw error;
				}
				await detachedFromTargetPromise;
			} catch (error) {
				if (!(error.code === -32e3 && error.message === "Not attached to an active page")) throw error;
			}
			return {};
		}
		async locateNodes(params) {
			return await this.#browsingContextStorage.getContext(params.context).locateNodes(params);
		}
		#onContextCreatedSubscribeHook(contextId) {
			[this.#browsingContextStorage.getContext(contextId), ...this.#browsingContextStorage.getContext(contextId).allChildren].forEach((context) => {
				this.#eventManager.registerEvent({
					type: "event",
					method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.ContextCreated,
					params: context.serializeToBidiValue()
				}, context.id);
			});
			return Promise.resolve();
		}
	};
	exports.BrowsingContextProcessor = BrowsingContextProcessor;
}));
var require_EmulationProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2025 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EmulationProcessor = void 0;
	exports.isValidLocale = isValidLocale;
	exports.isValidTimezone = isValidTimezone;
	exports.isTimeZoneOffsetString = isTimeZoneOffsetString;
	var protocol_js_1 = require_protocol();
	var EmulationProcessor = class {
		#userContextStorage;
		#browsingContextStorage;
		#contextConfigStorage;
		constructor(browsingContextStorage, userContextStorage, contextConfigStorage) {
			this.#userContextStorage = userContextStorage;
			this.#browsingContextStorage = browsingContextStorage;
			this.#contextConfigStorage = contextConfigStorage;
		}
		async setGeolocationOverride(params) {
			if ("coordinates" in params && "error" in params) throw new protocol_js_1.InvalidArgumentException("Coordinates and error cannot be set at the same time");
			let geolocation = null;
			if ("coordinates" in params) {
				if ((params.coordinates?.altitude ?? null) === null && (params.coordinates?.altitudeAccuracy ?? null) !== null) throw new protocol_js_1.InvalidArgumentException("Geolocation altitudeAccuracy can be set only with altitude");
				geolocation = params.coordinates;
			} else if ("error" in params) {
				if (params.error.type !== "positionUnavailable") throw new protocol_js_1.InvalidArgumentException(`Unknown geolocation error ${params.error.type}`);
				geolocation = params.error;
			} else throw new protocol_js_1.InvalidArgumentException(`Coordinates or error should be set`);
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { geolocation });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { geolocation });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setGeolocationOverride(config.geolocation ?? null);
			}));
			return {};
		}
		async setLocaleOverride(params) {
			const locale = params.locale ?? null;
			if (locale !== null && !isValidLocale(locale)) throw new protocol_js_1.InvalidArgumentException(`Invalid locale "${locale}"`);
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { locale });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { locale });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await Promise.all([context.setLocaleOverride(config.locale ?? null), context.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints)]);
			}));
			return {};
		}
		async setScriptingEnabled(params) {
			const scriptingEnabled = params.enabled;
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { scriptingEnabled });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { scriptingEnabled });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setScriptingEnabled(config.scriptingEnabled ?? null);
			}));
			return {};
		}
		async setScreenOrientationOverride(params) {
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { screenOrientation: params.screenOrientation });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { screenOrientation: params.screenOrientation });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setViewport(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null);
			}));
			return {};
		}
		async setScreenSettingsOverride(params) {
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { screenArea: params.screenArea });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { screenArea: params.screenArea });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setViewport(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null);
			}));
			return {};
		}
		/**
		* Returns a list of top-level browsing contexts.
		*/
		async #getRelatedTopLevelBrowsingContexts(browsingContextIds, userContextIds, allowGlobal = false) {
			if (browsingContextIds === void 0 && userContextIds === void 0) {
				if (allowGlobal) return this.#browsingContextStorage.getTopLevelContexts();
				throw new protocol_js_1.InvalidArgumentException("Either user contexts or browsing contexts must be provided");
			}
			if (browsingContextIds !== void 0 && userContextIds !== void 0) throw new protocol_js_1.InvalidArgumentException("User contexts and browsing contexts are mutually exclusive");
			const result = [];
			if (browsingContextIds === void 0) {
				if (userContextIds.length === 0) throw new protocol_js_1.InvalidArgumentException("user context should be provided");
				await this.#userContextStorage.verifyUserContextIdList(userContextIds);
				for (const userContextId of userContextIds) {
					const topLevelBrowsingContexts = this.#browsingContextStorage.getTopLevelContexts().filter((browsingContext) => browsingContext.userContext === userContextId);
					result.push(...topLevelBrowsingContexts);
				}
			} else {
				if (browsingContextIds.length === 0) throw new protocol_js_1.InvalidArgumentException("browsing context should be provided");
				for (const browsingContextId of browsingContextIds) {
					const browsingContext = this.#browsingContextStorage.getContext(browsingContextId);
					if (!browsingContext.isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException("The command is only supported on the top-level context");
					result.push(browsingContext);
				}
			}
			return [...new Set(result).values()];
		}
		async setTimezoneOverride(params) {
			let timezone = params.timezone ?? null;
			if (timezone !== null && !isValidTimezone(timezone)) throw new protocol_js_1.InvalidArgumentException(`Invalid timezone "${timezone}"`);
			if (timezone !== null && isTimeZoneOffsetString(timezone)) timezone = `GMT${timezone}`;
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { timezone });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { timezone });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setTimezoneOverride(config.timezone ?? null);
			}));
			return {};
		}
		async setTouchOverride(params) {
			const maxTouchPoints = params.maxTouchPoints;
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { maxTouchPoints });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { maxTouchPoints });
			if (params.contexts === void 0 && params.userContexts === void 0) this.#contextConfigStorage.updateGlobalConfig({ maxTouchPoints });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setTouchOverride(config.maxTouchPoints ?? null);
			}));
			return {};
		}
		async setUserAgentOverrideParams(params) {
			if (params.userAgent === "") throw new protocol_js_1.UnsupportedOperationException("empty user agent string is not supported");
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { userAgent: params.userAgent });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { userAgent: params.userAgent });
			if (params.contexts === void 0 && params.userContexts === void 0) this.#contextConfigStorage.updateGlobalConfig({ userAgent: params.userAgent });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints);
			}));
			return {};
		}
		async setClientHintsOverride(params) {
			const clientHints = params.clientHints ?? null;
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { clientHints });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { clientHints });
			if (params.contexts === void 0 && params.userContexts === void 0) this.#contextConfigStorage.updateGlobalConfig({ clientHints });
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints);
			}));
			return {};
		}
		async setNetworkConditions(params) {
			const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
			for (const browsingContextId of params.contexts ?? []) this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { emulatedNetworkConditions: params.networkConditions });
			for (const userContextId of params.userContexts ?? []) this.#contextConfigStorage.updateUserContextConfig(userContextId, { emulatedNetworkConditions: params.networkConditions });
			if (params.contexts === void 0 && params.userContexts === void 0) this.#contextConfigStorage.updateGlobalConfig({ emulatedNetworkConditions: params.networkConditions });
			if (params.networkConditions !== null && params.networkConditions.type !== "offline") throw new protocol_js_1.UnsupportedOperationException(`Unsupported network conditions ${params.networkConditions.type}`);
			await Promise.all(browsingContexts.map(async (context) => {
				const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
				await context.setEmulatedNetworkConditions(config.emulatedNetworkConditions ?? null);
			}));
			return {};
		}
	};
	exports.EmulationProcessor = EmulationProcessor;
	function isValidLocale(locale) {
		try {
			new Intl.Locale(locale);
			return true;
		} catch (e) {
			if (e instanceof RangeError) return false;
			throw e;
		}
	}
	function isValidTimezone(timezone) {
		try {
			Intl.DateTimeFormat(void 0, { timeZone: timezone });
			return true;
		} catch (e) {
			if (e instanceof RangeError) return false;
			throw e;
		}
	}
	function isTimeZoneOffsetString(timezone) {
		return /^[+-](?:2[0-3]|[01]\d)(?::[0-5]\d)?$/.test(timezone);
	}
}));
var require_assert = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.assert = assert;
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	function assert(predicate, message) {
		if (!predicate) throw new Error(message ?? "Internal assertion failed.");
	}
}));
var require_graphemeTools = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isSingleComplexGrapheme = isSingleComplexGrapheme;
	exports.isSingleGrapheme = isSingleGrapheme;
	/**
	* Check if the given string is a single complex grapheme. A complex grapheme is one that
	* is made up of multiple characters.
	*/
	function isSingleComplexGrapheme(value) {
		return isSingleGrapheme(value) && value.length > 1;
	}
	/**
	* Check if the given string is a single grapheme.
	*/
	function isSingleGrapheme(value) {
		return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(value)].length === 1;
	}
}));
var require_InputSource = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WheelSource = exports.PointerSource = exports.KeySource = exports.NoneSource = void 0;
	var NoneSource = class {
		type = "none";
	};
	exports.NoneSource = NoneSource;
	var KeySource = class {
		type = "key";
		pressed = /* @__PURE__ */ new Set();
		#modifiers = 0;
		get modifiers() {
			return this.#modifiers;
		}
		get alt() {
			return (this.#modifiers & 1) === 1;
		}
		set alt(value) {
			this.#setModifier(value, 1);
		}
		get ctrl() {
			return (this.#modifiers & 2) === 2;
		}
		set ctrl(value) {
			this.#setModifier(value, 2);
		}
		get meta() {
			return (this.#modifiers & 4) === 4;
		}
		set meta(value) {
			this.#setModifier(value, 4);
		}
		get shift() {
			return (this.#modifiers & 8) === 8;
		}
		set shift(value) {
			this.#setModifier(value, 8);
		}
		#setModifier(value, bit) {
			if (value) this.#modifiers |= bit;
			else this.#modifiers &= ~bit;
		}
	};
	exports.KeySource = KeySource;
	var PointerSource = class {
		type = "pointer";
		subtype;
		pointerId;
		pressed = /* @__PURE__ */ new Set();
		x = 0;
		y = 0;
		radiusX;
		radiusY;
		force;
		constructor(id, subtype) {
			this.pointerId = id;
			this.subtype = subtype;
		}
		get buttons() {
			let buttons = 0;
			for (const button of this.pressed) switch (button) {
				case 0:
					buttons |= 1;
					break;
				case 1:
					buttons |= 4;
					break;
				case 2:
					buttons |= 2;
					break;
				case 3:
					buttons |= 8;
					break;
				case 4:
					buttons |= 16;
					break;
			}
			return buttons;
		}
		static ClickContext = class ClickContext {
			static #DOUBLE_CLICK_TIME_MS = 500;
			static #MAX_DOUBLE_CLICK_RADIUS = 2;
			count = 0;
			#x;
			#y;
			#time;
			constructor(x, y, time) {
				this.#x = x;
				this.#y = y;
				this.#time = time;
			}
			compare(context) {
				return context.#time - this.#time > ClickContext.#DOUBLE_CLICK_TIME_MS || Math.abs(context.#x - this.#x) > ClickContext.#MAX_DOUBLE_CLICK_RADIUS || Math.abs(context.#y - this.#y) > ClickContext.#MAX_DOUBLE_CLICK_RADIUS;
			}
		};
		#clickContexts = /* @__PURE__ */ new Map();
		setClickCount(button, context) {
			let storedContext = this.#clickContexts.get(button);
			if (!storedContext || storedContext.compare(context)) storedContext = context;
			++storedContext.count;
			this.#clickContexts.set(button, storedContext);
			return storedContext.count;
		}
		getClickCount(button) {
			return this.#clickContexts.get(button)?.count ?? 0;
		}
		/**
		* Resets click count. Resets consequent click counter. Prevents grouping clicks in
		* different `performActions` calls, so that they are not grouped as double, triple etc
		* clicks. Required for https://github.com/GoogleChromeLabs/chromium-bidi/issues/3043.
		*/
		resetClickCount() {
			this.#clickContexts = /* @__PURE__ */ new Map();
		}
	};
	exports.PointerSource = PointerSource;
	var WheelSource = class {
		type = "wheel";
	};
	exports.WheelSource = WheelSource;
}));
var require_keyUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getNormalizedKey = getNormalizedKey;
	exports.getKeyCode = getKeyCode;
	exports.getKeyLocation = getKeyLocation;
	/**
	* Returns the normalized key value for a given key according to the table:
	* https://w3c.github.io/webdriver/#dfn-normalized-key-value
	*/
	function getNormalizedKey(value) {
		switch (value) {
			case "": return "Unidentified";
			case "": return "Cancel";
			case "": return "Help";
			case "": return "Backspace";
			case "": return "Tab";
			case "": return "Clear";
			case "":
			case "": return "Enter";
			case "": return "Shift";
			case "": return "Control";
			case "": return "Alt";
			case "": return "Pause";
			case "": return "Escape";
			case "": return " ";
			case "": return "PageUp";
			case "": return "PageDown";
			case "": return "End";
			case "": return "Home";
			case "": return "ArrowLeft";
			case "": return "ArrowUp";
			case "": return "ArrowRight";
			case "": return "ArrowDown";
			case "": return "Insert";
			case "": return "Delete";
			case "": return ";";
			case "": return "=";
			case "": return "0";
			case "": return "1";
			case "": return "2";
			case "": return "3";
			case "": return "4";
			case "": return "5";
			case "": return "6";
			case "": return "7";
			case "": return "8";
			case "": return "9";
			case "": return "*";
			case "": return "+";
			case "": return ",";
			case "": return "-";
			case "": return ".";
			case "": return "/";
			case "": return "F1";
			case "": return "F2";
			case "": return "F3";
			case "": return "F4";
			case "": return "F5";
			case "": return "F6";
			case "": return "F7";
			case "": return "F8";
			case "": return "F9";
			case "": return "F10";
			case "": return "F11";
			case "": return "F12";
			case "": return "Meta";
			case "": return "ZenkakuHankaku";
			case "": return "Shift";
			case "": return "Control";
			case "": return "Alt";
			case "": return "Meta";
			case "": return "PageUp";
			case "": return "PageDown";
			case "": return "End";
			case "": return "Home";
			case "": return "ArrowLeft";
			case "": return "ArrowUp";
			case "": return "ArrowRight";
			case "": return "ArrowDown";
			case "": return "Insert";
			case "": return "Delete";
			default: return value;
		}
	}
	/**
	* Returns the key code for a given key according to the table:
	* https://w3c.github.io/webdriver/#dfn-shifted-character
	*/
	function getKeyCode(key) {
		switch (key) {
			case "`":
			case "~": return "Backquote";
			case "\\":
			case "|": return "Backslash";
			case "": return "Backspace";
			case "[":
			case "{": return "BracketLeft";
			case "]":
			case "}": return "BracketRight";
			case ",":
			case "<": return "Comma";
			case "0":
			case ")": return "Digit0";
			case "1":
			case "!": return "Digit1";
			case "2":
			case "@": return "Digit2";
			case "3":
			case "#": return "Digit3";
			case "4":
			case "$": return "Digit4";
			case "5":
			case "%": return "Digit5";
			case "6":
			case "^": return "Digit6";
			case "7":
			case "&": return "Digit7";
			case "8":
			case "*": return "Digit8";
			case "9":
			case "(": return "Digit9";
			case "=":
			case "+": return "Equal";
			case ">": return "IntlBackslash";
			case "a":
			case "A": return "KeyA";
			case "b":
			case "B": return "KeyB";
			case "c":
			case "C": return "KeyC";
			case "d":
			case "D": return "KeyD";
			case "e":
			case "E": return "KeyE";
			case "f":
			case "F": return "KeyF";
			case "g":
			case "G": return "KeyG";
			case "h":
			case "H": return "KeyH";
			case "i":
			case "I": return "KeyI";
			case "j":
			case "J": return "KeyJ";
			case "k":
			case "K": return "KeyK";
			case "l":
			case "L": return "KeyL";
			case "m":
			case "M": return "KeyM";
			case "n":
			case "N": return "KeyN";
			case "o":
			case "O": return "KeyO";
			case "p":
			case "P": return "KeyP";
			case "q":
			case "Q": return "KeyQ";
			case "r":
			case "R": return "KeyR";
			case "s":
			case "S": return "KeyS";
			case "t":
			case "T": return "KeyT";
			case "u":
			case "U": return "KeyU";
			case "v":
			case "V": return "KeyV";
			case "w":
			case "W": return "KeyW";
			case "x":
			case "X": return "KeyX";
			case "y":
			case "Y": return "KeyY";
			case "z":
			case "Z": return "KeyZ";
			case "-":
			case "_": return "Minus";
			case ".": return "Period";
			case "'":
			case "\"": return "Quote";
			case ";":
			case ":": return "Semicolon";
			case "/":
			case "?": return "Slash";
			case "": return "AltLeft";
			case "": return "AltRight";
			case "": return "ControlLeft";
			case "": return "ControlRight";
			case "": return "Enter";
			case "": return "Pause";
			case "": return "MetaLeft";
			case "": return "MetaRight";
			case "": return "ShiftLeft";
			case "": return "ShiftRight";
			case " ":
			case "": return "Space";
			case "": return "Tab";
			case "": return "Delete";
			case "": return "End";
			case "": return "Help";
			case "": return "Home";
			case "": return "Insert";
			case "": return "PageDown";
			case "": return "PageUp";
			case "": return "ArrowDown";
			case "": return "ArrowLeft";
			case "": return "ArrowRight";
			case "": return "ArrowUp";
			case "": return "Escape";
			case "": return "F1";
			case "": return "F2";
			case "": return "F3";
			case "": return "F4";
			case "": return "F5";
			case "": return "F6";
			case "": return "F7";
			case "": return "F8";
			case "": return "F9";
			case "": return "F10";
			case "": return "F11";
			case "": return "F12";
			case "": return "NumpadEqual";
			case "":
			case "": return "Numpad0";
			case "":
			case "": return "Numpad1";
			case "":
			case "": return "Numpad2";
			case "":
			case "": return "Numpad3";
			case "":
			case "": return "Numpad4";
			case "": return "Numpad5";
			case "":
			case "": return "Numpad6";
			case "":
			case "": return "Numpad7";
			case "":
			case "": return "Numpad8";
			case "":
			case "": return "Numpad9";
			case "": return "NumpadAdd";
			case "": return "NumpadComma";
			case "":
			case "": return "NumpadDecimal";
			case "": return "NumpadDivide";
			case "": return "NumpadEnter";
			case "": return "NumpadMultiply";
			case "": return "NumpadSubtract";
			default: return;
		}
	}
	/**
	* Returns the location of the key according to the table:
	* https://w3c.github.io/webdriver/#dfn-key-location
	*/
	function getKeyLocation(key) {
		switch (key) {
			case "":
			case "":
			case "":
			case "":
			case "": return 1;
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "":
			case "": return 3;
			case "":
			case "":
			case "":
			case "": return 2;
			default: return 0;
		}
	}
}));
var require_USKeyboardLayout = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.KeyToKeyCode = void 0;
	exports.KeyToKeyCode = {
		"0": 48,
		"1": 49,
		"2": 50,
		"3": 51,
		"4": 52,
		"5": 53,
		"6": 54,
		"7": 55,
		"8": 56,
		"9": 57,
		Abort: 3,
		Help: 6,
		Backspace: 8,
		Tab: 9,
		Numpad5: 12,
		NumpadEnter: 13,
		Enter: 13,
		"\\r": 13,
		"\\n": 13,
		ShiftLeft: 16,
		ShiftRight: 16,
		ControlLeft: 17,
		ControlRight: 17,
		AltLeft: 18,
		AltRight: 18,
		Pause: 19,
		CapsLock: 20,
		Escape: 27,
		Convert: 28,
		NonConvert: 29,
		Space: 32,
		Numpad9: 33,
		PageUp: 33,
		Numpad3: 34,
		PageDown: 34,
		End: 35,
		Numpad1: 35,
		Home: 36,
		Numpad7: 36,
		ArrowLeft: 37,
		Numpad4: 37,
		Numpad8: 38,
		ArrowUp: 38,
		ArrowRight: 39,
		Numpad6: 39,
		Numpad2: 40,
		ArrowDown: 40,
		Select: 41,
		Open: 43,
		PrintScreen: 44,
		Insert: 45,
		Numpad0: 45,
		Delete: 46,
		NumpadDecimal: 46,
		Digit0: 48,
		Digit1: 49,
		Digit2: 50,
		Digit3: 51,
		Digit4: 52,
		Digit5: 53,
		Digit6: 54,
		Digit7: 55,
		Digit8: 56,
		Digit9: 57,
		KeyA: 65,
		KeyB: 66,
		KeyC: 67,
		KeyD: 68,
		KeyE: 69,
		KeyF: 70,
		KeyG: 71,
		KeyH: 72,
		KeyI: 73,
		KeyJ: 74,
		KeyK: 75,
		KeyL: 76,
		KeyM: 77,
		KeyN: 78,
		KeyO: 79,
		KeyP: 80,
		KeyQ: 81,
		KeyR: 82,
		KeyS: 83,
		KeyT: 84,
		KeyU: 85,
		KeyV: 86,
		KeyW: 87,
		KeyX: 88,
		KeyY: 89,
		KeyZ: 90,
		MetaLeft: 91,
		MetaRight: 92,
		ContextMenu: 93,
		NumpadMultiply: 106,
		NumpadAdd: 107,
		NumpadSubtract: 109,
		NumpadDivide: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		F13: 124,
		F14: 125,
		F15: 126,
		F16: 127,
		F17: 128,
		F18: 129,
		F19: 130,
		F20: 131,
		F21: 132,
		F22: 133,
		F23: 134,
		F24: 135,
		NumLock: 144,
		ScrollLock: 145,
		AudioVolumeMute: 173,
		AudioVolumeDown: 174,
		AudioVolumeUp: 175,
		MediaTrackNext: 176,
		MediaTrackPrevious: 177,
		MediaStop: 178,
		MediaPlayPause: 179,
		Semicolon: 186,
		Equal: 187,
		NumpadEqual: 187,
		Comma: 188,
		Minus: 189,
		Period: 190,
		Slash: 191,
		Backquote: 192,
		BracketLeft: 219,
		Backslash: 220,
		BracketRight: 221,
		Quote: 222,
		AltGraph: 225,
		Props: 247,
		Cancel: 3,
		Clear: 12,
		Shift: 16,
		Control: 17,
		Alt: 18,
		Accept: 30,
		ModeChange: 31,
		" ": 32,
		Print: 42,
		Execute: 43,
		"\\u0000": 46,
		a: 65,
		b: 66,
		c: 67,
		d: 68,
		e: 69,
		f: 70,
		g: 71,
		h: 72,
		i: 73,
		j: 74,
		k: 75,
		l: 76,
		m: 77,
		n: 78,
		o: 79,
		p: 80,
		q: 81,
		r: 82,
		s: 83,
		t: 84,
		u: 85,
		v: 86,
		w: 87,
		x: 88,
		y: 89,
		z: 90,
		Meta: 91,
		"*": 106,
		"+": 107,
		"-": 109,
		"/": 111,
		";": 186,
		"=": 187,
		",": 188,
		".": 190,
		"`": 192,
		"[": 219,
		"\\\\": 220,
		"]": 221,
		"'": 222,
		Attn: 246,
		CrSel: 247,
		ExSel: 248,
		EraseEof: 249,
		Play: 250,
		ZoomOut: 251,
		")": 48,
		"!": 49,
		"@": 50,
		"#": 51,
		$: 52,
		"%": 53,
		"^": 54,
		"&": 55,
		"(": 57,
		A: 65,
		B: 66,
		C: 67,
		D: 68,
		E: 69,
		F: 70,
		G: 71,
		H: 72,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		T: 84,
		U: 85,
		V: 86,
		W: 87,
		X: 88,
		Y: 89,
		Z: 90,
		":": 186,
		"<": 188,
		_: 189,
		">": 190,
		"?": 191,
		"~": 192,
		"{": 219,
		"|": 220,
		"}": 221,
		"\"": 222,
		Camera: 44,
		EndCall: 95,
		VolumeDown: 182,
		VolumeUp: 183
	};
}));
var require_ActionDispatcher = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ActionDispatcher = void 0;
	var protocol_js_1 = require_protocol();
	var assert_js_1 = require_assert();
	var graphemeTools_js_1 = require_graphemeTools();
	var InputSource_js_1 = require_InputSource();
	var keyUtils_js_1 = require_keyUtils();
	var USKeyboardLayout_js_1 = require_USKeyboardLayout();
	/** https://w3c.github.io/webdriver/#dfn-center-point */
	var CALCULATE_IN_VIEW_CENTER_PT_DECL = ((i) => {
		const t = i.getClientRects()[0], e = Math.max(0, Math.min(t.x, t.x + t.width)), n = Math.min(window.innerWidth, Math.max(t.x, t.x + t.width)), h = Math.max(0, Math.min(t.y, t.y + t.height)), m = Math.min(window.innerHeight, Math.max(t.y, t.y + t.height));
		return [e + (n - e >> 1), h + (m - h >> 1)];
	}).toString();
	var IS_MAC_DECL = (() => {
		return navigator.platform.toLowerCase().includes("mac");
	}).toString();
	async function getElementCenter(context, element) {
		const result = await (await context.getOrCreateHiddenSandbox()).callFunction(CALCULATE_IN_VIEW_CENTER_PT_DECL, false, { type: "undefined" }, [element]);
		if (result.type === "exception") throw new protocol_js_1.NoSuchElementException(`Origin element ${element.sharedId} was not found`);
		(0, assert_js_1.assert)(result.result.type === "array");
		(0, assert_js_1.assert)(result.result.value?.[0]?.type === "number");
		(0, assert_js_1.assert)(result.result.value?.[1]?.type === "number");
		const { result: { value: [{ value: x }, { value: y }] } } = result;
		return {
			x,
			y
		};
	}
	var ActionDispatcher = class {
		static isMacOS = async (context) => {
			const result = await (await context.getOrCreateHiddenSandbox()).callFunction(IS_MAC_DECL, false);
			(0, assert_js_1.assert)(result.type !== "exception");
			(0, assert_js_1.assert)(result.result.type === "boolean");
			return result.result.value;
		};
		#browsingContextStorage;
		#tickStart = 0;
		#tickDuration = 0;
		#inputState;
		#contextId;
		#isMacOS;
		constructor(inputState, browsingContextStorage, contextId, isMacOS) {
			this.#browsingContextStorage = browsingContextStorage;
			this.#inputState = inputState;
			this.#contextId = contextId;
			this.#isMacOS = isMacOS;
		}
		/**
		* The context can be disposed between action ticks, so need to get it each time.
		*/
		get #context() {
			return this.#browsingContextStorage.getContext(this.#contextId);
		}
		async dispatchActions(optionsByTick) {
			await this.#inputState.queue.run(async () => {
				for (const options of optionsByTick) await this.dispatchTickActions(options);
			});
		}
		async dispatchTickActions(options) {
			this.#tickStart = performance.now();
			this.#tickDuration = 0;
			for (const { action } of options) if ("duration" in action && action.duration !== void 0) this.#tickDuration = Math.max(this.#tickDuration, action.duration);
			const promises = [new Promise((resolve) => setTimeout(resolve, this.#tickDuration))];
			for (const option of options) promises.push(this.#dispatchAction(option));
			await Promise.all(promises);
		}
		async #dispatchAction({ id, action }) {
			const source = this.#inputState.get(id);
			const keyState = this.#inputState.getGlobalKeyState();
			switch (action.type) {
				case "keyDown":
					await this.#dispatchKeyDownAction(source, action);
					this.#inputState.cancelList.push({
						id,
						action: {
							...action,
							type: "keyUp"
						}
					});
					break;
				case "keyUp":
					await this.#dispatchKeyUpAction(source, action);
					break;
				case "pause": break;
				case "pointerDown":
					await this.#dispatchPointerDownAction(source, keyState, action);
					this.#inputState.cancelList.push({
						id,
						action: {
							...action,
							type: "pointerUp"
						}
					});
					break;
				case "pointerMove":
					await this.#dispatchPointerMoveAction(source, keyState, action);
					break;
				case "pointerUp":
					await this.#dispatchPointerUpAction(source, keyState, action);
					break;
				case "scroll":
					await this.#dispatchScrollAction(source, keyState, action);
					break;
			}
		}
		async #dispatchPointerDownAction(source, keyState, action) {
			const { button } = action;
			if (source.pressed.has(button)) return;
			source.pressed.add(button);
			const { x, y, subtype: pointerType } = source;
			const { width, height, pressure, twist, tangentialPressure } = action;
			const { tiltX, tiltY } = getTilt(action);
			const { modifiers } = keyState;
			const { radiusX, radiusY } = getRadii(width ?? 1, height ?? 1);
			switch (pointerType) {
				case "mouse":
				case "pen":
					await this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchMouseEvent", {
						type: "mousePressed",
						x,
						y,
						modifiers,
						button: getCdpButton(button),
						buttons: source.buttons,
						clickCount: source.setClickCount(button, new InputSource_js_1.PointerSource.ClickContext(x, y, performance.now())),
						pointerType,
						tangentialPressure,
						tiltX,
						tiltY,
						twist,
						force: pressure
					});
					break;
				case "touch":
					await this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchTouchEvent", {
						type: "touchStart",
						touchPoints: [{
							x,
							y,
							radiusX,
							radiusY,
							tangentialPressure,
							tiltX,
							tiltY,
							twist,
							force: pressure,
							id: source.pointerId
						}],
						modifiers
					});
					break;
			}
			source.radiusX = radiusX;
			source.radiusY = radiusY;
			source.force = pressure;
		}
		#dispatchPointerUpAction(source, keyState, action) {
			const { button } = action;
			if (!source.pressed.has(button)) return;
			source.pressed.delete(button);
			const { x, y, force, radiusX, radiusY, subtype: pointerType } = source;
			const { modifiers } = keyState;
			switch (pointerType) {
				case "mouse":
				case "pen": return this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchMouseEvent", {
					type: "mouseReleased",
					x,
					y,
					modifiers,
					button: getCdpButton(button),
					buttons: source.buttons,
					clickCount: source.getClickCount(button),
					pointerType
				});
				case "touch": return this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchTouchEvent", {
					type: "touchEnd",
					touchPoints: [{
						x,
						y,
						id: source.pointerId,
						force,
						radiusX,
						radiusY
					}],
					modifiers
				});
			}
		}
		async #dispatchPointerMoveAction(source, keyState, action) {
			const { x: startX, y: startY, subtype: pointerType } = source;
			const { width, height, pressure, twist, tangentialPressure, x: offsetX, y: offsetY, origin = "viewport", duration = this.#tickDuration } = action;
			const { tiltX, tiltY } = getTilt(action);
			const { radiusX, radiusY } = getRadii(width ?? 1, height ?? 1);
			const { targetX, targetY } = await this.#getCoordinateFromOrigin(origin, offsetX, offsetY, startX, startY);
			if (targetX < 0 || targetY < 0) throw new protocol_js_1.MoveTargetOutOfBoundsException(`Cannot move beyond viewport (x: ${targetX}, y: ${targetY})`);
			let last;
			do {
				const ratio = duration > 0 ? (performance.now() - this.#tickStart) / duration : 1;
				last = ratio >= 1;
				let x;
				let y;
				if (last) {
					x = targetX;
					y = targetY;
				} else {
					x = Math.round(ratio * (targetX - startX) + startX);
					y = Math.round(ratio * (targetY - startY) + startY);
				}
				if (source.x !== x || source.y !== y) {
					const { modifiers } = keyState;
					switch (pointerType) {
						case "mouse":
							await this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchMouseEvent", {
								type: "mouseMoved",
								x,
								y,
								modifiers,
								clickCount: 0,
								button: getCdpButton(source.pressed.values().next().value ?? 5),
								buttons: source.buttons,
								pointerType,
								tangentialPressure,
								tiltX,
								tiltY,
								twist,
								force: pressure
							});
							break;
						case "pen":
							if (source.pressed.size !== 0) await this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchMouseEvent", {
								type: "mouseMoved",
								x,
								y,
								modifiers,
								clickCount: 0,
								button: getCdpButton(source.pressed.values().next().value ?? 5),
								buttons: source.buttons,
								pointerType,
								tangentialPressure,
								tiltX,
								tiltY,
								twist,
								force: pressure ?? .5
							});
							break;
						case "touch":
							if (source.pressed.size !== 0) await this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchTouchEvent", {
								type: "touchMove",
								touchPoints: [{
									x,
									y,
									radiusX,
									radiusY,
									tangentialPressure,
									tiltX,
									tiltY,
									twist,
									force: pressure,
									id: source.pointerId
								}],
								modifiers
							});
							break;
					}
					source.x = x;
					source.y = y;
					source.radiusX = radiusX;
					source.radiusY = radiusY;
					source.force = pressure;
				}
			} while (!last);
		}
		async #getFrameOffset() {
			if (this.#context.id === this.#context.cdpTarget.id) return {
				x: 0,
				y: 0
			};
			const { backendNodeId } = await this.#context.cdpTarget.cdpClient.sendCommand("DOM.getFrameOwner", { frameId: this.#context.id });
			const { model: frameBoxModel } = await this.#context.cdpTarget.cdpClient.sendCommand("DOM.getBoxModel", { backendNodeId });
			return {
				x: frameBoxModel.content[0],
				y: frameBoxModel.content[1]
			};
		}
		async #getCoordinateFromOrigin(origin, offsetX, offsetY, startX, startY) {
			let targetX;
			let targetY;
			const frameOffset = await this.#getFrameOffset();
			switch (origin) {
				case "viewport":
					targetX = offsetX + frameOffset.x;
					targetY = offsetY + frameOffset.y;
					break;
				case "pointer":
					targetX = startX + offsetX + frameOffset.x;
					targetY = startY + offsetY + frameOffset.y;
					break;
				default: {
					const { x: posX, y: posY } = await getElementCenter(this.#context, origin.element);
					targetX = posX + offsetX + frameOffset.x;
					targetY = posY + offsetY + frameOffset.y;
					break;
				}
			}
			return {
				targetX,
				targetY
			};
		}
		async #dispatchScrollAction(_source, keyState, action) {
			const { deltaX: targetDeltaX, deltaY: targetDeltaY, x: offsetX, y: offsetY, origin = "viewport", duration = this.#tickDuration } = action;
			if (origin === "pointer") throw new protocol_js_1.InvalidArgumentException("\"pointer\" origin is invalid for scrolling.");
			const { targetX, targetY } = await this.#getCoordinateFromOrigin(origin, offsetX, offsetY, 0, 0);
			if (targetX < 0 || targetY < 0) throw new protocol_js_1.MoveTargetOutOfBoundsException(`Cannot move beyond viewport (x: ${targetX}, y: ${targetY})`);
			let currentDeltaX = 0;
			let currentDeltaY = 0;
			let last;
			do {
				const ratio = duration > 0 ? (performance.now() - this.#tickStart) / duration : 1;
				last = ratio >= 1;
				let deltaX;
				let deltaY;
				if (last) {
					deltaX = targetDeltaX - currentDeltaX;
					deltaY = targetDeltaY - currentDeltaY;
				} else {
					deltaX = Math.round(ratio * targetDeltaX - currentDeltaX);
					deltaY = Math.round(ratio * targetDeltaY - currentDeltaY);
				}
				if (deltaX !== 0 || deltaY !== 0) {
					const { modifiers } = keyState;
					await this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchMouseEvent", {
						type: "mouseWheel",
						deltaX,
						deltaY,
						x: targetX,
						y: targetY,
						modifiers
					});
					currentDeltaX += deltaX;
					currentDeltaY += deltaY;
				}
			} while (!last);
		}
		async #dispatchKeyDownAction(source, action) {
			const rawKey = action.value;
			if (!(0, graphemeTools_js_1.isSingleGrapheme)(rawKey)) throw new protocol_js_1.InvalidArgumentException(`Invalid key value: ${rawKey}`);
			const isGrapheme = (0, graphemeTools_js_1.isSingleComplexGrapheme)(rawKey);
			const key = (0, keyUtils_js_1.getNormalizedKey)(rawKey);
			const repeat = source.pressed.has(key);
			const code = (0, keyUtils_js_1.getKeyCode)(rawKey);
			const location = (0, keyUtils_js_1.getKeyLocation)(rawKey);
			switch (key) {
				case "Alt":
					source.alt = true;
					break;
				case "Shift":
					source.shift = true;
					break;
				case "Control":
					source.ctrl = true;
					break;
				case "Meta":
					source.meta = true;
					break;
			}
			source.pressed.add(key);
			const { modifiers } = source;
			const unmodifiedText = getKeyEventUnmodifiedText(key, source, isGrapheme);
			const text = getKeyEventText(code ?? "", source) ?? unmodifiedText;
			let command;
			if (this.#isMacOS && source.meta) switch (code) {
				case "KeyA":
					command = "SelectAll";
					break;
				case "KeyC":
					command = "Copy";
					break;
				case "KeyV":
					command = source.shift ? "PasteAndMatchStyle" : "Paste";
					break;
				case "KeyX":
					command = "Cut";
					break;
				case "KeyZ":
					command = source.shift ? "Redo" : "Undo";
					break;
				default:
			}
			const promises = [this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchKeyEvent", {
				type: text ? "keyDown" : "rawKeyDown",
				windowsVirtualKeyCode: USKeyboardLayout_js_1.KeyToKeyCode[key],
				key,
				code,
				text,
				unmodifiedText,
				autoRepeat: repeat,
				isSystemKey: source.alt || void 0,
				location: location < 3 ? location : void 0,
				isKeypad: location === 3,
				modifiers,
				commands: command ? [command] : void 0
			})];
			if (key === "Escape") {
				if (!source.alt && (this.#isMacOS && !source.ctrl && !source.meta || !this.#isMacOS)) promises.push(this.#context.cdpTarget.cdpClient.sendCommand("Input.cancelDragging"));
			}
			await Promise.all(promises);
		}
		#dispatchKeyUpAction(source, action) {
			const rawKey = action.value;
			if (!(0, graphemeTools_js_1.isSingleGrapheme)(rawKey)) throw new protocol_js_1.InvalidArgumentException(`Invalid key value: ${rawKey}`);
			const isGrapheme = (0, graphemeTools_js_1.isSingleComplexGrapheme)(rawKey);
			const key = (0, keyUtils_js_1.getNormalizedKey)(rawKey);
			if (!source.pressed.has(key)) return;
			const code = (0, keyUtils_js_1.getKeyCode)(rawKey);
			const location = (0, keyUtils_js_1.getKeyLocation)(rawKey);
			switch (key) {
				case "Alt":
					source.alt = false;
					break;
				case "Shift":
					source.shift = false;
					break;
				case "Control":
					source.ctrl = false;
					break;
				case "Meta":
					source.meta = false;
					break;
			}
			source.pressed.delete(key);
			const { modifiers } = source;
			const unmodifiedText = getKeyEventUnmodifiedText(key, source, isGrapheme);
			const text = getKeyEventText(code ?? "", source) ?? unmodifiedText;
			return this.#context.cdpTarget.cdpClient.sendCommand("Input.dispatchKeyEvent", {
				type: "keyUp",
				windowsVirtualKeyCode: USKeyboardLayout_js_1.KeyToKeyCode[key],
				key,
				code,
				text,
				unmodifiedText,
				location: location < 3 ? location : void 0,
				isSystemKey: source.alt || void 0,
				isKeypad: location === 3,
				modifiers
			});
		}
	};
	exports.ActionDispatcher = ActionDispatcher;
	/**
	* Translates a non-grapheme key to either an `undefined` for a special keys, or a single
	* character modified by shift if needed.
	*/
	var getKeyEventUnmodifiedText = (key, source, isGrapheme) => {
		if (isGrapheme) return key;
		if (key === "Enter") return "\r";
		return [...key].length === 1 ? source.shift ? key.toLocaleUpperCase("en-US") : key : void 0;
	};
	var getKeyEventText = (code, source) => {
		if (source.ctrl) {
			switch (code) {
				case "Digit2":
					if (source.shift) return "\0";
					break;
				case "KeyA": return "";
				case "KeyB": return "";
				case "KeyC": return "";
				case "KeyD": return "";
				case "KeyE": return "";
				case "KeyF": return "";
				case "KeyG": return "\x07";
				case "KeyH": return "\b";
				case "KeyI": return "	";
				case "KeyJ": return "\n";
				case "KeyK": return "\v";
				case "KeyL": return "\f";
				case "KeyM": return "\r";
				case "KeyN": return "";
				case "KeyO": return "";
				case "KeyP": return "";
				case "KeyQ": return "";
				case "KeyR": return "";
				case "KeyS": return "";
				case "KeyT": return "";
				case "KeyU": return "";
				case "KeyV": return "";
				case "KeyW": return "";
				case "KeyX": return "";
				case "KeyY": return "";
				case "KeyZ": return "";
				case "BracketLeft": return "\x1B";
				case "Backslash": return "";
				case "BracketRight": return "";
				case "Digit6":
					if (source.shift) return "";
					break;
				case "Minus": return "";
			}
			return "";
		}
		if (source.alt) return "";
	};
	function getCdpButton(button) {
		switch (button) {
			case 0: return "left";
			case 1: return "middle";
			case 2: return "right";
			case 3: return "back";
			case 4: return "forward";
			default: return "none";
		}
	}
	function getTilt(action) {
		const altitudeAngle = action.altitudeAngle ?? Math.PI / 2;
		const azimuthAngle = action.azimuthAngle ?? 0;
		let tiltXRadians = 0;
		let tiltYRadians = 0;
		if (altitudeAngle === 0) {
			if (azimuthAngle === 0 || azimuthAngle === 2 * Math.PI) tiltXRadians = Math.PI / 2;
			if (azimuthAngle === Math.PI / 2) tiltYRadians = Math.PI / 2;
			if (azimuthAngle === Math.PI) tiltXRadians = -Math.PI / 2;
			if (azimuthAngle === 3 * Math.PI / 2) tiltYRadians = -Math.PI / 2;
			if (azimuthAngle > 0 && azimuthAngle < Math.PI / 2) {
				tiltXRadians = Math.PI / 2;
				tiltYRadians = Math.PI / 2;
			}
			if (azimuthAngle > Math.PI / 2 && azimuthAngle < Math.PI) {
				tiltXRadians = -Math.PI / 2;
				tiltYRadians = Math.PI / 2;
			}
			if (azimuthAngle > Math.PI && azimuthAngle < 3 * Math.PI / 2) {
				tiltXRadians = -Math.PI / 2;
				tiltYRadians = -Math.PI / 2;
			}
			if (azimuthAngle > 3 * Math.PI / 2 && azimuthAngle < 2 * Math.PI) {
				tiltXRadians = Math.PI / 2;
				tiltYRadians = -Math.PI / 2;
			}
		}
		if (altitudeAngle !== 0) {
			const tanAlt = Math.tan(altitudeAngle);
			tiltXRadians = Math.atan(Math.cos(azimuthAngle) / tanAlt);
			tiltYRadians = Math.atan(Math.sin(azimuthAngle) / tanAlt);
		}
		const factor = 180 / Math.PI;
		return {
			tiltX: Math.round(tiltXRadians * factor),
			tiltY: Math.round(tiltYRadians * factor)
		};
	}
	function getRadii(width, height) {
		return {
			radiusX: width ? width / 2 : .5,
			radiusY: height ? height / 2 : .5
		};
	}
}));
var require_Mutex = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	* Copyright 2022 The Chromium Authors.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Mutex = void 0;
	/**
	* Use Mutex class to coordinate local concurrent operations.
	* Once `acquire` promise resolves, you hold the lock and must
	* call `release` function returned by `acquire` to release the
	* lock. Failing to `release` the lock may lead to deadlocks.
	*/
	var Mutex = class {
		#locked = false;
		#acquirers = [];
		acquire() {
			const state = { resolved: false };
			if (this.#locked) return new Promise((resolve) => {
				this.#acquirers.push(() => resolve(this.#release.bind(this, state)));
			});
			this.#locked = true;
			return Promise.resolve(this.#release.bind(this, state));
		}
		#release(state) {
			if (state.resolved) throw new Error("Cannot release more than once.");
			state.resolved = true;
			const resolve = this.#acquirers.shift();
			if (!resolve) {
				this.#locked = false;
				return;
			}
			resolve();
		}
		async run(action) {
			const release = await this.acquire();
			try {
				return await action();
			} finally {
				release();
			}
		}
	};
	exports.Mutex = Mutex;
}));
var require_InputState = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InputState = void 0;
	var protocol_js_1 = require_protocol();
	var Mutex_js_1 = require_Mutex();
	var InputSource_js_1 = require_InputSource();
	var InputState = class {
		cancelList = [];
		#sources = /* @__PURE__ */ new Map();
		#mutex = new Mutex_js_1.Mutex();
		getOrCreate(id, type, subtype) {
			let source = this.#sources.get(id);
			if (!source) {
				switch (type) {
					case "none":
						source = new InputSource_js_1.NoneSource();
						break;
					case "key":
						source = new InputSource_js_1.KeySource();
						break;
					case "pointer": {
						let pointerId = subtype === "mouse" ? 0 : 2;
						const pointerIds = /* @__PURE__ */ new Set();
						for (const [, source] of this.#sources) if (source.type === "pointer") pointerIds.add(source.pointerId);
						while (pointerIds.has(pointerId)) ++pointerId;
						source = new InputSource_js_1.PointerSource(pointerId, subtype);
						break;
					}
					case "wheel":
						source = new InputSource_js_1.WheelSource();
						break;
					default: throw new protocol_js_1.InvalidArgumentException(`Expected "none", "key", "pointer", or "wheel". Found unknown source type ${type}.`);
				}
				this.#sources.set(id, source);
				return source;
			}
			if (source.type !== type) throw new protocol_js_1.InvalidArgumentException(`Input source type of ${id} is ${source.type}, but received ${type}.`);
			return source;
		}
		get(id) {
			const source = this.#sources.get(id);
			if (!source) throw new protocol_js_1.UnknownErrorException(`Internal error.`);
			return source;
		}
		getGlobalKeyState() {
			const state = new InputSource_js_1.KeySource();
			for (const [, source] of this.#sources) {
				if (source.type !== "key") continue;
				for (const pressed of source.pressed) state.pressed.add(pressed);
				state.alt ||= source.alt;
				state.ctrl ||= source.ctrl;
				state.meta ||= source.meta;
				state.shift ||= source.shift;
			}
			return state;
		}
		get queue() {
			return this.#mutex;
		}
	};
	exports.InputState = InputState;
}));
var require_InputStateManager = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InputStateManager = void 0;
	var assert_js_1 = require_assert();
	var InputState_js_1 = require_InputState();
	var InputStateManager = class extends WeakMap {
		get(context) {
			(0, assert_js_1.assert)(context.isTopLevelContext());
			if (!this.has(context)) this.set(context, new InputState_js_1.InputState());
			return super.get(context);
		}
	};
	exports.InputStateManager = InputStateManager;
}));
var require_InputProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.InputProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var assert_js_1 = require_assert();
	var ActionDispatcher_js_1 = require_ActionDispatcher();
	var InputStateManager_js_1 = require_InputStateManager();
	var InputProcessor = class {
		#browsingContextStorage;
		#inputStateManager = new InputStateManager_js_1.InputStateManager();
		constructor(browsingContextStorage) {
			this.#browsingContextStorage = browsingContextStorage;
		}
		async performActions(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			const inputState = this.#inputStateManager.get(context.top);
			const actionsByTick = this.#getActionsByTick(params, inputState);
			await new ActionDispatcher_js_1.ActionDispatcher(inputState, this.#browsingContextStorage, params.context, await ActionDispatcher_js_1.ActionDispatcher.isMacOS(context).catch(() => false)).dispatchActions(actionsByTick);
			return {};
		}
		async releaseActions(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			const topContext = context.top;
			const inputState = this.#inputStateManager.get(topContext);
			await new ActionDispatcher_js_1.ActionDispatcher(inputState, this.#browsingContextStorage, params.context, await ActionDispatcher_js_1.ActionDispatcher.isMacOS(context).catch(() => false)).dispatchTickActions(inputState.cancelList.reverse());
			this.#inputStateManager.delete(topContext);
			return {};
		}
		async setFiles(params) {
			const hiddenSandboxRealm = await this.#browsingContextStorage.getContext(params.context).getOrCreateHiddenSandbox();
			let result;
			try {
				result = await hiddenSandboxRealm.callFunction(String(function getFiles(fileListLength) {
					if (!(this instanceof HTMLInputElement)) {
						if (this instanceof Element) return 1;
						return 0;
					}
					if (this.type !== "file") return 2;
					if (this.disabled) return 3;
					if (fileListLength > 1 && !this.multiple) return 4;
				}), false, params.element, [{
					type: "number",
					value: params.files.length
				}]);
			} catch {
				throw new protocol_js_1.NoSuchNodeException(`Could not find element ${params.element.sharedId}`);
			}
			(0, assert_js_1.assert)(result.type === "success");
			if (result.result.type === "number") switch (result.result.value) {
				case 0: throw new protocol_js_1.NoSuchElementException(`Could not find element ${params.element.sharedId}`);
				case 1: throw new protocol_js_1.UnableToSetFileInputException(`Element ${params.element.sharedId} is not a input`);
				case 2: throw new protocol_js_1.UnableToSetFileInputException(`Input element ${params.element.sharedId} is not a file type`);
				case 3: throw new protocol_js_1.UnableToSetFileInputException(`Input element ${params.element.sharedId} is disabled`);
				case 4: throw new protocol_js_1.UnableToSetFileInputException(`Cannot set multiple files on a non-multiple input element`);
			}
			/**
			* The zero-length array is a special case, it seems that
			* DOM.setFileInputFiles does not actually update the files in that case, so
			* the solution is to eval the element value to a new FileList directly.
			*/
			if (params.files.length === 0) {
				await hiddenSandboxRealm.callFunction(String(function dispatchEvent() {
					if (this.files?.length === 0) {
						this.dispatchEvent(new Event("cancel", { bubbles: true }));
						return;
					}
					this.files = new DataTransfer().files;
					this.dispatchEvent(new Event("input", {
						bubbles: true,
						composed: true
					}));
					this.dispatchEvent(new Event("change", { bubbles: true }));
				}), false, params.element);
				return {};
			}
			const paths = [];
			for (let i = 0; i < params.files.length; ++i) {
				const result = await hiddenSandboxRealm.callFunction(String(function getFiles(index) {
					return this.files?.item(index);
				}), false, params.element, [{
					type: "number",
					value: 0
				}], "root");
				(0, assert_js_1.assert)(result.type === "success");
				if (result.result.type !== "object") break;
				const { handle } = result.result;
				(0, assert_js_1.assert)(handle !== void 0);
				const { path } = await hiddenSandboxRealm.cdpClient.sendCommand("DOM.getFileInfo", { objectId: handle });
				paths.push(path);
				hiddenSandboxRealm.disown(handle).catch(void 0);
			}
			paths.sort();
			const sortedFiles = [...params.files].sort();
			if (paths.length !== params.files.length || sortedFiles.some((path, index) => {
				return paths[index] !== path;
			})) {
				const { objectId } = await hiddenSandboxRealm.deserializeForCdp(params.element);
				(0, assert_js_1.assert)(objectId !== void 0);
				await hiddenSandboxRealm.cdpClient.sendCommand("DOM.setFileInputFiles", {
					files: params.files,
					objectId
				});
			} else await hiddenSandboxRealm.callFunction(String(function dispatchEvent() {
				this.dispatchEvent(new Event("cancel", { bubbles: true }));
			}), false, params.element);
			return {};
		}
		#getActionsByTick(params, inputState) {
			const actionsByTick = [];
			for (const action of params.actions) {
				switch (action.type) {
					case "pointer": {
						action.parameters ??= { pointerType: "mouse" };
						action.parameters.pointerType ??= "mouse";
						const source = inputState.getOrCreate(action.id, "pointer", action.parameters.pointerType);
						if (source.subtype !== action.parameters.pointerType) throw new protocol_js_1.InvalidArgumentException(`Expected input source ${action.id} to be ${source.subtype}; got ${action.parameters.pointerType}.`);
						source.resetClickCount();
						break;
					}
					default: inputState.getOrCreate(action.id, action.type);
				}
				const actions = action.actions.map((item) => ({
					id: action.id,
					action: item
				}));
				for (let i = 0; i < actions.length; i++) {
					if (actionsByTick.length === i) actionsByTick.push([]);
					actionsByTick[i].push(actions[i]);
				}
			}
			return actionsByTick;
		}
	};
	exports.InputProcessor = InputProcessor;
}));
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.base64ToString = base64ToString;
	/**
	* Encodes a string to base64.
	*
	* Uses the native Web API if available, otherwise falls back to a NodeJS Buffer.
	* @param {string} base64Str
	* @return {string}
	*/
	function base64ToString(base64Str) {
		if ("atob" in globalThis) return globalThis.atob(base64Str);
		return Buffer.from(base64Str, "base64").toString("ascii");
	}
}));
var require_NetworkUtils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.computeHeadersSize = computeHeadersSize;
	exports.stringToBase64 = stringToBase64;
	exports.bidiNetworkHeadersFromCdpNetworkHeaders = bidiNetworkHeadersFromCdpNetworkHeaders;
	exports.bidiNetworkHeadersFromCdpNetworkHeadersEntries = bidiNetworkHeadersFromCdpNetworkHeadersEntries;
	exports.cdpNetworkHeadersFromBidiNetworkHeaders = cdpNetworkHeadersFromBidiNetworkHeaders;
	exports.bidiNetworkHeadersFromCdpFetchHeaders = bidiNetworkHeadersFromCdpFetchHeaders;
	exports.cdpFetchHeadersFromBidiNetworkHeaders = cdpFetchHeadersFromBidiNetworkHeaders;
	exports.networkHeaderFromCookieHeaders = networkHeaderFromCookieHeaders;
	exports.cdpAuthChallengeResponseFromBidiAuthContinueWithAuthAction = cdpAuthChallengeResponseFromBidiAuthContinueWithAuthAction;
	exports.cdpToBiDiCookie = cdpToBiDiCookie;
	exports.deserializeByteValue = deserializeByteValue;
	exports.bidiToCdpCookie = bidiToCdpCookie;
	exports.sameSiteBiDiToCdp = sameSiteBiDiToCdp;
	exports.isSpecialScheme = isSpecialScheme;
	exports.matchUrlPattern = matchUrlPattern;
	exports.bidiBodySizeFromCdpPostDataEntries = bidiBodySizeFromCdpPostDataEntries;
	exports.getTiming = getTiming;
	var ErrorResponse_js_1 = require_ErrorResponse();
	var base64_js_1 = require_base64();
	function computeHeadersSize(headers) {
		const requestHeaders = headers.reduce((acc, header) => {
			return `${acc}${header.name}: ${header.value.value}\r\n`;
		}, "");
		return new TextEncoder().encode(requestHeaders).length;
	}
	function stringToBase64(str) {
		return typedArrayToBase64(new TextEncoder().encode(str));
	}
	function typedArrayToBase64(typedArray) {
		const chunkSize = 65534;
		const chunks = [];
		for (let i = 0; i < typedArray.length; i += chunkSize) {
			const chunk = typedArray.subarray(i, i + chunkSize);
			chunks.push(String.fromCodePoint.apply(null, chunk));
		}
		const binaryString = chunks.join("");
		return btoa(binaryString);
	}
	/** Converts from CDP Network domain headers to BiDi network headers. */
	function bidiNetworkHeadersFromCdpNetworkHeaders(headers) {
		if (!headers) return [];
		return Object.entries(headers).map(([name, value]) => ({
			name,
			value: {
				type: "string",
				value
			}
		}));
	}
	/** Converts from CDP Fetch domain headers to BiDi network headers. */
	function bidiNetworkHeadersFromCdpNetworkHeadersEntries(headers) {
		if (!headers) return [];
		return headers.map(({ name, value }) => ({
			name,
			value: {
				type: "string",
				value
			}
		}));
	}
	/** Converts from Bidi network headers to CDP Network domain headers. */
	function cdpNetworkHeadersFromBidiNetworkHeaders(headers) {
		if (headers === void 0) return;
		return headers.reduce((result, header) => {
			result[header.name] = header.value.value;
			return result;
		}, {});
	}
	/** Converts from CDP Fetch domain header entries to Bidi network headers. */
	function bidiNetworkHeadersFromCdpFetchHeaders(headers) {
		if (!headers) return [];
		return headers.map(({ name, value }) => ({
			name,
			value: {
				type: "string",
				value
			}
		}));
	}
	/** Converts from Bidi network headers to CDP Fetch domain header entries. */
	function cdpFetchHeadersFromBidiNetworkHeaders(headers) {
		if (headers === void 0) return;
		return headers.map(({ name, value }) => ({
			name,
			value: value.value
		}));
	}
	function networkHeaderFromCookieHeaders(headers) {
		if (headers === void 0) return;
		return {
			name: "Cookie",
			value: {
				type: "string",
				value: headers.reduce((acc, value, index) => {
					if (index > 0) acc += ";";
					const cookieValue = value.value.type === "base64" ? btoa(value.value.value) : value.value.value;
					acc += `${value.name}=${cookieValue}`;
					return acc;
				}, "")
			}
		};
	}
	/** Converts from Bidi auth action to CDP auth challenge response. */
	function cdpAuthChallengeResponseFromBidiAuthContinueWithAuthAction(action) {
		switch (action) {
			case "default": return "Default";
			case "cancel": return "CancelAuth";
			case "provideCredentials": return "ProvideCredentials";
		}
	}
	/**
	* Converts from CDP Network domain cookie to BiDi network cookie.
	* * https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Cookie
	* * https://w3c.github.io/webdriver-bidi/#type-network-Cookie
	*/
	function cdpToBiDiCookie(cookie) {
		const result = {
			name: cookie.name,
			value: {
				type: "string",
				value: cookie.value
			},
			domain: cookie.domain,
			path: cookie.path,
			size: cookie.size,
			httpOnly: cookie.httpOnly,
			secure: cookie.secure,
			sameSite: cookie.sameSite === void 0 ? "none" : sameSiteCdpToBiDi(cookie.sameSite),
			...cookie.expires >= 0 ? { expiry: Math.round(cookie.expires) } : void 0
		};
		result[`goog:session`] = cookie.session;
		result[`goog:priority`] = cookie.priority;
		result[`goog:sourceScheme`] = cookie.sourceScheme;
		result[`goog:sourcePort`] = cookie.sourcePort;
		if (cookie.partitionKey !== void 0) result[`goog:partitionKey`] = cookie.partitionKey;
		if (cookie.partitionKeyOpaque !== void 0) result[`goog:partitionKeyOpaque`] = cookie.partitionKeyOpaque;
		return result;
	}
	/**
	* Decodes a byte value to a string.
	* @param {Network.BytesValue} value
	* @return {string}
	*/
	function deserializeByteValue(value) {
		if (value.type === "base64") return (0, base64_js_1.base64ToString)(value.value);
		return value.value;
	}
	/**
	* Converts from BiDi set network cookie params to CDP Network domain cookie.
	* * https://w3c.github.io/webdriver-bidi/#type-network-Cookie
	* * https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam
	*/
	function bidiToCdpCookie(params, partitionKey) {
		const deserializedValue = deserializeByteValue(params.cookie.value);
		const result = {
			name: params.cookie.name,
			value: deserializedValue,
			domain: params.cookie.domain,
			path: params.cookie.path ?? "/",
			secure: params.cookie.secure ?? false,
			httpOnly: params.cookie.httpOnly ?? false,
			...partitionKey.sourceOrigin !== void 0 && { partitionKey: {
				hasCrossSiteAncestor: false,
				topLevelSite: partitionKey.sourceOrigin
			} },
			...params.cookie.expiry !== void 0 && { expires: params.cookie.expiry },
			...params.cookie.sameSite !== void 0 && { sameSite: sameSiteBiDiToCdp(params.cookie.sameSite) }
		};
		if (params.cookie[`goog:url`] !== void 0) result.url = params.cookie[`goog:url`];
		if (params.cookie[`goog:priority`] !== void 0) result.priority = params.cookie[`goog:priority`];
		if (params.cookie[`goog:sourceScheme`] !== void 0) result.sourceScheme = params.cookie[`goog:sourceScheme`];
		if (params.cookie[`goog:sourcePort`] !== void 0) result.sourcePort = params.cookie[`goog:sourcePort`];
		return result;
	}
	function sameSiteCdpToBiDi(sameSite) {
		switch (sameSite) {
			case "Strict": return "strict";
			case "None": return "none";
			case "Lax": return "lax";
			default: return "lax";
		}
	}
	function sameSiteBiDiToCdp(sameSite) {
		switch (sameSite) {
			case "none": return "None";
			case "strict": return "Strict";
			case "default":
			case "lax": return "Lax";
		}
		throw new ErrorResponse_js_1.InvalidArgumentException(`Unknown 'sameSite' value ${sameSite}`);
	}
	/**
	* Returns true if the given protocol is special.
	* Special protocols are those that have a default port.
	*
	* Example inputs: 'http', 'http:'
	*
	* @see https://url.spec.whatwg.org/#special-scheme
	*/
	function isSpecialScheme(protocol) {
		return [
			"ftp",
			"file",
			"http",
			"https",
			"ws",
			"wss"
		].includes(protocol.replace(/:$/, ""));
	}
	function getScheme(url) {
		return url.protocol.replace(/:$/, "");
	}
	/** Matches the given URLPattern against the given URL. */
	function matchUrlPattern(pattern, url) {
		const parsedUrl = new URL(url);
		if (pattern.protocol !== void 0 && pattern.protocol !== getScheme(parsedUrl)) return false;
		if (pattern.hostname !== void 0 && pattern.hostname !== parsedUrl.hostname) return false;
		if (pattern.port !== void 0 && pattern.port !== parsedUrl.port) return false;
		if (pattern.pathname !== void 0 && pattern.pathname !== parsedUrl.pathname) return false;
		if (pattern.search !== void 0 && pattern.search !== parsedUrl.search) return false;
		return true;
	}
	function bidiBodySizeFromCdpPostDataEntries(entries) {
		let size = 0;
		for (const entry of entries) size += atob(entry.bytes ?? "").length;
		return size;
	}
	function getTiming(timing, offset = 0) {
		if (!timing) return 0;
		if (timing <= 0 || timing + offset <= 0) return 0;
		return timing + offset;
	}
}));
var require_NetworkProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NetworkProcessor = void 0;
	exports.parseBiDiHeaders = parseBiDiHeaders;
	var protocol_js_1 = require_protocol();
	var NetworkUtils_js_1 = require_NetworkUtils();
	exports.NetworkProcessor = class NetworkProcessor {
		#browsingContextStorage;
		#networkStorage;
		#userContextStorage;
		#contextConfigStorage;
		constructor(browsingContextStorage, networkStorage, userContextStorage, contextConfigStorage) {
			this.#userContextStorage = userContextStorage;
			this.#browsingContextStorage = browsingContextStorage;
			this.#networkStorage = networkStorage;
			this.#contextConfigStorage = contextConfigStorage;
		}
		async addIntercept(params) {
			this.#browsingContextStorage.verifyTopLevelContextsList(params.contexts);
			const urlPatterns = params.urlPatterns ?? [];
			const parsedUrlPatterns = NetworkProcessor.parseUrlPatterns(urlPatterns);
			const intercept = this.#networkStorage.addIntercept({
				urlPatterns: parsedUrlPatterns,
				phases: params.phases,
				contexts: params.contexts
			});
			await this.#toggleNetwork();
			return { intercept };
		}
		async continueRequest(params) {
			if (params.url !== void 0) NetworkProcessor.parseUrlString(params.url);
			if (params.method !== void 0) {
				if (!NetworkProcessor.isMethodValid(params.method)) throw new protocol_js_1.InvalidArgumentException(`Method '${params.method}' is invalid.`);
			}
			if (params.headers) NetworkProcessor.validateHeaders(params.headers);
			const request = this.#getBlockedRequestOrFail(params.request, ["beforeRequestSent"]);
			try {
				await request.continueRequest(params);
			} catch (error) {
				throw NetworkProcessor.wrapInterceptionError(error);
			}
			return {};
		}
		async continueResponse(params) {
			if (params.headers) NetworkProcessor.validateHeaders(params.headers);
			const request = this.#getBlockedRequestOrFail(params.request, ["authRequired", "responseStarted"]);
			try {
				await request.continueResponse(params);
			} catch (error) {
				throw NetworkProcessor.wrapInterceptionError(error);
			}
			return {};
		}
		async continueWithAuth(params) {
			const networkId = params.request;
			await this.#getBlockedRequestOrFail(networkId, ["authRequired"]).continueWithAuth(params);
			return {};
		}
		async failRequest({ request: networkId }) {
			const request = this.#getRequestOrFail(networkId);
			if (request.interceptPhase === "authRequired") throw new protocol_js_1.InvalidArgumentException(`Request '${networkId}' in 'authRequired' phase cannot be failed`);
			if (!request.interceptPhase) throw new protocol_js_1.NoSuchRequestException(`No blocked request found for network id '${networkId}'`);
			await request.failRequest("Failed");
			return {};
		}
		async provideResponse(params) {
			if (params.headers) NetworkProcessor.validateHeaders(params.headers);
			const request = this.#getBlockedRequestOrFail(params.request, [
				"beforeRequestSent",
				"responseStarted",
				"authRequired"
			]);
			try {
				await request.provideResponse(params);
			} catch (error) {
				throw NetworkProcessor.wrapInterceptionError(error);
			}
			return {};
		}
		/**
		* In some states CDP Network and Fetch domains are not required, but in some they have
		* to be updated. Whenever potential change in these kinds of states is introduced,
		* update the states of all the CDP targets.
		*/
		async #toggleNetwork() {
			await Promise.all(this.#browsingContextStorage.getAllContexts().map((context) => {
				return context.cdpTarget.toggleNetwork();
			}));
		}
		async removeIntercept(params) {
			this.#networkStorage.removeIntercept(params.intercept);
			await this.#toggleNetwork();
			return {};
		}
		async setCacheBehavior(params) {
			const contexts = this.#browsingContextStorage.verifyTopLevelContextsList(params.contexts);
			if (contexts.size === 0) {
				this.#networkStorage.defaultCacheBehavior = params.cacheBehavior;
				await Promise.all(this.#browsingContextStorage.getAllContexts().map((context) => {
					return context.cdpTarget.toggleSetCacheDisabled();
				}));
				return {};
			}
			const cacheDisabled = params.cacheBehavior === "bypass";
			await Promise.all([...contexts.values()].map((context) => {
				return context.cdpTarget.toggleSetCacheDisabled(cacheDisabled);
			}));
			return {};
		}
		#getRequestOrFail(id) {
			const request = this.#networkStorage.getRequestById(id);
			if (!request) throw new protocol_js_1.NoSuchRequestException(`Network request with ID '${id}' doesn't exist`);
			return request;
		}
		#getBlockedRequestOrFail(id, phases) {
			const request = this.#getRequestOrFail(id);
			if (!request.interceptPhase) throw new protocol_js_1.NoSuchRequestException(`No blocked request found for network id '${id}'`);
			if (request.interceptPhase && !phases.includes(request.interceptPhase)) throw new protocol_js_1.InvalidArgumentException(`Blocked request for network id '${id}' is in '${request.interceptPhase}' phase`);
			return request;
		}
		/**
		* Validate https://fetch.spec.whatwg.org/#header-value
		*/
		static validateHeaders(headers) {
			for (const header of headers) {
				let headerValue;
				if (header.value.type === "string") headerValue = header.value.value;
				else headerValue = atob(header.value.value);
				if (headerValue !== headerValue.trim() || headerValue.includes("\n") || headerValue.includes("\0")) throw new protocol_js_1.InvalidArgumentException(`Header value '${headerValue}' is not acceptable value`);
			}
		}
		static isMethodValid(method) {
			return /^[!#$%&'*+\-.^_`|~a-zA-Z\d]+$/.test(method);
		}
		/**
		* Attempts to parse the given url.
		* Throws an InvalidArgumentException if the url is invalid.
		*/
		static parseUrlString(url) {
			try {
				return new URL(url);
			} catch (error) {
				throw new protocol_js_1.InvalidArgumentException(`Invalid URL '${url}': ${error}`);
			}
		}
		static parseUrlPatterns(urlPatterns) {
			return urlPatterns.map((urlPattern) => {
				let patternUrl = "";
				let hasProtocol = true;
				let hasHostname = true;
				let hasPort = true;
				let hasPathname = true;
				let hasSearch = true;
				switch (urlPattern.type) {
					case "string":
						patternUrl = unescapeURLPattern(urlPattern.pattern);
						break;
					case "pattern": {
						if (urlPattern.protocol === void 0) {
							hasProtocol = false;
							patternUrl += "http";
						} else {
							if (urlPattern.protocol === "") throw new protocol_js_1.InvalidArgumentException("URL pattern must specify a protocol");
							urlPattern.protocol = unescapeURLPattern(urlPattern.protocol);
							if (!urlPattern.protocol.match(/^[a-zA-Z+-.]+$/)) throw new protocol_js_1.InvalidArgumentException("Forbidden characters");
							patternUrl += urlPattern.protocol;
						}
						const scheme = patternUrl.toLocaleLowerCase();
						patternUrl += ":";
						if ((0, NetworkUtils_js_1.isSpecialScheme)(scheme)) patternUrl += "//";
						if (urlPattern.hostname === void 0) {
							if (scheme !== "file") patternUrl += "placeholder";
							hasHostname = false;
						} else {
							if (urlPattern.hostname === "") throw new protocol_js_1.InvalidArgumentException("URL pattern must specify a hostname");
							if (urlPattern.protocol === "file") throw new protocol_js_1.InvalidArgumentException(`URL pattern protocol cannot be 'file'`);
							urlPattern.hostname = unescapeURLPattern(urlPattern.hostname);
							let insideBrackets = false;
							for (const c of urlPattern.hostname) {
								if (c === "/" || c === "?" || c === "#") throw new protocol_js_1.InvalidArgumentException(`'/', '?', '#' are forbidden in hostname`);
								if (!insideBrackets && c === ":") throw new protocol_js_1.InvalidArgumentException(`':' is only allowed inside brackets in hostname`);
								if (c === "[") insideBrackets = true;
								if (c === "]") insideBrackets = false;
							}
							patternUrl += urlPattern.hostname;
						}
						if (urlPattern.port === void 0) hasPort = false;
						else {
							if (urlPattern.port === "") throw new protocol_js_1.InvalidArgumentException(`URL pattern must specify a port`);
							urlPattern.port = unescapeURLPattern(urlPattern.port);
							patternUrl += ":";
							if (!urlPattern.port.match(/^\d+$/)) throw new protocol_js_1.InvalidArgumentException("Forbidden characters");
							patternUrl += urlPattern.port;
						}
						if (urlPattern.pathname === void 0) hasPathname = false;
						else {
							urlPattern.pathname = unescapeURLPattern(urlPattern.pathname);
							if (urlPattern.pathname[0] !== "/") patternUrl += "/";
							if (urlPattern.pathname.includes("#") || urlPattern.pathname.includes("?")) throw new protocol_js_1.InvalidArgumentException("Forbidden characters");
							patternUrl += urlPattern.pathname;
						}
						if (urlPattern.search === void 0) hasSearch = false;
						else {
							urlPattern.search = unescapeURLPattern(urlPattern.search);
							if (urlPattern.search[0] !== "?") patternUrl += "?";
							if (urlPattern.search.includes("#")) throw new protocol_js_1.InvalidArgumentException("Forbidden characters");
							patternUrl += urlPattern.search;
						}
						break;
					}
				}
				const serializePort = (url) => {
					const defaultPorts = {
						"ftp:": 21,
						"file:": null,
						"http:": 80,
						"https:": 443,
						"ws:": 80,
						"wss:": 443
					};
					if ((0, NetworkUtils_js_1.isSpecialScheme)(url.protocol) && defaultPorts[url.protocol] !== null && (!url.port || String(defaultPorts[url.protocol]) === url.port)) return "";
					else if (url.port) return url.port;
				};
				try {
					const url = new URL(patternUrl);
					return {
						protocol: hasProtocol ? url.protocol.replace(/:$/, "") : void 0,
						hostname: hasHostname ? url.hostname : void 0,
						port: hasPort ? serializePort(url) : void 0,
						pathname: hasPathname && url.pathname ? url.pathname : void 0,
						search: hasSearch ? url.search : void 0
					};
				} catch (err) {
					throw new protocol_js_1.InvalidArgumentException(`${err.message} '${patternUrl}'`);
				}
			});
		}
		static wrapInterceptionError(error) {
			if (error?.message.includes("Invalid header") || error?.message.includes("Unsafe header")) return new protocol_js_1.InvalidArgumentException(error.message);
			return error;
		}
		async addDataCollector(params) {
			if (params.userContexts !== void 0 && params.contexts !== void 0) throw new protocol_js_1.InvalidArgumentException("'contexts' and 'userContexts' are mutually exclusive");
			if (params.userContexts !== void 0) await this.#userContextStorage.verifyUserContextIdList(params.userContexts);
			if (params.contexts !== void 0) {
				for (const browsingContextId of params.contexts) if (!this.#browsingContextStorage.getContext(browsingContextId).isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException(`Data collectors are available only on top-level browsing contexts`);
			}
			const collectorId = this.#networkStorage.addDataCollector(params);
			await this.#toggleNetwork();
			return { collector: collectorId };
		}
		async getData(params) {
			return await this.#networkStorage.getCollectedData(params);
		}
		async removeDataCollector(params) {
			this.#networkStorage.removeDataCollector(params);
			await this.#toggleNetwork();
			return {};
		}
		disownData(params) {
			this.#networkStorage.disownData(params);
			return {};
		}
		async #getRelatedTopLevelBrowsingContexts(browsingContextIds, userContextIds) {
			if (browsingContextIds === void 0 && userContextIds === void 0) return this.#browsingContextStorage.getTopLevelContexts();
			if (browsingContextIds !== void 0 && userContextIds !== void 0) throw new protocol_js_1.InvalidArgumentException("User contexts and browsing contexts are mutually exclusive");
			const result = [];
			if (userContextIds !== void 0) {
				if (userContextIds.length === 0) throw new protocol_js_1.InvalidArgumentException("user context should be provided");
				await this.#userContextStorage.verifyUserContextIdList(userContextIds);
				for (const userContextId of userContextIds) {
					const topLevelBrowsingContexts = this.#browsingContextStorage.getTopLevelContexts().filter((browsingContext) => browsingContext.userContext === userContextId);
					result.push(...topLevelBrowsingContexts);
				}
			}
			if (browsingContextIds !== void 0) {
				if (browsingContextIds.length === 0) throw new protocol_js_1.InvalidArgumentException("browsing context should be provided");
				for (const browsingContextId of browsingContextIds) {
					const browsingContext = this.#browsingContextStorage.getContext(browsingContextId);
					if (!browsingContext.isTopLevelContext()) throw new protocol_js_1.InvalidArgumentException("The command is only supported on the top-level context");
					result.push(browsingContext);
				}
			}
			return [...new Set(result).values()];
		}
		async setExtraHeaders(params) {
			const affectedBrowsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
			const cdpExtraHeaders = parseBiDiHeaders(params.headers);
			if (params.userContexts === void 0 && params.contexts === void 0) this.#contextConfigStorage.updateGlobalConfig({ extraHeaders: cdpExtraHeaders });
			if (params.userContexts !== void 0) params.userContexts.forEach((userContext) => {
				this.#contextConfigStorage.updateUserContextConfig(userContext, { extraHeaders: cdpExtraHeaders });
			});
			if (params.contexts !== void 0) params.contexts.forEach((browsingContextId) => {
				this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { extraHeaders: cdpExtraHeaders });
			});
			await Promise.all(affectedBrowsingContexts.map(async (context) => {
				const extraHeaders = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext).extraHeaders ?? {};
				await context.setExtraHeaders(extraHeaders);
			}));
			return {};
		}
	};
	/**
	* See https://w3c.github.io/webdriver-bidi/#unescape-url-pattern
	*/
	function unescapeURLPattern(pattern) {
		const forbidden = new Set([
			"(",
			")",
			"*",
			"{",
			"}"
		]);
		let result = "";
		let isEscaped = false;
		for (const c of pattern) {
			if (!isEscaped) {
				if (forbidden.has(c)) throw new protocol_js_1.InvalidArgumentException("Forbidden characters");
				if (c === "\\") {
					isEscaped = true;
					continue;
				}
			}
			result += c;
			isEscaped = false;
		}
		return result;
	}
	var FORBIDDEN_HEADER_NAME_SYMBOLS = new Set([
		" ",
		"	",
		"\n",
		"\"",
		"(",
		")",
		",",
		"/",
		":",
		";",
		"<",
		"=",
		">",
		"?",
		"@",
		"[",
		"\\",
		"]",
		"{",
		"}"
	]);
	var FORBIDDEN_HEADER_VALUE_SYMBOLS = new Set([
		"\0",
		"\n",
		"\r"
	]);
	function includesChar(str, chars) {
		for (const char of str) if (chars.has(char)) return true;
		return false;
	}
	function parseBiDiHeaders(headers) {
		const parsedHeaders = {};
		for (const bidiHeader of headers) if (bidiHeader.value.type === "string") {
			const name = bidiHeader.name;
			const value = bidiHeader.value.value;
			if (name.length === 0) throw new protocol_js_1.InvalidArgumentException(`Empty header name is not allowed`);
			if (includesChar(name, FORBIDDEN_HEADER_NAME_SYMBOLS)) throw new protocol_js_1.InvalidArgumentException(`Header name '${name}' contains forbidden symbols`);
			if (includesChar(value, FORBIDDEN_HEADER_VALUE_SYMBOLS)) throw new protocol_js_1.InvalidArgumentException(`Header value '${value}' contains forbidden symbols`);
			if (value.trim() !== value) throw new protocol_js_1.InvalidArgumentException(`Header value should not contain trailing or ending whitespaces`);
			parsedHeaders[bidiHeader.name] = bidiHeader.value.value;
		} else throw new protocol_js_1.UnsupportedOperationException("Only string headers values are supported");
		return parsedHeaders;
	}
}));
var require_PermissionsProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PermissionsProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var PermissionsProcessor = class {
		#browserCdpClient;
		constructor(browserCdpClient) {
			this.#browserCdpClient = browserCdpClient;
		}
		async setPermissions(params) {
			try {
				const userContextId = params["goog:userContext"] || params.userContext;
				await this.#browserCdpClient.sendCommand("Browser.setPermission", {
					origin: params.origin,
					embeddedOrigin: params.embeddedOrigin,
					browserContextId: userContextId && userContextId !== "default" ? userContextId : void 0,
					permission: { name: params.descriptor.name },
					setting: params.state
				});
			} catch (err) {
				if (err.message === `Permission can't be granted to opaque origins.`) return {};
				throw new protocol_js_1.InvalidArgumentException(err.message);
			}
			return {};
		}
	};
	exports.PermissionsProcessor = PermissionsProcessor;
}));
var require_uuid = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.uuidv4 = uuidv4;
	function bytesToHex(bytes) {
		return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
	}
	/**
	* Generates a random v4 UUID, as specified in RFC4122.
	*
	* Uses the native Web Crypto API if available, otherwise falls back to a
	* polyfill.
	*
	* Example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
	*/
	function uuidv4() {
		if ("crypto" in globalThis && "randomUUID" in globalThis.crypto) return globalThis.crypto.randomUUID();
		const randomValues = new Uint8Array(16);
		if ("crypto" in globalThis && "getRandomValues" in globalThis.crypto) globalThis.crypto.getRandomValues(randomValues);
		else __require("crypto").webcrypto.getRandomValues(randomValues);
		randomValues[6] = randomValues[6] & 15 | 64;
		randomValues[8] = randomValues[8] & 63 | 128;
		return [
			bytesToHex(randomValues.subarray(0, 4)),
			bytesToHex(randomValues.subarray(4, 6)),
			bytesToHex(randomValues.subarray(6, 8)),
			bytesToHex(randomValues.subarray(8, 10)),
			bytesToHex(randomValues.subarray(10, 16))
		].join("-");
	}
}));
var require_ChannelProxy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ChannelProxy = void 0;
	var protocol_js_1 = require_protocol();
	var log_js_1 = require_log();
	var uuid_js_1 = require_uuid();
	exports.ChannelProxy = class ChannelProxy {
		#properties;
		#id = (0, uuid_js_1.uuidv4)();
		#logger;
		constructor(channel, logger) {
			this.#properties = channel;
			this.#logger = logger;
		}
		/**
		* Creates a channel proxy in the given realm, initialises listener and
		* returns a handle to `sendMessage` delegate.
		*/
		async init(realm, eventManager) {
			const channelHandle = await ChannelProxy.#createAndGetHandleInRealm(realm);
			const sendMessageHandle = await ChannelProxy.#createSendMessageHandle(realm, channelHandle);
			this.#startListener(realm, channelHandle, eventManager);
			return sendMessageHandle;
		}
		/** Gets a ChannelProxy from window and returns its handle. */
		async startListenerFromWindow(realm, eventManager) {
			try {
				const channelHandle = await this.#getHandleFromWindow(realm);
				this.#startListener(realm, channelHandle, eventManager);
			} catch (error) {
				this.#logger?.(log_js_1.LogType.debugError, error);
			}
		}
		/**
		* Evaluation string which creates a ChannelProxy object on the client side.
		*/
		static #createChannelProxyEvalStr() {
			return `(${String(() => {
				const queue = [];
				let queueNonEmptyResolver = null;
				return {
					async getMessage() {
						await (queue.length > 0 ? Promise.resolve() : new Promise((resolve) => {
							queueNonEmptyResolver = resolve;
						}));
						return queue.shift();
					},
					sendMessage(message) {
						queue.push(message);
						if (queueNonEmptyResolver !== null) {
							queueNonEmptyResolver();
							queueNonEmptyResolver = null;
						}
					}
				};
			})})()`;
		}
		/** Creates a ChannelProxy in the given realm. */
		static async #createAndGetHandleInRealm(realm) {
			const createChannelHandleResult = await realm.cdpClient.sendCommand("Runtime.evaluate", {
				expression: this.#createChannelProxyEvalStr(),
				contextId: realm.executionContextId,
				serializationOptions: { serialization: "idOnly" }
			});
			if (createChannelHandleResult.exceptionDetails || createChannelHandleResult.result.objectId === void 0) throw new Error(`Cannot create channel`);
			return createChannelHandleResult.result.objectId;
		}
		/** Gets a handle to `sendMessage` delegate from the ChannelProxy handle. */
		static async #createSendMessageHandle(realm, channelHandle) {
			return (await realm.cdpClient.sendCommand("Runtime.callFunctionOn", {
				functionDeclaration: String((channelHandle) => {
					return channelHandle.sendMessage;
				}),
				arguments: [{ objectId: channelHandle }],
				executionContextId: realm.executionContextId,
				serializationOptions: { serialization: "idOnly" }
			})).result.objectId;
		}
		/** Starts listening for the channel events of the provided ChannelProxy. */
		async #startListener(realm, channelHandle, eventManager) {
			for (;;) try {
				const message = await realm.cdpClient.sendCommand("Runtime.callFunctionOn", {
					functionDeclaration: String(async (channelHandle) => await channelHandle.getMessage()),
					arguments: [{ objectId: channelHandle }],
					awaitPromise: true,
					executionContextId: realm.executionContextId,
					serializationOptions: {
						serialization: "deep",
						maxDepth: this.#properties.serializationOptions?.maxObjectDepth ?? void 0
					}
				});
				if (message.exceptionDetails) throw new Error("Runtime.callFunctionOn in ChannelProxy", { cause: message.exceptionDetails });
				for (const browsingContext of realm.associatedBrowsingContexts) eventManager.registerEvent({
					type: "event",
					method: protocol_js_1.ChromiumBidi.Script.EventNames.Message,
					params: {
						channel: this.#properties.channel,
						data: realm.cdpToBidiValue(message, this.#properties.ownership ?? "none"),
						source: realm.source
					}
				}, browsingContext.id);
			} catch (error) {
				this.#logger?.(log_js_1.LogType.debugError, error);
				break;
			}
		}
		/**
		* Returns a handle of ChannelProxy from window's property which was set there
		* by `getEvalInWindowStr`. If window property is not set yet, sets a promise
		* resolver to the window property, so that `getEvalInWindowStr` can resolve
		* the promise later on with the channel.
		* This is needed because `getEvalInWindowStr` can be called before or
		* after this method.
		*/
		async #getHandleFromWindow(realm) {
			const channelHandleResult = await realm.cdpClient.sendCommand("Runtime.callFunctionOn", {
				functionDeclaration: String((id) => {
					const w = window;
					if (w[id] === void 0) return new Promise((resolve) => w[id] = resolve);
					const channelProxy = w[id];
					delete w[id];
					return channelProxy;
				}),
				arguments: [{ value: this.#id }],
				executionContextId: realm.executionContextId,
				awaitPromise: true,
				serializationOptions: { serialization: "idOnly" }
			});
			if (channelHandleResult.exceptionDetails !== void 0 || channelHandleResult.result.objectId === void 0) throw new Error(`ChannelHandle not found in window["${this.#id}"]`);
			return channelHandleResult.result.objectId;
		}
		/**
		* String to be evaluated to create a ProxyChannel and put it to window.
		* Returns the delegate `sendMessage`. Used to provide an argument for preload
		* script. Does the following:
		* 1. Creates a ChannelProxy.
		* 2. Puts the ChannelProxy to window['${this.#id}'] or resolves the promise
		*    by calling delegate stored in window['${this.#id}'].
		*    This is needed because `#getHandleFromWindow` can be called before or
		*    after this method.
		* 3. Returns the delegate `sendMessage` of the created ChannelProxy.
		*/
		getEvalInWindowStr() {
			const delegate = String((id, channelProxy) => {
				const w = window;
				if (w[id] === void 0) w[id] = channelProxy;
				else {
					w[id](channelProxy);
					delete w[id];
				}
				return channelProxy.sendMessage;
			});
			const channelProxyEval = ChannelProxy.#createChannelProxyEvalStr();
			return `(${delegate})('${this.#id}',${channelProxyEval})`;
		}
	};
}));
var require_PreloadScript = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PreloadScript = void 0;
	var uuid_js_1 = require_uuid();
	var ChannelProxy_js_1 = require_ChannelProxy();
	/**
	* BiDi IDs are generated by the server and are unique within contexts.
	*
	* CDP preload script IDs are generated by the client and are unique
	* within sessions.
	*
	* The mapping between BiDi and CDP preload script IDs is 1:many.
	* BiDi IDs are needed by the mapper to keep track of potential multiple CDP IDs
	* in the client.
	*/
	var PreloadScript = class {
		/** BiDi ID, an automatically generated UUID. */
		#id = (0, uuid_js_1.uuidv4)();
		/** CDP preload scripts. */
		#cdpPreloadScripts = [];
		/** The script itself, in a format expected by the spec i.e. a function. */
		#functionDeclaration;
		/** Targets, in which the preload script is initialized. */
		#targetIds = /* @__PURE__ */ new Set();
		/** Channels to be added as arguments to functionDeclaration. */
		#channels;
		/** The script sandbox / world name. */
		#sandbox;
		/** The browsing contexts to execute the preload scripts in, if any. */
		#contexts;
		/** The browsing contexts to execute the preload scripts in, if any. */
		#userContexts;
		get id() {
			return this.#id;
		}
		get targetIds() {
			return this.#targetIds;
		}
		constructor(params, logger) {
			this.#channels = params.arguments?.map((a) => new ChannelProxy_js_1.ChannelProxy(a.value, logger)) ?? [];
			this.#functionDeclaration = params.functionDeclaration;
			this.#sandbox = params.sandbox;
			this.#contexts = params.contexts;
			this.#userContexts = params.userContexts;
		}
		/** Channels of the preload script. */
		get channels() {
			return this.#channels;
		}
		/** Contexts of the preload script, if any */
		get contexts() {
			return this.#contexts;
		}
		/** UserContexts of the preload script, if any */
		get userContexts() {
			return this.#userContexts;
		}
		/**
		* String to be evaluated. Wraps user-provided function so that the following
		* steps are run:
		* 1. Create channels.
		* 2. Store the created channels in window.
		* 3. Call the user-provided function with channels as arguments.
		*/
		#getEvaluateString() {
			const channelsArgStr = `[${this.channels.map((c) => c.getEvalInWindowStr()).join(", ")}]`;
			return `(()=>{(${this.#functionDeclaration})(...${channelsArgStr})})()`;
		}
		/**
		* Adds the script to the given CDP targets by calling the
		* `Page.addScriptToEvaluateOnNewDocument` command.
		*/
		async initInTargets(cdpTargets, runImmediately) {
			await Promise.all(Array.from(cdpTargets).map((cdpTarget) => this.initInTarget(cdpTarget, runImmediately)));
		}
		/**
		* Adds the script to the given CDP target by calling the
		* `Page.addScriptToEvaluateOnNewDocument` command.
		*/
		async initInTarget(cdpTarget, runImmediately) {
			const addCdpPreloadScriptResult = await cdpTarget.cdpClient.sendCommand("Page.addScriptToEvaluateOnNewDocument", {
				source: this.#getEvaluateString(),
				worldName: this.#sandbox,
				runImmediately
			});
			this.#cdpPreloadScripts.push({
				target: cdpTarget,
				preloadScriptId: addCdpPreloadScriptResult.identifier
			});
			this.#targetIds.add(cdpTarget.id);
		}
		/**
		* Removes this script from all CDP targets.
		*/
		async remove() {
			await Promise.all([this.#cdpPreloadScripts.map(async (cdpPreloadScript) => {
				const cdpTarget = cdpPreloadScript.target;
				const cdpPreloadScriptId = cdpPreloadScript.preloadScriptId;
				return await cdpTarget.cdpClient.sendCommand("Page.removeScriptToEvaluateOnNewDocument", { identifier: cdpPreloadScriptId });
			})]);
		}
		/** Removes the provided cdp target from the list of cdp preload scripts. */
		dispose(cdpTargetId) {
			this.#cdpPreloadScripts = this.#cdpPreloadScripts.filter((cdpPreloadScript) => cdpPreloadScript.target?.id !== cdpTargetId);
			this.#targetIds.delete(cdpTargetId);
		}
	};
	exports.PreloadScript = PreloadScript;
}));
var require_ScriptProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ScriptProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var PreloadScript_js_1 = require_PreloadScript();
	var ScriptProcessor = class {
		#eventManager;
		#browsingContextStorage;
		#realmStorage;
		#preloadScriptStorage;
		#userContextStorage;
		#logger;
		constructor(eventManager, browsingContextStorage, realmStorage, preloadScriptStorage, userContextStorage, logger) {
			this.#browsingContextStorage = browsingContextStorage;
			this.#realmStorage = realmStorage;
			this.#preloadScriptStorage = preloadScriptStorage;
			this.#userContextStorage = userContextStorage;
			this.#logger = logger;
			this.#eventManager = eventManager;
			this.#eventManager.addSubscribeHook(protocol_js_1.ChromiumBidi.Script.EventNames.RealmCreated, this.#onRealmCreatedSubscribeHook.bind(this));
		}
		#onRealmCreatedSubscribeHook(contextId) {
			const context = this.#browsingContextStorage.getContext(contextId);
			const contextsToReport = [context, ...this.#browsingContextStorage.getContext(contextId).allChildren];
			const realms = /* @__PURE__ */ new Set();
			for (const reportContext of contextsToReport) {
				const realmsForContext = this.#realmStorage.findRealms({ browsingContextId: reportContext.id });
				for (const realm of realmsForContext) realms.add(realm);
			}
			for (const realm of realms) this.#eventManager.registerEvent({
				type: "event",
				method: protocol_js_1.ChromiumBidi.Script.EventNames.RealmCreated,
				params: realm.realmInfo
			}, context.id);
			return Promise.resolve();
		}
		async addPreloadScript(params) {
			if (params.userContexts?.length && params.contexts?.length) throw new protocol_js_1.InvalidArgumentException("Both userContexts and contexts cannot be specified.");
			const userContexts = await this.#userContextStorage.verifyUserContextIdList(params.userContexts ?? []);
			const browsingContexts = this.#browsingContextStorage.verifyTopLevelContextsList(params.contexts);
			const preloadScript = new PreloadScript_js_1.PreloadScript(params, this.#logger);
			this.#preloadScriptStorage.add(preloadScript);
			let contextsToRunIn = [];
			if (userContexts.size) contextsToRunIn = this.#browsingContextStorage.getTopLevelContexts().filter((context) => {
				return userContexts.has(context.userContext);
			});
			else if (browsingContexts.size) contextsToRunIn = [...browsingContexts.values()];
			else contextsToRunIn = this.#browsingContextStorage.getTopLevelContexts();
			const cdpTargets = new Set(contextsToRunIn.map((context) => context.cdpTarget));
			await preloadScript.initInTargets(cdpTargets, false);
			return { script: preloadScript.id };
		}
		async removePreloadScript(params) {
			const { script: id } = params;
			await this.#preloadScriptStorage.getPreloadScript(id).remove();
			this.#preloadScriptStorage.remove(id);
			return {};
		}
		async callFunction(params) {
			return await (await this.#getRealm(params.target)).callFunction(params.functionDeclaration, params.awaitPromise, params.this, params.arguments, params.resultOwnership, params.serializationOptions, params.userActivation);
		}
		async evaluate(params) {
			return await (await this.#getRealm(params.target)).evaluate(params.expression, params.awaitPromise, params.resultOwnership, params.serializationOptions, params.userActivation);
		}
		async disown(params) {
			const realm = await this.#getRealm(params.target);
			await Promise.all(params.handles.map(async (handle) => await realm.disown(handle)));
			return {};
		}
		getRealms(params) {
			if (params.context !== void 0) this.#browsingContextStorage.getContext(params.context);
			return { realms: this.#realmStorage.findRealms({
				browsingContextId: params.context,
				type: params.type,
				isHidden: false
			}).map((realm) => realm.realmInfo) };
		}
		async #getRealm(target) {
			if ("context" in target) return await this.#browsingContextStorage.getContext(target.context).getOrCreateUserSandbox(target.sandbox);
			return this.#realmStorage.getRealm({
				realmId: target.realm,
				isHidden: false
			});
		}
	};
	exports.ScriptProcessor = ScriptProcessor;
}));
var require_SessionProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SessionProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var SessionProcessor = class {
		#eventManager;
		#browserCdpClient;
		#initConnection;
		#created = false;
		constructor(eventManager, browserCdpClient, initConnection) {
			this.#eventManager = eventManager;
			this.#browserCdpClient = browserCdpClient;
			this.#initConnection = initConnection;
		}
		status() {
			return {
				ready: false,
				message: "already connected"
			};
		}
		#mergeCapabilities(capabilitiesRequest) {
			const mergedCapabilities = [];
			for (const first of capabilitiesRequest.firstMatch ?? [{}]) {
				const result = { ...capabilitiesRequest.alwaysMatch };
				for (const key of Object.keys(first)) {
					if (result[key] !== void 0) throw new protocol_js_1.InvalidArgumentException(`Capability ${key} in firstMatch is already defined in alwaysMatch`);
					result[key] = first[key];
				}
				mergedCapabilities.push(result);
			}
			const match = mergedCapabilities.find((c) => c.browserName === "chrome") ?? mergedCapabilities[0] ?? {};
			match.unhandledPromptBehavior = this.#getUnhandledPromptBehavior(match.unhandledPromptBehavior);
			return match;
		}
		#getUnhandledPromptBehavior(capabilityValue) {
			if (capabilityValue === void 0) return;
			if (typeof capabilityValue === "object") return capabilityValue;
			if (typeof capabilityValue !== "string") throw new protocol_js_1.InvalidArgumentException(`Unexpected 'unhandledPromptBehavior' type: ${typeof capabilityValue}`);
			switch (capabilityValue) {
				case "accept":
				case "accept and notify": return {
					default: "accept",
					beforeUnload: "accept"
				};
				case "dismiss":
				case "dismiss and notify": return {
					default: "dismiss",
					beforeUnload: "accept"
				};
				case "ignore": return {
					default: "ignore",
					beforeUnload: "accept"
				};
				default: throw new protocol_js_1.InvalidArgumentException(`Unexpected 'unhandledPromptBehavior' value: ${capabilityValue}`);
			}
		}
		async new(params) {
			if (this.#created) throw new Error("Session has been already created.");
			this.#created = true;
			const matchedCapabitlites = this.#mergeCapabilities(params.capabilities);
			await this.#initConnection(matchedCapabitlites);
			const version = await this.#browserCdpClient.sendCommand("Browser.getVersion");
			return {
				sessionId: "unknown",
				capabilities: {
					...matchedCapabitlites,
					acceptInsecureCerts: matchedCapabitlites.acceptInsecureCerts ?? false,
					browserName: version.product,
					browserVersion: version.revision,
					platformName: "",
					setWindowRect: false,
					webSocketUrl: "",
					userAgent: version.userAgent
				}
			};
		}
		async subscribe(params, googChannel = null) {
			return { subscription: await this.#eventManager.subscribe(params.events, params.contexts ?? [], params.userContexts ?? [], googChannel) };
		}
		async unsubscribe(params, googChannel = null) {
			if ("subscriptions" in params) {
				await this.#eventManager.unsubscribeByIds(params.subscriptions);
				return {};
			}
			await this.#eventManager.unsubscribe(params.events, googChannel);
			return {};
		}
	};
	exports.SessionProcessor = SessionProcessor;
}));
var require_StorageProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StorageProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var assert_js_1 = require_assert();
	var log_js_1 = require_log();
	var NetworkProcessor_js_1 = require_NetworkProcessor();
	var NetworkUtils_js_1 = require_NetworkUtils();
	/**
	* Responsible for handling the `storage` module.
	*/
	var StorageProcessor = class {
		#browserCdpClient;
		#browsingContextStorage;
		#logger;
		constructor(browserCdpClient, browsingContextStorage, logger) {
			this.#browsingContextStorage = browsingContextStorage;
			this.#browserCdpClient = browserCdpClient;
			this.#logger = logger;
		}
		async deleteCookies(params) {
			const partitionKey = this.#expandStoragePartitionSpec(params.partition);
			let cdpResponse;
			try {
				cdpResponse = await this.#browserCdpClient.sendCommand("Storage.getCookies", { browserContextId: this.#getCdpBrowserContextId(partitionKey) });
			} catch (err) {
				if (this.#isNoSuchUserContextError(err)) throw new protocol_js_1.NoSuchUserContextException(err.message);
				throw err;
			}
			const cdpCookiesToDelete = cdpResponse.cookies.filter((c) => partitionKey.sourceOrigin === void 0 || c.partitionKey?.topLevelSite === partitionKey.sourceOrigin).filter((cdpCookie) => {
				const bidiCookie = (0, NetworkUtils_js_1.cdpToBiDiCookie)(cdpCookie);
				return this.#matchCookie(bidiCookie, params.filter);
			}).map((cookie) => ({
				...cookie,
				expires: 1
			}));
			await this.#browserCdpClient.sendCommand("Storage.setCookies", {
				cookies: cdpCookiesToDelete,
				browserContextId: this.#getCdpBrowserContextId(partitionKey)
			});
			return { partitionKey };
		}
		async getCookies(params) {
			const partitionKey = this.#expandStoragePartitionSpec(params.partition);
			let cdpResponse;
			try {
				cdpResponse = await this.#browserCdpClient.sendCommand("Storage.getCookies", { browserContextId: this.#getCdpBrowserContextId(partitionKey) });
			} catch (err) {
				if (this.#isNoSuchUserContextError(err)) throw new protocol_js_1.NoSuchUserContextException(err.message);
				throw err;
			}
			return {
				cookies: cdpResponse.cookies.filter((c) => partitionKey.sourceOrigin === void 0 || c.partitionKey?.topLevelSite === partitionKey.sourceOrigin).map((c) => (0, NetworkUtils_js_1.cdpToBiDiCookie)(c)).filter((c) => this.#matchCookie(c, params.filter)),
				partitionKey
			};
		}
		async setCookie(params) {
			const partitionKey = this.#expandStoragePartitionSpec(params.partition);
			const cdpCookie = (0, NetworkUtils_js_1.bidiToCdpCookie)(params, partitionKey);
			try {
				await this.#browserCdpClient.sendCommand("Storage.setCookies", {
					cookies: [cdpCookie],
					browserContextId: this.#getCdpBrowserContextId(partitionKey)
				});
			} catch (err) {
				if (this.#isNoSuchUserContextError(err)) throw new protocol_js_1.NoSuchUserContextException(err.message);
				this.#logger?.(log_js_1.LogType.debugError, err);
				throw new protocol_js_1.UnableToSetCookieException(err.toString());
			}
			return { partitionKey };
		}
		#isNoSuchUserContextError(err) {
			return err.message?.startsWith("Failed to find browser context for id");
		}
		#getCdpBrowserContextId(partitionKey) {
			return partitionKey.userContext === "default" ? void 0 : partitionKey.userContext;
		}
		#expandStoragePartitionSpecByBrowsingContext(descriptor) {
			const browsingContextId = descriptor.context;
			return { userContext: this.#browsingContextStorage.getContext(browsingContextId).userContext };
		}
		#expandStoragePartitionSpecByStorageKey(descriptor) {
			const unsupportedPartitionKeys = /* @__PURE__ */ new Map();
			let sourceOrigin = descriptor.sourceOrigin;
			if (sourceOrigin !== void 0) {
				const url = NetworkProcessor_js_1.NetworkProcessor.parseUrlString(sourceOrigin);
				if (url.origin === "null") sourceOrigin = url.origin;
				else sourceOrigin = `${url.protocol}//${url.hostname}`;
			}
			for (const [key, value] of Object.entries(descriptor)) if (key !== void 0 && value !== void 0 && ![
				"type",
				"sourceOrigin",
				"userContext"
			].includes(key)) unsupportedPartitionKeys.set(key, value);
			if (unsupportedPartitionKeys.size > 0) this.#logger?.(log_js_1.LogType.debugInfo, `Unsupported partition keys: ${JSON.stringify(Object.fromEntries(unsupportedPartitionKeys))}`);
			return {
				userContext: descriptor.userContext ?? "default",
				...sourceOrigin === void 0 ? {} : { sourceOrigin }
			};
		}
		#expandStoragePartitionSpec(partitionSpec) {
			if (partitionSpec === void 0) return { userContext: "default" };
			if (partitionSpec.type === "context") return this.#expandStoragePartitionSpecByBrowsingContext(partitionSpec);
			(0, assert_js_1.assert)(partitionSpec.type === "storageKey", "Unknown partition type");
			return this.#expandStoragePartitionSpecByStorageKey(partitionSpec);
		}
		#matchCookie(cookie, filter) {
			if (filter === void 0) return true;
			return (filter.domain === void 0 || filter.domain === cookie.domain) && (filter.name === void 0 || filter.name === cookie.name) && (filter.value === void 0 || (0, NetworkUtils_js_1.deserializeByteValue)(filter.value) === (0, NetworkUtils_js_1.deserializeByteValue)(cookie.value)) && (filter.path === void 0 || filter.path === cookie.path) && (filter.size === void 0 || filter.size === cookie.size) && (filter.httpOnly === void 0 || filter.httpOnly === cookie.httpOnly) && (filter.secure === void 0 || filter.secure === cookie.secure) && (filter.sameSite === void 0 || filter.sameSite === cookie.sameSite) && (filter.expiry === void 0 || filter.expiry === cookie.expiry);
		}
	};
	exports.StorageProcessor = StorageProcessor;
}));
var require_WebExtensionProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2025 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebExtensionProcessor = void 0;
	var protocol_js_1 = require_protocol();
	/**
	* Responsible for handling the `webModule` module.
	*/
	var WebExtensionProcessor = class {
		#browserCdpClient;
		constructor(browserCdpClient) {
			this.#browserCdpClient = browserCdpClient;
		}
		async install(params) {
			switch (params.extensionData.type) {
				case "archivePath":
				case "base64": throw new protocol_js_1.UnsupportedOperationException("Archived and Base64 extensions are not supported");
				case "path": break;
			}
			try {
				return { extension: (await this.#browserCdpClient.sendCommand("Extensions.loadUnpacked", { path: params.extensionData.path })).id };
			} catch (err) {
				if (err.message.startsWith("invalid web extension")) throw new protocol_js_1.InvalidWebExtensionException(err.message);
				throw err;
			}
		}
		async uninstall(params) {
			try {
				await this.#browserCdpClient.sendCommand("Extensions.uninstall", { id: params.extension });
				return {};
			} catch (err) {
				if (err.message === "Uninstall failed. Reason: could not find extension.") throw new protocol_js_1.NoSuchWebExtensionException("no such web extension");
				throw err;
			}
		}
	};
	exports.WebExtensionProcessor = WebExtensionProcessor;
}));
var require_OutgoingMessage = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2021 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OutgoingMessage = void 0;
	exports.OutgoingMessage = class OutgoingMessage {
		#message;
		#googChannel;
		constructor(message, googChannel = null) {
			this.#message = message;
			this.#googChannel = googChannel;
		}
		static createFromPromise(messagePromise, googChannel) {
			return messagePromise.then((message) => {
				if (message.kind === "success") return {
					kind: "success",
					value: new OutgoingMessage(message.value, googChannel)
				};
				return message;
			});
		}
		static createResolved(message, googChannel = null) {
			return Promise.resolve({
				kind: "success",
				value: new OutgoingMessage(message, googChannel)
			});
		}
		get message() {
			return this.#message;
		}
		get googChannel() {
			return this.#googChannel;
		}
	};
}));
var require_CommandProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2021 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CommandProcessor = void 0;
	var protocol_js_1 = require_protocol();
	var EventEmitter_js_1 = require_EventEmitter();
	var log_js_1 = require_log();
	var BidiNoOpParser_js_1 = require_BidiNoOpParser();
	var BrowserProcessor_js_1 = require_BrowserProcessor();
	var CdpProcessor_js_1 = require_CdpProcessor();
	var BrowsingContextProcessor_js_1 = require_BrowsingContextProcessor();
	var EmulationProcessor_js_1 = require_EmulationProcessor();
	var InputProcessor_js_1 = require_InputProcessor();
	var NetworkProcessor_js_1 = require_NetworkProcessor();
	var PermissionsProcessor_js_1 = require_PermissionsProcessor();
	var ScriptProcessor_js_1 = require_ScriptProcessor();
	var SessionProcessor_js_1 = require_SessionProcessor();
	var StorageProcessor_js_1 = require_StorageProcessor();
	var WebExtensionProcessor_js_1 = require_WebExtensionProcessor();
	var OutgoingMessage_js_1 = require_OutgoingMessage();
	var CommandProcessor = class extends EventEmitter_js_1.EventEmitter {
		#bluetoothProcessor;
		#browserCdpClient;
		#browserProcessor;
		#browsingContextProcessor;
		#cdpProcessor;
		#emulationProcessor;
		#inputProcessor;
		#networkProcessor;
		#permissionsProcessor;
		#scriptProcessor;
		#sessionProcessor;
		#storageProcessor;
		#webExtensionProcessor;
		#parser;
		#logger;
		constructor(cdpConnection, browserCdpClient, eventManager, browsingContextStorage, realmStorage, preloadScriptStorage, networkStorage, contextConfigStorage, bluetoothProcessor, userContextStorage, parser = new BidiNoOpParser_js_1.BidiNoOpParser(), initConnection, logger) {
			super();
			this.#browserCdpClient = browserCdpClient;
			this.#parser = parser;
			this.#logger = logger;
			this.#bluetoothProcessor = bluetoothProcessor;
			this.#browserProcessor = new BrowserProcessor_js_1.BrowserProcessor(browserCdpClient, browsingContextStorage, contextConfigStorage, userContextStorage);
			this.#browsingContextProcessor = new BrowsingContextProcessor_js_1.BrowsingContextProcessor(browserCdpClient, browsingContextStorage, userContextStorage, contextConfigStorage, eventManager);
			this.#cdpProcessor = new CdpProcessor_js_1.CdpProcessor(browsingContextStorage, realmStorage, cdpConnection, browserCdpClient);
			this.#emulationProcessor = new EmulationProcessor_js_1.EmulationProcessor(browsingContextStorage, userContextStorage, contextConfigStorage);
			this.#inputProcessor = new InputProcessor_js_1.InputProcessor(browsingContextStorage);
			this.#networkProcessor = new NetworkProcessor_js_1.NetworkProcessor(browsingContextStorage, networkStorage, userContextStorage, contextConfigStorage);
			this.#permissionsProcessor = new PermissionsProcessor_js_1.PermissionsProcessor(browserCdpClient);
			this.#scriptProcessor = new ScriptProcessor_js_1.ScriptProcessor(eventManager, browsingContextStorage, realmStorage, preloadScriptStorage, userContextStorage, logger);
			this.#sessionProcessor = new SessionProcessor_js_1.SessionProcessor(eventManager, browserCdpClient, initConnection);
			this.#storageProcessor = new StorageProcessor_js_1.StorageProcessor(browserCdpClient, browsingContextStorage, logger);
			this.#webExtensionProcessor = new WebExtensionProcessor_js_1.WebExtensionProcessor(browserCdpClient);
		}
		async #processCommand(command) {
			switch (command.method) {
				case "bluetooth.disableSimulation": return await this.#bluetoothProcessor.disableSimulation(this.#parser.parseDisableSimulationParameters(command.params));
				case "bluetooth.handleRequestDevicePrompt": return await this.#bluetoothProcessor.handleRequestDevicePrompt(this.#parser.parseHandleRequestDevicePromptParams(command.params));
				case "bluetooth.simulateAdapter": return await this.#bluetoothProcessor.simulateAdapter(this.#parser.parseSimulateAdapterParameters(command.params));
				case "bluetooth.simulateAdvertisement": return await this.#bluetoothProcessor.simulateAdvertisement(this.#parser.parseSimulateAdvertisementParameters(command.params));
				case "bluetooth.simulateCharacteristic": return await this.#bluetoothProcessor.simulateCharacteristic(this.#parser.parseSimulateCharacteristicParameters(command.params));
				case "bluetooth.simulateCharacteristicResponse": return await this.#bluetoothProcessor.simulateCharacteristicResponse(this.#parser.parseSimulateCharacteristicResponseParameters(command.params));
				case "bluetooth.simulateDescriptor": return await this.#bluetoothProcessor.simulateDescriptor(this.#parser.parseSimulateDescriptorParameters(command.params));
				case "bluetooth.simulateDescriptorResponse": return await this.#bluetoothProcessor.simulateDescriptorResponse(this.#parser.parseSimulateDescriptorResponseParameters(command.params));
				case "bluetooth.simulateGattConnectionResponse": return await this.#bluetoothProcessor.simulateGattConnectionResponse(this.#parser.parseSimulateGattConnectionResponseParameters(command.params));
				case "bluetooth.simulateGattDisconnection": return await this.#bluetoothProcessor.simulateGattDisconnection(this.#parser.parseSimulateGattDisconnectionParameters(command.params));
				case "bluetooth.simulatePreconnectedPeripheral": return await this.#bluetoothProcessor.simulatePreconnectedPeripheral(this.#parser.parseSimulatePreconnectedPeripheralParameters(command.params));
				case "bluetooth.simulateService": return await this.#bluetoothProcessor.simulateService(this.#parser.parseSimulateServiceParameters(command.params));
				case "browser.close": return this.#browserProcessor.close();
				case "browser.createUserContext": return await this.#browserProcessor.createUserContext(this.#parser.parseCreateUserContextParameters(command.params));
				case "browser.getClientWindows": return await this.#browserProcessor.getClientWindows();
				case "browser.getUserContexts": return await this.#browserProcessor.getUserContexts();
				case "browser.removeUserContext": return await this.#browserProcessor.removeUserContext(this.#parser.parseRemoveUserContextParameters(command.params));
				case "browser.setClientWindowState": return await this.#browserProcessor.setClientWindowState(this.#parser.parseSetClientWindowStateParameters(command.params));
				case "browser.setDownloadBehavior": return await this.#browserProcessor.setDownloadBehavior(this.#parser.parseSetDownloadBehaviorParameters(command.params));
				case "browsingContext.activate": return await this.#browsingContextProcessor.activate(this.#parser.parseActivateParams(command.params));
				case "browsingContext.captureScreenshot": return await this.#browsingContextProcessor.captureScreenshot(this.#parser.parseCaptureScreenshotParams(command.params));
				case "browsingContext.close": return await this.#browsingContextProcessor.close(this.#parser.parseCloseParams(command.params));
				case "browsingContext.create": return await this.#browsingContextProcessor.create(this.#parser.parseCreateParams(command.params));
				case "browsingContext.getTree": return this.#browsingContextProcessor.getTree(this.#parser.parseGetTreeParams(command.params));
				case "browsingContext.handleUserPrompt": return await this.#browsingContextProcessor.handleUserPrompt(this.#parser.parseHandleUserPromptParams(command.params));
				case "browsingContext.locateNodes": return await this.#browsingContextProcessor.locateNodes(this.#parser.parseLocateNodesParams(command.params));
				case "browsingContext.navigate": return await this.#browsingContextProcessor.navigate(this.#parser.parseNavigateParams(command.params));
				case "browsingContext.print": return await this.#browsingContextProcessor.print(this.#parser.parsePrintParams(command.params));
				case "browsingContext.reload": return await this.#browsingContextProcessor.reload(this.#parser.parseReloadParams(command.params));
				case "browsingContext.setViewport": return await this.#browsingContextProcessor.setViewport(this.#parser.parseSetViewportParams(command.params));
				case "browsingContext.traverseHistory": return await this.#browsingContextProcessor.traverseHistory(this.#parser.parseTraverseHistoryParams(command.params));
				case "goog:cdp.getSession": return this.#cdpProcessor.getSession(this.#parser.parseGetSessionParams(command.params));
				case "goog:cdp.resolveRealm": return this.#cdpProcessor.resolveRealm(this.#parser.parseResolveRealmParams(command.params));
				case "goog:cdp.sendCommand": return await this.#cdpProcessor.sendCommand(this.#parser.parseSendCommandParams(command.params));
				case "emulation.setForcedColorsModeThemeOverride":
					this.#parser.parseSetForcedColorsModeThemeOverrideParams(command.params);
					throw new protocol_js_1.UnsupportedOperationException(`Method ${command.method} is not implemented.`);
				case "emulation.setGeolocationOverride": return await this.#emulationProcessor.setGeolocationOverride(this.#parser.parseSetGeolocationOverrideParams(command.params));
				case "emulation.setLocaleOverride": return await this.#emulationProcessor.setLocaleOverride(this.#parser.parseSetLocaleOverrideParams(command.params));
				case "emulation.setNetworkConditions": return await this.#emulationProcessor.setNetworkConditions(this.#parser.parseSetNetworkConditionsParams(command.params));
				case "emulation.setScreenOrientationOverride": return await this.#emulationProcessor.setScreenOrientationOverride(this.#parser.parseSetScreenOrientationOverrideParams(command.params));
				case "emulation.setScreenSettingsOverride": return await this.#emulationProcessor.setScreenSettingsOverride(this.#parser.parseSetScreenSettingsOverrideParams(command.params));
				case "emulation.setScriptingEnabled": return await this.#emulationProcessor.setScriptingEnabled(this.#parser.parseSetScriptingEnabledParams(command.params));
				case "emulation.setTimezoneOverride": return await this.#emulationProcessor.setTimezoneOverride(this.#parser.parseSetTimezoneOverrideParams(command.params));
				case "emulation.setTouchOverride": return await this.#emulationProcessor.setTouchOverride(this.#parser.parseSetTouchOverrideParams(command.params));
				case "emulation.setUserAgentOverride": return await this.#emulationProcessor.setUserAgentOverrideParams(this.#parser.parseSetUserAgentOverrideParams(command.params));
				case "userAgentClientHints.setClientHintsOverride": return await this.#emulationProcessor.setClientHintsOverride(this.#parser.parseSetClientHintsOverrideParams(command.params));
				case "input.performActions": return await this.#inputProcessor.performActions(this.#parser.parsePerformActionsParams(command.params));
				case "input.releaseActions": return await this.#inputProcessor.releaseActions(this.#parser.parseReleaseActionsParams(command.params));
				case "input.setFiles": return await this.#inputProcessor.setFiles(this.#parser.parseSetFilesParams(command.params));
				case "network.addDataCollector": return await this.#networkProcessor.addDataCollector(this.#parser.parseAddDataCollectorParams(command.params));
				case "network.addIntercept": return await this.#networkProcessor.addIntercept(this.#parser.parseAddInterceptParams(command.params));
				case "network.continueRequest": return await this.#networkProcessor.continueRequest(this.#parser.parseContinueRequestParams(command.params));
				case "network.continueResponse": return await this.#networkProcessor.continueResponse(this.#parser.parseContinueResponseParams(command.params));
				case "network.continueWithAuth": return await this.#networkProcessor.continueWithAuth(this.#parser.parseContinueWithAuthParams(command.params));
				case "network.disownData": return this.#networkProcessor.disownData(this.#parser.parseDisownDataParams(command.params));
				case "network.failRequest": return await this.#networkProcessor.failRequest(this.#parser.parseFailRequestParams(command.params));
				case "network.getData": return await this.#networkProcessor.getData(this.#parser.parseGetDataParams(command.params));
				case "network.provideResponse": return await this.#networkProcessor.provideResponse(this.#parser.parseProvideResponseParams(command.params));
				case "network.removeDataCollector": return await this.#networkProcessor.removeDataCollector(this.#parser.parseRemoveDataCollectorParams(command.params));
				case "network.removeIntercept": return await this.#networkProcessor.removeIntercept(this.#parser.parseRemoveInterceptParams(command.params));
				case "network.setCacheBehavior": return await this.#networkProcessor.setCacheBehavior(this.#parser.parseSetCacheBehaviorParams(command.params));
				case "network.setExtraHeaders": return await this.#networkProcessor.setExtraHeaders(this.#parser.parseSetExtraHeadersParams(command.params));
				case "permissions.setPermission": return await this.#permissionsProcessor.setPermissions(this.#parser.parseSetPermissionsParams(command.params));
				case "script.addPreloadScript": return await this.#scriptProcessor.addPreloadScript(this.#parser.parseAddPreloadScriptParams(command.params));
				case "script.callFunction": return await this.#scriptProcessor.callFunction(this.#parser.parseCallFunctionParams(this.#processTargetParams(command.params)));
				case "script.disown": return await this.#scriptProcessor.disown(this.#parser.parseDisownParams(this.#processTargetParams(command.params)));
				case "script.evaluate": return await this.#scriptProcessor.evaluate(this.#parser.parseEvaluateParams(this.#processTargetParams(command.params)));
				case "script.getRealms": return this.#scriptProcessor.getRealms(this.#parser.parseGetRealmsParams(command.params));
				case "script.removePreloadScript": return await this.#scriptProcessor.removePreloadScript(this.#parser.parseRemovePreloadScriptParams(command.params));
				case "session.end": throw new protocol_js_1.UnsupportedOperationException(`Method ${command.method} is not implemented.`);
				case "session.new": return await this.#sessionProcessor.new(command.params);
				case "session.status": return this.#sessionProcessor.status();
				case "session.subscribe": return await this.#sessionProcessor.subscribe(this.#parser.parseSubscribeParams(command.params), command["goog:channel"]);
				case "session.unsubscribe": return await this.#sessionProcessor.unsubscribe(this.#parser.parseUnsubscribeParams(command.params), command["goog:channel"]);
				case "storage.deleteCookies": return await this.#storageProcessor.deleteCookies(this.#parser.parseDeleteCookiesParams(command.params));
				case "storage.getCookies": return await this.#storageProcessor.getCookies(this.#parser.parseGetCookiesParams(command.params));
				case "storage.setCookie": return await this.#storageProcessor.setCookie(this.#parser.parseSetCookieParams(command.params));
				case "webExtension.install": return await this.#webExtensionProcessor.install(this.#parser.parseInstallParams(command.params));
				case "webExtension.uninstall": return await this.#webExtensionProcessor.uninstall(this.#parser.parseUninstallParams(command.params));
			}
			throw new protocol_js_1.UnknownCommandException(`Unknown command '${command?.method}'.`);
		}
		#processTargetParams(params) {
			if (typeof params === "object" && params && "target" in params && typeof params.target === "object" && params.target && "context" in params.target) delete params.target["realm"];
			return params;
		}
		async processCommand(command) {
			try {
				const result = await this.#processCommand(command);
				const response = {
					type: "success",
					id: command.id,
					result
				};
				this.emit("response", {
					message: OutgoingMessage_js_1.OutgoingMessage.createResolved(response, command["goog:channel"]),
					event: command.method
				});
			} catch (e) {
				if (e instanceof protocol_js_1.Exception) this.emit("response", {
					message: OutgoingMessage_js_1.OutgoingMessage.createResolved(e.toErrorResponse(command.id), command["goog:channel"]),
					event: command.method
				});
				else {
					const error = e;
					this.#logger?.(log_js_1.LogType.bidi, error);
					const errorException = this.#browserCdpClient.isCloseError(e) ? new protocol_js_1.NoSuchFrameException(`Browsing context is gone`) : new protocol_js_1.UnknownErrorException(error.message, error.stack);
					this.emit("response", {
						message: OutgoingMessage_js_1.OutgoingMessage.createResolved(errorException.toErrorResponse(command.id), command["goog:channel"]),
						event: command.method
					});
				}
			}
		}
	};
	exports.CommandProcessor = CommandProcessor;
}));
var require_BluetoothProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BluetoothProcessor = void 0;
	var protocol_js_1 = require_protocol();
	/** Represents a base Bluetooth GATT item. */
	var BluetoothGattItem = class {
		id;
		uuid;
		constructor(id, uuid) {
			this.id = id;
			this.uuid = uuid;
		}
	};
	/** Represents a Bluetooth descriptor. */
	var BluetoothDescriptor = class extends BluetoothGattItem {
		characteristic;
		constructor(id, uuid, characteristic) {
			super(id, uuid);
			this.characteristic = characteristic;
		}
	};
	/** Represents a Bluetooth characteristic. */
	var BluetoothCharacteristic = class extends BluetoothGattItem {
		descriptors = /* @__PURE__ */ new Map();
		service;
		constructor(id, uuid, service) {
			super(id, uuid);
			this.service = service;
		}
	};
	/** Represents a Bluetooth service. */
	var BluetoothService = class extends BluetoothGattItem {
		characteristics = /* @__PURE__ */ new Map();
		device;
		constructor(id, uuid, device) {
			super(id, uuid);
			this.device = device;
		}
	};
	/** Represents a Bluetooth device. */
	var BluetoothDevice = class {
		address;
		services = /* @__PURE__ */ new Map();
		constructor(address) {
			this.address = address;
		}
	};
	var BluetoothProcessor = class {
		#eventManager;
		#browsingContextStorage;
		#bluetoothDevices = /* @__PURE__ */ new Map();
		#bluetoothCharacteristics = /* @__PURE__ */ new Map();
		#bluetoothDescriptors = /* @__PURE__ */ new Map();
		constructor(eventManager, browsingContextStorage) {
			this.#eventManager = eventManager;
			this.#browsingContextStorage = browsingContextStorage;
		}
		#getDevice(address) {
			const device = this.#bluetoothDevices.get(address);
			if (!device) throw new protocol_js_1.InvalidArgumentException(`Bluetooth device with address ${address} does not exist`);
			return device;
		}
		#getService(device, serviceUuid) {
			const service = device.services.get(serviceUuid);
			if (!service) throw new protocol_js_1.InvalidArgumentException(`Service with UUID ${serviceUuid} on device ${device.address} does not exist`);
			return service;
		}
		#getCharacteristic(service, characteristicUuid) {
			const characteristic = service.characteristics.get(characteristicUuid);
			if (!characteristic) throw new protocol_js_1.InvalidArgumentException(`Characteristic with UUID ${characteristicUuid} does not exist for service ${service.uuid} on device ${service.device.address}`);
			return characteristic;
		}
		#getDescriptor(characteristic, descriptorUuid) {
			const descriptor = characteristic.descriptors.get(descriptorUuid);
			if (!descriptor) throw new protocol_js_1.InvalidArgumentException(`Descriptor with UUID ${descriptorUuid} does not exist for characteristic ${characteristic.uuid} on service ${characteristic.service.uuid} on device ${characteristic.service.device.address}`);
			return descriptor;
		}
		async simulateAdapter(params) {
			if (params.state === void 0) throw new protocol_js_1.InvalidArgumentException(`Parameter "state" is required for creating a Bluetooth adapter`);
			const context = this.#browsingContextStorage.getContext(params.context);
			await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.disable");
			this.#bluetoothDevices.clear();
			this.#bluetoothCharacteristics.clear();
			this.#bluetoothDescriptors.clear();
			await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.enable", {
				state: params.state,
				leSupported: params.leSupported ?? true
			});
			return {};
		}
		async disableSimulation(params) {
			await this.#browsingContextStorage.getContext(params.context).cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.disable");
			this.#bluetoothDevices.clear();
			this.#bluetoothCharacteristics.clear();
			this.#bluetoothDescriptors.clear();
			return {};
		}
		async simulatePreconnectedPeripheral(params) {
			if (this.#bluetoothDevices.has(params.address)) throw new protocol_js_1.InvalidArgumentException(`Bluetooth device with address ${params.address} already exists`);
			await this.#browsingContextStorage.getContext(params.context).cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.simulatePreconnectedPeripheral", {
				address: params.address,
				name: params.name,
				knownServiceUuids: params.knownServiceUuids,
				manufacturerData: params.manufacturerData
			});
			this.#bluetoothDevices.set(params.address, new BluetoothDevice(params.address));
			return {};
		}
		async simulateAdvertisement(params) {
			await this.#browsingContextStorage.getContext(params.context).cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.simulateAdvertisement", { entry: params.scanEntry });
			return {};
		}
		async simulateCharacteristic(params) {
			const device = this.#getDevice(params.address);
			const service = this.#getService(device, params.serviceUuid);
			const context = this.#browsingContextStorage.getContext(params.context);
			switch (params.type) {
				case "add": {
					if (params.characteristicProperties === void 0) throw new protocol_js_1.InvalidArgumentException(`Parameter "characteristicProperties" is required for adding a Bluetooth characteristic`);
					if (service.characteristics.has(params.characteristicUuid)) throw new protocol_js_1.InvalidArgumentException(`Characteristic with UUID ${params.characteristicUuid} already exists`);
					const characteristic = new BluetoothCharacteristic((await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.addCharacteristic", {
						serviceId: service.id,
						characteristicUuid: params.characteristicUuid,
						properties: params.characteristicProperties
					})).characteristicId, params.characteristicUuid, service);
					service.characteristics.set(params.characteristicUuid, characteristic);
					this.#bluetoothCharacteristics.set(characteristic.id, characteristic);
					return {};
				}
				case "remove": {
					if (params.characteristicProperties !== void 0) throw new protocol_js_1.InvalidArgumentException(`Parameter "characteristicProperties" should not be provided for removing a Bluetooth characteristic`);
					const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
					await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.removeCharacteristic", { characteristicId: characteristic.id });
					service.characteristics.delete(params.characteristicUuid);
					this.#bluetoothCharacteristics.delete(characteristic.id);
					return {};
				}
				default: throw new protocol_js_1.InvalidArgumentException(`Parameter "type" of ${params.type} is not supported`);
			}
		}
		async simulateCharacteristicResponse(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			const device = this.#getDevice(params.address);
			const service = this.#getService(device, params.serviceUuid);
			const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
			await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.simulateCharacteristicOperationResponse", {
				characteristicId: characteristic.id,
				type: params.type,
				code: params.code,
				...params.data && { data: btoa(String.fromCharCode(...params.data)) }
			});
			return {};
		}
		async simulateDescriptor(params) {
			const device = this.#getDevice(params.address);
			const service = this.#getService(device, params.serviceUuid);
			const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
			const context = this.#browsingContextStorage.getContext(params.context);
			switch (params.type) {
				case "add": {
					if (characteristic.descriptors.has(params.descriptorUuid)) throw new protocol_js_1.InvalidArgumentException(`Descriptor with UUID ${params.descriptorUuid} already exists`);
					const descriptor = new BluetoothDescriptor((await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.addDescriptor", {
						characteristicId: characteristic.id,
						descriptorUuid: params.descriptorUuid
					})).descriptorId, params.descriptorUuid, characteristic);
					characteristic.descriptors.set(params.descriptorUuid, descriptor);
					this.#bluetoothDescriptors.set(descriptor.id, descriptor);
					return {};
				}
				case "remove": {
					const descriptor = this.#getDescriptor(characteristic, params.descriptorUuid);
					await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.removeDescriptor", { descriptorId: descriptor.id });
					characteristic.descriptors.delete(params.descriptorUuid);
					this.#bluetoothDescriptors.delete(descriptor.id);
					return {};
				}
				default: throw new protocol_js_1.InvalidArgumentException(`Parameter "type" of ${params.type} is not supported`);
			}
		}
		async simulateDescriptorResponse(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			const device = this.#getDevice(params.address);
			const service = this.#getService(device, params.serviceUuid);
			const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
			const descriptor = this.#getDescriptor(characteristic, params.descriptorUuid);
			await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.simulateDescriptorOperationResponse", {
				descriptorId: descriptor.id,
				type: params.type,
				code: params.code,
				...params.data && { data: btoa(String.fromCharCode(...params.data)) }
			});
			return {};
		}
		async simulateGattConnectionResponse(params) {
			await this.#browsingContextStorage.getContext(params.context).cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.simulateGATTOperationResponse", {
				address: params.address,
				type: "connection",
				code: params.code
			});
			return {};
		}
		async simulateGattDisconnection(params) {
			await this.#browsingContextStorage.getContext(params.context).cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.simulateGATTDisconnection", { address: params.address });
			return {};
		}
		async simulateService(params) {
			const device = this.#getDevice(params.address);
			const context = this.#browsingContextStorage.getContext(params.context);
			switch (params.type) {
				case "add": {
					if (device.services.has(params.uuid)) throw new protocol_js_1.InvalidArgumentException(`Service with UUID ${params.uuid} already exists`);
					const response = await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.addService", {
						address: params.address,
						serviceUuid: params.uuid
					});
					device.services.set(params.uuid, new BluetoothService(response.serviceId, params.uuid, device));
					return {};
				}
				case "remove": {
					const service = this.#getService(device, params.uuid);
					await context.cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.removeService", { serviceId: service.id });
					device.services.delete(params.uuid);
					return {};
				}
				default: throw new protocol_js_1.InvalidArgumentException(`Parameter "type" of ${params.type} is not supported`);
			}
		}
		onCdpTargetCreated(cdpTarget) {
			cdpTarget.cdpClient.on("DeviceAccess.deviceRequestPrompted", (event) => {
				this.#eventManager.registerEvent({
					type: "event",
					method: "bluetooth.requestDevicePromptUpdated",
					params: {
						context: cdpTarget.id,
						prompt: event.id,
						devices: event.devices
					}
				}, cdpTarget.id);
			});
			cdpTarget.browserCdpClient.on("BluetoothEmulation.gattOperationReceived", async (event) => {
				switch (event.type) {
					case "connection":
						this.#eventManager.registerEvent({
							type: "event",
							method: "bluetooth.gattConnectionAttempted",
							params: {
								context: cdpTarget.id,
								address: event.address
							}
						}, cdpTarget.id);
						return;
					case "discovery": await cdpTarget.browserCdpClient.sendCommand("BluetoothEmulation.simulateGATTOperationResponse", {
						address: event.address,
						type: "discovery",
						code: 0
					});
				}
			});
			cdpTarget.browserCdpClient.on("BluetoothEmulation.characteristicOperationReceived", (event) => {
				if (!this.#bluetoothCharacteristics.has(event.characteristicId)) return;
				let type;
				if (event.type === "write") {
					if (event.writeType === "write-default-deprecated") return;
					type = event.writeType;
				} else type = event.type;
				const characteristic = this.#bluetoothCharacteristics.get(event.characteristicId);
				this.#eventManager.registerEvent({
					type: "event",
					method: "bluetooth.characteristicEventGenerated",
					params: {
						context: cdpTarget.id,
						address: characteristic.service.device.address,
						serviceUuid: characteristic.service.uuid,
						characteristicUuid: characteristic.uuid,
						type,
						...event.data && { data: Array.from(atob(event.data), (c) => c.charCodeAt(0)) }
					}
				}, cdpTarget.id);
			});
			cdpTarget.browserCdpClient.on("BluetoothEmulation.descriptorOperationReceived", (event) => {
				if (!this.#bluetoothDescriptors.has(event.descriptorId)) return;
				const descriptor = this.#bluetoothDescriptors.get(event.descriptorId);
				this.#eventManager.registerEvent({
					type: "event",
					method: "bluetooth.descriptorEventGenerated",
					params: {
						context: cdpTarget.id,
						address: descriptor.characteristic.service.device.address,
						serviceUuid: descriptor.characteristic.service.uuid,
						characteristicUuid: descriptor.characteristic.uuid,
						descriptorUuid: descriptor.uuid,
						type: event.type,
						...event.data && { data: Array.from(atob(event.data), (c) => c.charCodeAt(0)) }
					}
				}, cdpTarget.id);
			});
		}
		async handleRequestDevicePrompt(params) {
			const context = this.#browsingContextStorage.getContext(params.context);
			if (params.accept) await context.cdpTarget.cdpClient.sendCommand("DeviceAccess.selectPrompt", {
				id: params.prompt,
				deviceId: params.device
			});
			else await context.cdpTarget.cdpClient.sendCommand("DeviceAccess.cancelPrompt", { id: params.prompt });
			return {};
		}
	};
	exports.BluetoothProcessor = BluetoothProcessor;
}));
var require_ContextConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2025 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContextConfig = void 0;
	exports.ContextConfig = class ContextConfig {
		acceptInsecureCerts;
		clientHints;
		devicePixelRatio;
		disableNetworkDurableMessages;
		downloadBehavior;
		emulatedNetworkConditions;
		extraHeaders;
		geolocation;
		locale;
		maxTouchPoints;
		prerenderingDisabled;
		screenArea;
		screenOrientation;
		scriptingEnabled;
		timezone;
		userAgent;
		userPromptHandler;
		viewport;
		/**
		* Merges multiple `ContextConfig` objects. The configs are merged in the order they are
		* provided. For each property, the value from the last config that defines it will be
		* used. The final result will not contain any `undefined` or `null` properties.
		* `undefined` values are ignored. `null` values remove the already set value.
		*/
		static merge(...configs) {
			const result = new ContextConfig();
			for (const config of configs) {
				if (!config) continue;
				for (const key in config) {
					const value = config[key];
					if (value === null) delete result[key];
					else if (value !== void 0) result[key] = value;
				}
			}
			return result;
		}
	};
}));
var require_ContextConfigStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ContextConfigStorage = void 0;
	var ContextConfig_js_1 = require_ContextConfig();
	/**
	* Manages context-specific configurations. This class allows setting
	* configurations at three levels: global, user context, and browsing context.
	*
	* When `getActiveConfig` is called, it merges the configurations in a specific
	* order of precedence: `global -> user context -> browsing context`. For each
	* configuration property, the value from the highest-precedence level that has a
	* non-`undefined` value is used.
	*
	* The `update` methods (`updateGlobalConfig`, `updateUserContextConfig`,
	* `updateBrowsingContextConfig`) merge the provided configuration with the
	* existing one at the corresponding level. Properties with `undefined` values in
	* the provided configuration are ignored, preserving the existing value.
	*/
	var ContextConfigStorage = class {
		#global = new ContextConfig_js_1.ContextConfig();
		#userContextConfigs = /* @__PURE__ */ new Map();
		#browsingContextConfigs = /* @__PURE__ */ new Map();
		/**
		* Updates the global configuration. Properties with `undefined` values in the
		* provided `config` are ignored.
		*/
		updateGlobalConfig(config) {
			this.#global = ContextConfig_js_1.ContextConfig.merge(this.#global, config);
		}
		/**
		* Updates the configuration for a specific browsing context. Properties with
		* `undefined` values in the provided `config` are ignored.
		*/
		updateBrowsingContextConfig(browsingContextId, config) {
			this.#browsingContextConfigs.set(browsingContextId, ContextConfig_js_1.ContextConfig.merge(this.#browsingContextConfigs.get(browsingContextId), config));
		}
		/**
		* Updates the configuration for a specific user context. Properties with
		* `undefined` values in the provided `config` are ignored.
		*/
		updateUserContextConfig(userContext, config) {
			this.#userContextConfigs.set(userContext, ContextConfig_js_1.ContextConfig.merge(this.#userContextConfigs.get(userContext), config));
		}
		/**
		* Returns the current global configuration.
		*/
		getGlobalConfig() {
			return this.#global;
		}
		/**
		* Extra headers is a special case. The headers from the different levels have to be
		* merged instead of being overridden.
		*/
		#getExtraHeaders(topLevelBrowsingContextId, userContext) {
			const globalHeaders = this.#global.extraHeaders ?? {};
			const userContextHeaders = this.#userContextConfigs.get(userContext)?.extraHeaders ?? {};
			const browsingContextHeaders = topLevelBrowsingContextId === void 0 ? {} : this.#browsingContextConfigs.get(topLevelBrowsingContextId)?.extraHeaders ?? {};
			return {
				...globalHeaders,
				...userContextHeaders,
				...browsingContextHeaders
			};
		}
		/**
		* Calculates the active configuration by merging global, user context, and
		* browsing context settings.
		*/
		getActiveConfig(topLevelBrowsingContextId, userContext) {
			let result = ContextConfig_js_1.ContextConfig.merge(this.#global, this.#userContextConfigs.get(userContext));
			if (topLevelBrowsingContextId !== void 0) result = ContextConfig_js_1.ContextConfig.merge(result, this.#browsingContextConfigs.get(topLevelBrowsingContextId));
			const extraHeaders = this.#getExtraHeaders(topLevelBrowsingContextId, userContext);
			result.extraHeaders = Object.keys(extraHeaders).length > 0 ? extraHeaders : void 0;
			return result;
		}
	};
	exports.ContextConfigStorage = ContextConfigStorage;
}));
var require_UserContextStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2025 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UserContextStorage = void 0;
	var protocol_js_1 = require_protocol();
	var UserContextStorage = class {
		#browserClient;
		constructor(browserClient) {
			this.#browserClient = browserClient;
		}
		async getUserContexts() {
			return [{ userContext: "default" }, ...(await this.#browserClient.sendCommand("Target.getBrowserContexts")).browserContextIds.map((id) => {
				return { userContext: id };
			})];
		}
		async verifyUserContextIdList(userContextIds) {
			const foundContexts = /* @__PURE__ */ new Set();
			if (!userContextIds.length) return foundContexts;
			const userContexts = await this.getUserContexts();
			const knownUserContextIds = new Set(userContexts.map((userContext) => userContext.userContext));
			for (const userContextId of userContextIds) {
				if (!knownUserContextIds.has(userContextId)) throw new protocol_js_1.NoSuchUserContextException(`User context ${userContextId} not found`);
				foundContexts.add(userContextId);
			}
			return foundContexts;
		}
	};
	exports.UserContextStorage = UserContextStorage;
}));
var require_Deferred = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Deferred = void 0;
	var Deferred = class {
		#isFinished = false;
		#promise;
		#result;
		#resolve;
		#reject;
		get isFinished() {
			return this.#isFinished;
		}
		get result() {
			if (!this.#isFinished) throw new Error("Deferred is not finished yet");
			return this.#result;
		}
		constructor() {
			this.#promise = new Promise((resolve, reject) => {
				this.#resolve = resolve;
				this.#reject = reject;
			});
			this.#promise.catch((_error) => {});
		}
		then(onFulfilled, onRejected) {
			return this.#promise.then(onFulfilled, onRejected);
		}
		catch(onRejected) {
			return this.#promise.catch(onRejected);
		}
		resolve(value) {
			this.#result = value;
			if (!this.#isFinished) {
				this.#isFinished = true;
				this.#resolve(value);
			}
		}
		reject(reason) {
			if (!this.#isFinished) {
				this.#isFinished = true;
				this.#reject(reason);
			}
		}
		finally(onFinally) {
			return this.#promise.finally(onFinally);
		}
		[Symbol.toStringTag] = "Promise";
	};
	exports.Deferred = Deferred;
}));
var require_time = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getTimestamp = getTimestamp;
	function getTimestamp() {
		return (/* @__PURE__ */ new Date()).getTime();
	}
}));
var require_unitConversions = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.inchesFromCm = inchesFromCm;
	/** @return Given an input in cm, convert it to inches. */
	function inchesFromCm(cm) {
		return cm / 2.54;
	}
}));
var require_SharedId = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getSharedId = getSharedId;
	exports.parseSharedId = parseSharedId;
	var SHARED_ID_DIVIDER = "_element_";
	function getSharedId(frameId, documentId, backendNodeId) {
		return `f.${frameId}.d.${documentId}.e.${backendNodeId}`;
	}
	function parseLegacySharedId(sharedId) {
		const match = sharedId.match(new RegExp(`(.*)${SHARED_ID_DIVIDER}(.*)`));
		if (!match) return null;
		const documentId = match[1];
		const elementId = match[2];
		if (documentId === void 0 || elementId === void 0) return null;
		const backendNodeId = parseInt(elementId ?? "");
		if (isNaN(backendNodeId)) return null;
		return {
			documentId,
			backendNodeId
		};
	}
	function parseSharedId(sharedId) {
		const legacyFormattedSharedId = parseLegacySharedId(sharedId);
		if (legacyFormattedSharedId !== null) return {
			...legacyFormattedSharedId,
			frameId: void 0
		};
		const match = sharedId.match(/f\.(.*)\.d\.(.*)\.e\.([0-9]*)/);
		if (!match) return null;
		const frameId = match[1];
		const documentId = match[2];
		const elementId = match[3];
		if (frameId === void 0 || documentId === void 0 || elementId === void 0) return null;
		const backendNodeId = parseInt(elementId ?? "");
		if (isNaN(backendNodeId)) return null;
		return {
			frameId,
			documentId,
			backendNodeId
		};
	}
}));
var require_Realm = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Realm = void 0;
	var protocol_js_1 = require_protocol();
	var log_js_1 = require_log();
	var uuid_js_1 = require_uuid();
	var ChannelProxy_js_1 = require_ChannelProxy();
	exports.Realm = class Realm {
		#cdpClient;
		#eventManager;
		#executionContextId;
		#logger;
		#origin;
		#realmId;
		realmStorage;
		constructor(cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage) {
			this.#cdpClient = cdpClient;
			this.#eventManager = eventManager;
			this.#executionContextId = executionContextId;
			this.#logger = logger;
			this.#origin = origin;
			this.#realmId = realmId;
			this.realmStorage = realmStorage;
			this.realmStorage.addRealm(this);
		}
		cdpToBidiValue(cdpValue, resultOwnership) {
			const bidiValue = this.serializeForBiDi(cdpValue.result.deepSerializedValue, /* @__PURE__ */ new Map());
			if (cdpValue.result.objectId) {
				const objectId = cdpValue.result.objectId;
				if (resultOwnership === "root") {
					bidiValue.handle = objectId;
					this.realmStorage.knownHandlesToRealmMap.set(objectId, this.realmId);
				} else this.#releaseObject(objectId).catch((error) => this.#logger?.(log_js_1.LogType.debugError, error));
			}
			return bidiValue;
		}
		isHidden() {
			return false;
		}
		/**
		* Relies on the CDP to implement proper BiDi serialization, except:
		* * CDP integer property `backendNodeId` is replaced with `sharedId` of
		* `{documentId}_element_{backendNodeId}`;
		* * CDP integer property `weakLocalObjectReference` is replaced with UUID `internalId`
		* using unique-per serialization `internalIdMap`.
		* * CDP type `platformobject` is replaced with `object`.
		* @param deepSerializedValue - CDP value to be converted to BiDi.
		* @param internalIdMap - Map from CDP integer `weakLocalObjectReference` to BiDi UUID
		* `internalId`.
		*/
		serializeForBiDi(deepSerializedValue, internalIdMap) {
			if (Object.hasOwn(deepSerializedValue, "weakLocalObjectReference")) {
				const weakLocalObjectReference = deepSerializedValue.weakLocalObjectReference;
				if (!internalIdMap.has(weakLocalObjectReference)) internalIdMap.set(weakLocalObjectReference, (0, uuid_js_1.uuidv4)());
				deepSerializedValue.internalId = internalIdMap.get(weakLocalObjectReference);
				delete deepSerializedValue["weakLocalObjectReference"];
			}
			if (deepSerializedValue.type === "node" && deepSerializedValue.value && Object.hasOwn(deepSerializedValue.value, "frameId")) delete deepSerializedValue.value["frameId"];
			if (deepSerializedValue.type === "platformobject") return { type: "object" };
			const bidiValue = deepSerializedValue.value;
			if (bidiValue === void 0) return deepSerializedValue;
			if ([
				"array",
				"set",
				"htmlcollection",
				"nodelist"
			].includes(deepSerializedValue.type)) for (const i in bidiValue) bidiValue[i] = this.serializeForBiDi(bidiValue[i], internalIdMap);
			if (["object", "map"].includes(deepSerializedValue.type)) for (const i in bidiValue) bidiValue[i] = [this.serializeForBiDi(bidiValue[i][0], internalIdMap), this.serializeForBiDi(bidiValue[i][1], internalIdMap)];
			return deepSerializedValue;
		}
		get realmId() {
			return this.#realmId;
		}
		get executionContextId() {
			return this.#executionContextId;
		}
		get origin() {
			return this.#origin;
		}
		get source() {
			return { realm: this.realmId };
		}
		get cdpClient() {
			return this.#cdpClient;
		}
		get baseInfo() {
			return {
				realm: this.realmId,
				origin: this.origin
			};
		}
		async evaluate(expression, awaitPromise, resultOwnership = "none", serializationOptions = {}, userActivation = false, includeCommandLineApi = false) {
			const cdpEvaluateResult = await this.cdpClient.sendCommand("Runtime.evaluate", {
				contextId: this.executionContextId,
				expression,
				awaitPromise,
				serializationOptions: Realm.#getSerializationOptions("deep", serializationOptions),
				userGesture: userActivation,
				includeCommandLineAPI: includeCommandLineApi
			});
			if (cdpEvaluateResult.exceptionDetails) return await this.#getExceptionResult(cdpEvaluateResult.exceptionDetails, 0, resultOwnership);
			return {
				realm: this.realmId,
				result: this.cdpToBidiValue(cdpEvaluateResult, resultOwnership),
				type: "success"
			};
		}
		#registerEvent(event) {
			if (this.associatedBrowsingContexts.length === 0) this.#eventManager.registerGlobalEvent(event);
			else for (const browsingContext of this.associatedBrowsingContexts) this.#eventManager.registerEvent(event, browsingContext.id);
		}
		initialize() {
			if (!this.isHidden()) this.#registerEvent({
				type: "event",
				method: protocol_js_1.ChromiumBidi.Script.EventNames.RealmCreated,
				params: this.realmInfo
			});
		}
		/**
		* Serializes a given CDP object into BiDi, keeping references in the
		* target's `globalThis`.
		*/
		async serializeCdpObject(cdpRemoteObject, resultOwnership) {
			const argument = Realm.#cdpRemoteObjectToCallArgument(cdpRemoteObject);
			const cdpValue = await this.cdpClient.sendCommand("Runtime.callFunctionOn", {
				functionDeclaration: String((remoteObject) => remoteObject),
				awaitPromise: false,
				arguments: [argument],
				serializationOptions: { serialization: "deep" },
				executionContextId: this.executionContextId
			});
			return this.cdpToBidiValue(cdpValue, resultOwnership);
		}
		static #cdpRemoteObjectToCallArgument(cdpRemoteObject) {
			if (cdpRemoteObject.objectId !== void 0) return { objectId: cdpRemoteObject.objectId };
			if (cdpRemoteObject.unserializableValue !== void 0) return { unserializableValue: cdpRemoteObject.unserializableValue };
			return { value: cdpRemoteObject.value };
		}
		/**
		* Gets the string representation of an object. This is equivalent to
		* calling `toString()` on the object value.
		*/
		async stringifyObject(cdpRemoteObject) {
			const { result } = await this.cdpClient.sendCommand("Runtime.callFunctionOn", {
				functionDeclaration: String((remoteObject) => String(remoteObject)),
				awaitPromise: false,
				arguments: [cdpRemoteObject],
				returnByValue: true,
				executionContextId: this.executionContextId
			});
			return result.value;
		}
		async #flattenKeyValuePairs(mappingLocalValue) {
			return (await Promise.all(mappingLocalValue.map(async ([key, value]) => {
				let keyArg;
				if (typeof key === "string") keyArg = { value: key };
				else keyArg = await this.deserializeForCdp(key);
				const valueArg = await this.deserializeForCdp(value);
				return [keyArg, valueArg];
			}))).flat();
		}
		async #flattenValueList(listLocalValue) {
			return await Promise.all(listLocalValue.map((localValue) => this.deserializeForCdp(localValue)));
		}
		async #serializeCdpExceptionDetails(cdpExceptionDetails, lineOffset, resultOwnership) {
			const callFrames = cdpExceptionDetails.stackTrace?.callFrames.map((frame) => ({
				url: frame.url,
				functionName: frame.functionName,
				lineNumber: frame.lineNumber - lineOffset,
				columnNumber: frame.columnNumber
			})) ?? [];
			const exception = cdpExceptionDetails.exception;
			return {
				exception: await this.serializeCdpObject(exception, resultOwnership),
				columnNumber: cdpExceptionDetails.columnNumber,
				lineNumber: cdpExceptionDetails.lineNumber - lineOffset,
				stackTrace: { callFrames },
				text: await this.stringifyObject(exception) || cdpExceptionDetails.text
			};
		}
		async callFunction(functionDeclaration, awaitPromise, thisLocalValue = { type: "undefined" }, argumentsLocalValues = [], resultOwnership = "none", serializationOptions = {}, userActivation = false) {
			const callFunctionAndSerializeScript = `(...args) => {
      function callFunction(f, args) {
        const deserializedThis = args.shift();
        const deserializedArgs = args;
        return f.apply(deserializedThis, deserializedArgs);
      }
      return callFunction((
        ${functionDeclaration}
      ), args);
    }`;
			const thisAndArgumentsList = [await this.deserializeForCdp(thisLocalValue), ...await Promise.all(argumentsLocalValues.map(async (argumentLocalValue) => await this.deserializeForCdp(argumentLocalValue)))];
			let cdpCallFunctionResult;
			try {
				cdpCallFunctionResult = await this.cdpClient.sendCommand("Runtime.callFunctionOn", {
					functionDeclaration: callFunctionAndSerializeScript,
					awaitPromise,
					arguments: thisAndArgumentsList,
					serializationOptions: Realm.#getSerializationOptions("deep", serializationOptions),
					executionContextId: this.executionContextId,
					userGesture: userActivation
				});
			} catch (error) {
				if (error.code === -32e3 && [
					"Could not find object with given id",
					"Argument should belong to the same JavaScript world as target object",
					"Invalid remote object id"
				].includes(error.message)) throw new protocol_js_1.NoSuchHandleException("Handle was not found.");
				throw error;
			}
			if (cdpCallFunctionResult.exceptionDetails) return await this.#getExceptionResult(cdpCallFunctionResult.exceptionDetails, 1, resultOwnership);
			return {
				type: "success",
				result: this.cdpToBidiValue(cdpCallFunctionResult, resultOwnership),
				realm: this.realmId
			};
		}
		async deserializeForCdp(localValue) {
			if ("handle" in localValue && localValue.handle) return { objectId: localValue.handle };
			else if ("handle" in localValue || "sharedId" in localValue) throw new protocol_js_1.NoSuchHandleException("Handle was not found.");
			switch (localValue.type) {
				case "undefined": return { unserializableValue: "undefined" };
				case "null": return { unserializableValue: "null" };
				case "string": return { value: localValue.value };
				case "number":
					if (localValue.value === "NaN") return { unserializableValue: "NaN" };
					else if (localValue.value === "-0") return { unserializableValue: "-0" };
					else if (localValue.value === "Infinity") return { unserializableValue: "Infinity" };
					else if (localValue.value === "-Infinity") return { unserializableValue: "-Infinity" };
					return { value: localValue.value };
				case "boolean": return { value: Boolean(localValue.value) };
				case "bigint": return { unserializableValue: `BigInt(${JSON.stringify(localValue.value)})` };
				case "date": return { unserializableValue: `new Date(Date.parse(${JSON.stringify(localValue.value)}))` };
				case "regexp": return { unserializableValue: `new RegExp(${JSON.stringify(localValue.value.pattern)}, ${JSON.stringify(localValue.value.flags)})` };
				case "map": {
					const keyValueArray = await this.#flattenKeyValuePairs(localValue.value);
					const { result } = await this.cdpClient.sendCommand("Runtime.callFunctionOn", {
						functionDeclaration: String((...args) => {
							const result = /* @__PURE__ */ new Map();
							for (let i = 0; i < args.length; i += 2) result.set(args[i], args[i + 1]);
							return result;
						}),
						awaitPromise: false,
						arguments: keyValueArray,
						returnByValue: false,
						executionContextId: this.executionContextId
					});
					return { objectId: result.objectId };
				}
				case "object": {
					const keyValueArray = await this.#flattenKeyValuePairs(localValue.value);
					const { result } = await this.cdpClient.sendCommand("Runtime.callFunctionOn", {
						functionDeclaration: String((...args) => {
							const result = {};
							for (let i = 0; i < args.length; i += 2) {
								const key = args[i];
								result[key] = args[i + 1];
							}
							return result;
						}),
						awaitPromise: false,
						arguments: keyValueArray,
						returnByValue: false,
						executionContextId: this.executionContextId
					});
					return { objectId: result.objectId };
				}
				case "array": {
					const args = await this.#flattenValueList(localValue.value);
					const { result } = await this.cdpClient.sendCommand("Runtime.callFunctionOn", {
						functionDeclaration: String((...args) => args),
						awaitPromise: false,
						arguments: args,
						returnByValue: false,
						executionContextId: this.executionContextId
					});
					return { objectId: result.objectId };
				}
				case "set": {
					const args = await this.#flattenValueList(localValue.value);
					const { result } = await this.cdpClient.sendCommand("Runtime.callFunctionOn", {
						functionDeclaration: String((...args) => new Set(args)),
						awaitPromise: false,
						arguments: args,
						returnByValue: false,
						executionContextId: this.executionContextId
					});
					return { objectId: result.objectId };
				}
				case "channel": return { objectId: await new ChannelProxy_js_1.ChannelProxy(localValue.value, this.#logger).init(this, this.#eventManager) };
			}
			throw new Error(`Value ${JSON.stringify(localValue)} is not deserializable.`);
		}
		async #getExceptionResult(exceptionDetails, lineOffset, resultOwnership) {
			return {
				exceptionDetails: await this.#serializeCdpExceptionDetails(exceptionDetails, lineOffset, resultOwnership),
				realm: this.realmId,
				type: "exception"
			};
		}
		static #getSerializationOptions(serialization, serializationOptions) {
			return {
				serialization,
				additionalParameters: Realm.#getAdditionalSerializationParameters(serializationOptions),
				...Realm.#getMaxObjectDepth(serializationOptions)
			};
		}
		static #getAdditionalSerializationParameters(serializationOptions) {
			const additionalParameters = {};
			if (serializationOptions.maxDomDepth !== void 0) additionalParameters["maxNodeDepth"] = serializationOptions.maxDomDepth === null ? 1e3 : serializationOptions.maxDomDepth;
			if (serializationOptions.includeShadowTree !== void 0) additionalParameters["includeShadowTree"] = serializationOptions.includeShadowTree;
			return additionalParameters;
		}
		static #getMaxObjectDepth(serializationOptions) {
			return serializationOptions.maxObjectDepth === void 0 || serializationOptions.maxObjectDepth === null ? {} : { maxDepth: serializationOptions.maxObjectDepth };
		}
		async #releaseObject(handle) {
			try {
				await this.cdpClient.sendCommand("Runtime.releaseObject", { objectId: handle });
			} catch (error) {
				if (!(error.code === -32e3 && error.message === "Invalid remote object id")) throw error;
			}
		}
		async disown(handle) {
			if (this.realmStorage.knownHandlesToRealmMap.get(handle) !== this.realmId) return;
			await this.#releaseObject(handle);
			this.realmStorage.knownHandlesToRealmMap.delete(handle);
		}
		dispose() {
			if (!this.isHidden()) this.#registerEvent({
				type: "event",
				method: protocol_js_1.ChromiumBidi.Script.EventNames.RealmDestroyed,
				params: { realm: this.realmId }
			});
		}
	};
}));
var require_WindowRealm = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WindowRealm = void 0;
	var protocol_js_1 = require_protocol();
	var Realm_js_1 = require_Realm();
	var SharedId_js_1 = require_SharedId();
	var WindowRealm = class extends Realm_js_1.Realm {
		#browsingContextId;
		#browsingContextStorage;
		sandbox;
		constructor(browsingContextId, browsingContextStorage, cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage, sandbox) {
			super(cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage);
			this.#browsingContextId = browsingContextId;
			this.#browsingContextStorage = browsingContextStorage;
			this.sandbox = sandbox;
			this.initialize();
		}
		#getBrowsingContextId(navigableId) {
			return this.#browsingContextStorage.getAllContexts().find((context) => context.navigableId === navigableId)?.id ?? "UNKNOWN";
		}
		get browsingContext() {
			return this.#browsingContextStorage.getContext(this.#browsingContextId);
		}
		/**
		* Do not expose to user hidden realms.
		*/
		isHidden() {
			return this.realmStorage.hiddenSandboxes.has(this.sandbox);
		}
		get associatedBrowsingContexts() {
			return [this.browsingContext];
		}
		get realmType() {
			return "window";
		}
		get realmInfo() {
			return {
				...this.baseInfo,
				type: this.realmType,
				context: this.#browsingContextId,
				sandbox: this.sandbox
			};
		}
		get source() {
			return {
				realm: this.realmId,
				context: this.browsingContext.id
			};
		}
		serializeForBiDi(deepSerializedValue, internalIdMap) {
			const bidiValue = deepSerializedValue.value;
			if (deepSerializedValue.type === "node" && bidiValue !== void 0) {
				if (Object.hasOwn(bidiValue, "backendNodeId")) {
					let navigableId = this.browsingContext.navigableId ?? "UNKNOWN";
					if (Object.hasOwn(bidiValue, "loaderId")) {
						navigableId = bidiValue.loaderId;
						delete bidiValue["loaderId"];
					}
					deepSerializedValue.sharedId = (0, SharedId_js_1.getSharedId)(this.#getBrowsingContextId(navigableId), navigableId, bidiValue.backendNodeId);
					delete bidiValue["backendNodeId"];
				}
				if (Object.hasOwn(bidiValue, "children")) for (const i in bidiValue.children) bidiValue.children[i] = this.serializeForBiDi(bidiValue.children[i], internalIdMap);
				if (Object.hasOwn(bidiValue, "shadowRoot") && bidiValue.shadowRoot !== null) bidiValue.shadowRoot = this.serializeForBiDi(bidiValue.shadowRoot, internalIdMap);
				if (bidiValue.namespaceURI === "") bidiValue.namespaceURI = null;
			}
			return super.serializeForBiDi(deepSerializedValue, internalIdMap);
		}
		async deserializeForCdp(localValue) {
			if ("sharedId" in localValue && localValue.sharedId) {
				const parsedSharedId = (0, SharedId_js_1.parseSharedId)(localValue.sharedId);
				if (parsedSharedId === null) throw new protocol_js_1.NoSuchNodeException(`SharedId "${localValue.sharedId}" was not found.`);
				const { documentId, backendNodeId } = parsedSharedId;
				if (this.browsingContext.navigableId !== documentId) throw new protocol_js_1.NoSuchNodeException(`SharedId "${localValue.sharedId}" belongs to different document. Current document is ${this.browsingContext.navigableId}.`);
				try {
					const { object } = await this.cdpClient.sendCommand("DOM.resolveNode", {
						backendNodeId,
						executionContextId: this.executionContextId
					});
					return { objectId: object.objectId };
				} catch (error) {
					if (error.code === -32e3 && error.message === "No node with given id found") throw new protocol_js_1.NoSuchNodeException(`SharedId "${localValue.sharedId}" was not found.`);
					throw new protocol_js_1.UnknownErrorException(error.message, error.stack);
				}
			}
			return await super.deserializeForCdp(localValue);
		}
		async evaluate(expression, awaitPromise, resultOwnership, serializationOptions, userActivation, includeCommandLineApi) {
			await this.#browsingContextStorage.getContext(this.#browsingContextId).targetUnblockedOrThrow();
			return await super.evaluate(expression, awaitPromise, resultOwnership, serializationOptions, userActivation, includeCommandLineApi);
		}
		async callFunction(functionDeclaration, awaitPromise, thisLocalValue, argumentsLocalValues, resultOwnership, serializationOptions, userActivation) {
			await this.#browsingContextStorage.getContext(this.#browsingContextId).targetUnblockedOrThrow();
			return await super.callFunction(functionDeclaration, awaitPromise, thisLocalValue, argumentsLocalValues, resultOwnership, serializationOptions, userActivation);
		}
	};
	exports.WindowRealm = WindowRealm;
}));
var require_urlHelpers = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.urlMatchesAboutBlank = urlMatchesAboutBlank;
	/**
	* A URL matches about:blank if its scheme is "about", its path contains a single string
	* "blank", its username and password are the empty string, and its host is null.
	* https://html.spec.whatwg.org/multipage/urls-and-fetching.html#matches-about:blank
	* @param {string} url
	* @return {boolean}
	*/
	function urlMatchesAboutBlank(url) {
		if (url === "") return true;
		try {
			const parsedUrl = new URL(url);
			return parsedUrl.protocol.replace(/:$/, "").toLowerCase() === "about" && parsedUrl.pathname.toLowerCase() === "blank" && parsedUrl.username === "" && parsedUrl.password === "" && parsedUrl.host === "";
		} catch (err) {
			if (err instanceof TypeError) return false;
			throw err;
		}
	}
}));
var require_NavigationTracker = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NavigationTracker = exports.NavigationState = exports.NavigationResult = void 0;
	var protocol_js_1 = require_protocol();
	var Deferred_js_1 = require_Deferred();
	var log_js_1 = require_log();
	var time_js_1 = require_time();
	var urlHelpers_js_1 = require_urlHelpers();
	var uuid_js_1 = require_uuid();
	var NavigationResult = class {
		eventName;
		message;
		constructor(eventName, message) {
			this.eventName = eventName;
			this.message = message;
		}
	};
	exports.NavigationResult = NavigationResult;
	var NavigationState = class {
		navigationId = (0, uuid_js_1.uuidv4)();
		#browsingContextId;
		#started = false;
		#finished = new Deferred_js_1.Deferred();
		url;
		loaderId;
		#isInitial;
		#eventManager;
		committed = new Deferred_js_1.Deferred();
		isFragmentNavigation;
		get finished() {
			return this.#finished;
		}
		constructor(url, browsingContextId, isInitial, eventManager) {
			this.#browsingContextId = browsingContextId;
			this.url = url;
			this.#isInitial = isInitial;
			this.#eventManager = eventManager;
		}
		navigationInfo() {
			return {
				context: this.#browsingContextId,
				navigation: this.navigationId,
				timestamp: (0, time_js_1.getTimestamp)(),
				url: this.url
			};
		}
		start() {
			if (!this.#isInitial && !this.#started && !this.isFragmentNavigation) this.#eventManager.registerEvent({
				type: "event",
				method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.NavigationStarted,
				params: this.navigationInfo()
			}, this.#browsingContextId);
			this.#started = true;
		}
		#finish(navigationResult) {
			this.#started = true;
			if (!this.#isInitial && !this.#finished.isFinished && navigationResult.eventName !== "browsingContext.load") this.#eventManager.registerEvent({
				type: "event",
				method: navigationResult.eventName,
				params: this.navigationInfo()
			}, this.#browsingContextId);
			this.#finished.resolve(navigationResult);
		}
		frameNavigated() {
			this.committed.resolve();
			if (!this.#isInitial) this.#eventManager.registerEvent({
				type: "event",
				method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.NavigationCommitted,
				params: this.navigationInfo()
			}, this.#browsingContextId);
		}
		fragmentNavigated() {
			this.committed.resolve();
			this.#finish(new NavigationResult("browsingContext.fragmentNavigated"));
		}
		load() {
			this.#finish(new NavigationResult("browsingContext.load"));
		}
		fail(message) {
			this.#finish(new NavigationResult(this.committed.isFinished ? "browsingContext.navigationAborted" : "browsingContext.navigationFailed", message));
		}
	};
	exports.NavigationState = NavigationState;
	exports.NavigationTracker = class NavigationTracker {
		#eventManager;
		#logger;
		#loaderIdToNavigationsMap = /* @__PURE__ */ new Map();
		#browsingContextId;
		/**
		* Last committed navigation is committed, but is not guaranteed to be finished, as it
		* can still wait for `load` or `DOMContentLoaded` events.
		*/
		#lastCommittedNavigation;
		/**
		* Pending navigation is a navigation that is started but not yet committed.
		*/
		#pendingNavigation;
		#isInitialNavigation = true;
		constructor(url, browsingContextId, eventManager, logger) {
			this.#browsingContextId = browsingContextId;
			this.#eventManager = eventManager;
			this.#logger = logger;
			this.#isInitialNavigation = true;
			this.#lastCommittedNavigation = new NavigationState(url, browsingContextId, (0, urlHelpers_js_1.urlMatchesAboutBlank)(url), this.#eventManager);
		}
		/**
		* Returns current started ongoing navigation. It can be either a started pending
		* navigation, or one is already navigated.
		*/
		get currentNavigationId() {
			if (this.#pendingNavigation?.isFragmentNavigation === false) return this.#pendingNavigation.navigationId;
			return this.#lastCommittedNavigation.navigationId;
		}
		/**
		* Flags if the current navigation relates to the initial to `about:blank` navigation.
		*/
		get isInitialNavigation() {
			return this.#isInitialNavigation;
		}
		/**
		* Url of the last navigated navigation.
		*/
		get url() {
			return this.#lastCommittedNavigation.url;
		}
		/**
		* Creates a pending navigation e.g. when navigation command is called. Required to
		* provide navigation id before the actual navigation is started. It will be used when
		* navigation started. Can be aborted, failed, fragment navigated, or became a current
		* navigation.
		*/
		createPendingNavigation(url, canBeInitialNavigation = false) {
			this.#logger?.(log_js_1.LogType.debug, "createCommandNavigation");
			this.#isInitialNavigation = canBeInitialNavigation && this.#isInitialNavigation && (0, urlHelpers_js_1.urlMatchesAboutBlank)(url);
			this.#pendingNavigation?.fail("navigation canceled by concurrent navigation");
			const navigation = new NavigationState(url, this.#browsingContextId, this.#isInitialNavigation, this.#eventManager);
			this.#pendingNavigation = navigation;
			return navigation;
		}
		dispose() {
			this.#pendingNavigation?.fail("navigation canceled by context disposal");
			this.#lastCommittedNavigation.fail("navigation canceled by context disposal");
		}
		onTargetInfoChanged(url) {
			this.#logger?.(log_js_1.LogType.debug, `onTargetInfoChanged ${url}`);
			this.#lastCommittedNavigation.url = url;
		}
		#getNavigationForFrameNavigated(url, loaderId) {
			if (this.#loaderIdToNavigationsMap.has(loaderId)) return this.#loaderIdToNavigationsMap.get(loaderId);
			if (this.#pendingNavigation !== void 0 && this.#pendingNavigation.loaderId === void 0) return this.#pendingNavigation;
			return this.createPendingNavigation(url, true);
		}
		/**
		* @param {string} unreachableUrl indicated the navigation is actually failed.
		*/
		frameNavigated(url, loaderId, unreachableUrl) {
			this.#logger?.(log_js_1.LogType.debug, `frameNavigated ${url}`);
			if (unreachableUrl !== void 0) {
				const navigation = this.#loaderIdToNavigationsMap.get(loaderId) ?? this.#pendingNavigation ?? this.createPendingNavigation(unreachableUrl, true);
				navigation.url = unreachableUrl;
				navigation.start();
				navigation.fail("the requested url is unreachable");
				return;
			}
			const navigation = this.#getNavigationForFrameNavigated(url, loaderId);
			if (navigation !== this.#lastCommittedNavigation) this.#lastCommittedNavigation.fail("navigation canceled by concurrent navigation");
			navigation.url = url;
			navigation.loaderId = loaderId;
			this.#loaderIdToNavigationsMap.set(loaderId, navigation);
			navigation.start();
			navigation.frameNavigated();
			this.#lastCommittedNavigation = navigation;
			if (this.#pendingNavigation === navigation) this.#pendingNavigation = void 0;
		}
		navigatedWithinDocument(url, navigationType) {
			this.#logger?.(log_js_1.LogType.debug, `navigatedWithinDocument ${url}, ${navigationType}`);
			this.#lastCommittedNavigation.url = url;
			if (navigationType !== "fragment") return;
			const fragmentNavigation = this.#pendingNavigation?.isFragmentNavigation === true ? this.#pendingNavigation : new NavigationState(url, this.#browsingContextId, false, this.#eventManager);
			fragmentNavigation.fragmentNavigated();
			if (fragmentNavigation === this.#pendingNavigation) this.#pendingNavigation = void 0;
		}
		/**
		* Required to mark navigation as fully complete.
		* TODO: navigation should be complete when it became the current one on
		* `Page.frameNavigated` or on navigating command finished with a new loader Id.
		*/
		loadPageEvent(loaderId) {
			this.#logger?.(log_js_1.LogType.debug, "loadPageEvent");
			this.#isInitialNavigation = false;
			this.#loaderIdToNavigationsMap.get(loaderId)?.load();
		}
		/**
		* Fail navigation due to navigation command failed.
		*/
		failNavigation(navigation, errorText) {
			this.#logger?.(log_js_1.LogType.debug, "failCommandNavigation");
			navigation.fail(errorText);
		}
		/**
		* Updates the navigation's `loaderId` and sets it as current one, if it is a
		* cross-document navigation.
		*/
		navigationCommandFinished(navigation, loaderId) {
			this.#logger?.(log_js_1.LogType.debug, `finishCommandNavigation ${navigation.navigationId}, ${loaderId}`);
			if (loaderId !== void 0) {
				navigation.loaderId = loaderId;
				this.#loaderIdToNavigationsMap.set(loaderId, navigation);
			}
			navigation.isFragmentNavigation = loaderId === void 0;
		}
		frameStartedNavigating(url, loaderId, navigationType) {
			this.#logger?.(log_js_1.LogType.debug, `frameStartedNavigating ${url}, ${loaderId}`);
			if (this.#pendingNavigation && this.#pendingNavigation?.loaderId !== void 0 && this.#pendingNavigation?.loaderId !== loaderId) {
				this.#pendingNavigation?.fail("navigation canceled by concurrent navigation");
				this.#pendingNavigation = void 0;
			}
			if (this.#loaderIdToNavigationsMap.has(loaderId)) {
				const existingNavigation = this.#loaderIdToNavigationsMap.get(loaderId);
				existingNavigation.isFragmentNavigation = NavigationTracker.#isFragmentNavigation(navigationType);
				this.#pendingNavigation = existingNavigation;
				return;
			}
			const pendingNavigation = this.#pendingNavigation ?? this.createPendingNavigation(url, true);
			this.#loaderIdToNavigationsMap.set(loaderId, pendingNavigation);
			pendingNavigation.isFragmentNavigation = NavigationTracker.#isFragmentNavigation(navigationType);
			pendingNavigation.url = url;
			pendingNavigation.loaderId = loaderId;
			pendingNavigation.start();
		}
		static #isFragmentNavigation(navigationType) {
			return ["historySameDocument", "sameDocument"].includes(navigationType);
		}
		/**
		* If there is a navigation with the loaderId equals to the network request id, it means
		* that the navigation failed.
		*/
		networkLoadingFailed(loaderId, errorText) {
			this.#loaderIdToNavigationsMap.get(loaderId)?.fail(errorText);
		}
	};
}));
var require_BrowsingContextImpl = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BrowsingContextImpl = void 0;
	exports.serializeOrigin = serializeOrigin;
	var protocol_js_1 = require_protocol();
	var assert_js_1 = require_assert();
	var Deferred_js_1 = require_Deferred();
	var log_js_1 = require_log();
	var time_js_1 = require_time();
	var unitConversions_js_1 = require_unitConversions();
	var uuid_js_1 = require_uuid();
	var SharedId_js_1 = require_SharedId();
	var WindowRealm_js_1 = require_WindowRealm();
	var NavigationTracker_js_1 = require_NavigationTracker();
	var BrowsingContextImpl = class {
		static LOGGER_PREFIX = `${log_js_1.LogType.debug}:browsingContext`;
		/** Direct children browsing contexts. */
		#children = /* @__PURE__ */ new Set();
		/** The ID of this browsing context. */
		#id;
		userContext;
		#hiddenSandbox = (0, uuid_js_1.uuidv4)();
		#downloadIdToUrlMap = /* @__PURE__ */ new Map();
		/**
		* The ID of the parent browsing context.
		* If null, this is a top-level context.
		*/
		#loaderId;
		#parentId = null;
		#originalOpener;
		#lifecycle = {
			DOMContentLoaded: new Deferred_js_1.Deferred(),
			load: new Deferred_js_1.Deferred()
		};
		#cdpTarget;
		#defaultRealmDeferred = new Deferred_js_1.Deferred();
		#browsingContextStorage;
		#eventManager;
		#logger;
		#navigationTracker;
		#realmStorage;
		#configStorage;
		#lastUserPromptType;
		constructor(id, parentId, userContext, cdpTarget, eventManager, browsingContextStorage, realmStorage, configStorage, url, originalOpener, logger) {
			this.#cdpTarget = cdpTarget;
			this.#id = id;
			this.#parentId = parentId;
			this.userContext = userContext;
			this.#eventManager = eventManager;
			this.#browsingContextStorage = browsingContextStorage;
			this.#realmStorage = realmStorage;
			this.#configStorage = configStorage;
			this.#logger = logger;
			this.#originalOpener = originalOpener;
			this.#realmStorage.hiddenSandboxes.add(this.#hiddenSandbox);
			this.#navigationTracker = new NavigationTracker_js_1.NavigationTracker(url, id, eventManager, logger);
		}
		static create(id, parentId, userContext, cdpTarget, eventManager, browsingContextStorage, realmStorage, configStorage, url, originalOpener, logger) {
			const context = new _a(id, parentId, userContext, cdpTarget, eventManager, browsingContextStorage, realmStorage, configStorage, url, originalOpener, logger);
			context.#initListeners();
			browsingContextStorage.addContext(context);
			if (!context.isTopLevelContext()) context.parent.addChild(context.id);
			eventManager.registerPromiseEvent(context.targetUnblockedOrThrow().then(() => {
				return {
					kind: "success",
					value: {
						type: "event",
						method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.ContextCreated,
						params: {
							...context.serializeToBidiValue(),
							url
						}
					}
				};
			}, (error) => {
				return {
					kind: "error",
					error
				};
			}), context.id, protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.ContextCreated);
			return context;
		}
		/**
		* @see https://html.spec.whatwg.org/multipage/document-sequences.html#navigable
		*/
		get navigableId() {
			return this.#loaderId;
		}
		get navigationId() {
			return this.#navigationTracker.currentNavigationId;
		}
		dispose(emitContextDestroyed) {
			this.#navigationTracker.dispose();
			this.#realmStorage.deleteRealms({ browsingContextId: this.id });
			if (!this.isTopLevelContext()) this.parent.#children.delete(this.id);
			this.#failLifecycleIfNotFinished();
			if (emitContextDestroyed) this.#eventManager.registerEvent({
				type: "event",
				method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.ContextDestroyed,
				params: this.serializeToBidiValue(null)
			}, this.id);
			this.#deleteAllChildren();
			this.#eventManager.clearBufferedEvents(this.id);
			this.#browsingContextStorage.deleteContextById(this.id);
		}
		/** Returns the ID of this context. */
		get id() {
			return this.#id;
		}
		/** Returns the parent context ID. */
		get parentId() {
			return this.#parentId;
		}
		/** Sets the parent context ID and updates parent's children. */
		set parentId(parentId) {
			if (this.#parentId !== null) {
				this.#logger?.(log_js_1.LogType.debugError, "Parent context already set");
				return;
			}
			this.#parentId = parentId;
			if (!this.isTopLevelContext()) this.parent.addChild(this.id);
		}
		/** Returns the parent context. */
		get parent() {
			if (this.parentId === null) return null;
			return this.#browsingContextStorage.getContext(this.parentId);
		}
		/** Returns all direct children contexts. */
		get directChildren() {
			return [...this.#children].map((id) => this.#browsingContextStorage.getContext(id));
		}
		/** Returns all children contexts, flattened. */
		get allChildren() {
			const children = this.directChildren;
			return children.concat(...children.map((child) => child.allChildren));
		}
		/**
		* Returns true if this is a top-level context.
		* This is the case whenever the parent context ID is null.
		*/
		isTopLevelContext() {
			return this.#parentId === null;
		}
		get top() {
			let topContext = this;
			let parent = topContext.parent;
			while (parent) {
				topContext = parent;
				parent = topContext.parent;
			}
			return topContext;
		}
		addChild(childId) {
			this.#children.add(childId);
		}
		#deleteAllChildren(emitContextDestroyed = false) {
			this.directChildren.map((child) => child.dispose(emitContextDestroyed));
		}
		get cdpTarget() {
			return this.#cdpTarget;
		}
		updateCdpTarget(cdpTarget) {
			this.#cdpTarget = cdpTarget;
			this.#initListeners();
		}
		get url() {
			return this.#navigationTracker.url;
		}
		async lifecycleLoaded() {
			await this.#lifecycle.load;
		}
		async targetUnblockedOrThrow() {
			const result = await this.#cdpTarget.unblocked;
			if (result.kind === "error") throw result.error;
		}
		/** Returns a sandbox for internal helper scripts which is not exposed to the user.*/
		async getOrCreateHiddenSandbox() {
			return await this.#getOrCreateSandboxInternal(this.#hiddenSandbox);
		}
		/** Returns a sandbox which is exposed to user. */
		async getOrCreateUserSandbox(sandbox) {
			const realm = await this.#getOrCreateSandboxInternal(sandbox);
			if (realm.isHidden()) throw new protocol_js_1.NoSuchFrameException(`Realm "${sandbox}" not found`);
			return realm;
		}
		async #getOrCreateSandboxInternal(sandbox) {
			if (sandbox === void 0 || sandbox === "") return await this.#defaultRealmDeferred;
			let maybeSandboxes = this.#realmStorage.findRealms({
				browsingContextId: this.id,
				sandbox
			});
			if (maybeSandboxes.length === 0) {
				await this.#cdpTarget.cdpClient.sendCommand("Page.createIsolatedWorld", {
					frameId: this.id,
					worldName: sandbox
				});
				maybeSandboxes = this.#realmStorage.findRealms({
					browsingContextId: this.id,
					sandbox
				});
				(0, assert_js_1.assert)(maybeSandboxes.length !== 0);
			}
			return maybeSandboxes[0];
		}
		/**
		* Implements https://w3c.github.io/webdriver-bidi/#get-the-navigable-info.
		*/
		serializeToBidiValue(maxDepth = 0, addParentField = true) {
			return {
				context: this.#id,
				url: this.url,
				userContext: this.userContext,
				originalOpener: this.#originalOpener ?? null,
				clientWindow: `${this.cdpTarget.windowId}`,
				children: maxDepth === null || maxDepth > 0 ? this.directChildren.map((c) => c.serializeToBidiValue(maxDepth === null ? maxDepth : maxDepth - 1, false)) : null,
				...addParentField ? { parent: this.#parentId } : {}
			};
		}
		onTargetInfoChanged(params) {
			this.#navigationTracker.onTargetInfoChanged(params.targetInfo.url);
		}
		#initListeners() {
			this.#cdpTarget.cdpClient.on("Network.loadingFailed", (params) => {
				this.#navigationTracker.networkLoadingFailed(params.requestId, params.errorText);
			});
			this.#cdpTarget.cdpClient.on("Page.fileChooserOpened", (params) => {
				if (this.id !== params.frameId) return;
				if (this.#loaderId === void 0) {
					this.#logger?.(log_js_1.LogType.debugError, "LoaderId should be defined when file upload is shown", params);
					return;
				}
				const element = params.backendNodeId === void 0 ? void 0 : { sharedId: (0, SharedId_js_1.getSharedId)(this.id, this.#loaderId, params.backendNodeId) };
				this.#eventManager.registerEvent({
					type: "event",
					method: protocol_js_1.ChromiumBidi.Input.EventNames.FileDialogOpened,
					params: {
						context: this.id,
						multiple: params.mode === "selectMultiple",
						element
					}
				}, this.id);
			});
			this.#cdpTarget.cdpClient.on("Page.frameNavigated", (params) => {
				if (this.id !== params.frame.id) return;
				this.#navigationTracker.frameNavigated(params.frame.url + (params.frame.urlFragment ?? ""), params.frame.loaderId, params.frame.unreachableUrl);
				this.#deleteAllChildren();
				this.#documentChanged(params.frame.loaderId);
			});
			this.#cdpTarget.cdpClient.on("Page.frameStartedNavigating", (params) => {
				if (this.id !== params.frameId) return;
				this.#navigationTracker.frameStartedNavigating(params.url, params.loaderId, params.navigationType);
			});
			this.#cdpTarget.cdpClient.on("Page.navigatedWithinDocument", (params) => {
				if (this.id !== params.frameId) return;
				this.#navigationTracker.navigatedWithinDocument(params.url, params.navigationType);
				if (params.navigationType === "historyApi") {
					this.#eventManager.registerEvent({
						type: "event",
						method: "browsingContext.historyUpdated",
						params: {
							context: this.id,
							timestamp: (0, time_js_1.getTimestamp)(),
							url: this.#navigationTracker.url
						}
					}, this.id);
					return;
				}
			});
			this.#cdpTarget.cdpClient.on("Page.lifecycleEvent", (params) => {
				if (this.id !== params.frameId) return;
				if (params.name === "init") {
					this.#documentChanged(params.loaderId);
					return;
				}
				if (params.name === "commit") {
					this.#loaderId = params.loaderId;
					return;
				}
				if (!this.#loaderId) this.#loaderId = params.loaderId;
				if (params.loaderId !== this.#loaderId) return;
				switch (params.name) {
					case "DOMContentLoaded":
						if (!this.#navigationTracker.isInitialNavigation) this.#eventManager.registerEvent({
							type: "event",
							method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.DomContentLoaded,
							params: {
								context: this.id,
								navigation: this.#navigationTracker.currentNavigationId,
								timestamp: (0, time_js_1.getTimestamp)(),
								url: this.#navigationTracker.url
							}
						}, this.id);
						this.#lifecycle.DOMContentLoaded.resolve();
						break;
					case "load":
						if (!this.#navigationTracker.isInitialNavigation) this.#eventManager.registerEvent({
							type: "event",
							method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.Load,
							params: {
								context: this.id,
								navigation: this.#navigationTracker.currentNavigationId,
								timestamp: (0, time_js_1.getTimestamp)(),
								url: this.#navigationTracker.url
							}
						}, this.id);
						this.#navigationTracker.loadPageEvent(params.loaderId);
						this.#lifecycle.load.resolve();
						break;
				}
			});
			this.#cdpTarget.cdpClient.on("Runtime.executionContextCreated", (params) => {
				const { auxData, name, uniqueId, id } = params.context;
				if (!auxData || auxData.frameId !== this.id) return;
				if (auxData.type === "isolated" && name === "") return;
				let origin;
				let sandbox;
				switch (auxData.type) {
					case "isolated":
						sandbox = name;
						if (!this.#defaultRealmDeferred.isFinished) this.#logger?.(log_js_1.LogType.debugError, "Unexpectedly, isolated realm created before the default one");
						origin = this.#defaultRealmDeferred.isFinished ? this.#defaultRealmDeferred.result.origin : "";
						break;
					case "default":
						origin = serializeOrigin(params.context.origin);
						break;
					default: return;
				}
				const realm = new WindowRealm_js_1.WindowRealm(this.id, this.#browsingContextStorage, this.#cdpTarget.cdpClient, this.#eventManager, id, this.#logger, origin, uniqueId, this.#realmStorage, sandbox);
				if (auxData.isDefault) {
					this.#defaultRealmDeferred.resolve(realm);
					Promise.all(this.#cdpTarget.getChannels().map((channel) => channel.startListenerFromWindow(realm, this.#eventManager)));
				}
			});
			this.#cdpTarget.cdpClient.on("Runtime.executionContextDestroyed", (params) => {
				if (this.#defaultRealmDeferred.isFinished && this.#defaultRealmDeferred.result.executionContextId === params.executionContextId) this.#defaultRealmDeferred = new Deferred_js_1.Deferred();
				this.#realmStorage.deleteRealms({
					cdpSessionId: this.#cdpTarget.cdpSessionId,
					executionContextId: params.executionContextId
				});
			});
			this.#cdpTarget.cdpClient.on("Runtime.executionContextsCleared", () => {
				if (!this.#defaultRealmDeferred.isFinished) this.#defaultRealmDeferred.reject(new protocol_js_1.UnknownErrorException("execution contexts cleared"));
				this.#defaultRealmDeferred = new Deferred_js_1.Deferred();
				this.#realmStorage.deleteRealms({ cdpSessionId: this.#cdpTarget.cdpSessionId });
			});
			this.#cdpTarget.cdpClient.on("Page.javascriptDialogClosed", (params) => {
				if (params.frameId && this.id !== params.frameId) return;
				if (!params.frameId && this.#parentId && this.#cdpTarget.cdpClient !== this.#browsingContextStorage.getContext(this.#parentId)?.cdpTarget.cdpClient) return;
				const accepted = params.result;
				if (this.#lastUserPromptType === void 0) this.#logger?.(log_js_1.LogType.debugError, "Unexpectedly no opening prompt event before closing one");
				this.#eventManager.registerEvent({
					type: "event",
					method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.UserPromptClosed,
					params: {
						context: this.id,
						accepted,
						type: this.#lastUserPromptType ?? "UNKNOWN",
						userText: accepted && params.userInput ? params.userInput : void 0
					}
				}, this.id);
				this.#lastUserPromptType = void 0;
			});
			this.#cdpTarget.cdpClient.on("Page.javascriptDialogOpening", (params) => {
				if (params.frameId && this.id !== params.frameId) return;
				if (!params.frameId && this.#parentId && this.#cdpTarget.cdpClient !== this.#browsingContextStorage.getContext(this.#parentId)?.cdpTarget.cdpClient) return;
				const promptType = _a.#getPromptType(params.type);
				this.#lastUserPromptType = promptType;
				const promptHandler = this.#getPromptHandler(promptType);
				this.#eventManager.registerEvent({
					type: "event",
					method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.UserPromptOpened,
					params: {
						context: this.id,
						handler: promptHandler,
						type: promptType,
						message: params.message,
						...params.type === "prompt" ? { defaultValue: params.defaultPrompt } : {}
					}
				}, this.id);
				switch (promptHandler) {
					case "accept":
						this.handleUserPrompt(true);
						break;
					case "dismiss":
						this.handleUserPrompt(false);
						break;
					case "ignore": break;
				}
			});
			this.#cdpTarget.browserCdpClient.on("Browser.downloadWillBegin", (params) => {
				if (this.id !== params.frameId) return;
				this.#downloadIdToUrlMap.set(params.guid, params.url);
				this.#eventManager.registerEvent({
					type: "event",
					method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.DownloadWillBegin,
					params: {
						context: this.id,
						suggestedFilename: params.suggestedFilename,
						navigation: params.guid,
						timestamp: (0, time_js_1.getTimestamp)(),
						url: params.url
					}
				}, this.id);
			});
			this.#cdpTarget.browserCdpClient.on("Browser.downloadProgress", (params) => {
				if (!this.#downloadIdToUrlMap.has(params.guid)) return;
				if (params.state === "inProgress") return;
				const url = this.#downloadIdToUrlMap.get(params.guid);
				switch (params.state) {
					case "canceled":
						this.#eventManager.registerEvent({
							type: "event",
							method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.DownloadEnd,
							params: {
								status: "canceled",
								context: this.id,
								navigation: params.guid,
								timestamp: (0, time_js_1.getTimestamp)(),
								url
							}
						}, this.id);
						break;
					case "completed":
						this.#eventManager.registerEvent({
							type: "event",
							method: protocol_js_1.ChromiumBidi.BrowsingContext.EventNames.DownloadEnd,
							params: {
								filepath: params.filePath ?? null,
								status: "complete",
								context: this.id,
								navigation: params.guid,
								timestamp: (0, time_js_1.getTimestamp)(),
								url
							}
						}, this.id);
						break;
					default: throw new protocol_js_1.UnknownErrorException(`Unknown download state: ${params.state}`);
				}
			});
		}
		static #getPromptType(cdpType) {
			switch (cdpType) {
				case "alert": return "alert";
				case "beforeunload": return "beforeunload";
				case "confirm": return "confirm";
				case "prompt": return "prompt";
			}
		}
		/**
		* Returns either custom UserContext's prompt handler, global or default one.
		*/
		#getPromptHandler(promptType) {
			const defaultPromptHandler = "dismiss";
			const contextConfig = this.#configStorage.getActiveConfig(this.top.id, this.userContext);
			switch (promptType) {
				case "alert": return contextConfig.userPromptHandler?.alert ?? contextConfig.userPromptHandler?.default ?? defaultPromptHandler;
				case "beforeunload": return contextConfig.userPromptHandler?.beforeUnload ?? contextConfig.userPromptHandler?.default ?? "accept";
				case "confirm": return contextConfig.userPromptHandler?.confirm ?? contextConfig.userPromptHandler?.default ?? defaultPromptHandler;
				case "prompt": return contextConfig.userPromptHandler?.prompt ?? contextConfig.userPromptHandler?.default ?? defaultPromptHandler;
			}
		}
		#documentChanged(loaderId) {
			if (loaderId === void 0 || this.#loaderId === loaderId) return;
			this.#resetLifecycleIfFinished();
			this.#loaderId = loaderId;
			this.#deleteAllChildren(true);
		}
		#resetLifecycleIfFinished() {
			if (this.#lifecycle.DOMContentLoaded.isFinished) this.#lifecycle.DOMContentLoaded = new Deferred_js_1.Deferred();
			else this.#logger?.(_a.LOGGER_PREFIX, "Document changed (DOMContentLoaded)");
			if (this.#lifecycle.load.isFinished) this.#lifecycle.load = new Deferred_js_1.Deferred();
			else this.#logger?.(_a.LOGGER_PREFIX, "Document changed (load)");
		}
		#failLifecycleIfNotFinished() {
			if (!this.#lifecycle.DOMContentLoaded.isFinished) this.#lifecycle.DOMContentLoaded.reject(new protocol_js_1.UnknownErrorException("navigation canceled"));
			if (!this.#lifecycle.load.isFinished) this.#lifecycle.load.reject(new protocol_js_1.UnknownErrorException("navigation canceled"));
		}
		async navigate(url, wait) {
			try {
				new URL(url);
			} catch {
				throw new protocol_js_1.InvalidArgumentException(`Invalid URL: ${url}`);
			}
			const navigationState = this.#navigationTracker.createPendingNavigation(url);
			const cdpNavigatePromise = (async () => {
				const cdpNavigateResult = await this.#cdpTarget.cdpClient.sendCommand("Page.navigate", {
					url,
					frameId: this.id
				});
				if (cdpNavigateResult.errorText) {
					this.#navigationTracker.failNavigation(navigationState, cdpNavigateResult.errorText);
					throw new protocol_js_1.UnknownErrorException(cdpNavigateResult.errorText);
				}
				this.#navigationTracker.navigationCommandFinished(navigationState, cdpNavigateResult.loaderId);
				this.#documentChanged(cdpNavigateResult.loaderId);
			})();
			const result = await Promise.race([this.#waitNavigation(wait, cdpNavigatePromise, navigationState), navigationState.finished]);
			if (result instanceof NavigationTracker_js_1.NavigationResult) {
				if (result.eventName === "browsingContext.navigationAborted" || result.eventName === "browsingContext.navigationFailed") throw new protocol_js_1.UnknownErrorException(result.message ?? "unknown exception");
			}
			return {
				navigation: navigationState.navigationId,
				url: navigationState.url
			};
		}
		async #waitNavigation(wait, cdpCommandPromise, navigationState) {
			await Promise.all([navigationState.committed, cdpCommandPromise]);
			if (wait === "none") return;
			if (navigationState.isFragmentNavigation === true) {
				await navigationState.finished;
				return;
			}
			if (wait === "interactive") {
				await this.#lifecycle.DOMContentLoaded;
				return;
			}
			if (wait === "complete") {
				await this.#lifecycle.load;
				return;
			}
			throw new protocol_js_1.InvalidArgumentException(`Wait condition ${wait} is not supported`);
		}
		async reload(ignoreCache, wait) {
			await this.targetUnblockedOrThrow();
			this.#resetLifecycleIfFinished();
			const navigationState = this.#navigationTracker.createPendingNavigation(this.#navigationTracker.url);
			const cdpReloadPromise = this.#cdpTarget.cdpClient.sendCommand("Page.reload", { ignoreCache });
			const result = await Promise.race([this.#waitNavigation(wait, cdpReloadPromise, navigationState), navigationState.finished]);
			if (result instanceof NavigationTracker_js_1.NavigationResult) {
				if (result.eventName === "browsingContext.navigationAborted" || result.eventName === "browsingContext.navigationFailed") throw new protocol_js_1.UnknownErrorException(result.message ?? "unknown exception");
			}
			return {
				navigation: navigationState.navigationId,
				url: navigationState.url
			};
		}
		async setViewport(viewport, devicePixelRatio, screenOrientation) {
			const config = this.#configStorage.getActiveConfig(this.id, this.userContext);
			await this.cdpTarget.setDeviceMetricsOverride(viewport, devicePixelRatio, screenOrientation, config.screenArea ?? null);
		}
		async handleUserPrompt(accept, userText) {
			await this.top.#cdpTarget.cdpClient.sendCommand("Page.handleJavaScriptDialog", {
				accept: accept ?? true,
				promptText: userText
			});
		}
		async activate() {
			await this.#cdpTarget.cdpClient.sendCommand("Page.bringToFront");
		}
		async captureScreenshot(params) {
			if (!this.isTopLevelContext()) throw new protocol_js_1.UnsupportedOperationException(`Non-top-level 'context' (${params.context}) is currently not supported`);
			const formatParameters = getImageFormatParameters(params);
			let captureBeyondViewport = false;
			let script;
			params.origin ??= "viewport";
			switch (params.origin) {
				case "document":
					script = String(() => {
						const element = document.documentElement;
						return {
							x: 0,
							y: 0,
							width: element.scrollWidth,
							height: element.scrollHeight
						};
					});
					captureBeyondViewport = true;
					break;
				case "viewport":
					script = String(() => {
						const viewport = window.visualViewport;
						return {
							x: viewport.pageLeft,
							y: viewport.pageTop,
							width: viewport.width,
							height: viewport.height
						};
					});
					break;
			}
			const originResult = await (await this.getOrCreateHiddenSandbox()).callFunction(script, false);
			(0, assert_js_1.assert)(originResult.type === "success");
			const origin = deserializeDOMRect(originResult.result);
			(0, assert_js_1.assert)(origin);
			let rect = origin;
			if (params.clip) {
				const clip = params.clip;
				if (params.origin === "viewport" && clip.type === "box") {
					clip.x += origin.x;
					clip.y += origin.y;
				}
				rect = getIntersectionRect(await this.#parseRect(clip), origin);
			}
			if (rect.width === 0 || rect.height === 0) throw new protocol_js_1.UnableToCaptureScreenException(`Unable to capture screenshot with zero dimensions: width=${rect.width}, height=${rect.height}`);
			return await this.#cdpTarget.cdpClient.sendCommand("Page.captureScreenshot", {
				clip: {
					...rect,
					scale: 1
				},
				...formatParameters,
				captureBeyondViewport
			});
		}
		async print(params) {
			if (!this.isTopLevelContext()) throw new protocol_js_1.UnsupportedOperationException("Printing of non-top level contexts is not supported");
			const cdpParams = {};
			if (params.background !== void 0) cdpParams.printBackground = params.background;
			if (params.margin?.bottom !== void 0) cdpParams.marginBottom = (0, unitConversions_js_1.inchesFromCm)(params.margin.bottom);
			if (params.margin?.left !== void 0) cdpParams.marginLeft = (0, unitConversions_js_1.inchesFromCm)(params.margin.left);
			if (params.margin?.right !== void 0) cdpParams.marginRight = (0, unitConversions_js_1.inchesFromCm)(params.margin.right);
			if (params.margin?.top !== void 0) cdpParams.marginTop = (0, unitConversions_js_1.inchesFromCm)(params.margin.top);
			if (params.orientation !== void 0) cdpParams.landscape = params.orientation === "landscape";
			if (params.page?.height !== void 0) cdpParams.paperHeight = (0, unitConversions_js_1.inchesFromCm)(params.page.height);
			if (params.page?.width !== void 0) cdpParams.paperWidth = (0, unitConversions_js_1.inchesFromCm)(params.page.width);
			if (params.pageRanges !== void 0) {
				for (const range of params.pageRanges) {
					if (typeof range === "number") continue;
					const rangeParts = range.split("-");
					if (rangeParts.length < 1 || rangeParts.length > 2) throw new protocol_js_1.InvalidArgumentException(`Invalid page range: ${range} is not a valid integer range.`);
					if (rangeParts.length === 1) {
						parseInteger(rangeParts[0] ?? "");
						continue;
					}
					let lowerBound;
					let upperBound;
					const [rangeLowerPart = "", rangeUpperPart = ""] = rangeParts;
					if (rangeLowerPart === "") lowerBound = 1;
					else lowerBound = parseInteger(rangeLowerPart);
					if (rangeUpperPart === "") upperBound = Number.MAX_SAFE_INTEGER;
					else upperBound = parseInteger(rangeUpperPart);
					if (lowerBound > upperBound) throw new protocol_js_1.InvalidArgumentException(`Invalid page range: ${rangeLowerPart} > ${rangeUpperPart}`);
				}
				cdpParams.pageRanges = params.pageRanges.join(",");
			}
			if (params.scale !== void 0) cdpParams.scale = params.scale;
			if (params.shrinkToFit !== void 0) cdpParams.preferCSSPageSize = !params.shrinkToFit;
			try {
				return { data: (await this.#cdpTarget.cdpClient.sendCommand("Page.printToPDF", cdpParams)).data };
			} catch (error) {
				if (error.message === "invalid print parameters: content area is empty") throw new protocol_js_1.UnsupportedOperationException(error.message);
				throw error;
			}
		}
		/**
		* See
		* https://w3c.github.io/webdriver-bidi/#:~:text=If%20command%20parameters%20contains%20%22clip%22%3A
		*/
		async #parseRect(clip) {
			switch (clip.type) {
				case "box": return {
					x: clip.x,
					y: clip.y,
					width: clip.width,
					height: clip.height
				};
				case "element": {
					const hiddenSandboxRealm = await this.getOrCreateHiddenSandbox();
					const result = await hiddenSandboxRealm.callFunction(String((element) => {
						return element instanceof Element;
					}), false, { type: "undefined" }, [clip.element]);
					if (result.type === "exception") throw new protocol_js_1.NoSuchElementException(`Element '${clip.element.sharedId}' was not found`);
					(0, assert_js_1.assert)(result.result.type === "boolean");
					if (!result.result.value) throw new protocol_js_1.NoSuchElementException(`Node '${clip.element.sharedId}' is not an Element`);
					{
						const result = await hiddenSandboxRealm.callFunction(String((element) => {
							const rect = element.getBoundingClientRect();
							return {
								x: rect.x,
								y: rect.y,
								height: rect.height,
								width: rect.width
							};
						}), false, { type: "undefined" }, [clip.element]);
						(0, assert_js_1.assert)(result.type === "success");
						const rect = deserializeDOMRect(result.result);
						if (!rect) throw new protocol_js_1.UnableToCaptureScreenException(`Could not get bounding box for Element '${clip.element.sharedId}'`);
						return rect;
					}
				}
			}
		}
		async close() {
			await this.#cdpTarget.cdpClient.sendCommand("Page.close");
		}
		async traverseHistory(delta) {
			if (delta === 0) return;
			const history = await this.#cdpTarget.cdpClient.sendCommand("Page.getNavigationHistory");
			const entry = history.entries[history.currentIndex + delta];
			if (!entry) throw new protocol_js_1.NoSuchHistoryEntryException(`No history entry at delta ${delta}`);
			await this.#cdpTarget.cdpClient.sendCommand("Page.navigateToHistoryEntry", { entryId: entry.id });
		}
		async toggleModulesIfNeeded() {
			await Promise.all([
				this.#cdpTarget.toggleNetworkIfNeeded(),
				this.#cdpTarget.toggleDeviceAccessIfNeeded(),
				this.#cdpTarget.togglePreloadIfNeeded()
			]);
		}
		async locateNodes(params) {
			return await this.#locateNodesByLocator(await this.#defaultRealmDeferred, params.locator, params.startNodes ?? [], params.maxNodeCount, params.serializationOptions);
		}
		async #getLocatorDelegate(realm, locator, maxNodeCount, startNodes) {
			switch (locator.type) {
				case "context": throw new Error("Unreachable");
				case "css": return {
					functionDeclaration: String((cssSelector, maxNodeCount, ...startNodes) => {
						const locateNodesUsingCss = (element) => {
							if (!(element instanceof HTMLElement || element instanceof Document || element instanceof DocumentFragment || element instanceof SVGElement)) throw new Error("startNodes in css selector should be HTMLElement, SVGElement or Document or DocumentFragment");
							return [...element.querySelectorAll(cssSelector)];
						};
						startNodes = startNodes.length > 0 ? startNodes : [document];
						const returnedNodes = startNodes.map((startNode) => locateNodesUsingCss(startNode)).flat(1);
						return maxNodeCount === 0 ? returnedNodes : returnedNodes.slice(0, maxNodeCount);
					}),
					argumentsLocalValues: [
						{
							type: "string",
							value: locator.value
						},
						{
							type: "number",
							value: maxNodeCount ?? 0
						},
						...startNodes
					]
				};
				case "xpath": return {
					functionDeclaration: String((xPathSelector, maxNodeCount, ...startNodes) => {
						const expression = new XPathEvaluator().createExpression(xPathSelector);
						const locateNodesUsingXpath = (element) => {
							const xPathResult = expression.evaluate(element, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
							const returnedNodes = [];
							for (let i = 0; i < xPathResult.snapshotLength; i++) returnedNodes.push(xPathResult.snapshotItem(i));
							return returnedNodes;
						};
						startNodes = startNodes.length > 0 ? startNodes : [document];
						const returnedNodes = startNodes.map((startNode) => locateNodesUsingXpath(startNode)).flat(1);
						return maxNodeCount === 0 ? returnedNodes : returnedNodes.slice(0, maxNodeCount);
					}),
					argumentsLocalValues: [
						{
							type: "string",
							value: locator.value
						},
						{
							type: "number",
							value: maxNodeCount ?? 0
						},
						...startNodes
					]
				};
				case "innerText":
					if (locator.value === "") throw new protocol_js_1.InvalidSelectorException("innerText locator cannot be empty");
					return {
						functionDeclaration: String((innerTextSelector, fullMatch, ignoreCase, maxNodeCount, maxDepth, ...startNodes) => {
							const searchText = ignoreCase ? innerTextSelector.toUpperCase() : innerTextSelector;
							const locateNodesUsingInnerText = (node, currentMaxDepth) => {
								const returnedNodes = [];
								if (node instanceof DocumentFragment || node instanceof Document) {
									[...node.children].forEach((child) => returnedNodes.push(...locateNodesUsingInnerText(child, currentMaxDepth)));
									return returnedNodes;
								}
								if (!(node instanceof HTMLElement)) return [];
								const element = node;
								const nodeInnerText = ignoreCase ? element.innerText?.toUpperCase() : element.innerText;
								if (!nodeInnerText.includes(searchText)) return [];
								const childNodes = [];
								for (const child of element.children) if (child instanceof HTMLElement) childNodes.push(child);
								if (childNodes.length === 0) {
									if (fullMatch && nodeInnerText === searchText) returnedNodes.push(element);
									else if (!fullMatch) returnedNodes.push(element);
								} else {
									const childNodeMatches = currentMaxDepth <= 0 ? [] : childNodes.map((child) => locateNodesUsingInnerText(child, currentMaxDepth - 1)).flat(1);
									if (childNodeMatches.length === 0) {
										if (!fullMatch || nodeInnerText === searchText) returnedNodes.push(element);
									} else returnedNodes.push(...childNodeMatches);
								}
								return returnedNodes;
							};
							startNodes = startNodes.length > 0 ? startNodes : [document];
							const returnedNodes = startNodes.map((startNode) => locateNodesUsingInnerText(startNode, maxDepth)).flat(1);
							return maxNodeCount === 0 ? returnedNodes : returnedNodes.slice(0, maxNodeCount);
						}),
						argumentsLocalValues: [
							{
								type: "string",
								value: locator.value
							},
							{
								type: "boolean",
								value: locator.matchType !== "partial"
							},
							{
								type: "boolean",
								value: locator.ignoreCase === true
							},
							{
								type: "number",
								value: maxNodeCount ?? 0
							},
							{
								type: "number",
								value: locator.maxDepth ?? 1e3
							},
							...startNodes
						]
					};
				case "accessibility": {
					if (!locator.value.name && !locator.value.role) throw new protocol_js_1.InvalidSelectorException("Either name or role has to be specified");
					await Promise.all([this.#cdpTarget.cdpClient.sendCommand("Accessibility.enable"), this.#cdpTarget.cdpClient.sendCommand("Accessibility.getRootAXNode")]);
					const bindings = await realm.evaluate("({getAccessibleName, getAccessibleRole})", false, "root", void 0, false, true);
					if (bindings.type !== "success") throw new Error("Could not get bindings");
					if (bindings.result.type !== "object") throw new Error("Could not get bindings");
					return {
						functionDeclaration: String((name, role, bindings, maxNodeCount, ...startNodes) => {
							const returnedNodes = [];
							let aborted = false;
							function collect(contextNodes, selector) {
								if (aborted) return;
								for (const contextNode of contextNodes) {
									let match = true;
									if (selector.role) {
										const role = bindings.getAccessibleRole(contextNode);
										if (selector.role !== role) match = false;
									}
									if (selector.name) {
										const name = bindings.getAccessibleName(contextNode);
										if (selector.name !== name) match = false;
									}
									if (match) {
										if (maxNodeCount !== 0 && returnedNodes.length === maxNodeCount) {
											aborted = true;
											break;
										}
										returnedNodes.push(contextNode);
									}
									const childNodes = [];
									for (const child of contextNode.children) if (child instanceof HTMLElement) childNodes.push(child);
									collect(childNodes, selector);
								}
							}
							startNodes = startNodes.length > 0 ? startNodes : Array.from(document.documentElement.children).filter((c) => c instanceof HTMLElement);
							collect(startNodes, {
								role,
								name
							});
							return returnedNodes;
						}),
						argumentsLocalValues: [
							{
								type: "string",
								value: locator.value.name || ""
							},
							{
								type: "string",
								value: locator.value.role || ""
							},
							{ handle: bindings.result.handle },
							{
								type: "number",
								value: maxNodeCount ?? 0
							},
							...startNodes
						]
					};
				}
			}
		}
		async #locateNodesByLocator(realm, locator, startNodes, maxNodeCount, serializationOptions) {
			if (locator.type === "context") {
				if (startNodes.length !== 0) throw new protocol_js_1.InvalidArgumentException("Start nodes are not supported");
				const contextId = locator.value.context;
				if (!contextId) throw new protocol_js_1.InvalidSelectorException("Invalid context");
				const parent = this.#browsingContextStorage.getContext(contextId).parent;
				if (!parent) throw new protocol_js_1.InvalidArgumentException("This context has no container");
				try {
					const { backendNodeId } = await parent.#cdpTarget.cdpClient.sendCommand("DOM.getFrameOwner", { frameId: contextId });
					const { object } = await parent.#cdpTarget.cdpClient.sendCommand("DOM.resolveNode", { backendNodeId });
					const locatorResult = await realm.callFunction(`function () { return this; }`, false, { handle: object.objectId }, [], "none", serializationOptions);
					if (locatorResult.type === "exception") throw new Error("Unknown exception");
					return { nodes: [locatorResult.result] };
				} catch {
					throw new protocol_js_1.InvalidArgumentException("Context does not exist");
				}
			}
			const locatorDelegate = await this.#getLocatorDelegate(realm, locator, maxNodeCount, startNodes);
			serializationOptions = {
				...serializationOptions,
				maxObjectDepth: 1
			};
			const locatorResult = await realm.callFunction(locatorDelegate.functionDeclaration, false, { type: "undefined" }, locatorDelegate.argumentsLocalValues, "none", serializationOptions);
			if (locatorResult.type !== "success") {
				this.#logger?.(_a.LOGGER_PREFIX, "Failed locateNodesByLocator", locatorResult);
				if (locatorResult.exceptionDetails.text?.endsWith("is not a valid selector.") || locatorResult.exceptionDetails.text?.endsWith("is not a valid XPath expression.")) throw new protocol_js_1.InvalidSelectorException(`Not valid selector ${typeof locator.value === "string" ? locator.value : JSON.stringify(locator.value)}`);
				if (locatorResult.exceptionDetails.text === "Error: startNodes in css selector should be HTMLElement, SVGElement or Document or DocumentFragment") throw new protocol_js_1.InvalidArgumentException("startNodes in css selector should be HTMLElement, SVGElement or Document or DocumentFragment");
				throw new protocol_js_1.UnknownErrorException(`Unexpected error in selector script: ${locatorResult.exceptionDetails.text}`);
			}
			if (locatorResult.result.type !== "array") throw new protocol_js_1.UnknownErrorException(`Unexpected selector script result type: ${locatorResult.result.type}`);
			return { nodes: locatorResult.result.value.map((value) => {
				if (value.type !== "node") throw new protocol_js_1.UnknownErrorException(`Unexpected selector script result element: ${value.type}`);
				return value;
			}) };
		}
		#getAllRelatedCdpTargets() {
			const targets = /* @__PURE__ */ new Set();
			targets.add(this.cdpTarget);
			this.allChildren.forEach((c) => targets.add(c.cdpTarget));
			return Array.from(targets);
		}
		async setTimezoneOverride(timezone) {
			await Promise.all(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setTimezoneOverride(timezone)));
		}
		async setLocaleOverride(locale) {
			await Promise.all(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setLocaleOverride(locale)));
		}
		async setGeolocationOverride(geolocation) {
			await Promise.all(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setGeolocationOverride(geolocation)));
		}
		async setScriptingEnabled(scriptingEnabled) {
			await Promise.all(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setScriptingEnabled(scriptingEnabled)));
		}
		async setUserAgentAndAcceptLanguage(userAgent, acceptLanguage, clientHints) {
			await Promise.all(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setUserAgentAndAcceptLanguage(userAgent, acceptLanguage, clientHints)));
		}
		async setEmulatedNetworkConditions(networkConditions) {
			await Promise.all(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setEmulatedNetworkConditions(networkConditions)));
		}
		async setTouchOverride(maxTouchPoints) {
			await Promise.allSettled(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setTouchOverride(maxTouchPoints)));
		}
		async setExtraHeaders(cdpExtraHeaders) {
			await Promise.all(this.#getAllRelatedCdpTargets().map(async (cdpTarget) => await cdpTarget.setExtraHeaders(cdpExtraHeaders)));
		}
	};
	exports.BrowsingContextImpl = BrowsingContextImpl;
	_a = BrowsingContextImpl;
	function serializeOrigin(origin) {
		if (["://", ""].includes(origin)) origin = "null";
		return origin;
	}
	function getImageFormatParameters(params) {
		const { quality, type } = params.format ?? { type: "image/png" };
		switch (type) {
			case "image/png": return { format: "png" };
			case "image/jpeg": return {
				format: "jpeg",
				...quality === void 0 ? {} : { quality: Math.round(quality * 100) }
			};
			case "image/webp": return {
				format: "webp",
				...quality === void 0 ? {} : { quality: Math.round(quality * 100) }
			};
		}
		throw new protocol_js_1.InvalidArgumentException(`Image format '${type}' is not a supported format`);
	}
	function deserializeDOMRect(result) {
		if (result.type !== "object" || result.value === void 0) return;
		const x = result.value.find(([key]) => {
			return key === "x";
		})?.[1];
		const y = result.value.find(([key]) => {
			return key === "y";
		})?.[1];
		const height = result.value.find(([key]) => {
			return key === "height";
		})?.[1];
		const width = result.value.find(([key]) => {
			return key === "width";
		})?.[1];
		if (x?.type !== "number" || y?.type !== "number" || height?.type !== "number" || width?.type !== "number") return;
		return {
			x: x.value,
			y: y.value,
			width: width.value,
			height: height.value
		};
	}
	/** @see https://w3c.github.io/webdriver-bidi/#normalize-rect */
	function normalizeRect(box) {
		return {
			...box.width < 0 ? {
				x: box.x + box.width,
				width: -box.width
			} : {
				x: box.x,
				width: box.width
			},
			...box.height < 0 ? {
				y: box.y + box.height,
				height: -box.height
			} : {
				y: box.y,
				height: box.height
			}
		};
	}
	/** @see https://w3c.github.io/webdriver-bidi/#rectangle-intersection */
	function getIntersectionRect(first, second) {
		first = normalizeRect(first);
		second = normalizeRect(second);
		const x = Math.max(first.x, second.x);
		const y = Math.max(first.y, second.y);
		return {
			x,
			y,
			width: Math.max(Math.min(first.x + first.width, second.x + second.width) - x, 0),
			height: Math.max(Math.min(first.y + first.height, second.y + second.height) - y, 0)
		};
	}
	function parseInteger(value) {
		value = value.trim();
		if (!/^[0-9]+$/.test(value)) throw new protocol_js_1.InvalidArgumentException(`Invalid integer: ${value}`);
		return parseInt(value);
	}
}));
var require_WorkerRealm = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2024 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WorkerRealm = void 0;
	var Realm_js_1 = require_Realm();
	var WorkerRealm = class extends Realm_js_1.Realm {
		#realmType;
		#ownerRealms;
		constructor(cdpClient, eventManager, executionContextId, logger, origin, ownerRealms, realmId, realmStorage, realmType) {
			super(cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage);
			this.#ownerRealms = ownerRealms;
			this.#realmType = realmType;
			this.initialize();
		}
		get associatedBrowsingContexts() {
			return this.#ownerRealms.flatMap((realm) => realm.associatedBrowsingContexts);
		}
		get realmType() {
			return this.#realmType;
		}
		get source() {
			return {
				realm: this.realmId,
				context: this.associatedBrowsingContexts[0]?.id
			};
		}
		get realmInfo() {
			const owners = this.#ownerRealms.map((realm) => realm.realmId);
			const { realmType } = this;
			switch (realmType) {
				case "dedicated-worker": {
					const owner = owners[0];
					if (owner === void 0 || owners.length !== 1) throw new Error("Dedicated worker must have exactly one owner");
					return {
						...this.baseInfo,
						type: realmType,
						owners: [owner]
					};
				}
				case "service-worker":
				case "shared-worker": return {
					...this.baseInfo,
					type: realmType
				};
			}
		}
	};
	exports.WorkerRealm = WorkerRealm;
}));
var require_logHelper = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.logMessageFormatter = logMessageFormatter;
	exports.getRemoteValuesText = getRemoteValuesText;
	var assert_js_1 = require_assert();
	var specifiers = [
		"%s",
		"%d",
		"%i",
		"%f",
		"%o",
		"%O",
		"%c"
	];
	function isFormatSpecifier(str) {
		return specifiers.some((spec) => str.includes(spec));
	}
	/**
	* @param args input remote values to be format printed
	* @return parsed text of the remote values in specific format
	*/
	function logMessageFormatter(args) {
		let output = "";
		const argFormat = args[0].value.toString();
		const argValues = args.slice(1, void 0);
		const tokens = argFormat.split(new RegExp(specifiers.map((spec) => `(${spec})`).join("|"), "g"));
		for (const token of tokens) {
			if (token === void 0 || token === "") continue;
			if (isFormatSpecifier(token)) {
				const arg = argValues.shift();
				(0, assert_js_1.assert)(arg, `Less value is provided: "${getRemoteValuesText(args, false)}"`);
				if (token === "%s") output += stringFromArg(arg);
				else if (token === "%d" || token === "%i") if (arg.type === "bigint" || arg.type === "number" || arg.type === "string") output += parseInt(arg.value.toString(), 10);
				else output += "NaN";
				else if (token === "%f") if (arg.type === "bigint" || arg.type === "number" || arg.type === "string") output += parseFloat(arg.value.toString());
				else output += "NaN";
				else output += toJson(arg);
			} else output += token;
		}
		if (argValues.length > 0) throw new Error(`More value is provided: "${getRemoteValuesText(args, false)}"`);
		return output;
	}
	/**
	* @param arg input remote value to be parsed
	* @return parsed text of the remote value
	*
	* input: {"type": "number", "value": 1}
	* output: 1
	*
	* input: {"type": "string", "value": "abc"}
	* output: "abc"
	*
	* input: {"type": "object",  "value": [["id", {"type": "number", "value": 1}]]}
	* output: '{"id": 1}'
	*
	* input: {"type": "object", "value": [["font-size", {"type": "string", "value": "20px"}]]}
	* output: '{"font-size": "20px"}'
	*/
	function toJson(arg) {
		if (arg.type !== "array" && arg.type !== "bigint" && arg.type !== "date" && arg.type !== "number" && arg.type !== "object" && arg.type !== "string") return stringFromArg(arg);
		if (arg.type === "bigint") return `${arg.value.toString()}n`;
		if (arg.type === "number") return arg.value.toString();
		if (["date", "string"].includes(arg.type)) return JSON.stringify(arg.value);
		if (arg.type === "object") return `{${arg.value.map((pair) => {
			return `${JSON.stringify(pair[0])}:${toJson(pair[1])}`;
		}).join(",")}}`;
		if (arg.type === "array") return `[${arg.value?.map((val) => toJson(val)).join(",") ?? ""}]`;
		throw Error(`Invalid value type: ${arg}`);
	}
	function stringFromArg(arg) {
		if (!Object.hasOwn(arg, "value")) return arg.type;
		switch (arg.type) {
			case "string":
			case "number":
			case "boolean":
			case "bigint": return String(arg.value);
			case "regexp": return `/${arg.value.pattern}/${arg.value.flags ?? ""}`;
			case "date": return new Date(arg.value).toString();
			case "object": return `Object(${arg.value?.length ?? ""})`;
			case "array": return `Array(${arg.value?.length ?? ""})`;
			case "map": return `Map(${arg.value?.length})`;
			case "set": return `Set(${arg.value?.length})`;
			default: return arg.type;
		}
	}
	function getRemoteValuesText(args, formatText) {
		const arg = args[0];
		if (!arg) return "";
		if (arg.type === "string" && isFormatSpecifier(arg.value.toString()) && formatText) return logMessageFormatter(args);
		return args.map((arg) => {
			return stringFromArg(arg);
		}).join(" ");
	}
}));
var require_LogManager = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LogManager = void 0;
	var protocol_js_1 = require_protocol();
	var log_js_1 = require_log();
	var logHelper_js_1 = require_logHelper();
	/** Converts CDP StackTrace object to BiDi StackTrace object. */
	function getBidiStackTrace(cdpStackTrace) {
		const stackFrames = cdpStackTrace?.callFrames.map((callFrame) => {
			return {
				columnNumber: callFrame.columnNumber,
				functionName: callFrame.functionName,
				lineNumber: callFrame.lineNumber,
				url: callFrame.url
			};
		});
		return stackFrames ? { callFrames: stackFrames } : void 0;
	}
	function getLogLevel(consoleApiType) {
		if (["error", "assert"].includes(consoleApiType)) return "error";
		if (["debug", "trace"].includes(consoleApiType)) return "debug";
		if (["warn", "warning"].includes(consoleApiType)) return "warn";
		return "info";
	}
	function getLogMethod(consoleApiType) {
		switch (consoleApiType) {
			case "warning": return "warn";
			case "startGroup": return "group";
			case "startGroupCollapsed": return "groupCollapsed";
			case "endGroup": return "groupEnd";
		}
		return consoleApiType;
	}
	var LogManager = class {
		#eventManager;
		#realmStorage;
		#cdpTarget;
		#logger;
		constructor(cdpTarget, realmStorage, eventManager, logger) {
			this.#cdpTarget = cdpTarget;
			this.#realmStorage = realmStorage;
			this.#eventManager = eventManager;
			this.#logger = logger;
		}
		static create(cdpTarget, realmStorage, eventManager, logger) {
			const logManager = new _a(cdpTarget, realmStorage, eventManager, logger);
			logManager.#initializeEntryAddedEventListener();
			return logManager;
		}
		/**
		* Heuristic serialization of CDP remote object. If possible, return the BiDi value
		* without deep serialization.
		*/
		async #heuristicSerializeArg(arg, realm) {
			switch (arg.type) {
				case "undefined": return { type: "undefined" };
				case "boolean": return {
					type: "boolean",
					value: arg.value
				};
				case "string": return {
					type: "string",
					value: arg.value
				};
				case "number": return {
					type: "number",
					value: arg.unserializableValue ?? arg.value
				};
				case "bigint":
					if (arg.unserializableValue !== void 0 && arg.unserializableValue[arg.unserializableValue.length - 1] === "n") return {
						type: arg.type,
						value: arg.unserializableValue.slice(0, -1)
					};
					break;
				case "object":
					if (arg.subtype === "null") return { type: "null" };
					break;
				default: break;
			}
			return await realm.serializeCdpObject(arg, "none");
		}
		#initializeEntryAddedEventListener() {
			this.#cdpTarget.cdpClient.on("Runtime.consoleAPICalled", (params) => {
				const realm = this.#realmStorage.findRealm({
					cdpSessionId: this.#cdpTarget.cdpSessionId,
					executionContextId: params.executionContextId
				});
				if (realm === void 0) {
					this.#logger?.(log_js_1.LogType.cdp, params);
					return;
				}
				const argsPromise = Promise.all(params.args.map((arg) => this.#heuristicSerializeArg(arg, realm)));
				for (const browsingContext of realm.associatedBrowsingContexts) this.#eventManager.registerPromiseEvent(argsPromise.then((args) => ({
					kind: "success",
					value: {
						type: "event",
						method: protocol_js_1.ChromiumBidi.Log.EventNames.LogEntryAdded,
						params: {
							level: getLogLevel(params.type),
							source: realm.source,
							text: (0, logHelper_js_1.getRemoteValuesText)(args, true),
							timestamp: Math.round(params.timestamp),
							stackTrace: getBidiStackTrace(params.stackTrace),
							type: "console",
							method: getLogMethod(params.type),
							args
						}
					}
				}), (error) => ({
					kind: "error",
					error
				})), browsingContext.id, protocol_js_1.ChromiumBidi.Log.EventNames.LogEntryAdded);
			});
			this.#cdpTarget.cdpClient.on("Runtime.exceptionThrown", (params) => {
				const realm = this.#realmStorage.findRealm({
					cdpSessionId: this.#cdpTarget.cdpSessionId,
					executionContextId: params.exceptionDetails.executionContextId
				});
				if (realm === void 0) {
					this.#logger?.(log_js_1.LogType.cdp, params);
					return;
				}
				for (const browsingContext of realm.associatedBrowsingContexts) this.#eventManager.registerPromiseEvent(_a.#getExceptionText(params, realm).then((text) => ({
					kind: "success",
					value: {
						type: "event",
						method: protocol_js_1.ChromiumBidi.Log.EventNames.LogEntryAdded,
						params: {
							level: "error",
							source: realm.source,
							text,
							timestamp: Math.round(params.timestamp),
							stackTrace: getBidiStackTrace(params.exceptionDetails.stackTrace),
							type: "javascript"
						}
					}
				}), (error) => ({
					kind: "error",
					error
				})), browsingContext.id, protocol_js_1.ChromiumBidi.Log.EventNames.LogEntryAdded);
			});
		}
		/**
		* Try the best to get the exception text.
		*/
		static async #getExceptionText(params, realm) {
			if (!params.exceptionDetails.exception) return params.exceptionDetails.text;
			if (realm === void 0) return JSON.stringify(params.exceptionDetails.exception);
			return await realm.stringifyObject(params.exceptionDetails.exception);
		}
	};
	exports.LogManager = LogManager;
	_a = LogManager;
}));
var require_CollectorsStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CollectorsStorage = void 0;
	var ErrorResponse_js_1 = require_ErrorResponse();
	var log_js_1 = require_log();
	var uuid_js_1 = require_uuid();
	var CollectorsStorage = class {
		#collectors = /* @__PURE__ */ new Map();
		#responseCollectors = /* @__PURE__ */ new Map();
		#requestBodyCollectors = /* @__PURE__ */ new Map();
		#maxEncodedDataSize;
		#logger;
		constructor(maxEncodedDataSize, logger) {
			this.#maxEncodedDataSize = maxEncodedDataSize;
			this.#logger = logger;
		}
		addDataCollector(params) {
			if (params.maxEncodedDataSize < 1 || params.maxEncodedDataSize > this.#maxEncodedDataSize) throw new ErrorResponse_js_1.InvalidArgumentException(`Max encoded data size should be between 1 and ${this.#maxEncodedDataSize}`);
			const collectorId = (0, uuid_js_1.uuidv4)();
			this.#collectors.set(collectorId, params);
			return collectorId;
		}
		isCollected(requestId, dataType, collectorId) {
			if (collectorId !== void 0 && !this.#collectors.has(collectorId)) throw new ErrorResponse_js_1.NoSuchNetworkCollectorException(`Unknown collector ${collectorId}`);
			if (dataType === void 0) return this.isCollected(requestId, "response", collectorId) || this.isCollected(requestId, "request", collectorId);
			const requestToCollectorsMap = this.#getRequestToCollectorMap(dataType).get(requestId);
			if (requestToCollectorsMap === void 0 || requestToCollectorsMap.size === 0) return false;
			if (collectorId === void 0) return true;
			if (!requestToCollectorsMap.has(collectorId)) return false;
			return true;
		}
		#getRequestToCollectorMap(dataType) {
			switch (dataType) {
				case "response": return this.#responseCollectors;
				case "request": return this.#requestBodyCollectors;
				default: throw new ErrorResponse_js_1.UnsupportedOperationException(`Unsupported data type ${dataType}`);
			}
		}
		disownData(requestId, dataType, collectorId) {
			const requestToCollectorsMap = this.#getRequestToCollectorMap(dataType);
			if (collectorId !== void 0) requestToCollectorsMap.get(requestId)?.delete(collectorId);
			if (collectorId === void 0 || requestToCollectorsMap.get(requestId)?.size === 0) requestToCollectorsMap.delete(requestId);
		}
		#shouldCollectRequest(collectorId, request, dataType, topLevelBrowsingContext, userContext) {
			const collector = this.#collectors.get(collectorId);
			if (collector === void 0) throw new ErrorResponse_js_1.NoSuchNetworkCollectorException(`Unknown collector ${collectorId}`);
			if (collector.userContexts && !collector.userContexts.includes(userContext)) return false;
			if (collector.contexts && !collector.contexts.includes(topLevelBrowsingContext)) return false;
			if (!collector.dataTypes.includes(dataType)) return false;
			if (dataType === "request" && request.bodySize > collector.maxEncodedDataSize) {
				this.#logger?.(log_js_1.LogType.debug, `Request's ${request.id} body size is too big for the collector ${collectorId}`);
				return false;
			}
			if (dataType === "response" && request.encodedResponseBodySize > collector.maxEncodedDataSize) {
				this.#logger?.(log_js_1.LogType.debug, `Request's ${request.id} response is too big for the collector ${collectorId}`);
				return false;
			}
			this.#logger?.(log_js_1.LogType.debug, `Collector ${collectorId} collected ${dataType} of ${request.id}`);
			return true;
		}
		collectIfNeeded(request, dataType, topLevelBrowsingContext, userContext) {
			const collectorIds = [...this.#collectors.keys()].filter((collectorId) => this.#shouldCollectRequest(collectorId, request, dataType, topLevelBrowsingContext, userContext));
			if (collectorIds.length > 0) this.#getRequestToCollectorMap(dataType).set(request.id, new Set(collectorIds));
		}
		removeDataCollector(collectorId) {
			if (!this.#collectors.has(collectorId)) throw new ErrorResponse_js_1.NoSuchNetworkCollectorException(`Collector ${collectorId} does not exist`);
			this.#collectors.delete(collectorId);
			const affectedRequests = [];
			for (const [requestId, collectorIds] of this.#responseCollectors) if (collectorIds.has(collectorId)) {
				collectorIds.delete(collectorId);
				if (collectorIds.size === 0) {
					this.#responseCollectors.delete(requestId);
					affectedRequests.push(requestId);
				}
			}
			for (const [requestId, collectorIds] of this.#requestBodyCollectors) if (collectorIds.has(collectorId)) {
				collectorIds.delete(collectorId);
				if (collectorIds.size === 0) {
					this.#requestBodyCollectors.delete(requestId);
					affectedRequests.push(requestId);
				}
			}
			return affectedRequests;
		}
	};
	exports.CollectorsStorage = CollectorsStorage;
}));
var require_DefaultMap = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DefaultMap = void 0;
	/**
	* A subclass of Map whose functionality is almost the same as its parent
	* except for the fact that DefaultMap never returns undefined. It provides a
	* default value for keys that do not exist.
	*/
	var DefaultMap = class extends Map {
		/** The default value to return whenever a key is not present in the map. */
		#getDefaultValue;
		constructor(getDefaultValue, entries) {
			super(entries);
			this.#getDefaultValue = getDefaultValue;
		}
		get(key) {
			if (!this.has(key)) this.set(key, this.#getDefaultValue(key));
			return super.get(key);
		}
	};
	exports.DefaultMap = DefaultMap;
}));
var require_NetworkRequest = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NetworkRequest = void 0;
	var protocol_js_1 = require_protocol();
	var assert_js_1 = require_assert();
	var DefaultMap_js_1 = require_DefaultMap();
	var Deferred_js_1 = require_Deferred();
	var log_js_1 = require_log();
	var NetworkUtils_js_1 = require_NetworkUtils();
	var REALM_REGEX = /(?<=realm=").*(?=")/;
	/** Abstracts one individual network request. */
	var NetworkRequest = class {
		static unknownParameter = "UNKNOWN";
		/**
		* Each network request has an associated request id, which is a string
		* uniquely identifying that request.
		*
		* The identifier for a request resulting from a redirect matches that of the
		* request that initiated it.
		*/
		#id;
		#fetchId;
		/**
		* Indicates the network intercept phase, if the request is currently blocked.
		* Undefined necessarily implies that the request is not blocked.
		*/
		#interceptPhase;
		#servedFromCache = false;
		#redirectCount;
		#request = {};
		#requestOverrides;
		#responseOverrides;
		#response = {
			decodedSize: 0,
			encodedSize: 0
		};
		#eventManager;
		#networkStorage;
		#cdpTarget;
		#logger;
		#emittedEvents = {
			[protocol_js_1.ChromiumBidi.Network.EventNames.AuthRequired]: false,
			[protocol_js_1.ChromiumBidi.Network.EventNames.BeforeRequestSent]: false,
			[protocol_js_1.ChromiumBidi.Network.EventNames.FetchError]: false,
			[protocol_js_1.ChromiumBidi.Network.EventNames.ResponseCompleted]: false,
			[protocol_js_1.ChromiumBidi.Network.EventNames.ResponseStarted]: false
		};
		waitNextPhase = new Deferred_js_1.Deferred();
		constructor(id, eventManager, networkStorage, cdpTarget, redirectCount = 0, logger) {
			this.#id = id;
			this.#eventManager = eventManager;
			this.#networkStorage = networkStorage;
			this.#cdpTarget = cdpTarget;
			this.#redirectCount = redirectCount;
			this.#logger = logger;
		}
		get id() {
			return this.#id;
		}
		get fetchId() {
			return this.#fetchId;
		}
		/**
		* When blocked returns the phase for it
		*/
		get interceptPhase() {
			return this.#interceptPhase;
		}
		get url() {
			const fragment = this.#request.info?.request.urlFragment ?? this.#request.paused?.request.urlFragment ?? "";
			return `${this.#response.paused?.request.url ?? this.#requestOverrides?.url ?? this.#response.info?.url ?? this.#request.auth?.request.url ?? this.#request.info?.request.url ?? this.#request.paused?.request.url ?? _a.unknownParameter}${fragment}`;
		}
		get redirectCount() {
			return this.#redirectCount;
		}
		get cdpTarget() {
			return this.#cdpTarget;
		}
		/** CdpTarget can be changed when frame is moving out of process. */
		updateCdpTarget(cdpTarget) {
			if (cdpTarget !== this.#cdpTarget) {
				this.#logger?.(log_js_1.LogType.debugInfo, `Request ${this.id} was moved from ${this.#cdpTarget.id} to ${cdpTarget.id}`);
				this.#cdpTarget = cdpTarget;
			}
		}
		get cdpClient() {
			return this.#cdpTarget.cdpClient;
		}
		isRedirecting() {
			return Boolean(this.#request.info);
		}
		#isDataUrl() {
			return this.url.startsWith("data:");
		}
		#isNonInterceptable() {
			return this.#isDataUrl() || this.#servedFromCache;
		}
		get #method() {
			return this.#requestOverrides?.method ?? this.#request.info?.request.method ?? this.#request.paused?.request.method ?? this.#request.auth?.request.method ?? this.#response.paused?.request.method;
		}
		get #navigationId() {
			if (!this.#request.info || !this.#request.info.loaderId || this.#request.info.loaderId !== this.#request.info.requestId) return null;
			return this.#networkStorage.getNavigationId(this.#context ?? void 0);
		}
		get #cookies() {
			let cookies = [];
			if (this.#request.extraInfo) cookies = this.#request.extraInfo.associatedCookies.filter(({ blockedReasons }) => {
				return !Array.isArray(blockedReasons) || blockedReasons.length === 0;
			}).map(({ cookie }) => (0, NetworkUtils_js_1.cdpToBiDiCookie)(cookie));
			return cookies;
		}
		#getBodySizeFromHeaders(headers) {
			if (headers === void 0) return;
			if (headers["Content-Length"] !== void 0) {
				const bodySize = Number.parseInt(headers["Content-Length"]);
				if (Number.isInteger(bodySize)) return bodySize;
				this.#logger?.(log_js_1.LogType.debugError, "Unexpected non-integer 'Content-Length' header");
			}
		}
		get bodySize() {
			if (typeof this.#requestOverrides?.bodySize === "number") return this.#requestOverrides.bodySize;
			if (this.#request.info?.request.postDataEntries !== void 0) return (0, NetworkUtils_js_1.bidiBodySizeFromCdpPostDataEntries)(this.#request.info?.request.postDataEntries);
			return this.#getBodySizeFromHeaders(this.#request.info?.request.headers) ?? this.#getBodySizeFromHeaders(this.#request.extraInfo?.headers) ?? 0;
		}
		get #context() {
			const result = this.#response.paused?.frameId ?? this.#request.info?.frameId ?? this.#request.paused?.frameId ?? this.#request.auth?.frameId;
			if (result !== void 0) return result;
			if (this.#request?.info?.initiator.type === "preflight" && this.#request?.info?.initiator.requestId !== void 0) {
				const maybeInitiator = this.#networkStorage.getRequestById(this.#request?.info?.initiator.requestId);
				if (maybeInitiator !== void 0) return maybeInitiator.#request.info?.frameId ?? null;
			}
			return null;
		}
		/** Returns the HTTP status code associated with this request if any. */
		get #statusCode() {
			return this.#responseOverrides?.statusCode ?? this.#response.paused?.responseStatusCode ?? this.#response.extraInfo?.statusCode ?? this.#response.info?.status;
		}
		get #requestHeaders() {
			let headers = [];
			if (this.#requestOverrides?.headers) {
				const headerMap = new DefaultMap_js_1.DefaultMap(() => []);
				for (const header of this.#requestOverrides.headers) headerMap.get(header.name).push(header.value.value);
				for (const [name, value] of headerMap.entries()) headers.push({
					name,
					value: {
						type: "string",
						value: value.join("\n").trimEnd()
					}
				});
			} else headers = [...(0, NetworkUtils_js_1.bidiNetworkHeadersFromCdpNetworkHeaders)(this.#request.info?.request.headers), ...(0, NetworkUtils_js_1.bidiNetworkHeadersFromCdpNetworkHeaders)(this.#request.extraInfo?.headers)];
			return headers;
		}
		get #authChallenges() {
			if (!this.#response.info) return;
			if (!(this.#statusCode === 401 || this.#statusCode === 407)) return;
			const headerName = this.#statusCode === 401 ? "WWW-Authenticate" : "Proxy-Authenticate";
			const authChallenges = [];
			for (const [header, value] of Object.entries(this.#response.info.headers)) if (header.localeCompare(headerName, void 0, { sensitivity: "base" }) === 0) authChallenges.push({
				scheme: value.split(" ").at(0) ?? "",
				realm: value.match(REALM_REGEX)?.at(0) ?? ""
			});
			return authChallenges;
		}
		get #timings() {
			const responseTimeOffset = (0, NetworkUtils_js_1.getTiming)((0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.requestTime) - (0, NetworkUtils_js_1.getTiming)(this.#request.info?.timestamp));
			return {
				timeOrigin: Math.round((0, NetworkUtils_js_1.getTiming)(this.#request.info?.wallTime) * 1e3),
				requestTime: 0,
				redirectStart: 0,
				redirectEnd: 0,
				fetchStart: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.workerFetchStart, responseTimeOffset),
				dnsStart: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.dnsStart, responseTimeOffset),
				dnsEnd: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.dnsEnd, responseTimeOffset),
				connectStart: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.connectStart, responseTimeOffset),
				connectEnd: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.connectEnd, responseTimeOffset),
				tlsStart: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.sslStart, responseTimeOffset),
				requestStart: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.sendStart, responseTimeOffset),
				responseStart: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.receiveHeadersStart, responseTimeOffset),
				responseEnd: (0, NetworkUtils_js_1.getTiming)(this.#response.info?.timing?.receiveHeadersEnd, responseTimeOffset)
			};
		}
		#phaseChanged() {
			this.waitNextPhase.resolve();
			this.waitNextPhase = new Deferred_js_1.Deferred();
		}
		#interceptsInPhase(phase) {
			if (this.#isNonInterceptable() || !this.#cdpTarget.isSubscribedTo(`network.${phase}`)) return /* @__PURE__ */ new Set();
			return this.#networkStorage.getInterceptsForPhase(this, phase);
		}
		#isBlockedInPhase(phase) {
			return this.#interceptsInPhase(phase).size > 0;
		}
		handleRedirect(event) {
			this.#response.hasExtraInfo = false;
			this.#response.decodedSize = 0;
			this.#response.encodedSize = 0;
			this.#response.info = event.redirectResponse;
			this.#emitEventsIfReady({ wasRedirected: true });
		}
		#emitEventsIfReady(options = {}) {
			const requestExtraInfoCompleted = options.wasRedirected || Boolean(this.#response.loadingFailed) || this.#isDataUrl() || Boolean(this.#request.extraInfo) || this.#isBlockedInPhase("authRequired") || this.#servedFromCache || Boolean(this.#response.info && !this.#response.hasExtraInfo);
			const noInterceptionExpected = this.#isNonInterceptable();
			const requestInterceptionExpected = !noInterceptionExpected && this.#isBlockedInPhase("beforeRequestSent");
			const requestInterceptionCompleted = !requestInterceptionExpected || requestInterceptionExpected && Boolean(this.#request.paused);
			if (Boolean(this.#request.info) && (requestInterceptionExpected ? requestInterceptionCompleted : requestExtraInfoCompleted)) this.#emitEvent(this.#getBeforeRequestEvent.bind(this));
			const responseExtraInfoCompleted = Boolean(this.#response.extraInfo) || this.#servedFromCache || Boolean(this.#response.info && !this.#response.hasExtraInfo);
			const responseInterceptionExpected = !noInterceptionExpected && this.#isBlockedInPhase("responseStarted");
			if (this.#response.info || responseInterceptionExpected && Boolean(this.#response.paused)) this.#emitEvent(this.#getResponseStartedEvent.bind(this));
			const responseInterceptionCompleted = !responseInterceptionExpected || responseInterceptionExpected && Boolean(this.#response.paused);
			const loadingFinished = Boolean(this.#response.loadingFailed) || Boolean(this.#response.loadingFinished);
			if (Boolean(this.#response.info) && responseExtraInfoCompleted && responseInterceptionCompleted && (loadingFinished || options.wasRedirected)) {
				this.#emitEvent(this.#getResponseReceivedEvent.bind(this));
				this.#networkStorage.disposeRequest(this.id);
			}
		}
		onRequestWillBeSentEvent(event) {
			this.#request.info = event;
			this.#networkStorage.collectIfNeeded(this, "request");
			this.#emitEventsIfReady();
		}
		onRequestWillBeSentExtraInfoEvent(event) {
			this.#request.extraInfo = event;
			this.#emitEventsIfReady();
		}
		onResponseReceivedExtraInfoEvent(event) {
			if (event.statusCode >= 300 && event.statusCode <= 399 && this.#request.info && event.headers["location"] === this.#request.info.request.url) return;
			this.#response.extraInfo = event;
			this.#emitEventsIfReady();
		}
		onResponseReceivedEvent(event) {
			this.#response.hasExtraInfo = event.hasExtraInfo;
			this.#response.info = event.response;
			this.#networkStorage.collectIfNeeded(this, "response");
			this.#emitEventsIfReady();
		}
		onServedFromCache() {
			this.#servedFromCache = true;
			this.#emitEventsIfReady();
		}
		onLoadingFinishedEvent(event) {
			this.#response.loadingFinished = event;
			this.#emitEventsIfReady();
		}
		onDataReceivedEvent(event) {
			this.#response.decodedSize += event.dataLength;
			this.#response.encodedSize += event.encodedDataLength;
		}
		onLoadingFailedEvent(event) {
			this.#response.loadingFailed = event;
			this.#emitEventsIfReady();
			this.#emitEvent(() => {
				return {
					method: protocol_js_1.ChromiumBidi.Network.EventNames.FetchError,
					params: {
						...this.#getBaseEventParams(),
						errorText: event.errorText
					}
				};
			});
		}
		/** @see https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-failRequest */
		async failRequest(errorReason) {
			(0, assert_js_1.assert)(this.#fetchId, "Network Interception not set-up.");
			await this.cdpClient.sendCommand("Fetch.failRequest", {
				requestId: this.#fetchId,
				errorReason
			});
			this.#interceptPhase = void 0;
		}
		onRequestPaused(event) {
			this.#fetchId = event.requestId;
			if (event.responseStatusCode || event.responseErrorReason) {
				this.#response.paused = event;
				if (this.#isBlockedInPhase("responseStarted") && !this.#emittedEvents[protocol_js_1.ChromiumBidi.Network.EventNames.ResponseStarted] && this.#fetchId !== this.id) this.#interceptPhase = "responseStarted";
				else this.#continueResponse();
			} else {
				this.#request.paused = event;
				if (this.#isBlockedInPhase("beforeRequestSent") && !this.#emittedEvents[protocol_js_1.ChromiumBidi.Network.EventNames.BeforeRequestSent] && this.#fetchId !== this.id) this.#interceptPhase = "beforeRequestSent";
				else this.#continueRequest();
			}
			this.#emitEventsIfReady();
		}
		onAuthRequired(event) {
			this.#fetchId = event.requestId;
			this.#request.auth = event;
			if (this.#isBlockedInPhase("authRequired") && this.#fetchId !== this.id) {
				this.#interceptPhase = "authRequired";
				this.#emitEventsIfReady();
			} else this.#continueWithAuth({ response: "Default" });
			this.#emitEvent(() => {
				return {
					method: protocol_js_1.ChromiumBidi.Network.EventNames.AuthRequired,
					params: {
						...this.#getBaseEventParams("authRequired"),
						response: this.#getResponseEventParams()
					}
				};
			});
		}
		/** @see https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-continueRequest */
		async continueRequest(overrides = {}) {
			const overrideHeaders = this.#getOverrideHeader(overrides.headers, overrides.cookies);
			const headers = (0, NetworkUtils_js_1.cdpFetchHeadersFromBidiNetworkHeaders)(overrideHeaders);
			const postData = getCdpBodyFromBiDiBytesValue(overrides.body);
			await this.#continueRequest({
				url: overrides.url,
				method: overrides.method,
				headers,
				postData
			});
			this.#requestOverrides = {
				url: overrides.url,
				method: overrides.method,
				headers: overrides.headers,
				cookies: overrides.cookies,
				bodySize: getSizeFromBiDiBytesValue(overrides.body)
			};
		}
		async #continueRequest(overrides = {}) {
			(0, assert_js_1.assert)(this.#fetchId, "Network Interception not set-up.");
			await this.cdpClient.sendCommand("Fetch.continueRequest", {
				requestId: this.#fetchId,
				url: overrides.url,
				method: overrides.method,
				headers: overrides.headers,
				postData: overrides.postData
			});
			this.#interceptPhase = void 0;
		}
		/** @see https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-continueResponse */
		async continueResponse(overrides = {}) {
			if (this.interceptPhase === "authRequired") if (overrides.credentials) await Promise.all([this.waitNextPhase, await this.#continueWithAuth({
				response: "ProvideCredentials",
				username: overrides.credentials.username,
				password: overrides.credentials.password
			})]);
			else return await this.#continueWithAuth({ response: "ProvideCredentials" });
			if (this.#interceptPhase === "responseStarted") {
				const overrideHeaders = this.#getOverrideHeader(overrides.headers, overrides.cookies);
				const responseHeaders = (0, NetworkUtils_js_1.cdpFetchHeadersFromBidiNetworkHeaders)(overrideHeaders);
				await this.#continueResponse({
					responseCode: overrides.statusCode ?? this.#response.paused?.responseStatusCode,
					responsePhrase: overrides.reasonPhrase ?? this.#response.paused?.responseStatusText,
					responseHeaders: responseHeaders ?? this.#response.paused?.responseHeaders
				});
				this.#responseOverrides = {
					statusCode: overrides.statusCode,
					headers: overrideHeaders
				};
			}
		}
		async #continueResponse({ responseCode, responsePhrase, responseHeaders } = {}) {
			(0, assert_js_1.assert)(this.#fetchId, "Network Interception not set-up.");
			await this.cdpClient.sendCommand("Fetch.continueResponse", {
				requestId: this.#fetchId,
				responseCode,
				responsePhrase,
				responseHeaders
			});
			this.#interceptPhase = void 0;
		}
		/** @see https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-continueWithAuth */
		async continueWithAuth(authChallenge) {
			let username;
			let password;
			if (authChallenge.action === "provideCredentials") {
				const { credentials } = authChallenge;
				username = credentials.username;
				password = credentials.password;
			}
			const response = (0, NetworkUtils_js_1.cdpAuthChallengeResponseFromBidiAuthContinueWithAuthAction)(authChallenge.action);
			await this.#continueWithAuth({
				response,
				username,
				password
			});
		}
		/** @see https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-provideResponse */
		async provideResponse(overrides) {
			(0, assert_js_1.assert)(this.#fetchId, "Network Interception not set-up.");
			if (this.interceptPhase === "authRequired") return await this.#continueWithAuth({ response: "ProvideCredentials" });
			if (!overrides.body && !overrides.headers) return await this.#continueRequest();
			const overrideHeaders = this.#getOverrideHeader(overrides.headers, overrides.cookies);
			const responseHeaders = (0, NetworkUtils_js_1.cdpFetchHeadersFromBidiNetworkHeaders)(overrideHeaders);
			const responseCode = overrides.statusCode ?? this.#statusCode ?? 200;
			await this.cdpClient.sendCommand("Fetch.fulfillRequest", {
				requestId: this.#fetchId,
				responseCode,
				responsePhrase: overrides.reasonPhrase,
				responseHeaders,
				body: getCdpBodyFromBiDiBytesValue(overrides.body)
			});
			this.#interceptPhase = void 0;
		}
		dispose() {
			this.waitNextPhase.reject(/* @__PURE__ */ new Error("waitNextPhase disposed"));
		}
		async #continueWithAuth(authChallengeResponse) {
			(0, assert_js_1.assert)(this.#fetchId, "Network Interception not set-up.");
			await this.cdpClient.sendCommand("Fetch.continueWithAuth", {
				requestId: this.#fetchId,
				authChallengeResponse
			});
			this.#interceptPhase = void 0;
		}
		#emitEvent(getEvent) {
			let event;
			try {
				event = getEvent();
			} catch (error) {
				this.#logger?.(log_js_1.LogType.debugError, error);
				return;
			}
			if (this.#isIgnoredEvent() || this.#emittedEvents[event.method] && event.method !== protocol_js_1.ChromiumBidi.Network.EventNames.AuthRequired) return;
			this.#phaseChanged();
			this.#emittedEvents[event.method] = true;
			if (this.#context) this.#eventManager.registerEvent(Object.assign(event, { type: "event" }), this.#context);
			else this.#eventManager.registerGlobalEvent(Object.assign(event, { type: "event" }));
		}
		#getBaseEventParams(phase) {
			const interceptProps = { isBlocked: false };
			if (phase) {
				const blockedBy = this.#interceptsInPhase(phase);
				interceptProps.isBlocked = blockedBy.size > 0;
				if (interceptProps.isBlocked) interceptProps.intercepts = [...blockedBy];
			}
			return {
				context: this.#context,
				navigation: this.#navigationId,
				redirectCount: this.#redirectCount,
				request: this.#getRequestData(),
				timestamp: Math.round((0, NetworkUtils_js_1.getTiming)(this.#request.info?.wallTime) * 1e3),
				...interceptProps
			};
		}
		#getResponseEventParams() {
			if (this.#response.info?.fromDiskCache) this.#response.extraInfo = void 0;
			const cdpHeaders = this.#response.info?.headers ?? {};
			const cdpRawHeaders = this.#response.extraInfo?.headers ?? {};
			for (const [key, value] of Object.entries(cdpRawHeaders)) cdpHeaders[key] = value;
			const headers = (0, NetworkUtils_js_1.bidiNetworkHeadersFromCdpNetworkHeaders)(cdpHeaders);
			const authChallenges = this.#authChallenges;
			return {
				url: this.url,
				protocol: this.#response.info?.protocol ?? "",
				status: this.#statusCode ?? -1,
				statusText: this.#response.info?.statusText || this.#response.paused?.responseStatusText || "",
				fromCache: this.#response.info?.fromDiskCache || this.#response.info?.fromPrefetchCache || this.#servedFromCache,
				headers: this.#responseOverrides?.headers ?? headers,
				mimeType: this.#response.info?.mimeType || "",
				bytesReceived: this.encodedResponseBodySize,
				headersSize: (0, NetworkUtils_js_1.computeHeadersSize)(headers),
				bodySize: this.encodedResponseBodySize,
				content: { size: this.#response.decodedSize ?? 0 },
				...authChallenges ? { authChallenges } : {},
				"goog:securityDetails": this.#response.info?.securityDetails
			};
		}
		get encodedResponseBodySize() {
			return this.#response.loadingFinished?.encodedDataLength ?? this.#response.info?.encodedDataLength ?? this.#response.encodedSize ?? 0;
		}
		#getRequestData() {
			const headers = this.#requestHeaders;
			return {
				request: this.#id,
				url: this.url,
				method: this.#method ?? _a.unknownParameter,
				headers,
				cookies: this.#cookies,
				headersSize: (0, NetworkUtils_js_1.computeHeadersSize)(headers),
				bodySize: this.bodySize,
				destination: this.#getDestination(),
				initiatorType: this.#getInitiatorType(),
				timings: this.#timings,
				"goog:postData": this.#request.info?.request?.postData,
				"goog:hasPostData": this.#request.info?.request?.hasPostData,
				"goog:resourceType": this.#request.info?.type,
				"goog:resourceInitiator": this.#request.info?.initiator
			};
		}
		/**
		* Heuristic trying to guess the destination.
		* Specification: https://fetch.spec.whatwg.org/#concept-request-destination.
		* Specified values: "audio", "audioworklet", "document", "embed", "font", "frame",
		* "iframe", "image", "json", "manifest", "object", "paintworklet", "report", "script",
		* "serviceworker", "sharedworker", "style", "track", "video", "webidentity", "worker",
		* "xslt".
		*/
		#getDestination() {
			switch (this.#request.info?.type) {
				case "Script": return "script";
				case "Stylesheet": return "style";
				case "Image": return "image";
				case "Document": return this.#request.info?.initiator.type === "parser" ? "iframe" : "document";
				default: return "";
			}
		}
		/**
		* Heuristic trying to guess the initiator type.
		* Specification: https://fetch.spec.whatwg.org/#request-initiator-type.
		* Specified values: "audio", "beacon", "body", "css", "early-hints", "embed", "fetch",
		* "font", "frame", "iframe", "image", "img", "input", "link", "object", "ping",
		* "script", "track", "video", "xmlhttprequest", "other".
		*/
		#getInitiatorType() {
			if (this.#request.info?.initiator.type === "parser") switch (this.#request.info?.type) {
				case "Document": return "iframe";
				case "Font": return this.#request.info?.initiator?.url === this.#request.info?.documentURL ? "font" : "css";
				case "Image": return this.#request.info?.initiator?.url === this.#request.info?.documentURL ? "img" : "css";
				case "Script": return "script";
				case "Stylesheet": return "link";
				default: return null;
			}
			if (this.#request?.info?.type === "Fetch") return "fetch";
			return null;
		}
		#getBeforeRequestEvent() {
			(0, assert_js_1.assert)(this.#request.info, "RequestWillBeSentEvent is not set");
			return {
				method: protocol_js_1.ChromiumBidi.Network.EventNames.BeforeRequestSent,
				params: {
					...this.#getBaseEventParams("beforeRequestSent"),
					initiator: {
						type: _a.#getInitiator(this.#request.info.initiator.type),
						columnNumber: this.#request.info.initiator.columnNumber,
						lineNumber: this.#request.info.initiator.lineNumber,
						stackTrace: this.#request.info.initiator.stack,
						request: this.#request.info.initiator.requestId
					}
				}
			};
		}
		#getResponseStartedEvent() {
			return {
				method: protocol_js_1.ChromiumBidi.Network.EventNames.ResponseStarted,
				params: {
					...this.#getBaseEventParams("responseStarted"),
					response: this.#getResponseEventParams()
				}
			};
		}
		#getResponseReceivedEvent() {
			return {
				method: protocol_js_1.ChromiumBidi.Network.EventNames.ResponseCompleted,
				params: {
					...this.#getBaseEventParams(),
					response: this.#getResponseEventParams()
				}
			};
		}
		#isIgnoredEvent() {
			const faviconUrl = "/favicon.ico";
			return this.#request.paused?.request.url.endsWith(faviconUrl) ?? this.#request.info?.request.url.endsWith(faviconUrl) ?? false;
		}
		#getOverrideHeader(headers, cookies) {
			if (!headers && !cookies) return;
			let overrideHeaders = headers;
			const cookieHeader = (0, NetworkUtils_js_1.networkHeaderFromCookieHeaders)(cookies);
			if (cookieHeader && !overrideHeaders) overrideHeaders = this.#requestHeaders;
			if (cookieHeader && overrideHeaders) {
				overrideHeaders.filter((header) => header.name.localeCompare("cookie", void 0, { sensitivity: "base" }) !== 0);
				overrideHeaders.push(cookieHeader);
			}
			return overrideHeaders;
		}
		static #getInitiator(initiatorType) {
			switch (initiatorType) {
				case "parser":
				case "script":
				case "preflight": return initiatorType;
				default: return "other";
			}
		}
	};
	exports.NetworkRequest = NetworkRequest;
	_a = NetworkRequest;
	function getCdpBodyFromBiDiBytesValue(body) {
		let parsedBody;
		if (body?.type === "string") parsedBody = (0, NetworkUtils_js_1.stringToBase64)(body.value);
		else if (body?.type === "base64") parsedBody = body.value;
		return parsedBody;
	}
	function getSizeFromBiDiBytesValue(body) {
		if (body?.type === "string") return body.value.length;
		else if (body?.type === "base64") return atob(body.value).length;
		return 0;
	}
}));
var require_NetworkStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NetworkStorage = exports.MAX_TOTAL_COLLECTED_SIZE = void 0;
	var protocol_js_1 = require_protocol();
	var uuid_js_1 = require_uuid();
	var CollectorsStorage_js_1 = require_CollectorsStorage();
	var NetworkRequest_js_1 = require_NetworkRequest();
	var NetworkUtils_js_1 = require_NetworkUtils();
	exports.MAX_TOTAL_COLLECTED_SIZE = 2e8;
	/** Stores network and intercept maps. */
	var NetworkStorage = class {
		#browsingContextStorage;
		#eventManager;
		#collectorsStorage;
		#logger;
		/**
		* A map from network request ID to Network Request objects.
		* Needed as long as information about requests comes from different events.
		*/
		#requests = /* @__PURE__ */ new Map();
		/** A map from intercept ID to track active network intercepts. */
		#intercepts = /* @__PURE__ */ new Map();
		#defaultCacheBehavior = "default";
		constructor(eventManager, browsingContextStorage, browserClient, logger) {
			this.#browsingContextStorage = browsingContextStorage;
			this.#eventManager = eventManager;
			this.#collectorsStorage = new CollectorsStorage_js_1.CollectorsStorage(exports.MAX_TOTAL_COLLECTED_SIZE, logger);
			browserClient.on("Target.detachedFromTarget", ({ sessionId }) => {
				this.disposeRequestMap(sessionId);
			});
			this.#logger = logger;
		}
		/**
		* Gets the network request with the given ID, if any.
		* Otherwise, creates a new network request with the given ID and cdp target.
		*/
		#getOrCreateNetworkRequest(id, cdpTarget, redirectCount) {
			let request = this.getRequestById(id);
			if (redirectCount === void 0 && request) return request;
			request = new NetworkRequest_js_1.NetworkRequest(id, this.#eventManager, this, cdpTarget, redirectCount, this.#logger);
			this.addRequest(request);
			return request;
		}
		onCdpTargetCreated(cdpTarget) {
			const cdpClient = cdpTarget.cdpClient;
			const listeners = [
				["Network.requestWillBeSent", (params) => {
					const request = this.getRequestById(params.requestId);
					request?.updateCdpTarget(cdpTarget);
					if (request && request.isRedirecting()) {
						request.handleRedirect(params);
						this.disposeRequest(params.requestId);
						this.#getOrCreateNetworkRequest(params.requestId, cdpTarget, request.redirectCount + 1).onRequestWillBeSentEvent(params);
					} else this.#getOrCreateNetworkRequest(params.requestId, cdpTarget).onRequestWillBeSentEvent(params);
				}],
				["Network.requestWillBeSentExtraInfo", (params) => {
					const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
					request.updateCdpTarget(cdpTarget);
					request.onRequestWillBeSentExtraInfoEvent(params);
				}],
				["Network.responseReceived", (params) => {
					const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
					request.updateCdpTarget(cdpTarget);
					request.onResponseReceivedEvent(params);
				}],
				["Network.responseReceivedExtraInfo", (params) => {
					const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
					request.updateCdpTarget(cdpTarget);
					request.onResponseReceivedExtraInfoEvent(params);
				}],
				["Network.requestServedFromCache", (params) => {
					const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
					request.updateCdpTarget(cdpTarget);
					request.onServedFromCache();
				}],
				["Fetch.requestPaused", (event) => {
					const request = this.#getOrCreateNetworkRequest(event.networkId ?? event.requestId, cdpTarget);
					request.updateCdpTarget(cdpTarget);
					request.onRequestPaused(event);
				}],
				["Fetch.authRequired", (event) => {
					let request = this.getRequestByFetchId(event.requestId);
					if (!request) request = this.#getOrCreateNetworkRequest(event.requestId, cdpTarget);
					request.updateCdpTarget(cdpTarget);
					request.onAuthRequired(event);
				}],
				["Network.dataReceived", (params) => {
					const request = this.getRequestById(params.requestId);
					request?.updateCdpTarget(cdpTarget);
					request?.onDataReceivedEvent(params);
				}],
				["Network.loadingFailed", (params) => {
					const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
					request.updateCdpTarget(cdpTarget);
					request.onLoadingFailedEvent(params);
				}],
				["Network.loadingFinished", (params) => {
					const request = this.getRequestById(params.requestId);
					request?.updateCdpTarget(cdpTarget);
					request?.onLoadingFinishedEvent(params);
				}]
			];
			for (const [event, listener] of listeners) cdpClient.on(event, listener);
		}
		async getCollectedData(params) {
			if (!this.#collectorsStorage.isCollected(params.request, params.dataType, params.collector)) throw new protocol_js_1.NoSuchNetworkDataException(params.collector === void 0 ? `No collected ${params.dataType} data` : `Collector ${params.collector} didn't collect ${params.dataType} data`);
			if (params.disown && params.collector === void 0) throw new protocol_js_1.InvalidArgumentException("Cannot disown collected data without collector ID");
			const request = this.getRequestById(params.request);
			if (request === void 0) throw new protocol_js_1.NoSuchNetworkDataException(`No data for ${params.request}`);
			let result = void 0;
			switch (params.dataType) {
				case "response":
					result = await this.#getCollectedResponseData(request);
					break;
				case "request":
					result = await this.#getCollectedRequestData(request);
					break;
				default: throw new protocol_js_1.UnsupportedOperationException(`Unsupported data type ${params.dataType}`);
			}
			if (params.disown && params.collector !== void 0) {
				this.#collectorsStorage.disownData(request.id, params.dataType, params.collector);
				this.disposeRequest(request.id);
			}
			return result;
		}
		async #getCollectedResponseData(request) {
			try {
				const responseBody = await request.cdpClient.sendCommand("Network.getResponseBody", { requestId: request.id });
				return { bytes: {
					type: responseBody.base64Encoded ? "base64" : "string",
					value: responseBody.body
				} };
			} catch (error) {
				if (error.code === -32e3 && error.message === "No resource with given identifier found") throw new protocol_js_1.NoSuchNetworkDataException(`Response data was disposed`);
				if (error.code === -32001) throw new protocol_js_1.NoSuchNetworkDataException(`Response data is disposed after the related page`);
				throw error;
			}
		}
		async #getCollectedRequestData(request) {
			return { bytes: {
				type: "string",
				value: (await request.cdpClient.sendCommand("Network.getRequestPostData", { requestId: request.id })).postData
			} };
		}
		collectIfNeeded(request, dataType) {
			this.#collectorsStorage.collectIfNeeded(request, dataType, request.cdpTarget.topLevelId, request.cdpTarget.userContext);
		}
		getInterceptionStages(browsingContextId) {
			const stages = {
				request: false,
				response: false,
				auth: false
			};
			for (const intercept of this.#intercepts.values()) {
				if (intercept.contexts && !intercept.contexts.includes(browsingContextId)) continue;
				stages.request ||= intercept.phases.includes("beforeRequestSent");
				stages.response ||= intercept.phases.includes("responseStarted");
				stages.auth ||= intercept.phases.includes("authRequired");
			}
			return stages;
		}
		getInterceptsForPhase(request, phase) {
			if (request.url === NetworkRequest_js_1.NetworkRequest.unknownParameter) return /* @__PURE__ */ new Set();
			const intercepts = /* @__PURE__ */ new Set();
			for (const [interceptId, intercept] of this.#intercepts.entries()) {
				if (!intercept.phases.includes(phase) || intercept.contexts && !intercept.contexts.includes(request.cdpTarget.topLevelId)) continue;
				if (intercept.urlPatterns.length === 0) {
					intercepts.add(interceptId);
					continue;
				}
				for (const pattern of intercept.urlPatterns) if ((0, NetworkUtils_js_1.matchUrlPattern)(pattern, request.url)) {
					intercepts.add(interceptId);
					break;
				}
			}
			return intercepts;
		}
		disposeRequestMap(sessionId) {
			for (const request of this.#requests.values()) if (request.cdpClient.sessionId === sessionId) {
				this.#requests.delete(request.id);
				request.dispose();
			}
		}
		/**
		* Adds the given entry to the intercept map.
		* URL patterns are assumed to be parsed.
		*
		* @return The intercept ID.
		*/
		addIntercept(value) {
			const interceptId = (0, uuid_js_1.uuidv4)();
			this.#intercepts.set(interceptId, value);
			return interceptId;
		}
		/**
		* Removes the given intercept from the intercept map.
		* Throws NoSuchInterceptException if the intercept does not exist.
		*/
		removeIntercept(intercept) {
			if (!this.#intercepts.has(intercept)) throw new protocol_js_1.NoSuchInterceptException(`Intercept '${intercept}' does not exist.`);
			this.#intercepts.delete(intercept);
		}
		getRequestsByTarget(target) {
			const requests = [];
			for (const request of this.#requests.values()) if (request.cdpTarget === target) requests.push(request);
			return requests;
		}
		getRequestById(id) {
			return this.#requests.get(id);
		}
		getRequestByFetchId(fetchId) {
			for (const request of this.#requests.values()) if (request.fetchId === fetchId) return request;
		}
		addRequest(request) {
			this.#requests.set(request.id, request);
		}
		/**
		* Disposes the given request, if no collectors targeting it are left.
		*/
		disposeRequest(id) {
			if (this.#collectorsStorage.isCollected(id)) return;
			this.#requests.delete(id);
		}
		/**
		* Gets the virtual navigation ID for the given navigable ID.
		*/
		getNavigationId(contextId) {
			if (contextId === void 0) return null;
			return this.#browsingContextStorage.findContext(contextId)?.navigationId ?? null;
		}
		set defaultCacheBehavior(behavior) {
			this.#defaultCacheBehavior = behavior;
		}
		get defaultCacheBehavior() {
			return this.#defaultCacheBehavior;
		}
		addDataCollector(params) {
			return this.#collectorsStorage.addDataCollector(params);
		}
		removeDataCollector(params) {
			this.#collectorsStorage.removeDataCollector(params.collector).map((request) => this.disposeRequest(request));
		}
		disownData(params) {
			if (!this.#collectorsStorage.isCollected(params.request, params.dataType, params.collector)) throw new protocol_js_1.NoSuchNetworkDataException(`Collector ${params.collector} didn't collect ${params.dataType} data`);
			this.#collectorsStorage.disownData(params.request, params.dataType, params.collector);
			this.disposeRequest(params.request);
		}
	};
	exports.NetworkStorage = NetworkStorage;
}));
var require_CdpTarget = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CdpTarget = void 0;
	var chromium_bidi_js_1 = require_chromium_bidi();
	var protocol_js_1 = require_protocol();
	var Deferred_js_1 = require_Deferred();
	var log_js_1 = require_log();
	var BrowsingContextImpl_js_1 = require_BrowsingContextImpl();
	var LogManager_js_1 = require_LogManager();
	var NetworkStorage_js_1 = require_NetworkStorage();
	exports.CdpTarget = class CdpTarget {
		#id;
		userContext;
		#cdpClient;
		#browserCdpClient;
		#parentCdpClient;
		#realmStorage;
		#eventManager;
		#preloadScriptStorage;
		#browsingContextStorage;
		#networkStorage;
		contextConfigStorage;
		#unblocked = new Deferred_js_1.Deferred();
		#defaultUserAgent;
		#logger;
		/**
		* Target's window id. Is filled when the CDP target is created and do not reflect
		* moving targets from one window to another. The actual values
		* will be set during `#unblock`.
		* */
		#windowId;
		#deviceAccessEnabled = false;
		#cacheDisableState = false;
		#preloadEnabled = false;
		#fetchDomainStages = {
			request: false,
			response: false,
			auth: false
		};
		static create(targetId, cdpClient, browserCdpClient, parentCdpClient, realmStorage, eventManager, preloadScriptStorage, browsingContextStorage, networkStorage, configStorage, userContext, defaultUserAgent, logger) {
			const cdpTarget = new CdpTarget(targetId, cdpClient, browserCdpClient, parentCdpClient, eventManager, realmStorage, preloadScriptStorage, browsingContextStorage, configStorage, networkStorage, userContext, defaultUserAgent, logger);
			LogManager_js_1.LogManager.create(cdpTarget, realmStorage, eventManager, logger);
			cdpTarget.#setEventListeners();
			cdpTarget.#unblock();
			return cdpTarget;
		}
		constructor(targetId, cdpClient, browserCdpClient, parentCdpClient, eventManager, realmStorage, preloadScriptStorage, browsingContextStorage, configStorage, networkStorage, userContext, defaultUserAgent, logger) {
			this.#defaultUserAgent = defaultUserAgent;
			this.userContext = userContext;
			this.#id = targetId;
			this.#cdpClient = cdpClient;
			this.#browserCdpClient = browserCdpClient;
			this.#parentCdpClient = parentCdpClient;
			this.#eventManager = eventManager;
			this.#realmStorage = realmStorage;
			this.#preloadScriptStorage = preloadScriptStorage;
			this.#networkStorage = networkStorage;
			this.#browsingContextStorage = browsingContextStorage;
			this.contextConfigStorage = configStorage;
			this.#logger = logger;
		}
		/** Returns a deferred that resolves when the target is unblocked. */
		get unblocked() {
			return this.#unblocked;
		}
		get id() {
			return this.#id;
		}
		get cdpClient() {
			return this.#cdpClient;
		}
		get parentCdpClient() {
			return this.#parentCdpClient;
		}
		get browserCdpClient() {
			return this.#browserCdpClient;
		}
		/** Needed for CDP escape path. */
		get cdpSessionId() {
			return this.#cdpClient.sessionId;
		}
		/**
		* Window id the target belongs to. If not known, returns 0.
		*/
		get windowId() {
			if (this.#windowId === void 0) this.#logger?.(log_js_1.LogType.debugError, "Getting windowId before it was set, returning 0");
			return this.#windowId ?? 0;
		}
		/**
		* Enables all the required CDP domains and unblocks the target.
		*/
		async #unblock() {
			const config = this.contextConfigStorage.getActiveConfig(this.topLevelId, this.userContext);
			const results = await Promise.allSettled([
				this.#cdpClient.sendCommand("Page.enable", { enableFileChooserOpenedEvent: true }),
				...this.#ignoreFileDialog() ? [] : [this.#cdpClient.sendCommand("Page.setInterceptFileChooserDialog", {
					enabled: true,
					cancel: true
				})],
				this.#cdpClient.sendCommand("Page.getFrameTree").then((frameTree) => this.#restoreFrameTreeState(frameTree.frameTree)),
				this.#cdpClient.sendCommand("Runtime.enable"),
				this.#cdpClient.sendCommand("Page.setLifecycleEventsEnabled", { enabled: true }),
				this.#cdpClient.sendCommand("Network.enable", {
					enableDurableMessages: config.disableNetworkDurableMessages !== true,
					maxTotalBufferSize: NetworkStorage_js_1.MAX_TOTAL_COLLECTED_SIZE
				}).then(() => this.toggleNetworkIfNeeded()),
				this.#cdpClient.sendCommand("Target.setAutoAttach", {
					autoAttach: true,
					waitForDebuggerOnStart: true,
					flatten: true
				}),
				this.#updateWindowId(),
				this.#setUserContextConfig(config),
				this.#initAndEvaluatePreloadScripts(),
				this.#cdpClient.sendCommand("Runtime.runIfWaitingForDebugger"),
				this.#parentCdpClient.sendCommand("Runtime.runIfWaitingForDebugger"),
				this.toggleDeviceAccessIfNeeded(),
				this.togglePreloadIfNeeded()
			]);
			for (const result of results) if (result instanceof Error) this.#logger?.(log_js_1.LogType.debugError, "Error happened when configuring a new target", result);
			this.#unblocked.resolve({
				kind: "success",
				value: void 0
			});
		}
		#restoreFrameTreeState(frameTree) {
			const frame = frameTree.frame;
			const maybeContext = this.#browsingContextStorage.findContext(frame.id);
			if (maybeContext !== void 0) {
				if (maybeContext.parentId === null && frame.parentId !== null && frame.parentId !== void 0) maybeContext.parentId = frame.parentId;
			}
			if (maybeContext === void 0 && frame.parentId !== void 0) {
				const parentBrowsingContext = this.#browsingContextStorage.getContext(frame.parentId);
				BrowsingContextImpl_js_1.BrowsingContextImpl.create(frame.id, frame.parentId, this.userContext, parentBrowsingContext.cdpTarget, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.contextConfigStorage, frame.url, void 0, this.#logger);
			}
			frameTree.childFrames?.map((frameTree) => this.#restoreFrameTreeState(frameTree));
		}
		async toggleFetchIfNeeded() {
			const stages = this.#networkStorage.getInterceptionStages(this.topLevelId);
			if (this.#fetchDomainStages.request === stages.request && this.#fetchDomainStages.response === stages.response && this.#fetchDomainStages.auth === stages.auth) return;
			const patterns = [];
			this.#fetchDomainStages = stages;
			if (stages.request || stages.auth) patterns.push({
				urlPattern: "*",
				requestStage: "Request"
			});
			if (stages.response) patterns.push({
				urlPattern: "*",
				requestStage: "Response"
			});
			if (patterns.length) await this.#cdpClient.sendCommand("Fetch.enable", {
				patterns,
				handleAuthRequests: stages.auth
			});
			else {
				const blockedRequest = this.#networkStorage.getRequestsByTarget(this).filter((request) => request.interceptPhase);
				Promise.allSettled(blockedRequest.map((request) => request.waitNextPhase)).then(async () => {
					if (this.#networkStorage.getRequestsByTarget(this).filter((request) => request.interceptPhase).length) return await this.toggleFetchIfNeeded();
					return await this.#cdpClient.sendCommand("Fetch.disable");
				}).catch((error) => {
					this.#logger?.(log_js_1.LogType.bidi, "Disable failed", error);
				});
			}
		}
		/**
		* Toggles CDP "Fetch" domain and enable/disable network cache.
		*/
		async toggleNetworkIfNeeded() {
			try {
				await Promise.all([this.toggleSetCacheDisabled(), this.toggleFetchIfNeeded()]);
			} catch (err) {
				this.#logger?.(log_js_1.LogType.debugError, err);
				if (!this.#isExpectedError(err)) throw err;
			}
		}
		async toggleSetCacheDisabled(disable) {
			const defaultCacheDisabled = this.#networkStorage.defaultCacheBehavior === "bypass";
			const cacheDisabled = disable ?? defaultCacheDisabled;
			if (this.#cacheDisableState === cacheDisabled) return;
			this.#cacheDisableState = cacheDisabled;
			try {
				await this.#cdpClient.sendCommand("Network.setCacheDisabled", { cacheDisabled });
			} catch (err) {
				this.#logger?.(log_js_1.LogType.debugError, err);
				this.#cacheDisableState = !cacheDisabled;
				if (!this.#isExpectedError(err)) throw err;
			}
		}
		async toggleDeviceAccessIfNeeded() {
			const enabled = this.isSubscribedTo(chromium_bidi_js_1.Bluetooth.EventNames.RequestDevicePromptUpdated);
			if (this.#deviceAccessEnabled === enabled) return;
			this.#deviceAccessEnabled = enabled;
			try {
				await this.#cdpClient.sendCommand(enabled ? "DeviceAccess.enable" : "DeviceAccess.disable");
			} catch (err) {
				this.#logger?.(log_js_1.LogType.debugError, err);
				this.#deviceAccessEnabled = !enabled;
				if (!this.#isExpectedError(err)) throw err;
			}
		}
		async togglePreloadIfNeeded() {
			const enabled = this.isSubscribedTo(chromium_bidi_js_1.Speculation.EventNames.PrefetchStatusUpdated);
			if (this.#preloadEnabled === enabled) return;
			this.#preloadEnabled = enabled;
			try {
				await this.#cdpClient.sendCommand(enabled ? "Preload.enable" : "Preload.disable");
			} catch (err) {
				this.#logger?.(log_js_1.LogType.debugError, err);
				this.#preloadEnabled = !enabled;
				if (!this.#isExpectedError(err)) throw err;
			}
		}
		/**
		* Heuristic checking if the error is due to the session being closed. If so, ignore the
		* error.
		*/
		#isExpectedError(err) {
			const error = err;
			return error.code === -32001 && error.message === "Session with given id not found." || this.#cdpClient.isCloseError(err);
		}
		#setEventListeners() {
			this.#cdpClient.on("*", (event, params) => {
				if (typeof event !== "string") return;
				this.#eventManager.registerEvent({
					type: "event",
					method: `goog:cdp.${event}`,
					params: {
						event,
						params,
						session: this.cdpSessionId
					}
				}, this.id);
			});
		}
		async #enableFetch(stages) {
			const patterns = [];
			if (stages.request || stages.auth) patterns.push({
				urlPattern: "*",
				requestStage: "Request"
			});
			if (stages.response) patterns.push({
				urlPattern: "*",
				requestStage: "Response"
			});
			if (patterns.length) {
				const oldStages = this.#fetchDomainStages;
				this.#fetchDomainStages = stages;
				try {
					await this.#cdpClient.sendCommand("Fetch.enable", {
						patterns,
						handleAuthRequests: stages.auth
					});
				} catch {
					this.#fetchDomainStages = oldStages;
				}
			}
		}
		async #disableFetch() {
			if (this.#networkStorage.getRequestsByTarget(this).filter((request) => request.interceptPhase).length === 0) {
				this.#fetchDomainStages = {
					request: false,
					response: false,
					auth: false
				};
				await this.#cdpClient.sendCommand("Fetch.disable");
			}
		}
		async toggleNetwork() {
			const stages = this.#networkStorage.getInterceptionStages(this.topLevelId);
			const fetchEnable = Object.values(stages).some((value) => value);
			const fetchChanged = this.#fetchDomainStages.request !== stages.request || this.#fetchDomainStages.response !== stages.response || this.#fetchDomainStages.auth !== stages.auth;
			this.#logger?.(log_js_1.LogType.debugInfo, "Toggle Network", `Fetch (${fetchEnable}) ${fetchChanged}`);
			if (fetchEnable && fetchChanged) await this.#enableFetch(stages);
			if (!fetchEnable && fetchChanged) await this.#disableFetch();
		}
		/**
		* All the ProxyChannels from all the preload scripts of the given
		* BrowsingContext.
		*/
		getChannels() {
			return this.#preloadScriptStorage.find().flatMap((script) => script.channels);
		}
		async #updateWindowId() {
			const { windowId } = await this.#browserCdpClient.sendCommand("Browser.getWindowForTarget", { targetId: this.id });
			this.#windowId = windowId;
		}
		/** Loads all top-level preload scripts. */
		async #initAndEvaluatePreloadScripts() {
			await Promise.all(this.#preloadScriptStorage.find({ targetId: this.topLevelId }).map((script) => {
				return script.initInTarget(this, true);
			}));
		}
		async setDeviceMetricsOverride(viewport, devicePixelRatio, screenOrientation, screenArea) {
			if (viewport === null && devicePixelRatio === null && screenOrientation === null && screenArea === null) {
				await this.cdpClient.sendCommand("Emulation.clearDeviceMetricsOverride");
				return;
			}
			const metricsOverride = {
				width: viewport?.width ?? 0,
				height: viewport?.height ?? 0,
				deviceScaleFactor: devicePixelRatio ?? 0,
				screenOrientation: this.#toCdpScreenOrientationAngle(screenOrientation) ?? void 0,
				mobile: false,
				screenWidth: screenArea?.width,
				screenHeight: screenArea?.height
			};
			await this.cdpClient.sendCommand("Emulation.setDeviceMetricsOverride", metricsOverride);
		}
		/**
		* Immediately schedules all the required commands to configure user context
		* configuration and waits for them to finish. It's important to schedule them
		* in parallel, so that they are enqueued before any page's scripts.
		*/
		async #setUserContextConfig(config) {
			const promises = [];
			promises.push(this.#cdpClient.sendCommand("Page.setPrerenderingAllowed", { isAllowed: !config.prerenderingDisabled }).catch(() => {}));
			if (config.viewport !== void 0 || config.devicePixelRatio !== void 0 || config.screenOrientation !== void 0 || config.screenArea !== void 0) promises.push(this.setDeviceMetricsOverride(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null, config.screenArea ?? null).catch(() => {}));
			if (config.geolocation !== void 0 && config.geolocation !== null) promises.push(this.setGeolocationOverride(config.geolocation));
			if (config.locale !== void 0) promises.push(this.setLocaleOverride(config.locale));
			if (config.timezone !== void 0) promises.push(this.setTimezoneOverride(config.timezone));
			if (config.extraHeaders !== void 0) promises.push(this.setExtraHeaders(config.extraHeaders));
			if (config.userAgent !== void 0 || config.locale !== void 0 || config.clientHints !== void 0) promises.push(this.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints));
			if (config.scriptingEnabled !== void 0) promises.push(this.setScriptingEnabled(config.scriptingEnabled));
			if (config.acceptInsecureCerts !== void 0) promises.push(this.cdpClient.sendCommand("Security.setIgnoreCertificateErrors", { ignore: config.acceptInsecureCerts }));
			if (config.emulatedNetworkConditions !== void 0) promises.push(this.setEmulatedNetworkConditions(config.emulatedNetworkConditions));
			if (config.maxTouchPoints !== void 0) promises.push(this.setTouchOverride(config.maxTouchPoints));
			await Promise.all(promises);
		}
		get topLevelId() {
			return this.#browsingContextStorage.findTopLevelContextId(this.id) ?? this.id;
		}
		isSubscribedTo(moduleOrEvent) {
			return this.#eventManager.subscriptionManager.isSubscribedTo(moduleOrEvent, this.topLevelId);
		}
		#ignoreFileDialog() {
			const config = this.contextConfigStorage.getActiveConfig(this.topLevelId, this.userContext);
			return (config.userPromptHandler?.file ?? config.userPromptHandler?.default ?? "ignore") === "ignore";
		}
		async setGeolocationOverride(geolocation) {
			if (geolocation === null) await this.cdpClient.sendCommand("Emulation.clearGeolocationOverride");
			else if ("type" in geolocation) {
				if (geolocation.type !== "positionUnavailable") throw new protocol_js_1.UnknownErrorException(`Unknown geolocation error ${geolocation.type}`);
				await this.cdpClient.sendCommand("Emulation.setGeolocationOverride", {});
			} else if ("latitude" in geolocation) await this.cdpClient.sendCommand("Emulation.setGeolocationOverride", {
				latitude: geolocation.latitude,
				longitude: geolocation.longitude,
				accuracy: geolocation.accuracy ?? 1,
				altitude: geolocation.altitude ?? void 0,
				altitudeAccuracy: geolocation.altitudeAccuracy ?? void 0,
				heading: geolocation.heading ?? void 0,
				speed: geolocation.speed ?? void 0
			});
			else throw new protocol_js_1.UnknownErrorException("Unexpected geolocation coordinates value");
		}
		async setTouchOverride(maxTouchPoints) {
			const touchEmulationParams = { enabled: maxTouchPoints !== null };
			if (maxTouchPoints !== null) touchEmulationParams.maxTouchPoints = maxTouchPoints;
			await this.cdpClient.sendCommand("Emulation.setTouchEmulationEnabled", touchEmulationParams);
		}
		#toCdpScreenOrientationAngle(orientation) {
			if (orientation === null) return null;
			if (orientation.natural === "portrait") switch (orientation.type) {
				case "portrait-primary": return {
					angle: 0,
					type: "portraitPrimary"
				};
				case "landscape-primary": return {
					angle: 90,
					type: "landscapePrimary"
				};
				case "portrait-secondary": return {
					angle: 180,
					type: "portraitSecondary"
				};
				case "landscape-secondary": return {
					angle: 270,
					type: "landscapeSecondary"
				};
				default: throw new protocol_js_1.UnknownErrorException(`Unexpected screen orientation type ${orientation.type}`);
			}
			if (orientation.natural === "landscape") switch (orientation.type) {
				case "landscape-primary": return {
					angle: 0,
					type: "landscapePrimary"
				};
				case "portrait-primary": return {
					angle: 90,
					type: "portraitPrimary"
				};
				case "landscape-secondary": return {
					angle: 180,
					type: "landscapeSecondary"
				};
				case "portrait-secondary": return {
					angle: 270,
					type: "portraitSecondary"
				};
				default: throw new protocol_js_1.UnknownErrorException(`Unexpected screen orientation type ${orientation.type}`);
			}
			throw new protocol_js_1.UnknownErrorException(`Unexpected orientation natural ${orientation.natural}`);
		}
		async setLocaleOverride(locale) {
			if (locale === null) await this.cdpClient.sendCommand("Emulation.setLocaleOverride", {});
			else await this.cdpClient.sendCommand("Emulation.setLocaleOverride", { locale });
		}
		async setScriptingEnabled(scriptingEnabled) {
			await this.cdpClient.sendCommand("Emulation.setScriptExecutionDisabled", { value: scriptingEnabled === false });
		}
		async setTimezoneOverride(timezone) {
			if (timezone === null) await this.cdpClient.sendCommand("Emulation.setTimezoneOverride", { timezoneId: "" });
			else await this.cdpClient.sendCommand("Emulation.setTimezoneOverride", { timezoneId: timezone });
		}
		async setExtraHeaders(headers) {
			await this.cdpClient.sendCommand("Network.setExtraHTTPHeaders", { headers });
		}
		async setUserAgentAndAcceptLanguage(userAgent, acceptLanguage, clientHints) {
			const userAgentMetadata = clientHints ? {
				brands: clientHints.brands?.map((b) => ({
					brand: b.brand,
					version: b.version
				})),
				fullVersionList: clientHints.fullVersionList,
				platform: clientHints.platform ?? "",
				platformVersion: clientHints.platformVersion ?? "",
				architecture: clientHints.architecture ?? "",
				model: clientHints.model ?? "",
				mobile: clientHints.mobile ?? false,
				bitness: clientHints.bitness ?? void 0,
				wow64: clientHints.wow64 ?? void 0,
				formFactors: clientHints.formFactors ?? void 0
			} : void 0;
			await this.cdpClient.sendCommand("Emulation.setUserAgentOverride", {
				userAgent: userAgent || (userAgentMetadata ? this.#defaultUserAgent : ""),
				acceptLanguage: acceptLanguage ?? void 0,
				platform: clientHints?.platform ?? void 0,
				userAgentMetadata
			});
		}
		async setEmulatedNetworkConditions(networkConditions) {
			if (networkConditions !== null && networkConditions.type !== "offline") throw new protocol_js_1.UnsupportedOperationException(`Unsupported network conditions ${networkConditions.type}`);
			await Promise.all([this.cdpClient.sendCommand("Network.emulateNetworkConditionsByRule", {
				offline: networkConditions?.type === "offline",
				matchedNetworkConditions: [{
					urlPattern: "",
					latency: 0,
					downloadThroughput: -1,
					uploadThroughput: -1
				}]
			}), this.cdpClient.sendCommand("Network.overrideNetworkState", {
				offline: networkConditions?.type === "offline",
				latency: 0,
				downloadThroughput: -1,
				uploadThroughput: -1
			})]);
		}
	};
}));
var require_CdpTargetManager = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CdpTargetManager = void 0;
	var log_js_1 = require_log();
	var BrowsingContextImpl_js_1 = require_BrowsingContextImpl();
	var WorkerRealm_js_1 = require_WorkerRealm();
	var CdpTarget_js_1 = require_CdpTarget();
	var cdpToBidiTargetTypes = {
		service_worker: "service-worker",
		shared_worker: "shared-worker",
		worker: "dedicated-worker"
	};
	var CdpTargetManager = class {
		#browserCdpClient;
		#cdpConnection;
		#targetKeysToBeIgnoredByAutoAttach = /* @__PURE__ */ new Set();
		#selfTargetId;
		#eventManager;
		#browsingContextStorage;
		#networkStorage;
		#bluetoothProcessor;
		#preloadScriptStorage;
		#realmStorage;
		#configStorage;
		#speculationProcessor;
		#defaultUserContextId;
		#defaultUserAgent;
		#logger;
		constructor(cdpConnection, browserCdpClient, selfTargetId, eventManager, browsingContextStorage, realmStorage, networkStorage, configStorage, bluetoothProcessor, speculationProcessor, preloadScriptStorage, defaultUserContextId, defaultUserAgent, logger) {
			this.#cdpConnection = cdpConnection;
			this.#browserCdpClient = browserCdpClient;
			this.#targetKeysToBeIgnoredByAutoAttach.add(selfTargetId);
			this.#selfTargetId = selfTargetId;
			this.#eventManager = eventManager;
			this.#browsingContextStorage = browsingContextStorage;
			this.#preloadScriptStorage = preloadScriptStorage;
			this.#networkStorage = networkStorage;
			this.#configStorage = configStorage;
			this.#bluetoothProcessor = bluetoothProcessor;
			this.#speculationProcessor = speculationProcessor;
			this.#realmStorage = realmStorage;
			this.#defaultUserContextId = defaultUserContextId;
			this.#defaultUserAgent = defaultUserAgent;
			this.#logger = logger;
			this.#setEventListeners(browserCdpClient);
		}
		/**
		* This method is called for each CDP session, since this class is responsible
		* for creating and destroying all targets and browsing contexts.
		*/
		#setEventListeners(cdpClient) {
			cdpClient.on("Target.attachedToTarget", (params) => {
				this.#handleAttachedToTargetEvent(params, cdpClient);
			});
			cdpClient.on("Target.detachedFromTarget", this.#handleDetachedFromTargetEvent.bind(this));
			cdpClient.on("Target.targetInfoChanged", this.#handleTargetInfoChangedEvent.bind(this));
			cdpClient.on("Inspector.targetCrashed", () => {
				this.#handleTargetCrashedEvent(cdpClient);
			});
			cdpClient.on("Page.frameAttached", this.#handleFrameAttachedEvent.bind(this));
			cdpClient.on("Page.frameSubtreeWillBeDetached", this.#handleFrameSubtreeWillBeDetached.bind(this));
		}
		#handleFrameAttachedEvent(params) {
			const parentBrowsingContext = this.#browsingContextStorage.findContext(params.parentFrameId);
			if (parentBrowsingContext !== void 0) BrowsingContextImpl_js_1.BrowsingContextImpl.create(params.frameId, params.parentFrameId, parentBrowsingContext.userContext, parentBrowsingContext.cdpTarget, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.#configStorage, "about:blank", void 0, this.#logger);
		}
		#handleFrameSubtreeWillBeDetached(params) {
			this.#browsingContextStorage.findContext(params.frameId)?.dispose(true);
		}
		#handleAttachedToTargetEvent(params, parentSessionCdpClient) {
			const { sessionId, targetInfo } = params;
			const targetCdpClient = this.#cdpConnection.getCdpClient(sessionId);
			const detach = async () => {
				await targetCdpClient.sendCommand("Runtime.runIfWaitingForDebugger").then(() => parentSessionCdpClient.sendCommand("Target.detachFromTarget", params)).catch((error) => this.#logger?.(log_js_1.LogType.debugError, error));
			};
			if (this.#selfTargetId === targetInfo.targetId) {
				detach();
				return;
			}
			const targetKey = targetInfo.type === "service_worker" ? `${parentSessionCdpClient.sessionId}_${targetInfo.targetId}` : targetInfo.targetId;
			if (this.#targetKeysToBeIgnoredByAutoAttach.has(targetKey)) return;
			this.#targetKeysToBeIgnoredByAutoAttach.add(targetKey);
			const userContext = targetInfo.browserContextId && targetInfo.browserContextId !== this.#defaultUserContextId ? targetInfo.browserContextId : "default";
			switch (targetInfo.type) {
				case "tab":
					this.#setEventListeners(targetCdpClient);
					(async () => {
						await targetCdpClient.sendCommand("Target.setAutoAttach", {
							autoAttach: true,
							waitForDebuggerOnStart: true,
							flatten: true
						});
					})();
					return;
				case "page":
				case "iframe": {
					const cdpTarget = this.#createCdpTarget(targetCdpClient, parentSessionCdpClient, targetInfo, userContext);
					const maybeContext = this.#browsingContextStorage.findContext(targetInfo.targetId);
					if (maybeContext && targetInfo.type === "iframe") maybeContext.updateCdpTarget(cdpTarget);
					else {
						const parentId = this.#findFrameParentId(targetInfo, parentSessionCdpClient.sessionId);
						BrowsingContextImpl_js_1.BrowsingContextImpl.create(targetInfo.targetId, parentId, userContext, cdpTarget, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.#configStorage, targetInfo.url === "" ? "about:blank" : targetInfo.url, targetInfo.openerFrameId ?? targetInfo.openerId, this.#logger);
					}
					return;
				}
				case "service_worker":
				case "worker": {
					const realm = this.#realmStorage.findRealm({
						cdpSessionId: parentSessionCdpClient.sessionId,
						sandbox: null
					});
					if (!realm) {
						detach();
						return;
					}
					const cdpTarget = this.#createCdpTarget(targetCdpClient, parentSessionCdpClient, targetInfo, userContext);
					this.#handleWorkerTarget(cdpToBidiTargetTypes[targetInfo.type], cdpTarget, realm);
					return;
				}
				case "shared_worker": {
					const cdpTarget = this.#createCdpTarget(targetCdpClient, parentSessionCdpClient, targetInfo, userContext);
					this.#handleWorkerTarget(cdpToBidiTargetTypes[targetInfo.type], cdpTarget);
					return;
				}
			}
			detach();
		}
		/** Try to find the parent browsing context ID for the given attached target. */
		#findFrameParentId(targetInfo, parentSessionId) {
			if (targetInfo.type !== "iframe") return null;
			const parentId = targetInfo.openerFrameId ?? targetInfo.openerId;
			if (parentId !== void 0) return parentId;
			if (parentSessionId !== void 0) return this.#browsingContextStorage.findContextBySession(parentSessionId)?.id ?? null;
			return null;
		}
		#createCdpTarget(targetCdpClient, parentCdpClient, targetInfo, userContext) {
			this.#setEventListeners(targetCdpClient);
			this.#preloadScriptStorage.onCdpTargetCreated(targetInfo.targetId, userContext);
			const target = CdpTarget_js_1.CdpTarget.create(targetInfo.targetId, targetCdpClient, this.#browserCdpClient, parentCdpClient, this.#realmStorage, this.#eventManager, this.#preloadScriptStorage, this.#browsingContextStorage, this.#networkStorage, this.#configStorage, userContext, this.#defaultUserAgent, this.#logger);
			this.#networkStorage.onCdpTargetCreated(target);
			this.#bluetoothProcessor.onCdpTargetCreated(target);
			this.#speculationProcessor.onCdpTargetCreated(target);
			return target;
		}
		#workers = /* @__PURE__ */ new Map();
		#handleWorkerTarget(realmType, cdpTarget, ownerRealm) {
			cdpTarget.cdpClient.on("Runtime.executionContextCreated", (params) => {
				const { uniqueId, id, origin } = params.context;
				const workerRealm = new WorkerRealm_js_1.WorkerRealm(cdpTarget.cdpClient, this.#eventManager, id, this.#logger, (0, BrowsingContextImpl_js_1.serializeOrigin)(origin), ownerRealm ? [ownerRealm] : [], uniqueId, this.#realmStorage, realmType);
				this.#workers.set(cdpTarget.cdpSessionId, workerRealm);
			});
		}
		#handleDetachedFromTargetEvent({ sessionId, targetId }) {
			if (targetId) this.#preloadScriptStorage.find({ targetId }).map((preloadScript) => {
				preloadScript.dispose(targetId);
			});
			const context = this.#browsingContextStorage.findContextBySession(sessionId);
			if (context) {
				context.dispose(true);
				return;
			}
			const worker = this.#workers.get(sessionId);
			if (worker) this.#realmStorage.deleteRealms({ cdpSessionId: worker.cdpClient.sessionId });
		}
		#handleTargetInfoChangedEvent(params) {
			const context = this.#browsingContextStorage.findContext(params.targetInfo.targetId);
			if (context) context.onTargetInfoChanged(params);
		}
		#handleTargetCrashedEvent(cdpClient) {
			const realms = this.#realmStorage.findRealms({ cdpSessionId: cdpClient.sessionId });
			for (const realm of realms) realm.dispose();
		}
	};
	exports.CdpTargetManager = CdpTargetManager;
}));
var require_BrowsingContextStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BrowsingContextStorage = void 0;
	var protocol_js_1 = require_protocol();
	var EventEmitter_js_1 = require_EventEmitter();
	/** Container class for browsing contexts. */
	var BrowsingContextStorage = class {
		/** Map from context ID to context implementation. */
		#contexts = /* @__PURE__ */ new Map();
		/** Event emitter for browsing context storage eventsis not expected to be exposed to
		* the outside world. */
		#eventEmitter = new EventEmitter_js_1.EventEmitter();
		/** Gets all top-level contexts, i.e. those with no parent. */
		getTopLevelContexts() {
			return this.getAllContexts().filter((context) => context.isTopLevelContext());
		}
		/** Gets all contexts. */
		getAllContexts() {
			return Array.from(this.#contexts.values());
		}
		/** Deletes the context with the given ID. */
		deleteContextById(id) {
			this.#contexts.delete(id);
		}
		/** Deletes the given context. */
		deleteContext(context) {
			this.#contexts.delete(context.id);
		}
		/** Tracks the given context. */
		addContext(context) {
			this.#contexts.set(context.id, context);
			this.#eventEmitter.emit("added", { browsingContext: context });
		}
		/**
		* Waits for a context with the given ID to be added and returns it.
		*/
		waitForContext(browsingContextId) {
			if (this.#contexts.has(browsingContextId)) return Promise.resolve(this.getContext(browsingContextId));
			return new Promise((resolve) => {
				const listener = (event) => {
					if (event.browsingContext.id === browsingContextId) {
						this.#eventEmitter.off("added", listener);
						resolve(event.browsingContext);
					}
				};
				this.#eventEmitter.on("added", listener);
			});
		}
		/** Returns true whether there is an existing context with the given ID. */
		hasContext(id) {
			return this.#contexts.has(id);
		}
		/** Gets the context with the given ID, if any. */
		findContext(id) {
			return this.#contexts.get(id);
		}
		/** Returns the top-level context ID of the given context, if any. */
		findTopLevelContextId(id) {
			if (id === null) return null;
			const maybeContext = this.findContext(id);
			if (!maybeContext) return null;
			const parentId = maybeContext.parentId ?? null;
			if (parentId === null) return id;
			return this.findTopLevelContextId(parentId);
		}
		findContextBySession(sessionId) {
			for (const context of this.#contexts.values()) if (context.cdpTarget.cdpSessionId === sessionId) return context;
		}
		/** Gets the context with the given ID, if any, otherwise throws. */
		getContext(id) {
			const result = this.findContext(id);
			if (result === void 0) throw new protocol_js_1.NoSuchFrameException(`Context ${id} not found`);
			return result;
		}
		verifyTopLevelContextsList(contexts) {
			const foundContexts = /* @__PURE__ */ new Set();
			if (!contexts) return foundContexts;
			for (const contextId of contexts) {
				const context = this.getContext(contextId);
				if (context.isTopLevelContext()) foundContexts.add(context);
				else throw new protocol_js_1.InvalidArgumentException(`Non top-level context '${contextId}' given.`);
			}
			return foundContexts;
		}
		verifyContextsList(contexts) {
			if (!contexts.length) return;
			for (const contextId of contexts) this.getContext(contextId);
		}
	};
	exports.BrowsingContextStorage = BrowsingContextStorage;
}));
var require_PreloadScriptStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PreloadScriptStorage = void 0;
	var ErrorResponse_js_1 = require_ErrorResponse();
	/**
	* Container class for preload scripts.
	*/
	var PreloadScriptStorage = class {
		/** Tracks all BiDi preload scripts.  */
		#scripts = /* @__PURE__ */ new Set();
		/**
		* Finds all entries that match the given filter (OR logic).
		*/
		find(filter) {
			if (!filter) return [...this.#scripts];
			return [...this.#scripts].filter((script) => {
				if (script.contexts === void 0 && script.userContexts === void 0) return true;
				if (filter.targetId !== void 0 && script.targetIds.has(filter.targetId)) return true;
				return false;
			});
		}
		add(preloadScript) {
			this.#scripts.add(preloadScript);
		}
		/** Deletes all BiDi preload script entries that match the given filter. */
		remove(id) {
			const script = [...this.#scripts].find((script) => script.id === id);
			if (script === void 0) throw new ErrorResponse_js_1.NoSuchScriptException(`No preload script with id '${id}'`);
			this.#scripts.delete(script);
		}
		/** Gets the preload script with the given ID, if any, otherwise throws. */
		getPreloadScript(id) {
			const script = [...this.#scripts].find((script) => script.id === id);
			if (script === void 0) throw new ErrorResponse_js_1.NoSuchScriptException(`No preload script with id '${id}'`);
			return script;
		}
		onCdpTargetCreated(targetId, userContext) {
			const scriptInUserContext = [...this.#scripts].filter((script) => {
				if (!script.userContexts && !script.contexts) return true;
				return script.userContexts?.includes(userContext);
			});
			for (const script of scriptInUserContext) script.targetIds.add(targetId);
		}
	};
	exports.PreloadScriptStorage = PreloadScriptStorage;
}));
var require_RealmStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RealmStorage = void 0;
	var protocol_js_1 = require_protocol();
	var WindowRealm_js_1 = require_WindowRealm();
	/** Container class for browsing realms. */
	var RealmStorage = class {
		/** Tracks handles and their realms sent to the client. */
		#knownHandlesToRealmMap = /* @__PURE__ */ new Map();
		/** Map from realm ID to Realm. */
		#realmMap = /* @__PURE__ */ new Map();
		/** List of the internal sandboxed realms which should not be reported to the user. */
		hiddenSandboxes = /* @__PURE__ */ new Set();
		get knownHandlesToRealmMap() {
			return this.#knownHandlesToRealmMap;
		}
		addRealm(realm) {
			this.#realmMap.set(realm.realmId, realm);
		}
		/** Finds all realms that match the given filter. */
		findRealms(filter) {
			const sandboxFilterValue = filter.sandbox === null ? void 0 : filter.sandbox;
			return Array.from(this.#realmMap.values()).filter((realm) => {
				if (filter.realmId !== void 0 && filter.realmId !== realm.realmId) return false;
				if (filter.browsingContextId !== void 0 && !realm.associatedBrowsingContexts.map((browsingContext) => browsingContext.id).includes(filter.browsingContextId)) return false;
				if (filter.sandbox !== void 0 && (!(realm instanceof WindowRealm_js_1.WindowRealm) || sandboxFilterValue !== realm.sandbox)) return false;
				if (filter.executionContextId !== void 0 && filter.executionContextId !== realm.executionContextId) return false;
				if (filter.origin !== void 0 && filter.origin !== realm.origin) return false;
				if (filter.type !== void 0 && filter.type !== realm.realmType) return false;
				if (filter.cdpSessionId !== void 0 && filter.cdpSessionId !== realm.cdpClient.sessionId) return false;
				if (filter.isHidden !== void 0 && filter.isHidden !== realm.isHidden()) return false;
				return true;
			});
		}
		findRealm(filter) {
			return this.findRealms(filter)[0];
		}
		/** Gets the only realm that matches the given filter, if any, otherwise throws. */
		getRealm(filter) {
			const maybeRealm = this.findRealm(filter);
			if (maybeRealm === void 0) throw new protocol_js_1.NoSuchFrameException(`Realm ${JSON.stringify(filter)} not found`);
			return maybeRealm;
		}
		/** Deletes all realms that match the given filter. */
		deleteRealms(filter) {
			this.findRealms(filter).map((realm) => {
				realm.dispose();
				this.#realmMap.delete(realm.realmId);
				Array.from(this.knownHandlesToRealmMap.entries()).filter(([, r]) => r === realm.realmId).map(([handle]) => this.knownHandlesToRealmMap.delete(handle));
			});
		}
	};
	exports.RealmStorage = RealmStorage;
}));
var require_Buffer = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Buffer = void 0;
	/** Implements a FIFO buffer with a fixed size. */
	var Buffer = class {
		#capacity;
		#entries = [];
		#onItemRemoved;
		/**
		* @param capacity The buffer capacity.
		* @param onItemRemoved Delegate called for each removed element.
		*/
		constructor(capacity, onItemRemoved) {
			this.#capacity = capacity;
			this.#onItemRemoved = onItemRemoved;
		}
		get() {
			return this.#entries;
		}
		add(value) {
			this.#entries.push(value);
			while (this.#entries.length > this.#capacity) {
				const item = this.#entries.shift();
				if (item !== void 0) this.#onItemRemoved?.(item);
			}
		}
	};
	exports.Buffer = Buffer;
}));
var require_IdWrapper = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IdWrapper = void 0;
	exports.IdWrapper = class IdWrapper {
		static #counter = 0;
		#id;
		constructor() {
			this.#id = ++IdWrapper.#counter;
		}
		get id() {
			return this.#id;
		}
	};
}));
var require_events = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isCdpEvent = isCdpEvent;
	exports.assertSupportedEvent = assertSupportedEvent;
	/**
	* Copyright 2023 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	var protocol_js_1 = require_protocol();
	/**
	* Returns true if the given event is a CDP event.
	* @see https://chromedevtools.github.io/devtools-protocol/
	*/
	function isCdpEvent(name) {
		return name.split(".").at(0)?.startsWith(protocol_js_1.ChromiumBidi.BiDiModule.Cdp) ?? false;
	}
	/**
	* Asserts that the given event is known to BiDi or BiDi+, or throws otherwise.
	*/
	function assertSupportedEvent(name) {
		if (!protocol_js_1.ChromiumBidi.EVENT_NAMES.has(name) && !isCdpEvent(name)) throw new protocol_js_1.InvalidArgumentException(`Unknown event: ${name}`);
	}
}));
var require_SubscriptionManager = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SubscriptionManager = void 0;
	exports.cartesianProduct = cartesianProduct;
	exports.unrollEvents = unrollEvents;
	exports.difference = difference;
	var protocol_js_1 = require_protocol();
	var uuid_js_1 = require_uuid();
	/**
	* Returns the cartesian product of the given arrays.
	*
	* Example:
	*   cartesian([1, 2], ['a', 'b']); => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
	*/
	function cartesianProduct(...a) {
		return a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
	}
	/** Expands "AllEvents" events into atomic events. */
	function unrollEvents(events) {
		const allEvents = /* @__PURE__ */ new Set();
		function addEvents(events) {
			for (const event of events) allEvents.add(event);
		}
		for (const event of events) switch (event) {
			case protocol_js_1.ChromiumBidi.BiDiModule.Bluetooth:
				addEvents(Object.values(protocol_js_1.ChromiumBidi.Bluetooth.EventNames));
				break;
			case protocol_js_1.ChromiumBidi.BiDiModule.BrowsingContext:
				addEvents(Object.values(protocol_js_1.ChromiumBidi.BrowsingContext.EventNames));
				break;
			case protocol_js_1.ChromiumBidi.BiDiModule.Input:
				addEvents(Object.values(protocol_js_1.ChromiumBidi.Input.EventNames));
				break;
			case protocol_js_1.ChromiumBidi.BiDiModule.Log:
				addEvents(Object.values(protocol_js_1.ChromiumBidi.Log.EventNames));
				break;
			case protocol_js_1.ChromiumBidi.BiDiModule.Network:
				addEvents(Object.values(protocol_js_1.ChromiumBidi.Network.EventNames));
				break;
			case protocol_js_1.ChromiumBidi.BiDiModule.Script:
				addEvents(Object.values(protocol_js_1.ChromiumBidi.Script.EventNames));
				break;
			case protocol_js_1.ChromiumBidi.BiDiModule.Speculation:
				addEvents(Object.values(protocol_js_1.ChromiumBidi.Speculation.EventNames));
				break;
			default: allEvents.add(event);
		}
		return allEvents.values();
	}
	var SubscriptionManager = class {
		#subscriptions = [];
		#knownSubscriptionIds = /* @__PURE__ */ new Set();
		#browsingContextStorage;
		constructor(browsingContextStorage) {
			this.#browsingContextStorage = browsingContextStorage;
		}
		getGoogChannelsSubscribedToEvent(eventName, contextId) {
			const googChannels = /* @__PURE__ */ new Set();
			for (const subscription of this.#subscriptions) if (this.#isSubscribedTo(subscription, eventName, contextId)) googChannels.add(subscription.googChannel);
			return Array.from(googChannels);
		}
		getGoogChannelsSubscribedToEventGlobally(eventName) {
			const googChannels = /* @__PURE__ */ new Set();
			for (const subscription of this.#subscriptions) if (this.#isSubscribedTo(subscription, eventName)) googChannels.add(subscription.googChannel);
			return Array.from(googChannels);
		}
		#isSubscribedTo(subscription, moduleOrEvent, browsingContextId) {
			let includesEvent = false;
			for (const eventName of subscription.eventNames) if (eventName === moduleOrEvent || eventName === moduleOrEvent.split(".").at(0) || eventName.split(".").at(0) === moduleOrEvent) {
				includesEvent = true;
				break;
			}
			if (!includesEvent) return false;
			if (subscription.userContextIds.size !== 0) {
				if (!browsingContextId) return false;
				const context = this.#browsingContextStorage.findContext(browsingContextId);
				if (!context) return false;
				return subscription.userContextIds.has(context.userContext);
			}
			if (subscription.topLevelTraversableIds.size !== 0) {
				if (!browsingContextId) return false;
				const topLevelContext = this.#browsingContextStorage.findTopLevelContextId(browsingContextId);
				return topLevelContext !== null && subscription.topLevelTraversableIds.has(topLevelContext);
			}
			return true;
		}
		isSubscribedTo(moduleOrEvent, contextId) {
			for (const subscription of this.#subscriptions) if (this.#isSubscribedTo(subscription, moduleOrEvent, contextId)) return true;
			return false;
		}
		/**
		* Subscribes to event in the given context and goog:channel.
		* @return {SubscriptionItem[]} List of
		* subscriptions. If the event is a whole module, it will return all the specific
		* events. If the contextId is null, it will return all the top-level contexts which were
		* not subscribed before the command.
		*/
		subscribe(eventNames, contextIds, userContextIds, googChannel) {
			const subscription = {
				id: (0, uuid_js_1.uuidv4)(),
				eventNames: new Set(unrollEvents(eventNames)),
				topLevelTraversableIds: new Set(contextIds.map((contextId) => {
					const topLevelContext = this.#browsingContextStorage.findTopLevelContextId(contextId);
					if (!topLevelContext) throw new protocol_js_1.NoSuchFrameException(`Top-level navigable not found for context id ${contextId}`);
					return topLevelContext;
				})),
				userContextIds: new Set(userContextIds),
				googChannel
			};
			this.#subscriptions.push(subscription);
			this.#knownSubscriptionIds.add(subscription.id);
			return subscription;
		}
		/**
		* Unsubscribes atomically from all events in the given contexts and channel.
		*
		* This is a legacy spec branch to unsubscribe by attributes.
		*/
		unsubscribe(inputEventNames, googChannel) {
			const eventNames = new Set(unrollEvents(inputEventNames));
			const newSubscriptions = [];
			const eventsMatched = /* @__PURE__ */ new Set();
			for (const subscription of this.#subscriptions) {
				if (subscription.googChannel !== googChannel) {
					newSubscriptions.push(subscription);
					continue;
				}
				if (subscription.userContextIds.size !== 0) {
					newSubscriptions.push(subscription);
					continue;
				}
				if (intersection(subscription.eventNames, eventNames).size === 0) {
					newSubscriptions.push(subscription);
					continue;
				}
				if (subscription.topLevelTraversableIds.size !== 0) {
					newSubscriptions.push(subscription);
					continue;
				}
				const subscriptionEventNames = new Set(subscription.eventNames);
				for (const eventName of eventNames) if (subscriptionEventNames.has(eventName)) {
					eventsMatched.add(eventName);
					subscriptionEventNames.delete(eventName);
				}
				if (subscriptionEventNames.size !== 0) newSubscriptions.push({
					...subscription,
					eventNames: subscriptionEventNames
				});
			}
			if (!equal(eventsMatched, eventNames)) throw new protocol_js_1.InvalidArgumentException("No subscription found");
			this.#subscriptions = newSubscriptions;
		}
		/**
		* Unsubscribes by subscriptionId.
		*/
		unsubscribeById(subscriptionIds) {
			const subscriptionIdsSet = new Set(subscriptionIds);
			if (difference(subscriptionIdsSet, this.#knownSubscriptionIds).size !== 0) throw new protocol_js_1.InvalidArgumentException("No subscription found");
			this.#subscriptions = this.#subscriptions.filter((subscription) => {
				return !subscriptionIdsSet.has(subscription.id);
			});
			this.#knownSubscriptionIds = difference(this.#knownSubscriptionIds, subscriptionIdsSet);
		}
	};
	exports.SubscriptionManager = SubscriptionManager;
	/**
	* Replace with Set.prototype.intersection once Node 20 is dropped.
	*/
	function intersection(setA, setB) {
		const result = /* @__PURE__ */ new Set();
		for (const a of setA) if (setB.has(a)) result.add(a);
		return result;
	}
	/**
	* Replace with Set.prototype.difference once Node 20 is dropped.
	*/
	function difference(setA, setB) {
		const result = /* @__PURE__ */ new Set();
		for (const a of setA) if (!setB.has(a)) result.add(a);
		return result;
	}
	function equal(setA, setB) {
		if (setA.size !== setB.size) return false;
		for (const a of setA) if (!setB.has(a)) return false;
		return true;
	}
}));
var require_EventManager = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EventManager = void 0;
	var protocol_js_1 = require_protocol();
	var Buffer_js_1 = require_Buffer();
	var DefaultMap_js_1 = require_DefaultMap();
	var EventEmitter_js_1 = require_EventEmitter();
	var IdWrapper_js_1 = require_IdWrapper();
	var OutgoingMessage_js_1 = require_OutgoingMessage();
	var events_js_1 = require_events();
	var SubscriptionManager_js_1 = require_SubscriptionManager();
	var EventWrapper = class {
		#idWrapper = new IdWrapper_js_1.IdWrapper();
		#contextId;
		#event;
		constructor(event, contextId) {
			this.#event = event;
			this.#contextId = contextId;
		}
		get id() {
			return this.#idWrapper.id;
		}
		get contextId() {
			return this.#contextId;
		}
		get event() {
			return this.#event;
		}
	};
	/**
	* Maps event name to a desired buffer length.
	*/
	var eventBufferLength = new Map([[protocol_js_1.ChromiumBidi.Log.EventNames.LogEntryAdded, 100]]);
	var EventManager = class extends EventEmitter_js_1.EventEmitter {
		/**
		* Maps event name to a set of contexts where this event already happened.
		* Needed for getting buffered events from all the contexts in case of
		* subscripting to all contexts.
		*/
		#eventToContextsMap = new DefaultMap_js_1.DefaultMap(() => /* @__PURE__ */ new Set());
		/**
		* Maps `eventName` + `browsingContext` to buffer. Used to get buffered events
		* during subscription. Channel-agnostic.
		*/
		#eventBuffers = /* @__PURE__ */ new Map();
		/**
		* Maps `eventName` + `browsingContext` to  Map of goog:channel to last id.
		* Used to avoid sending duplicated events when user
		* subscribes -> unsubscribes -> subscribes.
		*/
		#lastMessageSent = /* @__PURE__ */ new Map();
		#subscriptionManager;
		#browsingContextStorage;
		/**
		* Map of event name to hooks to be called when client is subscribed to the event.
		*/
		#subscribeHooks;
		#userContextStorage;
		constructor(browsingContextStorage, userContextStorage) {
			super();
			this.#browsingContextStorage = browsingContextStorage;
			this.#userContextStorage = userContextStorage;
			this.#subscriptionManager = new SubscriptionManager_js_1.SubscriptionManager(browsingContextStorage);
			this.#subscribeHooks = new DefaultMap_js_1.DefaultMap(() => []);
		}
		get subscriptionManager() {
			return this.#subscriptionManager;
		}
		/**
		* Returns consistent key to be used to access value maps.
		*/
		static #getMapKey(eventName, browsingContext) {
			return JSON.stringify({
				eventName,
				browsingContext
			});
		}
		addSubscribeHook(event, hook) {
			this.#subscribeHooks.get(event).push(hook);
		}
		registerEvent(event, contextId) {
			this.registerPromiseEvent(Promise.resolve({
				kind: "success",
				value: event
			}), contextId, event.method);
		}
		registerGlobalEvent(event) {
			this.registerGlobalPromiseEvent(Promise.resolve({
				kind: "success",
				value: event
			}), event.method);
		}
		registerPromiseEvent(event, contextId, eventName) {
			const eventWrapper = new EventWrapper(event, contextId);
			const sortedGoogChannels = this.#subscriptionManager.getGoogChannelsSubscribedToEvent(eventName, contextId);
			this.#bufferEvent(eventWrapper, eventName);
			for (const googChannel of sortedGoogChannels) {
				this.emit("event", {
					message: OutgoingMessage_js_1.OutgoingMessage.createFromPromise(event, googChannel),
					event: eventName
				});
				this.#markEventSent(eventWrapper, googChannel, eventName);
			}
		}
		registerGlobalPromiseEvent(event, eventName) {
			const eventWrapper = new EventWrapper(event, null);
			const sortedGoogChannels = this.#subscriptionManager.getGoogChannelsSubscribedToEventGlobally(eventName);
			this.#bufferEvent(eventWrapper, eventName);
			for (const googChannel of sortedGoogChannels) {
				this.emit("event", {
					message: OutgoingMessage_js_1.OutgoingMessage.createFromPromise(event, googChannel),
					event: eventName
				});
				this.#markEventSent(eventWrapper, googChannel, eventName);
			}
		}
		async subscribe(eventNames, contextIds, userContextIds, googChannel) {
			for (const name of eventNames) (0, events_js_1.assertSupportedEvent)(name);
			if (userContextIds.length && contextIds.length) throw new protocol_js_1.InvalidArgumentException("Both userContexts and contexts cannot be specified.");
			this.#browsingContextStorage.verifyContextsList(contextIds);
			await this.#userContextStorage.verifyUserContextIdList(userContextIds);
			const unrolledEventNames = new Set((0, SubscriptionManager_js_1.unrollEvents)(eventNames));
			const subscribeStepEvents = /* @__PURE__ */ new Map();
			const subscriptionNavigableIds = new Set(contextIds.length ? contextIds.map((contextId) => {
				const id = this.#browsingContextStorage.findTopLevelContextId(contextId);
				if (!id) throw new protocol_js_1.InvalidArgumentException("Invalid context id");
				return id;
			}) : this.#browsingContextStorage.getTopLevelContexts().map((c) => c.id));
			for (const eventName of unrolledEventNames) {
				const subscribedNavigableIds = new Set(this.#browsingContextStorage.getTopLevelContexts().map((c) => c.id).filter((id) => {
					return this.#subscriptionManager.isSubscribedTo(eventName, id);
				}));
				subscribeStepEvents.set(eventName, (0, SubscriptionManager_js_1.difference)(subscriptionNavigableIds, subscribedNavigableIds));
			}
			const subscription = this.#subscriptionManager.subscribe(eventNames, contextIds, userContextIds, googChannel);
			for (const eventName of subscription.eventNames) for (const contextId of subscriptionNavigableIds) for (const eventWrapper of this.#getBufferedEvents(eventName, contextId, googChannel)) {
				this.emit("event", {
					message: OutgoingMessage_js_1.OutgoingMessage.createFromPromise(eventWrapper.event, googChannel),
					event: eventName
				});
				this.#markEventSent(eventWrapper, googChannel, eventName);
			}
			for (const [eventName, contextIds] of subscribeStepEvents) for (const contextId of contextIds) this.#subscribeHooks.get(eventName).forEach((hook) => hook(contextId));
			await this.toggleModulesIfNeeded();
			return subscription.id;
		}
		async unsubscribe(eventNames, googChannel) {
			for (const name of eventNames) (0, events_js_1.assertSupportedEvent)(name);
			this.#subscriptionManager.unsubscribe(eventNames, googChannel);
			await this.toggleModulesIfNeeded();
		}
		async unsubscribeByIds(subscriptionIds) {
			this.#subscriptionManager.unsubscribeById(subscriptionIds);
			await this.toggleModulesIfNeeded();
		}
		async toggleModulesIfNeeded() {
			await Promise.all(this.#browsingContextStorage.getAllContexts().map(async (context) => {
				return await context.toggleModulesIfNeeded();
			}));
		}
		clearBufferedEvents(contextId) {
			for (const eventName of eventBufferLength.keys()) {
				const bufferMapKey = _a.#getMapKey(eventName, contextId);
				this.#eventBuffers.delete(bufferMapKey);
			}
		}
		/**
		* If the event is buffer-able, put it in the buffer.
		*/
		#bufferEvent(eventWrapper, eventName) {
			if (!eventBufferLength.has(eventName)) return;
			const bufferMapKey = _a.#getMapKey(eventName, eventWrapper.contextId);
			if (!this.#eventBuffers.has(bufferMapKey)) this.#eventBuffers.set(bufferMapKey, new Buffer_js_1.Buffer(eventBufferLength.get(eventName)));
			this.#eventBuffers.get(bufferMapKey).add(eventWrapper);
			this.#eventToContextsMap.get(eventName).add(eventWrapper.contextId);
		}
		/**
		* If the event is buffer-able, mark it as sent to the given contextId and goog:channel.
		*/
		#markEventSent(eventWrapper, googChannel, eventName) {
			if (!eventBufferLength.has(eventName)) return;
			const lastSentMapKey = _a.#getMapKey(eventName, eventWrapper.contextId);
			const lastId = Math.max(this.#lastMessageSent.get(lastSentMapKey)?.get(googChannel) ?? 0, eventWrapper.id);
			const googChannelMap = this.#lastMessageSent.get(lastSentMapKey);
			if (googChannelMap) googChannelMap.set(googChannel, lastId);
			else this.#lastMessageSent.set(lastSentMapKey, new Map([[googChannel, lastId]]));
		}
		/**
		* Returns events which are buffered and not yet sent to the given goog:channel events.
		*/
		#getBufferedEvents(eventName, contextId, googChannel) {
			const bufferMapKey = _a.#getMapKey(eventName, contextId);
			const lastSentMessageId = this.#lastMessageSent.get(bufferMapKey)?.get(googChannel) ?? -Infinity;
			const result = this.#eventBuffers.get(bufferMapKey)?.get().filter((wrapper) => wrapper.id > lastSentMessageId) ?? [];
			if (contextId === null) Array.from(this.#eventToContextsMap.get(eventName).keys()).filter((_contextId) => _contextId !== null && this.#browsingContextStorage.hasContext(_contextId)).map((_contextId) => this.#getBufferedEvents(eventName, _contextId, googChannel)).forEach((events) => result.push(...events));
			return result.sort((e1, e2) => e1.id - e2.id);
		}
	};
	exports.EventManager = EventManager;
	_a = EventManager;
}));
var require_SpeculationProcessor = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2025 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SpeculationProcessor = void 0;
	var log_js_1 = require_log();
	var SpeculationProcessor = class {
		#eventManager;
		#logger;
		constructor(eventManager, logger) {
			this.#eventManager = eventManager;
			this.#logger = logger;
		}
		onCdpTargetCreated(cdpTarget) {
			cdpTarget.cdpClient.on("Preload.prefetchStatusUpdated", (event) => {
				let prefetchStatus;
				switch (event.status) {
					case "Running":
						prefetchStatus = "pending";
						break;
					case "Ready":
						prefetchStatus = "ready";
						break;
					case "Success":
						prefetchStatus = "success";
						break;
					case "Failure":
						prefetchStatus = "failure";
						break;
					default:
						this.#logger?.(log_js_1.LogType.debugWarn, `Unknown prefetch status: ${event.status}`);
						return;
				}
				this.#eventManager.registerEvent({
					type: "event",
					method: "speculation.prefetchStatusUpdated",
					params: {
						context: event.initiatingFrameId,
						url: event.prefetchUrl,
						status: prefetchStatus
					}
				}, cdpTarget.id);
			});
		}
	};
	exports.SpeculationProcessor = SpeculationProcessor;
}));
var require_BidiServer = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2021 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BidiServer = void 0;
	var EventEmitter_js_1 = require_EventEmitter();
	var log_js_1 = require_log();
	var ProcessingQueue_js_1 = require_ProcessingQueue();
	var CommandProcessor_js_1 = require_CommandProcessor();
	var BluetoothProcessor_js_1 = require_BluetoothProcessor();
	var ContextConfigStorage_js_1 = require_ContextConfigStorage();
	var UserContextStorage_js_1 = require_UserContextStorage();
	var CdpTargetManager_js_1 = require_CdpTargetManager();
	var BrowsingContextStorage_js_1 = require_BrowsingContextStorage();
	var NetworkStorage_js_1 = require_NetworkStorage();
	var PreloadScriptStorage_js_1 = require_PreloadScriptStorage();
	var RealmStorage_js_1 = require_RealmStorage();
	var EventManager_js_1 = require_EventManager();
	var SpeculationProcessor_js_1 = require_SpeculationProcessor();
	exports.BidiServer = class BidiServer extends EventEmitter_js_1.EventEmitter {
		#messageQueue;
		#transport;
		#commandProcessor;
		#eventManager;
		#browsingContextStorage = new BrowsingContextStorage_js_1.BrowsingContextStorage();
		#realmStorage = new RealmStorage_js_1.RealmStorage();
		#preloadScriptStorage = new PreloadScriptStorage_js_1.PreloadScriptStorage();
		#bluetoothProcessor;
		#speculationProcessor;
		#logger;
		#handleIncomingMessage = (message) => {
			this.#commandProcessor.processCommand(message).catch((error) => {
				this.#logger?.(log_js_1.LogType.debugError, error);
			});
		};
		#processOutgoingMessage = async (messageEntry) => {
			const message = messageEntry.message;
			if (messageEntry.googChannel !== null) message["goog:channel"] = messageEntry.googChannel;
			await this.#transport.sendMessage(message);
		};
		constructor(bidiTransport, cdpConnection, browserCdpClient, selfTargetId, defaultUserContextId, defaultUserAgent, parser, logger) {
			super();
			this.#logger = logger;
			this.#messageQueue = new ProcessingQueue_js_1.ProcessingQueue(this.#processOutgoingMessage, this.#logger);
			this.#transport = bidiTransport;
			this.#transport.setOnMessage(this.#handleIncomingMessage);
			const contextConfigStorage = new ContextConfigStorage_js_1.ContextConfigStorage();
			const userContextStorage = new UserContextStorage_js_1.UserContextStorage(browserCdpClient);
			this.#eventManager = new EventManager_js_1.EventManager(this.#browsingContextStorage, userContextStorage);
			const networkStorage = new NetworkStorage_js_1.NetworkStorage(this.#eventManager, this.#browsingContextStorage, browserCdpClient, logger);
			this.#bluetoothProcessor = new BluetoothProcessor_js_1.BluetoothProcessor(this.#eventManager, this.#browsingContextStorage);
			this.#speculationProcessor = new SpeculationProcessor_js_1.SpeculationProcessor(this.#eventManager, this.#logger);
			this.#commandProcessor = new CommandProcessor_js_1.CommandProcessor(cdpConnection, browserCdpClient, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.#preloadScriptStorage, networkStorage, contextConfigStorage, this.#bluetoothProcessor, userContextStorage, parser, async (options) => {
				await browserCdpClient.sendCommand("Security.setIgnoreCertificateErrors", { ignore: options.acceptInsecureCerts ?? false });
				contextConfigStorage.updateGlobalConfig({
					acceptInsecureCerts: options.acceptInsecureCerts ?? false,
					userPromptHandler: options.unhandledPromptBehavior,
					prerenderingDisabled: options?.["goog:prerenderingDisabled"] ?? false,
					disableNetworkDurableMessages: options?.["goog:disableNetworkDurableMessages"]
				});
				new CdpTargetManager_js_1.CdpTargetManager(cdpConnection, browserCdpClient, selfTargetId, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, networkStorage, contextConfigStorage, this.#bluetoothProcessor, this.#speculationProcessor, this.#preloadScriptStorage, defaultUserContextId, defaultUserAgent, logger);
				await browserCdpClient.sendCommand("Target.setDiscoverTargets", { discover: true });
				await browserCdpClient.sendCommand("Target.setAutoAttach", {
					autoAttach: true,
					waitForDebuggerOnStart: true,
					flatten: true,
					filter: [{
						type: "page",
						exclude: true
					}, {}]
				});
				await this.#topLevelContextsLoaded();
			}, this.#logger);
			this.#eventManager.on("event", ({ message, event }) => {
				this.emitOutgoingMessage(message, event);
			});
			this.#commandProcessor.on("response", ({ message, event }) => {
				this.emitOutgoingMessage(message, event);
			});
		}
		/**
		* Creates and starts BiDi Mapper instance.
		*/
		static async createAndStart(bidiTransport, cdpConnection, browserCdpClient, selfTargetId, parser, logger) {
			const [defaultUserContextId, version] = await Promise.all([
				this.#getDefaultUserContextId(browserCdpClient),
				browserCdpClient.sendCommand("Browser.getVersion"),
				browserCdpClient.sendCommand("Browser.setDownloadBehavior", {
					behavior: "default",
					eventsEnabled: true
				})
			]);
			return new BidiServer(bidiTransport, cdpConnection, browserCdpClient, selfTargetId, defaultUserContextId, version.userAgent, parser, logger);
		}
		static async #getDefaultUserContextId(browserCdpClient) {
			const [{ defaultBrowserContextId, browserContextIds }, { targetInfos }] = await Promise.all([browserCdpClient.sendCommand("Target.getBrowserContexts"), browserCdpClient.sendCommand("Target.getTargets")]);
			if (defaultBrowserContextId) return defaultBrowserContextId;
			for (const info of targetInfos) if (info.browserContextId && !browserContextIds.includes(info.browserContextId)) return info.browserContextId;
			return "default";
		}
		/**
		* Sends BiDi message.
		*/
		emitOutgoingMessage(messageEntry, event) {
			this.#messageQueue.add(messageEntry, event);
		}
		close() {
			this.#transport.close();
		}
		async #topLevelContextsLoaded() {
			await Promise.all(this.#browsingContextStorage.getTopLevelContexts().map((c) => c.lifecycleLoaded()));
		}
	};
}));
var require_BidiMapper = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright 2022 Google LLC.
	* Copyright (c) Microsoft Corporation.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*     http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OutgoingMessage = exports.EventEmitter = exports.BidiServer = void 0;
	/**
	* @fileoverview The entry point to the BiDi Mapper namespace.
	* Other modules should only access exports defined in this file.
	* XXX: Add ESlint rule for this (https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md)
	*/
	var BidiServer_js_1 = require_BidiServer();
	Object.defineProperty(exports, "BidiServer", {
		enumerable: true,
		get: function() {
			return BidiServer_js_1.BidiServer;
		}
	});
	var EventEmitter_js_1 = require_EventEmitter();
	Object.defineProperty(exports, "EventEmitter", {
		enumerable: true,
		get: function() {
			return EventEmitter_js_1.EventEmitter;
		}
	});
	var OutgoingMessage_js_1 = require_OutgoingMessage();
	Object.defineProperty(exports, "OutgoingMessage", {
		enumerable: true,
		get: function() {
			return OutgoingMessage_js_1.OutgoingMessage;
		}
	});
}));
export { require_BidiMapper as t };

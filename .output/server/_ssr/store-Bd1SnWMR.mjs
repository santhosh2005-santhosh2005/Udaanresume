import { a as create, i as persist, n as immer, r as createJSONStorage } from "../_libs/zustand.mjs";
var initialState = {
	enabled: false,
	provider: "openai",
	model: "",
	apiKey: "",
	baseURL: "",
	testStatus: "unverified"
};
var useAIStore = create()(persist(immer((set, get) => ({
	...initialState,
	set: (fn) => {
		set((draft) => {
			const prev = {
				provider: draft.provider,
				model: draft.model,
				apiKey: draft.apiKey,
				baseURL: draft.baseURL
			};
			fn(draft);
			if (draft.provider !== prev.provider || draft.model !== prev.model || draft.apiKey !== prev.apiKey || draft.baseURL !== prev.baseURL) {
				draft.testStatus = "unverified";
				draft.enabled = false;
			}
		});
	},
	reset: () => set(() => initialState),
	canEnable: () => {
		const { testStatus } = get();
		return testStatus === "success";
	},
	setEnabled: (value) => {
		const canEnable = get().canEnable();
		if (value && !canEnable) return;
		set((draft) => {
			draft.enabled = value;
		});
	}
})), {
	name: "ai-store",
	storage: createJSONStorage(() => localStorage),
	partialize: (state) => ({
		enabled: state.enabled,
		provider: state.provider,
		model: state.model,
		apiKey: state.apiKey,
		baseURL: state.baseURL,
		testStatus: state.testStatus
	})
}));
export { useAIStore as t };

import { J as usernameClient, K as twoFactorClient, N as inferAdditionalFields, O as genericOAuthClient, d as apiKeyClient, p as createAuthClient } from "./vendor-react-5BBUOSGM.mjs";
var getAuthClient = () => {
	return createAuthClient({ plugins: [
		apiKeyClient(),
		usernameClient(),
		twoFactorClient({ onTwoFactorRedirect() {
			if (typeof window !== "undefined") window.location.href = "/auth/verify-2fa";
		} }),
		genericOAuthClient(),
		inferAdditionalFields()
	] });
};
var authClient = getAuthClient();
export { authClient as t };

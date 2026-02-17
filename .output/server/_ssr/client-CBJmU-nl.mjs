import { S as twoFactorClient, d as genericOAuthClient, i as createAuthClient, m as inferAdditionalFields, n as apiKeyClient, w as usernameClient } from "./vendor-react-DpiQ1Spv.mjs";
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

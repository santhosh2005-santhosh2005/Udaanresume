import { x as deepEqual } from "./@tanstack/react-router+[...].mjs";
function stripSearchParams(input) {
	return ({ search, next }) => {
		if (input === true) return {};
		const result = { ...next(search) };
		if (Array.isArray(input)) input.forEach((key) => {
			delete result[key];
		});
		else Object.entries(input).forEach(([key, value]) => {
			if (deepEqual(result[key], value)) delete result[key];
		});
		return result;
	};
}
function defineHandlerCallback(handler) {
	return handler;
}
export { stripSearchParams as n, defineHandlerCallback as t };

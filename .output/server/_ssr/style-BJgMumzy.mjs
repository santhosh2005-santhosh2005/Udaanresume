import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
export { cn as t };

import { t as slugify$1 } from "../_libs/@sindresorhus/slugify+[...].mjs";
import { i as t, n, r, t as l } from "../_libs/unique-names-generator.mjs";
import { t as v7 } from "../_libs/uuid.mjs";
/**
* Generates a unique ID using the UUIDv7 algorithm.
* @returns The generated ID.
*/
function generateId() {
	return v7();
}
/** Slugifies a string, with some pre-defined options.
*
* @param value - The value to slugify.
* @returns The slugified value.
*/
function slugify(value) {
	return slugify$1(value, { decamelize: false });
}
/**
* Generates initials from a name.
* @param name - The name to generate initials from.
* @returns The initials.
*/
function getInitials(name) {
	return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
/**
* Transforms a string to a valid username (lowercase, no special characters except for dots, hyphens and underscores).
* @param value - The value to transform.
* @returns The transformed username.
*/
function toUsername(value) {
	return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 64);
}
/**
* Generates a random name using the unique-names-generator library.
* @returns The random name.
*/
function generateRandomName() {
	return n({
		dictionaries: [
			l,
			t,
			r
		],
		style: "capital",
		separator: " ",
		length: 3
	});
}
/**
* Strips HTML tags from a string and returns the text content.
* @param html - The HTML string to strip.
* @returns The text content without HTML tags.
*/
function stripHtml(html) {
	if (!html) return "";
	return html.replace(/<[^>]*>/g, "").trim();
}
export { stripHtml as a, slugify as i, generateRandomName as n, toUsername as o, getInitials as r, generateId as t };

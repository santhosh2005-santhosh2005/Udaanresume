import { a as Node3 } from "./@tiptap/core+[...].mjs";
var Text = Node3.create({
	name: "text",
	group: "inline",
	parseMarkdown: (token) => {
		return {
			type: "text",
			text: token.text || ""
		};
	},
	renderMarkdown: (node) => node.text || ""
});
export { Text as t };

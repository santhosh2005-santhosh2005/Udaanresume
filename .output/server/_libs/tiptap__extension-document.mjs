import { a as Node3 } from "./@tiptap/core+[...].mjs";
var Document = Node3.create({
	name: "doc",
	topNode: true,
	content: "block+",
	renderMarkdown: (node, h) => {
		if (!node.content) return "";
		return h.renderChildren(node.content, "\n\n");
	}
});
export { Document as t };

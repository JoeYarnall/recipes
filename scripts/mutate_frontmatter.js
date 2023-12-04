module.exports = (tp, newAttrs) => {
	if (typeof newAttrs !== "object") {
		throw new Error("attributes must be an object");
	}
	const { position, ...frontmatter } = tp.frontmatter && typeof tp.frontmatter === "object" ? tp.frontmatter : {};
	frontmatter = { ...frontmatter, ...newAttrs };
	return frontmatter
};
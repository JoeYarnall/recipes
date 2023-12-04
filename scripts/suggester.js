async function suggester(tp, tag, message) {
	// Collect all notes with the tag "Meta". Using DataViewJs for this.
	const dataview = app.plugins.plugins["dataview"].api;
	let notes = dataview.pages(tag).file.sort(note => note.name);

	let suggestions = notes.map(note => note.frontmatter.name);
	let values = notes.map(note => "\"[[" + note.name + "|" + note.frontmatter.name + "]]\"");

	return await tp.system.suggester(suggestions, values, true, message);
}

module.exports = suggester;
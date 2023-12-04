async function multi_suggester(tp, tag, message) {
	// Collect all notes with the tag "Meta". Using DataViewJs for this.
	const dataview = app.plugins.plugins["dataview"].api;
	let notes = dataview.pages(tag).file.sort(note => note.name);
	
	let suggestions = notes.map(note => note.frontmatter.name);
	suggestions = ["Done", ...suggestions];
	
	let values = notes.map(note => "\"[[" + note.name + "|" + note.frontmatter.name + "]]\"");
	values = ["Done", ...values];

	// Create object with suggestions and values arrays
	const config = {
	  "suggestions": suggestions,
	  "values": values,
	  "responses": []
	};

	let response;
	while (response !== "Done") {
	    response = await tp.system.suggester(config.suggestions, config.values, true, message);
	    if (response !== "Done") {	
			let rIndex = config.responses.indexOf(response);
			if (rIndex > -1) {
					config.responses.splice(rIndex, 1);					
			} else {				
				config.responses.push(response);
			}
			let vIndex = config.values.indexOf(response);
			let suggestion = config.suggestions[vIndex];
		}
	}

	return config.responses.join("\n  - ");
}

module.exports = multi_suggester;
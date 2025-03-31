import React, { useState } from "react";
import { marked } from "marked";
import "./App.css";

const defaultMarkdown = `# Welcome to my Markdown Previewer!  
## This is a sub-heading  
[Visit my GitHub](https://github.com/vintiw6)  
\`inline code\`  
\`\`\`  
// Code block
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`  
- List item 1  
- List item 2  

> This is a blockquote  

**Bolded Text**  

![Image](https://via.placeholder.com/150)
`;

const MarkdownPreviewer = () => {
	const [markdown, setMarkdown] = useState(defaultMarkdown);

	return (
		<div className="container">
			<textarea
				id="editor"
				value={markdown}
				onChange={(e) => setMarkdown(e.target.value)}
			/>
			<div
				id="preview"
				dangerouslySetInnerHTML={{ __html: marked(markdown) }}
			/>
		</div>
	);
};

export default MarkdownPreviewer;

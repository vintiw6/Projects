import React, { useState, useEffect } from "react";

const QuoteMachine = () => {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");

	const fetchQuote = async () => {
		try {
			const response = await fetch("https://api.quotable.io/random");
			const data = await response.json();
			setQuote(data.content);
			setAuthor(data.author);
		} catch (error) {
			console.error("Error fetching quote:", error);
		}
	};

	useEffect(() => {
		fetchQuote();
	}, []);

	return (
		<div className="wrapper">
			<div id="quote-box">
				<p id="text">"{quote}"</p>
				<h4 id="author">- {author}</h4>
				<div className="buttons">
					<button id="new-quote" onClick={fetchQuote}>
						New Quote
					</button>
					<a
						id="tweet-quote"
						href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Tweet Quote
					</a>
				</div>
			</div>
		</div>
	);
};

export default QuoteMachine;

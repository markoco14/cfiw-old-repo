if(faqData[i].formatQuestion) {
			questionDiv.innerHTML = convertMarkdownToHtml(faqData, "question");
		} else {
			questionDiv.textContent = faqData[i].question;
		}


if ("question") {
		var converter = new showdown.Converter(),
		    text = faqData[i].formatQuestion,
		    html = converter.makeHtml(text);
		    return html
	}


	/*functions to convert markdown to html*/
function convertMarkdownToHtml(data, type) {
	//convert markdown to html
	if ("answer") {
		var converter = new showdown.Converter(),
		    text = faqData[i].formatAnswer,
		    html = converter.makeHtml(text);
		    return html
}
	}
//a js file
//create all references to DOM elements
//and initialize global variables
const faqContainer = document.getElementById('faqContainer');
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
let faqData = [];
let filteredFaq = [];
let detailsArray = [];
let summaryArray = [];

//create search bar listener function
searchBar.addEventListener('keyup', (e) => {
	//initialize faqData count property
	for (i = 0; i < faqData.length; i++) {
		faqData[i]["count"] = 0;
	}

	//reset filteredFaq so search terms clear..?
	filteredFaq = [];
	
	//create trackers which questions to include
	let labelYes;
	let contentYes;

	//create the search array
	const searchString = e.target.value.toLowerCase();

	//initialize filterString to filter symbols and special characters
	let filterString = searchString;
	
	//get rid of all punctuation from the search string 
	for (i = 0; i < dnuPunctuation.length; i++) {
		while (filterString.includes(dnuPunctuation[i])) {
			filterString = filterString.replace(`${dnuPunctuation[i]}`, '');
		}
	}

	//split the filter string into the search array
	let searchArray = filterString.split(' ');
	

	//taking out DNU search terms now
	let badSearchArray = [];
	let goodSearchArray = [];
	for (i = 0; i < searchArray.length; i++) {
		if (dnuWords.includes(searchArray[i])) {
			badSearchArray.push(searchArray[i]);
		} else {
			goodSearchArray.push(searchArray[i]);
		}
	}

	//set search array to good search term array
	searchArray = goodSearchArray;

	//check for search term matches
	for (i = 0; i < faqData.length; i++) {
		for (j = 0; j < searchArray.length; j++) {
			//check if questions match search terms
			if (faqData[i].question.toLowerCase().includes(searchArray[j].toLowerCase())) {
				labelYes = true;
			} else {
				labelYes = false;
			}
			//check if answers match search terms
			if (faqData[i].answer.toLowerCase().includes(searchArray[j].toLowerCase())) {
				contentYes = true;
			} else {
				contentYes = false;
			}

			//give each faqData[i] a count value if the answer matches
			if (labelYes === true) {
				faqData[i].count += 1;
			}

			//give each faqData[i] a count value if the answer matches
			if (contentYes === true) {
				faqData[i].count += 1;
			}
			
			//add questions and answers to filteredFaq
			if (labelYes === true || contentYes === true) {
				if (!filteredFaq.includes(faqData[i])) {
					filteredFaq.push(faqData[i]);
				} else {
					//console.log("This is already in the search, it won't be included again");
				}
			} else {
				//console.log(`question${i+1} will not be added to the search results`);
			}	

			
		}
	}

	/*filteredFaq.sort((a,b)=>b-a);*/
	//define function to compare the indexes of unsorted filteredFaq
	/*function compare( a, b ) {
	  if ( a.count < b.count ){
	    return 1;
	  }
	  if ( a.count > b.count ){
	    return -1;
	  }
	  return 0;
	}*/

	//sort filtered FAQ to be in descending numerical order
	filteredFaq.sort( sortSearchResultsByCount );

	//call the display searches function
	displaySearches(filteredFaq)
});

function sortSearchResultsByCount( a, b ) {
	  if ( a.count < b.count ){
	    return 1;
	  }
	  if ( a.count > b.count ){
	    return -1;
	  }
	  return 0;
	}

function sortFaqContentByOrder( a, b ) {
	  if ( a.order > b.order ){
	    return 1;
	  }
	  if ( a.order < b.order ){
	    return -1;
	  }
	  return 0;
	}

const loadFaq = async () => {
	let url = "https://markoco14.github.io/cfiw/faq/dynamic-faq-json.json";
	let url2 ="https://markoco14.github.io/cfiw/faq/dynamic-faq-json-2.json";
	let url3 = "json/dynamic-faq-json-2.json"
	let url4 = "https://github.com/markoco14/cfiw/blob/main/faqDataJSON.json"
	let url5 = "https://markoco14.github.io/cfiw/faqDataJSON.json"
	/* url for script link
	<script src="https://markoco14.github.io/google-sheet-test/display-data.js"></script>
	*/
	try {
		const res = await fetch(url);
		faqData = await res.json();
		console.log(faqData);
	} catch (err) {
		console.log(err);
	}
};

//this function displays the matching search results under the search bar
const displaySearches = function(filteredFaq) {
	//remove all current search results
	while (searchResults.firstChild) {
		searchResults.removeChild(searchResults.firstChild);
	}

	//loop through filtered search data
	for (i = 0; i < filteredFaq.length; i++) {
		const div = document.createElement('div');
		const a = document.createElement('a');
		a.textContent = filteredFaq[i].question;
		div.setAttribute('class','searchContainer');
		a.setAttribute('href', `#question${filteredFaq[i].id}`)
		a.setAttribute('class', 'searchLink');
		a.addEventListener('click', () => {
			//create a reference to the link ID
			let id = a.getAttribute('href')
			//check question IDs for match with link ID
			for (j = 0; j < questionsArray.length; j++) {
				console.log(`#${questionsArray[j].id}`)
				if (id === `#${questionsArray[j].id}`) {
					questionsArray[j].classList.add('question-clicked');
					answersArray[j].classList.remove('hidden');
				} else {
					questionsArray[j].classList.remove('question-clicked');
					answersArray[j].classList.add('hidden');
				}
			}
		});
		div.appendChild(a);
		searchResults.appendChild(div);
	}

	//clear search results if search bar empty
	if (searchBar.value === ''){
		while (searchResults.firstChild) {
			searchResults.removeChild(searchResults.firstChild);
		}
	}
}

let containersArray = [];
let answersArray = [];
let questionsArray = [];
let inputsArray = [];

const displayFaqContent = async () => {
	const sortedFaqContent = faqData.sort(sortFaqContentByOrder)
	for (i = 0; i < faqData.length; i++) {

		//create page elements
		/*let container = document.createElement('div');*/
		let questionDiv = document.createElement('dt');
		let answerDiv = document.createElement('dd');
		
		//set up attributes
		/*
			comment out container div element to test
			definition list within a div wrapping
			each question/answer pair
		*/

		/*container.setAttribute('id', `${faqData[i].order}`);
		container.classList.add('faq-box');*/

		questionDiv.setAttribute('id', `question${faqData[i].id}`);
		questionDiv.setAttribute('class', 'faq-question')

		answerDiv.classList.add('answer-content', 'hidden');
		
		/* 
			keep next line of code for later
		*/
		questionDiv.innerHTML = faqData[i].question;

		/*questionDiv.innerHTML = convertMarkdownToHtml(faqData, "question");*/

		/*
			commented out the <h3> format for the question
			because I think the switch to a dl>dd>dt
			took care of the semantic concerns
		*/

		//will test faq question h3 markdown later
		/*if(faqData[i].formatQuestion) {
			questionDiv.innerHTML = convertMarkdownToHtml(faqData, "question");
		} else {
			questionDiv.innerHTML = faqData[i].question;
		}*/

		/*set answer content and convert markdown as needed*/
		if(faqData[i].formatAnswer) {
			answerDiv.innerHTML = convertMarkdownToHtml(faqData, "answer");
		} else {
			answerDiv.innerHTML = faqData[i].answer;
		}
		
		//set event listeners
		questionDiv.addEventListener('click', toggleFaq)
		/*answerDiv.addEventListener('click', toggleFaq)*/
		
		/*faqData[i]["count"] = 0;*/		
		//push elements to arrays for looping
		questionsArray.push(questionDiv);
		answersArray.push(answerDiv);


		
		//append elements to the page	
		/*container.appendChild(questionDiv);
		container.appendChild(answerDiv);*/
		faqContainer.appendChild(questionDiv);
		faqContainer.appendChild(answerDiv);	
	}
}

/*functions to convert markdown to html*/
function convertMarkdownToHtml(data, string) {
	//convert markdown to html
	if (string === "answer") {
		var converter = new showdown.Converter(),
		    text = faqData[i].formatAnswer,
		    html = converter.makeHtml(text);
		    return html
	} else {
		var converter = new showdown.Converter(),
		    text = faqData[i].formatQuestion,
		    html = converter.makeHtml(text);
		    return html
	}
}

function toggleFaq(e) {
	//i want to close all
	for (i=0; i < questionsArray.length; i++) {
		if (e.target === questionsArray[i] && answersArray[i].classList.contains('hidden')) {
			answersArray[i].classList.remove('hidden');
			questionsArray[i].classList.add('question-clicked');
		} else {
			answersArray[i].classList.add('hidden');
			questionsArray[i].classList.remove('question-clicked');
		}
	}

/*
|| e.target === answersArray[i]) && answersArray[i].classList.contains('hidden')*/

	/*
		scroll screen to the clicked on question. 
		https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
		right now scrolls to top
		but needs more work
	*/
/*	e.target.scrollIntoView(true);*/
	e.target.scrollIntoView({
		behavior: "smooth"
	})
}
	


loadFaq()
.then(displayFaqContent)

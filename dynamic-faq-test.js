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
	function compare( a, b ) {
	  if ( a.count < b.count ){
	    return 1;
	  }
	  if ( a.count > b.count ){
	    return -1;
	  }
	  return 0;
	}

	//sort filtered FAQ to be in descending numerical order
	filteredFaq.sort( compare );

	//call the display searches function
	displaySearches(filteredFaq)
});

const loadFaq = async () => {
	let url = "https://markoco14.github.io/google-sheet-test/dynamic-faq-json.json";
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

const displayFaqContent = async () => {
	console.log("Data downloaded, copy FAQ to page");
	for (i = 0; i < faqData.length; i++) {
		//create elements
		let container = document.createElement('div');
		let details = document.createElement('details');
		let summary = document.createElement('summary');
		let div = document.createElement('div');

		//set text content of elements
		summary.innerHTML = `<strong>${faqData[i].question}</strong>`;
		if(faqData[i].content) {
			div.innerHTML = faqData[i].content;
		} else {
			div.innerHTML = faqData[i].answer;

		}

		//set ID's for anchor links
		details.setAttribute('id', `question${faqData[i].id}`)
		details.setAttribute('class', faqData[i].id)
		
		//create event listener function

		container.addEventListener('click', (evt) => {
			


			
			//your code goes here
			//so I need the function to know which one has been clicked
			//and I think that is evt
			//from there I think I can check for a match in ID? 
			//and then flip the switch on the open variable
			//check all the details to see if open
			//close if open

			//check through all details
			//if any open, close them
			/*for (i = 0; i < detailsArray.length; i++) {
				if (detailsArray[i].open) {
					detailsArray[i].open = false;
				}	
			}*/

			//create tracker
			let tracker;

			//find the index of evt.target
			for (i = 0; i < detailsArray.length; i++) {
				if (evt.target.textContent === detailsArray[i].innerText) {
					console.log(`We found it at ${i}`)
					tracker = i;
				}
			}

			//there is some problem here
			//when I'm trying to close the element
			//tracker returns undefined
			//maybe this is preventing the close on second click
			console.log(tracker)

			//this is where the program goes wrong
			//I figured out that it does close itself back down
			//but only when you click the expanded details.

			/*if (!evt.target.open) {
				detailsArray[tracker].open = true;
			} else {
				detailsArray[tracker].open = false;
			}*/
		});

		//add details to array so they can be worked with
		
		//append elements to page
		details.appendChild(summary);
		details.appendChild(div);
		container.appendChild(details);
		faqContainer.appendChild(container);

		//create arrays for testing
		detailsArray.push(details);
		summaryArray.push(summary);
	}
}


loadFaq()
.then(displayFaqContent)
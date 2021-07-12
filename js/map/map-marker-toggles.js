//a js file
/* SECTION FOR TOGGLE BUTTON FUNCTIONALITY */

//create references to all toggle buttons
const footprintToggleButton = document.getElementById('footprint-button');




const disinfectionToggleButton = document.getElementById('disinfection-button');
const disinfectionAllButton = document.getElementById('disinfect-all');
const disinfectionYesterdayButton = document.getElementById('disinfect-yesterday');
const disinfectionTodayButton = document.getElementById('disinfect-today');
const disinfectionTomorrowButton = document.getElementById('disinfect-tomorrow');


const healthCenterToggleButton = document.getElementById('health-center-button');
//Testing buttons
const testEnglishButton = document.getElementById('test-english');
const testPregnancyButton = document.getElementById('test-pregnant');
const testRapidButton = document.getElementById('test-rapid');
const testPcrButton = document.getElementById('test-pcr');
//Vaccination buttons
const vacEnglishButton = document.getElementById('vac-english');
const vacPregnancyButton = document.getElementById('vac-pregnant');
const vacZenecaButton = document.getElementById('vac-zeneca');
const vacModernaButton = document.getElementById('vac-moderna');


/*const testHospitalToggleButton = document.getElementById('test-hospitals-button');
const vaccinationHospitalToggleButton = document.getElementById('vaccination-hospitals-button');
*/

const footprintSelectors = document.getElementById('footprint-selectors');
const disinfectionSelectors = document.getElementById('disinfection-selectors');
const healthCenterSelectors = document.getElementById('health-center-selectors');
/*const testingSelectors = document.getElementById('testing-selectors');
const vaccinationSelectors = document.getElementById('vaccination-selectors');
*/
//need referenece to chinese hospital buttons
//need referenece to english hospital buttons

//create variables to track active/inactive state
let footprintMarkersActive = false;

let disinfectionMarkersActive = false;
let disinfectAllActive = false;
let disinfectYesterdayActive = false;
let disinfectTodayActive = false;
let disinfectTomorrowActive = false;


let healthCenterMarkersActive = true;

/*let testMarkersActive = true;
let vaccinationMarkersActive = true;
*/
let footprintMarkersInitialized = false;


/* toggle functions
right now we only need a special function for footprints
because it's the only one that requires code
beyond the normal show/hide marker functions
*/

let toggleFootprints = function() {
	if (!footprintMarkersInitialized) {
		footprintMarkersInitialized = true;
		initializeSlider();
	}
	if (!footprintMarkersActive) {
		showFootprintMarkers()
		//footprintToggleButton.innerHTML = "Hide footprints";
		footprintMarkersActive = true;
		footprintToggleButton.classList.add("pressed", "footprint-pressed")
		footprintSelectors.style.display = 'block';
		footprintSelectors.classList.remove('hidden')
	} else {
		hideFootprintMarkers()
		//footprintToggleButton.textContent = "Show footprints";
		footprintMarkersActive = false;
		footprintToggleButton.classList.remove("pressed", "footprint-pressed")
		footprintSelectors.style.display = 'none';
		footprintSelectors.classList.add('hidden')
		footprintToggleButton.style.backgroundColor = "none";
	}
}

//eventually this needs to check if yesterday/today/tomorrow are open and just re-open
let toggleDisinfections = function () {
	if (!disinfectionMarkersActive) {
		showDisinfectionMarkers()
		//disinfectionToggleButton.textContent = "Hide disinfections";
		disinfectionMarkersActive = true;
		disinfectionToggleButton.classList.add("pressed", "disinfection-pressed")

		disinfectAllActive = true;
		disinfectionAllButton.classList.add("pressed", "disinfection-pressed")
		disinfectionSelectors.style.display = 'block';
	} else {
		hideDisinfectionMarkers()
		//disinfectionToggleButton.textContent = "Show disinfections";
		disinfectionMarkersActive = false;
		/*disinfectAllActive = false;
		disinfectYesterdayActive = false;
		disinfectTodayActive = false;
		disinfectTomorrowActive = false;*/
		disinfectionToggleButton.classList.remove("pressed", "disinfection-pressed")
		disinfectionSelectors.style.display = 'none';

		//reset disinfection selectors
		disinfectYesterdayActive = false;
		disinfectionYesterdayButton.classList.remove("pressed", "disinfection-pressed");
	}
}

/* I need a check that will see if any of yesterday, today, and tomorrow are active
=> if they are active, then only those data sets should show up.
*/

let toggleAll = function() {
	console.log('filter all worked')
	if (!disinfectAllActive) {
		disinfectAllActive = true;
		disinfectYesterdayActive = true;
		disinfectTodayActive = true;
		disinfectTomorrowActive = true;
		disinfectionAllButton.classList.add("pressed", "disinfection-pressed")
		toggleYesterday();
		toggleToday();
		toggleTomorrow();
		showDisinfectionMarkers()
	} else {
		hideDisinfectionMarkers()
		disinfectAllActive = false;
		disinfectionAllButton.classList.remove("pressed", "disinfection-pressed")
		console.log(disinfectAllActive)

	}
}



let toggleYesterday = function() {
	console.log('yesterday worked')
	if (!disinfectYesterdayActive) {
		hideDisinfectionMarkers()
		for (i = 0; i < disinfectionData.length; i++) {
			console.log(disinfectionData[i].date)
			if (disinfectionData[i].date === year + '-' + month + '-' + yesterday) {
				disinfectionMarkers[i].setMap(map);
			} /*else {
				disinfectionMarkers[i].setMap(null);
			}*/
		}
		disinfectYesterdayActive = true;
		disinfectionYesterdayButton.classList.add("pressed", "disinfection-pressed")
		//turn off All button
		disinfectAllActive = false;
		disinfectionAllButton.classList.remove("pressed", "disinfection-pressed")
	} else {
		for (i = 0; i < disinfectionData.length; i++) {
			console.log(disinfectionData[i].date)
			if (disinfectionData[i].date === year + '-' + month + '-' + yesterday) {
				disinfectionMarkers[i].setMap(null);
			} /*else {
				disinfectionMarkers[i].setMap(null);
			}*/
		}
		disinfectYesterdayActive = false;
		disinfectionYesterdayButton.classList.remove("pressed", "disinfection-pressed");
	}
}

let toggleToday = function() {
	console.log('today worked')
	if (!disinfectTodayActive) {
		hideDisinfectionMarkers()
		for (i = 0; i < disinfectionData.length; i++) {
			console.log(disinfectionData[i].date)
			if (disinfectionData[i].date === year + '-' + month + '-' + today) {
				disinfectionMarkers[i].setMap(map);
			} /*else {
				disinfectionMarkers[i].setMap(null);
			}*/
		}
		disinfectTodayActive = true;
		disinfectionTodayButton.classList.add("pressed", "disinfection-pressed")
		//turn off All button
		disinfectAllActive = false;
		disinfectionAllButton.classList.remove("pressed", "disinfection-pressed")
	} else {
		for (i = 0; i < disinfectionData.length; i++) {
			console.log(disinfectionData[i].date)
			if (disinfectionData[i].date === year + '-' + month + '-' + today) {
				disinfectionMarkers[i].setMap(null);
			} /*else {
				disinfectionMarkers[i].setMap(null);
			}*/
		}
		disinfectTodayActive = false;
		disinfectionTodayButton.classList.remove("pressed", "disinfection-pressed")
	}

}

let toggleTomorrow = function() {
	if (!disinfectTomorrowActive) {
		hideDisinfectionMarkers()
		for (i = 0; i < disinfectionData.length; i++) {
			console.log(disinfectionData[i].date)
			if (disinfectionData[i].date === year + '-' + month + '-' + tomorrow) {
				disinfectionMarkers[i].setMap(map);
			} /*else {
				disinfectionMarkers[i].setMap(null);
			}*/
		}
		disinfectTomorrowActive = true;
		disinfectionTomorrowButton.classList.add("pressed", "disinfection-pressed")
		//turn off All button
		disinfectAllActive = false;
		disinfectionAllButton.classList.remove("pressed", "disinfection-pressed")
	} else {
		for (i = 0; i < disinfectionData.length; i++) {
			console.log(disinfectionData[i].date)
			if (disinfectionData[i].date === year + '-' + month + '-' + tomorrow) {
				disinfectionMarkers[i].setMap(null);
			} /*else {
				disinfectionMarkers[i].setMap(null);
			}*/
		}
		disinfectTomorrowActive = false;
		disinfectionTomorrowButton.classList.remove("pressed", "disinfection-pressed")
	}
	console.log("tomorrow worked")
}

let toggleHealthCenters = function() {
	if (!healthCenterMarkersActive) {
		showHealthCenterMarkers()
		//testHospitalToggleButton.textContent = "Hide testing hospitals"
		healthCenterMarkersActive = true;
		healthCenterToggleButton.classList.add("pressed", "health-center-pressed")
		healthCenterSelectors.style.display = 'block';
	} else {
		hideHealthCenterMarkers()
		//testHospitalToggleButton.textContent = "Show testing hospitals"
		healthCenterMarkersActive = false;
		healthCenterToggleButton.classList.remove("pressed", "health-center-pressed")
		healthCenterSelectors.style.display = 'none';
	}
}

/*let toggleTestHospitals = function() {
	if (!testMarkersActive) {
		showTestHospitalMarkers()
		//testHospitalToggleButton.textContent = "Hide testing hospitals"
		testMarkersActive = true;
		testHospitalToggleButton.classList.add("pressed", "testing-pressed")
		testingSelectors.style.display = 'block';
	} else {
		hideTestHospitalMarkers()
		//testHospitalToggleButton.textContent = "Show testing hospitals"
		testMarkersActive = false;
		testHospitalToggleButton.classList.remove("pressed", "testing-pressed")
		testingSelectors.style.display = 'none';
	}
}

let toggleVaccinationHospitals = function() {
	if (!vaccinationMarkersActive) {
		showVaccinationHospitalMarkers()
		vaccinationHospitalToggleButton.textContent = "Hide vaccination hospitals"
		vaccinationMarkersActive = true;
		vaccinationHospitalToggleButton.classList.add("pressed", "vaccination-pressed")
		vaccinationSelectors.style.display = 'block';
	} else {
		hideVaccinationHospitalMarkers()
		vaccinationHospitalToggleButton.textContent = "Show vaccination hospitals"
		vaccinationMarkersActive = false;
		vaccinationHospitalToggleButton.classList.remove("pressed", "vaccination-pressed")
		vaccinationSelectors.style.display = 'none';
	}
}*/

// create all toggle button listeners
footprintToggleButton.addEventListener('click', toggleFootprints);


disinfectionToggleButton.addEventListener('click', toggleDisinfections)
disinfectionAllButton.addEventListener('click', toggleAll)
disinfectionYesterdayButton.addEventListener('click', toggleYesterday)
disinfectionTodayButton.addEventListener('click', toggleToday)
disinfectionTomorrowButton.addEventListener('click', toggleTomorrow)



healthCenterToggleButton.addEventListener('click', toggleHealthCenters)
/*testEnglishButton.addListener('click', toggle)
testPregnancyButton.addListener('click', toggle)
testRapidButton.addListener('click', toggle)
testPcrButton.addListener('click', toggle)
vacEnglishButton.addListener('click', toggle)
vacPregnancyButton.addListener('click', toggle)
vacZenecaButton.addListener('click', toggle)
vacModernaButton.addListener('click', toggle)*/
/*testHospitalToggleButton.addEventListener('click', toggleTestHospitals);
vaccinationHospitalToggleButton.addEventListener('click', toggleVaccinationHospitals);
*/


/* test before depracating 
const hideDisinfectionsButton = document.getElementById('hide-disinfections');
const showDisinfectionsButton = document.getElementById('show-disinfections');
const hideChineseHospitalsButton = document.getElementById('hide-chinese-hospitals');
const showChineseHospitalsButton = document.getElementById('show-chinese-hospitals');
const hideEnglishHopsitalsButton = document.getElementById('hide-english-hospitals');
const showEnglishHospitalsButton = document.getElementById('show-english-hospitals');

hideDisinfectionsButton.addEventListener('click', hideDisinfectionMarkers);
showDisinfectionsButton.addEventListener('click', showDisinfectionMarkers);

hideChineseHospitalsButton.addEventListener('click', hideChineseHospitalMarkers);
showChineseHospitalsButton.addEventListener('click', showChineseHospitalMarkers);

hideEnglishHopsitalsButton.addEventListener('click', hideEnglishHospitalMarkers);
showEnglishHospitalsButton.addEventListener('click', showEnglishHospitalMarkers);

*/
//a js file
/* SECTION FOR TOGGLE BUTTON FUNCTIONALITY */

//create references to all toggle buttons
const footprintToggleButton = document.getElementById('footprint-button');
const disinfectionToggleButton = document.getElementById('disinfection-button');
const testHospitalToggleButton = document.getElementById('test-hospitals-button');
const vaccinationHospitalToggleButton = document.getElementById('vaccination-hospitals-button');


const footprintSelectors = document.getElementById('footprint-selectors');
const disinfectionSelectors = document.getElementById('disinfection-selectors');
const testingSelectors = document.getElementById('testing-selectors');
const vaccinationSelectors = document.getElementById('vaccination-selectors');

//need referenece to chinese hospital buttons
//need referenece to english hospital buttons

//create variables to track active/inactive state
let footprintMarkersActive = true;
let disinfectionMarkersActive = true;
let testMarkersActive = true;
let vaccinationMarkersActive = true;


/* toggle functions
right now we only need a special function for footprints
because it's the only one that requires code
beyond the normal show/hide marker functions
*/

let toggleFootprints = function() {
	if (!footprintMarkersActive) {
		showFootprintMarkers()
		footprintToggleButton.innerHTML = "Hide footprints";
		footprintMarkersActive = true;
		footprintToggleButton.classList.add("pressed")
		footprintSelectors.style.display = 'block';

	} else {
		hideFootprintMarkers()
		footprintToggleButton.textContent = "Show footprints";
		footprintMarkersActive = false;
		footprintToggleButton.classList.remove("pressed")
		footprintSelectors.style.display = 'none';
	}
}

let toggleDisinfections = function () {
	if (!disinfectionMarkersActive) {
		showDisinfectionMarkers()
		disinfectionToggleButton.textContent = "Hide disinfections";
		disinfectionMarkersActive = true;
		disinfectionToggleButton.classList.add("pressed")
		disinfectionSelectors.style.display = 'block';
	} else {
		hideDisinfectionMarkers()
		disinfectionToggleButton.textContent = "Show disinfections";
		disinfectionMarkersActive = false;
		disinfectionToggleButton.classList.remove("pressed")
		disinfectionSelectors.style.display = 'none';
	}
}

let toggleTestHospitals = function() {
	if (!testMarkersActive) {
		showTestHospitalMarkers()
		testHospitalToggleButton.textContent = "Hide testing hospitals"
		testMarkersActive = true;
		testHospitalToggleButton.classList.add("pressed")
		testingSelectors.style.display = 'block';
	} else {
		hideTestHospitalMarkers()
		testHospitalToggleButton.textContent = "Show testing hospitals"
		testMarkersActive = false;
		testHospitalToggleButton.classList.remove("pressed")
		testingSelectors.style.display = 'none';
	}
}

let toggleVaccinationHospitals = function() {
	if (!vaccinationMarkersActive) {
		showVaccinationHospitalMarkers()
		vaccinationHospitalToggleButton.textContent = "Hide vaccination hospitals"
		vaccinationMarkersActive = true;
		vaccinationHospitalToggleButton.classList.add("pressed")
		vaccinationSelectors.style.display = 'block';
	} else {
		hideVaccinationHospitalMarkers()
		vaccinationHospitalToggleButton.textContent = "Show vaccination hospitals"
		vaccinationMarkersActive = false;
		vaccinationHospitalToggleButton.classList.remove("pressed")
		vaccinationSelectors.style.display = 'none';
	}
}

// create all toggle button listeners
footprintToggleButton.addEventListener('click', toggleFootprints);
disinfectionToggleButton.addEventListener('click', toggleDisinfections)
testHospitalToggleButton.addEventListener('click', toggleTestHospitals);
vaccinationHospitalToggleButton.addEventListener('click', toggleVaccinationHospitals);



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
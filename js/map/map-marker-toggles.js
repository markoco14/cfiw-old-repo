//a js file
/* SECTION FOR TOGGLE BUTTON FUNCTIONALITY */

//create references to all toggle buttons
const footprintToggleButton = document.getElementById('footprint-button');
const disinfectionToggleButton = document.getElementById('disinfection-button');
const testHospitalToggleButton = document.getElementById('test-hospitals-button');
const vaccinationHospitalToggleButton = document.getElementById('vaccination-hospitals-button');

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
		footprintToggleButton.textContent = "Hide footprints";
		footprintMarkersActive = true;
		footprintToggleButton.classList.add("pressed")

	} else {
		hideFootprintMarkers()
		footprintToggleButton.textContent = "Show footprints";
		footprintMarkersActive = false;
		footprintToggleButton.classList.remove("pressed")
	}
}

let toggleDisinfections = function () {
	if (!disinfectionMarkersActive) {
		showDisinfectionMarkers()
		disinfectionToggleButton.textContent = "Hide disinfections";
		disinfectionMarkersActive = true;
		disinfectionToggleButton.classList.add("pressed")
	} else {
		hideDisinfectionMarkers()
		disinfectionToggleButton.textContent = "Show disinfections";
		disinfectionMarkersActive = false;
		disinfectionToggleButton.classList.remove("pressed")
	}
}

let toggleTestHospitals = function() {
	if (!testMarkersActive) {
		showTestHospitalMarkers()
		testHospitalToggleButton.textContent = "Hide testing hospitals"
		testMarkersActive = true;
		testHospitalToggleButton.classList.add("pressed")
	} else {
		hideTestHospitalMarkers()
		testHospitalToggleButton.textContent = "Show testing hospitals"
		testMarkersActive = false;
		testHospitalToggleButton.classList.remove("pressed")
	}
}

let toggleVaccinationHospitals = function() {
	if (!vaccinationMarkersActive) {
		showVaccinationHospitalMarkers()
		vaccinationHospitalToggleButton.textContent = "Hide vaccination hospitals"
		vaccinationMarkersActive = true;
		vaccinationHospitalToggleButton.classList.add("pressed")
	} else {
		hideVaccinationHospitalMarkers()
		vaccinationHospitalToggleButton.textContent = "Show vaccination hospitals"
		vaccinationMarkersActive = false;
		vaccinationHospitalToggleButton.classList.remove("pressed")
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
//a js file
/* SECTION FOR TOGGLE BUTTON FUNCTIONALITY */

//create references to all toggle buttons
const footprintToggleButton = document.getElementById('footprint-button');
const disinfectionToggleButton = document.getElementById('disinfection-button');
const chineseHospitalToggleButton = document.getElementById('chinese-hospitals-button');
const englishHospitalToggleButton = document.getElementById('english-hospitals-button');

//need referenece to chinese hospital buttons
//need referenece to english hospital buttons

//create variables to track active/inactive state
let footprintMarkersActive = true;
let disinfectionMarkersActive = true;
let chineseMarkersActive = true;
let englishMarkersActive = true;


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

let toggleChineseHospitals = function() {
	if (!chineseMarkersActive) {
		showChineseHospitalMarkers()
		chineseHospitalToggleButton.textContent = "Hide Chinese hopsitals"
		chineseMarkersActive = true;
		chineseHospitalToggleButton.classList.add("pressed")
	} else {
		hideChineseHospitalMarkers()
		chineseHospitalToggleButton.textContent = "Show Chinese hopsitals"
		chineseMarkersActive = false;
		chineseHospitalToggleButton.classList.remove("pressed")
	}
}

let toggleEnglishHospitals = function() {
	if (!englishMarkersActive) {
		showEnglishHospitalMarkers()
		englishHospitalToggleButton.textContent = "Hide English hopsitals"
		englishMarkersActive = true;
		englishHospitalToggleButton.classList.add("pressed")
	} else {
		hideEnglishHospitalMarkers()
		englishHospitalToggleButton.textContent = "Show English hopsitals"
		englishMarkersActive = false;
		englishHospitalToggleButton.classList.remove("pressed")
	}
}

// create all toggle button listeners
footprintToggleButton.addEventListener('click', toggleFootprints);
disinfectionToggleButton.addEventListener('click', toggleDisinfections)
chineseHospitalToggleButton.addEventListener('click', toggleChineseHospitals);
englishHospitalToggleButton.addEventListener('click', toggleEnglishHospitals);



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
//a js file
/* SECTION FOR TOGGLE BUTTON FUNCTIONALITY */

//create references to all toggle buttons
const footprintToggleButton = document.getElementById('footprint-button');
const hideDisinfectionsButton = document.getElementById('hide-disinfections');
const showDisinfectionsButton = document.getElementById('show-disinfections');
const hideChineseHospitalsButton = document.getElementById('hide-chinese-hospitals');
const showChineseHospitalsButton = document.getElementById('show-chinese-hospitals');
const hideEnglishHopsitalsButton = document.getElementById('hide-english-hospitals');
const showEnglishHospitalsButton = document.getElementById('show-english-hospitals');
//need referenece to chinese hospital buttons
//need referenece to english hospital buttons

//create variables to track active/inactive state
let footprintMarkersActive = true;
let disinfectionMarkersActive = true;


/* toggle functions
right now we only need a special function for footprints
because it's the only one that requires code
beyond the normal show/hide marker functions
*/

let toggleFootprints = function() {
	//check if the footprints are already displayed
	//if not:
	if (!footprintMarkersActive) {
		/*for (i = 0; i < markerInfo.length; i++) {
			//noooo I need to make a function
			//that intializes that array
			//but does not show the markers
			//watch I'm about to continuously add markers to
			//the array
			markers[i].setMap(map);
		}*/
		showFootprintMarkers()
		footprintToggleButton.textContent = "Hide footprints";
		footprintMarkersActive = true;
		//console.log(footprintMarkers);
	} else {
		/*for (let i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
		}*/
		hideFootprintMarkers()
		footprintToggleButton.textContent = "Show footprints";
		footprintMarkersActive = false;
		//console.log(footprintMarkers);
	}
}

// create all toggle button listeners
footprintToggleButton.addEventListener('click', toggleFootprints);

hideDisinfectionsButton.addEventListener('click', hideDisinfectionMarkers);
showDisinfectionsButton.addEventListener('click', showDisinfectionMarkers);

hideChineseHospitalsButton.addEventListener('click', hideChineseHospitalMarkers);
showChineseHospitalsButton.addEventListener('click', showChineseHospitalMarkers);

hideEnglishHopsitalsButton.addEventListener('click', hideEnglishHospitalMarkers);
showEnglishHospitalsButton.addEventListener('click', showEnglishHospitalMarkers)
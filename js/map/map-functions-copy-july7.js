//I think I need to write an async function which chains those two functions one after another.
var footprintIconPink = "https://i.ibb.co/N3tfg1D/CFIW-pink-pin-72ppi-transparent.png";
var footprintIconPurple = "https://i.ibb.co/YpkKMWH/CFIW-purple-pin-72ppi-transparent.png";
var vaccinationIcon = "https://i.ibb.co/12DjsWm/CFIW-mint-green-health-pin.png"

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
if (month < 10) {
	month = '0' + month;
}
let day = date.getDate();
if (day < 10) {
	day = '0' + day;
}
date = year + '-' + month + '-' + day;
//let url = "https://markoco14.github.io/google-sheet-test/map-footprints-json.json";

//Initialize all marker arrays
var footprintMarkers = [];
var disinfectionMarkers = [];
var englishHospitalMarkers = [];
var chineseHospitalMarkers = [];

//initialize variable for the map
let map;

/* SECTION FOR TOGGLE BUTTON FUNCTIONALITY */
//create references to all toggle buttons and listeners
const footprintToggle = document.getElementById('footprint-button');
let footprintMarkersActive = true;

//need reference to disinfection buttons
//need referenece to english hospital buttons
//need referenece to chinese hospital buttons

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
		footprintToggle.textContent = "Hide footprints";
		footprintMarkersActive = true;
		//console.log(footprintMarkers);
	} else {
		/*for (let i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
		}*/
		hideFootprintMarkers()
		footprintToggle.textContent = "Show footprints";
		footprintMarkersActive = false;
		//console.log(footprintMarkers);
	}
}

footprintToggle.addEventListener('click', toggleFootprints);



function initMap() {
	//we need to define the options
	//doing that in a variable is good
	//we call load footprints right away
	//because we need that data for our markers
	//we use then to wait for fetch to finish
	//before we move on with initializing the map
	loadFootprints()
	.then(loadDisinfections)
	.then(loadChineseHospitals)
	.then(loadEnglishHospitals)
	.then(() => {
		var options = {
			zoom: 10,
			center: {lat:24.1477, lng: 120.6736},
			//mapTypeControl: false,
			disableDefaultUI: true,
		};

		//here we create the actual map 
		//with reference to the DOM ID
		map = new google.maps.Map(document.getElementById('map'), options);

		/* SECTION TO CALL ADDMARKER FUNCTIONS */
		//loop to add footprint markers. visible on load.
		for (i = 0; i < footprintData.length; i++) {
			addFootprintMarker(footprintData[i]);
		}

		//make loop to initialize disinfection markers

		//make loop to initialize chinese hospital markers

		//make loop to initialize english hospital markers

		changeMarkerIcons();
	})
	.then(() => {
		initializeSlider();
	}) 
}

/* FOOTPRINT MARKER SECTION */
//create variable to hold footprint dates for slider
let sliderDatesArray = [];

function createSliderDatesArray(footprintData) {
	//make slider dates array
	for (i = 0; i < footprintData.length; i++) {
	  if (i === 0) {
	    sliderDatesArray.push(footprintData[0].date);
	  } else if (footprintData[i].date !== footprintData[i-1].date) {
	    sliderDatesArray.push(footprintData[i].date);
	  } 
	} 
}

//create add marker function
function addFootprintMarker(footprintData) {
	var footprintMarker = new google.maps.Marker({
		position: footprintData.coords,
		//map: map,
	});
	//checkCustomMarker()
	//marker.setIcon(footprintIconPink)
	//check for date and name information
	//check for marker's content, set, add info window listener
	if(footprintData.place) {
		var infoWindow = new google.maps.InfoWindow({
			content: footprintData.place
		})
	}

	//add listener to open/close windows on click
	if(footprintData.place) {
		let infoWindowOpen = false;
		footprintMarker.addListener('click', function() {
			if (!infoWindowOpen) {
				infoWindow.open(map, footprintMarker)
				infoWindowOpen = true;
			} else {
				infoWindow.close()
				infoWindowOpen = false;
			}
		});
	}

	//push new markers into the markers array	
	footprintMarkers.push(footprintMarker);
}

function setMapOnFootprints(map) {
	//can I maybe use a switch here?
	// case A (footprintMarkers)
	for (i = 0; i < footprintMarkers.length; i++) {
		footprintMarkers[i].setMap(map);
	}
}

//go through the slider dates array
//and then for each one, go through the markers array
//if the sliderDatesArray.inclues(marker[j].date)
//set marker[i] on map
function showSliderMarkers(from, to) {
	//console.log(`from is ${from}`)
	//console.log(`to is ${to}`)
	//hideMarkers()
	//hide all markers at j values below FROM		
	for (j = 0; j < from; j++) {
		for (i = 0; i < footprintData.length; i++) {
			if (sliderDatesArray[j].includes(footprintData[i].date)) {
				//console.log(footprintData[i].date);
				//console.log(`${i} should be shown`)
				footprintMarkers[i].setMap(null);
			}
		}
		//console.log(`${j} should be excluded`);
	}

	//hide all markers at j values above TO
	for (j = to + 1; j < sliderDatesArray.length; j++) {
		for (i = 0; i < footprintData.length; i++) {
			if (sliderDatesArray[j].includes(footprintData[i].date)) {
				//console.log(footprintData[i].date);
				//console.log(`${i} should be shown`)
				footprintMarkers[i].setMap(null);
			}
		}
		//console.log(`${j} should be excluded`);
	}
	//console.log('starting showing markers now')
	//console.log(from)
	
	//show all markers between FROM and TO
	for (j = from; j <= to; j++) {
		//console.log(`${j} should be included`);
		for (i = 0; i < footprintData.length; i++) {
			if (sliderDatesArray[j].includes(footprintData[i].date)) {
				//console.log(footprintData[i].date);
				//console.log(`${i} should be shown`)
				footprintMarkers[i].setMap(map);
			}
		}
	}
}

// set for show marker functions

function showFootprintMarkers() {
	setMapOnFootprints(map);
}

// set all hide marker functions
function hideFootprintMarkers() {
	setMapOnFootprints(null);
}


/*  

this function checks if data has built in markers
=> do we code the marker links into the JSON object

function checkCustomMarker() {
	//check for custom marker
	(footprintData.iconImage) {
		// use .setIcon method 
		
	}
	//marker.setIcon(footprintIconPink)
}
*/

function changeMarkerIcons() {
	for (i=0; i<footprintMarkers.length; i++) {
		if (footprintData[i].date === date) {
			footprintMarkers[i].setIcon(footprintIconPurple)
		} else {
			footprintMarkers[i].setIcon(footprintIconPink)
		}
	}
	//add loop for disinfections
	//add loop for chinese hospitals
	//add loop for english hospitals
}

/* Disinfection marker functions*/

function showDisinfectionMarkers() {
	setMapOnDisinfections(map);
}

function hideDisinfectionMarkers() {
	setMapOnDisinfections(null);
}

/* Chinese hospital marker functions here */

function showChineseHospitalMarkers() {
	setMapOnChineseHospitals(map);
}
function hideChineseHospitalMarkers() {
	setMapOnChineseHospitals(null);
}

/* English hospital marker functions here */

function showEnglishHospitalMarkers() {
	setMapOnEnglishHospitals(map);
}

function hideEnglishHospitalMarkers() {
	setMapOnEnglishHospitals(null);
}
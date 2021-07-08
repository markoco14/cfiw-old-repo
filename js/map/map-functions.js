//I think I need to write an async function which chains those two functions one after another.
var footprintIconPink = "https://i.ibb.co/N3tfg1D/CFIW-pink-pin-72ppi-transparent.png";
var footprintIconPurple = "https://i.ibb.co/YpkKMWH/CFIW-purple-pin-72ppi-transparent.png";
var vaccinationIcon = "https://i.ibb.co/12DjsWm/CFIW-mint-green-health-pin.png"
var disinfectionIcon = "https://i.ibb.co/Sv0PPNs/CFIW-purple-check-pin-72ppi-transparent.png";
var testHospitalIcon = "https://i.ibb.co/CK66g3y/CFIW-yellow-health-pin.png"
var vaccinationHospitalIcon = "https://i.ibb.co/12DjsWm/CFIW-mint-green-health-pin.png"

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
var chineseHospitalMarkers = [];
var testHospitalMarkers = [];
var englishHospitalMarkers = [];
var vaccinationHospitalMarkers = [];

//initialize variable for the map
let map;


function initMap() {
	//we need to define the options
	//doing that in a variable is good
	//we call load footprints right away
	//because we need that data for our markers
	//we use then to wait for fetch to finish
	//before we move on with initializing the map
	loadFootprints()
	.then(loadDisinfections)
	//.then(loadChineseHospitals)
	//.then(loadEnglishHospitals)
	.then(loadTestHospitals)
	.then(loadVaccinationHospitals)
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
		//make loop to initialize disinfection markers
		//loop to add footprint markers. this loop is not visible on load
		for (i = 0; i < footprintData.length; i++) {
			addFootprintMarker(footprintData[i]);
		}

		for (i = 0; i < disinfectionData.length; i++) {
			addDisinfectionMarker(disinfectionData[i]);
		}

		//make loop to initialize chinese hospital markers
		for (i = 0; i < testHospitalData.length; i++) {
			addTestHospitalMarker(testHospitalData[i]);
		}

		//make loop to initialize english hospital markers
		for (i = 0; i < vaccinationHospitalData.length; i++) {
			addVaccinationHospitalMarker(vaccinationHospitalData[i]);
		}

		//show all markers
		//footprint data not included because it is found in showSliderMarkers function
		showMarkers(disinfectionData, testHospitalData, vaccinationHospitalData);

		changeMarkerIcons();
	})
	.then(() => {
		initializeSlider();
	}) 
}

/* one change marker function for all */

function changeMarkerIcons() {
	for (i=0; i<footprintMarkers.length; i++) {
		if (footprintData[i].date === date) {
			footprintMarkers[i].setIcon(footprintIconPurple)
		} else {
			footprintMarkers[i].setIcon(footprintIconPink)
		}
	}
	//add loop for disinfections
	for (i=0; i<disinfectionMarkers.length; i++) {
		disinfectionMarkers[i].setIcon(disinfectionIcon);
	}
	//add loop for chinese hospitals

	for (i =0; i < testHospitalMarkers.length; i++) {
		testHospitalMarkers[i].setIcon(testHospitalIcon)
	}
	//add loop for english hospitals
	for (i=0; i < vaccinationHospitalMarkers.length; i++) {
		vaccinationHospitalMarkers[i].setIcon(vaccinationHospitalIcon);
	}
}

/* FOOTPRINT MARKER SECTION */

function addFootprintMarker(footprintData) {
	var footprintMarker = new google.maps.Marker({
		position: footprintData.coords,
		//map: map,
	});
	//check for marker has place data, create info window
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

	//push new markers into the footprint markers array	
	footprintMarkers.push(footprintMarker);
}

function addDisinfectionMarker(disinfectionData) {
	var disinfectionMarker = new google.maps.Marker({
		position: disinfectionData.coords,
		//map: map,
	});
	//check for marker has place data, create info window
	if(disinfectionData.place) {
		var infoWindow = new google.maps.InfoWindow({
			content: disinfectionData.place
		})
	}
	//add listener to open/close windows on click
	if(disinfectionData.place) {
		let infoWindowOpen = false;
		disinfectionMarker.addListener('click', function() {
			if (!infoWindowOpen) {
				infoWindow.open(map, disinfectionMarker)
				infoWindowOpen = true;
			} else {
				infoWindow.close()
				infoWindowOpen = false;
			}
		});
	}

	//push new markers into the disinfection markers array	
	disinfectionMarkers.push(disinfectionMarker);
}

function addTestHospitalMarker(testHospitalData) {
	var testHospitalMarker = new google.maps.Marker({
		position: testHospitalData.coords,
		//map: map,
	});
	//check for marker has place data, create info window
	if(testHospitalData.place) {
		var infoWindow = new google.maps.InfoWindow({
			content: testHospitalData.place
		})
	}
	//add listener to open/close windows on click
	if(testHospitalData.place) {
		let infoWindowOpen = false;
		testHospitalMarker.addListener('click', function() {
			if (!infoWindowOpen) {
				infoWindow.open(map, testHospitalMarker)
				infoWindowOpen = true;
			} else {
				infoWindow.close()
				infoWindowOpen = false;
			}
		});
	}

	//push new markers into the disinfection markers array	
	testHospitalMarkers.push(testHospitalMarker);
}

function addVaccinationHospitalMarker(vaccinationHospitalData) {
	var vaccinationHospitalMarker = new google.maps.Marker({
		position: vaccinationHospitalData.coords,
		//map: map,
	});
	//check for marker has place data, create info window
	if(vaccinationHospitalData.place) {
		var infoWindow = new google.maps.InfoWindow({
			content: vaccinationHospitalData.place
		})
	}
	//add listener to open/close windows on click
	if(vaccinationHospitalData.place) {
		let infoWindowOpen = false;
		vaccinationHospitalData.addListener('click', function() {
			if (!infoWindowOpen) {
				infoWindow.open(map, vaccinationHospitalData)
				infoWindowOpen = true;
			} else {
				infoWindow.close()
				infoWindowOpen = false;
			}
		});
	}

	//push new markers into the disinfection markers array	
	vaccinationHospitalMarkers.push(vaccinationHospitalMarker);
}

/* set map on all markers here */

function setMapOnFootprints(map) {
	//can I maybe use a switch here?
	// case A (footprintMarkers)
	for (i = 0; i < footprintMarkers.length; i++) {
		footprintMarkers[i].setMap(map);
	}
}

function setMapOnDisinfections(map) {
	for (i=0; i < disinfectionMarkers.length; i++) {
		disinfectionMarkers[i].setMap(map);
	}
}

function setMapOnTestHospitals(map) {
	for (i=0; i < testHospitalMarkers.length; i++) {
		testHospitalMarkers[i].setMap(map);
	}
}

function setMapOnVaccinationHospitals(map) {
	for (i=0; i < vaccinationHospitalMarkers.length; i++) {
		vaccinationHospitalMarkers[i].setMap(map);
	}
}

/* show marker functions here */

function showMarkers(disinfectionMarkers, testHospitalMarkers, vaccinationHospitalMarkers) {
	if  (disinfectionMarkers) {
		setMapOnDisinfections(map);
	}
	if (testHospitalMarkers) {
		setMapOnTestHospitals(map);
	}
	if (vaccinationHospitalMarkers) {
		setMapOnVaccinationHospitals(map);
	}
}

/* show marker functions for toggle buttons here */
function showFootprintMarkers() {
	setMapOnFootprints(map);
}


function showDisinfectionMarkers() {
	setMapOnDisinfections(map);
}

function showTestHospitalMarkers() {
	setMapOnTestHospitals(map);
}

function showVaccinationHospitalMarkers() {
	setMapOnVaccinationHospitals(map);
}

/* hide marker functions for toggle buttons here */ 

function hideFootprintMarkers() {
	setMapOnFootprints(null);
}

function hideDisinfectionMarkers() {
	setMapOnDisinfections(null);
}

function hideTestHospitalMarkers() {
	setMapOnTestHospitals(null);
}

function hideVaccinationHospitalMarkers() {
	setMapOnVaccinationHospitals(null);
}


/* Disinfection marker functions*/









/* slider functions here */
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
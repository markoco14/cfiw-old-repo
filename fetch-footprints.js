const loadFootprints = async () => {
			/*"https://markoco14.github.io/google-sheet-test/map-footprints-json.json"*/
			let url = "map-footprints-json.json";
			try {
				const res = await fetch(url);
				footprintData = await res.json();
				for (i=0; i<footprintData.length; i++) {

					footprintData[i].coords = footprintData[i].coords.split(',');
					footprintData[i].coords = {lat: Number(footprintData[i].coords[0]), lng: Number(footprintData[i].coords[1])};
				}
				console.log(footprintData);
				
			} catch (err) {
				console.log(err);
			}
			initMap();
		};

		loadFootprints();
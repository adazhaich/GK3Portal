$(document).ready(function(){
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/cellidinfo";

    console.log( "url=", url );
	queue()
	    .defer(d3.json, url)
	    .await(makeGraphs);

	function makeGraphs(error, apiData) {
		var dataSet = apiData;
		var x, y, z;
		console.log('cellIdInfo:makeGraphs():apiData:', apiData.length);
		console.log('makeGraphs():dataSet:', dataSet.length);
		if (!dataSet || dataSet.length == 0){
			console.log("No data retrieved. Do nothing");
			return;
		}
		else {
			x = dataSet[0].x;
			y = dataSet[0].y;
		}
		
		
		var map = L.map('map').setView([51.505, -0.09], 13);
//		var map = L.map('map').setView([x, y], 13);//use the first Cell point
		//use the first Cell point
/*		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(map);
*/
//		L.tileLayer.provider('Stamen.Watercolor').addTo(map);
	//	
//		var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//			maxZoom: 19,
//			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//		});
	//	
//		var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
//			maxZoom: 18,
//			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//		});
	//
	//	
//		var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
//			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
//		});
		
/*
		dataSet.forEach(function(d) {
			if (d.id){
				d.x = d.x*1;
				d.y = d.y*1;
				L.circle([d.x, d.y], 500, {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5
				}).addTo(map).bindPopup("Am I a circle?");			
			}
		});*/

		L.circle([51.508, -0.11], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map).bindPopup("I am a circle?????????????????.");
		
		L.marker([51.5, -0.09]).addTo(map)
			.bindPopup("<b>Hello world!</b><br />I am a popup!!!!!!!!!!!.").openPopup();

		
		L.marker([51.5, -0.10]).addTo(map)
			.bindPopup("<b>Hello world!</b><br />I am a another popup!!!!!!!!!!!.");


		L.circle([51.5, -0.10], 500, {
			color: 'red',
			fillColor: '#f03'
		}).addTo(map).bindPopup("I am a circle?????????????????.");

		L.polygon([
			[51.509, -0.08],
			[51.503, -0.06],
			[51.51, -0.047]
		]).addTo(map).bindPopup("I am a polygon.");


		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("Ya clicked the map atttt " + e.latlng.toString())
				.openOn(map);
		}

		map.on('click', onMapClick);
	}
});


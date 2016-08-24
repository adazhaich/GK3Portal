$(document).ready(function(){
	
	//var url = "/tunisiana/dataaccess/cellidinfo";
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/cellidinfo";
//	var cellId = $('#cellId').val();
//	var imsi = $('#imsi').val();
//	var msisdn = $('#msisdn').val();
	var condition = "";
//	var mapId = getElement("#mapId").val();
//	//console.log(mapId);
	var typeMap = $('#typeMap').val();
	if(typeMap != 'pop'){
		if(getElement("#cellId").val() != " "){
			condition = concatParam(condition,"cell","=", "'"+getElement("#cellId").val()+"'");
		}
	}else{
		if($("#cellId").val() != " "){
			condition = concatParam(condition,"cell","=","'"+ $("#cellId").val()+"'");
		}
	}
	
	
	url += "?condition="+condition;
    //console.log( "url=", url );
	queue()
	    .defer(d3.json, url)
	    .await(makeMap);

	function makeMap(error, apiData) {
		var dataSet = apiData;
		var x, y, z;
		//console.log('cellIdInfo:makeGraphs():apiData:', apiData.length);
		//console.log('makeGraphs():dataSet:', dataSet.length);
		if (!dataSet || dataSet.length == 0){
			//console.log("No data retrieved. Do nothing");
		}
		else {
			x = parseFloat(dataSet[0].x.replace(/["']/g, ""));
			y = parseFloat(dataSet[0].y.replace(/["']/g, ""));
		}
		
		if (!x) {
			x = 51.508;
		}
		if (!y){
			y = -0.11;
		}

		var map;
		if(typeMap != 'pop'){

			map = L.map(getElement("#mapId").val()).setView([x, y], 13);
		  console.log("typeMap is not a popUp")
		}else{
			//console.log('test');
			map = L.map('map').setView([x, y], 13);
			//console.log("typeMap is a popUp")
			//console.log("Height:"+window.innerHeight + " Width:"+ window.innerWidth)
			document.getElementById("map").style.height = window.innerHeight + "px";
			document.getElementById("map").style.width = window.innerWidth+ "px";
			map.invalidateSize();
		}
		
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaHpsdmFqIiwiYSI6ImNpajBlYjIyaTAwOGF1Mm00aW51ZzUyc28ifQ.psjgi9x-0WjaRrsRTnig7g', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(map);


		
		dataSet.forEach(function(d) {
			if (d.id){
				x = parseFloat(d.x.replace(/["']/g, ""));
				y = parseFloat(d.y.replace(/["']/g, ""));

				L.marker([x, y]).addTo(map)
				.bindPopup("<br />Cell ID:" + d.cell);
			}
		});
		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString() +"x="+x +", y="+y)
				.openOn(map);
		}
		map.on('click', onMapClick);
	}
});

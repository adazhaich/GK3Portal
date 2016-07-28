
$(document).ready(function(){
	//console.log('corporateSummary.js');	
	
//	var day = $("#day").val()  === undefined ? "" : $("#day").val();
//	corporateName = $("#corporateName").val()  === undefined ? "" : $("#corporateName").val();
//    start = $("#start").val()  === undefined ? "" : $("#start").val();
//    end = $("#end").val()  === undefined ? "" : $("#end").val();
	var day = getElement("#day").val() === undefined ? "" :  getElement("#day").val();
	corporateName = getElement("#corporateName").val() === undefined ? "" :  getElement("#corporateName").val();
    start = getElement("#start").val() === undefined ? "" :  getElement("#start").val();
    end = getElement("#end").val() === undefined ? "" :  getElement("#end").val() ;
    filterSql = getElement("#filterSql").val()  === undefined ? "" : getElement("#filterSql").val();
    CORPSUMM = {
    	filter : function(day, corporateName, start, end, filterSql){
    		var url = clientHTTPConfig.appContextRoot+"/dataaccess/corporatesummary";

   			var condition = "";
   			condition = concatParam(condition, "traffic_date", "=", "'" + day + "'");
   			condition = concatParam(condition, "corporate_name", "=", "'" + corporateName + "'");
   			condition = concatParam(condition, "traffic_date", ">=", "'" + start + "'");
   			condition = concatParam(condition, "traffic_date", "<=", "'" + end + "'");
    			
   			url += "?condition="+condition;
    			
   			if (filterSql){
   				url += "&filterSql="+filterSql;
   			}
   		    //console.log( "url=", url );
   		    $('#ajax_loader').show();
   			queue().defer(d3.json, url).await(this.makeGraphs);
    	},	
    	makeGraphs : function(error, apiData) {
    		//Start Transformations
    			var dataSet = apiData;
    			//console.log('corporateSummary.js:makeGraphs():apiData:', apiData.length);
    			//console.log('makeGraphs():dataSet:', dataSet.length);
    			if (!dataSet || dataSet.length == 0){
    				//console.log("No data retrieved. Do nothing");
    				$("#corporateSummary-datatable").dataTable().fnDestroy();
    			}
    			else {
					dataSet.forEach(function (d) {
						if (d.traffic_date) {
							d.traffic_date = new Date(d.traffic_date);
							d.traffic_date = d.traffic_date.getFullYear() + "-" + (d.traffic_date.getMonth() + 1) + "-" + d.traffic_date.getDate();
						}
						if (d.traffic_hour) {
							d.traffic_hour = d.traffic_hour * 1;
						}
					});

					//Create a Crossfilter instance
					var ndx = crossfilter(dataSet);

					//Define Dimensions
					var trafficDateDimension = ndx.dimension(function (d) {
						return d.traffic_date;
					});

					//Then bind the jquery data table:
					var datatable = $("#corporateSummary-datatable").dataTable({
						"bPaginate": true,
						"colReorder": true,
						"bLengthChange": true,
						"bFilter": true,
						"bSort": true,
						"bInfo": true,
						"bAutoWidth": true,
						"bDeferRender": true,
						"aaData": trafficDateDimension.top(Infinity),
						"bDestroy": true,
						"fnRowCallback": function (nRow, aData, iDisplayIndex) {
							$('td', nRow).attr('nowrap', 'nowrap');
							return nRow;
						},
						//"data": dataSet,
						"aoColumns": [
							//{"mData": "traffic_date", "sDefaultContent": "traffic_date "}
							//,
							{"mData": "corporate_id", "sDefaultContent": "corporate_id"}
							, {"mData": "corporate_name", "sDefaultContent": "corporate_name "}
							, {"mData": "detections", "sDefaultContent": "detections"}
						, {
								"mData": "insert_time", "sDefaultContent": "insert_time",
							"mRender": function (data, type, row) {
									return moment(data).format("YYYY-MM-DD hh:mm:ss");
								}
							}
						],
						"sDom": 'ZlfrBtip',
						"colResize": {
							"tableWidthFixed": false
						},
						buttons: [
							{
								extend: 'collection',
								text: 'Export',
								buttons: [{
									extend: 'copyHtml5',
									title: 'CorporateSummary'
								},
									{
										extend: 'csvHtml5',
										title: 'CorporateSummary'
									},
									{
										extend: 'excelHtml5',
										title: 'CorporateSummary'
									},
									{
										extend: 'pdfHtml5',
										title: 'CorporateSummary'
									}]
							}
						]
					});
				}
    			function RefreshTable() {
    			    dc.events.trigger(function () {
    			        alldata = trafficDateDimension.top(Infinity);
    			        datatable.fnClearTable();
    			        datatable.fnAddData(alldata);
    			        datatable.fnDraw();
    			    });
    			}

    			for (var i = 0; i < dc.chartRegistry.list().length; i++) {
    			    var chartI = dc.chartRegistry.list()[i];
    			    chartI.on("filtered", RefreshTable);
    			}
//    		    dc.renderAll();
    		    $('#ajax_loader').hide();	
    		}
    }
    
	getElement( "#refresh").on( "click", function() {
	    //console.log( "refresh button was clicked" );
//	    day = $("#day").val()  === undefined ? "" : $("#day").val();
//	    corporateName = $("#corporateName").val()  === undefined ? "" : $("#corporateName").val();
//	    start = $("#start").val()  === undefined ? "" : $("#start").val();
//	    end = $("#end").val()  === undefined ? "" : $("#end").val();
//	    filterSql = $("#filterSql").val()  === undefined ? "" : $("#filterSql").val();
	    day = getElement("#day").val() === undefined ? "" :  getElement("#day").val();
		corporateName = getElement("#corporateName").val() === undefined ? "" :  getElement("#corporateName").val();
	    start = getElement("#start").val() === undefined ? "" :  getElement("#start").val();
	    end = getElement("#end").val() === undefined ? "" :  getElement("#end").val() ;
	    filterSql = getElement("#filterSql").val()  === undefined ? "" : getElement("#filterSql").val();
	    //console.log( "day=", day, "corporateName=", corporateName,  "start=", start, "end=", end, "filterSql=", filterSql);
	    CORPSUMM.filter(day, corporateName,start, end, filterSql);
	});
    CORPSUMM.filter(day, corporateName, start, end, filterSql);	
	
});

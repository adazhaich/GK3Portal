$(document).ready(function() {
			//console.log('dailyFraudOtt.js');
			
			var day = getElement("#day").val() === undefined ? "" : getElement("#day").val() ;
			start = getElement("#start").val() === undefined ? "" : getElement("#start").val();
			end = getElement("#end").val() === undefined ? "" : getElement("#end").val();

			  Zoomerang.config({
				    maxHeight: 400,
				    maxWidth: 800
				}).listen('.zoom');
			  
			getElement( "#refresh").on(
					"click",
					function() {
						//console.log("button was clicked");
						day = getElement("#day").val() === undefined ? "" : getElement("#day").val() ;
						start = getElement("#start").val() === undefined ? "" : getElement("#start").val();
						end = getElement("#end").val() === undefined ? "" : getElement("#end").val();
						//console.log("day=", day,  "start=", start, "end=", end);
						DAILYFRAUDOTT.filter(day, start, end);
					});

			DAILYFRAUDOTT = {
				filter : function(day, start, end) {
					var url = clientHTTPConfig.appContextRoot+"/dataaccess/dailyfraudott";
					url += "?day=" + day.replaceAll("-","") + "&start="+start.replaceAll("-","") + "&end=" + end.replaceAll("-","");
					
					//console.log('dailyFraudOtt.js:day:', url);
					$('#ajax_loader').show();
					queue().defer(d3.json, url).await(this.makeGraphs);
				},
				
				makeGraphs : function(error, apiData) {
					////console.log('makeGraphs: error:', error, "apiData.length:", apiData.length);
					var dataSet = apiData;
					if (!dataSet || dataSet.length == 0) {
						//console.log("No data retrieved. Do nothing");
						getElement("#dailyFraudOtt-datatable").dataTable().fnClearTable();
    					dc.renderAll("dailyFraudOtt");
	    			 	$('#ajax_loader').hide();
	    			 	return;
					} 
					//console.log('makeGraphs():dataSet:', dataSet.length);
					
				//grid
					var datatable = $("#dailyFraudOtt-datatable").dataTable({
						"bPaginate" : true,
						"colReorder" : true,
						"bLengthChange" : true,
						"sScrollX" : "100%",
						"bFilter" : true,
						"bSort" : true,
						"bInfo" : true,
						"bAutoWidth" : false,
						"bDeferRender" : true,
						"bDestroy" : true,
						"data" : dataSet,
				        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
				            $('td', nRow).attr('nowrap','nowrap');
				            return nRow;
				         },
						"aoColumns" : [
						{
							"mData" : "traffic_date",
							"sDefaultContent" : "",
				        	"mRender": function ( data, type, row ) {
				        		return moment(data).format("YYYY-MM-DD hh:mm:ss");
				        	}		
						},
						{
							"mData" : "call_count",
							"sDefaultContent" : ""
						}, {
							"mData" : "detection_pct",
							"sDefaultContent" : ""
						}, {
							"mData" : "calling_service",
							"sDefaultContent" : ""
						}, {
							"mData" : "detection_count",
							"sDefaultContent" : ""
						}, {
							"mData" : "calling_country",
							"sDefaultContent" : ""
						} ],
						 "sDom": 'ZlfrBtip',
					        "colResize": {
					            "tableWidthFixed": true
					        },
						"oLanguage" : {
							"sEmptyTable" : "No Record"
						},
						buttons : [ {
							extend : 'collection',
							text : 'Export',
							buttons: [{
									extend:'copyHtml5',
									title:'DailyFraudOtt'
  							}, 
  							{
  								extend:'csvHtml5',
  								title:'DailyFraudOtt'
  							}, 
  							{
  								extend:'excelHtml5',
  								title:'DailyFraudOtt'
  							},
  							{
  								extend:'pdfHtml5',
  								title:'DailyFraudOtt'
  							}]
						} ]
					});

					function RefreshTable() {
						dc.events.trigger(function() {
							alldata = trafficDayDimension.top(Infinity);
							datatable.fnClearTable();
							datatable.fnAddData(alldata);
							datatable.fnDraw();
						});
					}

					for (var i = 0; i < dc.chartRegistry.list().length; i++) {
						var chartI = dc.chartRegistry.list()[i];
						chartI.on("filtered", RefreshTable);
					}
					dc.renderAll("dailyFraudOtt");

					$('#ajax_loader').hide();

				}
			}
			
			DAILYFRAUDOTT.filter(day, start, end);

		});

function popDect(data,day,type){
	//console.log("popDect(", data,day,type,")");
	var url = '/test/drilldown/detectiondetails?data='+data+'&day='+day+'&type='+type;
	window.open(
			url ,
			'_blank',
			'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}


	function RefreshTable() {
		dc.events.trigger(function() {
			alldata = trafficDayDimension.top(Infinity);
			datatable.fnClearTable();
			datatable.fnAddData(alldata);
			datatable.fnDraw();
		});
	}
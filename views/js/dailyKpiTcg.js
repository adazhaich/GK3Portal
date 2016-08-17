$(document).ready(function() {
			//console.log('dailyKpiTcg.js');
			
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
						DAILYKPITCG.filter(day, start, end);
					});

			DAILYKPITCG = {
				filter : function(day, start, end) {
					var url = clientHTTPConfig.appContextRoot+"/dataaccess/dailykpitcg";
					url += "?day=" + day.replaceAll("-","") + "&start="+start.replaceAll("-","") + "&end=" + end.replaceAll("-","");
					
					//console.log('dailyKpiTcg.js:day:', url);
					$('#ajax_loader').show();
					queue().defer(d3.json, url).await(this.makeGraphs);
				},
				
				makeGraphs : function(error, apiData) {
					////console.log('makeGraphs: error:', error, "apiData.length:", apiData.length);
					var dataSet = apiData;
					if (!dataSet || dataSet.length == 0) {
						//console.log("No data retrieved. Do nothing");
						getElement("#dailyKpiTcg-datatable").dataTable().fnClearTable();
    					dc.renderAll("dailyKpiTcg");
	    			 	$('#ajax_loader').hide();
	    			 	return;
					} 
					//console.log('makeGraphs():dataSet:', dataSet.length);
					
				//grid
					var datatable = $("#dailyKpiTcg-datatable").dataTable({
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
							"mData" : "call_count_all",
							"sDefaultContent" : ""
						}, {
							"mData" : "call_count_gsm",
							"sDefaultContent" : ""
						}, {
							"mData" : "call_count_voip",
							"sDefaultContent" : ""
						}, {
							"mData" : "call_count_ott",
							"sDefaultContent" : ""
						}, {
							"mData" : "detections_all",
							"sDefaultContent" : ""
						}, {
							"mData" : "detections_gsm",
							"sDefaultContent" : ""
						}, {
							"mData" : "detections_voip",
							"sDefaultContent" : ""
						} 
						, {
							"mData" : "detections_ott",
							"sDefaultContent" : ""
						} // Sims
						, {
							"mData" : "detections_pct_all",
							"sDefaultContent" : ""
						}, {
							"mData" : "dettections_pct_gsm",
							"sDefaultContent" : ""
						}, {
							"mData" : "detections_pct_voip",
							"sDefaultContent" : ""
						}, {
							"mData" : "detections_pct_ott",
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
									title:'DailyKpiTcg'
  							}, 
  							{
  								extend:'csvHtml5',
  								title:'DailyKpiTcg'
  							}, 
  							{
  								extend:'excelHtml5',
  								title:'DailyKpiTcg'
  							},
  							{
  								extend:'pdfHtml5',
  								title:'DailyKpiTcg'
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
					dc.renderAll("dailyKpiTcg");

					$('#ajax_loader').hide();

				}
			}
			
			DAILYKPITCG.filter(day, start, end);

		});

function popDect(data,day,type){
	//console.log("popDect(", data,day,type,")");
	var url = '/tunisiana/drilldown/detectiondetails?data='+data+'&day='+day+'&type='+type;
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
$(document).ready(
	function() {
		var subscriberName = getElement("#subscriberName").val() === undefined ? "" : getElement("#subscriberName").val();
			start = getElement("#start").val();
			end = getElement("#end").val();
			min = getElement("#min").val() === undefined ? "" : getElement("#min").val();
			max = getElement("#max").val() === undefined ? "" : getElement("#max").val();
			getElement("#refresh").on("click",function() {
				subscriberName = getElement("#subscriberName").val() === undefined ? "" : getElement("#subscriberName").val();
				min = getElement("#min").val() === undefined ? "" : getElement("#min").val();
				max = getElement("#max").val() === undefined ? "" : getElement("#max").val();
				start = getElement("#start").val();
				end = getElement("#end").val();
				SUBSCRSUM.filter(subscriberName,start, end, min,max);
			});

			SUBSCRSUM = {
				filter : function(subscriberName,  start, end, min,max) {
					var url = clientHTTPConfig.appContextRoot+"/dataaccess/subscribersummary";
					var condition = "";
					condition = concatParam(condition, "subscriber_name", "=", "'" + subscriberName + "'");
					condition = concatParam(condition, "detections", ">=", "'" + min + "'");
					condition = concatParam(condition, "detections", "<=", "'" + max + "'");
					condition = concatParam(condition, "insert_date_str", ">=", "'" + start + "'");
					condition = concatParam(condition, "insert_date_str", "<=", "'" + end + "'");
						
					url += "?condition="+condition;
				    //console.log( "url=", url );
				    $('#ajax_loader').show();
					queue().defer(d3.json, url).await(this.makeGraphs);
				},
				makeGraphs : function(error, apiData) {
					var dataSet = apiData;
					if (!dataSet || dataSet.length == 0){
						//console.log("No data retrieved. Do nothing");
					}
					
					var datatable = $("#subscribersummary-datatable").dataTable({
				        "bPaginate": true,
				        "colReorder": true,        
				        "bLengthChange": true,
//				        "sScrollX":"100%",
				        "bFilter": true,
				        "bSort": true,
				        "bInfo": true,
				        "bAutoWidth": true,
				        "bDeferRender": true,
				        "bDestroy": true,
						"lengthMenu": [[10, 25, -1], [10, 25, "All"]],
				        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
				            $('td', nRow).attr('nowrap','nowrap');
				            return nRow;
				         },
				        "data": dataSet,
				            "aoColumns": [
				             { "mData": "subscriber_id", "sDefaultContent": ""}
				            ,{ "mData": "subscriber_name", "sDefaultContent": "" }
				            ,{ "mData": "detections", "sDefaultContent": "" }
				            ,{ "mData": "traffic_date", "sDefaultContent": "" }
				            ,
								{

									"mData": "insert_time",
									"sDefaultContent": ""/*,
									"mRender": function (data, type, row) {

										return data.format("YYYY-MM-DD HH:mm:ss");
									}*/
								},

//				            ,{ "mData": "insert_date_epoch", "sDefaultContent": "" } //removed per Niranjan
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
	  										extend:'copyHtml5',
	  										title:'SubScriberSummary'
	  	    							}, 
	  	    							{
	  	    								extend:'csvHtml5',
	  	    								title:'SubScriberSummary'
	  	    							}, 
	  	    							{
	  	    								extend:'excelHtml5',
	  	    								title:'SubScriberSummary'
	  	    							}/*,
	  	    							{
	  	    								extend:'pdfHtml5',
	  	    								title:'SubScriberSummary'
	  	    							}*/]
				                  }
				              ]
					});	
					
					function RefreshTable() {
					    dc.events.trigger(function () {
					        alldata = callTimeDimension.top(Infinity);
					        datatable.fnClearTable();
					        datatable.fnAddData(alldata);
					        datatable.fnDraw();
					    });
					}

					for (var i = 0; i < dc.chartRegistry.list().length; i++) {
					    var chartI = dc.chartRegistry.list()[i];
					    chartI.on("filtered", RefreshTable);
					}	
//				    dc.renderAll();
				    $('#ajax_loader').hide();
				}
			}
			
			SUBSCRSUM.filter(subscriberName,start, end, min,max);

			
		});

$(document).ready(function(){
	//console.log('gsmfraud.js');	
	
	var day = getElement("#day").val()  === undefined ? "" : getElement("#day").val() ;
    
    GSMFRAUD = {
    		 filter : function(day){
    			var url = clientHTTPConfig.appContextRoot+"/dataaccess/gsmfraud";
    			var condition = "";
    			
    			url += "?condition="+condition;
    			
    		    //console.log( "filter url=", url );
    		    $('#ajax_loader').show();
    			queue().defer(d3.json, url).await(this.makeGraphs);
    		},
    		makeGraphs : function(error, apiData) {
    			var dataSet = apiData;
    			//console.log('makeGraphs():dataSet:', dataSet.length);
    			if (!dataSet || dataSet.length == 0){
    				//console.log("No data retrieved. Do nothing");
    				$("#gsmfraud-datatable").dataTable().fnClearTable();
    			 	$('#ajax_loader').hide();
    			 	return;
    			}
    			
    			var ndx = crossfilter(dataSet);
    			var callTimeDimension = ndx.dimension(function(d) { return d.call_time; });
    			var datatable = $("#gsmfraud-datatable").dataTable({
    		        "bPaginate": true,
    		        "colReorder": true,        
    		        "bLengthChange": true,
    		        "sScrollX":"100%",
    		        "bFilter": true,
    		        "bSort": true,
    		        "bInfo": true,
    		        "bAutoWidth": true,
    		        "bDeferRender": true,
    		        "aaData": callTimeDimension.top(Infinity),
    		        "bDestroy": true,
    		        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
    		            $('td', nRow).attr('nowrap','nowrap');
    		            return nRow;
    		         },
    		        "data": dataSet,
    		            "aoColumns": [
    		             { "mData": "traffic_date", "sDefaultContent": "",
    		            	 "mRender" : function(data, type, row) {
    		            		 return data;
    						}
    		             }
    		             ,{ "mData": "detection_pct", "sDefaultContent": ""}
    		            ,{ "mData": "detection_count", "sDefaultContent": "" }
    		            ,{ "mData": "insert_time", "sDefaultContent": "",
    		            	 "mRender" : function(data, type, row) {
    								return data;
    							}
    		            }
    		            ,{ "mData": "calling_country", "sDefaultContent": ""}          
    		            ,{ "mData": "calling_service", "sDefaultContent": ""} 
    		            ,{ "mData": "call_count", "sDefaultContent": ""}
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
										title:'GsmFraud'
	    							}, 
	    							{
	    								extend:'csvHtml5',
	    								title:'GsmFraud'
	    							}, 
	    							{
	    								extend:'excelHtml5',
	    								title:'GsmFraud'
	    							},
	    							{
	    								extend:'pdfHtml5',
	    								title:'GsmFraud'
	    							}]
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
//    		    dc.renderAll();
    		    $('#ajax_loader').hide();
    		}
    }
    
    getElement("#refresh").on( "click", function() {
	    day = getElement("#day").val()  === undefined ? "" : getElement("#day").val() ;
	    
	    GSMFRAUD.filter(day);
	});

		
    GSMFRAUD.filter(day);	
});	



		





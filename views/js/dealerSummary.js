$(document).ready(function(){
	
	dealerName = getElement("#dealerName").val() === undefined ? "" : getElement("#dealerName").val();
    start = getElement("#start").val();
    end = getElement("#end").val();
    DEALER = {
        	filter : function(dealerName, start, end){
        		var url = clientHTTPConfig.appContextRoot+"/dataaccess/dealersummary";
        		
        		var condition = "";
        		condition = concatParam(condition, "dealer_name", "=", "'" + dealerName + "'");
        		condition = concatParam(condition, "traffic_date", ">=", "'" + start + "'");
        		condition = concatParam(condition, "traffic_date", "<=", "'" + end + "'");
        	
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
        		
        		var ndx = crossfilter(dataSet);

        		var callTimeDimension = ndx.dimension(function(d) { return d.traffic_date; });
        	    
        		var datatable = $("#dealersummary-datatable").dataTable({
        	        "bPaginate": true,
        	        "colReorder": true,        
        	        "bLengthChange": true,
//        	        "sScrollX":"100%",
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
        	             { "mData": "dealer_id", "sDefaultContent": ""}
        	            ,{ "mData": "traffic_date", "sDefaultContent": "" }
        	            ,{ "mData": "dealer_name", "sDefaultContent": "" }
        	            ,{ "mData": "insert_time", "sDefaultContent": "",
							"mRender" : function(data, type, row) {
								return moment(data).format("YYYY-MM-DD hh:mm:ss");
							}
        	            }
        	            ,{ "mData": "detections", "sDefaultContent": "" }
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
										title:'DealerSummary'
	    							}, 
	    							{
	    								extend:'csvHtml5',
	    								title:'DealerSummary'
	    							}, 
	    							{
	    								extend:'excelHtml5',
	    								title:'DealerSummary'
	    							},
	    							{
	    								extend:'pdfHtml5',
	    								title:'DealerSummary'
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
//        	    dc.renderAll();
        	    $('#ajax_loader').hide();
        	}

        		
        }
    
    getElement("#refresh").on( "click", function() {
	    dealerName = getElement("#dealerName").val() === undefined ? "" : getElement("#dealerName").val();
//	    start = $("#start").val();
	    start = getElement("#start").val();
//	    end = $("#end").val();
	    end = getElement("#end").val();
	    //console.log("dealerSummary:"+start);
	    DEALER.filter(dealerName,start, end);
	});
    
	DEALER.filter(dealerName, start, end);	
});
   
     



	

	





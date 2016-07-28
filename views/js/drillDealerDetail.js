
$(document).ready(function(){
//	var day = $("#day").val();
	var dealerId = $('#dealerId').val();
	   
//	$( "#query").on( "click", function() {
//	    go(type,data,startDay,endDay)
//	});
	
function go(dealerId){
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/dealersummary";
	var condition = "";

	//hard coded
//	condition = concatParam(condition,"call_date_hour",">=","'" + "20160408" + "08'");
//	condition = concatParam(condition,"call_date_hour","<=","'" + "20160409" + "08'");
	condition = concatParam(condition,"dealer_id","=",dealerId);
	
	url += "?condition="+condition;
    //console.log( "url=", url );
//    
//    $('#ajax_loader').show();
	queue().defer(d3.json, url).await(loadData);
}	
	go(dealerId);
	
});


function loadData(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;
	if (!dataSet || dataSet.length == 0) {
		//console.log("No data retrieved. Do nothing");
		$("#dealerdetail-datatable").dataTable().fnClearTable();
		dc.renderAll();
	 	$('#ajax_loader').hide();
	} 
	var ndx = crossfilter(dataSet);
	//Define Dimensions
	var trafficDateDimension = ndx.dimension(function(d) { return d.traffic_date; });
	var trafficHourDimension = ndx.dimension(function(d) { return d.traffic_hour; });

	

	var datatable = $("#dealerdetail-datatable").dataTable({
        "bPaginate": true,
        "colReorder": true,    
        "sScrollX":"100%",
        "bLengthChange": true,
	    "iDisplayLength":25,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bDeferRender": true,
        "aaData": trafficDateDimension.top(Infinity),
        "bDestroy": true,
        "data": dataSet,
        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            $('td', nRow).attr('nowrap','nowrap');
            return nRow;
         },
        "aoColumns": [
             { "mData": "dealer_id", "sDefaultContent": ""}         
             ,{ "mData": "insert_date_str", "sDefaultContent": ""}
             ,{ "mData": "dealer_name", "sDefaultContent": ""}
            ,{ "mData": "insert_date_epoch", "sDefaultContent": ""}
            ,{ "mData": "detections", "sDefaultContent": " "}
        ],    
//        "sDom": 'ZlfrBtip',
//        "sDom" : '<"wrapper"flBtip>',
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
							title:'DrillDealerDetail'
						}, 
						{
							extend:'csvHtml5',
							title:'DrillDealerDetail'
						}, 
						{
							extend:'excelHtml5',
							title:'DrillDealerDetail'
						},
						{
							extend:'pdfHtml5',
							title:'DrillDealerDetail'
						}]
                  }
              ]
	});	
	
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
	
    dc.renderAll();
  $('#ajax_loader').hide();	
};

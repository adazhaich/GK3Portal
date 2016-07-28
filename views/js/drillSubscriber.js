
$(document).ready(function(){
//	var day = $("#day").val();
	var subId = $('#subId').val();
	   
//	$( "#query").on( "click", function() {
//	    go(type,data,startDay,endDay)
//	});
	
function go(subId){
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/subscribersummary";
	var condition = "";

	//hard coded
	condition = concatParam(condition,"subscriber_id","=",subId);
	
	url += "?condition="+condition;
    //console.log( "url=", url );
//    
//    $('#ajax_loader').show();
	queue().defer(d3.json, url).await(loadData);
}	
	go(subId);
	
});


function loadData(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;
	if (!dataSet || dataSet.length == 0) {
		//console.log("No data retrieved. Do nothing");
		$("#drillsubscriber-datatable").dataTable().fnClearTable();
		dc.renderAll();
	 	$('#ajax_loader').hide();
		return;
	} 
	var ndx = crossfilter(dataSet);
	//Define Dimensions
	var trafficDateDimension = ndx.dimension(function(d) { return d.traffic_date; });
	var trafficHourDimension = ndx.dimension(function(d) { return d.traffic_hour; });

	

	var datatable = $("#drillsubscriber-datatable").dataTable({
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
			{ "mData": "subscriber_id", "sDefaultContent": ""}
			,{ "mData": "subscriber_name", "sDefaultContent": "" }
			,{ "mData": "detections", "sDefaultContent": "" }
			,{ "mData": "insert_date_str", "sDefaultContent": "" }
			,{ "mData": "insert_date_epoch", "sDefaultContent": "" }
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
							title:'DrillSubscriber'
						}, 
						{
							extend:'csvHtml5',
							title:'DrillSubscriber'
						}, 
						{
							extend:'excelHtml5',
							title:'DrillSubscriber'
						},
						{
							extend:'pdfHtml5',
							title:'DrillSubscriber'
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

/*

$(document).ready(function(){
	//console.log('hourlyFraud2.js');	
	
	var day = $("#day").val();
    hour = $("#hour").val();
    start = $("#start").val();
    end = $("#end").val();
    filterSql = $("#filterSql").val();
    //console.log( "first load day=", day, "hour=", hour,  "start=", start, "end=", end, "filterSql=", filterSql);
    
	$( "#refresh").on( "click", function() {
	    //console.log( "refresh button was clicked" );
	    day = $("#day").val();
	    hour = $("#hour").val();
	    start = $("#start").val();
	    end = $("#end").val();
	    filterSql = $("#filterSql").val();
	    //console.log( "day=", day, "hour=", hour,  "start=", start, "end=", end, "filterSql=", filterSql);
	    //filter(day, hour,start, end, filterSql);
	    datatable.fnClearTable();
	    datatable.fnDraw();
	});
	
	var datatable = $('#hourlyFraud-datatable').dataTable( {
		"bPaginate": true,
        "colReorder": true,    
        "sScrollX":"100%",
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bDeferRender": true,
        "bDestroy": true,
        "processing": true,
        "serverSide": true,
        /!*
        "ajax" : {
            url: '/dataaccess/hourlyfraud2',
        },*!/
        "sAjaxSource" : '/dataaccess/hourlyfraud2',
        "fnServerParams": function (aoData) {  
            aoData.push({"name": "day", "value": $("#day").val()});  
        },  
        "aacolumns": [
                      
                      { "mData": "traffic_date_hour", "sDefaultContent": "traffic_date_hour"}
                      ,{ "mData": "traffic_date_hour", "sDefaultContent": "traffic_date_hour"}
                      ,{ "mData": "s_msisdn", "sDefaultContent": "s_msisdn"}          
                      ,{ "mData": "s_imsi", "sDefaultContent": "s_imsi"} 
                      ,{ "mData": "cell_id", "sDefaultContent": "cell_id"}
                      ,{ "mData": "lac", "sDefaultContent": "lac"}
                      ,{ "mData": "s_imei", "sDefaultContent": "s_imei"}
                      ,{ "data": "vendor", "defaultContent": ""}
                      ,{ "mData": "model", "sDefaultContent": ""}            
                      ,{ "mData": "sum_out_duration", "sDefaultContent": "sum_out_duration " }
                      ,{ "mData": "sum_out_unit", "sDefaultContent": "sum_out_unit"}
                      ,{ "mData": "avg_duration", "sDefaultContent": "avg_duration"}
                      ,{ "mData": "illegalodds", "sDefaultContent": "illegalodds"}
                      ,{ "mData": "illegal_odds_ad", "sDefaultContent": "illegal_odds_ad"}
                      ,{ "mData": "illegal_odds7_ad", "sDefaultContent": "illegal_odds7_ad"}
                      ,{ "mData": "domestic_out", "sDefaultContent": "domestic_out"}            
                      ,{ "mData": "international_out", "sDefaultContent": "international_out" }
                  ],    
                  "sDom": '<"wrapper"flBtip>',
                  buttons: [
          				  {
                                extend: 'collection',
                                text: 'Export',
                                buttons: [
                                    'copy',
                                    'excel',
                                    'csv',
                                    'pdf'
                                ]
                            }
                        ]
    } );
	
	//datatable.fnDraw();
})*/

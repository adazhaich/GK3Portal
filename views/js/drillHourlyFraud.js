
$(document).ready(function(){
	//console.log('hourlyFraud.js');
	//alert('Inside drillHourlyFraud.js');
	var data = $('#data').val();
	var start = $('#start').val();
	var end = $('#end').val();
//	$("#start").val(moment(moment(start, "YYYYMMDDHH").subtract(24,'hours')).format("YYYY-MM-DD HH"));
//	$("#end").val(moment(moment(end, "YYYYMMDDHH")).format("YYYY-MM-DD HH"));
function filter (data){
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/hourlyfraud";

    var condition = "";
    if (start != undefined && start != ""){
		startTime = moment(start).format("YYYYMMDDHH");
		 condition = concatParam(condition, "traffic_date_hour", ">=", "'" +startTime +"'" );
	}
	if (end != undefined && end != ""){
		endTime = moment(end).format("YYYYMMDDHH");
		condition = concatParam(condition, "traffic_date_hour", "<=", "'" +endTime +"'");
	}
    condition = concatParam(condition, "cell_id", "=", data);
	url += "?condition="+condition;

    $('#ajax_loader').show();
	queue()
	    .defer(d3.json, url)
	    .await(makeGraphs);
//    $('#ajax_loader').hide();	
}	
	filter(data);	



function makeGraphs(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;
	//console.log('hourlyFraud.js:makeGraphs():apiData:', apiData.length);
	//console.log('makeGraphs():dataSet:', dataSet.length);

	if (!dataSet || dataSet.length == 0){
		//console.log("No data retrieved. Do nothing");
		$("#hourlyFraud-datatable").dataTable().fnClearTable();
//		dc.filterAll();
		dc.renderAll();
		return;
	}


	dataSet.forEach(function(d) {
		var date;
		var year, month, day, dateStr, hour;
		if (d.traffic_date_hour){
			year  = d.traffic_date_hour.substring(0, 4);
			month = d.traffic_date_hour.substring(4, 6);
			day = d.traffic_date_hour.substring(6, 8);			
			dateStr = d.traffic_date_hour.substring(0, 8);
			hour = d.traffic_date_hour.substring(8, 10);
			d.traffic_date =dateStr ;
			d.traffic_date_str =year+"-"+month+"-"+day ;
			d.traffic_hour = hour*1; 
		}

	});



	var ndx = crossfilter(dataSet);
	//Define Dimensions
	var trafficDateDimension = ndx.dimension(function(d) { return d.traffic_date; });
	

	var all = ndx.groupAll();

	var datatable = $("#hourlyfraud-datatable").dataTable({
        "bPaginate": true,
        "colReorder": true,    
        "sScrollX":"100%",
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
		"order": [[ 1, "desc" ]], //traffic_hour        
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
            { "mData": "traffic_date_str", "sDefaultContent": "traffic_date"}
            ,{ "mData": "traffic_hour", "sDefaultContent": "traffic_hour " }
            ,{ "mData": "s_msisdn", "sDefaultContent": "s_msisdn",
            	"mRender":function(data,type,row){
            		return "<a href='javascript:void(0);' onclick=\"popWnd(" + data+ ","+row.traffic_date+","+row.traffic_hour+",'MSISDN');\" class='colLnk'>" + data + '</a>';
					//return "<a href='javascript:void(0);' onclick=\"HOURLYFRAUDPOP.popWnd(" + data+ ","+row.traffic_date+","+row.traffic_hour+",'IMSI');\" class='colLnk'>" + data + '</a>';

				}
            }          
            ,{ "mData": "s_imsi", "sDefaultContent": "s_imsi",
            	"mRender":function(data,type,row){
            		return "<a href='javascript:void(0);' onclick=\"popWnd(" + data+ ","+row.traffic_date+","+row.traffic_hour+",'IMSI');\" class='colLnk'>" + data + '</a>';
            	}
            } 
            ,{ "mData": "cell_id", "sDefaultContent": "cell_id",
            	"mRender":function(data,type,row){
            		return '<a class="colLnk" onclick="popMap('+data+','+row.s_imsi+','+row.s_msisdn+')">'+data+'</a>';
            	}
            }
            ,{ "mData": "lac", "sDefaultContent": "lac"}
            ,{ "mData": "s_imei", "sDefaultContent": "s_imei"}
            ,{ "data": "vendor", "defaultContent": ""}
            ,{ "mData": "model", "sDefaultContent": ""}            
            ,{ "mData": "illegalodds", "sDefaultContent": "illegalodds"}
            ,{ "mData": "illegal_odds_ad", "sDefaultContent": "illegal_odds_ad"}
            ,{ "mData": "illegal_odds7_ad", "sDefaultContent": "illegal_odds7_ad"} //this is not needed as it is the same as illegalodds 

            ,{ "mData": "num_out", "sDefaultContent": "num_out"} //Calls Out 

            ,{ "mData": "num_out_ad", "sDefaultContent": "num_out_ad"} // maps to B Count
            ,{ "mData": "num_distinct_b", "sDefaultContent": "num_distinct_b"} 
            ,{ "mData": "ratio", "sDefaultContent": "ratio"}
//            ,{ "mData": "num_out_ad", "sDefaultContent": "num_out_ad"}    
            ,{ "mData": "ratio2", "sDefaultContent": "ratio2"}
 
            ,{ "mData": "avg_duration", "sDefaultContent": "avg_duration"}
            ,{ "mData": "off_peak_ratio", "sDefaultContent": "off_peak_ratio",
            	"mRender": function ( data, type, row ) {
            		return data*100 + '%';
            	}		
            }
            ,{ "mData": "bursting", "sDefaultContent": "bursting"}
            ,{ "mData": "cells", "sDefaultContent": "cells"}
            ,{ "mData": "num_in", "sDefaultContent": "num_in"}
            ,{ "mData": "sms_out", "sDefaultContent": "sms_out"}
            ,{ "mData": "sms_out_ig", "sDefaultContent": "sms_out_ig"}
            ,{ "mData": "sms_in", "sDefaultContent": "sms_in"}
            ,{ "mData": "audit", "sDefaultContent": "audit"}       
            ,{ "mData": "sum_out_duration", "sDefaultContent": "sum_out_duration " } //Duration on UI    
            ,{ "mData": "sum_out_unit", "sDefaultContent": "sum_out_unit"}
            ,{ "mData": "sum_out_loss", "sDefaultContent": "sum_out_loss"}
            ,{ "mData": "sum_in_duration", "sDefaultContent": "sum_in_duration " } 
            ,{ "mData": "sum_in_unit", "sDefaultContent": "sum_in_unit"}
            ,{ "mData": "avg_in_duration_unit", "sDefaultContent": "avg_in_duration_unit"}
            ,{ "mData": "identified_date", "sDefaultContent": ""}
            ,{ "mData": "trunk_in", "sDefaultContent": "trunk_in"}           
            ,{ "mData": "trunk_out", "sDefaultContent": "trunk_out"}
           
            ,{ "mData": "domestic_out", "sDefaultContent": "domestic_out"}            
            ,{ "mData": "international_out", "sDefaultContent": "international_out" }
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
							title:'DrillHourlyFraud'
						}, 
						{
							extend:'csvHtml5',
							title:'DrillHourlyFraud'
						}, 
						{
							extend:'excelHtml5',
							title:'DrillHourlyFraud'
						},
						{
							extend:'pdfHtml5',
							title:'DrillHourlyFraud'
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

});

function popWnd(data,day,hour,type){
	var url = clientHTTPConfig.appContextRoot+'/drilldown/callsnodup?data='+data+'&day='+day+'&hour='+hour+'&type='+type;
	window.open(
		url ,
		'_blank',
		'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}

function popMap(cellId,imsi,msisdn){

	var url = clientHTTPConfig.appContextRoot+'/map?cellId='+cellId+'&imsi='+imsi+'&msisdn='+msisdn;
	window.open(
		url ,
		'_blank',
		'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}

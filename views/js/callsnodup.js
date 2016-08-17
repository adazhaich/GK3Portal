
$(document).ready(function(){
//	var day = $("#day").val();
	var type = $('#type').val();
	var data = $('#data').val();
	var hour = $('#hour').val();
	hour = ('0' + hour).slice(-2);
	var queryday = $('#queryday').val()+" "+hour;
	var rangeHour  = $('#defaultRangeHour').val()
	 $("#startDate").val(dateAddOrSub('h','-',rangeHour,queryday,'yyyyMMdd hh'));
	 $("#endDate").val(queryday);
	 var startDay = $("#startDate").val();
	var endDay = $("#endDate").val();

	//console.log (startDay);
	//console.log(endDay);
	$( "#query").on( "click", function() {
		var type = $('#type').val();
		var data = $('#data').val();
		var startDay = $("#startDate").val();
		var endDay = $("#endDate").val();
	    go(type,data,startDay,endDay)
	});
	
function go(type,data,startDay,endDay){
	var url = "/tunisiana/dataaccess/callsnodup";
	var condition = "";
	if(type == "MSISDN"){
		condition = concatParam(condition, "msisdn", "=",  data);
	}else if(type="IMSI"){
		condition = concatParam(condition, "simsi", "=", data);
	}else if(tyep="CELL"){
	 	condition = concatParam(condition, "s_ci", "=", data);
	}
	//hard coded
//	condition = concatParam(condition,"call_date_hour",">=","'" + "20160408" + "08'");
//	condition = concatParam(condition,"call_date_hour","<=","'" + "20160409" + "08'");
//	condition = concatParamOther(condition,"call_date_hour_min","=","'" + startDay.replace(/\s+/g,""))+"'";
//	condition = concatParamOther(condition,"call_date_hour_max","=","'" + endDay.replace(/\s+/g,"")+"'");
	
	url += "?condition="+condition+"&callDateHourMin="+startDay.replace(/\s+/g,"")+"&callDateHourMax="+endDay.replace(/\s+/g,"");

	// <a href="javascript:void(0);" onclick="DETECTIONPOP.popWnd(21628609265,'1468469167000','MSISDN');" class="colLnk">21628609265</a>
	//<a href="javascript:void(0);" onclick="DETECTIONPOP.popWnd(605030902577368,2016-07-14 12:06:06,'IMSI');" class="colLnk">605030902577368</a>
	//2016-07-18T17:11:56.060Z - debug: callsnodup url= http://10.212.2.143:8080/callsnodup?call_date_hour_min=2016071319&call_date_hour_max=2016071400&simsi=605030902465876
	//2016-07-18T17:12:03.965Z - debug: Data Access Success from http://10.212.2.143:8080/callsnodup?call_date_hour_min=2016071319&call_date_hour_max=2016071400&simsi=605030902465876
    //console.log( "url=", url );
//    
    $('#ajax_loader').show();
	queue().defer(d3.json, url).await(loadData);
}	
	go(type,data,startDay,endDay);
	
});

function popMap(cellId,imsi,msisdn){
	//var url = clientHTTPConfig.appContextRoot +'/map?cellId='+cellId+'&imsi='+imsi+'&msisdn='+msisdn;
	var url = clientHTTPConfig.appContextRoot + '/map?cellId=' + cellId;//Updated similar to drillDetectionDetails.js
	window.open(
			url ,
			'_blank',
			'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}




function loadData(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;

//	if (!dataSet || dataSet.length == 0){
//		//console.log("No data retrieved. Do nothing");
//		$("#callsnodup-datatable").dataTable().fnDestroy();
//		return;
//	}
	
//
//	dataSet.forEach(function(d) {
//		
//	});



	var ndx = crossfilter(dataSet);
	//Define Dimensions
	var trafficDateDimension = ndx.dimension(function(d) { return d.traffic_date; });
	var trafficHourDimension = ndx.dimension(function(d) { return d.traffic_hour; });

	

	var datatable = $("#callsnodup-datatable").dataTable({
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
             { "mData": "call_start_time", "sDefaultContent": ""}         
             ,{ "mData": "s_msisdn", "sDefaultContent": ""}
             ,{ "mData": "o_msisdn", "sDefaultContent": ""}
           /* ,{ "mData": "sw_id", "sDefaultContent": ""}
            ,{ "mData": "call_id", "sDefaultContent": " "}*/
            ,{ "mData": "call_type", "sDefaultContent": "traffic_date",
            	"mRender":function(data,type,row){
            		var ci = row.charge_indicator;
            		if(data == 1 || data == 2){
            			return "voice";
            		}else if(data == 30 || data == 31){
            			return "SMS";
            		}else if(data == 29 && (ci == 0 || ci == 6 || ci == 7)){
            			return "voice(fwd)";
            		}else{
            			return data;
            		}
            	}
            }
/*           ,{ "mData": "call_end_time", "sDefaultContent": ""}*/
            ,{ "mData": "duration", "sDefaultContent": "" }
            ,{ "mData": "s_imsi", "sDefaultContent": "",}
            ,{ "mData": "s_imei", "sDefaultContent": ""}
            ,{ "mData": "s_ci", "sDefaultContent": " ",
				"mRender": function (data, type, row) {
					return "<a href='javascript:void(0);' onclick=\"popMap(" + data + ",'CELL');\" class='colLnk'>" + data + '</a>'; //COPIED FROM DETECTIONDETAILS.JS===============
				}
            }
            ,{ "mData": "s_lac", "sDefaultContent": "" }
  /*          ,{ "mData": "term_cause", "sDefaultContent": ""}
            ,{ "mData": "term_reason", "sDefaultContent": " " }
            ,{ "mData": "ss_code", "sDefaultContent": ""}*/
            ,{ "mData": "trunk_in", "sDefaultContent": ""}
            ,{ "mData": "trunk_out", "sDefaultContent": "" }
            // ,{ "mData": "call_date_hour", "sDefaultContent": " " }
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
									title:'CallsNodup'
	    						}, 
	    			            {
	 								extend:'csvHtml5',
	  								title:'CallsNodup'
	    			            }, 
	    			            {
	    							extend:'excelHtml5',
	   								title:'CallsNodup'
					            },
	 				            {
	   				            	extend:'pdfHtml5',
	    			            	title:'CallsNodup'
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

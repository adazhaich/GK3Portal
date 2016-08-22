
$(document).ready(function(){
	
	var type = $('#type').val();
	var data = $('#data').val();

	/*
	 // if(type == "A_MSISDN"){
	 //    condition = concatParam(condition, "msisdn", "=",  data);

	 var condition = "";
	 condition = concatParamOther(condition, "action", "=", "drillHotBNumber");
	 //Data Access Success from http://10.212.2.143:8080/hotbnumber?limit=-1
	 if(day != '')
	 condition = concatParam(condition, "call_date", "=", "'" + moment(day).format("YYYYMMDD") + "'");

	 // var url = clientHTTPConfig.appContextRoot+'/drilldown/callsnodup?data='+data+'&day='+date+'&hour='+hour+'&type='+type;*/

	function filter (data,type){
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/hotbnumber";
		var condition = "";

		condition = concatParamOther(condition, "action", "=", "drillHotBNumber");

		if(type=="A_MSISDN"){
			condition = concatParamOther(condition, "type", "=", "A_MSISDN");
			condition = concatParamOther(condition, "data", "=", +data);
		}else if(type=="B_MSISDN"){
			condition = concatParamOther(condition, "type", "=", "B_MSISDN");
			condition = concatParamOther(condition, "data", "=", +data);
		}else if(type=="CELL_ID"){
			condition = concatParamOther(condition, "type", "=", "CELL_ID");
			condition = concatParamOther(condition, "data", "=", +data);
		}

			//url += "?condition="+condition;
			url += "?" + condition;

	    $('#ajax_loader').show();

		queue()
		    .defer(d3.json, url)
		    .await(makeGraphs);
	}	
	filter(data,type);	
});	
	function popMap(cellId){
		var url = clientHTTPConfig.appContextRoot+'/map?cellId='+cellId;
		window.open(
				url ,
				'_blank',
				'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
	}

	function makeGraphs(error, apiData) {
		var dataSet = apiData;
		//console.log('makeGraphs():dataSet:', dataSet.length);
		if (!dataSet || dataSet.length == 0){
			//console.log("No data retrieved. Do nothing");
			$("#hotbnumber-datatable").dataTable().fnClearTable();
			dc.renderAll();
		}
		
		var ndx = crossfilter(dataSet);
		var callTimeDimension = ndx.dimension(function(d) { return d.call_time; });
		var datatable = $("#hotbnumber-datatable").dataTable({
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
	             { "mData": "call_date", "sDefaultContent": "",
	            	 "mRender" : function(data, type, row) {
						// data is bigint
//						return transferUnixTime(data);
	            		 //call_date now is 20160227 -- use Moment.js library
	            		 var day = moment(data, "YYYYMMDD");
	            		 return day.format("YYYY-MM-DD");
					}
	             }
	             ,{ "mData": "a_msisdn", "sDefaultContent": ""
	             }
	            ,{ "mData": "b_msisdn", "sDefaultContent": "" 
	            }
	            ,{ "mData": "call_time", "sDefaultContent": "",
	            	 "mRender" : function(data, type, row) {
							// data is bigint
							return transferUnixTime(data);
						}
	            }
	            ,{ "mData": "duration", "sDefaultContent": ""}          
	            ,{ "mData": "cell_id", "sDefaultContent": "",
	            	"mRender":function(data,type,row){
	            		return '<a class="colLnk" onclick="popMap('+data+')">'+data+'</a>';
	            	}
	            } 
	            ,{ "mData": "lac", "sDefaultContent": ""}
	            ,{ "mData": "imei", "sDefaultContent": ""}
	            ,{ "mData": "source", "sDefaultContent": ""}
	            ,{ "mData": "insert_time", "sDefaultContent": "",
	            	 "mRender" : function(data, type, row) {
							// data is bigint
							return transferUnixTime(data);
						}
	            }            
	            ,{ "mData": "update_time", "sDefaultContent": "",
	            	 "mRender" : function(data, type, row) {
							// data is bigint
							return transferUnixTime(data);
						}
	            }
	        ],    
//	        "sDom": '<"wrapper"flBtip>',
	        "sDom": 'ZlfrBtip',
	        "colResize": {
	            "tableWidthFixed": false
	        },
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
	    dc.renderAll();
	    $('#ajax_loader').hide();
	};	


function popMap(cellId,imsi,msisdn){
	var url = clientHTTPConfig.appContextRoot+'/map?cellId='+cellId+'&imsi='+imsi+'&msisdn='+msisdn;
	window.open(
			url ,
			'_blank',
			'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}

function makeGraphs(error, apiData) {
	var dataSet = apiData;
	//console.log('makeGraphs():dataSet:', dataSet.length);
	if (!dataSet || dataSet.length == 0){
		//console.log("No data retrieved. Do nothing");
		$("#hotbnumber-datatable").dataTable().fnClearTable();
		dc.renderAll();
	}

	dataSet.forEach(function (d) {
		if (d.call_time) {
			//Phoenix: call_time is already time
			d.call_time = moment(d.call_time, "YYYY-MM-DD HH:mm:ss");
		}
		if (d.insert_time) {
			d.insert_time = moment(d.insert_time, "YYYY-MM-DD HH:mm:ss");  // "2016-07-13 15:17:38.46",

		}

		if (d.update_time) {
			d.update_time = moment(d.update_time, "YYYY-MM-DD HH:mm:ss");  // "2016-07-13 15:17:38.46",

		}

	});


	var ndx = crossfilter(dataSet);
	var callTimeDimension = ndx.dimension(function(d) { return d.call_time; });
	var datatable = $("#hotbnumber-datatable").dataTable({
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
             { "mData": "call_date", "sDefaultContent": "",
            	 "mRender" : function(data, type, row) {
            		 var day = moment(data, "YYYYMMDD");
            		 return day.format("YYYY-MM-DD");
				}
             }
             ,{ "mData": "a_msisdn", "sDefaultContent": ""
             }
            ,{ "mData": "b_msisdn", "sDefaultContent": "" 
            }
            ,{ "mData": "call_time",
					"sDefaultContent": "",
            	 "mRender" : function(data, type, row) {	return data.format("YYYY-MM-DD HH:mm:ss");
					}


            }
            ,{ "mData": "duration", "sDefaultContent": ""}          
            ,{ "mData": "cell_id", "sDefaultContent": "",
            	"mRender":function(data,type,row){
            		return '<a class="colLnk" onclick="popMap('+data+','+row.a_msisdn+','+row.b_msisdn+')">'+data+'</a>';
            	}
            } 
            ,{ "mData": "lac", "sDefaultContent": ""}
            ,{ "mData": "imei", "sDefaultContent": ""}
            ,{ "mData": "source", "sDefaultContent": ""}
            ,{ "mData": "insert_time", "sDefaultContent": "",
            	 "mRender" : function(data, type, row) {
					return data.format("YYYY-MM-DD HH:mm:ss");
					}
            }            
            ,{ "mData": "update_time", "sDefaultContent": "",
            	 "mRender" : function(data, type, row) {
					 return data.format("YYYY-MM-DD HH:mm:ss");
					}
            }
        ],    
//        "sDom": '<"wrapper"flBtip>',
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
							title:'DrillHotBNumber'
						}, 
						{
							extend:'csvHtml5',
							title:'DrillHotBNumber'
						}, 
						{
							extend:'excelHtml5',
							title:'DrillHotBNumber'
						},
						{
							extend:'pdfHtml5',
							title:'DrillHotBNumber'
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
    dc.renderAll();
    $('#ajax_loader').hide();
};	




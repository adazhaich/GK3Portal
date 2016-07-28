
$(document).ready(function(){
	
	var type = $('#type').val();
	var data = $('#data').val();

	function filter (data,type){
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/hotbnumber";
		var condition = "";
		if(type=="A_MSISDN"){
			condition = concatParam(condition, "a_msisdn", "=", data);
		}else if(type=="B_MSISDN"){
			condition = concatParam(condition, "b_msisdn", "=", data);
		}else if(type=="CELL"){
			condition = concatParam(condition, "cell_id", "=", data);
		}
		url += "?condition="+condition;
		
	    //console.log( "filter url=", url );
	    $('#ajax_loader').show();
	//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
	//    //console.log( "url=", url );
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
//					return transferUnixTime(data);
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
            		return '<a class="colLnk" onclick="popMap('+data+','+row.a_msisdn+','+row.b_msisdn+')">'+data+'</a>';
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




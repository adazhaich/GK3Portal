
$(document).ready(function(){
	//console.log('dailyKpi.js');	
	
	var day = $("#day").val();
    hour = $("#hour").val();
    start = $("#start").val();
    end = $("#end").val();
    filterSql = $("#filterSql").val()  === undefined ? "" : $("#filterSql").val();
    
	$( "#refresh").on( "click", function() {
	    //console.log( "button was clicked" );
	    day = $("#day").val();
	    hour = $("#hour").val();
	    start = $("#start").val();
	    end = $("#end").val();
	    //console.log( "day=", day, "hour=",  "start=", start, "end=", end);
	    filter(day, hour,start, end);
	});

function filter (day, hour, start, end){
	var url = clientHTTPConfig.appContextRoot+"/dataaccess/dailykpi";
	
	var condition = "";
	condition = concatParam(condition, "traffic_date", "=",  day.replace(/-/g,"") );
	condition = concatParam(condition, "traffic_date", ">=", start.replace(/-/g,"") );
	condition = concatParam(condition, "traffic_date", "<=", end.replace(/-/g,"") );
	
	if (filterSql != ""){
		if(condition == "")
			condition += filterSql.replace(" and", "");
		else condition += filterSql;
	}
	url += "?condition="+condition;
	
    //console.log( "filter url=", url );

	queue()
	    .defer(d3.json, url)
	    .await(makeGraphs);
}	
	filter(day, hour, start, end);	
	

	function makeGraphs(error, apiData) {
		var dataSet = apiData;
		if (!dataSet || dataSet.length == 0){
			//console.log("No data retrieved. Do nothing");
			$( "#table_title" ).html( "Daily KPI Report - No Data" );
			$("#dailyKpi-datatable").dataTable().fnDestroy();
			//return;
		}
		//console.log('makeGraphs():dataSet:', dataSet.length);

		dataSet.forEach(function(d) {
			if (d.traffic_date){
				d.traffic_date = transferFormatTime(d.traffic_date);
				d.traffic_date_string = transferDateString(d.traffic_date);
			}
			if (d.update_time){ //update based on final hive table structure
				//d.update_time = new Date(d.update_time);
				d.update_time = transferUnixTime(d.update_time);
			}	
		});
		var ndx = crossfilter(dataSet);
		var callTimeDimension = ndx.dimension(function(d) { return d.update_time; });
		
	    
		var datatable = $("#dailyKpi-datatable").dataTable({
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
	        "data": dataSet,
            "aoColumns": [
             { "mData" : "traffic_date",
     			"sDefaultContent" : "",
            	"mRender": function ( data, type, row ) {
            		var date = data;	       //  data is already a date   
            		return transferDateString(data);
//            		return date.toISOString();
            	}		
    		}
    		/*
    		 * TODO: will use report_type to differentiate among Reports: ONSITE, OFF-SITE and CORPORATE
    		 * ,{ "mData": "report_type", "sDefaultContent": "" }
    		 */, {
    			"mData" : "gk_new_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "gkc_new_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "tcg_new_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "other_tcg_new_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "other_fms_new_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "total_new_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "total_balance_remaining",
    			"sDefaultContent" : "tbr"
    		} 
    		, {
    			"mData" : "fraud_activity_count",
    			"sDefaultContent" : ""
    		} // Sims
    		, {
    			"mData" : "fraud_activity_mou_before",
    			"sDefaultContent" : "fraud_activity_mou_before"
    		}, {
    			"mData" : "fraud_activity_mou_after",
    			"sDefaultContent" : "fraud_activity_mou_after"
    		}, {
    			"mData" : "fraud_activity_mou_total",
    			"sDefaultContent" : "fraud_activity_mou_total"
    		}, {
    			"mData" : "fraud_activity_total_loss",
    			"sDefaultContent" : "fraud_activity_mou_total"
    		} // total
    		, {
    			"mData" : "median_mou_before_gk",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_before_gkc",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_before_tcg",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_before_other_tcg",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_before_other_fms",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_before_total",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_after_gk",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_after_gkc",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_after_tcg",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_after_other_tcg",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_after_other_fms",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_mou_after_total",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_loss_before",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_loss_after",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "median_loss_total",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "remaining_balance",
    			"sDefaultContent" : ""
    		} // "Remaining Balance" under Median Loss
    		, {
    			"mData" : "false_positive_gk_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "false_positive_gk_percentage",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "false_positive_gkc_count",
    			"sDefaultContent" : ""
    		}, {
    			"mData" : "false_positive_gkc_percentage",
    			"sDefaultContent" : ""    
    		}],    
	        "sDom": '<"wrapper"flBtip>',
	        "oLanguage": {
	            "sEmptyTable":     "No Record"
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
	};	
});






$(document).ready(function(){
	//console.log('hourlyFraud.js');
	$( window ).resize(function() {
		  //console.log( "resizing" );
		  dc.renderAll("hourlyfraud");
		});
	
	$(".form_datetime").datetimepicker({
		format: "yyyy-mm-dd hh", //24h format
        minView:'day',//need to mark 'day' in order to show hour? 
        pickTime: true,
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left"
	 });
	
   var start = getElement("#start").val() === undefined ? "" : getElement("#start").val() ;
   var  end = getElement("#end").val() === undefined ? "" : getElement("#end").val() ;
    filterSql = getElement("#filterSql").val();

    Zoomerang.config({
	    maxHeight: 400,
	    maxWidth: 800
	}).listen('.zoom');
    
    HOURLYFRAUD = {
    		filter : function(start, end, filterSql){
    			var url = clientHTTPConfig.appContextRoot+"/dataaccess/hourlyfraud";
    			var startTime, endTime;
    			 var condition = "";
    			if (start != undefined && start != ""){
    				startTime = moment(start).format("YYYYMMDDHH");
    				 condition = concatParam(condition, "traffic_date_hour", ">=", "'" +startTime +"'" );
    			}
    			if (end != undefined && end != ""){
    				endTime = moment(end).format("YYYYMMDDHH");
    				condition = concatParam(condition, "traffic_date_hour", "<=", "'" +endTime +"'");
    			}
    			if (filterSql != ""){
    				if(condition == "")
    					condition += filterSql.replace(" and", "");
    				else condition += filterSql;
    			}
    			url += "?condition="+condition;

    		    $('#ajax_loader').show();
    			queue()
    			    .defer(d3.json, url)
    			    .await(this.makeGraphs);
    		},
    		makeGraphs : function (error, apiData) {
    			//console.log('hourlyFraud.js:makeGraphs():error:', error);
    			//console.log('hourlyFraud.js:makeGraphs():apiData:', apiData);
    			if (error){
    				//console.log('hourlyFraud.js:makeGraphs():error:', error);
    				return;
    			}
    			if (apiData === undefined){
    				//console.log('hourlyFraud.js:makeGraphs():apiData: is undefined - return');
    				return;
    			}
    			else {
    				//console.log('hourlyFraud.js:makeGraphs():apiData.length:', apiData.length);
    			}
    			//Start Transformations

    				var dataSet = apiData;
    				//console.log('hourlyFraud.js:makeGraphs():apiData:', apiData.length);
    				//console.log('makeGraphs():dataSet:', dataSet.length);

    				if (!dataSet || dataSet.length == 0){
    					//console.log("No data retrieved. Do nothing");
    					$("#hourlyFraud-datatable").dataTable().fnClearTable();
    					dc.renderAll("hourlyfraud");
	    			 	$('#ajax_loader').hide();
    				}

    				var suspectCallsOutData = [];
    				var suspectDurationData = [];
    				var callsOut = {};
    				var duration = {};
    				

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

    					if (isNaN(callsOut[""+d.cell_id]))
    						callsOut[""+d.cell_id] =0;
    					callsOut[""+d.cell_id] += Number(d.num_out);

    					
    					if (isNaN(duration[""+d.cell_id])) duration[""+d.cell_id] =0;
    					duration[""+d.cell_id] += Number(d.sum_out_duration);
    				});

				    //console.log("CALLS OUT Array",callsOut);
    				//all calls out
    				var callsOutArray = [];
    				for (var key in callsOut){
    					if (key != 0){ //skip cell_id = 0 --  
//    						callsOutArray.push({ "cell_id": key, value: callsOut[key] });
    						callsOutArray.push([key,  callsOut[key] ]);
    					}
    				}
    				callsOutArray.sort(function(a, b) {return b[1] - a[1]});
    				
    				var topCallsOut = callsOutArray.slice(0, 10);
    				var topCallsOutNdx3 = crossfilter(topCallsOut);
    				var topCellIdDim3 = topCallsOutNdx3.dimension(function(d) {console.log ("Suspect Calls", d[0]); return d[0];});
    				var topCallsOutByCellId3 = topCellIdDim3.group().reduceSum(function(d){
    					return d[1]*1; 
    				});
    				

    				//sum out duration
    				var durationArray = [];
    				for (var key in duration){
    					if (key != 0){ //skip cell_id = 0 --  
    						durationArray.push([key,  duration[key] ]);
    					}
    				}
    				durationArray.sort(function(a, b) {return b[1] - a[1]});
    				
    				var topDuration = durationArray.slice(0, 10);
    				var topDurationNdx = crossfilter(topDuration);
    				var topDurationCellIdDim = topDurationNdx.dimension(function(d) {return d[0];});
    				var topDurationByCellId = topDurationCellIdDim.group().reduceSum(function(d){
    					return d[1]*1; 
    				});


    				var ndx = crossfilter(dataSet);
    				//Define Dimensions
    				var trafficDateDimension = ndx.dimension(function(d) { return d.traffic_date; });
    				var trafficHourDimension = ndx.dimension(function(d) { return d.traffic_hour; });
//    				var cellsDimension = ndx.dimension(function(d){ return d.cells*1;})
    				var cellIdDimension = ndx.dimension(function(d){ return d.cell_id*1;})
//    				var startTimeDimension = ndx.dimension(function(d){ return d.call_start_time;})
    				var sumOutDurationDimension = ndx.dimension(function(d){ return d.sum_out_duration;})

    				
    				//Calculate metrics
    				var projectsByDate = trafficDateDimension.group(); 
    				var cellIdGroup = cellIdDimension.group();
    				var hourGroup = trafficHourDimension.group();
    				var dateGroup = trafficDateDimension.group();
//    				var startTimeGroup = startTimeDimension.group();
    				var sumOutDurationGroup = sumOutDurationDimension.group();

    				var all = ndx.groupAll();

    					
    				//top 10 useing group.top(10)
    				var callsOutByCellId2 =  cellIdDimension.group().reduceSum(function(d) {
    					return d.value*1; 
    				});
    				var topCallsOutByCellId2 = callsOutByCellId2.top(10);

    				
    				//Calculate Groups
    				//total loss
//    				var netTotalprocessedTime = ndx.groupAll().reduceSum(function(d) {return d.processedTime;});
//    				var totalSumOutUnitByCell = cellIdDimension.group().reduceSum(function(d) {
//    					return d.sum_in_unit*1; //sum_out_unit is no longer in the db?
//    				});
    				
    				var totalSuspectCallsByCellId = cellIdDimension.group().reduceSum(function(d) {
    					return d.num_out*1; 
    				});
    				
    				var totalSumOutDurationByCell = cellIdDimension.group().reduceSum(function(d) {
    					return d.sum_out_duration*1;
    				});
    				
    				var totalSumOutDurationByHour = trafficHourDimension.group().reduceSum(function(d) {
    					return d.sum_out_duration*1; //sum_out_duration is no longer in the db? now it is back to Hive
    				});
    				
    				var illegalOddsHighByHour = trafficHourDimension.group().reduceSum(function(d) {
//    					return d.sum_out_duration*1;
    					if (d.illegalodds >= 0.85){  //TODO: make it confiurable
    						return 1;
    					}
    					else {
    						return 0;
    					}
    				});
    				
    				var totalSumOutDurationByDate = trafficDateDimension.group().reduceSum(function(d) {
    					return d.sum_out_duration;
    				});
    				
    				//Define threshold values for data
    				var maxDate, minDate, minHour, maxHour = 0; 
    				if (trafficDateDimension.bottom(1)[0] != undefined){
    					minDate = trafficDateDimension.bottom(1)[0].traffic_date;
    					maxDate = trafficDateDimension.top(1)[0].traffic_date;

    					 minHour = trafficHourDimension.bottom(1)[0].traffic_hour;
    					 maxHour = trafficHourDimension.top(1)[0].traffic_hour;
    				}	
    				
    				var minCellId, maxCellId = 0;
    				if (cellIdDimension.bottom(1)[0] != undefined){
    					minCellId= cellIdDimension.bottom(1)[0].cell_id*1;
    					maxCellId = cellIdDimension.top(1)[0].cell_id*1;
    				}
    				//console.log("minCellId:", minCellId);
    				//console.log("maxCellId:", maxCellId);
    				 
    				var minAllCellId, maxAllCellId = 0;
    				if (topCellIdDim3.bottom(1)[0] != undefined){
    					minAllCellId = topCellIdDim3.bottom(1)[0].cell_id*1;
    				 maxAllCellId = topCellIdDim3.top(1)[0].cell_id*1;
    				}
    				
    				//console.log("minAllCellId:", minAllCellId);
    				//console.log("maxmaxAllCellIdCellId:", maxAllCellId);
    				
    				//console.log("minDate:", minDate);
    				//console.log("maxDate:", maxDate);
    				//console.log("minHour:", minHour);
    				//console.log("maxHour:", maxHour);
    				
    			    //Charts

    				var sumOutDurationByCellTotal = dc.barChart(".active #sumOutDurationByCell-chart","hourlyfraud");
    				var callsOutByCellId = dc.barChart(".active #callsOutByCellId-chart","hourlyfraud");
    				var illegalOddsTotal =  dc.lineChart(".active #illegalOddsTotal-chart","hourlyfraud");    				
    				var hourlyPieChart = dc.pieChart(".active #hourly-pie-chart","hourlyfraud");
//    				var hourlyRowChart = dc.rowChart(".active #hourly-row-chart","hourlyfraud");
    				var hourlyRowChart = dc.barChart(".active #hourly-row-chart","hourlyfraud");    				
    				

    				hourlyRowChart
    				  .dimension(trafficHourDimension)
    				  .group(hourGroup)
    				  .margins({top: 10, right: 50, bottom: 50, left: 30})
    				  .elasticX(true)
    				  .x(d3.scale.ordinal().domain(minHour, maxHour))
    				  .xUnits(dc.units.ordinal)
//    				  .xAxisLabel("Hour")
    			      .yAxisLabel("Suspects")
    			      .elasticY(true)
    				  .xAxis().ticks(5);

				hourlyRowChart.on('renderlet.a',function (chart) {chart.selectAll('g.x text').attr('transform', 'translate(-10,10) rotate(315)');});

    				hourlyPieChart
//    			      .height(220)
    			      .radius(90)
    			      .innerRadius(40)
    			      .transitionDuration(1000)
    			      .dimension(trafficHourDimension)
    			      .group(hourGroup);

    				
    				sumOutDurationByCellTotal
    			    .transitionDuration(1000)
    			    .dimension(topDurationCellIdDim)
    			    .group(topDurationByCellId)
    			    .margins({top: 10, right: 50, bottom: 50, left: 40})
    			     .yAxisLabel("Duration")
    			    .elasticY(true)
    			    .x(d3.scale.ordinal().domain(topDurationCellIdDim))
    			    .xUnits(dc.units.ordinal)
    			    .renderHorizontalGridLines(true)
    			    .renderVerticalGridLines(true)
    			    .ordering(function(d){return d.value;})
    			    .yAxis().tickFormat(d3.format("s"));

				sumOutDurationByCellTotal.on('renderlet.a',function (chart) {
					// rotate x-axis labels
					chart.selectAll('g.x text')
						.attr('transform', 'translate(-10,10) rotate(315)');
				});


				callsOutByCellId
//    			    .height(220)
    			    .dimension(topCellIdDim3)
    			    .group(topCallsOutByCellId3)//.top(10)
    			    .x(d3.scale.ordinal().domain(topCellIdDim3))
    			    .margins({top: 10, right: 50, bottom: 50, left: 40})
//    			     .xAxisLabel("Cell Id")
    			     .yAxisLabel("Calls")
    			    .elasticY(true)
    			    .xUnits(dc.units.ordinal)
    			    .renderHorizontalGridLines(true)
    			    .renderVerticalGridLines(true)
    			    .ordering(function(d){return d.value;})
    			    .yAxis().tickFormat(d3.format("s"));

				// rotate x-axis labels
				callsOutByCellId.on('renderlet.a',function (chart) {chart.selectAll('g.x text').attr('transform', 'translate(-10,10) rotate(315)');});


				illegalOddsTotal
//    				.height(220)
    				.margins({top: 10, right: 50, bottom: 30, left: 50})
    				.dimension(trafficHourDimension)
    				.group(illegalOddsHighByHour)
    				.renderArea(true)
    				.transitionDuration(500)
    				.x(d3.scale.linear().domain([minHour, maxHour]))
    				.elasticY(true)
    				.renderHorizontalGridLines(true)
    				.renderVerticalGridLines(true)
//    				.xAxisLabel("Hour")
    				.yAxisLabel("Illegal Odds > 85%")
    				.yAxis().ticks(6);
				illegalOddsTotal.on('renderlet.a',function (chart) {chart.selectAll('g.x text').attr('transform', 'translate(-10,10) rotate(315)');});

    				var datatable = $("#hourlyFraud-datatable").dataTable({
    			        "bPaginate": true,
    			        "colReorder": true,  
    			        "bLengthChange": true,  
    			        "sScrollX":"100%",
    			        "bFilter": true,
    			        "bSort": true,
    					"order": [[ 1, "desc" ]], //traffic_hour        
    			        "bInfo": true,
    			        "bAutoWidth": false,
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
    			            		return "<a href='javascript:void(0);' onclick=\"HOURLYFRAUDPOP.popWnd(" + data+ ","+row.traffic_date+","+row.traffic_hour+",'MSISDN');\" class='colLnk'>" + data + '</a>';
    			            	}
    			            }          
    			            ,{ "mData": "s_imsi", "sDefaultContent": "s_imsi",
    			            	"mRender":function(data,type,row){
    			            		return "<a href='javascript:void(0);' onclick=\"HOURLYFRAUDPOP.popWnd(" + data+ ","+row.traffic_date+","+row.traffic_hour+",'IMSI');\" class='colLnk'>" + data + '</a>';
    			            	}
    			            } 
    			            ,{ "mData": "cell_id", "sDefaultContent": "cell_id",
    			            	"mRender":function(data,type,row){
    			            		return "<a href='javascript:void(0);' onclick=\"HOURLYFRAUDPOP.popHourly(" + data+ ");\" class='colLnk'>" + data + '</a>';
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
    										title:'HourlyFraud'
    	    							}, 
    	    							{
    	    								extend:'csvHtml5',
    	    								title:'HourlyFraud'
    	    							}, 
    	    							{
    	    								extend:'excelHtml5',
    	    								title:'HourlyFraud'
    	    							},
    	    							{
    	    								extend:'pdfHtml5',
    	    								title:'HourlyFraud'
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
    			    dc.renderAll("hourlyfraud");
    			  $('#ajax_loader').hide();	
    			}
    }
    
	getElement( "#refresh").on( "click", function() {
	    //console.log( "refresh button was clicked" );
	    start = getElement("#start").val() === undefined ? "" : getElement("#start").val() ;
	    end = getElement("#end").val() === undefined ? "" : getElement("#end").val() ;
	    filterSql = getElement("#filterSql").val();
	    //console.log("start=", start, "end=", end, "filterSql=", filterSql);
	    HOURLYFRAUD.filter(start, end, filterSql);
	});
    HOURLYINIT = {
    		init : function(){
    			var sql = "select max(traffic_date_hour) as traffic_date_hour from core_605_3.decode_info where gk_process_state = 2";
    			var url = "/tunisiana/dataaccess/decodeinfo";
    			url += "?"+"condition="+sql;
    			//console.log("url=", url);
    			url = encodeURI(url);
    			//console.log("encoded url=", url);
    			
    			queue()
    		    .defer(d3.json, url)
    		    .await(function(error, data){
    		    	//console.log("returned data:", data);
    		    	if (data === undefined || data.length != 1){
    		    		//handle error
    		    		//console.log("data connection error:", data);
    		    	}
    		    	else {
    		    		var latestTime = data[0].traffic_date_hour;
    		    		//console.log("latest time:", latestTime); //2016041216
    		    		getElement("#start").val(moment(moment(latestTime, "YYYYMMDDHH").subtract(24,'hours')).format("YYYY-MM-DD HH"));
    		    		getElement("#end").val(moment(moment(latestTime, "YYYYMMDDHH")).format("YYYY-MM-DD HH"));
    		    		//TODO: parse the time string to date and hour, and pass it to filter to get the data
    		    		//also update the UI filter with the date/hour info
    		    		HOURLYFRAUD.filter(getElement("#start").val(), getElement("#end").val(), filterSql);
    		    	}
    		    });		
    			
    		}
    }
	
    HOURLYINIT.init();	

});


HOURLYFRAUDPOP = {
		popWnd : function (data,day,hour,type){
			var url = clientHTTPConfig.appContextRoot+'/drilldown/callsnodup?data='+data+'&day='+day+'&hour='+hour+'&type='+type;
			//1st LEVEL Working-NO ISSUES-Ashok
			window.open(
					url ,
					'_blank',
					'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
		},
		popHourly:function (data){
			var start = getElement("#start").val() === undefined ? "" : getElement("#start").val() ;
			var end = getElement("#end").val() === undefined ? "" : getElement("#end").val() ;
			var url = clientHTTPConfig.appContextRoot+'/drilldown/hourlyfraud?data='+data+'&start='+start+'&end='+end;
			//1st LEVEL Working-NO ISSUES-Ashok
			window.open(
					url ,
					'_blank',
					'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
		}
}



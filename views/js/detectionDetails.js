$(document).ready(function() {
		//console.log('detectionDetails.js');
		$(".form_datetime").datetimepicker({
			format: "yyyy-mm-dd hh", //24h format
	        minView:'day',//need to mark 'day' in order to show hour? 
	        pickTime: true,
	        autoclose: true,
	        todayBtn: true,
	        pickerPosition: "bottom-left"
		 });
		   
		//var start = getElement("#start").val() === undefined ? "" : getElement("#start").val() ;
	    //end = getElement("#end").val() === undefined ? "" : getElement("#end").val() ;

    var startDate = new Date();
    startDate.setDate(new Date().getDate() - detectionDetailsDefaultDateRange.oneDay);
    var start = $("#start").val(getFormattedDate(startDate)).val();
    var end = $("#end").val(getFormattedDate(new Date())).val();

	    filterSql = getElement("#filterSql").val()  === undefined ? "" : getElement("#filterSql").val();
	    var latestTime;



	Zoomerang.config({
		    maxHeight: 400,
		    maxWidth: 800
		}).listen('.zoom');



	    DETECTION = {
			filter: function (start, end, filterSql) {
				var url = clientHTTPConfig.appContextRoot + "/dataaccess/detectiondetails";
				var condition = "";
                condition = concatParamOther(condition, "action", "=", "filter");
     			var startTime, endTime;
				if (start != undefined && start != "") {
					startTime = moment(start).format("YYYYMMDDHH");
                    condition = concatParamOther(condition, "startTime", "=", +startTime);
				}
				if (end != undefined && end != "") {
					endTime = moment(end).format("YYYYMMDDHH");
                    condition = concatParamOther(condition, "endTime", "=", +endTime);
				}
					/*	if (filterSql != "") {
                 if (condition == "")
                 condition += filterSql.replace(" and", "");
                 else condition += filterSql;
                 }*/


                //url += "?action=first_detection&type=TCG&traffic_date=20160626"
                url += "?" + condition;


				//console.log("filter url=", url);
				$('#ajax_loader').show();

				queue()
					.defer(d3.json, url)
					.await(this.makeGraphs);
			},
			makeGraphs: function (error, apiData) {
				var dataSet = apiData;

				if (!dataSet || dataSet.length == 0) {
					//console.log("No data retrieved. Do nothing");

					//commented out below two lines as they are not clearing previous search results
					$("#detectionDetails-datatable").dataTable().fnClearTable();
					dc.renderAll("detcDetail");


		/*			if (d3.selectAll("svg").isEmpty) {
						// alert("Do Nothing");
					}
					else {
						//  alert("Remove existing graphs");
						d3.selectAll("svg").remove();
					}

					$("#" + dd + "graph_collapse").hide();
					$("#" + dd + "table_collapse").hide();
  */
					$('#ajax_loader').hide();
					return;

				}
				else {

						dataSet.forEach(function (d) {
							if (d.call_time) {
								//Phoenix: call_time is already time
								d.call_time = new Date(d.call_time);
							}
							if (d.insert_time) {
								d.insert_time = moment(d.insert_time, "YYYY-MM-DD HH:mm:ss");  // "2016-07-13 15:17:38.46",
								////console.log("INSERT TIME",d.insert_time);

							}
						});


					var ndx = crossfilter(dataSet);

					var callTimeDimension = ndx.dimension(function (d) {
						return d.call_time;
					});
					var trafficHourDimension = ndx.dimension(function (d) {
						return d.call_time.getUTCHours();
//	    					return d.insert_time.getUTCHours();
					});
					var cellsDimension = ndx.dimension(function (d) {
						return d.cell_id;
					})
					var sumOutDurationDimension = ndx.dimension(function (d) {
						return d.calls;
					})

					var projectsByDate = callTimeDimension.group();
					var cellsGroup = cellsDimension.group();
					var hourGroup = trafficHourDimension.group();
					var dateGroup = callTimeDimension.group();
					var sumOutDurationGroup = sumOutDurationDimension.group();

					var all = ndx.groupAll();

					var totalSumOutUnitByCell = cellsDimension.group().reduceSum(
						function (d) {
							return d.mou;
						});

					var totalSumOutDurationByCell = cellsDimension.group()
						.reduceSum(function (d) {
							return d.mou;
						});

					var totalCallsByCell = cellsDimension.group()
						.reduceSum(function (d) {
							return d.calls;
						});

					var totalSumOutDurationByHour = trafficHourDimension.group()
						.reduceSum(function (d) {
							return d.mou;
						});


					//dateHourlyCalls
					var totalCallsByHour = trafficHourDimension.group()
						.reduceSum(function (d) {
							return d.calls;
						});

					//mou
					var totalSumOutDurationByDate = callTimeDimension.group()
						.reduceSum(function (d) {
							return d.mou;
						});

					// Define threshold values for data
					var maxDate, minDate, minHour, maxHour = 0;

					if (callTimeDimension.bottom(1)[0] != undefined) {
						minDate = callTimeDimension.bottom(1)[0].call_time;
						maxDate = callTimeDimension.top(1)[0].call_time;
						minHour = trafficHourDimension.bottom(1)[0].call_time
							.getUTCHours();
						maxHour = trafficHourDimension.top(1)[0].call_time
							.getUTCHours();
					}
					//console.log("minDate:", minDate);
					//console.log("maxDate:", maxDate);
					//console.log("minHour:", minHour);
					//console.log("maxHour:", maxHour);

					// Charts
					var sumOutDurationByCellTotal = dc.barChart(".active #sumOutDurationByCell-chart", "detcDetail");


					//Call by Date/Hour
					var dateHourTotal = dc.rowChart(".active #dateHour-chart", "detcDetail");

					dateHourTotal
					//	    				  .width(380)
						.height(220)
						//	    				  .yAxisLabel("Hour")
						//	    				  .xAxisLabel("Count")
						.dimension(trafficHourDimension)
						.group(totalCallsByHour)
						.elasticX(true)
						.xAxis().ticks(5);


					//pie chart
					var dateHourPieChart = dc.pieChart(".active #dateHour-piechart", "detcDetail");

					dateHourPieChart
						.height(220)
						//	    			      .width(350)
						.radius(90)
						.innerRadius(40)
						.transitionDuration(1000)
						//	    			      .slicesCap(10)
						.dimension(trafficHourDimension)
						.group(totalCallsByHour);
					//end pie chart

					sumOutDurationByCellTotal
					//	    				.width(350)
						.height(220)
						.transitionDuration(1000).dimension(cellsDimension)
						.group(totalSumOutDurationByCell)
						.margins({
							top: 10,
							right: 50,
							bottom: 30,
							left: 50
						}).centerBar(false).xAxisLabel("Cell Id").yAxisLabel(
						"MOU").gap(5).elasticY(true)
						.x(d3.scale.ordinal().domain(cellsDimension)).xUnits(
						dc.units.ordinal).renderHorizontalGridLines(
						true).renderVerticalGridLines(true).ordering(
						function (d) {
							return d.value;
						}).yAxis().tickFormat(d3.format("s"));


					//display all cells for now, as versus top 10 cells -- DD has less cells than HF
					var callsOutByCellId = dc.barChart(".active #callsOutByCellId-chart", "detcDetail");
					callsOutByCellId
						.height(220)
						.dimension(cellsDimension)
						.group(totalCallsByCell)//.top(10)
						.x(d3.scale.ordinal().domain(cellsDimension))
						.margins({top: 10, right: 50, bottom: 30, left: 50})
						.xAxisLabel("Cell Id")
						.yAxisLabel("Calls")
						.elasticY(true)
						.xUnits(dc.units.ordinal)
						.renderHorizontalGridLines(true)
						.renderVerticalGridLines(true)
						.ordering(function (d) {
							return d.value;
						})
						.yAxis().tickFormat(d3.format("s"));


					var datatable = $("#detectionDetails-datatable").dataTable(
						{
							"bPaginate": true,
							"colReorder": true,
							"bLengthChange": true,
							"sScrollX": "100%",
							"bFilter": true,
							"bSort": true,
							"bInfo": true,
							"bAutoWidth": true,
							"bDeferRender": true,
							"aaData": callTimeDimension.top(Infinity),
							"bDestroy": true,
							"fnRowCallback": function (nRow, aData, iDisplayIndex) {
								$('td', nRow).attr('nowrap', 'nowrap');
								return nRow;
							},
							"data": dataSet,
							"aoColumns": [
								{
								
									"mData": "insert_time", 
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										return data.format("YYYY-MM-DD HH:mm:ss");
									}
								},

                                {
                                    "mData": "call_date_hour", // it should be detection_time on UI. temporarily use insert_time for now
                                    "sDefaultContent": ""
                                },
                                {
									"mData": "source",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										switch (data) {
											case null:
												return "undefined";
											case "A":
											case "VOIP":
												return "TCG";
											case "B":
												return "GK";
											default:
												return data;
										}
									}
								}, {
									"mData": "first_flag",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										if (data == 1) {
											return '<input type="checkbox" value="" class="editor-active" checked disabled>';
										}
										else {
											return '<input type="checkbox" value="" class="editor-active" disabled>';
										}
									}
								},
								{
									"mData": "operator",
									"sDefaultContent": "operator"
								}, {
									"mData": "corporateid",
									"sDefaultContent": ""/*,
									"mRender": function (data, type, row) {
										//return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popAdd(" + data + ");\" class='colLnk'>" + data + '</a>';
                                        return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popCorpSummary(" + data + "," + row.insert_time + ",'CorpID');\" class='colLnk'>" + data + '</a>';
									}*/
								}, {
									"mData": "msisdn",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
		
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popWnd(" + data + "," + row.insert_time + ",'MSISDN');\" class='colLnk'>" + data + '</a>';

									}
								}, {
									"mData": "imsi",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										//return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popWnd(" + data+ ","+row.insert_time.format("YYYY-MM-DD hh:mm:ss")+",'IMSI');\" class='colLnk'>" + data + '</a>';
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popWnd(" + data + "," + row.insert_time + ",'IMSI');\" class='colLnk'>" + data + '</a>';

									}
								}, {
									"mData": "cell_id",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popDect(" + data + ",'CELL');\" class='colLnk'>" + data + '</a>';
									}
								}, {
									"mData": "lac",
									"sDefaultContent": ""
								}, {
									"mdata": "vendor",
									"defaultContent": ""
								}, {
									"mData": "model",
									"sDefaultContent": ""
								}, {
									"mData": "calls",
									"sDefaultContent": ""
								}, {
									"mData": "mou",
									"sDefaultContent": ""
								}, {
									"mData": "module",
									"sDefaultContent": ""
								}, {
									"mData": "subid",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popDect(" + data + ",'SUB');\" class='colLnk'>" + data + '</a>';
									}
								}, {
									"mData": "dealerid",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popDect(" + data + ",'DEALER');\" class='colLnk'>" + data + '</a>';
									}
								}, {
									"mData": "activation_date",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										// data is bigint
										return moment(data).format("YYYY-MM-DD");
										//return data.format("YYYY-MM-DD");
									}
								}, {
									"mData": "last_registration_date",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										// data is bigint
										return moment(data).format("YYYY-MM-DD");
										//return data.format("YYYY-MM-DD");
									}
								}, {
									"mData": "last_topup_date",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										// data is bigint
										return moment(data).format("YYYY-MM-DD");
										//return data.format("YYYY-MM-DD");
									}
								}, {
									"mData": "last_topup_amount",
									"sDefaultContent": ""
								}, {
									"mData": "remaining_balance",
									"sDefaultContent": ""
								}, {
									"mData": "data_usage",
									"sDefaultContent": ""
								}],
//	    						"sDom" : '<"wrapper"flBtip>',
							"sDom": 'ZlfrBtip',
							"colResize": {
								"tableWidthFixed": false
							},
							buttons: [{
								extend: 'collection',
								text: 'Export',
								buttons: [{
									extend: 'copyHtml5',
									title: 'DetectionDetails'
								},
									{
										extend: 'csvHtml5',
										title: 'DetectionDetails'
									},
									{
										extend: 'excelHtml5',
										title: 'DetectionDetails'
									},
									{
										extend: 'pdfHtml5',
										title: 'DetectionDetails'
									}]
							}]
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
					dc.renderAll("detcDetail");
					$('#ajax_loader').hide();
				}
			} //====================END MAKEGRAPHS FUNCTION
		}

	 getElement("#refresh").on( "click", function() {
		 //console.log( "=============User entered FILTER criteria in detectionDetails PAGE=============" );
		    start = $("#start").val() === undefined ? "" : $("#start").val() ;
		    end = $("#end").val() === undefined ? "" : $("#end").val() ;
		    filterSql = $("#filterSql").val()  === undefined ? "" : $("#filterSql").val();
		    //console.log( "start=", start, "end=", end);
		    DETECTION.filter(start, end, filterSql);
		});
	
		$("#saveCorp").on("click",function(){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/addcorporatesummary";
			var corporateId = $("#corporateId").val();
			var corporateName = $("#corporateName").val();
			var trafficDate = $("#trafficDate").val();
			var detections = $("#detections").val();
			url += "?sql=upsert into fraud_605_3.corporate_summary (id, corporate_id, corporate_name, traffic_date, detections, insert_time)" +
					" values (NEXT VALUE FOR fraud_605_3.SEQ_CORPORATE_SUMMARY,'"+corporateId+"','"+corporateName+"','"+trafficDate+"',"+detections+",now())";

			//console.log( "=============Invoking saveCorp (user click) in detectionDetails PAGE=============" );
			queue().defer(d3.json, url).await(returnResult);
	    });

         DETECTION.filter(start, end,filterSql); //====Ashok- NO NEED TO CALL INIT FUNCTION as we set the default range on page load
		//init (); //disable dynamic date looking feature as the current hive/service takes too long. postponing after hbase/service is available
		
	});



		function init(){
/*			this query returns the latest traffic time for detection_details table, 
			which will be used to query for default data when the report is initially loaded.
			
			this query returns the latest time for detection details
			select max(traffic_date) from frauddb.decode_info where substring(report_state,3,1)='2';
			
			this query returns the latest time for hourly_suspect
						var sql = "select max(traffic_time) from frauddb.decode_info where gk_process_state = 2";
			
*/			//alert ("INIT INVOKED");
			
			var sql = "select max(traffic_date_hour) as traffic_date_hour from core_605_3.decode_info ";
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/decodeinfo";
			url += "?"+"condition="+sql;

			//console.log("============ Executing init() function in detectionDetails.js==============");
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

		    		latestTime = data[0].traffic_date_hour;
		    		//alert ("LATEST" +latestTime);
                    //console.log("latest time:", latestTime); //2016041216
		    		getElement("#start").val(moment(moment(latestTime, "YYYYMMDDHH").subtract(24,'hours')).format("YYYY-MM-DD HH"));
		    		getElement("#end").val(moment(moment(latestTime, "YYYYMMDDHH")).format("YYYY-MM-DD HH"));
		    		//TODO: parse the time string to date and hour, and pass it to filter to get the data
		    		//also update the UI filter with the date/hour info
		    		DETECTION.filter(getElement("#start").val(), getElement("#end").val(),filterSql);
		    	}
		    });			
		}
		
		
/*		function getLatestDate(){
			var sql = "select max(traffic_date) from frauddb.decode_info where substring(report_state,3,1)='2'";
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/freestyle";
			url += "?"+sql;
			//console.log("url=", url);
			url = encodeURI(url);
			//console.log("encoded url=", url);
			return url;
			
		}*/

	DETECTIONPOP = {
			popDect : function(data,type){
				var url = clientHTTPConfig.appContextRoot+'/drilldown/detectiondetails?data='+data+'&type='+type;
				window.open(
						url ,
						'_blank',
						'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
			},
			popWnd : function(data,day,type){
				//console.log("DD pwpWnd");
				var unixDay =  moment(day);
				var date = unixDay.format("YYYYMMDD");
				var hour = unixDay.format("HH");

				var url = clientHTTPConfig.appContextRoot+'/drilldown/callsnodup?data='+data+'&day='+date+'&hour='+hour+'&type='+type;
				window.open(
						url ,
						'_blank',
						'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
			},
			popAdd : function(data){
				$('#detectionDetailModal').modal('show');
			},

        popCorpSummary: function(data,day,type){
           // var url = clientHTTPConfig.appContextRoot+'/drilldown/detectiondetails?data='+data+'&type='+type;
            var unixDay =  moment(day);
            var date = unixDay.format("YYYYMMDD");

            var url = clientHTTPConfig.appContextRoot+'/reports/corporatesummary';
            var condition = "";
            condition = concatParam(condition, "traffic_date", "=", "'" + date + "'");
            url += "?condition="+condition;
            window.open(
                url ,
                '_blank',
                'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
        }


	}	//================END of DETECTION POP
	
		
		function returnResult(error, apiData){
			//console.log("============ Executing returnResult() function in detectionDetails.js==============");
			if(apiData!=null){
				var status = apiData[0].status;
				if(status == true){
					$('#detectionDetailModal').modal('hide');
				}else{
					$('#message').attr("hidden",false);
				}
			}
			
		}
		

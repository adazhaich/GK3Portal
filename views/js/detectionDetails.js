$(document).ready(function() {

/*
	var start = moment().subtract(29, 'days');
	var end = moment();

	function cb(start, end) {
		$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	}

	$('#reportrange').daterangepicker({
		startDate: start,
		endDate: end,
		ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		}
	}, cb);

	cb(start, end);

*/


	$(window).resize(function () {
	    //console.log("resizing");
		dc.renderAll("detcDetail");});

		$(".form_datetime").datetimepicker({
			format: "yyyy-mm-dd hh", //24h format
	        minView:'day',//need to mark 'day' in order to show hour? 
	        pickTime: true,
	        autoclose: true,
	        todayBtn: true,
	        pickerPosition: "bottom-left"
		 });

    var startDate = new Date();
    startDate.setDate(new Date().getDate() - getDateRange(detectionDetails));

    var start = $("#start").val(getFormattedDateHour(startDate)).val();
    var end = $("#end").val(getFormattedDateHour(new Date())).val();
    var filterSql = getElement("#filterSql").val()  === undefined ? "" : getElement("#filterSql").val();
    var latestTime;

	Zoomerang.config({
		    maxHeight: 400,
		    maxWidth: 800
		}).listen('.zoom');

	getElement("#refresh").on( "click", function() {
		console.log( "=============User entered FILTER criteria in detectionDetails PAGE=============" );
		start = $("#start").val() === undefined ? "" : $("#start").val() ;
		console.log("START",start);
		end = $("#end").val() === undefined ? "" : $("#end").val() ;
		console.log("END",end);
		filterSql = $("#filterSql").val()  === undefined ? "" : $("#filterSql").val();
		console.log( "start=", start, "end=", end);
        if (dateValidate(start, end)) {
            DETECTION.filter(start, end, filterSql);
        }
	});



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

				console.log( "FILTER start=", start, "end=", end);

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
					//dc.renderAll("detcDetail");

					if (d3.selectAll("svg").isEmpty) {
						// alert("Do Nothing");
					}
					else {
						//  alert("Remove existing graphs");
						d3.selectAll("svg").remove();
					}

					//$("#ddgraph_collapse").hide();
					//$("#table_collapse").hide();

					document.getElementById('dd_record_count').innerHTML =0;
					$('#ajax_loader').hide();
					return;

				}

               // $("#ddgraph_collapse").show();
               // $("#table_collapse").show();
               //BEGIN  OF CODE COPIED FROM hourlyFraud.js===================================================================================================
                var callsOut = {};
                var duration = {};
				//END OF CODE COPIED FROM hourlyFraud.js===================================================================================================

                dataSet.forEach(function (d) {
							if (d.call_time) {
								//Phoenix: call_time is already time
								d.call_time = new Date(d.call_time);
							}
							if (d.insert_time) {
								d.insert_time = moment(d.insert_time, "YYYY-MM-DD HH:mm:ss");  // "2016-07-13 15:17:38.46",
								////console.log("INSERT TIME",d.insert_time);
							}

                    //BEGIN  OF CODE COPIED FROM hourlyFraud.js===================================================================================================
                    if (isNaN(callsOut[""+d.cell_id]))
                    	callsOut[""+d.cell_id] =0;

					    callsOut[""+d.cell_id] += Number(d.mou_before);


                    if (isNaN(duration[""+d.cell_id])) duration[""+d.cell_id] =0;
                    duration[""+d.cell_id] += Number(d.calls);
                   //END OF CODE COPIED FROM hourlyFraud.js===================================================================================================

                });

                //all calls out
                var callsOutArray = [];
                for (var key in callsOut){
                    if (key != 0){ //skip cell_id = 0 --
                        callsOutArray.push([key,  callsOut[key] ]);
                    }
                }
                callsOutArray.sort(function(a, b) {return b[1] - a[1]});

                var topCallsOut = callsOutArray.slice(0, 30);
                var topCallsOutNdx3 = crossfilter(topCallsOut);
                var topCellIdDim3 = topCallsOutNdx3.dimension(function(d) {return d[0];});
                var topCallsOutByCellId3 = topCellIdDim3.group().reduceSum(function(d){
                    return d[1]*1;
                });

                //sum out duration
                var durationArray = [];
                for (var key in duration){
                    if (key != 0 &&  duration[key] ){ //skip cell_id = 0 --
                        durationArray.push([key,  duration[key] ]);
                    }
                }
                durationArray.sort(function(a, b) {return b[1] - a[1]});

                var topDuration = durationArray.slice(0, 30);
                var topDurationNdx = crossfilter(topDuration);
                var topDurationCellIdDim = topDurationNdx.dimension(function(d) {return d[0];});
                var topDurationByCellId = topDurationCellIdDim.group().reduceSum(function(d){
                    return d[1]*1;
                });

             //END OF CODE COPIED FROM hourlyFraud.js===================================================================================================


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

					var totalSumOutUnitByCell = cellsDimension.group()
						.reduceSum(function (d) {
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


					//dateHourlyCalls  d.call_time.getUTCHours();
					var totalCallsByHour = trafficHourDimension.group()
						.reduceSum(function (d) {
							return d.calls;
						});

					//mou d.call_time;
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


				// Charts ***Ashok-CHECK why group is not working correctly****
				var sumOutDurationByCellTotal = dc.barChart(".active #sumOutDurationByCell-chart", "detcDetail");

					sumOutDurationByCellTotal
						.transitionDuration(1000)
						.dimension(cellsDimension)
						//.group(totalSumOutDurationByCell)//.top(30)
                       .group(topDurationByCellId) // CODE FROM HOURLY FRAUD===========================
						.margins({top: 10,right: 50,bottom: 50,left: 50})
						.centerBar(false)
                        //.xAxisLabel("Cell Id")
                        .yAxisLabel("MOU").gap(5).elasticY(true)
						.x(d3.scale.ordinal().domain(topDurationCellIdDim)).xUnits(
                       //.x(d3.scale.ordinal().domain(cellsDimension)).xUnits(
						dc.units.ordinal)
						.renderHorizontalGridLines(true).
					     renderVerticalGridLines(true).ordering(
						function (d) {
							return d.value;
						}).yAxis().tickFormat(d3.format("s"));


                sumOutDurationByCellTotal.on('renderlet.a',function (chart) {
                    // rotate x-axis labels
                    chart.selectAll('g.x text')
                        .attr('transform', 'translate(-10,10) rotate(315)');
                });

						//display all cells for now, as versus top 10 cells -- DD has less cells than HF
					var callsOutByCellId = dc.barChart(".active #callsOutByCellId-chart", "detcDetail");

					callsOutByCellId
						//.height(220)
						.dimension(cellsDimension)
						//.group(totalCallsByCell)//.top(10)
                        .group(topCallsOutByCellId3)//.top(10)
						//.x(d3.scale.ordinal().domain(cellsDimension))
                        .x(d3.scale.ordinal().domain(topCellIdDim3))
						.margins({top: 10, right: 50, bottom: 50, left: 50})
						//.xAxisLabel("Cell Id")
						.yAxisLabel("Calls")
						.elasticY(true)
						.xUnits(dc.units.ordinal)
						.renderHorizontalGridLines(true)
						.renderVerticalGridLines(true)
						.ordering(function (d) {
							return d.value;
						})
						.yAxis().tickFormat(d3.format("s"));
                callsOutByCellId.on('renderlet.a',function (chart) {
                    // rotate x-axis labels
                    chart.selectAll('g.x text')
                        .attr('transform', 'translate(-10,10) rotate(315)');
                });


				//Call by Date/Hour
				//var dateHourTotal = dc.rowChart(".active #dateHour-chart", "detcDetail");
				var dateHourTotal = dc.barChart(".active #dateHour-chart", "detcDetail");

			/*	dateHourTotal
				//  .width(380)
				//	.height(220)
				//  .yAxisLabel("Detections")
				//.xAxisLabel("Count")
					.dimension(trafficHourDimension)
					.group(totalCallsByHour)
					.elasticX(true)
					.xAxis();*/

				dateHourTotal
					.transitionDuration(1000)
					.dimension(trafficHourDimension)
					//.group(totalSumOutDurationByCell)//.top(30)
					.group(totalCallsByHour) // CODE FROM HOURLY FRAUD===========================
					.margins({top: 10,right: 50,bottom: 50,left: 50})
					.centerBar(false)
					//.xAxisLabel("Cell Id")
					.yAxisLabel("Detections").gap(5).elasticY(true)
					.x(d3.scale.ordinal().domain(topDurationCellIdDim)).xUnits(dc.units.ordinal)
					.renderHorizontalGridLines(true).
				     renderVerticalGridLines(true).ordering(
					function (d) {
						return d.value;
					}).yAxis().tickFormat(d3.format("s"));



				dateHourTotal.on('renderlet.a',function (chart) {
					// rotate x-axis labels
					chart.selectAll('g.x text')
						.attr('transform', 'translate(-10,10) rotate(315)');
				});

				//pie chart
				var dateHourPieChart = dc.pieChart(".active #dateHour-piechart", "detcDetail");

				dateHourPieChart
					.radius(90)
					.innerRadius(40)
					.transitionDuration(1000)
					//.slicesCap(10)
					.dimension(trafficHourDimension)
					.group(totalCallsByHour);
				//end pie chart



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
                        "lengthMenu": [[25, 50, -1], [25, 50, "All"]],
							"bDestroy": true,
							"fnRowCallback": function (nRow, aData, iDisplayIndex) {
							/*	$('td', nRow).attr('nowrap', 'nowrap');
								return nRow;*/
								$('.dataTables_filter input[type="search"]').
								attr('placeholder','Search here...').
								css({'width':'100px','height':'5px','display':'inline-block'});
							},
							"data": dataSet,
							"order": [[ 0, "desc" ]],
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
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										if (data == 0) {
											return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popAddCorp(" + data + ");\" class='colLnk'>" + 'Assign' + '</a>';
										}
										else {

											//return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popDect(" + data + ",'CELL');\" class='colLnk'>" + data + '</a>';
											return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popUpdateCorp('" + data + "','CorpId');\" class='colLnk'>" + data + '</a>';

										}
								}
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
									"mData": "imei",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										//return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popWnd(" + data+ ","+row.insert_time.format("YYYY-MM-DD hh:mm:ss")+",'IMSI');\" class='colLnk'>" + data + '</a>';
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popWnd(" + data + "," + row.insert_time + ",'IMEI');\" class='colLnk'>" + data + '</a>';

									}
								}, {
									"mData": "lac",
									"sDefaultContent": ""
								}, {
									"mData": "cell_id",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popDect(" + data + ",'CELL_ID');\" class='colLnk'>" + data + '</a>';
									}
								}, {
									"mData": "vendor",
									"sDefaultContent": ""
								},{
									"mData": "model",
									"sDefaultContent": ""
								}, {
									"mData": "calls",
									"sDefaultContent": ""
								}, {
									"mData": "mou_before",
									"sDefaultContent": ""
								}, {
									"mData": "module",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										 if (data) {
											 return "H";
										 }
										 return "M";
									}

								}, {
									"mData": "subid",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popDect(" + data + ",'SUBID');\" class='colLnk'>" + data + '</a>';
									}
								}, {
									"mData": "dealerid",
									"sDefaultContent": "",
									"mRender": function (data, type, row) {
										return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popDect(" + data + ",'DEALERID');\" class='colLnk'>" + data + '</a>';
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
								}
								/*, {
									"mData": "status",
									"sDefaultContent": ""
								}*/, {
									"mData": "shutdown_file",
									"sDefaultContent": ""
								}

								/*{
									"mData": "false_positive",
									"sDefaultContent": ""
								}*/

								],
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
									}/*,
									{
										extend: 'pdfHtml5',
										title: 'DetectionDetails'
									}*/]
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
				var rowCount=datatable.fnGetData().length;

				if (rowCount > 0) {
					document.getElementById('dd_record_count').innerHTML =rowCount;
					//dc.renderAll("dailyKpi" + reportType);
				}
				else {
					//$ ("#" + reportType + "table_collapse").hide();

				}

					$('#ajax_loader').hide();
				}
			} //====================END MAKEGRAPHS FUNCTION

		$("#saveCorp").on("click",function(){
			var corporateId = $("#corporateId").val();
			var corporateName = $("#corporateName").val();
			var msisdn = $("#msisdn").val();
			var comment = $("#comment").val();

            console.log("Req Parameters::","1",corporateId,"2", corporateName,"3",msisdn,"4",comment);
            //var url = clientHTTPConfig.appContextRoot+'/dataaccess/addcorporatesummary?corporateId='+corporateId+'&corporateName='+corporateName+'&msisdn='+msisdn+'&comment='+comment;

			//url += "?sql=upsert into core_605_3.corporate_detail (id,corporate_id, corporate_name, msisdn, comment,insert_time)" +
            //        " values (NEXT VALUE FOR core_605_3.SEQ_CORPORATE_DETAIL,'"+corporateId+"','"+corporateName+"','"+msisdn+"','"+comment+"',current_time() )";

			var url = clientHTTPConfig.appContextRoot+"/dataaccess/corporatedetail";
			var condition = "";

			condition = concatParamOther(condition, "action", "=", "addOrUpdate");
			condition = concatParamOther(condition, "corporateId", "=", corporateId);
			condition = concatParamOther(condition, "corporateName", "=", corporateName);
			condition = concatParamOther(condition, "msisdn", "=", msisdn);
			condition = concatParamOther(condition, "comment", "=", comment);

			url += "?" + condition;

			console.log( "=============Invoking saveCorp (user click) in detectionDetails PAGE=============" );
			 console.log("URL is"+url);
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

		popCorpInfo : function(data,type){
			console.log("============ Executing popCorpInfo============");
			//$('#orderModal').modal('show');
			var url = clientHTTPConfig.appContextRoot+'/setpreferences';
			console.log("Show Corp Info",url);
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
			popAddCorp : function(data){
				$('#detectionDetailModal').modal('show');
			},

		popUpdateCorp : function(data){

			$('#detectionDetailModal').modal('show');
		}

	}	//================END of DETECTION POP
	
		
		function returnResult(error, apiData){
			console.log("============ Executing returnResult() function in detectionDetails.js (Add Corporate Info)==============");
			if(apiData!=null){
				var status = apiData[0].status;
				if(status == true){
					$('#detectionDetailModal').modal('hide');
				}else{
					$('#message').attr("hidden",false);
				}
			}
			
		}


/*$('#orderModal').modal({
	keyboard: true,
	backdrop: "static",
	show:false,

}).on('show', function(){
	var getIdFromRow = 55;
	//make your ajax call populate items or what even you need
	$(this).find('#orderDetails').html($('<b> Order Id selected: ' + getIdFromRow  + '</b>'))
});

/!*
$(".table-striped").find('tr[data-target]').on('click', function(){
	//or do your operations here instead of on show of modal to populate values to modal.
	$('#orderModal').data('orderid',$(this).data('id'));
});*!/*/

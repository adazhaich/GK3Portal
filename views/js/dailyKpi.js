$(document).ready(function () {

    $(window).resize(function () {
        //console.log("resizing");
        dc.renderAll("dailykpi" + reportType);
    });

    //$("#graph_collapse_button").click(function () {
   //     dc.renderAll("dailyKpi" + reportType);
   // });


    var reportType = getElement("#reportType").val();

    //set default date range wqhen user clicks on the report tab
    var startDate = new Date();
    startDate.setDate(new Date().getDate()  - getDateRange(dailyKPI));
    var start = $("#" + reportType + "start").val(getFormattedDate(startDate)).val();
    var end = $("#" + reportType + "end").val(getFormattedDate(new Date())).val();


    Zoomerang.config({
        maxHeight: 400,
        maxWidth: 800
    }).listen('.zoom');




    getElement("#" + reportType + "refresh").on(
        "click",
        function () {
            //console.log("Button clicked after entering Start/End Dates");

            if (getElement("#" + reportType + "start").val() === undefined)
                alert("Please select a start date");
            start = getElement("#" + reportType + "start").val() === undefined ? "" : getElement("#" + reportType + "start").val();
            end = getElement("#" + reportType + "end").val() === undefined ? "" : getElement("#" + reportType + "end").val();

            //begin start/end dates validation
            if (dateValidate(start, end)) {
                //console.log("start=", start, "end=", end);
                DAILYKPI.filter(start, end);
            } //end of start/end dates validation
        });



    var datatable;

    DAILYKPI = {
        filter: function (start, end) {
            var url = clientHTTPConfig.appContextRoot + "/dataaccess/dailykpi";
            console.log('dailyKpi.js:start:', start, ' end:', end);
            url += "?reportType=" + reportType + "&start=" + start + "&end=" + end;
           console.log("RESTFul call URL  to retrieve DailyKPI data:", url);
            $('#ajax_loader').show();
            queue().defer(d3.json, url).await(this.makeGraphs);
        },


        //=========================BEGIN of makegraphs function call========================
        makeGraphs: function (error, apiData) {
            var reportType = getElement("#reportType").val();
            //console.log('makeGraphs: error:', error, "apiData.length:", apiData.length);
            var dataSet = apiData;
            if (!dataSet || dataSet.length == 0) {

                if (d3.selectAll("svg").isEmpty) {
                    // alert("Do Nothing");
                }
                else {
                    //  alert("Remove existing graphs");
                    d3.selectAll("svg").remove();
                }

              //  $("#" + reportType + "graph_collapse").hide();
               // $("#" + reportType + "table_collapse").hide();
                //alert("Empty Dataset for"+reportType);
                datatable.fnClearTable();
                document.getElementById('record_count').innerHTML =0;
                $('#ajax_loader').hide();
                return;
            }

          //  else {
                //console.log('makeGraphs():dataSet:', dataSet.length);
                //alert("Available Dataset for"+reportType);
                //alert("#"+reportType + "graph_collapse");
             //   $("#" + reportType + "graph_collapse").show();
             //   $("#" + reportType + "table_collapse").show();
                var newDetectionsData = [];
                var medianLossData = [];

                dataSet.forEach(function (d) {
                    if (d) {
                        d.fraud_activity_count = +d.fraud_activity_count;
                        d.fraud_activity_total_loss = +d.fraud_activity_total_loss;

                        //new detections pie chart
                        newDetectionsData.push({"detectionType": "gk_new_count", value: d.gk_new_count});
                        newDetectionsData.push({"detectionType": "gkc_new_count", value: d.gkc_new_count});
                        newDetectionsData.push({"detectionType": "tcg_new_count", value: d.tcg_new_count});
                        newDetectionsData.push({
                            "detectionType": "other_tcg_new_count",
                            value: d.other_tcg_new_count
                        });
                        newDetectionsData.push({
                            "detectionType": "other_fms_new_count",
                            value: d.other_fms_new_count
                        });

                        //median Loss pie chart
                        medianLossData.push({
                            "medianLossType": "median_loss_before",
                            value: d.median_loss_before
                        });
                        medianLossData.push({
                            "medianLossType": "median_loss_after",
                            value: d.median_loss_after
                        });

                        // use original data from table instead
                        /*							if (d.fraud_activity_mou_before && d.fraud_activity_mou_after) {
                         d.fraud_activity_mou_total = d.fraud_activity_mou_before
                         + d.fraud_activity_mou_after;
                         }
                         */
                       if (d.traffic_date) {
                            d.traffic_date = moment(d.traffic_date,"YYYY-MM-DD");
//								d.traffic_date = moment(d.traffic_date);
                        }
                        if (d.update_time) { // update based on final hive table structure
                            d.update_time = new Date(d.update_time);
                            d.update_time_string = d.update_time.getFullYear() + "-"
                                + (d.update_time.getMonth() + 1) + "-"
                                + d.update_time.getDate();
                        }
                    }
                });





                var ndx = crossfilter(dataSet);

                /*
                 * var callTimeDimension = ndx.dimension(function(d) { return
                 * d.traffic_date; });
                 */
                var trafficDayDimension = ndx.dimension(function (d) {
                    return d.traffic_date;
                });
                var trafficHourDimension = ndx.dimension(function (d) {
                    return d.traffic_date.format("HH");
                });


                var all = ndx.groupAll();

                var simsGroupByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.fraud_activity_count * 1;
                });

                var totalLossByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.fraud_activity_total_loss;
                });

                var medianLossBeforeByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.median_loss_before;
                });

                var medianLossAfterByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.median_loss_after;
                });

                var gkNewCountByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.gk_new_count;
                });

                var gkcNewCountByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.gkc_new_count;
                });

                var tcgNewCountByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.tcg_new_count;
                });


                var otherTcgNewCountByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.other_tcg_new_count;
                });

                var otherFmsNewCountByDate = trafficDayDimension.group().reduceSum(function (d) {
                    return d.other_fms_new_count;
                });

                var totalNewCountByDate = trafficDayDimension.group().reduceSum(function (d) {
                    //todo: change to retrieve from Hive column once available
                    return d.total_new_count;
                });

                // Define threshold values for data
                var maxDate, minDate, minHour, maxHour = 0;
                if (trafficDayDimension.bottom(1)[0] != undefined) {
                    minDate = trafficDayDimension.bottom(1)[0].traffic_date;
                    maxDate = trafficDayDimension.top(1)[0].traffic_date;
                    ////console.log("minDate:", minDate);
                    ////console.log("maxDate:", maxDate);
                    if (trafficDayDimension.bottom(1)[0].update_time != undefined) {
                        minHour = trafficHourDimension.bottom(1)[0].update_time.getUTCHours();
                        maxHour = trafficHourDimension.top(1)[0].update_time.getUTCHours();
                        ////console.log("minHour:", minHour);
                        ////console.log("maxHour:", maxHour);
                    }
                }

                reportType = getElement("#reportType").val();

                //=============================Declare ALL Charts
                var fraudActivity = dc.compositeChart("#" + reportType + "fraudActivity-chart", "dailyKpi" + reportType);
                var medianLoss = dc.barChart("#" + reportType + "medianLoss-chart", "dailyKpi" + reportType);
                var medianLossPieChart = dc.pieChart("#" + reportType + "medianLoss-pieChart", "dailyKpi" + reportType);
                var newDetections = dc.barChart("#" + reportType + "newDetections-chart", "dailyKpi" + reportType);
                var newDetectionsPieChart = dc.pieChart("#" + reportType + "newDetections-pieChart", "dailyKpi" + reportType);


                fraudActivity
                //.height(220)
                //.width(200)
                    .x(d3.time.scale().domain([minDate, maxDate]))
                    .round(d3.time.day.round)
                    .xUnits(d3.time.days)
                    .margins({left: 55, top: 20, right: 55, bottom: 50})
                    .legend(
                        dc.legend().x(80).y(20).itemHeight(13).gap(5))
                    .renderHorizontalGridLines(true)
                    .compose(
                        [
                            dc.lineChart(fraudActivity).dimension(
                                trafficDayDimension).colors('blue').group(
                                totalLossByDate, "Loss").useRightYAxis(
                                false).dashStyle([5, 5]),
                            dc.lineChart(fraudActivity).dimension(
                                trafficDayDimension).colors('red').group(
                                simsGroupByDate, "Sims")
                                .useRightYAxis(true).dashStyle([2, 2])])
                    .brushOn(true).yAxisLabel("Loss")
                    .rightYAxisLabel("Sims", 20)
                    .legend(dc.legend().x(75).y(0).autoItemWidth(true).horizontal(10))
                    // rotate x-axis labels
                    .on('renderlet.a',function (chart) {
                        chart.selectAll('g.x text').attr('transform', 'translate(-10,10) rotate(315)');
                     })
                    .render()

                //=========================================== MEDIAN LOSS BAR  CHART ========================================
                medianLoss
                    //.x(d3.time.scale().domain([ minDate, maxDate ]))
                    .x(d3.time.scale().domain([d3.time.day.offset(minDate, -1), d3.time.day.offset(maxDate, 2)]))
                    .round(d3.time.day.round)
                    .xUnits(d3.time.days)
                    .margins({left: 50, top: 20, right: 50, bottom: 55})
                    .brushOn(true)
                    .clipPadding(10)
                    .title(function (d) {
                        var date = new Date(d.key);
                        return '[' + this.layer + ']: ' + date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + ":" + d.value;
                    })
                    .yAxisLabel("Median Loss")
                    .dimension(trafficDayDimension)
                    .group(medianLossBeforeByDate, "Before")
                    .legend(dc.legend().x(50).y(0).autoItemWidth(true).horizontal(10)) //dc.legend().x(140).y(0).gap(5)
                    .renderLabel(true);

           medianLoss.on('renderlet.a',function (chart) {
               // rotate x-axis labels
               chart.selectAll('g.x text')
                   .attr('transform', 'translate(-10,10) rotate(315)');
           });


        /*    medianLoss.renderlet(function (chart) {
                // rotate x-axis labels
                chart.selectAll('g.x text')
                    .attr('transform', 'translate(-10,10) rotate(315)');
            });*/

                medianLoss.stack(medianLossAfterByDate, "After");
                medianLoss.render();

                //=========================================== MEDIAN LOSS PIE CHART ========================================
                var medianLossNdx = crossfilter(medianLossData);
                var medianLossDimension = medianLossNdx.dimension(function (d) {
                    return d.medianLossType;
                });
                var medianLossGroup = medianLossDimension.group().reduceSum(function (d) {
                    return d.value;
                });

                medianLossPieChart
                    .radius(60)
                    .innerRadius(20)
                    .externalLabels(30)
                    .dimension(medianLossDimension)
                    .group(medianLossGroup);

                medianLossPieChart.render();

                //=========================================== NEW DETECTIONS BAR GRAPH ========================================
                newDetections
                    .x(d3.time.scale().domain([d3.time.day.offset(minDate, -1), d3.time.day.offset(maxDate, 2)]))
                    .round(d3.time.day.round)
                    .xUnits(d3.time.days)
                    .margins({left:35, top: 20, right: 50, bottom: 50})
                    .brushOn(true)
                    .gap(1)
                    //				    .clipPadding(10)
                    .title(function (d) {
                        var date = new Date(d.key);
                        return '[' + this.layer + ']: ' + date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + ":" + d.value;
                    })
                    .yAxisLabel("New Detections")
                    .dimension(trafficDayDimension)
                    .group(gkNewCountByDate, "GK")
                    .renderLabel(true)
                    .legend(dc.legend().x(40).y(0).autoItemWidth(true).horizontal(200)); //dc.legend().x(140).y(0).gap(5)

            newDetections.on('renderlet.a',function (chart) {
                // rotate x-axis labels
                chart.selectAll('g.x text')
                    .attr('transform', 'translate(-10,10) rotate(315)');
            });


                newDetections.stack(gkcNewCountByDate, "GK-C");
                newDetections.stack(tcgNewCountByDate, "TCG");
                newDetections.stack(otherTcgNewCountByDate, "Other TCG");
                newDetections.stack(otherFmsNewCountByDate, "Other FMS");

                newDetections.render();

                //new detections pie chart
                var newDetectionsNdx = crossfilter(newDetectionsData);
                var newDetectionsDimension = newDetectionsNdx.dimension(function (d) {
                    return d.detectionType;
                });
                var newDetectionsGroup = newDetectionsDimension.group().reduceSum(function (d) {
                    return d.value;
                });


                //=========================================== NEW DETECTIONS PIE CHART ========================================
                newDetectionsPieChart
                    .radius(60)
                    .innerRadius(20)
                    .externalLabels(40)
                    .dimension(newDetectionsDimension)
                    .group(newDetectionsGroup)
                   // .height(200)
                    .legend(dc.legend());

                newDetectionsPieChart.render();


                //====================START OF GRID DATA RENDERING
                datatable = $("#" + reportType + "dailyKpi-datatable").dataTable({
                    "bPaginate": true,
                    "colReorder": true,
                    "bLengthChange": true,
                    "sScrollX": "100%",
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": true,
                    "bAutoWidth": true,
                    "bDeferRender": true,
                    "bDestroy": true,
                    "data": dataSet,
                    "order": [[ 0, "desc" ]],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                        //$('th', nRow).attr('wrap', 'wrap');
                        $('td', nRow).attr('nowrap', 'nowrap');
                        return nRow;
                    },
/*
                    "language": {
                        "lengthMenu": "Display _MENU_ records per page",
                        "zeroRecords": "Nothing found - sorry",
                        "info": "Showing page _PAGE_ of _PAGES_",
                        "infoEmpty": "No records available",
                        "infoFiltered": "(filtered from _MAX_ total records)"
                    },
*/
                    "aoColumns": [ //TODO: may need to change when switching to Hive: 33 columns on UI, 33 used columns here, 37 columns in
                        // Hive, 33 columns in MySql
                        {
                            "mData": "traffic_date",
                            "sDefaultContent": "",
                            "mRender": function (data, type, row) {
                                return data.format("YYYY-MM-DD");
                            }
                        }
                        /*
                         * TODO: will use report_type to differentiate among Reports: ONSITE, OFF-SITE and CORPORATE
                         * ,{ "mData": "report_type", "sDefaultContent": "" }
                         */, {
                            "mData": "gk_new_count",
                            "sDefaultContent": "",
                            "mRender": function (data, type, row) {
                                //debug
                                return "<a href='javascript:void(0);' onclick=\"DAIlYKPIPOP.popDect(" + data + "," + row.traffic_date.format('YYYYMMDD') + ",'GK');\" class='colLnk'>" + data + '</a>';
                            }
                        }, {
                            "mData": "gkc_new_count",
                            "sDefaultContent": "",
                            "mRender": function (data, type, row) {
                                return "<a href='javascript:void(0);' onclick=\"DAIlYKPIPOP.popDect(" + data + "," + row.traffic_date.format('YYYYMMDD') + ",'GKC');\" class='colLnk'>" + data + '</a>';
                            }
                        }, {
                            "mData": "tcg_new_count",
                            "sDefaultContent": "",
                            "mRender": function (data, type, row) {
                                return "<a href='javascript:void(0);' onclick=\"DAIlYKPIPOP.popDect(" + data + "," + row.traffic_date.format('YYYYMMDD') + ",'TCG');\" class='colLnk'>" + data + '</a>';
                            }
                        }, {
                            "mData": "other_tcg_new_count",
                            "sDefaultContent": ""
                        }, {
                            "mData": "other_fms_new_count",
                            "sDefaultContent": ""
                        }, {
                            "mData": "total_new_count",
                            "sDefaultContent": "",
                            "mRender": function (data, type, row) {
                                return "<a href='javascript:void(0);' onclick=\"DAIlYKPIPOP.popDect(" + data + "," + row.traffic_date.format('YYYYMMDD') + ",'TOTAL');\" class='colLnk'>" + data + '</a>';
                            }
                        }, {
                            "mData": "total_balance_remaining",
                            "sDefaultContent": "tbr"
                        }
                        , {
                            "mData": "fraud_activity_count",
                            "sDefaultContent": ""
                        } // Sims
                        , {
                            "mData": "fraud_activity_mou_before",
                            "sDefaultContent": "fraud_activity_mou_before"
                        }, {
                            "mData": "fraud_activity_mou_after",
                            "sDefaultContent": "fraud_activity_mou_after"
                        }, {
                            "mData": "fraud_activity_mou_total",
                            "sDefaultContent": "fraud_activity_mou_total"
                        }, {
                            "mData": "fraud_activity_total_loss",
                            "sDefaultContent": "fraud_activity_mou_total"
                        } // total
                        , {
                            "mData": "median_mou_before_gk",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_before_gkc",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_before_tcg",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_before_other_tcg",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_before_other_fms",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_before_total",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_after_gk",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_after_gkc",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_after_tcg",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_after_other_tcg",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_after_other_fms",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_mou_after_total",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_loss_before",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_loss_after",
                            "sDefaultContent": ""
                        }, {
                            "mData": "median_loss_total",
                            "sDefaultContent": ""
                        }, {
                            "mData": "remaining_balance",
                            "sDefaultContent": ""
                        } // "Remaining Balance" under Median Loss
                        , {
                            "mData": "false_positive_gk_count",
                            "sDefaultContent": ""
                        }, {
                            "mData": "false_positive_gk_percentage",
                            "sDefaultContent": ""
                        }, {
                            "mData": "false_positive_gkc_count",
                            "sDefaultContent": ""
                        }, {
                            "mData": "false_positive_gkc_percentage",
                            "sDefaultContent": ""
                        }],
                    "sDom": 'ZlfrBtip',
                    "colResize": {
                        "tableWidthFixed": false
                    },
                    "oLanguage": {
                        "sEmptyTable": "No data available for the start and end dates you selected"
                    },
                    buttons: [{
                        extend: 'collection',
                        text: 'Export',
                        buttons: [ //BEGIN OF DOWNLOAD OPTIONS

                            {
                            extend: 'copyHtml5',
                            title: 'DailyKpi'
                           },
                            {
                                extend: 'csvHtml5',
                                title: 'DailyKpi'
                            },
                            {
                                extend: 'excelHtml5',
                                // text: 'Save as Excel',
                                title: 'DailyKpi',
                                customize: function( xlsx ) {
                                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                    $('row:first c', sheet).attr( 's', '42' );
                                }
                            },
                        /*    {
                                extend: 'pdfHtml5',
                                title: 'DailyKpi',
                                exportOptions: {
                                    columns: [ 0, 1, 2, 5 ]  //We can specify the columns that should be part of the  downloaded PDF,Currently PDF is not displaying all the columns.
                                }
                            }*/

                            ] //END OF DOWNLOAD OPTIONS
                    }] //END OF BUTTONS DECLARATION
                });  //END OF RENDER DATA TABLE

                function RefreshTable() {
                    dc.events.trigger(function () {
                        logger.debug("Calling REFRESHTABLE in dailykpi.js");

                        alldata = trafficDayDimension.top(Infinity);
                        datatable.fnClearTable();
                        datatable.fnAddData(alldata);
                        datatable.fnDraw();
                    });
                }

                for (var i = 0; i < dc.chartRegistry.list().length; i++) {
                    var chartI = dc.chartRegistry.list()[i];
                    chartI.on("filtered", RefreshTable);
                }
                //dc.renderAll("dailyKpi" + reportType);

            var rowCount=datatable.fnGetData().length;

              if (rowCount > 0) {
                  document.getElementById('record_count').innerHTML =rowCount;
                  dc.renderAll("dailyKpi" + reportType);
              }
              else {
                  $ ("#" + reportType + "table_collapse").hide();

              }
            $('#ajax_loader').hide();

           // }//END OF ELSE
        } //=========================END of makegraphs function call========================
    }
    ////console.log("Rendering DailyKPI data on PAGE LOAD with default start date:", start, " and default end date", end);


    DAILYKPI.filter(start, end);



});

DAIlYKPIPOP = {
    popDect: function (data, day, type) {
        //console.log("popDect(", data, day, type, ")");
        var url = clientHTTPConfig.appContextRoot + '/drilldown/detectiondetails?data=' + data + '&day=' + day + '&type=' + type;
        window.open(
            url,
            '_blank',
            'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
    }
}




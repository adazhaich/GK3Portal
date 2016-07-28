$(document).ready(function () {
    //console.log("drilldetectiondetails.js");
//	var day = $("#day").val();
    var type = $('#type').val();
    var data = $('#data').val();
    var date = $('#date').val();
    $("#query").on("click", function () {
        var type = $('#type').val();
        var data = $('#data').val();
        var date = $('#date').val();
        go(type, data, date)
    });

    function go(data, date, type) {
        var url = clientHTTPConfig.appContextRoot + "/dataaccess/detectiondetails";
        var condition = "";
        if (type == "DEALER") {
            condition = concatParam(condition, "dealerid", "=", "'" + data + "'");
            url += "?condition=" + condition;
        } else if (type == "SUB") {
            condition = concatParam(condition, "subid", "=", "'" + data + "'");
            url += "?condition=" + condition;
        } else if (type == "CELL") {
            condition = concatParam(condition, "cell_id", "=", "'" + data + "'");
            url += "?condition=" + condition;
        } else {
            condition = concatParamOther(condition, "action", "=", "first_detection");
            condition = concatParamOther(condition, "type", "=", type);
            condition = concatParamOther(condition, "traffic_date", "=", +date);
            //console.log("search criteria:::" + condition);
            url += "?" + condition;
        }//type=TOTAL or GKP or GKC or TCG

//    $('#ajax_loader').show();
        queue()
            .defer(d3.json, url).await(loadData);
    }

    go(data, date, type);

});

function popWnd(data, day, type) {
    var unixDay = moment(day);
    var date = unixDay.format("YYYYMMDD");
    var hour = unixDay.format("HH");

    //var url = clientHTTPConfig.appContextRoot + '/drilldown/callsnodup?data=' + data + '&day=' + date + '&hour=' + hour + '&type=' + type;
    var url = clientHTTPConfig.appContextRoot+'/drilldown/callsnodup?data='+data+'&day='+date+'&hour='+hour+'&type='+type;

    window.open(
        url,
        '_blank',
        'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}

function popDealer(data) {
    var url = clientHTTPConfig.appContextRoot + '/drilldown/dealerdetail?dealerId=' + data;
    window.open(
        url,
        '_blank',
        'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}
function popSub(data) {
    var url = clientHTTPConfig.appContextRoot + '/drilldown/subdetail?subId=' + data;
    window.open(
        url,
        '_blank',
        'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}

function popMap(cellId, imsi, msisdn) {
    var url = clientHTTPConfig.appContextRoot + '/map?cellId=' + cellId + '&imsi=' + imsi + '&msisdn=' + msisdn;
    window.open(
        url,
        '_blank',
        'height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
}

function loadData(error, apiData) {
    var dataSet = apiData;
    if (!dataSet || dataSet.length == 0) {
        //console.log("No data retrieved. Do nothing");
        $("#detectiondetail-datatable").dataTable().fnClearTable();

    }
    dataSet.forEach(function (d) {
        if (d.call_time) {
            //Phoenix: call_time is already time
            d.call_time = new Date(d.call_time);
        }
        if (d.insert_time) {
            //d.insert_time = new Date(d.insert_time);
            d.insert_time = moment(d.insert_time, "YYYY-MM-DD HH:mm:ss");  // "2016-07-13 15:17:38.46",
            //d.insert_time_str = d.insert_time;

        }
    });

    var ndx = crossfilter(dataSet);

    var callTimeDimension = ndx.dimension(function (d) {
        return d.call_time;
    });


    var datatable = $("#detectiondetail-datatable").dataTable(
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
                    "mData": "call_date_hour",
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
                    "sDefaultContent": ""
                }, {
                    "mData": "msisdn",
                    "sDefaultContent": "",
                    "mRender": function (data, type, row) {
                        return "<a href='javascript:void(0);' onclick=\"popWnd(" + data + "," + row.insert_time + ",'MSISDN');\" class='colLnk'>" + data + '</a>';

                    }
                }, {
                    "mData": "imsi",
                    "sDefaultContent": "",
                    "mRender": function (data, type, row) {
                        //TODO: switch to detection_time once service is updated
                        return "<a href='javascript:void(0);' onclick=\"popWnd(" + data + "," + row.insert_time + ",'IMSI');\" class='colLnk'>" + data + '</a>';
                    }
                }, {
                    "mData": "cell_id",
                    "sDefaultContent": "",
                    "mRender": function (data, type, row) {
                        //TODO: switch to detection_time once service is updated
                        //return '<a class="colLnk" onclick="popMap(' + data + ',' + row.imsi + ',' + row.msisdn + ')">' + data + '</a>'; //NOT RENDERING MAP CORRECTLY=====================
			              return "<a href='javascript:void(0);' onclick=\"popMap(" + data + ",'CELL');\" class='colLnk'>" + data + '</a>'; //COPIED FROM DETECTIONDETAILS.JS===============
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
                    "mData": "handset_make",
                    "sDefaultContent": ""
                }, {
                    "mData": "subid",
                    "sDefaultContent": "",
                    "mRender": function (data, type, row) {
                        return "<a href='javascript:void(0);' onclick=\"popSub(" + data + ");\" class='colLnk'>" + data + '</a>';
                    }
                }, {
                    "mData": "dealerid",
                    "sDefaultContent": "",
                    "mRender": function (data, type, row) {
                        return "<a href='javascript:void(0);' onclick=\"popDealer(" + data + ");\" class='colLnk'>" + data + '</a>';
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
//				"sDom" : '<"wrapper"flBtip>',
            "sDom": 'ZlfrBtip',
            "colResize": {
                "tableWidthFixed": false
            },
            buttons: [{
                extend: 'collection',
                text: 'Export',
                buttons: [{
                    extend: 'copyHtml5',
                    title: 'DrillDetectionDetails'
                },
                    {
                        extend: 'csvHtml5',
                        title: 'DrillDetectionDetails'
                    },
                    {
                        extend: 'excelHtml5',
                        title: 'DrillDetectionDetails'
                    },
                    {
                        extend: 'pdfHtml5',
                        title: 'DrillDetectionDetails'
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
    $('#ajax_loader').hide();
};


$(document).ready(function(){
	//console.log('hotBNumber.js');	
	var startDate = new Date();
	startDate.setDate(new Date().getDate() - getDateRange(hotBNumber));
	var start = $("#start").val(getFormattedDate(startDate)).val();
	var end = $("#end").val(getFormattedDate(new Date())).val();

	var day = getElement("#day").val()  === undefined ? "" : getElement("#day").val() ;


	//start = getElement("#start").val() === undefined ? "" : getElement("#start").val() ;
    //end = getElement("#end").val() === undefined ? "" : getElement("#end").val() ;
    source = getElement("#hbnsource").val() === undefined ? "" : getElement("#hbnsource").val() ;
    filterSql = getElement("#filterSql").val()  === undefined ? "" : getElement("#filterSql").val();




	HOTBNUMBER = {
    		 filter : function(day, start, end, source,filterSql){
    			var url = clientHTTPConfig.appContextRoot+"/dataaccess/hotbnumber";
    			var condition = "";
                 condition = concatParamOther(condition, "action", "=", "filter");
				 //Data Access Success from http://10.212.2.143:8080/hotbnumber?limit=-1
    			if(day != '')
    				condition = concatParam(condition, "call_date", "=", "'" + moment(day).format("YYYYMMDD") + "'");

                 if (start != undefined && start != "") {
                     startDate = moment(start).format("YYYYMMDD");
                     condition = concatParamOther(condition, "startDate", "=", +startDate);
                 }
                 if (end != undefined && end != "") {
                     endDate = moment(end).format("YYYYMMDD");
                 condition = concatParamOther(condition, "endDate", "=", +endDate);
             }

            if (filterSql != ""){
        if(condition == "")
            condition += filterSql.replace(" and", "");
        else condition += filterSql;
    }
        //url += "?condition="+condition;
         url += "?" + condition;



                 //console.log( "filter url=", url );
    		    $('#ajax_loader').show();
    			queue().defer(d3.json, url).await(this.makeGraphs);
    		},
    		makeGraphs : function(error, apiData) {
    			var dataSet = apiData;
    			////console.log('makeGraphs():dataSet:', dataSet.length);
    			if (!dataSet || dataSet.length == 0){
    				//console.log("No data retrieved. Do nothing");
    				$("#hotbnumber-datatable").dataTable().fnClearTable();
    			 	$('#ajax_loader').hide();
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
                    "lengthMenu": [[10, 25, -1], [10, 25, "All"]],
    		        "bDestroy": true,
					"order": [[ 0, "desc" ]],
    		        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
    		            $('td', nRow).attr('nowrap','nowrap');
    		            return nRow;
				/*		$('.dataTables_filter input[type="search"]').
						attr('placeholder','Search here...').
						css({'width':'100px','height':'5px','display':'inline-block'});*/
    		         },
					"fnDrawCallback": function (oSettings) {
						/*     $(".dataTables_filter").each(function () {
						 $(this).appendTo($(this).parent().siblings(".panel-body"));
						 });*/
						$('.dataTables_filter input[type="search"]').
						attr('placeholder','Search here...').
						css({'width':'100px','height':'20px','display':'inline-block'});
					},

					"data": dataSet,
    		            "aoColumns": [
    		             { "mData": "call_date", "sDefaultContent": "",
    		            	 "mRender" : function(data, type, row) {
    							// data is bigint
//    							return transferUnixTime(data);
    		            		 //call_date now is 20160227 -- use Moment.js library
    		            		 var day = moment(data, "YYYYMMDD");
    		            		 return day.format("YYYY-MM-DD");
    						}
    		             }
    	/*	            ,{ "mData": "call_id", "sDefaultContent": "" } //removed per discussion with Shashank etc
    	*/
    		             ,{ "mData": "a_msisdn", "sDefaultContent": "",
    		            	 "mRender":function(data,type,row){
    		             		return "<a href='javascript:void(0);' onclick=\"HOTPOP.popHot(" + data+ ",'A_MSISDN');\" class='colLnk'>" + data + '</a>';
                                // return "<a href='javascript:void(0);' onclick=\"DETECTIONPOP.popWnd(" + data + "," + row.insert_time + ",'MSISDN');\" class='colLnk'>" + data + '</a>';
    		             	}
    		             }
    		            ,{ "mData": "b_msisdn", "sDefaultContent": "" ,
    		            	"mRender":function(data,type,row){
    		            		return "<a href='javascript:void(0);' onclick=\"HOTPOP.popHot(" + data+ ",'B_MSISDN');\" class='colLnk'>" + data + '</a>';
    		            	}	
    		            }
    		            ,{ "mData": "call_time", "sDefaultContent": "",
							"mRender" : function(data, type, row) {
								return moment(data).format("YYYY-MM-DD hh:mm:ss");
							}
    		            }
    		            ,{ "mData": "duration", "sDefaultContent": ""}          
    		            ,{ "mData": "cell_id", "sDefaultContent": "",
    		            	"mRender":function(data,type,row){
    		            		return "<a href='javascript:void(0);' onclick=\"HOTPOP.popHot(" + data+ ",'CELL_ID');\" class='colLnk'>" + data + '</a>';
    		            	}
    		            } 
    		            ,{ "mData": "lac", "sDefaultContent": ""}
    		            ,{ "mData": "imei", "sDefaultContent": ""}
    		            ,{ "mData": "source", "sDefaultContent": "",
								"mRender": function (data, type, row) {
									switch (data) {
										case null:
											return "undefined";
										case 'A':
											return "Standard TCG";
										case 'a':
											return "Standard TCG";
										case 'B':
											return "BTCG";
										case 'b':
											return "BTCG";
										default:
											return data;
									}
								}
    		            }
    		            ,{ "mData": "insert_time", "sDefaultContent": "",
    		            	 "mRender" : function(data, type, row) {
    		            		 return moment(data).format("YYYY-MM-DD hh:mm:ss");
    							}
    		            }            
    		            ,{ "mData": "update_time", "sDefaultContent": "",
    		            	 "mRender" : function(data, type, row) {
    		            		 return moment(data).format("YYYY-MM-DD hh:mm:ss");
    							}
    		            }
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
										title:'HotBNumber'
	    							}, 
	    							{
	    								extend:'csvHtml5',
	    								title:'HotBNumber'
	    							}, 
	    							{
	    								extend:'excelHtml5',
	    								title:'HotBNumber'
	    							},
	    							{
	    								extend:'pdfHtml5',
	    								title:'HotBNumber'
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
//    		    dc.renderAll();
    		    $('#ajax_loader').hide();
    		}
    }
    
    getElement("#refresh").on( "click", function() {
	    //console.log( "button was clicked" );
	    day = getElement("#day").val()  === undefined ? "" : getElement("#day").val() ;

	    start = getElement("#start").val() === undefined ? "" :  getElement("#start").val() ;
	    end = getElement("#end").val() === undefined ? "" :  getElement("#end").val() ;
	    source = getElement("#hbnsource").val() === undefined ? "" : getElement("#hbnsource").val() ;
	    filterSql = getElement("#filterSql").val()  === undefined ? "" : getElement("#filterSql").val();
	    //console.log( "day=", day, "hour=",  "start=", start, "end=", end, "source=", source);
	    HOTBNUMBER.filter(day, start, end, source,filterSql);
	});

		
    HOTBNUMBER.filter(day, start, end, source,filterSql);	
});	

HOTPOP = {
	popHot : function(data,type){
		var url = clientHTTPConfig.appContextRoot + '/drilldown/hotbnumber?data='+data+'&type='+type;
      //alert(url);
		window.open(url ,'_blank','height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
	}	
}


		





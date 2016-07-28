
$(document).ready(function(){
	//console.log('hotBNumber.js');	
	
	var day = getElement("#day").val()  === undefined ? "" : getElement("#day").val() ;
    start = getElement("#start").val() === undefined ? "" : getElement("#start").val() ;
    end = getElement("#end").val() === undefined ? "" : getElement("#end").val() ;
    source = getElement("#hbnsource").val() === undefined ? "" : getElement("#hbnsource").val() ;
    filterSql = getElement("#filterSql").val()  === undefined ? "" : getElement("#filterSql").val();
    
    HOTBNUMBER = {
    		 filter : function(day, start, end, source,filterSql){
    			var url = clientHTTPConfig.appContextRoot+"/dataaccess/hotbnumber";
    			var condition = "";
    			if(day != '')
    				condition = concatParam(condition, "call_date", "=", "'" + moment(day).format("YYYYMMDD") + "'");
    			if(start != '')
    				condition = concatParam(condition, "call_date", ">=", "'" + moment(start).format("YYYYMMDD") + "'");
    			if(end != '')
    				condition = concatParam(condition, "call_date", "<=", "'" + moment(end).format("YYYYMMDD") + "'");
    			
    			if (filterSql != ""){
    				if(condition == "")
    					condition += filterSql.replace(" and", "");
    				else condition += filterSql;
    			}
    			url += "?condition="+condition;
    			
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
    		            		return "<a href='javascript:void(0);' onclick=\"HOTPOP.popHot(" + data+ ",'CELL');\" class='colLnk'>" + data + '</a>';
    		            	}
    		            } 
    		            ,{ "mData": "lac", "sDefaultContent": ""}
    		            ,{ "mData": "imei", "sDefaultContent": ""}
    		            ,{ "mData": "source", "sDefaultContent": ""}
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
//	    start = $("#start").val() === undefined ? "" : $("#start").val() ;
//	    end = $("#end").val() === undefined ? "" : $("#end").val() ;
	    
	    start = getElement("#start").val() === undefined ? "" :  getElement("#start").val() ;
//	    end = $("#end").val();
	    end = getElement("#end").val() === undefined ? "" :  getElement("#end").val() ;
	    //console.log("hotBNumber:"+start);
	    
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
		window.open(url ,'_blank','height=700, width=1000, top=0, left=150, toolbar=no,menubar=yes, scrollbars=yes, resizable=no,location=no,status=no');
	}	
}


		





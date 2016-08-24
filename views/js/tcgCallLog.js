$(document).ready(function(){
	source = getElement("#source").val()=== undefined ? "" : getElement("#source").val();
	var current = new Date();
	getElement("#start").val(current.Format("yyyy-MM-dd"));
	 getElement("#end").val(current.Format("yyyy-MM-dd"));
	 start = current.Format("yyyyMMdd");
	 end = current.Format("yyyyMMdd");
	 getElement( "#go").on( "click", function() {
		source = getElement("#source").val()=== undefined ? "" : getElement("#source").val();
	    if(source == 'BTCG detection'){
	    	source = 'B';
	    }else if(source =='Standard TCG detection'){
	    	source = 'A';
	    }
	    var st =getElement("#start").val();
		start = st.substring(0,4)+st.substring(5,7)+st.substring(8,10);
		var ed = getElement("#end").val();
	    end = ed.substring(0,4)+ed.substring(5,7)+ed.substring(8,10);
	    TCGCALLLOG.filter_raw(source,start,end);
	});

	TCGCALLLOG = {
		filter_raw : function  (source,start,end){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/tcgcalllog";
		    var condition = "";
			condition = concatParam(condition, "calling_service", "=", "'" + source + "'");
			condition = concatParam(condition, "call_date", ">=", "'" + start + "'");
			condition = concatParam(condition, "call_date", "<=", "'" + end + "'");
				
			url += "?condition="+condition;
		    //console.log( "url=", url );
		    $('#ajax_loader').show();
			queue().defer(d3.json, url).await(this.makeGraphs);
		},
		makeGraphs : function(error, apiData) {
			var dataSet = apiData;
			var datatable = $("#tcgCallLog-datatable").dataTable({
		        "bPaginate": true,
		        "colReorder": true,        
		        "bLengthChange": true,
		        "sScrollX":"100%",
		        "bFilter": true,
		        "bSort": true,
		        "bInfo": true,
		        "bAutoWidth": true,
		        "bDeferRender": true,
		        "bDestroy": true,
		        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
		         /*   $('td', nRow).attr('nowrap','nowrap');
		            return nRow;*/
					$('.dataTables_filter input[type="search"]').
					attr('placeholder','Search here...').
					css({'width':'100px','height':'5px','display':'inline-block'});
		         },
		        "data": dataSet,
		            "aoColumns": [
		             { "mData": "id", "sDefaultContent": ""}
		            ,{ "mData": "s_msisdn", "sDefaultContent": ""}
			        ,{ "mData": "o_msisdn", "sDefaultContent": "" }	             
		            ,{ "mData": "s_imsi", "sDefaultContent": "" }
		            ,{ "mData": "s_imei", "sDefaultContent": "" }
		            ,{ "mData": "s_subid", "sDefaultContent": "" }
		            ,{ "mData": "duration", "sDefaultContent": ""}          
		            ,{ "mData": "detection", "defaultContent": "",
		            	"mRender": function ( data, type, row ) { 
		            		if (data == true){
		            			return '<input type="checkbox" value="" class="editor-active" checked disabled>';
		            		}
		            		else {
		            			return '<input type="checkbox" value="" class="editor-active">';
		            		}
		            	}
		            }
		            ,{ "mData": "call_mechanism", "sDefaultContent": ""}            
		            ,{ "mData": "source_file_name", "sDefaultContent": "" }
		            ,{ "mData": "calling_country", "sDefaultContent": ""}
		            ,{ "mData": "calling_service", "sDefaultContent": ""}
		            ,{ "mData": "dial_prefix", "sDefaultContent":""}
		            ,{ "mData": "insert_time", "sDefaultContent": "",
		            	"mRender": function ( data, type, row ) {
		            		var date = new Date(data);	     
		            		
		            		return date.Format('yyyy-MM-dd hh:mm:ss');
		            		}
		            }
		            ,{ "mData": "source_operator", "sDefaultContent": "" }
		            ,{ "mData": "call_date","sDefaultContent":"",
		            	"mRender": function ( data, type, row ) {
		            		if(data!=null){
		            			var date = data.toString();
			            		var pattern = /(\d{4})(\d{2})(\d{2})/;
			            		return date.replace(pattern, '$1-$2-$3');
		            		}else{
		            			return data;
		            		}
		            		
		            	}}
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
									title:'TcgCallLog'
    							}, 
    							{
    								extend:'csvHtml5',
    								title:'TcgCallLog'
    							}, 
    							{
    								extend:'excelHtml5',
    								title:'TcgCallLog'
    							},
    							{
    								extend:'pdfHtml5',
    								title:'TcgCallLog'
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
//		    dc.renderAll();
		    $('#ajax_loader').hide();
		}
	}

	TCGCALLLOG.filter_raw(source,start,end);	
});
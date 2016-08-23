$(document).ready(function(){
	//console.log('tcgDetections.js');	
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
	    TCGDEC.filter_raw(source,start,end);
	});

	TCGDEC = {
		filter_raw : function(source,start,end){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/tcgdetections";
			var condition = "";
//			    if(source == 'BTCG detection'){
//			    	source = 'B';
//			    }else if(source =='Standard TCG detection'){
//			    	source = 'A';
//			    }
			condition = concatParam(condition, "source", "=", "'" + source + "'");
			condition = concatParam(condition, "call_date", ">=", "'" + start + "'");
			condition = concatParam(condition, "call_date", "<=", "'" + end + "'");
				
			url += "?condition="+condition;
			//console.log( "url=", url );
			$('#ajax_loader').show();
			queue().defer(d3.json, url).await(this.makeGraphs);
		},
		makeGraphs : function(error, apiData) {
			var dataSet = apiData;
			var datatable = $("#tcgDetections-datatable").dataTable({
		        "bPaginate": true,
		        "colReorder": true,        
		        "bLengthChange": true,
		        "sScrollX":"100%",
		        "bFilter": true,
		        "bSort": true,
		        "bInfo": true,
				"lengthMenu": [[25, 50, -1], [25, 50, "All"]],
		        "bAutoWidth": true,
		        "bDeferRender": true,
		        "bDestroy": true,
				"order": [[ 0, "desc" ]],
		        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
		            $('td', nRow).attr('nowrap','nowrap');
		            return nRow;
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

		            ,{ "mData": "false_positive", "defaultContent": "",
		            	"mRender": function ( data, type, row ) { 
		            		if (data == 1){
		            			return '<input type="checkbox" value="" class="editor-active" checked disabled>';
		            		}
		            		else {
		            			return '<input type="checkbox" value="" class="editor-active" disabled>';
		            		}
		            	}
		            }
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
		            ,{ "mData": "source_file_name", "sDefaultContent": "" }
		            ,{ "mData": "call_mechanism", "sDefaultContent": ""}
		            ,{ "mData": "operator", "sDefaultContent": "" }
		            ,{ "mData": "call_date","sDefaultContent":"" ,
		            	"mRender": function ( data, type, row ) {
		            		var date = data.toString();
		            		var pattern = /(\d{4})(\d{2})(\d{2})/;
		            		return date.replace(pattern, '$1-$2-$3');
		            	}}
						,{ "mData": "call_time", "sDefaultContent": "",
							"mRender": function ( data, type, row ) {
								return moment(data).format("hh:mm:ss");
								/*  var  temp = moment.tz(data, 'Africa/Tunis');
								 return  temp.format("YYYY-MM-DD hh:mm:ss Z");
								 */
							}}
						,{ "mData": "status", "sDefaultContent": "",
							"mRender": function ( data, type, row ) {
								switch (data){
									case 0:
										return "Default(Unprocessed)";
									case 1:
										return "Processed";
									case 2:
										return "No Record Found";
									case 3:
										return "IMSI missing";
									case 4:
										return "SUBID missing";
									default:
										return "Undefined";
								}
							}
						}

						,{ "mData": "processed_time", "sDefaultContent": "",
							"mRender": function(data,type,row){
								if (data === undefined || data == null){
									return '';
								}
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
									title:'TcgDetections'
    							}, 
    							{
    								extend:'csvHtml5',
    								title:'TcgDetections'
    							}, 
    							{
    								extend:'excelHtml5',
    								title:'TcgDetections'
    							}/*,
    							{
    								extend:'pdfHtml5',
    								title:'TcgDetections'
    							}*/]
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

	TCGDEC.filter_raw(source,start,end);	
});
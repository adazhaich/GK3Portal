$(document).ready(function() {
	var rows_selected = [];
	
	WHITELIST = {
		filter: function (){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/whitelist";
	
		    var queryMsisdn = getElement("#querymsisdn").val();
		    if(queryMsisdn != undefined && queryMsisdn != '')
			url = url + "?queryMsisdn='"+queryMsisdn.replaceAll(",","','")+"'";
			
		    console.log( "filter url=", url );
		    $('#ajax_loader').show();
		//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
		//    console.log( "url=", url );
			queue().defer(d3.json, url).await(this.makeGraphs);
		},	
		
		makeGraphs: function (error, apiData) {
			var dataSet = apiData;
			if (!dataSet || dataSet.length == 0){
				console.log("No data retrieved. Do nothing");
				$("#wl-datatable").dataTable().fnClearTable();
				$("#wl-datatable").dataTable().fnDestroy();
		        $("#wl-datatable").dataTable().fnDraw();
				//return;
			}
	
			console.log('makeGraphs():dataSet:', dataSet.length);
			var datatable = $("#wl-datatable").dataTable({
				"bPaginate": true,
		        "colReorder": true,        
		        "bLengthChange": true,
//		        "sScrollX":"100%",
		        "bFilter": true,
		        "bSort": true,
		        "bInfo": true,
		        "bAutoWidth": true,
		        "bDeferRender": true,
		        "bDestroy": true,
		        
		        'columnDefs': [{
		            'targets': 0,
		            'searchable': false,
		            'orderable': false,
		            'width': '1%',
		            'render': function (data, type, full, meta){
		                return '<input type="checkbox" name="ckids" value='+data+'>';
		            }
		         }],
		         'order': [[1, 'asc']],
		         
		         'rowCallback': function(row, data, dataIndex){
		            // Get row ID
		            var rowId = data[0];
	
		            // If row ID is in the list of selected row IDs
		            if($.inArray(rowId, rows_selected) !== -1){
		               $(row).find('input[type="checkbox"]').prop('checked', true);
		               $(row).addClass('selected');
		            }
		         },
				"fnDrawCallback": function (oSettings) {
					/*     $(".dataTables_filter").each(function () {
					 $(this).appendTo($(this).parent().siblings(".panel-body"));
					 });*/
					$('.dataTables_filter input[type="search"]').
					attr('placeholder','Search here...').
					css({'width':'100px','height':'17.5px','display':'inline-block'});
				},
		        "data": dataSet,
		            "aoColumns": [
		             { "mData": "id", "sDefaultContent": "" }
		            ,{ "mData": "id", "sDefaultContent": "" }
		            ,{ "mData": "msisdn", "sDefaultContent": "" }
		            ,{ "mData": "imsi", "sDefaultContent": "" }
		            ,{ "mData": "imei", "sDefaultContent": "" }
		            ,{ "mData": "create_time", "sDefaultContent": "",
							"mRender": function ( data, type, row ) {
							return moment(data).format("YYYY-MM-DD HH:mm:ss");

		            }}
						,{ "mData": "update_time", "sDefaultContent": "",
							"mRender" : function(data, type, row) {
								return moment(data).format("YYYY-MM-DD HH:mm:ss");
							}
						}

		            ,{ "mData": "description", "sDefaultContent": ""}
		            ,{ "mData": "type", "sDefaultContent": "",
		            	"mRender": function ( data, type, row ) { 
		            		switch (data){
			            		case 0: return 'Number';
			            		case 2: return 'Range';
			            	    default: return data;
		            		}
		            	}}
		            ,{ "mData": "creator", "sDefaultContent": ""}
		        ],    
	//	        "sDom": '<"wrapper"flBtip>',
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
									title:'WhiteList'
    							}, 
    							{
    								extend:'csvHtml5',
    								title:'WhiteList'
    							}, 
    							{
    								extend:'excelHtml5',
    								title:'WhiteList'
    							},
    							{
    								extend:'pdfHtml5',
    								title:'WhiteList'
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
//		    dc.renderAll('whitelist');
		    $('#ajax_loader').hide();
		}
	}
		
		getElement( "#delete").on( "click", function() {
		    console.log( "delete button was clicked" );
		    var ids = [];
		    getElement("input[name='ckids']:checked").each(function(){ 
		    	ids.push($(this).val());
		    });
		    if(ids == '') {
		    	alert('Please choose Whitelist ID');
		    	return;
		    }
		    deleteWL(ids);
		});
		
		getElement( "#query").on( "click", function() {
		    console.log( "query button was clicked" );
		    WHITELIST.filter();
		});

		getElement( "#save").on( "click", function() {
		    console.log( "save button was clicked" );
		    var msisdn = getElement("#msisdn").val().trim();
		    var imsi = getElement("#imsi").val().trim();
		    var imei = getElement("#imei").val().trim();
		    var desc = getElement("#desc").val().trim();
		    var range = getElement("#range:checked").length;
		    
		    if(msisdn == '' ) {
		    	alert('MSISDN is required!');
		    	return;
		    }
		    
		    var checkStr = /^[^']*$/;
		    var checkNumStr = /^([0-9,]){0,200}$/;
		    if(!checkNumStr.test(msisdn)) {
		    	alert('MSISDN only digit');
		    	getElement("#msisdn").focus();
		    	return;
		    }
		    if(imsi != '' && !checkNumStr.test(imsi)) {
		    	alert('IMSI only digit');
		    	getElement("#imsi").focus();
		    	return;
		    }
		    if(imei != '' && !checkNumStr.test(imei)) {
		    	alert('IMEI only digit');
		    	getElement("#imei").focus();
		    	return;
		    }
		    if(desc != '' && !checkStr.test(desc)) {
		    	alert('Desc only digit seperator with commas');
		    	getElement("#desc").focus();
		    	return;
		    }
		    imsi = imsi == '' ? 0 : imsi;
		    imei = imei == '' ? 0 : imei;
		    var detail = "'" + msisdn + "','" + imsi + "','" + imei + "','" + desc +"',";

		    if(range == 1) {
		    	detail += "2";
		    } else {
		    	detail += "0";
		    }
		    var url = clientHTTPConfig.appContextRoot+"/dataaccess/addwhitelist";
		    
		    url = url + "?insertvalue="+detail+"&msisdn='"+msisdn+"'";
		    
		    queue() .defer(d3.json, url).await(save);
		    
		});
		
		getElement( "#upload").on( "click", function() {
		    console.log( "upload file button was clicked" );
		    var filename = getElement("#inputfile").val();
		    if(filename == '') {
		    	alert("Please  choose file first!");
		    	return;
		    }
		    filecontent = getElement("#disp_tmp_path").html();
		    //url = "/dataaccess/importwhitelist?inputvalue="+filecontent;

			url = clientHTTPConfig.appContextRoot+ "/dataaccess/importwhitelist?inputvalue="+filecontent;
		    queue() .defer(d3.json, url).await(importfile);
		});
		
		getElement("#inputfile").change(function () {
		    var fileObj = this,
		        file;
		    
		    if (fileObj.files) {
		        file = fileObj.files[0];
		        var fr = new FileReader;
		        fr.onloadend = changetxt;
		        fr.readAsText(file);
		    } else {
		        file = fileObj.value;
		        changetxt(file);
		    }
		});
		
		function deleteWL(ids) {
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/deletewhitelist";
			url = url + "?ids=" +ids;
			console.log( "url", url );
			queue().defer(d3.json, url).await(refreshDltSD);
		}
		
		function changetxt(str) {
		    if(typeof str === "object") {
		        str = str.target.result; // file reader
		    }

			var user = "root";
			var seqnext = "SEQNEXTVALUE";
		    var replacestr = "','"+user+"',"+seqnext+",0, now(), now() ; union all select '";
		    str = str.replace(/,/g, "','").replace(/\n/g, replacestr);
		    getElement("#disp_tmp_path").html("select '"+str+replacestr);
		}
		
		function importfile(error, apiData) {
			if(apiData[0].updatecount > 0) {
				alert('Import Whitelist '+ apiData[0].updatecount +' rows successfully');
				getElement("#importform")[0].reset();
				getElement("#inputfile").val('');
				getElement("#query").click();
			} else {
				alert("Failed to add Whitelist, it has been exist!");
				getElement("#inputfile").focus();
			}
		}
		
		function save(error, apiData) {
			if(apiData[0].updatecount > 0) {
				alert('Add Whitelist successfully');
				getElement("#addform")[0].reset();
				getElement("#query").click();
			} else {
				alert("Failed to add Whitelist, it has been exist!");
				getElement("#msisdn").focus();
			}
		}
		
		function refreshDltSD(error, apiData) {
			if(apiData[0].updatecount > 0) {
				alert('Delete Whitelist successfully');
				getElement("#addform")[0].reset();
				getElement("#querymsisdn").val('');
				getElement("#query").click();
			} else {
				alert("Failed to delete Whitelist");
			}
		}
	
	WHITELIST.filter();
})
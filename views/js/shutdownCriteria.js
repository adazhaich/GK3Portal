$(document).ready(function() {
	var id = 'SEQNEXTVALUE';

	SHUTDOWNCRITERIA = {
		filter: function  (){
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/shutdowncriteria";

			//console.log( "filter url=", url );
			$('#ajax_loader').show();
			//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
			//    //console.log( "url=", url );
			queue().defer(d3.json, url).await(this.makeGraphs);
		},

		makeGraphs: function(error, apiData) {
			var dataSet = apiData;
			if (!dataSet || dataSet.length == 0){
				//console.log("No data retrieved. Do nothing");
				$("#sdc-datatable").dataTable().fnDestroy();
				$('#ajax_loader').hide();
				return;
			}

			//console.log('makeGraphs():dataSet:', dataSet.length);
			var datatable = $("#sdc-datatable").dataTable({
				"columnDefs": [
					{ "visible": false, "targets": 0 }
				],
				"order": [[ 0, 'asc' ]],
				"sScrollX":"100%",
				"bFilter": false,
				"bSort": false,
				"bInfo": true,
				"bAutoWidth": true,
				"bDeferRender": true,
				"bDestroy": true,
				"bPaginate": false,
				"iDisplayLength": "100",
				"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
					$('td', nRow).attr('nowrap','nowrap');
					return nRow;
				},
				"drawCallback": function ( settings ) {
					var api = this.api();
					var rows = api.rows( {page:'current'} ).nodes();
					var last=null;

					api.column(0, {page:'current'} ).data().each( function ( group, i ) {
						if ( last !== group ) {
							$(rows).eq( i ).before(
								'<tr class="group"><td colspan="4"><input type="radio" name="crtno" value='+group+' >  Criteria NO:'+group+'</td></tr>'
							);

							last = group;
						} else {
							$(rows).hide();
						}
					} );
				},
				"data": dataSet,
				"aoColumns": [
					{ "mData": "criteria_no", "sDefaultContent": "" }
					,{ "mData": "criteria_no", "sDefaultContent": "" }
					,{ "mData": "comment", "sDefaultContent": "" }
					,{ "mData": "condition_operation", "sDefaultContent": "" }
					,{ "mData": "condition_value", "sDefaultContent": ""}
				],
//			        "sDom": '<"wrapper"flBtip>',
				"sDom": 'ZlfrBtip',
				"colResize": {
					"tableWidthFixed": false
				},
				buttons: [
					{
						extend: 'collection',
						text: 'Export',
						buttons: [
							'copy',
							'excel',
							'csv',
							'pdf'
						]
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
			//dc.renderAll();
			$('#ajax_loader').hide();
		},

		fillAlterSD: function(criteria) {
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/altershutdowncriteria";
			url = url + "?criteriano=" +criteria;
			queue().defer(d3.json, url).await(this.fillEditSD);
		},

		fillEditSD: function(error, apiData) {
			var dataSet = apiData;
			//console.log('fillEditSD():dataSet:', dataSet.length);
			$.each(dataSet, function (i, val) {
				//alert(i+","+val.condition_type+','+val.condition_operation+','+val.criteria_value+','+val.checked);
				if(val.condition_type == 0) {
					getElement("#criteriano").val(val.criteria_no);
					if(val.criteria_n != null && val.criteria_no != 'null' && val.criteria_no != '') getElement("#criteriano").attr('disabled', 'disabled');
					getElement("#path").val(val.criteria_value);
				} else if(val.condition_type == 91) {
					getElement("#reportname").val(val.criteria_value);
				} else if(val.condition_type == 1) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#tacck").attr("checked",'true');
						getElement("#tacad").val(val.condition_operation);
						getElement("#tac").val(val.criteria_value);
					}
				} else if(val.condition_type == 2) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#lacck").attr("checked",'true');
						getElement("#lacad").val(val.condition_operation);
						getElement("#lac").val(val.criteria_value);
					}
				} else if(val.condition_type == 3) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#cellidck").attr("checked",'true');
						getElement("#cellidad").val(val.condition_operation);
						getElement("#cellid").val(val.criteria_value);
					}
				} else if(val.condition_type == 4) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#callsoutck").attr("checked",'true');
						getElement("#callsoutad").val(val.condition_operation);
						getElement("#callsout").val(val.criteria_value);
					}
				} else if(val.condition_type == 5) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#callsinck").attr("checked",'true');
						getElement("#callsinad").val(val.condition_operation);
						getElement("#callsin").val(val.criteria_value);
					}
				} else if(val.condition_type == 6) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#smsoutck").attr("checked",'true');
						getElement("#smsoutad").val(val.condition_operation);
						getElement("#smsout").val(val.criteria_value);
					}
				} else if(val.condition_type == 7) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#intloutck").attr("checked",'true');
						getElement("#intloutad").val(val.condition_operation);
						getElement("#intlout").val(val.criteria_value);
					}
				} else if(val.condition_type == 8) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#domtoutck").attr("checked",'true');
						getElement("#domtoutad").val(val.condition_operation);
						getElement("#domtout").val(val.criteria_value);
					}
				} else if(val.condition_type == 9) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#cellck").attr("checked",'true');
						getElement("#cellad").val(val.condition_operation);
						getElement("#cell").val(val.criteria_value);
					}
				} else if(val.condition_type == 10) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#ratiock").attr("checked",'true');
						getElement("#ratioad").val(val.condition_operation);
						getElement("#ratio").val(val.criteria_value);
					}
				} else if(val.condition_type == 11) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#vendorck").attr("checked",'true');
						getElement("#vendorad").val(val.condition_operation);
						getElement("#vendor").val(val.criteria_value);
					}
				} else if(val.condition_type == 12) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#modelck").attr("checked",'true');
						getElement("#modelad").val(val.condition_operation);
						getElement("#model").val(val.criteria_value);
					}
				} else if(val.condition_type == 13) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#avgoutdurck").attr("checked",'true');
						getElement("#avgoutdurad").val(val.condition_operation);
						getElement("#avgoutdur").val(val.criteria_value);
					}
				} else if(val.condition_type == 14) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#avginminck").attr("checked",'true');
						getElement("#avginminad").val(val.condition_operation);
						getElement("#avginmin").val(val.criteria_value);
					}
				} else if(val.condition_type == 15) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#ignorvendorck").attr("checked",'true');
						getElement("#ignorvendorad").val(val.condition_operation);
						getElement("#ignorvendor").val(val.criteria_value);
					}
				} else if(val.condition_type == 16) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#smsidnck").attr("checked",'true');
						getElement("#smsisdnad").val(val.condition_operation);
						getElement("#smsisdn").val(val.criteria_value);
					}
				} else if(val.condition_type == 17) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#laccick").attr("checked",'true');
						getElement("#lacciad").val(val.condition_operation);
						getElement("#lacci").val(val.criteria_value);
					}
				} else if(val.condition_type == 18) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#burstingck").attr("checked",'true');
						getElement("#burstingad").val(val.condition_operation);
						getElement("#bursting").val(val.criteria_value);
					}
					/*
					 } else if(val.condition_type == 19) {
					 if(val.checked == 1) {//if have data, set checked
					 getElement("#tacck").attr("checked",'true');
					 getElement("#tacad").val(val.condition_operation);
					 getElement("#tac").val(val.criteria_value);
					 }*/
				} else if(val.condition_type == 20) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#illodd24ck").attr("checked",'true');
						getElement("#illodd24ad").val(val.condition_operation);
						getElement("#illodd24").val(val.criteria_value);
					}
				} else if(val.condition_type == 21) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#iscnicck").attr("checked",'true');
						//getElement("#tacad").val(val.condition_operation);
						//getElement("#tac").val(val.criteria_value);
					}
				} else if(val.condition_type == 22) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#avgindurck").attr("checked",'true');
						getElement("#avgindurad").val(val.condition_operation);
						getElement("#avgindur").val(val.criteria_value);
					}
				} else if(val.condition_type == 23) {
					if(val.checked == 1) {//if have data, set checked
						getElement("#smsinck").attr("checked",'true');
						getElement("#smsinad").val(val.condition_operation);
						getElement("#smsin").val(val.criteria_value);
					}
				} else if(val.condition_type == 24) {
					if(val.checked == 1) {//if have data, set checked
						$("#numimeick").attr("checked",'true');
						$("#numimeiad").val(val.condition_operation);
						$("#numimei").val(val.condition_value);
					}
				} else if(val.condition_type == 25) {
					if(val.checked == 1) {//if have data, set checked
						$("#offnetoutck").attr("checked",'true');
						$("#offnetoutad").val(val.condition_operation);
						$("#offnetout").val(val.condition_value);
					}
				} else if(val.condition_type == 26) {
					if(val.checked == 1) {//if have data, set checked
						$("#inoutratiock").attr("checked",'true');
						$("#inoutratioad").val(val.condition_operation);
						$("#inoutratio").val(val.condition_value);
					}
				} else if(val.condition_type == 92) {
					getElement("input[name='prodmodead'][value='"+val.criteria_value+"']").attr("checked",true);
				} else if(val.condition_type == 93) {
					getElement("input[name='sourcead'][value='"+val.criteria_value+"']").attr("checked",true);
				} else if(val.condition_type == 94) {
					getElement("input[name='prefixad'][value='"+val.criteria_value+"']").attr("checked",true);
				} else if(val.condition_type == 95) {
					getElement("input[name='dupad'][value='"+val.criteria_value+"']").attr("checked",true);
				} else if(val.condition_type == 96) {
					getElement("input[name='offpeakad'][value='"+val.criteria_value+"']").attr("checked",true);
				} else if(val.condition_type == 97) {
					if(val.checked == 1) {//if have data, set checked
						if(getElement("input[name='prodmodead']:checked").val() == 1) {
							getElement("#prodfilepath").removeAttr('disabled');
							getElement("#prodfilepath").val(val.criteria_value);
						}
					}
				} else if(val.condition_type == 98) {
					getElement("input[name='shortcallsad'][value='"+val.criteria_value+"']").attr("checked",true);
				}
			});

		},

		fillShutdownReport: function(error, apiData) {
			var dataSet = apiData;
			if (!dataSet || dataSet.length == 0){
				//console.log("No data retrieved. Do nothing");
				$("#sdr-datatable").dataTable().fnDestroy();
				return;
			}

			//console.log('fillShutdownReport():dataSet:', dataSet.length);
			var datatable = $("#sdr-datatable").dataTable({
				"sScrollX":"100%",
				"bFilter": true,
				"bSort": false,
				"bInfo": true,
				"bAutoWidth": true,
				"bDeferRender": true,
				"bDestroy": true,
				"bPaginate": true,
				"iDisplayLength": "25",
				"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
					$('td', nRow).attr('nowrap','nowrap');
					return nRow;
				},
				"data": dataSet,
				"aoColumns": [
					{ "mData": "traffic_date", "sDefaultContent": "" }
					,{ "mData": "traffic_hour", "sDefaultContent": "" }
					,{ "mData": "msisdn", "sDefaultContent": "" }
					,{ "mData": "report_name", "sDefaultContent": "" }
					,{ "mData": "comment", "sDefaultContent": "" }
					,{ "mData": "create_time", "sDefaultContent": ""}
				],
//			        "sDom": '<"wrapper"flBtip>',
				"sDom": 'ZlfrBtip',
				"colResize": {
					"tableWidthFixed": false
				},
				buttons: [
					{
						extend: 'collection',
						text: 'Export',
						buttons: [
							'copy',
							'excel',
							'csv',
							'pdf'
						]
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
			dc.renderAll();

		},

		showShutdownReport: function() {
			$(this).attr("data-addtab", "showreport");
			$(this).attr("url", "showshutdownreport");
			registerComposeButtonEvent(this);
			var reportname = $("#reportname").val();
			var url = clientHTTPConfig.appContextRoot+"/dataaccess/showshutdownreport";
			url = url + "?reportname=" +reportname;
			queue().defer(d3.json, url).await(this.fillShutdownReport);
		}


	}


	function deleteSD(criteria_no) {
		var url = clientHTTPConfig.appContextRoot+"/dataaccess/deleteshutdowncriteria";
		url = url + "?criteriano=" +criteria_no;
		queue().defer(d3.json, url).await(refreshDltSD);
	}

	getElement( "#refresh").on( "click", function() {
		//console.log( "refresh button was clicked" );
		getElement("#alter").attr('disabled','disabled');
		getElement("#delete").attr('disabled','disabled');
		getElement("#showbtn").attr('disabled','disabled');

		SHUTDOWNCRITERIA.filter();
	});

	getElement( "#new").on( "click", function() {
		//console.log( "new button was clicked" );
		$(this).attr("data-addtab", "newsdc");
		$(this).attr("url", "editshutdowncriteria");
		registerComposeButtonEvent(this);
	});

	getElement( "#alter").on( "click", function() {
		//console.log( "alter button was clicked" );

		var crtno = getElement("input[name='crtno']:checked").val();
		if(crtno == undefined || crtno == '') {
			alert('Please choose Criteria No');
			return;
		}
		$(this).attr("data-addtab", "altersdc"+crtno);
		$(this).attr("url", "editshutdowncriteria");

		registerComposeButtonEvent(this);

		SHUTDOWNCRITERIA.fillAlterSD(crtno);
	});

	getElement( "#delete").on( "click", function() {
		//console.log( "refresh button was clicked" );
		var crtno = getElement("input[name='crtno']:checked").val();
		if(crtno == '') {
			alert('Please choose Criteria No');
			return;
		}
		deleteSD(crtno);
	});

	getElement( "#showbtn").on( "click", function() {
		//console.log( "show button was clicked" );
		var reportname = getElement("#reportname").val();
		if(reportname == undefined || reportname == '') {
			alert('Please choose Criteria No');
			return;
		}
		//window.open('showShutdownreport?reportname='+reportname,'_blank')
		SHUTDOWNCRITERIA.showShutdownReport();
	});

	getElement( "#save").on( "click", function() {
		//console.log( "save button was clicked" );
		var criteria_no = getElement("#criteriano").val().trim();
		var path = getElement("#path").val().trim();
		var tacck = getElement("#tacck:checked").length;
		var tac = getElement("#tac").val().trim();
		var lacck = getElement("#lacck:checked").length;
		var lac = getElement("#lac").val().trim();
		var cellidck = getElement("#cellidck:checked").length;
		var cellid = getElement("#cellid").val().trim();
		var callsoutck = getElement("#callsoutck:checked").length;
		var callsoutad = getElement("input[name='callsoutad']:checked").val();
		var callsout = getElement("#callsout").val();
		var callsinck = getElement("#callsinck:checked").length;
		var callsinad = getElement("input[name='callsinad']:checked").val();
		var callsin = getElement("#callsin").val();
		var smsoutck = getElement("#smsoutck:checked").length;
		var smsoutad = getElement("input[name='smsoutad']:checked").val();
		var smsout = getElement("#smsout").val();
		var intloutck = getElement("#intloutck:checked").length;
		var intloutad = getElement("input[name='intloutad']:checked").val();
		var intlout = getElement("#intlout").val();
		var domtoutck = getElement("#domtoutck:checked").length;
		var domtoutad = getElement("input[name='domtoutad']:checked").val();
		var domtout = getElement("#domtout").val();
		var cellck = getElement("#cellck:checked").length;
		var cellad = getElement("input[name='cellad']:checked").val();
		var cell = getElement("#cell").val();
		var ratiock = getElement("#ratiock:checked").length;
		var ratioad = getElement("input[name='ratioad']:checked").val();
		var ratio = getElement("#ratio").val();
		var vendorck = getElement("#vendorck:checked").length;
		var vendor = getElement("#vendor").val();
		var modelck = getElement("#modelck:checked").length;
		var model = getElement("#model").val();
		var avgoutdurck = getElement("#avgoutdurck:checked").length;
		var avgoutdurad = getElement("input[name='avgoutdurad']:checked").val();
		var avgoutdur = getElement("#avgoutdur").val();
		var avginminck = getElement("#avginminck:checked").length;
		var avginminad = getElement("input[name='avginminad']:checked").val();
		var avginmin = getElement("#avginmin").val();
		var ignorvendorck = getElement("#ignorvendorck:checked").length;
		var ignorvendor = getElement("#ignorvendor").val();
		var smsisdnck = getElement("#smsisdnck:checked").length;
		var smsisdn = getElement("#smsisdn").val();
		var laccick = getElement("#laccick:checked").length;
		var lacci = getElement("#lacci").val();
		var burstingck = getElement("#burstingck:checked").length;
		var burstingad = getElement("input[name='burstingad']:checked").val();
		var bursting = getElement("#bursting").val();
		var illodd24ck = getElement("#illodd24ck:checked").length;
		var illodd24ad = getElement("input[name='illodd24ad']:checked").val();
		var illodd24 = getElement("#illodd24").val();
		var iscnicck = getElement("#iscnicck:checked").length;
		var avgindurck = getElement("#avgindurck:checked").length;
		var avgindurad = getElement("input[name='avgindurad']:checked").val();
		var avgindur = getElement("#avgindur").val();
		var smsinck = getElement("#smsinck:checked").length;
		var smsinad = getElement("input[name='smsinad']:checked").val();
		var smsin = getElement("#smsin").val();
		var numimeick = getElement("#numimeick:checked").length;
		var numimeiad = getElement("input[name='numimeiad']:checked").val();
		var numimei = getElement("#numimei").val();
		var offnetoutck = getElement("#offnetoutck:checked").length;
		var offnetoutad = getElement("input[name='offnetoutad']:checked").val();
		var offnetout = getElement("#offnetout").val();
		var inoutratiock = getElement("#inoutratiock:checked").length;
		var inoutratioad = getElement("input[name='inoutratioad']:checked").val();
		var inoutratio = getElement("#inoutratio").val();
		var reportname = getElement("#reportname").val().trim();
		var prodmodead = getElement("input[name='prodmodead']:checked").val();
		var prodpath =  getElement("#prodfilepath").val();
		var sourcead = getElement("input[name='sourcead']:checked").val();
		var prefixad = getElement("input[name='prefixad']:checked").val();
		var dupad = getElement("input[name='dupad']:checked").val();
		var offpeakad = getElement("input[name='offpeakad']:checked").val();
		var shortcallsad = getElement("input[name='shortcallsad']:checked").val();

		if(criteria_no == '' || path == '' || reportname == '' ) {
			alert('Criteria No, PATH, Report Name is requried!');
			return;
		}

		if(criteria_no.length > 10) {
			alert("Criteria No must less than 10 characters!");
			return;
		}

		if(reportname.indexOf('yyyyMMddhh') < 0) {
			alert("Report Name must has yyyyMMddhh!");
			return;
		}

		var checkChar = /^[A-Za-z0-9]+$/;
		var checkFloat = /^(?:0|1|0\.[0-9]{1,4})$/;
		var checkStr = /^[^']*$/;
		var checkNumStr = /^([0-9,]){0,200}$/;
		var checkLacci = /^[0-9]{5}[-][0-9]{5}|[,]{11,200}$/;
		var checkNum =  /^\d+$/;
		var checkDouble = /\d+(.\d{1,2})?$/;
		if(!checkChar.test(criteria_no)) {
			alert('Criteria No only charter and digit');
			getElement("#criteriano").focus();
			return;
		}
		if(tacck == 1 && (tac == '' || !checkNumStr.test(tac))  ) {
			alert('TAC only digit seperator with commas');
			getElement("#tac").focus();
			return;
		}
		if(lacck == 1 && (lac == '' || !checkNumStr.test(lac)) ) {
			alert('LAC only digit seperator with commas');
			getElement("#lac").focus();
			return;
		}
		if(cellidck == 1 && (cellid == '' || !checkNumStr.test(cellid)) ) {
			alert('CELL ID only digit seperator with commas');
			getElement("#cellid").focus();
			return;
		}
		if(callsoutck == 1 && (callsout == '' || !checkNum.test(callsout)) ) {
			alert('CALLS OUT must be number!');
			getElement("#callsout").focus();
			return;
		}
		if(callsinck == 1 && (callsin == '' || !checkNum.test(callsin)) ) {
			alert('CALLS IN must be number!');
			getElement("#callsin").focus();
			return;
		}
		if(smsoutck == 1 && (smsout == '' || !checkNum.test(smsout)) ) {
			alert('SMS OUT must be number!');
			getElement("#smsout").focus();
			return;
		}
		if(intloutck == 1 && (intlout == '' || !checkNum.test(intlout)) ) {
			alert('INTL OUT must be number!');
			getElement("#intlout").focus();
			return;
		}
		if(domtoutck == 1 && (domtout == '' || !checkNum.test(domtout)) ) {
			alert('DOMESTIC OUT must be number!');
			getElement("#domtout").focus();
			return;
		}
		if(cellck == 1 && (cell == '' || !checkNum.test(cell)) ) {
			alert('CELL NUM must be number!');
			getElement("#cell").focus();
			return;
		}
		if(ratiock == 1 && (ratio == '' || !checkFloat.test(ratio)) ) {
			alert('RATIO must be between 0 and 1!');
			getElement("#ratio").focus();
			return;
		}
		if(vendorck == 1 && (vendor == '' || !checkStr.test(vendor)) ) {
			alert('Vendor must be seperator by commas!');
			getElement("#vendor").focus();
			return;
		}
		if(modelck == 1 && (model == '' || !checkStr.test(model)) ) {
			alert('Model must be seperator by commas!');
			getElement("#model").focus();
			return;
		}
		if(avgoutdurck == 1 && (avgoutdur == '' || !checkNum.test(avgoutdur)) ) {
			alert('AVG OUT DURATION must be number!');
			getElement("#avgoutdur").focus();
			return;
		}
		if(avginminck == 1 && (avginmin == '' || !checkNum.test(avginmin)) ) {
			alert('AVG IN MIN must be number!');
			getElement("#avginmin").focus();
			return;
		}
		if(ignorvendorck == 1 && (ignorvendor == '' || !checkStr.test(ignorvendor)) ) {
			alert('IGNOR Vendor must be seperator by commas!');
			getElement("#ignorvendor").focus();
			return;
		}
		if(smsisdnck == 1 && (smsisdn == '' || !checkNumStr.test(smsisdn)) ) {
			alert('S_MSISDN must be digit seperator by commas!');
			getElement("#smsisdn").focus();
			return;
		}
		if(laccick == 1 && (lacci == '' || !checkLacci.test(lacci)) ) {
			alert('LAC CI must be like 10001-20001,10002-20002 !');
			getElement("#lacci").focus();
			return;
		}
		if(burstingck == 1 && (bursting == '' || !checkFloat.test(bursting)) ) {
			alert('Bursting must be between 0 and 1!');
			getElement("#bursting").focus();
			return;
		}
		if(illodd24ck == 1 && (illodd24 == '' || !checkFloat.test(illodd24)) ) {
			alert('ILLEGAL OODS 24HRS must be between 0 and 1!');
			getElement("#illodd24").focus();
			return;
		}
		if(avgindurck == 1 && (avgindur == '' || !checkNum.test(avgindur)) ) {
			alert('AVG IN DURATION must be number!');
			getElement("#avgindur").focus();
			return;
		}
		if(smsinck == 1 && (smsin == '' || !checkNum.test(smsin)) ) {
			alert('SMS IN must be number!');
			getElement("#smsin").focus();
			return;
		}
		if(numimeick == 1 && (numimei == '' || !checkNum.test(numimei)) ) {
			alert('NUM IMEI must be number!');
			getElement("#numimei").focus();
			return;
		}
		if(offnetoutck == 1 && (offnetout == '' || !checkNum.test(offnetout)) ) {
			alert('OFF NET OUT must be number!');
			getElement("#offnetout").focus();
			return;
		}
		if(inoutratiock == 1 && (inoutratio == '' || !checkDouble.test(inoutratio)) ) {
			alert('IN OUT RATIO(Calls IN/Calls OUT) must be number!');
			getElement("#inoutratio").focus();
			return;
		}
		var detail = new Array();
		detail.push("select "+id+",'"+criteria_no+"',0,'equal','"+path+"',0, 'PATH',now(), now() ; ");
		detail.push(" union all select "+id+",'"+criteria_no+"',91,'equal','"+reportname+"',0,'REPORT NAME', now(), now() ; ");

		if(tacck == 1) {
			splitSql(detail, criteria_no, 1, 'TAC', tac )  ;
		}
		if(lacck == 1) {
			splitSql(detail, criteria_no, 2, 'LAC', lac ) ;
		}

		if(cellidck == 1) {
			splitSql(detail, criteria_no, 3, 'CELL ID', cellid ) ;
		}

		if(callsoutck == 1) {
			detail.push(" union all select "+id+",'"+criteria_no+"',4,'"+callsoutad+"','"+callsout+"',0,'CALLS OUT', now(), now() ; ");
		}

		if(callsinck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',5,'"+callsinad+"','"+callsin+"',0,'CALLS IN', now(), now() ; ");
		}

		if(smsoutck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',6,'"+smsoutad+"','"+smsout+"',0, 'SMS OUT',now(), now() ; ");
		}

		if(intloutck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',7,'"+intloutad+"','"+intlout+"',0,'INTL OUT', now(), now() ; ");
		}

		if(domtoutck == 1) {
			detail.push(" union all select "+id+",'"+criteria_no+"',8,'"+domtoutad+"','"+domtlout+"',0,'DOMESTIC OUT', now(), now() ;" );
		}

		if(cellck == 1) {
			detail.push(" union all select "+id+",'"+criteria_no+"',9,'"+cellad+"','"+cell+"',0,'CELL NUM', now(), now() ; ");
		}

		if(ratiock == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',10,'"+ratioad+"','"+ratio+"',0, 'RATIO',now(), now() ; ");
		}

		if(vendorck == 1) {
			splitSql(detail, criteria_no, 11, 'VENDOR', vendor ) ;
		}

		if(modelck == 1) {
			splitSql(detail, criteria_no, 12, 'MODEL', model ) ;
		}

		if(avgoutdurck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',13,'"+avgoutdurad+"','"+avgoutdur+"',0, 'AVG OUT DURATION',now(), now() ; ");
		}

		if(avginminck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',14,'"+avginminad+"','"+avginmin+"', 0,'AVG IN MIN',now(), now() ; ");
		}

		if(ignorvendorck == 1) {
			splitSql(detail, criteria_no, 15, 'IGNOR VENDOR', ignorvendor ) ;
		}

		if(smsisdnck == 1) {
			splitSql(detail, criteria_no, 16, 'SD_S_MSISDN', smsisdn )  ;
		}

		if(laccick == 1) {
			splitSql(detail, criteria_no, 17, 'SD_LAC_CI', lacci ) ;
		}

		if(burstingck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',18,'"+burstingad+"','"+bursting+"',0, 'SD_BURSTING',now(), now() ; ");
		}
		/*
		 if(anasdck == 1) {
		 detail.push( splitSql(criteria_no, '19', 'ANALYST SHUTDOWN', anasd ) );
		 }*/

		if(illodd24ck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',20,'"+illodd24ad+"','"+illodd24+"',0,'SD_ILLEGAL_ODDS_24_HOUR', now(), now() ; ");
		}

		if(iscnicck == 1) {
			splitSql(detail, criteria_no, 21, 'SH_DN_CNIC', iscnic ) ;
		}

		if(avgindurck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',22,'"+avgindurad+"','"+avgindur+"',0, 'SH_AVG_IN_DURATION',now(), now() ; ");
		}

		if(smsinck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',23,'"+smsinad+"','"+smsin+"',0, 'SH_SMS_IN',now(), now() ; ");
		}

		if(numimeick == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',24,'"+smsinad+"','"+smsin+"',0, 'SD_NUM_IMEI ',now(), now() ; ");
		}

		if(offnetoutck == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',25,'"+smsinad+"','"+smsin+"',0, 'SD_OFFNET_OUT',now(), now() ; ");
		}

		if(inoutratiock == 1) {
			detail.push( " union all select "+id+",'"+criteria_no+"',26,'"+smsinad+"','"+smsin+"',0, 'SD_IN_OUT_RATIO',now(), now() ; ");
		}

		detail.push( " union all select "+id+",'"+criteria_no+"',92,'equal','"+prodmodead+"',0, 'PRODUCTION MODE',now(), now() ; ");
		detail.push( " union all select "+id+",'"+criteria_no+"',93,'equal','"+sourcead+"',0, 'REPORT SOURCE', now(), now() ; " );
		detail.push( " union all select "+id+",'"+criteria_no+"',94,'equal','"+prefixad+"',0, 'REMOVE PREFIX NUM', now(), now() ; ");
		detail.push( " union all select "+id+",'"+criteria_no+"',95,'equal','"+dupad+"',0, 'REMOVE DUPLICATE', now(),now() ; ");
		detail.push( " union all select "+id+",'"+criteria_no+"',96,'equal','"+offpeakad+"',0, 'IS USED OFFPEAK TIME', now(), now() ; ");
		if(prodmodead == '1')
			detail.push(  " union all select "+id+",'"+criteria_no+"',97,'equal','"+proffilepath+"',0, 'PRODUCTION FILE PATH',now(), now() ; ");

		detail.push( " union all select "+id+",'"+criteria_no+"',98,'equal','"+shortcallsad+"',0, 'SD_INCLUDE_SHORT_CALLS', now(), now()  ");

		var url = clientHTTPConfig.appContextRoot+"/dataaccess/";

		var tabId = getCurrentTabId();
		if(tabId == '#altersdc') {
			url = url + "updateshutdowncriteria?detail="+detail+"&criteriano="+criteria_no;
		} else url = url + "saveshutdowncriteria?detail="+detail;



		queue() .defer(d3.json, url).await(save);

	});

	function save(error, apiData) {
		if(apiData[0].updatecount > 0) {
			alert('Add Shutdown Criteria successfully');
			$("#cancel").click();
		}
	}

	function splitSql(detail, cn, type, comm, str) {
		var arr = str.split(',');

		$.each(arr, function(i, val) {
			detail.push( " union all select "+id+",'"+cn+"',"+type+",'equal','"+val+"',0, '"+comm+"', now(), now() ; ");
		})
		return detail;
	}

	getElement( "#cancel").on( "click", function() {
		//console.log( "cancel button was clicked" );
		removeCanceledTab();
		getElement("#refresh").click();
	});

	getElement( "#reset").on( "click", function() {
		//console.log( "reset button was clicked" );
		var tabId = getCurrentTabId();
		var criteriano = '';
		if(tabId == '#altersdc') criteriano = getElement("#criteriano").val();
		SHUTDOWNCRITERIA.fillAlterSD(criteriano);
	});

	getElement("#prodmodead_1").on("click", function() {
		getElement("#prodfilepath").val('');
		getElement("#prodfilepath").attr('disabled', 'disabled');
	});

	getElement("#prodmodead_2").on("click", function() {
		getElement("#prodfilepath").removeAttr('disabled');
	});

	// Order by the grouping

	getElement('#sdc-datatable').on( 'click', 'tr.group', function () {
		var cntxt = $(this).find("td").html();
		var criteria_no = cntxt.substr(cntxt.indexOf(':')+1);
		var table = getElement('#sdc-datatable').DataTable();
		var $trAry = getElement("table#sdc-datatable tr");
		for ($i = 0; $i < $trAry.length; $i++) {
			var $tr = $($trAry[$i]);
			var $tdAry = $tr.find("td");
			if($tdAry.html() == criteria_no) {
				if($tr.attr('style') == undefined || $tr.attr('style') == '') {
					$tr.attr('style','display:none');
				} else {
					$tr.removeAttr('style');
				}
				if($tr.children('td').eq(1).html().toUpperCase() == 'REPORT NAME') getElement("#reportname").val($tr.children('td').eq(3).html());
				if(getElement("input[name='crtno']:checked").val() != undefined &&
					getElement("input[name='crtno']:checked").val() != '' &&
					getElement("input[name='crtno']:checked").val() != 'undefined') {
					getElement("#alter").removeAttr('disabled');
					getElement("#delete").removeAttr('disabled');
					getElement("#showbtn").removeAttr('disabled');
				}
			}
		}
	} );

	function refreshDltSD(error, apiData) {
		var dataSet = apiData[0];
		if(dataSet.updatecount > 0) {
			alert('Delete Successfully!');
			getElement("#refresh").click();
		}
	}

	var ctabId = getCurrentTabId();
	if(ctabId == '#leaf1110') {

		SHUTDOWNCRITERIA.filter();
	}

	//SHUTDOWNCRITERIA.fillAlterSD();

	//SHUTDOWNCRITERIA.showShutdownReport();

	function fillEditSD(error, apiData) {
		var dataSet = apiData;
		dataSet = spliceJson(dataSet);

		dataSet.forEach(function(d){
			////console.log('d.checked', d.checked, 'd.criteria_no:', d.criteria_no, '(d.checked == undefined):', (d.checked == undefined));
			if(d.checked == undefined) d.checked = false;
			else d.checked = true;
			////console.log('result:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value, 'check:', d.checked);
		});
		////console.log('fillEditSD():dataSet:', dataSet.length);
		$.each(dataSet, function (i, val) {
			//alert(i+","+val.condition_type+','+val.condition_operation+','+val.condition_value+','+val.checked);
			if(val.condition_type == 0) {
				$("#criteriano").val(val.criteria_no);
				$("#criteriano").attr('disabled', 'disabled');
				$("#path").val(val.condition_value);
			} else if(val.condition_type == 91) {
				$("#reportname").val(val.condition_value);
			} else if(val.condition_type == 1) {
				if(val.checked == 1) {//if have data, set checked
					$("#tacck").attr("checked",'true');
					$("#tacad").val(val.condition_operation);
					$("#tac").val(val.condition_value);
				}
			} else if(val.condition_type == 2) {
				if(val.checked == 1) {//if have data, set checked
					$("#lacck").attr("checked",'true');
					$("#lacad").val(val.condition_operation);
					$("#lac").val(val.condition_value);
				}
			} else if(val.condition_type == 3) {
				if(val.checked == 1) {//if have data, set checked
					$("#cellidck").attr("checked",'true');
					$("#cellidad").val(val.condition_operation);
					$("#cellid").val(val.condition_value);
				}
			} else if(val.condition_type == 4) {
				if(val.checked == 1) {//if have data, set checked
					$("#callsoutck").attr("checked",'true');
					$("#callsoutad").val(val.condition_operation);
					$("#callsout").val(val.condition_value);
				}
			} else if(val.condition_type == 5) {
				if(val.checked == 1) {//if have data, set checked
					$("#callsinck").attr("checked",'true');
					$("#callsinad").val(val.condition_operation);
					$("#callsin").val(val.condition_value);
				}
			} else if(val.condition_type == 6) {
				if(val.checked == 1) {//if have data, set checked
					$("#smsoutck").attr("checked",'true');
					$("#smsoutad").val(val.condition_operation);
					$("#smsout").val(val.condition_value);
				}
			} else if(val.condition_type == 7) {
				if(val.checked == 1) {//if have data, set checked
					$("#intloutck").attr("checked",'true');
					$("#intloutad").val(val.condition_operation);
					$("#intlout").val(val.condition_value);
				}
			} else if(val.condition_type == 8) {
				if(val.checked == 1) {//if have data, set checked
					$("#domtoutck").attr("checked",'true');
					$("#domtoutad").val(val.condition_operation);
					$("#domtout").val(val.condition_value);
				}
			} else if(val.condition_type == 9) {
				if(val.checked == 1) {//if have data, set checked
					$("#cellck").attr("checked",'true');
					$("#cellad").val(val.condition_operation);
					$("#cell").val(val.condition_value);
				}
			} else if(val.condition_type == 10) {
				if(val.checked == 1) {//if have data, set checked
					$("#ratiock").attr("checked",'true');
					$("#ratioad").val(val.condition_operation);
					$("#ratio").val(val.condition_value);
				}
			} else if(val.condition_type == 11) {
				if(val.checked == 1) {//if have data, set checked
					$("#vendorck").attr("checked",'true');
					$("#vendorad").val(val.condition_operation);
					$("#vendor").val(val.condition_value);
				}
			} else if(val.condition_type == 12) {
				if(val.checked == 1) {//if have data, set checked
					$("#modelck").attr("checked",'true');
					$("#modelad").val(val.condition_operation);
					$("#model").val(val.condition_value);
				}
			} else if(val.condition_type == 13) {
				if(val.checked == 1) {//if have data, set checked
					$("#avgoutdurck").attr("checked",'true');
					$("#avgoutdurad").val(val.condition_operation);
					$("#avgoutdur").val(val.condition_value);
				}
			} else if(val.condition_type == 14) {
				if(val.checked == 1) {//if have data, set checked
					$("#avginminck").attr("checked",'true');
					$("#avginminad").val(val.condition_operation);
					$("#avginmin").val(val.condition_value);
				}
			} else if(val.condition_type == 15) {
				if(val.checked == 1) {//if have data, set checked
					$("#ignorvendorck").attr("checked",'true');
					$("#ignorvendorad").val(val.condition_operation);
					$("#ignorvendor").val(val.condition_value);
				}
			} else if(val.condition_type == 16) {
				if(val.checked == 1) {//if have data, set checked
					$("#smsidnck").attr("checked",'true');
					$("#smsisdnad").val(val.condition_operation);
					$("#smsisdn").val(val.condition_value);
				}
			} else if(val.condition_type == 17) {
				if(val.checked == 1) {//if have data, set checked
					$("#laccick").attr("checked",'true');
					$("#lacciad").val(val.condition_operation);
					$("#lacci").val(val.condition_value);
				}
			} else if(val.condition_type == 18) {
				if(val.checked == 1) {//if have data, set checked
					$("#burstingck").attr("checked",'true');
					$("#burstingad").val(val.condition_operation);
					$("#bursting").val(val.condition_value);
				}
				/*
				 } else if(val.condition_type == 19) {
				 if(val.checked == 1) {//if have data, set checked
				 $("#tacck").attr("checked",'true');
				 $("#tacad").val(val.condition_operation);
				 $("#tac").val(val.condition_value);
				 }*/
			} else if(val.condition_type == 20) {
				if(val.checked == 1) {//if have data, set checked
					$("#illodd24ck").attr("checked",'true');
					$("#illodd24ad").val(val.condition_operation);
					$("#illodd24").val(val.condition_value);
				}
			} else if(val.condition_type == 21) {
				if(val.checked == 1) {//if have data, set checked
					$("#iscnicck").attr("checked",'true');
					//$("#tacad").val(val.condition_operation);
					//$("#tac").val(val.condition_value);
				}
			} else if(val.condition_type == 22) {
				if(val.checked == 1) {//if have data, set checked
					$("#avgindurck").attr("checked",'true');
					$("#avgindurad").val(val.condition_operation);
					$("#avgindur").val(val.condition_value);
				}
			} else if(val.condition_type == 23) {
				if(val.checked == 1) {//if have data, set checked
					$("#smsinck").attr("checked",'true');
					$("#smsinad").val(val.condition_operation);
					$("#smsin").val(val.condition_value);
				}
			} else if(val.condition_type == 24) {
				if(val.checked == 1) {//if have data, set checked
					$("#numimeick").attr("checked",'true');
					$("#numimeiad").val(val.condition_operation);
					$("#numimei").val(val.condition_value);
				}
			} else if(val.condition_type == 25) {
				if(val.checked == 1) {//if have data, set checked
					$("#offnetoutck").attr("checked",'true');
					$("#offnetoutad").val(val.condition_operation);
					$("#offnetout").val(val.condition_value);
				}
			} else if(val.condition_type == 26) {
				if(val.checked == 1) {//if have data, set checked
					$("#inoutratiock").attr("checked",'true');
					$("#inoutratioad").val(val.condition_operation);
					$("#inoutratio").val(val.condition_value);
				}
			} else if(val.condition_type == 92) {
				$("input[name='prodmodead'][value='"+val.condition_value+"']").attr("checked",true);
			} else if(val.condition_type == 93) {
				$("input[name='sourcead'][value='"+val.condition_value+"']").attr("checked",true);
			} else if(val.condition_type == 94) {
				$("input[name='prefixad'][value='"+val.condition_value+"']").attr("checked",true);
			} else if(val.condition_type == 95) {
				$("input[name='dupad'][value='"+val.condition_value+"']").attr("checked",true);
			} else if(val.condition_type == 96) {
				$("input[name='offpeakad'][value='"+val.condition_value+"']").attr("checked",true);
			} else if(val.condition_type == 97) {
				if(val.checked == 1) {//if have data, set checked
					if($("input[name='prodmodead']:checked").val() == 1) {
						$("#prodfilepath").removeAttr('disabled');
						$("#prodfilepath").val(val.condition_value);
					}
				}
			} else if(val.condition_type == 98) {
				$("input[name='shortcallsad'][value='"+val.condition_value+"']").attr("checked",true);
			}
		});

	}

	function makeGraphs(error, apiData) {
		var dataSet = apiData;
		if (!dataSet || dataSet.length == 0){
			//console.log("No data retrieved. Do nothing");
			$("#sdc-datatable").dataTable().fnDestroy();
		}

		dataSet = spliceJson(dataSet);
		/*
		 dataSet.forEach(function(d) {
		 //console.log('result:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value);
		 });*/

		//console.log('makeGraphs():dataSet:', dataSet.length);
		var datatable = $("#sdc-datatable").dataTable({
			"columnDefs": [
				{ "visible": false, "targets": 0 }
			],
			"order": [[ 0, 'asc' ]],
			"sScrollX":"100%",
			"bFilter": false,
			"bSort": false,
			"bInfo": true,
			"bAutoWidth": true,
			"bDeferRender": true,
			"bDestroy": true,
			"bPaginate": false,
			"iDisplayLength": "100",
			"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
				$('td', nRow).attr('nowrap','nowrap');
				return nRow;
			},
			"drawCallback": function ( settings ) {
				var api = this.api();
				var rows = api.rows( {page:'current'} ).nodes();
				var last=null;

				api.column(0, {page:'current'} ).data().each( function ( group, i ) {
					if ( last !== group ) {
						$(rows).eq( i ).before(
							'<tr class="group"><td colspan="4"><input type="radio" name="crtno" value='+group+' >  Criteria NO:'+group+'</td></tr>'
						);

						last = group;
					} else {
						$(rows).hide();
					}
				} );
			},
			"data": dataSet,
			"aoColumns": [
				{ "mData": "criteria_no", "sDefaultContent": "" }
				,{ "mData": "criteria_no", "sDefaultContent": "" }
				,{ "mData": "comment", "sDefaultContent": "" }
				,{ "mData": "condition_operation", "sDefaultContent": "" }
				,{ "mData": "condition_value", "sDefaultContent": ""}
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
					buttons: [
						'copy',
						'excel',
						'csv',
						'pdf'
					]
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
		dc.renderAll();
		$('#ajax_loader').hide();
	};

	function fillShutdownReport(error, apiData) {
		var dataSet = apiData;
		if (!dataSet || dataSet.length == 0){
			//console.log("No data retrieved. Do nothing");
			$("#sdr-datatable").dataTable().fnDestroy();
			return;
		}

		//console.log('fillShutdownReport():dataSet:', dataSet.length);
		var datatable = $("#sdr-datatable").dataTable({
			"sScrollX":"100%",
			"bFilter": true,
			"bSort": false,
			"bInfo": true,
			"bAutoWidth": true,
			"bDeferRender": true,
			"bDestroy": true,
			"bPaginate": true,
			"iDisplayLength": "25",
			"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
				$('td', nRow).attr('nowrap','nowrap');
				return nRow;
			},
			"data": dataSet,
			"aoColumns": [
				{ "mData": "traffic_date", "sDefaultContent": "" }
				,{ "mData": "traffic_hour", "sDefaultContent": "" }
				,{ "mData": "msisdn", "sDefaultContent": "" }
				,{ "mData": "report_name", "sDefaultContent": "" }
				,{ "mData": "comment", "sDefaultContent": "" }
				,{ "mData": "create_time", "sDefaultContent": ""}
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
						title:'ShutdownCriteria'
					},
						{
							extend:'csvHtml5',
							title:'ShutdownCriteria'
						},
						{
							extend:'excelHtml5',
							title:'ShutdownCriteria'
						}/*,
						{
							extend:'pdfHtml5',
							title:'ShutdownCriteria'
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
		dc.renderAll();

	}

	function spliceJson(dataSet) {
		var crno = '';
		var crtype = '';
		var crvalue = '';
		var d ;
		for(var i=0;i<dataSet.length;i++) {
			//dataSet.forEach(function(d) {
			d = dataSet[i];
			////console.log('0:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value, '|crno:', crno, '|crtype:', crtype, '|crvalue:', crvalue);
			////console.log('is same:', d.criteria_no != crno, '&', d.condition_type != crtype );
			if(d.criteria_no != crno) {
				crno = d.criteria_no;
				crtype = d.condition_type;
				crvalue = d.condition_value;
				////console.log('1:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value, '|crno:', crno, '|crtype:', crtype, '|crvalue:', crvalue);

			} else {
				if(d.condition_type != crtype) {
					////console.log('2:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value, '|crno:', crno, '|crtype:', crtype, '|crvalue:', crvalue);

					crtype = d.condition_type;
					crvalue = d.condition_value;
					////console.log('3:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value, '|crno:', crno, '|crtype:', crtype, '|crvalue:', crvalue);

				} else {
					////console.log('4:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value, '|crno:', crno, '|crtype:', crtype, '|crvalue:', crvalue);

					crvalue += "," + d.condition_value;
					d.condition_value = crvalue;
					////console.log('5:', d.id, '|', d.criteria_no, '|type:', d.condition_type, '|value:', d.condition_value, '|crno:', crno, '|crtype:', crtype, '|crvalue:', crvalue);
					dataSet.splice(i-1,1);
				}
			}
		}
		return dataSet;
	}

} );
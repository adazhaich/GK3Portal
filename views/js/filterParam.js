
$(document).ready(function(){
	//console.log('filterParam.js');
	//reportType 1-FraudSummary, 2-Simbox Summary, 3-Other Operator
	
	var day = getElement("#day").val() === undefined ? "" : getElement("#day").val();
    var hour = getElement("#hour").val() === undefined ? "" : getElement("#hour").val();
    var start = getElement("#start").val() === undefined ? "" : getElement("#start").val();
    var end = getElement("#end").val() === undefined ? "" : getElement("#end").val();
	var filterId = getElement("#filterId").val() === undefined ? "" : getElement("#filterId").val();
	var filterSql = getElement("#filterSql").val() === undefined ? "" : getElement("#filterSql").val();
	var reportType = getElement("#reportType").val() === undefined ? "" : getElement("#reportType").val();
	
	getElement( "#filterId").on( "change", function() {
	    //console.log( "change select" );
	    getElement("#adv_form")[0].reset();
	    filterId = getElement("#filterId").val();
	    //console.log( "filterId=", filterId);
	    show(filterId);
	    if(filterId != 0 || filterId != 'ALL') {
	    	getElement( "#show").removeAttr("disabled"); 
	    	getElement( "#delete").removeAttr("disabled");
	    } 
	});
	
	getElement( "#filterName").on( "blur", function() {
	    //console.log( "change filter name" );
	    var filterName = getElement("#filterName").val();
	    if(filterName.trim() == '') getElement( "#filterName").focus();
	    else getElement( "#save").removeAttr("disabled"); 
	});

	getElement( "#show").on( "click", function() {
	    //console.log( "Show button was clicked" );
	    day = getElement("#day").val() === undefined ? "" : getElement("#day").val();
	    hour = getElement("#hour").val() === undefined ? "" : getElement("#hour").val();
	    start = getElement("#start").val() === undefined ? "" : getElement("#start").val();
	    end = getElement("#end").val() === undefined ? "" : getElement("#end").val();
	    filterId = getElement("#filterId").val();
	    if(filterId == 0 || filterId == 'ALL'){ alert("Please Select Filter Value"); return}
	    filterSql = getElement("#filterSql").val();
	    reportType = getElement("#reportType").val();
	    setOrgFlt(day, hour, start, end, filterSql, reportType);
	});
	
	getElement( "#save").on( "click", function() {
	    //console.log( "save button was clicked" );
	    var filterDetail;
	    var filterName = getElement("#filterName").val();
	    if(filterName == "") {alert("Please input Filter Name"); return;}
	    reportType = getElement("#reportType").val();
	    
	    if(reportType == "hf_div") {
	    
		    var illoddsro=getElement('input:radio[name="illodds"]:checked').val();
		    var illodds = getElement("#illodds").val();
		    var illoddsadro=getElement('input:radio[name="illoddsad"]:checked').val();
		    var illoddsad = getElement("#illoddsad").val();
		    var illodds7adro=getElement('input:radio[name="illodds7ad"]:checked').val();
		    var illodds7ad = getElement("#illodds7ad").val();
		    var numoutro=getElement('input:radio[name="numout"]:checked').val();
		    var numout = getElement("#numout").val();
		    var numoutadro=getElement('input:radio[name="numoutad"]:checked').val();
		    var numoutad = getElement("#numoutad").val();
		    var numdistbro=getElement('input:radio[name="numdistb"]:checked').val();
		    var numdistb = getElement("#numdistb").val();
		    var ratioro=getElement('input:radio[name="ratio"]:checked').val();
		    var ratio = getElement("#ratio").val();
		    var ratio2ro=getElement('input:radio[name="ratio2"]:checked').val();
		    var ratio2 = getElement("#ratio2").val();
		    var smsoutro=getElement('input:radio[name="smsout"]:checked').val();
		    var smsout = getElement("#smsout").val();
		    var smsoutigro=getElement('input:radio[name="smsoutig"]:checked').val();
		    var smsoutig = getElement("#smsoutig").val();
		    var smsinro=getElement('input:radio[name="smsin"]:checked').val();
		    var smsin = getElement("#smsin").val();
		    var numinro=getElement('input:radio[name="numin"]:checked').val();
		    var numin = getElement("#numin").val();
		    var avgdurro=getElement('input:radio[name="avgdur"]:checked').val();
		    var avgdur = getElement("#avgdur").val();
		    var burstingro=getElement('input:radio[name="bursting"]:checked').val();
		    var bursting = getElement("#bursting").val();
		    var cellsro=getElement('input:radio[name="cells"]:checked').val();
		    var cells = getElement("#cells").val();
		    var offpeakro=getElement('input:radio[name="offpeak"]:checked').val();
		    var offpeak = getElement("#offpeak").val();
		    var sumoutdurro=getElement('input:radio[name="sumoutdur"]:checked').val();
		    var sumoutdur = getElement("#sumoutdur").val();
		    var sumoutunitro=getElement('input:radio[name="sumoutunit"]:checked').val();
		    var sumoutunit = getElement("#sumoutunit").val();
		    var sumoutlossro=getElement('input:radio[name="sumoutloss"]:checked').val();
		    var sumoutloss = getElement("#sumoutloss").val();
		    var avgindurro=getElement('input:radio[name="avgindur"]:checked').val();
		    var avgindur = getElement("#avgindur").val();
		    var sumindurro=getElement('input:radio[name="sumindur"]:checked').val();
		    var sumindur = getElement("#sumindur").val();
		    var suminunitro=getElement('input:radio[name="suminunit"]:checked').val();
		    var suminunit = getElement("#suminunit").val();
		    var domoutro=getElement('input:radio[name="domout"]:checked').val();
		    var domout = getElement("#domout").val();
		    var intloutro=getElement('input:radio[name="intlout"]:checked').val();
		    var intlout = getElement("#intlout").val();
		    
		    var vendor = getElement("#vendor").val();
		    var model = getElement("#model").val();
		    var cellid = getElement("#cellid").val();
		    var lac = getElement("#lac").val();
		    var trunkin = getElement("#trunkin").val();
		    var trunkout = getElement("#trunkout").val();
		    var simsi = getElement("#simsi").val();
		    var smsisdn = getElement("#smsisdn").val();
		    var simei = getElement("#simei").val();
		    
		    filterDetail = illoddsro+"-"+illodds+")("+illoddsadro+"-"+illoddsad+")("+illodds7adro+"-"+illodds7ad+")("+numoutro+"-"+numout+
		    		")("+numoutadro+"-"+numoutad+")("+numdistbro+"-"+numdistb+")("+ratioro+"-"+ratio+")("+ratio2ro+"-"+ratio2+
		    		")("+smsoutro+"-"+smsout+")("+smsoutigro+"-"+smsoutig+")("+smsinro+"-"+smsin+")("+numinro+"-"+numin+
		    		")("+avgdurro+"-"+avgdur+")("+burstingro+"-"+bursting+")("+cellsro+"-"+cells+")("+offpeakro+"-"+offpeak+
		    		")("+sumoutdurro+"-"+sumoutdur+")("+sumoutunitro+"-"+sumoutunit+")("+sumoutlossro+"-"+sumoutloss+")("+avgindurro+"-"+avgindur+
		    		")("+sumindurro+"-"+sumindur+")("+suminunitro+"-"+suminunit+")("+domoutro+"-"+domout+")("+intloutro+"-"+intlout+
		    		")(-"+vendor+")(-"+model+")(-"+cellid+")(-"+lac+")(-"+trunkin+")(-"+trunkout+")(-"+simsi+")(-"+smsisdn+")(-"+simei;
	    } else if(reportType == "hbn_div") {
	    	var amsisdn = getElement("#amsisdn").val();
	    	var bmsisdn = getElement("#bmsisdn").val();
	    	var durationro=getElement('input:radio[name="duration"]:checked').val();
		    var duration = getElement("#duration").val();

		    var cellid = getElement("#cellid").val();
		    var lac = getElement("#lac").val();
		    var imei = getElement("#imei").val();
		    var source = getElement("#hbnsource").val();
		    
		    filterDetail = "-" + amsisdn +")(-"+ bmsisdn +")(" + durationro + "-" + duration + ")(-" + cellid +
		    			")(-" + lac + ")(-" + imei + ")(-" + source;
	    } else if(reportType == "dd_div") {
		    var source = getElement("#ddsource").val();
		    var first = getElement("#first").val();
		    var operator = getElement("#operator").val();
		    var corp = getElement("#corp").val();
		    var msisdn = getElement("#msisdn").val();
		    var imsi = getElement("#imsi").val();
		    var cellid = getElement("#ddcellid").val();
		    var lac = getElement("#ddlac").val();
		    var vendor = getElement("#vendor").val();
		    var model = getElement("#model").val();
		    var subid = getElement("#subid").val();
		    var dealid = getElement("#dealerid").val();
		    var hmro=getElement('input:radio[name="hm"]:checked').val();
		    var amountro=getElement('input:radio[name="amount"]:checked').val();
		    var amount = getElement("#amount").val();
		    var rembalacero=getElement('input:radio[name="rembalance"]:checked').val();
		    var rembalance = getElement("#rembalance").val();
		    var callsro=getElement('input:radio[name="calls"]:checked').val();
		    var calls = getElement("#calls").val();
		    var mouro=getElement('input:radio[name="mou"]:checked').val();
		    var mou = getElement("#mou").val();
		    var datausgro=getElement('input:radio[name="datausg"]:checked').val();
		    var datausg = getElement("#datausg").val();
		    
		    filterDetail = "-"+source+")(-"+first+")(-"+operator+")(-"+corp+
		    		")(-"+msisdn+")(-"+imsi+")(-"+cellid+")(-"+lac+
		    		")(-"+vendor+")(-"+model+")(-"+subid+")(-"+dealid+")(-"+hmro+
		    		")("+amountro+"-"+amount+")("+rembalacero+"-"+rembalance+
		    		")("+callsro+"-"+calls+")("+mouro+"-"+mou+")("+ datausgro+"-"+datausg;
	    }
	    
	    //console.log( "reportType=", reportType);
	    //console.log( "filterName=", filterName);
	    //console.log( "filterDetail=", filterDetail);
	    save(reportType, filterName, filterDetail);
	});
	
	getElement( "#delete").on( "click", function() {
	    //console.log( "delete button was clicked" );
	    filterId = getElement("#filterId").val();
	    //console.log( "filterId=", filterId);
	    getElement("#adv_form")[0].reset();
	    deleteBtn(filterId);
	    
	    getElement( "#show").attr("disabled", "disabled"); 
    	getElement( "#delete").attr("disabled", "disabled");
	});
	
	getElement( "#empty").on( "click", function() {
	    //console.log( "empty button was clicked" );
	    getElement("#adv_form")[0].reset();
	    getElement("#filterId").val(0);
	    getElement("#refresh").click();
	});

	function filter(reportType){
		//var url = "/tunisiana/dataaccess/filteridlist";
		var url =clientHTTPConfig.appContextRoot+"/dataaccess/filteridlist";
		url += "?reportType="+reportType
	
	//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
	    //console.log( "url=", url );
		queue().defer(d3.json, url).await(makeGraphs);
		
	}	
	
	function show (filterId){
		//var url = "/tunisiana/dataaccess/filterparam";
		var url =clientHTTPConfig.appContextRoot+"/dataaccess/filterparam";
		url = url + "?filterId="+filterId;
	
	//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
	    //console.log( "url=", url );
		queue().defer(d3.json, url).await(fillFilterDetail);
		
	}	
	
	function setOrgFlt (day, hour, start, end, filterSql, reportType){
		//var url = "/tunisiana/dataaccess/setorgflt";
		var url =clientHTTPConfig.appContextRoot+"/dataaccess/setorgflt";
		var condition = "";
		if(reportType == "hbn_div") {
			condition = concatParam(condition, "call_date", "=", "'" + moment(day, "YYYYMMDDHH").format('YYYYMMDDHH')  + "'");
			condition = concatParam(condition, "call_date", ">=", "'" + moment(start, "YYYYMMDDHH").format('YYYYMMDDHH')  + "'");
			condition = concatParam(condition, "call_date", "<=", "'" + moment(end, "YYYYMMDDHH").format('YYYYMMDDHH') + "'");
		} else if(reportType == "hf_div") {
			var startDayHour = getDateHourStr(day, start); //dateStr+start;
			var endDayHour =  getDateHourStr(day, end); //dateStr+end;
		    condition = concatParam(condition, "traffic_date_hour", ">=", "'" + moment(startDayHour, "YYYYMMDDHH").format('YYYYMMDDHH') + "'"  );
			condition = concatParam(condition, "traffic_date_hour", "<=", "'" + moment(endDayHour, "YYYYMMDDHH").format('YYYYMMDDHH') + "'" );
		} else if(reportType == "dd_div") {
			condition = concatParam(condition, "call_date_hour", "=", "'" + moment(day, "YYYYMMDDHH").format('YYYYMMDDHH') + "'");
			condition = concatParam(condition, "call_date_hour", ">=", "'" + moment(start, "YYYYMMDDHH").format('YYYYMMDDHH') + "'");
			condition = concatParam(condition, "call_date_hour", "<=", "'" + moment(end, "YYYYMMDDHH").format('YYYYMMDDHH') + "'");
		}
		
		//console.log('conditon:', condition);

		url = url + "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&filterSql=" + "&reportType=" + reportType + "&condition=" + condition;
	
	//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
	    //console.log( "url=", url );
		queue().defer(d3.json, url).await(fillOrg);
		
		//url = "/dataaccess/setorgflt";
		url =clientHTTPConfig.appContextRoot+"/dataaccess/setorgflt";

		url = url + "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&filterSql="+filterSql+ "&reportType=" + reportType + "&condition=" + condition;
		//console.log( "url=", url );
		queue().defer(d3.json, url).await(fillFlt);
	}	
	
	function save (reportType, filterName, filterDetail){
		//var url = "/tunisiana/dataaccess/savefilterparam";

		var url =clientHTTPConfig.appContextRoot+"/dataaccess/savefilterparam";
		url = url +"?reportType="+reportType+"&filterName="+filterName+"&filterDetail="+filterDetail;
	
	//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
	    //console.log( "url=", url );
		queue().defer(d3.json, url).await(fillSaveDetail);
		
	}	
	
	function deleteBtn (filterId){
		//var url = "/tunisiana/dataaccess/dltfilterparam";
		var url =clientHTTPConfig.appContextRoot+"/dataaccess/dltfilterparam";
		url = url + "?filterId="+filterId;
	    //console.log( "url=", url );
		queue()
		    .defer(d3.json, url).await(function(){
		    	getElement("#filterId option[value='"+filterId+"']").remove();
		    });
		
	}	
	
	function empty (filterId){
		//var url = "/tunisiana/dataaccess/emptyfilter";
		var url =clientHTTPConfig.appContextRoot+"/dataaccess/emptyfilter";
	
	//	url += "?day="+day + "&hour="+hour + "&start="+start + "&end="+end + "&illegalOdds="+illegalOdds;
	    //console.log( "url=", url );
		queue()
		    .defer(d3.json, url)
		    .await(makeGraphs);
		
	}	
	filter(reportType);	
	

	function makeGraphs(error, apiData) {
		getElement('#filterId').append($("<option/>", {
			value: 0,
			text: 'ALL'
		}));
		var dataSet = apiData;
		$.each(dataSet, function(idx, obj) {
			getElement('#filterId').append($("<option/>", {
				value: obj.filter_id,
				text: obj.filter_name
			}));
		});
	};	
	
	function fillFilterDetail(error, apiData) {
		var dataSet = apiData;
		$.each(dataSet, function(idx, obj) {
			getElement('#filterName').val(obj.filter_name);
			analyFilterDetail(obj.filter_detail);
		});
	}

	function fillSaveDetail(error, apiData) {
		var filterName = getElement("#filterName").val();
		var dataSet = apiData;
		if(dataSet.insertId != 0 ) {
			getElement('#filterId').append($("<option/>", {
				value: dataSet.insertId,
				text: filterName
			}));
		}

		getElement("#adv_form")[0].reset();
		getElement("#filterId").val(0);
	}
	
	function fillOrg(error, apiData) {
		var dataSet = apiData;
		getElement('#totalNum').val(dataSet);
	}
	
	function fillFlt(error, apiData) {
		var dataSet = apiData;
		getElement('#filterNum').val(dataSet);
		getElement( "#refresh").click();
	}
	
	function setradio(robj, v)
	{
		for(i=0;i<robj.length;i++){
			if(robj[i].value==v){
				robj[i].checked=true;
			}
		}
	}
	
	function analyFilterDetail(filterDetail) {
		var filterSql = Array("");
		var str = new Array();
		var arr1 = new Array();
		if(filterDetail == undefined || filterDetail == "" || filterDetail == "undefined")
			return null;
		var arr = filterDetail.split(")(");
		$.each(arr, function(i, item) {
			
			arr1 = item.split("-");
			$.each(arr1, function(j, item1) {
				if(reportType == "hf_div") {
					if(j == 0) {
						if(i==0) {//Illegal Odds 
							setradio(getElement("input[name='illodds']"),item1);
						}
						else if(i==1) {//Illegal Odds ad
							setradio(getElement("input[name='illoddsad']"),item1);
						}
						else if(i==2) {//Illegal Odds 7 Ad
							setradio(getElement("input[name='illodds7ad']"),item1);
						}
						else if(i==3) {//numout
							setradio(getElement("input[name='numout']"),item1);
						}
						else if(i==4) {//numoutad
							setradio(getElement("input[name='numoutad']"),item1);
						}
						else if(i==5) {//numdistb
							setradio(getElement("input[name='numdistb']"),item1);
						}
						else if(i==6) {//ratio
							setradio(getElement("input[name='ratio']"),item1);
						}
						else if(i==7) {//ratio2
							setradio(getElement("input[name='ratio2']"),item1);
						}
						else if(i==8) {//smsout
							setradio(getElement("input[name='smsout']"),item1);
						}
						else if(i==9) {//smsoutig
							setradio(getElement("input[name='smsoutig']"),item1);
						}
						else if(i==10) {//smsin
							setradio(getElement("input[name='smsin']"),item1);
						}
						else if(i==11) {//numin
							setradio(getElement("input[name='numin']"),item1);
						}
						else if(i==12) {//avgdur
							setradio(getElement("input[name='avgdur']"),item1);
						}
						else if(i==13) {//bursting
							setradio(getElement("input[name='bursting']"),item1);
						}
						else if(i==14) {//cells
							setradio(getElement("input[name='cells']"),item1);
						}
						else if(i==15) {//offpeak
							setradio(getElement("input[name='offpeak']"),item1);
						}
						else if(i==16) {//sumoutdur
							setradio(getElement("input[name='sumoutdur']"),item1);
						}
						else if(i==17) {//sumoutunit
							setradio(getElement("input[name='sumoutunit']"),item1);
						}
						else if(i==18) {//sumoutloss
							setradio(getElement("input[name='sumoutloss']"),item1);
						}
						else if(i==19) {//avgindur
							setradio(getElement("input[name='avgindur']"),item1);
						}
						else if(i==20) {//sumindur
							setradio(getElement("input[name='sumindur']"),item1);
						}
						else if(i==21) {//suminunit
							setradio(getElement("input[name='suminunit']"),item1);
						}
						else if(i==22) {//domout
							setradio(getElement("input[name='domout']"),item1);
						}
						else if(i==23) {//intlout
							setradio(getElement("input[name='intlout']"),item1);
						}
						else if(i==24) {//Vendor
							getElement('#vendor').val(item1);
							setFilterSqlStr(filterSql, item1, "vendor", "vendor");
						}
						else if(i==25) {//Model
							getElement('#model').val(item1);
							setFilterSqlStr(filterSql, item1, "model", "model");
						}
						else if(i==26) {//Cell ID
							getElement('#cellid').val(item1);
							setFilterSqlStr(filterSql, item1, "cell_id", "cellid");
						}
						else if(i==27) {//LAC
							getElement('#lac').val(item1);
							setFilterSqlStr(filterSql, item1, "lac", "lac");
						}
						else if(i==28) {//Trunk IN
							getElement('#trunkin').val(item1);
							setFilterSqlStr(filterSql, item1, "trunk_in", "trunkin");
						}
						else if(i==29) {//Trunk Out
							getElement('#trunkout').val(item1);
							setFilterSqlStr(filterSql, item1, "trunk_out", "trunkout");
						}
						else if(i==30) {//S_IMSI
							getElement('#simsi').val(item1);
							setFilterSqlStr(filterSql, item1, "s_imsi", "simsi");
						}
						else if(i==31) {//s_MSISDN
							getElement('#smsisdn').val(item1);
							setFilterSqlStr(filterSql, item1, "s_msisdn", "smsisdn");
						}
						else if(i==32) {//S_IMEI
							getElement('#simei').val(item1);
							setFilterSqlStr(filterSql, item1, "s_imei", "simei");
						}
						
					} else if(j == 1) {
						if(i==0) {//illegalodds
							getElement('#illodds').val(item1);
							setFilterSqlStr(filterSql, item1, "illegalodds", "illodds");
						}
						else if(i==1) {//illegal_odds_ad
							getElement('#illoddsad').val(item1);
							setFilterSqlStr(filterSql, item1, "illegal_odds_ad", "illoddsad");
						}
						else if(i==2) {//illegal_odds7_ad
							getElement('#illodds7ad').val(item1);
							setFilterSqlStr(filterSql, item1, "illegal_odds7_ad", "illodds7ad");
						}
						else if(i==3) {//Num Out 
							getElement('#numout').val(item1);
							setFilterSqlStr(filterSql, item1, "num_out", "numout");
						}
						else if(i==4) {//numoutad
							getElement('#numoutad').val(item1);
							setFilterSqlStr(filterSql, item1, "num_out_ad", "numoutad");
						}
						else if(i==5) {//numdistb
							getElement('#numdistb').val(item1);
							setFilterSqlStr(filterSql, item1, "num_distinct_b", "numdistb");
						}
						else if(i==6) {//ratio
							getElement('#ratio').val(item1);
							setFilterSqlStr(filterSql, item1, "ratio", "ratio");
						}
						else if(i==7) {//ratio2
							getElement('#ratio2').val(item1);
							setFilterSqlStr(filterSql, item1, "ratio2", "ratio2");
						}
						else if(i==8) {//smsout
							getElement('#smsout').val(item1);
							setFilterSqlStr(filterSql, item1, "sms_out", "smsout");
						}
						else if(i==9) {//smsoutig
							getElement('#smsoutig').val(item1);
							setFilterSqlStr(filterSql, item1, "sms_out_ig", "smsoutig");
						}
						else if(i==10) {//sms_in
							getElement('#smsin').val(item1);
							setFilterSqlStr(filterSql, item1, "sms_in", "smsin");
						}
						else if(i==11) {//num_in
							getElement('#numin').val(item1);
							setFilterSqlStr(filterSql, item1, "num_in", "numin");
						}
						else if(i==12) {//avg_duration
							getElement('#avgdur').val(item1);
							setFilterSqlStr(filterSql, item1, "avg_duration", "avgdur");
						}
						else if(i==13) {//bursting
							getElement('#bursting').val(item1);
							setFilterSqlStr(filterSql, item1, "bursting", "bursting");
						}
						else if(i==14) {//cells
							getElement('#cells').val(item1);
							setFilterSqlStr(filterSql, item1, "cells", "cells");
						}
						else if(i==15) {//off_peak_ratio
							getElement('#offpeak').val(item1);
							setFilterSqlStr(filterSql, item1, "off_peak_ratio", "offpeak");
						}
						else if(i==16) {//sum_out_duration
							getElement('#sumoutdur').val(item1);
							setFilterSqlStr(filterSql, item1, "sum_out_duration", "sumoutdur");
						}
						else if(i==17) {//sum_out_unit
							getElement('#sumoutunit').val(item1);
							setFilterSqlStr(filterSql, item1, "sum_out_unit", "sumoutunit");
						}
						else if(i==18) {//sum_out_loss
							getElement('#sumoutloss').val(item1);
							setFilterSqlStr(filterSql, item1, "sum_out_loss", "sumoutloss");
						}
						else if(i==19) {//avg_in_duration_unit
							getElement('#avgindur').val(item1);
							setFilterSqlStr(filterSql, item1, "avg_in_duration_unit", "avgindur");
						}
						else if(i==20) {//sum_in_duration
							getElement('#sumindur').val(item1);
							setFilterSqlStr(filterSql, item1, "sum_in_duration", "sumindur");
						}
						else if(i==21) {//sum_in_unit
							getElement('#suminunit').val(item1);
							setFilterSqlStr(filterSql, item1, "sum_in_unit", "suminunit");
						}
						else if(i==22) {//domestic_out
							getElement('#domout').val(item1);
							setFilterSqlStr(filterSql, item1, "domestic_out", "domout");
						}
						else if(i==23) {//international_out
							getElement('#intlout').val(item1);
							setFilterSqlStr(filterSql, item1, "international_out", "intlout");
						}


						else if(i==24) {//Vendor
							getElement('#vendor').val(item1);
							setFilterSqlStr(filterSql, item1, "vendor", "vendor");
						}
						else if(i==25) {//Model
							getElement('#model').val(item1);
							setFilterSqlStr(filterSql, item1, "model", "model");
						}
						else if(i==26) {//Cell ID
							getElement('#cellid').val(item1);
							setFilterSqlStr(filterSql, item1, "cell_id", "cellid");
						}
						else if(i==27) {//LAC
							getElement('#lac').val(item1);
							setFilterSqlStr(filterSql, item1, "lac", "lac");
						}
						else if(i==28) {//Trunk IN
							getElement('#trunkin').val(item1);
							setFilterSqlStr(filterSql, item1, "trunk_in", "trunkin");
						}
						else if(i==29) {//Trunk Out
							getElement('#trunkout').val(item1);
							setFilterSqlStr(filterSql, item1, "trunk_out", "trunkout");
						}
						else if(i==30) {//S_IMSI
							getElement('#simsi').val(item1);
							setFilterSqlStr(filterSql, item1, "s_imsi", "simsi");
						}
						else if(i==31) {//s_MSISDN
							getElement('#smsisdn').val(item1);
							setFilterSqlStr(filterSql, item1, "s_msisdn", "smsisdn");
						}
						else if(i==32) {//S_IMEI
							getElement('#simei').val(item1);
							setFilterSqlStr(filterSql, item1, "s_imei", "simei");
						}
					}
				} else if(reportType == "hbn_div") {
					if(j == 0) {
						if(i==2) {//Duration
							setradio(getElement("input[name='durationro']"),item1);
						}
					} else if(j == 1) {
						if(i==0) {//A MSISDN
							getElement('#amsisdn').val(item1);
							setFilterSqlStr(filterSql, item1, "a_msisdn", "amsisdn");
						}
						else if(i==1) {//B MSISDN
							getElement('#bmsisdn').val(item1);
							setFilterSqlStr(filterSql, item1, "b_msisdn", "bmsisdn");
						}
						else if(i==2) {//duration
							getElement('#duration').val(item1);
							setFilterSqlStr(filterSql, item1, "duration", "duration");
						}
						else if(i==3) {//Cell ID
							getElement('#cellid').val(item1);
							setFilterSqlStr(filterSql, item1, "cell_id", "cellid");
						}
						else if(i==4) {//LAC
							getElement('#lac').val(item1);
							setFilterSqlStr(filterSql, item1, "lac", "lac");
						}
						else if(i==5) {//IMEI
							getElement('#imei').val(item1);
							setFilterSqlStr(filterSql, item1, "imei", "imei");
						}
						else if(i==6) {//Source
							getElement('#fpsource').val(item1);
							setFilterSqlStr(filterSql, item1, "source", "source");
						}
					}
				} else if(reportType == "dd_div") {
					if(j == 0) {
						if(i==13) {//Last TopUp Amount
							setradio(getElement("input[name='amount']"),item1);
						}
						else if(i==14) {//Remaining Balance
							setradio(getElement("input[name='rembalance']"),item1);
						}
						else if(i==15) {//Calls
							setradio(getElement("input[name='calls']"),item1);
						}
						else if(i==16) {//MOU
							setradio(getElement("input[name='mou']"),item1);
						}
						else if(i==17) {//Data Usage
							setradio(getElement("input[name='datausg']"),item1);
						}
					} else if(j == 1) {
						if(i==0) {//Source
							getElement('#ddsource').val(item1);
							setFilterSqlStr(filterSql, item1, "source", "source");
						}
						else if(i==1) {//First
							getElement('#first').val(item1);
							setFilterSqlStr(filterSql, item1, "first_flag", "first");
						}
						else if(i==2) {//Operator
							getElement('#operator').val(item1);
							setFilterSqlStr(filterSql, item1, "operator", "operator");
						}
						else if(i==3) {//Corp
							getElement('#corp').val(item1);
							setFilterSqlStr(filterSql, item1, "corporateid", "corp");
						}
						else if(i==4) {//MSISDN
							getElement('#msisdn').val(item1);
							setFilterSqlStr(filterSql, item1, "msisdn", "msisdn");
						}
						else if(i==5) {//IMSI
							getElement('#imsi').val(item1);
							setFilterSqlStr(filterSql, item1, "imsi", "imsi");
						}
						else if(i==6) {//Cell ID
							getElement('#ddcellid').val(item1);
							setFilterSqlStr(filterSql, item1, "cell_id", "cellid");
						}
						else if(i==7) {//LAC
							getElement('#ddlac').val(item1);
							setFilterSqlStr(filterSql, item1, "lac", "lac");
						}
						else if(i==8) {//Vendor
							getElement('#vendor').val(item1);
							setFilterSqlStr(filterSql, item1, "vendor", "vendor");
						}
						else if(i==9) {//Model
							getElement('#model').val(item1);
							setFilterSqlStr(filterSql, item1, "model", "model");
						}
						else if(i==10) {//Sub ID
							getElement('#subid').val(item1);
							setFilterSqlStr(filterSql, item1, "subid", "subid");
						}
						else if(i==11) {//Dealer ID
							getElement('#dealerid').val(item1);
							setFilterSqlStr(filterSql, item1, "dealerid", "dealerid");
						}
						else if(i==12) {//HM
							setradio(getElement("input[name='hm']"),item1);
							setFilterSqlStr(filterSql, item1, "module", "hm");
						}
						else if(i==13) {//Last TopUp Amount
							getElement('#amount').val(item1);
							setFilterSqlStr(filterSql, item1, "last_topup_amount", "lasttopupamount");
						}
						else if(i==14) {//Remaining Balance
							getElement('#rembalance').val(item1);
							setFilterSqlStr(filterSql, item1, "remaining_balance", "rembalance");
						}
						else if(i==15) {//Calls
							getElement('#calls').val(item1);
							setFilterSqlStr(filterSql, item1, "calls", "calls");
						}
						else if(i==16) {//MOU
							getElement('#mou').val(item1);
							setFilterSqlStr(filterSql, item1, "mou", "mou");
						}
						else if(i==17) {//Data Usage
							getElement('#datausg').val(item1);
							setFilterSqlStr(filterSql, item1, "data_usage", "datausg");
						}
					}
				}
			});
		});
		getElement('#filterSql').val(filterSql.join(''));
		
	}
	
	function setFilterSqlStr(filterSql, item, colStr, radioStr) {
		if(item != undefined && item != '') {
			if(colStr == "handset_or_module" || colStr == "handset_make") {
				if(item != 'A') filterSql.push(" and " + colStr + "='" + item +"'");
			} else if(colStr == "handset_or_module" || colStr == "vendor" || colStr == "model" || 
					colStr == "cell_id" || colStr == "lac" || colStr == "trunk_in" || 
					colStr == "trunk_out" || colStr == "s_imsi" || colStr == "s_msisdn" || colStr == "a_msisdn" || 
					colStr == "b_msisdn" || colStr == "imei" || colStr == "source" ||
					colStr == "msisdn" || colStr == "operator" || colStr == "corporateid" || 
					colStr == "subid" || colStr == "dealerid") {
				filterSql.push(" and " + colStr + "='" + item +"'");
			} else if(colStr== "module") {
				filterSql.push(" and " + colStr + "=" + item );
			} else {
				if(colStr == "illegalodds" || colStr == "illegal_odds_ad" || colStr == "illegal_odds7_ad") {
					filterSql.push( " and " + colStr + (getElement("input[name='"+radioStr+"']").val() == 1 ? '>=' : '<=') + parseFloat(item)/100 );
				} else {
					filterSql.push( " and " + colStr + (getElement("input[name='"+radioStr+"']").val() == 1 ? '>=' : '<=') + item );
				}
			}
		}
		return filterSql;
	}
});





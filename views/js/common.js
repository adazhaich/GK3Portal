function displayDiv() 
{ 
	var flag = getElement("#adv_collapse").css("display");
	var report=getElement("#reportType").val(); 
	var div=getElement("#adv_collapse"); 
	getElement("#adv_form")[0].reset();

	getElement("#reportType").val = report;
    var advbtn = getElement("#advanced");
    if(flag == "none") {
    	getElement("#adv_collapse").css("display", "block"); 
    	getElement("#"+report).css("display", "block"); 
    	getElement("#advanced").html("Hide Advanced");
    } else {
    	getElement("#adv_collapse").css("display", "none"); 
    	getElement("#advanced").html("Advanced");
        getElement("#refresh").click();
    }
    getElement("#filterName").focus();
    /*
    var ftDiv = getElement(report);
    if(ftDiv != null && ftDiv != "null")
    	ftDiv.css("display", "block"); 
    
    var hbnDiv = getElement(report);
    if(hbnDiv != null && ftDiv != "null")
    	hbnDiv.css("display", "block"); 
    	*/
};
//concatParam(condition, "dealerid", "=", "'" + data + "'");
function concatParam(ccStr, colName, condition, colValue) {
	if(colValue == undefined || colValue == "" || colValue == "''" || colValue == "'undefined'" || colValue == "unix_timestamp('')" || colValue == 'Invalid date' || colValue == "'Invalid date'") {
		return ccStr;
	} else {
		if(ccStr != '') ccStr += " and ";
		ccStr += colName + condition + colValue;
		//console.log("fd:"+ccStr);
		return ccStr;
	}
};

function concatParamOther(ccStr, colName, condition, colValue) {
	if(colValue == undefined || colValue == "" || colValue == "''" || colValue == "'undefined'" || colValue == "unix_timestamp('')" || colValue == 'Invalid date' || colValue == "'Invalid date'") {
		return ccStr;
	} else {
		if(ccStr != '') ccStr += "&";
		ccStr += colName + condition + colValue;
		//console.log("fd:"+ccStr);
		return ccStr;
	}
};

//format date according the format style 
Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function transferTime(str) {
	if(str == "''") return '';
	if(str != "''" && str != "") {
		var year = str.split('-')[0];
		var month = parseInt(str.split('-')[1])-1;
		var day = parseInt(str.split('-')[2]);
		var date = new Date(year, month, day);
		return date.getTime() / 1000;
	} 
};

function transferFormatTime(str) {
	str = str.toString();
	if(str == "''") return '';
	if(str != "''" && str != "") {
		var year = str.substr(0,4);
		var month = parseInt(str.substr(4,2))-1;
		var day = parseInt(str.substr(6));
		var date = new Date(year, month, day);
		return date;
	} 
};

function transferTime2(str) {
	if(str == "''") return '';
	if(str != "''" && str != "") {
		var str1 = str.split(" ");
		var year = str1[0].split('-')[0];
		var month = parseInt(str1[0].split('-')[1])-1;
		var day = parseInt(str1[0].split('-')[2]);
		var hour = parseInt(str1[1].split(':')[0]);
		var min = parseInt(str1[1].split(':')[1]);
		var sec = parseInt(str1[1].split(':')[2]);
		var date = new Date(year, month, day, hour, min, sec);
		return date.getTime() / 1000;
	} 
}

function transferNextDay(str) {
	if(str == "''") return '';
	if(str != "''" && str != "") {
		var year = str.split('-')[0];
		var month = parseInt(str.split('-')[1])-1;
		var day = parseInt(str.split('-')[2]);
		var date = new Date(year, month, day);
		return date.getTime() / 1000 + 3600 * 24;
	} 
};

function transferUnixTime(unixTime) {
	var date = new Date(unixTime * 1000);
	var yy = date.getUTCFullYear();
	var mm = (Number(date.getUTCMonth()) + Number(1) );
	var dd = date.getUTCDate();
	var hh = date.getUTCHours();
	var ii = date.getUTCMinutes();
	var ss = date.getUTCSeconds();
		
	return yy + "-" + ( mm < 10 ? ("0" + mm) : mm )
			+ "-" + (dd < 10 ? ( "0" + dd ) : dd )
			+ " " + (hh < 10 ? ( "0" + hh ) : hh )
			+ ":" + (ii < 10 ? ( "0" + ii ) : ii )
			+ ":" + (ss < 10 ? ( "0" + ss ) : ss );
};

function transferDate(data) {
	var date = new Date(data);
	var yy = date.getUTCFullYear();
	var mm = (Number(date.getUTCMonth()) + Number(1) );
	var dd = date.getUTCDate();
	var hh = date.getUTCHours();
	var ii = date.getUTCMinutes();
	var ss = date.getUTCSeconds();
		
	return yy + "-" + ( mm < 10 ? ("0" + mm) : mm )
			+ "-" + (dd < 10 ? ( "0" + dd ) : dd )
			+ " " + (hh < 10 ? ( "0" + hh ) : hh )
			+ ":" + (ii < 10 ? ( "0" + ii ) : ii )
			+ ":" + (ss < 10 ? ( "0" + ss ) : ss );
};

function transferDateString(date) {
	var yy = date.getUTCFullYear();
	var mm = (Number(date.getUTCMonth()) + Number(1) );
	var dd = date.getUTCDate();
	var hh = date.getUTCHours();
	var ii = date.getUTCMinutes();
	var ss = date.getUTCSeconds();
		
	return yy + "-" + ( mm < 10 ? ("0" + mm) : mm )
			+ "-" + (dd < 10 ? ( "0" + dd ) : dd );
};


/** 
* change date 
* y year， m month， d day， h hour， n minute，s second  
*/  
Date.prototype.add = function (part, value) {  
    value *= 1;  
    if (isNaN(value)) {  
        value = 0;  
    }  
    switch (part) {  
        case "y":  
            this.setFullYear(this.getFullYear() + value);  
            break;  
        case "m":  
            this.setMonth(this.getMonth() + value);  
            break;  
        case "d":  
            this.setDate(this.getDate() + value);  
            break;  
        case "h":  
            this.setHours(this.getHours() + value);  
            break;  
        case "n":  
            this.setMinutes(this.getMinutes() + value);  
            break;  
        case "s":  
            this.setSeconds(this.getSeconds() + value);  
            break;  
        default:  
    }  
    return this;
}


/*
 * given a day string of format, "20160412", and
 * a hour string of either 1 or 2 digits, i.e., "1", or "11",
 * form a 8-digit date/hour string, i.e., 2016041201 or 2016041211
 * */ 
function getDateHourStr(day, hour){
	var now = new Date();
	var dateStr;
	
	if (day === undefined || day == ''){
		//console.log("y:", now.getFullYear(), ",m:", (now.getMonth()+1), ",d:", now.getDate() );
		dateStr = now.getFullYear() + ('0' + (now.getMonth()+1)).slice(-2) + ('0' + now.getDate()).slice(-2); 
	}
	else {
		dateStr = day.substring(0, 4)+day.substring(5, 7)+day.substring(8, 10);
	}
	if (hour === undefined || hour == ''){
		hour = '00';
	}
	else {
		hour = ('0' + hour).slice(-2);
	}
	return dateStr + hour;
}

function getPreviousDayStr(day){
	var now = new Date();
	var dateStr;
	
	if (day === undefined || day == ''){
		//console.log("y:", now.getFullYear(), ",m:", (now.getMonth()+1), ",d:", now.getDate() );
		now.setDate(now.getDate() -1);
		dateStr = now.getFullYear() + ('0' + (now.getMonth()+1)).slice(-2) + ('0' + now.getDate()).slice(-2); 
	}
	else {
		var date = new Date(day.substring(0, 4), +day.substring(4, 6)-1, day.substring(6, 8));
		date.setDate(date.getDate() -1);
//		day.setDate(day.getDate());

		dayStr = date.Format("yyyyMMdd");
	}
	return dayStr;
}

//full screen table panel
function panleFull(_this){
	var tableId = $(_this).attr('data-table');
	var oTable = $('#'+tableId).dataTable();
	var oSettings = oTable.fnSettings();
    if ($(_this).children('i').hasClass('glyphicon-resize-full'))
    {
    	oSettings._iDisplayLength = 25;
    	oTable.fnDraw();
    	$(_this).children('i').removeClass('glyphicon-resize-full');
    	$(_this).children('i').addClass('glyphicon-resize-small');
    }
    else if ($(_this).children('i').hasClass('glyphicon-resize-small'))
    {
    	oSettings._iDisplayLength = 10;
    	oTable.fnDraw();
    	$(_this).children('i').removeClass('glyphicon-resize-small');
    	$(_this).children('i').addClass('glyphicon-resize-full');
    }
    $(_this).closest('.panel').toggleClass('panel-fullscreen');
}


/**
 * 
 * @param interval 'y' or 'm' or 'd' ....
 * @param type '+' or '-' 
 * @param number 
 * @param date '2016060612'  //TODO if date is object 
 * @param formatstr 'yyyyddMMhh'
 * @returns
 */
function dateAddOrSub(interval,type,number,date,formatstr){
//	var prototype = Object.prototype.toString.call(date);
	 date = new Date(date.substring(0, 4), +date.substring(4, 6)-1, date.substring(6, 8),date.substring(8,10));
	switch(interval){
		case "y" :{
		    if(type=="+"){  
		    	date.setFullYear(date.getFullYear()+number);  
            }else{  
            	date.setFullYear(date.getFullYear()-number);  
            }  
		    return date.Format(formatstr);  
		    break;
		}
		case "M" : {  
            if(type=="+"){  
            	date.setMonth(date.getMonth()+number);  
            }else{  
            	date.setMonth(date.getMonth()-number);  
            }  
            return date.Format(formatstr);  
            break;  
        }  
		case "w" : {  
            if(type=="+"){  
            	date.setDate(date.getDate()+number*7);  
            }else{  
            	date.setDate(date.getDate()-number*7);  
            }  
            return date.Format(formatstr);  
            break;  
        }  
		case "d" : {  
            if(type=="+"){  
            	date.setDate(date.getDate()+number);  
            }else{  
            	date.setDate(date.getDate()-number);  
            }  
            return date.Format(formatstr);  
            break;  
        }  
        case "h" : {  
            if(type=="+"){  
            	date.setHours(date.getHours()+number);  
            }else{  
            	date.setHours(date.getHours()-number);  
            }  
            return date.Format(formatstr);  
            break;  
        }  
        case "m" : {  
            if(type=="+"){  
            	date.setMinutes(date.getMinutes()+number);  
            }else{  
            	date.setMinutes(date.getMinutes()-number);  
            }  
            return date.Format(formatstr);  
            break;  
        }  
        case "s" : {  
             if(type=="+"){  
            	 date.setSeconds(date.getSeconds()+number);  
            }else{  
            	 date.setSeconds(date.getSeconds()-number);  
            }  
            return date.Format(formatstr);  
            break;  
        }  
        default : {  
            return date.Format(formatstr);  
            break;  
        }  
	}
}

$(document).ready(function(){
	$('#ajax_loader').dblclick(function(){
		 $('#ajax_loader').hide();	
	});
	
});

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
 }

String.prototype.replaceAll = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
}

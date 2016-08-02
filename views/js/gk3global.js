
/**
 * Created by avandana on 7/12/2016.
 */

//JAVASCIPT null vs false vs undefined
//null == false == undefined
//null !== false !== undefined


var dailyKPIDefaultDateRange={
    'oneMonth'  :30
}

var clientHTTPConfig ={
    'appContextRoot' : '/test'
}


var hotBNumberDefaultDateRange={
    'oneWeek'  : 7
}

var detectionDetailsDefaultDateRange={
    'oneDay'  : 1
}




// Get formatted date YYYY-MM-DD
function getFormattedDate(date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}

function dateValidate(start, end) {
    if (start > end) {
        alert("End date should be greater than Start Date ");
        return false;
    }
    else {
        return true;
    }

    function today() {
        return new Date();
    }

    function tomorrow() {
        return today().getTime() + 24 * 60 * 60 * 1000;
    }

    function yesterday() {
        return today().getTime() - 24 * 60 * 60 * 1000;
    }



}

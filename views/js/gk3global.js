
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
    'appContextRoot' : '/tunisiana'
}


var hotBNumberDefaultDateRange={
    'oneWeek'  : 7
}

var detectionDetails={
    defaultFilterInterval : "OneMonth"
    //defaultFilterInterval : "OneDay"
    //defaultFilterInterval : "12Hrs"
};
var hotBNumber={
    //defaultFilterInterval : "OneMonth"
    defaultFilterInterval : "OneDay"
};

var dailyKPI={
    defaultFilterInterval : "OneMonth"
    //defaultFilterInterval : "OneDay"
};


var hourlyFraud={
    //defaultFilterInterval : "OneMonth"
    defaultFilterInterval : "OneDay"
};

var tcgDetections={
    defaultFilterInterval : "OneDay"
    //defaultFilterInterval : "OneDay"
};




function getDateRange(reportType) {
if(reportType.defaultFilterInterval == "OneMonth")
    return 30;
    if(reportType.defaultFilterInterval == "OneWeek")
        return 7;

    if(reportType.defaultFilterInterval == "OneDay")
        return 1;
    if(reportType.defaultFilterInterval == "12Hrs")
        return 1;
}

// Get formatted date YYYY-MM-DD
function getFormattedDate(date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}

// Get formatted date YYYY-MM-DD
function getFormattedDateHour(date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2)
        + " "
        + ("0" + date.getHours()).slice(-2)
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

/*

    Date.prototype.addSeconds = function(seconds) {
        this.setSeconds(this.getSeconds() + seconds);
        return this;
    };

    Date.prototype.addMinutes = function(minutes) {
        this.setMinutes(this.getMinutes() + minutes);
        return this;
    };

    Date.prototype.addHours = function(hours) {
        this.setHours(this.getHours() + hours);
        return this;
    };

    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + days);
        return this;
    };

    Date.prototype.addWeeks = function(weeks) {
        this.addDays(weeks*7);
        return this;
    };

    Date.prototype.addMonths = function (months) {
        var dt = this.getDate();

        this.setMonth(this.getMonth() + months);
        var currDt = this.getDate();

        if (dt !== currDt) {
            this.addDays(-currDt);
        }

        return this;
    };
*/


}

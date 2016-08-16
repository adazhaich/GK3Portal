/**
 * Created by avandana on 7/21/2016.
 */
/**
 * Created by avandana on 7/21/2016.
 */
$(document).ready(function(){
    //console.log("Inside login.js ");

    $("#loginUser").attr("action", "/test/login");
    $("#homeLink").attr("href", "/test");


    /*Time Zones
    When setting a date, without specifying the time zone, JavaScript will use the browser's time zone.
    When getting a date, without specifying the time zone, the result is converted to the browser's time zone.
    In other words: If a date/time is created in GMT (Greenwich Mean Time), the date/time will be converted to CDT (Central US Daylight Time) if a user browses from central US.
     getUTCDate()	Same as getDate(), but returns the UTC date
    */


        function startTime() {
           // var today = new Date();

            var today = new Date();
            /*var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
*/
            var h = today.getUTCHours();
            var m = today.getUTCMinutes();
            var s = today.getUTCSeconds();

            m = checkTime(m);
            s = checkTime(s);
/*
            var today = new Date();
            document.getElementById('txt').innerHTML= today;*/

            document.getElementById('currentTime').innerHTML =
                h + ":" + m + ":" + s + "&nbsp;GMT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            var t = setTimeout(startTime, 500);
        }
        function checkTime(i) {
            if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
            return i;
        }
        startTime();
/*

    //SCROLLER Functionality
    var today = new Date;
    //Displays only date
    document.getElementById('date').innerHTML= today.toDateString();
    //document.getElementById('ctx').innerHTML= "/test";
    //Display date and time but looks like time is not changing
    //document.getElementById('date').innerHTML= today.toLocaleString();
*/


    function checkServiceStatus() {
        var reqURL = 'http://localhost:8580/test/reports/servicestatus';

        request(reqURL, function (err, resp, body) {
            if (!err && resp.statusCode === 200) {
                var resultAsJSON = JSON.parse(body);
                console.log(reqURL);
                console.log("Request #" + i + " done");
            }


            console.log("Iterating, i= " + i);

        });
    }

    //checkServiceStatus();

/*
    function listCookies() {
        var theCookies = document.cookie.split(';');
        var aString = '';
        for (var i = 1 ; i <= theCookies.length; i++) {
            aString += i + ' ' + theCookies[i-1] + "\n";
        alert(document.cookie.toJSON());
        }
        return aString;
    }


    var cookieInfo=listCookies();
    document.getElementById('cookieInfo').innerHTML=cookieInfo;
*/

// Set timeout variables.
    var timoutWarning = 840000; // Display warning in 14 Mins.
    var timoutNow = 6000; // Warning has been shown, give the user 1 minute to interact
    var logoutUrl = 'logout.php'; // URL to logout page.

    var warningTimer;
    var timeoutTimer;

// Start warning timer.
    function StartWarningTimer() {
        warningTimer = setTimeout("IdleWarning()", timoutWarning);
    }

// Reset timers.
    function ResetTimeOutTimer() {
        clearTimeout(timeoutTimer);
        StartWarningTimer();
        $("#timeout").dialog('close');
    }

// Show idle timeout warning dialog.
    function IdleWarning() {
        clearTimeout(warningTimer);
        timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
        $("#timeout").dialog({
            modal: true
        });
        // Add code in the #timeout element to call ResetTimeOutTimer() if
        // the "Stay Logged In" button is clicked
    }

// Logout the user.
    function IdleTimeout() {
        window.location = logoutUrl;
    }

});
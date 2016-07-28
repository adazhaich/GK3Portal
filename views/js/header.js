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

            document.getElementById('txt').innerHTML =
                h + ":" + m + ":" + s + "   GMT ";
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

});
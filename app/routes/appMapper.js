var utils = require('../utils');
var logger = require('../logger');
var config = require('../config');
var default_range_hour = config.defaultTimeConfig.range_hour;
var appContextRoot = config.httpConfig.contextRoot;
var path = require('path');
var express = require('express');
var router = express.Router();
var request = require('request');
var dateFormat = require('dateformat');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var dateFormat = require('dateformat');
var fs = require('fs');
var default_illegal_odds = config.httpConfig.default_illegal_odds;

if (default_illegal_odds == undefined || default_illegal_odds <= 0) {
    default_illegal_odds = 0.5;
    logger.debug("default_illegal_odds=", default_illegal_odds);
}

var serviceUrl = config.dataService.protocol + "://"
    + config.dataService.url + ":"
    + config.dataService.port;
//console.log("serviceUrl=", serviceUrl);
logger.debug("serviceUrl=", serviceUrl);

// load our routes for data access
module.exports = function (app, passport, config, gk3_accounts_pool) {

    // route middleware that will happen on every request
    router.use(function (req, res, next) {
        // log each request to the console
      // logger.debug("Req URL:", req.url);

            if (req.url.match(/^\/views\/(css|js|images|stylesheets)/)) {
                //logger.debug(" CACHING:::: Req URL:", req.url);
                res.setHeader('Cache-Control', 'public, max-age=3600000')
    }
        req.session.touch();
        next();

    });


    // show the home page (will also have our login links)
    router.get('/', function (req, res) {
        if (req.cookies == null) {
            logger.debug("Access Portal directly:");
            res.redirect(appContextRoot);
        } else {
            logger.debug("(router.get('/')-Landing Page URL:", req.protocol + '://' + req.get('host') + req.originalUrl);
/*

            for (var i = 0; i < req.cookies.length; i++) {
                key = req.cookies[i];
                val = JSONCookie(obj[key]);
                logger.debug("Cookies :::: KEY:" + key+ "Value::"+val);
            }
*/

            res.render('index.ejs', {
                req: req
            });
        }
    });

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        if (req.cookies == null) {
            logger.debug("Access Portal directly:");
            res.redirect(appContextRoot);
        } else {
            logger.debug("(router.get('/')-Landing Page URL:", req.protocol + '://' + req.get('host') + req.originalUrl);
            res.render('index.ejs', {
                req: req
            });

        }
    });

    // DASHBOARD SECTION =========================
    router.get('/reports/dashboard/:type', utils.isLoggedIn, function (req, res) {

        res.render('dailyKpi.ejs', {
            req: req
        });
    });

    // Detection Details =========================
    router.get('/reports/detectiondetails', utils.isLoggedIn, function (req, res) {
        res.render('detectionDetails.ejs', {
            req: req,
            mapId: 'decDetMap'
        });
    });

    // TCG Detections =========================
    router.get('/reports/tcgdetections/', utils.isLoggedIn, function (req, res) {
        res.render('tcgDetections.ejs', {
            req: req
        });
    });

    // Hourly Fraud =========================
    router.get('/reports/hourlyfraud', utils.isLoggedIn, function (req, res) {
        logger.debug("/reports/hourlyfraud:type:", req.params.type);
        res.render('hourlyFraud.ejs', {
            req: req,
            mapId: 'hlyFrdMap'
        });
    });

    // Hourly Fraud2 =========================
    router.get('/reports/hourlyfraud2', utils.isLoggedIn, function (req, res) {

        res.render('hourlyFraud2.ejs', {
            req: req
        });
    });


    // Check Service Status=========================
    router.get('/reports/servicestatus',  function (req, res) {
        req.url = "/dataaccess/servicestatus";
        router.handle(req, res);

    });

    // Daily KPI =========================
    router.get('/reports/dailykpi', utils.isLoggedIn, function (req, res) {
        res.render('dailyKpi.ejs', {
            req: req
        });
    });

    //mysql before hive service is available
    router.get('/reports/dailykpi/:type', utils.isLoggedIn, function (req, res) {
        logger.debug("/reports/dailykpi:type:", req.params.type);
        res.render('dailyKpi.ejs', {
            req: req
        });
    });
    // Dealer Summary
    router.get('/reports/dealersummary', utils.isLoggedIn, function (req, res) {
        res.render('dealerSummary.ejs', {
            req: req
        })
    });

    // Corporate Summary
    router.get('/reports/corporatesummary', utils.isLoggedIn, function (req, res) {
        res.render('corporateSummary.ejs', {
            req: req
        })
    });

    // Hot BNumber
    router.get('/reports/hotbnumber', utils.isLoggedIn, function (req, res) {
        res.render('hotBNumber.ejs', {
            req: req
        })
    });

    // Subscriber Summary
    router.get('/reports/subscribersummary', utils.isLoggedIn, function (req, res) {
        res.render('subscriberSummary.ejs', {
            req: req
        })
    });

    //Tcg Call Log
    router.get('/reports/tcgcalllog', utils.isLoggedIn, function (req, res) {
        res.render('tcgCallLog.ejs', {
            req: req
        })
    });

    //Login default for Tabs
    router.get('/reports/indextab', utils.isLoggedIn, function (req, res) {
        logger.debug("Login default for Tabs:", req.protocol + '://' + req.get('host') + req.originalUrl);
        res.render('indexTab.ejs', {
            req: req
        })
    });

    // set role for users
    router.get('/setrole', utils.isLoggedIn, function (req, res) {
        res.render('setRole.ejs', {
            req: req
        })
    });

    // set menu for roles
    router.get('/setmenu', utils.isLoggedIn, function (req, res) {
        res.render('setMenu.ejs', {
            req: req
        })
    });

    // change password
    router.get('/setpassword', utils.isLoggedIn, function (req, res) {
        res.render('setPassword.ejs', {
            req: req
        })
    });

    // set preferences
    router.get('/setpreferences', utils.isLoggedIn, function (req, res) {
        res.render('setPreferences.ejs', {
            req: req
        })
    });

    //Whitelist
    router.get('/reports/whitelist', utils.isLoggedIn, function (req, res) {
        res.render('whitelist.ejs', {
            req: req
        })
    });

    // Shudown Criteria =========================
    router.get('/reports/shutdowncriteria', utils.isLoggedIn, function (req, res) {
        res.render('shutdownCriteria.ejs', {
            req: req
        });
    });

    // Shudown Criteria =========================
    router.get('/reports/editshutdowncriteria', utils.isLoggedIn, function (req, res) {
        res.render('editShutdownCriteria.ejs', {
            req: req
        });
    });

    // Show Shudown Report =========================
    router.get('/reports/showshutdownreport', utils.isLoggedIn, function (req, res) {
        res.render('showShutdownReport.ejs', {
            req: req
        });
    });

    //GSM Fraud Report
    router.get('/reports/gsmfraud', utils.isLoggedIn, function (req, res) {
        res.render('gsmFraud.ejs', {
            req: req
        });
    });

    //TCG Fraud Report
    router.get('/reports/tcgfraud', utils.isLoggedIn, function (req, res) {
        res.render('tcgFraud.ejs', {
            req: req
        });
    });

    // Daily KPI TCG=========================
    router.get('/reports/dailykpitcg', utils.isLoggedIn, function (req, res) {
        res.render('dailyKpiTcg.ejs', {
            req: req
        });
    });

    // Daily Fruad OTT=========================
    router.get('/reports/dailyfraudott', utils.isLoggedIn, function (req, res) {
        res.render('dailyFraudOtt.ejs', {
            req: req
        });
    });

    // PROFILE SECTION =========================
    router.get('/profile', utils.isLoggedIn, function (req, res) {
        logger.debug("Calling /profile");
        res.render('profile.ejs', {
            //user : req.user
            req: req
        });
    });

    // LOGOUT ==============================
    router.get('/logout', function (req, res) {
        logger.debug("User initiated logout");
        req.logout();
        res.redirect(appContextRoot);
    });

    // Map =========================
    router.get('/map', utils.isLoggedIn, function (req, res) {
        res.render('map.ejs', {
            req: req,
            cellId: req.param('cellId'),
            imsi: req.param('imsi'),
            msisdn: req.param('msisdn'),
            type: 'pop'
        });
    });

    router.get('/drilldown/callsnodup', utils.isLoggedIn, function (req, res) {
        res.render('callsnodup.ejs', {
            req: req,
            data: req.param('data'),
            day: req.param('day'),
            hour: req.param('hour'),
            type: req.param('type'),
            defaultRangeHour: default_range_hour

        });
    })
    // Daily KPI On-net New Detections (unique)
    router.get('/drilldown/detectiondetails', utils.isLoggedIn, function (req, res) {
        res.render('drillDetectionDetails.ejs', {
            req: req,
            type: req.param('type'),
            data: req.param('data'),
            date: req.param('day')
        });
    })

    router.get('/drilldown/dealerdetail', utils.isLoggedIn, function (req, res) {
        res.render('drillDealerDetail.ejs', {
            req: req,
            dealerId: req.param('dealerId')
        });
    })

    router.get('/drilldown/subdetail', utils.isLoggedIn, function (req, res) {
        res.render('drillSubscriber.ejs', {
            req: req,
            subId: req.param('subId')
        });
    })

    router.get('/drilldown/hourlyfraud', utils.isLoggedIn, function (req, res) {
        res.render('drillHourlyFraud.ejs', {
            req: req,
            data: req.param('data'),
            start: req.param('start'),
            end: req.param('end')
        });
    })

    router.get('/drilldown/hotbnumber', utils.isLoggedIn, function (req, res) {
        res.render('drillHotBNumber.ejs', {
            //**Ashok** NOT Working-BAD URL-http://localhost:8580/drilldown/hotbnumber?data=35317&type=CELL
            req: req,
            type: req.param('type'),
            data: req.param('data')
        });
    })
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    /*	    router.get('/isauthenticated', function(req, res) {
     res.send(req.isAuthenticated());
     });*/

    // show the login form
    router.get('/login', function (req, res) {
        logger.debug("(router.get('/login')-Render Login Form:", req.protocol + '://' + req.get('host') + req.originalUrl)
        /*var sess= req.session;
        sess.username=req.user.username;*/
        res.render('login.ejs', {req: req, message: req.flash('loginMessage')});
    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {

        successRedirect: appContextRoot + '/reports/indextab', // redirect to the dashboard section
        failureRedirect: appContextRoot + '/signup', // redirect back to the login page if there is an error
        failureFlash: true // allow flash messages
    }), function (req, res) {
        console.log("USER ENTERED CREDENTIALS AND READY TO LOG IN ");
        logger.debug("(Success Redirect", req.protocol + '://' + req.get('host') + req.originalUrl);
    });


    // SIGNUP =================================
    // show the signup form
    router.get('/signup', function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: appContextRoot + '/profile', // redirect to the secure profile section
        failureRedirect: appContextRoot + '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN) =============
// =============================================================================

    // locally --------------------------------
    router.get('/connect/local', function (req, res) {
        res.render('connectLocal.ejs', {message: req.flash('loginMessage')});
    });
    router.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: appContextRoot + '/profile', // redirect to the secure profile section
        failureRedirect: appContextRoot + '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    router.get('/unlink/local', utils.isLoggedIn, function (req, res) {
        var user = req.user;
        user.username = undefined;
        user.password = undefined;
        user.save(function (err) {
            res.redirect(appContextRoot + '/profile');
        });
    });


    router.get('/views/*', function (req, res) {
        //console.log("ROUTING files in public folder");
        //console.log("Request URL", req.url);
        res.sendFile(path.join(__dirname + '/../../' + req.url));
    });


    //BEGIN DATAACCESS Requests
    //==================================================

    router.get('/dataaccess/hourlyfraud', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get(/dataaccess/hourlyfraud:', dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        var condition = req.query.condition;
        logger.info("request.query.condition:", condition);
        var url = serviceUrl + "/hourlysuspect";

        if (condition != "") url += "?where=" + condition + " and illegalodds>=" + default_illegal_odds + "&limit=-1";
        else url += "?where=illegalodds>=" + default_illegal_odds + "&limit=100";

        logger.info("url=" + url);
        url = encodeURI(url);
        logger.info("encoded url=" + url);
        logger.debug("start time=", dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            logger.debug("response.statusCode=", (response === undefined ? "undefined" : response.statusCode));
            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                //TODO: add subquery here
                res.json(body);
            } else {
                logger.debug("Data Access Failed from " + url);
                logger.debug("error:", error);
                res.send(error);
            }
            logger.debug('end /dataaccess/hourlyFraud:', dateFormat(Date.now(),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });
    });


    router.get('/dataaccess/hourlyfraud2', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get(/dataaccess/hourlyfraud2:', dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var day = req.query.day;
        var hour = req.query.hour;
        var start = req.query.start;
        var end = req.query.end;
        var filterSql = req.query.filterSql;
        logger.debug("request.query.day:", day, "hour:", hour, "start:",
            start, "end:", end, "filterSql:", "[" + filterSql + "]");

        var now = new Date();

        if (day === undefined || day == '') {
            logger.debug("y:", now.getFullYear(), ",m:", (now.getMonth() + 1), ",d:", now.getDate());
            day = now.getFullYear() + ('0' + (now.getMonth() + 1)).slice(-2) + ('0' + now.getDate()).slice(-2);
        }
        else {
            day = new Date(day);
        }
        if (start === undefined || start == '') {
            start = '00';
        }
        else {
            start = '0' + start.slice(-2);
        }
        if (end === undefined || end == '') {
            end = '23';
        }
        else {
            end = '0' + end.slice(-2);
        }

        var dayStr = day.getFullYear() + ('0' + (day.getMonth() + 1)).slice(-2) + ('0' + day.getDate()).slice(-2);
        logger.debug("day:", day, ", dayStr:", dayStr, "start:", start, ", end: ", end);
        var startDayHour = dayStr + start;
        var endDayHour = dayStr + end;
        logger.debug("startDayHour:", startDayHour, ", endDayHour", endDayHour);
        //startDayHour = "2016022400";
        //endDayHour = "2016022423";
        var url = serviceUrl + "/hourlysuspect";

//		url += "?day=" + day + "&hour=" + hour + "&start=" + start + "&end="
//				+ end + "&illegalOdds=" + illegalOdds;
        //construct the where clause to service
        var where_clause = "?limit=20&where=traffic_date_hour between '" + startDayHour + "' and '" + endDayHour + "'";

        url += where_clause;
        logger.debug("url=" + url);
        url = encodeURI(url);
        logger.debug("url=" + url);
        logger.debug("start time=", dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("error:", err);
                res.send(error);
            }
            logger.debug('end /dataaccess/hourlyFraud:', dateFormat(Date.now(),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });
    });


    router.get('/dataaccess/tcgdetections', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/tcgdetections:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = req.query.condition;

        //console.log("request.parameter.condition:", condition);

        var url = serviceUrl + "/tcgdetections";
        if (condition != "") {
            url += "?where=" + condition + "&limit=100";
        } else {
            url += "?limit=-1";
        }
        //console.log("tcgdetections url=" + url);

        url = encodeURI(url);
        //console.log("tcgdetections encoded url=" + url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("error:", error);
                res.send(error);
            }
            console.log('end /dataaccess/tcgdetections:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });

    });


    router.get('/dataaccess/detectiondetails', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/detectiondetails:', dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = "";
        var url;

        /*     var url = require('url');
         var url_parts = url.parse(request.url, true);
         var query = url_parts.query;
         */
        var action = req.param('action');
        var type = req.param('type');
        var traffic_date = req.param('traffic_date');
        var startTime = req.param('startTime');
        var endTime = req.param('endTime');
        var data = req.param('data');

        url = serviceUrl + "/detectiondetails";


        if (action != undefined && action == "first_detection") {
            url += "?action=" + action + "&type=" + type + "&traffic_date=" + traffic_date + "&first_flag=1" + "&limit=-1";
        }
        else   if (action != undefined && action == "filter")
        {
            url += "?action=" + action + "&startTime=" + startTime +  "&endTime=" + endTime +  "&limit=-1";
        }
        else if (action != undefined && action == "drillDetectionDetails")
        {
            url += "?action=" + action + "&type=" + type +  "&data=" + data +  "&limit=-1";
        }
        logger.debug("detectiondetails action=" + action);
        logger.debug("detectiondetails url=" + url);
        //url = encodeURI(url);
        logger.debug("detectiondetails encoded url=" + url);


        logger.debug("start time=", dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        //			request through REST/JSON API once available
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                res.send(error);
            }
            logger.debug('end /dataaccess/detectionDetails:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            console.log('end /dataaccess/detectionDetails:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });

    });

    router.get('/dataaccess/cellidinfo', utils.isLoggedIn,
        function (req, res) {
            logger.debug('query cellidinfo:');
            var condition = req.query.condition;

            var url = serviceUrl + "/cellidinfo";
            if (condition != "") {
                url += "?where=" + condition + "&limit=1";
            } else {
                url += "?limit=200";
            }

            logger.debug("cellidinfo url=" + url);
            url = encodeURI(url);
            //console.log("cellidinfo encoded url=" + url);

            logger.debug("start time=", dateFormat(Date.now(),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"));

            request({
                url: url,
                json: true
            }, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    logger.debug("Data Access Success from " + url);
                    logger.debug("returned json nodes:", body.length);
                    res.json(body);
                } else {
                    res.send(error);
                }
                logger.debug('end /dataAccess/cellidinfo:', dateFormat(Date
                    .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            });


        });




    router.get('/dataaccess/dailykpi', utils.isLoggedIn, function (req, res) {
        logger.debug('BEGIN /dataaccess/dailykpi:');
        logger.debug('Report Requested DATE TIMESTAMP :::', dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        var reportType = req.query.reportType;
        var start = req.query.start;
        var end = req.query.end;

        logger.debug('REPORT Type ', reportType);
        logger.debug('Filter START Date', start);
        logger.debug('Filter END Date', end);

        //logger.debug("request.parameter start:", start, "end:", end, ", reportType:", reportType);

        var url = serviceUrl + "/dailykpi";
        var type = 0;
        switch (reportType) {
            case 'onnet':
                type = 1;
                break;
            case 'corporate':
                type = 2;
                break;
            case 'offnet':
                type = 0;  //changed from 3 to 0
                break;
        }
        //construct the where clause to service
        var where_clause = "?limit=-1&where=report_type=" + type;
        if (start != '' && start != undefined && start != "undefined") {
            where_clause += " and traffic_date>='" + start + "'";
        }
        if (end != '' && end != undefined && end != "undefined") {
            where_clause += " and traffic_date<='" + end + "'";
        }
        url += where_clause;

        //console.log("dailyKpi url=" + url);

        url = encodeURI(url);
        logger.debug("dailyKpi url=", url);
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("Data Access SUCCESS from " + url);
                logger.debug("Returned JSON Nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("Error in /dataaccess/dailykpi :", error);
                res.send(error);
            }
            logger.debug('Report END DATE TIMESTAMP :::', dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            logger.debug('END /dataaccess/dailykpi');
        });
    });


    router.get('/dataaccess/setorgflt', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get(/dataaccess/setorgflt:', dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        var condition = req.query.condition;
        var filterSql = req.query.filterSql;
        var reportType = req.query.reportType;
        if (reportType == "hf_div") reportType = 1;//Hourly Fraud
        else if (reportType == "hbn_div") reportType = 2;//Hot BNumber
        else if (reportType == "dd_div") reportType = 3;//Detection Details

        logger.debug("request.parameter.condition:", condition, "filterSql:", "[" + filterSql + "]");
        var trim_sql = '';
        if (reportType == 1) {
            condition = req.query.condition;
            if (filterSql != "") {
                if (condition == "")
                    condition += filterSql.replace("and", "").trim();
                else condition += filterSql;
            }
            logger.debug("filterSql=" + filterSql, "condition=", condition);
            var url = serviceUrl + "/hourlysuspect";
            if (condition != "") url += "?where=" + condition + " and illegalodds>=" + default_illegal_odds + "&limit=-1";
            else  url += "?where=illegalodds>=" + default_illegal_odds + "&limit=-1";

            logger.debug("url=" + url);
            logger.debug("start time=", dateFormat(Date.now(),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"));

            //			request through REST/JSON API once available
            request({
                url: url,
                json: true
            }, function (error, response, body) {
//logger.info("response.statusCode=", (response === undefined? "undefined" : response.statusCode));
                if (!error && response.statusCode === 200) {
                    logger.debug("returned json nodes:", body.length);
                    res.json(body.length);
                } else {
                    logger.debug("returned json error:", error);
                    res.send(error);
                }
                console.log('end /dataaccess/hourlysuspect:', dateFormat(Date
                    .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            });
        } else if (reportType == 2) {
            var condition = req.query.condition;

            if (filterSql != "") {
                if (condition == "")
                    condition += filterSql.replace("and", "").trim();
                else condition += filterSql;
            }
            logger.debug("filterSql=" + filterSql, "condition=", condition);
            var url = serviceUrl + "/hotbnumber";
            if (condition != "") url += "?where=" + condition + "&limit=-1";
            else  url += "?limit=-1";

            logger.debug("url=" + url);
            logger.debug("start time=", dateFormat(Date.now(),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"));

            //			request through REST/JSON API once available
            request({
//					url : "http://10.212.2.53:8080/corpratorSummary",
                url: url,
                json: true
            }, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    logger.debug("returned json nodes:", body.length);
                    res.json(body.length);
                } else {
                    logger.debug("returned json error:", error);
                    res.send(error);
                }
                logger.debug('end /dataaccess/hotbnumber:', dateFormat(Date
                    .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            });
        } else if (reportType == 3) {
            var condition = req.query.condition;

            if (filterSql != "") {
                if (condition == "")
                    condition += filterSql.replace("and", "").trim();
                else condition += filterSql;
            }
            logger.debug("filterSql=" + filterSql, "condition=", condition);
            var url = serviceUrl + "/detectiondetails";
            if (condition != "") url += "?where=" + condition + "&limit=-1";
            else  url += "?limit=-1";

            logger.debug("url=" + url);
            logger.debug("start time=", dateFormat(Date.now(),
                "dddd, mmmm dS, yyyy, h:MM:ss TT"));

            //			request through REST/JSON API once available
            request({
//					url : "http://10.212.2.53:8080/corpratorSummary",
                url: url,
                json: true
            }, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    logger.debug("returned json nodes:", body.length);
                    res.json(body.length);
                } else {
                    logger.debug("returned json error:", error);
                    res.send(error);
                }
                logger.debug('end /dataaccess/hotbnumber:', dateFormat(Date
                    .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            });
        }
        logger.debug('end /dataaccess/setorgflt:', dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));

    });

    router.get('/dataaccess/dealersummary', utils.isLoggedIn, function (req, res) {
        logger.debug(req.query);

        var condition = req.query.condition;

        logger.debug("request.parameter.condition:", condition);

        var url = serviceUrl + "/dealersummary";
        if (condition != "") {
            url += "?where=" + condition + "&limit=-1";
        } else {
            url += "?limit=-1";
        }
        logger.info(url);
        url = encodeURI(url);
        logger.debug("dealersummary url=", url);

        logger.debug(url);
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/corporatesummary', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/corporatesummary:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = req.query.condition;

        logger.debug("Corp Summary request.parameter.condition:", condition);



        var url = serviceUrl + "/corporatesummary";
        if (condition != "") url += "?where=" + condition + "&limit=-1";
        else url += "?limit=-1";

        logger.debug("url=" + url);
        url = encodeURI(url);
        logger.debug("corporatesummary url=", url);

        logger.debug("start time=", dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        //			request through REST/JSON API once available
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("returned json error:", error);
                res.send(error);
            }
            logger.debug('end /dataaccess/corporatesummary:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });

    });

    router.get('/dataaccess/hotbnumber', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/hotbnumber:', dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = "";
        var url;

        var action = req.param('action');
        var startTime = req.param('startDate');
        var endTime = req.param('endDate');
        var type = req.param('type');
        var data = req.param('data');

        var url = serviceUrl + "/hotbnumber";

        if (action != undefined && action == "filter")
        {
            url += "?action=" + action + "&startDate=" + startTime +  "&endDate=" + endTime +  "&limit=-1";
        }

        else if (action != undefined && action == "drillHotBNumber")
        {
            url += "?action=" + action + "&type=" + type +  "&data=" + data +  "&limit=-1";
        }


        logger.debug("HOTBNUMBER ::Service URL", url);
        //url = encodeURI(url);
        //logger.debug("HOTBNUMBER Encoded URL=", url);

        logger.debug("start time=", dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));




        //request through REST/JSON API once available
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("returned json error:", error);
                res.send(error);
            }
            logger.debug('end /dataaccess/hotbnumber:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });

    });

    router.get('/dataaccess/subscribersummary', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/subscribersummary:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = req.query.condition;

        logger.debug("request.parameter.condition:", condition);

        var url = serviceUrl + "/subscribersummary";
        if (condition != "") {
            url += "?where=" + condition + "&limit=-1";
        } else {
            url += "?limit=-1";
        }
        logger.debug("url=" + url);
        url = encodeURI(url);
        logger.debug("subscribersummary url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("returned json error:", error);
                res.send(error);
            }
        });

    });

    router.get('/dataaccess/tcgcalllog', utils.isLoggedIn, function (req, res) {
        console.log('router.get:/dataaccess/tcgcalllog:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = req.query.condition;

        //console.log("request.parameter.condition:", condition);

        var url = serviceUrl + "/tcgcalllog";
        if (condition != "") {
            url += "?where=" + condition + "&limit=-1";
        } else {
            url += "?limit=-1";
        }
        //console.log("url=" + url);
        url = encodeURI(url);
        logger.debug("tcgcalllog url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                //console.log("returned json nodes:", body.length);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });

    });

    router.get('/dataaccess/callsnodup', utils.isLoggedIn, function (req, res) {
        console.log('router.get:/dataaccess/callsnodup:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = req.query.condition;
        var callDateHourMin = req.query.callDateHourMin;
        var callDateHourMax = req.query.callDateHourMax;
        //testing
//		conidition = "";
        //console.log("request.parameter.condition:", condition);
        //"&limit=-1";
        var url = serviceUrl + "/callsnodup" + "?call_date_hour_min=" + callDateHourMin + "&call_date_hour_max=" + callDateHourMax;
        if (condition != "") {
            url += "&" + condition;
        }
//		url = serviceUrl + "/callsnodup" + "?limit=200";
        //console.log("callsnodup url=" + url);
        url = encodeURI(url);
        //console.log("callsnodup encoded url=" + url);
        logger.debug("callsnodup url=", url);

        // callsnodup url=http://10.212.2.143:8080/callsnodup?call_date_hour_min=2016071319&call_date_hour_max=2016071400&simsi=605030902465876
        // callsnodup encoded url=http://10.212.2.143:8080/callsnodup?call_date_hour_min=2016071319&call_date_hour_max=2016071400&simsi=605030902465876
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from " + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });

    });

    router.get('/dataaccess/servicestatus', function (req, res) {
        console.log('router.get:/dataaccess/servicestatus:');


        var url = serviceUrl ;
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body.length);
                //console.log("returned json data:", body);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/decodeinfo', utils.isLoggedIn, function (req, res) {
        console.log('router.get:/dataaccess/decodeinfo:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var condition = req.query.condition;
        //console.log("request.parameter.condition:", condition);
        if (condition === undefined || condition == "") {
            logger.info("Empty condition can't be accepted");
            res.send("Empty condition can't be accepted");
        }

        var url = serviceUrl + "/freestyle?db=frauddb";
        if (condition != "") {
            url += "&sql=" + condition;
        }

        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body.length);
                //console.log("returned json data:", body);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/shutdowncriteria', utils.isLoggedIn, function (req, res) {
        logger.debug('query shutdowncriteria:');
        var sql = "select id,criteria_no,condition_type,condition_operation,condition_value,comment from fraud_605_3.shutdown_criteria where is_discard=0 order by criteria_no, condition_type ";
        var url = serviceUrl + "/freestyle?";
        if (sql != "") {
            url += "sql=" + sql;
        }

        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                //console.log("returned json nodes:", body.length);
                //console.log("returned json data:", body);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/altershutdowncriteria', utils.isLoggedIn, function (req, res) {
        logger.debug('/dataaccess/altershutdowncriteria:');
        var criteriano = req.query.criteriano;
        var sql = "select a.condition_type as condition_type,a.condition_des as condition_des,b.criteria_no criteria_no,b.condition_operation condition_operation,b.condition_value as condition_value, b.criteria_no as checked from fraud_605_3.condition_type as a left join "
            + "(SELECT criteria_no, condition_type, condition_operation,condition_value FROM fraud_605_3.shutdown_criteria where is_discard=0 and criteria_no='" + criteriano + "' ) as b "
            + " on a.condition_type=b.condition_type order by a.condition_type ";
        var url = serviceUrl + "/freestyle?";
        if (sql != "") {
            url += "sql=" + sql;
        }

        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body.length);
                ////console.log("returned json data:", body);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/deleteshutdowncriteria', utils.isLoggedIn, function (req, res) {
        logger.debug('/dataaccess/deleteshutdowncriteria:');
        var criteriano = req.query.criteriano;

        var sql = "upsert into fraud_605_3.shutdown_criteria(id, is_discard) select id, 1 from fraud_605_3.shutdown_criteria where criteria_no='" + criteriano + "' ";
        var url = serviceUrl + "/shutdowncriteria?";
        if (sql != "") {
            url += "sql=" + sql;
        }

        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body);
                ////console.log("returned json data:", body);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/saveshutdowncriteria', utils.isLoggedIn, function (req, res) {
        logger.debug('save saveshutdowncriteria:');
        var detail = req.query.detail;
        var arr = detail.split("; ,");
        //console.log(detail);
        var id;

        var sql = "select max(id) maxid from fraud_605_3.shutdown_criteria ";
        var url = serviceUrl + "/freestyle?";
        if (sql != "") {
            url += "sql=" + sql;
        }

        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body);
                var maxid = body[0].maxid;
                //console.log("returned json maxid:", maxid);
                sql = "upsert into fraud_605_3.shutdown_criteria(id, criteria_no, condition_type, condition_operation, condition_value, is_discard, comment, update_time, insert_time) ";
                var selectsql = '';
                for (var i = 0; i < arr.length; i++) {
                    //console.log("i:", i, "&", arr[i]);
                    id = Number(maxid) + Number(i) + Number(1);
                    selectsql += arr[i].replace('SEQNEXTVALUE', id);
                }

                sql = sql + selectsql;
                var url = serviceUrl + "/shutdowncriteria?";
                if (sql != "") {
                    url += "sql=" + sql;
                }

                //console.log("decodeinfo url=" + url);
                url = encodeURI(url);
                logger.debug("encoded decodeinfo url=", url);

                request({
                    url: url,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        //console.log("returned json nodes:", body);
                        ////console.log("returned json data:", body);
                        res.json(body);
                    } else {
                        //console.log("returned json error:", error);
                        res.send(error);
                    }
                });

            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/updateshutdowncriteria', utils.isLoggedIn, function (req, res) {
        logger.debug('/dataaccess/updateshutdowncriteria:');
        var criteriano = req.query.criteriano;
        var detail = req.query.detail;
        var arr = detail.split("; ,");

        var sql = "upsert into fraud_605_3.shutdown_criteria(id, is_discard) select id, 1 from fraud_605_3.shutdown_criteria where criteria_no='" + criteriano + "' ";
        var url = serviceUrl + "/shutdowncriteria?";
        if (sql != "") {
            url += "sql=" + sql;
        }
        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body);
                ////console.log("returned json data:", body);
                //res.json(body);
                sql = "select max(id) maxid from fraud_605_3.shutdown_criteria ";
                url = serviceUrl + "/freestyle?";
                if (sql != "") {
                    url += "sql=" + sql;
                }

                //console.log("decodeinfo url=" + url);
                url = encodeURI(url);
                logger.debug("encoded decodeinfo url=", url);

                request({
                    url: url,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        //console.log("returned json nodes:", body);
                        var maxid = body[0].maxid;
                        //console.log("returned json maxid:", maxid);
                        for (var i = 0; i < arr.length; i++) {
                            ////console.log("i:", i, "&", arr[i]);
                            id = Number(maxid) + Number(i) + Number(1);
                            sql = "upsert into fraud_605_3.shutdown_criteria(id, criteria_no, condition_type, condition_operation, condition_value, is_discard, comment, update_time, insert_time) values " + arr[i].replace('SEQNEXTVALUE', id);
                            var url = serviceUrl + "/shutdowncriteria?";
                            if (sql != "") {
                                url += "sql=" + sql;
                            }

                            //console.log("decodeinfo url=" + url);
                            url = encodeURI(url);
                            logger.debug("encoded decodeinfo url=", url);

                            request({
                                url: url,
                                json: true
                            }, function (error, response, body) {
                                if (!error && response.statusCode === 200) {
                                    //console.log("returned json nodes:", body);
                                    ////console.log("returned json data:", body);
                                    res.json(body);
                                } else {
                                    //console.log("returned json error:", error);
                                    res.send(error);
                                }
                            });
                        }
                    } else {
                        //console.log("returned json error:", error);
                        res.send(error);
                    }
                });
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/showshutdownreport', utils.isLoggedIn, function (req, res) {
        logger.debug('show showshutdownreport:');
        var reportname = req.query.reportname;
        var sql = "select max(traffic_date) as traffic_date ,max(traffic_hour) as traffic_hour from fraud_605_3.shutdown_report where traffic_date =( select max(traffic_date) from fraud_605_3.shutdown_report)";

        logger.debug('query showshutdownreport sql:', sql);
        var url = serviceUrl + "/freestyle?";
        if (sql != "") {
            url += "sql=" + sql;
        }
        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body);
                ////console.log("returned json data:", body);
                //res.json(body);
                var max_time_string = body[0].traffic_date + body[0].traffic_hour;
                //console.log("returned max_time_string:", (max_time_string.replace('-', '').replace('-', '')));
                reportname = reportname.replace('yyyyMMddhh', max_time_string);
                sql = "select * from shutdown_report where report_name='" + reportname + "'";
                url = serviceUrl + "/freestyle?";
                if (sql != "") {
                    url += "sql=" + sql;
                }

                //console.log("decodeinfo url=" + url);
                url = encodeURI(url);
                logger.debug("encoded decodeinfo url=", url);

                request({
                    url: url,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        //console.log("returned json nodes:", body);
                        res.json(body);
                    } else {
                        //console.log("returned json error:", error);
                        res.send(error);
                    }
                });
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/whitelist', utils.isLoggedIn, function (req, res) {
        logger.debug('query whitelist:');
        var querymsisdn = req.query.queryMsisdn;

        var sql = "SELECT id, msisdn, imsi, imei, create_time, update_time, description, state type, user FROM fraud_605_3.white_list_info where (state=0 or state=2 )";
        if (querymsisdn != undefined && querymsisdn != '') {
            sql += " and msisdn in (" + querymsisdn + ")";
        }

        logger.debug('query whitelist sql:', sql);
        var url = serviceUrl + "/freestyle?";
        if (sql != "") {
            url += "sql=" + sql;
        }
        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body.length);
                ////console.log("returned json data:", body);
                res.json(body);
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/addwhitelist', utils.isLoggedIn, function (req, res) {
        logger.debug('insert whitelist:');
        var insertValue = req.query.insertvalue;
        var msisdn = req.query.msisdn;
        var user = req.user.username;

        var sql2 = "";
        var sql = "SELECT id, msisdn, imsi, imei, create_time, update_time, description, state type, user FROM fraud_605_3.white_list_info where msisdn in (" + msisdn + ") ";
        logger.info('is exists whitelist sql:', sql);
        var url = serviceUrl + "/freestyle?";
        if (sql != "") {
            url += "sql=" + sql;
        }
        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body.length);
                if (body.length == 0) {
                    sql2 = " upsert into fraud_605_3.white_list_info(msisdn, imsi, imei, description, state, user, create_time) values(" + insertValue + ", '" + user + "', now())";
                    logger.info('insert whitelist sql:', sql2);
                    url = serviceUrl + "/whitelistinfo?";
                    if (sql != "") {
                        url += "sql=" + sql2;
                    }
                    request({
                        url: url,
                        json: true
                    }, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                            //console.log("returned json nodes:", body.length);
                            ////console.log("returned json data:", body);
                            res.json(body);
                        } else {
                            //console.log("returned json error:", error);
                            res.send(error);
                        }
                    });
                } else {
                    res.send(body.length);
                }

            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/deletewhitelist', utils.isLoggedIn, function (req, res) {
        logger.debug('delete whitelist:');
        var ids = req.query.ids;

        var sql = "DELETE FROM fraud_605_3.white_list_info ";
        if (ids != undefined && ids != '') {
            sql += " where  id in (" + ids + ")";
            var url = serviceUrl + "/whitelistinfo?";

            url += "sql=" + sql;

            request({
                url: url,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    //console.log("returned json nodes:", body.length);
                    res.json(body);
                } else {
                    //console.log("returned json error:", error);
                    res.send(error);
                }
            });
        }
    });

    router.get('/dataaccess/importwhitelist', utils.isLoggedIn, function (req, res) {
        logger.info('import whitelist:');
        var inputvalue = req.query.inputvalue;
        var user = req.user.username;
        var arr = inputvalue.split(";");

        var sql = "select max(id) maxid from fraud_605_3.white_list_info ";
        var url = serviceUrl + "/freestyle?";
        if (sql != "") {
            url += "sql=" + sql;
        }

        //console.log("decodeinfo url=" + url);
        url = encodeURI(url);
        logger.debug("encoded decodeinfo url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log("returned json nodes:", body);
                var maxid = body[0].maxid;
                //console.log("returned json maxid:", maxid);
                sql = "upsert into fraud_605_3.white_list_info(msisdn, imsi, imei, description, user, id, state, create_time, update_time) ";
                var selectsql = '';
                for (var i = 0; i < arr.length - 1; i++) {
                    id = Number(maxid) + Number(i) + Number(1);
                    selectsql += arr[i].replace('SEQNEXTVALUE', id).replace('root', user);
                }

                sql = sql + selectsql;
                url = serviceUrl + "/whitelistinfo?";
                if (sql != "") {
                    url += "sql=" + sql;
                }

                //console.log("upsert url=" + url);
                request({
                    url: url,
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        //console.log("returned json nodes:", body);
                        res.json(body);
                    } else {
                        //console.log("returned json error:", error);
                        res.send(error);
                    }
                })
            } else {
                //console.log("returned json error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/gsmfraud', utils.isLoggedIn, function (req, res) {
        logger.debug(req.query);

        var condition = req.query.condition;

        logger.debug("request.parameter.condition:", condition);

        var url = serviceUrl + "/dailyfraudgsm";
        if (condition != "") {
            url += "?where=" + condition + "&limit=-1";
        } else {
            url += "?limit=-1";
        }
        logger.info(url);
        url = encodeURI(url);
        logger.debug("gsmfraud url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("error:", error);
                res.send(error);
            }
        });
    });

    router.get('/dataaccess/tcgfraud', utils.isLoggedIn, function (req, res) {
        logger.debug(req.query);

        var condition = req.query.condition;

        logger.debug("request.parameter.condition:", condition);

        var url = serviceUrl + "/dailyfraudtcg";
        if (condition != "") {
            url += "?where=" + condition + "&limit=-1";
        } else {
            url += "?limit=-1";
        }
        logger.info(url);
        url = encodeURI(url);
        logger.debug("tcgfraud url=", url);

        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("error:", error);
                res.send(error);
            }
        });
    });


    router.get('/dataaccess/addcorporatesummary', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/addcorporatesummary:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var sql = req.query.sql;

        var url = serviceUrl + "/corporatesummary";
        url += "?sql=" + sql;
        logger.debug("url=" + url);
        url = encodeURI(url);
        logger.debug("corporatesummary url=", url);

        logger.debug("start time=", dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));



        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                res.json(body);
            } else {
                logger.debug("returned json error:", error);
                res.send(error);
            }
            logger.debug('end /dataaccess/addcorporatesummary:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });
    });


    router.get('/dataaccess/corporatedetail', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/corporatedetail:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var url = serviceUrl + "/corporatedetail";


        var action = req.param('action');
        var corporateId = req.param('corporateId');
        var corporateName = req.param('corporateName');
        var msisdn = req.param('msisdn');
        var comment = req.param('comment');


     if (action != undefined && action == "addOrUpdate")
        {
            url += "?action=" + action + "&corporateId=" + corporateId +  "&corporateName=" + corporateName + "&msisdn=" + msisdn + "&comment=" + comment;
        }


        logger.debug("corporatedetail ::Service URL", url);

        logger.debug("start time=", dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));


        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                res.json(body);
            } else {
                logger.debug("returned json error:", error);
                res.send(error);
            }
            logger.debug('end /dataaccess/corporatedetail:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });
    });




    router.get('/dataaccess/dailykpitcg', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/dailykpitcg:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        var day = req.query.day;
        var start = req.query.start;
        var end = req.query.end;

        var url = serviceUrl + "/dailykpitcg";

        var where_clause = "?limit=-1";
        var condition = "";
        if (day) {
            condition += " and traffic_date='" + day + "'";
        } else {
            if (start) condition += " and traffic_date>='" + start + "'";
            if (end) condition += " and traffic_date<='" + end + "'";
        }

        if (condition != "") {
            where_clause += "&where=" + condition.replace("and", "");
        }

        url += where_clause;

        logger.debug("dailykpitcg url=" + url);
        url = encodeURI(url);
        //console.log("dailykpitcg encoded url=" + url);

        logger.debug("start time=", dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                res.send(error);
            }
            logger.debug('end /dataAccess/dailyKpitcg:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });
    });

    router.get('/dataaccess/dailyfraudott', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get:/dataaccess/dailyfraudott:', dateFormat(Date
            .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        var day = req.query.day;
        var start = req.query.start;
        var end = req.query.end;

        var url = serviceUrl + "/dailyfraudott";

        var where_clause = "?limit=-1";
        var condition = "";
        if (day) {
            condition += " and traffic_date='" + day + "'";
        } else {
            if (start) condition += " and traffic_date>='" + start + "'";
            if (end) condition += " and traffic_date<='" + end + "'";
        }

        if (condition != "") {
            where_clause += "&where=" + condition.replace("and", "");
        }

        url += where_clause;

        logger.debug("dailyfraudott url=" + url);
        url = encodeURI(url);
        //console.log("dailyfraudott encoded url=" + url);

        logger.debug("start time=", dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                logger.debug("Data Access Success from URL" + url);
                logger.debug("returned json nodes:", body.length);
                res.json(body);
            } else {
                logger.debug("Data Access Failure ***CHECK URL" + url);
                res.send(error);
            }
            logger.debug('end /dataAccess/dailyfraudott:', dateFormat(Date
                .now(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        });
    });

//LOGIN MAPPER ==================================================
    //=====================================================================


    router.get('/dataaccess/menu', utils.isLoggedIn, function (req, res) {
        logger.debug('query menu:');
        var userId = req.query.userId;
        logger.debug("userId", userId);
        logger.debug("req userId", req.user.id);
        var roleIds;

        var sql1 = "select group_concat(role_id) roleids from user_roles where deleted_date is null and  user_id='" + userId + "'";
        //logger.debug('query roleids sql:', sql1);

            gk3_accounts_pool.query(sql1, function (err, rows, fields) {
                if (!err) {
                    //logger.debug('retrieved role ids of ', userId, rows.length);
                    roleIds = rows[0].roleids;
                    //logger.debug('USER ROLE IDS ARE :::', roleIds);
                    var sql = "select m.* from menu m where exists (select 1 from role_menus rm where rm.menu_id=m.id and rm.role_id in (" + roleIds + ")) union all select m2.* from menu m2 where name='root'";
                    //logger.debug('query menu sql:', sql);
                    gk3_accounts_pool.query(sql, function (err, rows, fields) {
                        if (!err) {
                           // logger.debug('retrieved menu: ', rows.length);
                           // logger.debug("MENU DATA",JSON.stringify(rows));
                            res.json(rows);
                        } else {
                            logger.debug('Error while query menu.', err);
                            res.send(err);
                        }
                    });
                } else {
                    logger.debug('Error while query role ids of ', userId, ' get error', err);
                    res.send(err);
                }
            });

    });

    router.get('/dataaccess/listuser', utils.isLoggedIn, function (req, res) {
        logger.debug('list user');
        var sql = "select * from users";
        logger.debug('query users sql:', sql);
            gk3_accounts_pool.query(sql, function (err, rows, fields) {

                if (!err) {
                    logger.debug('retrieved users: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query users.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/listrole', utils.isLoggedIn, function (req, res) {
        var userId = req.query.userId;
        logger.debug('list roles of user ', userId);

        var sql = "select a.role_id, a.role, a.role_description, ifnull (b.user_role_id , 0) checked, " + userId + " user_id from roles a left join  (select * from user_roles where DELETED_DATE is null and user_id=" + userId + " ) b on a.role_id=b.role_id order by role_id ";
        logger.debug('query role of user sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug("Data Access Success from /dataaccess/listrole and SQL is" + sql);
                    logger.debug('retrieved role of user: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query role of user.', err);
                    res.send(err);
                }
            });

    });

    router.get('/dataaccess/saverole', utils.isLoggedIn, function (req, res) {
        var loginId = req.user.id;
        var userId = req.query.userId;
        var roleIds = req.query.roleIds;
        var sqld = "";
        var sqli = "";
        logger.debug('save roles of user ', userId, ' roleids:', roleIds);
        var sql = "select * from user_roles where user_id=" + userId + " and deleted_date is null ";
        logger.debug('query check role of user is exists sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved check role of user is exists: ', rows.length);
                    if (rows.length > 0) {
                        for (var j = 0; j < rows.length; j++) {
                            //rows.forEach(function(d) {
                            //logger.info('d:',rows[j].ROLE_ID);
                            var role_id = "'" + rows[j].ROLE_ID + "'";
                            //logger.info("is index:",role_id,'-roleIds:', roleIds, ':', roleIds.indexOf(role_id));
                            if (roleIds.indexOf(role_id) < 0) {//role exists in db, not in select, romove it
                                sqld = "update user_roles set deleted_date = now(), deleted_by_user_id='" + loginId + "' where USER_ROLE_ID='" + rows[j].USER_ROLE_ID + "' ";
                                logger.info('delete role of user is exists sql:', sqld);
                                gk3_accounts_pool.query(sqld, function (err, rows, fields) {
                                    if (!err) {
                                        logger.debug('delete role of user if exists: ', rows);
                                        res.json(rows);
                                    } else {
                                        logger.debug('delete role of user if exists err: ', err);
                                        res.send(err);
                                    }
                                })
                            }
                        }
                    }
                    //insert into user_roles if not exists
                    roleIds2 = roleIds.replace(new RegExp(/(')/g), '');
                    var rolearr = roleIds2.split(',');
                    //logger.info('rolearr[0]:', rolearr[0]);
                    //rolearr.forEach(function(i, d) {
                    for (var i = 0; i < rolearr.length; i++) {
                        //logger.info('i:',i,"v:",rolearr[i]);
                        roleid = rolearr[i];
                        logger.debug('role:', roleid);
                        sqli = "insert into user_roles(user_id, role_id, created_date, created_by_user_id) select " + userId + "," + roleid + ", now(), " + loginId +
                            " from dual where not exists ( select * from user_roles where user_id=" + userId + " and role_id=" + roleid + " and deleted_date is null ) ";
                        logger.info('insert role of user is exists sql:', sqli);
                        gk3_accounts_pool.query(sqli, function (err, rows, fields) {
                            if (!err) {
                                logger.debug('insert into user_roles: ', rows);
                                res.json(rows);
                            } else {
                                logger.debug('insert into user roles error:', err);
                                res.send(err);
                            }
                        });
                    }


                } else {
                    logger.debug('Error while query role of user.', err);
                    res.send(err);
                }
            });

    });

    router.get('/dataaccess/listallrole', utils.isLoggedIn, function (req, res) {
        var sql = "select a.role_id, a.role, a.role_description from roles a ";
        logger.debug('query all roles sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved all roles: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query all roles.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/listrolemenu', utils.isLoggedIn, function (req, res) {
        var roleId = req.query.roleId;
        logger.debug('list menus of user ', roleId);

        var sql = " select m.*, 'checked' checked, " + roleId + " role_id from menu m where exists ( " +
            "	select 1 from role_menus rm where rm.menu_id=m.id and rm.role_id =" + roleId + " ) " +
            "	union " +
            "	select m.*, '' checked, " + roleId + " role_id from menu m where not exists ( " +
            "	select 1 from role_menus rm where rm.menu_id=m.id and rm.role_id =" + roleId + " ) " +
            "	order by id ";
        logger.debug('query role of user sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved role of user: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query role of user.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/saverolemenu', utils.isLoggedIn, function (req, res) {
        var roleId = req.query.roleId;
        var menuids = req.query.menuIds;
        logger.debug('list menus of user roleId ', roleId, 'menuids:', menuids);
        if (roleId == null || roleId == "") {
            var errorMsg = "saverolemenu: roleId can't be empty";
            logger.error(errorMsg);
            res.send(errorMsg);
        }
        var sqlck = "select group_concat(menu_id) menu_ids from role_menus where role_id=" + roleId;

            gk3_accounts_pool.query(sqlck, function (err, rows, fields) {
                if (!err) {
                    if (rows[0].menu_ids != menuids) {

                        var sql = "delete from role_menus where role_id=" + roleId;
                        logger.debug('query menuids of role sql:', sql);
                        gk3_accounts_pool.query(sql, function (err, rows, fields) {
                            if (!err) {
                                logger.debug('retrieved menuids of role : ', rows);
                                var sqli = "insert into role_menus(role_id,menu_id) values ";
                                var arrmenu = menuids.split(",");

                                for (var i = 0; i < arrmenu.length - 1; i++) {
                                    sqli += " (" + roleId + ", " + arrmenu[i] + " ),";

                                }

                                sqli += " (" + roleId + ", " + arrmenu[arrmenu.length - 1] + " );";
                                logger.debug('insert role_menus sql: ', sqli);
                                gk3_accounts_pool.query(sqli, function (err, rows, fields) {
                                    if (!err) {
                                        res.json(rows);
                                    } else {
                                        logger.debug('Error while menuids of role .', err);
                                        res.send(err);
                                    }
                                });
                            } else {
                                logger.debug('Error while menuids of role .', err);
                                res.send(err);
                            }
                        });
                    }
                } else {
                    logger.debug('Error while menuids of role .', err);
                    res.send(err);
                }
            });
    });


    router.get('/dataaccess/setpassword', utils.isLoggedIn, function (req, res) {
        logger.debug('query menu:');
        var userId = req.user.id;
        var oldpassword = req.query.oldpassword;
        var newpassword = req.query.newpassword;

        var newhash = bcrypt.hashSync(newpassword);

        var sql1 = "select * from users where id='" + userId + "' ";
        logger.debug('query roleids sql:', sql1);

            gk3_accounts_pool.query(sql1, function (err, rows, fields) {
                if (!err) {
                    logger.info('retrieved role ids of ', userId, rows);
                    logger.debug('oldpassword:', oldpassword, 'queried password:', rows[0].password, 'bcrypt.compareSync(oldpassword, rows[0].password):', bcrypt.compareSync(oldpassword, rows[0].password));
                    if (!bcrypt.compareSync(oldpassword, rows[0].password)) {
                        res.json(0);
                    } else {
                        var sql = "update users set password='" + newhash + "' where id='" + userId + "' ";
                        logger.debug('update password for user:', userId, sql);
                        gk3_accounts_pool.query(sql, function (err, rows, fields) {
                            if (!err) {
                                logger.debug('retrieved update password: ', rows);
                                res.json(rows);
                            } else {
                                logger.debug('Error while update password.', err);
                                res.send(err);
                            }
                        });
                    }
                } else {
                    logger.debug('Error during password reset for  USERID:::', userId, 'Error Details', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/getpreferences', utils.isLoggedIn, function (req, res) {
        logger.debug('query preferences:');
        var userId = req.user.id;

        var sql = "select * from settings where user_id='" + userId + "' and name='ROWS_PER_PAGE' ";
        logger.debug('Inside /dataaccess/getpreferences::: query settings sql:', sql);


            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.info('retrieved  current settings of ', userId, rows);
                    res.json(rows);
                } else {
                    logger.debug('Error during QUERY execution for ', userId, ' Error Info:', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/setpreferences', utils.isLoggedIn, function (req, res) {
        logger.debug('query preferences:');
        var userId = req.user.id;
        var settingid = req.query.settingid;
        var rowsperpage = req.query.rowsperpage;
        logger.debug("USER",userId);
        logger.debug("settingid",settingid);
        logger.debug("rowsperpage",rowsperpage);

        var sql = "";
        if (settingid == undefined)
            sql = "insert into settings(user_id, name, value)  values('" + userId + "', 'ROWS_PER_PAGE', '" + rowsperpage + "' ) ";
        else
            sql = "update settings set VALUE='" + rowsperpage + "' where USER_ID='" + userId + "' and NAME='ROWS_PER_PAGE' ";
        logger.info('Inside /dataaccess/setpreferences::: query settings sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.info('retrieved setting ids of ', userId, rows);
                    res.json(rows);
                } else {
                    logger.debug('Error while query is exists ', userId, ' get error', err);
                    res.send(err);
                }
            });
    });


    router.get('/dataaccess/filteridlist', utils.isLoggedIn, function (req, res) {
        logger.debug('query filteridList:');
        var userId = '8';
        var reportType = req.query.reportType;
        if (reportType == "hf_div") reportType = 1;//Hourly Fraud
        else if (reportType == "hbn_div") reportType = 2;//Hot BNumber
        else if (reportType == "dd_div") reportType = 3;//Detection Details

        var sql = "SELECT filter_id ,filter_name  FROM gk3_accounts.filter_param where report_type='" + reportType + "' and user_id='" + userId + "' and valid=1 ";
        logger.debug('query filteridList sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved filter param ids: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query filter_param.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/filterparam', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get(/dataaccess/filterparam:', dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var filterId = req.query.filterId;

        logger.debug("request.parameter.filterId:", filterId);
        var sql = "select * from gk3_accounts.filter_param where filter_id='" + filterId + "'";
            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved filter param detail: ', rows.length);

                    res.json(rows);
                } else {
                    logger.debug('Error while query filter_param.', err);
                    res.send(err);
                }
                logger.debug('end /dataaccess/filterparam:', dateFormat(Date.now(),
                    "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            });
    });

    router.get('/dataaccess/savefilterparam', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get(/dataaccess/savefilterparam:', dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        var userId = '8';
        var filterType = 1;
        var reportType = req.query.reportType;
        var filterName = req.query.filterName;
        var filterDetail = req.query.filterDetail;

        if (reportType == "hf_div") reportType = 1;//Hourly Fraud
        else if (reportType == "hbn_div") reportType = 2;//Hot BNumber
        else if (reportType == "dd_div") reportType = 3;//Detection Details

        logger.debug("request.parameter.filterName:", filterName);
        logger.debug("request.parameter.filterDetail:", filterDetail);
        var inupfg = 0;
        var sql = "select count(*) cn from gk3_accounts.filter_param where filter_name='" + filterName + "' and user_id='" + userId + "' and filter_type='" + filterType + "' and report_type='" + reportType + "' and valid=1";
        logger.info("is exists sql:", sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved query filter param name is exists: ', rows.length);
                    if (rows[0].cn == 0) {
                        inupfg = 0;
                    } else {
                        inupfg = 1;
                    }

                    if (inupfg == 0)
                        sql2 = "insert into gk3_accounts.filter_param(user_id,filter_type,report_type,filter_name,filter_detail,valid,insert_time,update_time) values('" + userId + "','1','" + reportType + "','" + filterName + "','" + filterDetail + "','1',now(),now())";
                    else
                        sql2 = "update gk3_accounts.filter_param set user_id='" + userId + "',filter_type='" + filterType + "',report_type='" + reportType + "',filter_detail='" + filterDetail + "',update_time=now() where filter_name='" + filterName + "' ";
                    logger.info("insert or update sql:", sql2);
                    gk3_accounts_pool.query(sql2, function (err, rows, fields) {
                        if (!err) {
                            logger.debug('retrieved insert/update filter param detail: ', rows.length);
                            res.json(rows);
                        } else {
                            logger.debug('Error while query filter_param.', err);
                            res.send(err);
                        }
                        logger.debug('end /dataaccess/filterparam:', dateFormat(Date.now(),
                            "dddd, mmmm dS, yyyy, h:MM:ss TT"));
                    });
                } else {
                    logger.debug('Error while query filter_param.', err);
                }
                logger.debug('end /dataaccess/filterparam:', dateFormat(Date.now(),
                    "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            });
    });


    router.get('/dataaccess/dltfilterparam', utils.isLoggedIn, function (req, res) {
        logger.debug('router.get(/dataaccess/dltfilterparam:', dateFormat(Date.now(),
            "dddd, mmmm dS, yyyy, h:MM:ss TT"));

        var filterId = req.query.filterId;

        logger.debug("request.parameter.filterId:", filterId);
        var sql = "update gk3_accounts.filter_param set valid = 0, update_time=now() where filter_id='" + filterId + "'";

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved delete filter param: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query filter_param.', err);
                    res.send(err);
                }
                logger.debug('end /dataaccess/dltfilterparam:', dateFormat(Date.now(),
                    "dddd, mmmm dS, yyyy, h:MM:ss TT"));
            });
    });


    router.get('/dataaccess/menu', utils.isLoggedIn, function (req, res) {
        logger.debug('query menu:');
        var userId = req.query.userId;
        logger.debug("userId", userId);
        logger.debug("req userId", req.user.id);
        var roleIds;

        var sql1 = "select group_concat(role_id) roleids from user_roles where deleted_date is null and  user_id='" + userId + "'";
        logger.debug('query roleids sql:', sql1);

            gk3_accounts_pool.query(sql1, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved role ids of ', userId, rows.length);
                    roleIds = rows[0].roleids;
                    var sql = "select m.* from menu m where exists (select 1 from role_menus rm where rm.menu_id=m.id and rm.role_id in (" + roleIds + ")) union all select m2.* from menu m2 where name='root'";
                    logger.log('query menu sql:', sql);
                    gk3_accounts_pool.query(sql, function (err, rows, fields) {
                        if (!err) {
                            logger.debug('retrieved menu: ', rows.length);
                            res.json(rows);
                        } else {
                            logger.debug('Error while query menu.', err);
                            res.send(err);
                        }
                    });
                } else {
                    logger.debug('Error while query role ids of ', userId, ' get error', err);
                    res.send(err);
                }
            });

    });

    router.get('/dataaccess/listuser', utils.isLoggedIn, function (req, res) {
        logger.debug('list user');

        var sql = "select * from users";
        logger.debug('query users sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved users: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query users.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/listrole', utils.isLoggedIn, function (req, res) {
        var userId = req.query.userId;
        logger.debug('list roles of user ', userId);

        var sql = "select a.role_id, a.role, a.role_description, ifnull (b.user_role_id , 0) checked, " + userId + " user_id from roles a left join  (select * from user_roles where DELETED_DATE is null and user_id=" + userId + " ) b on a.role_id=b.role_id order by role_id ";
        logger.debug('query role of user sql:', sql);
            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug("Data Access Success from /dataaccess/listrole and SQL is" + sql);
                    logger.debug('retrieved role of user: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query role of user.', err);
                    res.send(err);
                }
            });
    });


    router.get('/dataaccess/saverole', utils.isLoggedIn, function (req, res) {
        var loginId = req.user.id;
        var userId = req.query.userId;
        var roleIds = req.query.roleIds;
        var sqld = "";
        var sqli = "";
        logger.debug('save roles of user ', userId, ' roleids:', roleIds);
        var sql = "select * from user_roles where user_id=" + userId + " and deleted_date is null ";
        logger.debug('query check role of user is exists sql:', sql);


            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved check role of user is exists: ', rows.length);
                    if (rows.length > 0) {
                        for (var j = 0; j < rows.length; j++) {
                            //rows.forEach(function(d) {
                            //logger.info('d:',rows[j].ROLE_ID);
                            var role_id = "'" + rows[j].ROLE_ID + "'";
                            //logger.info("is index:",role_id,'-roleIds:', roleIds, ':', roleIds.indexOf(role_id));
                            if (roleIds.indexOf(role_id) < 0) {//role exists in db, not in select, romove it
                                sqld = "update user_roles set deleted_date = now(), deleted_by_user_id='" + loginId + "' where USER_ROLE_ID='" + rows[j].USER_ROLE_ID + "' ";
                                logger.info('delete role of user is exists sql:', sqld);
                                gk3_accounts_pool.query(sqld, function (err, rows, fields) {
                                    if (!err) {
                                        logger.debug('delete role of user if exists: ', rows);
                                        res.json(rows);
                                    } else {
                                        logger.debug('delete role of user if exists err: ', err);
                                        res.send(err);
                                    }
                                })
                            }
                        }
                    }
                    //insert into user_roles if not exists
                    roleIds2 = roleIds.replace(new RegExp(/(')/g), '');
                    var rolearr = roleIds2.split(',');
                    //logger.info('rolearr[0]:', rolearr[0]);
                    //rolearr.forEach(function(i, d) {
                    for (var i = 0; i < rolearr.length; i++) {
                        //logger.info('i:',i,"v:",rolearr[i]);
                        roleid = rolearr[i];
                        logger.debug('role:', roleid);
                        sqli = "insert into user_roles(user_id, role_id, created_date, created_by_user_id) select " + userId + "," + roleid + ", now(), " + loginId +
                            " from dual where not exists ( select * from user_roles where user_id=" + userId + " and role_id=" + roleid + " and deleted_date is null ) ";
                        logger.info('insert role of user is exists sql:', sqli);
                        gk3_accounts_pool.query(sqli, function (err, rows, fields) {
                            if (!err) {
                                logger.debug('insert into user_roles: ', rows);
                                res.json(rows);
                            } else {
                                logger.debug('insert into user roles error:', err);
                                res.send(err);
                            }
                        });
                    }


                } else {
                    logger.debug('Error while query role of user.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/listallrole', utils.isLoggedIn, function (req, res) {
        var sql = "select a.role_id, a.role, a.role_description from roles a ";
        logger.debug('query all roles sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved all roles: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query all roles.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/listrolemenu', utils.isLoggedIn, function (req, res) {
        var roleId = req.query.roleId;
        logger.debug('list menus of user ', roleId);

        var sql = " select m.*, 'checked' checked, " + roleId + " role_id from menu m where exists ( " +
            "	select 1 from role_menus rm where rm.menu_id=m.id and rm.role_id =" + roleId + " ) " +
            "	union " +
            "	select m.*, '' checked, " + roleId + " role_id from menu m where not exists ( " +
            "	select 1 from role_menus rm where rm.menu_id=m.id and rm.role_id =" + roleId + " ) " +
            "	order by id ";
        logger.debug('query role of user sql:', sql);

            gk3_accounts_pool.query(sql, function (err, rows, fields) {
                if (!err) {
                    logger.debug('retrieved role of user: ', rows.length);
                    res.json(rows);
                } else {
                    logger.debug('Error while query role of user.', err);
                    res.send(err);
                }
            });
    });

    router.get('/dataaccess/saverolemenu', utils.isLoggedIn, function (req, res) {
        var roleId = req.query.roleId;
        var menuids = req.query.menuIds;
        logger.debug('list menus of user roleId ', roleId, 'menuids:', menuids);
        if (roleId == null || roleId == "") {
            var errorMsg = "saverolemenu: roleId can't be empty";
            logger.error(errorMsg);
            res.send(errorMsg);
        }
        var sqlck = "select group_concat(menu_id) menu_ids from role_menus where role_id=" + roleId;

            gk3_accounts_pool.query(sqlck, function (err, rows, fields) {
                if (!err) {
                    if (rows[0].menu_ids != menuids) {

                        var sql = "delete from role_menus where role_id=" + roleId;
                        logger.debug('query menuids of role sql:', sql);
                        gk3_accounts_pool.query(sql, function (err, rows, fields) {
                            if (!err) {
                                logger.debug('retrieved menuids of role : ', rows);
                                var sqli = "insert into role_menus(role_id,menu_id) values ";
                                var arrmenu = menuids.split(",");

                                for (var i = 0; i < arrmenu.length - 1; i++) {
                                    sqli += " (" + roleId + ", " + arrmenu[i] + " ),";

                                }

                                sqli += " (" + roleId + ", " + arrmenu[arrmenu.length - 1] + " );";
                                logger.debug('insert role_menus sql: ', sqli);
                                gk3_accounts_pool.query(sqli, function (err, rows, fields) {
                                    if (!err) {
                                        res.json(rows);
                                    } else {
                                        logger.debug('Error while menuids of role .', err);
                                        res.send(err);
                                    }
                                });
                            } else {
                                logger.debug('Error while menuids of role .', err);
                                res.send(err);
                            }
                        });
                    }
                } else {
                    logger.debug('Error while menuids of role .', err);
                    res.send(err);
                }
            });
    });

    app.use(appContextRoot, router);
};





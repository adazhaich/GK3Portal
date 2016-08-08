// set up ======================================================================
//========This file will be the glue for our entire application.

var express  = require('express');
var app      = express();
var https = require('https');
var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url') ;
var fs = require('fs');


var mysql = require('mysql');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var logger 		 = require("./app/logger");
var config	= require("./app/config");


var port     =     config.httpConfig.port;
var sslPort     =  config.httpConfig.sslPort;

//var contextRoot = config.httpConfig.contextRoot;
//CREATE CONNECTION TO ACCOUNTS DB
/*
var mysqlConn = mysql.createConnection({
	host : config.mysqlConfig.host,
	port : config.mysqlConfig.port,
	user : config.mysqlConfig.user,
	password : config.mysqlConfig.password,
	database : config.mysqlConfig.database
});
*/


//CREATE CONNECTION POOL
var gk3_accounts_pool = mysql.createPool({
    connectionLimit : 3, //important
    host : config.mysqlConfig.host,
    port : config.mysqlConfig.port,
    user : config.mysqlConfig.user,
    password : config.mysqlConfig.password,
    database : config.mysqlConfig.database,
    debug    :  false
})



require('./app/passport')(passport, gk3_accounts_pool, logger); // pass passport for configuration


// set up our express application
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/views'); //defining absolute path of views folder




//app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
//app.set('public', __dirname + '/public'); //defining absolute path of views folder
//app.use('/reports', express.static(__dirname + '/public')); // all reports will access static files from location /public/*
//app.use('/drilldown',express.static(__dirname + '/public'));


// request was for a static asset, for which authentication is not necessary
 app.use(express.static(__dirname + '/views/css'));
 app.use(express.static(__dirname + '/views/images'));
 app.use(express.static(__dirname + '/views/stylesheets'));
 app.use(express.static(__dirname + '/views/js'));
 app.use('/reports',express.static(__dirname + '/views/css')); // all reports will access static files
 app.use('/reports',express.static(__dirname + '/views/images')); // all reports will access static files
 app.use('/reports',express.static(__dirname + '/views/stylesheets')); // all reports will access static files
 app.use('/drilldown',express.static(__dirname + '/views/css')); // all reports will access static files
 app.use('/drilldown',express.static(__dirname + '/views/images')); // all reports will access static files
 app.use('/drilldown',express.static(__dirname + '/views/stylesheets')); // all reports will access static files



//http://stackoverflow.com/questions/14464873/expressjs-session-expiring-despite-activity
app.use(session({
    secret: 'a secret',
    name: 'portal_cookie',
    cookie: { maxAge:  30 * 60 * 1000},
        path: '/',
        httpOnly: true,
        secure: false,

    rolling: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes/appMapper')(app, passport, config, gk3_accounts_pool); // load our routes for data access


// START THE SERVER=============================================================

if (config.httpConfig.ssl){
    // Create an HTTPS service identical to the HTTP service.
/*	var options = {
			  key: fs.readFileSync('/home/mwsadmin/.ssh/key.pem'),
			  cert: fs.readFileSync('/home/mwsadmin/.ssh/cert.pem')
			};
*/
 var options = {
 key: fs.readFileSync('/Users/avandana/conf/key.pem'),
 cert: fs.readFileSync('/Users/avandana/conf/cert.pem')
 };

	https.createServer(options, app).listen(sslPort);
    //https.createServer(app).listen(sslPort);
    logger.debug('The magic happens on http sslPort ' + sslPort);
}
else {
    // Create an HTTP service=======================================================
    http.createServer(app).listen(port);
   logger.debug("The magic happens on http port " + port);
}


//====================================================================================

// context root?
//console.log("contextRoot:",contextRoot );
//logger.debug("contextRoot:",contextRoot );

/*
 There are two broad ways of implementing sessions in Express – using cookies
 and using a session store at the backend. Both of them add a new object in the request object named session, which contains the session variables.*/
// required for passport
/*
 app.use(session({
 secret: 'ilovescotchscotchyscotchscotch',
 name: 'btcg_cookie_name',
 rolling: true,  //forces a cookie set on every response and resets the expiration date.
 cookie: {
 maxAge:  1 * 60 * 1000
 }, //1 minute
 activeDuration: 5 * 60 * 1000, //allows users to lengthen their session by interacting with the site. If the session is 28 minutes old and the user sends another request, activeDuration will extend the session’s life for however long you define. In this case, 5 minutes.
 path: '/',
 proxy: true,
 resave: true, //forces session to be saved even when unmodified...
 saveUninitialized: true
 }));

================================================================================================= */
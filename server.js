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


var port     = process.env.PORT || config.httpConfig.port;
var sslPort     =  config.httpConfig.sslPort || 8443;
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
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/views'); //defining absolute path of views folder
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.set('public', __dirname + '/public'); //defining absolute path of views folder
//app.use('/reports', express.static(__dirname + '/public')); // all reports will access static files from location /public/*
//app.use('/drilldown',express.static(__dirname + '/public'));



// context root?
//console.log("contextRoot:",contextRoot );
//logger.debug("contextRoot:",contextRoot );


// required for passport
app.use(session({ 
	secret: 'ilovescotchscotchyscotchscotch', 
    name: 'btcg_cookie_name',
    cookie: {maxAge: 30*60*1000},
    path: '/',
//	    store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
		})); // session secret



app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================

require('./app/routes/appMapper')(app, passport, config, gk3_accounts_pool); // load our routes for data access


// launch ======================================================================

// Create an HTTP service.
http.createServer(app).listen(port);


// Create an HTTPS service identical to the HTTP service.
if (config.httpConfig.ssl){
	var options = {
			  key: fs.readFileSync('/home/mwsadmin/.ssh/key.pem'),
			  cert: fs.readFileSync('/home/mwsadmin/.ssh/cert.pem')
			};
	
	https.createServer(options, app).listen(sslPort);
	console.log('The magic happens on http sslPort ' + sslPort);
}

else {
   //console.log("SSL Config",+config.httpConfig.ssl);

    logger.debug("The magic happens on http port " + port);

}

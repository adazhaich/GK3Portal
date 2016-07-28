
// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var logger = require('./logger.js');
// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var gk3_accounts_db = require('./database');
var connection = mysql.createConnection(gk3_accounts_db.connection);

/* ===============USE THIS TO TEST DB CONNECTION DURING SERVER START UP FOR NEW DEPLOYMENTS==================================
connection.connect(function(err){
		 if(!err) {
		     //console.log("Database is connected ... \n\n");
		     //logger.debug("Using Database:", gk3_accounts_db.database);
		     connection.query('USE ' + gk3_accounts_db.database);
		     //console.log("Login database:", gk3_accounts_db.database);
			 logger.debug("SUCCESS Connecting to GK3 Accounts Login Database", gk3_accounts_db.database);

		 } else {
		     logger.debug("ERROR connecting to GK3 Accounts Login database: \n\n",gk3_accounts_db.database);
		 }
});
 ===============USE THIS TO TEST DB CONNECTION DURING SERVER START UP FOR NEW DEPLOYMENTS================================== */


// load the auth variables
//var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport, pool, logger) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	logger.debug("passport.serializeUser:user:", user);
        done(null, user.id);
    });

    // used to deserialize the user
   passport.deserializeUser(function(id, done) {
    	logger.debug("passport.deserializeUser:id:", id);
    	pool.getConnection(function (err, connection){
	   		 if(err) {
	   		     return;

	   		 }
	   		     connection.query('USE ' + gk3_accounts_db.database);
	   	        connection.query("select a.id,a.username,a.password,group_concat(role_id) role_id " +
					"from (select * from users where id=?) a left join (select * from user_roles where DELETED_BY_USER_ID is null) " +
					"b on a.id=b.user_id group by a.id ",[id], function(err, rows){
					connection.release();
	   	            if (err)
	   	                return done(err);
	   	            if (!rows.length || rows.length == 0) {

	   	                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
	   	            }
	   	            done(err, rows[0]);
	   	        });

    	});

    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {
        if (username)
            username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

		logger.debug("***INSIDE passport local-login ******\n\n");
    	pool.getConnection(function (err, connection){

	   		 if(err) {
	   		     //console.log("***local-login**** Error connecting database ... \n\n", err);
		   		 logger.debug("***local-login**** Error connecting database ... \n\n", err);
				 return;
	   		 } 

	        // asynchronous
	        connection.query("select a.id,a.username,a.password,group_concat(role_id) role_id from (select * from users where username=?) a left join (select * from user_roles where DELETED_BY_USER_ID is null) b on a.id=b.user_id group by a.id",[username], function(err, rows){
	   		    connection.release();
	        	if (err)
	                return done(err);
	            if (!rows.length) {
	                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
	            }
	            //console.log('password:', password, 'rows[0].password:', rows[0].password, 'role id:', rows[0].role_id);
	            // if the user is found but the password is wrong
	            if (!bcrypt.compareSync(password, rows[0].password))
	                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
	
	            // all is well, return successful user
	            return done(null, rows[0]);
	        });
        });
    }//end of function
    ));
    

    // =========================================================================
    //  SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {
        if (username)
            username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    	pool.getConnection(function (err, connection){
	   		 if(err) {
	   		     //console.log("Error connecting database ... \n\n", err);
		   		 //logger.debug("Error connecting database ... \n\n", err);
		   		 connection.release();
	   		     return;
	   		 } 

        // asynchronous
        connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
            if (err){
            	connection.release();
            	return done(err);
            }
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                // if there is no user with that username
                // create the user
                var newUserMysql = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                };

                var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                	connection.release();
                	if(err){

                    	return done(err);
                    }
                    else {
                        newUserMysql.id = rows.insertId;
    
                        return done(null, newUserMysql);
                    }
                });
            }
        });//finished asynchronous        
    });
    }//end function
    ));
};


/*


First you must understand what serialize and deserialize are meant for.

1) serializeUser take a user object and store any information you want in the session, when you return done(null, user), as per your first question.

2) deserializeUser take the information stored in the session (sent by cookieSession in every request) and
checks if the session is still valid for a user, and if(!err) done(null,user) is true, keeps the user in the session,
	where else done(err,null) removes it from the session, redirecting you to whatever your app.get('/auth/:provider/callback')
sends the user to after checking if the session is timed out or not. This should clarify things for your second question.*/

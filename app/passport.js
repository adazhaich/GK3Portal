var LocalStrategy = require('passport-local').Strategy;
var logger = require("./logger.js");
var bcrypt = require('bcrypt-nodejs');
var config = require("./config");


module.exports = function (passport, gk3_accounts_pool, logger) {
    passport.serializeUser(function (user, finished) {
        logger.debug("passport.serializeUser:user:", user);
        finished(null, user);  // done(null, user.id); Saving entire user object into session
    });

    passport.deserializeUser(function (user, done) {
        if (user) {
            done(null, user);
        }
        else {
            logger.debug("request is NOT coming from same user");
            err = "INVALID USER REQUEST.PLEASE LOGIN or CHECK IF YOU HAVE ACCESS";
            done(err);
        }
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, username, password, done) {
            if (username)
                username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            logger.debug("***INSIDE passport local-login ******\n\n");
            gk3_accounts_pool.query("select a.id,a.username,a.password,group_concat(role_id) role_id from (select * from users where username=?) " +
                "a left join (select * from user_roles where DELETED_BY_USER_ID is null) b on a.id=b.user_id group by a.id", [username], function (err, rows) {

                if (err) {
                    logger.debug("***local-login**** Error running login SQL ... ", err);
                    //logger.debug("***local-login**** Error for USER ... ", username);
                    //logger.debug("***local-login**** Error for USER pwd ...", password);

                    return done(err);
                }
                if (!rows.length) {
                    logger.debug("***local-login**** NO USER FOUND...***");
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    logger.debug("***local-login**** WRONG PASSWORD...***");
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
                logger.debug("passport.login-login SUCCESS for user:", rows[0]);
                return done(null, rows[0]); //LOGIN SUCCESS-calls passport.serialize to serialize user into session
            });
        }//end of function
    ));


    // =========================================================================
    //  SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, username, password, done) {
            if (username)
                username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            gk3_accounts_pool.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {

                if (err) {
                    return done(err);
                }
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that usernam, create the NEW user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                    gk3_accounts_pool.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
                        if (err) {
                            return done(err);
                        }
                        else {
                            newUserMysql.id = rows.insertId;
                            return done(null, newUserMysql);
                        }
                    });
                }
            });//finished asynchronous

        }//end function
    ));
};


/*=======================================TO READ ============================================================================================================================

 First you must understand what serialize and deserialize are meant for.

 1) serializeUser take a user object and store any information you want in the session, when you return done(null, user), as per your first question.

 2) deserializeUser take the information stored in the session (sent by cookieSession in every request) and
 checks if the session is still valid for a user, and if(!err) done(null,user) is true, keeps the user in the session,
 where else done(err,null) removes it from the session, redirecting you to whatever your app.get('/auth/:provider/callback')
 sends the user to after checking if the session is timed out or not. This should clarify things for your second question.*/

//https://github.com/jaredhanson/passport

/*
 // =========================================================================
 // passport session setup ==================================================
 // required for persistent login sessions

 passport.serializeUser(function(user, done) {
 done(null, user.id);
 |
 });              |
 |
 |____________________> saved to session req.session.passport.user = {id:'..'}
 |
 passport.deserializeUser(function(id, done) {
 ________________|
 |
 User.findById(id, function(err, user) {
 done(err, user);
 |______________>user object attaches to the request as req.user

 });
 });

 /*
 The key of user object you provide in second argument of the done in serialize function is saved in session and is used to retrieve the whole object via deserialize function.
 The key of user object you provide in second argument of the done in serialize function is saved in session and is used to retrieve the whole object via deserialize function.
 Serialize function determine what data from the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}
 here for instance it would be(as we provide id as key) req.session.passport.user = {id:'xyz'}*/

/*	In deserialize function you provide in first argument of deserialize function that same key of user object that was given to done function in
 serialize call. So your whole object is retrieved with help of that key. That key here is id(key can be any key of the user object ie name,email etc).
 In deserialize function that key is matched with in memory array / database or any data resource.
 The fetched object is attached to request object as req.user

 =======================================================================================================================================================================================*/
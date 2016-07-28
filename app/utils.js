var logger = require("./logger.js");
//var config	= require('../config');
var config	= require('./config');
var checkAuthentication     =  config.httpConfig.checkAuthentication;

logger.debug("util.js:checkAuthentication=", checkAuthentication);
//console.log("util.js:checkAuthentication=", checkAuthentication);

module.exports = {  
//route middleware to ensure user is logged in
  isLoggedIn: function(req, res, next) {
	  if (!checkAuthentication){
		  return next();
	  }
	  else if (req.isAuthenticated()){
          return next();
      }
      else {
    	  res.redirect('/');
      }
  },

	getDateHourStr: function (day, hour){
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
};
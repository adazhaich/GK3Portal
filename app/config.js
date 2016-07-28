//NOTE: Change SSL to true and comment out the port number while deploying in DEMO or PROD servers
module.exports = {
    "httpConfig": {
        "contextRoot": "/test",
        "default_illegal_odds": 0.7,
        "checkAuthentication": true,
        "host": "localhost",
        "ssl": false,
        "port": 8580
    },
    "mysqlConfig": {
       "host": "10.212.2.173", //NEW SERVER
       "port": "3306",  //NEW PORT
       // "host": "10.214.3.16",
        //"port": "36053",
        "user": "mwsadmin",
        "password": "ubi6La5z",
        "debug": false,
        "database": "gk3_accounts" //NEW Database
        //"database": "fraud_605_3"
    },
    "dataService": {
        "url": "10.212.2.143", //phoenix service
       // "url": "10.214.2.39", // tunneling through Tokyo 10.214.2.39 with vpn//forwarding to 10.212.2.143
        "protocol": "http",
        "port": 8080
    },
    "defaultTimeConfig": {
        "range_hour": "5"
    },

    "portalConfig": {
        "appLogName": "gk3.log",
        "appExceptionsLogName" : "exceptions.log",
        "logsDirectory": "__dirname + /logs/"
    }
};


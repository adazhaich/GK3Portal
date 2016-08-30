module.exports = {
    "httpConfig": {
        "contextRoot": "/tunisiana",
        "default_illegal_odds": 0.7,
        "checkAuthentication": true,
        "host": "localhost",
        "ssl": false,
        "port": 8580,
        "sslPort": 8443
    },
    "mysqlConfig": {
        "host": "10.212.2.173", //NEW SERVER
        //"host": "127.0.0.1", //NEW SERVER
        "port": "3306",  //NEW PORT
        "user": "mwsadmin",
        "password": "ubi6La5z",
        "debug": false,
        "database": "gk3_accounts"
    },
    "dataService": {
        "url": "10.212.2.143", //phoenix service
        //"url": "127.0.0.1", //phoenix service
        "protocol": "http",
        "port": 8080
    },
    "defaultTimeConfig": {
        "range_hour": "5"
    },

    "portalConfig": {
        "appLogName": "gk3.log",
        "appExceptionsLogName": "exceptions.log",
        "logsDirectory": "__dirname + /logs/"
    }
};
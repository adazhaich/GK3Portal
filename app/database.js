//will be replaced by REST service
// config/database.js
module.exports = {
    'connection': {
        'user': 'mwsadmin',
       "host": "10.212.2.173",//NEW SERVER
       "port": "3306",  //NEW PORT
        //"host": "10.214.3.16",
       // "port": "36053",
        'password': 'ubi6La5z'
    },
    'database': 'gk3_accounts',
    //"database": "fraud_605_3",
    'users_table': 'users'

   // 'mysqlUrl': 'jdbc:mysql://10.212.2.173:3306/gk3_accounts?zeroDateTimeBehavior=convertToNull',// asb fraud_605_3.cell_id_info
    //'mongoUrl' : 'mongodb://localhost/passport' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
};



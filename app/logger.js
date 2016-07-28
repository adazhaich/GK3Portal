// logging
var winston = require('winston');
var config = require('./config');
var logger = new (winston.Logger)({
	transports : [ new (winston.transports.Console)({
		json : false,
		level: 'debug',
		colorize: true,
		timestamp : true
	}), new winston.transports.File({
		filename : __dirname + '/logs/'+config.portalConfig.appLogName,
		level : 'debug',
		timestamp : true,
		json : false
	}) ],
	handleExceptions: true,
	exceptionHandlers : [ new (winston.transports.Console)({
		json : false,
		timestamp : true
	}), new winston.transports.File({
		filename : __dirname + '/logs/'+config.portalConfig.appLogName,
		timestamp : true,
		json : false
	}) ],
	exitOnError : false
});

module.exports = logger;

/*

var winston = require('winston');

winston.loggers.add('my-logger', {
	console: {
		level: 'debug',
		colorize: true,
		timestamp: true,
		handleExceptions: true
	},
	file: {
		level: 'info',
		colorize: false,
		timestamp: true,
		filename: file,
		handleExceptions: true
	}
});

var logger = winston.loggers.get('my-logger');


/!* ******* *
 * EXPORTS
 * ******* *!/

exports.exitAfterFlush = function(code) {
	logger.transports.file.on('flush', function() {
		process.exit(code);
	});
};

exports.info = function() {
	logger.info.apply(this, arguments);
};

exports.warn = function() {
	logger.info.apply(this, arguments);
};

exports.error = function() {
	logger.info.apply(this, arguments);
};*/

/*
var logger = require('./logger.js');
logger.exitAfterFlush(0);
info('Done!');*/

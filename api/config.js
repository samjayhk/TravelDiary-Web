'use strict'

var mysql = require('mysql');

module.exports = {
    name: 'rest-api',
    hostname : 'mysql',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3306,
    db: {
        get : mysql.createConnection({
			host     : 'mysql',
			user     : 'root',
			password : 'usbw',
			database : 'travel',
			insecureAuth: true
		})
    }
}
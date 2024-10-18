const mysql = require("mysql");

let db;

db = mysql.createPool({
    connectionLimit: 10000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    host: process.env.HOST || "p3plzcpnl445408.prod.phx3.secureserver.net/",
    port: 3306,
    user: process.env.USER || "kailclaskan",
    password: process.env.PW || "mhb31TR#@12",
    database: process.env.DB_NAME || "portfolio",
    debug:false
});

module.exports = db;
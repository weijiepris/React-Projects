const mysql = require("mysql2");

// Create a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',
    database: 'cafedb'
});


module.exports = db;
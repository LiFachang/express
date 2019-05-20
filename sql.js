const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'lfc3.14159',
  database: 'lifachang'
});

db.connect();

module.exports = db;
const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'lifachang',
  password: 'Lfc3.14159',
  database: 'lifachang'
});

db.connect();

module.exports = db;
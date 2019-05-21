const mysql = require('mysql');


const db = mysql.createConnection({
  host: '140.143.163.171',
  user: 'root',
  password: 'lfc3.14159',
  database: 'lifachang'
});

db.connect();

module.exports = db;
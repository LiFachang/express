const mysql = require('mysql');

let onLine = 0; // 1线上， 2线下
let host = '';

if (onLine) {
  host = '140.143.163.171'
} else {
  host = '127.0.0.1'
}

const db = mysql.createConnection({
  host: host,
  user: 'root',
  password: 'lfc3.14159',
  database: 'lifachang'
});

db.connect();

module.exports = db;
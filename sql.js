const mysql = require('mysql');
const isOnLine = require('./isOnLine')

let onLine = isOnLine; // 1线上， 0线下
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
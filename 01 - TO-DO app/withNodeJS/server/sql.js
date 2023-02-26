const mysql = require("mysql");
const DBname = "Todo app";

const connection = mysql.createConnection({
  database: "Todo",
  user: "root",
  password: "",
});

const executeQuery = (sql, callback) => {
  connection.query(sql, callback);
};

module.exports = executeQuery;

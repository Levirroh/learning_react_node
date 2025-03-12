const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "to_do_list_node"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
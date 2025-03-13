import mysql12 from "mysql";

export const con = mysql12.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "to_do_list_node"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
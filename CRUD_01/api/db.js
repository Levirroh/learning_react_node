import mysql12 from "mysql";

export const connection = mysql12.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud_node_inicial"
})
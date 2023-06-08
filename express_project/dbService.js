const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

config = {
    user: 'admin',
    host: 'team18.cj9qnbowobx2.ap-southeast-2.rds.amazonaws.com',
    port: 3306,
    password: 'admin123',
    database: 'rubric',
    connectionLimit: 10,
    multipleStatements: true
}


const db = mysql.createConnection(config);
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to Database.")
})



module.exports = {connection: db};
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

config = {
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
    multipleStatements: true
}


const db = mysql.createConnection(config);
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to Database.")
})



module.exports = {connection: db};
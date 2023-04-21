const mysql = require("mysql");
// const sqlite = require("sqlite3");
// const md5 = require("md5");
let instance = null;
const dotenv = require("dotenv");
dotenv.config();

config = {
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
}


const db = mysql.createConnection(config);

db.connect((err) => {
        if(err) {
            console.log(err.message);
        };
        console.log('db ' + db.state);
    });

// class DbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService();
//     }
// }

module.exports = {
    connection : mysql.createConnection(config)
}
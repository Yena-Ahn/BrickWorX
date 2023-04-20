const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});


db.connect((err) => {
        if(err) {
            console.log(err.message);
        };
        console.log('db ' + db.state); 
    });


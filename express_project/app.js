const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const dbService = require("./dbService");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());



// const mysql = require("mysql2")



// const db = mysql.createConnection({
//   user: "admin",
//   host: "team18.cj9qnbowobx2.ap-southeast-2.rds.amazonaws.com",
//   port: 3306,
//   password: "admin123",
//   database: "rubric"
// });

// db.connect((err) =>{
//     if(err) throw err;
//     console.log('Mysql Connected...');
// });

// Create




app.post("/Submit", (req, res) => {
  const dynamicForm = req.body.dynamicForm; //json data
  const rubric_name = dynamicForm.rubric_name;
  const question_name = dynamicForm.question_name;
  const question_id = dynamicForm.question_id;
  const row_id = dynamicForm.row_id;
  const criterions = dynamicForm.criterions;
  const criterion_id = criterions.id;
  const criteria = criterions.criteria;
  const grade = criterions.grade;

  db.query("INSERT INTO Rubrics VAUES (NOW(), `user`, ${rubric_name});", function(err) {
    if (err) throw err;
    console.log("Successfully inserted into Rubrics table.")
  });
  

  db.query("INSERT INTO Rubric_rows COLUMNS (row_id, row_edit_time) VALUES (${row_id}, NOW());", function(err) {
    if (err) throw err;
    console.log("Successfully inserted into Rubrics_rows table.")
  });

  db.query("INSERT INTO Rubric_block VALUES (${criterions.id}, ${grade}, ${criteria});", function(err) {
    if (err) throw err;
    console.log("Successfully inserted into Rubric_block table.")
  });

  db.query("INSERT INTO rubric_row_blocks COLUMNS (rubric_row_id, rubric_block) VALUES (${row_id}, ${criterions.id});", function(err) {
    if (err) throw err;
    console.log("Successfully inserted into rubric_row_blocks table.")
  });

})



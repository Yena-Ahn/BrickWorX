const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const dbService = require("./dbService.js");
const db = dbService.connection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//because it is sent as a json it does not need to be destrigified or anything, you can directly start working with it
app.post('/submit', function(request, response){
  console.log(request.body);      // your JSON
  let rubric = {...request.body}; 
  
  console.log("RUBRIC_NAME:");
  console.log(rubric.rubricName);

  console.log("RUBRIC_BODY:");
  console.log(rubric.rubric);

  console.log("QUESTION_1:");
  console.log(rubric.rubric[0]);

  var rubricName = rubric.rubricName;
  var questionName = rubric.rubric[0].questionName;

  // fixed user for now
  // Rubrics table
  var sqlQuery = "INSERT INTO Rubrics (time_stamp, last_editor, rubric_name) VALUES (NOW(), 0, ?)";
  db.query(sqlQuery, rubricName, function(err) {
    if (err) throw err;
    console.log("Successfully inserted into Rubrics table.")
  });


  db.query("SELECT LAST_INSERT_ID();", function(err, row, field) {
    let result = JSON.parse(JSON.stringify(row));
    rubricId = result[0]["LAST_INSERT_ID()"]; // ERROR
  });


  for (let question=0; question<rubric.rubric.length; question++) {
    console.log(rubricId);
    //Question table
    let question_name = rubric.rubric[question].questionName;
    sqlQuery = "INSERT INTO Question (rubric_id, question_name) VALUES (?, ?);";
    db.query(sqlQuery, [rubricId, question_name], function(err) {
      if (err) throw err;
      console.log("Successfully inserted into Question table.");
    });

    let criterion = rubric.rubric[question].criterions;

    db.query("SELECT LAST_INSERT_ID();", function(err, row, field) {
      let questionId = row[0];
    })

    // Rubric_block table
    for (let j=0; j<criterion.length; j++) {
      let grade = criterion[j].grade;
      let criterionsId = criterion[j].id;
      let criteria = criterion[j].criteria;

      sqlQuery = "INSERT INTO Rubric_block (id, grade, text, question_id) INTO VALUES (?, ?, ?, ?);";
      db.query(sqlQuery, [criterionsId, grade, criteria, question_id], function(err) {
        if (err) throw err;
        console.log("Successfully inserted into Rubric_block table.");
      });

      
    }

  }


  
  
  

  

  

  // db.query("INSERT INTO rubric_row_blocks COLUMNS (rubric_row_id, rubric_block) VALUES (${row_id}, ${criterions.id});", function(err) {
  //   if (err) throw err;
  //   console.log("Successfully inserted into rubric_row_blocks table.")
  // });

  





  response.send(request.body);    // echo the result back
});

const clearDB = (db, tableName) => {
  var sqlq = "DELETE FROM " + tableName + "; ALTER TABLE " + tableName + " AUTO_INCREMENT = 1;";
  db.query(sqlq, tableName, function(err) {
    if (err) throw err;
    console.log("Table " + tableName + " is cleared.");
  });
}

// const getLastId = (db) => {
//   db.query("SELECT LAST_INSERT_ID();", function(err, row, field) {
//     let result = JSON.parse(JSON.stringify(row));
//     result[0]["LAST_INSERT_ID()"];
//   });
// }



app.listen(3001, ()=>{console.log('server started on port 3001')});


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

// app.post("/Submit", (req, res) => {
//   const dynamicForm = req.body.dynamicForm; //json data
//   const rubric_name = dynamicForm.rubric_name;
//   const question_name = dynamicForm.question_name;
//   const question_id = dynamicForm.question_id;
//   const row_id = dynamicForm.row_id;
//   const criterions = dynamicForm.criterions;
//   const criterion_id = criterions.id;
//   const criteria = criterions.criteria;
//   const grade = criterions.grade;

//   // db.query("INSERT INTO Rubrics VAUES (NOW(), `user`, ${rubric_name});", function(err) {
//   //   if (err) throw err;
//   //   console.log("Successfully inserted into Rubrics table.")
//   // });
  

//   // db.query("INSERT INTO Rubric_rows COLUMNS (row_id, row_edit_time) VALUES (${row_id}, NOW());", function(err) {
//   //   if (err) throw err;
//   //   console.log("Successfully inserted into Rubrics_rows table.")
//   // });

//   // db.query("INSERT INTO Rubric_block VALUES (${criterions.id}, ${grade}, ${criteria});", function(err) {
//   //   if (err) throw err;
//   //   console.log("Successfully inserted into Rubric_block table.")
//   // });

//   // db.query("INSERT INTO rubric_row_blocks COLUMNS (rubric_row_id, rubric_block) VALUES (${row_id}, ${criterions.id});", function(err) {
//   //   if (err) throw err;
//   //   console.log("Successfully inserted into rubric_row_blocks table.")
//   // });

// })



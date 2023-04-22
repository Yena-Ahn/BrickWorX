const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const util = require("util");

dotenv.config();

const dbService = require("./dbService.js");
const { get } = require("http");
const db = dbService.connection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.post('/submit', async function(request, response) {
  //try {
    console.log(request.body);      // your JSON
    let rubric = { ...request.body }; 

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
    try {
      db.query(sqlQuery, rubricName);
      console.log("Successfully inserted into Rubrics table.");
    } catch (err) {
      console.log("Error" + err.stack);
    }

    let result = JSON.parse(JSON.stringify(await getLastId()));
    let rubricId = result[0]["LAST_INSERT_ID()"];


    for (let question = 0; question < rubric.rubric.length; question++) {
      if (rubricId !== null) { // Check if rubricId is defined before using it
        let question_name = rubric.rubric[question].Question;
        sqlQuery = "INSERT INTO Question (rubric_id, question_name) VALUES (?, ?);";
        try {
          await db.query(sqlQuery, [rubricId, question_name]);
          console.log("Succesfully inserted into Question table.");
        } catch (err) {
          console.log("Error");
        }
        let criterion = rubric.rubric[question].criterions;
        result = JSON.parse(JSON.stringify(await getLastId()));
        let questionId = result[0]["LAST_INSERT_ID()"];

        for (let j = 0; j < criterion.length; j++) {
          let grade = criterion[j].grade;
          // let criterionsId = criterion[j].id;
          let criteria = criterion[j].body;
  
          sqlQuery = "INSERT INTO Rubric_block (grade, text, question_id) VALUES (?, ?, ?);";
          await db.query(sqlQuery, [grade, criteria, questionId]);
  
          console.log("Successfully inserted into Rubric_block table.");
        }
        
      } else {
        console.log("rubricId is not defined yet."); // Handle rubricId undefined case
      }
    }

    response.send(request.body);    // echo the result back

  });

  const getLastId = () => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT LAST_INSERT_ID();';
      
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        
        resolve(res);
      })
    })
  };



app.listen(3001, ()=>{console.log('server started on port 3001')});
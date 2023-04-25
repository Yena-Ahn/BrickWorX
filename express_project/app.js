const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const util = require("util");
const multer=require('multer')
const fs = require('fs');
const path = require('path')
const csv = require('csv')
const request = require('request');

const {
  S3Client,
  PutObjectCommand
} = require("@aws-sdk/client-s3");
const s3Config = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION_NAME,
};
const s3Client = new S3Client(s3Config);


dotenv.config();

const dbService = require("./dbService.js");
const { get } = require("http");
const db = dbService.connection;
const storageDir = './uploads/';

//var serveIndex = require('serve-index');

// app.use(express.static(__dirname + "/"))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));






app.get('/uploads', (req, res) => {
  const fullPath = process.cwd() + req.path //(not __dirname)
  const dir = fs.opendirSync(fullPath)
  let entity
  let listing = []
  while((entity = dir.readSync()) !== null) {
      if(entity.isFile()) {
          listing.push({ type: 'f', name: entity.name })
      } else if(entity.isDirectory()) {
          listing.push({ type: 'd', name: entity.name })
      }
  }
  dir.closeSync()
  res.send(listing)
})


// CSV Bullshit
// var columns={}
// var parse = require('csv-parse');
// var parser = parse.parse({columns: true}, function (err, records) {
//   columns=[...records][0]
//   console.log(Object.keys(columns));
//   console.log('////////////////////////////////////////////////////')
// 	//console.log(records);
// });

// fs.createReadStream(__dirname+'/uploads/CanvasExportExample.csv').pipe(parser);


//later make query specific rubric
app.get('/csvcolumns', (req, res) => {
  var columns={}
  var parse = require('csv-parse');
  var parser = parse.parse({columns: true}, function (err, records) {
    columns=[...records][0]
    console.log(Object.keys(columns));
    console.log('////////////////////////////////////////////////////')
    res.send(Object.keys(columns))
    //console.log(records);
  });
  fs.createReadStream(__dirname+'/uploads/CanvasExportExample.csv').pipe(parser);
})


app.get('/csvStudents', (req, res) => {
  var columns={}
  var parse = require('csv-parse');
  var parser = parse.parse({columns: true}, function (err, records) {
    res.send(records)
    //console.log(records);
  });
  fs.createReadStream(__dirname+'/uploads/CanvasExportExample.csv').pipe(parser);
})

// Download the specified file from the rubrics directory of the s3 bucket
app.get('/s3download', function(req, res){
  url = "https://csvrubricbucket.s3.ap-southeast-2.amazonaws.com/rubrics/"
  fileName = req.query.fn
  console.log(fileName)
  request(url+fileName).pipe(res.set('Content-Type', 'application/csv'))
});

// Request the specified file in JSON format
app.get('/s3JSON', function(req, res){
  url = "https://csvrubricbucket.s3.ap-southeast-2.amazonaws.com/rubrics/"
  fileName = req.query.fn
  console.log(fileName)
  var columns={}
  var parse = require('csv-parse');
  var parser = parse.parse({columns: true}, function (err, records) {
    columns=[...records][0]
    console.log(Object.keys(columns));
    console.log('////////////////////////////////////////////////////')
    res.send(Object.keys(columns))
    //console.log(records);
  });
  request((url+fileName)).pipe(parser);
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  }
})

let upload = multer({ storage: storage, dest: 'uploads/' })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
})


app.post("/s3upload", async (req, res) => {
  const file = req.file;
  const fileName = file.filename
  console.log(file.filename);

  const bucketParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: "rubrics/" + fileName,
    Body: file.data,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    res.send(data)
  } catch (err) {
    console.log("S3 Error", err);
  }
});


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
        let question_name = rubric.rubric[question].questionName;
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

app.get("/getRubric", async function(req, res) {
  let id = req.query.id;
  let result = JSON.parse(JSON.stringify(await getRubric(id)));
  let uniqueQ = JSON.parse(JSON.stringify(await getUniqueQuestion(id)));
  let resultArray = [];
  uniqueQ.forEach(element => {
    let criterions = [];
    let questionJson = {};
    result.forEach(resultEle => {
      if (resultEle.question_id == element.question_id) {
        if (!Object.keys(questionJson).length) {
          questionJson.questionName = resultEle.question_name;
          questionJson.id = resultEle.question_id;
        }
        criterions.push({body: resultEle.text, grade: resultEle.grade, id: resultEle.id});
      }
    })
    questionJson.criterions = criterions;
    resultArray.push(questionJson);
  });

  res.json(resultArray);
  
});

app.get("/list", async function(req, res) {
  let result = JSON.parse(JSON.stringify(await getAllRubric()));
  res.json(result);
})




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


  const getRubric = (id) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT Question.question_name, Question.question_id, Rubric_block.text, Rubric_block.grade, Rubric_block.id FROM Rubrics, Question, Rubric_block WHERE Rubrics.id = ? and Rubrics.id = Question.rubric_id and Question.question_id = Rubric_block.question_id;";
      db.query(query, [id], (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res);
      })
    })
  };

  const getUniqueQuestion = (id) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT DISTINCT Question.question_id FROM Rubrics, Question, Rubric_block WHERE Rubrics.id = ? and Rubrics.id = Question.rubric_id and Question.question_id = Rubric_block.question_id;";
      db.query(query, [id], (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res);
      })
    })
  }

  const getAllRubric = () => {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM Rubrics;";
      db.query(query, (err,res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      })
    })
  }



app.listen(3001, ()=>{console.log('server started on port 3001')});
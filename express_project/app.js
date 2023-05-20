const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const util = require("util");
const multer=require('multer')
const multerS3 = require('multer-s3'); // requires specifically v 2.10.0 for compatibility 
const fs = require('fs');
const path = require('path')
const csv = require('csv')
const request = require('request');
const AWS = require('aws-sdk');




AWS.config.update({
  accessKeyId: 'AKIAZHFMAG6LSSEUDBOB',
  secretAccessKey: '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',
  apiVersion: '2006-03-01', 
  signatureVersion: "v3"
});

var s3 = new AWS.S3();
dotenv.config();

const dbService = require("./dbService.js");
const { get } = require("http");
const { parse } = require("path");
const { text } = require("body-parser");
const e = require("express");
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
app.get('/s3download', function(req, res, next){
  try{ 
    url = "https://csvrubricbucket.s3.ap-southeast-2.amazonaws.com/rubrics/"
    fileName = req.query.fn
    console.log(fileName)
    request(url+fileName).pipe(res.set('Content-Type', 'application/csv'))
  } catch{
    next(err);
  }
});

// request a list of all files in the bucket
app.get('/s3list', function(req, res, next){
  try{ 
    var dir = 'rubrics';
    var params = { 
      Bucket: 'csvrubricbucket',
      Prefix: dir
    }
    
    s3.listObjects(params, function (err, data) {
      if(err)throw err;
      console.log(data);
      res.send(data["Contents"].map((data, idx) => (data["Key"].split("/").pop())));
    });
  } catch {
    next(err);
  }

});



// Request the specified file in JSON format
app.get('/s3JSON', function(req, res, next){
  try{ 
    url = "https://csvrubricbucket.s3.ap-southeast-2.amazonaws.com/rubrics/"
    fileName = req.query.fn
    //console.log(fileName)
    var parse = require('csv-parse');
    var parser = parse.parse({columns: true, cast: true, group_columns_by_name: true, info:true}, function (err, records) {
      //console.log(records);
      rows = [...records];
      //console.log(Object.entries(rows)[0][1]["info"]["columns"]);
      //console.log('////////////////////////////////////////////////////')
      let new_rec = [];
      let cols = [];
      records[0]["info"]["columns"].forEach(col => {
        cols.push(col["name"]);
      })
      new_rec.push(cols);
      records.forEach(ele => {
        new_rec.push(ele["record"]);
      })
      //console.log(new_rec);
      //res.send(Object.entries(rows))
      res.send(new_rec);
      //console.log(records);
    });
    request((url+fileName)).on('response', function(response) {
      if (response.statusCode == 200) {
        return response.pipe(parser).on('error', console.error);
        }
        console.log("Error: No data returned! check your filename");
      })
  } catch {
    next(err);
  }
});

// // S3 select query on the specified file 
// app.get('/s3select', function(req, res){
//   url = "https://csvrubricbucket.s3.ap-southeast-2.amazonaws.com/rubrics/"
//   fileName = req.query.fn
//   // query = req.query.q
//   console.log(fileName)
//   // console.log(query)
//   const params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: "rubrics"+fileName,
//     ExpressionType: 'SQL',
// 	  Expression: 'SELECT * FROM S3Object',
//     InputSerialization: {
//       CSV: {
//         FileHeaderInfo: 'USE',
//         RecordDelimiter: '\n',
//         FieldDelimiter: ','
//       }
//     },
//     OutputSerialization: {
//       CSV: {}
//     }
//   };

  

// })


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  }
})

let upload = multer({ storage: storage, 
  dest: 'uploads/', 
})

let uploads3 = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
          console.log(file);
          console.log(file.contentType);

          cb(null, "rubrics/" + file.originalname); 
      }, 
      contentType: function (req, file, cb) {
        file.contentType = "text/csv";
        console.log(file.contentType);
        cb(null, "text/csv"); 
    }
  })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.post('/uploadFileAPI', uploads3.single('file'), (req, res, next) => { // file uploaded to s3 alongside uploads folder
  try{  
  res.send('file'); // uploads incorrect filetype - needs resolving
  } catch{
    next(err);
  }
})


// app.post('/jsonToCsv', async function(request, response) {
//   var jsonList = request.body.testJson;
//   console.log(jsonList);
//   const { parse } = require('json2csv');
//   var filename = request.query.filename;
//   var file = fs.createWriteStream(__dirname+`/${filename}.csv`); 
//   file.on('error', function(err) { console.log(err.message)});
//   //const parser = new Parser({ quote: '' });
//   jsonList.forEach(function(v) { 
//     let rgx = /"/g;
//     file.write(parse(v[1]).replace(rgx, '')); 
//     console.log(parse(v[1]).replace(rgx, ''));
//   });
//   file.end();
// })

app.post('/jsonToCsv', async function(request, response) {
  var additionalJson = request.body.testJson;
  const fields = additionalJson[0];
  var csv = fields.join(",") + "\n";
  for (let i=1; i<additionalJson.length; i++){
    let data = additionalJson[i];
    var order = Array(fields.length).fill(null);
    Object.keys(data).forEach(ele => {
      let index = 0;
      if (Array.isArray(data[ele])) {
        let n = 0;
        data[ele].forEach(value => {
          index = fields.indexOf(ele, n);
          order[index] = value;
          n = index+1;
        })
      } else{
        index = fields.indexOf(ele);
        order[index] = data[ele];
      }
    })
    csv += order.map(function(orderEle) {
      if (typeof orderEle == "string" && orderEle.includes(",")) {
        return '"' + orderEle + '"';
      } else return orderEle;
    }).join(",") + "\n";
    
  }
  console.log(csv);

  var filename = request.query.fieldName;
  var file = fs.createWriteStream(__dirname + `/${filename}.csv`);
  file.on('error', function(err) { console.log(err.message)});
  file.write(csv);
  file.end();
});

// app.post('modifyCsv', async function(req, res) {
//   //var csvCols = Object.keys(req.body.testJson[0]);
//   var csv = "Student,ID,SIS User ID,SIS Login ID,Section,Assignment One (4757),Assignment Two (4766),Assignments Current Score,Assignments Unposted Current Score,Assignments Final Score,Assignments Unposted Final Score,Final Exam Current Score,Final Exam Unposted Current Score,Final Exam Final Score,Final Exam Unposted Final Score,Assignments Current Score,Assignments Unposted Current Score,Assignments Final Score,Assignments Unposted Final Score,Current Score,Unposted Current Score,Final Score,Unposted Final Score,Current Grade,Unposted Current Grade,Final Grade,Unposted Final Grade\n";
//   var testlJson = req.body.testJson;
//   var filename = testlJson['csvFileName'];
//   var assignment = testJson["assignment"];
//   var marks = testJson["marks"]
//   var { StreamParser } = require("json2csv");
//   const parser = new StreamParser(opts, asyncOpts);
//   parser.onData = (chunk) => (csv += chunk.toString());
//   parser.onEnd = () => console.log(csv);
//   parser.onError = (err) => console.error(err);
//   marks.forEach(ele => {
//     parser.parse(ele);
//   })
// });




/*
const jsonToCsv = (json) => {
  var fields = Object.keys(json)
  var replacer = function(key,value) { return value === null ? "" : value }
  var csv = json.map(function(row) {
    return fields.map(function(fieldName){
      return JSON.stringify(row[fieldName], replacer)
    }).join(",")
  })
  csv.unshift(fields.join(","))
  csv = csv.join("\r\n");
  return csv
}
*/


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

app.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});
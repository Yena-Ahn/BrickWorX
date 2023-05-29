/* eslint-disable no-extend-native */
import { cloneDeep } from "lodash"
import React, { useEffect } from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {Button, Table, Form} from 'react-bootstrap'


var rubricABC = {
    "rubricName": "rubric",
    "rubric": [
        {
            "questionName": "Tactics",
						"questionDesc": " dsfakjhbgsdafjhfdskhajbdsfahjkdfsahkjdshfuykijahkjdsfahkj dfsakhjdsfakhjgds afkhjgdsfahjkgadsfhgkjdsfahgkjydsfagh kjydsfaghjkdsfagkjhdsfaghjkd sfagkjhdsafgjhkdfsaghkdfsghj kdsfghjkdsfa",
            "id": 0,
            "criterions": [
                {
                    "body": "No attempt is made to provide tactics. None",
                    "grade": "0",
                    "id": 0
                },
                {
                    "body": "They talk about something they call \"tactics\", but they are not one of the recognised tactics. It may be that they use different tactic names to what was used in classes (e.g. \"load balancer\", \"cache\") but doing so indicates they don't really understand what is meant by tactic. So they are considered not recognised tactics. Unknown",
                    "grade": "1",
                    "id": 1
                },
				{
                    "body": "One of Recognisable tactics are listed but no justification given. Justification. One recognisable tactic is listed and justified but the other one is not recognisable (so only one tactic is discussed but they are meant to discuss two). Insufficient.One of Recognisable tactics are listed but no justification given.One of Recognisable tactics are listed but no justification given.One of Recognisable tactics are listed but no justification given.One of Recognisable tactics are listed but no justification given.One of Recognisable tactics are listed but no justification given.One of Recognisable tactics are listed but no justification given.One of Recognisable tactics are listed but no justification given.",
                    "grade": "2",
                    "id": 2
                }
				,
				{
                    "body": "Two recognisable tactics are provided and the justification is plausible.",
                    "grade": "3",
                    "id": 3
                }
            ],
        },
        {
            "questionName": "submitted",
						"questionDesc": " dsfakjhbgsdafjhfdskhajbdsfahjkdfsahkjdshfuykijahkjdsfahkj dfsakhjdsfakhjgds afkhjgdsfahjkgadsfhgkjdsfahgkjydsfagh kjydsfaghjkdsfagkjhdsfaghjkd sfagkjhdsafgjhkdfsaghkdfsghj kdsfghjkdsfa",
            "id": 1,
            "criterions": [
                {
                    "body": "yes or no",
                    "grade": "1",
                    "id": 0
                }
            ],
        }
    ]
}


const testJson = [["Student","ID","SIS User ID","SIS Login ID","Section","Assignment One (4757)","Assignment Two (4766)","Assignments Current Score","Assignments Unposted Current Score","Assignments Final Score","Assignments Unposted Final Score","Final Exam Current Score","Final Exam Unposted Current Score","Final Exam Final Score","Final Exam Unposted Final Score","Assignments Current Score","Assignments Unposted Current Score","Assignments Final Score","Assignments Unposted Final Score","Current Score","Unposted Current Score","Final Score","Unposted Final Score","Current Grade","Unposted Current Grade","Final Grade","Unposted Final Grade"],
{"Student":"    Points Possible","ID":"","SIS User ID":"","SIS Login ID":"","Section":"","Assignment One (4757)":100,"Assignment Two (4766)":100,"Assignments Current Score":["(read only)","(read only)"],"Assignments Unposted Current Score":["(read only)","(read only)"],"Assignments Final Score":["(read only)","(read only)"],"Assignments Unposted Final Score":["(read only)","(read only)"],"Final Exam Current Score":"(read only)","Final Exam Unposted Current Score":"(read only)","Final Exam Final Score":"(read only)","Final Exam Unposted Final Score":"(read only)","Current Score":"(read only)","Unposted Current Score":"(read only)","Final Score":"(read only)","Unposted Final Score":"(read only)","Current Grade":"(read only)","Unposted Current Grade":"(read only)","Final Grade":"(read only)","Unposted Final Grade":"(read only)"},
{"Student":"student, Test","ID":83299,"SIS User ID":"tstu999","SIS Login ID":10000000,"Section":"Programming for dummies","Assignment One (4757)":60,"Assignment Two (4766)":70,"Assignments Current Score":["",""],"Assignments Unposted Current Score":["",""],"Assignments Final Score":["",""],"Assignments Unposted Final Score":["",""],"Final Exam Current Score":"","Final Exam Unposted Current Score":"","Final Exam Final Score":"","Final Exam Unposted Final Score":"","Current Score":65,"Unposted Current Score":"","Final Score":65,"Unposted Final Score":"","Current Grade":"B-","Unposted Current Grade":"","Final Grade":"B-","Unposted Final Grade":""},
{"Student":"student, Test","ID":7932548,"SIS User ID":"pota999","SIS Login ID":10000000,"Section":"Programming for dummies","Assignment One (4757)":20,"Assignment Two (4766)":20,"Assignments Current Score":["",""],"Assignments Unposted Current Score":["",""],"Assignments Final Score":["",""],"Assignments Unposted Final Score":["",""],"Final Exam Current Score":"","Final Exam Unposted Current Score":"","Final Exam Final Score":"","Final Exam Unposted Final Score":"","Current Score":65,"Unposted Current Score":"","Final Score":65,"Unposted Final Score":"","Current Grade":"B-","Unposted Current Grade":"","Final Grade":"B-","Unposted Final Grade":""}];

const MarkingComp = ({setdefualtassignment}) => {
	//just usefull to have
	function addAfter(array, index, newItem) {
    return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index)
    ]
	}

	


	const [rubric, setRubricData] = React.useState(setdefualtassignment[2].rubric?setdefualtassignment[2].rubric:rubricABC.rubric)
  const [grades, setGrades] = React.useState(setdefualtassignment[2].rubric?setdefualtassignment[2].rubric.map((item,index)=>{return ''}):rubricABC.rubric.map((item,index)=>{return ''}))
	const [rubricName, setRubricName] = React.useState(setdefualtassignment[2].rubricName?setdefualtassignment[2].rubricName:rubricABC.rubricName)
	const [assignmentList, setlist] = React.useState(null)
	const [assignment, setAssignment] = React.useState('select an assignment')
	const [students, setStudents] = React.useState([])
	const [currentStudent, setCurrentStudent] = React.useState('select a student')
	const [currentStudentIndex, setCurrentStudentIndex] = React.useState(0)
	const [tempStudent, setTempStudent] = React.useState('select a student')
	const [tempIndex, setTempIndex] = React.useState(0)
	//what not to reset on next student array of grade indexes
	const [DefaultGrades, setDefaultGrades] = React.useState([])

	React.useEffect(() => {
		axios.get('/s3JSON?fn=CanvasExportExample.csv').then((response) => {
		  setlist(response.data[0]);
		});
	}, []);

	React.useEffect(() => {
		//hard coded temperarily
		axios.get('/s3JSON?fn=CanvasExportExample.csv').then((response) => {
			//console.log(response.data)
		  setStudents(response.data);
		});
	}, []);


	let customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
	};



	//needs to be changed
	// const axios_post = ()=>{
	// 	axios.post("/submit", {rubricName, rubric}, customConfig).then(response => {
	// 		console.log(response);
	// 	}).catch(error => {
	// 		console.log("this is error", error);
	// 	});
	// }
	const updateStudentGrade = () => {
		//console.log('TESTSTUDENT UPDATE')
		//console.log(students)
		//let apples=students.filter(item=>item[1]['SIS User ID']===currentStudent)
		if(currentStudentIndex>0&&assignment){
			let shallowCopy=[...students]
			//console.log(shallowCopy[currentStudentIndex][1][assignment])
			let grades_arr_int = grades.map(function(str) {return parseInt(str); });
			//console.log('int ARR')
			//console.log(grades_arr_int)
			let sum_grade=grades_arr_int.reduce((partialSum, a) => partialSum + a, 0)
			if(sum_grade<0){sum_grade=0}
			//let grade_percentage=(sum_grade/rubricGradeMax)*100
			//console.log(sum_grade)
			shallowCopy[currentStudentIndex][assignment]=100*sum_grade/rubricGradeMax();
			//console.log(shallowCopy)
			setStudents(shallowCopy)
		}else{
			//make pop up later
			//console.log('ERROR please select assignment and student')
		}
		//console.log(students[1][1])
	}

	const testpost = ()=>{
		updateStudentGrade()
		axios.post("http://localhost:3001/jsonToCsv",  {students}, customConfig).then(response => {
			console.log(response);
		}).catch(error => {
			console.log("this is error", error);
		});
		//other test code unrelated
		let test_thing = rubricABC.rubric.map((item,index)=>{
			return []
		})
		//console.log("total questions TEST")
		//console.log(rubricABC.rubric.length)
		//console.log(test_thing)
		//console.log(grades)
		//console.log("_________________")
	}

	const nextStudent = ()=>{
		if(students[currentStudentIndex+1]){
			setCurrentStudent(students[currentStudentIndex+1]['SIS User ID'])
			setCurrentStudentIndex(currentStudentIndex+1)
		}
	}



	const chngAssignDropdown = (e) => {
		setAssignment(e.target.value)
	}

	const chngStudentDropdown = (e) => {
		let student_info = e.target.value.split(',')
		setTempStudent(student_info[0])
		setTempIndex(parseInt(student_info[1]))

	}

	const handleSubmit= (event)=>{
		event.preventDefault();
		console.log('submitting')
		console.log(event)
		setdefualtassignment[0](assignment)
	}

	const handleSubmitStudent= (event)=>{
		event.preventDefault();
		console.log('submitting')
		console.log(event)
		setCurrentStudent(tempStudent)
		setCurrentStudentIndex(tempIndex)
		console.log("CHOSEN STUDENT")
		console.log(tempStudent)
	}

	const handleQuestionData = (
		id,
		event,
	) => {
		const index = rubric.findIndex((question) => question.id === id)
		let updatedgrade = [...grades]
		updatedgrade[index]= event.target.value
		console.log('TEST GRADES STORED')
		console.log(updatedgrade)
		setGrades(updatedgrade)
	}

	const rubricGradeMax = ()=>{
		return rubric.map((question,index) => {return question.criterions.slice(-1)[0].grade}).map(function(str) {return parseInt(str); }).reduce((partialSum, a) => partialSum + a, 0)
	}
	const gradeClick = (indexCrit,indexQuest)=>{
		let mark = rubric[indexQuest].criterions[indexCrit].grade
		let grades_shallow=[...grades]
		//console.log("MARK")
		//console.log(mark)

		if(grades_shallow[indexQuest]!==mark){
			grades_shallow[indexQuest]=mark
		}else{
			grades_shallow[indexQuest]=''
		}

		setGrades(grades_shallow)
	}

	const gradeZero = (indexQuest)=>{
		let mark = 0
		let grades_shallow=[...grades]
		//console.log("MARK")
		//console.log(mark)
		grades_shallow[indexQuest]=mark
		setGrades(grades_shallow)
	}





	return (
		
    <div>
		{console.log(students)}
		{/* {JSON.stringify(assignmentList)} */}
		<Form onSubmit={handleSubmit} className="assignment-select">
			<Form.Select style={{whiteSpace:"pre-line", width:"250px"}} onChange={chngAssignDropdown}> 
			<option value="⬇️ Select Assignment ⬇️"> -- Select Assignment -- </option>
			{assignmentList?assignmentList.map((item) => <option key={uuidv4()} value={item}>{item}</option>):'loading'}
			</Form.Select>
			<Button type="submit">OK</Button>
		</Form>
		<Form onSubmit={handleSubmitStudent} className="student-select">
			<Form.Select style={{whiteSpace:"pre-line", width:"250px"}} onChange={chngStudentDropdown} > 
			<option value={"⬇️ Select student ⬇️"}> -- Select student -- </option>
			{/* //maybe include array index somehow */}


			{students?students.map((item,index) => <option key={index} value={[item['SIS User ID'],index]}>{item['SIS User ID']}</option>):'loading'}
			
			

			</Form.Select>
			{/* {students.map((item,index) => {return <p>a{console.log(item['SIS User ID'])}</p>})} */}

			<Button type="submit">OK</Button>
		</Form>
		    <span style={{whiteSpace:"pre-line"}}><h1>Student ID: {currentStudent}, {currentStudentIndex}</h1></span>
		    <span style={{whiteSpace:"pre-line"}}><h1>Rubric name: {rubricName}</h1></span>
			
			<div className="row-section">
				{rubric.map((question,index) => (
					<div className="row-section__inner shadow" style={grades[index]===0||grades[index]?{backgroundColor:'#d4edb9'}:{backgroundColor:'#F2F2F2'}} key={question.id}>
						<h2>Question {index+1}: {question.questionName}</h2>
						<h3>description: {question.questionDesc}</h3>
						{grades[index]===0||grades[index] ? <h1 style={{color:'green'}}>Marked</h1> : <h1 style={{color:'red'}}>Yet to Mark</h1>}
						

						<div className="input-group">
						<Table bordered className="rubricTable">
								<thead className="rubricHead">
									<tr>
										<th><strong>Mark</strong></th>
										<th className="criteriaWidth"><strong>Criteria</strong></th>
										
									</tr>
								</thead>
								<tbody>
								</tbody>
							</Table>
							
							{question.criterions.map((criterion,indexC) => (
								<div className="form-row-marking" 
									style={(parseInt(grades[index])>=parseInt(criterion.grade)&&grades[index]!=='')?{backgroundColor:'#90ee90', borderColor:"#77d177"}:{backgroundColor:'#e9ecef'}} 
									onClick={() => gradeClick(indexC,index)} key={criterion.id}>
									{console.log(criterion.grade)}
									{console.log(grades[index]>=criterion.grade&&grades[index]!=='')}
									{/*grades q index:{grades[index]}, greater or equal to grade crit:{criterion.grade}*/}
									{/* grade doesn not equal nothing:{valueOf(grades[index]!=='')} */}
										<div className='markBoxStyle2'>{criterion.grade}</div>
										<div className="box2">{criterion.body}</div>
		
								</div>
							))}
							
                
							
						</div>
						<div className="rubricItem">
								<h2>Total Marks:{"\n"}</h2>
								<input style={{textAlign:"center", fontSize:"25px"}} key={index+10} value={grades[index]} max={question.criterions.slice(-1)[0].grade} min={0} type="number" onChange={(e) => handleQuestionData(question.id, e)}></input>
								<h1>/{question.criterions.slice(-1)[0].grade}</h1>
								
						</div>
						<Button className='btn btn-danger' size="lg" onClick={() => gradeZero(index)}>Set Marks to 0</Button>
						<Button className='btn btn-warning' size="lg" onClick={() => gradeZero(index)}>Set Mark as Default</Button>

					</div>
				))}
				<h1>Total Grade={grades.map(function(str) {if(str){return parseInt(str)}else{return 0} }).reduce((partialSum, a) => partialSum + a, 0)}/
				{rubricGradeMax()}
				</h1>
				<Button className='fixedbtn' size="lg" variant='success' onClick={testpost} style={{zIndex:'2'}}>
					<strong>Submit Grade</strong>
				</Button>
				<Button className='fixedbtn' size="lg" variant='success' onClick={nextStudent} style={{zIndex:'2', right:20, width:200,bottom:100}}>
					<strong>NEXT STUDENT</strong>
				</Button>
			</div>
		</div>
	)
}
export default MarkingComp
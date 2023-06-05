/* eslint-disable no-extend-native */
import { cloneDeep } from "lodash"
import React, { useEffect, Component, useState } from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {Button, Table, Form, Modal} from 'react-bootstrap'
import SubmitModal from './submitmodal.js';

var rubricABC = {
	"rubricName": "rubric",
	"rubric": [
			{
					"questionName": "Architecture Description",
					"questionDesc": "Each category is indicative. You can adjust up or down as needed but provide feedback in this case.",
					"id": 0,
					"criterions": [
							{
									"body": "No description of architecture (this seems unlikely but is provided for completeness). None",
									"grade": "0",
									"id": 0
							},
							{
									"body": "There is at an attempt at one structure description, even if it is poorly done. Poor",
									"grade": "1",
									"id": 1
							},
			{
									"body": "At least one of Module, Concurrency, or Deployment structure descriptions are missing, and some of the descriptions have problems (inadequate legends, missing details, significantly incorrect details). Service can be substituted for Concurrency. Incomplete and poor, incorrect (1 or more as applicable)",
									"grade": "3",
									"id": 2
							}
			,
			{
									"body": 
									`One of the following applies:
At least one of Module, Concurrency, or Deployment structure descriptions are missing (but see Functionality note below), but the descriptions provided are adequate. Service can be substituted for Concurrency.
Incomplete
									
All of Module, Concurrency/Service, or Deployment structure descriptions are provided, but more than one of the descriptions have problems (inadequate or wrong legends, missing details).
Poor, Legends, Details (1 or more as applicable)
									
There is no indication of where the functionality is provided. As discussed above if they have adequately described the functionality somewhere else, then they only need Deployment. This is for when they have not done so.
Functionality
									
Notes:
See also below if the submission has in addition Service or Decomposition descriptions.`,
									"grade": "5",
									"id": 3
							},
				{
									"body": `One of the following applies

All of Module, Concurrency, or Deployment structure descriptions are provided, but at most one of the descriptions have problems (inadequate legends, missing details).
Poor, Legends, Details (1 or more as applicable)

Does not meet the above requirements but does include in addition Decomposition and/or Service.
Poor, Legends, Details (1 or more as applicable)

If the submission does meet the above requirements and also includes at least one of Decomposition and Service then consider adding a mark.`,
									"grade": "7",
									"id": 4
							},
				{
								"body": "It is not clear whether or not there is physical separation (different geographic locations) of the servers. Location",
								"grade": "9",
								"id": 5
							},
							{
								"body": "All of the expected structures are reasonably well described. Service cannot be substituted for concurrency. Definitely do not give this mark if there are problems with missing legends or other issues with the description no matter how well everything else is done.",
								"grade": "10",
								"id": 6
							},

					],
			},
			{
					"questionName": "Tactics",
					"questionDesc": `They are meant to discuss at least two tactics. The tactics they discuss are supposed to be not associated with the pattern they chose.

As they are meant to be focussing on performance, they should be talking about performance tactics, namely (the bold ones are the easiest to justify):
					
increase computational efficiency
reduce computational overhead
manage event rate
control frequency of sampling
bound execution times
bound queue sizes
introduce concurrency
maintain multiple copies of either data or computations
increase available resources
first-in/first-out
fixed-priority (semantic importance, deadline importance, rate monotonic)
dynamic priority (round robin, earliest deadline first)
cyclic executive (static)
However they may want to discuss other tactics even though they may not be directly useful for performance. A full list is given at the end.`,
					"id": 1,
					"criterions": [
							{
									"body": "No attempt is made to provide tactics. None",
									"grade": "0",
									"id": 0
							},
							{
								"body": `They talk about something they call "tactics", but they are not one of the recognised tactics. It may be that they use different tactic names to what was used in classes (e.g. "load balancer", "cache") but doing so indicates they don't really understand what is meant by tactic. So they are considered not recognised tactics. Unknown`,
								"grade": "1",
								"id": 1
						},
						{
							"body": `One of Recognisable tactics are listed but no justification given. Justification One recognisable tactic is listed and justified but the other one is not recognisable (so only one tactic is discussed but they are meant to discuss two). Insufficient`,
							"grade": "2",
							"id": 2
						},
						{
							"body": `Two recognisable tactics are provided and the justification is plausible.`,
							"grade": "3",
							"id": 3
					},
					],
			},
			{
				"questionName": "Overall",
				"questionType": "BONUS",
				"questionDesc": `Use this to adjust the mark that comes from the components (under Raw column in spreadsheet). For example, if you feel the result is a little harsh than you can adjust up or if you feel there are problems with the submission not covered by the guide (e.g., poor grammar, spelling errors, general carelessness) you can adjust down. The adjustments can be up to 2 marks up or down. I hope that this will not be used much. Let me know if you find there is a common pattern to why you need to adjust the mark.
I can't predict what might apply here so have no suggested phrases.`,
				"id": 3,
				"criterions": [
				{
					"body": "Significant problems with the submission not covered by the marking guide. An example is I have noticed that some have included copies of figures from my lecture slides. If they do not credit these slides then this is questionable academic integrity.",
					"grade": "-2",
					"id": 0
				},
				{
					"body": `Problems with the submission not covered by the marking guide so that the Raw mark is too generous.
An example is if they frequently use the terminology incorrectly (or don't use it at all). An example I've noticed is referring to a "Component-and-connector structure" or "Allocation structure". These are both categories of structures.`,
					"grade": "-1",
					"id": 1
				},
				{
					"body": `The Raw mark is lower than what the submission deserves.`,
					"grade": "1",
					"id": 2
				},
				{
					"body": `The Raw mark is much lower than what the submission deserves.`,
					"grade": "2",
					"id": 3
				},
				]}
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
	const [feedback, setFeedback] = React.useState(setdefualtassignment[2].rubric?setdefualtassignment[2].rubric.map((item,index)=>{return ''}):rubricABC.rubric.map((item,index)=>{return ''}))

	const [rubricName, setRubricName] = React.useState(setdefualtassignment[2].rubricName?setdefualtassignment[2].rubricName:rubricABC.rubricName)
	const [assignmentList, setlist] = React.useState(null)
	const [assignment, setAssignment] = React.useState('select an assignment')
	const [students, setStudents] = React.useState([])
	const [currentStudent, setCurrentStudent] = React.useState('select a student')
	const [currentStudentIndex, setCurrentStudentIndex] = React.useState(0)
	const [tempStudent, setTempStudent] = React.useState('select a student')
	const [tempIndex, setTempIndex] = React.useState(0)
	
	//modal const
	const [showModal, setShowModal] = React.useState(false);
	const closeSubmitGradeModal = () => setShowModal(false);
	const showSubmitGradeModal = () => setShowModal(true);
	//what not to reset on next student array of grade indexes
	const [DefaultGrades, setDefaultGrades] = React.useState(setdefualtassignment[2].rubric?setdefualtassignment[2].rubric.map((item,index)=>{return ''}):rubricABC.rubric.map((item,index)=>{return ''}))
	const [DefaultFeedback, setDefaultFeedback] = React.useState(setdefualtassignment[2].rubric?setdefualtassignment[2].rubric.map((item,index)=>{return ''}):rubricABC.rubric.map((item,index)=>{return ''}))


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

	const setInputHeight =(element, defaultHeight) => {
		const target = element.target ? element.target : element;
		target.style.height = defaultHeight;
		target.style.height = `${target.scrollHeight}px`;
	}

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
		let grades_feedback = {student:currentStudent,assignment:assignment,grades:grades, feedback:feedback}



		axios.post("http://localhost:3001/jsonToCsv",  {students, grades_feedback}, customConfig).then(response => {
			console.log(response);
		}).catch(error => {
			console.log("this is error", error);
		});

	}

	const nextStudent = ()=>{
		if(students[currentStudentIndex+1]){
			setCurrentStudent(students[currentStudentIndex+1]['SIS User ID'])
			setCurrentStudentIndex(currentStudentIndex+1)
		}
		setFeedback(DefaultFeedback)
		setGrades(DefaultGrades)
	}
	const prevStudent = ()=>{
		if(students[currentStudentIndex-1]){
			setCurrentStudent(students[currentStudentIndex-1]['SIS User ID'])
			setCurrentStudentIndex(currentStudentIndex-1)
		}
		setFeedback(DefaultFeedback)
		setGrades(DefaultGrades)
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

	const handleFeedbackData = (
		id,
		event,
	) => {
		const index = rubric.findIndex((question) => question.id === id)
		let updatedfeedback = [...feedback]
		updatedfeedback[index]= event.target.value
		console.log('TEST feedback STORED')
		console.log(updatedfeedback)
		setFeedback(updatedfeedback)
	}

	const rubricGradeMax = ()=>{
		return rubric.map((question,index) => {if(question.questionType&&question.questionType==="BONUS"){return 0} else {return question.criterions.slice(-1)[0].grade}}).map(function(str){return parseInt(str); }).reduce((partialSum, a) => partialSum + a, 0)
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

	const setDefaultMark = (index)=>{
		let arr=DefaultGrades
		arr[index]=grades[index]
		setDefaultGrades(arr)
		console.log('default mark:')
		console.log(DefaultGrades)
	}

	const setDefaultComments = (index)=>{
		let arr=DefaultFeedback
		arr[index]=feedback[index]
		setDefaultFeedback(arr)
		console.log('default feedback:')
		console.log(DefaultFeedback)
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
			
			<div className="row-section-marking">
				{rubric.map((question,index) => (
				<div key={(index+1)*42} className="oneQuestion">

					<div className="row-section__inner-marking shadow marking-rubric" style={grades[index]===0||grades[index]?{backgroundColor:'#d4edb9'}:{backgroundColor:'#F2F2F2'}} key={question.id}>
						<h2>Question {index+1}: {question.questionName}</h2>
						<h4>Question Description: </h4> 
						<div className="questionDescStyle2" 
							style={(grades[index]===0||grades[index]) ? {backgroundColor:'#90ee90', borderColor:"#77d177"}:{backgroundColor:'#e9ecef'}} >{question.questionDesc}</div>
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
									style={((parseInt(grades[index])>=0&&(parseInt(grades[index])>=parseInt(criterion.grade)))&& grades[index]!=='')?{backgroundColor:'#90ee90', borderColor:"#77d177"}:(parseInt(grades[index])<0&&(parseInt(grades[index])<=parseInt(criterion.grade)&&parseInt(criterion.grade)<0))?{backgroundColor:'#90ee90', borderColor:"#77d177"}:{backgroundColor:'#e9ecef'}} 
									onClick={() => gradeClick(indexC,index)} key={criterion.id}>
									{console.log(criterion.grade)}
									{console.log(grades[index]>=criterion.grade&&grades[index]!=='')}
									{/*grades q index:{grades[index]}, greater or equal to grade crit:{criterion.grade}*/}
									{/* grade doesn not equal nothing:{valueOf(grades[index]!=='')} */}
										<div className='markBoxStyle2'>{criterion.grade}</div>
										<div
											className="box2"
											
											
											style={{whiteSpace:"pre-wrap"}}>{criterion.body}</div>
		
								</div>
							))}
							
                
							
						</div>
						<div className="rubricItem">
								<h2>Total Marks:{"\n"}</h2>
								<input style={{textAlign:"center", fontSize:"25px"}} key={index+10} value={grades[index]||''} max={question.criterions.slice(-1)[0].grade} min={0} type="number" onChange={(e) => handleQuestionData(question.id, e)}></input>
								<h1>/{question.criterions.slice(-1)[0].grade}</h1>
								
						</div>
						<Button className='btn btn-danger' size="lg" onClick={() => gradeZero(index)}>Set Marks to 0</Button>
						<Button className='btn btn-warning' size="lg" onClick={() => setDefaultMark(index)}>Set as Default Mark</Button>
						
					</div>
					{/* issues deal with later */}
					<div className="row-section__inner-marking shadow feedback_border" key={(index+1)*69}>
						<h4>Feedback for Student</h4>
						<textarea className="feedback_box" rows="15" value={feedback[index]||''}  key={(index+1)*420} onChange={(e) => handleFeedbackData(question.id, e)} onInput={(e) => setInputHeight(e, "385px")}/>
						<Button className='btn-warning' onClick={() => setDefaultComments(index)}>Set as Default Feedback</Button>
					</div>
					</div>
					
				))}
				<h1 style={{textAlign:"center"}}>Total Grade={grades.map(function(str) {if(str){return parseInt(str)}else{return 0} }).reduce((partialSum, a) => partialSum + a, 0)<0?0:grades.map(function(str) {if(str){return parseInt(str)}else{return 0} }).reduce((partialSum, a) => partialSum + a, 0)}/
				{rubricGradeMax()}
				</h1>
				<div className="bottomBtns">
				<Button className='fixedbtn' size="lg" variant='success' onClick={testpost} style={{zIndex:'2'}}>
					<strong>Submit Grade</strong>
				</Button>
				<Button className='fixedbtn' size="lg" variant='success' onClick={prevStudent} style={{zIndex:'2', right:0, width:200,bottom:150}}>PREV STUDENT
				</Button>
				<Button className='fixedbtn' size="lg" variant='success' onClick={nextStudent} style={{zIndex:'2', right:0, width:200,bottom:100}}>
					<strong>NEXT STUDENT</strong>
				</Button>
			</div>
			
			<SubmitModal isOpen={showModal} closeModal={closeSubmitGradeModal}/>
		</div>
	</div>
	)
}
export default MarkingComp
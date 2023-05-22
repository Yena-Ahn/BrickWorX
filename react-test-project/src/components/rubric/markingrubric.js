/* eslint-disable no-extend-native */
import { cloneDeep } from "lodash"
import React, { useEffect } from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



// var rubricABC = {
//     "rubricName": "rubric",
//     "rubric": [
//         {
//             "questionName": "abc",
//             "id": 0,
//             "criterions": [
//                 {
//                     "body": "apples were fresh",
//                     "grade": "2",
//                     "id": 0
//                 },
//                 {
//                     "body": "apples were apples",
//                     "grade": "5",
//                     "id": 1
//                 }
//             ],
//         },
//         {
//             "questionName": "submitted",
//             "id": 1,
//             "criterions": [
//                 {
//                     "body": "yes or no",
//                     "grade": "1",
//                     "id": 0
//                 }
//             ],
//         }
//     ]
// }
var rubricABC = 
{
	"rubricName": "rubric",
	"rubric":
		[{
			questionName: '',
			id: 0,
			criterions: [
				{ body: '', grade: '-2', id: 0 },
				{ body: '', grade: '-1', id: 1 },
				{ body: '', grade: 0, id: 2 },
				{ body: '', grade: '1', id: 3 }
			]
		}]
	}


const testJson=[["0",{"Student":"    Points Possible","ID":"","SIS User ID":"","SIS Login ID":"","Section":"","Assignment One (4757)":"100","Assignment Two (4766)":"100","Assignments Current Score":"(read only)","Assignments Unposted Current Score":"(read only)","Assignments Final Score":"(read only)","Assignments Unposted Final Score":"(read only)","Final Exam Current Score":"(read only)","Final Exam Unposted Current Score":"(read only)","Final Exam Final Score":"(read only)","Final Exam Unposted Final Score":"(read only)","Current Score":"(read only)","Unposted Current Score":"(read only)","Final Score":"(read only)","Unposted Final Score":"(read only)","Current Grade":"(read only)","Unposted Current Grade":"(read only)","Final Grade":"(read only)","Unposted Final Grade":"(read only)"}],["1",{"Student":"student, Test","ID":"83299","SIS User ID":"tstu999","SIS Login ID":"10000000","Section":"Programming for dummies","Assignment One (4757)":"60","Assignment Two (4766)":"70","Assignments Current Score":"","Assignments Unposted Current Score":"","Assignments Final Score":"","Assignments Unposted Final Score":"","Final Exam Current Score":"","Final Exam Unposted Current Score":"","Final Exam Final Score":"","Final Exam Unposted Final Score":"","Current Score":"65","Unposted Current Score":"","Final Score":"65","Unposted Final Score":"","Current Grade":"B-","Unposted Current Grade":"","Final Grade":"B-","Unposted Final Grade":""}],["2",{"Student":"student, Test","ID":"7932548","SIS User ID":"tstu999","SIS Login ID":"10000000","Section":"Programming for dummies","Assignment One (4757)":"60","Assignment Two (4766)":"70","Assignments Current Score":"","Assignments Unposted Current Score":"","Assignments Final Score":"","Assignments Unposted Final Score":"","Final Exam Current Score":"","Final Exam Unposted Current Score":"","Final Exam Final Score":"","Final Exam Unposted Final Score":"","Current Score":"65","Unposted Current Score":"","Final Score":"65","Unposted Final Score":"","Current Grade":"B-","Unposted Current Grade":"","Final Grade":"B-","Unposted Final Grade":""}]]

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

	React.useEffect(() => {
		axios.get('/csvcolumns').then((response) => {
		  setlist(response.data);
		});
	}, []);

	React.useEffect(() => {
		//hard coded temperarily
		axios.get('/s3JSON?fn=CanvasExportExample.csv').then((response) => {
			//console.log(response.data)
		  setStudents(response.data);
		});
	}, []);

    const sumGrade = (questionID)=>{
        let sum = 0;
        //stubb
        return sum;
    }

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
		console.log('TESTSTUDENT UPDATE')
		console.log(students)
		//let apples=students.filter(item=>item[1]['SIS User ID']===currentStudent)
		if(currentStudentIndex>0&&assignment){
			let shallowCopy=[...students]
			console.log(shallowCopy[currentStudentIndex][1][assignment])
			let grades_arr_int = grades.map(function(str) {return parseInt(str); });
			console.log('int ARR')
			console.log(grades_arr_int)
			let sum_grade=grades_arr_int.reduce((partialSum, a) => partialSum + a, 0)
			console.log(sum_grade)
			shallowCopy[currentStudentIndex][1][assignment]=sum_grade.toString();
			console.log(shallowCopy)
			setStudents(shallowCopy)
		}else{
			//make pop up later
			console.log('ERROR please select assignment and student')
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
		console.log("total questions TEST")
		console.log(rubricABC.rubric.length)
		console.log(test_thing)
		console.log(grades)
		console.log("_________________")
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
		console.log("MARK")
		console.log(mark)

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
		console.log("MARK")
		console.log(mark)
		grades_shallow[indexQuest]=mark
		setGrades(grades_shallow)
	}





	return (
    <div>
		{/* {JSON.stringify(assignmentList)} */}
		<form onSubmit={handleSubmit}>
			<select style={{whiteSpace:"pre-line"}} onChange={chngAssignDropdown}> 
			<option value="⬇️ Select Assignment ⬇️"> -- Select Assignment -- </option>
			{assignmentList?assignmentList.map((item) => <option key={item} value={item}>{item}</option>):'loading'}
			</select>
			<button className="btn" type="submit">Submit</button>
		</form>
		<form onSubmit={handleSubmitStudent}>
			<select style={{whiteSpace:"pre-line"}} onChange={chngStudentDropdown}> 
			<option value="⬇️ Select student ⬇️"> -- Select student -- </option>
			{/* //maybe include array index somehow */}
			{students?students.map((item,index) => <option key={index} value={[item[1]['SIS User ID'],index]}>{item[1]['SIS User ID']}</option>):'loading'}
			
			
			{/* {students?students.map((item,index) => {console.log('ugh');console.log(item[1].ID)} ):'TEST'} */}

			</select>
			<button className="btn" type="submit">Submit</button>
		</form>
		<span style={{whiteSpace:"pre-line"}}>{<h2>{' '}</h2>}</span>
		    <span style={{whiteSpace:"pre-line"}}><h1>student ID: </h1></span>
			<span style={{whiteSpace:"pre-line"}}>{<h2>{currentStudent}, {currentStudentIndex}</h2>}</span>
			<span style={{whiteSpace:"pre-line"}}>{<h2>{' '}</h2>}</span>
		    <span style={{whiteSpace:"pre-line"}}><h1>rubric name: </h1></span>
			<span style={{whiteSpace:"pre-line"}}>{<h2>{rubricName}</h2>}</span>
			<div className="row-section">
				{rubric.map((question,index) => (
					<div className="row-section__inner" style={grades[index]===0||grades[index]?{backgroundColor:'#90EE90'}:{backgroundColor:'white'}} key={question.id}>
						<h2>question {index+1}</h2>
						{grades[index]===0||grades[index]?<h1 style={{color:'green'}}>MARKED</h1>:<h2 style={{color:'red'}}>NOT MARKED</h2>}
						<p>&nbsp;</p>

						<div className="input-group">
							<label htmlFor="Question">Question:</label>
							<h1>{question.questionName}</h1>
							<h3>criterions</h3>
							{question.criterions.map((criterion,indexC) => (
								<div className="btn btn-outline-success" style={(grades[index]>=criterion.grade&&grades[index]!=='')?{backgroundColor:'black'}:{backgroundColor:'white'}} onClick={() => gradeClick(indexC,index)} key={criterion.id}>
									<hr style={{"margin":15}}></hr>
									Grading criteria
									<div className="input-group">
										<div className="box2">{criterion.body}</div>
									</div>
									<div className="rubricItem">
										<h2>marks:</h2>
										<h1>{criterion.grade}</h1>
									</div>

									<hr style={{"margin":15}}></hr>	

								</div>
							))}
                <div className="rubricItem">
								<h2>Marks:{"\n"}</h2>
								<input key={index+10} value={grades[index]} max={question.criterions.slice(-1)[0].grade} min={0} type="number" onChange={(e) => handleQuestionData(question.id, e)}></input>
								<h1>/{question.criterions.slice(-1)[0].grade}</h1>
								
							</div>
							
						</div>
						
						<button className='btn btn-danger' onClick={() => gradeZero(index)}>set mark to zero</button>

					</div>
				))}
				<h1>Total grade={grades.map(function(str) {if(str){return parseInt(str)}else{return 0} }).reduce((partialSum, a) => partialSum + a, 0)}/
				{rubricGradeMax()}
				</h1>
				<button className="btn" onClick={testpost}>
					Submit rubric data
				</button>
			</div>
		</div>
	)
}

export default MarkingComp
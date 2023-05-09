/* eslint-disable no-extend-native */
import { cloneDeep } from "lodash"
import React, { useEffect } from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



var rubricABC = {
    "rubricName": "rubric",
    "rubric": [
        {
            "questionName": "abc",
            "id": 0,
            "criterions": [
                {
                    "body": "apples were fresh",
                    "grade": "2",
                    "id": 0
                },
                {
                    "body": "apples were apples",
                    "grade": "5",
                    "id": 1
                }
            ],
        },
        {
            "questionName": "submitted",
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
  const [grades, setGrades] = React.useState(setdefualtassignment[2].rubric?setdefualtassignment[2].rubric.map((item,index)=>{return [0]}):rubricABC.rubric.map((item,index)=>{return [0]}))
	const [rubricName, setRubricName] = React.useState(setdefualtassignment[2].rubricName?setdefualtassignment[2].rubricName:rubricABC.rubricName)
	const [assignmentList, setlist] = React.useState(null)
	const [assignment, setAssignment] = React.useState('select an assignment')
	const [students, setStudents] = React.useState([])
	const [currentStudent, setCurrentStudent] = React.useState('select a student')
	const [tempStudent, setTempStudent] = React.useState('select a student')

	React.useEffect(() => {
		axios.get('/csvcolumns').then((response) => {
		  setlist(response.data);
		});
	}, []);

	React.useEffect(() => {
		axios.get('/csvStudents').then((response) => {
		  setStudents(response.data);
		});
	}, []);

    const sumGrade = (questionID)=>{
        let sum = 0;
        rubric[questionID].criterions.forEach((criteria)=>{
            sum += parseInt(criteria.grade)
        })
        return sum;
    }

	let customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
	};


	const axios_post = ()=>{
		axios.post("/submit", {rubricName, rubric}, customConfig).then(response => {
			console.log(response);
		}).catch(error => {
			console.log("this is error", error);
		});
	}

	const testpost = ()=>{
		axios.post("http://localhost:3001/jsonToCsv",  {testJson}, customConfig).then(response => {
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
	}



	
	const handleCriteriaInQuestionData = (
		questionID,
		criteriaID,
		event,
	) => {
		const questionIndex = rubric.findIndex((question) => question.id === questionID)
		let _questionMembers = [...rubric]
		const memberIndex = rubric[questionIndex].criterions.findIndex(
			(m) => m.id === criteriaID,
		)
		_questionMembers[questionIndex].criterions[memberIndex][event.target.name] =
			event.target.value
		setRubricData(_questionMembers)
	}


	const chngAssignDropdown = (e) => {
		setAssignment(e.target.value)
	}

	const chngStudentDropdown = (e) => {
		setTempStudent(e.target.value)
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



	return (
    <div>
		{/* {JSON.stringify(assignmentList)} */}
		<form onSubmit={handleSubmit}>
			<select style={{whiteSpace:"pre-line"}} onChange={chngAssignDropdown}> 
			<option value="⬇️ Select Assignment ⬇️"> -- Select Assignment -- </option>
			{assignmentList?assignmentList.map((item) => <option value={item}>{item}</option>):'loading'}
			</select>
			<button className="btn" type="submit">Submit</button>
		</form>
		<form onSubmit={handleSubmitStudent}>
			<select style={{whiteSpace:"pre-line"}} onChange={chngStudentDropdown}> 
			<option value="⬇️ Select student ⬇️"> -- Select student -- </option>
			{students?students.map((item) => <option value={item.ID}>{item.ID}</option>):'loading'}
			</select>
			<button className="btn" type="submit">Submit</button>
		</form>
		<span style={{whiteSpace:"pre-line"}}>{<h2>{' '}</h2>}</span>
		    <span style={{whiteSpace:"pre-line"}}><h1>student ID: </h1></span>
			<span style={{whiteSpace:"pre-line"}}>{<h2>{currentStudent}</h2>}</span>
			<span style={{whiteSpace:"pre-line"}}>{<h2>{' '}</h2>}</span>
		    <span style={{whiteSpace:"pre-line"}}><h1>rubric name: </h1></span>
			<span style={{whiteSpace:"pre-line"}}>{<h2>{rubricName}</h2>}</span>
			<div className="row-section">
				{rubric.map((question,index) => (
					<div className="row-section__inner" key={question.id}>
						<h2>question {index+1}</h2>
						<p>&nbsp;</p>

						<div className="input-group">
							<label htmlFor="Question">Question:</label>
							<h1>{question.questionName}</h1>
							<h3>criterions</h3>
							{question.criterions.map((criterion) => (
								<div className="" key={criterion.id}>
									<div className="input-group">
										<div className="box2">{criterion.body}</div>
									</div>
									<div className="rubricItem">
										<h2>marks:</h2>
										<h1>{criterion.grade}</h1>
										
									</div>
									<hr style={{"margin":30}}></hr>

								</div>
							))}
                <div className="rubricItem">
								<h2>Marks:{"\n"}</h2>
								<input type="number" onChange={(e) => handleQuestionData(question.id, e)}></input>
								<h1>/{sumGrade(question.id)}</h1>
							</div>
							
						</div>
						
						<button className='btn' onClick={testpost}>CSV JSON UPLOAD TEST BUTTON</button>

					</div>
				))}
				<button className="btn" onClick={axios_post}>
					Submit rubric data
				</button>
			</div>
		</div>
	)
}

export default MarkingComp
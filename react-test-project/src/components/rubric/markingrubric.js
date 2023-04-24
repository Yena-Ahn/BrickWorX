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
    const [grades, setGrades] = React.useState([])
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



	const handleQuestionData = (
		id,
		event,
	) => {
		const index = rubric.findIndex((question) => question.id === id)
		let _questionMembers = [...rubric]
		_questionMembers[index][event.target.name] = event.target.value
		setRubricData(_questionMembers)
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
										<h2>points per section:</h2>
										<h1>{criterion.grade}</h1>
									</div>
								</div>
							))}
                            <div className="rubricItem">
								<h2>max grade</h2>
								<h1>{sumGrade(question.id)}</h1>
							</div>
						</div>
						<button className='btn' onClick={() => {}}>TEST BUTTON</button>

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
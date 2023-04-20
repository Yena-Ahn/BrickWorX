/* eslint-disable no-extend-native */
import { cloneDeep } from "lodash"
import React from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_ENDPOINT = "http://127.0.0.1:8000/api/submitrubric";

const DynamicForm = () => {
	//just usefull to have
	function addAfter(array, index, newItem) {
    return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index)
    ]
	}
	const [status, setStatus] = React.useState("");
	
	const [rubric, setRubricData] = React.useState([
		{
			questionName: "",
			id: 0,
			criterions: [
				{
					body: "",
					grade: 0,
					id: 0,
				},
			],
		},
	])

	const handleSubmit = async (event) => {
		setStatus(""); // Reset status
    event.preventDefault();
    const formData = new FormData();
    formData.append("rubric", rubric);
    const resp = await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "application/json",
      },
    });
    setStatus(resp.status === 200 ? "Thank you!" : "Error.");
  };

	const handleAddQuestion = () => {
    console.log("ISSUES")
    console.log(rubric.slice(-1)[0].id)
		let _questionMembers = [...rubric]
		_questionMembers.push({
			questionName: "",
			id: rubric.slice(-1)[0].id+1,
			criterions: [
				{
					body: "",
					grade: 0,
					id: 0,
				},
			],
		})
		setRubricData(_questionMembers)
    console.log('_questionMembers')
    console.log(_questionMembers)
	}

	const addCriteriaToQuestion = (id) => {
		const index = rubric.findIndex((question) => question.id === id)
		let _questionMembers = [...rubric]
		let thing = {..._questionMembers[index].criterions.slice(-1)}
		_questionMembers[index].criterions.push({
			body: "",
			grade: 0,
			id: thing[0].id+1,
		})
		console.log('_questionMembers[index].members')
		console.log(thing[0])
		setRubricData(_questionMembers)
	}
	// const insertCriteriaToQuestion = (questionID, insertAboveIndexID)=>{
	// 	let data = [...cloneDeep(rubric)];
	// 	let index = data.findIndex(question => question.id === questionID);
	// 	let thing = {...data[index].criterions.slice(-1)}
	// 	let criteriaIndex=data[index].criterions.findIndex(item => item.id === insertAboveIndexID)
	// 	data[index].criterions=addAfter(data[index].criterions,criteriaIndex,
	// 		{
	// 					body: "insertTEST",
	// 					grade: 0,
	// 					id: thing[0].id+1,
	// 		}
	// 	)
	// 	setRubricData(data)
	// }
	




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

	const saveRubric = () => {
		console.table(rubric)
		// console.log(rubric)
	}

	const removeCriterion = (questionID,criteriaID) => {
		let data = [...cloneDeep(rubric)];
		let index = data.findIndex(question => question.id === questionID);

		if (data[index].criterions.length>1){
			data[index].criterions=data[index].criterions.filter((item)=>{return item.id!==criteriaID})
			setRubricData(data)
		}
	}


	const removeQuestion = (questionID) => {
		let data = [...cloneDeep(rubric)];
		let index = data.findIndex(question => question.id === questionID);
		if (data.length>1){
			data=data.filter((item)=>{return item.id!==questionID})
			setRubricData(data)
		}
	}
	return (
    <div>
			<div className="row-section">
				{rubric.map((question,index) => (
					<div className="row-section__inner" key={question.id}>
						<h2>question {index+1}</h2>
						<p>&nbsp;</p>

						<div className="input-group">
							<label htmlFor="Question">Name of Question</label>
							<input
								name="Question"
								onChange={(e) => handleQuestionData(question.id, e)}
								type="text"
							/>
							<h3>criterions</h3>
							{question.criterions.map((criterion) => (
								<div className="form-row" key={criterion.id}>
									<div className="input-group">
										<label htmlFor="body">criteria</label>
										<input
											name="body"
											type="text"
											onChange={(e) =>
												handleCriteriaInQuestionData(question.id, criterion.id, e)
											}
										/>
									</div>
									<div className="input-group">
										<label htmlFor="grade">Grade for criterion</label>
										<input
											name="grade"
											type="number"
											onChange={(e) =>
												handleCriteriaInQuestionData(question.id, criterion.id, e)
											}
										/>
									</div>
									<button className='btn' onClick={() => removeCriterion(question.id,criterion.id)}>Remove</button>
									<button className='btn' onClick={() => addCriteriaToQuestion(question.id)}>+</button>
								</div>
							))}
						</div>
						<button className='btn' onClick={() => {removeQuestion(question.id)}}>Remove Question</button>
						<button className='btn' onClick={() => {}}>TEST BUTTON</button>

					</div>
				))}
				<button className='btn' onClick={handleAddQuestion}>Add new block</button> <br />
				<button className="btn" onClick={saveRubric}>
					Submit rubric data
				</button>
			</div>
		</div>
	)
}

export default DynamicForm

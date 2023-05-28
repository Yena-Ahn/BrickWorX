
/* eslint-disable no-extend-native */
import { cloneDeep } from "lodash"
import React, { /*useEffect */} from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import * as Icon from 'react-bootstrap-icons';
import { Button, Table, Modal} from "react-bootstrap";

const DynamicForm = ({setRubricSuper}) => {
	//just usefull to have
	function addAfter(array, index, newItem) {
    return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index)
    ]
	}
	// useEffect(()=>{
	// 	fetch('/submit')
	// })
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
	const [rubricName, setRubricName] = React.useState('default')

	// const handleSubmit = async (event) => {
	// 	setStatus(""); // Reset status
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("rubric", rubric);
  //   const resp = await axios.post(UPLOAD_ENDPOINT, formData, {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });
  //   setStatus(resp.status === 200 ? "Thank you!" : "Error.");
  // };

	let customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
	};


	const axios_post = ()=>{
		axios.post("/submit", {rubricName, rubric}, customConfig).then(response => {
			console.log(response);
			setRubricSuper[0]({rubricName, rubric})
			/*this.setSuccessModalState ({isOpenSuccess: true })*/
		}).catch(error => {
			/*console.log("this is error", error);*/
			console.log("this is error", error.response.data);
			/*this.setErrorSaveModalState ({isOpenError: true})*/
		});
	}
	

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

	const setInputHeight =(element, defaultHeight) => {
		const target = element.target ? element.target : element;
		target.style.height = defaultHeight;
		target.style.height = `${target.scrollHeight}px`;
	}

	const saveRubric = () => {
		console.table(rubric)
		//console.log(rubric)
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

	const handleNameChange = (
		event,
	) => {
		setRubricName(event.target.value)
		console.log(rubricName)
	}

	function lastMemberCrit (question){
		 return [...question.criterions.slice(-1)]
	}

	return (
		
    <div>
		<div className="rubricTitleStyle" style={{display:"center"}}>
			<label htmlFor="rubric_name"><h2 style={{textAlign:"center", marginRight:"10px"}}>Name of Rubric</h2></label>
			<input 
				name="rubric_name" 
				onChange={(e) => handleNameChange(e)} 
				type="text" placeholder="Rubric Name" 
				className="questionTitleStyle"
				style={{fontSize:"26px"}}
				/>
		</div>
			<div className="row-section">
				{rubric.map((question,index) => (
					<div className="row-section__inner shadow" key={question.id}>
						<h2>Question {index+1}</h2>
						{/*<p>&nbsp;</p>*/}

						
							{/*<label htmlFor="questionName">Name of Question</label>*/}
							<input
								name="questionName"
								onChange={(e) => handleQuestionData(question.id, e)}
								placeholder="Name of Question"
								type="text"
								className="questionTitleStyle"
							/>
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
							
							{question.criterions.map((criterion) => (
								
								<div className="form-row" key={criterion.id}>
									
									<div className="creation-input-group">
											{/*<label htmlFor="grade">Marks</label>*/}
											<input
												name="grade"
												type="number"
												placeholder="0"
												onChange={(e) =>
													handleCriteriaInQuestionData(question.id, criterion.id, e)
												}
												className="markBoxStyle"
												
											/>
										
									
										<textarea
											name="body"
											rows="3"
											placeholder="Enter criteria for this mark..."
											onChange={(e) =>
												handleCriteriaInQuestionData(question.id, criterion.id, e)
											}
											onInput={(e) => setInputHeight(e, "100px")}
											className="criteriaTextWidth"
											style={{display:"inline"}}/>
											<div className="sidebtn">
												<Button className='sidebtn-delete' size="lg" 
														variant ="outline-danger" 
														onClick={() => removeCriterion(question.id,criterion.id)}><Icon.TrashFill/></Button>
												<Button className='sidebtn-add'  size="lg"
														variant="success" 
														onClick={() => addCriteriaToQuestion(question.id)}><Icon.PlusCircleFill/></Button>
											</div>
									</div>

									
									
								</div>
								
							))}
						
						
						
						<Button variant="danger" style={{marginTop:"5px"}} onClick={() => {removeQuestion(question.id)}} ><Icon.X/> Delete Question</Button>
						{/*<button className='btn' onClick={() => {}}>TEST BUTTON</button>*/}

					</div>
				))}
				
				<Button variant="success  text-left" size ="lg" className="createNewQuestionBtn text-left"
					onClick={handleAddQuestion}><Icon.PlusCircleFill /> Create New Question</Button> <br></br>
				
			</div>
			<Button variant="success" size="lg" onClick={axios_post} className="fixedbtn">
			<Icon.FileEarmarkPostFill/><strong> Publish</strong> 
				</Button>
		</div>
		
		
	)
	
}

export default DynamicForm


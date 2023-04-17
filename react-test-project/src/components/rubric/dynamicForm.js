import React from "react"
const DynamicForm = () => {
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
	}

	return (
    <div>
			<div className="row-section">
				{rubric.map((question) => (
					<div className="row-section__inner" key={question.id}>
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
									<button onClick={() => addCriteriaToQuestion(question.id)}>+</button>
								</div>
							))}
						</div>
					</div>
				))}
				<button onClick={handleAddQuestion}>Add new block</button> <br />
				<button className="btn-primary" onClick={saveRubric}>
					Submit rubric data
				</button>
			</div>
		</div>
	)
}

export default DynamicForm

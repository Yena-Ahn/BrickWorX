import { cloneDeep } from "lodash"
import React, { useEffect } from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {Button, Table, Form, Container, Row, Col, Badge} from 'react-bootstrap'

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



const MarkReview = ({setdefualtassignment}) => {

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


        return (
            <div>

                <Row>
                    <Col>
                    <Form onSubmit={handleSubmit} display="inline">
                    <Form.Select 
                        onChange={chngAssignDropdown}> 
                    <option value="⬇️ Select Assignment ⬇️"> -- Select Assignment -- </option>
                    {assignmentList?assignmentList.map((item) => <option key={item} value={item}>{item}</option>):'loading'}
                    
                    </Form.Select>
                    </Form>
                    </Col>
                    <Col>
    
                    </Col>
                </Row>
            
            
                <br></br>


                <div className="row-section">
				<Table bordered className="rubricTable">
				<div className="row-section__marked ">
					<tr wd><th>Student ID</th><th>Marked?</th><th>Score</th></tr>
						{students.slice(2).map((item,index) => {return <tr> 
							<th>{item['SIS User ID']}</th> 
							{(item[assignment] !== undefined && !isNaN(parseInt(item[assignment])) ) ? <th><Badge bg="success">Yes</Badge>{' '}</th> : <th><Badge bg="danger">No</Badge>{' '}</th>}
							<th>{(item[assignment])}</th>
							</tr>})}
				</div>

				</Table>
			</div>

            </div>

)};

export default MarkReview
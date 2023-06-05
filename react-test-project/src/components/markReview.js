import { cloneDeep } from "lodash"
import React, { useEffect } from "react"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {Button, Table, Form, Container, Row, Col, Badge} from 'react-bootstrap'



const MarkReview = ({setdefualtassignment}) => {

	const [assignmentList, setlist] = React.useState(null)
	const [assignment, setAssignment] = React.useState(!setdefualtassignment[3]?'select an assignment':setdefualtassignment[3].assignment)
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

    function range(start, stop, step) {
        if (typeof stop == 'undefined') {
            // one param defined
            stop = start;
            start = 0;
        }
    
        if (typeof step == 'undefined') {
            step = 1;
        }
    
        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return [];
        }
    
        var result = [];
        for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
            result.push(i);
        }
    
        return result;
    };
    


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
                {/* {JSON.stringify(setdefualtassignment[3])} */}
                {!setdefualtassignment[3]?
                <Row>
                    <Col>
                    <Form onSubmit={handleSubmit} display="inline">
                    <Form.Select 
                        onChange={chngAssignDropdown}> 
                    <option value="⬇️ Select Assignment ⬇️"> -- Select Assignment -- </option>
                    {assignmentList?assignmentList.map((item,index) => <option key={index+1} value={item}>{item}</option>):'loading'}
                    
                    </Form.Select>
                    </Form>
                    </Col>
                    <Col>
    
                    </Col>
                </Row>
                :setdefualtassignment[3].assignment}
            
            
                <br></br>


                <div className="row-section">
                {!setdefualtassignment[3]?
				<Table bordered className="rubricTable">
                <thead className='rubricHead'>
					<tr className="row-section__marked "><th className="studentWidth">Student ID</th><th className="markedWidth">Marked?</th><th className="scoreWidth">Score</th></tr></thead>
                        <tbody>
                        
						{students.map((item,index) => {return <tr key={(index+1)*69}> 
							<th>{item['SIS User ID']}</th> 
							{(item[assignment] !== undefined && !isNaN(parseInt(item[assignment])) ) ? <th style={{textAlign:"center"}}><Badge bg="success">Yes</Badge>{' '}</th> : <th style={{textAlign:"center"}}><Badge bg="danger">No</Badge>{' '}</th>}
							<th style={{textAlign:"center"}}>{(item[assignment])}</th>
							</tr>})}
                        </tbody>
				</Table>
                :
                <Table bordered className="rubricTable">
                <thead className='rubricHead'>
					<tr className="row-section__marked "><th className="studentWidth">Student ID</th><th className="markedWidth">Marked?</th><th className="scoreWidth">Score</th>{range(setdefualtassignment[3].questionNum).map((item,index)=>{
                        return <th>Question {index+1}</th>
                    })}{range(setdefualtassignment[3].questionNum).map((item,index)=>{
                        return <th>Feedback Q{index+1}</th>
                    })}</tr></thead>
                        <tbody>
                        
						{students.map((item,index) => {return <tr key={(index+1)*69}> 
							<th>{item['SIS User ID']}</th> 
							{(item[assignment] !== undefined && !isNaN(parseInt(item[assignment])) ) ? <th style={{textAlign:"center"}}><Badge bg="success">Yes</Badge>{' '}</th> : <th style={{textAlign:"center"}}><Badge bg="danger">No</Badge>{' '}</th>}
							<th style={{textAlign:"center"}}>{(item[assignment])}</th>
                            {setdefualtassignment[3].data[index].grades.map((item,index)=>{
                                return <th >{item}</th>
                            })}
                            {setdefualtassignment[3].data[index].feedback.map((item,index)=>{
                                return <th>{item}</th>
                            })}
							</tr>})}
                        </tbody>
				</Table>}



			</div>

            </div>

)};

export default MarkReview
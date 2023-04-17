
import { useState, memo } from 'react';
import '../../index.css';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash';
const RubricRowV2 = ({question, question_index, update_method, rubric_data}) => {
  
  const [formFields, setFormFields] = useState(question
  ) 
  console.log("question")
  console.log(question)
  console.log("_")
  console.log("question_id")
  console.log(question.question_id)
  console.log("_")
  console.log('addfields debug')
  console.log(rubric_data[question_index].rubric_fields)
  const handleFormChange = (event, index) => {
    let data = cloneDeep(formFields);
    
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  console.log('formFields  ' +JSON.stringify(formFields))
  console.log('thing 2 ' +JSON.stringify())

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      text: '',
      grade: 0
    }
    rubric_data[question_index].rubric_fields.push({text:'',grade:0})
    update_method(rubric_data)
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className='box2'>
      question_index {question_index}
          {formFields.map((form, index) => {
            console.log('thing 3 ' +JSON.stringify(form))
            return (
              <div className='rubricItem' key={index}>
                <input
                  className='formtext'
                  name='text'
                  placeholder='text'
                  onChange={event => handleFormChange(event, index)}
                  value={form.text}
                />
                <input
                  className='formtext'
                  name='grade'
                  placeholder='grade'
                  onChange={event => handleFormChange(event, index)}
                  value={form.grade}
                />
                <button className='btn' onClick={() => removeFields(index)}>Remove</button>
              </div>
            )
          })}
        <button className='btn' onClick={addFields}>Add More..</button>
      <br />
      
    </div>
  )
}
RubricRowV2.propTypes = {
}
export default RubricRowV2
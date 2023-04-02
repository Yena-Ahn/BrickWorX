
import { useState, memo } from 'react';
import '../../index.css';
import PropTypes from 'prop-types'
const RubricRow = () => {
  const [formFields, setFormFields] = useState([
    { text: '', grade: 0 },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      text: '',
      grade: 0
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className=''>
      <form className="container" onSubmit={submit}>
          {formFields.map((form, index) => {
            return (
              <div className='rubricItem' key={index}>
                <input
                  className='formtext'
                  name='text'
                  placeholder='text'
                  onChange={event => handleFormChange(event, index)}
                  value={form.name}
                />
                <input
                  className='formtext'
                  name='grade'
                  placeholder='grade'
                  onChange={event => handleFormChange(event, index)}
                  value={form.age}
                />
                <button className='btn' onClick={() => removeFields(index)}>Remove</button>
              </div>
            )
          })}
        
      </form>
      <button className='btn' onClick={addFields}>Add More..</button>
      <br />
      <button className='btn' onClick={submit}>Submit</button>
    </div>
  )
}

// RubricRow.propTypes = {
//     value : PropTypes.number,
//     text : PropTypes.string
// }
export default RubricRow
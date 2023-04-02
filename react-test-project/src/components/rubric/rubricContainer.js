//stub
import RubricRowV2 from "../rubric/rubricRowV2";
import { useState } from 'react';


const RubricContainer = (DATA) => {
  const data = DATA
  const [formFields, setFormFields] = useState([
    data.rubric
  ])

  const addFields = (index) => {
    let object = {
      text: '',
      grade: 0
    }

    //setFormFields([...formFields, object])
  }

  return (
    <div>
      <pre>{JSON.stringify(data.rubric)}</pre>
      <form>
        {/*JSON.stringify(formFields)*/}
        {formFields[0].map((a,b)=>{
         return <div className='box2'>{JSON.stringify(a)}
         <RubricRowV2 question={a.rubric_fields} question_index={b}/>
         
         {JSON.stringify(a.rubric_fields)}
         {JSON.stringify(b)}</div>
        })}
      </form>
    </div>
  )
    
  
}
export default RubricContainer
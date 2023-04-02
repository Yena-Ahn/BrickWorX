//stub
import RubricRowV2 from "../rubric/rubricRowV2";
import { useState } from 'react';


const RubricContainer = (DATA={}) => {
  const data = DATA
  const [formFields, setFormFields] = useState([
    data.rubric
  ])
  return (
    <div>
      <pre>{JSON.stringify(data.rubric)}</pre>
      <form>
        {JSON.stringify(formFields)}
        {formFields[0].map((a)=>{
         return <div className='box2'>{JSON.stringify(a)}
         <RubricRowV2 question={a.rubric_fields}/>
         {JSON.stringify(a.rubric_fields)}</div>
        })}
      </form>
    </div>
  )
    
  
}
export default RubricContainer
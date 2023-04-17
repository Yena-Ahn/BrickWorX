//stub
import RubricRowV2 from "../rubric/rubricRowV2";
import { useState, useEffect, useRef } from 'react';
const RubricContainer = () => {
  const DATA = [{question_id:1, question_title:'how to abc', rubric_fields : [{text: "blahblah", grade: 3 },{text: "blahblah", grade: 3 },{text: "blahblah", grade: 4 }]},
  {question_id:2, question_title:'how to eat an apple', rubric_fields : [{text: "hfmdhsmdhfhmfds", grade: 30 }]}] 
  console.log('data')

  console.log(DATA)
  const [formFields, setFormFields] = useState([
    ...DATA
  ])
  const onChangeSomeState = (newSomeState) => {
    setFormFields(newSomeState);
  };
  return (
    <div>
      <form>
        {formFields.map((a,b)=>{
         return <div key={b} className='box2'>
          {/* {JSON.stringify(a)} */}
         <RubricRowV2 question={a.rubric_fields} question_index={b} update_method={onChangeSomeState} rubric_data={DATA}/>
         
         {JSON.stringify(a.rubric_fields)}
         {JSON.stringify(b)}</div>
        })}
      </form>
    </div>
  )
}
export default RubricContainer
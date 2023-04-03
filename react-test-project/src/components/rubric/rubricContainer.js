//stub
import RubricRowV2 from "../rubric/rubricRowV2";
import { useState } from 'react';


const RubricContainer = ({DATA}) => {
  
  console.log('data')

  console.log(DATA)
  const [formFields, setFormFields] = useState([
    ...DATA
  ])

  // const addFields = (index) => {
  //   let object = {
  //     text: '',
  //     grade: 0
  //   }
  //   let temp = formFields
  //   temp[index].rubric_fields+=object
  //   setFormFields(temp)
  // }

  return (
    <div>
      <form>
        {/* {//JSON.stringify(formFields)}
        {//console.log('AAAAAAAAAAAAAAAAAA')}
        {//console.log(formFields)}

        {//console.log('AAAAAAAAAAAAAAAAAA')} */}

        {formFields.map((a,b)=>{
         return <div key={b} className='box2'>
          {/* {JSON.stringify(a)} */}
         <RubricRowV2 question={a.rubric_fields} question_index={b} update_method={setFormFields} rubric_data={DATA}/>
         
         {JSON.stringify(a.rubric_fields)}
         {JSON.stringify(b)}</div>
        })}
      </form>
    </div>
  )
    
  
}
export default RubricContainer
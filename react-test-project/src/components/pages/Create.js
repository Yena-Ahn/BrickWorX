
import DynamicForm from "../rubric/dynamicForm";

const Create = ({setRubricSuper}) => {
  return (
    <div>
      <h1  style={{textAlign:"center", color:"#009AC7", marginTop:"5px"}}>
        Create Rubric
      </h1>
      <DynamicForm setRubricSuper={setRubricSuper}/>
    </div>
  );
};


export default Create;
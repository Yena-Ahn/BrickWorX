
import DynamicForm from "../rubric/dynamicForm";

const Create = ({setRubricSuper}) => {
  return (
    <div>
      <h1  style={{textAlign:"center"}}>
        Create Rubric
      </h1>
      <DynamicForm setRubricSuper={setRubricSuper}/>
    </div>
  );
};


export default Create;
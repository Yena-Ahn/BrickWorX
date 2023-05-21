import DynamicForm from "../rubric/dynamicForm";

const Create = ({setRubricSuper}) => {
  return (
    <div>
      <h1>
        Create Rubric
      </h1>
      <DynamicForm setRubricSuper={setRubricSuper}/>
    </div>
  );
};

export default Create;
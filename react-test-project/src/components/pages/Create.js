import RubricRow from "../rubric/rubricRow";
import RubricContainer from "../rubric/rubricContainer";
import DynamicForm from "../rubric/dynamicForm";

const Create = () => {
  const DATA = [{question_id:1, question_title:'how to abc', rubric_fields : [{text: "blahblah", grade: 3 },{text: "blahblah", grade: 3 },{text: "blahblah", grade: 4 }]},
  {question_id:2, question_title:'how to eat an apple', rubric_fields : [{text: "hfmdhsmdhfhmfds", grade: 30 }]}]

  return (
    <div>
      <h1>
        TOOOL HERE DYNAMIC FORM
      </h1>
      {/*<RubricRow />*/}
      {/* <RubricContainer DATA={DATA}/> */}
      <DynamicForm/>
    </div>
  );
};

export default Create;
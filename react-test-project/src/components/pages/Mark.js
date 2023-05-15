import MarkingComp from "../rubric/markingrubric";

const Mark = ({setdefualtassignment}) => {
  return (
    <div>
      <h1>
        Marking: {setdefualtassignment[1]}
      </h1>
      <MarkingComp setdefualtassignment={setdefualtassignment}/>
    </div>
  );
};

export default Mark;
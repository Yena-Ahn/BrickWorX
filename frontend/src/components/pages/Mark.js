
import MarkingComp from "../rubric/markingrubric";

const Mark = ({setdefualtassignment}) => {
  return (
    <div>
      <h1  style={{textAlign:"center", color:"#009AC7", marginTop:"5px"}}>
        Marking: {setdefualtassignment[1]}
      </h1>
      <MarkingComp setdefualtassignment={setdefualtassignment}/>
    </div>
  );
};



export default Mark;
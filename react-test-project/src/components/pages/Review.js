
import MarkReview from "../markReview"

const Review = ({setdefualtassignment}) => {
  return (
    <div>
      <h1 style={{textAlign:"center"}}>
      Review Rubric: {setdefualtassignment[1]}
      </h1>
      <MarkReview setdefualtassignment={setdefualtassignment}/>
    </div>
  );
};




export default Review;
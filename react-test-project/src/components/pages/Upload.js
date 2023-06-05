
import FilesUploadComponent from "../upload/uploadcontainer";
const UPLOAD = ({ change }) => {
  return (
    <div>
      <h1  style={{textAlign:"center", color:"#009AC7", marginTop:"5px"}}>
        Welcome to BrickWorX
      </h1>
      <FilesUploadComponent change={change} />
    </div>
  );
};


export default UPLOAD;
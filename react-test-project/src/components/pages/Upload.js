
import FilesUploadComponent from "../upload/uploadcontainer";
const UPLOAD = ({ change }) => {
  return (
    <div>
      <h1  style={{textAlign:"center"}}>
        Upload Gradebook
      </h1>
      <FilesUploadComponent change={change} />
    </div>
  );
};


export default UPLOAD;
import * as Icon from 'react-bootstrap-icons';
const Download = () => {
  return (
    <div>
      <h1 style={{textAlign:"center", color:"#009AC7", marginTop:"5px"}}>
      Download
      </h1>
      {/* <button className="btn btn-primary btn-lg" style={{width:500}} formAction="http://localhost:3001/s3DOWNLOAD?fn=CanvasExportExample.csv" >download</button> */}
      <div className="container shadow" style={{width:"650px"}}>
      <p>Your gradebook is now ready to download and upload to Canvas!</p>
      <a href="http://localhost:3001/s3DOWNLOAD?fn=CanvasExportExample.csv" className="btn btn-primary btn-lg downloadBtn" style={{ align:"center"}}> <Icon.Download/> Download Gradebook</a>
      <p style={{marginTop:"5px"}}>Thank you for using BrickWorX!</p>
      </div>
    </div>
  );
};


export default Download;
// 'http://localhost:3001/s3download?fn=CanvasExportExample.csv'


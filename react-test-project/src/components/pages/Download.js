const Download = () => {
  return (
    <div>
      <h1 style={{textAlign:"center"}}>
      Download
      </h1>
      {/* <button className="btn btn-primary btn-lg" style={{width:500}} formAction="http://localhost:3001/s3DOWNLOAD?fn=CanvasExportExample.csv" >download</button> */}
      <a href="http://localhost:3001/s3DOWNLOAD?fn=feedback.csv" className="btn btn-primary btn-lg" style={{width:500}}>download</a>

    </div>
  );
};


export default Download;
// 'http://localhost:3001/s3download?fn=CanvasExportExample.csv'


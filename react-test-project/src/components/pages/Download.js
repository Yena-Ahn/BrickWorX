
import React, { useEffect } from "react"
import axios from "axios";


const download = () => {

  var filename = "CanvasExportExample.csv"
  axios({
    url: 'http://localhost:3001/s3download?fn='+filename, //your url
    method: 'GET',
    responseType: 'blob', // important
}).then((response) => {
    // // create file link in browser's memory
    // const href = URL.createObjectURL(response.data);

    // // create "a" HTML element with href to file & click
    // const link = document.createElement('a');
    // link.href = href;
    // link.setAttribute('download', 'CanvasExported.csv'); //or any other extension
    // document.body.appendChild(link);
    // link.click();

    // // clean up "a" element & remove ObjectURL
    // document.body.removeChild(link);
    // URL.revokeObjectURL(href);
});


}

const Download = () => {
  return (
    <div>
      <h1 style={{textAlign:"center"}}>
      Download
      </h1>
      <button className="btn btn-primary btn-lg" style={{width:500}} onClick={download}>download</button>
    </div>
  );
};


export default Download;
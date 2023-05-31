
import React, { Component } from 'react';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { Button, Form, Modal} from "react-bootstrap";
import UploadModal from './uploadmodal.js';

export default class FilesUploadComponent extends Component {
   
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            filecsv: '',
            showModal: false,
        };
        
        //console.log(props.change)
        //props.change[0]('fruit.csv')
        //console.log(props.change)
        this.updateCSV=props.change[0];
        
    }
    openModal = () => this.setState({ showModal: true });

    closeModal = () => this.setState({ showModal: false});

    onFileChange(e) {
        this.setState({ filecsv: e.target.files[0] })
    }
    onSubmit(e) {
        
        console.log(this.state.filecsv.name);
        this.openModal();
        e.preventDefault();
        this.updateCSV(this.state.filecsv.name);

        //const formData = new FormData()
        //formData.append('file', this.state.filecsv)
        //axios.post("/uploadFileAPI", formData, {
        //}).then(res => {
        //  console.log(res)
        //  if(res.status===200){
        //    this.updateCSV(this.state.filecsv.name)
        //  }
        //})

        
    }

    render() {
        
        return (
            
            <div className="container shadow" style={{width:"650px"}}>
                <div className="row">
                    
                    <Form onSubmit={this.onSubmit}>
                       
                        <div className="form-group">
                            <Form.Group controlId="formFileLg" className="mb-3">
                                <Form.Label><h2>Upload Canvas Gradebook:</h2></Form.Label>
                                {/*<input type="file" name='file' onChange={this.onFileChange} className="fileUpload" />*/}
                                <Form.Control type="file" name="file" onChange={this.onFileChange} style ={{width:"350px", margin:"auto"}} className="center"/>
                            </Form.Group>
                        </div>
                        <div className="form-group">
                            
                            {/*<Button type="submit"  onClick={this.openModal}><Icon.Upload/> Upload</Button>*/}
                            {/*<uploadModal closeModal={this.closeModal} isOpen={this.state.showModal}/>*/}
                        </div>
                    </Form>

                </div>
                
            </div>
        )
    }
}
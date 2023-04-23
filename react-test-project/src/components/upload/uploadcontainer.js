import React, { Component } from 'react';
import axios from 'axios';
export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            filecsv: ''
        }
        console.log(props.change)
        //props.change[0]('fruit.csv')
        //console.log(props.change)
        this.updateCSV=props.change[0]

    }
    onFileChange(e) {
        this.setState({ filecsv: e.target.files[0] })
    }
    onSubmit(e) {
        console.log(this.state.filecsv.name)
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', this.state.filecsv)
        axios.post("/uploadFileAPI", formData, {
        }).then(res => {
            console.log(res)
            this.updateCSV(this.state.filecsv.name)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" name='file' onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
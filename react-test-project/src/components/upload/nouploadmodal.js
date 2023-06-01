import React from 'react';
import { Button, Modal} from "react-bootstrap";

class uploadModal extends React.Component{
    render() {
        return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}} centered>
            
            <Modal.Header closeButton> <strong style={{color:'red'}}>Upload Failed!</strong> </Modal.Header>
            
            <Modal.Body> Oops! it seems that you haven't import any file yet.</Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" style={{width:'100%'}} onClick={this.props.closeModal}>Close</Button>
                {/*<Button variant="primary" style={{width:'48%', float:'right'}}>Create Rubric</Button>*/}
            </Modal.Footer>
        </Modal>
        )
    }
}
   

export default uploadModal;

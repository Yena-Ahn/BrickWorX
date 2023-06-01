import React from 'react';
import { Button, Modal} from "react-bootstrap";

class uploadModal extends React.Component{
    render() {
        return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}}>
            
            <Modal.Header closeButton> <strong style={{color:'green'}}>Upload Successful!</strong> </Modal.Header>
            
            <Modal.Body> You're now ready to create a rubric! </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" style={{width:'48%', float:'left'}} onClick={this.props.closeModal}>Close</Button>
                <Button variant="primary" style={{width:'48%', float:'right'}}>Create Rubric</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}
   

export default uploadModal;

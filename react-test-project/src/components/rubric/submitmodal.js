import React from 'react';
import { Button, Modal} from "react-bootstrap";

class SubmitModal extends React.Component{
    render() {
        return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}}>
            
            <Modal.Header closeButton> <strong style={{color:'green'}}>Student Grade Submitted</strong> </Modal.Header>
            
            <Modal.Body> You're now ready to mark the next student! </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                {/*<Button variant="primary">Create Rubric</Button>*/}
            </Modal.Footer>
        </Modal>
        )
    }
}
   

export default SubmitModal;

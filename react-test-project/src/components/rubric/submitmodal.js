import React from 'react';
import { Button, Modal} from "react-bootstrap";

class SubmitModal extends React.Component{
    render() {
        return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}}>
            
            <Modal.Header closeButton> <h4><strong style={{color:'green'}}>Student Grade Submitted</strong></h4> </Modal.Header>
            
            <Modal.Body> You're now ready to mark the next student! </Modal.Body>
            
            <Modal.Footer>
                <Button variant="primary" onClick={this.props.closeModal}>Close</Button>
                {/*<Button variant="primary">Create Rubric</Button>*/}
            </Modal.Footer>
        </Modal>
        )
    }
}
   

export default SubmitModal;

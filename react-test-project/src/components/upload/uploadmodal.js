
import React from 'react';
import { Button, Modal} from "react-bootstrap";

function uploadModal(){
    
    return(
    <Modal
    show={this.props.isOpen}
    onHide={this.props.closeModal}>

<Modal.Header><strong>Upload Successful!</strong></Modal.Header>
                        <Modal.Body>You're now ready to create a rubric!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary">Create Rubric</Button>
                        </Modal.Footer>
</Modal>
    )
}
   

export default uploadModal;

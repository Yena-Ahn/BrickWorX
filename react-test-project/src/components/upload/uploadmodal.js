import React from 'react';
import { Button, Modal} from "react-bootstrap";

class uploadModal extends React.Component{
    render() {
        return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}}>
            
            <Modal.Header closeButton> <strong>Upload Successful!</strong> </Modal.Header>
            
            <Modal.Body> You're now ready to create a rubric! </Modal.Body>
            
            <Modal.Footer>
                {/*<Button variant="secondary">Close</Button>*/}
                <Button variant="primary" style={{width:"100%", padding:"10px"}} >Create Rubric</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}
   

export default uploadModal;

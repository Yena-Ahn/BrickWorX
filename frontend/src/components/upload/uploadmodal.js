import React from 'react';
import { Button, Modal} from "react-bootstrap";

class uploadModal extends React.Component{
    render() {
        return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}} centered>
            
            <Modal.Header closeButton> <h4><strong style={{color:'green'}}>Upload Successful!</strong></h4> </Modal.Header>
            
            <Modal.Body> You're now ready to create a rubric! </Modal.Body>
            
            <Modal.Footer>
                <Button variant="primary" style={{ float:'left'}} onClick={this.props.closeModal}>Close</Button>
                
            </Modal.Footer>
        </Modal>
        )
    }
}
   

export default uploadModal;

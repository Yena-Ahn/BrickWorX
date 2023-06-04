import React from 'react';
import { Button, Modal} from "react-bootstrap";

class NoUploadModal extends React.Component {
 render() {
     return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}} centered>
            
            <Modal.Header closeButton> <h4><strong style={{color:'red'}}>Upload Failed!</strong></h4> </Modal.Header>
            
            <Modal.Body>Oops! It seems that you haven't imported any file yet.</Modal.Body>
            
            <Modal.Footer>
                <Button variant="primary"  onClick={this.props.closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
     )
 }
}


export default NoUploadModal;
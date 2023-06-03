import React from 'react';
import { Button, Modal} from "react-bootstrap";

class PublishModal extends React.Component{
    render() {
        return (
        <Modal show={this.props.isOpen} onHide={this.props.closeModal} style={{height:"90%"}}>
            
            <Modal.Header closeButton> <strong style={{color:'green'}}>Rubric Published!</strong> </Modal.Header>
            
            <Modal.Body> You're now ready to mark students using your published rubric! </Modal.Body>
            
            <Modal.Footer>
                <Button style={{width:"100%"}} variant="secondary" onClick={this.props.closeModal}>Close</Button>
                {/*<Button variant="primary">Create Rubric</Button>*/}
            </Modal.Footer>
        </Modal>
        )
    }
}
   

export default PublishModal;

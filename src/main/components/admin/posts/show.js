import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Show extends React.Component {

    render() {
        // console.log(this.props)
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Posts</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.posts.id}>
                            <li>Id : {this.props.posts.id}</li>
                            <li>Title : {this.props.posts.title}</li>
                            <li>Status : {this.props.posts.status}</li>
                            <li>Address : {this.props.posts.address}</li>
                            <li>Cost : {this.props.posts.cost}</li>
                            <li>Description : {this.props.posts.description}</li>
                            <li>Author: {this.props.posts.author.username} </li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.onToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Show;

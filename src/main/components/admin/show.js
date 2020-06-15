import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Show extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <Modal
                    isOpen={this.props.visible}
                    className={this.props.className}>
                    <ModalHeader>Members</ModalHeader>
                    <ModalBody>
                        <ul key={this.props.user.id}>
                            <li>ID : {this.props.user.id}</li>
                            <li>Name : {this.props.user.name}</li>
                            <li>Email : {this.props.user.email}</li>
                            <li>Address : {this.props.user.address}</li>
                            <li>Phone : {this.props.user.phone}</li>
                            <li>List posts: </li>
                            {this.props.posts.map((post) => {
                                return <ul key={post.id}>
                                    <li>ID: {post.id}</li>
                                    <li>Name: {post.title}</li>
                                    <br></br>
                                </ul>
                            })}

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

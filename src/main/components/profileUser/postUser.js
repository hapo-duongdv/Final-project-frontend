import React, { Component } from 'react';
import { CardBody, CardText, CardImg, Button, NavLink, Card, } from 'reactstrap';
import EditPost from '../profile/editPost';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalShow from '../profileUser/show';

export default class PostUser extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    state = {
        modalEditPostVisible: false,
        modalShowVisible: false
    }

    toggleModalEditPostVisible = () => {
        this.setState({
            modalEditPostVisible: !this.state.modalEditPostVisible
        });
    }

    toggleShowModalVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
    };


    async delete(e) {
        e.preventDefault()
        const post = this.props.post.id
        try {
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const response = await axios.delete('http://localhost:4000/posts/' + post,
                { headers: { 'Authorization': AuthStr } }
            )
            if (response.status === 200) {
                alert("deleted!")
                // this.props.history.push('/profile')
            }
        }
        catch (error) {
            console.log(error)
        }
        window.location.href = "profile"
    }
    render() {
        // const post = this.props.post;
        console.log(this.props.author)
        return (
            <div className="col-md-4" style={{ marginTop: 10, marginBottom: 10 }}>
                <Card className="posts">
                    <CardBody>
                        <CardImg className="mb-2" style={{ width: "175px", height: "150px" }} src={"http://localhost:4000/posts/image/" + this.props.post.imgUrl} />
                        <CardText className="mb-2" style={{ fontSize: 18 }}>{this.props.post.title}</CardText>
                        <CardText className="mb-2" style={{ fontSize: 15 }}>{this.props.post.cost} đ</CardText>
                        <CardText className="mb-2" style={{ fontSize: 18 }}>{this.props.post.address}</CardText>
                        <CardText className="mb-2" style={{ fontSize: 18 }}>{this.props.post.status}</CardText>
                        <NavLink href="#" className="mb-2 p-0 pr-2" style={{ fontSize: 15, borderRight: "0.2px solid" }} onClick={this.toggleShowModalVisible}>Xem thêm</NavLink>
                    </CardBody>
                </Card>
                <ModalShow
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleShowModalVisible}
                    post={this.props.post}
                    author={this.props.author}
                    isFollowing={this.props.isFollowing}
                ></ModalShow>
            </div>
        )
    }
}

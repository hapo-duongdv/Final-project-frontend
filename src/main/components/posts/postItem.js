import React, { Component } from 'react';
import { CardBody, CardText, CardImg, Button, NavLink, Card, CardTitle, } from 'reactstrap';
import { follow, unfollow } from './follow';
import CmtForm from '../posts/commentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ModalShow from './show'

export default class PostItem extends Component {
    state = {
        liked: false,
        numberOfLike: 0,
        comments: [],
        currentUser: [],
        modalShowVisible: false
     
    }

    toggleShowModalVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
    };  


    like = async () => {
        // const { post, authedUser } = this.props;
        // const res = await axios.post(`http://localhost:5000/post/${post.id}/like`, {
        //     email: authedUser.email
        // })
        // if (res.status === 200) {
        //     this.setState({
        //         liked: res.data.liked,
        //         numberOfLike: res.data.numberOfLike
        //     })
        // }
    }

    comment = async (content) => {
        // const { post, authedUser } = this.props;
        // const res = await axios.post(`http://localhost:5000/post/${post.id}/comment`, {
        //     email: authedUser.email,
        //     content: content
        // })
        // if (res.status === 200) {
        //     this.setState({
        //         comments: [...this.state.comments, res.data]
        //     })
        // }
    }

     follow = async () => {
        // const followingId = ;
        const followingEmail = this.props.post.author.email;
        console.log(this.props.author)
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        try {
            const res = await axios.post("http://localhost:4000/users/follow/"+this.props.post.author.id, this.state.currentUser , { headers: { 'Authorization': AuthStr } })
            this.props.onFollow(followingEmail);
            if (res.status === 201) {
                alert("follow success")
              
                return res.data
            }
            else {
                throw Error("Cannot follow!", res);
            }

            // this.props.onFollow(res.follower);
        }
        catch (err) {
            console.log(err)
            alert("Cannot follow user!!!!")
        }
    }

    unfollow = async () => {
        try {
            const res = await unfollow(this.props.post.email, this.props.authedUser.email)
            this.props.onUnfollow(res.follower);
        }
        catch (err) {
            alert("cannot unfollow!!!")
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        await axios.get(`http://localhost:4000/users/me/${token}`, { headers: { 'Authorization': AuthStr } })
            .then(response =>
            this.setState({
                currentUser: response.data
            })
        )
    }
    render() {
        // console.log("post:", this.props.post.author)
        // console.log(this.props)
        const { liked, numberOfLike } = this.state;
        const post = this.props.post;
        return (
            <div className="col-md-4" style={{ marginTop: 10, marginBottom: 10 }}>
                <Card >
                    <CardBody>
                        <CardTitle className="mb-2">
                            {post.author.email}
                            {
                                this.props.isFollowing
                                    ? <Button outline color="danger" className="float-right mb-2" onClick={this.unfollow}>Unfollow</Button>
                                    : <Button outline color="primary" className="float-right mb-2" onClick={this.follow}>Follow</Button>
                            }
                        </CardTitle>
                        <CardImg className="mb-2" width="90px" height="220px" src={"http://localhost:4000/posts/image/"+post.imgUrl} />
                        <CardText className="mb-2" style={{ fontSize: 20 }}>{post.title}</CardText>
                        <CardText className="mb-2" style={{ fontSize: 20 }}>{post.cost} đ</CardText>
                        <NavLink href="#" className="mb-2 p-0 rounded" style={{ fontSize: 15 }} onClick={this.toggleShowModalVisible}>Xem thêm</NavLink>
                        <div className="mt-2 mb-2">
                            <FontAwesomeIcon icon={faHeart} size="1.5em" onClick={this.like} color={liked ? "#EE0000" : "#000000"} />
                            {numberOfLike > 0 ? <span>{numberOfLike}</span> : null}
                        </div>
                        <CmtForm onSubmit={this.comment} />
                    </CardBody>
                </Card>
                <ModalShow
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleShowModalVisible}
                    post={this.props.post}
                    onFollow={this.props.onFollow}
                    onUnfollow={this.props.onUnfollow}
                    authedUser={this.props.authedUser}
                    isFollowing= {this.props.isFollowing}
                ></ModalShow>
            </div>
        )
    }
}

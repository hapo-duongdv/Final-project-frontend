import React, { Component } from 'react';
import { CardBody, CardText, CardImg, NavLink, Card, CardTitle, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import ModalShow from './show';
import '../../css/postItem.css';

export default class PostItem extends Component {
    state = {
        currentUser: [],
        modalShowVisible: false,
        list_followingPost: [],
        isFollowedPost: false

    }

    toggleShowModalVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
    };

    follow = async () => {
        // const followingId = ;
        const followingEmail = this.props.post.author.email;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        if (this.state.currentUser.length === 0) {
            alert("Cần đăng nhập")
        } else {
            try {
                const res = await axios.post("http://localhost:4000/followers/" + this.props.post.author.id, this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
                // this.props.onFollow(followingEmail);
                if (res.status === 201) {
                    alert("follow success")

                    return res.data
                }
            }
            catch (err) {
                alert("Cannot follow post!")
            }
        }

    }

    followPost = async () => {
        const followingPost = this.props.post;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        if (this.state.currentUser.length === 0) {
            alert("Cần đăng nhập")
        } else {
            try {
                const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
                const res = await axios.post("http://localhost:4000/posts/follow-post/" + followingPost.id, user.data, { headers: { 'Authorization': AuthStr } })
                for (var post of this.state.list_followingPost) {
                    var i = 0;
                    if (post.title === followingPost.title) {
                        i += 1;
                        alert("post followed")
                        break;
                    }
                }
                if (i === 0) {
                    this.setState({
                        list_followingPost: this.state.list_followingPost.push(followingPost)
                    })
                    alert("successfully!")
                }
            }
            catch (err) {
                alert("OK")
            }
            window.location.href = "filter"
        }


    }

    checkIsFollowPost = (item) => {
        for (var post of this.state.list_followingPost) {
            if (post.title === item) {
                return true
            }
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        await axios.get(`http://localhost:4000/users/me/${token}`, { headers: { 'Authorization': AuthStr } })
            .then(response =>
                this.setState({
                    currentUser: response.data,
                })
            )
        const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
        this.setState({
            list_followingPost: user.data.followPosts
        })
    }

    render() {
        // console.log(this.state.currentUser)
        const post = this.props.post;
        const created_at = String(post.created_at).split('-')[0];
        return (
            <div className="col-md-12" style={{ marginTop: 10, marginBottom: 10 }}>
                {post.isShow === true && <Card className="post-item ">
                    <CardBody className="d-flex">
                        <CardTitle>
                            <div>
                                <CardImg className="mb-2 card-img" src={"http://localhost:4000/posts/image/" + post.imgUrl} />
                            </div>
                        </CardTitle>
                        <div className="ml-3">
                            <CardText className="mb-0" style={{ fontSize: 25 }}>{post.title}</CardText>
                            <div className="d-flex">
                                <CardText className="mb-2" style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>{post.cost} đ</CardText>
                                <div className="d-flex ml-4">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="1.5em" />
                                    <CardText className="mb-2 ml-2" style={{ fontSize: 15 }}>{created_at}</CardText>
                                </div>

                            </div>
                            <div className="d-flex pt-4">
                                <FontAwesomeIcon icon={faUser} size="1.5em" color="blue" />
                                <CardText className="ml-1 pr-2" style={{ fontSize: "15px", borderRight: "0.2px solid grey" }}>{post.author.username}</CardText>
                                <CardText className="ml-2 pr-2" style={{ fontSize: "15px", borderRight: "0.2px solid grey" }}>{post.address}</CardText>
                                <NavLink href="#" className="ml-2 p-0 rounded" style={{ fontSize: 15 }} onClick={this.toggleShowModalVisible}>Xem thêm</NavLink>
                            </div>
                        </div>
                        <div className="mt-auto mb-2 ml-auto">
                            <FontAwesomeIcon icon={faHeart} size="2.5em" onClick={this.followPost} color={this.checkIsFollowPost(post.title) ? "red" : "black"} />
                        </div>
                    </CardBody>
                </Card>
                }
                <ModalShow
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleShowModalVisible}
                    post={this.props.post}
                    onFollow={this.props.onFollow}
                    onUnfollow={this.props.onUnfollow}
                    authedUser={this.props.authedUser}
                    isFollowing={this.props.isFollowing}
                    user={this.state.currentUser}
                ></ModalShow>
            </div>
        )
    }
}

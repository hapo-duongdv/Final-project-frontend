import React, { Component } from 'react';
import { CardBody, CardText, CardImg, NavLink, Card, CardTitle, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import ModalShow from './show';
import '../../css/postItem.css';
import io from 'socket.io-client';

export default class PostItem extends Component {
    state = {
        currentUser: [],
        modalShowVisible: false,
        list_followingPost: [],
        isFollowedPost: false,
        newNotification: []

    }

    toggleShowModalVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
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
                        list_followingPost: [...this.state.list_followingPost, followingPost]
                    })
                    this.socket.emit("follow-post", { sender: user.data.username, receiver: this.props.post.author.username })
                    alert("successfully!")
                }
            }
            catch (err) {
                alert("OK")
            }
            // window.location.href = "filter"
        }
    }

    unfollowPost = async () => {
        const followingPost = this.props.post;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        try {
            const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
            const res = await axios.post("http://localhost:4000/users/unfollow-post/" + this.state.currentUser.id, followingPost, { headers: { 'Authorization': AuthStr } })
            for (var post of this.state.list_followingPost) {
                var i = 0;
                if (post.title === followingPost.title) {
                    i += 1;
                    break;
                }
            }
            if (i !== 0) {
                this.setState({
                    list_followingPost: this.state.list_followingPost.filter(item => item.title !== followingPost.title)
                })
                alert("successfully!")
            }
        }
        catch (err) {
            alert(err)
        }

    }


    componentWillMount() {
        this.socket = io('http://localhost:4000');
        this.socket.on('connection', (data) => {
            console.log(data)
        })
        this.socket.on('newNotification2', (response) => {
            //lắng nghe khi có tin nhắn mới  
            this.newNotification2(response)
        });
        this.socket.on('user-connected', (res) => { alert(`${res.user} connected!`) });
        this.socket.on('user-disconnected', (res) => { alert(`${res.user} disconnected!`) });
    }

    newNotification2(value) {
        if (value) {
            this.state.newNotification.push({
                sender: value.sender,
                receiver: value.receiver,
                notification: value.sender + "đã theo dõi bài viết của bạn"
            })
        }
    }

    checkIsFollowPost = (item) => {
        for (var post of this.state.list_followingPost) {
            if (post.id === item) {
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
        console.log(this.state.list_followingPost)
        const post = this.props.post;
        const created_at = String(post.created_at).split('-')[0];
        var cost = this.props.post.cost
        while (/(\d+)(\d{3})/.test(cost.toString())) {
            cost = cost.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
        }
        return (
            <div className="col-md-6">
                {post.isShow === true && <Card className="post-item ">
                    <CardBody className="d-flex">
                        <CardTitle>
                            <div onClick={this.toggleShowModalVisible}>
                                <CardImg className="mb-2 card-img" src={"http://localhost:4000/posts/image/" + post.imgUrl} />
                            </div>
                        </CardTitle>
                        <div className="ml-3" onClick={this.toggleShowModalVisible}>
                            <CardText className="mb-0" style={{ fontSize: 25 }}>{post.title}</CardText>
                            <div className="d-flex">
                                <CardText className="mb-2" style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>{cost} đ</CardText>
                                <div className="d-flex ml-4">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="1.5em" />
                                    <CardText className="mb-2 ml-2" style={{ fontSize: 15 }}>{created_at}</CardText>
                                </div>

                            </div>
                            <div className="d-flex pt-4">
                                <FontAwesomeIcon icon={faUser} size="1.5em" color="blue" />
                                <CardText className="ml-1 pr-2" style={{ fontSize: "15px", borderRight: "0.2px solid grey" }}>{post.author.username}</CardText>
                                <CardText className="ml-2 pr-2" style={{ fontSize: "15px", borderRight: "0.2px solid grey" }}>{post.address}</CardText>
                                {post.isBought === false
                                    ? <CardText href="#" className="ml-2 p-0 rounded" style={{ fontSize: 15, color: "blue" }}>còn hàng</CardText>
                                    : <CardText href="#" className="ml-2 p-0 rounded" style={{ fontSize: 15, color: "red" }}>hết hàng</CardText>}
                            </div>
                        </div>
                        <div className="mt-auto mb-2 ml-auto">
                            {!this.checkIsFollowPost(post.id) ?
                                <FontAwesomeIcon icon={faHeart} size="2.5em" onClick={this.followPost} color="black" />
                                : <FontAwesomeIcon icon={faHeart} size="2.5em" onClick={this.unfollowPost} color="red" />}
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

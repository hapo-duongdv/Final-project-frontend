import React, { Component } from 'react';
import { CardBody, CardText, CardImg, Button, NavLink, Card, } from 'reactstrap';
import EditPost from '../profile/editPost';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalShow from '../profileUser/show';
import avatar from '../../../header/images/member-profile-avatar_140x140.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

export default class PostUser extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        modalEditPostVisible: false,
        modalShowVisible: false,
        posts: [],
        currentUser: [],
        list_followingPost: [],
        isFollowedPost: false,
        newNotification: []
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

    follow = async () => {
        const followingEmail = this.props.post.author.email;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        if (this.state.currentUser.length === 0) {
            alert("Cần đăng nhập")
        } else {
            try {
                const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
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
                        list_followingPost: [...this.state.list_followingPost, followingPost]
                    })
                    this.socket.emit("follow-post", { sender: user.data.username, receiver: this.props.post.author.username })
                    alert("successfully!")
                }
            }
            catch (err) {
                alert(err)
            }
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
                window.location.href = "/profile"
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

    async componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        await axios.get(`http://localhost:4000/users/me/${token}`, { headers: { 'Authorization': AuthStr } })
            .then(response =>
                this.setState({
                    currentUser: response.data,
                })
            )
        await axios.get(`http://localhost:4000/posts/${this.props.post.id}`, { headers: { 'Authorization': AuthStr } })
            .then(response =>
                this.setState({
                    posts: response.data
                })
            )
        const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
        this.setState({
            list_followingPost: user.data.followPosts
        })
    }

    checkIsFollowPost = (item) => {
        for (var post of this.state.list_followingPost) {
            if (post.id === item) {
                return true;
            }
        }
    }

    render() {
        var cost = this.props.post.cost
        while (/(\d+)(\d{3})/.test(cost.toString())) {
            cost = cost.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
        }
        return (
            <div className="col-md-4" style={{ marginTop: 10, marginBottom: 10 }}>
                <Card className="posts">
                    <CardBody>
                        <CardImg className="mb-2" style={{ width: "175px", height: "150px" }} src={"http://localhost:4000/posts/image/" + this.props.post.imgUrl} />
                        <CardText className="mb-2" style={{ fontSize: 18 }}>{this.props.post.title}</CardText>
                        <CardText className="mb-2" style={{ fontSize: 15 }}>{cost} đ</CardText>
                        <div className="d-flex">
                            <CardText className="pr-2" style={{ fontSize: 15, borderRight: "0.2px solid grey" }}>{this.props.post.address}</CardText>
                            <CardText className="ml-2" style={{ fontSize: 15 }}>{this.props.post.status}</CardText>
                        </div>
                        {this.props.post.isBought === false
                            ? <CardText href="#" className="p-0 rounded" style={{ fontSize: 15, color: "blue" }}>còn hàng</CardText>
                            : <CardText href="#" className="p-0 rounded" style={{ fontSize: 15, color: "red" }}>hết hàng</CardText>}

                        <NavLink href="#" className="mb-2 p-0 pr-2" style={{ fontSize: 15 }} onClick={this.toggleShowModalVisible}>Xem thêm</NavLink>
                        <div className="mt-auto mb-2 ml-auto">
                            {!this.checkIsFollowPost(this.props.post.id) ?
                                <FontAwesomeIcon icon={faHeart} size="2.5em" onClick={this.followPost} color="black" />
                                : <FontAwesomeIcon icon={faHeart} size="2.5em" onClick={this.unfollowPost} color="red" />}
                        </div>
                    </CardBody>
                </Card>
                <ModalShow
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleShowModalVisible}
                    post={this.state.posts}
                    author={this.state.posts.author}
                    listFollow={this.props.listFollow}
                    onFollow={this.props.onFollow}
                    onUnfollow={this.props.onUnfollow}
                    isFollowing={this.props.isFollowing}
                ></ModalShow>
            </div>
        )
    }
}

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../css/profile.css'
import avatar from '../../../header/images/member-profile-avatar_140x140.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faPhone, faAddressCard, faCalendarDay, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import PostUser from './postUser';

class ProfileUser extends Component {
    state = {
        user: [],
        posts: [],
        modalEditVisible: false,
    }

    toggleModalEditVisible = () => {
        this.setState({
            modalEditVisible: !this.state.modalEditVisible
        });
    }

    async componentDidMount() {
        const id = queryString.parse(this.props.location.search).q;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const userCurrent = await axios.get(`http://localhost:4000/users/${id}`, { headers: { 'Authorization': AuthStr } })
        console.log(userCurrent)
        this.setState({
            user: userCurrent.data,
            posts: userCurrent.data.posts
        })
    }

    render() {
        const query = queryString.parse(this.props.location.search).q;
        const created_at = (String)(this.state.user.created_at).slice(0, 10)
        if (this.state.user.followers && this.state.user.following) {
            var followers = this.state.user.followers.length;
            var following = this.state.user.following.length;
        }
        return (
            <div className="profile">
                <p>Trang cá nhân của {this.state.user.name}</p>
                <div className="infor d-flex " style={{ backgroundColor: "rgba(0,0,0,0.1", height: "150px" }}>
                    <div className="infor-left col-6 h-100 d-flex flex-row" style={{ borderRight: "0.1px solid white" }}>
                        <div className="avatar p-3">
                            {!this.state.user.avatar || !this.state.user.avatar === null || "" ? <>
                                <img src={avatar} style={{ width: "80px", borderRadius: "50%", }} />
                            </> : <>
                                    <img src={"http://localhost:4000/users/image/" + this.state.user.avatar} style={{ width: "80px", borderRadius: "50%", }} />
                                </>}

                        </div>
                        <div className="p-3">
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{this.state.user.name}</p>
                            <span style={{ fontSize: "13px" }}><strong>{following}</strong> Người theo dõi</span>
                            <span style={{ fontSize: "13px", marginLeft: "12px" }}><strong>{followers}</strong> Đang theo dõi</span>
                        </div>
                    </div>
                    <div className="infor-right col-6 h-100 " style={{ borderRight: "0.1px solid white" }}>
                        <div className="pt-3">
                            <FontAwesomeIcon icon={faAddressCard} size="1.5em" color="grey" />
                            <span><strong style={{ color: "grey", fontWeight: "400" }}>    Địa chỉ: </strong>{this.state.user.address}</span>
                        </div>
                        <div className="pt-1">
                            <FontAwesomeIcon icon={faEnvelopeSquare} size="1.5em" color="grey" />
                            <span><strong style={{ color: "grey", fontWeight: "400" }}>    Email: </strong>{this.state.user.email}</span>
                        </div>
                        <div className="pt-1">
                            <FontAwesomeIcon icon={faPhone} size="1.5em" color="grey" />
                            <span><strong style={{ color: "grey", fontWeight: "400" }}>    Phone: </strong>{this.state.user.phone}</span>
                        </div>
                        <div className="pt-1">
                            <FontAwesomeIcon icon={faCalendarDay} size="1.5em" color="grey" />
                            <span><strong style={{ color: "grey", fontWeight: "400" }}>    Ngày tham gia: </strong>{created_at}</span>
                        </div>
                    </div>
                </div>
                <div className="your-post" style={{ backgroundColor: "rgba(0,0,0,0.1", marginTop: "15px" }}>
                    <p className="p-2"><strong>Bài đăng</strong></p>
                    <div className="container">
                        <div className="row">
                            {this.state.posts === [] ? <>
                                <div className=""><span className="p-2">Bạn chưa đăng tin nào.</span>
                                    <span className="p-2">Bạn có muốn đăng tin?</span>
                                    <div className="post p-2" style={{ backgroundColor: "#fc9807" }}>
                                        <a href="/new-post" style={{ textDecoration: "none" }}>
                                            <FontAwesomeIcon icon={faCartPlus} style={{ color: "white" }} />
                                            <span style={{ marginLeft: "15px", fontWeight: "bold" }}>ĐĂNG TIN</span>
                                        </a>
                                    </div></div>
                            </> : <>
                                    {this.state.posts.map((post, i) => {
                                        return <PostUser
                                            isFollowPost={this.props.listFollowingPost ? this.props.listFollowingPost.indexOf(post.title > -1) : []}
                                            onFollow={this.props.onFollow}
                                            onFollowPost={this.props.onFollowPost}
                                            onUnfollow={this.props.onUnfollow}
                                            author={this.state.user}
                                            post={post} key={i}
                                            listFollow={this.props.listFollowing} />
                                    })}
                                </>
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(ProfileUser)

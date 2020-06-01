import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../css/profile.css'
import avatar from '../../images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faPhone, faAddressCard, faCalendarDay, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CardBody, CardText, CardImg, Button, NavLink, Card, } from 'reactstrap';
import Edit from './edit';
import EditPost from './editPost';

export default class Profile extends Component {
    state = {
        modalEditVisible: false,
        user: [],
        posts: [],
        modalEditPostVisible: false
    }

    toggleModalEditVisibleVisible = () => {
        this.setState({
            modalEditVisible: !this.state.modalEditVisible
        });
    };

    toggleModalEditPostVisibleVisible = () => {
        this.setState({
            modalEditPostVisible: !this.state.modalEditPostVisible
        });
    };

    async componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const user = await axios.get(`http://localhost:4000/users/me/${token}`, { headers: { 'Authorization': AuthStr } })
        const userCurrent = await axios.get(`http://localhost:4000/users/${user.data.id}`, { headers: { 'Authorization': AuthStr } })
        this.setState({
            user: userCurrent.data,
            posts: userCurrent.data.posts
        })
    }

    async delete() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.delete('http://localhost:4000/posts/' + this.state.posts.id,
            { headers: { 'Authorization': AuthStr } }
        )
        if (response.status === 200) {
            alert("deleted!")
        }
        else alert("Error!")
    }

    render() {
        console.log(this.state.user.posts)
        return (
            <div className="profile">
                <p>>>Trang cá nhân của {this.state.user.name}</p>
                <div className="infor d-flex " style={{ backgroundColor: "rgba(0,0,0,0.1", height: "150px" }}>
                    <div className="infor-left col-6 h-100 d-flex flex-row" style={{ borderRight: "0.1px solid white" }}>
                        <div className="avatar p-3">
                            <img src={avatar} style={{ width: "80px", borderRadius: "50%", }} />
                        </div>
                        <div className="p-3">
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{this.state.user.name}</p>
                            <span style={{ fontSize: "13px" }}><strong>0</strong> Người theo dõi</span>
                            <span style={{ fontSize: "13px", marginLeft: "15px" }}><strong>1</strong> Đang theo dõi</span>
                            <button onClick={this.toggleModalEditVisibleVisible} style={{ borderRadius: "5px", marginTop: "10px", fontSize: "13px" }}>Chỉnh sửa thông tin cá nhân</button>
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
                            <span><strong style={{ color: "grey", fontWeight: "400" }}>    Ngày tham gia: </strong>{this.state.user.created_at}</span>
                        </div>
                    </div>
                </div>
                <div className="your-post" style={{ backgroundColor: "rgba(0,0,0,0.1", marginTop: "15px" }}>
                    <p className="p-2"><strong>Bài đăng của bạn</strong></p>
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
                            </> : <> {this.state.posts.map((post, i) => {
                                return <> <div className="col-md-4" style={{ marginTop: 10, marginBottom: 10 }}>
                                    <Card className="posts">
                                        {/* <FontAwesomeIcon icon={faWindowClose} size="3em" color="red" style={{marginLeft: "auto"}} /> */}
                                        <Button onClick={this.delete} style={{ fontSize: "10px", width: "50px", marginLeft: "auto" }} color="danger">XÓA</Button>
                                        <CardBody>
                                            <CardImg className="mb-2" width="90px" height="220px" src={"http://localhost:4000/posts/image/" + post.imgUrl} />
                                            <CardText className="mb-2" style={{ fontSize: 20 }}>{post.title}</CardText>
                                            <CardText className="mb-2" style={{ fontSize: 20 }}>{post.cost} đ</CardText>
                                            <NavLink href="#" className="mb-2 p-0 rounded" style={{ fontSize: 15 }} onClick={this.toggleShowModalVisible}>Xem thêm</NavLink>
                                            <NavLink href="#" className="mb-2 p-0 rounded" style={{ fontSize: 15 }} onClick={this.toggleModalEditPostVisibleVisible}>Chỉnh sửa</NavLink>
                                        </CardBody>
                                    </Card>
                                    < EditPost
                                        visible={this.state.modalEditPostVisible}
                                        onToggle={this.toggleModalEditPostVisibleVisible}
                                        key={i}
                                        post={post} />
                                </div>
                                </>
                            })}
                               
                                </>
                            }
                        </div>
                    </div>
                </div>
                <Edit
                    visible={this.state.modalEditVisible}
                    onToggle={this.toggleModalEditVisibleVisible}
                    key={this.state.user.id}
                    user={this.state.user} />
            </div>
        )
    }
}

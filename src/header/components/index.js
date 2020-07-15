import React, { Component } from 'react';
import { Input, Button, Form, Collapse, Card, CardBody, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/index.css'
import { withRouter } from 'react-router-dom';
import { faListAlt, faBell, faArrowAltCircleDown, faBuilding, faComment } from '@fortawesome/free-regular-svg-icons';
import io from 'socket.io-client';
import axios from 'axios';
import avatarTOT from '../images/chotot-avatar.png'
import activity5 from '../images/activity5.png';
import logo from '../images/logo.PNG'

class Header extends Component {
    state = {
        search: "",
        searchBy: "",
        isOpen: false,
        newNotification: [],
        listNotification: [],
        currentUser: [],
        modal: true,
        user: []
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleEdit = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    searchOnChange = (event) => {
        this.setState({
            search: event.target.value.substr(0, 20)
        })
    }

    onSearchByOnChange = (event) => {
        this.setState({
            searchBy: event.target.value
        })
    }


    onSearch = (event) => {
        event.preventDefault();
        if (this.state.searchBy === "users") {
            this.props.history.push(`/search?q=${this.state.search}`)
        }
        else if (this.state.searchBy === "posts") {
            this.props.history.push(`/searchPost?q=${this.state.search}`)
        }
        else {
            this.props.history.push(`/searchPost?q=${this.state.search}`)
        }
    }

    //Connetct với server nodejs, thông qua socket.io
    componentWillMount() {
        this.socket = io('http://localhost:4000');
        this.socket.on('connection', (data) => {
            console.log(data)
        })
        this.socket.on('newNotification', (response) => {
            //lắng nghe khi có tin nhắn mới  
            this.newNotification(response)
        });
        this.socket.on('newNotification2', (response) => {
            //lắng nghe khi có tin nhắn mới  
            this.newNotification2(response)
        });

        this.socket.on('newNotification-isBought', (response) => {
            //lắng nghe khi có tin nhắn mới  
            this.newNotificationIsBought(response)
        });

        this.socket.on('user-connected', (res) => { alert(`${res.user} connected!`) });
        this.socket.on('user-disconnected', (res) => { alert(`${res.user} disconnected!`) });
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
        await axios.get(`http://localhost:4000/users/${this.state.currentUser.id}`, { headers: { 'Authorization': AuthStr } })
            .then(response =>
                this.setState({
                    user: response.data,
                })
            )
        await axios.get(`http://localhost:4000/notification/find-users/${this.state.currentUser.username}`, { headers: { 'Authorization': AuthStr } })
            .then(response =>
                this.setState({
                    listNotification: response.data,
                })
            )
    }

    newNotification(value) {
        if (value) {
            this.state.newNotification.push({
                sender: value.sender,
                receiver: value.receiver,
                notification: "Bạn đã có thêm 1 lượt theo dõi đến từ " + value.sender
            })
        }
    }
    
    newNotificationIsBought(value) {
        if (value) {
            this.state.newNotification.push({
                sender: value.sender,
                receiver: value.receiver,
                notification: "Bài đăng sản phẩm " + value.posts + " của " + value.sender + " đã được bán"
            })
        }
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

    onLogout = (e) => {
        // e.preventDefault();
        this.props.logout()
        alert("Logout");
        window.location.href = "/"
    }

    render() {
        // console.log(this.state.user.address.length)
        return (
            <header className="header" style={{ backgroundColor: "#ffba00" }}>
                <div className="appWrapper-Layout-container">
                    <div className="appWrapper-Layout-leftPanel ">
                        <a href="/" className="mt-2">
                            <img className="logo" src={logo} alt="Logo" />
                        </a>
                    </div>
                    <div className="appWrapper-Layout-rightPanel">
                        {/* <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faBuilding} />
                            <a href="/" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Trang chủ</a>
                        </div> */}
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faBell} />
                            <a onClick={this.toggle} style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Thông báo</a>
                            {this.state.isOpen && <div className="notification">
                                <div style={{ borderBottom: "0.2px solid #aaaaaa", textAlign: "center", height: "35px", marginTop: "10px" }}>
                                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>Thông báo</span>

                                </div>
                                <div className="d-flex m-2">
                                    <img style={{ width: "50px", height: "50px" }} src={avatarTOT} />
                                    <div>
                                        <div>
                                            {this.state.listNotification.length !== 0 || this.state.newNotification.length !== 0 ? this.state.listNotification.map((item) => {
                                                return <div className="container w-100 d-flex flex-column">
                                                    <div className="row">
                                                        <p style={{ borderBottom: "0.2px solid #aaaaaa" }} className="notification-item ml-3 mr-2 col-12">{item.notification}</p>
                                                    </div>
                                                </div>

                                            }) : <div><p>Bạn chưa có thông báo nào mới.</p></div>}
                                        </div>
                                        <div>
                                            {this.state.newNotification.map((item) => {
                                                return <div className="container w-100 d-flex flex-column">
                                                    <div className="row">
                                                        <p style={{ borderBottom: "0.2px solid #aaaaaa" }} className="notification-item ml-3 mr-2 col-12">{item.notification}</p>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <img style={{ width: "50px", height: "50px" }} src={activity5} />
                                </div>
                            </div>}

                        </div>
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faComment} />
                            <a href="/chat" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Chat</a>
                        </div>
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faArrowAltCircleDown} />
                            <a href="/" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Thêm</a>
                        </div>
                    </div>
                </div>
                <div className="appWrapper-Layout-container" style={{ paddingTop: "5px" }}>
                    <div className="search-box">
                        <Form onSubmit={this.onSearch} style={{ display: "flex" }}>
                            <FormGroup>
                                <Input
                                    style={{ width: "70px", border: "white", height: "37px", marginRight: "-5.5px" }}
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.searchBy}
                                    onChange={this.onSearchByOnChange}>
                                    <option value="">All</option>
                                    <option>users</option>
                                    <option>posts</option>
                                </Input>
                            </FormGroup>
                            <FormGroup> <Input style={{ width: "400px" }} autoComplete="off" value={this.state.search} onChange={this.searchOnChange} placeholder="Tìm kiếm trên Moving Home..." /></FormGroup>
                            <Button style={{ backgroundColor: "white", border: "white", height: "30px", marginLeft: "-60px" }} ><FontAwesomeIcon color="grey" icon={faSearch} /></Button>
                        </Form>
                    </div>
                    <div className="login-modal">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {!this.props.isAuthed ? <>
                            <a href="/login" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Đăng nhập</a>
                        </> : <>
                                <a href="/profile" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>{this.props.authedUser.username}</a>
                                <a href="#" onClick={this.onLogout} style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>| Log out</a>
                            </>}

                    </div>
                    <div className="post" style={{ backgroundColor: "#fc9807", marginLeft: "auto" }}>
                        {this.props.isAuthed === false ? <>
                            <a href="/login" style={{ textDecoration: "none" }}>
                                <FontAwesomeIcon icon={faCartPlus} style={{ color: "white" }} />
                                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>ĐĂNG TIN</span>
                            </a></> :
                            <a href="/new-post" style={{ textDecoration: "none" }}>
                                <FontAwesomeIcon icon={faCartPlus} style={{ color: "white" }} />
                                <span style={{ marginLeft: "15px", fontWeight: "bold" }}>ĐĂNG TIN</span>
                            </a>
                        }

                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header);

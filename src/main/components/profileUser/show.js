import React from 'react';
import { Button, Label, Modal, CardImg, CardText, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretSquareDown, faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import io from 'socket.io-client';

class ModalShow extends React.Component {

    state = {
        currentUser: [],
        newNotification: []
    }

    follow = async () => {
        const followingEmail = this.props.post.author;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        if (this.state.currentUser.length === 0) {
            alert("Cần đăng nhập!")
        } else {
            try {
                const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
                const follow = { "id": user.data.id }
                const res = await axios.post("http://localhost:4000/followers/" + this.props.post.author.id, follow, { headers: { 'Authorization': AuthStr } })
                this.props.onFollow(followingEmail.username);
                if (res.status === 201) {
                    alert("follow success")
                    this.socket.emit("follow", { sender: user.data.username, receiver: this.props.post.author.username })
                }
            }
            catch (err) {
                console.log(err)
                alert(err)
            }
            // window.location.href = "filter"
        }

    }

    unfollow = async () => {
        const followingEmail = this.props.post.author;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        if (this.state.currentUser.length === 0) {
            alert("Cần đăng nhập!")
        } else {
            try {
                const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
                for (var follow of user.data.followers) {
                    const res = await axios.get(`http://localhost:4000/followers/${follow.id}`, { headers: { 'Authorization': AuthStr } })
                    if (res.data.userFollowing.username === followingEmail.username) {
                        const response = await axios.delete(`http://localhost:4000/followers/${res.data.id}`, { headers: { 'Authorization': AuthStr } })
                        if (response.status === 200) {
                            alert("successfully")
                        }
                    }
                }
                this.props.onUnfollow(followingEmail.username);
            }
            catch (err) {
                console.log(err)
                alert(err)
            }
            // window.location.href = "filter"
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
        this.socket.on('user-connected', (res) => { alert(`${res.user} connected!`) });
        this.socket.on('user-disconnected', (res) => { alert(`${res.user} disconnected!`) });
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

    call = async () => {
        return alert("Vui lòng nhắn tin hoặc gọi điện đến: " + this.props.post.author.phone);
    }

    chat = (user) => {
        this.props.history.push(`/chat?user=${user}`)
    }

    render() {
        const post = this.props.post;
        if (this.props.post.author) {
            var author = this.props.post.author;
            var isFollow = this.props.listFollow.indexOf(author.username) === -1;
        }
        return (

            <Modal
                isOpen={this.props.visible}
                className={this.props.className}
            >
                <Container fluid={true} style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                    <Row    >
                        <Col md="6">
                            <CardImg className="mb-2 h-100 w-100" src={"http://localhost:4000/posts/image/" + post.imgUrl} />
                        </Col>
                        <Col md="6" style={{ height: "180px" }}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faUserCircle} size="1.5em" color="blue" />
                                <Label style={{ marginLeft: "5px", marginTop: "8px", marginRight: "50px", fontSize: 13, color: "blue", fontWeight: "bold" }}>Người bán:</Label>
                                {
                                    !isFollow
                                        ? <Button style={{ width: "70px", height: "30px", fontSize: "12px" }} outline color="danger" className=" pr-2" onClick={this.unfollow}>Unfollow</Button>
                                        : <Button style={{ width: "55px", height: "30px", fontSize: "12px" }} outline color="primary" className=" pr-2" onClick={this.follow}>Follow</Button>
                                }
                            </div>
                            <CardText className="text-center mt-2 p-2" style={{ backgroundColor: "rgba(0,0,0,0.1)", height: "40px", fontSize: 15, border: "0.2px solid grey", borderRadius: "5px" }}>{author ? author.email : ""}</CardText>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faCaretSquareDown} size="1.5em" color="blue" />
                                <Label style={{ marginLeft: "5px", marginTop: "8px", marginRight: "50px", fontSize: 13, color: "blue", fontWeight: "bold" }}>Sản phẩm: </Label>
                            </div>
                            <CardText className="text-center mt-2 p-2" style={{ backgroundColor: "rgba(0,0,0,0.1)", height: "40px", fontSize: 15, border: "0.2px solid grey", borderRadius: "5px" }}>{post.title}</CardText>
                        </Col>
                        <Col md="12" className="mt-2" >
                            <ul style={{ fontSize: "20px", paddingLeft: "5px", backgroundColor: "rgba(0, 0, 0, 0.05)", borderBottom: "0.2px solid grey" }}> Thông tin chi tiết :
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faSmileBeam} size="1.5em" color="black" />
                                    <li className="mb-2 ml-3" style={{ fontSize: 15, listStyle: "none" }}><strong>Giá : </strong> {post.cost}đ</li>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faSmileBeam} size="1.5em" color="black" />
                                    <li className="mb-2 ml-3" style={{ fontSize: 15, listStyle: "none" }}><strong>Địa chỉ : </strong> {post.address}</li>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faSmileBeam} size="1.5em" color="black" />
                                    <li className="mb-2 ml-3" style={{ fontSize: 15, listStyle: "none" }}><strong>Loại : </strong>{post.category}</li>

                                </div>
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faSmileBeam} size="1.5em" color="black" />
                                    <li className="mb-2 ml-3" style={{ fontSize: 15, listStyle: "none" }}><strong>Tình trạng : </strong> {post.status}</li>
                                </div>
                            </ul>
                        </Col>
                        <Col md="12" >
                            <ul style={{ fontSize: "20px", paddingLeft: "5px", backgroundColor: "rgba(0, 0, 0, 0.05)", borderBottom: "0.2px solid grey" }}> Mô tả sản phẩm:
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faSmileBeam} size="1.5em" color="black" />
                                    <li className="mb-2 ml-3" style={{ fontSize: 15, listStyle: "none" }}>{post.description}</li>
                                </div>
                            </ul>
                        </Col>
                    </Row>
                    <div className="container">
                        <div className="row">
                            <Button className="col-md-4 pl-2" width="100px" onClick={this.call}> Call </Button>
                            <Button href="/chat" className="col-md-4 p-2" width="auto" color="secondary" >Chat </Button>
                            <Button className="col-md-4 p-2" style={{ float: "right" }} width="auto" color="secondary" onClick={this.props.onToggle} >Cancel </Button>
                        </div>
                    </div>
                </Container>

            </Modal>
        )
    }
}

export default ModalShow;
import React from 'react';
import { Button, Label, Modal, CardImg, CardText, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretSquareDown, faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

class ModalShow extends React.Component {

    state = {
        currentUser: []
    }

    follow = async () => {
        // const followingId = ;
        const followingEmail = this.props.post.author;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        try {
            const user = await axios.get("http://localhost:4000/users/" + this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
            const res = await axios.post("http://localhost:4000/users/follow/" + this.props.post.author.id, user, { headers: { 'Authorization': AuthStr } })
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
            alert("Cannot follow user!")
        }
        window.location.href = "filter"
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

    call = async () => {
        return alert("Please call to: " + this.props.author.phone)
    }

    render() {
        const post = this.props.post;
        const isFollow = this.props.listFollow.indexOf(post.username)
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
                                    isFollow
                                        ? <Button style={{ width: "70px", height: "30px", fontSize: "12px" }} outline color="danger" className=" pr-2" onClick={this.unfollow}>Unfollow</Button>
                                        : <Button style={{ width: "55px", height: "30px", fontSize: "12px" }} outline color="primary" className=" pr-2" onClick={this.follow}>Follow</Button>
                                }
                            </div>
                            <CardText className="text-center mt-2 p-2" style={{ backgroundColor: "rgba(0,0,0,0.1)", height: "40px", fontSize: 15, border: "0.2px solid grey", borderRadius: "5px" }}>{this.props.author.email}</CardText>
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
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import { CardText, Container, Row, Col, NavLink, Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import ModalShow from '../../main/components/posts/show'

class SearchPosts extends Component {
    state = {
        searchResult: [],
        total: 0,
        post: "",
        currentUser: []
    }
    toggleShowModalVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
    };

    follow = async () => {
        // // const followingId = ;
        // const followingEmail = this.props.post.author.email;
        // const token = localStorage.getItem("jwt_token");
        // const AuthStr = 'Bearer ' + token;
        // try {
        //     const res = await axios.post("http://localhost:4000/followers/" + this.props.post.author.id, this.state.currentUser.id, { headers: { 'Authorization': AuthStr } })
        //     // this.props.onFollow(followingEmail);
        //     if (res.status === 201) {
        //         alert("follow success")

        //         return res.data
        //     }
        //     else {
        //         throw Error("Cannot follow!", res);
        //     }
        // }
        // catch (err) {
        //     console.log(err)
        //     alert("Cannot follow post!")
        // }
    }

    followPost = async () => {
        const followingPost = this.props.post;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
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
            alert(err)
        }
        window.location.href = "filter"
    }

    // checkIsFollowPost = (item) => {
    //     for (var post of this.state.list_followingPost) {
    //         if (post.title === item) {
    //             return true
    //         }
    //     }
    // }

    async componentDidMount() {
        this.fetchSearchResult()
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.search !== this.props.location.search) {
            this.fetchSearchResult()
        }
        else {
            this.fetchSearchResult()
        }
    }

    fetchSearchResult = async () => {
        // console.log(queryString.parse(this.props.location.search).q)
        const query = queryString.parse(this.props.location.search).q;
        const res = await axios.get(`http://localhost:4000/posts/search/${query}`);
        if (res.status === 200) {
            this.setState({
                searchResult: res.data,
                total: res.data.length
            });
        }
    }

    // searchProfileUser = async(id) => {
    //     window.location.href = `/profileUser?q=${id}`
    // }

    render() {
        return (
            <div style={{ marginLeft: "20%", backgroundColor: "white", marginRight: "20%" }}>
                <h2>Search result for "{queryString.parse(this.props.location.search).q} " :</h2>
                <small>Có {this.state.total} kết quả tìm được:  </small>
                <Container>
                    <Row>
                        {this.state.searchResult.map((post, i) => {
                            return <Col md="6"> <Card className="post-item ">
                                <CardBody className="d-flex">
                                    <CardTitle>
                                        <div>
                                            <CardImg className="mb-2 card-img" src={"http://localhost:4000/posts/image/" + post.imgUrl} />
                                        </div>
                                    </CardTitle>
                                    <div className="ml-3">
                                        <CardText className="mb-0" style={{ fontSize: 15 }}>{post.title}</CardText>
                                        <div className="d-flex">
                                            <CardText className="mb-2" style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>{post.cost} đ</CardText>
                                            <div className="d-flex ml-4">
                                                <FontAwesomeIcon icon={faCalendarAlt} size="1.5em" />
                                                <CardText className="mb-2 ml-2" style={{ fontSize: 12 }}>{String(post.created_at).split('-')[0]}</CardText>
                                            </div>

                                        </div>
                                        <div className="d-flex pt-4">
                                            <FontAwesomeIcon icon={faUser} size="1.5em" color="blue" />
                                            <CardText className="ml-1 pr-2" style={{ fontSize: "12px", borderRight: "0.2px solid grey" }}>{post.author.username}</CardText>
                                            <CardText className="ml-2 pr-2" style={{ fontSize: "12px", borderRight: "0.2px solid grey" }}>{post.address}</CardText>
                                            <NavLink href="#" className="ml-2 p-0 rounded" style={{ fontSize: 12 }} onClick={this.toggleShowModalVisible}>Xem thêm</NavLink>
                                        </div>
                                    </div>
                                    <div className="mt-auto mb-2 ml-auto">
                                        <FontAwesomeIcon icon={faHeart} size="2.5em" onClick={this.followPost} />
                                    </div>
                                </CardBody>
                            </Card>
                                <ModalShow
                                    visible={this.state.modalShowVisible}
                                    onToggle={this.toggleShowModalVisible}
                                    post={post}
                                    onFollow={this.props.onFollow}
                                    onUnfollow={this.props.onUnfollow}
                                    authedUser={this.props.authedUser}
                                    isFollowing={this.props.isFollowing}
                                    user={this.state.currentUser}
                                ></ModalShow>
                            </Col>
                        })}
                    </Row>
                </Container>

            </div>
        )
    }
}
export default withRouter(SearchPosts)
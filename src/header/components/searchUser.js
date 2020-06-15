import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
// import ListUser from '../ListUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CardText, Container, Row, Col, NavLink } from 'reactstrap'

class Search extends Component {
    state = {
        searchResult: [],
        total: 0,
        user :""
    }
    async componentDidMount() {
        this.fetchSearchResult()
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
        const res = await axios.get(`http://localhost:4000/users/search/${query}`);
        if (res.status === 200) {
            this.setState({
                searchResult: res.data,
                total: res.data.length
            });
        }
    }

    searchProfileUser = async(id) => {
        window.location.href = `/profileUser?q=${id}`
    }

    render() {
        return (
            <div style={{ marginLeft: "25%", backgroundColor: "white", marginRight: "25%" }}>
                <h2>Search result for "{queryString.parse(this.props.location.search).q} " :</h2>
                <small>Có {this.state.total} kết quả tìm được:  </small>
                <Container>
                    <Row>
                        {this.state.searchResult.map((result, i) => {
                            return <Col md="6"> <div className="mt-2 d-flex mb-2" style={{ height: "80px", backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "5px" }}>
                                <img src={"http://localhost:4000/users/image/" + result.avatar} style={{ height: "60px", width: "60px", borderRadius: "50%", marginTop: "10px", marginLeft: "10px" }} />
                                <div>
                                    <div className=" d-flex ml-2 mt-3">
                                        <FontAwesomeIcon icon={faUser} size="1.5em" color="blue" />
                                        <CardText className="ml-1 pr-2" style={{ fontSize: "15px" }}>{result.username}</CardText>
                                    </div>
                                    <div className=" d-flex mt-2">
                                        <CardText className="ml-2 pr-2" style={{ fontSize: "15px", borderRight: "0.2px solid grey" }}>Đã đăng bán {result.posts.length} sản phẩm</CardText>
                                        <NavLink href="#" onClick={() => this.searchProfileUser(result.id)} className="ml-2 p-0 rounded" style={{ fontSize: 15 }}>Xem thêm</NavLink>
                                    </div>
                                </div>
                            </div>
                            </Col>
                        })}
                    </Row>
                </Container>
                < p>{this.state.searchResult.name} </p>
            </div>
        )
    }
}
export default withRouter(Search)
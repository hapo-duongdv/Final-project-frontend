import React, { Component } from 'react';
import axios from 'axios';
import PostItem from './postItem';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, NavLink, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import "../../css/filter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import AdSense from 'react-adsense';
import Ads from '../ads/ads';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';


class Filter extends Component {
    constructor(props) {
        super(props);
        //Khởi tạo state,
        this.state = {
            posts: [],
            filterCategory: "",
            filterAddress: "",
            isOnClick: false,
            ModalCategoryVisible: false,
            ModalCategoryProductVisible: false,
            totalPosts: [],
        }
        this.socket = null;
    }


    toggleFilterModalVisible = () => {
        this.setState({
            ModalCategoryVisible: !this.state.ModalCategoryVisible
        });
    }

    toggleFilterProductModalVisible = () => {
        this.setState({
            ModalCategoryProductVisible: !this.state.ModalCategoryProductVisible
        });
    }

    clicked = () => {
        this.setState({
            isOnClick: !this.state.isOnClick
        })

    }

    unFilter = () => {
        this.setState({
            filterCategory: "",
            filterAddress: ""
        })
        window.location.href = "/filter"
    }

    filter = (val) => {
        this.setState({
            filterCategory: val,
            ModalCategoryProductVisible: !this.state.ModalCategoryProductVisible
        })
    }

    checkFilter = (item) => {
        var filter = {
            category: this.state.filterCategory,
            address: this.state.filterAddress
        }
        if (this.state.filterCategory && this.state.filterAddress) {
            return (item.props.post.category === filter.category && item.props.post.address === filter.address)
        } else {
            return (item.props.post.category === filter.category || item.props.post.address === filter.address)
        }
    }

    filterAddress = (val) => {
        this.setState({
            filterAddress: val,
            ModalCategoryVisible: !this.state.ModalCategoryVisible
        })
    }



    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get(`http://localhost:4000/posts/page?page=1`,
            { headers: { 'Authorization': AuthStr } }
        ).then(response => {
            // console.log("res: ", response.data)
            this.setState({ posts: response.data });
        })
            .catch(function (error) {
                console.log(error);
            })
        axios.get(`http://localhost:4000/posts`,
            { headers: { 'Authorization': AuthStr } }
        ).then(response => {
            // console.log("res: ", response.data)
            this.setState({ totalPosts: response.data });
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    pagination(page) {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get(`http://localhost:4000/posts/page?page=${page}`,
            { headers: { 'Authorization': AuthStr } }
        ).then(response => {
            // console.log("res: ", response.data)
            this.setState({ posts: response.data });
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillReceiveProps() {
        const query = queryString.parse(this.props.location.search).category;
        if (query) {
            this.setState({
                filterCategory: query
            })
        }
    }

    render() {
        const query = queryString.parse(this.props.location.search).category;
        const pageCount = Math.ceil(this.state.totalPosts.length / 4);
        var listPage = []
        for (var i = 1; i <= pageCount; i++) {
            listPage.push(i)
        }
        const demo = () => {
            if (!this.state.isOnClick) {
                if (query) { return <Button color="danger" onClick={this.unFilter}>Bỏ Lọc</Button> }
                return <Button color="primary" onClick={this.clicked}>Lọc</Button>
            }
            else return <Button color="danger" onClick={this.unFilter}>Bỏ Lọc</Button>
        }
        return (
            <div className="filter">
                <div className="filter-address p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-2" style={{ border: "0.2px solid black", borderRadius: "5px", backgroundColor: "white", marginRight: "5px" }}>
                                <a onClick={this.toggleFilterProductModalVisible} style={{ marginTop: "5px" }}>Phân loại sản phẩm <FontAwesomeIcon color="grey" style={{ float: "right", marginTop: "10px" }} icon={faAngleDown} /></a>
                            </div>
                            <div className="col-2" style={{ border: "0.2px solid black", backgroundColor: "white", borderRadius: "5px" }}>
                                <a onClick={this.toggleFilterModalVisible} style={{ marginTop: "5px" }}>Khu vực <FontAwesomeIcon color="grey" style={{ float: "right", marginTop: "10px" }} icon={faAngleDown} /></a>
                            </div>
                            <div className="col-2">
                                {/* {(!this.state.isOnClick) ? <>
                                    <Button color="primary" onClick={this.clicked}>Lọc</Button>
                                </> : <>
                                        <Button color="danger" onClick={this.unFilter}>Bỏ Lọc</Button>
                                    </>
                                } */}
                                {demo()}
                            </div>
                            <div className="col-4">
                                <div className="d-flex">
                                    {this.state.filterCategory &&
                                        <div className="d-flex" style={{ height: "30px", width: "110px", justifyContent: "center" }}>
                                            <FontAwesomeIcon color="red" style={{ float: "right", marginRight: "3px", marginTop: "5px" }} icon={faWindowClose} />
                                            <p style={{ fontSize: "15px", marginTop: "2px", color: "red" }} >{this.state.filterCategory}</p>
                                        </div>
                                    }
                                    {this.state.filterAddress &&
                                        <div className="d-flex" style={{ height: "30px", width: "110px", justifyContent: "center" }}>
                                            <FontAwesomeIcon color="red" style={{ float: "right", marginRight: "3px", marginTop: "5px" }} icon={faWindowClose} />
                                            <p style={{ fontSize: "15px", marginTop: "2px", color: "red" }} >{this.state.filterAddress}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {this.state.isOnClick || query ?
                        <>
                            <div className="row">
                                <br></br>
                                {this.state.totalPosts.map(post =>
                                    <PostItem
                                        key={post.id}
                                        post={post}
                                        isFollowing={this.props.listFollowing.indexOf(post.author.username) === -1}
                                        isFollowPost={this.props.listFollowingPost.indexOf(post.title > -1)}
                                        onFollow={this.props.onFollow}
                                        onFollowPost={this.props.onFollowPost}
                                        onUnfollow={this.props.onUnfollow}
                                        authedUser={this.props.authedUser} />

                                ).filter((item) => this.checkFilter(item)
                                )
                                }
                            </div>
                            <div className="col-4">
                                <Ads />
                                {/* <AdSense.Google
                                    client='ca-pub-7292810486004926'
                                    slot='7806394673'
                                />

                                <AdSense.Google
                                    client='ca-pub-7292810486004926'
                                    slot='7806394673'
                                    style={{ width: 500, height: 300, float: 'left' }}
                                    format=''
                                />

                                <AdSense.Google
                                    client='ca-pub-7292810486004926'
                                    slot='7806394673'
                                    style={{ display: 'block' }}
                                    layout='in-article'
                                    format='fluid'
                                />
    
                                <AdSense.Google
                                    client='ca-pub-7292810486004926'
                                    slot='7806394673'
                                    style={{ display: 'block' }}
                                    format='auto'
                                    responsive='true'
                                    layoutKey='-gw-1+2a-9x+5c'
                                /> */}
                            </div>
                        </> : <>
                            <div className="row">
                                <br></br>
                                {this.state.posts.map(post =>
                                    <PostItem
                                        key={post.id}
                                        post={post}
                                        onFollow={this.props.onFollow}
                                        onUnfollow={this.props.onUnfollow}
                                        onFollowPost={this.props.onFollowPost}
                                        authedUser={this.props.authedUser}
                                        isFollowing={this.props.listFollowing.indexOf(post.author.username) === -1}
                                        isFollowPost={this.props.listFollowingPost.indexOf(post.title > -1)}
                                    />
                                )
                                }
                            </div>
                        </>
                    }
                </div>
                <Modal
                    isOpen={this.state.ModalCategoryProductVisible}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Phân loại sản phẩm</ModalHeader>
                    <ModalBody>
                        <ul value={this.state.filterCategory} style={{ maxHeight: "400px", overflowY: "scroll" }} className="ul" >
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Đồ điện tử")}>Đồ điện tử <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Thời trang")}>Thời trang <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Xe cộ")}>Xe cộ <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Đồ dùng cá nhân")}>Đồ dùng cá nhân <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Đồ gia dụng, nội thất")}>Đồ gia dụng, nội thất <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li >
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Dụng cụ thể thao, giải trí")}>Dụng cụ thể thao, giải trí <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li >
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Sách")}>Sách <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Khác")}>Khác <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li >
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleFilterProductModalVisible}>Cancel</Button>
                        <br></br>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.ModalCategoryVisible}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Phân loại</ModalHeader>
                    <ModalBody>
                        <ul value={this.state.filterAddress} style={{ maxHeight: "400px", overflowY: "scroll" }} className="ul">
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hà Nội")}>Ba Đình <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hồ Chí Minh")}>Bắc Từ Liêm <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Cần Thơ")}>Cầu Giấy <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Đà Nẵng")}>Đống Đa <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hải Dương")}>Hà Đông <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li >
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hải Phòng")}>Hai Bà Trưng <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hưng Yên")}>Hoàn Kiếm <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Quảng Ninh")}>Hoàng Mai <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hà Nam")}>Long Biên <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Thừa Thiên Huế")}>Nam Từ Liêm <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Nam Định")}>Tây Hồ <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Nghệ An")}>Thanh Xuân <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleFilterModalVisible}>Cancel</Button>
                        <br></br>
                    </ModalFooter>
                </Modal>
                <Pagination aria-label="Page navigation example" style={{ marginLeft: "250px" }}>
                    <PaginationItem>
                        <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    {listPage.map((i) => {
                        return <PaginationItem>
                            <PaginationLink href="#" onClick={() => this.pagination(i)}>
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    })}
                    <PaginationItem>
                        <PaginationLink next href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last href="#" />
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }
}
export default withRouter(Filter)

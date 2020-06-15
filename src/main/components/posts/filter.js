import React, { Component } from 'react';
import axios from 'axios';
import PostItem from './postItem';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, NavLink, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import "../../css/filter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

export default class Filter extends Component {
    state = {
        posts: [],
        filterCategory: "",
        filterAddress: "",
        isOnClick: false,
        ModalCategoryVisible: false,
        ModalCategoryProductVisible: false,
        totalPosts: [],
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
            console.log("d")
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

    render() {
        const pageCount = Math.ceil(this.state.totalPosts.length / 3);
        var listPage = []
        for (var i = 1; i <= pageCount; i++) {
            listPage.push(i)
        }
        var filter = {
            category: this.state.filterCategory,
            address: this.state.filterAddress
        }
        console.log(this.state.posts)
        return (
            <div className="filter" style={{ marginLeft: "25%", marginRight: "25%", marginTop: "20px" }}>
                <div className="filter-address p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-4" style={{ border: "0.2px solid black", borderRadius: "5px", backgroundColor: "white", marginRight: "5px" }}>
                                <a onClick={this.toggleFilterProductModalVisible} style={{ marginTop: "5px" }}>Phân loại sản phẩm <FontAwesomeIcon color="grey" style={{ float: "right", marginTop: "10px" }} icon={faAngleDown} /></a>
                            </div>
                            <div className="col-4" style={{ border: "0.2px solid black", backgroundColor: "white", borderRadius: "5px" }}>
                                <a onClick={this.toggleFilterModalVisible} style={{ marginTop: "5px" }}>Tỉnh/Thành phố <FontAwesomeIcon color="grey" style={{ float: "right", marginTop: "10px" }} icon={faAngleDown} /></a>
                            </div>
                            <div className="col-2">
                                {!this.state.isOnClick ? <>
                                    <Button color="primary" onClick={this.clicked}>Lọc</Button>
                                </> : <>
                                        {/* <Button color="primary" onClick={this.clicked}>Lọc</Button> */}
                                        <Button color="danger" onClick={this.unFilter}>Bỏ Lọc</Button>
                                    </>
                                }

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
                    {this.state.isOnClick ?
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
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Đồ ăn, thực phẩm")}>Đồ ăn <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Đồ dùng cá nhân")}>Đồ dùng cá nhân <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Đồ gia dụng, nội thất")}>Đồ gia dụng, nội thất <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li >
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filter.bind(this, "Đồ dùng văn phòng")}>Đồ dùng văn phòng <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
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
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hà Nội")}>Hà Nội <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hồ Chí Minh")}>Hồ Chí Minh <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Cần Thơ")}>Cần Thơ <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Đà Nẵng")}>Đà Nẵng <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hải Dương")}>Hải Dương <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li >
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hải Phòng")}>Hải Phòng <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hưng Yên")}>Hưng Yên <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Quảng Ninh")}>Quảng Ninh <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Hà Nam")}>Hà Nam <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Thừa Thiên Huế")}>Thừa Thiên Huế <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Nam Định")}>Nam Định <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Nghệ An")}>Nghệ An <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Ninh Bình")}>Ninh Bình <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Thái Nguyên")}>Thái Nguyên <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Phú Thọ")}>Phú Thọ <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li className="li">
                                <NavLink style={{ color: "black" }} href="#" onClick={this.filterAddress.bind(this, "Khác")}>Khác <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
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

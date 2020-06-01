import React, { Component } from 'react';
import axios from 'axios';
import PostItem from './postItem';
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, ModalFooter, NavLink } from 'reactstrap';
import "../../css/filter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class Filter extends Component {
    state = {
        posts: [],
        filterCategory: "",
        filterProvince: "",
        isOnClick: false,
        ModalCategoryVisible: false,
        ModalCategoryProductVisible: false,
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

    filter = (val) => {
        this.setState({
            categoryValue: val
        })
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get("http://localhost:4000/posts",
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
        return (

            <div className="filter" style={{ marginLeft: "25%", marginRight: "25%", marginTop: "20px" }}>
                <div className="filter-address">
                    <div className="container">
                        <div className="row">
                            <div className="col-6" style={{ border: "0.2px solid black" }}>
                                {/* <select id="pet-select" className="ml-1" onChange={this.filter} value={this.state.filterCategory}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="Đồ điện tử">Đồ điện tử</option>
                                    <option value="Thời trang">Thời trang</option>
                                    <option value="Đồ dùng cá nhân">Đồ dùng cá nhân</option>
                                    <option value="new">Thời trang</option>
                                    <option value="new">Thời trang</option>
                                </select> */}
                                <a onClick={this.toggleFilterProductModalVisible} style={{ marginTop: "5px" }}>Phân loại sản phẩm <FontAwesomeIcon color="grey" style={{ float: "right", marginTop: "10px" }} icon={faAngleDown} /></a>
                            </div>
                            <div className="col-4" style={{ border: "0.2px solid black" }}>
                                <a onClick={this.toggleFilterModalVisible} style={{ marginTop: "5px" }}>Tỉnh/Thành phố <FontAwesomeIcon color="grey" style={{ float: "right", marginTop: "10px" }} icon={faAngleDown} /></a>
                            </div>
                            <div className="col-2">
                                <Button color="primary" onClick={this.clicked}>Lọc</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {this.state.isOnClick ?
                        <>
                            <div className="row">
                                <br></br>
                                {this.state.posts.map(post =>
                                    <PostItem key={post.id} post={post} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow} authedUser={this.props.authedUser} />
                                ).filter(item => item.props.post.category === this.state.filterCategory)

                                }
                            </div>
                        </> : <>
                            <div className="row">
                                <br></br>
                                {this.state.posts.map(post =>
                                    <PostItem key={post.id} post={post} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow} authedUser={this.props.authedUser} />
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
                        <ul value={this.state.filterCategory} >
                            <li>
                                <NavLink onClick={this.filter.bind(this, "Đồ điện tử")}>Đồ điện tử <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li>
                                <NavLink onClick={this.filter.bind(this, "Thời trang")}>Thời trang <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></NavLink>
                            </li>
                            <li>Đồ dùng cá nhân <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Đồ gia dụng, nội thất <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Dụng cụ thể thao <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Đồ dùng văn phòng <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Đồ ăn, thực phẩm <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Xe cộ <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
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
                        <ul>
                            <li>Hà Nội <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Hải Phòng <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Hải Dương <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Hưng Yên <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Bắc Ninh <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Thái Nguyên <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Vĩnh Phúc <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Phú Thọ <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                            <li>Quảng Ninh <FontAwesomeIcon color="grey" style={{ float: "right" }} icon={faAngleRight} /></li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleFilterModalVisible}>Cancel</Button>
                        <br></br>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

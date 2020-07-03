import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Button, ModalFooter, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import '../../css/newPost.css'
import { withRouter } from 'react-router-dom';


class CreatePost extends Component {
    state = {
        title: "",
        description: "",
        status: "",
        cost: "",
        author: "",
        category: "",
        address: "",
        agreeRoles: false,
        imgFile: null,
        isShow: false,
        isBought: false,
        user: [],
        currentUser: [],
        modal: true
    }


    toggleEdit = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onTitleOnChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    imageOnChange = event => {
        this.setState({
            imgFile: event.target.files[0]
        });
    };

    onDescriptionOnChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    onAddressOnChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    onCategoryOnChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    onStatusOnChange = (event) => {
        this.setState({
            status: event.target.value
        })
    }

    onCostOnChange = (event) => {
        this.setState({
            cost: event.target.value
        })
    }

    onAgreeRolesOnChange = () => {
        this.setState({
            agreeRoles: !this.state.agreeRoles
        })
    }

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    reset = () => {
        this.setState({
            title: "",
            description: "",
            status: "",
            cost: "",
            catgegory: "",
            address: ""
        })
    }

    createPost = async event => {
        event.preventDefault();
        this.toggleLoading();
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('image', this.state.imgFile);
            const image = await axios({
                method: 'post',
                url: 'http://localhost:4000/posts/',
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const post = {
                title: this.state.title,
                description: this.state.description,
                status: this.state.status,
                cost: this.state.cost,
                category: this.state.category,
                imgUrl: image.data.filename,
                address: this.state.address,
                isShow: this.state.isShow,
                isBought: this.state.isBought
            }
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const response = await axios.post("http://localhost:4000/posts/create", post,
                { headers: { 'Authorization': AuthStr } }
            );
            // console.log("res: ", response.data)
            if (response.status === 201) {
                this.reset();
                alert("Bài đăng đã được tạo. Vui lòng chờ kiểm duyệt.")
                window.location.href = "profile"
            }
        }
        catch (err) {
            alert(err)
        }
        this.toggleLoading();
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
    }

    render() {
        return (
            <div className="mx-auto mt-3 pb-2 mb-3 new-post" style={{ width: "800px", backgroundColor: "white" }}>
                <>
                    {this.state.user.length !== 0 && <>  {(!this.state.user.address || !this.state.user.phone) && <Modal isOpen={this.state.modal} toggle={this.toggleEdit}>
                        <ModalHeader toggle={this.toggleEdit}>Cập nhật thông tin</ModalHeader>
                        <ModalBody>Bạn cần điền đầy đủ thông tin cá nhân để có thể đăng bài.</ModalBody>
                        <ModalFooter>
                            <Button color="primary" href="/profile">Edit</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    }
                    </>
                    }
                </>
                <h3 className="pb-20 pt-30 pl-3">Đăng bài</h3>
                <div className="container">

                    <Form onSubmit={this.createPost} onReset={this.reset}>
                        <div className="row">
                            <FormGroup className="col-6">
                                <Label for="exampleName">Tên sản phẩm</Label>
                                <Input type="text" required
                                    name="name"
                                    placeholder="name..."
                                    value={this.state.title}
                                    onChange={this.onTitleOnChange} />
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label for="exampleSelect">Phân loại</Label>
                                <Input type="select"
                                    required
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.category}
                                    onChange={this.onCategoryOnChange}>
                                    <option value="">--Please choose an option--</option>
                                    <option>Sách</option>
                                    <option>Xe cộ</option>
                                    <option>Đồ điện tử</option>
                                    <option>Thời trang</option>
                                    <option>Đồ gia dụng, nội thất</option>
                                    <option>Dụng cụ thể thao, giải trí</option>
                                    <option>Đồ dùng cá nhân</option>
                                    <option>Khác</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label for="exampleDescription">Địa chỉ</Label>
                                <Input type="select" required name="address" placeholder="address..." value={this.state.address}
                                    onChange={this.onAddressOnChange} >
                                    <option value="">--Please choose an option--</option>
                                    <option>Ba Đình</option>
                                    <option>Bắc Từ Liêm	</option>
                                    <option>Cầu Giấy</option>
                                    <option>Đống Đa</option>
                                    <option>Hà Đông</option>
                                    <option>Hai Bà Trưng</option>
                                    <option>Hoàn Kiếm</option>
                                    <option>Hoàng Mai</option>
                                    <option>Long Biên</option>
                                    <option>Nam Từ Liêm</option>
                                    <option>Tây Hồ</option>
                                    <option>Thanh Xuân</option>
                                    <option>Khác</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label for="exampleDescription">Giá</Label>
                                <Input type="text" required name="description" placeholder="cost..." value={this.state.cost}
                                    onChange={this.onCostOnChange} />
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label for="exampleStatus">Tình trạng</Label>
                                <Input type="select" required name="status" placeholder="status...." value={this.state.status}
                                    onChange={this.onStatusOnChange}>
                                    <option value="">--Please choose an option--</option>
                                    <option>Còn mới</option>
                                    <option>Like new 99%</option>
                                    <option>Cũ</option>
                                    <option>Khác</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Input
                                    type="file"
                                    required
                                    name="file"
                                    id="exampleFile"
                                    accept=".png, .jpg"
                                    onChange={this.imageOnChange}
                                />
                                {this.state.imgFile && (
                                    <img
                                        src={URL.createObjectURL(this.state.imgFile)}
                                        alt=""
                                        style={{ height: 200 }}
                                    />
                                )}
                            </FormGroup>
                            <FormGroup className="col-12">
                                <Label for="exampleDescription">Mô tả</Label>
                                <Input type="textarea" style={{ height: "150px" }} name="description" placeholder="description..." value={this.state.description}
                                    onChange={this.onDescriptionOnChange} />
                                {/* <Input /> */}
                            </FormGroup>
                            <FormGroup check className="col-4">
                                <Input type="checkbox"
                                    required
                                    name="check"
                                    id="exampleCheck"
                                    value={this.state.agreeRoles}
                                    onChange={this.onAgreeRolesOnChange} />
                                <Label for="exampleCheck" check>Tôi đồng ý với điều khoản.</Label>
                            </FormGroup>
                            <Button disabled={this.state.loading} outline color="success" className="float-right" type="reset">Nhập lại</Button>
                            <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">Đăng bài</Button>
                        </div>

                    </Form>
                </div>

            </div >
        )
    }
}

export default withRouter(CreatePost)

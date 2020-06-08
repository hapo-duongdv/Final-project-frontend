import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Button } from 'reactstrap';
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
                address: this.state.address
            }
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const response = await axios.post("http://localhost:4000/posts/create", post,
                { headers: { 'Authorization': AuthStr } }
            );
            // console.log("res: ", response.data)
            if (response.status === 201) {
                this.reset();
                alert("created!")
                window.location.href = "profile"
            }
        }
        catch (err) {
            alert(err)
        }
        this.toggleLoading();
    }

    render() {
        // console.log(this.state.imgFile.name);
        return (
            <div className="mx-auto mt-2 new-post" style={{ width: "400px" }}>
                <div className="container">
                    <h3 className="pb-20 pt-30">Create Post</h3>
                    <Form onSubmit={this.createPost} onReset={this.reset}>
                        <FormGroup>
                            <Label for="exampleName">Tên sản phẩm</Label>
                            <Input type="text" required
                                name="name"
                                placeholder="name..."
                                value={this.state.title}
                                onChange={this.onTitleOnChange} />
                        </FormGroup>
                        <FormGroup>
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
                                <option>Đồ ăn, thực phẩm</option>
                                <option>Đồ dùng cá nhân</option>
                                <option>Đồ văn phòng</option>
                                <option>Khác</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDescription">Mô tả</Label>
                            <Input type="text" name="description" placeholder="description..." value={this.state.description}
                                onChange={this.onDescriptionOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDescription">Địa chỉ</Label>
                            <Input type="text" required name="address" placeholder="address..." value={this.state.address}
                                onChange={this.onAddressOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDescription">Giá</Label>
                            <Input type="text" required name="description" placeholder="cost..." value={this.state.cost}
                                onChange={this.onCostOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleStatus">Trạng thái</Label>
                            <Input type="text" required name="status" placeholder="status...." value={this.state.status}
                                onChange={this.onStatusOnChange} />
                        </FormGroup>
                        <FormGroup>
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
                        <FormGroup check>
                            <Input type="checkbox"
                                required
                                name="check"
                                id="exampleCheck"
                                value={this.state.agreeRoles}
                                onChange={this.onAgreeRolesOnChange} />
                            <Label for="exampleCheck" check>Tôi đồng ý với điều khoản.</Label>
                        </FormGroup>
                        
                        <Button disabled={this.state.loading} outline color="success" className="float-right" type="reset">RESET</Button>
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">CREATE</Button>
                    </Form>
                    <Button color="secondary" className="text-white" href="/">BACK</Button>
                </div>

            </div>
        )
    }
}

export default withRouter(CreatePost)

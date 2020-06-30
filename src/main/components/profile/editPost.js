import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, FormGroup, Label, Input, Button, Modal } from 'reactstrap'

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this.onTitleOnChange = this.onTitleOnChange.bind(this);
        this.onStatusOnChange = this.onStatusOnChange.bind(this);
        this.onDescriptionOnChange = this.onDescriptionOnChange.bind(this);
        this.onCostOnChange = this.onCostOnChange.bind(this);
        this.imageOnChange = this.imageOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            status: "",
            description: "",
            cost: "",
            address: "",
            imgFile: null,
            isBought: false,
            check: ""
        }
    }

    onTitleOnChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    onStatusOnChange = (event) => {
        this.setState({
            status: event.target.value
        })
    }

    imageOnChange = event => {
        this.setState({
            imgFile: event.target.files[0]
        });
    };

    onAddressOnChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    onDescriptionOnChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    onCostOnChange = (event) => {
        this.setState({
            cost: event.target.value
        })
    }

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    onIsBoughtOnChange = event => {
        this.setState({
            check: event.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
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
            if (this.state.check === "đã bán") {
                this.setState({
                    isBought: !this.state.isBought
                })
            }
            const obj = {
                title: this.state.title,
                status: this.state.status,
                description: this.state.description,
                cost: this.state.cost,
                address: this.state.address,
                imgUrl: image.data.filename,
                isBought: this.state.isBought
            };
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const response = await axios.put('http://localhost:4000/posts/' + this.props.post.id, obj,
                { headers: { 'Authorization': AuthStr } }
            )
            if (response.status === 200) {
                alert("Post updated!")
            }
        } catch (err) {
            alert(err)
        }

        this.toggleLoading();
        window.location.href = "profile"
    }

    componentDidMount() {
        this.setState({
            title: this.props.post.title,
            description: this.props.post.description,
            status: this.props.post.status,
            cost: this.props.post.cost,
            address: this.props.post.address,
        })
    }

    render() {
        return (

            <Modal
                isOpen={this.props.visible}
                className={this.props.className}>
                <div style={{ padding: 10 }}>
                    <h3 className="pb-20 pt-30">Chỉnh sửa bài đăng</h3>
                    <Form onSubmit={this.onSubmit} >
                        <Row form>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="exampleCity">Tiêu đề</Label>
                                    <Input type="text"
                                        name="name"
                                        value={this.state.title}
                                        onChange={this.onTitleOnChange}
                                        placeholder="Enter title..." />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="exampleAddress">Mô tả</Label>
                            <Input type="text"
                                name="address"
                                placeholder="..."
                                value={this.state.description}
                                onChange={this.onDescriptionOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Trạng thái</Label>
                            <Input type="text"
                                name="email"
                                placeholder="cũ, mới,....."
                                value={this.state.status}
                                onChange={this.onStatusOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePhone">Giá</Label>
                            <Input type="text"
                                name="phone"
                                placeholder="number...."
                                value={this.state.cost}
                                onChange={this.onCostOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePhone">Địa chỉ</Label>
                            <Input type="text"
                                name="phone"
                                placeholder="address...."
                                value={this.state.address}
                                onChange={this.onAddressOnChange} />
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="exampleStatus">Đã bán?</Label>
                            <Input type="select" required name="status" placeholder="status...." value={this.state.check}
                                onChange={this.onIsBoughtOnChange}>
                                <option>còn hàng</option>
                                <option>đã bán</option>

                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePhone">Cập nhật ảnh</Label>
                            <Input
                                type="file"
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
                        <Button disabled={this.state.loading} outline color="secondary" className="float-right" onClick={this.props.onToggle}>CANCEL</Button>
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">EDIT</Button>
                    </Form>
                </div>
            </Modal>

        )
    }
}

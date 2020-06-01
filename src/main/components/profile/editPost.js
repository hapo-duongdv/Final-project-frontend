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
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            status: "",
            description: "",
            cost: ""
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

    async onSubmit(e) {
        e.preventDefault();
        this.toggleLoading();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
        };
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.put('http://localhost:4000/posts/' + this.props.post.id, obj,
            { headers: { 'Authorization': AuthStr } }
        )
        if (response.status === 200) {
            this.reset();
            alert("Post updated!")
        }
        else {
            alert("Failed to update")
        }
        this.toggleLoading();
    }

    reset = () => {
        this.setState({
            title: "",
            description: "",
            status: "",
            cost: "",
        })
    }

    componentDidMount() {
        this.setState({
            title: this.props.post.title,
            description: this.props.post.description,
            status: this.props.post.status,
            cost: this.props.post.cost,
        })
    }

    render() {
        console.log(this.props)
        return (
       
            <Modal
                isOpen={this.props.visible}
                className={this.props.className}>
                <div style={{ padding: 10 }}>
                    <h3 className="pb-20 pt-30">Chỉnh sửa bài đăng</h3>
                    <Form onSubmit={this.onSubmit} onReset={this.reset} >
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
                        <Button disabled={this.state.loading} outline color="secondary" className="float-right" onClick={this.props.onToggle}>CANCEL</Button>
                        <Button disabled={this.state.loading} outline color="warning" className="float-right" type="reset">RESET</Button>
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">EDIT</Button>
                    </Form>
                </div>
            </Modal>

        )
    }
}

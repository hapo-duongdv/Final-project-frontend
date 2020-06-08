import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';
import '../css/newPost.css'


export default class Register extends Component {
    state = {
        name: "",
        username: "",
        password: "",
        address: "",
        email: "",
        phone: "",
        listFollow: "",
        roles: "user",
        agreeRoles: false,
        avatar:""
    }

    onNameOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onUsernameOnChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onPasswordOnChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onAddressOnChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    onEmailOnChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onPhoneOnChange = (event) => {
        this.setState({
            phone: event.target.value
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
            name: "",
            username: "",
            password: "",
            email: "",
            phone: "",
            address: ""
        })
    }

    createPost = async event => {
        event.preventDefault();
        this.toggleLoading();
        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            address: this.state.address,
            email: this.state.email,
            phone: this.state.phone,
            roles: this.state.roles,
            avatar: this.state.avatar
        }
        try {
            const response = await axios.post("http://localhost:4000/users/create", user);
            if (response.status === 201) {
                this.reset();
                alert("Successfully!")
                window.location.href = "login"
            }

        } catch (err) {
            alert(err)
        }

        this.toggleLoading();
    }

    render() {
        return (
            <div className="mx-auto mt-2 new-post" style={{ width: "400px" }}>
                <div className="container">
                    <h3 className="pb-20 pt-30">Register</h3>
                    <Form onSubmit={this.createPost} onReset={this.reset}>
                        <FormGroup>
                            <Label for="exampleName">Họ tên</Label>
                            <Input type="text"
                                required
                                name="name"
                                placeholder="name..."
                                value={this.state.name}
                                onChange={this.onNameOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleName">Tài khoản</Label>
                            <Input type="text"
                                required
                                name="name"
                                placeholder="username..."
                                value={this.state.username}
                                onChange={this.onUsernameOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleName">Mật khẩu</Label>
                            <Input type="password"
                                required
                                name="name"
                                placeholder="password..."
                                value={this.state.password}
                                onChange={this.onPasswordOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDescription">Email</Label>
                            <Input type="email" required name="description" placeholder="email..." value={this.state.email}
                                onChange={this.onEmailOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDescription">Địa chỉ</Label>
                            <Input type="text" required name="description" placeholder="address..." value={this.state.address}
                                onChange={this.onAddressOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleStatus">Số điện thoại</Label>
                            <Input type="text" required name="status" placeholder="phone...." value={this.state.phone}
                                onChange={this.onPhoneOnChange} />
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
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">REGISTER</Button>
                    </Form>
                    <Button color="secondary" className="text-white" href="/">BACK</Button>
                </div>

            </div>
        )
    }
}

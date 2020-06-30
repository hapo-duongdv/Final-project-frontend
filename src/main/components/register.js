import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';
import '../css/register.css';


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
        avatar: ""
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

    register = async event => {
        try {
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
            <div className="mx-auto mt-2 register">
                <h3 className="mt-2 ml-3">Đăng kí</h3>
                <Form onSubmit={this.register} onReset={this.reset}>
                    <div className="container">
                        <div className="row">
                            <FormGroup className="col-12">
                                <Label for="exampleName">Họ tên</Label>
                                <Input type="text"
                                    required
                                    name="name"
                                    placeholder="name..."
                                    value={this.state.name}
                                    onChange={this.onNameOnChange} />
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label for="exampleName">Tài khoản</Label>
                                <Input type="text"
                                    required
                                    name="name"
                                    placeholder="username..."
                                    value={this.state.username}
                                    onChange={this.onUsernameOnChange} />
                            </FormGroup>
                            <FormGroup className="col-6">
                                <Label for="exampleName">Mật khẩu</Label>
                                <Input type="password"
                                    required
                                    name="name"
                                    placeholder="password..."
                                    value={this.state.password}
                                    onChange={this.onPasswordOnChange} />
                            </FormGroup>
                            <FormGroup className="col-12">
                                <Label for="exampleDescription">Email</Label>
                                <Input type="email" required name="description" placeholder="email..." value={this.state.email}
                                    onChange={this.onEmailOnChange} />
                            </FormGroup>
                            <Button disabled={this.state.loading} className="btn-register1" type="submit">Đăng kí</Button>
                            <p className="col-12">Bấm vào đăng ký nghĩa là bạn đã đọc và đồng ý với <a href="/" style={{ color: "rgb(255, 186, 0)" }} >Điều khoản sử dụng của chúng tôi.</a></p>
                            <p className="col-12" style={{ textAlign: "center", fontSize: "13px", color: "#ccc" }}>------------------------------hoặc------------------------------</p>
                            <p className="col-12" style={{ textAlign: "center", fontSize: "15px" }}>
                                Bạn đã có tài khoản? <a href="/login" style={{ color: "rgb(255, 186, 0)" }}>Đăng nhập</a>
                            </p>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

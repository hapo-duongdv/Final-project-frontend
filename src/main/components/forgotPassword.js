import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';
import '../css/register.css';


export default class ForgotPassword extends Component {
    state = {
        username: "",
        password: "",
        email: "",
        confirmPassword: ""
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

    onConfirmPasswordOnChange = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    onEmailOnChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    reset = () => {
        this.setState({
            username: "",
            password: "",
            email: "",
        })
    }

    forgotPassword = async event => {
        try {
            event.preventDefault();
            this.toggleLoading();
            const user = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
            if (this.state.password === this.state.confirmPassword) {
                var numberConfirm = await axios.get(`http://localhost:4000/users/send-email/${this.state.username}`);
                console.log(numberConfirm.data)
                var number = prompt("Vui lòng kiểm tra email để lấy mã:")
                if(number === String(numberConfirm.data)){
                    var response = await axios.put(`http://localhost:4000/users/changePassword/${this.state.username}`, user);
                    console.log(response.status)
                    if (response.status === 200) {
                        this.reset();
                        alert("Change password Successfully")
                        window.location.href = "login"
                    }
                }else {
                    alert("Mã sai")
                }
            }
            else {
                alert("2 mật khẩu phải giống nhau!")
                window.location.href = "forgotPassword"
            }

        } catch (err) {
            alert(err)
        }

        this.toggleLoading();
    }

    render() {
        return (
            <div className="mx-auto mt-2 register">
                <h3 className="mt-2 ml-3">Quên mật khẩu</h3>
                <Form onSubmit={this.forgotPassword} onReset={this.reset}>
                    <div className="container">
                        <div className="row">
                            <FormGroup className="col-12">
                                <Label for="exampleName">Email</Label>
                                <Input type="text"
                                    required
                                    name="name"
                                    placeholder="name..."
                                    value={this.state.email}
                                    onChange={this.onEmailOnChange} />
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
                                <Label for="exampleDescription">Nhập lại mật khẩu</Label>
                                <Input type="password" required name="description" placeholder="confirm password..." value={this.state.confirmPassword}
                                    onChange={this.onConfirmPasswordOnChange} />
                            </FormGroup>
                            <Button disabled={this.state.loading} className="btn-register1" type="submit">Gửi</Button>
                            <p className="col-12 mt-3" style={{ textAlign: "center", fontSize: "15px" }}>
                                Quay lại trang? <a href="/login" style={{ color: "rgb(255, 186, 0)" }}>Đăng nhập</a>
                            </p>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

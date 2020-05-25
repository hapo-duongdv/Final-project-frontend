import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import '../css/login.css'

export default class Login extends Component {

    state = {
        username: "",
        password: "",
        remember_me: false,
    }
    onUsernameOnChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    onPasswordlOnChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    onRemember_meOnChange = () => {
        this.setState({
            remember_me: !this.state.remember_me
        })
    }

    login = async (payload) => {
        try {
            console.log("login")
            let response = await this.props.onLogin(payload);
            if (response.status === 201) {
                alert("Login Succesful");
            } else {
                alert("Invalid username/password!");
            }
        } catch (err) {
            alert(err);
        }
    }

     onLogin = () => {
        this.login(this.state)
    }

    render() {
        return (
            <div className="login">
                <p style={{ textAlign: "center", marginTop: "80px" }}>Đăng nhập</p>
                <Form className="form-login">
                    <FormGroup className>
                        <Label>Username</Label>
                        <br></br>
                        <Input
                            style={{ marginTop: "5px" }}
                            type="text"
                            className="username"
                            value={this.state.username}
                            onChange={this.onUsernameOnChange}
                            placeholder="  nhập tài khoản..."
                        />
                    </FormGroup>
                    <br></br>
                    <FormGroup>
                        <Label>Password</Label>
                        <br></br>
                        <Input
                            style={{ marginTop: "5px" }}
                            onChange={this.onPasswordlOnChange}
                            type="password"
                            className="password"
                            placeholder="  nhập mật khẩu..."
                        />
                    </FormGroup>
                    <br></br>
                    <FormGroup check>
                        <Input type="checkbox" onChange={this.onRemember_meOnChange} /><span style={{ fontSize: "12px" }}>Ghi nhớ tài khoản</span>
                    </FormGroup>
                </Form>
                <Button onClick={this.onLogin} className="btn-login" color="primary">Đăng nhập</Button>
                <Button className="btn-forgotPassword" color="primary">Quên mật khẩu?</Button>
            </div>
        )
    }
}

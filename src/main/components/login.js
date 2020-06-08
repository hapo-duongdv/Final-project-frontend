import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import '../css/login.css';
import { withRouter, Redirect } from 'react-router-dom';


class Login extends Component {

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
                window.location.href="/"
            } else {
                alert("Invalid username/password!");
            }
        } catch (err) {
            alert(err);
        }
    }

    onLogin = (e) => {
        e.preventDefault();
        this.login(this.state)
    }

    render() {
        // console.log(this.props)
        return (
            <div className="login">
                <p style={{ textAlign: "center", marginTop: "30px", fontSize: "25px", fontWeight: "bold" }}>Đăng nhập</p>
                <Form className="form-login" action="">
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
                    <FormGroup check>
                        <Input type="checkbox" onChange={this.onRemember_meOnChange} /><span style={{ fontSize: "12px" }}>Ghi nhớ tài khoản</span>
                    </FormGroup>
                </Form>
                <Button onClick={this.onLogin} className="btn-login" color="primary">Đăng nhập</Button>
                <Button className="btn-forgotPassword" color="primary" >Quên mật khẩu?</Button>
                <p style={{ textAlign: "center", fontSize: "13px", color: "#ccc" }}>------------------------------hoặc------------------------------</p>
                <div className="list-btn" style={{ display: "flex", justifyContent: "between" }} >
                    <div >
                        <Button className="btn-login-fb" color="primary">
                            Đăng nhập bằng   <img src="https://static.chotot.com/storage/SSO_CDN_STAGING/dist/fb.svg" />
                        </Button>
                    </div>
                    <div><Button href="/register" className="btn-register" color="success">Đăng kí</Button></div>
                </div>

            </div>
        )
    }
}

export default withRouter(Login)
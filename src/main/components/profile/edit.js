import React, { Component } from 'react';
import axios from 'axios';
import { Form, Row, Col, FormGroup, Label, Input, Button, Modal } from 'reactstrap'

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onNameOnChange = this.onNameOnChange.bind(this);
        this.onPhoneOnChange = this.onPhoneOnChange.bind(this);
        this.onAddressOnChange = this.onAddressOnChange.bind(this);
        this.onEmailOnChange = this.onEmailOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            position: "",
            age: "",
            roles: "",
            imgFile: null,
        }
    }

    onNameOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }


    imageOnChange = event => {
        this.setState({
            imgFile: event.target.files[0]
        });
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

    onAddressOnChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    async onSubmit(e) {
        try{
            e.preventDefault();
            this.toggleLoading();
            var bodyFormData = new FormData();
            bodyFormData.append('image', this.state.imgFile);
            const image = await axios({
                method: 'post',
                url: 'http://localhost:4000/users/',
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const obj = {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                avatar: image.data.filename,
            };
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const response = await axios.put('http://localhost:4000/users/' + this.props.user.id, obj,
                { headers: { 'Authorization': AuthStr } }
            )
            if (response.status === 200) {
                this.reset();
                alert("User updated!")
            }
        }catch(err){
            console.log(err)
        }
        this.toggleLoading();
        window.location.href = "profile"
    }

    reset = () => {
        this.setState({
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: ""
        })
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            phone: this.props.user.phone,
            address: this.props.user.address,
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.visible}
                className={this.props.className}>
                <div style={{ padding: 10 }}>
                    <h3 className="pb-20 pt-30">Chỉnh sửa thông tin cá nhân</h3>
                    <Form onSubmit={this.onSubmit} onReset={this.reset} >
                        <Row form>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="exampleCity">Name</Label>
                                    <Input type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onNameOnChange}
                                        placeholder="Enter name..." />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="exampleAddress">Address</Label>
                            <Input type="text"
                                name="address"
                                placeholder="1234 Main St..."
                                value={this.state.address}
                                onChange={this.onAddressOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email"
                                name="email"
                                placeholder="abc@hapo.com"
                                value={this.state.email}
                                onChange={this.onEmailOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePhone">Phone</Label>
                            <Input type="text"
                                name="phone"
                                placeholder="phone number...."
                                value={this.state.phone}
                                onChange={this.onPhoneOnChange} />
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleStatus">Cập nhật avatar</Label>
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
                        <Button disabled={this.state.loading} outline color="secondary" className="float-right" onClick={this.props.onToggle}>CANCEL</Button>
                        <Button disabled={this.state.loading} outline color="warning" className="float-right" type="reset">RESET</Button>
                        <Button disabled={this.state.loading} outline color="primary" className="float-right" type="submit">EDIT</Button>
                    </Form>
                </div>
            </Modal>

        )
    }
}

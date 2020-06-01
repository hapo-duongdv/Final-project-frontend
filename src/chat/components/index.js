import React from 'react';
import $ from 'jquery';
import Messages from './mesage-list';
import Input from './input';
import _map from 'lodash/map';
import io from 'socket.io-client';
import axios from 'axios';
import '../css/chat.css';
import { Button, InputGroup } from 'reactstrap';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo state,
        this.state = {
            messages: [], // danh sách tin nhắn
            user: [],// người dùng hiện tại, nếu rỗng sẽ hiển thị form login, có sẽ hiển thị phòng chat
            userOnline: [], // danh sách người dùng đang online
            newUser: []
        }
        this.socket = null;
    }

    async componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const user = await axios.get(`http://localhost:4000/users/me/${token}`, { headers: { 'Authorization': AuthStr } })
        const userCurrent = await axios.get(`http://localhost:4000/users/${user.data.id}`, { headers: { 'Authorization': AuthStr } })
        this.setState({
            user: userCurrent.data
        })

    }


    //Connetct với server nodejs, thông qua socket.io
    componentWillMount() {
        // console.log(this.state.user)
        this.socket = io('http://localhost:4000');
        this.socket.on('connection', (data) => {
            console.log(data)
        })
        this.socket.on('newMessage', (response) => { this.newMessage(response) }); //lắng nghe khi có tin nhắn mới
        this.socket.on('updateUesrList', (response) => { this.setState({ userOnline: response }) }); //update lại danh sách người dùng online khi có người đăng nhập hoặc đăng xuất
        this.socket.on('user-connected', (res) => { alert(`${res.user} connected`) }); //lắng nghe khi có tin nhắn mới
    }
    newUser() {
        var name = prompt("Who are you?");
        console.log(name)
        if (name) {
            this.socket.emit('new-user', { user: name })
            // e.value = "";
        }
    }



    //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
    newMessage(m) {

        const messages = this.state.messages;
        let ids = _map(messages, 'id');
        let max = Math.max(...ids);
        if (m) {
            messages.push({
                id: max + 1,
                userId: m.id,
                message: m.user.data,
                userName: m.username
            });
        }
        console.log(this.state.messages)
        let objMessage = $('.messages');
        if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
            this.setState({ messages });
            objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

        } else {
            this.setState({ messages });
            if (m.id === this.state.user) {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
            }
        }
    }
    //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn và người gửi
    sendnewMessage(m) {
        if (m.value) {
            this.socket.emit("sendMessage", { data: m.value, user: m.user }); //gửi event về server
            m.value = "";
        }
    }


    render() {
        return (
            <div className="app__content" style={{ height: "600px" }}>
                <Button onClick={this.newUser}>Nhập tên</Button>
                {/* <Input sendMessage={this.newUser.bind(this)} /> */}
                {/* kiểm tra xem user đã tồn tại hay chưa, nếu tồn tại thì render form chat, chưa thì render form login */}
                {this.state.user.id && this.state.user.username ?
                    <div className="chat_window" style={{ marginTop: "50px" }}>
                        {/* danh sách user online */}
                        <div className="menu">

                            <ul className="user">
                                <span onClick={this.newUser} className="user-name">{this.state.user.username}</span>
                                <p>Online</p>
                                {this.state.userOnline.map(item =>
                                    <li key={item.id}><span>{item.name}</span></li>
                                )}
                            </ul>
                        </div>
                        {/* danh sách message */}
                        <div className="content">
                            <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing} />
                            {/* <Input sendMessage={this.sendnewMessage.bind(this)} /> */}
                            <Input sendUser={this.newUser.bind(this)} />
                        </div>

                    </div>
                    :

                    <div className="login_form" style={{ marginLeft: "300px" }}>{/* form login */}
                        <p>Bạn cần đăng nhập để tiếp tục !</p>
                        <Button href="/login" color="primary">Login</Button>
                    </div>
                }
            </div>
        )
    }
}
import React from 'react';
import $ from 'jquery';
import Messages from './mesage-list';
import Input from './input';
import _map from 'lodash/map';
import io from 'socket.io-client';
import axios from 'axios';
import '../css/chat.css';
import { Button } from 'reactstrap';
import queryString from 'query-string'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import avatarUser from '../../header/images/member-profile-avatar_140x140.png'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo state,
        this.state = {
            messages: [], // danh sách tin nhắn
            user: [],// người dùng hiện tại, nếu rỗng sẽ hiển thị form login, có sẽ hiển thị phòng chat
            userOnline: [], // danh sách người dùng đang online
            newUser: [],
            room: "",
            chatHistory: [],
            listUser: [],
            inforUserChat: []
        }
        this.socket = null;
    }

    async componentDidMount() {
        const userChat = queryString.parse(this.props.location.search).user;
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const user = await axios.get(`http://localhost:4000/users/me/${token}`, { headers: { 'Authorization': AuthStr } })
        const userCurrent = await axios.get(`http://localhost:4000/users/${user.data.id}`, { headers: { 'Authorization': AuthStr } })
        this.setState({
            user: userCurrent.data
        })
        const chatHistory = await axios.get(`http://localhost:4000/chat/find/${userCurrent.data.username}/${userChat}`, { headers: { 'Authorization': AuthStr } })
        this.setState({
            chatHistory: chatHistory.data
        })

        const listUsers = await axios.get(`http://localhost:4000/chat/find-users/${userCurrent.data.username}`, { headers: { 'Authorization': AuthStr } })
        for (let data of (listUsers.data)) {
            if (data.sender === userCurrent.data.username) {
                if (this.state.inforUserChat.indexOf(data.receiver) === -1 && this.state.listUser.indexOf(data.receiver) === -1) {
                    var inforUserChat = await axios.get(`http://localhost:4000/users/find-chat/${data.receiver}`, { headers: { 'Authorization': AuthStr } })
                    this.setState({
                        listUser: [...this.state.listUser, data.receiver],
                        inforUserChat: [...this.state.inforUserChat, inforUserChat.data]
                    })
                }
            }
        }
        for (let chat of (listUsers.data)) {
            if (chat.receiver === userCurrent.data.username) {
                if (this.state.inforUserChat.indexOf(chat.sender) === -1 && this.state.listUser.indexOf(chat.sender) === -1) {
                    var inforUserChat = await axios.get(`http://localhost:4000/users/find-chat/${chat.sender}`, { headers: { 'Authorization': AuthStr } })
                    this.setState({
                        listUser: [...this.state.listUser, chat.sender],
                        inforUserChat: [...this.state.inforUserChat, inforUserChat.data]
                    })
                }

            }
        }

    }


    //Connetct với server nodejs, thông qua socket.io
    componentWillMount() {
        // console.log(this.state.user)
        this.socket = io('http://localhost:4000');
        this.socket.on('connection', (data) => {
            console.log(data)
        })
        this.socket.on('newMessage', (response) => {   //lắng nghe khi có tin nhắn mới  
            this.newMessage(response)
        });
        this.socket.on('updateUesrList', (response) => { this.setState({ userOnline: response }) }); //update lại danh sách người dùng online khi có người đăng nhập hoặc đăng xuất
        this.socket.on('user-connected', (res) => { alert(`${res.user} connected!`) });
        this.socket.on('user-disconnected', (res) => { alert(`${res.user} disconnected!`) });
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
                message: m.sender + " : " + m.message,
                sender: m.sender
            })
        }
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
            this.socket.emit("sendMessage", { receiver: queryString.parse(this.props.location.search).user, sender: this.state.user.username, room: queryString.parse(this.props.location.search).user + this.state.user.username, message: m.value }); //gửi event về server
            m.value = "";
        }
    }

    changeRoom = (username) => {
        window.location.href = `/chat?user=${username}`
    }

    call(phone) {
        alert("Vui lòng nhắn tin hoặc gọi điện đến: " + phone);
    }

    searchProfileUser(id) {
        window.location.href = `http://localhost:3000/profileUser?q=${id}`
    }

    render() {
        const userChat = queryString.parse(this.props.location.search).user
        return (
            <div className="app__content" style={{ height: "600px" }}>
                {/* kiểm tra xem user đã tồn tại hay chưa, nếu tồn tại thì render form chat, chưa thì render form login */}
                {this.state.user.id && this.state.user.username ?
                    <div className="d-flex">
                        {/* danh sách user online */}
                        < div className="menu" style={{}}>
                            <p className="user-name" style={{ textAlign: "center", height: "30px", marginTop: "10px", borderBottom: "0.1px solid rgba(0,0,0,0.1)" }}>DANH SÁCH CHAT CỦA <b>{this.state.user.username}</b></p>
                            {this.state.inforUserChat.map(item =>
                                <div className="d-flex aligin-items-center ml-3" style={{ borderBottom: "0.1px solid rgba(0,0,0,0.1)" }} >
                                    <div className="d-flex aligin-items-center ml-3" onClick={() => this.changeRoom(item.username)}>
                                        {!item.avatar
                                            ? <img style={{ borderRadius: "50%", width: "40px", height: "40px" }} src={avatarUser} />
                                            : <img style={{ borderRadius: "50%", width: "40px", height: "40px" }} src={"http://localhost:4000/users/image/" + item.avatar} />
                                        }

                                        <p style={{ fontSize: "18px", marginLeft: "10px", marginTop: "5px" }}>{item.username}</p>
                                    </div>
                                    <Button outline color="primary" style={{ width: "40px", height: "10px", fontSize: "15px" }} className="ml-auto h-50" onClick={() => this.call(item.phone)}><FontAwesomeIcon icon={faPhoneAlt} /></Button>
                                    <Button outline color="success" style={{ width: "40px", height: "10px", fontSize: "15px" }} className=" mr-2 ml-2 h-50" onClick={() => this.searchProfileUser(item.id)}><FontAwesomeIcon icon={faUserCircle} /></Button>
                                </div>

                            )}
                        </div>
                        <div className="chat_window" style={{ marginTop: "10px" }}>
                            {/* danh sách message */}
                            {userChat && <div className="content">
                                {this.state.chatHistory.length !== 0 && <Messages user={this.state.user} history={this.state.chatHistory.length !== 0} messages={this.state.chatHistory} typing={this.state.typing} />}
                                <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing} />
                                <Input sendMessage={this.sendnewMessage.bind(this)} />
                            </div>}
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

export default withRouter(Chat)

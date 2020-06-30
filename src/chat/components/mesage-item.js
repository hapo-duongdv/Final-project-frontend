import React from 'react';

export default class MessageItem extends React.Component {
    render() {
        console.log(this.props.user)
        return (
            <li className={"d-flex aligin-items-center", this.props.isUser ? "message right appeared" : "message left appeared"}>
                <div>
                    <img className="avatar" src={"http://localhost:4000/users/image/" + this.props.user.avatar} />
                </div>
                <div className="text_wrapper" style={{ maxWidth: "50%" }}>
                    <div className="text">
                        {this.props.history ? <> {this.props.userChat}: {this.props.message} </> : <>{this.props.message}</>}
                    </div>
                </div>
            </li>
        )
    }
}
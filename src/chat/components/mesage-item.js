import React from 'react';
import avatarUser from '../../header/images/member-profile-avatar_140x140.png'

export default class MessageItem extends React.Component {
    render() {
        return (
            <li className={"d-flex aligin-items-center", this.props.isUser ? "message right appeared" : "message left appeared"}>
                <div>
                    {this.props.isUser
                        ? <img className="avatar" src={"http://localhost:4000/users/image/" + this.props.user.avatar} />
                        : <img className="avatar" src={avatarUser} />}

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
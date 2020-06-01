import React from 'react';

export default class MessageItem extends React.Component {
    render () {
        return (
            <li className={this.props.isUser? "message right appeared": "message left appeared"}>
                <div className="avatar">
                    
                </div>
                <div className="text_wrapper">
                    <div className="text"><b style={{marginLeft:"auto"}}>{this.props.user.username}</b><br></br>{this.props.message}</div>
                </div>
            </li>
        )
    }
}
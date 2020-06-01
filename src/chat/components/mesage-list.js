import React from 'react';
import Item from './mesage-item';

// import './message-list.scss'


export default class MessageList extends React.Component {
    render () {
        return (
            <ul className="messages clo-md-5">
                {this.props.messages.map(item =>
                    <Item user={this.props.user} key={item.id} isUser={item.userId === this.props.user.id ? true : false} message={item.message}/>
                )}   
            </ul>
        )
    }
}
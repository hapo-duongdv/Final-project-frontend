import React from 'react';

export default class MessageItem extends React.Component {
    render() {
        console.log(this.props.history)
        return (
            <li className={this.props.isUser ? "message right appeared" : "message left appeared"}>
                <div className="avatar">

                </div>
                <div className="text_wrapper">
                    <div className="text">
                        <br></br>
                        {this.props.history ? <> {this.props.userChat}: {this.props.message} </> : <>{this.props.message}</>}
                    </div>
                </div>
            </li>
        )
    }
}
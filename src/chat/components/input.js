import React from 'react';
// import { Input } from 'reactstrap'

export default class Input extends React.Component {

  state = {
    imgFile: null,
  }

  checkEnter(e) {
    // console.log(e)
    if (e.keyCode === 13) {
      this.props.sendMessage(this.refs.messageInput);
    }
  }

  imageOnChange = event => {
    this.setState({
      imgFile: event.target.files[0]
    });
  };
  render() {

    return (
      <div className="">
        <div className="bottom_wrapper d-flex aligin-items-center">
          <div className="message_input_wrapper">
            <input ref="messageInput" type="text" className="message_input" placeholder="Type your message here" onKeyUp={this.checkEnter.bind(this)} />
          </div>
          <div className="mt-2" style={{ width: "88px" }}>
            {/* <Input
              ref="messageInput"
              type="file"
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
            )} */}
          </div>
          <div className="send_message" onClick={() => this.props.sendMessage(this.refs.messageInput)} ref="inputMessage" >
            <div className='icon'></div>
            <div className='text'>Send</div>
          </div>
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react'
import {Form, Input} from 'reactstrap';

export default class CommentForm extends Component {

  state = {
    value: ""
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    })
  }

  submit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.submit}>
          <Input type="text" value={this.state.value} onChange={this.onChange} />
        </Form>
      </div>
    )
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import Show from './show'
import { Button } from 'reactstrap';

class TableRow extends Component {
    state = {
        modalEditVisible: false,
        modalShowVisible: false
    }
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

    }
    async delete() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        const response = await axios.delete('http://localhost:4000/users/' + this.props.obj.id,
            { headers: { 'Authorization': AuthStr } }
        )
        if (response.status === 200) {
            alert("deleted!")
        }
        else alert("Error!")
    }

    toggleModalEditVisibleVisible = () => {
        this.setState({
            modalEditVisible: !this.state.modalEditVisible
        });
    };

    toggleModalShowVisibleVisible = () => {
        this.setState({
            modalShowVisible: !this.state.modalShowVisible
        });
    };

    render() {
        // console.log(this.props.obj.projects)
        return (
            <>
                <tr>
                    <th scope="row">{this.props.obj.id}</th>
                    <td onClick={this.toggleModalShowVisibleVisible}>{this.props.obj.name}</td>
                    <td>{this.props.obj.email}</td>
                    <td>{this.props.obj.phone}</td>
                    <td>{this.props.obj.address}</td>
                    <td>
                        <Button className="btn btn-success   mr-3">SHOW</Button>
                        <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                    </td>


                </tr>
                <Show
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleModalShowVisibleVisible}
                    key={this.props.obj.id}
                    posts= {this.props.obj.posts}
                    user={this.props.obj} />
            </>
        );
    }
}

export default TableRow;

import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './tableRow';
import { Button, Table } from 'reactstrap';
// import '../../../css/member.css'

export default class ManagementMembers extends Component {
    constructor(props) {
        super(props);
        this.state = { persons: [] };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/users', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                console.log(response.data);
                this.setState({ persons: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    tabRow() {
        return this.state.persons.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="body mt-3" style={{ marginLeft: "260px", width: "1000px" }}>
                <h3 className="pb-20">Management members</h3>
                <div className="d-flex">
                    <Button color="link" href="/admin-users">MEMBERS </Button>
                    <p className="mt-2">/</p>
                    <Button color="link" href="/admin-posts">POSTS </Button>
                </div>

                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

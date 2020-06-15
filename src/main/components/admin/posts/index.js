import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './tableRow';
import { Button, Table } from 'reactstrap';
// import '../../../css/member.css'

export default class ManagementPosts extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get('http://localhost:4000/posts', { headers: { 'Authorization': AuthStr } })
            .then(response => {
                console.log(response.data);
                this.setState({ posts: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    tabRow() {
        return this.state.posts.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="body mt-3" style={{ marginLeft: "260px", width: "1000px" }}>
                <h3 className="pb-20">Management posts</h3>
                <div className="d-flex">
                    <Button color="link" href="/admin-posts">POSTS </Button>
                    <p className="mt-2">/</p>
                    <Button color="link" href="/admin-users">MEMBERS </Button>
                </div>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Cost</th>
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

import React, { Component } from 'react';
import axios from 'axios';
import PostItem from './postItem';

export default class Filter extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt_token");
        const AuthStr = 'Bearer ' + token;
        axios.get("http://localhost:4000/posts",
            { headers: { 'Authorization': AuthStr } }
        ).then(response => {
            // console.log("res: ", response.data)
            this.setState({ posts: response.data });
        })
            .catch(function (error) {
                console.log(error);
            })

    }
    render() {
        // console.log(this.state.posts)
        return (
            <div className="filter" style={{ marginLeft: "25%" }}>
                <div className="container">
                    <div className="row">
                        {this.state.posts.map((post, i) => {
                            return <PostItem post={post} key={i} authedUser={this.props.authedUser} onFollow={this.props.onFollow} onUnfollow={this.props.onUnfollow} isFollowing={this.props.listFollowing.indexOf(post.author.email) > -1} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

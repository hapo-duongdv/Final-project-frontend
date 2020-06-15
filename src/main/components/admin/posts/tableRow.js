import React, { Component } from 'react';
import axios from 'axios';
import Show from './show'
import { Button } from 'reactstrap';

class TableRow extends Component {
    state = {
        modalEditVisible: false,
        modalShowVisible: false,
        isShow :false
    }
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.showPosts = this.showPosts.bind(this);

    }
    async delete() {
        try{
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            const response = await axios.delete('http://localhost:4000/posts/' + this.props.obj.id,
                { headers: { 'Authorization': AuthStr } }
            )
            if (response.status === 200) {
                alert("deleted!")
                window.location.href ="/admin-posts"
            }
        }catch(err){
            alert(err)
        }
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

    async showPosts()  {
        try {
            const token = localStorage.getItem("jwt_token");
            const AuthStr = 'Bearer ' + token;
            console.log(this.props.obj.id)
            const post = {
                isShow: !this.props.obj.isShow
            }
            const res = await axios.put('http://localhost:4000/posts/'+this.props.obj.id, post, { headers: { 'Authorization': AuthStr } })
            console.log(res)
            if(res.status === 200){
                window.location.href = "/admin-posts"
                alert(" Post showed")
            }
        }catch(err){
            alert(err)
        }
       
    }

    render() {
        // console.log(this.props.obj)
        return (
            <>
                <tr>
                    <th scope="row">{this.props.obj.id}</th>
                    <td onClick={this.toggleModalShowVisibleVisible}>{this.props.obj.title}</td>
                    <td>{this.props.obj.address}</td>
                    <td>{this.props.obj.status}</td>
                    <td>{this.props.obj.cost} đ</td>
                    <td>
                        {this.props.obj.isShow ? <>
                            <Button onClick={this.showPosts} className="btn btn-warning mr-3">UNSHOW</Button>
                        </> : <>
                                <Button onClick={this.showPosts} className="btn btn-success mr-3">SHOW</Button>
                            </>}
                        <Button onClick={this.delete} className="btn btn-danger">Delete</Button>
                    </td>


                </tr>
                <Show
                    visible={this.state.modalShowVisible}
                    onToggle={this.toggleModalShowVisibleVisible}
                    key={this.props.obj.id}
                    posts={this.props.obj} />
            </>
        );
    }
}

export default TableRow;

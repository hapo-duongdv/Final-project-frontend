import React from 'react';
import { Button, Form, FormGroup, Label, Modal, CardImg, CardText } from 'reactstrap';
// import axios from "axios"
// import { follow, unfollow } from '../../actions/user'

class ModalShow extends React.Component {

    // follow = async () => {
    //     try {
    //         const res = await follow(this.props.post.email, this.props.authedUser.email)
    //         this.props.onFollow(res.follower);

    //     }
    //     catch (err) {
    //         alert("Cannot follow!!!!")

    //     }
    // }

    // unfollow = async () => {
    //     try {
    //         const res = await unfollow(this.props.post.email, this.props.authedUser.email)
    //         this.props.onUnfollow(res.follower);
    //     }
    //     catch (err){
    //         alert ("cannot unfollow!!!")
    //     } 
    // }

    call = async () => {
        // const { post } = this.props.post;
        // console.log("post: ", this.props)
        return alert("Call to: " + this.props.post.author.phone)
    }

    render() {
        const post = this.props.post;
        // console.log(this.props)
        return (

            <Modal
                isOpen={this.props.visible}
                // toggle={this.props.onToggle}
                className={this.props.className}
            >
                <Form >
                    <FormGroup>
                        <CardImg className="mb-2" src={"http://localhost:4000/posts/image/"+post.imgUrl} />
                    </FormGroup>
                    <FormGroup className='rounded'>
                        <Label className=" ml-3" style={{ color: 'green', fontWeight: 'bold', paddingRight : 10, fontSize : 30 }} for="exampleEmail">Email : {post.author.email}</Label>
                        {
                            this.props.isFollowing
                                ? <Button width="15px" height="10px" outline color="danger" className=" pr-2" onClick={this.unfollow}>Unfollow</Button>
                                : <Button width="15px" height="10px" outline color="primary" className=" pr-2" onClick={this.follow}>Follow</Button>
                        }
                    </FormGroup>
                    <br></br>
                    <FormGroup>
                        <CardText className="mb-2 ml-3" style={{ fontSize: 20 }}> Tiêu đề : {post.title}</CardText>
                    </FormGroup>
                    <FormGroup>
                        <CardText className="mb-2 ml-3" style={{ fontSize: 20 }}> Giá : {post.cost}đ</CardText>
                    </FormGroup>
                    <FormGroup>
                        <CardText className="mb-2 ml-3" style={{ fontSize: 20 }}> Địa chỉ : {post.address}</CardText>
                    </FormGroup>
                    <FormGroup>
                        <CardText className="mb-2 ml-3" style={{ fontSize: 20 }}> Loại : {post.category}</CardText>
                    </FormGroup>
                    <FormGroup>
                        <CardText className="mb-2 ml-3" style={{ fontSize: 20 }}> Tình trạng : {post.status}</CardText>
                    </FormGroup>
                    <FormGroup>
                        <CardText className="mb-2 ml-3" style={{ fontSize: 20 }}> Mô tả : {post.description}</CardText>
                    </FormGroup>
                    <div className="container">
                    <div className ="row">
                    <Button className="col-md-4 pl-2" width="100px" onClick={this.call}> Call </Button>
                    <Button href ="/chat" className="col-md-4 p-2" width="auto" color="secondary" >Chat </Button>
                    <Button className="col-md-4 p-2" style={{float: "right"}} width="auto" color="secondary" onClick={this.props.onToggle} >Cancel </Button>
                    </div>
                    </div>
                </Form>
            </Modal>
        )
    }
}

export default ModalShow;
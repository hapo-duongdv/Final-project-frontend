import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/index.css'
import { withRouter } from 'react-router-dom';
import { faListAlt , faBell, faArrowAltCircleDown, faBuilding, faComment } from '@fortawesome/free-regular-svg-icons';

// library.add(fal);

class Header extends Component {
    state = {
        search: ""
    }

    searchOnChange = (event) => {
        this.setState({
            search: event.target.value.substr(0, 20)
        })
    }

    onSearch = (event) => {
        event.preventDefault();
        this.props.history.push(`/search?q=${this.state.search}`)
    }

    onLogout = (e) => {
        // e.preventDefault();
        this.props.logout()
        alert("Logout");
        window.location.href="/"
    }

    render() {
        // console.log(this.props)
        return (
            <header className="header" style={{ backgroundColor: "#ffba00" }}>
                <div className="appWrapper-Layout-container">
                    <div className="appWrapper-Layout-leftPanel"  >
                        <img href="/" className="logo" src="https://static.chotot.com/storage/marketplace/transparent_logo.png" alt="Logo" />
                    </div>
                    <div className="appWrapper-Layout-rightPanel">
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faBuilding} />
                            <a href="/" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Trang chủ</a>
                        </div>
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faListAlt} />
                            <a href="/" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Tôi bán</a>
                        </div>
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faComment} />
                            <a href="/chat" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Chat</a>
                        </div>
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faBell} />
                            <a href="/" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Thông báo</a>
                        </div>
                        <div className="icon-Layout-rigtPanel">
                            <FontAwesomeIcon icon={faArrowAltCircleDown} />
                            <a href="/" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Thêm</a>
                        </div>
                    </div>
                </div>
                <div className="appWrapper-Layout-container" style={{ paddingTop: "20px" }}>
                    <div className="search-box">
                        <Form onSubmit={this.onSearch} style={{ display: "flex" }}>
                            <Input value={this.state.search} onChange={this.searchOnChange} placeholder="  Tìm kiếm trên chợ tốt...." />
                            <Button style={{ marginLeft: "-40px", backgroundColor: "white", border: "white" }} ><FontAwesomeIcon color="grey" icon={faSearch} /></Button>
                        </Form>
                    </div>
                    <div className="login-modal">
                        <FontAwesomeIcon icon={faUserCircle} />
                        {!this.props.isAuthed ? <>
                            <a href="/login" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>Đăng nhập</a>
                        </> : <>
                                <a href="/profile" style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>{this.props.authedUser.username}</a>
                                <a href="#" onClick={this.onLogout} style={{ marginLeft: "5px", textDecoration: "none", color: " black" }}>/ Log out</a>
                            </>}

                    </div>
                    <div className="post" style={{ backgroundColor: "#fc9807", marginLeft: "auto" }}>
                        <a href="/new-post" style={{ textDecoration: "none" }}>
                            <FontAwesomeIcon icon={faCartPlus} style={{ color: "white" }} />
                            <span style={{ marginLeft: "15px", fontWeight: "bold" }}>ĐĂNG TIN</span>
                        </a>
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header);

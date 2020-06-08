import React from 'react';
import { Route, Switch, BrowserRouter as Router, withRouter, Redirect } from 'react-router-dom';
import Header from './header/components/index';
import Footer from './footer/components/index';
import Main from './main/components/index';
import Login from './main/components/login';
import CreatePost from './main/components/posts/newPost'
import axios from 'axios';
import Filter from './main/components/posts/filter';
import Register from './main/components/register';
import Profile from './main/components/profile';
import Chat from './chat/components/index';
import Search from './header/components/searchUser';
import ProfileUser from './main/components/profileUser/profileUser'

class App extends React.Component {
  state = {
    clickLogin: false,
    authedUser: null,
    roles: null,
    list_following: [],
    list_followingPost: []
  }

  onClickLogin = () => {
    this.setState({
      clickLogin: !this.state.clickLogin
    })
  }

  follow = (email) => {
    this.setState({
      list_following: [...this.state.list_following, email]
    })
  }

  followPost = (post) => {
    this.setState({
      list_following: [...this.state.list_followingPost, post]
    })
  }

  unfollow = (email) => {
    this.setState({
      list_following: this.state.list_following.filter(item => item !== email)
    })
  }

  login = async values => {
    const response = await axios.post('http://localhost:4000/users/login', {
      username: values.username,
      password: values.password
    })
    if (response.status === 201) {
      this.setState({
        authedUser: response.data,
        roles: response.data.roles
      });
      localStorage.setItem("jwt_token", response.data.token)
    }
    return response;
  };

  logout() {
    localStorage.clear();
  }

  // search = (keyworrd) => {
  //   console.log(this.props)
  //   this.props.history.push(`/search?q=${keyworrd}`)
  // }


  async componentDidMount() {
    const token = localStorage.getItem("jwt_token");
    const currentUser = (await this.getCurrentUser(token));
    const user = await this.getInforUser(currentUser.id);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`
    this.setState({
      authedUser: user.data,
      roles: user.data.roles,
      list_following: user.data.listFollowers
    })
  }

  getInforUser = async id => {
    const token = localStorage.getItem("jwt_token");
    const AuthStr = 'Bearer ' + token;
    const user = await axios.get(`http://localhost:4000/users/${id}`, { headers: { 'Authorization': AuthStr } })
    localStorage.setItem("jwt_token", user.data.token)
    return user;
  }


  getCurrentUser = async tokens => {
    const token = localStorage.getItem("jwt_token");
    const AuthStr = 'Bearer ' + token;
    const response = await axios.get(`http://localhost:4000/users/me/${tokens}`, { headers: { 'Authorization': AuthStr } })
    if (response.status !== 201) {
      // throw error
    }
    return response.data;
  }


  render() {
    console.log(this.state.authedUser)
    return (
      <>
        <Router>
          <Header authedUser={this.state.authedUser} history = {this.props.history} isAuthed={this.state.authedUser !== null} logout={this.logout} />
          <Route exact path='/' render={() =>
            <Main />
          } />
          <Route path="/new-post" component={CreatePost} />
          <Route path="/register" component={Register} />
          <Route path="/chat" component={Chat} />
          <Route path="/search" component={Search} />
          <Route path="/profile" render={() => <Profile authedUser={this.state.authedUser} />} />
          <Route path="/profileUser" render={() => <ProfileUser authedUser={this.state.authedUser} />} />
          <Route path="/login" render={() => <Login onLogin={this.login} />} />
          <Route path="/filter" render={() => <Filter authedUser={this.state.authedUser} listFollowing={this.state.list_following} listFollowingPost ={this.state.list_followingPost} onFollow={this.follow} onUnfollow={this.unfollow} onFollowPost={this.followPost} />} />
          <Footer />
        </Router>
      </>
    );
  }

}

export default App;

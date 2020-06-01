import React from 'react';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
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

class App extends React.Component {
  state = {
    clickLogin: false,
    authedUser: null,
    roles: null,
    list_following: []
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
      list_following: user.data.listFollow
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
    // console.log(this.state.list_following)
    return (
      <>
        <Router>
          <Header authedUser={this.state.authedUser} isAuthed={this.state.authedUser !== null} logout={this.logout} />
          <Route exact path='/' render={() =>
            <Main />
          } />
          <Route path="/new-post" component={CreatePost} />
          <Route path="/register" component={Register} />
          <Route path="/chat" component={Chat} />
          <Route path="/profile" render={() => <Profile authedUser={this.state.authedUser} />} />
          <Route path="/login" render={() => <Login onLogin={this.login} />} />
          <Route path="/filter" render={() => <Filter authedUser={this.state.authedUser} listFollowing={this.state.list_following} onFollow={this.follow} onUnfollow={this.unfollow} />} />
          <Footer />
        </Router>

      </>
    );
  }

}

export default App;

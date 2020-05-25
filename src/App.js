import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './header/components/index';
import Footer from './footer/components/index';
import Main from './main/components/index';
import Login from './main/components/login';
import axios from 'axios';

class App extends React.Component {
  state ={ 
    clickLogin : false,
    authedUser: null,
    roles: null,
  }

  onClickLogin = () => {
    this.setState({
      clickLogin : !this.state.clickLogin
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
      roles: user.data.roles
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
    
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <>
                <Header authedUser={this.state.authedUser} isAuthed={this.state.authedUser !== null } clickedLogin = {this.onClickLogin} logout={this.logout} />
                
                {!this.state.clickLogin ? <><Main /></> : <Login onLogin={this.login}/> }

                <Footer />
              </>
            } />
          </Switch>

        </Router>

      </div>
    );
  }

}

export default App;

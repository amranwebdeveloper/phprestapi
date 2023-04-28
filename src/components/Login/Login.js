import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PostData } from '../../services/PostData';
import './Login.css';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      internalemailaddress: '',
      new_password: '',
      redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }



  login() {
    if (this.state.internalemailaddress && this.state.new_password) {
      PostData('login', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }

      });
    } else {
      console.log('Not login')
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }




  render() {

    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'} />)
    }

    if (sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }

    return (
      <div className="container">
        <div className="row" id="Body">
          <div className="medium-5 columns left">
            <h4>Login</h4>
            <label>Username</label>
            <input type="text" name="internalemailaddress" placeholder="Username" onChange={this.onChange} />
            <label>Password</label>
            <input type="password" name="new_password" placeholder="Password" onChange={this.onChange} />
            <input type="submit" className="button success" value="Login" onClick={this.login} />
            <a href="/signup">Registration</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import './Signup.css';

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      new_phonenumber: '',
      internalemailaddress: '',
      new_password: '',
      redirectToReferrer: false
    };

    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);

  }


  signup() {
    if (this.state.new_password && this.state.internalemailaddress && this.state.firstname && this.state.lastname && this.state.new_phonenumber) {
      PostData('signup', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }

      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }



    return (

      <div className="row " id="Body">
        <div className="medium-5 columns left">
          <h4>Signup</h4>
          <label>First Name</label>
          <input type="text" name="firstname" placeholder="First Name" onChange={this.onChange} />
          <label>Last Name</label>
          <input type="text" name="lastname" placeholder="Last Name" onChange={this.onChange} />
          <label>new_phonenumber</label>
          <input type="text" name="new_phonenumber" placeholder="phonenumber" onChange={this.onChange} />
          <label>Email</label>
          <input type="text" name="internalemailaddress" placeholder="Email" onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="new_password" placeholder="Password" onChange={this.onChange} />
          <input type="submit" className="button" value="Sign Up" onClick={this.signup} />
          <a href="/login">Login</a>
        </div>
      </div>
    );
  }
}

export default Signup;
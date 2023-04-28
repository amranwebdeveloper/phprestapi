import React, {Component} from 'react';
import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <div className="row " id="Body">
          <div className="col-lg-6 columns">
            <h2 id="welcomeText">Make people fall in love with your ideas</h2>
            <a href="/login" className="button">Login</a>
            <a href="/signup" className="button success">Signup</a>
          </div>
          <div class="col-lg-6">
            <div class="seo_features_img">
              <div class="round_circle"></div>
              <div class="round_circle two"></div>
              <img src={require('./../../img/login_img.png')} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
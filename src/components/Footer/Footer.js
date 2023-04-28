import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="container">
      <hr />
        <div className="row" id="footer">
          <div className="medium-12 columns">
            <p>(C) Mohammad Amranur Rahman <a href="https://amranwebdeveloper.com/">amranwebdeveloper.com</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
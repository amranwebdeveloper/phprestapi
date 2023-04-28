import React, { Component } from 'react';

import './Header.css';
import './bootstrap.min.css';

class Header extends Component {
  render() {
    return (
      <div className="container callout primary" id="Header">
        <div className="row column">
          <h1>{this.props.name}</h1>
        </div>
      </div>
    );
  }
}

export default Header;
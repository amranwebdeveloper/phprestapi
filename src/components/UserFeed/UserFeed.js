import React, { Component } from 'react';
import Linkify from 'react-linkify';
import './UserFeed.css';
import TimeAgo from 'react-timeago';
class UserFeed extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let userFeed = null;

    if (this
      .props
      .feedData.length > 0) {

      userFeed = this
        .props
        .feedData
        .map(function (feedData, index) {
          return (
            <div className="medium-12 columns" key={index}>
              <div className="people-you-might-know">
                <div className="row add-people-section">
                  <div className="small-12 medium-10 columns about-people">
                    <div className="about-people-author row">
                      <div className="col-md-6">
                        <strong>App Name: </strong> <Linkify>{feedData.feed}</Linkify> <br/>
                        <strong>{feedData.new_additionaldetails}</strong>  <br/>
                        <strong>{feedData.new_field4}</strong> <br/>
                      </div>
                      <div className="col-md-3">
                        <strong> <TimeAgo date={this.props.convertTime(feedData.created)} /></strong>
                      </div>
                      <div className="col-md-3">
                        <div className="small-12 medium-2 columns add-friend">
                            <button className="button secondary small" onClick={this.props.deleteFeed} data={feedData.feed_id} value={index} >
                              <i className="fa fa-pen" aria-hidden="true"></i>
                              Edit
                            </button>
                            <button className="button secondary small" onClick={this.props.deleteFeed} data={feedData.feed_id} value={index} >
                              <i className="fa fa-user-times" aria-hidden="true"></i>
                              Del
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }, this);
    }

    return (
      <div>
        {userFeed}

      </div>
    );
  }

}

export default UserFeed;
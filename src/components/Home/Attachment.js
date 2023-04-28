import React, { Component } from "react";
// import ReactDOM from 'react-dom'
import "./Home.css";

class Attachment extends Component {
  constructor(props) {
    super(props);
  }
  handleOnchangeFile(e, index = null) {
    this.props.handleOnchange(this.props.index);
    console.log("File attached");
  }

  render() {
    return (
      <div key={this.props.index} className="single_attachment_dom">
        <div className="row attachment">
          <div className="col-md-6">
            <label for="">
              File Name
              <input
                className="form-control"
                name="filename[]"
                id="filename"
                onChange={(e,index) => this.props.handleOnchange(e,this.props.index)}
                type="file"
                placeholder="File Name"
              />
            </label>
          </div>
          <div className="col-md-6">
            <label for="">
              Note Text
              <input
                className="form-control"
                name="notetext[]"
                id="notetext"
                onChange={(e,index) => this.props.handleOnchange(e,this.props.index)}
                type="text"
                placeholder="Note Text"
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label for="">
              Subject
              <input
                className="form-control"
                name="subject[]"
                id="subject"
                onChange={(e,index) => this.props.handleOnchange(e,this.props.index)}
                type="text"
                placeholder="Subject"
              />
            </label>
          </div>
          <div className="col-md-6">
            <label for="">
              Document Body
              <input
                className="form-control"
                name="body[]"
                id="body"
                onChange={(e,index) => this.props.handleOnchange(e,this.props.index)}
                type="text"
                placeholder="Document Body"
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label for="">
              Object ID
              <input
                className="form-control"
                readonly
                type="text"
                value="123"
                name="objectid[]"
                id="objectid"
                onChange={(e,index) => this.props.handleOnchange(e,this.props.index)}
                placeholder="Object ID"
              />
            </label>
          </div>
          <div className="col-md-6">
            <label for="">
              Owner (Show name)
              <input
                className="form-control"
                name="ownerid[]"
                onChange={(e,index) => this.props.handleOnchange(e,this.props.index)}
                value={this.props.ownerid}
                type="hidden"
                placeholder="Document Body"
              />
              <div>{this.props.firstname}</div>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <img src={this.props.imagePreview[this.props.index]} />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.handleDelete(this.props.index)}
        >
          X
        </button>
      </div>
    );
  }
}

export default Attachment;

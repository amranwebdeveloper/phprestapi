import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Home.css";
import { PostData } from "../../services/PostData";
import UserFeed from "../UserFeed/UserFeed";
import ReactConfirmAlert, { confirmAlert } from "react-confirm-alert";
import "../../styles/react-confirm-alert.css";
import Attachment from "./Attachment";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      new_name: "",
      ownerid: "Owner name from session",
      new_additionaldetails: "",
      new_field3: "",
      new_field4: "",
      new_taxamount: "",
      transactioncurrencyid: "",
      new_emailaddress: "",
      new_field1: "",
      new_phoneno: "",
      new_address: "",
      new_taxpolicy: "",
      filename: [],
      notetext: [],
      subject: [],
      body: [],
      objectid: '123',
      imagePreview: [],
      redirectToReferrer: false,
      attachmentClone: [],
    };

    this.getUserFeed = this.getUserFeed.bind(this);
    this.feedUpdate = this.feedUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.deleteFeedAction = this.deleteFeedAction.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("userData")) {
      this.getUserFeed();
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  feedUpdate(e) {
    e.preventDefault();
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let postData = {
      user_id: data.userData.user_id,
      token: data.userData.token,
      new_name: this.state.new_name,
      new_additionaldetails: this.state.new_additionaldetails,
      new_field3: this.state.new_field3,
      new_field4: this.state.new_field4,
      new_taxamount: this.state.new_taxamount,
      transactioncurrencyid: this.state.transactioncurrencyid,
      new_emailaddress: this.state.new_emailaddress,
      new_field1: this.state.new_field1,
      new_phoneno: this.state.new_phoneno,
      new_address: this.state.new_address,
      new_taxpolicy: this.state.new_taxpolicy,
      new_reactappdemoid: this.state.new_reactappdemoid,
      filename: this.state.filename,
      notetext: this.state.notetext,
      subject: this.state.subject,
      body: this.state.body,
      objectid: this.state.objectid,
    };

    const formData = new FormData();
    formData.append("user_id", data.userData.user_id);
    formData.append("new_name", this.state.new_name);
    formData.append("new_additionaldetails", this.state.new_additionaldetails);
    formData.append("new_field3", this.state.new_field3);
    formData.append("new_field4", this.state.new_field4);
    formData.append("new_taxamount", this.state.new_taxamount);
    formData.append("transactioncurrencyid", this.state.transactioncurrencyid);
    formData.append("new_emailaddress", this.state.new_emailaddress);
    formData.append("new_field1", this.state.new_field1);
    formData.append("new_phoneno", this.state.new_phoneno);
    formData.append("new_address", this.state.new_address);
    formData.append("new_taxpolicy", this.state.new_taxpolicy);
    formData.append("new_reactappdemoid", this.state.new_reactappdemoid);
    formData.append("token", data.userData.token);
    //formData.append("filename[]",this.state.filename);
    //formData.append("notetext[]",this.state.notetext);
    //formData.append("subject[]",this.state.subject);
    //formData.append("body[]",this.state.body);

    const files = this.state.filename;

    files.forEach((file, i) => {
      formData.append("filename[]", file[0]);
      formData.append("notetext[]", this.state.notetext[i][0]);
      formData.append("subject[]", this.state.subject[i][0]);
      formData.append("body[]", this.state.body[i][0]);
      formData.append("objectid[]", this.state.objectid);
    });

    if (
      this.state.new_name &&
      this.state.new_additionaldetails &&
      this.state.new_field3 &&
      this.state.new_field4 &&
      this.state.new_taxamount &&
      this.state.transactioncurrencyid &&
      this.state.new_emailaddress &&
      this.state.new_field1 &&
      this.state.new_phoneno &&
      this.state.new_address &&
      this.state.new_taxpolicy &&
      this.state.filename &&
      this.state.notetext &&
      this.state.new_name &&
      this.state.body
    ) {
      PostData("feedUpdate", formData, "formData").then((result) => {
        let responseJson = result;
        let K = [responseJson.feedData].concat(this.state.data);
        //console.log(K);
        this.setState({ data: K, new_name: "" });
      });
    } else {
      alert("problem");
    }
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  deleteFeedAction(e) {
    //console.log("HI");
    let updateIndex = e.target.getAttribute("value");
    let feed_id = e.target.getAttribute("data");

    let data = JSON.parse(sessionStorage.getItem("userData"));

    let postData = {
      user_id: data.userData.user_id,
      token: data.userData.token,
      feed_id: feed_id,
    };
    if (postData) {
      PostData("feedDelete", postData).then((result) => {
        this.state.data.splice(updateIndex, 1);
        this.setState({ data: this.state.data });
      });
    }
  }

  deleteFeed(e) {
    confirmAlert({
      title: "",
      message: "Are you sure?",
      childrenElement: () => "",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => this.deleteFeedAction(e),
      onCancel: () => "",
    });
  }

  getUserFeed() {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    this.setState({ firstname: data.userData.firstname });
    this.setState({ ownerid: data.userData.user_id });
    let postData = {
      user_id: data.userData.user_id,
      token: data.userData.token,
    };

    if (data) {
      PostData("feed", postData).then((result) => {
        let responseJson = result;
        this.setState({ data: responseJson.feedData });
        //console.log(this.state);
      });
    }
  }

  onChange(e, index = null) {
    
    var name = e.target.id;
    if (e.target.id == "filename" && index >= 0) {
      this.state[e.target.id][index] = [e.target.files[0]];
      this.state.imagePreview[index] = [URL.createObjectURL(e.target.files[0])];

      this.setState({ filename: this.state[e.target.id] });
      this.setState({ imagePreview: this.state.imagePreview });
    } else if (e.target.id != "filename" && index != null && index >= 0) {
      console.log(e.target.id);
      console.log(e.target.name);
      this.state[e.target.id][index] = [e.target.value];
      this.setState({ [e.target.id]: this.state[e.target.id] });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  logout() {
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    this.setState({ redirectToReferrer: true });
  }

  append_attachment() {
    this.setState({ attachmentClone: [...this.state.attachmentClone, ""] });
  }

  handleDelete(index) {
    this.state.attachmentClone.splice(index, 1);
    this.setState({ attachmentClone: this.state.attachmentClone });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className="container">
        <div className="row" id="Body" style={{ marginLeft: "20px" }}>
          <div className="medium-12 columns">
            <a href="#" onClick={this.logout} className="logout">
              Logout
            </a>
            <form onSubmit={this.feedUpdate} method="post">
              <div className="row">
                <div className="col-md-6">
                  <h2>Council Tax</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <label for="">
                        Name
                        <input
                          className="form-control"
                          name="new_name"
                          id="new_name"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Name"
                        />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label for="">
                        Owner ID (From session or api )
                        <input
                          className="form-control"
                          name="ownerid"
                          id="ownerid"
                          onChange={this.onChange}
                          value={this.state.ownerid}
                          type="hidden"
                          placeholder="Owner ID from Session"
                        />
                        <div>{this.state.firstname}</div>
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label for="">
                        Additional Details
                        <input
                          className="form-control"
                          name="new_additionaldetails"
                          id="new_additionaldetails"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Additional Details"
                        />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label for="">
                        Due Date
                        <input
                          className="form-control"
                          name="new_field3"
                          id="new_field3"
                          onChange={this.onChange}
                          type="date"
                          placeholder="Due Date"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label for="">
                        Conatact Person(dropdown)
                        <input
                          className="form-control"
                          name="new_field4"
                          id="new_field4"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Contact Person"
                        />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label for="">
                        Tax Amount
                        <input
                          className="form-control"
                          name="new_taxamount"
                          id="new_taxamount"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Tax Amount"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label for="">
                        Currency (Hard coded dropdown menu)
                        <select
                          name="transactioncurrencyid"
                          id="transactioncurrencyid"
                          className="form-control"
                          onChange={this.onChange}
                        >
                          <option value="">--Select--</option>
                          <option value="1">USD $</option>
                        </select>
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label for="">
                        Email
                        <input
                          className="form-control"
                          name="new_emailaddress"
                          id="new_emailaddress"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Email Address"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label for="">
                        Tax ID
                        <input
                          className="form-control"
                          name="new_field1"
                          id="new_field1"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Tax ID"
                        />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label for="">
                        Phone no.
                        <input
                          className="form-control"
                          name="new_phoneno"
                          id="new_phoneno"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Phone number"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label for="">
                        Address
                        <input
                          className="form-control"
                          name="new_address"
                          id="new_address"
                          onChange={this.onChange}
                          type="text"
                          placeholder="Address"
                        />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label for="">
                        Tax Policy(static dropdown)
                        <select
                          name="new_taxpolicy"
                          id="new_taxpolicy"
                          className="form-control"
                          onChange={this.onChange}
                        >
                          <option value="">--Select--</option>
                          <option value="Policy1">100,000,000</option>
                          <option value="Policy2">100,000,001</option>
                          <option value="Policy3">100,000,002</option>
                          <option value="Policy4">100,000,003</option>
                          <option value="Policy5">100,000,004</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <h2>Attachment</h2>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => this.append_attachment(e)}
                  >
                    Add New Attachment
                  </button>
                  <div id="attachment_container">
                    {this.state.attachmentClone.map((attachment, index) => {
                      return (
                        <Attachment
                          index={index}
                          ownerid={this.state.ownerid}
                          firstname={this.state.firstname}
                          imagePreview={this.state.imagePreview}
                          handleDelete={() => this.handleDelete(index)}
                          handleOnchange={(e,index) => this.onChange(e,index)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <input
                className="form-control"
                type="submit"
                value="Post"
                className="button"
                onClick={this.feedUpdate}
              />
            </form>
          </div>
          <UserFeed
            feedData={this.state.data}
            deleteFeed={this.deleteFeed}
            convertTime={this.convertTime}
            name={this.state.name}
          />
        </div>
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import axios from "axios";
import "./SellingPage.css";
import { Route, Link } from "react-router-dom";
import Header from "../LandingPage/Header/Header";
import Footer from "../LandingPage/Footer/Footer";
import Modal from "./Modal/Modal";
import AdminPreview from "../images/admin_preview.png";
import TopOfList from "../icons/top_of_list.svg";
import Verified from "../icons/verified.svg";
import UploadPhoto from "../icons/photo_upload.svg";
import CloseIcon from "../icons/close.svg";
const API_BASE_URL = 'https://65wqedpzjd.execute-api.eu-west-2.amazonaws.com'

class SellingPage extends Component {
  state = {
    showModal: false,
    emailInputVal: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleEmailInput = (e) => {
    this.setState({ emailInputVal: e.target.value });
  };

  handleEmailSubmitted = () => {
    // this.postToSignUpDB(this.state.emailInputVal);
    this.sendEmail(this.state.emailInputVal);
    this.setState({ showModal: false });
    alert("Thanks for your interest, we will get back to you ASAP.");
  };

  // postToSignUpDB = (email) => {
  //   axios
  //     .post("https://hapihour-sign-up.firebaseio.com/sign_up.json", {
  //       email: email,
  //     })
  //     .then((res) => {
  //       const fetchedUsers = [];
  //       for (let key in res.data) {
  //         fetchedUsers.push({
  //           ...res.data[key],
  //           id: key,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  sendEmail = (email) => {
    axios
      .post(API_BASE_URL + "/api/sendEmail", null, {
        params: { emailAddress: email }
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Route
        render={({ history }) => (
          <div className="SellingPage">
            <Header history={history} theme="Black" />
            <div className="SellingPageTopBlock">
              <div className="SellingPageTopBlockTitle">
                Make your happy hour deals stand out from the noise.
              </div>
              <div className="SellingPageTopBlockMicroTitle">
                <b>Sign up</b> to manage your details and we will feature{" "}
                <b>your</b> deals so that customers can see what <b>you</b> have
                to offer.
              </div>
              <button onClick={this.handleOpenModal}>
                Sign up for a free account
              </button>
              <p>Free earlybird access • No credit card required</p>
            </div>

            <img className="SellingPagePreviewImage" src={AdminPreview} />

            <div className="SellingPageProblem">
              <h1>Own a bar and want featured listings?</h1>
              <p>
                With there being so many happy hours in your city it is hard to
                stand out in the crowd. Signing up for a managed account will
                give you the tools to get your deals seen and your customers
                excited.
              </p>
            </div>

            <div className="SellingPageFeature">
              <div>
                <h4># First in line</h4>
                <h2>Move to the top of the list</h2>
                <p>
                  When you sign up, your happy hour offering will jump to the
                  top of the list so customers will instantly see you.
                </p>
              </div>
              <div>
                <img
                  src={TopOfList}
                  style={{ width: "320px", marginBottom: "-150px" }}
                ></img>
              </div>
            </div>

            <div className="SellingPageFeature">
              <div>
                <img src={Verified}></img>
              </div>
              <div>
                <h4># Trusted source</h4>
                <h2>Get a verified icon on your listing</h2>
                <p>
                  With a managed account, potential customers can trust that
                  your deals are always up-to-date and are never dissapointed.
                </p>
              </div>
            </div>

            <div className="SellingPageFeature">
              <div>
                <h4># Looking good</h4>
                <h2>Choose your own photographs and descriptions</h2>
                <p>
                  Upload your own stunning photographs & add appealing
                  descriptions to get your customers excited about your deals.
                  No more generic listings.
                </p>
              </div>
              <div>
                <img src={UploadPhoto}></img>
              </div>
            </div>

            <div className="SellingPageCallToAction">
              <h2>Get free access to these great features.</h2>
              <button onClick={this.handleOpenModal}>
                Sign up for a free account
              </button>
              <p>Free earlybird access • No credit card required</p>
            </div>
            <Footer />

            <Modal
              show={this.state.showModal}
              modalClosed={this.handleCloseModal}
            >
              <img
                className="SellingPageCloseButton"
                onClick={this.handleCloseModal}
                src={CloseIcon}
              />
              <h2>Great news! Let's sign you up.</h2>
              <p>
                Input your email address and we will be in contact to get you
                set up.
              </p>
              <input
                className="SellingPageEmailInput"
                type="email"
                onChange={this.handleEmailInput}
              />
              <button
                className="SellingPageSendButton"
                onClick={this.handleEmailSubmitted}
              >
                Send
              </button>
              <p style={{ marginBottom: "30px" }}>
                Alternatively, you can contact us via any of the following
                social media platforms:
              </p>
              <a href="https://twitter.com/hapihour_io" className="inline">
                <svg id="twitter-24" viewBox="0 0 24 24">
                  <path d="M8.068 20.714c8.004 0 12.381-6.63 12.381-12.381 0-.188-.004-.376-.012-.562a8.853 8.853 0 0 0 2.17-2.254 8.68 8.68 0 0 1-2.499.685 4.367 4.367 0 0 0 1.914-2.407c-.84.499-1.772.861-2.763 1.057a4.352 4.352 0 0 0-7.415 3.968 12.356 12.356 0 0 1-8.97-4.547 4.34 4.34 0 0 0-.59 2.188c0 1.51.769 2.842 1.937 3.622a4.32 4.32 0 0 1-1.971-.544v.055c0 2.108 1.5 3.867 3.49 4.266a4.356 4.356 0 0 1-1.965.075 4.356 4.356 0 0 0 4.065 3.022 8.73 8.73 0 0 1-5.404 1.863c-.351 0-.698-.02-1.038-.06a12.318 12.318 0 0 0 6.67 1.954"></path>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/hapihour.io/"
                className="inline"
              >
                <svg id="instagram-24" viewBox="0 0 24 24">
                  <path d="M12 1.501c2.851 0 3.21.012 4.329.063 1.117.051 1.88.229 2.548.488.7.264 1.336.677 1.86 1.211.534.525.947 1.16 1.211 1.86.26.668.437 1.43.488 2.548.024.523.04.88.049 1.4.01.597.014 1.408.014 2.929 0 2.851-.012 3.209-.063 4.329-.051 1.117-.229 1.88-.488 2.548a5.368 5.368 0 0 1-3.07 3.07c-.668.26-1.432.438-2.55.489-1.119.05-1.476.063-4.328.063-2.851 0-3.209-.012-4.328-.063-1.118-.051-1.881-.229-2.55-.488a5.144 5.144 0 0 1-1.859-1.211 5.145 5.145 0 0 1-1.21-1.86c-.26-.667-.438-1.43-.489-2.548-.05-1.12-.063-1.478-.063-4.329s.012-3.209.063-4.329c.051-1.117.229-1.88.488-2.548.264-.7.677-1.335 1.211-1.86a5.145 5.145 0 0 1 1.86-1.21c.668-.26 1.43-.438 2.548-.489 1.12-.05 1.478-.063 4.33-.063zm4.243 1.953c-1.107-.05-1.44-.061-4.243-.061-2.803 0-3.135.01-4.242.06-1.024.048-1.58.219-1.95.362a3.25 3.25 0 0 0-1.207.786 3.253 3.253 0 0 0-.786 1.207c-.143.37-.315.926-.361 1.95-.05 1.107-.061 1.439-.061 4.242 0 2.804.01 3.136.06 4.243.047 1.023.219 1.58.362 1.95.169.455.437.868.786 1.206a3.25 3.25 0 0 0 1.207.786c.37.144.926.315 1.95.361 1.106.05 1.438.062 4.242.062a458.62 458.62 0 0 0 2.38-.007 43.158 43.158 0 0 0 1.863-.055c1.023-.046 1.58-.217 1.95-.361a3.477 3.477 0 0 0 1.992-1.993c.144-.37.315-.926.361-1.95.05-1.107.061-1.438.061-4.242 0-2.803-.01-3.135-.06-4.242-.048-1.024-.219-1.58-.362-1.95a3.255 3.255 0 0 0-.786-1.207 3.254 3.254 0 0 0-1.207-.786c-.37-.143-.926-.314-1.95-.361zm1.362 4.202a1.26 1.26 0 1 1 0-2.52 1.26 1.26 0 0 1 0 2.52zM6.608 12a5.391 5.391 0 1 1 10.782 0A5.391 5.391 0 0 1 6.61 12zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                </svg>
              </a>

              <a href="https://www.facebook.com/hapihour.io" className="inline">
                <svg id="facebook-24" viewBox="0 0 24 24">
                  <path d="M13.544 22.018H9.37V12H7.325V8.544h2.07v-2.07c0-2.822 1.17-4.492 4.492-4.492h2.763v3.456h-1.72c-1.294 0-1.377.485-1.377 1.386v1.72h3.122L16.308 12h-2.764z"></path>
                </svg>
              </a>
            </Modal>
          </div>
        )}
      />
    );
  }
}

export default SellingPage;
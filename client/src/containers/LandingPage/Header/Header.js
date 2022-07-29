import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import hh_logo_white from "../../images/WhiteLogo.png";
import hh_logo_black from "../../images/BlackLogo.png";
import Burger from "./Burger/Burger";
import Aux from "../../../hoc/Aux/Aux";

const TwitterIcon = (
  <svg id="twitter-24" viewBox="0 0 24 24">
    <path d="M8.068 20.714c8.004 0 12.381-6.63 12.381-12.381 0-.188-.004-.376-.012-.562a8.853 8.853 0 0 0 2.17-2.254 8.68 8.68 0 0 1-2.499.685 4.367 4.367 0 0 0 1.914-2.407c-.84.499-1.772.861-2.763 1.057a4.352 4.352 0 0 0-7.415 3.968 12.356 12.356 0 0 1-8.97-4.547 4.34 4.34 0 0 0-.59 2.188c0 1.51.769 2.842 1.937 3.622a4.32 4.32 0 0 1-1.971-.544v.055c0 2.108 1.5 3.867 3.49 4.266a4.356 4.356 0 0 1-1.965.075 4.356 4.356 0 0 0 4.065 3.022 8.73 8.73 0 0 1-5.404 1.863c-.351 0-.698-.02-1.038-.06a12.318 12.318 0 0 0 6.67 1.954"></path>
  </svg>
);

const InstagramIcon = (
  <svg id="instagram-24" viewBox="0 0 24 24">
    <path d="M12 1.501c2.851 0 3.21.012 4.329.063 1.117.051 1.88.229 2.548.488.7.264 1.336.677 1.86 1.211.534.525.947 1.16 1.211 1.86.26.668.437 1.43.488 2.548.024.523.04.88.049 1.4.01.597.014 1.408.014 2.929 0 2.851-.012 3.209-.063 4.329-.051 1.117-.229 1.88-.488 2.548a5.368 5.368 0 0 1-3.07 3.07c-.668.26-1.432.438-2.55.489-1.119.05-1.476.063-4.328.063-2.851 0-3.209-.012-4.328-.063-1.118-.051-1.881-.229-2.55-.488a5.144 5.144 0 0 1-1.859-1.211 5.145 5.145 0 0 1-1.21-1.86c-.26-.667-.438-1.43-.489-2.548-.05-1.12-.063-1.478-.063-4.329s.012-3.209.063-4.329c.051-1.117.229-1.88.488-2.548.264-.7.677-1.335 1.211-1.86a5.145 5.145 0 0 1 1.86-1.21c.668-.26 1.43-.438 2.548-.489 1.12-.05 1.478-.063 4.33-.063zm4.243 1.953c-1.107-.05-1.44-.061-4.243-.061-2.803 0-3.135.01-4.242.06-1.024.048-1.58.219-1.95.362a3.25 3.25 0 0 0-1.207.786 3.253 3.253 0 0 0-.786 1.207c-.143.37-.315.926-.361 1.95-.05 1.107-.061 1.439-.061 4.242 0 2.804.01 3.136.06 4.243.047 1.023.219 1.58.362 1.95.169.455.437.868.786 1.206a3.25 3.25 0 0 0 1.207.786c.37.144.926.315 1.95.361 1.106.05 1.438.062 4.242.062a458.62 458.62 0 0 0 2.38-.007 43.158 43.158 0 0 0 1.863-.055c1.023-.046 1.58-.217 1.95-.361a3.477 3.477 0 0 0 1.992-1.993c.144-.37.315-.926.361-1.95.05-1.107.061-1.438.061-4.242 0-2.803-.01-3.135-.06-4.242-.048-1.024-.219-1.58-.362-1.95a3.255 3.255 0 0 0-.786-1.207 3.254 3.254 0 0 0-1.207-.786c-.37-.143-.926-.314-1.95-.361zm1.362 4.202a1.26 1.26 0 1 1 0-2.52 1.26 1.26 0 0 1 0 2.52zM6.608 12a5.391 5.391 0 1 1 10.782 0A5.391 5.391 0 0 1 6.61 12zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
  </svg>
);

const FacebookIcon = (
  <svg id="facebook-24" viewBox="0 0 24 24">
    <path d="M13.544 22.018H9.37V12H7.325V8.544h2.07v-2.07c0-2.822 1.17-4.492 4.492-4.492h2.763v3.456h-1.72c-1.294 0-1.377.485-1.377 1.386v1.72h3.122L16.308 12h-2.764z"></path>
  </svg>
);

class header extends Component {
  state = {
    displayMobileHeader: false,
    displayHeader: true,
    theme: 'White',
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, false);
    this.props.theme == "Black" ? this.setState({theme: 'Black'}) : null;
  }

  handleScroll = () => {
    if (window.scrollY > 30 && this.state.displayHeader) {
      this.setState({ displayHeader: false });
    } else if (window.scrollY <= 30 && !this.state.displayHeader) {
      this.setState({ displayHeader: true });
    }
  };

  handleBurgerClick = () => {
    this.setState((prevState) => {
      return { displayMobileHeader: !prevState.displayMobileHeader };
    });
  };

  render() {
    const TopLevelClasses = ["Header"];
    let themeColour = this.state.theme;
    !this.state.displayHeader ? TopLevelClasses.push("HideHeader") : null;
    this.state.displayMobileHeader ? TopLevelClasses.push("ToggleActive") : null;
    this.state.displayMobileHeader ? themeColour = 'Black' : null;    

    return (
      <div className={TopLevelClasses.join(" ")}>
        <div className="HeaderMaxWidth">
          <img
            src={themeColour == "Black" ? hh_logo_black : hh_logo_white}
            alt="Hapihour Logo"
            onClick={() => {
              this.props.history.push(`/`);
            }}
          />

          {this.state.displayMobileHeader ? (
            <div className={"CloseButton " + themeColour} onClick={this.handleBurgerClick} />
          ) : (
            <Burger clicked={this.handleBurgerClick} themeColour={themeColour} />
          )}

          {this.state.displayMobileHeader ? (
            <Aux>
              <Link className="MobileItem MiscLink" to={`/faq`}>
                Frequently Asked Questions
              </Link>
              <Link className="MobileItem MiscLink" to={`/faq`}>
                Contact Details
              </Link>
              <Link className="MobileItem MiscLink" to={`/bar-info`}>
                Own a bar?
              </Link>
              <div className="dropdown MobileItem">
                <button className="dropbtn">
                  Available Locations
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={`/map/leeds`}>Leeds</Link>
                  <Link to={`/map/clapham`}>London Clapham</Link>
                </div>
              </div>
            </Aux>
          ) : null}

          <Aux>
            <a
              href="https://twitter.com/hapihour_io"
              className={"HeaderItem HeaderSocial " + themeColour}
            >
              {TwitterIcon}
            </a>
            <a
              href="https://www.instagram.com/hapihour.io/"
              className={"HeaderItem HeaderSocial " + themeColour}
            >
              {InstagramIcon}
            </a>

            <a
              href="https://www.facebook.com/hapihour.io"
              className={"HeaderItem HeaderSocial " + themeColour}
            >
              {FacebookIcon}
            </a>
            <div className={"HeaderItem MiscLink " + themeColour}>|</div>

            <Link className={"HeaderItem MiscLink " + themeColour} to={`/bar-info`}>
              Own a bar?
            </Link>

            <Link className={"HeaderItem MiscLink " + themeColour} to={`/faq`}>
              FAQs
            </Link>
            <Link className={"HeaderItem MiscLink " + themeColour} to={`/faq`}>
              Contact Details
            </Link>
            <div className="HeaderItem dropdown">
              <button className={"dropbtn " + themeColour}>
                Locations
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <Link to={`/map/leeds`}>Leeds</Link>
                <Link to={`/map/clapham`}>London Clapham</Link>
              </div>
            </div>
          </Aux>
        </div>
      </div>
    );
  }
}

export default header;

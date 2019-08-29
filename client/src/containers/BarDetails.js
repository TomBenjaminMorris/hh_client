import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../state/actions/actions";
import "./BarDetails.css";
import Bar from "../components/Bar/Bar";
import navigate from "./back.png";
import { Route } from "react-router-dom";

class BarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      fetchOne
    } = this.props.actions;
    const {
      data,
      singleBar
    } = this.props;

    console.log("BarDetails page");

    return (
      <Route render={({ history }) => (
        <div className="wrapper">
            <div className="navigationClass">
            {/* {<a href="/" className="bottomTextbackNavigation">{"<"}</a>} */}
            {<img
                src={navigate}
                className="bottomTextbackNavigation"
                alt="back"
                onClick={() => {
                  history.push(`/`);
                }}
            />}
            </div>
            <div className="barContainer">
            <Bar
                fetchOne={fetchOne}
                data={data}
                singleBar={singleBar}
            />
            </div>
            <div className="bottomTextWrapper">
            {<div className="bottomText">Something wrong with this listing?</div>}
            {<a href="https://twitter.com/hapihour_io" className="bottomText">Send us a message here</a>}
            </div>
        </div>
      )} />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    data: state.data,
    singleBar: state.singleBar
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BarDetails);
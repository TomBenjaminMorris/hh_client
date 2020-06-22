import React, { Component } from "react";

import "./Modal.css";
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "scale(1)" : "scale(0)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal;

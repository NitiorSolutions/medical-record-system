import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <span>
        <Link className="ui button blue" to="/tabs/patients/add/">
          Add Patient
        </Link>
      </span>
    );
  }
}

export default AddLink;

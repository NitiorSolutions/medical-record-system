import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <span>
        <Link
          className="ui button green"
          to={"/app/patients/view/" + this.props.item.id}
        >
          View
        </Link>
      </span>
    );
  }
}

export default ViewLink;

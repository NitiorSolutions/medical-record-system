import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddImageLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <span>
        <Link className="ui" to={"/app/images/add/" + this.props.item.id}>
          Add Image
        </Link>
      </span>
    );
  }
}

export default AddImageLink;

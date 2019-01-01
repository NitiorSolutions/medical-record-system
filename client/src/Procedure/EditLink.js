import React, { Component } from "react";
import { Link } from "react-router-dom";

class EditLink extends Component {
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
          to={"/app/procedures/edit/" + this.props.item.id}
        >
          Edit
        </Link>
      </span>
    );
  }
}

export default EditLink;

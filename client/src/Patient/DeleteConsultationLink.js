import React, { Component } from "react";
import { Link } from "react-router-dom";

class DeleteConsultationLink extends Component {
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
          className="ui button negative"
          to={"/app/consultations/" + this.props.item.id}
        >
          Delete
        </Link>
      </span>
    );
  }
}

export default DeleteConsultationLink;

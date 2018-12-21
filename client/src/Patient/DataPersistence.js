import React, { Component } from "react";

//// this.props.item.id

class DataPersistence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: props.patient
    };
  }

  render() {
    return (
      <div>
        <h2>{this.props.patient.id}</h2>
      </div>
    );
  }
}

export default DataPersistence;

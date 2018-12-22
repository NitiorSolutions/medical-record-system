import React, { Component } from "react";
import axios from "axios";
import DataPersistence from "./DataPersistence";

let getPatientQuery =
  "http://localhost:3001/api/Patients/5bf969091656522d855d8801";

class Persistence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: []
    };
  }

  componentDidMount() {
    axios.get(getPatientQuery).then(response => {
      this.setState({ patient: response.data }, () => {
        //console.log(this.state.patient);
      });
    });
  }

  render() {
    const { patient } = this.state;

    return (
      <div>
        <DataPersistence patient={patient} />
      </div>
    );
  }
}

export default Persistence;

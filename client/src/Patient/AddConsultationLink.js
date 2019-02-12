import React from "react";
import { Link } from "react-router-dom";

const AddConsultationLink = ({ item }) => (
  <Link className="ui" to={{pathname: "/app/consultations/add/" + item.id, state: { patient: item }}} >
    Add Consultation
  </Link>
);

export default AddConsultationLink;

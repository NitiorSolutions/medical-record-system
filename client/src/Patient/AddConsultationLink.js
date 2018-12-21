import React from "react";
import { Link } from "react-router-dom";

const AddConsultationLink = ({ item }) => (
  <Link className="ui" to={"/tabs/consultations/add/" + item.id}>
    Add Consultation
  </Link>
);

export default AddConsultationLink;

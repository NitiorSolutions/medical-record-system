import React from "react";
import { Link } from "react-router-dom";

const AddConsultationLink = ({ item }) => (
  <Link className="ui" to={"/app/consultations/add/" + item.id}>
    Add Consultation
  </Link>
);

export default AddConsultationLink;

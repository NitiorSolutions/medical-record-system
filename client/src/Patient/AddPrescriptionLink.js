import React from "react";
import { Link } from "react-router-dom";

const AddPrescriptionLink = ({ item }) => (
  <Link className="ui" to={"/app/prescriptions/add/" + item.id}>
    Add Prescription
  </Link>
);

export default AddPrescriptionLink;

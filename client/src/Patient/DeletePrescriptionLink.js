import React from "react";
import { Link } from "react-router-dom";

let isAdmin = localStorage.getItem("isAdmin");
let DeletePrescriptionLink;

if (isAdmin === "false") {
  DeletePrescriptionLink = ({ item }) => (
    <Link
      className="ui button negative disabled"
      to={"/app/prescriptions/delete/" + item.id}
    >
      Delete
    </Link>
  );
} else {
  DeletePrescriptionLink = ({ item }) => (
    <Link
      className="ui button negative"
      to={"/app/prescriptions/delete/" + item.id}
    >
      Delete
    </Link>
  );
}

export default DeletePrescriptionLink;

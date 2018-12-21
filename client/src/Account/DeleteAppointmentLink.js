import React from "react";
import { Link } from "react-router-dom";

let isAdmin = localStorage.getItem("isAdmin");
let DeleteAppointmentLink;

if (isAdmin === "false") {
  DeleteAppointmentLink = ({ item }) => (
    <Link
      className="ui button disabled negative"
      to={"/account/profile/appointments/delete/" + item.id}
    >
      Delete
    </Link>
  );
} else {
  DeleteAppointmentLink = ({ item }) => (
    <Link
      className="ui button negative"
      to={"/account/profile/appointments/delete/" + item.id}
    >
      Delete
    </Link>
  );
}

export default DeleteAppointmentLink;

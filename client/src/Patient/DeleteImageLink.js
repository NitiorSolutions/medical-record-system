import React from "react";
import { Link } from "react-router-dom";

let isAdmin = localStorage.getItem("isAdmin");
let DeleteImageLink;

if (isAdmin === "false") {
  DeleteImageLink = ({ item }) => (
    <Link
      className="ui button negative disabled"
      to={"/app/images/delete/" + item.id}
    >
      Delete
    </Link>
  );
} else {
  DeleteImageLink = ({ item }) => (
    <Link className="ui button negative" to={"/app/images/delete/" + item.id}>
      Delete
    </Link>
  );
}

export default DeleteImageLink;

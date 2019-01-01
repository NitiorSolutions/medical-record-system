import React from "react";
import { Link } from "react-router-dom";

let isAdmin = localStorage.getItem("isAdmin");
let DeleteChartLink;

if (isAdmin === "false") {
  DeleteChartLink = ({ item }) => (
    <Link
      className="ui button disabled negative"
      to={"/app/charts/delete/" + item.id}
    >
      Delete
    </Link>
  );
} else {
  DeleteChartLink = ({ item }) => (
    <Link className="ui button negative" to={"/app/charts/delete/" + item.id}>
      Delete
    </Link>
  );
}

export default DeleteChartLink;

import React from "react";
import { Link } from "react-router-dom";

const ViewChartLink = ({ item }) => (
  <Link className="ui button positive" to={"/app/charts/view/" + item.id}>
    View
  </Link>
);

export default ViewChartLink;

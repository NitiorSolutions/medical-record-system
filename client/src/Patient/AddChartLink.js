import React from "react";
import { Link } from "react-router-dom";

const AddChartsLink = ({ item }) => (
  <Link className="ui" to={"/app/charts/add/" + item.id}>
    Add Chart
  </Link>
);

export default AddChartsLink;

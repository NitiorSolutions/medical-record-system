import React, { Component } from "react";

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Tabs;

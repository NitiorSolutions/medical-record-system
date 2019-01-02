import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <Button as={Link} floated='right' color='green' icon labelPosition='right' to="/app/patients/add">
        <Icon name='add' />
        Add a Patient
      </Button>
  );
  }
}

export default AddLink;

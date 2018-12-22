import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class DeleteModal extends Component {
  state = { open: false };

  show = size => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, size } = this.state;

    return (
      <span>
        <Button onClick={this.show("mini")} negative>
          Delete
        </Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Delete This</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.close}
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default DeleteModal;

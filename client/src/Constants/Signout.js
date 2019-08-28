import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import './Signout.css';

class Signout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleSignout = this.handleSignout.bind(this);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleSignout() {
    localStorage.clear();
    this.props.history.push("/sign-in");
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <span onClick={this.show("blurring")} className='signout'>
          Signout
        </span>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Are you sure you want to logout?</Modal.Header>

          <Modal.Actions>
            <Button negative onClick={this.close}>
              Cancel
            </Button>

            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
              onClick={this.handleSignout}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Signout);

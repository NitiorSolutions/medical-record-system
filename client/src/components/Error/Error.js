import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';

class Error extends Component{
  render(){
    const { open, message } = this.props;
    return (
      <Modal open={open}>
        <Modal.Content>
          <h4>
            {message}
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.props.close}>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

}

export default Error;

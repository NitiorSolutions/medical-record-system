import React, { Component } from 'react';
import { Modal, Button, Icon } from "semantic-ui-react";

import './AdminTitle.css';
import Portal from '../../scenes/Portal/Portal';

class AdminTitle extends Component{
  render(){
    const { ezUser, activeClient } = this.props;
    const titleClass = 'title-h2';
    let switchIcon;
      if( (ezUser === 'CLIENT' || ezUser === 'ADMIN')  && activeClient === 'EMPLOYER') {
        switchIcon = (
          <Modal
            basic
            size='tiny'
            closeIcon
            className='portal-switch-modal'
            trigger={
              <Button
                icon
                circular
                compact
                title='portal quick-switch'
                className='portal-switch-button'
              >
                <Icon name='exchange'/>
              </Button>
            }
          >
            <Modal.Content scrolling>
              <Portal />
            </Modal.Content>
          </Modal>
        )
      }

    return (
      <div>
        { switchIcon }
        <h2 className={titleClass}>
          {this.props.title}
        </h2>
      </div>
    )
  }

}

export default AdminTitle;

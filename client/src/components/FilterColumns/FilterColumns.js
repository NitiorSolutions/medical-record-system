import React, { Component } from 'react';
import { Button, Icon, Form, Modal, Table } from 'semantic-ui-react';

import './FilterColumns.css';

const options = [
  { key: 'n', text: 'Name', value: 'name' },
  { key: 'd', text: 'Description', value: 'description' },
]

class FilterColumns extends Component{
  constructor(props) {
    super(props);
    this.state = {
        open : false,
        dimmer : false
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.show = this.show.bind(this);
  }

  handleConfirm(){
    alert('Filtered!')
  }

  handleCancel(){
    console.log("close")
    this.setState({ open: false })
  }

  show(){
    this.setState({ dimmer: true, open: true })
  }


  render(){
    return (
      <div>
        <Button icon floated='right' color='blue' labelPosition='left' onClick={this.show} className='filter-columns-trigger'>
          <Icon name='filter'/>
          Filter Columns
        </Button>
        <Modal size='small' open={this.state.open} onClose={this.handleCancel} dimmer={this.state.dimmer}>
          <Modal.Header>Filter Columns</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
            <Form>
              <Table basic='very'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Column Name</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell><Form.Select options={options} placeholder='Column Name' /></Table.Cell>
                    <Table.Cell><Form.Input /></Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Icon color='red' name='remove' size='large' />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><Form.Select options={options} placeholder='Column Name' /></Table.Cell>
                    <Table.Cell><Form.Input /></Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Icon color='red' name='remove' size='large' />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button icon floated='left' color='blue' labelPosition='left'>
                <Icon name='add' />
                Add Filter
              </Button>
            </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleCancel}>
              <Icon name='checkmark' /> Apply
            </Button>
            <Button color='red' onClick={this.handleCancel}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default FilterColumns;

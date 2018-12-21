import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react';
import moment from 'moment';

class AddConsultation extends Component{
  constructor(props){
    super(props);
    const today = moment().format('YYYY-MM-DD');
    this.state = {
      date:today,
      payment:'',
      balance:'',
      remarks:'',
      showModal: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      date,
      payment,
      balance,
      remarks
    }  = this.state;

    // Required fields
    if (!date || !payment ) {
      alert('Fields cannot be empty');
      return;
    }
    const newConsultation = {
      date: date,
      payment: payment,
      balance: balance,
      remarks: remarks
    }
    this.props.onSubmit(newConsultation);
    this.close()
  }
  open(){
      this.setState({ showModal: true});
  }

  close(){
      this.setState({ showModal: false});
  }

  render(){
    return (
      <Modal
        trigger={<Button inverted color='green' onClick={this.open}>New Consultation</Button>}
        open={this.state.showModal}
      >
        <Header icon='add' content='Add a Consultation' />
        <Modal.Content>
          <Form>

            <Form.Input
              label = 'Date'
              placeholder='date'
              name = 'date'
              type = 'date'
              value = {this.state.date}
              onChange = {this.handleInputChange}
            />
            <Form.Input
              label = 'Payment'
              placeholder='Payment'
              name = 'payment'
              type = 'number'
              value = {this.state.payment}
              onChange = {this.handleInputChange}
            />
            <Form.Input
              label = 'Balance'
              placeholder='Balance'
              name = 'balance'
              type = 'number'
              value = {this.state.balance}
              onChange = {this.handleInputChange}
            />
            <Form.TextArea
              label = 'Remarks'
              placeholder='Remarks'
              name = 'remarks'
              value = {this.state.remarks}
              onChange = {this.handleInputChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.close}>
            <Icon name='remove' /> Discard
          </Button>
          <Button color='green' onClick={this.handleSubmit}>
            <Icon name='checkmark' /> Save
          </Button>
        </Modal.Actions>
    </Modal>
    )
  }
}

export default AddConsultation;

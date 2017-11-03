import React, { Component } from 'react';
import { Button, Header, Modal, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import constants from '../../../../../../../constants';

class EditConsultation extends Component{
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

  componentDidMount(){
    console.log()
    this.getConsultationDetails();
  }

  getConsultationDetails(){
    const id = this.props.patientId;
    const fk = this.props.consultationId;
    const table = 'patients';
    const serverUrl = constants.server_url.app + '/' + table;
    axios.get(`${serverUrl}/${id}/consultations/${fk}`)
    .then(response => {
      const date = moment(response.data.date).format('YYYY-MM-DD');
      this.setState({
        date:date,
        payment:response.data.payment,
        balance:response.data.balance,
        remarks:response.data.remarks
      });
    })
    .catch(err => console.log(err));
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
    this.props.onUpdate(newConsultation, this.props.consultationId);
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
        trigger={<Button color='blue' onClick={this.open}>Edit</Button>}
        open={this.state.showModal}
      >
        <Header icon='add' content='Edit a Consultation' />
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

export default EditConsultation;

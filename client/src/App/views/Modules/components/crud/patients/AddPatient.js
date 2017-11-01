import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Segment, Button, Grid, Form } from 'semantic-ui-react';
import constants from '../../../../../../constants';

class AddPatient extends Component{
  constructor(props){
    super(props);
    this.state = {
      name:'',
      age:'',
      gender:'',
      civilStatus:'',
      occupation:'',
      address:'',
      birthDate:'',
      refferedBy:'',
      contactNumber:'',
      dateRegistered:'',
      currentUrl: '/modules/patients'
    }
    this.addPatient = this.addPatient.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addPatient(newPatient){
    const table = 'patients';
    const serverUrl = constants.server_url.app + '/' + table;
    const { currentUrl } = this.state;
    console.log(newPatient)
    axios.request({
      method:'post',
      url:`${serverUrl}`,
      data: newPatient
    }).then(response => {
      this.props.history.push(currentUrl);
    }).catch(err => console.log(err));
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
      name,
      age,
      gender,
      civilStatus,
      occupation,
      address,
      birthDate,
      refferedBy,
      contactNumber,
      dateRegistered
    }  = this.state;

    // Required fields
    if (!name || !contactNumber ) {
      alert('Fields cannot be empty');
      return;
    }
    const newPatient = {
      name:name,
      age:age,
      gender:gender,
      civilStatus:civilStatus,
      occupation:occupation,
      address:address,
      birthDate:birthDate,
      refferedBy:refferedBy,
      contactNumber:contactNumber,
      dateRegistered:dateRegistered
    }
    this.addPatient(newPatient);
    this.setState({
      name:'',
      age:'',
      gender:'',
      civilStatus:'',
      occupation:'',
      address:'',
      birthDate:'',
      refferedBy:'',
      contactNumber:'',
      dateRegistered:''
    });
  }

  render(){
    const { currentUrl } = this.state;
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Link className='ui primary button' to={currentUrl}>Back</Link>
            </Grid.Column>
            <Grid.Column width={15}>
              <h1>Add Patient</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  label = 'Name'
                  placeholder='Name'
                  name = 'name'
                  value = {this.state.name}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Age'
                  placeholder='Age'
                  name = 'age'
                  type = 'number'
                  value = {this.state.age}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Gender'
                  placeholder='Gender'
                  name = 'gender'
                  value = {this.state.gender}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Civil Status'
                  placeholder='Civil Status'
                  name = 'civilStatus'
                  value = {this.state.civilStatus}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Occupation'
                  placeholder='Occupation'
                  name = 'occupation'
                  value = {this.state.occupation}
                  onChange = {this.handleInputChange}
                />
                <Form.TextArea
                  label = 'Address'
                  placeholder='Address'
                  name = 'address'
                  value = {this.state.address}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Birthdate'
                  placeholder='Birthdate'
                  name = 'birthDate'
                  type = 'date'
                  value = {this.state.birthDate}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Reffered By'
                  placeholder='Reffered By'
                  name = 'refferedBy'
                  value = {this.state.refferedBy}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Contact Number'
                  placeholder='Contatc Number'
                  name = 'contactNumber'
                  value = {this.state.contactNumber}
                  onChange = {this.handleInputChange}
                />
                <Form.Input
                  label = 'Date Registered'
                  placeholder='Date Registered'
                  name = 'dateRegistered'
                  type = 'date'
                  value = {this.state.dateRegistered}
                  onChange = {this.handleInputChange}
                />
                <Button content='Submit' color='blue'/>
              </Form>
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default AddPatient;

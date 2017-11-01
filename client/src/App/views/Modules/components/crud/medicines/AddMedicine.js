import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Segment, Button, Form } from 'semantic-ui-react';
import constants from '../../../../../../constants';

class AddMedicine extends Component{
  constructor(props){
    super(props);
    this.state = {
      brandName:'',
      genericName:'',
      description:'',
      currentUrl: '/modules/medicines'
    }
    this.addMedicine = this.addMedicine.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addMedicine(newMedicine){
    const table = 'medicines';
    const serverUrl = constants.server_url.app + '/' + table;
    const { currentUrl } = this.state;
    console.log(newMedicine)
    axios.request({
      method:'post',
      url:`${serverUrl}`,
      data: newMedicine
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
      genericName,
      brandName,
      description
    }  = this.state;

    // Required fields
    if (!genericName || !brandName ) {
      alert('Fields cannot be empty');
      return;
    }
    const newMedicine = {
      genericName: genericName,
      brandName: brandName,
      description: description
    }
    this.addMedicine(newMedicine);
    this.setState({
      genericName: '',
      brandName: '',
      description: ''
    });
  }

  render(){
    const { currentUrl } = this.state;
    return (
      <Segment>
        <br />
        <Link className='ui primary button' to={currentUrl}>Back</Link>
        <h1>Add Medicine</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label = 'Generic Name'
            placeholder='Generic Name'
            name = 'genericName'
            value = {this.state.genericName}
            onChange = {this.handleInputChange}
          />
          <Form.Input
            label = 'Brand Name'
            placeholder='Brand Name'
            name = 'brandName'
            value = {this.state.brandName}
            onChange = {this.handleInputChange}
          />
          <Form.TextArea
            label = 'Description'
            placeholder='Description'
            name = 'description'
            value = {this.state.description}
            onChange = {this.handleInputChange}
          />
          <Button content='Submit' color='blue'/>
        </Form>
      </Segment>
    )
  }
}

export default AddMedicine;

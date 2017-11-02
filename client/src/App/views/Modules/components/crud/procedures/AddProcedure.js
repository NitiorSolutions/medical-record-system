import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Segment, Button, Form } from 'semantic-ui-react';
import constants from '../../../../../../constants';

class AddProcedure extends Component{
  constructor(props){
    super(props);
    this.state = {
      name:'',
      fee:'',
      description:'',
      currentUrl: '/modules/procedures'
    }
    this.addProcedure = this.addProcedure.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addProcedure(newProcedure){
    const table = 'procedures';
    const serverUrl = constants.server_url.app + '/' + table;
    const { currentUrl } = this.state;
    console.log(newProcedure)
    axios.request({
      method:'post',
      url:`${serverUrl}`,
      data: newProcedure
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
      fee,
      description
    }  = this.state;

    // Required fields
    if (!name || !fee ) {
      alert('Fields cannot be empty');
      return;
    }
    const newProcedure = {
      name: name,
      fee: fee,
      description: description
    }
    this.addProcedure(newProcedure);
    this.setState({
      name: '',
      fee: '',
      description: ''
    });
  }

  render(){
    const { currentUrl } = this.state;
    return (
      <Segment>
        <br />
        <Link className='ui primary button' to={currentUrl}>Back</Link>
        <h1>Add Procedure</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label = 'Name'
            placeholder='Name'
            name = 'name'
            value = {this.state.name}
            onChange = {this.handleInputChange}
          />
          <Form.TextArea
            label = 'Description'
            placeholder='Description'
            name = 'description'
            value = {this.state.description}
            onChange = {this.handleInputChange}
          />
          <Form.Input
            label = 'Fee'
            placeholder='Fee'
            name = 'fee'
            value = {this.state.fee}
            onChange = {this.handleInputChange}
          />
          <Button content='Submit' color='blue'/>
        </Form>
      </Segment>
    )
  }
}

export default AddProcedure;

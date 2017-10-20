import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Segment, Button, Form } from 'semantic-ui-react';
import constants from '../../../../../../constants';

class EditMedicine extends Component{
  constructor(props){
    super(props);
    this.state = {
      brandName:'',
      genericName:'',
      description:'',
      currentUrl: '/modules/medicines'
    }
    this.editMedicine = this.editMedicine.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.getMedicineDetails();
  }

  editMedicine(newMedicine){
    const id = this.props.match.params.id;
    const table = 'medicines';
    const serverUrl = constants.server_url.app + '/' + table;
    const { currentUrl } = this.state;
    axios.request({
      method:'put',
      url:`${serverUrl}/${id}`,
      data: newMedicine
    }).then(response => {
      this.props.history.push(currentUrl);
    }).catch(err => console.log(err));
  }

  getMedicineDetails(){
    const id = this.props.match.params.id;
    const table = 'medicines';
    const serverUrl = constants.server_url.app + '/' + table;
    axios.get(`${serverUrl}/${id}`)
    .then(response => {
      this.setState({
        genericName: response.data.genericName,
        brandName: response.data.brandName,
        description: response.data.description
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
    this.editMedicine(newMedicine);
    this.setState({
      genericName: this.state.genericName,
      brandName: this.state.brandName,
      description: this.state.description
    });
  }

  render(){
    const { currentUrl } = this.state;
    return (
      <Segment>
        <br />
        <Link
          className='ui primary button'
          to={`${currentUrl}/${this.props.match.params.id}`}
        >
          Back
        </Link>
        <h1>Edit Medicine</h1>
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

export default EditMedicine;

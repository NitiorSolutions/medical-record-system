import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Button, Confirm, Segment, Table } from 'semantic-ui-react';
// import EmployerEmployeesTable from './EmployerEmployeesTable';
import constants from '../../../../../../constants';

class MedicineDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:[],
      open: false,
      currentUrl: '/modules/medicines'
    }
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.show = this.show.bind(this);
  }

  componentDidMount(){
    this.getMedicine();
  }

  getMedicine(){
    const id = this.props.match.params.id;
    const table = 'medicines';
    const serverUrl = constants.server_url.app + '/' + table;
    axios.get(`${serverUrl}/${id}`)
    .then(response => {
      this.setState({details: response.data})
  })
  .catch(err => console.log(err));
  }

  handleConfirm(){
    const id = this.props.match.params.id;
    const medicine = {
      genericName: this.state.details.genericName,
      brandName: this.state.details.brandName,
      description: this.state.details.description,
      active: false
    }
    const table = 'medicines';
    const serverUrl = constants.server_url.app + '/' + table;
    const { currentUrl } = this.state;
    axios.request({
      method:'put',
      url:`${serverUrl}/${id}`,
      data: medicine
    }).then(response => {
      this.setState({ open: false });
      this.props.history.push(currentUrl);
    }).catch(err => console.log(err));
  }

  handleCancel(){
    this.setState({ open: false })
  }

  show(){
    this.setState({ open: true })
  }

  render(){
    const { open, currentUrl } = this.state;
    return (
     <Segment>
       <Link className='ui primary button' to={currentUrl}>Back</Link>
       <h1>{this.state.details.brandName} - {this.state.details.genericName}</h1>
      <Table definition>
        <Table.Body>
        <Table.Row>
          <Table.Cell>Generic Name</Table.Cell>
          <Table.Cell>{this.state.details.genericName}</Table.Cell>
        </Table.Row>
          <Table.Row>
            <Table.Cell>Brand Name</Table.Cell>
            <Table.Cell>{this.state.details.brandName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Description</Table.Cell>
            <Table.Cell>{this.state.details.description}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Link
        className='ui primary button'
        to={`${currentUrl}/edit/${this.props.match.params.id}`}
      >
        Edit
      </Link>

      <Button color="red" floated="right" onClick={this.show}>Delete</Button>
      <Confirm
        open={open}
        content='Are you sure you want to delete this item?'
        cancelButton='No'
        confirmButton='Yes'
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
      />
    </Segment>
    )
  }
}

export default MedicineDetails;

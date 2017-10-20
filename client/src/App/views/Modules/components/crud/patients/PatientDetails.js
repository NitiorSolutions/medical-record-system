import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { Button, Confirm, Grid, Segment, Table } from 'semantic-ui-react';
// import EmployerEmployeesTable from './EmployerEmployeesTable';
import constants from '../../../../../../constants';

class PatientDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:[],
      open: false,
      currentUrl: '/modules/patients'
    }
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.show = this.show.bind(this);
  }

  componentDidMount(){
    this.getPatient();
  }

  getPatient(){
    const id = this.props.match.params.id;
    const table = 'patients';
    const serverUrl = constants.server_url.app + '/' + table;
    axios.get(`${serverUrl}/${id}`)
    .then(response => {
      this.setState({details: response.data})
  })
  .catch(err => console.log(err));
  }

  handleConfirm(){
    const id = this.props.match.params.id;
    const patient = {
      name:this.state.details.name,
      age:this.state.details.age,
      gender:this.state.details.gender,
      civilStatus:this.state.details.civilStatus,
      occupation:this.state.details.occupation,
      address:this.state.details.address,
      birthDate:this.state.details.birthDate,
      refferedBy:this.state.details.refferedBy,
      contactNumber:this.state.details.contactNumber,
      dateRegistered:this.state.details.dateRegistered,
      active: false
    }
    const table = 'patients';
    const serverUrl = constants.server_url.app + '/' + table;
    const { currentUrl } = this.state;
    axios.request({
      method:'put',
      url:`${serverUrl}/${id}`,
      data: patient
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
    const birthDate = moment(this.state.details.birthDate).format('MMMM Do YYYY');
    const dateRegistered = moment(this.state.details.dateRegistered).format('MMMM Do YYYY');
    return (
     <Segment>
       <Grid>
         <Grid.Row>
           <Grid.Column width={1}>
             <Link className='ui primary button' to={currentUrl}>Back</Link>
           </Grid.Column>
           <Grid.Column width={15}>
             <h1>{this.state.details.name}</h1>
             <Table definition>
               <Table.Body>
                 <Table.Row>
                   <Table.Cell collapsing>Name</Table.Cell>
                   <Table.Cell>{this.state.details.name}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Age</Table.Cell>
                   <Table.Cell>{this.state.details.age}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Gender</Table.Cell>
                   <Table.Cell>{this.state.details.gender}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Civil Status</Table.Cell>
                   <Table.Cell>{this.state.details.civilStatus}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Occupation</Table.Cell>
                   <Table.Cell>{this.state.details.occupation}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Address</Table.Cell>
                   <Table.Cell>{this.state.details.address}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Birthdate</Table.Cell>
                   <Table.Cell>{birthDate}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Reffered By</Table.Cell>
                   <Table.Cell>{this.state.details.refferedBy}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Contact Number</Table.Cell>
                   <Table.Cell>{this.state.details.contactNumber}</Table.Cell>
                 </Table.Row>
                 <Table.Row>
                   <Table.Cell>Date Registered</Table.Cell>
                   <Table.Cell>{dateRegistered}</Table.Cell>
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
           </Grid.Column>
         </Grid.Row>
        </Grid>
    </Segment>
    )
  }
}

export default PatientDetails;

import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { Button, Grid, Segment } from 'semantic-ui-react';
// import EmployerEmployeesTable from './EmployerEmployeesTable';
import constants from '../../../../../../constants';
import './patients.css';

class PatientMasterDetails extends Component{
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
    const { currentUrl } = this.state;
    return (
     <Segment>
       <Grid>
         <Grid.Row>
           <Grid.Column width={1}>
             <Link className='ui primary button' to={currentUrl}>Back</Link>
           </Grid.Column>
           <Grid.Column width={15}>
             <h1>
              {this.state.details.name} ({this.state.details.gender})
              <Link
                className='ui primary right floated button'
                to={`${currentUrl}/details/${this.props.match.params.id}`}
              >
                See Details
              </Link>
            </h1>
            <h5 className='patient-details'>{moment(this.state.details.birthDate).format('MMMM Do YYYY')} / {this.state.details.age} y/o </h5>
            <h5 className='patient-details'>{this.state.details.contactNumber} </h5>
            <h5 className='patient-details'>{this.state.details.address} </h5>
            <Button primary>Generate Patient Information</Button>
           </Grid.Column>
         </Grid.Row>
        </Grid>
    </Segment>
    )
  }
}

export default PatientMasterDetails;

import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { Accordion, Button, Grid, Icon, Segment } from 'semantic-ui-react';
import PatientConsultationsTable from './PatientConsultationsTable';
import constants from '../../../../../../constants';
import './patients.css';

class PatientMasterDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeIndex:0,
      details:[],
      open: false,
      currentUrl: '/modules/patients'
    }
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e, titleProps){
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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
    const { currentUrl, activeIndex } = this.state;
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

            <Accordion fluid styled className='patient-accordion'>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Consultation History
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <PatientConsultationsTable
                  patientId = {this.props.match.params.id}
                />
              </Accordion.Content>

              <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Prescription History
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <p>
                  There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
                  {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
                </p>
              </Accordion.Content>

              <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Treatments History
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <p>
                  Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
                </p>
                <p>
                  A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to
                  {' '}assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your
                  {' '}dog from a shelter, helps give a good home to a dog who may not find one so readily.
                </p>
              </Accordion.Content>
            </Accordion>

           </Grid.Column>
         </Grid.Row>
        </Grid>
    </Segment>
    )
  }
}

export default PatientMasterDetails;

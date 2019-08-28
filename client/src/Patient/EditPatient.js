import React, { Component } from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const optionsGender = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
  { key: 'n', text: 'Not Specified', value: 'Not Specified' }
];

const optionsCivilStatus = [
  { key: 's', text: 'Single', value: 'Single' },
  { key: 'm', text: 'Married', value: 'Married' },
  { key: 'w', text: 'Widowed', value: 'Widowed' },
  { key: 'se', text: 'Separated', value: 'Separated' },
  { key: 'd', text: 'Divorced', value: 'Divorced' }
];

class EditPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      firstName: "",
      middleName: "",
      lastName: "",
      birthdate: "",
      sex: "",
      civilStatus: "",
      occupation: "",
      address: "",
      contactNumber: ""
    };

    this.getPatient = this.getPatient.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getPatient();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onEdit() {
    let patientId = this.props.match.params.id;
    console.log(patientId);
    const editedPatient = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      birthdate: this.state.birthdate,
      sex: this.state.sex,
      civilStatus: this.state.civilStatus,
      occupation: this.state.occupation,
      address: this.state.address,
      contactNumber: this.state.contactNumber,
      remarks: this.state.remarks,
      medicalHistory: this.state.medicalHistory,
      dateRegistered: this.state.dateRegistered
    };
    const url = process.env.REACT_APP_URL+'/patients/' + patientId;
    axios
      .request({
        method: "put",
        url: url,
        data: editedPatient
      })
      .then(response => {
        //Add to logs
        const currentDate = new Date();
        const newLog = {
          activity: "Edited Patient: " + this.state.lastName,
          date: currentDate,
          user: localStorage.userName
        };
        const url2 = process.env.REACT_APP_URL+'/logs';
        axios.request({
          method: "post",
          url: url2,
          data: newLog
        });

        this.props.history.push("/app/patients");
      });
  }

  getPatient() {
    let patientId = this.props.match.params.id;
    const url = process.env.REACT_APP_URL+'/patients/' + patientId;
    axios
      .get(url)
      .then(response =>
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          birthdate: moment(response.data.birthdate).format('YYYY-MM-DD'),
          sex: response.data.sex,
          civilStatus: response.data.civilStatus,
          occupation: response.data.occupation,
          address: response.data.address,
          contactNumber: response.data.contactNumber,
          medicalHistory: response.data.medicalHistory,
          remarks: response.data.remarks,
          dateRegistered: moment(response.data.dateRegistered).format('YYYY-MM-DD')
        })
      );
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close} closeOnDimmerClick={false}>
          <Modal.Header>Edit Patient</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  name="firstName"
                  type="text"
                  fluid
                  label="First Name"
                  placeholder="First Name"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.middleName}
                  name="middleName"
                  type="text"
                  fluid
                  label="Middle Name"
                  placeholder="Middle Name"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  name="lastName"
                  type="text"
                  fluid
                  label="Last Name"
                  placeholder="Last Name"
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.birthdate}
                  label="Birthdate"
                  name="birthdate"
                  type="date"
                />
              <Form.Field
                  onChange={this.handleChange}
                  value={this.state.sex}
                  control={Select}
                  label="Gender"
                  placeholder="Gender"
                  name="sex"
                  options={optionsGender}
                />
                <Form.Select
                  onChange={this.handleChange}
                  value={this.state.civilStatus}
                  label="Civil Status"
                  placeholder="Civil Status"
                  name="civilStatus"
                  options={optionsCivilStatus}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.occupation}
                  name="occupation"
                  type="text"
                  fluid
                  label="Occupation"
                  placeholder="Occupation"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.contactNumber}
                  name="contactNumber"
                  type="text"
                  fluid
                  label="Contact Number"
                  placeholder="Contact Number"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.dateRegistered}
                  label="Date Registered"
                  name="dateRegistered"
                  type="date"
                />
              </Form.Group>

              <Form.Input
                onChange={this.handleChange}
                value={this.state.address}
                name="address"
                type="text"
                fluid
                label="Address"
                placeholder="Address"
              />
              <Form.Input
                onChange={this.handleChange}
                value={this.state.medicalHistory}
                name="medicalHistory"
                type="text"
                fluid
                label="Medical History"
                placeholder="Medical History"
              />
              <Form.Input
                onChange={this.handleChange}
                value={this.state.remarks}
                name="remarks"
                type="text"
                fluid
                label="Remarks"
                placeholder="Remarks"
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/app/patients" className="ui button negative">
              Cancel
            </Link>
            <Button onClick={this.onAdd} positive>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default EditPatient;

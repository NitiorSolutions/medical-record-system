import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class EditPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      firstName: "",
      middleName: "",
      lastName: "",
      age: 0,
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
      age: this.state.age,
      sex: this.state.sex,
      civilStatus: this.state.civilStatus,
      occupation: this.state.occupation,
      address: this.state.address,
      contactNumber: this.state.contactNumber
    };

    axios
      .request({
        method: "put",
        url: "http://localhost:3001/api/patients/" + patientId,
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

        axios.request({
          method: "post",
          url: "http://localhost:3001/api/logs/",
          data: newLog
        });

        this.props.history.push("/app/patients");
      });
  }

  getPatient() {
    let patientId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/patients/" + patientId)
      .then(response =>
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          age: response.data.age,
          sex: response.data.sex,
          civilStatus: response.data.civilStatus,
          occupation: response.data.occupation,
          address: response.data.address,
          contactNumber: response.data.contactNumber
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
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
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

              <Form.Group>
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.age}
                  name="age"
                  type="text"
                  label="Age"
                  placeholder="Age"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.sex}
                  name="sex"
                  type="text"
                  label="Sex"
                  placeholder="Sex"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.civilStatus}
                  name="civilStatus"
                  type="text"
                  label="Civil Status"
                  placeholder="Civil Status"
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
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/app/patients/" className="ui button negative">
              Cancel
            </Link>
            <Button onClick={this.onEdit} positive>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default EditPatient;

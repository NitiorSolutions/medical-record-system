import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
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

    this.onAdd = this.onAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onAdd() {
    const newPatient = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      age: parseInt(this.state.age, 10),
      sex: this.state.sex,
      civilStatus: this.state.civilStatus,
      occupation: this.state.occupation,
      address: this.state.address,
      contactNumber: this.state.contactNumber
    };
    const url = process.env.REACT_APP_URL+'/patients';
    axios
      .request({
        method: "post",
        url: url,
        data: newPatient
      })
      .then(response => {
        const currentDate = new Date();
        const newLog = {
          activity: "Added patient: " + this.state.lastName,
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
          <Modal.Header>Add Patient</Modal.Header>
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

export default AddPatient;

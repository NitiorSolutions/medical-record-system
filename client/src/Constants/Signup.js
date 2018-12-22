import React, { Component } from "react";
import { Button, Modal, Header, Form, Divider } from "semantic-ui-react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      userName: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      age: 0,
      sex: "",
      licenseNumber: "",
      ptrNumber: "",
      contactNumber: "",
      address: "",
      isAdmin: false,
      isVerified: false
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleSignup() {
    const newAccount = {
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      age: parseInt(this.state.age, 10),
      sex: this.state.sex,
      licenseNumber: this.state.licenseNumber,
      ptrNumber: this.state.ptrNumber,
      contactNumber: this.state.contactNumber,
      address: this.state.address,
      isAdmin: false,
      isVerified: true
    };

    axios
      .request({
        method: "post",
        url: "http://localhost:3001/api/Accounts/",
        data: newAccount
      })
      .then(response => {});

    this.close();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button onClick={this.show("blurring")} color="blue" inverted>
          Sign Up
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create User</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.userName}
                  name="userName"
                  type="text"
                  fluid
                  label="Username"
                  placeholder="Username"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                  type="password"
                  fluid
                  label="Password"
                  placeholder="Password"
                />
              </Form.Group>

              <Divider />

              <Header>Personal Information</Header>
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
              </Form.Group>

              <Divider />

              <Form.Group widths="equal">
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.licenseNumber}
                  name="licenseNumber"
                  type="text"
                  fluid
                  label="License Number"
                  placeholder="License Number"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={this.state.ptrNumber}
                  name="ptrNumber"
                  type="text"
                  fluid
                  label="Ptr Number"
                  placeholder="Ptr Number"
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
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button onClick={this.handleSignup} positive>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Signup;

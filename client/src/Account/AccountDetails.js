import React, { Component } from "react";
import { Form, Button, Segment, Divider, Header } from "semantic-ui-react";
import axios from "axios";
import { withRouter } from "react-router-dom";

let userName, password;

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    //These are accessed
    this.state = {
      labelInf: "Edit",
      isEdit: true,
      id: "",
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
      isAdmin: "",
      isVerified: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    userName = localStorage.getItem("userName");
    password = localStorage.getItem("password");

    axios.get("http://localhost:3001/api/Accounts").then(response => {
      var i = 0;
      for (i = 0; i < response.data.length; i++) {
        if (userName === response.data[i].userName) {
          if (password === response.data[i].password) {
            this.setState({
              id: response.data[i].id,
              userName: response.data[i].userName,
              password: response.data[i].password,

              firstName: response.data[i].firstName,
              middleName: response.data[i].middleName,
              lastName: response.data[i].lastName,

              age: parseInt(response.data[i].age, 10),
              sex: response.data[i].sex,

              licenseNumber: response.data[i].licenseNumber,
              ptrNumber: response.data[i].ptrNumber,
              contactNumber: response.data[i].contactNumber,

              isAdmin: response.data[i].isAdmin,
              isVerified: response.data[i].isVerified,

              address: response.data[i].address
            });
          }
        }
      }
    });
  }

  setLabel() {
    const editedAccount = {
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      age: parseInt(this.state.age, 10),
      sex: this.state.sex,
      address: this.state.address,
      ptrNumber: this.state.ptrNumber,
      licenseNumber: this.state.licenseNumber,
      contactNumber: this.state.contactNumber,
      isAdmin: this.state.isAdmin,
      isVerified: this.state.isVerified,
      id: this.state.id
    };

    const getId = this.state.id;

    axios
      .request({
        method: "put",
        url: "http://localhost:3001/api/Accounts/" + getId,
        data: editedAccount
      })
      .then(response => {
        this.props.history.push("/tabs/patients");
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

  render() {
    //Pass your state parameters from the constructor to your render function
    //Access them as initialized
    const { labelInf } = this.state;

    return (
      <div>
        <Button onClick={this.setLabel.bind(this)} positive>
          {labelInf}
        </Button>

        <Segment stacked>
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
                type="text"
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
        </Segment>
      </div>
    );
  }
}

export default withRouter(AccountDetails);

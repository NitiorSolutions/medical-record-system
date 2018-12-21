import React, { Component } from "react";
import {
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Button
} from "semantic-ui-react";
import Signup from "./Signup";

import axios from "axios";

import "./Signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      email: "",
      password: "",
      userToken: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin() {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    //Get User
    axios.get("http://localhost:3001/api/Accounts").then(response => {
      var i = 0;
      for (i = 0; i < response.data.length; i++) {
        if (userData.email === response.data[i].userName) {
          if (userData.password === response.data[i].password) {
            localStorage.setItem("userName", userData.email);
            localStorage.setItem("password", userData.password);
            localStorage.setItem("isAdmin", response.data[i].isAdmin);
            localStorage.setItem("isVerified", response.data[i].isVerified);
            this.props.history.push("/tabs/patients");
          }
        }
      }
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
    const { email, password } = this.state;
    const { userToken } = this.state;

    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Welcome to Dental Record System! {userToken.ttl}
            </Header>

            <Form size="large">
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />

                <Form.Input
                  onChange={this.handleChange}
                  value={password}
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button onClick={this.handleLogin} color="blue">
                  Sign in
                </Button>
              </Segment>
            </Form>

            <Message>
              <Signup />
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Signin;

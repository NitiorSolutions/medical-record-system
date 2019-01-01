import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {
  Form,
  Grid,
  Header,
  Segment,
  Button
} from "semantic-ui-react";

import axios from "axios";

import "./Signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      email: "",
      password: "",
      userToken: "",
      redirUrl: null
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
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("isSuperAdmin", response.data[i].isSuperAdmin);
            localStorage.setItem("isAdmin", response.data[i].isAdmin);
            localStorage.setItem("isVerified", response.data[i].isVerified);
            this.props.history.push("/app/patients");
          }
        }
      }
      this.setState({redirUrl: '/app/patients'});
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
    const { email, password, redirUrl, userToken } = this.state;
    return (
      <div className="login-form">
        {
        localStorage.getItem("loggedIn") ? <Redirect to={{ pathname: redirUrl }}/> :
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
          </Grid.Column>
        </Grid>
        }
      </div>
    );
  }
}

export default Signin;

import React, { Component } from "react";
import { Menu, Input, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import daniel from "../images/daniel.jpg";
import axios from "axios";

import Signup from "./Signup";

let userName, password;

class Leftwing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentWillMount() {
    userName = localStorage.getItem("userName");
    password = localStorage.getItem("password");

    axios.get("http://localhost:3001/api/Accounts").then(response => {
      var i = 0;
      for (i = 0; i < response.data.length; i++) {
        if (userName === response.data[i].userName) {
          if (password === response.data[i].password) {
            this.setState({ accounts: response.data[i] });
          }
        }
      }
    });
  }

  render() {
    const { activeItem } = this.state;
    console.log(localStorage.getItem("isSuperAdmin"));
    return (
      <Menu vertical color="blue">
        <Menu.Item>
          <center>
            <Image src={daniel} circular size="small" />
          </center>
        </Menu.Item>

        <Menu.Item>
          <Input placeholder="Search the site..." />
        </Menu.Item>

        <Menu.Item>
          {this.state.accounts.firstName} {this.state.accounts.lastName}
        </Menu.Item>

        <Menu.Item>
          Home
          <Menu.Menu>
            <Menu.Item>
              <Link to="/app/patients/">Patients</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/app/medicines/">Medicines</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/app/procedures/">Procedures</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          Manage
          <Menu.Menu>
            <Menu.Item>
              <Link to="/account/profile/">Profile</Link>
            </Menu.Item>

            {/* <Menu.Item>
                                <Link to="/account/">
                                System Accounts
                                </Link>
                            </Menu.Item> */}
            {
              localStorage.getItem("isSuperAdmin") === "true" ?
                <Menu.Item>
                  <Signup />
                </Menu.Item>
              :
              <React.Fragment />
            }
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Leftwing;

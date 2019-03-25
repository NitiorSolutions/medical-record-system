import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

import Signup from "./Signup";
import './Leftwing.css';

let userName, password;

class Leftwing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      activeItem: 'patients'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    userName = localStorage.getItem("userName");
    password = localStorage.getItem("password");
    const url = process.env.REACT_APP_URL+'/Accounts';
    axios.get(url).then(response => {
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
    return (
      <Menu vertical color="blue">

        <Menu.Item>
          <h3>Welcome {this.state.accounts.firstName} {this.state.accounts.lastName}!</h3>
        </Menu.Item>

        <Menu.Item>
          <Menu.Menu>
            <Menu.Item as={Link} to="/app/patients" name='patients' active={activeItem === 'patients'} className='leftwing-menu-item' onClick={this.handleItemClick}>
              Patients
            </Menu.Item>

            <Menu.Item as={Link} to="/app/medicines" name='medicines' active={activeItem === 'medicines'} className='leftwing-menu-item' onClick={this.handleItemClick}>
              Medicines
            </Menu.Item>

            <Menu.Item as={Link} to="/app/procedures" name='procedures' active={activeItem === 'procedures'} className='leftwing-menu-item' onClick={this.handleItemClick}>
              Procedures
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          Manage
          <Menu.Menu>
            <Menu.Item as={Link} to="/app/profile" name='profile' active={activeItem === 'profile'} className='leftwing-menu-item' onClick={this.handleItemClick}>
              Profile
            </Menu.Item>

            {/* Will put all users <Menu.Item>
                                <Link to="/account/">
                                System Accounts
                                </Link>
                            </Menu.Item> */}
            {
              localStorage.getItem("isSuperAdmin") === "true" ?
                <Menu.Item className='leftwing-menu-item-create'>
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

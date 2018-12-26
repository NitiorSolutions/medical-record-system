import React, { Component } from "react";
import { Menu, Button, Icon, Image } from "semantic-ui-react";
import logo from "../images/eDental-logo.png";
import { Link } from "react-router-dom";
import Signout from "./Signout";

class Nav extends Component {

  render() {
    return (
      <Menu fixed="top" inverted className="primary-nav">
        <Menu.Item>
          <Link to="/app/patients/">
            <Image src={logo} size="mini" />
          </Link>
        </Menu.Item>

        <Menu.Item position="right">
          <Signout />
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;

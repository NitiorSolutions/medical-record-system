import React, { Component } from "react";
import { Menu, Button, Icon, Image } from "semantic-ui-react";
import logo from "../images/eDental-logo.png";
import { Link } from "react-router-dom";
import Signout from "./Signout";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class Nav extends Component {
  handleBack() {
    history.goBack();
  }

  render() {
    return (
      <Menu inverted>
        <Menu.Item>
          <Button
            animated="vertical"
            color="black"
            onClick={this.handleBack.bind(this)}
          >
            <Button.Content visible>
              <Icon name="angle left" />
            </Button.Content>
            <Button.Content hidden>Back</Button.Content>
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Link to="/tabs/patients/">
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

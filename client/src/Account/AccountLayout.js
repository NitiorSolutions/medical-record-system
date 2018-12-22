import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import AccountTab from "../Account/AccountTab.js";
import Leftwing from "../Constants/Leftwing";
import Nav from "../Constants/Nav";

class AccountLayout extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Grid relaxed columns={2}>
          <Grid.Column width={3}>
            <Leftwing />
          </Grid.Column>

          <Grid.Column width={12}>
            <AccountTab />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AccountLayout;

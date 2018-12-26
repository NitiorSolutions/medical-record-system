import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PatientProfile from "../Patient/PatientProfile";
import PatientTab from "../Patient/PatientTab.js";
import MedicineTab from "../Medicine/MedicineTab.js";
import ProcedureTab from "../Procedure/ProcedureTab.js";
import AccountTab from "../Account/AccountTab.js";
import Leftwing from "./Leftwing";
import Nav from "./Nav";
import Tabs from "./Tabs";

class Layout extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Grid relaxed columns={2}>
          <Grid.Column width={3}>
            <Leftwing />
          </Grid.Column>

          <Grid.Column width={12}>
            <Router>
              <Tabs>
                <Route path="/app/patients" exact component={PatientTab} />
                <Route path="/app/medicines" exact component={MedicineTab} />
                <Route path="/app/procedures" exact component={ProcedureTab} />
                <Route path="/account/" exact component={AccountTab} />
                <Route
                  path="/app/patients/alec"
                  exact
                  component={PatientProfile}
                />
              </Tabs>
            </Router>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Layout;

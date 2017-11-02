import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import MedicineDetails from './components/crud/medicines/MedicineDetails';
import AddMedicine from './components/crud/medicines/AddMedicine';
import EditMedicine from './components/crud/medicines/EditMedicine';
import MedicineTable from './components/crud/medicines/MedicineTable';

import ProcedureDetails from './components/crud/procedures/ProcedureDetails';
import AddProcedure from './components/crud/procedures/AddProcedure';
import EditProcedure from './components/crud/procedures/EditProcedure';
import ProcedureTable from './components/crud/procedures/ProcedureTable';

import PatientMasterDetails from './components/crud/patients/PatientMasterDetails';
import PatientDetails from './components/crud/patients/PatientDetails';
import AddPatient from './components/crud/patients/AddPatient';
import EditPatient from './components/crud/patients/EditPatient';
import PatientTable from './components/crud/patients/PatientTable';

import {
  Switch,
  Route
} from 'react-router-dom';

class Modules extends Component{
  render(){
    return(
      <div>
          <Menu stackable pointing >
          <NavLink
            className="item"
            activeClassName="active"
            to="/modules/patients">
            Patients
          </NavLink>
          <NavLink
            className="item"
            activeClassName="active"
            to="/modules/medicines">
            Medicines
          </NavLink>
          <NavLink
            className="item"
            activeClassName="active"
            to="/modules/procedures">
            Procedures
          </NavLink>

          </Menu>

          <Switch>
            <Route exact path="/modules/patients" component={PatientTable} />
            <Route exact path='/modules/patients/add' component={AddPatient} />
            <Route exact path='/modules/patients/details/:id' component={PatientDetails} />
            <Route exact path='/modules/patients/edit/:id' component={EditPatient} />
            <Route exact path="/modules/patients/:id" component={PatientMasterDetails} />

            <Route exact path="/modules/medicines" component={MedicineTable} />
            <Route exact path='/modules/medicines/add' component={AddMedicine} />
            <Route exact path='/modules/medicines/edit/:id' component={EditMedicine} />
            <Route exact path="/modules/medicines/:id" component={MedicineDetails} />

            <Route exact path="/modules/procedures" component={ProcedureTable} />
            <Route exact path='/modules/procedures/add' component={AddProcedure} />
            <Route exact path='/modules/procedures/edit/:id' component={EditProcedure} />
            <Route exact path="/modules/procedures/:id" component={ProcedureDetails} />
          </Switch>

      </div>
    );
  }
}



export default Modules;

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import MedicineDetails from './components/crud/medicines/MedicineDetails';
import AddMedicine from './components/crud/medicines/AddMedicine';
import EditMedicine from './components/crud/medicines/EditMedicine';
import MedicineTable from './components/crud/medicines/MedicineTable';

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
              to="/modules/medicines">
              Medicines
            </NavLink>

          </Menu>

          <Switch>
            <Route exact path="/modules/medicines" component={MedicineTable} />
            <Route exact path='/modules/medicines/add' component={AddMedicine} />
            <Route exact path='/modules/medicines/edit/:id' component={EditMedicine} />
            <Route exact path="/modules/medicines/:id" component={MedicineDetails} />
          </Switch>

      </div>
    );
  }
}



export default Modules;

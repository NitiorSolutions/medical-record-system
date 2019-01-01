import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from '../components/Loading/Loading';

//Account
const AccountProfile = Loadable({
  loader: () => import('../Account/AccountProfile'),
  loading: Loading,
});

const DeleteAppointment = Loadable({
  loader: () => import('../Account/DeleteAppointment'),
  loading: Loading,
});


//Patient Components
const PatientLayout = Loadable({
  loader: () => import('../Patient/PatientLayout'),
  loading: Loading,
});

const PatientProfileLayout = Loadable({
  loader: () => import('../Patient/PatientProfileLayout'),
  loading: Loading,
});

const AddPatient = Loadable({
  loader: () => import('../Patient/AddPatient'),
  loading: Loading,
});

const EditPatient = Loadable({
  loader: () => import('../Patient/EditPatient'),
  loading: Loading,
});

const DeletePatient = Loadable({
  loader: () => import('../Patient/DeletePatient'),
  loading: Loading,
});

//Consultations
const DeleteConsultation = Loadable({
  loader: () => import('../Patient/DeleteConsultation'),
  loading: Loading,
});

const AddConsultation = Loadable({
  loader: () => import('../Patient/AddConsultation'),
  loading: Loading,
});

//Prescriptions
const AddPrescription = Loadable({
  loader: () => import('../Patient/AddPrescription'),
  loading: Loading,
});

const DeletePrescription = Loadable({
  loader: () => import('../Patient/DeletePrescription'),
  loading: Loading,
});

//Charts
const AddChart = Loadable({
  loader: () => import('../Patient/AddChart'),
  loading: Loading,
});

const ViewChart = Loadable({
  loader: () => import('../Patient/ViewChart'),
  loading: Loading,
});

const DeleteChart = Loadable({
  loader: () => import('../Patient/DeleteChart'),
  loading: Loading,
});

//Images
const AddImage = Loadable({
  loader: () => import('../Patient/AddImage'),
  loading: Loading,
});

const DeleteImage = Loadable({
  loader: () => import('../Patient/DeleteImage'),
  loading: Loading,
});

//Medicine Components
const MedicineLayout = Loadable({
  loader: () => import('../Medicine/MedicineLayout'),
  loading: Loading,
});

const AddMedicine = Loadable({
  loader: () => import('../Medicine/AddMedicine'),
  loading: Loading,
});

const EditMedicine = Loadable({
  loader: () => import('../Medicine/EditMedicine'),
  loading: Loading,
});

const DeleteMedicine = Loadable({
  loader: () => import('../Medicine/DeleteMedicine'),
  loading: Loading,
});

//Procedure Components
const ProcedureLayout = Loadable({
  loader: () => import('../Procedure/ProcedureLayout'),
  loading: Loading,
});

const AddProcedure = Loadable({
  loader: () => import('../Procedure/AddProcedure'),
  loading: Loading,
});

const EditProcedure = Loadable({
  loader: () => import('../Procedure/EditProcedure'),
  loading: Loading,
});

const DeleteProcedure = Loadable({
  loader: () => import('../Procedure/DeleteProcedure'),
  loading: Loading,
});

const NotFound = () => <h2>Route not found!</h2>;

class Routes extends Component {

  render(){
    return(
      <div>
        { localStorage.getItem("loggedIn") ? (
          <div>
            <Switch>
              {/* Patients */}
              <Route path="/app/patients" exact component={PatientLayout} />
              <Route
                path="/app/patients/view/:id"
                exact
                component={PatientProfileLayout}
              />
            <Route path="/app/patients/add" exact component={AddPatient} />
              <Route
                path="/app/patients/edit/:id"
                exact
                component={EditPatient}
              />
              <Route
                path="/app/patients/delete/:id"
                exact
                component={DeletePatient}
              />

              {/* Images */}
              <Route path="/app/images/add/:id" exact component={AddImage} />
              <Route
                path="/app/images/delete/:id"
                exact
                component={DeleteImage}
              />

              {/* Consultations */}
              <Route
                path="/app/consultations/:id"
                exact
                component={DeleteConsultation}
              />
              <Route
                path="/app/consultations/add/:id"
                exact
                component={AddConsultation}
              />

              {/* Prescriptions */}
              <Route
                path="/app/prescriptions/add/:id"
                exact
                component={AddPrescription}
              />
              <Route
                path="/app/prescriptions/delete/:id"
                exact
                component={DeletePrescription}
              />

              {/* Charts */}
              <Route
                path="/app/charts/view/:id"
                exact
                component={ViewChart}
              />
              <Route path="/app/charts/add/:id" exact component={AddChart} />
              <Route
                path="/app/charts/delete/:id"
                exact
                component={DeleteChart}
              />

              {/* Medicines */}
              <Route
                path="/app/medicines"
                exact
                component={MedicineLayout}
              />
              <Route
                path="/app/medicines/add"
                exact
                component={AddMedicine}
              />
              <Route
                path="/app/medicines/edit/:id"
                exact
                component={EditMedicine}
              />
              <Route
                path="/app/medicines/delete/:id"
                exact
                component={DeleteMedicine}
              />

              {/* Procedures */}
              <Route
                path="/app/procedures"
                exact
                component={ProcedureLayout}
              />
              <Route
                path="/app/procedures/add"
                exact
                component={AddProcedure}
              />
              <Route
                path="/app/procedures/edit/:id"
                exact
                component={EditProcedure}
              />
              <Route
                path="/app/procedures/delete/:id"
                exact
                component={DeleteProcedure}
              />

              {/* Accounts */}
              <Route
                path="/app/profile"
                exact
                component={AccountProfile}
              />
              <Route
                path="/app/profile/appointments/delete/:id"
                exact
                component={DeleteAppointment}
              />

              <Route component={NotFound} />
            </Switch>
          </div>
          ) : <Redirect to={{ pathname: '/sign-in' }}/>
        }
    </div>
    )
  }
}

export default Routes;

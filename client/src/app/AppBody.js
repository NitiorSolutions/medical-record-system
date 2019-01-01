import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Leftwing from "../Constants/Leftwing";

import Loading from '../components/Loading/Loading';

const Routes = Loadable({
  loader: () => import('./Routes'),
  loading: Loading,
});

const NavBar = Loadable({
  loader: () => import('../components/NavBar/NavBar'),
  loading: Loading,
});

const Footer = Loadable({
  loader: () => import('../components/Footer/Footer'),
  loading: Loading,
});

class AppBody extends Component {
  render() {
    const { leftItems, rightItems, currentUrl } = this.props;
    return (
      <div>
        { localStorage.getItem("loggedIn") ?
          (
            <div>
              <NavBar
                leftItems={leftItems}
                rightItems={rightItems}
                currentUrl={currentUrl}
              />

              <Grid columns={2} className='ez-main'>
                <Grid.Column width={3}>
                  <Leftwing />
                </Grid.Column>

                <Grid.Column width={12}>
                  <div >
                    <Routes />
                  </div>
                </Grid.Column>
              </Grid>
              <Footer />
            </div>
          ) : <Redirect to={{ pathname: '/sign-in' }}/>
        }
      </div>
    );
  }
}


export default AppBody;

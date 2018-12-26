import React, { Component } from "react";
import { Grid, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

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
    const { leftItems, rightItems, currentUrl, pathname } = this.props;
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
              <div className='ez-main' >
                <Routes />
              </div>
              <Footer />
            </div>
          ) : <Redirect to={{ pathname: '/sign-in' }}/>
        }
      </div>
    );
  }
}


export default AppBody;

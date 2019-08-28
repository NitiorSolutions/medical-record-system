import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

import Loading from './components/Loading/Loading';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

import ScrollToTop from './components/ScrollToTop';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const App = Loadable({
  loader: () => import('./app/App'),
  loading: Loading,
});

const SignIn = Loadable({
  loader: () => import('./Constants/Signin'),
  loading: Loading,
});

ReactDOM.render(
  <Router>
    <ScrollToTop>
      <Route exact path="/sign-in" component={SignIn} />
      <Route path="/app" component={App} />
    </ScrollToTop>
  </Router>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App/App';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

ReactDOM.render(
  <Router>
      <Route path="/" component={App} />
  </Router>,

    document.getElementById('root')
);

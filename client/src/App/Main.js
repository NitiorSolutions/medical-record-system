import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import Home from './views/Home/Home';
import Modules from './views/Modules/Modules';

class Main extends Component {
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/modules" component={Modules} />
      </Switch>
    )
  }
}

export default Main;

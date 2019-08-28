import React, { Component } from "react";
import { Container } from 'semantic-ui-react'
import Loadable from 'react-loadable';

import './App.css';
import Loading from '../components/Loading/Loading';

const AppBody = Loadable({
  loader: () => import('./AppBody'),
  loading: Loading,
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pathname: ''
    }
  }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    if ( localStorage.getItem("loggedIn") ) {
      this.setState({pathname: pathname});
    }
  }

  componentWillReceiveProps(newProps){
    const pathname = newProps.location.pathname;
    this.setState({pathname: pathname});
  }

  render(){
    let currentUrl;
    const { pathname } = this.state;
    return(
      <Container>
        <AppBody
          pathname={pathname}
          currentUrl={currentUrl}
          leftItems={leftItems}
          rightItems={rightItems}
        />
      </Container>
    )
  }
}

  const leftItems = [];

  const rightItems = [];

export default App;

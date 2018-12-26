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
  //   { content: "Home", key: "home", to:"/app", exact:true, className:"item", activeClassName:"active" },
  //   { content: "Enrollment", key: "enrollment", to:"/app/enrollment", className:"item", activeClassName:"active" },
  //   { content: "Invoices", key: "invoice-manager", to:"/app/invoice-manager", className:"item", activeClassName:"active" }
  // ];

  const rightItems = [];

  const rightItemsAdmin = [
    { content: "Home", key: "dashboard", to:"/app/dashboard/client", className:"item", activeClassName:"active", iconname:"home" },
    //{ content: "Employers", key: "employers", to:"/app/profile/client", className:"item", activeClassName:"active", iconname:"briefcase" },
    { content: "Client Management", key: "client", to:"/app/client-management", className:"item", activeClassName:"active", iconname:"briefcase" },

    { content: "Setup", key: "Setup", to:"/app/user-management", className:"item", activeClassName:"active", iconname:"settings" },
    { content: "Sign Out", key: "signout", to:"/sign-in", className:"item", activeClassName:"", iconname:"user outline" }
  ];

  const rightItemsClient = [
    { content: "Home", key: "dashboard", to:"/app/dashboard/client", className:"item", activeClassName:"active", iconname:"home" },
    //{ content: "Employers", key: "employers", to:"/app/profile/client", className:"item", activeClassName:"active", iconname:"briefcase" },
    { content: "Broker Management", key: "brokers", to:"/app/broker-management", className:"item", activeClassName:"active", iconname:"handshake" },
    { content: "Employer Management", key: "employers", to:"/app/employer-management", className:"item", activeClassName:"active", iconname:"briefcase" },
    { content: "Setup", key: "Setup", to:"/app/user-management", className:"item", activeClassName:"active", iconname:"settings" },
    { content: "Sign Out", key: "signout", to:"/sign-in", className:"item", activeClassName:"", iconname:"user outline" }
  ];

export default App;

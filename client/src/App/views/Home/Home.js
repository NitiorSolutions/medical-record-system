import React, { Component } from 'react'
import './Home.css';
import { Image } from 'semantic-ui-react'

class Home extends Component{
  render(){
    return(
      <div className="Home">
        <div className="Home-header">
          <h1>Medical Record System</h1>
        </div>
        <p className="Home-intro">
          Signin to get started.
        </p>
        <Image src='logo.png' className='module-icon'/>
      </div>
    );
  }
}

export default Home;

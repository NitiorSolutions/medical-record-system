import React, { Component } from 'react'
import { Breadcrumb } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import './Breadcrumbs.css';

class Breadcrumbs extends Component{
  render(){
    let content = [];
    for (let i = 0; i < this.props.nav.length; i++) {
      if (i + 1 === this.props.nav.length) {
         content.push(
           <Breadcrumb.Section
            key={i}
            active
          >
            {this.props.nav[i][1]}
          </Breadcrumb.Section>
        )
      } else {
         content.push(
         <span key={i}>
         <Breadcrumb.Section
            as={NavLink}
            onClick={() => this.props.rollBackBreadcrumb(i)}
            to={this.props.nav[i][0]}
         >
            {this.props.nav[i][1]}
         </Breadcrumb.Section>
         <Breadcrumb.Divider/>
         </span>
       )
      }
    }

    let breadcrumbClass;
    // if(this.props.userType === 'EMPLOYER') {
      breadcrumbClass = 'employer-breadcrumb';
    // }

    return(
        <Breadcrumb className={breadcrumbClass}>
          {content}
        </Breadcrumb>
    );
  }
}

export default Breadcrumbs;

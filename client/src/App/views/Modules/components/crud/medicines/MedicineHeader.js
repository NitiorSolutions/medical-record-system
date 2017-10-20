import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class MedicineHeader extends Component{
  render(){
    const { currentUrl } = this.props;
    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Container textAlign='center'>
              <h3>List of Medicines</h3>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container textAlign='right' className='add-button'>
              <Link
                className='ui green button'
                to={`${currentUrl}/add`}>
                Add
              </Link>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default MedicineHeader;

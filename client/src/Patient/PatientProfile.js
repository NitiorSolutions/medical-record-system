import React, { Component } from "react";
import {
  Button,
  Header,
  Container,
  Image,
  Card,
  Grid
} from "semantic-ui-react";
import axios from "axios";

import PatientCollection from "./PatientCollection";
import matthew from "../images/matthew.png";

class PatientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      age: 0,
      sex: "",
      civilStatus: "",
      occupation: "",
      address: "",
      contactNumber: ""
    };
  }

  componentWillMount() {
    this.getPatient();
  }

  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column width={4}>
            <Card>
              <Image src={matthew} />
              <Header className="centered">
                {this.props.item.id}Henrik Goldstein
              </Header>
              <Card.Content>
                <Card.Meta>
                  <span className="date">April 18, 1995 | Male</span>
                </Card.Meta>

                <Card.Description>
                  <p>3rd St., 3rd., Aurea Subd., City of San Fernando</p>
                  <p>09265035246</p>
                </Card.Description>
              </Card.Content>

              <Card.Content extra inline>
                <Container inline>
                  <Button size="tiny">View </Button>
                  <Button size="tiny">Edit </Button>
                </Container>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={10}>
            <PatientCollection />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default PatientProfile;

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

    this.getPatient = this.getPatient.bind(this);
  }

  componentWillMount() {
    this.getPatient();
  }

  getPatient() {
    // let patientId = this.props.item.id;
    // axios.get("http://localhost:3001/api/patients/" + patientId).then( response =>
    // 	this.setState({
    // 		id: response.data.firstName,
    // 		firstName: response.data.firstName,
    // 		middleName: response.data.middleName,
    // 		lastName: response.data.lastName,
    // 		age: response.data.age,
    // 		sex: response.data.firstName,
    // 		civilStatus: response.data.firstName,
    // 		occupation: response.data.occupation,
    // 		address: response.data.address,
    // 		contactNumber: response.data.contactNumber,
    // 	})
    // )
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

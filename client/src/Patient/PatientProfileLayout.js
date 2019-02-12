import React, { Component } from "react";
import { Header, Image, Card, Grid, Table } from "semantic-ui-react";
import { Accordion, Icon } from "semantic-ui-react";
import AddAppointment from "../Account/AddAppointment";

import axios from "axios";
import moment from 'moment';
//Add

//Deletes
import DeleteConsultationLink from "./DeleteConsultationLink";
import DeletePrescriptionLink from "./DeletePrescriptionLink";
import DeleteImageLink from "./DeleteImageLink";
import DeleteChartLink from "./DeleteChartLink";

import ViewChartLink from "./ViewChartLink";

import matthew from "../images/matthew.png";

//Table variables
let consultationTable;
let chartsTable;
let imagesTable;
let prescriptionTable;

class PatientProfileLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      activeIndex: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      age: 0,
      sex: "",
      civilStatus: "",
      occupation: "",
      address: "",
      contactNumber: "",
      consultations: [],
      charts: [],
      images: [],
      prescriptions: [],
      patient: ""
    };

    this.getPatient = this.getPatient.bind(this);
    this.getConsultations = this.getConsultations.bind(this);
    this.getCharts = this.getCharts.bind(this);
    this.getPrescriptions = this.getPrescriptions.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  componentWillMount() {
    this.getPatient();
    this.getConsultations();
    this.getCharts();
    this.getImages();
    this.getPrescriptions();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  getPatient() {
    let patientId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/patients/" + patientId)
      .then(response =>
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          age: response.data.age,
          sex: response.data.sex,
          civilStatus: response.data.civilStatus,
          occupation: response.data.occupation,
          address: response.data.address,
          contactNumber: response.data.contactNumber,
          patient: response.data
        })
      );
  }

  getConsultations() {
    let patientId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/patients/" + patientId + "/consultations?filter[include]=procedures")
      .then(response =>
        this.setState({
          consultations: response.data
        })
      );
  }

  getCharts() {
    let patientId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/patients/" + patientId + "/charts")
      .then(response =>
        this.setState({
          charts: response.data
        })
      );
  }

  getImages() {
    let patientId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/patients/" + patientId + "/images")
      .then(response =>
        this.setState({
          images: response.data
        })
      );
  }

  getPrescriptions() {
    let patientId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/patients/" + patientId + "/prescriptions")
      .then(response =>
        this.setState({
          prescriptions: response.data
        })
      );
  }

  render() {
    const { activeIndex } = this.state;
    const consultations = this.state.consultations;
    const { patient } = this.state;
    const { charts } = this.state;
    const { images } = this.state;
    const { prescriptions } = this.state;
    console.log(consultations)
    consultationTable = consultations.map(consultation => {
      return (
        <Table.Row key={consultation.id}>
          <Table.Cell>{moment(consultation.date).format('MMM DD, YYYY')}</Table.Cell>
          <Table.Cell>{consultation.procedures.name}</Table.Cell>
          <Table.Cell>{consultation.payment}</Table.Cell>
          <Table.Cell>{consultation.balance}</Table.Cell>
          <Table.Cell>{consultation.remarks}</Table.Cell>
          <Table.Cell>
            <DeleteConsultationLink item={consultation}>
              Delete
            </DeleteConsultationLink>
          </Table.Cell>
        </Table.Row>
      );
    });

    chartsTable = charts.map(chart => {
      return (
        <Table.Row key={chart.id}>
          <Table.Cell>{chart.id}</Table.Cell>
          <Table.Cell>
            <ViewChartLink item={chart}>View Chart</ViewChartLink>
          </Table.Cell>
          <Table.Cell>{chart.date}</Table.Cell>
          <Table.Cell>
            <DeleteChartLink item={chart}>Delete Chart</DeleteChartLink>
          </Table.Cell>
        </Table.Row>
      );
    });

    prescriptionTable = prescriptions.map(prescription => {
      return (
        <Table.Row key={prescription.id}>
          <Table.Cell>{prescription.prescription}</Table.Cell>
          <Table.Cell>{prescription.date}</Table.Cell>
          <Table.Cell>
            <DeletePrescriptionLink item={prescription}>
              Delete Prescription
            </DeletePrescriptionLink>

            {prescription.id}
          </Table.Cell>
        </Table.Row>
      );
    });

    imagesTable = images.map(image => {
      return (
        <Card raised key={image.id}>
          <Image src={image.buffer} size="medium" />
          <Card.Content extra>
            <DeleteImageLink item={image} />
          </Card.Content>
        </Card>
      );
    });

    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column width={4}>
            <Card>
              <Image src={matthew} />
              <Header className="centered" />
              <Card.Content>
                <Card.Meta />

                <Card.Description>
                  <AddAppointment patient={patient} />
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={10}>
            <Accordion fluid styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Personal Information
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 0}>
                <p>
                  Name: {this.state.firstName} {this.state.middleName}{" "}
                  {this.state.lastName}
                </p>
                <p>Age: {this.state.contactNumber}</p>
                <p>Address: {this.state.address}</p>
                <p>Civil Status: {this.state.civilStatus}</p>
                <p>Occupation: {this.state.occupation}</p>
                <p>Contact Number: {this.state.contactNumber}</p>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Prescription History
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 1}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Number</Table.HeaderCell>

                      <Table.HeaderCell>Date Procured</Table.HeaderCell>

                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>{prescriptionTable}</Table.Body>
                </Table>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Dental Images
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 2}>
                <Card.Group itemsPerRow={4}>{imagesTable}</Card.Group>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Dental Charts
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 3}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Chart Number</Table.HeaderCell>

                      <Table.HeaderCell>Chart</Table.HeaderCell>

                      <Table.HeaderCell>Date Procured</Table.HeaderCell>

                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>{chartsTable}</Table.Body>
                </Table>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 4}
                index={4}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Consultation History
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 4}>
                <div>
                  <p>Previous negotiations are reflected here</p>

                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Date Consulted</Table.HeaderCell>

                        <Table.HeaderCell>Procedure</Table.HeaderCell>

                        <Table.HeaderCell>Payment</Table.HeaderCell>

                        <Table.HeaderCell>Balance</Table.HeaderCell>

                        <Table.HeaderCell>Remarks</Table.HeaderCell>

                        <Table.HeaderCell>Actions</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>{consultationTable}</Table.Body>
                  </Table>
                </div>
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default PatientProfileLayout;

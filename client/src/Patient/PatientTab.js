import React, { Component } from "react";
import {
  Input,
  Container,
  Header,
  Menu,
  Dropdown,
  Segment,
  Table
} from "semantic-ui-react";
import axios from "axios";

import ViewLink from "./ViewLink";
import AddLink from "./AddLink";
import AddImageLink from "./AddImageLink";
import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";

import PatientCSVRead from "./PatientCSVRead";

import AddChartsLink from "./AddChartLink";

import AddConsultationLink from "./AddConsultationLink";
import AddPrescriptionLink from "./AddPrescriptionLink";

const getPatientQuery = "http://localhost:3001/api/Patients";

let patientTable;

class PatientTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      searchKey: ""
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  isSearched(searchKey) {
    return function(item) {
      return (
        !searchKey ||
        item.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.middleName.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchKey.toLowerCase())
      );
    };
  }

  componentDidMount() {
    this.getPatients();
  }

  getPatients() {
    axios.get(getPatientQuery).then(response => {
      this.setState({ patients: response.data }, () => {});
    });
  }

  onSearchChange(event) {
    this.setState({ searchKey: event.target.value });
  }

  render() {
    const patients = this.state.patients;
    const searchKey = this.state.searchKey;

    patientTable = patients.filter(this.isSearched(searchKey)).map(patient => {
      return (
        <Table.Row key={patient.id}>
          <Table.Cell>{patient.lastName}</Table.Cell>
          <Table.Cell>{patient.firstName}</Table.Cell>
          <Table.Cell>{patient.middleName}</Table.Cell>
          <Table.Cell>
            <ViewLink item={patient}>View</ViewLink>

            <EditLink item={patient}>Edit</EditLink>

            <Dropdown
              text="Add Interactions"
              pointing="left"
              className="link item button"
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  <AddConsultationLink item={patient} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <AddChartsLink item={patient} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <AddImageLink item={patient} />
                </Dropdown.Item>

                <Dropdown.Item>
                  <AddPrescriptionLink item={patient} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <DeleteLink item={patient}>Delete</DeleteLink>
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div>
        <Container>
          <Container textAlign="center">
            <Header>List of Patients</Header>
            <Input
              icon="search"
              value={searchKey}
              onChange={this.onSearchChange}
              placeholder="Search"
            />
          </Container>

          <br />
          <Container>
            <Segment attached="bottom">
              <Menu.Item>
                <AddLink />
                <PatientCSVRead />
              </Menu.Item>

              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>

                    <Table.HeaderCell>First Name</Table.HeaderCell>

                    <Table.HeaderCell>Middle Name</Table.HeaderCell>

                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>{patientTable}</Table.Body>
              </Table>
            </Segment>
          </Container>
        </Container>
      </div>
    );
  }
}

export default PatientTab;

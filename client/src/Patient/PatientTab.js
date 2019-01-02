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

import PaginationTable from '../components/PaginationTable/PaginationTable';

const getPatientQuery = "http://localhost:3001/api/Patients";

let patientTable;

class PatientTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchKey: "",
      fields: [],
      activePage: 1,
      itemPerPage: 10,
      selectedIndex: 0
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.getPatients = this.getPatients.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
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

  getPatients() {
    axios.get(getPatientQuery).then(response => {
      const fields = ['Last Name', 'First Name', 'Middle Name', 'Actions']
      this.setState({ data: response.data, fields: fields }, () => {});
    });
  }

  onSearchChange(event) {
    this.setState({ searchKey: event.target.value });
  }

  handlePaginationChange(e, {activePage}){
    this.setState({
      activePage: activePage,
    });
  }

  componentDidMount() {
    this.getPatients();
  }

  render() {
    const { activePage, itemPerPage, data, searchKey, fields } = this.state;

    const indexOfLast = activePage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const totalPages = data.length / itemPerPage;
    let currentData = data.slice(indexOfFirst, indexOfLast);

    patientTable = currentData.filter(this.isSearched(searchKey)).map(patient => {
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

    let headers = fields.map((field,index) => {
      return (
        <Table.HeaderCell
          key={index}
        >
          {field}
        </Table.HeaderCell>
      )
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
                    {headers}
                  </Table.Row>
                </Table.Header>

                <Table.Body>{patientTable}</Table.Body>
                  {
                    data.length > itemPerPage ?
                    <PaginationTable
                      onPageChange={this.handlePaginationChange}
                      totalPages={totalPages}
                      activePage={activePage}
                      fields={fields}
                    >
                      {this.props.children}
                    </PaginationTable>
                    :
                    <span></span>
                  }
              </Table>
            </Segment>
          </Container>
        </Container>
      </div>
    );
  }
}

export default PatientTab;

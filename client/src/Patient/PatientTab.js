import React, { Component } from "react";
import {
  Input,
  Button,
  Container,
  Header,
  Dropdown,
  Segment,
  Table,
  Grid
} from "semantic-ui-react";
import axios from "axios";
import sortBy from "lodash/sortBy";
import titleCase from 'title-case';

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

const _ = {
    sortBy: sortBy
}

const changeCase = {
    titleCase: titleCase
}

let patientTable;

class PatientTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchKey: "",
      fields: [],
      activePage: 1,
      itemPerPage: 8,
      selectedIndex: 0,
      column: null,
      direction: null
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
      const fields = ['lastName', 'firstName', 'middleName', 'actions']
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

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
      return
    }
    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  componentDidMount() {
    this.getPatients();
  }

  render() {
    const { activePage, itemPerPage, column, direction, data, searchKey, fields } = this.state;

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
          sorted={column === field ? direction : null}
          onClick={this.handleSort(field)}
        >
          {changeCase.titleCase(field)}
        </Table.HeaderCell>
      )
    });

    return (
      <div>

          <Header as='h1'>List of Patients</Header>
          <Container>
            <Segment>
              <Grid>
                <Grid.Column floated='left' width={8}>
                  <Grid.Column width={4}>
                    <Input
                      icon="search"
                      value={searchKey}
                      onChange={this.onSearchChange}
                      placeholder="Search Patients"
                    />
                  </Grid.Column>
                </Grid.Column>
                <Grid.Column floated='right' width={8}>
                  <Button.Group floated='right'>
                    <PatientCSVRead />
                    <Button.Or />
                    <AddLink />
                  </Button.Group>

                </Grid.Column>
              </Grid>
              <Table celled sortable striped>
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
      </div>
    );
  }
}

export default PatientTab;

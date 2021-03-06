import React, { Component } from "react";
import {
  Input,
  Button,
  Container,
  Header,
  Segment,
  Table,
  Grid
} from "semantic-ui-react";

import AddLink from "./AddLink";
import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";

import ProcedureCSVRead from "./ProcedureCSVRead";

import axios from "axios";
import sortBy from "lodash/sortBy";
import titleCase from 'title-case';

import PaginationTable from '../components/PaginationTable/PaginationTable';

const getProcedureQuery = process.env.REACT_APP_URL+'/procedures';

const _ = {
    sortBy: sortBy
}

const changeCase = {
    titleCase: titleCase
}

let procedureTable;

class ProcedureTab extends Component {
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
    this.getProcedures = this.getProcedures.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  isSearched(searchKey) {
    return function(item) {
      return (
        !searchKey ||
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.description.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.id.toLowerCase().includes(searchKey.toLowerCase())
      );
    };
  }

  getProcedures() {
    axios.get(getProcedureQuery).then(response => {
      const fields = ['name', 'description', 'price', 'actions']
      this.setState({ data: response.data, fields: fields });
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
    this.getProcedures();
  }

  render() {
    const { activePage, itemPerPage, column, direction, data, searchKey, fields } = this.state;

    const indexOfLast = activePage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const totalPages = data.length / itemPerPage;
    let currentData = data.slice(indexOfFirst, indexOfLast);

    procedureTable = currentData.filter(this.isSearched(searchKey)).map(procedure => {
      return (
        <Table.Row key={procedure.id}>
          <Table.Cell>{procedure.name}</Table.Cell>
          <Table.Cell>{procedure.description}</Table.Cell>
          <Table.Cell textAlign='right'>{procedure.price}</Table.Cell>
          <Table.Cell>
            <EditLink item={procedure}>Edit</EditLink>

            <DeleteLink item={procedure}>Delete</DeleteLink>
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
          <Header as='h1'>List of Procedures</Header>
          <Container>
            <Segment>
              <Grid>
                <Grid.Column floated='left' width={8}>
                  <Grid.Column width={4}>
                    <Input
                      icon="search"
                      value={searchKey}
                      onChange={this.onSearchChange}
                      placeholder="Search Procedures"
                    />
                  </Grid.Column>
                </Grid.Column>
                <Grid.Column floated='right' width={8}>
                  <Button.Group floated='right'>
                    <ProcedureCSVRead />
                    <Button.Or />
                    <AddLink />
                  </Button.Group>

                </Grid.Column>
              </Grid>

              <Table celled sortable striped fixed singleLine>
                <Table.Header>
                  <Table.Row>
                    {headers}
                  </Table.Row>
                </Table.Header>

                <Table.Body>{procedureTable}</Table.Body>
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
                    <React.Fragment>
                    </React.Fragment>
                  }
              </Table>
            </Segment>
          </Container>
      </div>
    );
  }
}

export default ProcedureTab;

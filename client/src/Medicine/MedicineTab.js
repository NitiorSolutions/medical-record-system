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

import MedicineCSVRead from "./MedicineCSVRead";

import axios from "axios";
import sortBy from "lodash/sortBy";
import titleCase from 'title-case';

import PaginationTable from '../components/PaginationTable/PaginationTable';

const getMedicineQuery = process.env.REACT_APP_URL+'/medicines';;

const _ = {
    sortBy: sortBy
}

const changeCase = {
    titleCase: titleCase
}

let medicineTable;

class MedicineTab extends Component {
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
    this.getMedicines = this.getMedicines.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  isSearched(searchKey) {
    return function(item) {
      return (
        !searchKey ||
        item.genericName.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.id.toLowerCase().includes(searchKey.toLowerCase())
      );
    };
  }

  getMedicines() {
    axios.get(getMedicineQuery).then(response => {
      const fields = ['genericName', 'brandName', 'quantity', 'actions']
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
    this.getMedicines();
  }

  render() {
    const { activePage, itemPerPage, column, direction, data, searchKey, fields } = this.state;

    const indexOfLast = activePage * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const totalPages = data.length / itemPerPage;
    let currentData = data.slice(indexOfFirst, indexOfLast);

    medicineTable = currentData.filter(this.isSearched(searchKey)).map(medicine => {
      return (
        <Table.Row key={medicine.id}>
          <Table.Cell>{medicine.genericName}</Table.Cell>
          <Table.Cell>{medicine.brandName}</Table.Cell>
          <Table.Cell>{medicine.quantity}</Table.Cell>
          <Table.Cell>
            <EditLink item={medicine}>Edit</EditLink>

            <DeleteLink item={medicine}>Delete</DeleteLink>
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
          <Header as='h1'>List of Medicines</Header>
            <Container>
              <Segment>
                <Grid>
                  <Grid.Column floated='left' width={8}>
                    <Grid.Column width={4}>
                      <Input
                        icon="search"
                        value={searchKey}
                        onChange={this.onSearchChange}
                        placeholder="Search Medicines"
                      />
                    </Grid.Column>
                  </Grid.Column>
                  <Grid.Column floated='right' width={8}>
                    <Button.Group floated='right'>
                      <MedicineCSVRead />
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

                  <Table.Body>{medicineTable}</Table.Body>
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

export default MedicineTab;

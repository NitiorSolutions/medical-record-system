import React, { Component } from "react";
import {
  Input,
  Container,
  Header,
  Menu,
  Segment,
  Table
} from "semantic-ui-react";

import AddLink from "./AddLink";
import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";

import ProcedureCSVRead from "./ProcedureCSVRead";

import axios from "axios";

const getProcedureQuery = "http://localhost:3001/api/Procedures";

let procedureTable;

class ProcedureTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procedures: [],
      searchKey: ""
    };
    this.onSearchChange = this.onSearchChange.bind(this);
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

  componentDidMount() {
    this.getProcedures();
  }

  getProcedures() {
    axios.get(getProcedureQuery).then(response => {
      this.setState({ procedures: response.data }, () => {
        // console.log(this.state.medicines);
      });
    });
  }

  onSearchChange(event) {
    this.setState({ searchKey: event.target.value });
  }

  render() {
    const procedures = this.state.procedures;
    const searchKey = this.state.searchKey;

    procedureTable = procedures
      .filter(this.isSearched(searchKey))
      .map(procedure => {
        return (
          <Table.Row key={procedure.id}>
            <Table.Cell>{procedure.id}</Table.Cell>
            <Table.Cell>{procedure.name}</Table.Cell>
            <Table.Cell>{procedure.description}</Table.Cell>
            <Table.Cell>{procedure.price}</Table.Cell>
            <Table.Cell>
              <EditLink item={procedure}>Edit</EditLink>

              <DeleteLink item={procedure}>Delete</DeleteLink>
            </Table.Cell>
          </Table.Row>
        );
      });

    return (
      <div>
        <Container>
          <Container textAlign="center">
            <Header>Procedures Tab</Header>
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
                <ProcedureCSVRead />
              </Menu.Item>

              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Procedure ID</Table.HeaderCell>

                    <Table.HeaderCell>Procedure</Table.HeaderCell>

                    <Table.HeaderCell>Description</Table.HeaderCell>

                    <Table.HeaderCell>Price</Table.HeaderCell>

                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>{procedureTable}</Table.Body>
              </Table>
            </Segment>
          </Container>
        </Container>
      </div>
    );
  }
}

export default ProcedureTab;

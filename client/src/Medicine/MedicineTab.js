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

import MedicineCSVRead from "./MedicineCSVRead";

import axios from "axios";

const getMedicineQuery = "http://localhost:3001/api/Medicines";

let medicineTable;

class MedicineTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [],
      searchKey: ""
    };
    this.onSearchChange = this.onSearchChange.bind(this);
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

  componentDidMount() {
    this.getMedicines();
  }

  getMedicines() {
    axios.get(getMedicineQuery).then(response => {
      this.setState({ medicines: response.data }, () => {
        // console.log(this.state.medicines);
      });
    });
  }

  onSearchChange(event) {
    this.setState({ searchKey: event.target.value });
  }

  render() {
    const medicines = this.state.medicines;
    const searchKey = this.state.searchKey;

    medicineTable = medicines
      .filter(this.isSearched(searchKey))
      .map(medicine => {
        return (
          <Table.Row key={medicine.id}>
            <Table.Cell>{medicine.id}</Table.Cell>
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

    return (
      <div>
        <Container>
          <Container textAlign="center">
            <Header>Medicines Tab</Header>
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
                <AddLink>Add</AddLink>
                <MedicineCSVRead />
              </Menu.Item>

              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Medicine ID</Table.HeaderCell>

                    <Table.HeaderCell>Generic Name</Table.HeaderCell>

                    <Table.HeaderCell>Brand Name</Table.HeaderCell>

                    <Table.HeaderCell>Quantity</Table.HeaderCell>

                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>{medicineTable}</Table.Body>
              </Table>
            </Segment>
          </Container>
        </Container>
      </div>
    );
  }
}

export default MedicineTab;

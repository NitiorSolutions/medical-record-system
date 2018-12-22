import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

class DentalCharts extends Component {
  render() {
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Chart Number</Table.HeaderCell>

              <Table.HeaderCell>Chart</Table.HeaderCell>

              <Table.HeaderCell>Date Procured</Table.HeaderCell>

              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body />
        </Table>
      </div>
    );
  }
}

export default DentalCharts;

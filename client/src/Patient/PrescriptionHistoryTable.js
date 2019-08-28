import React, { Component } from "react";
import { Table, Button, Icon } from "semantic-ui-react";

class PrescriptionHistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    console.log("PHT:" + this.props.item.id);

    return (
      <div>
        <p>Previous prescriptions are seen here</p>
        <Button icon labelPosition="left" color="blue">
          <Icon name="plus square outline" />Add Prescription
        </Button>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Number</Table.HeaderCell>

              <Table.HeaderCell>Date Procured</Table.HeaderCell>

              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Button fluid>View</Button>
              </Table.Cell>

              <Table.Cell>January 18, 1994</Table.Cell>

              <Table.Cell>
                <Button negative>Delete</Button>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Button fluid>View</Button>
              </Table.Cell>

              <Table.Cell>December 25, 2018</Table.Cell>

              <Table.Cell>
                <Button negative>Delete</Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default PrescriptionHistoryTable;

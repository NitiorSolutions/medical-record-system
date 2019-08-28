import React, { Component } from "react";
import { Button, Table, Icon } from "semantic-ui-react";

class ConsultationHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <div>
        <p>Previous negotiations are reflected here</p>
        <Button icon labelPosition="left" color="blue">
          <Icon name="plus square outline" />Add Consultation
        </Button>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date Incurred</Table.HeaderCell>

              <Table.HeaderCell>Payment</Table.HeaderCell>

              <Table.HeaderCell>Remarks</Table.HeaderCell>

              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>January 18, 1987</Table.Cell>

              <Table.Cell>800</Table.Cell>

              <Table.Cell>Annual dental check-up</Table.Cell>

              <Table.Cell>
                <Button positive>Edit</Button>
                <Button negative>Delete</Button>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>April 19, 1967</Table.Cell>

              <Table.Cell>3000</Table.Cell>

              <Table.Cell>Braces installation</Table.Cell>

              <Table.Cell>
                <Button positive>Edit</Button>
                <Button negative>Delete</Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ConsultationHistory;

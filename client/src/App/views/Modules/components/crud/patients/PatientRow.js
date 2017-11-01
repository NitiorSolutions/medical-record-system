import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class PatientRow extends Component {
  onRowClick(id){
    this.props.handleRowClick(id);
  }

  render() {
    const { fields } = this.props;

    let rows = fields.map((field,index) => {
      return (
        <td key={index}>
          { this.props.data[field] }
        </td>
      )
    });

    return (
      <Table.Row onClick={() => this.onRowClick(this.props.data.id)}>
        { rows }
      </Table.Row>
    );
  }
}

export default PatientRow;

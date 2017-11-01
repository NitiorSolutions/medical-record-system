import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class EmployerRow extends Component {
  render() {
    const { fields } = this.props;
    let rows = fields.map((field,index) => {
      if (field === 'address') {
        return (
          <td key={index}>
            {
              this.props.data.address.line1 + ' ' +
              this.props.data.address.line2 + ' ' +
              this.props.data.address.city + ' ' +
              this.props.data.address.state + ' ' +
              this.props.data.address.country + ' ' +
              this.props.data.address.zipCode
            }
          </td>
        )
      } else {
        return (
          <td key={index}>
            { this.props.data[field] }
          </td>
        )
      }
    });
    return (
      <Table.Row>
        { rows }
      </Table.Row>
    );
  }
}

export default EmployerRow;

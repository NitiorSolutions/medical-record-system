import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

class PatientConsultationRow extends Component {
  render() {
    const { fields } = this.props;
    let rows = fields.map((field,index) => {
      if (field.indexOf("date") >= 0){
        return (
          <td key={index}>
            { moment(this.props.data[field]).format('MMMM Do YYYY')}
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

export default PatientConsultationRow;

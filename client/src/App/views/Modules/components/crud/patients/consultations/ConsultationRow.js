import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import EditConsultation from './EditConsultation';
import moment from 'moment';

class ConsultationRow extends Component {
  render() {
    const { fields } = this.props;
    let rows = fields.map((field,index) => {
      if (field.indexOf("date") >= 0){
        return (
          <td key={index}>
            { moment(this.props.data[field]).format('MMMM Do YYYY')}
          </td>
        )
      } else if (field === 'consultationId'){
        return (
          <td key={index}>
            <EditConsultation
              patientId = { this.props.patientId }
              consultationId = { this.props.data[field] }
              onUpdate = { this.props.handleUpdate }
            />
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

export default ConsultationRow;

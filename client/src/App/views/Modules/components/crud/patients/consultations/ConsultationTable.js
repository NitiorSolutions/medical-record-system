import React, { Component } from 'react';
import axios from 'axios';
import changeCase from 'change-case';
import { Table } from 'semantic-ui-react';
import ConsultationRow from './ConsultationRow';
import AddConsultation from './AddConsultation';
import TablePagination from '../../../../../components/TablePagination';
import constants from '../../../../../../../constants';

class ConsultationTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],
      fields: [],
      address:'',
      activeItem: 1,
      itemPerPage: 5,
      currentUrl: '/modules/patients'
    }
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemClickRight = this.handleItemClickRight.bind(this);
    this.handleItemClickLeft = this.handleItemClickLeft.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount(){
    const fields = ['date', 'payment', 'balance', 'remarks', 'consultationId'];
    this.setState({ fields: fields });
    this.getConsultations();
  }

  getConsultations(){
    const id = this.props.patientId;
    const table = 'patients';
    const serverUrl = constants.server_url.app + '/' + table;
    axios.get(`${serverUrl}/${id}/consultations`)
    .then(response => {
      this.setState({data: response.data})
    })
    .catch(err => console.log(err));
  }

  handleItemClick(e, {name}){
    name = parseInt(name, 10);
    this.setState({ activeItem: name });
  }

  handleItemClickRight(e){
    const pageNumbers = [];
    const { itemPerPage } = this.state;
    for (let i = 1; i <= Math.ceil(this.state.data.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    let item = this.state.activeItem + 1;
    if (this.state.activeItem === pageNumbers.length){
      item = this.state.activeItem;
    }
    this.setState({ activeItem: item });
  }

  handleItemClickLeft(e){
    let item = this.state.activeItem - 1;
    if (this.state.activeItem === 1){
      item = this.state.activeItem;
    }
    this.setState({ activeItem: item });
  }

  handleSubmit(newConsultation) {
    const table = 'patients';
    const serverUrl = constants.server_url.app + '/' + table;
    const id = this.props.patientId;
    let consultations = this.state.data;
    let newConsultations = consultations.concat([newConsultation]);
    axios.request({
      method:'post',
      url:`${serverUrl}/${id}/consultations`,
      data: newConsultation
    }).then(response => {
      this.setState({ data: newConsultations });
    }).catch(err => console.log(err));
  }

  handleUpdate(newConsultation, fk){
    const id = this.props.patientId;
    const table = 'patients';
    const serverUrl = constants.server_url.app + '/' + table;
    axios.request({
      method:'put',
      url:`${serverUrl}/${id}/consultations/${fk}`,
      data: newConsultation
    }).then(response => {
      this.getConsultations();
    }).catch(err => console.log(err));
  }

  render(){
    const { data, fields, activeItem, itemPerPage } = this.state;
    const id = this.props.patientId;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    const indexOfLast = activeItem * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    let currentData = this.state.data.slice(indexOfFirst, indexOfLast);
    let headers = fields.map((field,index) => {
      if (field === 'consultationId'){
        return (
          <Table.HeaderCell
            key={index}
          >
            Actions
          </Table.HeaderCell>
        )
      } else {
        return (
          <Table.HeaderCell
            key={index}
          >
            {changeCase.titleCase(field)}
          </Table.HeaderCell>
        )
      }

    });
    let body;
    if (currentData.length === 0 ){
      body = (
        <Table.Row>
          <td>
            No records found
          </td>
        </Table.Row>
      )
    } else {
      body = currentData.map((rows, index) => {
        return(
          <ConsultationRow
            data={rows}
            fields={fields}
            key={index}
            patientId={id}
            handleUpdate={this.handleUpdate}
          />
        )
      });
    }


    return (
      <div>
        <AddConsultation
          onSubmit = { this.handleSubmit }
        />
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              { headers }
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { body }
          </Table.Body>

          <TablePagination
            length={fields.length}
            activeItem={activeItem}
            pageNumbers={pageNumbers}
            handleItemClick={this.handleItemClick}
            handleItemClickLeft={this.handleItemClickLeft}
            handleItemClickRight={this.handleItemClickRight}
          />
        </Table>
      </div>
    )
  }
}

export default ConsultationTable;

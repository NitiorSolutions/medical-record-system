import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import axios from 'axios';
import _ from 'lodash';
import changeCase from 'change-case';
import MedicineRow from './MedicineRow';
import MedicineHeader from './MedicineHeader';
import GenericSearch from '../../../../components/GenericSearch';
import TablePagination from '../../../../components/TablePagination';
import constants from '../../../../../../constants';

class MedicineTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
        table : '',
        currentUrl: '',
        serverUrl: '',
        fields: [],
        data: [],
        origData: [],
        filteredData: [],
        activeItem: 1,
        itemPerPage: 10,
        searchTerm: '',
        column: null,
        direction: null
    };
    this.fetch = this.fetch.bind(this);
    this.getFilterChange = this.getFilterChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemClickRight = this.handleItemClickRight.bind(this);
    this.handleItemClickLeft = this.handleItemClickLeft.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  fetch(serverUrl){
    const self = this;
    axios.get(`${serverUrl}?filter={"where":{"active":true}}`)
    .then(res => {
      self.setState({ data: res.data });
      self.setState({ origData: res.data });
      self.setState({ filterData: res.data });
    })
    .catch(err => {
      alert('No data returned from the server!');
      console.error(err);
    });
  }

  getFilterChange(column, value, state) {
    if (column && value) {
      const loweredFilter = value.toLowerCase();
      const filtered = state.origData.filter(function(d) {
        return d[column] && d[column].toString().toLowerCase().indexOf(loweredFilter) > -1
      });
      this.setState({data: filtered});
    } else {
      this.setState({data: state.filteredData});
    }
  }

  handleFilter(column, value) {
    this.getFilterChange(column, value, this.state);
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

  handleRowClick(id){
    this.props.history.push(this.props.location.pathname+'/'+id);
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  componentDidMount() {
    const table = 'medicines';
    const currentUrl = this.props.match.url;
    const serverUrl = constants.server_url.app + '/' + table;
    // Set table fields here
    const fields = ['genericName', 'brandName', 'description'];
    this.setState({
      table: table,
      currentUrl: currentUrl,
      serverUrl: serverUrl,
      fields: fields
    });
    this.fetch(serverUrl);
  }

  render(){
    const { activeItem, itemPerPage, fields, column, direction } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.data.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    const indexOfLast = activeItem * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    let currentData = this.state.data.slice(indexOfFirst, indexOfLast);
    let headers = fields.map((field,index) => {
      return (
        <Table.HeaderCell
          key={index}
          sorted={column === field ? direction : null}
          onClick={this.handleSort(field)}
        >
          {changeCase.titleCase(field)}
        </Table.HeaderCell>
      )
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
          <MedicineRow
            data={rows}
            fields={fields}
            handleRowClick={this.handleRowClick}
            key={index}
          />
        )
      });
    }

    return(
      <div>
        <MedicineHeader
          currentUrl = {this.state.currentUrl}
        />
        <GenericSearch
          value={this.state.searchTerm}
          fields={fields}
          onFilter={this.handleFilter}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        />
        <Table celled fixed singleLine selectable sortable>
          <Table.Header>
            <Table.Row>
              { headers }
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {body}
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
    );
  }
}

export default MedicineTable;

import React, { Component } from 'react';
import { Pagination, Table } from 'semantic-ui-react';

class PaginationTable extends Component{
  render(){
    const { fields, totalPages, activePage } = this.props;
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={fields.length}>
            {this.props.children}
            <Pagination
            floated='right'
            activePage={activePage}
            onPageChange={this.props.onPageChange}
            totalPages={totalPages}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }

}

export default PaginationTable;

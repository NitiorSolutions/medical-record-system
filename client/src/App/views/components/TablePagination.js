import React, { Component } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

class TablePagination extends Component{
  render(){
    const { length, activeItem, pageNumbers } = this.props;

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Menu.Item
          key={number}
          name={''+number+''} // eslint-disable-next-line
          active={activeItem == number}
          onClick={this.props.handleItemClick}>
          {number}
        </Menu.Item>
      );
    });

    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={length}>
            <Menu floated='right' pagination>
              <Menu.Item as='a' onClick={this.props.handleItemClickLeft} icon>
                <Icon name='left chevron' />
              </Menu.Item>
              {renderPageNumbers}
              <Menu.Item  as='a' onClick={this.props.handleItemClickRight} icon>
                <Icon name='right chevron' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }
}

export default TablePagination;

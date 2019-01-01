import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class GenericSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const filterValue = this.refs.filterValue.value
    const filterColumn = this.refs.filterColumn.value
    if (!filterValue || !filterColumn)
      return;

    this.props.onFilter(filterColumn, filterValue);
  }

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field>
            <input
              placeholder="Filter Value"
              id="filterValue"
              onChange={this.handleChange}
              ref="filterValue"
            />
          </Form.Field>
          <Form.Field >
            <select id="filterColumn" onChange={this.handleChange} ref="filterColumn">
              <option value="">Select column</option>
              {this.props.fields.map(function(c){
                return <option key={c} value={c}>{c}</option>
              })}
            </select>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default GenericSearch;

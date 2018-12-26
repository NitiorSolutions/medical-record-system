import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

import axios from "axios";

class EditProcedure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      id: "",
      name: "",
      description: "",
      price: 0
    };

    this.getProcedure = this.getProcedure.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getProcedure();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onEdit() {
    let procedureId = this.props.match.params.id;
    const editedProcedure = {
      name: this.state.name,
      description: this.state.description,
      price: parseInt(this.state.price, 10)
    };

    axios
      .request({
        method: "put",
        url: "http://localhost:3001/api/procedures/" + procedureId,
        data: editedProcedure
      })
      .then(response => {
        //Add to logs
        const currentDate = new Date();
        const newLog = {
          activity: "Edited Procedure: " + this.state.name,
          date: currentDate,
          user: localStorage.userName
        };

        axios.request({
          method: "post",
          url: "http://localhost:3001/api/logs/",
          data: newLog
        });
        this.props.history.push("/app/procedures");
      });
  }

  getProcedure() {
    let procedureId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/procedures/" + procedureId)
      .then(response =>
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price
        })
      );
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Edit Procedure</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.name}
                    label="Procedure Name"
                    name="name"
                    type="text"
                    placeholder="Procedure Name"
                    ref="name"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.description}
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Description"
                    ref="description"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.price}
                    label="Price"
                    name="price"
                    type="text"
                    placeholder="Price"
                    ref="price"
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/app/procedures" className="ui button negative">
              Cancel
            </Link>
            <Button onClick={this.onEdit} positive>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default EditProcedure;

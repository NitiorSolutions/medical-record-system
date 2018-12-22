import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

import axios from "axios";

class DeleteProcedure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      details: ""
    };

    this.getProcedure = this.getProcedure.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.getProcedure();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onDelete() {
    let procedureId = this.props.match.params.id;
    axios
      .delete("http://localhost:3001/api/procedures/" + procedureId)
      .then(reponse => {
        //Add to logs
        const currentDate = new Date();
        const newLog = {
          activity: "Deleted Procedure: " + this.state.details.name,
          date: currentDate,
          user: localStorage.userName
        };

        axios.request({
          method: "post",
          url: "http://localhost:3001/api/logs/",
          data: newLog
        });
        this.props.history.push("/tabs/procedures");
      });
  }

  getProcedure() {
    let procedureId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/procedures/" + procedureId)
      .then(response => this.setState({ details: response.data }));
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Delete Procedure</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Procedure Name: {this.state.details.name} </p>
              <p>Description: {this.state.details.description}</p>
              <p>Price: {this.state.details.price}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/tabs/procedures/" className="ui button negative">
              Cancel
            </Link>
            <Button onClick={this.onDelete} positive>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default DeleteProcedure;

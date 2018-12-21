import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class DeletePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      details: ""
    };

    this.getPatient = this.getPatient.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.getPatient();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onDelete() {
    let patientId = this.props.match.params.id;
    axios
      .delete("http://localhost:3001/api/patients/" + patientId)
      .then(reponse => {
        //Add to logs
        const currentDate = new Date();
        const newLog = {
          activity: "Deleted Patient: " + this.state.details.lastName,
          date: currentDate,
          user: localStorage.userName
        };

        axios.request({
          method: "post",
          url: "http://localhost:3001/api/logs/",
          data: newLog
        });

        this.props.history.push("/tabs/patients");
      });
  }

  getPatient() {
    let patientId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/patients/" + patientId)
      .then(response => this.setState({ details: response.data }));
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Delete Patient</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Are you sure you want to delete?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/tabs/patients" className="ui button negative">
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

export default DeletePatient;

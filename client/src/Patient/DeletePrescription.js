import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class DeletePrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      details: "",
      patientId: ""
    };

    this.getPrescription = this.getPrescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.getPrescription();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onDelete() {
    let prescriptionId = this.props.match.params.id;

    axios
      .delete("http://localhost:3001/api/prescriptions/" + prescriptionId)
      .then(response => {
        const currentDate = new Date();
        const newLog = {
          activity:
            "Deleted prescription: " +
            prescriptionId +
            " from " +
            this.state.patientId,
          date: currentDate,
          user: localStorage.userName
        };

        axios.request({
          method: "post",
          url: "http://localhost:3001/api/logs/",
          data: newLog
        });

        this.props.history.push("/app/patients/view/" + this.state.patientId);
      });
  }

  getPrescription() {
    let prescriptionId = this.props.match.params.id;

    axios
      .get("http://localhost:3001/api/prescriptions/" + prescriptionId)
      .then(response =>
        this.setState({
          details: response.data,
          patientId: response.data.patientId
        })
      );
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Delete Prescription</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Are you sure you want to delete?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link
              to={"/app/patients/view/" + this.state.patientId}
              className="ui button negative"
            >
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

export default DeletePrescription;

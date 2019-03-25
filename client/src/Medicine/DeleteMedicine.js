import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class DeleteMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      details: ""
    };
    this.getMedicine = this.getMedicine.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.getMedicine();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onDelete() {
    let medicineId = this.props.match.params.id;
    const url = process.env.REACT_APP_URL+'/medicines/' + medicineId;
    axios
      .delete(url)
      .then(reponse => {
        const currentDate = new Date();
        const newLog = {
          activity: "Deleted Medicine: " + this.state.details.brandName,
          date: currentDate,
          user: localStorage.userName
        };
        const url2 = process.env.REACT_APP_URL+'/logs';
        axios.request({
          method: "post",
          url: url2,
          data: newLog
        });

        this.props.history.push("/app/medicines");
      });
  }

  getMedicine() {
    let medicineId = this.props.match.params.id;
    const url = process.env.REACT_APP_URL+'/medicines/' + medicineId;
    axios
      .get(url)
      .then(response => this.setState({ details: response.data }));
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Delete Medicine</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Generic Name: {this.state.details.genericName} </p>
              <p>Brand Name: {this.state.details.brandName}</p>
              <p>Quantity: {this.state.details.quantity}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/app/medicines" className="ui button negative">
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

export default DeleteMedicine;

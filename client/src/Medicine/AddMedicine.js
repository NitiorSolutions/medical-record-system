import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      genericName: "",
      brandName: "",
      quantity: 0
    };

    this.onAdd = this.onAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onAdd() {
    const newMedicine = {
      genericName: this.state.genericName,
      brandName: this.state.brandName,
      quantity: parseInt(this.state.quantity, 10)
    };

    axios
      .request({
        method: "post",
        url: "http://localhost:3001/api/medicines/",
        data: newMedicine
      })
      .then(response => {
        //Add to logs
        const currentDate = new Date();
        const newLog = {
          activity: "Added Medicine: " + this.state.brandName,
          date: currentDate,
          user: localStorage.userName
        };

        axios.request({
          method: "post",
          url: "http://localhost:3001/api/logs/",
          data: newLog
        });

        this.props.history.push("/app/medicines");
      });
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
          <Modal.Header>Add Medicine</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.genericName}
                    label="Generic Name"
                    name="genericName"
                    type="text"
                    placeholder="Generic Name"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.brandName}
                    label="Brand Name"
                    name="brandName"
                    type="text"
                    placeholder="Brand Name"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.quantity}
                    label="Quantity"
                    name="quantity"
                    type="text"
                    placeholder="Quantity"
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/app/medicines" className="ui button negative">
              Cancel
            </Link>
            <Button onClick={this.onAdd} positive>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default AddMedicine;

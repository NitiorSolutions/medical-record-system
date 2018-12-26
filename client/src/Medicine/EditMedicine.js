import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      id: "",
      genericName: "",
      brandName: "",
      quantity: 0
    };

    this.getMedicine = this.getMedicine.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getMedicine();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onEdit() {
    console.log("Yo shit just got deleted");
    let medicineId = this.props.match.params.id;
    const editedMedicine = {
      genericName: this.state.genericName,
      brandName: this.state.brandName,
      quantity: parseInt(this.state.quantity, 10)
    };

    axios
      .request({
        method: "put",
        url: "http://localhost:3001/api/medicines/" + medicineId,
        data: editedMedicine
      })
      .then(response => {
        //Add to logs
        const currentDate = new Date();
        const newLog = {
          activity: "Edited Medicine: " + this.state.brandName,
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

  getMedicine() {
    let medicineId = this.props.match.params.id;
    axios
      .get("http://localhost:3001/api/medicines/" + medicineId)
      .then(response =>
        this.setState({
          id: response.data.id,
          genericName: response.data.genericName,
          brandName: response.data.brandName,
          quantity: response.data.quantity
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
          <Modal.Header>Edit Medicine</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    onChange={this.handleChange}
                    label="Generic Name"
                    name="genericName"
                    value={this.state.genericName}
                    type="text"
                    placeholder="Generic Name"
                    ref="genericName"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    label="Brand Name"
                    name="brandName"
                    value={this.state.brandName}
                    type="text"
                    placeholder="Brand Name"
                    ref="brandName"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    label="Quantity"
                    name="quantity"
                    value={this.state.quantity}
                    type="text"
                    placeholder="Quantity Name"
                    ref="quantity"
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/app/medicines" className="ui button negative">
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

export default EditMedicine;

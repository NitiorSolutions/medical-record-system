import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class DeleteImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      item: this.props.item,
      details: "",
      patientId: ""
    };

    this.getImage = this.getImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.getImage();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onDelete() {
    let imageId = this.props.match.params.id;

    axios
      .delete("http://localhost:3001/api/images/" + imageId)
      .then(reponse => {
        const currentDate = new Date();
        const newLog = {
          activity: "Deleted image: " + imageId,
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

  getImage() {
    let imageId = this.props.match.params.id;

    axios
      .get("http://localhost:3001/api/images/" + imageId)
      .then(response =>
        this.setState({
          details: response.data,
          patientId: response.data.patientId
        })
      );

    console.log(this.state.patientId);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Delete Image</Modal.Header>
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

export default DeleteImage;

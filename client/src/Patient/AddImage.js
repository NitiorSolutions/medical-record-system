import React, { Component } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Container,
  Grid
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      open: true,
      item: this.props.item
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
    console.log(this.state.imagePreviewUrl);

    console.log(typeof this.state.imagePreviewUrl);
    console.log(this.state.imagePreviewUrl.length);

    let patientId = this.props.match.params.id;

    const editedImage = {
      buffer: this.state.imagePreviewUrl,
      patientId: patientId
    };

    axios
      .request({
        method: "post",
        url: "http://localhost:3001/api/images/",
        data: editedImage
      })
      .then(response => {
        const currentDate = new Date();
        const newLog = {
          activity: "Added image to patient: " + patientId,
          date: currentDate,
          user: localStorage.userName
        };

        axios.request({
          method: "post",
          url: "http://localhost:3001/api/logs/",
          data: newLog
        });
        this.props.history.push("/app/patients/");
      })
      .catch(err => console.log(err));
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <Image bordered size="medium" src={imagePreviewUrl} />;
    }

    const { open, dimmer } = this.state;

    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Add Image</Modal.Header>
          <Modal.Content>
            <Form onSubmit={e => this._handleSubmit(e)}>
              <Input
                className="fileInput"
                type="file"
                onChange={e => this._handleImageChange(e)}
              />

              <Button type="submit" onClick={e => this._handleSubmit(e)}>
                Upload Image
              </Button>
              <Grid centered>
                <Container>{$imagePreview}</Container>
              </Grid>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Link className="ui button negative" to={"/app/patients/"}>
              Cancel
            </Link>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default AddImage;

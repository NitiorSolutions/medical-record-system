import React, { Component }  from "react";
import { Input, Form, Icon, Modal, Button } from "semantic-ui-react";

let fileReader;

class PatientCSVRead extends Component {
  handleFileRead = e => {
    const content = fileReader.result;
    this.props.handleFileRead(content);
  };

  handleFileChosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  };

  render() {
    return (
      <Modal trigger={<Button icon labelPosition='left'> <Icon name='upload' /> Import Patients </Button>}>
        <Modal.Header>Import Patients</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field inline>
              <Input
                type="file"
                id="file"
                className="input-file"
                accept=".csv"
                onChange={e => this.handleFileChosen(e.target.files[0])}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
};

export default PatientCSVRead;

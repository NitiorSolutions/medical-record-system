import React from "react";
import { Input, Form, Icon, Modal, Button } from "semantic-ui-react";
import axios from "axios";

const PatientCSVRead = () => {
  let fileReader;

  const handleFileRead = e => {
    const content = fileReader.result;

    let temp = [];
    let temp2 = [];
    let parsedPatient = {};

    temp = content.split("\n");

    let i = 0;

    for (i = 0; i < temp.length; i++) {
      temp2 = temp[i].split(",");

      parsedPatient = {
        firstName: temp2[0],
        middleName: temp2[1],
        lastName: temp2[2],
        sex: temp2[3],
        birthDate: temp2[4],
        civilStatus: temp2[5],
        occupation: temp2[6],
        contactNumber: temp2[7],
        address: temp2[8],
        dateRegistered: temp2[9]
      };

      axios
        .request({
          method: "post",
          url: "http://localhost:3001/api/patients/",
          data: parsedPatient
        })
        .then(response => {})
        .catch(err => console.log(err));
    }

    alert("Parsed " + temp.length + " lines");
  };

  const handleFileChosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

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
                onChange={e => handleFileChosen(e.target.files[0])}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
  );
};

export default PatientCSVRead;

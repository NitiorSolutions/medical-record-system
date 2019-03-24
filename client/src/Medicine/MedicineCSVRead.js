import React from "react";
import { Input, Form, Icon, Modal, Button } from "semantic-ui-react";
import axios from "axios";

const MedicineCSVRead = () => {
  let fileReader;

  const handleFileRead = e => {
    const content = fileReader.result;

    let temp = [];
    let temp2 = [];
    let parsedMedicine = {};

    temp = content.split("\n");

    let i = 0;

    for (i = 0; i < temp.length; i++) {
      temp2 = temp[i].split(",");

      parsedMedicine = {
        genericName: temp2[1],
        brandName: temp2[0],
        quantity: parseInt(temp2[2], 10)
      };
      const url = process.env.REACT_APP_URL+'/medicines';
      axios
        .request({
          method: "post",
          url: url,
          data: parsedMedicine
        })
        .then(response => {});
    }

    alert("Parsed " + temp.length + " lines");
  };

  const handleFileChosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <Modal trigger={<Button icon labelPosition='left'> <Icon name='upload' /> Import Medicines </Button>}>
      <Modal.Header>Import Medicines</Modal.Header>
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

export default MedicineCSVRead;

import React from "react";
import { Input } from "semantic-ui-react";
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
        quantity: parseInt(temp2[2])
      };

      axios
        .request({
          method: "post",
          url: "http://localhost:3001/api/medicines/",
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
    <span>
      <br />
      <Input
        type="file"
        id="file"
        className="input-file"
        accept=".csv"
        onChange={e => handleFileChosen(e.target.files[0])}
      />
    </span>
  );
};

export default MedicineCSVRead;

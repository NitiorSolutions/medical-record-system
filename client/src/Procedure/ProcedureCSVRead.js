import React from "react";
import { Input } from "semantic-ui-react";
import axios from "axios";

const ProcedureCSVRead = () => {
  let fileReader;

  const handleFileRead = e => {
    const content = fileReader.result;

    let temp = [];
    let temp2 = [];
    let parsedProcedure = {};

    temp = content.split("\n");
    let i = 0;

    console.log("Parsing the following: ");
    for (i = 0; i < temp.length; i++) {
      temp2 = temp[i].split(",");

      parsedProcedure = {
        name: temp2[0],
        description: temp2[1],
        price: parseInt(temp2[2])
      };

      axios
        .request({
          method: "post",
          url: "http://localhost:3001/api/procedures/",
          data: parsedProcedure
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

export default ProcedureCSVRead;

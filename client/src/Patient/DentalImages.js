import React, { Component } from "react";
import { Card, Button, Icon, Container } from "semantic-ui-react";
import sampleImage from "../images/square-image.png";

class DentalImages extends Component {
  render() {
    return (
      <div>
        <Container>
          <p>All uploaded images are shown here</p>
          <Button icon labelPosition="left" color="blue">
            <Icon name="plus square outline" />Add Image
          </Button>

          <Card.Group centered itemsPerRow={4}>
            <Card image={sampleImage} />
            <Card image={sampleImage} />
            <Card image={sampleImage} />
            <Card image={sampleImage} />
            <Card image={sampleImage} />
            <Card image={sampleImage} />
            <Card image={sampleImage} />
            <Card image={sampleImage} />
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default DentalImages;

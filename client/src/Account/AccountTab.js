import React, { Component } from "react";
import {
  Container,
  Icon,
  Accordion,
  Card,
  Image,
  Button
} from "semantic-ui-react";

import matthew from "../images/matthew.png";
import elliot from "../images/elliot.jpg";
import daniel from "../images/daniel.jpg";
import molly from "../images/molly.png";

class AccountTab extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <div>
        <Container>
          <Accordion fluid styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />Pending Users
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 0}>
              <Card.Group centered itemsPerRow={4}>
                <Card>
                  <Card.Content>
                    <Image floated="right" size="mini" src={matthew} />
                    <Card.Header>Michael Myers</Card.Header>
                    <Card.Meta>
                      Nurse <Icon name="zoom-in" />
                    </Card.Meta>
                    <Card.Description>
                      University of Sto. Tomas
                      <p>
                        <strong>Class of 2014</strong>
                      </p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button basic color="green">
                        Approve
                      </Button>
                      <Button basic color="red">
                        Reject
                      </Button>
                    </div>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Image floated="right" size="mini" src={elliot} />
                    <Card.Header>Elli Mayondon</Card.Header>
                    <Card.Meta>
                      Doctor <Icon name="zoom-in" />
                    </Card.Meta>
                    <Card.Description>
                      Ateneo de Manila University
                      <p>
                        <strong>Class of 2018</strong>
                      </p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button basic color="green">
                        Approve
                      </Button>
                      <Button basic color="red">
                        Reject
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />Active Users
            </Accordion.Title>

            <Accordion.Content active={activeIndex === 1}>
              <Card.Group centered itemsPerRow={4}>
                <Card>
                  <Card.Content>
                    <Image floated="right" size="mini" src={daniel} />
                    <Card.Header>Squeeps K.</Card.Header>
                    <Card.Meta>Administrator</Card.Meta>
                    <Card.Description>
                      Ateneo de Manila University
                      <p>
                        <strong>Class of 2018</strong>
                      </p>
                    </Card.Description>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Content>
                    <Image floated="right" size="mini" src={molly} />
                    <Card.Header>Airha Flo</Card.Header>
                    <Card.Meta>
                      Nurse<Icon name="zoom-in" />
                    </Card.Meta>
                    <Card.Description>
                      University of the Philippines, Manila
                      <p>
                        <strong>Class of 2018</strong>
                      </p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button basic color="green">
                        View
                      </Button>

                      <Button basic color="red">
                        Delete User
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Accordion.Content>
          </Accordion>
        </Container>
      </div>
    );
  }
}

export default AccountTab;

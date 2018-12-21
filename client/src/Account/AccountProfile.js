import React, { Component } from "react";
import { Grid, Accordion, Icon, Table } from "semantic-ui-react";
import axios from "axios";

import Nav from "../Constants/Nav";
import Leftwing from "../Constants/Leftwing";
import AccountDetails from "./AccountDetails";
import DeleteAppointmentLink from "./DeleteAppointmentLink";

let appointmentsTable, logsTable;

const getAppointmentsQuery = "http://localhost:3001/api/Appointments";
const getLogsQuery = "http://localhost:3001/api/Logs";

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      appointments: [],
      logs: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.getAppointments = this.getAppointments.bind(this);
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  componentWillMount() {
    this.getAppointments();
    this.getLogs();
  }

  getAppointments() {
    axios.get(getAppointmentsQuery).then(response => {
      this.setState({ appointments: response.data }, () => {});
    });
  }

  getLogs() {
    axios.get(getLogsQuery).then(response => {
      this.setState({ logs: response.data }, () => {});
    });
  }

  render() {
    const { appointments, logs } = this.state;

    appointmentsTable = appointments.map(appointment => {
      return (
        <Table.Row key={appointment.id}>
          <Table.Cell>{appointment.date}</Table.Cell>
          <Table.Cell>{appointment.time}</Table.Cell>
          <Table.Cell>
            {appointment.lastName}, {appointment.firstName}{" "}
          </Table.Cell>
          <Table.Cell>
            <DeleteAppointmentLink item={appointment} />
          </Table.Cell>
        </Table.Row>
      );
    });

    logsTable = logs.map(log => {
      return (
        <Table.Row key={log.id}>
          <Table.Cell>{log.date}</Table.Cell>
          <Table.Cell>{log.activity}</Table.Cell>
          <Table.Cell>{log.user}</Table.Cell>
        </Table.Row>
      );
    });

    const { activeIndex } = this.state;

    return (
      <div>
        <Nav />

        <Grid relaxed columns={2}>
          <Grid.Column width={3}>
            <Leftwing />
          </Grid.Column>

          <Grid.Column width={12}>
            {/* <AccountDetails>

                        </AccountDetails> */}

            <Accordion fluid styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Information
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 0}>
                <AccountDetails />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Appointments
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 1}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>

                      <Table.HeaderCell>Time</Table.HeaderCell>

                      <Table.HeaderCell>With:</Table.HeaderCell>

                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>{appointmentsTable}</Table.Body>
                </Table>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />Logs
              </Accordion.Title>

              <Accordion.Content active={activeIndex === 2}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Date</Table.HeaderCell>

                      <Table.HeaderCell>Activity</Table.HeaderCell>

                      <Table.HeaderCell>User</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>{logsTable}</Table.Body>
                </Table>
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AccountProfile;

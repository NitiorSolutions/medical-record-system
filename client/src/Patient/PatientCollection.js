import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import PrescriptionHistoryTable from "./PrescriptionHistoryTable";
import DentalImages from "./DentalImages";
import DentalCharts from "./DentalCharts";
import ConsultationHistory from "./ConsultationHistory";

class PatientCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      item: props.item
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />Prescription History
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 0}>
          <PrescriptionHistoryTable />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />Dental Images
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 1}>
          <DentalImages />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />Dental Charts
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 2}>
          <DentalCharts />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />Consultation History
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 3}>
          <ConsultationHistory />
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default PatientCollection;

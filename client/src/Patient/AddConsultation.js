import React, { Component } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import find from "lodash/find";

const _ = {
    find: find
}

let fromPatient;

class AddConsultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      date: "",
      payment: 0,
      balance: 0,
      remarks: "",
      patientId: "",
      procedureId: "",
      procedures: []
    };

    this.onAdd = this.onAdd.bind(this);
    this.getProcedures = this.getProcedures.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getProcedures() {
    const url = process.env.REACT_APP_URL+'/procedures';
    axios.get(url)
    .then( response => {
      this.setState({
    		procedures: response.data
    	})
    })
    .catch(err => console.log(err));
  }

  onAdd() {
    fromPatient = this.props.match.params.id;

    const newConsultation = {
      date: this.state.date,
      payment: parseInt(this.state.payment, 10),
      balance: parseInt(this.state.balance, 10),
      remarks: this.state.remarks,
      patientId: fromPatient,
      procedureId: this.state.procedureId
    };
    const url = process.env.REACT_APP_URL+'/consultations';
    axios
      .request({
        method: "post",
        url: url,
        data: newConsultation
      })
      .then(response => {
        const currentDate = new Date();
        const newLog = {
          activity: "Added consultation to patient: " + fromPatient,
          date: currentDate,
          user: localStorage.userName
        };
        const url2 = process.env.REACT_APP_URL+'/logs';
        axios.request({
          method: "post",
          url: url2,
          data: newLog
        });
        this.props.history.push("/app/patients");
      });
  }

  handleChange(e, { name, value }) {
    if (name === 'procedureId'){
      console.log('pasok dito')
      const currentProcedure = _.find(this.state.procedures, function (o) { return o.id === value; });
      console.log(currentProcedure)
      this.setState({procedureId: value, balance: currentProcedure.price, payment:currentProcedure.price});
    } else {
      this.setState({
        [name]: value
      });
    }

  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  componentDidMount() {
    console.log(this.props)
    this.getProcedures();
  }

  render() {
    const { open, dimmer, procedures } = this.state;

    if(procedures.length === 0 ) return null;

    const optionsProcedure = procedures.map((procedure,index) => {
      return (
          { key: procedure.id, value: procedure.id, text: procedure.name }
      )
    });
    return (
      <span>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Add Consultation to {this.props.location.state.patient.firstName} {this.props.location.state.patient.lastName}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.date}
                    label="Date"
                    name="date"
                    type="date"
                  />
                  <Form.Select
                    onChange={this.handleChange}
                    value={this.state.procedureId}
                    options={optionsProcedure}
                    name="procedureId"
                    label="Procedure"
                    search
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.payment}
                    label="Payment"
                    name="payment"
                    type="text"
                    placeholder="Price"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.balance}
                    label="Balance"
                    name="balance"
                    type="text"
                    placeholder="Balance"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.remarks}
                    label="Remarks"
                    name="remarks"
                    type="text"
                    placeholder="Remarks"
                    width={16}
                  />
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Link to="/app/patients" className="ui button negative">
              Cancel
            </Link>
            <Button onClick={this.onAdd} positive>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}

export default AddConsultation;

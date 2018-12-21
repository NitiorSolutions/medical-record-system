import React, { Component } from 'react'
import { Confirm } from 'semantic-ui-react'

class DeleteConsultation extends Component {
    constructor(props){
        super(props);
        this.state = { open: false }

        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    show(){
      this.setState({ open: true })
    }

    handleConfirm(){
      this.props.onDelete(this.props.consultationId);
      this.setState({ open: false });
    }
    handleCancel() {
      this.setState({ open: false })
    }
    render() {
      const { open } = this.state

      return (
        <div>
          <i aria-hidden="true" className="delete large icon"
            onClick={this.show}></i>
          <Confirm
            open={open}
            content='Are you sure you want to delete this item?'
            cancelButton='No'
            confirmButton="Yes"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        </div>
      )
    }
}

export default DeleteConsultation;

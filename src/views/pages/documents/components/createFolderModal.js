import React from "react";
import { Modal, ModalHeader, ModalBody, } from "reactstrap";
import NewCategory from "./createFolderForm";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
class ModalForm extends React.Component {
  state = {
    hover: false,
    modal: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="section-header-pd">
          <span className="section-title m-1">Folder</span> 
          <span><AddIcon onClick={this.toggleModal} /></span>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Add New Folder</ModalHeader>
          <ModalBody>
            <NewCategory toggle={this.toggleModal} />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalForm;

import React from "react";
import { Modal, Box } from "@material-ui/core/";

const Context = React.createContext();

const initialState = {
  isOpen: false,
  content: null
};

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999
};

export class ModalStore extends React.Component {
  state = initialState;

  setModalOpen = content => {
    this.setState({
      isOpen: true,
      content
    });
  };

  setModalClose = () => {
    this.setState({
      isOpen: false,
      content: null
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          setModalOpen: this.setModalOpen,
          setModalClose: this.setModalClose
        }}
      >
        {this.props.children}
        <Box>
          <Modal
            style={modalStyle}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.isOpen}
            onClose={this.setModalClose}
          >
            {this.state.content || <div>Modal</div>}
          </Modal>
        </Box>
      </Context.Provider>
    );
  }
}

export default Context;

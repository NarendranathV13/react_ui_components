import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This line is important for accessibility

const ModalComponent = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <h2 className=' text-center '>React Modal</h2>
      <button className=' d-flex justify-content-center '  onClick={closeModal}>Close Modal</button>
    </Modal>
  );
};

export default ModalComponent;

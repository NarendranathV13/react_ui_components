import React, { useState } from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete';
import ModalComponent from './components/ModalComponent';
import ReactSelect from './components/ReactSelect';
import ReactDatepicker from './components/ReactDatepicker';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="App">
      <AutoComplete />
      <hr></hr>
      <div className=' container'>
      <h1 className=' text-center'>React Modal Example</h1>
      <button onClick={openModal}>Open Modal</button>
      <ModalComponent isOpen={modalOpen} closeModal={closeModal} />
      </div>
      <hr></hr>
      <div className=' container'>
        <h1 className=' text-center'>React select</h1>
        <ReactSelect />
      </div>
      <hr></hr>
      <div className=' container '>
        <h1>Date picker</h1>
        <ReactDatepicker />
      </div>
    </div>
  );
}

export default App;

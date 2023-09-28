import React, { useState } from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete';
import ModalComponent from './components/ModalComponent';
import ReactSelect from './components/ReactSelect';
import ReactDatepicker from './components/ReactDatepicker';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendars from './pages/FullCalenders';


function App() {
  // const [modalOpen, setModalOpen] = useState(false);
  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };
  return (
    <div className="App">
      {/* <AutoComplete />
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
      <hr></hr>
      <div className=' container mt-2 '>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
        />
      </div> */}
      <FullCalendars />
    </div>
  );
}

export default App;

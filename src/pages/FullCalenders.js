import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Swal from 'sweetalert2';
import Map from '../components/Map';

const FullCalendars = () => {
    const [startOfMonth, setStartOfMonth] = useState(null);
    const [endOfMonth, setEndOfMonth] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editableEvent, setEditableEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const handleEdit = (eventId) => {
        const eventToEdit = events.find(event => event.id === eventId);
        setEditableEvent(eventToEdit);
    }

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`https://65002c0e18c34dee0cd46da3.mockapi.io/Formdata/${editableEvent.id}`, editableEvent);
            setEvents(prevEvents => 
                prevEvents.map(event => (event.id === editableEvent.id && editableEvent) || event)
            )
            setEditableEvent(null);
            closeModal();
            Swal.fire({
                icon: 'success',
                title: 'Event edited successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error editing event:', error);
            alert('Error editing event');
        }
    }
    const handleDate = (arg) => {
        setShowModal(true);
        setSelectedDate(new Date(arg.start));
    }
    const closeModal = () => {
        setShowModal(false);
        setSelectedDate(null);
    }
    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            title: formData.title,
            start: formData.start,
            end: formData.end || null
        };

        try {
            const response = await axios.post('https://65002c0e18c34dee0cd46da3.mockapi.io/Formdata', newEvent);
            console.log('Event added successfully');

            newEvent.id = response.data.id; // Assuming the API returns the ID

            setFormData({
                title: '',
                start: '',
                end: ''
            });
            setEvents(prevEvents => [...prevEvents, newEvent]);
        } catch (error) {
            console.error('Error posting form data:', error);
            alert('Error posting form data');
        }
    }

    const handleDelete = (eventId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this event!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedEvents = events.filter(event => event.id !== eventId);
                setEvents(updatedEvents);
    
                try {
                    await axios.delete(`https://65002c0e18c34dee0cd46da3.mockapi.io/Formdata/${eventId}`);
                    console.log('Event deleted successfully');
                } catch (error) {
                    console.error('Error deleting event:', error);
                    alert('Error deleting event');
                }
            }
        });
    }
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://65002c0e18c34dee0cd46da3.mockapi.io/Formdata');
                const fetchedEvents = response.data.map(event => ({
                    id: event.id, // Assuming the API provides an ID for events
                    title: event.title,
                    start: event.start,
                    end: event.end || null
                }));
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, []);
    return (
        <>
            <nav className="navbar navbar-light bg-dark h-50">
                <div className="container-fluid d-flex justify-content-center">
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <label className='text-light'>
                            Event
                            <input
                                className="form-control me-2 mx-2"
                                type="text"
                                placeholder="Event"
                                aria-label="Event"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </label>
                        <label className='text-light'>
                            Start
                            <input
                                className='form-control me-2 mx-2'
                                type="date"
                                placeholder="Start Date"
                                aria-label="Start date"
                                name="start"
                                value={formData.start}
                                onChange={handleChange}
                            />
                        </label>
                        <label className='text-light'>
                            End
                            <input
                                className='form-control me-2 mx-2'
                                type="date"
                                placeholder="End Date"
                                aria-label="End date"
                                name="end"
                                value={formData.end}
                                onChange={handleChange}
                            />
                        </label>
                        <button className="btn btn-outline-success mx-3" type="submit">Add event</button>
                    </form>
                </div>
            </nav>
            {/* FullCalendar component for displaying events */}
         
            <div className='container'>
                <FullCalendar
                    datesSet={(arg) => {
                        setStartOfMonth(arg.start)
                        setEndOfMonth(arg.end)
                    }}
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    selectable={true}
                    select={handleDate}
                />
                {startOfMonth && endOfMonth && (
                    <div>
                        Start of the month: {startOfMonth.toISOString()}
                        <br />
                        End of the month: {endOfMonth.toISOString()}
                    </div>
                )}
            </div>
            {/* modal */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {selectedDate &&
                                    selectedDate.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                            </h5>
                            <button type="button" className="btn-close " data-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                        <ul>
                            {events.filter(event => {
                                return (
                                    selectedDate &&
                                    new Date(event.start).toLocaleDateString() === selectedDate.toLocaleDateString()
                                );
                            }).map((event, index) => (
                                <li key={index} className='mx-2'>
                                    {editableEvent && editableEvent.id === event.id ? (
                                        <input
                                            type="text"
                                            value={editableEvent.title}
                                            onChange={e => setEditableEvent({ ...editableEvent, title: e.target.value })}
                                        />
                                    ) : (
                                        <span>{event.title}</span>
                                    )}
                                    <span className="delete-icon mx-2 " onClick={() => handleDelete(event.id)}>
                                        <i className="fas fa-trash mx-2" style={{ color: '#ce1c1c', cursor: 'pointer' }}></i>
                                    </span>
                                    {editableEvent && editableEvent.id === event.id ? (
                                        <i className="fa-regular fa-check-square mx-2" style={{ color: '#00a000', cursor: 'pointer' }} onClick={handleSaveEdit}></i>
                                    ) : (
                                        <i className="fa-regular fa-pen-to-square mx-2" style={{ color: '#ebc400', cursor: 'pointer' }} onClick={() => handleEdit(event.id)}></i>
                                    )}
                                </li>
                            ))}
                            {selectedDate && events.filter(event => {
                                return (
                                    selectedDate &&
                                    new Date(event.start).toLocaleDateString() === selectedDate.toLocaleDateString()
                                );
                            }).length === 0 && <h5>No events</h5>}
                        </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <Map />
        </>
    )
}

export default FullCalendars;

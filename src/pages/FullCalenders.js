import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const FullCalendars = () => {
    // State for form data and events
    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: ''
    });

    const [events, setEvents] = useState([]);

    // Update form data on input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newEvent = {
            title: formData.title,
            start: formData.start,
            end: formData.end || null
        };
    
        try {
            // POST request to the API to add a new event
            const response = await axios.post('https://65002c0e18c34dee0cd46da3.mockapi.io/Formdata', newEvent);
            console.log('Event added successfully');
            // Reset form data 
            setFormData({
                title: '',
                start: '',
                end: ''
            });
            setEvents(prevEvents => [...prevEvents, newEvent]);// update event state
        } catch (error) {
            console.error('Error posting form data:', error);
            alert('Error posting form data');
        }
    }
    useEffect(() => {
        // Fetch events from the API 
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://65002c0e18c34dee0cd46da3.mockapi.io/Formdata');
                const fetchedEvents = response.data.map(event => ({
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
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin]}
                    events={events}
                />
            </div>
        </>
    )
}

export default FullCalendars;

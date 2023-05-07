import React, { useState, useEffect } from "react";
import "../styles/Events.css";
import { useParams } from 'react-router-dom';

export default function Events() {
  const { id } = useParams();
  // console.log(id);
  const tripname = new URLSearchParams(window.location.search).get("name");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${id}`)
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, [id]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
    price: "",
    time: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      const date = new Date(value).toISOString().slice(0, 10);
      setNewEvent({
        ...newEvent,
        [name]: date,
      });
    } else {
      setNewEvent({
        ...newEvent,
        [name]: value,
      });
    }
  };
  

  const addEvent = () => {
    const { name, date, location, price, time } = newEvent;
    fetch(`http://localhost:3001/events/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, date, location, price, time })
    })
      .then(response => response.json())
      .then(data => {
        const { insertId } = data;
        setEvents([...events, { id: insertId, name, date, location, price, time }]);
        setNewEvent({
          name: '',
          date: '',
          location: '',
          price: '',
          time: ''
        });
      })
      .catch(error => console.error('Error adding event:', error));
  };
  

  const deleteEvent = (index, eventId) => {
    fetch(`http://localhost:3001/events/${id}/${eventId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedEvents = events.filter((event, i) => i !== index);
        setEvents(updatedEvents);
      })
      .catch((error) => console.error('Error deleting event: ', error));
  };
  

  const handleEdit = (index, event) => {
    const updatedEvents = [...events];
    updatedEvents[index] = event;
    setEvents(updatedEvents);
  };

  return (
    <div className="events-container">
      <h1 className="events-h1">Events for {tripname}</h1>
      <input className="events-input"
        type="text"
        placeholder="Event Name"
        name="name"
        value={newEvent.name}
        onChange={handleInputChange}
      />
      <input className="events-input"
        type="date"
        placeholder="Date"
        name="date"
        value={newEvent.date}
        onChange={handleInputChange}
      />
      <input className="events-input"
        type="text"
        placeholder="Location"
        name="location"
        value={newEvent.location}
        onChange={handleInputChange}
      />
      <input className="events-input"
        type="text"
        placeholder="Price"
        name="price"
        value={newEvent.price}
        onChange={handleInputChange}
      />
      <input className="events-input"
        type="text"
        placeholder="Time"
        name="time"
        value={newEvent.time}
        onChange={handleInputChange}
      />
      <button className="events-item-button" onClick={addEvent}>Add Event</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <input
              type="text"
              placeholder="Event Name"
              value={event.name}
              onChange={(e) =>
                handleEdit(index, { ...event, name: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Date"
              value={event.date}
              onChange={(e) =>
                handleEdit(index, { ...event, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={event.location}
              onChange={(e) =>
                handleEdit(index, { ...event, location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Time"
              value={event.time}
              onChange={(e) =>
                handleEdit(index, { ...event, time: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Price"
              value={event.price}
              onChange={(e) =>
                handleEdit(index, { ...event, price: e.target.value })
              }
            />
            <button onClick={() => deleteEvent(index, event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


import React, { useState } from "react";
import "../styles/Events.css";
import { useParams } from 'react-router-dom';

export default function Events() {
  const { trip } = useParams();
  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const addEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({
      name: "",
      date: "",
      location: "",
    });
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((event, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleEdit = (index, event) => {
    const updatedEvents = [...events];
    updatedEvents[index] = event;
    setEvents(updatedEvents);
  };

  return (
    <div className="events-container">
      <h1 className="events-h1">Events for {trip}</h1>
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
            <button onClick={() => deleteEvent(index)}>Delete Event</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


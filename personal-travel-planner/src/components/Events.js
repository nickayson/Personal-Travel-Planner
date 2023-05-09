import React, { useState, useEffect } from "react";
import "../styles/Events.css";
import { useParams } from "react-router-dom";
import { Slider } from "antd";

export default function Events() {
  const [timeSlider, setTimeSlider] = useState(0);
  const { id } = useParams();
  const tripname = new URLSearchParams(window.location.search).get("name");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, date, location, price, time }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { insertId } = data;
        setEvents([
          ...events,
          { id: insertId, name, date, location, price, time },
        ]);
        setNewEvent({
          name: "",
          date: "",
          location: "",
          price: "",
          time: "",
        });
      })
      .catch((error) => console.error("Error adding event:", error));
  };

  const deleteEvent = (index, eventId) => {
    fetch(`http://localhost:3001/events/${id}/${eventId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEvents = events.filter((event, i) => i !== index);
        setEvents(updatedEvents);
      })
      .catch((error) => console.error("Error deleting event: ", error));
  };

  const handleEdit = (index, event) => {
    const updatedEvents = [...events];
    updatedEvents[index] = { ...event };
    setEvents(updatedEvents);
  };

  // const updateEvent = (index, event) => {
  //   fetch(`http://localhost:3001/events/${id}/${eventId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(event),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         const updatedEvents = [...events];
  //         updatedEvents[index] = { ...event };
  //         setEvents(updatedEvents);
  //         console.log("Event updated successfully");
  //       } else {
  //         console.error("Error updating event");
  //       }
  //     })
  //     .catch((error) => console.error("Error updating event: ", error));
  // };
  
     

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
      <div>
        <p className="events-p">
          Please slide for a time!
        </p>
      </div>
      <Slider
       className="events-slider"
        min={0}
        max={24 * 60}
        step={15}
        value={timeSlider}
        onChange={(value) => {
        setTimeSlider(value);
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setNewEvent({
        ...newEvent,
        time: timeString,
        });
        }}
      />
      <button className="events-item-button" onClick={addEvent}>Add Event</button>
      <ul className="ulist">
        {events.map((event, index) => (
          <li key={index}>
            <input className="events-input"
              type="text"
              placeholder="Event Name"
              value={event.name}
              onChange={(e) =>
                handleEdit(index, { ...event, name: e.target.value })
              }
            />
            <input className="events-input"
              type="date"
              placeholder="Date"
              value={event.date}
              onChange={(e) =>
                handleEdit(index, { ...event, date: e.target.value })
              }
            />
            <input className="events-input"
              type="text"
              placeholder="Location"
              value={event.location}
              onChange={(e) =>
                handleEdit(index, { ...event, location: e.target.value })
              }
            />
            <input className="events-input"
              type="text"
              placeholder="Price"
              value={event.price}
              onChange={(e) =>
                handleEdit(index, { ...event, price: e.target.value })
              }
            />
            <input className="events-input"
              type="text"
              placeholder="Time"
              value={event.time}
              onChange={(e) =>
                handleEdit(index, { ...event, time: e.target.value })
              }
            />
            {/* <button className="events-item-button" onClick={() => updateEvent(index, event.id)}>Update</button> */}
            <button className="events-item-button" onClick={() => deleteEvent(index, event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


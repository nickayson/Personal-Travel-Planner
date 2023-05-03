import React, { useState } from "react";
import "../styles/TripList.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Events from "./Events";

export default function TripList() {
  const [trips, settrips] = useState([]);
  const [newtrip, setNewtrip] = useState("");

  const addtrip = () => {
    fetch('http://localhost:3001/', { // Use the correct URL for your Express app
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newtrip }),
    })
    .then((response) => response.text()) // Return response text here
    .then((result) => {
      console.log(result);
      settrips([...trips, newtrip]);
      setNewtrip("");
    })
    .catch((error) => {
      console.error('Error adding trip: ', error);
    });
  };
  
  

  const deletetrip = (index) => {
    const updatedtrips = trips.filter((trip, i) => i !== index);
    settrips(updatedtrips);
  };

  return (
    <div className="trip-container">
      <h1 className="trip-h1">Create a Trip!</h1>
      <input
        className="trip-input"
        type="text"
        value={newtrip}
        onChange={(e) => setNewtrip(e.target.value)}
      />
      <button className="trip-item-button" onClick={addtrip}>
        Add
      </button>
      <ul className="trip-list">
        {trips.map((trip, index) => (
          <li className="trip-item" key={index}>
            <Link to={`/events/${trip}`} className="trip-link">{trip}</Link>
            <button
              className="trip-item-button"
              onClick={() => deletetrip(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path="/events/:trip" element={<Events />} />
      </Routes>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../styles/TripList.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Events from "./Events";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState("");

  const addTrip = () => {
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTrip }),
    })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      setNewTrip("");
      fetch('http://localhost:3001/')
        .then(response => response.json())
        .then(data => setTrips(data))
        .catch(error => console.error('Error fetching trips: ', error));
    })
    .catch((error) => {
      console.error('Error adding trip: ', error);
    });
  };
  
  
  useEffect(() => {
    fetch('http://localhost:3001/') // Use the correct URL for your Express app
      .then(response => response.json())
      .then(data => setTrips(data))
      .catch(error => console.error('Error fetching trips: ', error));
  }, []);

  const deleteTrip = (index) => {
    const trip = trips[index];
    const tripId = trip.id;
    const tripName = trip.name;
    
    fetch(`http://localhost:3001/${tripId}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const updatedTrips = trips.filter((trip, i) => i !== index);
        setTrips(updatedTrips);
      })
      .catch((error) => {
        console.error('Error deleting trip: ', error);
      });
  };

  return (
    <div className="trip-container">
      <h1 className="trip-h1">Create a Trip!</h1>
      <input
        className="trip-input"
        type="text"
        value={newTrip}
        onChange={(e) => setNewTrip(e.target.value)}
      />
      <button className="trip-item-button" onClick={addTrip}>
        Add
      </button>
      <ul className="trip-list">
        {trips.map((trip, index) => (
          <li className="trip-item" key={index}>
            <Link to={`/events/${trip.id}?name=${encodeURIComponent(trip.name)}`} className="trip-link">{trip.name}</Link>
            <button
              className="trip-item-button"
              onClick={() => deleteTrip(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path="/events/:id" element={<Events />} />
      </Routes>
    </div>
  );
}


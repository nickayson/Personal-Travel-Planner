import React, { useState } from "react";
import "../styles/TripList.css";

export default function TripList() {
  const [trips, settrips] = useState([]);
  const [newtrip, setNewtrip] = useState("");

  const addtrip = () => {
    settrips([...trips, newtrip]);
    setNewtrip("");
  };

  const deletetrip = (index) => {
    const updatedtrips = trips.filter((trip, i) => i !== index);
    settrips(updatedtrips);
  };

  return (
    <div className="trip-container">
    <h1 className="h1">Trip List</h1>
    <input className="trip-input"
      type="text"
      value={newtrip}
      onChange={(e) => setNewtrip(e.target.value)}
    />
    <button className="trip-item-button"onClick={addtrip}>Add</button>
    <ul className="trip-list">
      {trips.map((trip, index) => (
        <li className="trip-item" key={index}>
          {trip}
          <button className="trip-item-button" onClick={() => deletetrip(index)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  )
}

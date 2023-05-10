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

  const updatebutton = document.getElementById("update");
  const deletebutton = document.getElementById("delete");
  const addbutton = document.getElementById("add");

  if (updatebutton) {
    updatebutton.addEventListener("click", () => {
        const notification = document.createElement("div");
        notification.textContent = "Update Successful!";
        notification.style.position = "absolute";
        notification.style.top = "10px";
        notification.style.right = "10px";
        notification.style.padding = "10px";
        notification.style.background = "green";
        notification.style.animation = "fadeout 2s forwards";
        notification.style.borderRadius = "5px";
        notification.style.color = "white"; 
        notification.style.fontFamily = "sans-serif"; 
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.remove();
        }, 2000);
      });
  }
  if(deletebutton){
    deletebutton.addEventListener("click", () => {
      const notification = document.createElement("div");
      notification.textContent = "Event Deleted!";
      notification.style.position = "absolute";
      notification.style.top = "10px";
      notification.style.right = "10px";
      notification.style.padding = "10px";
      notification.style.background = "green";
      notification.style.animation = "fadeout 2s forwards";
      notification.style.borderRadius = "5px";
      notification.style.color = "white"; 
      notification.style.fontFamily = "sans-serif"; 
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2000);
    });
  }
  if(addbutton){
    addbutton.addEventListener("click", () => {
      const notification = document.createElement("div");
      notification.textContent = "Event Added!";
      notification.style.position = "absolute";
      notification.style.top = "10px";
      notification.style.right = "10px";
      notification.style.padding = "10px";
      notification.style.background = "green";
      notification.style.animation = "fadeout 2s forwards";
      notification.style.borderRadius = "5px";
      notification.style.color = "white"; 
      notification.style.fontFamily = "sans-serif"; 
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2000);
    });
  }

  return (
    <div className="trip-container">
      <h1 className="trip-h1">Create a Trip!</h1>
      <input
        className="trip-input"
        type="text"
        value={newTrip}
        onChange={(e) => setNewTrip(e.target.value)}
      />
      <button id="add" className="trip-item-button" onClick={addTrip}>
        Add
      </button>
      <ul className="trip-list">
        {trips.map((trip, index) => (
          <li className="trip-item" key={index}>
            <Link to={`/events/${trip.id}?name=${encodeURIComponent(trip.name)}`} className="trip-link">{trip.name}</Link>
            <button id="delete"
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


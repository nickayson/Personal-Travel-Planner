import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TripList from "./components/TripList";
import Events from "./components/Events";
import WorldClock from "./components/WorldClock";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="app-h1">Personal Travel Planner</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="/events/:trip" element={<Events />} />
          </Routes>
        </BrowserRouter>
        <div className="world-container">
        <div
          classname="world-clock-container"
          style={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        >
          <WorldClock timezone="America/New_York" label="New York" />
          <WorldClock timezone="Europe/London" label="London" />
          <WorldClock timezone="Asia/Tokyo" label="Tokyo" />
          <WorldClock timezone="America/Los_Angeles" label="Los_Angeles" />
          <WorldClock timezone="America/Sao_Paulo" label="Sao_Paulo" />
          <WorldClock timezone="Asia/Dubai" label="Dubai" />
          <WorldClock timezone="Europe/Berlin" label="Berlin" />
          <WorldClock timezone="Asia/Shanghai" label="Shanghai" />
        </div>
        <div
          classname="world-clock-container"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <WorldClock timezone="Australia/Sydney" label="Sydney" />
          <WorldClock timezone="Africa/Johannesburg" label="Johannesburg" />
          <WorldClock timezone="Asia/Hong_Kong" label="Hong Kong" />
          <WorldClock timezone="Europe/Paris" label="Paris" />
          <WorldClock timezone="America/Chicago" label="Chicago" />
          <WorldClock timezone="Africa/Cairo" label="Cairo" />
          <WorldClock timezone="Asia/Singapore" label="Singapore" />
          <WorldClock timezone="Australia/Melbourne" label="Melbourne" />
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;

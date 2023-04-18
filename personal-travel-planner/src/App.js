import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TripList from "./components/TripList";
import Events from "./components/Events";
import "./styles/App.css";
import WorldClock from "./components/WorldClock";

function App() {
  return (
    <div className="container">
      <h1 className='app-h1'> Personal Travel Planner</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TripList />} />
          <Route path="/events/:trip" element={<Events />} />
        </Routes>
      </BrowserRouter>
      <div classname="world-clock-container" style={{ display: "flex", flexDirection: "row" }}>
        <WorldClock timezone="America/New_York" label="New York" />
        <WorldClock timezone="Europe/London" label="London" />
        <WorldClock timezone="Asia/Tokyo" label="Tokyo" />
        <WorldClock timezone="India/Delhi" label="Delhi" />
        <WorldClock timezone="Philippines/Manila" label="Manila" />
        <WorldClock timezone="America/New_York" label="New_York" />
        <WorldClock timezone="America/Los_Angeles" label="Los_Angeles" />
        <WorldClock timezone="Europe/London" label="London" />
        <WorldClock timezone="Europe/Berlin" label="Berlin" />
        <WorldClock timezone="Asia/Shanghai" label="Shanghai" />
        <WorldClock timezone="Australia/Sydney" label="Sydney" />
        <WorldClock timezone="Africa/Johannesburg" label="Johannesburg" />
        <WorldClock timezone="America/Sao_Paulo" label="Sao_Paulo" />
        <WorldClock timezone="Asia/Dubai" label="Dubai" />
      </div>
    </div>
    
  );
}

export default App;


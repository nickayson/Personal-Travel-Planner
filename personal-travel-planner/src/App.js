import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TripList from "./components/TripList";
import Events from "./components/Events";
import "./styles/App.css";

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
    </div>
  );
}

export default App;


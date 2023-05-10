import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TripList from "./components/TripList";
import Events from "./components/Events";
import WorldClock from "./components/WorldClock";
import Slideshow from "./components/Slideshow";
import Slideshow2 from "./components/Slideshow2";
import "./styles/App.css";

const images = [
  'https://www.leticialampert.com.br/wp-content/uploads/2016/02/random-city-1-porto-alegre-seoul-shanghai-1920x1200.jpg',
  'https://media.timeout.com/images/105238954/750/422/image.jpg',
  'https://live.staticflickr.com/5267/5851546454_302f9aa261_b.jpg',
];

const images2 = [
  'https://i.pinimg.com/originals/56/c9/69/56c969fe5dc9a0baca6abab4aeee4f80.jpg',
  'https://www.leticialampert.com.br/wp-content/uploads/2016/02/random-city-6-shanghai-sp-belem.jpg',
  'https://media.istockphoto.com/id/601158224/photo/aerial-view-of-a-downtown-la-at-sunset.jpg?s=612x612&w=0&k=20&c=V36E4qOGijXZzhlLYqWgw0zoGCtD7Cv4WKDq6SwWG5U=',
];


function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="app-h1">Personal Travel Planner</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="/events/:id" element={<Events />} />
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
        <div>
          <Slideshow images={images} />
        </div>
        <div>
          <Slideshow2 images={images2} />
        </div>
      </div>

    </div>
  );
}

export default App;

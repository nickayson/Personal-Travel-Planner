import TripList from "./components/TripList";
import Events from "./components/Events";
import "./styles/App.css";

function App() {
  return (
    <div className="container">
      <TripList/>
      <Events/>
    </div>
  );
}

export default App;

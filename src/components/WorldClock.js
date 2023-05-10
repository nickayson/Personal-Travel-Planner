import React, { useState, useEffect } from "react";
import LiveClock from "react-live-clock";
import "../styles/WorldClock.css";

function WorldClock({ timezone, label }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    async function getCurrentTime() {
      const response = await fetch(`get_time.php?timezone=${timezone}`);
      const data = await response.text();
      setTime(data);
    }
    getCurrentTime();
    setInterval(getCurrentTime, 1000); // update the time every second
  }, [timezone]);

  return (
    <div className="world-clock-container">
      <h2 className="world-clock-label">{label}</h2>
      <LiveClock className="world-clock" format="hh:mm:ss a" ticking={true} timezone={timezone} />
    </div>
  );
}

export default WorldClock;


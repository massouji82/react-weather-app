import React from "react";
import "./App.css";
import WeatherComponent from "./Components/WeatherComponent";

function App() {
  return (
    <div className="App">
      <h1 className="display-3 mt-2">React Weather App</h1>
      <WeatherComponent />
    </div>
  );
}

export default App;

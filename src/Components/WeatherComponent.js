import React, { useState } from "react";
import "../WeatherComponent.css";
import ForecastComponent from "./ForecastComponent.js";
import useInputState from "../hooks/useInputState";

function WeatherComponent() {
  const [city, updateCity] = useInputState("");
  const [country, updateCountry] = useInputState("");
  const [showForecast, setShowForecast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForecast(true);
  };

  return (
    <div className="container h-100 noselect">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              value={country}
              onChange={updateCountry}
              placeholder="Country ..."
              className="form-control"
              name="country"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              value={city}
              onChange={updateCity}
              placeholder="City ..."
              name="city"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-2 text-md-left">
            <button className="btn btn-warning">Get Forecast</button>
          </div>
        </div>
      </form>
      {showForecast && <ForecastComponent city={city} country={country} />}
    </div>
  );
}

export default WeatherComponent;

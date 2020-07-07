import React, { useState, useEffect } from "react";
import DayComponent from "./DayComponent.js";
import "../ForecastComponent.css";
import axios from "axios";

function ForecastComponent(props) {
  const [daily, setDaily] = useState([]);
  const [address, setAddress] = useState("");
  const openKey = "Your key";
  const googleKey = "Your key";

  useEffect(() => {
    let lat;
    let lng;
    const getData = async () => {
      // Make request to googleMap API in order to geocode location data received from the user
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${props.city}+${props.country}&key=${googleKey}`
        )
        .then((res) => {
          lat = res.data.results[0].geometry.location.lat;
          lng = res.data.results[0].geometry.location.lng;
          setAddress(res.data.results[0].formatted_address);
        })
        .catch((err) => {
          if (err.response) {
            console.log("Problem with response ", err.response.status);
          } else if (err.request) {
            console.log("Problem with request ", err.request.status);
          } else {
            console.log("Error", err.message);
          }
        });
      // Make request to openweathermap API with coordinates received from google API
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,current&units=metric&appid=${openKey}`
        )
        .then((res) => {
          res.data.daily.splice(res.data.daily.length - 1);
          setDaily(res.data.daily);
        })
        .catch((err) => {
          if (err.response) {
            console.log("Problem with response ", err.response.status);
          } else if (err.request) {
            console.log("Problem with request ", err.request.status);
          } else {
            console.log("Error", err.message);
          }
        });
    };
    getData();
  }, [props, address]);

  console.log(daily);
  return (
    daily && (
      <div className="ForecastComponent container">
        <div className="row">
          <div className="Address text-white col-md-3">{address}</div>
          {daily.map((day, idx) => {
            return (
              <div className="col-md-3" key={idx}>
                <DayComponent days={day} />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default ForecastComponent;

import React, { useState } from "react";
import "../DayComponent.css";

function DayComponent({ days }) {
  const [showInfo, setShowInfo] = useState(false);
  const url = `http://openweathermap.org/img/w/${days.weather[0].icon}.png`;

  //Convert unix timestamp to JS Date object
  const unixConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var time = date + " " + month + " " + year + " " + hour + ":00";

    return time;
  };

  //Convert unix timestamp to JS Date object with only time
  const unixConverterHours = (UNIX_timestamp) => {
    var b = new Date(UNIX_timestamp * 1000);
    var hour = b.getHours();
    var minute = "0" + b.getMinutes();
    var formattedTime = hour + ":" + minute.substr(-2);

    return formattedTime;
  };

  //Hide and show additional info
  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div
      className="container text-light"
      onClick={handleClick}
      title="Click for more info"
    >
      <div className="inner-container">
        <h4 className="text-white py-3">{unixConverter(days.dt)}</h4>
        <h4 className="text-white py-3 description">
          {days.weather[0].description.charAt(0).toUpperCase() +
            days.weather[0].description.slice(1)}
        </h4>
        <img src={url} alt="weatherIcon" />
        {showInfo && (
          <div className="text-white">
            <h5>Sunrise: {unixConverterHours(days.sunrise)}</h5>
            <h5>Sunset: {unixConverterHours(days.sunset)}</h5>
            <h5>Max temperature: {days.temp.max} °C</h5>
            <h5>Min temperature: {days.temp.min} °C</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default DayComponent;

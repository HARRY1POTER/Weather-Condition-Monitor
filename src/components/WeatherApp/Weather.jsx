import React, { useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import Fog from "../assets/Fog.png";
import drizzle_icon from "../assets/drizzle.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  let api_key = process.env.REACT_APP_API_KEY;

  const [icon, seticon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("city");
    if (element.length === 0 || element[0].value === "") {
      return 0;
    }
    let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${element[0].value}&aqi=no`;

    let res = await fetch(url);
    let data = await res.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const region = document.getElementsByClassName("weather-region");

    if (data.current) {
      if (humidity.length > 0) {
        humidity[0].innerHTML = data.current.humidity + "%";
      }
      if (wind.length > 0) {
        wind[0].innerHTML = data.current.wind_kph + "km/h";
      }
      if (temp.length > 0) {
        temp[0].innerHTML = data.current.temp_c + "°C";
      }
      if (location.length > 0) {
        location[0].innerHTML = data.location.country;
      }
      if (region.length > 0) {
        region[0].innerHTML = data.location.region + ",";
      }
    } else {
      if (humidity.length > 0) {
        humidity[0].innerHTML = "--";
      }
      if (wind.length > 0) {
        wind[0].innerHTML = "--";
      }
      if (temp.length > 0) {
        temp[0].innerHTML = "--°C";
      }
      if (location.length > 0) {
        location[0].innerHTML = "--";
      }
      if (region.length > 0) {
        region[0].innerHTML = "--";
      }
    }

    if (data.current && data.current.condition.text) {
      const conditionText = data.current.condition.text;
      if (conditionText === "Clear") {
        seticon(clear_icon);
      } else if (
        conditionText === "Mostly clear" ||
        conditionText === "Partly cloudy" ||
        conditionText === "Mostly cloudy" ||
        conditionText === "Cloudy"
      ) {
        seticon(cloud_icon);
      } else if (conditionText === "Light fog" || conditionText === "Fog") {
        seticon(Fog);
      } else if (
        conditionText === "Drizzle" ||
        conditionText === "Light rain" ||
        conditionText === "Rain" ||
        conditionText === "Heavy rain"
      ) {
        seticon(drizzle_icon);
      } else if (
        conditionText === "Flurries" ||
        conditionText === "Light snow" ||
        conditionText === "Snow" ||
        conditionText === "Heavy snow"
      ) {
        seticon(snow_icon);
      } else {
        seticon(cloud_icon);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  document.addEventListener("DOMContentLoaded", search);

  return (
    <div className="containers w-[607px] h-auto mb-[75px] m-auto mt-[75px] rounded-[12px] bg-gradient-to-t from-indigo-600 to-indigo-500">
      <div className="top-bar flex justify-center gap-[14px] pt-[60px]">
        <input
          type="text"
          className="city flex w-[362px] h-[78px] bg-[#ebfffc] border-none outline-none rounded-[40px] pl-[40px] text-[#626262] text-xl font-normal "
          placeholder="Search"
          onKeyPress={handleKeyPress}
        />
        <div
          onClick={() => {
            search();
          }}
          className="flex justify-center items-center w-[78px] h-[78px] bg-[#ebfffc] rounded-[40px] cursor-pointer"
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weth mt-[29px] flex justify-center ">
        <img src={icon} alt="" />
      </div>
      <div className="weather-temp flex justify-center text-white font-normal text-[120px] ">
        --°C{" "}
      </div>
      <div className="flex justify-center  text-white text-[60px] font-normal gap-2">
        <div className="weather-location flex justify-center  text-white text-[60px] font-normal  ">
          --{" "}
        </div>
      </div>
      <div className="data mt-[50px] text-white flex justify-center  ">
        <div className="ele m-auto flex items-start gap-[12px]">
          <img src={humidity_icon} alt="" className="icom mt-[10px]" />
          <div className="data font-normal text-[34px] mb-5 ">
            <div className="humidity-percent">--%</div>
            <div className="text text-[20px] font-normal">Humidity</div>
          </div>
        </div>
        <div className="ele m-auto flex items-start gap-[12px]">
          <img src={wind_icon} alt="" className="icom mt-[10px]" />
          <div className="data font-normal text-[34px] mb-5 ">
            <div className="wind-rate">-- km/h</div>
            <div className="text text-[20px] font-normal">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

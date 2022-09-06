import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './WeatherApp.css';
import '../utils/Loader.css';
import getDate from '../utils/getDate';
import getBackground from '../utils/getBackground';

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=40c38ae2279823921c8e5490f120dec6`
        )
        .then((res) => setData(res.data), setIsLoading(false))
        .finally(() => setIsLoading(false));
    }
  }, []);
  return (
    <div className='container'>
      {isLoading ? (
        // ----- LOADER -----
        <div className='loader-container'>
          <div className='spinner'>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        </div>
      ) : (
        // ----- APP -----
        <div className={getBackground(data.weather?.[0].main) + ' App-ctn'}>
          <div className='App'>
            <h1>Weather Today</h1>
            <hr />
            <h3>
              {data.name} | {data.sys?.country}
            </h3>

            <div className='App-data'>
              <div className='App-icon'>
                <div>
                  <b>Description: </b>{' '}
                  <p className='App-weather-info'>
                    {data.weather?.[0].main}, {data.weather?.[0].description}
                  </p>
                </div>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
                  alt='Weather Icon'
                />
                {/* TEMPERATURE */}
                <p>
                  {isFahrenheit
                    ? Math.floor((data.main?.temp - 273.15) * 1.8 + 32) + ' °F'
                    : Math.floor(data.main?.temp - 273.15) + ' °C'}
                </p>
              </div>

              <div className='App-info'>
                <div>
                  <b>Wind Speed: </b> <p>{data.wind?.speed} m/s</p>
                </div>
                <div>
                  <b>Humidity: </b> <p>{data.main?.humidity}%</p>
                </div>
                <div>
                  <b>Pressure: </b> <p>{data.main?.pressure} mb</p>
                </div>
              </div>
            </div>
            <p>{getDate()}</p>
            <button
              className='weather__button'
              onClick={() => setIsFahrenheit(!isFahrenheit)}
            >
              °F / °C
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

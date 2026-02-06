import React, { useState } from 'react';
import './App.css';
import { APIURL, callApi } from './lib';

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const IMGURL = import.meta.env.BASE_URL;

  function getData()
  {
    setError("");
    setData(null);
    if(city === "")
    {
      setError("Enter name of the city");
      return;
    }
    setIsLoading(true);
    const URL = APIURL(city);
    if (!URL) {
      setError("Missing API key. Check VITE_OPENWEATHER_KEY and restart the dev server.");
      setIsLoading(false);
      return;
    }
    callApi("GET", URL, null, loadData, handleError);
  }

  function loadData(res)
  {
    setData(res);
    setIsLoading(false);
  }

  function handleError(err)
  {
    setError(err?.message || "Failed to fetch. Check your network or API key.");
    setIsLoading(false);
  }

  return (
    <div className='app'>
      <div className='header'>
        <img src={IMGURL + "weather.svg"} alt='Weather logo' />Weather App
      </div>
      <div className='section'>
        <div className='inputdiv'>
          <input type='text' placeholder='Enter city name' value={city} onChange={(e)=>setCity(e.target.value)} />
          <button onClick={()=>getData()}>Search</button>
        </div>
        <div className='errMsg'>{error}</div>
        {data && 
          <div className='weatherinfo'>
            <img src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png"} alt='' />
            <div>
              <h3>{data.name}</h3>
              <h1>{data.main.temp}c</h1>
            </div>
            <div>
              <p><span>Condition</span><span>{data.weather[0].description}</span></p>
              <p><span>Humidity</span><span>{data.main.humidity}</span></p>
              <p><span>Wind Speed</span><span>{data.wind.speed}</span></p>
            </div>
          </div>
        }
      </div>
      <div className='footer'>Copyright @ 2026</div>

      {isLoading && 
        <div className='progress'>
          <img src={IMGURL + "loading.svg"} alt='Loading' />
        </div>
      }
    </div>
  );
}

export default App;

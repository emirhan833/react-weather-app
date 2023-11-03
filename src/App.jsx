import React, { useState } from "react";
import './style.css'
import Button from '@mui/material/Button'
import Cloud from '../src/files/Cloud.svg';
import Wind from '../src/files/Wind.svg';
import sun from '../src/files/Sun.svg';
import Input from '@mui/material/Input';

function App() {
  const [city, setCity] = useState(""); // Şehir adını saklamak için state
  const [weatherData, setWeatherData] = useState(null); // Weather verilerini saklamak için state
  const lang = 'tr';
  const [havaDurumu, setHavaDurumu] = useState("");

  function fetchWeather() {
    const apiKey = 'cf1d9d808c36b93a34af923cc107646c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(window.alert('check city name'));
        }
      })
      .then(data => {
        setWeatherData(data); // Verileri state'e kaydet
        const weatherMain = data.weather[0].main;

        const temp = weatherData.main.temp
        console.log(weatherMain)

        if (weatherMain === 'Clouds') {
          setHavaDurumu(Cloud);
        }
        else if (weatherMain === 'Clear') {
          setHavaDurumu(sun)
        }
        else if (weatherMain === 'Rain')
        {
          setHavaDurumu(Wind)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div id="wrap">
      <div id="wrapper">
        <Input
          type="text"
          placeholder="Şehir girin"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Şehir inputunu takip et
        />
        <Button variant="contained" onClick={fetchWeather}>Hava Durumu</Button>
        {weatherData && (
          <div>
            <img src={`${havaDurumu}`} width={'80px'} height={'80px'} alt="" srcSet="" />
            <p id="city">Şehir: {weatherData.name}</p>
            <p id="temp">Sıcaklık: {Math.floor(weatherData.main.temp)}</p>
            <p id="wind_speed">Rüzgar Hızı: {weatherData.wind.speed}</p>
            {/* Diğer hava durumu verilerini burada gösterebilirsiniz */}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;

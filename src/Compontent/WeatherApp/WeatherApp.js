import React, { useState } from 'react'
import './WeatherApp.css'
import cloud from '../Assets/cloud.png'
import humidity from '../Assets/humidity.png'
import searchimg from '../Assets/search.png'
import wind from '../Assets/wind.png'
import clear from '../Assets/clear.png'
import drizzle from '../Assets/drizzle.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'


const WeatherApp = () => {

    let api_Key  ='9d28076f4fd36d5be58503e56d0a9740';
    
    const [wicon, setWicon] = useState(cloud);

    const search = async () =>{
        const element = document.getElementsByClassName('cityInput')
        if(element[0].value === ""){
            return 0;
        }
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_Key}`;

         let response = await fetch(url);
         let data =await response.json();
         const humidity = document.getElementsByClassName('humidity-percent');
         const wind = document.getElementsByClassName('wind-rate');
         const temprature = document.getElementsByClassName('weather-temp');
         const location = document.getElementsByClassName('weather-location')

         humidity[0].innerHTML = data.main.humidity + " %";
         wind[0].innerHTML = Math.floor(data.wind.speed) + 'Km/h';
         temprature[0].innerHTML = Math.floor(data.main.temp) + '°C';
         location[0].innerHTML = data.name;

         

         if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n' ){
            setWicon(clear);
         }
        else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n')
         {
            setWicon(cloud)
         }
         else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n')
         {
            setWicon(drizzle)
         }
         else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n')
         {
            setWicon(rain)
         }
         else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n')
         {
            setWicon(snow)
         }
         else{
            setWicon(clear)
         }
    }

    
    
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='Search'/>
            <div className='search-icon' onClick={() => {search()}}>
                <img src={searchimg} alt=''/>
            </div>
        </div>
        <div className='weather-image'>
            <img src={wicon} alt='cloud'/>
        </div>
        <div className='weather-temp'>
            25°C
        </div>
        <div className='weather-location'>
            London
        </div>
        <div className='data-container'>

        <div className='element'>
            <img src={humidity} alt='i' className='icon' />
            <div className='data'>
                <div className='humidity-percent'>65%</div>
                <div className='text'>Humidity</div>
            </div>
        </div>

        <div className='element'>
        <img src={wind} alt='i' className='icon' />
            <div className='data'>
                <div className='wind-rate'>80 KM/H</div>
                <div className='text'>Wind Speed</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default WeatherApp
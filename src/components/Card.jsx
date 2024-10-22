import React, { useEffect, useState } from 'react'
import dayLandscape from "../assets/day-landscape.png"
import nightLandscape from "../assets/night-landscape.png"
const Card = ({city,weatherData,weeklyData,unit}) => {
  const [weatherDetails,setWeatherDetails]=useState();
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('')
  useEffect(()=>{
    setWeatherDetails(weatherData);
  console.log("m,,,,,,,,,,,,,,.",weatherData);
  const sunriseTime = new Date(weatherData?.sys?.sunrise * 1000);
  const sunsetTime = new Date(weatherData?.sys?.sunset * 1000);
  
  setSunrise(`${sunriseTime.getHours()}:${sunriseTime.getMinutes() < 10 ? '0' : ''}${sunriseTime.getMinutes()}`);
  setSunset(`${sunsetTime.getHours()}:${sunsetTime.getMinutes() < 10 ? '0' : ''}${sunsetTime.getMinutes()}`);
  },[weatherData]);
  return (
    <div>
      <div className="flex flex-col  justify-center p-6 bg-gray-800 text-white rounded-lg w-full max-w-5xl">
      {/* Location and time */}
      <div className="text-left">
        <h2 className="text-xl font-bold">Forecast in <span className="text-yellow-400">{city}</span></h2>
        <p>Last updated at: {weatherDetails?.dt} </p>
      </div>


      <div className="flex gap-10 mt-6">
        {/* Current weather */}
        <div className="flex flex-col py-4 px-6 w-[50%] h-100 rounded-lg"
        style={{backgroundColor:"#242230"}}>
          <div className='flex justify-between'>
            <div>
          <h1 className="text-6xl font-bold">{weatherDetails?.main?.temp} °{unit[0]} </h1>
          <p className="text-lg font-semibold my-2">Feels like {weatherDetails?.main?.feels_like} °{unit[0]} </p>
            </div>
            <div>
            <p className="font-bold flex gap-2 items-center">
              <small className='text-end pt-2'>High</small>
              <span className='text-2xl' >{weatherDetails?.main?.temp_max}°{unit[0]}  </span>
              </p>
              <p className="font-bold flex gap-2 items-center">
            <small className='text-end pt-2'>Low</small>
            <span className='text-2xl' >{weatherDetails?.main?.temp_min}°{unit[0]} </span>
              </p>
            </div>
          </div>
          {/* <p className="text-yellow-400">Clear Sky</p> */}
          <p className='flex gap-4 items-center justify-between'>
            <span className='capitalize'>
            {weatherDetails?.weather[0]?.description}
            </span>
            <img src={`https://openweathermap.org/img/wn/${weatherDetails?.weather[0]?.icon}.png`} alt="Icon"
            className='w-20 h-20' />
          </p>
        </div>

        {/* Additional details */}
        <div className="grid grid-cols-1 gap-1 text-center">
          <div className="p-2 bg-gray-700 rounded-lg flex gap-3">
            <p>Avg Temp.</p>
            <p className="font-bold">{((weatherDetails?.main?.temp_min+weatherDetails?.main?.temp_max)/2).toFixed(2)}</p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg flex gap-3 items-center">
            <p>Max. Temp.</p>
            <p className="font-bold">{weatherDetails?.main?.temp_max} °{unit[0]} </p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg flex gap-3">
          <p>Min. Temp.</p>
          <p className="font-bold">{weatherDetails?.main?.temp_min} °{unit[0]} </p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg flex gap-3">
            <p>Humidity</p>
            <p className="font-bold">{weatherDetails?.main?.humidity}%</p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg flex gap-3">
            <p>Wind Speed</p>
            <p className="font-bold">{weatherDetails?.wind?.speed}%</p>
          </div>
        </div>
      {/* Sunrise and sunset */}
      <div className=" bg-gray-700 rounded-lg p-3 bg-cover w-52 h-100 flex flex-col justify-between items-center text-black"
      style={{backgroundImage:`url(${dayLandscape})`}}
      >
        <div>
          <p className='font-bold text-xl'>Sunrise</p>
          <p className="font-semibold">{sunrise} am</p>
        </div>
        <div>
        <p className='font-bold text-xl'>Sunset</p>
          <p className="font-semibold">{sunset} pm</p>
        </div>
      </div>
      </div>


      {/* Weekly forecast */}

        <div className='my-4 px-6 py-4 rounded-lg'style={{backgroundColor:"#242230"}}>
        <h1 className='text-2xl font-semibold'>
          Weekly Forecast
        </h1>
      <div className="my-2 grid grid-cols-6 gap-4 w-full">
      {Object.entries(weeklyData).map(([date, { min, max, icon }]) => (
        <div key={date}  className="flex flex-col items-center p-2 bg-gray-700 rounded-lg">
              <p className="font-bold capitalize">{ new Date(date).toLocaleString('en-US', { weekday: 'long' })}</p>
              <div className=" my-2">
              <span className="text-lg text-yellow-500">{min} °{unit[0]} </span>
              <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
              <span className="block text-lg text-orange-600">{max} °{unit[0]} </span>
            </div>
              
            </div>
          ))}
      {/*
        {[
          { day: 'mon', high: 73, low: 57 },
          { day: 'tue', high: 77, low: 58 },
          { day: 'wed', high: 72, low: 63 },
          { day: 'thu', high: 70, low: 60 },
          { day: 'fri', high: 63, low: 50 },
          { day: 'sat', high: 60, low: 47 },
          { day: 'sun', high: 59, low: 50 },
        ].map((forecast, index) => (
          <div key={index} className="flex flex-col items-center p-2 bg-gray-700 rounded-lg">
            <p className="font-bold capitalize">{forecast.day}</p>
            <div className="text-yellow-400">
              <span className="text-lg">{forecast.high}°F</span>
              <span className="block text-sm">{forecast.low}°F</span>
            </div>
          </div>
        ))} */}
      </div>
        </div>
    </div>
    </div>
  )
}

export default Card

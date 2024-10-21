import React, { useEffect } from 'react'
import { useState } from 'react';
import Card from '../components/Card';
import axios from "axios";
const Home = () => {
    const [unit, setUnit] = useState('Celsius'); 
    const [searchTerm, setSearchTerm] = useState('Bengaluru'); 
    const [data,setData]=useState();
    const [forecastData,setForecastData]=useState();
    const [weeklyData,setWeeklyData]=useState([]);
    const handleUnitChange = (event) => {
      setUnit(event.target.value); 
      console.log(`Selected unit: ${event.target.value}`);
        handleAPICalls(event.target.value);
    };

    const handleAPICalls=(unit)=>{
      console.log(unit);
      if(unit==='Celsius'){
        getWeatherData("metric");
        getForecastData("metric");
      }
      else if(unit==='Fahrenheit'){
        getWeatherData("imperial");
        getForecastData("imperial");
      }
      else{
        getWeatherData("");
        getForecastData("");
      }
    }

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value); 
    };
  
    const handleSubmit = (event) => {
      event.preventDefault(); 
      console.log(`Searching for: ${searchTerm}`);
      console.log(unit);
      if(unit==='undefined')
      {
        handleAPICalls("Celsius");
      }
      else{
        handleAPICalls(unit);
      }
      // Add your search logic here
    };

    const getWeatherData=(tempUnit)=>{
      const apiKey="97a490f4c8ca0ea658ce5aa7a52651bd";
      // tempUnit= unit==='Celcius' ? 'metric': unit==="Fahrenheit" ? "imperial" : "";
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=${tempUnit}&appid=${apiKey}`).then((data)=>{
        console.log(data);
        setData(data.data);
        
      }).catch((err)=>{
        console.log(err);
      })
    }
    const getForecastData=(tempUnit)=>{
      const apiKey="1a85139654542ba15f9cb458cd6b9166";
      // axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cord?.lat}&lon=${cord?.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`).then((data)=>{
      // tempUnit= unit=='Celcius' ? 'metric': unit=="Fahrenheit" ? "imperial" : "";
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&exclude=minutely,hourly&units=${tempUnit}&appid=${apiKey}`).then((data)=>{
        console.log(data);
        setForecastData(data.data);
        const weeklyManipulatedData=data.data?.list.reduce((acc, curr) => {
          const date = curr?.dt_txt.split(" ")[0]; // Get the date part
          if (!acc[date]) {
            acc[date] = { min: curr?.main?.temp_min, max: curr?.main?.temp_max, icon: curr?.weather[0]?.icon };
          } else {
            acc[date].min = Math.min(acc[date]?.min, curr?.main?.temp_min);
            acc[date].max = Math.max(acc[date]?.max, curr?.main?.temp_max);
            acc[date].icon=curr?.weather[0]?.icon;
          }
          return acc;
        }, {});
        console.log(weeklyManipulatedData)
        setWeeklyData(weeklyManipulatedData);
      }).catch((err)=>{
        console.log(err);
      })
    }
    useEffect(()=>{
      handleAPICalls('Celsius');
      // getWeatherData("metric");
      // getForecastData("metric");
    },[]);

  return (
    <div className='text-white'>
        <div className='container mx-auto my-5'>
        
            <div className="flex justify-between items-center">
            <h1>Real time weather monitoring</h1>
            <form className="flex items-center max-w-xl " onSubmit={handleSubmit}>
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <i className="fa-solid fa-location-arrow" aria-hidden="true"></i>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Entry city name.."
          value={searchTerm}
          onChange={handleInputChange}
          required
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
    <div>
           <select 
            value={unit} 
            onChange={handleUnitChange} 
            className='border border-gray-300 rounded-md p-2 mb-4 bg-blue-400'
        >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Kelvin">Kelvin</option>
        </select>
        </div>
            </div>

        <Card city={searchTerm} weatherData={data} weeklyData={weeklyData} unit={unit} />
        </div>
    </div>
  )
}

export default Home

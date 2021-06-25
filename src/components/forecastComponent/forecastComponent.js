import React, { useState, useRef, useEffect } from 'react'
import Widget from '../widgetComponent/widgetComponent'
import './forecastStyle.css'

const API_KEY = process.env.REACT_APP_API_KEY

const Forecast = () => {

  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const cityInput = useRef() 

  const getWeatherFromAPI = async () => {
    setIsLoading(true)
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput.current.value}&exclude=current&units=metric&appid=${API_KEY}`)
    const data = await res.json()

    await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(prev => [...prev,result])
    });
    
    cityInput.current.value = null
    setIsLoading(false)
  }

  useEffect(() => {
    const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    
    if(lat !== undefined && long  !== undefined) {
      setIsLoading(true);
      await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(prev => [...prev,result])
      });    
    }
     setIsLoading(false)
  }

  fetchData();
  }, [lat, long]);


  return (
    <div>
      <input ref={cityInput} type="text" id="name" placeholder="Add city..." className="search-input"></input>
      <button className="add-btn" onClick={getWeatherFromAPI}>Add</button>
      <p>Give access to your location or add city</p>
      {isLoading && <p>Loading ...</p>}
      <div className="card-container">
      {!isLoading &&  data.map((item, idx) => <Widget key={idx} {...item}/>)}
      </div>
    </div>
  )
}

export default Forecast;
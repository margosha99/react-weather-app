import React, { useState, useEffect } from 'react';
import Widget from './widgetComponent';
import './widgetStyle.css';


const Forecast = () => {

    const [data, setData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [city, setCity] = useState([])
    let cityInput = React.createRef();

    let api_key = 'b8c1c561e8a3dd26d296ab733704b977';
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=metric&exclude=daily&appid=${api_key}`
    let apiLondon = `http://api.openweathermap.org/data/2.5/weather?q=london&appid=${api_key}`;

    const apiGet = async () => {
      console.log(cityInput.current.value);
        const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput.current.value}&exclude=current&units=metric&appid=${api_key}`)
        const response = await data.json()
        console.log(response)
        setLoaded(true)
        setData([response])
        console.log(cityInput.current);
        setCity(cityValue => [...cityValue, cityInput.current.value])
        // cityInput.current = null
         //console.log(data)    
        setLoaded(false);
      };
      
    
      return (
        <div>
          My API <br />
          <input ref={cityInput} type="text" id="name" placeholder="add city"></input>
          <button onClick={apiGet}>Fetch API</button>
          {
              isLoaded ? (
                city.map(item => (
                    <div key={item}>
                    
                    <Widget
                    idValue={data.id}
                    cityName={item}
                    //region={}
                    // description={}
                    // dateTime = {data.dt}
                    // temp={data.main.temp}
                    // feels_like={data.main.feels_like}
                    // wind = {data.wind.speed}
                    // humidity = {data.main.humidity}
                    // pressure={data.main.pressure}
                     />
                     </div>
                ))
                
              ) : ( 
                  <p>Loading...</p>
              )
          }
        </div>
      );

}

export default Forecast;
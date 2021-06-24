import React, { Component } from 'react';
import './widgetStyle.css'

function Widget( {cityName, idValue, region, description, dateTime, 
    temp, feels_like, wind, humidity, pressure, weather }) { 

    let today = dateTime*1000;
        //   let time_to_show = data.hourly[1].dt; 

        // let t = new Date(time_to_show * 1000);
        // let formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
            // console.log(formatted);
    return (
        
        <div>
            <h1>Widget</h1>
            <span>{cityName}, {idValue}</span>

            <div className="card">
            <div className="card-date">
                <div className="card-location">
                    <p>{cityName}, {region} </p>
                    <span>{dateTime*1000}</span>
                </div>
                <div className="card-icon">
                    <img src="" alt=""></img>
                    <span>{description}</span>
                </div>
            </div>
            <div className="card-chart">

            </div>
            <div className="card-weather">
                <div className="card-temp">
                    {
                        temp > 0 ? (
                            <span>+{temp}</span>
                        ) : (
                            <span>-{temp}</span>
                        )
                    }
                    <span>Feels like: {feels_like} C</span>
                </div>
                <div className="card-data">
                    <p>Wind: <span> {wind} m/s</span></p>
                    <p>Humidity: <span> {humidity} %</span></p>
                    <p>Pressure:<span> {pressure} Pa</span> </p>
                </div>
            </div>
          </div>

        </div>
    )

}

export default Widget;
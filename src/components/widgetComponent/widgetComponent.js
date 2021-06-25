import React from 'react'
import './widgetStyle.css'
import Chart from 'react-apexcharts'

function Widget({
    current,
    timezone,
    hourly
}) {
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let t = new Date(current.dt * 1000);
    let day = weekDay[t.getDay()];
    let date = t.getDay();
    let month = monthArr[t.getMonth()];
    let time = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);

    let timeArr = hourly.reduce(function(arr,item ) {
        let timeValue = new Date(item.dt * 1000);
        arr.push(('0' + timeValue.getHours()).slice(-2) + ':' + ('0' + timeValue.getMinutes()).slice(-2))
        return arr;
    },[]);

    let tempArr = hourly.reduce(function(arr, item){
        let tempValue = Math.round(item.temp);
        arr.push(tempValue);
        return arr;
    },[])

    let options ={
        chart: {
            id: 'example',
            zoom: {
                enabled: false
            },
            toolbar: { tools: { download: false } }
        },
        xaxis: {
            categories: [...timeArr.splice(0,8)]//time 15:10
        },
        
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        tooltip: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false
        },
        colors: current.temp > 0 ? ['#ffdad4', '#E91E63'] : ['#d1dfff', '#E91E63']
    }
    let series = [{
            name: 'series-1',
            data: [...tempArr.splice(0,8)]
    }]
    

    return(
        <div className="card">
        <div className="card-date">
            <div className="card-location">
                <p>{timezone}</p>
                <span>{day}, {date} {month}, {time}</span>
            </div>
            <div className="card-icon">
                <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt=""></img>
                <span>{current.weather[0].main}</span>
            </div>
        </div>
        <div className="card-chart">
            <Chart options={options} series={series} type="area" width={380} height={160} />
        </div>
        <div className="card-weather">
            <div className="card-temp">
                {Math.round(current.temp) > 0 ? (
                    <span>+{Math.round(current.temp)}</span>
                ) : (
                    <span>-{Math.round(current.temp)}</span>
                )}
                <span>Feels like: {Math.round(current.feels_like)} C</span>
            </div>
            <div className="card-data">
                <p>Wind: <span> {current.wind_speed} m/s</span></p> 
                <p>Humidity: <span> {current.humidity} %</span></p>
                <p>Pressure:<span> {current.pressure} Pa</span> </p>
            </div>
        </div>
    </div>
    )
}

export default Widget;
import React from 'react'
import s from '../styles/CurrentWeatherCard.module.css'
import { ICurrentWeather } from '../interfaces/interfaceCurrnetWeather'
import capitalize from '../helpers/capitalize'
import { degToCompass } from '../helpers/windDegConverter'

const CurrentWeatherCard: React.FC<ICurrentWeather> = ({dt, main, sys, weather, wind}) => {
    const currentTime = new Date(dt! * 1000).toLocaleTimeString()
    const mainTemp = Math.round(main!?.temp)
    const description = capitalize(weather![0].description);
    const feelsLike = Math.round(main!?.feels_like);
    const humidity = Math.round(main!?.humidity);
    const pressure = Math.round(main!?.pressure);
    const sunrise = new Date(sys!?.sunrise * 1000).toLocaleTimeString().slice(0,5);
    const sunset = new Date(sys!?.sunset * 1000).toLocaleTimeString().slice(0,5);
    const windSpeed = Math.round(wind.speed)
    const windDirection = degToCompass(wind.deg)
    const windGust = Math.round(wind.gust)
    return (
        <div className={s.container}>
            <div className={s.item}>
                <div>Current weather: {currentTime}</div>
                <div className={s.mainTemp}>{mainTemp}°C</div>
                <img src={`../icons/${weather![0].icon}.png`} />
                <div>{description}</div>
            </div>
            <div className={s.item}>
                <div>Sunrise: {sunrise}</div>
                <img src='../icons/sunrise.png'/>
                <div>Feels like: {feelsLike}°C</div>
                <div>Humidity: {humidity}%</div>
                <div>Pressure: {pressure} mm</div>
            </div>
            <div className={s.item}>
                <div>Sunset: {sunset}</div>
                <img src='../icons/sunset.png'/>
                <div>wind speed: {windSpeed} m/sec</div>
                <div>wind direction: {windDirection}</div>
                <div>wind gust: {windGust} m/sec</div>
            </div>
        </div>
    )
}

export default CurrentWeatherCard
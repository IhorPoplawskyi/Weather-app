import React from 'react'
import s from '../styles/CurrentWeatherCard.module.css'
import { CurrentWeather } from '../interfaces/interfaceCurrnetWeather'
import capitalize from '../helpers/capitalize'

const CurrentWeatherCard: React.FC<CurrentWeather> = ({dt, main, name, sys, timezone, visibility, weather, wind}) => {
    const currentTime = new Date(dt! * 1000).toLocaleTimeString()
    const mainTemp = Math.round(main!?.temp)
    const description = capitalize(weather![0].description);
    const feelsLike = Math.round(main!?.feels_like);
    const humidity = Math.round(main!?.humidity);
    const pressure = Math.round(main!?.pressure);
    return (
        <div className={s.container}>
            <div className={s.item}>
                <div>Станом на: {currentTime}</div>
                <div className={s.mainTemp}>{mainTemp}°C</div>
                <img src={`../icons/${weather![0].icon}.png`} />
                <div>{description}</div>
            </div>
            <div className={s.item}>
                <div>Feels like: {feelsLike}°C</div>
                <div>Humidity: {humidity}%</div>
                <div>Pressure: {pressure} mm</div>
            </div>
        </div>
    )
}

export default CurrentWeatherCard
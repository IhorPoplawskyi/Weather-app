import s from '../styles/CurrentWeatherCard.module.css'

import { FC } from 'react'

import { useAppSelector } from '../redux/store'

import { degToCompass, capitalize} from '../helpers'


export const CurrentWeatherCard: FC = (): JSX.Element => {
    const state = useAppSelector(state => state.forecastSlice.currentWeather)
    
    return (
        <div className={s.container}>
            <div className={s.item}>
                <div>{state?.name} {new Date(state!.dt! * 1000).toLocaleTimeString().slice(0,5)}</div>
                <div className={s.mainTemp}>{Math.round(state!.main!?.temp)}°C</div>
                <img alt='icon' src={`../icons/${state!.weather![0].icon}.png`} />
                <div>{capitalize(state!.weather![0].description)}</div>
            </div>
            <div className={s.item}>
                <div>Sunrise: {new Date(state!.sys!?.sunrise * 1000).toLocaleTimeString().slice(0,5)}</div>
                <img alt='sunrise' src='../icons/sunrise.png'/>
                <div>Feels like: {Math.round(state!.main!?.feels_like)}°C</div>
                <div>Humidity: {Math.round(state!.main!?.humidity)}%</div>
                <div>Pressure: {Math.round(state!.main!?.pressure)} mm</div>
            </div>
            <div className={s.item}>
                <div>Sunset: {new Date(state!.sys!?.sunset * 1000).toLocaleTimeString().slice(0,5)}</div>
                <img alt='sunset' src='../icons/sunset.png'/>
                <div>wind speed: {Math.round(state!.wind!.speed)} m/sec</div>
                <div>wind direction: {degToCompass(state!.wind!.deg)}</div>
                {state!.wind!.gust && <div>wind gust: {Math.round(state!.wind!.gust)} m/sec</div>}
            </div>
        </div>
    )
}
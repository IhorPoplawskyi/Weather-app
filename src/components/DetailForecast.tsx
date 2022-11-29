import React from "react";
import { useAppSelector } from "../redux/store";
import s from '../styles/DetailForecast.module.css'

const DetailForecast: React.FC = () => {
    const details = useAppSelector(state => state.forecastSlice.detailForecast)
    return (
        <div className={s.hourlyForecastContainer}>
            <div className={s.hourlyForecastContainerInfo}>
                <div className={s.hourlyForecastContainerInfoItem1}>
                    <div>{new Date(details![0].dt * 1000).toLocaleDateString()}</div>
                    <img src={`../icons/${details![0].weather[0].icon}.png`} />
                    <div>{Math.round(details![0].main.temp)}°C</div>
                </div>
                <div className={s.hourlyForecastContainerInfoItem2}>
                    <div className={s.itemOfInfoItem}>temp</div>
                    <div className={s.itemOfInfoItem}>feels like</div>
                    <div className={s.itemOfInfoItem}>pressure</div>
                    <div className={s.itemOfInfoItem}>humidity</div>
                    <div className={s.itemOfInfoItem}>wind</div>
                    <div className={s.itemOfInfoItem}>visibility</div>
                </div>
            </div>
            {details?.map(el => {
                const time = new Date(el.dt * 1000).toLocaleTimeString().slice(0, 5);
                return (
                    <div key={el.dt} className={s.hourlyForecastContainerItem}>
                        {time}
                        <img src={`../icons/${el.weather[0].icon}.png`} />
                        <div className={s.itemsOfContainerItem}>{Math.round(el.main.temp)}°C</div>
                        <div className={s.itemsOfContainerItem}>{Math.round(el.main.feels_like)}°C</div>
                        <div className={s.itemsOfContainerItem}>{el.main.pressure} mm</div>
                        <div className={s.itemsOfContainerItem}>{Math.round(el.main.humidity)}%</div>
                        <div className={s.itemsOfContainerItem}>{Math.round(el.wind.speed)} m/sec</div>
                        <div className={s.itemsOfContainerItem}>{el.visibility}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default DetailForecast;
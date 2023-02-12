import s from '../styles/DetailForecast.module.css'

import { FC } from "react";

import { useAppSelector } from "../redux/store";

export const DetailForecast: FC = (): JSX.Element => {
    const details = useAppSelector(state => state.forecastSlice.detailForecast)
    return (
        <div className={s.container}>
            <div className={s.containerInfo}>
                <div className={s.containerInfoItem1}>
                    <div>{new Date(details![0].dt * 1000).toLocaleDateString()}</div>
                    <img src={`../icons/${details![3] ? details![3].weather[0].icon : details![0].weather[0].icon}.png`} />
                    <div>{Math.round(details![0].main.temp)}°C</div>
                </div>
                <div className={s.containerInfoItem2}>
                    <div className={s.itemOfInfoItem}>temp</div>
                    <div className={s.itemOfInfoItem}>f.like</div>
                    <div className={s.itemOfInfoItem}>press.</div>
                    <div className={s.itemOfInfoItem}>humid.</div>
                    <div className={s.itemOfInfoItem}>wind</div>
                    <div className={s.itemOfInfoItem}>visib.</div>
                </div>
            </div>
            {details?.map(el => {
                const time = new Date(el.dt * 1000).toLocaleTimeString().slice(0, 5);
                return (
                    <div key={el.dt} className={s.containerItem}>
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
import React from "react";
import { IListItem } from "../interfaces/interfaceFiveDaysForecast";
import s from '../styles/DetailForecast.module.css'

interface props {
    details: IListItem[] | undefined
}

const DetailForecast: React.FC<props> = ({details}) => {
    return (
        <div className={s.hourlyForecastContainer}>
            <div className={s.hourlyForecastContainerInfo}>
                <div>{new Date(details![0].dt * 1000).toLocaleDateString()}</div>
                <img src={`../icons/${details![0].weather[0].icon}.png`}/>
                <div>{Math.round(details![0].main.temp)}°C</div>
            </div>
            {details?.map(el => {
                const time = new Date(el.dt*1000).toLocaleTimeString().slice(0,5);
                return (
                    <div key={el.dt} className={s.hourlyForecastContainerItem}>
                        {time}
                        <img src={`../icons/${el.weather[0].icon}.png`}/>
                    </div>
                )
            })}
        </div>
    )
}

export default DetailForecast;
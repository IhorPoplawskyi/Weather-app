import React from "react";
import { IFiveDaysForecast } from '../interfaces/interfaceFiveDaysForecast'
import s from '../styles/FiveDaysForecast.module.css'

interface props {
  fiveDaysForecast: IFiveDaysForecast | null
}

const FiveDaysForecast: React.FC<props> = ({ fiveDaysForecast }) => {
  const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentDayOfMonth = new Date().getDate()
  const forecastByDays = [];
  for (let i = 0; i < 6; i++) {
    forecastByDays.push(fiveDaysForecast?.list.filter(el => new Date(el.dt * 1000).getDate() === currentDayOfMonth + i))
  }

  return (
    <div className={s.container}>
      {forecastByDays.map(el => {
        let dates = el?.map(el => el.dt * 1000)
        
        return (
          <div className={s.item}>
            <div>{weekday[new Date(dates![0]).getDay()]}</div>
            <div>{new Date(dates![0]).getDate()}</div>
            <div>{month[new Date(dates![0]).getMonth()]}</div>
            <img src={`../icons/${el![0].weather[0].icon}.png`}/>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )
      })}
    </div>
  )
}

export default FiveDaysForecast
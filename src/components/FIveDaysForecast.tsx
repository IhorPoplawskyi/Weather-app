import React, { useState } from "react";
import { IFiveDaysForecast, IListItem } from '../interfaces/interfaceFiveDaysForecast'
import s from '../styles/FiveDaysForecast.module.css'
import DetailForecast from "./DetailForecast";

interface props {
  fiveDaysForecast: IFiveDaysForecast | null
}

const FiveDaysForecast: React.FC<props> = ({ fiveDaysForecast }) => {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDayOfMonth = new Date().getDate()
  const forecastByDays = [];
  for (let i = 0; i < 6; i++) {
    forecastByDays.push(fiveDaysForecast?.list.filter(el => new Date(el.dt * 1000).getDate() === currentDayOfMonth + i))
  }
  const [details, setDetails] = useState<IListItem[] | undefined>(); 
  if (!details) setDetails(forecastByDays[0])
  const [active, setActive] = useState<number>(forecastByDays![0]![0].dt);

  return (
    <>
      <div className={s.container}>
        {forecastByDays.map(el => {
          let dates = el?.map(el => el.dt * 1000);

          return (
            <div onClick={() => {setDetails(el); setActive(el![0].dt)} } key={el![0].dt} className={active === el![0].dt ? s.itemActive : s.item}>
              <div>{weekday[new Date(dates![0]).getDay()]}</div>
              <div>{new Date(dates![0]).getDate()}</div>
              <div>{month[new Date(dates![0]).getMonth()]}</div>
              <img src={`../icons/${el![0].weather[0].icon}.png`} />
              <div className={s.MinMax}>
                <div className={s.itemMinMax}>min</div>
                <div>max</div>
              </div>
              <div className={s.MinMax}>
                <div className={s.itemMinMax}>{el?.map(el => Math.round(el.main.temp_min))[0]}°C</div>
                <div>{el?.map(el => Math.round(el.main.temp_max))[0]}°C</div>
              </div>
            </div>
          )
        })}
      </div>
      <DetailForecast details={details}/>
    </>
  )
}

export default FiveDaysForecast
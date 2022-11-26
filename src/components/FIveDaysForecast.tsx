import React, { useEffect, useState } from "react";
import { IFiveDaysForecast, IListItem } from '../interfaces/interfaceFiveDaysForecast'
import s from '../styles/FiveDaysForecast.module.css'
import DetailForecast from "./DetailForecast";

interface props {
  fiveDaysForecast: IFiveDaysForecast | null
}

const FiveDaysForecast: React.FC<props> = ({ fiveDaysForecast }) => {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDayOfMonth = new Date().getTime()
  const [forecast, setForecast] = useState<IListItem[][]>([]);
  const [active, setActive] = useState<number>();
  const days = (index: number) => {
    return fiveDaysForecast!?.list.filter(el => new Date(el.dt * 1000).toDateString() === new Date(currentDayOfMonth + (index * 86400000)).toDateString())
  }
  useEffect(() => {
    setForecast([days(0), days(1), days(2), days(3), days(4), days(5)])
  }, [fiveDaysForecast])
  useEffect(() => {
    setActive(fiveDaysForecast?.list[0].dt)
  }, [forecast])

  return (
    <>
      <div className={s.container}>
        {forecast.map(el => {
          let dates = el?.map(el => el.dt * 1000);
          return (
            <div onClick={() => setActive(el![0].dt)} key={el![0].dt} className={active === el![0].dt ? s.itemActive : s.item}>
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
      {/* {<DetailForecast details={details}/>} */}
    </>
  )
}

export default FiveDaysForecast
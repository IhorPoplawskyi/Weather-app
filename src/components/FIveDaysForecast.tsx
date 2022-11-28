import React, { useEffect, useState } from "react";
import { weekday, month, currentDayOfMonth } from "../helpers/data";
import { IFiveDaysForecast, IListItem } from '../interfaces/interfaceFiveDaysForecast'
import { setDetailForecast } from "../redux/forecastSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import s from '../styles/FiveDaysForecast.module.css'

const FiveDaysForecast: React.FC = () => {
  const dispatch = useAppDispatch()
  const [active, setActive] = useState<number>();
  const forecastByDays = useAppSelector(state => state.forecastSlice.forecastByDays)

  useEffect(() => {
    setActive(forecastByDays![0][0].dt)
  }, [])

  return (
    <>
      <div className={s.container}>
        {forecastByDays!.map(el => {
          let dates = el?.map(el => el.dt * 1000);
          return (
            <div onClick={() => {setActive(el![0].dt); dispatch(setDetailForecast(el))}} key={el![0].dt} className={active === el![0].dt ? s.itemActive : s.item}>
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
    </>
  )
}

export default FiveDaysForecast
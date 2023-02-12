import s from '../styles/FiveDaysForecast.module.css'

import { FC } from "react";

import { weekday, month } from "../helpers/data";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { setDetailForecast, setActiveDetail } from "../redux/forecastSlice";


export const FiveDaysForecast: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const active = useAppSelector(state => state.forecastSlice.selectedDetail)
  const forecastByDays = useAppSelector(state => state.forecastSlice.forecastByDays)

  return (
    <div className={s.container}>
      {forecastByDays!.map(el => {
        let dates = el?.map(el => el.dt * 1000);
        return (
          <div onClick={() => {
            dispatch(setDetailForecast(el))
            dispatch(setActiveDetail(el[0].dt))
          }} key={el![0].dt} className={active === el![0].dt ? s.itemActive : s.item}>
            <div>{weekday[new Date(dates![0]).getDay()]}</div>
            <div>{new Date(dates![0]).getDate()}</div>
            <div>{month[new Date(dates![0]).getMonth()]}</div>
            <img src={`../icons/${el![3] ? el![3].weather[0].icon : el![0].weather[0].icon}.png`} />
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
  )
}
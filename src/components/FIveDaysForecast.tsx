import React from "react";
import { IFiveDaysForecast } from '../interfaces/interfaceFiveDaysForecast'
import s from '../styles/FiveDaysForecast.module.css'

interface props {
  fiveDaysForecast: IFiveDaysForecast | null
}

const FiveDaysForecast: React.FC<props> = ({ fiveDaysForecast }) => {
  return (
    <div className={s.container}>
      {fiveDaysForecast?.list.map(el => {
        return (
          <div className={s.item} key={el.dt}>
            <div>Date: {el.dt_txt}</div>
            <div className={s.TempMaxMin}>
              Temperature:
              <div>min {Math.round(el.main.temp_min)}°C</div>
              <div>max {Math.round(el.main.temp_max)}°C</div>
            </div>
            <div className={s.ImagePressureDescriptionBlock}>
              <div>
                <div>Pressure: {el.main.pressure} mm</div>
                <div>{el.weather.map(el => el.description)}</div>
              </div>
              <img src={`../icons/${el.weather[0].icon}.png`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FiveDaysForecast
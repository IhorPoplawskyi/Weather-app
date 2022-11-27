import React from 'react'
import { getCurrentWeatherThunk, getFiveDaysForecastThunk } from '../redux/forecastSlice'
import { useAppDispatch } from '../redux/store'
import s from '../styles/Results.module.css'

interface props {
    results: {
        name: string
        country: string
        state?: string
        lat: number
        lon: number
    }[]
}

const Results: React.FC<props> = ({ results }) => {
    const style = [s.resultsBlock]
    const dispatch = useAppDispatch();

    return (
        <div className={style.join(' ')}>
            {results.map(el =>
                <div key={el.lat}
                    onClick={() => {
                        dispatch(getCurrentWeatherThunk(el.lat, el.lon));
                        dispatch(getFiveDaysForecastThunk(el.lat, el.lon));
                    }}
                    className={s.resultsBlockItem}>
                    {`${el.name}, ${el.country} ${el.state !== undefined ? el.state : ''}`}
                </div>)}
        </div>
    )
}

export default Results
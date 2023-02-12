import s from '../styles/Results.module.css'

import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '../redux/store'
import { getCurrentWeatherThunk, getFiveDaysForecastThunk } from '../redux/thunks'

export const Results: FC = (): JSX.Element => {
    const results = useAppSelector(state => state.forecastSlice.results)
    const dispatch = useAppDispatch();

    return (
        <div className={s.resultsBlock}>
            {results?.length === 0 ? <div>nothing found!</div> :
                results!.map(el =>
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
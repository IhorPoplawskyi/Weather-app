import s from '../styles/MainPage.module.css'

import useDebounce from "../hooks/useDebounce";

import { FC, useEffect, useState } from "react"

import { currentDayOfMonth } from "../helpers/data";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { setForecastByDays, setDetailForecast, setActiveDetail } from "../redux/forecastSlice";
import { getCityThunk, getCurrentWeatherThunk, getFiveDaysForecastThunk } from "../redux/thunks";

import { Input, Preloader, Results, CurrentWeatherCard, FiveDaysForecast, DetailForecast } from './index'

export const MainPage: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const city = useAppSelector(state => state.forecastSlice.city);
    const currentWeather = useAppSelector(state => state.forecastSlice.currentWeather);
    const fiveDaysForecast = useAppSelector(state => state.forecastSlice.fiveDaysForecast);
    const forecastByDays = useAppSelector(state => state.forecastSlice.forecastByDays);
    const detailForecast = useAppSelector(state => state.forecastSlice.detailForecast);
    const isLoading = useAppSelector(state => state.forecastSlice.isLoading);
    const results = useAppSelector(state => state.forecastSlice.results);
    const [visibleResults, setVisibleResults] = useState(true);
    const [inputRef, setInputRef] = useState();
    const debouncedSearchTerm = useDebounce(city, 500);

    //debouncing users inputing letters to prevent immidiate get requests
    useEffect(() => {
        if (debouncedSearchTerm) {
            dispatch(getCityThunk(debouncedSearchTerm))
        }
    }, [debouncedSearchTerm, dispatch]);

    //function that used to filter and convert 40 responses in every 3 hours to arrays of every single day
    const days = (index: number) => fiveDaysForecast!?.list.filter(el => new Date(el.dt * 1000).toDateString() ===
        new Date(currentDayOfMonth + (index * 86400000)).toDateString())

    //set up data in cases which there are no responses for current day, without 6-th day and when we got 6 six days
    //set up detail forecast for current day 
    useEffect(() => {
        if (fiveDaysForecast !== undefined) {
            if (days(0).length === 0) {
                dispatch(setForecastByDays([days(1), days(2), days(3), days(4), days(5)]))
                dispatch(setDetailForecast(days(1)))
                dispatch(setActiveDetail(days(1)[0].dt))
            } else if (days(5).length === 0) {
                dispatch(setForecastByDays([days(0), days(1), days(2), days(3), days(4)]))
                dispatch(setDetailForecast(days(0)))
                dispatch(setActiveDetail(days(0)[0].dt))
            } else {
                dispatch(setForecastByDays([days(0), days(1), days(2), days(3), days(4), days(5)]))
                dispatch(setDetailForecast(days(0)))
                dispatch(setActiveDetail(days(0)[0].dt))
            }
        }
    }, [fiveDaysForecast, dispatch])
    //set up current weather and 5 days data with geolocation
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                dispatch(getCurrentWeatherThunk(pos.coords.latitude, pos.coords.longitude));
                dispatch(getFiveDaysForecastThunk(pos.coords.latitude, pos.coords.longitude));
            });
        }
    }, [])

    const switchResultsVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
        e.target !== inputRef ? setVisibleResults(false) : setVisibleResults(true)
    }

    return (
        <div onClick={e => switchResultsVisibility(e)} className={s.container}>
            <Input setInputRef={setInputRef} />
            {isLoading && <Preloader />}
            {results && visibleResults && <Results />}
            {currentWeather && <CurrentWeatherCard />}
            {forecastByDays && <FiveDaysForecast />}
            {detailForecast && <DetailForecast />}
        </div>
    );
}
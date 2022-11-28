import React, { useState, useEffect } from "react"
import s from '../styles/SearchCity.module.css'
import useDebounce from "../hooks/useDebounce";
import CurrentWeatherCard from "./CurrentWeatherCard";
import Results from "./Results";
import { searchCityResponse } from "../interfaces/interfaceSearchCityResponse";
import FiveDaysForecast from "./FIveDaysForecast";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { currentDayOfMonth } from "../helpers/data";
import { setForecastByDays, setDetailForecast, setActiveDetail } from "../redux/forecastSlice";
import DetailForecast from "./DetailForecast";

const SearchCity: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentWeather = useAppSelector(state => state.forecastSlice.currentWeather);
    const fiveDaysForecast = useAppSelector(state => state.forecastSlice.fiveDaysForecast);
    const forecastByDays = useAppSelector(state => state.forecastSlice.forecastByDays);
    const detailForecast = useAppSelector(state => state.forecastSlice.detailForecast);
    const [city, setCity] = useState<string>('');
    const [results, setResults] = useState<searchCityResponse[] | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [coords, setCoords] = useState<number[]>();

    const fetchCity = async (city: string) => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const data = await response.json();
        setResults(data)
    }

    const days = (index: number) => {
        return fiveDaysForecast!?.list.filter(el => new Date(el.dt * 1000).toDateString() === new Date(currentDayOfMonth + (index * 86400000)).toDateString())
    }

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
    }, [fiveDaysForecast])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords([position.coords.latitude, position.coords.longitude])
            });
        }
    }, [])

    const debouncedSearchTerm = useDebounce(city, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            fetchCity(debouncedSearchTerm).then(() => {
                setIsSearching(false);
            });
        }
    }, [debouncedSearchTerm]);

    return (
        <div className={s.container}>
            <input
                
                placeholder="enter city" className={s.input}
                value={city}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setCity(event.target.value) }}
            />
            {results && <Results results={results} />}
            {currentWeather && <CurrentWeatherCard />}
            {forecastByDays && <FiveDaysForecast />}
            {detailForecast && <DetailForecast />}
        </div>
    );
}

export default SearchCity
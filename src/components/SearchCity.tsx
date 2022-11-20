import React, { useState, useEffect } from "react"
import s from '../styles/SearchCity.module.css'
import useDebounce from "../hooks/useDebounce";
import { ICurrentWeather } from "../interfaces/interfaceCurrnetWeather";
import { IFiveDaysForecast } from "../interfaces/interfaceFiveDaysForecast";
import CurrentWeatherCard from "./CurrentWeatherCard";
import Results from "./Results";
import { searchCityResponse } from "../interfaces/interfaceSearchCityResponse";
import FiveDaysForecast from "./FIveDaysForecast";

const SearchCity: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [results, setResults] = useState<searchCityResponse[] | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null);
    const [fiveDaysForecast, setFiveDaysForecast] = useState<IFiveDaysForecast | null>(null);
    const [visibleResults, setVisibleResults] = useState<boolean>(true);

    const fetchCity = async (city: string) => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const data = await response.json();
        setResults(data)
    }

    const selectCity = async (lat: number, lon: number) => {
        const responseCurrent = await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const responseFiveDays = await fetch(`http://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const dataCurrent = await responseCurrent.json();
        const dataFiveDays = await responseFiveDays.json();
        setCurrentWeather(dataCurrent)
        setFiveDaysForecast(dataFiveDays)
        console.log(dataCurrent, dataFiveDays)
    }

    const debouncedSearchTerm = useDebounce(city, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            fetchCity(debouncedSearchTerm).then(() => {
                setIsSearching(false);
            });
        }
    }, [debouncedSearchTerm]
    );

    return (
        <div className={s.container}>
            <input
                onFocus={() => setVisibleResults(true)}
                placeholder="enter city" className={s.input}
                value={city}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setCity(event.target.value) }}
            />
            {results && visibleResults && <Results results={results} selectCity={selectCity} setVisible={setVisibleResults} />}
            {currentWeather && <CurrentWeatherCard {...currentWeather} />}
            {fiveDaysForecast && <FiveDaysForecast fiveDaysForecast={fiveDaysForecast}/> }
        </div>
    );
}

export default SearchCity
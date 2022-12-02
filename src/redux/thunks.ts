import { setIsLoading, getCurrentWeather, getFiveDaysForecast, setResults } from "./forecastSlice";
import { AppDispatch } from "./store";

export const getCityThunk = (city: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true))
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const data = await response.json();
        dispatch(setResults(data))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export const getCurrentWeatherThunk = (lat: number, lon: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true))
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const data = await response.json();
        dispatch(getCurrentWeather(data))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}

export const getFiveDaysForecastThunk = (lat: number, lon: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true))
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const data = await response.json();
        dispatch(getFiveDaysForecast(data))
        dispatch(setIsLoading(false))
    } catch (e) {
        console.log(e)
    }
}
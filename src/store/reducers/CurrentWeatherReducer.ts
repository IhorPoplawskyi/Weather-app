import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"

interface mainCWCP {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_max: number
    temp_min: number
}
interface sysCWCP {
    country: string
    sunrise: number
    sunset: number
}
interface weatherCWCP {
    main: string
    description: string
    icon: string
}

interface windCWCP {
    deg: number
    gust: number
    speed: number
}
interface CurrentWeatherCard {
    dt: number
    main: mainCWCP
    name: string
    sys: sysCWCP
    timezone: number
    visibility: number
    weather: weatherCWCP
    wind: windCWCP
}

const initState: CurrentWeatherCard = {
    dt: 0,
    main: {
        feels_like: 0,
        grnd_level: 0,
        humidity: 0,
        pressure: 0,
        sea_level: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0
    },
    name: '',
    sys: {
        country: '',
        sunrise: 0,
        sunset: 0
    },
    timezone: 0,
    visibility: 0,
    weather: {
        main: '',
        description: '',
        icon: '',
    },
    wind: {
        deg: 0,
        gust: 0,
        speed: 0,
    }
}

const CurrentWeatherReducer = createSlice({
    name: 'searchCitySliceReducer',
    initialState: initState,
    reducers: {
        setCurrentWeather(state, action) {
            state = action.payload
        }
    }
})

export const getCurrentWeather = (lat: number, lon: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lang=ua&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
        const data = await response.json();
        dispatch(CurrentWeatherReducer.actions.setCurrentWeather(data))
    } catch(e) {

    }
}



export default CurrentWeatherReducer.reducer;
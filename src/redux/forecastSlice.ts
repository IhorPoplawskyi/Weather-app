import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import { ICurrentWeather } from '../interfaces/interfaceCurrnetWeather'
import { IFiveDaysForecast, IListItem } from '../interfaces/interfaceFiveDaysForecast'

interface IinitialState {
  currentWeather: ICurrentWeather | undefined
  fiveDaysForecast: IFiveDaysForecast | undefined
  forecastByDays: IListItem[][] | undefined
  detailForecast: IListItem[] | undefined
}

export const initState: IinitialState = {
  currentWeather: undefined,
  fiveDaysForecast: undefined,
  forecastByDays: undefined,
  detailForecast: undefined
}

const forecastSlice = createSlice({
  name: 'forecastSlice',
  initialState: initState,
  reducers: {
    getCurrentWeather(state, action: PayloadAction<ICurrentWeather>) {
      state.currentWeather = action.payload
    },
    getFiveDaysForecast(state, action: PayloadAction<IFiveDaysForecast>) {
      state.fiveDaysForecast = action.payload
    },
    setForecastByDays(state, action: PayloadAction<IListItem[][]>) {
      state.forecastByDays = action.payload
    },
    setDetailForecast(state, action: PayloadAction<IListItem[]>) {
      state.detailForecast = action.payload
    }
  }
})

export const getCurrentWeatherThunk = (lat: number, lon: number) => async(dispatch: AppDispatch) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
    const data = await response.json();
    dispatch(getCurrentWeather(data))
  } catch (e)  {
    console.log(e)
  }
}

export const getFiveDaysForecastThunk = (lat: number, lon: number) => async(dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
    const data = await response.json();
    dispatch(getFiveDaysForecast(data))
  } catch (e)  {
    console.log(e)
  }
}

export const {getCurrentWeather, getFiveDaysForecast, setForecastByDays, setDetailForecast} = forecastSlice.actions
export default forecastSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import { ICurrentWeather } from '../interfaces/interfaceCurrnetWeather'

export const initState = {
  currentWeather: {}
}

const forecastSlice = createSlice({
  name: 'forecastSlice',
  initialState: initState,
  reducers: {
    getCurrentWeather(state, action: PayloadAction<ICurrentWeather>) {
      state.currentWeather = action.payload
    }
  }
})

export const getCurrentWeatherThunk = (lat: number, lon: number) => async(dispatch: AppDispatch) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=metric&appid=f7841575af92153d37ecc7de51c0eaf6`)
    const data = await response.json();
    dispatch(forecastSlice.actions.getCurrentWeather(data))
  } catch (e)  {
    console.log(e)
  }
}

export const {getCurrentWeather} = forecastSlice.actions
export default forecastSlice.reducer

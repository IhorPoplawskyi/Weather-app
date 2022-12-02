import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICurrentWeather } from '../interfaces/interfaceCurrnetWeather'
import { IFiveDaysForecast, IListItem } from '../interfaces/interfaceFiveDaysForecast'
import { searchCityResponse } from '../interfaces/interfaceSearchCityResponse'

interface IinitialState {
  city: string
  results: searchCityResponse[] | null
  currentWeather: ICurrentWeather | undefined
  fiveDaysForecast: IFiveDaysForecast | undefined
  forecastByDays: IListItem[][] | undefined
  detailForecast: IListItem[] | undefined
  selectedDetail: number | undefined
  isLoading: boolean
}

export const initState: IinitialState = {
  city: '',
  results: null,
  currentWeather: undefined,
  fiveDaysForecast: undefined,
  forecastByDays: undefined,
  detailForecast: undefined,
  selectedDetail: undefined,
  isLoading: false,
}

const forecastSlice = createSlice({
  name: 'forecastSlice',
  initialState: initState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload
    },
    setResults(state, action: PayloadAction<searchCityResponse[]>) {
      state.results = action.payload
    },
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
    },
    setActiveDetail(state, action: PayloadAction<number>) {
      state.selectedDetail = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  }
})

export const {
  setCity,
  setResults,
  getCurrentWeather,
  getFiveDaysForecast,
  setForecastByDays,
  setDetailForecast,
  setActiveDetail,
  setIsLoading,
} = forecastSlice.actions
export default forecastSlice.reducer

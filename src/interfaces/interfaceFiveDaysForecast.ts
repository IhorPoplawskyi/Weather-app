interface city {
    country: string
    name: string
    population: number
    sunrise: number
    sunset: number
}

interface main {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
}

interface weather {
    main: string
    description: string
    icon: string
}

interface wind {
    deg: number
    gust: number
    speed: number
}
export interface IListItem {
    dt: number
    dt_txt: string
    main: main
    visibility: number
    weather: weather[]
    wind: wind
}

export interface IFiveDaysForecast {
    city: city
    list: IListItem[]
}
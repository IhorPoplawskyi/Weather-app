interface main {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_max: number 
    temp_min: number
}
interface sys {
    country: string
    sunrise: number
    sunset: number
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
export interface ICurrentWeather {
    dt: number
    main: main
    name: string
    sys: sys
    timezone: number
    visibility: number
    weather: weather[]
    wind: wind
}
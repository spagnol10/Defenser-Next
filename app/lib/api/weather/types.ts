import { Coleta } from "../coleta/types"

export type Weather = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: [
      {
        id: number
        main: string
        description: string
        icon: string
      }
    ]
    rain: {
      [key: string]: number
    }
  }
}

export interface Forecast extends Omit<Coleta, "temperatura"> {
  sensacaoTermica: {
    manha: number
    tarde: number
    noite: number
  }
  temperatura: {
    manha: number
    tarde: number
    noite: number
    max: number
    min: number
  }
  probabilidadeChuva: number //probabilidade de chuva
  chuvaMedida: number //quantidade de chuva
  icone:
    | "01d"
    | "02d"
    | "03d"
    | "04d"
    | "09d"
    | "10d"
    | "11d"
    | "13d"
    | "50d"
    | "01n"
    | "02n"
    | "03n"
    | "04n"
    | "09n"
    | "10n"
    | "11n"
    | "13n"
    | "50n"
}

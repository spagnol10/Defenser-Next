import { Coleta } from "../coleta"
import { makeApiRequest } from "../makeApiRequest"
import { Forecast, Weather } from "../weather"

export const getWeather = async ({
  lat,
  lon,
}: {
  lat: number
  lon: number
}) => {
  const url = `weather/current?lat=${lat}&lon=${lon}`
  return makeApiRequest<Weather>({ method: "get", url })
}

export const getCurrentWeatherById = async ({
  id,
  data,
}: {
  id: number
  data: string
}) => {
  const url = `talhoes/${id}/weather?dateTime=${data}`
  return makeApiRequest<Coleta>({
    method: "get",
    url,
  })
}

export const getForecastById = async (id: number, days: number) => {
  const url = `talhoes/${id}/forecast?days=${days}`
  return makeApiRequest<Forecast[]>({
    method: "get",
    url,
  })
}

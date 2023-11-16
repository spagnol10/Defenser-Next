import { Forecast } from "@api/weather"
import React from "react"

type Props = {
  forecast: Forecast
}

export const ForecastExtra: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="flex gap-10 rounded-2xl bg-almostWhite-0 px-8 py-4 shadow-[0px_2px_4px_0px_rgba(177,219,206,0.40)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-gray-10">
          <p className="text-sm font-light">Possibilidade de chuva</p>
          <p className="font-semibold">
            {(forecast.probabilidadeChuva * 100).toFixed(0)}%
          </p>
        </div>
        <div className="flex flex-col gap-1 text-gray-10">
          <p className="text-sm font-light">Sensação</p>
          <p className="font-semibold">
            {Math.round(forecast.sensacaoTermica.tarde)}º C
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-gray-10">
          <p className="text-sm font-light">Umidade</p>
          <p className="font-semibold">{forecast.umidadeRelativa}%</p>
        </div>
        <div className="flex flex-col gap-1 text-gray-10">
          <p className="text-sm font-light">Velocidade do vento</p>
          <p className="font-semibold">{forecast.velVento.toFixed(2)} km/h</p>
        </div>
      </div>
    </div>
  )
}

"use client"
import { Forecast } from "@api/weather"
import { ForecastCard, ForecastExtra } from "@components/Forecast"
import React, { useState } from "react"

type Props = {
  forecast: Forecast[]
}

export const ForecastCardHolder: React.FC<Props> = ({ forecast }) => {
  const [selected, setSelected] = useState<number | undefined>(0)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 font-light">
          <h2 className="text-primary-0">Previsão do tempo</h2>
          <p className="text-sm text-gray-10">
            Informações dos próximos cinco dias.
          </p>
        </div>

        <div className="flex h-[295px] gap-4 overflow-x-scroll">
          {forecast.map((item, index) => {
            return (
              <ForecastCard
                key={item.data}
                forecast={item}
                index={index}
                selected={selected}
                setSelected={setSelected}
              />
            )
          })}
        </div>
      </div>

      {selected !== undefined && (
        <ForecastExtra forecast={forecast[selected]} />
      )}
    </div>
  )
}

import { Coleta } from "@api/coleta"
import dayjs from "dayjs"
import React from "react"

type Props = {
  forecast?: Coleta[] | Coleta
  dataFim?: string
}

export const ApplicationDetails: React.FC<Props> = ({ forecast, dataFim }) => {
  const forecastArray = Array.isArray(forecast) ? forecast : [forecast]

  return (
    <>
      <hr className="w-full border bg-[#F2F0F0]" />

      <div className="flex flex-col gap-6">
        {dataFim && (
          <div>
            <p className=" text-xs font-light text-gray-10">Fim</p>
            <p className="text-lg font-semibold text-primary-0">
              {dayjs(dataFim).format("DDD, DD MMM HH:mm")}
            </p>
          </div>
        )}

        <div>
          <p className="ml-3 text-xs font-light text-gray-10">Temperatura</p>
          <div className="flex gap-2">
            <div className="h-auto w-1 rounded-full bg-primary-40"></div>
            <div className="flex flex-col">
              <p className="text-lg text-primary-0">
                {forecastArray?.at?.(-1)?.temperatura?.toFixed(2)} ºC{" "}
                <span className="text-xs font-light text-primary-0">
                  Ideal 20ºC
                </span>
              </p>
              <p className="text-xs font-light text-primary-0">
                Min 10º C Max 30º C
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="ml-3 text-xs font-light text-gray-10">
            Velocidade do vento
          </p>
          <div className="flex gap-2">
            <div className="h-auto w-1 rounded-full bg-[#69ABC0]"></div>
            <div className="flex flex-col">
              <p className="text-lg text-primary-0">
                {forecastArray?.at?.(-1)?.velVento?.toFixed(2)} Km/h{" "}
              </p>
              <p className="text-xs font-light text-primary-0">
                Ideal: entre 3 e 10Km/h
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="ml-3 text-xs font-light text-gray-10">
            Umidade relativa do ar
          </p>
          <div className="flex gap-2">
            <div className="h-auto w-1 rounded-full bg-[#BCD28D]"></div>
            <div className="flex flex-col">
              <p className="text-lg text-primary-0">
                {forecastArray?.at?.(-1)?.umidadeRelativa} %{" "}
                <span className="text-xs font-light text-primary-0">
                  Ideal entre 70% e 90%
                </span>
              </p>
              <p className="text-xs font-light text-primary-0">
                Min 60% Max 95%
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-light text-primary-0">Chuva</p>
          <p className="text-lg text-primary-0">
            {forecastArray?.at?.(-1)?.chuva ? "Sim" : "Não"}{" "}
          </p>
          <p className="text-xs font-light text-primary-0">
            Não é recomendado coletar amostras quando está chovendo.
          </p>
        </div>
      </div>
    </>
  )
}

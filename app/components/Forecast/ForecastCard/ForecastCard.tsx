"use client"
import { Forecast } from "@api/weather"
import { Icon } from "@components/Icon"
import clsx from "clsx"
import dayjs from "dayjs"
import * as ptbr from "dayjs/locale/pt-br"
import isToday from "dayjs/plugin/isToday"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { weatherIcons } from "../weatherIcons"
type Props = {
  forecast: Forecast
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>
  selected?: number
  index: number
}
dayjs.locale(ptbr)
dayjs.extend(isToday)

export const ForecastCard: React.FC<Props> = ({
  forecast,
  index,
  selected,
  setSelected,
}) => {
  const [isToday, setIsToday] = useState(false)
  const [isTomorrow, setIsTomorrow] = useState(false)

  useEffect(() => {
    setIsToday(dayjs(forecast.data).isToday())
    setIsTomorrow(dayjs(forecast.data).subtract(1, "day").isToday())
  }, [forecast.data])

  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      className={clsx(
        "flex h-[290px] min-w-[140px] flex-col items-center gap-4 rounded-3xl px-6 py-4",
        selected === index &&
          "bg-almostWhite-0 shadow-[0px_2px_4px_0px_rgba(177,219,206,0.40)]"
      )}
      onClick={() => {
        if (selected === index) {
          setSelected(undefined)
          return
        }
        ref?.current?.scrollIntoView({
          behavior: "smooth",
          inline: "end",
        })
        setSelected(index)
      }}
      ref={ref}
    >
      <div className="flex flex-col gap-1 text-gray-10">
        {isToday && <p className="text-center font-semibold">Hoje</p>}
        {isTomorrow && <p className="text-center font-semibold">Amanhã</p>}
        <h3
          className={clsx(
            "flex flex-col gap-4",
            !isToday && !isTomorrow && "mt-7"
          )}
        >
          {dayjs(forecast.data).format("ddd, DD MMM")}
        </h3>
      </div>
      <Image
        src={weatherIcons[forecast.icone]}
        alt={"icone de clima"}
        width={48}
        height={48}
        quality={100}
      />
      <p>
        <span className="text-2xl font-semibold text-primary-0">
          {Math.round(forecast.temperatura.max)}º
        </span>
        <span className="font-semibold text-gray-10 ">
          /{Math.round(forecast.temperatura.min)}º
        </span>
      </p>
      <p className="text-center text-gray-10">{forecast.descricao}</p>
      <div className="flex h-full items-end">
        {selected === index ? <Icon name={"expand_more"} /> : null}
      </div>
    </div>
  )
}

"use client"

import { Popover } from "@radixStyled/Popover"
import clsx from "clsx"
import { format, isValid, parse, setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale"
import React, { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form"
import { Icon } from "../../Icon"

setDefaultOptions({ locale: ptBR })

type Props<T extends FieldValues> = {
  label?: string
  type?: string
  placeholder: string
  name: Path<T>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  rules?: RegisterOptions
  control: Control<T | any>
  readOnly?: boolean
  autoComplete?: string
  minDate?: Date
}

export const DatePicker = React.forwardRef(
  <T extends FieldValues>(
    { label, placeholder, className, rules, name, control, minDate }: Props<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState<any>("")

    const {
      field: { onChange, onBlur, value },
      fieldState: { invalid },
      formState: { errors },
    } = useController({ name, control, rules })

    useEffect(() => {
      if (value) {
        setInputValue(format(value, "dd/MM/yyyy"))
      }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)

      const date = parse(e.currentTarget.value, "dd/MM/yyyy", new Date())
      if (isValid(date)) {
        onChange(date)
      } else {
        onChange(null)
      }
    }

    const handleDaySelect = (date?: Date) => {
      onChange(date)
      if (date) {
        setInputValue(format(date, "dd/MM/yyyy"))
      } else {
        setInputValue("")
      }
    }

    return (
      <div className={className}>
        <div className="flex flex-col">
          {label && (
            <label className="mb-2 text-lg font-bold text-gray-10">
              {label}
            </label>
          )}

          <div className="relative flex items-center ">
            <Icon
              name="calendar_today"
              className="absolute mb-2 text-gray-10 "
            />
            <input
              ref={ref}
              className={clsx(
                "apearance-none mb-2 h-[45px] w-full border-b-2 border-gray-30 text-center focus:outline-none",
                {
                  "border-red-500 text-red-500 placeholder:text-red-500":
                    invalid,
                  "placeholder:mb-4 placeholder:text-lg placeholder:text-gray-10":
                    placeholder,
                },
                className
              )}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={onBlur}
              onClick={() => {
                setOpen(!open)
              }}
            />
          </div>

          <div>
            {errors && (
              <span className="text-sm text-red-500">
                {errors[name]?.message as string}
              </span>
            )}
          </div>
        </div>

        <Popover open={open} setOpen={setOpen}>
          <DayPicker
            fromDate={minDate}
            initialFocus={open}
            mode="single"
            selected={value}
            locale={ptBR}
            onSelect={handleDaySelect}
            onDayClick={() => {
              setOpen(false)
            }}
          />
        </Popover>
      </div>
    )
  }
)

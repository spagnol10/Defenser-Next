"use client"
import * as SwitchRoot from "@radix-ui/react-switch";
import clsx from "clsx";
import React from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label?: string
  type?: string
  name: Path<T>
  className?: string
  rules?: RegisterOptions
  control?: Control<T | any>
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  customOnChange?: (e: React.ChangeEvent<HTMLButtonElement>) => void
  propValue?: boolean
}

export const Switch = React.forwardRef(
  <T extends FieldValues>(
    { label, className, rules, name, control, onClick, propValue }: Props<T>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      field: { onChange, onBlur, value },
    } = useController({ name, control, rules })

    return (
      <div className="flex items-center gap-2">
        <SwitchRoot.Root
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          checked={value || propValue || false}
          onClick={onClick}
          className={clsx(
            "group",
            "rdx-state-checked:bg-primary-40",
            "rdx-state-unchecked:bg-gray-30",
            "relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
            "focus:outline-none focus-visible:ring focus-visible:ring-primary-40 focus-visible:ring-opacity-75",
            className
          )}
        >
          <SwitchRoot.Thumb
            className={clsx(
              "group-rdx-state-checked:translate-x-5",
              "group-rdx-state-unchecked:translate-x-0",
              "pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            )}
          />
        </SwitchRoot.Root>
        <label className="font-semibold text-primary-0">{label}</label>
      </div>
    )
  }
)

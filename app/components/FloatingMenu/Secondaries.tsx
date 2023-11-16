import clsx from "clsx"
import { Button } from "../Button"
import { Icon } from "../Icon"

const secondaryButtons = [
  {
    icon: "diversity_2",
  },
  {
    icon: "grass",
  },
  {
    icon: "clear_all",
  },
]

export const Secondaries = () => {
  return (
    <>
      {secondaryButtons.map((button, index) => (
        <Button
          key={index}
          variant="primary"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full border border-primary-30 bg-primary-60"
          )}
        >
          <Icon className="text-xs text-primary-0" name={button.icon} />
        </Button>
      ))}
    </>
  )
}

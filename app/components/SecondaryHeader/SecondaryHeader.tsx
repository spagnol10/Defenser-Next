import clsx from "clsx"

type Props = {
  title: string
  subtitle?: string
  usePadding?: boolean
}

export const SecondaryHeader = ({ subtitle, title, usePadding }: Props) => {
  return (
    <div className={clsx(usePadding && "px-6")}>
      <p className="text-xl font-light text-primary-0">{title}</p>
      <p className="text-sm font-light text-gray-10">{subtitle}</p>
    </div>
  )
}

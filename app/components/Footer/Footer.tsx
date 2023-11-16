"use client"
import { useLayoutContext } from "@context/LayoutContext"
import { usePathname } from "next/navigation"
import { Links } from "./Links"
const pages = ["/login", "/403", "/404"]

const showFooter = (path: string) => {
  return !pages.some((page) => path.includes(page))
}

export const Footer = () => {
  const { showNewUser } = useLayoutContext()
  const pathname = usePathname()

  if (!showFooter(pathname) || showNewUser) {
    return null
  }

  return (
    <nav className="sticky bottom-0 flex w-full items-center justify-around border-2 border-t-[#F6F6F6] bg-white pb-6 pt-3">
      <Links />
    </nav>
  )
}

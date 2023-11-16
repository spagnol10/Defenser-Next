"use client"
import { useUserContext } from "@context/userContext"
import { usePathname } from "next/navigation"
import React from "react"
import { BackHeader } from "./BackHeader"
import { MenuHeader } from "./MenuHeader"
const pages = ["/login", "/403", "/404"]

const showHeader = (path: string) => {
  return !pages.some((page) => path.includes(page))
}

export const Header: React.FC<{ isMenu?: boolean }> = () => {
  const { userCtx } = useUserContext()
  const pathname = usePathname()
  const isMenu = pathname === "/menu"

  if (!showHeader(pathname)) return null

  return (
    <>
      {isMenu ? (
        <MenuHeader user={userCtx?.usuario} />
      ) : (
        <BackHeader pathname={pathname} />
      )}
    </>
  )
}

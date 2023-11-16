"use client"
import { InstallPWA } from "./InstallPwa"

export const InstallPwaBoundary = () => {
  if (typeof window === "undefined") return null

  return <InstallPWA />
}

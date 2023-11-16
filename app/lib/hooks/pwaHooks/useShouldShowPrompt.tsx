"use client"
import { useState } from "react"

import dayjs from "dayjs"

const getInstallPromptLastSeenAt = (promptName: string): string =>
  localStorage?.getItem(promptName) ?? ""

const setInstallPromptSeenToday = (promptName: string): void => {
  const today = dayjs().toISOString()
  localStorage.setItem(promptName, today)
}

function getUserShouldBePromptedToInstall(
  promptName: string,
  daysToWaitBeforePromptingAgain: number
): boolean {
  const lastPrompt = dayjs(getInstallPromptLastSeenAt(promptName))
  const daysSinceLastPrompt = dayjs().diff(lastPrompt, "days")
  return (
    isNaN(daysSinceLastPrompt) ||
    daysSinceLastPrompt > daysToWaitBeforePromptingAgain
  )
}

const useShouldShowPrompt = (
  promptName: string,
  daysToWaitBeforePromptingAgain = 5
): [boolean, () => void] => {
  const [userShouldBePromptedToInstall, setUserShouldBePromptedToInstall] =
    useState(
      getUserShouldBePromptedToInstall(
        promptName,
        daysToWaitBeforePromptingAgain
      )
    )

  const handleUserSeeingInstallPrompt = () => {
    setUserShouldBePromptedToInstall(false)
    setInstallPromptSeenToday(promptName)
  }

  return [userShouldBePromptedToInstall, handleUserSeeingInstallPrompt]
}
export default useShouldShowPrompt

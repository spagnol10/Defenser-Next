"use client"
import { useEffect, useState } from "react"

import BeforeInstallPromptEvent from "./BeforeInstallPromptType"
import useShouldShowPrompt from "./useShouldShowPrompt"

const webInstallPromptedAt = "webInstallPromptedAt"
const useWebInstallPrompt = (): [any, () => void, () => void] => {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent>()
  const [userShouldBePromptedToInstall, handleUserSeeingInstallPrompt] =
    useShouldShowPrompt(webInstallPromptedAt)

  useEffect(() => {
    const beforeInstallPromptHandler = (event: BeforeInstallPromptEvent) => {
      event.preventDefault()

      // check if user has already been asked
      if (userShouldBePromptedToInstall) {
        // store the event for later use
        setInstallPromptEvent(event)
      }
    }
    window.addEventListener(
      "beforeinstallprompt",
      beforeInstallPromptHandler as EventListener
    )
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler as EventListener
      )
  }, [userShouldBePromptedToInstall])

  const handleInstallDeclined = () => {
    handleUserSeeingInstallPrompt()
    setInstallPromptEvent(undefined)
  }

  const handleInstallAccepted = () => {
    // show native prompt
    installPromptEvent?.prompt()

    // decide what to do after the user chooses
    installPromptEvent?.userChoice.then((choice) => {
      // if the user declined, we don't want to show the prompt again
      if (choice.outcome !== "accepted") {
        handleUserSeeingInstallPrompt()
      }
      setInstallPromptEvent(undefined)
    })
  }
  return [installPromptEvent, handleInstallDeclined, handleInstallAccepted]
}
export default useWebInstallPrompt

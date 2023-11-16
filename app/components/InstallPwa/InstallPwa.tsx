import useIosInstallPrompt from "@hooks/pwaHooks/useIosInstallPrompt"
import useWebInstallPrompt from "@hooks/pwaHooks/useWebInstallPrompt"
import useWebview from "@hooks/pwaHooks/useWebview"
import { Button } from "../Button"
import { Icon } from "../Icon"

export const InstallPWA = () => {
  const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt()
  const [webInstallPrompt, handleWebInstallDeclined, handleWebInstallAccepted] =
    useWebInstallPrompt()
  const { isOnWebview } = useWebview()

  if ((!iosInstallPrompt && !webInstallPrompt) || isOnWebview) return null

  if (webInstallPrompt) {
    return (
      <div className="absolute bottom-5 z-50 m-4 flex w-[calc(100vw-32px)] items-center justify-between rounded-md bg-primary-0 p-4 text-almostWhite-0">
        <div>
          <p>Instalar aplicativo</p>
        </div>
        <div className="flex items-center gap-4 ">
          <Button onClick={handleWebInstallAccepted} variant="text">
            <Icon className="text-almostWhite-0" name="file_download" />
          </Button>
          <Button onClick={handleWebInstallDeclined} variant="text">
            <Icon className="text-almostWhite-0" name="close" />
          </Button>
        </div>
      </div>
    )
  }

  if (iosInstallPrompt) {
    return (
      <div className="absolute bottom-5 z-50 m-4 flex w-[calc(100vw-32px)] items-center justify-between rounded-md bg-primary-0 p-4 text-almostWhite-0 ">
        <div className="flex flex-col gap-2">
          <p>Para instalar aplicativo: </p>

          <div className="ml-2 flex items-center gap-2">
            <p>Clique em</p>
            <Icon
              className="rotate-[270deg] text-almostWhite-0"
              name="output"
            />
            <p>e adicione à tela inicial</p>
          </div>
        </div>

        <Button
          className="text-almostWhite-0"
          variant="text"
          onClick={handleIOSInstallDeclined}
        >
          <Icon className="text-almostWhite-0" name="close" />
        </Button>
      </div>
    )
  }
  return null
}

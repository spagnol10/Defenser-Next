import { IUser } from "@api/auth"
import { useUserContext } from "@context/userContext"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Icon } from "../Icon"

export const BackHeader: React.FC<{ pathname: string }> = ({ pathname }) => {
  const router = useRouter()
  const { userCtx } = useUserContext()

  const [usr, setUser] = useState<IUser | undefined>(undefined)

  //FIXME: this is a workaround to trigger hydration
  useEffect(() => {
    setUser(userCtx?.usuario)
  }, [userCtx])

  return (
    <div
      className={clsx(
        "sticky top-0 flex items-center px-4 pb-6 pt-8",
        pathname === "/" && "justify-center border border-b-gray-30"
      )}
    >
      {pathname !== "/" ? (
        <button
          onClick={() => {
            router.back()
          }}
        >
          <Icon name={"arrow_back"} className="text-primary-0" />
        </button>
      ) : (
        <h1 className="text-xl text-primary-0">Olá, {usr?.name}</h1>
      )}
    </div>
  )
}

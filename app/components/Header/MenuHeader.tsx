import { IUser } from "@auth/types"
import { useUserContext } from "@context/userContext"
import { useEffect, useState } from "react"
import { Icon } from "../Icon"

export const MenuHeader: React.FC<{ user?: IUser }> = () => {
  const [usr, setUser] = useState<IUser | undefined>(undefined)
  const { userCtx } = useUserContext()

  //FIXME: this is a workaround to trigger hydration
  useEffect(() => {
    setUser(userCtx?.usuario)
  }, [userCtx])

  return (
    <div className="sticky top-0 flex w-full items-center px-6 py-12">
      <div className="flex gap-4 text-primary-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-30">
          <Icon name={"account_circle"} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg"> {usr?.name} </h1>
          <h2 className="text-xs">Ajustar informações</h2>
        </div>
      </div>
    </div>
  )
}

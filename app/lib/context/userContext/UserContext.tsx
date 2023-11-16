"use client"
import { IUserCtx } from "@auth/index"
import { useRouter } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"
import Cookies from "universal-cookie"
type UserProps = {
  userCtx?: IUserCtx
  setUserCtx: React.Dispatch<React.SetStateAction<IUserCtx | undefined>>
}

export const UserContext = createContext({} as UserProps)

type Props = {
  children: React.ReactNode
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const cookies = new Cookies()
  const router = useRouter()

  const userInCookie = cookies.get("defenserUser")
  const [userCtx, setUserCtx] = useState<IUserCtx | undefined>(
    userInCookie as IUserCtx
  )

  useEffect(() => {
    if (!userCtx) {
      router.push("/login")
    }
  }, [router, userCtx])

  const values = {
    userCtx,
    setUserCtx,
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return context
}

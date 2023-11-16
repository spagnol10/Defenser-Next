"use client"
import { getMe } from "@api/getMe"
import { Talhao, getTalhao } from "@api/talhao"
import { NewUser } from "@components/NewUser"
import { DefaultPage } from "@components/TalhaoCard/Sekeletons"
import { ListPage, OnClickProps } from "@components/pages/ListPage"
import { useLayoutContext } from "@context/LayoutContext"
import { useUserContext } from "@context/userContext"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  const router = useRouter()

  const { setUserCtx } = useUserContext()
  const { setShowNewUser, showNewUser } = useLayoutContext()

  // using this instead of the ctx itself because of the access to the loading state, making it an smoothier experience
  const { isLoading: isLoadingCtx } = useQuery(["getMePage"], getMe, {
    onSuccess: (data) => {
      if (data?.talhoes && data?.produtos) {
        setShowNewUser(false)
      } else {
        setShowNewUser(true)
      }
      setUserCtx(data)
    },
  })

  if (isLoadingCtx) return <DefaultPage />

  if (showNewUser) {
    return (
      <div className="h-[calc(100vh-88px)]">
        <NewUser />
      </div>
    )
  }

  return (
    <ListPage<Talhao>
      instancia={["Talhao"]}
      apiFunction={getTalhao}
      title="Talhões"
      subtitle="Listagem de todos os seus talhões"
      label={"Talhão"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      onClick={({ id }: OnClickProps) => {
        router.push(`/talhao/${id}`)
      }}
      search
    />
  )
}

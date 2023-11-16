"use client"
import { resumeAplicacao } from "@api/aplicacao"
import { IError } from "@api/types"
import { Button } from "@components/Button"
import { DefaultPage } from "@components/TalhaoCard/Sekeletons"

import { useLayoutContext } from "@context/LayoutContext"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { FinishApplication } from "./FinishApplication"
import { StopApplication } from "./StopApplication"

type Props = {
  status?: string
  id: number
}

export const ApplicationButtonHandler: React.FC<Props> = ({ status, id }) => {
  const { setToast } = useLayoutContext()
  const queryClient = useQueryClient()

  const { mutate: mutateResume, isLoading: isResumeLoading } = useMutation(
    ["mutateResume"],
    () => resumeAplicacao(id),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Aplicação retomada com sucesso",
        })
        queryClient.invalidateQueries(["getAplicacaoById", id])
        queryClient.invalidateQueries(["getAplicacaoAtiva"])
        queryClient.invalidateQueries(["getAplicacaoParada"])
        setToast({
          type: "success",
          title: "Aplicação retomada com sucesso",
        })
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title: error.messages[0],
        })
      },
    }
  )

  if (isResumeLoading) {
    return <DefaultPage />
  }

  return (
    <>
      {status === "Ativa" ? (
        <div className="flex flex-col gap-4">
          <StopApplication id={id} />
          <FinishApplication id={id} />
        </div>
      ) : status === "Parada" ? (
        <div className="flex flex-col gap-4">
          <Button onClick={() => mutateResume()}>Continuar aplicação</Button>

          <FinishApplication id={id} />
        </div>
      ) : status === "Agendada" ? (
        <div className="flex flex-col gap-4">
          <FinishApplication willCancel id={id} />
        </div>
      ) : null}
    </>
  )
}

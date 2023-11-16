"use client"
import { finishAplicacao } from "@api/aplicacao"
import { IError } from "@api/types"
import { Button } from "@components/Button"
import { Drawer } from "@components/Drawer"

import { useLayoutContext } from "@context/LayoutContext"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"

type Props = {
  id: number
  willCancel?: boolean
}

export const FinishApplication: React.FC<Props> = ({ id, willCancel }) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()

  const { mutate: mutateFinish, isLoading: isFinishLoading } = useMutation(
    ["mutateFinish"],
    () => finishAplicacao(id),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Aplicação encerrada com sucesso",
        })
        queryClient.invalidateQueries(["getAplicacaoById", id])
        queryClient.invalidateQueries(["getAplicacaoParada"])
        queryClient.invalidateQueries(["getAplicacaoAtiva"])
        queryClient.invalidateQueries(["getAplicacaoFinalizada"])

        setOpen(false)
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title:
            error.messages[0] ||
            `Erro ao ${willCancel ? "cancelar" : "encerrar"} aplicação`,
        })
      },
    }
  )

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      button={{
        text: `${willCancel ? "Cancelar" : "Encerrar"} aplicação`,
        variant: willCancel ? "primary" : "text",
      }}
      title={`${willCancel ? "Cancelar" : "Encerrar"} aplicação ?`}
      description={`Ao ${
        willCancel ? "cancelar" : "encerrar"
      } a aplicação, não poderá desfazer a ação.`}
      className="flex gap-4"
    >
      <div className="flex w-full justify-end gap-4">
        <Button onClick={() => setOpen(false)} variant="text">
          Cancelar
        </Button>
        <Button
          disabled={isFinishLoading}
          loading={isFinishLoading}
          onClick={() => mutateFinish()}
        >
          {willCancel ? "Cancelar" : "Encerrar"}
        </Button>
      </div>
    </Drawer>
  )
}

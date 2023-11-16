"use client"
import { StopAplicacao, stopAplicacao } from "@api/aplicacao"
import { IError } from "@api/types"
import { Button } from "@components/Button"
import { Drawer } from "@components/Drawer"
import { useLayoutContext } from "@context/LayoutContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { TextField } from "../inputFields"

type Props = {
  id: number
}

const schema = z
  .object({
    motivo: z
      .string({
        required_error: "Motivo é obrigatório",
      })
      .min(10, "Motivo deve ter no mínimo 10   caracteres")
      .max(100),
  })
  .strict()

type FormValues = z.infer<typeof schema>

export const StopApplication: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const { setToast } = useLayoutContext()
  const queryClient = useQueryClient()
  const { handleSubmit, control, register } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: StopAplicacao) => {
    mutateStop(data)
  }

  const { mutate: mutateStop, isLoading: isStopLoading } = useMutation(
    ["mutateStop"],
    (data: StopAplicacao) => stopAplicacao(id, data),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Aplicação pausada com sucesso",
        })
        queryClient.invalidateQueries(["getAplicacaoById", id])
        queryClient.invalidateQueries(["getAplicacaoParada"])
        queryClient.invalidateQueries(["getAplicacaoAtiva"])
        setOpen(false)
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title: error.messages[0] || "Erro ao pausar aplicação",
        })
      },
    }
  )

  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      button={{
        text: "Pausar aplicação",
      }}
      title={"Pausar aplicação ?"}
      description={"Digite o motivo da pausa"}
    >
      <TextField
        control={control}
        type="text"
        placeholder="Motivo"
        {...register("motivo", { required: true })}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full justify-end gap-4">
          <Button onClick={() => setOpen(false)} variant="text">
            Cancelar
          </Button>
          <Button
            loading={isStopLoading}
            disabled={isStopLoading}
            type="submit"
          >
            Pausar
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

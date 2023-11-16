"use client"
import { PostAplicador, getAplicador, mutateAplicador } from "@api/aplicador";
import { IError } from "@api/types";
import { useLayoutContext } from "@context/LayoutContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../Button";
import { TextField } from "../../inputFields";
import { Select } from "../../inputFields/Select";
import { Switch } from "../../inputFields/Switch";
import { schema } from "./schema";

type FormValues = z.infer<typeof schema>

type Props = {
  id?: number
  setOpenDrawer: (open: boolean) => void // used typed like this in "newUser" see before change
}

export const AplicadorForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const { register, handleSubmit, control, setValue, watch, reset } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        ativo: true,
        role: "Aplicador",
      },
    })

  const { data, isLoading: isLoadingProfessional } = useQuery(
    ["getProfissionalById", id],
    () => getAplicador(id!),
    {
      enabled: !!id,
      onSuccess: (data) => {
        setValue("cpf", data.cpf)
        setValue("ativo", data.ativo)
        setValue("role", data.role)
      },
    }
  )

  useEffect(() => {
    if (isLoadingProfessional) return
    if (!data) return
    const { cpf, ativo, role } = data
    reset({ cpf, ativo, role })
  }, [data])

  const { mutate, isLoading } = useMutation(
    ["mutateAplicador"],
    (data: PostAplicador) => mutateAplicador({ id, data }),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Aplicador cadastrado com sucesso",
        })
        queryClient.invalidateQueries({ queryKey: ["getAplicador"] })
        queryClient.invalidateQueries({ queryKey: ["getProdutor"] })
        setOpenDrawer(false)
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title: error.messages[0] || "Erro ao cadastrar aplicador",
        })
      },
    }
  )

  const onSubmit = async (data: FormValues) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-4">
        {id ? (
          <Switch
            onClick={() => {
              setValue("ativo", !watch("ativo"))
            }}
            label="Ativo"
            {...register("ativo")}
            control={control}
          />
        ) : null}
        <TextField
          placeholder={"Digite o cpf"}
          {...register("cpf")}
          type="number"
          control={control}
          disabled={data?.isRegistered}
        />
        <Select
          {...register("role")}
          control={control}
          optionsList={[
            { label: "Aplicador", value: "Aplicador" },
            { label: "Produtor", value: "Produtor" },
          ]}
          getOptionLabel={(option) => option as string}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="text"
            text="Cancelar"
            onClick={() => { setOpenDrawer(false)}}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            loading={isLoading}
            text="Salvar"
          />
        </div>
      </div>
    </form>
  )
}

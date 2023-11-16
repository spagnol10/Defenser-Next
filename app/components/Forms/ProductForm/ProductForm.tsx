import {
  Product,
  getProductById,
  measurements,
  mutateProduct,
} from "@api/produtos"
import { IError } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../Button"
import { TextField } from "../../inputFields"
import { Select } from "../../inputFields/Select"
import { Switch } from "../../inputFields/Switch/Switch"
import { schema } from "./schema"

type FormValues = z.infer<typeof schema>

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProductForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
    })

  const { data, isLoading: isLoadingProduct } = useQuery(
    ["getProduct", id],
    () => getProductById(id!), //TODO: again this id! is not good
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (isLoadingProduct) return
    if (!data) return
    const { nome, unidadeMedida, preco, ativo } = data
    reset({ nome, preco, unidadeMedida, ativo })
  }, [data])

  const { mutate, isLoading } = useMutation(
    ["mutateProduct"],
    (data: Partial<Product>) => mutateProduct({ id: id, data: data }),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Produto cadastrado com sucesso",
        })
        queryClient.invalidateQueries({ queryKey: ["getProduct"] })
        setOpenDrawer(false)
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title: error.messages[0] || "Erro ao cadastrar produto",
        })
      },
    }
  )

  const onSubmit = async (data: FormValues) => {
    const newData = {
      produto: {
        nome: data.nome,
        unidadeMedida: data.unidadeMedida,
        ativo: data.ativo ?? true,
      },
      preco: data.preco,
    }
    mutate(newData)
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
          placeholder={"Digite o nome do produto"}
          {...register("nome")}
          control={control}
        />
        <TextField
          placeholder={"Digite o preço do produto"}
          {...register("preco")}
          type="number"
          control={control}
        />
        <Select
          control={control}
          {...register(`unidadeMedida`)}
          placeholder="Unidade de medida"
          optionsList={measurements}
          getOptionLabel={(value: string | number) => {
            return (
              measurements?.find((item) => item.value == value)?.label ?? ""
            )
          }}
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

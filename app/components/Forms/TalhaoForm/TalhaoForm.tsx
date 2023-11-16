import { getTalhaoById, mutateTalhao } from "@api/talhao"
import { IError } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../Button"
import { Icon } from "../../Icon"
import { Switch } from "../../inputFields/Switch/Switch"
import { TextField } from "../../inputFields/TextField"
import { schema } from "./schema"
type FormValues = z.infer<typeof schema>

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  shouldRedirect?: boolean
}

export const TalhaoForm: React.FC<Props> = ({
  shouldRedirect = true,
  id,
  setOpenDrawer,
}) => {
  const { register, handleSubmit, control, setValue, reset, watch } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
    })
  const { setToast } = useLayoutContext()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, isLoading: isLoadingTalhao } = useQuery(
    ["getTalhaoById", id],
    () => getTalhaoById(id!), // FIXME: another ts hack, the query is only enabled when there is an id, I don't know how to convey it to ts
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (isLoadingTalhao) return
    if (!data) return
    const { nome, latitude, longitude, areaTotal, ativo } = data
    reset({ nome, latitude, longitude, areaTotal, ativo })
  }, [data])

  const { mutate, isLoading } = useMutation(["mutateTalhao"], mutateTalhao, {
    onSuccess: (data) => {
      setToast({
        type: "success",
        title: id
          ? "Talhão atualizado com sucesso"
          : "Talhão cadastrado com sucesso",
      })
      queryClient.invalidateQueries({ queryKey: ["getTalhao"] })
      queryClient.invalidateQueries({ queryKey: ["getAplicacaoAgendada"] })
      queryClient.invalidateQueries({ queryKey: ["getAplicacaoAtiva"] })
      queryClient.invalidateQueries({
        queryKey: ["getAplicacaoParada"],
      })
      queryClient.invalidateQueries({
        queryKey: ["getAplicacaoFinalizada"],
      })
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["getTalhaoById", id] })
        queryClient.invalidateQueries(["getAplicacaoById", id])
      }
      if (shouldRedirect) {
        router.push(`/talhao/${data.id}`)
      }
      setOpenDrawer(false)
    },
    onError: (error: IError) => {
      setToast({
        type: "error",
        title: error.messages[0] || "Erro ao cadastrar talhão",
      })
    },
  })

  const onSubmit = async (data: FormValues) => {
    id ? mutate({ id, data }) : mutate({ data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-6">
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
          placeholder={"Digite o nome do talhão"}
          type={"text"}
          {...register("nome")}
          control={control}
        />

        <TextField
          placeholder={"Area total do talhão (m²)"}
          type={"text"}
          {...register("areaTotal")}
          control={control}
        />

        <Button
          onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              setValue("latitude", position.coords.latitude)
              setValue("longitude", position.coords.longitude)
            })
          }}
          variant="text"
        >
          <div className="flex items-center justify-center gap-4 text-primary-0">
            <Icon name={"my_location"} />
            <p>Pegar minha localização atual</p>
          </div>
        </Button>

        <div className="flex min-w-full items-end gap-2">
          <hr className="w-1/2 border border-gray-30" />
          <span className="text-lg leading-none text-gray-30">ou</span>
          <hr className="w-1/2 border border-gray-30" />
        </div>

        <TextField
          placeholder={"Digite sua latitude"}
          type={"number"}
          {...register("latitude")}
          control={control}
        />

        <TextField
          placeholder={"Digite sua longitude"}
          type={"number"}
          {...register("longitude")}
          control={control}
        />

        <div className="flex justify-end gap-4">
          <Button
            variant="text"
            text="Cancelar"
            onClick={() => {
              setOpenDrawer(false)
            }}
          />
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            text="Salvar"
          />
        </div>
      </div>
    </form>
  )
}

import { PostAplicacao, startAplicacao } from "@api/aplicacao"
import { Coleta } from "@api/coleta"
import { getProducts } from "@api/produtos"
import { IError } from "@api/types"
import { getCurrentWeatherById } from "@api/weather"
import { useLayoutContext } from "@context/LayoutContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { Accordion } from "@radixStyled/Accordion"
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { format } from "date-fns"
import dayjs from "dayjs"
import { debounce } from "lodash"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import Skeleton from "react-loading-skeleton"
import { z } from "zod"
import { ApplicationDetails } from "../../ApplicationDetails"
import { ApplicationDetailsSkeleton } from "../../ApplicationDetails/ApplicationDetailsSkeleton"
import { Button } from "../../Button"
import { Icon } from "../../Icon"
import { TextField } from "../../inputFields"
import { DatePicker } from "../../inputFields/DatePicker"
import { Select } from "../../inputFields/Select"
import { schema } from "./schema"
const defaultProduct = {
  value: 0,
  dosagem: undefined,
}

type Props = {
  id: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValues = z.infer<typeof schema> & {
  coleta: Coleta
  talhaoId: number
  tipoAplicacaoId: number
  unidadeMedida: string
}

export const ApplicationForm: React.FC<Props> = ({ id, setOpenDrawer }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [dataHora, setDataHora] = useState("")
  const [horaAgendada, setHoraAgendada] = useState("")
  const { setToast } = useLayoutContext()
  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      produtos: [defaultProduct],
      dataInicio: new Date(),
      horaInicio: format(new Date(), "HH:mm"),
    },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (watch("dataInicio") && watch("horaInicio")) {
      const debounced = debounce(
        () =>
          setDataHora(
            `${format(watch("dataInicio")!, "yyyy-MM-dd")} ${watch(
              "horaInicio"
            )}`
          ),
        1259
      )
      debounced()
      return () => {
        debounced.cancel()
      }
    }
  }, [watch("dataInicio"), watch("horaInicio")])

  const {
    data: products,
    isLoading: isLoadingProducts,
    fetchNextPage,
  } = useInfiniteQuery(
    ["getProduct"],
    ({ pageParam }) =>
      getProducts({ offset: pageParam?.offset ?? 0, limit: 10 }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) {
          return undefined
        }
        return {
          offset: lastPage.number + 1,
          limit: lastPage.size,
        }
      },
    }
  )

  const { data, isLoading } = useQuery(
    ["getCurrentWeatherByIdAndDate", id, dataHora],
    () =>
      getCurrentWeatherById({
        id: id,
        data: dataHora
          ? dataHora.replace(" ", "T")
          : dayjs(new Date()).format("yyyy-MM-dd HH:mm"),
      }),

    {
      staleTime: 10 * 100 * 60,
      enabled: !!dataHora,
      retry: false,
    }
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: "produtos",
  })

  const { mutate, isLoading: isLoadingStartAplicacao } = useMutation(
    ["startAplicacao"],
    (data: PostAplicacao) => startAplicacao(data),
    {
      onSuccess: (data) => {
        setToast({
          type: "success",
          title: horaAgendada
            ? "Aplicação agendada com sucesso"
            : "Aplicação iniciada com sucesso",
          description: horaAgendada
            ? `A aplicação iniciará ${format(
                new Date(horaAgendada),
                "dd/MM 'às' HH:mm"
              )}`
            : undefined,
        })
        queryClient.invalidateQueries(["getAplicacaoParada"])
        queryClient.invalidateQueries(["getAplicacaoAgendada"])
        queryClient.invalidateQueries(["getAplicacoesByTalhaoId"])
        router.push(`/aplicacoes/${data.id}`)
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title: error.messages?.[0] || "Erro ao iniciar aplicação",
        })
      },
    }
  )

  const onSubmit = (formData: FormValues) => {
    const produtos = formData.produtos.map((produto) => ({
      produto: {
        id: produto.value,
      },
      dosagem: produto.dosagem,
    }))

    const isAgendado = dayjs(dataHora).isAfter(dayjs().add(5, "minutes"))

    if (isAgendado) {
      setHoraAgendada(dataHora)
    }

    const newData: PostAplicacao = {
      produtos,
      talhaoId: id,
      tipoAplicacaoId: 1,
      coleta: data,
      dataInicio: isAgendado ? dataHora : undefined,
    }

    mutate(newData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-6">
          <DatePicker
            className="w-full"
            placeholder={"Data da aplicação"}
            control={control}
            {...register("dataInicio")}
            minDate={new Date()}
          />
          <TextField
            className="w-[100%-10px]"
            control={control}
            {...register("horaInicio")}
            placeholder="Hora de início"
            type="time"
            minHour={format(new Date(), "HH:mm")}
          />
        </div>

        <Accordion
          headerProps={{
            title: "Detalhes sobre o tempo",
          }}
          itemProps={{ value: "clima" }}
          defaultValue={"clima"}
        >
          {isLoading ? (
            <ApplicationDetailsSkeleton />
          ) : !data ? (
            <div className="flex flex-col gap-2 py-10">
              <p className=" text-center text-primary-0">
                Previsão para a data prevista ultrapassa o limite de 5 dias
              </p>
              <p className="text-center text-sm text-gray-20">
                *ainda é possivel agendar essa aplicacao
              </p>
            </div>
          ) : (
            <ApplicationDetails forecast={data} />
          )}
        </Accordion>

        <div className="flex min-w-full flex-col gap-8 rounded-lg border border-gray-30 bg-white px-5 py-4 text-primary-0">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">Produto {index + 1} </p>
                  <Button
                    variant="text"
                    onClick={() => {
                      if (fields.length === 1) return
                      remove(index)
                    }}
                  >
                    <Icon name="delete" className="text-red-800" />
                  </Button>
                </div>

                {isLoadingProducts || !products ? (
                  <Skeleton />
                ) : (
                  <Select
                    control={control}
                    {...register(`produtos.${index}.value`)}
                    placeholder="Selecione um produto"
                    isLoading={isLoadingProducts}
                    getMoreOptions={fetchNextPage}
                    options={products}
                    getOptionLabel={(value: number | string) => {
                      return (
                        products?.pages
                          ?.map((page) =>
                            page.content?.filter((item) => {
                              return item.id == value
                            })
                          )
                          .flat()[0]?.nome ?? ""
                      )
                    }}
                  />
                )}
                <TextField
                  control={control}
                  type="number"
                  {...register(`produtos.${index}.dosagem`)}
                  placeholder="Dosagem"
                />

                {watch(`produtos.${index}.value`) ? (
                  <p className="text-sm font-light text-gray-500">
                    * Dosagem em{" "}
                    {products?.pages
                      ?.map((page) =>
                        page.content.filter(
                          (item) => item.id == watch(`produtos.${index}.value`)
                        )
                      )
                      .flat()[0]?.sigla ?? "L/ha"}
                  </p>
                ) : null}
              </div>
            )
          })}
          <div className="flex items-center justify-center">
            <Button
              variant="text"
              onClick={() => append(defaultProduct as any)} //FIXME: fix type
            >
              <div className="flex gap-4">
                <Icon name={"add"} />
                <p>Adicionar produto</p>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex w-full justify-end gap-4">
          <Button
            variant="text"
            onClick={() => {
              setOpenDrawer(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            loading={isLoadingStartAplicacao}
            disabled={isLoadingStartAplicacao}
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </div>
    </form>
  )
}

"use client"
import { getAplicacaoById } from "@api/aplicacao"
import { ApplicationProducts } from "@components/AplicacaoList/ApplicationProducts"
import { ApplicationButtonHandler } from "@components/ApplicationButtons/ApplicationButtonHandler"
import { ApplicationDetails } from "@components/ApplicationDetails"
import { ApplicationHistory } from "@components/ApplicationHistory"
import { SecondaryHeader } from "@components/SecondaryHeader"
import { DefaultPage } from "@components/TalhaoCard/Sekeletons"

import { TabButton, TabContent, TabList, Tabs } from "@radixStyled/index"

import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"

type Props = {
  params: {
    id: string
  }
}

const page: React.FC<Props> = ({ params }) => {
  const id = Number(params.id)
  const [time, setTime] = useState("")
  const { data, isLoading } = useQuery(["getAplicacaoById", id], () =>
    getAplicacaoById(id)
  )

  useEffect(() => {
    if (data?.aplicacao?.status === "Ativa") {
      const interval = setInterval(() => {
        const now = dayjs()
        const start = dayjs(data?.aplicacao?.dataInicio)
        const diff = now.diff(start, "second")

        const [hours, minutes, seconds] = [
          Math.floor(diff / 3600),
          Math.floor((diff % 3600) / 60),
          diff % 60,
        ]

        setTime(`${hours ? hours + "h" : ""} ${minutes}m ${seconds}s`)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [data?.aplicacao?.status])

  if (isLoading || !data) {
    return <DefaultPage />
  }

  return (
    <div className="flex flex-col gap-6">
      <SecondaryHeader
        usePadding
        title={`#${params.id} - ${
          data?.aplicacao?.status === "Ativa"
            ? "Aplicação em andamento"
            : data?.aplicacao?.status === "Parada"
            ? "Aplicação pausada"
            : data.aplicacao.status == "Agendada"
            ? "Aplicação agendada"
            : "Aplicação encerrada"
        } `}
        subtitle={data?.aplicacao?.talhao?.nome}
      />

      <Tabs defaultValue={"aplicacao"}>
        {data?.aplicacao?.status !== "Agendada" && (
          <TabList>
            <TabButton value={"aplicacao"}>Informações</TabButton>
            <TabButton value={"historico"}>Histórico</TabButton>
          </TabList>
        )}

        <TabContent value={"aplicacao"}>
          <div className="flex flex-col gap-4 px-6">
            <p className="text-primary-0">
              <span className="font-semibold">Aplicador:</span>{" "}
              {data?.aplicacao?.usuario?.name}
            </p>
            {data.aplicacao.status === "Ativa" && (
              <p className="text-primary-0">
                <span className="font-semibold">Tempo de aplicação:</span>{" "}
                <span>{time}</span>
              </p>
            )}

            {!data.aplicacao.coletas.length ? (
              <div className="py-40">
                <p className="text-center font-semibold text-primary-0">
                  Não há previsão do tempo para essa aplicação
                </p>
              </div>
            ) : (
              <ApplicationDetails forecast={data?.aplicacao?.coletas} />
            )}
            <hr />
            {data?.aplicacao?.produtos && (
              <ApplicationProducts products={data?.aplicacao?.produtos} />
            )}
            <ApplicationButtonHandler
              id={id}
              status={data?.aplicacao?.status}
            />
          </div>
        </TabContent>

        <TabContent value={"historico"}>
          <div className="flex flex-col gap-4 px-2">
            <p className="text-primary-0">
              <span className="font-semibold">Aplicador:</span>{" "}
              {data?.aplicacao?.usuario?.name}
            </p>
            <hr />
            <ApplicationHistory data={data} />
          </div>
        </TabContent>
      </Tabs>
    </div>
  )
}

export default page

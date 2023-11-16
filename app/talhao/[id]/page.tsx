"use client"
import { getTalhaoById } from "@api/talhao"
import { getForecastById } from "@api/weather"

import { ForecastCardHolder, ForecastSkeleton } from "@components/Forecast"
import { SecondaryHeader } from "@components/SecondaryHeader"
import { TabButton, TabContent, TabList, Tabs } from "@radixStyled/index"
import { useQuery } from "@tanstack/react-query"
import "react-loading-skeleton/dist/skeleton.css"
import { Application } from "./components/Application"

const Talhao = ({ params }: { params: { id: number } }) => {
  const id = params.id
  const { data } = useQuery(["getTalhaoById", id], () => getTalhaoById(id))

  const { data: forecast, isLoading } = useQuery(["getForecastById", id], () =>
    getForecastById(id, 5)
  )

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        <SecondaryHeader title="Informações do talhão" subtitle={data?.nome} />
        <hr />
        {isLoading || !forecast?.length ? (
          <ForecastSkeleton />
        ) : (
          <ForecastCardHolder forecast={forecast} />
        )}
      </div>

      <Tabs defaultValue="pausadas">
        <TabList>
          <TabButton value="em-andamento">
            <h2>Aplicando</h2>
          </TabButton>
          <TabButton value="pausadas">
            <h2>Pausadas</h2>
          </TabButton>
          <TabButton value="futuras">
            <h2>Futuras</h2>
          </TabButton>
          <TabButton value="concluidas">
            <h2>Concluídas</h2>
          </TabButton>
        </TabList>

        <TabContent value="pausadas">
          <Application status={"Parada"} id={id} />
        </TabContent>

        <TabContent value="concluidas">
          <Application status={"Finalizada"} id={id} />
        </TabContent>

        <TabContent value="em-andamento">
          <Application status={"Ativa"} id={id} />
        </TabContent>

        <TabContent value="futuras">
          <Application status={"Agendada"} id={id} />
        </TabContent>
      </Tabs>
    </>
  )
}

export default Talhao

import { AplicacaoById } from "@api/aplicacao"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { capitalize } from "lodash"
import { ApplicationProducts } from "../AplicacaoList/ApplicationProducts"
import { ApplicationDetails } from "../ApplicationDetails"
import { Accordion } from "../radixStyled/Accordion"
dayjs.extend(isBetween)
type Props = {
  data: AplicacaoById
}

export const ApplicationHistory: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 text-primary-0">
      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-primary-50"></div>
        <p>
          <span className="font-semibold">
            {dayjs(data.aplicacao?.dataInicio).format("DD/MM/YY HH:mm")} -{" "}
          </span>
          Aplicação iniciada
        </p>
      </div>
      <div className="flex flex-col gap-6 px-6">
        {data.aplicacao?.coletas.map((coleta, indexC) => (
          <div key={coleta.id} className="flex flex-col gap-4">
            <div className="flex gap-1">
              <div className="mt-6 h-2 w-2 rounded-full bg-primary-50"></div>
              <Accordion
                headerProps={{
                  title: `[Coleta] ${dayjs(coleta.data).format(
                    "DD/MM/YY HH:mm"
                  )}`,
                }}
                itemProps={{
                  value: coleta?.id?.toString() ?? indexC.toString(),
                }}
              >
                <ApplicationDetails forecast={coleta} />
                <hr />
                {data.aplicacao?.produtos && (
                  <ApplicationProducts products={data.aplicacao?.produtos} />
                )}
              </Accordion>
            </div>
            {data.statusChangeLog.map((status, index) => {
              const nextColeta = data.aplicacao.coletas.at(indexC + 1)

              if (
                dayjs(status.updatedAt).isBetween(
                  dayjs(coleta.data),
                  nextColeta
                    ? dayjs(nextColeta.data)
                    : dayjs(data.aplicacao?.dataFim)
                )
              ) {
                return (
                  <div className="flex gap-4">
                    <div
                      key={index}
                      className=" mt-2 h-2 w-2 rounded-full bg-primary-50"
                    ></div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <p className="font-semibold">
                          {dayjs(status.updatedAt).format("hh:mm")}
                        </p>
                        <p>{capitalize(status.statusAlterado.toLowerCase())}</p>
                      </div>
                      {status.motivo && (
                        <p className="break-words font-light text-gray-10">
                          {status.motivo}
                        </p>
                      )}
                    </div>
                  </div>
                )
              }
              return null
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-primary-50"></div>
        {data?.aplicacao?.dataFim ? (
          <p>
            <span className="font-semibold">
              {dayjs(data.aplicacao.dataFim).format("DD/MM/YY HH:mm")} -{" "}
            </span>
            Aplicação finalizada
          </p>
        ) : (
          <p>
            <span className="font-semibold">Em andamento</span>
          </p>
        )}
      </div>
    </div>
  )
}

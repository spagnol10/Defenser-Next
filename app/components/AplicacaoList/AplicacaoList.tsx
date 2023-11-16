import { Aplicacao } from "@api/aplicacao"
import React from "react"
import { TalhaoDrawer } from "./TalhaoDrawer"
type AplicacaoListProps = {
  data?: Aplicacao[]
  showTalhao?: boolean
}

export const AplicacaoList: React.FC<AplicacaoListProps> = ({
  data,
  showTalhao,
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      {!data?.length ? (
        <div className="py-40">
          <p className="text-center font-semibold text-primary-0">
            Não há previsão do tempo para essa aplicação
          </p>
        </div>
      ) : (
        data?.map((aplicacao) => {
          return (
            <TalhaoDrawer
              key={aplicacao?.id}
              showTalhao={showTalhao}
              aplicacao={aplicacao}
            />
          )
        })
      )}
    </div>
  )
}

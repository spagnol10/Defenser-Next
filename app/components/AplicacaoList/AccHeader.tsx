import { Aplicacao } from "@api/aplicacao"
import dayjs from "dayjs"

type Props = {
  aplicacao: Aplicacao
  showTalhao?: boolean
}

export const AccHeader: React.FC<Props> = ({ aplicacao, showTalhao }) => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-primary-0">
        {dayjs(aplicacao.dataInicio).format("DD/MM/YY HH:mm")}
      </p>
      {showTalhao && (
        <p className="text-sm text-gray-10">{aplicacao.talhao.nome}</p>
      )}
    </div>
  )
}

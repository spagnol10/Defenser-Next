"use client"
import { Aplicacao, getAllAplicacaoList } from "@api/aplicacao"
import { ListPage, OnClickProps } from "@components/pages/ListPage"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AplicacaoList } from "../components/AplicacaoList"

const Aplicacoes = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)
  const router = useRouter()

  return (
    <ListPage<Aplicacao>
      instancia={[
        "AplicacaoAgendada",
        "AplicacaoAtiva",
        "AplicacaoParada",
        "AplicacaoFinalizada",
      ]}
      apiFunction={getAllAplicacaoList}
      apiParams={[
        { key: "status", value: "Agendada" },
        { key: "status", value: "Ativa" },
        { key: "status", value: "Parada" },
        { key: "status", value: "Finalizada" },
      ]}
      dividerLabel={[
        "Aplicações futuras",
        "Aplicações ativas",
        "Aplicações paradas",
        "Aplicações finalizadas",
      ]}
      title="Aplicações"
      subtitle="Listagem das aplicações dos seus talhões"
      label={"Aplicação"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      onClick={({ id }: OnClickProps) => {
        router.push(`/aplicacoes/${id}`)
      }}
      search
    >
      <AplicacaoList showTalhao />
    </ListPage>
  )
}

export default Aplicacoes

import { Aplicacao, resumeAplicacao } from "@api/aplicacao"
import { useLayoutContext } from "@context/LayoutContext"
import { Accordion } from "@radixStyled/Accordion"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"
import { FinishApplication } from "../ApplicationButtons/FinishApplication"
import { ApplicationDetails } from "../ApplicationDetails"
import { Button } from "../Button"
import { AccHeader } from "./AccHeader"
import { ApplicationProducts } from "./ApplicationProducts"

type TalhaoDrawerProps = {
  aplicacao: Aplicacao
  showTalhao?: boolean
  Header?: React.ReactNode
}

export const TalhaoDrawer: React.FC<TalhaoDrawerProps> = ({
  aplicacao,
  showTalhao,
  Header,
}) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const mutateResume = useMutation(
    ["resumeAplicacao"],
    () => resumeAplicacao(aplicacao.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAplicacaoById"])
        queryClient.invalidateQueries(["getAplicacaoParada"])
        setToast({
          type: "success",
          title: "Aplicação retomada com sucesso",
        })
        router.push(`/aplicacoes/${aplicacao.id}`)
      },
    }
  )

  return (
    <Accordion
      headerProps={{
        children: Header ?? (
          <AccHeader showTalhao={showTalhao} aplicacao={aplicacao} />
        ),
      }}
      itemProps={{ value: String(aplicacao.id) }}
    >
      <ApplicationDetails forecast={aplicacao.coletas} />

      {aplicacao?.produtos?.length > 0 && (
        <>
          <hr />
          <ApplicationProducts products={aplicacao.produtos} />
        </>
      )}

      {(aplicacao.status === "Ativa" || aplicacao.status === "Finalizada") && (
        <div className="flex flex-col gap-4">
          <Button onClick={() => router.push(`/aplicacoes/${aplicacao.id}`)}>
            Ir para a aplicação
          </Button>
        </div>
      )}
      {aplicacao.status === "Parada" && (
        <div className="flex flex-col gap-4">
          <Button onClick={() => mutateResume.mutate()} variant="primary">
            Continuar aplicação
          </Button>
          <Button
            onClick={() => router.push(`/aplicacoes/${aplicacao.id}`)}
            variant={"text"}
          >
            Ir para a aplicação
          </Button>
        </div>
      )}
      {aplicacao.status === "Agendada" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <FinishApplication willCancel id={aplicacao.id} />
          </div>
        </div>
      )}
    </Accordion>
  )
}

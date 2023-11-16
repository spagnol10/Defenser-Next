import { Aplicacao, getAlicacaoList } from "@api/aplicacao"
import { AplicacaoList } from "@components/AplicacaoList"
import { Button } from "@components/Button"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { NoData } from "./NoData"

type ApllicationProps = {
  id: number
  status?: Aplicacao["status"]
  setFiltered?: React.Dispatch<React.SetStateAction<Aplicacao[]>>
}
export const Application = ({ id, status }: ApllicationProps) => {
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage, refetch } =
    useInfiniteQuery(
      ["getAplicacoesByTalhaoId"],
      ({ pageParam }) =>
        getAlicacaoList(id, pageParam?.offset ?? 0, 10, status ?? "Ativa"),
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

  useEffect(() => {
    refetch()
  }, [])

  if (isLoading || isFetching)
    return (
      <Skeleton
        height={58}
        count={5}
        borderRadius={10}
        className="mt-4 first:mt-0"
      />
    )

  return (
    <div className="flex flex-col gap-4">
      {data?.pages[0]?.content?.length === 0 ? (
        <NoData />
      ) : (
        data && (
          <AplicacaoList
            key={crypto.randomUUID()}
            data={data.pages[0].content}
          />
        )
      )}

      {(hasNextPage || isLoading) && !!data && (
        <Button
          className="w-full p-2 text-center"
          variant="text"
          onClick={() => fetchNextPage()}
        >
          Carregar mais aplicações
        </Button>
      )}
    </div>
  )
}

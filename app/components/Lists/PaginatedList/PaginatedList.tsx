import { DefType, GetApiParams, Pagination } from "@api/types"
import { filterBuilder } from "@lib/filterBuilder"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { Button } from "../../Button"
import { Drawer } from "../../Drawer"
import { Icon } from "../../Icon"
import { OnClickProps } from "../../pages/ListPage"

type ApiFunction<T> = (params?: GetApiParams) => Promise<Pagination<T>>

type PageListProps<T> = {
  form?: ({
    id,
    setOpenDrawer,
  }: {
    id: number | undefined
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  }) => JSX.Element
  title: string
  label: string
  apiFunction: ApiFunction<T>
  currentId: number | undefined
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>
  onClick?: ({ e, id }: OnClickProps) => void
  instancia: string
  query?: string
  param?: {
    [key: string]: string
  }
  children?: React.ReactNode
  openDrawer?: boolean
  setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>
}

function PaginatedList<T extends DefType>({
  form,
  title,
  label,
  apiFunction,
  currentId,
  setCurrentId,
  onClick,
  instancia,
  query,
  param,
  children,
}: PageListProps<T>) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery(
      [`get${instancia}`, param, query],
      ({ pageParam }) => {
        const params = []
        if (param) {
          params.push({
            key: param.key,
            value: param.value,
          })
        }
        if (query) {
          params.push({
            key: "search",
            value: query,
          })
        }

        return apiFunction({
          offset: pageParam?.offset ?? 0,
          limit: 10,
          filter: filterBuilder(params),
        })
      },
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
        keepPreviousData: false,
      }
    )

  return (
    <>
      {isLoading ? (
        <Skeleton height={57} count={4} className="mt-6 first:mt-0" />
      ) : (
        <div>
          {data?.pages?.[0]?.content?.length === 0 ? (
            <h2 className="text-center text-sm text-primary-0">
              Nenhum item encontrado
            </h2>
          ) : (
            <div className="flex flex-col gap-6">
              {data?.pages?.map((page, index) => {
                if (children) {
                  return React.cloneElement(children as React.ReactElement, {
                    data: page.content,
                    key: index,
                  })
                }
                return page.content.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-b-gray-30 px-6 py-4"
                      onClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                      ) => {
                        setCurrentId(item?.id)
                        if (onClick) {
                          onClick({ e, id: item?.id })
                          return
                        }
                        setOpenDrawer?.(true)
                      }}
                    >
                      <p className="truncate text-primary-0">{item?.nome}</p>
                      <Icon
                        name={onClick ? "arrow_forward" : "edit"}
                        className="text-gray-0"
                      />
                    </div>
                  )
                })
              })}
            </div>
          )}
        </div>
      )}

      {(hasNextPage || isLoading) && !!data && (
        <Button
          className="w-full p-2 text-center"
          variant="text"
          disabled={isFetching || isLoading}
          onClick={() => fetchNextPage()}
        >
          {isFetching && !isLoading && data ? (
            <div className="flex animate-spin items-center justify-center">
              <Icon name="progress_activity" />
            </div>
          ) : (
            `Carregar mais ${title.toLocaleLowerCase()}s`
          )}
        </Button>
      )}

      {setOpenDrawer && (
        <Drawer
          open={openDrawer ?? false}
          setOpen={setOpenDrawer}
          title={
            currentId
              ? `Editar ${title.toLocaleLowerCase()}`
              : `Novo ${title.toLocaleLowerCase()}`
          }
        >
          {React.createElement(form ?? (() => <></>), {
            id: currentId,
            setOpenDrawer,
          })}
        </Drawer>
      )}
    </>
  )
}

export { PaginatedList }

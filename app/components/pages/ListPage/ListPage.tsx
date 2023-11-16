import { DefType, Pagination } from "@api/types"
import { SearchBar } from "@components/SearchBar"
import { SecondaryHeader } from "@components/SecondaryHeader"
import clsx from "clsx"
import React, { useState } from "react"
import "react-loading-skeleton/dist/skeleton.css"
import { PaginatedList } from "../../Lists/PaginatedList"

export interface OnClickProps {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
  id: number
}

type ApiFunction<T> = (params?: any) => Promise<Pagination<T>>

type PageListProps<T> = {
  form?: ({
    id,
    setOpenDrawer,
  }: {
    id: number | undefined
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  }) => JSX.Element
  title: string
  subtitle?: string
  label: string
  apiFunction: ApiFunction<T>
  currentId: number | undefined
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>
  setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>
  openDrawer?: boolean
  onClick?: ({ e, id }: OnClickProps) => void
  search?: boolean
  instancia: string[]
  apiParams?: {
    key: string
    value: string
  }[]
  children?: React.ReactNode
  dividerLabel?: string[]
}

/**
 * @description pagina de listagem generica com searchbar infinite query
 *
 * @param {React.ReactNode} [form] formulario para ser renderizado no drawer
 * @param {string} [title] titulo da pagina
 * @param {string} [subtitle] subtitulo da pagina 
 * @param {string} [label] label para ser renderizado no drawer
 * @param {ApiFunction<T>} [apiFunction] funcao que retorna a lista de itens
 * @param {number | undefined} [currentId] id do item selecionado
 * @param {React.Dispatch<React.SetStateAction<number | undefined>>} [setCurrentId] funcao para setar o id do item selecionado
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [setOpenDrawer] funcao para setar se o drawer esta aberto
 * @param {boolean} [openDrawer] se o drawer esta aberto
 * @param {({ e, id }: OnClickProps) => void} [onClick] funcao para ser executada ao clicar em um item da lista
 * @param {boolean} [search] se deve ou nao renderizar a barra de pesquisa
 * @param {string[]} [instancia] nome da instancia para ser usado no drawer, controla a quantidade de listas
 * @param {{key: string, value: string}[]} [apiParams] chavese valores para serem colocadas junto a chamada da api, serao passadas na ordem da instancia, devem ter o mesmo tamanho da instancia
 * @param {React.ReactNode} [children] children para serem renderizados dentro da lista, troca a renderizaçao padrao para o componente passado exemplo no /aplicacoes/page.tsx
 * @param {string[]} [dividerLabel] label para serem renderizados como divisor de lista, deve ter o mesmo tamanho da instancia
 *
 * @example <caption>Exemplo de uso econtrado em /page.tsx</caption>
 *
 * <List
              instancia=["Talhao"]
              apiFunction={getTalhao}
              title="Acompanhe seus talhões"
              subtitle="Gerenie seus talhões"
              label={"Talhão"}
              currentId={currentId}
              setCurrentId={setCurrentId}
              onClick={() =>
                ({ e, id }: OnClickProps) => {
                  router.push(`/talhao/${id}`)
                }}
              search={true}
              />
 */

function ListPage<T extends DefType>({
  form,
  title,
  subtitle,
  label,
  apiFunction,
  currentId,
  setCurrentId,
  onClick,
  search,
  instancia,
  apiParams,
  children,
  dividerLabel,
  openDrawer,
  setOpenDrawer,
}: PageListProps<T>) {
  const [query, setQuery] = useState("")
  return (
    <>
      <div
        className={clsx(
          "relative flex h-[calc(100vh-86px-88px)] flex-col gap-6 overflow-y-scroll bg-white px-6 pb-6",
          {
            "pt-6": !dividerLabel?.length,
          }
        )}
      >
        <SecondaryHeader title={title} subtitle={subtitle} />
        {search && <SearchBar setQuery={setQuery} />}

        {instancia.map((instancia, index) => (
          <div key={index} className=" flex flex-col gap-6 bg-white">
            {dividerLabel?.[index] && (
              <h3 className="sticky top-0 flex flex-col bg-white pb-2 text-primary-0">
                {dividerLabel[index]}
              </h3>
            )}

            <PaginatedList<T>
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
              form={form}
              title={title}
              label={label}
              apiFunction={apiFunction}
              param={apiParams?.[index]}
              currentId={currentId}
              setCurrentId={setCurrentId}
              onClick={onClick}
              instancia={instancia}
              query={query}
            >
              {children}
            </PaginatedList>
          </div>
        ))}
      </div>
    </>
  )
}

export { ListPage }

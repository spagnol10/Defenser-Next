import { makeApiRequest } from "../makeApiRequest"
import { Coleta } from "./types"

export const postColeta = async (data: Coleta) => {
  return makeApiRequest<void>({
    method: "post",
    url: `coleta/save`,
    data: data,
  })
}

export const getColeta = async () => {
  return makeApiRequest<Coleta[]>({
    method: "get",
    url: `coleta`,
  })
}

export const getColetaById = async (id: number) => {
  return makeApiRequest<Coleta>({
    method: "get",
    url: `coleta/${id}`,
  })
}

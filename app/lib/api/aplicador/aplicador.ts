import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { Aplicador, PostAplicador } from "./types"

export const getAplicadores = async ({
  offset,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Aplicador>>({
    method: "get",
    url: `usuarios/profissionais?offset=${offset}&limit=${limit}&${filter}`,
  })
}

export const getAplicador = async (id: number) => {
  return makeApiRequest<Aplicador>({
    method: "get",
    url: `usuarios/profissionais/${id}`,
  })
}

export const mutateAplicador = async ({
  id,
  data,
}: {
  id?: number
  data: PostAplicador
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `usuarios/profissionais/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `usuarios/profissionais`,
    data: data,
  })
}

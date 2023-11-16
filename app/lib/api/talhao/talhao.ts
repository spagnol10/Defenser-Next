import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { PostTalhao, Talhao } from "./types"

export const getTalhao = async ({ offset, limit, filter }: GetApiParams) => {
  return makeApiRequest<Pagination<Talhao>>({
    method: "get",
    url: `talhoes?offset=${offset}&limit=${limit}`,
    filter: filter,
  })
}

export const getTalhaoById = async (id: number) => {
  return makeApiRequest<Talhao>({
    method: "get",
    url: `talhoes/${id}`,
  })
}

export const mutateTalhao = async ({
  id,
  data,
}: {
  id?: number
  data: PostTalhao
}) => {
  if (!id) {
    return makeApiRequest<Talhao>({
      method: "post",
      url: `talhoes`,
      data: data,
    })
  }
  return makeApiRequest<Talhao>({
    method: "put",
    url: `talhoes/${id}`,
    data: data,
  })
}

import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { Product, ProductResponse } from "./types"

export const getProducts = async ({
  offset,
  limit,
  filter,
}: GetApiParams): Promise<Pagination<ProductResponse>> => {
  if (!limit || (!offset && offset !== 0)) {
    return await makeApiRequest({ method: "get", url: `/produtos/list` })
  }

  return await makeApiRequest({
    method: "get",
    url: `/produtos?offset=${offset}&limit=${limit}&${filter || ""}`,
  })
}

export const getProductsPaginationless = async (): Promise<
  ProductResponse[]
> => {
  return await makeApiRequest({
    method: "get",
    url: `/produtos/list`,
  })
}

export const getProductById = async (id: number): Promise<ProductResponse> => {
  return await makeApiRequest({
    method: "get",
    url: `/produtos/${id}`,
  })
}

export const mutateProduct = async ({
  id,
  data,
}: {
  id?: number
  data: Partial<Product>
}): Promise<Product> => {
  if (!id) {
    return await makeApiRequest({
      method: "post",
      url: `/produtos`,
      data: data,
    })
  }
  return await makeApiRequest({
    method: "put",
    url: `/produtos/${id}`,
    data: data,
  })
}

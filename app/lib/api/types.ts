import { IUser } from "./auth"
import { Empresa } from "./empresa/types"

export type DefType = {
  ativo: boolean
  id: number
  nome: string
}

export interface IError {
  code: number
  moreInfo: string
  developerMessage: string
  status: number
  messages: string[]
}

export interface Pagination<T> {
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    unpaged: boolean
  }
  size: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  totalElements: number
  totalPages: number
  content: T[]
}

export interface Usuario {
  name: string
  cpf: string
  role: IUser["role"]
  empresa: Empresa
}

export interface GetApiParams {
  id?: number
  offset: number
  limit: number
  filter?: string
}

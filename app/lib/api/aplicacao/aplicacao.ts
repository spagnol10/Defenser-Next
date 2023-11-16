import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import {
  Aplicacao,
  AplicacaoById,
  PostAplicacao,
  PostAplicacaoResponse,
  StopAplicacao,
  TipoAplicacao,
} from "./types"

export const startAplicacao = async (data: PostAplicacao) => {
  return makeApiRequest<PostAplicacaoResponse>({
    method: "post",
    url: `aplicacoes/schedule`,
    data: data,
  })
}

export const stopAplicacao = async (id: number, data: StopAplicacao) => {
  return makeApiRequest({
    method: "post",
    url: `aplicacoes/stop/${id}`,
    data: data,
  })
}

export const resumeAplicacao = async (id: number) => {
  return makeApiRequest({
    method: "post",
    url: `aplicacoes/resume/${id}`,
  })
}

export const finishAplicacao = async (id: number) => {
  return makeApiRequest({
    method: "post",
    url: `aplicacoes/finish/${id}`,
  })
}

export const getAllAplicacaoList = async ({
  offset,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Aplicacao>>({
    method: "get",
    url: `aplicacoes?offset=${offset}&limit=${limit}&${filter}`,
  })
}

export const getAplicacaoById = async (id: number) => {
  return makeApiRequest<AplicacaoById>({
    method: "get",
    url: `aplicacoes/${id}`,
  })
}

export const getAlicacaoList = async (
  id: number,
  offset: number,
  limit: number,
  status: Aplicacao["status"]
) => {
  return makeApiRequest<Pagination<Aplicacao>>({
    method: "get",
    url: `talhoes/${id}/aplicacao?offset=${offset}&limit=${limit}&status=${status}`,
  })
}

export const getTipoAplicacao = async () => {
  return makeApiRequest<TipoAplicacao>({
    method: "get",
    url: `tipoAplicacao`,
  })
}

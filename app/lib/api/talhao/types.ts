import { Empresa } from "../empresa/types"
import { DefType } from "../types"

export interface Talhao extends DefType {
  areaTotal: number
  longitude: number
  latitude: number
  ativo: boolean
  empresa: Empresa
}

export interface PostTalhao {
  nome: string
  areaTotal?: number
  longitude: number
  latitude: number
}

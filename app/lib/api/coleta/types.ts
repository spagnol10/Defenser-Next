import { Produto } from "../produtos/types"

export interface Coleta {
  id?: number
  data: string
  temperatura: number
  umidadeRelativa: number
  velVento: number
  chuva: boolean
  hasChanged: boolean
  descricao: string
  produtos: Produto[]
}

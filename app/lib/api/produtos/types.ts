import { DefType } from "../types"

export interface Produto extends DefType {
  dosagem: number
  unidadeMedida: string
}

export interface ProdutoAplicacao {
  produto: {
    id?: number
    nome: string
    unidadeMedida: string
    sigla: string
  }
  dosagem: number
}
export interface Product {
  produto: {
    id?: number
    ativo: boolean
    nome: string
    unidadeMedida: string
  }
  preco: number
}

export interface ProductResponse extends DefType {
  unidadeMedida: string
  preco: number
  sigla: string
}

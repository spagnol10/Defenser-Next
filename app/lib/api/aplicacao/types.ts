import { Coleta } from "../coleta/types"
import { ProdutoAplicacao } from "../produtos/types"
import { Talhao } from "../talhao/types"
import { DefType, Usuario } from "../types"

export interface StopAplicacao {
  motivo: string
}

export interface PostAplicacao {
  produtos: {
    produto: {
      id: number
    }
    dosagem: number
  }[]
  coleta?: Coleta
  talhaoId: number
  tipoAplicacaoId: number
  dataInicio?: string
}

export interface PostAplicacaoResponse extends Omit<PostAplicacao, "coleta"> {
  id: number
  coletas: Coleta[]
  status: "string"
  tipoAplicacaoNome: "string"
  dataInicio: "2023-06-26T03:53:45.889Z"
  dataFim: "2023-06-26T03:53:45.889Z"
}

export interface TipoAplicacao {
  id: number
  nome: string
}

export interface AplicacaoById {
  aplicacao: Aplicacao
  statusChangeLog: StatusChangeLog[]
}
export interface StatusChangeLog {
  id: number
  updatedAt: string
  statusAnterior: "Finalizada" | "Ativa" | "Parada" | "Agendada"
  statusAlterado: "Finalizada" | "Ativa" | "Parada" | "Agendada"
  motivo: "string"
}

export interface Aplicacao extends DefType {
  tipoAplicacao: TipoAplicacao
  produtos: ProdutoAplicacao[]
  coletas: Coleta[]
  status: "Finalizada" | "Ativa" | "Parada" | "Agendada"
  talhao: Talhao
  dataInicio: string
  dataFim: string
  usuario: Usuario
  aplicando: boolean
}

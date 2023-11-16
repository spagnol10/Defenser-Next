import { DefType, Usuario } from "../types"

export interface Aplicador extends DefType {
  dataCadastro?: Date
  isRegistered?: boolean
  cpf: string
  usuario: Usuario
  role: string
}

export interface PostAplicador {
  cpf: string
  role: string
}

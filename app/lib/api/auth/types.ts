export interface IToken {
  iat: number
  sub: string
  roles: {
    authority: string
  }
}

export interface IUserCtx {
  talhoes?: number
  aplicadores?: number
  produtos?: number
  usuario: IUser
}
export interface IUser {
  id: number
  name: string
  cpf: string
  role: "Produtor" | "Aplicador"
  empresa: {
    id: 0
    nome: string
    ativo: boolean
  }
}
export interface IUserLogin {
  login: string
  password: string
}

export type IRegisterUser = Omit<IUser, "empresa" | "id" | "role"> & {
  password: string
  isAplicador: boolean
}

export interface GenericResponse {
  status: string
  message: string
}

export interface ILoginResponse {
  status: string
  token: string
  expiration: number
}

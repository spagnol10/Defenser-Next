import { IUserCtx } from "./auth"
import { makeApiRequest } from "./makeApiRequest"

export const getMe = async () => {
  return makeApiRequest<IUserCtx>({
    method: "get",
    url: "usuarios/contexto/detalhe",
  })
}

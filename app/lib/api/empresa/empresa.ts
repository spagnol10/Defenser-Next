import { makeApiRequest } from "../makeApiRequest"
import { Empresa } from "./types"

export const getEmpresa = async () => {
  return makeApiRequest<Empresa>({
    method: "get",
    url: `empresa`,
  })
}

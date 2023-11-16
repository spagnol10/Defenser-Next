import { makeApiRequest } from "../makeApiRequest"
import { PostProdutor } from "./types"

export const postProdutor = async (data: PostProdutor) => {
  return makeApiRequest<void>({
    method: "post",
    url: `produtor/create`,
    data: data,
  })
}

import * as z from "zod"

export const schema = z.object({
  produtos: z
    .object({
      value: z.coerce.number().min(1, { message: "Produto é obrigatório" }),
      dosagem: z.coerce
        .number()
        .min(0.001, { message: "Dosagem não pode ser menor que 0.001" })
        .max(10000, { message: "Dosagem não pode ser maior que 10000" }),
    })
    .array()
    .min(1, { message: "Deve ter no mínimo 1 produto" }),
  dataInicio: z.date().optional(),
  horaInicio: z.string().optional(),
})

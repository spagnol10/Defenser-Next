import * as z from "zod"

export const schema = z
  .object({
    ativo: z.boolean().optional(),
    nome: z
      .string()
      .trim()
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
      .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
    unidadeMedida: z
      .string({
        required_error: "Unidade de medida é obrigatória",
      })
      .trim(),
    preco: z.coerce
      .number()
      .min(0.01, { message: "Valor deve ser maior que 0" })
      .max(99999, { message: "Valor deve ser menor que 99999" }),
  })
  .strict()

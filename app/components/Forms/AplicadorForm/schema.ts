import * as z from "zod"

export const schema = z
  .object({
    ativo: z.boolean().optional(),
    cpf: z
      .string({
        required_error: "CPF é obrigatório",
      })
      .trim()
      .min(11, { message: "CPF deve ter no mínimo 11 caracteres" })
      .max(11, { message: "CPF deve ter no máximo 11 caracteres" }),
    role: z.string(),
  })
  .strict()

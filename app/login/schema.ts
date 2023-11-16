import * as z from "zod"

export const schema = z
  .object({
    login: z
      .string({
        required_error: "CPF é obrigatório",
      })
      .trim()
      .min(11, "CPF deve ter no mínimo 11 caracteres")
      .max(11, "CPF deve ter no máximo 11 caracteres"),
    password: z
      .string({
        required_error: "Senha é obrigatória",
      })
      .trim()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(100),
  })
  .strict()

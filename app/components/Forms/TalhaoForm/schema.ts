import * as z from "zod"

export const schema = z
  .object({
    id: z.number().optional(),
    nome: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .trim()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(50, "Nome deve ter no máximo 30 caracteres"),
    areaTotal: z.coerce
      .number()
      .min(1, "Área total deve ser maior que 1m²")
      .max(2000000, "Área total deve ser menor ou igual a 200000m²")
      .optional(),
    latitude: z.coerce
      .number({
        required_error: "Latitude é obrigatório ",
      })
      .min(-90, "Latitude deve ser maior ou igual a -90")
      .max(90, "Latitude deve ser menor ou igual a 90"),
    longitude: z.coerce
      .number({
        required_error: "Longitude é obrigatório",
      })
      .min(-180, "Longitude deve ser maior ou igual a -180")
      .max(180, "Longitude deve ser menor ou igual a 180"),
    ativo: z.boolean().optional(),
  })
  .strict()

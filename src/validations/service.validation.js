import { z } from "zod";

export const createServiceSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio"),
    description: z.string().trim().min(1, "La descripción es obligatoria"),
    duration: z.number().positive("La duración debe ser mayor a cero"),
    price: z.number().positive("El precio debe ser mayor a cero"),
    category: z.string().trim().min(1, "La categoría es obligatoria"),
    available: z.boolean()
});

export const updateServiceSchema = createServiceSchema
    .partial()
    .refine(
        data => Object.keys(data).length > 0,
        "Debés enviar al menos un campo para actualizar"
    );



    
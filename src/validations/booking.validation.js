import { z } from "zod";

export const createBookingSchema = z.object({
    clientName: z.string().trim().min(1, "El nombre del cliente es obligatorio"),
    clientEmail: z.string().trim().email("El email no es válido"),
    date: z.string().trim().min(1, "La fecha es obligatoria"),
    time: z.string().trim().min(1, "La hora es obligatoria"),
    status: z.string().trim().min(1, "El estado es obligatorio")
});



export const addServiceToBookingSchema = z.object({
    bid: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID de la reserva no es válido"),
    sid: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID del servicio no es válido")
});

export const bookingIdSchema = z.object({
    bid: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "El ID de la reserva no es válido"
    )
});


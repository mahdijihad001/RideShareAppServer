import z from "zod";

export const createRiderRequestValidation = z.object({
    pickup: z.object({
        lat: z.number(),
        lng: z.number(),
        address: z.string()
    }),
    destination: z.object({
        lat: z.number(),
        lng: z.number(),
        address: z.string()
    }),
    fare: z.number().optional()
});
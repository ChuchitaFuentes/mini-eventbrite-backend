import { z } from 'zod';

export const purchaseSchema = z.object({
  eventId: z.string().min(1),
   seat: z.object({
    row: z.number().int().min(1).optional(),
    col: z.number().int().min(1).optional(),
  }).optional() // Ahora seat puede no venir si es GA
});
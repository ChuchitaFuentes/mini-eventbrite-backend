import { z } from 'zod';

export const seatMapSchema = z.object({
  type: z.enum(['grid', 'ga']).default('grid'),
  rows: z.number().int().min(1).max(200).default(10),
  cols: z.number().int().min(1).max(200).default(10),
  // Campos para GA (opcional para Grid)
  capacity: z.number().int().min(1).optional(),
  sold: z.number().int().min(0).optional()
}).refine((data) => {
  // Validación condicional según el tipo
  if (data.type === 'grid') {
    return data.rows != null && data.cols != null;
  }
  if (data.type === 'ga') {
    return data.capacity != null;
  }
  return false;
}, {
  message: "Campos inválidos según el tipo de asiento"
});

export const createEventSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(4000).optional(),
  date: z.coerce.date(),
  venue: z.string().min(3).max(200),
  imageUrl: z.string().url().optional(),
  seatMap: seatMapSchema.default({ type: 'grid', rows: 10, cols: 10 }),
  price: z.number().nonnegative(),
  isPublished: z.boolean().optional(),
});
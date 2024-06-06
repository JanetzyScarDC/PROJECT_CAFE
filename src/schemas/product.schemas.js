import { z } from 'zod';

export const productSchema = z.object({
    name: z.string({
        required_error: "Nombre del producto es requerido"
    }),
    price: z.number({
        required_error: "Precio debe ser un número"
    }).optional(),
    description: z.string({
        required_error: "Descripción del producto es requerida"
    }),
    category: z.string({
        required_error: "Categoría del producto es requerida"
    }),
    image: z.string({
        required_error: "URL de la imagen del producto es requerida"
    })
});

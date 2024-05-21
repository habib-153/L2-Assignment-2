import {z} from 'zod'

const productVariantZodSchema = z.object({
    type: z.string(),
    value: z.string()
})

const productInventoryZodSchema = z.object({
    quantity: z.number(),
    inStock: z.boolean()
})

const productZodSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z.array(productVariantZodSchema),
    inventory: productInventoryZodSchema,
})

export default productZodSchema


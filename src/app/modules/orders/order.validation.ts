import { z } from "zod"

const orderZodSchema = z.object({
    email: z.string(),
    productId: z.string(),
    price: z.number(),
    quantity: z.number(),
})

export default orderZodSchema
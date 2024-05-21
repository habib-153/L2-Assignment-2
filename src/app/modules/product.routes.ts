import express from "express"
import { ProductControllers } from "./product.controller"

const router = express.Router()    // for creating routes

router.post("/products", ProductControllers.createProduct)   // Create a New Product

export const ProductRoutes = router;
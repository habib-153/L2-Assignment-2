import express from "express"
import { ProductControllers } from "./product.controller"

const router = express.Router()    // for creating routes

router.post("/", ProductControllers.createProduct)   // Create a New Product
router.get("/", ProductControllers.getAllProducts)   //  Retrieve a List of All Products Route
router.get("/:productId", ProductControllers.getSingleProduct)   //  Retrieve a Specific Product by ID Route

export const ProductRoutes = router;
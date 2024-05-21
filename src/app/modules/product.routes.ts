import express from "express"
import { ProductControllers } from "./product.controller"

const router = express.Router()    // for creating routes

router.post("/", ProductControllers.createProduct)   // Create a New Product
router.get("/", ProductControllers.getProducts)   //  Retrieve a List of All Products and search Route
router.get("/:productId", ProductControllers.getSingleProduct)   //  Retrieve a Specific Product by ID Route
router.put("/:productId", ProductControllers.updateProduct)   //  Update Product Information Route
router.delete("/:productId", ProductControllers.deletedProduct)   //  Delete a Product Route

export const ProductRoutes = router;
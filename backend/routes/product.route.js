import { Router } from "express";
import { createProduct, deleteProduct, fetchProduct, updateProduct } from "../controller/product.controller.js";


const productRouter = Router();

productRouter.get("/", fetchProduct)

productRouter.post("/", createProduct)

productRouter.delete("/:id", deleteProduct)

productRouter.put("/:id", updateProduct)

export default productRouter;

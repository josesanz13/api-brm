import { Router } from "express";
import * as productsController from "../controllers/products.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get('/', [verifyToken, isAdmin], productsController.getProducts)
router.get('/:productId', [verifyToken, isAdmin], productsController.getProductByID)
router.post('/', [verifyToken, isAdmin], productsController.createProduct)
router.put('/:productId', [verifyToken, isAdmin], productsController.updateProductById)
router.delete('/:productId', [verifyToken, isAdmin], productsController.deleteProductById)

export default router;
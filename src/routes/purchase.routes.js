import { Router } from "express";
import * as purchasesController from "../controllers/purchase.controller";
import { verifyToken, isClient, isAdmin } from "../middlewares";

const router = Router();

router.get('/all-clients', [verifyToken, isAdmin], purchasesController.generateGeneralInvoiceForAdmin)
router.get('/', [verifyToken, isClient], purchasesController.generalInvoiceForClient)
router.post('/', [verifyToken, isClient], purchasesController.purchase)

export default router;
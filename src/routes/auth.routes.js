import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { checkDuplicateRegister, checkRolExist } from "../middlewares";

const router = Router();

router.post('/register', [checkRolExist, checkDuplicateRegister], authController.register)
router.post('/login', authController.login)

export default router;
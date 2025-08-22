import { Router } from "express";
import { validateBody } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from '../validators/auth.schema.js';
import * as AuthCtrl from '../controllers/auth.controller.js'
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post('/register', validateBody(registerSchema),AuthCtrl.register);
router.post('/login', validateBody(loginSchema) ,AuthCtrl.login);
router.post('/me', requireAuth,AuthCtrl.me);

export default router;
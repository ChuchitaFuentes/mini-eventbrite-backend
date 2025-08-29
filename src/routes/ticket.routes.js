import { Router } from 'express';
import { validateBody } from '../middlewares/validate.js';
import { purchaseSchema } from '../validators/ticket.schema.js';
import * as TicketCtrl from '../controllers/ticket.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

router.post('/purchase', requireAuth, validateBody(purchaseSchema), TicketCtrl.purchase);
router.post('/scan', requireAuth, requireRole('organizer','staff','admin'), TicketCtrl.scan);

export default router;
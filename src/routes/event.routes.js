import { Router } from 'express';
import { validateBody } from '../middlewares/validate.js';
import { createEventSchema } from '../validators/event.schema.js';
import { validateMongoIdParam } from '../validators/expressValidators.js';
import * as EventCtrl from '../controllers/event.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

router.get('/', EventCtrl.list);
router.get('/:id', validateMongoIdParam('id'), EventCtrl.get);
router.get('/:id/occupied', validateMongoIdParam('id'), EventCtrl.getOccupied);

// Only organizers can create events
router.post('/', requireAuth, requireRole('organizer','admin'), validateBody(createEventSchema), EventCtrl.create);

export default router;
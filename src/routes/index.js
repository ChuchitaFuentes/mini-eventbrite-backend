import { Router } from "express";
import auth from './auth.routes.js';
import events from './event.routes.js';
import tickets from './ticket.routes.js';

const router = Router();

router.use('/auth', auth);
router.use('/events', events);
router.use('/tickets', tickets);
router.use('/checkin', tickets); // expose /checkin/scan

export default router;
//Va a controlar como se va a mover la informacion
import * as Tickets from '../services/ticket.service.js';
import { AppError } from '../utils/errors.js';
import crypto from 'crypto';
import { env } from '../config/env.js';


export async function purchase(req, res, next) {
    try {
        const ticket = await Tickets.purchase(req.body, req.user.sub);
        res.status(201).json({ ticket });
    } catch (e) {
        next(e);
    }   
}

export async function scan(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) throw new AppError('Missing token', 400, 'MISSING_TOKEN');

    let data;
    if (typeof token === 'string') {
      try { data = JSON.parse(token); } 
      catch { throw new AppError('Invalid token', 400, 'INVALID_TOKEN'); }
    } else if (typeof token === 'object' && token !== null) {
      data = token; // permite enviar { t, s } directo
    } else {
      throw new AppError('Invalid token', 400, 'INVALID_TOKEN');
    }

    const { t, s } = data || {};
    if (!t || !s) throw new AppError('Invalid token', 400, 'INVALID_TOKEN');

    const h = crypto.createHmac('sha256', env.qrSigningSecret);
    h.update(t);
    const expected = h.digest('hex');
    if (s !== expected) throw new AppError('Invalid signature', 400, 'INVALID_SIGNATURE');

    const ticket = await Tickets.findTicketById(t);
    if (!ticket) throw new AppError('Ticket not found', 404, 'TICKET_NOT_FOUND');

    const updated = await Tickets.checkIn(ticket);
    res.json({ ok: true, ticket: updated });
  } catch (e) { next(e); }
}
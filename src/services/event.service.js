import { Event } from '../models/Event.js';
import { AppError } from '../utils/errors.js';

export async function listPublished() {
  return Event.find({ isPublished: true }).sort({ date: 1 }).lean();
}

export async function getById(id) {
  const e = await Event.findById(id).lean();
  if (!e) throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
  return e;
}

export async function createEvent(input, ownerId) {
  const e = await Event.create({ ...input, owner: ownerId });
  return e.toObject();
}

export async function occupiedSeats(eventId, TicketModel) {
  const { Ticket } = TicketModel || await import('../models/Ticket.js');

  const e = await Event.findById(eventId).lean();
  if (!e) throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');

  // GA: no maneja asientos
  if (!e.seatMap || e.seatMap.type === 'ga') {
    return [];
  }

  // GRID: leer asientos ocupados desde tickets
  const tickets = await Ticket.find({ event: e._id }, { seat: 1, _id: 0 }).lean();
  const occupied = (tickets || [])
    .map(t => t.seat)
    .filter(s => s && Number.isInteger(s.row) && Number.isInteger(s.col))
    .map(s => ({ row: s.row, col: s.col }));

  return occupied;
}
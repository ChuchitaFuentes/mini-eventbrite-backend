import { Ticket } from '../models/Ticket.js';
import { Event } from '../models/Event.js';
import { AppError } from '../utils/errors.js';
import { buildQrPayload, generateQrPngBuffer } from '../utils/qr.js';
import { uploadPng } from '../db/supabase.js';

export async function purchase({ eventId, seat }, buyerId) {
  const event = await Event.findById(eventId);
  if (!event) throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
  if (!event.isPublished) throw new AppError('Event not published', 400, 'EVENT_UNPUBLISHED');

  // seat bounds
  if (event.seatMap?.type === 'grid') {
    if (seat.row < 1 || seat.col < 1 || seat.row > event.seatMap.rows || seat.col > event.seatMap.cols) {
      throw new AppError('Seat out of bounds', 400, 'SEAT_INVALID');
    }
  }

  // Create ticket (unique index enforces no duplicates)
  const ticket = await Ticket.create({
    event: event._id,
    buyer: buyerId,
    seat,
    pricePaid: event.price
  });

  // Generate QR payload + PNG + upload to Supabase Storage
  const payload = buildQrPayload(ticket.id);
  const png = await generateQrPngBuffer(payload);
  try {
    const path = `tickets/${ticket.id}.png`;
    const url = await uploadPng(png, path);
    ticket.qrUrl = url;
    await ticket.save();
  } catch (e) {
    console.warn('[WARN] Failed to upload QR to Supabase', e);
  }

  return ticket.toObject();
}

export async function checkIn(ticket) {
  if (ticket.checkedInAt) throw new AppError('Already checked in', 400, 'ALREADY_CHECKED');
  ticket.checkedInAt = new Date();
  await ticket.save();
  return ticket.toObject();
}

export async function findTicketById(id) {
  return Ticket.findById(id);
}
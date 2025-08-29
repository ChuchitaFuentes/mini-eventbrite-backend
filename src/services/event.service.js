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
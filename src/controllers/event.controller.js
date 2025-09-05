import * as Events from '../services/event.service.js';

export async function list(req, res, next) {
  try {
    const items = await Events.listPublished();
    res.json({ items });
  } catch (e) { next(e); }
}

export async function get(req, res, next) {
  try {
    const item = await Events.getById(req.params.id);
    res.json({ item });
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const item = await Events.createEvent(req.body, req.user.sub);
    res.status(201).json({ item });
  } catch (e) { next(e); }
}

export async function getOccupied(req, res, next) {
  try {
    const occupied = await Events.occupiedSeats(req.params.id);
    res.json({ occupied });
  } catch (e) { next(e); }
}
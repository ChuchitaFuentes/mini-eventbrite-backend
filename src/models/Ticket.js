import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  col: { type: Number, required: true },
}, { _id: false });

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  seat: seatSchema,
  pricePaid: { type: Number, required: true },
  qrUrl: { type: String },
  checkedInAt: { type: Date, default: null },
}, { timestamps: true });

ticketSchema.index({ event: 1, 'seat.row': 1, 'seat.col': 1 }, { unique: true });

export const Ticket = mongoose.model('Ticket', ticketSchema);
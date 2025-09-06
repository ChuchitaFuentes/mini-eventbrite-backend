import mongoose from 'mongoose';
const seatSchema = new mongoose.Schema({
  row: { type: Number, required: true }, // Opcional para GA
  col: { type: Number, required: true }, // Opcional para GA
}, { _id: false });

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  seat: seatSchema,
  pricePaid: { type: Number, required: true },
  qrUrl: { type: String },
  checkedInAt: { type: Date, default: null },
}, { timestamps: true });

// Partial index: solo aplica para tickets Grid
ticketSchema.index(
  { event: 1, 'seat.row': 1, 'seat.col': 1 },
  {
    unique: true,
    partialFilterExpression: { 'seat.row': { $gt: 0 }, 'seat.col': { $gt: 0 } }
  }
);

export const Ticket = mongoose.model('Ticket', ticketSchema);
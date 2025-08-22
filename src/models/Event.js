import mongoose from 'mongoose';

const seatMapSchema = new mongoose.Schema({
  type: { type: String, enum: ['grid','ga'], default: 'grid' },
  rows: { type: Number, default: 10 },
  cols: { type: Number, default: 10 },
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  imageUrl: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seatMap: seatMapSchema,
  price: { type: Number, required: true, min: 0 },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

export const Event = mongoose.model('Event', eventSchema);
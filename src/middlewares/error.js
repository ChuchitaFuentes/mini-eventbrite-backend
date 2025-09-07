//Checar codigo descomentar app.js las líneas comentadas
import { AppError } from '../utils/errors.js';
import { validationResult } from 'express-validator';
import { ZodError } from 'zod';

export function notFoundHandler(_req, _res, next) {
  next(new AppError('Route not found', 404, 'NOT_FOUND'));
}

export function errorHandler(err, req, res, _next) {
  // Convert express-validator errors if present
  if (err && err.errors && Array.isArray(err.errors) && err.location) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Invalid request', details: err.errors }
    });
  }

  // Zod errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request body',
        details: err.issues
      }
    });
  }

  // Custom app error
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      }
    });
  }

  // Mongoose duplicate key
  if (err?.code === 11000) {
    return res.status(409).json({
      error: { code: 'DUPLICATE', message: 'Duplicate key', details: err.keyValue }
    });
  }

  console.error('[ERROR]', err);
  res.status(500).json({ error: { code: 'INTERNAL', message: 'Internal Server Error' } });
}

// Middleware to check express-validator errors
export function checkExpressValidator(req, _res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const err = new Error('Validation failed');
    err.errors = result.array();
    err.location = 'express-validator';
    return next(err);
  }
  next();
}
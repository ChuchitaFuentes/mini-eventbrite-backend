import { param } from 'express-validator';

export const validateMongoIdParam = (name = 'id') => [
  param(name).isMongoId().withMessage(`${name} must be a valid Mongo ObjectId`)
];
export class AppError extends Error {
    constructor(message, status = 400, code = 'BAD_REQUEST', details = undefined){
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }

}

export function notFound(message = 'Not Found') {
  return new AppError(message, 404, 'NOT_FOUND');
}

export function unauthorized(message = 'Unauthorized') {
  return new AppError(message, 401, 'UNAUTHORIZED');
}

export function forbidden(message = 'Forbidden') {
  return new AppError(message, 403, 'FORBIDDEN');
}
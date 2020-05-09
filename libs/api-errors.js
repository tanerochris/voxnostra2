/* eslint-disable max-classes-per-file */

/**
 * General Error Object, gets other props from Error which include
 *
 * name, message, stack
 */
export class ErrorResponse extends Error {
  constructor(message, details) {
    super(message);

    this.name = 'Internal Server Error';
    this.status = 500;
    this.details = details;
  }
}

export class AuthorizationError extends ErrorResponse {
  constructor(message, details) {
    super(message, details);

    this.name = 'AuthorizationError';
    this.status = 401;
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message, details) {
    super(message, details);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}

export class ValidationError extends ErrorResponse {
  constructor(fields, message = 'Input Validation Error') {
    super(message, fields);

    this.name = 'ValidationError';
    this.status = 400;
  }
}

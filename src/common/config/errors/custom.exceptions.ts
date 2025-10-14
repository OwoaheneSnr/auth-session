import {
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

export class UnauthorizedLoginException extends UnauthorizedException {
  constructor(message?: string) {
    super({
      message: message || 'Authentication failed',
      Details: 'Invalid login, incorrect data provided',
      status: 401,
    });
  }
}

export class UnauthorizedResourceException extends UnauthorizedException {
  constructor(message?: string) {
    super({
      message: message || 'Unauthorized Resource Access',
      Details: 'This resource is restricted. Please log in to access it.',
      status: 401,
    });
  }
}

export class ForbiddenCustomException extends UnauthorizedException {
  constructor(message?: string) {
    super({
      message: message || 'Unauthorized Resource Access',
      Details: 'This resource is restricted',
      status: 403,
    });
  }
}

export class ResourceNotFoundException extends NotFoundException {
  constructor(resource?: string) {
    super({
      message: resource ? `${resource} not found` : 'Resource not found',
      Details: 'The requested resource does not exist',
      status: 404,
    });
  }
}

export class ResourceBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message || 'Bad request',
      Details: 'The request contains invalid or malformed data',
      status: 400,
    });
  }
}

export class ResourceInternalServerErrorException extends InternalServerErrorException {
  constructor(message?: string) {
    super({
      message: message || 'Internal server error',
      Details: 'An unexpected error occurred while processing the request',
      status: 500,
    });
  }
}

export class ResourceConflictException extends ConflictException {
  constructor(message?: string) {
    super({
      message: message || 'Resource conflict',
      Details: 'The resource already exists or conflicts with existing data',
      status: 409,
    });
  }
}

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Invalid or expired token',
      Details: 'Please log in again to continue',
      status: 401,
    });
  }
}

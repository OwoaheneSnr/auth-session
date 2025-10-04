import {
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class UnauthorizedLoginException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Authentication failed',
      Details: 'Invalid login, incorrect data provided',
    });
  }
}

export class UnauthorizedResourceException extends UnauthorizedException {
  constructor(message?: string) {
    super({
      message: message || 'Unauthorized Resource Access',
      Details: 'This resource is restricted. Please log in to access it.',
    });
  }
}

export class ForbiddenCustomException extends UnauthorizedException {
  constructor(message?: string) {
    super({
      message: message || 'Unauthorized Resource Access',
      Details: 'This resource is restricted',
    });
  }
}

export class ResourceNotFoundException extends NotFoundException {
  constructor(resource?: string) {
    super({
      message: resource ? `${resource} not found` : 'Resource not found',
      Details: 'The requested resource does not exist',
    });
  }
}

export class ResourceBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super({
      message: message || 'Bad request',
      Details: 'The request contains invalid or malformed data',
    });
  }
}

export class ResourceInternalServerErrorException extends InternalServerErrorException {
  constructor(message?: string) {
    super({
      message: message || 'Internal server error',
      Details: 'An unexpected error occurred while processing the request',
    });
  }
}

import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BearerAuthHeaders } from './headers';

export function DefaultBearerAuth() {
  return applyDecorators(
    ApiBearerAuth('Bearer'),
    ApiHeaders(BearerAuthHeaders),
  );
}

export function DefaultErrorResponses() {
  return applyDecorators(
    ApiBadRequestResponse(BadRequest.response()),
    ApiUnauthorizedResponse(Unauthorized.response()),
    ApiForbiddenResponse(Forbidden.response()),
    ApiConflictResponse(ValidationErrors.response()),
    ApiInternalServerErrorResponse(InternalServerError.response()),
  );
}

abstract class BaseError {
  static text: string;
  static property(text: string) {
    return {
      minLength: 1,
      example: text,
      default: text,
    };
  }
  static response() {
    return {
      type: this,
      description: this.text,
    };
  }
}

class BadRequest extends BaseError {
  static text = 'Bad request';
  @ApiProperty(BaseError.property(BadRequest.text))
  message: string;
}

class Forbidden extends BaseError {
  static text = 'Forbidden';
  @ApiProperty(BaseError.property(Forbidden.text))
  message: string;
}

class Unauthorized extends BaseError {
  static text = 'Unauthorized';
  @ApiProperty(BaseError.property(Unauthorized.text))
  message: string;
}

class InternalServerError extends BaseError {
  static text = 'Internal server error';
  @ApiProperty(BaseError.property(InternalServerError.text))
  message: string;
}

class ValidationErrors extends BaseError {
  static text = 'Validation errors found';
  @ApiProperty(BaseError.property(ValidationErrors.text))
  message: string;
}

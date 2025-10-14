import { envs } from '#config/envs';
import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiTags,
} from '@nestjs/swagger';

const isProduction = envs.NODE_ENV === 'production';

export function ConditionalApiProperty(
  options?: ApiPropertyOptions,
): PropertyDecorator {
  if (isProduction) {
    return () => {};
  }
  return ApiProperty(options);
}

export function ConditionalApiOperation(
  options: ApiOperationOptions,
): MethodDecorator {
  if (isProduction) {
    return () => {};
  }
  return ApiOperation(options);
}

export function ConditionalApiResponse(
  options: ApiResponseOptions,
): MethodDecorator {
  if (isProduction) {
    return () => {};
  }
  return ApiResponse(options);
}

export function ConditionalApiTags(...tags: string[]): ClassDecorator {
  if (isProduction) {
    return () => {};
  }
  return ApiTags(...tags);
}

export function ConditionalSwagger(
  ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
) {
  if (isProduction) {
    return () => {};
  }
  return applyDecorators(...decorators);
}

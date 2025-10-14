import {
  applyDecorators,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateDtoCheckPipe } from './updatePatch.pipe';

export function UpdatePatch(route: string = '') {
  return applyDecorators(
    Patch(route),
    UsePipes(
      new UpdateDtoCheckPipe(),
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    ),
  );
}

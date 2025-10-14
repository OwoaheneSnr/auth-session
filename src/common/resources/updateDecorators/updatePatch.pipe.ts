import { PasswordService } from '#resources/password/password.service';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common';

@Injectable()
export class UpdateDtoCheckPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    // ! Not Body
    const keys = Object.keys(value);
    if (keys.length === 0) {
      throw new NotAcceptableException(
        'Request body cannot be empty. You must provide at least one field to update.',
      );
    }

    return value;
  }
}

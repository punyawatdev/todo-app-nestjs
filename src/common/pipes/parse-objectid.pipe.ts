import { PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid ID format');
    }
    return value;
  }
}

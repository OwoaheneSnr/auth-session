import { ConditionalApiProperty } from '#config/swagger/swagger.decorator';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class PaginationDto {
  @ConditionalApiProperty({ required: false, format: 'number' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @ConditionalApiProperty({ required: false, format: 'number' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit: number = 10;
}
